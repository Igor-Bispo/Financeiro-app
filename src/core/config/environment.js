// Configuração de Ambiente
// Versão 1.0.0 - Gerenciamento centralizado de configurações

export const config = {
  // Ambiente
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  
  // App
  appName: import.meta.env.VITE_APP_NAME || 'Servo Tech',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Debug
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
  
  // Firebase
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  },
  
  // Performance
  performance: {
    enableTelemetry: import.meta.env.VITE_ENABLE_TELEMETRY !== 'false',
    maxCacheSize: 100,
    cacheTimeout: 300000 // 5 minutos
  },
  
  // UI
  ui: {
    enableAnimations: import.meta.env.VITE_ENABLE_ANIMATIONS !== 'false',
    defaultTheme: 'light',
    compactMode: false
  },
  
  // Features
  features: {
    biometricAuth: true,
    voiceRecognition: true,
    offlineMode: true,
    pushNotifications: true
  }
};

// Validar configuração em produção
if (config.isProd) {
  const requiredFirebaseKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingKeys = requiredFirebaseKeys.filter(key => !config.firebase[key]);
  
  if (missingKeys.length > 0) {
    throw new Error(`Missing required Firebase configuration: ${missingKeys.join(', ')}`);
  }
}

// Função para obter configuração específica
export function getConfig(path, defaultValue = null) {
  return path.split('.').reduce((obj, key) => obj?.[key], config) ?? defaultValue;
}

// Função para verificar se feature está habilitada
export function isFeatureEnabled(feature) {
  return config.features[feature] === true;
}

// Função para obter URL base da API
export function getApiBaseUrl() {
  if (config.isDev) {
    return 'http://localhost:5176';
  }
  return window.location.origin;
}

export default config;
