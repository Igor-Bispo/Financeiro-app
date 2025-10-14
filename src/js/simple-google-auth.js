// Simple Google Auth - versão sem imports para debug
// Este arquivo será carregado diretamente via script tag

window.SimpleGoogleAuth = {
  async initialize() {
    console.log('🔧 [SimpleGoogleAuth] Inicializando...');
    
    // Verificar se estamos no Capacitor
    if (!window.Capacitor) {
      throw new Error('Capacitor não está disponível');
    }
    
    if (!window.Capacitor.isNativePlatform()) {
      throw new Error('Não é plataforma nativa');
    }
    
    // Verificar se GoogleAuth está disponível
    if (!window.GoogleAuth) {
      // Tentar acessar via Capacitor.Plugins
      if (window.Capacitor.Plugins && window.Capacitor.Plugins.GoogleAuth) {
        window.GoogleAuth = window.Capacitor.Plugins.GoogleAuth;
      } else {
        throw new Error('GoogleAuth plugin não encontrado');
      }
    }
    
    const config = {
      clientId: '418109336597-rvf9l9eevq8bd1tmtrcq2kfi3l9gmpdj.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
      forceCodeForRefreshToken: true
    };
    
    console.log('🔧 [SimpleGoogleAuth] Configurando com:', config);
    
    await window.GoogleAuth.initialize(config);
    
    console.log('✅ [SimpleGoogleAuth] Inicializado com sucesso');
    return true;
  },
  
  async signIn() {
    console.log('🔧 [SimpleGoogleAuth] Fazendo login...');
    
    const result = await window.GoogleAuth.signIn();
    
    console.log('🔧 [SimpleGoogleAuth] Resultado:', {
      email: result.email,
      name: result.name,
      hasToken: !!result.authentication?.idToken
    });
    
    return {
      uid: result.id,
      email: result.email,
      displayName: result.name,
      photoURL: result.imageUrl,
      providerId: 'google.com',
      isAnonymous: false,
      token: result.authentication?.idToken
    };
  }
};

console.log('✅ SimpleGoogleAuth carregado e disponível globalmente');