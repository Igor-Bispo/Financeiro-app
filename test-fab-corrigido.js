// Script de teste para o FAB corrigido
console.log('🔍 Teste do FAB corrigido - Iniciando diagnóstico...');

// Função para verificar o estado atual do FAB
function checkFABState() {
  console.log('📋 Verificando estado atual do FAB corrigido...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  const fabMain = document.getElementById('fab-main');
  
  if (!fabContainer) {
    console.error('❌ fab-container-main não encontrado');
    return null;
  }
  
  if (!fabActions) {
    console.error('❌ fab-actions não encontrado');
    return null;
  }
  
  if (!fabMain) {
    console.error('❌ fab-main não encontrado');
    return null;
  }
  
  console.log('✅ Todos os elementos do FAB corrigido encontrados');
  
  // Verificar estilos
  const containerStyles = window.getComputedStyle(fabContainer);
  const actionsStyles = window.getComputedStyle(fabActions);
  const mainStyles = window.getComputedStyle(fabMain);
  
  console.log('📊 Estilos do FAB corrigido:');
  console.log('  - Container position:', containerStyles.position);
  console.log('  - Container z-index:', containerStyles.zIndex);
  console.log('  - Actions display:', actionsStyles.display);
  console.log('  - Actions visibility:', actionsStyles.visibility);
  console.log('  - Main transform:', mainStyles.transform);
  
  return { fabContainer, fabActions, fabMain };
}

// Função para testar abertura do FAB
function testOpenFAB() {
  console.log('🔧 Testando abertura do FAB corrigido...');
  
  const elements = checkFABState();
  if (!elements) return;
  
  const { fabActions, fabMain } = elements;
  
  // Simular clique no botão principal
  fabMain.click();
  
  setTimeout(() => {
    console.log('✅ Teste de abertura concluído');
    console.log('  - Actions display:', fabActions.style.display);
    console.log('  - Actions visibility:', fabActions.style.visibility);
    console.log('  - Main transform:', fabMain.style.transform);
  }, 500);
}

// Função para testar fechamento do FAB
function testCloseFAB() {
  console.log('🔧 Testando fechamento do FAB corrigido...');
  
  const elements = checkFABState();
  if (!elements) return;
  
  const { fabActions, fabMain } = elements;
  
  // Simular clique no botão principal novamente
  fabMain.click();
  
  setTimeout(() => {
    console.log('✅ Teste de fechamento concluído');
    console.log('  - Actions display:', fabActions.style.display);
    console.log('  - Actions visibility:', fabActions.style.visibility);
    console.log('  - Main transform:', fabMain.style.transform);
  }, 500);
}

// Função para testar botões de ação
function testActionButtons() {
  console.log('🔧 Testando botões de ação do FAB corrigido...');
  
  const transactionBtn = document.getElementById('fab-transaction');
  const recorrenteBtn = document.getElementById('fab-recorrente');
  const voiceBtn = document.getElementById('fab-voice');
  
  console.log('📋 Botões encontrados:');
  console.log('  - Nova Transação:', !!transactionBtn);
  console.log('  - Nova Recorrente:', !!recorrenteBtn);
  console.log('  - Voz:', !!voiceBtn);
  
  // Verificar funções globais
  console.log('🔧 Funções globais disponíveis:');
  console.log('  - showAddTransactionModal:', typeof window.showAddTransactionModal === 'function');
  console.log('  - showAddRecorrenteModal:', typeof window.showAddRecorrenteModal === 'function');
  console.log('  - openVoiceModal:', typeof window.openVoiceModal === 'function');
  console.log('  - Snackbar:', typeof window.Snackbar === 'function');
}

// Função para testar animações
function testFABAnimations() {
  console.log('🎬 Testando animações do FAB corrigido...');
  
  const elements = checkFABState();
  if (!elements) return;
  
  const { fabActions, fabMain } = elements;
  
  // Testar abertura
  console.log('🔧 Testando abertura...');
  fabMain.click();
  
  setTimeout(() => {
    console.log('✅ Abertura testada');
    
    // Testar fechamento
    console.log('🔧 Testando fechamento...');
    fabMain.click();
    
    setTimeout(() => {
      console.log('✅ Fechamento testado');
      console.log('🎬 Teste de animações concluído');
    }, 500);
  }, 500);
}

// Função para testar event listeners
function testEventListeners() {
  console.log('🔧 Testando event listeners do FAB corrigido...');
  
  const fabMain = document.getElementById('fab-main');
  if (!fabMain) {
    console.error('❌ fab-main não encontrado para verificar listeners');
    return;
  }
  
  console.log('📋 Elemento fab-main encontrado');
  console.log('- onclick:', fabMain.onclick);
  console.log('- addEventListener disponível:', typeof fabMain.addEventListener === 'function');
  
  // Verificar se há event listeners ativos
  const clone = fabMain.cloneNode(true);
  console.log('- Event listeners preservados:', clone.onclick !== fabMain.onclick);
}

// Função para testar limpeza
function testCleanup() {
  console.log('🧹 Testando limpeza do FAB corrigido...');
  
  if (window.currentFAB && window.currentFAB.cleanup) {
    console.log('✅ Função de limpeza encontrada');
    window.currentFAB.cleanup();
    console.log('✅ Limpeza executada');
  } else {
    console.warn('⚠️ Função de limpeza não encontrada');
  }
}

// Função para executar teste completo
function runCompleteFABTest() {
  console.log('🚀 Iniciando teste completo do FAB corrigido...');
  
  // Aguardar um pouco para garantir que o FAB foi carregado
  setTimeout(() => {
    console.log('⏳ Aguardando carregamento do FAB...');
    
    checkFABState();
    testActionButtons();
    testEventListeners();
    
    setTimeout(() => {
      testFABAnimations();
      
      setTimeout(() => {
        testCleanup();
        console.log('✅ Teste completo do FAB corrigido concluído');
      }, 2000);
    }, 1000);
  }, 1000);
}

// Função para verificar conflitos CSS
function checkCSSConflicts() {
  console.log('🎨 Verificando conflitos CSS do FAB corrigido...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  const fabMain = document.getElementById('fab-main');
  
  if (fabContainer) {
    const styles = window.getComputedStyle(fabContainer);
    console.log('📊 Estilos do container:');
    console.log('  - Position:', styles.position);
    console.log('  - Z-index:', styles.zIndex);
    console.log('  - Display:', styles.display);
    console.log('  - Visibility:', styles.visibility);
  }
  
  if (fabActions) {
    const styles = window.getComputedStyle(fabActions);
    console.log('📊 Estilos das ações:');
    console.log('  - Display:', styles.display);
    console.log('  - Visibility:', styles.visibility);
    console.log('  - Opacity:', styles.opacity);
    console.log('  - Transform:', styles.transform);
  }
  
  if (fabMain) {
    const styles = window.getComputedStyle(fabMain);
    console.log('📊 Estilos do botão principal:');
    console.log('  - Transform:', styles.transform);
    console.log('  - Background:', styles.background);
    console.log('  - Z-index:', styles.zIndex);
  }
}

// Expor funções para uso no console
window.checkFABState = checkFABState;
window.testOpenFAB = testOpenFAB;
window.testCloseFAB = testCloseFAB;
window.testActionButtons = testActionButtons;
window.testFABAnimations = testFABAnimations;
window.testEventListeners = testEventListeners;
window.testCleanup = testCleanup;
window.runCompleteFABTest = runCompleteFABTest;
window.checkCSSConflicts = checkCSSConflicts;

console.log('💡 Funções de teste disponíveis:');
console.log('  - checkFABState()');
console.log('  - testOpenFAB()');
console.log('  - testCloseFAB()');
console.log('  - testActionButtons()');
console.log('  - testFABAnimations()');
console.log('  - testEventListeners()');
console.log('  - testCleanup()');
console.log('  - runCompleteFABTest()');
console.log('  - checkCSSConflicts()');

// Executar teste automático após um delay
setTimeout(runCompleteFABTest, 2000);
