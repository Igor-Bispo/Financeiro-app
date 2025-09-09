// features/ui/UIService.js
import { eventBus } from '@core/events/eventBus.js';

// FunÃ§Ã£o para renderizar FAB
export function renderFAB() {
  console.log('ðŸ”§ Renderizando FAB corrigido...');
  const fabContainer = document.getElementById('fab-container');

  if (!fabContainer) {
    console.error('âŒ Container FAB nÃ£o encontrado');
    return;
  }

  console.log('âœ… Container FAB encontrado, criando FAB corrigido...');

  try {
    // Limpar container e event listeners antigos
    if (window.currentFAB && window.currentFAB.cleanup) {
      console.log('ðŸ§¹ Limpando FAB anterior...');
      window.currentFAB.cleanup();
    }

    fabContainer.innerHTML = '';

    // Criar FAB corrigido
    console.log('ðŸ”§ Criando FAB corrigido...');
    import('@js/ui/FAB.js').then(({ FAB }) => {
      const fab = FAB();
      console.log('ðŸ”§ FAB corrigido criado:', fab);
      fabContainer.appendChild(fab);
      console.log('ðŸ”§ FAB corrigido adicionado ao container');

      // Armazenar referÃªncia para limpeza
      window.currentFAB = fab;

      console.log('âœ… FAB corrigido criado e adicionado ao DOM');

      // Verificar se o FAB estÃ¡ visÃ­vel e funcionando
      setTimeout(() => {
        const fabMain = document.getElementById('fab-main');
        const fabContainerMain = document.getElementById('fab-container-main');
        const fabActions = document.getElementById('fab-actions');

        if (fabMain) {
          console.log('âœ… FAB principal encontrado e visÃ­vel');
        } else {
          console.error('âŒ FAB principal nÃ£o encontrado');
        }

        if (fabContainerMain) {
          console.log('âœ… Container FAB principal encontrado');
        } else {
          console.error('âŒ Container FAB principal nÃ£o encontrado');
        }

        if (fabActions) {
          console.log('âœ… Container de aÃ§Ãµes FAB encontrado');
        } else {
          console.error('âŒ Container de aÃ§Ãµes FAB nÃ£o encontrado');
        }

        // Verificar botÃµes de aÃ§Ã£o
        const transactionBtn = document.getElementById('fab-transaction');
        const recorrenteBtn = document.getElementById('fab-recorrente');
        const voiceBtn = document.getElementById('fab-voice');

        console.log('ðŸ”§ Verificando botÃµes de aÃ§Ã£o:');
        console.log('  - Nova TransaÃ§Ã£o:', !!transactionBtn);
        console.log('  - Nova Recorrente:', !!recorrenteBtn);
        console.log('  - Voz:', !!voiceBtn);

        // Verificar funÃ§Ãµes globais
        console.log('ðŸ”§ Verificando funÃ§Ãµes globais:');
        console.log('  - showAddTransactionModal:', typeof window.showAddTransactionModal === 'function');
        console.log('  - showAddRecorrenteModal:', typeof window.showAddRecorrenteModal === 'function');
        console.log('  - openVoiceModal:', typeof window.openVoiceModal === 'function');
        console.log('  - Snackbar:', typeof window.Snackbar === 'function');

      }, 300);
    });

  } catch (error) {
    console.error('âŒ Erro ao criar FAB corrigido:', error);
  }
}

// FunÃ§Ã£o para renderizar bottom navigation
export function renderBottomNav(activeRoute) {
  console.log('ðŸ”„ Renderizando bottom navigation para:', activeRoute);
  const bottomNav = document.getElementById('bottom-nav');
  if (!bottomNav) {
    console.error('âŒ Elemento bottom-nav nÃ£o encontrado');
    return;
  }

  // Se nÃ£o hÃ¡ botÃµes, monte o bottom-nav e sÃ³ atualize o estado ativo apÃ³s a montagem
  if (!bottomNav.querySelector('.nav-btn')) {
    import('@js/ui/BottomNav.js').then(({ BottomNav }) => {
      	  bottomNav.innerHTML = '';
      	  bottomNav.appendChild(BottomNav(activeRoute));
      // Aguarda o prÃ³ximo tick do event loop para garantir que o DOM foi atualizado
      setTimeout(() => {
        const activeButton = bottomNav.querySelector(`[data-route="${activeRoute}"]`);
        	if (activeButton) {
          activeButton.classList.add('active');
          bottomNav.dataset.activeRoute = activeRoute;
          console.log('âœ… Bottom navigation montada e atualizada para:', activeRoute);
          	// ForÃ§ar atualizaÃ§Ã£o inicial do badge de notificaÃ§Ãµes
          	try { eventBus.emit('notifications:updated', window.appState?.notifications || []); } catch {}
        } else {
          console.warn('âš ï¸ BotÃ£o para rota nÃ£o encontrado (apÃ³s montagem):', activeRoute);
          // Fallback: forÃ§a a montagem do BottomNav novamente
          bottomNav.innerHTML = '';
          import('@js/ui/BottomNav.js').then(({ BottomNav }) => {
            bottomNav.appendChild(BottomNav(activeRoute));
            const retryButton = bottomNav.querySelector(`[data-route="${activeRoute}"]`);
            if (retryButton) {
              retryButton.classList.add('active');
              bottomNav.dataset.activeRoute = activeRoute;
              console.log('âœ… Bottom navigation montada via fallback para:', activeRoute);
            } else {
              console.error('âŒ Fallback falhou: botÃ£o ainda nÃ£o encontrado para', activeRoute);
            }
          });
        }
      }, 0);
    });
    return;
  }

  // Limpar estado ativo anterior
  const activeButtons = bottomNav.querySelectorAll('.nav-btn.active');
  activeButtons.forEach(btn => btn.classList.remove('active'));

  // Atualizar botÃ£o ativo
  const activeButton = bottomNav.querySelector(`[data-route="${activeRoute}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
    bottomNav.dataset.activeRoute = activeRoute;
    console.log('âœ… Bottom navigation atualizada para:', activeRoute);
  } else {
    console.warn('âš ï¸ BotÃ£o para rota nÃ£o encontrado:', activeRoute);
  }
}

// FunÃ§Ã£o para mostrar loading
export function showLoading(show) {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = show ? 'flex' : 'none';
  }
}

// FunÃ§Ã£o para resetar posiÃ§Ã£o de scroll
export function resetScrollPosition() {
  const mainContent = document.getElementById('app-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
}
