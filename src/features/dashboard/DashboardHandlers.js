/**
 * Event handlers para o Dashboard
 * Funcionalidade: Gerenciar cliques e interações no Dashboard
 */

import { showCategoriasAlertaModal } from '../../js/ui/CategoriasAlertaModal.js';

// Flag para prevenir múltiplas aberturas do modal
let isModalOpen = false;

export function setupDashboardHandlers() {
  // Event listener para o botão de alertas de categorias
  document.addEventListener('click', (e) => {
    const target = e.target;

    // Verificar se o clique foi no botão de alertas de categorias
    if (target.id === 'alertas-categorias-btn' || target.closest('#alertas-categorias-btn')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Prevenir múltiplas aberturas
      if (isModalOpen) {
        console.log('⚠️ [Dashboard] Modal já está aberto, ignorando...');
        return;
      }

      isModalOpen = true;
      console.log('🔍 [Dashboard] Abrindo modal de alertas de categorias');
      
      showCategoriasAlertaModal();

      // Resetar flag após um delay
      setTimeout(() => {
        isModalOpen = false;
      }, 500);
    }
  });
}

// Inicializar handlers quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDashboardHandlers);
} else {
  setupDashboardHandlers();
}
