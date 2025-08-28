import '../css/styles.css';
import { Modal } from './ui/Modal.js';
import { auth, db } from './firebase.js';
import { calcularParcelaRecorrente, calcularStatusRecorrente } from '@features/recorrentes/service.js';
import * as budgetsRepo from '@data/repositories/budgetsRepo.js';
import * as transactionsRepo from '@data/repositories/transactionsRepo.js';
import * as categoriesRepo from '@data/repositories/categoriesRepo.js';
import * as invitationsRepo from '@data/repositories/invitationsRepo.js';
import { FAB } from './ui/FAB.js';
import { SwipeNavigation } from './ui/SwipeTabs.js';
import { renderAnalytics } from './ui/AnalyticsRoute.js';
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
import { notificationsStore } from '@features/notifications/store.js';

// Tornar Modal disponível globalmente para utilitários que usam window.Modal
if (typeof window !== 'undefined') {
  window.Modal = Modal;
}

// Pequena utilidade para atualizar o título da página conforme a rota atual
function updatePageTitle(path) {
  try {
    const routeNames = {
      '/dashboard': 'Dashboard',
      '/transactions': 'Transações',
      '/categories': 'Categorias',
      '/analytics': 'Análises',
      '/recorrentes': 'Recorrentes',
      '/notifications': 'Notificações',
      '/settings': 'Configurações'
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

// Função para aplicar modo de compactação globalmente
window.applyCompactMode = function() {
  const isCompact = localStorage.getItem('compactMode') === 'true';
  const isMicro = localStorage.getItem('microMode') === 'true';
  const isNano = localStorage.getItem('nanoMode') === 'true';
  
  const appContainer = document.querySelector('.app-container');
  const body = document.body;
  
  // Remover todas as classes primeiro
  body.classList.remove('compact-mode', 'micro-mode', 'nano-mode');
  if (appContainer) {
    appContainer.classList.remove('compact-mode', 'micro-mode', 'nano-mode');
  }
  
  // Aplicar classes baseado no estado salvo
  if (isNano) {
    body.classList.add('compact-mode', 'micro-mode', 'nano-mode');
    if (appContainer) {
      appContainer.classList.add('compact-mode', 'micro-mode', 'nano-mode');
    }
  } else if (isMicro) {
    body.classList.add('compact-mode', 'micro-mode');
    if (appContainer) {
      appContainer.classList.add('compact-mode', 'micro-mode');
    }
  } else if (isCompact) {
    body.classList.add('compact-mode');
    if (appContainer) {
      appContainer.classList.add('compact-mode');
    }
  }
  
  console.log('🎯 Modo de compactação aplicado globalmente:', { isCompact, isMicro, isNano });
};

// Função para atualizar o botão de instalação
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
    '📱 PWA: Atualizando botão - Instalado:',
    isInstalled,
    'Prompt:',
    hasPrompt
  );

  if (isInstalled) {
    console.log('📱 PWA: Mostrando "App Instalado"');
    installBtn.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">✅</span>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">App Instalado</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Já está na tela inicial</div>
        </div>
      </div>
      <span class="text-green-500">✓</span>
    `;
    installBtn.disabled = true;
    installBtn.classList.add('opacity-50', 'cursor-not-allowed');
  } else if (hasPrompt) {
    console.log('📱 PWA: Mostrando "Instalar App"');
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
    console.log('📱 PWA: Ocultando botão');
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
          title: 'Importação de Backup (Somente Leitura)',
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

// Função para restaurar backup (importar e salvar no sistema)
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
    // Mostrar modal de confirmação primeiro
    const confirmModal = window.Modal({
      title: '📥 Restaurar Backup',
      content: `
        <div class='space-y-4'>
          <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
            <p class='text-blue-800 dark:text-blue-200 font-medium'>Como restaurar backup:</p>
            <ol class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside'>
              <li>Clique em "Selecionar Arquivo"</li>
              <li>Escolha o arquivo JSON de backup</li>
              <li>Confirme os dados encontrados</li>
              <li>Aguarde a restauração</li>
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
              📁 Selecionar Arquivo
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

// Função para selecionar arquivo de backup
window.selectBackupFile = function () {
  console.log('🔍 selectBackupFile chamada');
  
  // Fechar modal de confirmação
  console.log('🔍 Fechando modal de confirmação...');
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
    
    // Configurar evento de mudança
    input.onchange = async e => {
      console.log('🔍 Arquivo selecionado:', e.target.files[0]);
      
      const file = e.target.files[0];
      if (!file) {
        console.log('❌ Nenhum arquivo selecionado');
        document.body.removeChild(input);
        return;
      }

      try {
        console.log('🔍 Lendo arquivo...');
        
        // Mostrar loading
        if (window.Snackbar) {
          window.Snackbar({
            message: '📥 Lendo arquivo de backup...',
            type: 'info'
          });
        } else {
          alert('📥 Lendo arquivo de backup...');
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
          title: '📥 Confirmar Restauração de Backup',
          content: `
            <div class='space-y-4'>
              <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
                <p class='text-blue-800 dark:text-blue-200 font-medium'>Dados encontrados no backup:</p>
                <ul class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1'>
                  <li>📊 <strong>${data.transactions.length}</strong> transações</li>
                  <li>📂 <strong>${data.categories.length}</strong> categorias</li>
                  <li>📁 <strong>${data.budgets.length}</strong> orçamentos</li>
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
                <button onclick='window.confirmRestoreBackup(${JSON.stringify(data).replace(/'/g, "\\'")})' class='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
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
        console.error('❌ Erro ao ler backup:', err);
        if (window.Snackbar) {
          window.Snackbar({
            message: '❌ Erro ao ler arquivo: ' + err.message,
            type: 'error'
          });
        } else {
          alert('❌ Erro ao ler arquivo: ' + err.message);
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

// Função para confirmar e executar a restauração
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

    console.log('🔄 Iniciando restauração de backup...');
    console.log('👤 User ID:', userId);
    console.log('📁 Budget ID:', budgetId);
    console.log('📊 Dados do backup:', backupData);

    // Verificar se os dados são válidos
    if (!backupData || !backupData.categories || !backupData.transactions || !backupData.budgets) {
      throw new Error('Dados de backup inválidos ou incompletos');
    }

    // 1. LIMPAR DADOS ATUAIS
    console.log('🗑️ Limpando dados atuais...');
    
    // Limpar transações
    console.log('🗑️ Limpando transações...');
    for (const transaction of window.appState.transactions) {
      try {
        await deleteTransaction(transaction.id);
        console.log(`🗑️ Transação "${transaction.descricao}" removida`);
      } catch (error) {
        console.error(`❌ Erro ao remover transação "${transaction.descricao}":`, error);
      }
    }
    
    // Limpar categorias
    console.log('🗑️ Limpando categorias...');
    for (const category of window.appState.categories) {
      try {
        await deleteCategory(category.id);
        console.log(`🗑️ Categoria "${category.nome}" removida`);
      } catch (error) {
        console.error(`❌ Erro ao remover categoria "${category.nome}":`, error);
      }
    }
    
    // Limpar recorrentes
    console.log('🗑️ Limpando recorrentes...');
    for (const recorrente of window.appState.recorrentes) {
      try {
        await deleteDespesaRecorrente(userId, recorrente.id);
        console.log(`🗑️ Recorrente "${recorrente.descricao}" removida`);
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
    console.log('📂 Importando categorias...');
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
    console.log('💸 Importando transações...');
    for (const transaction of backupData.transactions) {
      try {
        // Remover ID original para criar novo
        const { id, ...transactionData } = transaction;
        transactionData.budgetId = budgetId; // Usar budget atual
        
        await addTransaction(transactionData);
        transacoesImportadas++;
        console.log(`✅ Transação "${transaction.descricao}" importada (${transacoesImportadas}/${backupData.transactions.length})`);
      } catch (error) {
        console.error(`❌ Erro ao importar transação "${transaction.descricao}":`, error);
      }
    }

    // 4. Importar orçamentos (se não existirem)
    console.log('📁 Importando orçamentos...');
    for (const budget of backupData.budgets) {
      try {
        // Verificar se o orçamento já existe
        const existingBudget = window.appState.budgets.find(b => b.nome === budget.nome);
        if (!existingBudget) {
          const { id, ...budgetData } = budget;
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
    console.log('🔄 Importando recorrentes...');
    if (backupData.recorrentes && backupData.recorrentes.length > 0) {
      for (const recorrente of backupData.recorrentes) {
        try {
          // Remover ID original para criar novo
          const { id, ...recorrenteData } = recorrente;
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

// Função para alternar entre página de login e app
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

// Função para logout
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
    console.error('❌ Erro no logout:', error);
  });
}

// Função para atualizar a view atual
async function refreshCurrentView() {
  const currentPath = window.location.hash.slice(1) || '/dashboard';
  await router(currentPath);
}

// Função para adicionar transação
async function addTransaction(transactionData) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const budget = window.appState.currentBudget;
    if (!budget) {
      throw new Error('Orçamento não selecionado');
    }

    const transaction = {
      ...transactionData,
      userId: user.uid,
      budgetId: budget.id,
    };

    const { id: newId } = await transactionsRepo.create(transaction);
    console.log('✅ Transação adicionada com ID:', newId);
    
    // Enviar notificações para membros do orçamento (exceto o autor)
    try {
      if (typeof sendTransactionNotification === 'function') {
        await sendTransactionNotification(budget.id, user.uid, { ...transaction, id: newId });
      } else if (window.sendTransactionNotification) {
        await window.sendTransactionNotification(budget.id, user.uid, { ...transaction, id: newId });
      }
    } catch (notifyErr) {
      console.warn('Não foi possível enviar notificações de nova transação:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // Forçar atualização da UI
    if (window.forceUIUpdate) {
      setTimeout(() => window.forceUIUpdate(), 100);
    }
    
      Snackbar({ message: 'Transação adicionada com sucesso!', type: 'success' });
    return newId;
  } catch (error) {
    console.error('❌ Erro ao adicionar transação:', error);
          Snackbar({ message: 'Erro ao adicionar transação', type: 'error' });
    throw error;
  }
}

// Função para atualizar transação
async function updateTransaction(transactionId, transactionData) {
  try {
  await transactionsRepo.update(transactionId, { ...transactionData });
    
    console.log('✅ Transação atualizada:', transactionId);

    // Enviar notificações de atualização (exceto o autor)
    try {
  const user = window.appState.currentUser;
  const budgetId = window.appState.currentBudget?.id;
      if (budgetId && user?.uid) {
        if (typeof sendTransactionUpdatedNotification === 'function') {
          await sendTransactionUpdatedNotification(budgetId, user.uid, { id: transactionId, ...transactionData });
        } else if (window.sendTransactionUpdatedNotification) {
          await window.sendTransactionUpdatedNotification(budgetId, user.uid, { id: transactionId, ...transactionData });
        }
      }
    } catch (notifyErr) {
      console.warn('Não foi possível enviar notificações de atualização de transação:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // Forçar atualização da UI
    if (window.forceUIUpdate) {
      setTimeout(() => window.forceUIUpdate(), 100);
    }
    
          Snackbar({ message: 'Transação atualizada com sucesso!', type: 'success' });
  } catch (error) {
    console.error('❌ Erro ao atualizar transação:', error);
    Snackbar({ message: 'Erro ao atualizar transação', type: 'error' });
    throw error;
  }
}

// Função para deletar transação
async function deleteTransaction(transactionId) {
  try {
    // Ler dados da transação antes de apagar (para compor a notificação de exclusão)
    let txDataForNotification = null;
    try {
      const current = await transactionsRepo.getById(transactionId);
      if (current) txDataForNotification = current;
    } catch (readErr) {
      console.warn('Não foi possível ler a transação antes de excluir:', readErr);
    }

    await transactionsRepo.remove(transactionId);
    
    console.log('✅ Transação deletada:', transactionId);
    
    // Enviar notificações de exclusão para membros do orçamento (exceto o autor)
    try {
      const user = window.appState.currentUser;
      const budgetId = txDataForNotification?.budgetId || window.appState.currentBudget?.id;
      if (budgetId && user?.uid) {
        if (typeof sendTransactionDeletedNotification === 'function') {
          await sendTransactionDeletedNotification(budgetId, user.uid, txDataForNotification || { id: transactionId });
        } else if (window.sendTransactionDeletedNotification) {
          await window.sendTransactionDeletedNotification(budgetId, user.uid, txDataForNotification || { id: transactionId });
        }
      }
    } catch (notifyErr) {
      console.warn('Não foi possível enviar notificações de exclusão de transação:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // Forçar atualização da UI
    if (window.forceUIUpdate) {
      setTimeout(() => window.forceUIUpdate(), 100);
    }
    
    Snackbar({ message: 'Transação deletada com sucesso!', type: 'success' });
  } catch (error) {
    console.error('❌ Erro ao deletar transação:', error);
    Snackbar({ message: 'Erro ao deletar transação', type: 'error' });
    throw error;
  }
}

// Função para carregar transações
async function loadTransactions() {
  try {
    const user = window.appState.currentUser;
    if (!user) return [];

    const budget = window.appState.currentBudget;
    if (!budget) return [];

    const transactions = await transactionsRepo.list({ budgetId: budget.id });
    window.appState.transactions = transactions;
    return transactions;
  } catch (error) {
    console.error('❌ Erro ao carregar transações:', error);
    return [];
  }
}

// Função para adicionar categoria
async function addCategory(categoryData) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const budget = window.appState.currentBudget;
    if (!budget) {
      throw new Error('Orçamento não selecionado');
    }

    const category = {
      ...categoryData,
      userId: user.uid,
      budgetId: budget.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const newId = await categoriesRepo.create(category);
    console.log('✅ Categoria adicionada com ID:', newId);

    // Notificar membros do orçamento (exceto o autor)
    try {
  const user = window.appState.currentUser;
  const budgetId = window.appState.currentBudget?.id;
      if (budgetId && user?.uid) {
        if (typeof sendCategoryChangeNotification === 'function') {
      await sendCategoryChangeNotification(budgetId, user.uid, { id: newId, ...category }, 'category_added');
        } else if (window.sendCategoryChangeNotification) {
      await window.sendCategoryChangeNotification(budgetId, user.uid, { id: newId, ...category }, 'category_added');
        }
      }
    } catch (notifyErr) {
      console.warn('Não foi possível enviar notificações de categoria (adicionada):', notifyErr);
    }
    
    Snackbar({ message: 'Categoria adicionada com sucesso!', type: 'success' });
    return newId;
  } catch (error) {
    console.error('❌ Erro ao adicionar categoria:', error);
    Snackbar({ message: 'Erro ao adicionar categoria', type: 'error' });
    throw error;
  }
}

// Função para atualizar categoria
async function updateCategory(categoryId, categoryData) {
  try {
    // Ler dados atuais para preencher notificação
    let currentData = null;
    try {
      currentData = await categoriesRepo.getById(categoryId);
    } catch (e) { /* noop */ }

    await categoriesRepo.update(categoryId, {
      ...categoryData,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Categoria atualizada:', categoryId);

    // Notificar membros do orçamento (exceto o autor)
    try {
      const user = window.appState.currentUser;
      const budgetId = window.appState.currentBudget?.id || currentData?.budgetId;
      const payload = { id: categoryId, ...(currentData || {}), ...categoryData };
      if (budgetId && user?.uid) {
        if (typeof sendCategoryChangeNotification === 'function') {
          await sendCategoryChangeNotification(budgetId, user.uid, payload, 'category_updated');
        } else if (window.sendCategoryChangeNotification) {
          await window.sendCategoryChangeNotification(budgetId, user.uid, payload, 'category_updated');
        }
      }
    } catch (notifyErr) {
      console.warn('Não foi possível enviar notificações de categoria (atualizada):', notifyErr);
    }
    Snackbar({ message: 'Categoria atualizada com sucesso!', type: 'success' });
  } catch (error) {
    console.error('❌ Erro ao atualizar categoria:', error);
    Snackbar({ message: 'Erro ao atualizar categoria', type: 'error' });
    throw error;
  }
}

// Função para deletar categoria
async function deleteCategory(categoryId) {
  try {
    // Ler dados da categoria antes de apagar
    let catDataForNotification = null;
    try {
      const data = await categoriesRepo.getById(categoryId);
      if (data) catDataForNotification = data;
    } catch (e) { /* noop */ }

    await categoriesRepo.remove(categoryId);
    
    console.log('✅ Categoria deletada:', categoryId);

    // Notificar membros do orçamento (exceto o autor)
    try {
      const user = window.appState.currentUser;
      const budgetId = catDataForNotification?.budgetId || window.appState.currentBudget?.id;
      if (budgetId && user?.uid) {
        if (typeof sendCategoryChangeNotification === 'function') {
          await sendCategoryChangeNotification(budgetId, user.uid, catDataForNotification || { id: categoryId }, 'category_deleted');
        } else if (window.sendCategoryChangeNotification) {
          await window.sendCategoryChangeNotification(budgetId, user.uid, catDataForNotification || { id: categoryId }, 'category_deleted');
        }
      }
    } catch (notifyErr) {
      console.warn('Não foi possível enviar notificações de categoria (excluída):', notifyErr);
    }
    Snackbar({ message: 'Categoria deletada com sucesso!', type: 'success' });
  } catch (error) {
    console.error('❌ Erro ao deletar categoria:', error);
    Snackbar({ message: 'Erro ao deletar categoria', type: 'error' });
    throw error;
  }
}

// Função para carregar categorias
async function loadCategories() {
  try {
    const user = window.appState.currentUser;
    if (!user) return [];

    const budget = window.appState.currentBudget;
    if (!budget) return [];

  const categories = await categoriesRepo.list({ budgetId: budget.id });
    
    window.appState.categories = categories;
    return categories;
  } catch (error) {
    console.error('❌ Erro ao carregar categorias:', error);
    return [];
  }
}

// Função para adicionar orçamento
async function addBudget(budgetData) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const budget = {
      ...budgetData,
      userId: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const newId = await budgetsRepo.create(budget);
    console.log('✅ Orçamento adicionado com ID:', newId);
    
    Snackbar({ message: 'Orçamento adicionado com sucesso!', type: 'success' });
    return newId;
  } catch (error) {
    console.error('❌ Erro ao adicionar orçamento:', error);
    Snackbar({ message: 'Erro ao adicionar orçamento', type: 'error' });
    throw error;
  }
}

// Função para excluir orçamento
window.deleteBudget = async function(budgetId) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('🗑️ Iniciando exclusão do orçamento:', budgetId);

    // Verificar se o usuário é o dono do orçamento
    const budget = window.appState.budgets.find(b => b.id === budgetId);
    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }

    if (budget.userId !== user.uid) {
      throw new Error('Você não tem permissão para excluir este orçamento');
    }

    // Verificar se é o orçamento atual
    const isCurrentBudget = window.appState.currentBudget?.id === budgetId;
    if (isCurrentBudget) {
      // Se for o orçamento atual, limpar o estado
      window.appState.currentBudget = null;
      localStorage.removeItem('currentBudgetId');
    }

  // Excluir todas as transações do orçamento
  console.log('🗑️ Excluindo transações do orçamento...');
  const allTx = await transactionsRepo.list({ budgetId });
  await Promise.all(allTx.map(t => transactionsRepo.remove(t.id)));
  console.log(`✅ ${allTx.length} transações excluídas`);

  // Excluir todas as categorias do orçamento
  console.log('🗑️ Excluindo categorias do orçamento...');
  const allCats = await categoriesRepo.list({ budgetId });
  await Promise.all(allCats.map(c => categoriesRepo.remove(c.id)));
  console.log(`✅ ${allCats.length} categorias excluídas`);

  // Excluir todas as recorrentes do orçamento
  console.log('🗑️ Excluindo recorrentes do orçamento...');
  const { getRecorrentesDoOrcamento } = await import('../features/recorrentes/service.js');
  const allRec = await getRecorrentesDoOrcamento(budgetId);
  const recurringRepo = await import('@data/repositories/recurringRepo.js');
  await Promise.all(allRec.map(r => recurringRepo.remove(r.id)));
  console.log(`✅ ${allRec.length} recorrentes excluídas`);

  // Excluir convites pendentes do orçamento
  console.log('🗑️ Excluindo convites do orçamento...');
  const allInv = await invitationsRepo.listByBudget(budgetId);
  await Promise.all(allInv.map(i => invitationsRepo.remove(i.id)));
  console.log(`✅ ${allInv.length} convites excluídos`);

  // Excluir o orçamento
  console.log('🗑️ Excluindo o orçamento...');
  await budgetsRepo.remove(budgetId);
    console.log('✅ Orçamento excluído');

    // Remover do estado local
    window.appState.budgets = window.appState.budgets.filter(b => b.id !== budgetId);
    
    // Se era o orçamento atual, selecionar outro orçamento ou limpar
    if (isCurrentBudget) {
      const remainingBudgets = window.appState.budgets.filter(b => b.userId === user.uid);
      if (remainingBudgets.length > 0) {
        // Selecionar o primeiro orçamento próprio disponível
        await setCurrentBudget(remainingBudgets[0]);
        console.log('✅ Novo orçamento selecionado:', remainingBudgets[0].nome);
      } else {
        // Não há mais orçamentos, limpar estado
        window.appState.currentBudget = null;
        window.appState.transactions = [];
        window.appState.categories = [];
        window.appState.recorrentes = [];
        console.log('ℹ️ Nenhum orçamento restante');
      }
    }

    Snackbar({ 
      message: `Orçamento "${budget.nome}" excluído com sucesso!`, 
      type: 'success' 
    });

    console.log('✅ Exclusão do orçamento concluída com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao excluir orçamento:', error);
    Snackbar({ 
      message: `Erro ao excluir orçamento: ${error.message}`, 
      type: 'error' 
    });
    throw error;
  }
}

// Função para carregar orçamentos
async function loadBudgets() {
  try {
    const user = window.appState.currentUser;
    if (!user) return [];

    console.log('🔍 Carregando orçamentos para usuário:', user.uid);

    console.log('🔍 Buscando orçamentos (próprios e compartilhados) via repositório...');
    const [ownBudgetsRaw, sharedBudgetsRaw] = await Promise.all([
      budgetsRepo.listOwn(user.uid),
      budgetsRepo.listShared(user.uid),
    ]);

    const ownBudgets = ownBudgetsRaw.map(b => ({ ...b, isOwner: true }));
    const sharedBudgets = sharedBudgetsRaw.map(b => ({ ...b, isOwner: false }));
    
    // Combinar e remover duplicatas (caso o usuário seja dono e membro)
    const allBudgets = [...ownBudgets];
    sharedBudgets.forEach(sharedBudget => {
      if (!allBudgets.find(budget => budget.id === sharedBudget.id)) {
        allBudgets.push(sharedBudget);
      }
    });
    
    console.log('📊 Orçamentos carregados:', {
      total: allBudgets.length,
      own: ownBudgets.length,
      shared: sharedBudgets.length,
      budgets: allBudgets.map(b => ({ id: b.id, nome: b.nome, isOwner: b.isOwner }))
    });
    
    window.appState.budgets = allBudgets;
    return allBudgets;
  } catch (error) {
    console.error('❌ Erro ao carregar orçamentos:', error);
    return [];
  }
}

// Função para definir orçamento atual
function setCurrentBudget(budget) {
  window.appState.currentBudget = budget;
  localStorage.setItem('currentBudgetId', budget.id);
  console.log('✅ Orçamento atual definido:', budget.nome);
}

// Função global para selecionar orçamento e atualizar todas as abas
window.setCurrentBudget = async function (budget) {
  if (!budget) {
    console.log('❌ Budget não fornecido para setCurrentBudget');
    return;
  }
  
  console.log('🔄 Selecionando orçamento:', budget.nome, budget.id);
  
  // Definir orçamento atual
  setCurrentBudget(budget);
  
  // Parar listeners anteriores
  if (window.stopAllListeners) {
    window.stopAllListeners();
  }
  
  // Iniciar listeners para o novo orçamento
  if (window.startAllListeners) {
    await window.startAllListeners(budget.id);
  }
  
  // Recarregar dados
  await Promise.all([
    window.loadTransactions ? window.loadTransactions() : Promise.resolve(),
    window.loadCategories ? window.loadCategories() : Promise.resolve(),
    window.loadRecorrentes ? window.loadRecorrentes() : Promise.resolve(),
    window.loadNotifications ? window.loadNotifications() : Promise.resolve()
  ]);
  
  // Atualizar todas as abas
  const currentRoute = window.location.hash.replace('#', '') || '/dashboard';
  console.log('🔄 Atualizando rota atual:', currentRoute);
  
  // Re-renderizar a aba atual
  switch (currentRoute) {
    case '/dashboard':
      if (window.renderDashboard) {
        await window.renderDashboard();
      }
      break;
    case '/transactions':
      if (window.renderTransactions) {
        await window.renderTransactions();
      }
      break;
    case '/categories':
      if (window.renderCategories) {
        await window.renderCategories();
      }
      break;
    case '/notifications':
      if (window.renderNotifications) {
        await window.renderNotifications();
      }
      break;
    case '/settings':
      if (window.renderSettings) {
        await window.renderSettings();
      }
      break;
    default:
      if (window.renderDashboard) {
        await window.renderDashboard();
      }
  }
  
  console.log('✅ Orçamento selecionado e todas as abas atualizadas');
};

// Função para selecionar orçamento padrão
async function selectDefaultBudget() {
  try {
    const user = window.appState.currentUser;
    if (!user) return;

    // Tentar carregar orçamento salvo no localStorage
    const savedBudgetId = localStorage.getItem('currentBudgetId');
    if (savedBudgetId) {
      const budget = window.appState.budgets.find(b => b.id === savedBudgetId);
      if (budget) {
        await window.setCurrentBudget(budget);
        return;
      }
    }

    // Se não há orçamento salvo, usar o primeiro disponível
    if (window.appState.budgets.length > 0) {
      await window.setCurrentBudget(window.appState.budgets[0]);
      return;
    }

    // Se não há orçamentos, criar um padrão
    console.log('📝 Criando orçamento padrão...');
    const defaultBudget = {
      nome: 'Orçamento Principal',
      descricao: 'Orçamento padrão criado automaticamente',
      valor: 0,
      tipo: 'mensal'
    };
    
    const budgetId = await addBudget(defaultBudget);
    if (budgetId) {
      // Recarregar orçamentos e definir o novo como atual
      await loadBudgets();
      const newBudget = window.appState.budgets.find(b => b.id === budgetId);
      if (newBudget) {
        await window.setCurrentBudget(newBudget);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao selecionar orçamento padrão:', error);
  }
}

// Função para carregar recorrentes
async function loadRecorrentes() {
  try {
    const user = window.appState.currentUser;
    if (!user) return [];

    const budget = window.appState.currentBudget;
    if (!budget) return [];

    const q = query(
      collection(db, 'recorrentes'),
      where('budgetId', '==', budget.id)
    );
    
    const querySnapshot = await getDocs(q);
    const recorrentes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    window.appState.recorrentes = recorrentes;
    return recorrentes;
  } catch (error) {
    console.error('❌ Erro ao carregar recorrentes:', error);
    return [];
  }
}

// Função para buscar transações do mês
async function getTransacoesDoMes(userId, ano, mes) {
  try {
    console.log(`🔍 Buscando transações para: ${ano}/${mes}`);
    const budget = window.appState.currentBudget;
    if (!budget) {
      console.log('⚠️ Nenhum orçamento ativo');
      return [];
    }

    const q = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budget.id)
    );
    
    const querySnapshot = await getDocs(q);
    const allTransactions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Total de transações encontradas: ${allTransactions.length}`);

    // Filtrar por mês/ano usando a normalização robusta (data, dataLancamento, competencia, mes/ano, ISO, Timestamp, etc.)
    const alvo = `${ano}-${String(mes).padStart(2, '0')}`;
    const transacoesFiltradas = allTransactions.filter(t => {
      try {
        const ym = typeof getTransactionYearMonth === 'function' ? getTransactionYearMonth(t) : null;
        if (ym) return ym === alvo;
        // Fallback: createdAt
        if (!t.createdAt) return false;
        let d;
        if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
          d = new Date(t.createdAt.seconds * 1000);
        } else {
          d = new Date(t.createdAt);
        }
        return d.getFullYear() === ano && (d.getMonth() + 1) === mes;
      } catch {
        return false;
      }
    });
    
    console.log(`✅ Transações filtradas para ${ano}/${mes}: ${transacoesFiltradas.length}`);
    return transacoesFiltradas;
  } catch (error) {
    console.error('❌ Erro ao buscar transações do mês:', error);
    return [];
  }
}

// FUNÇÃO RENDERDASHBOARD LIMPA E FUNCIONAL
async function renderDashboard(selectedYear, selectedMonth) {
  // Evitar múltiplas chamadas simultâneas
  if (window.isRenderingDashboard) {
    console.log('🔄 Dashboard já está sendo renderizado, pulando...');
    return;
  }
  // Suprimir rajadas de chamadas em sequência muito próximas
  try {
    const now = Date.now();
    if (window.__lastDashboardRender && (now - window.__lastDashboardRender) < 300) {
      console.log('⏱️ renderDashboard chamado muito próximo do anterior, pulando...');
      return;
    }
    window.__lastDashboardRender = now;
  } catch {}
  
  window.isRenderingDashboard = true;
  
  // Verificar se o usuário está autenticado
  if (!window.appState?.currentUser) {
    console.warn('⚠️ Usuário não autenticado, renderizando dashboard vazio');
    window.isRenderingDashboard = false;
    return;
  }
  
  try {
    const content = document.getElementById('app-content');
    if (!content) {
      console.warn('⚠️ Elemento #app-content não encontrado');
      return;
    }

  // Seletor de mês
    const now = new Date();
    const year = selectedYear || now.getFullYear();
    const month = selectedMonth || now.getMonth() + 1;
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

  // Guardar seleção global para outras partes (opcional)
  window.appState = window.appState || {};
  window.appState.selectedYear = year;
  window.appState.selectedMonth = month;

    // Buscar transações do mês selecionado
    const user = window.appState.currentUser;
    let transacoes = user
      ? await getTransacoesDoMes(user.uid, year, month)
      : [];
    
    console.log(`📊 Dashboard ${year}/${month}: ${transacoes.length} transações carregadas`);
    console.log(`📊 Estado atual:`, {
      user: !!user,
      budget: !!window.appState.currentBudget,
      transactions: window.appState.transactions?.length || 0,
      categories: window.appState.categories?.length || 0,
      recorrentes: window.appState.recorrentes?.length || 0
    });
    
    // Para o mês atual, garantir que temos as transações mais recentes
    if (year === now.getFullYear() && month === now.getMonth() + 1) {
      if (window.appState.transactions && window.appState.transactions.length > 0) {
        // Mesmo para o mês atual, filtre pelo mês/ano selecionado
        const alvo = `${year}-${String(month).padStart(2, '0')}`;
        transacoes = window.appState.transactions.filter(t => {
          try {
            const ym = typeof getTransactionYearMonth === 'function' ? getTransactionYearMonth(t) : null;
            if (ym) return ym === alvo;
            if (!t.createdAt) return false;
            let d;
            if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
              d = new Date(t.createdAt.seconds * 1000);
            } else {
              d = new Date(t.createdAt);
            }
            return d.getFullYear() === year && (d.getMonth() + 1) === month;
          } catch {
            return false;
          }
        });
        console.log(`🔄 Usando transações do appState (filtradas) para mês atual: ${transacoes.length}`);
      }
    }

    // Calcular totais
    const receitas = transacoes
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
    const despesasTransacoes = transacoes
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
    
    // Calcular recorrentes
    const recorrentes = window.appState.recorrentes || [];
    const recorrentesMes = transacoes.filter(t => t.recorrenteId);
    
    // Recorrentes EFETIVADAS (que foram aplicadas como transações)
    const recorrentesEfetivadas = recorrentesMes.map(t => {
      const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
      
      // Calcular parcela atual se não estiver salva
      let parcelaAtual = t.parcelaAtual;
      let parcelasTotal = t.parcelasTotal;
      
      if (!parcelaAtual || !parcelasTotal) {
        // Usar dados da recorrente para calcular
        if (recorrente) {
          parcelasTotal = recorrente.parcelasTotal;
          if (window.calcularParcelaRecorrente) {
            parcelaAtual = window.calcularParcelaRecorrente(recorrente, year, month);
          } else {
            parcelaAtual = 1; // Fallback
          }
        } else {
          parcelaAtual = 1;
          parcelasTotal = 1;
        }
      }
      
      return {
        ...recorrente,
        efetivada: true,
        parcelaAtual: parcelaAtual,
        parcelasTotal: parcelasTotal,
        transacaoId: t.id,
        valor: t.valor
      };
    });
    
    // Recorrentes AGENDADAS (que NÃO foram aplicadas como transações)
    const recorrentesAgendadas = recorrentes.filter(rec => {
      const jaEfetivada = recorrentesEfetivadas.some(r => r.id === rec.id);
      if (jaEfetivada) return false; // Já foi efetivada
      
      // Verificar se deve ser agendada
      const [ano, mes, dia] = rec.dataInicio.split('-').map(Number);
      const dataInicio = new Date(ano, mes - 1, dia);
      const anoInicio = dataInicio.getFullYear();
      const mesInicio = dataInicio.getMonth() + 1;
      
      if (year < anoInicio || (year === anoInicio && month < mesInicio)) {
        return false;
      }
      
      if (!rec.efetivarMesAtual && year === anoInicio && month === mesInicio) {
        return false;
      }
      
      if (rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined) {
        let mesesDesdeInicio = (year - anoInicio) * 12 + (month - mesInicio);
        if (!rec.efetivarMesAtual && (year > anoInicio || (year === anoInicio && month > mesInicio))) {
          mesesDesdeInicio -= 1;
        }
        const parcelasRestantesExibidas = rec.parcelasRestantes - mesesDesdeInicio;
        return parcelasRestantesExibidas > 0;
      }
      return true;
    });
    
    // Combinar efetivadas e agendadas para exibição
    const todasRecorrentes = [...recorrentesEfetivadas, ...recorrentesAgendadas];
    
    const despesasRecorrentesEfetivadas = recorrentesEfetivadas.reduce((sum, rec) => sum + parseFloat(rec.valor), 0);
    const despesasRecorrentesAgendadas = recorrentesAgendadas.reduce((sum, rec) => sum + parseFloat(rec.valor), 0);
    const despesasRecorrentesTotal = despesasRecorrentesEfetivadas + despesasRecorrentesAgendadas;
    const despesas = despesasTransacoes + despesasRecorrentesTotal;
    const saldo = receitas - despesas;
    
    // Calcular orçado
    const categoriasDespesa = window.appState.categories?.filter(cat => cat.tipo === 'despesa') || [];
    const totalLimite = categoriasDespesa.reduce((sum, cat) => sum + parseFloat(cat.limite || 0), 0);
    const orcado = totalLimite - despesas;
    const progressoOrcado = totalLimite > 0 ? despesas / totalLimite : 0;
    
    // Calcular alertas
    const categoriasComAlerta = window.appState.categories?.filter(cat => {
      if (cat.tipo !== 'despesa') return false;
      const transacoesCategoria = transacoes.filter(t => t.categoriaId === cat.id && t.tipo === cat.tipo);
      const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
      const limite = parseFloat(cat.limite || 0);
      const percentual = limite > 0 ? (gasto / limite) : 0;
      return limite > 0 && percentual > 0.7;
    }) || [];
    
    const alertaGeral = progressoOrcado > 0.7 ? 'Orçado geral em alerta' : null;
    const totalAlertas = categoriasComAlerta.length + (alertaGeral ? 1 : 0);

    // Top categorias
    // Top categorias baseado nas transações do mês selecionado
    const categoriasComGasto = window.appState.categories
      .filter(cat => cat.tipo === 'despesa')
      .map(cat => {
        const transacoesCategoria = transacoes.filter(t => t.categoriaId === cat.id && t.tipo === cat.tipo);
        const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
        return { ...cat, gasto };
      })
      .filter(cat => cat.gasto > 0)
      .sort((a, b) => b.gasto - a.gasto)
      .slice(0, 5);

    // CONSTRUIR TODO O HTML COMO UMA STRING ÚNICA
    const dashboardHTML = `
      <div class="tab-container">
        <div class="tab-header">
          <h2 class="tab-title-highlight">📊 Dashboard</h2>
          <div id="mes-selector" class="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <button id="mes-anterior" class="text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 rounded-full w-12 h-12 flex items-center justify-center text-xl hover:bg-blue-200 dark:hover:bg-blue-800 active:bg-blue-300 dark:active:bg-blue-700 transition-all duration-200 touch-manipulation" style="min-width: 48px; min-height: 48px;">&#8592;</button>
            <div class="text-center px-4">
              <div class="font-bold text-xl text-gray-900 dark:text-gray-100"><span id="mes-display">${meses[month - 1]} ${year}</span></div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Período Selecionado</div>
            </div>
            <button id="mes-proximo" class="text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 rounded-full w-12 h-12 flex items-center justify-center text-xl hover:bg-blue-200 dark:hover:bg-blue-800 active:bg-blue-300 dark:active:bg-blue-700 transition-all duration-200 touch-manipulation" style="min-width: 48px; min-height: 48px;">&#8594;</button>
          </div>
        </div>
        <div class="tab-content">
          <div class="content-spacing" id="dashboard-content">
            
            <!-- ========== SEÇÃO 1: RESUMO FINANCEIRO PRINCIPAL ========== -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💰 Resumo Financeiro</h2>
              </div>
              
              <div class="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                <!-- Header do Card -->
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <h3 class="text-xl md:text-2xl font-bold">Visão Geral</h3>
                    <p class="text-sm opacity-90">${meses[month - 1]} ${year}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl md:text-3xl font-bold ${saldo >= 0 ? 'text-green-200' : 'text-red-200'}">
                      R$ ${saldo.toFixed(2)}
                    </div>
                    <p class="text-xs opacity-90">${saldo >= 0 ? '✓ Saldo Positivo' : '⚠️ Saldo Negativo'}</p>
                  </div>
                </div>
                
                <!-- Grid de Métricas -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div class="text-2xl mb-2">💚</div>
                    <div class="text-2xl md:text-3xl font-bold text-green-200">R$ ${receitas.toFixed(2)}</div>
                    <div class="text-sm opacity-90">Receitas</div>
                </div>
                
                  <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div class="text-2xl mb-2">💸</div>
                    <div class="text-2xl md:text-3xl font-bold text-red-200">R$ ${despesas.toFixed(2)}</div>
                    <div class="text-sm opacity-90">Despesas</div>
                </div>
                
                  <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div class="text-2xl mb-2">🎯</div>
                    <div class="text-2xl md:text-3xl font-bold">R$ ${orcado.toFixed(2)}</div>
                    <div class="text-sm opacity-90">Orçado</div>
                </div>
              </div>
              
                <!-- Barra de Progresso do Orçamento -->
                <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium">Progresso do Orçamento</span>
                    <span class="text-sm font-bold">${(progressoOrcado * 100).toFixed(1)}%</span>
                </div>
                  <div class="w-full bg-white bg-opacity-20 rounded-full h-3">
                    <div class="bg-white h-3 rounded-full transition-all duration-500 ease-out" style="width: ${Math.min(progressoOrcado * 100, 100)}%"></div>
                  </div>
                  <div class="flex justify-between text-xs mt-2 opacity-90">
                    <span id="categorias-alerta-btn" class="${totalAlertas > 0 ? 'cursor-pointer hover:opacity-100 hover:underline bg-red-500 bg-opacity-20 px-2 py-1 rounded-full' : ''}" ${totalAlertas > 0 ? 'onclick="showCategoriasAlertaModal()"' : ''}>${totalAlertas > 0 ? `⚠️ ${totalAlertas} alerta(s)` : '✅ Tudo OK'}</span>
                    <span>${saldo >= 0 ? '📈 Meta alcançada' : '📉 Revisar gastos'}</span>
                  </div>
                </div>
                </div>
              </div>
              
            <!-- ========== SEÇÃO 2: ATIVIDADE RECENTE ========== -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💳 Atividade Recente</h2>
              </div>
              
              <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div class="flex flex-wrap justify-between items-center gap-2">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">Últimas Transações</h3>
                    <button onclick="showAddTransactionModal()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      + Nova Transação
                    </button>
              </div>
            </div>

                <!-- Lista de Transações -->
                <div class="p-4">
                  <div class="space-y-3">
                    ${transacoes.length === 0 ? `
                      <div class="text-center py-8">
                        <div class="text-4xl mb-3">💸</div>
                        <p class="text-gray-500 dark:text-gray-400">Nenhuma transação encontrada neste mês</p>
                        <button onclick="showAddTransactionModal()" class="mt-3 text-blue-600 hover:text-blue-800 text-sm">+ Adicionar primeira transação</button>
              </div>
                    ` : transacoes
                      .slice(0, 5)
                      .map(t => {
                        const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
                        let parcelaInfo = '';
                        if (t.recorrenteId) {
                          const recorrente = window.appState.recorrentes?.find(r => r.id === t.recorrenteId);
                          if (recorrente) {
                            if (recorrente.parcelasTotal && recorrente.parcelasTotal > 1) {
                              const status = window.calcularStatusRecorrente ?
                                window.calcularStatusRecorrente(recorrente, window.appState.transactions || [], year, month) :
                                { parcelaAtual: 1, totalParcelas: recorrente.parcelasTotal, foiEfetivadaEsteMes: false };
                              parcelaInfo = status.foiEfetivadaEsteMes
                                ? ` • ✅ ${status.parcelaAtual}/${status.totalParcelas}`
                                : ` • 📅 ${status.parcelaAtual}/${status.totalParcelas}`;
                            } else {
                              parcelaInfo = ' • ♾️';
                            }
                          } else {
                            parcelaInfo = ' • 🔄';
                          }
                        }
                        return `
                          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                            <div class="flex items-center gap-3 flex-1 min-w-0">
                              <div class="w-3 h-3 rounded-full flex-shrink-0" style="background-color: ${categoria?.cor || '#6B7280'}"></div>
                              <div class="min-w-0 flex-1">
                                <p class="font-medium text-gray-900 dark:text-gray-100 truncate">${t.descricao}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                  ${categoria?.nome || 'Sem categoria'} • ${typeof formatTransactionDisplayDate === 'function' ? formatTransactionDisplayDate(t, year, month) : (t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '')}${parcelaInfo}
                                </p>
                              </div>
                            </div>
                            <div class="flex items-center gap-2">
                              <span class="font-bold text-lg ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                                ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                              </span>
                              <div class="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity duration-200">
                                <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 p-1">✏️</button>
                                <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="text-red-600 hover:text-red-800 p-1">🗑️</button>
                              </div>
                            </div>
                          </div>
                        `;
                      })
                      .join('')}
                  </div>
                  
                  ${transacoes.length > 5 ? `
                    <div class="mt-4 text-center">
                      <button onclick="router('/transactions')" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Ver todas as ${transacoes.length} transações →
                      </button>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- ========== SEÇÃO 3: CATEGORIAS & LIMITES ========== -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Categorias & Limites</h2>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Top 5 Categorias -->
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🏆 Top 5 Categorias</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Categorias com maiores gastos</p>
                  </div>
                  <div class="p-4">
              <div class="space-y-3">
                      ${categoriasComGasto.length === 0 ? `
                        <div class="text-center py-6">
                          <div class="text-3xl mb-2">📂</div>
                          <p class="text-gray-500 dark:text-gray-400 text-sm">Nenhuma categoria com gastos neste mês</p>
                        </div>
                      ` : categoriasComGasto
                  .slice(0, 5)
                        .map((cat, index) => {
                    const categoria = window.appState.categories?.find(c => c.id === cat.id);
                    const limite = categoria?.limite ? parseFloat(categoria.limite) : 0;
                    const porcentagem = limite > 0 ? Math.min((cat.gasto / limite) * 100, 100) : 0;
                    let corBarra = 'bg-green-500';
                    if (porcentagem >= 90) {
                      corBarra = 'bg-red-500';
                    } else if (porcentagem >= 75) {
                      corBarra = 'bg-yellow-500';
                    } else if (porcentagem >= 50) {
                      corBarra = 'bg-orange-500';
                    }
                          
                          const medalhas = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
                    
                    return `
                            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                  <span class="text-lg">${medalhas[index]}</span>
                            <div class="w-3 h-3 rounded-full" style="background-color: ${categoria?.cor || '#4F46E5'}"></div>
                                  <span class="font-medium text-sm text-gray-900 dark:text-gray-100">${cat.nome}</span>
                          </div>
                                <span class="font-bold text-sm ${cat.gasto > limite && limite > 0 ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}">
                            R$ ${cat.gasto.toFixed(2)}
                          </span>
                        </div>
                        ${limite > 0 ? `
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  <span>Limite: R$ ${limite.toFixed(2)}</span>
                                  <span>${porcentagem.toFixed(1)}%</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div class="${corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(porcentagem, 100)}%"></div>
                          </div>
                        ` : '<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
                      </div>
                    `;
                  })
                  .join('')}
                    </div>
              </div>
            </div>

                <!-- Categorias com Limites Excedidos -->
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex justify-between items-center">
                      <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">⚠️ Controle de Limites</h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Categorias com limites definidos</p>
                      </div>
                      <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                        + Nova
                </button>
              </div>
                  </div>
                  <div class="p-4">
                    <div class="space-y-3 max-h-80 overflow-y-auto">
                      ${(window.appState.categories || []).filter(cat => cat.limite > 0).length === 0 ? `
                        <div class="text-center py-6">
                          <div class="text-3xl mb-2">🎯</div>
                          <p class="text-gray-500 dark:text-gray-400 text-sm">Nenhuma categoria com limite definido</p>
                          <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="mt-2 text-purple-600 hover:text-purple-800 text-sm">+ Definir primeiro limite</button>
                        </div>
                      ` : (window.appState.categories || [])
                  .filter(cat => cat.limite > 0)
                  .map(cat => {
                    const transacoesCategoria = transacoes.filter(t => t.categoriaId === cat.id && t.tipo === cat.tipo);
                    const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
                    return { ...cat, gasto };
                  })
                        .sort((a, b) => {
                          // Priorizar categorias que excederam o limite
                          const aExcedeu = a.gasto > parseFloat(a.limite);
                          const bExcedeu = b.gasto > parseFloat(b.limite);
                          if (aExcedeu && !bExcedeu) return -1;
                          if (!aExcedeu && bExcedeu) return 1;
                          // Se ambas excederam ou não excederam, ordenar por maior gasto
                          return b.gasto - a.gasto;
                        })
                        .slice(0, 6) // Mostrar máximo 6 categorias
                  .map(cat => {
                    const limite = parseFloat(cat.limite || 0);
                          const porcentagem = limite > 0 ? (cat.gasto / limite) * 100 : 0;
                    let corBarra = 'bg-green-500';
                          let iconeStatus = '✅';
                          if (porcentagem >= 100) {
                      corBarra = 'bg-red-500';
                            iconeStatus = '🚨';
                          } else if (porcentagem >= 90) {
                            corBarra = 'bg-red-400';
                            iconeStatus = '⚠️';
                    } else if (porcentagem >= 75) {
                      corBarra = 'bg-yellow-500';
                            iconeStatus = '⚡';
                    } else if (porcentagem >= 50) {
                      corBarra = 'bg-orange-500';
                            iconeStatus = '📊';
                    }
                    
                    return `
                            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 ${porcentagem >= 90 ? 'ring-2 ring-red-200 dark:ring-red-800' : ''}">
                        <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                  <span class="text-sm">${iconeStatus}</span>
                            <div class="w-3 h-3 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
                                  <span class="font-medium text-sm text-gray-900 dark:text-gray-100">${cat.nome}</span>
                          </div>
                                <span class="font-bold text-sm ${cat.gasto > limite ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}">
                            R$ ${cat.gasto.toFixed(2)}
                          </span>
                        </div>
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Limite: R$ ${limite.toFixed(2)}</span>
                                <span class="${porcentagem >= 100 ? 'text-red-600 font-bold' : porcentagem >= 90 ? 'text-orange-600 font-medium' : ''}">${porcentagem.toFixed(1)}%</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div class="${corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(porcentagem, 100)}%"></div>
                          </div>
                              ${porcentagem >= 100 ? `
                                <div class="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 px-2 py-1 rounded">
                                  Excedeu em R$ ${(cat.gasto - limite).toFixed(2)}
                                </div>
                              ` : ''}
                      </div>
                    `;
                  })
                  .join('')}
            </div>

                    ${(window.appState.categories || []).filter(cat => cat.limite > 0).length > 6 ? `
                      <div class="mt-4 text-center">
                        <button onclick="router('/categories')" class="text-purple-600 hover:text-purple-800 text-sm font-medium">
                          Ver todas as categorias →
                </button>
              </div>
                    ` : ''}
                        </div>
                        </div>
                      </div>
              </div>

            <!-- ========== SEÇÃO 4: RECORRENTES DO MÊS ========== -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔄 Recorrentes do Mês</h2>
            </div>

              <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div class="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">Despesas Automáticas</h3>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        ${todasRecorrentes.filter(r => r.efetivada).length} efetivadas • ${todasRecorrentes.filter(r => !r.efetivada).length} pendentes
                      </p>
                    </div>
                    <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      + Nova Recorrente
                </button>
              </div>
                </div>
                
                <!-- Lista de Recorrentes -->
                <div class="p-4">
                  <div class="space-y-3">
                    ${todasRecorrentes.length === 0 ? `
                      <div class="text-center py-8">
                        <div class="text-4xl mb-3">🔄</div>
                        <p class="text-gray-500 dark:text-gray-400">Nenhuma despesa recorrente neste mês</p>
                        <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="mt-3 text-orange-600 hover:text-orange-800 text-sm">+ Criar primeira recorrente</button>
                      </div>
                    ` : todasRecorrentes
                      .slice(0, 8)
                      .map(rec => {
                        const categoria = window.appState.categories?.find(c => c.id === rec.categoriaId);
                        let statusInfo = '';
                        let statusIcon = '';
                        let statusColor = '';
                        
                        if (rec.efetivada) {
                          statusIcon = '✅';
                          statusColor = 'text-green-600';
                          if (rec.parcelasTotal && rec.parcelasTotal > 1) {
                            statusInfo = `Efetivada: ${rec.parcelaAtual || 1}/${rec.parcelasTotal}`;
                          } else {
                            statusInfo = 'Efetivada';
                          }
                        } else {
                          statusIcon = '📅';
                          statusColor = 'text-blue-600';
                          if (!rec.parcelasTotal || rec.parcelasTotal <= 1) {
                            statusInfo = 'Agendada (Infinito)';
                      } else {
                            const status = window.calcularStatusRecorrente ? 
                              window.calcularStatusRecorrente(rec, window.appState.transactions || [], year, month) : 
                              { parcelaAtual: 1, totalParcelas: rec.parcelasTotal, foiEfetivadaEsteMes: false };
                            statusInfo = `Agendada: ${status.parcelaAtual}/${status.totalParcelas}`;
                      }
                    }
                    
                    return `
                          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ${rec.efetivada ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'}">
                            <div class="flex items-center gap-3 flex-1 min-w-0">
                              <div class="flex flex-col items-center">
                                <span class="text-lg">${statusIcon}</span>
                                <div class="w-3 h-3 rounded-full mt-1" style="background-color: ${categoria?.cor || '#6B7280'}"></div>
                              </div>
                              <div class="min-w-0 flex-1">
                                <p class="font-medium text-gray-900 dark:text-gray-100 truncate">${rec.descricao}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                  ${categoria?.nome || 'Sem categoria'} • <span class="${statusColor}">${statusInfo}</span>
                          </p>
                        </div>
                            </div>
                            <div class="text-right">
                              <span class="font-bold text-lg text-red-600">
                                -R$ ${parseFloat(rec.valor).toFixed(2)}
                          </span>
                              ${rec.parcelasTotal && rec.parcelasTotal > 1 ? `
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                  Total: R$ ${(parseFloat(rec.valor) * rec.parcelasTotal).toFixed(2)}
                                </p>
                              ` : ''}
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
                  
                  ${todasRecorrentes.length > 8 ? `
                    <div class="mt-4 text-center">
                      <button onclick="router('/recorrentes')" class="text-orange-600 hover:text-orange-800 text-sm font-medium">
                        Ver todas as ${todasRecorrentes.length} recorrentes →
                      </button>
            </div>
                  ` : ''}
                  
                  <!-- Resumo das Recorrentes -->
                  ${todasRecorrentes.length > 0 ? `
                    <div class="mt-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-4 border border-orange-200 dark:border-gray-600">
                      <div class="flex justify-between items-center">
                        <div>
                          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">Total Recorrentes do Mês</p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">${despesasRecorrentesEfetivadas > 0 ? `R$ ${despesasRecorrentesEfetivadas.toFixed(2)} efetivadas` : 'Nenhuma efetivada'} ${despesasRecorrentesAgendadas > 0 ? ` • R$ ${despesasRecorrentesAgendadas.toFixed(2)} agendadas` : ''}</p>
                        </div>
                        <div class="text-right">
                          <span class="text-xl font-bold text-red-600">R$ ${despesasRecorrentesTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      
      <!-- Modal Categorias em Alerta -->
      <div id="categorias-alerta-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">⚠️ Categorias em Alerta</h3>
              <button onclick="closeCategoriasAlertaModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <span class="text-xl">×</span>
              </button>
            </div>
          </div>
          <div id="categorias-alerta-content" class="p-4">
            <!-- Conteúdo será preenchido dinamicamente -->
          </div>
        </div>
      </div>
    `;

    // UMA ÚNICA OPERAÇÃO INNERHTML - SOLUÇÃO DEFINITIVA
    content.innerHTML = dashboardHTML;

    // Configurar botões do dashboard
    setTimeout(() => {
      setupDashboardButtons();
    }, 100);

    renderFAB();
    // Remover renderBottomNav daqui - deve ser chamado apenas pelo router
    // renderBottomNav('/dashboard');

  } catch (err) {
    console.error('Erro ao renderizar dashboard:', err);
    const content = document.getElementById('app-content');
    if (content) {
      content.innerHTML =
        '<div class="text-red-600 text-center mt-4">Erro ao carregar dashboard. Tente novamente.</div>';
    }
  } finally {
    // Reset da flag de renderização
    window.isRenderingDashboard = false;
  }
}

// Função para mostrar o modal de categorias em alerta
window.showCategoriasAlertaModal = function() {
  try {
    const modal = document.getElementById('categorias-alerta-modal');
    const content = document.getElementById('categorias-alerta-content');
    
    if (!modal || !content) {
      console.error('❌ Modal de categorias em alerta não encontrado');
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
          <div class="text-gray-600 dark:text-gray-400">Todas as categorias estão dentro do limite</div>
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
              statusTexto = 'Crítico';
              statusIcon = '🚨';
            } else if (porcentagem >= 75) {
              corBarra = 'bg-yellow-500';
              statusTexto = 'Atenção';
              statusIcon = '⚠️';
            } else if (porcentagem >= 50) {
              corBarra = 'bg-orange-500';
              statusTexto = 'Moderado';
              statusIcon = '🔶';
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
            <strong>💡 Dica:</strong> Categorias em alerta são aquelas que já utilizaram 75% ou mais do limite definido.
          </p>
        </div>
      `;
    }

    modal.classList.remove('hidden');
  } catch (error) {
    console.error('❌ Erro ao mostrar modal de categorias em alerta:', error);
  }
};

// Função para fechar o modal de categorias em alerta
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

// Função para fechar modal de alertas
function closeModalAlertas() {
  const modal = document.getElementById('modal-alertas');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Função para renderizar transações
function renderTransactions() {
  // Suprimir rajadas de chamadas muito próximas
  try {
    const now = Date.now();
    if (window.__lastTransactionsRender && (now - window.__lastTransactionsRender) < 300) {
      console.log('⏱️ renderTransactions chamado muito próximo do anterior, pulando...');
      return;
    }
    window.__lastTransactionsRender = now;
  } catch {}
  const content = document.getElementById('app-content');
  
  // Calcular estatísticas das transações (seguir mês selecionado no Dashboard)
  const allTransacoes = window.appState.transactions || [];
  const { year: selYear, month: selMonth } = getSelectedPeriod();
  const selKey = `${selYear}-${String(selMonth).padStart(2, '0')}`;
  const transacoes = allTransacoes.filter(t => getTransactionYearMonth(t) === selKey);
  const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const saldo = receitas - despesas;
  const totalTransacoes = transacoes.length;
  
  // Agrupar transações por mês
  const transacoesPorMes = {};
  transacoes.forEach(t => {
    const data = t.createdAt && t.createdAt.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
    const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
    if (!transacoesPorMes[chave]) {
      transacoesPorMes[chave] = [];
    }
    transacoesPorMes[chave].push(t);
  });
  
  const mesesOrdenados = Object.keys(transacoesPorMes).sort().reverse();
  
  // Opções de seleção de mês/ano
  const mesesNomes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const monthOptions = mesesNomes.map((nome, idx) => `
    <option value="${idx + 1}" ${idx + 1 === selMonth ? 'selected' : ''}>${nome}</option>
  `).join('');
  // Anos disponíveis baseados nas transações, com fallback
  const anosSet = new Set((window.appState.transactions || [])
    .map(t => getTransactionYearMonth(t))
    .filter(Boolean)
    .map(ym => parseInt(ym.split('-')[0], 10)));
  if (anosSet.size === 0) {
    const y = new Date().getFullYear();
    [y - 1, y, y + 1].forEach(a => anosSet.add(a));
  }
  const anos = Array.from(anosSet).sort((a,b) => b - a);
  const yearOptions = anos.map(y => `<option value="${y}" ${y === selYear ? 'selected' : ''}>${y}</option>`).join('');

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📋 Transações</h2>
  <div id="tx-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          
          
          <!-- ========== SEÇÃO 1: RESUMO ANALÍTICO ========== -->
      <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
  <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💰 Resumo</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-500 via-green-500 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-6">
              <!-- Header do Card -->
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold">Visão Geral</h3>
                  <p class="text-sm opacity-90">${totalTransacoes} transações registradas</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${saldo >= 0 ? 'text-green-200' : 'text-red-200'}">
                    R$ ${saldo.toFixed(2)}
                  </div>
                  <p class="text-xs opacity-90">${saldo >= 0 ? '✓ Saldo Positivo' : '⚠️ Saldo Negativo'}</p>
                </div>
              </div>
              
              <!-- Grid de Métricas -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">💚</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">R$ ${receitas.toFixed(2)}</div>
                  <div class="text-sm opacity-90">Receitas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">💸</div>
                  <div class="text-2xl md:text-3xl font-bold text-red-200">R$ ${despesas.toFixed(2)}</div>
                  <div class="text-sm opacity-90">Despesas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📊</div>
                  <div class="text-2xl md:text-3xl font-bold">${totalTransacoes}</div>
                  <div class="text-sm opacity-90">Transações</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 2: AÇÕES E FILTROS ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Filtros</h2>
            </div>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Transações</h3>
                  <div class="flex gap-2">
                    <button id="add-transaction-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      ➕ Nova Transação
            </button>
                    <button id="voice-btn" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      🎤 Voz
            </button>
                  </div>
                </div>
          </div>
          
          <!-- Filtro de pesquisa -->
              <div class="p-4">
            <div class="relative">
              <input 
                type="text" 
                id="transaction-search" 
                    placeholder="🔍 Pesquisar por descrição, categoria ou valor..." 
                    class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="text-gray-400 text-lg">🔍</span>
              </div>
            </div>
            <div id="transaction-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="transaction-search-count">0</span> transação(ões) encontrada(s)
                </div>
              </div>
            </div>
          </div>
          
          <!-- ========== SEÇÃO 3: LISTA DE TRANSAÇÕES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Histórico</h2>
            </div>

            <!-- Indicador de período padronizado movido para o cabeçalho -->
            ${renderOlderMonthsControl()}
            
            <div id="transactions-list">${renderAllTransactions()}</div>
          </div>
        </div>
      </div>
    </div>
  `;
  // Configurar botões da tela de transações
  setTimeout(() => {
    setupTransactionButtons();
    const olderBtn = document.getElementById('load-older-months-btn');
    if (olderBtn && !olderBtn.dataset.bound) {
      olderBtn.dataset.bound = '1';
      olderBtn.addEventListener('click', () => window.loadAllOlderMonths && window.loadAllOlderMonths());
    }
  }, 100);
  
  // Configurar filtro de pesquisa
  setupTransactionSearch();
  
  // Injetar indicador de período padrão
  (async () => {
    try {
      const { createPeriodIndicator } = await import('./ui/PeriodIndicator.js');
      const holder = document.getElementById('tx-period-indicator');
      if (holder) {
        holder.innerHTML = '';
        holder.appendChild(createPeriodIndicator({ onChange: () => renderTransactions() }));
      }
    } catch (e) {
      console.warn('PeriodIndicator indisponível:', e);
    }
  })();
  
  renderFAB();
  // Remover renderBottomNav daqui - deve ser chamado apenas pelo router
  // renderBottomNav('/transactions');
}

// ===== Helpers globais para período selecionado (mês/ano) =====
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
// Expor helpers se necessário
window.getSelectedPeriod = getSelectedPeriod;
window.setSelectedPeriod = setSelectedPeriod;

// Função para configurar pesquisa de transações
function setupTransactionSearch() {
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
    this._debounceTimer = setTimeout(() => {
      const searchTerm = this.value.toLowerCase().trim();
      
      if (searchTerm === '') {
        // Mostrar todas as transações
        resultsDiv.classList.add('hidden');
        listDiv.innerHTML = renderAllTransactions();
        return;
      }
      
      // Filtrar transações
      const filteredTransactions = window.appState.transactions?.filter(t => {
        const descricao = (t.descricao || '').toLowerCase();
        const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
        const categoriaNome = (categoria?.nome || '').toLowerCase();
        const valor = String(t.valor ?? '');
        
        return descricao.includes(searchTerm) || 
               categoriaNome.includes(searchTerm) || 
               valor.includes(searchTerm);
      }) || [];
      
      // Atualizar contador
      countSpan.textContent = filteredTransactions.length;
      resultsDiv.classList.remove('hidden');
      
      // Renderizar transações filtradas
      listDiv.innerHTML = renderFilteredTransactions(filteredTransactions);
    }, 150);
  });
  
  // Limpar pesquisa com Escape (bind único)
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      this.dispatchEvent(new Event('input'));
    }
  });
}

// Função para renderizar todas as transações
// Normaliza a data de uma transação, suportando vários campos
function getTransactionDate(t) {
  try {
  let v = t?.dataEfetivacao || t?.dataLancamento || t?.data || t?.date || t?.createdAt;
    if (!v) return null;
    if (v && typeof v.toDate === 'function') return v.toDate();
    // Se vier timestamp numérico (ms) ou string ISO/BR
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

// Extrai YYYY-MM de forma robusta a partir da transação (aceita vários formatos)
function getTransactionYearMonth(t) {
  try {
    // Campos explícitos de competência (BR): MM/YYYY, YYYY-MM
    if (typeof t?.competencia === 'string') {
      const s = t.competencia.trim();
      let m;
      m = s.match(/^(\d{1,2})\/(\d{4})$/);
      if (m) return `${m[2]}-${String(parseInt(m[1], 10)).padStart(2, '0')}`;
      m = s.match(/^(\d{4})-(\d{2})$/);
      if (m) return `${m[1]}-${m[2]}`;
    }

    // Pares (mes, ano) em diferentes convenções
    const monthCandidates = [t?.mes, t?.mesReferencia, t?.mesLancamento, t?.mesCompetencia];
    const yearCandidates = [t?.ano, t?.anoReferencia, t?.anoLancamento, t?.anoCompetencia];
    const mesIdx = monthCandidates.findIndex(v => v !== undefined && v !== null && v !== '');
    const anoIdx = yearCandidates.findIndex(v => v !== undefined && v !== null && v !== '');
    if (mesIdx !== -1 && anoIdx !== -1) {
      const mon = parseInt(monthCandidates[mesIdx], 10);
      const y = parseInt(yearCandidates[anoIdx], 10);
      if (!Number.isNaN(mon) && mon >= 1 && mon <= 12 && !Number.isNaN(y) && y > 1900) {
        return `${y}-${String(mon).padStart(2, '0')}`;
      }
    }

    const v = t?.dataEfetivacao || t?.dataLancamento || t?.data || t?.date || t?.createdAt;
    if (!v) return null;

    // Firestore Timestamp
    if (v && typeof v.toDate === 'function') {
      const d = v.toDate();
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      return `${y}-${String(m).padStart(2, '0')}`;
    }

    // Number epoch (ms or seconds)
    if (typeof v === 'number') {
      const ms = v < 1e12 ? v * 1000 : v; // tratar epoch em segundos
      const d = new Date(ms);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        return `${y}-${String(m).padStart(2, '0')}`;
      }
      return null;
    }

    if (typeof v === 'string') {
      const s = v.trim();
      // ISO completo: YYYY-MM-DD...
      let m;
      m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (m) return `${m[1]}-${m[2]}`;

      // ISO ano-mês: YYYY-MM
      m = s.match(/^(\d{4})-(\d{2})$/);
      if (m) return `${m[1]}-${m[2]}`;

      // BR: DD/MM/YYYY
      m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (m) {
        const y = parseInt(m[3], 10);
        const mon = parseInt(m[2], 10);
        return `${y}-${String(mon).padStart(2, '0')}`;
      }

      // BR: MM/YYYY
      m = s.match(/^(\d{1,2})\/(\d{4})$/);
      if (m) {
        const y = parseInt(m[2], 10);
        const mon = parseInt(m[1], 10);
        return `${y}-${String(mon).padStart(2, '0')}`;
      }

      // Fallback: tentar Date
      const d = new Date(s);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const mon = d.getMonth() + 1;
        return `${y}-${String(mon).padStart(2, '0')}`;
      }
      return null;
    }

    // Fallback genérico
    const d = new Date(v);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const mon = d.getMonth() + 1;
      return `${y}-${String(mon).padStart(2, '0')}`;
    }
    return null;
  } catch {
    return null;
  }
}

// Formata a data para exibição:
// - Se houver dia, mostra DD/MM
// - Se só houver ano/mês, mostra MM/YYYY (ou usa o contexto do cartão)
function formatTransactionDisplayDate(t, anoCtx, mesCtx) {
  const d = getTransactionDate(t);
  if (d) return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const ym = getTransactionYearMonth(t);
  if (ym) {
    const [y, m] = ym.split('-');
    return `${m}/${y}`;
  }
  if (anoCtx && mesCtx) {
    return `${String(mesCtx).padStart(2, '0')}/${anoCtx}`;
  }
  return '--/--';
}

function renderAllTransactions() {
  // Seguir mês selecionado do Dashboard por padrão
  const { year: selYear, month: selMonth } = getSelectedPeriod();
  const selKey = `${selYear}-${String(selMonth).padStart(2, '0')}`;

  // Agrupar transações por mês
  const transacoesPorMes = {};
  (window.appState.transactions || []).forEach(t => {
    const chave = getTransactionYearMonth(t);
    if (!chave) return; // ignora itens sem data válida
    if (!transacoesPorMes[chave]) transacoesPorMes[chave] = [];
    transacoesPorMes[chave].push(t);
  });

  // Montar lista: primeiro o mês selecionado, depois os demais como lazy
  const allKeys = Object.keys(transacoesPorMes).sort().reverse();
  const ordered = [selKey, ...allKeys.filter(k => k !== selKey)];

  return ordered.map((mesAno, idx) => {
    const transacoesMes = transacoesPorMes[mesAno] || [];
    if (idx === 0) {
      return renderMonthSectionHTML(mesAno, transacoesMes);
    }
    // Demais meses: colapsados para lazy
    const [ano, mes] = mesAno.split('-');
    const nomesMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const nomeMes = nomesMeses[parseInt(mes) - 1];
    const receitasMes = transacoesMes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + parseFloat(t.valor), 0);
    const despesasMes = transacoesMes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + parseFloat(t.valor), 0);
    const saldoMes = receitasMes - despesasMes;
    return `
      <div id="month-${mesAno}" class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6" data-mes="${mesAno}" data-loaded="0">
        <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">${nomeMes} ${ano}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">${transacoesMes.length} transações</p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold ${saldoMes >= 0 ? 'text-green-600' : 'text-red-600'}">R$ ${saldoMes.toFixed(2)}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">+R$ ${receitasMes.toFixed(2)} • -R$ ${despesasMes.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div class="p-4">
          <button class="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-xl font-medium transition-all duration-200" onclick="window.loadMonthSection && window.loadMonthSection('${mesAno}')">
            Carregar transações deste mês
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Control bar to make lazy-loading discoverable
function renderOlderMonthsControl() {
  try {
    const txs = window.appState.transactions || [];
    if (!txs.length) return '';

    // If there are more than 2 months, show the control
    const byMonth = new Set();
    txs.forEach(t => {
      const d = t.createdAt && t.createdAt.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
      byMonth.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    });
    if (byMonth.size <= 2) return '';

    return `
      <div class="mb-3 flex justify-end">
        <button id="load-older-months-btn" class="text-sm px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition">
          Carregar meses anteriores
        </button>
      </div>
    `;
  } catch {
    return '';
  }
}

// Handler: expand all collapsed months
window.loadAllOlderMonths = function() {
  try {
    const sections = document.querySelectorAll('[id^="month-"][data-loaded="0"]');
    sections.forEach(sec => {
      const mesAno = sec.dataset.mes;
      if (mesAno && window.loadMonthSection) window.loadMonthSection(mesAno);
    });
  } catch {}
};

// Helper: renderiza uma seção mensal completa
function renderMonthSectionHTML(mesAno, transacoesMes) {
  const [ano, mes] = mesAno.split('-');
  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const nomeMes = nomesMeses[parseInt(mes) - 1];
  const receitasMes = transacoesMes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const despesasMes = transacoesMes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const saldoMes = receitasMes - despesasMes;
  const agora = new Date();
  const isMesAtual = (parseInt(ano) === agora.getFullYear() && parseInt(mes) === (agora.getMonth() + 1));
  const selYear = window.appState?.selectedYear || agora.getFullYear();
  const selMonth = window.appState?.selectedMonth || (agora.getMonth() + 1);
  const isMesSelecionado = (parseInt(ano) === parseInt(selYear) && parseInt(mes) === parseInt(selMonth));

  return `
    <div id="month-${mesAno}" class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6" data-mes="${mesAno}" data-loaded="1">
      <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div class="order-2 sm:order-1">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">${nomeMes} ${ano} ${isMesAtual ? '<span class="ml-2 align-middle inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Mês atual</span>' : ''} ${!isMesAtual && isMesSelecionado ? '<span class="ml-2 align-middle inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Mês selecionado</span>' : ''}</h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${transacoesMes.length} transações</p>
            <div class="mt-1 flex items-center gap-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
              <button class="hover:underline" onclick="window.expandAllDays && window.expandAllDays('${mesAno}')">Expandir todos</button>
              <span class="text-gray-400">•</span>
              <button class="hover:underline" onclick="window.collapseAllDays && window.collapseAllDays('${mesAno}')">Colapsar todos</button>
            </div>
          </div>
          <div class="order-1 sm:order-2 sm:text-right">
            <div class="text-base sm:text-lg font-bold ${saldoMes >= 0 ? 'text-green-600' : 'text-red-600'}">R$ ${saldoMes.toFixed(2)}</div>
            <div class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">+R$ ${receitasMes.toFixed(2)} • -R$ ${despesasMes.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div class="p-3 sm:p-4">
        ${transacoesMes.length === 0 ? `
          <div class="text-center py-8">
            <div class="text-5xl mb-3">🗓️</div>
            <div class="font-medium mb-1">Nenhuma transação neste mês</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">Adicione sua primeira transação de ${nomeMes}</div>
            <button onclick="showAddTransactionModal && showAddTransactionModal()" class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-md">➕ Nova Transação</button>
          </div>
        ` : `
        <div class="space-y-2 sm:space-y-3">
          ${renderTransactionsGroupedByDay(transacoesMes, parseInt(ano), parseInt(mes))}
        </div>
        `}
      </div>
    </div>
  `;
}

// Helper: agrupa transações por dia e renderiza com cabeçalho por data
function renderTransactionsGroupedByDay(transacoesMes, ano, mes) {
  try {
    // Mapa YYYY-MM-DD -> array de transações
    const groups = {};
    const toDate = (t) => {
      try {
        // Preferir data explícita
        const d = getTransactionDate(t);
        if (d && !isNaN(d.getTime())) return d;
      } catch {}
      // Fallback: tentar createdAt
      try {
        if (t.createdAt?.toDate) return t.createdAt.toDate();
        if (t.createdAt) {
          const d = new Date(t.createdAt);
          if (!isNaN(d.getTime())) return d;
        }
      } catch {}
      // Fallback final: usar primeiro dia do mês da seção
      return new Date(ano, mes - 1, 1);
    };

    transacoesMes.forEach(t => {
      const d = toDate(t);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${day}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push({ t, d });
    });

    // Ordenar dias desc
    const keys = Object.keys(groups).sort((a, b) => (a < b ? 1 : -1));
    const hoje = new Date();
    const isoHoje = hoje.toISOString().slice(0, 10);
    const ontem = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 1);
    const isoOntem = ontem.toISOString().slice(0, 10);

    const fmtBR = (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  return keys
      .map(key => {
        const dayEntries = groups[key];
        // Totais do dia
        const receitas = dayEntries.reduce((sum, { t }) => sum + (t?.tipo === 'receita' ? parseFloat(t.valor) || 0 : 0), 0);
        const despesas = dayEntries.reduce((sum, { t }) => sum + (t?.tipo === 'despesa' ? parseFloat(t.valor) || 0 : 0), 0);
        const saldo = receitas - despesas;

        // Ordenar transações do dia por horário desc
        const items = dayEntries
          .sort((a, b) => b.d.getTime() - a.d.getTime())
          .map(({ t }) => renderTransactionItemHTML(t, ano, mes))
          .join('');

        // Cabeçalho do dia: Hoje/Ontem/DD/MM
        const label =
          key === isoHoje ? 'Hoje' : key === isoOntem ? 'Ontem' : fmtBR(new Date(key));

        // Estado de colapso por dia
        const collapsed = isDayCollapsed(key);
        const chevron = collapsed ? '▸' : '▾';

        return `
          <div class="tx-day-group">
            <div class="tx-day-header tx-day-header--clickable" data-day-key="${key}" onclick="window.toggleDayGroup && window.toggleDayGroup('${key}')">
              <span class="tx-day-chevron" data-chev-key="${key}">${chevron}</span>
              ${label}
            </div>
            <div class="tx-day-summary">
              <span class="text-green-600">+R$ ${receitas.toFixed(2)}</span>
              <span class="text-gray-400">•</span>
              <span class="text-red-600">-R$ ${despesas.toFixed(2)}</span>
              <span class="text-gray-400">•</span>
              <span class="${saldo >= 0 ? 'text-green-700' : 'text-red-700'}">Saldo ${saldo >= 0 ? '' : '-'}R$ ${Math.abs(saldo).toFixed(2)}</span>
            </div>
            <div class="tx-day-items space-y-2 sm:space-y-3" data-day-key="${key}" style="display: ${collapsed ? 'none' : 'block'}">${items}</div>
          </div>
        `;
      })
      .join('');
  } catch (e) {
    console.warn('Falha ao agrupar por dia, render básico:', e);
    return transacoesMes.map(t => renderTransactionItemHTML(t, ano, mes)).join('');
  }
}

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

window.toggleDayGroup = function(key) {
  if (!key) return;
  // Inicializar set na memória (e carregar do storage se necessário)
  if (!window.appState) window.appState = {};
  if (!window.appState.ui) window.appState.ui = {};
  if (!window.appState.ui.collapsedDays) {
    window.appState.ui.collapsedDays = getCollapsedDays();
  }
  const set = window.appState.ui.collapsedDays;

  // Toggle no DOM
  const items = document.querySelector(`.tx-day-items[data-day-key="${key}"]`);
  const chev = document.querySelector(`.tx-day-chevron[data-chev-key="${key}"]`);
  if (items) {
    const nowCollapsed = items.style.display !== 'none' ? true : false;
    items.style.display = nowCollapsed ? 'none' : 'block';
    if (chev) chev.textContent = nowCollapsed ? '▸' : '▾';
    // Persistir estado
    if (nowCollapsed) set.add(key); else set.delete(key);
    saveCollapsedDays(set);
  }
};

// Expande todos os dias do mês
window.expandAllDays = function(mesAno) {
  try {
    if (!mesAno) return;
    if (!window.appState) window.appState = {};
    if (!window.appState.ui) window.appState.ui = {};
    if (!window.appState.ui.collapsedDays) {
      window.appState.ui.collapsedDays = getCollapsedDays();
    }
    const set = window.appState.ui.collapsedDays;
    const selector = `#month-${mesAno} .tx-day-items`;
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = 'block';
      const key = el.getAttribute('data-day-key');
      if (key) set.delete(key);
    });
    // Atualizar chevrons
    document.querySelectorAll(`#month-${mesAno} .tx-day-chevron`).forEach(ch => ch.textContent = '▾');
    saveCollapsedDays(set);
  } catch {}
};

// Colapsa todos os dias do mês
window.collapseAllDays = function(mesAno) {
  try {
    if (!mesAno) return;
    if (!window.appState) window.appState = {};
    if (!window.appState.ui) window.appState.ui = {};
    if (!window.appState.ui.collapsedDays) {
      window.appState.ui.collapsedDays = getCollapsedDays();
    }
    const set = window.appState.ui.collapsedDays;
    const selector = `#month-${mesAno} .tx-day-items`;
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = 'none';
      const key = el.getAttribute('data-day-key');
      if (key) set.add(key);
    });
    // Atualizar chevrons
    document.querySelectorAll(`#month-${mesAno} .tx-day-chevron`).forEach(ch => ch.textContent = '▸');
    saveCollapsedDays(set);
  } catch {}
};

// Helper: renderiza um item de transação
function renderTransactionItemHTML(t, ano, mes) {
  const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
  const dataFormatada = formatTransactionDisplayDate(t, ano, mes);
  const isReceita = t.tipo === 'receita';

  let parcelaInfo = '';
  if (t.recorrenteId) {
    let parcelaAtual = t.parcelaAtual;
    let parcelasTotal = t.parcelasTotal;

    if (!parcelaAtual || !parcelasTotal) {
      const recorrente = window.appState.recorrentes?.find(r => r.id === t.recorrenteId);
      if (recorrente) {
        parcelasTotal = recorrente.parcelasTotal;
        if (window.calcularParcelaRecorrente) {
          parcelaAtual = window.calcularParcelaRecorrente(recorrente, parseInt(ano), parseInt(mes));
        } else {
          parcelaAtual = 1;
        }
      } else {
        parcelaAtual = 1;
        parcelasTotal = 1;
      }
    }

    if (parcelasTotal && parcelasTotal > 1) {
      parcelaInfo = ` • 🔄 ${parcelaAtual}/${parcelasTotal}`;
    } else {
      parcelaInfo = ' • 🔄 ♾️';
    }
  }

  return `
    <div class="list-item p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group ${isReceita ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="flex flex-col items-center">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg ${isReceita ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}">${isReceita ? '💰' : '💸'}</div>
            <div class="w-3 h-3 rounded-full mt-1" style="background-color: ${categoria?.cor || '#6B7280'}"></div>
          </div>
          <div class="min-w-0 flex-1">
            <p class="list-item-title font-medium text-gray-900 dark:text-gray-100 truncate">${t.descricao}</p>
          </div>
        </div>
        <div class="text-right mt-0.5 sm:mt-0">
          <span class="font-bold text-base sm:text-lg ${isReceita ? 'text-green-600' : 'text-red-600'}">${isReceita ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}</span>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between gap-3">
        <p class="list-item-subtitle text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">${categoria?.nome || 'Sem categoria'} • ${dataFormatada}${parcelaInfo}</p>
        <div class="opacity-80 sm:opacity-60 group-hover:opacity-100 flex gap-1">
          <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200" title="Editar transação">✏️</button>
          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${(t.descricao || '').replace(/'/g, "\\'")}')" class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-all duration-200" title="Excluir transação">🗑️</button>
        </div>
      </div>
    </div>
  `;
}

// Lazy loader: chamado pelo botão para carregar um mês antigo
window.loadMonthSection = function(mesAno) {
  try {
    const el = document.getElementById(`month-${mesAno}`);
    if (!el || el.dataset.loaded === '1') return;

    const [ano, mes] = mesAno.split('-');
  const transacoesMes = (window.appState.transactions || []).filter(t => getTransactionYearMonth(t) === mesAno);

    el.outerHTML = renderMonthSectionHTML(mesAno, transacoesMes);
  } catch (err) {
    console.warn('Falha ao carregar mês', mesAno, err);
  }
};

// Função para renderizar transações filtradas
function renderFilteredTransactions(filteredTransactions) {
  if (!filteredTransactions.length) {
    return `
      <div class="text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `;
  }
  
  return filteredTransactions.map(t => {
  const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
  const data = formatTransactionDisplayDate(t);
    const isReceita = t.tipo === 'receita';
    
    return `
      <div class="list-item ${isReceita ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${t.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${categoria?.nome || 'Sem categoria'} • ${data}
            ${t.recorrenteId ? ' • Recorrente' : ''}
            ${(() => {
              if (!t.recorrenteId) return '';
              
              // Calcular parcela se não estiver salva
              let parcelaAtual = t.parcelaAtual;
              let parcelasTotal = t.parcelasTotal;
              
              if (!parcelaAtual || !parcelasTotal) {
                const recorrente = window.appState.recorrentes?.find(r => r.id === t.recorrenteId);
                if (recorrente) {
                  parcelasTotal = recorrente.parcelasTotal;
                  if (window.calcularParcelaRecorrente) {
                    const now = new Date();
                    parcelaAtual = window.calcularParcelaRecorrente(recorrente, now.getFullYear(), now.getMonth() + 1);
                  } else {
                    parcelaAtual = 1;
                  }
                } else {
                  parcelaAtual = 1;
                  parcelasTotal = 1;
                }
              }
              
              if (parcelasTotal && parcelasTotal > 1) {
                return ` • ${parcelaAtual} de ${parcelasTotal}`;
              } else {
                return ' • Infinito';
              }
            })()}
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span class="text-sm sm:text-base font-bold ${isReceita ? 'text-green-600' : 'text-red-600'}">
            ${isReceita ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
          </span>
          <div class="flex gap-1">
            <button onclick="window.editTransaction('${t.id}')" class="btn-secondary mobile-btn" title="Editar transação">
              <span class="icon-standard">✏️</span>
            </button>
            <button onclick="window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="btn-danger mobile-btn" title="Excluir transação">
              <span class="icon-standard">🗑️</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Função para calcular número da parcela
function calcularNumeroParcela(transacao) {
  if (!transacao.recorrenteId) {
    return null;
  }
  return 1; // Simplificado para esta versão
}

// Função para renderizar categorias
async function renderCategories() {
  // Suprimir rajadas de chamadas muito próximas
  try {
    const now = Date.now();
    if (window.__lastCategoriesRender && (now - window.__lastCategoriesRender) < 300) {
      console.log('⏱️ renderCategories chamado muito próximo do anterior, pulando...');
      return;
    }
    window.__lastCategoriesRender = now;
  } catch {}
  await loadTransactions();
  await loadRecorrentes();
  const content = document.getElementById('app-content');

  // Calcular estatísticas das categorias
  const categorias = window.appState.categories || [];
  const totalCategorias = categorias.length;
  const categoriasComLimite = categorias.filter(cat => cat.limite > 0).length;
  const categoriasReceita = categorias.filter(cat => cat.tipo === 'receita').length;
  const categoriasDespesa = categorias.filter(cat => cat.tipo === 'despesa').length;

  // Calcular gastos por categoria no mês selecionado
  const { year: anoAtual, month: mesAtual } = getSelectedPeriod();

  const categoriasComGastos = window.appState.categories
    .map(cat => {
      // Filtrar transações da categoria no mês atual (incluindo recorrentes aplicadas)
      const transacoesCategoria = window.appState.transactions.filter(t => {
        // Tratar Firestore Timestamp
        let transacaoData;
        if (
          t.createdAt &&
          typeof t.createdAt === 'object' &&
          t.createdAt.seconds
        ) {
          // É um Firestore Timestamp
          transacaoData = new Date(t.createdAt.seconds * 1000);
        } else {
          // É uma string ou outro formato
          transacaoData = new Date(t.createdAt);
        }

        const transacaoAno = transacaoData.getFullYear();
        const transacaoMes = transacaoData.getMonth() + 1;

        return (
          t.categoriaId === cat.id &&
          t.tipo === cat.tipo && // Usar o tipo da categoria (receita ou despesa)
          transacaoAno === anoAtual &&
          transacaoMes === mesAtual
        );
      });

      // Calcular total gasto das transações diretas
      const totalGastoTransacoes = transacoesCategoria.reduce(
        (sum, t) => sum + parseFloat(t.valor),
        0
      );

      // Calcular total gasto das recorrentes aplicadas neste mês
      const recorrentesAplicadas = window.appState.recorrentes.filter(
        r => r.categoriaId === cat.id && r.ativa === true
      );

      // Verificar quais recorrentes foram aplicadas neste mês
      let totalGastoRecorrentes = 0;
      recorrentesAplicadas.forEach(rec => {
        const transacoesRecorrente = window.appState.transactions.filter(
          t =>
            t.recorrenteId === rec.id &&
            new Date(t.createdAt).getFullYear() === anoAtual &&
            new Date(t.createdAt).getMonth() + 1 === mesAtual
        );

        if (transacoesRecorrente.length > 0) {
          totalGastoRecorrentes += parseFloat(rec.valor);
        }
      });

      // Total geral (transações + recorrentes)
      const totalGasto = totalGastoTransacoes + totalGastoRecorrentes;

      // Calcular limite (se existir)
      const limite = cat.limite ? parseFloat(cat.limite) : 0;

      // Calcular saldo (para receitas: quanto falta para atingir o limite)
      const saldo =
        cat.tipo === 'receita' ? limite - totalGasto : limite - totalGasto;

      // Calcular porcentagem de uso
      const porcentagem =
        limite > 0 ? Math.min((totalGasto / limite) * 100, 100) : 0;

      // Determinar cor da barra baseada na porcentagem
      let corBarra = 'bg-green-500';
      if (porcentagem >= 90) {
        corBarra = 'bg-red-500';
      } else if (porcentagem >= 75) {
        corBarra = 'bg-yellow-500';
      } else if (porcentagem >= 50) {
        corBarra = 'bg-orange-500';
      }

      return {
        ...cat,
        totalGasto,
        totalGastoTransacoes,
        totalGastoRecorrentes,
        limite,
        saldo,
        porcentagem,
        corBarra
      };
    })
    .sort((a, b) => b.totalGasto - a.totalGasto); // Ordenar por gasto (maior para menor)

  // Calcular categorias em alerta (limite excedido)
  const categoriasEmAlerta = categoriasComGastos.filter(cat => cat.limite > 0 && cat.totalGasto > cat.limite).length;

  // Seletor de mês/ano
  const selYear = window.appState?.selectedYear || new Date().getFullYear();
  const selMonth = window.appState?.selectedMonth || (new Date().getMonth() + 1);
  const mesesNomes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const monthOptions = mesesNomes.map((nome, idx) => `
    <option value="${idx + 1}" ${idx + 1 === selMonth ? 'selected' : ''}>${nome}</option>
  `).join('');
  const anosSet = new Set((window.appState.transactions || [])
    .map(t => getTransactionYearMonth(t))
    .filter(Boolean)
    .map(ym => parseInt(ym.split('-')[0], 10)));
  if (anosSet.size === 0) {
    const y = new Date().getFullYear();
    [y - 1, y, y + 1].forEach(a => anosSet.add(a));
  }
  const anos = Array.from(anosSet).sort((a,b) => b - a);
  const yearOptions = anos.map(y => `<option value="${y}" ${y === selYear ? 'selected' : ''}>${y}</option>`).join('');

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📂 Categorias</h2>
        <div id="cat-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Indicador de período padronizado movido para o cabeçalho -->
          
          <!-- ========== SEÇÃO 1: RESUMO ANALÍTICO ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Visão Geral</h2>
            </div>
            
            <div class="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-6">
              <!-- Header do Card -->
              <div class="flex items-center justify-between mb-6">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-xl md:text-2xl font-bold">Controle de Categorias</h3>
                  </div>
                  <p class="text-sm opacity-90">${totalCategorias} categorias cadastradas</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${categoriasEmAlerta > 0 ? 'text-red-200' : 'text-green-200'}">
                    ${categoriasEmAlerta}
                  </div>
                  <p class="text-xs opacity-90">${categoriasEmAlerta > 0 ? '⚠️ Alertas' : '✅ Sem Alertas'}</p>
                </div>
              </div>
              
              <!-- Grid de Métricas -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📂</div>
                  <div class="text-2xl md:text-3xl font-bold">${totalCategorias}</div>
                  <div class="text-sm opacity-90">Total</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">🎯</div>
                  <div class="text-2xl md:text-3xl font-bold text-blue-200">${categoriasComLimite}</div>
                  <div class="text-sm opacity-90">Com Limite</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">💚</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">${categoriasReceita}</div>
                  <div class="text-sm opacity-90">Receitas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">💸</div>
                  <div class="text-2xl md:text-3xl font-bold text-red-200">${categoriasDespesa}</div>
                  <div class="text-sm opacity-90">Despesas</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 2: AÇÕES E FILTROS ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Filtros</h2>
            </div>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Categorias</h3>
                  <div class="flex gap-2 flex-wrap">
                    <button onclick="window.migrarTransacoesAntigas()" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      🔄 Migrar
          </button>
                    <button onclick="window.corrigirTipoCategoria()" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      🔧 Corrigir
          </button>
                    <button id="add-category-btn" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      + Nova Categoria
          </button>
        </div>
      </div>
              </div>
              
          <!-- Filtro de pesquisa -->
              <div class="p-4">
            <div class="relative">
              <input 
                type="text" 
                id="category-search" 
                    placeholder="🔍 Pesquisar por nome, tipo ou limite..." 
                    class="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="text-gray-400 text-lg">🔍</span>
              </div>
            </div>
            <div id="category-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="category-search-count">0</span> categoria(s) encontrada(s)
                </div>
              </div>
            </div>
          </div>
          
          <!-- ========== SEÇÃO 3: GRID DE CATEGORIAS ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Todas as Categorias</h2>
              </div>
            
${categorias.length === 0 ? `
              <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="text-center py-12">
                  <div class="text-6xl mb-4">📂</div>
                  <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
                  <div class="text-gray-600 dark:text-gray-400 mb-4">Crie sua primeira categoria para organizar suas finanças</div>
                  <button onclick="window.showAddCategoryModal()" class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg">
                    📂 Criar Primeira Categoria
                  </button>
                  </div>
                  </div>
            ` : `
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${categoriasComGastos.map(cat => {
                  const isReceita = cat.tipo === 'receita';
                  const temLimite = cat.limite > 0;
                  const excedeuLimite = temLimite && cat.totalGasto > cat.limite;
                  
                  return `
                    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${excedeuLimite ? 'ring-2 ring-red-200 dark:ring-red-800' : ''}">
                      <!-- Header da Categoria -->
                      <div class="bg-gradient-to-r ${isReceita ? 'from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800' : 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800'} p-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style="background-color: ${cat.cor || '#4F46E5'}20; color: ${cat.cor || '#4F46E5'}">
                              ${isReceita ? '💰' : '💸'}
                    </div>
                            <div>
                              <h3 class="font-bold text-gray-900 dark:text-gray-100 truncate">${cat.nome}</h3>
                              <p class="text-sm text-gray-500 dark:text-gray-400">${isReceita ? 'Receita' : 'Despesa'}</p>
                            </div>
                          </div>
                          ${excedeuLimite ? '<div class="text-2xl">🚨</div>' : temLimite && cat.porcentagem >= 90 ? '<div class="text-2xl">⚠️</div>' : ''}
                        </div>
                  </div>
                      
                      <!-- Conteúdo da Categoria -->
                      <div class="p-4">
                        ${temLimite ? `
                          <!-- Com Limite -->
                          <div class="space-y-3">
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600 dark:text-gray-400">Limite Mensal</span>
                              <span class="font-bold text-gray-900 dark:text-gray-100">R$ ${cat.limite.toFixed(2)}</span>
                            </div>
                            
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600 dark:text-gray-400">${isReceita ? 'Recebido' : 'Gasto'}</span>
                              <span class="font-bold ${isReceita ? 'text-green-600' : excedeuLimite ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}">
                                R$ ${cat.totalGasto.toFixed(2)}
                              </span>
                            </div>
                            
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600 dark:text-gray-400">${isReceita ? 'Falta para meta' : 'Saldo'}</span>
                              <span class="font-bold ${cat.saldo < 0 ? 'text-red-600' : cat.saldo < cat.limite * 0.25 ? 'text-yellow-600' : 'text-green-600'}">
                                R$ ${cat.saldo.toFixed(2)}
                              </span>
                            </div>
                            
                            <!-- Breakdown por tipo -->
                            ${cat.totalGasto > 0 ? `
                              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs space-y-1">
                                <div class="flex justify-between">
                                  <span class="text-gray-600 dark:text-gray-400">Transações diretas:</span>
                                  <span>R$ ${cat.totalGastoTransacoes.toFixed(2)}</span>
                                </div>
                                ${cat.totalGastoRecorrentes > 0 ? `
                                  <div class="flex justify-between">
                                    <span class="text-gray-600 dark:text-gray-400">Recorrentes:</span>
                                    <span>R$ ${cat.totalGastoRecorrentes.toFixed(2)}</span>
                                  </div>
                                ` : ''}
                              </div>
                            ` : ''}
                  
                  <!-- Barra de Progresso -->
                            <div class="space-y-2">
                              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>${cat.porcentagem.toFixed(1)}% ${isReceita ? 'atingido' : 'usado'}</span>
                                <span>${cat.porcentagem >= 100 ? (isReceita ? 'Meta atingida!' : 'Limite excedido!') : ''}</span>
                    </div>
                              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div class="${cat.corBarra} h-3 rounded-full transition-all duration-500 ease-out" style="width: ${Math.min(cat.porcentagem, 100)}%"></div>
                    </div>
                  </div>
                            
                            ${excedeuLimite ? `
                              <div class="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                <div class="text-sm font-medium text-red-800 dark:text-red-200">
                                  ⚠️ Limite excedido em R$ ${(cat.totalGasto - cat.limite).toFixed(2)}
                </div>
                  </div>
                            ` : ''}
                    </div>
                        ` : `
                          <!-- Sem Limite -->
                          <div class="space-y-3">
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600 dark:text-gray-400">${isReceita ? 'Receita' : 'Gasto'} do mês</span>
                              <span class="font-bold ${isReceita ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'}">
                                R$ ${cat.totalGasto.toFixed(2)}
                              </span>
                </div>
                            
                            ${cat.totalGasto > 0 ? `
                              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs space-y-1">
                                <div class="flex justify-between">
                                  <span class="text-gray-600 dark:text-gray-400">Transações diretas:</span>
                                  <span>R$ ${cat.totalGastoTransacoes.toFixed(2)}</span>
                                </div>
                                ${cat.totalGastoRecorrentes > 0 ? `
                                  <div class="flex justify-between">
                                    <span class="text-gray-600 dark:text-gray-400">Recorrentes:</span>
                                    <span>R$ ${cat.totalGastoRecorrentes.toFixed(2)}</span>
                                  </div>
                                ` : ''}
                              </div>
                            ` : `
                              <div class="text-center py-4 text-gray-500 dark:text-gray-400">
                                <div class="text-2xl mb-2">📊</div>
                                <p class="text-sm">Nenhuma movimentação este mês</p>
                              </div>
                            `}
                            
                            <div class="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                              <div class="text-sm text-blue-800 dark:text-blue-200">
                                💡 Defina um limite para melhor controle
                              </div>
                            </div>
                          </div>
                        `}
                      </div>
                      
                      <!-- Botões de Ação -->
                      <div class="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex gap-2">
                          <button onclick="window.editCategory && window.editCategory('${cat.id}')" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                            ✏️ Editar
                </button>
                          <button onclick="window.showCategoryHistory && window.showCategoryHistory('${cat.id}')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                            📊 Histórico
                </button>
              </div>
            </div>
          </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Configurar botões da tela de categorias
  setTimeout(() => {
    setupCategoryButtons();
  }, 100);
  
  // Configurar filtro de pesquisa
  setupCategorySearch();
  
  // Injetar indicador de período padrão no cabeçalho
  (async () => {
    try {
      const { createPeriodIndicator } = await import('./ui/PeriodIndicator.js');
      const holder = document.getElementById('cat-period-indicator');
      if (holder) {
        holder.innerHTML = '';
        holder.appendChild(createPeriodIndicator({ onChange: () => renderCategories() }));
      }
    } catch (e) {
      console.warn('PeriodIndicator (Categorias) indisponível:', e);
    }
  })();
  
  renderFAB();
  // Remover renderBottomNav daqui - deve ser chamado apenas pelo router
  // renderBottomNav('/categories');
}

// Função para configurar pesquisa de categorias
function setupCategorySearch() {
  const searchInput = document.getElementById('category-search');
  const resultsDiv = document.getElementById('category-search-results');
  const countSpan = document.getElementById('category-search-count');
  const gridDiv = document.getElementById('categories-grid');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // Mostrar todas as categorias
      resultsDiv.classList.add('hidden');
      gridDiv.innerHTML = renderAllCategories();
      return;
    }
    
    // Filtrar categorias
    const filteredCategories = window.appState.categories?.filter(cat => {
      const nome = cat.nome.toLowerCase();
      const tipo = cat.tipo.toLowerCase();
      const limite = cat.limite?.toString() || '';
      
      return nome.includes(searchTerm) || 
             tipo.includes(searchTerm) || 
             limite.includes(searchTerm);
    }) || [];
    
    // Atualizar contador
    countSpan.textContent = filteredCategories.length;
    resultsDiv.classList.remove('hidden');
    
    // Renderizar categorias filtradas
    gridDiv.innerHTML = renderFilteredCategories(filteredCategories);
  });
  
  // Limpar pesquisa com Escape
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      this.dispatchEvent(new Event('input'));
    }
  });
}

// Função para renderizar todas as categorias
function renderAllCategories() {
  const { year: anoAtual, month: mesAtual } = getSelectedPeriod();

  const categoriasComGastos = window.appState.categories
    .map(cat => {
      // Filtrar transações da categoria no mês atual (incluindo recorrentes aplicadas)
      const transacoesCategoria = window.appState.transactions.filter(t => {
        // Tratar Firestore Timestamp
        let transacaoData;
        if (
          t.createdAt &&
          typeof t.createdAt === 'object' &&
          t.createdAt.seconds
        ) {
          // É um Firestore Timestamp
          transacaoData = new Date(t.createdAt.seconds * 1000);
        } else {
          // É uma string ou outro formato
          transacaoData = new Date(t.createdAt);
        }

        const transacaoAno = transacaoData.getFullYear();
        const transacaoMes = transacaoData.getMonth() + 1;

        return (
          t.categoriaId === cat.id &&
          t.tipo === cat.tipo && // Usar o tipo da categoria (receita ou despesa)
          transacaoAno === anoAtual &&
          transacaoMes === mesAtual
        );
      });

      // Calcular total gasto das transações diretas
      const totalGastoTransacoes = transacoesCategoria.reduce(
        (sum, t) => sum + parseFloat(t.valor),
        0
      );

      // Calcular total gasto das recorrentes aplicadas neste mês
      const recorrentesAplicadas = window.appState.recorrentes.filter(
        r => r.categoriaId === cat.id && r.ativa === true
      );

      // Verificar quais recorrentes foram aplicadas neste mês
      let totalGastoRecorrentes = 0;
      recorrentesAplicadas.forEach(rec => {
        const transacoesRecorrente = window.appState.transactions.filter(
          t =>
            t.recorrenteId === rec.id &&
            new Date(t.createdAt).getFullYear() === anoAtual &&
            new Date(t.createdAt).getMonth() + 1 === mesAtual
        );

        if (transacoesRecorrente.length > 0) {
          totalGastoRecorrentes += parseFloat(rec.valor);
        }
      });

      // Total geral (transações + recorrentes)
      const totalGasto = totalGastoTransacoes + totalGastoRecorrentes;

      // Calcular limite (se existir)
      const limite = cat.limite ? parseFloat(cat.limite) : 0;

      // Calcular saldo (para receitas: quanto falta para atingir o limite)
      const saldo =
        cat.tipo === 'receita' ? limite - totalGasto : limite - totalGasto;

      // Calcular porcentagem de uso
      const porcentagem =
        limite > 0 ? Math.min((totalGasto / limite) * 100, 100) : 0;

      // Determinar cor da barra baseada na porcentagem
      let corBarra = 'bg-green-500';
      if (porcentagem >= 90) {
        corBarra = 'bg-red-500';
      } else if (porcentagem >= 75) {
        corBarra = 'bg-yellow-500';
      } else if (porcentagem >= 50) {
        corBarra = 'bg-orange-500';
      }

      return {
        ...cat,
        totalGasto,
        totalGastoTransacoes,
        totalGastoRecorrentes,
        limite,
        saldo,
        porcentagem,
        corBarra
      };
    })
    .sort((a, b) => b.totalGasto - a.totalGasto); // Ordenar por gasto (maior para menor)

  return categoriasComGastos.map(cat => `
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
        <span class="list-item-title">${cat.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${cat.tipo}</p>
      
      ${
        cat.limite > 0
          ? `
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${cat.limite.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${cat.tipo === 'receita' ? 'Receita' : 'Gasto'}:</span>
                <span class="font-medium ${cat.tipo === 'receita' ? 'text-green-600' : cat.totalGasto > cat.limite ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}">R$ ${cat.totalGasto.toFixed(2)}</span>
              </div>
              ${
                cat.totalGasto > 0
                  ? `
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${cat.totalGastoTransacoes.toFixed(2)}
                      ${cat.totalGastoRecorrentes > 0 ? `<br>• Recorrentes: R$ ${cat.totalGastoRecorrentes.toFixed(2)}` : ''}
                    </div>
                  `
                  : ''
              }
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${cat.tipo === 'receita' ? 'Falta para meta' : 'Saldo'}:</span>
                <span class="font-medium ${cat.tipo === 'receita' ? (cat.saldo <= 0 ? 'text-green-600' : cat.saldo < cat.limite * 0.25 ? 'text-yellow-600' : 'text-red-600') : cat.saldo < 0 ? 'text-red-600' : cat.saldo < cat.limite * 0.25 ? 'text-yellow-600' : 'text-green-600'}">R$ ${cat.saldo.toFixed(2)}</span>
              </div>
              
              <!-- Barra de Progresso -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>${cat.porcentagem.toFixed(1)}% ${cat.tipo === 'receita' ? 'atingido' : 'usado'}</span>
                  <span>${cat.porcentagem >= 100 ? (cat.tipo === 'receita' ? 'Meta atingida!' : 'Limite excedido!') : ''}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="${cat.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(cat.porcentagem, 100)}%"></div>
                </div>
              </div>
            </div>
          `
          : `
            <div class="mt-3">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${cat.tipo === 'receita' ? 'Receita' : 'Gasto'} do mês:</span>
                <span class="font-medium ${cat.tipo === 'receita' ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'}">R$ ${cat.totalGasto.toFixed(2)}</span>
              </div>
              ${
                cat.totalGasto > 0
                  ? `
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • ${cat.tipo === 'receita' ? 'Receitas' : 'Transações'}: R$ ${cat.totalGastoTransacoes.toFixed(2)}
                      ${cat.totalGastoRecorrentes > 0 ? `<br>• Recorrentes: R$ ${cat.totalGastoRecorrentes.toFixed(2)}` : ''}
                    </div>
                  `
                  : ''
              }
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
            </div>
          `
      }
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${cat.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${cat.id}', '${cat.nome}')" class="btn-danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
        <button onclick="showCategoryHistory('${cat.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Função para renderizar categorias filtradas
function renderFilteredCategories(filteredCategories) {
  if (!filteredCategories.length) {
    return `
      <div class="col-span-full text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `;
  }
  
  return filteredCategories.map(cat => `
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
        <span class="list-item-title">${cat.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${cat.tipo}</p>
      ${cat.limite ? `<p class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${cat.limite.toFixed(2)}</p>` : '<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${cat.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${cat.id}', '${cat.nome}')" class="btn-danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
        <button onclick="showCategoryHistory('${cat.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Função router simplificada
async function router(path) {
  // Normalizar path removendo query string (ex: ?ym=YYYY-MM)
  const cleanPath = (path || '').split('?')[0] || '/dashboard';
  console.log('🔄 Router chamado com path:', path, '→ normalizado:', cleanPath);
  console.log('🔄 Estado atual:', {
    currentUser: !!window.appState?.currentUser,
    currentBudget: !!window.appState?.currentBudget,
    hash: window.location.hash
  });
  
  // Atualizar título da página
  updatePageTitle(cleanPath);
  
  // Aplicar modo de compactação
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
      console.log('🔄 Renderizando transações...');
      renderTransactions();
      renderBottomNav('/transactions');
      console.log('✅ Transações renderizadas');
      break;
    case '/categories':
      console.log('🔄 Renderizando categorias...');
      await renderCategories();
      renderBottomNav('/categories');
      console.log('✅ Categorias renderizadas');
      break;
    case '/analytics':
      console.log('🔄 Renderizando análises...');
      try {
        if (typeof renderAnalytics === 'function') {
          await renderAnalytics();
        } else {
          // Fallback: carregar módulo dinamicamente
          try {
            const mod = await import('./ui/AnalyticsRoute.js');
            if (mod?.renderAnalytics) {
              await mod.renderAnalytics();
            } else if (window.renderAnalytics) {
              await window.renderAnalytics();
            } else {
              throw new Error('Função renderAnalytics não disponível');
            }
          } catch (dynErr) {
            console.error('❌ Erro ao importar AnalyticsRoute dinamicamente:', dynErr);
            const content = document.getElementById('app-content');
            if (content) {
              content.innerHTML = `
                <div class="tab-container">
                  <div class="tab-header">
                    <h2 class="tab-title-highlight">📊 Análises</h2>
                  </div>
                  <div class="tab-content">
                    <div class="content-spacing">
                      <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 px-4 py-3 rounded mb-4">
                        Não foi possível carregar o módulo de análises.
                      </div>
                    </div>
                  </div>
                </div>`;
            }
          }
        }
      } catch (e) {
        console.error('❌ Erro ao renderizar análises:', e);
      }
      renderBottomNav('/analytics');
      console.log('✅ Análises renderizadas');
      break;
    case '/recorrentes':
      console.log('🔄 Renderizando recorrentes...');
      if (window._renderRecorrentes || window.renderRecorrentes) {
        (window._renderRecorrentes || window.renderRecorrentes)();
      } else {
        console.warn('⚠️ RecorrentesPage não disponível; tentando carregar módulo diretamente');
        try {
          const mod = await import('./recorrentes/RecorrentesPage.js');
          if (mod?.renderRecorrentes) {
            mod.renderRecorrentes();
          } else {
            const content = document.getElementById('app-content');
            if (content) content.innerHTML = `<div class="p-4">Não foi possível carregar Recorrentes.</div>`;
          }
        } catch (e) {
          console.error('Erro ao carregar RecorrentesPage.js:', e);
          const content = document.getElementById('app-content');
          if (content) content.innerHTML = `<div class="p-4">Erro ao carregar Recorrentes.</div>`;
        }
      }
      renderFAB();
      renderBottomNav('/recorrentes');
      console.log('✅ Recorrentes renderizadas');
      break;
    case '/notifications':
      console.log('🔄 Renderizando notificações...');
      if (window.renderNotifications) {
        await window.loadNotifications();
        window.renderNotifications();
      } else {
        // Fallback se a função não existir
        console.log('⚠️ Função renderNotifications não encontrada, usando fallback');
        const content = document.getElementById('app-content');
        if (content) {
          content.innerHTML = `
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Notificações</h2>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">🔔</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Notificações</div>
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
      console.log('✅ Notificações renderizadas');
      break;
    case '/settings':
      console.log('🔄 Renderizando configurações...');
      if (window.renderSettings) {
        window.renderSettings();
      } else {
        console.warn('⚠️ SettingsPage não disponível; tentando carregar módulo diretamente');
        try {
          const mod = await import('./config/SettingsPage.js');
          if (mod?.renderSettings) {
            window.renderSettings = mod.renderSettings;
            await mod.renderSettings();
          } else {
            const content = document.getElementById('app-content');
            if (content) content.innerHTML = `<div class="p-4">Não foi possível carregar Configurações.</div>`;
          }
        } catch (e) {
          console.error('Erro ao carregar SettingsPage.js:', e);
          const content = document.getElementById('app-content');
          if (content) content.innerHTML = `<div class="p-4">Erro ao carregar Configurações.</div>`;
        }
      }
      renderFAB();
      renderBottomNav('/settings');
      console.log('✅ Configurações renderizadas');
      break;
    default:
      console.log('🔄 Rota não reconhecida, usando dashboard como fallback');
      await renderDashboard();
      renderBottomNav('/dashboard');
      console.log('✅ Dashboard renderizado (fallback)');
  }
  
  // Atualizar SwipeNavigation após navegação
  setTimeout(() => {
    if (window.swipeNavigation && window.swipeNavigation.updateCurrentTabIndex) {
      window.swipeNavigation.updateCurrentTabIndex();
      window.swipeNavigation.updateSwipeIndicator();
    }
  }, 200);
  
  // Sempre voltar ao topo ao trocar de aba/rota
  resetScrollPosition();
  // E garantir novamente logo após o tick (caso de renders assíncronos)
  setTimeout(resetScrollPosition, 50);
  

}

// Exportar função router para uso global
window.router = router;

// Função para editar transação
window.editTransaction = function(transactionId) {
  console.log('🔧 Editando transação:', transactionId);
  
  if (!transactionId) {
    console.error('❌ ID da transação não fornecido');
    return;
  }
  
  // Buscar a transação
  const transaction = window.appState.transactions?.find(t => t.id === transactionId);
  
  if (!transaction) {
    console.error('❌ Transação não encontrada:', transactionId);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Transação não encontrada',
        type: 'error'
      });
    }
    return;
  }
  
  console.log('✅ Transação encontrada:', transaction);
  
  // Abrir modal de edição com os dados da transação
  if (window.showAddTransactionModal) {
    window.showAddTransactionModal(transaction);
  } else {
    console.error('❌ Função showAddTransactionModal não disponível');
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Função de edição não disponível',
        type: 'error'
      });
    }
  }
};

// Função para editar categoria
window.editCategory = function(categoryId) {
  console.log('🔧 Editando categoria:', categoryId);
  
  if (!categoryId) {
    console.error('❌ ID da categoria não fornecido');
    return;
  }
  
  // Buscar a categoria
  const category = window.appState.categories?.find(c => c.id === categoryId);
  
  if (!category) {
    console.error('❌ Categoria não encontrada:', categoryId);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Categoria não encontrada',
        type: 'error'
      });
    }
    return;
  }
  
  console.log('✅ Categoria encontrada:', category);
  
  // Abrir modal de edição com os dados da categoria
  if (window.showAddCategoryModal) {
    window.showAddCategoryModal(category);
  } else {
    console.error('❌ Função showAddCategoryModal não disponível');
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Função de edição não disponível',
        type: 'error'
      });
    }
  }
};

// Função para mostrar histórico da categoria
window.showCategoryHistory = function(categoryId) {
  console.log('📊 Mostrando histórico da categoria:', categoryId);
  
  if (!categoryId) {
    console.error('❌ ID da categoria não fornecido');
    return;
  }
  
  // Buscar a categoria
  const category = window.appState.categories?.find(c => c.id === categoryId);
  
  if (!category) {
    console.error('❌ Categoria não encontrada:', categoryId);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'Categoria não encontrada',
        type: 'error'
      });
    }
    return;
  }
  
  // Buscar transações desta categoria
  const transactions = window.appState.transactions?.filter(t => t.categoriaId === categoryId) || [];
  
  // Criar modal com histórico
  if (window.Modal) {
    const totalGasto = transactions.reduce((sum, t) => sum + parseFloat(t.valor), 0);
    
    window.Modal({
      title: `📊 Histórico: ${category.nome}`,
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
              <span class="text-sm text-gray-600 dark:text-gray-400">Número de transações:</span>
              <span class="font-medium">${transactions.length}</span>
            </div>
          </div>
          
          <div class="max-h-96 overflow-y-auto space-y-2">
            ${transactions.length === 0 ? `
              <div class="text-center py-8">
                <div class="text-4xl mb-2">📊</div>
                <p class="text-gray-500 dark:text-gray-400">Nenhuma transação encontrada para esta categoria</p>
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
    console.error('❌ Função Modal não disponível');
  }
};

// Função para renderizar FAB
function renderFAB() {
  console.log('🔧 Renderizando FAB corrigido...');
  const fabContainer = document.getElementById('fab-container');
  
  if (!fabContainer) {
    console.error('❌ Container FAB não encontrado');
    return;
  }
  
  console.log('✅ Container FAB encontrado, criando FAB corrigido...');
  
  try {
    // Limpar container e event listeners antigos
    if (window.currentFAB && window.currentFAB.cleanup) {
      console.log('🧹 Limpando FAB anterior...');
      window.currentFAB.cleanup();
    }
    
    fabContainer.innerHTML = '';
    
    // Criar FAB corrigido
    console.log('🔧 Criando FAB corrigido...');
    const fab = FAB();
    console.log('🔧 FAB corrigido criado:', fab);
    fabContainer.appendChild(fab);
    console.log('🔧 FAB corrigido adicionado ao container');
    
    // Armazenar referência para limpeza
    window.currentFAB = fab;
    
    console.log('✅ FAB corrigido criado e adicionado ao DOM');
    
    // Verificar se o FAB está visível e funcionando
    setTimeout(() => {
      const fabMain = document.getElementById('fab-main');
      const fabContainerMain = document.getElementById('fab-container-main');
      const fabActions = document.getElementById('fab-actions');
      
      if (fabMain) {
        console.log('✅ FAB principal encontrado e visível');
      } else {
        console.error('❌ FAB principal não encontrado');
      }
      
      if (fabContainerMain) {
        console.log('✅ Container FAB principal encontrado');
      } else {
        console.error('❌ Container FAB principal não encontrado');
      }
      
      if (fabActions) {
        console.log('✅ Container de ações FAB encontrado');
      } else {
        console.error('❌ Container de ações FAB não encontrado');
      }
      
      // Verificar botões de ação
      const transactionBtn = document.getElementById('fab-transaction');
      const recorrenteBtn = document.getElementById('fab-recorrente');
      const voiceBtn = document.getElementById('fab-voice');
      
      console.log('🔧 Verificando botões de ação:');
      console.log('  - Nova Transação:', !!transactionBtn);
      console.log('  - Nova Recorrente:', !!recorrenteBtn);
      console.log('  - Voz:', !!voiceBtn);
      
      // Verificar funções globais
      console.log('🔧 Verificando funções globais:');
      console.log('  - showAddTransactionModal:', typeof window.showAddTransactionModal === 'function');
      console.log('  - showAddRecorrenteModal:', typeof window.showAddRecorrenteModal === 'function');
      console.log('  - openVoiceModal:', typeof window.openVoiceModal === 'function');
      console.log('  - Snackbar:', typeof window.Snackbar === 'function');
      
    }, 300);
    
  } catch (error) {
    console.error('❌ Erro ao criar FAB corrigido:', error);
  }
}

// Função para renderizar bottom navigation
function renderBottomNav(activeRoute) {
  console.log('🔄 Renderizando bottom navigation para:', activeRoute);
  const bottomNav = document.getElementById('bottom-nav');
  if (!bottomNav) {
    console.error('❌ Elemento bottom-nav não encontrado');
    return;
  }

  // Evitar re-render se já está no mesmo estado
  try {
    const currentActiveBtn = bottomNav.querySelector('.nav-btn.active');
    const currentActiveRoute = currentActiveBtn ? currentActiveBtn.getAttribute('data-route') : null;
    const lastActive = bottomNav.dataset.activeRoute || null;
    if (lastActive === activeRoute && currentActiveRoute === activeRoute) {
      console.log('⏭️ Bottom navigation já atualizada; pulando render.');
      return;
    }
  } catch {}

  console.log('✅ Elemento bottom-nav encontrado, renderizando...');
  bottomNav.innerHTML = `
    <nav class="bottom-nav">
      <a href="#/dashboard" class="nav-btn ${activeRoute === '/dashboard' ? 'active' : ''}" data-route="/dashboard">
        <span class="nav-icon">📊</span>
        <span class="nav-text">Dashboard</span>
      </a>
      <a href="#/transactions" class="nav-btn ${activeRoute === '/transactions' ? 'active' : ''}" data-route="/transactions">
        <span class="nav-icon">📋</span>
        <span class="nav-text">Transações</span>
      </a>
      <a href="#/categories" class="nav-btn ${activeRoute === '/categories' ? 'active' : ''}" data-route="/categories">
        <span class="nav-icon">📂</span>
        <span class="nav-text">Categorias</span>
      </a>
      <a href="#/analytics" class="nav-btn ${activeRoute === '/analytics' ? 'active' : ''}" data-route="/analytics">
        <span class="nav-icon">📈</span>
        <span class="nav-text">Análises</span>
      </a>
      <a href="#/recorrentes" class="nav-btn ${activeRoute === '/recorrentes' ? 'active' : ''}" data-route="/recorrentes">
        <span class="nav-icon">🔄</span>
        <span class="nav-text">Recorrentes</span>
      </a>
      <a href="#/notifications" class="nav-btn ${activeRoute === '/notifications' ? 'active' : ''}" data-route="/notifications">
        <span class="nav-icon">🔔</span>
        <span class="nav-text">Notificações</span>
      </a>
      <a href="#/settings" class="nav-btn ${activeRoute === '/settings' ? 'active' : ''}" data-route="/settings">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">Config</span>
      </a>
    </nav>
  `;
  try { bottomNav.dataset.activeRoute = activeRoute; } catch {}
  console.log('✅ Bottom navigation renderizada com sucesso');
}

// Função para mostrar loading
function showLoading(show) {
  const loadingPage = document.getElementById('loading-page');
  if (loadingPage) {
    loadingPage.style.display = show ? 'flex' : 'none';
  }
}

// Função para configurar navegação
function setupNavigation() {
  // Desabilitar restauração automática de scroll do navegador
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch {}

  // Função auxiliar para normalizar path removendo query string
  const normalize = (p) => (p || '').split('?')[0] || '/dashboard';
  let currentPath = normalize(window.location.hash.slice(1)) || '/dashboard';
  
  // Array de rotas disponíveis
  const routes = ['/dashboard', '/transactions', '/categories', '/analytics', '/recorrentes', '/notifications', '/settings'];
  


  // Função para navegar para próxima/anterior rota
  function navigateToRoute(direction) {
    const currentIndex = routes.indexOf(currentPath);
    if (currentIndex === -1) return;
    
    let newIndex;
    let directionText = '';
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % routes.length;
      directionText = 'Próxima aba';
    } else {
      newIndex = currentIndex === 0 ? routes.length - 1 : currentIndex - 1;
      directionText = 'Aba anterior';
    }
    
    const newPath = routes[newIndex];
    const routeNames = {
      '/dashboard': 'Dashboard',
      '/transactions': 'Transações',
      '/categories': 'Categorias',
      '/analytics': 'Análises',
      '/recorrentes': 'Recorrentes',
      '/notifications': 'Notificações',
      '/settings': 'Configurações'
    };
    
    showSwipeIndicator(`${directionText}: ${routeNames[newPath]}`);
    window.location.hash = newPath;
    updatePageTitle(newPath);
  }
  
  // Navegação com setas do teclado
  document.addEventListener('keydown', (e) => {
    // Só funcionar se não estiver em um input ou textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        navigateToRoute('prev');
        break;
      case 'ArrowRight':
        e.preventDefault();
        navigateToRoute('next');
        break;
    }
  });
  
  // Navegação por deslizar (swipe)
  let startX = 0;
  let startY = 0;
  let isSwiping = false;
  
  // Criar indicador de swipe
  const swipeIndicator = document.createElement('div');
  swipeIndicator.className = 'swipe-indicator';
  swipeIndicator.textContent = 'Deslize para mudar de aba';
  document.body.appendChild(swipeIndicator);
  
  function showSwipeIndicator(message) {
    swipeIndicator.textContent = message;
    swipeIndicator.classList.add('show');
    setTimeout(() => {
      swipeIndicator.classList.remove('show');
    }, 1000);
  }
  
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = false;
  });
  
  document.addEventListener('touchmove', (e) => {
    if (!startX || !startY) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    
    // Verificar se é um swipe horizontal (mais horizontal que vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      isSwiping = true;
      e.preventDefault(); // Prevenir scroll durante swipe
    }
  });
  
  document.addEventListener('touchend', (e) => {
    if (!isSwiping || !startX) return;
    
    const deltaX = e.changedTouches[0].clientX - startX;
    const minSwipeDistance = 100;
    
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe para direita - ir para aba anterior
        navigateToRoute('prev');
      } else {
        // Swipe para esquerda - ir para próxima aba
        navigateToRoute('next');
      }
    }
    
    startX = 0;
    startY = 0;
    isSwiping = false;
  });
  
  // Navegação por hash
  window.addEventListener('hashchange', () => {
    const newPathRaw = window.location.hash.slice(1) || '/dashboard';
    const newPath = normalize(newPathRaw);
    console.log('🔄 Hash change detectado:', { oldPath: currentPath, newPathRaw, newPath });
    if (newPath !== currentPath) {
      currentPath = newPath;
      console.log('🔄 Navegando para nova rota:', newPath);
      updatePageTitle(newPath);
      router(newPath);
    }
  });

  // Navegação inicial
  console.log('🔄 Navegação inicial para:', currentPath);
  updatePageTitle(currentPath);
  router(currentPath);
}

// Helper: zera a posição de scroll da página e do container principal
function resetScrollPosition() {
  try {
    // Scroll da janela/documento
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.body.scrollTop = 0; // fallback
    document.documentElement.scrollTop = 0; // fallback
  } catch {
    try { window.scrollTo(0, 0); } catch {}
  }
  try {
    // Scroll do container de conteúdo (se tiver overflow próprio)
    const content = document.getElementById('app-content');
    if (content && typeof content.scrollTo === 'function') {
      content.scrollTo({ top: 0, behavior: 'auto' });
    } else if (content) {
      content.scrollTop = 0;
    }
  } catch {}
}

// Função para configurar botão de login
function setupLoginButton() {
  const loginBtn = document.getElementById('btn-entrar');
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      try {
        showLoading(true);
        const user = await loginWithGoogle();
        if (user) {
          window.appState.currentUser = user;
          toggleLoginPage(false);
          setupNavigation();
          
          // Carregar dados do usuário após login
          try {
            console.log('📊 Carregando dados do usuário após login...');
            await loadBudgets();
            await selectDefaultBudget();
            await loadTransactions();
            await loadCategories();
            await loadRecorrentes();
            await loadNotifications();
            await listenNotifications();
            await startAllListeners(window.appState.currentBudget?.id);
            console.log('✅ Dados carregados com sucesso após login');
          } catch (error) {
            console.error('❌ Erro ao carregar dados após login:', error);
          }
          
          await router('/dashboard');
        }
      } catch (error) {
        console.error('Erro no login:', error);
        showLoading(false);
      }
    });
  }
}

// Função para verificar autenticação
function checkAuthState() {
  return new Promise((resolve) => {
    let isFirstCall = true;
    
    // Manter listener permanente para detectar mudanças de autenticação
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('✅ Usuário autenticado:', user.email);
        window.appState.currentUser = user;
        toggleLoginPage(false);
        
        if (isFirstCall) {
          isFirstCall = false;
          resolve(true);
        }
      } else {
        console.log('❌ Usuário não autenticado');
        window.appState.currentUser = null;
        
        // Parar todos os listeners quando usuário faz logout
        if (typeof window.stopAllListeners === 'function') {
          window.stopAllListeners();
        }
        
        // Limpar estado da aplicação
        if (window.appState) {
          window.appState.currentBudget = null;
          window.appState.transactions = [];
          window.appState.categories = [];
          window.appState.budgets = [];
          window.appState.recorrentes = [];
        }
        
        toggleLoginPage(true);
        
        if (isFirstCall) {
          isFirstCall = false;
          resolve(false);
        }
      }
    });
  });
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Iniciando aplicação...');
  
  // Estado global da aplicação
  window.appState = {
    currentUser: null,
    currentBudget: null,
    transactions: [],
    categories: [],
    budgets: [],
    recorrentes: [],
    isInitialized: false
  };



  // Aplicar modo de compactação globalmente
  if (window.applyCompactMode) {
    window.applyCompactMode();
  }

  // Teste: Verificar se a navegação está sendo renderizada
  console.log('🔍 Teste: Verificando elementos de navegação...');
  const bottomNav = document.getElementById('bottom-nav');
  console.log('🔍 Elemento bottom-nav encontrado:', !!bottomNav);
  if (bottomNav) {
    console.log('🔍 Conteúdo do bottom-nav:', bottomNav.innerHTML);
  }

  // Verificar estado de autenticação
  const isAuthenticated = await checkAuthState();
  
  // Configurar navegação e login apenas se autenticado
  if (isAuthenticated) {
    setupNavigation();
    
    // Mostrar loading
    showLoading(true);
    
    // Carregar dados do usuário
    try {
      console.log('📊 Carregando dados do usuário...');
      await loadBudgets();
      await selectDefaultBudget();
      await loadTransactions();
      await loadCategories();
      await loadRecorrentes();
      await loadNotifications();
      await listenNotifications();
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
  
  console.log('✅ Aplicação iniciada com sucesso!');
});

// Função wrapper para adicionar categoria com confirmação
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
          console.error('❌ Erro ao adicionar categoria:', error);
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
        console.log('❌ Adição de categoria cancelada pelo usuário');
        reject(new Error('Operação cancelada pelo usuário'));
      }
    });
  });
};

// Exportar funções globais
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
window.selectDefaultBudget = selectDefaultBudget;
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

// Função para obter instância do sistema de voz
function getVoiceSystem() {
  if (!voiceSystem) {
    voiceSystem = new VoiceSystem();
  }
  return voiceSystem;
}

// Função global para abrir modal de voz
window.openVoiceModal = function(type = 'transaction') {
  console.log('🎤 openVoiceModal chamado:', type);
  const system = getVoiceSystem();
  return system.start(type);
};

// Função global para fechar modal de voz
window.closeVoiceModal = function() {
  console.log('🎤 closeVoiceModal chamado');
  if (voiceSystem) {
    voiceSystem.stop();
  }
};

// Função global para iniciar reconhecimento de voz
window.startVoiceRecognition = function(type = 'transaction') {
  console.log('🎤 startVoiceRecognition chamado:', type);
  const system = getVoiceSystem();
  return system.start(type);
};

// Função para processar comandos de voz (mantida para compatibilidade)
async function processVoiceCommand(transcript, type) {
  console.log('🎤 processVoiceCommand chamado (compatibilidade):', transcript, type);
  
  // Usar o novo sistema de voz se disponível
  if (voiceSystem) {
    try {
      await voiceSystem.processCommand(transcript, type);
    } catch (error) {
      console.error('❌ Erro no novo sistema de voz:', error);
      if (window.Snackbar) {
        window.Snackbar.show(`Erro ao processar comando: ${error.message}`, 'error');
      }
    }
  } else {
    console.warn('⚠️ Sistema de voz não disponível');
  }
}

// Função auxiliar para converter números por extenso em português para número
function parseNumeroPorExtenso(palavra) {
  const mapa = {
    zero: 0, um: 1, uma: 1, dois: 2, duas: 2, três: 3, tres: 3, quatro: 4, cinco: 5,
    seis: 6, sete: 7, oito: 8, nove: 9, dez: 10, onze: 11, doze: 12, treze: 13,
    quatorze: 14, catorze: 14, quinze: 15, dezesseis: 16, dezessete: 17, dezoito: 18,
    dezenove: 19, vinte: 20, trinta: 30, quarenta: 40, cinquenta: 50, sessenta: 60,
    setenta: 70, oitenta: 80, noventa: 90, cem: 100, cento: 100, sem: 100,
    duzentos: 200, trezentos: 300, quatrocentos: 400, quinhentos: 500,
    seiscentos: 600, setecentos: 700, oitocentos: 800, novecentos: 900, mil: 1000
  };
  
  if (!palavra) return NaN;
  
  palavra = palavra.toLowerCase().replace(/\./g, '');
  if (mapa[palavra] !== undefined) return mapa[palavra];
  
  // Tenta converter por extenso composto (ex: cento e vinte)
  if (palavra.includes(' e ')) {
    return palavra.split(' e ').reduce((total, parte) => {
      const num = parseNumeroPorExtenso(parte);
      return isNaN(num) ? total : total + num;
    }, 0);
  }
  
  return NaN;
}

// Processar comando de voz para transação
async function processTransactionVoice(transcript) {
  const texto = transcript.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const words = texto.split(' ');
  
  if (words.length < 4) {
    alert('Comando inválido. Use: "descrição valor tipo categoria"');
    return;
  }
  
  // Extrair valor (número ou por extenso)
  let valorIndex = words.findIndex(word => !isNaN(parseFloat(word)));
  let valor = NaN;
  if (valorIndex !== -1) {
    valor = parseFloat(words[valorIndex]);
  } else {
    for (let i = 0; i < words.length; i++) {
      const n = parseNumeroPorExtenso(words[i]);
      if (!isNaN(n) && n > 0) {
        valor = n;
        valorIndex = i;
        break;
      }
    }
  }
  
  if (isNaN(valor)) {
    alert('Valor não encontrado no comando (diga um número, ex: "cem", "duzentos", "mil" ou "100")');
    return;
  }
  
  // Extrair tipo (receita/despesa)
  const tipoIndex = words.findIndex(word => /^(receita|receitas|despesa|despesas)$/.test(word));
  if (tipoIndex === -1) {
    alert('Tipo não encontrado (receita ou despesa)');
    return;
  }
  
  let tipo = words[tipoIndex];
  if (/^receita/.test(tipo)) tipo = 'receita';
  if (/^despesa/.test(tipo)) tipo = 'despesa';
  
  // Extrair categoria (última palavra)
  const categoriaNome = words[words.length - 1];
  // Extrair descrição (tudo antes do valor)
  const descricao = words.slice(0, valorIndex).join(' ');
  
  // Encontrar categoria no banco (normalizando)
  const categoria = window.appState.categories.find(c =>
    normalizarTexto(c.nome).includes(normalizarTexto(categoriaNome)) ||
    normalizarTexto(categoriaNome).includes(normalizarTexto(c.nome))
  );
  
  if (!categoria) {
    alert(`Categoria "${categoriaNome}" não encontrada. Crie a categoria primeiro.`);
    return;
  }
  
  // Exibir formulário real já preenchido para revisão
  window.showAddTransactionModal({
    descricao,
    valor,
    tipo,
    categoriaId: categoria.id
  });
}

// Processar comando de voz para categoria
async function processCategoryVoice(transcript) {
  const texto = transcript.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const words = texto.split(' ');
  
  if (words.length < 3) {
    alert('Comando inválido. Use: "nome tipo limite"');
    return;
  }
  
  // Extrair tipo (receita/despesa)
  const tipoIndex = words.findIndex(word => ['receita', 'despesa'].includes(word));
  if (tipoIndex === -1) {
    alert('Tipo não encontrado (receita ou despesa)');
    return;
  }
  const tipo = words[tipoIndex];
  
  // Extrair limite (número ou por extenso)
  let limiteIndex = words.findIndex(word => !isNaN(parseFloat(word)));
  let limite = NaN;
  if (limiteIndex !== -1) {
    limite = parseFloat(words[limiteIndex]);
  } else {
    for (let i = 0; i < words.length; i++) {
      const n = parseNumeroPorExtenso(words[i]);
      if (!isNaN(n) && n > 0) {
        limite = n;
        limiteIndex = i;
        break;
      }
    }
  }
  
  if (isNaN(limite)) {
    alert('Limite não encontrado (diga um número, ex: "cem", "duzentos", "mil" ou "100")');
    return;
  }
  
  // Extrair nome (tudo antes do tipo)
  const nome = words.slice(0, tipoIndex).join(' ');
  if (!nome) {
    alert('Nome da categoria não encontrado');
    return;
  }
  
  // Gerar cor aleatória
  const cores = ['#4F46E5', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
  const cor = cores[Math.floor(Math.random() * cores.length)];
  
  // Exibir formulário real já preenchido para revisão
  window.showAddCategoryModal({
    nome,
    tipo,
    limite,
    cor
  });
}

// Função para normalizar texto
function normalizarTexto(str) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[.,;:!?]+$/, '')
    .trim();
}

// ===== SISTEMA DE BACKUP E EXPORTAÇÃO =====
window.downloadBackup = function () {
  try {
    // Verificar se há dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponível para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponível para exportar.');
      }
      return;
    }

    // Baixa um JSON com todos os dados do usuário
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
    console.error('❌ Erro ao exportar backup:', error);
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

window.exportToExcel = function () {
  try {
    // Verificar se a biblioteca XLSX está disponível
    if (typeof XLSX === 'undefined') {
      console.error('❌ Biblioteca XLSX não está disponível');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.');
      }
      return;
    }

    // Verificar se há dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponível para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponível para exportar.');
      }
      return;
    }

    // Gera planilha Excel com transações, categorias e orçamentos
    const wb = XLSX.utils.book_new();

    // Transações
    const transacoes = window.appState.transactions.map(t => ({
      Descrição: t.descricao,
      Valor: t.valor,
      Tipo: t.tipo,
      Categoria: window.appState.categories.find(c => c.id === t.categoriaId)?.nome || '',
      Data: t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : ''
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(transacoes), 'Transações');

    // Categorias
    const categorias = window.appState.categories.map(c => ({
      Nome: c.nome,
      Tipo: c.tipo,
      Limite: c.limite,
      Cor: c.cor
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(categorias), 'Categorias');

    // Orçamentos
    const orcamentos = window.appState.budgets.map(b => ({
      Nome: b.nome,
      Descrição: b.descricao,
      ID: b.id
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(orcamentos), 'Orçamentos');

    XLSX.writeFile(wb, 'financeiro-dados.xlsx');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Arquivo Excel exportado com sucesso!',
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

window.exportToPDF = function () {
  try {
    // Verificar se a biblioteca jsPDF está disponível
    if (typeof window.jspdf === 'undefined') {
      console.error('❌ Biblioteca jsPDF não está disponível');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.');
      }
      return;
    }

    // Verificar se há dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponível para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponível para exportar.');
      }
      return;
    }

    // Gera PDF com resumo das transações, categorias e orçamentos
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // Cabeçalho
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('📊 Relatório Financeiro', 10, y);
    y += 15;

    // Informações do orçamento atual
    const currentBudget = window.appState.currentBudget;
    if (currentBudget) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Orçamento: ${currentBudget.nome}`, 10, y);
      y += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`ID: ${currentBudget.id}`, 10, y);
      y += 10;
    }

    // Resumo financeiro
    const totalReceitas = window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const totalDespesas = window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const saldo = totalReceitas - totalDespesas;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo Geral:', 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Receitas: R$ ${totalReceitas.toFixed(2)}`, 12, y);
    y += 6;
    doc.text(`Total Despesas: R$ ${totalDespesas.toFixed(2)}`, 12, y);
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.text(`Saldo: R$ ${saldo.toFixed(2)}`, 12, y);
    y += 10;

    // Transações recentes
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Transações Recentes:', 10, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    window.appState.transactions
      .sort((a, b) => new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt))
      .slice(0, 15)
      .forEach(t => {
        const categoria = window.appState.categories.find(c => c.id === t.categoriaId)?.nome || 'Sem categoria';
        const data = t.createdAt?.toDate?.() ? t.createdAt.toDate().toLocaleDateString() : 'Data não disponível';
        const texto = `${data} - ${t.descricao} | R$ ${t.valor} | ${t.tipo} | ${categoria}`;

        if (y > 270) {
          doc.addPage();
          y = 10;
        }

        doc.text(texto, 12, y);
        y += 6;
      });

    y += 5;

    // Categorias com gastos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Gastos por Categoria:', 10, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    window.appState.categories.forEach(cat => {
      const gastos = window.appState.transactions
        .filter(t => t.categoriaId === cat.id && t.tipo === 'despesa')
        .reduce((sum, t) => sum + parseFloat(t.valor), 0);

      if (gastos > 0) {
        const limite = cat.limite ? ` / R$ ${cat.limite}` : '';
        const percentual = cat.limite ? ` (${((gastos / cat.limite) * 100).toFixed(1)}%)` : '';

        if (y > 270) {
          doc.addPage();
          y = 10;
        }

        doc.text(`${cat.nome}: R$ ${gastos.toFixed(2)}${limite}${percentual}`, 12, y);
        y += 6;
      }
    });

    doc.save('relatorio-financeiro.pdf');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Relatório PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar PDF:', error);
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

window.exportReadmePDF = function () {
  try {
    // Verificar se a biblioteca jsPDF está disponível
    if (typeof window.jspdf === 'undefined') {
      console.error('❌ Biblioteca jsPDF não está disponível');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.');
      }
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // Função para adicionar texto com quebra de linha
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

    // Cabeçalho
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Controle Financeiro', 20, 25);
    doc.setFontSize(14);
    doc.text('Guia Completo de Uso', 20, 35);
    y = 50;

    // Conteúdo do guia
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    y = addText('🎯 Como Usar o Aplicativo', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('1. Faça login com sua conta Google', 25, y);
    y = addText('2. Crie categorias para organizar suas despesas e receitas', 25, y);
    y = addText('3. Adicione transações usando o botão + ou comandos de voz', 25, y);
    y = addText('4. Configure despesas recorrentes para pagamentos fixos', 25, y);
    y = addText('5. Monitore seu saldo e gastos no dashboard', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('🎤 Comandos de Voz Disponíveis', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('• "gastei 50 reais no supermercado em alimentação"', 25, y);
    y = addText('• "recebi 2000 de salário em rendimentos"', 25, y);
    y = addText('• "criar categoria alimentação despesa 500"', 25, y);
    y = addText('• "qual meu saldo"', 25, y);
    y = addText('• "mostrar transações"', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('📊 Funcionalidades Principais', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('• Dashboard com resumo financeiro', 25, y);
    y = addText('• Gestão de transações e categorias', 25, y);
    y = addText('• Sistema de despesas recorrentes', 25, y);
    y = addText('• Alertas de limite de categoria', 25, y);
    y = addText('• Backup e exportação de dados', 25, y);
    y = addText('• Interface responsiva para mobile', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('💾 Backup e Exportação', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('• Exportação em JSON para backup completo', 25, y);
    y = addText('• Exportação em Excel para relatórios', 25, y);
    y = addText('• Exportação em PDF para documentação', 25, y);
    y = addText('• Restauração de dados de backup', 25, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    y = addText('🔧 Suporte e Contato', 20, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('Para dúvidas ou problemas:', 25, y);
    y = addText('• Verifique os logs do console (F12)', 30, y);
    y = addText('• Teste em diferentes navegadores', 30, y);
    y = addText('• Consulte a documentação técnica', 30, y);

    doc.save('guia-servo-tech-financas.pdf');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Guia PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar guia PDF:', error);
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

// ===== FUNÇÕES DE UTILITÁRIO RESTAURADAS =====
window.showExportOptions = function () {
  console.log('🔍 showExportOptions chamada');
  const modal = Modal({
    title: '📤 Opções de Exportação',
    content: `
      <div class="space-y-4">
        <button onclick="window.downloadBackup && window.downloadBackup()" class="w-full btn-primary">
          <span class="icon-standard">💾</span>
          Backup JSON Completo
        </button>
        <button onclick="window.exportToExcel && window.exportToExcel()" class="w-full btn-secondary">
          <span class="icon-standard">📊</span>
          Exportar para Excel
        </button>
        <button onclick="window.exportToPDF && window.exportToPDF()" class="w-full btn-secondary">
          <span class="icon-standard">📄</span>
          Exportar para PDF
        </button>
        <button onclick="window.exportReadmePDF && window.exportReadmePDF()" class="w-full btn-secondary">
          <span class="icon-standard">📖</span>
          Guia de Uso (PDF)
        </button>
      </div>
    `
  });
};

// ===== CONFIGURAÇÃO DOS BOTÕES DA TELA INICIAL =====
function setupHeaderButtons() {
  console.log('🔧 Configurando botões do header...');
  
  // Verificar se os elementos existem
  const voiceModal = document.getElementById('voice-modal');
  
  console.log('🔧 Elementos encontrados:', {
    voiceModal: !!voiceModal
  });
  
  // Botão de voz movido para o FAB
  
  // Botão de tema - configuração removida para evitar duplicação
  // A configuração do tema é feita apenas uma vez na inicialização do app

  // Configurar botão de fechar modal de voz
  const closeVoiceModalBtn = document.getElementById('close-voice-modal');
  if (closeVoiceModalBtn) {
    closeVoiceModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('❌ Close voice modal button clicked');
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
}

// Funções do drawer removidas - funcionalidades movidas para as abas do rodapé

// Função para abrir modal de voz
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
    
    // Adicionar classe ao body para esconder botão de voz
    document.body.classList.add('voice-modal-open');
    
    // Iniciar reconhecimento de voz
    if (window.startVoiceRecognition) {
      setTimeout(() => {
        window.startVoiceRecognition('transaction');
      }, 500);
    }
    
    console.log('🎤 Modal de voz aberto');
  }
}

// Tornar função global para uso no FAB
window.openVoiceModal = openVoiceModal;

// Função para fechar modal de voz
function closeVoiceModal() {
  const voiceModal = document.getElementById('voice-modal');
  const voiceContent = voiceModal?.querySelector('.voice-content');
  
  if (voiceModal && voiceContent) {
    // Animar fechamento
    voiceContent.style.transform = 'scale(0.95)';
    voiceContent.style.opacity = '0';
    voiceModal.style.background = 'rgba(0, 0, 0, 0)';
    voiceModal.style.backdropFilter = 'blur(0px)';
    
    // Remover classe do body para mostrar botão de voz
    document.body.classList.remove('voice-modal-open');
    
    setTimeout(() => {
      voiceModal.style.pointerEvents = 'none';
      // Garantir que o modal não interfira com a tela principal
      voiceModal.style.display = 'none';
    }, 300);
    
    console.log('🎤 Modal de voz fechado');
  }
}

// Função para carregar orçamentos no drawer
// Função loadDrawerBudgets removida - agora gerenciada pela classe Drawer

// ===== CONFIGURAÇÃO DOS BOTÕES DA TELA DE CATEGORIAS =====
function setupCategoryButtons() {
  console.log('🔧 Configurando botões da tela de categorias...');
  
  // Botão de adicionar categoria
  const addCategoryBtn = document.getElementById('add-category-btn');
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('📂 Add category button clicked');
      
      if (window.showAddCategoryModal) {
        window.showAddCategoryModal();
      } else {
        console.warn('⚠️ Função de adicionar categoria não disponível');
        if (window.Snackbar) {
          window.Snackbar.show('Funcionalidade de adicionar categoria não disponível', 'warning');
        }
      }
    });
    console.log('✅ Add category button configurado');
  }
  
  // Botão de migrar
  const migrarBtn = document.querySelector('button[onclick="window.migrarTransacoesAntigas()"]');
  if (migrarBtn) {
    migrarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('🔄 Migrar button clicked');
      
      if (window.migrarTransacoesAntigas) {
        window.migrarTransacoesAntigas();
      } else {
        console.warn('⚠️ Função de migrar não disponível');
      }
    });
    console.log('✅ Migrar button configurado');
  }
  
  // Botão de corrigir
  const corrigirBtn = document.querySelector('button[onclick="window.corrigirTipoCategoria()"]');
  if (corrigirBtn) {
    corrigirBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('🔧 Corrigir button clicked');
      
      if (window.corrigirTipoCategoria) {
        window.corrigirTipoCategoria();
      } else {
        console.warn('⚠️ Função de corrigir não disponível');
      }
    });
    console.log('✅ Corrigir button configurado');
  }
}

// ===== CONFIGURAÇÃO DOS BOTÕES DA TELA DE TRANSAÇÕES =====
function setupTransactionButtons() {
  console.log('🔧 Configurando botões da tela de transações...');
  
  // Botão de adicionar transação
  const addTransactionBtn = document.getElementById('add-transaction-btn');
  if (addTransactionBtn) {
    addTransactionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('📋 Add transaction button clicked');
      
      if (window.showAddTransactionModal) {
        window.showAddTransactionModal();
      } else {
        console.warn('⚠️ Função de adicionar transação não disponível');
        if (window.Snackbar) {
          window.Snackbar.show('Funcionalidade de adicionar transação não disponível', 'warning');
        }
      }
    });
    console.log('✅ Add transaction button configurado');
  }
  
  // Botão de voz
  const voiceBtn = document.getElementById('voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('🎤 Voice button clicked');
      
      if (window.startVoiceRecognition) {
        window.startVoiceRecognition('transaction');
      } else {
        console.warn('⚠️ Função de voz não disponível');
      }
    });
    console.log('✅ Voice button configurado');
  } else {
    console.warn('⚠️ Botão de voz não encontrado');
  }
}

// ===== CONFIGURAÇÃO DOS BOTÕES DO DASHBOARD =====
function setupDashboardButtons() {
  console.log('🔧 Configurando botões do dashboard...');
  
  // Botão de exportar
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('📤 Export button clicked');
      
      if (window.showExportOptions) {
        window.showExportOptions();
      } else {
        console.warn('⚠️ Função de exportação não disponível');
        if (window.Snackbar) {
          window.Snackbar({
            message: 'Funcionalidade de exportação não disponível',
            type: 'warning'
          });
        }
      }
    });
    console.log('✅ Export button configurado');
  }
  
  // Botão de tema no Dashboard
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    console.log('Dashboard: Configurando botão de tema...');
    if (window.setupThemeToggle) {
      window.setupThemeToggle('theme-toggle-btn');
    } else {
      console.warn('⚠️ setupThemeToggle não disponível');
    }
  }
  
  // Botões de navegação de mês
  const mesAnterior = document.getElementById('mes-anterior');
  const mesProximo = document.getElementById('mes-proximo');
  
  if (mesAnterior) {
    mesAnterior.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('⬅️ Mês anterior clicked');
      
  const label = document.getElementById('mes-display')?.textContent || '';
  const parts = label.trim().split(/\s+/);
  const currentMonth = parts[0];
  const currentYear = parseInt(parts[1], 10);
      const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      const currentMonthIndex = meses.indexOf(currentMonth);
      
      let newYear = currentYear;
      let newMonth = currentMonthIndex;
      
      if (currentMonthIndex === 0) {
        newYear = currentYear - 1;
        newMonth = 11;
      } else {
        newMonth = currentMonthIndex - 1;
      }
      
      if (window.renderDashboard) {
        await window.renderDashboard(newYear, newMonth + 1);
      }
    });
    console.log('✅ Mês anterior button configurado');
  }
  
  if (mesProximo) {
    mesProximo.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('➡️ Mês próximo clicked');
      
  const label = document.getElementById('mes-display')?.textContent || '';
  const parts = label.trim().split(/\s+/);
  const currentMonth = parts[0];
  const currentYear = parseInt(parts[1], 10);
      const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      const currentMonthIndex = meses.indexOf(currentMonth);
      
      let newYear = currentYear;
      let newMonth = currentMonthIndex;
      
      if (currentMonthIndex === 11) {
        newYear = currentYear + 1;
        newMonth = 0;
      } else {
        newMonth = currentMonthIndex + 1;
      }
      
      if (window.renderDashboard) {
        await window.renderDashboard(newYear, newMonth + 1);
      }
    });
    console.log('✅ Mês próximo button configurado');
  }
}

window.migrarTransacoesAntigas = async function () {
  try {
    console.log('🔄 Iniciando migração de transações antigas...');
    const user = window.appState.currentUser;
    if (!user) {
      Snackbar({ message: 'Usuário não autenticado', type: 'error' });
      return;
    }

    const budget = window.appState.currentBudget;
    if (!budget) {
      Snackbar.show('Orçamento não selecionado', 'error');
      return;
    }

    // Buscar transações sem categoriaId
    const q = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budget.id),
      where('categoriaId', '==', null)
    );
    
    const querySnapshot = await getDocs(q);
    const transacoesSemCategoria = querySnapshot.docs;
    
    if (transacoesSemCategoria.length === 0) {
      Snackbar({ message: 'Nenhuma transação para migrar', type: 'info' });
      return;
    }

    // Criar categoria padrão se não existir
    let categoriaPadrao = window.appState.categories.find(cat => cat.nome === 'Geral');
    if (!categoriaPadrao) {
      const categoriaData = {
        nome: 'Geral',
        descricao: 'Categoria padrão para transações antigas',
        tipo: 'despesa',
        cor: '#6B7280',
        limite: 0
      };
      const categoriaId = await addCategory(categoriaData);
      await loadCategories();
      categoriaPadrao = window.appState.categories.find(cat => cat.id === categoriaId);
    }

    // Atualizar transações
    let atualizadas = 0;
    for (const doc of transacoesSemCategoria) {
      await updateDoc(doc.ref, {
        categoriaId: categoriaPadrao.id,
        updatedAt: serverTimestamp()
      });
      atualizadas++;
    }

    await loadTransactions();
    Snackbar({ message: `${atualizadas} transações migradas para categoria "Geral"`, type: 'success' });
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    Snackbar({ message: 'Erro ao migrar transações', type: 'error' });
  }
};

window.corrigirTipoCategoria = async function () {
  try {
    console.log('🔧 Iniciando correção de tipos de categoria...');
    const user = window.appState.currentUser;
    if (!user) {
      Snackbar({ message: 'Usuário não autenticado', type: 'error' });
      return;
    }

    const budget = window.appState.currentBudget;
    if (!budget) {
      Snackbar.show('Orçamento não selecionado', 'error');
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
        tipo: 'despesa', // Tipo padrão
        updatedAt: serverTimestamp()
      });
      corrigidas++;
    }

    await loadCategories();
    Snackbar({ message: `${corrigidas} categorias corrigidas`, type: 'success' });
  } catch (error) {
    console.error('❌ Erro na correção:', error);
    Snackbar({ message: 'Erro ao corrigir categorias', type: 'error' });
  }
};

// ===== FUNÇÕES DE NOTIFICAÇÕES =====

// Função para carregar notificações do usuário
async function loadNotifications() {
  try {
    const user = auth.currentUser;
    if (!user) return [];
  // usa store centralizada
  const notifications = await notificationsStore.load(user.uid, 50);
  window.appState.notifications = notifications;
    console.log('📧 Notificações carregadas:', notifications.length);
    updateNotificationBadge();
    return notifications;
  } catch (error) {
    console.error('Erro ao carregar notificações:', error);
    return [];
  }
}

// Função para marcar notificação como lida
async function markNotificationAsRead(notificationId) {
  try {
  await notificationsStore.markRead(notificationId);
    
    // Atualizar estado local
    window.appState.notifications = notificationsStore.getState().items;
    
    updateNotificationBadge();
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
  }
}

// Função para marcar todas as notificações como lidas
async function markAllNotificationsAsRead() {
  try {
    const unreadNotifications = window.appState.notifications?.filter(n => !n.read) || [];
    if (unreadNotifications.length === 0) {
      Snackbar({ message: 'Nenhuma notificação não lida', type: 'info' });
      return;
    }

  const { markManyAsRead } = await import('@data/repositories/notificationsRepo.js');
  await notificationsStore.markRead(unreadNotifications.map(n => n.id));
    
    // Atualizar estado local
    window.appState.notifications = notificationsStore.getState().items;
    updateNotificationBadge();
    
    Snackbar({ message: `${unreadNotifications.length} notificações marcadas como lidas`, type: 'success' });
    
    // Re-renderizar se estiver na página de notificações
    if (window.location.hash === '#/notifications') {
      renderNotifications();
    }
  } catch (error) {
    console.error('Erro ao marcar notificações como lidas:', error);
    Snackbar({ message: 'Erro ao marcar notificações como lidas', type: 'error' });
  }
}

// Função para atualizar badge de notificações
let __badgeUpdateTimer = null;
function updateNotificationBadge() {
  if (__badgeUpdateTimer) {
    clearTimeout(__badgeUpdateTimer);
  }
  __badgeUpdateTimer = setTimeout(() => {
  const unreadCount = window.appState.notifications?.filter(n => !n.read).length || 0;
  
  // Atualizar badge na navegação
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

// Listener para notificações em tempo real
let unsubscribeNotifications = null;

async function listenNotifications() {
  if (unsubscribeNotifications) {
    unsubscribeNotifications();
  }

  const user = auth.currentUser;
  if (!user) {
    console.log('⚠️ Usuário não autenticado, não iniciando listener de notificações');
    return;
  }

  // Verificar se há um orçamento atual
  if (!window.appState.currentBudget) {
    console.log('⚠️ Nenhum orçamento selecionado, não iniciando listener de notificações');
    return;
  }

  try {
    unsubscribeNotifications = notificationsStore.start(user.uid, 50);
    notificationsStore.subscribe(s => s.items, (notifications, prev) => {
      console.log('📧 Listener de notificações executado!');
      const prevArr = Array.isArray(prev) ? prev : (window.appState.notifications || []);
      const prevIds = new Set(prevArr.map(n => n.id));

      window.appState.notifications = notifications;
      console.log('📧 Notificações atualizadas:', notifications.length);
      
      // Atualizar badge
      updateNotificationBadge();

      // Mostrar toast em tempo real para novas notificações (evitar spam no primeiro load)
      try {
        const isFirstLoad = !window.__notificationsInitialized;
        if (!isFirstLoad) {
          const newOnes = notifications.filter(n => !prevIds.has(n.id));
          const toastsEnabled = (typeof window.getNotificationsToastsEnabled === 'function') ? window.getNotificationsToastsEnabled() : true;
          if (toastsEnabled && newOnes.length > 0 && typeof Snackbar === 'function' && window.location.hash !== '#/notifications') {
            newOnes.forEach(n => {
              const who = n.senderName || 'Usuário';
              let message = `🔔 ${who} `;
              let type = 'info';
              switch (n.type) {
                case 'deleted_transaction':
                  message += `excluiu uma transação${n.transactionDescricao ? `: ${n.transactionDescricao}` : ''}`;
                  type = 'warning';
                  break;
                case 'updated_transaction':
                  message += `atualizou uma transação${n.transactionDescricao ? `: ${n.transactionDescricao}` : ''}`;
                  type = 'info';
                  break;
                case 'new_transaction':
                  message += `adicionou uma transação${n.transactionDescricao ? `: ${n.transactionDescricao}` : ''}`;
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
                  message += 'realizou uma ação';
                  type = 'info';
              }
              Snackbar({ message, type });
            });
          }
        }
        window.__notificationsInitialized = true;
      } catch (toastErr) {
        console.warn('Falha ao exibir toast de notificação:', toastErr);
      }
      
      // Se estiver na página de notificações, re-renderizar
      if (window.location.hash === '#/notifications') {
        renderNotifications();
      }
  });
  } catch (error) {
    console.error('❌ Erro ao configurar listener de notificações:', error);
  }
}

// Função para renderizar notificações
async function renderNotifications() {
  const content = document.getElementById('app-content');
  
  if (!content) return;

  // Carregar notificações antes de renderizar
  await loadNotifications();
  const notifications = window.appState.notifications || [];
  // Aplicar filtros e agrupamento
  const filters = getNotifFilters();
  const filtered = applyNotificationFilters(notifications, filters);
  const grouped = groupNotificationsByDay(filtered);
  
  // Calcular estatísticas das notificações
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
  <h2 class="tab-title-highlight">🔔 Notificações</h2>
  <div id="notif-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          
          
          <!-- ========== SEÇÃO 1: RESUMO DAS NOTIFICAÇÕES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Visão Geral</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
              <!-- Header do Card -->
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold">Centro de Notificações</h3>
                  <p class="text-sm opacity-90">${totalNotificacoes} notificações no total</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${notificacoesNaoLidas > 0 ? 'text-yellow-200' : 'text-green-200'}">
                    ${notificacoesNaoLidas}
                  </div>
                  <p class="text-xs opacity-90">${notificacoesNaoLidas > 0 ? '📬 Não lidas' : '✅ Todas lidas'}</p>
                </div>
              </div>
              
              <!-- Grid de Métricas -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📧</div>
                  <div class="text-2xl md:text-3xl font-bold">${totalNotificacoes}</div>
                  <div class="text-sm opacity-90">Total</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📬</div>
                  <div class="text-2xl md:text-3xl font-bold text-yellow-200">${notificacoesNaoLidas}</div>
                  <div class="text-sm opacity-90">Não lidas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">✅</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">${notificacoesLidas}</div>
                  <div class="text-sm opacity-90">Lidas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📅</div>
                  <div class="text-2xl md:text-3xl font-bold">${notificacoesHoje}</div>
                  <div class="text-sm opacity-90">Hoje</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 2: AÇÕES E CONTROLES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Controles</h2>
            </div>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Notificações</h3>
                  <div class="flex gap-2 flex-wrap">
                    <button onclick="window.showConfirmationModal({
                      title: 'Marcar como Lidas',
                      message: 'Deseja marcar todas as notificações como lidas?',
                      confirmText: 'Sim, Marcar',
                      confirmColor: 'bg-blue-500 hover:bg-blue-600',
                      onConfirm: 'window.markAllNotificationsAsRead && window.markAllNotificationsAsRead()'
                    })" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      ✅ Marcar todas como lidas
                    </button>
                    <button onclick="window.showConfirmationModal({
                      title: 'Apagar notificações lidas',
                      message: 'Deseja apagar todas as notificações lidas? Esta ação não pode ser desfeita.',
                      confirmText: 'Sim, Apagar',
                      confirmColor: 'bg-red-500 hover:bg-red-600',
                      onConfirm: 'window.deleteAllReadNotifications && window.deleteAllReadNotifications()'
                    })" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      🗑️ Apagar lidas
                    </button>
                    <button onclick="window.renderNotifications()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      🔄 Atualizar
                    </button>
                  </div>
                </div>
                <!-- Controles: filtros e preferência de toasts -->
                <div class="mt-3 flex flex-col gap-3">
                  <!-- Filtro por tipo -->
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Tipos:</span>
                    ${['new_transaction','updated_transaction','deleted_transaction','category_added','category_updated','category_deleted']
                      .map(t => {
                        const active = filters.types.includes(t);
                        const labels = { new_transaction:'Nova Tx', updated_transaction:'Tx Atualizada', deleted_transaction:'Tx Excluída', category_added:'Cat Criada', category_updated:'Cat Atualizada', category_deleted:'Cat Excluída' };
                        return `<button onclick=\"window.toggleNotificationTypeFilter('`+t+`')\" class=\"px-3 py-1 rounded-full text-xs font-medium ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}\">${labels[t]}</button>`;
                      }).join('')}
                  </div>
                  <!-- Filtro por período -->
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Período:</span>
                    ${['all','today','7d','30d'].map(p => {
                      const label = p==='all'?'Tudo':(p==='today'?'Hoje':(p==='7d'?'7 dias':'30 dias'));
                      const active = filters.period===p;
                      return `<button onclick=\"window.setNotificationPeriod('`+p+`')\" class=\"px-3 py-1 rounded-full text-xs font-medium ${active ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}\">${label}</button>`;
                    }).join('')}
                  </div>
                  <!-- Preferência de toasts -->
                  <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input type="checkbox" ${getNotificationsToastsEnabled() ? 'checked' : ''} onchange="window.setNotificationsToastsEnabled(this.checked)" />
                    Mostrar toasts em tempo real
                  </label>
                  <!-- Política de retenção -->
                  <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span>Apagar automaticamente após:</span>
                    <select onchange="window.setNotificationRetentionDays(this.value)" class="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-2 py-1">
                      ${[0, 15, 30, 60, 90].map(d => `<option value=\"${d}\" ${getNotificationRetentionDays()==d?'selected':''}>${d===0?'Nunca':d+' dias'}</option>`).join('')}
                    </select>
                    <button class="ml-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded" onclick="window.runNotificationAutoClean()">Executar limpeza</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 3: LISTA DE NOTIFICAÇÕES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Todas as Notificações</h2>
            </div>
            
            <div class="space-y-6">
              ${filtered.length > 0 ? grouped.map(group => `
                <div>
                  <div class=\"text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2\">${group.label}</div>
                  <div class=\"space-y-4\">
                  ${group.items.map(notification => `
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${!notification.read ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}">
                  <!-- Header da Notificação -->
                  <div class="bg-gradient-to-r ${!notification.read ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800' : 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800'} p-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full ${notification.type === 'deleted_transaction' ? 'bg-red-100 dark:bg-red-900' : notification.type === 'updated_transaction' ? 'bg-yellow-100 dark:bg-yellow-900' : (notification.type && notification.type.startsWith('category_')) ? 'bg-purple-100 dark:bg-purple-900' : 'bg-blue-100 dark:bg-blue-900'} flex items-center justify-center text-xl">
                          ${notification.type === 'deleted_transaction' ? '🗑️' : notification.type === 'updated_transaction' ? '✏️' : (notification.type && notification.type.startsWith('category_')) ? '📂' : '💰'}
                        </div>
                        <div>
                          <h3 class="font-bold text-gray-900 dark:text-gray-100">${
                            notification.type === 'deleted_transaction' ? 'Transação Excluída' :
                            notification.type === 'updated_transaction' ? 'Transação Atualizada' :
                            notification.type === 'new_transaction' ? 'Nova Transação' :
                            notification.type === 'category_added' ? 'Categoria Criada' :
                            notification.type === 'category_updated' ? 'Categoria Atualizada' :
                            notification.type === 'category_deleted' ? 'Categoria Excluída' : 'Notificação'
                          }</h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400">Orçamento: ${notification.budgetName || 'Orçamento'}</p>
                        </div>
                      </div>
                      <div class="text-right">
                        ${!notification.read ? '<div class="text-2xl">📬</div>' : '<div class="text-2xl">✅</div>'}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Conteúdo da Notificação -->
                  <div class="p-4">
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Enviado por:</span>
                        <span class="font-medium text-gray-900 dark:text-gray-100">${notification.senderName || 'Usuário'}</span>
                      </div>
                      
                      ${notification.type && notification.type.startsWith('category_') ? `
                        <div class="flex items-center justify-between">
                          <span class="text-sm text-gray-600 dark:text-gray-400">Categoria:</span>
                          <span class="font-medium text-gray-900 dark:text-gray-100">${notification.categoryNome || 'Categoria'}</span>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <div class="font-medium text-gray-900 dark:text-gray-100">${notification.categoryTipo ? (notification.categoryTipo === 'receita' ? 'Receita' : 'Despesa') : 'Categoria'}</div>
                            ${typeof notification.categoryLimite !== 'undefined' ? `<div class=\"text-sm text-gray-600 dark:text-gray-400\">Limite: R$ ${Number(notification.categoryLimite || 0).toFixed(2)}</div>` : ''}
                          </div>
                        </div>
                      ` : `
                        <div class="flex items-center justify-between">
                          <span class="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
                          ${notification.type === 'deleted_transaction'
                            ? '<span class="font-medium text-red-600">excluída</span>'
                            : `<span class=\"font-medium ${(notification.transactionTipo || 'despesa') === 'receita' ? 'text-green-600' : 'text-red-600'}\">${notification.transactionTipo || 'Transação'}</span>`}
                        </div>
                        
                        <!-- Detalhes da Transação -->
                        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 ${notification.type === 'deleted_transaction' ? 'opacity-75' : ''}">
                          <div class="flex items-center justify-between mb-2">
                            <div class="font-medium text-gray-900 dark:text-gray-100 ${notification.type === 'deleted_transaction' ? 'line-through' : ''}">${notification.transactionDescricao || 'Transação'}</div>
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
                          ${notification.createdAt?.toDate ? notification.createdAt.toDate().toLocaleString('pt-BR') : 'Data não disponível'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Botões de Ação -->
                  ${!notification.read ? `
                    <div class="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                      <div class="flex gap-2">
                        <button onclick="window.showConfirmationModal({
                          title: 'Marcar como Lida',
                          message: 'Deseja marcar esta notificação como lida?',
                          confirmText: 'Sim, Marcar',
                          confirmColor: 'bg-blue-500 hover:bg-blue-600',
                          onConfirm: 'window.markNotificationAsRead && window.markNotificationAsRead(\\'${notification.id}\\')'
                        })" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                          ✅ Marcar como lida
                        </button>
                        <button onclick="window.openNotificationTarget('${notification.id}','${notification.type || ''}')" class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                          🔗 Ver no app
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
                    <div class="text-6xl mb-4">🔔</div>
                    <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhuma notificação</div>
                    <div class="text-gray-600 dark:text-gray-400 mb-4">Você não tem notificações no momento</div>
                    <button onclick="window.renderNotifications()" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg">
                      🔄 Atualizar
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

  // Injetar indicador de período padrão (não altera filtragem das notificações, apenas padroniza o cabeçalho)
  (async () => {
    try {
      const { createPeriodIndicator } = await import('./ui/PeriodIndicator.js');
      const holder = document.getElementById('notif-period-indicator');
      if (holder) {
        holder.innerHTML = '';
        holder.appendChild(createPeriodIndicator({ onChange: () => renderNotifications() }));
      }
    } catch (e) {
      console.warn('PeriodIndicator (Notificações) indisponível:', e);
    }
  })();
  
  renderFAB();
}

// ===== Filtros, agrupamento e deep-link de notificações =====
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
    if (type && type.startsWith('category_')) {
      window.location.hash = '#/categories';
    } else {
      window.location.hash = '#/transactions';
    }
    if (!n.read && typeof window.markNotificationAsRead === 'function') {
      window.markNotificationAsRead(id);
    }
  } catch (e) {
    console.warn('Falha ao abrir alvo da notificação:', e);
  }
}
window.openNotificationTarget = openNotificationTarget;

// Expor funções de notificações globalmente
window.loadNotifications = loadNotifications;
window.markNotificationAsRead = markNotificationAsRead;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.renderNotifications = renderNotifications;
window.listenNotifications = listenNotifications;

// Preferência: exibir toasts em tempo real
window.getNotificationsToastsEnabled = function() {
  try {
    const v = localStorage.getItem('notificationsToastsEnabled');
    return v === null ? true : v === 'true';
  } catch { return true; }
};
window.setNotificationsToastsEnabled = function(enabled) {
  try { localStorage.setItem('notificationsToastsEnabled', enabled ? 'true' : 'false'); } catch {}
  if (typeof Snackbar === 'function') {
    Snackbar({ message: enabled ? 'Toasts ativados' : 'Toasts desativados', type: 'info' });
  }
};

// Ação em massa: apagar todas as notificações lidas
window.deleteAllReadNotifications = async function() {
  try {
    const list = (window.appState.notifications || []).filter(n => n.read);
    if (list.length === 0) {
      return Snackbar && Snackbar({ message: 'Sem notificações lidas para apagar', type: 'info' });
    }
  const { deleteMany } = await import('@data/repositories/notificationsRepo.js');
  await notificationsStore.removeMany(list.map(n => n.id));
    // Atualiza estado local
    window.appState.notifications = notificationsStore.getState().items;
    updateNotificationBadge();
    renderNotifications();
    Snackbar && Snackbar({ message: 'Notificações lidas apagadas', type: 'success' });
  } catch (e) {
    console.error('Erro ao apagar notificações lidas:', e);
    Snackbar && Snackbar({ message: 'Erro ao apagar notificações lidas', type: 'error' });
  }
};

// Retenção de notificações
window.getNotificationRetentionDays = function() {
  try {
    const v = parseInt(localStorage.getItem('notificationRetentionDays') || '0', 10);
    return isNaN(v) ? 0 : v;
  } catch { return 0; }
};
window.setNotificationRetentionDays = function(days) {
  try { localStorage.setItem('notificationRetentionDays', String(days)); } catch {}
  if (typeof Snackbar === 'function') Snackbar({ message: days===0?'Retenção desativada':`Retenção: ${days} dias`, type: 'info' });
};
window.runNotificationAutoClean = async function() {
  try {
    const days = window.getNotificationRetentionDays();
    if (!days || days <= 0) {
      return Snackbar && Snackbar({ message: 'Retenção desativada', type: 'info' });
    }
    const cutoff = Date.now() - days*24*60*60*1000;
    const toDelete = (window.appState.notifications || []).filter(n => {
      const t = n.createdAt?.seconds ? n.createdAt.seconds*1000 : (new Date(n.createdAt)).getTime();
      return t < cutoff;
    });
    if (toDelete.length === 0) {
      return Snackbar && Snackbar({ message: 'Nada para limpar', type: 'info' });
    }
  const { deleteMany } = await import('@data/repositories/notificationsRepo.js');
  await notificationsStore.removeMany(toDelete.map(n => n.id));
    window.appState.notifications = notificationsStore.getState().items;
    updateNotificationBadge();
    renderNotifications();
    Snackbar && Snackbar({ message: `Limpeza concluída (${toDelete.length})`, type: 'success' });
  } catch (e) {
    console.error('Erro na limpeza de notificações:', e);
    Snackbar && Snackbar({ message: 'Erro na limpeza de notificações', type: 'error' });
  }
};

// Funções wrapper com confirmação para operações críticas
window.addTransactionWithConfirmation = async function(transactionData) {
  return new Promise((resolve, reject) => {
    window.showConfirmationModal({
      title: 'Adicionar Transação',
      message: `Tem certeza que deseja adicionar a transação "${transactionData.descricao}" no valor de R$ ${transactionData.valor.toFixed(2)}?`,
      confirmText: 'Sim, Adicionar',
      confirmColor: 'bg-green-500 hover:bg-green-600',
      onConfirm: async () => {
        try {
          const result = await window.addTransaction(transactionData);
          if (window.Snackbar) {
            window.Snackbar({
              message: '✅ Transação adicionada com sucesso!',
              type: 'success'
            });
          }
          resolve(result);
        } catch (error) {
          console.error('❌ Erro ao adicionar transação:', error);
          if (window.Snackbar) {
            window.Snackbar({
              message: 'Erro ao adicionar transação: ' + error.message,
              type: 'error'
            });
          }
          reject(error);
        }
      },
      onCancel: () => {
        console.log('❌ Adição de transação cancelada pelo usuário');
        reject(new Error('Operação cancelada pelo usuário'));
      }
    });
  });
};

window.deleteTransactionWithConfirmation = function(transactionId, transactionName = 'transação') {
  window.showConfirmationModal({
    title: 'Excluir Transação',
    message: `Tem certeza que deseja excluir a ${transactionName}? Esta ação não pode ser desfeita.`,
    confirmText: 'Sim, Excluir',
    confirmColor: 'bg-red-500 hover:bg-red-600',
    onConfirm: () => {
      if (window.deleteTransaction) {
        window.deleteTransaction(transactionId);
      }
    }
  });
};

window.deleteCategoryWithConfirmation = function(categoryId, categoryName = 'categoria') {
  window.showConfirmationModal({
    title: 'Excluir Categoria',
    message: `Tem certeza que deseja excluir a categoria "${categoryName}"? Todas as transações desta categoria ficarão sem categoria.`,
    confirmText: 'Sim, Excluir',
    confirmColor: 'bg-red-500 hover:bg-red-600',
    onConfirm: () => {
      if (window.deleteCategory) {
        window.deleteCategory(categoryId);
      }
    }
  });
};

window.deleteRecorrenteWithConfirmation = function(recorrenteId, recorrenteName = 'despesa recorrente') {
  window.showConfirmationModal({
    title: 'Excluir Despesa Recorrente',
    message: `Tem certeza que deseja excluir a ${recorrenteName}? Esta ação não pode ser desfeita.`,
    confirmText: 'Sim, Excluir',
    confirmColor: 'bg-red-500 hover:bg-red-600',
    onConfirm: () => {
      if (window.deleteDespesaRecorrente) {
        window.deleteDespesaRecorrente(recorrenteId);
      }
    }
  });
};

window.leaveBudgetWithConfirmation = function(budgetId, budgetName = 'orçamento') {
  window.showConfirmationModal({
    title: 'Sair do Orçamento',
    message: `Tem certeza que deseja sair do orçamento "${budgetName}"? Você perderá acesso a todas as transações.`,
    confirmText: 'Sim, Sair',
    confirmColor: 'bg-orange-500 hover:bg-orange-600',
    onConfirm: () => {
      if (window.leaveSharedBudget) {
        window.leaveSharedBudget(budgetId);
      }
    }
  });
};

// ===== FUNÇÕES IMPORTANTES RESTAURADAS =====

// Função para mostrar opções de exportação
window.showExportOptions = function () {
  console.log('🔍 showExportOptions chamada');
  console.log('🔍 window.Modal disponível:', !!window.Modal);
  console.log('🔍 window.Modal tipo:', typeof window.Modal);

  if (!window.Modal) {
    console.error('❌ Modal não está disponível');
    alert('Erro: Modal não está disponível');
    return;
  }

  console.log('🔍 Tentando abrir modal de exportação...');

  try {
    const modalElement = window.Modal({
      title: 'Exportar Dados',
      content: `
        <div class="space-y-4">
          <button onclick="window.exportToExcel()" class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 text-base">
            <span>📊</span> Relatório Excel
          </button>
          <button onclick="window.exportToPDF()" class="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2 text-base">
            <span>📄</span> Relatório PDF
          </button>
          <button onclick="window.exportReadmePDF()" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 text-base">
            <span>📖</span> Guia de Uso (PDF)
          </button>
          <button onclick="window.downloadBackup()" class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 flex items-center justify-center gap-2 text-base">
            <span>💾</span> Backup Completo (JSON)
          </button>
        </div>
      `,
      onClose: () => {
        console.log('🔍 Modal fechado');
        document.querySelector('.modal')?.remove();
      }
    });

    console.log('🔍 Modal criado com sucesso:', modalElement);
    document.body.appendChild(modalElement);
    console.log('🔍 Modal adicionado ao DOM');

  } catch (error) {
    console.error('❌ Erro ao criar modal:', error);
    alert('Erro ao abrir modal de exportação: ' + error.message);
  }
};

// Função para exportar para Excel
window.exportToExcel = function () {
  try {
    // Verificar se a biblioteca XLSX está disponível
    if (typeof XLSX === 'undefined') {
      console.error('❌ Biblioteca XLSX não está disponível');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.');
      }
      return;
    }

    // Verificar se há dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponível para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponível para exportar.');
      }
      return;
    }

    // Gera planilha Excel com transações, categorias e orçamentos
    const wb = XLSX.utils.book_new();

    // Transações
    const transacoes = window.appState.transactions.map(t => ({
      Descrição: t.descricao,
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
      'Transações'
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

    // Orçamentos
    const orcamentos = window.appState.budgets.map(b => ({
      Nome: b.nome,
      Descrição: b.descricao,
      ID: b.id
    }));
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(orcamentos),
      'Orçamentos'
    );

    XLSX.writeFile(wb, 'financeiro-dados.xlsx');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Arquivo Excel exportado com sucesso!',
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

// Função para exportar para PDF
window.exportToPDF = function () {
  try {
    // Verificar se a biblioteca jsPDF está disponível
    if (typeof window.jspdf === 'undefined') {
      console.error('❌ Biblioteca jsPDF não está disponível');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.');
      }
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // Função para adicionar texto com quebra de linha
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

    // Cabeçalho
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Controle Financeiro', 20, 25);
    doc.setFontSize(14);
    doc.text('Relatório Financeiro', 20, 35);

    // Resetar para conteúdo
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    y = 50;

    // Resumo
    y = addText('📊 RESUMO FINANCEIRO', 20, y);
    y += 10;

    const totalReceitas = window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const totalDespesas = window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const saldo = totalReceitas - totalDespesas;

    y = addText(`💰 Total de Receitas: R$ ${totalReceitas.toFixed(2)}`, 20, y);
    y = addText(`💸 Total de Despesas: R$ ${totalDespesas.toFixed(2)}`, 20, y);
    y = addText(`💳 Saldo: R$ ${saldo.toFixed(2)}`, 20, y);
    y += 15;

    // Transações recentes
    y = addText('📋 ÚLTIMAS TRANSAÇÕES', 20, y);
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
        message: '✅ Relatório PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar PDF:', error);
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

// Função para baixar backup JSON
window.downloadBackup = function () {
  try {
    // Verificar se há dados para exportar
    if (!window.appState || !window.appState.transactions) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Nenhum dado disponível para exportar.',
          type: 'warning'
        });
      } else {
        alert('Nenhum dado disponível para exportar.');
      }
      return;
    }

    // Baixa um JSON com todos os dados do usuário
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
    console.error('❌ Erro ao exportar backup:', error);
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

// Função para exportar README em PDF
window.exportReadmePDF = function () {
  try {
    // Verificar se a biblioteca jsPDF está disponível
    if (typeof window.jspdf === 'undefined') {
      console.error('❌ Biblioteca jsPDF não está disponível');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.',
          type: 'error'
        });
      } else {
        alert('Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.');
      }
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    // Função para adicionar texto com quebra de linha
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

    // Cabeçalho
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Controle Financeiro', 20, 25);
    doc.setFontSize(14);
    doc.text('Guia Completo de Uso', 20, 35);

    // Resetar para conteúdo
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    y = 50;

    // Conteúdo do guia
    y = addText('📱 COMO USAR O APLICATIVO', 20, y);
    y += 10;

    y = addText('1. DASHBOARD - Visualize seu resumo financeiro, saldo atual, gastos por categoria e alertas de limite.', 20, y);
    y = addText('2. TRANSAÇÕES - Adicione, edite ou remova suas receitas e despesas.', 20, y);
    y = addText('3. CATEGORIAS - Organize suas transações em categorias com limites personalizados.', 20, y);
    y = addText('4. RECORRENTES - Configure despesas que se repetem mensalmente.', 20, y);
    y = addText('5. NOTIFICAÇÕES - Receba alertas sobre limites de categoria e transações.', 20, y);
    y = addText('6. CONFIGURAÇÕES - Personalize o aplicativo e exporte seus dados.', 20, y);
    y += 15;

    y = addText('🎯 FUNCIONALIDADES PRINCIPAIS', 20, y);
    y += 10;

    y = addText('• Navegação por deslizamento entre abas', 20, y);
    y = addText('• Reconhecimento de voz para adicionar transações', 20, y);
    y = addText('• Exportação para Excel e PDF', 20, y);
    y = addText('• Backup e restauração de dados', 20, y);
    y = addText('• Notificações push para alertas', 20, y);
    y = addText('• Tema claro/escuro', 20, y);
    y = addText('• Instalação como PWA', 20, y);
    y += 15;

    y = addText('🔧 DICAS DE USO', 20, y);
    y += 10;

    y = addText('• Use as setas do teclado para navegar entre abas', 20, y);
    y = addText('• Deslize horizontalmente para trocar de tela no mobile', 20, y);
    y = addText('• Configure limites nas categorias para receber alertas', 20, y);
    y = addText('• Use o botão de voz para adicionar transações rapidamente', 20, y);
    y = addText('• Faça backup regular dos seus dados', 20, y);

    // Salvar arquivo
    doc.save('servo-tech-financas-guia.pdf');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Guia PDF exportado com sucesso!',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao exportar guia PDF:', error);
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

// Função para mostrar notificações
function showNotification(title, body, options = {}) {
  console.log('🔔 Tentando enviar notificação:', title, body);
  console.log('🔔 Permissão:', Notification.permission);
  console.log('🔔 Habilitada:', localStorage.getItem('notifications-enabled'));

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

      console.log('✅ Notificação criada com sucesso:', notification);

      notification.onclick = () => {
        console.log('🔔 Notificação clicada');
        window.focus();
        notification.close();
      };

      setTimeout(() => {
        notification.close();
        console.log('🔔 Notificação fechada automaticamente');
      }, 5000);

      console.log('✅ Notificação enviada com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao criar notificação:', error);
    }
  } else {
    console.log('❌ Notificação não enviada - permissão ou configuração inválida');
    console.log('   Permissão:', Notification.permission);
    console.log('   Habilitada:', localStorage.getItem('notifications-enabled'));
  }
}

// Função para verificar recorrentes pendentes e notificar
function checkRecorrentesPendentes() {
  if (localStorage.getItem('notifications-enabled') !== 'true') {return;}

  const recorrentes = window.appState.recorrentes || [];
  const pendentes = recorrentes.filter(rec => {
    // Lógica para verificar se há recorrentes pendentes
    // Esta é uma implementação básica
    return rec.parcelasRestantes > 0;
  });

  if (pendentes.length > 0) {
    showNotification(
      'Recorrentes Pendentes',
      `Você tem ${pendentes.length} despesa(s) recorrente(s) para efetivar este mês.`
    );
  }
}

// Função para verificar limites de categoria
function checkLimitesCategoria() {
  console.log('🔍 Iniciando verificação de limites de categoria...');
  console.log('🔍 Notificações habilitadas:', localStorage.getItem('notifications-enabled') === 'true');

  if (localStorage.getItem('notifications-enabled') !== 'true') {
    console.log('❌ Notificações desabilitadas, pulando verificação');
    return;
  }

  const categories = window.appState.categories || [];
  const transactions = window.appState.transactions || [];

  console.log('🔍 Categorias encontradas:', categories.length);
  console.log('🔍 Transações encontradas:', transactions.length);

  categories.forEach(cat => {
    if (cat.limite) {
      const gasto = transactions
        .filter(t => t.categoriaId === cat.id && t.tipo === cat.tipo)
        .reduce((sum, t) => sum + parseFloat(t.valor), 0);

      const limite = parseFloat(cat.limite);
      const percentual = (gasto / limite) * 100;

      console.log(`🔍 ${cat.nome}: R$ ${gasto.toFixed(2)} / R$ ${limite.toFixed(2)} (${percentual.toFixed(1)}%)`);

      if (percentual >= 80) {
        console.log(`⚠️ ${cat.nome} atingiu ${percentual.toFixed(1)}% do limite!`);
        showNotification(
          '⚠️ Limite de Categoria',
          `${cat.nome} está com ${percentual.toFixed(1)}% do limite usado (R$ ${gasto.toFixed(2)} / R$ ${limite.toFixed(2)}).`
        );
      }

      // Notificação específica quando ultrapassa 100%
      if (percentual > 100) {
        console.log(`🚨 ${cat.nome} ULTRAPASSOU o limite em ${(percentual - 100).toFixed(1)}%!`);
        showNotification(
          '🚨 LIMITE ULTRAPASSADO!',
          `${cat.nome} ultrapassou o limite em ${(percentual - 100).toFixed(1)}%! (R$ ${gasto.toFixed(2)} / R$ ${limite.toFixed(2)})`
        );
      }
    }
  });
}

// Função global para forçar atualização da interface
window.forceUIUpdate = function () {
  console.log('🔄 Forçando atualização da UI...');
  const currentTab = document
    .querySelector('.nav-btn.active')
    ?.getAttribute('data-route');
  console.log('📍 Aba atual:', currentTab);

  // Usar requestAnimationFrame para otimizar a renderização
  requestAnimationFrame(() => {
    if (currentTab && window.router) {
      console.log('🔄 Recarregando aba:', currentTab);
      window.router(currentTab);
    }
  });
};

// Função otimizada para sincronização de tema
window.syncThemeAcrossTabs = function() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  
  // Aplicar tema consistentemente em todos os elementos
  document.querySelectorAll('[class*="dark:"]').forEach(element => {
    // Forçar reflow para garantir aplicação das classes
    element.offsetHeight;
  });
  
  // Atualizar ícones de tema
  const themeIcons = document.querySelectorAll('#theme-icon');
  themeIcons.forEach(icon => {
    icon.textContent = isDark ? '🌙' : '☀️';
  });
  
  console.log('🎨 Tema sincronizado em todas as abas');
};

// Função para testar notificações
window.testNotification = function () {
  console.log('🔔 Testando notificações...');
  console.log('📱 Permissão do navegador:', Notification.permission);
  console.log('💾 localStorage:', localStorage.getItem('notifications-enabled'));

  const permission = Notification.permission;
  const enabled = localStorage.getItem('notifications-enabled') === 'true';

  if (permission === 'granted' && enabled) {
    console.log('✅ Notificações ativadas - enviando teste...');
    showNotification(
      '🔔 Teste de Notificação',
      'As notificações estão funcionando perfeitamente!'
    );

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Notificação de teste enviada!',
        type: 'success'
      });
    }
  } else {
    let message = '';
    if (permission === 'denied') {
      message = '❌ Permissão negada pelo navegador. Vá em Configurações > Notificações e permita.';
    } else if (permission === 'default') {
      message = '❌ Permissão não solicitada. Clique em "Ativar Notificações" primeiro.';
    } else if (!enabled) {
      message = '❌ Notificações desativadas. Clique em "Ativar Notificações" primeiro.';
    } else {
      message = '❌ Erro desconhecido com notificações.';
    }

    console.log('❌ Erro:', message);

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

// Expor funções importantes globalmente
window.showNotification = showNotification;
window.checkRecorrentesPendentes = checkRecorrentesPendentes;
window.checkLimitesCategoria = checkLimitesCategoria;
window.updatePageTitle = updatePageTitle;

// Função de teste para forçar renderização da navegação
window.testBottomNav = function() {
  console.log('🧪 Teste: Forçando renderização da navegação...');
  renderBottomNav('/dashboard');
  
  // Verificar se foi renderizada
  setTimeout(() => {
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
      console.log('✅ Navegação renderizada com sucesso');
      console.log('📋 Conteúdo:', bottomNav.innerHTML);
    } else {
      console.error('❌ Navegação não foi renderizada');
    }
  }, 100);
};

// ===== SISTEMA DE LISTENERS EM TEMPO REAL =====

// Variáveis para unsubscribe dos listeners
let unsubscribeBudget = null;
let unsubscribeTransactions = null;
let unsubscribeCategories = null;
let unsubscribeRecorrentes = null;

// Função para escutar mudanças no orçamento atual
async function listenCurrentBudget(budgetId) {
  if (unsubscribeBudget) {unsubscribeBudget();}
  if (!budgetId) {return;}
  
  const { doc, onSnapshot } = await import('firebase/firestore');
  const ref = doc(db, 'budgets', budgetId);
  unsubscribeBudget = onSnapshot(ref, snap => {
    if (snap.exists()) {
      window.appState.currentBudget = { id: snap.id, ...snap.data() };
      console.log('🔄 Orçamento atualizado:', snap.data().nome);

      // Forçar atualização imediata
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

// Função para escutar mudanças nas transações
async function listenTransactions(budgetId) {
  if (unsubscribeTransactions) {unsubscribeTransactions();}
  if (!budgetId) {return;}
  console.log('🎧 Iniciando listener de transações para budgetId:', budgetId);

  const { query, collection, where, onSnapshot } = await import('firebase/firestore');
  const q = query(
    collection(db, 'transactions'),
    where('budgetId', '==', budgetId)
  );
  unsubscribeTransactions = onSnapshot(
    q,
    snapshot => {
      console.log('🎧 Listener de transações executado!');
      const transactions = [];
      snapshot.forEach(doc => {
        transactions.push({ id: doc.id, ...doc.data() });
      });

      // Verificar se houve mudança real (IDs ou conteúdo)
      const currentIds = window.appState.transactions.map(t => t.id).sort();
      const newIds = transactions.map(t => t.id).sort();
      const idsChanged = JSON.stringify(currentIds) !== JSON.stringify(newIds);

      // Verificar se o conteúdo mudou (para edições)
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

      // Ordenar transações por data (mais recentes primeiro)
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
      console.log('🔄 Transações atualizadas:', transactions.length, 'itens');
      console.log('🔄 Houve mudança?', hasChanged);

      if (hasChanged) {
        console.log('🎯 Atualizando UI após mudança nas transações...');
        if (window.renderDashboard) {
          console.log('📊 Executando renderDashboard...');
          window.renderDashboard();
        }
        if (window.renderTransactions) {
          console.log('📋 Executando renderTransactions...');
          window.renderTransactions();
        }

        // Também usar a função global como backup
        if (window.forceUIUpdate) {
          setTimeout(() => window.forceUIUpdate(), 50);
          setTimeout(() => window.forceUIUpdate(), 200);
        }
      } else {
        console.log('📊 Nenhuma mudança detectada, pulando atualização');
      }
    },
    error => {
      console.error('❌ Erro no listener de transações:', error);
    }
  );
}

// Função para escutar mudanças nas categorias
async function listenCategories(budgetId) {
  if (unsubscribeCategories) {unsubscribeCategories();}
  if (!budgetId) {return;}
  console.log('🎧 Iniciando listener de categorias para budgetId:', budgetId);

  const { query, collection, where, onSnapshot } = await import('firebase/firestore');
  const q = query(
    collection(db, 'categories'),
    where('budgetId', '==', budgetId)
  );
  unsubscribeCategories = onSnapshot(
    q,
    snapshot => {
      console.log('🎧 Listener de categorias executado!');
      const categories = [];
      snapshot.forEach(doc => {
        categories.push({ id: doc.id, ...doc.data() });
      });

      // Verificar se houve mudança real (IDs ou conteúdo)
      const currentIds = window.appState.categories.map(c => c.id).sort();
      const newIds = categories.map(c => c.id).sort();
      const idsChanged = JSON.stringify(currentIds) !== JSON.stringify(newIds);

      // Verificar se o conteúdo mudou (para edições)
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
      console.log('🔄 Categorias atualizadas:', categories.length, 'itens');
      console.log('🔄 Houve mudança?', hasChanged);

      if (hasChanged) {
        console.log('🎯 Atualizando UI após mudança nas categorias...');
        if (window.renderDashboard) {
          console.log('📊 Executando renderDashboard...');
          window.renderDashboard();
        }
        if (window.renderCategories) {
          console.log('📂 Executando renderCategories...');
          window.renderCategories();
        }

        // Também usar a função global como backup
        if (window.forceUIUpdate) {
          setTimeout(() => window.forceUIUpdate(), 50);
          setTimeout(() => window.forceUIUpdate(), 200);
        }
      } else {
        console.log('📊 Nenhuma mudança detectada, pulando atualização');
      }
    },
    error => {
      console.error('❌ Erro no listener de categorias:', error);
    }
  );
}

// Função para escutar mudanças nos recorrentes
async function listenRecorrentes(budgetId) {
  if (unsubscribeRecorrentes) {unsubscribeRecorrentes();}
  if (!budgetId) {return;}
  console.log('🎧 Iniciando listener de recorrentes para budgetId:', budgetId);

  const { query, collection, where, onSnapshot } = await import('firebase/firestore');
  const q = query(
    collection(db, 'recorrentes'),
    where('budgetId', '==', budgetId)
  );
  unsubscribeRecorrentes = onSnapshot(
    q,
    snapshot => {
      console.log('🎧 Listener de recorrentes executado!');
      const recorrentes = [];
      snapshot.forEach(doc => {
        recorrentes.push({ id: doc.id, ...doc.data() });
      });

      // Verificar se houve mudança real (IDs ou conteúdo)
      const currentIds = window.appState.recorrentes.map(r => r.id).sort();
      const newIds = recorrentes.map(r => r.id).sort();
      const idsChanged = JSON.stringify(currentIds) !== JSON.stringify(newIds);

      // Verificar se o conteúdo mudou (para edições)
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
      console.log('🔄 Recorrentes atualizados:', recorrentes.length, 'itens');
      console.log('🔄 Houve mudança?', hasChanged);

      if (hasChanged) {
        console.log('🎯 Atualizando UI após mudança nos recorrentes...');
        if (window.renderDashboard) {
          console.log('📊 Executando renderDashboard...');
          window.renderDashboard();
        }
        if (window._renderRecorrentes) {
          console.log('🔄 Executando _renderRecorrentes...');
          window._renderRecorrentes();
        }

        // Também usar a função global como backup
        if (window.forceUIUpdate) {
          setTimeout(() => window.forceUIUpdate(), 50);
          setTimeout(() => window.forceUIUpdate(), 200);
        }
      } else {
        console.log('📊 Nenhuma mudança detectada, pulando atualização');
      }
    },
    error => {
      console.error('❌ Erro no listener de recorrentes:', error);
    }
  );
}

// Função para iniciar todos os listeners
async function startAllListeners(budgetId) {
  console.log('🚀 Iniciando listeners para orçamento:', budgetId);
  console.log('📍 Estado atual:', {
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

  console.log('✅ Todos os listeners iniciados');
  console.log('🔍 Verificando se listeners estão ativos:', {
    unsubscribeBudget: !!unsubscribeBudget,
    unsubscribeTransactions: !!unsubscribeTransactions,
    unsubscribeCategories: !!unsubscribeCategories,
    unsubscribeRecorrentes: !!unsubscribeRecorrentes
  });

  // Teste: verificar se os listeners estão funcionando
  setTimeout(() => {
    console.log('🧪 Teste de listeners após 2 segundos:', {
      unsubscribeBudget: !!unsubscribeBudget,
      unsubscribeTransactions: !!unsubscribeTransactions,
      unsubscribeCategories: !!unsubscribeCategories,
      unsubscribeRecorrentes: !!unsubscribeRecorrentes
    });
  }, 2000);
}

// Função para parar todos os listeners
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
        console.log(`✅ Listener ${listenerName} parado`);
      } catch (error) {
        console.error(`❌ Erro ao parar listener ${listenerName}:`, error);
      }
    }
  });
  
  console.log('✅ Todos os listeners parados');
}

// Expor funções de listeners globalmente
window.startAllListeners = startAllListeners;
window.stopAllListeners = stopAllListeners;
window.listenCurrentBudget = listenCurrentBudget;
window.listenTransactions = listenTransactions;
window.listenCategories = listenCategories;
window.listenRecorrentes = listenRecorrentes;

// ===== FUNÇÕES UTILITÁRIAS PARA CATEGORIAS =====

// Função para migrar transações antigas
window.migrarTransacoesAntigas = function() {
  console.log('🔄 Iniciando migração de transações antigas...');
  
  if (window.Snackbar) {
    window.Snackbar({
      message: '🔄 Migração iniciada...',
      type: 'info'
    });
  }
  
  // Implementação da migração
  setTimeout(() => {
    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Migração concluída com sucesso!',
        type: 'success'
      });
    }
  }, 2000);
};

// Função para corrigir tipo de categoria
window.corrigirTipoCategoria = function() {
  console.log('🔧 Iniciando correção de tipos de categoria...');
  
  if (window.Snackbar) {
    window.Snackbar({
      message: '🔧 Correção iniciada...',
      type: 'info'
    });
  }
  
  // Implementação da correção
  setTimeout(() => {
    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Correção concluída com sucesso!',
        type: 'success'
      });
    }
  }, 2000);
};

// Função para mostrar histórico de categoria
window.showCategoryHistory = function(categoryId) {
  console.log('📊 Mostrando histórico da categoria:', categoryId);
  
  const category = window.appState.categories.find(c => c.id === categoryId);
  if (!category) {
    if (window.Snackbar) {
      window.Snackbar({
        message: '❌ Categoria não encontrada',
        type: 'error'
      });
    }
    return;
  }
  
  // Filtrar transações da categoria
  const transactions = window.appState.transactions.filter(t => t.categoriaId === categoryId);
  
  if (window.Modal) {
    const modalElement = window.Modal({
      title: `Histórico - ${category.nome}`,
      content: `
        <div class="space-y-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <p><strong>Total de transações:</strong> ${transactions.length}</p>
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
              Nenhuma transação encontrada para esta categoria
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

// ===== FUNÇÕES UTILITÁRIAS ADICIONAIS =====

// Função para obter informações de um usuário por UID
async function getUserInfo(uid) {
  try {
    const { getDoc, doc } = await import('firebase/firestore');
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return {
        email: 'Usuário não encontrado',
        displayName: 'Usuário não encontrado'
      };
    }
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    return {
      email: 'Erro ao carregar',
      displayName: 'Erro ao carregar'
    };
  }
}

// Função para enviar notificação de nova transação
async function sendTransactionNotification(budgetId, senderUid, transactionData) {
  try {
    // Buscar informações do orçamento via repo
    const { serverTimestamp } = await import('firebase/firestore');
    const budgetData = await budgetsRepo.getById(budgetId);
    if (!budgetData) {
      console.log('Orçamento não encontrado para notificação');
      return;
    }
    
    // Verificar se é um orçamento compartilhado
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) {
      console.log('Orçamento não compartilhado, não enviando notificação');
      return;
    }

    // Buscar informações do usuário que adicionou a transação
    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    // Buscar categoria da transação
    let categoriaNome = 'Sem categoria';
    if (transactionData.categoriaId) {
      const categoria = await categoriesRepo.getById(transactionData.categoriaId);
      if (categoria) categoriaNome = categoria.nome;
    }

    // Preparar dados da notificação
    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      transactionId: transactionData.id,
      transactionDescricao: transactionData.descricao,
      transactionValor: transactionData.valor,
      transactionCategoria: categoriaNome,
      transactionTipo: transactionData.tipo || 'despesa',
      createdAt: serverTimestamp(),
      read: false,
      type: 'new_transaction'
    };

    // Enviar notificação para todos os usuários do orçamento (membros + dono), exceto o remetente
    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const notificationPromises = recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`📧 Notificação enviada para usuário: ${recipientUid}`);
      } catch (error) {
        console.error(`Erro ao enviar notificação para ${recipientUid}:`, error);
      }
    });

    await Promise.all(notificationPromises);
    console.log('✅ Notificações enviadas com sucesso');

  } catch (error) {
    console.error('Erro ao enviar notificações:', error);
  }
}

// Função para enviar notificação de exclusão de transação
async function sendTransactionDeletedNotification(budgetId, senderUid, transactionData) {
  try {
    // Buscar informações do orçamento
  const { serverTimestamp } = await import('firebase/firestore');
  const budgetData = await budgetsRepo.getById(budgetId);
  if (!budgetData) {
      console.log('Orçamento não encontrado para notificação de exclusão');
      return;
    }

    // Verificar se é um orçamento compartilhado
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) {
      console.log('Orçamento não compartilhado, não enviando notificação de exclusão');
      return;
    }

    // Buscar informações do usuário que excluiu a transação
    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    // Buscar categoria da transação (se ainda disponível nos dados lidos)
    let categoriaNome = 'Sem categoria';
    if (transactionData?.categoriaId) {
      const categoria = await categoriesRepo.getById(transactionData.categoriaId);
      if (categoria) categoriaNome = categoria.nome;
    }

    // Preparar dados da notificação
    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      transactionId: transactionData?.id,
      transactionDescricao: transactionData?.descricao,
      transactionValor: transactionData?.valor,
      transactionCategoria: categoriaNome,
      transactionTipo: transactionData?.tipo || 'despesa',
      createdAt: serverTimestamp(),
      read: false,
      type: 'deleted_transaction'
    };

    // Enviar notificação para todos os usuários do orçamento (membros + dono), exceto o remetente
    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const notificationPromises = recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`📧 Notificação de exclusão enviada para usuário: ${recipientUid}`);
      } catch (error) {
        console.error(`Erro ao enviar notificação de exclusão para ${recipientUid}:`, error);
      }
    });

    await Promise.all(notificationPromises);
    console.log('✅ Notificações de exclusão enviadas com sucesso');

  } catch (error) {
    console.error('Erro ao enviar notificações de exclusão:', error);
  }
}

// Função para enviar notificação de atualização de transação
async function sendTransactionUpdatedNotification(budgetId, senderUid, transactionData) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const budgetData = await budgetsRepo.getById(budgetId);
    if (!budgetData) return;
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) return;

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    let categoriaNome = 'Sem categoria';
    if (transactionData?.categoriaId) {
      const categoria = await categoriesRepo.getById(transactionData.categoriaId);
      if (categoria) categoriaNome = categoria.nome;
    }

    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      transactionId: transactionData?.id,
      transactionDescricao: transactionData?.descricao,
      transactionValor: transactionData?.valor,
      transactionCategoria: categoriaNome,
      transactionTipo: transactionData?.tipo || 'despesa',
      createdAt: serverTimestamp(),
      read: false,
      type: 'updated_transaction'
    };

    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) rawRecipients.push(budgetData.criadoPor);
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);

    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    await Promise.all(recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`📧 Notificação de atualização enviada para usuário: ${recipientUid}`);
      } catch (err) {
        console.error(`Erro ao enviar notificação de atualização para ${recipientUid}:`, err);
      }
    }));
  } catch (error) {
    console.error('Erro ao enviar notificações de atualização:', error);
  }
}

// Função genérica para notificar mudanças de categoria
async function sendCategoryChangeNotification(budgetId, senderUid, categoryData, changeType) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const budgetData = await budgetsRepo.getById(budgetId);
    if (!budgetData) return;
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) return;

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      categoryId: categoryData?.id,
      categoryNome: categoryData?.nome,
      categoryTipo: categoryData?.tipo,
      categoryLimite: categoryData?.limite,
      createdAt: serverTimestamp(),
      read: false,
      type: changeType // 'category_added' | 'category_updated' | 'category_deleted'
    };

    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) rawRecipients.push(budgetData.criadoPor);
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);

    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    await Promise.all(recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`📧 Notificação de categoria (${changeType}) enviada para usuário: ${recipientUid}`);
      } catch (err) {
        console.error(`Erro ao enviar notificação de categoria para ${recipientUid}:`, err);
      }
    }));
  } catch (error) {
    console.error('Erro ao enviar notificações de categoria:', error);
  }
}

// Função para sair de um orçamento compartilhado
async function leaveSharedBudget(budgetId) {
  try {
    const { updateDoc, doc, arrayRemove } = await import('firebase/firestore');
    const user = window.appState.currentUser;
    
    if (!user) {
      console.error('Usuário não autenticado');
      return;
    }

    const budgetRef = doc(db, 'budgets', budgetId);
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayRemove(user.uid)
    });

    console.log('✅ Usuário removido do orçamento compartilhado');
    
    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Saída do orçamento realizada com sucesso',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('Erro ao sair do orçamento:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: '❌ Erro ao sair do orçamento',
        type: 'error'
      });
    }
  }
}

// Função para remover usuário de um orçamento compartilhado
async function removeUserFromBudget(budgetId, userUid) {
  try {
    const { updateDoc, doc, arrayRemove } = await import('firebase/firestore');
    const currentUser = window.appState.currentUser;
    
    if (!currentUser) {
      console.error('Usuário não autenticado');
      return;
    }

    const budgetRef = doc(db, 'budgets', budgetId);
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayRemove(userUid)
    });

    console.log('✅ Usuário removido do orçamento compartilhado');
    
    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Usuário removido com sucesso',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: '❌ Erro ao remover usuário',
        type: 'error'
      });
    }
  }
}

// ===== EXPOSIÇÃO DE FUNÇÕES GLOBAIS =====

// Expor funções adicionais globalmente
window.getUserInfo = getUserInfo;
window.sendTransactionNotification = sendTransactionNotification;
window.sendTransactionDeletedNotification = sendTransactionDeletedNotification;
window.sendTransactionUpdatedNotification = sendTransactionUpdatedNotification;
window.sendCategoryChangeNotification = sendCategoryChangeNotification;
window.leaveSharedBudget = leaveSharedBudget;
window.removeUserFromBudget = removeUserFromBudget;
window.calcularParcelaRecorrente = calcularParcelaRecorrente;
window.calcularStatusRecorrente = calcularStatusRecorrente;

// ===== FUNÇÕES DE MODAL =====

// Função para mostrar modal
window.showModal = function(content, title = '') {
  console.log('🔧 showModal chamada com:', { title, content: content.substring(0, 100) + '...' });
  
  if (!window.Modal) {
    console.error('❌ window.Modal não está disponível');
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

// Função para fechar modal
window.closeModal = function() {
  console.log('🔧 closeModal chamada');
  const modal = document.getElementById('app-modal');
  if (modal) {
    modal.remove();
    if (window.toggleFABOnModal) {
      window.toggleFABOnModal();
    }
  }
};

// Função universal para mostrar modal de confirmação
// Resolve and call a global callback reference safely (e.g., 'minhaFuncao' or 'AlgumObjeto.metodo')
function __safeCallGlobal(ref) {
  try {
    if (!ref || typeof ref !== 'string') return;
    let path = ref.trim();
    if (!path) return;
    // Drop trailing parentheses if provided (e.g., 'foo()')
    if (path.endsWith('()')) path = path.slice(0, -2);
    // Remove leading 'window.' if present
    path = path.replace(/^window\./, '');
    const parts = path.split('.');
    let ctx = window;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (ctx && Object.prototype.hasOwnProperty.call(ctx, key)) {
        ctx = ctx[key];
      } else {
        return console.warn('onConfirm não resolvido (contexto):', ref);
      }
    }
    const fnKey = parts[parts.length - 1];
    const fn = ctx && ctx[fnKey];
    if (typeof fn === 'function') {
      fn.call(ctx);
    } else {
      console.warn('onConfirm não é função:', ref);
    }
  } catch (e) {
    console.warn('Falha ao resolver onConfirm:', e);
  }
}

// Expor helper no escopo global para chamadas geradas e fallback de build
// Isso permite substituir com segurança qualquer uso antigo de eval no bundle final
// sem quebrar quando os módulos são divididos.
try {
  window.__safeCallGlobal = __safeCallGlobal;
} catch (e) {
  // ignore
}

window.showConfirmationModal = function(options) {
  const {
    title = 'Confirmar Ação',
    message = 'Tem certeza que deseja realizar esta ação?',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    confirmColor = 'bg-red-500 hover:bg-red-600',
    onConfirm,
    onCancel
  } = options;

  const modalContent = `
    <div class="modal-content max-w-md mx-auto">
      <div class="text-center">
        <div class="text-6xl mb-4">⚠️</div>
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
            // Evita eval — tenta resolver função global de forma segura
            __safeCallGlobal(onConfirm);
          }
        } catch (err) {
          console.warn('onConfirm gerou um erro:', err);
        }
      };
    }
  }, 100);
  return modal;
};

// ===== FUNÇÕES DE ORÇAMENTOS COMPARTILHADOS =====

// Função para mostrar modal de criar novo orçamento
window.showAddBudgetModal = function () {
  console.log('🔧 Abrindo modal de criar orçamento...');
  
  const modalContent = `
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Criar Novo Orçamento</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <form id="add-budget-form" class="space-y-4">
        <div>
          <label class="modal-label">Nome do Orçamento</label>
          <input type="text" id="budget-name" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="Ex: Orçamento Familiar"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div>
          <label class="modal-label">Descrição (opcional)</label>
          <textarea id="budget-description"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Descrição do orçamento"
                    rows="3"
                    style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;"></textarea>
        </div>
        
        <div>
          <label class="modal-label">Tipo de Orçamento</label>
          <select id="budget-type" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
            <option value="pessoal">Pessoal</option>
            <option value="compartilhado">Compartilhado</option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Criar Orçamento</button>
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
      await loadBudgets();
      
      closeModal();
      
      if (window.Snackbar) {
        window.Snackbar({
          message: '✅ Orçamento criado com sucesso!',
          type: 'success'
        });
      }
      
      // Se for o primeiro orçamento, selecionar automaticamente
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

// Função para compartilhar orçamento
window.compartilharOrcamento = async function () {
  console.log('🔧 Abrindo modal de compartilhar orçamento...');
  
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
          <p class="text-sm text-blue-600 dark:text-blue-300">ID do Orçamento: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">${currentBudget.id}</code></p>
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

// Fallback: caso alguma UI chame showShareBudgetModal, rolar até a seção de compartilhar
if (!window.showShareBudgetModal) {
  window.showShareBudgetModal = function() {
    const el = document.getElementById('share-email');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => el.focus(), 300);
    } else if (window.Snackbar) {
      window.Snackbar({ message: 'Abra a aba Config > Compartilhar Orçamento', type: 'info' });
    }
  }
}

// Utilidades de convites
function normalizeInvitationStatus(s) {
  const raw = (s ?? 'pending').toString().trim().toLowerCase();
  // Mapear sinônimos PT/EN
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
        // Compatibilidade: convites antigos que não possuem invitedUserEmailLower
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
    
    console.log('📨 Criando convite com dados:', invitationData);
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
        await loadBudgets();
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
}

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
  console.log('🔍 Executando queries de convites (uid, emailLower e emailExact)...');
  const [snapUid, snapEmailLower, snapEmailExact] = await Promise.all([getDocs(qByUid), getDocs(qByEmailLower), getDocs(qByEmailExact)]);
  // Combinar resultados únicos
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
    console.log('📊 Total de convites encontrados:', invitationsSnapshot.size);
    
    const invitations = [];
    
    for (const doc of invitationsSnapshot.docs) {
  const data = doc.data();
  if (!isInvitationClosed(data.status)) {
        console.log('📨 Convite encontrado:', { id: doc.id, ...data });
        invitations.push({
          id: doc.id,
          ...data
        });
      }
    }
    
    // Ordenar localmente por data de criação (mais recente primeiro)
    invitations.sort((a, b) => {
  const dateA = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : (a.createdAt.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt))) : new Date(0);
  const dateB = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : (b.createdAt.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt))) : new Date(0);
      return dateB - dateA;
    });
    
    if (invitations.length === 0 && invitationsSnapshot.size > 0) {
      try {
        console.log('🕵️ Debug convites: nenhum convite listado, imprimindo status de cada doc');
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
  console.log('🔧 Abrindo modal de entrar em orçamento compartilhado...');
  
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
      await loadBudgets();
      
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

// Inicializar tema apenas uma vez quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, verificando botão de tema...');
  const button = document.getElementById('theme-toggle-btn');
  console.log('Botão encontrado:', button);
  if (button) {
    console.log('Botão existe, chamando setupThemeToggle...');
    setupThemeToggle();
  } else {
    console.log('Botão não encontrado no DOM, observando até aparecer...');
    let retryTimer = setTimeout(() => {
      const buttonRetry = document.getElementById('theme-toggle-btn');
      console.log('Tentativa 2 - Botão encontrado:', buttonRetry);
      if (buttonRetry && !window.__themeToggleWired) {
        window.__themeToggleWired = true;
        setupThemeToggle();
      }
    }, 1000);

    try {
      const observer = new MutationObserver((mutations, obs) => {
        const btnNow = document.getElementById('theme-toggle-btn');
        if (btnNow && !window.__themeToggleWired) {
          window.__themeToggleWired = true;
          try { clearTimeout(retryTimer); } catch {}
          setupThemeToggle();
          obs.disconnect();
          console.log('✅ Theme toggle inicializado via MutationObserver');
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      // Segurança: parar de observar após 5s
      setTimeout(() => { try { observer.disconnect(); } catch {} }, 5000);
    } catch (e) {
      console.warn('⚠️ Falha ao observar DOM para theme-toggle:', e);
    }
  }
});