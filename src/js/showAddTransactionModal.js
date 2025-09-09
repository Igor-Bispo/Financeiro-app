import { Modal } from './ui/Modal.js';
import { Snackbar } from './ui/Snackbar.js';

window.showAddTransactionModal = function (initialData = {}) {
  console.log('ðŸ”§ showAddTransactionModal chamada com:', initialData);
  console.log('ðŸ”§ window.Modal disponÃ­vel:', !!window.Modal);
  console.log('ðŸ”§ window.appState.categories:', window.appState?.categories);

  // Edita apenas quando houver um id (ou sinalizador explÃ­cito). Prefills sem id = adicionar.
  const isEdicao = !!(initialData && (initialData.id || initialData._mode === 'edit'));

  try {
    // Formata uma data para o formato aceito por <input type="date"> usando horÃ¡rio local
    const fmtLocalDateInput = (d) => {
      if (!(d instanceof Date) || isNaN(d.getTime())) return '';
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    // Descobrir data inicial a exibir, sem usar toISOString (UTC)
    let initialDateObj = null;
    const src = initialData.data || initialData.createdAt;
    if (src) {
      try {
        if (src && typeof src.toDate === 'function') {
          initialDateObj = src.toDate();
        } else if (typeof src === 'string') {
          const s = src.trim();
          const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
          if (m) {
            initialDateObj = new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
          } else {
            const d = new Date(s);
            if (!isNaN(d.getTime())) initialDateObj = d;
          }
        } else if (typeof src === 'number') {
          const ms = src < 1e12 ? src * 1000 : src;
          const d = new Date(ms);
          if (!isNaN(d.getTime())) initialDateObj = d;
        } else if (src instanceof Date) {
          initialDateObj = src;
        }
      } catch {}
    }
    if (!initialDateObj) initialDateObj = new Date();
    const initialDateStr = fmtLocalDateInput(initialDateObj);

    // Helpers for month-scoped calculations
    const txToDate = (t) => {
      try {
        let v = t?.dataEfetivacao || t?.dataLancamento || t?.data || t?.date || t?.createdAt;
        if (!v) return null;
        if (v && typeof v.toDate === 'function') return v.toDate();
        if (typeof v === 'string') {
          const s = v.trim();
          const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
          if (m) return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
          const d = new Date(s);
          return isNaN(d.getTime()) ? null : d;
        }
        if (typeof v === 'number') {
          const ms = v < 1e12 ? v * 1000 : v;
          const d = new Date(ms);
          return isNaN(d.getTime()) ? null : d;
        }
        if (v instanceof Date) return v;
        const d = new Date(v);
        return isNaN(d.getTime()) ? null : d;
      } catch {
        return null;
      }
    };
    const getYMKey = (d) => d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` : '';
    const parseLocalDateInput = (s) => {
      if (!s) return null;
      const m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
      const d = new Date(s);
      return isNaN(d.getTime()) ? null : d;
    };
    const getSelectedMonthDate = () => {
      // Prefer the date chosen in the form; fallback to globally selected period
      try {
        const val = document.getElementById('data')?.value;
        const d = parseLocalDateInput(val);
        if (d) return d;
      } catch {}
      const now = new Date();
      const y = window.getSelectedPeriod ? window.getSelectedPeriod().year : (window.appState?.selectedYear || now.getFullYear());
      const m = window.getSelectedPeriod ? window.getSelectedPeriod().month : (window.appState?.selectedMonth || (now.getMonth() + 1));
      return new Date(y, m - 1, 1);
    };
    const computeMonthlySpent = (categoriaId, targetDate) => {
      try {
        if (!categoriaId) return 0;
        const ym = getYMKey(targetDate);
        const txs = Array.isArray(window.appState?.transactions) ? window.appState.transactions : [];
        return txs
          .filter(t => (t?.categoriaId === categoriaId) && (t?.tipo === 'despesa'))
          .filter(t => getYMKey(txToDate(t)) === ym)
          .reduce((sum, t) => sum + (parseFloat(t?.valor) || 0), 0);
      } catch { return 0; }
    };

    const renderCategoryOptionsForMonth = (targetDate) => {
      const cats = (window.appState?.categories || []);
      const sel = initialData.categoriaId || '';
      return [
        '<option value="">Sem categoria</option>',
        ...cats.map(cat => {
          const limite = cat.limite ? parseFloat(cat.limite) : 0;
          const gastoMes = computeMonthlySpent(cat.id, targetDate);
          const disponivel = limite - gastoMes;
          const disponivelText = limite > 0 ? ` (R$ ${disponivel.toFixed(2)} disponÃ­vel)` : '';
          return `<option value="${cat.id}" ${sel === cat.id ? 'selected' : ''}>${cat.nome}${disponivelText}</option>`;
        })
      ].join('');
    };

    const modal = Modal({
      title: isEdicao ? 'Editar TransaÃ§Ã£o' : 'Nova TransaÃ§Ã£o',
      content: `
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            DescriÃ§Ã£o
          </label>
          <input 
            type="text" 
            id="descricao" 
            name="descricao" 
            value="${initialData.descricao || ''}"
            class="u-input w-full"
            placeholder="Ex: SalÃ¡rio, Aluguel, Compras..."
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
            class="u-input w-full"
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
            class="u-input w-full"
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
            class="u-input w-full"
          >
            ${renderCategoryOptionsForMonth(initialDateObj)}
          </select>
          <div id="categoria-info" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
            <!-- InformaÃ§Ãµes da categoria selecionada serÃ£o exibidas aqui -->
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
            value="${initialDateStr}"
            class="u-input w-full"
            required
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
    console.log('âœ… Modal de transaÃ§Ã£o adicionado ao DOM');

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
          // Usar serviÃ§o moderno diretamente para atualizar
          const { updateTransactionWithNotifications } = await import('@features/transactions/service.js');
          await updateTransactionWithNotifications(initialData.id, transactionData);
          // Fechar modal e atualizar UI (quando disponÃ­vel)
          modal.remove();
          if (typeof window.refreshCurrentView === 'function') {
            window.refreshCurrentView();
          }
        } else {
          // ConfirmaÃ§Ã£o + inclusÃ£o desacopladas de app.js
          const proceed = await new Promise((resolve) => {
            if (typeof window.showConfirmationModal === 'function') {
              window.showConfirmationModal({
                title: 'Adicionar TransaÃ§Ã£o',
                message: `Tem certeza que deseja adicionar "${transactionData.descricao}" no valor de R$ ${Number(transactionData.valor||0).toFixed(2)}?`,
                confirmText: 'Sim, adicionar',
                confirmColor: 'bg-green-500 hover:bg-green-600',
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false)
              });
            } else {
              // Fallback simples
              resolve(confirm(`Adicionar "${transactionData.descricao}" no valor de R$ ${Number(transactionData.valor||0).toFixed(2)}?`));
            }
          });

          if (!proceed) return; // usuÃ¡rio cancelou

          // Remover modal antes de salvar
          modal.remove();

          // Chamar serviÃ§o moderno diretamente
          const { addTransactionWithNotifications } = await import('@features/transactions/service.js');
          await addTransactionWithNotifications(transactionData);

          if (window.Snackbar) {
            Snackbar.show ? Snackbar.show('TransaÃ§Ã£o adicionada com sucesso', 'success') : Snackbar({ message: 'TransaÃ§Ã£o adicionada com sucesso', type: 'success' });
          }
          if (typeof window.refreshCurrentView === 'function') {
            window.refreshCurrentView();
          }
        }
      } catch (error) {
        console.error('Erro ao salvar transaÃ§Ã£o:', error);
        if (error.message !== 'OperaÃ§Ã£o cancelada pelo usuÃ¡rio') {
          Snackbar.show('Erro ao salvar transaÃ§Ã£o', 'error');
        }
      }
    });

    // Adicionar evento para mostrar informaÃ§Ãµes da categoria selecionada (por mÃªs selecionado)
    const categoriaSelect = modal.querySelector('#categoriaId');
    const categoriaInfo = modal.querySelector('#categoria-info');
    const dataInput = modal.querySelector('#data');

    const updateCategoriaInfo = () => {
      const categoriaId = categoriaSelect.value;
      if (categoriaId) {
        const categoria = window.appState?.categories?.find(c => c.id === categoriaId);
        if (categoria) {
          const limite = categoria.limite ? parseFloat(categoria.limite) : 0;
          const targetDate = getSelectedMonthDate();
          const gasto = computeMonthlySpent(categoriaId, targetDate);
          const disponivel = limite - gasto;
          const porcentagem = limite > 0 ? (gasto / limite) * 100 : 0;

          let statusText = '';
          let statusClass = '';

          if (limite === 0) {
            statusText = 'Sem limite definido';
            statusClass = 'text-gray-500';
          } else if (disponivel < 0) {
            statusText = `âš ï¸ Limite excedido em R$ ${Math.abs(disponivel).toFixed(2)}`;
            statusClass = 'text-red-600';
          } else if (disponivel < limite * 0.2) {
            statusText = `âš ï¸ Quase no limite (${porcentagem.toFixed(1)}% usado)`;
            statusClass = 'text-yellow-600';
          } else {
            statusText = `âœ“ Dentro do limite (${porcentagem.toFixed(1)}% usado)`;
            statusClass = 'text-green-600';
          }

          categoriaInfo.innerHTML = `
            <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="font-medium">${categoria.nome}</div>
              <div class="text-xs mt-1">
                <div>Limite: R$ ${limite.toFixed(2)}</div>
                <div>Gasto: R$ ${gasto.toFixed(2)}</div>
                <div>DisponÃ­vel: R$ ${disponivel.toFixed(2)}</div>
                <div class="${statusClass} mt-1">${statusText}</div>
              </div>
            </div>
          `;
          categoriaInfo.classList.remove('hidden');
        }
      } else {
        categoriaInfo.classList.add('hidden');
      }
    };

    categoriaSelect.addEventListener('change', updateCategoriaInfo);
    // Recalcular quando a data mudar (para refletir o mÃªs escolhido)
    dataInput.addEventListener('change', () => {
      // Re-render options to reflect novo disponÃ­vel por categoria no mÃªs escolhido
      const current = categoriaSelect.value;
      categoriaSelect.innerHTML = renderCategoryOptionsForMonth(getSelectedMonthDate());
      categoriaSelect.value = current;
      updateCategoriaInfo();
    });

    // Mostrar informaÃ§Ãµes da categoria inicial se houver
    if (initialData.categoriaId) {
      categoriaSelect.dispatchEvent(new Event('change'));
    }
  } catch (error) {
    console.error('âŒ Erro ao criar modal de transaÃ§Ã£o:', error);
    if (window.Snackbar) {
      window.Snackbar.show('Erro ao abrir modal de transaÃ§Ã£o', 'error');
    } else {
      alert('Erro ao abrir modal de transaÃ§Ã£o: ' + error.message);
    }
  }
};

// FunÃ§Ã£o para editar transaÃ§Ã£o
window.editTransaction = function (transactionId) {
  const transaction = window.appState.transactions?.find(t => t.id === transactionId);
  if (transaction) {
    window.showAddTransactionModal(transaction);
  }
};
