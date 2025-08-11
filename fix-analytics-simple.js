// Script simples para corrigir análises financeiras
// Copie e cole este código no console do navegador (F12)

(async function fixAnalytics() {
  console.log('🔧 Corrigindo análises financeiras...');
  
  try {
    // 1. Verificar se o usuário está logado
    if (!window.appState?.currentUser) {
      console.log('❌ Usuário não está logado. Redirecionando para login...');
      window.location.reload();
      return;
    }
    
    console.log('✅ Usuário logado:', window.appState.currentUser.email);
    
    // 2. Verificar se há orçamento selecionado
    if (!window.appState?.currentBudget) {
      console.log('⚠️ Nenhum orçamento selecionado. Tentando carregar...');
      
      // Carregar orçamentos
      if (typeof window.loadBudgets === 'function') {
        await window.loadBudgets();
        console.log('📊 Orçamentos carregados');
      }
      
      // Selecionar orçamento padrão
      if (typeof window.selectDefaultBudget === 'function') {
        await window.selectDefaultBudget();
        console.log('📊 Orçamento padrão selecionado');
      }
    }
    
    // 3. Verificar novamente
    if (!window.appState?.currentBudget) {
      console.log('❌ Ainda não há orçamento selecionado');
      alert('Não foi possível selecionar um orçamento. Tente criar um orçamento primeiro.');
      return;
    }
    
    console.log('✅ Orçamento selecionado:', window.appState.currentBudget.id);
    
    // 4. Navegar para análises
    console.log('🔄 Navegando para análises...');
    window.location.hash = '#/analytics';
    
    // 5. Aguardar um pouco e tentar renderizar
    setTimeout(async () => {
      try {
        if (typeof window.renderAnalytics === 'function') {
          await window.renderAnalytics();
          console.log('✅ Análises renderizadas com sucesso');
        } else {
          console.log('⚠️ Função renderAnalytics não encontrada, recarregando página...');
          window.location.reload();
        }
      } catch (error) {
        console.error('❌ Erro ao renderizar análises:', error);
        console.log('🔄 Recarregando página...');
        window.location.reload();
      }
    }, 1000);
    
  } catch (error) {
    console.error('❌ Erro durante correção:', error);
    console.log('🔄 Recarregando página...');
    window.location.reload();
  }
})();