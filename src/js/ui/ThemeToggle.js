export function setupThemeToggle(buttonId = 'theme-toggle-btn') {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : prefersDark;

  // Aplicar tema imediatamente
  root.classList.toggle('dark', isDark);
  updateIcon();

  const btn = document.getElementById(buttonId);

  if (btn) {
    // Remover listeners antigos para evitar duplicação
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // Adicionar novo listener
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🔧 Clique no botão de tema detectado');
      console.log('🔧 Classes antes:', root.classList.toString());
      
      const isDarkNow = root.classList.toggle('dark');
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');

      console.log('🔧 Classes depois:', root.classList.toString());
      console.log('🔧 isDarkNow:', isDarkNow);
      console.log('🔧 localStorage theme:', localStorage.getItem('theme'));

      updateIcon();
      
      // Forçar atualização de todas as abas para sincronizar o tema
      forceThemeUpdate();
      
      // Atualizar melhorias mobile para o novo tema
      if (window.mobileEnhancements && window.mobileEnhancements.adjustForTheme) {
        window.mobileEnhancements.adjustForTheme(isDarkNow);
        console.log('📱 Melhorias mobile atualizadas para tema:', isDarkNow ? 'dark' : 'light');
      }
      
      console.log('🎨 Tema alterado para:', isDarkNow ? 'dark' : 'light');
    });
    
    console.log('✅ Botão de tema configurado:', buttonId);
  } else {
    console.warn('⚠️ Botão de tema não encontrado:', buttonId);
  }

  function updateIcon() {
    const icon = document.getElementById('theme-icon');
    console.log('🔧 updateIcon chamada, ícone encontrado:', !!icon);
    console.log('🔧 root.classList.contains("dark"):', root.classList.contains('dark'));
    
    if (icon) {
      const newIcon = root.classList.contains('dark') ? '🌙' : '☀️';
      console.log('🔧 Novo ícone:', newIcon);
      icon.textContent = newIcon;
    } else {
      console.log('🔧 Elemento theme-icon não encontrado');
    }
  }

  function forceThemeUpdate() {
    // Forçar re-renderização da aba atual baseada no hash
    const currentRoute = window.location.hash.replace('#', '') || '/dashboard';

    // Aplicar tema imediatamente em todos os elementos
    updateThemeElements();

    setTimeout(() => {
      requestAnimationFrame(() => {
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
        console.log('✅ Tema aplicado na aba atual');
      });
    }, 200);
  }

  function updateThemeElements() {
    // Forçar reflow em elementos específicos que podem precisar de sincronização
    const elements = document.querySelectorAll('[class*="dark:"]');
    elements.forEach(element => {
      // Forçar reflow para garantir que as classes sejam aplicadas
      element.offsetHeight;
    });
    
    // Forçar reflow no body e html
    document.body.offsetHeight;
    document.documentElement.offsetHeight;
    
    // Atualizar elementos com classes específicas do tema
    const themeElements = document.querySelectorAll('.card-resumo, .bottom-nav, .modal-content, .btn-secondary, .form-group input, .form-group select, .form-group textarea, .tab-container, .tab-header, .tab-content, .list-item, .card-standard');
    themeElements.forEach(element => {
      element.offsetHeight;
    });
    
    // Forçar atualização de elementos específicos que podem não ter sido atualizados
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    
    // Aplicar tema diretamente em elementos que podem não estar respondendo
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const computedStyle = getComputedStyle(element);
      if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        element.offsetHeight; // Forçar reflow
      }
    });
    
    console.log('🎨 Elementos de tema atualizados (isDark:', isDark, ')');
  }
}
