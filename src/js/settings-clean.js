/**
 * Settings Clean - Versão melhorada da aba de configurações
 * 
 * Este módulo fornece uma interface melhorada para gerenciar
 * configurações seguindo o padrão visual do dashboard.
 */

/**
 * Renderiza a página de configurações melhorada
 */
export async function renderCleanSettings() {
  console.log('🔄 Renderizando configurações melhoradas...');
  
  // Aplicar tema
  applyThemeToSettings();
  
  // Criar container principal
  const container = document.createElement('div');
  container.className = 'settings-clean';
  
  // Adicionar header
  container.innerHTML = `
    <div class="settings-header">
      <div class="settings-title">
        ⚙️ Configurações
      </div>
      <div class="settings-actions">
        <button class="btn-settings" onclick="window.showExportOptions && window.showExportOptions()" title="Exportar Dados">
          📤
        </button>
        <button class="btn-settings" id="theme-toggle-btn" title="Alternar Tema">
          <span id="theme-icon">☀️</span>
        </button>
      </div>
    </div>
  `;
  
  // Adicionar loader
  const loader = createLoader();
  container.appendChild(loader);
  
  try {
    // Carregar dados
    const data = await loadSettingsData();
    
    // Remover loader
    container.removeChild(loader);
    
    // Renderizar conteúdo
    container.appendChild(renderSettingsSections(data));
    
    // Configurar eventos
    setupSettingsEvents();
    
  } catch (error) {
    console.error('❌ Erro ao carregar configurações:', error);
    container.removeChild(loader);
    container.appendChild(renderErrorState(error.message));
  }
  
  return container;
}

/**
 * Aplica tema às configurações
 */
function applyThemeToSettings() {
  const themeColor = localStorage.getItem('themeColor') || 'blue';
  const root = document.documentElement;
  root.setAttribute('data-theme-color', themeColor);
  console.log('🎨 Tema aplicado nas configurações:', themeColor);
}

/**
 * Carrega dados das configurações
 */
async function loadSettingsData() {
  const currentBudget = window.appState?.currentBudget;
  const currentUser = window.appState?.currentUser;
  const budgets = window.appState?.budgets || [];
  
  // Encontrar o orçamento atual na lista para obter informações completas
  const budgetInfo = budgets.find(b => b.id === currentBudget?.id);
  
  // Preparar informações dos usuários com acesso
  let usersWithAccess = [];
  if (budgetInfo?.usuariosPermitidos && budgetInfo.usuariosPermitidos.length > 0) {
    usersWithAccess = await Promise.all(
      budgetInfo.usuariosPermitidos.map(async (uid) => {
        try {
          const userInfo = await window.getUserInfo(uid);
          return {
            uid,
            email: userInfo.email || 'Email não disponível',
            role: 'Usuário Compartilhado'
          };
        } catch (error) {
          console.error('Erro ao buscar informações do usuário:', uid, error);
          return {
            uid,
            email: 'Usuário não encontrado',
            role: 'Usuário Compartilhado'
          };
        }
      })
    );
  }
  
  // Carregar convites pendentes
  let pendingInvitations = [];
  if (window.loadBudgetInvitations) {
    try {
      console.log('🔍 SettingsPage: Carregando convites pendentes...');
      pendingInvitations = await window.loadBudgetInvitations();
      console.log('📊 SettingsPage: Convites carregados:', pendingInvitations.length);
    } catch (error) {
      console.error('❌ SettingsPage: Erro ao carregar convites pendentes:', error);
    }
  }
  
  return {
    currentBudget,
    currentUser,
    budgets,
    budgetInfo,
    usersWithAccess,
    pendingInvitations
  };
}

/**
 * Renderiza seções de configurações
 */
function renderSettingsSections(data) {
  const sections = document.createElement('div');
  sections.className = 'settings-sections';
  
  // Seção: Informações do Orçamento Atual
  sections.appendChild(renderCurrentBudgetSection(data));
  
  // Seção: Meus Orçamentos
  sections.appendChild(renderMyBudgetsSection(data));
  
  // Seção: Orçamentos Compartilhados
  sections.appendChild(renderSharedBudgetsSection(data));
  
  // Seção: Convites Pendentes
  if (data.pendingInvitations.length > 0) {
    sections.appendChild(renderPendingInvitationsSection(data));
  }
  
  // Seção: Dados e Exportação
  sections.appendChild(renderDataExportSection());
  
  // Seção: Notificações
  sections.appendChild(renderNotificationsSection());
  
  // Seção: Aplicativo
  sections.appendChild(renderAppSection());
  
  // Seção: Personalização
  sections.appendChild(renderPersonalizationSection());
  
  // Seção: Conta
  sections.appendChild(renderAccountSection());
  
  // Informações do App
  sections.appendChild(renderAppInfoSection());
  
  return sections;
}

/**
 * Renderiza seção do orçamento atual
 */
function renderCurrentBudgetSection(data) {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  if (data.currentBudget) {
    section.innerHTML = `
      <div class="section-header">
        <div class="section-title">
          <div class="section-icon">📋</div>
          Orçamento Atual
        </div>
      </div>
      <div class="section-content">
        <div class="settings-card current">
          <div class="settings-card-icon" data-icon="📋">📋</div>
          <div class="settings-card-content">
            <div class="settings-card-title">Orçamento Atual</div>
            <div class="settings-card-value">${data.currentBudget.nome || 'Sem nome'}</div>
            <div class="settings-card-subtitle">ID: ${data.currentBudget.id}</div>
          </div>
          
          <div class="settings-card-content">
            <div class="settings-card-details">
              <div class="settings-detail-item">
                <div class="detail-label">Nome do orçamento</div>
                <div class="detail-value">${data.currentBudget.nome || 'Orçamento sem nome'}</div>
              </div>
              <div class="settings-detail-item">
                <div class="detail-label">ID do orçamento</div>
                <div class="detail-value id">${data.currentBudget.id}</div>
              </div>
              ${data.currentUser ? `
                <div class="settings-detail-item">
                  <div class="detail-label">Usuário logado</div>
                  <div class="detail-value">${data.currentUser.email}</div>
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="settings-card-actions">
            <button class="action-btn secondary" onclick="copyBudgetId('${data.currentBudget.id}')">
              📋 Copiar ID
            </button>
          </div>
        </div>
        
        ${renderUsersWithAccess(data)}
      </div>
    `;
  } else {
    section.innerHTML = `
      <div class="section-header">
        <div class="section-title">
          <div class="section-icon">⚠️</div>
          Nenhum Orçamento Selecionado
        </div>
      </div>
      <div class="section-content">
        <div class="empty-state">
          <div class="empty-icon">⚠️</div>
          <div class="empty-title">Nenhum Orçamento Selecionado</div>
          <div class="empty-description">Selecione um orçamento para ver suas informações.</div>
        </div>
      </div>
    `;
  }
  
  return section;
}

/**
 * Renderiza usuários com acesso
 */
function renderUsersWithAccess(data) {
  if (data.usersWithAccess.length > 0) {
    return `
              <div class="settings-card">
          <div class="settings-card-icon" data-icon="👥">👥</div>
          <div class="settings-card-content">
            <div class="settings-card-title">Usuários Compartilhados</div>
            <div class="settings-card-value">${data.usersWithAccess.length}</div>
            <div class="settings-card-subtitle">usuário(s) com acesso</div>
          </div>
        
        <div class="settings-card-content">
          <div class="users-list">
            ${data.usersWithAccess.map(user => `
              <div class="user-item">
                <div class="user-info">
                  <div class="user-email">${user.email}</div>
                  <div class="user-role">${user.role}</div>
                </div>
                ${data.budgetInfo?.userId === data.currentUser?.uid ? `
                  <div class="user-actions">
                    <button class="action-btn danger" onclick="confirmRemoveUser('${data.currentBudget.id}', '${user.uid}', '${user.email}')">
                      🗑️ Remover
                    </button>
                  </div>
                ` : `
                  <div class="user-actions">
                    <span class="settings-badge shared">🔗</span>
                  </div>
                `}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    return `
              <div class="settings-card">
          <div class="settings-card-icon" data-icon="🔒">🔒</div>
          <div class="settings-card-content">
            <div class="settings-card-title">Orçamento Pessoal</div>
            <div class="settings-card-value">Privado</div>
            <div class="settings-card-subtitle">apenas você tem acesso</div>
          </div>
        </div>
    `;
  }
}

/**
 * Renderiza seção dos meus orçamentos
 */
function renderMyBudgetsSection(data) {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">📁</div>
        Meus Orçamentos
      </div>
    </div>
    <div class="section-content">
      ${data.budgets.length > 0 ? data.budgets.map(budget => {
        const isOwner = budget.userId === data.currentUser?.uid;
        const isShared = budget.usuariosPermitidos && budget.usuariosPermitidos.length > 0;
        const isCurrent = budget.id === data.currentBudget?.id;
        
        return `
          <div class="settings-card ${isCurrent ? 'current' : ''}">
            <div class="settings-card-icon" data-icon="📁">📁</div>
            <div class="settings-card-content">
              <div class="settings-card-title">${budget.nome || 'Orçamento sem nome'}</div>
              <div class="settings-card-value">
                ${isShared ? `${budget.usuariosPermitidos.length} usuário(s)` : 'Pessoal'}
              </div>
              <div class="settings-card-subtitle">
                ${isShared ?
                  `${isOwner ? 'compartilhado com' : 'compartilhado por'} outros` :
                  'apenas você'
                }
              </div>
              <div class="settings-card-badges">
                ${isCurrent ? '<span class="settings-badge current">Atual</span>' : ''}
                ${isOwner ? '<span class="settings-badge owner">Dono</span>' : ''}
                ${!isOwner && isShared ? '<span class="settings-badge shared">Compartilhado</span>' : ''}
              </div>
            </div>
            
            <div class="settings-card-content">
              <div class="settings-card-details">
                <div class="settings-detail-item">
                  <div class="detail-label">ID do orçamento</div>
                  <div class="detail-value id">${budget.id}</div>
                </div>
              </div>
            </div>
            
            <div class="settings-card-actions">
              ${!isCurrent ? `
                <button class="action-btn success" onclick="switchToBudget('${budget.id}')">
                  Entrar
                </button>
              ` : ''}
              ${!isOwner && isShared ? `
                <button class="action-btn danger" onclick="confirmLeaveBudget('${budget.id}', '${budget.nome || 'Orçamento'}')">
                  🚪 Sair
                </button>
              ` : ''}
              ${isOwner ? `
                <div class="settings-dropdown">
                  <button class="action-btn warning" onclick="toggleResetDropdown('${budget.id}')">
                    🔄 Reset ▼
                  </button>
                  <div class="settings-dropdown-content" id="reset-dropdown-${budget.id}">
                    <button class="dropdown-item" onclick="confirmResetTransactions('${budget.id}', '${budget.nome || 'Orçamento'}')">
                      📊 Apenas Transações
                    </button>
                    <button class="dropdown-item" onclick="confirmResetCategories('${budget.id}', '${budget.nome || 'Orçamento'}')">
                      🏷️ Apenas Categorias
                    </button>
                    <button class="dropdown-item" onclick="confirmResetBudget('${budget.id}', '${budget.nome || 'Orçamento'}')">
                      🔄 Tudo (Transações + Recorrentes)
                    </button>
                  </div>
                </div>
                <button class="action-btn danger" onclick="confirmDeleteBudget('${budget.id}', '${budget.nome || 'Orçamento'}')">
                  🗑️ Excluir
                </button>
              ` : ''}
              <button class="action-btn secondary" onclick="copyBudgetId('${budget.id}')">
                📋
              </button>
            </div>
          </div>
        `;
      }).join('') : `
        <div class="empty-state">
          <div class="empty-icon">📁</div>
          <div class="empty-title">Nenhum orçamento encontrado</div>
          <div class="empty-description">Crie seu primeiro orçamento</div>
        </div>
      `}
    </div>
  `;
  
  return section;
}

/**
 * Renderiza seção de orçamentos compartilhados
 */
function renderSharedBudgetsSection(data) {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">🤝</div>
        Orçamentos Compartilhados
      </div>
    </div>
    <div class="section-content">
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="➕">➕</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Novo Orçamento</div>
          <div class="settings-card-value">Criar</div>
          <div class="settings-card-subtitle">pessoal ou compartilhado</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.showAddBudgetModal && window.showAddBudgetModal()">
            Criar Orçamento
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="🔗">🔗</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Compartilhar</div>
          <div class="settings-card-value">Orçamento</div>
          <div class="settings-card-subtitle">com outros usuários</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.compartilharOrcamento && window.compartilharOrcamento()">
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

/**
 * Renderiza seção de convites pendentes
 */
function renderPendingInvitationsSection(data) {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">📨</div>
        Convites Pendentes (${data.pendingInvitations.length})
      </div>
    </div>
    <div class="section-content">
      <div class="invitations-list">
        ${data.pendingInvitations.map(invitation => `
          <div class="invitation-item">
            <div class="invitation-info">
              <div class="invitation-budget">${invitation.budgetName || 'Orçamento'}</div>
              <div class="invitation-owner">Convidado por: ${invitation.ownerEmail || 'Usuário'}</div>
            </div>
            <div class="invitation-actions">
              <button class="action-btn success" onclick="acceptBudgetInvitation('${invitation.id}')">
                ✅ Aceitar
              </button>
              <button class="action-btn danger" onclick="declineBudgetInvitation('${invitation.id}')">
                ❌ Recusar
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  return section;
}

/**
 * Configura eventos das configurações
 */
function setupSettingsEvents() {
  // Configurar botão de tema usando a função correta
  setTimeout(() => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn && window.setupThemeToggle) {
      window.setupThemeToggle('theme-toggle-btn');
      console.log('✅ Botão de tema configurado nas configurações');
    } else {
      console.warn('⚠️ setupThemeToggle não disponível ou botão não encontrado');
      // Configurar manualmente se a função não estiver disponível
      if (themeToggleBtn) {
        setupThemeToggleManually(themeToggleBtn);
      }
      // Tentar novamente após um delay
      setTimeout(() => {
        const retryBtn = document.getElementById('theme-toggle-btn');
        if (retryBtn && window.setupThemeToggle) {
          window.setupThemeToggle('theme-toggle-btn');
          console.log('✅ Botão de tema configurado na segunda tentativa');
        } else if (retryBtn) {
          setupThemeToggleManually(retryBtn);
        }
      }, 500);
    }
  }, 100);

  // Configurar botão de notificações
  setTimeout(() => {
    const notificationBtn = document.getElementById('notification-toggle-btn');
    if (notificationBtn) {
      setupNotificationButtonManually(notificationBtn);
      console.log('✅ Botão de notificações configurado nas configurações');
    } else {
      console.warn('⚠️ Botão de notificações não encontrado');
    }
  }, 200);
  
  // Configurar dropdowns
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.settings-dropdown')) {
      document.querySelectorAll('.settings-dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  });
}

/**
 * Configura o botão de tema manualmente se a função principal não estiver disponível
 */
function setupThemeToggleManually(button) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : prefersDark;

  // Aplicar tema imediatamente
  root.classList.toggle('dark', isDark);
  updateThemeIcon();

  // Remover listeners antigos
  const newBtn = button.cloneNode(true);
  button.parentNode.replaceChild(newBtn, button);
  
  // Adicionar novo listener
  newBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔧 Clique no botão de tema detectado (configurações)');
    
    const isDarkNow = root.classList.toggle('dark');
    localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');

    updateThemeIcon();
    
    console.log('🎨 Tema alterado para:', isDarkNow ? 'dark' : 'light');
  });
  
  console.log('✅ Botão de tema configurado manualmente nas configurações');
}

/**
 * Configura o botão de notificações manualmente
 */
function setupNotificationButtonManually(button) {
  // Verificar status atual das notificações
  const updateNotificationStatus = () => {
    const permission = Notification.permission;
    const enabled = localStorage.getItem('notifications-enabled') === 'true';
    
    if (permission === 'granted' && enabled) {
      button.textContent = 'Desativar';
      button.classList.remove('primary');
      button.classList.add('secondary');
    } else {
      button.textContent = 'Ativar';
      button.classList.remove('secondary');
      button.classList.add('primary');
    }
  };
  
  // Configurar evento de clique
  button.onclick = async () => {
    try {
      const permission = Notification.permission;
      
      if (permission === 'denied') {
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Notificações foram negadas. Vá em Configurações do navegador para permitir.',
            type: 'warning'
          });
        }
        return;
      }
      
      if (permission === 'default') {
        // Solicitar permissão
        const newPermission = await Notification.requestPermission();
        
        if (newPermission === 'granted') {
          localStorage.setItem('notifications-enabled', 'true');
          updateNotificationStatus();
          
          if (window.Snackbar) {
            window.Snackbar({
              message: '✅ Notificações ativadas com sucesso!',
              type: 'success'
            });
          }
        } else {
          if (window.Snackbar) {
            window.Snackbar({
              message: 'Permissão de notificação negada.',
              type: 'error'
            });
          }
        }
      } else if (permission === 'granted') {
        // Alternar estado
        const currentlyEnabled = localStorage.getItem('notifications-enabled') === 'true';
        
        if (currentlyEnabled) {
          localStorage.setItem('notifications-enabled', 'false');
          if (window.Snackbar) {
            window.Snackbar({
              message: 'Notificações desativadas',
              type: 'info'
            });
          }
        } else {
          localStorage.setItem('notifications-enabled', 'true');
          if (window.Snackbar) {
            window.Snackbar({
              message: '✅ Notificações ativadas!',
              type: 'success'
            });
          }
        }
        
        updateNotificationStatus();
      }
    } catch (error) {
      console.error('Erro ao configurar notificações:', error);
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro ao configurar notificações',
          type: 'error'
        });
      }
    }
  };
  
  // Atualizar status inicial
  updateNotificationStatus();
}

/**
 * Atualiza o ícone do tema
 */
function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;
  
  if (icon) {
    const newIcon = root.classList.contains('dark') ? '🌙' : '☀️';
    icon.textContent = newIcon;
  }
}

/**
 * Cria loader
 */
function createLoader() {
  const loader = document.createElement('div');
  loader.className = 'loading-state';
  loader.innerHTML = `
    <div class="loading-spinner"></div>
    <span>Carregando configurações...</span>
  `;
  return loader;
}

/**
 * Renderiza estado vazio
 */
function renderEmptyState(message) {
  const container = document.createElement('div');
  container.className = 'empty-state';
  container.innerHTML = `
    <div class="empty-icon">⚙️</div>
    <div class="empty-title">Erro ao Carregar</div>
    <div class="empty-description">${message}</div>
    <button class="empty-btn" onclick="window.location.reload()">
      🔄 Tentar Novamente
    </button>
  `;
  return container;
}

/**
 * Renderiza estado de erro
 */
function renderErrorState(message) {
  const container = document.createElement('div');
  container.className = 'empty-state';
  container.innerHTML = `
    <div class="empty-icon">❌</div>
    <div class="empty-title">Erro ao Carregar</div>
    <div class="empty-description">${message}</div>
    <button class="empty-btn" onclick="window.location.reload()">
      🔄 Tentar Novamente
    </button>
  `;
  return container;
}

/**
 * Renderiza seção de dados e exportação
 */
function renderDataExportSection() {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">📊</div>
        Dados e Exportação
      </div>
    </div>
    <div class="section-content">
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="📤">📤</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Exportar Dados</div>
          <div class="settings-card-value">Relatórios</div>
          <div class="settings-card-subtitle">PDF e Excel</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.showExportOptions && window.showExportOptions()">
            Exportar
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="📥">📥</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Restaurar Backup</div>
          <div class="settings-card-value">Importar</div>
          <div class="settings-card-subtitle">dados de JSON</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.restoreBackup && window.restoreBackup()">
            Restaurar
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="💾">💾</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Backup JSON</div>
          <div class="settings-card-value">Exportar</div>
          <div class="settings-card-subtitle">todos os dados</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.downloadBackup && window.downloadBackup()">
            Baixar
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="📊">📊</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Exportar Excel</div>
          <div class="settings-card-value">Planilha</div>
          <div class="settings-card-subtitle">relatório completo</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.exportToExcel && window.exportToExcel()">
            Exportar
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="📄">📄</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Exportar PDF</div>
          <div class="settings-card-value">Documento</div>
          <div class="settings-card-subtitle">relatório detalhado</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.exportToPDF && window.exportToPDF()">
            Exportar
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="📖">📖</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Guia de Uso (PDF)</div>
          <div class="settings-card-subtitle">Manual completo do aplicativo</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.exportReadmePDF && window.exportReadmePDF()">
            Baixar
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="📆">📆</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Log de Aplicações</div>
          <div class="settings-card-subtitle">Histórico de recorrentes aplicadas</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.renderLogAplicacoes && window.renderLogAplicacoes()">
            Ver Log
          </button>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

/**
 * Renderiza seção de notificações
 */
function renderNotificationsSection() {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">🔔</div>
        Notificações
      </div>
    </div>
    <div class="section-content">
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="🔕">🔕</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Notificações</div>
          <div class="settings-card-value">Ativar</div>
          <div class="settings-card-subtitle">alertas importantes</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" id="notification-toggle-btn">
            Ativar
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="🔔">🔔</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Testar Notificação</div>
          <div class="settings-card-value">Enviar</div>
          <div class="settings-card-subtitle">notificação de teste</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.testNotification && window.testNotification()">
            Testar
          </button>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

/**
 * Renderiza seção do aplicativo
 */
function renderAppSection() {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">📱</div>
        Aplicativo
      </div>
    </div>
    <div class="section-content">
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="⬇️">⬇️</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Instalar App</div>
          <div class="settings-card-value">Baixar</div>
          <div class="settings-card-subtitle">para tela inicial</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" id="install-app-btn" onclick="window.installPWA && window.installPWA()">
            Instalar
          </button>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="🔐">🔐</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Autenticação</div>
          <div class="settings-card-value">Biométrica</div>
          <div class="settings-card-subtitle">impressão digital/face</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn primary" onclick="window.showBiometricSetup && window.showBiometricSetup()">
            Configurar
          </button>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

/**
 * Renderiza seção de personalização
 */
function renderPersonalizationSection() {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">🎨</div>
        Personalização
      </div>
    </div>
    <div class="section-content">
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="⚠️">⚠️</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Alertas de Limite</div>
          <div class="settings-card-subtitle">Configurar quando receber alertas</div>
        </div>
        
        <div class="settings-card-content">
          <div class="settings-card-details">
            <div class="settings-detail-item">
              <label class="flex items-center gap-2">
                <input type="radio" name="alerta-limite" value="70" checked class="text-purple-600">
                <span class="text-sm">70% do limite (Recomendado)</span>
              </label>
            </div>
            <div class="settings-detail-item">
              <label class="flex items-center gap-2">
                <input type="radio" name="alerta-limite" value="80" class="text-purple-600">
                <span class="text-sm">80% do limite</span>
              </label>
            </div>
            <div class="settings-detail-item">
              <label class="flex items-center gap-2">
                <input type="radio" name="alerta-limite" value="90" class="text-purple-600">
                <span class="text-sm">90% do limite</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="🎨">🎨</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Tema de Cores</div>
          <div class="settings-card-value">Personalizar</div>
          <div class="settings-card-subtitle">cores preferidas</div>
        </div>
        
        <div class="settings-card-content">
          <div class="settings-card-details">
            <div class="settings-detail-item">
              <div class="grid grid-cols-4 gap-2">
                <button class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('blue')"></button>
                <button class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('green')"></button>
                <button class="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('purple')"></button>
                <button class="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('orange')"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="📱">📱</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Widgets</div>
          <div class="settings-card-value">Dashboard</div>
          <div class="settings-card-subtitle">mostrar o que importa</div>
        </div>
        
        <div class="settings-card-content">
          <div class="settings-card-details">
            <div class="settings-detail-item">
              <label class="flex items-center gap-2">
                <input type="checkbox" data-widget="summary" checked class="text-purple-600">
                <span class="text-sm">Card de resumo rápido</span>
              </label>
            </div>
            <div class="settings-detail-item">
              <label class="flex items-center gap-2">
                <input type="checkbox" data-widget="chart" checked class="text-purple-600">
                <span class="text-sm">Gráfico de categorias</span>
              </label>
            </div>
            <div class="settings-detail-item">
              <label class="flex items-center gap-2">
                <input type="checkbox" data-widget="progress" checked class="text-purple-600">
                <span class="text-sm">Barras de progresso</span>
              </label>
            </div>
            <div class="settings-detail-item">
              <label class="flex items-center gap-2">
                <input type="checkbox" data-widget="tips" class="text-purple-600">
                <span class="text-sm">Dicas personalizadas</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

/**
 * Renderiza seção da conta
 */
function renderAccountSection() {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">👤</div>
        Conta
      </div>
    </div>
    <div class="section-content">
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="🚪">🚪</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Sair da Conta</div>
          <div class="settings-card-value">Logout</div>
          <div class="settings-card-subtitle">fazer logout</div>
        </div>
        
        <div class="settings-card-actions">
          <button class="action-btn danger" onclick="confirmLogout()">
            Sair
          </button>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

/**
 * Renderiza seção de informações do app
 */
function renderAppInfoSection() {
  const section = document.createElement('div');
  section.className = 'settings-section';
  
  section.innerHTML = `
    <div class="section-content">
      <div class="settings-card">
        <div class="settings-card-icon" data-icon="📱">📱</div>
        <div class="settings-card-content">
          <div class="settings-card-title">Servo Tech Finanças</div>
          <div class="settings-card-value">v4.1.0</div>
          <div class="settings-card-subtitle">© 2025 Igor Bispo</div>
        </div>
        
        <div class="settings-card-content">
          <div class="settings-card-details">
            <div class="settings-detail-item">
              <div class="detail-label">© 2025</div>
              <div class="detail-value">Fundador: Igor Bispo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

// Adicionar à janela global
window.renderCleanSettings = renderCleanSettings;
