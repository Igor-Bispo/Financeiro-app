// TEMPLATE DE CONFIGURAÇÃO FIREBASE
// Substitua os valores abaixo pelas suas credenciais do novo projeto

const firebaseConfig = {
    // ⚠️ SUBSTITUA ESTES VALORES PELAS SUAS CREDENCIAIS
    apiKey: "COLE_SUA_API_KEY_AQUI",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO_ID",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// ===========================================
// INSTRUÇÕES:
// 1. Vá para Firebase Console
// 2. Project Settings > Your apps
// 3. Copie a configuração
// 4. Substitua os valores acima
// 5. Salve como js/firebase/config.js
// ===========================================

// Exemplo de como deve ficar:
/*
const firebaseConfig = {
    apiKey: "AIzaSyB8QauQw7YCg2DDsleFF5pbIcmPPuThv6M",
    authDomain: "meu-controle-financeiro.firebaseapp.com",
    projectId: "meu-controle-financeiro-12345",
    storageBucket: "meu-controle-financeiro-12345.appspot.com",
    messagingSenderId: "196239620563",
    appId: "1:196239620563:web:83f64e077179153f585726"
};
*/

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