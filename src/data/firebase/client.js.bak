// data/firebase/client.js
// Inicialização central do Firebase (env ou fallback)

import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Config via env; se não houver, usar os valores atuais do projeto para compatibilidade
const firebaseConfig = {
  apiKey: import.meta?.env?.VITE_FIREBASE_API_KEY || 'AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY',
  authDomain: import.meta?.env?.VITE_FIREBASE_AUTH_DOMAIN || 'controle-financeiro-b98ec.firebaseapp.com',
  projectId: import.meta?.env?.VITE_FIREBASE_PROJECT_ID || 'controle-financeiro-b98ec',
  storageBucket: import.meta?.env?.VITE_FIREBASE_STORAGE_BUCKET || 'controle-financeiro-b98ec.firebasestorage.app',
  messagingSenderId: import.meta?.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '418109336597',
  appId: import.meta?.env?.VITE_FIREBASE_APP_ID || '1:418109336597:web:871b262a76e57455ebb21c',
  measurementId: import.meta?.env?.VITE_FIREBASE_MEASUREMENT_ID || 'G-7RW2F269V6',
};

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
