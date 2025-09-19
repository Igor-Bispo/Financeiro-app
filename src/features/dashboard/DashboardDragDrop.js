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

      card.addEventListener('dragend', (e) => {
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
        this.resetCardOrder();
      });
    }
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
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          📤 Compartilhar Resumo
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Compartilhar resumo financeiro via WhatsApp:
        </p>
        <div class="space-y-3">
          <button id="share-whatsapp" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <span>📱</span>
            Enviar para WhatsApp
          </button>
        </div>
        <div class="mt-4 flex justify-end">
          <button id="close-export-modal" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
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

    // Extrair dados estruturados do dashboard
    const progressData = this.extractProgressData();
    const metricsData = this.extractMetricsData();
    const summaryData = this.extractSummaryData();
    
    return {
      period: `${monthName}/${year}`,
      progress: progressData,
      metrics: metricsData,
      summary: summaryData,
      exportDate: new Date().toLocaleString('pt-BR')
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

  extractSummaryData() {
    const summaryCard = document.querySelector('[data-card-type="summary"]');
    if (!summaryCard) return { items: [] };

    const items = [];
    const lines = summaryCard.querySelectorAll('.flex.justify-between.text-xs');
    
    lines.forEach(line => {
      const labelEl = line.querySelector('span:first-child');
      const valueEl = line.querySelector('span:last-child');
      
      if (labelEl && valueEl) {
        items.push({
          label: labelEl.textContent.trim(),
          value: valueEl.textContent.trim()
        });
      }
    });
    
    return { items };
  }


  generateWhatsAppMessage(data, format = 'PDF') {
    let message = `📊 *RESUMO FINANCEIRO - ${data.period}*\n\n`;
    
    // Progresso do Orçamento
    message += `📈 *Progresso do Orçamento:*\n`;
    message += `• ${data.progress.percentage} (${data.progress.used} de ${data.progress.total})\n\n`;
    
    // Métricas
    message += `💰 *Métricas:*\n`;
    data.metrics.forEach(metric => {
      message += `• ${metric.label}: ${metric.value}\n`;
    });
    message += `\n`;
    
    // Resumo
    message += `📊 *Resumo Detalhado:*\n`;
    data.summary.items.forEach(item => {
      message += `• ${item.label}: ${item.value}\n`;
    });
    message += `\n`;
    
    message += `📅 Exportado em: ${data.exportDate}\n`;
    message += `📄 Formato: ${format}\n\n`;
    message += `---\n`;
    message += `💡 Gerado pelo Sistema de Controle Financeiro`;
    
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
