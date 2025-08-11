// Script para forçar correção do FAB e eliminar scroll
console.log('🔧 Forçando correção do FAB...');

// Função para aplicar estilos corretos ao FAB
function forceFABFix() {
  console.log('🔧 Aplicando correções ao FAB...');
  
  // Encontrar elementos do FAB
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  const fabMain = document.getElementById('fab-main');
  
  if (fabContainer) {
    console.log('✅ Container do FAB encontrado, aplicando correções...');
    
    // Aplicar estilos corretos ao container
    fabContainer.style.cssText = `
      position: fixed !important;
      bottom: 120px !important;
      right: 20px !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-end !important;
      gap: 12px !important;
      pointer-events: auto !important;
      overflow: visible !important;
      visibility: visible !important;
      opacity: 1 !important;
      transform: none !important;
      max-width: 200px !important;
      max-height: none !important;
      background: transparent !important;
    `;
    
    console.log('✅ Estilos do container aplicados');
  }
  
  if (fabActions) {
    console.log('✅ Actions do FAB encontradas, aplicando correções...');
    
    // Aplicar estilos corretos às actions
    fabActions.style.cssText = `
      display: none !important;
      flex-direction: column !important;
      gap: 12px !important;
      z-index: 9999 !important;
      margin-bottom: 12px !important;
      overflow: visible !important;
      opacity: 0 !important;
      transform: translateY(20px) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      visibility: hidden !important;
      position: relative !important;
      pointer-events: none !important;
      max-height: none !important;
      max-width: 200px !important;
      background: transparent !important;
    `;
    
    console.log('✅ Estilos das actions aplicados');
  }
  
  if (fabMain) {
    console.log('✅ Botão principal do FAB encontrado, aplicando correções...');
    
    // Aplicar estilos corretos ao botão principal
    fabMain.style.cssText = `
      width: 64px !important;
      height: 64px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #4F46E5, #7C3AED) !important;
      color: white !important;
      border: none !important;
      font-size: 32px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      z-index: 10000 !important;
      min-width: 64px !important;
      min-height: 64px !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      outline: none !important;
      position: relative !important;
      transform: rotate(0deg) !important;
      visibility: visible !important;
      opacity: 1 !important;
    `;
    
    console.log('✅ Estilos do botão principal aplicados');
  }
  
  console.log('✅ Correções do FAB aplicadas');
}

// Função para verificar se há scroll no FAB
function checkFABScroll() {
  console.log('🔍 Verificando scroll no FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  
  if (fabContainer) {
    const containerScroll = {
      scrollWidth: fabContainer.scrollWidth,
      scrollHeight: fabContainer.scrollHeight,
      clientWidth: fabContainer.clientWidth,
      clientHeight: fabContainer.clientHeight,
      scrollTop: fabContainer.scrollTop,
      scrollLeft: fabContainer.scrollLeft
    };
    
    console.log('📊 Scroll do container:', containerScroll);
    
    const hasHorizontalScroll = containerScroll.scrollWidth > containerScroll.clientWidth;
    const hasVerticalScroll = containerScroll.scrollHeight > containerScroll.clientHeight;
    
    console.log('📊 Overflow detectado:');
    console.log('  - Horizontal:', hasHorizontalScroll);
    console.log('  - Vertical:', hasVerticalScroll);
    
    if (hasHorizontalScroll || hasVerticalScroll) {
      console.log('⚠️ SCROLL DETECTADO NO FAB! Aplicando correção...');
      forceFABFix();
    } else {
      console.log('✅ Nenhum scroll detectado no FAB');
    }
  }
  
  if (fabActions) {
    const actionsScroll = {
      scrollWidth: fabActions.scrollWidth,
      scrollHeight: fabActions.scrollHeight,
      clientWidth: fabActions.clientWidth,
      clientHeight: fabActions.clientHeight,
      scrollTop: fabActions.scrollTop,
      scrollLeft: fabActions.scrollLeft
    };
    
    console.log('📊 Scroll das actions:', actionsScroll);
    
    const actionsHasHorizontalScroll = actionsScroll.scrollWidth > actionsScroll.clientWidth;
    const actionsHasVerticalScroll = actionsScroll.scrollHeight > actionsScroll.clientHeight;
    
    console.log('📊 Overflow das actions:');
    console.log('  - Horizontal:', actionsHasHorizontalScroll);
    console.log('  - Vertical:', actionsHasVerticalScroll);
    
    if (actionsHasHorizontalScroll || actionsHasVerticalScroll) {
      console.log('⚠️ SCROLL DETECTADO NAS ACTIONS! Aplicando correção...');
      forceFABFix();
    }
  }
}

// Função para testar hover do FAB
function testFABHover() {
  console.log('🧪 Testando hover do FAB...');
  
  const fabMain = document.getElementById('fab-main');
  
  if (fabMain) {
    // Verificar estado antes do hover
    console.log('📊 Estado antes do hover:');
    checkFABScroll();
    
    // Simular hover
    console.log('🖱️ Simulando hover...');
    const hoverEvent = new MouseEvent('mouseenter', {
      bubbles: true,
      cancelable: true
    });
    
    fabMain.dispatchEvent(hoverEvent);
    
    // Aguardar um pouco e verificar estado após hover
    setTimeout(() => {
      console.log('📊 Estado após hover:');
      checkFABScroll();
    }, 100);
  }
}

// Função para testar abertura do FAB
function testFABOpen() {
  console.log('🧪 Testando abertura do FAB...');
  
  const fabMain = document.getElementById('fab-main');
  
  if (fabMain) {
    // Verificar estado antes da abertura
    console.log('📊 Estado antes da abertura:');
    checkFABScroll();
    
    // Simular clique
    console.log('🖱️ Simulando clique...');
    fabMain.click();
    
    // Aguardar animação e verificar estado após abertura
    setTimeout(() => {
      console.log('📊 Estado após abertura:');
      checkFABScroll();
      
      // Fechar FAB após teste
      setTimeout(() => {
        fabMain.click();
        console.log('✅ FAB fechado após teste');
      }, 1000);
    }, 500);
  }
}

// Função principal de correção
function runFABFix() {
  console.log('🚀 Iniciando correção completa do FAB...');
  
  // Aplicar correções imediatamente
  forceFABFix();
  
  // Verificar scroll atual
  setTimeout(() => {
    checkFABScroll();
  }, 100);
  
  // Testar hover
  setTimeout(() => {
    testFABHover();
  }, 200);
  
  // Testar abertura
  setTimeout(() => {
    testFABOpen();
  }, 500);
  
  console.log('✅ Correção do FAB iniciada');
}

// Expor funções para uso no console
window.forceFABFix = forceFABFix;
window.checkFABScroll = checkFABScroll;
window.testFABHover = testFABHover;
window.testFABOpen = testFABOpen;
window.runFABFix = runFABFix;

// Executar correção automática após um delay
setTimeout(() => {
  console.log('🔧 Executando correção automática do FAB...');
  runFABFix();
}, 2000);

console.log('🔧 Script de correção do FAB carregado. Use runFABFix() para executar a correção completa.');
