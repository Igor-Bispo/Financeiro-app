// NOVA LÓGICA SIMPLIFICADA PARA BOTÃO DE ATUALIZAÇÕES
export function showUpdateModal() {
  console.log('🔄 [NOVA LÓGICA] Mostrando modal de atualizações...');
  
  // Criar modal HTML diretamente
  const modalHTML = `
    <div id="update-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div class="text-center mb-6">
          <div class="text-4xl mb-3">🔄</div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Escolha o tipo de atualização
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Selecione como deseja verificar atualizações
          </p>
        </div>
        
        <div class="space-y-3 mb-6">
          <button id="normal-update-btn" class="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="text-2xl">✅</div>
              <div class="text-left">
                <div class="font-medium text-blue-800 dark:text-blue-200">Verificação Normal</div>
                <div class="text-xs text-blue-600 dark:text-blue-400">Recomendado - Verifica atualizações do app</div>
              </div>
            </div>
          </button>
          
          <button id="hard-refresh-btn" class="w-full p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="text-2xl">🧹</div>
              <div class="text-left">
                <div class="font-medium text-orange-800 dark:text-orange-200">Hard Refresh Completo</div>
                <div class="text-xs text-orange-600 dark:text-orange-400">Limpa cache e dados - Para problemas persistentes</div>
              </div>
            </div>
          </button>
        </div>
        
        <div class="text-center">
          <button id="cancel-update-btn" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Adicionar modal ao DOM
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Adicionar event listeners
  const modal = document.getElementById('update-modal');
  const normalBtn = document.getElementById('normal-update-btn');
  const hardBtn = document.getElementById('hard-refresh-btn');
  const cancelBtn = document.getElementById('cancel-update-btn');
  
  function closeModal() {
    if (modal) {
      modal.remove();
    }
  }
  
  function executeNormalUpdate() {
    console.log('🔄 [NOVA LÓGICA] Executando verificação normal...');
    closeModal();
    
    // Executar verificação normal
    if (typeof window.checkForUpdates === 'function') {
      window.checkForUpdates(false);
    } else {
      import('@js/config/pwa.js').then(pwa => {
        pwa.checkForUpdates(false);
      }).catch(err => {
        console.error('Erro ao importar PWA module:', err);
        if (window.snk) {
          window.snk().error('Erro ao verificar atualizações');
        }
      });
    }
  }
  
  function executeHardRefresh() {
    console.log('🔄 [NOVA LÓGICA] Executando hard refresh...');
    closeModal();
    
    // Executar hard refresh
    if (typeof window.performHardRefresh === 'function') {
      window.performHardRefresh();
    } else {
      import('@js/config/pwa.js').then(pwa => {
        pwa.performHardRefresh();
      }).catch(err => {
        console.error('Erro ao importar PWA module:', err);
        if (window.snk) {
          window.snk().error('Erro ao executar hard refresh');
        }
      });
    }
  }
  
  // Event listeners
  if (normalBtn) {
    normalBtn.addEventListener('click', executeNormalUpdate);
  }
  
  if (hardBtn) {
    hardBtn.addEventListener('click', executeHardRefresh);
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }
  
  // Fechar modal ao clicar fora
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  console.log('🔄 [NOVA LÓGICA] Modal criado e event listeners adicionados!');
}
