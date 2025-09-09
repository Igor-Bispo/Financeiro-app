import { Modal } from './ui/Modal.js';
import { Snackbar } from './ui/Snackbar.js';

window.showAddCategoryModal = function (initialData = {}) {
  console.log('ðŸ”§ showAddCategoryModal chamada com:', initialData);
  console.log('ðŸ”§ window.Modal disponÃ­vel:', !!window.Modal);

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
            class="u-input w-full"
            placeholder="Ex: AlimentaÃ§Ã£o, Transporte..."
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
            class="u-input w-full"
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
            class="u-input w-full"
            placeholder="0.00"
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 u-btn u-btn--primary"
          >
            ${isEdicao ? 'Atualizar' : 'Adicionar'}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 u-btn u-btn--ghost"
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
    console.log('âœ… Modal de categoria adicionado ao DOM');

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
      // Enriquecer com metadados do contexto para evitar "sumir" por filtros
      try {
        const curBudgetId = window?.appState?.currentBudget?.id;
        const curUserId = window?.appState?.currentUser?.uid;
        if (curBudgetId) categoryData.budgetId = curBudgetId;
        if (curUserId) categoryData.userId = curUserId;
      } catch {}

      try {
      // importar serviÃ§os modernos sob demanda
        const svc = await import('@features/categories/service.js');
        if (isEdicao) {
          await svc.updateCategory(initialData.id, categoryData);
          Snackbar?.show?.('Categoria atualizada', 'success');
        } else {
          await svc.createCategory(categoryData);
          Snackbar?.show?.('Categoria criada', 'success');
        }
        modal.remove();
        try { window.refreshCurrentView?.(); } catch {}
        try { if (window.location.hash.includes('/categories')) {
          const mod = await import('@features/categories/CategoriesPage.js');
          await mod.renderCategories?.();
        }} catch {}
      } catch (error) {
        console.error('Erro ao salvar categoria:', error);
        if (error?.message !== 'OperaÃ§Ã£o cancelada pelo usuÃ¡rio') {
          try { Snackbar.show('Erro ao salvar categoria', 'error'); } catch {}
        }
      }
    });
  } catch (error) {
    console.error('âŒ Erro ao criar modal de categoria:', error);
    if (window.Snackbar) {
      window.Snackbar.show('Erro ao abrir modal de categoria', 'error');
    } else {
      alert('Erro ao abrir modal de categoria: ' + error.message);
    }
  }
};

// FunÃ§Ã£o para editar categoria
window.editCategory = function (categoryId) {
  try {
    const category = window.appState?.categories?.find(c => c.id === categoryId);
    if (category) {
      window.showAddCategoryModal(category);
    }
  } catch (e) {
    console.warn('editCategory fallback falhou:', e);
  }
};
