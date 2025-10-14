import networkHandler from '../../core/network/networkHandler.js';

/**
 * Serviço de autenticação resiliente com tratamento específico de erros
 */
class ResilientAuthService {
  constructor() {
    this.auth = null;
    this.currentUser = null;
    this.authStateListeners = [];
    this.retryAttempts = 3;
    this.isInitialized = false;
    console.log('🔐 [ResilientAuthService] Inicializado');
  }

  async initialize(firebaseAuth) {
    try {
      this.auth = firebaseAuth;
      this.setupAuthStateListener();
      this.isInitialized = true;
      console.log('✅ [ResilientAuthService] Serviço de auth inicializado');
    } catch (error) {
      console.error('❌ [ResilientAuthService] Erro ao inicializar:', error);
      throw error;
    }
  }

  setupAuthStateListener() {
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      console.log('👤 [ResilientAuthService] Estado do usuário:', user ? user.uid : 'deslogado');
      
      // Notificar listeners
      this.authStateListeners.forEach(listener => {
        try {
          listener(user);
        } catch (error) {
          console.error('❌ [ResilientAuthService] Erro em listener:', error);
        }
      });
    });
  }

  onAuthStateChanged(callback) {
    this.authStateListeners.push(callback);
    
    // Chamar imediatamente se já tiver usuário
    if (this.currentUser !== null) {
      callback(this.currentUser);
    }
    
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  async signInWithCredential(credential) {
    return networkHandler.retryOperation(async () => {
      try {
        console.log('🔐 [ResilientAuthService] Iniciando login...');
        const result = await this.auth.signInWithCredential(credential);
        
        if (result.user) {
          this.currentUser = result.user;
          console.log('✅ [ResilientAuthService] Login bem-sucedido:', result.user.uid);
          
          // Verificar se o usuário precisa de configuração adicional
          await this.ensureUserProfile(result.user);
          
          return result;
        } else {
          throw new Error('Nenhum usuário retornado do Firebase Auth');
        }
      } catch (error) {
        console.error('❌ [ResilientAuthService] Erro no login:', error);
        throw this.handleAuthError(error);
      }
    }, 'login com credencial');
  }

  async ensureUserProfile(user) {
    try {
      // Verificar se o perfil do usuário existe no Firestore
      if (window.ResilientFirebaseClient) {
        const existingProfile = await window.ResilientFirebaseClient.getDocument('usuarios', user.uid);
        
        if (!existingProfile) {
          console.log('👤 [ResilientAuthService] Criando perfil inicial do usuário');
          await window.ResilientFirebaseClient.addDocument('usuarios', {
            id: user.uid,
            email: user.email,
            displayName: user.displayName || user.email,
            photoURL: user.photoURL,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
    } catch (error) {
      console.warn('⚠️ [ResilientAuthService] Erro ao criar perfil do usuário:', error);
      // Não falhar o login por causa disso
    }
  }

  async signOut() {
    return networkHandler.retryOperation(async () => {
      try {
        console.log('🔐 [ResilientAuthService] Realizando logout...');
        await this.auth.signOut();
        this.currentUser = null;
        console.log('✅ [ResilientAuthService] Logout realizado');
      } catch (error) {
        console.error('❌ [ResilientAuthService] Erro no logout:', error);
        throw this.handleAuthError(error);
      }
    }, 'logout');
  }

  async getCurrentUser() {
    return new Promise((resolve) => {
      if (this.currentUser !== null) {
        resolve(this.currentUser);
        return;
      }

      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  handleAuthError(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    console.error('🔐 [ResilientAuthService] Código do erro:', errorCode);
    
    // Mapear erros específicos do Firebase Auth
    switch (errorCode) {
    case 'auth/network-request-failed':
      return new Error('Erro de conexão. Verifique sua internet e tente novamente.');
    
    case 'auth/too-many-requests':
      return new Error('Muitas tentativas de login. Aguarde alguns minutos e tente novamente.');
    
    case 'auth/user-disabled':
      return new Error('Esta conta foi desabilitada. Entre em contato com o suporte.');
    
    case 'auth/user-not-found':
      return new Error('Usuário não encontrado. Verifique suas credenciais.');
    
    case 'auth/wrong-password':
      return new Error('Senha incorreta. Tente novamente.');
    
    case 'auth/invalid-credential':
      return new Error('Credenciais inválidas. Tente fazer login novamente.');
    
    case 'auth/account-exists-with-different-credential':
      return new Error('Já existe uma conta com este email usando um método diferente de login.');
    
    case 'auth/credential-already-in-use':
      return new Error('Esta credencial já está sendo usada por outra conta.');
    
    case 'auth/operation-not-allowed':
      return new Error('Método de login não permitido. Entre em contato com o suporte.');
    
    case 'auth/weak-password':
      return new Error('A senha é muito fraca. Escolha uma senha mais forte.');
    
    case 'auth/email-already-in-use':
      return new Error('Este email já está sendo usado por outra conta.');
    
    case 'auth/invalid-email':
      return new Error('Email inválido. Verifique o formato do email.');
    
    case 'auth/popup-closed-by-user':
      return new Error('Login cancelado. Tente novamente.');
    
    case 'auth/popup-blocked':
      return new Error('Pop-up bloqueado pelo navegador. Permita pop-ups para este site.');
    
    case 'auth/cancelled-popup-request':
      return new Error('Solicitação de login cancelada.');
    
    case 'auth/internal-error':
      return new Error('Erro interno. Tente novamente em alguns minutos.');
    
    default:
      console.warn('⚠️ [ResilientAuthService] Erro não mapeado:', errorCode, errorMessage);
      return new Error(`Erro de autenticação: ${errorMessage}`);
    }
  }

  // Verificar se o usuário está logado
  isAuthenticated() {
    return this.currentUser !== null;
  }

  // Obter token do usuário atual
  async getCurrentUserToken() {
    if (!this.currentUser) {
      throw new Error('Usuário não autenticado');
    }

    return networkHandler.retryOperation(async () => {
      return await this.currentUser.getIdToken();
    }, 'obter token do usuário');
  }

  // Atualizar perfil do usuário
  async updateProfile(profile) {
    if (!this.currentUser) {
      throw new Error('Usuário não autenticado');
    }

    return networkHandler.retryOperation(async () => {
      await this.currentUser.updateProfile(profile);
      console.log('✅ [ResilientAuthService] Perfil atualizado');
    }, 'atualizar perfil');
  }
}

// Instância global
const resilientAuthService = new ResilientAuthService();
window.ResilientAuthService = resilientAuthService;
export default resilientAuthService;