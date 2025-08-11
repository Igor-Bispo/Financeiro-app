// Teste do FAB Reestruturado
console.log('🧪 Iniciando teste do FAB reestruturado...');

// Função para testar o FAB
function testFAB() {
  console.log('🔍 Testando FAB reestruturado...');
  
  // Verificar se o container existe
  const fabContainer = document.getElementById('fab-container');
  console.log('📱 Container FAB encontrado:', !!fabContainer);
  
  // Verificar se o FAB principal existe
  const fabMain = document.getElementById('fab-main');
  console.log('🔘 Botão principal FAB encontrado:', !!fabMain);
  
  // Verificar se o container principal existe
  const fabContainerMain = document.getElementById('fab-container-main');
  console.log('📦 Container FAB principal encontrado:', !!fabContainerMain);
  
  // Verificar se o container de ações existe
  const fabActions = document.getElementById('fab-actions');
  console.log('🎯 Container de ações FAB encontrado:', !!fabActions);
  
  // Verificar botões de ação
  const transactionBtn = document.getElementById('fab-transaction');
  const recorrenteBtn = document.getElementById('fab-recorrente');
  const voiceBtn = document.getElementById('fab-voice');
  
  console.log('🔧 Verificando botões de ação:');
  console.log('  - Nova Transação:', !!transactionBtn);
  console.log('  - Nova Recorrente:', !!recorrenteBtn);
  console.log('  - Voz:', !!voiceBtn);
  
  // Verificar funções globais
  console.log('🔧 Verificando funções globais:');
  console.log('  - toggleFAB:', !!window.toggleFAB);
  console.log('  - openFAB:', !!window.openFAB);
  console.log('  - closeFAB:', !!window.closeFAB);
  
  // Verificar funções necessárias
  console.log('🔧 Verificando funções necessárias:');
  console.log('  - showAddTransactionModal:', !!window.showAddTransactionModal);
  console.log('  - showAddRecorrenteModal:', !!window.showAddRecorrenteModal);
  console.log('  - openVoiceModal:', !!window.openVoiceModal);
  console.log('  - Snackbar:', !!window.Snackbar);
  
  // Testar clique no botão principal
  if (fabMain) {
    console.log('🚀 Testando clique no botão principal...');
    fabMain.click();
    
    setTimeout(() => {
      console.log('🔍 Estado após clique:');
      console.log('  - FAB aberto:', fabActions?.style.display === 'flex');
      console.log('  - Botão rotacionado:', fabMain.style.transform.includes('rotate(45deg)'));
    }, 100);
  } else {
    console.error('❌ Botão principal FAB não encontrado');
  }
}

// Função para testar botões de ação
function testFABActions() {
  console.log('🔘 Testando botões de ação...');
  
  const buttons = [
    { id: 'fab-transaction', name: 'Nova Transação' },
    { id: 'fab-recorrente', name: 'Nova Recorrente' },
    { id: 'fab-voice', name: 'Voz' }
  ];
  
  buttons.forEach(btn => {
    const element = document.getElementById(btn.id);
    if (element) {
      console.log(`✅ Botão ${btn.name} encontrado`);
      
      // Simular hover
      element.dispatchEvent(new MouseEvent('mouseenter'));
      setTimeout(() => {
        element.dispatchEvent(new MouseEvent('mouseleave'));
      }, 100);
      
    } else {
      console.log(`❌ Botão ${btn.name} não encontrado`);
    }
  });
}

// Função para testar animações
function testFABAnimations() {
  console.log('🎬 Testando animações do FAB...');
  
  const fabMain = document.getElementById('fab-main');
  const fabActions = document.getElementById('fab-actions');
  
  if (fabMain && fabActions) {
    // Testar abertura
    console.log('🔧 Testando abertura do FAB...');
    fabActions.style.display = 'flex';
    fabActions.style.opacity = '0';
    fabActions.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      fabActions.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      fabActions.style.opacity = '1';
      fabActions.style.transform = 'translateY(0)';
      fabMain.style.transform = 'rotate(45deg)';
      
      console.log('✅ Animação de abertura executada');
      
      // Testar fechamento
      setTimeout(() => {
        console.log('🔧 Testando fechamento do FAB...');
        fabActions.style.opacity = '0';
        fabActions.style.transform = 'translateY(20px)';
        fabMain.style.transform = 'rotate(0deg)';
        
        setTimeout(() => {
          fabActions.style.display = 'none';
          console.log('✅ Animação de fechamento executada');
        }, 300);
      }, 1000);
    }, 10);
  }
}

// Função para testar responsividade
function testFABResponsiveness() {
  console.log('📱 Testando responsividade do FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  if (fabContainer) {
    const styles = window.getComputedStyle(fabContainer);
    console.log('🔍 Estilos do FAB:');
    console.log('  - Position:', styles.position);
    console.log('  - Bottom:', styles.bottom);
    console.log('  - Right:', styles.right);
    console.log('  - Z-index:', styles.zIndex);
    console.log('  - Display:', styles.display);
    console.log('  - Visibility:', styles.visibility);
    console.log('  - Opacity:', styles.opacity);
  }
}

// Executar testes
function runFABTests() {
  console.log('🧪 Executando testes do FAB reestruturado...');
  
  // Aguardar um pouco para o FAB carregar
  setTimeout(() => {
    testFAB();
    
    setTimeout(() => {
      testFABActions();
      
      setTimeout(() => {
        testFABAnimations();
        
        setTimeout(() => {
          testFABResponsiveness();
          console.log('✅ Todos os testes do FAB concluídos');
        }, 2000);
      }, 1000);
    }, 500);
  }, 1000);
}

// Executar testes se o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runFABTests);
} else {
  runFABTests();
}

console.log('🧪 Teste do FAB reestruturado configurado. Verifique o console para resultados.');
