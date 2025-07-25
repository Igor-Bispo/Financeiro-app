import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY',
  authDomain: 'controle-financeiro-b98ec.firebaseapp.com',
  projectId: 'controle-financeiro-b98ec',
  storageBucket: 'controle-financeiro-b98ec.firebasestorage.app',
  messagingSenderId: '418109336597',
  appId: '1:418109336597:web:871b262a76e57455ebb21c',
  measurementId: 'G-7RW2F269V6'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistência configurada com sucesso
  })
  .catch((error) => {
    console.error('Erro ao configurar persistência do Firebase Auth:', error);
  });

export { app, auth, db };
