// Dashboard Melhorado com Funcionalidades Reais
import * as transactionsRepo from '../../data/repositories/transactionsRepo.js';
import * as categoriesRepo from '../../data/repositories/categoriesRepo.js';
import * as budgetsRepo from '../../data/repositories/budgetsRepo.js';

export class EnhancedDashboard {
  constructor() {
    this.transactionsRepo = transactionsRepo;
    this.categoriesRepo = categoriesRepo;
    this.budgetsRepo = budgetsRepo;
    this.currentUser = this.getCurrentUserId();
    this.init();
  }

  getCurrentUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.uid || null;
  }

  async init() {
    if (!this.currentUser) {
      console.log('Usuário não logado, redirecionando...');
      window.location.hash = '#/login';
      return;
    }
    
    await this.loadData();
    this.render();
    this.bindEvents();
  }

  async loadData() {
    try {
      // Carregar dados em paralelo
      const [transactions, categories, budgets] = await Promise.all([
        this.transactionsRepo.list({ userId: this.currentUser }),
        this.categoriesRepo.list({ userId: this.currentUser }),
        this.budgetsRepo.list({ userId: this.currentUser })
      ]);

      this.data = {
        transactions: transactions || [],
        categories: categories || [],
        budgets: budgets || []
      };

      this.calculateStats();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      this.data = { transactions: [], categories: [], budgets: [] };
    }
  }

  calculateStats() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Filtrar transações do mês atual
    const monthlyTransactions = this.data.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });

    // Calcular receitas e despesas
    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    // Saldo atual
    const balance = income - expenses;

    // Top categorias de gastos
    const categoryExpenses = {};
    monthlyTransactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const category = t.category || 'Outros';
        categoryExpenses[category] = (categoryExpenses[category] || 0) + (t.amount || 0);
      });

    const topCategories = Object.entries(categoryExpenses)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    // Transações recentes
    const recentTransactions = this.data.transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // Meta de orçamento
    const currentBudget = this.data.budgets.find(b => 
      new Date(b.month).getMonth() === currentMonth &&
      new Date(b.month).getFullYear() === currentYear
    );

    this.stats = {
      balance,
      income,
      expenses,
      topCategories,
      recentTransactions,
      currentBudget,
      monthlyTransactions
    };
  }

  render() {
    const container = document.getElementById('app-content');
    if (!container) return;

    container.innerHTML = `
      <div class="enhanced-dashboard">
        <!-- Header com saldo principal -->
        <div class="dashboard-header">
          <div class="balance-card">
            <h1 class="balance-title text-2xl font-semibold text-gray-900 leading-tight">Saldo Atual</h1>
            <div class="balance-amount ${this.stats.balance >= 0 ? 'positive' : 'negative'}">
              ${this.formatCurrency(this.stats.balance)}
            </div>
            <div class="balance-subtitle">
              ${this.stats.income > 0 ? `+${this.formatCurrency(this.stats.income)} receitas` : 'Sem receitas'} • 
              ${this.stats.expenses > 0 ? `-${this.formatCurrency(this.stats.expenses)} despesas` : 'Sem despesas'}
            </div>
          </div>
        </div>

        <!-- Cards de resumo -->
        <div class="summary-cards">
          <div class="summary-card income">
            <div class="card-icon">💰</div>
            <div class="card-content">
              <div class="card-title">Receitas</div>
              <div class="card-value">${this.formatCurrency(this.stats.income)}</div>
            </div>
          </div>
          <div class="summary-card expense">
            <div class="card-icon">💸</div>
            <div class="card-content">
              <div class="card-title">Despesas</div>
              <div class="card-value">${this.formatCurrency(this.stats.expenses)}</div>
            </div>
          </div>
          <div class="summary-card budget">
            <div class="card-icon">🎯</div>
            <div class="card-content">
              <div class="card-title">Orçamento</div>
              <div class="card-value">${this.stats.currentBudget ? this.formatCurrency(this.stats.currentBudget.amount) : 'Não definido'}</div>
            </div>
          </div>
        </div>

        <!-- Gráfico de categorias -->
        <div class="chart-section">
          <h2 class="section-title">Gastos por Categoria</h2>
          <div class="categories-chart">
            ${this.stats.topCategories.length > 0 ? 
              this.stats.topCategories.map(([category, amount]) => `
                <div class="category-item">
                  <div class="category-info">
                    <span class="category-name">${category}</span>
                    <span class="category-amount">${this.formatCurrency(amount)}</span>
                  </div>
                  <div class="category-bar">
                    <div class="category-fill" style="width: ${(amount / this.stats.expenses) * 100}%"></div>
                  </div>
                </div>
              `).join('') :
              '<div class="no-data">Nenhum gasto registrado este mês</div>'
            }
          </div>
        </div>

        <!-- Transações recentes -->
        <div class="recent-section">
          <div class="section-header">
            <h2 class="section-title">Transações Recentes</h2>
            <a href="#/transactions" class="btn btn-outline btn-sm">Ver todas</a>
          </div>
          <div class="transactions-list">
            ${this.stats.recentTransactions.length > 0 ?
              this.stats.recentTransactions.map(transaction => `
                <div class="transaction-item">
                  <div class="transaction-icon ${transaction.type}">
                    ${this.getCategoryIcon(transaction.category)}
                  </div>
                  <div class="transaction-details">
                    <div class="transaction-title">${transaction.description || 'Sem descrição'}</div>
                    <div class="transaction-meta">
                      ${transaction.category || 'Sem categoria'} • ${this.formatDate(transaction.date)}
                    </div>
                  </div>
                  <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${this.formatCurrency(transaction.amount)}
                  </div>
                </div>
              `).join('') :
              '<div class="no-data">Nenhuma transação registrada</div>'
            }
          </div>
        </div>

        <!-- Ações rápidas -->
        <div class="quick-actions">
          <h2 class="section-title">Ações Rápidas</h2>
          <div class="actions-grid">
            <button class="btn btn-primary btn-sm" onclick="window.location.hash='#/transactions?action=add'">
              ➕ Nova Transação
            </button>
            <button class="btn btn-outline btn-sm" onclick="window.location.hash='#/categories'">
              📂 Categorias
            </button>
            <button class="btn btn-outline btn-sm" onclick="window.location.hash='#/analytics'">
              📊 Análises
            </button>
            <button class="btn btn-outline btn-sm" onclick="this.showBudgetModal()">
              💰 Orçamento
            </button>
          </div>
        </div>

        <!-- Insights inteligentes -->
        <div class="insights-section">
          <h2 class="section-title">Insights</h2>
          <div class="insights-list">
            ${this.generateInsights()}
          </div>
        </div>
      </div>
    `;
  }

  generateInsights() {
    const insights = [];
    
    // Insight sobre saldo
    if (this.stats.balance < 0) {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Saldo Negativo',
        message: 'Seu saldo está negativo. Considere revisar seus gastos.'
      });
    } else if (this.stats.balance > 0) {
      insights.push({
        type: 'success',
        icon: '✅',
        title: 'Saldo Positivo',
        message: 'Parabéns! Você está com saldo positivo este mês.'
      });
    }

    // Insight sobre orçamento
    if (this.stats.currentBudget && this.stats.expenses > 0) {
      const budgetUsage = (this.stats.expenses / this.stats.currentBudget.amount) * 100;
      if (budgetUsage > 90) {
        insights.push({
          type: 'warning',
          icon: '🚨',
          title: 'Orçamento Quase Esgotado',
          message: `Você já gastou ${budgetUsage.toFixed(0)}% do seu orçamento mensal.`
        });
      } else if (budgetUsage < 50) {
        insights.push({
          type: 'info',
          icon: '💡',
          title: 'Bom Controle',
          message: `Você gastou apenas ${budgetUsage.toFixed(0)}% do seu orçamento. Continue assim!`
        });
      }
    }

    // Insight sobre categorias
    if (this.stats.topCategories.length > 0) {
      const [topCategory, topAmount] = this.stats.topCategories[0];
      const percentage = (topAmount / this.stats.expenses) * 100;
      if (percentage > 50) {
        insights.push({
          type: 'info',
          icon: '📈',
          title: 'Categoria Principal',
          message: `${topCategory} representa ${percentage.toFixed(0)}% dos seus gastos.`
        });
      }
    }

    // Insight sobre transações
    if (this.stats.monthlyTransactions.length === 0) {
      insights.push({
        type: 'info',
        icon: '📝',
        title: 'Comece a Registrar',
        message: 'Registre suas primeiras transações para acompanhar suas finanças.'
      });
    }

    return insights.length > 0 ? 
      insights.map(insight => `
        <div class="insight-item ${insight.type}">
          <div class="insight-icon">${insight.icon}</div>
          <div class="insight-content">
            <div class="insight-title">${insight.title}</div>
            <div class="insight-message">${insight.message}</div>
          </div>
        </div>
      `).join('') :
      '<div class="no-data">Nenhum insight disponível no momento</div>';
  }

  getCategoryIcon(category) {
    const icons = {
      'Alimentação': '🍽️',
      'Transporte': '🚗',
      'Saúde': '🏥',
      'Educação': '📚',
      'Lazer': '🎮',
      'Casa': '🏠',
      'Roupas': '👕',
      'Outros': '📦'
    };
    return icons[category] || '📦';
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount || 0);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  }

  bindEvents() {
    // Atualizar dados a cada 30 segundos
    setInterval(() => {
      this.loadData().then(() => {
        this.calculateStats();
        this.render();
        this.bindEvents();
      });
    }, 30000);
  }

  showBudgetModal() {
    // Implementar modal de orçamento
    console.log('Abrir modal de orçamento');
  }
}

export function renderEnhancedDashboard(container) {
  const dashboard = new EnhancedDashboard();
  return dashboard;
}
