export function RecorrenteForm({ onSubmit, initialData = {} }) {
  const form = document.createElement('form');
  form.className = 'space-y-4';
  form.innerHTML = `
    <div class="form-group">
      <label class="form-label modal-label">Nome da Despesa Recorrente</label>
      <input type="text" id="rec-desc" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: Aluguel, Netflix, Academia"
             value="${initialData.descricao || ''}"
             autocomplete="off"
             autocorrect="off"
             autocapitalize="words"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
    </div>
    <div class="form-group">
      <label class="form-label modal-label">Valor da Despesa (R$)</label>
      <input type="number" id="rec-valor" required step="0.01" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="0,00"
             value="${initialData.valorTotal || initialData.valor || ''}"
             inputmode="decimal"
             autocomplete="off"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
    </div>
    <div>
      <label class="modal-label">Tipo do Valor Informado</label>
      <div class="flex gap-4">
        <label class="flex items-center gap-2 cursor-pointer radio-label">
          <input type="radio" name="tipo-valor" value="total" 
                 class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                 ${(initialData.valorTotal && !initialData.valor) || (!initialData.valorTotal && !initialData.valor) ? 'checked' : ''}>
          <span class="radio-text">Valor total (soma de todas as parcelas)</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer radio-label">
          <input type="radio" name="tipo-valor" value="parcela" 
                 class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                 ${initialData.valor && !initialData.valorTotal ? 'checked' : ''}>
          <span class="radio-text">Valor de cada parcela</span>
        </label>
      </div>
    </div>
    <div>
      <label class="modal-label">Categoria da Despesa</label>
      <select id="rec-categoria" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
        <option value="" style="background-color: var(--option-bg, #ffffff); color: var(--option-text, #1f2937); font-weight: 500; padding: 12px; font-size: 14px;">Selecione uma categoria...</option>
        ${(window.appState.categories || [])
    .sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
    )
    .map(cat => {
      // Calcular gasto atual da categoria no mês atual
      const now = new Date();
      const anoAtual = now.getFullYear();
      const mesAtual = now.getMonth() + 1;

      const transacoesCategoria = (
        window.appState.transactions || []
      ).filter(t => {
        if (t.categoriaId !== cat.id || t.tipo !== cat.tipo) {return false;}

        let transacaoData;
        if (
          t.createdAt &&
                typeof t.createdAt === 'object' &&
                t.createdAt.seconds
        ) {
          transacaoData = new Date(t.createdAt.seconds * 1000);
        } else {
          transacaoData = new Date(t.createdAt);
        }

        const transacaoAno = transacaoData.getFullYear();
        const transacaoMes = transacaoData.getMonth() + 1;

        return transacaoAno === anoAtual && transacaoMes === mesAtual;
      });

      const gastoAtual = transacoesCategoria.reduce(
        (sum, t) => sum + parseFloat(t.valor),
        0
      );
      const limite = parseFloat(cat.limite || 0);
      const saldo =
              cat.tipo === 'receita' ? gastoAtual : limite - gastoAtual;

      // Formatar texto da opção
      let textoOpcao = cat.nome;
      if (limite > 0) {
        textoOpcao += ` - Limite: R$ ${limite.toFixed(2)}`;
        if (cat.tipo === 'despesa') {
          textoOpcao += ` (Disponível: R$ ${Math.max(0, saldo).toFixed(2)})`;
        } else {
          textoOpcao += ` (Recebido: R$ ${gastoAtual.toFixed(2)})`;
        }
      }

      return `<option value="${cat.id}" ${initialData.categoriaId === cat.id ? 'selected' : ''} style="background-color: var(--option-bg, #ffffff); color: var(--option-text, #1f2937); font-weight: 500; padding: 8px;">${textoOpcao}</option>`;
    })
    .join('')}
      </select>
    </div>
    <div>
      <label class="modal-label">Data de Início da Recorrência</label>
      <input type="date" id="rec-data" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             value="${initialData.dataInicio || new Date().toISOString().split('T')[0]}"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
    </div>
    <div>
      <label class="modal-label">Número de Parcelas (deixe vazio para infinito)</label>
      <input type="number" id="rec-parcelas" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: 12 para 1 ano, 24 para 2 anos"
             value="${initialData.parcelasRestantes || ''}"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
    </div>
    <div id="recorrente-valores-info" class="text-xs text-gray-600 modal-info"></div>
    <div class="flex items-center gap-2">
      <input type="checkbox" id="rec-efetivar" 
             class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" 
             ${initialData.efetivarMesAtual ? 'checked' : ''} />
      <label for="rec-efetivar" class="checkbox-label">Criar transação para este mês automaticamente</label>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Salvar</button>
    </div>
  `;

  // Função para atualizar a exibição dos valores
  function atualizarValoresInfo() {
    const valorInput = document.getElementById('rec-valor');
    const parcelasInput = document.getElementById('rec-parcelas');
    const tipoValorRadio = form.querySelector('input[name="tipo-valor"]:checked');
    
    const valor = valorInput ? parseFloat(valorInput.value) || 0 : 0;
    const parcelas = parcelasInput ? parseInt(parcelasInput.value) || 0 : 0;
    const tipoValor = tipoValorRadio ? tipoValorRadio.value : 'total';
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

  form
    .querySelector('#rec-valor')
    .addEventListener('input', atualizarValoresInfo);
  form
    .querySelector('#rec-parcelas')
    .addEventListener('input', atualizarValoresInfo);
  form.querySelectorAll('input[name="tipo-valor"]').forEach(radio => {
    radio.addEventListener('change', atualizarValoresInfo);
  });
  
  // Garantir que os botões sejam inicializados corretamente
  setTimeout(() => {
    atualizarValoresInfo();
    
    // Forçar a seleção correta dos botões de rádio
    const tipoValor = form.querySelector('input[name="tipo-valor"]:checked');
    if (!tipoValor) {
      // Se nenhum estiver selecionado, selecionar "total" por padrão
      const totalRadio = form.querySelector('input[name="tipo-valor"][value="total"]');
      if (totalRadio) {
        totalRadio.checked = true;
        totalRadio.dispatchEvent(new Event('change'));
      }
    }
    
    // Configurar estado inicial do checkbox
    const checkbox = form.querySelector('#rec-efetivar');
    if (checkbox) {
      const deveEstarMarcado = initialData.efetivarMesAtual === true || initialData.efetivarMesAtual === 'true';
      checkbox.checked = deveEstarMarcado;
    }
  }, 100);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const valorInput = parseFloat(document.getElementById('rec-valor').value);
    let parcelasRestantes = document.getElementById('rec-parcelas').value
      ? parseInt(document.getElementById('rec-parcelas').value)
      : null;
    if (parcelasRestantes !== null && parcelasRestantes < 1) {
      parcelasRestantes = null; // Não permitir zero ou negativo
    }
    const tipoValor = form.querySelector(
      'input[name="tipo-valor"]:checked'
    ).value;
    let valor = valorInput;
    let valorTotal = valorInput;
    if (parcelasRestantes && parcelasRestantes > 1) {
      if (tipoValor === 'total') {
        valor = +(valorInput / parcelasRestantes).toFixed(2); // Arredonda para 2 casas
        valorTotal = +(valor.toFixed(2) * parcelasRestantes).toFixed(2); // Garante soma exata
      } else {
        valor = +valorInput.toFixed(2);
        valorTotal = +(valor * parcelasRestantes).toFixed(2);
      }
    } else {
      valor = +valorInput.toFixed(2);
      valorTotal = +valorInput.toFixed(2);
    }
    const dados = {
      descricao: document.getElementById('rec-desc').value,
      valor, // valor da parcela
      valorTotal, // salva também o valor total
      categoriaId: document.getElementById('rec-categoria').value,
      dataInicio: document.getElementById('rec-data').value,
      parcelasRestantes,
      parcelasTotal: parcelasRestantes, // Adicionar o total de parcelas
      ativa: true,
      efetivarMesAtual: document.getElementById('rec-efetivar').checked
    };
    onSubmit(dados);
  });

  return form;
}
