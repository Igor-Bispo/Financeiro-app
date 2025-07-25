export function renderSettings() {
  const content = document.getElementById('app-content');
  content.innerHTML = '<h2 class="text-xl font-bold mb-4">Configurações</h2>';

  const menu = document.createElement('div');
  menu.className = 'space-y-3';

  menu.innerHTML = `
    <button class="w-full text-left p-3 rounded-xl shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            onclick="window.showExportOptions && window.showExportOptions()">
      📤 Exportar Dados
    </button>
    <button class="w-full text-left p-3 rounded-xl shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            onclick="window.renderLogAplicacoes && window.renderLogAplicacoes()">
      📆 Ver Log de Aplicações
    </button>
    <button class="w-full text-left p-3 rounded-xl shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            onclick="window.setupThemeToggle && window.setupThemeToggle('theme-toggle-btn')">
      🎨 Alternar Tema
    </button>
    <button class="w-full text-left p-3 rounded-xl shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            onclick="FirebaseAuth.signOut().then(() => router('/'))">
      🚪 Sair da Conta
    </button>
  `;

  content.appendChild(menu);
}
