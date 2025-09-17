/**
 * Event handlers para o Dashboard
 * Funcionalidade: Gerenciar cliques e interações no Dashboard
 */

import { showCategoriasAlertaModal } from '../../js/ui/CategoriasAlertaModal.js';

export function setupDashboardHandlers() {
  // Event listener para o botão de alertas de categorias
  document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Verificar se o clique foi no botão de alertas de categorias
    if (target.id === 'alertas-categorias-btn' || target.closest('#alertas-categorias-btn')) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🔍 [Dashboard] Clique no botão de alertas de categorias');
      showCategoriasAlertaModal();
    }
  });
}

// Inicializar handlers quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDashboardHandlers);
} else {
  setupDashboardHandlers();
}
