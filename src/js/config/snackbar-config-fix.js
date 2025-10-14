// Sistema de configuração do Snackbar completamente refatorado
// Abordagem direta e simples para garantir funcionamento

class SnackbarConfigManager {
  constructor() {
    this.config = {
      duration: 3000,
      distance: 80,
      position: 'bottom',
      align: 'center',
      maxQueue: 5,
      cooldown: 500,
      hoverPause: true
    };

    this.loadFromStorage();
    this.applyToSnackbar();
  }

  loadFromStorage() {
    // Carregar configurações do localStorage
    this.config.duration = parseInt(localStorage.getItem('toastDuration')) || 3000;
    this.config.distance = parseInt(localStorage.getItem('toastDistance')) || 80;
    this.config.position = localStorage.getItem('toastPosition') || 'bottom';
    this.config.align = localStorage.getItem('toastAlignment') || localStorage.getItem('toastAlign') || 'center';
    this.config.maxQueue = parseInt(localStorage.getItem('toastMaxQueue')) || 5;
    this.config.cooldown = parseInt(localStorage.getItem('toastAntiSpam')) || parseInt(localStorage.getItem('toastCooldown')) || 500;
    this.config.hoverPause = localStorage.getItem('toast_hover_pause') === 'true';

    // Mapear valores
    this.config.position = this.mapPosition(this.config.position);
    this.config.align = this.mapAlign(this.config.align);

    console.log('[SnackbarConfig] Configurações carregadas:', this.config);
  }

  mapPosition(position) {
    if (position === 'inferior') return 'bottom';
    if (position === 'superior') return 'top';
    return position;
  }

  mapAlign(align) {
    if (align === 'centro') return 'center';
    if (align === 'esquerda') return 'left';
    if (align === 'direita') return 'right';
    return align;
  }

  applyToSnackbar() {
    if (!window.SnackbarInstance) {
      console.warn('[SnackbarConfig] SnackbarInstance não disponível');
      return;
    }

    const instance = window.SnackbarInstance;

    // Aplicar configurações diretamente na instância
    instance.defaultDuration = this.config.duration;
    instance.bottomOffset = this.config.distance;
    instance.position = this.config.position;
    instance.align = this.config.align;
    instance.maxQueue = this.config.maxQueue;
    instance.cooldownMs = this.config.cooldown;
    instance.hoverPause = this.config.hoverPause;

    console.log('[SnackbarConfig] Configurações aplicadas na instância:', {
      defaultDuration: instance.defaultDuration,
      bottomOffset: instance.bottomOffset,
      position: instance.position,
      align: instance.align,
      maxQueue: instance.maxQueue,
      cooldownMs: instance.cooldownMs,
      hoverPause: instance.hoverPause
    });
  }

  updateConfig(key, value) {
    this.config[key] = value;
    this.saveToStorage();
    this.applyToSnackbar();
  }

  saveToStorage() {
    // Salvar no localStorage
    localStorage.setItem('toastDuration', this.config.duration);
    localStorage.setItem('toastDistance', this.config.distance);
    localStorage.setItem('toastPosition', this.config.position);
    localStorage.setItem('toastAlignment', this.config.align);
    localStorage.setItem('toastMaxQueue', this.config.maxQueue);
    localStorage.setItem('toastAntiSpam', this.config.cooldown);
    localStorage.setItem('toast_hover_pause', this.config.hoverPause);

    console.log('[SnackbarConfig] Configurações salvas no localStorage');
  }

  test() {
    console.log('[SnackbarConfig] Testando configurações...');

    // Aplicar configurações antes de testar
    this.applyToSnackbar();

    // Testar com diferentes tipos
    if (window.Snackbar) {
      window.Snackbar.info('Teste INFO - Configurações aplicadas!');
      setTimeout(() => {
        window.Snackbar.success('Teste SUCCESS - Segunda notificação!');
      }, 100);
      setTimeout(() => {
        window.Snackbar.warning('Teste WARNING - Terceira notificação!');
      }, 200);
    }
  }

  reset() {
    this.config = {
      duration: 3000,
      distance: 80,
      position: 'bottom',
      align: 'center',
      maxQueue: 5,
      cooldown: 500,
      hoverPause: true
    };

    this.saveToStorage();
    this.applyToSnackbar();

    console.log('[SnackbarConfig] Configurações resetadas para padrão');
  }
}

// Instância global
let snackbarConfigManager = null;

// Função para inicializar o gerenciador
function initSnackbarConfig() {
  if (!snackbarConfigManager) {
    snackbarConfigManager = new SnackbarConfigManager();
    window.SnackbarConfigManager = snackbarConfigManager;
    console.log('[SnackbarConfig] Gerenciador inicializado');
  }
  return snackbarConfigManager;
}

// Função para aplicar configurações (usada pelos handlers)
function applySnackbarConfig() {
  const manager = initSnackbarConfig();
  manager.loadFromStorage();
  manager.applyToSnackbar();
}

// Função para testar configurações
function testSnackbarConfig() {
  const manager = initSnackbarConfig();
  manager.test();
}

// Função para resetar configurações
function resetSnackbarConfig() {
  const manager = initSnackbarConfig();
  manager.reset();
}

// Exportar funções
window.applySnackbarConfig = applySnackbarConfig;
window.testSnackbarConfig = testSnackbarConfig;
window.resetSnackbarConfig = resetSnackbarConfig;

// Inicializar automaticamente quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSnackbarConfig);
} else {
  initSnackbarConfig();
}

console.log('[SnackbarConfig] Sistema de configuração carregado');
