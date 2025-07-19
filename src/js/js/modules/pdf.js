/**
 * Módulo de Exportação PDF
 * Gerencia exportação de relatórios para PDF
 */

class PDFModule {
  constructor() {
    this.jsPDF = null;
    this.init();
  }

  init() {
    console.log('📄 Inicializando módulo de exportação PDF...');
    this.loadJsPDF();
  }

  loadJsPDF() {
    // Verificar se jsPDF já está carregado
    if (typeof window.jsPDF === 'undefined') {
      console.warn('⚠️ jsPDF não encontrado. Carregando...');
      this.loadJsPDFScript();
    } else {
      console.log('✅ jsPDF já carregado');
      this.jsPDF = window.jsPDF;
    }
  }

  loadJsPDFScript() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => {
      console.log('✅ jsPDF carregado com sucesso');
      this.jsPDF = window.jsPDF;
    };
    script.onerror = () => {
      console.error('❌ Erro ao carregar jsPDF');
    };
    document.head.appendChild(script);
  }

  async exportToPDF() {
    if (!this.jsPDF) {
      console.error('❌ jsPDF não está disponível');
      if (window.NotificationManager) {
        window.NotificationManager.showNotification({
          type: 'error',
          title: 'Erro na exportação',
          message: 'Biblioteca PDF não está disponível',
          duration: 3000,
        });
      }
      return;
    }

    try {
      console.log('📄 Iniciando exportação PDF...');

      // Criar documento PDF
      const { jsPDF } = this.jsPDF;
      const doc = new jsPDF();

      // Configurar fonte e tamanho
      doc.setFont('helvetica');
      doc.setFontSize(20);

      // Título do relatório
      doc.text('Relatório Financeiro', 105, 20, { align: 'center' });

      // Data do relatório
      doc.setFontSize(12);
      const currentDate = new Date().toLocaleDateString('pt-BR');
      doc.text(`Data: ${currentDate}`, 20, 35);

      // Resumo financeiro
      doc.setFontSize(16);
      doc.text('Resumo Financeiro', 20, 50);

      doc.setFontSize(12);
      const totalIncome = document.getElementById('totalIncome')?.textContent || 'R$ 0,00';
      const totalExpense = document.getElementById('totalExpense')?.textContent || 'R$ 0,00';
      const totalBudget = document.getElementById('totalBudget')?.textContent || 'R$ 0,00';
      const budgetRemaining = document.getElementById('budgetRemaining')?.textContent || 'R$ 0,00';

      doc.text(`Receita Total: ${totalIncome}`, 20, 65);
      doc.text(`Despesa Total: ${totalExpense}`, 20, 75);
      doc.text(`Saldo Atual: ${totalBudget}`, 20, 85);
      doc.text(`Orçamento Restante: ${budgetRemaining}`, 20, 95);

      // Transações recentes
      doc.setFontSize(16);
      doc.text('Transações Recentes', 20, 115);

      doc.setFontSize(10);
      const transactions = this.getTransactionsData();
      let yPosition = 125;

      transactions.forEach((transaction, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        const color = transaction.type === 'income' ? '#10b981' : '#ef4444';
        doc.setTextColor(color);
        doc.text(`${transaction.date} - ${transaction.title}`, 20, yPosition);
        doc.text(transaction.amount, 150, yPosition);
        doc.text(transaction.category, 180, yPosition);

        yPosition += 8;
      });

      // Categorias
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor('#000000');
      doc.text('Categorias', 20, 20);

      doc.setFontSize(10);
      const categories = this.getCategoriesData();
      yPosition = 35;

      categories.forEach((category, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        doc.text(category.name, 20, yPosition);
        doc.text(category.limit, 80, yPosition);
        doc.text(category.balance, 120, yPosition);
        doc.text(category.percentage, 160, yPosition);

        yPosition += 8;
      });

      // Metas
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Metas', 20, 20);

      doc.setFontSize(10);
      const goals = this.getGoalsData();
      yPosition = 35;

      goals.forEach((goal, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        doc.text(goal.title, 20, yPosition);
        doc.text(goal.target, 80, yPosition);
        doc.text(goal.current, 120, yPosition);
        doc.text(goal.progress, 160, yPosition);

        yPosition += 8;
      });

      // Salvar PDF
      const fileName = `relatorio_financeiro_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

      console.log('✅ PDF exportado com sucesso');

      if (window.NotificationManager) {
        window.NotificationManager.showNotification({
          type: 'success',
          title: 'PDF Exportado!',
          message: 'Relatório salvo com sucesso',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('❌ Erro ao exportar PDF:', error);

      if (window.NotificationManager) {
        window.NotificationManager.showNotification({
          type: 'error',
          title: 'Erro na exportação',
          message: 'Não foi possível gerar o PDF',
          duration: 3000,
        });
      }
    }
  }

  getTransactionsData() {
    const transactions = [];
    const transactionItems = document.querySelectorAll('.transaction-item');

    transactionItems.forEach((item) => {
      const title = item.querySelector('.transaction-title')?.textContent || '';
      const amount = item.querySelector('.transaction-amount')?.textContent || '';
      const category = item.querySelector('.transaction-category')?.textContent || '';
      const date = item.querySelector('.transaction-date')?.textContent || '';
      const type = item.querySelector('.transaction-amount')?.classList.contains('income')
        ? 'income'
        : 'expense';

      transactions.push({
        title: title.trim(),
        amount: amount.trim(),
        category: category.trim(),
        date: date.trim(),
        type: type,
      });
    });

    return transactions.slice(0, 20); // Limitar a 20 transações
  }

  getCategoriesData() {
    const categories = [];
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach((item) => {
      const name = item.querySelector('.category-details h4')?.textContent || '';
      const limit = item.querySelector('.category-limit')?.textContent || '';
      const balance = item.querySelector('.budget-stats .balance')?.textContent || '';
      const percentage = item.querySelector('.budget-stats .percentage')?.textContent || '';

      categories.push({
        name: name.trim(),
        limit: limit.trim(),
        balance: balance.trim(),
        percentage: percentage.trim(),
      });
    });

    return categories;
  }

  getGoalsData() {
    const goals = [];
    const goalItems = document.querySelectorAll('.goal-item');

    goalItems.forEach((item) => {
      const title = item.querySelector('.goal-title')?.textContent || '';
      const target = item.querySelector('.goal-target')?.textContent || '';
      const current = item.querySelector('.goal-current')?.textContent || '';
      const progress = item.querySelector('.goal-progress')?.textContent || '';

      goals.push({
        title: title.trim(),
        target: target.trim(),
        current: current.trim(),
        progress: progress.trim(),
      });
    });

    return goals;
  }

  // Método estático para compatibilidade
  static init() {
    if (!window.pdfModule) {
      window.pdfModule = new PDFModule();
    }
    return window.pdfModule;
  }

  static exportToPDF() {
    if (window.pdfModule) {
      window.pdfModule.exportToPDF();
    }
  }
}

// Criar instância global
window.PDFModule = PDFModule;
window.pdfModule = new PDFModule();

// Função global para compatibilidade
window.exportToPDF = () => {
  if (window.pdfModule) {
    window.pdfModule.exportToPDF();
  }
};

console.log('✅ Módulo de exportação PDF carregado');
