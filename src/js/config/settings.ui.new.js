// src/js/config/settings.ui.js

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
    const shared = (budgets || []).filter(b => b && (b.isOwner === false || (me && b.userId && b.userId !== me)));
    
    if (!shared.length) {
        return renderEmptyState('🤝', 'Nenhum orçamento compartilhado', 'Convites que você aceitar aparecerão aqui.');
    }

    return `
        <div class="space-y-4">
            ${shared.map(budget => `
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-bold text-lg text-gray-900 dark:text-gray-100">${budget.nome || 'Orçamento'}</p>
                                <p class="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/50 rounded-full px-2 py-0.5 inline-block mt-1">Compartilhado</p>
                            </div>
                            ${budget.id !== currentBudget?.id ? `
                                <button type="button" class="enter-budget-button u-btn u-btn--primary" data-budget-id="${budget.id}" data-budget-name="${(budget.nome || 'Orçamento').replace(/\"/g, '&quot;')}" title="Entrar neste orçamento">
                                    <span class="enter-icon">🚪</span><span class="enter-text">Entrar</span>
                                </button>
                            ` : `
                                <div class="current-budget-badge"><span class="current-icon">✅</span><span class="current-text">Ativo</span></div>
                            `}
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-3 truncate">ID: ${budget.id}</p>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex justify-end items-center gap-2">
                        <button class="u-btn u-btn--ghost text-sm copy-budget-id-btn" data-budget-id="${budget.id}" title="Copiar ID do orçamento">📋 Copiar ID</button>
                        <button class="u-btn u-btn--danger text-sm leave-budget-btn" data-budget-id="${budget.id}" data-budget-name="${(budget.nome || 'Orçamento').replace(/"/g, '&quot;')}" title="Sair deste orçamento">🚪 Sair</button>
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
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-bold text-lg text-gray-900 dark:text-gray-100">${budget.nome}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Criado em ${budget.createdAt ? new Date(budget.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível'}</p>
                            </div>
                            ${budget.id !== currentBudget?.id ? `
                                <button type="button" class="enter-budget-button u-btn u-btn--primary" data-budget-id="${budget.id}" data-budget-name="${(budget.nome || 'Orçamento').replace(/"/g, '&quot;')}" title="Entrar neste orçamento">
                                    <span class="enter-icon">🚪</span><span class="enter-text">Entrar</span>
                                </button>
                            ` : `
                                <div class="current-budget-badge"><span class="current-icon">✅</span><span class="current-text">Ativo</span></div>
                            `}
                        </div>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex justify-end items-center gap-2">
                        <button class="u-btn u-btn--ghost text-sm copy-budget-id-btn" data-budget-id="${budget.id}" title="Copiar ID do orçamento">📋 Copiar ID</button>
                        <button class="u-btn u-btn--danger text-sm delete-budget-btn" data-budget-id="${budget.id}" data-budget-name="${(budget.nome || 'Orçamento').replace(/"/g, '&quot;')}" title="Excluir orçamento">🗑️ Excluir</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
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
        appVersion,
        hasNewChangelog,
        lastUpdateLabel,
        txChunkOverride,
        perfEnabled
    } = state;

    return `
    <div class="tab-container">
        <div class="tab-header">
            <h2 class="tab-title-highlight">⚙️ Configurações</h2>
            <div id="settings-period-indicator"></div>
        </div>
        <div class="tab-content">
            <div class="settings-container">
                <div class="content-spacing">
                    
                    <!-- Seção de Conta -->
                    ${currentUser ? `
                    <div class="mb-6">
                        <h2 class="section-title red-border">🔐 Conta</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                            <div class="min-w-0 mr-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400">Conectado como</div>
                                <div class="font-medium text-gray-900 dark:text-gray-100 truncate" title="${currentUser.email || ''}">${currentUser.email || 'Usuário'}</div>
                            </div>
                            <button id="btn-logout" class="u-btn u-btn--danger">Sair</button>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Seção de Orçamento Atual -->
                    ${currentBudget ? `
                    <div class="mb-8">
                        <h2 class="section-title green-border">📋 Orçamento Atual</h2>
                        <div class="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
                            <div class="flex items-center justify-between mb-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl">📋</div>
                                    <div>
                                        <h3 class="text-xl font-bold">${currentBudget.nome || 'Orçamento'}</h3>
                                        <p class="text-sm opacity-90">Orçamento Ativo</p>
                                    </div>
                                </div>
                                <button id="edit-budget-name-btn" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-xl">✏️</button>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white bg-opacity-15 p-4 rounded-xl"><div class="text-lg font-bold">${currentBudget.createdAt ? new Date(currentBudget.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : 'N/A'}</div><div class="text-sm opacity-90">Data de Criação</div></div>
                                <div class="bg-white bg-opacity-15 p-4 rounded-xl"><div class="text-lg font-bold">${usersWithAccess.length + 1}</div><div class="text-sm opacity-90">Usuários</div></div>
                                <div class="bg-white bg-opacity-15 p-4 rounded-xl"><div class="text-lg font-bold truncate" title="${ownerDisplay}">${ownerDisplay}</div><div class="text-sm opacity-90">Proprietário</div></div>
                            </div>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Seção de Usuários e Compartilhamento -->
                    <div class="mb-8">
                        <h2 class="section-title blue-border">👥 Usuários & Compartilhamento</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            ${usersWithAccess.length > 0 ? `
                                <div class="space-y-3">
                                    ${usersWithAccess.map(user => `
                                        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div class="flex items-center gap-3">
                                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                    ${user.email?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <div class="font-medium text-gray-900 dark:text-gray-100">${user.email || 'Usuário'}</div>
                                                    <div class="text-xs text-gray-500 dark:text-gray-400">Membro</div>
                                                </div>
                                            </div>
                                            <button class="remove-user-btn u-btn u-btn--danger text-sm" data-uid="${user.uid}" data-email="${user.email}" title="Remover usuário">
                                                🗑️ Remover
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="text-center py-8">
                                    <div class="text-4xl mb-3">👥</div>
                                    <div class="text-gray-500 dark:text-gray-400">Nenhum usuário compartilhado</div>
                                    <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Compartilhe seu orçamento para colaborar</div>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Seção de Convites Pendentes -->
                    ${sentInvitations.length > 0 ? `
                    <div class="mb-8">
                        <h2 class="section-title orange-border">📤 Convites Pendentes</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-3">
                                ${sentInvitations.map(invite => `
                                    <div class="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                                        <div class="flex items-center gap-3">
                                            <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                📤
                                            </div>
                                            <div>
                                                <div class="font-medium text-gray-900 dark:text-gray-100">${invite.email}</div>
                                                <div class="text-xs text-orange-600 dark:text-orange-400">Enviado em ${new Date(invite.sentAt?.seconds * 1000).toLocaleDateString('pt-BR')}</div>
                                            </div>
                                        </div>
                                        <div class="flex gap-2">
                                            <button class="cancel-invitation-btn u-btn u-btn--ghost text-sm" data-invite-id="${invite.id}" title="Cancelar convite">
                                                ❌ Cancelar
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Seção de Convites Recebidos -->
                    <div class="mb-8">
                        <h2 class="section-title purple-border">📬 Convites Recebidos</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            ${pendingInvitations.length > 0 ? `
                                <div class="space-y-3">
                                    ${pendingInvitations.map(invite => `
                                        <div class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                            <div class="flex items-center gap-3">
                                                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                    📬
                                                </div>
                                                <div>
                                                    <div class="font-medium text-gray-900 dark:text-gray-100">${invite.budgetName}</div>
                                                    <div class="text-xs text-purple-600 dark:text-purple-400">Convite de ${invite.ownerEmail}</div>
                                                </div>
                                            </div>
                                            <div class="flex gap-2">
                                                <button class="accept-invitation-btn u-btn u-btn--primary text-sm" data-invite-id="${invite.id}" title="Aceitar convite">
                                                    ✅ Aceitar
                                                </button>
                                                <button class="decline-invitation-btn u-btn u-btn--danger text-sm" data-invite-id="${invite.id}" title="Recusar convite">
                                                    ❌ Recusar
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="text-center py-8">
                                    <div class="text-4xl mb-3">📬</div>
                                    <div class="text-gray-500 dark:text-gray-400">Nenhum convite pendente</div>
                                    <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Novos convites aparecerão aqui</div>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Seção de Orçamentos Compartilhados -->
                    <div class="mb-8">
                        <h2 class="section-title blue-border">🤝 Orçamentos Compartilhados com Você</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            ${renderSharedWithMe(budgets, currentUser, currentBudget)}
                        </div>
                    </div>

                    <!-- Seção de Compartilhar Orçamento -->
                    <div class="mb-8">
                        <h2 class="section-title green-border">🔗 Compartilhar Orçamento</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            ${currentBudget ? `
                                <div class="space-y-4">
                                    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="text-blue-600 dark:text-blue-400">💡</span>
                                            <span class="font-medium text-blue-800 dark:text-blue-200">Como funciona</span>
                                        </div>
                                        <p class="text-sm text-blue-700 dark:text-blue-300">
                                            Digite o email do usuário que deseja convidar. Ele receberá um convite para colaborar no seu orçamento.
                                        </p>
                                    </div>
                                    <div class="flex gap-3">
                                        <input type="email" id="share-email-input" placeholder="email@exemplo.com" 
                                               class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <button id="share-budget-btn" class="u-btn u-btn--primary">
                                            📤 Enviar Convite
                                        </button>
                                    </div>
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
                    <div class="mb-8">
                        <h2 class="section-title blue-border">📁 Meus Orçamentos</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            ${renderMyBudgets(budgets, currentUser, currentBudget)}
                            <button id="create-new-budget-btn" class="create-button u-btn u-btn--primary mt-5 w-full">➕ Criar Novo Orçamento</button>
                        </div>
                    </div>

                    <!-- Seção de Dados e Privacidade -->
                    <div class="mb-8">
                        <h2 class="section-title red-border">💾 Dados e Privacidade</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button id="export-data-btn" class="u-btn u-btn--primary flex items-center justify-center gap-2 p-4">
                                    <span class="text-xl">📤</span>
                                    <div class="text-left">
                                        <div class="font-medium">Exportar Dados</div>
                                        <div class="text-xs opacity-75">Backup completo</div>
                                    </div>
                                </button>
                                <button id="import-data-btn" class="u-btn u-btn--secondary flex items-center justify-center gap-2 p-4">
                                    <span class="text-xl">📥</span>
                                    <div class="text-left">
                                        <div class="font-medium">Importar Dados</div>
                                        <div class="text-xs opacity-75">Restaurar backup</div>
                                    </div>
                                </button>
                                <button id="clear-data-btn" class="u-btn u-btn--danger flex items-center justify-center gap-2 p-4">
                                    <span class="text-xl">🗑️</span>
                                    <div class="text-left">
                                        <div class="font-medium">Limpar Dados</div>
                                        <div class="text-xs opacity-75">Remover tudo</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Notificações -->
                    <div class="mb-8">
                        <h2 class="section-title orange-border">🔔 Notificações</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Alertas de Limite</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Notificar quando categoria exceder 70%</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="limit-alerts-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Lembretes de Recorrentes</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Lembrar despesas recorrentes</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="recurring-reminders-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Resumo Semanal</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Relatório semanal das finanças</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="weekly-summary-toggle">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Interface -->
                    <div class="mb-8">
                        <h2 class="section-title green-border">🎨 Interface</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Modo Escuro</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Alternar tema escuro/claro</div>
                                    </div>
                                    <button id="toggle-theme-btn" class="u-btn u-btn--primary">
                                        🌙 Alternar
                                    </button>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Interface Compacta</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar mais informações</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="compact-mode-toggle">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Animações</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Ativar/desativar animações</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="animations-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Privacidade e Segurança -->
                    <div class="mb-8">
                        <h2 class="section-title purple-border">🔒 Privacidade e Segurança</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Autenticação Biométrica</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Impressão digital/Face ID</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="biometric-auth-toggle">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Sincronização Automática</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Sincronizar dados</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="auto-sync-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Analytics</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Compartilhar dados de uso</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="analytics-toggle">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Informações e Suporte -->
                    <div class="mb-8">
                        <h2 class="section-title blue-border">ℹ️ Informações e Suporte</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="text-center py-4">
                                    <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Financeiro App</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">Versão ${appVersion}</div>
                                    <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">Última atualização: ${lastUpdateLabel}</div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <button id="check-updates-btn" class="u-btn u-btn--primary flex items-center justify-center gap-2 p-3">
                                        <span>🔄</span>
                                        <span>Verificar Atualizações</span>
                                    </button>
                                    <button id="help-support-btn" class="u-btn u-btn--secondary flex items-center justify-center gap-2 p-3">
                                        <span>❓</span>
                                        <span>Ajuda e Suporte</span>
                                    </button>
                                    <button id="rate-app-btn" class="u-btn u-btn--primary flex items-center justify-center gap-2 p-3">
                                        <span>⭐</span>
                                        <span>Avaliar App</span>
                                    </button>
                                    <button id="about-app-btn" class="u-btn u-btn--ghost flex items-center justify-center gap-2 p-3">
                                        <span>ℹ️</span>
                                        <span>Sobre o App</span>
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
