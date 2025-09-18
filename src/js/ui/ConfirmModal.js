// Modal de confirmação moderno e elegante
export class ConfirmModal {
  constructor() {
    this.modal = null;
    this.resolve = null;
    this.reject = null;
  }

  show(options) {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.createModal(options);
    });
  }

  createModal(options) {
    const {
      title = 'Confirmação',
      message = 'Tem certeza que deseja continuar?',
      confirmText = 'Confirmar',
      cancelText = 'Cancelar',
      type = 'info', // info, success, warning, danger
      icon = null
    } = options;

    // Remover modal existente se houver
    this.removeModal();

    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'confirm-modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;

    // Criar modal
    this.modal = document.createElement('div');
    this.modal.className = 'confirm-modal';
    this.modal.style.cssText = `
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      max-width: 400px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      transform: scale(0.95);
      transition: transform 0.2s ease;
    `;

    // Definir cores baseadas no tipo
    const colors = {
      info: { primary: '#3B82F6', bg: '#EFF6FF', icon: 'ℹ️' },
      success: { primary: '#10B981', bg: '#ECFDF5', icon: '✅' },
      warning: { primary: '#F59E0B', bg: '#FFFBEB', icon: '⚠️' },
      danger: { primary: '#EF4444', bg: '#FEF2F2', icon: '❌' }
    };

    const colorScheme = colors[type] || colors.info;
    const displayIcon = icon || colorScheme.icon;

    // Conteúdo do modal
    this.modal.innerHTML = `
      <div style="padding: 24px;">
        <!-- Header -->
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <div style="
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: ${colorScheme.bg};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-right: 16px;
            flex-shrink: 0;
          ">
            ${displayIcon}
          </div>
          <div style="flex: 1;">
            <h3 style="
              margin: 0;
              font-size: 18px;
              font-weight: 600;
              color: #1F2937;
              line-height: 1.4;
            ">${title}</h3>
          </div>
        </div>

        <!-- Message -->
        <div style="
          margin-bottom: 24px;
          color: #6B7280;
          font-size: 14px;
          line-height: 1.5;
        ">${message}</div>

        <!-- Actions -->
        <div style="
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        ">
          <button class="confirm-modal-cancel" style="
            padding: 10px 20px;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            background: white;
            color: #374151;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 80px;
          ">${cancelText}</button>
          <button class="confirm-modal-confirm" style="
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            background: ${colorScheme.primary};
            color: white;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 80px;
          ">${confirmText}</button>
        </div>
      </div>
    `;

    // Adicionar ao DOM
    overlay.appendChild(this.modal);
    document.body.appendChild(overlay);

    // Animar entrada
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      this.modal.style.transform = 'scale(1)';
    });

    // Event listeners
    const cancelBtn = this.modal.querySelector('.confirm-modal-cancel');
    const confirmBtn = this.modal.querySelector('.confirm-modal-confirm');

    const handleCancel = () => {
      this.close(false);
    };

    const handleConfirm = () => {
      this.close(true);
    };

    const handleOverlayClick = (e) => {
      if (e.target === overlay) {
        this.close(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        this.close(false);
      } else if (e.key === 'Enter') {
        this.close(true);
      }
    };

    cancelBtn.addEventListener('click', handleCancel);
    confirmBtn.addEventListener('click', handleConfirm);
    overlay.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleKeyDown);

    // Focar no botão de confirmação
    setTimeout(() => confirmBtn.focus(), 100);

    // Armazenar listeners para cleanup
    this.listeners = {
      cancel: handleCancel,
      confirm: handleConfirm,
      overlay: handleOverlayClick,
      keydown: handleKeyDown
    };
  }

  close(result) {
    if (!this.modal) return;

    const overlay = this.modal.parentElement;
    
    // Animar saída
    overlay.style.opacity = '0';
    this.modal.style.transform = 'scale(0.95)';

    setTimeout(() => {
      this.removeModal();
      if (result) {
        this.resolve?.(true);
      } else {
        this.reject?.(false);
      }
    }, 200);
  }

  removeModal() {
    if (this.modal) {
      const overlay = this.modal.parentElement;
      if (overlay) {
        // Remover listeners
        const cancelBtn = this.modal.querySelector('.confirm-modal-cancel');
        const confirmBtn = this.modal.querySelector('.confirm-modal-confirm');
        
        if (cancelBtn && this.listeners?.cancel) {
          cancelBtn.removeEventListener('click', this.listeners.cancel);
        }
        if (confirmBtn && this.listeners?.confirm) {
          confirmBtn.removeEventListener('click', this.listeners.confirm);
        }
        if (overlay && this.listeners?.overlay) {
          overlay.removeEventListener('click', this.listeners.overlay);
        }
        if (this.listeners?.keydown) {
          document.removeEventListener('keydown', this.listeners.keydown);
        }

        document.body.removeChild(overlay);
      }
      this.modal = null;
      this.listeners = null;
    }
  }
}

// Instância global
export const confirmModal = new ConfirmModal();

// Função de conveniência
export function confirm(options) {
  return confirmModal.show(options);
}

// Funções específicas para diferentes tipos de confirmação
export function confirmTransaction(transactionData) {
  const { descricao, valor, tipo } = transactionData;
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);

  return confirm({
    title: 'Adicionar Transação',
    message: `Tem certeza que deseja adicionar "${descricao}" no valor de ${formattedValue}?`,
    confirmText: 'Adicionar',
    cancelText: 'Cancelar',
    type: 'success',
    icon: '💰'
  });
}

export function confirmDelete(itemName, itemType = 'item') {
  return confirm({
    title: 'Confirmar Exclusão',
    message: `Tem certeza que deseja excluir "${itemName}"? Esta ação não pode ser desfeita.`,
    confirmText: 'Excluir',
    cancelText: 'Cancelar',
    type: 'danger',
    icon: '🗑️'
  });
}

export function confirmUpdate(itemName, itemType = 'item') {
  return confirm({
    title: 'Salvar Alterações',
    message: `Tem certeza que deseja salvar as alterações em "${itemName}"?`,
    confirmText: 'Salvar',
    cancelText: 'Cancelar',
    type: 'info',
    icon: '💾'
  });
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.ConfirmModal = ConfirmModal;
  window.confirmModal = confirmModal;
  window.confirm = confirm;
  window.confirmTransaction = confirmTransaction;
  window.confirmDelete = confirmDelete;
  window.confirmUpdate = confirmUpdate;
}
