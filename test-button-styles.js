// Script para testar os estilos dos botões das abas
console.log('🔍 Testando estilos dos botões das abas...');

// Função para verificar os estilos dos botões
function checkButtonStyles() {
  console.log('🔍 Verificando estilos dos botões...');
  
  // Encontrar todos os botões de navegação
  const navButtons = document.querySelectorAll('.nav-btn');
  console.log(`📊 Encontrados ${navButtons.length} botões de navegação`);
  
  navButtons.forEach((button, index) => {
    const computedStyle = window.getComputedStyle(button);
    const borderRadius = computedStyle.borderRadius;
    const padding = computedStyle.padding;
    const backgroundColor = computedStyle.backgroundColor;
    
    console.log(`\n🔘 Botão ${index + 1}:`);
    console.log(`   - Border Radius: ${borderRadius}`);
    console.log(`   - Padding: ${padding}`);
    console.log(`   - Background: ${backgroundColor}`);
    console.log(`   - Classes: ${button.className}`);
    
    // Verificar se tem border-radius
    if (borderRadius === '0px' || borderRadius === '0') {
      console.log(`   ❌ PROBLEMA: Border radius é 0!`);
    } else {
      console.log(`   ✅ OK: Border radius é ${borderRadius}`);
    }
  });
  
  // Verificar botões gerais
  const allButtons = document.querySelectorAll('button');
  console.log(`\n📊 Total de botões na página: ${allButtons.length}`);
  
  // Verificar se há regras CSS que removem border-radius
  const styleSheets = document.styleSheets;
  console.log(`\n📋 Verificando ${styleSheets.length} folhas de estilo...`);
  
  let foundBorderRadiusZero = false;
  
  for (let i = 0; i < styleSheets.length; i++) {
    try {
      const rules = styleSheets[i].cssRules || styleSheets[i].rules;
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (rule.style && rule.style.borderRadius === '0') {
          console.log(`   ⚠️ Encontrada regra com border-radius: 0:`, rule.selectorText);
          foundBorderRadiusZero = true;
        }
      }
    } catch (e) {
      // Ignorar erros de CORS
    }
  }
  
  if (!foundBorderRadiusZero) {
    console.log(`   ✅ Nenhuma regra com border-radius: 0 encontrada`);
  }
}

// Função para forçar border-radius nos botões
function forceButtonBorderRadius() {
  console.log('🔧 Forçando border-radius nos botões...');
  
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach((button, index) => {
    button.style.borderRadius = '12px';
    button.style.padding = '8px 12px';
    console.log(`   ✅ Botão ${index + 1} corrigido`);
  });
  
  // Verificar botões gerais também
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach((button, index) => {
    if (!button.classList.contains('nav-btn')) {
      button.style.borderRadius = '8px';
    }
  });
  
  console.log(`   ✅ ${navButtons.length} botões de navegação corrigidos`);
  console.log(`   ✅ ${allButtons.length} botões totais verificados`);
}

// Função para verificar variáveis CSS
function checkCSSVariables() {
  console.log('🔍 Verificando variáveis CSS...');
  
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  const variables = [
    '--border-radius-sm',
    '--border-radius-md', 
    '--border-radius-lg',
    '--border-radius-xl',
    '--border-radius-2xl',
    '--border-radius-full'
  ];
  
  variables.forEach(variable => {
    const value = computedStyle.getPropertyValue(variable);
    if (value) {
      console.log(`   ✅ ${variable}: ${value}`);
    } else {
      console.log(`   ❌ ${variable}: NÃO DEFINIDA`);
    }
  });
}

// Função principal
function runButtonTest() {
  console.log('🚀 Iniciando teste dos botões...');
  
  checkCSSVariables();
  checkButtonStyles();
  
  console.log('\n🔧 Aplicando correções...');
  forceButtonBorderRadius();
  
  console.log('\n✅ Teste concluído!');
  console.log('💡 Se os botões ainda estiverem quadrados, execute: forceButtonBorderRadius()');
}

// Executar teste
runButtonTest();
