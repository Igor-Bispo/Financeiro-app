// Importar dependências globais
// import { Snackbar } from '../ui/Snackbar.js';

// Importar funções do Firestore
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export async function renderSettings() {
  const content = document.getElementById('app-content');

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

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">⚙️ Configurações</h2>
        <div class="flex items-center gap-2">
          <button onclick="window.showExportOptions && window.showExportOptions()" class="btn-secondary">
            <span class="icon-standard">📤</span>
            <span class="hidden sm:inline">Exportar</span>
          </button>
          <button id="theme-toggle-btn" class="btn-secondary">
            <span class="icon-standard">🎨</span>
            <span class="hidden sm:inline">Tema</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">⚙️ Configurações</h2>
            <p class="text-gray-600 dark:text-gray-400">Gerencie suas preferências e dados</p>
          </div>

      <!-- Seção: Informações do Orçamento Atual -->
      ${currentBudget ? `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
            <span class="text-emerald-600 dark:text-emerald-400 text-lg">📋</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Orçamento Atual</h3>
        </div>
        
        <div class="space-y-4">
          <!-- Nome do Orçamento -->
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">${currentBudget.nome || 'Orçamento sem nome'}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Nome do orçamento</div>
              </div>
              <span class="text-emerald-600 dark:text-emerald-400 text-lg">📝</span>
            </div>
          </div>

          <!-- ID do Orçamento -->
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="font-medium text-gray-800 dark:text-white text-sm break-all">${currentBudget.id}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">ID do orçamento</div>
              </div>
              <button onclick="copyBudgetId('${currentBudget.id}')" class="ml-3 px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                📋 Copiar
              </button>
            </div>
          </div>

          <!-- Usuário Logado -->
          ${currentUser ? `
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">${currentUser.email}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Você (usuário logado)</div>
              </div>
              <span class="text-blue-600 dark:text-blue-400 text-lg">👤</span>
            </div>
          </div>
          ` : ''}

          <!-- Usuários com Acesso -->
          ${usersWithAccess.length > 0 ? `
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="mb-2">
              <div class="font-medium text-gray-800 dark:text-white">Usuários com Acesso</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">${usersWithAccess.length} usuário(s) compartilhado(s)</div>
            </div>
            <div class="space-y-2">
              ${usersWithAccess.map(user => `
                <div class="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded-lg">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-white text-sm truncate">${user.email}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${user.role}</div>
                  </div>
                  ${budgetInfo?.userId === currentUser?.uid ? `
                    <button onclick="confirmRemoveUser('${currentBudget.id}', '${user.uid}', '${user.email}')" 
                            class="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors flex-shrink-0">
                      🗑️ Remover
                    </button>
                  ` : `
                    <span class="text-purple-600 dark:text-purple-400 text-sm flex-shrink-0">🔗</span>
                  `}
                </div>
              `).join('')}
            </div>
          </div>
          ` : `
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Orçamento Pessoal</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Apenas você tem acesso</div>
              </div>
              <span class="text-gray-600 dark:text-gray-400 text-lg">🔒</span>
            </div>
          </div>
          `}
        </div>
      </div>
      ` : `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
            <span class="text-yellow-600 dark:text-yellow-400 text-lg">⚠️</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Nenhum Orçamento Selecionado</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400">Selecione um orçamento para ver suas informações.</p>
      </div>
      `}

      <!-- Seção: Meus Orçamentos -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">📁</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Meus Orçamentos</h3>
        </div>
        
        <div class="space-y-3">
          ${budgets.length > 0 ? budgets.map(budget => {
            const isOwner = budget.userId === currentUser?.uid;
            const isShared = budget.usuariosPermitidos && budget.usuariosPermitidos.length > 0;
            const isCurrent = budget.id === currentBudget?.id;
            
            return `
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 ${isCurrent ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3">
                    <div class="font-medium text-gray-800 dark:text-white">${budget.nome || 'Orçamento sem nome'}</div>
                    ${isCurrent ? '<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Atual</span>' : ''}
                    ${isOwner ? '<span class="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Dono</span>' : ''}
                    ${!isOwner && isShared ? '<span class="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">Compartilhado</span>' : ''}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ${isShared ?
    `${isOwner ? 'Compartilhado com' : 'Compartilhado por'} ${budget.usuariosPermitidos.length} usuário(s)` :
    'Orçamento pessoal'
}
                  </div>
                  <div class="text-xs text-gray-400 dark:text-gray-500 mt-1 break-all">ID: ${budget.id}</div>
                </div>
                <div class="flex items-center gap-2">
                  ${!isCurrent ? `
                    <button onclick="switchToBudget('${budget.id}')" class="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                      Entrar
                    </button>
                  ` : ''}
                  ${!isOwner && isShared ? `
                    <button onclick="confirmLeaveBudget('${budget.id}', '${budget.nome || 'Orçamento'}')" 
                            class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors">
                      🚪 Sair
                    </button>
                  ` : ''}
                  ${isOwner ? `
                    <div class="relative inline-block">
                      <button onclick="toggleResetDropdown('${budget.id}')" 
                              class="px-3 py-1 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-1">
                        🔄 Reset <span class="text-xs">▼</span>
                      </button>
                      <div id="reset-dropdown-${budget.id}" class="hidden absolute right-0 mt-1 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                         <button onclick="confirmResetTransactions('${budget.id}', '${budget.nome || 'Orçamento'}')" 
                                 class="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">
                           📊 Apenas Transações
                         </button>
                         <button onclick="confirmResetCategories('${budget.id}', '${budget.nome || 'Orçamento'}')" 
                                 class="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                           🏷️ Apenas Categorias
                         </button>
                         <button onclick="confirmResetBudget('${budget.id}', '${budget.nome || 'Orçamento'}')" 
                                 class="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg">
                           🔄 Tudo (Transações + Recorrentes)
                         </button>
                       </div>
                    </div>
                    <button onclick="confirmDeleteBudget('${budget.id}', '${budget.nome || 'Orçamento'}')" 
                            class="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
                      🗑️ Excluir
                    </button>
                  ` : ''}
                  <button onclick="copyBudgetId('${budget.id}')" class="px-2 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors">
                    📋
                  </button>
                </div>
              </div>
            </div>
          `}).join('') : `
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div class="text-center">
                <div class="text-gray-500 dark:text-gray-400 mb-2">📁</div>
                <div class="font-medium text-gray-800 dark:text-white">Nenhum orçamento encontrado</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Crie seu primeiro orçamento</div>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Seção: Orçamentos Compartilhados -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
            <span class="text-indigo-600 dark:text-indigo-400 text-lg">🤝</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Orçamentos Compartilhados</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.showAddBudgetModal && window.showAddBudgetModal()">
            <div class="flex items-center gap-3">
              <span class="text-xl">➕</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Criar Novo Orçamento</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Criar um novo orçamento pessoal ou compartilhado</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.compartilharOrcamento && window.compartilharOrcamento()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔗</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Compartilhar Orçamento</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Compartilhar orçamento atual com outros usuários</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.selectSharedBudget && window.selectSharedBudget()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔐</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Entrar em Orçamento Compartilhado</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Acessar orçamento compartilhado por ID</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Convites Pendentes -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
            <span class="text-orange-600 dark:text-orange-400 text-lg">📨</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Convites Pendentes</h3>
        </div>
        
        <div id="pending-invitations-container" class="space-y-3">
          ${pendingInvitations.length > 0 ? pendingInvitations.map(invitation => `
            <div class="p-4 rounded-xl border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-orange-600 dark:text-orange-400 text-lg">📨</span>
                    <h4 class="font-medium text-gray-800 dark:text-white">Convite para Orçamento</h4>
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Orçamento:</strong> ${invitation.budgetName || 'Orçamento sem nome'}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Convidado por:</strong> ${invitation.invitedByUserEmail || 'Usuário desconhecido'}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    ${invitation.createdAt ? new Date(invitation.createdAt.toDate()).toLocaleString('pt-BR') : 'Data não disponível'}
                  </div>
                </div>
                <div class="flex items-center gap-2 ml-4">
                  <button onclick="window.acceptBudgetInvitation && window.acceptBudgetInvitation('${invitation.id}')" 
                          class="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                    ✅ Aceitar
                  </button>
                  <button onclick="window.declineBudgetInvitation && window.declineBudgetInvitation('${invitation.id}')" 
                          class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors">
                    ❌ Recusar
                  </button>
                </div>
              </div>
            </div>
          `).join('') : `
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div class="text-center">
                <div class="text-gray-500 dark:text-gray-400 mb-2">📨</div>
                <div class="font-medium text-gray-800 dark:text-white">Nenhum convite pendente</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Você não tem convites para orçamentos aguardando resposta</div>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Seção: Dados e Exportação -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">📊</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Dados e Exportação</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.showExportOptions && window.showExportOptions()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📤</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar Dados</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Baixar relatórios em PDF/Excel</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.restoreBackup && window.restoreBackup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📥</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Restaurar Backup</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Importar dados de um arquivo JSON</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.downloadBackup && window.downloadBackup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">💾</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Backup JSON</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Exportar todos os dados em JSON</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportToExcel && window.exportToExcel()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📊</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar Excel</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Relatório em planilha Excel</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportToPDF && window.exportToPDF()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📄</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar PDF</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Relatório em documento PDF</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-red-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportReadmePDF && window.exportReadmePDF()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📖</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Guia de Uso (PDF)</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Manual completo do aplicativo</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.renderLogAplicacoes && window.renderLogAplicacoes()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📆</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Log de Aplicações</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Histórico de recorrentes aplicadas</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Notificações -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">🔔</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Notificações</h3>
        </div>
        
        <div class="space-y-3">
          <button id="notification-toggle-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <span id="notification-icon" class="text-xl">🔕</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Ativar Notificações</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Receber alertas importantes</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button onclick="window.testNotification && window.testNotification()" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔔</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Testar Notificação</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Enviar notificação de teste</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <div id="notification-status" class="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 hidden">
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>Notificações ativadas</span>
            </div>
            <div class="mt-2 text-xs">
              Você receberá alertas sobre:
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Recorrentes pendentes</li>
                <li>Limites de categoria</li>
                <li>Lembretes mensais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção: Aplicativo -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <span class="text-green-600 dark:text-green-400 text-lg">📱</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Aplicativo</h3>
        </div>
        
        <div class="space-y-3">
          <button id="install-app-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.installPWA()">
            <div class="flex items-center gap-3">
              <span class="text-xl">⬇️</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Instalar App</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Baixar para a tela inicial</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
    </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.showBiometricSetup && window.showBiometricSetup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔐</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Autenticação Biométrica</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Configurar impressão digital/face</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
    </button>
        </div>
      </div>

      <!-- Seção: Conta -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <span class="text-red-600 dark:text-red-400 text-lg">👤</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Conta</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="confirmLogout()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🚪</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Sair da Conta</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Fazer logout do aplicativo</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-red-500 transition-colors">→</span>
    </button>
        </div>
      </div>

      <!-- Informações do App -->
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 text-center">
        <div class="text-4xl mb-3">📱</div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Servo Tech Finanças</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Versão 4.1.0</p>
        <div class="text-xs text-gray-500 dark:text-gray-500">
          © 2025 • Fundador: Igor Bispo
        </div>
      </div>
    </div>
  `;

  // Adicionar função de confirmação de logout
  window.confirmLogout = () => {
    if (confirm('Tem certeza que deseja sair da conta?')) {
      try {
        // Parar todos os listeners do Firestore antes do logout
        if (typeof window.stopAllListeners === 'function') {
          window.stopAllListeners();
        }

        // Limpar o estado da aplicação
        if (window.appState) {
          window.appState.currentUser = null;
          window.appState.currentBudget = null;
          window.appState.transactions = [];
          window.appState.categories = [];
          window.appState.budgets = [];
          window.appState.recorrentes = [];
        }

        // Fazer logout
        window.FirebaseAuth.signOut()
          .then(() => {
            console.log('✅ Logout realizado com sucesso');
            
            // Mostrar página de login diretamente sem alterar o hash
            if (window.toggleLoginPage) {
              window.toggleLoginPage(true);
            }
            
            // Limpar hash da URL após mostrar a página de login
            setTimeout(() => {
              window.location.hash = '';
            }, 100);
            
            console.log('✅ Redirecionado para página de login');
          })
          .catch(error => {
            console.error('❌ Erro ao fazer logout:', error);
            if (window.Snackbar) {
              window.Snackbar({
                message: 'Erro ao fazer logout. Tente novamente.',
                type: 'error'
              });
            } else {
              alert('Erro ao fazer logout. Tente novamente.');
            }
          });
      } catch (error) {
        console.error('❌ Erro ao preparar logout:', error);
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Erro ao preparar logout. Tente novamente.',
            type: 'error'
          });
        } else {
          alert('Erro ao preparar logout. Tente novamente.');
        }
      }
    }
  };

  // Função para copiar ID do orçamento
  window.copyBudgetId = (budgetId) => {
    navigator.clipboard.writeText(budgetId).then(() => {
      // Mostrar notificação de sucesso
      if (window.Snackbar) {
        window.Snackbar({
          message: 'ID do orçamento copiado para a área de transferência!',
          type: 'success'
        });
      } else {
        alert('ID do orçamento copiado para a área de transferência!');
      }
    }).catch(err => {
      console.error('Erro ao copiar ID:', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = budgetId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      if (window.Snackbar) {
        window.Snackbar({
          message: 'ID do orçamento copiado para a área de transferência!',
          type: 'success'
        });
      } else {
        alert('ID do orçamento copiado para a área de transferência!');
      }
    });
  };

  // Função para trocar de orçamento
  window.switchToBudget = async (budgetId) => {
    try {
      const budget = budgets.find(b => b.id === budgetId);
      if (!budget) {
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Orçamento não encontrado.',
            type: 'error'
          });
        } else {
          alert('Orçamento não encontrado.');
        }
        return;
      }

      // Verificar se o usuário tem acesso ao orçamento
      const currentUser = window.appState?.currentUser;
      if (!currentUser) {
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Você precisa estar logado para trocar de orçamento.',
            type: 'error'
          });
        } else {
          alert('Você precisa estar logado para trocar de orçamento.');
        }
        return;
      }

      // Verificar se é o proprietário ou tem acesso compartilhado
      const isOwner = budget.userId === currentUser.uid;
      const hasSharedAccess = budget.usuariosPermitidos && budget.usuariosPermitidos.includes(currentUser.uid);

      console.log('🔍 Debug switchToBudget:', {
        budgetId,
        budgetName: budget.nome,
        currentUserUid: currentUser.uid,
        budgetUserId: budget.userId,
        isOwner,
        usuariosPermitidos: budget.usuariosPermitidos,
        hasSharedAccess
      });

      if (!isOwner && !hasSharedAccess) {
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Você não tem acesso a este orçamento.',
            type: 'error'
          });
        } else {
          alert('Você não tem acesso a este orçamento.');
        }
        return;
      }

      // Trocar para o orçamento
      if (window.setCurrentBudget) {
        await window.setCurrentBudget(budget);

        if (window.Snackbar) {
          window.Snackbar({
            message: `Orçamento "${budget.nome}" selecionado com sucesso!`,
            type: 'success'
          });
        } else {
          alert(`Orçamento "${budget.nome}" selecionado com sucesso!`);
        }

        // Aguardar um pouco para os listeners carregarem os dados
        setTimeout(async () => {
          console.log('🔄 Navegando para dashboard após troca de orçamento...');
          
          // Navegar para o dashboard automaticamente
          if (window.router) {
            window.router('/dashboard');
          }
          
          // Forçar atualização de todas as abas
          if (window.refreshCurrentView) {
            window.refreshCurrentView();
          }
          
          // Atualizar navegação por swipe se existir
          if (window.SwipeNavigation && window.SwipeNavigation.updateCurrentTabIndex) {
            window.SwipeNavigation.updateCurrentTabIndex('/dashboard');
          }
          
          console.log('✅ Navegação para dashboard concluída!');
        }, 1500);
      } else {
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Erro ao trocar de orçamento.',
            type: 'error'
          });
        } else {
          alert('Erro ao trocar de orçamento.');
        }
      }
    } catch (error) {
      console.error('Erro ao trocar de orçamento:', error);
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro ao trocar de orçamento.',
          type: 'error'
        });
      } else {
        alert('Erro ao trocar de orçamento.');
      }
    }
  };

  // Atualizar botão de instalação do PWA
  setTimeout(() => {
    if (typeof window.updateInstallButton === 'function') {
      window.updateInstallButton();
    }
  }, 100);

  // Configurar notificações
  setTimeout(() => {
    if (typeof window.setupNotifications === 'function') {
      window.setupNotifications();
    }
  }, 200);



  // Adicionar seção de configurações personalizáveis
  const configSection = document.createElement('div');
  configSection.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
          <span class="text-purple-600 dark:text-purple-400 text-lg">🎨</span>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Personalização</h3>
      </div>
      
      <div class="space-y-4">
        <!-- Alertas Personalizados -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">⚠️ Alertas de Limite</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Configurar quando receber alertas</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="70" checked class="text-purple-600">
              <span class="text-sm">70% do limite (Recomendado)</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="80" class="text-purple-600">
              <span class="text-sm">80% do limite</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="90" class="text-purple-600">
              <span class="text-sm">90% do limite</span>
            </label>
          </div>
        </div>

        <!-- Cores Personalizadas -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">🎨 Tema de Cores</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Escolher cores preferidas</div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('blue')"></button>
            <button class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('green')"></button>
            <button class="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('purple')"></button>
            <button class="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('orange')"></button>
          </div>
        </div>

        <!-- Widgets Personalizáveis -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">📱 Widgets do Dashboard</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar apenas o que importa</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="summary" checked class="text-purple-600">
              <span class="text-sm">Card de resumo rápido</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="chart" checked class="text-purple-600">
              <span class="text-sm">Gráfico de categorias</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="progress" checked class="text-purple-600">
              <span class="text-sm">Barras de progresso</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="tips" class="text-purple-600">
              <span class="text-sm">Dicas personalizadas</span>
            </label>
          </div>
        </div>

        <!-- Notificações Inteligentes -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">🔔 Notificações Inteligentes</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Configurar horários preferidos</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="limitAlerts" checked class="text-purple-600">
              <span class="text-sm">Alertas de limite</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="recurringReminders" class="text-purple-600">
              <span class="text-sm">Lembretes de recorrentes</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="weeklySummary" class="text-purple-600">
              <span class="text-sm">Resumo semanal</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="financialTips" class="text-purple-600">
              <span class="text-sm">Dicas financeiras</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Adicionar a seção antes do fechamento
  content.appendChild(configSection);

  // Funções para configurações personalizáveis
  window.setThemeColor = function(color, showNotification = true) {
    localStorage.setItem('themeColor', color);
    document.documentElement.setAttribute('data-theme-color', color);
    
    // Aplicar cores CSS customizadas
    const root = document.documentElement;
    const colors = {
      blue: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
      green: { primary: '#10B981', secondary: '#059669', accent: '#D1FAE5' },
      purple: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#EDE9FE' },
      orange: { primary: '#F59E0B', secondary: '#D97706', accent: '#FEF3C7' }
    };
    
    if (colors[color]) {
      root.style.setProperty('--primary-color', colors[color].primary);
      root.style.setProperty('--secondary-color', colors[color].secondary);
      root.style.setProperty('--accent-color', colors[color].accent);
    }
    
    // Só mostrar notificação se solicitado (não durante carregamento inicial)
    if (showNotification && window.Snackbar) {
      window.Snackbar({
        message: `Tema ${color} aplicado com sucesso!`,
        type: 'success'
      });
    }
  };

  // Carregar configurações salvas
  window.loadUserSettings = function() {
    // Proteção contra múltiplas execuções
    if (window.loadUserSettings.isLoading) {
      return;
    }
    window.loadUserSettings.isLoading = true;
    
    const settings = {
      alertThreshold: localStorage.getItem('alertThreshold') || '70',
      themeColor: localStorage.getItem('themeColor') || 'blue',
      dashboardWidgets: JSON.parse(localStorage.getItem('dashboardWidgets') || '{"summary": true, "chart": true, "progress": true, "tips": false}'),
      smartNotifications: JSON.parse(localStorage.getItem('smartNotifications') || '{"limitAlerts": true, "recurringReminders": false, "weeklySummary": false, "financialTips": false}')
    };
    
    // Aplicar configurações
    const alertRadio = document.querySelector(`input[name="alerta-limite"][value="${settings.alertThreshold}"]`);
    if (alertRadio) alertRadio.checked = true;
    window.setThemeColor(settings.themeColor, false); // false = não mostrar notificação
    
    // Aplicar widgets
    Object.keys(settings.dashboardWidgets).forEach(key => {
      const checkbox = document.querySelector(`input[data-widget="${key}"]`);
      if (checkbox) {
        checkbox.checked = settings.dashboardWidgets[key];
      }
    });
    
    // Aplicar notificações
    Object.keys(settings.smartNotifications).forEach(key => {
      const checkbox = document.querySelector(`input[data-notification="${key}"]`);
      if (checkbox) {
        checkbox.checked = settings.smartNotifications[key];
      }
    });
    
    // Reset da flag de proteção
    setTimeout(() => {
      window.loadUserSettings.isLoading = false;
    }, 100);
    
    return settings;
  };

  // Salvar configurações
  window.saveUserSettings = function() {
    const alertRadio = document.querySelector('input[name="alerta-limite"]:checked');
    const alertThreshold = alertRadio ? alertRadio.value : '70';
    const themeColor = localStorage.getItem('themeColor') || 'blue';
    
    const summaryCheckbox = document.querySelector('input[data-widget="summary"]');
    const chartCheckbox = document.querySelector('input[data-widget="chart"]');
    const progressCheckbox = document.querySelector('input[data-widget="progress"]');
    const tipsCheckbox = document.querySelector('input[data-widget="tips"]');
    
    const dashboardWidgets = {
      summary: summaryCheckbox ? summaryCheckbox.checked : false,
      chart: chartCheckbox ? chartCheckbox.checked : false,
      progress: progressCheckbox ? progressCheckbox.checked : false,
      tips: tipsCheckbox ? tipsCheckbox.checked : false
    };
    
    const limitAlertsCheckbox = document.querySelector('input[data-notification="limitAlerts"]');
    const recurringRemindersCheckbox = document.querySelector('input[data-notification="recurringReminders"]');
    const weeklySummaryCheckbox = document.querySelector('input[data-notification="weeklySummary"]');
    const financialTipsCheckbox = document.querySelector('input[data-notification="financialTips"]');
    
    const smartNotifications = {
      limitAlerts: limitAlertsCheckbox ? limitAlertsCheckbox.checked : false,
      recurringReminders: recurringRemindersCheckbox ? recurringRemindersCheckbox.checked : false,
      weeklySummary: weeklySummaryCheckbox ? weeklySummaryCheckbox.checked : false,
      financialTips: financialTipsCheckbox ? financialTipsCheckbox.checked : false
    };
    
    // Salvar no localStorage
    localStorage.setItem('alertThreshold', alertThreshold);
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('dashboardWidgets', JSON.stringify(dashboardWidgets));
    localStorage.setItem('smartNotifications', JSON.stringify(smartNotifications));
    
    // Salvar no Firestore se usuário estiver logado
    if (window.appState?.currentUser) {
      const userSettings = {
        userId: window.appState.currentUser.uid,
        alertThreshold: parseInt(alertThreshold),
        themeColor,
        dashboardWidgets,
        smartNotifications,
        updatedAt: new Date()
      };
      
      // Salvar no Firestore
      const settingsRef = doc(db, 'userSettings', window.appState.currentUser.uid);
      setDoc(settingsRef, userSettings, { merge: true })
        .then(() => {
          console.log('✅ Configurações salvas no Firestore');
          if (window.Snackbar) {
            window.Snackbar({
              message: 'Configurações salvas com sucesso!',
              type: 'success'
            });
          }
        })
        .catch(error => {
          console.error('❌ Erro ao salvar configurações:', error);
        });
    }
  };

  // Função para configurar o botão de notificações
  window.setupNotificationButton = function() {
    const btn = document.getElementById('notification-toggle-btn');
    const icon = document.getElementById('notification-icon');
    const status = document.getElementById('notification-status');
    
    if (!btn || !icon || !status) return;
    
    // Verificar status atual das notificações
    const updateNotificationStatus = () => {
      const permission = Notification.permission;
      const enabled = localStorage.getItem('notifications-enabled') === 'true';
      
      if (permission === 'granted' && enabled) {
        icon.textContent = '🔔';
        status.classList.remove('hidden');
      } else {
        icon.textContent = '🔕';
        status.classList.add('hidden');
      }
    };
    
    // Configurar evento de clique
    btn.onclick = async () => {
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
  };

  // Adicionar event listeners para salvar automaticamente
  setTimeout(() => {
    // Alertas de limite
    document.querySelectorAll('input[name="alerta-limite"]').forEach(radio => {
      radio.addEventListener('change', window.saveUserSettings);
    });
    
    // Widgets do dashboard
    document.querySelectorAll('input[data-widget]').forEach(checkbox => {
      checkbox.addEventListener('change', window.saveUserSettings);
    });
    
    // Notificações inteligentes
    document.querySelectorAll('input[data-notification]').forEach(checkbox => {
      checkbox.addEventListener('change', window.saveUserSettings);
    });
    
    // Configurar botão de notificações
    window.setupNotificationButton();
    
    // Carregar configurações salvas
    window.loadUserSettings();
  }, 500);

  // Função para confirmar saída de orçamento compartilhado
  window.confirmLeaveBudget = function(budgetId, budgetName) {
    if (confirm(`Tem certeza que deseja sair do orçamento "${budgetName}"?\n\n⚠️ Esta ação não pode ser desfeita e você perderá acesso a todos os dados deste orçamento.`)) {
      window.leaveSharedBudget(budgetId).then(async () => {
        // Recarregar a página de configurações
        await window.renderSettings();
      }).catch(error => {
        console.error('Erro ao sair do orçamento:', error);
      });
    }
  };

  // Função para confirmar remoção de usuário
  window.confirmRemoveUser = function(budgetId, userId, userEmail) {
    if (confirm(`Tem certeza que deseja remover o usuário "${userEmail}" do orçamento?\n\n⚠️ Esta ação não pode ser desfeita e o usuário perderá acesso a todos os dados deste orçamento.`)) {
      window.removeUserFromBudget(budgetId, userId).then(async () => {
        // Recarregar a página de configurações
        await window.renderSettings();
      }).catch(error => {
        console.error('Erro ao remover usuário:', error);
      });
    }
  };

  // Função para controlar dropdown de reset
  window.toggleResetDropdown = function(budgetId) {
    const dropdown = document.getElementById(`reset-dropdown-${budgetId}`);
    const allDropdowns = document.querySelectorAll('[id^="reset-dropdown-"]');
    
    // Fechar todos os outros dropdowns
    allDropdowns.forEach(d => {
      if (d.id !== `reset-dropdown-${budgetId}`) {
        d.classList.add('hidden');
      }
    });
    
    // Toggle do dropdown atual
    dropdown.classList.toggle('hidden');
    
    // Fechar dropdown ao clicar fora
    if (!dropdown.classList.contains('hidden')) {
      setTimeout(() => {
        const closeDropdown = (e) => {
          if (!dropdown.contains(e.target) && !e.target.closest(`[onclick*="toggleResetDropdown('${budgetId}')"]`)) {
            dropdown.classList.add('hidden');
            document.removeEventListener('click', closeDropdown);
          }
        };
        document.addEventListener('click', closeDropdown);
      }, 100);
    }
  };

  // Função para confirmar reset apenas de transações
  window.confirmResetTransactions = function(budgetId, budgetName) {
    if (confirm(`Tem certeza que deseja resetar apenas as transações do orçamento "${budgetName}"?\n\n⚠️ Esta ação irá remover APENAS as transações, mantendo categorias e recorrentes.\n\nEsta ação não pode ser desfeita.`)) {
      window.resetTransactionsOnly(budgetId).then(async () => {
        // Recarregar a página de configurações
        await window.renderSettings();
      }).catch(error => {
        console.error('Erro ao resetar transações:', error);
      });
    }
  };

  // Função para confirmar reset apenas de categorias
  window.confirmResetCategories = function(budgetId, budgetName) {
    if (confirm(`Tem certeza que deseja resetar apenas as categorias do orçamento "${budgetName}"?\n\n⚠️ Esta ação irá remover APENAS as categorias personalizadas, mantendo transações e recorrentes.\n\nATENÇÃO: As categorias padrão serão recriadas automaticamente.\n\nEsta ação não pode ser desfeita.`)) {
      window.resetCategoriesOnly(budgetId).then(async () => {
        // Recarregar a página de configurações
        await window.renderSettings();
      }).catch(error => {
        console.error('Erro ao resetar categorias:', error);
      });
    }
  };

  // Função para confirmar reset de orçamento completo
  window.confirmResetBudget = function(budgetId, budgetName) {
    if (confirm(`Tem certeza que deseja resetar completamente o orçamento "${budgetName}"?\n\n⚠️ Esta ação irá remover TODAS as transações e recorrentes, mas manterá o orçamento e suas categorias.\n\nEsta ação não pode ser desfeita.`)) {
      window.resetBudget(budgetId).then(async () => {
        // Recarregar a página de configurações
        await window.renderSettings();
      }).catch(error => {
        console.error('Erro ao resetar orçamento:', error);
      });
    }
  };

  // Função para confirmar exclusão de orçamento
  window.confirmDeleteBudget = function(budgetId, budgetName) {
    if (confirm(`Tem certeza que deseja excluir o orçamento "${budgetName}"?\n\n⚠️ Esta ação não pode ser desfeita e você perderá todos os dados deste orçamento.`)) {
      window.deleteBudget(budgetId).then(async () => {
        // Recarregar a página de configurações
        await window.renderSettings();
      }).catch(error => {
        console.error('Erro ao excluir orçamento:', error);
      });
    }
  };

  // Configurar o botão de tema após renderizar a página (apenas se estiver na página de configurações)
  setTimeout(() => {
    const currentRoute = window.location.hash.replace('#', '') || '/';
    if (currentRoute === '/settings') {
      console.log('SettingsPage: Configurando botão de tema...');
      if (window.setupThemeToggle) {
        window.setupThemeToggle();
      }
    }
  }, 100);
}
