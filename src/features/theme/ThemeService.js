// features/theme/ThemeService.js
import { eventBus } from '@core/events/eventBus.js';

// Função para configurar toggle de tema
export function setupThemeToggle() {
  console.log('🎨 Configurando toggle de tema...');

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

    console.log('✅ Tema aplicado:', theme);

  } catch (error) {
    console.error('❌ Erro ao aplicar tema:', error);
  }
}

// Função para aplicar tema atual
export function applyCurrentTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    updateThemeButtonIcon(savedTheme);

    console.log('✅ Tema atual aplicado:', savedTheme);

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

// Função para aplicar configurações de tema
export function applyThemeSettings() {
  try {
    applyCurrentTheme();
    applyCompactMode();
    console.log('✅ Configurações de tema aplicadas');
  } catch (error) {
    console.error('❌ Erro ao aplicar configurações de tema:', error);
  }
}
