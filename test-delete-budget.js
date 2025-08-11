// Script de teste para verificar funcionalidade de exclusão de orçamentos
console.log('🗑️ Teste de Exclusão de Orçamentos - Verificando funcionalidade...');

// Função para verificar se a função deleteBudget está disponível
function checkDeleteBudgetFunction() {
  console.log('🔍 Verificando função deleteBudget...');
  
  if (typeof window.deleteBudget === 'function') {
    console.log('✅ Função deleteBudget disponível');
    return true;
  } else {
    console.error('❌ Função deleteBudget não encontrada');
    return false;
  }
}

// Função para verificar se a função confirmDeleteBudget está disponível
function checkConfirmDeleteBudgetFunction() {
  console.log('🔍 Verificando função confirmDeleteBudget...');
  
  if (typeof window.confirmDeleteBudget === 'function') {
    console.log('✅ Função confirmDeleteBudget disponível');
    return true;
  } else {
    console.error('❌ Função confirmDeleteBudget não encontrada');
    return false;
  }
}

// Função para verificar orçamentos disponíveis
function checkAvailableBudgets() {
  console.log('🔍 Verificando orçamentos disponíveis...');
  
  if (window.appState && window.appState.budgets) {
    const budgets = window.appState.budgets;
    const currentUser = window.appState.currentUser;
    
    console.log('📊 Orçamentos encontrados:', budgets.length);
    
    budgets.forEach((budget, index) => {
      const isOwner = budget.userId === currentUser?.uid;
      const isCurrent = budget.id === window.appState.currentBudget?.id;
      
      console.log(`  ${index + 1}. ${budget.nome || 'Sem nome'} (${budget.id})`);
      console.log(`     - Dono: ${isOwner ? 'Sim' : 'Não'}`);
      console.log(`     - Atual: ${isCurrent ? 'Sim' : 'Não'}`);
      console.log(`     - Pode excluir: ${isOwner ? 'Sim' : 'Não'}`);
    });
    
    return budgets;
  } else {
    console.warn('⚠️ Nenhum orçamento encontrado no estado da aplicação');
    return [];
  }
}

// Função para verificar botões de exclusão na interface
function checkDeleteButtons() {
  console.log('🔍 Verificando botões de exclusão na interface...');
  
  const deleteButtons = document.querySelectorAll('button[onclick*="confirmDeleteBudget"]');
  
  if (deleteButtons.length > 0) {
    console.log(`✅ ${deleteButtons.length} botão(ões) de exclusão encontrado(s)`);
    
    deleteButtons.forEach((button, index) => {
      const onclick = button.getAttribute('onclick');
      const budgetId = onclick.match(/confirmDeleteBudget\('([^']+)'/)?.[1];
      const budgetName = onclick.match(/confirmDeleteBudget\('[^']+', '([^']+)'/)?.[1];
      
      console.log(`  Botão ${index + 1}:`);
      console.log(`    - ID do orçamento: ${budgetId}`);
      console.log(`    - Nome do orçamento: ${budgetName}`);
      console.log(`    - Texto do botão: ${button.textContent.trim()}`);
      console.log(`    - Classes CSS: ${button.className}`);
    });
    
    return deleteButtons;
  } else {
    console.warn('⚠️ Nenhum botão de exclusão encontrado na interface');
    return [];
  }
}

// Função para simular exclusão de orçamento (apenas para teste)
function simulateDeleteBudget(budgetId) {
  console.log('🧪 Simulando exclusão do orçamento:', budgetId);
  
  if (!window.deleteBudget) {
    console.error('❌ Função deleteBudget não disponível');
    return false;
  }
  
  // Verificar se o orçamento existe
  const budget = window.appState?.budgets?.find(b => b.id === budgetId);
  if (!budget) {
    console.error('❌ Orçamento não encontrado');
    return false;
  }
  
  console.log('📋 Informações do orçamento:');
  console.log(`  - Nome: ${budget.nome}`);
  console.log(`  - ID: ${budget.id}`);
  console.log(`  - Dono: ${budget.userId}`);
  console.log(`  - É atual: ${budget.id === window.appState.currentBudget?.id}`);
  
  // Verificar permissões
  const currentUser = window.appState.currentUser;
  if (!currentUser) {
    console.error('❌ Usuário não autenticado');
    return false;
  }
  
  const isOwner = budget.userId === currentUser.uid;
  if (!isOwner) {
    console.error('❌ Usuário não é dono do orçamento');
    return false;
  }
  
  console.log('✅ Permissões verificadas - usuário pode excluir o orçamento');
  return true;
}

// Função para testar confirmação de exclusão
function testDeleteConfirmation(budgetId, budgetName) {
  console.log('🧪 Testando confirmação de exclusão...');
  
  if (!window.confirmDeleteBudget) {
    console.error('❌ Função confirmDeleteBudget não disponível');
    return false;
  }
  
  // Simular confirmação (não executar realmente)
  console.log(`📋 Simulando confirmação para excluir "${budgetName}" (${budgetId})`);
  console.log('✅ Confirmação simulada com sucesso');
  
  return true;
}

// Função para verificar dados relacionados ao orçamento
async function checkBudgetRelatedData(budgetId) {
  console.log('🔍 Verificando dados relacionados ao orçamento:', budgetId);
  
  try {
    // Verificar transações
    const transactions = window.appState?.transactions?.filter(t => t.budgetId === budgetId) || [];
    console.log(`📊 Transações relacionadas: ${transactions.length}`);
    
    // Verificar categorias
    const categories = window.appState?.categories?.filter(c => c.budgetId === budgetId) || [];
    console.log(`📊 Categorias relacionadas: ${categories.length}`);
    
    // Verificar recorrentes
    const recorrentes = window.appState?.recorrentes?.filter(r => r.budgetId === budgetId) || [];
    console.log(`📊 Recorrentes relacionadas: ${recorrentes.length}`);
    
    return {
      transactions: transactions.length,
      categories: categories.length,
      recorrentes: recorrentes.length
    };
  } catch (error) {
    console.error('❌ Erro ao verificar dados relacionados:', error);
    return null;
  }
}

// Função principal de teste
async function runDeleteBudgetTest() {
  console.log('🚀 Iniciando teste completo de exclusão de orçamentos...');
  
  // Teste 1: Verificar funções disponíveis
  const hasDeleteFunction = checkDeleteBudgetFunction();
  const hasConfirmFunction = checkConfirmDeleteBudgetFunction();
  
  // Teste 2: Verificar orçamentos disponíveis
  const budgets = checkAvailableBudgets();
  
  // Teste 3: Verificar botões na interface
  const deleteButtons = checkDeleteButtons();
  
  // Teste 4: Verificar dados relacionados (se houver orçamentos)
  if (budgets.length > 0) {
    const firstBudget = budgets[0];
    console.log(`🔍 Verificando dados do primeiro orçamento: ${firstBudget.nome}`);
    await checkBudgetRelatedData(firstBudget.id);
  }
  
  // Teste 5: Simular exclusão (se houver orçamentos próprios)
  const ownBudgets = budgets.filter(b => b.userId === window.appState?.currentUser?.uid);
  if (ownBudgets.length > 0) {
    const testBudget = ownBudgets[0];
    console.log(`🧪 Testando simulação de exclusão para: ${testBudget.nome}`);
    simulateDeleteBudget(testBudget.id);
  } else {
    console.log('ℹ️ Nenhum orçamento próprio encontrado para teste de simulação');
  }
  
  console.log('✅ Teste de exclusão de orçamentos concluído');
  
  return {
    hasDeleteFunction,
    hasConfirmFunction,
    budgetsCount: budgets.length,
    deleteButtonsCount: deleteButtons.length,
    ownBudgetsCount: ownBudgets.length
  };
}

// Expor funções para uso no console
window.checkDeleteBudgetFunction = checkDeleteBudgetFunction;
window.checkConfirmDeleteBudgetFunction = checkConfirmDeleteBudgetFunction;
window.checkAvailableBudgets = checkAvailableBudgets;
window.checkDeleteButtons = checkDeleteButtons;
window.simulateDeleteBudget = simulateDeleteBudget;
window.testDeleteConfirmation = testDeleteConfirmation;
window.checkBudgetRelatedData = checkBudgetRelatedData;
window.runDeleteBudgetTest = runDeleteBudgetTest;

// Executar teste automático após um delay
setTimeout(() => {
  console.log('🔍 Executando teste automático de exclusão de orçamentos...');
  runDeleteBudgetTest().then(results => {
    console.log('📊 Resultados do teste:', results);
  });
}, 2000);

console.log('🗑️ Script de teste de exclusão de orçamentos carregado. Use runDeleteBudgetTest() para executar o teste completo.');
