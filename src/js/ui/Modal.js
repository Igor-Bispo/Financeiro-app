export function Modal({ title = '', content = '', onClose = null }) {
  console.log('🔧 Modal sendo criado com:', { title, content: content.substring(0, 100) + '...' });

  // Remover modal existente antes de criar novo
  const existingModal = document.getElementById('app-modal');
  if (existingModal) {
    console.log('⚠️ [Modal] Modal existente encontrado - removendo');
    existingModal.remove();
  }

  const overlay = document.createElement('div');
  overlay.id = 'app-modal';
  overlay.className =
    'modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50';
  overlay.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 9999 !important;
    background: rgba(0, 0, 0, 0.4) !important;
  `;
  
  // Flag para evitar fechamento duplicado
  let isClosing = false;
  
  overlay.onclick = e => {
    if (e.target === overlay && !isClosing) {
      isClosing = true;
      e.stopPropagation();
      e.preventDefault();
      console.log('🔧 [Modal] Clique no overlay - fechando modal');
      if (onClose) {
        onClose();
      } else {
        overlay.remove();
      }
      if (window.toggleFABOnModal) {
        window.toggleFABOnModal();
      }
    }
  };

  const modal = document.createElement('div');
  modal.className =
    'bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative';
  modal.style.cssText = `
    max-width: 90vw !important;
    max-height: 90vh !important;
    overflow-y: auto !important;
    margin: auto !important;
    transform: none !important;
  `;
  modal.innerHTML = `
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${title}</h2>
    <div class="modal-body">${content}</div>
  `;

  overlay.appendChild(modal);

  // Garantir que o modal seja adicionado ao body
  document.body.appendChild(overlay);

  modal.querySelector('#modal-close-btn').onclick = e => {
    if (isClosing) {
      console.log('⚠️ [Modal] Já está fechando - ignorando clique');
      return;
    }
    isClosing = true;
    e.stopPropagation();
    e.preventDefault();
    console.log('🔧 [Modal] Clique no botão X - fechando modal');
    if (onClose) {
      onClose();
    } else {
      overlay.remove();
    }
    if (window.toggleFABOnModal) {
      window.toggleFABOnModal();
    }
  };

  if (window.toggleFABOnModal) {
    window.toggleFABOnModal();
  }

  console.log('🔧 Modal criado:', overlay);
  console.log('🔧 Modal HTML:', overlay.outerHTML.substring(0, 200) + '...');

  // Provide a safe global fallback for closeModal if not present
  try {
    if (typeof window !== 'undefined' && typeof window.closeModal !== 'function') {
      window.closeModal = function() {
        try {
          const el = document.getElementById('app-modal') || overlay;
          if (el && el.parentNode) el.parentNode.removeChild(el);
        } catch {}
        if (window.toggleFABOnModal) {
          try { window.toggleFABOnModal(); } catch {}
        }
      };
    }
  } catch {}

  return overlay;
}

// Export the closeModal function for module imports
export function closeModal() {
  try {
    const el = document.getElementById('app-modal');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  } catch {}
  if (window.toggleFABOnModal) {
    try { window.toggleFABOnModal(); } catch {}
  }
}

// Export showModal function for consistency
export function showModal(options) {
  const modal = Modal(options);
  // Modal já é adicionado ao body dentro da função Modal
  return modal;
}
