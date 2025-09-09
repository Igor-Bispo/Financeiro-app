// Helper for Service Worker update flow
// Detects new service worker, prompts user (callback), and handles skipWaiting+refresh

export function registerServiceWorker({ path = '/service-worker.js', onNewVersion } = {}) {
  if (!('serviceWorker' in navigator)) return;
  window.__swUpdateState = { awaitingActivation: false };
  navigator.serviceWorker.register(path).then(reg => {
    // SkipWaiting bound to this registration
    const boundSkipWaiting = () => {
      try {
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else if (reg.installing) {
          // Tentar assim que instalar
          const i = reg.installing;
          i.addEventListener('statechange', () => {
            if (i.state === 'installed' && reg.waiting) {
              reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        } else if (navigator.serviceWorker?.controller) {
          // Fallback (menos confiÃ¡vel)
          navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
        }
      } catch {}
    };
    // Fired when a new worker is installed but waiting
    function handleUpdateFound() {
      const newWorker = reg.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          window.__swUpdateState.awaitingActivation = true;
          if (typeof onNewVersion === 'function') {
            onNewVersion({ skipWaiting: boundSkipWaiting });
          } else {
            // Fallback: auto-apply after short delay
            setTimeout(() => boundSkipWaiting(), 3000);
          }
        }
      });
    }
    if (reg.waiting) {
      window.__swUpdateState.awaitingActivation = true;
      onNewVersion && onNewVersion({ skipWaiting: boundSkipWaiting });
    }
    reg.addEventListener('updatefound', handleUpdateFound);
  }).catch(err => console.warn('SW register failed:', err));
}

export function skipWaiting() {
  // Generic fallback (prefer the boundSkipWaiting from registerServiceWorker)
  try {
    navigator.serviceWorker?.controller?.postMessage?.({ type: 'SKIP_WAITING' });
  } catch {}
}

export function listenForControllerChange({ onReload } = {}) {
  if (!navigator.serviceWorker) return;
  let reloaded = false;
  const doReload = () => {
    if (reloaded) return;
    reloaded = true;
    if (typeof onReload === 'function') onReload();
    else window.location.reload();
  };
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Ensure we only reload once
    doReload();
  });
  // Safety: if controllerchange doesn't fire (edge cases), force reload after 4s
  setTimeout(() => { if (window.__swUpdateState?.awaitingActivation) doReload(); }, 4000);
}
