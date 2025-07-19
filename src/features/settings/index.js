import BudgetManager from './BudgetManager.js';

// Função para inicializar o módulo de configurações em um container
export function renderSettingsModule({ containerId = 'orcamento-config-container', orcamentos = [] } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = BudgetManager({ orcamentos });

  // Listeners para copiar ID
  container.querySelectorAll('.copy-orcamento-id-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      navigator.clipboard.writeText(id);
      btn.textContent = 'Copiado!';
      setTimeout(() => (btn.textContent = 'Copiar ID'), 1500);
      alert('ID copiado! Compartilhe este código com quem você deseja dar acesso ao orçamento.');
    });
  });
  // Listeners para selecionar orçamento
  container.querySelectorAll('.select-orcamento-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      window.ActiveBudgetId = id;
      alert('Orçamento selecionado!');
    });
  });
  // Listeners para criar/entrar orçamento
  container.querySelector('#btn-criar-orcamento').onclick = () => {
    alert('Funcionalidade de criar orçamento em desenvolvimento.');
  };
  container.querySelector('#btn-entrar-orcamento').onclick = () => {
    alert('Funcionalidade de entrar em orçamento existente em desenvolvimento.');
  };
  // Listeners para exportar e backup
  container.querySelector('#btn-exportar-pdf').onclick = () => {
    if (window.PDFModule && window.PDFModule.exportToPDF) {
      window.PDFModule.exportToPDF();
    } else if (window.exportToPDF) {
      window.exportToPDF();
    } else {
      alert('Módulo de exportação PDF não disponível.');
    }
  };
  container.querySelector('#btn-exportar-excel').onclick = async () => {
    if (typeof window.XLSX === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      script.onload = () => exportarParaExcel();
      script.onerror = () => alert('Erro ao carregar biblioteca Excel.');
      document.head.appendChild(script);
    } else {
      exportarParaExcel();
    }
    function exportarParaExcel() {
      const transacoes = window.transacoesSimuladas || [];
      const categorias = window.categoriasSimuladas || [];
      const wsTransacoes = window.XLSX.utils.json_to_sheet(transacoes.map(t => ({
        Descrição: t.descricao,
        Valor: t.valor,
        Tipo: t.tipo,
        Categoria: t.categoria,
        Data: t.data
      })));
      const wsCategorias = window.XLSX.utils.json_to_sheet(categorias.map(c => ({
        Nome: c.nome,
        Tipo: c.tipo,
        Limite: c.limite
      })));
      const wb = window.XLSX.utils.book_new();
      window.XLSX.utils.book_append_sheet(wb, wsTransacoes, 'Transações');
      window.XLSX.utils.book_append_sheet(wb, wsCategorias, 'Categorias');
      window.XLSX.writeFile(wb, `financeiro_${new Date().toISOString().split('T')[0]}.xlsx`);
    }
  };
  container.querySelector('#btn-backup').onclick = () => {
    const transacoes = window.transacoesSimuladas || [];
    const categorias = window.categoriasSimuladas || [];
    const backup = {
      data: new Date().toISOString(),
      transacoes,
      categorias
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financeiro-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
} 