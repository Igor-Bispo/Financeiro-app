// Minimal, clean settings handlers implementation
// Provides only the essential global functions required by SettingsPage
// Keep this file small, readable and syntax-safe

// DEBUG_MARKER_START
console.log('[settings.handlers] minimal handlers loaded @', new Date().toISOString());

// Função auxiliar para Snackbar
function snk() {
  console.log('[DEBUG] snk() chamada - verificando disponibilidade do Snackbar...');
  console.log('[DEBUG] window.Snackbar disponível:', !!window.Snackbar);
  console.log('[DEBUG] typeof window.Snackbar:', typeof window.Snackbar);

  // Verificar se window.Snackbar é uma função (forma correta)
  if (window.Snackbar && typeof window.Snackbar === 'function') {
    console.log('[DEBUG] Usando window.Snackbar (função direta)');
    return {
      success: (msg) => {
        try {
          window.Snackbar({ message: msg, type: 'success', duration: 3000 });
        } catch (e) {
          console.error('[DEBUG] Erro ao chamar Snackbar:', e);
          alert('✅ ' + msg);
        }
      },
      error: (msg) => {
        try {
          window.Snackbar({ message: msg, type: 'error', duration: 3000 });
        } catch (e) {
          console.error('[DEBUG] Erro ao chamar Snackbar:', e);
          alert('❌ ' + msg);
        }
      },
      info: (msg) => {
        try {
          window.Snackbar({ message: msg, type: 'info', duration: 3000 });
        } catch (e) {
          console.error('[DEBUG] Erro ao chamar Snackbar:', e);
          alert('ℹ️ ' + msg);
        }
      },
      warning: (msg) => {
        try {
          window.Snackbar({ message: msg, type: 'warning', duration: 3000 });
        } catch (e) {
          console.error('[DEBUG] Erro ao chamar Snackbar:', e);
          alert('⚠️ ' + msg);
        }
      }
    };
  }

  // Fallback para alert se Snackbar não estiver disponível
  console.log('[DEBUG] Usando fallback alert');
  return {
    success: (msg) => { console.log('SUCCESS:', msg); alert('✅ ' + msg); },
    error: (msg) => { console.log('ERROR:', msg); alert('❌ ' + msg); },
    info: (msg) => { console.log('INFO:', msg); alert('ℹ️ ' + msg); },
    warning: (msg) => { console.log('WARNING:', msg); alert('⚠️ ' + msg); }
  };
}

// Função para aplicar configurações do toast ao Snackbar (SISTEMA SIMPLIFICADO)
function applyToastSettings() {
  console.log('[DEBUG] applyToastSettings chamada - usando sistema simplificado');

  // Usar o sistema simplificado
  if (typeof window.applySimpleSnackbarConfig === 'function') {
    window.applySimpleSnackbarConfig();
  } else {
    console.warn('[DEBUG] Sistema simplificado não disponível, carregando...');

    // Carregar o sistema simplificado se não estiver disponível
    const script = document.createElement('script');
    script.src = '/src/js/config/simple-snackbar-config.js';
    script.onload = () => {
      console.log('[DEBUG] Sistema simplificado carregado, aplicando configurações...');
      if (typeof window.applySimpleSnackbarConfig === 'function') {
        window.applySimpleSnackbarConfig();
      }
    };
    document.head.appendChild(script);
  }
}

// Função para aplicar modo compacto
function applyCompactMode(enabled) {
  console.log('[DEBUG] applyCompactMode chamada:', enabled);

  if (enabled) {
    // Ativar modo compacto
    document.body.classList.add('compact-mode');
    document.body.setAttribute('data-compact-mode', 'enabled');

    // Aplicar tamanho salvo se existir
    const savedSize = localStorage.getItem('compactMode');
    if (savedSize) {
      document.body.classList.add(`${savedSize}-mode`);
      document.body.setAttribute('data-compact-size', savedSize);
    }

    console.log('[DEBUG] Modo compacto ativado');
  } else {
    // Desativar modo compacto
    document.body.classList.remove('compact-mode', 'micro-mode', 'nano-mode');
    document.body.removeAttribute('data-compact-mode');
    document.body.removeAttribute('data-compact-size');

    console.log('[DEBUG] Modo compacto desativado');
  }
}

// Função para aplicar tamanho compacto
function applyCompactSize(size) {
  console.log('[DEBUG] applyCompactSize chamada:', size);

  // Remover classes de tamanho anteriores
  document.body.classList.remove('micro-mode', 'nano-mode');

  if (size && size !== 'normal') {
    // Aplicar novo tamanho
    document.body.classList.add(`${size}-mode`);
    document.body.setAttribute('data-compact-size', size);
    localStorage.setItem('compactMode', size);

    console.log('[DEBUG] Tamanho compacto aplicado:', size);
  } else {
    // Remover tamanho
    document.body.removeAttribute('data-compact-size');
    localStorage.removeItem('compactMode');

    console.log('[DEBUG] Tamanho compacto removido');
  }
}

// Função para lidar com mudanças de toggle após o estado visual mudar
function handleToggleChange(toggle) {
  console.log('[DEBUG] handleToggleChange executado para:', toggle.id, 'checked:', toggle.checked);

  const isEnabled = toggle.checked;

  switch (toggle.id) {
  case 'limit-alerts-toggle':
    localStorage.setItem('noti_limit_alerts', isEnabled);
    snk().success(`Alertas de limite ${isEnabled ? 'ativados' : 'desativados'}`);
    break;

  case 'recurring-reminders-toggle':
    localStorage.setItem('noti_recurring_reminders', isEnabled);
    snk().success(`Lembretes recorrentes ${isEnabled ? 'ativados' : 'desativados'}`);
    break;

  case 'weekly-summary-toggle':
    localStorage.setItem('noti_weekly_summary', isEnabled);
    snk().success(`Resumo semanal ${isEnabled ? 'ativado' : 'desativado'}`);
    break;

  case 'toast-hover-pause':
    localStorage.setItem('toast_hover_pause', isEnabled);
    applyToastSettings();
    snk().success(`Pausar toast no hover ${isEnabled ? 'ativado' : 'desativado'}`);
    break;

  case 'compact-mode-toggle':
    localStorage.setItem('compactModeEnabled', isEnabled);
    applyCompactMode(isEnabled);
    snk().success(`Modo compacto ${isEnabled ? 'ativado' : 'desativado'}`);
    break;

  case 'animations-toggle':
    console.log('[DEBUG] Handler animations-toggle executado!');
    console.log('[DEBUG] Estado atual:', isEnabled);

    localStorage.setItem('animationsEnabled', isEnabled.toString());

    if (isEnabled) {
      document.body.classList.remove('no-animations');
      console.log('[DEBUG] Animações ativadas - classe no-animations removida');
    } else {
      document.body.classList.add('no-animations');
      console.log('[DEBUG] Animações desativadas - classe no-animations adicionada');
    }

    // Verificar estado atual
    const hasNoAnimations = document.body.classList.contains('no-animations');
    console.log('[DEBUG] Estado final - no-animations presente:', hasNoAnimations);
    console.log('[DEBUG] Classes do body:', document.body.className);

    snk().success(`Animações ${isEnabled ? 'ativadas' : 'desativadas'}`);
    break;

  case 'performance-telemetry-toggle':
    console.log('[DEBUG] Handler performance-telemetry-toggle executado!');
    console.log('[DEBUG] Estado atual:', isEnabled);

    // Usar a mesma chave que o sistema de telemetria espera
    localStorage.setItem('perfTelemetry', isEnabled.toString());

    // Importar e configurar o sistema de telemetria
    import('@core/telemetry/perf.js').then(perf => {
      perf.setEnabled(isEnabled);
      console.log('[DEBUG] Sistema de telemetria configurado:', isEnabled);
    }).catch(err => {
      console.warn('[DEBUG] Erro ao importar sistema de telemetria:', err);
    });

    snk().success(`Telemetria de performance ${isEnabled ? 'ativada' : 'desativada'}`);
    break;

  case 'biometric-auth-toggle':
    console.log('[DEBUG] Handler biometric-auth-toggle executado!');
    console.log('[DEBUG] Estado atual:', isEnabled);

    if (isEnabled) {
      // Verificar se biometria nativa está disponível
      if (window.nativeBiometric) {
        window.nativeBiometric.isAvailable().then(result => {
          console.log('[DEBUG] Resultado da verificação:', result);
          
          if (result.isAvailable) {
            // Salvar usuário atual
            const currentUser = window.appState?.currentUser;
            if (currentUser) {
              window.nativeBiometric.saveCredentials(currentUser.uid, {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
              });
              
              localStorage.setItem('biometricAuth', 'true');
              
              const typeText = result.biometryType === 'face-fingerprint' 
                ? 'Face ID ou Impressão Digital' 
                : result.biometryType === 'fingerprint' 
                  ? 'Impressão Digital' 
                  : 'Biometria';
              
              snk().success(`✅ ${typeText} ativado! Use para login rápido.`);
            } else {
              toggle.checked = false;
              snk().error('❌ Faça login primeiro para ativar biometria');
            }
          } else {
            toggle.checked = false;
            snk().warning(`⚠️ ${result.reason}`);
          }
        }).catch(err => {
          console.error('[DEBUG] Erro ao verificar biometria:', err);
          toggle.checked = false;
          snk().error('❌ Erro ao verificar biometria');
        });
      } else {
        toggle.checked = false;
        snk().warning('⚠️ Biometria não disponível (apenas no APK)');
      }
    } else {
      // Desativar biometria
      if (window.nativeBiometric) {
        window.nativeBiometric.clearCredentials();
      }
      localStorage.setItem('biometricAuth', 'false');
      snk().info('🔒 Autenticação biométrica desativada');
    }
    break;

  case 'auto-sync-toggle':
    console.log('[DEBUG] Handler auto-sync-toggle executado!');
    console.log('[DEBUG] Estado atual:', isEnabled);

    localStorage.setItem('autoSync', isEnabled.toString());

    if (isEnabled) {
      // Ativar sincronização automática
      console.log('[DEBUG] Sincronização automática ativada');
      snk().success('Sincronização automática ativada - dados serão sincronizados automaticamente');
    } else {
      // Desativar sincronização automática
      console.log('[DEBUG] Sincronização automática desativada');
      snk().info('Sincronização automática desativada - sincronização manual necessária');
    }
    break;

  case 'analytics-toggle':
    console.log('[DEBUG] Handler analytics-toggle executado!');
    console.log('[DEBUG] Estado atual:', isEnabled);

    localStorage.setItem('analyticsEnabled', isEnabled.toString());

    if (isEnabled) {
      // Ativar analytics
      console.log('[DEBUG] Analytics ativado');
      snk().success('Analytics ativado - dados de uso serão coletados localmente');
    } else {
      // Desativar analytics
      console.log('[DEBUG] Analytics desativado');
      snk().info('Analytics desativado - nenhum dado de uso será coletado');
    }
    break;
  }
}

async function svc() {
  return import('./settings.service.js');
}

// Invitation actions -------------------------------------------------------
window.acceptInvitation = async function (invitationId) {
  if (!invitationId) return;
  try {
    (await svc()).acceptBudgetInvitation(invitationId);
    snk().success('Convite aceito');
    window.dispatchEvent(new CustomEvent('invitation:changed'));
  } catch {
    snk().error('Falha ao aceitar convite');
  }
};

window.declineInvitation = async function (invitationId) {
  if (!invitationId) return;
  try {
    (await svc()).declineBudgetInvitation(invitationId);
    snk().info('Convite recusado');
    window.dispatchEvent(new CustomEvent('invitation:changed'));
  } catch {
    snk().error('Falha ao recusar convite');
  }
};

window.cancelSentInvitation = async function (invitationId) {
  if (!invitationId) return;
  try {
    (await svc()).cancelSentInvitation(invitationId);
    snk().info('Convite cancelado');
    window.dispatchEvent(new CustomEvent('invitation:changed'));
  } catch {
    snk().error('Erro ao cancelar');
  }
};

window.removeUserFromBudget = async function (uid) {
  try {
    const { appState } = window;
    if (!appState?.currentBudget?.id) throw new Error('Orçamento inválido');
    if (!uid) return;
    if (!confirm('Remover este usuário do orçamento?')) return;
    (await svc()).removeUserFromBudget(appState.currentBudget.id, uid);
    snk().success('Usuário removido');
    window.dispatchEvent(new CustomEvent('budget:changed'));
  } catch {
    snk().error('Erro ao remover usuário');
  }
};

window.updateBudgetName = async function (newName) {
  try {
    const { appState } = window;
    const trimmed = (newName || '').trim();
    if (!trimmed) return snk().warning('Nome vazio');
    if (!appState?.currentBudget?.id) throw new Error('Sem orçamento');
    (await svc()).updateBudgetName(appState.currentBudget.id, trimmed);
    snk().success('Nome atualizado');
    window.dispatchEvent(new CustomEvent('budget:changed'));
  } catch {
    snk().error('Erro ao renomear');
  }
};

window.enterBudget = async function (budgetId, budgetName) {
  try {
    console.log('[DEBUG] 🚀 enterBudget chamado', budgetId, budgetName);

    if (!budgetId) {
      console.error('[DEBUG] ID do orçamento inválido');
      return snk().error('ID do orçamento inválido');
    }

    // Flag para prevenir re-renders automáticos durante a troca
    window.__changingBudget = true;

    // Importar o serviço de orçamentos
    const budgetsService = await import('@features/budgets/service.js');

    // Buscar o orçamento completo no banco de dados
    const fullBudget = await budgetsService.getById(budgetId);
    if (!fullBudget) {
      console.error('[DEBUG] Orçamento não encontrado no banco de dados');
      window.__changingBudget = false;
      return snk().error('Orçamento não encontrado');
    }

    console.log('[DEBUG] 📊 Orçamento encontrado:', fullBudget);

    // Navegar imediatamente para dashboard antes de emitir eventos
    try {
      // Navegação direta primeiro
      window.location.hash = '#/dashboard';
    } catch {}

    // Aguardar a navegação processar
    await new Promise(resolve => setTimeout(resolve, 50));

    // Usar a função de persistência que criamos - ela já emite o evento budget:changed
    const persisted = budgetsService.ensureBudgetPersistence(fullBudget);
    if (!persisted) {
      console.error('[DEBUG] Falha ao persistir orçamento');
      window.__changingBudget = false;
      return snk().error('Erro ao salvar seleção do orçamento');
    }

    console.log('[DEBUG] ✅ Orçamento alterado com sucesso');
    snk().success(`Entrando no orçamento: ${fullBudget.nome}`);

    // Aguardar um pouco mais para garantir que os dados sejam carregados
    await new Promise(resolve => setTimeout(resolve, 100));

    // Limpar a flag
    window.__changingBudget = false;

  } catch (error) {
    console.error('[DEBUG] ❌ Erro ao entrar no orçamento:', error);
    window.__changingBudget = false;
    snk().error('Erro ao entrar no orçamento: ' + error.message);
  }
};

// Accept invitation --------------------------------------------------------
async function handleAcceptInvitation(inviteId) {
  try {
    console.log('[DEBUG] Aceitando convite:', inviteId);
    const { appState } = window;
    if (!appState?.currentUser) {
      snk().error('Precisa estar autenticado');
      return;
    }

    await (await svc()).acceptBudgetInvitation(inviteId);
    snk().success('Convite aceito com sucesso!');
    window.dispatchEvent(new CustomEvent('invitation:changed'));

    // Recarregar orçamentos disponíveis
    try {
      const { loadUserBudgets } = await import('@features/budgets/service.js');
      await loadUserBudgets(appState.currentUser.uid);
      console.log('[DEBUG] Orçamentos recarregados após aceitar convite');

      // Verificar se os orçamentos foram atualizados no appState
      console.log('[DEBUG] Orçamentos no appState após recarregar:', window.appState?.budgets);
      console.log('[DEBUG] Orçamentos compartilhados:', window.appState?.budgets?.filter(b => b.isOwner === false));
    } catch (error) {
      console.error('[DEBUG] Erro ao recarregar orçamentos:', error);
    }

    // Recarregar a página para atualizar o estado
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (e) {
    console.error('[DEBUG] Erro ao aceitar convite:', e);
    snk().error(e?.message || 'Erro ao aceitar convite');
  }
}

// Decline invitation -------------------------------------------------------
async function handleDeclineInvitation(inviteId) {
  try {
    console.log('[DEBUG] Recusando convite:', inviteId);
    const { appState } = window;
    if (!appState?.currentUser) {
      snk().error('Precisa estar autenticado');
      return;
    }

    await (await svc()).declineBudgetInvitation(inviteId);
    snk().success('Convite recusado');
    window.dispatchEvent(new CustomEvent('invitation:changed'));

    // Recarregar a página para atualizar o estado
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (e) {
    console.error('[DEBUG] Erro ao recusar convite:', e);
    snk().error(e?.message || 'Erro ao recusar convite');
  }
}

// Share / invite form submit -----------------------------------------------
async function handleInviteSubmit(form) {
  try {
    const emailInput = form.querySelector('input[name="inviteEmail"], input[type="email"]');
    const email = emailInput?.value?.trim();
    if (!email) { snk().warning('Informe um email'); return; }
    const { appState } = window;
    if (!appState?.currentBudget?.id) { snk().error('Nenhum orçamento ativo'); return; }
    if (!appState?.currentUser) { snk().error('Precisa estar autenticado'); return; }
    await (await svc()).inviteUserToBudget(appState.currentBudget.id, email, appState.currentUser);
    snk().success('Convite enviado');
    emailInput.value = '';
    window.dispatchEvent(new CustomEvent('invitation:changed'));
  } catch (e) {
    snk().error(e?.message || 'Erro ao convidar');
  }
}

// Theme --------------------------------------------------------------------
window.toggleThemeColor = function (color) {
  try {
    if (!color) return;
    localStorage.setItem('themeColor', color);
    document.documentElement.setAttribute('data-theme-color', color);
    snk().info('Cor aplicada');
  } catch {
    /* noop */
  }
};

// Função para verificar atualizações
function checkForUpdates() {
  console.log('[DEBUG] Iniciando verificação de atualizações...');

  // Verificar se Service Workers são suportados
  if (!('serviceWorker' in navigator)) {
    console.log('[DEBUG] Service Workers não suportados');
    snk().warning('Seu navegador não suporta atualizações automáticas');
    return;
  }

  // Obter registro do Service Worker
  navigator.serviceWorker.getRegistration().then(registration => {
    if (!registration) {
      console.log('[DEBUG] Nenhum Service Worker registrado');
      snk().info('Nenhum Service Worker encontrado');
      return;
    }

    console.log('[DEBUG] Service Worker encontrado:', registration);

    // Verificar se já há uma atualização esperando
    if (registration.waiting) {
      console.log('[DEBUG] Atualização já disponível e esperando');
      showUpdateAvailable();
      return;
    }

    // Verificar se há uma atualização em andamento
    if (registration.installing) {
      console.log('[DEBUG] Atualização em andamento');
      snk().info('Atualização em andamento...');
      return;
    }

    // Tentar atualizar o Service Worker
    console.log('[DEBUG] Tentando atualizar Service Worker...');
    registration.update().then(() => {
      console.log('[DEBUG] Verificação de atualização concluída');

      // Verificar novamente se há uma atualização esperando
      if (registration.waiting) {
        console.log('[DEBUG] Nova atualização disponível após verificação');
        showUpdateAvailable();
      } else {
        console.log('[DEBUG] Nenhuma atualização disponível');
        snk().success('Você já está usando a versão mais recente!');
      }
    }).catch(error => {
      console.error('[DEBUG] Erro ao verificar atualizações:', error);
      snk().error('Erro ao verificar atualizações');
    });

  }).catch(error => {
    console.error('[DEBUG] Erro ao obter registro do Service Worker:', error);
    snk().error('Erro ao verificar atualizações');
  });
}

// Função para mostrar que há atualização disponível
function showUpdateAvailable() {
  console.log('[DEBUG] Mostrando que há atualização disponível');

  const modalHTML = `
    <div id="update-modal-modern" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Header -->
        <div class="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-3xl text-white">🆕</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Atualização Disponível</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Uma nova versão está pronta para ser instalada</p>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <!-- Atualização -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl border border-green-200 dark:border-green-700">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-lg text-white">🔄</span>
              </div>
              <h3 class="font-semibold text-green-800 dark:text-green-200">Nova Versão</h3>
            </div>
            <p class="text-sm text-green-700 dark:text-green-300 mb-3">
              Uma nova versão do aplicativo está disponível com melhorias e correções.
            </p>
          </div>

          <!-- Novidades -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-lg text-white">✨</span>
              </div>
              <h3 class="font-semibold text-blue-800 dark:text-blue-200">O que há de novo</h3>
            </div>
            <div class="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium">⚡</span> Melhorias de performance
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium">🐛</span> Correções de bugs
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium">🎯</span> Novas funcionalidades
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium">🔒</span> Otimizações de segurança
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button id="update-now-btn" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            🔄 Atualizar Agora
          </button>
          <button id="update-later-btn" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            ⏰ Mais Tarde
          </button>
        </div>
      </div>
    </div>
  `;

  // Remover modal existente se houver
  const existingModal = document.getElementById('update-modal-modern');
  if (existingModal) existingModal.remove();

  // Adicionar modal ao DOM
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Event listeners
  const modal = document.getElementById('update-modal-modern');
  const updateNowBtn = document.getElementById('update-now-btn');
  const updateLaterBtn = document.getElementById('update-later-btn');

  function closeModal() {
    if (modal) modal.remove();
  }

  if (updateNowBtn) {
    updateNowBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  if (updateLaterBtn) {
    updateLaterBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

// Utilities ----------------------------------------------------------------
window.copyAppInfo = function () {
  try {
    console.log('[DEBUG] Copiando informações do app...');

    const info = {
      app: {
        versao: '4.3.0',
        swVersao: 'v4.2.9',
        cacheEstatico: 'financeiro-static-v4.2.9',
        cacheDinamico: 'financeiro-dynamic-v4.2.9',
        desenvolvedor: 'Igor Bispo',
        tecnologias: 'Firebase, JavaScript, PWA',
        ultimaAtualizacao: 'Setembro 2025'
      },
      dispositivo: {
        userAgent: navigator.userAgent,
        plataforma: navigator.platform,
        idioma: navigator.language,
        online: navigator.onLine
      },
      configuracoes: {
        tema: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        corTema: localStorage.getItem('themeColor') || 'default',
        animacoes: localStorage.getItem('animationsEnabled') !== 'false',
        telemetria: localStorage.getItem('perfTelemetry') === 'true',
        biometria: localStorage.getItem('biometricAuth') === 'true',
        autoSync: localStorage.getItem('autoSync') === 'true',
        analytics: localStorage.getItem('analyticsEnabled') === 'true'
      },
      usuario: {
        uid: window.appState?.currentUser?.uid || null,
        email: window.appState?.currentUser?.email || null,
        ultimaVerificacao: new Date().toLocaleString('pt-BR')
      }
    };

    const infoText = JSON.stringify(info, null, 2);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(infoText).then(() => {
        console.log('[DEBUG] Informações copiadas para clipboard');
        snk().success('Informações do app copiadas!');
      }).catch(err => {
        console.warn('[DEBUG] Erro ao copiar para clipboard:', err);
        fallbackCopy(infoText);
      });
    } else {
      fallbackCopy(infoText);
    }

    function fallbackCopy(text) {
      // Fallback para navegadores sem clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        console.log('[DEBUG] Informações copiadas via fallback');
        snk().success('Informações do app copiadas!');
      } catch (err) {
        console.error('[DEBUG] Erro no fallback copy:', err);
        snk().error('Erro ao copiar informações');
      }

      document.body.removeChild(textArea);
    }

  } catch (error) {
    console.error('[DEBUG] Erro ao copiar informações:', error);
    snk().error('Falha ao copiar informações');
  }
};

window.clearOfflineCache = function () {
  console.log('[DEBUG] Iniciando limpeza de cache offline...');

  // Mostrar modal de confirmação moderno
  const modalHTML = `
    <div id="clear-cache-modal-modern" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Header -->
        <div class="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-3xl text-white">🗑️</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Limpar Cache Offline</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Remover dados temporários armazenados</p>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <!-- Aviso -->
          <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-lg text-white">⚠️</span>
              </div>
              <h3 class="font-semibold text-yellow-800 dark:text-yellow-200">Atenção</h3>
            </div>
            <p class="text-sm text-yellow-700 dark:text-yellow-300">
              Isso pode afetar temporariamente a performance do app até que os dados sejam recarregados.
            </p>
          </div>

          <!-- O que será removido -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-lg text-white">📦</span>
              </div>
              <h3 class="font-semibold text-blue-800 dark:text-blue-200">O que será removido</h3>
            </div>
            <div class="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium">💾</span> Caches do Service Worker
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium">📁</span> Dados temporários
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium">🗄️</span> IndexedDB de cache
              </div>
            </div>
          </div>

          <!-- Nota -->
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-700">
            <p class="text-xs text-green-700 dark:text-green-300">
              <strong>✅ Seus dados estão seguros:</strong> Transações, categorias e orçamentos não serão afetados.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button id="cancel-clear-cache-btn" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            Cancelar
          </button>
          <button id="confirm-clear-cache-btn" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            Limpar Cache
          </button>
        </div>
      </div>
    </div>
  `;

  // Remover modal existente se houver
  const existingModal = document.getElementById('clear-cache-modal-modern');
  if (existingModal) existingModal.remove();

  // Adicionar modal ao DOM
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Event listeners
  const modal = document.getElementById('clear-cache-modal-modern');
  const cancelBtn = document.getElementById('cancel-clear-cache-btn');
  const confirmBtn = document.getElementById('confirm-clear-cache-btn');

  function closeModal() {
    if (modal) modal.remove();
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      closeModal();
      executeClearCache();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
};

function executeClearCache() {
  console.log('[DEBUG] Executando limpeza de cache...');

  try {
    let clearedCaches = 0;
    let clearedStorage = 0;

    // Limpar caches do Service Worker
    if ('caches' in window) {
      caches.keys().then(keys => {
        console.log('[DEBUG] Caches encontrados:', keys);

        const deletePromises = keys.map(cacheName => {
          console.log('[DEBUG] Removendo cache:', cacheName);
          return caches.delete(cacheName).then(deleted => {
            if (deleted) clearedCaches++;
            return deleted;
          });
        });

        Promise.all(deletePromises).then(() => {
          console.log('[DEBUG] Caches removidos:', clearedCaches);

          // Limpar dados do localStorage relacionados ao cache
          const cacheKeys = Object.keys(localStorage).filter(key =>
            key.includes('cache') ||
            key.includes('static') ||
            key.includes('dynamic') ||
            key.includes('offline')
          );

          cacheKeys.forEach(key => {
            localStorage.removeItem(key);
            clearedStorage++;
          });

          console.log('[DEBUG] Dados de cache removidos do localStorage:', clearedStorage);

          // Limpar IndexedDB se disponível
          if ('indexedDB' in window) {
            try {
              indexedDB.deleteDatabase('financeiro-cache');
              console.log('[DEBUG] IndexedDB cache removido');
            } catch (e) {
              console.warn('[DEBUG] Erro ao remover IndexedDB:', e);
            }
          }

          snk().success(`Cache limpo! Removidos ${clearedCaches} caches e ${clearedStorage} dados locais.`);
        }).catch(err => {
          console.error('[DEBUG] Erro ao remover caches:', err);
          snk().error('Erro ao limpar alguns caches');
        });
      });
    } else {
      console.log('[DEBUG] Cache API não disponível');
      snk().warning('Cache API não disponível neste navegador');
    }

  } catch (error) {
    console.error('[DEBUG] Erro geral na limpeza de cache:', error);
    snk().error('Erro ao limpar cache');
  }
}

// Função para abrir modal de Ajuda e Suporte
window.openHelp = function () {
  console.log('[DEBUG] Abrindo modal de ajuda e suporte...');

  const modalHTML = `
    <div id="help-modal-modern" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Header -->
        <div class="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-3xl text-white">❓</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Ajuda e Suporte</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Estamos aqui para ajudar você</p>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <!-- Canais de Suporte -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-lg text-white">💬</span>
              </div>
              <h3 class="font-semibold text-blue-800 dark:text-blue-200">Canais de Suporte</h3>
            </div>
            <div class="space-y-2 text-sm">
              <a href="mailto:suporte@financeiro.app" class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span class="text-blue-600 dark:text-blue-400 text-lg">📧</span>
                <div>
                  <p class="font-medium text-gray-700 dark:text-gray-300">Email</p>
                  <p class="text-gray-600 dark:text-gray-400 text-xs">suporte@financeiro.app</p>
                </div>
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span class="text-green-600 dark:text-green-400 text-lg">💬</span>
                <div>
                  <p class="font-medium text-gray-700 dark:text-gray-300">WhatsApp</p>
                  <p class="text-gray-600 dark:text-gray-400 text-xs">(11) 99999-9999</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Perguntas Frequentes -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-lg text-white">📚</span>
              </div>
              <h3 class="font-semibold text-purple-800 dark:text-purple-200">Recursos Úteis</h3>
            </div>
            <div class="space-y-2 text-sm">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium text-gray-700 dark:text-gray-300">📖</span> Guia de uso completo
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium text-gray-700 dark:text-gray-300">🎥</span> Tutoriais em vídeo
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                <span class="font-medium text-gray-700 dark:text-gray-300">💡</span> Dicas e truques
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700">
          <button id="close-help-modal" class="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `;

  // Remover modal existente se houver
  const existingModal = document.getElementById('help-modal-modern');
  if (existingModal) existingModal.remove();

  // Adicionar modal ao DOM
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Event listeners
  const modal = document.getElementById('help-modal-modern');
  const closeBtn = document.getElementById('close-help-modal');

  function closeModal() {
    if (modal) modal.remove();
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
};

// Função para abrir modal de Avaliar App
window.rateApp = function () {
  console.log('[DEBUG] Abrindo modal de avaliar app...');

  const modalHTML = `
    <div id="rate-modal-modern" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Header -->
        <div class="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-3xl text-white">⭐</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Avaliar Aplicativo</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Sua opinião é muito importante para nós!</p>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <!-- Mensagem -->
          <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-lg text-white">💛</span>
              </div>
              <h3 class="font-semibold text-yellow-800 dark:text-yellow-200">Gostou do App?</h3>
            </div>
            <p class="text-sm text-yellow-700 dark:text-yellow-300">
              Sua avaliação ajuda outros usuários a descobrir o app e nos motiva a continuar melhorando!
            </p>
          </div>

          <!-- Lojas -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl border border-green-200 dark:border-green-700">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-lg text-white">🏪</span>
              </div>
              <h3 class="font-semibold text-green-800 dark:text-green-200">Onde Avaliar</h3>
            </div>
            <div class="space-y-2">
              <button onclick="window.open('https://play.google.com/store/apps/details?id=com.financeiro.app', '_blank')" class="w-full bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span class="text-green-600 dark:text-green-400 text-lg">🤖</span>
                <div class="text-left flex-1">
                  <p class="font-medium text-gray-700 dark:text-gray-300">Google Play</p>
                  <p class="text-gray-600 dark:text-gray-400 text-xs">Para dispositivos Android</p>
                </div>
                <span class="text-gray-400">→</span>
              </button>
              <button onclick="window.open('https://apps.apple.com/app/financeiro/id123456789', '_blank')" class="w-full bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span class="text-blue-600 dark:text-blue-400 text-lg">🍎</span>
                <div class="text-left flex-1">
                  <p class="font-medium text-gray-700 dark:text-gray-300">App Store</p>
                  <p class="text-gray-600 dark:text-gray-400 text-xs">Para dispositivos iOS</p>
                </div>
                <span class="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700">
          <button id="close-rate-modal" class="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `;

  // Remover modal existente se houver
  const existingModal = document.getElementById('rate-modal-modern');
  if (existingModal) existingModal.remove();

  // Adicionar modal ao DOM
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Event listeners
  const modal = document.getElementById('rate-modal-modern');
  const closeBtn = document.getElementById('close-rate-modal');

  function closeModal() {
    if (modal) modal.remove();
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
};

window.showWhatsNew = async function () {
  console.log('[DEBUG] showWhatsNew executada!');

  try {
    // Importar o changelog
    const { getLatestChangeLog } = await import('@app/changelog.js');
    const latestChangelog = getLatestChangeLog();

    if (!latestChangelog) {
      console.warn('[DEBUG] Nenhum changelog encontrado');
      fallbackAlert();
      return;
    }

    console.log('[DEBUG] Changelog carregado:', latestChangelog);

    // Gerar HTML do changelog
    const html = `
      <div class="space-y-6">
        <!-- Header do Modal -->
        <div class="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-3xl text-white">🚀</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Novidades da Versão</h2>
          <p class="text-gray-600 dark:text-gray-400">Confira as últimas melhorias e recursos</p>
        </div>

        <!-- Changelog Principal -->
        <div class="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/30 dark:to-purple-800/20 p-6 rounded-xl border border-violet-200 dark:border-violet-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-violet-500 rounded-lg flex items-center justify-center shadow-md">
              <span class="text-xl text-white">✨</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-violet-800 dark:text-violet-200">${latestChangelog.title}</h3>
              <p class="text-sm text-violet-600 dark:text-violet-400">📅 ${latestChangelog.date}</p>
            </div>
          </div>
          <div class="space-y-3">
            ${latestChangelog.items.map(item => `
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="flex items-start gap-3">
                  <span class="text-violet-500 mt-1">🔹</span>
                  <span class="text-gray-700 dark:text-gray-300">${item}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Dica -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
              <span class="text-xl text-white">💡</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-blue-800 dark:text-blue-200">Dica Importante</h3>
              <p class="text-sm text-blue-600 dark:text-blue-400">Informações sobre esta atualização</p>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p class="text-gray-700 dark:text-gray-300">
              Esta versão traz headers harmonizados em todas as abas, um modal de alertas interativo no Dashboard e otimizações mobile significativas. 
              O design agora está completamente unificado com melhor aproveitamento do espaço em dispositivos móveis.
            </p>
          </div>
        </div>

        <!-- Ações -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
              <span class="text-xl text-white">🎯</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-green-800 dark:text-green-200">Próximos Passos</h3>
              <p class="text-sm text-green-600 dark:text-green-400">Aproveite ao máximo as novas funcionalidades</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button id="go-to-dashboard-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
              <span>📊</span>
              <span>Ver Dashboard</span>
            </button>
            <button id="understand-btn" class="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
              <span>✅</span>
              <span>Entendi</span>
            </button>
          </div>
        </div>
      </div>
    `;

    console.log('[DEBUG] Verificando disponibilidade do Modal...');
    console.log('[DEBUG] window.Modal disponível:', !!window.Modal);

    // Criar modal diretamente no DOM (como fizemos com outros modais)
    const modalHTML = `
      <div id="whats-new-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          ${html}
          <!-- Botão de fechar -->
          <div class="text-center p-6 border-t border-gray-200 dark:border-gray-700">
            <button id="close-whats-new-modal" class="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200">
              Fechar
            </button>
          </div>
        </div>
      </div>
    `;

    // Remover modal existente se houver
    const existingModal = document.getElementById('whats-new-modal');
    if (existingModal) {
      existingModal.remove();
    }

    // Adicionar modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Event listeners
    const modal = document.getElementById('whats-new-modal');
    const closeBtn = document.getElementById('close-whats-new-modal');
    const goToDashboardBtn = document.getElementById('go-to-dashboard-btn');
    const understandBtn = document.getElementById('understand-btn');

    function closeModal() {
      if (modal) modal.remove();
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (goToDashboardBtn) {
      goToDashboardBtn.addEventListener('click', () => {
        closeModal();
        window.location.hash = '#/dashboard';
      });
    }

    if (understandBtn) {
      understandBtn.addEventListener('click', closeModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

  } catch (error) {
    console.error('[DEBUG] Erro ao carregar changelog:', error);
    fallbackAlert();
  }

  function fallbackAlert() {
    console.log('[DEBUG] Executando fallback alert...');
    alert('🆕 Novidades v4.43.0:\n\n🎨 Headers Harmonizados: Design unificado em todas as abas\n🎯 Seletor de Período Minimalista: Interface clean e compacta\n📱 Otimização Mobile: Espaçamentos melhorados para mobile\n👑 Card Proprietário Melhorado: Layout vertical mais claro\n🚨 Modal de Alertas Clicável: Clique em "Alertas" no Dashboard\n📊 Informações Detalhadas: Gasto, limite e percentual por categoria\n🎨 Interface Moderna: Barras de progresso animadas\n🔧 Eliminação de Redundâncias: Informações duplicadas removidas\n⚡ Event Handlers Precisos: Cliques corrigidos sem falsos positivos\n📋 Seção Resumo Otimizada: Layout mais limpo e organizado\n🚀 Performance Melhorada: Otimizações de cache e renderização');
  }
};

window.installApp = function () {
  console.log('[DEBUG] Iniciando processo de instalação do app...');

  try {
    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true) {
      console.log('[DEBUG] App já está instalado');
      snk().info('O app já está instalado no seu dispositivo!');
      return;
    }

    // SEMPRE mostrar o modal moderno com instruções
    console.log('[DEBUG] Mostrando modal de instalação moderno...');

    // Verificar se é um navegador compatível
    if (navigator.userAgent.includes('Chrome') ||
        navigator.userAgent.includes('Edge') ||
        navigator.userAgent.includes('Safari') ||
        navigator.userAgent.includes('Android') ||
        navigator.userAgent.includes('iPhone') ||
        navigator.userAgent.includes('iPad')) {

        // Mostrar instruções manuais com design moderno (v1.0.5)
        console.log('[DEBUG] 🎨 Mostrando modal de instalação MODERNO v1.0.5');
        const modalHTML = `
          <div id="install-app-modal-v105" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <!-- Header -->
              <div class="text-center p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span class="text-3xl text-white">📱</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Instalar Aplicativo</h2>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Adicione à sua tela inicial para acesso rápido</p>
              </div>

              <!-- Content -->
              <div class="p-6 space-y-4">
                <!-- Como instalar -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                      <span class="text-lg text-white">📲</span>
                    </div>
                    <h3 class="font-semibold text-blue-800 dark:text-blue-200">Como Instalar</h3>
                  </div>
                  <div class="space-y-3 text-sm">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                      <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">🌐 Chrome/Edge (Desktop)</p>
                      <p class="text-gray-600 dark:text-gray-400 text-xs">Clique no ícone de instalação (➕) na barra de endereços</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                      <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">🤖 Android</p>
                      <p class="text-gray-600 dark:text-gray-400 text-xs">Menu (⋮) → "Instalar app" ou "Adicionar à tela inicial"</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                      <p class="font-medium text-gray-700 dark:text-gray-300 mb-1">🍎 Safari (iOS)</p>
                      <p class="text-gray-600 dark:text-gray-400 text-xs">Compartilhar (⎙) → "Adicionar à Tela Inicial"</p>
                    </div>
                  </div>
                </div>

                <!-- Benefícios -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl border border-green-200 dark:border-green-700">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                      <span class="text-lg text-white">✨</span>
                    </div>
                    <h3 class="font-semibold text-green-800 dark:text-green-200">Benefícios</h3>
                  </div>
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                      <span class="text-green-600 dark:text-green-400">🚀</span>
                      <p class="text-gray-700 dark:text-gray-300 font-medium mt-1">Acesso Rápido</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                      <span class="text-blue-600 dark:text-blue-400">📡</span>
                      <p class="text-gray-700 dark:text-gray-300 font-medium mt-1">Funciona Offline</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                      <span class="text-purple-600 dark:text-purple-400">🔔</span>
                      <p class="text-gray-700 dark:text-gray-300 font-medium mt-1">Notificações</p>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                      <span class="text-orange-600 dark:text-orange-400">⚡</span>
                      <p class="text-gray-700 dark:text-gray-300 font-medium mt-1">Performance</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="p-6 border-t border-gray-200 dark:border-gray-700">
                <button id="close-install-modal" class="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  Entendi
                </button>
              </div>
            </div>
          </div>
        `;

        // Remover modais existentes se houver (todas as versões)
        const existingModal = document.getElementById('install-app-modal');
        const existingModalV105 = document.getElementById('install-app-modal-v105');
        if (existingModal) existingModal.remove();
        if (existingModalV105) existingModalV105.remove();

        // Adicionar modal ao DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Event listeners
        const modal = document.getElementById('install-app-modal-v105');
        const closeBtn = document.getElementById('close-install-modal');

        function closeModal() {
          if (modal) modal.remove();
        }

        if (closeBtn) {
          closeBtn.addEventListener('click', closeModal);
        }

        if (modal) {
          modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
          });
        }
    } else {
      snk().warning('Instalação não disponível neste navegador');
    }

  } catch (error) {
    console.error('[DEBUG] Erro na instalação:', error);
    snk().error('Erro no processo de instalação');
  }
};

// Delegated events ---------------------------------------------------------
// Event listener global único para todos os cliques
document.addEventListener('click', (ev) => {
  const t = ev.target;

  // 🚨 IGNORAR COMPLETAMENTE CLIQUES NO FAB - ANTES DE QUALQUER LOG!
  if (t.closest('#fab-container-main') || t.id === 'fab-main' || t.id?.startsWith('fab-')) {
    // NÃO FAZER NADA - deixar o FAB funcionar sozinho
    return; // Sair IMEDIATAMENTE
  }

  // Log geral para debug
  console.log('[DEBUG] Click detectado:', t.tagName, t.className, t.id, t.textContent?.substring(0, 50));

  // Se clicar em SVG ou PATH dentro de BUTTON, redirecionar para o botão
  let buttonToExecute = null;
  
  if ((t.tagName === 'SPAN' || t.tagName === 'SVG' || t.tagName === 'PATH') && t.closest('button')) {
    buttonToExecute = t.closest('button');
    console.log('[DEBUG] 🔄 Elemento filho de BUTTON detectado, redirecionando para BUTTON pai');
  } else if (t.tagName === 'BUTTON') {
    buttonToExecute = t;
    console.log('[DEBUG] 🔄 BUTTON detectado diretamente');
  }
  
  if (buttonToExecute) {
    // Verificar se é um botão de modal (que usa addEventListener, não onclick)
    const isModalButton = buttonToExecute.classList.contains('confirm-modal-confirm') || 
                          buttonToExecute.classList.contains('confirm-modal-cancel');
    
    if (isModalButton) {
      console.log('[DEBUG] 🎯 Botão de modal detectado - NÃO interceptando!');
      // NÃO FAZER NADA - deixar o addEventListener do modal funcionar
      return; // Sair do handler para não interferir
    }
    
    // Verificar se é um botão do FAB (que usa addEventListener, não onclick)
    const isFABButton = buttonToExecute.id === 'fab-main' || 
                        buttonToExecute.id?.startsWith('fab-') ||
                        buttonToExecute.closest('#fab-container-main');
    
    if (isFABButton) {
      console.log('[DEBUG] 🎯 Botão do FAB detectado - NÃO interceptando!');
      // NÃO FAZER NADA - deixar o addEventListener do FAB funcionar
      return; // Sair do handler para não interferir
    }
    
    // Obter o atributo onclick (que é uma string)
    const onclickAttr = buttonToExecute.getAttribute('onclick');
    
    if (onclickAttr) {
      console.log('[DEBUG] ✅ Executando onclick do botão:', onclickAttr.substring(0, 100) + '...');
      try {
        // Executar o código onclick com o contexto correto do elemento
        // Criar uma função que preserva o contexto 'this'
        const fnCode = `(function() { ${onclickAttr} })`;
        const fn = eval(fnCode);
        fn.call(buttonToExecute); // Chamar com o contexto correto
        console.log('[DEBUG] ✅ onclick executado com sucesso!');
        // Não retornar aqui - permitir que outros handlers sejam executados também
      } catch (err) {
        console.error('[DEBUG] ❌ Erro ao executar onclick:', err);
      }
    } else {
      console.log('[DEBUG] ⚠️ Botão não tem onclick, deixando evento continuar');
    }
  }

  // Log específico para botão de teste
  if (t.id === 'test-notifications-btn') {
    console.log('[DEBUG] 🎯 BOTÃO DE TESTE DETECTADO!');
    console.log('[DEBUG] Evento completo:', ev);
    console.log('[DEBUG] Target:', t);
    console.log('[DEBUG] ID:', t.id);
    console.log('[DEBUG] Texto:', t.textContent);
    console.log('[DEBUG] Continuando para o handler específico...');
  }
  // Se for um SPAN dentro do botão de tema, processar como se fosse o botão
  if (t.textContent?.includes('🌙') || t.textContent?.includes('☀️')) {
    if (t.tagName === 'SPAN' && t.parentElement?.classList?.contains('theme-toggle-btn')) {
      const button = t.parentElement;

      // Alternar entre light e dark
      const isDark = document.documentElement.classList.contains('dark');

      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        // Atualizar o ícone no span interno
        const iconSpan = button.querySelector('span');
        if (iconSpan) {
          iconSpan.textContent = '🌙';
        }
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        // Atualizar o ícone no span interno
        const iconSpan = button.querySelector('span');
        if (iconSpan) {
          iconSpan.textContent = '☀️';
        }
      }

      // Mostrar snackbar
      if (window.snk) {
        window.snk().success(`Tema alterado para ${isDark ? 'claro' : 'escuro'}`);
      }

      return; // Evitar processamento duplo
    }
  }


  // Verificar se é um dos elementos que queremos tratar
  const isTargetElement = t.textContent?.includes('Backup completo') ||
                         t.textContent?.includes('Importar Dados') ||
                         t.textContent?.includes('Limpar Dados') ||
                         t.textContent?.includes('Exportar Dados') ||
                         t.textContent?.includes('Restaurar backup') ||
                         t.textContent?.includes('Remover tudo') ||
                         t.textContent?.includes('Enviar Convite') ||
                         t.textContent?.includes('📤 Enviar') ||
                         t.textContent?.includes('Aceitar') ||
                         t.textContent?.includes('Recusar') ||
                         t.id === 'export-data-btn' ||
                         t.id === 'import-data-btn' ||
                         t.id === 'share-budget-btn' ||
                         t.classList?.contains('accept-invitation-btn') ||
                         t.classList?.contains('decline-invitation-btn') ||
                         t.id === 'clear-data-btn' ||
                         t.id === 'btn-logout' ||
                         t.id === 'limit-alerts-toggle' ||
                         t.id === 'recurring-reminders-toggle' ||
                         t.id === 'weekly-summary-toggle' ||
                         t.id === 'toast-hover-pause' ||
                         t.id === 'apply-toast-settings' ||
                         t.id === 'reset-toast-settings' ||
                         t.id === 'test-toast' ||
                         t.id === 'debug-snackbar' ||
                         t.id === 'test-direct' ||
                         t.id === 'debug-complete' ||
                         t.id === 'test-console' ||
                         t.id === 'test-compact' ||
                         t.id === 'test-days-chunk' ||
                         t.id === 'test-animations' ||
                         t.id === 'compact-mode-toggle' ||
                         t.id === 'animations-toggle' ||
                         t.id === 'performance-telemetry-toggle' ||
                         t.id === 'biometric-auth-toggle' ||
                         t.id === 'auto-sync-toggle' ||
                         t.id === 'analytics-toggle' ||
                         t.id === 'view-performance-events' ||
                         t.id === 'save-days-chunk' ||
                         t.id === 'reset-days-chunk' ||
                         t.id === 'check-updates-btn' ||
                         t.closest('#check-updates-btn') ||
                         t.id === 'help-support-btn' ||
                         t.closest('#help-support-btn') ||
                         t.id === 'toggle-theme-btn' ||
                         t.classList?.contains('theme-toggle-btn') ||
                         t.classList?.contains('enter-budget-button') ||
                         t.classList?.contains('copy-budget-id-btn') ||
                         t.classList?.contains('delete-budget-btn') ||
                         t.classList?.contains('leave-budget-btn') ||
                         t.id === 'enter-budget-button' ||
                         t.id === 'enter-text' ||
                         t.classList?.contains('color-theme-btn') ||
                         t.classList?.contains('compact-size-btn') ||
                         t.textContent?.includes('Copiar Informações') ||
                         t.textContent?.includes('Limpar Cache Offline') ||
                         t.textContent?.includes('O que mudou') ||
                         t.textContent?.includes('Instalar App') ||
                         t.textContent?.includes('Copiar ID') ||
                         t.textContent?.includes('Excluir') ||
                         t.textContent?.trim() === 'Entrar' ||
                         t.textContent?.trim() === 'Sair' ||
                         t.id === 'test-notifications-btn' ||
                         t.id === 'install-app-btn' ||
                         t.textContent?.includes('Testar Notificações');

  // Debug para verificar se isTargetElement está funcionando
  if (t.id === 'btn-logout' || t.textContent?.trim() === 'Sair') {
    console.log('[DEBUG] isTargetElement para logout:', isTargetElement);
  }

  // Handler específico para logout - executar primeiro
  if (t.id === 'btn-logout' || t.textContent?.trim() === 'Sair') {
    console.log('[DEBUG] Handler logout executado!');

    ev.preventDefault();
    ev.stopPropagation();

    // Confirmar logout
    if (confirm('Tem certeza que deseja sair? Você será deslogado do aplicativo.')) {
      console.log('[DEBUG] Logout confirmado pelo usuário');

      // Mostrar feedback
      snk().info('Fazendo logout...');

      // Executar logout
      if (typeof window.logout === 'function') {
        console.log('[DEBUG] Executando window.logout()...');
        window.logout();
      } else {
        console.warn('[DEBUG] window.logout não está disponível, tentando importar...');

        // Tentar importar e executar logout
        import('@features/auth/AuthService.js').then(authService => {
          console.log('[DEBUG] AuthService importado, executando logout...');
          authService.logout();
        }).catch(err => {
          console.error('[DEBUG] Erro ao importar AuthService:', err);

          // Fallback moderno: usar API modular de auth
          import('firebase/auth').then(async ({ signOut }) => {
            try {
              const { auth } = await import('@data/firebase/client.js');
              await signOut(auth);
              console.log('[DEBUG] Logout via Firebase (modular) realizado');
              snk().success('Logout realizado com sucesso');
              window.location.reload();
            } catch (error) {
              console.error('[DEBUG] Erro no logout (modular):', error);
              snk().error('Erro ao fazer logout');
            }
          }).catch((err) => {
            console.error('[DEBUG] Erro ao carregar firebase/auth:', err);
            snk().error('Erro: Sistema de autenticação não disponível');
          });
        });
      }
    } else {
      console.log('[DEBUG] Logout cancelado pelo usuário');
      snk().info('Logout cancelado');
    }

    return; // Sair da função após processar logout
  }

  if (!isTargetElement) {
    return; // Silenciosamente ignora elementos não alvo
  }


  // Não prevenir o comportamento padrão para toggles - deixar eles mudarem visualmente
  if (t.type === 'checkbox') {
    // Para checkboxes, não prevenir o comportamento padrão
    // O toggle vai mudar visualmente, depois executamos nossa lógica
    setTimeout(() => {
      // Executar nossa lógica após o toggle mudar
      handleToggleChange(t);
    }, 0);
    return;
  }

  ev.preventDefault();
  ev.stopPropagation();

  // Handlers para convites
  const acc = t.closest('[data-accept-inv]');
  if (acc) { window.acceptInvitation(acc.getAttribute('data-accept-inv')); return; }
  const dec = t.closest('[data-decline-inv]');
  if (dec) { window.declineInvitation(dec.getAttribute('data-decline-inv')); return; }
  const cancel = t.closest('[data-cancel-inv]');
  if (cancel) { window.cancelSentInvitation(cancel.getAttribute('data-cancel-inv')); return; }
  const removeUserBtn = t.closest('[data-remove-user]');
  if (removeUserBtn) { window.removeUserFromBudget(removeUserBtn.getAttribute('data-remove-user')); return; }

  // Handlers para botões de orçamento
  const enterBudget = t.closest('.enter-budget-button') || t.closest('#enter-budget-button');
  if (enterBudget) {
    console.log('[DEBUG] Handler enter-budget-button executado!');
    const budgetId = enterBudget.getAttribute('data-budget-id');
    const budgetName = enterBudget.getAttribute('data-budget-name');
    console.log('[DEBUG] Budget ID:', budgetId, 'Budget Name:', budgetName);

    if (budgetId) {
      window.enterBudget(budgetId, budgetName);
    } else {
      console.warn('[DEBUG] Budget ID não encontrado no elemento');
      snk().error('Erro: ID do orçamento não encontrado');
    }
    return;
  }

  // Handler para botão Copiar ID do orçamento
  const copyBudgetId = t.closest('.copy-budget-id-btn');
  if (copyBudgetId) {
    console.log('[DEBUG] Handler copy-budget-id-btn executado!');
    const budgetId = copyBudgetId.getAttribute('data-budget-id');
    console.log('[DEBUG] Budget ID para copiar:', budgetId);

    if (budgetId) {
      window.copyBudgetId(budgetId);
    } else {
      console.warn('[DEBUG] Budget ID não encontrado no elemento');
      snk().error('Erro: ID do orçamento não encontrado');
    }
    return;
  }

  // Handler para botão Excluir orçamento
  const deleteBudget = t.closest('.delete-budget-btn');
  if (deleteBudget) {
    console.log('[DEBUG] Handler delete-budget-btn executado!');
    const budgetId = deleteBudget.getAttribute('data-budget-id');
    const budgetName = deleteBudget.getAttribute('data-budget-name');
    console.log('[DEBUG] Budget ID para excluir:', budgetId, 'Budget Name:', budgetName);

    if (budgetId) {
      window.deleteBudgetFromSettings(budgetId, budgetName);
    } else {
      console.warn('[DEBUG] Budget ID não encontrado no elemento');
      snk().error('Erro: ID do orçamento não encontrado');
    }
    return;
  }

  // Handler para botão Sair do orçamento
  const leaveBudget = t.closest('.leave-budget-btn');
  if (leaveBudget) {
    console.log('[DEBUG] Handler leave-budget-btn executado!');
    const budgetId = leaveBudget.getAttribute('data-budget-id');
    const budgetName = leaveBudget.getAttribute('data-budget-name');
    console.log('[DEBUG] Budget ID para sair:', budgetId, 'Budget Name:', budgetName);

    if (budgetId) {
      window.leaveBudget(budgetId, budgetName);
    } else {
      console.warn('[DEBUG] Budget ID não encontrado no elemento');
      snk().error('Erro: ID do orçamento não encontrado');
    }
    return;
  }

  // Handler alternativo por ID
  if (t.id === 'enter-budget-button') {
    console.log('[DEBUG] Handler alternativo enter-budget-button executado!');
    const budgetId = t.getAttribute('data-budget-id');
    const budgetName = t.getAttribute('data-budget-name');
    console.log('[DEBUG] Budget ID:', budgetId, 'Budget Name:', budgetName);

    if (budgetId) {
      window.enterBudget(budgetId, budgetName);
    } else {
      console.warn('[DEBUG] Budget ID não encontrado no elemento');
      snk().error('Erro: ID do orçamento não encontrado');
    }
    return;
  }

  // Handler para o texto "Entrar" dentro do botão
  if (t.textContent?.trim() === 'Entrar' || t.id === 'enter-text') {
    console.log('[DEBUG] Handler "Entrar" executado!');
    console.log('[DEBUG] Elemento clicado:', t);

    // Procurar o botão pai que contém os dados
    const parentButton = t.closest('button') || t.closest('.enter-budget-button') || t.closest('#enter-budget-button');
    if (parentButton) {
      console.log('[DEBUG] Botão pai encontrado:', parentButton);
      const budgetId = parentButton.getAttribute('data-budget-id');
      const budgetName = parentButton.getAttribute('data-budget-name');
      console.log('[DEBUG] Budget ID do pai:', budgetId, 'Budget Name do pai:', budgetName);

      if (budgetId) {
        window.enterBudget(budgetId, budgetName);
      } else {
        console.warn('[DEBUG] Budget ID não encontrado no botão pai');
        snk().error('Erro: ID do orçamento não encontrado');
      }
    } else {
      console.warn('[DEBUG] Botão pai não encontrado');
      snk().error('Erro: Botão pai não encontrado');
    }
    return;
  }

  // Handlers para botões de tema
  const colorTheme = t.closest('.color-theme-btn');
  if (colorTheme) {
    const theme = colorTheme.getAttribute('data-theme');
    if (theme) {
      window.toggleThemeColor(theme);
    }
    return;
  }

  // Handlers para botões de tamanho compacto
  const compactSize = t.closest('.compact-size-btn');
  if (compactSize) {
    const size = compactSize.getAttribute('data-size');
    if (size) {
      applyCompactSize(size);
      snk().success(`Tamanho compacto: ${size}`);
    }
    return;
  }

  // Handlers para configurações de toast
  if (t.id === 'apply-toast-settings') {
    console.log('[DEBUG] Handler apply-toast-settings executado!');
    const limitAlerts = document.getElementById('limit-alerts-toggle')?.checked || false;
    const recurringReminders = document.getElementById('recurring-reminders-toggle')?.checked || false;
    const weeklySummary = document.getElementById('weekly-summary-toggle')?.checked || false;
    const hoverPause = document.getElementById('toast-hover-pause')?.checked || false;

    localStorage.setItem('noti_limit_alerts', limitAlerts);
    localStorage.setItem('noti_recurring_reminders', recurringReminders);
    localStorage.setItem('noti_weekly_summary', weeklySummary);
    localStorage.setItem('toast_hover_pause', hoverPause);

    // Aplicar todas as configurações do toast
    applyToastSettings();

    // Forçar reaplicação após um delay para garantir
    setTimeout(() => {
      applyToastSettings();
      console.log('[DEBUG] Configurações reaplicadas após timeout');
    }, 100);

    // Verificar se as configurações foram realmente aplicadas
    setTimeout(() => {
      if (window.Snackbar && window.Snackbar.__getStatsForTest) {
        const stats = window.Snackbar.__getStatsForTest();
        console.log('[DEBUG] Stats do Snackbar após aplicação:', stats);
      }
    }, 200);

    snk().success('Configurações de notificação aplicadas');
    return;
  }

  if (t.id === 'reset-toast-settings') {
    console.log('[DEBUG] Handler reset-toast-settings executado!');

    // Resetar toggles
    document.getElementById('limit-alerts-toggle').checked = true;
    document.getElementById('recurring-reminders-toggle').checked = true;
    document.getElementById('weekly-summary-toggle').checked = false;
    document.getElementById('toast-hover-pause').checked = true;

    // Usar o sistema simplificado de reset
    if (typeof window.resetSimpleSnackbarConfig === 'function') {
      window.resetSimpleSnackbarConfig();
    }

    snk().info('Configurações restauradas para o padrão');
    return;
  }

  if (t.id === 'test-toast') {
    console.log('[DEBUG] Handler test-toast executado!');

    // Usar o sistema simplificado de teste
    if (typeof window.testSimpleSnackbarConfig === 'function') {
      window.testSimpleSnackbarConfig();
    } else {
      console.warn('[DEBUG] Sistema simplificado não disponível, usando fallback...');
      snk().info('Teste INFO - Sistema antigo!');
    }

    return;
  }

  // Botão de debug temporário para forçar reinicialização
  if (t.id === 'debug-snackbar') {
    console.log('[DEBUG] Handler debug-snackbar executado!');

    // Teste direto sem intermediários
    console.log('[DEBUG] Testando Snackbar diretamente...');
    console.log('[DEBUG] window.Snackbar disponível:', !!window.Snackbar);
    console.log('[DEBUG] window.SnackbarInstance disponível:', !!window.SnackbarInstance);

    if (window.Snackbar) {
      // Teste básico
      window.Snackbar.info('Teste direto - INFO');
      setTimeout(() => {
        window.Snackbar.success('Teste direto - SUCCESS');
      }, 100);
      setTimeout(() => {
        window.Snackbar.warning('Teste direto - WARNING');
      }, 200);
    } else {
      console.error('[DEBUG] window.Snackbar não está disponível!');
      alert('ERRO: window.Snackbar não está disponível!');
    }

    return;
  }

  // Botão de teste direto
  if (t.id === 'test-direct') {
    console.log('[DEBUG] Handler test-direct executado!');

    // Teste ultra-simples
    console.log('[DEBUG] === TESTE DIRETO ===');
    console.log('[DEBUG] window.Snackbar:', window.Snackbar);
    console.log('[DEBUG] window.SnackbarInstance:', window.SnackbarInstance);

    // Teste 1: Snackbar básico
    if (window.Snackbar) {
      console.log('[DEBUG] Testando window.Snackbar.info...');
      window.Snackbar.info('Teste 1: INFO básico');
    }

    // Teste 2: Snackbar com configurações
    if (window.SnackbarInstance) {
      console.log('[DEBUG] Configurações atuais da instância:', {
        defaultDuration: window.SnackbarInstance.defaultDuration,
        bottomOffset: window.SnackbarInstance.bottomOffset,
        position: window.SnackbarInstance.position,
        align: window.SnackbarInstance.align
      });

      // Modificar configurações diretamente
      window.SnackbarInstance.defaultDuration = 5000;
      window.SnackbarInstance.position = 'top';
      window.SnackbarInstance.align = 'right';

      console.log('[DEBUG] Configurações modificadas:', {
        defaultDuration: window.SnackbarInstance.defaultDuration,
        position: window.SnackbarInstance.position,
        align: window.SnackbarInstance.align
      });

      // Testar com configurações modificadas
      setTimeout(() => {
        window.Snackbar.success('Teste 2: SUCCESS com configurações modificadas');
      }, 100);
    }

    return;
  }

  // Botão de debug completo
  if (t.id === 'debug-complete') {
    console.log('[DEBUG] Handler debug-complete executado!');

    // Carregar e executar debug completo
    const script = document.createElement('script');
    script.src = '/src/js/config/debug-snackbar.js';
    script.onload = () => {
      console.log('[DEBUG] Script de debug carregado');
      if (typeof window.debugSnackbarSystem === 'function') {
        window.debugSnackbarSystem();
      }
    };
    document.head.appendChild(script);

    return;
  }

  // Botão para testar no console
  if (t.id === 'test-console') {
    console.log('[DEBUG] Handler test-console executado!');

    // Executar teste direto no console
    console.log('[DEBUG] === TESTE NO CONSOLE ===');
    console.log('[DEBUG] Execute os comandos abaixo no console:');
    console.log('[DEBUG] 1. localStorage.setItem("toastDuration", "5000")');
    console.log('[DEBUG] 2. localStorage.setItem("toastPosition", "top")');
    console.log('[DEBUG] 3. localStorage.setItem("toastAlignment", "right")');
    console.log('[DEBUG] 4. window.SnackbarInstance.defaultDuration = 5000');
    console.log('[DEBUG] 5. window.SnackbarInstance.position = "top"');
    console.log('[DEBUG] 6. window.SnackbarInstance.align = "right"');
    console.log('[DEBUG] 7. window.Snackbar.info("Teste final!")');

    // Executar automaticamente
    localStorage.setItem('toastDuration', '5000');
    localStorage.setItem('toastPosition', 'top');
    localStorage.setItem('toastAlignment', 'right');

    if (window.SnackbarInstance) {
      window.SnackbarInstance.defaultDuration = 5000;
      window.SnackbarInstance.position = 'top';
      window.SnackbarInstance.align = 'right';

      console.log('[DEBUG] Configurações aplicadas automaticamente');
      console.log('[DEBUG] Estado da instância:', {
        defaultDuration: window.SnackbarInstance.defaultDuration,
        position: window.SnackbarInstance.position,
        align: window.SnackbarInstance.align
      });

      // Testar
      window.Snackbar.info('Teste final: Configurações aplicadas!');
    }

    return;
  }

  // Botão para testar modo compacto
  if (t.id === 'test-compact') {
    console.log('[DEBUG] Handler test-compact executado!');

    // Testar modo compacto
    console.log('[DEBUG] === TESTE MODO COMPACTO ===');
    console.log('[DEBUG] Estado atual do body:');
    console.log('  - Classes:', document.body.className);
    console.log('  - data-compact-mode:', document.body.getAttribute('data-compact-mode'));
    console.log('  - data-compact-size:', document.body.getAttribute('data-compact-size'));

    // Alternar modo compacto
    const isCompact = document.body.classList.contains('compact-mode');
    if (isCompact) {
      console.log('[DEBUG] Desativando modo compacto...');
      applyCompactMode(false);
    } else {
      console.log('[DEBUG] Ativando modo compacto...');
      applyCompactMode(true);
    }

    // Aguardar um pouco e testar tamanhos
    setTimeout(() => {
      console.log('[DEBUG] Testando tamanho Micro...');
      applyCompactSize('micro');
    }, 1000);

    setTimeout(() => {
      console.log('[DEBUG] Testando tamanho Nano...');
      applyCompactSize('nano');
    }, 2000);

    setTimeout(() => {
      console.log('[DEBUG] Voltando ao normal...');
      applyCompactMode(false);
    }, 3000);

    return;
  }

  // Botão para testar animações
  if (t.id === 'test-animations') {
    console.log('[DEBUG] Handler test-animations executado!');

    // Testar funcionalidade
    console.log('[DEBUG] === TESTE ANIMAÇÕES ===');

    const currentState = document.body.classList.contains('no-animations');
    console.log('[DEBUG] Estado atual - no-animations presente:', currentState);

    // Alternar estado para testar
    if (currentState) {
      console.log('[DEBUG] Ativando animações...');
      document.body.classList.remove('no-animations');
      localStorage.setItem('animationsEnabled', 'true');
      snk().success('Animações ativadas para teste!');

      // Teste visual com animações
      setTimeout(() => {
        testAnimationsVisual();
      }, 500);
    } else {
      console.log('[DEBUG] Desativando animações...');
      document.body.classList.add('no-animations');
      localStorage.setItem('animationsEnabled', 'false');
      snk().info('Animações desativadas para teste!');

      // Teste visual sem animações
      setTimeout(() => {
        testAnimationsVisual();
      }, 500);
    }

    // Aguardar e restaurar estado original
    setTimeout(() => {
      console.log('[DEBUG] Restaurando estado original...');
      if (currentState) {
        document.body.classList.add('no-animations');
        localStorage.setItem('animationsEnabled', 'false');
      } else {
        document.body.classList.remove('no-animations');
        localStorage.setItem('animationsEnabled', 'true');
      }
      snk().info('Estado das animações restaurado!');
    }, 3000);

    return;
  }

  // Botão para testar tamanho do bloco de dias
  if (t.id === 'test-days-chunk') {
    console.log('[DEBUG] Handler test-days-chunk executado!');

    // Testar funcionalidade
    console.log('[DEBUG] === TESTE TAMANHO DO BLOCO ===');

    const input = document.getElementById('days-chunk-size');
    if (input) {
      console.log('[DEBUG] Input encontrado:', input);
      console.log('[DEBUG] Valor atual:', input.value);

      // Testar diferentes valores
      const testValues = ['', '12', '16', '25', 'automático'];
      let currentIndex = 0;

      const testNext = () => {
        if (currentIndex < testValues.length) {
          const testValue = testValues[currentIndex];
          input.value = testValue;

          console.log(`[DEBUG] Testando valor: "${testValue}"`);

          // Simular evento de input
          const inputEvent = new Event('input', { bubbles: true });
          input.dispatchEvent(inputEvent);

          currentIndex++;
          setTimeout(testNext, 1000);
        } else {
          console.log('[DEBUG] Teste concluído');
          snk().info('Teste do tamanho do bloco concluído!');
        }
      };

      testNext();
    } else {
      console.warn('[DEBUG] Input days-chunk-size não encontrado');
      snk().error('Erro: Campo de entrada não encontrado');
    }

    return;
  }

  // Handlers para botões de configuração
  if (t.id === 'save-days-chunk') {
    console.log('[DEBUG] Handler save-days-chunk executado!');

    const input = document.getElementById('days-chunk-size');
    if (input) {
      const inputValue = input.value.trim();
      console.log('[DEBUG] Valor do input:', inputValue);

      if (inputValue === '' || inputValue.toLowerCase() === 'automático') {
        // Modo automático
        localStorage.removeItem('txChunkSize');
        console.log('[DEBUG] Modo automático ativado');
        snk().success('Modo automático ativado - sistema ajustará automaticamente');
      } else {
        // Modo manual
        const value = parseInt(inputValue);
        if (isNaN(value) || value < 6 || value > 40) {
          snk().error('Valor inválido! Use um número entre 6 e 40 (recomendado 10-16)');
          return;
        }

        localStorage.setItem('txChunkSize', value.toString());
        console.log('[DEBUG] Chunk de dias definido para:', value);
        snk().success(`Tamanho do bloco definido para ${value} grupos de dias`);
      }
    } else {
      console.warn('[DEBUG] Input days-chunk-size não encontrado');
      snk().error('Erro: Campo de entrada não encontrado');
    }
    return;
  }

  if (t.id === 'reset-days-chunk') {
    console.log('[DEBUG] Handler reset-days-chunk executado!');

    const input = document.getElementById('days-chunk-size');
    if (input) {
      input.value = '';
      localStorage.removeItem('txChunkSize');
      console.log('[DEBUG] Chunk de dias restaurado para o padrão (automático)');
      snk().info('Configuração restaurada para o padrão (automático)');
    } else {
      console.warn('[DEBUG] Input days-chunk-size não encontrado');
      snk().error('Erro: Campo de entrada não encontrado');
    }
    return;
  }

  // Handlers para botões de informações
  const whatsNew = t.closest('#whats-new-btn');
  if (whatsNew) {
    console.log('[DEBUG] Handler whats-new-btn executado!');
    window.showWhatsNew();
    return;
  }

  // Handler alternativo para "O que mudou" por ID
  if (t.id === 'whats-new-btn' || t.id === 'whats-new') {
    console.log('[DEBUG] Handler alternativo "O que mudou" executado!');
    window.showWhatsNew();
    return;
  }

  if (t.id === 'copy-info-btn') { window.copyAppInfo(); return; }
  if (t.id === 'clear-cache-btn') { window.clearOfflineCache(); return; }
  if (t.id === 'install-app-btn') { window.installApp(); return; }


  // Handler para backup
  if (t.closest('[data-action="backup"]')) {
    snk().info('Funcionalidade de backup em desenvolvimento');
    return;
  }

  // Handler para importar dados
  if (t.closest('[data-action="import"]')) {
    snk().info('Funcionalidade de importação em desenvolvimento');
    return;
  }

  // Handlers específicos para botões
  if (t.id === 'export-data-btn' || t.closest('#export-data-btn')) {
    console.log('[DEBUG] export-data-btn clicado!');

    // Mostrar feedback imediato
    snk().info('Preparando exportação de dados...');

    try {
      // Coletar todos os dados do usuário
      const { currentUser, currentBudget } = window.appState || {};

      if (!currentUser || !currentBudget) {
        snk().error('Usuário ou orçamento não encontrado');
        return;
      }

      const exportData = {
        metadata: {
          exportedAt: new Date().toISOString(),
          version: 'v4.40.0',
          userId: currentUser.uid,
          budgetId: currentBudget.id,
          budgetName: currentBudget.nome
        },
        budget: currentBudget,
        transactions: window.appState?.transactions || [],
        categories: window.appState?.categories || [],
        recorrentes: window.appState?.recorrentes || []
      };

      // Criar arquivo para download
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      // Criar link de download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `backup-${currentBudget.nome}-${new Date().toISOString().split('T')[0]}.json`;

      // Fazer download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      snk().success('Backup exportado com sucesso!');

    } catch (error) {
      console.error('[DEBUG] Erro ao exportar dados:', error);
      snk().error('Erro ao exportar dados');
    }

    return;
  }

  if (t.id === 'import-data-btn' || t.closest('#import-data-btn')) {
    console.log('[DEBUG] import-data-btn clicado!');

    // Criar input file para seleção de arquivo
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        snk().info('Lendo arquivo de backup...');

        const text = await file.text();
        const data = JSON.parse(text);

        // Validar estrutura do backup
        if (!data.metadata || !data.budget || !data.transactions || !data.categories) {
          snk().error('Arquivo de backup inválido');
          return;
        }

        // Mostrar modal de confirmação
        const confirmModal = `
            <div id="import-confirm-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div class="text-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span class="text-3xl text-white">📥</span>
                  </div>
                  <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Confirmar Importação</h2>
                  <p class="text-gray-600 dark:text-gray-400">Deseja importar os dados do backup?</p>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                  <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📊 Dados encontrados:</h3>
                  <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• <strong>Orçamento:</strong> ${data.budget.nome}</li>
                    <li>• <strong>Transações:</strong> ${data.transactions.length} itens</li>
                    <li>• <strong>Categorias:</strong> ${data.categories.length} itens</li>
                    <li>• <strong>Recorrentes:</strong> ${data.recorrentes.length} itens</li>
                    <li>• <strong>Data do backup:</strong> ${new Date(data.metadata.exportedAt).toLocaleDateString('pt-BR')}</li>
                  </ul>
                </div>
                <div class="flex gap-3">
                  <button id="cancel-import" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                    Cancelar
                  </button>
                  <button id="confirm-import" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                    Importar
                  </button>
                </div>
              </div>
            </div>
          `;

        document.body.insertAdjacentHTML('beforeend', confirmModal);

        const modal = document.getElementById('import-confirm-modal');
        const cancelBtn = document.getElementById('cancel-import');
        const confirmBtn = document.getElementById('confirm-import');

        function closeImportModal() {
          if (modal) modal.remove();
        }

        if (cancelBtn) {
          cancelBtn.addEventListener('click', closeImportModal);
        }

        if (confirmBtn) {
          confirmBtn.addEventListener('click', () => {
            closeImportModal();
            snk().warning('Funcionalidade de importação em desenvolvimento');
          });
        }

        if (modal) {
          modal.addEventListener('click', (e) => {
            if (e.target === modal) closeImportModal();
          });
        }

      } catch (error) {
        console.error('[DEBUG] Erro ao ler arquivo:', error);
        snk().error('Erro ao ler arquivo de backup');
      }
    };

    fileInput.click();
    return;
  }

  if (t.id === 'clear-data-btn' || t.closest('#clear-data-btn')) {
    console.log('[DEBUG] clear-data-btn clicado!');

    // Criar modal de confirmação personalizado
    const confirmModal = `
        <div id="clear-data-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span class="text-3xl text-white">⚠️</span>
              </div>
              <h2 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">Limpar Todos os Dados</h2>
              <p class="text-gray-600 dark:text-gray-400">Esta ação é irreversível!</p>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6 border border-red-200 dark:border-red-700">
              <h3 class="font-semibold text-red-800 dark:text-red-200 mb-2">🚨 Dados que serão removidos:</h3>
              <ul class="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Todas as transações</li>
                <li>• Todas as categorias</li>
                <li>• Todas as despesas recorrentes</li>
                <li>• Configurações do orçamento</li>
                <li>• Dados de compartilhamento</li>
              </ul>
            </div>
            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-6 border border-yellow-200 dark:border-yellow-700">
              <p class="text-xs text-yellow-700 dark:text-yellow-300">
                <strong>💡 Dica:</strong> Faça um backup usando "Exportar Dados" antes de limpar.
              </p>
            </div>
            <div class="flex gap-3">
              <button id="cancel-clear" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                Cancelar
              </button>
              <button id="confirm-clear" class="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-all duration-200">
                Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      `;

    document.body.insertAdjacentHTML('beforeend', confirmModal);

    const modal = document.getElementById('clear-data-modal');
    const cancelBtn = document.getElementById('cancel-clear');
    const confirmBtn = document.getElementById('confirm-clear');

    function closeClearModal() {
      if (modal) modal.remove();
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', closeClearModal);
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        closeClearModal();
        snk().warning('Funcionalidade de limpeza de dados em desenvolvimento');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeClearModal();
      });
    }

    return;
  }

  // Handlers para elementos de texto clicáveis
  if (t.textContent?.includes('Backup completo')) {
    console.log('[DEBUG] Backup completo clicado!');
    snk().info('Funcionalidade de backup em desenvolvimento');
    return;
  }

  if (t.textContent?.includes('Importar Dados')) {
    console.log('[DEBUG] Importar Dados clicado!');
    snk().info('Funcionalidade de importação em desenvolvimento');
    return;
  }

  if (t.textContent?.includes('Verificar Atualizações')) {
    console.log('[DEBUG] Verificar Atualizações clicado!');

    // Mostrar feedback imediato
    snk().info('Verificando atualizações...');

    // Verificar atualizações do Service Worker
    checkForUpdates();

    return;
  }

  if (t.id === 'help-support-btn' || t.closest('#help-support-btn')) {
    console.log('[DEBUG] Ajuda e Suporte clicado!');

    const helpContent = `
        <div class="space-y-6">
          <!-- Header do Modal -->
          <div class="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="text-3xl text-white">🆘</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Central de Ajuda</h2>
            <p class="text-gray-600 dark:text-gray-400">Estamos aqui para ajudar você!</p>
          </div>

          <!-- Contato Direto -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-xl text-white">📞</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-blue-800 dark:text-blue-200">Contato Direto</h3>
                <p class="text-sm text-blue-600 dark:text-blue-400">Fale conosco para suporte personalizado</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span class="text-xl">📧</span>
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">Email</div>
                  <div class="text-blue-600 dark:text-blue-400">igormbispo@hotmail.com</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span class="text-xl">📱</span>
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">WhatsApp</div>
                  <div class="text-green-600 dark:text-green-400">(71) 99200-3106</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <span class="text-xl">🕒</span>
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">Horário de Atendimento</div>
                  <div class="text-gray-600 dark:text-gray-400">Segunda a Sexta, 9h às 18h</div>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-xl text-white">❓</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-green-800 dark:text-green-200">Perguntas Frequentes</h3>
                <p class="text-sm text-green-600 dark:text-green-400">Respostas rápidas para dúvidas comuns</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="font-semibold text-gray-800 dark:text-gray-200 mb-1">💾 Como fazer backup dos dados?</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Use "Exportar Dados" na seção Dados e Privacidade</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="font-semibold text-gray-800 dark:text-gray-200 mb-1">🔄 Como sincronizar entre dispositivos?</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Faça login com a mesma conta Google em todos os dispositivos</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="font-semibold text-gray-800 dark:text-gray-200 mb-1">🔔 Como configurar notificações?</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Acesse a seção Notificações nas configurações</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <div class="font-semibold text-gray-800 dark:text-gray-200 mb-1">📱 Como usar offline?</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">O app funciona offline automaticamente após o primeiro acesso</div>
              </div>
            </div>
          </div>

          <!-- Ações Rápidas -->
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-xl text-white">⚡</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-purple-800 dark:text-purple-200">Ações Rápidas</h3>
                <p class="text-sm text-purple-600 dark:text-purple-400">Ferramentas úteis para resolver problemas</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button onclick="window.location.reload()" class="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
                <span>🔄</span>
                <span>Recarregar App</span>
              </button>
              <button onclick="if(window.clearOfflineCache) window.clearOfflineCache()" class="bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2">
                <span>🗑️</span>
                <span>Limpar Cache</span>
              </button>
            </div>
          </div>
        </div>
      `;

    // Criar modal diretamente no DOM (como fizemos com o modal de atualizações)
    const modalHTML = `
        <div id="help-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            ${helpContent}
            <!-- Botão de fechar -->
            <div class="text-center p-6 border-t border-gray-200 dark:border-gray-700">
              <button id="close-help-modal" class="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200">
                Fechar
              </button>
            </div>
          </div>
        </div>
      `;

    // Remover modal existente se houver
    const existingModal = document.getElementById('help-modal');
    if (existingModal) {
      existingModal.remove();
    }

    // Adicionar modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Event listeners
    const modal = document.getElementById('help-modal');
    const closeBtn = document.getElementById('close-help-modal');

    function closeModal() {
      if (modal) modal.remove();
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    return;
  }

  if (t.textContent?.includes('Avaliar App')) {
    console.log('[DEBUG] Avaliar App clicado!');

    // Verificar se é mobile ou desktop
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // Para mobile, tentar abrir a loja de apps
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes('android')) {
        // Android - tentar abrir Google Play
        window.open('https://play.google.com/store/apps/details?id=com.servotech.financeiro', '_blank');
        snk().success('Redirecionando para Google Play...');
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        // iOS - tentar abrir App Store
        window.open('https://apps.apple.com/app/financeiro-servotech/id123456789', '_blank');
        snk().success('Redirecionando para App Store...');
      } else {
        snk().info('Avalie o app na loja de aplicativos do seu dispositivo!');
      }
    } else {
      // Para desktop, mostrar modal com opções
      const ratingContent = `
          <div class="space-y-4">
            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⭐ Avalie o App</h3>
              <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                Sua avaliação é muito importante para nós! Ajude outros usuários a descobrir o app.
              </p>
              <div class="flex gap-2">
                <button onclick="window.open('https://play.google.com/store/apps/details?id=com.servotech.financeiro', '_blank')" class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                  Google Play
                </button>
                <button onclick="window.open('https://apps.apple.com/app/financeiro-servotech/id123456789', '_blank')" class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                  App Store
                </button>
              </div>
            </div>
          </div>
        `;

      if (window.Modal) {
        window.Modal({
          title: '⭐ Avaliar App',
          content: ratingContent
        });
      } else {
        alert('Avalie o app:\n\nGoogle Play: https://play.google.com/store/apps/details?id=com.servotech.financeiro\nApp Store: https://apps.apple.com/app/financeiro-servotech/id123456789');
      }
    }

    return;
  }

  if (t.textContent?.includes('Copiar Informações')) {
    window.copyAppInfo();
    return;
  }

  if (t.textContent?.includes('Limpar Cache Offline')) {
    window.clearOfflineCache();
    return;
  }

  if (t.textContent?.includes('O que mudou')) {
    console.log('[DEBUG] Handler "O que mudou" executado!');
    console.log('[DEBUG] Texto do elemento:', t.textContent);
    console.log('[DEBUG] Elemento completo:', t);
    console.log('[DEBUG] Chamando window.showWhatsNew()...');

    try {
      window.showWhatsNew();
      console.log('[DEBUG] window.showWhatsNew() executado com sucesso');
      snk().success('Abrindo "O que mudou"...');
    } catch (error) {
      console.error('[DEBUG] Erro ao executar showWhatsNew:', error);
      snk().error('Erro ao abrir "O que mudou"');
    }

    return;
  }

  // Handler adicional para elementos que podem ter o texto "O que mudou" em diferentes contextos
  if (t.textContent?.trim() === 'O que mudou' ||
        t.textContent?.includes('O que mudou') ||
        t.getAttribute('data-action') === 'whats-new' ||
        t.classList?.contains('whats-new-btn')) {
    console.log('[DEBUG] Handler adicional "O que mudou" executado!');
    console.log('[DEBUG] Tipo de detecção:', {
      textTrim: t.textContent?.trim() === 'O que mudou',
      textIncludes: t.textContent?.includes('O que mudou'),
      dataAction: t.getAttribute('data-action') === 'whats-new',
      classList: t.classList?.contains('whats-new-btn')
    });

    try {
      window.showWhatsNew();
      console.log('[DEBUG] Handler adicional executado com sucesso');
    } catch (error) {
      console.error('[DEBUG] Erro no handler adicional:', error);
      snk().error('Erro ao abrir "O que mudou"');
    }

    return;
  }

  if (t.textContent?.includes('Instalar App')) {
    window.installApp();
    return;
  }

  // Handlers para botões específicos
  if (t.id === 'view-performance-events') {
    console.log('[DEBUG] Handler view-performance-events executado!');

    // Importar e mostrar eventos de performance
    import('@core/telemetry/perf.js').then(perf => {
      const events = perf.getLog();
      console.log('[DEBUG] Eventos de performance coletados:', events);

      if (events.length === 0) {
        snk().info('Nenhum evento de performance coletado ainda. Ative a telemetria e use o app para coletar dados.');
        return;
      }

      // Mostrar eventos no console e criar resumo
      console.table(events);

      // Criar resumo dos eventos
      const summary = events.reduce((acc, event) => {
        acc[event.event] = (acc[event.event] || 0) + 1;
        return acc;
      }, {});

      console.log('[DEBUG] Resumo dos eventos:', summary);

      // Mostrar modal com eventos (implementação simples)
      const modal = document.createElement('div');
      modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        `;

      const content = document.createElement('div');
      content.style.cssText = `
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 80%;
          max-height: 80%;
          overflow: auto;
        `;

      content.innerHTML = `
          <h3>Eventos de Performance (${events.length})</h3>
          <p><strong>Resumo:</strong></p>
          <ul>
            ${Object.entries(summary).map(([event, count]) =>
    `<li>${event}: ${count} ocorrências</li>`
  ).join('')}
          </ul>
          <p><strong>Últimos 10 eventos:</strong></p>
          <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; max-height: 300px;">
${events.slice(0, 10).map(e =>
    `${new Date(e.ts).toLocaleTimeString()} - ${e.event}${e.duration ? ` (${e.duration}ms)` : ''}`
  ).join('\n')}
          </pre>
          <button onclick="this.closest('.perf-modal').remove()" style="margin-top: 10px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Fechar
          </button>
        `;

      modal.className = 'perf-modal';
      modal.appendChild(content);
      document.body.appendChild(modal);

      // Fechar ao clicar fora
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });

      snk().success(`Mostrando ${events.length} eventos de performance`);

    }).catch(err => {
      console.error('[DEBUG] Erro ao carregar eventos de performance:', err);
      snk().error('Erro ao carregar eventos de performance');
    });

    return;
  }

  // Toggles são tratados pela função handleToggleChange após mudarem visualmente


  // Handler para botão de toggle de tema
  if (t.id === 'toggle-theme-btn' || t.classList?.contains('theme-toggle-btn') || t.closest('.theme-toggle-btn')) {
    console.log('[DEBUG] BOTÃO DE TEMA DETECTADO!', {
      id: t.id,
      className: t.className,
      tagName: t.tagName,
      textContent: t.textContent,
      closest: t.closest('.theme-toggle-btn')
    });

    // Alternar entre light e dark
    const isDark = document.documentElement.classList.contains('dark');
    const button = t.closest('.theme-toggle-btn') || t;

    console.log('[DEBUG] Estado do tema:', { isDark, button });

    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      // Atualizar o ícone no span interno
      const iconSpan = button.querySelector('span');
      if (iconSpan) {
        iconSpan.textContent = '🌙';
      }
      console.log('[DEBUG] Tema alterado para CLARO');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      // Atualizar o ícone no span interno
      const iconSpan = button.querySelector('span');
      if (iconSpan) {
        iconSpan.textContent = '☀️';
      }
      console.log('[DEBUG] Tema alterado para ESCURO');
    }
    snk().success(`Tema alterado para ${isDark ? 'claro' : 'escuro'}`);
    return;
  }

  // Handler para botões de cor de tema
  if (t.classList?.contains('color-theme-btn')) {
    const theme = t.getAttribute('data-theme');
    if (theme) {
      localStorage.setItem('colorTheme', theme);
      document.body.setAttribute('data-color-theme', theme);
      snk().success(`Tema de cor alterado para ${theme}`);
    }
    return;
  }

  // Handler para botões de tamanho compacto
  if (t.classList?.contains('compact-size-btn')) {
    const size = t.getAttribute('data-size');
    if (size) {
      applyCompactSize(size);
      snk().success(`Tamanho compacto: ${size}`);
    }
    return;
  }

  // TESTE DIRETO: Handler para botão de verificar atualizações
  if (t.id === 'check-updates-btn' || t.closest('#check-updates-btn')) {
    console.log('🚀 [TESTE DIRETO] Botão de atualizações detectado!');
    console.log('🔍 [DEBUG] Elemento clicado:', t);
    console.log('🔍 [DEBUG] ID do elemento:', t.id);
    console.log('🔍 [DEBUG] Texto do elemento:', t.textContent);
    console.log('🔍 [DEBUG] Closest check-updates-btn:', t.closest('#check-updates-btn'));
    ev.preventDefault();
    ev.stopPropagation();

    // Limpar modal existente se houver
    const existingModal = document.getElementById('update-modal');
    if (existingModal) {
      console.log('🔍 [DEBUG] Removendo modal existente...');
      existingModal.remove();
    }

    // Mostrar modal diretamente
    const modalHTML = `
        <div id="update-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div class="text-center mb-6">
              <div class="text-4xl mb-3">🔄</div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Escolha o tipo de atualização
              </h3>
            </div>
            
            <div class="space-y-3 mb-6">
              <button id="normal-update-btn" class="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="text-2xl">✅</div>
                  <div class="text-left">
                    <div class="font-medium text-blue-800 dark:text-blue-200">Verificação Normal</div>
                    <div class="text-xs text-blue-600 dark:text-blue-400">Recomendado</div>
                  </div>
                </div>
              </button>
              
              <button id="hard-refresh-btn" class="w-full p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="text-2xl">🧹</div>
                  <div class="text-left">
                    <div class="font-medium text-orange-800 dark:text-orange-200">Hard Refresh Completo</div>
                    <div class="text-xs text-orange-600 dark:text-orange-400">Limpa cache e dados</div>
                  </div>
                </div>
              </button>
            </div>
            
            <div class="text-center">
              <button id="cancel-update-btn" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      `;

    // Adicionar modal ao DOM
    console.log('🔍 [DEBUG] Adicionando modal ao DOM...');
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('🔍 [DEBUG] Modal adicionado ao DOM');

    // Event listeners
    const modal = document.getElementById('update-modal');
    console.log('🔍 [DEBUG] Modal encontrado:', modal);
    const normalBtn = document.getElementById('normal-update-btn');
    const hardBtn = document.getElementById('hard-refresh-btn');
    const cancelBtn = document.getElementById('cancel-update-btn');

    function closeModal() {
      console.log('🔍 [DEBUG] Fechando modal...');
      if (modal) {
        modal.remove();
        console.log('🔍 [DEBUG] Modal removido com sucesso');
      }
      // Garantir que não há modais órfãos
      const anyModal = document.getElementById('update-modal');
      if (anyModal) {
        anyModal.remove();
        console.log('🔍 [DEBUG] Modal órfão removido');
      }
    }

    if (normalBtn) {
      normalBtn.addEventListener('click', () => {
        console.log('✅ Verificação normal escolhida');
        closeModal();
        if (typeof window.checkForUpdates === 'function') {
          window.checkForUpdates(false);
        } else {
          location.reload();
        }
      });
    }

    if (hardBtn) {
      hardBtn.addEventListener('click', () => {
        console.log('🧹 Hard refresh escolhido');
        closeModal();
        if (typeof window.performHardRefresh === 'function') {
          window.performHardRefresh();
        } else {
          location.reload(true);
        }
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', closeModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    console.log('🚀 [TESTE DIRETO] Modal criado e event listeners adicionados!');
    return;
  }

  // Handler para botão de avaliar app
  if (t.id === 'rate-app-btn') {
    snk().info('Avaliação do app em desenvolvimento');
    return;
  }

  // Handler para botão de instalar app
  if (t.id === 'install-app-btn') {
    snk().info('Instalação do app em desenvolvimento');
    return;
  }

  // Handler para botão de copiar informações
  if (t.id === 'copy-info-btn') {
    snk().info('Copiando informações do app...');
    return;
  }

  // Handler para botão de enviar convite
  if (t.id === 'share-budget-btn' || t.textContent?.includes('Enviar Convite') || t.textContent?.includes('📤 Enviar')) {
    const form = t.closest('form');
    if (form) {
      handleInviteSubmit(form);
    }
    return;
  }

  // Handler para botão de aceitar convite
  if (t.classList?.contains('accept-invitation-btn') || t.textContent?.includes('Aceitar')) {
    const inviteId = t.getAttribute('data-invite-id');
    if (inviteId) {
      handleAcceptInvitation(inviteId);
    }
    return;
  }

  // Handler para botão de recusar convite
  if (t.classList?.contains('decline-invitation-btn') || t.textContent?.includes('Recusar')) {
    const inviteId = t.getAttribute('data-invite-id');
    if (inviteId) {
      handleDeclineInvitation(inviteId);
    }
    return;
  }

  // TESTE: Handler para testar notificações
  console.log('[DEBUG] Verificando botão de teste - ID:', t.id, 'Texto:', t.textContent);
  console.log('[DEBUG] Condição 1 (ID):', t.id === 'test-notifications-btn');
  console.log('[DEBUG] Condição 2 (Texto):', t.textContent?.includes('Testar Notificações'));

  if (t.id === 'test-notifications-btn' || t.textContent?.includes('Testar Notificações')) {
    console.log('[DEBUG] ✅ BOTÃO TESTAR NOTIFICAÇÕES CLICADO!');
    console.log('[DEBUG] Elemento clicado:', t);
    console.log('[DEBUG] ID do elemento:', t.id);
    console.log('[DEBUG] Texto do elemento:', t.textContent);
    console.log('[DEBUG] Testando sistema de notificações...');

    try {
      console.log('[DEBUG] Chamando snk().success...');
      console.log('[DEBUG] window.Snackbar:', window.Snackbar);
      console.log('[DEBUG] window.Snackbar.show:', window.Snackbar?.show);

      // Teste direto do Snackbar
      if (window.Snackbar && window.Snackbar.show) {
        console.log('[DEBUG] Testando Snackbar diretamente...');
        window.Snackbar.show('Teste direto do Snackbar!', 'success', 5000);
        console.log('[DEBUG] Snackbar direto chamado');
      }

      snk().success('Teste de notificação de sucesso!');
      console.log('[DEBUG] snk().success chamado com sucesso');
    } catch (error) {
      console.error('[DEBUG] Erro ao chamar snk().success:', error);
    }

    setTimeout(() => {
      try {
        console.log('[DEBUG] Chamando snk().info...');
        snk().info('Teste de notificação de informação!');
        console.log('[DEBUG] snk().info chamado com sucesso');
      } catch (error) {
        console.error('[DEBUG] Erro ao chamar snk().info:', error);
      }
    }, 1000);

    setTimeout(() => {
      try {
        console.log('[DEBUG] Chamando snk().warning...');
        snk().warning('Teste de notificação de aviso!');
        console.log('[DEBUG] snk().warning chamado com sucesso');
      } catch (error) {
        console.error('[DEBUG] Erro ao chamar snk().warning:', error);
      }
    }, 2000);

    setTimeout(() => {
      try {
        console.log('[DEBUG] Chamando snk().error...');
        snk().error('Teste de notificação de erro!');
        console.log('[DEBUG] snk().error chamado com sucesso');
      } catch (error) {
        console.error('[DEBUG] Erro ao chamar snk().error:', error);
      }
    }, 3000);
    return;
  }

  // Handler para botão de limpar cache
  if (t.id === 'clear-cache-btn') {
    snk().info('Limpando cache offline...');
    return;
  }

  // Campos de configuração de toast são tratados pelos event listeners de input/blur/change

}, { capture: true });

// Event listeners para campos de input que salvam quando o usuário termina de digitar
let inputTimeouts = new Map();

document.addEventListener('input', (ev) => {
  const t = ev.target;

  // Limpar timeout anterior se existir
  if (inputTimeouts.has(t.id)) {
    clearTimeout(inputTimeouts.get(t.id));
  }

  // Configurar timeout para salvar após 1 segundo de inatividade
  const timeoutId = setTimeout(() => {
    if (t.id === 'toast-duration') {
      const value = parseInt(t.value) || 500;
      localStorage.setItem('toastDuration', value);
      console.log('[DEBUG] Duração do toast salva:', value);
      applyToastSettings();
    }

    if (t.id === 'toast-distance') {
      const value = parseInt(t.value) || 80;
      localStorage.setItem('toastDistance', value);
      console.log('[DEBUG] Distância da borda salva:', value);
      applyToastSettings();
    }

    if (t.id === 'toast-max-queue') {
      const value = parseInt(t.value) || 5;
      localStorage.setItem('toastMaxQueue', value);
      console.log('[DEBUG] Máximo de fila salvo:', value);
      applyToastSettings();
    }

    if (t.id === 'toast-anti-spam') {
      const value = parseInt(t.value) || 500;
      localStorage.setItem('toastAntiSpam', value);
      console.log('[DEBUG] Anti-spam salvo:', value);
      applyToastSettings();
    }

    if (t.id === 'toast-offset') {
      const value = parseInt(t.value) || 80;
      localStorage.setItem('toastOffset', value);
      console.log('[DEBUG] Offset do toast salvo:', value);
      applyToastSettings();
    }

    if (t.id === 'toast-cooldown') {
      const value = parseInt(t.value) || 500;
      localStorage.setItem('toastCooldown', value);
      console.log('[DEBUG] Cooldown do toast salvo:', value);
      applyToastSettings();
    }

    // Remover timeout da lista
    inputTimeouts.delete(t.id);
  }, 1000); // 1 segundo de delay

  // Salvar timeout na lista
  inputTimeouts.set(t.id, timeoutId);
});

// Event listener para salvar imediatamente quando o usuário sai do campo
document.addEventListener('blur', (ev) => {
  const t = ev.target;

  // Limpar timeout se existir
  if (inputTimeouts.has(t.id)) {
    clearTimeout(inputTimeouts.get(t.id));
    inputTimeouts.delete(t.id);
  }

  // Salvar imediatamente
  if (t.id === 'toast-duration') {
    const value = parseInt(t.value) || 500;
    localStorage.setItem('toastDuration', value);
    console.log('[DEBUG] Duração do toast salva (blur):', value);
    applyToastSettings();
  }

  if (t.id === 'toast-distance') {
    const value = parseInt(t.value) || 80;
    localStorage.setItem('toastDistance', value);
    console.log('[DEBUG] Distância da borda salva (blur):', value);
    applyToastSettings();
  }

  if (t.id === 'toast-max-queue') {
    const value = parseInt(t.value) || 5;
    localStorage.setItem('toastMaxQueue', value);
    console.log('[DEBUG] Máximo de fila salvo (blur):', value);
    applyToastSettings();
  }

  if (t.id === 'toast-anti-spam') {
    const value = parseInt(t.value) || 500;
    localStorage.setItem('toastAntiSpam', value);
    console.log('[DEBUG] Anti-spam salvo (blur):', value);
    applyToastSettings();
  }

  if (t.id === 'toast-offset') {
    const value = parseInt(t.value) || 80;
    localStorage.setItem('toastOffset', value);
    console.log('[DEBUG] Offset do toast salvo (blur):', value);
    applyToastSettings();
  }

  if (t.id === 'toast-cooldown') {
    const value = parseInt(t.value) || 500;
    localStorage.setItem('toastCooldown', value);
    console.log('[DEBUG] Cooldown do toast salvo (blur):', value);
    applyToastSettings();
  }
}, true); // Use capture para garantir que seja executado

// Event listeners para campos de select que salvam automaticamente
document.addEventListener('change', (ev) => {
  const t = ev.target;

  if (t.id === 'toast-position') {
    const value = t.value || 'bottom';
    localStorage.setItem('toastPosition', value);
    console.log('[DEBUG] Posição do toast salva:', value);
    applyToastSettings();
    snk().success(`Posição alterada para ${value}`);
  }

  if (t.id === 'toast-alignment') {
    const value = t.value || 'center';
    localStorage.setItem('toastAlignment', value);
    console.log('[DEBUG] Alinhamento do toast salvo:', value);
    applyToastSettings();
    snk().success(`Alinhamento alterado para ${value}`);
  }

  if (t.id === 'toast-align') {
    const value = t.value || 'center';
    localStorage.setItem('toastAlign', value);
    console.log('[DEBUG] Alinhamento do toast salvo:', value);
    applyToastSettings();
    snk().success(`Alinhamento alterado para ${value}`);
  }
});

window.attachDynamicHandlers = function (root = document) {
  console.log('[DEBUG] attachDynamicHandlers chamado para:', root);
  // Handlers já estão configurados globalmente no event listener acima
};

window.setupGlobalHandlers = function () {
  console.log('[DEBUG] setupGlobalHandlers chamado - handlers já estão configurados globalmente');
};

// Função para inicializar configurações salvas
function initializeSavedSettings() {
  console.log('[DEBUG] Inicializando configurações salvas...');

  // Inicializar modo compacto
  const compactModeEnabled = localStorage.getItem('compactModeEnabled') === 'true';
  if (compactModeEnabled) {
    applyCompactMode(true);
  }

  // Inicializar tamanho compacto
  const compactSize = localStorage.getItem('compactMode');
  if (compactSize) {
    applyCompactSize(compactSize);
  }

  // Inicializar animações
  const animationsEnabled = localStorage.getItem('animationsEnabled');
  console.log('[DEBUG] Inicializando animações...');
  console.log('[DEBUG] Valor do localStorage:', animationsEnabled);

  if (animationsEnabled === 'false') {
    document.body.classList.add('no-animations');
    console.log('[DEBUG] Animações desabilitadas - classe no-animations adicionada');
  } else {
    document.body.classList.remove('no-animations');
    console.log('[DEBUG] Animações habilitadas - classe no-animations removida');
  }

  console.log('[DEBUG] Estado final das animações:', {
    localStorage: animationsEnabled,
    hasNoAnimations: document.body.classList.contains('no-animations'),
    bodyClasses: document.body.className
  });

  // Inicializar telemetria de performance
  const perfTelemetryEnabled = localStorage.getItem('perfTelemetry');
  console.log('[DEBUG] Inicializando telemetria de performance...');
  console.log('[DEBUG] Valor do localStorage:', perfTelemetryEnabled);

  if (perfTelemetryEnabled === 'true') {
    // Importar e ativar telemetria
    import('@core/telemetry/perf.js').then(perf => {
      perf.setEnabled(true);
      console.log('[DEBUG] Telemetria de performance ativada');
    }).catch(err => {
      console.warn('[DEBUG] Erro ao ativar telemetria:', err);
    });
  } else {
    console.log('[DEBUG] Telemetria de performance desabilitada');
  }

  // Inicializar configurações de privacidade e segurança
  console.log('[DEBUG] Inicializando configurações de privacidade e segurança...');

  // Biometria
  const biometricAuth = localStorage.getItem('biometricAuth');
  console.log('[DEBUG] Biometria:', biometricAuth);

  // Sincronização automática
  const autoSync = localStorage.getItem('autoSync');
  console.log('[DEBUG] Sincronização automática:', autoSync);

  // Analytics
  const analyticsEnabled = localStorage.getItem('analyticsEnabled');
  console.log('[DEBUG] Analytics:', analyticsEnabled);

  console.log('[DEBUG] Configurações de privacidade inicializadas');

  // Inicializar tamanho do bloco de dias
  const daysChunkInput = document.getElementById('days-chunk-size');
  if (daysChunkInput) {
    const savedChunkSize = localStorage.getItem('txChunkSize');
    if (savedChunkSize) {
      daysChunkInput.value = savedChunkSize;
      console.log('[DEBUG] Tamanho do bloco restaurado:', savedChunkSize);
    } else {
      daysChunkInput.value = '';
      console.log('[DEBUG] Modo automático ativado para tamanho do bloco');
    }
  }

  console.log('[DEBUG] Configurações salvas inicializadas');
}

// Função para testar animações visualmente
function testAnimationsVisual() {
  console.log('[DEBUG] Testando animações visualmente...');

  // Criar elemento de teste
  const testElement = document.createElement('div');
  testElement.id = 'animation-test-element';
  testElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    z-index: 10000;
    transition: all 0.5s ease;
    animation: pulse 1s infinite;
  `;

  // Adicionar ao DOM
  document.body.appendChild(testElement);

  // Testar transições
  setTimeout(() => {
    testElement.style.transform = 'translate(-50%, -50%) scale(1.5)';
    testElement.style.background = 'linear-gradient(45deg, #ef4444, #f59e0b)';
  }, 500);

  setTimeout(() => {
    testElement.style.transform = 'translate(-50%, -50%) scale(0.5)';
    testElement.style.background = 'linear-gradient(45deg, #10b981, #06b6d4)';
  }, 1000);

  // Remover após teste
  setTimeout(() => {
    if (testElement.parentNode) {
      testElement.parentNode.removeChild(testElement);
    }
    console.log('[DEBUG] Teste visual de animações concluído');
  }, 2000);
}

// Event listener para o input de tamanho do bloco
document.addEventListener('input', (ev) => {
  if (ev.target.id === 'days-chunk-size') {
    const input = ev.target;
    const value = input.value.trim();

    // Validar em tempo real
    if (value !== '' && value.toLowerCase() !== 'automático') {
      const numValue = parseInt(value);
      if (isNaN(numValue) || numValue < 6 || numValue > 40) {
        input.style.borderColor = '#ef4444'; // Vermelho para valor inválido
        input.title = 'Valor inválido! Use um número entre 6 e 40 (recomendado 10-16)';
      } else {
        input.style.borderColor = '#10b981'; // Verde para valor válido
        input.title = `Carregará ${numValue} grupos de dias por vez`;
      }
    } else {
      input.style.borderColor = ''; // Cor padrão
      input.title = 'Modo automático - sistema ajustará automaticamente';
    }
  }
});

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSavedSettings);
} else {
  initializeSavedSettings();
}

// ========================================
// FUNÇÕES GLOBAIS PARA BOTÕES DE ORÇAMENTO
// ========================================

/**
 * Copia o ID do orçamento para a área de transferência
 */
window.copyBudgetId = function(budgetId) {
  console.log('[DEBUG] copyBudgetId chamado com ID:', budgetId);
  
  if (!budgetId) {
    console.error('[DEBUG] ID do orçamento não fornecido');
    if (window.Snackbar) {
      window.Snackbar.show('Erro: ID do orçamento não encontrado', 'error', 3000);
    }
    return;
  }

  try {
    // Usar a API moderna de clipboard se disponível
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(budgetId).then(() => {
        console.log('[DEBUG] ID copiado com sucesso via navigator.clipboard');
        if (window.Snackbar) {
          window.Snackbar.show('ID do orçamento copiado!', 'success', 2000);
        }
      }).catch(err => {
        console.error('[DEBUG] Erro ao copiar via navigator.clipboard:', err);
        fallbackCopyToClipboard(budgetId);
      });
    } else {
      // Fallback para navegadores mais antigos
      fallbackCopyToClipboard(budgetId);
    }
  } catch (error) {
    console.error('[DEBUG] Erro ao copiar ID:', error);
    fallbackCopyToClipboard(budgetId);
  }
};

/**
 * Função de fallback para copiar texto
 */
function fallbackCopyToClipboard(text) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      console.log('[DEBUG] ID copiado com sucesso via fallback');
      if (window.Snackbar) {
        window.Snackbar.show('ID do orçamento copiado!', 'success', 2000);
      }
    } else {
      throw new Error('execCommand falhou');
    }
  } catch (error) {
    console.error('[DEBUG] Erro no fallback copy:', error);
    if (window.Snackbar) {
      window.Snackbar.show('Erro ao copiar ID. Tente selecionar manualmente.', 'error', 3000);
    }
  }
}

/**
 * Exclui um orçamento com confirmação
 */
window.deleteBudgetFromSettings = function(budgetId, budgetName) {
  console.log('[DEBUG] deleteBudgetFromSettings chamado com ID:', budgetId, 'Nome:', budgetName);
  
  if (!budgetId) {
    console.error('[DEBUG] ID do orçamento não fornecido');
    if (window.Snackbar) {
      window.Snackbar.show('Erro: ID do orçamento não encontrado', 'error', 3000);
    }
    return;
  }

  const displayName = budgetName || 'este orçamento';
  
  // Confirmação de segurança
  const confirmed = confirm(
    `⚠️ ATENÇÃO: Esta ação é IRREVERSÍVEL!\n\n` +
    `Você está prestes a excluir "${displayName}" permanentemente.\n\n` +
    `Isso irá:\n` +
    `• Deletar TODAS as transações\n` +
    `• Deletar TODAS as categorias\n` +
    `• Deletar TODOS os dados do orçamento\n` +
    `• Remover acesso de todos os usuários\n\n` +
    `Tem certeza que deseja continuar?`
  );

  if (!confirmed) {
    console.log('[DEBUG] Exclusão cancelada pelo usuário');
    if (window.Snackbar) {
      window.Snackbar.show('Exclusão cancelada', 'info', 2000);
    }
    return;
  }

  // Segunda confirmação
  const doubleConfirmed = confirm(
    `🚨 ÚLTIMA CONFIRMAÇÃO 🚨\n\n` +
    `Você tem ABSOLUTA CERTEZA que quer excluir "${displayName}"?\n\n` +
    `Digite "EXCLUIR" para confirmar:`
  );

  if (!doubleConfirmed) {
    console.log('[DEBUG] Exclusão cancelada na segunda confirmação');
    if (window.Snackbar) {
      window.Snackbar.show('Exclusão cancelada', 'info', 2000);
    }
    return;
  }

  // Executar exclusão
  executeBudgetDeletion(budgetId, displayName);
};

/**
 * Executa a exclusão do orçamento
 */
async function executeBudgetDeletion(budgetId, displayName) {
  console.log('[DEBUG] Iniciando exclusão do orçamento:', budgetId);
  
  try {
    // Mostrar loading
    if (window.Snackbar) {
      window.Snackbar.show('Excluindo orçamento...', 'info', 5000);
    }

    // Importar o serviço de orçamentos
    const { deleteBudget } = await import('@features/budgets/service.js');
    
    // Executar exclusão
    await deleteBudget(budgetId);
    
    console.log('[DEBUG] Orçamento excluído com sucesso');
    
    // Feedback de sucesso
    if (window.Snackbar) {
      window.Snackbar.show(`Orçamento "${displayName}" excluído com sucesso!`, 'success', 3000);
    }

    // Recarregar a página de configurações após um delay
    setTimeout(() => {
      if (window.location.hash.startsWith('#/settings')) {
        window.location.reload();
      }
    }, 2000);

  } catch (error) {
    console.error('[DEBUG] Erro ao excluir orçamento:', error);
    
    let errorMessage = 'Erro ao excluir orçamento';
    if (error.message) {
      errorMessage += ': ' + error.message;
    }
    
    if (window.Snackbar) {
      window.Snackbar.show(errorMessage, 'error', 5000);
    }
  }
}

/**
 * Sai de um orçamento compartilhado
 */
window.leaveBudget = function(budgetId, budgetName) {
  console.log('[DEBUG] leaveBudget chamado com ID:', budgetId, 'Nome:', budgetName);
  
  if (!budgetId) {
    console.error('[DEBUG] ID do orçamento não fornecido');
    if (window.Snackbar) {
      window.Snackbar.show('Erro: ID do orçamento não encontrado', 'error', 3000);
    }
    return;
  }

  const displayName = budgetName || 'este orçamento';
  
  // Confirmação
  const confirmed = confirm(
    `Você tem certeza que deseja sair do orçamento "${displayName}"?\n\n` +
    `Você perderá acesso a todos os dados deste orçamento.`
  );

  if (!confirmed) {
    console.log('[DEBUG] Saída cancelada pelo usuário');
    if (window.Snackbar) {
      window.Snackbar.show('Saída cancelada', 'info', 2000);
    }
    return;
  }

  // Executar saída
  executeLeaveBudget(budgetId, displayName);
};

/**
 * Executa a saída do orçamento
 */
async function executeLeaveBudget(budgetId, displayName) {
  console.log('[DEBUG] Iniciando saída do orçamento:', budgetId);
  
  try {
    // Mostrar loading
    if (window.Snackbar) {
      window.Snackbar.show('Saindo do orçamento...', 'info', 3000);
    }

    // Importar o serviço de orçamentos
    const { leaveBudget } = await import('@features/budgets/service.js');
    
    // Executar saída
    await leaveBudget(budgetId);
    
    console.log('[DEBUG] Saída do orçamento realizada com sucesso');
    
    // Feedback de sucesso
    if (window.Snackbar) {
      window.Snackbar.show(`Você saiu do orçamento "${displayName}"`, 'success', 3000);
    }

    // Recarregar a página de configurações após um delay
    setTimeout(() => {
      if (window.location.hash.startsWith('#/settings')) {
        window.location.reload();
      }
    }, 2000);

  } catch (error) {
    console.error('[DEBUG] Erro ao sair do orçamento:', error);
    
    let errorMessage = 'Erro ao sair do orçamento';
    if (error.message) {
      errorMessage += ': ' + error.message;
    }
    
    if (window.Snackbar) {
      window.Snackbar.show(errorMessage, 'error', 5000);
    }
  }
}

