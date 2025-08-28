// Settings feature shim: delegate to legacy implementation for full compatibility
export async function render(container) {
  // Clear provided container (usually #app-content) to avoid flicker
  if (container) {
    container.innerHTML = '';
  }

  // If already present on window, use it
  if (typeof window !== 'undefined' && typeof window.renderSettings === 'function') {
    return window.renderSettings();
  }

  try {
    // Load the legacy Settings page which renders into #app-content
    const mod = await import('../../js/config/SettingsPage.js');
    if (mod && typeof mod.renderSettings === 'function') {
      return mod.renderSettings();
    }
  } catch (err) {
    console.error('Settings shim: failed to load legacy SettingsPage:', err);
  }

  // Fallback UI if legacy module is unavailable
  const el = document.createElement('div');
  el.className = 'p-4';
  el.textContent = 'Não foi possível carregar as Configurações.';
  (container || document.body).appendChild(el);
}
