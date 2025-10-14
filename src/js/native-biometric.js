// Wrapper para Biometria Nativa via Capacitor Plugin
// Funciona APENAS no APK (Android nativo)

export class NativeBiometric {
  constructor() {
    this.isNative = window.Capacitor?.isNativePlatform();
    this.plugin = window.Capacitor?.Plugins?.BiometricAuth;
  }

  /**
   * Verificar se biometria está disponível no dispositivo
   * @returns {Promise<{isAvailable: boolean, biometryType: string, reason: string}>}
   */
  async isAvailable() {
    console.log('🔒 [NativeBiometric] Verificando disponibilidade...');
    console.log('🔒 [NativeBiometric] É nativo:', this.isNative);
    console.log('🔒 [NativeBiometric] Plugin disponível:', !!this.plugin);

    if (!this.isNative) {
      return {
        isAvailable: false,
        biometryType: 'none',
        reason: 'Funciona apenas no APK nativo'
      };
    }

    if (!this.plugin) {
      console.error('🔒 [NativeBiometric] Plugin BiometricAuth não encontrado');
      return {
        isAvailable: false,
        biometryType: 'none',
        reason: 'Plugin não encontrado'
      };
    }

    try {
      const result = await this.plugin.isAvailable();
      console.log('🔒 [NativeBiometric] Resultado da verificação:', result);
      return result;
    } catch (error) {
      console.error('🔒 [NativeBiometric] Erro ao verificar disponibilidade:', error);
      return {
        isAvailable: false,
        biometryType: 'none',
        reason: error.message || 'Erro desconhecido'
      };
    }
  }

  /**
   * Solicitar autenticação biométrica
   * @param {Object} options - Opções de autenticação
   * @param {string} options.title - Título do prompt
   * @param {string} options.subtitle - Subtítulo do prompt
   * @param {string} options.description - Descrição adicional
   * @param {string} options.negativeButtonText - Texto do botão de cancelar
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async authenticate(options = {}) {
    console.log('🔒 [NativeBiometric] Iniciando autenticação...');
    console.log('🔒 [NativeBiometric] Opções:', options);

    if (!this.isNative || !this.plugin) {
      return {
        success: false,
        error: 'Biometria nativa não disponível'
      };
    }

    const defaultOptions = {
      title: 'Autenticação Biométrica',
      subtitle: 'Confirme sua identidade',
      description: '',
      negativeButtonText: 'Cancelar'
    };

    const authOptions = { ...defaultOptions, ...options };

    try {
      const result = await this.plugin.authenticate(authOptions);
      console.log('🔒 [NativeBiometric] Resultado da autenticação:', result);
      return result;
    } catch (error) {
      console.error('🔒 [NativeBiometric] Erro na autenticação:', error);
      return {
        success: false,
        error: error.message || 'Erro na autenticação'
      };
    }
  }

  /**
   * Salvar credenciais de login para uso posterior
   * @param {string} userId - ID do usuário
   * @param {Object} userInfo - Informações do usuário
   */
  saveCredentials(userId, userInfo) {
    if (!this.isNative) {
      console.warn('🔒 [NativeBiometric] saveCredentials só funciona no APK');
      return;
    }

    try {
      localStorage.setItem('biometric_userId', userId);
      localStorage.setItem('biometric_userInfo', JSON.stringify(userInfo));
      console.log('🔒 [NativeBiometric] Credenciais salvas:', userId);
    } catch (error) {
      console.error('🔒 [NativeBiometric] Erro ao salvar credenciais:', error);
    }
  }

  /**
   * Carregar credenciais salvas
   * @returns {{userId: string, userInfo: Object} | null}
   */
  loadCredentials() {
    if (!this.isNative) {
      return null;
    }

    try {
      const userId = localStorage.getItem('biometric_userId');
      const userInfoStr = localStorage.getItem('biometric_userInfo');

      if (userId && userInfoStr) {
        return {
          userId,
          userInfo: JSON.parse(userInfoStr)
        };
      }
    } catch (error) {
      console.error('🔒 [NativeBiometric] Erro ao carregar credenciais:', error);
    }

    return null;
  }

  /**
   * Limpar credenciais salvas
   */
  clearCredentials() {
    if (!this.isNative) {
      return;
    }

    try {
      localStorage.removeItem('biometric_userId');
      localStorage.removeItem('biometric_userInfo');
      localStorage.removeItem('biometric_enabled');
      console.log('🔒 [NativeBiometric] Credenciais limpas');
    } catch (error) {
      console.error('🔒 [NativeBiometric] Erro ao limpar credenciais:', error);
    }
  }

  /**
   * Verificar se há credenciais salvas
   * @returns {boolean}
   */
  hasCredentials() {
    if (!this.isNative) {
      return false;
    }

    return !!localStorage.getItem('biometric_userId');
  }
}

// Expor globalmente
if (typeof window !== 'undefined') {
  window.nativeBiometric = new NativeBiometric();
  console.log('🔒 [NativeBiometric] Wrapper criado e exposto globalmente');
}


