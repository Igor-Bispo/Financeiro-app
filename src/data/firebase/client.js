// data/firebase/client.js
// Inicialização central do Firebase (env ou fallback)

import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Analytics: carregar de forma preguiçosa e somente se suportado

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
const auth = getAuth(app);
const db = getFirestore(app);

// Inicialização segura do Analytics (evita warnings em ambientes sem IndexedDB)
let analytics = null;
(() => {
  try {
    // Somente em ambiente de navegador com measurementId configurado
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      // Import dinâmico para não carregar analytics quando não suportado
      import('firebase/analytics')
        .then(({ isSupported, getAnalytics }) =>
          isSupported()
            .then((supported) => {
              if (supported) {
                analytics = getAnalytics(app);
              }
            })
            .catch(() => {/* ignore */})
        )
        .catch(() => {/* ignore */});
    }
  } catch {
    // Ignorar quaisquer erros de inicialização de analytics
  }
})();

setPersistence(auth, browserLocalPersistence).catch(err => {
  console.error('Firebase Auth persistence error:', err);
});

export { app, auth, db, analytics };
export default app;
