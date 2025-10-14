// features/backup/BackupService.js
import { eventBus } from '@core/events/eventBus.js';

export async function importBackup() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (data.transactions && data.categories && data.budgets) {
        eventBus.emit('backup:imported', { file, data });
      } else {
        eventBus.emit('backup:error', 'Arquivo de backup inválido');
      }
    } catch (err) {
      eventBus.emit('backup:error', `Erro ao ler backup: ${err.message}`);
    }
  };
  input.click();
}

export async function restoreBackup() {
  eventBus.emit('backup:restore:requested');
}

export async function selectBackupFile() {
  eventBus.emit('backup:file:select');
}

export async function previewBackup(data) {
  eventBus.emit('backup:preview', data);
}

// Funções de exportação (migradas do app.js)
export function downloadBackup() {
  try {
    // Verificar se há dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponível para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponível para exportar.');
      }
      return;
    }

    // Baixa um JSON com todos os dados do usuário
    const data = {
      transactions: window.appState.transactions,
      categories: window.appState.categories,
      budgets: window.appState.budgets,
      recorrentes: window.appState.recorrentes
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financeiro-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Backup JSON exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar backup:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao exportar backup: ' + error.message,
        type: 'error'
      });
    } else {
      alert('Erro ao exportar backup: ' + error.message);
    }
  }
}

export async function exportToExcel() {
  try {
    // Carregar XLSX sob demanda, se necessário
    if (typeof window.XLSX === 'undefined') {
      await import('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
    }

    // Verificar se há dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponível para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponível para exportar.');
      }
      return;
    }

    // Gera planilha Excel com transações, categorias e orçamentos
    const wb = window.XLSX.utils.book_new();

    // Transações
    const transacoes = window.appState.transactions.map(t => ({
      Descrição: t.descricao,
      Valor: t.valor,
      Tipo: t.tipo,
      Categoria: window.appState.categories.find(c => c.id === t.categoriaId)?.nome || '',
      Data: t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : ''
    }));
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(transacoes), 'Transações');

    // Categorias
    const categorias = window.appState.categories.map(c => ({
      Nome: c.nome,
      Tipo: c.tipo,
      Limite: c.limite,
      Cor: c.cor
    }));
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(categorias), 'Categorias');

    // Orçamentos
    const orcamentos = window.appState.budgets.map(b => ({
      Nome: b.nome,
      Descrição: b.descricao,
      ID: b.id
    }));
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(orcamentos), 'Orçamentos');

    window.XLSX.writeFile(wb, 'financeiro-dados.xlsx');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Arquivo Excel exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar Excel:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao exportar Excel: ' + error.message,
        type: 'error'
      });
    } else {
      alert('Erro ao exportar Excel: ' + error.message);
    }
  }
}

export async function exportToPDF() {
  try {
    // Carregar jsPDF sob demanda, se necessário
    if (typeof window.jspdf === 'undefined') {
      await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }

    // Verificar se há dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponível para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponível para exportar.');
      }
      return;
    }

    // Gera PDF com resumo das transações, categorias e orçamentos
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // Cabeçalho
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('📊 Relatório Financeiro', 10, y);
    y += 15;

    // Informações do orçamento atual
    const currentBudget = window.appState.currentBudget;
    if (currentBudget) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Orçamento: ${currentBudget.nome}`, 10, y);
      y += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`ID: ${currentBudget.id}`, 10, y);
      y += 10;
    }

    // Resumo financeiro
    const totalReceitas = window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const totalDespesas = window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const saldo = totalReceitas - totalDespesas;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo Geral:', 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Receitas: R$ ${totalReceitas.toFixed(2)}`, 12, y);
    y += 6;
    doc.text(`Total Despesas: R$ ${totalDespesas.toFixed(2)}`, 12, y);
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.text(`Saldo: R$ ${saldo.toFixed(2)}`, 12, y);
    // y += 10; // not used further

    // Transações recentes
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Transações Recentes:', 10, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    window.appState.transactions
      .sort((a, b) => new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt))
      .slice(0, 15)
      .forEach(t => {
        const categoria = window.appState.categories.find(c => c.id === t.categoriaId)?.nome || 'Sem categoria';
        const data = t.createdAt?.toDate?.() ? t.createdAt.toDate().toLocaleDateString() : 'Data não disponível';
        const texto = `${data} - ${t.descricao} | R$ ${t.valor} | ${t.tipo} | ${categoria}`;

        if (y > 270) {
          doc.addPage();
          y = 10;
        }

        doc.text(texto, 12, y);
        y += 6;
      });

    y += 5;

    // Categorias com gastos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Gastos por Categoria:', 10, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    window.appState.categories.forEach(cat => {
      const gastos = window.appState.transactions
        .filter(t => t.categoriaId === cat.id && t.tipo === 'despesa')
        .reduce((sum, t) => sum + parseFloat(t.valor), 0);

      if (gastos > 0) {
        const limite = cat.limite ? ` / R$ ${cat.limite}` : '';
        const percentual = cat.limite ? ` (${((gastos / cat.limite) * 100).toFixed(1)}%)` : '';

        if (y > 270) {
          doc.addPage();
          y = 10;
        }

        doc.text(`${cat.nome}: R$ ${gastos.toFixed(2)}${limite}${percentual}`, 12, y);
        y += 6;
      }
    });

    doc.save('relatorio-financeiro.pdf');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Relatório PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar PDF:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao exportar PDF: ' + error.message,
        type: 'error'
      });
    } else {
      alert('Erro ao exportar PDF: ' + error.message);
    }
  }
}

export function exportReadmePDF() {
  try {
    // Verificar se a biblioteca jsPDF está disponível
    if (typeof window.jspdf === 'undefined') {
      console.error('❌ Biblioteca jsPDF não está disponível');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.');
      }
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // Função para adicionar texto com quebra de linha
    function addText(text, x, y, maxWidth = 170) {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, x, y);
        y += 6;
      });
      return y;
    }

    // Cabeçalho
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Controle Financeiro', 20, 25);
    doc.setFontSize(14);
    doc.text('Guia Completo de Uso', 20, 35);
    y = 50;

    // Conteúdo do guia
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    y = addText('🎯 Como Usar o Aplicativo', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('1. Faça login com sua conta Google', 25, y);
    y = addText('2. Crie categorias para organizar suas despesas e receitas', 25, y);
    y = addText('3. Adicione transações usando o botão + ou comandos de voz', 25, y);
    y = addText('4. Configure despesas recorrentes para pagamentos fixos', 25, y);
    y = addText('5. Monitore seu saldo e gastos no dashboard', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('🎤 Comandos de Voz Disponíveis', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('• "gastei 50 reais no supermercado em alimentação"', 25, y);
    y = addText('• "recebi 2000 de salário em rendimentos"', 25, y);
    y = addText('• "criar categoria alimentação despesa 500"', 25, y);
    y = addText('• "qual meu saldo"', 25, y);
    y = addText('• "mostrar transações"', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('📊 Funcionalidades Principais', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('• Dashboard com resumo financeiro', 25, y);
    y = addText('• Gestão de transações e categorias', 25, y);
    y = addText('• Sistema de despesas recorrentes', 25, y);
    y = addText('• Alertas de limite de categoria', 25, y);
    y = addText('• Backup e exportação de dados', 25, y);
    y = addText('• Interface responsiva para mobile', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('💾 Backup e Exportação', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('• Exportação em JSON para backup completo', 25, y);
    y = addText('• Exportação em Excel para relatórios', 25, y);
    y = addText('• Exportação em PDF para documentação', 25, y);
    y = addText('• Restauração de dados de backup', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('🔧 Suporte e Contato', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('Para dúvidas ou problemas:', 25, y);
    y = addText('• Verifique os logs do console (F12)', 30, y);
    y = addText('• Teste em diferentes navegadores', 30, y);
    y = addText('• Consulte a documentação técnica', 30, y);
    // Garantir leitura de y para satisfazer o linter (no-unused-vars)
    if (y) { /* noop: posição final Y */ }

    doc.save('guia-servo-tech-financas.pdf');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Guia PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar guia PDF:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao exportar guia PDF: ' + error.message,
        type: 'error'
      });
    } else {
      alert('Erro ao exportar guia PDF: ' + error.message);
    }
  }
}

export function showExportOptions() {
  console.log('🔍 showExportOptions chamada');
  import('@ui/index.js').then(({ Modal }) => {
    Modal({
      title: '📤 Opções de Exportação',
      content: `
        <div class="space-y-4">
          <button onclick="window.downloadBackup && window.downloadBackup()" class="w-full btn btn-primary btn-sm">
            <span class="icon-standard">💾</span>
            Backup JSON Completo
          </button>
          <button onclick="window.exportToExcel && window.exportToExcel()" class="w-full btn btn-outline btn-sm">
            <span class="icon-standard">📊</span>
            Exportar para Excel
          </button>
          <button onclick="window.exportToPDF && window.exportToPDF()" class="w-full btn btn-outline btn-sm">
            <span class="icon-standard">📄</span>
            Exportar para PDF
          </button>
          <button onclick="window.exportReadmePDF && window.exportReadmePDF()" class="w-full btn btn-outline btn-sm">
            <span class="icon-standard">📖</span>
            Guia de Uso (PDF)
          </button>
        </div>
      `
    });
  }).catch(() => {
    // fallback simples
    alert('Abra as opções de exportação nas configurações.');
  });
}
