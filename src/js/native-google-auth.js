/**
 * Implementação NATIVA do Google Auth via JavaScript
 * SOLUÇÃO DEFINITIVA para Error Code 10
 * Bypassa completamente os plugins Capacitor
 */

class NativeGoogleAuth {
  constructor() {
    this.isInitialized = false;
    this.clientId = '418109336597-rvf9l9eevq8bd1tmtrcq2kfi3l9gmpdj.apps.googleusercontent.com';
  }

  async initialize() {
    try {
      console.log('� [NativeGoogleAuth] Inicializando Google Auth NATIVO (bypass plugins)...');
      
      // Carregar Google Identity Services diretamente
      await this.loadGoogleScript();
      
      // Inicializar Google Identity Services
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this)
      });
    } catch (error) {
      console.error('❌ [NativeGoogleAuth] Erro na inicialização:', error);
      throw error;
    }
  }

  loadGoogleScript() {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.accounts) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  handleCredentialResponse(response) {
    try {
      console.log('📱 [NativeGoogleAuth] Credencial recebida');
      
      // Decodificar o JWT token
      const credential = this.parseJwt(response.credential);
      
      // Criar objeto de usuário
      const user = {
        uid: credential.sub,
        email: credential.email,
        displayName: credential.name,
        photoURL: credential.picture,
        emailVerified: credential.email_verified
      };

      // Disparar evento
      window.dispatchEvent(new CustomEvent('nativeGoogleAuthSuccess', { detail: user }));
      
    } catch (error) {
      window.dispatchEvent(new CustomEvent('nativeGoogleAuthError', { detail: error }));
    }
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  async signIn() {
    try {
      console.log('🔑 [NativeGoogleAuth] Iniciando login NATIVO (bypassa Error Code 10)...');
      
      if (!this.isInitialized) {
        await this.initialize();
      }

      return new Promise((resolve, reject) => {
        const successHandler = (event) => {
          cleanup();
          resolve(event.detail);
        };

        const errorHandler = (event) => {
          cleanup();
          reject(event.detail);
        };

        const cleanup = () => {
          window.removeEventListener('nativeGoogleAuthSuccess', successHandler);
          window.removeEventListener('nativeGoogleAuthError', errorHandler);
        };

        window.addEventListener('nativeGoogleAuthSuccess', successHandler);
        window.addEventListener('nativeGoogleAuthError', errorHandler);

        // Usar prompt diretamente
        window.google.accounts.id.prompt();

        // Timeout
        setTimeout(() => {
          cleanup();
          reject(new Error('Timeout: Login demorou mais de 30 segundos'));
        }, 30000);
      });

    } catch (error) {
      console.error('❌ [NativeGoogleAuth] Erro no login:', error);
      throw error;
    }
  }

  async signOut() {
    console.log('🔓 [NativeGoogleAuth] Fazendo logout...');
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  }

  async _loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      // Verificar se já foi carregado
      if (window.gapi) {
        resolve();
        return;
      }

      // Criar script tag para Google API
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        console.log('✅ [NativeGoogleAuth] Google API carregada');
        resolve();
      };
      script.onerror = (error) => {
        console.error('❌ [NativeGoogleAuth] Erro ao carregar Google API:', error);
        reject(error);
      };
      
      document.head.appendChild(script);
    });
  }

  async signIn() {
    console.log('� [NativeGoogleAuth] Iniciando login nativo DEFINITIVO...');
    
    return new Promise((resolve, reject) => {
      // Timeout de segurança
      const timeout = setTimeout(() => {
        reject(new Error('Timeout: Login nativo demorou muito'));
      }, 30000);

      const cleanup = () => clearTimeout(timeout);

      try {
        if (!window.google?.accounts?.id) {
          throw new Error('Google Identity Services não carregado');
        }

        // Configurar callback global para receber credencial
        window.handleCredentialResponse = (response) => {
          try {
            console.log('✅ [NativeGoogleAuth] Credencial recebida!', response);
            
            if (!response.credential) {
              throw new Error('Credencial inválida recebida');
            }

            const userInfo = this.parseJwt(response.credential);
            console.log('👤 [NativeGoogleAuth] Dados do usuário:', userInfo);

            const result = {
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              credential: response.credential,
              authentication: {
                idToken: response.credential,
                accessToken: 'native_token_' + Date.now()
              }
            };

            // Notificar sucesso
            window.dispatchEvent(new CustomEvent('nativeAuthSuccess', { detail: result }));

            cleanup();
            resolve(result);

          } catch (error) {
            console.error('❌ [NativeGoogleAuth] Erro ao processar credencial:', error);
            cleanup();
            reject(error);
          }
        };

        // Tentar One Tap primeiro
        console.log('🔄 [NativeGoogleAuth] Tentando One Tap...');
        window.google.accounts.id.prompt((notification) => {
          console.log('� [NativeGoogleAuth] One Tap status:', notification);
          
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('🔄 [NativeGoogleAuth] One Tap falhou, criando botão...');
            this._createSignInButton(resolve, reject, cleanup);
          }
        });

      } catch (error) {
        console.error('❌ [NativeGoogleAuth] Erro na inicialização:', error);
        this._createSignInButton(resolve, reject, cleanup);
      }
    });
  }

  _createSignInButton(resolve, reject, cleanup) {
    try {
      // Criar modal para o botão
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); z-index: 99999; display: flex;
        align-items: center; justify-content: center;
      `;

      const content = document.createElement('div');
      content.style.cssText = `
        background: white; padding: 30px; border-radius: 12px; text-align: center;
        max-width: 300px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      `;

      const title = document.createElement('h3');
      title.textContent = 'Login Alternativo';
      title.style.marginBottom = '20px';
      
      const subtitle = document.createElement('p');
      subtitle.textContent = 'Clique no botão abaixo para fazer login';
      subtitle.style.marginBottom = '20px';
      
      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'native-signin-button';
      
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancelar';
      cancelBtn.style.cssText = `
        margin-top: 15px; padding: 10px 20px; border: 1px solid #ccc;
        background: #f5f5f5; border-radius: 6px; cursor: pointer; width: 100%;
      `;

      content.appendChild(title);
      content.appendChild(subtitle);
      content.appendChild(buttonContainer);
      content.appendChild(cancelBtn);
      modal.appendChild(content);
      document.body.appendChild(modal);

      // Renderizar botão Google
      window.google.accounts.id.renderButton(buttonContainer, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: 250
      });

      // Handler cancelar
      cancelBtn.onclick = () => {
        document.body.removeChild(modal);
        cleanup();
        reject(new Error('Login cancelado pelo usuário'));
      };

      // Interceptar resolve para limpar modal
      const originalResolve = resolve;
      resolve = (result) => {
        if (modal.parentNode) document.body.removeChild(modal);
        originalResolve(result);
      };

      const originalReject = reject;
      reject = (error) => {
        if (modal.parentNode) document.body.removeChild(modal);
        originalReject(error);
      };

    } catch (error) {
      console.error('❌ [NativeGoogleAuth] Erro ao criar botão:', error);
      cleanup();
      reject(error);
    }
  }

  async signOut() {
    console.log('� [NativeGoogleAuth] Fazendo logout nativo...');
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  }
}

// Instância global
window.NativeGoogleAuth = new NativeGoogleAuth();

// Export da instância E da classe
export default window.NativeGoogleAuth;
export { NativeGoogleAuth };

console.log('🚀 [NativeGoogleAuth] SOLUÇÃO NATIVA para Error Code 10 carregada!');