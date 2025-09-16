// features/ui/UIService.js
import { eventBus } from '@core/events/eventBus.js';

// Função para renderizar FAB
export function renderFAB() {
  console.log('🔧 Renderizando FAB corrigido...');
  const fabContainer = document.getElementById('fab-container');

  if (!fabContainer) {
    console.error('❌ Container FAB não encontrado');
    return;
  }

  console.log('✅ Container FAB encontrado, criando FAB corrigido...');

  try {
    // Limpar container e event listeners antigos
    if (window.currentFAB && window.currentFAB.cleanup) {
      console.log('🧹 Limpando FAB anterior...');
      window.currentFAB.cleanup();
    }

    fabContainer.innerHTML = '';

    // Criar FAB corrigido
    console.log('🔧 Criando FAB corrigido...');
    import('@js/ui/FAB.js').then(({ FAB }) => {
      const fab = FAB();
      console.log('🔧 FAB corrigido criado:', fab);
      fabContainer.appendChild(fab);
      console.log('🔧 FAB corrigido adicionado ao container');

      // Armazenar referência para limpeza
      window.currentFAB = fab;

      console.log('✅ FAB corrigido criado e adicionado ao DOM');

      // Verificar se o FAB está visível e funcionando
      setTimeout(() => {
        const fabMain = document.getElementById('fab-main');
        const fabContainerMain = document.getElementById('fab-container-main');
        const fabActions = document.getElementById('fab-actions');

        if (fabMain) {
          console.log('✅ FAB principal encontrado e visível');
        } else {
          console.error('❌ FAB principal não encontrado');
        }

        if (fabContainerMain) {
          console.log('✅ Container FAB principal encontrado');
        } else {
          console.error('❌ Container FAB principal não encontrado');
        }

        if (fabActions) {
          console.log('✅ Container de ações FAB encontrado');
        } else {
          console.error('❌ Container de ações FAB não encontrado');
        }

        // Verificar botões de ação
        const transactionBtn = document.getElementById('fab-transaction');
        const recorrenteBtn = document.getElementById('fab-recorrente');
        const voiceBtn = document.getElementById('fab-voice');

        console.log('🔧 Verificando botões de ação:');
        console.log('  - Nova Transação:', !!transactionBtn);
        console.log('  - Nova Recorrente:', !!recorrenteBtn);
        console.log('  - Voz:', !!voiceBtn);

        // Verificar funções globais
        console.log('🔧 Verificando funções globais:');
        console.log('  - showAddTransactionModal:', typeof window.showAddTransactionModal === 'function');
        console.log('  - showAddRecorrenteModal:', typeof window.showAddRecorrenteModal === 'function');
        console.log('  - openVoiceModal:', typeof window.openVoiceModal === 'function');
        console.log('  - Snackbar:', typeof window.Snackbar === 'function');

      }, 300);
    });

  } catch (error) {
    console.error('❌ Erro ao criar FAB corrigido:', error);
  }
}

// Função para renderizar bottom navigation
export function renderBottomNav(activeRoute) {
  console.log('🔄 Renderizando bottom navigation para:', activeRoute, 'Hash atual:', window.location.hash);
  const bottomNav = document.getElementById('bottom-nav');
  if (!bottomNav) {
    console.error('❌ Elemento bottom-nav não encontrado');
    return;
  }

  // Se não há botões, monte o bottom-nav e só atualize o estado ativo após a montagem
  if (!bottomNav.querySelector('.nav-btn')) {
    import('@js/ui/BottomNav.js').then(({ BottomNav }) => {
      	  bottomNav.innerHTML = '';
      	  bottomNav.appendChild(BottomNav(activeRoute));
      // Aguarda o próximo tick do event loop para garantir que o DOM foi atualizado
      setTimeout(() => {
        const activeButton = bottomNav.querySelector(`[data-route="${activeRoute}"]`);
        	if (activeButton) {
          activeButton.classList.add('active');
          bottomNav.dataset.activeRoute = activeRoute;
          console.log('✅ Bottom navigation montada e atualizada para:', activeRoute);
          	// Forçar atualização inicial do badge de notificações
          	try { eventBus.emit('notifications:updated', window.appState?.notifications || []); } catch {}
        } else {
          console.warn('⚠️ Botão para rota não encontrado (após montagem):', activeRoute);
          // Fallback: força a montagem do BottomNav novamente
          bottomNav.innerHTML = '';
          import('@js/ui/BottomNav.js').then(({ BottomNav }) => {
            bottomNav.appendChild(BottomNav(activeRoute));
            const retryButton = bottomNav.querySelector(`[data-route="${activeRoute}"]`);
            if (retryButton) {
              retryButton.classList.add('active');
              bottomNav.dataset.activeRoute = activeRoute;
              console.log('✅ Bottom navigation montada via fallback para:', activeRoute);
            } else {
              console.error('❌ Fallback falhou: botão ainda não encontrado para', activeRoute);
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

  // Atualizar botão ativo
  const activeButton = bottomNav.querySelector(`[data-route="${activeRoute}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
    bottomNav.dataset.activeRoute = activeRoute;
    console.log('✅ Bottom navigation atualizada para:', activeRoute);
  } else {
    console.warn('⚠️ Botão para rota não encontrado:', activeRoute);
  }
}

// Função para mostrar loading
export function showLoading(show) {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = show ? 'flex' : 'none';
  }
}

// Função para resetar posição de scroll
export function resetScrollPosition() {
  const mainContent = document.getElementById('app-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
}
