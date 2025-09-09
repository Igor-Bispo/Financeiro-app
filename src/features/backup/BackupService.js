﻿// features/backup/BackupService.js
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
        eventBus.emit('backup:error', 'Arquivo de backup invÃ¡lido');
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

// FunÃ§Ãµes de exportaÃ§Ã£o (migradas do app.js)
export function downloadBackup() {
  try {
    // Verificar se hÃ¡ dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponÃ­vel para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponÃ­vel para exportar.');
      }
      return;
    }

    // Baixa um JSON com todos os dados do usuÃ¡rio
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
        message: 'âœ… Backup JSON exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('âŒ Erro ao exportar backup:', error);
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
    // Carregar XLSX sob demanda, se necessÃ¡rio
    if (typeof window.XLSX === 'undefined') {
      await import('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');
    }

    // Verificar se hÃ¡ dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponÃ­vel para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponÃ­vel para exportar.');
      }
      return;
    }

    // Gera planilha Excel com transaÃ§Ãµes, categorias e orÃ§amentos
    const wb = window.XLSX.utils.book_new();

    // TransaÃ§Ãµes
    const transacoes = window.appState.transactions.map(t => ({
      DescriÃ§Ã£o: t.descricao,
      Valor: t.valor,
      Tipo: t.tipo,
      Categoria: window.appState.categories.find(c => c.id === t.categoriaId)?.nome || '',
      Data: t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : ''
    }));
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(transacoes), 'TransaÃ§Ãµes');

    // Categorias
    const categorias = window.appState.categories.map(c => ({
      Nome: c.nome,
      Tipo: c.tipo,
      Limite: c.limite,
      Cor: c.cor
    }));
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(categorias), 'Categorias');

    // OrÃ§amentos
    const orcamentos = window.appState.budgets.map(b => ({
      Nome: b.nome,
      DescriÃ§Ã£o: b.descricao,
      ID: b.id
    }));
    window.XLSX.utils.book_append_sheet(wb, window.XLSX.utils.json_to_sheet(orcamentos), 'OrÃ§amentos');

    window.XLSX.writeFile(wb, 'financeiro-dados.xlsx');

    if (window.Snackbar) {
      window.Snackbar({
        message: 'âœ… Arquivo Excel exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('âŒ Erro ao exportar Excel:', error);
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
    // Carregar jsPDF sob demanda, se necessÃ¡rio
    if (typeof window.jspdf === 'undefined') {
      await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }

    // Verificar se hÃ¡ dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponÃ­vel para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponÃ­vel para exportar.');
      }
      return;
    }

    // Gera PDF com resumo das transaÃ§Ãµes, categorias e orÃ§amentos
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // CabeÃ§alho
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('ðŸ“Š RelatÃ³rio Financeiro', 10, y);
    y += 15;

    // InformaÃ§Ãµes do orÃ§amento atual
    const currentBudget = window.appState.currentBudget;
    if (currentBudget) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`OrÃ§amento: ${currentBudget.nome}`, 10, y);
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

    // TransaÃ§Ãµes recentes
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TransaÃ§Ãµes Recentes:', 10, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    window.appState.transactions
      .sort((a, b) => new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt))
      .slice(0, 15)
      .forEach(t => {
        const categoria = window.appState.categories.find(c => c.id === t.categoriaId)?.nome || 'Sem categoria';
        const data = t.createdAt?.toDate?.() ? t.createdAt.toDate().toLocaleDateString() : 'Data nÃ£o disponÃ­vel';
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
        message: 'âœ… RelatÃ³rio PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('âŒ Erro ao exportar PDF:', error);
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
    // Verificar se a biblioteca jsPDF estÃ¡ disponÃ­vel
    if (typeof window.jspdf === 'undefined') {
      console.error('âŒ Biblioteca jsPDF nÃ£o estÃ¡ disponÃ­vel');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca jsPDF nÃ£o estÃ¡ carregada. Tente recarregar a pÃ¡gina.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca jsPDF nÃ£o estÃ¡ carregada. Tente recarregar a pÃ¡gina.');
      }
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // FunÃ§Ã£o para adicionar texto com quebra de linha
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

    // CabeÃ§alho
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Controle Financeiro', 20, 25);
    doc.setFontSize(14);
    doc.text('Guia Completo de Uso', 20, 35);
    y = 50;

    // ConteÃºdo do guia
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    y = addText('ðŸŽ¯ Como Usar o Aplicativo', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('1. FaÃ§a login com sua conta Google', 25, y);
    y = addText('2. Crie categorias para organizar suas despesas e receitas', 25, y);
    y = addText('3. Adicione transaÃ§Ãµes usando o botÃ£o + ou comandos de voz', 25, y);
    y = addText('4. Configure despesas recorrentes para pagamentos fixos', 25, y);
    y = addText('5. Monitore seu saldo e gastos no dashboard', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('ðŸŽ¤ Comandos de Voz DisponÃ­veis', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('â€¢ "gastei 50 reais no supermercado em alimentaÃ§Ã£o"', 25, y);
    y = addText('â€¢ "recebi 2000 de salÃ¡rio em rendimentos"', 25, y);
    y = addText('â€¢ "criar categoria alimentaÃ§Ã£o despesa 500"', 25, y);
    y = addText('â€¢ "qual meu saldo"', 25, y);
    y = addText('â€¢ "mostrar transaÃ§Ãµes"', 25, y);
    y += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  y = addText('ðŸ“Š Funcionalidades Principais', 20, y);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  y = addText('â€¢ Dashboard com resumo financeiro', 25, y);
  y = addText('â€¢ GestÃ£o de transaÃ§Ãµes e categorias', 25, y);
  y = addText('â€¢ Sistema de despesas recorrentes', 25, y);
  y = addText('â€¢ Alertas de limite de categoria', 25, y);
  y = addText('â€¢ Backup e exportaÃ§Ã£o de dados', 25, y);
  y = addText('â€¢ Interface responsiva para mobile', 25, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  y = addText('ðŸ’¾ Backup e ExportaÃ§Ã£o', 20, y);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  y = addText('â€¢ ExportaÃ§Ã£o em JSON para backup completo', 25, y);
  y = addText('â€¢ ExportaÃ§Ã£o em Excel para relatÃ³rios', 25, y);
  y = addText('â€¢ ExportaÃ§Ã£o em PDF para documentaÃ§Ã£o', 25, y);
  y = addText('â€¢ RestauraÃ§Ã£o de dados de backup', 25, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  y = addText('ðŸ”§ Suporte e Contato', 20, y);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  y = addText('Para dÃºvidas ou problemas:', 25, y);
  y = addText('â€¢ Verifique os logs do console (F12)', 30, y);
  y = addText('â€¢ Teste em diferentes navegadores', 30, y);
  y = addText('â€¢ Consulte a documentaÃ§Ã£o tÃ©cnica', 30, y);
  // Garantir leitura de y para satisfazer o linter (no-unused-vars)
  if (y) { /* noop: posiÃ§Ã£o final Y */ }

    doc.save('guia-servo-tech-financas.pdf');

    if (window.Snackbar) {
      window.Snackbar({
        message: 'âœ… Guia PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('âŒ Erro ao exportar guia PDF:', error);
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
  console.log('ðŸ” showExportOptions chamada');
  import('@ui/index.js').then(({ Modal }) => {
    Modal({
      title: 'ðŸ“¤ OpÃ§Ãµes de ExportaÃ§Ã£o',
      content: `
        <div class="space-y-4">
          <button onclick="window.downloadBackup && window.downloadBackup()" class="w-full u-btn u-btn--primary">
            <span class="icon-standard">ðŸ’¾</span>
            Backup JSON Completo
          </button>
          <button onclick="window.exportToExcel && window.exportToExcel()" class="w-full u-btn u-btn--outline">
            <span class="icon-standard">ðŸ“Š</span>
            Exportar para Excel
          </button>
          <button onclick="window.exportToPDF && window.exportToPDF()" class="w-full u-btn u-btn--outline">
            <span class="icon-standard">ðŸ“„</span>
            Exportar para PDF
          </button>
          <button onclick="window.exportReadmePDF && window.exportReadmePDF()" class="w-full u-btn u-btn--outline">
            <span class="icon-standard">ðŸ“–</span>
            Guia de Uso (PDF)
          </button>
        </div>
      `
    });
  }).catch(() => {
    // fallback simples
    alert('Abra as opÃ§Ãµes de exportaÃ§Ã£o nas configuraÃ§Ãµes.');
  });
}
