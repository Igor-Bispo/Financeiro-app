// Utilitários de UI usando namespace global
function setupUI(user) {
  console.log('Configurando UI para usuário:', user ? user.displayName : 'Não logado');

  // Atualiza status da aplicação
  updateAppStatus();

  // Configura seção de autenticação
  // setupAuthSection(user);

  // Configura dashboard se usuário estiver logado
  if (user) {
    setupDashboard();
    loadUserData();
  } else {
    hideDashboard();
  }

  // Configura listeners
  setupTransactionListeners();
  setupCategoryListeners();
  setupGoalListeners();
  setupBudgetListeners();
  setupTabNavigation();
  setupVoiceListeners();
  setupExportListeners();

  // Mostra logs de debug em desenvolvimento
  if (window.location.hostname === 'localhost') {
    showDebugLogs();
  }
}

function updateAppStatus() {
  const statusContent = document.getElementById('status-content');
  if (statusContent) {
    statusContent.innerHTML = `
            <p>✅ Firebase: ${window.FirebaseApp ? 'Conectado' : 'Erro'}</p>
            <p>✅ Autenticação: ${window.FinanceAuth ? 'Disponível' : 'Erro'}</p>
            <p>✅ Banco de dados: ${window.FinanceDB ? 'Conectado' : 'Erro'}</p>
            <p>✅ Transações: ${window.FinanceTransactions ? 'Disponível' : 'Erro'}</p>
            <p>✅ Voz: ${window.FinanceVoice ? 'Disponível' : 'Erro'}</p>
        `;
  }
}

function setupAuthSection(user) {
  // Remover setupAuthSection e qualquer listener de login/logout relacionado a window.FinanceAuth
}

function setupDashboard() {
  const dashboard = document.getElementById('dashboard');
  dashboard.style.display = 'grid';
}

function hideDashboard() {
  const dashboard = document.getElementById('dashboard');
  dashboard.style.display = 'none';
}

async function loadUserData() {
  try {
    // Carrega transações
    const transactions = await window.FinanceTransactions.getTransactions();
    updateTransactionsList(transactions);

    // Carrega categorias
    const categories = window.FinanceCategories.listCategories();
    updateCategoriesList(categories);

    // Carrega metas
    const goals = window.FinanceGoals.listGoals();
    updateGoalsList(goals);

    // Carrega orçamentos
    const budgets = window.FinanceBudgets.listBudgets();
    updateBudgetsList(budgets);

    addLog('Dados carregados com sucesso');
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    addLog('Erro ao carregar dados: ' + error.message, 'error');
  }
}

function updateTransactionsList(transactions) {
  const list = document.getElementById('transactions-list');
  if (transactions.length === 0) {
    list.innerHTML = '<p class="text-sm text-gray-600">Nenhuma transação encontrada</p>';
    return;
  }

  const html = transactions
    .slice(0, 3)
    .map(
      (t) => `
        <div class="border-b py-1">
            <div class="flex justify-between">
                <span class="text-sm">${t.description || 'Sem descrição'}</span>
                <span class="text-sm font-medium">${window.FinanceHelpers.formatCurrency(t.amount || 0)}</span>
            </div>
        </div>
    `
    )
    .join('');

  list.innerHTML =
    html + `<p class="text-xs text-gray-500 mt-2">${transactions.length} transações no total</p>`;
}

function updateCategoriesList(categories) {
  const list = document.getElementById('categories-list');
  if (categories.length === 0) {
    list.innerHTML = '<p class="text-sm text-gray-600">Nenhuma categoria encontrada</p>';
    return;
  }

  const html = categories
    .slice(0, 3)
    .map(
      (c) => `
        <div class="border-b py-1">
            <span class="text-sm">${c.name || 'Sem nome'}</span>
        </div>
    `
    )
    .join('');

  list.innerHTML =
    html + `<p class="text-xs text-gray-500 mt-2">${categories.length} categorias no total</p>`;
}

function updateGoalsList(goals) {
  const list = document.getElementById('goals-list');
  if (goals.length === 0) {
    list.innerHTML = '<p class="text-sm text-gray-600">Nenhuma meta encontrada</p>';
    return;
  }

  const html = goals
    .slice(0, 3)
    .map(
      (g) => `
        <div class="border-b py-1">
            <span class="text-sm">${g.name || 'Sem nome'}</span>
        </div>
    `
    )
    .join('');

  list.innerHTML =
    html + `<p class="text-xs text-gray-500 mt-2">${goals.length} metas no total</p>`;
}

function updateBudgetsList(budgets) {
  const list = document.getElementById('budgets-list');
  if (budgets.length === 0) {
    list.innerHTML = '<p class="text-sm text-gray-600">Nenhum orçamento encontrado</p>';
    return;
  }

  const html = budgets
    .slice(0, 3)
    .map(
      (b) => `
        <div class="border-b py-1">
            <span class="text-sm">${b.name || 'Sem nome'}</span>
        </div>
    `
    )
    .join('');

  list.innerHTML =
    html + `<p class="text-xs text-gray-500 mt-2">${budgets.length} orçamentos no total</p>`;
}

function setupTransactionListeners() {
  console.log('Configurando listeners de transações...');

  document.getElementById('add-transaction-btn')?.addEventListener('click', () => {
    // Remover funções de exemplo/teste como addSampleTransaction
  });
}

function setupCategoryListeners() {
  console.log('Configurando listeners de categorias...');

  document.getElementById('add-category-btn')?.addEventListener('click', () => {
    // Remover funções de exemplo/teste como addSampleCategory
  });
}

function setupGoalListeners() {
  console.log('Configurando listeners de metas...');

  document.getElementById('add-goal-btn')?.addEventListener('click', () => {
    // Remover funções de exemplo/teste como addSampleGoal
  });
}

function setupBudgetListeners() {
  console.log('Configurando listeners de orçamento...');

  document.getElementById('add-budget-btn')?.addEventListener('click', () => {
    // Remover funções de exemplo/teste como addSampleBudget
  });
}

function setupTabNavigation() {
  console.log('Configurando navegação por abas...');
}

function setupVoiceListeners() {
  console.log('Configurando listeners de voz...');

  document.getElementById('voice-transaction-btn')?.addEventListener('click', () => {
    if (window.FinanceVoice) {
      window.FinanceVoice.startListening('transaction');
      updateVoiceStatus('🎤 Ouvindo... Diga sua transação');
    } else {
      addLog('Reconhecimento de voz não disponível', 'error');
    }
  });
}

function setupExportListeners() {
  console.log('Configurando listeners de exportação...');

  document.getElementById('export-btn')?.addEventListener('click', () => {
    // Remover funções de exemplo/teste como exportSampleData
  });
}

function updateVoiceStatus(message) {
  const voiceStatus = document.getElementById('voice-status');
  if (voiceStatus) {
    voiceStatus.innerHTML = `<p class="text-sm text-blue-600">${message}</p>`;
  }
}

function showDebugLogs() {
  const debugLogs = document.getElementById('debug-logs');
  if (debugLogs) {
    debugLogs.style.display = 'block';
  }
}

function addLog(message, type = 'info') {
  const logsContent = document.getElementById('logs-content');
  if (logsContent) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = type === 'error' ? 'text-red-600' : 'text-gray-700';
    logEntry.textContent = `[${timestamp}] ${message}`;
    logsContent.appendChild(logEntry);
    logsContent.scrollTop = logsContent.scrollHeight;
  }
}

class MobileUI {
  static hapticFeedback(type = 'light') {
    if ('vibrate' in navigator) {
      const patterns = { light: 50, medium: 100, heavy: 200 };
      navigator.vibrate(patterns[type]);
    }
  }
  static touchFeedback(element) {
    element.addEventListener(
      'touchstart',
      () => {
        element.classList.add('active-touch');
      },
      { passive: true }
    );
    element.addEventListener(
      'touchend',
      () => {
        element.classList.remove('active-touch');
      },
      { passive: true }
    );
  }
}
window.MobileUI = MobileUI;

// Disponibiliza globalmente
window.FinanceUI = {
  setupUI,
  updateAppStatus,
  setupAuthSection,
  setupDashboard,
  hideDashboard,
  loadUserData,
  updateTransactionsList,
  updateCategoriesList,
  updateGoalsList,
  updateBudgetsList,
  setupTransactionListeners,
  setupCategoryListeners,
  setupGoalListeners,
  setupBudgetListeners,
  setupTabNavigation,
  setupVoiceListeners,
  setupExportListeners,
  updateVoiceStatus,
  addLog,
};
