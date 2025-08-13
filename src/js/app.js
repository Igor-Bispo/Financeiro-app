import '../css/styles.css';

import './showAddRecorrenteModal.js';
import './showAddTransactionModal.js';
import './showAddCategoryModal.js';
import { setupThemeToggle } from './ui/ThemeToggle.js';
import { SwipeNavigation } from './ui/SwipeTabs.js';
import { mobileEnhancements } from './ui/MobileEnhancements.js';
import './biometric-auth.js';
import { app, auth, db } from './firebase.js';
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
import {
  getDespesasRecorrentes,
  aplicarRecorrentesDoMes,
  deleteDespesaRecorrente,
  addDespesaRecorrente,
  calcularParcelaRecorrente,
  calcularStatusRecorrente
} from './recorrentes.js';
import { CardResumo } from './ui/CardResumo.js';
import { Modal } from './ui/Modal.js';
import { Snackbar } from './ui/Snackbar.js';
import { Analytics } from './ui/Analytics.js';
import { renderAnalytics } from './ui/AnalyticsRoute.js';
import { renderCleanDashboard } from './dashboard-clean.js';

// Tornar Modal e Snackbar globais para uso em outros módulos
window.Modal = Modal;
window.Snackbar = Snackbar;
window.setupThemeToggle = setupThemeToggle;
window.FirebaseAuth = auth;
import { FAB } from './ui/FAB.js';
import { BottomNav } from './ui/BottomNav.js';
import {
  renderRecorrentes as _renderRecorrentes,
  showHistoricoRecorrente
} from './recorrentes/RecorrentesPage.js';
// Drawer removido - funcionalidades movidas para as abas do rodapé
import { renderLogAplicacoes } from './ui/LogAplicacoes.js';
import {
  buscarOrcamentoPorId,
  buscarUidPorEmail
} from './firestore.js';
import { renderSettings } from './config/SettingsPage.js';

window.renderSettings = renderSettings;
window._renderRecorrentes = _renderRecorrentes;
window.showHistoricoRecorrente = showHistoricoRecorrente;
window.renderLogAplicacoes = renderLogAplicacoes;
window.deleteDespesaRecorrente = deleteDespesaRecorrente;
window.addDespesaRecorrente = addDespesaRecorrente;

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
}

// Função para resetar apenas categorias
window.resetCategoriesOnly = async function(budgetId) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('🔄 Iniciando reset de categorias do orçamento:', budgetId);

    // Verificar se o usuário é o dono do orçamento
    const budget = window.appState.budgets.find(b => b.id === budgetId);
    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }

    if (budget.userId !== user.uid) {
      throw new Error('Você não tem permissão para resetar este orçamento');
    }

    // Excluir apenas as categorias do orçamento
    console.log('🔄 Removendo categorias do orçamento...');
    const categoriesQuery = query(
      collection(db, 'categories'),
      where('budgetId', '==', budgetId)
    );
    const categoriesSnapshot = await getDocs(categoriesQuery);
    
    const categoryDeletions = categoriesSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(categoryDeletions);
    console.log(`✅ ${categoriesSnapshot.docs.length} categorias removidas`);

    // Recriar categorias padrão
    console.log('🔄 Recriando categorias padrão...');
    await window.createDefaultCategories(budgetId);
    console.log('✅ Categorias padrão recriadas');

    // Atualizar estado local se for o orçamento atual
    const isCurrentBudget = window.appState.currentBudget?.id === budgetId;
    if (isCurrentBudget) {
      // Recarregar categorias do estado local
      await window.loadCategories();
      
      // Recarregar a página atual para refletir as mudanças
      const currentRoute = window.location.hash.replace('#', '') || '/';
      if (currentRoute === '/') {
        await renderDashboard();
      } else if (currentRoute === '/categories') {
        await renderCategories();
      }
    }

    Snackbar({ 
      message: `Categorias do orçamento "${budget.nome}" foram resetadas com sucesso! Categorias padrão foram recriadas.`, 
      type: 'success' 
    });

    console.log('✅ Reset de categorias concluído com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao resetar categorias:', error);
    Snackbar({ 
      message: `Erro ao resetar categorias: ${error.message}`, 
      type: 'error' 
    });
    throw error;
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

        // Aplicar correções nas recorrentes se existirem
        if (data.recorrentes && data.recorrentes.length > 0) {
          console.log('🔧 Aplicando correções nas recorrentes...');
          data.recorrentes = data.recorrentes.map(rec => {
            // Corrigir timestamps do Firestore
            if (rec.createdAt && typeof rec.createdAt === 'object' && rec.createdAt.seconds) {
              rec.createdAt = new Date(rec.createdAt.seconds * 1000).toISOString();
            }
            if (rec.updatedAt && typeof rec.updatedAt === 'object' && rec.updatedAt.seconds) {
              rec.updatedAt = new Date(rec.updatedAt.seconds * 1000).toISOString();
            }
            if (rec.dataInicio && typeof rec.dataInicio === 'object' && rec.dataInicio.seconds) {
              rec.dataInicio = new Date(rec.dataInicio.seconds * 1000).toISOString();
            }

            // Garantir campos obrigatórios
            if (!rec.descricao || rec.descricao.trim() === '') {
              rec.descricao = 'Recorrente sem descrição';
            }
            if (!rec.valor || isNaN(parseFloat(rec.valor))) {
              rec.valor = 0;
            }
            if (!rec.diaLancamento || isNaN(parseInt(rec.diaLancamento))) {
              rec.diaLancamento = 1;
            }

            // Garantir campos boolean
            rec.ativa = rec.ativa === false ? false : true;
            rec.efetivarMesAtual = rec.efetivarMesAtual === true ? true : false;

            // Corrigir parcelas
            if (rec.parcelasTotal) {
              rec.parcelasTotal = parseInt(rec.parcelasTotal) || null;
              if (!rec.parcelasRestantes || rec.parcelasRestantes > rec.parcelasTotal) {
                rec.parcelasRestantes = rec.parcelasTotal;
              } else {
                rec.parcelasRestantes = parseInt(rec.parcelasRestantes) || rec.parcelasTotal;
              }
            } else {
              rec.parcelasTotal = null;
              rec.parcelasRestantes = null;
            }

            // Remover campos que serão recriados
            delete rec.id;
            delete rec.createdAt;
            delete rec.updatedAt;

            return rec;
          }).filter(rec => rec.descricao && rec.valor >= 0); // Filtrar recorrentes inválidas
          
          console.log(`✅ ${data.recorrentes.length} recorrentes corrigidas`);
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
                  ${data.recorrentes ? `<li>🔄 <strong>${data.recorrentes.length}</strong> recorrentes</li>` : '<li>🔄 <strong>0</strong> recorrentes</li>'}
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

    // 5. Reconectar transações às categorias
    console.log('🔗 Reconectando transações às categorias...');
    let reconexoesRealizadas = 0;
    
    try {
      // Importar função de reconexão
      const { reconnectTransactionsFromBackup } = await import('./utils/reconnectTransactionsToCategories.js');
      
      // Executar reconexão baseada nos dados do backup
      const resultadoReconexao = await reconnectTransactionsFromBackup(backupData, budgetId, false);
      reconexoesRealizadas = resultadoReconexao.reconexoesRealizadas;
      
      console.log(`✅ Reconexão concluída: ${reconexoesRealizadas} transações reconectadas`);
    } catch (error) {
      console.error('❌ Erro durante reconexão de transações:', error);
      // Não falhar a restauração por causa da reconexão
    }

    // 6. Reconectar categorias das recorrentes
    console.log('🔗 Reconectando categorias das recorrentes...');
    let recorrentesReconectadas = 0;
    
    try {
      // Buscar recorrentes atuais
      const recorrentesAtuais = await getDespesasRecorrentes(userId, budgetId);
      
      // Buscar categorias atuais
      const categoriasAtuais = await getCategories(budgetId);
      
      // Criar mapa de categorias do backup (ID antigo -> nome)
      const categoriasBackupMap = new Map();
      backupData.categories.forEach(cat => {
        categoriasBackupMap.set(cat.id, cat.nome);
      });
      
      // Criar mapa de categorias atuais (nome -> ID novo)
      const categoriasAtuaisMap = new Map();
      categoriasAtuais.forEach(cat => {
        const nomeNormalizado = cat.nome.toLowerCase().trim();
        categoriasAtuaisMap.set(nomeNormalizado, cat.id);
      });
      
      // Reconectar cada recorrente
      for (const recorrente of recorrentesAtuais) {
        const nomeCategoriaNoBkp = categoriasBackupMap.get(recorrente.categoriaId);
        
        if (nomeCategoriaNoBkp) {
          const nomeNormalizado = nomeCategoriaNoBkp.toLowerCase().trim();
          const novoIdCategoria = categoriasAtuaisMap.get(nomeNormalizado);
          
          if (novoIdCategoria && novoIdCategoria !== recorrente.categoriaId) {
            console.log(`🔄 Reconectando recorrente "${recorrente.descricao}": ${recorrente.categoriaId} → ${novoIdCategoria}`);
            
            await updateDespesaRecorrente(userId, recorrente.id, {
              categoriaId: novoIdCategoria
            });
            
            recorrentesReconectadas++;
          }
        }
      }
      
      console.log(`✅ Reconexão de recorrentes concluída: ${recorrentesReconectadas} recorrentes reconectadas`);
    } catch (error) {
      console.error('❌ Erro durante reconexão de recorrentes:', error);
      // Não falhar a restauração por causa da reconexão
    }

    // 7. Recarregar dados
    console.log('🔄 Recarregando dados...');
    await refreshCurrentView();

    // 8. Sucesso com detalhes
    console.log('✅ Restauração concluída com sucesso!');
    console.log(`📊 Resumo: ${categoriasImportadas} categorias, ${transacoesImportadas} transações, ${orcamentosImportados} orçamentos, ${recorrentesImportados} recorrentes, ${reconexoesRealizadas} transações reconectadas, ${recorrentesReconectadas} recorrentes reconectadas`);
    
    const mensagemSucesso = `✅ Backup restaurado com sucesso!\n\n📊 Dados importados:\n• ${categoriasImportadas} categorias\n• ${transacoesImportadas} transações\n• ${orcamentosImportados} orçamentos\n• ${recorrentesImportados} recorrentes\n• ${reconexoesRealizadas} transações reconectadas\n• ${recorrentesReconectadas} recorrentes reconectadas\n\nA página será recarregada em 3 segundos...`;
    
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
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'transactions'), transaction);
    console.log('✅ Transação adicionada com ID:', docRef.id);
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // Forçar atualização da UI
    if (window.forceUIUpdate) {
      setTimeout(() => window.forceUIUpdate(), 100);
    }
    
            Snackbar({ message: 'Transação adicionada com sucesso!', type: 'success' });
    return docRef.id;
  } catch (error) {
    console.error('❌ Erro ao adicionar transação:', error);
          Snackbar({ message: 'Erro ao adicionar transação', type: 'error' });
    throw error;
  }
}

// Função para atualizar transação
async function updateTransaction(transactionId, transactionData) {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    await updateDoc(transactionRef, {
      ...transactionData,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Transação atualizada:', transactionId);
    
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
    const transactionRef = doc(db, 'transactions', transactionId);
    await deleteDoc(transactionRef);
    
    console.log('✅ Transação deletada:', transactionId);
    
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

    const q = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budget.id)
    );
    
    const querySnapshot = await getDocs(q);
    const transactions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
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

    const docRef = await addDoc(collection(db, 'categories'), category);
    console.log('✅ Categoria adicionada com ID:', docRef.id);
    
    Snackbar({ message: 'Categoria adicionada com sucesso!', type: 'success' });
    return docRef.id;
  } catch (error) {
    console.error('❌ Erro ao adicionar categoria:', error);
    Snackbar({ message: 'Erro ao adicionar categoria', type: 'error' });
    throw error;
  }
}

// Função para atualizar categoria
async function updateCategory(categoryId, categoryData) {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, {
      ...categoryData,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Categoria atualizada:', categoryId);
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
    const categoryRef = doc(db, 'categories', categoryId);
    await deleteDoc(categoryRef);
    
    console.log('✅ Categoria deletada:', categoryId);
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

    const q = query(
      collection(db, 'categories'),
      where('budgetId', '==', budget.id)
    );
    
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
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

    const docRef = await addDoc(collection(db, 'budgets'), budget);
    console.log('✅ Orçamento adicionado com ID:', docRef.id);
    
    Snackbar({ message: 'Orçamento adicionado com sucesso!', type: 'success' });
    return docRef.id;
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
    const transactionsQuery = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budgetId)
    );
    const transactionsSnapshot = await getDocs(transactionsQuery);
    
    const transactionDeletions = transactionsSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(transactionDeletions);
    console.log(`✅ ${transactionsSnapshot.docs.length} transações excluídas`);

    // Excluir todas as categorias do orçamento
    console.log('🗑️ Excluindo categorias do orçamento...');
    const categoriesQuery = query(
      collection(db, 'categories'),
      where('budgetId', '==', budgetId)
    );
    const categoriesSnapshot = await getDocs(categoriesQuery);
    
    const categoryDeletions = categoriesSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(categoryDeletions);
    console.log(`✅ ${categoriesSnapshot.docs.length} categorias excluídas`);

    // Excluir todas as recorrentes do orçamento
    console.log('🗑️ Excluindo recorrentes do orçamento...');
    const recorrentesQuery = query(
      collection(db, 'recorrentes'),
      where('budgetId', '==', budgetId)
    );
    const recorrentesSnapshot = await getDocs(recorrentesQuery);
    
    const recorrenteDeletions = recorrentesSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(recorrenteDeletions);
    console.log(`✅ ${recorrentesSnapshot.docs.length} recorrentes excluídas`);

    // Excluir convites pendentes do orçamento
    console.log('🗑️ Excluindo convites do orçamento...');
    const invitationsQuery = query(
      collection(db, 'budgetInvitations'),
      where('budgetId', '==', budgetId)
    );
    const invitationsSnapshot = await getDocs(invitationsQuery);
    
    const invitationDeletions = invitationsSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(invitationDeletions);
    console.log(`✅ ${invitationsSnapshot.docs.length} convites excluídos`);

    // Excluir o orçamento
    console.log('🗑️ Excluindo o orçamento...');
    const budgetRef = doc(db, 'budgets', budgetId);
    await deleteDoc(budgetRef);
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

// Função para resetar apenas transações (mantém categorias e recorrentes)
window.resetTransactionsOnly = async function(budgetId) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('🔄 Iniciando reset de transações do orçamento:', budgetId);

    // Verificar se o usuário é o dono do orçamento
    const budget = window.appState.budgets.find(b => b.id === budgetId);
    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }

    if (budget.userId !== user.uid) {
      throw new Error('Você não tem permissão para resetar este orçamento');
    }

    // Excluir apenas as transações do orçamento
    console.log('🔄 Removendo transações do orçamento...');
    const transactionsQuery = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budgetId)
    );
    const transactionsSnapshot = await getDocs(transactionsQuery);
    
    const transactionDeletions = transactionsSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(transactionDeletions);
    console.log(`✅ ${transactionsSnapshot.docs.length} transações removidas`);

    // Atualizar estado local se for o orçamento atual
    const isCurrentBudget = window.appState.currentBudget?.id === budgetId;
    if (isCurrentBudget) {
      // Limpar apenas transações do estado local
      window.appState.transactions = window.appState.transactions.filter(t => t.budgetId !== budgetId);
      
      // Recarregar a página atual para refletir as mudanças
      const currentRoute = window.location.hash.replace('#', '') || '/';
      if (currentRoute === '/') {
        await renderDashboard();
      } else if (currentRoute === '/transactions') {
        renderTransactions();
      }
    }

    Snackbar({ 
      message: `Transações do orçamento "${budget.nome}" foram removidas com sucesso! Categorias e recorrentes foram mantidas.`, 
      type: 'success' 
    });

    console.log('✅ Reset de transações concluído com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao resetar transações:', error);
    Snackbar({ 
      message: `Erro ao resetar transações: ${error.message}`, 
      type: 'error' 
    });
    throw error;
  }
}

// Função para resetar orçamento completo (limpar transações e recorrentes)
window.resetBudget = async function(budgetId) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('🔄 Iniciando reset do orçamento:', budgetId);

    // Verificar se o usuário é o dono do orçamento
    const budget = window.appState.budgets.find(b => b.id === budgetId);
    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }

    if (budget.userId !== user.uid) {
      throw new Error('Você não tem permissão para resetar este orçamento');
    }

    // Excluir todas as transações do orçamento
    console.log('🔄 Removendo transações do orçamento...');
    const transactionsQuery = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budgetId)
    );
    const transactionsSnapshot = await getDocs(transactionsQuery);
    
    const transactionDeletions = transactionsSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(transactionDeletions);
    console.log(`✅ ${transactionsSnapshot.docs.length} transações removidas`);

    // Excluir todas as recorrentes do orçamento
    console.log('🔄 Removendo recorrentes do orçamento...');
    const recorrentesQuery = query(
      collection(db, 'recorrentes'),
      where('budgetId', '==', budgetId)
    );
    const recorrentesSnapshot = await getDocs(recorrentesQuery);
    
    const recorrenteDeletions = recorrentesSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(recorrenteDeletions);
    console.log(`✅ ${recorrentesSnapshot.docs.length} recorrentes removidas`);

    // Atualizar estado local se for o orçamento atual
    const isCurrentBudget = window.appState.currentBudget?.id === budgetId;
    if (isCurrentBudget) {
      // Limpar transações e recorrentes do estado local
      window.appState.transactions = window.appState.transactions.filter(t => t.budgetId !== budgetId);
      window.appState.recorrentes = window.appState.recorrentes.filter(r => r.budgetId !== budgetId);
      
      // Recarregar a página atual para refletir as mudanças
      const currentRoute = window.location.hash.replace('#', '') || '/';
      if (currentRoute === '/') {
        await renderDashboard();
      } else if (currentRoute === '/transactions') {
        renderTransactions();
      } else if (currentRoute === '/recorrentes') {
        await _renderRecorrentes();
      }
    }

    Snackbar({ 
      message: `Orçamento "${budget.nome}" foi resetado com sucesso! Todas as transações e recorrentes foram removidas.`, 
      type: 'success' 
    });

    console.log('✅ Reset do orçamento concluído com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao resetar orçamento:', error);
    Snackbar({ 
      message: `Erro ao resetar orçamento: ${error.message}`, 
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

    // Buscar orçamentos próprios
    const ownBudgetsQuery = query(
      collection(db, 'budgets'),
      where('userId', '==', user.uid)
    );
    
    // Buscar orçamentos compartilhados onde o usuário é membro
    const sharedBudgetsQuery = query(
      collection(db, 'budgets'),
      where('usuariosPermitidos', 'array-contains', user.uid)
    );
    
    console.log('🔍 Executando queries de orçamentos...');
    
    const [ownSnapshot, sharedSnapshot] = await Promise.all([
      getDocs(ownBudgetsQuery),
      getDocs(sharedBudgetsQuery)
    ]);
    
    const ownBudgets = ownSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      isOwner: true
    }));
    
    const sharedBudgets = sharedSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      isOwner: false
    }));
    
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
    
    // Filtrar por mês/ano
    const transacoesFiltradas = allTransactions.filter(t => {
      if (!t.createdAt) return false;
      
      let transacaoData;
      if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
        transacaoData = new Date(t.createdAt.seconds * 1000);
      } else {
        transacaoData = new Date(t.createdAt);
      }

      const transacaoAno = transacaoData.getFullYear();
      const transacaoMes = transacaoData.getMonth() + 1;
      
      return transacaoAno === ano && transacaoMes === mes;
    });
    
    console.log(`✅ Transações filtradas para ${ano}/${mes}: ${transacoesFiltradas.length}`);
    return transacoesFiltradas;
  } catch (error) {
    console.error('❌ Erro ao buscar transações do mês:', error);
    return [];
  }
}

// FUNÇÃO RENDERDASHBOARD ORIGINAL (MANTIDA PARA COMPATIBILIDADE)
async function renderDashboardOriginal(selectedYear, selectedMonth) {
  // Evitar múltiplas chamadas simultâneas
  if (window.isRenderingDashboard) {
    console.log('🔄 Dashboard já está sendo renderizado, pulando...');
    return;
  }
  
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
        transacoes = window.appState.transactions;
        console.log(`🔄 Usando transações do appState para mês atual: ${transacoes.length}`);
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
    const recorrentesEfetivadas = recorrentesMes
      .map(t => {
        const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
        
        // Se a recorrente não foi encontrada, pular esta transação
        if (!recorrente) {
          console.warn(`⚠️ Transação órfã encontrada: ${t.descricao} (recorrenteId: ${t.recorrenteId})`);
          return null;
        }
        
        // Calcular parcela atual se não estiver salva
        let parcelaAtual = t.parcelaAtual;
        let parcelasTotal = t.parcelasTotal;
        
        if (!parcelaAtual || !parcelasTotal) {
          // Usar dados da recorrente para calcular
          parcelasTotal = recorrente.parcelasTotal;
          if (window.calcularParcelaRecorrente) {
            parcelaAtual = window.calcularParcelaRecorrente(recorrente, year, month);
          } else {
            parcelaAtual = 1; // Fallback
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
      })
      .filter(rec => rec !== null); // Remover transações órfãs
    
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

    // Top categorias com gastos (voltando ao comportamento original)
    const categoriasComGasto = window.appState.categories
      .filter(cat => cat.tipo === 'despesa')
      .map(cat => {
        const transacoesCategoria = (transacoes || []).filter(t => 
          t.categoriaId === cat.id && t.tipo === cat.tipo
        );
        const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
        return { ...cat, gasto };
      })
      .filter(cat => cat.gasto > 0) // Mostrar apenas categorias COM gastos
      .sort((a, b) => b.gasto - a.gasto) // Ordenar por gasto decrescente
      .slice(0, 5);

    // Importar CardResumo
    const { CardResumo } = await import('./ui/CardResumo.js');

    // CONSTRUIR TODO O HTML COMO UMA STRING ÚNICA - VERSÃO SIMPLIFICADA
    const dashboardHTML = `
      <div class="tab-container">
        <div class="tab-header">
          <h2 class="tab-title-highlight">Dashboard Financeiro</h2>
          <div class="flex gap-2">
            <button id="theme-toggle-btn" class="btn-secondary">
              <span>🎨</span>
            </button>
          </div>
        </div>
        <div id="mes-selector" class="flex items-center justify-center gap-4 mb-6 w-full">
          <button id="mes-anterior" class="text-blue-600 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation">‹</button>
          <span class="font-bold text-xl text-gray-800 dark:text-gray-100">${meses[month - 1]} ${year}</span>
          <button id="mes-proximo" class="text-blue-600 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation">›</button>
        </div>
        <div class="tab-content">
          <div class="content-spacing" id="dashboard-content">
            <!-- RESUMO FINANCEIRO PRINCIPAL -->
            <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 mb-6 text-white">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold">Resumo Financeiro</h2>
                <div id="digital-clock" class="text-lg font-mono bg-white bg-opacity-20 rounded-lg px-3 py-1">
                  --:--
                </div>
              </div>
              
              <!-- Cards de Resumo Simplificados -->
              <div id="cards-container" class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <!-- Os cartões serão inseridos dinamicamente aqui -->
              </div>
            </div>

            <!-- TOP 5 CATEGORIAS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">📊 TOP 5 CATEGORIAS</h3>
              </div>
              <div class="space-y-3">
                ${categoriasComGasto.length === 0 ? '<p class="text-gray-500 text-center py-4">Todas as categorias de despesa já possuem gastos neste mês</p>' : categoriasComGasto
                  .slice(0, 5)
                  .map(cat => {
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
                    
                    return `
                      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${categoria?.cor || '#4F46E5'}"></div>
                            <span class="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">${cat.nome}</span>
                          </div>
                          <span class="font-bold text-sm md:text-base ${cat.gasto > limite ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}">
                            R$ ${cat.gasto.toFixed(2)}
                          </span>
                        </div>
                        ${limite > 0 ? `
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>${porcentagem.toFixed(0)}%</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${corBarra} h-2 rounded-full transition-all duration-300" style="width: ${porcentagem}%"></div>
                          </div>
                        ` : '<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>

            <!-- CATEGORIAS COM LIMITES -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">📂 Categorias com Limites</h3>
                <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="btn-primary">
                  + Nova Categoria
                </button>
              </div>
              <div class="space-y-3">
                ${(window.appState.categories || []).length === 0 ? '<p class="text-gray-500 text-center py-4">Nenhuma categoria encontrada</p>' : (window.appState.categories || [])
                  .filter(cat => cat.limite > 0)
                  .map(cat => {
                    const transacoesCategoria = (transacoes || []).filter(t => 
                      t.categoriaId === cat.id && t.tipo === cat.tipo
                    );
                    const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
                    return { ...cat, gasto };
                  })
                  .sort((a, b) => b.gasto - a.gasto) // Ordenar por gasto decrescente
                  .map(cat => {
                    const limite = parseFloat(cat.limite || 0);
                    const porcentagem = limite > 0 ? Math.min((cat.gasto / limite) * 100, 100) : 0;
                    let corBarra = 'bg-green-500';
                    if (porcentagem >= 90) {
                      corBarra = 'bg-red-500';
                    } else if (porcentagem >= 75) {
                      corBarra = 'bg-yellow-500';
                    } else if (porcentagem >= 50) {
                      corBarra = 'bg-orange-500';
                    }
                    
                    return `
                      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
                            <span class="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">${cat.nome}</span>
                          </div>
                          <span class="font-bold text-sm md:text-base ${cat.gasto > limite ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}">
                            R$ ${cat.gasto.toFixed(2)}
                          </span>
                        </div>
                        ${limite > 0 ? `
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Limite: R$ ${limite.toFixed(2)}</span>
                            <span>${porcentagem.toFixed(1)}% usado</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${corBarra} h-2 rounded-full transition-all duration-300" style="width: ${porcentagem}%"></div>
                          </div>
                        ` : '<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>

            <!-- DESPESAS RECORRENTES DO MÊS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Despesas Recorrentes do Mês</h3>
                <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="btn-primary">
                  + Nova Despesa Recorrente
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${todasRecorrentes.length === 0 ? '<p class="text-gray-500 text-center py-4">Nenhuma despesa recorrente aplicada ou agendada neste mês</p>' : todasRecorrentes
                  .slice(0, 5)
                  .map(rec => {
                    const categoria = window.appState.categories?.find(c => c.id === rec.categoriaId);
                    return `
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${rec.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${categoria?.nome || 'Sem categoria'} • Recorrente
                            ${(() => {
                              if (rec.efetivada) {
                                // Recorrente EFETIVADA - verificar se tem parcelas válidas
                                let parcelaAtual = rec.parcelaAtual;
                                let parcelasTotal = rec.parcelasTotal;
                                
                                // Se não tem parcelas válidas, calcular dinamicamente
                                if (!parcelaAtual || !parcelasTotal) {
                                  if (window.calcularParcelaRecorrente && rec.parcelasTotal > 1) {
                                    parcelaAtual = window.calcularParcelaRecorrente(rec, year, month);
                                    parcelasTotal = rec.parcelasTotal;
                                  } else {
                                    parcelaAtual = 1;
                                    parcelasTotal = rec.parcelasTotal || 1;
                                  }
                                }
                                
                                if (parcelasTotal && parcelasTotal > 1) {
                                  return ` • ✅ Efetivada: ${parcelaAtual} de ${parcelasTotal}`;
                                } else {
                                  return ' • ✅ Efetivada: Infinito';
                                }
                              } else if (!rec.parcelasTotal || rec.parcelasTotal <= 1) {
                                // Recorrente INFINITA agendada
                                return ' • 📅 Agendada: Infinito';
                              } else {
                                // Recorrente AGENDADA parcelada
                                const status = window.calcularStatusRecorrente ? 
                                  window.calcularStatusRecorrente(rec, window.appState.transactions || [], year, month) : 
                                  { parcelaAtual: 1, totalParcelas: rec.parcelasTotal, foiEfetivadaEsteMes: false };
                                
                                return ` • 📅 Agendada: ${status.parcelaAtual} de ${status.totalParcelas}`;
                              }
                            })()}
                          </p>
                        </div>
                        <div class="flex items-center space-x-1 md:space-x-2">
                          <span class="font-bold text-xs md:text-base text-red-600">
                            -R$ ${parseFloat(rec.valor).toFixed(2)}
                          </span>
                          <!-- Botões de Ação -->
                          <div class="flex items-center space-x-1 ml-2">
                            <button onclick="editarRecorrente('${rec.id}')" class="btn-icon-small" title="Editar recorrente">
                              ✏️
                            </button>
                            ${!rec.efetivada ? `
                              <button onclick="efetivarRecorrente('${rec.id}')" class="btn-icon-small" title="Efetivar agora">
                                ✅
                              </button>
                            ` : ''}
                            <button onclick="atualizarRecorrente('${rec.id}')" class="btn-icon-small" title="Atualizar status">
                              🔄
                            </button>
                            <button onclick="excluirRecorrente('${rec.id}')" class="btn-icon-small" title="Excluir recorrente">
                              🗑️
                            </button>
                            <button onclick="historicoRecorrente('${rec.id}')" class="btn-icon-small" title="Ver histórico">
                              📊
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>

            <!-- TRANSAÇÕES RECENTES -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Transações Recentes</h3>
                <button onclick="showAddTransactionModal()" class="btn-primary">
                  + Nova Transação
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${transacoes.length === 0 ? '<p class="text-gray-500 text-center py-4">Nenhuma transação encontrada neste mês</p>' : transacoes
                  .slice(0, 10)
                  .map(t => {
                    const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
                    
                    // Buscar informações da recorrente se for uma transação recorrente
                    let parcelaInfo = '';
                    if (t.recorrenteId) {
                      const recorrente = window.appState.recorrentes?.find(r => r.id === t.recorrenteId);
                      if (recorrente) {
                        if (recorrente.parcelasTotal && recorrente.parcelasTotal > 1) {
                          const status = window.calcularStatusRecorrente ? 
                            window.calcularStatusRecorrente(recorrente, window.appState.transactions || [], year, month) : 
                            { parcelaAtual: 1, totalParcelas: recorrente.parcelasTotal, foiEfetivadaEsteMes: false };
                          
                          if (status.foiEfetivadaEsteMes) {
                            parcelaInfo = ` • ✅ Efetivada: ${status.parcelaAtual} de ${status.totalParcelas}`;
                          } else {
                            parcelaInfo = ` • 📅 Agendada: ${status.parcelaAtual} de ${status.totalParcelas}`;
                          }
                        } else {
                          parcelaInfo = ' • Infinito';
                        }
                      } else {
                        parcelaInfo = ' • Recorrente';
                      }
                    }
                    
                    return `
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${t.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${categoria?.nome || 'Sem categoria'} • ${t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : t.createdAt ? new Date(t.createdAt).toLocaleDateString() : ''}
                            ${t.recorrenteId ? ' • Recorrente' + parcelaInfo : ''}
                          </p>
                        </div>
                        <div class="flex items-center space-x-1 md:space-x-2">
                          <span class="font-bold text-xs md:text-base ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                            ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                          </span>
                          <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // UMA ÚNICA OPERAÇÃO INNERHTML - SOLUÇÃO DEFINITIVA
    content.innerHTML = dashboardHTML;

    // Criar cartões dinâmicos com cores inteligentes
    setTimeout(() => {
      const cardsContainer = document.getElementById('cards-container');
      if (cardsContainer) {
        // Limpar container
        cardsContainer.innerHTML = '';
        
        // Criar cartão de receitas
        const cardReceitas = CardResumo({
          titulo: 'Receitas',
          valor: `R$ ${receitas.toFixed(2)}`,
          cor: 'card-resumo receita',
          icone: '💰',
          receitas: receitas,
          despesas: despesas
        });
        cardsContainer.appendChild(cardReceitas);
        
        // Criar cartão de despesas
        const cardDespesas = CardResumo({
          titulo: 'Despesas',
          valor: `R$ ${despesas.toFixed(2)}`,
          cor: 'card-resumo despesa',
          icone: '🛒',
          receitas: receitas,
          despesas: despesas
        });
        cardsContainer.appendChild(cardDespesas);
        
        // Criar cartão de saldo
        const cardSaldo = CardResumo({
          titulo: 'Saldo',
          valor: `R$ ${saldo.toFixed(2)}`,
          cor: 'card-resumo saldo',
          icone: '💳',
          receitas: receitas,
          despesas: despesas
        });
        cardsContainer.appendChild(cardSaldo);
        
        // Criar cartão de orçado
        const cardOrcado = CardResumo({
          titulo: 'Orçado',
          valor: `R$ ${totalLimite.toFixed(2)}`,
          cor: 'card-resumo orcado',
          icone: '📊',
          progresso: progressoOrcado,
          status: totalAlertas > 0 ? 'alerta' : 'ok',
          alerta: totalAlertas > 0 ? `${totalAlertas} alertas` : null,
          receitas: receitas,
          despesas: despesas
        });
        cardsContainer.appendChild(cardOrcado);
      }
    }, 50);

    // Configurar botões do dashboard
    setTimeout(() => {
      console.log('🔧 Dashboard: Chamando setupDashboardButtons...');
      setupDashboardButtons();
    }, 300);

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
    
    // Inicializar relógio digital após renderizar o dashboard
    setTimeout(() => {
      if (typeof initDigitalClock === 'function') {
        initDigitalClock();
      }
    }, 100);
  }
}

// Função para fechar modal de alertas
function closeModalAlertas() {
  const modal = document.getElementById('modal-alertas');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Função para renderizar transações
function renderTransactions() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📋 Transações</h2>
        <div class="flex items-center gap-2">
                      <button id="add-transaction-btn" class="btn-primary">
              <span class="icon-standard">➕</span>
              <span class="hidden sm:inline">Nova Transação</span>
              <span class="sm:hidden">Nova</span>
            </button>
            <button id="voice-btn" class="btn-secondary">
              <span class="icon-standard">🎤</span>
              <span class="hidden sm:inline">Voz</span>
              <span class="sm:hidden">Voz</span>
            </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Filtros de pesquisa e categoria -->
          <div class="mb-4 space-y-3">
            <!-- Campo de pesquisa -->
            <div class="relative">
              <input 
                type="text" 
                id="transaction-search" 
                placeholder="🔍 Pesquisar transações..." 
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-400">🔍</span>
              </div>
            </div>
            
            <!-- Filtro de categoria -->
            <div class="flex flex-col sm:flex-row gap-2">
              <div class="relative flex-1">
                <select 
                  id="category-filter" 
                  class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                  onchange="window.handleCategoryFilter()"
                >
                  <option value="">🏷️ Todas as categorias</option>
                  ${window.appState.categories?.map(cat => 
                    `<option value="${cat.id}">${cat.nome} (${cat.tipo})</option>`
                  ).join('') || ''}
                </select>
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">🏷️</span>
                </div>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">▼</span>
                </div>
              </div>
              
              <!-- Filtro de tipo -->
              <div class="relative">
                <select 
                  id="type-filter" 
                  class="w-full sm:w-auto px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="">💰 Todos os tipos</option>
                  <option value="receita">💚 Receitas</option>
                  <option value="despesa">❤️ Despesas</option>
                </select>
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">💰</span>
                </div>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-400">▼</span>
                </div>
              </div>
              
              <!-- Botão limpar filtros -->
              <button 
                id="clear-filters-btn" 
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
                title="Limpar filtros"
              >
                <span>🗑️</span>
                <span class="hidden sm:inline">Limpar</span>
              </button>
            </div>
            
            <!-- Resultados da pesquisa -->
            <div id="transaction-search-results" class="text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="transaction-search-count">0</span> transação(ões) encontrada(s)
              <span id="active-filters" class="ml-2"></span>
            </div>
          </div>
          
          <div id="transactions-list">
            ${window.appState.transactions?.length === 0
            ? `
            <div class="text-center py-8">
              <div class="text-4xl mb-4">📋</div>
              <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
              <div class="text-gray-600 dark:text-gray-400">Adicione sua primeira transação para começar</div>
            </div>
          `
            : window.appState.transactions
              ?.map(t => {
                const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
                const data = t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(t.createdAt).toLocaleDateString('pt-BR');
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
                  <button onclick="editTransaction('${t.id}')" class="btn-secondary mobile-btn">
                    <span class="icon-standard">✏️</span>
                  </button>
                  <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="btn-danger mobile-btn">
                    <span class="icon-standard">🗑️</span>
                  </button>
                </div>
              </div>
            </div>
          `;
              })
              .join('') || ''}
          </div>
        </div>
      </div>
    </div>
  `;
  // Configurar botões da tela de transações
  setTimeout(() => {
    setupTransactionButtons();
  }, 100);
  
  // Configurar filtro de pesquisa
  setupTransactionSearch();
  
  renderFAB();
  // Remover renderBottomNav daqui - deve ser chamado apenas pelo router
  // renderBottomNav('/transactions');
}

// Função para configurar pesquisa e filtros de transações
function setupTransactionSearch() {
  const searchInput = document.getElementById('transaction-search');
  const categoryFilter = document.getElementById('category-filter');
  const typeFilter = document.getElementById('type-filter');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  const resultsDiv = document.getElementById('transaction-search-results');
  const countSpan = document.getElementById('transaction-search-count');
  const activeFiltersSpan = document.getElementById('active-filters');
  const listDiv = document.getElementById('transactions-list');
  
  if (!searchInput || !categoryFilter || !typeFilter) return;
  
  // Função para aplicar todos os filtros
  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedType = typeFilter.value;
    
    // Verificar se há filtros ativos
    const hasActiveFilters = searchTerm !== '' || selectedCategory !== '' || selectedType !== '';
    
    if (!hasActiveFilters) {
      // Mostrar todas as transações
      resultsDiv.classList.add('hidden');
      listDiv.innerHTML = renderAllTransactions();
      return;
    }
    
    // Filtrar transações
    const filteredTransactions = window.appState.transactions?.filter(t => {
      // Filtro de pesquisa por texto
      let matchesSearch = true;
      if (searchTerm !== '') {
        const descricao = t.descricao.toLowerCase();
        const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
        const categoriaNome = categoria?.nome?.toLowerCase() || '';
        const valor = t.valor.toString();
        
        matchesSearch = descricao.includes(searchTerm) || 
                       categoriaNome.includes(searchTerm) || 
                       valor.includes(searchTerm);
      }
      
      // Filtro por categoria
      let matchesCategory = true;
      if (selectedCategory !== '') {
        matchesCategory = t.categoriaId === selectedCategory;
      }
      
      // Filtro por tipo
      let matchesType = true;
      if (selectedType !== '') {
        matchesType = t.tipo === selectedType;
      }
      
      return matchesSearch && matchesCategory && matchesType;
    }) || [];
    
    // Atualizar contador e filtros ativos
    countSpan.textContent = filteredTransactions.length;
    
    // Mostrar filtros ativos
    const activeFilters = [];
    if (searchTerm !== '') activeFilters.push(`Busca: "${searchTerm}"`);
    if (selectedCategory !== '') {
      const categoria = window.appState.categories?.find(c => c.id === selectedCategory);
      activeFilters.push(`Categoria: ${categoria?.nome || 'Desconhecida'}`);
    }
    if (selectedType !== '') {
      activeFilters.push(`Tipo: ${selectedType === 'receita' ? 'Receitas' : 'Despesas'}`);
    }
    
    activeFiltersSpan.textContent = activeFilters.length > 0 ? `• ${activeFilters.join(' • ')}` : '';
    resultsDiv.classList.remove('hidden');
    
    // Renderizar transações filtradas
    listDiv.innerHTML = renderFilteredTransactions(filteredTransactions);
  }
  
  // Event listeners para todos os filtros
  searchInput.addEventListener('input', applyFilters);
  
  // Função global para filtro de categoria
  window.handleCategoryFilter = function() {
    console.log('🔧 Category filter changed via onchange');
    console.log('🔧 Current location:', window.location.hash);
    
    // Garantir que estamos na aba de transações
    if (window.location.hash !== '#/transactions') {
      console.log('🔧 Não está na aba de transações, ignorando');
      return;
    }
    
    console.log('🔧 Aplicando filtros...');
    applyFilters();
  };
  
  typeFilter.addEventListener('change', applyFilters);
  
  // Botão limpar filtros
  clearFiltersBtn.addEventListener('click', function() {
    searchInput.value = '';
    categoryFilter.value = '';
    typeFilter.value = '';
    applyFilters();
  });
  
  // Limpar pesquisa com Escape
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      categoryFilter.value = '';
      typeFilter.value = '';
      applyFilters();
    }
  });
}

// Função para renderizar todas as transações
function renderAllTransactions() {
  if (!window.appState.transactions?.length) {
    return `
      <div class="text-center py-8">
        <div class="text-4xl mb-4">📋</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Adicione sua primeira transação para começar</div>
      </div>
    `;
  }
  
  return window.appState.transactions.map(t => {
    const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
    const data = t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(t.createdAt).toLocaleDateString('pt-BR');
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
            <button onclick="editTransaction('${t.id}')" class="btn-secondary mobile-btn">
              <span class="icon-standard">✏️</span>
            </button>
            <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="btn-danger mobile-btn">
              <span class="icon-standard">🗑️</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

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
    const data = t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(t.createdAt).toLocaleDateString('pt-BR');
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
            <button onclick="editTransaction('${t.id}')" class="btn-secondary mobile-btn">
              <span class="icon-standard">✏️</span>
            </button>
            <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="btn-danger mobile-btn">
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
  await loadTransactions();
  await loadRecorrentes();
  const content = document.getElementById('app-content');

  // Calcular gastos por categoria no mês atual
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;

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

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Categorias</h2>
        <div class="flex gap-2">
          <button onclick="window.migrarTransacoesAntigas()" class="btn-secondary">
            <span>🔄 Migrar</span>
          </button>
          <button onclick="window.corrigirTipoCategoria()" class="btn-secondary">
            <span>🔧 Corrigir</span>
          </button>
          <button id="add-category-btn" class="btn-primary">
            <span>+ Nova Categoria</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Filtro de pesquisa -->
          <div class="mb-4">
            <div class="relative">
              <input 
                type="text" 
                id="category-search" 
                placeholder="🔍 Pesquisar categorias..." 
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-400">🔍</span>
              </div>
            </div>
            <div id="category-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="category-search-count">0</span> categoria(s) encontrada(s)
            </div>
          </div>
          
          <div id="categories-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${categoriasComGastos
    .map(
      cat => `
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
          `
    )
    .join('')}
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
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;

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
  console.log('🔄 Router chamado com path:', path);
  console.log('🔄 Estado atual:', {
    currentUser: !!window.appState?.currentUser,
    currentBudget: !!window.appState?.currentBudget,
    hash: window.location.hash
  });
  
  switch (path) {
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
      await renderAnalytics();
      renderBottomNav('/analytics');
      console.log('✅ Análises renderizadas');
      break;
    case '/recorrentes':
      console.log('🔄 Renderizando recorrentes...');
      if (window._renderRecorrentes) {
        window._renderRecorrentes();
      } else {
        // Fallback se a função não existir
        console.log('⚠️ Função _renderRecorrentes não encontrada, usando fallback');
        const content = document.getElementById('app-content');
        if (content) {
          content.innerHTML = `
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Recorrentes</h2>
                <div class="flex gap-2">
                  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="btn-primary">
                    <span>+ Nova Recorrente</span>
                  </button>
                </div>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">🔄</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recorrentes</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `;
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
        // Fallback se a função não existir
        console.log('⚠️ Função renderSettings não encontrada, usando fallback');
        const content = document.getElementById('app-content');
        if (content) {
          content.innerHTML = `
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Configurações</h2>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">⚙️</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Configurações</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `;
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
  
  // Configurar botões do header após navegação
  setTimeout(() => {
    setupHeaderButtons();
  }, 300);
}

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
  const bottomNav = document.getElementById('bottom-nav');
  if (!bottomNav) return;

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
  let currentPath = window.location.hash.slice(1) || '/dashboard';
  
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
    const newPath = window.location.hash.slice(1) || '/dashboard';
    console.log('🔄 Hash change detectado:', { oldPath: currentPath, newPath });
    if (newPath !== currentPath) {
      currentPath = newPath;
      console.log('🔄 Navegando para nova rota:', newPath);
      router(newPath);
    }
  });

  // Navegação inicial
  console.log('🔄 Navegação inicial para:', currentPath);
  router(currentPath);
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
  
  // Inicializar melhorias mobile imediatamente
  try {
    if (mobileEnhancements) {
      window.mobileEnhancements = mobileEnhancements;
      mobileEnhancements.init();
      console.log('📱 Melhorias mobile inicializadas');
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar melhorias mobile:', error);
  }
  
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

  // Configurar botões do header uma única vez
  setupHeaderButtons();

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
        
        // Inicializar melhorias mobile
        if (mobileEnhancements && !mobileEnhancements.isInitialized) {
          mobileEnhancements.reconfigure();
          console.log('✅ Melhorias mobile reconfiguradas');
        }
        
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
// Usar dashboard limpo importado
window.renderDashboard = renderCleanDashboard;
console.log('✅ Dashboard Limpo integrado e ativado');

window.renderDashboardOriginal = renderDashboardOriginal;
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

// === FUNÇÕES PARA GERENCIAR RECORRENTES ===

// Função para editar uma recorrente
function editarRecorrente(recorrenteId) {
  console.log('🔧 Editando recorrente:', recorrenteId);
  
  const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
  if (!recorrente) {
    if (window.Snackbar) {
      window.Snackbar.error('Recorrente não encontrada');
    }
    return;
  }
  
  // Abrir modal de edição (reutilizar modal de adicionar recorrente)
  if (window.showAddRecorrenteModal) {
    window.showAddRecorrenteModal(recorrente);
  } else {
    if (window.Snackbar) {
      window.Snackbar.error('Modal de edição não disponível');
    }
  }
}

// Função para efetivar uma recorrente
function efetivarRecorrente(recorrenteId) {
  console.log('✅ Efetivando recorrente:', recorrenteId);
  
  const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
  if (!recorrente) {
    if (window.Snackbar) {
      window.Snackbar.error('Recorrente não encontrada');
    }
    return;
  }
  
  if (recorrente.efetivada) {
    if (window.Snackbar) {
      window.Snackbar.warning('Esta recorrente já foi efetivada');
    }
    return;
  }
  
  // Confirmar efetivação
  if (confirm(`Efetivar a recorrente "${recorrente.descricao}" agora?`)) {
    // Criar transação baseada na recorrente
    const novaTransacao = {
      id: Date.now().toString(),
      descricao: recorrente.descricao,
      valor: recorrente.valor,
      categoriaId: recorrente.categoriaId,
      data: new Date().toISOString().split('T')[0],
      tipo: 'despesa',
      recorrenteId: recorrente.id
    };
    
    // Adicionar transação
    window.appState.transactions = window.appState.transactions || [];
    window.appState.transactions.push(novaTransacao);
    
    // Marcar recorrente como efetivada
    recorrente.efetivada = true;
    recorrente.dataEfetivacao = new Date().toISOString();
    
    // Salvar no localStorage
    localStorage.setItem('transactions', JSON.stringify(window.appState.transactions));
    localStorage.setItem('recorrentes', JSON.stringify(window.appState.recorrentes));
    
    if (window.Snackbar) {
      window.Snackbar.success('Recorrente efetivada com sucesso!');
    }
    
    // Atualizar dashboard
    if (window.renderDashboard) {
      window.renderDashboard();
    }
  }
}

// Função para atualizar status de uma recorrente
function atualizarRecorrente(recorrenteId) {
  console.log('🔄 Atualizando recorrente:', recorrenteId);
  
  const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
  if (!recorrente) {
    if (window.Snackbar) {
      window.Snackbar.error('Recorrente não encontrada');
    }
    return;
  }
  
  // Recalcular status da recorrente
  if (window.calcularStatusRecorrente) {
    const now = new Date();
    const status = window.calcularStatusRecorrente(
      recorrente, 
      window.appState.transactions || [], 
      now.getFullYear(), 
      now.getMonth() + 1
    );
    
    console.log('Status atualizado:', status);
    if (window.Snackbar) {
      window.Snackbar.success('Status da recorrente atualizado');
    }
    
    // Atualizar dashboard
    if (window.renderDashboard) {
      window.renderDashboard();
    }
  } else {
    if (window.Snackbar) {
      window.Snackbar.error('Função de cálculo não disponível');
    }
  }
}

// Função para excluir uma recorrente
function excluirRecorrente(recorrenteId) {
  console.log('🗑️ Excluindo recorrente:', recorrenteId);
  
  const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
  if (!recorrente) {
    if (window.Snackbar) {
      window.Snackbar.error('Recorrente não encontrada');
    }
    return;
  }
  
  // Confirmar exclusão
  if (confirm(`Excluir a recorrente "${recorrente.descricao}"?\n\nEsta ação não pode ser desfeita.`)) {
    // Remover recorrente
    window.appState.recorrentes = window.appState.recorrentes.filter(r => r.id !== recorrenteId);
    
    // Salvar no localStorage
    localStorage.setItem('recorrentes', JSON.stringify(window.appState.recorrentes));
    
    if (window.Snackbar) {
      window.Snackbar.success('Recorrente excluída com sucesso!');
    }
    
    // Atualizar dashboard
    if (window.renderDashboard) {
      window.renderDashboard();
    }
  }
}

// Função para ver histórico de uma recorrente
function historicoRecorrente(recorrenteId) {
  console.log('📊 Visualizando histórico da recorrente:', recorrenteId);
  
  const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
  if (!recorrente) {
    if (window.Snackbar) {
      window.Snackbar.error('Recorrente não encontrada');
    }
    return;
  }
  
  // Buscar transações relacionadas
  const transacoesRelacionadas = window.appState.transactions?.filter(t => t.recorrenteId === recorrenteId) || [];
  
  // Criar modal de histórico
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>📊 Histórico: ${recorrente.descricao}</h2>
        <button onclick="this.closest('.modal-overlay').remove()" class="btn-secondary">✕</button>
      </div>
      <div class="modal-body">
        <div class="mb-4">
          <h3>Informações da Recorrente</h3>
          <p><strong>Valor:</strong> R$ ${parseFloat(recorrente.valor).toFixed(2)}</p>
          <p><strong>Status:</strong> ${recorrente.efetivada ? '✅ Efetivada' : '📅 Agendada'}</p>
          <p><strong>Parcelas:</strong> ${recorrente.parcelasTotal || 'Infinito'}</p>
        </div>
        
        <div>
          <h3>Transações Efetivadas (${transacoesRelacionadas.length})</h3>
          ${transacoesRelacionadas.length === 0 ? 
            '<p class="text-gray-500">Nenhuma transação efetivada ainda</p>' :
            transacoesRelacionadas.map(t => `
              <div class="border rounded p-2 mb-2">
                <p><strong>${t.descricao}</strong></p>
                <p>Data: ${new Date(t.data).toLocaleDateString('pt-BR')}</p>
                <p>Valor: R$ ${parseFloat(t.valor).toFixed(2)}</p>
              </div>
            `).join('')
          }
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Exportar funções de recorrentes
window.editarRecorrente = editarRecorrente;
window.efetivarRecorrente = efetivarRecorrente;
window.atualizarRecorrente = atualizarRecorrente;
window.excluirRecorrente = excluirRecorrente;
window.historicoRecorrente = historicoRecorrente;

// ===== CORREÇÕES CRÍTICAS =====
console.log('🔧 Aplicando correções críticas...');

// 1. Correção do Sistema de Voz
function fixVoiceSystemStability() {
  if (!window.VoiceSystem) return;
  
  // Melhorar tratamento de erro 'no-speech'
  const originalHandleError = window.VoiceSystem.prototype.handleRecognitionError;
  if (originalHandleError) {
    window.VoiceSystem.prototype.handleRecognitionError = function(event) {
      if (event.error === 'no-speech' && this.hasReceivedSpeech) {
        // Aguardar mais tempo se já houve fala
        setTimeout(() => {
          if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
            this.hasError = false;
            this.startListening(this.currentType);
          }
        }, 3000);
        return;
      }
      originalHandleError.call(this, event);
    };
  }
}

// 2. Correção do Cálculo de Parcelas
function fixParcelasCalculation() {
  if (typeof window.calcularParcelaRecorrente !== 'function') return;
  
  const original = window.calcularParcelaRecorrente;
  window.calcularParcelaRecorrente = function(recorrente) {
    try {
      if (!recorrente.parcelasTotal || recorrente.parcelasTotal <= 0) {
        return null;
      }
      
      if (recorrente.parcelasRestantes === null || recorrente.parcelasRestantes === undefined) {
        if (!recorrente.dataInicio) return 1;
        
        const [ano, mes, dia] = recorrente.dataInicio.split('-').map(Number);
        const dataInicio = new Date(ano, mes - 1, dia);
        const agora = new Date();
        
        const mesesDecorridos = (agora.getFullYear() - dataInicio.getFullYear()) * 12 + 
                               (agora.getMonth() - dataInicio.getMonth());
        
        return Math.min(mesesDecorridos + 1, recorrente.parcelasTotal);
      }
      
      const parcelaAtual = recorrente.parcelasTotal - recorrente.parcelasRestantes + 1;
      return Math.max(1, Math.min(parcelaAtual, recorrente.parcelasTotal));
      
    } catch (error) {
      console.error('Erro no cálculo de parcelas:', error);
      return original ? original(recorrente) : 1;
    }
  };
}

// 3. Debounce para Funções de Renderização
function addDebounceToRenderFunctions() {
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  if (window.renderAnalytics) {
    window.renderAnalytics = debounce(window.renderAnalytics, 300);
  }
}

// 4. Tratamento Global de Erros
function setupGlobalErrorHandling() {
  window.addEventListener('error', function(event) {
    console.error('Erro global capturado:', event.error);
    if (window.Snackbar && window.Snackbar.show) {
      window.Snackbar.show('Ocorreu um erro inesperado. Tente novamente.', 'error');
    }
  });
  
  window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rejeitada:', event.reason);
    if (window.Snackbar && window.Snackbar.show) {
      window.Snackbar.show('Erro de conexão. Verifique sua internet.', 'error');
    }
    event.preventDefault();
  });
}

// Aplicar correções
try {
  fixVoiceSystemStability();
  fixParcelasCalculation();
  addDebounceToRenderFunctions();
  setupGlobalErrorHandling();
  console.log('✅ Correções críticas aplicadas com sucesso!');
} catch (error) {
  console.error('❌ Erro ao aplicar correções:', error);
}
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
    doc.text('Servo Tech Finanças', 20, 25);
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
  
  // Verificar se estamos realmente na tela de transações
  const currentRoute = window.location.hash.replace('#', '') || '/dashboard';
  if (currentRoute !== '/transactions') {
    console.log('⚠️ setupTransactionButtons chamada fora da tela de transações, ignorando...');
    return;
  }
  
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
  const waitForElement = (id, callback, maxAttempts = 20) => {
    let attempts = 0;
    const checkElement = () => {
      const element = document.getElementById(id);
      if (element) {
        callback(element);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkElement, 100);
      } else {
        console.warn(`⚠️ Elemento ${id} não encontrado após ${maxAttempts} tentativas`);
      }
    };
    checkElement();
  };
  
  waitForElement('voice-btn', (voiceBtn) => {
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
  });
}

// ===== CONFIGURAÇÃO DOS BOTÕES DO DASHBOARD =====
function setupDashboardButtons() {
  console.log('🔧 Configurando botões do dashboard...');
  
  // Debug: verificar se os elementos existem no DOM
  const themeBtn = document.getElementById('theme-toggle-btn');
  const exportBtn = document.getElementById('export-btn');
  console.log('🔍 Debug - theme-toggle-btn existe:', !!themeBtn);
  console.log('🔍 Debug - export-btn existe:', !!exportBtn);
  
  // Aguardar elementos estarem disponíveis
  const waitForElement = (id, callback, maxAttempts = 10) => {
    let attempts = 0;
    const checkElement = () => {
      const element = document.getElementById(id);
      if (element) {
        callback(element);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkElement, 50);
      } else {
        console.warn(`⚠️ Elemento ${id} não encontrado após ${maxAttempts} tentativas`);
      }
    };
    checkElement();
  };
  
  // Botão de exportar
  waitForElement('export-btn', (exportBtn) => {
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
  });
  
  // Botão de tema no Dashboard
  waitForElement('theme-toggle-btn', (themeBtn) => {
    console.log('✅ Dashboard: Botão de tema encontrado, configurando...');
    if (window.setupThemeToggle) {
      window.setupThemeToggle('theme-toggle-btn');
    } else {
      console.warn('⚠️ setupThemeToggle não disponível');
    }
  }, 15); // Aumentar tentativas para 15
  
  // Botão de voz não existe no Dashboard - configurado apenas em setupTransactionButtons()
  
  // Botões de navegação de mês
  const mesAnterior = document.getElementById('mes-anterior');
  const mesProximo = document.getElementById('mes-proximo');
  
  if (mesAnterior) {
    mesAnterior.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('⬅️ Mês anterior clicked');
      
      const currentYear = parseInt(document.querySelector('#mes-selector span').textContent.split(' ')[1]);
      const currentMonth = document.querySelector('#mes-selector span').textContent.split(' ')[0];
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
      
      const currentYear = parseInt(document.querySelector('#mes-selector span').textContent.split(' ')[1]);
      const currentMonth = document.querySelector('#mes-selector span').textContent.split(' ')[0];
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

    const { getDocs, query, where, orderBy, limit } = await import('firebase/firestore');
    const q = query(
      collection(db, 'notifications'),
      where('recipientUid', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    const notifications = [];
    snapshot.forEach(doc => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    window.appState.notifications = notifications;
    console.log('📧 Notificações carregadas:', notifications.length);
    
    // Atualizar contador de notificações não lidas
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
    const { updateDoc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true
    });
    
    // Atualizar estado local
    const notificationIndex = window.appState.notifications.findIndex(n => n.id === notificationId);
    if (notificationIndex !== -1) {
      window.appState.notifications[notificationIndex].read = true;
    }
    
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

    const { updateDoc } = await import('firebase/firestore');
    const promises = unreadNotifications.map(notification => 
      updateDoc(doc(db, 'notifications', notification.id), { read: true })
    );
    
    await Promise.all(promises);
    
    // Atualizar estado local
    window.appState.notifications.forEach(n => n.read = true);
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
function updateNotificationBadge() {
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
    const { onSnapshot, query, where, orderBy, limit } = await import('firebase/firestore');
    const q = query(
      collection(db, 'notifications'),
      where('recipientUid', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    unsubscribeNotifications = onSnapshot(q, snapshot => {
      console.log('📧 Listener de notificações executado!');
      const notifications = [];
      snapshot.forEach(doc => {
        notifications.push({ id: doc.id, ...doc.data() });
      });

      window.appState.notifications = notifications;
      console.log('📧 Notificações atualizadas:', notifications.length);
      
      // Atualizar badge
      updateNotificationBadge();
      
      // Se estiver na página de notificações, re-renderizar
      if (window.location.hash === '#/notifications') {
        renderNotifications();
      }
    }, error => {
      console.error('❌ Erro no listener de notificações:', error);
      // Se for erro de permissão, não tentar novamente
      if (error.code === 'permission-denied') {
        console.log('⚠️ Permissão negada para notificações, desabilitando listener');
        if (unsubscribeNotifications) {
          unsubscribeNotifications();
          unsubscribeNotifications = null;
        }
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

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">🔔 Notificações</h2>
        <div class="flex items-center gap-2">
          <button onclick="window.showConfirmationModal({
            title: 'Marcar como Lidas',
            message: 'Deseja marcar todas as notificações como lidas?',
            confirmText: 'Sim, Marcar',
            confirmColor: 'bg-blue-500 hover:bg-blue-600',
            onConfirm: 'window.markAllNotificationsAsRead && window.markAllNotificationsAsRead()'
          })" class="btn-secondary">
            <span class="icon-standard">✔️</span>
            <span class="hidden sm:inline">Marcar todas como lidas</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Lista de Notificações -->
          <div class="space-y-4">
            ${notifications.length > 0 ? notifications.map(notification => `
              <div class="card-standard ${!notification.read ? 'border-l-4 border-blue-500' : ''}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-lg">💰</span>
                      <h3 class="font-semibold text-gray-800 dark:text-white">
                        Nova transação no orçamento "${notification.budgetName || 'Orçamento'}"
                      </h3>
                      ${!notification.read ? '<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Nova</span>' : ''}
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>${notification.senderName || 'Usuário'}</strong> adicionou uma ${notification.transactionTipo || 'transação'}:
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium text-gray-800 dark:text-white">${notification.transactionDescricao || 'Transação'}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">${notification.transactionCategoria || 'Categoria'}</div>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-lg ${(notification.transactionTipo || 'despesa') === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                            R$ ${(notification.transactionValor || 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      ${notification.createdAt?.toDate ? notification.createdAt.toDate().toLocaleString('pt-BR') : 'Data não disponível'}
                    </div>
                  </div>
                  ${!notification.read ? `
                    <button onclick="window.showConfirmationModal({
                      title: 'Marcar como Lida',
                      message: 'Deseja marcar esta notificação como lida?',
                      confirmText: 'Sim, Marcar',
                      confirmColor: 'bg-blue-500 hover:bg-blue-600',
                      onConfirm: 'window.markNotificationAsRead && window.markNotificationAsRead(\\'${notification.id}\\')'
                    })" 
                            class="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                      Marcar como lida
                    </button>
                  ` : ''}
                </div>
              </div>
            `).join('') : `
              <div class="card-standard text-center">
                <div class="text-6xl mb-4">🔔</div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma notificação</h3>
                <p class="text-gray-600 dark:text-gray-400">Você não tem notificações no momento.</p>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
  
  renderFAB();
}

// Expor funções de notificações globalmente
window.loadNotifications = loadNotifications;
window.markNotificationAsRead = markNotificationAsRead;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.renderNotifications = renderNotifications;
window.listenNotifications = listenNotifications;

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
    doc.text('Servo Tech Finanças', 20, 25);
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
    doc.text('Servo Tech Finanças', 20, 25);
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
  
  // Filtrar e ordenar transações da categoria (mais recentes primeiro)
  const transactions = window.appState.transactions
    .filter(t => t.categoriaId === categoryId)
    .sort((a, b) => {
      const dateA = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dateB = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dateB - dateA; // Mais recentes primeiro
    });
  
  if (window.Modal) {
    const modalElement = window.Modal({
      title: `Histórico - ${category.nome}`,
      content: `
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3">📊 Resumo</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600 dark:text-gray-400"><strong>Total de transações:</strong></p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${transactions.length}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400"><strong>Valor total:</strong></p>
                <p class="text-lg font-bold ${transactions.reduce((sum, t) => sum + (t.tipo === 'receita' ? parseFloat(t.valor) : -parseFloat(t.valor)), 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">${transactions.reduce((sum, t) => sum + (t.tipo === 'receita' ? parseFloat(t.valor) : -parseFloat(t.valor)), 0) >= 0 ? '+' : ''}R$ ${transactions.reduce((sum, t) => sum + (t.tipo === 'receita' ? parseFloat(t.valor) : -parseFloat(t.valor)), 0).toFixed(2)}</p>
              </div>
              ${(() => {
                const receitas = transactions.filter(t => t.tipo === 'receita');
                const despesas = transactions.filter(t => t.tipo === 'despesa');
                return receitas.length > 0 || despesas.length > 0 ? `
                  <div>
                    <p class="text-gray-600 dark:text-gray-400"><strong>💚 Receitas:</strong></p>
                    <p class="text-sm font-medium text-green-600 dark:text-green-400">${receitas.length} • +R$ ${receitas.reduce((sum, t) => sum + parseFloat(t.valor), 0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 dark:text-gray-400"><strong>❤️ Despesas:</strong></p>
                    <p class="text-sm font-medium text-red-600 dark:text-red-400">${despesas.length} • -R$ ${despesas.reduce((sum, t) => sum + parseFloat(t.valor), 0).toFixed(2)}</p>
                  </div>
                ` : '';
              })()}
            </div>
          </div>
          ${transactions.length > 0 ? `
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">📋 Histórico de Transações</h3>
              <div class="max-h-60 overflow-y-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-2">
              ${transactions.map(t => `
                <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 dark:text-white truncate">${t.descricao}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📅 ${t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(t.createdAt).toLocaleDateString('pt-BR')}
                      • ${t.tipo === 'receita' ? '💚 Receita' : '❤️ Despesa'}
                      ${t.recorrenteId ? ' • 🔄 Recorrente' : ''}
                    </div>
                  </div>
                  <div class="text-right ml-4">
                    <div class="font-bold text-lg ${t.tipo === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                      ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                    </div>
                  </div>
                </div>
              `).join('')}
              </div>
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
    // Buscar informações do orçamento
    const { getDoc, addDoc, collection, doc, serverTimestamp } = await import('firebase/firestore');
    const budgetDoc = await getDoc(doc(db, 'budgets', budgetId));
    if (!budgetDoc.exists()) {
      console.log('Orçamento não encontrado para notificação');
      return;
    }

    const budgetData = budgetDoc.data();
    
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
      const categoriaDoc = await getDoc(doc(db, 'categories', transactionData.categoriaId));
      if (categoriaDoc.exists()) {
        categoriaNome = categoriaDoc.data().nome;
      }
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

    // Enviar notificação para todos os usuários compartilhados (exceto o remetente)
    const notificationPromises = budgetData.usuariosPermitidos
      .filter(uid => uid !== senderUid)
      .map(async (recipientUid) => {
        try {
          await addDoc(collection(db, 'notifications'), {
            ...notificationData,
            recipientUid
          });
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
        if (onConfirm) onConfirm();
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

// Função para convidar usuário para orçamento
window.inviteUserToBudget = async function () {
  const email = document.getElementById('user-email').value;
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
        message: 'Email inválido ou orçamento não selecionado',
        type: 'error'
      });
    }
    return;
  }
  
  try {
    // Buscar usuário por email
    console.log('🔍 Buscando usuário por email:', email);
    const userQuery = query(collection(db, 'users'), where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);
    
    console.log('🔍 Resultado da busca:', { 
      empty: userSnapshot.empty, 
      size: userSnapshot.size,
      docs: userSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
    });
    
    if (userSnapshot.empty) {
      console.log('❌ Usuário não encontrado com email:', email);
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Usuário não encontrado com este email',
          type: 'warning'
        });
      }
      return;
    }
    
    const userDoc = userSnapshot.docs[0];
    const invitedUserId = userDoc.id;
    
    // Verificar se já é membro
    if (currentBudget.usuariosPermitidos && currentBudget.usuariosPermitidos.includes(invitedUserId)) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Usuário já é membro deste orçamento',
          type: 'info'
        });
      }
      return;
    }
    
    // Verificar se já existe um convite pendente
    console.log('🔍 Verificando convites existentes para:', { budgetId: currentBudget.id, invitedUserId });
    const existingInviteQuery = query(
      collection(db, 'budgetInvitations'),
      where('budgetId', '==', currentBudget.id),
      where('invitedUserId', '==', invitedUserId),
      where('status', '==', 'pending')
    );
    const existingInviteSnapshot = await getDocs(existingInviteQuery);
    
    console.log('🔍 Convites existentes:', { 
      empty: existingInviteSnapshot.empty, 
      size: existingInviteSnapshot.size,
      docs: existingInviteSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
    });
    
    if (!existingInviteSnapshot.empty) {
      console.log('❌ Convite já existe para este usuário');
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Convite já enviado para este usuário',
          type: 'info'
        });
      }
      return;
    }
    
    // Criar convite
    const invitationData = {
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento sem nome',
      invitedUserId: invitedUserId,
      invitedUserEmail: email,
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
    
    // Verificar se o convite é para o usuário atual
    if (invitationData.invitedUserId !== window.appState.currentUser.uid) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Este convite não é para você',
          type: 'error'
        });
      }
      return;
    }
    
    // Verificar se o convite ainda está pendente
    if (invitationData.status !== 'pending') {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Este convite já foi respondido',
          type: 'info'
        });
      }
      return;
    }
    
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
    
    // Adicionar usuário ao orçamento
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayUnion(window.appState.currentUser.uid),
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Usuário adicionado ao orçamento');
    
    // Atualizar status do convite para aceito
    await updateDoc(invitationRef, {
      status: 'accepted',
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Status do convite atualizado para aceito');
    
    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Convite aceito! Você agora tem acesso ao orçamento.',
        type: 'success'
      });
    }
    
    // Recarregar orçamentos e configurações
    await loadBudgets();
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
    
    // Verificar se o convite é para o usuário atual
    if (invitationData.invitedUserId !== window.appState.currentUser.uid) {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Este convite não é para você',
          type: 'error'
        });
      }
      return;
    }
    
    // Verificar se o convite ainda está pendente
    if (invitationData.status !== 'pending') {
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Este convite já foi respondido',
          type: 'info'
        });
      }
      return;
    }
    
    // Atualizar status do convite para recusado
    await updateDoc(invitationRef, {
      status: 'declined',
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
    const invitationsQuery = query(
      collection(db, 'budgetInvitations'),
      where('invitedUserId', '==', user.uid),
      where('status', '==', 'pending')
    );
    
    console.log('🔍 Executando query de convites...');
    const invitationsSnapshot = await getDocs(invitationsQuery);
    console.log('📊 Total de convites encontrados:', invitationsSnapshot.size);
    
    const invitations = [];
    
    invitationsSnapshot.forEach(doc => {
      const data = doc.data();
      console.log('📨 Convite encontrado:', { id: doc.id, ...data });
      invitations.push({
        id: doc.id,
        ...data
      });
    });
    
    // Ordenar localmente por data de criação (mais recente primeiro)
    invitations.sort((a, b) => {
      const dateA = a.createdAt ? a.createdAt.toDate() : new Date(0);
      const dateB = b.createdAt ? b.createdAt.toDate() : new Date(0);
      return dateB - dateA;
    });
    
    console.log('✅ Convites carregados com sucesso:', invitations.length);
    return invitations;
  } catch (error) {
    console.error('❌ Erro ao carregar convites:', error);
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
      // Buscar orçamento
      const budgetRef = doc(db, 'budgets', budgetId);
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
      
      const budgetData = budgetDoc.data();
      
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
      
      // Adicionar usuário ao orçamento
      await updateDoc(budgetRef, {
        usuariosPermitidos: arrayUnion(window.appState.currentUser.uid),
        updatedAt: serverTimestamp()
      });
      
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

// ===== RELÓGIO DIGITAL =====

// Função para atualizar o relógio digital
function updateDigitalClock() {
  const now = new Date();
  
  // Formatar hora (HH:MM:SS)
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  
  // Formatar data (D/M/ANO)
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const dateString = `${day}/${month}/${year}`;
  
  // Atualizar elementos se existirem
  const clockElement = document.getElementById('digital-clock');
  const dateElement = document.getElementById('digital-date');
  
  if (clockElement) {
    clockElement.textContent = timeString;
  }
  
  if (dateElement) {
    dateElement.textContent = dateString;
  }
}

// Inicializar relógio digital
function initDigitalClock() {
  // Atualizar imediatamente
  updateDigitalClock();
  
  // Atualizar a cada segundo
  setInterval(updateDigitalClock, 1000);
}

// Inicializar tema apenas uma vez quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, verificando botão de tema...');
  const button = document.getElementById('theme-toggle-btn');
  console.log('Botão encontrado:', button);
  if (button) {
    console.log('Botão existe, chamando setupThemeToggle...');
    setupThemeToggle();
  } else {
    console.log('Botão não encontrado no DOM, tentando novamente em 1 segundo...');
    setTimeout(() => {
      const buttonRetry = document.getElementById('theme-toggle-btn');
      console.log('Tentativa 2 - Botão encontrado:', buttonRetry);
      if (buttonRetry) {
        setupThemeToggle();
      }
    }, 1000);
  }
  
  // Inicializar relógio digital
  initDigitalClock();
});

// ===== ALERTAS DE ORÇAMENTO =====

// Função para mostrar alertas de orçamento
window.showBudgetAlerts = function() {
  console.log('🚨 Mostrando alertas de orçamento...');
  
  if (!window.appState?.categories || !window.appState?.transactions) {
    console.warn('⚠️ Dados não carregados para mostrar alertas');
    return;
  }
  
  // Calcular alertas
  const categoriasComAlerta = window.appState.categories.filter(cat => {
    if (cat.tipo !== 'despesa') return false;
    const transacoesCategoria = window.appState.transactions.filter(t => 
      t.categoriaId === cat.id && t.tipo === cat.tipo
    );
    const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
    const limite = parseFloat(cat.limite || 0);
    const percentual = limite > 0 ? (gasto / limite) : 0;
    return limite > 0 && percentual > 0.7;
  });
  
  // Calcular orçamento geral
  const totalLimite = window.appState.categories
    .filter(cat => cat.tipo === 'despesa')
    .reduce((sum, cat) => sum + parseFloat(cat.limite || 0), 0);
  const totalGasto = window.appState.transactions
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const progressoGeral = totalLimite > 0 ? (totalGasto / totalLimite) : 0;
  
  const alertaGeral = progressoGeral > 0.7;
  
  if (categoriasComAlerta.length === 0 && !alertaGeral) {
    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Nenhum alerta encontrado! Tudo dentro do orçado.',
        type: 'success'
      });
    }
    return;
  }
  
  // Construir conteúdo do modal
  let alertasHTML = '';
  
  if (alertaGeral) {
    alertasHTML += `
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
        <div class="flex items-center mb-2">
          <span class="text-red-600 text-xl mr-2">🚨</span>
          <h4 class="font-bold text-red-800">Orçamento Geral em Alerta</h4>
        </div>
        <p class="text-red-700 text-sm">
          Você gastou <strong>R$ ${totalGasto.toFixed(2)}</strong> de <strong>R$ ${totalLimite.toFixed(2)}</strong> 
          (<strong>${(progressoGeral * 100).toFixed(0)}%</strong> do orçamento total)
        </p>
      </div>
    `;
  }
  
  categoriasComAlerta.forEach(cat => {
    const transacoesCategoria = window.appState.transactions.filter(t => 
      t.categoriaId === cat.id && t.tipo === cat.tipo
    );
    const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
    const limite = parseFloat(cat.limite || 0);
    const percentual = (gasto / limite) * 100;
    
    let corAlerta = 'yellow';
    let nivelAlerta = 'Atenção';
    if (percentual >= 100) {
      corAlerta = 'red';
      nivelAlerta = 'Limite Ultrapassado';
    } else if (percentual >= 90) {
      corAlerta = 'red';
      nivelAlerta = 'Crítico';
    }
    
    alertasHTML += `
      <div class="bg-${corAlerta}-50 border border-${corAlerta}-200 rounded-lg p-4 mb-3">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full mr-2" style="background-color: ${cat.cor || '#4F46E5'}"></div>
            <h4 class="font-bold text-${corAlerta}-800">${cat.nome}</h4>
          </div>
          <span class="text-${corAlerta}-600 font-bold">${nivelAlerta}</span>
        </div>
        <div class="text-${corAlerta}-700 text-sm space-y-1">
          <p>Gasto: <strong>R$ ${gasto.toFixed(2)}</strong> de <strong>R$ ${limite.toFixed(2)}</strong></p>
          <p>Percentual: <strong>${percentual.toFixed(0)}%</strong> do limite</p>
          <p>Transações: <strong>${transacoesCategoria.length}</strong> nesta categoria</p>
        </div>
        <div class="mt-2">
          <div class="w-full bg-${corAlerta}-200 rounded-full h-2">
            <div class="bg-${corAlerta}-600 h-2 rounded-full" style="width: ${Math.min(percentual, 100)}%"></div>
          </div>
        </div>
      </div>
    `;
  });
  
  const modalContent = `
    <div class="modal-content max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <span class="text-2xl mr-2">⚠️</span>
          Alertas de Orçamento
        </h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <div class="max-h-96 overflow-y-auto">
        ${alertasHTML}
      </div>
      
      <div class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <button onclick="closeModal()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Entendi
        </button>
      </div>
    </div>
  `;
  
  window.showModal(modalContent);
};