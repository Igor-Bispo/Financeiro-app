// features/theme/ThemeService.js
import { eventBus } from '@core/events/eventBus.js';

// Função para configurar toggle de tema
export function setupThemeToggle() {
  console.log('🎨 Configurando toggle de tema...');

  // Verificar se document está disponível (pode não estar em ambiente de teste)
  if (typeof document === 'undefined') {
    console.warn('⚠️ Document não disponível - pulando configuração de toggle de tema');
    return;
  }

  const button = document.getElementById('theme-toggle-btn');
  if (!button) {
    // Não há botão global; OK fora da aba Configurações
    applyCurrentTheme();
    return;
  }

  // Marcar como configurado para evitar duplicação
  if (window.__themeToggleWired) {
    console.log('⏭️ Toggle de tema já configurado');
    return;
  }

  window.__themeToggleWired = true;

  // Configurar evento de clique
  button.addEventListener('click', () => {
    console.log('🎨 Toggle de tema clicado');
    toggleTheme();
  });

  // Aplicar tema inicial
  applyCurrentTheme();

  console.log('✅ Toggle de tema configurado');
}

// Função para alternar tema
export function toggleTheme() {
  try {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    console.log('🎨 Alternando tema:', { de: currentTheme, para: newTheme });

    // Salvar no localStorage
    localStorage.setItem('theme', newTheme);

    // Aplicar tema
    applyTheme(newTheme);

    // Emitir evento
    eventBus.emit('theme:changed', newTheme);

    // Atualizar ícone do botão
    updateThemeButtonIcon(newTheme);

    console.log('✅ Tema alterado para:', newTheme);

  } catch (error) {
    console.error('❌ Erro ao alternar tema:', error);
  }
}

// Função para aplicar tema
export function applyTheme(theme) {
  try {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Aplicar classes CSS específicas
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.body.classList.add(`theme-${theme}`);

    // Forçar aplicação do tema em todos os elementos
    forceThemeApplication(theme);

    console.log('✅ Tema aplicado:', theme);

  } catch (error) {
    console.error('❌ Erro ao aplicar tema:', error);
  }
}

// Função para forçar aplicação do tema em todos os elementos
function forceThemeApplication(theme) {
  try {
    // Forçar reflow em elementos com classes dark:
    const darkElements = document.querySelectorAll('[class*="dark:"]');
    darkElements.forEach(element => {
      element.offsetHeight; // Força reflow
    });

    // Aplicar tema em elementos específicos que podem não estar respondendo
    const themeElements = document.querySelectorAll([
      '.u-card',
      '.u-btn',
      '.u-input',
      '.tab-container',
      '.tab-header',
      '.tab-content',
      '.modal-content',
      '.bottom-nav',
      '.card-resumo',
      '.list-item'
    ].join(', '));

    themeElements.forEach(element => {
      element.offsetHeight; // Força reflow
    });

    // Forçar atualização do CSS customizado
    const style = document.createElement('style');
    style.textContent = `
      :root.dark {
        --bg-primary: #1f2937 !important;
        --bg-secondary: #111827 !important;
        --text-primary: #f9fafb !important;
        --text-secondary: #d1d5db !important;
        --border-color: #374151 !important;
      }
      :root.light {
        --bg-primary: #ffffff !important;
        --bg-secondary: #f9fafb !important;
        --text-primary: #111827 !important;
        --text-secondary: #6b7280 !important;
        --border-color: #e5e7eb !important;
      }
    `;

    // Remover estilo anterior se existir
    const existingStyle = document.getElementById('force-theme-style');
    if (existingStyle) {
      existingStyle.remove();
    }

    style.id = 'force-theme-style';
    document.head.appendChild(style);

    console.log('🎨 Tema forçado em todos os elementos:', theme);
  } catch (error) {
    console.error('❌ Erro ao forçar aplicação do tema:', error);
  }
}

// Função para detectar preferência do sistema
function detectSystemPreference() {
  try {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('🔍 Sistema em modo escuro:', isSystemDark);
    return isSystemDark ? 'dark' : 'light';
  } catch (error) {
    console.warn('⚠️ Não foi possível detectar preferência do sistema:', error);
    return 'light';
  }
}

// Função para aplicar tema atual
export function applyCurrentTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = detectSystemPreference();

    console.log('🎨 Aplicando tema atual:', {
      temaSalvo: savedTheme,
      preferenciaSistema: systemPreference,
      sistemaEscuro: window.matchMedia('(prefers-color-scheme: dark)').matches
    });

    // Se não há tema salvo, usar preferência do sistema
    // Se há tema salvo, usar o tema salvo (ignorar sistema)
    const themeToApply = savedTheme || systemPreference;

    console.log('🎯 Tema a ser aplicado:', themeToApply);

    applyTheme(themeToApply);
    updateThemeButtonIcon(themeToApply);

    console.log('✅ Tema atual aplicado:', themeToApply, {
      salvo: savedTheme,
      sistema: systemPreference,
      aplicado: themeToApply
    });

  } catch (error) {
    console.error('❌ Erro ao aplicar tema atual:', error);
  }
}

// Função para atualizar ícone do botão
function updateThemeButtonIcon(theme) {
  try {
    const button = document.getElementById('theme-toggle-btn');
    if (!button) return;

    const icon = button.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      icon.setAttribute('title', theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
    }

  } catch (error) {
    console.error('❌ Erro ao atualizar ícone do tema:', error);
  }
}

// Função para aplicar modo compacto
export function applyCompactMode() {
  try {
    const isCompact = localStorage.getItem('compactMode') === 'true';

    if (isCompact) {
      document.body.classList.add('compact-mode');
      console.log('✅ Modo compacto aplicado');
    } else {
      document.body.classList.remove('compact-mode');
      console.log('✅ Modo normal aplicado');
    }

  } catch (error) {
    console.error('❌ Erro ao aplicar modo compacto:', error);
  }
}

// Função para alternar modo compacto
export function toggleCompactMode() {
  try {
    const currentMode = localStorage.getItem('compactMode') === 'true';
    const newMode = !currentMode;

    localStorage.setItem('compactMode', newMode.toString());
    applyCompactMode();

    // Emitir evento
    eventBus.emit('compactMode:changed', newMode);

    console.log('✅ Modo compacto alterado para:', newMode);

  } catch (error) {
    console.error('❌ Erro ao alternar modo compacto:', error);
  }
}

// Função para obter tema atual
export function getCurrentTheme() {
  return localStorage.getItem('theme') || 'light';
}

// Função para obter modo compacto atual
export function getCurrentCompactMode() {
  return localStorage.getItem('compactMode') === 'true';
}

// Função para configurar listener de mudança de preferência do sistema
function setupSystemPreferenceListener() {
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = (e) => {
      const savedTheme = localStorage.getItem('theme');

      // Só aplicar mudança do sistema se não há tema salvo pelo usuário
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        console.log('🔄 Preferência do sistema mudou para:', newTheme);
        applyTheme(newTheme);
        updateThemeButtonIcon(newTheme);
      }
    };

    // Adicionar listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleSystemChange);
    }

    console.log('✅ Listener de preferência do sistema configurado');
  } catch (error) {
    console.error('❌ Erro ao configurar listener de preferência do sistema:', error);
  }
}

// Função para resetar tema e seguir sistema
export function resetThemeToSystem() {
  try {
    localStorage.removeItem('theme');
    console.log('🔄 Tema resetado, seguindo sistema');
    applyCurrentTheme();
  } catch (error) {
    console.error('❌ Erro ao resetar tema:', error);
  }
}

// Função para aplicar configurações de tema
export function applyThemeSettings() {
  try {
    applyCurrentTheme();
    applyCompactMode();
    setupSystemPreferenceListener();

    // Expor funções para debug no console
    if (typeof window !== 'undefined') {
      window.debugTheme = {
        getCurrentTheme: getCurrentTheme,
        resetThemeToSystem: resetThemeToSystem,
        applyCurrentTheme: applyCurrentTheme,
        detectSystemPreference: detectSystemPreference
      };
      console.log('🔧 Funções de debug do tema disponíveis em window.debugTheme');
    }

    console.log('✅ Configurações de tema aplicadas');
  } catch (error) {
    console.error('❌ Erro ao aplicar configurações de tema:', error);
  }
}
