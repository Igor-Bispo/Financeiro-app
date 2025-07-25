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
             value="${initialData.valorTotal || initialData.valor || ''}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">O valor informado é:</label>
      <div class="flex gap-4">
        <label><input type="radio" name="tipo-valor" value="total" checked> Valor total</label>
        <label><input type="radio" name="tipo-valor" value="parcela"> Valor da parcela</label>
      </div>
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
    <div id="recorrente-valores-info" class="text-xs text-gray-600"></div>
    <div class="flex items-center gap-2">
      <input type="checkbox" id="rec-efetivar" class="form-checkbox h-4 w-4 text-blue-600" />
      <label for="rec-efetivar" class="text-sm text-gray-700">Efetivar no mês atual</label>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Salvar</button>
    </div>
  `;

  // Função para atualizar a exibição dos valores
  function atualizarValoresInfo() {
    const valor = parseFloat(document.getElementById('rec-valor').value) || 0;
    const parcelas = parseInt(document.getElementById('rec-parcelas').value) || 0;
    const tipoValor = form.querySelector('input[name="tipo-valor"]:checked').value;
    const info = document.getElementById('recorrente-valores-info');
    if (parcelas > 1 && valor > 0) {
      if (tipoValor === 'total') {
        const valorParcela = valor / parcelas;
        info.innerHTML = `<b>Valor total:</b> R$ ${valor.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${valorParcela.toFixed(2)}`;
      } else {
        const valorTotal = valor * parcelas;
        info.innerHTML = `<b>Valor total:</b> R$ ${valorTotal.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${valor.toFixed(2)}`;
      }
    } else if (valor > 0) {
      info.innerHTML = `<b>Valor:</b> R$ ${valor.toFixed(2)}`;
    } else {
      info.innerHTML = '';
    }
  }

  form.querySelector('#rec-valor').addEventListener('input', atualizarValoresInfo);
  form.querySelector('#rec-parcelas').addEventListener('input', atualizarValoresInfo);
  form.querySelectorAll('input[name="tipo-valor"]').forEach(radio => {
    radio.addEventListener('change', atualizarValoresInfo);
  });
  setTimeout(atualizarValoresInfo, 0);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const valorInput = parseFloat(document.getElementById('rec-valor').value);
    let parcelasRestantes = document.getElementById('rec-parcelas').value
      ? parseInt(document.getElementById('rec-parcelas').value)
      : null;
    if (parcelasRestantes !== null && parcelasRestantes < 1) {
      parcelasRestantes = null; // Não permitir zero ou negativo
    }
    const tipoValor = form.querySelector('input[name="tipo-valor"]:checked').value;
    let valor = valorInput;
    let valorTotal = valorInput;
    if (parcelasRestantes && parcelasRestantes > 1) {
      if (tipoValor === 'total') {
        valor = +(valorInput / parcelasRestantes).toFixed(2); // Arredonda para 2 casas
        valorTotal = +(valor.toFixed(2) * parcelasRestantes).toFixed(2); // Garante soma exata
      } else {
        valor = +(valorInput).toFixed(2);
        valorTotal = +(valor * parcelasRestantes).toFixed(2);
      }
    } else {
      valor = +(valorInput).toFixed(2);
      valorTotal = +(valorInput).toFixed(2);
    }
    const dados = {
      descricao: document.getElementById('rec-desc').value,
      valor, // valor da parcela
      valorTotal, // salva também o valor total
      categoriaId: document.getElementById('rec-categoria').value,
      dataInicio: document.getElementById('rec-data').value,
      parcelasRestantes,
      ativa: true,
      efetivarMesAtual: document.getElementById('rec-efetivar').checked
    };
    onSubmit(dados);
  });

  return form;
}