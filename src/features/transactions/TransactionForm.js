// Componente TransactionForm (features/transactions/TransactionForm.js)
// Gera o HTML do formulário de transação, pronto para integração com voz e validação.

export default function TransactionForm({ categorias = [] } = {}) {
  return `
    <form id="form-transacao" class="flex flex-col gap-4">
      <input id="descricao-transacao" type="text" placeholder="Descrição" class="border rounded px-3 py-3" required />
      <input id="valor-transacao" type="number" step="0.01" min="0" placeholder="Valor" class="border rounded px-3 py-3" required />
      <select id="tipo-transacao" class="border rounded px-3 py-3">
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>
      <select id="categoria-transacao" class="border rounded px-3 py-3">
        ${categorias.map(cat => `<option value="${cat.nome}">${cat.nome} (${cat.tipo})</option>`).join('')}
      </select>
      <div class="flex gap-2">
        <button type="button" id="mic-transacao" class="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-3 shadow transition" aria-label="Adicionar por voz">🎤</button>
        <button type="submit" class="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg flex-1">Adicionar Transação</button>
      </div>
    </form>
  `;
} 