// pwa.js - centraliza funções de atualização PWA e limpeza de cache

export async function checkForUpdates() {
  const notify = (msg, type = 'info') => { try { window.Snackbar?.({ message: msg, type }); } catch {} };
  notify('Procurando atualizações…', 'info');
  if (!('serviceWorker' in navigator)) { notify('Service Worker indisponível', 'warning'); return; }
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) { notify('Registro do Service Worker não encontrado', 'warning'); return; }
  let reloaded = false;
  const safeReload = () => { if (!reloaded) { reloaded = true; try { window.location.reload(); } catch {} } };
  navigator.serviceWorker.addEventListener('controllerchange', safeReload, { once: true });
  try { await reg.update(); } catch {}
  const tryApplyInstalling = (inst) => new Promise(resolve => {
    if (!inst) return resolve(false);
    const onState = () => {
      if (inst.state === 'installed') {
        try { reg.waiting?.postMessage({ type: 'SKIP_WAITING' }); } catch {}
        notify('Atualização encontrada. Aplicando…', 'info');
        setTimeout(safeReload, 4000);
        resolve(true);
      }
    };
    inst.addEventListener('statechange', onState);
    if (inst.state === 'installed') { onState(); }
    setTimeout(() => resolve(false), 5000);
  });
  if (reg.waiting) {
    try { reg.waiting.postMessage({ type: 'SKIP_WAITING' }); } catch {}
    notify('Atualização encontrada. Aplicando…', 'info');
    setTimeout(safeReload, 4000);
  } else {
    const installedApplied = await tryApplyInstalling(reg.installing);
    if (!installedApplied) {
      const waitUpdate = new Promise(resolve => {
        let called = false;
        const onUpdateFound = async () => {
          if (called) return; called = true;
          reg.removeEventListener('updatefound', onUpdateFound);
          await tryApplyInstalling(reg.installing);
          resolve(true);
        };
        reg.addEventListener('updatefound', onUpdateFound);
        setTimeout(() => { if (!called) { reg.removeEventListener('updatefound', onUpdateFound); resolve(false); } }, 3000);
      });
      const gotUpdate = await waitUpdate;
      if (!gotUpdate) {
        try { reg.active?.postMessage?.({ type: 'UPDATE_CONTENT' }); } catch {}
        notify('Atualizando conteúdo…', 'info');
        setTimeout(safeReload, 500);
      }
    }
  }
  try {
    const ts = Date.now();
    localStorage?.setItem?.('sw_last_check', String(ts));
    const el = document.getElementById('sw-last-check');
    if (el) el.textContent = new Date(ts).toLocaleString();
    setTimeout(() => { window.updateSwStatus && window.updateSwStatus(); }, 10);
  } catch {}
}

export async function clearAppCaches() {
  try {
    if (typeof caches !== 'undefined' && caches.keys) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    try { navigator.serviceWorker?.controller?.postMessage?.({ action: 'clearCache' }); } catch {}
    window.Snackbar?.({ message: 'Cache offline limpo. Recarregue se necessário.', type: 'success' });
  } catch (e) {
    console.warn('clearAppCaches error:', e);
    window.Snackbar?.({ message: 'Falha ao limpar cache', type: 'error' });
  }
}
