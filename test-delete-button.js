// Script para verificar por que o botão de excluir não está aparecendo
console.log('🔍 Verificando botão de excluir orçamento...');

// Função para verificar o estado dos orçamentos
function checkBudgetsState() {
  console.log('📊 Verificando estado dos orçamentos...');
  
  const currentUser = window.appState?.currentUser;
  const budgets = window.appState?.budgets || [];
  const currentBudget = window.appState?.currentBudget;
  
  console.log('👤 Usuário atual:', currentUser?.uid);
  console.log('📋 Orçamentos encontrados:', budgets.length);
  
  budgets.forEach((budget, index) => {
    const isOwner = budget.userId === currentUser?.uid;
    const isCurrent = budget.id === currentBudget?.id;
    const isShared = budget.usuariosPermitidos && budget.usuariosPermitidos.length > 0;
    
    console.log(`\n📋 Orçamento ${index + 1}:`);
    console.log(`  - Nome: ${budget.nome || 'Sem nome'}`);
    console.log(`  - ID: ${budget.id}`);
    console.log(`  - Dono: ${budget.userId}`);
    console.log(`  - É dono: ${isOwner ? 'Sim' : 'Não'}`);
    console.log(`  - É atual: ${isCurrent ? 'Sim' : 'Não'}`);
    console.log(`  - É compartilhado: ${isShared ? 'Sim' : 'Não'}`);
    console.log(`  - Deve mostrar botão excluir: ${isOwner ? 'Sim' : 'Não'}`);
  });
}

// Função para verificar se as funções estão disponíveis
function checkFunctions() {
  console.log('🔍 Verificando funções disponíveis...');
  
  console.log('✅ Funções disponíveis:');
  console.log(`  - window.deleteBudget: ${typeof window.deleteBudget === 'function' ? 'Sim' : 'Não'}`);
  console.log(`  - window.confirmDeleteBudget: ${typeof window.confirmDeleteBudget === 'function' ? 'Sim' : 'Não'}`);
  console.log(`  - window.renderSettings: ${typeof window.renderSettings === 'function' ? 'Sim' : 'Não'}`);
}

// Função para verificar elementos na página
function checkPageElements() {
  console.log('🔍 Verificando elementos na página...');
  
  // Verificar se estamos na página de configurações
  const settingsContent = document.querySelector('.tab-title-highlight');
  if (settingsContent && settingsContent.textContent.includes('Configurações')) {
    console.log('✅ Página de configurações detectada');
  } else {
    console.log('❌ Não estamos na página de configurações');
    return;
  }
  
  // Verificar seção "Meus Orçamentos"
  const budgetsSection = Array.from(document.querySelectorAll('h3')).find(h3 => 
    h3.textContent.includes('Meus Orçamentos')
  );
  
  if (budgetsSection) {
    console.log('✅ Seção "Meus Orçamentos" encontrada');
    
    // Procurar botões de excluir
    const deleteButtons = document.querySelectorAll('button[onclick*="confirmDeleteBudget"]');
    console.log(`📊 Botões de excluir encontrados: ${deleteButtons.length}`);
    
    deleteButtons.forEach((button, index) => {
      const onclick = button.getAttribute('onclick');
      console.log(`  Botão ${index + 1}:`);
      console.log(`    - onclick: ${onclick}`);
      console.log(`    - texto: ${button.textContent.trim()}`);
      console.log(`    - visível: ${button.offsetParent !== null ? 'Sim' : 'Não'}`);
    });
  } else {
    console.log('❌ Seção "Meus Orçamentos" não encontrada');
  }
}

// Função para verificar condições de exibição
function checkDisplayConditions() {
  console.log('🔍 Verificando condições de exibição...');
  
  const currentUser = window.appState?.currentUser;
  const budgets = window.appState?.budgets || [];
  
  if (!currentUser) {
    console.log('❌ Usuário não autenticado');
    return;
  }
  
  if (budgets.length === 0) {
    console.log('❌ Nenhum orçamento encontrado');
    return;
  }
  
  const ownBudgets = budgets.filter(b => b.userId === currentUser.uid);
  console.log(`📊 Orçamentos próprios: ${ownBudgets.length}`);
  
  ownBudgets.forEach((budget, index) => {
    console.log(`\n📋 Orçamento próprio ${index + 1}:`);
    console.log(`  - Nome: ${budget.nome || 'Sem nome'}`);
    console.log(`  - ID: ${budget.id}`);
    console.log(`  - Condição para mostrar botão: isOwner = true`);
  });
}

// Função para simular clique em botão de excluir
function testDeleteButton(budgetId, budgetName) {
  console.log('🧪 Testando botão de excluir...');
  console.log(`  - ID do orçamento: ${budgetId}`);
  console.log(`  - Nome do orçamento: ${budgetName}`);
  
  if (typeof window.confirmDeleteBudget === 'function') {
    console.log('✅ Função confirmDeleteBudget disponível');
    console.log('🖱️ Simulando clique...');
    
    // Simular confirmação
    const originalConfirm = window.confirm;
    window.confirm = () => {
      console.log('✅ Confirmação simulada');
      return true;
    };
    
    try {
      window.confirmDeleteBudget(budgetId, budgetName);
      console.log('✅ Teste concluído com sucesso');
    } catch (error) {
      console.error('❌ Erro no teste:', error);
    } finally {
      window.confirm = originalConfirm;
    }
  } else {
    console.error('❌ Função confirmDeleteBudget não disponível');
  }
}

// Função principal de verificação
function runDeleteButtonTest() {
  console.log('🚀 Iniciando verificação do botão de excluir...');
  
  // Verificar estado dos orçamentos
  checkBudgetsState();
  
  // Verificar funções disponíveis
  setTimeout(() => {
    checkFunctions();
  }, 100);
  
  // Verificar elementos na página
  setTimeout(() => {
    checkPageElements();
  }, 200);
  
  // Verificar condições de exibição
  setTimeout(() => {
    checkDisplayConditions();
  }, 300);
  
  // Testar com um orçamento próprio se disponível
  setTimeout(() => {
    const currentUser = window.appState?.currentUser;
    const budgets = window.appState?.budgets || [];
    
    if (currentUser && budgets.length > 0) {
      const ownBudget = budgets.find(b => b.userId === currentUser.uid);
      if (ownBudget) {
        console.log('\n🧪 Testando com orçamento próprio...');
        testDeleteButton(ownBudget.id, ownBudget.nome || 'Orçamento');
      }
    }
  }, 500);
  
  console.log('✅ Verificação iniciada');
}

// Expor funções para uso no console
window.checkBudgetsState = checkBudgetsState;
window.checkFunctions = checkFunctions;
window.checkPageElements = checkPageElements;
window.checkDisplayConditions = checkDisplayConditions;
window.testDeleteButton = testDeleteButton;
window.runDeleteButtonTest = runDeleteButtonTest;

// Executar teste automático após um delay
setTimeout(() => {
  console.log('🔍 Executando verificação automática do botão de excluir...');
  runDeleteButtonTest();
}, 2000);

console.log('🔍 Script de verificação do botão de excluir carregado. Use runDeleteButtonTest() para executar a verificação completa.');
