// features/navigation/NavigationService.js

// FunÃ§Ã£o para configurar navegaÃ§Ã£o
export function setupNavigation() {
  // Desabilitar restauraÃ§Ã£o automÃ¡tica de scroll do navegador
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch {}

  // FunÃ§Ã£o auxiliar para normalizar path removendo query string
  const normalize = (p) => {
    const cleaned = (p || '').split('?')[0];
    return cleaned && cleaned.startsWith('/') ? cleaned : '/dashboard';
  };
  // const currentPath = normalize(window.location.hash.slice(1)); // nÃ£o utilizado

  // Array de rotas disponÃ­veis
  const routes = ['/dashboard', '/transactions', '/categories', '/analytics', '/recorrentes', '/notifications', '/settings'];

  // NavegaÃ§Ã£o com setas do teclado
  document.addEventListener('keydown', (e) => {
    // SÃ³ funcionar se nÃ£o estiver em um input ou textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      navigateToRoute('prev');
      break;
    case 'ArrowRight':
      e.preventDefault();
      navigateToRoute('next');
      break;
    }
  });

  // Swipe touch handlers removidos aqui para evitar conflito com SwipeTabs (#app-content)

  // FunÃ§Ã£o para navegar para prÃ³xima/anterior rota
  function navigateToRoute(direction) {
    const currentIndex = routes.indexOf(normalize(window.location.hash.slice(1)));
    if (currentIndex === -1) return;

    let newIndex;
    // direction text nÃ£o utilizado, mantido apenas como comentÃ¡rio

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % routes.length;
      // prÃ³xima aba
    } else {
      newIndex = currentIndex === 0 ? routes.length - 1 : currentIndex - 1;
      // aba anterior
    }

    const newPath = routes[newIndex];
    // nomes de rota nÃ£o usados aqui

    window.location.hash = newPath;
    updatePageTitle(newPath);
  }

  // FunÃ§Ã£o para atualizar tÃ­tulo da pÃ¡gina
  function updatePageTitle(path) {
    const routeNames = {
      '/dashboard': 'Dashboard',
      '/transactions': 'TransaÃ§Ãµes',
      '/categories': 'Categorias',
      '/analytics': 'AnÃ¡lises',
      '/recorrentes': 'Recorrentes',
      '/notifications': 'NotificaÃ§Ãµes',
      '/settings': 'ConfiguraÃ§Ãµes'
    };

    const pageName = routeNames[path] || 'Dashboard';
    document.title = `Financeiro - ${pageName}`;
  }
}
