export function renderDrawer() {
  const drawer = document.createElement('div');
  drawer.id = 'drawer-menu';
  drawer.className = 'fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform -translate-x-full transition-transform duration-300';
  drawer.innerHTML = \`
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
  \`;

  document.body.appendChild(drawer);
}

export function toggleDrawer() {
  const drawer = document.getElementById('drawer-menu');
  if (drawer) {
    drawer.classList.toggle('-translate-x-full');
  }
}