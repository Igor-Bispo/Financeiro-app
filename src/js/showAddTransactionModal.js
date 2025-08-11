import { Modal } from './ui/Modal.js';
import { Snackbar } from './ui/Snackbar.js';

window.showAddTransactionModal = function (initialData = {}) {
  console.log('🔧 showAddTransactionModal chamada com:', initialData);
  console.log('🔧 window.Modal disponível:', !!window.Modal);
  console.log('🔧 window.appState.categories:', window.appState?.categories);
  
  const isEdicao = !!initialData && Object.keys(initialData).length > 0;
  
  try {
    const modal = Modal({
    title: isEdicao ? 'Editar Transação' : 'Nova Transação',
    content: `
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição
          </label>
          <input 
            type="text" 
            id="descricao" 
            name="descricao" 
            value="${initialData.descricao || ''}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ex: Salário, Aluguel, Compras..."
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor
          </label>
          <input 
            type="number" 
            id="valor" 
            name="valor" 
            value="${initialData.valor !== null && initialData.valor !== undefined ? initialData.valor : ''}"
            step="0.01" 
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="0.00"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo
          </label>
          <select 
            id="tipo" 
            name="tipo"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="receita" ${initialData.tipo === 'receita' ? 'selected' : ''}>Receita</option>
            <option value="despesa" ${initialData.tipo === 'despesa' ? 'selected' : ''}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoria
          </label>
          <select 
            id="categoriaId" 
            name="categoriaId"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Sem categoria</option>
            ${(window.appState?.categories || []).map(cat => {
              // Calcular valor disponível na categoria
              const limite = cat.limite ? parseFloat(cat.limite) : 0;
              const gasto = window.appState?.transactions
                ?.filter(t => t.categoriaId === cat.id && t.tipo === 'despesa')
                ?.reduce((total, t) => total + parseFloat(t.valor), 0) || 0;
              const disponivel = limite - gasto;
              
              const disponivelText = limite > 0 ? ` (R$ ${disponivel.toFixed(2)} disponível)` : '';
              const statusClass = disponivel < 0 ? 'text-red-600' : disponivel < limite * 0.2 ? 'text-yellow-600' : 'text-green-600';
              
              return `<option value="${cat.id}" ${initialData.categoriaId === cat.id ? 'selected' : ''}>
                ${cat.nome}${disponivelText}
              </option>`;
            }).join('')}
          </select>
          <div id="categoria-info" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
            <!-- Informações da categoria selecionada serão exibidas aqui -->
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data
          </label>
          <input 
            type="date" 
            id="data" 
            name="data" 
            value="${initialData.data ? (initialData.data.toDate ? initialData.data.toDate().toISOString().split('T')[0] : new Date(initialData.data).toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            ${isEdicao ? 'Atualizar' : 'Adicionar'}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });

  // Adicionar o modal ao DOM
  document.body.appendChild(modal);
  console.log('✅ Modal de transação adicionado ao DOM');

  // Adicionar evento de submit
  const form = modal.querySelector('#transaction-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const transactionData = {
      descricao: formData.get('descricao'),
      valor: parseFloat(formData.get('valor')),
      tipo: formData.get('tipo'),
      categoriaId: formData.get('categoriaId') || null,
      data: formData.get('data')
    };

    try {
      if (isEdicao) {
        await window.updateTransaction(initialData.id, transactionData);
        modal.remove();
        window.refreshCurrentView();
      } else {
        // Usar confirmação para adicionar transação
        modal.remove();
        await window.addTransactionWithConfirmation(transactionData);
        window.refreshCurrentView();
      }
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      if (error.message !== 'Operação cancelada pelo usuário') {
        Snackbar.show('Erro ao salvar transação', 'error');
      }
    }
  });

  // Adicionar evento para mostrar informações da categoria selecionada
  const categoriaSelect = modal.querySelector('#categoriaId');
  const categoriaInfo = modal.querySelector('#categoria-info');
  
  categoriaSelect.addEventListener('change', () => {
    const categoriaId = categoriaSelect.value;
    if (categoriaId) {
      const categoria = window.appState?.categories?.find(c => c.id === categoriaId);
      if (categoria) {
        const limite = categoria.limite ? parseFloat(categoria.limite) : 0;
        const gasto = window.appState?.transactions
          ?.filter(t => t.categoriaId === categoriaId && t.tipo === 'despesa')
          ?.reduce((total, t) => total + parseFloat(t.valor), 0) || 0;
        const disponivel = limite - gasto;
        const porcentagem = limite > 0 ? (gasto / limite) * 100 : 0;
        
        let statusText = '';
        let statusClass = '';
        
        if (limite === 0) {
          statusText = 'Sem limite definido';
          statusClass = 'text-gray-500';
        } else if (disponivel < 0) {
          statusText = `⚠️ Limite excedido em R$ ${Math.abs(disponivel).toFixed(2)}`;
          statusClass = 'text-red-600';
        } else if (disponivel < limite * 0.2) {
          statusText = `⚠️ Quase no limite (${porcentagem.toFixed(1)}% usado)`;
          statusClass = 'text-yellow-600';
        } else {
          statusText = `✓ Dentro do limite (${porcentagem.toFixed(1)}% usado)`;
          statusClass = 'text-green-600';
        }
        
        categoriaInfo.innerHTML = `
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="font-medium">${categoria.nome}</div>
            <div class="text-xs mt-1">
              <div>Limite: R$ ${limite.toFixed(2)}</div>
              <div>Gasto: R$ ${gasto.toFixed(2)}</div>
              <div>Disponível: R$ ${disponivel.toFixed(2)}</div>
              <div class="${statusClass} mt-1">${statusText}</div>
            </div>
          </div>
        `;
        categoriaInfo.classList.remove('hidden');
      }
    } else {
      categoriaInfo.classList.add('hidden');
    }
  });
  
  // Mostrar informações da categoria inicial se houver
  if (initialData.categoriaId) {
    categoriaSelect.dispatchEvent(new Event('change'));
  }
  } catch (error) {
    console.error('❌ Erro ao criar modal de transação:', error);
    if (window.Snackbar) {
      window.Snackbar.show('Erro ao abrir modal de transação', 'error');
    } else {
      alert('Erro ao abrir modal de transação: ' + error.message);
    }
  }
};

// Função para editar transação
window.editTransaction = function (transactionId) {
  const transaction = window.appState.transactions?.find(t => t.id === transactionId);
  if (transaction) {
    window.showAddTransactionModal(transaction);
  }
};