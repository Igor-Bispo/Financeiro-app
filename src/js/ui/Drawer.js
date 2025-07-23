export function renderDrawer() {
  // Remover Drawer e overlay antigos se existirem
  document.getElementById('drawer-menu')?.remove();
  document.getElementById('drawer-overlay')?.remove();

  // Overlay escuro
  const overlay = document.createElement('div');
  overlay.id = 'drawer-overlay';
  overlay.style = 'position: fixed; inset: 0; background: rgba(0,0,0,0.25); z-index: 49; display: none;';
  overlay.tabIndex = -1;
  overlay.setAttribute('aria-label', 'Fechar menu lateral');
  overlay.addEventListener('click', () => toggleDrawer(false));
  document.body.appendChild(overlay);

  // Drawer
  const drawer = document.createElement('div');
  drawer.id = 'drawer-menu';
  drawer.className = 'fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform -translate-x-full transition-transform duration-300';
  drawer.setAttribute('role', 'navigation');
  drawer.setAttribute('aria-label', 'Menu lateral');
  drawer.innerHTML = `
    <div class="p-4 border-b dark:border-gray-700 text-lg font-semibold">
      📱 Financeiro App
    </div>
    <nav class="flex flex-col text-sm p-4 space-y-3">
      <button class="text-left hover:text-blue-600" onclick="router('/dashboard')">📊 Dashboard</button>
      <button class="text-left hover:text-blue-600" onclick="router('/transactions')">💸 Transações</button>
      <button class="text-left hover:text-blue-600" onclick="router('/categories')">📂 Categorias</button>
      <button class="text-left hover:text-blue-600" onclick="router('/recorrentes')">♻️ Recorrentes</button>
      <button class="text-left hover:text-blue-600" onclick="window.renderLogAplicacoes && window.renderLogAplicacoes()">📆 Log de Aplicações</button>
      <button class="text-left hover:text-blue-600" onclick="window.showExportOptions && window.showExportOptions()">📤 Exportar Dados</button>
      <button class="text-left hover:text-blue-600" onclick="FirebaseAuth.signOut().then(() => router('/'))">🚪 Sair</button>
    </nav>
  `;
  document.body.appendChild(drawer);

  // Fechar Drawer ao clicar em qualquer botão do menu
  drawer.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => toggleDrawer(false));
  });
}

export function toggleDrawer(forceOpen) {
  const drawer = document.getElementById('drawer-menu');
  const overlay = document.getElementById('drawer-overlay');
  if (!drawer || !overlay) return;
  const isOpen = !drawer.classList.contains('-translate-x-full');
  const shouldOpen = forceOpen === undefined ? !isOpen : forceOpen;
  if (shouldOpen) {
    drawer.classList.remove('-translate-x-full');
    overlay.style.display = 'block';
    setTimeout(() => drawer.querySelector('button')?.focus(), 200);
  } else {
    drawer.classList.add('-translate-x-full');
    overlay.style.display = 'none';
  }
}