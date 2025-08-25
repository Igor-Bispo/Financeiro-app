// Autenticação Biométrica para Mobile
// Usa Web Authentication API para fingerprint/facial recognition

import { Snackbar } from './ui/Snackbar.js';
import { Modal } from './ui/Modal.js';

export class BiometricAuth {
  constructor() {
    this.isSupported = this.checkSupport();
    this.isAvailable = false;
    this.credentials = null;
  }

  // Verificar se o dispositivo suporta autenticação biométrica
  checkSupport() {
    return (
      window.PublicKeyCredential &&
      window.PublicKeyCredential
        .isUserVerifyingPlatformAuthenticatorAvailable &&
      window.PublicKeyCredential.isConditionalMediationAvailable
    );
  }

  // Verificar se a autenticação biométrica está disponível
  async checkAvailability() {
    if (!this.isSupported) {
      console.log('🔒 BiometricAuth: Web Authentication API não suportada');
      return false;
    }

    try {
      const [userVerifying, conditionalMediation] = await Promise.all([
        window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
        window.PublicKeyCredential.isConditionalMediationAvailable()
      ]);

      this.isAvailable = userVerifying && conditionalMediation;
      console.log('🔒 BiometricAuth: Disponibilidade verificada:', {
        userVerifying,
        conditionalMediation,
        isAvailable: this.isAvailable
      });

      return this.isAvailable;
    } catch (error) {
      console.error(
        '🔒 BiometricAuth: Erro ao verificar disponibilidade:',
        error
      );
      return false;
    }
  }

  // Registrar credenciais biométricas
  async register(userId, userName) {
    if (!this.isAvailable) {
      throw new Error('Autenticação biométrica não disponível');
    }

    try {
      console.log('🔒 BiometricAuth: Iniciando registro biométrico...');

      // Gerar challenge
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // Criar opções de registro
      const publicKeyOptions = {
        challenge: challenge,
        rp: {
          name: 'Servo Tech Finanças',
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

      console.log('🔒 BiometricAuth: Registro biométrico concluído');
      return true;
    } catch (error) {
      console.error('🔒 BiometricAuth: Erro no registro:', error);
      throw error;
    }
  }

  // Autenticar usando biométrica
  async authenticate() {
    if (!this.isAvailable) {
      throw new Error('Autenticação biométrica não disponível');
    }

    try {
      console.log('🔒 BiometricAuth: Iniciando autenticação biométrica...');

      // Carregar credenciais salvas
      const savedCredentials = this.loadCredentials();
      if (!savedCredentials) {
        throw new Error('Nenhuma credencial biométrica registrada');
      }

      // Gerar challenge
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // Opções de autenticação
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

      console.log('🔒 BiometricAuth: Autenticação biométrica bem-sucedida');
      return {
        success: true,
        userId: savedCredentials.userId,
        credential: assertion
      };
    } catch (error) {
      console.error('🔒 BiometricAuth: Erro na autenticação:', error);
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

      // Salvar também informações do usuário para login automático
      this.saveUserInfo(userId);

      console.log('🔒 BiometricAuth: Credenciais salvas no localStorage');
    } catch (error) {
      console.error('🔒 BiometricAuth: Erro ao salvar credenciais:', error);
    }
  }

  // Salvar informações do usuário
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
        console.log('🔒 BiometricAuth: Informações do usuário salvas');
      }
    } catch (error) {
      console.error(
        '🔒 BiometricAuth: Erro ao salvar informações do usuário:',
        error
      );
    }
  }

  // Carregar informações do usuário
  loadUserInfo() {
    try {
      const saved = localStorage.getItem('biometric_user_info');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error(
        '🔒 BiometricAuth: Erro ao carregar informações do usuário:',
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
      console.error('🔒 BiometricAuth: Erro ao carregar credenciais:', error);
      return null;
    }
  }

  // Verificar se há credenciais salvas
  hasSavedCredentials() {
    return localStorage.getItem('biometric_credentials') !== null;
  }

  // Remover credenciais salvas
  removeCredentials() {
    try {
      localStorage.removeItem('biometric_credentials');
      console.log('🔒 BiometricAuth: Credenciais removidas');
      return true;
    } catch (error) {
      console.error('🔒 BiometricAuth: Erro ao remover credenciais:', error);
      return false;
    }
  }

  // Obter informações do dispositivo
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

// Instância global
window.biometricAuth = new BiometricAuth();

// Função para mostrar modal de configuração biométrica
window.showBiometricSetup = async function () {
  try {
    // Verificar disponibilidade
    const isAvailable = await window.biometricAuth.checkAvailability();

    if (!isAvailable) {
      Snackbar({
        message: 'Autenticação biométrica não disponível neste dispositivo.',
        type: 'warning'
      });
      return;
    }

    const user = window.FirebaseAuth?.currentUser;
    if (!user) {
      Snackbar({
        message:
          'Você precisa estar logado para configurar autenticação biométrica.',
        type: 'error'
      });
      return;
    }

    // Modal de configuração
    const modal = Modal({
      title: '🔒 Configurar Autenticação Biométrica',
      content: `
        <div class="space-y-4">
          <div class="text-center">
            <div class="text-6xl mb-4">🔐</div>
            <h3 class="text-lg font-semibold mb-2">Autenticação Biométrica</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Configure impressão digital ou reconhecimento facial para acessar o app rapidamente.
            </p>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 Como Funciona:</h4>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use sua impressão digital ou face para fazer login</li>
              <li>• Acesso rápido e seguro ao aplicativo</li>
              <li>• Funciona offline, sem necessidade de senha</li>
              <li>• Dados armazenados localmente no seu dispositivo</li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <button id="btn-setup-biometric" class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2">
              <span>🔐</span> Configurar Agora
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

    // Event listener para configuração
    setTimeout(() => {
      const setupBtn = document.getElementById('btn-setup-biometric');
      if (setupBtn) {
        setupBtn.addEventListener('click', async () => {
          try {
            setupBtn.disabled = true;
            setupBtn.innerHTML = '<span>⏳</span> Configurando...';

            await window.biometricAuth.register(user.uid, user.email);

            // Salvar informações do usuário após registro bem-sucedido
            window.biometricAuth.saveUserInfo(user.uid);

            Snackbar({
              message: 'Autenticação biométrica configurada com sucesso!',
              type: 'success'
            });

            modal.remove();
          } catch (error) {
            console.error('Erro na configuração biométrica:', error);
            Snackbar({
              message:
                'Erro ao configurar autenticação biométrica: ' + error.message,
              type: 'error'
            });

            setupBtn.disabled = false;
            setupBtn.innerHTML = '<span>🔐</span> Configurar Agora';
          }
        });
      }
    }, 100);
  } catch (error) {
    console.error('Erro ao mostrar configuração biométrica:', error);
    Snackbar({
      message: 'Erro ao abrir configuração biométrica: ' + error.message,
      type: 'error'
    });
  }
};

// Função para autenticação biométrica
window.authenticateWithBiometric = async function () {
  try {
    console.log('🔐 Iniciando autenticação biométrica...');

    const isAvailable = await window.biometricAuth.checkAvailability();

    if (!isAvailable) {
      Snackbar({
        message: 'Autenticação biométrica não disponível neste dispositivo.',
        type: 'warning'
      });
      return false;
    }

    if (!window.biometricAuth.hasSavedCredentials()) {
      Snackbar({
        message:
          'Configure a autenticação biométrica primeiro nas configurações.',
        type: 'info'
      });
      return false;
    }

    window.showLoading(true);

    const result = await window.biometricAuth.authenticate();

    if (result.success) {
      console.log('🔐 Autenticação biométrica bem-sucedida, fazendo login...');

      // Carregar dados do usuário salvo
      const savedCredentials = window.biometricAuth.loadCredentials();
      const userInfo = window.biometricAuth.loadUserInfo();

      if (savedCredentials && savedCredentials.userId && userInfo) {
        try {
          // Verificar se já existe um usuário logado
          const currentUser = window.FirebaseAuth?.currentUser;
          if (currentUser && currentUser.uid === savedCredentials.userId) {
            console.log('🔐 Usuário já está logado');
            Snackbar({
              message: 'Login biométrico realizado com sucesso!',
              type: 'success'
            });
            window.showLoading(false);
            return true;
          }

          // Simular login bem-sucedido com as informações salvas
          console.log(
            '🔐 Fazendo login automático para usuário:',
            userInfo.email
          );

          // Criar um objeto de usuário simulado
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
            message: 'Login biométrico realizado com sucesso!',
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
          message: 'Credenciais biométricas inválidas ou incompletas.',
          type: 'error'
        });
        window.showLoading(false);
        return false;
      }
    }

    window.showLoading(false);
    return false;
  } catch (error) {
    console.error('Erro na autenticação biométrica:', error);

    let errorMessage = 'Erro na autenticação biométrica.';
    if (error.name === 'NotAllowedError') {
      errorMessage = 'Autenticação biométrica cancelada pelo usuário.';
    } else if (error.name === 'SecurityError') {
      errorMessage = 'Erro de segurança na autenticação biométrica.';
    } else if (error.name === 'NotSupportedError') {
      errorMessage = 'Autenticação biométrica não suportada.';
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

// Inicializar verificação de disponibilidade
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const isAvailable = await window.biometricAuth.checkAvailability();
    console.log(
      '🔒 BiometricAuth: Inicialização concluída, disponível:',
      isAvailable
    );

    // Se biometria estiver disponível e há credenciais salvas, mostrar botão
    if (isAvailable && window.biometricAuth.hasSavedCredentials()) {
      const biometricBtn = document.getElementById('biometric-login-btn');
      if (biometricBtn) {
        biometricBtn.style.display = 'block';
        biometricBtn.innerHTML = '<span>🔐</span> Entrar com Biometria';
      }
    } else {
      // Ocultar botão se não disponível
      const biometricBtn = document.getElementById('biometric-login-btn');
      if (biometricBtn) {
        biometricBtn.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('🔒 BiometricAuth: Erro na inicialização:', error);
  }
});
