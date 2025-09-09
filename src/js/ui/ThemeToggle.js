﻿export function setupThemeToggle(buttonId = 'theme-toggle-btn') {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : prefersDark;

  // Aplicar tema imediatamente
  root.classList.toggle('dark', isDark);
  updateIcon();

  const btn = document.getElementById(buttonId);

  if (btn) {
    // Remover listeners antigos para evitar duplicaÃ§Ã£o
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    // Adicionar novo listener
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('ðŸ”§ Clique no botÃ£o de tema detectado');
      console.log('ðŸ”§ Classes antes:', root.classList.toString());

      const isDarkNow = root.classList.toggle('dark');
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');

      console.log('ðŸ”§ Classes depois:', root.classList.toString());
      console.log('ðŸ”§ isDarkNow:', isDarkNow);
      console.log('ðŸ”§ localStorage theme:', localStorage.getItem('theme'));

      updateIcon();

      // ForÃ§ar atualizaÃ§Ã£o de todas as abas para sincronizar o tema
      forceThemeUpdate();

      console.log('ðŸŽ¨ Tema alterado para:', isDarkNow ? 'dark' : 'light');
    });

    console.log('âœ… BotÃ£o de tema configurado:', buttonId);
  } else {
    console.warn('âš ï¸ BotÃ£o de tema nÃ£o encontrado:', buttonId);
  }

  function updateIcon() {
    const icon = document.getElementById('theme-icon');
    console.log('ðŸ”§ updateIcon chamada, Ã­cone encontrado:', !!icon);
    console.log('ðŸ”§ root.classList.contains("dark"):', root.classList.contains('dark'));

    if (icon) {
      const newIcon = root.classList.contains('dark') ? 'ðŸŒ™' : 'â˜€ï¸';
      console.log('ðŸ”§ Novo Ã­cone:', newIcon);
      icon.textContent = newIcon;
    } else {
      console.log('ðŸ”§ Elemento theme-icon nÃ£o encontrado');
    }
  }

  function forceThemeUpdate() {
    // ForÃ§ar re-renderizaÃ§Ã£o da aba atual baseada no hash
    const currentRoute = window.location.hash.replace('#', '') || '/dashboard';

    // Aplicar tema imediatamente em todos os elementos
    updateThemeElements();

    setTimeout(() => {
      window.requestAnimationFrame(() => {
        switch (currentRoute) {
        case '/dashboard':
          if (window.renderDashboard) window.renderDashboard();
          break;
        case '/transactions':
          if (window.renderTransactions) window.renderTransactions();
          break;
        case '/categories':
          if (window.renderCategories) window.renderCategories();
          break;
        case '/recorrentes':
          if (window.renderRecorrentes) window.renderRecorrentes();
          break;
        case '/notifications':
          if (window.renderNotifications) window.renderNotifications();
          break;
        case '/settings':
          if (window.renderSettings) window.renderSettings();
          break;
        default:
          if (window.renderDashboard) window.renderDashboard();
        }
        updateThemeElements();
        console.log('âœ… Tema aplicado na aba atual');
      });
    }, 200);
  }

  function updateThemeElements() {
    // ForÃ§ar reflow em elementos especÃ­ficos que podem precisar de sincronizaÃ§Ã£o
    const elements = document.querySelectorAll('[class*="dark:"]');
    elements.forEach(element => {
      // ForÃ§ar reflow para garantir que as classes sejam aplicadas
      element.offsetHeight;
    });

    // ForÃ§ar reflow no body e html
    document.body.offsetHeight;
    document.documentElement.offsetHeight;

    // Atualizar elementos com classes especÃ­ficas do tema
    // Incluir classes do design system (u-card, u-btn, u-input) alÃ©m das legadas
    const themeElements = document.querySelectorAll([
      '.card-resumo',
      '.bottom-nav',
      '.modal-content',
      '.btn-secondary', // legado
      '.form-group input',
      '.form-group select',
      '.form-group textarea',
      '.tab-container',
      '.tab-header',
      '.tab-content',
      '.list-item',
      '.card-standard', // legado
      '.u-card',
      '.u-btn',
      'input.u-input',
      'select.u-input',
      'textarea.u-input'
    ].join(', '));
    themeElements.forEach(element => {
      element.offsetHeight;
    });

    // ForÃ§ar atualizaÃ§Ã£o de elementos especÃ­ficos que podem nÃ£o ter sido atualizados
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');

    // Aplicar tema diretamente em elementos que podem nÃ£o estar respondendo
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const computedStyle = getComputedStyle(element);
      if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        element.offsetHeight; // ForÃ§ar reflow
      }
    });

    console.log('ðŸŽ¨ Elementos de tema atualizados (isDark:', isDark, ')');
  }
}
