import './bootstrap.js';
import '../js/config/settings.handlers.js'; // Garante handlers globais no window (corrigido path)
import '../js/config/notification.triggers.js'; // Inicializa gatilhos de notificações (recorrentes + resumo semanal)
import '../js/ui/ConfirmModal.js'; // Modal de confirmação moderno
import { setupAPKLoginHandler } from '../js/apk-login-handler.js'; // Handler específico para login no APK
// Modal de transações será carregado dinamicamente quando necessário
// Arquivo de entrada principal da aplicação
// Substitui o app.js gigante com uma versão limpa e modular

import '../css/styles.css';
import { bootstrap } from './main.js';
import { logger, setLevel } from '@core/logger/logger.js';
import { applyThemeSettings, setupThemeToggle } from '@features/theme/ThemeService.js';
import { eventBus } from '@core/events/eventBus.js';

// Verificar resultado de redirect do Google (APENAS para APK real)
async function checkRedirectResult() {
  // Verificar se estamos em um APK real (não navegador em modo mobile)
  const isAPK = window.Capacitor?.isNativePlatform();
  
  if (!isAPK) {
    console.log('ℹ️ [REDIRECT] Navegador detectado - pulando verificação de redirect (usa popup)');
    return false;
  }
  
  try {
    const { getRedirectResult, onAuthStateChanged } = await import('firebase/auth');
    const { auth } = await import('@data/firebase/client.js');
    const { ensureUserProfile } = await import('@features/auth/service.js');
    const { activateRealtimeAfterLogin } = await import('./bootstrap.js');
    
    console.log('🔍 [REDIRECT] ✅ APK REAL detectado - processando redirect...');
    console.log('🔍 [REDIRECT] Current URL:', window.location.href);
    console.log('🔍 [REDIRECT] Capacitor Platform:', window.Capacitor?.getPlatform());
    console.log('🔍 [REDIRECT] User Agent:', navigator.userAgent);
    
    console.log('🔍 [REDIRECT] Chamando getRedirectResult...');
    const result = await getRedirectResult(auth);
    console.log('🔍 [REDIRECT] getRedirectResult retornou:', result ? 'user encontrado' : 'null');
    
    if (result && result.user) {
      console.log('🎉🎉🎉 [REDIRECT] ✅✅✅ LOGIN VIA REDIRECT BEM-SUCEDIDO! ✅✅✅ 🎉🎉🎉');
      console.log('✅ [REDIRECT] User Email:', result.user.email);
      console.log('✅ [REDIRECT] User ID:', result.user.uid);
      console.log('✅ [REDIRECT] Display Name:', result.user.displayName);
      console.log('✅ [REDIRECT] Photo URL:', result.user.photoURL);
      console.log('✅ [REDIRECT] Provider:', result.providerId);
      
      try {
        // Limpar flags de auth em progresso
        console.log('🔧 [REDIRECT] Limpando flags de auth...');
        localStorage.removeItem('authInProgress');
        localStorage.removeItem('authTimestamp');
        console.log('✅ [REDIRECT] Flags de auth limpas');
        
        // Criar perfil do usuário no Firestore
        console.log('🔧 [REDIRECT] Criando/atualizando perfil no Firestore...');
        await ensureUserProfile(result.user);
        console.log('✅ [REDIRECT] Perfil do usuário criado/atualizado no Firestore');
        
        // Atualizar appState
        console.log('🔧 [REDIRECT] Atualizando appState...');
        window.appState = window.appState || {};
        window.appState.currentUser = result.user;
        console.log('✅ [REDIRECT] appState.currentUser definido:', result.user.email);
        
        // Ativar listeners de dados em tempo real
        console.log('🔧 [REDIRECT] Ativando listeners de dados em tempo real...');
        await activateRealtimeAfterLogin(result.user);
        console.log('✅ [REDIRECT] Listeners de dados em tempo real ativados');
        
        // Forçar navegação para o dashboard após login via redirect
        console.log('🔧 [REDIRECT] Navegando para dashboard...');
        window.location.hash = '#/dashboard';
        console.log('✅ [REDIRECT] Hash atualizado para #/dashboard');
        
        // Garantir que a UI está correta
        console.log('🔧 [REDIRECT] Ajustando visibilidade da UI...');
        const loginPage = document.getElementById('login-page');
        const appContainer = document.querySelector('.app-container');
        const loadingPage = document.getElementById('loading-page');
        
        if (loginPage) {
          loginPage.style.display = 'none';
          console.log('✅ [REDIRECT] Login page ocultada');
        }
        if (loadingPage) {
          loadingPage.style.display = 'none';
          console.log('✅ [REDIRECT] Loading page ocultada');
        }
        if (appContainer) {
          appContainer.style.display = 'flex';
          console.log('✅ [REDIRECT] App container exibido');
        }
        
        console.log('🎉 [REDIRECT] ✅✅✅ REDIRECT PROCESSADO COM SUCESSO! ✅✅✅');
        
        return true;
      } catch (processingError) {
        console.error('❌❌❌ [REDIRECT] ERRO AO PROCESSAR REDIRECT:', processingError);
        console.error('❌ [REDIRECT] Error message:', processingError.message);
        console.error('❌ [REDIRECT] Error stack:', processingError.stack);
        throw processingError;
      }
    }
    
    console.log('ℹ️ [REDIRECT] Sem resultado de redirect, verificando auth state...');
    
    // Verificar se já está logado
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          console.log('✅ [REDIRECT] Usuário já está logado:', user.email);
          
          // Ativar listeners de dados em tempo real
          await activateRealtimeAfterLogin(user);
          
          // NÃO forçar navegação aqui - deixar o onAuthStateChanged do AuthService cuidar disso
          console.log('✅ [REDIRECT] Usuário já logado, aguardando AuthService processar...');
          
          resolve(true);
        } else {
          console.log('ℹ️ [REDIRECT] Usuário não está logado');
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error('❌ [REDIRECT] Erro ao verificar redirect:', error);
    console.error('❌ [REDIRECT] Error code:', error.code);
    console.error('❌ [REDIRECT] Error message:', error.message);
    return false;
  }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
  try {
    logger.info('DOM carregado, iniciando aplicação...');
    
    // Verificar se voltamos de um redirect do Google (mobile/APK)
    await checkRedirectResult();
    
    // Reduzir verbosidade em produção
    try { if (import.meta.env && import.meta.env.PROD) { setLevel('warn'); } } catch {}
    // Segurança: garantir que o modal de voz comece fechado e sem eventos
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
      logger.warn('Falha ao aplicar configurações de tema iniciais:', e);
    }
    // Aplicar preferências de Snackbar (toasts) salvas
    // Preferências são aplicadas automaticamente ao importar Snackbar.js
    // Garantir rota inicial no Dashboard (antes de qualquer outra configuração)
    try {
      const currentRaw = window.location.hash || '';
      const current = currentRaw.split('?')[0];
      // Apenas forçar dashboard se não houver hash ou for inválido
      if (!current || current === '#' || current === '#/') {
        window.location.hash = '#/dashboard';
      }
    } catch {}
    // Ativar login e observar estado de auth antes do bootstrap
    try {
      const { setupLoginButton, checkAuthState } = await import('@features/index.js');
      setupLoginButton();

      // Aguardar verificação de autenticação com timeout
      const authPromise = checkAuthState();
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          console.log('⏰ Timeout na verificação de auth - continuando...');
          resolve(false);
        }, 3000);
      });

      await Promise.race([authPromise, timeoutPromise]);
    } catch (authWireErr) {
      logger.warn('Falha ao configurar login/estado de auth:', authWireErr);
    }
    // Bootstrap com timeout para evitar travamento
    console.log('🚀 [Entry] Iniciando bootstrap...');
    const bootstrapPromise = bootstrap();
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        console.log('⏰ [Entry] Timeout no bootstrap - continuando...');
        resolve();
      }, 15000); // 15s timeout
    });
    
    await Promise.race([bootstrapPromise, timeoutPromise]);
    console.log('✅ [Entry] Bootstrap concluído (ou timeout atingido)');
    
    // Ocultar SplashScreen (Capacitor) após bootstrap para evitar flicker (somente em nativo)
    try {
      if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
        // Verificar se o plugin está disponível antes de importar
        if (window.Capacitor.Plugins && window.Capacitor.Plugins.SplashScreen) {
          try {
            await window.Capacitor.Plugins.SplashScreen.hide({ fadeOutDuration: 200 });
          } catch (hideError) {
            console.log('SplashScreen hide error:', hideError);
          }
        }
      }
    } catch (capacitorError) {
      console.log('Capacitor SplashScreen not available:', capacitorError);
    }

    // Garantir que a tela de loading seja ocultada
    try {
      if (window.showLoading) {
        window.showLoading(false);
        console.log('🎯 [Entry] Loading ocultado após bootstrap');
      }
    } catch (e) {
      console.warn('⚠️ [Entry] Erro ao ocultar loading:', e);
    }
    // Conectar toggle de tema após bootstrap quando o botão existir
    try {
      setupThemeToggle();
    } catch (e) {
      logger.warn('Falha ao configurar toggle de tema pós-bootstrap:', e);
    }
  } catch (error) {
    logger.error('Erro fatal ao inicializar aplicação:', error);
    // Mostrar erro para o usuário
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: #ef4444;">
        <h1>Erro ao carregar aplicação</h1>
        <p>${error.message}</p>
        <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
          Tentar novamente
        </button>
      </div>
    `;
  }
});

// Configurar PWA - DESABILITADO PARA EVITAR LOOP INFINITO
if (false && import.meta.env && import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      logger.info('Service Worker registrado:', registration.scope);

      // Banner persistente para atualização (comentado - função não utilizada atualmente)
      /* const _showUpdateBanner = () => {
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
            <span style="font-size: 0.9rem;">Nova versão disponível</span>
            <div style="display:flex; gap:8px;">
              <button id="update-apply-btn" class="btn btn-primary btn-sm" style="padding:6px 10px;">Atualizar</button>
              <button id="update-settings-btn" class="btn btn-outline btn-sm" style="padding:6px 10px;">Detalhes</button>
            </div>
          `;
          document.body.appendChild(bar);
          // Auto-hide de segurança após 90s
          try { setTimeout(() => { const el = document.getElementById('update-banner'); el && el.remove(); }, 90000); } catch {}
          // Ações
          const applyBtn = document.getElementById('update-apply-btn');
          const detailBtn = document.getElementById('update-settings-btn');
          applyBtn?.addEventListener('click', async () => {
            try {
              // Sempre esconder a barra ao tentar aplicar
              try { const el = document.getElementById('update-banner'); el && el.remove(); } catch {}
              // Caminho 1: já há um SW aguardando
              if (registration && registration.waiting) {
                const onCtrl = () => { try { window.location.reload(); } catch {} };
                navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                setTimeout(() => { try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}; try { window.location.reload(); } catch {} }, 2000);
                return;
              }
              // Caminho 2: forçar update e checar novamente
              try { await registration?.update(); } catch {}
              const latest = await navigator.serviceWorker.getRegistration().catch(() => null);
              if (latest && latest.waiting) {
                const onCtrl = () => { try { window.location.reload(); } catch {} };
                navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                latest.waiting.postMessage({ type: 'SKIP_WAITING' });
                setTimeout(() => { try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}; try { window.location.reload(); } catch {} }, 2000);
                return;
              }
              // Caminho 3: fallback — recarregar a página (HTML está em network-first)
              window.location.reload();
            } catch {}
          });
          detailBtn?.addEventListener('click', () => {
            try { window.location.hash = '#/settings?section=about'; } catch {}
            // Esconder a barra ao navegar para detalhes
            try { const el = document.getElementById('update-banner'); el && el.remove(); } catch {}
          });
          // Delegação global (fallback) — caso listeners diretos não disparem
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
      }; */
      const hideUpdateBanner = () => {
        try { const el = document.getElementById('update-banner'); if (el) el.remove(); } catch {}
      };

      // Detectar atualização disponível e oferecer refresh (comentado - função não utilizada atualmente)
      /* function _promptUpdate() {
        try {
          // Lazy import do Snackbar
          import('@js/ui/Snackbar.js').then(({ Snackbar }) => {
            const action = {
              label: 'Atualizar',
              onClick: () => {
                // Pede para o SW aplicar imediatamente
                if (registration && registration.waiting) {
                  try {
                    // Feedback imediato ao usuário
                    try { Snackbar.show('Aplicando atualização…', 'info', 3000); } catch {}
                    // Recarregar quando o novo SW assumir o controle
                    const onCtrl = () => {
                      try { window.location.reload(); } catch {}
                    };
                    navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                    // Fallback: se o evento não disparar em ~2s, forçar reload
                    setTimeout(() => {
                      try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}
                      try { window.location.reload(); } catch {}
                    }, 2000);
                  } catch {
                    // Último recurso
                    setTimeout(() => window.location.reload(), 300);
                  }
                }
              }
            };
            Snackbar.show('Nova versão disponível', 'info', 6000, action);
          }).catch(() => {
            // Fallback simples
            if (confirm('Nova versão disponível. Atualizar agora?')) {
              if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              }
              setTimeout(() => window.location.reload(), 300);
            }
          });
        } catch {}
      } */

      // DESABILITADO PARA EVITAR LOOP INFINITO
      // Se um novo SW foi instalado e está waiting, marca e sugere atualizar
      // if (registration.waiting) {
      //   try { window.__updateAvailable = true; } catch {}
      //   try { eventBus.emit('update:available', true); } catch {}
      //   showUpdateBanner();
      //   promptUpdate();
      // }
      // Ouvir mudanças de estado
      // DESABILITADO PARA EVITAR LOOP INFINITO
      // registration.addEventListener('updatefound', () => {
      //   const newWorker = registration.installing;
      //   if (!newWorker) { return; }
      //   newWorker.addEventListener('statechange', () => {
      //     if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
      //       promptUpdate();
      //     }
      //   });
      // });

      // Mensagens do SW (ex.: UPDATE_AVAILABLE) - DESABILITADO PARA EVITAR LOOP
      // navigator.serviceWorker.addEventListener('message', (event) => {
      //   if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
      //     try { window.__updateAvailable = true; } catch {}
      //     try { eventBus.emit('update:available', true); } catch {}
      //     showUpdateBanner();
      //     promptUpdate();

      //     // Aplicação automática quando for seguro (aba oculta ou após breve idle)
      //     // TEMPORARIAMENTE DESABILITADO PARA EVITAR LOOP INFINITO
      //     const autoApply = () => {
      //       try {
      //         if (registration && registration.waiting) {
      //           const onCtrl = () => { try { window.location.reload(); } catch {} };
      //           navigator.serviceWorker.addEventListener('controllerchange', onCtrl, { once: true });
      //           registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      //           setTimeout(() => { try { navigator.serviceWorker.removeEventListener('controllerchange', onCtrl); } catch {}; try { window.location.reload(); } catch {} }, 2000);
      //         }
      //       } catch {}
      //     };

      //     // Se a aba estiver oculta, aplica imediatamente em background - DESABILITADO
      //     try { if (document.visibilityState === 'hidden') { autoApply(); } } catch {}
      //     // Caso contrário, agenda um apply suave após 60s de inatividade
      //     try {
      //       const idleTimer = setTimeout(() => { autoApply(); }, 60000);
      //       const cancelIdle = () => { try { clearTimeout(idleTimer); } catch {} };
      //       window.addEventListener('pointerdown', cancelIdle, { once: true, capture: true });
      //       window.addEventListener('keydown', cancelIdle, { once: true, capture: true });
      //     } catch {}
      //   }
      // });

      // Listener para mensagens do Service Worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'READY') {
          try {
            // Após pronto, solicitar limpeza de cache dinâmico para evitar conteúdo antigo
            if (navigator.serviceWorker.controller) {
              const channel = new MessageChannel();
              navigator.serviceWorker.controller.postMessage({ action: 'clearCache' }, [channel.port2]);
            }
            // Novo SW ativo: limpar indicador de update
            try { window.__updateAvailable = false; } catch {}
            try { eventBus.emit('update:available', false); } catch {}
            hideUpdateBanner();
            // Atualizar status da seção Sobre, se aberta
            try { if (typeof window.updateSwStatus === 'function') { setTimeout(() => window.updateSwStatus(), 50); } } catch {}
          } catch {}
        }
      });

      // Verificação periódica e ao voltar ao app (sem interromper o usuário)
      try {
        const softCheck = async () => { try { await registration.update(); } catch {} };
        // A cada 30 minutos
        const UPDATE_INTERVAL_MS = 30 * 60 * 1000;
        setInterval(softCheck, UPDATE_INTERVAL_MS);
        // Quando a aba volta a ficar visível
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
  logger.info('Aplicação online');
  document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
  logger.info('Aplicação offline');
  document.body.classList.add('offline');
});

// Configurar modo de compactação inicial
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
          window.Snackbar?.({ message: 'Instalação não disponível neste momento', type: 'warning' });
          return false;
        }
        promptEvent.prompt();
        const choice = await promptEvent.userChoice.catch(() => ({ outcome: 'dismissed' }));
        if (choice && choice.outcome === 'accepted') {
          window.Snackbar?.({ message: 'Instalação iniciada', type: 'success' });
        } else {
          window.Snackbar?.({ message: 'Instalação cancelada', type: 'info' });
        }
        // Only use prompt once
        try { window.deferredPrompt = null; } catch {}
        try { window.updateInstallButton && window.updateInstallButton(); } catch {}
        return choice?.outcome === 'accepted';
      } catch (err) {
        console.warn('installApp error:', err);
        window.Snackbar?.({ message: 'Falha ao solicitar instalação', type: 'error' });
        return false;
      }
    };
  }
} catch {}

// ===== CONFIGURAR LOGIN APK =====
// Executar handler de login específico para APK
console.log('🚨 [Entry] Chamando setupAPKLoginHandler...');
setupAPKLoginHandler();
