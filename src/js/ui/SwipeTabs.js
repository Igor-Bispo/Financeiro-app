export class SwipeNavigation {
  constructor() {
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartY = 0;
    this.touchEndY = 0;
    this.isSwiping = false;
    this.swipeThreshold = 80; // DistÃ¢ncia mÃ­nima para considerar swipe
    this.tabs = [
      '/dashboard',
      '/transactions',
      '/categories',
      '/analytics',
      '/recorrentes',
      '/notifications',
      '/settings'
    ];
    this.currentTabIndex = 0;
    this.container = null;
    this.swipeIndicator = null;
    this.isEnabled = true;
    this.hasShownInitialHint = false; // Controle para mostrar dica inicial

    this.init();
  }

  init() {
    this.container = document.querySelector('#app-content');
    if (!this.container) {
      return;
    }

    // Verificar se o usuÃ¡rio estÃ¡ logado antes de inicializar
    if (!window.appState?.currentUser) {return;}

    this.createSwipeIndicator();
    this.bindEvents();
    this.updateCurrentTabIndex();

  }

  createSwipeIndicator() {
    // Criar indicador visual de swipe
    this.swipeIndicator = document.createElement('div');
    this.swipeIndicator.id = 'swipe-indicator';
    this.swipeIndicator.innerHTML = `
      <div class="swipe-dots">
        ${this.tabs.map((_, index) => `<div class="swipe-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`).join('')}
      </div>
      <div class="swipe-hint">â† Deslize para navegar â†’</div>
    `;
    this.swipeIndicator.className = 'swipe-indicator';

    // Adicionar estilos
    const style = document.createElement('style');
    style.textContent = `
      .swipe-indicator {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      
      .swipe-indicator.show {
        opacity: 1;
      }
      
      .swipe-dots {
        display: flex;
        gap: 6px;
        justify-content: center;
        margin-bottom: 4px;
      }
      
      .swipe-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
      }
      
      .swipe-dot.active {
        background: white;
        transform: scale(1.2);
      }
      
      .swipe-hint {
        text-align: center;
        font-size: 10px;
        opacity: 0.8;
      }
      
      .swipe-feedback {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1001;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }
      
      .swipe-feedback.show {
        opacity: 1;
      }
      
      .swipe-transition {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      @media (max-width: 768px) {
        .swipe-indicator {
          top: 10px;
          padding: 6px 12px;
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(this.swipeIndicator);
  }

  bindEvents() {
    // Verificar se nÃ£o estÃ¡ na tela de login
    const loginPage = document.getElementById('login-page');
    if (loginPage && loginPage.style.display !== 'none') {return;}

    // Touch events
    this.container.addEventListener(
      'touchstart',
      this.handleTouchStart.bind(this),
      { passive: true }
    );
    this.container.addEventListener(
      'touchmove',
      this.handleTouchMove.bind(this),
      { passive: false }
    );
    this.container.addEventListener(
      'touchend',
      this.handleTouchEnd.bind(this),
      { passive: false }
    );

    // Mouse events para desktop (opcional)
    this.container.addEventListener(
      'mousedown',
      this.handleMouseStart.bind(this)
    );
    this.container.addEventListener(
      'mousemove',
      this.handleMouseMove.bind(this)
    );
    this.container.addEventListener('mouseup', this.handleMouseEnd.bind(this));

    // Keyboard navigation - IMPORTANTE: adicionar ao document para capturar todas as teclas
    document.addEventListener('keydown', this.handleKeydown.bind(this), {
      capture: true
    });
    // Listener leve para mudanÃ§as de rota
    this.observeRouteChanges();
  }

  handleTouchStart(e) {
    if (!this.isEnabled) {return;}

    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.isSwiping = false;

    // NÃ£o prevenir scroll por padrÃ£o - sÃ³ se for swipe horizontal
  }

  handleTouchMove(e) {
    if (!this.isEnabled || !this.touchStartX) {return;}

    // Se o alvo Ã© um elemento interativo (botÃ£o, link, input), nÃ£o interferir na rolagem/clique
    const target = e.target;
    const tag = target.tagName;
    if (['BUTTON','A','INPUT','SELECT','TEXTAREA','LABEL'].includes(tag)) {
      this.isSwiping = false;
      return;
    }

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = Math.abs(currentX - this.touchStartX);
    const deltaY = Math.abs(currentY - this.touchStartY);

    // Determinar se Ã© um swipe horizontal (intenÃ§Ã£o clara) e sÃ³ entÃ£o prevenir scroll
    if (deltaX > deltaY * 1.5 && deltaX > 24) {
      this.isSwiping = true;
      e.preventDefault();
      // Adicionar feedback visual durante o swipe
      this.showSwipeFeedback(deltaX);
    }
  }

  handleTouchEnd(e) {
    if (!this.isEnabled || !this.isSwiping) {return;}

    this.touchEndX = e.changedTouches[0].clientX;
    this.touchEndY = e.changedTouches[0].clientY;

    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Verificar se Ã© um swipe vÃ¡lido
    if (
      Math.abs(deltaX) > this.swipeThreshold &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      this.handleSwipe(deltaX > 0 ? 'right' : 'left');
    } else {
    }

    this.resetSwipe();
  }

  handleMouseStart(e) {
    if (!this.isEnabled || e.button !== 0) {return;} // Apenas botÃ£o esquerdo

    this.touchStartX = e.clientX;
    this.touchStartY = e.clientY;
    this.isSwiping = false;
  }

  handleMouseMove(e) {
    if (!this.isEnabled || !this.touchStartX) {return;}

    const deltaX = Math.abs(e.clientX - this.touchStartX);
    const deltaY = Math.abs(e.clientY - this.touchStartY);

    if (deltaX > deltaY && deltaX > 10) {
      this.isSwiping = true;
    }
  }

  handleMouseEnd(e) {
    if (!this.isEnabled || !this.isSwiping) {return;}

    this.touchEndX = e.clientX;
    this.touchEndY = e.clientY;

    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    if (
      Math.abs(deltaX) > this.swipeThreshold &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      this.handleSwipe(deltaX > 0 ? 'right' : 'left');
    }

    this.resetSwipe();
  }

  handleKeydown(e) {
    // Verificar se nÃ£o estÃ¡ em um input ou textarea
    if (
      e.target.tagName === 'INPUT' ||
      e.target.tagName === 'TEXTAREA' ||
      e.target.contentEditable === 'true'
    ) {
      return;
    }

    if (!this.isEnabled) {return;}

    switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      e.stopPropagation();
      this.navigateToTab(this.currentTabIndex - 1);
      break;
    case 'ArrowRight':
      e.preventDefault();
      e.stopPropagation();
      this.navigateToTab(this.currentTabIndex + 1);
      break;
    default:
      // NÃ£o interceptar ArrowUp/ArrowDown para permitir rolagem natural
      break;
    }
  }

  handleSwipe(direction) {
    this.updateCurrentTabIndex();

    let newIndex = this.currentTabIndex;

    if (direction === 'left' && this.currentTabIndex < this.tabs.length - 1) {
      newIndex = this.currentTabIndex + 1;
    } else if (direction === 'right' && this.currentTabIndex > 0) {
      newIndex = this.currentTabIndex - 1;
    }

    if (newIndex !== this.currentTabIndex) {
      this.navigateToTab(newIndex);
      this.provideHapticFeedback();
    } else {
      this.showSwipeFeedback('edge');
    }
  }

  navigateToTab(index) {
    if (index < 0 || index >= this.tabs.length) {return;}

    const targetTab = this.tabs[index];

    // Animar transiÃ§Ã£o
    this.animateTransition(index);

    // Navegar
    if (window.router) {
      window.router(targetTab);
    } else {
      window.location.hash = targetTab;
    }

    // Atualizar tÃ­tulo da pÃ¡gina
    if (window.updatePageTitle) {
      window.updatePageTitle(targetTab);
    }

    this.currentTabIndex = index;
    this.updateSwipeIndicator();
  }

  animateTransition(targetIndex) {
    const container = this.container;
    const direction = targetIndex > this.currentTabIndex ? 1 : -1;

    // Adicionar classe de transiÃ§Ã£o
    container.classList.add('swipe-transition');

    // Animar entrada
    container.style.transform = `translateX(${direction * 20}px)`;
    container.style.opacity = '0.8';

    setTimeout(() => {
      container.style.transform = 'translateX(0)';
      container.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      container.classList.remove('swipe-transition');
      container.style.transform = '';
      container.style.opacity = '';
    }, 300);
  }

  showSwipeFeedback(type) {
    let message = '';

    switch (type) {
    case 'edge':
      message = this.currentTabIndex === 0 ? 'Primeira aba' : 'Ãšltima aba';
      break;
    default:
      return;
    }

    const feedback = document.createElement('div');
    feedback.className = 'swipe-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);

    setTimeout(() => feedback.classList.add('show'), 10);
    setTimeout(() => {
      feedback.classList.remove('show');
      setTimeout(() => feedback.remove(), 200);
    }, 1000);
  }

  provideHapticFeedback() {
    // Feedback tÃ¡til no mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  updateCurrentTabIndex() {
    const activeTab = document.querySelector('.nav-btn.active');
    if (activeTab) {
      const route = activeTab.getAttribute('data-route');
      const newIndex = this.tabs.indexOf(route);

      // SÃ³ atualizar se o Ã­ndice realmente mudou
      if (newIndex !== this.currentTabIndex) {
        this.currentTabIndex = newIndex;
      }
    }
  }

  updateSwipeIndicator() {
    if (!this.swipeIndicator) {return;}

    // Atualizar dots
    const dots = this.swipeIndicator.querySelectorAll('.swipe-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentTabIndex);
    });

    // Mostrar dica inicial apenas uma vez
    if (!this.hasShownInitialHint) {
      this.hasShownInitialHint = true;
      this.swipeIndicator.classList.add('show');
      setTimeout(() => {
        this.swipeIndicator.classList.remove('show');
      }, 4000); // 4 segundos para a dica inicial
    }
  }

  observeRouteChanges() {
    const handler = () => {
      this.updateCurrentTabIndex();
      this.updateSwipeIndicator();
    };
    window.addEventListener('hashchange', handler);
    // Atualizar uma vez na inicializaÃ§Ã£o
    handler();
  }

  resetSwipe() {
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.isSwiping = false;
  }

  enable() {
    this.isEnabled = true;
    console.log('SwipeNavigation: Habilitado');
  }

  disable() {
    this.isEnabled = false;
    console.log('SwipeNavigation: Desabilitado');
  }

  destroy() {
    if (this.swipeIndicator) {
      this.swipeIndicator.remove();
    }
    console.log('SwipeNavigation: DestruÃ­do');
  }
}

// FunÃ§Ã£o de compatibilidade com cÃ³digo existente
export function enableSwipeNavigation() {
  return new SwipeNavigation();
}

// InstÃ¢ncia global
window.swipeNavigation = null;
