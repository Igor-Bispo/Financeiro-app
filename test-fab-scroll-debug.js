// Script de debug para identificar problema de scroll no FAB
console.log('🔍 Debug do FAB - Identificando problema de scroll...');

// Função para verificar todos os estilos aplicados ao FAB
function debugFABStyles() {
  console.log('🔍 Verificando estilos do FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  const fabMain = document.getElementById('fab-main');
  
  if (!fabContainer) {
    console.error('❌ Container do FAB não encontrado');
    return;
  }
  
  console.log('📊 Container do FAB:');
  console.log('  - Elemento:', fabContainer);
  console.log('  - Classes:', fabContainer.className);
  console.log('  - ID:', fabContainer.id);
  
  // Verificar estilos inline
  const inlineStyles = fabContainer.style.cssText;
  console.log('  - Estilos inline:', inlineStyles);
  
  // Verificar estilos computados
  const computedStyles = window.getComputedStyle(fabContainer);
  console.log('  - Estilos computados:');
  console.log('    - overflow:', computedStyles.overflow);
  console.log('    - overflow-x:', computedStyles.overflowX);
  console.log('    - overflow-y:', computedStyles.overflowY);
  console.log('    - max-height:', computedStyles.maxHeight);
  console.log('    - max-width:', computedStyles.maxWidth);
  console.log('    - height:', computedStyles.height);
  console.log('    - width:', computedStyles.width);
  console.log('    - position:', computedStyles.position);
  console.log('    - z-index:', computedStyles.zIndex);
  
  if (fabActions) {
    console.log('📊 Actions do FAB:');
    console.log('  - Elemento:', fabActions);
    console.log('  - Classes:', fabActions.className);
    console.log('  - ID:', fabActions.id);
    
    const actionsInlineStyles = fabActions.style.cssText;
    console.log('  - Estilos inline:', actionsInlineStyles);
    
    const actionsComputedStyles = window.getComputedStyle(fabActions);
    console.log('  - Estilos computados:');
    console.log('    - overflow:', actionsComputedStyles.overflow);
    console.log('    - overflow-x:', actionsComputedStyles.overflowX);
    console.log('    - overflow-y:', actionsComputedStyles.overflowY);
    console.log('    - max-height:', actionsComputedStyles.maxHeight);
    console.log('    - max-width:', actionsComputedStyles.maxWidth);
    console.log('    - display:', actionsComputedStyles.display);
    console.log('    - visibility:', actionsComputedStyles.visibility);
    console.log('    - opacity:', actionsComputedStyles.opacity);
  }
  
  if (fabMain) {
    console.log('📊 Botão principal do FAB:');
    console.log('  - Elemento:', fabMain);
    console.log('  - Classes:', fabMain.className);
    console.log('  - ID:', fabMain.id);
    
    const mainInlineStyles = fabMain.style.cssText;
    console.log('  - Estilos inline:', mainInlineStyles);
  }
}

// Função para verificar se há scroll no FAB
function checkFABScroll() {
  console.log('🔍 Verificando se há scroll no FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  
  if (!fabContainer) {
    console.error('❌ Container do FAB não encontrado');
    return false;
  }
  
  // Verificar scroll no container
  const containerScroll = {
    scrollWidth: fabContainer.scrollWidth,
    scrollHeight: fabContainer.scrollHeight,
    clientWidth: fabContainer.clientWidth,
    clientHeight: fabContainer.clientHeight,
    scrollTop: fabContainer.scrollTop,
    scrollLeft: fabContainer.scrollLeft
  };
  
  console.log('📊 Scroll do container:', containerScroll);
  
  // Verificar se há overflow
  const hasHorizontalScroll = containerScroll.scrollWidth > containerScroll.clientWidth;
  const hasVerticalScroll = containerScroll.scrollHeight > containerScroll.clientHeight;
  
  console.log('📊 Overflow detectado:');
  console.log('  - Horizontal:', hasHorizontalScroll);
  console.log('  - Vertical:', hasVerticalScroll);
  
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
  }
  
  return hasHorizontalScroll || hasVerticalScroll;
}

// Função para verificar elementos pai que podem estar causando scroll
function checkParentElements() {
  console.log('🔍 Verificando elementos pai do FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  if (!fabContainer) {
    console.error('❌ Container do FAB não encontrado');
    return;
  }
  
  let currentElement = fabContainer.parentElement;
  let level = 1;
  
  while (currentElement && currentElement !== document.body) {
    const computedStyle = window.getComputedStyle(currentElement);
    const tagName = currentElement.tagName;
    const className = currentElement.className;
    const id = currentElement.id;
    
    console.log(`📊 Nível ${level} - ${tagName}${id ? '#' + id : ''}${className ? '.' + className.split(' ').join('.') : ''}:`);
    console.log(`  - overflow: ${computedStyle.overflow}`);
    console.log(`  - overflow-x: ${computedStyle.overflowX}`);
    console.log(`  - overflow-y: ${computedStyle.overflowY}`);
    console.log(`  - max-height: ${computedStyle.maxHeight}`);
    console.log(`  - height: ${computedStyle.height}`);
    console.log(`  - position: ${computedStyle.position}`);
    
    // Verificar se este elemento tem scroll
    const hasScroll = currentElement.scrollWidth > currentElement.clientWidth || 
                     currentElement.scrollHeight > currentElement.clientHeight;
    
    if (hasScroll) {
      console.log(`  ⚠️ ELEMENTO COM SCROLL DETECTADO!`);
    }
    
    currentElement = currentElement.parentElement;
    level++;
  }
}

// Função para verificar CSS global que pode estar afetando o FAB
function checkGlobalCSS() {
  console.log('🔍 Verificando CSS global que pode afetar o FAB...');
  
  // Verificar se há regras CSS que podem estar causando scroll
  const styleSheets = Array.from(document.styleSheets);
  
  styleSheets.forEach((sheet, index) => {
    try {
      const rules = Array.from(sheet.cssRules || sheet.rules);
      
      rules.forEach(rule => {
        if (rule.selectorText && (
          rule.selectorText.includes('fab') ||
          rule.selectorText.includes('overflow') ||
          rule.selectorText.includes('max-height') ||
          rule.selectorText.includes('scroll')
        )) {
          console.log(`📊 Regra CSS encontrada em stylesheet ${index}:`);
          console.log(`  - Seletor: ${rule.selectorText}`);
          console.log(`  - Estilos: ${rule.style.cssText}`);
        }
      });
    } catch (error) {
      console.log(`⚠️ Não foi possível acessar stylesheet ${index}:`, error.message);
    }
  });
}

// Função para testar hover e verificar se causa scroll
function testFABHover() {
  console.log('🔍 Testando hover do FAB...');
  
  const fabContainer = document.getElementById('fab-container-main');
  const fabMain = document.getElementById('fab-main');
  
  if (!fabMain) {
    console.error('❌ Botão principal do FAB não encontrado');
    return;
  }
  
  // Verificar estado antes do hover
  console.log('📊 Estado antes do hover:');
  const beforeScroll = checkFABScroll();
  
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
    const afterScroll = checkFABScroll();
    
    if (beforeScroll !== afterScroll) {
      console.log('⚠️ MUDANÇA DETECTADA NO SCROLL APÓS HOVER!');
    } else {
      console.log('✅ Nenhuma mudança no scroll detectada');
    }
  }, 100);
}

// Função para testar abertura do FAB
function testFABOpen() {
  console.log('🔍 Testando abertura do FAB...');
  
  const fabMain = document.getElementById('fab-main');
  
  if (!fabMain) {
    console.error('❌ Botão principal do FAB não encontrado');
    return;
  }
  
  // Verificar estado antes da abertura
  console.log('📊 Estado antes da abertura:');
  const beforeScroll = checkFABScroll();
  
  // Simular clique
  console.log('🖱️ Simulando clique...');
  fabMain.click();
  
  // Aguardar animação e verificar estado após abertura
  setTimeout(() => {
    console.log('📊 Estado após abertura:');
    const afterScroll = checkFABScroll();
    
    if (beforeScroll !== afterScroll) {
      console.log('⚠️ MUDANÇA DETECTADA NO SCROLL APÓS ABERTURA!');
    } else {
      console.log('✅ Nenhuma mudança no scroll detectada');
    }
    
    // Fechar FAB após teste
    setTimeout(() => {
      fabMain.click();
      console.log('✅ FAB fechado após teste');
    }, 1000);
  }, 500);
}

// Função principal de debug
function runFABDebug() {
  console.log('🚀 Iniciando debug completo do FAB...');
  
  // Debug 1: Verificar estilos
  debugFABStyles();
  
  // Debug 2: Verificar scroll atual
  setTimeout(() => {
    checkFABScroll();
  }, 100);
  
  // Debug 3: Verificar elementos pai
  setTimeout(() => {
    checkParentElements();
  }, 200);
  
  // Debug 4: Verificar CSS global
  setTimeout(() => {
    checkGlobalCSS();
  }, 300);
  
  // Debug 5: Testar hover
  setTimeout(() => {
    testFABHover();
  }, 500);
  
  // Debug 6: Testar abertura
  setTimeout(() => {
    testFABOpen();
  }, 1000);
  
  console.log('✅ Debug do FAB iniciado');
}

// Expor funções para uso no console
window.debugFABStyles = debugFABStyles;
window.checkFABScroll = checkFABScroll;
window.checkParentElements = checkParentElements;
window.checkGlobalCSS = checkGlobalCSS;
window.testFABHover = testFABHover;
window.testFABOpen = testFABOpen;
window.runFABDebug = runFABDebug;

// Executar debug automático após um delay
setTimeout(() => {
  console.log('🔍 Executando debug automático do FAB...');
  runFABDebug();
}, 2000);

console.log('🔍 Script de debug do FAB carregado. Use runFABDebug() para executar o debug completo.');
