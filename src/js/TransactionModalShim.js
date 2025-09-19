// Shim para carregar o modal de transações de forma robusta
let transactionModalModule = null;

async function loadTransactionModal() {
  if (transactionModalModule) {
    return transactionModalModule;
  }

  const importPaths = [
    './showAddTransactionModal.js',
    '../js/showAddTransactionModal.js',
    '../../js/showAddTransactionModal.js',
    './js/showAddTransactionModal.js'
  ];

  for (const path of importPaths) {
    try {
      const module = await import(path);
      if (module && typeof module.default === 'function') {
        transactionModalModule = module;
        return module;
      }
    } catch (e) {
      console.warn(`Falha ao importar modal de ${path}:`, e);
    }
  }
  throw new Error('Não foi possível carregar o modal de transações');
}

export async function showTransactionModal(data = {}) {
  try {
    const module = await loadTransactionModal();
    module.default(data);
    return true;
  } catch (e) {
    console.error('Erro ao carregar modal de transações:', e);
    return false;
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.loadTransactionModal = loadTransactionModal;
  window.showTransactionModal = showTransactionModal;
}

