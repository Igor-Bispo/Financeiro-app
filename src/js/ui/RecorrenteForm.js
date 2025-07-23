export function RecorrenteForm({ onSubmit, initialData = {} }) {
  const form = document.createElement('form');
  form.className = 'space-y-4';
  form.innerHTML = `
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
      <input type="text" id="rec-desc" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: Aluguel"
             value="${initialData.descricao || ''}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
      <input type="number" id="rec-valor" required step="0.01" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="0,00"
             value="${initialData.valor || ''}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
      <select id="rec-categoria" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg">
        <option value="">Selecione...</option>
        ${(window.appState.categories || []).map(cat =>
          `<option value="${cat.id}" ${initialData.categoriaId === cat.id ? 'selected' : ''}>${cat.nome}</option>`
        ).join('')}
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
      <input type="date" id="rec-data" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             value="${initialData.dataInicio || new Date().toISOString().split('T')[0]}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Parcelas (opcional)</label>
      <input type="number" id="rec-parcelas" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Deixe vazio para infinito"
             value="${initialData.parcelasRestantes || ''}">
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Salvar</button>
    </div>
  `;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const dados = {
      descricao: document.getElementById('rec-desc').value,
      valor: parseFloat(document.getElementById('rec-valor').value),
      categoriaId: document.getElementById('rec-categoria').value,
      dataInicio: document.getElementById('rec-data').value,
      parcelasRestantes: document.getElementById('rec-parcelas').value
        ? parseInt(document.getElementById('rec-parcelas').value)
        : null,
      ativa: true
    };
    onSubmit(dados);
  });

  return form;
}