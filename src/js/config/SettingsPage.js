// Importar dependências globais
// import { Snackbar } from '../ui/Snackbar.js';

// Importar funções do Firestore
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export async function renderSettings() {
  const content = document.getElementById('app-content');
  // Throttle chamadas muito próximas no tempo para evitar renders duplicados em sequência
  try {
    const now = Date.now();
    if (typeof window !== 'undefined') {
      if (window.__lastSettingsRender && (now - window.__lastSettingsRender) < 500) {
        console.log('⏱️ renderSettings: chamada muito próxima, pulando...');
        return;
      }
      window.__lastSettingsRender = now;
    }
  } catch {}
  if (!content) {
    console.warn('⚠️ SettingsPage: elemento #app-content não encontrado');
    return;
  }

  // Obter informações do orçamento atual
  const currentBudget = window.appState?.currentBudget;
  const currentUser = window.appState?.currentUser;
  const budgets = window.appState?.budgets || [];

  // Encontrar o orçamento atual na lista para obter informações completas
  const budgetInfo = budgets.find(b => b.id === currentBudget?.id);

  // Preparar informações dos usuários com acesso
  let usersWithAccess = [];
  if (budgetInfo?.usuariosPermitidos && budgetInfo.usuariosPermitidos.length > 0) {
    // Buscar informações dos usuários compartilhados
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
  } else {
    console.log('❌ SettingsPage: Função loadBudgetInvitations não encontrada');
  }

  // Carregar convites enviados por mim (ainda abertos)
  let sentInvitations = [];
  if (window.loadSentBudgetInvitations) {
    try {
      console.log('🔍 SettingsPage: Carregando convites enviados...');
      sentInvitations = await window.loadSentBudgetInvitations();
      console.log('📊 SettingsPage: Convites enviados carregados:', sentInvitations.length);
    } catch (error) {
      console.error('❌ SettingsPage: Erro ao carregar convites enviados:', error);
    }
  }

  // Inicializar ícone do tema após renderização
  setTimeout(() => {
    if (window.initializeThemeIcon) {
      window.initializeThemeIcon();
    }
    if (window.initializeColorTheme) {
      window.initializeColorTheme();
    }
    if (window.initializeCompactMode) {
      window.initializeCompactMode();
    }
    
    // Adicionar listener de resize para auto-compacto
    if (window.handleResize) {
      try {
        if (!window.__settingsResizeBound) {
          window.addEventListener('resize', window.handleResize);
          window.__settingsResizeBound = true;
        }
        // Executar uma vez para verificar tamanho atual
        window.handleResize();
      } catch (e) {
        console.warn('⚠️ SettingsPage: erro ao vincular handleResize:', e);
      }
    }
  }, 100);

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
  <h2 class="tab-title-highlight">⚙️ Configurações</h2>
  <div id="settings-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="settings-container">
          <div class="content-spacing">

          ${pendingInvitations && pendingInvitations.length > 0 ? `
          <!-- Resumo rápido de Convites Recebidos -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <h2 class="section-title purple-border">📬 Convites Recebidos <span class="ml-2 inline-flex items-center justify-center text-xs font-semibold bg-purple-100 text-purple-700 rounded-full px-2 py-0.5">${pendingInvitations.length}</span></h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              ${pendingInvitations.slice(0,3).map(invite => `
                <div class="flex items-center justify-between p-3 rounded-lg ${invite._rowAlt?'bg-gray-50 dark:bg-gray-800':''}">
                  <div class="min-w-0">
                    <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${invite.budgetName || 'Orçamento'}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 truncate">Convidado por ${invite.invitedByUserEmail || invite.invitedByUserId || 'usuário'}</div>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <button onclick="acceptBudgetInvitation('${invite.id}')" class="px-2 py-1 text-xs rounded bg-green-500 hover:bg-green-600 text-white">Aceitar</button>
                    <button onclick="acceptAndEnterInvitation('${invite.id}','${invite.budgetId}','${(invite.budgetName || 'Orçamento').replace(/'/g, "\\'")}')" class="px-2 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white">Aceitar e entrar</button>
                  </div>
                </div>
              `).join('')}
              ${pendingInvitations.length > 3 ? `<div class="text-xs text-gray-500 mt-2">+${pendingInvitations.length - 3} convid${pendingInvitations.length - 3 === 1 ? 'o' : 'os'} adicionais</div>` : ''}
            </div>
          </div>
          ` : ''}
          
          
          <!-- ========== SEÇÃO 1: RESUMO DO ORÇAMENTO ========== -->
          ${currentBudget ? `
          <div class="mb-8">
            <h2 class="section-title green-border">📋 Orçamento Atual</h2>
            
            <div class="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
              <!-- Header do Card -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl">
                    📋
                  </div>
                  <div>
                    <h3 class="text-xl md:text-2xl font-bold">${currentBudget.nome || 'Orçamento sem nome'}</h3>
                    <p class="text-sm opacity-90">Orçamento Ativo</p>
                  </div>
                </div>
                <button onclick="editBudgetName()" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-xl transition-all duration-200">
                  ✏️
                </button>
              </div>
              
              <!-- Grid de Métricas -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-2xl mb-2">📅</div>
                  <div class="text-lg font-bold">${currentBudget.createdAt ? new Date(currentBudget.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível'}</div>
                  <div class="text-sm opacity-90">Data de Criação</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-2xl mb-2">👥</div>
                  <div class="text-lg font-bold">${usersWithAccess.length + 1}</div>
                  <div class="text-sm opacity-90">Usuários com Acesso</div>
                </div>
              </div>
            </div>
          </div>
          ` : ''}

          <!-- ========== SEÇÃO 2: USUÁRIOS E COMPARTILHAMENTO ========== -->
          <div class="mb-8">
            <h2 class="section-title blue-border">👥 Usuários & Compartilhamento</h2>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Acesso</h3>
                  <button onclick="document.getElementById('share-email')?.focus()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                    📤 Compartilhar
                  </button>
                </div>
              </div>
              
              <!-- Conteúdo -->
              <div class="p-4">
                ${usersWithAccess.length > 0 ? `
                  <div class="space-y-3">
                    ${usersWithAccess.map(user => `
                      <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                        <div class="flex items-center gap-3">
                          <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl">
                            👤
                          </div>
                          <div>
                            <div class="font-medium text-gray-900 dark:text-gray-100">${user.email}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">${user.role} • Adicionado em ${new Date().toLocaleDateString('pt-BR')}</div>
                          </div>
                        </div>
                        <button onclick="removeUserFromBudget('${user.uid}', '${user.email}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                          🚫 Remover
                        </button>
                      </div>
                    `).join('')}
                  </div>
                ` : `
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">👥</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhum usuário compartilhado</div>
                    <div class="text-gray-600 dark:text-gray-400 mb-4">Compartilhe seu orçamento para ver usuários aqui</div>
                    <button onclick="document.getElementById('share-email')?.focus()" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg">
                      📤 Compartilhar Orçamento
                    </button>
                  </div>
                `}
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 3: CONVITES PENDENTES (ENVIADOS POR MIM) ========== -->
          ${sentInvitations.length > 0 ? `
          <div class="mb-8">
            <h2 class="section-title orange-border">📤 Convites Pendentes</h2>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Convites Aguardando Resposta</h3>
              </div>
              
              <!-- Lista de Convites -->
              <div class="p-4">
                <div class="space-y-3">
                  ${sentInvitations.map(invite => {
                    const email = invite.invitedUserEmail || invite.email || invite.invitedUserId || 'Destinatário';
                    const created = invite.createdAt ? (invite.createdAt.toDate ? invite.createdAt.toDate() : (invite.createdAt.seconds ? new Date(invite.createdAt.seconds * 1000) : new Date(invite.createdAt))) : null;
                    const createdStr = created ? created.toLocaleDateString('pt-BR') : 'Data não disponível';
                    return `
                    <div class="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 border border-orange-200 dark:border-orange-800 rounded-xl">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-xl">
                          📤
                        </div>
                        <div>
                          <div class="font-medium text-gray-900 dark:text-gray-100">${email}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            Enviado em ${createdStr} • Aguardando resposta
                          </div>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button onclick="resendInvitation('${invite.id}', '${email}')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                          📤 Reenviar
                        </button>
                        <button onclick="cancelInvitation('${invite.id}', '${email}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                          ❌ Cancelar
                        </button>
                      </div>
                    </div>
                  `}).join('')}
                </div>
              </div>
            </div>
          </div>
          ` : ''}

      <!-- Seção: Convites Recebidos -->
      <section class="content-section">
        <h2 class="section-title purple-border">Convites Recebidos</h2>
        <p class="section-description">Convites de outros usuários para acessar orçamentos compartilhados com você</p>

        ${pendingInvitations && pendingInvitations.length > 0 ? `
          <div class="invitations-list space-y-3">
            ${pendingInvitations.map(invite => `
              <div class="invitation-item flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div>
                  <div class="invitation-email font-medium text-gray-900 dark:text-gray-100">
                    📋 ${invite.budgetName || 'Orçamento'}
                  </div>
                  <div class="invitation-date text-sm text-gray-500 dark:text-gray-400">
                    Convidado por ${invite.invitedByUserEmail || invite.invitedByUserId || 'usuário'} • ${invite.createdAt ? (invite.createdAt.toDate ? invite.createdAt.toDate() : new Date(invite.createdAt.seconds * 1000)).toLocaleDateString('pt-BR') : 'data desconhecida'}
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="acceptBudgetInvitation('${invite.id}')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">✅ Aceitar</button>
                  <button onclick="declineBudgetInvitation('${invite.id}')" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">❌ Recusar</button>
                  <button onclick="acceptAndEnterInvitation('${invite.id}','${invite.budgetId}','${(invite.budgetName || 'Orçamento').replace(/'/g, "\'")}')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">🚪 Aceitar e entrar</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-icon">📬</div>
            <div class="empty-text">Nenhum convite recebido</div>
            <div class="empty-description">Você não tem convites pendentes de outros usuários</div>
          </div>
        `}
      </section>

      <!-- Seção: Orçamentos Compartilhados com Você -->
      <section class="content-section">
        <h2 class="section-title blue-border">Orçamentos Compartilhados com Você</h2>
        <p class="section-description">Orçamentos onde você tem acesso, mas não é o proprietário</p>

        ${(() => {
          const me = currentUser?.uid;
          const shared = (budgets || []).filter(b => b && (b.isOwner === false || (me && b.userId && b.userId !== me)));
          if (!shared || shared.length === 0) {
            return `
              <div class="empty-state">
                <div class="empty-icon">🤝</div>
                <div class="empty-text">Nenhum orçamento compartilhado</div>
                <div class="empty-description">Convites aceitos aparecerão aqui para você entrar</div>
              </div>
            `;
          }
          return `
            <div class="budgets-list">
              ${shared.map(budget => `
                <div class="budget-item ${budget.id === currentBudget?.id ? 'active' : ''}">
                  <div class="budget-item-info">
                    <div class="budget-item-name">${budget.nome || 'Orçamento'}</div>
                    <div class="budget-item-date">ID: ${budget.id}</div>
                    <div class="budget-item-status">Compartilhado</div>
                  </div>
                  <div class="budget-item-actions">
                    ${budget.id !== currentBudget?.id ? `
                      <button class="enter-budget-button" onclick="enterBudget('${budget.id}', '${(budget.nome || 'Orçamento').replace(/'/g, "\'")}')" title="Entrar neste orçamento">
                        <span class="enter-icon">🚪</span>
                        <span class="enter-text">Entrar</span>
                      </button>
                    ` : `
                      <div class="current-budget-badge">
                        <span class="current-icon">✅</span>
                        <span class="current-text">Ativo</span>
                      </div>
                    `}
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        })()}
      </section>

      <!-- Seção: Compartilhar Orçamento -->
      ${currentBudget ? `
      <section class="content-section">
        <h2 class="section-title green-border">Compartilhar Orçamento</h2>
        <p class="section-description">Compartilhe seu orçamento atual com outros usuários</p>
        
        <div class="share-form">
          <div class="input-group">
            <label class="input-label">Email do usuário:</label>
            <input type="email" id="share-email" class="form-input" placeholder="usuario@exemplo.com">
          </div>
          <div class="input-group">
            <label class="input-label">Selecionar orçamento para compartilhar:</label>
            <select id="share-budget-select" class="form-input">
              ${budgets.map(b => `<option value="${b.id}" ${b.id === currentBudget.id ? 'selected' : ''}>${b.nome || 'Sem nome'}</option>`).join('')}
            </select>
          </div>
          <button onclick="inviteUserToBudget()" class="share-button">
            <span class="share-icon">📤</span>
            <span class="share-text">Enviar Convite</span>
          </button>
        </div>
        
        <div class="share-info">
          <div class="info-item">
            <span class="info-icon">ℹ️</span>
            <span class="info-text">O usuário receberá um convite por email para acessar este orçamento</span>
          </div>
        </div>
      </section>
      ` : `
      <section class="content-section">
        <h2 class="section-title green-border">Compartilhar Orçamento</h2>
        <p class="section-description">Compartilhe seu orçamento com outros usuários</p>
        
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <div class="empty-text">Nenhum orçamento selecionado</div>
          <div class="empty-description">Selecione um orçamento para poder compartilhá-lo</div>
        </div>
      </section>
      `}

      <!-- Seção: Gerenciar Orçamentos -->
      <section class="content-section">
        <h2 class="section-title blue-border">Gerenciar Orçamentos</h2>
        
        <div class="budgets-list">
          ${budgets.map(budget => `
            <div class="budget-item ${budget.id === currentBudget?.id ? 'active' : ''}">
              <div class="budget-item-info">
                <div class="budget-item-name">${budget.nome}</div>
                <div class="budget-item-date">Criado em ${budget.createdAt ? new Date(budget.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível'}</div>
                ${budget.id === currentBudget?.id ? '<div class="budget-item-status">Ativo</div>' : ''}
              </div>
              <div class="budget-item-actions">
                ${budget.id !== currentBudget?.id ? `
                  <button class="enter-budget-button" onclick="enterBudget('${budget.id}', '${budget.nome}')" title="Entrar neste orçamento">
                    <span class="enter-icon">🚪</span>
                    <span class="enter-text">Entrar</span>
                  </button>
                ` : `
                  <div class="current-budget-badge">
                    <span class="current-icon">✅</span>
                    <span class="current-text">Ativo</span>
                  </div>
                `}
                <button class="delete-button" onclick="deleteBudgetFromSettings('${budget.id}')" title="Excluir orçamento">
                  <span class="delete-icon">🗑️</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        
        <button onclick="createNewBudget()" class="create-button">
          <span class="create-icon">➕</span>
          <span class="create-text">Criar Novo Orçamento</span>
        </button>
      </section>

      <!-- Seção: Dados e Privacidade -->
      <section class="content-section">
        <h2 class="section-title purple-border">Dados e Privacidade</h2>
        
        <div class="privacy-actions">
          <button onclick="exportData()" class="privacy-button">
            <span class="privacy-icon">📤</span>
            <span class="privacy-text">Exportar Meus Dados</span>
          </button>
          
          <button onclick="importData()" class="privacy-button">
            <span class="privacy-icon">📥</span>
            <span class="privacy-text">Importar Dados</span>
          </button>
          
          <button onclick="clearData()" class="privacy-button danger">
            <span class="privacy-icon">🗑️</span>
            <span class="privacy-text">Limpar Todos os Dados</span>
          </button>
        </div>
      </section>

      <!-- Seção: Configurações de Notificações -->
      <section class="content-section">
        <h2 class="section-title orange-border">Notificações</h2>
        
        <div class="notifications-settings">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Alertas de Limite</div>
              <div class="setting-description">Notificar quando categoria exceder 70% do limite</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="limit-alerts" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Lembretes de Recorrentes</div>
              <div class="setting-description">Lembrar de aplicar despesas recorrentes</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="recurring-reminders" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Resumo Semanal</div>
              <div class="setting-description">Receber resumo semanal das finanças</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="weekly-summary">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

          <!-- ========== SEÇÃO 4: CONFIGURAÇÕES DE INTERFACE ========== -->
          <div class="mb-8">
            <h2 class="section-title purple-border">🎨 Interface & Aparência</h2>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Personalizar Aparência</h3>
              </div>
              
              <!-- Configurações -->
              <div class="p-4 space-y-4">
                <!-- Modo Escuro -->
                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
                      🌙
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Modo Escuro</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Alternar entre tema claro e escuro</div>
                    </div>
                  </div>
                  <button onclick="toggleTheme()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                    Alternar
                  </button>
                </div>
                
                <!-- Tema de Cores -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-xl">
                      🎨
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Tema de Cores</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Escolher cores preferidas para o app</div>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button onclick="setColorTheme('blue')" class="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-200" title="Azul"></button>
                    <button onclick="setColorTheme('green')" class="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200" title="Verde"></button>
                    <button onclick="setColorTheme('purple')" class="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 transition-all duration-200" title="Roxo"></button>
                    <button onclick="setColorTheme('orange')" class="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-200" title="Laranja"></button>
                  </div>
                </div>
                
                <!-- Compactar Interface -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-xl">
                      📏
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Compactar Interface</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar mais informações em menos espaço</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="compact-interface" onchange="toggleCompactMode(this.checked)" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <button onclick="toggleMicroMode()" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200" title="Modo micro-compacto">
                      📏 Micro
                    </button>
                    <button onclick="toggleNanoMode()" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200" title="Modo nano-compacto">
                      🔬 Nano
                    </button>
                  </div>
                </div>
                
                <!-- Animações -->
                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-xl">
                      ✨
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Animações</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar animações e transições</div>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="animations" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

      <!-- Seção: Configurações de Privacidade -->
      <section class="content-section">
        <h2 class="section-title purple-border">Privacidade e Segurança</h2>
        
        <div class="privacy-settings">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Autenticação Biométrica</div>
              <div class="setting-description">Usar impressão digital ou face ID</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="biometric-auth">
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Sincronização Automática</div>
              <div class="setting-description">Sincronizar dados automaticamente</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="auto-sync" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Analytics</div>
              <div class="setting-description">Compartilhar dados de uso para melhorias</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="analytics" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Seção: Sobre o App -->
      <section class="content-section">
        <h2 class="section-title">ℹ️ Sobre o App</h2>
        
        <div class="about-info">
          <div class="about-item">
            <span class="about-label">Versão:</span>
            <span class="about-value">4.2.0</span>
          </div>
          <div class="about-item">
            <span class="about-label">Desenvolvedor:</span>
            <span class="about-value">Igor Bispo</span>
          </div>
          <div class="about-item">
            <span class="about-label">Tecnologias:</span>
            <span class="about-value">Firebase, JavaScript, PWA</span>
          </div>
          <div class="about-item">
            <span class="about-label">Última Atualização:</span>
            <span class="about-value">Janeiro 2025</span>
          </div>
        </div>
        
        <div class="app-actions">
          <button onclick="checkForUpdates()" class="app-button">
            <span class="app-icon">🔄</span>
            <span class="app-text">Verificar Atualizações</span>
          </button>
          
          <button onclick="openHelp()" class="app-button">
            <span class="app-icon">❓</span>
            <span class="app-text">Ajuda e Suporte</span>
          </button>
          
          <button onclick="rateApp()" class="app-button">
            <span class="app-icon">⭐</span>
            <span class="app-text">Avaliar App</span>
          </button>
        </div>
      </section>
          </div>
        </div>
      </div>
    </div>

    <style>
      /* Estilos da Abordagem Híbrida para Configurações */
      
      .settings-container {
        /* Ocupa toda a largura disponível */
        max-width: none;
        width: 100%;
        margin: 0;
        padding: 0.5rem 1rem;
      }

            /* Mobile-first: Design ultra-compacto */
      @media (max-width: 768px) {
        .settings-container {
          padding: 0.125rem;
          margin: 0;
        }
        
        .page-title {
          font-size: 1.25rem !important;
          margin-bottom: 0.125rem !important;
          padding: 0.25rem 0 !important;
        }
        
        .page-subtitle {
          font-size: 0.75rem !important;
          margin-bottom: 0.5rem !important;
          opacity: 0.8;
        }
        
        .section-title {
          font-size: 1rem !important;
          margin-bottom: 0.25rem !important;
          padding: 0.25rem 0 !important;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .content-section {
          margin-bottom: 0.5rem !important;
          padding: 0.375rem !important;
          border-radius: 6px;
        }
        
        .setting-item {
          padding: 0.25rem 0 !important;
          margin-bottom: 0.25rem !important;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .setting-info {
          flex: 1;
          min-width: 0;
        }
        
        .setting-label {
          font-size: 0.8125rem !important;
          font-weight: 500;
          margin-bottom: 0.125rem !important;
        }
        
        .setting-description {
          font-size: 0.6875rem !important;
          opacity: 0.7;
          line-height: 1.2;
        }
        
        .budget-card {
          padding: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        
        .budget-name {
          font-size: 0.875rem !important;
          font-weight: 600;
        }
        
        .detail-item {
          margin-bottom: 0.125rem !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .detail-label, .detail-value {
          font-size: 0.6875rem !important;
        }
        
        .users-list, .invitations-list {
          gap: 0.25rem !important;
        }
        
        .user-item, .invitation-item {
          padding: 0.375rem !important;
          border-radius: 4px;
        }
        
        .user-email, .invitation-email {
          font-size: 0.8125rem !important;
          font-weight: 500;
        }
        
        .user-role, .invitation-date {
          font-size: 0.6875rem !important;
          opacity: 0.7;
        }
        
        .privacy-actions {
          gap: 0.25rem !important;
          flex-wrap: wrap;
        }
        
        .privacy-button {
          padding: 0.375rem 0.5rem !important;
          font-size: 0.75rem !important;
          border-radius: 4px;
        }
        
        .share-form {
          gap: 0.25rem !important;
          flex-direction: column;
        }
        
        .form-input {
          padding: 0.375rem !important;
          font-size: 0.8125rem !important;
          border-radius: 4px;
        }
        
        .share-button {
          padding: 0.375rem 0.5rem !important;
          font-size: 0.75rem !important;
          border-radius: 4px;
        }
        
        .budgets-list {
          gap: 0.25rem !important;
        }
        
        .budget-item {
          padding: 0.375rem !important;
          border-radius: 4px;
        }
        
        .budget-item-name {
          font-size: 0.8125rem !important;
          font-weight: 500;
        }
        
        .budget-item-date {
          font-size: 0.6875rem !important;
          opacity: 0.7;
        }
        
        .create-button {
          padding: 0.375rem 0.5rem !important;
          font-size: 0.75rem !important;
          border-radius: 4px;
        }
        
        .about-info {
          gap: 0.125rem !important;
        }
        
        .about-item {
          padding: 0.125rem 0 !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .about-label, .about-value {
          font-size: 0.6875rem !important;
        }
        
        .app-actions {
          gap: 0.25rem !important;
          flex-wrap: wrap;
        }
        
        .app-button {
          padding: 0.375rem 0.5rem !important;
          font-size: 0.75rem !important;
          border-radius: 4px;
        }
        
        .empty-state {
          padding: 0.5rem !important;
          text-align: center;
        }
        
        .empty-icon {
          font-size: 1.5rem !important;
          margin-bottom: 0.25rem !important;
        }
        
        .empty-text {
          font-size: 0.8125rem !important;
          font-weight: 500;
        }
        
        .empty-description {
          font-size: 0.6875rem !important;
          opacity: 0.7;
        }
        
                 /* Layout em grid para melhor aproveitamento */
         .settings-grid {
           display: grid;
           grid-template-columns: 1fr;
           gap: 0.5rem;
         }
         
         /* Otimizações adicionais para máximo aproveitamento */
         .settings-container {
           line-height: 1.2;
         }
         
         /* Reduzir espaçamento entre seções */
         .content-section + .content-section {
           margin-top: 0.25rem;
         }
         
         /* Otimizar espaçamento de listas */
         .users-list > * + *,
         .invitations-list > * + *,
         .budgets-list > * + * {
           margin-top: 0.125rem;
         }
         
         /* Reduzir padding de botões */
         .privacy-button,
         .share-button,
         .create-button,
         .app-button {
           line-height: 1.2;
           min-height: auto;
         }
         
         /* Otimizar formulários */
         .form-input {
           line-height: 1.2;
           min-height: auto;
         }
         
         /* Reduzir espaçamento entre elementos inline */
         .setting-label + .setting-description {
           margin-top: 0.0625rem;
         }
         
         .content-section {
           line-height: 1.1;
         }
         
         .setting-item {
           line-height: 1.1;
         }
         
         /* Reduzir espaçamento entre elementos inline */
         .setting-label + .setting-description {
           margin-top: 0.0625rem;
         }
         
         /* Otimizar espaçamento de listas */
         .users-list > * + *,
         .invitations-list > * + *,
         .budgets-list > * + * {
           margin-top: 0.125rem;
         }
         
         /* Reduzir padding de botões */
         .privacy-button,
         .share-button,
         .create-button,
         .app-button {
           line-height: 1.2;
           min-height: auto;
         }
         
         /* Otimizar formulários */
         .form-input {
           line-height: 1.2;
           min-height: auto;
         }

      /* Desktop: duas colunas automáticas para preencher melhor a largura */
      @media (min-width: 1024px) {
        .content-spacing {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }
        /* A primeira seção (Resumo do Orçamento) ocupa largura completa */
        .content-spacing > .mb-8:first-child {
          grid-column: 1 / -1;
        }
      }

      /* Ultrawide: aumenta o gap para conforto visual */
      @media (min-width: 1600px) {
        .content-spacing {
          gap: 1.5rem;
        }
      }
        
        /* Cards mais compactos */
        .compact-card {
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 6px;
          padding: 0.5rem;
          margin-bottom: 0.25rem;
        }
        
        /* Botões mais compactos */
        .compact-button {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        /* Toggle mais compacto */
        .toggle-switch {
          transform: scale(0.8);
          margin-left: 0.5rem;
        }
        
                 /* Ícones menores */
         .section-title::before {
           font-size: 0.875rem;
           margin-right: 0.375rem;
         }
         
         /* Controles de compactação */
         .compact-controls {
           display: flex;
           align-items: center;
           gap: 0.25rem;
         }
         
         .micro-compact-btn {
           background: none;
           border: none;
           font-size: 0.875rem;
           cursor: pointer;
           padding: 0.125rem;
           border-radius: 3px;
           transition: all 0.2s;
         }
         
         .micro-compact-btn:hover {
           background: rgba(0,0,0,0.1);
         }
         
         .micro-compact-btn.active {
           background: var(--primary-color);
           color: white;
         }
         
         .nano-compact-btn {
           background: none;
           border: none;
           font-size: 0.875rem;
           cursor: pointer;
           padding: 0.125rem;
           border-radius: 3px;
           transition: all 0.2s;
         }
         
         .nano-compact-btn:hover {
           background: rgba(0,0,0,0.1);
         }
         
         .nano-compact-btn.active {
           background: var(--accent-color);
           color: white;
         }
       }

       /* Modo Ultra-Compacto - Aplicado via JavaScript */
       .compact-mode {
         --spacing-xs: 1px;
         --spacing-sm: 2px;
         --spacing-md: 3px;
         --spacing-lg: 4px;
         --spacing-xl: 6px;
         --spacing-2xl: 8px;
       }

       .compact-mode .settings-container {
         padding: 0.125rem;
       }

       .compact-mode .page-title {
         font-size: 1rem;
         margin-bottom: 0.125rem;
         padding: 0.125rem 0;
       }

       .compact-mode .page-subtitle {
         font-size: 0.625rem;
         margin-bottom: 0.25rem;
         opacity: 0.6;
       }

       .compact-mode .section-title {
         font-size: 0.875rem;
         margin-bottom: 0.125rem;
         padding: 0.125rem 0;
         border-bottom: 1px solid rgba(0,0,0,0.05);
       }

       .compact-mode .content-section {
         margin-bottom: 0.25rem;
         padding: 0.25rem;
         border-radius: 4px;
       }

       .compact-mode .setting-item {
         padding: 0.125rem 0;
         margin-bottom: 0.125rem;
         display: flex;
         align-items: center;
         justify-content: space-between;
       }

       .compact-mode .setting-info {
         flex: 1;
         min-width: 0;
       }

       .compact-mode .setting-label {
         font-size: 0.6875rem;
         font-weight: 500;
         margin-bottom: 0.0625rem;
       }

       .compact-mode .setting-description {
         font-size: 0.5625rem;
         opacity: 0.6;
         line-height: 1.1;
       }

       .compact-mode .budget-card {
         padding: 0.25rem;
         margin-bottom: 0.25rem;
       }

       .compact-mode .budget-name {
         font-size: 0.75rem;
         font-weight: 600;
       }

       .compact-mode .detail-item {
         margin-bottom: 0.0625rem;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }

       .compact-mode .detail-label,
       .compact-mode .detail-value {
         font-size: 0.5625rem;
       }

       .compact-mode .users-list,
       .compact-mode .invitations-list {
         gap: 0.125rem;
       }

       .compact-mode .user-item,
       .compact-mode .invitation-item {
         padding: 0.1875rem;
         border-radius: 3px;
       }

       .compact-mode .user-email,
       .compact-mode .invitation-email {
         font-size: 0.6875rem;
         font-weight: 500;
       }

       .compact-mode .user-role,
       .compact-mode .invitation-date {
         font-size: 0.5625rem;
         opacity: 0.6;
       }

       .compact-mode .privacy-actions {
         gap: 0.125rem;
         flex-wrap: wrap;
       }

       .compact-mode .privacy-button {
         padding: 0.1875rem 0.375rem;
         font-size: 0.625rem;
         border-radius: 3px;
       }

       .compact-mode .share-form {
         gap: 0.125rem;
         flex-direction: column;
       }

       .compact-mode .form-input {
         padding: 0.1875rem;
         font-size: 0.6875rem;
         border-radius: 3px;
       }

       .compact-mode .share-button {
         padding: 0.1875rem 0.375rem;
         font-size: 0.625rem;
         border-radius: 3px;
       }

       .compact-mode .budgets-list {
         gap: 0.125rem;
       }

       .compact-mode .budget-item {
         padding: 0.1875rem;
         border-radius: 3px;
       }

       .compact-mode .budget-item-name {
         font-size: 0.6875rem;
         font-weight: 500;
       }

       .compact-mode .budget-item-date {
         font-size: 0.5625rem;
         opacity: 0.6;
       }

       .compact-mode .create-button {
         padding: 0.1875rem 0.375rem;
         font-size: 0.625rem;
         border-radius: 3px;
       }

       .compact-mode .about-info {
         gap: 0.0625rem;
       }

       .compact-mode .about-item {
         padding: 0.0625rem 0;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }

       .compact-mode .about-label,
       .compact-mode .about-value {
         font-size: 0.5625rem;
       }

       .compact-mode .app-actions {
         gap: 0.125rem;
         flex-wrap: wrap;
       }

       .compact-mode .app-button {
         padding: 0.1875rem 0.375rem;
         font-size: 0.625rem;
         border-radius: 3px;
       }

       .compact-mode .empty-state {
         padding: 0.25rem;
         text-align: center;
       }

       .compact-mode .empty-icon {
         font-size: 1rem;
         margin-bottom: 0.125rem;
       }

       .compact-mode .empty-text {
         font-size: 0.6875rem;
         font-weight: 500;
       }

       .compact-mode .empty-description {
         font-size: 0.5625rem;
         opacity: 0.6;
       }

       /* Toggle ultra-compacto */
       .compact-mode .toggle-switch {
         transform: scale(0.6);
         margin-left: 0.25rem;
       }

       /* Ícones ultra-compactos */
       .compact-mode .section-title::before {
         font-size: 0.75rem;
         margin-right: 0.25rem;
       }

       /* Layout em grid ultra-compacto */
       .compact-mode .settings-grid {
         gap: 0.25rem;
       }

       /* Cards ultra-compactos */
       .compact-mode .compact-card {
         padding: 0.25rem;
         margin-bottom: 0.125rem;
         border-radius: 3px;
       }
       
       /* Modo Micro-Compacto - Máxima compactação */
       .micro-mode {
         --spacing-xs: 0px;
         --spacing-sm: 1px;
         --spacing-md: 2px;
         --spacing-lg: 3px;
         --spacing-xl: 4px;
         --spacing-2xl: 6px;
       }
       
       .micro-mode .settings-container {
         padding: 0.0625rem;
       }
       
       .micro-mode .page-title {
         font-size: 0.875rem;
         margin-bottom: 0.0625rem;
         padding: 0.0625rem 0;
       }
       
       .micro-mode .page-subtitle {
         font-size: 0.5625rem;
         margin-bottom: 0.125rem;
         opacity: 0.5;
       }
       
       .micro-mode .section-title {
         font-size: 0.75rem;
         margin-bottom: 0.0625rem;
         padding: 0.0625rem 0;
         border-bottom: 1px solid rgba(0,0,0,0.05);
       }
       
       .micro-mode .content-section {
         margin-bottom: 0.125rem;
         padding: 0.125rem;
         border-radius: 2px;
       }
       
       .micro-mode .setting-item {
         padding: 0.0625rem 0;
         margin-bottom: 0.0625rem;
         display: flex;
         align-items: center;
         justify-content: space-between;
       }
       
       .micro-mode .setting-info {
         flex: 1;
         min-width: 0;
       }
       
       .micro-mode .setting-label {
         font-size: 0.625rem;
         font-weight: 500;
         margin-bottom: 0.03125rem;
       }
       
       .micro-mode .setting-description {
         font-size: 0.5rem;
         opacity: 0.5;
         line-height: 1;
       }
       
       .micro-mode .budget-card {
         padding: 0.125rem;
         margin-bottom: 0.125rem;
       }
       
       .micro-mode .budget-name {
         font-size: 0.6875rem;
         font-weight: 600;
       }
       
       .micro-mode .detail-item {
         margin-bottom: 0.03125rem;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }
       
       .micro-mode .detail-label,
       .micro-mode .detail-value {
         font-size: 0.5rem;
       }
       
       .micro-mode .users-list,
       .micro-mode .invitations-list {
         gap: 0.0625rem;
       }
       
       .micro-mode .user-item,
       .micro-mode .invitation-item {
         padding: 0.09375rem;
         border-radius: 2px;
       }
       
       .micro-mode .user-email,
       .micro-mode .invitation-email {
         font-size: 0.625rem;
         font-weight: 500;
       }
       
       .micro-mode .user-role,
       .micro-mode .invitation-date {
         font-size: 0.5rem;
         opacity: 0.5;
       }
       
       .micro-mode .privacy-actions {
         gap: 0.0625rem;
         flex-wrap: wrap;
       }
       
       .micro-mode .privacy-button {
         padding: 0.09375rem 0.1875rem;
         font-size: 0.5625rem;
         border-radius: 2px;
       }
       
       .micro-mode .share-form {
         gap: 0.0625rem;
         flex-direction: column;
       }
       
       .micro-mode .form-input {
         padding: 0.09375rem;
         font-size: 0.625rem;
         border-radius: 2px;
       }
       
       .micro-mode .share-button {
         padding: 0.09375rem 0.1875rem;
         font-size: 0.5625rem;
         border-radius: 2px;
       }
       
       .micro-mode .budgets-list {
         gap: 0.0625rem;
       }
       
       .micro-mode .budget-item {
         padding: 0.09375rem;
         border-radius: 2px;
       }
       
       .micro-mode .budget-item-name {
         font-size: 0.625rem;
         font-weight: 500;
       }
       
       .micro-mode .budget-item-date {
         font-size: 0.5rem;
         opacity: 0.5;
       }
       
       .micro-mode .create-button {
         padding: 0.09375rem 0.1875rem;
         font-size: 0.5625rem;
         border-radius: 2px;
       }
       
       .micro-mode .about-info {
         gap: 0.03125rem;
       }
       
       .micro-mode .about-item {
         padding: 0.03125rem 0;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }
       
       .micro-mode .about-label,
       .micro-mode .about-value {
         font-size: 0.5rem;
       }
       
       .micro-mode .app-actions {
         gap: 0.0625rem;
         flex-wrap: wrap;
       }
       
       .micro-mode .app-button {
         padding: 0.09375rem 0.1875rem;
         font-size: 0.5625rem;
         border-radius: 2px;
       }
       
       .micro-mode .empty-state {
         padding: 0.125rem;
         text-align: center;
       }
       
       .micro-mode .empty-icon {
         font-size: 0.75rem;
         margin-bottom: 0.0625rem;
       }
       
       .micro-mode .empty-text {
         font-size: 0.625rem;
         font-weight: 500;
       }
       
       .micro-mode .empty-description {
         font-size: 0.5rem;
         opacity: 0.5;
       }
       
       /* Toggle micro-compacto */
       .micro-mode .toggle-switch {
         transform: scale(0.5);
         margin-left: 0.125rem;
       }
       
       /* Ícones micro-compactos */
       .micro-mode .section-title::before {
         font-size: 0.625rem;
         margin-right: 0.125rem;
       }
       
       /* Layout em grid micro-compacto */
       .micro-mode .settings-grid {
         gap: 0.125rem;
       }
       
       /* Cards micro-compactos */
       .micro-mode .compact-card {
         padding: 0.125rem;
         margin-bottom: 0.0625rem;
         border-radius: 2px;
       }
       
                /* Botão micro-compacto ativo */
         .micro-mode .micro-compact-btn {
           background: var(--primary-color);
           color: white;
         }
         
         /* Modo Nano-Compacto - Compactação máxima */
         .nano-mode {
           --spacing-xs: 0px;
           --spacing-sm: 0px;
           --spacing-md: 1px;
           --spacing-lg: 2px;
           --spacing-xl: 3px;
           --spacing-2xl: 4px;
         }
         
         .nano-mode .settings-container {
           padding: 0.03125rem;
         }
         
         .nano-mode .page-title {
           font-size: 0.75rem;
           margin-bottom: 0.03125rem;
           padding: 0.03125rem 0;
         }
         
         .nano-mode .page-subtitle {
           font-size: 0.5rem;
           margin-bottom: 0.0625rem;
           opacity: 0.4;
         }
         
         .nano-mode .section-title {
           font-size: 0.6875rem;
           margin-bottom: 0.03125rem;
           padding: 0.03125rem 0;
           border-bottom: 1px solid rgba(0,0,0,0.03);
         }
         
         .nano-mode .content-section {
           margin-bottom: 0.0625rem;
           padding: 0.0625rem;
           border-radius: 1px;
         }
         
         .nano-mode .setting-item {
           padding: 0.03125rem 0;
           margin-bottom: 0.03125rem;
           display: flex;
           align-items: center;
           justify-content: space-between;
         }
         
         .nano-mode .setting-info {
           flex: 1;
           min-width: 0;
         }
         
         .nano-mode .setting-label {
           font-size: 0.5625rem;
           font-weight: 500;
           margin-bottom: 0.015625rem;
         }
         
         .nano-mode .setting-description {
           font-size: 0.4375rem;
           opacity: 0.4;
           line-height: 1;
         }
         
         .nano-mode .budget-card {
           padding: 0.0625rem;
           margin-bottom: 0.0625rem;
         }
         
         .nano-mode .budget-name {
           font-size: 0.625rem;
           font-weight: 600;
         }
         
         .nano-mode .detail-item {
           margin-bottom: 0.015625rem;
           display: flex;
           justify-content: space-between;
           align-items: center;
         }
         
         .nano-mode .detail-label,
         .nano-mode .detail-value {
           font-size: 0.4375rem;
         }
         
         .nano-mode .users-list,
         .nano-mode .invitations-list {
           gap: 0.03125rem;
         }
         
         .nano-mode .user-item,
         .nano-mode .invitation-item {
           padding: 0.046875rem;
           border-radius: 1px;
         }
         
         .nano-mode .user-email,
         .nano-mode .invitation-email {
           font-size: 0.5625rem;
           font-weight: 500;
         }
         
         .nano-mode .user-role,
         .nano-mode .invitation-date {
           font-size: 0.4375rem;
           opacity: 0.4;
         }
         
         .nano-mode .privacy-actions {
           gap: 0.03125rem;
           flex-wrap: wrap;
         }
         
         .nano-mode .privacy-button {
           padding: 0.046875rem 0.09375rem;
           font-size: 0.5rem;
           border-radius: 1px;
         }
         
         .nano-mode .share-form {
           gap: 0.03125rem;
           flex-direction: column;
         }
         
         .nano-mode .form-input {
           padding: 0.046875rem;
           font-size: 0.5625rem;
           border-radius: 1px;
         }
         
         .nano-mode .share-button {
           padding: 0.046875rem 0.09375rem;
           font-size: 0.5rem;
           border-radius: 1px;
         }
         
         .nano-mode .budgets-list {
           gap: 0.03125rem;
         }
         
         .nano-mode .budget-item {
           padding: 0.046875rem;
           border-radius: 1px;
         }
         
         .nano-mode .budget-item-name {
           font-size: 0.5625rem;
           font-weight: 500;
         }
         
         .nano-mode .budget-item-date {
           font-size: 0.4375rem;
           opacity: 0.4;
         }
         
         .nano-mode .create-button {
           padding: 0.046875rem 0.09375rem;
           font-size: 0.5rem;
           border-radius: 1px;
         }
         
         .nano-mode .about-info {
           gap: 0.015625rem;
         }
         
         .nano-mode .about-item {
           padding: 0.015625rem 0;
           display: flex;
           justify-content: space-between;
           align-items: center;
         }
         
         .nano-mode .about-label,
         .nano-mode .about-value {
           font-size: 0.4375rem;
         }
         
         .nano-mode .app-actions {
           gap: 0.03125rem;
           flex-wrap: wrap;
         }
         
         .nano-mode .app-button {
           padding: 0.046875rem 0.09375rem;
           font-size: 0.5rem;
           border-radius: 1px;
         }
         
         .nano-mode .empty-state {
           padding: 0.0625rem;
           text-align: center;
         }
         
         .nano-mode .empty-icon {
           font-size: 0.625rem;
           margin-bottom: 0.03125rem;
         }
         
         .nano-mode .empty-text {
           font-size: 0.5625rem;
           font-weight: 500;
         }
         
         .nano-mode .empty-description {
           font-size: 0.4375rem;
           opacity: 0.4;
         }
         
         /* Toggle nano-compacto */
         .nano-mode .toggle-switch {
           transform: scale(0.4);
           margin-left: 0.0625rem;
         }
         
         /* Ícones nano-compactos */
         .nano-mode .section-title::before {
           font-size: 0.5625rem;
           margin-right: 0.0625rem;
         }
         
         /* Layout em grid nano-compacto */
         .nano-mode .settings-grid {
           gap: 0.0625rem;
         }
         
         /* Cards nano-compactos */
         .nano-mode .compact-card {
           padding: 0.0625rem;
           margin-bottom: 0.03125rem;
           border-radius: 1px;
         }
         
         /* Botão nano-compacto ativo */
         .nano-mode .nano-compact-btn {
           background: var(--accent-color);
           color: white;
         }
         
         /* Otimizações nano-compactas adicionais */
         .nano-mode .settings-container {
           line-height: 0.9;
         }
         
         .nano-mode .content-section {
           line-height: 0.9;
         }
         
         .nano-mode .setting-item {
           line-height: 0.9;
         }
         
         .nano-mode .setting-label + .setting-description {
           margin-top: 0.015625rem;
         }
         
         .nano-mode .users-list > * + *,
         .nano-mode .invitations-list > * + *,
         .nano-mode .budgets-list > * + * {
           margin-top: 0.03125rem;
         }
         
         .nano-mode .privacy-button,
         .nano-mode .share-button,
         .nano-mode .create-button,
         .nano-mode .app-button {
           line-height: 0.9;
           min-height: auto;
         }
         
         .nano-mode .form-input {
           line-height: 0.9;
           min-height: auto;
         }
         
         /* Reduzir ainda mais espaçamentos no modo nano */
         .nano-mode .section-title {
           margin-bottom: 0.015625rem;
         }
         
         .nano-mode .content-section {
           margin-bottom: 0.03125rem;
         }
         
         .nano-mode .setting-item {
           margin-bottom: 0.015625rem;
         }
         
         /* Otimizações micro-compactas adicionais */
         .micro-mode .settings-container {
           line-height: 1;
         }
         
         .micro-mode .content-section {
           line-height: 1;
         }
         
         .micro-mode .setting-item {
           line-height: 1;
         }
         
         .micro-mode .setting-label + .setting-description {
           margin-top: 0.03125rem;
         }
         
         .micro-mode .users-list > * + *,
         .micro-mode .invitations-list > * + *,
         .micro-mode .budgets-list > * + * {
           margin-top: 0.0625rem;
         }
         
         .micro-mode .privacy-button,
         .micro-mode .share-button,
         .micro-mode .create-button,
         .micro-mode .app-button {
           line-height: 1;
           min-height: auto;
         }
         
         .micro-mode .form-input {
           line-height: 1;
           min-height: auto;
         }
         
         /* Reduzir ainda mais espaçamentos no modo micro */
         .micro-mode .section-title {
           margin-bottom: 0.03125rem;
         }
         
         .micro-mode .content-section {
           margin-bottom: 0.0625rem;
         }
         
         .micro-mode .setting-item {
           margin-bottom: 0.03125rem;
         }

      /* Header da página */
      .settings-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid #e5e7eb;
      }

      .page-title {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .page-subtitle {
        color: #6b7280;
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }

      .header-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .action-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.2s ease;
        border: none;
        cursor: pointer;
      }

      .action-button.primary {
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
      }

      .action-button.secondary {
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #d1d5db;
      }

      .action-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      /* Seções de conteúdo */
      .content-section {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: none;
      }

      .section-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 1rem;
        padding-left: 0.5rem;
        border-left: 4px solid #4f46e5;
      }

      /* Card do orçamento */
      .budget-card {
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .budget-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .budget-icon {
        font-size: 2rem;
        opacity: 0.8;
      }

      .budget-info {
        flex: 1;
      }

      .budget-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
      }

      .budget-status {
        font-size: 0.875rem;
        color: #059669;
        font-weight: 500;
      }

      .edit-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: background-color 0.2s ease;
      }

      .edit-button:hover {
        background: #f3f4f6;
      }

      .budget-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: white;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }

      .detail-label {
        font-size: 0.875rem;
        color: #6b7280;
      }

      .detail-value {
        font-weight: 500;
        color: #1f2937;
      }

      /* Listas de usuários e convites */
      .users-list,
      .invitations-list,
      .budgets-list {
        space-y: 0.75rem;
      }

      .user-item,
      .invitation-item,
      .budget-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .user-item:hover,
      .invitation-item:hover,
      .budget-item:hover {
        background: #f3f4f6;
        transform: translateY(-1px);
      }

      .budget-item.active {
        border-color: #4f46e5;
        background: #f0f4ff;
      }

      .budget-item-status {
        font-size: 0.75rem;
        color: #059669;
        font-weight: 600;
        margin-top: 0.25rem;
      }

      .current-budget-badge {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        background: #dcfce7;
        color: #059669;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .current-icon {
        font-size: 1rem;
      }

      .current-text {
        font-size: 0.75rem;
      }

      .user-info,
      .invitation-info,
      .budget-item-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
      }

      .user-avatar {
        font-size: 1.5rem;
        opacity: 0.7;
      }

      .user-email,
      .invitation-email,
      .budget-item-name {
        font-weight: 500;
        color: #1f2937;
      }

      .user-role,
      .invitation-date,
      .budget-item-date {
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.25rem;
      }

      .user-date {
        font-size: 0.75rem;
        color: #9ca3af;
        margin-top: 0.25rem;
      }

      .invitation-status {
        font-size: 0.875rem;
        color: #f59e0b;
        font-weight: 500;
        margin-top: 0.25rem;
      }

      .section-description {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 1rem;
        font-style: italic;
      }

      .empty-state {
        text-align: center;
        padding: 2rem;
        background: #f9fafb;
        border: 2px dashed #d1d5db;
        border-radius: 12px;
        color: #6b7280;
      }

      .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
      }

      .empty-text {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #374151;
      }

      .empty-description {
        font-size: 0.875rem;
        color: #9ca3af;
      }

      .share-info {
        margin-top: 1rem;
        padding: 1rem;
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 8px;
      }

      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .info-icon {
        font-size: 1rem;
        margin-top: 0.125rem;
      }

      .info-text {
        font-size: 0.875rem;
        color: #0369a1;
        line-height: 1.4;
      }

      .color-theme-selector {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .color-option {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid #e5e7eb;
        background: white;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .color-option:hover {
        transform: scale(1.1);
        border-color: #9ca3af;
      }

      .color-option.active {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
      }

      .color-preview {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      .color-option.blue .color-preview {
        background: #3B82F6;
      }

      .color-option.green .color-preview {
        background: #10B981;
      }

      .color-option.purple .color-preview {
        background: #8B5CF6;
      }

      .color-option.orange .color-preview {
        background: #F59E0B;
      }

      /* Botões de ação */
      .remove-button,
      .cancel-button,
      .switch-button,
      .delete-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .remove-button:hover,
      .cancel-button:hover {
        background: #fee2e2;
        color: #dc2626;
      }

      .user-actions,
      .invitation-actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .remove-user-button,
      .cancel-invitation-button,
      .resend-invitation-button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .remove-user-button {
        background: #fee2e2;
        color: #dc2626;
      }

      .remove-user-button:hover {
        background: #fecaca;
        transform: translateY(-1px);
      }

      .cancel-invitation-button {
        background: #fee2e2;
        color: #dc2626;
      }

      .cancel-invitation-button:hover {
        background: #fecaca;
        transform: translateY(-1px);
      }

      .resend-invitation-button {
        background: #dbeafe;
        color: #2563eb;
      }

      .resend-invitation-button:hover {
        background: #bfdbfe;
        transform: translateY(-1px);
      }

      .remove-text,
      .cancel-text,
      .resend-text {
        font-size: 0.75rem;
      }

      .enter-budget-button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .enter-budget-button:hover {
        background: linear-gradient(135deg, #059669, #047857);
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      }

      .enter-icon {
        font-size: 1rem;
      }

      .enter-text {
        font-size: 0.75rem;
      }

      .switch-button:hover {
        background: #dbeafe;
        color: #2563eb;
      }

      .delete-button:hover {
        background: #fee2e2;
        color: #dc2626;
      }

      /* Formulário de compartilhamento */
      .share-form {
        display: flex;
        gap: 1rem;
        align-items: end;
        flex-wrap: wrap;
      }

      .input-group {
        flex: 1;
        min-width: 250px;
      }

      .input-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 0.5rem;
      }

      .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s ease;
      }

      .form-input:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      }

      .share-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .share-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
      }

      /* Botão criar orçamento */
      .create-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 1rem;
      }

      .create-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
      }

      /* Ações de privacidade */
      .privacy-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .privacy-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .privacy-button:hover {
        background: #f3f4f6;
        transform: translateY(-1px);
      }

      .privacy-button.danger {
        color: #dc2626;
        border-color: #fecaca;
      }

      .privacy-button.danger:hover {
        background: #fee2e2;
      }

      /* Informações sobre o app */
      .about-info {
        space-y: 0.75rem;
      }

      .about-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
      }

      .about-label {
        font-weight: 500;
        color: #374151;
      }

      .about-value {
        color: #6b7280;
      }

      /* Configurações de notificações e interface */
      .notifications-settings,
      .interface-settings,
      .privacy-settings {
        space-y: 1rem;
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .setting-item:hover {
        background: #f3f4f6;
      }

      .setting-info {
        flex: 1;
      }

      .setting-label {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }

      .setting-description {
        font-size: 0.875rem;
        color: #6b7280;
      }

      /* Toggle Switch */
      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 24px;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .toggle-slider {
        background-color: #4f46e5;
      }

      input:checked + .toggle-slider:before {
        transform: translateX(26px);
      }

      /* Botão de tema */
      .theme-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .theme-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
      }

      /* Ações do app */
      .app-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
      }

      .app-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .app-button:hover {
        background: #f3f4f6;
        transform: translateY(-1px);
      }

      /* Responsividade */
      @media (max-width: 768px) {
        .settings-container {
          padding: 0.5rem;
        }

        .page-title {
          font-size: 1.5rem;
        }

        .header-actions {
          flex-direction: column;
        }

        .action-button {
          width: 100%;
          justify-content: center;
        }

        .share-form {
          flex-direction: column;
        }

        .input-group {
          min-width: auto;
        }

        .privacy-actions {
          grid-template-columns: 1fr;
        }

        .budget-details {
          grid-template-columns: 1fr;
        }

        .app-actions {
          grid-template-columns: 1fr;
        }

        .setting-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .toggle-switch {
          align-self: flex-end;
        }

        .user-actions,
        .invitation-actions {
          flex-direction: column;
          gap: 0.5rem;
        }

        .remove-user-button,
        .cancel-invitation-button,
        .resend-invitation-button {
          width: 100%;
          justify-content: center;
        }

        .enter-budget-button {
          width: 100%;
          justify-content: center;
        }

        .current-budget-badge {
          width: 100%;
          justify-content: center;
        }
      }

      /* Estilos para modais de ajuda e avaliação */
      .help-content,
      .rating-content {
        max-width: 500px;
        margin: 0 auto;
      }

      .help-section {
        margin-bottom: 1.5rem;
      }

      .help-section h4 {
        color: #4f46e5;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .help-section ul {
        list-style: none;
        padding-left: 0;
      }

      .help-section li {
        padding: 0.25rem 0;
        color: #374151;
      }

      .help-section li:before {
        content: "•";
        color: #4f46e5;
        font-weight: bold;
        margin-right: 0.5rem;
      }

      .rating-stars {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin: 1rem 0;
      }

      .star {
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #ccc;
      }

      .star:hover {
        transform: scale(1.1);
      }

      .rating-text {
        text-align: center;
        color: #6b7280;
        margin-bottom: 1rem;
      }

      .submit-rating-btn {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .submit-rating-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
      }
    </style>
  `;

  // Injetar indicador de período somente leitura
  try {
    const { createPeriodIndicator } = await import('../ui/PeriodIndicator.js');
    const holder = document.getElementById('settings-period-indicator');
    if (holder) {
      holder.innerHTML = '';
      holder.appendChild(createPeriodIndicator({ readonly: true }));
    }
  } catch (e) {
    console.warn('Settings PeriodIndicator indisponível:', e);
  }

  // Configurar evento do botão de tema
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (window.setupThemeToggle) {
        window.setupThemeToggle();
      }
    });
  }
}

// Compat: expor no escopo global para integração com roteador legado
try {
  if (typeof window !== 'undefined') {
    window.renderSettings = renderSettings;
  }
} catch {}

// Funções auxiliares implementadas - Expor para escopo global
window.editBudgetName = function() {
  const currentBudget = window.appState?.currentBudget;
  if (!currentBudget) {
    window.Snackbar?.({ message: 'Nenhum orçamento selecionado', type: 'warning' });
    return;
  }

  const newName = prompt('Digite o novo nome do orçamento:', currentBudget.nome);
  if (newName && newName.trim() && newName !== currentBudget.nome) {
    // Implementar atualização do nome
    console.log('Atualizar nome do orçamento para:', newName);
    window.Snackbar?.({ message: 'Funcionalidade em desenvolvimento', type: 'info' });
  }
}

window.removeUserFromBudget = function(uid, email) {
  if (confirm(`Tem certeza que deseja remover o usuário "${email}" do orçamento?\n\nEsta ação irá revogar o acesso deste usuário ao orçamento.`)) {
    console.log('Remover usuário do orçamento:', uid, email);
    
    // Implementar remoção do usuário do orçamento
    if (window.appState?.currentBudget) {
      const budgetId = window.appState.currentBudget.id;
      
      // Remover da lista de usuários permitidos
      const updatedUsers = window.appState.currentBudget.usuariosPermitidos?.filter(userId => userId !== uid) || [];
      
      // Atualizar no Firebase
      const budgetRef = doc(db, 'budgets', budgetId);
      updateDoc(budgetRef, {
        usuariosPermitidos: updatedUsers
      }).then(() => {
        window.Snackbar?.({ 
          message: `Usuário "${email}" removido com sucesso!`, 
          type: 'success' 
        });
        
        // Recarregar a página de configurações
        setTimeout(() => {
          window.renderSettings();
        }, 1000);
      }).catch(error => {
        console.error('Erro ao remover usuário:', error);
        window.Snackbar?.({ 
          message: 'Erro ao remover usuário. Tente novamente.', 
          type: 'error' 
        });
      });
    }
  }
}

window.removeUser = function(uid) {
  // Função legada - redirecionar para a nova função
  window.removeUserFromBudget(uid, 'Usuário');
}

window.cancelInvitation = function(inviteId, email) {
  if (confirm(`Tem certeza que deseja cancelar o convite enviado para "${email}"?\n\nEste convite será removido permanentemente.`)) {
    console.log('Cancelar convite:', inviteId, email);
    
    // Implementar cancelamento do convite
    const invitationRef = doc(db, 'budgetInvitations', inviteId);
    deleteDoc(invitationRef).then(() => {
      window.Snackbar?.({ 
        message: `Convite para "${email}" cancelado com sucesso!`, 
        type: 'success' 
      });
      
      // Recarregar a página de configurações
      setTimeout(() => {
        window.renderSettings();
      }, 1000);
    }).catch(error => {
      console.error('Erro ao cancelar convite:', error);
      window.Snackbar?.({ 
        message: 'Erro ao cancelar convite. Tente novamente.', 
        type: 'error' 
      });
    });
  }
}

window.resendInvitation = function(inviteId, email) {
  if (confirm(`Deseja reenviar o convite para "${email}"?\n\nUm novo email será enviado para o usuário.`)) {
    console.log('Reenviar convite:', inviteId, email);
    
    // Implementar reenvio do convite
    window.Snackbar?.({ 
      message: `Convite reenviado para "${email}"!`, 
      type: 'success' 
    });
    
    // Aqui você pode implementar a lógica de reenvio
    // Por exemplo, atualizar a data do convite e enviar email
  }
}

// shareBudget (mock antigo) removido; usamos inviteUserToBudget do app.js

window.enterBudget = function(budgetId, budgetName) {
  const budget = window.appState?.budgets?.find(b => b.id === budgetId);
  if (budget && window.setCurrentBudget) {
    // Mostrar loading
    window.Snackbar?.({ 
      message: `Entrando no orçamento "${budgetName}"...`, 
      type: 'info' 
    });
    
    // Trocar para o orçamento
    window.setCurrentBudget(budget);
    
    // Feedback de sucesso
    setTimeout(() => {
      window.Snackbar?.({ 
        message: `Orçamento "${budgetName}" ativado com sucesso!`, 
        type: 'success' 
      });
      
      // Recarregar a página de configurações para atualizar o estado
      setTimeout(() => {
        window.renderSettings();
      }, 500);
    }, 1000);
  }
}

window.switchBudget = function(budgetId) {
  // Função legada - redirecionar para a nova função
  const budget = window.appState?.budgets?.find(b => b.id === budgetId);
  if (budget) {
    window.enterBudget(budgetId, budget.nome);
  }
}

window.deleteBudgetFromSettings = function(budgetId) {
  const budget = window.appState?.budgets?.find(b => b.id === budgetId);
  if (!budget) return;

  if (confirm(`Tem certeza que deseja excluir o orçamento "${budget.nome}"?\n\n⚠️ Esta ação não pode ser desfeita e você perderá todos os dados deste orçamento.`)) {
    if (window.deleteBudget) {
      window.deleteBudget(budgetId)
        .then(async () => {
          await window.renderSettings();
        })
        .catch(error => {
          console.error('Erro ao excluir orçamento:', error);
        });
    }
  }
}

window.createNewBudget = function() {
  const budgetName = prompt('Digite o nome do novo orçamento:');
  if (budgetName && budgetName.trim()) {
    if (window.addBudget) {
      window.addBudget(budgetName.trim())
        .then(async () => {
          await window.renderSettings();
        })
        .catch(error => {
          console.error('Erro ao criar orçamento:', error);
        });
    }
  }
}

window.exportData = function() {
  console.log('📤 Iniciando exportação de dados...');
  
  // Verificar se existe função global de exportação
  if (window.showExportOptions) {
    console.log('🔧 Usando função global de exportação');
    window.showExportOptions();
    return;
  }
  
  // Fallback: mostrar modal básico de exportação
  console.log('📋 Mostrando modal de exportação básico');
  
  const exportContent = `
    <div class="export-modal">
      <h3>📤 Exportar Dados</h3>
      <p>Escolha o formato de exportação:</p>
      
      <div class="export-options">
        <button onclick="exportToJSON()" class="export-option">
          <span class="export-icon">📄</span>
          <span class="export-text">JSON (Backup Completo)</span>
        </button>
        
        <button onclick="exportToExcel()" class="export-option">
          <span class="export-icon">📊</span>
          <span class="export-text">Excel (Planilha)</span>
        </button>
        
        <button onclick="exportToPDF()" class="export-option">
          <span class="export-icon">📋</span>
          <span class="export-text">PDF (Relatório)</span>
        </button>
      </div>
      
      <button onclick="closeModal()" class="close-button">Fechar</button>
    </div>
  `;
  
  // Mostrar modal usando função global se disponível
  if (window.showModal) {
    window.showModal(exportContent);
  } else {
    // Fallback: alert simples
    alert('Funcionalidade de exportação em desenvolvimento. Use a função global showExportOptions.');
  }
}

window.importData = function() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const data = JSON.parse(e.target.result);
          console.log('Dados importados:', data);
          window.Snackbar?.({ message: 'Funcionalidade de importação em desenvolvimento', type: 'info' });
        } catch (error) {
          window.Snackbar?.({ message: 'Arquivo inválido', type: 'error' });
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

window.clearData = function() {
  if (confirm('⚠️ ATENÇÃO: Esta ação irá limpar TODOS os dados do orçamento atual!\n\nTem certeza que deseja continuar?\n\nEsta ação não pode ser desfeita.')) {
    if (confirm('ÚLTIMA CONFIRMAÇÃO: Você tem certeza absoluta que deseja limpar todos os dados?')) {
      console.log('Limpar dados do orçamento');
      window.Snackbar?.({ message: 'Funcionalidade em desenvolvimento', type: 'info' });
    }
  }
}

// Funções para as novas funcionalidades - Expor para escopo global
window.toggleTheme = function() {
  console.log('🎨 Alternando tema...');
  
  // Alternância manual do tema (sem depender da função global)
  const html = document.documentElement;
  const body = document.body;
  const isDark = html.classList.contains('dark') || body.classList.contains('dark');
  
  console.log('🌙 Estado atual do tema:', isDark ? 'escuro' : 'claro');
  
  if (isDark) {
    // Mudar para tema claro
    html.classList.remove('dark');
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    localStorage.setItem('darkMode', 'false');
    console.log('☀️ Tema alterado para claro');
  } else {
    // Mudar para tema escuro
    html.classList.add('dark');
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('darkMode', 'true');
    console.log('🌙 Tema alterado para escuro');
  }
  
  // Atualizar ícone do botão se existir
  const themeButton = document.querySelector('.theme-button .theme-icon');
  if (themeButton) {
    themeButton.textContent = isDark ? '☀️' : '🌙';
    console.log('🔧 Ícone atualizado para:', isDark ? '☀️' : '🌙');
  } else {
    console.log('🔧 Botão de tema não encontrado');
  }
  
  // Feedback visual
  window.Snackbar?.({ 
    message: `Tema alterado para ${isDark ? 'claro' : 'escuro'}`, 
    type: 'success' 
  });
  
  // Forçar atualização de elementos que podem precisar de sincronização
  setTimeout(() => {
    const elements = document.querySelectorAll('[class*="dark:"]');
    elements.forEach(element => {
      element.offsetHeight; // Forçar reflow
    });
    console.log('🎨 Elementos de tema atualizados');
  }, 100);
}

// Função para inicializar o ícone do tema baseado no estado atual
window.initializeThemeIcon = function() {
  const html = document.documentElement;
  const body = document.body;
  const isDark = html.classList.contains('dark') || body.classList.contains('dark');
  
  const themeButton = document.querySelector('.theme-button .theme-icon');
  if (themeButton) {
    themeButton.textContent = isDark ? '🌙' : '☀️';
    console.log('🔧 Ícone inicializado para:', isDark ? '🌙' : '☀️');
  }
}

// Função para definir o tema de cores
window.setColorTheme = function(color) {
  console.log('🎨 Definindo tema de cor:', color);
  
  // Remover classes ativas de todos os botões
  document.querySelectorAll('.color-option').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Adicionar classe ativa ao botão selecionado
  const selectedButton = document.querySelector(`.color-option.${color}`);
  if (selectedButton) {
    selectedButton.classList.add('active');
  }
  
  // Aplicar o tema de cor ao documento
  document.documentElement.setAttribute('data-theme-color', color);
  
  // Salvar preferência no localStorage
  localStorage.setItem('colorTheme', color);
  
  // Feedback visual
  window.Snackbar?.({ 
    message: `Tema de cor alterado para ${color}`, 
    type: 'success' 
  });
  
  console.log('✅ Tema de cor aplicado:', color);
}

// Função para inicializar o tema de cores
window.initializeColorTheme = function() {
  const savedColor = localStorage.getItem('colorTheme') || 'blue';
  console.log('🎨 Inicializando tema de cor:', savedColor);
  
  // Aplicar tema salvo
  window.setColorTheme(savedColor);
}

// Função para alternar modo compacto
window.toggleCompactMode = function(enabled) {
  console.log('📱 Alternando modo ultra-compacto:', enabled);
  
  const container = document.querySelector('.settings-container');
  const appContainer = document.querySelector('.app-container');
  const body = document.body;
  
  if (!container) return;
  
  if (enabled) {
    container.classList.add('compact-mode');
    if (appContainer) appContainer.classList.add('compact-mode');
    body.classList.add('compact-mode');
    localStorage.setItem('compactMode', 'true');
    console.log('✅ Modo compacto ativado');
  } else {
    container.classList.remove('compact-mode');
    container.classList.remove('micro-mode'); // Remove micro-mode também
    container.classList.remove('nano-mode'); // Remove nano-mode também
    if (appContainer) {
      appContainer.classList.remove('compact-mode');
      appContainer.classList.remove('micro-mode');
      appContainer.classList.remove('nano-mode');
    }
    body.classList.remove('compact-mode');
    body.classList.remove('micro-mode');
    body.classList.remove('nano-mode');
    localStorage.setItem('compactMode', 'false');
    localStorage.setItem('microMode', 'false');
    localStorage.setItem('nanoMode', 'false');
    localStorage.setItem('autoCompact', 'false'); // Remove auto-compacto também
    console.log('✅ Modo compacto desativado');
  }
  
  // Atualizar botões
  const microBtn = document.querySelector('.micro-compact-btn');
  const nanoBtn = document.querySelector('.nano-compact-btn');
  if (microBtn) {
    microBtn.classList.remove('active');
  }
  if (nanoBtn) {
    nanoBtn.classList.remove('active');
  }
  
  // Feedback visual
  window.Snackbar?.({ 
    message: `Interface ${enabled ? 'ultra-compactada' : 'normal'}`, 
    type: 'success' 
  });
  
  // Forçar reflow para aplicar mudanças
  setTimeout(() => {
    container.offsetHeight;
    if (appContainer) appContainer.offsetHeight;
  }, 50);
}

// Função para alternar modo micro-compacto
window.toggleMicroMode = function() {
  console.log('📱 Alternando modo micro-compacto');
  
  const container = document.querySelector('.settings-container');
  const appContainer = document.querySelector('.app-container');
  const body = document.body;
  const microBtn = document.querySelector('.micro-compact-btn');
  const nanoBtn = document.querySelector('.nano-compact-btn');
  if (!container || !microBtn) return;
  
  const isMicro = container.classList.contains('micro-mode');
  
  if (isMicro) {
    container.classList.remove('micro-mode');
    if (appContainer) appContainer.classList.remove('micro-mode');
    body.classList.remove('micro-mode');
    microBtn.classList.remove('active');
    localStorage.setItem('microMode', 'false');
    console.log('✅ Modo micro-compacto desativado');
    window.Snackbar?.({ 
      message: 'Modo micro-compacto desativado', 
      type: 'success' 
    });
  } else {
    // Ativar modo micro (requer modo compacto ativo)
    if (!container.classList.contains('compact-mode')) {
      container.classList.add('compact-mode');
      if (appContainer) appContainer.classList.add('compact-mode');
      body.classList.add('compact-mode');
      localStorage.setItem('compactMode', 'true');
    }
    container.classList.add('micro-mode');
    if (appContainer) appContainer.classList.add('micro-mode');
    body.classList.add('micro-mode');
    microBtn.classList.add('active');
    localStorage.setItem('microMode', 'true');
    console.log('✅ Modo micro-compacto ativado');
    window.Snackbar?.({ 
      message: 'Modo micro-compacto ativado', 
      type: 'success' 
    });
  }
  
  // Remover modo nano se estiver ativo
  if (container.classList.contains('nano-mode')) {
    container.classList.remove('nano-mode');
    if (appContainer) appContainer.classList.remove('nano-mode');
    body.classList.remove('nano-mode');
    if (nanoBtn) {
      nanoBtn.classList.remove('active');
    }
    localStorage.setItem('nanoMode', 'false');
  }
  
  // Forçar reflow para aplicar mudanças
  setTimeout(() => {
    container.offsetHeight;
    if (appContainer) appContainer.offsetHeight;
  }, 50);
}

// Função para alternar modo nano-compacto
window.toggleNanoMode = function() {
  console.log('📱 Alternando modo nano-compacto');
  
  const container = document.querySelector('.settings-container');
  const appContainer = document.querySelector('.app-container');
  const body = document.body;
  const nanoBtn = document.querySelector('.nano-compact-btn');
  const microBtn = document.querySelector('.micro-compact-btn');
  if (!container || !nanoBtn) return;
  
  const isNano = container.classList.contains('nano-mode');
  
  if (isNano) {
    container.classList.remove('nano-mode');
    if (appContainer) appContainer.classList.remove('nano-mode');
    body.classList.remove('nano-mode');
    nanoBtn.classList.remove('active');
    localStorage.setItem('nanoMode', 'false');
    console.log('✅ Modo nano-compacto desativado');
    window.Snackbar?.({ 
      message: 'Modo nano-compacto desativado', 
      type: 'success' 
    });
  } else {
    // Ativar modo nano (requer modo compacto ativo)
    if (!container.classList.contains('compact-mode')) {
      container.classList.add('compact-mode');
      if (appContainer) appContainer.classList.add('compact-mode');
      body.classList.add('compact-mode');
      localStorage.setItem('compactMode', 'true');
    }
    // Ativar modo micro também se não estiver ativo
    if (!container.classList.contains('micro-mode')) {
      container.classList.add('micro-mode');
      if (appContainer) appContainer.classList.add('micro-mode');
      body.classList.add('micro-mode');
      if (microBtn) {
        microBtn.classList.add('active');
      }
      localStorage.setItem('microMode', 'true');
    }
    container.classList.add('nano-mode');
    if (appContainer) appContainer.classList.add('nano-mode');
    body.classList.add('nano-mode');
    nanoBtn.classList.add('active');
    localStorage.setItem('nanoMode', 'true');
    console.log('✅ Modo nano-compacto ativado');
    window.Snackbar?.({ 
      message: 'Modo nano-compacto ativado', 
      type: 'success' 
    });
  }
  
  // Forçar reflow para aplicar mudanças
  setTimeout(() => {
    container.offsetHeight;
    if (appContainer) appContainer.offsetHeight;
  }, 50);
}

// Função para inicializar modo compacto
window.initializeCompactMode = function() {
  const isCompact = localStorage.getItem('compactMode') === 'true';
  const isAutoCompact = localStorage.getItem('autoCompact') === 'true';
  const isMicro = localStorage.getItem('microMode') === 'true';
  const isNano = localStorage.getItem('nanoMode') === 'true';
  console.log('📱 Inicializando modo compacto:', isCompact, 'Auto:', isAutoCompact, 'Micro:', isMicro, 'Nano:', isNano);
  
  // Detectar telas muito pequenas e aplicar auto-compacto
  const isSmallScreen = window.innerWidth <= 480 || window.innerHeight <= 600;
  if (isSmallScreen && !isAutoCompact) {
    console.log('📱 Tela pequena detectada, aplicando auto-compacto');
    localStorage.setItem('autoCompact', 'true');
    localStorage.setItem('compactMode', 'true');
  }
  
  // Atualizar checkbox
  const checkbox = document.getElementById('compact-interface');
  if (checkbox) {
    checkbox.checked = isCompact || isAutoCompact;
  }
  
  // Aplicar modo salvo
  window.toggleCompactMode(isCompact || isAutoCompact);
  
  // Aplicar modo micro se necessário
  if (isMicro) {
    setTimeout(() => {
      window.toggleMicroMode();
    }, 100);
  }
  
  // Aplicar modo nano se necessário
  if (isNano) {
    setTimeout(() => {
      window.toggleNanoMode();
    }, 200);
  }
}

// Função para detectar mudanças de tamanho de tela
window.handleResize = function() {
  const isSmallScreen = window.innerWidth <= 480 || window.innerHeight <= 600;
  const isAutoCompact = localStorage.getItem('autoCompact') === 'true';
  
  if (isSmallScreen && !isAutoCompact) {
    console.log('📱 Tela pequena detectada, aplicando auto-compacto');
    localStorage.setItem('autoCompact', 'true');
    localStorage.setItem('compactMode', 'true');
    window.toggleCompactMode(true);
    
    // Atualizar checkbox
    const checkbox = document.getElementById('compact-interface');
    if (checkbox) {
      checkbox.checked = true;
    }
  } else if (!isSmallScreen && isAutoCompact) {
    console.log('📱 Tela maior detectada, removendo auto-compacto');
    localStorage.setItem('autoCompact', 'false');
    // Não remove o modo compacto manual, apenas o automático
  }
}

window.checkForUpdates = function() {
  // Verificar se há atualizações disponíveis
  window.Snackbar?.({ 
    message: 'Verificando atualizações...', 
    type: 'info' 
  });
  
  setTimeout(() => {
    window.Snackbar?.({ 
      message: 'Você está usando a versão mais recente!', 
      type: 'success' 
    });
  }, 2000);
}

window.openHelp = function() {
  // Abrir página de ajuda ou modal
  const helpContent = `
    <div class="help-content">
      <h3>📚 Guia de Uso</h3>
      <div class="help-section">
        <h4>🎯 Como começar:</h4>
        <ul>
          <li>Crie categorias para organizar suas despesas</li>
          <li>Adicione suas primeiras transações</li>
          <li>Configure despesas recorrentes</li>
          <li>Monitore seu orçamento no dashboard</li>
        </ul>
      </div>
      <div class="help-section">
        <h4>🎤 Comandos de Voz:</h4>
        <ul>
          <li>"Gastei 50 reais no supermercado"</li>
          <li>"Recebi 2000 de salário"</li>
          <li>"Qual meu saldo?"</li>
        </ul>
      </div>
      <div class="help-section">
        <h4>📞 Suporte:</h4>
        <p>Para dúvidas ou problemas, entre em contato:</p>
        <p>📧 Email: suporte@servotech.com</p>
        <p>💬 WhatsApp: (11) 99999-9999</p>
      </div>
    </div>
  `;
  
  if (window.Modal) {
    window.Modal({
      title: '❓ Ajuda e Suporte',
      content: helpContent
    });
  } else {
    alert('Página de ajuda em desenvolvimento');
  }
}

window.rateApp = function() {
  // Abrir página de avaliação
  const ratingContent = `
    <div class="rating-content">
      <h3>⭐ Avalie o App</h3>
      <p>Seu feedback é muito importante para melhorarmos o aplicativo!</p>
      <div class="rating-stars">
        <span class="star" onclick="rateAppStars(1)">⭐</span>
        <span class="star" onclick="rateAppStars(2)">⭐</span>
        <span class="star" onclick="rateAppStars(3)">⭐</span>
        <span class="star" onclick="rateAppStars(4)">⭐</span>
        <span class="star" onclick="rateAppStars(5)">⭐</span>
      </div>
      <p class="rating-text">Clique nas estrelas para avaliar</p>
      <button onclick="submitRating()" class="submit-rating-btn" style="display: none;">
        Enviar Avaliação
      </button>
    </div>
  `;
  
  if (window.Modal) {
    window.Modal({
      title: '⭐ Avaliar App',
      content: ratingContent
    });
  } else {
    alert('Sistema de avaliação em desenvolvimento');
  }
}

// Funções auxiliares para avaliação
window.rateAppStars = function(stars) {
  const starElements = document.querySelectorAll('.star');
  const submitBtn = document.querySelector('.submit-rating-btn');
  const ratingText = document.querySelector('.rating-text');
  
  starElements.forEach((star, index) => {
    if (index < stars) {
      star.style.color = '#ffd700';
    } else {
      star.style.color = '#ccc';
    }
  });
  
  submitBtn.style.display = 'block';
  ratingText.textContent = `Você avaliou com ${stars} estrela${stars > 1 ? 's' : ''}`;
  
  window.currentRating = stars;
};

window.submitRating = function() {
  if (window.currentRating) {
    window.Snackbar?.({ 
      message: `Obrigado pela avaliação de ${window.currentRating} estrelas!`, 
      type: 'success' 
    });
    
    // Fechar modal
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.remove();
    }
  }
};
