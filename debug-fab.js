// Script de debug para o FAB
console.log('🔍 Debug do FAB - Iniciando diagnóstico...');

// Função para verificar o estado atual do FAB
function checkFABState() {
  console.log('📋 Verificando estado atual do FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  const fabMain = document.getElementById('fab-main');
  
  if (!fabContainer) {
    console.error('❌ fab-container-main não encontrado');
    return;
  }
  
  if (!fabActions) {
    console.error('❌ fab-actions não encontrado');
    return;
  }
  
  if (!fabMain) {
    console.error('❌ fab-main não encontrado');
    return;
  }
  
  console.log('✅ Todos os elementos do FAB encontrados');
  
  // Verificar estilos atuais
  const containerStyles = window.getComputedStyle(fabContainer);
  const actionsStyles = window.getComputedStyle(fabActions);
  const mainStyles = window.getComputedStyle(fabMain);
  
  console.log('📊 Estado atual:');
  console.log('- Container display:', containerStyles.display);
  console.log('- Container visibility:', containerStyles.visibility);
  console.log('- Container opacity:', containerStyles.opacity);
  console.log('- Actions display:', actionsStyles.display);
  console.log('- Actions visibility:', actionsStyles.visibility);
  console.log('- Actions opacity:', actionsStyles.opacity);
  console.log('- Actions transform:', actionsStyles.transform);
  console.log('- Main transform:', mainStyles.transform);
  
  return { fabContainer, fabActions, fabMain };
}

// Função para forçar abertura do FAB
function forceOpenFAB() {
  console.log('🔧 Forçando abertura do FAB...');
  
  const elements = checkFABState();
  if (!elements) return;
  
  const { fabActions, fabMain } = elements;
  
  // Forçar abertura
  fabActions.style.display = 'flex';
  fabActions.style.visibility = 'visible';
  fabActions.style.opacity = '1';
  fabActions.style.transform = 'translateY(0)';
  fabMain.style.transform = 'rotate(45deg)';
  
  console.log('✅ FAB forçado a abrir');
}

// Função para forçar fechamento do FAB
function forceCloseFAB() {
  console.log('🔧 Forçando fechamento do FAB...');
  
  const elements = checkFABState();
  if (!elements) return;
  
  const { fabActions, fabMain } = elements;
  
  // Forçar fechamento
  fabActions.style.display = 'none';
  fabActions.style.visibility = 'hidden';
  fabActions.style.opacity = '0';
  fabActions.style.transform = 'translateY(20px)';
  fabMain.style.transform = 'rotate(0deg)';
  
  console.log('✅ FAB forçado a fechar');
}

// Função para testar animação
function testFABAnimation() {
  console.log('🎬 Testando animação do FAB...');
  
  const elements = checkFABState();
  if (!elements) return;
  
  const { fabActions, fabMain } = elements;
  
  // Simular clique no botão principal
  console.log('🖱️ Simulando clique no botão principal...');
  fabMain.click();
  
  // Verificar estado após 500ms
  setTimeout(() => {
    console.log('📊 Estado após clique:');
    const actionsStyles = window.getComputedStyle(fabActions);
    const mainStyles = window.getComputedStyle(fabMain);
    
    console.log('- Actions display:', actionsStyles.display);
    console.log('- Actions opacity:', actionsStyles.opacity);
    console.log('- Actions transform:', actionsStyles.transform);
    console.log('- Main transform:', mainStyles.transform);
  }, 500);
}

// Função para verificar event listeners
function checkEventListeners() {
  console.log('🎧 Verificando event listeners...');
  
  const fabMain = document.getElementById('fab-main');
  if (!fabMain) {
    console.error('❌ fab-main não encontrado para verificar listeners');
    return;
  }
  
  // Verificar se há listeners (aproximação)
  console.log('📋 Elemento fab-main encontrado');
  console.log('- onclick:', fabMain.onclick);
  console.log('- addEventListener disponível:', typeof fabMain.addEventListener === 'function');
}

// Função para verificar CSS conflitante
function checkCSSConflicts() {
  console.log('🎨 Verificando conflitos de CSS...');
  
  const fabActions = document.getElementById('fab-actions');
  if (!fabActions) {
    console.error('❌ fab-actions não encontrado para verificar CSS');
    return;
  }
  
  const styles = window.getComputedStyle(fabActions);
  
  console.log('📊 Estilos aplicados ao fab-actions:');
  console.log('- display:', styles.display);
  console.log('- visibility:', styles.visibility);
  console.log('- opacity:', styles.opacity);
  console.log('- transform:', styles.transform);
  console.log('- z-index:', styles.zIndex);
  console.log('- position:', styles.position);
  
  // Verificar se há !important
  const fabActionsElement = fabActions;
  console.log('- style.display:', fabActionsElement.style.display);
  console.log('- style.visibility:', fabActionsElement.style.visibility);
  console.log('- style.opacity:', fabActionsElement.style.opacity);
}

// Função principal de diagnóstico
function runFABDiagnostic() {
  console.log('🚀 Iniciando diagnóstico completo do FAB...');
  
  console.log('\n=== ETAPA 1: Verificar elementos ===');
  checkFABState();
  
  console.log('\n=== ETAPA 2: Verificar event listeners ===');
  checkEventListeners();
  
  console.log('\n=== ETAPA 3: Verificar CSS ===');
  checkCSSConflicts();
  
  console.log('\n=== ETAPA 4: Testar animação ===');
  testFABAnimation();
  
  console.log('\n✅ Diagnóstico completo finalizado');
  console.log('💡 Use forceOpenFAB() para forçar abertura');
  console.log('💡 Use forceCloseFAB() para forçar fechamento');
}

// Executar diagnóstico após um delay
setTimeout(runFABDiagnostic, 1000);

// Exportar funções para uso manual
window.checkFABState = checkFABState;
window.forceOpenFAB = forceOpenFAB;
window.forceCloseFAB = forceCloseFAB;
window.testFABAnimation = testFABAnimation;
window.runFABDiagnostic = runFABDiagnostic;
