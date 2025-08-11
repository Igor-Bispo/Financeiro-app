// Script de teste para verificar correção do scroll no FAB
console.log('🔧 Teste do FAB - Verificando correção do scroll...');

// Função para verificar estilos do FAB
function checkFABStyles() {
  console.log('🔍 Verificando estilos do FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  const fabMain = document.getElementById('fab-main');
  
  if (fabContainer) {
    console.log('✅ Container do FAB encontrado');
    
    const containerStyles = {
      overflow: fabContainer.style.overflow,
      maxHeight: fabContainer.style.maxHeight,
      maxWidth: fabContainer.style.maxWidth,
      position: fabContainer.style.position,
      bottom: fabContainer.style.bottom,
      right: fabContainer.style.right,
      zIndex: fabContainer.style.zIndex
    };
    
    console.log('📊 Estilos do container:', containerStyles);
    
    // Verificar se não há scroll
    if (containerStyles.overflow === 'visible' && containerStyles.maxHeight === 'none') {
      console.log('✅ Container sem scroll - CORRETO');
    } else {
      console.warn('⚠️ Container pode ter scroll - PROBLEMA');
    }
  } else {
    console.warn('⚠️ Container do FAB não encontrado');
  }
  
  if (fabActions) {
    console.log('✅ Actions do FAB encontrado');
    
    const actionsStyles = {
      overflow: fabActions.style.overflow,
      maxHeight: fabActions.style.maxHeight,
      maxWidth: fabActions.style.maxWidth,
      display: fabActions.style.display,
      visibility: fabActions.style.visibility,
      opacity: fabActions.style.opacity
    };
    
    console.log('📊 Estilos das actions:', actionsStyles);
    
    // Verificar se não há scroll
    if (actionsStyles.overflow === 'visible' && actionsStyles.maxHeight === 'none') {
      console.log('✅ Actions sem scroll - CORRETO');
    } else {
      console.warn('⚠️ Actions podem ter scroll - PROBLEMA');
    }
  } else {
    console.warn('⚠️ Actions do FAB não encontrado');
  }
  
  if (fabMain) {
    console.log('✅ Botão principal do FAB encontrado');
    
    const mainStyles = {
      width: fabMain.style.width,
      height: fabMain.style.height,
      borderRadius: fabMain.style.borderRadius,
      position: fabMain.style.position,
      zIndex: fabMain.style.zIndex
    };
    
    console.log('📊 Estilos do botão principal:', mainStyles);
  } else {
    console.warn('⚠️ Botão principal do FAB não encontrado');
  }
}

// Função para testar hover do FAB
function testFABHover() {
  console.log('🔍 Testando hover do FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabMain = document.getElementById('fab-main');
  
  if (fabMain) {
    console.log('✅ Simulando hover no botão principal...');
    
    // Simular hover
    const hoverEvent = new MouseEvent('mouseenter', {
      bubbles: true,
      cancelable: true
    });
    
    fabMain.dispatchEvent(hoverEvent);
    
    setTimeout(() => {
      console.log('✅ Hover simulado com sucesso');
      
      // Verificar se não há scroll após hover
      if (fabContainer) {
        const computedStyle = window.getComputedStyle(fabContainer);
        const overflow = computedStyle.overflow;
        const maxHeight = computedStyle.maxHeight;
        
        console.log('📊 Estilos após hover:', { overflow, maxHeight });
        
        if (overflow === 'visible' && maxHeight === 'none') {
          console.log('✅ Sem scroll após hover - CORRETO');
        } else {
          console.warn('⚠️ Possível scroll após hover - PROBLEMA');
        }
      }
    }, 100);
  } else {
    console.warn('⚠️ Botão principal não encontrado para teste de hover');
  }
}

// Função para testar abertura do FAB
function testFABOpen() {
  console.log('🔍 Testando abertura do FAB...');
  
  const fabMain = document.getElementById('fab-main');
  const fabActions = document.getElementById('fab-actions');
  
  if (fabMain) {
    console.log('✅ Clicando no botão principal...');
    
    // Simular clique
    fabMain.click();
    
    setTimeout(() => {
      console.log('✅ Clique simulado');
      
      if (fabActions) {
        const display = fabActions.style.display;
        const visibility = fabActions.style.visibility;
        const opacity = fabActions.style.opacity;
        const overflow = fabActions.style.overflow;
        const maxHeight = fabActions.style.maxHeight;
        
        console.log('📊 Estado das actions após clique:', {
          display,
          visibility,
          opacity,
          overflow,
          maxHeight
        });
        
        if (display === 'flex' && visibility === 'visible' && opacity === '1') {
          console.log('✅ FAB aberto corretamente');
          
          if (overflow === 'visible' && maxHeight === 'none') {
            console.log('✅ Sem scroll nas actions - CORRETO');
          } else {
            console.warn('⚠️ Possível scroll nas actions - PROBLEMA');
          }
        } else {
          console.warn('⚠️ FAB não abriu corretamente');
        }
      }
      
      // Fechar FAB após teste
      setTimeout(() => {
        if (fabMain) {
          fabMain.click();
          console.log('✅ FAB fechado após teste');
        }
      }, 1000);
      
    }, 500);
  } else {
    console.warn('⚠️ Botão principal não encontrado para teste de abertura');
  }
}

// Função para verificar elementos com scroll
function checkScrollableElements() {
  console.log('🔍 Verificando elementos com scroll na página...');
  
  const scrollableElements = document.querySelectorAll('*');
  const problematicElements = [];
  
  scrollableElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const overflow = style.overflow;
    const overflowX = style.overflowX;
    const overflowY = style.overflowY;
    
    if (overflow === 'auto' || overflow === 'scroll' || 
        overflowX === 'auto' || overflowX === 'scroll' ||
        overflowY === 'auto' || overflowY === 'scroll') {
      
      // Verificar se está próximo ao FAB
      const rect = element.getBoundingClientRect();
      const fabContainer = document.getElementById('fab-container-main');
      
      if (fabContainer) {
        const fabRect = fabContainer.getBoundingClientRect();
        
        // Se o elemento está próximo ao FAB (dentro de 300px)
        if (Math.abs(rect.left - fabRect.left) < 300 && 
            Math.abs(rect.top - fabRect.top) < 300) {
          problematicElements.push({
            element: element,
            tagName: element.tagName,
            className: element.className,
            id: element.id,
            overflow: overflow,
            overflowX: overflowX,
            overflowY: overflowY,
            rect: rect
          });
        }
      }
    }
  });
  
  if (problematicElements.length > 0) {
    console.warn('⚠️ Elementos com scroll próximos ao FAB:', problematicElements);
  } else {
    console.log('✅ Nenhum elemento com scroll próximo ao FAB');
  }
  
  return problematicElements;
}

// Função principal de teste
function runFABScrollTest() {
  console.log('🚀 Iniciando teste completo do FAB...');
  
  // Teste 1: Verificar estilos
  checkFABStyles();
  
  // Teste 2: Verificar elementos com scroll
  checkScrollableElements();
  
  // Teste 3: Testar hover
  setTimeout(() => {
    testFABHover();
  }, 500);
  
  // Teste 4: Testar abertura
  setTimeout(() => {
    testFABOpen();
  }, 1000);
  
  console.log('✅ Teste do FAB iniciado');
}

// Expor funções para uso no console
window.checkFABStyles = checkFABStyles;
window.testFABHover = testFABHover;
window.testFABOpen = testFABOpen;
window.checkScrollableElements = checkScrollableElements;
window.runFABScrollTest = runFABScrollTest;

// Executar teste automático após um delay
setTimeout(() => {
  console.log('🔍 Executando teste automático do FAB...');
  runFABScrollTest();
}, 2000);

console.log('🔧 Script de teste do FAB carregado. Use runFABScrollTest() para executar o teste completo.');
