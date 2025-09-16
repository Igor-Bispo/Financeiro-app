const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-B-XVfQ8M.js","assets/main-Cn8BSRqe.css"])))=>i.map(i=>d[i]);
import{_ as m,e as c}from"./main-B-XVfQ8M.js";import{loadBudgetInvitations as y,loadSentBudgetInvitations as x,fetchUsersInfo as f,fetchUserInfo as h}from"./settings.service-CDNrmgA6.js";function b(r){r?(document.body.classList.remove("no-animations"),localStorage.setItem("animationsEnabled","1")):(document.body.classList.add("no-animations"),localStorage.setItem("animationsEnabled","0"))}document.addEventListener("DOMContentLoaded",()=>{const r=localStorage.getItem("animationsEnabled"),e=r===null?!0:r==="1";b(e);const s=document.getElementById("animations-toggle");s&&(s.checked=e,s.addEventListener("change",a=>{b(a.target.checked)}))});function u(r,e,s){return`
    <div class="empty-state">
        <div class="empty-icon">${r}</div>
        <div class="empty-text">${e}</div>
        <div class="empty-description">${s}</div>
    </div>
    `}function k(r,e,s){const a=e?.uid,d=(r||[]).filter(t=>t&&(t.isOwner===!1||a&&t.userId&&t.userId!==a));return d.length?`
        <div class="space-y-4">
            ${d.map(t=>`
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-bold text-lg text-gray-900 dark:text-gray-100">${t.nome||"Orçamento"}</p>
                                <p class="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/50 rounded-full px-2 py-0.5 inline-block mt-1">Compartilhado</p>
                            </div>
                            ${t.id!==s?.id?`
                                <button type="button" class="enter-budget-button u-btn u-btn--primary" data-budget-id="${t.id}" data-budget-name="${(t.nome||"Orçamento").replace(/\"/g,"&quot;")}" title="Entrar neste orçamento">
                                    <span class="enter-icon">🚪</span><span class="enter-text">Entrar</span>
                                </button>
                            `:`
                                <div class="current-budget-badge"><span class="current-icon">✅</span><span class="current-text">Ativo</span></div>
                            `}
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-3 truncate">ID: ${t.id}</p>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex justify-end items-center gap-2">
                        <button class="u-btn u-btn--ghost text-sm copy-budget-id-btn" data-budget-id="${t.id}" title="Copiar ID do orçamento">📋 Copiar ID</button>
                        <button class="u-btn u-btn--danger text-sm leave-budget-btn" data-budget-id="${t.id}" data-budget-name="${(t.nome||"Orçamento").replace(/"/g,"&quot;")}" title="Sair deste orçamento">🚪 Sair</button>
                    </div>
                </div>
            `).join("")}
        </div>
    `:u("🤝","Nenhum orçamento compartilhado","Convites que você aceitar aparecerão aqui.")}function w(r,e,s){const a=e?.uid,d=(r||[]).filter(t=>t&&t.isOwner!==!1&&(!a||t.userId===a));return d.length?`
        <div class="space-y-4">
            ${d.map(t=>`
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border ${t.id===s?.id?"border-blue-500":"border-gray-200 dark:border-gray-700"} overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-bold text-lg text-gray-900 dark:text-gray-100">${t.nome}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Criado em ${t.createdAt?new Date(t.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}</p>
                            </div>
                            ${t.id!==s?.id?`
                                <button type="button" class="enter-budget-button u-btn u-btn--primary" data-budget-id="${t.id}" data-budget-name="${(t.nome||"Orçamento").replace(/"/g,"&quot;")}" title="Entrar neste orçamento">
                                    <span class="enter-icon">🚪</span><span class="enter-text">Entrar</span>
                                </button>
                            `:`
                                <div class="current-budget-badge"><span class="current-icon">✅</span><span class="current-text">Ativo</span></div>
                            `}
                        </div>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800/50 px-5 py-3 flex justify-end items-center gap-2">
                        <button class="u-btn u-btn--ghost text-sm copy-budget-id-btn" data-budget-id="${t.id}" title="Copiar ID do orçamento">📋 Copiar ID</button>
                        <button class="u-btn u-btn--danger text-sm delete-budget-btn" data-budget-id="${t.id}" data-budget-name="${(t.nome||"Orçamento").replace(/"/g,"&quot;")}" title="Excluir orçamento">🗑️ Excluir</button>
                    </div>
                </div>
            `).join("")}
        </div>
    `:u("🗂️","Nenhum orçamento próprio","Crie um novo orçamento para começar.")}function S(r){return!r||r.length===0?`
        <div class="text-center py-8">
            <div class="text-4xl mb-3">👥</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum usuário compartilhado</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Compartilhe seu orçamento para colaborar</div>
        </div>
        `:`
    <div class="space-y-3">
        ${r.map(e=>`
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        ${e.email?.charAt(0).toUpperCase()||"U"}
                    </div>
                    <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">${e.email||"Usuário"}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Membro</div>
                    </div>
                </div>
                <button class="remove-user-btn u-btn u-btn--danger text-sm" data-uid="${e.uid}" data-email="${e.email}" title="Remover usuário">🗑️ Remover</button>
            </div>
        `).join("")}
    </div>
    `}function $(r){return!r||r.length===0?`
        <div class="text-center py-8">
            <div class="text-4xl mb-3">📤</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum convite pendente</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Convites enviados aparecerão aqui</div>
        </div>`:`
    <div class="space-y-3">
        ${r.map(e=>`
            <div class="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800" data-invite-id="${e.id}">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">📤</div>
                    <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">${e.email}</div>
                        <div class="text-xs text-orange-600 dark:text-orange-400">Enviado em ${e.sentAt?new Date(e.sentAt.seconds*1e3).toLocaleDateString("pt-BR"):"—"}</div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="cancel-invitation-btn u-btn u-btn--ghost text-sm" data-invite-id="${e.id}" title="Cancelar convite">❌ Cancelar</button>
                </div>
            </div>
        `).join("")}
    </div>`}function j(r){return!r||r.length===0?`
        <div class="text-center py-8">
            <div class="text-4xl mb-3">📬</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum convite pendente</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Novos convites aparecerão aqui</div>
        </div>`:`
    <div class="space-y-3">
        ${r.map(e=>`
            <div class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800" data-invite-id="${e.id}" data-budget-id="${e.budgetId}">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">📬</div>
                    <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">${e.budgetName}</div>
                        <div class="text-xs text-purple-600 dark:text-purple-400">Convite de ${e.ownerEmail}</div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="accept-invitation-btn u-btn u-btn--primary text-sm" data-invite-id="${e.id}" title="Aceitar convite">✅ Aceitar</button>
                    <button class="decline-invitation-btn u-btn u-btn--danger text-sm" data-invite-id="${e.id}" title="Recusar convite">❌ Recusar</button>
                </div>
            </div>
        `).join("")}
    </div>`}function C(r){const{currentUser:e,currentBudget:s,budgets:a,usersWithAccess:d,ownerDisplay:t,pendingInvitations:o,sentInvitations:l,appVersion:n}=r;return`
    <div class="tab-container">
        <div class="tab-header">
            <h2 class="tab-title-highlight">⚙️ Configurações</h2>
            <div id="settings-period-indicator"></div>
        </div>
        <div class="tab-content">
            <div class="settings-container">
                <div class="content-spacing">
                    
                    <!-- Seção de Conta -->
                    ${e?`
                    <div class="mb-6">
                        <h2 class="section-title red-border">🔐 Conta</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                            <div class="min-w-0 mr-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400">Conectado como</div>
                                <div class="font-medium text-gray-900 dark:text-gray-100 truncate" title="${e.email||""}">${e.email||"Usuário"}</div>
                            </div>
                            <button id="btn-logout" class="u-btn u-btn--danger">Sair</button>
                        </div>
                    </div>
                    `:""}

                    <!-- Seção de Orçamento Atual -->
                    ${s?`
                    <div class="mb-8">
                        <h2 class="section-title green-border">📋 Orçamento Atual</h2>
                        <div class="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
                            <div class="flex items-center justify-between mb-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl">📋</div>
                                    <div>
                                        <h3 class="text-xl font-bold">${s.nome||"Orçamento"}</h3>
                                        <p class="text-sm opacity-90">Orçamento Ativo</p>
                                    </div>
                                </div>
                                <button id="edit-budget-name-btn" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-xl">✏️</button>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white bg-opacity-15 p-4 rounded-xl"><div class="text-lg font-bold">${s.createdAt?new Date(s.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"N/A"}</div><div class="text-sm opacity-90">Data de Criação</div></div>
                                <div class="bg-white bg-opacity-15 p-4 rounded-xl"><div class="text-lg font-bold">${d.length+1}</div><div class="text-sm opacity-90">Usuários</div></div>
                                <div class="bg-white bg-opacity-15 p-4 rounded-xl"><div class="text-lg font-bold truncate" title="${t}">${t}</div><div class="text-sm opacity-90">Proprietário</div></div>
                            </div>
                        </div>
                    </div>
                    `:""}

                    <!-- Seção de Usuários e Compartilhamento -->
                    <div class="mb-8">
                        <h2 class="section-title blue-border">👥 Usuários & Compartilhamento</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            ${S(d)}
                        </div>
                    </div>

                    <!-- Seção de Convites Pendentes -->
                    <div class="mb-8">
                      <h2 class="section-title orange-border">📤 Convites Pendentes</h2>
                      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                        ${$(l)}
                      </div>
                    </div>

                    <!-- Seção de Convites Recebidos -->
                    <div class="mb-8">
                      <h2 class="section-title purple-border">📬 Convites Recebidos</h2>
                      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                        ${j(o)}
                      </div>
                    </div>

                    <!-- Seção de Orçamentos Compartilhados -->
                    <div class="mb-8">
                        <h2 class="section-title blue-border">🤝 Orçamentos Compartilhados com Você</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                        ${k(a,e,s)}
                        </div>
                    </div>

                    <!-- Seção de Compartilhar Orçamento -->
                    <div class="mb-8">
                        <h2 class="section-title green-border">🔗 Compartilhar Orçamento</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            ${s?`
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
                                                                        <form id="share-budget-form" class="flex gap-3" autocomplete="off" novalidate>
                                                                            <input type="email" id="share-email-input" name="email" placeholder="email@exemplo.com" 
                                                                                class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                                                                            <button id="share-budget-btn" type="submit" class="u-btn u-btn--primary" data-loading-text="Enviando...">
                                                                                📤 Enviar Convite
                                                                            </button>
                                                                        </form>
                                </div>
                            `:`
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
                        ${w(a,e,s)}
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

                    <!-- Seção de Toasts (Snackbar) -->
                    <div class="mb-8">
                        <h2 class="section-title yellow-border">🔔 Toasts (Snackbar)</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-yellow-600 dark:text-yellow-400">🔔</span>
                                        <span class="font-medium text-yellow-800 dark:text-yellow-200">Ajuste posição, duração, fila e anti-spam</span>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duração padrão (ms)</label>
                                        <input type="number" id="toast-duration" value="500" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Distância da borda (px)</label>
                                        <input type="number" id="toast-offset" value="80" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posição</label>
                                        <select id="toast-position" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                            <option value="bottom">Inferior</option>
                                            <option value="top">Superior</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alinhamento</label>
                                        <select id="toast-align" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                            <option value="center">Centro</option>
                                            <option value="left">Esquerda</option>
                                            <option value="right">Direita</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max. fila</label>
                                        <input type="number" id="toast-max-queue" value="5" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anti-spam (ms)</label>
                                        <input type="number" id="toast-cooldown" value="500" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    </div>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Pausar no hover</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Pausar toast quando mouse passar por cima</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="toast-hover-pause" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="flex gap-3">
                                    <button id="apply-toast-settings" class="u-btn u-btn--primary flex-1">Aplicar</button>
                                    <button id="reset-toast-settings" class="u-btn u-btn--secondary flex-1">Restaurar padrão</button>
                                    <button id="test-toast" class="u-btn u-btn--ghost flex-1">Testar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Modo Escuro -->
                    <div class="mb-8">
                        <h2 class="section-title blue-border">🌙 Modo Escuro</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-blue-600 dark:text-blue-400">🌙</span>
                                        <span class="font-medium text-blue-800 dark:text-blue-200">Alternar entre tema claro e escuro</span>
                                    </div>
                                </div>
                                <div class="flex justify-center">
                                    <button id="toggle-theme-btn" class="u-btn u-btn--primary text-lg px-8 py-3">
                                        🌙 Alternar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Tema de Cores -->
                    <div class="mb-8">
                        <h2 class="section-title purple-border">🎨 Tema de Cores</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-purple-600 dark:text-purple-400">🎨</span>
                                        <span class="font-medium text-purple-800 dark:text-purple-200">Escolher cores preferidas para o app</span>
                                    </div>
                                </div>
                                <div class="flex justify-center gap-4">
                                    <button class="color-theme-btn w-12 h-12 rounded-full border-4 border-blue-500 bg-blue-500 hover:scale-110 transition-transform" data-theme="blue" title="Tema Azul"></button>
                                    <button class="color-theme-btn w-12 h-12 rounded-full border-4 border-gray-300 bg-green-500 hover:scale-110 transition-transform" data-theme="green" title="Tema Verde"></button>
                                    <button class="color-theme-btn w-12 h-12 rounded-full border-4 border-gray-300 bg-purple-500 hover:scale-110 transition-transform" data-theme="purple" title="Tema Roxo"></button>
                                    <button class="color-theme-btn w-12 h-12 rounded-full border-4 border-gray-300 bg-orange-500 hover:scale-110 transition-transform" data-theme="orange" title="Tema Laranja"></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Compactar Interface -->
                    <div class="mb-8">
                        <h2 class="section-title yellow-border">📐 Compactar Interface</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-yellow-600 dark:text-yellow-400">📐</span>
                                        <span class="font-medium text-yellow-800 dark:text-yellow-200">Mostrar mais informações em menos espaço</span>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Ativar modo compacto</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Reduzir espaçamentos e tamanhos</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="compact-mode-toggle">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="flex gap-3">
                                    <button class="compact-size-btn u-btn u-btn--primary" data-size="micro">Micro</button>
                                    <button class="compact-size-btn u-btn u-btn--secondary" data-size="nano">Nano</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Tamanho do bloco de dias -->
                    <div class="mb-8">
                        <h2 class="section-title orange-border">⚡ Tamanho do bloco de dias</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-orange-600 dark:text-orange-400">⚡</span>
                                        <span class="font-medium text-orange-800 dark:text-orange-200">Ajusta quantos grupos de dias são carregados por vez na aba Transações (recomendado 10-16)</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamanho do bloco</label>
                                    <input type="text" id="days-chunk-size" value="Automático" placeholder="Deixe em branco para automático" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                </div>
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                    <p class="text-sm text-blue-700 dark:text-blue-300">
                                        Deixe em branco para usar ajuste automático baseado no seu dispositivo. Aplica-se na próxima abertura da aba Transações.
                                    </p>
                                </div>
                                <div class="flex gap-3">
                                    <button id="save-days-chunk" class="u-btn u-btn--primary flex-1">Salvar</button>
                                    <button id="reset-days-chunk" class="u-btn u-btn--secondary flex-1">Restaurar padrão</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Animações -->
                    <div class="mb-8">
                        <h2 class="section-title green-border">✨ Animações</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-green-600 dark:text-green-400">✨</span>
                                        <span class="font-medium text-green-800 dark:text-green-200">Mostrar animações e transições</span>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Ativar animações</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar animações e transições suaves</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="animations-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Seção de Telemetria de Performance -->
                    <div class="mb-8">
                        <h2 class="section-title blue-border">📊 Telemetria de Performance</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-blue-600 dark:text-blue-400">📊</span>
                                        <span class="font-medium text-blue-800 dark:text-blue-200">Coleta local de tempos de render e carregamentos (sem envio)</span>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100">Ativar telemetria</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">Coletar dados de performance localmente</div>
                                    </div>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="performance-telemetry-toggle" checked>
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="flex justify-center">
                                    <button id="view-performance-events" class="u-btn u-btn--ghost">
                                        📊 Ver eventos
                                    </button>
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
                        <h2 class="section-title blue-border">ℹ️ Sobre o App</h2>
                        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div class="space-y-4">
                                <!-- Informações do App -->
                                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div class="flex justify-between">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">Versão:</span>
                                            <span class="text-gray-900 dark:text-gray-100">${n}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">SW Versão:</span>
                                            <span class="text-gray-900 dark:text-gray-100">v4.2.9</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">Cache Estático:</span>
                                            <span class="text-gray-900 dark:text-gray-100">financeiro-static-v4.2.9</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">Cache Dinâmico:</span>
                                            <span class="text-gray-900 dark:text-gray-100">financeiro-dynamic-v4.2.9</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">Desenvolvedor:</span>
                                            <span class="text-gray-900 dark:text-gray-100">Igor Bispo</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">Tecnologias:</span>
                                            <span class="text-gray-900 dark:text-gray-100">Firebase, JavaScript, PWA</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">Última Atualização:</span>
                                            <span class="text-gray-900 dark:text-gray-100">Setembro 2025</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">Conectividade:</span>
                                            <span class="text-green-600 dark:text-green-400 font-medium">Online</span>
                                        </div>
                                        <div class="flex justify-between col-span-1 md:col-span-2">
                                            <span class="font-medium text-gray-700 dark:text-gray-300">Última verificação de update:</span>
                                            <span class="text-gray-900 dark:text-gray-100">${new Date().toLocaleDateString("pt-BR")}, ${new Date().toLocaleTimeString("pt-BR")}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Botões de Ação -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <button id="check-updates-btn" class="u-btn u-btn--primary flex items-center justify-center gap-2 p-3">
                                        <span class="text-lg">☁️⬇️</span>
                                        <span>Verificar Atualizações</span>
                                    </button>
                                    <button id="help-support-btn" class="u-btn u-btn--secondary flex items-center justify-center gap-2 p-3">
                                        <span class="text-lg">❓</span>
                                        <span>Ajuda e Suporte</span>
                                    </button>
                                    <button id="rate-app-btn" class="u-btn u-btn--primary flex items-center justify-center gap-2 p-3">
                                        <span class="text-lg">⭐</span>
                                        <span>Avaliar App</span>
                                    </button>
                                    <button id="copy-info-btn" class="u-btn u-btn--ghost flex items-center justify-center gap-2 p-3">
                                        <span class="text-lg">📄</span>
                                        <span>Copiar Informações</span>
                                    </button>
                                    <button id="clear-cache-btn" class="u-btn u-btn--danger flex items-center justify-center gap-2 p-3">
                                        <span class="text-lg">✅</span>
                                        <span>Limpar Cache Offline</span>
                                    </button>
                                    <button id="whats-new-btn" class="u-btn u-btn--secondary flex items-center justify-center gap-2 p-3">
                                        <span class="text-lg">📄📄</span>
                                        <span>O que mudou</span>
                                    </button>
                                    <button id="install-app-btn" class="u-btn u-btn--primary flex items-center justify-center gap-2 p-3 col-span-1 md:col-span-2">
                                        <span class="text-lg">⬇️📦</span>
                                        <span>Instalar App</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `}async function A(){const r=document.getElementById("app-content");if(!r){console.warn("⚠️ SettingsPage: elemento #app-content não encontrado");return}try{const e=document.getElementById("toggle-theme-btn");if(e){const i=e.cloneNode(!0);e.parentNode.replaceChild(i,e)}const{currentUser:s,currentBudget:a,budgets:d=[]}=window.appState||{},[t,o,l,n]=await Promise.all([s?y(s.uid):[],a?x(a.id):[],a?f([...new Set([a.userId,...a.usuariosPermitidos||[]])]):[],a?h(a.userId):null]),p=n?.email||n?.displayName||"Proprietário",v={currentUser:s,currentBudget:a,budgets:d,usersWithAccess:l.filter(i=>i.uid!==a?.userId),ownerDisplay:p,pendingInvitations:t,sentInvitations:o,appVersion:"4.3.0",hasNewChangelog:!0,lastUpdateLabel:new Date().toLocaleDateString("pt-BR"),txChunkOverride:localStorage.getItem("txChunkSize")||"",perfEnabled:!1};r.innerHTML=C(v);try{console.log("[DEBUG] Verificando attachDynamicHandlers:",typeof window.attachDynamicHandlers),typeof window.attachDynamicHandlers=="function"?(console.log("[DEBUG] Chamando attachDynamicHandlers para content:",r),window.attachDynamicHandlers(r),console.log("[DEBUG] attachDynamicHandlers executado com sucesso")):console.warn("[SettingsPage] attachDynamicHandlers ausente; cliques delegados podem não funcionar")}catch(i){console.warn("[SettingsPage] Erro ao executar attachDynamicHandlers:",i)}try{console.log("[DEBUG] Verificando setupGlobalHandlers:",typeof window.setupGlobalHandlers),typeof window.setupGlobalHandlers=="function"?(console.log("[DEBUG] Chamando setupGlobalHandlers..."),window.setupGlobalHandlers(),console.log("[DEBUG] setupGlobalHandlers executado com sucesso")):console.warn("[SettingsPage] setupGlobalHandlers ausente; prosseguindo sem inicialização adicional")}catch(i){console.warn("[SettingsPage] Erro ao executar setupGlobalHandlers:",i)}D()}catch(e){console.error("☠️ Falha catastrófica ao renderizar SettingsPage:",e),r.innerHTML=`<div class="empty-state"><div class="empty-icon">☠️</div><div class="empty-text">Erro ao carregar configurações</div><div class="empty-description">${e.message}</div></div>`}}function D(){try{window.initializeTheme&&window.initializeTheme(),[{id:"check-updates-btn",fn:window.checkForUpdates},{id:"help-support-btn",fn:window.openHelp},{id:"rate-app-btn",fn:window.rateApp},{id:"copy-info-btn",fn:window.copyAppInfo},{id:"clear-cache-btn",fn:window.clearOfflineCache},{id:"whats-new-btn",fn:window.showWhatsNew},{id:"install-app-btn",fn:window.installApp}].forEach(({id:a,fn:d})=>{const t=document.getElementById(a);t&&typeof d=="function"&&(t.onclick=d)});let s=document.getElementById("toggle-theme-btn")||document.getElementById("theme-toggle-btn");if(s){s.id="theme-toggle-btn";const a=s.cloneNode(!0);s.parentNode.replaceChild(a,s),s=a}m(()=>import("./main-B-XVfQ8M.js").then(a=>a.aa),__vite__mapDeps([0,1])).then(a=>{typeof a.setupThemeToggle=="function"?(a.setupThemeToggle("theme-toggle-btn"),console.log("[DEBUG] setupThemeToggle conectado ao botão #theme-toggle-btn")):console.warn("[DEBUG] setupThemeToggle não encontrado no módulo global")})}catch(e){console.warn("Falha no setup pós-renderização",e)}[{id:"limit-alerts-toggle",key:"noti_limit_alerts",label:"Alertas de Limite"},{id:"recurring-reminders-toggle",key:"noti_recurring_reminders",label:"Lembretes de Recorrentes"},{id:"weekly-summary-toggle",key:"noti_weekly_summary",label:"Resumo Semanal"}].forEach(({id:e,key:s,label:a})=>{const d=document.getElementById(e);if(d){const t=localStorage.getItem(s);t!==null&&(d.checked=t==="true"),d.addEventListener("change",()=>{localStorage.setItem(s,d.checked),window.Snackbar?window.Snackbar.success(`${a} ${d.checked?"ativado":"desativado"}`):console.log(`[Notificações] ${a}:`,d.checked)})}})}c.on("auth:changed",()=>g());c.on("budget:changed",()=>g());c.on("invitation:changed",()=>g());function g(){window.location.hash.startsWith("#/settings")&&A()}export{A as renderSettings};
