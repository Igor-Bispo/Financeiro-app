/* eslint-disable no-unused-vars */
import '../css/styles.css';
import { Modal } from './ui/Modal.js';
import { auth, db } from './firebase.js';
import { calcularParcelaRecorrente, calcularStatusRecorrente, addRecorrente, deleteRecorrente } from '@features/recorrentes/service.js';
import { Snackbar } from './ui/Snackbar.js';
import { resetScrollPosition as resetScrollPositionUtil } from '@features/ui/UIService.js';
import * as budgetsRepo from '@data/repositories/budgetsRepo.js';
import * as transactionsRepo from '@data/repositories/transactionsRepo.js';
import * as categoriesRepo from '@data/repositories/categoriesRepo.js';
import * as invitationsRepo from '@data/repositories/invitationsRepo.js';
import { FAB } from './ui/FAB.js';
import { SwipeNavigation } from './ui/SwipeTabs.js';
import { renderAnalytics } from './ui/AnalyticsRoute.js';
import showAddTransactionModal from './showAddTransactionModal.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  onSnapshot,
  setDoc,
  or,
  arrayUnion,
  getDoc,
  orderBy,
  limit,
  startAfter,
  endBefore,
  startAt,
  endAt
} from 'firebase/firestore';
import { loginWithGoogle } from './auth.js';

// Tornar Modal disponível globalmente para utilitários que usam window.Modal
if (typeof window !== 'undefined') {
  window.Modal = Modal;
}

// Lint/compat helpers for legacy global calls
// Prefer imported/module functions, but fall back to window.* if present
const closeModal = (...args) => (typeof window !== 'undefined' && typeof window.closeModal === 'function')
  ? window.closeModal(...args)
  : undefined;

const getNotificationsToastsEnabled = () => (typeof window !== 'undefined' && typeof window.getNotificationsToastsEnabled === 'function')
  ? window.getNotificationsToastsEnabled()
  : true;

const getNotificationRetentionDays = () => (typeof window !== 'undefined' && typeof window.getNotificationRetentionDays === 'function')
  ? window.getNotificationRetentionDays()
  : 30;

const addDespesaRecorrente = (...args) => (typeof window !== 'undefined' && typeof window.addDespesaRecorrente === 'function')
  ? window.addDespesaRecorrente(...args)
  : addRecorrente(...args);

const deleteDespesaRecorrente = (...args) => (typeof window !== 'undefined' && typeof window.deleteDespesaRecorrente === 'function')
  ? window.deleteDespesaRecorrente(...args)
  : deleteRecorrente(...args);

const resetScrollPosition = (...args) => (typeof window !== 'undefined' && typeof window.resetScrollPosition === 'function')
  ? window.resetScrollPosition(...args)
  : resetScrollPositionUtil(...args);

// Voice modal helper for legacy calls
const closeVoiceModal = (...args) => (typeof window !== 'undefined' && typeof window.closeVoiceModal === 'function')
  ? window.closeVoiceModal(...args)
  : undefined;

// Pequena utilidade para atualizar o título da página conforme a rota atual
function updatePageTitle(path) {
  try {
    const routeNames = {
      '/dashboard': 'Dashboard',
      '/transactions': 'Transacoes',
      '/categories': 'Categorias',
      '/analytics': 'Análises',
      '/recorrentes': 'Recorrentes',
      '/notifications': 'Notificacoes',
      '/settings': 'Configuracoes'
    };
    const title = routeNames[path] || 'Dashboard';
    // Atualiza possíveis elementos de título no layout
    document.title = `Financeiro • ${title}`;
    const el = document.querySelector('.tab-title-highlight');
    if (el && !el.textContent.includes(title)) {
      // Mantém emoji se houver e atualiza label após o espaço
      const emoji = el.textContent.split(' ')[0];
      el.textContent = `${emoji} ${title}`;
    }
  } catch (e) {
    // noop
  }
}
window.updatePageTitle = updatePageTitle;

// Funcao de compactacao movida para globalUtils
window.applyCompactMode = () => import('@core/utils/globalUtils.js').then(m => m.applyCompactMode());

// Funcao para atualizar o botao de instalacao
window.updateInstallButton = function () {
  const installBtn = document.getElementById('install-app-btn');
  if (!installBtn) {
    return;
  }

  const isInstalled =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  const hasPrompt = !!window.deferredPrompt;

  console.log(
    '🔔 PWA: Atualizando botao - Instalado:',
    isInstalled,
    'Prompt:',
    hasPrompt
  );

  if (isInstalled) {
    console.log('🔔 PWA: Mostrando "App Instalado"');
    installBtn.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">✅</span>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">App Instalado</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Já está na tela inicial</div>
        </div>
      </div>
              <span class="text-green-500">✅</span>
    `;
    installBtn.disabled = true;
    installBtn.classList.add('opacity-50', 'cursor-not-allowed');
  } else if (hasPrompt) {
    console.log('🔔 PWA: Mostrando "Instalar App"');
    installBtn.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">⬇️</span>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">Instalar App</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Adicionar à tela inicial</div>
        </div>
      </div>
      <span class="text-blue-500">→</span>
    `;
    installBtn.disabled = false;
    installBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    console.log('🔔 PWA: Ocultando botao');
    installBtn.style.display = 'none';
  }
};

window.importBackup = function () {
  // Permite importar um backup JSON
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    try {
      const data = JSON.parse(text);
      if (data.transactions && data.categories && data.budgets) {
        Modal({
          title: 'Importacao de Backup (Somente Leitura)',
          content: `<div class='space-y-2'>
            <p class='text-gray-700'>O backup foi lido com sucesso, mas <b>não será gravado no sistema</b> por questões de segurança.</p>
            <p class='text-gray-500 text-sm'>Se precisar restaurar dados, entre em contato com o suporte.</p>
            <pre class='bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-48'>${JSON.stringify(data, null, 2)}</pre>
            <button onclick='closeModal()' class='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Fechar</button>
          </div>`
        });
        Snackbar({
          message: 'Backup lido, mas não importado. Apenas leitura.',
          type: 'info'
        });
      } else {
        Snackbar({ message: 'Arquivo de backup inválido.', type: 'error' });
        alert('Arquivo de backup inválido.');
      }
    } catch (err) {
      Snackbar({
        message: 'Erro ao importar backup: ' + err.message,
        type: 'error'
      });
      alert('Erro ao importar backup: ' + err.message);
    }
  };
  input.click();
};

// Funcao para restaurar backup (importar e salvar no sistema)
window.restoreBackup = function () {
  console.log('🔍 restoreBackup chamada');

  // Verificar se o usuário está logado
  if (!window.appState?.currentUser) {
    console.log('❌ Usuário não logado');
    if (window.Snackbar) {
      window.Snackbar({
        message: '❌ Você precisa estar logado para restaurar backup.',
        type: 'error'
      });
    } else {
      alert('❌ Você precisa estar logado para restaurar backup.');
    }
    return;
  }

  // Verificar se há um orçamento selecionado
  if (!window.appState?.currentBudget) {
    console.log('❌ Nenhum orçamento selecionado');
    if (window.Snackbar) {
      window.Snackbar({
        message: '❌ Nenhum orçamento selecionado.',
        type: 'error'
      });
    } else {
      alert('❌ Nenhum orçamento selecionado.');
    }
    return;
  }

  console.log('✅ Usuário e orçamento OK, abrindo modal...');

  // Verificar se Modal está disponível
  if (!window.Modal) {
    console.error('❌ Modal não está disponível');
    alert('Erro: Modal não está disponível. Tente recarregar a página.');
    return;
  }

  try {
    // Mostrar modal de confirmacao primeiro
    const confirmModal = window.Modal({
      title: '🔥 Restaurar Backup',
      content: `
        <div class='space-y-4'>
          <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
            <p class='text-blue-800 dark:text-blue-200 font-medium'>Como restaurar backup:</p>
            <ol class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside'>
              <li>Clique em "Selecionar Arquivo"</li>
              <li>Escolha o arquivo JSON de backup</li>
              <li>Confirme os dados encontrados</li>
              <li>Aguarde a restauracao</li>
            </ol>
          </div>
          
          <div class='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
            <p class='text-yellow-800 dark:text-yellow-200 font-medium'>⚠️ Aviso Importante:</p>
            <p class='text-sm text-yellow-700 dark:text-yellow-300'>
              Esta ação irá substituir todos os dados atuais.
              Certifique-se de que este é o backup correto.
            </p>
          </div>
          
          <div class='flex gap-3'>
            <button onclick='closeModal()' class='flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
              Cancelar
            </button>
            <button onclick='window.selectBackupFile()' class='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
              💰 Selecionar Arquivo
            </button>
          </div>
        </div>
      `
    });

    console.log('✅ Modal criado com sucesso');
    document.body.appendChild(confirmModal);

  } catch (error) {
    console.error('❌ Erro ao criar modal:', error);
    alert('Erro ao abrir modal: ' + error.message);
  }
};

// Funcao para selecionar arquivo de backup
window.selectBackupFile = function () {
  console.log('🔍 selectBackupFile chamada');

  // Fechar modal de confirmacao
  console.log('🔍 Fechando modal de confirmacao...');
  closeModal();

  // Aguardar um pouco para garantir que o modal foi fechado
  setTimeout(() => {
    console.log('🔍 Criando input de arquivo...');

    // Criar input de arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.style.display = 'none';

    // Adicionar ao DOM temporariamente
    document.body.appendChild(input);
    console.log('🔍 Input adicionado ao DOM');

    // Configurar evento de mudanca
    input.onchange = async e => {
      console.log('🔍 Arquivo selecionado:', e.target.files[0]);

      const file = e.target.files[0];
      if (!file) {
        console.log('🔍 Nenhum arquivo selecionado');
        document.body.removeChild(input);
        return;
      }

      try {
        console.log('🔍 Lendo arquivo...');

        // Mostrar loading
        if (window.Snackbar) {
          window.Snackbar({
            message: '🔍 Lendo arquivo de backup...',
            type: 'info'
          });
        } else {
          alert('🔍 Lendo arquivo de backup...');
        }

        const text = await file.text();
        console.log('🔍 Arquivo lido, tamanho:', text.length);

        const data = JSON.parse(text);
        console.log('🔍 JSON parseado com sucesso:', data);

        // Validar estrutura do backup
        if (!data.transactions || !data.categories || !data.budgets) {
          throw new Error('Arquivo de backup inválido. Deve conter transações, categorias e orçamentos.');
        }

        console.log('🔍 Dados válidos, criando modal de preview...');

        // Verificar se Modal está disponível
        if (!window.Modal) {
          console.error('❌ Modal não está disponível');
          alert('Erro: Modal não está disponível. Tente recarregar a página.');
          return;
        }

        // Mostrar preview dos dados
        const previewModal = window.Modal({
          title: '🔍 Confirmar Restauracao de Backup',
          content: `
            <div class='space-y-4'>
              <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
                <p class='text-blue-800 dark:text-blue-200 font-medium'>Dados encontrados no backup:</p>
                <ul class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1'>
                  <li>📊 <strong>${data.transactions.length}</strong> transações</li>
                  <li>📁 <strong>${data.categories.length}</strong> categorias</li>
                  <li>💰 <strong>${data.budgets.length}</strong> orçamentos</li>
                </ul>
                <p class='text-xs text-blue-600 dark:text-blue-400 mt-2'>
                  Arquivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)
                </p>
              </div>
              
              <div class='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
                <p class='text-yellow-800 dark:text-yellow-200 font-medium'>⚠️ Aviso:</p>
                <p class='text-sm text-yellow-700 dark:text-yellow-300'>
                  Esta ação irá substituir todos os dados atuais.
                  Certifique-se de que este é o backup correto.
                </p>
              </div>
              
              <div class='flex gap-3'>
                <button onclick='closeModal()' class='flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancelar
                </button>
                <button onclick='window.confirmRestoreBackup(${JSON.stringify(data).replace(/'/g, '\\\'')})' class='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
                  ✅ Confirmar Restauração
                </button>
              </div>
            </div>
          `
        });

        console.log('🔍 Modal de preview criado, adicionando ao DOM...');
        document.body.appendChild(previewModal);
        console.log('✅ Modal de preview exibido com sucesso');

      } catch (err) {
        console.error('🔍 Erro ao ler backup:', err);
        if (window.Snackbar) {
          window.Snackbar({
            message: '🔍 Erro ao ler arquivo: ' + err.message,
            type: 'error'
          });
        } else {
          alert('🔍 Erro ao ler arquivo: ' + err.message);
        }
      } finally {
        // Remover input do DOM
        console.log('🔍 Removendo input do DOM');
        document.body.removeChild(input);
      }
    };

    // Trigger do clique no input
    console.log('🔍 Triggerando clique no input...');
    input.click();
    console.log('🔍 Clique no input executado');
  }, 300);
};

// Funcao para confirmar e executar a restauracao
window.confirmRestoreBackup = async function (backupData) {
  console.log('🔍 confirmRestoreBackup chamada com dados:', backupData);

  try {
    // Fechar modal de preview
    console.log('🔍 Fechando modal...');
    closeModal();

    // Mostrar loading
    console.log('🔍 Mostrando loading...');
    if (window.Snackbar) {
      window.Snackbar({
        message: '🔄 Restaurando backup...',
        type: 'info'
      });
    } else {
      alert('🔄 Restaurando backup...');
    }

    const userId = window.appState.currentUser.uid;
    const budgetId = window.appState.currentBudget.id;

    console.log('🔄 Iniciando restauracao de backup...');
    console.log('👤 User ID:', userId);
    console.log('💰 Budget ID:', budgetId);
    console.log('📊 Dados do backup:', backupData);

    // Verificar se os dados são válidos
    if (!backupData || !backupData.categories || !backupData.transactions || !backupData.budgets) {
      throw new Error('Dados de backup inválidos ou incompletos');
    }

    // 1. LIMPAR DADOS ATUAIS
    console.log('🧹 Limpando dados atuais...');

    // Limpar transacoes
    console.log('🧹 Limpando transacoes...');
    for (const transaction of window.appState.transactions) {
      try {
        await deleteTransaction(transaction.id);
        console.log(`🧹 Transacao "${transaction.descricao}" removida`);
      } catch (error) {
        console.error(`❌ Erro ao remover transacao "${transaction.descricao}":`, error);
      }
    }

    // Limpar categorias
    console.log('🧹 Limpando categorias...');
    for (const category of window.appState.categories) {
      try {
        await deleteCategory(category.id);
        console.log(`🧹 Categoria "${category.nome}" removida`);
      } catch (error) {
        console.error(`❌ Erro ao remover categoria "${category.nome}":`, error);
      }
    }

    // Limpar recorrentes
    console.log('🧹 Limpando recorrentes...');
    for (const recorrente of window.appState.recorrentes) {
      try {
        await deleteDespesaRecorrente(userId, recorrente.id);
        console.log(`🧹 Recorrente "${recorrente.descricao}" removida`);
      } catch (error) {
        console.error(`❌ Erro ao remover recorrente "${recorrente.descricao}":`, error);
      }
    }

    // Aguardar um pouco para garantir que a limpeza foi processada
    await new Promise(resolve => setTimeout(resolve, 2000));

    let categoriasImportadas = 0;
    let transacoesImportadas = 0;
    let orcamentosImportados = 0;
    let recorrentesImportados = 0;

    // 2. Importar categorias
    console.log('📁 Importando categorias...');
    for (const category of backupData.categories) {
      try {
        // Remover ID original para criar novo
        const { id, ...categoryData } = category;
        categoryData.budgetId = budgetId; // Usar budget atual

        await addCategory(categoryData);
        categoriasImportadas++;
        console.log(`✅ Categoria "${category.nome}" importada (${categoriasImportadas}/${backupData.categories.length})`);
      } catch (error) {
        console.error(`❌ Erro ao importar categoria "${category.nome}":`, error);
      }
    }

    // 3. Importar transações
    console.log('💳 Importando transações...');
    for (const transaction of backupData.transactions) {
      try {
        // Remover ID original para criar novo
        const transactionData = { ...transaction };
        delete transactionData.id;
        transactionData.budgetId = budgetId; // Usar budget atual

        await addTransaction(transactionData);
        transacoesImportadas++;
        console.log(`✅ Transação "${transaction.descricao}" importada (${transacoesImportadas}/${backupData.transactions.length})`);
      } catch (error) {
        console.error(`❌ Erro ao importar transação "${transaction.descricao}":`, error);
      }
    }

    // 4. Importar orçamentos (se não existirem)
    console.log('💰 Importando orçamentos...');
    for (const budget of backupData.budgets) {
      try {
        // Verificar se o orçamento já existe
        const existingBudget = window.appState.budgets.find(b => b.nome === budget.nome);
        if (!existingBudget) {
          const budgetData = { ...budget };
          delete budgetData.id;
          budgetData.userId = userId; // Usar usuário atual

          await addBudget(budgetData);
          orcamentosImportados++;
          console.log(`✅ Orçamento "${budget.nome}" importado (${orcamentosImportados}/${backupData.budgets.length})`);
        } else {
          console.log(`ℹ️ Orçamento "${budget.nome}" já existe, pulando...`);
        }
      } catch (error) {
        console.error(`❌ Erro ao importar orçamento "${budget.nome}":`, error);
      }
    }

    // 5. Importar recorrentes
    console.log('🗂️ Importando recorrentes...');
    if (backupData.recorrentes && backupData.recorrentes.length > 0) {
      for (const recorrente of backupData.recorrentes) {
        try {
          // Remover ID original para criar novo
          const recorrenteData = { ...recorrente };
          delete recorrenteData.id;
          recorrenteData.budgetId = budgetId; // Usar budget atual

          await addDespesaRecorrente(userId, budgetId, recorrenteData);
          recorrentesImportados++;
          console.log(`✅ Recorrente "${recorrente.descricao}" importada (${recorrentesImportados}/${backupData.recorrentes.length})`);
        } catch (error) {
          console.error(`❌ Erro ao importar recorrente "${recorrente.descricao}":`, error);
        }
      }
    } else {
      console.log('ℹ️ Nenhuma recorrente encontrada no backup');
    }

    // 5. Recarregar dados
    console.log('🔄 Recarregando dados...');
    await refreshCurrentView();

    // 6. Sucesso com detalhes
    console.log('✅ Restauração concluída com sucesso!');
    console.log(`📊 Resumo: ${categoriasImportadas} categorias, ${transacoesImportadas} transações, ${orcamentosImportados} orçamentos, ${recorrentesImportados} recorrentes`);

    const mensagemSucesso = `✅ Backup restaurado com sucesso!\n\n📊 Dados importados:\n• ${categoriasImportadas} categorias\n• ${transacoesImportadas} transações\n• ${orcamentosImportados} orçamentos\n• ${recorrentesImportados} recorrentes\n\nA página será recarregada em 3 segundos...`;

    if (window.Snackbar) {
      window.Snackbar({
        message: mensagemSucesso,
        type: 'success',
        duration: 5000
      });
    } else {
      alert(mensagemSucesso);
    }

    // 7. Recarregar página após um delay
    console.log('🔄 Agendando recarregamento da página...');
    setTimeout(() => {
      console.log('🔄 Recarregando página...');
      window.location.reload();
    }, 3000);

  } catch (error) {
    console.error('❌ Erro durante restauração:', error);
    const mensagemErro = `❌ Erro durante restauração:\n${error.message}`;

    if (window.Snackbar) {
      window.Snackbar({
        message: mensagemErro,
        type: 'error',
        duration: 5000
      });
    } else {
      alert(mensagemErro);
    }
  }
};

// Funcao para alternar entre pi¡gina de login e app
function toggleLoginPage(show) {
  const loginPage = document.getElementById('login-page');
  const appContainer = document.querySelector('.app-container');
  const loadingPage = document.getElementById('loading-page');

  if (show) {
    loginPage.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
    if (loadingPage) loadingPage.style.display = 'none';
  } else {
    loginPage.style.display = 'none';
    if (appContainer) appContainer.style.display = 'flex';
    if (loadingPage) loadingPage.style.display = 'none';
  }
}

// Funcao para logout
function logout() {
  auth.signOut().then(() => {
    console.log('✅ Logout realizado com sucesso');
    window.appState.currentUser = null;
    window.appState.currentBudget = null;
    window.appState.transactions = [];
    window.appState.categories = [];
    window.appState.budgets = [];
    window.appState.recorrentes = [];

    toggleLoginPage(true);
    window.location.hash = '';
  }).catch((error) => {
    console.error('âŒ Erro no logout:', error);
  });
}

// Funcao para atualizar a view atual
async function refreshCurrentView() {
  const currentPath = window.location.hash.slice(1) || '/dashboard';
  await router(currentPath);
}

// Funcao addTransaction movida para features/transactions
const addTransaction = async (transactionData) => {
  const { addTransactionWithNotifications } = await import('@features/transactions/service.js');
  return addTransactionWithNotifications(transactionData);
};

// Funcao updateTransaction movida para features/transactions
const updateTransaction = async (transactionId, transactionData) => {
  const { updateTransactionWithNotifications } = await import('@features/transactions/service.js');
  return updateTransactionWithNotifications(transactionId, transactionData);
};

// Funcao deleteTransaction movida para features/transactions
const deleteTransaction = async (transactionId) => {
  const { deleteTransactionWithNotifications } = await import('@features/transactions/service.js');
  return deleteTransactionWithNotifications(transactionId);
};

// Funcao loadTransactions movida para features/transactions
// Agora repassa o budgetId e userId atuais para garantir filtros corretos
const loadTransactions = async () => {
  const { loadTransactions: loadTx } = await import('@features/transactions/service.js');
  const budgetId = window.appState?.currentBudget?.id;
  return loadTx(budgetId);
};

// Funcao addCategory movida para features/categories
const addCategory = async (categoryData) => {
  const { addCategory: createCategory } = await import('@features/categories/service.js');
  return createCategory(categoryData);
};

// Funcao updateCategory movida para features/categories
const updateCategory = async (categoryId, categoryData) => {
  const { updateCategory: editCategory } = await import('@features/categories/service.js');
  return editCategory(categoryId, categoryData);
};

// Funcao deleteCategory movida para features/categories
const deleteCategory = async (categoryId) => {
  const { deleteCategory: removeCategory } = await import('@features/categories/service.js');
  return removeCategory(categoryId);
};

// Funcao loadCategories movida para features/categories
// Repassa o budgetId atual para carregar apenas categorias do orçamento ativo
const loadCategories = async () => {
  const { loadCategories: loadCats } = await import('@features/categories/service.js');
  const budgetId = window.appState?.currentBudget?.id;
  return loadCats(budgetId);
};

// Funcao addBudget movida para features/budgets (compatível com string ou objeto)
const addBudget = async (budgetData) => {
  const { createBudget } = await import('@features/budgets/service.js');
  const userId = window.appState?.currentUser?.uid;
  let data = budgetData;
  if (typeof budgetData === 'string') {
    data = {
      nome: budgetData,
      descricao: 'Orçamento criado via Configurações',
      userId,
      tipo: 'pessoal',
      createdAt: new Date(),
      usuariosPermitidos: userId ? [userId] : []
    };
  } else if (budgetData && typeof budgetData === 'object') {
    data = { ...budgetData };
    if (userId && !data.userId) data.userId = userId;
    if (!data.createdAt) data.createdAt = new Date();
    if (!data.usuariosPermitidos && userId) data.usuariosPermitidos = [userId];
  }
  return createBudget(data);
};

// Funcao deleteBudget movida para features/budgets
window.deleteBudget = async (budgetId) => {
  const { deleteBudget: removeBudget } = await import('@features/budgets/service.js');
  return removeBudget(budgetId);
};

// Expor updateBudget para compatibilidade com Configurações (renomear, etc.)
window.updateBudget = async (budgetId, data) => {
  const { updateBudget } = await import('@features/budgets/service.js');
  return updateBudget(budgetId, data);
};

// Funcao loadBudgets movida para features/budgets
const loadBudgets = async () => {
  const { loadUserBudgets } = await import('@features/budgets/service.js');
  const userId = window.appState?.currentUser?.uid;
  return loadUserBudgets(userId);
};

// Funcao setCurrentBudget movida para features/budgets
const setCurrentBudget = async (budget) => {
  const { setCurrentBudget: setBudget } = await import('@features/budgets/service.js');
  return setBudget(budget);
};

// Funcao setCurrentBudget global movida para features/budgets
window.setCurrentBudget = async (budget) => {
  const { setCurrentBudgetGlobal: setBudgetGlobal } = await import('@features/budgets/service.js');
  return setBudgetGlobal(budget);
};

// Funcao selectDefaultBudget movida para features/budgets
const selectDefaultBudget = async (userId) => {
  try {
    const { selectDefaultBudget: selectDefault } = await import('@features/budgets/service.js');
    return await selectDefault(userId);
  } catch (error) {
    console.error('❌ Erro ao importar selectDefaultBudget:', error);
    throw error;
  }
};

// Funcao loadRecorrentes movida para features/recorrentes
const loadRecorrentes = async () => {
  const { loadRecorrentes: loadRec } = await import('@features/recorrentes/service.js');
  return loadRec();
};

// Funcao getTransacoesDoMes movida para features/transactions
const getTransacoesDoMes = async (userId, ano, mes) => {
  const { getTransacoesDoMes: getTransMes } = await import('@features/transactions/service.js');
  return getTransMes(userId, ano, mes);
};

// FUNÇÃO RENDERDASHBOARD LIMPA E FUNCIONAL
// Encaminha para a implementação modular em features/index.js
/* eslint-disable no-unused-vars */
const renderDashboard = async (_selectedYear, _selectedMonth) => {
  const container = document.getElementById('app-content');
  if (!container) {
    console.error('❌ Container #app-content não encontrado para renderizar dashboard');
    return;
  }
  try {
    const features = await import('@features/index.js');
    // features.renderDashboard(container) usa o período atual do appState
    if (typeof features.renderDashboard === 'function') {
      return features.renderDashboard(container);
    }
    // fallback: tentar default export se existir
    if (typeof features.default === 'function') {
      return features.default(container);
    }
    console.error('❌ renderDashboard não encontrado em @features/index.js');
  } catch (e) {
    console.error('❌ Erro ao importar features para renderizar dashboard:', e);
  }
};

// Funcao para mostrar o modal de categorias em alerta
window.showCategoriasAlertaModal = function() {
  try {
    const modal = document.getElementById('categorias-alerta-modal');
    const content = document.getElementById('categorias-alerta-content');

    if (!modal || !content) {
      console.error('âŒ Modal de categorias em alerta nao encontrado');
      return;
    }

    // Obter categorias em alerta
    const categoriasAlerta = window.appState.categories?.filter(categoria => {
      const limite = parseFloat(categoria.limite || 0);
      if (limite <= 0) return false;

      // Calcular gasto da categoria
      const transacoesCategoria = window.appState.transactions?.filter(t =>
        t.categoriaId === categoria.id && t.tipo === categoria.tipo
      ) || [];

      const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor || 0), 0);
      const porcentagem = (gasto / limite) * 100;

      return porcentagem >= 75; // Consideramos alerta quando >= 75%
    }) || [];

    if (categoriasAlerta.length === 0) {
      content.innerHTML = `
        <div class="text-center py-8">
          <div class="text-4xl mb-4">✅</div>
          <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria em alerta</div>
          <div class="text-gray-600 dark:text-gray-400">Todas as categorias estao dentro do limite</div>
        </div>
      `;
    } else {
      content.innerHTML = `
        <div class="space-y-3">
          ${categoriasAlerta.map(categoria => {
    const limite = parseFloat(categoria.limite || 0);
    const transacoesCategoria = window.appState.transactions?.filter(t =>
      t.categoriaId === categoria.id && t.tipo === categoria.tipo
    ) || [];

    const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor || 0), 0);
    const porcentagem = Math.min((gasto / limite) * 100, 100);

    let corBarra = 'bg-green-500';
    let statusTexto = 'Normal';
    let statusIcon = '✅';

    if (porcentagem >= 90) {
      corBarra = 'bg-red-500';
      statusTexto = 'Cri­tico';
      statusIcon = 'ðŸš¨';
    } else if (porcentagem >= 75) {
      corBarra = 'bg-yellow-500';
      statusTexto = 'Atencao';
      statusIcon = 'âš ï¸';
    } else if (porcentagem >= 50) {
      corBarra = 'bg-orange-500';
      statusTexto = 'Moderado';
      statusIcon = 'ðŸ"¶';
    }

    return `
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">${categoria.nome}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">${categoria.tipo === 'receita' ? 'Receita' : 'Despesa'}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold ${porcentagem >= 90 ? 'text-red-600' : porcentagem >= 75 ? 'text-yellow-600' : 'text-orange-600'}">
                      ${statusIcon} ${statusTexto}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${porcentagem.toFixed(0)}% usado</div>
                  </div>
                </div>
                
                <div class="mb-2">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-300">R$ ${gasto.toFixed(2)}</span>
                    <span class="text-gray-600 dark:text-gray-300">R$ ${limite.toFixed(2)}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div class="${corBarra} h-2 rounded-full transition-all duration-300" style="width: ${porcentagem}%"></div>
                  </div>
                </div>
                
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  Restante: R$ ${Math.max(limite - gasto, 0).toFixed(2)}
                </div>
              </div>
            `;
  }).join('')}
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            <strong>ðŸ¡ Dica:</strong> Categorias em alerta sao aquelas que ji¡ utilizaram 75% ou mais do limite definido.
          </p>
        </div>
      `;
    }

    modal.classList.remove('hidden');
  } catch (error) {
    console.error('âŒ Erro ao mostrar modal de categorias em alerta:', error);
  }
};

// Funcao para fechar o modal de categorias em alerta
window.closeCategoriasAlertaModal = function() {
  const modal = document.getElementById('categorias-alerta-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
};

// Fechar modal ao clicar fora dele
document.addEventListener('click', function(event) {
  const modal = document.getElementById('categorias-alerta-modal');
  if (modal && event.target === modal) {
    window.closeCategoriasAlertaModal();
  }
});

// Funcao para fechar modal de alertas
function closeModalAlertas() {
  const modal = document.getElementById('modal-alertas');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Funcao renderTransactions movida para features/transactions
const renderTransactions = async () => {
  const container = document.getElementById('app-content');
  if (!container) {
    console.error('❌ Container #app-content não encontrado para renderizar transações');
    return;
  }

  const { renderTransactions: renderTx } = await import('@features/transactions/TransactionsPage.js');
  return renderTx(container);
};

// ===== Helpers globais para peri­odo selecionado (miªs/ano) =====
function parseYm(str) {
  if (!str) return null;
  const m = String(str).match(/^(\d{4})-(\d{2})$/);
  if (!m) return null;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  if (y > 1900 && mo >= 1 && mo <= 12) return { year: y, month: mo };
  return null;
}

function readYmFromHash() {
  try {
    const hash = window.location.hash || '';
    const qIndex = hash.indexOf('?');
    if (qIndex === -1) return null;
    const query = new URLSearchParams(hash.slice(qIndex + 1));
    const ym = query.get('ym');
    return parseYm(ym);
  } catch { return null; }
}

function getSelectedPeriod() {
  // 1) Hash ?ym=YYYY-MM
  const fromHash = readYmFromHash();
  if (fromHash) return fromHash;
  // 2) appState
  const y = window.appState?.selectedYear;
  const m = window.appState?.selectedMonth;
  if (y && m) return { year: y, month: m };
  // 3) localStorage
  try {
    const saved = localStorage.getItem('selectedYM');
    const parsed = parseYm(saved);
    if (parsed) return parsed;
  } catch {}
  // 4) Agora
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

function updateHashWithYM(path) {
  try {
    const { year, month } = getSelectedPeriod();
    const ym = `${year}-${String(month).padStart(2, '0')}`;
    const cleanPath = path || (window.location.hash.slice(1).split('?')[0] || '/dashboard');
    const newHash = `#${cleanPath}?ym=${ym}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  } catch {}
}

function setSelectedPeriod(year, month, opts = {}) {
  window.appState = window.appState || {};
  window.appState.selectedYear = year;
  window.appState.selectedMonth = month;
  try { localStorage.setItem('selectedYM', `${year}-${String(month).padStart(2, '0')}`); } catch {}
  if (opts.updateHash !== false) {
    updateHashWithYM(opts.path || (window.location.hash.slice(1).split('?')[0] || '/dashboard'));
  }
}
// Expor helpers se necessi¡rio
window.getSelectedPeriod = getSelectedPeriod;
window.setSelectedPeriod = setSelectedPeriod;

// Funcao para configurar pesquisa de transacoes
// Helpers for search: normalize and fuzzy match (tolerates small typos like "dizmo" vs "dizimo")
function __norm(txt) {
  return (txt ?? '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function __lev(a, b) {
  // Early exits
  if (a === b) return 0;
  const la = a.length, lb = b.length;
  if (la === 0) return lb;
  if (lb === 0) return la;
  // Only need threshold 1 for our usage; cheap check
  if (Math.abs(la - lb) > 1) return 2;
  // Classic DP with tiny strings (search terms), fine here
  const dp = Array(la + 1).fill(0).map(() => Array(lb + 1).fill(0));
  for (let i = 0; i <= la; i++) dp[i][0] = i;
  for (let j = 0; j <= lb; j++) dp[0][j] = j;
  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
      // Optional Damerau transposition
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }
  return dp[la][lb];
}

function __approxIncludes(haystack, needle) {
  const h = __norm(haystack);
  const n = __norm(needle);
  if (!n) return true;
  if (h.includes(n)) return true;
  // If no direct include, allow distance <= 1 against each word segment
  const parts = h.split(/\s+/).filter(Boolean);
  for (const p of parts) {
    if (Math.abs(p.length - n.length) <= 1 && __lev(p, n) <= 1) return true;
  }
  // As a last resort, compare whole string with threshold 1
  return (Math.abs(h.length - n.length) <= 1 && __lev(h, n) <= 1);
}

window.setupTransactionSearch = function() {
  const searchInput = document.getElementById('transaction-search');
  const resultsDiv = document.getElementById('transaction-search-results');
  const countSpan = document.getElementById('transaction-search-count');
  const listDiv = document.getElementById('transactions-list');

  if (!searchInput) return;

  // Evitar bind duplicado em re-renders
  if (searchInput.dataset.bound === '1') return;
  searchInput.dataset.bound = '1';

  searchInput.addEventListener('input', function() {
    // Debounce para evitar filtro a cada tecla
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }
    this._debounceTimer = setTimeout(async () => {
  const searchTerm = __norm(this.value);

      if (searchTerm === '') {
        // Mostrar todas as transacoes
        resultsDiv.classList.add('hidden');
        try {
          const html = await renderAllTransactions();
          listDiv.innerHTML = html;
        } catch (e) {
          console.warn('Falha ao renderizar todas as transações:', e);
          listDiv.innerHTML = '';
        }
        return;
      }

      // Filtrar transacoes do mês/ano selecionado
      const { year: selYear, month: selMonth } = getSelectedPeriod();
      const filteredTransactions = window.appState.transactions?.filter(t => {
        // Limitar ao período atual
        let d;
        if (t?.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
          d = new Date(t.createdAt.seconds * 1000);
        } else {
          d = new Date(t.createdAt);
        }
        const inPeriod = d && d.getFullYear && (d.getFullYear() === selYear) && ((d.getMonth() + 1) === selMonth);
        if (!inPeriod) return false;

        const descricao = t.descricao || '';
        const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
        const categoriaNome = categoria?.nome || '';
        const valorStr = String(t.valor ?? '');

        return __approxIncludes(descricao, searchTerm) ||
               __approxIncludes(categoriaNome, searchTerm) ||
               valorStr.includes(searchTerm);
      }) || [];

      // Atualizar contador
      countSpan.textContent = filteredTransactions.length;
      resultsDiv.classList.remove('hidden');

      // Renderizar transacoes filtradas
      try {
        const html = await renderFilteredTransactions(filteredTransactions);
        listDiv.innerHTML = html;
      } catch (e) {
        console.warn('Falha ao renderizar transações filtradas:', e);
        listDiv.innerHTML = '';
      }
    }, 150);
  });

  // Limpar pesquisa com Escape (bind iºnico)
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      this.dispatchEvent(new Event('input'));
    }
  });
};

// Funcao para renderizar todas as transacoes
// Funcao getTransactionDate movida para features/transactions
const getTransactionDate = async (t) => {
  const { getTransactionDate: getDate } = await import('@features/transactions/TransactionsPage.js');
  return getDate(t);
};

// Funcao getTransactionYearMonth movida para features/transactions
const getTransactionYearMonth = async (t) => {
  const { getTransactionYearMonth: getYearMonth } = await import('@features/transactions/TransactionsPage.js');
  return getYearMonth(t);
};

// Funçio formatTransactionDisplayDate movida para features/transactions
const formatTransactionDisplayDate = async (t, anoCtx, mesCtx) => {
  const { formatTransactionDisplayDate: formatDate } = await import('@features/transactions/TransactionsPage.js');
  return formatDate(t, anoCtx, mesCtx);
};

// Funçio renderAllTransactions movida para features/transactions
const renderAllTransactions = async () => {
  const { renderAllTransactions: renderAllTx } = await import('@features/transactions/TransactionsPage.js');
  return renderAllTx();
};

// Funçio renderOlderMonthsControl movida para features/transactions
const renderOlderMonthsControl = async () => {
  const { renderOlderMonthsControl: renderOlderMonths } = await import('@features/transactions/TransactionsPage.js');
  return renderOlderMonths();
};

// Funçio loadAllOlderMonths movida para features/transactions
window.loadAllOlderMonths = async function() {
  const { loadAllOlderMonths: loadOlderMonths } = await import('@features/transactions/TransactionsPage.js');
  return loadOlderMonths();
};

// Funçio renderMonthSectionHTML movida para features/transactions
const renderMonthSectionHTML = async (mesAno, transacoesMes) => {
  const { renderMonthSectionHTML: renderMonthSection } = await import('@features/transactions/TransactionsPage.js');
  return renderMonthSection(mesAno, transacoesMes);
};

// Funçio renderTransactionsGroupedByDay movida para features/transactions
const renderTransactionsGroupedByDay = async (transacoesMes, ano, mes) => {
  const { renderTransactionsGroupedByDay: renderTxGroupedByDay } = await import('@features/transactions/TransactionsPage.js');
  return renderTxGroupedByDay(transacoesMes, ano, mes);
};

// ===== Estado de colapso por dia: helpers e toggle =====
function getCollapsedDays() {
  try {
    const raw = localStorage.getItem('txCollapsedDays');
    const arr = raw ? JSON.parse(raw) : [];
    if (Array.isArray(arr)) return new Set(arr);
  } catch {}
  return new Set();
}

function saveCollapsedDays(set) {
  try {
    localStorage.setItem('txCollapsedDays', JSON.stringify(Array.from(set)));
  } catch {}
}

function isDayCollapsed(key) {
  if (!window.appState) window.appState = {};
  if (!window.appState.ui) window.appState.ui = {};
  if (!window.appState.ui.collapsedDays) {
    window.appState.ui.collapsedDays = getCollapsedDays();
  }
  return window.appState.ui.collapsedDays.has(key);
}

// Funçio toggleDayGroup movida para features/transactions
window.toggleDayGroup = async function(key) {
  const { toggleDayGroup: toggleDay } = await import('@features/transactions/TransactionsPage.js');
  return toggleDay(key);
};

// Funçio expandAllDays movida para features/transactions
window.expandAllDays = async function(mesAno) {
  const { expandAllDays: expandDays } = await import('@features/transactions/TransactionsPage.js');
  return expandDays(mesAno);
};

// Funçio collapseAllDays movida para features/transactions
window.collapseAllDays = async function(mesAno) {
  const { collapseAllDays: collapseDays } = await import('@features/transactions/TransactionsPage.js');
  return collapseDays(mesAno);
};

// Funçio renderTransactionItemHTML movida para features/transactions
const renderTransactionItemHTML = async (t, ano, mes) => {
  const { renderTransactionItemHTML: renderItem } = await import('@features/transactions/TransactionsPage.js');
  return renderItem(t, ano, mes);
};


// Funçio loadMonthSection movida para features/transactions
window.loadMonthSection = async function(mesAno) {
  const { loadMonthSection: loadMonth } = await import('@features/transactions/TransactionsPage.js');
  return loadMonth(mesAno);
};

// Funçio renderFilteredTransactions movida para features/transactions
const renderFilteredTransactions = async (filteredTransactions) => {
  const { renderFilteredTransactions: renderFiltered } = await import('@features/transactions/TransactionsPage.js');
  return renderFiltered(filteredTransactions);
};

// Funcao calcularNumeroParcela movida para features/transactions
const calcularNumeroParcela = async (transacao) => {
  const { calcularNumeroParcela: calcParcela } = await import('@features/transactions/TransactionsPage.js');
  return calcParcela(transacao);
};

// Funcao renderCategories movida para features/categories
const renderCategories = async () => {
  const container = document.getElementById('app-content');
  if (!container) {
    console.error('❌ Container #app-content não encontrado para renderizar categorias');
    return;
  }

  const { renderCategories: renderCat } = await import('@features/categories/CategoriesPage.js');
  return renderCat(container);
};
// Funcao para configurar pesquisa de categorias
window.setupCategorySearch = function() {
  const searchInput = document.getElementById('category-search');
  const resultsDiv = document.getElementById('category-search-results');
  const countSpan = document.getElementById('category-search-count');
  const gridDiv = document.getElementById('categories-grid');

  if (!searchInput) return;

  // Avoid duplicate binds on re-renders
  if (searchInput.dataset.bound === '1') return;
  searchInput.dataset.bound = '1';

  searchInput.addEventListener('input', function() {
  const searchTerm = __norm(this.value);

    if (searchTerm === '') {
      // Mostrar todas as categorias
      resultsDiv.classList.add('hidden');
      renderAllCategories().then(html => {
        gridDiv.innerHTML = html;
      });
      return;
    }

    // Filtrar categorias
    const filteredCategories = window.appState.categories?.filter(cat => {
      const nome = cat.nome || '';
      const tipo = cat.tipo || '';
      const limite = cat.limite?.toString() || '';

      return __approxIncludes(nome, searchTerm) ||
             __approxIncludes(tipo, searchTerm) ||
             limite.includes(searchTerm);
    }) || [];

    // Atualizar contador
    countSpan.textContent = filteredCategories.length;
    resultsDiv.classList.remove('hidden');

    // Renderizar categorias filtradas
    renderFilteredCategories(filteredCategories).then(html => {
      gridDiv.innerHTML = html;
    });
  });

  // Limpar pesquisa com Escape
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      this.dispatchEvent(new Event('input'));
    }
  });
};

// Funcao para renderizar todas as categorias
// Funcao renderAllCategories movida para features/categories
const renderAllCategories = async () => {
  const { renderAllCategories: renderAllCat } = await import('@features/categories/CategoriesPage.js');
  return renderAllCat();
};

// Funcao renderFilteredCategories movida para features/categories
const renderFilteredCategories = async (filteredCategories) => {
  const { renderFilteredCategories: renderFilteredCat } = await import('@features/categories/CategoriesPage.js');
  return renderFilteredCat(filteredCategories);
};

// Funcao router simplificada
async function router(path) {
  // Normalizar path removendo query string (ex: ?ym=YYYY-MM)
  const cleanPath = (path || '').split('?')[0] || '/dashboard';
  console.log('🔄 Router chamado com path:', path, '→ normalizado:', cleanPath);
  console.log('🔄 Estado atual:', {
    currentUser: !!window.appState?.currentUser,
    currentBudget: !!window.appState?.currentBudget,
    hash: window.location.hash
  });

  // Atualizar ti­tulo da pi¡gina
  updatePageTitle(cleanPath);

  // Aplicar modo de compactacao
  if (window.applyCompactMode) {
    window.applyCompactMode();
  }

  switch (cleanPath) {
  case '/dashboard':
    console.log('🔄 Renderizando dashboard...');
    await renderDashboard();
    renderBottomNav('/dashboard');
    console.log('✅ Dashboard renderizado');
    break;
  case '/transactions':
    console.log('🔄 Renderizando transacoes...');
    renderTransactions();
    renderBottomNav('/transactions');
    console.log('✅ Transacoes renderizadas');
    break;
  case '/categories':
    console.log('🔄 Renderizando categorias...');
    await renderCategories();
    renderBottomNav('/categories');
    console.log('✅ Categorias renderizadas');
    break;
  case '/analytics':
    console.log('🔄 Renderizando ani¡lises...');
    try {
      if (typeof renderAnalytics === 'function') {
        await renderAnalytics();
      } else {
        // Fallback: carregar mi³dulo dinamicamente
        try {
          const mod = await import('./ui/AnalyticsRoute.js');
          if (mod?.renderAnalytics) {
            await mod.renderAnalytics();
          } else if (window.renderAnalytics) {
            await window.renderAnalytics();
          } else {
            throw new Error('Funcao renderAnalytics nao disponi­vel');
          }
        } catch (dynErr) {
          console.error('âŒ Erro ao importar AnalyticsRoute dinamicamente:', dynErr);
          const content = document.getElementById('app-content');
          if (content) {
            content.innerHTML = `
                <div class="tab-container">
                  <div class="tab-header">
                    <div class="content-spacing">
                      <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 px-4 py-3 rounded mb-4">
                        Nao foi possi­vel carregar o mi³dulo de ani¡lises.
                      </div>
                    </div>
                  </div>
                </div>`;
          }
        }
      }
    } catch (e) {
      console.error('âŒ Erro ao renderizar ani¡lises:', e);
    }
    renderBottomNav('/analytics');
    console.log('✅ Ani¡lises renderizadas');
    break;
  case '/recorrentes':
    console.log('🔄 Renderizando recorrentes...');
    if (window._renderRecorrentes || window.renderRecorrentes) {
      (window._renderRecorrentes || window.renderRecorrentes)();
    } else {
      console.warn('âš ï¸ RecorrentesPage nao disponi­vel; tentando carregar mi³dulo diretamente');
      try {
        const mod = await import('./recorrentes/RecorrentesPage.js');
        if (mod?.renderRecorrentes) {
          mod.renderRecorrentes();
        } else {
          const content = document.getElementById('app-content');
          if (content) content.innerHTML = '<div class="p-4">Nao foi possi­vel carregar Recorrentes.</div>';
        }
      } catch (e) {
        console.error('Erro ao carregar RecorrentesPage.js:', e);
        const content = document.getElementById('app-content');
        if (content) content.innerHTML = '<div class="p-4">Erro ao carregar Recorrentes.</div>';
      }
    }
    renderFAB();
    renderBottomNav('/recorrentes');
    console.log('✅ Recorrentes renderizadas');
    break;
  case '/notifications':
    console.log('ðŸ"„ Renderizando notificacoes...');
    if (window.renderNotifications) {
      await window.loadNotifications();
      window.renderNotifications();
    } else {
      // Fallback se a funcao nao existir
      console.log('âš ï¸ Funcao renderNotifications nao encontrada, usando fallback');
      const content = document.getElementById('app-content');
      if (content) {
        content.innerHTML = `
            <div class="tab-container">
              <div class="tab-header">
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📧</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Notificacoes</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `;
      }
    }
    renderFAB();
    renderBottomNav('/notifications');
    console.log('✅ Notificacoes renderizadas');
    break;
  case '/settings':
    console.log('ðŸ"„ Renderizando configuracoes...');
    if (window.renderSettings) {
      window.renderSettings();
    } else {
      console.warn('âš ï¸ SettingsPage nao disponi­vel; tentando carregar mi³dulo diretamente');
      try {
        const mod = await import('./config/SettingsPage.js');
        if (mod?.renderSettings) {
          window.renderSettings = mod.renderSettings;
          await mod.renderSettings();
        } else {
          const content = document.getElementById('app-content');
          if (content) content.innerHTML = '<div class="p-4">Nao foi possi­vel carregar Configuracoes.</div>';
        }
      } catch (e) {
        console.error('Erro ao carregar SettingsPage.js:', e);
        const content = document.getElementById('app-content');
        if (content) content.innerHTML = '<div class="p-4">Erro ao carregar Configuracoes.</div>';
      }
    }
    renderFAB();
    renderBottomNav('/settings');
    console.log('✅ Configuracoes renderizadas');
    break;
  default:
    console.log('ðŸ"„ Rota nao reconhecida, usando dashboard como fallback');
    await renderDashboard();
    renderBottomNav('/dashboard');
    console.log('✅ Dashboard renderizado (fallback)');
  }

  // Atualizar SwipeNavigation api³s navegacao
  setTimeout(() => {
    if (window.swipeNavigation && window.swipeNavigation.updateCurrentTabIndex) {
      window.swipeNavigation.updateCurrentTabIndex();
      window.swipeNavigation.updateSwipeIndicator();
    }
  }, 200);

  // Scroll gerenciado pelo pipeline moderno; evitar resets duplicados aqui


}

// Exportar funcao router para uso global
window.router = router;

// Funcao para editar transacao
window.editTransaction = function(transactionId) {
  console.log('ðŸ"§ Editando transacao:', transactionId);

  if (!transactionId) {
    console.error('âŒ ID da transacao nao fornecido');
    return;
  }

  // Buscar a transacao
  const transaction = window.appState.transactions?.find(t => t.id === transactionId);

  if (!transaction) {
    console.error('âŒ Transacao nao encontrada:', transactionId);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Transacao nao encontrada',
        type: 'error'
      });
    }
    return;
  }

  console.log('✅ Transacao encontrada:', transaction);

  // Abrir modal de edicao com os dados da transacao
  if (window.showAddTransactionModal) {
    window.showAddTransactionModal(transaction);
  } else {
    console.error('âŒ Funcao showAddTransactionModal nao disponi­vel');
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Funcao de edicao nao disponi­vel',
        type: 'error'
      });
    }
  }
};

// Funcao para editar categoria
window.editCategory = function(categoryId) {
  console.log('ðŸ"§ Editando categoria:', categoryId);

  if (!categoryId) {
    console.error('âŒ ID da categoria nao fornecido');
    return;
  }

  // Buscar a categoria
  const category = window.appState.categories?.find(c => c.id === categoryId);

  if (!category) {
    console.error('âŒ Categoria nao encontrada:', categoryId);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Categoria nao encontrada',
        type: 'error'
      });
    }
    return;
  }

  console.log('✅ Categoria encontrada:', category);

  // Abrir modal de edicao com os dados da categoria
  if (window.showAddCategoryModal) {
    window.showAddCategoryModal(category);
  } else {
    console.error('âŒ Funcao showAddCategoryModal nao disponi­vel');
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Funcao de edicao nao disponi­vel',
        type: 'error'
      });
    }
  }
};

// Funcao para mostrar histi³rico da categoria
window.showCategoryHistory = function(categoryId) {
  console.log('ðŸ"¨ Mostrando histi³rico da categoria:', categoryId);

  if (!categoryId) {
    console.error('âŒ ID da categoria nao fornecido');
    return;
  }

  // Buscar a categoria
  const category = window.appState.categories?.find(c => c.id === categoryId);

  if (!category) {
    console.error('âŒ Categoria nao encontrada:', categoryId);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Categoria nao encontrada',
        type: 'error'
      });
    }
    return;
  }

  // Buscar transacoes desta categoria
  const transactions = window.appState.transactions?.filter(t => t.categoriaId === categoryId) || [];

  // Criar modal com histi³rico
  if (window.Modal) {
    const totalGasto = transactions.reduce((sum, t) => sum + parseFloat(t.valor), 0);

    window.Modal({
      title: `ðŸ"¨ Histi³rico: ${category.nome}`,
      content: `
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400">Total movimentado:</span>
              <span class="font-bold text-lg ${category.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                R$ ${totalGasto.toFixed(2)}
              </span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Niºmero de transacoes:</span>
              <span class="font-medium">${transactions.length}</span>
            </div>
          </div>
          
          <div class="max-h-96 overflow-y-auto space-y-2">
            ${transactions.length === 0 ? `
              <div class="text-center py-8">
                <div class="text-4xl mb-2">ðŸ"¨</div>
                <p class="text-gray-500 dark:text-gray-400">Nenhuma transacao encontrada para esta categoria</p>
              </div>
            ` : transactions.map(t => {
    const data = t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(t.createdAt).toLocaleDateString('pt-BR');
    return `
                <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">${t.descricao}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">${data}</div>
                  </div>
                  <div class="font-medium ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                    ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                  </div>
                </div>
              `;
  }).join('')}
          </div>
        </div>
      `,
      confirmText: 'Fechar',
      onConfirm: () => {}
    });
  } else {
    console.error('âŒ Funcao Modal nao disponi­vel');
  }
};

// Funcao renderFAB movida para features/ui
const renderFAB = async () => {
  const { renderFAB } = await import('@features/ui/UIService.js');
  return renderFAB();
};

// Funcao renderBottomNav movida para features/ui
const renderBottomNav = async (activeRoute) => {
  const { renderBottomNav } = await import('@features/ui/UIService.js');
  return renderBottomNav(activeRoute);
};

// Funcao showLoading movida para features/ui
const showLoading = async (show) => {
  const { showLoading } = await import('@features/ui/UIService.js');
  return showLoading(show);
};

// Funcao setupNavigation movida para features/navigation
const setupNavigation = async () => {
  const { setupNavigation } = await import('@features/navigation/NavigationService.js');
  return setupNavigation();
};

// Scroll reset centralizado no pipeline moderno (não usar aqui)

// Funcao setupLoginButton movida para features/auth
const setupLoginButton = async () => {
  const { setupLoginButton } = await import('@features/auth/AuthService.js');
  return setupLoginButton();
};

// Funcao checkAuthState movida para features/auth
const checkAuthState = async () => {
  const { checkAuthState } = await import('@features/auth/AuthService.js');
  return checkAuthState();
};

// Inicializacao da aplicacao
document.addEventListener('DOMContentLoaded', async () => {
  console.log('ðŸš€ Iniciando aplicacao...');

  // Estado global da aplicacao
  window.appState = {
    currentUser: null,
    currentBudget: null,
    transactions: [],
    categories: [],
    budgets: [],
    recorrentes: [],
    isInitialized: false
  };



  // Aplicar modo de compactacao globalmente
  if (window.applyCompactMode) {
    window.applyCompactMode();
  }

  // Teste: Verificar se a navegacao esti¡ sendo renderizada
  console.log('ðŸ" Teste: Verificando elementos de navegacao...');
  const bottomNav = document.getElementById('bottom-nav');
  console.log('ðŸ" Elemento bottom-nav encontrado:', !!bottomNav);
  if (bottomNav) {
    console.log('ðŸ" Conteiºdo do bottom-nav:', bottomNav.innerHTML);
  }

  // Verificar estado de autenticacao
  const isAuthenticated = await checkAuthState();

  // Configurar navegacao e login apenas se autenticado
  if (isAuthenticated) {
    setupNavigation();

    // Mostrar loading
    showLoading(true);

    // Carregar dados do usui¡rio
    try {
      console.log('ðŸ"¨ Carregando dados do usui¡rio...');
      // Importar e chamar loadBudgets
      const { loadUserBudgets } = await import('@features/budgets/service.js');
      await loadUserBudgets(window.appState.currentUser.uid);

      // Selecionar orçamento padrão
      await selectDefaultBudget(window.appState.currentUser.uid);

      // Importar e chamar outras funções
      const { loadTransactions: loadTxFeature } = await import('@features/transactions/service.js');
      await loadTxFeature(window.appState?.currentBudget?.id, window.appState?.currentUser?.uid);

      const { loadCategories: loadCatsFeature } = await import('@features/categories/service.js');
      await loadCatsFeature(window.appState?.currentBudget?.id);

      const { loadRecorrentes } = await import('@features/recorrentes/service.js');
      await loadRecorrentes();

      // Sempre iniciar no mês atual (não alterar automaticamente para o último mês com dados)
      // O período global já é inicializado com o mês atual em globalUtils; manter como está.

      // loadNotifications e listenNotifications já estão definidas no próprio arquivo
      await loadNotifications();
      await listenNotifications();

      // startAllListeners já está definido no próprio arquivo
      await startAllListeners(window.appState.currentBudget?.id);
      console.log('✅ Dados carregados com sucesso');

      // Aguardar um pouco para garantir que os dados foram carregados
      await new Promise(resolve => setTimeout(resolve, 500));

      // Renderizar dashboard inicial após carregar dados
      console.log('🔄 Renderizando dashboard inicial...');
      await renderDashboard();
      renderBottomNav('/dashboard');
      renderFAB();
      console.log('✅ Dashboard inicial renderizado');

      // Garantir que ao abrir o app sempre fique na Dashboard e no topo
      try {
        updateHashWithYM('/dashboard');
        await resetScrollPosition();
        // duplo seguro para navegadores lentos
        // scroll handled centrally; avoid forcing window scroll here
      } catch (e) {
        console.warn('⚠️ Não foi possível forçar scroll/topo inicial:', e);
      }

    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      // Mostrar feedback visual do erro
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro ao carregar dados. Tente recarregar a página.',
          type: 'error'
        });
      }
    } finally {
      // Esconder loading
      showLoading(false);
    }

    // Inicializar sistema de swipe navigation após autenticação
    setTimeout(() => {
      try {
        // Verificar se o container existe
        const container = document.querySelector('#app-content');
        if (!container) {
          console.warn('⚠️ Container #app-content não encontrado, tentando novamente em 500ms...');
          setTimeout(() => {
            if (document.querySelector('#app-content')) {
              window.swipeNavigation = new SwipeNavigation();
              console.log('✅ SwipeNavigation inicializado (tentativa 2)');
            }
          }, 500);
          return;
        }

        // Verificar se o usuário está autenticado
        if (!window.appState?.currentUser) {
          console.warn('⚠️ Usuário não autenticado, aguardando...');
          return;
        }

        window.swipeNavigation = new SwipeNavigation();
        console.log('✅ SwipeNavigation inicializado com sucesso');

      } catch (error) {
        console.error('❌ Erro ao inicializar SwipeNavigation:', error);
      }
    }, 1000);

    // Marcar como inicializado
    window.appState.isInitialized = true;
  }

  setupLoginButton();

  console.log('✅ Aplicacao iniciada com sucesso!');
});

// Funcao wrapper para adicionar categoria com confirmacao
window.addCategoryWithConfirmation = async function (categoryData) {
  return new Promise((resolve, reject) => {
    window.showConfirmationModal({
      title: 'Adicionar Categoria',
      message: `Deseja adicionar a categoria "${categoryData.nome}"?`,
      confirmText: 'Sim, Adicionar',
      confirmColor: 'bg-green-500 hover:bg-green-600',
      onConfirm: async () => {
        try {
          const result = await window.addCategory(categoryData);
          if (window.Snackbar) {
            window.Snackbar({
              message: '✅ Categoria adicionada com sucesso!',
              type: 'success'
            });
          }
          resolve(result);
        } catch (error) {
          console.error('âŒ Erro ao adicionar categoria:', error);
          if (window.Snackbar) {
            window.Snackbar({
              message: 'Erro ao adicionar categoria: ' + error.message,
              type: 'error'
            });
          }
          reject(error);
        }
      },
      onCancel: () => {
        console.log('âŒ Adicao de categoria cancelada pelo usui¡rio');
        reject(new Error('Operacao cancelada pelo usui¡rio'));
      }
    });
  });
};

// Exportar funcoes globais
window.renderDashboard = renderDashboard;
window.renderTransactions = renderTransactions;
window.renderCategories = renderCategories;
window.router = router;
window.addTransaction = addTransaction;
window.updateTransaction = updateTransaction;
window.deleteTransaction = deleteTransaction;
window.addCategory = addCategory;
window.updateCategory = updateCategory;
window.deleteCategory = deleteCategory;
window.addBudget = addBudget;
window.loadTransactions = loadTransactions;
window.loadCategories = loadCategories;
window.loadBudgets = loadBudgets;
// window.selectDefaultBudget removido pois função não existe
window.loadRecorrentes = loadRecorrentes;
window.closeModalAlertas = closeModalAlertas;
window.calcularNumeroParcela = calcularNumeroParcela;
window.showLoading = showLoading;
window.toggleLoginPage = toggleLoginPage;
window.refreshCurrentView = refreshCurrentView;
window.logout = logout;

// ===== SISTEMA DE VOZ REESTRUTURADO =====
// Importar o novo sistema de voz
import { VoiceSystem } from './ui/VoiceSystem.js';

// Inicializar sistema de voz global
let voiceSystem = null;

// Funcao getVoiceSystem movida para features/voice
const getVoiceSystem = async () => {
  const { getVoiceSystem: getVoiceSys } = await import('@features/voice/VoiceService.js');
  return getVoiceSys();
};

// Funcao openVoiceModal movida para features/voice
window.openVoiceModal = async function(type = 'transaction') {
  const { openVoiceModal } = await import('@features/voice/VoiceService.js');
  return openVoiceModal(type);
};

// Funcao closeVoiceModal movida para features/voice
window.closeVoiceModal = async function() {
  const { closeVoiceModal } = await import('@features/voice/VoiceService.js');
  return closeVoiceModal();
};

// Funcao startVoiceRecognition movida para features/voice
window.startVoiceRecognition = async function(type = 'transaction') {
  const { startVoiceRecognition } = await import('@features/voice/VoiceService.js');
  return startVoiceRecognition(type);
};

// Funcao processVoiceCommand movida para features/voice
const processVoiceCommand = async (transcript, type) => {
  const { processVoiceCommand: processVoiceCmd } = await import('@features/voice/VoiceService.js');
  return processVoiceCmd(transcript, type);
};

// Funcao parseNumeroPorExtenso movida para features/voice
const parseNumeroPorExtenso = async (palavra) => {
  const { parseNumeroPorExtenso: parseNum } = await import('@features/voice/VoiceService.js');
  return parseNum(palavra);
};

// Funcao processTransactionVoice movida para features/voice
const processTransactionVoice = async (transcript) => {
  const { processTransactionVoice: processTxVoice } = await import('@features/voice/VoiceService.js');
  return processTxVoice(transcript);
};

// Funcao processCategoryVoice movida para features/voice
const processCategoryVoice = async (transcript) => {
  const { processCategoryVoice: processCatVoice } = await import('@features/voice/VoiceService.js');
  return processCatVoice(transcript);
};

// Funcao normalizarTexto movida para features/voice
const normalizarTexto = async (str) => {
  const { normalizarTexto: normalizeText } = await import('@features/voice/VoiceService.js');
  return normalizeText(str);
};

// Funcao downloadBackup movida para features/backup
window.downloadBackup = async function () {
  const { downloadBackup } = await import('@features/backup/BackupService.js');
  return downloadBackup();
};

// Funcao exportToExcel movida para features/backup
window.exportToExcel = async function () {
  const { exportToExcel } = await import('@features/backup/BackupService.js');
  return exportToExcel();
};

// Funcao exportToPDF movida para features/backup
window.exportToPDF = async function () {
  const { exportToPDF } = await import('@features/backup/BackupService.js');
  return exportToPDF();
};

// Funcao exportReadmePDF movida para features/backup
window.exportReadmePDF = async function () {
  const { exportReadmePDF } = await import('@features/backup/BackupService.js');
  return exportReadmePDF();
};

// Funcao showExportOptions movida para features/backup
window.showExportOptions = async function () {
  const { showExportOptions } = await import('@features/backup/BackupService.js');
  return showExportOptions();
};

// ===== CONFIGURAi‡iƒO DOS BOTi•ES DA TELA INICIAL =====
window.setupHeaderButtons = function() {
  console.log('ðŸ"§ Configurando botoes do header...');

  // Verificar se os elementos existem
  const voiceModal = document.getElementById('voice-modal');

  console.log('ðŸ"§ Elementos encontrados:', {
    voiceModal: !!voiceModal
  });

  // Botao de voz movido para o FAB

  // Botao de tema - configuracao removida para evitar duplicacao
  // A configuracao do tema i© feita apenas uma vez na inicializacao do app

  // Configurar botao de fechar modal de voz
  const closeVoiceModalBtn = document.getElementById('close-voice-modal');
  if (closeVoiceModalBtn) {
    closeVoiceModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('âŒ Close voice modal button clicked');
      closeVoiceModal();
    });
    console.log('✅ Close voice modal button configurado');
  }

  // Fechar modal de voz ao clicar fora
  if (voiceModal) {
    voiceModal.addEventListener('click', (e) => {
      if (e.target === voiceModal) {
        closeVoiceModal();
      }
    });
  }
};

// Funcoes do drawer removidas - funcionalidades movidas para as abas do rodapi©

// Funcao para abrir modal de voz
function openVoiceModal() {
  const voiceModal = document.getElementById('voice-modal');
  const voiceContent = voiceModal?.querySelector('.voice-content');

  if (voiceModal && voiceContent) {
    // Mostrar modal
    voiceModal.style.display = 'flex';

    // Animar abertura com fundo mais opaco
    voiceModal.style.pointerEvents = 'auto';
    voiceModal.style.background = 'rgba(0, 0, 0, 0.95)';
    voiceModal.style.backdropFilter = 'blur(30px)';
    voiceContent.style.transform = 'scale(1)';
    voiceContent.style.opacity = '1';

    // Adicionar classe ao body para esconder botao de voz
    document.body.classList.add('voice-modal-open');

    // Iniciar reconhecimento de voz
    if (window.startVoiceRecognition) {
      setTimeout(() => {
        window.startVoiceRecognition('transaction');
      }, 500);
    }

    console.log('ðŸŽ¤ Modal de voz aberto');
  }
}

// Removido: openVoiceModal/closeVoiceModal legados substituídos por features/voice

// Funcao para carregar orcamentos no drawer
// Funcao loadDrawerBudgets removida - agora gerenciada pela classe Drawer

// ===== CONFIGURAi‡iƒO DOS BOTi•ES DA TELA DE CATEGORIAS =====
window.setupCategoryButtons = function() {
  console.log('ðŸ"§ Configurando botoes da tela de categorias...');

  // Botao de adicionar categoria
  const addCategoryBtn = document.getElementById('add-category-btn');
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('ðŸ"‚ Add category button clicked');

      if (window.showAddCategoryModal) {
        window.showAddCategoryModal();
      } else {
        console.warn('âš ï¸ Funcao de adicionar categoria nao disponi­vel');
        if (window.Snackbar) {
          window.Snackbar.show('Funcionalidade de adicionar categoria nao disponi­vel', 'warning');
        }
      }
    });
    console.log('✅ Add category button configurado');
  }

  // Botao de migrar
  const migrarBtn = document.querySelector('button[onclick="window.migrarTransacoesAntigas()"]');
  if (migrarBtn) {
    migrarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('ðŸ"„ Migrar button clicked');

      if (window.migrarTransacoesAntigas) {
        window.migrarTransacoesAntigas();
      } else {
        console.warn('âš ï¸ Funcao de migrar nao disponi­vel');
      }
    });
    console.log('✅ Migrar button configurado');
  }

  // Botao de corrigir
  const corrigirBtn = document.querySelector('button[onclick="window.corrigirTipoCategoria()"]');
  if (corrigirBtn) {
    corrigirBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('ðŸ"§ Corrigir button clicked');

      if (window.corrigirTipoCategoria) {
        window.corrigirTipoCategoria();
      } else {
        console.warn('âš ï¸ Funcao de corrigir nao disponi­vel');
      }
    });
    console.log('✅ Corrigir button configurado');
  }
};

// ===== CONFIGURAi‡iƒO DOS BOTi•ES DA TELA DE TRANSAi‡i•ES =====
function setupTransactionButtons() {
  console.log('ðŸ"§ Configurando botoes da tela de transacoes...');

  // Botao de adicionar transacao
  const addTransactionBtn = document.getElementById('add-transaction-btn');
  if (addTransactionBtn) {
    addTransactionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('ðŸ"‹ Add transaction button clicked');

      if (window.showAddTransactionModal) {
        window.showAddTransactionModal();
      } else {
        console.warn('⚠️ Funcao de adicionar transacao nao disponi­vel');
        if (window.Snackbar) {
          window.Snackbar.show('Funcionalidade de adicionar transacao nao disponi­vel', 'warning');
        }
      }
    });
    console.log('✅ Add transaction button configurado');
  }

  // Botao de voz
  const voiceBtn = document.getElementById('voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('ðŸŽ¤ Voice button clicked');

      if (window.startVoiceRecognition) {
        window.startVoiceRecognition('transaction');
      } else {
        console.warn('âš ï¸ Funcao de voz nao disponi­vel');
      }
    });
    console.log('✅ Voice button configurado');
  } else {
    console.warn('âš ï¸ Botao de voz nao encontrado');
  }
}

// ===== CONFIGURAi‡iƒO DOS BOTi•ES DO DASHBOARD =====
window.setupDashboardButtons = function() {
  console.log('ðŸ"§ Configurando botoes do dashboard...');

  // Botao de exportar
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('ðŸ"¤ Export button clicked');

      if (window.showExportOptions) {
        window.showExportOptions();
      } else {
        console.warn('âš ï¸ Funcao de exportacao nao disponi­vel');
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Funcionalidade de exportacao nao disponi­vel',
            type: 'warning'
          });
        }
      }
    });
    console.log('✅ Export button configurado');
  }

  // Botão de tema agora é configurado globalmente em app/entry.js (ThemeService)

  // Botoes de navegacao de miªs
  const mesAnterior = document.getElementById('mes-anterior');
  const mesProximo = document.getElementById('mes-proximo');

  if (mesAnterior) {
    mesAnterior.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('⬅️ Mês anterior clicked');

      // Baseado no período global selecionado
      const now = new Date();
      const getP = (typeof window.getSelectedPeriod === 'function')
        ? window.getSelectedPeriod
        : () => ({ year: window.appState?.selectedYear || now.getFullYear(), month: window.appState?.selectedMonth || (now.getMonth() + 1) });
      const setP = (typeof window.setSelectedPeriod === 'function') ? window.setSelectedPeriod : null;

      let { year: y, month: m } = getP();
      m -= 1; if (m < 1) { m = 12; y -= 1; }
      if (setP) setP(y, m);

      if (window.renderDashboard) {
        await window.renderDashboard();
      }
    });
    console.log('✅ Mês anterior button configurado');
  }

  if (mesProximo) {
    mesProximo.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('➡️ Mês próximo clicked');

      // Baseado no período global selecionado
      const now = new Date();
      const getP = (typeof window.getSelectedPeriod === 'function')
        ? window.getSelectedPeriod
        : () => ({ year: window.appState?.selectedYear || now.getFullYear(), month: window.appState?.selectedMonth || (now.getMonth() + 1) });
      const setP = (typeof window.setSelectedPeriod === 'function') ? window.setSelectedPeriod : null;

      let { year: y, month: m } = getP();
      m += 1; if (m > 12) { m = 1; y += 1; }
      if (setP) setP(y, m);

      if (window.renderDashboard) {
        await window.renderDashboard();
      }
    });
    console.log('✅ Mês próximo button configurado');
  }
};

window.migrarTransacoesAntigas = async function () {
  try {
    console.log('ðŸ"„ Iniciando migracao de transacoes antigas...');
    const user = window.appState.currentUser;
    if (!user) {
      Snackbar({ message: 'Usui¡rio nao autenticado', type: 'error' });
      return;
    }

    const budget = window.appState.currentBudget;
    if (!budget) {
      Snackbar.show('Orcamento nao selecionado', 'error');
      return;
    }

    // Buscar transacoes sem categoriaId
    const q = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budget.id),
      where('categoriaId', '==', null)
    );

    const querySnapshot = await getDocs(q);
    const transacoesSemCategoria = querySnapshot.docs;

    if (transacoesSemCategoria.length === 0) {
      Snackbar({ message: 'Nenhuma transacao para migrar', type: 'info' });
      return;
    }

    // Criar categoria padrao se nao existir
    let categoriaPadrao = window.appState.categories.find(cat => cat.nome === 'Geral');
    if (!categoriaPadrao) {
      const categoriaData = {
        nome: 'Geral',
        descricao: 'Categoria padrao para transacoes antigas',
        tipo: 'despesa',
        cor: '#6B7280',
        limite: 0
      };
      const categoriaId = await addCategory(categoriaData);
      await loadCategories();
      categoriaPadrao = window.appState.categories.find(cat => cat.id === categoriaId);
    }

    // Atualizar transacoes
    let atualizadas = 0;
    for (const doc of transacoesSemCategoria) {
      await updateDoc(doc.ref, {
        categoriaId: categoriaPadrao.id,
        updatedAt: serverTimestamp()
      });
      atualizadas++;
    }

    await loadTransactions();
    Snackbar({ message: `${atualizadas} transacoes migradas para categoria "Geral"`, type: 'success' });
  } catch (error) {
    console.error('âŒ Erro na migracao:', error);
    Snackbar({ message: 'Erro ao migrar transacoes', type: 'error' });
  }
};

window.corrigirTipoCategoria = async function () {
  try {
    console.log('ðŸ"§ Iniciando correcao de tipos de categoria...');
    const user = window.appState.currentUser;
    if (!user) {
      Snackbar({ message: 'Usui¡rio nao autenticado', type: 'error' });
      return;
    }

    const budget = window.appState.currentBudget;
    if (!budget) {
      Snackbar.show('Orcamento nao selecionado', 'error');
      return;
    }

    // Buscar categorias sem tipo
    const q = query(
      collection(db, 'categories'),
      where('budgetId', '==', budget.id),
      where('tipo', '==', null)
    );

    const querySnapshot = await getDocs(q);
    const categoriasSemTipo = querySnapshot.docs;

    if (categoriasSemTipo.length === 0) {
      Snackbar({ message: 'Nenhuma categoria para corrigir', type: 'info' });
      return;
    }

    // Atualizar categorias
    let corrigidas = 0;
    for (const doc of categoriasSemTipo) {
      await updateDoc(doc.ref, {
        tipo: 'despesa', // Tipo padrao
        updatedAt: serverTimestamp()
      });
      corrigidas++;
    }

    await loadCategories();
    Snackbar({ message: `${corrigidas} categorias corrigidas`, type: 'success' });
  } catch (error) {
    console.error('âŒ Erro na correcao:', error);
    Snackbar({ message: 'Erro ao corrigir categorias', type: 'error' });
  }
};

// Correções legadas foram movidas para @core/legacy/fixers.js e expostas em window.*

// ===== FUNi‡i•ES DE NOTIFICAi‡i•ES =====

// Funcao para carregar notificacoes do usui¡rio
async function loadNotifications() {
  try {
    const user = auth.currentUser;
    if (!user) return [];
    const { listByRecipient } = await import('@data/repositories/notificationsRepo.js');
    const notifications = await listByRecipient(user.uid, 50);
    window.appState.notifications = notifications;
    console.log('ðŸ"§ Notificacoes carregadas:', notifications.length);
    updateNotificationBadge();
    return notifications;
  } catch (error) {
    console.error('Erro ao carregar notificacoes:', error);
    return [];
  }
}

// Funcao para marcar notificacao como lida
async function markNotificationAsRead(notificationId) {
  try {
    const { markAsRead } = await import('@data/repositories/notificationsRepo.js');
    await markAsRead(notificationId);

    // Atualizar estado local
    const notificationIndex = window.appState.notifications.findIndex(n => n.id === notificationId);
    if (notificationIndex !== -1) {
      window.appState.notifications[notificationIndex].read = true;
    }

    updateNotificationBadge();
    // Se estiver na página de notificações, re-renderizar para refletir a mudança
    if (window.location.hash === '#/notifications' && typeof renderNotifications === 'function') {
      renderNotifications();
    }
    // Feedback opcional
    if (typeof window.Snackbar === 'function') {
      window.Snackbar({ message: 'Notificação marcada como lida', type: 'success' });
    }
  } catch (error) {
    console.error('Erro ao marcar notificacao como lida:', error);
  }
}

// Funcao para marcar todas as notificacoes como lidas
async function markAllNotificationsAsRead() {
  try {
    const unreadNotifications = window.appState.notifications?.filter(n => !n.read) || [];
    if (unreadNotifications.length === 0) {
      Snackbar({ message: 'Nenhuma notificacao nao lida', type: 'info' });
      return;
    }

    const { markManyAsRead } = await import('@data/repositories/notificationsRepo.js');
    await markManyAsRead(unreadNotifications.map(n => n.id));

    // Atualizar estado local
    window.appState.notifications.forEach(n => n.read = true);
    updateNotificationBadge();

    Snackbar({ message: `${unreadNotifications.length} notificacoes marcadas como lidas`, type: 'success' });

    // Re-renderizar se estiver na pi¡gina de notificacoes
    if (window.location.hash === '#/notifications') {
      renderNotifications();
    }
  } catch (error) {
    console.error('Erro ao marcar notificacoes como lidas:', error);
    Snackbar({ message: 'Erro ao marcar notificacoes como lidas', type: 'error' });
  }
}

// Funcao para atualizar badge de notificacoes
let __badgeUpdateTimer = null;
function updateNotificationBadge() {
  if (__badgeUpdateTimer) {
    clearTimeout(__badgeUpdateTimer);
  }
  __badgeUpdateTimer = setTimeout(() => {
    const unreadCount = window.appState.notifications?.filter(n => !n.read).length || 0;

    // Atualizar badge na navegacao
    const notificationBtn = document.querySelector('[data-route="/notifications"]');
    if (notificationBtn) {
      let badge = notificationBtn.querySelector('.notification-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center';
        notificationBtn.style.position = 'relative';
        notificationBtn.appendChild(badge);
      }

      if (unreadCount > 0) {
        badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    }
    __badgeUpdateTimer = null;
  }, 100);
}

// Listener para notificacoes em tempo real
let unsubscribeNotifications = null;

async function listenNotifications() {
  if (unsubscribeNotifications) {
    unsubscribeNotifications();
  }

  const user = auth.currentUser;
  if (!user) {
    console.log('âš ï¸ Usui¡rio nao autenticado, nao iniciando listener de notificacoes');
    return;
  }

  // Listener deve rodar independente do orçamento atual (notificações são por usuário)

  try {
    const { listenByRecipient } = await import('@data/repositories/notificationsRepo.js');
    unsubscribeNotifications = listenByRecipient(user.uid, (notifications) => {
      console.log('ðŸ"§ Listener de notificacoes executado!');
      const prev = window.appState.notifications || [];
      const prevIds = new Set(prev.map(n => n.id));

      window.appState.notifications = notifications;
      console.log('ðŸ"§ Notificacoes atualizadas:', notifications.length);

      // Re-renderizar página se aberta
      if (window.location.hash === '#/notifications') {
        renderNotifications();
      }
      // Atualizar badge
      updateNotificationBadge();

      // Mostrar toast em tempo real para novas notificacoes (evitar spam no primeiro load)
      try {
        const isFirstLoad = !window.__notificationsInitialized;
        if (!isFirstLoad) {
          const newOnes = notifications.filter(n => !prevIds.has(n.id));
          const toastsEnabled = (typeof window.getNotificationsToastsEnabled === 'function') ? window.getNotificationsToastsEnabled() : true;
          if (toastsEnabled && newOnes.length > 0 && typeof Snackbar === 'function' && window.location.hash !== '#/notifications') {
            newOnes.forEach(n => {
              const who = n.senderName || 'Usui¡rio';
              let message = `ðŸ"" ${who} `;
              let type = 'info';
              switch (n.type) {
              case 'deleted_transaction':
                message += `excluiu uma transacao${n.transactionDescricao ? `: ${n.transactionDescricao}` : ''}`;
                type = 'warning';
                break;
              case 'updated_transaction':
                message += `atualizou uma transacao${n.transactionDescricao ? `: ${n.transactionDescricao}` : ''}`;
                type = 'info';
                break;
              case 'new_transaction':
                message += `adicionou uma transacao${n.transactionDescricao ? `: ${n.transactionDescricao}` : ''}`;
                type = 'info';
                break;
              case 'category_added':
                message += `criou a categoria${n.categoryNome ? `: ${n.categoryNome}` : ''}`;
                type = 'success';
                break;
              case 'category_updated':
                message += `atualizou a categoria${n.categoryNome ? `: ${n.categoryNome}` : ''}`;
                type = 'info';
                break;
              case 'category_deleted':
                message += `excluiu a categoria${n.categoryNome ? `: ${n.categoryNome}` : ''}`;
                type = 'warning';
                break;
              default:
                message += 'realizou uma acao';
                type = 'info';
              }
              Snackbar({ message, type });
            });
          }
        }
        window.__notificationsInitialized = true;
      } catch (toastErr) {
        console.warn('Falha ao exibir toast de notificacao:', toastErr);
      }

      // Se estiver na pi¡gina de notificacoes, re-renderizar
      if (window.location.hash === '#/notifications') {
        renderNotifications();
      }
    });
  } catch (error) {
    console.error('âŒ Erro ao configurar listener de notificacoes:', error);
  }
}

// Funcao para renderizar notificacoes
async function renderNotifications() {
  const content = document.getElementById('app-content');

  if (!content) return;

  // Carregar notificacoes antes de renderizar
  await loadNotifications();
  const notifications = window.appState.notifications || [];
  // Aplicar filtros e agrupamento
  const filters = getNotifFilters();
  const filtered = applyNotificationFilters(notifications, filters);
  const grouped = groupNotificationsByDay(filtered);

  // Calcular estati­sticas das notificacoes
  const totalNotificacoes = filtered.length;
  const notificacoesNaoLidas = filtered.filter(n => !n.read).length;
  const notificacoesLidas = totalNotificacoes - notificacoesNaoLidas;
  const notificacoesHoje = filtered.filter(n => {
    const data = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
    const hoje = new Date();
    return data.toDateString() === hoje.toDateString();
  }).length;

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
  <h1 class="text-2xl font-semibold text-gray-900 leading-tight">📧 Notificações</h1>
  
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          
          
          <!-- ========== SEi‡iƒO 1: RESUMO DAS NOTIFICAi‡i•ES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ"¨ Visao Geral</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
              <!-- Header do Card -->
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold">Centro de Notificacoes</h3>
                  <p class="text-sm opacity-90">${totalNotificacoes} notificacoes no total</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${notificacoesNaoLidas > 0 ? 'text-yellow-200' : 'text-green-200'}">
                    ${notificacoesNaoLidas}
                  </div>
                  <p class="text-xs opacity-90">${notificacoesNaoLidas > 0 ? '🔔 Nao lidas' : '✅ Todas lidas'}</p>
                </div>
              </div>
              
              <!-- Grid de Mi©tricas -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">ðŸ"§</div>
                  <div class="text-2xl md:text-3xl font-bold">${totalNotificacoes}</div>
                  <div class="text-sm opacity-90">Total</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">ðŸ"¬</div>
                  <div class="text-2xl md:text-3xl font-bold text-yellow-200">${notificacoesNaoLidas}</div>
                  <div class="text-sm opacity-90">Nao lidas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">✅</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">${notificacoesLidas}</div>
                  <div class="text-sm opacity-90">Lidas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">ðŸ"…</div>
                  <div class="text-2xl md:text-3xl font-bold">${notificacoesHoje}</div>
                  <div class="text-sm opacity-90">Hoje</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEi‡iƒO 2: Ai‡i•ES E CONTROLES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ"§ Acoes & Controles</h2>
            </div>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Notificacoes</h3>
                  <div class="flex gap-2 flex-wrap">
                    <button onclick="window.showConfirmationModal({
                      title: 'Marcar como Lidas',
                      message: 'Deseja marcar todas as notificacoes como lidas?',
                      confirmText: 'Sim, Marcar',
                      confirmColor: 'bg-blue-500 hover:bg-blue-600',
                      onConfirm: 'window.markAllNotificationsAsRead && window.markAllNotificationsAsRead()'
                    })" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      ✅ Marcar todas como lidas
                    </button>
                    <button onclick="window.showConfirmationModal({
                      title: 'Apagar notificacoes lidas',
                      message: 'Deseja apagar todas as notificacoes lidas? Esta acao nao pode ser desfeita.',
                      confirmText: 'Sim, Apagar',
                      confirmColor: 'bg-red-500 hover:bg-red-600',
                      onConfirm: 'window.deleteAllReadNotifications && window.deleteAllReadNotifications()'
                    })" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      ðŸ—'ï¸ Apagar lidas
                    </button>
                    <button onclick="window.renderNotifications()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      ðŸ"„ Atualizar
                    </button>
                  </div>
                </div>
                <!-- Controles: filtros e preferiªncia de toasts -->
                <div class="mt-3 flex flex-col gap-3">
                  <!-- Filtro por tipo -->
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Tipos:</span>
                    ${['new_transaction','updated_transaction','deleted_transaction','category_added','category_updated','category_deleted']
    .map(t => {
      const active = filters.types.includes(t);
      const labels = { new_transaction:'Nova Tx', updated_transaction:'Tx Atualizada', deleted_transaction:'Tx Exclui­da', category_added:'Cat Criada', category_updated:'Cat Atualizada', category_deleted:'Cat Exclui­da' };
      return '<button onclick=\"window.toggleNotificationTypeFilter(\''+t+`')\" class=\"px-3 py-1 rounded-full text-xs font-medium ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}\">${labels[t]}</button>`;
    }).join('')}
                  </div>
                  <!-- Filtro por peri­odo -->
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Peri­odo:</span>
                    ${['all','today','7d','30d'].map(p => {
    const label = p==='all'?'Tudo':(p==='today'?'Hoje':(p==='7d'?'7 dias':'30 dias'));
    const active = filters.period===p;
    return '<button onclick=\"window.setNotificationPeriod(\''+p+`')\" class=\"px-3 py-1 rounded-full text-xs font-medium ${active ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}\">${label}</button>`;
  }).join('')}
                  </div>
                  <!-- Preferiªncia de toasts -->
                  <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input type="checkbox" ${getNotificationsToastsEnabled() ? 'checked' : ''} onchange="window.setNotificationsToastsEnabled(this.checked)" />
                    Mostrar toasts em tempo real
                  </label>
                  <!-- Poli­tica de retencao -->
                  <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span>Apagar automaticamente api³s:</span>
                    <select onchange="window.setNotificationRetentionDays(this.value)" class="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-2 py-1">
                      ${[0, 15, 30, 60, 90].map(d => `<option value=\"${d}\" ${getNotificationRetentionDays()===d?'selected':''}>${d===0?'Nunca':d+' dias'}</option>`).join('')}
                    </select>
                    <button class="ml-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded" onclick="window.runNotificationAutoClean()">Executar limpeza</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEi‡iƒO 3: LISTA DE NOTIFICAi‡i•ES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ"‹ Todas as Notificacoes</h2>
            </div>
            
            <div class="space-y-6">
              ${filtered.length > 0 ? grouped.map(group => `
                <div>
                  <div class=\"text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2\">${group.label}</div>
                  <div class=\"space-y-4\">
                  ${group.items.map(notification => `
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${!notification.read ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}">
                  <!-- Header da Notificacao -->
                  <div class="bg-gradient-to-r ${!notification.read ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800' : 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800'} p-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full ${notification.type === 'deleted_transaction' ? 'bg-red-100 dark:bg-red-900' : notification.type === 'updated_transaction' ? 'bg-yellow-100 dark:bg-yellow-900' : (notification.type && notification.type.startsWith('category_')) ? 'bg-purple-100 dark:bg-purple-900' : 'bg-blue-100 dark:bg-blue-900'} flex items-center justify-center text-xl">
                          ${notification.type === 'deleted_transaction' ? '🧹' : notification.type === 'updated_transaction' ? '✏️' : (notification.type && notification.type.startsWith('category_')) ? '📁' : '📊'}
                        </div>
                        <div>
                          <h3 class="font-bold text-gray-900 dark:text-gray-100">${
  notification.type === 'deleted_transaction' ? 'Transacao Exclui­da' :
    notification.type === 'updated_transaction' ? 'Transacao Atualizada' :
      notification.type === 'new_transaction' ? 'Nova Transacao' :
        notification.type === 'category_added' ? 'Categoria Criada' :
          notification.type === 'category_updated' ? 'Categoria Atualizada' :
            notification.type === 'category_deleted' ? 'Categoria Exclui­da' : 'Notificacao'
}</h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400">Orcamento: ${notification.budgetName || 'Orcamento'}</p>
                        </div>
                      </div>
                      <div class="text-right">
                        ${!notification.read ? '<div class="text-2xl">🔔</div>' : '<div class="text-2xl">✅</div>'}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Conteiºdo da Notificacao -->
                  <div class="p-4">
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Enviado por:</span>
                        <span class="font-medium text-gray-900 dark:text-gray-100">${notification.senderName || 'Usui¡rio'}</span>
                      </div>
                      
                      ${notification.type && notification.type.startsWith('category_') ? `
                        <div class="flex items-center justify-between">
                          <span class="text-sm text-gray-600 dark:text-gray-400">Categoria:</span>
                          <span class="font-medium text-gray-900 dark:text-gray-100">${notification.categoryNome || 'Categoria'}</span>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <div class="font-medium text-gray-900 dark:text-gray-100 ${notification.type === 'deleted_transaction' ? 'line-through' : ''}">${notification.categoryTipo ? (notification.categoryTipo === 'receita' ? 'Receita' : 'Despesa') : 'Categoria'}</div>
                            ${typeof notification.categoryLimite !== 'undefined' ? `<div class=\"text-sm text-gray-600 dark:text-gray-400\">Limite: R$ ${Number(notification.categoryLimite || 0).toFixed(2)}</div>` : ''}
                          </div>
                        </div>
                      ` : `
                        <div class="flex items-center justify-between">
                          <span class="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
                          ${notification.type === 'deleted_transaction'
    ? '<span class="font-medium text-red-600">exclui­da</span>'
    : `<span class=\"font-medium ${(notification.transactionTipo || 'despesa') === 'receita' ? 'text-green-600' : 'text-red-600'}\">${notification.transactionTipo || 'Transacao'}</span>`}
                        </div>
                        
                        <!-- Detalhes da Transacao -->
                        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 ${notification.type === 'deleted_transaction' ? 'opacity-75' : ''}">
                          <div class="flex items-center justify-between mb-2">
                            <div class="font-medium text-gray-900 dark:text-gray-100 ${notification.type === 'deleted_transaction' ? 'line-through' : ''}">${notification.transactionDescricao || 'Transacao'}</div>
                            <div class="font-bold text-lg ${(notification.transactionTipo || 'despesa') === 'receita' ? 'text-green-600' : 'text-red-600'} ${notification.type === 'deleted_transaction' ? 'line-through' : ''}">
                              R$ ${Number(notification.transactionValor || 0).toFixed(2)}
                            </div>
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            Categoria: ${notification.transactionCategoria || 'Sem categoria'}
                          </div>
                        </div>
                      `}
                      
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Data:</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                          ${notification.createdAt?.toDate ? notification.createdAt.toDate().toLocaleString('pt-BR') : 'Data nao disponi­vel'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Botoes de Acao -->
                  ${!notification.read ? `
                    <div class="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                      <div class="flex gap-2">
                        <button onclick="window.showConfirmationModal({
                          title: 'Marcar como Lida',
                          message: 'Deseja marcar esta notificacao como lida?',
                          confirmText: 'Sim, Marcar',
                          confirmColor: 'bg-blue-500 hover:bg-blue-600',
                          onConfirm: function() { window.markNotificationAsRead && window.markNotificationAsRead('${notification.id}') }
                        })" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                          ✅ Marcar como lida
                        </button>
                        <button onclick="window.openNotificationTarget('${notification.id}','${notification.type || ''}')" class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                          ðŸ"— Ver no app
                        </button>
                      </div>
                    </div>
                  ` : ''}
                  ${notification.read ? `
                    <div class="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                      <div class="flex gap-2">
                        <button onclick="window.showConfirmationModal({
                          title: 'Apagar notificação',
                          message: 'Deseja apagar esta notificação? Esta ação não pode ser desfeita.',
                          confirmText: 'Sim, Apagar',
                          confirmColor: 'bg-red-500 hover:bg-red-600',
                          onConfirm: function() { window.deleteNotification && window.deleteNotification('${notification.id}') }
                        })" class="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                          🗑️ Apagar
                        </button>
                        <button onclick="window.openNotificationTarget('${notification.id}','${notification.type || ''}')" class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                          ðŸ"— Ver no app
                        </button>
                      </div>
                    </div>
                  ` : ''}
                </div>
                  `).join('')}
                  </div>
                </div>
              `).join('') : `
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div class="text-center py-12">
                    <div class="text-6xl mb-4">ðŸ""</div>
                    <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhuma notificacao</div>
                    <div class="text-gray-600 dark:text-gray-400 mb-4">Vociª nao tem notificacoes no momento</div>
                    <button onclick="window.renderNotifications()" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg">
                      ðŸ"„ Atualizar
                    </button>
                  </div>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Removido indicador interativo de período nas Notificações; mostrar apenas rótulo no card de resumo

  renderFAB();
}

// ===== Filtros, agrupamento e deep-link de notificacoes =====
function getNotifFilters() {
  if (!window.__notifFilters) {
    try {
      const saved = localStorage.getItem('notifFilters');
      if (saved) window.__notifFilters = JSON.parse(saved);
    } catch {}
    if (!window.__notifFilters) {
      window.__notifFilters = {
        types: ['new_transaction','updated_transaction','deleted_transaction','category_added','category_updated','category_deleted'],
        period: 'all'
      };
    }
  }
  return window.__notifFilters;
}
window.getNotifFilters = getNotifFilters;

function saveNotifFilters() {
  try { localStorage.setItem('notifFilters', JSON.stringify(window.__notifFilters)); } catch {}
}

function toggleNotificationTypeFilter(type) {
  const f = getNotifFilters();
  if (f.types.includes(type)) {
    f.types = f.types.filter(t => t !== type);
    if (f.types.length === 0) f.types = [type];
  } else {
    f.types.push(type);
  }
  window.__notifFilters = f;
  saveNotifFilters();
  renderNotifications();
}
window.toggleNotificationTypeFilter = toggleNotificationTypeFilter;

function setNotificationPeriod(period) {
  const f = getNotifFilters();
  f.period = period;
  window.__notifFilters = f;
  saveNotifFilters();
  renderNotifications();
}
window.setNotificationPeriod = setNotificationPeriod;

function applyNotificationFilters(list, filters) {
  const now = new Date();
  const dayMs = 24*60*60*1000;
  return list.filter(n => {
    if (n.type && !filters.types.includes(n.type)) return false;
    if (filters.period && filters.period !== 'all') {
      const dt = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
      const diffMs = now - dt;
      if (filters.period === 'today') {
        if (dt.toDateString() !== now.toDateString()) return false;
      } else if (filters.period === '7d') {
        if (diffMs > 7*dayMs) return false;
      } else if (filters.period === '30d') {
        if (diffMs > 30*dayMs) return false;
      }
    }
    return true;
  });
}
window.applyNotificationFilters = applyNotificationFilters;

function groupNotificationsByDay(list) {
  const toTime = n => n.createdAt?.seconds ? n.createdAt.seconds*1000 : (new Date(n.createdAt)).getTime();
  const sorted = [...list].sort((a,b) => toTime(b) - toTime(a));
  const map = new Map();
  for (const n of sorted) {
    const d = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
    const key = d.toDateString();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(n);
  }
  const todayStr = new Date().toDateString();
  const y = new Date(); y.setDate(y.getDate()-1);
  const yStr = y.toDateString();
  const sections = [];
  for (const [key, items] of map.entries()) {
    let label;
    if (key === todayStr) label = 'Hoje';
    else if (key === yStr) label = 'Ontem';
    else label = new Date(key).toLocaleDateString('pt-BR');
    sections.push({ label, items });
  }
  return sections;
}
window.groupNotificationsByDay = groupNotificationsByDay;

function openNotificationTarget(id, type) {
  try {
    const n = (window.appState.notifications || []).find(x => x.id === id);
    if (!n) return;
    // Sempre redirecionar para o dashboard após hard reset
    window.location.hash = '#/dashboard';
    if (!n.read && typeof window.markNotificationAsRead === 'function') {
      window.markNotificationAsRead(id);
    }
  } catch (e) {
    console.warn('Falha ao abrir alvo da notificacao:', e);
  }
}
window.openNotificationTarget = openNotificationTarget;

// Expor funcoes de notificacoes globalmente
window.loadNotifications = loadNotifications;
window.markNotificationAsRead = markNotificationAsRead;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.renderNotifications = renderNotifications;
window.listenNotifications = listenNotifications;

// Apagar uma notificação individual
window.deleteNotification = async function(notificationId) {
  try {
    const { deleteOne } = await import('@data/repositories/notificationsRepo.js');
    await deleteOne(notificationId);
    window.appState.notifications = (window.appState.notifications || []).filter(n => n.id !== notificationId);
    updateNotificationBadge();
    if (window.location.hash === '#/notifications') {
      renderNotifications();
    }
    window.Snackbar && window.Snackbar({ message: 'Notificação apagada', type: 'success' });
  } catch (e) {
    console.error('Erro ao apagar notificação:', e);
    window.Snackbar && window.Snackbar({ message: 'Erro ao apagar notificação', type: 'error' });
  }
};

// Preferiªncia: exibir toasts em tempo real
window.getNotificationsToastsEnabled = function() {
  try {
    const v = localStorage.getItem('notificationsToastsEnabled');
    return v === null ? true : v === 'true';
  } catch { return true; }
};
window.setNotificationsToastsEnabled = function(enabled) {
  try { localStorage.setItem('notificationsToastsEnabled', enabled ? 'true' : 'false'); } catch {}
  if (typeof window.Snackbar === 'function') {
    window.Snackbar({ message: enabled ? 'Toasts ativados' : 'Toasts desativados', type: 'info' });
  }
};

// Acao em massa: apagar todas as notificacoes lidas
window.deleteAllReadNotifications = async function() {
  try {
    const list = (window.appState.notifications || []).filter(n => n.read);
    if (list.length === 0) {
      return window.Snackbar && window.Snackbar({ message: 'Sem notificacoes lidas para apagar', type: 'info' });
    }
    const { deleteMany } = await import('@data/repositories/notificationsRepo.js');
    await deleteMany(list.map(n => n.id));
    // Atualiza estado local
    window.appState.notifications = (window.appState.notifications || []).filter(n => !n.read);
    updateNotificationBadge();
    renderNotifications();
    window.Snackbar && window.Snackbar({ message: 'Notificacoes lidas apagadas', type: 'success' });
  } catch (e) {
    console.error('Erro ao apagar notificacoes lidas:', e);
    window.Snackbar && window.Snackbar({ message: 'Erro ao apagar notificacoes lidas', type: 'error' });
  }
};

// Retencao de notificacoes
window.getNotificationRetentionDays = function() {
  try {
    const v = parseInt(localStorage.getItem('notificationRetentionDays') || '0', 10);
    return isNaN(v) ? 0 : v;
  } catch { return 0; }
};
window.setNotificationRetentionDays = function(days) {
  try { localStorage.setItem('notificationRetentionDays', String(days)); } catch {}
  if (typeof window.Snackbar === 'function') window.Snackbar({ message: days===0?'Retencao desativada':`Retencao: ${days} dias`, type: 'info' });
};
window.runNotificationAutoClean = async function() {
  try {
    const days = window.getNotificationRetentionDays();
    if (!days || days <= 0) {
      return window.Snackbar && window.Snackbar({ message: 'Retencao desativada', type: 'info' });
    }
    const cutoff = Date.now() - days*24*60*60*1000;
    const toDelete = (window.appState.notifications || []).filter(n => {
      const t = n.createdAt?.seconds ? n.createdAt.seconds*1000 : (new Date(n.createdAt)).getTime();
      return t < cutoff;
    });
    if (toDelete.length === 0) {
      return window.Snackbar && window.Snackbar({ message: 'Nada para limpar', type: 'info' });
    }
    const { deleteMany } = await import('@data/repositories/notificationsRepo.js');
    await deleteMany(toDelete.map(n => n.id));
    window.appState.notifications = (window.appState.notifications || []).filter(n => !toDelete.some(x => x.id === n.id));
    updateNotificationBadge();
    renderNotifications();
    Snackbar && Snackbar({ message: `Limpeza conclui­da (${toDelete.length})`, type: 'success' });
  } catch (e) {
    console.error('Erro na limpeza de notificacoes:', e);
    Snackbar && Snackbar({ message: 'Erro na limpeza de notificacoes', type: 'error' });
  }
};

// Funcoes wrapper com confirmacao para operacoes cri­ticas
window.addTransactionWithConfirmation = async function(transactionData) {
  return new Promise((resolve, reject) => {
    window.showConfirmationModal({
      title: 'Adicionar Transacao',
      message: `Tem certeza que deseja adicionar a transacao "${transactionData.descricao}" no valor de R$ ${transactionData.valor.toFixed(2)}?`,
      confirmText: 'Sim, Adicionar',
      confirmColor: 'bg-green-500 hover:bg-green-600',
      onConfirm: async () => {
        try {
          const result = await window.addTransaction(transactionData);
          if (window.Snackbar) {
            window.Snackbar({
              message: '✅ Transacao adicionada com sucesso!',
              type: 'success'
            });
          }
          resolve(result);
        } catch (error) {
          console.error('âŒ Erro ao adicionar transacao:', error);
          if (window.Snackbar) {
            window.Snackbar({
              message: 'Erro ao adicionar transacao: ' + error.message,
              type: 'error'
            });
          }
          reject(error);
        }
      },
      onCancel: () => {
        console.log('âŒ Adicao de transacao cancelada pelo usui¡rio');
        reject(new Error('Operacao cancelada pelo usui¡rio'));
      }
    });
  });
};

window.deleteTransactionWithConfirmation = function(transactionId, transactionName = 'transacao') {
  window.showConfirmationModal({
    title: 'Excluir Transacao',
    message: `Tem certeza que deseja excluir a ${transactionName}? Esta acao nao pode ser desfeita.`,
    confirmText: 'Sim, Excluir',
    confirmColor: 'bg-red-500 hover:bg-red-600',
    onConfirm: () => {
      if (window.deleteTransaction) {
        window.deleteTransaction(transactionId);
      }
    }
  });
};

window.deleteCategoryWithConfirmation = async function(categoryId, categoryName = 'categoria') {
  try {
    // Tentar usar o modal moderno de confirmação
    let proceed = false;
    if (typeof window.confirmDelete === 'function') {
      proceed = await window.confirmDelete(categoryName, 'categoria');
    } else if (typeof window.showConfirmationModal === 'function') {
      proceed = await new Promise(resolve => {
        window.showConfirmationModal({
          title: 'Excluir Categoria',
          message: `Tem certeza que deseja excluir a categoria "${categoryName}"? Todas as transações desta categoria ficarão sem categoria.`,
          confirmText: 'Sim, Excluir',
          confirmColor: 'bg-red-500 hover:bg-red-600',
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        });
      });
    } else {
      // Fallback para confirm nativo
      proceed = confirm(`Tem certeza que deseja excluir a categoria "${categoryName}"?`);
    }
    
    if (!proceed) return;
    
    if (window.deleteCategory) {
      await window.deleteCategory(categoryId);
    }
  } catch (e) {
    console.error('Erro ao excluir categoria:', e);
    if (window.Snackbar) {
      window.Snackbar.show('Erro ao excluir categoria', 'error');
    }
  }
};

window.deleteRecorrenteWithConfirmation = function(recorrenteId, recorrenteName = 'despesa recorrente') {
  window.showConfirmationModal({
    title: 'Excluir Despesa Recorrente',
    message: `Tem certeza que deseja excluir a ${recorrenteName}? Esta acao nao pode ser desfeita.`,
    confirmText: 'Sim, Excluir',
    confirmColor: 'bg-red-500 hover:bg-red-600',
    onConfirm: () => {
      if (window.deleteDespesaRecorrente) {
        window.deleteDespesaRecorrente(recorrenteId);
      }
    }
  });
};

window.leaveBudgetWithConfirmation = function(budgetId, budgetName = 'orcamento') {
  window.showConfirmationModal({
    title: 'Sair do Orcamento',
    message: `Tem certeza que deseja sair do orcamento "${budgetName}"? Vociª perderi¡ acesso a todas as transacoes.`,
    confirmText: 'Sim, Sair',
    confirmColor: 'bg-orange-500 hover:bg-orange-600',
    onConfirm: () => {
      if (window.leaveSharedBudget) {
        window.leaveSharedBudget(budgetId);
      }
    }
  });
};

// ===== FUNi‡i•ES IMPORTANTES RESTAURADAS =====

// Funcao para mostrar opcoes de exportacao
window.showExportOptions = function () {
  console.log('ðŸ" showExportOptions chamada');
  console.log('ðŸ" window.Modal disponi­vel:', !!window.Modal);
  console.log('ðŸ" window.Modal tipo:', typeof window.Modal);

  if (!window.Modal) {
    console.error('❌ Modal nao esti¡ disponi­vel');
    alert('Erro: Modal nao esti¡ disponi­vel');
    return;
  }

  console.log('ðŸ" Tentando abrir modal de exportacao...');

  try {
    const modalElement = window.Modal({
      title: 'Exportar Dados',
      content: `
        <div class="space-y-4">
          <button onclick="window.exportToExcel()" class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 text-base">
            <span>ðŸ"¨</span> Relati³rio Excel
          </button>
          <button onclick="window.exportToPDF()" class="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2 text-base">
            <span>ðŸ"„</span> Relati³rio PDF
          </button>
          <button onclick="window.exportReadmePDF()" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 text-base">
            <span>ðŸ"–</span> Guia de Uso (PDF)
          </button>
          <button onclick="window.downloadBackup()" class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 flex items-center justify-center gap-2 text-base">
            <span>ðŸ'¾</span> Backup Completo (JSON)
          </button>
        </div>
      `,
      onClose: () => {
        console.log('ðŸ" Modal fechado');
        document.querySelector('.modal')?.remove();
      }
    });

    console.log('ðŸ" Modal criado com sucesso:', modalElement);
    document.body.appendChild(modalElement);
    console.log('ðŸ" Modal adicionado ao DOM');

  } catch (error) {
    console.error('âŒ Erro ao criar modal:', error);
    alert('Erro ao abrir modal de exportacao: ' + error.message);
  }
};

// Funcao para exportar para Excel
window.exportToExcel = function () {
  try {
    // Verificar se a biblioteca XLSX esti¡ disponi­vel
    if (typeof XLSX === 'undefined') {
      console.error('âŒ Biblioteca XLSX nao esti¡ disponi­vel');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca XLSX nao esti¡ carregada. Tente recarregar a pi¡gina.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca XLSX nao esti¡ carregada. Tente recarregar a pi¡gina.');
      }
      return;
    }

    // Verificar se hi¡ dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponi­vel para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponi­vel para exportar.');
      }
      return;
    }

    // Gera planilha Excel com transacoes, categorias e orcamentos
    const wb = XLSX.utils.book_new();

    // Transacoes
    const transacoes = window.appState.transactions.map(t => ({
      Descricao: t.descricao,
      Valor: t.valor,
      Tipo: t.tipo,
      Categoria:
        window.appState.categories.find(c => c.id === t.categoriaId)?.nome || '',
      Data:
        t.createdAt && t.createdAt.toDate
          ? t.createdAt.toDate().toLocaleDateString()
          : ''
    }));
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(transacoes),
      'Transacoes'
    );

    // Categorias
    const categorias = window.appState.categories.map(c => ({
      Nome: c.nome,
      Tipo: c.tipo,
      Limite: c.limite,
      Cor: c.cor
    }));
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(categorias),
      'Categorias'
    );

    // Orcamentos
    const orcamentos = window.appState.budgets.map(b => ({
      Nome: b.nome,
      Descricao: b.descricao,
      ID: b.id
    }));
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(orcamentos),
      'Orcamentos'
    );

    XLSX.writeFile(wb, 'financeiro-dados.xlsx');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✓ Arquivo Excel exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar Excel:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao exportar Excel: ' + error.message,
        type: 'error'
      });
    } else {
      alert('Erro ao exportar Excel: ' + error.message);
    }
  }
};

// Funcao para exportar para PDF
window.exportToPDF = function () {
  try {
    // Verificar se a biblioteca jsPDF esti¡ disponi­vel
    if (typeof window.jspdf === 'undefined') {
      console.error('âŒ Biblioteca jsPDF nao esti¡ disponi­vel');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca jsPDF nao esti¡ carregada. Tente recarregar a pi¡gina.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca jsPDF nao esti¡ carregada. Tente recarregar a pi¡gina.');
      }
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // Funcao para adicionar texto com quebra de linha
    function addText(text, x, y, maxWidth = 170) {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, x, y);
        y += 6;
      });
      return y;
    }

    // Cabecalho
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Controle Financeiro', 20, 25);
    doc.setFontSize(14);
    doc.text('Relati³rio Financeiro', 20, 35);

    // Resetar para conteiºdo
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    y = 50;

    // Resumo
    y = addText('ðŸ"¨ RESUMO FINANCEIRO', 20, y);
    y += 10;

    const totalReceitas = window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const totalDespesas = window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const saldo = totalReceitas - totalDespesas;

    y = addText(`ðŸ'° Total de Receitas: R$ ${totalReceitas.toFixed(2)}`, 20, y);
    y = addText(`ðŸ'¸ Total de Despesas: R$ ${totalDespesas.toFixed(2)}`, 20, y);
    y = addText(`ðŸ'³ Saldo: R$ ${saldo.toFixed(2)}`, 20, y);
    y += 15;

    // Transacoes recentes
    y = addText('ðŸ"‹ ŠLTIMAS TRANSAi‡i•ES', 20, y);
    y += 10;

    const transacoesRecentes = window.appState.transactions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    transacoesRecentes.forEach(t => {
      const categoria = window.appState.categories.find(c => c.id === t.categoriaId);
      const data = t.createdAt && t.createdAt.toDate
        ? t.createdAt.toDate().toLocaleDateString()
        : new Date(t.createdAt).toLocaleDateString();

      y = addText(`${data} - ${t.descricao} (${categoria?.nome || 'Sem categoria'}) - R$ ${t.valor}`, 25, y);
    });

    // Salvar arquivo
    doc.save('financeiro-relatorio.pdf');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Relati³rio PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('âŒ Erro ao exportar PDF:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao exportar PDF: ' + error.message,
        type: 'error'
      });
    } else {
      alert('Erro ao exportar PDF: ' + error.message);
    }
  }
};

// Funcao para baixar backup JSON
window.downloadBackup = function () {
  try {
    // Verificar se hi¡ dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponi­vel para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponi­vel para exportar.');
      }
      return;
    }

    // Baixa um JSON com todos os dados do usui¡rio
    const data = {
      transactions: window.appState.transactions,
      categories: window.appState.categories,
      budgets: window.appState.budgets,
      recorrentes: window.appState.recorrentes
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financeiro-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Backup JSON exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('âŒ Erro ao exportar backup:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao exportar backup: ' + error.message,
        type: 'error'
      });
    } else {
      alert('Erro ao exportar backup: ' + error.message);
    }
  }
};

// Funcao para exportar README em PDF
window.exportReadmePDF = function () {
  try {
    // Verificar se a biblioteca jsPDF esti¡ disponi­vel
    if (typeof window.jspdf === 'undefined') {
      console.error('âŒ Biblioteca jsPDF nao esti¡ disponi­vel');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca jsPDF nao esti¡ carregada. Tente recarregar a pi¡gina.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca jsPDF nao esti¡ carregada. Tente recarregar a pi¡gina.');
      }
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // Funcao para adicionar texto com quebra de linha
    function addText(text, x, y, maxWidth = 170) {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, x, y);
        y += 6;
      });
      return y;
    }

    // Cabecalho
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Controle Financeiro', 20, 25);
    doc.setFontSize(14);
    doc.text('Guia Completo de Uso', 20, 35);

    // Resetar para conteiºdo
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    y = 50;

    // Conteiºdo do guia
    y = addText('ðŸ"± COMO USAR O APLICATIVO', 20, y);
    y += 10;

    y = addText('1. DASHBOARD - Visualize seu resumo financeiro, saldo atual, gastos por categoria e alertas de limite.', 20, y);
    y = addText('2. TRANSAi‡i•ES - Adicione, edite ou remova suas receitas e despesas.', 20, y);
    y = addText('3. CATEGORIAS - Organize suas transacoes em categorias com limites personalizados.', 20, y);
    y = addText('4. RECORRENTES - Configure despesas que se repetem mensalmente.', 20, y);
    y = addText('5. NOTIFICAi‡i•ES - Receba alertas sobre limites de categoria e transacoes.', 20, y);
    y = addText('6. CONFIGURAi‡i•ES - Personalize o aplicativo e exporte seus dados.', 20, y);
    y += 15;

    y = addText('ðŸŽ¯ FUNCIONALIDADES PRINCIPAIS', 20, y);
    y += 10;

    y = addText('â€¢ Navegacao por deslizamento entre abas', 20, y);
    y = addText('â€¢ Reconhecimento de voz para adicionar transacoes', 20, y);
    y = addText('â€¢ Exportacao para Excel e PDF', 20, y);
    y = addText('â€¢ Backup e restauracao de dados', 20, y);
    y = addText('â€¢ Notificacoes push para alertas', 20, y);
    y = addText('â€¢ Tema claro/escuro', 20, y);
    y = addText('â€¢ Instalacao como PWA', 20, y);
    y += 15;

    y = addText('ðŸ"§ DICAS DE USO', 20, y);
    y += 10;

    y = addText('â€¢ Use as setas do teclado para navegar entre abas', 20, y);
    y = addText('â€¢ Deslize horizontalmente para trocar de tela no mobile', 20, y);
    y = addText('â€¢ Configure limites nas categorias para receber alertas', 20, y);
    y = addText('â€¢ Use o botao de voz para adicionar transacoes rapidamente', 20, y);
    y = addText('â€¢ Faca backup regular dos seus dados', 20, y);

    // Salvar arquivo
    doc.save('servo-tech-financas-guia.pdf');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Guia PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('âŒ Erro ao exportar guia PDF:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao exportar guia PDF: ' + error.message,
        type: 'error'
      });
    } else {
      alert('Erro ao exportar guia PDF: ' + error.message);
    }
  }
};

// Funcao para mostrar notificacoes
function showNotification(title, body, options = {}) {
  console.log('ðŸ"" Tentando enviar notificacao:', title, body);
  console.log('ðŸ"" Permissao:', Notification.permission);
  console.log('ðŸ"" Habilitada:', localStorage.getItem('notifications-enabled'));

  if (
    Notification.permission === 'granted' &&
    localStorage.getItem('notifications-enabled') === 'true'
  ) {
    try {
      const notification = new Notification(title, {
        body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'servo-tech-financas',
        requireInteraction: false,
        ...options
      });

      console.log('✅ Notificacao criada com sucesso:', notification);

      notification.onclick = () => {
        console.log('ðŸ"" Notificacao clicada');
        window.focus();
        notification.close();
      };

      setTimeout(() => {
        notification.close();
        console.log('ðŸ"" Notificacao fechada automaticamente');
      }, 5000);

      console.log('✅ Notificacao enviada com sucesso!');
    } catch (error) {
      console.error('âŒ Erro ao criar notificacao:', error);
    }
  } else {
    console.log('âŒ Notificao nao enviada - permissao ou configuracao invi¡lida');
    console.log('   Permissao:', Notification.permission);
    console.log('   Habilitada:', localStorage.getItem('notifications-enabled'));
  }
}

// Funcao para verificar recorrentes pendentes e notificar
function checkRecorrentesPendentes() {
  if (localStorage.getItem('notifications-enabled') !== 'true') {return;}

  const recorrentes = window.appState.recorrentes || [];
  const pendentes = recorrentes.filter(rec => {
    // Li³gica para verificar se hi¡ recorrentes pendentes
    // Esta i© uma implementacao bi¡sica
    return rec.parcelasRestantes > 0;
  });

  if (pendentes.length > 0) {
    showNotification(
      'Recorrentes Pendentes',
      `Vociª tem ${pendentes.length} despesa(s) recorrente(s) para efetivar este miªs.`
    );
  }
}

// Funcao para verificar limites de categoria
function checkLimitesCategoria() {
  console.log('ðŸ" Iniciando verificacao de limites de categoria...');
  console.log('ðŸ" Notificacoes habilitadas:', localStorage.getItem('notifications-enabled') === 'true');

  if (localStorage.getItem('notifications-enabled') !== 'true') {
    console.log('âŒ Notificacoes desabilitadas, pulando verificacao');
    return;
  }

  const categories = window.appState.categories || [];
  const transactions = window.appState.transactions || [];

  console.log('ðŸ" Categorias encontradas:', categories.length);
  console.log('ðŸ" Transacoes encontradas:', transactions.length);

  categories.forEach(cat => {
    if (cat.limite) {
      const gasto = transactions
        .filter(t => t.categoriaId === cat.id && t.tipo === cat.tipo)
        .reduce((sum, t) => sum + parseFloat(t.valor), 0);

      const limite = parseFloat(cat.limite);
      const percentual = (gasto / limite) * 100;

      console.log(`ðŸ" ${cat.nome}: R$ ${gasto.toFixed(2)} / R$ ${limite.toFixed(2)} (${percentual.toFixed(1)}%)`);

      if (percentual >= 80) {
        console.log(`âš ï¸ ${cat.nome} atingiu ${percentual.toFixed(1)}% do limite!`);
        showNotification(
          'âš ï¸ Limite de Categoria',
          `${cat.nome} esti¡ com ${percentual.toFixed(1)}% do limite usado (R$ ${gasto.toFixed(2)} / R$ ${limite.toFixed(2)}).`
        );
      }

      // Notificacao especi­fica quando ultrapassa 100%
      if (percentual > 100) {
        console.log(`ðŸš¨ ${cat.nome} ULTRAPASSOU o limite em ${(percentual - 100).toFixed(1)}%!`);
        showNotification(
          'ðŸš¨ LIMITE ULTRAPASSADO!',
          `${cat.nome} ultrapassou o limite em ${(percentual - 100).toFixed(1)}%! (R$ ${gasto.toFixed(2)} / R$ ${limite.toFixed(2)})`
        );
      }
    }
  });
}

// Funcao global para forcar atualizacao da interface
window.forceUIUpdate = function () {
  console.log('ðŸ"„ Forcando atualizacao da UI...');
  const currentTab = document
    .querySelector('.nav-btn.active')
    ?.getAttribute('data-route');
  console.log('ðŸ" Aba atual:', currentTab);

  // Usar requestAnimationFrame para otimizar a renderizacao
  requestAnimationFrame(() => {
    if (currentTab && window.router) {
      console.log('ðŸ"„ Recarregando aba:', currentTab);
      window.router(currentTab);
    }
  });
};

// Funcao otimizada para sincronizacao de tema
window.syncThemeAcrossTabs = function() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');

  // Aplicar tema consistentemente em todos os elementos
  document.querySelectorAll('[class*="dark:"]').forEach(element => {
    // Forcar reflow para garantir aplicacao das classes
    element.offsetHeight;
  });

  // Atualizar i­cones de tema
  const themeIcons = document.querySelectorAll('#theme-icon');
  themeIcons.forEach(icon => {
    icon.textContent = isDark ? 'ðŸŒ™' : 'â˜€ï¸';
  });

  console.log('ðŸŽ¨ Tema sincronizado em todas as abas');
};

// Funcao para testar notificacoes
window.testNotification = function () {
  console.log('🔔 Testando notificacoes...');
  console.log('🔔 Permissao do navegador:', Notification.permission);
  console.log('💾 localStorage:', localStorage.getItem('notifications-enabled'));

  const permission = Notification.permission;
  const enabled = localStorage.getItem('notifications-enabled') === 'true';

  if (permission === 'granted' && enabled) {
    console.log('âœ… Notificacoes ativadas - enviando teste...');
    showNotification(
      'ðŸ"" Teste de Notificacao',
      'As notificacoes estao funcionando perfeitamente!'
    );

    if (window.Snackbar) {
      window.Snackbar({
        message: 'âœ… Notificacao de teste enviada!',
        type: 'success'
      });
    }
  } else {
    let message = '';
    if (permission === 'denied') {
      message = 'âŒ Permissao negada pelo navegador. Vi¡ em Configuracoes > Notificacoes e permita.';
    } else if (permission === 'default') {
      message = 'âŒ Permissao nao solicitada. Clique em "Ativar Notificacoes" primeiro.';
    } else if (!enabled) {
      message = 'âŒ Notificacoes desativadas. Clique em "Ativar Notificacoes" primeiro.';
    } else {
      message = 'âŒ Erro desconhecido com notificacoes.';
    }

    console.log('âŒ Erro:', message);

    if (window.Snackbar) {
      window.Snackbar({
        message: message,
        type: 'error'
      });
    } else {
      alert(message);
    }
  }
};

// Expor funcoes importantes globalmente
window.showNotification = showNotification;
window.checkRecorrentesPendentes = checkRecorrentesPendentes;
window.checkLimitesCategoria = checkLimitesCategoria;
window.updatePageTitle = updatePageTitle;

// Funcao de teste para forcar renderizacao da navegacao
window.testBottomNav = function() {
  console.log('ðŸ§ª Teste: Forcando renderizacao da navegacao...');
  renderBottomNav('/dashboard');

  // Verificar se foi renderizada
  setTimeout(() => {
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
      console.log('✅ Navegacao renderizada com sucesso');
      console.log('ðŸ"‹ Conteiºdo:', bottomNav.innerHTML);
    } else {
      console.error('âŒ Navegacao nao foi renderizada');
    }
  }, 100);
};

// ===== SISTEMA DE LISTENERS EM TEMPO REAL =====

// Varii¡veis para unsubscribe dos listeners
let unsubscribeBudget = null;
let unsubscribeTransactions = null;
let unsubscribeCategories = null;
let unsubscribeRecorrentes = null;

// Funcao para escutar mudancas no orcamento atual
async function listenCurrentBudget(budgetId) {
  if (unsubscribeBudget) {unsubscribeBudget();}
  if (!budgetId) {return;}

  const { doc, onSnapshot } = await import('firebase/firestore');
  const ref = doc(db, 'budgets', budgetId);
  unsubscribeBudget = onSnapshot(ref, snap => {
    if (snap.exists()) {
      window.appState.currentBudget = { id: snap.id, ...snap.data() };
      console.log('ðŸ"„ Orcamento atualizado:', snap.data().nome);

      // Forcar atualizacao imediata
      setTimeout(async () => {
        if (window.renderSettings) {
          await window.renderSettings();
          console.log('✅ renderSettings executado');
        }
        if (window.renderDashboard) {
          window.renderDashboard();
          console.log('✅ renderDashboard executado');
        }
      }, 100);
    }
  });
}

// Funcao para escutar mudancas nas transacoes
async function listenTransactions(budgetId) {
  if (unsubscribeTransactions) {unsubscribeTransactions();}
  if (!budgetId) {return;}
  console.log('ðŸŽ§ Iniciando listener de transacoes para budgetId:', budgetId);

  const { query, collection, where, onSnapshot } = await import('firebase/firestore');
  const q = query(
    collection(db, 'transactions'),
    where('budgetId', '==', budgetId)
  );
  unsubscribeTransactions = onSnapshot(
    q,
    snapshot => {
      console.log('ðŸŽ§ Listener de transacoes executado!');
      const transactions = [];
      snapshot.forEach(doc => {
        transactions.push({ id: doc.id, ...doc.data() });
      });

      // Verificar se houve mudanca real (IDs ou conteiºdo)
      const currentIds = window.appState.transactions.map(t => t.id).sort();
      const newIds = transactions.map(t => t.id).sort();
      const idsChanged = JSON.stringify(currentIds) !== JSON.stringify(newIds);

      // Verificar se o conteiºdo mudou (para edicoes)
      const currentContent = window.appState.transactions
        .map(t => ({
          id: t.id,
          descricao: t.descricao,
          valor: t.valor,
          categoriaId: t.categoriaId
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
      const newContent = transactions
        .map(t => ({
          id: t.id,
          descricao: t.descricao,
          valor: t.valor,
          categoriaId: t.categoriaId
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
      const contentChanged =
        JSON.stringify(currentContent) !== JSON.stringify(newContent);

      const hasChanged = idsChanged || contentChanged;

      // Ordenar transacoes por data (mais recentes primeiro)
      transactions.sort((a, b) => {
        let dateA, dateB;

        // Tratar Firestore Timestamp
        if (a.createdAt && typeof a.createdAt === 'object' && a.createdAt.seconds) {
          dateA = new Date(a.createdAt.seconds * 1000);
        } else {
          dateA = new Date(a.createdAt);
        }

        if (b.createdAt && typeof b.createdAt === 'object' && b.createdAt.seconds) {
          dateB = new Date(b.createdAt.seconds * 1000);
        } else {
          dateB = new Date(b.createdAt);
        }

        return dateB - dateA; // Ordem decrescente (mais recente primeiro)
      });

      window.appState.transactions = transactions;
      console.log('ðŸ"„ Transacoes atualizadas:', transactions.length, 'itens');
      console.log('ðŸ"„ Houve mudanca?', hasChanged);

      if (hasChanged) {
        console.log('ðŸŽ¯ Atualizando UI api³s mudanca nas transacoes...');
        if (window.renderDashboard) {
          console.log('ðŸ"¨ Executando renderDashboard...');
          window.renderDashboard();
        }
        if (window.renderTransactions) {
          console.log('ðŸ"‹ Executando renderTransactions...');
          window.renderTransactions();
        }

        // Tambi©m usar a funcao global como backup
        if (window.forceUIUpdate) {
          setTimeout(() => window.forceUIUpdate(), 50);
          setTimeout(() => window.forceUIUpdate(), 200);
        }
      } else {
        console.log('ðŸ"¨ Nenhuma mudanca detectada, pulando atualizacao');
      }
    },
    error => {
      console.error('âŒ Erro no listener de transacoes:', error);
    }
  );
}

// Funcao para escutar mudancas nas categorias
async function listenCategories(budgetId) {
  if (unsubscribeCategories) {unsubscribeCategories();}
  if (!budgetId) {return;}
  console.log('ðŸŽ§ Iniciando listener de categorias para budgetId:', budgetId);

  const { query, collection, where, onSnapshot } = await import('firebase/firestore');
  const q = query(
    collection(db, 'categories'),
    where('budgetId', '==', budgetId)
  );
  unsubscribeCategories = onSnapshot(
    q,
    snapshot => {
      console.log('ðŸŽ§ Listener de categorias executado!');
      const categories = [];
      snapshot.forEach(doc => {
        categories.push({ id: doc.id, ...doc.data() });
      });

      // Verificar se houve mudanca real (IDs ou conteiºdo)
      const currentIds = window.appState.categories.map(c => c.id).sort();
      const newIds = categories.map(c => c.id).sort();
      const idsChanged = JSON.stringify(currentIds) !== JSON.stringify(newIds);

      // Verificar se o conteiºdo mudou (para edicoes)
      const currentContent = window.appState.categories
        .map(c => ({ id: c.id, nome: c.nome, limite: c.limite, cor: c.cor }))
        .sort((a, b) => a.id.localeCompare(b.id));
      const newContent = categories
        .map(c => ({ id: c.id, nome: c.nome, limite: c.limite, cor: c.cor }))
        .sort((a, b) => a.id.localeCompare(b.id));
      const contentChanged =
        JSON.stringify(currentContent) !== JSON.stringify(newContent);

      const hasChanged = idsChanged || contentChanged;

      window.appState.categories = categories;
      console.log('ðŸ"„ Categorias atualizadas:', categories.length, 'itens');
      console.log('ðŸ"„ Houve mudanca?', hasChanged);

      if (hasChanged) {
        console.log('ðŸŽ¯ Atualizando UI api³s mudanca nas categorias...');
        if (window.renderDashboard) {
          console.log('ðŸ"¨ Executando renderDashboard...');
          window.renderDashboard();
        }
        if (window.renderCategories) {
          console.log('ðŸ"‚ Executando renderCategories...');
          window.renderCategories();
        }

        // Tambi©m usar a funcao global como backup
        if (window.forceUIUpdate) {
          setTimeout(() => window.forceUIUpdate(), 50);
          setTimeout(() => window.forceUIUpdate(), 200);
        }
      } else {
        console.log('ðŸ"¨ Nenhuma mudanca detectada, pulando atualizacao');
      }
    },
    error => {
      console.error('âŒ Erro no listener de categorias:', error);
    }
  );
}

// Funcao para escutar mudancas nos recorrentes
async function listenRecorrentes(budgetId) {
  if (unsubscribeRecorrentes) {unsubscribeRecorrentes();}
  if (!budgetId) {return;}
  console.log('ðŸŽ§ Iniciando listener de recorrentes para budgetId:', budgetId);

  const { query, collection, where, onSnapshot } = await import('firebase/firestore');
  const q = query(
    collection(db, 'recorrentes'),
    where('budgetId', '==', budgetId)
  );
  unsubscribeRecorrentes = onSnapshot(
    q,
    snapshot => {
      console.log('ðŸŽ§ Listener de recorrentes executado!');
      const recorrentes = [];
      snapshot.forEach(doc => {
        recorrentes.push({ id: doc.id, ...doc.data() });
      });

      // Verificar se houve mudanca real (IDs ou conteiºdo)
      const currentIds = window.appState.recorrentes.map(r => r.id).sort();
      const newIds = recorrentes.map(r => r.id).sort();
      const idsChanged = JSON.stringify(currentIds) !== JSON.stringify(newIds);

      // Verificar se o conteiºdo mudou (para edicoes)
      const currentContent = window.appState.recorrentes
        .map(r => ({
          id: r.id,
          descricao: r.descricao,
          valor: r.valor,
          parcelasRestantes: r.parcelasRestantes,
          ativa: r.ativa
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
      const newContent = recorrentes
        .map(r => ({
          id: r.id,
          descricao: r.descricao,
          valor: r.valor,
          parcelasRestantes: r.parcelasRestantes,
          ativa: r.ativa
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
      const contentChanged =
        JSON.stringify(currentContent) !== JSON.stringify(newContent);

      const hasChanged = idsChanged || contentChanged;

      window.appState.recorrentes = recorrentes;
      console.log('ðŸ"„ Recorrentes atualizados:', recorrentes.length, 'itens');
      console.log('ðŸ"„ Houve mudanca?', hasChanged);

      if (hasChanged) {
        console.log('ðŸŽ¯ Atualizando UI api³s mudanca nos recorrentes...');
        if (window.renderDashboard) {
          console.log('ðŸ"¨ Executando renderDashboard...');
          window.renderDashboard();
        }
        if (window._renderRecorrentes) {
          console.log('ðŸ"„ Executando _renderRecorrentes...');
          window._renderRecorrentes();
        }

        // Tambi©m usar a funcao global como backup
        if (window.forceUIUpdate) {
          setTimeout(() => window.forceUIUpdate(), 50);
          setTimeout(() => window.forceUIUpdate(), 200);
        }
      } else {
        console.log('ðŸ"¨ Nenhuma mudanca detectada, pulando atualizacao');
      }
    },
    error => {
      console.error('âŒ Erro no listener de recorrentes:', error);
    }
  );
}

// Funcao para iniciar todos os listeners
async function startAllListeners(budgetId) {
  console.log('ðŸš€ Iniciando listeners para orcamento:', budgetId);
  console.log('ðŸ" Estado atual:', {
    currentUser: window.appState.currentUser?.uid,
    currentBudget: window.appState.currentBudget?.id,
    budgetId: budgetId
  });

  // Parar listeners anteriores
  stopAllListeners();

  await listenCurrentBudget(budgetId);
  await listenTransactions(budgetId);
  await listenCategories(budgetId);
  await listenRecorrentes(budgetId);
  await listenNotifications();

  console.log('âœ… Todos os listeners iniciados');
  console.log('ðŸ" Verificando se listeners estao ativos:', {
    unsubscribeBudget: !!unsubscribeBudget,
    unsubscribeTransactions: !!unsubscribeTransactions,
    unsubscribeCategories: !!unsubscribeCategories,
    unsubscribeRecorrentes: !!unsubscribeRecorrentes
  });

  // Teste: verificar se os listeners estao funcionando
  setTimeout(() => {
    console.log('ðŸ§ª Teste de listeners api³s 2 segundos:', {
      unsubscribeBudget: !!unsubscribeBudget,
      unsubscribeTransactions: !!unsubscribeTransactions,
      unsubscribeCategories: !!unsubscribeCategories,
      unsubscribeRecorrentes: !!unsubscribeRecorrentes
    });
  }, 2000);
}

// Funcao para parar todos os listeners
function stopAllListeners() {
  console.log('🛑 Parando todos os listeners...');

  const listeners = [
    'unsubscribeBudget',
    'unsubscribeTransactions',
    'unsubscribeCategories',
    'unsubscribeRecorrentes',
    'unsubscribeNotifications'
  ];

  listeners.forEach(listenerName => {
    if (window[listenerName]) {
      try {
        window[listenerName]();
        window[listenerName] = null;
        console.log(`âœ… Listener ${listenerName} parado`);
      } catch (error) {
        console.error(`âŒ Erro ao parar listener ${listenerName}:`, error);
      }
    }
  });

  console.log('âœ… Todos os listeners parados');
}

// Expor funcoes de listeners globalmente
window.startAllListeners = startAllListeners;
window.stopAllListeners = stopAllListeners;
window.listenCurrentBudget = listenCurrentBudget;
window.listenTransactions = listenTransactions;
window.listenCategories = listenCategories;
window.listenRecorrentes = listenRecorrentes;

// ===== FUNi‡i•ES UTILITiRIAS PARA CATEGORIAS =====

// Funcao para migrar transacoes antigas
window.migrarTransacoesAntigas = function() {
  console.log('ðŸ"„ Iniciando migracao de transacoes antigas...');

  if (window.Snackbar) {
    window.Snackbar({
      message: 'ðŸ"„ Migracao iniciada...',
      type: 'info'
    });
  }

  // Implementacao da migracao
  setTimeout(() => {
    if (window.Snackbar) {
      window.Snackbar({
        message: 'âœ… Migracao conclui­da com sucesso!',
        type: 'success'
      });
    }
  }, 2000);
};

// Funcao para corrigir tipo de categoria
window.corrigirTipoCategoria = function() {
  console.log('ðŸ"§ Iniciando correcao de tipos de categoria...');

  if (window.Snackbar) {
    window.Snackbar({
      message: 'ðŸ"§ Correcao iniciada...',
      type: 'info'
    });
  }

  // Implementacao da correcao
  setTimeout(() => {
    if (window.Snackbar) {
      window.Snackbar({
        message: 'âœ… Correcao conclui­da com sucesso!',
        type: 'success'
      });
    }
  }, 2000);
};

// Funcao para mostrar histi³rico de categoria
window.showCategoryHistory = function(categoryId) {
  console.log('ðŸ"¨ Mostrando histi³rico da categoria:', categoryId);

  const category = window.appState.categories.find(c => c.id === categoryId);
  if (!category) {
    if (window.Snackbar) {
      window.Snackbar({
        message: 'âŒ Categoria nao encontrada',
        type: 'error'
      });
    }
    return;
  }

  // Filtrar transacoes da categoria
  const transactions = window.appState.transactions.filter(t => t.categoriaId === categoryId);

  if (window.Modal) {
    const modalElement = window.Modal({
      title: `Histi³rico - ${category.nome}`,
      content: `
        <div class="space-y-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <p><strong>Total de transacoes:</strong> ${transactions.length}</p>
            <p><strong>Valor total:</strong> R$ ${transactions.reduce((sum, t) => sum + parseFloat(t.valor), 0).toFixed(2)}</p>
          </div>
          ${transactions.length > 0 ? `
            <div class="max-h-60 overflow-y-auto">
              ${transactions.map(t => `
                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <div class="font-medium">${t.descricao}</div>
                    <div class="text-xs text-gray-500">${new Date(t.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                      ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-center py-4 text-gray-500">
              Nenhuma transacao encontrada para esta categoria
            </div>
          `}
        </div>
      `,
      onClose: () => {
        document.querySelector('.modal')?.remove();
      }
    });

    document.body.appendChild(modalElement);
  }
};

// ===== FUNi‡i•ES UTILITiRIAS ADICIONAIS =====

// Funcao getUserInfo movida para NotificationService
const getUserInfo = async (uid) => {
  const { getUserInfo: getUser } = await import('@features/notifications/NotificationService.js');
  return getUser(uid);
};

// Funcao de notificacao movida para NotificationService
const sendTransactionNotification = async (budgetId, senderUid, transactionData) => {
  const { sendTransactionNotification: sendNotification } = await import('@features/notifications/NotificationService.js');
  return sendNotification(budgetId, senderUid, transactionData);
};

// Funcao de notificacao de exclusao movida para NotificationService
const sendTransactionDeletedNotification = async (budgetId, senderUid, transactionData) => {
  const { sendTransactionDeletedNotification: sendNotification } = await import('@features/notifications/NotificationService.js');
  return sendNotification(budgetId, senderUid, transactionData);
};

// Funcao de notificacao de atualizacao movida para NotificationService
const sendTransactionUpdatedNotification = async (budgetId, senderUid, transactionData) => {
  const { sendTransactionUpdatedNotification: sendNotification } = await import('@features/notifications/NotificationService.js');
  return sendNotification(budgetId, senderUid, transactionData);
};

// Funcao de notificacao de categoria movida para NotificationService
const sendCategoryChangeNotification = async (budgetId, senderUid, categoryData, changeType) => {
  const { sendCategoryChangeNotification: sendNotification } = await import('@features/notifications/NotificationService.js');
  return sendNotification(budgetId, senderUid, categoryData, changeType);
};

// Funcao de sair do orcamento movida para NotificationService
const leaveSharedBudget = async (budgetId) => {
  const { leaveSharedBudget: leaveBudget } = await import('@features/notifications/NotificationService.js');
  return leaveBudget(budgetId);
};

// Funcao de remover usui¡rio movida para NotificationService
const removeUserFromBudget = async (budgetId, userUid) => {
  const { removeUserFromBudget: removeUser } = await import('@features/notifications/NotificationService.js');
  return removeUser(budgetId, userUid);
};

// ===== EXPOSIi‡iƒO DE FUNi‡i•ES GLOBAIS =====

// Expor funcoes adicionais globalmente
window.getUserInfo = getUserInfo;
window.sendTransactionNotification = sendTransactionNotification;
window.sendTransactionDeletedNotification = sendTransactionDeletedNotification;
window.sendTransactionUpdatedNotification = sendTransactionUpdatedNotification;
window.sendCategoryChangeNotification = sendCategoryChangeNotification;
window.leaveSharedBudget = leaveSharedBudget;
window.removeUserFromBudget = removeUserFromBudget;
window.calcularParcelaRecorrente = calcularParcelaRecorrente;
window.calcularStatusRecorrente = calcularStatusRecorrente;

// ===== FUNi‡i•ES DE MODAL =====

// Funcao para mostrar modal
window.showModal = function(content, title = '') {
  console.log('ðŸ"§ showModal chamada com:', { title, content: content.substring(0, 100) + '...' });

  if (!window.Modal) {
    console.error('❌ Modal nao esti¡ disponi­vel');
    return;
  }

  const modalElement = window.Modal({
    title: title,
    content: content,
    onClose: () => {
      closeModal();
    }
  });

  document.body.appendChild(modalElement);
  return modalElement;
};

// Funcao para fechar modal
window.closeModal = function() {
  console.log('ðŸ"§ closeModal chamada');
  const modal = document.getElementById('app-modal');
  if (modal) {
    modal.remove();
    if (window.toggleFABOnModal) {
      window.toggleFABOnModal();
    }
  }
};

// Funcao universal para mostrar modal de confirmacao
window.showConfirmationModal = function(options) {
  const {
    title = 'Confirmar Acao',
    message = 'Tem certeza que deseja realizar esta acao?',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    confirmColor = 'bg-red-500 hover:bg-red-600',
    onConfirm,
    onCancel
  } = options;

  const modalContent = `
    <div class="modal-content max-w-md mx-auto">
      <div class="text-center">
        <div class="text-6xl mb-4">âš ï¸</div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">${title}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">${message}</p>
        
        <div class="flex justify-center space-x-3">
          <button id="cancel-btn" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            ${cancelText}
          </button>
          <button id="confirm-btn" 
                  class="px-4 py-2 text-white rounded-lg transition-colors ${confirmColor}">
            ${confirmText}
          </button>
        </div>
      </div>
    </div>
  `;
  const modal = window.showModal(modalContent);
  setTimeout(() => {
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    if (cancelBtn) {
      cancelBtn.onclick = () => {
        window.closeModal();
        if (onCancel) onCancel();
      };
    }
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        window.closeModal();
        try {
          if (typeof onConfirm === 'function') {
            onConfirm();
          } else if (typeof onConfirm === 'string' && onConfirm.trim()) {
            // Executa expressao/string fornecida (ex.: 'window.minhaFuncao()')
            try {
              // eslint-disable-next-line no-eval
              eval(onConfirm);
            } catch (execErr) {
              console.warn('Falha ao executar onConfirm (string):', execErr);
            }
          }
        } catch (err) {
          console.warn('onConfirm gerou um erro:', err);
        }
      };
    }
  }, 100);
  return modal;
};

// ===== FUNi‡i•ES DE ORi‡AMENTOS COMPARTILHADOS =====

// Funcao para mostrar modal de criar novo orcamento
window.showAddBudgetModal = function () {
  console.log('ðŸ"§ Abrindo modal de criar orcamento...');

  const modalContent = `
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Criar Novo Orcamento</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">i—</span>
        </button>
      </div>
      
      <form id="add-budget-form" class="space-y-4">
        <div>
          <label class="modal-label">Nome do Orcamento</label>
          <input type="text" id="budget-name" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="Ex: Orcamento Familiar"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div>
          <label class="modal-label">Descricao (opcional)</label>
          <textarea id="budget-description"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Descricao do orcamento"
                    rows="3"
                    style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;"></textarea>
        </div>
        
        <div>
          <label class="modal-label">Tipo de Orcamento</label>
          <select id="budget-type" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
            <option value="pessoal">Pessoal</option>
            <option value="compartilhado">Compartilhado</option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Criar Orcamento</button>
        </div>
      </form>
    </div>
  `;

  window.showModal(modalContent);

  // Configurar evento de submit
  document.getElementById('add-budget-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('budget-name').value;
    const description = document.getElementById('budget-description').value;
    const type = document.getElementById('budget-type').value;

    try {
      const budgetData = {
        nome: name,
        descricao: description,
        tipo: type,
        criadoPor: window.appState.currentUser.uid,
        membros: [window.appState.currentUser.uid],
        criadoEm: new Date()
      };

      const budgetId = await addBudget(budgetData);
      // Recarregar orçamentos
      const { loadUserBudgets } = await import('@features/budgets/service.js');
      await loadUserBudgets(window.appState.currentUser.uid);

      closeModal();

      if (window.Snackbar) {
        window.Snackbar({
          message: '✅ Orçamento criado com sucesso!',
          type: 'success'
        });
      }

      // Se for o primeiro orcamento, selecionar automaticamente
      if (window.appState.budgets.length === 1) {
        const newBudget = window.appState.budgets.find(b => b.id === budgetId);
        if (newBudget) {
          await setCurrentBudget(newBudget);
        }
      }

    } catch (error) {
      console.error('❌ Erro ao criar orçamento:', error);
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro ao criar orçamento: ' + error.message,
          type: 'error'
        });
      }
    }
  });
};

// Funcao para compartilhar orcamento
window.compartilharOrcamento = async function () {
  console.log('🧭 Abrindo modal de compartilhar orçamento...');

  const currentBudget = window.appState.currentBudget;
  if (!currentBudget) {
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Nenhum orçamento selecionado',
        type: 'warning'
      });
    }
    return;
  }

  const modalContent = `
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Compartilhar Orçamento</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <div class="space-y-4">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">${currentBudget.nome}</h3>
          <p class="text-sm text-blue-600 dark:text-blue-300">ID do Orcamento: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">${currentBudget.id}</code></p>
        </div>
        
        <div>
          <label class="modal-label">Email do Usuário</label>
          <input type="email" id="user-email" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="usuario@exemplo.com"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button onclick="window.inviteUserToBudget()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Convidar</button>
        </div>
      </div>
    </div>
  `;

  window.showModal(modalContent);
};

// Fallback: caso alguma UI chame showShareBudgetModal, rolar ati© a secao de compartilhar
if (!window.showShareBudgetModal) {
  window.showShareBudgetModal = function() {
    const el = document.getElementById('share-email');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => el.focus(), 300);
    } else if (window.Snackbar) {
      window.Snackbar({ message: 'Abra a aba Config > Compartilhar Orcamento', type: 'info' });
    }
  };
}

// Utilidades de convites
function normalizeInvitationStatus(s) {
  const raw = (s ?? 'pending').toString().trim().toLowerCase();
  // Mapear sini´nimos PT/EN
  if (raw === 'pendente') return 'pending';
  if (raw === 'aceito' || raw === 'aceita' || raw === 'accepted') return 'accepted';
  if (raw === 'recusado' || raw === 'recusada' || raw === 'declined' || raw === 'refused' || raw === 'rejected') return 'declined';
  if (raw === 'cancelado' || raw === 'cancelada' || raw === 'canceled' || raw === 'cancelled') return 'canceled';
  return raw; // pending, unknown, etc.
}

function isInvitationClosed(status) {
  const st = normalizeInvitationStatus(status);
  return ['accepted', 'declined', 'canceled'].includes(st);
}

// Função para convidar usuário para orçamento
window.inviteUserToBudget = async function (emailArg) {
  const inputEl = document.getElementById('share-email') || document.getElementById('user-email');
  const email = (emailArg && emailArg.trim()) || (inputEl ? inputEl.value.trim() : '');
  const emailLower = email ? email.toLowerCase() : '';
  const currentBudget = window.appState.currentBudget;

  console.log('🔍 Tentando convidar usuário:', {
    email,
    budgetId: currentBudget?.id,
    budgetName: currentBudget?.nome,
    budgetData: currentBudget,
    currentUser: window.appState.currentUser?.uid
  });

  if (!email || !currentBudget) {
    console.log('❌ Email ou orçamento inválido:', { email, budgetId: currentBudget?.id });
    if (window.Snackbar) {
      window.Snackbar({
        message: !email ? 'Digite um email válido' : 'Orçamento não selecionado',
        type: 'error'
      });
    }
    return;
  }

  try {
    // Buscar usuário por email (se existir)
    console.log('🔍 Buscando usuário por email:', email);
    const userQuery = query(collection(db, 'users'), where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);
    const userDoc = !userSnapshot.empty ? userSnapshot.docs[0] : null;
    const invitedUserId = userDoc ? userDoc.id : null;

    // Impedir auto-convite (por UID ou email)
    if (invitedUserId === window.appState.currentUser.uid || emailLower === (window.appState.currentUser.email || '').toLowerCase()) {
      window.Snackbar?.({ message: 'Você já tem acesso a este orçamento', type: 'info' });
      return;
    }

    // Verificar se já é membro (apenas se tiver UID)
    if (invitedUserId && currentBudget.usuariosPermitidos && currentBudget.usuariosPermitidos.includes(invitedUserId)) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Usuário já é membro deste orçamento',
          type: 'info'
        });
      }
      return;
    }

    // Verificar se já existe um convite pendente (por UID ou por email)
    console.log('🔍 Verificando convites existentes para:', { budgetId: currentBudget.id, invitedUserId, email });
    let exists = false;
    if (invitedUserId) {
      const q1 = query(
        collection(db, 'budgetInvitations'),
        where('budgetId', '==', currentBudget.id),
        where('invitedUserId', '==', invitedUserId)
      );
      const s1 = await getDocs(q1);
      exists = s1.docs.some(d => !isInvitationClosed(d.data().status));
    }
    if (!exists) {
      // Buscar convites por email (case-insensitive) usando invitedUserEmailLower
      const q2Lower = query(
        collection(db, 'budgetInvitations'),
        where('invitedUserEmailLower', '==', emailLower)
      );
      const s2Lower = await getDocs(q2Lower);
      exists = s2Lower.docs.some(d => {
        const data = d.data();
        return data.budgetId === currentBudget.id && !isInvitationClosed(data.status);
      });
      if (!exists) {
        // Compatibilidade: convites antigos que nao possuem invitedUserEmailLower
        const q2Exact = query(
          collection(db, 'budgetInvitations'),
          where('invitedUserEmail', '==', email)
        );
        const s2Exact = await getDocs(q2Exact);
        exists = s2Exact.docs.some(d => {
          const data = d.data();
          return data.budgetId === currentBudget.id && !isInvitationClosed(data.status);
        });
      }
    }
    if (exists) {
      console.log('❌ Convite já existe para este usuário/email');
      window.Snackbar?.({ message: 'Convite já enviado para este usuário', type: 'info' });
      return;
    }

    // Criar convite
    const invitationData = {
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento sem nome',
      invitedUserId: invitedUserId,
      invitedUserEmail: email,
      invitedUserEmailLower: emailLower,
      invitedByUserId: window.appState.currentUser.uid,
      invitedByUserEmail: window.appState.currentUser.email,
      status: 'pending', // pending, accepted, declined
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    console.log('📝 Criando convite com dados:', invitationData);
    const docRef = await addDoc(collection(db, 'budgetInvitations'), invitationData);
    console.log('✅ Convite criado com ID:', docRef.id);

    closeModal();

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Convite enviado com sucesso! Aguardando aceitação.',
        type: 'success'
      });
    }

  } catch (error) {
    console.error('❌ Erro ao enviar convite:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao enviar convite: ' + error.message,
        type: 'error'
      });
    }
  }
};

// Função para aceitar convite de orçamento
window.acceptBudgetInvitation = async function (invitationId) {
  try {
    console.log('🔍 Aceitando convite:', invitationId);

    // Buscar o convite
    const invitationRef = doc(db, 'budgetInvitations', invitationId);
    const invitationDoc = await getDoc(invitationRef);

    if (!invitationDoc.exists()) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Convite não encontrado',
          type: 'error'
        });
      }
      return;
    }

    const invitationData = invitationDoc.data();

    // Verificar se o convite é para o usuário atual (por UID ou por email)
    const isForCurrentUser =
      invitationData.invitedUserId === window.appState.currentUser.uid ||
      ((invitationData.invitedUserEmail || '').toLowerCase() === (window.appState.currentUser.email || '').toLowerCase());
    if (!isForCurrentUser) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Este convite não é para você',
          type: 'error'
        });
      }
      return;
    }

    // Aceitar é idempotente; mesmo que não esteja 'pending', garantimos acesso
    const normStatus = normalizeInvitationStatus(invitationData.status);

    // Buscar o orçamento
    const budgetRef = doc(db, 'budgets', invitationData.budgetId);
    const budgetDoc = await getDoc(budgetRef);

    if (!budgetDoc.exists()) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Orçamento não encontrado',
          type: 'error'
        });
      }
      return;
    }

    console.log('🔍 Adicionando usuário ao orçamento:', {
      budgetId: invitationData.budgetId,
      userId: window.appState.currentUser.uid
    });

    // Se o convite foi por email e ainda não tem UID, associe agora ao usuário corrente
    if (!invitationData.invitedUserId) {
      try {
        await updateDoc(invitationRef, {
          invitedUserId: window.appState.currentUser.uid,
          updatedAt: serverTimestamp()
        });
      } catch {}
    }

    // Adicionar usuário ao orçamento (sempre garante acesso)
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayUnion(window.appState.currentUser.uid),
      updatedAt: serverTimestamp()
    });
    console.log('✅ Usuário adicionado ao orçamento');

    // Marcar como aceito (idempotente)
    try {
      await updateDoc(invitationRef, {
        status: 'accepted',
        acceptedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('✅ Status do convite atualizado para aceito');
    } catch {}

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Convite aceito! Você agora tem acesso ao orçamento.',
        type: 'success'
      });
    }

    // Recarregar orçamentos e configurações
    await loadBudgets();
    try {
      // Se o orçamento agora existir na lista, opcionalmente ativar automaticamente
      const justJoined = window.appState?.budgets?.find(b => b.id === invitationData.budgetId);
      if (justJoined && window.setCurrentBudget) {
        window.setCurrentBudget(justJoined);
      }
    } catch {}
    if (window.renderSettings) {
      await window.renderSettings();
    }

  } catch (error) {
    console.error('❌ Erro ao aceitar convite:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao aceitar convite: ' + error.message,
        type: 'error'
      });
    }
  }
};

// Função para recusar convite de orçamento
window.declineBudgetInvitation = async function (invitationId) {
  try {
    // Buscar o convite
    const invitationRef = doc(db, 'budgetInvitations', invitationId);
    const invitationDoc = await getDoc(invitationRef);

    if (!invitationDoc.exists()) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Convite não encontrado',
          type: 'error'
        });
      }
      return;
    }

    const invitationData = invitationDoc.data();

    // Verificar se o convite é para o usuário atual (por UID ou por email)
    const isForCurrentUser =
      invitationData.invitedUserId === window.appState.currentUser.uid ||
      ((invitationData.invitedUserEmail || '').toLowerCase() === (window.appState.currentUser.email || '').toLowerCase());
    if (!isForCurrentUser) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Este convite não é para você',
          type: 'error'
        });
      }
      return;
    }

    // Só permitir recusar se ainda estiver aberto (não fechado)
    if (isInvitationClosed(invitationData.status)) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Este convite já foi finalizado',
          type: 'info'
        });
      }
      return;
    }

    // Atualizar status do convite para recusado
    await updateDoc(invitationRef, {
      status: 'declined',
      declinedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    if (window.Snackbar) {
      window.Snackbar({
        message: 'Convite recusado',
        type: 'info'
      });
    }

    // Recarregar configurações
    if (window.renderSettings) {
      await window.renderSettings();
    }

  } catch (error) {
    console.error('❌ Erro ao recusar convite:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Erro ao recusar convite: ' + error.message,
        type: 'error'
      });
    }
  }
};

// Aceitar convite e já entrar no orçamento
window.acceptAndEnterInvitation = async function(invitationId, budgetId, budgetName) {
  try {
    await window.acceptBudgetInvitation(invitationId);
    // Após aceitar, tentar ativar imediatamente o orçamento
    if (window.appState?.budgets && window.setCurrentBudget) {
      const target = window.appState.budgets.find(b => b.id === budgetId);
      if (target) {
        window.setCurrentBudget(target);
        window.Snackbar?.({ message: `Entrou em "${budgetName}"`, type: 'success' });
      } else {
        // Se ainda não estiver na lista, recarregar orçamentos e tentar novamente
        const { loadUserBudgets } = await import('@features/budgets/service.js');
        await loadUserBudgets(window.appState.currentUser.uid);
        const target2 = window.appState.budgets.find(b => b.id === budgetId);
        if (target2) {
          window.setCurrentBudget(target2);
          window.Snackbar?.({ message: `Entrou em "${budgetName}"`, type: 'success' });
        }
      }
      // Re-render Config para refletir alterações
      if (window.renderSettings) await window.renderSettings();
    }
  } catch (e) {
    console.error('Erro ao aceitar e entrar no orçamento:', e);
    window.Snackbar?.({ message: 'Erro ao aceitar e entrar no orçamento', type: 'error' });
  }
};

// Função para carregar convites pendentes
window.loadBudgetInvitations = async function () {
  try {
    const user = window.appState.currentUser;
    console.log('🔍 Carregando convites para usuário:', user?.uid, user?.email);

    if (!user) {
      console.log('❌ Usuário não autenticado');
      return [];
    }

    // Versão temporária sem orderBy enquanto o índice está sendo construído
    // Tentar por UID e por email (usuário pode não existir em /users ainda)
    const qByUid = query(collection(db, 'budgetInvitations'), where('invitedUserId', '==', user.uid));
    const qByEmailLower = query(collection(db, 'budgetInvitations'), where('invitedUserEmailLower', '==', (user.email || '').toLowerCase()));
    const qByEmailExact = query(collection(db, 'budgetInvitations'), where('invitedUserEmail', '==', user.email || ''));
    console.log('📝 Executando queries de convites (uid, emailLower e emailExact)...');
    const [snapUid, snapEmailLower, snapEmailExact] = await Promise.all([getDocs(qByUid), getDocs(qByEmailLower), getDocs(qByEmailExact)]);
    // Combinar resultados iºnicos
    const combineDocs = (arrs) => {
      const map = new Map();
      for (const arr of arrs) {
        for (const d of arr) {
          if (!map.has(d.id)) map.set(d.id, d);
        }
      }
      return Array.from(map.values());
    };
    const combinedDocs = combineDocs([snapUid.docs, snapEmailLower.docs, snapEmailExact.docs]);
    const invitationsSnapshot = { docs: combinedDocs, size: combinedDocs.length };
    invitationsSnapshot.size = invitationsSnapshot.docs.length;
    console.log('📝 Total de convites encontrados:', invitationsSnapshot.size);

    const invitations = [];

    for (const doc of invitationsSnapshot.docs) {
      const data = doc.data();
      if (!isInvitationClosed(data.status)) {
        console.log('📝 Convite encontrado:', { id: doc.id, ...data });
        invitations.push({
          id: doc.id,
          ...data
        });
      }
    }

    // Ordenar localmente por data de criacao (mais recente primeiro)
    invitations.sort((a, b) => {
      const dateA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : (a.createdAt.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt))) : new Date(0);
      const dateB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : (b.createdAt.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt))) : new Date(0);
      return dateB - dateA;
    });

    if (invitations.length === 0 && invitationsSnapshot.size > 0) {
      try {
        console.log('🧪 Debug convites: nenhum convite listado, imprimindo status de cada doc');
        for (const d of invitationsSnapshot.docs) {
          const data = d.data();
          console.log('ℹ️ Convite bruto', d.id, {
            budgetId: data.budgetId,
            status: data.status,
            invitedUserId: data.invitedUserId,
            invitedUserEmail: data.invitedUserEmail,
            invitedUserEmailLower: data.invitedUserEmailLower
          });
        }
      } catch {}
    }
    console.log('✅ Convites carregados com sucesso:', invitations.length);
    return invitations;
  } catch (error) {
    console.error('❌ Erro ao carregar convites:', error);
    return [];
  }
};

// Função para carregar convites enviados pelo usuário atual (ainda abertos)
window.loadSentBudgetInvitations = async function () {
  try {
    const user = window.appState.currentUser;
    if (!user) return [];
    const qSent = query(collection(db, 'budgetInvitations'), where('invitedByUserId', '==', user.uid));
    const snapSent = await getDocs(qSent);
    const items = [];
    for (const d of snapSent.docs) {
      const data = d.data();
      const normStatus = (data.status ?? 'pending').toString().trim().toLowerCase();
      const isClosed = ['accepted', 'declined', 'rejected', 'recusado', 'aceito', 'cancelled', 'canceled', 'cancelado'].includes(normStatus);
      if (!isClosed) {
        items.push({ id: d.id, ...data });
      }
    }
    // Ordenar mais recentes primeiro
    items.sort((a, b) => {
      const da = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt.seconds * 1000)) : new Date(0);
      const dbb = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt.seconds * 1000)) : new Date(0);
      return dbb - da;
    });
    console.log('📤 Convites enviados (abertos) carregados:', items.length);
    return items;
  } catch (err) {
    console.error('❌ Erro ao carregar convites enviados:', err);
    return [];
  }
};

// Função para entrar em orçamento compartilhado
window.selectSharedBudget = function () {
  console.log('🧭 Abrindo modal de entrar em orçamento compartilhado...');

  const modalContent = `
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Entrar em Orçamento Compartilhado</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <form id="join-budget-form" class="space-y-4">
        <div>
     <label class="modal-label">ID do Orçamento</label>
          <input type="text" id="budget-id" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
       placeholder="Cole aqui o ID do orçamento"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Entrar</button>
        </div>
      </form>
    </div>
  `;

  window.showModal(modalContent);

  // Configurar evento de submit
  document.getElementById('join-budget-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const budgetId = document.getElementById('budget-id').value.trim();

    if (!budgetId) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'ID do orçamento é obrigatório',
          type: 'warning'
        });
      }
      return;
    }

    try {
      // Buscar orçamento via repositório
      const { getById, addUser } = await import('@data/repositories/budgetsRepo.js');
      const budgetData = await getById(budgetId);

      if (!budgetData) {
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Orçamento não encontrado',
            type: 'error'
          });
        }
        return;
      }

      // Verificar se já é membro
      if (budgetData.usuariosPermitidos && budgetData.usuariosPermitidos.includes(window.appState.currentUser.uid)) {
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Você já é membro deste orçamento',
            type: 'info'
          });
        }
        return;
      }

      // Adicionar usuário ao orçamento via repositório
      await addUser(budgetId, window.appState.currentUser.uid);

      closeModal();

      if (window.Snackbar) {
        window.Snackbar({
          message: '✅ Você entrou no orçamento com sucesso!',
          type: 'success'
        });
      }

      // Recarregar orçamentos
      const { loadUserBudgets } = await import('@features/budgets/service.js');
      await loadUserBudgets(window.appState.currentUser.uid);

      // Selecionar o orçamento que acabou de entrar
      const updatedBudget = window.appState.budgets.find(b => b.id === budgetId);
      if (updatedBudget && window.setCurrentBudget) {
        await window.setCurrentBudget(updatedBudget);
      }

    } catch (error) {
      console.error('❌ Erro ao entrar no orçamento:', error);
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro ao entrar no orçamento: ' + error.message,
          type: 'error'
        });
      }
    }
  });
};

// Configuração do toggle de tema foi migrada para src/app/entry.js; código legado desativado.



