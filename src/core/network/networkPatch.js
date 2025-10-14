/**
 * Patches globais para melhorar a resilência de rede
 */
class NetworkPatch {
  constructor() {
    this.isInitialized = false;
    this.originalHandlers = new Map();
    console.log('🌐 [NetworkPatch] Inicializado');
  }

  initialize() {
    this.patchGlobalErrorHandling();
    this.patchPromiseRejection();
    this.patchTimeouts();
    this.setupGlobalNetworkHandling();
    this.isInitialized = true;
    console.log('✅ [NetworkPatch] Patches aplicados');
  }

  patchGlobalErrorHandling() {
    const originalOnError = window.onerror;
    this.originalHandlers.set('onerror', originalOnError);

    window.onerror = (message, source, lineno, colno, error) => {
      // Verificar se é erro de rede/Firebase
      if (this.isNetworkRelatedError(message, error)) {
        console.warn('🌐 [NetworkPatch] Erro de rede capturado:', message);
        
        // Tentar recuperação automática
        this.attemptRecovery(error);
        
        // Não propagar o erro se conseguirmos lidar com ele
        return true;
      }

      // Chamar handler original se existir
      if (originalOnError) {
        return originalOnError.call(this, message, source, lineno, colno, error);
      }
      
      return false;
    };
  }

  patchPromiseRejection() {
    const originalOnRejection = window.onunhandledrejection;
    this.originalHandlers.set('onunhandledrejection', originalOnRejection);

    window.onunhandledrejection = (event) => {
      const error = event.reason;
      
      // Verificar se é erro de rede/Firebase
      if (this.isNetworkRelatedError(error?.message, error)) {
        console.warn('🌐 [NetworkPatch] Promise rejection de rede capturada:', error);
        
        // Tentar recuperação automática
        this.attemptRecovery(error);
        
        // Prevenir que o erro seja mostrado no console
        event.preventDefault();
        return;
      }

      // Chamar handler original se existir
      if (originalOnRejection) {
        return originalOnRejection.call(this, event);
      }
    };
  }

  patchTimeouts() {
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    
    // Patch setTimeout para adicionar contexto
    window.setTimeout = function(callback, delay, ...args) {
      return originalSetTimeout.call(this, function() {
        try {
          return callback.apply(this, args);
        } catch (error) {
          if (NetworkPatch.prototype.isNetworkRelatedError(error?.message, error)) {
            console.warn('🌐 [NetworkPatch] Erro em setTimeout:', error);
            NetworkPatch.prototype.attemptRecovery(error);
          } else {
            throw error;
          }
        }
      }, delay);
    };

    // Patch setInterval para adicionar contexto
    window.setInterval = function(callback, delay, ...args) {
      return originalSetInterval.call(this, function() {
        try {
          return callback.apply(this, args);
        } catch (error) {
          if (NetworkPatch.prototype.isNetworkRelatedError(error?.message, error)) {
            console.warn('🌐 [NetworkPatch] Erro em setInterval:', error);
            NetworkPatch.prototype.attemptRecovery(error);
          } else {
            throw error;
          }
        }
      }, delay);
    };
  }

  setupGlobalNetworkHandling() {
    // Interceptar todos os eventos de rede
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'NETWORK_ERROR') {
          console.warn('🌐 [NetworkPatch] Service Worker reportou erro de rede:', event.data);
          this.handleServiceWorkerError(event.data);
        }
      });
    }

    // Monitorar mudanças na conectividade
    window.addEventListener('online', () => {
      console.log('🌐 [NetworkPatch] Dispositivo online');
      this.handleConnectivityChange(true);
    });

    window.addEventListener('offline', () => {
      console.log('🌐 [NetworkPatch] Dispositivo offline');
      this.handleConnectivityChange(false);
    });
  }

  isNetworkRelatedError(message, error) {
    if (!message && !error) return false;

    const networkErrorPatterns = [
      'network',
      'fetch',
      'connection',
      'timeout',
      'firebase',
      'firestore',
      'auth/',
      'ERR_NETWORK',
      'ERR_INTERNET_DISCONNECTED',
      'Failed to fetch',
      'NetworkError',
      'net::',
      'CORS'
    ];

    const errorMessage = message || error?.message || error?.code || '';
    
    return networkErrorPatterns.some(pattern =>
      errorMessage.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  attemptRecovery(error) {
    console.log('🔄 [NetworkPatch] Tentando recuperação automática...');
    
    // Emitir evento para que outros componentes possam reagir
    if (window.eventBus) {
      window.eventBus.emit('network:error-recovery', { error });
    }

    // Se temos NetworkHandler, usar suas capacidades
    if (window.NetworkHandler) {
      // Verificar conectividade
      window.NetworkHandler.checkConnectivity();
    }

    // Se temos ResilientFirebaseClient, tentar reconectar listeners
    if (window.ResilientFirebaseClient) {
      setTimeout(() => {
        window.ResilientFirebaseClient.reconnectAllListeners();
      }, 2000);
    }

    // Mostrar notificação discreta
    if (window.Snackbar) {
      window.Snackbar({
        message: '🔄 Tentando reconectar...',
        type: 'info',
        duration: 3000
      });
    }
  }

  handleServiceWorkerError(errorData) {
    console.warn('🌐 [NetworkPatch] Erro do Service Worker:', errorData);
    
    // Tentar recovery específico para SW
    if (errorData.operation === 'fetch') {
      this.attemptRecovery(new Error(errorData.message));
    }
  }

  handleConnectivityChange(isOnline) {
    if (window.eventBus) {
      window.eventBus.emit('network:connectivity-change', { isOnline });
    }

    if (isOnline) {
      // Tentar reestabelecer conexões
      setTimeout(() => {
        this.attemptRecovery(new Error('Reconnecting after online'));
      }, 1000);
    }
  }

  // Restaurar handlers originais
  restore() {
    console.log('🌐 [NetworkPatch] Restaurando handlers originais...');
    
    this.originalHandlers.forEach((handler, type) => {
      window[type] = handler;
    });

    this.isInitialized = false;
  }

  // Verificar status dos patches
  getStatus() {
    return {
      initialized: this.isInitialized,
      patchesCount: this.originalHandlers.size
    };
  }
}

// Instância global
const networkPatch = new NetworkPatch();
window.NetworkPatch = networkPatch;
export default networkPatch;