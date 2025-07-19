// Componente TransactionList (features/transactions/TransactionList.js)
// Exibe a lista de transações com botões de editar/excluir.

export default function TransactionList({ transacoes = [], onEdit = null, onDelete = null } = {}) {
  return `
    <ul id="lista-transacoes" class="grid gap-4 sm:grid-cols-2">
      ${transacoes.map((t, idx) => `
        <li class="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg p-5 flex justify-between items-center transition hover:scale-[1.02]">
          <div>
            <div class="font-bold text-lg text-gray-900">${t.descricao}</div>
            <div class="text-xs text-gray-500 mt-1">${t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1)} • ${t.categoria} • ${new Date(t.data).toLocaleDateString('pt-BR')}</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'} font-extrabold text-lg">${t.tipo === 'receita' ? '+' : '-'} R$ ${t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            <button class="edit-transacao-btn rounded-full bg-indigo-100 p-2 hover:bg-indigo-200 transition" title="Editar" data-idx="${idx}">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 21h4.586a1 1 0 0 0 .707-.293l10.414-10.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 15.707A1 1 0 0 0 4 16.414V21z" stroke="#6366f1" stroke-width="2"/></svg>
            </button>
            <button class="delete-transacao-btn rounded-full bg-red-100 p-2 hover:bg-red-200 transition" title="Apagar" data-idx="${idx}">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" stroke="#ef4444" stroke-width="2"/></svg>
            </button>
          </div>
        </li>
      `).join('')}
    </ul>
  `;
} 