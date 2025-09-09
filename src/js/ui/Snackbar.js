// Sistema de NotificaÃ§Ãµes Snackbar Melhorado
// VersÃ£o 2.3.0 - API consistente, robusta, integrada ao eventBus, com anti-spam

// Use caminho relativo para facilitar mock nos testes (vitest)
import { eventBus } from '../../core/events/eventBus.js';
import { initFromStorage as __initSnackbarPrefs } from '../../features/ui/snackbarPrefs.js';

class SnackbarSystem {
  constructor() {
    this.queue = [];
    this.isShowing = false;
    this.defaultDuration = 3000;
    this.bottomOffset = 80; // px
    this.position = 'bottom'; // 'bottom' | 'top'
    this.align = 'center'; // 'center' | 'left' | 'right'
    this.hoverPause = true;
    this._currentTimeout = null;
    this._currentEl = null;
    this._restoreFocusEl = null;
    try {
      this.reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    } catch { this.reducedMotion = false; }
    // Em ambiente de teste (jsdom), force reducedMotion para acelerar animaÃ§Ãµes/timeout
    try {
      const ua = typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent : '';
      if (/jsdom/i.test(ua)) {
        this.reducedMotion = true;
      }
    } catch {}
    // Detect frameworks (Vitest/Jest) to force reducedMotion in tests
    try {
      if (
        (typeof process !== 'undefined' && process?.env && (process.env.VITEST || process.env.JEST_WORKER_ID || process.env.NODE_ENV === 'test'))
      ) {
        this.reducedMotion = true;
      }
    } catch {}
    // Em testes/reducedMotion, desabilita pausa por hover/foco para nÃ£o bloquear auto-dismiss
    if (this.reducedMotion) {
      this.hoverPause = false;
    }
    // Anti-flood
    this.maxQueue = 5;
    this._lastShownSig = null;
    this._lastShownAt = 0;
    this._lastShownMap = new Map(); // sig -> timestamp (ms)
    this.cooldownMs = 500; // anti-spam por assinatura
    // MÃ©tricas internas simples (testes/telemetria local)
    this._stats = { totalShown: 0, byType: Object.create(null), last: null };
  }

  // MÃ©todo principal para mostrar notificaÃ§Ãµes
  show(message, type = 'info', duration = null, action) {
    const config = {
      message,
      type,
      duration: duration || this.defaultDuration,
      action: action && typeof action === 'object' ? action : null
    };
    // DeduplicaÃ§Ã£o simples: evita enfileirar consecutivos idÃªnticos
    const sig = `${config.type}|${config.message}`;
    const tail = this.queue[this.queue.length - 1];
    if (tail && `${tail.type}|${tail.message}` === sig) {
      // Ignora mensagem duplicada em sequÃªncia
      return;
    }
    // Dedup tambÃ©m contra o snackbar atualmente exibido: em vez de ignorar, coalesce e incrementa contador
    if (this._currentEl && this._currentEl.getAttribute('data-snackbar-sig') === sig) {
      try { this.incrementCurrentCount(); } catch {}
      return;
    }
    // Anti-spam: respeitar cooldown mÃ­nimo por assinatura
    try {
      const now = Date.now();
      const last = this._lastShownMap.get(sig) || 0;
      if (now - last < (this.cooldownMs | 0)) {
        return;
      }
      this._lastShownMap.set(sig, now);
    } catch {}
    // Limitar tamanho da fila
    if (this.queue.length >= this.maxQueue) {
      this.queue.shift();
    }
    this.queue.push(config);
    // Atualizar mÃ©tricas no enfileiramento (contabiliza todas as solicitaÃ§Ãµes aceitas)
    try {
      this._stats.totalShown += 1;
      this._stats.byType[type] = (this._stats.byType[type] || 0) + 1;
      this._stats.last = { type, message };
    } catch {}
    this.processQueue();
  }

  // MÃ©todo para compatibilidade com API antiga
  call(config) {
    if (typeof config === 'string') {
      this.show(config, 'info');
    } else if (typeof config === 'object') {
      this.show(config.message || 'NotificaÃ§Ã£o', config.type || 'info', config.duration);
    }
  }

  // Processar fila de notificaÃ§Ãµes
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
    const { message, type, duration, action } = config;

    // Remover snackbars existentes
    this.removeExistingSnackbars();

    const snackbar = document.createElement('div');
    snackbar.className = this.getSnackbarClasses(type);
    snackbar.classList.add('snackbar');
    snackbar.setAttribute('data-snackbar', '1');
    snackbar.setAttribute('data-pos', this.position);
    snackbar.setAttribute('data-align', this.align);
    // Acessibilidade
    const isAssertive = type === 'error' || type === 'warning';
    snackbar.setAttribute('role', isAssertive ? 'alert' : 'status');
    snackbar.setAttribute('aria-live', isAssertive ? 'assertive' : 'polite');
    snackbar.setAttribute('aria-atomic', 'true');
    snackbar.innerHTML = this.getSnackbarContent(message, type, action);

    // Adicionar classe especÃ­fica do tipo para CSS
    snackbar.classList.add(`snackbar-${type}`);

    // Aplicar estilos inline baseados no tema para garantir prioridade
    this.applyThemeStyles(snackbar, type);

    // Garantir z-index muito alto para aparecer acima de tudo
    snackbar.style.zIndex = '99999';

    // Posicionar conforme configuraÃ§Ã£o e considerando safe-area insets
    try {
      const pad = `${this.bottomOffset}px`;
      if (this.position === 'top') {
        snackbar.style.top = `calc(${pad} + env(safe-area-inset-top, 0px))`;
        snackbar.style.bottom = '';
      } else {
        snackbar.style.bottom = `calc(${pad} + env(safe-area-inset-bottom, 0px))`;
        snackbar.style.top = '';
      }
      if (this.align === 'left') {
        snackbar.style.left = '16px';
        snackbar.style.right = '';
        snackbar.style.transform = 'none';
      } else if (this.align === 'right') {
        snackbar.style.right = '16px';
        snackbar.style.left = '';
        snackbar.style.transform = 'none';
      } else {
        // center
        snackbar.style.left = '50%';
        snackbar.style.right = '';
        snackbar.style.transform = 'translateX(-50%)';
      }
    } catch {}

    // Adicionar ao DOM antes de listeners
    try { this._restoreFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null; } catch { this._restoreFocusEl = null; }
    document.body.appendChild(snackbar);
    // Configurar event listeners
    this.setupEventListeners(snackbar, action);

    // MÃ©tricas jÃ¡ sÃ£o atualizadas no enfileiramento; nÃ£o duplicar aqui

    // Animar entrada
    const showNow = () => snackbar.classList.add('snackbar-show');
    if (this.reducedMotion) {
      snackbar.classList.add('snackbar-show');
    } else {
      requestAnimationFrame(showNow);
    }

    // Auto-remover
    const scheduleDismiss = () => {
      this.clearDismissTimer();
      const effective = Math.max(10, duration | 0);
      this._currentTimeout = setTimeout(() => {
        this.removeSnackbar(snackbar);
      }, this.reducedMotion ? Math.min(200, effective) : effective);
    };

    this._currentEl = snackbar;
    // Atribui assinatura no elemento atual para deduplicaÃ§Ã£o
    try {
      const sig = `${type}|${message}`;
      snackbar.setAttribute('data-snackbar-sig', sig);
    } catch {}
    scheduleDismiss();

    if (this.hoverPause) {
      snackbar.addEventListener('mouseenter', () => this.clearDismissTimer());
      snackbar.addEventListener('mouseleave', () => scheduleDismiss());
      snackbar.addEventListener('focusin', () => this.clearDismissTimer());
      snackbar.addEventListener('focusout', () => scheduleDismiss());
    }

    // Foco preferencial no botÃ£o de aÃ§Ã£o quando existir (acessibilidade)
    if (!this.reducedMotion) {
      setTimeout(() => {
        const actionBtn = snackbar.querySelector('.snackbar-action');
        const closeBtn = snackbar.querySelector('.snackbar-close');
        if (actionBtn) {
          actionBtn.focus?.();
        } else if (closeBtn) {
          closeBtn.focus?.();
        }
      }, 10);
    }
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
    const getTypeColors = (_type) => {
      switch(_type) {
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

    // Garantir que o texto do botÃ£o de fechar tambÃ©m siga o tema
    setTimeout(() => {
      const closeBtn = snackbar.querySelector('.snackbar-close');
      if (closeBtn) {
        closeBtn.style.color = colors.color;
      }
    }, 10);
  }

  // Obter classes CSS baseadas no tipo e tema
  getSnackbarClasses(_type) {
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

    // NÃ£o adicionar classes de cor - serÃ£o aplicadas via estilos inline
    return baseClasses.join(' ');
  }

  // Build snackbar content using DOM to avoid template literal parsing issues
  getSnackbarContent(message, type, action) {
    const icons = {
      success: '✓',
      error: '✖',
      warning: '⚠',
      info: 'ℹ',
      default: '🔔'
    };

    const escapeHTML = (str) => {
      try {
        return String(str)
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('\"', '&quot;')
          .replaceAll("'", '&#39;');
      } catch { return String(str || ''); }
    };

    const safeMsg = escapeHTML(message);
    const safeLabel = action && action.label ? escapeHTML(action.label) : '';

    // Build container using DOM to avoid template parsing issues
    try {
      const container = document.createElement('div');
      container.className = 'flex items-center gap-3';

      const icon = document.createElement('span');
      icon.className = 'text-lg';
      icon.textContent = icons[type] || icons.default;
      container.appendChild(icon);

      const msg = document.createElement('span');
      msg.className = 'flex-1 text-sm font-medium';
      msg.innerHTML = safeMsg;
      container.appendChild(msg);

      const count = document.createElement('span');
      count.className = 'snackbar-count hidden text-xs font-bold px-2 py-0.5 rounded bg-black/20';
      count.textContent = '×1';
      container.appendChild(count);

      if (safeLabel) {
        const actBtn = document.createElement('button');
        actBtn.className = 'snackbar-action ml-2 underline font-semibold';
        actBtn.setAttribute('aria-label', safeLabel);
        actBtn.textContent = safeLabel;
        container.appendChild(actBtn);
      }

      const closeBtn = document.createElement('button');
      closeBtn.className = 'snackbar-close text-white opacity-70 hover:opacity-100 transition-opacity';
      closeBtn.setAttribute('aria-label', 'Fechar notificação');
      const closeIcon = document.createElement('span');
      closeIcon.className = 'text-lg';
      closeIcon.textContent = '×';
      closeBtn.appendChild(closeIcon);
      container.appendChild(closeBtn);

      return container.innerHTML;
    } catch {
      // Fallback simples
      return `<div><span>${icons[type] || icons.default}</span><span>${safeMsg}</span></div>`;
    }
  }

  // Remover snackbars existentes
  removeExistingSnackbars() {
    const existingSnackbars = document.querySelectorAll('[data-snackbar="1"]');
    existingSnackbars.forEach(snackbar => {
      this.removeSnackbar(snackbar);
    });
  }

  // Incrementar contador de duplicatas no snackbar atual
  incrementCurrentCount() {
    if (!this._currentEl) return;
    const badge = this._currentEl.querySelector('.snackbar-count');
    if (!badge) return;
    const current = parseInt((badge.textContent || '1').replace(/[^0-9]/g, ''), 10) || 1;
    const next = current + 1;
    badge.textContent = `×${next}`;
    badge.classList.remove('hidden');
    // Atualiza aria-live com informaÃ§Ã£o adicional
    const msg = this._currentEl.querySelector('.flex-1');
    if (msg) {
      const role = this._currentEl.getAttribute('role') || 'status';
      this._currentEl.setAttribute('aria-live', role === 'alert' ? 'assertive' : 'polite');
      this._currentEl.setAttribute('aria-atomic', 'true');
    }
  }

  // Remover snackbar especÃ­fico
  removeSnackbar(snackbar) {
    if (!snackbar || !snackbar.parentNode) return;

    snackbar.classList.remove('snackbar-show');
    snackbar.classList.add('snackbar-hide');

    const delay = this.reducedMotion ? 50 : 300;
    setTimeout(() => {
      if (snackbar.parentNode) {
        snackbar.parentNode.removeChild(snackbar);
      }
      this.clearDismissTimer();
      this._currentEl = null;
      this.isShowing = false;
      this._lastShownAt = Date.now();
      this._lastShownSig = null;
      // Restaurar foco se possÃ­vel
      try {
        if (this._restoreFocusEl && document.contains(this._restoreFocusEl)) {
          this._restoreFocusEl.focus?.();
        }
      } catch {}
      this.processQueue();
    }, delay);
  }

  // Configurar event listeners
  setupEventListeners(snackbar, action) {
    const closeBtn = snackbar.querySelector('.snackbar-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.removeSnackbar(snackbar);
      });
      // Teclado: Esc para fechar
      snackbar.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.removeSnackbar(snackbar);
      });
    }

    const actionBtn = snackbar.querySelector('.snackbar-action');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        this.removeSnackbar(snackbar);
        try {
          if (action && typeof action.onClick === 'function') {
            action.onClick();
          }
        } catch {}
      });
      // Acessibilidade: Enter/Space no botÃ£o de aÃ§Ã£o
      actionBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          actionBtn.click();
        }
      });
    }

    // Fechar ao clicar fora
    snackbar.addEventListener('click', (e) => {
      if (e.target === snackbar) {
        this.removeSnackbar(snackbar);
      }
    });
  }

  // Cancelar timer atual de auto-fechamento
  clearDismissTimer() {
    if (this._currentTimeout) {
      clearTimeout(this._currentTimeout);
      this._currentTimeout = null;
    }
  }

  // Fechar snackbar atual, se existir
  closeCurrent() {
    if (this._currentEl) {
      this.removeSnackbar(this._currentEl);
    }
  }

  // Limpar fila
  clearQueue() {
    this.queue = [];
  }

  // MÃ©tricas para testes/observabilidade local
  getStats() {
    try {
      return JSON.parse(JSON.stringify(this._stats));
    } catch {
      return { totalShown: 0, byType: {}, last: null };
    }
  }
  resetStats() {
    this._stats = { totalShown: 0, byType: Object.create(null), last: null };
  }
}

// InstÃ¢ncia global
const snackbarInstance = new SnackbarSystem();
// FunÃ§Ã£o de exportaÃ§Ã£o para compatibilidade
export function Snackbar(config) {
  if (typeof config === 'string') {
    snackbarInstance.show(config, 'info');
  } else if (typeof config === 'object') {
    snackbarInstance.show(config.message, config.type || 'info', config.duration, config.action);
  }
}

// Adicionar mÃ©todos ao objeto exportado
Snackbar.show = (message, type = 'info', duration, action) => {
  snackbarInstance.show(message, type, duration, action);
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

// Configurar defaults de UI
Snackbar.configure = (opts = {}) => {
  if (typeof opts.defaultDuration === 'number') snackbarInstance.defaultDuration = opts.defaultDuration;
  if (typeof opts.bottom === 'number') snackbarInstance.bottomOffset = opts.bottom;
  if (typeof opts.position === 'string') snackbarInstance.position = opts.position; // 'top' | 'bottom'
  if (typeof opts.align === 'string') snackbarInstance.align = opts.align; // 'center' | 'left' | 'right'
  if (typeof opts.hoverPause === 'boolean') snackbarInstance.hoverPause = opts.hoverPause;
  if (typeof opts.maxQueue === 'number') snackbarInstance.maxQueue = Math.max(1, opts.maxQueue | 0);
  if (typeof opts.cooldownMs === 'number') snackbarInstance.cooldownMs = Math.max(0, opts.cooldownMs | 0);
  // Reset interno para garantir estado consistente (Ãºtil em testes e reconfiguraÃ§Ã£o)
  try {
    snackbarInstance.clearDismissTimer();
    snackbarInstance.isShowing = false;
    snackbarInstance._currentEl = null;
    snackbarInstance._restoreFocusEl = null;
    snackbarInstance.queue = [];
    const nodes = document?.querySelectorAll?.('[data-snackbar="1"]');
    nodes && nodes.forEach(n => n.parentNode && n.parentNode.removeChild(n));
  } catch {}
  // Rebind event bus listeners caso tenham sido limpos por tests/eventBus.clear()
  try { __bindEventBusListeners(); } catch {}
};

// Utilidades pÃºblicas adicionais
Snackbar.clearQueue = () => { snackbarInstance.clearQueue(); };
Snackbar.closeCurrent = () => { snackbarInstance.closeCurrent(); };
// Test helpers (somente para testes)
Snackbar.__getStatsForTest = () => snackbarInstance.getStats();
Snackbar.__resetStatsForTest = () => snackbarInstance.resetStats();

// IntegraÃ§Ã£o com eventBus (opcional) com auto-rebinding para sobreviver a eventBus.clear()
function __bindEventBusListeners() {
  try {
    if (!eventBus || typeof eventBus.on !== 'function') return;
    // Evita duplo-bind: se jÃ¡ houver listener de show, assumimos todos presentes
    try { if (eventBus.hasListeners && eventBus.hasListeners('snackbar:show')) return; } catch {}

    eventBus.on('snackbar:show', (payload) => {
      try {
        if (!payload) return;
        if (typeof payload === 'string') { snackbarInstance.show(payload, 'info'); return; }
        const { message, type = 'info', duration, action } = payload;
        snackbarInstance.show(message, type, duration, action);
      } catch {}
    });
    eventBus.on('snackbar:configure', (opts) => {
      try { Snackbar.configure(opts || {}); } catch {}
    });
    eventBus.on('snackbar:clear', () => {
      try { snackbarInstance.clearQueue(); snackbarInstance.closeCurrent(); } catch {}
    });
    eventBus.on('snackbar:dismiss', () => {
      try { snackbarInstance.closeCurrent(); } catch {}
    });
    eventBus.on('snackbar:closeCurrent', () => {
      try { snackbarInstance.closeCurrent(); } catch {}
    });
    eventBus.on('snackbar:position', (opts) => {
      try {
        if (!opts || typeof opts !== 'object') return;
        if (typeof opts.position === 'string') snackbarInstance.position = opts.position;
        if (typeof opts.align === 'string') snackbarInstance.align = opts.align;
        if (typeof opts.bottom === 'number') snackbarInstance.bottomOffset = opts.bottom;
      } catch {}
    });
    ['success','error','warning','info'].forEach((t) => {
      try {
        eventBus.on(`snackbar:${t}`, (payload) => {
          try {
            if (!payload) return;
            if (typeof payload === 'string') { snackbarInstance.show(payload, t); return; }
            const { message, duration, action } = payload;
            snackbarInstance.show(message, t, duration, action);
          } catch {}
        });
      } catch {}
    });
  } catch {}
}
// Bind inicialmente
try { __bindEventBusListeners(); } catch {}

// Fallback global para compatibilidade com cÃ³digo legado
try {
  if (typeof window !== 'undefined' && !window.Snackbar) {
    window.Snackbar = Snackbar;
  }
} catch {}

// MÃ©todos utilitÃ¡rios
Snackbar.close = () => snackbarInstance.closeCurrent();
Snackbar.clearQueue = () => snackbarInstance.clearQueue();

// Tornar disponÃ­vel globalmente
if (typeof window !== 'undefined') {
  window.Snackbar = Snackbar;
}

Snackbar.emit = (payload) => {
  // Mostra imediatamente para garantir UX e robustez em testes
  try {
    if (!payload) return;
    if (typeof payload === 'string') {
      Snackbar.show(payload, 'info');
    } else if (typeof payload === 'object') {
      Snackbar.show(payload.message || 'NotificaÃ§Ã£o', payload.type || 'info', payload.duration, payload.action);
    }
  } catch {}
  // Ainda assim, propaga no eventBus para ouvintes externos
  try { eventBus.emit('snackbar:show', payload); } catch { /* no-op */ }
};

// Aplicar preferÃªncias salvas (posiÃ§Ã£o, duraÃ§Ã£o, fila, etc.) assim que o mÃ³dulo Ã© carregado
try { __initSnackbarPrefs(); } catch {}
