
// Controle global de animações
function setAnimationsEnabled(enabled) {
  if (enabled) {
    document.body.classList.remove('no-animations');
    localStorage.setItem('animationsEnabled', '1');
  } else {
    document.body.classList.add('no-animations');
    localStorage.setItem('animationsEnabled', '0');
  }
}

// Restaurar estado ao carregar
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('animationsEnabled');
  const enabled = saved === null ? true : saved === '1';
  setAnimationsEnabled(enabled);
  const toggle = document.getElementById('animations-toggle');
  if (toggle) {
    toggle.checked = enabled;
    toggle.addEventListener('change', (e) => {
      setAnimationsEnabled(e.target.checked);
    });
  }
});

function renderEmptyState(icon, title, description) {
  return `
    <div class="empty-state">
        <div class="empty-icon">${icon}</div>
        <div class="empty-text">${title}</div>
        <div class="empty-description">${description}</div>
    </div>
    `;
}

function renderSharedWithMe(budgets, currentUser, currentBudget) {
  const me = currentUser?.uid;
  console.log('[DEBUG] renderSharedWithMe - budgets:', budgets);
  console.log('[DEBUG] renderSharedWithMe - currentUser:', currentUser);
  console.log('[DEBUG] renderSharedWithMe - me (uid):', me);

  const shared = (budgets || []).filter(b => {
    const isShared = b && (b.isOwner === false || (me && b.userId && b.userId !== me));
    console.log('[DEBUG] Orçamento:', b.nome, 'isOwner:', b.isOwner, 'userId:', b.userId, 'me:', me, 'isShared:', isShared);
    return isShared;
  });

  console.log('[DEBUG] Orçamentos compartilhados filtrados:', shared);

  if (!shared.length) {
    return renderEmptyState('🤝', 'Nenhum orçamento compartilhado', 'Convites que você aceitar aparecerão aqui.');
  }
  return `
        <div class="space-y-4">
            ${shared.map(budget => `
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-start gap-4">
                            <div>
                                <p class="font-bold text-lg text-gray-900 dark:text-gray-100">${budget.nome || 'Orçamento'}</p>
                                <p class="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/50 rounded-full px-2 py-0.5 inline-block mt-1">Compartilhado</p>
                            </div>
                            ${budget.id !== currentBudget?.id ? `
                                <button type="button" class="enter-budget-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" data-budget-id="${budget.id}" data-budget-name="${(budget.nome || 'Orçamento').replace(/\"/g, '&quot;')}" title="Entrar neste orçamento">
                                    <span class="enter-icon">🚪</span><span class="enter-text">Entrar</span>
                                </button>
                            ` : `
                                <div class="current-budget-badge"><span class="current-icon">✅</span><span class="current-text">Ativo</span></div>
                            `}
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-3 truncate">ID: ${budget.id}</p>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex justify-end items-center gap-2">
                        <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200 copy-budget-id-btn" data-budget-id="${budget.id}" title="Copiar ID do orçamento">📋 Copiar ID</button>
                        <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 border border-orange-200 dark:border-orange-800 transition-all duration-200 leave-budget-btn" data-budget-id="${budget.id}" data-budget-name="${(budget.nome || 'Orçamento').replace(/"/g, '&quot;')}" title="Sair deste orçamento">🚪 Sair</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderMyBudgets(budgets, currentUser, currentBudget) {
  const me = currentUser?.uid;
  const owned = (budgets || []).filter(b => b && (b.isOwner !== false) && (!me || b.userId === me));
  if (!owned.length) {
    return renderEmptyState('🗂️', 'Nenhum orçamento próprio', 'Crie um novo orçamento para começar.');
  }
  return `
        <div class="space-y-4">
            ${owned.map(budget => `
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border ${budget.id === currentBudget?.id ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'} overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-start gap-4">
                            <div>
                                <p class="font-bold text-lg text-gray-900 dark:text-gray-100">${budget.nome}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Criado em ${budget.createdAt ? new Date(budget.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível'}</p>
                            </div>
                            ${budget.id !== currentBudget?.id ? `
                                <button type="button" class="enter-budget-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" data-budget-id="${budget.id}" data-budget-name="${(budget.nome || 'Orçamento').replace(/"/g, '&quot;')}" title="Entrar neste orçamento">
                                    <span class="enter-icon">🚪</span><span class="enter-text">Entrar</span>
                                </button>
                            ` : `
                                <div class="current-budget-badge"><span class="current-icon">✅</span><span class="current-text">Ativo</span></div>
                            `}
                        </div>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex justify-end items-center gap-2">
                        <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200 copy-budget-id-btn" data-budget-id="${budget.id}" title="Copiar ID do orçamento">📋 Copiar ID</button>
                        <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200 delete-budget-btn" data-budget-id="${budget.id}" data-budget-name="${(budget.nome || 'Orçamento').replace(/"/g, '&quot;')}" title="Excluir orçamento">🗑️ Excluir</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderUsersWithAccess(usersWithAccess) {
  if (!usersWithAccess || usersWithAccess.length === 0) {
    return `
        <div class="text-center py-8">
            <div class="text-4xl mb-3">👥</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum usuário compartilhado</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Compartilhe seu orçamento para colaborar</div>
        </div>
        `;
  }
  return `
    <div class="space-y-3">
        ${usersWithAccess.map(user => `
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2 md:mb-0 gap-4">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        ${user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                        <div class="min-w-0 flex-1">
                            <div class="font-medium text-gray-900 dark:text-gray-100 truncate text-sm">${user.email || 'Usuário'}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Membro</div>
                    </div>
                </div>
                    <div class="flex-shrink-0 ml-2">
                        <button class="remove-user-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200" data-uid="${user.uid}" data-email="${user.email}" title="Remover usuário">
                            <span class="hidden sm:inline">🗑️ Remover</span>
                            <span class="sm:hidden">🗑️</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
    `;
}

function renderSentInvitations(sentInvitations) {
  if (!sentInvitations || sentInvitations.length === 0) {
    return `
        <div class="text-center py-8">
            <div class="text-4xl mb-3">📤</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum convite pendente</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Convites enviados aparecerão aqui</div>
        </div>`;
  }
  return `
    <div class="space-y-3">
        ${sentInvitations.map(invite => `
            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 p-3" data-invite-id="${invite.id}">
                <div class="flex items-center justify-between mb-2 md:mb-0 gap-4">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">📤</div>
                        <div class="min-w-0 flex-1">
                            <div class="font-medium text-gray-900 dark:text-gray-100 truncate text-sm">${invite.invitedUserEmail || invite.email || 'Email não disponível'}</div>
                        <div class="text-xs text-orange-600 dark:text-orange-400">Enviado em ${invite.sentAt ? new Date(invite.sentAt.seconds * 1000).toLocaleDateString('pt-BR') : '—'}</div>
                    </div>
                </div>
                    <div class="flex-shrink-0 ml-2">
                        <button class="cancel-invitation-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200" data-invite-id="${invite.id}" title="Cancelar convite">
                            <span class="hidden sm:inline">❌ Cancelar</span>
                            <span class="sm:hidden">❌</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>`;
}

function renderPendingInvitations(pendingInvitations) {
  if (!pendingInvitations || pendingInvitations.length === 0) {
    return `
        <div class="text-center py-8">
            <div class="text-4xl mb-3">📬</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum convite pendente</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Novos convites aparecerão aqui</div>
        </div>`;
  }
  return `
    <div class="space-y-3">
        ${pendingInvitations.map(invite => `
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-3" data-invite-id="${invite.id}" data-budget-id="${invite.budgetId}">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">📬</div>
                    <div class="min-w-0 flex-1">
                        <div class="font-medium text-gray-900 dark:text-gray-100 truncate text-sm">${invite.budgetName}</div>
                        <div class="text-xs text-purple-600 dark:text-purple-400 truncate">Convite de ${invite.ownerEmail}</div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="accept-invitation-btn inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800 transition-all duration-200 flex-1" data-invite-id="${invite.id}" title="Aceitar convite">
                        ✅ Aceitar
                    </button>
                    <button class="decline-invitation-btn inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200 flex-1" data-invite-id="${invite.id}" title="Recusar convite">
                        ❌ Recusar
                    </button>
                </div>
            </div>
        `).join('')}
    </div>`;
}

export function generateSettingsHTML(state) {
  const {
    currentUser,
    currentBudget,
    budgets,
    usersWithAccess,
    ownerDisplay,
    pendingInvitations,
    sentInvitations,
    appVersion: _appVersion
  } = state;

  return `
    <div class="tab-container">
        <div class="tab-header">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between w-full gap-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">⚙️</span>
                </div>
                <div>
                  <h1 class="text-2xl font-semibold text-gray-900 leading-tight">Configurações</h1>
                  <div class="flex items-center gap-1">
                    <span class="text-gray-600 dark:text-gray-400 text-xs">${currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuário'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <!-- Status de Conexão -->
              <div class="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span class="text-green-700 dark:text-green-300">Online</span>
              </div>
              <!-- Toggle de Tema Rápido -->
              <button class="theme-toggle-btn btn btn-ghost btn-sm" title="Alternar tema">
                <span class="text-sm">${document.documentElement.classList.contains('dark') ? '☀️' : '🌙'}</span>
              </button>
            </div>
          </div>
        </div>
        </div>
        <div class="tab-content">
            <div class="settings-container">
                <div class="content-spacing">
                    
                    <!-- ========== SEÇÃO 1: RESUMO COMPACTO ========== -->
                    <div class="mb-12">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">⚙️ Resumo</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl shadow-lg border border-blue-200 dark:border-gray-600 p-2">
                            <!-- Header Ultra Compacto em linha única -->
                            <div class="flex items-center justify-between mb-2 gap-4">
                                <div class="flex items-center gap-1">
                                    <span class="text-base">⚙️</span>
                                    <h3 class="text-sm font-bold text-gray-800 dark:text-gray-200">Configurações do Sistema</h3>
                                </div>
                                <div class="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                    <span>${currentBudget?.nome || 'Orçamento Principal'}</span>
                                </div>
                            </div>

                            <!-- Grid Ultra Compacto 2x2 -->
                            <div class="grid grid-cols-2 gap-1">
                                <!-- Usuário Atual -->
                                <div class="bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                                    <div class="flex items-center justify-between gap-4">
                                        <div class="flex items-center gap-1">
                                            <span class="text-sm">👤</span>
                                            <span class="text-xs font-medium text-gray-800 dark:text-gray-200">${currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuário'}</span>
                                        </div>
                                        <span class="text-xs text-green-600 dark:text-green-400 font-bold">Ativo</span>
                                    </div>
                                </div>
                                
                                <!-- Total de Usuários -->
                                <div class="bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                                    <div class="flex items-center justify-between gap-4">
                                        <div class="flex items-center gap-1">
                                            <span class="text-sm">👥</span>
                                            <span class="text-xs font-medium text-gray-800 dark:text-gray-200">${usersWithAccess.length + 1}</span>
                                        </div>
                                        <span class="text-xs text-blue-600 dark:text-blue-400">Usuários</span>
                                    </div>
                                </div>
                                
                                <!-- Proprietário -->
                                <div class="bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                                    <div class="flex flex-col gap-1">
                                        <div class="flex items-center gap-1">
                                            <span class="text-sm">👑</span>
                                            <span class="text-xs font-medium text-gray-800 dark:text-gray-200">Proprietário</span>
                                        </div>
                                        <div class="text-xs text-purple-600 dark:text-purple-400 truncate" title="${ownerDisplay}">
                                            ${ownerDisplay.split('@')[0] || ownerDisplay}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Data de Criação -->
                                <div class="bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                                    <div class="flex items-center justify-between gap-4">
                                        <div class="flex items-center gap-1">
                                            <span class="text-sm">📅</span>
                                            <span class="text-xs font-medium text-gray-800 dark:text-gray-200">Criado</span>
                                        </div>
                                        <span class="text-xs text-gray-600 dark:text-gray-400">${currentBudget?.createdAt ? new Date(currentBudget.createdAt.seconds * 1000).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'}) : 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 2: CONTA E SEGURANÇA ========== -->
                    <div class="mb-12">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔐 Conta & Segurança</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4 gap-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">🔐</span>
                                        Gerenciar Conta
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Configurações de segurança e autenticação</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-green-600 dark:text-green-400">
                                        ${currentUser ? 'Conectado' : 'Desconectado'}
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Status</p>
                                </div>
                            </div>
                            
                            <!-- Conta do Usuário -->
                    ${currentUser ? `
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <div class="flex items-center justify-between">
                                    <div class="min-w-0 flex-1">
                                <div class="text-sm text-gray-600 dark:text-gray-400">Conectado como</div>
                                <div class="font-medium text-gray-900 dark:text-gray-100 truncate" title="${currentUser.email || ''}">${currentUser.email || 'Usuário'}</div>
                            </div>
                                    <button id="btn-logout" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200" title="Sair da conta">Sair</button>
                        </div>
                    </div>
                    ` : ''}

                            <!-- Configurações de Segurança -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>🛡️</span>
                                    Segurança
                                </h5>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between gap-4">
                                    <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Autenticação Biométrica</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Impressão digital/Face ID</div>
                                    </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="biometric-auth-toggle">
                                            <span class="toggle-slider"></span>
                                        </label>
                                </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Sincronização Automática</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Sincronizar dados</div>
                            </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="auto-sync-toggle" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                            </div>
                                    <div class="flex items-center justify-between gap-4">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Analytics</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Compartilhar dados de uso</div>
                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="analytics-toggle">
                                            <span class="toggle-slider"></span>
                                        </label>
                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 3: COMPARTILHAMENTO ========== -->
                    <div class="mb-12">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">👥 Compartilhamento</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4 gap-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">👥</span>
                                        Gerenciar Compartilhamento
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Usuários, convites e orçamentos compartilhados</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        ${usersWithAccess.length + (sentInvitations?.length || 0) + (pendingInvitations?.length || 0)}
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Total</p>
                        </div>
                    </div>

                            <!-- Usuários com Acesso -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>👥</span>
                                    Usuários com Acesso
                                </h5>
                                ${renderUsersWithAccess(usersWithAccess)}
                            </div>

                            <!-- Convites Enviados -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>📤</span>
                                    Convites Enviados
                                </h5>
                        ${renderSentInvitations(sentInvitations)}
                    </div>

                            <!-- Convites Recebidos -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>📬</span>
                                    Convites Recebidos
                                </h5>
                        ${renderPendingInvitations(pendingInvitations)}
                    </div>

                            <!-- Orçamentos Compartilhados -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>🤝</span>
                                    Orçamentos Compartilhados
                                </h5>
                        ${renderSharedWithMe(budgets, currentUser, currentBudget)}
                    </div>

                            <!-- Compartilhar Orçamento -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>🔗</span>
                                    Compartilhar Orçamento
                                </h5>
                            ${currentBudget ? `
                                    <div class="space-y-3">
                                        <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="text-blue-600 dark:text-blue-400">💡</span>
                                            <span class="font-medium text-blue-800 dark:text-blue-200">Como funciona</span>
                                        </div>
                                            <p class="text-xs text-blue-700 dark:text-blue-300">
                                            Digite o email do usuário que deseja convidar. Ele receberá um convite para colaborar no seu orçamento.
                                        </p>
                                    </div>
                                        <form id="share-budget-form" class="space-y-3" autocomplete="off" novalidate>
                                                                            <input type="email" id="share-email-input" name="email" placeholder="email@exemplo.com" 
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" required>
                                            <button id="share-budget-btn" type="submit" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 border border-orange-200 dark:border-orange-800 transition-all duration-200" data-loading-text="Enviando...">
                                                <span class="hidden sm:inline">📤 Enviar Convite</span>
                                                <span class="sm:hidden">📤 Enviar</span>
                                                                            </button>
                                                                        </form>
                                </div>
                            ` : `
                                <div class="text-center py-8">
                                    <div class="text-4xl mb-3">🔗</div>
                                    <div class="text-gray-500 dark:text-gray-400">Nenhum orçamento selecionado</div>
                                    <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Selecione um orçamento para compartilhar</div>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Seção de Gerenciar Orçamentos -->
                    <div class="mb-12">
                        <h2 class="section-title blue-border">📁 Meus Orçamentos</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                        ${renderMyBudgets(budgets, currentUser, currentBudget)}
                        <button id="create-new-budget-btn" class="create-button inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200 mt-5 w-full" title="Criar novo orçamento">➕ Criar Novo Orçamento</button>
                        
                        <!-- TESTE: Botão para testar notificações -->
                        <button id="test-notifications-btn" class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200 mt-3 w-full" title="Testar notificações">🧪 Testar Notificações</button>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 3: DADOS E PRIVACIDADE ========== -->
                    <div class="mb-12">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💾 Dados e Privacidade</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4 gap-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">💾</span>
                                        Gerenciar Dados
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Backup, importação e limpeza de dados</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-red-600 dark:text-red-400">3</div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Ações</p>
                                </div>
                            </div>
                            
                            <!-- Ações de Dados -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>💾</span>
                                    Ações de Dados
                                </h5>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                    <button id="export-data-btn" class="inline-flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" title="Exportar dados">
                                        <span class="text-lg md:text-2xl">📤</span>
                                    <div class="text-left">
                                            <div class="font-semibold text-sm md:text-base">
                                                <span class="hidden sm:inline">Exportar Dados</span>
                                                <span class="sm:hidden">Exportar</span>
                                            </div>
                                            <div class="text-xs opacity-75">
                                                <span class="hidden sm:inline">Backup completo</span>
                                                <span class="sm:hidden">Backup</span>
                                            </div>
                                    </div>
                                </button>
                                    <button id="import-data-btn" class="inline-flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg text-sm font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800 transition-all duration-200" title="Importar dados">
                                        <span class="text-lg md:text-2xl">📥</span>
                                    <div class="text-left">
                                            <div class="font-semibold text-sm md:text-base">
                                                <span class="hidden sm:inline">Importar Dados</span>
                                                <span class="sm:hidden">Importar</span>
                                            </div>
                                            <div class="text-xs opacity-75">
                                                <span class="hidden sm:inline">Restaurar backup</span>
                                                <span class="sm:hidden">Restaurar</span>
                                            </div>
                                    </div>
                                </button>
                                    <button id="clear-data-btn" class="inline-flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200" title="Limpar dados">
                                        <span class="text-lg md:text-2xl">🗑️</span>
                                    <div class="text-left">
                                            <div class="font-semibold text-sm md:text-base">
                                                <span class="hidden sm:inline">Limpar Dados</span>
                                                <span class="sm:hidden">Limpar</span>
                                            </div>
                                            <div class="text-xs opacity-75">
                                                <span class="hidden sm:inline">Remover tudo</span>
                                                <span class="sm:hidden">Remover</span>
                                            </div>
                                    </div>
                                </button>
                            </div>
                                
                                <!-- Informações de Segurança -->
                                <div class="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-yellow-600 dark:text-yellow-400">⚠️</span>
                                        <span class="font-medium text-yellow-800 dark:text-yellow-200">Importante</span>
                                    </div>
                                    <p class="text-xs text-yellow-700 dark:text-yellow-300">
                                        • <strong>Exportar:</strong> Cria backup de todos os seus dados<br>
                                        • <strong>Importar:</strong> Restaura dados de um arquivo de backup<br>
                                        • <strong>Limpar:</strong> Remove permanentemente todos os dados (irreversível)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 4: NOTIFICAÇÕES ========== -->
                    <div class="mb-12">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔔 Notificações</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4 gap-4">
                                    <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">🔔</span>
                                        Configurações de Notificações
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Alertas, lembretes e toasts</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-orange-600 dark:text-orange-400">3</div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Tipos</p>
                                </div>
                            </div>
                            
                            <!-- Notificações do Sistema -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>🔔</span>
                                    Notificações do Sistema
                                </h5>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between gap-4">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Alertas de Limite</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Notificar quando categoria exceder 70%</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="limit-alerts-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                    <div class="flex items-center justify-between gap-4">
                                    <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Lembretes de Recorrentes</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Lembrar despesas recorrentes</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="recurring-reminders-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                    <div class="flex items-center justify-between gap-4">
                                    <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Resumo Semanal</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Relatório semanal das finanças</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="weekly-summary-toggle">
                                        <span class="toggle-slider"></span>
                                    </label>
                            </div>
                        </div>
                    </div>

                            <!-- Configurações de Toast -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>🔔</span>
                                    Toasts (Snackbar)
                                </h5>
                                <div class="space-y-3">
                                <div class="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-yellow-600 dark:text-yellow-400">🔔</span>
                                        <span class="font-medium text-yellow-800 dark:text-yellow-200">Ajuste posição, duração, fila e anti-spam</span>
                                    </div>
                                </div>
                                    <div class="grid grid-cols-2 gap-3">
                                    <div>
                                            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Duração (ms)</label>
                                            <input type="number" id="toast-duration" value="500" class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    </div>
                                    <div>
                                            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Distância (px)</label>
                                            <input type="number" id="toast-offset" value="80" class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    </div>
                                    <div>
                                            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Posição</label>
                                            <select id="toast-position" class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                            <option value="bottom">Inferior</option>
                                            <option value="top">Superior</option>
                                        </select>
                                    </div>
                                    <div>
                                            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Alinhamento</label>
                                            <select id="toast-align" class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                            <option value="center">Centro</option>
                                            <option value="left">Esquerda</option>
                                            <option value="right">Direita</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div class="flex items-center justify-between gap-4">
                                    <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Pausar no hover</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Pausar toast quando mouse passar por cima</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="toast-hover-pause" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                    <div class="flex gap-2">
                                        <button id="apply-toast-settings" class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200 flex-1" title="Aplicar configurações">Aplicar</button>
                                        <button id="reset-toast-settings" class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200 flex-1" title="Resetar configurações">Reset</button>
                                        <button id="test-toast" class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800 transition-all duration-200 flex-1" title="Testar notificação">Testar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 5: APARÊNCIA ========== -->
                    <div class="mb-12">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🎨 Aparência</h2>
                                    </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4 gap-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">🎨</span>
                                        Personalizar Aparência
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Tema, cores e interface</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-purple-600 dark:text-purple-400">4</div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Opções</p>
                        </div>
                    </div>

                            <!-- Modo Escuro -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>🌙</span>
                                    Modo Escuro
                                </h5>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Alternar tema</div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Tema claro/escuro</div>
                                    </div>
                                    <button id="toggle-theme-btn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800 transition-all duration-200" title="Alternar tema">
                                        🌙 Alternar
                                    </button>
                        </div>
                    </div>

                            <!-- Tema de Cores -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>🎨</span>
                                    Tema de Cores
                                </h5>
                                <div class="flex justify-center gap-3">
                                    <button class="color-theme-btn w-10 h-10 rounded-full border-2 border-blue-500 bg-blue-500 hover:scale-110 transition-transform" data-theme="blue" title="Tema Azul"></button>
                                    <button class="color-theme-btn w-10 h-10 rounded-full border-2 border-gray-300 bg-green-500 hover:scale-110 transition-transform" data-theme="green" title="Tema Verde"></button>
                                    <button class="color-theme-btn w-10 h-10 rounded-full border-2 border-gray-300 bg-purple-500 hover:scale-110 transition-transform" data-theme="purple" title="Tema Roxo"></button>
                                    <button class="color-theme-btn w-10 h-10 rounded-full border-2 border-gray-300 bg-orange-500 hover:scale-110 transition-transform" data-theme="orange" title="Tema Laranja"></button>
                                    </div>
                                </div>

                            <!-- Modo Compacto -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>📐</span>
                                    Modo Compacto
                                </h5>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between gap-4">
                                    <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Ativar modo compacto</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Reduzir espaçamentos e tamanhos</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="compact-mode-toggle">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                    <div class="flex gap-2">
                                        <button class="compact-size-btn inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" data-size="micro" title="Modo Micro">Micro</button>
                                        <button class="compact-size-btn inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200" data-size="nano" title="Modo Nano">Nano</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 6: SISTEMA ========== -->
                    <div class="mb-12">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">⚙️ Sistema</h2>
                                    </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4 gap-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">⚙️</span>
                                        Configurações do Sistema
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Performance, animações e otimizações</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-green-600 dark:text-green-400">3</div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Opções</p>
                                </div>
                                </div>
                            
                            <!-- Tamanho do Bloco de Dias -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>⚡</span>
                                    Performance
                                </h5>
                                <div class="space-y-3">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tamanho do bloco de dias</label>
                                        <input type="text" id="days-chunk-size" value="Automático" placeholder="Deixe em branco para automático" class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                            </div>
                                    <div class="flex gap-2">
                                        <button id="save-days-chunk" class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200 flex-1" title="Salvar configuração">Salvar</button>
                                        <button id="reset-days-chunk" class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200 flex-1" title="Resetar para padrão">Reset</button>
                        </div>
                    </div>
                                    </div>

                            <!-- Animações -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>✨</span>
                                    Animações
                                </h5>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Ativar animações</div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Mostrar animações e transições suaves</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="animations-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                        </div>
                    </div>

                            <!-- Telemetria -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>📊</span>
                                    Telemetria
                                </h5>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between gap-4">
                                    <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Ativar telemetria</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Coletar dados de performance localmente</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="performance-telemetry-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                    <button id="view-performance-events" class="btn btn-ghost btn-sm w-full">
                                        📊 Ver eventos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 7: INFORMAÇÕES E SUPORTE ========== -->
                    <div class="mb-12">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ℹ️ Informações & Suporte</h2>
                                    </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-3 md:p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-3 md:mb-4">
                                    <div>
                                    <h3 class="text-base md:text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-lg md:text-xl">ℹ️</span>
                                        <span class="hidden sm:inline">Sobre o App</span>
                                        <span class="sm:hidden">Info</span>
                                    </h3>
                                    <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                        <span class="hidden md:inline">Informações, suporte e atualizações</span>
                                        <span class="md:hidden">Suporte e atualizações</span>
                                    </p>
                                    </div>
                                <div class="text-right">
                                    <div class="text-sm md:text-lg font-bold text-gray-600 dark:text-gray-400">Sistema</div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Ativo</p>
                                </div>
                                    </div>
                            
                            <!-- Informações do Sistema -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-4 flex items-center gap-1">
                                    <span>📊</span>
                                    Informações do Sistema
                                </h5>
                                <div class="space-y-2 md:space-y-3">
                                    <!-- Linha 1: Versão e SW -->
                                    <div class="grid grid-cols-2 gap-2 md:gap-4">
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 md:p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">📱 App</div>
                                            <div class="font-bold text-xs md:text-sm text-gray-800 dark:text-gray-200">Servo Tech</div>
                                </div>
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 md:p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">⚙️ SW</div>
                                            <div class="font-bold text-xs md:text-sm text-gray-800 dark:text-gray-200">v4.57.0</div>
                        </div>
                    </div>

                                    <!-- Linha 2: Desenvolvedor e Tecnologias -->
                                    <div class="grid grid-cols-2 gap-2 md:gap-4">
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 md:p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">👨‍💻 Dev</div>
                                            <div class="font-bold text-xs md:text-sm text-gray-800 dark:text-gray-200">Igor Bispo</div>
                                        </div>
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 md:p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">🛠️ Tech</div>
                                            <div class="font-bold text-xs md:text-sm text-gray-800 dark:text-gray-200">
                                                <span class="hidden md:inline">Firebase, JS, PWA</span>
                                                <span class="md:hidden">Firebase+</span>
                                        </div>
                                        </div>
                                        </div>
                                    
                                    <!-- Linha 3: Atualização e Status -->
                                    <div class="grid grid-cols-2 gap-2 md:gap-4">
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 md:p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">📅 Update</div>
                                            <div class="font-bold text-xs md:text-sm text-gray-800 dark:text-gray-200">Out 2025</div>
                                        </div>
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 md:p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">🔧 Build</div>
                                            <div class="font-bold text-xs md:text-sm text-gray-800 dark:text-gray-200">v1.0.9</div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                            <!-- Ações Rápidas -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>⚡</span>
                                    Ações Rápidas
                                </h5>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                                    <button id="check-updates-btn" class="inline-flex items-center justify-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" title="Verificar atualizações">
                                        <span class="text-sm md:text-base">☁️⬇️</span>
                                        <span class="hidden sm:inline">Atualizações</span>
                                        <span class="sm:hidden">Update</span>
                                    </button>
                                    <button id="help-support-btn" class="inline-flex items-center justify-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800 transition-all duration-200" title="Ajuda e suporte">
                                        <span class="text-sm md:text-base">❓</span>
                                        <span>Suporte</span>
                                    </button>
                                    <button id="whats-new-btn" class="inline-flex items-center justify-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg text-xs font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800 transition-all duration-200" title="O que mudou">
                                        <span class="text-sm md:text-base">📄</span>
                                        <span class="hidden sm:inline">O que mudou</span>
                                        <span class="sm:hidden">Novidades</span>
                                    </button>
                                    <button id="copy-info-btn" class="inline-flex items-center justify-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/40 border border-gray-200 dark:border-gray-800 transition-all duration-200" title="Copiar informações">
                                        <span class="text-sm md:text-base">📋</span>
                                        <span class="hidden sm:inline">Copiar Info</span>
                                        <span class="sm:hidden">Copiar</span>
                                    </button>
                                    <button id="clear-cache-btn" class="inline-flex items-center justify-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200" title="Limpar cache">
                                        <span class="text-sm md:text-base">🗑️</span>
                                        <span class="hidden sm:inline">Limpar Cache</span>
                                        <span class="sm:hidden">Limpar</span>
                                    </button>
                                    <button id="install-app-btn" class="inline-flex items-center justify-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 transition-all duration-200" title="Instalar aplicativo">
                                        <span class="text-sm md:text-base">⬇️</span>
                                        <span>Instalar</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `;
}
