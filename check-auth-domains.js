// Script para verificar e configurar domínios autorizados no Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBsm9dH3SKlEW1IVwgI6jEAb85mPXfoSzU',
    authDomain: 'controle-financeiro-b98ec.firebaseapp.com',
    projectId: 'controle-financeiro-b98ec',
    storageBucket: 'controle-financeiro-b98ec.appspot.com',
    messagingSenderId: '847249101986',
    appId: '1:847249101986:web:e0e807771b90111812f3fb',
    measurementId: 'G-2NPH7PQ32J'
};

console.log('🔧 Verificando configuração do Firebase...');
console.log('📋 Projeto:', firebaseConfig.projectId);
console.log('🌐 Auth Domain:', firebaseConfig.authDomain);

console.log('\n📝 INSTRUÇÕES PARA RESOLVER O PROBLEMA:');
console.log('1. Acesse: https://console.firebase.google.com/project/controle-financeiro-b98ec/authentication/settings');
console.log('2. Vá para a seção "Authorized domains"');
console.log('3. Adicione os seguintes domínios:');
console.log('   ✅ localhost');
console.log('   ✅ 127.0.0.1');
console.log('   ✅ controle-financeiro-b98ec.web.app');
console.log('   ✅ controle-financeiro-b98ec.firebaseapp.com');

console.log('\n🚨 IMPORTANTE:');
console.log('- NÃO inclua http:// ou https://');
console.log('- Use apenas o domínio base (ex: localhost, não localhost:5176)');
console.log('- Aguarde alguns minutos após adicionar os domínios');

// Teste de inicialização
try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log('\n✅ Firebase inicializado com sucesso!');
    console.log('🔑 Auth configurado para:', auth.config.authDomain);
} catch (error) {
    console.error('\n❌ Erro ao inicializar Firebase:', error.message);
}

console.log('\n🧪 URLs para testar após configurar os domínios:');
console.log('🏠 Local: http://localhost:5176/');
console.log('🌐 Produção: https://controle-financeiro-b98ec.web.app');