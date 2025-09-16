// Dashboard personalizável inspirado no Mobills
export class MobillsDashboard {
  constructor() {
    this.widgets = [];
    this.customizeMode = false;
    this.draggedWidget = null;
    this.init();
  }

  init() {
    this.loadWidgets();
    this.render();
    this.bindEvents();
  }

  loadWidgets() {
    // Widgets padrão
    this.widgets = [
      {
        id: 'balance',
        type: 'balance',
        title: 'Saldo Atual',
        value: 'R$ 2.450,00',
        position: 0
      },
      {
        id: 'recent-transactions',
        type: 'transactions',
        title: 'Transações Recentes',
        position: 1
      },
      {
        id: 'chart',
        type: 'chart',
        title: 'Gráfico de Gastos',
        position: 2
      }
    ];
  }

  render() {
    const container = document.getElementById('app-content');
    if (!container) return;

    container.innerHTML = `
      <div class="mobills-dashboard">
        <div class="mobills-dashboard-header">
          <h1 class="mobills-dashboard-title">Dashboard</h1>
          <button class="mobills-customize-btn" id="customize-btn">
            ${this.customizeMode ? 'Concluir' : 'Personalizar'}
          </button>
        </div>
        
        <div class="mobills-widgets-grid" id="widgets-grid">
          ${this.widgets.map(widget => this.renderWidget(widget)).join('')}
        </div>
        
        <div class="mobills-quick-actions">
          <a href="#/transactions" class="mobills-quick-action">
            <div class="mobills-quick-action-icon">+</div>
            <h3 class="mobills-quick-action-title">Nova Transação</h3>
          </a>
          <a href="#/categories" class="mobills-quick-action">
            <div class="mobills-quick-action-icon">📁</div>
            <h3 class="mobills-quick-action-title">Categorias</h3>
          </a>
          <a href="#/analytics" class="mobills-quick-action">
            <div class="mobills-quick-action-icon">📊</div>
            <h3 class="mobills-quick-action-title">Relatórios</h3>
          </a>
        </div>
      </div>
    `;
  }

  renderWidget(widget) {
    switch (widget.type) {
      case 'balance':
        return `
          <div class="mobills-widget mobills-balance-widget" data-widget-id="${widget.id}">
            <button class="mobills-widget-remove" onclick="mobillsDashboard.removeWidget('${widget.id}')">×</button>
            <div class="mobills-widget-title">${widget.title}</div>
            <div class="mobills-widget-value">${widget.value}</div>
          </div>
        `;
      
      case 'transactions':
        return `
          <div class="mobills-widget mobills-transactions-widget" data-widget-id="${widget.id}">
            <button class="mobills-widget-remove" onclick="mobillsDashboard.removeWidget('${widget.id}')">×</button>
            <div class="mobills-widget-title">${widget.title}</div>
            <div class="mobills-transaction-item">
              <div class="mobills-transaction-info">
                <div class="mobills-transaction-icon income">💰</div>
                <div class="mobills-transaction-details">
                  <h4>Salário</h4>
                  <p>Hoje</p>
                </div>
              </div>
              <div class="mobills-transaction-amount income">+R$ 3.000,00</div>
            </div>
            <div class="mobills-transaction-item">
              <div class="mobills-transaction-info">
                <div class="mobills-transaction-icon expense">🛒</div>
                <div class="mobills-transaction-details">
                  <h4>Supermercado</h4>
                  <p>Ontem</p>
                </div>
              </div>
              <div class="mobills-transaction-amount expense">-R$ 150,00</div>
            </div>
            <div class="mobills-transaction-item">
              <div class="mobills-transaction-info">
                <div class="mobills-transaction-icon expense">⛽</div>
                <div class="mobills-transaction-details">
                  <h4>Combustível</h4>
                  <p>2 dias atrás</p>
                </div>
              </div>
              <div class="mobills-transaction-amount expense">-R$ 80,00</div>
            </div>
          </div>
        `;
      
      case 'chart':
        return `
          <div class="mobills-widget mobills-chart-widget" data-widget-id="${widget.id}">
            <button class="mobills-widget-remove" onclick="mobillsDashboard.removeWidget('${widget.id}')">×</button>
            <div class="mobills-widget-title">${widget.title}</div>
            <div class="mobills-chart-placeholder">
              📊 Gráfico de gastos por categoria
            </div>
          </div>
        `;
      
      default:
        return '';
    }
  }

  bindEvents() {
    // Botão de personalização
    const customizeBtn = document.getElementById('customize-btn');
    if (customizeBtn) {
      customizeBtn.addEventListener('click', () => this.toggleCustomizeMode());
    }

    // Drag and drop
    this.setupDragAndDrop();
  }

  toggleCustomizeMode() {
    this.customizeMode = !this.customizeMode;
    const dashboard = document.querySelector('.mobills-dashboard');
    
    if (this.customizeMode) {
      dashboard.classList.add('mobills-customize-mode');
    } else {
      dashboard.classList.remove('mobills-customize-mode');
    }
    
    this.render();
    this.bindEvents();
  }

  setupDragAndDrop() {
    const widgets = document.querySelectorAll('.mobills-widget');
    
    widgets.forEach(widget => {
      widget.draggable = this.customizeMode;
      
      widget.addEventListener('dragstart', (e) => {
        this.draggedWidget = widget;
        widget.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      
      widget.addEventListener('dragend', () => {
        widget.classList.remove('dragging');
        this.draggedWidget = null;
      });
      
      widget.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });
      
      widget.addEventListener('drop', (e) => {
        e.preventDefault();
        if (this.draggedWidget && this.draggedWidget !== widget) {
          this.swapWidgets(this.draggedWidget, widget);
        }
      });
    });
  }

  swapWidgets(widget1, widget2) {
    const id1 = widget1.dataset.widgetId;
    const id2 = widget2.dataset.widgetId;
    
    const index1 = this.widgets.findIndex(w => w.id === id1);
    const index2 = this.widgets.findIndex(w => w.id === id2);
    
    if (index1 !== -1 && index2 !== -1) {
      [this.widgets[index1], this.widgets[index2]] = [this.widgets[index2], this.widgets[index1]];
      this.render();
      this.bindEvents();
    }
  }

  removeWidget(widgetId) {
    this.widgets = this.widgets.filter(w => w.id !== widgetId);
    this.render();
    this.bindEvents();
  }

  addWidget(widget) {
    this.widgets.push(widget);
    this.render();
    this.bindEvents();
  }
}

// Instância global
let mobillsDashboard;

export function renderMobillsDashboard(container) {
  mobillsDashboard = new MobillsDashboard();
  return mobillsDashboard;
}

// Expor globalmente para uso nos widgets
if (typeof window !== 'undefined') {
  window.mobillsDashboard = mobillsDashboard;
}
