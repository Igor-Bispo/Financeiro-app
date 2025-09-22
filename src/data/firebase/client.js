// data/firebase/client.js
// Inicialização central do Firebase (env ou fallback)

import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Config via env; fallback para desenvolvimento local
const firebaseConfig = {
  apiKey: import.meta?.env?.VITE_FIREBASE_API_KEY || (import.meta.env.DEV ? 'AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY' : ''),
  authDomain: import.meta?.env?.VITE_FIREBASE_AUTH_DOMAIN || (import.meta.env.DEV ? 'controle-financeiro-b98ec.firebaseapp.com' : ''),
  projectId: import.meta?.env?.VITE_FIREBASE_PROJECT_ID || (import.meta.env.DEV ? 'controle-financeiro-b98ec' : ''),
  storageBucket: import.meta?.env?.VITE_FIREBASE_STORAGE_BUCKET || (import.meta.env.DEV ? 'controle-financeiro-b98ec.firebasestorage.app' : ''),
  messagingSenderId: import.meta?.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || (import.meta.env.DEV ? '418109336597' : ''),
  appId: import.meta?.env?.VITE_FIREBASE_APP_ID || (import.meta.env.DEV ? '1:418109336597:web:871b262a76e57455ebb21c' : ''),
  measurementId: import.meta?.env?.VITE_FIREBASE_MEASUREMENT_ID || (import.meta.env.DEV ? 'G-7RW2F269V6' : ''),
};

// Validar configuração em produção
if (import.meta.env.PROD) {
  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);
  
  if (missingKeys.length > 0) {
    console.error('❌ Firebase configuration missing required keys:', missingKeys);
    throw new Error(`Firebase configuration incomplete. Missing: ${missingKeys.join(', ')}`);
  }
}

const app = initializeApp(firebaseConfig);
try {
  console.info('[Firebase] Connected project:', firebaseConfig.projectId);
} catch {}
const auth = getAuth(app);
const db = getFirestore(app);
let analytics = null;
try { analytics = getAnalytics(app); } catch { /* analytics pode não estar disponível */ }

// Garanta que a persistência esteja configurada antes de qualquer listener de auth
const authReady = setPersistence(auth, browserLocalPersistence)
  .then(() => {
    try { console.info('[Firebase] Auth persistence set to local'); } catch {}
  })
  .catch(err => {
    console.error('Firebase Auth persistence error:', err);
  });

export { app, auth, db, analytics, authReady };
export default app;
