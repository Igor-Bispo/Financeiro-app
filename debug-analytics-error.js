// Script para debugar o erro na página de análises
// Execute no console do navegador

console.log('🔍 Debugando erro na página de análises...');

// 1. Verificar estado da aplicação
console.log('📊 Estado da aplicação:');
console.log('- currentUser:', window.appState?.currentUser?.uid || 'Não logado');
console.log('- currentBudget:', window.appState?.currentBudget?.id || 'Nenhum orçamento');
console.log('- budgets:', window.appState?.budgets?.length || 0, 'orçamentos');

// 2. Verificar Firebase
console.log('🔥 Estado do Firebase:');
console.log('- window.db:', typeof window.db);
console.log('- window.auth:', typeof window.auth);

// 3. Verificar imports do Firebase
console.log('📦 Imports do Firebase:');
try {
    const { db, auth } = await import('./src/js/firebase.js');
    console.log('- db importado:', typeof db);
    console.log('- auth importado:', typeof auth);
} catch (error) {
    console.log('❌ Erro ao importar Firebase:', error.message);
}

// 4. Verificar Analytics
console.log('📈 Classe Analytics:');
console.log('- window.Analytics:', typeof window.Analytics);

// 5. Tentar gerar relatório manualmente
if (window.appState?.currentBudget?.id) {
    console.log('🧪 Testando geração de relatório...');
    try {
        const budgetId = window.appState.currentBudget.id;
        console.log('- Orçamento ID:', budgetId);
        
        // Tentar importar Analytics
        const { Analytics } = await import('./src/js/ui/Analytics.js');
        console.log('- Analytics importado com sucesso');
        
        // Tentar gerar relatório
        const relatorio = await Analytics.gerarRelatorioCompleto(budgetId);
        console.log('✅ Relatório gerado com sucesso:', relatorio);
        
    } catch (error) {
        console.log('❌ Erro ao gerar relatório:', error.message);
        console.log('Stack trace:', error.stack);
    }
} else {
    console.log('⚠️ Não há orçamento selecionado para testar');
}

// 6. Verificar se há transações
if (window.appState?.transactions) {
    console.log('💰 Transações:', window.appState.transactions.length);
} else {
    console.log('💰 Transações: não carregadas');
}

// 7. Verificar se há categorias
if (window.appState?.categories) {
    console.log('📂 Categorias:', window.appState.categories.length);
} else {
    console.log('📂 Categorias: não carregadas');
}

console.log('🔍 Debug concluído. Verifique os logs acima para identificar o problema.');