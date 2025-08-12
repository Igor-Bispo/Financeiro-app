// Script para configurar domínios autorizados no Firebase Authentication
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBsm9dH3SKlEW1IVwgI6jEAb85mPXfoSzU',
  authDomain: 'financas-app-819a8.firebaseapp.com',
  projectId: 'financas-app-819a8',
  storageBucket: 'financas-app-819a8.appspot.com',
  messagingSenderId: '847249101986',
  appId: '1:847249101986:web:e0e807771b90111812f3fb',
  measurementId: 'G-2NPH7PQ32J'
};

console.log('🔧 Configuração do Firebase:');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);

console.log('\n📋 Domínios que devem estar autorizados:');
console.log('✅ localhost (para desenvolvimento)');
console.log('✅ 127.0.0.1 (para desenvolvimento)');
console.log('✅ controle-financeiro-b98ec.web.app (produção)');
console.log('✅ controle-financeiro-b98ec.firebaseapp.com (produção)');
console.log('✅ financas-app-819a8.firebaseapp.com (auth domain)');

console.log('\n🔗 Para configurar os domínios autorizados:');
console.log('1. Acesse: https://console.firebase.google.com/project/financas-app-819a8/authentication/settings');
console.log('2. Na seção "Authorized domains", adicione:');
console.log('   - localhost');
console.log('   - 127.0.0.1');
console.log('   - controle-financeiro-b98ec.web.app');
console.log('   - controle-financeiro-b98ec.firebaseapp.com');

console.log('\n⚠️  IMPORTANTE: Verifique se o projeto correto está selecionado!');
console.log('   Projeto atual: financas-app-819a8');
console.log('   Hosting URL: controle-financeiro-b98ec.web.app');