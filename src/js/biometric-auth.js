// AutenticaÃ§Ã£o BiomÃ©trica para Mobile
// Usa Web Authentication API para fingerprint/facial recognition

import { Snackbar } from './ui/Snackbar.js';
import { Modal } from './ui/Modal.js';

export class BiometricAuth {
  constructor() {
    this.isSupported = this.checkSupport();
    this.isAvailable = false;
    this.credentials = null;
  }

  // Verificar se o dispositivo suporta autenticaÃ§Ã£o biomÃ©trica
  checkSupport() {
    return (
      window.PublicKeyCredential &&
      window.PublicKeyCredential
        .isUserVerifyingPlatformAuthenticatorAvailable &&
      window.PublicKeyCredential.isConditionalMediationAvailable
    );
  }

  // Verificar se a autenticaÃ§Ã£o biomÃ©trica estÃ¡ disponÃ­vel
  async checkAvailability() {
    if (!this.isSupported) {
      console.log('ðŸ”’ BiometricAuth: Web Authentication API nÃ£o suportada');
      return false;
    }

    try {
      const [userVerifying, conditionalMediation] = await Promise.all([
        window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
        window.PublicKeyCredential.isConditionalMediationAvailable()
      ]);

      this.isAvailable = userVerifying && conditionalMediation;
      console.log('ðŸ”’ BiometricAuth: Disponibilidade verificada:', {
        userVerifying,
        conditionalMediation,
        isAvailable: this.isAvailable
      });

      return this.isAvailable;
    } catch (error) {
      console.error(
        'ðŸ”’ BiometricAuth: Erro ao verificar disponibilidade:',
        error
      );
      return false;
    }
  }

  // Registrar credenciais biomÃ©tricas
  async register(userId, userName) {
    if (!this.isAvailable) {
      throw new Error('AutenticaÃ§Ã£o biomÃ©trica nÃ£o disponÃ­vel');
    }

    try {
      console.log('ðŸ”’ BiometricAuth: Iniciando registro biomÃ©trico...');

      // Gerar challenge
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // Criar opÃ§Ãµes de registro
      const publicKeyOptions = {
        challenge: challenge,
        rp: {
          name: 'Servo Tech FinanÃ§as',
          id: window.location.hostname
        },
        user: {
          id: new Uint8Array(16),
          name: userName,
          displayName: userName
        },
        pubKeyCredParams: [
          {
            type: 'public-key',
            alg: -7 // ES256
          }
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required'
        },
        timeout: 60000,
        attestation: 'direct'
      };

      // Registrar credencial
      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions
      });

      this.credentials = credential;

      // Salvar no localStorage
      this.saveCredentials(userId, credential);

      console.log('ðŸ”’ BiometricAuth: Registro biomÃ©trico concluÃ­do');
      return true;
    } catch (error) {
      console.error('ðŸ”’ BiometricAuth: Erro no registro:', error);
      throw error;
    }
  }

  // Autenticar usando biomÃ©trica
  async authenticate() {
    if (!this.isAvailable) {
      throw new Error('AutenticaÃ§Ã£o biomÃ©trica nÃ£o disponÃ­vel');
    }

    try {
      console.log('ðŸ”’ BiometricAuth: Iniciando autenticaÃ§Ã£o biomÃ©trica...');

      // Carregar credenciais salvas
      const savedCredentials = this.loadCredentials();
      if (!savedCredentials) {
        throw new Error('Nenhuma credencial biomÃ©trica registrada');
      }

      // Gerar challenge
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // OpÃ§Ãµes de autenticaÃ§Ã£o
      const assertionOptions = {
        challenge: challenge,
        rpId: window.location.hostname,
        allowCredentials: [
          {
            type: 'public-key',
            id: savedCredentials.rawId,
            transports: ['internal']
          }
        ],
        userVerification: 'required',
        timeout: 60000
      };

      // Autenticar
      const assertion = await navigator.credentials.get({
        publicKey: assertionOptions
      });

      console.log('ðŸ”’ BiometricAuth: AutenticaÃ§Ã£o biomÃ©trica bem-sucedida');
      return {
        success: true,
        userId: savedCredentials.userId,
        credential: assertion
      };
    } catch (error) {
      console.error('ðŸ”’ BiometricAuth: Erro na autenticaÃ§Ã£o:', error);
      throw error;
    }
  }

  // Salvar credenciais no localStorage
  saveCredentials(userId, credential) {
    try {
      const credentialData = {
        userId: userId,
        rawId: Array.from(credential.rawId),
        type: credential.type,
        response: {
          clientDataJSON: Array.from(credential.response.clientDataJSON),
          attestationObject: Array.from(credential.response.attestationObject)
        }
      };

      localStorage.setItem(
        'biometric_credentials',
        JSON.stringify(credentialData)
      );

      // Salvar tambÃ©m informaÃ§Ãµes do usuÃ¡rio para login automÃ¡tico
      this.saveUserInfo(userId);

      console.log('ðŸ”’ BiometricAuth: Credenciais salvas no localStorage');
    } catch (error) {
      console.error('ðŸ”’ BiometricAuth: Erro ao salvar credenciais:', error);
    }
  }

  // Salvar informaÃ§Ãµes do usuÃ¡rio
  saveUserInfo() {
    try {
      const currentUser = window.FirebaseAuth?.currentUser;
      if (currentUser) {
        const userInfo = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          lastLogin: new Date().toISOString()
        };
        localStorage.setItem('biometric_user_info', JSON.stringify(userInfo));
        console.log('ðŸ”’ BiometricAuth: InformaÃ§Ãµes do usuÃ¡rio salvas');
      }
    } catch (error) {
      console.error(
        'ðŸ”’ BiometricAuth: Erro ao salvar informaÃ§Ãµes do usuÃ¡rio:',
        error
      );
    }
  }

  // Carregar informaÃ§Ãµes do usuÃ¡rio
  loadUserInfo() {
    try {
      const saved = localStorage.getItem('biometric_user_info');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error(
        'ðŸ”’ BiometricAuth: Erro ao carregar informaÃ§Ãµes do usuÃ¡rio:',
        error
      );
      return null;
    }
  }

  // Carregar credenciais do localStorage
  loadCredentials() {
    try {
      const saved = localStorage.getItem('biometric_credentials');
      if (!saved) {return null;}

      const credentialData = JSON.parse(saved);

      // Converter arrays de volta para Uint8Array
      credentialData.rawId = new Uint8Array(credentialData.rawId);
      credentialData.response.clientDataJSON = new Uint8Array(
        credentialData.response.clientDataJSON
      );
      credentialData.response.attestationObject = new Uint8Array(
        credentialData.response.attestationObject
      );

      return credentialData;
    } catch (error) {
      console.error('ðŸ”’ BiometricAuth: Erro ao carregar credenciais:', error);
      return null;
    }
  }

  // Verificar se hÃ¡ credenciais salvas
  hasSavedCredentials() {
    return localStorage.getItem('biometric_credentials') !== null;
  }

  // Remover credenciais salvas
  removeCredentials() {
    try {
      localStorage.removeItem('biometric_credentials');
      console.log('ðŸ”’ BiometricAuth: Credenciais removidas');
      return true;
    } catch (error) {
      console.error('ðŸ”’ BiometricAuth: Erro ao remover credenciais:', error);
      return false;
    }
  }

  // Obter informaÃ§Ãµes do dispositivo
  getDeviceInfo() {
    return {
      isSupported: this.isSupported,
      isAvailable: this.isAvailable,
      hasCredentials: this.hasSavedCredentials(),
      userAgent: navigator.userAgent,
      platform: navigator.platform
    };
  }
}

// InstÃ¢ncia global
window.biometricAuth = new BiometricAuth();

// FunÃ§Ã£o para mostrar modal de configuraÃ§Ã£o biomÃ©trica
window.showBiometricSetup = async function () {
  try {
    // Verificar disponibilidade
    const isAvailable = await window.biometricAuth.checkAvailability();

    if (!isAvailable) {
      Snackbar({
        message: 'AutenticaÃ§Ã£o biomÃ©trica nÃ£o disponÃ­vel neste dispositivo.',
        type: 'warning'
      });
      return;
    }

    const user = window.FirebaseAuth?.currentUser;
    if (!user) {
      Snackbar({
        message:
          'VocÃª precisa estar logado para configurar autenticaÃ§Ã£o biomÃ©trica.',
        type: 'error'
      });
      return;
    }

    // Modal de configuraÃ§Ã£o
    const modal = Modal({
      title: 'ðŸ”’ Configurar AutenticaÃ§Ã£o BiomÃ©trica',
      content: `
        <div class="space-y-4">
          <div class="text-center">
            <div class="text-6xl mb-4">ðŸ”</div>
            <h3 class="text-lg font-semibold mb-2">AutenticaÃ§Ã£o BiomÃ©trica</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Configure impressÃ£o digital ou reconhecimento facial para acessar o app rapidamente.
            </p>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">ðŸ“± Como Funciona:</h4>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>â€¢ Use sua impressÃ£o digital ou face para fazer login</li>
              <li>â€¢ Acesso rÃ¡pido e seguro ao aplicativo</li>
              <li>â€¢ Funciona offline, sem necessidade de senha</li>
              <li>â€¢ Dados armazenados localmente no seu dispositivo</li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <button id="btn-setup-biometric" class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2">
              <span>ðŸ”</span> Configurar Agora
            </button>
            <button onclick="closeModal()" class="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
              Cancelar
            </button>
          </div>
        </div>
      `,
      onClose: () => modal.remove()
    });

    document.body.appendChild(modal);

    // Event listener para configuraÃ§Ã£o
    setTimeout(() => {
      const setupBtn = document.getElementById('btn-setup-biometric');
      if (setupBtn) {
        setupBtn.addEventListener('click', async () => {
          try {
            setupBtn.disabled = true;
            setupBtn.innerHTML = '<span>â³</span> Configurando...';

            await window.biometricAuth.register(user.uid, user.email);

            // Salvar informaÃ§Ãµes do usuÃ¡rio apÃ³s registro bem-sucedido
            window.biometricAuth.saveUserInfo(user.uid);

            Snackbar({
              message: 'AutenticaÃ§Ã£o biomÃ©trica configurada com sucesso!',
              type: 'success'
            });

            modal.remove();
          } catch (error) {
            console.error('Erro na configuraÃ§Ã£o biomÃ©trica:', error);
            Snackbar({
              message:
                'Erro ao configurar autenticaÃ§Ã£o biomÃ©trica: ' + error.message,
              type: 'error'
            });

            setupBtn.disabled = false;
            setupBtn.innerHTML = '<span>ðŸ”</span> Configurar Agora';
          }
        });
      }
    }, 100);
  } catch (error) {
    console.error('Erro ao mostrar configuraÃ§Ã£o biomÃ©trica:', error);
    Snackbar({
      message: 'Erro ao abrir configuraÃ§Ã£o biomÃ©trica: ' + error.message,
      type: 'error'
    });
  }
};

// FunÃ§Ã£o para autenticaÃ§Ã£o biomÃ©trica
window.authenticateWithBiometric = async function () {
  try {
    console.log('ðŸ” Iniciando autenticaÃ§Ã£o biomÃ©trica...');

    const isAvailable = await window.biometricAuth.checkAvailability();

    if (!isAvailable) {
      Snackbar({
        message: 'AutenticaÃ§Ã£o biomÃ©trica nÃ£o disponÃ­vel neste dispositivo.',
        type: 'warning'
      });
      return false;
    }

    if (!window.biometricAuth.hasSavedCredentials()) {
      Snackbar({
        message:
          'Configure a autenticaÃ§Ã£o biomÃ©trica primeiro nas configuraÃ§Ãµes.',
        type: 'info'
      });
      return false;
    }

    window.showLoading(true);

    const result = await window.biometricAuth.authenticate();

    if (result.success) {
      console.log('ðŸ” AutenticaÃ§Ã£o biomÃ©trica bem-sucedida, fazendo login...');

      // Carregar dados do usuÃ¡rio salvo
      const savedCredentials = window.biometricAuth.loadCredentials();
      const userInfo = window.biometricAuth.loadUserInfo();

      if (savedCredentials && savedCredentials.userId && userInfo) {
        try {
          // Verificar se jÃ¡ existe um usuÃ¡rio logado
          const currentUser = window.FirebaseAuth?.currentUser;
          if (currentUser && currentUser.uid === savedCredentials.userId) {
            console.log('ðŸ” UsuÃ¡rio jÃ¡ estÃ¡ logado');
            Snackbar({
              message: 'Login biomÃ©trico realizado com sucesso!',
              type: 'success'
            });
            window.showLoading(false);
            return true;
          }

          // Simular login bem-sucedido com as informaÃ§Ãµes salvas
          console.log(
            'ðŸ” Fazendo login automÃ¡tico para usuÃ¡rio:',
            userInfo.email
          );

          // Criar um objeto de usuÃ¡rio simulado
          const simulatedUser = {
            uid: userInfo.uid,
            email: userInfo.email,
            displayName: userInfo.displayName,
            photoURL: userInfo.photoURL,
            isAnonymous: false,
            providerData: [
              {
                providerId: 'google.com',
                uid: userInfo.uid,
                displayName: userInfo.displayName,
                email: userInfo.email,
                photoURL: userInfo.photoURL
              }
            ]
          };

          // Disparar evento de login bem-sucedido
          const loginEvent = new CustomEvent('biometricLoginSuccess', {
            detail: {
              user: simulatedUser,
              userId: savedCredentials.userId
            }
          });
          document.dispatchEvent(loginEvent);

          Snackbar({
            message: 'Login biomÃ©trico realizado com sucesso!',
            type: 'success'
          });

          window.showLoading(false);
          return true;
        } catch (loginError) {
          console.error('Erro ao fazer login:', loginError);
          Snackbar({
            message: 'Erro ao fazer login. Tente novamente.',
            type: 'error'
          });
          window.showLoading(false);
          return false;
        }
      } else {
        Snackbar({
          message: 'Credenciais biomÃ©tricas invÃ¡lidas ou incompletas.',
          type: 'error'
        });
        window.showLoading(false);
        return false;
      }
    }

    window.showLoading(false);
    return false;
  } catch (error) {
    console.error('Erro na autenticaÃ§Ã£o biomÃ©trica:', error);

    let errorMessage = 'Erro na autenticaÃ§Ã£o biomÃ©trica.';
    if (error.name === 'NotAllowedError') {
      errorMessage = 'AutenticaÃ§Ã£o biomÃ©trica cancelada pelo usuÃ¡rio.';
    } else if (error.name === 'SecurityError') {
      errorMessage = 'Erro de seguranÃ§a na autenticaÃ§Ã£o biomÃ©trica.';
    } else if (error.name === 'NotSupportedError') {
      errorMessage = 'AutenticaÃ§Ã£o biomÃ©trica nÃ£o suportada.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    Snackbar({
      message: errorMessage,
      type: 'error'
    });

    window.showLoading(false);
    return false;
  }
};

// Inicializar verificaÃ§Ã£o de disponibilidade
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const isAvailable = await window.biometricAuth.checkAvailability();
    console.log(
      'ðŸ”’ BiometricAuth: InicializaÃ§Ã£o concluÃ­da, disponÃ­vel:',
      isAvailable
    );

    // Se biometria estiver disponÃ­vel e hÃ¡ credenciais salvas, mostrar botÃ£o
    if (isAvailable && window.biometricAuth.hasSavedCredentials()) {
      const biometricBtn = document.getElementById('biometric-login-btn');
      if (biometricBtn) {
        biometricBtn.style.display = 'block';
        biometricBtn.innerHTML = '<span>ðŸ”</span> Entrar com Biometria';
      }
    } else {
      // Ocultar botÃ£o se nÃ£o disponÃ­vel
      const biometricBtn = document.getElementById('biometric-login-btn');
      if (biometricBtn) {
        biometricBtn.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('ðŸ”’ BiometricAuth: Erro na inicializaÃ§Ã£o:', error);
  }
});
