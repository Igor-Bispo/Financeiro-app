import { Modal } from './ui/Modal.js';
import { Snackbar } from './ui/Snackbar.js';

window.showAddCategoryModal = function (initialData = {}) {
  console.log('🔧 showAddCategoryModal chamada com:', initialData);
  console.log('🔧 window.Modal disponível:', !!window.Modal);
  
  const isEdicao = !!initialData && Object.keys(initialData).length > 0;
  
  try {
    const modal = Modal({
    title: isEdicao ? 'Editar Categoria' : 'Nova Categoria',
    content: `
      <form id="category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome
          </label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value="${initialData.nome || ''}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ex: Alimentação, Transporte..."
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
            <option value="despesa" ${initialData.tipo === 'despesa' ? 'selected' : ''}>Despesa</option>
            <option value="receita" ${initialData.tipo === 'receita' ? 'selected' : ''}>Receita</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Limite Mensal (opcional)
          </label>
          <input 
            type="number" 
            id="limite" 
            name="limite" 
            value="${initialData.limite || ''}"
            step="0.01" 
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="0.00"
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
  console.log('✅ Modal de categoria adicionado ao DOM');

  // Adicionar evento de submit
  const form = modal.querySelector('#category-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const categoryData = {
      nome: formData.get('nome'),
      tipo: formData.get('tipo'),
      limite: formData.get('limite') ? parseFloat(formData.get('limite')) : null
    };

    try {
      if (isEdicao) {
        await window.updateCategory(initialData.id, categoryData);
        modal.remove();
        window.refreshCurrentView();
      } else {
        // Usar função com confirmação para adicionar categoria
        await window.addCategoryWithConfirmation(categoryData);
        modal.remove();
        window.refreshCurrentView();
      }
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      if (error.message !== 'Operação cancelada pelo usuário') {
        Snackbar.show('Erro ao salvar categoria', 'error');
      }
    }
  });
  } catch (error) {
    console.error('❌ Erro ao criar modal de categoria:', error);
    if (window.Snackbar) {
      window.Snackbar.show('Erro ao abrir modal de categoria', 'error');
    } else {
      alert('Erro ao abrir modal de categoria: ' + error.message);
    }
  }
};

// Função para editar categoria
window.editCategory = function (categoryId) {
  const category = window.appState.categories?.find(c => c.id === categoryId);
  if (category) {
    window.showAddCategoryModal(category);
  }
}; 