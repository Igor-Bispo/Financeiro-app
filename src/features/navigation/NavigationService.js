// features/navigation/NavigationService.js

// Função para configurar navegação
export function setupNavigation() {
  // Desabilitar restauração automática de scroll do navegador
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch {}

  // Função auxiliar para normalizar path removendo query string
  const normalize = (p) => {
    const cleaned = (p || '').split('?')[0];
    return cleaned && cleaned.startsWith('/') ? cleaned : '/dashboard';
  };
  // const currentPath = normalize(window.location.hash.slice(1)); // não utilizado

  // Array de rotas disponíveis
  const routes = ['/dashboard', '/transactions', '/categories', '/analytics', '/recorrentes', '/notifications', '/settings'];

  // Navegação com setas do teclado
  document.addEventListener('keydown', (e) => {
    // Só funcionar se não estiver em um input ou textarea
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

  // Função para navegar para próxima/anterior rota
  function navigateToRoute(direction) {
    const currentIndex = routes.indexOf(normalize(window.location.hash.slice(1)));
    if (currentIndex === -1) return;

    let newIndex;
    // direction text não utilizado, mantido apenas como comentário

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % routes.length;
      // próxima aba
    } else {
      newIndex = currentIndex === 0 ? routes.length - 1 : currentIndex - 1;
      // aba anterior
    }

    const newPath = routes[newIndex];
    // nomes de rota não usados aqui

    window.location.hash = newPath;
    updatePageTitle(newPath);
  }

  // Função para atualizar título da página
  function updatePageTitle(path) {
    const routeNames = {
      '/dashboard': 'Dashboard',
      '/transactions': 'Transações',
      '/categories': 'Categorias',
      '/analytics': 'Análises',
      '/recorrentes': 'Recorrentes',
      '/notifications': 'Notificações',
      '/settings': 'Configurações'
    };

    const pageName = routeNames[path] || 'Dashboard';
    document.title = `Financeiro - ${pageName}`;
  }
}
