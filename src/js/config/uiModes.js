// uiModes.js - centraliza funções de alternância de modos de interface

export function initializeColorTheme() {
  const savedColor = localStorage.getItem('colorTheme') || 'blue';
  console.log('🎨 Inicializando tema de cor:', savedColor);
  window.setColorTheme(savedColor);
}

export function toggleCompactMode(enabled) {
  console.log('📱 Alternando modo ultra-compacto:', enabled);
  const container = document.querySelector('.settings-container');
  const appContainer = document.querySelector('.app-container');
  const body = document.body;
  if (!container) return;
  if (enabled) {
    container.classList.add('compact-mode');
    if (appContainer) appContainer.classList.add('compact-mode');
    body.classList.add('compact-mode');
    localStorage.setItem('compactMode', 'true');
    console.log('✅ Modo compacto ativado');
  } else {
    container.classList.remove('compact-mode');
    container.classList.remove('micro-mode');
    container.classList.remove('nano-mode');
    if (appContainer) {
      appContainer.classList.remove('compact-mode');
      appContainer.classList.remove('micro-mode');
      appContainer.classList.remove('nano-mode');
    }
    body.classList.remove('compact-mode');
    body.classList.remove('micro-mode');
    body.classList.remove('nano-mode');
    localStorage.setItem('compactMode', 'false');
    localStorage.setItem('microMode', 'false');
    localStorage.setItem('nanoMode', 'false');
    localStorage.setItem('autoCompact', 'false');
    console.log('✅ Modo compacto desativado');
  }
  const microBtn = document.querySelector('.micro-compact-btn');
  const nanoBtn = document.querySelector('.nano-compact-btn');
  if (microBtn) microBtn.classList.remove('active');
  if (nanoBtn) nanoBtn.classList.remove('active');
  window.Snackbar?.({
    message: `Interface ${enabled ? 'ultra-compactada' : 'normal'}`,
    type: 'success'
  });
  setTimeout(() => {
    container.offsetHeight;
    if (appContainer) appContainer.offsetHeight;
  }, 50);
}

export function toggleMicroMode() {
  console.log('📱 Alternando modo micro-compacto');
  const container = document.querySelector('.settings-container');
  const appContainer = document.querySelector('.app-container');
  const body = document.body;
  const microBtn = document.querySelector('.micro-compact-btn');
  const nanoBtn = document.querySelector('.nano-compact-btn');
  if (!container || !microBtn) return;
  const isMicro = container.classList.contains('micro-mode');
  // ...continuação da lógica...
}
