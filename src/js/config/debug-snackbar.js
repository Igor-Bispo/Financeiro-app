// Debug completo do sistema Snackbar
// Para identificar exatamente onde está o problema

console.log('[DebugSnackbar] Iniciando debug completo...');

// Função para debug completo
function debugSnackbarSystem() {
  console.log('[DebugSnackbar] === INICIANDO DEBUG COMPLETO ===');

  // 1. Verificar disponibilidade dos objetos
  console.log('[DebugSnackbar] 1. Verificando disponibilidade:');
  console.log('  - window.Snackbar:', !!window.Snackbar);
  console.log('  - window.SnackbarInstance:', !!window.SnackbarInstance);
  console.log('  - window.SnackbarConfigManager:', !!window.SnackbarConfigManager);
  console.log('  - window.applySimpleSnackbarConfig:', !!window.applySimpleSnackbarConfig);

  // 2. Verificar localStorage
  console.log('[DebugSnackbar] 2. Verificando localStorage:');
  const localStorageKeys = [
    'toastDuration', 'toastDistance', 'toastPosition',
    'toastAlignment', 'toastAlign', 'toastMaxQueue',
    'toastAntiSpam', 'toastCooldown', 'toast_hover_pause'
  ];

  localStorageKeys.forEach(key => {
    const value = localStorage.getItem(key);
    console.log(`  - ${key}:`, value);
  });

  // 3. Verificar estado da instância
  if (window.SnackbarInstance) {
    console.log('[DebugSnackbar] 3. Estado da instância:');
    const instance = window.SnackbarInstance;
    console.log('  - defaultDuration:', instance.defaultDuration);
    console.log('  - bottomOffset:', instance.bottomOffset);
    console.log('  - position:', instance.position);
    console.log('  - align:', instance.align);
    console.log('  - maxQueue:', instance.maxQueue);
    console.log('  - cooldownMs:', instance.cooldownMs);
    console.log('  - hoverPause:', instance.hoverPause);
  }

  // 4. Teste de aplicação direta
  console.log('[DebugSnackbar] 4. Testando aplicação direta...');

  if (window.SnackbarInstance) {
    // Salvar estado original
    const originalState = {
      defaultDuration: window.SnackbarInstance.defaultDuration,
      bottomOffset: window.SnackbarInstance.bottomOffset,
      position: window.SnackbarInstance.position,
      align: window.SnackbarInstance.align
    };

    console.log('[DebugSnackbar] Estado original salvo:', originalState);

    // Aplicar configurações específicas
    window.SnackbarInstance.defaultDuration = 2000;
    window.SnackbarInstance.bottomOffset = 100;
    window.SnackbarInstance.position = 'top';
    window.SnackbarInstance.align = 'left';

    console.log('[DebugSnackbar] Configurações aplicadas:');
    console.log('  - defaultDuration: 2000');
    console.log('  - bottomOffset: 100');
    console.log('  - position: top');
    console.log('  - align: left');

    // Verificar se foram aplicadas
    console.log('[DebugSnackbar] Verificando aplicação:');
    console.log('  - defaultDuration:', window.SnackbarInstance.defaultDuration);
    console.log('  - bottomOffset:', window.SnackbarInstance.bottomOffset);
    console.log('  - position:', window.SnackbarInstance.position);
    console.log('  - align:', window.SnackbarInstance.align);

    // Testar imediatamente
    if (window.Snackbar) {
      console.log('[DebugSnackbar] Testando notificações...');
      window.Snackbar.info('Debug: Configurações aplicadas diretamente!');

      setTimeout(() => {
        window.Snackbar.success('Debug: Segunda notificação!');
      }, 100);

      setTimeout(() => {
        window.Snackbar.warning('Debug: Terceira notificação!');
      }, 200);
    }

    // Restaurar estado original após 3 segundos
    setTimeout(() => {
      console.log('[DebugSnackbar] Restaurando estado original...');
      window.SnackbarInstance.defaultDuration = originalState.defaultDuration;
      window.SnackbarInstance.bottomOffset = originalState.bottomOffset;
      window.SnackbarInstance.position = originalState.position;
      window.SnackbarInstance.align = originalState.align;
      console.log('[DebugSnackbar] Estado original restaurado');
    }, 3000);
  }

  console.log('[DebugSnackbar] === DEBUG COMPLETO FINALIZADO ===');
}

// Função para testar configurações do localStorage
function testLocalStorageConfig() {
  console.log('[DebugSnackbar] === TESTANDO CONFIGURAÇÕES DO LOCALSTORAGE ===');

  // Definir configurações específicas
  localStorage.setItem('toastDuration', '4000');
  localStorage.setItem('toastDistance', '150');
  localStorage.setItem('toastPosition', 'top');
  localStorage.setItem('toastAlignment', 'right');

  console.log('[DebugSnackbar] Configurações definidas no localStorage:');
  console.log('  - toastDuration: 4000');
  console.log('  - toastDistance: 150');
  console.log('  - toastPosition: top');
  console.log('  - toastAlignment: right');

  // Aplicar configurações
  if (window.SnackbarInstance) {
    const duration = parseInt(localStorage.getItem('toastDuration')) || 3000;
    const distance = parseInt(localStorage.getItem('toastDistance')) || 80;
    const position = localStorage.getItem('toastPosition') || 'bottom';
    const alignment = localStorage.getItem('toastAlignment') || 'center';

    // Mapear valores
    const mappedPosition = position === 'inferior' ? 'bottom' : position === 'superior' ? 'top' : position;
    const mappedAlign = alignment === 'centro' ? 'center' :
      alignment === 'esquerda' ? 'left' :
        alignment === 'direita' ? 'right' :
          alignment;

    console.log('[DebugSnackbar] Valores mapeados:');
    console.log('  - duration:', duration);
    console.log('  - distance:', distance);
    console.log('  - position:', mappedPosition);
    console.log('  - align:', mappedAlign);

    // Aplicar na instância
    window.SnackbarInstance.defaultDuration = duration;
    window.SnackbarInstance.bottomOffset = distance;
    window.SnackbarInstance.position = mappedPosition;
    window.SnackbarInstance.align = mappedAlign;

    console.log('[DebugSnackbar] Configurações aplicadas na instância');

    // Testar
    if (window.Snackbar) {
      window.Snackbar.info('Teste: Configurações do localStorage aplicadas!');
    }
  }
}

// Expor funções globalmente
window.debugSnackbarSystem = debugSnackbarSystem;
window.testLocalStorageConfig = testLocalStorageConfig;

console.log('[DebugSnackbar] Funções de debug carregadas');
console.log('[DebugSnackbar] Use: debugSnackbarSystem() ou testLocalStorageConfig()');
