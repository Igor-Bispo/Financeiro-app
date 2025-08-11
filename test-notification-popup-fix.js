// Script de Teste - Correção do Popup de Notificação
// Testa se o Snackbar aparece corretamente acima do footer na tela de login

console.log('🔧 Iniciando teste da correção do popup de notificação...');

// Função para testar o Snackbar
function testNotificationPopup() {
  console.log('📱 Testando popup de notificação...');
  
  // Verificar se o Snackbar está disponível
  if (typeof window.Snackbar !== 'function') {
    console.error('❌ Snackbar não está disponível');
    return false;
  }
  
  // Testar diferentes tipos de notificação
  const tests = [
    { type: 'success', message: '✅ Teste de notificação de sucesso' },
    { type: 'error', message: '❌ Teste de notificação de erro' },
    { type: 'warning', message: '⚠️ Teste de notificação de aviso' },
    { type: 'info', message: 'ℹ️ Teste de notificação de informação' }
  ];
  
  let testIndex = 0;
  
  function runNextTest() {
    if (testIndex >= tests.length) {
      console.log('✅ Todos os testes de notificação concluídos');
      return;
    }
    
    const test = tests[testIndex];
    console.log(`🧪 Testando notificação ${test.type}...`);
    
    // Mostrar notificação
    window.Snackbar({
      message: test.message,
      type: test.type,
      duration: 2000
    });
    
    // Verificar z-index após criação
    setTimeout(() => {
      const snackbars = document.querySelectorAll('[class*="snackbar"], .snackbar-show');
      snackbars.forEach(snackbar => {
        const zIndex = window.getComputedStyle(snackbar).zIndex;
        console.log(`📊 Z-index do Snackbar: ${zIndex}`);
        
        if (parseInt(zIndex) >= 99999) {
          console.log('✅ Z-index correto - Snackbar aparecerá acima do footer');
        } else {
          console.warn('⚠️ Z-index pode ser insuficiente:', zIndex);
        }
      });
      
      testIndex++;
      setTimeout(runNextTest, 2500);
    }, 100);
  }
  
  runNextTest();
  return true;
}

// Função para verificar z-index do footer
function checkFooterZIndex() {
  console.log('🔍 Verificando z-index do footer...');
  
  const footer = document.querySelector('footer');
  if (footer) {
    const footerZIndex = window.getComputedStyle(footer).zIndex;
    console.log(`📊 Z-index do footer: ${footerZIndex}`);
    
    if (parseInt(footerZIndex) < 99999) {
      console.log('✅ Footer tem z-index menor que o Snackbar');
    } else {
      console.warn('⚠️ Footer pode estar interferindo com o Snackbar');
    }
  } else {
    console.log('ℹ️ Footer não encontrado na página atual');
  }
}

// Função para verificar se estamos na tela de login
function checkLoginScreen() {
  console.log('🔍 Verificando se estamos na tela de login...');
  
  const loginButton = document.getElementById('btn-entrar');
  const isLoginScreen = !!loginButton;
  
  console.log(`📱 Tela de login: ${isLoginScreen ? 'SIM' : 'NÃO'}`);
  
  if (isLoginScreen) {
    console.log('✅ Teste será executado na tela de login');
  } else {
    console.log('ℹ️ Teste será executado na tela atual');
  }
  
  return isLoginScreen;
}

// Função principal de teste
function runNotificationTest() {
  console.log('🚀 Executando teste completo do popup de notificação...');
  
  // Verificar tela atual
  checkLoginScreen();
  
  // Verificar z-index do footer
  checkFooterZIndex();
  
  // Aguardar um pouco e testar notificações
  setTimeout(() => {
    testNotificationPopup();
  }, 1000);
}

// Função para testar especificamente na tela de login
function testOnLoginScreen() {
  console.log('🔑 Testando especificamente na tela de login...');
  
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const themeColor = localStorage.getItem('themeColor') || 
                     document.documentElement.getAttribute('data-theme-color') || 
                     'blue';
  
  // Simular notificação de login
  if (window.Snackbar) {
    window.Snackbar({
      message: `🔑 Teste na tela de login - Tema ${theme} / Cor ${themeColor}`,
      type: 'info',
      duration: 4000
    });
    
    console.log('📱 Notificação de teste exibida na tela de login');
    console.log('👀 Verifique visualmente se a notificação aparece LOGO ACIMA do footer (80px)');
    console.log('🎨 Tema atual:', theme);
    console.log('🎨 Cor do tema atual:', themeColor);
  }
}

// Função de diagnóstico avançado
function advancedDiagnostic() {
  console.log('🔬 Executando diagnóstico avançado...');
  
  // Verificar todos os elementos com z-index alto
  const allElements = document.querySelectorAll('*');
  const highZIndexElements = [];
  
  allElements.forEach(element => {
    const zIndex = window.getComputedStyle(element).zIndex;
    if (zIndex !== 'auto' && parseInt(zIndex) > 1000) {
      highZIndexElements.push({
        element: element.tagName,
        class: element.className,
        id: element.id,
        zIndex: zIndex
      });
    }
  });
  
  console.log('📊 Elementos com z-index alto:', highZIndexElements);
  
  // Verificar se há conflitos
  const potentialConflicts = highZIndexElements.filter(el => parseInt(el.zIndex) >= 99999);
  if (potentialConflicts.length > 0) {
    console.warn('⚠️ Possíveis conflitos de z-index:', potentialConflicts);
  } else {
    console.log('✅ Nenhum conflito de z-index detectado');
  }
}

// Exportar funções para uso no console
window.testNotificationPopup = testNotificationPopup;
window.runNotificationTest = runNotificationTest;
window.testOnLoginScreen = testOnLoginScreen;
window.advancedDiagnostic = advancedDiagnostic;

// Executar teste automaticamente
console.log('🎯 Para testar manualmente, execute:');
console.log('   runNotificationTest() - Teste completo');
console.log('   testOnLoginScreen() - Teste específico para login');
console.log('   advancedDiagnostic() - Diagnóstico avançado');

// Função para testar notificações com suporte a temas
function testNotificationThemes() {
  console.log('🎨 Testando notificações com suporte a temas...');
  
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const themeColor = localStorage.getItem('themeColor') || 
                     document.documentElement.getAttribute('data-theme-color') || 
                     'blue';
  
  console.log(`🎨 Testando notificações - Tema: ${theme} / Cor: ${themeColor}`);
  
  const notifications = [
    { type: 'success', message: `✅ Sucesso - ${theme}/${themeColor}`, delay: 0 },
    { type: 'error', message: `❌ Erro - ${theme}/${themeColor}`, delay: 1000 },
    { type: 'warning', message: `⚠️ Aviso - ${theme}/${themeColor}`, delay: 2000 },
    { type: 'info', message: `ℹ️ Informação - ${theme}/${themeColor}`, delay: 3000 }
  ];
  
  notifications.forEach(notif => {
    setTimeout(() => {
      if (window.Snackbar) {
        window.Snackbar({
          message: notif.message,
          type: notif.type,
          duration: 4000
        });
        console.log(`📱 Notificação ${notif.type} exibida no tema ${theme}`);
      }
    }, notif.delay);
  });
  
  console.log('🎨 Teste de temas concluído! Verifique as cores das notificações.');
}

// Função para verificar estilos aplicados
function checkNotificationStyles() {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const themeColor = localStorage.getItem('themeColor') || 
                     document.documentElement.getAttribute('data-theme-color') || 
                     'blue';
  
  if (window.Snackbar) {
    window.Snackbar({
      message: `🎨 Verificando estilos - ${currentTheme}/${themeColor}`,
      type: 'info',
      duration: 5000
    });
    
    setTimeout(() => {
      const snackbar = document.querySelector('.snackbar, [class*="snackbar"]');
      if (snackbar) {
        console.log('🔍 Estilos aplicados na notificação:');
        console.log('Tema claro/escuro:', currentTheme);
        console.log('Cor do tema:', themeColor);
        console.log('Background:', snackbar.style.backgroundColor);
        console.log('Color:', snackbar.style.color);
        console.log('Border:', snackbar.style.border);
        console.log('Box Shadow:', snackbar.style.boxShadow);
        console.log('Z-Index:', snackbar.style.zIndex);
        console.log('Bottom:', snackbar.style.bottom);
        console.log('Classes:', snackbar.className);
      }
    }, 100);
  }
}

// Exportar funções para uso no console
window.testNotificationThemes = testNotificationThemes;
window.checkNotificationStyles = checkNotificationStyles;

// Executar teste inicial
runNotificationTest();

// Adicionar comando para teste de temas
console.log('🎨 Comando adicional disponível: testNotificationThemes()');