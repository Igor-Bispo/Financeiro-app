// Configuração centralizada do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",
    authDomain: "controle-financeiro-b98ec.firebaseapp.com",
    projectId: "controle-financeiro-b98ec",
    storageBucket: "controle-financeiro-b98ec.firebasestorage.app",
    messagingSenderId: "418109336597",
    appId: "1:418109336597:web:871b262a76e57455ebb21c",
    measurementId: "G-7RW2F269V6"
  };
  
  // Inicializa o Firebase apenas uma vez
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  
  // Disponibiliza configuração e instâncias globalmente
  window.FirebaseConfig = firebaseConfig;
  window.FirebaseApp = firebase.app();
  window.FirebaseAuth = firebase.auth();
  window.FirebaseDB = firebase.firestore();
  
  console.log('Firebase inicializado com sucesso');