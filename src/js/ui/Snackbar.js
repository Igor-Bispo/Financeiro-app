// Sistema de Notificações Snackbar Melhorado
// Versão 2.0.0 - API consistente e robusta

class SnackbarSystem {
  constructor() {
    this.queue = [];
    this.isShowing = false;
    this.defaultDuration = 3000;
  }

  // Método principal para mostrar notificações
  show(message, type = 'info', duration = null) {
    const config = {
      message,
      type,
      duration: duration || this.defaultDuration
    };

    this.queue.push(config);
    this.processQueue();
  }

  // Método para compatibilidade com API antiga
  call(config) {
    if (typeof config === 'string') {
      this.show(config, 'info');
    } else if (typeof config === 'object') {
      this.show(config.message || 'Notificação', config.type || 'info', config.duration);
    }
  }

  // Processar fila de notificações
  processQueue() {
    if (this.isShowing || this.queue.length === 0) {
      return;
    }

    this.isShowing = true;
    const config = this.queue.shift();
    this.createSnackbar(config);
  }

  // Criar elemento snackbar
  createSnackbar(config) {
    const { message, type, duration } = config;

    // Remover snackbars existentes
    this.removeExistingSnackbars();

    const snackbar = document.createElement('div');
    snackbar.className = this.getSnackbarClasses(type);
    snackbar.innerHTML = this.getSnackbarContent(message, type);
    
    // Adicionar classe específica do tipo para CSS
    snackbar.classList.add(`snackbar-${type}`);
    
    // Aplicar estilos inline baseados no tema para garantir prioridade
    this.applyThemeStyles(snackbar, type);
    
    // Garantir z-index muito alto para aparecer acima de tudo
    snackbar.style.zIndex = '99999';
    
    // Posicionar logo acima do rodapé
    snackbar.style.bottom = '80px';

    // Configurar event listeners
    this.setupEventListeners(snackbar);

    // Adicionar ao DOM
    document.body.appendChild(snackbar);

    // Animar entrada
    requestAnimationFrame(() => {
      snackbar.classList.add('snackbar-show');
    });

    // Auto-remover
    setTimeout(() => {
      this.removeSnackbar(snackbar);
    }, duration);
  }

  // Detectar tema atual (claro/escuro)
  getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  // Detectar cor do tema atual (blue/green/purple/orange)
  getCurrentThemeColor() {
    const themeColor = localStorage.getItem('themeColor') || 
                      document.documentElement.getAttribute('data-theme-color') || 
                      'blue';
    return themeColor;
  }

  // Aplicar estilos inline baseados no tema
  applyThemeStyles(snackbar, type) {
    const theme = this.getCurrentTheme();
    const themeColor = this.getCurrentThemeColor();
    
    // Definir cores base para cada tema de cor
    const themeColorPalettes = {
      blue: { primary: '#3B82F6', secondary: '#1E40AF', light: '#DBEAFE' },
      green: { primary: '#10B981', secondary: '#059669', light: '#D1FAE5' },
      purple: { primary: '#8B5CF6', secondary: '#7C3AED', light: '#EDE9FE' },
      orange: { primary: '#F59E0B', secondary: '#D97706', light: '#FEF3C7' }
    };

    const palette = themeColorPalettes[themeColor] || themeColorPalettes.blue;
    
    // Definir cores para cada tipo baseado no tema de cor e claro/escuro
    const getTypeColors = (type) => {
      switch(type) {
        case 'success':
          return theme === 'dark' 
            ? { bg: palette.primary, color: '#ffffff', border: palette.secondary }
            : { bg: palette.secondary, color: '#ffffff', border: palette.primary };
        case 'error':
          return theme === 'dark'
            ? { bg: '#ef4444', color: '#ffffff', border: '#dc2626' }
            : { bg: '#dc2626', color: '#ffffff', border: '#b91c1c' };
        case 'warning':
          return theme === 'dark'
            ? { bg: '#f59e0b', color: '#1f2937', border: '#d97706' }
            : { bg: '#d97706', color: '#ffffff', border: '#b45309' };
        case 'info':
          return theme === 'dark'
            ? { bg: palette.primary, color: '#ffffff', border: palette.secondary }
            : { bg: palette.secondary, color: '#ffffff', border: palette.primary };
        default:
          return theme === 'dark'
            ? { bg: palette.primary, color: '#ffffff', border: palette.secondary }
            : { bg: palette.secondary, color: '#ffffff', border: palette.primary };
      }
    };

    const colors = getTypeColors(type);
    const shadowColor = theme === 'dark' ? '0.4' : '0.3';
    
    // Aplicar estilos inline
    snackbar.style.backgroundColor = colors.bg;
    snackbar.style.color = colors.color;
    snackbar.style.border = `1px solid ${colors.border}`;
    snackbar.style.boxShadow = `0 4px 12px rgba(${colors.bg.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, ${shadowColor})`;
    
    // Garantir que o texto do botão de fechar também siga o tema
    setTimeout(() => {
      const closeBtn = snackbar.querySelector('.snackbar-close');
      if (closeBtn) {
        closeBtn.style.color = colors.color;
      }
    }, 10);
  }

  // Obter classes CSS baseadas no tipo e tema
  getSnackbarClasses(type) {
    const baseClasses = [
      'fixed',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      'px-6',
      'py-3',
      'rounded-lg',
      'shadow-lg',
      'max-w-sm',
      'w-full',
      'mx-4',
      'opacity-0',
      'translate-y-4',
      'transition-all',
      'duration-300',
      'ease-out'
    ];

    // Não adicionar classes de cor - serão aplicadas via estilos inline
    return baseClasses.join(' ');
  }

  // Obter conteúdo HTML do snackbar
  getSnackbarContent(message, type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      default: '💬'
    };

    return `
      <div class="flex items-center gap-3">
        <span class="text-lg">${icons[type] || icons.default}</span>
        <span class="flex-1 text-sm font-medium">${message}</span>
        <button class="snackbar-close text-white opacity-70 hover:opacity-100 transition-opacity">
          <span class="text-lg">×</span>
        </button>
      </div>
    `;
  }

  // Remover snackbars existentes
  removeExistingSnackbars() {
    const existingSnackbars = document.querySelectorAll('.snackbar-show, [class*="snackbar"]');
    existingSnackbars.forEach(snackbar => {
      this.removeSnackbar(snackbar);
    });
  }

  // Remover snackbar específico
  removeSnackbar(snackbar) {
    if (!snackbar || !snackbar.parentNode) return;

    snackbar.classList.remove('snackbar-show');
    snackbar.classList.add('snackbar-hide');

    setTimeout(() => {
      if (snackbar.parentNode) {
        snackbar.parentNode.removeChild(snackbar);
      }
      this.isShowing = false;
      this.processQueue();
    }, 300);
  }

  // Configurar event listeners
  setupEventListeners(snackbar) {
    const closeBtn = snackbar.querySelector('.snackbar-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.removeSnackbar(snackbar);
      });
    }

    // Fechar ao clicar fora
    snackbar.addEventListener('click', (e) => {
      if (e.target === snackbar) {
        this.removeSnackbar(snackbar);
      }
    });
  }
}

// Instância global
const snackbarInstance = new SnackbarSystem();

// Função de exportação para compatibilidade
export function Snackbar(config) {
  if (typeof config === 'string') {
    snackbarInstance.show(config, 'info');
  } else if (typeof config === 'object') {
    snackbarInstance.show(config.message, config.type || 'info', config.duration);
  }
}

// Adicionar métodos ao objeto exportado
Snackbar.show = (message, type = 'info', duration) => {
  snackbarInstance.show(message, type, duration);
};

Snackbar.success = (message, duration) => {
  snackbarInstance.show(message, 'success', duration);
};

Snackbar.error = (message, duration) => {
  snackbarInstance.show(message, 'error', duration);
};

Snackbar.warning = (message, duration) => {
  snackbarInstance.show(message, 'warning', duration);
};

Snackbar.info = (message, duration) => {
  snackbarInstance.show(message, 'info', duration);
};

// Tornar disponível globalmente
if (typeof window !== 'undefined') {
  window.Snackbar = Snackbar;
}
