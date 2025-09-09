// features/config/ConfigService.js

// FunÃ§Ã£o para configurar botÃµes do header
export function setupHeaderButtons() {
  console.log('ðŸ”§ Configurando botÃµes do header...');

  // Verificar se os elementos existem
  const voiceModal = document.getElementById('voice-modal');

  console.log('ðŸ”§ Elementos encontrados:', {
    voiceModal: !!voiceModal
  });

  // BotÃ£o de voz movido para o FAB

  // BotÃ£o de tema - configuraÃ§Ã£o removida para evitar duplicaÃ§Ã£o
  // A configuraÃ§Ã£o do tema Ã© feita apenas uma vez na inicializaÃ§Ã£o do app
}

// FunÃ§Ã£o para configurar botÃµes de categoria
export function setupCategoryButtons() {
  console.log('ðŸ”§ Configurando botÃµes de categoria...');

  // BotÃ£o de adicionar categoria
  const addCategoryBtn = document.getElementById('add-category-btn');
  if (addCategoryBtn) {
    addCategoryBtn.onclick = () => {
      if (window.showAddCategoryModal) {
        window.showAddCategoryModal();
      } else {
        console.error('âŒ FunÃ§Ã£o showAddCategoryModal nÃ£o disponÃ­vel');
      }
    };
    console.log('âœ… BotÃ£o de adicionar categoria configurado');
  }

  // BotÃ£o de exportar
  const exportBtn = document.getElementById('export-categories-btn');
  if (exportBtn) {
    exportBtn.onclick = () => {
      if (window.showExportOptions) {
        window.showExportOptions();
      } else {
        console.error('âŒ FunÃ§Ã£o showExportOptions nÃ£o disponÃ­vel');
      }
    };
    console.log('âœ… BotÃ£o de exportar configurado');
  }

  // BotÃ£o de backup
  const backupBtn = document.getElementById('backup-categories-btn');
  if (backupBtn) {
    backupBtn.onclick = () => {
      if (window.downloadBackup) {
        window.downloadBackup();
      } else {
        console.error('âŒ FunÃ§Ã£o downloadBackup nÃ£o disponÃ­vel');
      }
    };
    console.log('âœ… BotÃ£o de backup configurado');
  }
}

// FunÃ§Ã£o para configurar botÃµes de transaÃ§Ã£o
export function setupTransactionButtons() {
  console.log('ðŸ”§ Configurando botÃµes de transaÃ§Ã£o...');
  // In tests or after environment teardown, document may be undefined
  if (typeof document === 'undefined') {
    return;
  }

  // BotÃ£o de adicionar transaÃ§Ã£o
  const addTransactionBtn = document.getElementById('add-transaction-btn');
  if (addTransactionBtn) {
    addTransactionBtn.onclick = () => {
      if (window.showAddTransactionModal) {
        window.showAddTransactionModal();
      } else {
        console.error('âŒ FunÃ§Ã£o showAddTransactionModal nÃ£o disponÃ­vel');
      }
    };
    console.log('âœ… BotÃ£o de adicionar transaÃ§Ã£o configurado');
  }

  // BotÃ£o de voz (abre o modal de voz focado em transaÃ§Ãµes)
  const voiceBtn = document.getElementById('voice-btn');
  if (voiceBtn && !voiceBtn.dataset.bound) {
    voiceBtn.dataset.bound = '1';
    voiceBtn.onclick = async () => {
      try {
        if (typeof window.openVoiceModal === 'function') {
          await window.openVoiceModal('transaction');
          return;
        }
        // Fallback: carregamento dinÃ¢mico do serviÃ§o de voz
        const mod = await import('@features/voice/VoiceService.js');
        if (mod && typeof mod.openVoiceModal === 'function') {
          window.openVoiceModal = mod.openVoiceModal; // cachear para prÃ³ximas
          await mod.openVoiceModal('transaction');
          return;
        }
        console.warn('âš ï¸ openVoiceModal nÃ£o disponÃ­vel');
        if (window.Snackbar) { window.Snackbar({ message: 'Recurso de voz indisponÃ­vel neste dispositivo', type: 'warning' }); }
      } catch (e) {
        console.error('âŒ Falha ao iniciar voz:', e);
        if (window.Snackbar) { window.Snackbar({ message: 'NÃ£o foi possÃ­vel iniciar a captura de voz', type: 'error' }); }
      }
    };
    console.log('âœ… BotÃ£o de voz configurado');
  }

  // BotÃ£o de exportar transaÃ§Ãµes
  const exportTransactionsBtn = document.getElementById('export-transactions-btn');
  if (exportTransactionsBtn) {
    exportTransactionsBtn.onclick = () => {
      if (window.exportToExcel) {
        window.exportToExcel();
      } else {
        console.error('âŒ FunÃ§Ã£o exportToExcel nÃ£o disponÃ­vel');
      }
    };
    console.log('âœ… BotÃ£o de exportar transaÃ§Ãµes configurado');
  }
}

// FunÃ§Ã£o para configurar botÃµes do dashboard
export function setupDashboardButtons() {
  console.log('ðŸ”§ Configurando botÃµes do dashboard...');

  // BotÃ£o de adicionar transaÃ§Ã£o rÃ¡pida
  const quickAddBtn = document.getElementById('quick-add-btn');
  if (quickAddBtn) {
    quickAddBtn.onclick = () => {
      if (window.showAddTransactionModal) {
        window.showAddTransactionModal();
      } else {
        console.error('âŒ FunÃ§Ã£o showAddTransactionModal nÃ£o disponÃ­vel');
      }
    };
    console.log('âœ… BotÃ£o de adicionar transaÃ§Ã£o rÃ¡pida configurado');
  }

  // BotÃ£o de configuraÃ§Ãµes
  const settingsBtn = document.getElementById('dashboard-settings-btn');
  if (settingsBtn) {
    settingsBtn.onclick = () => {
      window.location.hash = '#/settings';
    };
    console.log('âœ… BotÃ£o de configuraÃ§Ãµes configurado');
  }
}
