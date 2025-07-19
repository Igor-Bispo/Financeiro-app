import TransactionForm from './TransactionForm.js';
import TransactionList from './TransactionList.js';
import { getTransactions, addTransaction } from './transactions.js';

// Função para inicializar o módulo de transações em um container
export function renderTransactionsModule({ containerId = 'dashboard-transacoes', categorias = [] } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Renderiza o formulário
  container.innerHTML = TransactionForm({ categorias });

  // Renderiza a lista
  const transacoes = getTransactions();
  container.innerHTML += TransactionList({ transacoes });

  // Eventos de submit do formulário
  const form = container.querySelector('#form-transacao');
  form.onsubmit = function (e) {
    e.preventDefault();
    const descricao = form.querySelector('#descricao-transacao').value;
    const valor = parseFloat(form.querySelector('#valor-transacao').value);
    const tipo = form.querySelector('#tipo-transacao').value;
    const categoria = form.querySelector('#categoria-transacao').value;
    const data = new Date().toISOString().slice(0, 10);
    if (!descricao || isNaN(valor) || !tipo || !categoria) {
      alert('Preencha todos os campos da transação.');
      return;
    }
    addTransaction({ descricao, valor, tipo, categoria, data });
    renderTransactionsModule({ containerId, categorias });
  };

  // Eventos de editar/excluir
  container.querySelectorAll('.delete-transacao-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      if (confirm('Deseja realmente excluir esta transação?')) {
        const transacoes = getTransactions();
        transacoes.splice(idx, 1);
        renderTransactionsModule({ containerId, categorias });
      }
    });
  });
  container.querySelectorAll('.edit-transacao-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      const transacoes = getTransactions();
      const t = transacoes[idx];
      if (!t) return;
      form.querySelector('#descricao-transacao').value = t.descricao;
      form.querySelector('#valor-transacao').value = t.valor;
      form.querySelector('#tipo-transacao').value = t.tipo;
      form.querySelector('#categoria-transacao').value = t.categoria;
      form.setAttribute('data-edit-idx', idx);
    });
  });
} 