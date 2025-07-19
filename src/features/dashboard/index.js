import BalanceCard from './BalanceCard.js';
import CategoryProgress from './CategoryProgress.js';
import RecentTransactions from './RecentTransactions.js';

// Função para inicializar o dashboard em um container
export function renderDashboardModule({ containerId = 'dashboard-cards', transacoes = [], categorias = [] } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Calcular totais
  const receita = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
  const despesa = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
  const saldo = receita - despesa;

  // Renderizar componentes
  container.innerHTML = `
    ${BalanceCard({ receita, despesa, saldo })}
    ${RecentTransactions({ transacoes })}
    <h3 class="text-lg font-bold text-gray-800 mt-8 mb-2">Categorias</h3>
    ${CategoryProgress({ categorias, transacoes })}
  `;
} 