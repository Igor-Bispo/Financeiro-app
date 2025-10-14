// FAB (Floating Action Button) - VERSÃO ULTRA SIMPLES
// Botão FIXO que NÃO PODE se mover de forma alguma

let fabButton = null;
let actionsContainer = null;
let isOpen = false;

export function initFAB() {
  console.log('🔧 [FAB] Inicializando FAB ULTRA SIMPLES...');
  
  // Limpar FAB existente
  cleanup();
  
  // Criar botão FIXO
  createFixedButton();
  
  console.log('✅ [FAB] Botão FIXO criado');
}

function createFixedButton() {
  // Botão principal - ULTRA SIMPLES
  fabButton = document.createElement('button');
  fabButton.id = 'fab-main';
  fabButton.innerHTML = '+';
  fabButton.type = 'button';
  
  // Estilos ABSOLUTAMENTE FIXOS - sem qualquer possibilidade de movimento
  fabButton.style.cssText = `
    position: fixed !important;
    bottom: 90px !important;
    right: 20px !important;
    width: 64px !important;
    height: 64px !important;
    border-radius: 50% !important;
    background: #3182ce !important;
    color: white !important;
    border: none !important;
    font-size: 32px !important;
    font-weight: bold !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    z-index: 999999 !important;
    margin: 0 !important;
    padding: 0 !important;
    outline: none !important;
    user-select: none !important;
    touch-action: manipulation !important;
    -webkit-tap-highlight-color: transparent !important;
    transform: none !important;
    transition: none !important;
    animation: none !important;
    left: auto !important;
    top: auto !important;
  `;
  
  // Container de ações - SIMPLES
  actionsContainer = document.createElement('div');
  actionsContainer.id = 'fab-actions';
  actionsContainer.style.cssText = `
    position: fixed;
    bottom: 160px;
    right: 20px;
    display: none;
    flex-direction: column;
    gap: 12px;
    z-index: 999998;
  `;
  
  // Criar botões de ação SIMPLES
  const actions = [
    { text: 'Transação', icon: '💰', color: '#3182ce', action: () => window.showAddTransactionModal?.() },
    { text: 'Categoria', icon: '�', color: '#38a169', action: () => window.showAddCategoryModal?.() },
    { text: 'Voz', icon: '🎤', color: '#e53e3e', action: () => window.openVoiceModal?.() }
  ];
  
  actions.forEach(actionData => {
    const actionButton = createSimpleActionButton(actionData);
    actionsContainer.appendChild(actionButton);
  });
  
  // Adicionar ao DOM
  document.body.appendChild(fabButton);
  document.body.appendChild(actionsContainer);
  
  // Event listener ULTRA SIMPLES
  fabButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔧 [FAB] Botão clicado');
    
    if (isOpen) {
      closeActions();
    } else {
      openActions();
    }
  });
  
  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (isOpen && !fabButton.contains(e.target) && !actionsContainer.contains(e.target)) {
      closeActions();
    }
  });
}

function createSimpleActionButton({ text, icon, color, action }) {
  const button = document.createElement('button');
  button.innerHTML = `${icon} ${text}`;
  button.type = 'button';
  
  // Estilos simples
  button.style.cssText = `
    background: ${color};
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    min-width: 140px;
  `;
  
  // Click handler simples
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`🔧 [FAB] Ação ${text} executada`);
    
    try {
      if (action) {
        action();
      }
      closeActions();
    } catch (error) {
      console.error(`❌ [FAB] Erro na ação ${text}:`, error);
    }
  });
  
  return button;
}

function openActions() {
  console.log('🔧 [FAB] Abrindo ações...');
  isOpen = true;
  actionsContainer.style.display = 'flex';
}

function closeActions() {
  console.log('🔧 [FAB] Fechando ações...');
  isOpen = false;
  actionsContainer.style.display = 'none';
}

function cleanup() {
  console.log('🧹 [FAB] Limpando...');
  
  if (fabButton && fabButton.parentNode) {
    fabButton.parentNode.removeChild(fabButton);
  }
  
  if (actionsContainer && actionsContainer.parentNode) {
    actionsContainer.parentNode.removeChild(actionsContainer);
  }
  
  fabButton = null;
  actionsContainer = null;
  isOpen = false;
  
  console.log('✅ [FAB] Limpeza concluída');
}

// Expor função de limpeza
window.cleanupFAB = cleanup;

export { cleanup as cleanupFAB };