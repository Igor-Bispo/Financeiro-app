// Arquivo de entrada principal da aplicaÃ§Ã£o
// Substitui o app.js gigante com uma versÃ£o limpa e modular

import '../css/styles.css';
import { bootstrap } from './main.js';
import { logger } from '@core/logger/logger.js';
import { applyThemeSettings, setupThemeToggle } from '@features/theme/ThemeService.js';
import { eventBus } from '@core/events/eventBus.js';

// Inicializar aplicaÃ§Ã£o quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
  try {
    logger.info('DOM carregado, iniciando aplicaÃ§Ã£o...');
    // SeguranÃ§a: garantir que o modal de voz comece fechado e sem eventos
    try {
      const vm = document.getElementById('voice-modal');
      if (vm) {
        vm.style.display = 'none';
        vm.style.pointerEvents = 'none';
        vm.style.background = 'rgba(0, 0, 0, 0)';
        vm.style.backdropFilter = 'blur(0px)';
      }
    } catch {}
    try { document.body.classList.add('mobile-ui'); } catch {}
    // Aplicar tema salvo e modo compacto antes de renderizar para evitar flicker
    try {
      applyThemeSettings();
    } catch (e) {
      logger.warn('Falha ao aplicar configuraÃ§Ãµes de tema iniciais:', e);
    }
    // Aplicar preferÃªncias de Snackbar (toasts) salvas
    // PreferÃªncias sÃ£o aplicadas automaticamente ao importar Snackbar.js
    // Garantir rota inicial no Dashboard (antes de qualquer outra configuraÃ§Ã£o)
    try {
      const allowed = new Set(['#/dashboard', '#/transactions', '#/categories', '#/analytics', '#/recorrentes', '#/notifications', '#/settings']);
      const currentRaw = window.location.hash || '';
      const current = currentRaw.split('?')[0];
      // ForÃ§ar Dashboard quando: vazio, raiz, desconhecida ou Recorrentes (pedido do usuÃ¡rio)
      if (!current || current === '#' || current === '#/' || !allowed.has(current) || current === '#/recorrentes') {
        window.location.hash = '#/dashboard';
      }
      // Pequena janela de proteÃ§Ã£o contra redirecionamentos tardios
      if (typeof window !== 'undefined' && window.performance && typeof window.performance.now === 'function') {
        window.__forceDashboardUntil = window.performance.now() + 2500;
      } else {
        window.__forceDashboardUntil = Date.now() + 2500;
      }
    } catch {}
    // Ativar login e observar estado de auth antes do bootstrap
    try {
      const { setupLoginButton, checkAuthState } = await import('@features/index.js');
      setupLoginButton();
      await checkAuthState();
    } catch (authWireErr) {
      logger.warn('Falha ao configurar login/estado de auth:', authWireErr);
    }
    await bootstrap();
    // Conectar toggle de tema apÃ³s bootstrap quando o botÃ£o existir
    try {
      setupThemeToggle();
    } catch (e) {
      logger.warn('Falha ao configurar toggle de tema pÃ³s-bootstrap:', e);
    }
  } catch (error) {
    logger.error('Erro fatal ao inicializar aplicaÃ§Ã£o:', error);
    // Mostrar erro para o usuÃ¡rio
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: #ef4444;">
        <h1>Erro ao carregar aplicaÃ§Ã£o</h1>
        <p>${error.message}</p>
        <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
          Tentar novamente
        </button>
      </div>
    `;
  }
});

// Configurar PWA apenas em produÃ§Ã£o para evitar cache conflitando no dev
if (import.meta.env && import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      logger.info('Service Worker registrado:', registration.scope);

      // Banner persistente para atualizaÃ§Ã£o
      const showUpdateBanner = () => {
        try {
          if (document.getElementById('update-banner')) return;
          const bar = document.createElement('div');
          bar.id = 'update-banner';
          bar.style.position = 'fixed';
          // Respeitar safe-area e aparecer acima do FAB
          bar.style.bottom = 'calc(env(safe-area-inset-bottom, 0px) + 12px)';
          bar.style.left = '12px';
          bar.style.right = '12px';
          // FAB usa z-index 10000; deixe a barra acima
          bar.style.zIndex = '10050';
          bar.style.padding = '10px 12px';
          bar.style.borderRadius = '10px';
          bar.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
          bar.style.display = 'flex';
          bar.style.gap = '10px';
          bar.style.alignItems = 'center';
          bar.style.justifyContent = 'space-between';
          bar.style.background = 'var(--card-bg, #111827)';
          bar.style.color = 'var(--card-fg, #fff)';
          bar.style.pointerEvents = 'auto';
          bar.setAttribute('role', 'status');
          bar.innerHTML = `
            <span style="font-size: 0.9rem;">Nova versÃ£o disponÃ­vel</span>
            <div style="display:flex; gap:8px;">
              <button id="update-apply-btn" class="u-btn u-btn--primary" style="padding:6px 10px;">Atualizar</button>
              <button id="update-settings-btn" class="u-btn u-btn--outline" style="padding:6px 10px;">Detalhes</button>
            </div>
          `;
          document.body.appendChild(bar);
          // Auto-hide de seguranÃ§a apÃ³s 90s
          try { setTimeout(() => { const el = document.getElementById('update-banner'); el && el.remove(); }, 90000); } catch {}
          // AÃ§Ãµes
          const applyBtn = document.getElementById('update-apply-btn');
          const detailBtn = document.getElementById('update-settings-btn');
          applyBtn?.addEventListener('click', async () => {
            try {
              // Sempre esconder a barra ao tentar aplicar
              try { const el = document.getElementById('update-banner'); el && el.remove(); } catch {}
              // Caminho 1: jÃ¡ hÃ¡ um SW aguardando
              if (registration && registration.waiting) {
                const onCtrl = () => { try { window.location.reload(); } catch {} };
                navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                setTimeout(() => { try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}; try { window.location.reload(); } catch {} }, 2000);
                return;
              }
              // Caminho 2: forÃ§ar update e checar novamente
              try { await registration?.update(); } catch {}
              const latest = await navigator.serviceWorker.getRegistration().catch(() => null);
              if (latest && latest.waiting) {
                const onCtrl = () => { try { window.location.reload(); } catch {} };
                navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                latest.waiting.postMessage({ type: 'SKIP_WAITING' });
                setTimeout(() => { try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}; try { window.location.reload(); } catch {} }, 2000);
                return;
              }
              // Caminho 3: fallback â€” recarregar a pÃ¡gina (HTML estÃ¡ em network-first)
              window.location.reload();
            } catch {}
          });
          detailBtn?.addEventListener('click', () => {
            try { window.location.hash = '#/settings?section=about'; } catch {}
            // Esconder a barra ao navegar para detalhes
            try { const el = document.getElementById('update-banner'); el && el.remove(); } catch {}
          });
          // DelegaÃ§Ã£o global (fallback) â€” caso listeners diretos nÃ£o disparem
          if (!window.__updateBannerDelegated) {
            window.__updateBannerDelegated = true;
            document.addEventListener('click', async (ev) => {
              try {
                const t = ev.target;
                if (!t) return;
                const apply = t.closest && t.closest('#update-apply-btn');
                const details = t.closest && t.closest('#update-settings-btn');
                if (!apply && !details) return;
                ev.preventDefault();
                if (apply) {
                  try { const el = document.getElementById('update-banner'); el && el.remove(); } catch {}
                  try {
                    if (registration && registration.waiting) {
                      const onCtrl = () => { try { window.location.reload(); } catch {} };
                      navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                      setTimeout(() => { try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}; try { window.location.reload(); } catch {} }, 2000);
                      return;
                    }
                    try { await registration?.update(); } catch {}
                    const latest = await navigator.serviceWorker.getRegistration().catch(() => null);
                    if (latest && latest.waiting) {
                      const onCtrl = () => { try { window.location.reload(); } catch {} };
                      navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                      latest.waiting.postMessage({ type: 'SKIP_WAITING' });
                      setTimeout(() => { try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}; try { window.location.reload(); } catch {} }, 2000);
                      return;
                    }
                    window.location.reload();
                  } catch {}
                } else if (details) {
                  try { window.location.hash = '#/settings?section=about'; } catch {}
                  try { const el = document.getElementById('update-banner'); el && el.remove(); } catch {}
                }
              } catch {}
            }, true);
            // Ocultar ao trocar de rota
            window.addEventListener('hashchange', () => {
              try { const el = document.getElementById('update-banner'); el && el.remove(); } catch {}
            });
          }
        } catch {}
      };
      const hideUpdateBanner = () => {
        try { const el = document.getElementById('update-banner'); if (el) el.remove(); } catch {}
      };

      // Detectar atualizaÃ§Ã£o disponÃ­vel e oferecer refresh
      function promptUpdate() {
        try {
          // Lazy import do Snackbar
          import('@js/ui/Snackbar.js').then(({ Snackbar }) => {
            const action = {
              label: 'Atualizar',
              onClick: () => {
                // Pede para o SW aplicar imediatamente
                if (registration && registration.waiting) {
                  try {
                    // Feedback imediato ao usuÃ¡rio
                    try { Snackbar.show('Aplicando atualizaÃ§Ã£oâ€¦', 'info', 3000); } catch {}
                    // Recarregar quando o novo SW assumir o controle
                    const onCtrl = () => {
                      try { window.location.reload(); } catch {}
                    };
                    navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                    // Fallback: se o evento nÃ£o disparar em ~2s, forÃ§ar reload
                    setTimeout(() => {
                      try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}
                      try { window.location.reload(); } catch {}
                    }, 2000);
                  } catch {
                    // Ãšltimo recurso
                    setTimeout(() => window.location.reload(), 300);
                  }
                }
              }
            };
            Snackbar.show('Nova versÃ£o disponÃ­vel', 'info', 6000, action);
          }).catch(() => {
            // Fallback simples
            if (confirm('Nova versÃ£o disponÃ­vel. Atualizar agora?')) {
              if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              }
              setTimeout(() => window.location.reload(), 300);
            }
          });
        } catch {}
      }

      // Se um novo SW foi instalado e estÃ¡ waiting, marca e sugere atualizar
      if (registration.waiting) {
        try { window.__updateAvailable = true; } catch {}
        try { eventBus.emit('update:available', true); } catch {}
        showUpdateBanner();
        promptUpdate();
      }
      // Ouvir mudanÃ§as de estado
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) { return; }
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            promptUpdate();
          }
        });
      });

      // Mensagens do SW (ex.: UPDATE_AVAILABLE)
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          try { window.__updateAvailable = true; } catch {}
          try { eventBus.emit('update:available', true); } catch {}
          showUpdateBanner();
          promptUpdate();

          // AplicaÃ§Ã£o automÃ¡tica quando for seguro (aba oculta ou apÃ³s breve idle)
          const autoApply = () => {
            try {
              if (registration && registration.waiting) {
                const onCtrl = () => { try { window.location.reload(); } catch {} };
                navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                setTimeout(() => { try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}; try { window.location.reload(); } catch {} }, 2000);
              }
            } catch {}
          };

          // Se a aba estiver oculta, aplica imediatamente em background
          try { if (document.visibilityState === 'hidden') { autoApply(); } } catch {}
          // Caso contrÃ¡rio, agenda um apply suave apÃ³s 60s de inatividade
          try {
            const idleTimer = setTimeout(() => { autoApply(); }, 60000);
            const cancelIdle = () => { try { clearTimeout(idleTimer); } catch {} };
            window.addEventListener('pointerdown', cancelIdle, { once: true, capture: true });
            window.addEventListener('keydown', cancelIdle, { once: true, capture: true });
          } catch {}
        }
        if (event.data && event.data.type === 'READY') {
          try {
            // ApÃ³s pronto, solicitar limpeza de cache dinÃ¢mico para evitar conteÃºdo antigo
            if (navigator.serviceWorker.controller) {
              const channel = new MessageChannel();
              navigator.serviceWorker.controller.postMessage({ action: 'clearCache' }, [channel.port2]);
            }
            // Novo SW ativo: limpar indicador de update
            try { window.__updateAvailable = false; } catch {}
            try { eventBus.emit('update:available', false); } catch {}
            hideUpdateBanner();
            // Atualizar status da seÃ§Ã£o Sobre, se aberta
            try { if (typeof window.updateSwStatus === 'function') { setTimeout(() => window.updateSwStatus(), 50); } } catch {}
          } catch {}
        }
      });

      // VerificaÃ§Ã£o periÃ³dica e ao voltar ao app (sem interromper o usuÃ¡rio)
      try {
        const softCheck = async () => { try { await registration.update(); } catch {} };
        // A cada 30 minutos
        const UPDATE_INTERVAL_MS = 30 * 60 * 1000;
        setInterval(softCheck, UPDATE_INTERVAL_MS);
        // Quando a aba volta a ficar visÃ­vel
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') { softCheck(); }
        });
      } catch {}
    } catch (error) {
      logger.error('Erro ao registrar Service Worker:', error);
    }
  });
}

// Configurar modo offline
window.addEventListener('online', () => {
  logger.info('AplicaÃ§Ã£o online');
  document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
  logger.info('AplicaÃ§Ã£o offline');
  document.body.classList.add('offline');
});

// Configurar modo de compactaÃ§Ã£o inicial
import { applyCompactMode } from '@core/utils/globalUtils.js';
applyCompactMode();

// PWA Install (A2HS) wiring: capture prompt and expose helpers for Settings
try {
  window.deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    try {
      e.preventDefault();
    } catch {}
    try { window.deferredPrompt = e; } catch {}
    try { window.updateInstallButton && window.updateInstallButton(); } catch {}
  });
  window.addEventListener('appinstalled', () => {
    try { window.deferredPrompt = null; } catch {}
    try { window.Snackbar?.({ message: 'App instalado com sucesso', type: 'success' }); } catch {}
    try { window.updateInstallButton && window.updateInstallButton(); } catch {}
  });
  // Global helper used by Settings button
  if (typeof window.installApp !== 'function') {
    window.installApp = async function () {
      try {
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
          window.Snackbar?.({ message: 'InstalaÃ§Ã£o nÃ£o disponÃ­vel neste momento', type: 'warning' });
          return false;
        }
        promptEvent.prompt();
        const choice = await promptEvent.userChoice.catch(() => ({ outcome: 'dismissed' }));
        if (choice && choice.outcome === 'accepted') {
          window.Snackbar?.({ message: 'InstalaÃ§Ã£o iniciada', type: 'success' });
        } else {
          window.Snackbar?.({ message: 'InstalaÃ§Ã£o cancelada', type: 'info' });
        }
        // Only use prompt once
        try { window.deferredPrompt = null; } catch {}
        try { window.updateInstallButton && window.updateInstallButton(); } catch {}
        return choice?.outcome === 'accepted';
      } catch (err) {
        console.warn('installApp error:', err);
        window.Snackbar?.({ message: 'Falha ao solicitar instalaÃ§Ã£o', type: 'error' });
        return false;
      }
    };
  }
} catch {}
