// Script de Teste - Suporte a Temas nas Notificações
// Versão 1.0.0

console.log('🎨 Iniciando teste de suporte a temas nas notificações...');

// Função para detectar tema atual
function getCurrentTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// Função para alternar tema
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  console.log('🎨 Tema alterado para:', isDark ? 'dark' : 'light');
  return isDark ? 'dark' : 'light';
}

// Função para testar notificações em ambos os temas
function testNotificationsInBothThemes() {
  console.log('🧪 Testando notificações em ambos os temas...');
  
  const currentTheme = getCurrentTheme();
  console.log('📱 Tema atual:', currentTheme);
  
  // Testar no tema atual
  testNotificationsInCurrentTheme(currentTheme);
  
  // Aguardar e alternar tema
  setTimeout(() => {
    const newTheme = toggleTheme();
    console.log('🔄 Alternando para tema:', newTheme);
    
    // Testar no novo tema
    setTimeout(() => {
      testNotificationsInCurrentTheme(newTheme);
      
      // Voltar ao tema original
      setTimeout(() => {
        toggleTheme();
        console.log('🔄 Voltando ao tema original:', currentTheme);
      }, 8000);
    }, 1000);
  }, 6000);
}

// Função para testar notificações no tema atual
function testNotificationsInCurrentTheme(theme) {
  console.log(`🎨 Testando notificações no tema ${theme}...`);
  
  const messages = [
    { type: 'success', message: `✅ Sucesso no tema ${theme}` },
    { type: 'error', message: `❌ Erro no tema ${theme}` },
    { type: 'warning', message: `⚠️ Aviso no tema ${theme}` },
    { type: 'info', message: `ℹ️ Info no tema ${theme}` }
  ];
  
  messages.forEach((msg, index) => {
    setTimeout(() => {
      if (window.Snackbar) {
        window.Snackbar({
          message: msg.message,
          type: msg.type,
          duration: 4000
        });
        console.log(`📱 Notificação ${msg.type} exibida no tema ${theme}`);
      }
    }, index * 1000);
  });
}

// Função para testar uma notificação específica
function testSpecificNotification(type = 'info', message = 'Teste de notificação') {
  const theme = getCurrentTheme();
  console.log(`🧪 Testando notificação ${type} no tema ${theme}...`);
  
  if (window.Snackbar) {
    window.Snackbar({
      message: `${message} (tema ${theme})`,
      type: type,
      duration: 5000
    });
    console.log(`📱 Notificação ${type} exibida`);
  } else {
    console.error('❌ Sistema Snackbar não encontrado');
  }
}

// Função para verificar estilos aplicados
function checkNotificationStyles() {
  console.log('🔍 Verificando estilos das notificações...');
  
  const theme = getCurrentTheme();
  console.log('📱 Tema atual:', theme);
  
  // Criar uma notificação temporária para análise
  if (window.Snackbar) {
    window.Snackbar({
      message: 'Verificando estilos...',
      type: 'info',
      duration: 3000
    });
    
    // Aguardar criação e analisar
    setTimeout(() => {
      const snackbar = document.querySelector('[class*="snackbar"]');
      if (snackbar) {
        const styles = getComputedStyle(snackbar);
        console.log('🎨 Estilos da notificação:');
        console.log('- Background:', styles.backgroundColor);
        console.log('- Color:', styles.color);
        console.log('- Border:', styles.border);
        console.log('- Box Shadow:', styles.boxShadow);
        console.log('- Z-Index:', styles.zIndex);
        console.log('- Bottom:', styles.bottom);
        console.log('- Classes:', snackbar.className);
      }
    }, 100);
  }
}

// Função para diagnóstico avançado
function advancedThemeDiagnostic() {
  console.log('🔬 Diagnóstico avançado de temas...');
  
  const theme = getCurrentTheme();
  const root = document.documentElement;
  
  console.log('📊 Informações do tema:');
  console.log('- Tema detectado:', theme);
  console.log('- Classe dark no HTML:', root.classList.contains('dark'));
  console.log('- LocalStorage theme:', localStorage.getItem('theme'));
  console.log('- Preferência do sistema:', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Verificar CSS variables
  const styles = getComputedStyle(root);
  console.log('🎨 CSS Variables:');
  console.log('- Primary color:', styles.getPropertyValue('--primary-color'));
  console.log('- Success color:', styles.getPropertyValue('--success-color'));
  console.log('- Danger color:', styles.getPropertyValue('--danger-color'));
  console.log('- Warning color:', styles.getPropertyValue('--warning-color'));
  console.log('- Info color:', styles.getPropertyValue('--info-color'));
}

// Exportar funções para uso no console
window.testNotificationThemes = {
  testAll: testNotificationsInBothThemes,
  testCurrent: () => testNotificationsInCurrentTheme(getCurrentTheme()),
  testSpecific: testSpecificNotification,
  checkStyles: checkNotificationStyles,
  diagnostic: advancedThemeDiagnostic,
  toggleTheme: toggleTheme,
  getCurrentTheme: getCurrentTheme
};

// Executar teste inicial
console.log('✅ Script de teste de temas carregado!');
console.log('📋 Comandos disponíveis:');
console.log('- testNotificationThemes.testAll() - Testar em ambos os temas');
console.log('- testNotificationThemes.testCurrent() - Testar no tema atual');
console.log('- testNotificationThemes.testSpecific(type, message) - Testar tipo específico');
console.log('- testNotificationThemes.checkStyles() - Verificar estilos');
console.log('- testNotificationThemes.diagnostic() - Diagnóstico avançado');
console.log('- testNotificationThemes.toggleTheme() - Alternar tema');

// Teste automático inicial
setTimeout(() => {
  console.log('🚀 Executando teste automático...');
  testSpecificNotification('info', 'Sistema de temas carregado com sucesso!');
}, 1000);