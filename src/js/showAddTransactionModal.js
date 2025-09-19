import { Modal } from './ui/Modal.js';
import { Snackbar } from './ui/Snackbar.js';

function showAddTransactionModal(initialData = {}) {
  console.log('🔧 showAddTransactionModal chamada com:', initialData);
  console.log('🔧 window.Modal disponível:', !!window.Modal);
  console.log('🔧 window.appState.categories:', window.appState?.categories);

  // Edita apenas quando houver um id (ou sinalizador explícito). Prefills sem id = adicionar.
  const isEdicao = !!(initialData && (initialData.id || initialData._mode === 'edit'));

  try {
    // Formata uma data para o formato aceito por <input type="date"> usando horário local
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
          const disponivelText = limite > 0 ? ` (R$ ${disponivel.toFixed(2)} disponível)` : '';
          return `<option value="${cat.id}" ${sel === cat.id ? 'selected' : ''}>${cat.nome}${disponivelText}</option>`;
        })
      ].join('');
    };

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
            class="u-input w-full"
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
            value="${initialDateStr}"
            class="u-input w-full"
            required
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 btn btn-primary"
          >
            ${isEdicao ? 'Atualizar' : 'Adicionar'}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 btn btn-ghost"
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
          // Usar serviço moderno diretamente para atualizar
          const { updateTransactionWithNotifications } = await import('@features/transactions/service.js');
          await updateTransactionWithNotifications(initialData.id, transactionData);
          // Fechar modal e atualizar UI (quando disponível)
          modal.remove();
          if (typeof window.refreshCurrentView === 'function') {
            window.refreshCurrentView();
          }
        } else {
          // Confirmação + inclusão desacopladas de app.js
          let proceed = false;
          
          // Usar modal moderno de confirmação como primeira opção
          console.log('🔍 Debug modal - window.confirmTransaction:', typeof window.confirmTransaction);
          console.log('🔍 Debug modal - window.showConfirmationModal:', typeof window.showConfirmationModal);
          
          if (typeof window.confirmTransaction === 'function') {
            console.log('✅ Usando modal moderno confirmTransaction');
            proceed = await window.confirmTransaction(transactionData);
          } else if (typeof window.showConfirmationModal === 'function') {
            console.log('⚠️ Usando modal legado showConfirmationModal');
            proceed = await new Promise((resolve) => {
              window.showConfirmationModal({
                title: 'Adicionar Transação',
                message: `Tem certeza que deseja adicionar "${transactionData.descricao}" no valor de R$ ${Number(transactionData.valor||0).toFixed(2)}?`,
                confirmText: 'Sim, adicionar',
                confirmColor: 'bg-green-500 hover:bg-green-600',
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false)
              });
            });
          } else {
            console.log('🔄 Tentando import dinâmico do modal moderno');
            // Fallback: tentar importar modal moderno
            try {
                const { confirmTransaction } = await import('./ui/ConfirmModal.js');
              console.log('✅ Import dinâmico bem-sucedido, usando confirmTransaction');
              proceed = await confirmTransaction(transactionData);
            } catch (importError) {
              console.warn('❌ Falha ao importar modal de confirmação:', importError);
              // Fallback final para confirm básico
              console.log('🔄 Usando confirm nativo do browser');
              proceed = confirm(`Adicionar "${transactionData.descricao}" no valor de R$ ${Number(transactionData.valor||0).toFixed(2)}?`);
            }
          }

          if (!proceed) return; // usuário cancelou

          // Remover modal antes de salvar
          modal.remove();

          // Chamar serviço moderno diretamente
          const { addTransactionWithNotifications } = await import('@features/transactions/service.js');
          await addTransactionWithNotifications(transactionData);

          if (window.Snackbar) {
            Snackbar.show ? Snackbar.show('Transação adicionada com sucesso', 'success') : Snackbar({ message: 'Transação adicionada com sucesso', type: 'success' });
          }
          if (typeof window.refreshCurrentView === 'function') {
            window.refreshCurrentView();
          }
        }
      } catch (error) {
        console.error('Erro ao salvar transação:', error);
        if (error.message !== 'Operação cancelada pelo usuário') {
          Snackbar.show('Erro ao salvar transação', 'error');
        }
      }
    });

    // Adicionar evento para mostrar informações da categoria selecionada (por mês selecionado)
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
    };

    categoriaSelect.addEventListener('change', updateCategoriaInfo);
    // Recalcular quando a data mudar (para refletir o mês escolhido)
    dataInput.addEventListener('change', () => {
      // Re-render options to reflect novo disponível por categoria no mês escolhido
      const current = categoriaSelect.value;
      categoriaSelect.innerHTML = renderCategoryOptionsForMonth(getSelectedMonthDate());
      categoriaSelect.value = current;
      updateCategoriaInfo();
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
    showAddTransactionModal(transaction);
  }
};

// Export default para uso com import dinâmico
export default showAddTransactionModal;

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.showAddTransactionModal = showAddTransactionModal;
}
