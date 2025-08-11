// Script simples para testar Firebase
// Execute no console do navegador

console.log('🔥 Testando Firebase...');

// 1. Verificar se o Firebase está disponível globalmente
console.log('window.db:', typeof window.db);
console.log('window.auth:', typeof window.auth);

// 2. Tentar importar Firebase
try {
    console.log('📦 Tentando importar Firebase...');
    
    // Importar usando import dinâmico
    const firebaseModule = await import('./src/js/firebase.js');
    console.log('✅ Firebase importado:', firebaseModule);
    console.log('- db:', typeof firebaseModule.db);
    console.log('- auth:', typeof firebaseModule.auth);
    
    // Testar uma operação simples
    if (window.appState?.currentBudget?.id) {
        console.log('🧪 Testando consulta ao Firestore...');
        
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const { db } = firebaseModule;
        
        const budgetId = window.appState.currentBudget.id;
        const transacoesRef = collection(db, 'transactions');
        const q = query(transacoesRef, where('budgetId', '==', budgetId));
        
        const snapshot = await getDocs(q);
        console.log('✅ Consulta realizada com sucesso. Documentos encontrados:', snapshot.size);
        
    } else {
        console.log('⚠️ Nenhum orçamento selecionado para testar consulta');
    }
    
} catch (error) {
    console.log('❌ Erro ao importar ou usar Firebase:', error.message);
    console.log('Stack trace:', error.stack);
}

// 3. Verificar estado da autenticação
console.log('👤 Estado da autenticação:');
console.log('- currentUser:', window.appState?.currentUser?.uid || 'Não logado');

// 4. Verificar se há dados carregados
console.log('📊 Dados carregados:');
console.log('- budgets:', window.appState?.budgets?.length || 0);
console.log('- transactions:', window.appState?.transactions?.length || 0);
console.log('- categories:', window.appState?.categories?.length || 0);

console.log('🔍 Teste concluído.');