// features/config/ConfigService.js

// Função para configurar botões do header
export function setupHeaderButtons() {
  console.log('🔧 Configurando botões do header...');

  // Verificar se os elementos existem
  const voiceModal = document.getElementById('voice-modal');

  console.log('🔧 Elementos encontrados:', {
    voiceModal: !!voiceModal
  });

  // Botão de voz movido para o FAB

  // Botão de tema - configuração removida para evitar duplicação
  // A configuração do tema é feita apenas uma vez na inicialização do app
}

// Função para configurar botões de categoria
export function setupCategoryButtons() {
  console.log('🔧 Configurando botões de categoria...');

  // Botão de adicionar categoria
  const addCategoryBtn = document.getElementById('add-category-btn');
  if (addCategoryBtn) {
    addCategoryBtn.onclick = () => {
      if (window.showAddCategoryModal) {
        window.showAddCategoryModal();
      } else {
        console.error('❌ Função showAddCategoryModal não disponível');
      }
    };
    console.log('✅ Botão de adicionar categoria configurado');
  }

  // Botão de exportar
  const exportBtn = document.getElementById('export-categories-btn');
  if (exportBtn) {
    exportBtn.onclick = () => {
      if (window.showExportOptions) {
        window.showExportOptions();
      } else {
        console.error('❌ Função showExportOptions não disponível');
      }
    };
    console.log('✅ Botão de exportar configurado');
  }

  // Botão de backup
  const backupBtn = document.getElementById('backup-categories-btn');
  if (backupBtn) {
    backupBtn.onclick = () => {
      if (window.downloadBackup) {
        window.downloadBackup();
      } else {
        console.error('❌ Função downloadBackup não disponível');
      }
    };
    console.log('✅ Botão de backup configurado');
  }
}

// Função para configurar botões de transação
export function setupTransactionButtons() {
  console.log('🔧 Configurando botões de transação...');
  // In tests or after environment teardown, document may be undefined
  if (typeof document === 'undefined') {
    return;
  }

  // Botão de adicionar transação
  const addTransactionBtn = document.getElementById('add-transaction-btn');
  if (addTransactionBtn) {
    addTransactionBtn.onclick = () => {
      if (window.showAddTransactionModal) {
        window.showAddTransactionModal();
      } else {
        console.error('❌ Função showAddTransactionModal não disponível');
      }
    };
    console.log('✅ Botão de adicionar transação configurado');
  }

  // Botão de voz (abre o modal de voz focado em transações)
  const voiceBtn = document.getElementById('voice-btn');
  if (voiceBtn && !voiceBtn.dataset.bound) {
    voiceBtn.dataset.bound = '1';
    voiceBtn.onclick = async () => {
      try {
        if (typeof window.openVoiceModal === 'function') {
          await window.openVoiceModal('transaction');
          return;
        }
        // Fallback: carregamento dinâmico do serviço de voz
        const mod = await import('@features/voice/VoiceService.js');
        if (mod && typeof mod.openVoiceModal === 'function') {
          window.openVoiceModal = mod.openVoiceModal; // cachear para próximas
          await mod.openVoiceModal('transaction');
          return;
        }
        console.warn('⚠️ openVoiceModal não disponível');
        if (window.Snackbar) { window.Snackbar({ message: 'Recurso de voz indisponível neste dispositivo', type: 'warning' }); }
      } catch (e) {
        console.error('❌ Falha ao iniciar voz:', e);
        if (window.Snackbar) { window.Snackbar({ message: 'Não foi possível iniciar a captura de voz', type: 'error' }); }
      }
    };
    console.log('✅ Botão de voz configurado');
  }

  // Botão de exportar transações
  const exportTransactionsBtn = document.getElementById('export-transactions-btn');
  if (exportTransactionsBtn) {
    exportTransactionsBtn.onclick = () => {
      if (window.exportToExcel) {
        window.exportToExcel();
      } else {
        console.error('❌ Função exportToExcel não disponível');
      }
    };
    console.log('✅ Botão de exportar transações configurado');
  }
}

// Função para configurar botões do dashboard
export function setupDashboardButtons() {
  console.log('🔧 Configurando botões do dashboard...');

  // Botão de adicionar transação rápida
  const quickAddBtn = document.getElementById('quick-add-btn');
  if (quickAddBtn) {
    quickAddBtn.onclick = () => {
      if (window.showAddTransactionModal) {
        window.showAddTransactionModal();
      } else {
        console.error('❌ Função showAddTransactionModal não disponível');
      }
    };
    console.log('✅ Botão de adicionar transação rápida configurado');
  }

  // Botão de configurações
  const settingsBtn = document.getElementById('dashboard-settings-btn');
  if (settingsBtn) {
    settingsBtn.onclick = () => {
      window.location.hash = '#/settings';
    };
    console.log('✅ Botão de configurações configurado');
  }
}
