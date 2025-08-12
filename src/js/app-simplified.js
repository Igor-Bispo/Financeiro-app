// App.js - Aplicação Financeira Completa
import '../css/styles.css';

// Estado global da aplicação
window.appState = {
  currentUser: null,
  currentBudget: null,
  transactions: [],
  categories: [],
  recorrentes: [],
  isLoading: false
};

// Função principal de inicialização
async function initApp() {
  try {
    console.log('🚀 Inicializando aplicação financeira...');
    
    // Verificar se o usuário está logado
    const user = localStorage.getItem('currentUser');
    if (user) {
      window.appState.currentUser = JSON.parse(user);
      console.log('👤 Usuário logado:', window.appState.currentUser.email);
    }
    
    // Carregar dados iniciais
    await loadInitialData();
    
    // Renderizar dashboard inicial
    await renderDashboard();
    
    // Configurar navegação
    setupNavigation();
    
    console.log('✅ Aplicação inicializada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar aplicação:', error);
  }
}

// Função para carregar dados iniciais
async function loadInitialData() {
  try {
    // Simular carregamento de dados
    window.appState.categories = [
      { id: '1', nome: 'Alimentação', tipo: 'despesa', limite: 500, cor: '#ef4444' },
      { id: '2', nome: 'Transporte', tipo: 'despesa', limite: 300, cor: '#f59e0b' },
      { id: '3', nome: 'Salário', tipo: 'receita', limite: 0, cor: '#22c55e' }
    ];
    
    window.appState.transactions = [
      { 
        id: '1', 
        descricao: 'Supermercado', 
        valor: 150, 
        tipo: 'despesa', 
        categoriaId: '1',
        createdAt: new Date()
      },
      { 
        id: '2', 
        descricao: 'Salário', 
        valor: 3000, 
        tipo: 'receita', 
        categoriaId: '3',
        createdAt: new Date()
      }
    ];
    
    console.log('📊 Dados iniciais carregados');
  } catch (error) {
    console.error('❌ Erro ao carregar dados:', error);
  }
}

// Função para renderizar o dashboard
async function renderDashboard(selectedYear, selectedMonth) {
  try {
    const content = document.getElementById('app-content');
    if (!content) {
      console.warn('⚠️ Elemento #app-content não encontrado');
      return;
    }

    const now = new Date();
    const year = selectedYear || now.getFullYear();
    const month = selectedMonth || now.getMonth() + 1;
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Calcular totais
    const receitas = window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
    
    const despesas = window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
    
    const saldo = receitas - despesas;

    content.innerHTML = `
      <div class="tab-container">
        <div class="tab-header">
          <h2 class="tab-title-highlight">📊 Dashboard</h2>
        </div>
        <div class="tab-content">
          <div class="content-spacing">
            <!-- Resumo do Mês -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 mb-6 text-white">
              <h2 class="text-xl font-bold mb-4">📊 RESUMO DO MÊS</h2>
              <div class="text-center">
                <h3 class="text-2xl font-bold">${meses[month - 1]} ${year}</h3>
                <div class="grid grid-cols-3 gap-4 mt-4">
                  <div class="text-center">
                    <div class="text-lg font-bold">R$ ${receitas.toFixed(2)}</div>
                    <div class="text-sm opacity-90">💰 Receitas</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-bold">R$ ${despesas.toFixed(2)}</div>
                    <div class="text-sm opacity-90">📉 Despesas</div>
                  </div>
                  <div class="text-center">
                    <div class="text-lg font-bold ${saldo >= 0 ? 'text-green-300' : 'text-red-300'}">R$ ${saldo.toFixed(2)}</div>
                    <div class="text-sm opacity-90">💳 Saldo</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transações Recentes -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6 border border-gray-300 dark:border-gray-700">
              <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">📋 Transações Recentes</h3>
              <div class="space-y-3">
                ${window.appState.transactions.length === 0 ? 
                  '<p class="text-gray-500 text-center py-4">Nenhuma transação encontrada</p>' :
                  window.appState.transactions.slice(0, 5).map(t => {
                    const categoria = window.appState.categories.find(c => c.id === t.categoriaId);
                    const isReceita = t.tipo === 'receita';
                    return `
                      <div class="flex items-center justify-between p-3 border rounded-lg">
                        <div class="flex-1">
                          <div class="font-semibold">${t.descricao}</div>
                          <div class="text-sm text-gray-500">${categoria?.nome || 'Sem categoria'}</div>
                        </div>
                        <div class="text-right">
                          <div class="font-bold ${isReceita ? 'text-green-600' : 'text-red-600'}">
                            ${isReceita ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    `;
                  }).join('')
                }
              </div>
            </div>

            <!-- Categorias -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-300 dark:border-gray-700">
              <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">🏷️ Categorias</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${window.appState.categories.map(cat => {
                  const transacoesCategoria = window.appState.transactions.filter(t => t.categoriaId === cat.id);
                  const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
                  const limite = parseFloat(cat.limite || 0);
                  const saldoCategoria = cat.tipo === 'receita' ? gasto : limite - gasto;
                  
                  return `
                    <div class="border rounded-lg p-4">
                      <div class="flex items-center space-x-3 mb-2">
                        <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor}"></div>
                        <span class="font-semibold">${cat.nome}</span>
                      </div>
                      <p class="text-sm text-gray-500">Tipo: ${cat.tipo}</p>
                      <p class="text-sm text-gray-500">Limite: R$ ${limite.toFixed(2)}</p>
                      <p class="text-sm text-gray-500">Gasto: R$ ${gasto.toFixed(2)}</p>
                      <p class="text-sm font-medium ${saldoCategoria >= 0 ? 'text-green-600' : 'text-red-600'}">
                        Saldo: R$ ${saldoCategoria.toFixed(2)}
                      </p>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    console.log('✅ Dashboard renderizado');
  } catch (error) {
    console.error('❌ Erro ao renderizar dashboard:', error);
  }
}

// Função para renderizar transações
function renderTransactions() {
  const content = document.getElementById('app-content');
  if (!content) return;

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📋 Transações</h2>
        <button onclick="showAddTransactionModal()" class="btn-primary">
          ➕ Nova Transação
        </button>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          ${window.appState.transactions.length === 0 ? `
            <div class="text-center py-8">
              <div class="text-4xl mb-4">📋</div>
              <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
              <div class="text-gray-600 dark:text-gray-400">Adicione sua primeira transação para começar</div>
            </div>
          ` : window.appState.transactions.map(t => {
            const categoria = window.appState.categories.find(c => c.id === t.categoriaId);
            const isReceita = t.tipo === 'receita';
            const data = new Date(t.createdAt).toLocaleDateString('pt-BR');
            
            return `
              <div class="list-item ${isReceita ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}">
                <div class="flex-1 min-w-0">
                  <div class="list-item-title truncate">${t.descricao}</div>
                  <div class="list-item-subtitle">${categoria?.nome || 'Sem categoria'} • ${data}</div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="font-bold ${isReceita ? 'text-green-600' : 'text-red-600'}">
                    ${isReceita ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                  </span>
                  <div class="flex gap-1">
                    <button onclick="editTransaction('${t.id}')" class="btn-secondary mobile-btn">✏️</button>
                    <button onclick="deleteTransaction('${t.id}')" class="btn-danger mobile-btn">🗑️</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// Função para renderizar categorias
function renderCategories() {
  const content = document.getElementById('app-content');
  if (!content) return;

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">🏷️ Categorias</h2>
        <button onclick="showAddCategoryModal()" class="btn-primary">
          ➕ Nova Categoria
        </button>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          ${window.appState.categories.length === 0 ? `
            <div class="text-center py-8">
              <div class="text-4xl mb-4">🏷️</div>
              <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
              <div class="text-gray-600 dark:text-gray-400">Adicione sua primeira categoria para começar</div>
            </div>
          ` : window.appState.categories.map(cat => `
            <div class="list-item">
              <div class="flex items-center space-x-3 flex-1">
                <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor}"></div>
                <div class="flex-1">
                  <div class="list-item-title">${cat.nome}</div>
                  <div class="list-item-subtitle">Tipo: ${cat.tipo} • Limite: R$ ${parseFloat(cat.limite || 0).toFixed(2)}</div>
                </div>
              </div>
              <div class="flex gap-1">
                <button onclick="editCategory('${cat.id}')" class="btn-secondary mobile-btn">✏️</button>
                <button onclick="deleteCategory('${cat.id}')" class="btn-danger mobile-btn">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Função para renderizar analytics
function renderAnalytics() {
  const content = document.getElementById('app-content');
  if (!content) return;

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📈 Analytics</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div class="text-center py-8">
            <div class="text-4xl mb-4">📈</div>
            <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Analytics em desenvolvimento</div>
            <div class="text-gray-600 dark:text-gray-400">Em breve você terá gráficos e relatórios detalhados</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Função para configurar navegação
function setupNavigation() {
  // Configurar navegação entre abas
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = item.getAttribute('data-tab');
      
      // Remover classe active de todos os itens
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Adicionar classe active ao item clicado
      item.classList.add('active');
      
      // Renderizar conteúdo da aba
      switch(tab) {
        case 'dashboard':
          renderDashboard();
          break;
        case 'transactions':
          renderTransactions();
          break;
        case 'categories':
          renderCategories();
          break;
        case 'analytics':
          renderAnalytics();
          break;
      }
    });
  });
}

// As funções de modal (showAddTransactionModal, showAddCategoryModal, editTransaction, editCategory)
// são implementadas em arquivos dedicados na pasta ui/ e carregadas via HTML

// Disponibilizar funções globalmente
window.renderDashboard = renderDashboard;
window.renderTransactions = renderTransactions;
window.renderCategories = renderCategories;
window.renderAnalytics = renderAnalytics;
window.initApp = initApp;
// As funções de modal são carregadas de arquivos dedicados

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

console.log('📱 App.js carregado com sucesso!');