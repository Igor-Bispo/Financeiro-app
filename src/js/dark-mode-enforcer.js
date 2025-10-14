/**
 * Dark Mode Enforcer - Força contraste em tempo real
 * Aplica estilos dinamicamente para garantir contraste no modo escuro
 */

class DarkModeEnforcer {
  constructor() {
    this.isDarkMode = false;
    this.observer = null;
    this.lastLogTime = 0; // Para controlar logs
    this.init();
  }

  init() {
    console.log('🌙 DarkModeEnforcer inicializado');
    this.checkDarkMode();
    this.setupMutationObserver();
    
    // INJETAR CSS DIRETO NO HEAD
    this.injectDarkTitleCSS();
    
    // EXECUÇÃO INICIAL para corrigir títulos já existentes
    setTimeout(() => {
      console.log('🌙 EXECUÇÃO INICIAL - verificando temas após DOM...');
      this.checkDarkMode();
      if (this.isDarkMode) {
        this.fixDarkTitlesAggressive();
      }
    }, 500);
    
    // LISTENER para mudanças do modo sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      console.log('🌙 SISTEMA MUDOU TEMA - reagindo...');
      this.checkDarkMode();
      this.fixDarkTitlesAggressive();
    });
    
    // LISTENER para mudanças de classes no body (ThemeService)
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          console.log('🌙 BODY CLASS MUDOU - verificando tema...');
          this.checkDarkMode();
          if (this.isDarkMode) {
            this.fixDarkTitlesAggressive();
          }
        }
      });
    });
    
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    this.forceDarkModeStyles();
    
    // Reaplica estilos apenas quando necessário, não constantemente
    // setInterval removido para evitar execução excessiva
  }

  checkDarkMode() {
    // Detecção MÚLTIPLA para capturar todos os cenários
    const hasMainDarkClass = document.documentElement.classList.contains('dark');
    const hasBodyDarkClass = document.body.classList.contains('dark');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // NOVA: Detectar se body tem classe theme-dark (ThemeService)
    const hasThemeDarkClass = document.body.classList.contains('theme-dark');
    
    // NOVA: Verificar se há elementos com tema dark no DOM
    const hasDarkThemedElements = document.querySelector('.theme-dark, .dark-theme, [data-theme="dark"]') !== null;

    // COMBINA todas as detecções possíveis
    this.isDarkMode = systemPrefersDark || hasMainDarkClass || hasBodyDarkClass || hasThemeDarkClass || hasDarkThemedElements;

    console.log('🌙 DETECÇÃO MODO ESCURO (COMPLETA):', {
      'Sistema prefere escuro': systemPrefersDark,
      'HTML tem .dark': hasMainDarkClass,
      'BODY tem .dark': hasBodyDarkClass,
      'BODY tem .theme-dark': hasThemeDarkClass,
      'Elementos com tema dark': hasDarkThemedElements,
      'RESULTADO FINAL': this.isDarkMode
    });
  }

  setupMutationObserver() {
    let isUpdating = false;
    const observer = new MutationObserver((mutations) => {
      // Evita loops infinitos - ignora mudanças causadas pelo próprio enforcer
      if (isUpdating) return;
      
      let needsUpdate = false;
      mutations.forEach((mutation) => {
        // Ignora mudanças de estilo que criamos
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          return;
        }
        if (mutation.type === 'childList' ||
            (mutation.type === 'attributes' && mutation.attributeName === 'class')) {
          needsUpdate = true;
        }
      });
      
      if (needsUpdate) {
        isUpdating = true;
        setTimeout(() => {
          this.forceDarkModeStyles();
          isUpdating = false;
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  forceDarkModeStyles() {
    if (!this.isDarkMode) return;

    // Log reduzido para evitar spam no console
    if (!this.lastLogTime || Date.now() - this.lastLogTime > 5000) {
      console.log('🔥 Aplicando estilos do modo escuro (modo agressivo)...');
      this.lastLogTime = Date.now();
    }

    // CORREÇÃO AGRESSIVA: Forçar títulos claros PRIMEIRO
    this.fixDarkTitlesAggressive();

    // Só força fundos claros que NÃO têm classe dark mode adequada
    const elementsToFix = document.querySelectorAll('.dark .bg-white:not([class*="dark:"]), .dark .bg-gray-50:not([class*="dark:"]), .dark .bg-gray-100:not([class*="dark:"])');
    elementsToFix.forEach(el => {
      // Só aplicar se não tiver cor de fundo dark adequada
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.backgroundColor === 'rgb(255, 255, 255)' ||
          computedStyle.backgroundColor === 'rgb(249, 250, 251)' ||
          computedStyle.backgroundColor === 'rgb(243, 244, 246)') {
        el.style.setProperty('background-color', '#2d3748', 'important');
        el.style.setProperty('border-color', '#4a5568', 'important');
      }
    });

    // Só aplicar estilos de botão se necessário
    this.forceButtonStylesIntelligent();

    console.log('✅ Estilos agressivos aplicados:', {
      backgrounds: elementsToFix.length
    });
  }

  forceButtonStylesIntelligent() {
    if (!this.isDarkMode) return;

    console.log('🔘 Aplicando estilos inteligentes de botões...');

    // PRESERVAR animações e transições existentes
    // Só aplicar cores mínimas necessárias, nunca sobrescrever transforms, transitions

    // Só corrigir botões que realmente precisam (não têm dark mode adequado)
    const problematicButtons = document.querySelectorAll('.dark button:not([class*="dark:"]):not([id^="fab-"]):not(#fab-main)');
    let buttonCount = 0;

    problematicButtons.forEach(btn => {
      const computedStyle = window.getComputedStyle(btn);
      const bgColor = computedStyle.backgroundColor;
      
      // Só aplicar se o fundo estiver muito claro (branco/cinza claro)
      if (bgColor === 'rgb(255, 255, 255)' ||
          bgColor === 'rgb(243, 244, 246)' ||
          bgColor === 'rgb(249, 250, 251)') {
        
        // Aplicar APENAS cor de fundo - preservar tudo mais
        btn.style.setProperty('background-color', '#4a5568', 'important');
        btn.style.setProperty('color', '#ffffff', 'important');
        
        // NUNCA remover ou sobrescrever:
        // - transform (animações)
        // - transition (suavidade)
        // - border-radius (formato)
        // - gradients (se existirem)
        
        buttonCount++;
      }
    });

    // Botões de tema de cores - aplicar inteligentemente
    this.forceColorThemeButtonsIntelligent();

    console.log('✅ Estilos inteligentes aplicados:', {
      buttons: buttonCount
    });
  }

  forceColorThemeButtonsIntelligent() {
    if (!this.isDarkMode) return;

    console.log('🎨 Aplicando cores inteligentes dos botões de tema...');

    const colorThemeButtons = document.querySelectorAll('.dark .color-theme-btn');
    let themeButtonCount = 0;

    colorThemeButtons.forEach(btn => {
      const theme = btn.getAttribute('data-theme');
      
      // PRESERVAR: transform, transition, hover states, active states
      // Só aplicar cores se necessário
      
      switch(theme) {
        case 'blue':
          // Só aplicar se não tiver cor azul adequada
          if (!btn.style.backgroundColor || btn.style.backgroundColor === 'rgb(255, 255, 255)') {
            btn.style.setProperty('background-color', '#3b82f6', 'important');
            btn.style.setProperty('border-color', '#3b82f6', 'important');
          }
          break;
        case 'green':
          if (!btn.style.backgroundColor || btn.style.backgroundColor === 'rgb(255, 255, 255)') {
            btn.style.setProperty('background-color', '#10b981', 'important');
            btn.style.setProperty('border-color', '#10b981', 'important');
          }
          break;
        case 'purple':
          if (!btn.style.backgroundColor || btn.style.backgroundColor === 'rgb(255, 255, 255)') {
            btn.style.setProperty('background-color', '#8b5cf6', 'important');
            btn.style.setProperty('border-color', '#8b5cf6', 'important');
          }
          break;
        case 'orange':
          if (!btn.style.backgroundColor || btn.style.backgroundColor === 'rgb(255, 255, 255)') {
            btn.style.setProperty('background-color', '#f59e0b', 'important');
            btn.style.setProperty('border-color', '#f59e0b', 'important');
          }
          break;
        default:
          // Não forçar nada
          break;
      }
      
      // NUNCA sobrescrever transform/transition - deixar CSS natural fazer animações
      
      themeButtonCount++;
    });

    console.log('✅ Cores inteligentes aplicadas:', {
      themeButtons: themeButtonCount
    });
  }

  fixDarkTitles() {
    if (!this.isDarkMode) return;

    console.log('📝 Corrigindo títulos escuros...');

    // Encontrar TODOS os títulos no modo escuro, independente das classes
    const allTitles = document.querySelectorAll('.dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6, .dark .card-title, .dark [class*="font-bold"], .dark [class*="font-semibold"]');
    let titleCount = 0;

    allTitles.forEach(title => {
      const computedStyle = window.getComputedStyle(title);
      const textColor = computedStyle.color;
      
      // Se a cor for muito escura (independente da classe), clarear
      if (textColor === 'rgb(0, 0, 0)' ||          // preto
          textColor === 'rgb(31, 41, 55)' ||       // text-gray-900
          textColor === 'rgb(55, 65, 81)' ||       // text-gray-800
          textColor === 'rgb(75, 85, 99)' ||       // text-gray-700
          textColor === 'rgb(107, 114, 128)' ||    // text-gray-600
          textColor === 'rgb(17, 24, 39)' ||       // text-gray-900 (darker)
          textColor === 'rgb(31, 41, 55)') {       // text-gray-800 (duplicate for safety)
        
        title.style.setProperty('color', '#f9fafb', 'important'); // Branco suave
        titleCount++;
      }
    });

    // TAMBÉM corrigir títulos específicos que podem estar sendo perdidos
    const specificTitles = document.querySelectorAll('.dark .text-lg, .dark .text-xl, .dark .text-2xl, .dark .text-3xl');
    specificTitles.forEach(title => {
      const computedStyle = window.getComputedStyle(title);
      const textColor = computedStyle.color;
      
      if (textColor === 'rgb(0, 0, 0)' ||
          textColor === 'rgb(31, 41, 55)' ||
          textColor === 'rgb(55, 65, 81)') {
        title.style.setProperty('color', '#f9fafb', 'important');
        titleCount++;
      }
    });

    console.log('✅ Títulos corrigidos:', titleCount);
  }

  fixDarkTitlesAggressive() {
    if (!this.isDarkMode) return;

    console.log('🔥 CORREÇÃO AGRESSIVA: Forçando títulos claros (MODO SISTEMA)...');

    // FORÇA TODOS os textos que podem ser títulos - SEM EXCEÇÕES
    // FUNCIONA independente de classe .dark (para modo sistema)
    const allPossibleTitles = document.querySelectorAll(`
      h1, h2, h3, h4, h5, h6,
      .card-title,
      .section-title,
      [class*="font-bold"],
      [class*="font-semibold"],
      [class*="text-lg"],
      [class*="text-xl"],
      [class*="text-2xl"],
      [class*="text-3xl"],
      .text-gray-900,
      .text-gray-800,
      .text-gray-700,
      .text-gray-600
    `);

    let forcedCount = 0;

    allPossibleTitles.forEach(element => {
      // FORÇAR cor branca - sem verificar cor atual
      element.style.setProperty('color', '#ffffff', 'important');
      forcedCount++;
    });

    // TAMBÉM forçar elementos específicos por estrutura
    const cardHeaders = document.querySelectorAll('.card-header *, .card-body h1, .card-body h2, .card-body h3');
    cardHeaders.forEach(header => {
      header.style.setProperty('color', '#ffffff', 'important');
      forcedCount++;
    });

    console.log('🔥 FORÇADOS:', forcedCount, 'títulos para branco (MODO SISTEMA)');
  }

  injectDarkTitleCSS() {
    console.log('💉 Injetando CSS direto no HEAD (MODO SISTEMA)...');
    
    // Remover estilo anterior se existir
    const existingStyle = document.getElementById('dark-title-enforcer');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Criar novo estilo CSS
    const style = document.createElement('style');
    style.id = 'dark-title-enforcer';
    style.textContent = `
      /* FORÇA TÍTULOS BRANCOS - FUNCIONA COM CLASSE .dark OU MODO SISTEMA */
      @media (prefers-color-scheme: dark) {
        h1, h2, h3, h4, h5, h6,
        .card-title, .section-title,
        [class*="font-bold"], [class*="font-semibold"],
        [class*="text-lg"], [class*="text-xl"], [class*="text-2xl"], [class*="text-3xl"],
        .text-gray-900, .text-gray-800, .text-gray-700, .text-gray-600 {
          color: #ffffff !important;
        }
        
        /* FORÇA TÍTULOS EM CARDS ESPECÍFICOS */
        .card-header h1, .card-header h2, .card-header h3,
        .card-body h1, .card-body h2, .card-body h3,
        .bg-white h1, .bg-white h2, .bg-white h3,
        .bg-gray-50 h1, .bg-gray-50 h2, .bg-gray-50 h3 {
          color: #ffffff !important;
        }
      }
      
      /* TAMBÉM funciona com classe .dark (backup) */
      .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6,
      .dark .card-title, .dark .section-title,
      .dark [class*="font-bold"], .dark [class*="font-semibold"],
      .dark [class*="text-lg"], .dark [class*="text-xl"], .dark [class*="text-2xl"], .dark [class*="text-3xl"],
      .dark .text-gray-900, .dark .text-gray-800, .dark .text-gray-700, .dark .text-gray-600 {
        color: #ffffff !important;
      }
    `;

    // Adicionar ao head
    document.head.appendChild(style);
    console.log('✅ CSS para MODO SISTEMA injetado com sucesso');
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Inicializar quando o DOM estiver pronto
console.log('🚀 Dark Mode Enforcer SCRIPT CARREGADO');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM READY - Iniciando DarkModeEnforcer');
    new DarkModeEnforcer();
  });
} else {
  console.log('🚀 DOM JÁ READY - Iniciando DarkModeEnforcer IMEDIATAMENTE');
  new DarkModeEnforcer();
}

// TAMBÉM executar após 1 segundo para garantir
setTimeout(() => {
  console.log('🚀 TIMEOUT - Executando DarkModeEnforcer de backup');
  if (document.body.classList.contains('dark')) {
    new DarkModeEnforcer();
  }
}, 1000);

export default DarkModeEnforcer;
