// Script para testar se o problema do Analytics foi resolvido
console.log('🔍 Testando correção do Analytics...');

// 1. Verificar se estamos na página de analytics
const currentPath = window.location.pathname;
console.log('📍 Página atual:', currentPath);

if (currentPath !== '/analytics') {
  console.log('⚠️ Navegando para a página de analytics...');
  window.history.pushState({}, '', '/analytics');
  window.dispatchEvent(new PopStateEvent('popstate'));
  
  // Aguardar um pouco para a página carregar
  setTimeout(() => {
    console.log('🔄 Página carregada, testando novamente...');
    testAnalytics();
  }, 2000);
} else {
  testAnalytics();
}

function testAnalytics() {
  console.log('🧪 Iniciando testes do Analytics...');
  
  // 2. Verificar se há erros visíveis na página
  const errorElements = document.querySelectorAll('.error, .alert-danger, [class*="error"]');
  if (errorElements.length > 0) {
    console.log('❌ Erros encontrados na página:');
    errorElements.forEach((el, index) => {
      console.log(`  ${index + 1}. ${el.textContent.trim()}`);
    });
  } else {
    console.log('✅ Nenhum erro visível na página');
  }
  
  // 3. Verificar se o Analytics está carregado
  if (typeof Analytics !== 'undefined') {
    console.log('✅ Classe Analytics está disponível');
    
    // 4. Verificar estado da aplicação
    if (window.appState) {
      console.log('✅ appState disponível');
      console.log('📊 Dados disponíveis:');
      console.log('  - Transações:', window.appState.transactions?.length || 0);
      console.log('  - Categorias:', window.appState.categories?.length || 0);
      console.log('  - Orçamento atual:', window.appState.currentBudget?.id || 'Nenhum');
    } else {
      console.log('⚠️ appState não disponível');
    }
    
    // 5. Testar função de analytics
    if (window.appState?.currentBudget?.id) {
      console.log('🧪 Testando função getGastosPorCategoria...');
      
      const budgetId = window.appState.currentBudget.id;
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      Analytics.getGastosPorCategoria(budgetId, startDate, endDate)
        .then(resultado => {
          console.log('✅ getGastosPorCategoria executado com sucesso!');
          console.log('📊 Resultado:', resultado);
        })
        .catch(error => {
          console.log('❌ Erro em getGastosPorCategoria:', error);
        });
        
      // Testar evolução do saldo
      console.log('🧪 Testando função getEvolucaoSaldo...');
      Analytics.getEvolucaoSaldo(budgetId, 6)
        .then(resultado => {
          console.log('✅ getEvolucaoSaldo executado com sucesso!');
          console.log('📈 Resultado:', resultado);
        })
        .catch(error => {
          console.log('❌ Erro em getEvolucaoSaldo:', error);
        });
    } else {
      console.log('⚠️ Nenhum orçamento selecionado para testar');
    }
  } else {
    console.log('❌ Classe Analytics não está disponível');
  }
  
  // 6. Verificar se há elementos de loading infinito
  const loadingElements = document.querySelectorAll('.loading, .spinner, [class*="loading"]');
  if (loadingElements.length > 0) {
    console.log('⚠️ Elementos de loading encontrados (possível loading infinito):');
    loadingElements.forEach((el, index) => {
      console.log(`  ${index + 1}. ${el.className}`);
    });
  }
  
  // 7. Verificar console do navegador
  console.log('🔍 Verifique o console do navegador para mais detalhes sobre erros');
  console.log('📝 Se ainda houver problemas, verifique:');
  console.log('  1. Se o usuário está autenticado');
  console.log('  2. Se há um orçamento selecionado');
  console.log('  3. Se há transações no período atual');
  console.log('  4. Se o Firebase está configurado corretamente');
}