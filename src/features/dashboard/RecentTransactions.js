// Componente RecentTransactions (features/dashboard/RecentTransactions.js)
// Exibe as transações recentes (limite de 5) com visual moderno

export default function RecentTransactions({ transacoes = [] } = {}) {
  return `
    <div class="mt-6">
      <h3 class="text-lg font-bold text-gray-800 mb-2">Transações Recentes</h3>
      <ul class="flex flex-col gap-2">
        ${transacoes.slice(0, 5).map(t => `
          <li class="form-card flex justify-between items-center">
            <div>
              <div class="font-semibold text-gray-900">${t.descricao}</div>
              <div class="text-xs text-gray-500">${t.categoria} • ${new Date(t.data).toLocaleDateString('pt-BR')}</div>
            </div>
            <span class="${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'} font-bold">${t.tipo === 'receita' ? '+' : '-'} R$ ${t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
} 