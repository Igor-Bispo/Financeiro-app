export function BottomNav(activeRoute) {
  const nav = document.createElement('nav');
  nav.className = 'fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around py-2 z-50 text-xs sm:text-sm';
  nav.innerHTML = [
    { icon: '📊', label: 'Dashboard', route: '/dashboard' },
    { icon: '💸', label: 'Transações', route: '/transactions' },
    { icon: '📂', label: 'Categorias', route: '/categories' },
    { icon: '♻️', label: 'Recorrentes', route: '/recorrentes' },
    { icon: '⚙️', label: 'Config.', route: '/settings' }
  ].map(tab => `
    <button class="nav-btn flex flex-col items-center gap-0.5 px-2 py-1 md:px-4 md:py-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-all duration-200 ${activeRoute === tab.route ? 'bg-blue-500 text-white font-semibold rounded-xl px-4 py-2 shadow-md scale-105' : ''}"
            data-route="${tab.route}">
      <span class="text-xl">${tab.icon}</span>
      <span>${tab.label}</span>
    </button>
  `).join('');

  return nav;
}