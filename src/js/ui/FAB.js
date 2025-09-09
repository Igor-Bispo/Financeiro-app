// FAB (Floating Action Button) - VersÃ£o Corrigida
// Resolve bugs: conflitos CSS, problemas de estado, event listeners duplicados, z-index e animaÃ§Ãµes

export function FAB() {
  console.log('ðŸ”§ Criando FAB corrigido...');

  // IdempotÃªncia: garantir apenas uma instÃ¢ncia do FAB no DOM
  const existing = document.getElementById('fab-container-main');
  if (existing) {
    try {
      if (typeof existing.cleanup === 'function') {
        existing.cleanup();
      }
    } catch (e) {
      console.warn('âš ï¸ Erro ao limpar FAB existente:', e);
    }
    try {
      existing.remove();
      console.log('â™»ï¸ FAB existente removido antes de criar novo.');
    } catch (e) {
      console.warn('âš ï¸ Erro ao remover FAB existente:', e);
    }
  }

  // Estado interno do FAB
  let isOpen = false;
  let isAnimating = false;
  let eventListeners = [];
  let fabInstance = null;

  // Container principal
  const fabContainer = createFabContainer();

  // BotÃ£o principal
  const mainButton = createMainButton();

  // Container de aÃ§Ãµes
  const actionsContainer = createActionsContainer();

  // BotÃµes de aÃ§Ã£o usando variÃ¡veis CSS do tema
  const transactionButton = createActionButton({
    id: 'fab-transaction',
    text: 'Nova TransaÃ§Ã£o',
    icon: 'ðŸ’°',
    color: 'var(--primary-color)',
    action: handleTransactionClick
  });

  const recorrenteButton = createActionButton({
    id: 'fab-recorrente',
    text: 'Nova Recorrente',
    icon: 'ðŸ”„',
    color: 'var(--secondary-color)',
    action: handleRecorrenteClick
  });

  const voiceButton = createActionButton({
    id: 'fab-voice',
    text: 'Voz',
    icon: 'ðŸŽ¤',
    color: 'var(--success-color)',
    action: handleVoiceClick
  });

  // Adicionar botÃµes ao container de aÃ§Ãµes
  actionsContainer.appendChild(transactionButton);
  actionsContainer.appendChild(recorrenteButton);
  actionsContainer.appendChild(voiceButton);

  // Montar estrutura
  fabContainer.appendChild(actionsContainer);
  fabContainer.appendChild(mainButton);

  // Configurar event listeners
  setupEventListeners();

  // Armazenar instÃ¢ncia para limpeza
  fabInstance = {
    container: fabContainer,
    mainButton,
    actionsContainer,
    cleanup: cleanup
  };

  console.log('âœ… FAB corrigido criado com sucesso');
  return fabContainer;

  // ===== FUNÃ‡Ã•ES INTERNAS =====

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
    button.setAttribute('aria-label', 'Abrir menu de aÃ§Ãµes');

    // Estilos inline para evitar conflitos, usando variÃ¡veis CSS do tema
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

    // Estilos inline para evitar conflitos, usando variÃ¡veis CSS do tema
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

    // Hover effects usando variÃ¡veis CSS do tema
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
      console.log(`ðŸ”§ BotÃ£o ${id} clicado!`);

      // Verificar se a funÃ§Ã£o estÃ¡ disponÃ­vel antes de fechar o FAB
      let functionAvailable = false;
      try {
        if (action) {
          action();
          functionAvailable = true;
        }
      } catch (error) {
        console.error(`âŒ Erro ao executar aÃ§Ã£o do botÃ£o ${id}:`, error);
        showError(`Erro ao executar ${text}`);
      }

      // Fechar FAB apenas se a funÃ§Ã£o foi executada com sucesso
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

    // Prevenir propagaÃ§Ã£o de eventos do container
    fabContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    eventListeners.push({ element: fabContainer, type: 'click', handler: (e) => e.stopPropagation() });
  }

  function toggleFAB() {
    if (isAnimating) {
      console.log('âš ï¸ FAB estÃ¡ animando, ignorando clique');
      return;
    }

    isAnimating = true;
    console.log('ðŸ”§ Alternando FAB:', isOpen ? 'Fechando' : 'Abrindo');

    if (!isOpen) {
      openFAB();
    } else {
      closeFAB();
    }
  }

  function openFAB() {
    console.log('ðŸ”§ Abrindo FAB...');

    // Mostrar container de aÃ§Ãµes
    actionsContainer.style.display = 'flex';
    actionsContainer.style.visibility = 'visible';
    actionsContainer.style.pointerEvents = 'auto';
    actionsContainer.style.opacity = '0';
    actionsContainer.style.transform = 'translateY(20px)';

    // Animar entrada dos botÃµes
    requestAnimationFrame(() => {
      actionsContainer.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      actionsContainer.style.opacity = '1';
      actionsContainer.style.transform = 'translateY(0)';
    });

    // Rotacionar botÃ£o principal
    mainButton.style.transform = 'rotate(45deg)';

    isOpen = true;

    setTimeout(() => {
      isAnimating = false;
    }, 300);
  }

  function closeFAB() {
    console.log('ðŸ”§ Fechando FAB...');

    // Animar saÃ­da dos botÃµes
    actionsContainer.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    actionsContainer.style.opacity = '0';
    actionsContainer.style.transform = 'translateY(20px)';
    actionsContainer.style.pointerEvents = 'none';

    // Rotacionar botÃ£o principal de volta
    mainButton.style.transform = 'rotate(0deg)';

    isOpen = false;

    setTimeout(() => {
      actionsContainer.style.display = 'none';
      actionsContainer.style.visibility = 'hidden';
      isAnimating = false;
    }, 300);
  }

  // FunÃ§Ã£o para limpar event listeners
  function cleanup() {
    console.log('ðŸ§¹ Limpando event listeners do FAB...');
    eventListeners.forEach(({ element, type, handler }) => {
      try {
        element.removeEventListener(type, handler);
      } catch (error) {
        console.warn('âš ï¸ Erro ao remover event listener:', error);
      }
    });
    eventListeners = [];

    // Resetar estado
    isOpen = false;
    isAnimating = false;

    console.log('âœ… Event listeners do FAB limpos');
  }

  // Expor funÃ§Ã£o de limpeza
  fabContainer.cleanup = cleanup;
  fabContainer.fabInstance = fabInstance;

  return fabContainer;
}

// ===== FUNÃ‡Ã•ES AUXILIARES =====

function adjustColor(color, amount) {
  // Se for uma variÃ¡vel CSS, retornar a variÃ¡vel secundÃ¡ria correspondente
  if (color.startsWith('var(--primary-color)')) {
    return 'var(--secondary-color)';
  } else if (color.startsWith('var(--secondary-color)')) {
    return 'var(--primary-color)';
  } else if (color.startsWith('var(--success-color)')) {
    // Para a cor de sucesso, escurecemos um pouco
    return 'var(--success-color)';
  } else if (color.startsWith('var(')) {
    // Para outras variÃ¡veis, retornamos a mesma
    return color;
  }

  // Para cores hexadecimais, usamos o mÃ©todo original
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// ===== HANDLERS PARA AS AÃ‡Ã•ES =====

function handleTransactionClick() {
  console.log('ðŸ”§ Executando aÃ§Ã£o: Nova TransaÃ§Ã£o');

  // Verificar se a funÃ§Ã£o estÃ¡ disponÃ­vel
  if (typeof window.showAddTransactionModal === 'function') {
    console.log('âœ… FunÃ§Ã£o showAddTransactionModal encontrada');
    try {
      window.showAddTransactionModal();
      return true; // Indica sucesso
    } catch (error) {
      console.error('âŒ Erro ao executar showAddTransactionModal:', error);
      showError('Erro ao abrir modal de transaÃ§Ã£o');
      return false;
    }
  } else {
    console.warn('âš ï¸ FunÃ§Ã£o showAddTransactionModal nÃ£o disponÃ­vel');
    showError('Modal de transaÃ§Ã£o nÃ£o disponÃ­vel. Tente recarregar a pÃ¡gina.');
    return false;
  }
}

function handleRecorrenteClick() {
  console.log('ðŸ”§ Executando aÃ§Ã£o: Nova Recorrente');

  // Verificar se a funÃ§Ã£o estÃ¡ disponÃ­vel
  if (typeof window.showAddRecorrenteModal === 'function') {
    console.log('âœ… FunÃ§Ã£o showAddRecorrenteModal encontrada');
    try {
      window.showAddRecorrenteModal();
      return true; // Indica sucesso
    } catch (error) {
      console.error('âŒ Erro ao executar showAddRecorrenteModal:', error);
      showError('Erro ao abrir modal de recorrente');
      return false;
    }
  } else {
    console.warn('âš ï¸ FunÃ§Ã£o showAddRecorrenteModal nÃ£o disponÃ­vel');
    showError('Modal de recorrente nÃ£o disponÃ­vel. Tente recarregar a pÃ¡gina.');
    return false;
  }
}

function handleVoiceClick() {
  console.log('ðŸ”§ Executando aÃ§Ã£o: Voz');

  // Verificar se a funÃ§Ã£o estÃ¡ disponÃ­vel; caso nÃ£o esteja, carregar dinamicamente o serviÃ§o de voz
  const invoke = async () => {
    if (typeof window.openVoiceModal === 'function') {
      console.log('âœ… FunÃ§Ã£o openVoiceModal encontrada');
      await window.openVoiceModal();
      return true;
    }
    // Tentar carregar do novo serviÃ§o de voz
    try {
      console.log('â„¹ï¸ Carregando serviÃ§o de voz sob demanda...');
      const mod = await import('@features/voice/VoiceService.js');
      if (typeof mod.openVoiceModal === 'function') {
        // Cachear globalmente para prÃ³ximas chamadas
        window.openVoiceModal = mod.openVoiceModal;
        await mod.openVoiceModal();
        return true;
      }
    } catch (e) {
      console.warn('âš ï¸ Falha ao carregar VoiceService:', e);
    }
    // Tentativa alternativa: VoiceSystem legado
    try {
      const vs = await import('./VoiceSystem.js');
      if (typeof window.openVoiceModal === 'function') {
        await window.openVoiceModal();
        return true;
      }
      if (vs && typeof vs.VoiceSystem === 'function') {
        // Inicializar e abrir rapidamente
        const sys = new vs.VoiceSystem();
        await sys.start('transaction');
        return true;
      }
    } catch {}
    return false;
  };

  return invoke().then((ok) => {
    if (!ok) {
      console.warn('âš ï¸ FunÃ§Ã£o openVoiceModal nÃ£o disponÃ­vel');
      showError('Funcionalidade de voz nÃ£o disponÃ­vel. Tente recarregar a pÃ¡gina.');
    }
    return ok;
  }).catch((error) => {
    console.error('âŒ Erro ao abrir modal de voz:', error);
    showError('Erro ao abrir modal de voz');
    return false;
  });
}

function showError(message) {
  console.error('âŒ Erro no FAB:', message);

  // Tentar usar Snackbar primeiro
  if (window.Snackbar && typeof window.Snackbar.show === 'function') {
    try {
      window.Snackbar.show(message, 'error');
      return;
    } catch (error) {
      console.warn('âš ï¸ Erro ao usar Snackbar:', error);
    }
  }

  // Fallback para alert
  if (window.alert) {
    alert(message);
  } else {
    console.error('Nenhum sistema de notificaÃ§Ã£o disponÃ­vel');
  }
}

// ===== FUNÃ‡Ã•ES GLOBAIS PARA CONTROLE EXTERNO =====

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

// FunÃ§Ã£o para verificar estado do FAB
window.checkFABState = function() {
  const fabContainer = document.getElementById('fab-container-main');
  const fabActions = document.getElementById('fab-actions');
  const fabMain = document.getElementById('fab-main');

  console.log('ðŸ” Estado do FAB:');
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
