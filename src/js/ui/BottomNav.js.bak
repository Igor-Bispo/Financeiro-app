import { eventBus } from '@core/events/eventBus.js';

export function BottomNav(activeRoute) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';

  const tabs = [
    { icon: '📊', label: 'Dashboard', shortLabel: 'Dash', route: '/dashboard' },
    { icon: '💸', label: 'Transações', shortLabel: 'Trans', route: '/transactions' },
    { icon: '📂', label: 'Categorias', shortLabel: 'Cat', route: '/categories' },
    { icon: '📈', label: 'Análises', shortLabel: 'Anál.', route: '/analytics' },
    { icon: '♻️', label: 'Recorrentes', shortLabel: 'Rec', route: '/recorrentes' },
    { icon: '🔔', label: 'Notificações', shortLabel: 'Notif', route: '/notifications' },
    { icon: '⚙️', label: 'Config', shortLabel: 'Conf', route: '/settings' }
  ];



  const navigateToTab = async (tab, btn) => {
    const route = tab.route;
    console.log(`🔄 Tentando navegar para: ${route}`);

    // Verificar se já está na aba correta
    const currentActive = document.querySelector('.nav-btn.active');
    if (currentActive && currentActive.getAttribute('data-route') === route) {
      console.log(`✅ Já está na aba ${route}`);
      return;
    }

    // Feedback visual imediato
    btn.style.transform = 'scale(0.95)';
    btn.style.opacity = '0.8';

    try {
      // Remover classe 'active' de todos os botões
      document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('active');
      });

      // Adicionar classe 'active' ao botão clicado
      btn.classList.add('active');

      // Tentar navegação
      if (window.router) {
        await window.router(route);
        console.log(`✅ Navegação para ${route} bem-sucedida`);
      } else if (window.routerNavigate) {
        // Suporte opcional ao shim de dev
        await window.routerNavigate(route);
        console.log(`✅ Navegação (shim) para ${route} bem-sucedida`);
      } else {
        // Fallback padrão: atualizar o hash (hashchange cuidará do render)
        window.location.hash = route;
      }
      // Rolagem será tratada pelo lifecycle de render das páginas

      // Atualizar título da página
      if (window.updatePageTitle) {
        window.updatePageTitle(route);
      }

    } catch (error) {
      console.error(`❌ Erro na navegação para ${route}:`, error);

      // Fallback simples: usar location.hash
      window.location.hash = route;

      // Mostrar feedback visual de erro
      btn.style.backgroundColor = '#fef2f2';
      btn.style.color = '#dc2626';
      setTimeout(() => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 1000);

      // Mostrar notificação de erro
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro na navegação. Tente novamente.',
          type: 'error'
        });
      }
    } finally {
      // Restaurar estilo do botão
      setTimeout(() => {
        btn.style.transform = '';
        btn.style.opacity = '';
      }, 200);
    }
  };

  let offNotifUpdated = null;

  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';

    if (activeRoute === tab.route) {
      btn.classList.add('active');
    }

    btn.setAttribute('data-route', tab.route);
    btn.setAttribute('aria-label', tab.label);

    // Adicionar badge para notificações
    const notificationBadge = tab.route === '/notifications' ? `
      <span class="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold leading-none transition-transform duration-200" style="display: none;" aria-live="polite" aria-atomic="true">
        0
      </span>
    ` : '';

    // Ponto de atualização para Config (Settings)
    const updateDot = tab.route === '/settings' ? `
      <span class="update-dot absolute -top-0.5 -right-0.5 bg-amber-400 dark:bg-amber-300 rounded-full h-2.5 w-2.5 ring-2 ring-white dark:ring-gray-900" style="display: none;" title="Atualização disponível"></span>
    ` : '';

    btn.innerHTML = `
      <span class="tab-indicator"></span>
      <div class="relative w-6 h-6 flex items-center justify-center">
        <span class="text-[20px] leading-none transition-transform duration-200">${tab.icon}</span>
        ${notificationBadge}
        ${updateDot}
      </div>
      <span class="text-[8px] sm:text-[10px] md:text-sm font-medium leading-tight truncate max-w-[40px] sm:max-w-none">${window.innerWidth < 640 ? tab.shortLabel : tab.label}</span>
    `;

    // Adicionar feedback tátil
    btn.addEventListener('touchstart', () => {
      btn.style.transform = 'scale(0.95)';
    });

    btn.addEventListener('touchend', () => {
      btn.style.transform = '';
    });

    // Prevenir múltiplos cliques
    let isNavigating = false;

    btn.addEventListener('click', async (e) => {
      // Evitar bloquear interação global; apenas impedir navegação padrão
      e.preventDefault();

      if (isNavigating) {
        console.log('🔄 Navegação já em andamento, ignorando clique');
        return;
      }

      isNavigating = true;

      try {
        await navigateToTab(tab, btn);
      } finally {
        // Resetar flag após um delay
        setTimeout(() => {
          isNavigating = false;
        }, 500);
      }
    });

    // Se for o botão de notificações, conectar ao eventBus para atualizar badge
    if (tab.route === '/notifications') {
      const badgeEl = btn.querySelector('.notification-badge');
      const updateBadge = (items) => {
        try {
          const list = Array.isArray(items) ? items : (Array.isArray(window.appState?.notifications) ? window.appState.notifications : []);
          const unread = list.filter(n => !n.read).length;
          if (!badgeEl) return;
          const nextText = unread > 99 ? '99+' : String(unread);
          if (unread > 0) {
            const prev = badgeEl.textContent;
            badgeEl.textContent = nextText;
            badgeEl.style.display = 'flex';
            // Microanimação quando a contagem muda
            if (prev !== nextText) {
              const prefersReduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              if (!prefersReduce) {
                badgeEl.style.transform = 'scale(1.15)';
                setTimeout(() => { try { badgeEl.style.transform = ''; } catch {} }, 180);
              }
            }
          } else {
            badgeEl.style.display = 'none';
          }
        } catch {}
      };
      // Atualiza inicialmente
      updateBadge();
      // Assina atualizações
      offNotifUpdated = eventBus.on('notifications:updated', updateBadge);
    }

    // Se for o botão de Config, observar indicador de atualização
    if (tab.route === '/settings') {
      const dot = btn.querySelector('.update-dot');
      const setDot = (on) => { try { dot && (dot.style.display = on ? 'block' : 'none'); } catch {} };
      // Estado inicial (global opcional)
      try { setDot(Boolean(window.__updateAvailable)); } catch {}
      // Assinar eventos do app
      try { eventBus.on('update:available', setDot); } catch {}
    }

    nav.appendChild(btn);
  });

  // Cleanup quando removido do DOM
  const observer = new MutationObserver(() => {
    if (!nav.isConnected) {
      try { if (offNotifUpdated) offNotifUpdated(); } catch {}
      try { observer.disconnect(); } catch {}
    }
  });
  try { observer.observe(document.body, { childList: true, subtree: true }); } catch {}

  return nav;
}
