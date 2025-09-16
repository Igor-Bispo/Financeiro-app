// Sistema de configuração do Snackbar ultra-simplificado
// Abordagem direta sem complexidade

console.log('[SimpleSnackbarConfig] Iniciando sistema simplificado...');

// Função para aplicar configurações diretamente
function applySimpleSnackbarConfig() {
  console.log('[SimpleSnackbarConfig] Aplicando configurações...');
  
  // Verificar se o Snackbar está disponível
  if (!window.Snackbar) {
    console.warn('[SimpleSnackbarConfig] window.Snackbar não disponível');
    return;
  }
  
  // Verificar se a instância está disponível
  if (!window.SnackbarInstance) {
    console.warn('[SimpleSnackbarConfig] window.SnackbarInstance não disponível');
    return;
  }
  
  // Ler configurações do localStorage
  const duration = parseInt(localStorage.getItem('toastDuration')) || 3000;
  const distance = parseInt(localStorage.getItem('toastDistance')) || 80;
  const position = localStorage.getItem('toastPosition') || 'bottom';
  const alignment = localStorage.getItem('toastAlignment') || localStorage.getItem('toastAlign') || 'center';
  
  // Mapear valores
  const mappedPosition = position === 'inferior' ? 'bottom' : position === 'superior' ? 'top' : position;
  const mappedAlign = alignment === 'centro' ? 'center' : 
                     alignment === 'esquerda' ? 'left' : 
                     alignment === 'direita' ? 'right' : 
                     alignment;
  
  console.log('[SimpleSnackbarConfig] Configurações lidas:', {
    duration, distance, position: mappedPosition, align: mappedAlign
  });
  
  // Limpar snackbars existentes
  if (window.Snackbar.clearQueue) {
    window.Snackbar.clearQueue();
  }
  if (window.Snackbar.closeCurrent) {
    window.Snackbar.closeCurrent();
  }
  
  // Remover todos os snackbars do DOM
  const existingSnackbars = document.querySelectorAll('[data-snackbar="1"]');
  existingSnackbars.forEach(snackbar => {
    if (snackbar.parentNode) {
      snackbar.parentNode.removeChild(snackbar);
    }
  });
  
  console.log('[SimpleSnackbarConfig] Snackbars existentes removidos:', existingSnackbars.length);
  
  // Aplicar diretamente na instância
  const instance = window.SnackbarInstance;
  instance.defaultDuration = duration;
  instance.bottomOffset = distance;
  instance.position = mappedPosition;
  instance.align = mappedAlign;
  
  console.log('[SimpleSnackbarConfig] Configurações aplicadas na instância:', {
    defaultDuration: instance.defaultDuration,
    bottomOffset: instance.bottomOffset,
    position: instance.position,
    align: instance.align
  });
  
  // Forçar reconfiguração via configure se disponível
  if (window.Snackbar.configure) {
    window.Snackbar.configure({
      defaultDuration: duration,
      bottom: distance,
      position: mappedPosition,
      align: mappedAlign
    });
    console.log('[SimpleSnackbarConfig] Configurações aplicadas via configure');
  }
  
  // Testar imediatamente
  console.log('[SimpleSnackbarConfig] Testando configurações...');
  window.Snackbar.info('Teste: Configurações aplicadas!');
}

// Função para testar configurações
function testSimpleSnackbarConfig() {
  console.log('[SimpleSnackbarConfig] Testando...');
  
  // Aplicar configurações primeiro
  applySimpleSnackbarConfig();
  
  // Aguardar um pouco e testar
  setTimeout(() => {
    window.Snackbar.success('Teste SUCCESS!');
  }, 100);
  
  setTimeout(() => {
    window.Snackbar.warning('Teste WARNING!');
  }, 200);
}

// Função para resetar configurações
function resetSimpleSnackbarConfig() {
  console.log('[SimpleSnackbarConfig] Resetando...');
  
  // Resetar localStorage
  localStorage.setItem('toastDuration', '3000');
  localStorage.setItem('toastDistance', '80');
  localStorage.setItem('toastPosition', 'bottom');
  localStorage.setItem('toastAlignment', 'center');
  
  // Aplicar configurações resetadas
  applySimpleSnackbarConfig();
  
  window.Snackbar.info('Configurações resetadas!');
}

// Expor funções globalmente
window.applySimpleSnackbarConfig = applySimpleSnackbarConfig;
window.testSimpleSnackbarConfig = testSimpleSnackbarConfig;
window.resetSimpleSnackbarConfig = resetSimpleSnackbarConfig;

// Aplicar configurações automaticamente quando disponível
function waitForSnackbar() {
  if (window.Snackbar && window.SnackbarInstance) {
    console.log('[SimpleSnackbarConfig] Snackbar disponível, aplicando configurações...');
    applySimpleSnackbarConfig();
  } else {
    console.log('[SimpleSnackbarConfig] Aguardando Snackbar...');
    setTimeout(waitForSnackbar, 100);
  }
}

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForSnackbar);
} else {
  waitForSnackbar();
}

console.log('[SimpleSnackbarConfig] Sistema simplificado carregado');
