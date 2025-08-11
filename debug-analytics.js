// Script de Debug para Análises Financeiras
// Copie e cole este código no console do navegador (F12)

(async function debugAnalytics() {
  console.log('🔍 Iniciando debug das análises financeiras...');
  
  try {
    // 1. Verificar estado da aplicação
    console.log('📊 Estado atual da aplicação:', {
      user: window.appState?.currentUser?.uid,
      budget: window.appState?.currentBudget?.id,
      isInitialized: window.appState?.isInitialized,
      budgets: window.appState?.budgets?.length || 0
    });
    
    // 2. Verificar se o usuário está autenticado
    if (!window.appState?.currentUser) {
      console.error('❌ Usuário não está autenticado');
      alert('Por favor, faça login primeiro');
      return;
    }
    
    // 3. Verificar se há orçamento selecionado
    if (!window.appState?.currentBudget) {
      console.log('⚠️ Nenhum orçamento selecionado. Tentando carregar...');
      
      // Tentar carregar orçamentos
      if (typeof window.loadBudgets === 'function') {
        await window.loadBudgets();
        console.log('📊 Orçamentos carregados:', window.appState?.budgets?.length || 0);
        
        // Selecionar primeiro orçamento se disponível
        if (window.appState?.budgets?.length > 0) {
          const firstBudget = window.appState.budgets[0];
          if (typeof window.setCurrentBudget === 'function') {
            await window.setCurrentBudget(firstBudget.id);
            console.log('✅ Orçamento selecionado:', firstBudget.id);
          }
        }
      }
    }
    
    // 4. Verificar novamente após tentativa de correção
    if (!window.appState?.currentBudget) {
      console.error('❌ Não foi possível selecionar um orçamento');
      alert('Não há orçamentos disponíveis. Crie um orçamento primeiro.');
      return;
    }
    
    // 5. Tentar gerar relatório
    console.log('📊 Tentando gerar relatório para orçamento:', window.appState.currentBudget.id);
    
    if (typeof window.Analytics?.gerarRelatorioCompleto === 'function') {
      const relatorio = await window.Analytics.gerarRelatorioCompleto(window.appState.currentBudget.id);
      console.log('✅ Relatório gerado com sucesso:', relatorio);
      
      // Tentar recarregar a página de análises
      if (typeof window.renderAnalytics === 'function') {
        await window.renderAnalytics();
        console.log('✅ Página de análises recarregada');
      }
    } else {
      console.error('❌ Função Analytics.gerarRelatorioCompleto não encontrada');
    }
    
  } catch (error) {
    console.error('❌ Erro durante debug:', error);
    console.error('Stack trace:', error.stack);
  }
})();