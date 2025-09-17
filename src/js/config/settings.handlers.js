// Minimal, clean settings handlers implementation
// Provides only the essential global functions required by SettingsPage
// Keep this file small, readable and syntax-safe

// DEBUG_MARKER_START
console.log('[settings.handlers] minimal handlers loaded @', new Date().toISOString());

// Função auxiliar para Snackbar
function snk() {
  if (window.Snackbar && typeof window.Snackbar.show === 'function') {
    return window.Snackbar;
  }
  // Fallback para alert se Snackbar não estiver disponível
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
      
      localStorage.setItem('biometricAuth', isEnabled.toString());
      
      if (isEnabled) {
        // Verificar se biometria está disponível
        import('@js/biometric-auth.js').then(() => {
          if (window.biometricAuth) {
            window.biometricAuth.checkAvailability().then(available => {
              if (available) {
                snk().success('Autenticação biométrica ativada! Configure nas configurações do dispositivo.');
              } else {
                snk().warning('Autenticação biométrica não disponível neste dispositivo.');
              }
            });
          }
        }).catch(err => {
          console.warn('[DEBUG] Erro ao carregar sistema biométrico:', err);
          snk().info('Autenticação biométrica em desenvolvimento');
        });
      } else {
        snk().info('Autenticação biométrica desativada');
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
    console.log('[DEBUG] enterBudget chamado', budgetId, budgetName);
    
    if (!budgetId) {
      console.error('[DEBUG] ID do orçamento inválido');
      return snk().error('ID do orçamento inválido');
    }
    
    // Importar o serviço de orçamentos
    const budgetsService = await import('@features/budgets/service.js');
    
    // Buscar o orçamento completo no banco de dados
    const fullBudget = await budgetsService.getById(budgetId);
    if (!fullBudget) {
      console.error('[DEBUG] Orçamento não encontrado no banco de dados');
      return snk().error('Orçamento não encontrado');
    }
    
    console.log('[DEBUG] Orçamento encontrado:', fullBudget);
    
    // Usar a função de persistência que criamos
    const persisted = budgetsService.ensureBudgetPersistence(fullBudget);
    if (!persisted) {
      console.error('[DEBUG] Falha ao persistir orçamento');
      return snk().error('Erro ao salvar seleção do orçamento');
    }
    
    // Atualizar o estado global
    if (window.appState) {
      window.appState.currentBudget = fullBudget;
    }
    
    // Disparar evento para recarregar dados
    window.dispatchEvent(new CustomEvent('budget:changed', { 
      detail: { budgetId, budgetName: fullBudget.nome } 
    }));
    
    console.log('[DEBUG] Orçamento alterado com sucesso');
    snk().success(`Entrando no orçamento: ${fullBudget.nome}`);
    
    // Navegar para a página principal
    setTimeout(() => {
      window.location.hash = '#/dashboard';
    }, 500); // Pequeno delay para garantir que o estado seja atualizado
    
  } catch (error) {
    console.error('[DEBUG] Erro ao entrar no orçamento:', error);
    snk().error('Erro ao entrar no orçamento: ' + error.message);
  }
};

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
  
  const updateContent = `
    <div class="space-y-4">
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h3 class="font-semibold text-green-800 dark:text-green-200 mb-2">🆕 Atualização Disponível!</h3>
        <p class="text-sm text-green-700 dark:text-green-300 mb-3">
          Uma nova versão do aplicativo está disponível com melhorias e correções.
        </p>
        <div class="flex gap-2">
          <button onclick="window.location.reload()" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            🔄 Atualizar Agora
          </button>
          <button onclick="this.closest('.update-modal').remove()" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            ⏰ Mais Tarde
          </button>
        </div>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">✨ O que há de novo:</h4>
        <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc ml-4">
          <li>Melhorias de performance</li>
          <li>Correções de bugs</li>
          <li>Novas funcionalidades</li>
          <li>Otimizações de segurança</li>
        </ul>
      </div>
    </div>
  `;
  
  if (window.Modal) {
    const modal = window.Modal({ 
      title: '🆕 Atualização Disponível', 
      content: updateContent,
      onClose: () => console.log('[DEBUG] Modal de atualização fechado')
    });
    modal.className = 'update-modal';
  } else {
    if (confirm('🆕 Atualização disponível!\n\nDeseja atualizar agora?')) {
      window.location.reload();
    }
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
  
  if (!confirm('Limpar cache offline? Isso pode afetar a performance do app.')) {
    console.log('[DEBUG] Limpeza de cache cancelada pelo usuário');
    return;
  }
  
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
      <div class="space-y-4">
        <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-700">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl">🚀</span>
            <h3 class="font-bold text-violet-800 dark:text-violet-200 text-lg">${latestChangelog.title}</h3>
          </div>
          <p class="text-sm text-violet-600 dark:text-violet-400 mb-3">📅 ${latestChangelog.date}</p>
          <ul class="text-sm text-violet-700 dark:text-violet-300 space-y-2">
            ${latestChangelog.items.map(item => `<li class="flex items-start gap-2"><span class="text-violet-500 mt-1">•</span><span>${item}</span></li>`).join('')}
          </ul>
        </div>
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Dica</h4>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Esta versão inclui uma reorganização completa das abas com padrão compacto, melhorando significativamente a experiência mobile. 
            Todas as 7 abas principais foram otimizadas para uma interface mais limpa e organizada.
          </p>
        </div>
      </div>
    `;
    
    console.log('[DEBUG] Verificando disponibilidade do Modal...');
    console.log('[DEBUG] window.Modal disponível:', !!window.Modal);
    
    if (window.Modal && typeof window.Modal === 'function') {
      console.log('[DEBUG] Abrindo modal com window.Modal...');
      try {
        const modal = window.Modal({ 
          title: '🆕 O que mudou', 
          content: html,
          onClose: () => console.log('[DEBUG] Modal "O que mudou" fechado')
        });
        console.log('[DEBUG] Modal criado com sucesso:', modal);
      } catch (error) {
        console.error('[DEBUG] Erro ao criar modal:', error);
        fallbackAlert();
      }
    } else {
      console.log('[DEBUG] Modal não disponível, usando fallback...');
      fallbackAlert();
    }
    
  } catch (error) {
    console.error('[DEBUG] Erro ao carregar changelog:', error);
    fallbackAlert();
  }
  
  function fallbackAlert() {
    console.log('[DEBUG] Executando fallback alert...');
    alert('🆕 Novidades v4.38.0:\n\n📊 Dashboard: Resumo compacto com métricas essenciais\n💰 Transações: Interface otimizada com 3 métricas principais\n📂 Categorias: Cards compactos com resumo financeiro\n🔄 Recorrentes: Seções organizadas por status\n📈 Analytics: Gráficos em layout compacto\n🔔 Notificações: Filtros organizados em seções\n⚙️ Config: Seções lógicas com cards compactos\n🎯 Espaçamento Otimizado: Melhor aproveitamento do espaço\n📱 UX Mobile Aprimorada: Interface limpa e organizada\n⚡ Performance Melhorada: Carregamento mais rápido\n🎨 Design Consistente: Padrão visual unificado');
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
    
    // Verificar se há prompt de instalação disponível
    if (window.deferredPrompt) {
      console.log('[DEBUG] Prompt de instalação disponível, mostrando...');
      
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then(choice => {
        console.log('[DEBUG] Escolha do usuário:', choice.outcome);
        
        if (choice.outcome === 'accepted') {
          console.log('[DEBUG] Instalação aceita pelo usuário');
          snk().success('Instalação iniciada! O app será adicionado à sua tela inicial.');
        } else {
          console.log('[DEBUG] Instalação cancelada pelo usuário');
          snk().info('Instalação cancelada. Você pode tentar novamente a qualquer momento.');
        }
        
        window.deferredPrompt = null;
      }).catch(err => {
        console.error('[DEBUG] Erro no prompt de instalação:', err);
        snk().error('Erro no processo de instalação');
        window.deferredPrompt = null;
      });
    } else {
      console.log('[DEBUG] Nenhum prompt de instalação disponível');
      
      // Verificar se é um navegador compatível
      if (navigator.userAgent.includes('Chrome') || 
          navigator.userAgent.includes('Edge') || 
          navigator.userAgent.includes('Safari')) {
        
        // Mostrar instruções manuais
        const instructions = `
          <div class="space-y-4">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 Como instalar o app:</h3>
              <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li><strong>Chrome/Edge:</strong> Clique no ícone de instalação na barra de endereços</li>
                <li><strong>Safari (iOS):</strong> Toque no botão "Compartilhar" e selecione "Adicionar à Tela Inicial"</li>
                <li><strong>Android:</strong> Toque no menu do navegador e selecione "Instalar app"</li>
              </ul>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">✨ Benefícios da instalação:</h4>
              <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Acesso rápido direto da tela inicial</li>
                <li>• Funciona offline</li>
                <li>• Notificações push</li>
                <li>• Experiência nativa</li>
              </ul>
            </div>
          </div>
        `;
        
        if (window.Modal) {
          window.Modal({ 
            title: '📱 Instalar App', 
            content: instructions,
            onClose: () => console.log('[DEBUG] Modal de instalação fechado')
          });
        } else {
          alert('Para instalar o app:\n\nChrome/Edge: Clique no ícone de instalação na barra de endereços\nSafari: Toque em "Compartilhar" > "Adicionar à Tela Inicial"');
        }
      } else {
        snk().warning('Instalação não disponível neste navegador');
      }
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
  console.log('[DEBUG] Click detectado:', t.tagName, t.className, t.id, t.textContent?.substring(0, 30));
  
  // Debug específico para logout
  if (t.id === 'btn-logout' || t.textContent?.trim() === 'Sair') {
    console.log('[DEBUG] BOTÃO LOGOUT DETECTADO!', {
      id: t.id,
      textContent: t.textContent,
      className: t.className,
      tagName: t.tagName
    });
  }
  
  // Verificar se é um dos elementos que queremos tratar
  const isTargetElement = t.textContent?.includes('Backup completo') || 
                         t.textContent?.includes('Importar Dados') || 
                         t.textContent?.includes('Limpar Dados') ||
                         t.textContent?.includes('Exportar Dados') ||
                         t.textContent?.includes('Restaurar backup') ||
                         t.textContent?.includes('Remover tudo') ||
                         t.id === 'import-data-btn' ||
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
                         t.id === 'toggle-theme-btn' ||
                         t.id === 'enter-budget-button' ||
                         t.id === 'enter-text' ||
                         t.classList?.contains('color-theme-btn') ||
                         t.classList?.contains('compact-size-btn') ||
                         t.textContent?.includes('Verificar Atualizações') ||
                         t.textContent?.includes('Ajuda e Suporte') ||
                         t.textContent?.includes('Avaliar App') ||
                         t.textContent?.includes('Copiar Informações') ||
                         t.textContent?.includes('Limpar Cache Offline') ||
                         t.textContent?.includes('O que mudou') ||
                         t.textContent?.includes('Instalar App') ||
                         t.textContent?.trim() === 'Entrar' ||
                         t.textContent?.trim() === 'Sair';
  
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
          
          // Fallback: tentar logout direto do Firebase
          if (window.firebase && window.firebase.auth) {
            console.log('[DEBUG] Usando Firebase auth diretamente...');
            window.firebase.auth().signOut().then(() => {
              console.log('[DEBUG] Logout via Firebase realizado');
              snk().success('Logout realizado com sucesso');
              window.location.reload();
            }).catch(error => {
              console.error('[DEBUG] Erro no logout via Firebase:', error);
              snk().error('Erro ao fazer logout');
            });
          } else {
            console.error('[DEBUG] Firebase auth não disponível');
            snk().error('Erro: Sistema de autenticação não disponível');
          }
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
  
  console.log('[DEBUG] Elemento é alvo, processando...');
  console.log('[DEBUG] Elemento ID:', t.id, 'Classes:', t.className, 'Text:', t.textContent?.substring(0, 50));
  
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
    if (t.id === 'import-data-btn') {
      console.log('[DEBUG] import-data-btn clicado!');
      snk().info('Funcionalidade de importação em desenvolvimento');
      return;
    }
    
    if (t.id === 'clear-data-btn') {
      console.log('[DEBUG] clear-data-btn clicado!');
      if (confirm('⚠️ ATENÇÃO: Isso irá apagar TODOS os dados do orçamento atual. Esta ação não pode ser desfeita. Continuar?')) {
        if (confirm('🚨 CONFIRMAÇÃO FINAL: Todos os dados serão perdidos permanentemente. Tem certeza?')) {
          snk().warning('Funcionalidade de limpeza de dados em desenvolvimento');
        }
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
    
    if (t.textContent?.includes('Ajuda e Suporte')) {
      console.log('[DEBUG] Ajuda e Suporte clicado!');
      
      const helpContent = `
        <div class="space-y-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📞 Contato e Suporte</h3>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <li><strong>Email:</strong> igormbispo@hotmail.com</li>
              <li><strong>WhatsApp:</strong> (71) 99200-3106</li>
              <li><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</li>
            </ul>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">❓ Perguntas Frequentes</h4>
            <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Como sincronizar dados entre dispositivos?</li>
              <li>• Como fazer backup das minhas informações?</li>
              <li>• Como configurar notificações?</li>
              <li>• Como usar o modo offline?</li>
            </ul>
          </div>
        </div>
      `;
      
      if (window.Modal) {
        window.Modal({ 
          title: '🆘 Ajuda e Suporte', 
          content: helpContent 
        });
      } else {
        alert('Suporte:\n\nEmail: igormbispo@hotmail.com\nWhatsApp: (71) 99200-3106\nHorário: Segunda a Sexta, 9h às 18h');
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
    if (t.id === 'toggle-theme-btn') {
      // Alternar entre light e dark
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        t.textContent = '🌙 Modo Escuro';
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        t.textContent = '☀️ Modo Claro';
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
    
    // Handler para botão de verificar atualizações
    const updateBtn = t.id === 'check-updates-btn' ? t : t.closest('#check-updates-btn');
    if (updateBtn) {
      console.log('[DEBUG] Botão de verificar atualizações clicado - ID:', updateBtn.id);
      ev.preventDefault();
      ev.stopPropagation();
      
      // Adicionar delay para permitir ver os logs
      console.log('[DEBUG] Aguardando 10 segundos para permitir visualização dos logs...');
      setTimeout(async () => {
        console.log('[DEBUG] Iniciando processamento após delay...');
        
        // Executar função async diretamente
        (async () => {
      
      // Verificar se Modal está disponível
      console.log('[DEBUG] Verificando disponibilidade do Modal...');
      console.log('[DEBUG] window.Modal disponível:', !!window.Modal);
      console.log('[DEBUG] typeof window.Modal:', typeof window.Modal);
      
      // Se Modal não estiver disponível, importar
      if (!window.Modal) {
        console.log('[DEBUG] Modal não disponível, importando...');
        try {
          const { Modal } = await import('@js/ui/Modal.js');
          window.Modal = Modal;
          console.log('[DEBUG] Modal importado e disponível:', !!window.Modal);
        } catch (error) {
          console.error('[DEBUG] Erro ao importar Modal:', error);
        }
      }
      
      // Criar modal personalizado para escolha
      const modalContent = `
        <div class="space-y-4">
          <div class="text-center">
            <div class="text-4xl mb-3">🔄</div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Escolha o tipo de atualização
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Selecione como deseja verificar atualizações
            </p>
          </div>
          
          <div class="space-y-3">
            <button id="normal-update-btn" class="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <div class="flex items-center gap-3">
                <div class="text-2xl">✅</div>
                <div class="text-left">
                  <div class="font-medium text-blue-800 dark:text-blue-200">Verificação Normal</div>
                  <div class="text-xs text-blue-600 dark:text-blue-400">Recomendado - Verifica atualizações do app</div>
                </div>
              </div>
            </button>
            
            <button id="hard-refresh-btn" class="w-full p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
              <div class="flex items-center gap-3">
                <div class="text-2xl">🧹</div>
                <div class="text-left">
                  <div class="font-medium text-orange-800 dark:text-orange-200">Hard Refresh Completo</div>
                  <div class="text-xs text-orange-600 dark:text-orange-400">Limpa cache e dados - Para problemas persistentes</div>
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
      `;
      
      // Tentar criar modal
      try {
        if (window.Modal && typeof window.Modal === 'function') {
          console.log('[DEBUG] Criando modal com window.Modal...');
          const modal = window.Modal({
            title: '🔄 Verificar Atualizações',
            content: modalContent,
            onClose: () => console.log('[DEBUG] Modal de atualização fechado')
          });
          
          console.log('[DEBUG] Modal criado:', modal);
          
          // Adicionar event listeners aos botões
          setTimeout(() => {
            console.log('[DEBUG] Adicionando event listeners...');
            const normalBtn = document.getElementById('normal-update-btn');
            const hardBtn = document.getElementById('hard-refresh-btn');
            const cancelBtn = document.getElementById('cancel-update-btn');
            
            console.log('[DEBUG] Botões encontrados:', {
              normal: !!normalBtn,
              hard: !!hardBtn,
              cancel: !!cancelBtn
            });
            
            if (normalBtn) {
              normalBtn.addEventListener('click', () => {
                console.log('[DEBUG] Verificação normal escolhida');
                modal.close();
                executeNormalUpdate();
              });
            }
            
            if (hardBtn) {
              hardBtn.addEventListener('click', () => {
                console.log('[DEBUG] Hard refresh escolhido');
                modal.close();
                executeHardRefresh();
              });
            }
            
            if (cancelBtn) {
              cancelBtn.addEventListener('click', () => {
                console.log('[DEBUG] Atualização cancelada');
                modal.close();
              });
            }
          }, 200);
          
        } else {
          console.log('[DEBUG] Modal não disponível, usando fallback...');
          // Fallback para confirm se modal não estiver disponível
          const choice = confirm(
            '🔄 Escolha o tipo de atualização:\n\n' +
            '• OK = Verificação normal (recomendado)\n' +
            '• Cancelar = Hard refresh completo (limpa cache e dados)\n\n' +
            'Hard refresh é útil quando há problemas persistentes.'
          );
          
          if (choice) {
            executeNormalUpdate();
          } else {
            executeHardRefresh();
          }
        }
      } catch (error) {
        console.error('[DEBUG] Erro ao criar modal:', error);
        // Fallback em caso de erro
        const choice = confirm(
          '🔄 Escolha o tipo de atualização:\n\n' +
          '• OK = Verificação normal (recomendado)\n' +
          '• Cancelar = Hard refresh completo (limpa cache e dados)\n\n' +
          'Hard refresh é útil quando há problemas persistentes.'
        );
        
        if (choice) {
          executeNormalUpdate();
        } else {
          executeHardRefresh();
        }
      }
      
      // Funções para executar as atualizações
      function executeNormalUpdate() {
        try {
          console.log('[DEBUG] Executando verificação normal...');
          if (typeof window.checkForUpdates === 'function') {
            window.checkForUpdates(false);
          } else {
            import('@js/config/pwa.js').then(pwa => {
              pwa.checkForUpdates(false);
            }).catch(err => {
              console.error('[DEBUG] Erro ao importar PWA module:', err);
              snk().error('Erro ao verificar atualizações');
            });
          }
        } catch (error) {
          console.error('[DEBUG] Erro ao executar verificação normal:', error);
          snk().error('Erro ao verificar atualizações');
        }
      }
      
      function executeHardRefresh() {
        try {
          console.log('[DEBUG] Executando hard refresh...');
          if (typeof window.performHardRefresh === 'function') {
            window.performHardRefresh();
          } else {
            import('@js/config/pwa.js').then(pwa => {
              pwa.performHardRefresh();
            }).catch(err => {
              console.error('[DEBUG] Erro ao importar PWA module:', err);
              snk().error('Erro ao executar hard refresh');
            });
          }
        } catch (error) {
          console.error('[DEBUG] Erro ao executar hard refresh:', error);
          snk().error('Erro ao executar hard refresh');
        }
      }
      
        })(); // Fechar função async
        }, 10000); // Fechar setTimeout
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

