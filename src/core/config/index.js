// core/config/index.js
// Centraliza flags, env e constantes (unificado)

export const APP_CONFIG = {
  env: import.meta?.env?.MODE || 'development',
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  },
  features: {
    notifications: true,
    analytics: true,
    voiceEnabled: true,
    biometricEnabled: true,
    offlineEnabled: true,
  },
  ui: {
    theme: 'auto',
    compactMode: false,
    animations: true,
    useRouter: false,
  }
};
