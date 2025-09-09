// src/app/routes.js - Sistema de rotas com lazy loading
export const routes = {
  '/': () => import('@features/index.js').then(m => ({ default: m.renderDashboard })),
  '/dashboard': () => import('@features/index.js').then(m => ({ default: m.renderDashboard })),
  '/transactions': () => import('@features/transactions/TransactionsPage.js'),
  '/categories': () => import('@features/categories/CategoriesPage.js'),
  '/recorrentes': () => import('@features/index.js').then(m => ({ default: m.renderRecorrentes })),
  // AnÃ¡lises: usar a pÃ¡gina real via shim de features (que delega p/ js/ui/AnalyticsPage)
  '/analytics': () => import('@features/analytics/AnalyticsPage.js'),
  '/notifications': () => import('@features/notifications/NotificationsPage.js'),
  // ConfiguraÃ§Ãµes: usar a pÃ¡gina real de settings
  '/settings': () => import('@features/settings/SettingsPage.js'),
};

// FunÃ§Ã£o para renderizar pÃ¡gina baseada na rota
export async function renderPage(route) {
  try {
    // Normalizar rota removendo query/fragments estranhos e mapeando raiz para dashboard
    const cleanRoute = (route || '/').split('?')[0] || '/';
    const effectiveRoute = cleanRoute === '/' ? '/dashboard' : cleanRoute;
    console.log('ðŸ”„ Renderizando pÃ¡gina:', effectiveRoute);
    const container = document.getElementById('app-content');

    if (routes[effectiveRoute]) {
      const pageModule = await routes[effectiveRoute]();
      let renderFunction = null;
      if (typeof pageModule === 'function') {
        renderFunction = pageModule;
      } else if (pageModule && typeof pageModule.default === 'function') {
        renderFunction = pageModule.default;
      } else if (pageModule && typeof pageModule.render === 'function') {
        renderFunction = pageModule.render;
      } else if (pageModule && typeof pageModule.renderNotifications === 'function') {
        renderFunction = pageModule.renderNotifications;
      }

      if (typeof renderFunction === 'function') {
        await renderFunction(container);
        try { const { scrollToTop } = await import('@core/utils/globalUtils.js'); scrollToTop(); } catch {}
        // Garantir FAB visÃ­vel apÃ³s render da pÃ¡gina
        try {
          const { renderFAB } = await import('@features/index.js');
          renderFAB();
        } catch (e) {
          console.warn('FAB render falhou:', e);
        }
        try {
          const { renderBottomNav } = await import('@features/index.js');
          const active = effectiveRoute === '/' ? '/dashboard' : effectiveRoute;
          renderBottomNav(active);
        } catch (e) {
          console.warn('Bottom nav render falhou:', e);
        }
        // Inicializar/atualizar Swipe Navigation (deslizar entre abas)
        try {
          const { SwipeNavigation } = await import('@js/ui/SwipeTabs.js');
          if (!window.swipeNavigation) {
            window.swipeNavigation = new SwipeNavigation();
          } else {
            try { window.swipeNavigation.updateCurrentTabIndex(); } catch {}
            try { window.swipeNavigation.updateSwipeIndicator(); } catch {}
          }
        } catch (e) {
          console.warn('Swipe Navigation nÃ£o pÃ´de ser inicializado/atualizado:', e);
        }
        console.log('âœ… PÃ¡gina renderizada:', effectiveRoute);
      } else {
        console.error('âŒ FunÃ§Ã£o de renderizaÃ§Ã£o nÃ£o encontrada para:', effectiveRoute);
      }
    } else {
      console.warn('âš ï¸ Rota nÃ£o encontrada:', effectiveRoute);
      // Fallback para dashboard
      if (routes['/dashboard']) {
        const dashboardModule = await routes['/dashboard']();
        const renderDashboard = (dashboardModule && (dashboardModule.default || dashboardModule.render)) || dashboardModule;
        await renderDashboard(container);
        try { const { scrollToTop } = await import('@core/utils/globalUtils.js'); scrollToTop(); } catch {}
        try {
          const { renderBottomNav } = await import('@features/index.js');
          renderBottomNav('/dashboard');
        } catch (e) {
          console.warn('Bottom nav render (fallback) falhou:', e);
        }
        // Garantir Swipe Navigation tambÃ©m no fallback
        try {
          const { SwipeNavigation } = await import('@js/ui/SwipeTabs.js');
          if (!window.swipeNavigation) {
            window.swipeNavigation = new SwipeNavigation();
          } else {
            try { window.swipeNavigation.updateCurrentTabIndex(); } catch {}
            try { window.swipeNavigation.updateSwipeIndicator(); } catch {}
          }
        } catch (e) {
          console.warn('Swipe Navigation (fallback) nÃ£o pÃ´de ser inicializado:', e);
        }
      }
    }
  } catch (error) {
    console.error('âŒ Erro ao renderizar pÃ¡gina:', route, error);
    // Fallback para dashboard em caso de erro
    try {
      const containerEl = document.getElementById('app-content');
      if (routes['/dashboard']) {
        const dashboardModule = await routes['/dashboard']();
        const renderDashboard = (dashboardModule && (dashboardModule.default || dashboardModule.render)) || dashboardModule;
        await renderDashboard(containerEl);
        try { const { scrollToTop } = await import('@core/utils/globalUtils.js'); scrollToTop(); } catch {}
        try {
          const { renderBottomNav } = await import('@features/index.js');
          renderBottomNav('/dashboard');
        } catch (e) {
          console.warn('Bottom nav render (fallback catch) falhou:', e);
        }
        // Swipe Navigation no fallback de erro
        try {
          const { SwipeNavigation } = await import('@js/ui/SwipeTabs.js');
          if (!window.swipeNavigation) {
            window.swipeNavigation = new SwipeNavigation();
          } else {
            try { window.swipeNavigation.updateCurrentTabIndex(); } catch {}
            try { window.swipeNavigation.updateSwipeIndicator(); } catch {}
          }
        } catch (e) {
          console.warn('Swipe Navigation (fallback catch) nÃ£o pÃ´de ser inicializado:', e);
        }
      }
    } catch (fallbackError) {
      console.error('âŒ Erro no fallback para dashboard:', fallbackError);
    }
  }
}

// FunÃ§Ã£o para obter todas as rotas disponÃ­veis
export function getAvailableRoutes() {
  return Object.keys(routes);
}

// FunÃ§Ã£o para verificar se uma rota existe
export function routeExists(route) {
  return routes.hasOwnProperty(route);
}
