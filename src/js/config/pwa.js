// pwa.js - centraliza funções de atualização PWA e limpeza de cache

export async function checkForUpdates(forceHardRefresh = false) {
  const notify = (msg, type = 'info') => { try { window.Snackbar?.({ message: msg, type }); } catch {} };
  
  // Se for hard refresh, limpar tudo primeiro
  if (forceHardRefresh) {
    notify('🔄 Iniciando atualização completa (hard refresh)…', 'info');
    await performHardRefresh();
    return;
  }
  
  notify('Procurando atualizações…', 'info');
  if (!('serviceWorker' in navigator)) { 
    notify('Service Worker indisponível', 'warning'); 
    return; 
  }
  
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) { 
    notify('Registro do Service Worker não encontrado', 'warning'); 
    return; 
  }
  
  let reloaded = false;
  const safeReload = () => { 
    if (!reloaded) { 
      reloaded = true; 
      try { 
        window.location.reload(); 
      } catch {} 
    } 
  };
  
  const hardReload = () => { 
    if (!reloaded) { 
      reloaded = true; 
      try { 
        window.location.reload(true); 
      } catch {} 
    } 
  };
  
  navigator.serviceWorker.addEventListener('controllerchange', safeReload, { once: true });
  
  try { 
    await reg.update(); 
  } catch (error) {
    console.warn('[checkForUpdates] Erro ao atualizar service worker:', error);
  }
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

// Nova função para hard refresh completo
export async function performHardRefresh() {
  const notify = (msg, type = 'info') => { try { window.Snackbar?.({ message: msg, type }); } catch {} };
  
  try {
    notify('🧹 Limpando cache e dados…', 'info');
    
    // 1. Limpar todos os caches
    if (typeof caches !== 'undefined' && caches.keys) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      console.log('[HARD REFRESH] Caches limpos:', keys);
    }
    
    // 2. Limpar Service Worker
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.unregister();
        console.log('[HARD REFRESH] Service Worker removido');
      }
    }
    
    // 3. Limpar dados do localStorage (exceto dados importantes do usuário)
    const importantKeys = ['user', 'currentBudget', 'theme', 'language'];
    const keysToKeep = {};
    importantKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) keysToKeep[key] = value;
    });
    
    localStorage.clear();
    
    // Restaurar dados importantes
    Object.entries(keysToKeep).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    
    console.log('[HARD REFRESH] localStorage limpo (dados importantes preservados)');
    
    // 4. Limpar sessionStorage
    sessionStorage.clear();
    console.log('[HARD REFRESH] sessionStorage limpo');
    
    // 5. Forçar reload com bypass de cache
    notify('✅ Limpeza concluída. Recarregando aplicação…', 'success');
    
    setTimeout(() => {
      // Hard refresh com bypass de cache
      window.location.reload(true);
    }, 1500);
    
  } catch (error) {
    console.error('[HARD REFRESH] Erro durante limpeza:', error);
    notify('❌ Erro durante limpeza. Recarregando mesmo assim…', 'warning');
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  }
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
