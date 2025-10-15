// Dashboard Drag and Drop functionality
export class DashboardDragDrop {
  constructor() {
    this.draggedElement = null;
    this.dragOverElement = null;
    this.cardOrder = this.loadCardOrder();
    this.init();
  }

  init() {
    this.setupDragAndDrop();
    this.setupExportButtons();
    this.setupResetButton();
  }

  setupDragAndDrop() {
    const cards = document.querySelectorAll('.draggable-card');

    cards.forEach(card => {
      card.draggable = true;

      card.addEventListener('dragstart', (e) => {
        this.draggedElement = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', card.outerHTML);
      });

      card.addEventListener('dragend', (_e) => {
        card.classList.remove('dragging');
        this.draggedElement = null;
        this.dragOverElement = null;

        // Remove drag-over class from all cards
        document.querySelectorAll('.draggable-card').forEach(c => {
          c.classList.remove('drag-over');
        });
      });

      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (this.draggedElement && this.draggedElement !== card) {
          this.dragOverElement = card;
          card.classList.add('drag-over');
        }
      });

      card.addEventListener('dragleave', (e) => {
        if (!card.contains(e.relatedTarget)) {
          card.classList.remove('drag-over');
        }
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');

        if (this.draggedElement && this.draggedElement !== card) {
          this.swapCards(this.draggedElement, card);
        }
      });
    });
  }

  swapCards(draggedCard, targetCard) {
    const parent = draggedCard.parentNode;
    const draggedIndex = Array.from(parent.children).indexOf(draggedCard);
    const targetIndex = Array.from(parent.children).indexOf(targetCard);

    if (draggedIndex < targetIndex) {
      parent.insertBefore(draggedCard, targetCard.nextSibling);
    } else {
      parent.insertBefore(draggedCard, targetCard);
    }

    this.saveCardOrder();
    this.showNotification('Layout atualizado!', 'success');
  }

  saveCardOrder() {
    const cards = document.querySelectorAll('.draggable-card');
    const order = Array.from(cards).map(card => card.dataset.cardType);
    localStorage.setItem('dashboard-card-order', JSON.stringify(order));
  }

  loadCardOrder() {
    const saved = localStorage.getItem('dashboard-card-order');
    return saved ? JSON.parse(saved) : [
      'progress',
      'metrics',
      'summary',
      'top-recorrentes',
      'categorias-inteligentes',
      'atividade-recente'
    ];
  }

  resetCardOrder() {
    localStorage.removeItem('dashboard-card-order');
    this.showNotification('Layout resetado!', 'info');
    // Recarregar a página para aplicar o layout padrão
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  setupResetButton() {
    const resetBtn = document.getElementById('reset-layout-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.showResetConfirmationModal();
      });
    }
  }

  showResetConfirmationModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
            <span class="text-2xl">⚠️</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Resetar Layout
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Esta ação irá reordenar os cards
            </p>
          </div>
        </div>
        
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <h4 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">O que acontecerá:</h4>
          <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• Todos os cards voltarão à posição original</li>
            <li>• Sua personalização atual será perdida</li>
            <li>• A página será recarregada automaticamente</li>
          </ul>
        </div>
        
        <div class="flex gap-3">
          <button id="confirm-reset" class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Sim, Resetar
          </button>
          <button id="cancel-reset" class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('#confirm-reset').addEventListener('click', () => {
      document.body.removeChild(modal);
      this.resetCardOrder();
    });

    modal.querySelector('#cancel-reset').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  setupExportButtons() {
    const exportBtn = document.getElementById('export-dashboard-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.showExportModal();
      });
    }
  }

  showExportModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <span class="text-2xl">📱</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Compartilhar Resumo
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Enviar resumo financeiro via WhatsApp
            </p>
          </div>
        </div>
        
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <h4 class="font-medium text-green-800 dark:text-green-200 mb-2">O que será compartilhado:</h4>
          <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• 📊 Progresso do orçamento (porcentagem e valores)</li>
            <li>• 💰 Métricas principais (receitas, despesas, saldo)</li>
            <li>• 📈 Resumo detalhado com metas diárias</li>
            <li>• 📅 Período e data de exportação</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            <span class="font-medium">💡 Dica:</span> O resumo será formatado de forma organizada e fácil de entender, perfeito para compartilhar com familiares ou para controle pessoal.
          </p>
        </div>
        
        <div class="flex gap-3">
          <button id="share-whatsapp" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <span>📱</span>
            Enviar para WhatsApp
          </button>
          <button id="close-export-modal" class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('#share-whatsapp').addEventListener('click', () => {
      document.body.removeChild(modal);
      this.shareToWhatsApp('Resumo');
    });

    modal.querySelector('#close-export-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }




  shareToWhatsApp(format = 'PDF') {
    this.showNotification('Preparando para compartilhar...', 'info');

    const data = this.gatherDashboardData();
    const message = this.generateWhatsAppMessage(data, format);

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // URL do WhatsApp Web/App
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    this.showNotification('WhatsApp aberto para compartilhamento!', 'success');
  }


  gatherDashboardData() {
    const now = new Date();
    const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const month = (window.appState && window.appState.selectedMonth) || (now.getMonth() + 1);
    const year = (window.appState && window.appState.selectedYear) || now.getFullYear();
    const monthName = monthNames[Math.max(0, Math.min(11, month - 1))] || '';

    // Obter dados do estado global da aplicação (mais confiável que DOM)
    // Dados removidos - não utilizados
    // const budgetData = window.currentBudgetData || {};
    // const financialData = window.currentFinancialData || {};
    
    // Extrair valores dos elementos mais confiáveis
    const progressData = this.extractProgressData();
    const budgetInfo = this.extractBudgetInfo();
    const dailyGoals = this.extractDailyGoals();
    const analysis = this.extractAnalysis();

    return {
      period: `${monthName}/${year}`,
      progress: progressData,
      budget: budgetInfo,
      dailyGoals: dailyGoals,
      analysis: analysis,
      exportDate: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  }

  extractProgressData() {
    const progressCard = document.querySelector('[data-card-type="progress"]');
    if (!progressCard) return { percentage: '0%', used: 'R$ 0,00', total: 'R$ 0,00' };

    const percentageEl = progressCard.querySelector('.text-lg.font-bold');
    const detailsEl = progressCard.querySelector('.text-xs.text-gray-600');

    const percentage = percentageEl ? percentageEl.textContent.trim() : '0%';
    const details = detailsEl ? detailsEl.textContent.trim() : 'R$ 0,00 de R$ 0,00';

    const [used, total] = details.split(' de ');

    return {
      percentage,
      used: used || 'R$ 0,00',
      total: total || 'R$ 0,00'
    };
  }

  extractMetricsData() {
    const metricsCards = document.querySelectorAll('[data-card-type="metrics"] .bg-white');
    const metrics = [];

    metricsCards.forEach(card => {
      const valueEl = card.querySelector('.text-lg.font-bold');
      const labelEl = card.querySelector('.text-xs.text-gray-600');

      if (valueEl && labelEl) {
        metrics.push({
          label: labelEl.textContent.trim(),
          value: valueEl.textContent.trim()
        });
      }
    });

    return metrics;
  }

  extractBudgetInfo() {
    let planned = 'R$ 0,00', income = 'R$ 0,00', expenses = 'R$ 0,00', balance = 'R$ 0,00';

    // Extrair das métricas compactas (Receitas, Despesas, Saldo)
    const metricsCards = document.querySelectorAll('[data-card-type="metrics"] .bg-white');
    metricsCards.forEach(card => {
      const valueEl = card.querySelector('.text-lg.font-bold');
      const labelEl = card.querySelector('.text-xs.text-gray-600');

      if (valueEl && labelEl) {
        const label = labelEl.textContent.trim().toLowerCase();
        const value = valueEl.textContent.trim();

        if (label.includes('receita')) {
          income = value;
        } else if (label.includes('despesa')) {
          expenses = value;
        } else if (label.includes('saldo')) {
          balance = value;
        }
      }
    });

    // Extrair orçamento do card de progresso
    const progressCard = document.querySelector('[data-card-type="progress"]');
    if (progressCard) {
      const detailsEl = progressCard.querySelector('.text-xs.text-gray-600');
      if (detailsEl) {
        const text = detailsEl.textContent.trim();
        // Formato: "R$ 3.082,79 de R$ 5.741,64"
        const match = text.match(/de\s*(R\$\s*[\d.,]+)/);
        if (match) {
          planned = match[1].trim();
        }
      }
    }

    return { planned, income, expenses, balance };
  }

  extractDailyGoals() {
    const summaryCard = document.querySelector('[data-card-type="summary"]');
    let budget = 'R$ 0,00/dia', fullIncome = 'R$ 0,00/dia', conservative = 'R$ 0,00/dia';

    if (summaryCard) {
      // Buscar todas as divs que contêm metas diárias usando uma abordagem mais específica
      const gradientDivs = summaryCard.querySelectorAll('.bg-gradient-to-r');
      
      for (let div of gradientDivs) {
        const text = div.textContent || div.innerText || '';
        
        // Meta Diária (Orçamento) - buscar span com classes específicas
        if (text.includes('Meta Diária (Orçamento)')) {
          const valueSpan = div.querySelector('span.font-bold.text-blue-600, span.font-bold.text-sm');
          if (valueSpan) {
            budget = valueSpan.textContent.trim();
          }
        }
        
        // Meta Diária (100% Receitas) - buscar span com classes específicas
        if (text.includes('Meta Diária (100% Receitas)')) {
          const valueSpan = div.querySelector('span.font-bold.text-green-600, span.font-bold.text-red-600, span.font-bold.text-sm');
          if (valueSpan) {
            fullIncome = valueSpan.textContent.trim();
          }
        }
        
        // Meta Diária (Conservadora) - buscar span com classes específicas
        if (text.includes('Meta Diária (Conservadora)')) {
          const valueSpan = div.querySelector('span.font-bold.text-yellow-600, span.font-bold.text-red-600, span.font-bold.text-sm');
          if (valueSpan) {
            conservative = valueSpan.textContent.trim();
          }
        }
      }

      // Se não encontrou nos gradientes, tentar uma busca mais geral
      if (budget === 'R$ 0,00/dia' && fullIncome === 'R$ 0,00/dia' && conservative === 'R$ 0,00/dia') {
        const allSpansWithBold = summaryCard.querySelectorAll('span[class*="font-bold"]');
        
        for (let span of allSpansWithBold) {
          const parentText = span.closest('.flex')?.textContent || span.parentElement?.textContent || '';
          const value = span.textContent.trim();
          
          if (parentText.includes('Meta Diária (Orçamento)') && value.includes('R$')) {
            budget = value;
          } else if (parentText.includes('Meta Diária (100% Receitas)') && value.includes('R$')) {
            fullIncome = value;
          } else if (parentText.includes('Meta Diária (Conservadora)') && value.includes('R$')) {
            conservative = value;
          }
        }
      }
    }

    return { budget, fullIncome, conservative };
  }

  extractAnalysis() {
    const summaryCard = document.querySelector('[data-card-type="summary"]');
    let hasAlerts = false, alerts = 0, coverage = '0', daysRemaining = '0', topCategory = null, status = 'positive';

    // Verificar alertas
    const alertsEl = summaryCard?.querySelector('#alertas-categorias-btn .font-bold');
    if (alertsEl && alertsEl.textContent.includes('categoria')) {
      hasAlerts = true;
      alerts = parseInt(alertsEl.textContent.match(/\d+/)?.[0] || '0');
      status = alerts > 3 ? 'critical' : 'warning';
    }

    // Calcular dias restantes no mês
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    daysRemaining = (lastDay - now.getDate()).toString();

    // Obter progresso para calcular cobertura
    const progressData = this.extractProgressData();
    const progressNum = parseFloat(progressData.percentage.replace('%', ''));
    coverage = Math.round(progressNum).toString();

    // Verificar status baseado no progresso
    if (progressNum > 90) {
      status = 'critical';
    } else if (progressNum > 70) {
      status = 'warning';
    }

    // Tentar obter categoria com maior gasto
    const topCategoriesCard = document.querySelector('[data-card-type="categorias-inteligentes"]');
    if (topCategoriesCard) {
      const firstCategory = topCategoriesCard.querySelector('.categoria-item .font-medium');
      if (firstCategory) {
        topCategory = firstCategory.textContent.trim();
      }
    }

    return { hasAlerts, alerts, coverage, daysRemaining, topCategory, status };
  }


  generateWhatsAppMessage(data, format = 'PDF') {
    let message = `📊 *RESUMO FINANCEIRO - ${data.period}*\n\n`;

    // Situação Atual do Orçamento
    message += '� *SITUAÇÃO ATUAL:*\n';
    message += `• Orçamento Total: ${data.budget.planned}\n`;
    message += `• Receitas: ${data.budget.income}\n`;
    message += `• Despesas: ${data.budget.expenses}\n`;
    message += `• Saldo Atual: ${data.budget.balance}\n`;
    message += `• Progresso: ${data.progress.percentage} do orçamento usado\n\n`;

    // Metas Diárias
    message += '🎯 *METAS DIÁRIAS:*\n';
    message += `• 💡 Meta Orçamento: ${data.dailyGoals.budget}\n`;
    message += `• 💰 Meta 100% Receitas: ${data.dailyGoals.fullIncome}\n`;
    message += `• ⚠️ Meta Conservadora: ${data.dailyGoals.conservative}\n\n`;

    // Análise Inteligente
    message += '📈 *ANÁLISE INTELIGENTE:*\n';
    if (data.analysis.hasAlerts) {
      message += `• 🚨 ${data.analysis.alerts} categoria(s) em alerta\n`;
    }
    message += `• 📊 Cobertura do Orçamento: ${data.analysis.coverage}%\n`;
    message += `• 🏃‍♀️ Dias restantes no mês: ${data.analysis.daysRemaining}\n`;
    
    if (data.analysis.topCategory) {
      message += `• 🔥 Maior gasto: ${data.analysis.topCategory}\n`;
    }
    message += '\n';

    // Status e Recomendação
    if (data.analysis.status === 'positive') {
      message += '✅ *STATUS: CONTROLADO*\n';
      message += '💡 Continue assim! Suas finanças estão bem organizadas.\n\n';
    } else if (data.analysis.status === 'warning') {
      message += '⚠️ *STATUS: ATENÇÃO*\n';
      message += '💡 Monitore os gastos para não ultrapassar o orçamento.\n\n';
    } else {
      message += '🔴 *STATUS: CRÍTICO*\n';
      message += '💡 Considere revisar seus gastos para equilibrar as finanças.\n\n';
    }

    message += `📅 Exportado em: ${data.exportDate}\n`;
    message += `� Via: ${format === 'Resumo' ? 'App Mobile/Web' : format}\n\n`;
    message += '---\n';
    message += '🚀 *Servo Tech - Controle Financeiro*\n';
    message += '💡 Gerado automaticamente pelo seu assistente financeiro';

    return message;
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
          'bg-blue-500'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  }
}

// Inicializar quando o DOM estiver pronto
export function initDashboardDragDrop() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new DashboardDragDrop();
    });
  } else {
    new DashboardDragDrop();
  }
}
