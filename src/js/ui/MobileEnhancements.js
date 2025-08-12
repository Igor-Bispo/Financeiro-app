// Melhorias Mobile Avançadas
class MobileEnhancements {
  constructor() {
    this.isInitialized = false;
    this.orientation = 'portrait';
    this.deviceType = this.detectDeviceType();
    this.touchSupport = this.detectTouchSupport();
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    console.log('📱 Inicializando melhorias mobile...');
    
    // Detectar orientação inicial
    this.detectOrientation();
    
    // Configurar listeners
    this.setupOrientationListener();
    this.setupViewportListener();
    this.setupTouchOptimizations();
    this.setupPerformanceOptimizations();
    
    // Aplicar melhorias iniciais
    this.applyMobileOptimizations();
    
    this.isInitialized = true;
    console.log('✅ Melhorias mobile inicializadas');
  }

  detectDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
    
    if (isTablet) return 'tablet';
    if (isMobile) return 'mobile';
    return 'desktop';
  }

  detectTouchSupport() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  detectOrientation() {
    if (window.innerHeight > window.innerWidth) {
      this.orientation = 'portrait';
    } else {
      this.orientation = 'landscape';
    }
    
    // Adicionar classe ao body
    document.body.classList.remove('orientation-portrait', 'orientation-landscape');
    document.body.classList.add(`orientation-${this.orientation}`);
    
    console.log(`📱 Orientação detectada: ${this.orientation}`);
  }

  setupOrientationListener() {
    // Listener para mudança de orientação
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.detectOrientation();
        this.adjustForOrientation();
      }, 100);
    });

    // Fallback para resize
    window.addEventListener('resize', () => {
      const newOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      if (newOrientation !== this.orientation) {
        this.orientation = newOrientation;
        this.detectOrientation();
        this.adjustForOrientation();
      }
    });
  }

  setupViewportListener() {
    // Ajustar viewport para mobile
    if (this.deviceType === 'mobile') {
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
      }
      
      viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    }
  }

  setupTouchOptimizations() {
    if (!this.touchSupport) return;

    // Melhorar feedback de toque
    document.addEventListener('touchstart', (e) => {
      const target = e.target.closest('button, .btn, .nav-btn, .mobile-btn, .fab');
      if (target) {
        target.classList.add('touch-active');
      }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const target = e.target.closest('button, .btn, .nav-btn, .mobile-btn, .fab');
      if (target) {
        setTimeout(() => {
          target.classList.remove('touch-active');
        }, 150);
      }
    }, { passive: true });

    // Prevenir zoom duplo toque em elementos específicos
    document.addEventListener('touchend', (e) => {
      const target = e.target.closest('button, .btn, .nav-btn, .mobile-btn, .fab, input, select');
      if (target) {
        e.preventDefault();
        target.click();
      }
    });
  }

  setupPerformanceOptimizations() {
    // Otimizar scroll para mobile
    if (this.deviceType === 'mobile') {
      const scrollElements = document.querySelectorAll('.overflow-y-auto, #app-content');
      scrollElements.forEach(element => {
        element.style.webkitOverflowScrolling = 'touch';
        element.style.overscrollBehavior = 'contain';
      });
    }

    // Otimizar animações para dispositivos com baixa performance
    if (this.deviceType === 'mobile') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        document.body.classList.add('reduce-motion');
      }
    }
  }

  adjustForOrientation() {
    const appContent = document.getElementById('app-content');
    const bottomNav = document.querySelector('.bottom-nav');
    const fab = document.querySelector('.fab');

    if (this.orientation === 'landscape' && this.deviceType === 'mobile') {
      // Ajustes para landscape mobile
      if (appContent) {
        appContent.style.paddingBottom = '70px';
      }
      if (bottomNav) {
        bottomNav.style.height = '60px';
      }
      if (fab) {
        fab.style.bottom = '70px';
        fab.style.width = '50px';
        fab.style.height = '50px';
      }
    } else {
      // Ajustes para portrait ou desktop
      if (appContent) {
        appContent.style.paddingBottom = '100px';
      }
      if (bottomNav) {
        bottomNav.style.height = '80px';
      }
      if (fab) {
        fab.style.bottom = '100px';
        fab.style.width = '60px';
        fab.style.height = '60px';
      }
    }

    console.log(`📱 Ajustes aplicados para orientação: ${this.orientation}`);
  }

  applyMobileOptimizations() {
    // Adicionar classes CSS para otimizações
    document.body.classList.add(`device-${this.deviceType}`);
    
    if (this.touchSupport) {
      document.body.classList.add('touch-device');
    }

    // Melhorar área de toque para elementos pequenos
    const smallElements = document.querySelectorAll('.icon-standard, .nav-icon, .btn-icon');
    smallElements.forEach(element => {
      if (element.offsetWidth < 44 || element.offsetHeight < 44) {
        element.style.minWidth = '44px';
        element.style.minHeight = '44px';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
      }
    });

    // Melhorar contraste para mobile
    if (this.deviceType === 'mobile') {
      const lowContrastElements = document.querySelectorAll('.text-gray-400, .text-gray-500');
      lowContrastElements.forEach(element => {
        element.classList.add('mobile-contrast-enhanced');
      });
    }
  }

  // Método para detectar se o dispositivo está em modo escuro
  detectDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Método para ajustar elementos baseado no tema
  adjustForTheme(isDark) {
    if (this.deviceType === 'mobile') {
      const elements = document.querySelectorAll('.mobile-contrast-enhanced');
      elements.forEach(element => {
        if (isDark) {
          element.style.color = '#e5e7eb';
        } else {
          element.style.color = '#374151';
        }
      });
    }
  }

  // Método para otimizar performance em dispositivos lentos
  optimizeForLowEndDevice() {
    // Detectar dispositivos com baixa performance
    const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
    
    if (isLowEnd) {
      document.body.classList.add('low-end-device');
      
      // Reduzir animações
      const style = document.createElement('style');
      style.textContent = `
        .low-end-device * {
          animation-duration: 0.1s !important;
          transition-duration: 0.1s !important;
        }
        .low-end-device .transition-all {
          transition: none !important;
        }
      `;
      document.head.appendChild(style);
      
      console.log('📱 Otimizações para dispositivo de baixa performance aplicadas');
    }
  }

  // Método público para reconfigurar
  reconfigure() {
    this.detectOrientation();
    this.adjustForOrientation();
    this.applyMobileOptimizations();
  }

  // Método para destruir e limpar
  destroy() {
    // Remover listeners e classes
    document.body.classList.remove(
      `device-${this.deviceType}`,
      'touch-device',
      'orientation-portrait',
      'orientation-landscape',
      'low-end-device'
    );
    
    this.isInitialized = false;
    console.log('📱 Melhorias mobile removidas');
  }
}

// Adicionar estilos CSS para as melhorias
const mobileEnhancementStyles = `
  .touch-active {
    transform: scale(0.95) !important;
    opacity: 0.8 !important;
    transition: all 0.1s ease !important;
  }

  .mobile-contrast-enhanced {
    color: #374151 !important;
  }

  .dark .mobile-contrast-enhanced {
    color: #e5e7eb !important;
  }

  .device-mobile .grid-cols-2 {
    grid-template-columns: 1fr !important;
  }

  .device-mobile .flex-row {
    flex-direction: column !important;
  }

  .orientation-landscape.device-mobile #app-content {
    padding-bottom: 70px !important;
  }

  .orientation-portrait.device-mobile #app-content {
    padding-bottom: 100px !important;
  }

  .reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  @supports (padding: max(0px)) {
    .device-mobile .app-container {
      padding-top: max(env(safe-area-inset-top), 0px) !important;
      padding-bottom: max(env(safe-area-inset-bottom), 80px) !important;
      padding-left: max(env(safe-area-inset-left), 0px) !important;
      padding-right: max(env(safe-area-inset-right), 0px) !important;
    }
  }
`;

// Adicionar estilos ao documento
if (!document.getElementById('mobile-enhancement-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'mobile-enhancement-styles';
  styleElement.textContent = mobileEnhancementStyles;
  document.head.appendChild(styleElement);
}

// Exportar classe e instância global
export { MobileEnhancements };
export const mobileEnhancements = new MobileEnhancements();