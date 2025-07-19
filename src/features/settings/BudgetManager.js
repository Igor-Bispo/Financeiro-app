// Componente BudgetManager (features/settings/BudgetManager.js)
// Exibe e gerencia orçamentos do usuário

export default function BudgetManager({ orcamentos = [] } = {}) {
  return `
    <div class="budget-actions flex gap-2 mb-4">
      <button id="btn-criar-orcamento" class="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow">Criar novo orçamento</button>
      <button id="btn-entrar-orcamento" class="bg-white border border-indigo-400 text-indigo-600 font-bold py-2 px-4 rounded-full shadow">Entrar em orçamento existente</button>
      <button id="btn-exportar-pdf" class="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full shadow">Exportar PDF</button>
      <button id="btn-exportar-excel" class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow">Exportar Excel</button>
      <button id="btn-backup" class="bg-white border border-indigo-400 text-indigo-600 font-bold py-2 px-4 rounded-full shadow">Baixar Backup</button>
    </div>
    <ul id="budget-list" class="flex flex-col gap-2">
      ${orcamentos.length === 0 ? '<li class="text-gray-500">Nenhum orçamento encontrado.</li>' : orcamentos.map(orc => `
        <li class="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2 gap-2">
          <span class="font-medium text-indigo-700">${orc.name || orc.categoryName || `Orçamento ${orc.id}`}</span>
          <span class="text-xs text-gray-400">ID: <span class="font-mono">${orc.id}</span></span>
          <div class="flex gap-2">
            <button class="copy-orcamento-id-btn bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded text-xs" data-id="${orc.id}">Copiar ID</button>
            <button class="select-orcamento-btn bg-indigo-600 text-white px-3 py-1 rounded text-xs" data-id="${orc.id}">Selecionar</button>
          </div>
        </li>
      `).join('')}
    </ul>
  `;
} 