export function BottomNav(activeRoute) {
  const nav = document.createElement('nav');
  nav.className = 'fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around py-2 z-50 text-xs sm:text-sm';
  const tabs = [
    { icon: '📊', label: 'Dashboard', route: '/dashboard' },
    { icon: '💸', label: 'Transações', route: '/transactions' },
    { icon: '📂', label: 'Categorias', route: '/categories' },
    { icon: '♻️', label: 'Recorrentes', route: '/recorrentes' },
    { icon: '⚙️', label: 'Config.', route: '/settings' }
  ];
  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn flex flex-col items-center gap-0.5 px-2 py-1 md:px-4 md:py-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-all duration-200';
    if (activeRoute === tab.route) {
      btn.className += ' bg-blue-200 text-blue-700 font-semibold rounded-xl px-4 py-2 shadow-md scale-105 active';
    }
    btn.setAttribute('data-route', tab.route);
    btn.innerHTML = `<span class="text-xl">${tab.icon}</span><span>${tab.label}</span>`;
    btn.addEventListener('click', () => {
      // Remover classe 'active' de todos os botões
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active', 'bg-blue-200', 'text-blue-700', 'font-semibold', 'rounded-xl', 'px-4', 'py-2', 'shadow-md', 'scale-105'));
      // Adicionar classe 'active' ao botão clicado
      btn.className += ' bg-blue-200 text-blue-700 font-semibold rounded-xl px-4 py-2 shadow-md scale-105 active';
      if (window.router) {window.router(tab.route);}
    });
    nav.appendChild(btn);
  });
  return nav;
}
