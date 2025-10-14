/**
 * Proteção contra interferência de extensões do Chrome
 */
class ExtensionHandler {
  constructor() {
    this.isInitialized = false;
    this.extensionInterferenceDetected = false;
    this.protectedFunctions = new Map();
    this.originalFetch = window.fetch;
    console.log('🛡️ [ExtensionHandler] Inicializado');
  }

  initialize() {
    this.protectCriticalFunctions();
    this.setupExtensionDetection();
    // Em produção, não interceptar fetch para evitar interferir nas chamadas Firebase (CORS)
    const isDevelopment = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (isDevelopment) {
      this.setupFetchProtection();
    } else {
      console.log('🛡️ [ExtensionHandler] Fetch protection desativada em PROD');
    }
    this.isInitialized = true;
    console.log('✅ [ExtensionHandler] Proteção ativada');
  }

  protectCriticalFunctions() {
    // Proteger funções críticas do Firebase
    this.protectGlobalFunction('firebase');
    this.protectGlobalFunction('google');
    this.protectGlobalFunction('gapi');

    // Proteger XMLHttpRequest
    this.protectXHR();

    // Proteger WebSocket
    this.protectWebSocket();
  }

  protectGlobalFunction(name) {
    if (window[name]) {
      const original = window[name];
      this.protectedFunctions.set(name, original);

      // Criar proxy para detectar modificações
      window[name] = new Proxy(original, {
        set: (target, property, value) => {
          console.warn(`🛡️ [ExtensionHandler] Tentativa de modificar ${name}.${property}`);
          this.detectExtensionInterference(`Modificação em ${name}.${property}`);
          return Reflect.set(target, property, value);
        },
        deleteProperty: (target, property) => {
          console.warn(`🛡️ [ExtensionHandler] Tentativa de deletar ${name}.${property}`);
          this.detectExtensionInterference(`Deleção em ${name}.${property}`);
          return Reflect.deleteProperty(target, property);
        }
      });
    }
  }

  protectXHR() {
    const OriginalXHR = window.XMLHttpRequest;
    const self = this;

    window.XMLHttpRequest = function() {
      const xhr = new OriginalXHR();
      const originalOpen = xhr.open;
      const originalSend = xhr.send;

      xhr.open = function(method, url, ...args) {
        if (self.isFirebaseURL(url)) {
          console.log('🛡️ [ExtensionHandler] Protegendo requisição Firebase:', url);
        }
        return originalOpen.call(this, method, url, ...args);
      };

      xhr.send = function(data) {
        // Adicionar headers de proteção
        if (!xhr.getResponseHeader('X-Protected-Request')) {
          xhr.setRequestHeader('X-Protected-Request', 'true');
        }
        return originalSend.call(this, data);
      };

      return xhr;
    };
  }

  protectWebSocket() {
    const OriginalWebSocket = window.WebSocket;
    const self = this;

    window.WebSocket = function(url, protocols) {
      if (self.isFirebaseURL(url)) {
        console.log('🛡️ [ExtensionHandler] Protegendo WebSocket Firebase:', url);
      }

      const ws = new OriginalWebSocket(url, protocols);
      
      ws.addEventListener('error', (event) => {
        if (self.isFirebaseURL(url)) {
          console.warn('🛡️ [ExtensionHandler] Erro em WebSocket Firebase:', event);
          self.detectExtensionInterference('Erro em WebSocket Firebase');
        }
      });

      return ws;
    };
  }

  setupFetchProtection() {
    // Em desenvolvimento, não interceptar fetch para evitar problemas de CORS
    const isDevelopment = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      console.log('🛡️ [ExtensionHandler] Modo desenvolvimento - fetch não interceptado');
      return;
    }
    
    const self = this;
    
    window.fetch = function(input, init = {}) {
      const url = typeof input === 'string' ? input : input.url;
      
      if (self.isFirebaseURL(url)) {
        console.log('🛡️ [ExtensionHandler] Protegendo fetch Firebase:', url);
        
        // Adicionar headers de proteção
        init.headers = init.headers || {};
        init.headers['X-Protected-Request'] = 'true';
        init.headers['X-Requested-With'] = 'XMLHttpRequest';
      }
      
      return self.originalFetch.call(this, input, init)
        .catch(error => {
          if (self.isFirebaseURL(url)) {
            console.warn('🛡️ [ExtensionHandler] Erro em fetch Firebase:', error);
            
            // Só detectar como interferência se NÃO for erro legítimo de rede
            if (!self.isLegitimateNetworkError(error)) {
              self.detectExtensionInterference('Erro em fetch Firebase');
            } else {
              console.log('🌐 [ExtensionHandler] Erro legítimo de rede detectado - não é interferência');
            }
          }
          throw error;
        });
    };
  }

  setupExtensionDetection() {
    // Detectar modificações no DOM relacionadas a extensões
    this.observeDOM();

    // Detectar script injection
    this.detectScriptInjection();

    // Monitorar console
    this.monitorConsole();
  }

  observeDOM() {
    if (!window.MutationObserver) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Verificar se é script de extensão
              if (node.tagName === 'SCRIPT' && this.isExtensionScript(node)) {
                console.warn('🛡️ [ExtensionHandler] Script de extensão detectado:', node.src);
                this.detectExtensionInterference('Script de extensão injetado');
              }

              // Verificar elementos suspeitos
              if (node.classList && (
                node.classList.contains('extension-') ||
                node.id?.includes('extension') ||
                node.id?.includes('chrome-')
              )) {
                console.warn('🛡️ [ExtensionHandler] Elemento de extensão detectado:', node);
                this.detectExtensionInterference('Elemento de extensão no DOM');
              }
            }
          });
        }
      });
    });

    observer.observe(document, {
      childList: true,
      subtree: true
    });
  }

  detectScriptInjection() {
    const originalCreateElement = document.createElement;
    const self = this;

    document.createElement = function(tagName) {
      const element = originalCreateElement.call(this, tagName);
      
      if (tagName.toLowerCase() === 'script') {
        element.addEventListener('load', () => {
          if (self.isExtensionScript(element)) {
            console.warn('🛡️ [ExtensionHandler] Script de extensão carregado:', element.src);
            self.detectExtensionInterference('Script de extensão carregado');
          }
        });
      }
      
      return element;
    };
  }

  monitorConsole() {
    const originalError = console.error;
    const originalWarn = console.warn;
    const self = this;

    console.error = function(...args) {
      const message = args.join(' ');
      if (self.isExtensionError(message)) {
        console.warn('🛡️ [ExtensionHandler] Erro de extensão detectado:', message);
        self.detectExtensionInterference('Erro de extensão no console');
      }
      return originalError.apply(this, args);
    };

    console.warn = function(...args) {
      const message = args.join(' ');
      if (self.isExtensionWarning(message)) {
        console.warn('🛡️ [ExtensionHandler] Warning de extensão detectado:', message);
        self.detectExtensionInterference('Warning de extensão no console');
      }
      return originalWarn.apply(this, args);
    };
  }

  detectExtensionInterference(source) {
    if (!this.extensionInterferenceDetected) {
      this.extensionInterferenceDetected = true;
      console.warn('🛡️ [ExtensionHandler] Interferência de extensão detectada:', source);

      // Notificar o usuário
      if (window.Snackbar) {
        window.Snackbar({
          message: '⚠️ Extensão do navegador pode estar interferindo. Se houver problemas, desative extensões.',
          type: 'warning',
          duration: 8000
        });
      }

      // Emitir evento
      if (window.eventBus) {
        window.eventBus.emit('extension:interference-detected', { source });
      }

      // Reset flag após 30 segundos
      setTimeout(() => {
        this.extensionInterferenceDetected = false;
      }, 30000);
    }
  }

  isFirebaseURL(url) {
    if (!url) return false;
    
    const firebasePatterns = [
      'firebaseapp.com',
      'googleapis.com',
      'google.com/identitytoolkit',
      'securetoken.googleapis.com',
      'firestore.googleapis.com'
    ];

    return firebasePatterns.some(pattern => url.includes(pattern));
  }

  isLegitimateNetworkError(error) {
    // Erros legítimos de rede que não são interferência de extensão
    const legitimateErrors = [
      'CORS policy',
      'No \'Access-Control-Allow-Origin\'',
      'Failed to fetch', // pode ser CORS ou rede
      'network error',
      'ERR_NETWORK_CHANGED',
      'ERR_INTERNET_DISCONNECTED'
    ];
    
    const errorMessage = error?.message || error || '';
    return legitimateErrors.some(pattern =>
      errorMessage.includes(pattern)
    );
  }

  isExtensionScript(script) {
    if (!script || !script.src) return false;
    
    const extensionPatterns = [
      'chrome-extension://',
      'moz-extension://',
      'safari-extension://',
      'extension://',
      'chrome://extensions/'
    ];

    return extensionPatterns.some(pattern => script.src.includes(pattern));
  }

  isExtensionError(message) {
    if (!message) return false;
    
    const extensionErrorPatterns = [
      'chrome-extension',
      'moz-extension',
      'content script',
      'manifest.json',
      'extension context'
    ];

    return extensionErrorPatterns.some(pattern =>
      message.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  isExtensionWarning(message) {
    return this.isExtensionError(message);
  }

  // Restaurar funções originais se necessário
  restoreOriginalFunctions() {
    console.log('🛡️ [ExtensionHandler] Restaurando funções originais...');
    
    this.protectedFunctions.forEach((original, name) => {
      window[name] = original;
    });

    window.fetch = this.originalFetch;
  }

  // Verificar se há interferência ativa
  checkInterference() {
    return this.extensionInterferenceDetected;
  }
}

// Instância global
const extensionHandler = new ExtensionHandler();
window.ExtensionHandler = extensionHandler;
export default extensionHandler;