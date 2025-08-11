import { initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBsm9dH3SKlEW1IVwgI6jEAb85mPXfoSzU',
  authDomain: 'financas-app-819a8.firebaseapp.com',
  projectId: 'financas-app-819a8',
  storageBucket: 'financas-app-819a8.appspot.com',
  messagingSenderId: '847249101986',
  appId: '1:847249101986:web:e0e807771b90111812f3fb',
  measurementId: 'G-2NPH7PQ32J'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistência configurada com sucesso
  })
  .catch(error => {
    console.error('Erro ao configurar persistência do Firebase Auth:', error);
  });

export { app, auth, db };
