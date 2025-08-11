// Script de diagnóstico completo para identificar problemas no Analytics
console.log('🔍 DIAGNÓSTICO COMPLETO - Iniciando...');

function diagnosticoCompleto() {
  console.log('\n=== 1. VERIFICAÇÃO DE AUTENTICAÇÃO ===');
  
  // Verificar usuário atual
  const user = window.appState?.currentUser;
  if (user) {
    console.log('✅ Usuário autenticado:', user.uid);
    console.log('📧 Email:', user.email);
  } else {
    console.log('❌ Usuário não autenticado');
    return;
  }
  
  console.log('\n=== 2. VERIFICAÇÃO DE ORÇAMENTO ===');
  
  // Verificar orçamento atual
  const budget = window.appState?.currentBudget;
  if (budget) {
    console.log('✅ Orçamento selecionado:', budget.id);
    console.log('📝 Nome:', budget.nome);
    console.log('👤 Proprietário:', budget.userId);
  } else {
    console.log('❌ Nenhum orçamento selecionado');
    console.log('📊 Orçamentos disponíveis:', window.appState?.budgets?.length || 0);
    return;
  }
  
  console.log('\n=== 3. VERIFICAÇÃO DE DADOS ===');
  
  // Verificar transações
  const transactions = window.appState?.transactions || [];
  console.log('📊 Total de transações:', transactions.length);
  
  if (transactions.length > 0) {
    const transacoesBudget = transactions.filter(t => t.budgetId === budget.id);
    console.log('📊 Transações do orçamento atual:', transacoesBudget.length);
    
    const receitas = transacoesBudget.filter(t => t.tipo === 'receita');
    const despesas = transacoesBudget.filter(t => t.tipo === 'despesa');
    
    console.log('💰 Receitas:', receitas.length);
    console.log('💸 Despesas:', despesas.length);
    
    // Verificar datas das transações
    const agora = new Date();
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const fimMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);
    
    const transacoesMesAtual = transacoesBudget.filter(t => {
      const dataTransacao = t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
      return dataTransacao >= inicioMes && dataTransacao <= fimMes;
    });
    
    console.log('📅 Transações do mês atual:', transacoesMesAtual.length);
  }
  
  // Verificar categorias
  const categories = window.appState?.categories || [];
  console.log('🏷️ Total de categorias:', categories.length);
  
  if (categories.length > 0) {
    const categoriasBudget = categories.filter(c => c.budgetId === budget.id);
    console.log('🏷️ Categorias do orçamento atual:', categoriasBudget.length);
  }
  
  console.log('\n=== 4. VERIFICAÇÃO DO FIREBASE ===');
  
  // Verificar Firebase
  if (typeof db !== 'undefined') {
    console.log('✅ Firebase DB disponível');
  } else {
    console.log('❌ Firebase DB não disponível');
  }
  
  if (typeof auth !== 'undefined') {
    console.log('✅ Firebase Auth disponível');
  } else {
    console.log('❌ Firebase Auth não disponível');
  }
  
  console.log('\n=== 5. VERIFICAÇÃO DO ANALYTICS ===');
  
  // Verificar se Analytics está disponível
  if (typeof Analytics !== 'undefined') {
    console.log('✅ Classe Analytics disponível');
    
    // Testar métodos do Analytics
    console.log('🧪 Testando métodos do Analytics...');
    
    const agora = new Date();
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const fimMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);
    
    // Teste 1: getGastosPorCategoria
    console.log('\n--- Teste 1: getGastosPorCategoria ---');
    Analytics.getGastosPorCategoria(budget.id, inicioMes, fimMes)
      .then(resultado => {
        console.log('✅ getGastosPorCategoria funcionou!');
        console.log('📊 Resultado:', resultado);
      })
      .catch(error => {
        console.log('❌ Erro em getGastosPorCategoria:', error.message);
        console.log('🔍 Stack trace:', error.stack);
      });
    
    // Teste 2: getEvolucaoSaldo
    console.log('\n--- Teste 2: getEvolucaoSaldo ---');
    Analytics.getEvolucaoSaldo(budget.id, 6)
      .then(resultado => {
        console.log('✅ getEvolucaoSaldo funcionou!');
        console.log('📈 Resultado:', resultado);
      })
      .catch(error => {
        console.log('❌ Erro em getEvolucaoSaldo:', error.message);
        console.log('🔍 Stack trace:', error.stack);
      });
    
    // Teste 3: gerarRelatorioCompleto
    console.log('\n--- Teste 3: gerarRelatorioCompleto ---');
    if (typeof Analytics.gerarRelatorioCompleto === 'function') {
      Analytics.gerarRelatorioCompleto(budget.id)
        .then(resultado => {
          console.log('✅ gerarRelatorioCompleto funcionou!');
          console.log('📋 Resultado:', resultado);
        })
        .catch(error => {
          console.log('❌ Erro em gerarRelatorioCompleto:', error.message);
          console.log('🔍 Stack trace:', error.stack);
        });
    } else {
      console.log('⚠️ Método gerarRelatorioCompleto não encontrado');
    }
    
  } else {
    console.log('❌ Classe Analytics não disponível');
    
    // Tentar importar Analytics
    console.log('🔄 Tentando importar Analytics...');
    import('./src/js/ui/Analytics.js')
      .then(module => {
        console.log('✅ Analytics importado com sucesso');
        window.Analytics = module.Analytics;
        
        // Repetir testes após importação
        setTimeout(() => {
          console.log('🔄 Repetindo testes após importação...');
          diagnosticoCompleto();
        }, 1000);
      })
      .catch(error => {
        console.log('❌ Erro ao importar Analytics:', error.message);
      });
  }
  
  console.log('\n=== 6. VERIFICAÇÃO DA PÁGINA ATUAL ===');
  
  // Verificar página atual
  const currentPath = window.location.pathname;
  console.log('📍 Página atual:', currentPath);
  
  if (currentPath === '/analytics') {
    console.log('✅ Estamos na página de analytics');
    
    // Verificar elementos da página
    const loadingElements = document.querySelectorAll('.loading, .spinner, [class*="loading"]');
    const errorElements = document.querySelectorAll('.error, .alert-danger, [class*="error"]');
    
    console.log('🔄 Elementos de loading:', loadingElements.length);
    console.log('❌ Elementos de erro:', errorElements.length);
    
    if (errorElements.length > 0) {
      console.log('📝 Mensagens de erro encontradas:');
      errorElements.forEach((el, index) => {
        console.log(`  ${index + 1}. ${el.textContent.trim()}`);
      });
    }
  } else {
    console.log('⚠️ Não estamos na página de analytics');
  }
  
  console.log('\n=== 7. VERIFICAÇÃO DE INICIALIZAÇÃO ===');
  
  // Verificar se a aplicação foi inicializada
  if (window.appState?.isInitialized) {
    console.log('✅ Aplicação inicializada');
  } else {
    console.log('❌ Aplicação não inicializada');
  }
  
  console.log('\n🔍 DIAGNÓSTICO COMPLETO - Finalizado');
  console.log('📝 Verifique os resultados acima para identificar problemas');
}

// Executar diagnóstico
diagnosticoCompleto();