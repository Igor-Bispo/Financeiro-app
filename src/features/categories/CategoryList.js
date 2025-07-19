// Componente CategoryList (features/categories/CategoryList.js)
// Exibe a lista de categorias com botões de editar/excluir/histórico e barra de progresso.

export default function CategoryList({ categorias = [], transacoes = [] } = {}) {
  return `
    <ul id="lista-categorias" class="flex flex-col gap-4">
      ${categorias.map((cat, idx) => {
        const gasto = transacoes.filter(t => t.categoria === cat.nome && t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
        const saldo = cat.limite > 0 ? cat.limite - gasto : 0;
        const percent = cat.limite > 0 ? Math.round((gasto / cat.limite) * 100) : 0;
        const barColor = percent >= 90 ? 'bg-red-500' : percent >= 60 ? 'bg-yellow-400' : 'bg-green-500';
        return `
        <li class="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-bold text-gray-900 text-base">${cat.nome}</div>
              <div class="text-xs text-gray-400">${cat.tipo.charAt(0).toUpperCase() + cat.tipo.slice(1)} • Limite: ${cat.limite > 0 ? 'R$ ' + cat.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-'} • Saldo: <span class="${saldo < 0 ? 'text-red-500' : 'text-green-600'} font-bold">R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
            </div>
            <div class="flex gap-2">
              <button class="history-categoria-btn rounded-full bg-blue-100 p-2 hover:bg-blue-200 transition" title="Ver histórico" data-idx="${idx}">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="#0ea5e9" stroke-width="2"/></svg>
              </button>
              <button class="edit-categoria-btn rounded-full bg-indigo-100 p-2 hover:bg-indigo-200 transition" title="Editar" data-idx="${idx}">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 21h4.586a1 1 0 0 0 .707-.293l10.414-10.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 15.707A1 1 0 0 0 4 16.414V21z" stroke="#6366f1" stroke-width="2"/></svg>
              </button>
              <button class="delete-categoria-btn rounded-full bg-red-100 p-2 hover:bg-red-200 transition" title="Apagar" data-idx="${idx}">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" stroke="#ef4444" stroke-width="2"/></svg>
              </button>
            </div>
          </div>
          ${cat.tipo === 'despesa' && cat.limite > 0 ? `
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2 relative overflow-hidden">
              <div class="${barColor} h-2 rounded-full transition-all" style="width: ${Math.min(percent, 100)}%"></div>
              <span class="absolute right-2 top-0 text-xs text-gray-500 font-bold">${percent}%</span>
            </div>
          ` : ''}
        </li>
        `;
      }).join('')}
    </ul>
  `;
} 