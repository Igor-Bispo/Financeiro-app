export function BottomNav(activeRoute) {
  const nav = document.createElement('nav');
  nav.className =
    'fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around py-1 sm:py-2 z-50 text-xs sm:text-sm shadow-lg bottom-nav';
  nav.style.cssText = `
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
    padding-bottom: env(safe-area-inset-bottom);
    gap: 0.25rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  `;

  const tabs = [
    { icon: '📊', label: 'Dashboard', shortLabel: 'Dash', route: '/dashboard' },
    { icon: '💸', label: 'Transações', shortLabel: 'Trans', route: '/transactions' },
    { icon: '📂', label: 'Categorias', shortLabel: 'Cat', route: '/categories' },
    { icon: '♻️', label: 'Recorrentes', shortLabel: 'Rec', route: '/recorrentes' },
    { icon: '🔔', label: 'Notificações', shortLabel: 'Notif', route: '/notifications' },
    { icon: '⚙️', label: 'Config.', shortLabel: 'Conf', route: '/settings' }
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
      } else {
        console.warn('⚠️ window.router não disponível, usando fallback');
        window.location.hash = route;
      }
      
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

  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.style.cssText = `
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      margin: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 0;
      transition: all 0.2s ease;
      position: relative;
    `;

    if (activeRoute === tab.route) {
      btn.classList.add('active');
    }

    btn.setAttribute('data-route', tab.route);
    btn.setAttribute('aria-label', tab.label);
    
    // Adicionar badge para notificações
    const notificationBadge = tab.route === '/notifications' ? `
      <span class="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" style="display: none;">
        0
      </span>
    ` : '';

    btn.innerHTML = `
      <div class="relative">
        <span class="text-lg md:text-2xl transition-transform duration-200">${tab.icon}</span>
        ${notificationBadge}
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
      e.preventDefault();
      e.stopPropagation();
      
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

    nav.appendChild(btn);
  });

  return nav;
}
