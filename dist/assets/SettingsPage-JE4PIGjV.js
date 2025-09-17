const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-B_pllYEl.js","assets/main-CkMpiXuu.css"])))=>i.map(i=>d[i]);
import{_ as p,e as g}from"./main-B_pllYEl.js";import{loadBudgetInvitations as u,loadSentBudgetInvitations as y,fetchUsersInfo as f,fetchUserInfo as h}from"./settings.service-BalZkfb-.js";function b(s){s?(document.body.classList.remove("no-animations"),localStorage.setItem("animationsEnabled","1")):(document.body.classList.add("no-animations"),localStorage.setItem("animationsEnabled","0"))}document.addEventListener("DOMContentLoaded",()=>{const s=localStorage.getItem("animationsEnabled"),e=s===null?!0:s==="1";b(e);const a=document.getElementById("animations-toggle");a&&(a.checked=e,a.addEventListener("change",r=>{b(r.target.checked)}))});function x(s,e,a){return`
    <div class="empty-state">
        <div class="empty-icon">${s}</div>
        <div class="empty-text">${e}</div>
        <div class="empty-description">${a}</div>
    </div>
    `}function k(s,e,a){const r=e?.uid,d=(s||[]).filter(t=>t&&(t.isOwner===!1||r&&t.userId&&t.userId!==r));return d.length?`
        <div class="space-y-4">
            ${d.map(t=>`
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-bold text-lg text-gray-900 dark:text-gray-100">${t.nome||"Orçamento"}</p>
                                <p class="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/50 rounded-full px-2 py-0.5 inline-block mt-1">Compartilhado</p>
                            </div>
                            ${t.id!==a?.id?`
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
    `:x("🤝","Nenhum orçamento compartilhado","Convites que você aceitar aparecerão aqui.")}function w(s,e,a){const r=e?.uid,d=(s||[]).filter(t=>t&&t.isOwner!==!1&&(!r||t.userId===r));return d.length?`
        <div class="space-y-4">
            ${d.map(t=>`
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border ${t.id===a?.id?"border-blue-500":"border-gray-200 dark:border-gray-700"} overflow-hidden">
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-bold text-lg text-gray-900 dark:text-gray-100">${t.nome}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Criado em ${t.createdAt?new Date(t.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}</p>
                            </div>
                            ${t.id!==a?.id?`
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
    `:x("🗂️","Nenhum orçamento próprio","Crie um novo orçamento para começar.")}function S(s){return!s||s.length===0?`
        <div class="text-center py-8">
            <div class="text-4xl mb-3">👥</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum usuário compartilhado</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Compartilhe seu orçamento para colaborar</div>
        </div>
        `:`
    <div class="space-y-3">
        ${s.map(e=>`
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
    `}function C(s){return!s||s.length===0?`
        <div class="text-center py-8">
            <div class="text-4xl mb-3">📤</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum convite pendente</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Convites enviados aparecerão aqui</div>
        </div>`:`
    <div class="space-y-3">
        ${s.map(e=>`
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
    </div>`}function E(s){return!s||s.length===0?`
        <div class="text-center py-8">
            <div class="text-4xl mb-3">📬</div>
            <div class="text-gray-500 dark:text-gray-400">Nenhum convite pendente</div>
            <div class="text-sm text-gray-400 dark:text-gray-500 mt-1">Novos convites aparecerão aqui</div>
        </div>`:`
    <div class="space-y-3">
        ${s.map(e=>`
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
    </div>`}function $(s){const{currentUser:e,currentBudget:a,budgets:r,usersWithAccess:d,ownerDisplay:t,pendingInvitations:n,sentInvitations:l,appVersion:i}=s;return`
    <div class="tab-container">
        <div class="tab-header">
            <h2 class="tab-title-highlight">⚙️ Configurações</h2>
            <div id="settings-period-indicator"></div>
        </div>
        <div class="tab-content">
            <div class="settings-container">
                <div class="content-spacing">

                    <!-- ========== SEÇÃO 1: RESUMO COMPACTO ========== -->
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">⚙️ Resumo</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">⚙️</span>
                                        Configurações do Sistema
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">${a?.nome||"Orçamento"} • ${i}</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-green-600 dark:text-green-400">
                                        ${d.length+1}
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Usuários</p>
                                </div>
                            </div>
                            
                            <!-- Métricas Compactas -->
                            <div class="grid grid-cols-3 gap-3 mb-4">
                                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                                    <div class="text-lg mb-1">📋</div>
                                    <div class="text-lg font-bold text-gray-800 dark:text-gray-200">${a?.nome||"Orçamento"}</div>
                                    <div class="text-xs text-gray-600 dark:text-gray-400">Ativo</div>
                                </div>
                                
                                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                                    <div class="text-lg mb-1">👥</div>
                                    <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${d.length+1}</div>
                                    <div class="text-xs text-gray-600 dark:text-gray-400">Usuários</div>
                                </div>
                                
                                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                                    <div class="text-lg mb-1">👤</div>
                                    <div class="text-lg font-bold text-purple-600 dark:text-purple-400 truncate" title="${t}">${t}</div>
                                    <div class="text-xs text-gray-600 dark:text-gray-400">Proprietário</div>
                                </div>
                            </div>

                            <!-- Resumo de Sistema Compacto -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                                    <span>🔧</span>
                                    Informações do Sistema
                                </h5>
                                <div class="space-y-1">
                                    <div class="flex justify-between text-xs">
                                        <span class="text-gray-600 dark:text-gray-400">Orçamento:</span>
                                        <span class="font-medium text-gray-800 dark:text-gray-200">${a?.nome||"Orçamento"}</span>
                                    </div>
                                    <div class="flex justify-between text-xs">
                                        <span class="text-gray-600 dark:text-gray-400">Criado em:</span>
                                        <span class="font-medium text-gray-800 dark:text-gray-200">${a?.createdAt?new Date(a.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"N/A"}</span>
                                    </div>
                                    <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                                        <span class="text-gray-600 dark:text-gray-400">Versão:</span>
                                        <span class="font-bold text-green-600 dark:text-green-400">${i}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 2: CONTA E SEGURANÇA ========== -->
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔐 Conta & Segurança</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">🔐</span>
                                        Gerenciar Conta
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Configurações de segurança e autenticação</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-green-600 dark:text-green-400">
                                        ${e?"Conectado":"Desconectado"}
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Status</p>
                                </div>
                            </div>
                            
                            <!-- Conta do Usuário -->
                            ${e?`
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <div class="flex items-center justify-between">
                                    <div class="min-w-0 flex-1">
                                        <div class="text-sm text-gray-600 dark:text-gray-400">Conectado como</div>
                                        <div class="font-medium text-gray-900 dark:text-gray-100 truncate" title="${e.email||""}">${e.email||"Usuário"}</div>
                                    </div>
                                    <button id="btn-logout" class="u-btn u-btn--danger text-sm">Sair</button>
                                </div>
                            </div>
                            `:""}

                            <!-- Configurações de Segurança -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>🛡️</span>
                                    Segurança
                                </h5>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Autenticação Biométrica</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Impressão digital/Face ID</div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="biometric-auth-toggle">
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Sincronização Automática</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Sincronizar dados</div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="auto-sync-toggle" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="flex items-center justify-between">
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
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">👥 Compartilhamento</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">👥</span>
                                        Gerenciar Compartilhamento
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Usuários, convites e orçamentos compartilhados</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        ${d.length+(l?.length||0)+(n?.length||0)}
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Total</p>
                                </div>
                            </div>
                            
                            <!-- Usuários com Acesso -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>👥</span>
                                    Usuários com Acesso
                                </h5>
                                ${S(d)}
                            </div>

                            <!-- Convites Enviados -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>📤</span>
                                    Convites Enviados
                                </h5>
                                ${C(l)}
                            </div>

                            <!-- Convites Recebidos -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>📬</span>
                                    Convites Recebidos
                                </h5>
                                ${E(n)}
                            </div>

                            <!-- Orçamentos Compartilhados -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>🤝</span>
                                    Orçamentos Compartilhados
                                </h5>
                                ${k(r,e,a)}
                            </div>

                            <!-- Compartilhar Orçamento -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>🔗</span>
                                    Compartilhar Orçamento
                                </h5>
                                ${a?`
                                    <div class="space-y-3">
                                        <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                            <div class="flex items-center gap-2 mb-2">
                                                <span class="text-blue-600 dark:text-blue-400">💡</span>
                                                <span class="font-medium text-blue-800 dark:text-blue-200">Como funciona</span>
                                            </div>
                                            <p class="text-xs text-blue-700 dark:text-blue-300">
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
                        ${w(r,e,a)}
                        <button id="create-new-budget-btn" class="create-button u-btn u-btn--primary mt-5 w-full">➕ Criar Novo Orçamento</button>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 3: DADOS E PRIVACIDADE ========== -->
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💾 Dados e Privacidade</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4">
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
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button id="export-data-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center justify-center gap-3 p-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-2xl">📤</span>
                                        <div class="text-left">
                                            <div class="font-semibold">Exportar Dados</div>
                                            <div class="text-xs opacity-90">Backup completo</div>
                                        </div>
                                    </button>
                                    <button id="import-data-btn" class="bg-green-500 hover:bg-green-600 text-white font-medium flex items-center justify-center gap-3 p-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-2xl">📥</span>
                                        <div class="text-left">
                                            <div class="font-semibold">Importar Dados</div>
                                            <div class="text-xs opacity-90">Restaurar backup</div>
                                        </div>
                                    </button>
                                    <button id="clear-data-btn" class="bg-red-500 hover:bg-red-600 text-white font-medium flex items-center justify-center gap-3 p-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-2xl">🗑️</span>
                                        <div class="text-left">
                                            <div class="font-semibold">Limpar Dados</div>
                                            <div class="text-xs opacity-90">Remover tudo</div>
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
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔔 Notificações</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4">
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
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>🔔</span>
                                    Notificações do Sistema
                                </h5>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Alertas de Limite</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Notificar quando categoria exceder 70%</div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="limit-alerts-toggle" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Lembretes de Recorrentes</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Lembrar despesas recorrentes</div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="recurring-reminders-toggle" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="flex items-center justify-between">
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
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
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
                                    <div class="flex items-center justify-between">
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
                                        <button id="apply-toast-settings" class="u-btn u-btn--primary text-xs flex-1">Aplicar</button>
                                        <button id="reset-toast-settings" class="u-btn u-btn--secondary text-xs flex-1">Reset</button>
                                        <button id="test-toast" class="u-btn u-btn--ghost text-xs flex-1">Testar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 5: APARÊNCIA ========== -->
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🎨 Aparência</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4">
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
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>🌙</span>
                                    Modo Escuro
                                </h5>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Alternar tema</div>
                                        <div class="text-xs text-gray-500 dark:text-gray-400">Tema claro/escuro</div>
                                    </div>
                                    <button id="toggle-theme-btn" class="u-btn u-btn--primary text-sm">
                                        🌙 Alternar
                                    </button>
                                </div>
                            </div>

                            <!-- Tema de Cores -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
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
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>📐</span>
                                    Modo Compacto
                                </h5>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
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
                                        <button class="compact-size-btn u-btn u-btn--primary text-xs" data-size="micro">Micro</button>
                                        <button class="compact-size-btn u-btn u-btn--secondary text-xs" data-size="nano">Nano</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 6: SISTEMA ========== -->
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">⚙️ Sistema</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4">
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
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>⚡</span>
                                    Performance
                                </h5>
                                <div class="space-y-3">
                                    <div>
                                        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tamanho do bloco de dias</label>
                                        <input type="text" id="days-chunk-size" value="Automático" placeholder="Deixe em branco para automático" class="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                                    </div>
                                    <div class="flex gap-2">
                                        <button id="save-days-chunk" class="u-btn u-btn--primary text-xs flex-1">Salvar</button>
                                        <button id="reset-days-chunk" class="u-btn u-btn--secondary text-xs flex-1">Reset</button>
                                    </div>
                                </div>
                            </div>

                            <!-- Animações -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
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
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>📊</span>
                                    Telemetria
                                </h5>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Ativar telemetria</div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">Coletar dados de performance localmente</div>
                                        </div>
                                        <label class="toggle-switch">
                                            <input type="checkbox" id="performance-telemetry-toggle" checked>
                                            <span class="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <button id="view-performance-events" class="u-btn u-btn--ghost text-xs w-full">
                                        📊 Ver eventos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ========== SEÇÃO 7: INFORMAÇÕES E SUPORTE ========== -->
                    <div class="mb-8">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ℹ️ Informações & Suporte</h2>
                        </div>
                        
                        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                            <!-- Header Compacto -->
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                        <span class="text-xl">ℹ️</span>
                                        Sobre o App
                                    </h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Informações, suporte e atualizações</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${i}</div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Versão</p>
                                </div>
                            </div>
                            
                            <!-- Informações do Sistema -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                                    <span>📊</span>
                                    Informações do Sistema
                                </h5>
                                <div class="space-y-3">
                                    <!-- Linha 1: Versão e SW -->
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">📱 Versão</div>
                                            <div class="font-bold text-sm text-gray-800 dark:text-gray-200">${i}</div>
                                        </div>
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">⚙️ SW</div>
                                            <div class="font-bold text-sm text-gray-800 dark:text-gray-200">v4.40.0</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Linha 2: Desenvolvedor e Tecnologias -->
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">👨‍💻 Desenvolvedor</div>
                                            <div class="font-bold text-sm text-gray-800 dark:text-gray-200">Igor Bispo</div>
                                        </div>
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">🛠️ Tecnologias</div>
                                            <div class="font-bold text-sm text-gray-800 dark:text-gray-200">Firebase, JS, PWA</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Linha 3: Atualização e Status -->
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">📅 Atualização</div>
                                            <div class="font-bold text-sm text-gray-800 dark:text-gray-200">Set 2025</div>
                                        </div>
                                        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">🟢 Status</div>
                                            <div class="font-bold text-sm text-green-600 dark:text-green-400">Online</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Ações Rápidas -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>⚡</span>
                                    Ações Rápidas
                                </h5>
                                <div class="grid grid-cols-2 gap-3">
                                    <button id="check-updates-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-base">☁️⬇️</span>
                                        <span>Atualizações</span>
                                    </button>
                                    <button id="help-support-btn" class="bg-purple-500 hover:bg-purple-600 text-white font-medium text-xs flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-base">❓</span>
                                        <span>Suporte</span>
                                    </button>
                                    <button id="whats-new-btn" class="bg-green-500 hover:bg-green-600 text-white font-medium text-xs flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-base">📄</span>
                                        <span>O que mudou</span>
                                    </button>
                                    <button id="copy-info-btn" class="bg-gray-500 hover:bg-gray-600 text-white font-medium text-xs flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-base">📋</span>
                                        <span>Copiar Info</span>
                                    </button>
                                    <button id="clear-cache-btn" class="bg-red-500 hover:bg-red-600 text-white font-medium text-xs flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-base">🗑️</span>
                                        <span>Limpar Cache</span>
                                    </button>
                                    <button id="install-app-btn" class="bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-xs flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <span class="text-base">⬇️</span>
                                        <span>Instalar</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Cache e Performance -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                                    <span>💾</span>
                                    Cache e Performance
                                </h5>
                                <div class="space-y-2 text-xs">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Cache Estático:</span>
                                        <span class="font-medium text-gray-800 dark:text-gray-200">financeiro-static-v4.40.0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Cache Dinâmico:</span>
                                        <span class="font-medium text-gray-800 dark:text-gray-200">financeiro-dynamic-v4.40.0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Última verificação:</span>
                                        <span class="font-medium text-gray-800 dark:text-gray-200">${new Date().toLocaleDateString("pt-BR")}, ${new Date().toLocaleTimeString("pt-BR")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `}async function A(){const s=document.getElementById("app-content");if(!s){console.warn("⚠️ SettingsPage: elemento #app-content não encontrado");return}try{const e=document.getElementById("toggle-theme-btn");if(e){const o=e.cloneNode(!0);e.parentNode.replaceChild(o,e)}const{currentUser:a,currentBudget:r,budgets:d=[]}=window.appState||{},[t,n,l,i]=await Promise.all([a?u(a.uid):[],r?y(r.id):[],r?f([...new Set([r.userId,...r.usuariosPermitidos||[]])]):[],r?h(r.userId):null]),m=i?.email||i?.displayName||"Proprietário",v={currentUser:a,currentBudget:r,budgets:d,usersWithAccess:l.filter(o=>o.uid!==r?.userId),ownerDisplay:m,pendingInvitations:t,sentInvitations:n,appVersion:"v4.40.0",hasNewChangelog:!0,lastUpdateLabel:"16/09/2025",txChunkOverride:localStorage.getItem("txChunkSize")||"",perfEnabled:!1};s.innerHTML=$(v);try{console.log("[DEBUG] Verificando attachDynamicHandlers:",typeof window.attachDynamicHandlers),typeof window.attachDynamicHandlers=="function"?(console.log("[DEBUG] Chamando attachDynamicHandlers para content:",s),window.attachDynamicHandlers(s),console.log("[DEBUG] attachDynamicHandlers executado com sucesso")):console.warn("[SettingsPage] attachDynamicHandlers ausente; cliques delegados podem não funcionar")}catch(o){console.warn("[SettingsPage] Erro ao executar attachDynamicHandlers:",o)}try{console.log("[DEBUG] Verificando setupGlobalHandlers:",typeof window.setupGlobalHandlers),typeof window.setupGlobalHandlers=="function"?(console.log("[DEBUG] Chamando setupGlobalHandlers..."),window.setupGlobalHandlers(),console.log("[DEBUG] setupGlobalHandlers executado com sucesso")):console.warn("[SettingsPage] setupGlobalHandlers ausente; prosseguindo sem inicialização adicional")}catch(o){console.warn("[SettingsPage] Erro ao executar setupGlobalHandlers:",o)}I()}catch(e){console.error("☠️ Falha catastrófica ao renderizar SettingsPage:",e),s.innerHTML=`<div class="empty-state"><div class="empty-icon">☠️</div><div class="empty-text">Erro ao carregar configurações</div><div class="empty-description">${e.message}</div></div>`}}function I(){try{window.initializeTheme&&window.initializeTheme(),[{id:"help-support-btn",fn:window.openHelp},{id:"rate-app-btn",fn:window.rateApp},{id:"copy-info-btn",fn:window.copyAppInfo},{id:"clear-cache-btn",fn:window.clearOfflineCache},{id:"whats-new-btn",fn:window.showWhatsNew},{id:"install-app-btn",fn:window.installApp}].forEach(({id:r,fn:d})=>{const t=document.getElementById(r);t&&typeof d=="function"&&(t.onclick=d)});let a=document.getElementById("toggle-theme-btn")||document.getElementById("theme-toggle-btn");if(a){a.id="theme-toggle-btn";const r=a.cloneNode(!0);a.parentNode.replaceChild(r,a),a=r}p(()=>import("./main-B_pllYEl.js").then(r=>r.aa),__vite__mapDeps([0,1])).then(r=>{typeof r.setupThemeToggle=="function"?(r.setupThemeToggle("theme-toggle-btn"),console.log("[DEBUG] setupThemeToggle conectado ao botão #theme-toggle-btn")):console.warn("[DEBUG] setupThemeToggle não encontrado no módulo global")})}catch(e){console.warn("Falha no setup pós-renderização",e)}[{id:"limit-alerts-toggle",key:"noti_limit_alerts",label:"Alertas de Limite"},{id:"recurring-reminders-toggle",key:"noti_recurring_reminders",label:"Lembretes de Recorrentes"},{id:"weekly-summary-toggle",key:"noti_weekly_summary",label:"Resumo Semanal"}].forEach(({id:e,key:a,label:r})=>{const d=document.getElementById(e);if(d){const t=localStorage.getItem(a);t!==null&&(d.checked=t==="true"),d.addEventListener("change",()=>{localStorage.setItem(a,d.checked),window.Snackbar?window.Snackbar.success(`${r} ${d.checked?"ativado":"desativado"}`):console.log(`[Notificações] ${r}:`,d.checked)})}})}g.on("auth:changed",()=>c());g.on("budget:changed",()=>c());g.on("invitation:changed",()=>c());function c(){window.location.hash.startsWith("#/settings")&&A()}export{A as renderSettings};
