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
          📤 Exportar Resumo
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Escolha o formato do resumo:
        </p>
        <div class="space-y-3">
          <button id="select-pdf" class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <span>📄</span>
            PDF
          </button>
          <button id="select-excel" class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <span>📊</span>
            Excel
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
    modal.querySelector('#select-pdf').addEventListener('click', () => {
      document.body.removeChild(modal);
      this.showActionModal('PDF');
    });

    modal.querySelector('#select-excel').addEventListener('click', () => {
      document.body.removeChild(modal);
      this.showActionModal('Excel');
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

  showActionModal(format) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          📤 ${format} - Escolha a ação
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          O que deseja fazer com o arquivo ${format}?
        </p>
        <div class="space-y-3">
          <button id="download-file" class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <span>💾</span>
            Baixar Arquivo
          </button>
          <button id="share-whatsapp" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <span>📱</span>
            Enviar para WhatsApp
          </button>
        </div>
        <div class="mt-4 flex justify-end">
          <button id="close-action-modal" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            Voltar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('#download-file').addEventListener('click', () => {
      document.body.removeChild(modal);
      if (format === 'PDF') {
        this.exportToPDF();
      } else {
        this.exportToExcel();
      }
    });

    modal.querySelector('#share-whatsapp').addEventListener('click', () => {
      document.body.removeChild(modal);
      this.shareToWhatsApp(format);
    });

    modal.querySelector('#close-action-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
      this.showExportModal(); // Volta para o modal anterior
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
        this.showExportModal(); // Volta para o modal anterior
      }
    });
  }

  async exportToPDF() {
    this.showNotification('Gerando PDF...', 'info');
    
    try {
      // Carregar jsPDF via CDN
      if (typeof window.jsPDF === 'undefined') {
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      }
      
      const data = this.gatherDashboardData();
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Configurações
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = margin;
      
      // Cabeçalho
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('📊 RESUMO FINANCEIRO', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(data.period, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;
      
      // Linha separadora
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 15;
      
      // Progresso do Orçamento
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('📈 PROGRESSO DO ORÇAMENTO', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const progressLines = data.progress.split('\n');
      progressLines.forEach(line => {
        if (line.trim()) {
          doc.text(line.trim(), margin + 10, yPosition);
          yPosition += 7;
        }
      });
      yPosition += 10;
      
      // Métricas
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('💰 MÉTRICAS FINANCEIRAS', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      data.metrics.forEach(metric => {
        if (metric.trim()) {
          doc.text(`• ${metric.trim()}`, margin + 10, yPosition);
          yPosition += 7;
        }
      });
      yPosition += 10;
      
      // Resumo Financeiro
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('📊 RESUMO DETALHADO', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const summaryLines = data.summary.split('\n');
      summaryLines.forEach(line => {
        if (line.trim()) {
          doc.text(line.trim(), margin + 10, yPosition);
          yPosition += 7;
        }
      });
      yPosition += 15;
      
      // Rodapé
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(`Gerado em: ${data.exportDate}`, margin, yPosition);
      doc.text('Sistema de Controle Financeiro', pageWidth - margin, yPosition, { align: 'right' });
      
      // Salvar arquivo
      const fileName = `resumo-financeiro-${data.period.replace('/', '-')}.pdf`;
      doc.save(fileName);
      
      this.showNotification('PDF gerado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      this.showNotification('Erro ao gerar PDF', 'error');
    }
  }

  async exportToExcel() {
    this.showNotification('Gerando Excel...', 'info');
    
    try {
      // Carregar SheetJS via CDN
      if (typeof window.XLSX === 'undefined') {
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
      }
      
      const data = this.gatherDashboardData();
      const workbook = XLSX.utils.book_new();
      
      // Planilha 1: Resumo Executivo
      const resumoData = [
        ['📊 RESUMO FINANCEIRO', ''],
        ['Período', data.period],
        ['Data de Exportação', data.exportDate],
        [''],
        ['📈 PROGRESSO DO ORÇAMENTO', ''],
        ['Percentual', data.progress.percentage],
        ['Usado', data.progress.used],
        ['Total', data.progress.total],
        [''],
        ['💰 MÉTRICAS FINANCEIRAS', ''],
        ...data.metrics.map(metric => [metric.label, metric.value]),
        [''],
        ['📊 RESUMO DETALHADO', ''],
        ...data.summary.items.map(item => [item.label, item.value])
      ];
      
      const resumoSheet = XLSX.utils.aoa_to_sheet(resumoData);
      
      // Formatação da planilha
      resumoSheet['!cols'] = [
        { width: 30 },
        { width: 50 }
      ];
      
      XLSX.utils.book_append_sheet(workbook, resumoSheet, 'Resumo Executivo');
      
      // Planilha 2: Análise Detalhada
      const analiseData = [
        ['CATEGORIA', 'VALOR', 'TIPO', 'STATUS'],
        ...data.metrics.map(metric => [
          metric.label,
          metric.value,
          metric.label.includes('Receita') ? 'Receita' : 
          metric.label.includes('Despesa') ? 'Despesa' : 'Saldo',
          metric.label.includes('Receita') ? 'Positivo' : 
          metric.label.includes('Despesa') ? 'Negativo' : 'Neutro'
        ]),
        [''],
        ['MÉTRICAS DE PROGRESSO', '', '', ''],
        ['Progresso do Orçamento', data.progress.percentage, '%', 
         parseFloat(data.progress.percentage) > 70 ? 'Atenção' : 'Normal']
      ];
      
      const analiseSheet = XLSX.utils.aoa_to_sheet(analiseData);
      analiseSheet['!cols'] = [
        { width: 25 },
        { width: 15 },
        { width: 15 },
        { width: 15 }
      ];
      
      XLSX.utils.book_append_sheet(workbook, analiseSheet, 'Análise Detalhada');
      
      // Planilha 3: Metas Diárias
      const metasData = [
        ['META DIÁRIA', 'VALOR', 'TIPO', 'RECOMENDAÇÃO'],
        ...data.summary.items
          .filter(item => item.label.includes('Meta Diária'))
          .map(item => [
            item.label,
            item.value,
            item.label.includes('Orçamento') ? 'Conservadora' :
            item.label.includes('100%') ? 'Moderada' : 'Conservadora',
            item.label.includes('Orçamento') ? 'Baseada no orçamento total' :
            item.label.includes('100%') ? 'Baseada nas receitas atuais' : '80% das receitas atuais'
          ])
      ];
      
      const metasSheet = XLSX.utils.aoa_to_sheet(metasData);
      metasSheet['!cols'] = [
        { width: 25 },
        { width: 20 },
        { width: 15 },
        { width: 30 }
      ];
      
      XLSX.utils.book_append_sheet(workbook, metasSheet, 'Metas Diárias');
      
      // Salvar arquivo
      const fileName = `resumo-financeiro-${data.period.replace('/', '-')}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      this.showNotification('Excel gerado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao gerar Excel:', error);
      this.showNotification('Erro ao gerar Excel', 'error');
    }
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

  // Função para carregar scripts via CDN
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Funções auxiliares para extrair dados
  extractValue(text) {
    const match = text.match(/R\$\s*([\d.,]+)/);
    return match ? match[1] : '0,00';
  }

  extractPercentage(text) {
    const match = text.match(/(\d+\.?\d*)%/);
    return match ? parseFloat(match[1]) : 0;
  }

  extractMetaValue(text, type) {
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.includes(type)) {
        const match = line.match(/R\$\s*([\d.,]+)/);
        return match ? match[1] : '0,00';
      }
    }
    return '0,00';
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

  generatePDFContent(data) {
    let content = `RESUMO FINANCEIRO - ${data.period}\n`;
    content += `Exportado em: ${data.exportDate}\n\n`;
    
    // Progresso do Orçamento
    content += `PROGRESSO DO ORÇAMENTO:\n`;
    content += `• Percentual: ${data.progress.percentage}\n`;
    content += `• Usado: ${data.progress.used}\n`;
    content += `• Total: ${data.progress.total}\n\n`;
    
    // Métricas
    content += `MÉTRICAS FINANCEIRAS:\n`;
    data.metrics.forEach(metric => {
      content += `• ${metric.label}: ${metric.value}\n`;
    });
    content += `\n`;
    
    // Resumo Financeiro
    content += `RESUMO DETALHADO:\n`;
    data.summary.items.forEach(item => {
      content += `• ${item.label}: ${item.value}\n`;
    });
    content += `\n`;
    
    content += `---\n`;
    content += `Gerado pelo Sistema de Controle Financeiro`;
    
    return content;
  }

  generateCSVContent(data) {
    const lines = [
      'Categoria,Valor,Descrição',
      `Período,${data.period},Resumo Financeiro`,
      `Data Exportação,${data.exportDate},`,
      '',
      'PROGRESSO DO ORÇAMENTO',
      `Percentual,${data.progress.percentage},Progresso do orçamento`,
      `Usado,${data.progress.used},Valor gasto`,
      `Total,${data.progress.total},Orçamento total`,
      '',
      'MÉTRICAS FINANCEIRAS'
    ];
    
    // Adicionar métricas
    data.metrics.forEach(metric => {
      lines.push(`${metric.label},${metric.value},Métrica financeira`);
    });
    
    lines.push('');
    lines.push('RESUMO DETALHADO');
    
    // Adicionar itens do resumo
    data.summary.items.forEach(item => {
      lines.push(`${item.label},${item.value},Item do resumo`);
    });
    
    return lines.join('\n');
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
