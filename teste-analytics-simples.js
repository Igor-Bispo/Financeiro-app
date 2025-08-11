// Teste simples para verificar se o Analytics está funcionando
console.log('🧪 Teste simples do Analytics iniciado...');

async function testeAnalyticsSimples() {
  try {
    // 1. Verificar se o usuário está autenticado
    if (!window.appState?.currentUser) {
      console.log('❌ Usuário não autenticado');
      return;
    }
    console.log('✅ Usuário autenticado:', window.appState.currentUser.uid);
    
    // 2. Verificar se há orçamento selecionado
    if (!window.appState?.currentBudget) {
      console.log('❌ Nenhum orçamento selecionado');
      return;
    }
    console.log('✅ Orçamento selecionado:', window.appState.currentBudget.id);
    
    // 3. Verificar se há dados carregados
    const transactions = window.appState?.transactions || [];
    const categories = window.appState?.categories || [];
    
    console.log('📊 Dados disponíveis:');
    console.log('  - Transações:', transactions.length);
    console.log('  - Categorias:', categories.length);
    
    // 4. Verificar se Analytics está disponível
    if (typeof Analytics === 'undefined') {
      console.log('❌ Analytics não está disponível, tentando importar...');
      
      try {
        const module = await import('./src/js/ui/Analytics.js');
        window.Analytics = module.Analytics;
        console.log('✅ Analytics importado com sucesso');
      } catch (error) {
        console.log('❌ Erro ao importar Analytics:', error.message);
        return;
      }
    } else {
      console.log('✅ Analytics já está disponível');
    }
    
    // 5. Testar método básico
    const budgetId = window.appState.currentBudget.id;
    
    console.log('🧪 Testando getGastosPorCategoria...');
    try {
      const gastos = await Analytics.getGastosPorCategoria(budgetId);
      console.log('✅ getGastosPorCategoria funcionou!');
      console.log('📊 Resultado:', gastos);
    } catch (error) {
      console.log('❌ Erro em getGastosPorCategoria:', error.message);
      console.log('🔍 Stack:', error.stack);
    }
    
    console.log('🧪 Testando getEvolucaoSaldo...');
    try {
      const evolucao = await Analytics.getEvolucaoSaldo(budgetId, 3);
      console.log('✅ getEvolucaoSaldo funcionou!');
      console.log('📈 Resultado:', evolucao);
    } catch (error) {
      console.log('❌ Erro em getEvolucaoSaldo:', error.message);
      console.log('🔍 Stack:', error.stack);
    }
    
    console.log('🧪 Testando gerarRelatorioCompleto...');
    try {
      const relatorio = await Analytics.gerarRelatorioCompleto(budgetId);
      console.log('✅ gerarRelatorioCompleto funcionou!');
      console.log('📋 Resultado:', relatorio);
    } catch (error) {
      console.log('❌ Erro em gerarRelatorioCompleto:', error.message);
      console.log('🔍 Stack:', error.stack);
    }
    
    console.log('✅ Teste concluído!');
    
  } catch (error) {
    console.log('❌ Erro geral no teste:', error.message);
    console.log('🔍 Stack:', error.stack);
  }
}

// Executar teste
testeAnalyticsSimples();