/**
 * Modal para exibir categorias em alerta
 * Funcionalidade: Mostrar quais categorias estão próximas ou ultrapassaram seus limites
 */

export function showCategoriasAlertaModal() {
  const categoriasEmAlerta = window.categoriasEmAlerta || [];
  
  if (categoriasEmAlerta.length === 0) {
    // Se não há categorias em alerta, mostrar mensagem informativa
    showModalSemAlertas();
    return;
  }
  
  // Criar modal com categorias em alerta
  showModalComAlertas(categoriasEmAlerta);
}

function showModalSemAlertas() {
  const modalHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span class="text-xl">✅</span>
              </div>
              <div>
                <h3 class="text-lg font-bold">Nenhum Alerta</h3>
                <p class="text-green-100 text-sm">Todas as categorias estão dentro dos limites</p>
              </div>
            </div>
            <button class="close-modal-btn text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors">
              <span class="text-xl">×</span>
            </button>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-3xl">🎉</span>
            </div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Parabéns!
            </h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Todas as suas categorias estão dentro dos limites estabelecidos. 
              Continue controlando seus gastos!
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4">
          <button class="close-modal-btn w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Inserir modal no DOM
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Adicionar event listeners
  addModalEventListeners();
}

function showModalComAlertas(categoriasEmAlerta) {
  // Ordenar categorias por percentual (maior primeiro)
  categoriasEmAlerta.sort((a, b) => b.percentual - a.percentual);
  
  const categoriasHTML = categoriasEmAlerta.map(categoria => {
    const isOverLimit = categoria.percentual >= 1.0;
    const statusColor = isOverLimit ? 'red' : 'orange';
    const statusIcon = isOverLimit ? '🚨' : '⚠️';
    const statusText = isOverLimit ? 'Limite ultrapassado' : 'Próximo do limite';
    
    return `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-${statusColor}-100 dark:bg-${statusColor}-900 rounded-full flex items-center justify-center">
              <span class="text-sm">${statusIcon}</span>
            </div>
            <div>
              <h5 class="font-semibold text-gray-800 dark:text-gray-200">${categoria.nome}</h5>
              <p class="text-xs text-${statusColor}-600 dark:text-${statusColor}-400">${statusText}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-${statusColor}-600 dark:text-${statusColor}-400">
              ${categoria.percentualFormatado}
            </div>
          </div>
        </div>
        
        <!-- Barra de progresso -->
        <div class="mb-3">
          <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Gasto: R$ ${categoria.gasto.toFixed(2)}</span>
            <span>Limite: R$ ${categoria.limite.toFixed(2)}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-${statusColor}-500 h-2 rounded-full transition-all duration-300" 
                 style="width: ${Math.min(categoria.percentual * 100, 100)}%"></div>
          </div>
        </div>
        
        <!-- Informações adicionais -->
        <div class="text-xs text-gray-500 dark:text-gray-400">
          ${isOverLimit 
            ? `Ultrapassou o limite em R$ ${(categoria.gasto - categoria.limite).toFixed(2)}`
            : `Restam R$ ${(categoria.limite - categoria.gasto).toFixed(2)} do limite`
          }
        </div>
      </div>
    `;
  }).join('');
  
  const modalHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-red-500 to-orange-600 p-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span class="text-xl">🚨</span>
              </div>
              <div>
                <h3 class="text-lg font-bold">Categorias em Alerta</h3>
                <p class="text-red-100 text-sm">${categoriasEmAlerta.length} categoria(s) precisam de atenção</p>
              </div>
            </div>
            <button class="close-modal-btn text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors">
              <span class="text-xl">×</span>
            </button>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6 overflow-y-auto max-h-[60vh]">
          <div class="space-y-4">
            ${categoriasHTML}
          </div>
          
          <!-- Dica -->
          <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <span class="text-blue-600 dark:text-blue-400 text-lg">💡</span>
              <div>
                <h5 class="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-1">
                  Dica
                </h5>
                <p class="text-blue-700 dark:text-blue-300 text-xs">
                  Categorias com mais de 70% do limite gasto são consideradas em alerta. 
                  Revise seus gastos para evitar ultrapassar os limites.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4">
          <button class="close-modal-btn w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Inserir modal no DOM
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Adicionar event listeners
  addModalEventListeners();
}

function addModalEventListeners() {
  // Event listener para fechar modal
  const closeButtons = document.querySelectorAll('.close-modal-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  
  // Event listener para fechar ao clicar fora do modal
  const modal = document.querySelector('.fixed.inset-0');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Event listener para ESC
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  document.addEventListener('keydown', handleEsc);
  
  // Armazenar função para remover event listener
  window.currentModalEscHandler = handleEsc;
}

function closeModal() {
  const modal = document.querySelector('.fixed.inset-0');
  if (modal) {
    modal.remove();
  }
  
  // Remover event listener do ESC
  if (window.currentModalEscHandler) {
    document.removeEventListener('keydown', window.currentModalEscHandler);
    window.currentModalEscHandler = null;
  }
}
