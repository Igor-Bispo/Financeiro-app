// features/theme/ThemeService.js
import { eventBus } from '@core/events/eventBus.js';

// FunÃ§Ã£o para configurar toggle de tema
export function setupThemeToggle() {
  console.log('ðŸŽ¨ Configurando toggle de tema...');

  const button = document.getElementById('theme-toggle-btn');
  if (!button) {
    // NÃ£o hÃ¡ botÃ£o global; OK fora da aba ConfiguraÃ§Ãµes
    applyCurrentTheme();
    return;
  }

  // Marcar como configurado para evitar duplicaÃ§Ã£o
  if (window.__themeToggleWired) {
    console.log('â­ï¸ Toggle de tema jÃ¡ configurado');
    return;
  }

  window.__themeToggleWired = true;

  // Configurar evento de clique
  button.addEventListener('click', () => {
    console.log('ðŸŽ¨ Toggle de tema clicado');
    toggleTheme();
  });

  // Aplicar tema inicial
  applyCurrentTheme();

  console.log('âœ… Toggle de tema configurado');
}

// FunÃ§Ã£o para alternar tema
export function toggleTheme() {
  try {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    console.log('ðŸŽ¨ Alternando tema:', { de: currentTheme, para: newTheme });

    // Salvar no localStorage
    localStorage.setItem('theme', newTheme);

    // Aplicar tema
    applyTheme(newTheme);

    // Emitir evento
    eventBus.emit('theme:changed', newTheme);

    // Atualizar Ã­cone do botÃ£o
    updateThemeButtonIcon(newTheme);

    console.log('âœ… Tema alterado para:', newTheme);

  } catch (error) {
    console.error('âŒ Erro ao alternar tema:', error);
  }
}

// FunÃ§Ã£o para aplicar tema
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

    // Aplicar classes CSS especÃ­ficas
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.body.classList.add(`theme-${theme}`);

    console.log('âœ… Tema aplicado:', theme);

  } catch (error) {
    console.error('âŒ Erro ao aplicar tema:', error);
  }
}

// FunÃ§Ã£o para aplicar tema atual
export function applyCurrentTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    updateThemeButtonIcon(savedTheme);

    console.log('âœ… Tema atual aplicado:', savedTheme);

  } catch (error) {
    console.error('âŒ Erro ao aplicar tema atual:', error);
  }
}

// FunÃ§Ã£o para atualizar Ã­cone do botÃ£o
function updateThemeButtonIcon(theme) {
  try {
    const button = document.getElementById('theme-toggle-btn');
    if (!button) return;

    const icon = button.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? 'â˜€ï¸' : 'ðŸŒ™';
      icon.setAttribute('title', theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
    }

  } catch (error) {
    console.error('âŒ Erro ao atualizar Ã­cone do tema:', error);
  }
}

// FunÃ§Ã£o para aplicar modo compacto
export function applyCompactMode() {
  try {
    const isCompact = localStorage.getItem('compactMode') === 'true';

    if (isCompact) {
      document.body.classList.add('compact-mode');
      console.log('âœ… Modo compacto aplicado');
    } else {
      document.body.classList.remove('compact-mode');
      console.log('âœ… Modo normal aplicado');
    }

  } catch (error) {
    console.error('âŒ Erro ao aplicar modo compacto:', error);
  }
}

// FunÃ§Ã£o para alternar modo compacto
export function toggleCompactMode() {
  try {
    const currentMode = localStorage.getItem('compactMode') === 'true';
    const newMode = !currentMode;

    localStorage.setItem('compactMode', newMode.toString());
    applyCompactMode();

    // Emitir evento
    eventBus.emit('compactMode:changed', newMode);

    console.log('âœ… Modo compacto alterado para:', newMode);

  } catch (error) {
    console.error('âŒ Erro ao alternar modo compacto:', error);
  }
}

// FunÃ§Ã£o para obter tema atual
export function getCurrentTheme() {
  return localStorage.getItem('theme') || 'light';
}

// FunÃ§Ã£o para obter modo compacto atual
export function getCurrentCompactMode() {
  return localStorage.getItem('compactMode') === 'true';
}

// FunÃ§Ã£o para aplicar configuraÃ§Ãµes de tema
export function applyThemeSettings() {
  try {
    applyCurrentTheme();
    applyCompactMode();
    console.log('âœ… ConfiguraÃ§Ãµes de tema aplicadas');
  } catch (error) {
    console.error('âŒ Erro ao aplicar configuraÃ§Ãµes de tema:', error);
  }
}
