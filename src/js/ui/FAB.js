// FAB (Floating Action Button) - Versão Corrigida
// Resolve bugs: conflitos CSS, problemas de estado, event listeners duplicados, z-index e animações

export function FAB() {
  console.log('🔧 Criando FAB corrigido...');

  // Idempotência: garantir apenas uma instância do FAB no DOM
  const existing = document.getElementById('fab-container-main');
  if (existing) {
    try {
      if (typeof existing.cleanup === 'function') {
        existing.cleanup();
      }
    } catch (e) {
      console.warn('⚠️ Erro ao limpar FAB existente:', e);
    }
    try {
      existing.remove();
      console.log('♻️ FAB existente removido antes de criar novo.');
    } catch (e) {
      console.warn('⚠️ Erro ao remover FAB existente:', e);
    }
  }

  // Estado interno do FAB
  let isOpen = false;
  let isAnimating = false;
  let eventListeners = [];
  let fabInstance = null;

  // Container principal
  const fabContainer = createFabContainer();
  
  // Botão principal
  const mainButton = createMainButton();
  
  // Container de ações
  const actionsContainer = createActionsContainer();
  
  // Botões de ação usando variáveis CSS do tema
  const transactionButton = createActionButton({
    id: 'fab-transaction',
    text: 'Nova Transação',
    icon: '💰',
    color: 'var(--primary-color)',
    action: handleTransactionClick
  });

  const recorrenteButton = createActionButton({
    id: 'fab-recorrente',
    text: 'Nova Recorrente',
    icon: '🔄',
    color: 'var(--secondary-color)',
    action: handleRecorrenteClick
  });

  const voiceButton = createActionButton({
    id: 'fab-voice',
    text: 'Voz',
    icon: '🎤',
    color: 'var(--success-color)',
    action: handleVoiceClick
  });

  // Adicionar botões ao container de ações
  actionsContainer.appendChild(transactionButton);
  actionsContainer.appendChild(recorrenteButton);
  actionsContainer.appendChild(voiceButton);

  // Montar estrutura
  fabContainer.appendChild(actionsContainer);
  fabContainer.appendChild(mainButton);

  // Configurar event listeners
  setupEventListeners();

  // Armazenar instância para limpeza
  fabInstance = {
    container: fabContainer,
    mainButton,
    actionsContainer,
    cleanup: cleanup
  };

  console.log('✅ FAB corrigido criado com sucesso');
  return fabContainer;

  // ===== FUNÇÕES INTERNAS =====

  function createFabContainer() {
    const container = document.createElement('div');
    container.id = 'fab-container-main';
    container.className = 'fab-container-refactored';
    
    // Estilos inline para evitar conflitos
    container.style.cssText = `
      position: fixed !important;
      bottom: 120px !important;
      right: 20px !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-end !important;
      gap: 12px !important;
      pointer-events: auto !important;
      overflow: visible !important;
      visibility: visible !important;
      opacity: 1 !important;
      transform: none !important;
      max-width: 200px !important;
      max-height: none !important;
    `;

    return container;
  }

  function createMainButton() {
    const button = document.createElement('button');
    button.id = 'fab-main';
    button.innerHTML = '+';
    button.type = 'button';
    button.setAttribute('aria-label', 'Abrir menu de ações');
    
    // Estilos inline para evitar conflitos, usando variáveis CSS do tema
    button.style.cssText = `
      width: 64px !important;
      height: 64px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
      color: white !important;
      border: none !important;
      font-size: 32px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      z-index: 10000 !important;
      min-width: 64px !important;
      min-height: 64px !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      outline: none !important;
      position: relative !important;
      transform: rotate(0deg) !important;
    `;

    // Hover effects
    const hoverEffect = () => {
      if (!isOpen && !isAnimating) {
        button.style.transform = 'scale(1.1) rotate(0deg)';
        button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
      }
    };

    const leaveEffect = () => {
      if (!isOpen && !isAnimating) {
        button.style.transform = 'scale(1) rotate(0deg)';
        button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
      }
    };

    button.addEventListener('mouseenter', hoverEffect);
    button.addEventListener('mouseleave', leaveEffect);
    button.addEventListener('touchstart', hoverEffect);
    button.addEventListener('touchend', leaveEffect);

    // Armazenar listeners para limpeza
    eventListeners.push(
      { element: button, type: 'mouseenter', handler: hoverEffect },
      { element: button, type: 'mouseleave', handler: leaveEffect },
      { element: button, type: 'touchstart', handler: hoverEffect },
      { element: button, type: 'touchend', handler: leaveEffect }
    );

    return button;
  }

  function createActionsContainer() {
    const container = document.createElement('div');
    container.id = 'fab-actions';
    
    // Estilos inline para evitar conflitos
    container.style.cssText = `
      display: none !important;
      flex-direction: column !important;
      gap: 12px !important;
      z-index: 9999 !important;
      margin-bottom: 12px !important;
      overflow: visible !important;
      opacity: 0 !important;
      transform: translateY(20px) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      visibility: hidden !important;
      position: relative !important;
      pointer-events: none !important;
      max-height: none !important;
      max-width: 200px !important;
    `;

    return container;
  }

  function createActionButton({ id, text, icon, color, action }) {
    const button = document.createElement('button');
    button.id = id;
    button.innerHTML = `${icon} ${text}`;
    button.type = 'button';
    button.setAttribute('aria-label', text);
    
    // Estilos inline para evitar conflitos, usando variáveis CSS do tema
    button.style.cssText = `
      background: linear-gradient(135deg, ${color}, ${adjustColor(color, -20)}) !important;
      color: var(--text-white) !important;
      padding: 12px 16px !important;
      border-radius: var(--border-radius-lg) !important;
      border: none !important;
      font-size: var(--font-size-sm) !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      min-height: 48px !important;
      min-width: 140px !important;
      max-width: 160px !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
      transition: all var(--transition-normal) !important;
      z-index: 10000 !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      outline: none !important;
      position: relative !important;
      transform: scale(1) !important;
    `;

    // Hover effects usando variáveis CSS do tema
    const hoverEffect = () => {
      if (!isAnimating) {
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
      }
    };

    const leaveEffect = () => {
      if (!isAnimating) {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
      }
    };

    button.addEventListener('mouseenter', hoverEffect);
    button.addEventListener('mouseleave', leaveEffect);
    button.addEventListener('touchstart', hoverEffect);
    button.addEventListener('touchend', leaveEffect);

    // Click handler
    const clickHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(`🔧 Botão ${id} clicado!`);
      
      // Verificar se a função está disponível antes de fechar o FAB
      let functionAvailable = false;
      try {
        if (action) {
          action();
          functionAvailable = true;
        }
      } catch (error) {
        console.error(`❌ Erro ao executar ação do botão ${id}:`, error);
        showError(`Erro ao executar ${text}`);
      }
      
      // Fechar FAB apenas se a função foi executada com sucesso
      if (functionAvailable) {
        closeFAB();
      }
    };

    button.addEventListener('click', clickHandler);

    // Armazenar listeners para limpeza
    eventListeners.push(
      { element: button, type: 'mouseenter', handler: hoverEffect },
      { element: button, type: 'mouseleave', handler: leaveEffect },
      { element: button, type: 'touchstart', handler: hoverEffect },
      { element: button, type: 'touchend', handler: leaveEffect },
      { element: button, type: 'click', handler: clickHandler }
    );

    return button;
  }

  function setupEventListeners() {
    // Toggle FAB
    const toggleHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFAB();
    };

    mainButton.addEventListener('click', toggleHandler);
    eventListeners.push({ element: mainButton, type: 'click', handler: toggleHandler });

    // Fechar ao clicar fora
    const outsideClickHandler = (e) => {
      if (!fabContainer.contains(e.target) && isOpen) {
        closeFAB();
      }
    };

    document.addEventListener('click', outsideClickHandler);
    eventListeners.push({ element: document, type: 'click', handler: outsideClickHandler });

    // Fechar com ESC
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeFAB();
      }
    };

    document.addEventListener('keydown', escapeHandler);
    eventListeners.push({ element: document, type: 'keydown', handler: escapeHandler });

    // Prevenir propagação de eventos do container
    fabContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    eventListeners.push({ element: fabContainer, type: 'click', handler: (e) => e.stopPropagation() });
  }

  function toggleFAB() {
    if (isAnimating) {
      console.log('⚠️ FAB está animando, ignorando clique');
      return;
    }
    
    isAnimating = true;
    console.log('🔧 Alternando FAB:', isOpen ? 'Fechando' : 'Abrindo');
    
    if (!isOpen) {
      openFAB();
    } else {
      closeFAB();
    }
  }

  function openFAB() {
    console.log('🔧 Abrindo FAB...');
    
    // Mostrar container de ações
    actionsContainer.style.display = 'flex';
    actionsContainer.style.visibility = 'visible';
    actionsContainer.style.pointerEvents = 'auto';
    actionsContainer.style.opacity = '0';
    actionsContainer.style.transform = 'translateY(20px)';
    
    // Animar entrada dos botões
    requestAnimationFrame(() => {
      actionsContainer.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      actionsContainer.style.opacity = '1';
      actionsContainer.style.transform = 'translateY(0)';
    });

    // Rotacionar botão principal
    mainButton.style.transform = 'rotate(45deg)';
    
    isOpen = true;
    
    setTimeout(() => {
      isAnimating = false;
    }, 300);
  }

  function closeFAB() {
    console.log('🔧 Fechando FAB...');
    
    // Animar saída dos botões
    actionsContainer.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    actionsContainer.style.opacity = '0';
    actionsContainer.style.transform = 'translateY(20px)';
    actionsContainer.style.pointerEvents = 'none';
    
    // Rotacionar botão principal de volta
    mainButton.style.transform = 'rotate(0deg)';
    
    isOpen = false;
    
    setTimeout(() => {
      actionsContainer.style.display = 'none';
      actionsContainer.style.visibility = 'hidden';
      isAnimating = false;
    }, 300);
  }

  // Função para limpar event listeners
  function cleanup() {
    console.log('🧹 Limpando event listeners do FAB...');
    eventListeners.forEach(({ element, type, handler }) => {
      try {
        element.removeEventListener(type, handler);
      } catch (error) {
        console.warn('⚠️ Erro ao remover event listener:', error);
      }
    });
    eventListeners = [];
    
    // Resetar estado
    isOpen = false;
    isAnimating = false;
    
    console.log('✅ Event listeners do FAB limpos');
  }

  // Expor função de limpeza
  fabContainer.cleanup = cleanup;
  fabContainer.fabInstance = fabInstance;

  return fabContainer;
}

// ===== FUNÇÕES AUXILIARES =====

function adjustColor(color, amount) {
  // Se for uma variável CSS, retornar a variável secundária correspondente
  if (color.startsWith('var(--primary-color)')) {
    return 'var(--secondary-color)';
  } else if (color.startsWith('var(--secondary-color)')) {
    return 'var(--primary-color)';
  } else if (color.startsWith('var(--success-color)')) {
    // Para a cor de sucesso, escurecemos um pouco
    return 'var(--success-color)';
  } else if (color.startsWith('var(')) {
    // Para outras variáveis, retornamos a mesma
    return color;
  }
  
  // Para cores hexadecimais, usamos o método original
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// ===== HANDLERS PARA AS AÇÕES =====

function handleTransactionClick() {
  console.log('🔧 Executando ação: Nova Transação');
  
  // Verificar se a função está disponível
  if (typeof window.showAddTransactionModal === 'function') {
    console.log('✅ Função showAddTransactionModal encontrada');
    try {
      window.showAddTransactionModal();
      return true; // Indica sucesso
    } catch (error) {
      console.error('❌ Erro ao executar showAddTransactionModal:', error);
      showError('Erro ao abrir modal de transação');
      return false;
    }
  } else {
    console.warn('⚠️ Função showAddTransactionModal não disponível');
    showError('Modal de transação não disponível. Tente recarregar a página.');
    return false;
  }
}

function handleRecorrenteClick() {
  console.log('🔧 Executando ação: Nova Recorrente');
  
  // Verificar se a função está disponível
  if (typeof window.showAddRecorrenteModal === 'function') {
    console.log('✅ Função showAddRecorrenteModal encontrada');
    try {
      window.showAddRecorrenteModal();
      return true; // Indica sucesso
    } catch (error) {
      console.error('❌ Erro ao executar showAddRecorrenteModal:', error);
      showError('Erro ao abrir modal de recorrente');
      return false;
    }
  } else {
    console.warn('⚠️ Função showAddRecorrenteModal não disponível');
    showError('Modal de recorrente não disponível. Tente recarregar a página.');
    return false;
  }
}

function handleVoiceClick() {
  console.log('🔧 Executando ação: Voz');
  
  // Verificar se a função está disponível
  if (typeof window.openVoiceModal === 'function') {
    console.log('✅ Função openVoiceModal encontrada');
    try {
      window.openVoiceModal();
      return true; // Indica sucesso
    } catch (error) {
      console.error('❌ Erro ao executar openVoiceModal:', error);
      showError('Erro ao abrir modal de voz');
      return false;
    }
  } else {
    console.warn('⚠️ Função openVoiceModal não disponível');
    showError('Funcionalidade de voz não disponível. Tente recarregar a página.');
    return false;
  }
}

function showError(message) {
  console.error('❌ Erro no FAB:', message);
  
  // Tentar usar Snackbar primeiro
  if (window.Snackbar && typeof window.Snackbar.show === 'function') {
    try {
      window.Snackbar.show(message, 'error');
      return;
    } catch (error) {
      console.warn('⚠️ Erro ao usar Snackbar:', error);
    }
  }
  
  // Fallback para alert
  if (window.alert) {
    alert(message);
  } else {
    console.error('Nenhum sistema de notificação disponível');
  }
}

// ===== FUNÇÕES GLOBAIS PARA CONTROLE EXTERNO =====

let currentFAB = null;

window.toggleFAB = function() {
  const fabContainer = document.getElementById('fab-container-main');
  if (fabContainer) {
    const mainButton = fabContainer.querySelector('#fab-main');
    if (mainButton) {
      mainButton.click();
    }
  }
};

window.closeFAB = function() {
  const fabContainer = document.getElementById('fab-container-main');
  if (fabContainer) {
    const actionsContainer = fabContainer.querySelector('#fab-actions');
    const mainButton = fabContainer.querySelector('#fab-main');
    
    if (actionsContainer && mainButton) {
      actionsContainer.style.display = 'none';
      actionsContainer.style.opacity = '0';
      actionsContainer.style.visibility = 'hidden';
      actionsContainer.style.pointerEvents = 'none';
      mainButton.style.transform = 'rotate(0deg)';
    }
  }
};

window.openFAB = function() {
  const fabContainer = document.getElementById('fab-container-main');
  if (fabContainer) {
    const actionsContainer = fabContainer.querySelector('#fab-actions');
    const mainButton = fabContainer.querySelector('#fab-main');
    
    if (actionsContainer && mainButton) {
      actionsContainer.style.display = 'flex';
      actionsContainer.style.visibility = 'visible';
      actionsContainer.style.opacity = '1';
      actionsContainer.style.transform = 'translateY(0)';
      actionsContainer.style.pointerEvents = 'auto';
      mainButton.style.transform = 'rotate(45deg)';
    }
  }
};

window.cleanupFAB = function() {
  if (currentFAB && currentFAB.cleanup) {
    currentFAB.cleanup();
    currentFAB = null;
  }
};

// Função para verificar estado do FAB
window.checkFABState = function() {
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  const fabMain = document.getElementById('fab-main');
  
  console.log('🔍 Estado do FAB:');
  console.log('  - Container:', !!fabContainer);
  console.log('  - Actions:', !!fabActions);
  console.log('  - Main button:', !!fabMain);
  
  if (fabContainer && fabActions && fabMain) {
    const actionsDisplay = fabActions.style.display;
    const mainTransform = fabMain.style.transform;
    console.log('  - Actions display:', actionsDisplay);
    console.log('  - Main transform:', mainTransform);
  }
  
  return { fabContainer, fabActions, fabMain };
};
