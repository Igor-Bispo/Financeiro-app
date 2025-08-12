import '../css/styles.css';

import './showAddRecorrenteModal.js';
import { setupThemeToggle } from './ui/ThemeToggle.js';
import { SwipeNavigation } from './ui/SwipeTabs.js';
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
  or
} from 'firebase/firestore';
import { loginWithGoogle } from './auth.js';
// import { salvarHistoricoMensal, limparTransacoes } from './firestore.js';
import {
  getDespesasRecorrentes,
  aplicarRecorrentesDoMes,
  deleteDespesaRecorrente,
  addDespesaRecorrente
} from './recorrentes.js';
import { CardResumo } from './ui/CardResumo.js';
import { Modal } from './ui/Modal.js';
import { Snackbar } from './ui/Snackbar.js';

// Tornar Modal e Snackbar globais para uso em outros módulos
window.Modal = Modal;
window.Snackbar = Snackbar;
window.setupThemeToggle = setupThemeToggle;
import { FAB } from './ui/FAB.js';
import { BottomNav } from './ui/BottomNav.js';
import {
  renderRecorrentes as _renderRecorrentes,
  showHistoricoRecorrente
} from './recorrentes/RecorrentesPage.js';
import { renderDrawer, toggleDrawer } from './ui/Drawer.js';
import { renderLogAplicacoes } from './ui/LogAplicacoes.js';
import {
  buscarOrcamentoPorId,
  buscarUidPorEmail
  // buscarEmailsPorUids // Não utilizado atualmente
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
    // Botão não existe na página atual, não é um erro
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
          <div class="text-sm text-gray-500 dark:text-gray-400">Baixar para a tela inicial</div>
        </div>
      </div>
      <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
    `;
    installBtn.disabled = false;
    installBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    console.log('📱 PWA: Mostrando "Instalação Indisponível"');
    installBtn.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">ℹ️</span>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">Instalação Indisponível</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Use o menu do navegador</div>
        </div>
      </div>
      <span class="text-gray-400">ℹ️</span>
    `;
    installBtn.disabled = true;
    installBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
};

// Configurar persistência da sessão
// setPersistence(auth, browserLocalPersistence);

// Variáveis globais
// window.deferredPrompt = null; // Usado em outras partes do código

window.FirebaseApp = app;
window.FirebaseAuth = auth;
window.FirebaseDB = db;

// Firebase inicializado com sucesso

// Estado global da aplicação
window.appState = {
  currentUser: null,
  transactions: [],
  categories: [],
  budgets: [],
  currentBudget: null,
  recorrentes: []
};

// Função para mostrar/ocultar tela de login
function toggleLoginPage(show) {
  const loginPage = document.getElementById('login-page');
  const mainApp = document.querySelector('.app-container');

  if (show) {
    if (loginPage) {
      loginPage.style.display = 'flex';
      loginPage.style.pointerEvents = 'auto';
      loginPage.style.zIndex = '9999';
      loginPage.style.visibility = 'visible';
      loginPage.style.opacity = '1';
      document.body.classList.add('login-open');
    }
    if (mainApp) {
      mainApp.style.display = 'none';
      mainApp.style.visibility = 'hidden';
    }
  } else {
    if (loginPage) {
      loginPage.style.display = 'none';
      loginPage.style.visibility = 'hidden';
      loginPage.style.opacity = '0';
      loginPage.style.pointerEvents = 'none';
      document.body.classList.remove('login-open');
    }
    if (mainApp) {
      mainApp.style.display = 'flex';
      mainApp.style.visibility = 'visible';
      mainApp.style.opacity = '1';
    }
  }

  // Forçar reflow para garantir que as mudanças sejam aplicadas
  if (loginPage) {
    loginPage.offsetHeight;
  }
  if (mainApp) {
    mainApp.offsetHeight;
  }
}

// Função para atualizar a interface após operações CRUD
async function refreshCurrentView() {
  const currentTab = document
    .querySelector('.nav-item.active')
    ?.getAttribute('data-tab');
  if (currentTab) {
    switch (currentTab) {
    case 'dashboard':
      await loadTransactions();
      await loadCategories();
      await loadBudgets();
      renderDashboard();
      break;
    case 'transactions':
      await loadTransactions();
      renderTransactions();
      break;
    case 'categories':
      await loadCategories();
      renderCategories();
      break;
    case 'settings':
      await loadBudgets();
      await renderSettings();
      break;
    }
  }
}

// Funções de CRUD para transações
async function addTransaction(transactionData) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      throw new Error('Nenhum orçamento selecionado');
    }
    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transactionData,
      userId: user.uid,
      budgetId,
      createdAt: serverTimestamp()
    });

    Snackbar({ message: 'Transação adicionada com sucesso!', type: 'success' });

    // Atualizar o estado local imediatamente
    const newTransaction = {
      id: docRef.id,
      ...transactionData,
      userId: user.uid,
      budgetId
    };
    window.appState.transactions.push(newTransaction);

    // Enviar notificações para outros usuários do orçamento compartilhado
    await sendTransactionNotification(budgetId, user.uid, transactionData);

    // Verificar limites de categoria após adicionar transação
    console.log('🔍 Verificando limites de categoria após nova transação...');
    setTimeout(() => {
      if (window.checkLimitesCategoria) {
        window.checkLimitesCategoria();
      }
    }, 500);

    // Forçar renderização imediata
    if (window.renderDashboard) {
      window.renderDashboard();
    }
    if (window.renderTransactions) {
      window.renderTransactions();
    }

    // Também usar a função global como backup
    if (window.forceUIUpdate) {
      setTimeout(() => window.forceUIUpdate(), 100);
    }

    // Os listeners em tempo real vão atualizar automaticamente
    return docRef;
  } catch (error) {
    Snackbar({
      message: 'Erro ao adicionar transação: ' + error.message,
      type: 'error'
    });
    throw error;
  }
}

async function updateTransaction(transactionId, transactionData) {
  try {
    const docRef = doc(db, 'transactions', transactionId);
    await updateDoc(docRef, transactionData);
    console.log('📝 Transação atualizada no Firestore:', transactionId);
    Snackbar({ message: 'Transação atualizada com sucesso!', type: 'success' });

    // Forçar atualização imediata após salvar
    console.log('🔄 Forçando atualização após edição...');

    // Atualizar o estado local imediatamente
    const transactionIndex = window.appState.transactions.findIndex(
      t => t.id === transactionId
    );
    if (transactionIndex !== -1) {
      window.appState.transactions[transactionIndex] = {
        id: transactionId,
        ...transactionData
      };
      console.log('📊 Estado local atualizado');
    }

    // Forçar renderização imediata
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
      setTimeout(() => window.forceUIUpdate(), 100);
    }

    // Os listeners em tempo real vão atualizar automaticamente
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    Snackbar({
      message: 'Erro ao atualizar transação: ' + error.message,
      type: 'error'
    });
    throw error;
  }
}

async function deleteTransaction(transactionId) {
  try {
    const docRef = doc(db, 'transactions', transactionId);
    await deleteDoc(docRef);
    console.log('🗑️ Transação deletada do Firestore:', transactionId);
    Snackbar({ message: 'Transação deletada com sucesso!', type: 'success' });

    // Forçar atualização imediata após deletar
    console.log('🔄 Forçando atualização após exclusão...');

    // Atualizar o estado local imediatamente
    window.appState.transactions = window.appState.transactions.filter(
      t => t.id !== transactionId
    );
    console.log('📊 Estado local atualizado');

    // Forçar renderização imediata
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
      setTimeout(() => window.forceUIUpdate(), 100);
    }

    // Os listeners em tempo real vão atualizar automaticamente
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    Snackbar({
      message: 'Erro ao deletar transação: ' + error.message,
      type: 'error'
    });
    throw error;
  }
}

async function loadTransactions() {
  try {
    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      return;
    }
    const q = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budgetId)
    );
    const querySnapshot = await getDocs(q);
    window.appState.transactions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao carregar transações:', error);
  }
}

// Funções de CRUD para categorias
async function addCategory(categoryData) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      throw new Error('Nenhum orçamento selecionado');
    }
    const docRef = await addDoc(collection(db, 'categories'), {
      ...categoryData,
      nome: normalizarTexto(categoryData.nome), // salva nome limpo
      userId: user.uid,
      budgetId,
      createdAt: serverTimestamp()
    });
    // Os listeners em tempo real vão atualizar automaticamente
    return docRef;
  } catch (error) {
    Snackbar({
      message: 'Erro ao adicionar categoria: ' + error.message,
      type: 'error'
    });
    throw error;
  }
}

async function updateCategory(categoryId, categoryData) {
  try {
    const docRef = doc(db, 'categories', categoryId);
    await updateDoc(docRef, categoryData);
    // Os listeners em tempo real vão atualizar automaticamente
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw error;
  }
}

async function deleteCategory(categoryId) {
  try {
    const docRef = doc(db, 'categories', categoryId);
    await deleteDoc(docRef);
    // Os listeners em tempo real vão atualizar automaticamente
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
}

async function loadCategories() {
  try {
    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      console.log('🔍 Debug loadCategories - Sem budgetId');
      return;
    }
    console.log('🔍 Debug loadCategories - Carregando categorias para budgetId:', budgetId);
    
    const q = query(
      collection(db, 'categories'),
      where('budgetId', '==', budgetId)
    );
    const querySnapshot = await getDocs(q);
    window.appState.categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('🔍 Debug loadCategories - Categorias carregadas:', window.appState.categories.length);
    console.log('🔍 Debug loadCategories - Detalhes:', window.appState.categories.map(c => ({ id: c.id, nome: c.nome, limite: c.limite, tipo: c.tipo })));
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

// Funções de CRUD para orçamentos
async function addBudget(budgetData) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    const docRef = await addDoc(collection(db, 'budgets'), {
      ...budgetData,
      userId: user.uid,
      createdAt: serverTimestamp()
    });
    await refreshCurrentView();
    return docRef.id;
  } catch (error) {
    Snackbar({
      message: 'Erro ao adicionar orçamento: ' + error.message,
      type: 'error'
    });
    throw error;
  }
}

async function loadBudgets() {
  try {
    const user = auth.currentUser;
    if (!user) {
      window.appState.budgets = [];
      return;
    }
    const budgetsRef = collection(db, 'budgets');
    // Buscar orçamentos onde o usuário é dono OU está em usuariosPermitidos
    const q = query(
      budgetsRef,
      or(
        where('userId', '==', user.uid),
        where('usuariosPermitidos', 'array-contains', user.uid)
      )
    );
    const querySnapshot = await getDocs(q);
    window.appState.budgets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao carregar orçamentos:', error);
  }
}

// ... existing code ...
// Após a função loadBudgets (linha ~235), inserir:
function setCurrentBudget(budget) {
  console.log('🔄 Definindo orçamento atual (função local):', budget?.id);
  window.appState.currentBudget = budget;

  // Iniciar listeners se tiver budget
  if (budget?.id) {
    console.log('🚀 Iniciando listeners via função local...');
    startAllListeners(budget.id);
  }
}
// ... existing code ...

// Funções de renderização das telas

async function getTransacoesDoMes(userId, ano, mes) {
  const now = new Date();
  if (ano === now.getFullYear() && mes === now.getMonth() + 1) {
    // Mês atual: usar transações em memória
    return window.appState.transactions;
  }
  // Buscar histórico mensal
  const mesPad = String(mes).padStart(2, '0');
  const mesAno = `${ano}-${mesPad}`;
  const db = getFirestore();
  const ref = collection(
    db,
    'users',
    userId,
    'historico',
    mesAno,
    'transacoes'
  );
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => doc.data());
}
async function renderDashboard(selectedYear, selectedMonth) {
  // Evitar múltiplas chamadas simultâneas
  if (window.isRenderingDashboard) {
    console.log('🔄 Dashboard já está sendo renderizado, pulando...');
    return;
  }
  
  window.isRenderingDashboard = true;
  
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
    
    // Para o mês atual, garantir que temos as transações mais recentes
    if (year === now.getFullYear() && month === now.getMonth() + 1) {
      if (window.appState.transactions && window.appState.transactions.length > 0) {
        transacoes = window.appState.transactions;
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
    const preAgendadas = recorrentes.filter(rec => {
      const jaLancada = recorrentesMes.some(t => t.recorrenteId === rec.id);
      if (jaLancada) return false;
      
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
    
    const despesasPreAgendadas = preAgendadas.reduce((sum, rec) => sum + parseFloat(rec.valor), 0);
    const despesas = despesasTransacoes + despesasPreAgendadas;
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

    // Status
    const statusSaldo = saldo >= 0 ? 'Saldo positivo' : 'Saldo negativo';
    const statusOrcado = progressoOrcado <= 0.7 ? 'Dentro do orçado' : 
                        progressoOrcado <= 1.0 ? 'Próximo do limite' : 
                        'Orçado ultrapassado';
    const alertaOrcado = progressoOrcado <= 0.7 ? null :
                        progressoOrcado <= 1.0 ? 'Atenção: 80% do orçado usado' :
                        'Você ultrapassou o orçado!';

    // Top categorias
    const categoriasComGasto = window.appState.categories
      .filter(cat => cat.tipo === 'despesa')
      .map(cat => {
        const transacoesCategoria = (window.appState.transactions || []).filter(t => 
          t.categoriaId === cat.id && t.tipo === cat.tipo
        );
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
          <div class="flex items-center gap-2">
            <button onclick="window.showExportOptions && window.showExportOptions()" class="btn-secondary">
              <span class="icon-standard">📤</span>
              <span class="hidden sm:inline">Exportar</span>
            </button>
            <button id="theme-toggle-btn" onclick="window.setupThemeToggle && window.setupThemeToggle('theme-toggle-btn')" class="btn-secondary">
              <span class="icon-standard">🎨</span>
              <span class="hidden sm:inline">Tema</span>
            </button>
          </div>
        </div>
        <div id="mes-selector" class="flex items-center justify-center gap-4 mb-4 w-full">
          <button id="mes-anterior" class="text-blue-600 bg-blue-100 rounded-full w-10 h-10 md:w-8 md:h-8 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation" style="min-width: 44px; min-height: 44px;">&#8592;</button>
          <span class="font-bold text-lg">${meses[month - 1]} ${year}</span>
          <button id="mes-proximo" class="text-blue-600 bg-blue-100 rounded-full w-10 h-10 md:w-8 md:h-8 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation" style="min-width: 44px; min-height: 44px;">&#8594;</button>
        </div>
        <div class="tab-content">
          <div class="content-spacing" id="dashboard-content">
            <!-- RESUMO DO MÊS -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 md:p-6 mb-4 text-white">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg md:text-xl font-bold">📊 RESUMO DO MÊS</h2>
                <span class="text-xl md:text-2xl">${meses[month - 1]} ${year}</span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4">
                <div class="text-center p-3">
                  <div class="text-xl md:text-2xl font-bold mb-2">R$ ${receitas.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90">💰 Receitas</div>
                </div>
                <div class="text-center p-3">
                  <div class="text-xl md:text-2xl font-bold mb-2">R$ ${despesas.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90">📉 Despesas</div>
                </div>
                <div class="text-center p-3">
                  <div class="text-xl md:text-2xl font-bold mb-2 ${saldo >= 0 ? 'text-green-300' : 'text-red-300'}">R$ ${saldo.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90">💳 Saldo</div>
                </div>
                <div class="text-center p-3">
                  <div class="text-xl md:text-2xl font-bold mb-2">${(progressoOrcado * 100).toFixed(0)}%</div>
                  <div class="text-sm md:text-base opacity-90">📋 Orçado usado</div>
                </div>
              </div>
              <div class="flex items-center justify-between text-xs md:text-sm">
                <div class="flex items-center gap-2">
                  <span class="text-base">${saldo >= 0 ? '✅' : '❌'}</span>
                  <span>${saldo >= 0 ? 'Saldo positivo' : 'Saldo negativo'}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-base">${totalAlertas > 0 ? '⚠️' : '✅'}</span>
                  <span id="alertas-texto" class="cursor-pointer hover:underline transition-all duration-200">
                    ${totalAlertas > 0 ? `${totalAlertas} alerta${totalAlertas !== 1 ? 's' : ''}` : '0 categorias em alerta'}
                  </span>
                </div>
              </div>
            </div>

            <!-- CARDS DE RESUMO -->
            <div id="dashboard-cards" class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
              <!-- Card Receitas -->
              <div class="card-resumo receita">
                <div class="card-header">
                  <div class="card-icon">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/></svg>
                  </div>
                  <div class="card-title">Receitas</div>
                </div>
                <div class="card-value">R$ ${receitas.toFixed(2)}</div>
                <div class="card-status">Dinheiro recebido</div>
              </div>

              <!-- Card Despesas -->
              <div class="card-resumo despesa">
                <div class="card-header">
                  <div class="card-icon">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 12h18" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/></svg>
                  </div>
                  <div class="card-title">Despesas</div>
                </div>
                <div class="card-value">R$ ${despesas.toFixed(2)}</div>
                <div class="card-status">Dinheiro gasto</div>
              </div>

              <!-- Card Saldo -->
              <div class="card-resumo saldo">
                <div class="card-header">
                  <div class="card-icon">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" stroke-width="2"/></svg>
                  </div>
                  <div class="card-title">Saldo</div>
                </div>
                <div class="card-value">R$ ${saldo.toFixed(2)}</div>
                <div class="card-status">${statusSaldo}</div>
              </div>

              <!-- Card Orçado -->
              <div class="card-resumo orcado">
                <div class="card-header">
                  <div class="card-icon">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#eab308" stroke-width="2"/></svg>
                  </div>
                  <div class="card-title">Orçado</div>
                </div>
                <div class="card-value">R$ ${orcado.toFixed(2)}</div>
                <div class="card-status">${statusOrcado}</div>
                ${alertaOrcado ? `<div class="card-alert">${alertaOrcado}</div>` : ''}
                <div class="card-progress">
                  <div class="progress-bar" style="width: ${Math.min(progressoOrcado * 100, 100)}%"></div>
                </div>
              </div>
            </div>

            <!-- TOP 5 CATEGORIAS -->
            ${categoriasComGasto.length > 0 ? `
              <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 md:p-6 mb-4 border border-gray-300 dark:border-gray-700">
                <h3 class="text-base md:text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">📊 TOP 5 CATEGORIAS</h3>
                <div class="space-y-3">
                  ${(() => {
                    const totalGasto = categoriasComGasto.reduce((sum, cat) => sum + cat.gasto, 0);
                    return categoriasComGasto.map(cat => {
                      const percentual = totalGasto > 0 ? (cat.gasto / totalGasto) * 100 : 0;
                      const larguraBarra = Math.max(percentual, 10);
                      
                      return `
                        <div class="flex items-center gap-3">
                          <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
                          <div class="flex-1 min-w-0">
                            <div class="flex justify-between text-sm">
                              <span class="font-medium text-gray-900 dark:text-gray-100 truncate">${cat.nome}</span>
                              <span class="text-gray-600 dark:text-gray-400">${percentual.toFixed(0)}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div class="h-2 rounded-full transition-all duration-300" 
                                   style="width: ${larguraBarra}%; background-color: ${cat.cor || '#4F46E5'};"></div>
                            </div>
                            <div class="text-xs text-gray-500 mt-1">R$ ${cat.gasto.toFixed(2)}</div>
                          </div>
                        </div>
                      `;
                    }).join('');
                  })()}
                </div>
              </div>
            ` : ''}

            <!-- ESPAÇO -->
            <div class="h-6"></div>

            <!-- CATEGORIAS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
              <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-gray-100">Categorias</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                ${window.appState.categories
                  .map(cat => {
                    const transacoesCategoria = (window.appState.transactions || []).filter(t => {
                      if (t.categoriaId !== cat.id || t.tipo !== cat.tipo) return false;
                      
                      let transacaoData;
                      if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
                        transacaoData = new Date(t.createdAt.seconds * 1000);
                      } else {
                        transacaoData = new Date(t.createdAt);
                      }

                      const transacaoAno = transacaoData.getFullYear();
                      const transacaoMes = transacaoData.getMonth() + 1;
                      return transacaoAno === year && transacaoMes === month;
                    });

                    const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
                    const limite = parseFloat(cat.limite || 0);
                    const saldo = cat.tipo === 'receita' ? gasto : limite - gasto;
                    
                    let progressoHTML = '';
                    if (cat.tipo === 'despesa' && cat.limite > 0) {
                      const percentual = (gasto / cat.limite) * 100;
                      let corBarra, emojiAlerta, textoAlerta;
                      
                      if (percentual <= 70) {
                        corBarra = '#22c55e';
                        emojiAlerta = '✅';
                        textoAlerta = 'Dentro do limite';
                      } else if (percentual <= 100) {
                        corBarra = '#eab308';
                        emojiAlerta = '⚠️';
                        textoAlerta = 'Próximo do limite';
                      } else {
                        corBarra = '#ef4444';
                        emojiAlerta = '🚨';
                        textoAlerta = 'Limite ultrapassado';
                      }
                      
                      progressoHTML = `
                        <div class="mt-2">
                          <div class="flex justify-between text-xs mb-1">
                            <span>${emojiAlerta} ${textoAlerta}</span>
                            <span>${percentual.toFixed(0)}%</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="h-2 rounded-full transition-all duration-300" 
                                 style="width: ${Math.min(percentual, 100)}%; background-color: ${corBarra};"></div>
                          </div>
                        </div>
                      `;
                    }

                    return `
                      <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 md:p-4 bg-white dark:bg-gray-900">
                        <div class="flex items-center space-x-2 md:space-x-3 mb-2">
                          <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
                          <span class="font-semibold text-xs md:text-base text-gray-900 dark:text-gray-100">${cat.nome}</span>
                        </div>
                        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Tipo: ${cat.tipo}</p>
                        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Limite: R$ ${cat.limite.toFixed(2)}</p>
                        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Gasto: R$ ${gasto.toFixed(2)}</p>
                        <p class="text-xs md:text-sm font-medium ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}">Saldo: R$ ${saldo.toFixed(2)}</p>
                        ${progressoHTML}
                        <div class="flex flex-wrap justify-end gap-1 md:space-x-2 mt-2">
                          <button onclick="editCategory('${cat.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Editar</button>
                          <button onclick="deleteCategory('${cat.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Excluir</button>
                          <button onclick="showCategoryHistory('${cat.id}')" class="text-gray-600 hover:text-gray-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Histórico</button>
                        </div>
                      </div>
                    `;
                  })
                  .sort((a, b) => {
                    const gastoA = parseFloat(a.match(/Gasto: R\$ ([\d.]+)/)?.[1] || 0);
                    const gastoB = parseFloat(b.match(/Gasto: R\$ ([\d.]+)/)?.[1] || 0);
                    return gastoB - gastoA;
                  })
                  .join('')}
              </div>
            </div>

            <!-- ESPAÇO -->
            <div class="h-6"></div>

            <!-- DESPESAS RECORRENTES -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col gap-2 md:p-6 mb-4 border border-gray-300 dark:border-gray-700">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100 font-inter">Despesas Recorrentes do Mês</h3>
                <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold font-inter">
                  + Nova Despesa Recorrente
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${recorrentesMes.length === 0 && preAgendadas.length === 0 ? '<p class=\'text-gray-500 text-center py-4 font-inter dark:text-gray-300\'>Nenhuma despesa recorrente aplicada ou agendada neste mês</p>' : ''}
                ${recorrentesMes
                  .map(r => {
                    const categoria = (window.appState.categories || []).find(c => c.id === r.categoriaId);
                    
                    let parcelaInfo = '';
                    if (r.recorrenteId) {
                      const recorrente = (window.appState.recorrentes || []).find(rec => rec.id === r.recorrenteId);
                      if (recorrente && recorrente.parcelasTotal) {
                        const transacoesRecorrente = transacoes
                          .filter(t => t.recorrenteId === r.recorrenteId)
                          .sort((a, b) => {
                            const dataA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                            const dataB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                            return dataA - dataB;
                          });

                        const posicao = transacoesRecorrente.findIndex(t => t.id === r.id);
                        if (posicao !== -1) {
                          const numeroParcela = posicao + 1;
                          parcelaInfo = `• Parcela ${numeroParcela} de ${recorrente.parcelasTotal}`;
                        }
                      }
                    }
                    
                    return `
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900 shadow font-inter">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">✔️ ${r.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${categoria?.nome || 'Sem categoria'}
                            • R$ ${parseFloat(r.valor).toFixed(2)}
                            ${parcelaInfo || (r.parcelasRestantes !== undefined ? `• ${r.parcelasRestantes}x restantes` : '')}
                          </p>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
                ${preAgendadas
                  .map(rec => {
                    const categoria = (window.appState.categories || []).find(c => c.id === rec.categoriaId);
                    const [ano, mes, dia] = rec.dataInicio.split('-').map(Number);
                    const dataInicio = new Date(ano, mes - 1, dia);
                    const anoInicio = dataInicio.getFullYear();
                    const mesInicio = dataInicio.getMonth() + 1;
                    let mesesDesdeInicio = (year - anoInicio) * 12 + (month - mesInicio);
                    if (!rec.efetivarMesAtual && (year > anoInicio || (year === anoInicio && month > mesInicio))) {
                      mesesDesdeInicio -= 1;
                    }
                    const parcelasRestantesExibidas = rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined
                      ? rec.parcelasRestantes - mesesDesdeInicio : null;
                    const numParcela = rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined
                      ? rec.parcelasRestantes - parcelasRestantesExibidas + 1 : null;
                    return `
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border border-dashed border-yellow-400 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 gap-1 md:gap-0 shadow font-inter">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-yellow-700 dark:text-yellow-300">⏳ ${rec.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${categoria?.nome || 'Sem categoria'}
                            • R$ ${parseFloat(rec.valor).toFixed(2)}
                            ${parcelasRestantesExibidas !== null ? `• Parcela ${numParcela} de ${rec.parcelasRestantes}` : '• recorrente'}
                          </p>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>

            <!-- ESPAÇO -->
            <div class="h-6"></div>

            <!-- TRANSAÇÕES RECENTES -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Transações Recentes</h3>
                <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
                  + Nova Transação
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${transacoes
                  .slice(0, 10)
                  .map(t => {
                    const categoria = window.appState.categories.find(c => c.id === t.categoriaId);
                    const numeroParcela = calcularNumeroParcela(t);
                    const parcelaInfo = numeroParcela ? `<span class='text-xs text-blue-500 ml-2'>(${numeroParcela})</span>` : '';
                    return `
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">
                            ${t.descricao}
                            ${parcelaInfo}
                          </p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">${categoria?.nome || 'Sem categoria'} • ${t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : t.createdAt ? new Date(t.createdAt).toLocaleDateString() : ''}</p>
                        </div>
                        <div class="flex items-center space-x-1 md:space-x-2">
                          <span class="font-bold text-xs md:text-base ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                            ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                          </span>
                          <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                          <button onclick="window.deleteTransaction && window.deleteTransaction('${t.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
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

    // Adicionar modal de alertas se houver alertas
    if (totalAlertas > 0) {
      const modalAlertas = document.createElement('div');
      modalAlertas.id = 'modal-alertas';
      modalAlertas.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
      modalAlertas.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 m-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">🚨 Alertas de Orçado</h3>
            <button onclick="closeModalAlertas()" class="text-gray-500 hover:text-gray-700 text-xl">×</button>
          </div>
          <div class="space-y-4">
            ${categoriasComAlerta.map(cat => {
              const transacoesCategoria = transacoes.filter(t => 
                t.categoriaId === cat.id && t.tipo === cat.tipo
              );
              const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
              const limite = parseFloat(cat.limite || 0);
              const percentual = limite > 0 ? (gasto / limite) * 100 : 0;
              return `
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-red-800 dark:text-red-200">${cat.nome}</h4>
                    <span class="text-red-600 dark:text-red-400 font-bold">${percentual.toFixed(0)}%</span>
                  </div>
                  <div class="text-sm text-red-700 dark:text-red-300">
                    <p>Gasto: R$ ${gasto.toFixed(2)}</p>
                    <p>Limite: R$ ${limite.toFixed(2)}</p>
                    <p class="font-medium">${percentual > 100 ? 'Limite ultrapassado!' : 'Próximo do limite'}</p>
                  </div>
                </div>
              `;
            }).join('')}
            ${alertaGeral ? `
              <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-orange-800 dark:text-orange-200">Orçado Geral</h4>
                  <span class="text-orange-600 dark:text-orange-400 font-bold">${(progressoOrcado * 100).toFixed(0)}%</span>
                </div>
                <div class="text-sm text-orange-700 dark:text-orange-300">
                  <p>Despesas totais: R$ ${despesas.toFixed(2)}</p>
                  <p>Limite total: R$ ${totalLimite.toFixed(2)}</p>
                  <p class="font-medium">Orçado geral próximo do limite</p>
                </div>
              </div>
            ` : ''}
          </div>
          <div class="mt-6 text-center">
            <button onclick="closeModalAlertas()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Entendi
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modalAlertas);
    }
    
    // Adicionar evento de clique nos alertas
    setTimeout(() => {
      const alertasTexto = document.getElementById('alertas-texto');
      if (alertasTexto && totalAlertas > 0) {
        alertasTexto.addEventListener('click', () => {
          const modal = document.getElementById('modal-alertas');
          if (modal) {
            modal.classList.remove('hidden');
          }
        });
      }
    }, 100);

    // Eventos das setas
    setTimeout(() => {
      const btnAnterior = document.getElementById('mes-anterior');
      const btnProximo = document.getElementById('mes-proximo');

      if (btnAnterior) {
        const newBtnAnterior = btnAnterior.cloneNode(true);
        btnAnterior.replaceWith(newBtnAnterior);

        newBtnAnterior.addEventListener('click', async e => {
          e.preventDefault();
          e.stopPropagation();
          let newMonth = month - 1;
          let newYear = year;
          if (newMonth < 1) {
            newMonth = 12;
            newYear--;
          }
          await renderDashboard(newYear, newMonth);
        });

        newBtnAnterior.addEventListener('touchstart', () => {
          newBtnAnterior.style.transform = 'scale(0.95)';
        });

        newBtnAnterior.addEventListener('touchend', () => {
          newBtnAnterior.style.transform = '';
        });
      }

      if (btnProximo) {
        const newBtnProximo = btnProximo.cloneNode(true);
        btnProximo.replaceWith(newBtnProximo);

        newBtnProximo.addEventListener('click', async e => {
          e.preventDefault();
          e.stopPropagation();
          let newMonth = month + 1;
          let newYear = year;
          if (newMonth > 12) {
            newMonth = 1;
            newYear++;
          }
          await renderDashboard(newYear, newMonth);
        });

        newBtnProximo.addEventListener('touchstart', () => {
          newBtnProximo.style.transform = 'scale(0.95)';
        });

        newBtnProximo.addEventListener('touchend', () => {
          newBtnProximo.style.transform = '';
        });
      }
    }, 100);

    renderFAB();
    renderBottomNav('/dashboard');

  } catch (err) {
    console.error('Erro ao renderizar dashboard:', err);
    const content = document.getElementById('app-content');
    if (content) {
      content.innerHTML =
        '<div class=\'text-red-600 text-center mt-4\'>Erro ao carregar dashboard. Tente novamente.</div>';
    }
  } finally {
    // Reset da flag de renderização
    window.isRenderingDashboard = false;
  }
}
window.renderDashboard = renderDashboard;

// Função para fechar modal de alertas
function closeModalAlertas() {
  const modal = document.getElementById('modal-alertas');
  if (modal) {
    modal.classList.add('hidden');
  }
}
window.closeModalAlertas = closeModalAlertas;

// Padronizar renderTransactions
function renderTransactions() {
  const content = document.getElementById('app-content');
  const cards = [
      {
        titulo: 'Orçado',
        valor: `R$ ${orcado.toFixed(2)}`,
        cor: 'card-resumo orcado',
        icone:
          '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#eab308" stroke-width="2"/></svg>',
        progresso: progressoOrcado,
        status: statusOrcado,
        alerta: alertaOrcado
      }
    ];
    cards.forEach(cardData => {
      cardsContainer.appendChild(CardResumo(cardData));
    });

    // Gráfico visual das categorias
    const categoriasComGasto = window.appState.categories
      .filter(cat => cat.tipo === 'despesa')
      .map(cat => {
        const transacoesCategoria = (window.appState.transactions || []).filter(t => 
          t.categoriaId === cat.id && t.tipo === cat.tipo
        );
        const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
        return { ...cat, gasto };
      })
      .filter(cat => cat.gasto > 0)
      .sort((a, b) => b.gasto - a.gasto)
      .slice(0, 5); // Top 5 categorias
    
    if (categoriasComGasto.length > 0) {
      const totalGasto = categoriasComGasto.reduce((sum, cat) => sum + cat.gasto, 0);
      
      dashboardContent.innerHTML += `
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 md:p-6 mb-4 border border-gray-300 dark:border-gray-700">
          <h3 class="text-base md:text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">📊 TOP 5 CATEGORIAS</h3>
          <div class="space-y-3">
            ${categoriasComGasto.map(cat => {
              const percentual = totalGasto > 0 ? (cat.gasto / totalGasto) * 100 : 0;
              const larguraBarra = Math.max(percentual, 10); // Mínimo 10% para visualização
              
              return `
                <div class="flex items-center gap-3">
                  <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between text-sm">
                      <span class="font-medium text-gray-900 dark:text-gray-100 truncate">${cat.nome}</span>
                      <span class="text-gray-600 dark:text-gray-400">${percentual.toFixed(0)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div class="h-2 rounded-full transition-all duration-300" 
                           style="width: ${larguraBarra}%; background-color: ${cat.cor || '#4F46E5'};"></div>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">R$ ${cat.gasto.toFixed(2)}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Espaço entre cards e categorias
    dashboardContent.innerHTML += '<div class="h-6"></div>';
    // Categorias com valores
    dashboardContent.innerHTML += `
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-gray-100">Categorias</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
          ${window.appState.categories
    .map(cat => {
      // Filtrar transações da categoria no mês selecionado
      const transacoesCategoria = (
        window.appState.transactions || []
      ).filter(t => {
        // Verificar se é da categoria e tipo corretos
        if (t.categoriaId !== cat.id || t.tipo !== cat.tipo)
        {return false;}

        // Verificar se é do mês/ano selecionado
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

        return transacaoAno === year && transacaoMes === month;
      });

      const gasto = transacoesCategoria.reduce(
        (sum, t) => sum + parseFloat(t.valor),
        0
      );
      const limite = parseFloat(cat.limite || 0);
      const saldo = cat.tipo === 'receita' ? gasto : limite - gasto;
      return {
        ...cat,
        gasto,
        limite,
        saldo
      };
    })
    .sort((a, b) => b.gasto - a.gasto)
    .map(
      cat => `
              <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 md:p-4 bg-white dark:bg-gray-900">
                <div class="flex items-center space-x-2 md:space-x-3 mb-2">
                    <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
                  <span class="font-semibold text-xs md:text-base text-gray-900 dark:text-gray-100">${cat.nome}</span>
                  </div>
                <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Tipo: ${cat.tipo}</p>
                <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Limite: R$ ${cat.limite.toFixed(2)}</p>
                <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Gasto: R$ ${cat.gasto.toFixed(2)}</p>
                <p class="text-xs md:text-sm font-medium ${cat.saldo >= 0 ? 'text-green-600' : 'text-red-600'}">Saldo: R$ ${cat.saldo.toFixed(2)}</p>
                
                ${(() => {
                  if (cat.tipo === 'despesa' && cat.limite > 0) {
                    const percentual = (cat.gasto / cat.limite) * 100;
                    let corBarra, emojiAlerta, textoAlerta;
                    
                    if (percentual <= 70) {
                      corBarra = '#22c55e'; // Verde
                      emojiAlerta = '✅';
                      textoAlerta = 'Dentro do limite';
                    } else if (percentual <= 100) {
                      corBarra = '#eab308'; // Amarelo
                      emojiAlerta = '⚠️';
                      textoAlerta = 'Próximo do limite';
                    } else {
                      corBarra = '#ef4444'; // Vermelho
                      emojiAlerta = '🚨';
                      textoAlerta = 'Limite ultrapassado';
                    }
                    
                    return `
                      <div class="mt-2">
                        <div class="flex justify-between text-xs mb-1">
                          <span>${emojiAlerta} ${textoAlerta}</span>
                          <span>${percentual.toFixed(0)}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="h-2 rounded-full transition-all duration-300" 
                               style="width: ${Math.min(percentual, 100)}%; background-color: ${corBarra};"></div>
                        </div>
                      </div>
                    `;
                  }
                  return '';
                })()}
                <div class="flex flex-wrap justify-end gap-1 md:space-x-2 mt-2">
                  <button onclick="editCategory('${cat.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Editar</button>
                  <button onclick="deleteCategory('${cat.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Excluir</button>
                  <button onclick="showCategoryHistory('${cat.id}')" class="text-gray-600 hover:text-gray-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Histórico</button>
                </div>
              </div>
            `
    )
    .join('')}
        </div>
      </div>
    `;

    // Espaço entre categorias e recorrentes
    dashboardContent.innerHTML += '<div class="h-6"></div>';
    // Bloco de Despesas Recorrentes do mês selecionado
    dashboardContent.innerHTML += `
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col gap-2 md:p-6 mb-4 border border-gray-300 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100 font-inter">Despesas Recorrentes do Mês</h3>
          <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold font-inter">
            + Nova Despesa Recorrente
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${recorrentesMes.length === 0 && preAgendadas.length === 0 ? '<p class=\'text-gray-500 text-center py-4 font-inter dark:text-gray-300\'>Nenhuma despesa recorrente aplicada ou agendada neste mês</p>' : ''}
          ${recorrentesMes
    .map(r => {
      const categoria = (window.appState.categories || []).find(
        c => c.id === r.categoriaId
      );
      
      // Calcular número da parcela para transações recorrentes
      let parcelaInfo = '';
      if (r.recorrenteId) {
        const recorrente = (window.appState.recorrentes || []).find(
          rec => rec.id === r.recorrenteId
        );
        if (recorrente && recorrente.parcelasTotal) {
          // Buscar todas as transações desta recorrente ordenadas por data
          const transacoesRecorrente = transacoes
            .filter(t => t.recorrenteId === r.recorrenteId)
            .sort((a, b) => {
              const dataA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
              const dataB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
              return dataA - dataB;
            });

          // Encontrar a posição desta transação na lista
          const posicao = transacoesRecorrente.findIndex(t => t.id === r.id);
          if (posicao !== -1) {
            const numeroParcela = posicao + 1;
            parcelaInfo = `• Parcela ${numeroParcela} de ${recorrente.parcelasTotal}`;
          }
        }
      }
      
      return `
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900 shadow font-inter">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">✔️ ${r.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                    ${categoria?.nome || 'Sem categoria'}
                    • R$ ${parseFloat(r.valor).toFixed(2)}
                    ${parcelaInfo || (r.parcelasRestantes !== undefined ? `• ${r.parcelasRestantes}x restantes` : '')}
                  </p>
                </div>
              </div>
            `;
    })
    .join('')}
          ${preAgendadas
    .map(rec => {
      const categoria = (window.appState.categories || []).find(
        c => c.id === rec.categoriaId
      );
      const [ano, mes, dia] = rec.dataInicio.split('-').map(Number);
      const dataInicio = new Date(ano, mes - 1, dia); // Month is 0-indexed
      const anoInicio = dataInicio.getFullYear();
      const mesInicio = dataInicio.getMonth() + 1;
      let mesesDesdeInicio =
                (anoSelecionado - anoInicio) * 12 +
                (mesSelecionado - mesInicio);
      if (
        !rec.efetivarMesAtual &&
                (anoSelecionado > anoInicio ||
                  (anoSelecionado === anoInicio && mesSelecionado > mesInicio))
      ) {
        mesesDesdeInicio -= 1;
      }
      const parcelasRestantesExibidas =
                rec.parcelasRestantes !== null &&
                rec.parcelasRestantes !== undefined
                  ? rec.parcelasRestantes - mesesDesdeInicio
                  : null;
      const numParcela =
                rec.parcelasRestantes !== null &&
                rec.parcelasRestantes !== undefined
                  ? rec.parcelasRestantes - parcelasRestantesExibidas + 1
                  : null;
      return `
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border border-dashed border-yellow-400 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 gap-1 md:gap-0 shadow font-inter">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base text-yellow-700 dark:text-yellow-300">⏳ ${rec.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                    ${categoria?.nome || 'Sem categoria'}
                    • R$ ${parseFloat(rec.valor).toFixed(2)}
                    ${parcelasRestantesExibidas !== null ? `• Parcela ${numParcela} de ${rec.parcelasRestantes}` : '• recorrente'}
                  </p>
                </div>
              </div>
            `;
    })
    .join('')}
        </div>
      </div>
    `;

    // Espaço entre recorrentes e transações recentes
    dashboardContent.innerHTML += '<div class="h-6"></div>';
    // Transações Recentes
    dashboardContent.innerHTML += `
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Transações Recentes</h3>
          <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
            + Nova Transação
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${transacoes
    .slice(0, 10)
    .map(t => {
      const categoria = window.appState.categories.find(
        c => c.id === t.categoriaId
      );
      const numeroParcela = calcularNumeroParcela(t);
      const parcelaInfo = numeroParcela ? `<span class='text-xs text-blue-500 ml-2'>(${numeroParcela})</span>` : '';
      return `
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">
                    ${t.descricao}
                    ${parcelaInfo}
                  </p>
                  <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">${categoria?.nome || 'Sem categoria'} • ${t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : t.createdAt ? new Date(t.createdAt).toLocaleDateString() : ''}</p>
                </div>
                <div class="flex items-center space-x-1 md:space-x-2">
                  <span class="font-bold text-xs md:text-base ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                    ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                  </span>
                  <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                  <button onclick="window.deleteTransaction && window.deleteTransaction('${t.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                </div>
              </div>
            `;
    })
    .join('')}
        </div>
      </div>
    `;

    renderFAB();
    renderBottomNav('/dashboard');
    
    // Adicionar modal de alertas se houver alertas
    if (totalAlertas > 0) {
      const modalAlertas = document.createElement('div');
      modalAlertas.id = 'modal-alertas';
      modalAlertas.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
      modalAlertas.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 m-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">🚨 Alertas de Orçado</h3>
            <button onclick="closeModalAlertas()" class="text-gray-500 hover:text-gray-700 text-xl">×</button>
          </div>
          <div class="space-y-4">
            ${categoriasComAlerta.map(cat => {
              const transacoesCategoria = transacoes.filter(t => 
                t.categoriaId === cat.id && t.tipo === cat.tipo
              );
              const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
              const limite = parseFloat(cat.limite || 0);
              const percentual = limite > 0 ? (gasto / limite) * 100 : 0;
              return `
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-red-800 dark:text-red-200">${cat.nome}</h4>
                    <span class="text-red-600 dark:text-red-400 font-bold">${percentual.toFixed(0)}%</span>
                  </div>
                  <div class="text-sm text-red-700 dark:text-red-300">
                    <p>Gasto: R$ ${gasto.toFixed(2)}</p>
                    <p>Limite: R$ ${limite.toFixed(2)}</p>
                    <p class="font-medium">${percentual > 100 ? 'Limite ultrapassado!' : 'Próximo do limite'}</p>
                  </div>
                </div>
              `;
            }).join('')}
            ${temAlertaGeral ? `
              <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-orange-800 dark:text-orange-200">Orçado Geral</h4>
                  <span class="text-orange-600 dark:text-orange-400 font-bold">${(progressoOrcado * 100).toFixed(0)}%</span>
                </div>
                <div class="text-sm text-orange-700 dark:text-orange-300">
                  <p>Despesas totais: R$ ${despesas.toFixed(2)}</p>
                  <p>Limite total: R$ ${totalLimite.toFixed(2)}</p>
                  <p class="font-medium">Orçado geral próximo do limite</p>
                </div>
              </div>
            ` : ''}
          </div>
          <div class="mt-6 text-center">
            <button onclick="closeModalAlertas()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Entendi
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modalAlertas);
    }
    
    // Adicionar evento de clique nos alertas
    setTimeout(() => {
      const alertasTexto = document.getElementById('alertas-texto');
      if (alertasTexto && totalAlertas > 0) {
        alertasTexto.addEventListener('click', () => {
          const modal = document.getElementById('modal-alertas');
          if (modal) {
            modal.classList.remove('hidden');
          }
        });
      }
    }, 100);
    // Swipe navigation já inicializada globalmente
    // Eventos das setas - Melhorado para mobile
    setTimeout(() => {
      const btnAnterior = document.getElementById('mes-anterior');
      const btnProximo = document.getElementById('mes-proximo');

      if (btnAnterior) {
        // Remover listeners antigos
        const newBtnAnterior = btnAnterior.cloneNode(true);
        btnAnterior.replaceWith(newBtnAnterior);

        // Adicionar listener com touch support
        newBtnAnterior.addEventListener('click', async e => {
          e.preventDefault();
          e.stopPropagation();
          let newMonth = month - 1;
          let newYear = year;
          if (newMonth < 1) {
            newMonth = 12;
            newYear--;
          }
          await renderDashboard(newYear, newMonth);
        });

        // Adicionar touch feedback
        newBtnAnterior.addEventListener('touchstart', () => {
          newBtnAnterior.style.transform = 'scale(0.95)';
        });

        newBtnAnterior.addEventListener('touchend', () => {
          newBtnAnterior.style.transform = '';
        });
      }

      if (btnProximo) {
        // Remover listeners antigos
        const newBtnProximo = btnProximo.cloneNode(true);
        btnProximo.replaceWith(newBtnProximo);

        // Adicionar listener com touch support
        newBtnProximo.addEventListener('click', async e => {
          e.preventDefault();
          e.stopPropagation();
          let newMonth = month + 1;
          let newYear = year;
          if (newMonth > 12) {
            newMonth = 1;
            newYear++;
          }
          await renderDashboard(newYear, newMonth);
        });

        // Adicionar touch feedback
        newBtnProximo.addEventListener('touchstart', () => {
          newBtnProximo.style.transform = 'scale(0.95)';
        });

        newBtnProximo.addEventListener('touchend', () => {
          newBtnProximo.style.transform = '';
        });
      }
    }, 100);
  } catch (err) {
    console.error('Erro ao renderizar dashboard:', err);
    const content = document.getElementById('app-content');
    if (content) {
      content.innerHTML +=
        '<div class=\'text-red-600 text-center mt-4\'>Erro ao carregar dashboard. Tente novamente.</div>';
    }
  } finally {
    // Reset da flag de renderização
    window.isRenderingDashboard = false;
  }
}
window.renderDashboard = renderDashboard;

// Função para fechar modal de alertas
function closeModalAlertas() {
  const modal = document.getElementById('modal-alertas');
  if (modal) {
    modal.classList.add('hidden');
  }
}
window.closeModalAlertas = closeModalAlertas;

// ... existing code ...
// Padronizar renderTransactions
function renderTransactions() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📋 Transações</h2>
        <div class="flex items-center gap-2">
          <button onclick="showAddTransactionModal()" class="btn-primary">
            <span class="icon-standard">➕</span>
            <span class="hidden sm:inline">Nova Transação</span>
            <span class="sm:hidden">Nova</span>
          </button>
          <button onclick="startVoiceRecognition('transaction')" class="btn-secondary">
            <span class="icon-standard">🎤</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          ${window.appState.transactions.length === 0
            ? `
            <div class="text-center py-8">
              <div class="text-4xl mb-4">📋</div>
              <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
              <div class="text-gray-600 dark:text-gray-400">Adicione sua primeira transação para começar</div>
            </div>
          `
            : window.appState.transactions
              .map(t => {
                const categoria = window.appState.categories.find(
                  c => c.id === t.categoriaId
                );
                const numeroParcela = calcularNumeroParcela(t);
                const data = t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString('pt-BR') : new Date(t.createdAt).toLocaleDateString('pt-BR');
                const isReceita = t.tipo === 'receita';
                
                return `
            <div class="list-item ${isReceita ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}">
              <div class="flex-1 min-w-0">
                <div class="list-item-title truncate">
                  ${t.descricao}
                  ${numeroParcela ? `<span class="text-xs text-blue-600 font-semibold ml-2">(${numeroParcela})</span>` : ''}
                </div>
                <div class="list-item-subtitle text-xs sm:text-sm">
                  ${categoria?.nome || 'Sem categoria'} • ${data}
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
                  <button onclick="deleteTransaction('${t.id}')" class="btn-danger mobile-btn">
                    <span class="icon-standard">🗑️</span>
                  </button>
                </div>
              </div>
            </div>
          `;
              })
              .join('')}
        </div>
      </div>
    </div>
  `;
  renderFAB();
  renderBottomNav('/transactions');
  // Swipe navigation já inicializada globalmente
}

// Garantir que as funções estejam disponíveis globalmente
window.renderTransactions = renderTransactions;

// Função para calcular o número da parcela de uma transação recorrente
function calcularNumeroParcela(transacao) {
  if (!transacao.recorrenteId) {
    return null;
  }

  try {
    // Buscar a recorrente correspondente
    const recorrente = window.appState.recorrentes?.find(r => r.id === transacao.recorrenteId);
    if (!recorrente || !recorrente.parcelasTotal) {
      return null;
    }

    // Obter a data da transação atual
    const dataTransacao = transacao.createdAt?.toDate ? transacao.createdAt.toDate() : new Date(transacao.createdAt);
    const anoTransacao = dataTransacao.getFullYear();
    const mesTransacao = dataTransacao.getMonth() + 1;

    // Obter a data de início da recorrente (parse local para evitar timezone)
    const [ano, mes, dia] = recorrente.dataInicio.split('-').map(Number);
    const dataInicio = new Date(ano, mes - 1, dia); // Month is 0-indexed
    const anoInicio = dataInicio.getFullYear();
    const mesInicio = dataInicio.getMonth() + 1;

    // Calcular quantos meses se passaram desde o início até a data da transação
    let mesesDesdeInicio = (anoTransacao - anoInicio) * 12 + (mesTransacao - mesInicio);
    
    // Se a transação é no mesmo mês de início, verificar se já passou do dia
    if (anoTransacao === anoInicio && mesTransacao === mesInicio) {
      const diaTransacao = dataTransacao.getDate();
      const diaInicio = dataInicio.getDate();
      
      // Se ainda não chegou o dia de início, não contar este mês
      if (diaTransacao < diaInicio) {
        mesesDesdeInicio = -1; // Ainda não começou
      } else {
        // Se já passou do dia, é o primeiro mês (0)
        mesesDesdeInicio = 0;
      }
    }
    
    // Ajuste: se não for para efetivar no mês atual e já passou do mês de início, desconta 1
    if (
      !recorrente.efetivarMesAtual &&
      (anoTransacao > anoInicio ||
        (anoTransacao === anoInicio && mesTransacao > mesInicio))
    ) {
      mesesDesdeInicio -= 1;
    }

    // O número da parcela é baseado nos meses desde o início + 1
    const numeroParcela = Math.max(1, mesesDesdeInicio + 1);
    
    // Verificar se não excede o total de parcelas
    if (numeroParcela > recorrente.parcelasTotal) {
      console.warn('⚠️ Número da parcela excede o total:', {
        numeroParcela,
        parcelasTotal: recorrente.parcelasTotal,
        recorrenteId: transacao.recorrenteId
      });
      return `${recorrente.parcelasTotal} de ${recorrente.parcelasTotal}`;
    }
    
    // Debug: log para verificar o cálculo
    console.log('🔍 Debug parcela:', {
      recorrenteId: transacao.recorrenteId,
      transacaoId: transacao.id,
      dataTransacao: dataTransacao.toISOString(),
      dataInicio: dataInicio.toISOString(),
      mesesDesdeInicio: mesesDesdeInicio,
      numeroParcela: numeroParcela,
      parcelasTotal: recorrente.parcelasTotal,
      efetivarMesAtual: recorrente.efetivarMesAtual
    });
    
    return `${numeroParcela} de ${recorrente.parcelasTotal}`;
  } catch (error) {
    console.error('Erro ao calcular número da parcela:', error);
    return null;
  }
}

// Função global para calcular parcelas de forma consistente
window.calcularParcelaRecorrente = function (recorrente, dataReferencia = null) {
  if (!recorrente || !recorrente.parcelasTotal) {
    return null;
  }

  try {
    // Se não foi passada uma data de referência, usar a data atual
    const dataRef = dataReferencia || new Date();
    const anoRef = dataRef.getFullYear();
    const mesRef = dataRef.getMonth() + 1;

    // Obter a data de início da recorrente (parse local para evitar timezone)
    const [ano, mes, dia] = recorrente.dataInicio.split('-').map(Number);
    const dataInicio = new Date(ano, mes - 1, dia); // Month is 0-indexed
    const anoInicio = dataInicio.getFullYear();
    const mesInicio = dataInicio.getMonth() + 1;

    // Calcular quantos meses se passaram desde o início
    let mesesDesdeInicio = (anoRef - anoInicio) * 12 + (mesRef - mesInicio);
    
    // Se estamos no mesmo mês de início, verificar se já passou do dia
    if (anoRef === anoInicio && mesRef === mesInicio) {
      const diaRef = dataRef.getDate();
      const diaInicio = dataInicio.getDate();
      
      // Se ainda não chegou o dia de início, não contar este mês
      if (diaRef < diaInicio) {
        mesesDesdeInicio = -1; // Ainda não começou
      } else {
        // Se já passou do dia, é o primeiro mês (0)
        mesesDesdeInicio = 0;
      }
    }
    
    // Ajuste: se não for para efetivar no mês atual e já passou do mês de início, desconta 1
    if (
      !recorrente.efetivarMesAtual &&
      (anoRef > anoInicio ||
        (anoRef === anoInicio && mesRef > mesInicio))
    ) {
      mesesDesdeInicio -= 1;
    }

    // O número da parcela é baseado nos meses desde o início + 1
    const numeroParcela = Math.max(1, mesesDesdeInicio + 1);
    
    // Verificar se não excede o total de parcelas
    if (numeroParcela > recorrente.parcelasTotal) {
      return recorrente.parcelasTotal;
    }
    
    // Debug detalhado
    console.log('🔍 Debug calcularParcelaRecorrente:', {
      recorrente: recorrente.descricao,
      dataRef: dataRef.toISOString(),
      dataInicio: dataInicio.toISOString(),
      anoRef,
      mesRef,
      anoInicio,
      mesInicio,
      mesesDesdeInicio,
      efetivarMesAtual: recorrente.efetivarMesAtual,
      numeroParcela,
      parcelasTotal: recorrente.parcelasTotal
    });
    
    return numeroParcela;
  } catch (error) {
    console.error('Erro ao calcular parcela da recorrente:', error);
    return null;
  }
};

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
// ... existing code ...
// Padronizar renderCategories
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
          <button onclick="showAddCategoryModal()" class="btn-primary">
            <span>+ Nova Categoria</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <button onclick="deleteCategory('${cat.id}')" class="btn-danger mobile-btn">
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
  renderFAB();
  renderBottomNav('/categories');
  // Swipe navigation já inicializada globalmente
}

// Garantir que as funções estejam disponíveis globalmente
window.renderCategories = renderCategories;
// ... existing code ...

// Atualizar router para sempre renderizar e recarregar dados ao trocar de aba
async function router(path) {
  console.log('Router chamado para:', path); // Debug
  document.getElementById('app-content');

  // Remover todas as classes de estado ativo de todos os botões
  document.querySelectorAll('.nav-btn').forEach(item => {
    item.classList.remove(
      'active',
      'bg-blue-100',
      'dark:bg-blue-900',
      'text-blue-700',
      'dark:text-blue-300',
      'font-semibold',
      'shadow-md',
      'scale-105'
    );
  });

  // Adicionar classes de estado ativo ao botão correto
  const navBtn = document.querySelector(`.nav-btn[data-route='${path}']`);
  if (navBtn) {
    navBtn.classList.add(
      'active',
      'bg-blue-100',
      'dark:bg-blue-900',
      'text-blue-700',
      'dark:text-blue-300',
      'font-semibold',
      'shadow-md',
      'scale-105'
    );
  }

  switch (path) {
  case '/dashboard':
    await loadCategories();
    await loadRecorrentes();
    await renderDashboard();
    break;
  case '/transactions':
    renderTransactions();
    break;
  case '/categories':
    await loadCategories();
    await renderCategories();
    break;
  case '/recorrentes':
    await loadRecorrentes();
    await renderRecorrentes();
    break;
    // case '/app': // Removida - funcionalidades movidas para /settings
    //   window.renderApp();
    //   break;
  case '/settings':
    loadBudgets().then(renderSettings);
    break;
  case '/notifications':
    await loadNotifications();
    renderNotifications();
    break;
  default:
    await loadCategories();
    await loadRecorrentes();
    await renderDashboard();
  }
}
window.router = router;
// Funções globais para modais e ações
window.showAddTransactionModal = function (initialData = {}) {
  const modal = Modal({
    title: 'Adicionar Transação',
    content: `
      <form id="transaction-form" class="space-y-4">
        <div class="form-group">
          <label class="form-label">Descrição</label>
          <input type="text" id="transaction-descricao" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Supermercado"
                 value="${initialData.descricao || ''}"
                 autocomplete="off"
                 autocorrect="off"
                 autocapitalize="words">
        </div>
        
        <div class="form-group">
          <label class="form-label">Valor (R$)</label>
          <input type="number" id="transaction-valor" required step="0.01" min="0"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00"
                 value="${initialData.valor !== undefined ? initialData.valor : ''}"
                 inputmode="decimal"
                 autocomplete="off">
        </div>
        
        <div class="form-group">
          <label class="form-label">Tipo</label>
          <select id="transaction-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            <option value="receita" ${initialData.tipo === 'receita' ? 'selected' : ''}>Receita</option>
            <option value="despesa" ${initialData.tipo === 'despesa' ? 'selected' : ''}>Despesa</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Categoria</label>
          <select id="transaction-categoria" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            ${
  window.appState.categories.length > 0
    ? window.appState.categories
      .sort((a, b) =>
        a.nome.localeCompare(b.nome, 'pt-BR', {
          sensitivity: 'base'
        })
      )
      .map(cat => {
        // Calcular gasto atual da categoria no mês atual
        const now = new Date();
        const anoAtual = now.getFullYear();
        const mesAtual = now.getMonth() + 1;

        const transacoesCategoria = (
          window.appState.transactions || []
        ).filter(t => {
          if (t.categoriaId !== cat.id || t.tipo !== cat.tipo)
          {return false;}

          let transacaoData;
          if (
            t.createdAt &&
                          typeof t.createdAt === 'object' &&
                          t.createdAt.seconds
          ) {
            transacaoData = new Date(t.createdAt.seconds * 1000);
          } else {
            transacaoData = new Date(t.createdAt);
          }

          const transacaoAno = transacaoData.getFullYear();
          const transacaoMes = transacaoData.getMonth() + 1;

          return (
            transacaoAno === anoAtual && transacaoMes === mesAtual
          );
        });

        const gastoAtual = transacoesCategoria.reduce(
          (sum, t) => sum + parseFloat(t.valor),
          0
        );
        const limite = parseFloat(cat.limite || 0);
        const saldo =
                        cat.tipo === 'receita'
                          ? gastoAtual
                          : limite - gastoAtual;

        // Formatar texto da opção
        let textoOpcao = cat.nome;
        if (limite > 0) {
          textoOpcao += ` - Limite: R$ ${limite.toFixed(2)}`;
          if (cat.tipo === 'despesa') {
            textoOpcao += ` (Disponível: R$ ${Math.max(0, saldo).toFixed(2)})`;
          } else {
            textoOpcao += ` (Recebido: R$ ${gastoAtual.toFixed(2)})`;
          }
        }

        return `<option value="${cat.id}" ${initialData.categoriaId === cat.id ? 'selected' : ''}>${textoOpcao}</option>`;
      })
      .join('')
    : '<option value="" disabled>Nenhuma categoria disponível</option>'
}
          </select>
          ${
  window.appState.categories.length === 0
    ? '<p class="text-sm text-red-500 mt-1">Crie uma categoria primeiro</p>'
    : ''
}
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Adicionar
          </button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });
  document.body.appendChild(modal);

  // Adicionar evento de submit
  document
    .getElementById('transaction-form')
    .addEventListener('submit', async e => {
      e.preventDefault();

      const descricao = document.getElementById('transaction-descricao').value;
      const valor = parseFloat(
        document.getElementById('transaction-valor').value
      );
      const tipo = document.getElementById('transaction-tipo').value;
      const categoriaId = document.getElementById(
        'transaction-categoria'
      ).value;

      try {
        await addTransaction({
          descricao,
          valor,
          tipo,
          categoriaId
        });
        modal.remove(); // Fecha o modal primeiro
        renderDashboard(); // Atualiza o dashboard imediatamente
        Snackbar({
          message: 'Transação adicionada com sucesso!',
          type: 'success'
        });
      } catch (error) {
        console.error('Erro ao adicionar transação:', error);
        Snackbar({
          message: 'Erro ao adicionar transação: ' + error.message,
          type: 'error'
        });
      }
    });
};

window.showAddCategoryModal = function (initialData = {}) {
  const modal = Modal({
    title: 'Adicionar Categoria',
    content: `
      <form id="category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" id="category-nome" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Alimentação"
                 value="${initialData.nome || ''}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="category-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            <option value="receita" ${initialData.tipo === 'receita' ? 'selected' : ''}>Receita</option>
            <option value="despesa" ${initialData.tipo === 'despesa' ? 'selected' : ''}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
          <input type="number" id="category-limite" step="0.01" min="0"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00"
                 value="${initialData.limite !== undefined ? initialData.limite : ''}">
          <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
          <input type="color" id="category-cor" value="${initialData.cor || '#4F46E5'}"
                 class="w-full h-12 border border-gray-300 rounded-lg">
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Adicionar
          </button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });
  document.body.appendChild(modal);

  // Adicionar evento de submit
  document
    .getElementById('category-form')
    .addEventListener('submit', async e => {
      e.preventDefault();

      const nome = document.getElementById('category-nome').value;
      const tipo = document.getElementById('category-tipo').value;
      const limite =
        parseFloat(document.getElementById('category-limite').value) || 0;
      const cor = document.getElementById('category-cor').value;

      try {
        await addCategory({
          nome,
          tipo,
          limite,
          cor
        });
        modal.remove(); // Fecha o modal primeiro
        renderDashboard(); // Atualiza o dashboard imediatamente
        Snackbar({
          message: 'Categoria adicionada com sucesso!',
          type: 'success'
        });
      } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        Snackbar({
          message: 'Erro ao adicionar categoria: ' + error.message,
          type: 'error'
        });
      }
    });
};

window.showAddBudgetModal = function () {
  const user = window.FirebaseAuth?.currentUser;
  if (!user) {
    Snackbar({
      message: 'Você precisa estar logado para criar um orçamento.',
      type: 'error'
    });
    return;
  }
  const modal = Modal({
    title: 'Adicionar Orçamento',
    content: `
      <form id="budget-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" id="budget-nome" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Orçamento Familiar">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea id="budget-descricao" rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Descrição opcional do orçamento"></textarea>
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Adicionar
          </button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });
  setTimeout(() => {
    const form = document.getElementById('budget-form');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const nome = document.getElementById('budget-nome').value;
        const descricao = document.getElementById('budget-descricao').value;
        try {
          await addBudget({ nome, descricao });
          modal.remove();
          Snackbar({
            message: 'Orçamento adicionado com sucesso!',
            type: 'success'
          });
        } catch (error) {
          console.error('Erro ao adicionar orçamento:', error);
          Snackbar({
            message: 'Erro ao adicionar orçamento: ' + error.message,
            type: 'error'
          });
        }
      });
    }
  }, 0);
  document.body.appendChild(modal);
};

window.editTransaction = function (id) {
  const transaction = window.appState.transactions.find(t => t.id === id);
  if (!transaction) {
    alert('Transação não encontrada');
    return;
  }
  const modal = Modal({
    title: 'Editar Transação',
    content: `
      <form id="edit-transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <input type="text" id="edit-transaction-descricao" required 
                 value="${transaction.descricao}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Supermercado">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
          <input type="number" id="edit-transaction-valor" required step="0.01" min="0"
                 value="${transaction.valor}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="edit-transaction-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="receita" ${transaction.tipo === 'receita' ? 'selected' : ''}>Receita</option>
            <option value="despesa" ${transaction.tipo === 'despesa' ? 'selected' : ''}>Despesa</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select id="edit-transaction-categoria" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            ${window.appState.categories
    .sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
    )
    .map(cat => {
      // Calcular gasto atual da categoria no mês atual
      const now = new Date();
      const anoAtual = now.getFullYear();
      const mesAtual = now.getMonth() + 1;

      const transacoesCategoria = (
        window.appState.transactions || []
      ).filter(t => {
        if (t.categoriaId !== cat.id || t.tipo !== cat.tipo)
        {return false;}

        let transacaoData;
        if (
          t.createdAt &&
                    typeof t.createdAt === 'object' &&
                    t.createdAt.seconds
        ) {
          transacaoData = new Date(t.createdAt.seconds * 1000);
        } else {
          transacaoData = new Date(t.createdAt);
        }

        const transacaoAno = transacaoData.getFullYear();
        const transacaoMes = transacaoData.getMonth() + 1;

        return transacaoAno === anoAtual && transacaoMes === mesAtual;
      });

      const gastoAtual = transacoesCategoria.reduce(
        (sum, t) => sum + parseFloat(t.valor),
        0
      );
      const limite = parseFloat(cat.limite || 0);
      const saldo =
                  cat.tipo === 'receita' ? gastoAtual : limite - gastoAtual;

      // Formatar texto da opção
      let textoOpcao = cat.nome;
      if (limite > 0) {
        textoOpcao += ` - Limite: R$ ${limite.toFixed(2)}`;
        if (cat.tipo === 'despesa') {
          textoOpcao += ` (Disponível: R$ ${Math.max(0, saldo).toFixed(2)})`;
        } else {
          textoOpcao += ` (Recebido: R$ ${gastoAtual.toFixed(2)})`;
        }
      }

      return `<option value="${cat.id}" ${transaction.categoriaId === cat.id ? 'selected' : ''}>${textoOpcao}</option>`;
    })
    .join('')}
          </select>
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Salvar
          </button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });
  document.body.appendChild(modal);
  setTimeout(() => {
    const form = document.getElementById('edit-transaction-form');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const descricao = document.getElementById(
          'edit-transaction-descricao'
        ).value;
        const valor = parseFloat(
          document.getElementById('edit-transaction-valor').value
        );
        const tipo = document.getElementById('edit-transaction-tipo').value;
        const categoriaId = document.getElementById(
          'edit-transaction-categoria'
        ).value;
        try {
          await updateTransaction(id, {
            descricao,
            valor,
            tipo,
            categoriaId
          });
          modal.remove();
          // router('/dashboard'); // Removido para não trocar de aba
          Snackbar({
            message: 'Transação atualizada com sucesso!',
            type: 'success'
          });
        } catch (error) {
          console.error('Erro ao atualizar transação:', error);
          Snackbar({
            message: 'Erro ao atualizar transação: ' + error.message,
            type: 'error'
          });
        }
      });
    }
  }, 0);
};

window.deleteTransaction = function (id) {
  if (confirm('Tem certeza que deseja excluir esta transação?')) {
    deleteTransaction(id).catch(error => {
      console.error('Erro ao deletar transação:', error);
      Snackbar({
        message: 'Erro ao deletar transação: ' + error.message,
        type: 'error'
      });
    });
  }
};

window.editCategory = function (id) {
  const category = window.appState.categories.find(c => c.id === id);
  if (!category) {
    alert('Categoria não encontrada');
    return;
  }
  const modal = Modal({
    title: 'Editar Categoria',
    content: `
      <form id="edit-category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" id="edit-category-nome" required 
                 value="${category.nome}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Alimentação">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="edit-category-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="receita" ${category.tipo === 'receita' ? 'selected' : ''}>Receita</option>
            <option value="despesa" ${category.tipo === 'despesa' ? 'selected' : ''}>Despesa</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
          <input type="number" id="edit-category-limite" step="0.01" min="0"
                 value="${category.limite || ''}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00">
          <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
          <input type="color" id="edit-category-cor" value="${category.cor || '#4F46E5'}"
                 class="w-full h-12 border border-gray-300 rounded-lg">
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancelar
          </button>
          <button type="submit" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Salvar
          </button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });
  document.body.appendChild(modal);
  setTimeout(() => {
    const form = document.getElementById('edit-category-form');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const nome = document.getElementById('edit-category-nome').value;
        const tipo = document.getElementById('edit-category-tipo').value;
        const limite =
          parseFloat(document.getElementById('edit-category-limite').value) ||
          0;
        const cor = document.getElementById('edit-category-cor').value;
        try {
          await updateCategory(id, {
            nome,
            tipo,
            limite,
            cor
          });
          modal.remove();
          // router('/categories'); // Removido para não trocar de aba
          Snackbar({
            message: 'Categoria atualizada com sucesso!',
            type: 'success'
          });
        } catch (error) {
          console.error('Erro ao atualizar categoria:', error);
          Snackbar({
            message: 'Erro ao atualizar categoria: ' + error.message,
            type: 'error'
          });
        }
      });
    }
  }, 0);
};

window.deleteCategory = function (id) {
  if (confirm('Tem certeza que deseja excluir esta categoria?')) {
    deleteCategory(id);
  }
};

window.addCategory = function (categoryData) {
  return addCategory(categoryData);
};

window.showCategoryHistory = function (id) {
  const category = window.appState.categories.find(c => c.id === id);
  if (!category) {
    alert('Categoria não encontrada');
    return;
  }
  // Filtrar transações da categoria
  const transactions = window.appState.transactions.filter(
    t => t.categoriaId === id
  );
  const totalReceitas = transactions
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const totalDespesas = transactions
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  // Saldo calculado mas não usado no modal
  totalReceitas - totalDespesas;
  const modal = Modal({
    title: `Histórico - ${category.nome}`,
    content: `
      <div class="space-y-6">
        <!-- Bloco de resumo removido para evitar duplicidade -->
        <div>
          <h3 class="font-semibold text-lg mb-3">Transações (${transactions.length})</h3>
          ${
  transactions.length === 0
    ? `
            <p class="text-gray-500 text-center py-4">Nenhuma transação encontrada nesta categoria</p>
          `
    : `
            <div class="space-y-2 max-h-64 overflow-y-auto">
              ${transactions
    .map(
      t => `
                <div class="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p class="font-medium">${t.descricao}</p>
                    <p class="text-sm text-gray-500">${t.createdAt && t.createdAt.toDate ? new Date(t.createdAt.toDate()).toLocaleDateString() : ''}</p>
                  </div>
                  <div class="text-right">
                    <span class="font-bold ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                      ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                    </span>
                    <p class="text-xs text-gray-500">${t.tipo}</p>
                  </div>
                </div>
              `
    )
    .join('')}
            </div>
          `
}
        </div>
        <div class="flex justify-end">
          <button onclick="closeModal()" 
                  class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Fechar
          </button>
        </div>
      </div>
    `,
    onClose: () => modal.remove()
  });
  document.body.appendChild(modal);
};
window.copyBudgetId = function (id) {
  navigator.clipboard.writeText(id);
  Snackbar({ message: 'ID do orçamento copiado!', type: 'success' });
};

window.selectBudget = function (id) {
  window.appState.currentBudget = window.appState.budgets.find(
    b => b.id === id
  );
  loadTransactions();
  loadCategories();
  // router('/dashboard'); // Removido para não trocar de aba
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
    y = 50;

    // Introdução
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('📱 Sobre o Aplicativo', 20, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('O Servo Tech Finanças é um aplicativo web progressivo (PWA) desenvolvido para ajudar você a gerenciar suas finanças pessoais de forma simples e eficiente. Aqui você encontra todos os dados importantes organizados de forma clara e intuitiva.', 20, y);
    y += 8;

    // Cards Principais
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('📈 Cards Principais:', 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('🟢 Receitas: Soma total de todo dinheiro recebido no período', 25, y);
    y = addText('   Inclui salários, bônus, rendimentos de investimentos, etc.', 30, y);
    y += 4;
    y = addText('🔴 Despesas: Soma total de todos os gastos no período', 25, y);
    y = addText('   Inclui contas, compras, serviços, etc.', 30, y);
    y += 4;
    y = addText('💰 Saldo: Diferença entre receitas e despesas', 25, y);
    y = addText('   Valor positivo indica superávit, negativo indica déficit', 30, y);
    y += 8;

    // Funcionalidades
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('⚙️ Funcionalidades Principais:', 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('➕ Adicionar Transações: Registre receitas e despesas com categoria', 25, y);
    y = addText('📊 Categorias: Organize gastos por tipo (mercado, transporte, etc.)', 25, y);
    y = addText('🔄 Recorrentes: Configure despesas que se repetem mensalmente', 25, y);
    y = addText('📈 Dashboard: Visualize resumos e gráficos de suas finanças', 25, y);
    y = addText('👥 Orçamentos Compartilhados: Compartilhe com família/amigos', 25, y);
    y = addText('📱 PWA: Instale como aplicativo no celular/tablet', 25, y);
    y += 8;

    // Como Usar
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('🎯 Como Usar:', 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('1. Cadastre-se ou faça login com Google', 25, y);
    y = addText('2. Crie ou entre em um orçamento', 25, y);
    y = addText('3. Configure suas categorias de gastos', 25, y);
    y = addText('4. Adicione suas transações diárias', 25, y);
    y = addText('5. Configure despesas recorrentes', 25, y);
    y = addText('6. Monitore seus gastos no dashboard', 25, y);
    y += 8;

    // Dicas
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('💡 Dicas Importantes:', 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('• Mantenha suas transações sempre atualizadas', 25, y);
    y = addText('• Use categorias para organizar melhor seus gastos', 25, y);
    y = addText('• Configure limites nas categorias para controle', 25, y);
    y = addText('• Revise recorrentes mensalmente', 25, y);
    y = addText('• Compartilhe orçamentos para controle familiar', 25, y);
    y = addText('• Use o modo escuro para economizar bateria', 25, y);
    y += 8;

    // Suporte
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('🆘 Suporte:', 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    y = addText('Para dúvidas ou problemas, entre em contato através da aba Configurações do aplicativo.', 20, y);
    y += 8;

    // Rodapé
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Servo Tech Finanças - Versão 1.0 - Desenvolvido com ❤️', 20, 280);

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

window.importBackup = function () {
  // Permite importar um backup JSON
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async e => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
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
  console.log('🔍 window.Modal disponível:', !!window.Modal);
  console.log('🔍 window.appState:', window.appState);
  
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
        // Remover input do DOM
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

// Definir startVoiceRecognition no escopo global
window.startVoiceRecognition = function (type) {
  // Verificar se está em HTTPS (necessário para microfone)
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    alert(
      'O reconhecimento de voz requer HTTPS. Por favor, acesse o site via HTTPS.'
    );
    return;
  }

  closeModal(); // Fechar qualquer modal aberto antes de iniciar reconhecimento de voz
  const modal = Modal({
    title: '🎤 Reconhecimento de Voz',
    content: `
      <div class="voice-feedback text-center py-6">
        <div class="voice-animation mb-4">
          <svg class="animate-pulse mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18v4m0 0h-4m4 0h4m-4-8a4 4 0 01-4-4V5a4 4 0 118 0v5a4 4 0 01-4 4z"/></svg>
        </div>
        <p class="text-lg font-semibold text-gray-800">Ouvindo...</p>
        <p id="voice-status" class="text-sm text-gray-500 mt-2">Fale agora</p>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm font-medium text-blue-800 mb-2">💡 Exemplos de comandos:</p>
          <div class="text-xs text-blue-700 space-y-1">
            <p>• "gastei 50 reais no supermercado em alimentação"</p>
            <p>• "recebi 2000 de salário em rendimentos"</p>
            <p>• "paguei 100 de conta de luz em moradia"</p>
            <p>• "criar categoria alimentação despesa 500"</p>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p class="text-xs text-yellow-800">
            🔒 <strong>Permissão necessária:</strong> O navegador solicitará acesso ao microfone. Clique em "Permitir" quando aparecer.
          </p>
        </div>
        
        <div class="mt-4 p-3 bg-green-50 rounded-lg">
          <p class="text-xs text-green-800 mb-2">
            💡 <strong>Alternativa:</strong> Se não tiver microfone, você pode digitar o comando:
          </p>
          <div class="flex gap-2">
            <input type="text" id="voice-text-input" placeholder="Ex: gastei 50 reais no supermercado" 
                   class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button onclick="processTextCommand()" class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
              Enviar
            </button>
          </div>
        </div>
        
        <div class="mt-4">
          <span id="voice-text" class="font-mono text-indigo-700"></span>
        </div>
        
        <button onclick="closeModal()" class="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
          ❌ Cancelar
        </button>
      </div>
    `,
    onClose: () => modal.remove()
  });
  document.body.appendChild(modal);

  // Reconhecimento de voz
  if (
    !('webkitSpeechRecognition' in window) &&
    !('SpeechRecognition' in window)
  ) {
    alert(
      'Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.'
    );
    return;
  }

  // Verificar permissão do microfone
  if (navigator.permissions) {
    navigator.permissions
      .query({ name: 'microphone' })
      .then(function (permissionStatus) {
        if (permissionStatus.state === 'denied') {
          alert(
            'Permissão do microfone negada. Por favor, permita o acesso ao microfone nas configurações do navegador.'
          );
          modal.remove();
          return;
        }
      });
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  console.log('DEBUG: Criando SpeechRecognition');
  const recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = function () {
    console.log('DEBUG: recognition.onstart');
    const statusEl = document.getElementById('voice-status');
    if (statusEl) {
      statusEl.textContent = 'Ouvindo...';
      statusEl.className = 'text-sm text-green-600';
    }
  };

  recognition.onresult = function (event) {
    console.log('DEBUG: recognition.onresult', event);
    const transcript = event.results[0][0].transcript;
    const statusEl = document.getElementById('voice-status');
    const voiceTextEl = document.getElementById('voice-text');

    if (statusEl) {
      statusEl.textContent = `Reconhecido: "${transcript}"`;
      statusEl.className = 'text-sm text-blue-600 font-medium';
    }

    if (voiceTextEl) {
      voiceTextEl.textContent = transcript;
      voiceTextEl.className =
        'font-mono text-indigo-700 bg-indigo-50 px-3 py-2 rounded-lg';
    }

    // Remover modal de voz e processar comando
    setTimeout(async () => {
      modal.remove();
      try {
        console.log('DEBUG: Processando comando de voz:', transcript, type);
        await processVoiceCommand(transcript, type);
      } catch (error) {
        console.error('DEBUG: Erro ao processar comando de voz:', error);
        Snackbar({
          message: 'Erro ao processar comando de voz: ' + error.message,
          type: 'error'
        });
      }
    }, 1000); // Aumentar delay para dar tempo de ver o texto reconhecido
  };

  recognition.onerror = function (event) {
    console.error('DEBUG: recognition.onerror', event);
    const statusEl = document.getElementById('voice-status');

    if (statusEl) {
      let errorMessage = 'Erro desconhecido';

      switch (event.error) {
      case 'not-allowed':
        errorMessage =
            'Permissão do microfone negada. Clique no ícone do microfone na barra de endereços e permita o acesso.';
        break;
      case 'no-speech':
        errorMessage =
            'Nenhuma fala detectada. Tente falar mais alto ou mais próximo do microfone.';
        break;
      case 'audio-capture':
        errorMessage =
            'Erro ao capturar áudio. Verifique se o microfone está funcionando.';
        break;
      case 'network':
        errorMessage = 'Erro de rede. Verifique sua conexão com a internet.';
        break;
      case 'service-not-allowed':
        errorMessage = 'Serviço de reconhecimento de voz não permitido.';
        break;
      case 'not-supported':
        errorMessage =
            'Reconhecimento de voz não suportado neste navegador. Use a entrada de texto.';
        break;
      default:
        errorMessage = `Erro: ${event.error}`;
      }

      statusEl.textContent = errorMessage;
      statusEl.className = 'text-sm text-red-600 font-medium';
    }

    // Fechar modal após 3 segundos em caso de erro
    setTimeout(() => {
      modal.remove();
    }, 3000);
  };

  recognition.onend = function () {
    console.log('DEBUG: recognition.onend');
    // Não fecha mais o modal automaticamente aqui
  };

  // Solicitar permissão do microfone antes de iniciar
  async function requestMicrophonePermission() {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Primeiro, listar dispositivos de áudio disponíveis
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter(
          device => device.kind === 'audioinput'
        );

        console.log(
          'DEBUG: Dispositivos de áudio encontrados:',
          audioDevices.length
        );

        if (audioDevices.length === 0) {
          throw new Error('Nenhum microfone encontrado');
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        stream.getTracks().forEach(track => track.stop()); // Parar o stream imediatamente
        console.log('DEBUG: Permissão do microfone concedida');
        return true;
      }
    } catch (error) {
      console.error('DEBUG: Erro ao solicitar permissão do microfone:', error);
      const statusEl = document.getElementById('voice-status');
      if (statusEl) {
        let errorMessage = 'Erro desconhecido';

        if (
          error.name === 'NotFoundError' ||
          error.message.includes('device not found')
        ) {
          errorMessage =
            'Nenhum microfone encontrado. Verifique se o microfone está conectado e funcionando.';
        } else if (error.name === 'NotAllowedError') {
          errorMessage =
            'Permissão do microfone negada. Clique no ícone do microfone na barra de endereços.';
        } else if (error.name === 'NotReadableError') {
          errorMessage =
            'Microfone em uso por outro aplicativo. Feche outros apps que usam o microfone.';
        } else {
          errorMessage = `Erro: ${error.message}`;
        }

        statusEl.textContent = errorMessage;
        statusEl.className = 'text-sm text-red-600 font-medium';
      }
      return false;
    }
    return true;
  }

  // Função para processar comando de texto (alternativa ao microfone)
  window.processTextCommand = function () {
    const input = document.getElementById('voice-text-input');
    const text = input.value.trim();

    if (!text) {
      alert('Digite um comando primeiro!');
      return;
    }

    console.log('DEBUG: Processando comando de texto:', text);
    modal.remove();

    setTimeout(async () => {
      try {
        await processVoiceCommand(text, type);
      } catch (error) {
        console.error('DEBUG: Erro ao processar comando de texto:', error);
        Snackbar({
          message: 'Erro ao processar comando: ' + error.message,
          type: 'error'
        });
      }
    }, 500);
  };

  // Iniciar reconhecimento após solicitar permissão
  requestMicrophonePermission().then(hasPermission => {
    if (hasPermission) {
      console.log('DEBUG: recognition.start()');
      recognition.start();
    } else {
      // Não fechar o modal automaticamente, deixar o usuário usar a entrada de texto
      console.log('DEBUG: Microfone não disponível, usando entrada de texto');
    }
  });
};
// Função para processar comandos de voz
async function processVoiceCommand(transcript, type) {
  try {
    // Normalizar texto
    const texto = transcript
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    // Comandos de consulta
    if (/\b(saldo|qual.*saldo|saldo atual)\b/.test(texto)) {
      const receitas = window.appState.transactions
        .filter(t => t.tipo === 'receita')
        .reduce((sum, t) => sum + parseFloat(t.valor), 0);
      const despesas = window.appState.transactions
        .filter(t => t.tipo === 'despesa')
        .reduce((sum, t) => sum + parseFloat(t.valor), 0);
      const saldo = receitas - despesas;
      Snackbar({
        message: `Saldo atual: R$ ${saldo.toFixed(2)}`,
        type: 'info'
      });
      return;
    }
    if (
      /\b(ultimas transacoes|mostrar transacoes|quais.*gastos|listar transacoes)\b/.test(
        texto
      )
    ) {
      const ultimas = window.appState.transactions.slice(-5).reverse();
      if (ultimas.length === 0) {
        Snackbar({ message: 'Nenhuma transação encontrada.', type: 'info' });
        return;
      }
      let msg = 'Últimas transações:\n';
      ultimas.forEach(t => {
        const cat =
          window.appState.categories.find(c => c.id === t.categoriaId)?.nome ||
          '';
        msg += `${t.descricao} - R$ ${parseFloat(t.valor).toFixed(2)} - ${t.tipo} - ${cat}\n`;
      });
      alert(msg);
      return;
    }
    // Comando de editar transação
    const editarMatch = texto.match(/editar transacao (.+)/);
    if (editarMatch) {
      const desc = editarMatch[1].trim();
      const trans = window.appState.transactions.find(t =>
        t.descricao.toLowerCase().includes(desc)
      );
      if (trans) {
        window.editTransaction(trans.id);
      } else {
        Snackbar({
          message: `Transação '${desc}' não encontrada.`,
          type: 'error'
        });
      }
      return;
    }
    // Comando de excluir transação
    const excluirMatch = texto.match(/excluir transacao (.+)/);
    if (excluirMatch) {
      const desc = excluirMatch[1].trim();
      const trans = window.appState.transactions.find(t =>
        t.descricao.toLowerCase().includes(desc)
      );
      if (trans) {
        if (confirm(`Excluir transação '${trans.descricao}'?`)) {
          await deleteTransaction(trans.id);
          Snackbar({ message: 'Transação excluída!', type: 'success' });
          renderDashboard();
        }
      } else {
        Snackbar({
          message: `Transação '${desc}' não encontrada.`,
          type: 'error'
        });
      }
      return;
    }
    // Comandos naturais para adicionar transação
    // Ex: "gastei 50 reais no supermercado em alimentação", "recebi 2000 de salário em rendimentos"
    const addMatch = texto.match(
      /(gastei|paguei|recebi|ganhei)\s+(\d+[\.,]?\d*)\s*(reais|rs)?\s*(no|na|em|de)?\s*([\w\s]+?)(?:\s+em\s+([\w\s]+))?$/
    );
    if (addMatch) {
      const verbo = addMatch[1];
      const valor = parseFloat(addMatch[2].replace(',', '.'));
      let tipo = 'despesa';
      if (verbo === 'recebi' || verbo === 'ganhei') {
        tipo = 'receita';
      }
      let descricao = (addMatch[5] || '').trim();
      let categoriaNome = (addMatch[6] || '').trim();
      // Se não houver 'em categoria', usar última palavra da descrição como categoria
      if (!categoriaNome && descricao.includes(' ')) {
        const partes = descricao.split(' ');
        categoriaNome = partes[partes.length - 1];
        descricao = partes.slice(0, -1).join(' ');
      }
      // Procurar categoria
      let categoria = window.appState.categories.find(c =>
        c.nome.toLowerCase().includes(categoriaNome)
      );
      if (!categoria) {
        // Se não encontrar, pega a primeira do tipo
        categoria = window.appState.categories.find(c => c.tipo === tipo);
      }
      if (!categoria) {
        alert(
          'Nenhuma categoria encontrada para o tipo. Crie uma categoria primeiro.'
        );
        return;
      }
      // Se descrição ficar vazia, usar categoria como fallback
      if (!descricao) {
        descricao = categoria.nome;
      }
      console.log('DEBUG: Abrindo formulário de transação/categoria por voz', {
        descricao,
        valor,
        tipo,
        categoriaId: categoria.id
      });
      window.showAddTransactionModal({
        descricao,
        valor,
        tipo,
        categoriaId: categoria.id
      });
      return;
    }
    // Fallback: comandos antigos
    if (type === 'transaction') {
      // Não temos os dados detalhados aqui, mas logar a chamada
      console.log('DEBUG: Chamando processTransactionVoice por voz');
      await processTransactionVoice(transcript);
    } else if (type === 'category') {
      console.log('DEBUG: Chamando processCategoryVoice por voz');
      await processCategoryVoice(transcript);
    }
  } catch (error) {
    console.error('Erro ao processar comando de voz:', error);
    Snackbar({
      message: 'Erro ao processar comando de voz: ' + error.message,
      type: 'error'
    });
  }
}

// Função auxiliar para converter números por extenso em português para número
function parseNumeroPorExtenso(palavra) {
  const mapa = {
    zero: 0,
    um: 1,
    uma: 1,
    dois: 2,
    duas: 2,
    três: 3,
    tres: 3,
    quatro: 4,
    cinco: 5,
    seis: 6,
    sete: 7,
    oito: 8,
    nove: 9,
    dez: 10,
    onze: 11,
    doze: 12,
    treze: 13,
    quatorze: 14,
    catorze: 14,
    quinze: 15,
    dezesseis: 16,
    dezessete: 17,
    dezoito: 18,
    dezenove: 19,
    vinte: 20,
    trinta: 30,
    quarenta: 40,
    cinquenta: 50,
    sessenta: 60,
    setenta: 70,
    oitenta: 80,
    noventa: 90,
    cem: 100,
    cento: 100,
    sem: 100,
    duzentos: 200,
    trezentos: 300,
    quatrocentos: 400,
    quinhentos: 500,
    seiscentos: 600,
    setecentos: 700,
    oitocentos: 800,
    novecentos: 900,
    mil: 1000
  };
  if (!palavra) {
    return NaN;
  }
  palavra = palavra.toLowerCase().replace(/\./g, '');
  if (mapa[palavra] !== undefined) {
    return mapa[palavra];
  }
  // Tenta converter por extenso composto (ex: cento e vinte)
  if (palavra.includes(' e ')) {
    return palavra
      .split(' e ')
      .map(parseNumeroPorExtenso)
      .reduce((a, b) => a + b, 0);
  }
  return NaN;
}

// Processar comando de voz para transação
async function processTransactionVoice(transcript) {
  // Padrão: "descrição valor tipo categoria"
  // Exemplo: "supermercado 150 despesa alimentação" ou "supermercado cem despesa alimentação"
  const texto = transcript
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
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
    // Procurar por palavra por extenso
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
    alert(
      'Valor não encontrado no comando (diga um número, ex: "cem", "duzentos", "mil" ou "100")'
    );
    return;
  }
  // Extrair tipo (receita/despesa, aceitando variações)
  const tipoIndex = words.findIndex(word =>
    /^(receita|receitas|despesa|despesas)$/.test(word)
  );
  if (tipoIndex === -1) {
    alert('Tipo não encontrado (receita ou despesa)');
    return;
  }
  let tipo = words[tipoIndex];
  if (/^receita/.test(tipo)) {
    tipo = 'receita';
  }
  if (/^despesa/.test(tipo)) {
    tipo = 'despesa';
  }
  // Extrair categoria (última palavra)
  const categoriaNome = words[words.length - 1];
  // Extrair descrição (tudo antes do valor)
  const descricao = words.slice(0, valorIndex).join(' ');
  // Encontrar categoria no banco (normalizando)
  const categoria = window.appState.categories.find(
    c =>
      normalizarTexto(c.nome).includes(normalizarTexto(categoriaNome)) ||
      normalizarTexto(categoriaNome).includes(normalizarTexto(c.nome))
  );
  if (!categoria) {
    alert(
      `Categoria "${categoriaNome}" não encontrada. Crie a categoria primeiro.`
    );
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
  // Padrão: "nome tipo limite"
  // Exemplo: "alimentação despesa 500" ou "alimentação despesa cem"
  const texto = transcript
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
  const words = texto.split(' ');
  if (words.length < 3) {
    alert('Comando inválido. Use: "nome tipo limite"');
    return;
  }
  // Extrair tipo (receita/despesa)
  const tipoIndex = words.findIndex(word =>
    ['receita', 'despesa'].includes(word)
  );
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
    // Procurar por palavra por extenso
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
    alert(
      'Limite não encontrado (diga um número, ex: "cem", "duzentos", "mil" ou "100")'
    );
    return;
  }
  // Extrair nome (tudo antes do tipo)
  const nome = words.slice(0, tipoIndex).join(' ');
  if (!nome) {
    alert('Nome da categoria não encontrado');
    return;
  }
  // Gerar cor aleatória
  const cores = [
    '#4F46E5',
    '#EF4444',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#84CC16'
  ];
  const cor = cores[Math.floor(Math.random() * cores.length)];
  // Exibir formulário real já preenchido para revisão
  window.showAddCategoryModal({
    nome,
    tipo,
    limite,
    cor
  });
}

// Funções auxiliares para modais
function closeModal() {
  console.log('DEBUG: closeModal chamada');
  // Fecha o modal mais recente com id app-modal
  const modal = document.getElementById('app-modal');
  if (modal) {
    modal.remove();
  }
  // Fallback: remove todos os modais abertos
  const modals = document.querySelectorAll('.modal');
  modals.forEach(m => m.remove());
}

// Configurar navegação
function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const route = btn.getAttribute('data-route');
      await router(route);
    });
  });
}

// Configurar botão de login
function setupLoginButton() {
  const btn = document.getElementById('btn-entrar');
  const biometricBtn = document.getElementById('biometric-login-btn');

  if (btn) {
    console.log('🔐 Configurando botão de login...');
    btn.onclick = loginWithGoogle;
    btn.style.pointerEvents = 'auto';
    btn.style.cursor = 'pointer';
    console.log('✅ Botão de login configurado com sucesso');
  } else {
    console.error('❌ Botão de login não encontrado!');
  }

  // Configurar botão de login biométrico
  if (biometricBtn) {
    console.log('🔐 Configurando botão de login biométrico...');
    biometricBtn.addEventListener('click', async () => {
      try {
        await window.authenticateWithBiometric();
      } catch (error) {
        console.error('❌ Erro no login biométrico:', error);
      }
    });
    console.log('✅ Botão de login biométrico configurado');
  }
}

// Adicionar tela de loading
function showLoading(show) {
  let loading = document.getElementById('loading-page');
  if (!loading) {
    loading = document.createElement('div');
    loading.id = 'loading-page';
    loading.className =
      'fixed inset-0 flex items-center justify-center bg-white z-50';
    loading.innerHTML =
      '<div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div><span class="text-lg font-semibold text-gray-700">Carregando...</span></div>';
    document.body.appendChild(loading);
  }
  loading.style.display = show ? 'flex' : 'none';
}

// Tornar showLoading global para uso em outros módulos
window.showLoading = showLoading;

// Melhorar scroll no mobile
function improveMobileScroll() {
  const appContent = document.getElementById('app-content');
  if (!appContent) {return;}

  // Adicionar smooth scrolling
  appContent.style.scrollBehavior = 'smooth';
  appContent.style.webkitOverflowScrolling = 'touch';

  // Prevenir scroll horizontal
  appContent.addEventListener(
    'touchmove',
    e => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = Math.abs(
          touch.clientX - (this.lastTouchX || touch.clientX)
        );
        const deltaY = Math.abs(
          touch.clientY - (this.lastTouchY || touch.clientY)
        );

        // Se o movimento for mais horizontal que vertical, prevenir scroll
        if (deltaX > deltaY && deltaX > 10) {
          e.preventDefault();
        }

        this.lastTouchX = touch.clientX;
        this.lastTouchY = touch.clientY;
      }
    },
    { passive: false }
  );

  console.log('📱 Scroll mobile melhorado');
}

// Listener para login biométrico
document.addEventListener('biometricLoginSuccess', async event => {
  console.log('🔐 Evento de login biométrico recebido:', event.detail);

  try {
    const { user } = event.detail;

    // Simular o processo de login como se fosse um usuário real
    await salvarUsuarioNoFirestore(user);
    window.appState.currentUser = user;

    // Carregar dados do usuário
    await loadBudgets();
    if (window.appState.budgets.length === 0) {
      const budgetId = await addBudget({
        nome: 'Orçamento Principal',
        descricao: 'Orçamento padrão do usuário'
      });
      await setCurrentBudget({ id: budgetId, nome: 'Orçamento Principal' });
    } else {
      await setCurrentBudget(window.appState.budgets[0]);
    }

    await loadTransactions();
    await loadCategories();
    await loadRecorrentes();

    // Renderizar dashboard
    console.log('🎯 Renderizando dashboard após login biométrico...');
    renderDashboard();
    improveMobileScroll();

    // Ocultar tela de login
    setTimeout(() => {
      console.log('🎯 Ocultando tela de login após login biométrico...');
      toggleLoginPage(false);

      // Inicializar navegação por swipe
      setTimeout(() => {
        if (!window.swipeNavigation) {
          console.log(
            '🔄 Inicializando navegação por swipe após login biométrico...'
          );
          try {
            window.swipeNavigation = new SwipeNavigation();
            console.log(
              '✅ SwipeNavigation inicializado após login biométrico'
            );
          } catch (error) {
            console.error(
              '❌ Erro ao inicializar SwipeNavigation após login biométrico:',
              error
            );
          }
        }
      }, 200);
    }, 100);
  } catch (error) {
    console.error('❌ Erro ao processar login biométrico:', error);
    Snackbar({
      message: 'Erro ao processar login biométrico: ' + error.message,
      type: 'error'
    });
  }
});
// Listener de autenticação
auth.onAuthStateChanged(async user => {
  showLoading(true);

  if (user) {
    await salvarUsuarioNoFirestore(user);
    window.appState.currentUser = user;
    try {
      await loadBudgets();
      if (window.appState.budgets.length === 0) {
        // Criar orçamento padrão se não existir
        const budgetId = await addBudget({
          nome: 'Orçamento Principal',
          descricao: 'Orçamento padrão do usuário'
        });
        await setCurrentBudget({ id: budgetId, nome: 'Orçamento Principal' });
      } else {
        // Usar o primeiro orçamento como padrão
        await setCurrentBudget(window.appState.budgets[0]);
      }

      await loadTransactions();
      await loadCategories();
      await loadRecorrentes();
      await loadNotifications();

      // Verificar recorrentes pendentes (sem aplicar)
      try {
        const currentBudget = window.appState.currentBudget;
        if (currentBudget) {
          const resultado = await aplicarRecorrentesDoMes(
            user.uid,
            currentBudget.id,
            false
          );
          if (resultado.pendentes > 0) {
            console.log(
              `⚠️ ${resultado.pendentes} recorrente(s) pendente(s) encontrada(s)`
            );
            // Notificar o usuário sobre recorrentes pendentes
            setTimeout(() => {
              Snackbar({
                message: `${resultado.pendentes} recorrente(s) pendente(s) para aplicação. Vá em "Recorrentes" para aplicar.`,
                type: 'warning',
                duration: 5000
              });
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar recorrentes pendentes:', error);
      }

      console.log('🎯 Renderizando dashboard...');
      renderDashboard();

      // Melhorar scroll no mobile
      improveMobileScroll();

      // Aguardar um pouco antes de ocultar a tela de login
      setTimeout(() => {
        console.log('🎯 Ocultando tela de login...');
        toggleLoginPage(false);

        // Verificar se a transição foi bem-sucedida
        setTimeout(() => {
          const loginPage = document.getElementById('login-page');
          const mainApp = document.querySelector('.app-container');

          console.log('🔍 Verificação pós-transição:', {
            loginPageDisplay: loginPage?.style.display,
            loginPageVisibility: loginPage?.style.visibility,
            mainAppDisplay: mainApp?.style.display,
            mainAppVisibility: mainApp?.style.visibility
          });

          console.log('✅ Login processado com sucesso!');
        }, 50);
      }, 100);

      // Inicializar navegação por swipe APÓS ocultar a tela de login
      setTimeout(() => {
        if (!window.swipeNavigation) {
          console.log('🔄 Inicializando navegação por swipe...');
          try {
            window.swipeNavigation = new SwipeNavigation();
            console.log('✅ SwipeNavigation inicializado com sucesso');
            console.log('🔍 Estado do SwipeNavigation:', {
              isEnabled: window.swipeNavigation.isEnabled,
              container: window.swipeNavigation.container,
              tabs: window.swipeNavigation.tabs
            });

            // Teste direto de evento de teclado
            console.log('🧪 Testando evento de teclado...');
            document.addEventListener(
              'keydown',
              e => {
                console.log(
                  '🎹 EVENTO DE TECLADO CAPTURADO:',
                  e.key,
                  'Target:',
                  e.target.tagName
                );
              },
              { capture: true }
            );

            // Verificar se o SwipeNavigation foi criado corretamente
            console.log('🔍 Verificando SwipeNavigation após criação:', {
              exists: !!window.swipeNavigation,
              isEnabled: window.swipeNavigation?.isEnabled,
              container: window.swipeNavigation?.container,
              tabs: window.swipeNavigation?.tabs,
              currentTabIndex: window.swipeNavigation?.currentTabIndex
            });
          } catch (error) {
            console.error('❌ Erro ao inicializar SwipeNavigation:', error);
          }
        } else {
          console.log('🔄 SwipeNavigation já existe, reabilitando...');
          window.swipeNavigation.enable();
        }
      }, 200); // Aguardar 200ms para garantir que a tela de login foi ocultada
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  } else {
    window.appState.currentUser = null;
    window.appState.transactions = [];
    window.appState.categories = [];
    window.appState.budgets = [];
    window.appState.currentBudget = null;
    toggleLoginPage(true);
  }
  showLoading(false);
});

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM carregado, iniciando aplicação...');

  // Configurar tema imediatamente
  setupThemeToggle();
  console.log('🎨 Tema configurado');
  
  // Sincronizar tema em todas as abas
  if (window.syncThemeAcrossTabs) {
    window.syncThemeAcrossTabs();
  }

  setupLoginButton();
  console.log('🔐 Botão de login configurado');

  toggleLoginPage(true);
  console.log('📱 Tela de login exibida');

  setupNavigation();
  console.log('🧭 Navegação configurada');

  // Habilitar navegação por swipe avançada APÓS o login
  // (será inicializada quando o usuário fizer login)

  // Configurar FAB
  renderFAB();

  // Configurar instalação do PWA
  console.log('📱 PWA: Chamando setupPWAInstallation...');
  setupPWAInstallation();
  console.log('📱 PWA installation configurado');

  // Configurar microfone do topo
  const voiceBtn = document.getElementById('voice-control');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      Modal({
        title: 'Comando de Voz',
        content: `
          <div class='space-y-4 text-center'>
            <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
            <div class='flex flex-col gap-3'>
              <button onclick='window.startVoiceRecognition("transaction")' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
              <button onclick='window.startVoiceRecognition("category")' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
            </div>
            <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
          </div>
        `,
        onClose: () => modal.remove()
      });
    });
  }
  renderDrawer();
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      toggleDrawer();
    });
  }
});

// Configuração da instalação do PWA
// let deferredPrompt; // Usado globalmente como window.deferredPrompt

function setupPWAInstallation() {
  console.log('📱 PWA: Configurando instalação...');

  // Verificar se o navegador suporta PWA
  const isPWACompatible =
    'serviceWorker' in navigator && 'PushManager' in window;
  console.log('📱 PWA: Navegador compatível:', isPWACompatible);

  // Verificar se já está instalado
  const isInstalled =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  console.log('📱 PWA: Já instalado:', isInstalled);

  // Capturar o evento beforeinstallprompt
  window.addEventListener('beforeinstallprompt', e => {
    console.log('📱 PWA: beforeinstallprompt capturado!');
    // Prevenir o prompt automático
    e.preventDefault();
    // Guardar o evento para usar depois
    window.deferredPrompt = e;
    console.log('📱 PWA: deferredPrompt salvo:', !!window.deferredPrompt);

    // Atualizar botão imediatamente
    setTimeout(() => window.updateInstallButton(), 100);
  });

  // Detectar se o app já está instalado
  window.addEventListener('appinstalled', () => {
    console.log('📱 PWA: App instalado com sucesso!');
    window.deferredPrompt = null;
    window.updateInstallButton();

    // Mostrar notificação de sucesso
    Snackbar({
      message:
        'App instalado com sucesso! Agora você pode acessá-lo pela tela inicial.',
      type: 'success',
      duration: 5000
    });
  });

  // Verificar se já está instalado
  if (isInstalled) {
    console.log('📱 PWA: App já está instalado');
    setTimeout(() => window.updateInstallButton(), 100);
  }

  // Verificar periodicamente se o prompt ficou disponível
  setTimeout(() => {
    console.log(
      '📱 PWA: Verificação inicial - deferredPrompt:',
      !!window.deferredPrompt
    );
    window.updateInstallButton();
  }, 1000);

  // Verificação adicional após 3 segundos
  setTimeout(() => {
    console.log(
      '📱 PWA: Verificação tardia - deferredPrompt:',
      !!window.deferredPrompt
    );
    console.log(
      '📱 PWA: Display mode:',
      window.matchMedia('(display-mode: standalone)').matches
    );
    console.log('📱 PWA: Navigator standalone:', window.navigator.standalone);
    window.updateInstallButton();
  }, 3000);
}



// Função global para instalar o PWA
window.installPWA = async function () {
  console.log('📱 PWA: installPWA chamado - deferredPrompt:', !!window.deferredPrompt);

  // Verificar novamente se o prompt está disponível
  if (!window.deferredPrompt) {
    console.log(
      '📱 PWA: Nenhum prompt disponível, mostrando instruções manuais'
    );

    // Se não há prompt disponível, mostrar instruções
    Modal({
      title: '📱 Como Instalar o App',
      content: `
        <div class="space-y-4">
          <div class="text-center">
            <div class="text-6xl mb-4">📱</div>
            <h3 class="text-lg font-semibold mb-2">Instalar Servo Tech Finanças</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Para instalar o app na sua tela inicial, siga as instruções abaixo:
            </p>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 No Mobile:</h4>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• <strong>Chrome/Edge:</strong> Toque no menu (⋮) → "Adicionar à tela inicial"</li>
              <li>• <strong>Safari:</strong> Toque no botão compartilhar (□↑) → "Adicionar à tela inicial"</li>
              <li>• <strong>Firefox:</strong> Toque no menu (⋮) → "Instalar app"</li>
            </ul>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">💻 No Desktop:</h4>
            <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• <strong>Chrome/Edge:</strong> Clique no ícone de instalação (⬇️) na barra de endereços</li>
              <li>• <strong>Firefox:</strong> Clique no menu (☰) → "Instalar app"</li>
            </ul>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">✨ Benefícios:</h4>
            <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Acesso rápido pela tela inicial</li>
              <li>• Funciona offline</li>
              <li>• Experiência de app nativo</li>
              <li>• Notificações push (em breve)</li>
            </ul>
          </div>

          <button onclick="closeModal()" class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600">
            Entendi
          </button>
        </div>
      `,
      onClose: () => modal.remove()
    });
    return;
  }

  try {
    // Mostrar o prompt de instalação
    window.deferredPrompt.prompt();

    // Aguardar a resposta do usuário
    const { outcome } = await window.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('📱 PWA: Usuário aceitou a instalação');
      Snackbar({
        message:
          'Instalação iniciada! O app será adicionado à sua tela inicial.',
        type: 'success'
      });
    } else {
      console.log('📱 PWA: Usuário recusou a instalação');
      Snackbar({
        message:
          'Instalação cancelada. Você pode tentar novamente a qualquer momento.',
        type: 'info'
      });
    }

    // Limpar o prompt
    window.deferredPrompt = null;

    // Atualizar o botão
    window.updateInstallButton();
  } catch (error) {
    console.error('📱 PWA: Erro na instalação:', error);
    Snackbar({
      message: 'Erro ao instalar o app. Tente novamente.',
      type: 'error'
    });
  }
};

window.selectSharedBudget = function () {
  const user = window.FirebaseAuth?.currentUser;
  if (!user) {
    Snackbar({
      message:
        'Você precisa estar logado para entrar em orçamento compartilhado.',
      type: 'error'
    });
    return;
  }
  const modal = Modal({
    title: 'Entrar em Orçamento Compartilhado',
    content: `
      <form id='shared-budget-form' class='space-y-4'>
        <div>
          <label class='block text-sm font-medium text-gray-700 mb-1'>Cole o ID do orçamento compartilhado</label>
          <input type='text' id='shared-budget-id' required class='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='ID do orçamento'>
        </div>
        <div class='flex justify-end space-x-3 pt-4'>
          <button type='button' onclick='closeModal()' class='px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200'>Cancelar</button>
          <button type='submit' class='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'>Entrar</button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });
  setTimeout(() => {
    const form = document.getElementById('shared-budget-form');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const budgetId = document.getElementById('shared-budget-id').value;
        if (!budgetId) {
          return;
        }
        try {
          const budget = await buscarOrcamentoPorId(budgetId);
          if (budget) {
            window.appState.currentBudget = budget;
            await loadTransactions();
            await loadCategories();
            await loadRecorrentes();
            await window.renderSettings();
            renderDashboard();
            Snackbar({
              message: 'Orçamento compartilhado carregado com sucesso!',
              type: 'success'
            });
          } else {
            Snackbar({
              message:
                'Orçamento não encontrado ou você não tem permissão de acesso.',
              type: 'error'
            });
          }
          modal.remove();
        } catch (error) {
          Snackbar({
            message: 'Erro ao buscar orçamento: ' + error.message,
            type: 'error'
          });
        }
      });
    }
  }, 0);
  document.body.appendChild(modal);
};

// ... existing code ...
// Ao iniciar, esconder tela de login e mostrar loading
window.addEventListener('DOMContentLoaded', () => {
  const loginPage = document.getElementById('login-page');
  if (loginPage) {
    loginPage.style.display = 'none';
  }
  showLoading(true);
});
// ... existing code ...
// ... existing code ...
// Função para gerar PDF do guia do usuário
window.generateUserGuide = function () {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurações do documento
    doc.setFont('helvetica');

    // Função para adicionar texto com quebra de página automática
    function addText(text, x, y, maxWidth = 170) {
      const lines = doc.splitTextToSize(text, maxWidth);
      if (y + lines.length * 8 > 270) {
        doc.addPage();
        return 20; // Nova posição Y no topo da nova página
      }
      doc.text(lines, x, y);
      return y + lines.length * 8 + 2;
    }

    // Função para adicionar título de seção
    function addSectionTitle(title, y) {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(16);
      doc.setTextColor(79, 70, 229);
      doc.text(title, 20, y);
      return y + 12;
    }

    // Função para adicionar subtítulo
    function addSubtitle(subtitle, y) {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.setTextColor(79, 70, 229);
      doc.text(subtitle, 20, y);
      return y + 8;
    }

    // Função para adicionar item de lista
    function addListItem(item, y, indent = 25) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(item, indent, y);
      return y + 8;
    }

    // Cabeçalho da primeira página
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Servo Tech Finanças', 20, 25);
    doc.setFontSize(14);
    doc.text('Guia Completo do Usuário', 20, 35);

    let yPosition = 50;
    doc.setTextColor(0, 0, 0);

    // Introdução
    yPosition = addSectionTitle(
      '🎯 Bem-vindo ao Servo Tech Finanças!',
      yPosition
    );

    yPosition = addText(
      'O Servo Tech Finanças é um aplicativo completo e intuitivo para controle financeiro pessoal. Desenvolvido com foco na praticidade e simplicidade, ele oferece todas as ferramentas necessárias para você gerenciar suas finanças de forma eficiente e organizada.',
      20,
      yPosition
    );

    yPosition = addSubtitle('🌟 Principais Funcionalidades:', yPosition);
    yPosition = addListItem(
      '📊 Dashboard completo com visão geral das finanças',
      yPosition
    );
    yPosition = addListItem(
      '💰 Gestão completa de receitas e despesas',
      yPosition
    );
    yPosition = addListItem(
      '🏷️ Categorização inteligente com limites de gastos',
      yPosition
    );
    yPosition = addListItem(
      '🎤 Comandos de voz para adicionar transações rapidamente',
      yPosition
    );
    yPosition = addListItem(
      '📈 Controle de orçamentos com compartilhamento',
      yPosition
    );
    yPosition = addListItem('💾 Backup e restauração de dados', yPosition);
    yPosition = addListItem('📱 Instalação como aplicativo (PWA)', yPosition);
    yPosition = addListItem('🌙 Modo escuro para conforto visual', yPosition);
    yPosition = addListItem(
      '📊 Exportação de relatórios em Excel, PDF e JSON',
      yPosition
    );

    // Dashboard
    yPosition = addSectionTitle(
      '📊 Dashboard - Centro de Controle Financeiro',
      yPosition
    );
    yPosition = addText(
      'O Dashboard é o coração do aplicativo, oferecendo uma visão completa e em tempo real de suas finanças. Aqui você encontra todos os dados importantes organizados de forma clara e intuitiva.',
      20,
      yPosition
    );
    yPosition += 8;
    yPosition = addSubtitle('📈 Cards Principais:', yPosition);
    yPosition = addListItem(
      '🟢 Receitas: Soma total de todo dinheiro recebido no período',
      yPosition
    );
    yPosition = addListItem(
      '   Inclui salários, bônus, rendimentos extras, etc.',
      yPosition,
      30
    );
    yPosition = addListItem(
      '🔴 Despesas: Soma total de todos os gastos realizados',
      yPosition
    );
    yPosition = addListItem(
      '   Contas, compras, lazer, transporte, etc.',
      yPosition,
      30
    );
    yPosition = addListItem(
      '🔵 Saldo: Receitas - Despesas (dinheiro disponível)',
      yPosition
    );
    yPosition = addListItem(
      '   Indica se você está no azul ou no vermelho',
      yPosition,
      30
    );
    yPosition = addListItem(
      '🟡 Orçado: Limite das categorias - Despesas',
      yPosition
    );
    yPosition = addListItem(
      '   Mostra quanto ainda pode gastar dentro dos limites',
      yPosition,
      30
    );
    yPosition += 8;
    yPosition = addSubtitle('📊 Seção de Categorias:', yPosition);
    yPosition = addListItem(
      'Barras de progresso coloridas para cada categoria',
      yPosition
    );
    yPosition = addListItem(
      'Verde: Dentro do limite estabelecido',
      yPosition,
      30
    );
    yPosition = addListItem(
      'Amarelo: Próximo do limite (80% ou mais)',
      yPosition,
      30
    );
    yPosition = addListItem(
      'Vermelho: Acima do limite (gasto excessivo)',
      yPosition,
      30
    );
    yPosition = addListItem(
      'Porcentagem de uso visível em cada barra',
      yPosition,
      30
    );
    yPosition += 8;
    yPosition = addSubtitle('📝 Transações Recentes:', yPosition);
    yPosition = addListItem(
      'Lista das últimas 10 transações realizadas',
      yPosition
    );
    yPosition = addListItem(
      'Mostra: Data, Descrição, Valor, Categoria e Tipo',
      yPosition,
      30
    );
    yPosition = addListItem(
      'Atualização automática em tempo real',
      yPosition,
      30
    );
    yPosition = addListItem(
      'Acesso rápido para editar ou excluir',
      yPosition,
      30
    );
    yPosition += 8;

    // Transações
    yPosition = addSectionTitle(
      '💰 Transações - Gestão Completa de Receitas e Despesas',
      yPosition
    );
    yPosition = addText(
      'A aba Transações é onde você gerencia todas as suas movimentações financeiras. Aqui você pode adicionar, editar, excluir e visualizar todas as transações.',
      20,
      yPosition
    );
    yPosition += 8;
    yPosition = addSubtitle('📝 Como Adicionar uma Transação:', yPosition);
    yPosition = addListItem('Método 1 - Botão Flutuante (FAB):', yPosition);
    yPosition = addListItem(
      '1. Toque no botão + (canto inferior direito)',
      yPosition,
      30
    );
    yPosition = addListItem(
      '2. Preencha os campos obrigatórios:',
      yPosition,
      30
    );
    yPosition = addListItem(
      '   • Descrição: Nome da transação (ex: "Supermercado")',
      yPosition,
      35
    );
    yPosition = addListItem(
      '   • Valor: Quantia em reais (ex: 150,50)',
      yPosition,
      35
    );
    yPosition = addListItem('   • Tipo: Receita ou Despesa', yPosition, 35);
    yPosition = addListItem(
      '   • Categoria: Selecione uma categoria existente',
      yPosition,
      35
    );
    yPosition = addListItem('3. Toque em "Adicionar"', yPosition, 30);
    yPosition += 8;
    yPosition = addListItem('Método 2 - Aba Transações:', yPosition);
    yPosition = addListItem(
      '1. Vá na aba "Transações" (navegação inferior)',
      yPosition,
      30
    );
    yPosition = addListItem('2. Toque em "+ Nova Transação"', yPosition, 30);
    yPosition = addListItem('3. Preencha os campos e confirme', yPosition, 30);
    yPosition += 8;
    yPosition = addSubtitle('✏️ Como Editar uma Transação:', yPosition);
    yPosition = addListItem('1. Localize a transação na lista', yPosition);
    yPosition = addListItem(
      '2. Toque no ícone ✏️ (lápis) ao lado',
      yPosition,
      30
    );
    yPosition = addListItem('3. Modifique os campos desejados', yPosition, 30);
    yPosition = addListItem('4. Toque em "Salvar"', yPosition, 30);
    yPosition += 8;
    yPosition = addSubtitle('🗑️ Como Excluir uma Transação:', yPosition);
    yPosition = addListItem('1. Localize a transação na lista', yPosition);
    yPosition = addListItem(
      '2. Toque no ícone 🗑️ (lixeira) ao lado',
      yPosition,
      30
    );
    yPosition = addListItem('3. Confirme a exclusão', yPosition, 30);
    yPosition += 8;
    yPosition = addSubtitle('📊 Visualização de Transações:', yPosition);
    yPosition = addListItem('Lista completa de todas as transações', yPosition);
    yPosition = addListItem(
      'Ordenadas por data (mais recentes primeiro)',
      yPosition,
      30
    );
    yPosition = addListItem(
      'Filtros por tipo (Receita/Despesa)',
      yPosition,
      30
    );
    yPosition = addListItem('Busca por descrição', yPosition, 30);
    yPosition = addListItem(
      'Atualização automática em tempo real',
      yPosition,
      30
    );
    yPosition += 8;
    yPosition = addSubtitle('💡 Dicas Importantes:', yPosition);
    yPosition = addListItem(
      'Use comandos de voz para adicionar mais rapidamente',
      yPosition
    );
    yPosition = addListItem(
      'Mantenha descrições claras e específicas',
      yPosition
    );
    yPosition = addListItem(
      'Categorize corretamente para melhor controle',
      yPosition
    );
    yPosition = addListItem('Revise transações regularmente', yPosition);
    yPosition += 8;

    // Comandos de Voz
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('🎤 Comandos de Voz - Revolução na Praticidade', 20, yPosition);
    yPosition += 12;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(
      'O sistema de comandos de voz é uma das funcionalidades mais inovadoras do app.',
      20,
      yPosition
    );
    yPosition += 8;
    doc.text(
      'Permite adicionar transações e criar categorias sem precisar digitar,',
      20,
      yPosition
    );
    yPosition += 8;
    doc.text(
      'tornando o controle financeiro muito mais rápido e prático.',
      20,
      yPosition
    );
    yPosition += 12;
    doc.text('🎯 Como Ativar o Comando de Voz:', 20, yPosition);
    yPosition += 8;
    doc.text('1. Toque no ícone do microfone no cabeçalho', 25, yPosition);
    yPosition += 8;
    doc.text('2. Aguarde a animação de "Ouvindo"', 30, yPosition);
    yPosition += 8;
    doc.text('3. Fale claramente o comando', 30, yPosition);
    yPosition += 8;
    doc.text('4. Aguarde a confirmação', 30, yPosition);
    yPosition += 12;
    doc.text('📝 Comando para Adicionar Transação:', 20, yPosition);
    yPosition += 8;
    doc.text('Formato: "descrição valor tipo categoria"', 25, yPosition);
    yPosition += 8;
    doc.text('Exemplos Práticos:', 25, yPosition);
    yPosition += 8;
    doc.text('• "supermercado cem despesa alimentação"', 30, yPosition);
    yPosition += 8;
    doc.text('• "salário mil quinhentos receita trabalho"', 30, yPosition);
    yPosition += 8;
    doc.text('• "padaria cinquenta despesa alimentação"', 30, yPosition);
    yPosition += 8;
    doc.text('• "uber trinta despesa transporte"', 30, yPosition);
    yPosition += 8;
    doc.text('• "bônus quinhentos receita trabalho"', 30, yPosition);
    yPosition += 8;
    doc.text('• "cinema oitenta despesa lazer"', 30, yPosition);
    yPosition += 12;
    doc.text('🏷️ Comando para Criar Categoria:', 20, yPosition);
    yPosition += 8;
    doc.text('Formato: "nome tipo limite"', 25, yPosition);
    yPosition += 8;
    doc.text('Exemplos Práticos:', 25, yPosition);
    yPosition += 8;
    doc.text('• "alimentação despesa cem"', 30, yPosition);
    yPosition += 8;
    doc.text('• "transporte despesa duzentos"', 30, yPosition);
    yPosition += 8;
    doc.text('• "lazer despesa cento cinquenta"', 30, yPosition);
    yPosition += 8;
    doc.text('• "trabalho receita zero"', 30, yPosition);
    yPosition += 12;
    doc.text('🔢 Valores por Extenso Suportados:', 20, yPosition);
    yPosition += 8;
    doc.text(
      'Números: "zero", "um", "dois", "três", "quatro", "cinco"',
      25,
      yPosition
    );
    yPosition += 8;
    doc.text(
      'Dezenas: "dez", "vinte", "trinta", "quarenta", "cinquenta"',
      25,
      yPosition
    );
    yPosition += 8;
    doc.text(
      'Centenas: "cem", "duzentos", "trezentos", "quatrocentos"',
      25,
      yPosition
    );
    yPosition += 8;
    doc.text('Milhares: "mil", "mil quinhentos", "dois mil"', 25, yPosition);
    yPosition += 8;
    doc.text('Compostos: "cento cinquenta", "mil duzentos"', 25, yPosition);
    yPosition += 8;
    doc.text('Sinônimos: "sem" = "cem" (para evitar confusão)', 25, yPosition);
    yPosition += 12;
    doc.text('💡 Dicas para Comandos de Voz:', 20, yPosition);
    yPosition += 8;
    doc.text('• Fale claramente e pausadamente', 25, yPosition);
    yPosition += 8;
    doc.text('• Use valores por extenso ao invés de números', 25, yPosition);
    yPosition += 8;
    doc.text('• Mantenha o microfone próximo', 25, yPosition);
    yPosition += 8;
    doc.text('• Evite ambientes muito barulhentos', 25, yPosition);
    yPosition += 8;
    doc.text('• Confirme sempre se o comando foi entendido', 25, yPosition);
    yPosition += 15;

    // Categorias
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text(
      '🏷️ Categorias - Organização Inteligente dos Gastos',
      20,
      yPosition
    );
    yPosition += 12;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(
      'As categorias são fundamentais para organizar e controlar seus gastos de forma eficiente.',
      20,
      yPosition
    );
    yPosition += 8;
    doc.text(
      'Elas permitem que você estabeleça limites de gastos e monitore o progresso em tempo real.',
      20,
      yPosition
    );
    yPosition += 12;
    doc.text('📝 Como Criar uma Categoria:', 20, yPosition);
    yPosition += 8;
    doc.text('Método 1 - Interface:', 25, yPosition);
    yPosition += 8;
    doc.text('1. Vá na aba "Categorias" (navegação inferior)', 30, yPosition);
    yPosition += 8;
    doc.text('2. Toque em "+ Nova Categoria"', 30, yPosition);
    yPosition += 8;
    doc.text('3. Preencha os campos:', 30, yPosition);
    yPosition += 8;
    doc.text('   • Nome: Nome da categoria (ex: "Alimentação")', 35, yPosition);
    yPosition += 8;
    doc.text('   • Tipo: Receita ou Despesa', 35, yPosition);
    yPosition += 8;
    doc.text('   • Limite: Valor máximo mensal (opcional)', 35, yPosition);
    yPosition += 8;
    doc.text('   • Cor: Escolha uma cor para identificação', 35, yPosition);
    yPosition += 8;
    doc.text('4. Toque em "Criar"', 30, yPosition);
    yPosition += 12;
    doc.text('Método 2 - Comando de Voz:', 25, yPosition);
    yPosition += 8;
    doc.text('1. Ative o microfone', 30, yPosition);
    yPosition += 8;
    doc.text('2. Diga: "nome tipo limite"', 30, yPosition);
    yPosition += 8;
    doc.text('3. Exemplo: "alimentação despesa cem"', 30, yPosition);
    yPosition += 12;
    doc.text('📊 Sistema de Controle por Cores:', 20, yPosition);
    yPosition += 8;
    doc.text('🟢 Verde: Dentro do limite estabelecido', 25, yPosition);
    yPosition += 8;
    doc.text('   • Gasto abaixo de 80% do limite', 30, yPosition);
    yPosition += 8;
    doc.text('   • Situação financeira saudável', 30, yPosition);
    yPosition += 8;
    doc.text('🟡 Amarelo: Próximo do limite', 25, yPosition);
    yPosition += 8;
    doc.text('   • Gasto entre 80% e 100% do limite', 30, yPosition);
    yPosition += 8;
    doc.text('   • Atenção: Reduza gastos nesta categoria', 30, yPosition);
    yPosition += 8;
    doc.text('🔴 Vermelho: Acima do limite', 25, yPosition);
    yPosition += 8;
    doc.text('   • Gasto superior ao limite estabelecido', 30, yPosition);
    yPosition += 8;
    doc.text('   • Alerta: Necessário ajuste imediato', 30, yPosition);
    yPosition += 12;
    doc.text('📈 Categorias Recomendadas:', 20, yPosition);
    yPosition += 8;
    doc.text('Para Despesas:', 25, yPosition);
    yPosition += 8;
    doc.text('• Alimentação (supermercado, restaurantes)', 30, yPosition);
    yPosition += 8;
    doc.text(
      '• Transporte (combustível, Uber, transporte público)',
      30,
      yPosition
    );
    yPosition += 8;
    doc.text('• Moradia (aluguel, contas, manutenção)', 30, yPosition);
    yPosition += 8;
    doc.text('• Lazer (cinema, shows, viagens)', 30, yPosition);
    yPosition += 8;
    doc.text('• Saúde (médico, farmácia, plano de saúde)', 30, yPosition);
    yPosition += 8;
    doc.text('• Educação (cursos, livros, material escolar)', 30, yPosition);
    yPosition += 8;
    doc.text('Para Receitas:', 25, yPosition);
    yPosition += 8;
    doc.text('• Trabalho (salário, bônus, comissões)', 30, yPosition);
    yPosition += 8;
    doc.text('• Investimentos (rendimentos, dividendos)', 30, yPosition);
    yPosition += 8;
    doc.text('• Freelance (trabalhos extras)', 30, yPosition);
    yPosition += 12;
    doc.text('✏️ Gerenciando Categorias:', 20, yPosition);
    yPosition += 8;
    doc.text('• Editar: Toque no ícone ✏️ ao lado da categoria', 25, yPosition);
    yPosition += 8;
    doc.text(
      '• Excluir: Toque no ícone 🗑️ ao lado da categoria',
      25,
      yPosition
    );
    yPosition += 8;
    doc.text('• Visualizar transações: Toque na categoria', 25, yPosition);
    yPosition += 8;
    doc.text('• Ajustar limites: Edite conforme necessário', 25, yPosition);
    yPosition += 12;
    doc.text('💡 Dicas para Categorias Eficientes:', 20, yPosition);
    yPosition += 8;
    doc.text('• Crie categorias específicas e claras', 25, yPosition);
    yPosition += 8;
    doc.text('• Estabeleça limites realistas baseados na renda', 25, yPosition);
    yPosition += 8;
    doc.text('• Use cores diferentes para fácil identificação', 25, yPosition);
    yPosition += 8;
    doc.text('• Revise e ajuste limites mensalmente', 25, yPosition);
    yPosition += 8;
    doc.text('• Monitore as barras de progresso regularmente', 25, yPosition);
    yPosition += 15;

    // Configurações
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('⚙️ Configurações - Centro de Personalização', 20, yPosition);
    yPosition += 12;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(
      'A aba Configurações é o centro de controle do aplicativo, onde você pode personalizar',
      20,
      yPosition
    );
    yPosition += 8;
    doc.text(
      'sua experiência, gerenciar dados e acessar funcionalidades avançadas.',
      20,
      yPosition
    );
    yPosition += 12;
    doc.text('📖 Guia do Usuário:', 20, yPosition);
    yPosition += 8;
    doc.text('• Baixe este manual completo em PDF', 25, yPosition);
    yPosition += 8;
    doc.text('• Acesso offline ao guia de uso', 25, yPosition);
    yPosition += 8;
    doc.text(
      '• Referência completa de todas as funcionalidades',
      25,
      yPosition
    );
    yPosition += 12;
    doc.text('👤 Perfil do Usuário:', 20, yPosition);
    yPosition += 8;
    doc.text('• Visualizar email da conta Google', 25, yPosition);
    yPosition += 8;
    doc.text('• Fazer logout da aplicação', 25, yPosition);
    yPosition += 8;
    doc.text('• Gerenciar sessão de login', 25, yPosition);
    yPosition += 12;
    doc.text('💰 Sistema de Orçamentos:', 20, yPosition);
    yPosition += 8;
    doc.text('Criar Novo Orçamento:', 25, yPosition);
    yPosition += 8;
    doc.text('• Defina um nome para o orçamento', 30, yPosition);
    yPosition += 8;
    doc.text('• Estabeleça período de vigência', 30, yPosition);
    yPosition += 8;
    doc.text('• Configure categorias e limites', 30, yPosition);
    yPosition += 8;
    doc.text('Compartilhar Orçamento:', 25, yPosition);
    yPosition += 8;
    doc.text('• Gere um ID único do orçamento', 30, yPosition);
    yPosition += 8;
    doc.text('• Compartilhe com família ou amigos', 30, yPosition);
    yPosition += 8;
    doc.text('• Controle colaborativo de gastos', 30, yPosition);
    yPosition += 8;
    doc.text('Entrar em Orçamento Compartilhado:', 25, yPosition);
    yPosition += 8;
    doc.text('• Cole o ID do orçamento compartilhado', 30, yPosition);
    yPosition += 8;
    doc.text('• Acesse dados compartilhados', 30, yPosition);
    yPosition += 8;
    doc.text('• Contribua com transações', 30, yPosition);
    yPosition += 12;
    doc.text('📊 Exportação de Dados:', 20, yPosition);
    yPosition += 8;
    doc.text('Excel (.xlsx):', 25, yPosition);
    yPosition += 8;
    doc.text('• Formato ideal para análise em planilhas', 30, yPosition);
    yPosition += 8;
    doc.text('• Compatível com Microsoft Excel e Google Sheets', 30, yPosition);
    yPosition += 8;
    doc.text('• Inclui todas as transações e categorias', 30, yPosition);
    yPosition += 8;
    doc.text('PDF (.pdf):', 25, yPosition);
    yPosition += 8;
    doc.text('• Relatório formatado para impressão', 30, yPosition);
    yPosition += 8;
    doc.text('• Resumo financeiro completo', 30, yPosition);
    yPosition += 8;
    doc.text('• Gráficos e estatísticas', 30, yPosition);
    yPosition += 8;
    doc.text('JSON (.json):', 25, yPosition);
    yPosition += 8;
    doc.text('• Backup completo de todos os dados', 30, yPosition);
    yPosition += 8;
    doc.text('• Formato para restauração futura', 30, yPosition);
    yPosition += 8;
    doc.text('• Compatível com outros sistemas', 30, yPosition);
    yPosition += 12;
    doc.text('📱 Instalação como Aplicativo (PWA):', 20, yPosition);
    yPosition += 8;
    doc.text('• Baixe o app no seu celular', 25, yPosition);
    yPosition += 8;
    doc.text('• Acesso offline às funcionalidades', 25, yPosition);
    yPosition += 8;
    doc.text('• Experiência nativa de aplicativo', 25, yPosition);
    yPosition += 8;
    doc.text('• Notificações push (futuro)', 25, yPosition);
    yPosition += 12;
    doc.text('🌙 Modo Escuro:', 20, yPosition);
    yPosition += 8;
    doc.text('• Alternar entre tema claro e escuro', 25, yPosition);
    yPosition += 8;
    doc.text('• Reduz fadiga visual', 25, yPosition);
    yPosition += 8;
    doc.text('• Economiza bateria em telas OLED', 25, yPosition);
    yPosition += 8;
    doc.text('• Preferência salva automaticamente', 25, yPosition);
    yPosition += 15;

    // Dicas e Truques
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('💡 Dicas e Truques para Aproveitar Melhor', 20, yPosition);
    yPosition += 12;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('🚀 Dicas de Produtividade:', 20, yPosition);
    yPosition += 8;
    doc.text(
      '• Use comandos de voz para adicionar transações rapidamente',
      25,
      yPosition
    );
    yPosition += 8;
    doc.text('• Configure limites realistas nas categorias', 25, yPosition);
    yPosition += 8;
    doc.text('• Faça backup regular dos seus dados', 25, yPosition);
    yPosition += 8;
    doc.text('• Instale o app para acesso offline', 25, yPosition);
    yPosition += 8;
    doc.text('• Compartilhe orçamentos com família/amigos', 25, yPosition);
    yPosition += 8;
    doc.text(
      '• Monitore o card "Orçado" para controle de gastos',
      25,
      yPosition
    );
    yPosition += 8;
    doc.text('• Use cores diferentes para categorias', 25, yPosition);
    yPosition += 15;

    // Solução de Problemas
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('🔧 Solução de Problemas Comuns', 20, yPosition);
    yPosition += 12;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('❓ Comando de voz não funciona:', 20, yPosition);
    yPosition += 8;
    doc.text('• Verifique se o microfone está ativo', 25, yPosition);
    yPosition += 8;
    doc.text('• Fale claramente e pausadamente', 25, yPosition);
    yPosition += 8;
    doc.text(
      '• Use valores por extenso: "cem" ao invés de "100"',
      25,
      yPosition
    );
    yPosition += 8;
    doc.text('❓ Transação não aparece:', 20, yPosition);
    yPosition += 8;
    doc.text(
      '• Aguarde alguns segundos (atualização automática)',
      25,
      yPosition
    );
    yPosition += 8;
    doc.text('• Verifique se está na categoria correta', 25, yPosition);
    yPosition += 8;
    doc.text('❓ App não carrega:', 20, yPosition);
    yPosition += 8;
    doc.text('• Verifique sua conexão com a internet', 25, yPosition);
    yPosition += 8;
    doc.text('• Faça login novamente se necessário', 25, yPosition);
    yPosition += 15;

    // Suporte
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('🆘 Suporte e Contato', 20, yPosition);
    yPosition += 12;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('👨‍💻 Fundador: Igor Bispo', 20, yPosition);
    yPosition += 8;
    doc.text('📱 Versão do App: 1.0', 20, yPosition);
    yPosition += 8;
    doc.text(
      '📅 Data do Guia: ' + new Date().toLocaleDateString('pt-BR'),
      20,
      yPosition
    );
    yPosition += 8;
    doc.text(
      '🌐 URL: https://controle-financeiro-b98ec.web.app',
      20,
      yPosition
    );
    yPosition += 8;
    doc.text(
      '💡 Para dúvidas, consulte este guia ou entre em contato.',
      20,
      yPosition
    );
    yPosition += 15;

    // Rodapé
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 270, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(
      'Servo Tech Finanças - Transformando sua vida financeira',
      20,
      280
    );
    doc.text('© 2025 • Fundador: Igor Bispo • Versão 1.0', 20, 290);

    // Salvar PDF
    doc.save('Servo-Tech-Financas-Guia-Usuario.pdf');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    Snackbar({
      message:
        'Erro ao gerar PDF. Verifique se a biblioteca jsPDF está carregada.',
      type: 'error'
    });
  }
};
// ... existing code ...

function renderFAB() {
  // Remove qualquer FAB existente
  let fab = document.querySelector('.fab');
  if (fab) {
    fab.remove();
  }
  // Só renderiza se usuário estiver logado
  if (!window.appState.currentUser) {
    return;
  }
  fab = FAB();
  document.body.appendChild(fab);
}

// ... após a definição das funções ...
window.closeModal = closeModal;

// ... existing code ...

// ---
// Reforçar event listener do botão de voz do topo
// (garantir que só adiciona uma vez e que o botão existe)
document.addEventListener('DOMContentLoaded', () => {
  // setupThemeToggle() será chamada apenas quando necessário
  // Swipe navigation será inicializada após login
  // ... existing code ...
  setTimeout(() => {
    const voiceBtn = document.getElementById('voice-control');
    if (voiceBtn && !voiceBtn.dataset.voiceBound) {
      voiceBtn.addEventListener('click', () => {
        console.log('DEBUG: Botão de voz do topo clicado!');
        // Modal de escolha
        const modal = Modal({
          title: 'Comando de Voz',
          content: `
            <div class='space-y-4 text-center'>
              <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
              <div class='flex flex-col gap-3'>
                <button id='btn-voz-transacao' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
                <button id='btn-voz-categoria' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
              </div>
              <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
            </div>
          `,
          onClose: () => modal.remove()
        });
        document.body.appendChild(modal);
        setTimeout(() => {
          document
            .getElementById('btn-voz-transacao')
            ?.addEventListener('click', () => {
              closeModal();
              window.startVoiceRecognition('transaction');
            });
          document
            .getElementById('btn-voz-categoria')
            ?.addEventListener('click', () => {
              closeModal();
              window.startVoiceRecognition('category');
            });
        }, 100);
      });
      voiceBtn.dataset.voiceBound = '1';
    }
  }, 500); // Pequeno delay para garantir que o DOM está pronto
  // ... existing code ...
});
// ... existing code ...

// ... existing code ...
// Função utilitária para normalizar texto (remover acentos, minúsculo, pontuação final)
function normalizarTexto(str) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[.,;:!?]+$/, '') // remove pontuação final
    .trim();
}
// ... existing code ...

// Função para fechamento mensal (não utilizada atualmente)
/*
// Função para fechamento mensal (não utilizada atualmente)
async function _rotinaFechamentoMensal() {
  const user = window.FirebaseAuth.currentUser;
  if (!user) {
    return;
  }
  const budget = window.appState.currentBudget;
  if (!budget) {
    return;
  }

  console.log('🔄 Executando rotina de fechamento mensal...');

  // Salvar histórico
  await salvarHistoricoMensal(
    user.uid,
    window.appState.transactions,
    new Date()
  );
  // Limpar transações
  await limparTransacoes(user.uid);

  // APENAS VERIFICAR recorrentes (não aplicar automaticamente)
  try {
    const resultado = await aplicarRecorrentesDoMes(user.uid, budget.id, false);
    console.log('✅ Verificação de recorrentes concluída:', resultado);

    // Notificar se há recorrentes pendentes
    if (resultado.pendentes > 0) {
      console.log(
        `⚠️ ${resultado.pendentes} recorrente(s) pendente(s) para aplicação manual`
      );
    }
  } catch (error) {
    console.error('❌ Erro ao verificar recorrentes na rotina:', error);
  }

  console.log('✅ Rotina de fechamento mensal concluída');
}
*/

// Sistema de controle de recorrentes - NÃO AUTO-EFETIVAR
// Apenas verificar e notificar sobre recorrentes pendentes
console.log('🔄 Sistema de recorrentes configurado para controle manual');

// Função para carregar despesas recorrentes no estado global
async function loadRecorrentes() {
  try {
    const user = window.FirebaseAuth.currentUser;
    const budget = window.appState.currentBudget;
    if (!user || !budget) {
      window.appState.recorrentes = [];
      return;
    }
    window.appState.recorrentes = await getDespesasRecorrentes(
      user.uid,
      budget.id
    );
  } catch (error) {
    window.appState.recorrentes = [];
    console.error('Erro ao carregar despesas recorrentes:', error);
  }
}
window.loadRecorrentes = loadRecorrentes;
window.loadTransactions = loadTransactions;
window.loadCategories = loadCategories;

// Função para recalcular transações de uma recorrente editada
window.recalcularTransacoesRecorrente = async function(recorrenteId, novosDados) {
  try {
    console.log('🔄 Iniciando recálculo de transações para recorrente:', recorrenteId);
    
    // Buscar todas as transações desta recorrente
    const q = query(
      collection(db, 'transactions'),
      where('recorrenteId', '==', recorrenteId)
    );
    const querySnapshot = await getDocs(q);
    
    console.log(`📊 Encontradas ${querySnapshot.docs.length} transações para atualizar`);
    
    // Atualizar cada transação
    const updatePromises = querySnapshot.docs.map(async (doc) => {
      const transacao = doc.data();
      console.log('🔄 Atualizando transação:', doc.id, 'de', transacao.descricao, 'para', novosDados.descricao);
      
      await updateDoc(doc.ref, {
        descricao: novosDados.descricao,
        valor: novosDados.valor,
        categoriaId: novosDados.categoriaId,
        recorrenteNome: novosDados.descricao
      });
    });
    
    await Promise.all(updatePromises);
    console.log('✅ Todas as transações da recorrente foram atualizadas');
    
    // Atualizar appState local também
    if (window.appState.transactions) {
      window.appState.transactions.forEach(t => {
        if (t.recorrenteId === recorrenteId) {
          t.descricao = novosDados.descricao;
          t.valor = novosDados.valor;
          t.categoriaId = novosDados.categoriaId;
          t.recorrenteNome = novosDados.descricao;
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Erro ao recalcular transações da recorrente:', error);
  }
};

// Função global para aplicar recorrentes manualmente
// Função global para verificar recorrentes pendentes (sem aplicar)
window.verificarRecorrentes = async function () {
  try {
    const user = window.appState.currentUser;
    const budget = window.appState.currentBudget;

    if (!user || !budget) {
      Snackbar({
        message: 'Usuário não autenticado ou orçamento não selecionado.',
        type: 'error'
      });
      return;
    }

    console.log('🔍 Verificando recorrentes pendentes...');

    const resultado = await aplicarRecorrentesDoMes(user.uid, budget.id, false);

    Snackbar({
      message: `Recorrentes: ${resultado.pendentes} pendente(s), ${resultado.aplicadas} já aplicada(s)`,
      type: resultado.pendentes > 0 ? 'warning' : 'info'
    });

    return resultado;
  } catch (error) {
    console.error('Erro ao verificar recorrentes:', error);
    Snackbar({
      message: 'Erro ao verificar recorrentes: ' + error.message,
      type: 'error'
    });
  }
};

// Função global para aplicar recorrentes manualmente
window.aplicarRecorrentes = async function () {
  try {
    const user = window.appState.currentUser;
    const budget = window.appState.currentBudget;

    if (!user || !budget) {
      Snackbar({
        message: 'Usuário não autenticado ou orçamento não selecionado.',
        type: 'error'
      });
      return;
    }

    showLoading(true);
    console.log('🔄 Aplicando recorrentes manualmente...');

    const resultado = await aplicarRecorrentesDoMes(user.uid, budget.id, true);

    // Recarregar dados
    await loadTransactions();
    await loadRecorrentes();

    // Aguardar um pouco para os listeners processarem
    await new Promise(resolve => setTimeout(resolve, 500));

    // Atualizar UI
    renderDashboard();
    if (window._renderRecorrentes) {
      window._renderRecorrentes();
    }

    // Limpar logs antigos periodicamente (a cada 10 aplicações)
    if (Math.random() < 0.1) { // 10% de chance
      try {
        const { limparLogsAntigos } = await import('./recorrentes.js');
        await limparLogsAntigos(user.uid);
      } catch (error) {
        console.log('Erro ao limpar logs antigos:', error);
      }
    }

    Snackbar({
      message: `Recorrentes aplicadas: ${resultado.aplicadas} aplicada(s), ${resultado.pendentes} pendente(s)`,
      type: resultado.aplicadas > 0 ? 'success' : 'info'
    });
    showLoading(false);
  } catch (error) {
    console.error('Erro ao aplicar recorrentes:', error);
    Snackbar({
      message: 'Erro ao aplicar recorrentes: ' + error.message,
      type: 'error'
    });
    showLoading(false);
  }
};

// Adicionar função para renderizar o BottomNav
function renderBottomNav(activeRoute) {
  // Remove qualquer BottomNav existente
  let nav = document.querySelector('nav.bottom-nav');
  if (nav) {
    nav.remove();
  }
  // Só renderiza se usuário estiver logado
  if (!window.appState.currentUser) {
    return;
  }
  nav = BottomNav(activeRoute);
  nav.classList.add('bottom-nav');
  document.body.appendChild(nav);
  // Adiciona event listener diretamente após append
  nav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.getAttribute('data-route');
      console.log('Clicou na aba:', route); // Debug
      if (window.router) {
        window.router(route);
      }
    });
  });
  if (typeof setupNavigation === 'function') {
    setupNavigation();
  }
}

// Atualizar renderRecorrentes para também renderizar o BottomNav
async function renderRecorrentes() {
  await _renderRecorrentes();
  renderFAB();
  renderBottomNav('/recorrentes');
  // Swipe navigation já inicializada globalmente
}
window.renderRecorrentes = renderRecorrentes;

/*
// Atualizar o objeto de rotas (não utilizado atualmente)
const _routes = {
  '/dashboard': renderDashboard,
  '/transactions': renderTransactions,
  '/categories': renderCategories,
  '/recorrentes': async () => {
    await loadTransactions();
    await loadRecorrentes();
    await renderRecorrentes();
  },
  '/app': window.renderApp,
  '/settings': async () => {
    await window.renderSettings();
  }
};
*/

// ... existing code ...
document.addEventListener('recorrente-adicionada', () => {
  window.renderDashboard();
});

// ... existing code ...
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
// ... existing code ...

// ... existing code ...
// Função para esconder FAB quando modal está aberto e mostrar ao fechar
function toggleFABOnModal() {
  const fab = document.querySelector('.fab');
  const modal = document.querySelector('#app-modal');
  if (fab) {
    if (modal && getComputedStyle(modal).display !== 'none' && !modal.classList.contains('hidden')) {
      fab.classList.add('hidden');
    } else {
      fab.classList.remove('hidden');
    }
  }
}
// Observar abertura/fechamento de modais
const observer = new MutationObserver(toggleFABOnModal);
observer.observe(document.body, { childList: true, subtree: true });
// Também rodar ao carregar
setTimeout(toggleFABOnModal, 500);
// ... existing code ...

// ... existing code ...
// Adicionar listener para beforeinstallprompt
window.deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  window.deferredPrompt = e;
  const btn = document.getElementById('install-app-btn');
  if (btn) {
    btn.style.display = '';
  }
});

// Função para mostrar o botão de instalar
window.showInstallButton = function (forceShow = false) {
  const btn = document.getElementById('install-app-btn');
  if (!btn) {
    return;
  }
  if (window.deferredPrompt || forceShow) {
    btn.style.display = '';
    btn.onclick = async () => {
      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        const { outcome } = await window.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          window.deferredPrompt = null;
          btn.style.display = 'none';
        }
      }
    };
  } else {
    btn.style.display = 'none';
  }
};
// Função renderSettings movida para SettingsPage.js - removida duplicação
// Função global para compartilhar orçamento
window.compartilharOrcamento = async function () {
  const user = window.FirebaseAuth?.currentUser;
  if (!user) {
    Snackbar({
      message: 'Você precisa estar logado para compartilhar um orçamento.',
      type: 'error'
    });
    return;
  }
  const budget = window.appState.currentBudget;
  if (!budget) {
    Snackbar({ message: 'Nenhum orçamento selecionado.', type: 'error' });
    return;
  }
  const modal = Modal({
    title: 'Compartilhar Orçamento',
    content: `
      <form id="compartilhar-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">E-mail ou UID do usuário para compartilhar</label>
          <input type="text" id="compartilhar-uid" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="E-mail ou UID">
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Compartilhar</button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });
  setTimeout(() => {
    const form = document.getElementById('compartilhar-form');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const valor = document.getElementById('compartilhar-uid').value.trim();
        if (!valor) {
          return;
        }
        let uid = valor;
        // Se for e-mail, buscar UID pelo e-mail
        if (valor.includes('@')) {
          uid = await buscarUidPorEmail(valor);
          if (!uid) {
            Snackbar({
              message: 'Usuário não encontrado para este e-mail.',
              type: 'error'
            });
            return;
          }
        }
        try {
          const ref = doc(db, 'budgets', budget.id);
          const usuariosPermitidos = Array.isArray(budget.usuariosPermitidos)
            ? [...budget.usuariosPermitidos]
            : [];
          if (usuariosPermitidos.includes(uid)) {
            Snackbar({ message: 'Usuário já possui acesso.', type: 'info' });
            return;
          }
          usuariosPermitidos.push(uid);
          await updateDoc(ref, { usuariosPermitidos });
          // Atualizar localmente
          budget.usuariosPermitidos = usuariosPermitidos;
          await window.renderSettings();
          Snackbar({
            message: 'Orçamento compartilhado com sucesso!',
            type: 'success'
          });
          modal.remove();
        } catch (error) {
          Snackbar({
            message: 'Erro ao compartilhar orçamento: ' + error.message,
            type: 'error'
          });
        }
      });
    }
  }, 0);
  document.body.appendChild(modal);
};

// Função global para migrar transações antigas para nova categoria
window.migrarTransacoesAntigas = async function () {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      Snackbar({ message: 'Usuário não autenticado.', type: 'error' });
      return;
    }

    showLoading(true);
    console.log('🔄 Iniciando migração de transações antigas...');

    // Buscar transações que usam categoria antiga
    const transacoesAntigas = window.appState.transactions.filter(
      t => t.categoriaId === 'U1Oir63qtD2mEkWOODiz'
    );

    console.log(
      `📋 Encontradas ${transacoesAntigas.length} transações para migrar`
    );

    if (transacoesAntigas.length === 0) {
      Snackbar({
        message: 'Nenhuma transação antiga encontrada para migrar.',
        type: 'info'
      });
      showLoading(false);
      return;
    }

    // Buscar nova categoria "salario"
    const novaCategoria = window.appState.categories.find(
      c => c.nome === 'salario'
    );

    if (!novaCategoria) {
      Snackbar({
        message: 'Categoria "salario" não encontrada.',
        type: 'error'
      });
      showLoading(false);
      return;
    }

    console.log(
      `🎯 Migrando para categoria: ${novaCategoria.nome} (ID: ${novaCategoria.id}, Tipo: ${novaCategoria.tipo})`
    );

    // Migrar cada transação
    let migradas = 0;
    for (const transacao of transacoesAntigas) {
      try {
        await updateTransaction(transacao.id, {
          ...transacao,
          categoriaId: novaCategoria.id
        });
        migradas++;
        console.log(`✅ Transação migrada: ${transacao.descricao}`);
      } catch (error) {
        console.error(`❌ Erro ao migrar transação ${transacao.id}:`, error);
      }
    }

    // Recarregar dados
    await loadTransactions();
    await loadCategories();

    // Atualizar UI
    renderDashboard();
    renderTransactions();
    renderCategories();

    Snackbar({
      message: `${migradas} transação(ões) migrada(s) com sucesso!`,
      type: 'success'
    });

    showLoading(false);
  } catch (error) {
    console.error('Erro na migração:', error);
    Snackbar({ message: 'Erro na migração: ' + error.message, type: 'error' });
    showLoading(false);
  }
};

// Função global para corrigir tipo da categoria
window.corrigirTipoCategoria = async function () {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      Snackbar({ message: 'Usuário não autenticado.', type: 'error' });
      return;
    }

    showLoading(true);
    console.log('🔄 Corrigindo tipo da categoria salario...');

    // Buscar categoria "salario"
    const categoria = window.appState.categories.find(
      c => c.nome === 'salario'
    );

    if (!categoria) {
      Snackbar({
        message: 'Categoria "salario" não encontrada.',
        type: 'error'
      });
      showLoading(false);
      return;
    }

    // Verificar se há transações de despesa nesta categoria
    const transacoesDespesa = window.appState.transactions.filter(
      t => t.categoriaId === categoria.id && t.tipo === 'despesa'
    );

    if (transacoesDespesa.length > 0) {
      // Se há transações de despesa, mudar categoria para despesa
      await updateCategory(categoria.id, {
        ...categoria,
        tipo: 'despesa'
      });
      console.log('✅ Categoria alterada para: despesa');
      Snackbar({
        message: 'Categoria "salario" alterada para despesa.',
        type: 'success'
      });
    } else {
      Snackbar({
        message: 'Nenhuma transação de despesa encontrada na categoria.',
        type: 'info'
      });
    }

    showLoading(false);
  } catch (error) {
    console.error('Erro ao corrigir categoria:', error);
    Snackbar({
      message: 'Erro ao corrigir categoria: ' + error.message,
      type: 'error'
    });
    showLoading(false);
  }
};

// Função global para trocar de orçamento
window.setCurrentBudget = async function (budget) {
  if (!budget) {
    console.log('❌ Budget não fornecido para setCurrentBudget');
    return;
  }
  
  console.log('🔄 Iniciando troca de orçamento para:', budget.nome);
  
  if (
    window.appState.currentBudget &&
    window.appState.currentBudget.id === budget.id
  ) {
    console.log('ℹ️ Orçamento já está em uso, mas recarregando dados...');
    Snackbar({ message: 'Este orçamento já está em uso.', type: 'info' });
  }

  try {
    // Parar listeners antigos
    stopAllListeners();

    // Atualizar orçamento atual
    window.appState.currentBudget = budget;
    console.log('✅ Orçamento atualizado no appState:', budget.nome);

    // Iniciar todos os listeners em tempo real
    startAllListeners(budget.id);

    showLoading(true);

    // Carregar dados iniciais
    console.log('📊 Carregando dados iniciais...');
    await Promise.all([loadTransactions(), loadCategories(), loadRecorrentes()]);

    // Aguardar um pouco para os listeners processarem
    await new Promise(resolve => setTimeout(resolve, 500));

    // Renderizar todas as abas
    console.log('🎨 Renderizando todas as abas...');
    await window.renderSettings();
    renderDashboard();
    renderTransactions();
    renderCategories();
    if (window._renderRecorrentes) {
      window._renderRecorrentes();
    }

    showLoading(false);
    
    console.log('✅ Troca de orçamento concluída com sucesso!');
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao trocar orçamento:', error);
    showLoading(false);
    Snackbar({ 
      message: 'Erro ao trocar orçamento: ' + error.message, 
      type: 'error' 
    });
    return false;
  }
};

// Função para salvar usuário no Firestore
async function salvarUsuarioNoFirestore(user) {
  if (!user) {return;}
  await setDoc(
    doc(db, 'users', user.uid),
    {
      email: user.email,
      nome: user.displayName || ''
    },
    { merge: true }
  );
}

let unsubscribeBudget = null;
let unsubscribeTransactions = null;
let unsubscribeCategories = null;
let unsubscribeRecorrentes = null;

function listenCurrentBudget(budgetId) {
  if (unsubscribeBudget) {unsubscribeBudget();}
  if (!budgetId) {return;}
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

function listenTransactions(budgetId) {
  if (unsubscribeTransactions) {unsubscribeTransactions();}
  if (!budgetId) {return;}
  console.log('🎧 Iniciando listener de transações para budgetId:', budgetId);

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

      window.appState.transactions = transactions;
      console.log('🔄 Transações atualizadas:', transactions.length, 'itens');
      console.log(
        '📋 IDs das transações:',
        transactions.map(t => t.id)
      );
      console.log('🔄 Houve mudança?', hasChanged);
      if (hasChanged) {
        console.log('🔍 Detalhes da mudança:', { idsChanged, contentChanged });
      }

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

function listenCategories(budgetId) {
  if (unsubscribeCategories) {unsubscribeCategories();}
  if (!budgetId) {return;}
  console.log('🎧 Iniciando listener de categorias para budgetId:', budgetId);

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
        console.log('🔍 Detalhes da mudança:', { idsChanged, contentChanged });
      }

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

function listenRecorrentes(budgetId) {
  if (unsubscribeRecorrentes) {unsubscribeRecorrentes();}
  if (!budgetId) {return;}
  console.log('🎧 Iniciando listener de recorrentes para budgetId:', budgetId);

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
        console.log('🔍 Detalhes da mudança:', { idsChanged, contentChanged });
      }

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

function startAllListeners(budgetId) {
  console.log('🚀 Iniciando listeners para orçamento:', budgetId);
  console.log('📍 Estado atual:', {
    currentUser: window.appState.currentUser?.uid,
    currentBudget: window.appState.currentBudget?.id,
    budgetId: budgetId
  });

  // Parar listeners anteriores
  stopAllListeners();

  listenCurrentBudget(budgetId);
  listenTransactions(budgetId);
  listenCategories(budgetId);
  listenRecorrentes(budgetId);
  listenNotifications();

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

function stopAllListeners() {
  if (unsubscribeBudget) {unsubscribeBudget();}
  if (unsubscribeTransactions) {unsubscribeTransactions();}
  if (unsubscribeCategories) {unsubscribeCategories();}
  if (unsubscribeRecorrentes) {unsubscribeRecorrentes();}
  if (unsubscribeNotifications) {unsubscribeNotifications();}
}
// Exportar para uso global
window.stopAllListeners = stopAllListeners;
// Função para renderizar a página do aplicativo
window.renderApp = function () {
  const content = document.getElementById('app-content');

  content.innerHTML = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">📱 Aplicativo</h2>
        <p class="text-gray-600 dark:text-gray-400">Gerencie o aplicativo e suas configurações</p>
      </div>

      <!-- Seção: Instalação -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <span class="text-green-600 dark:text-green-400 text-lg">⬇️</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Instalação</h3>
        </div>
        
        <div class="space-y-3">
          <button id="install-app-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.installPWA()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📱</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Instalar App</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Baixar para a tela inicial</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Aparência -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
            <span class="text-orange-600 dark:text-orange-400 text-lg">🎨</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Aparência</h3>
        </div>
        
        <div class="space-y-3">
          <button id="theme-toggle-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <span id="theme-icon" class="text-xl">☀️</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Alternar Tema</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Claro / Escuro</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-orange-500 transition-colors">→</span>
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

      <!-- Seção: Segurança -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
            <span class="text-purple-600 dark:text-purple-400 text-lg">🔐</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Segurança</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.showBiometricSetup && window.showBiometricSetup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">👆</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Autenticação Biométrica</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Configurar impressão digital/face</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-purple-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Informações -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">ℹ️</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Informações</h3>
        </div>
        
        <div class="space-y-3">
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xl">📱</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Servo Tech Finanças</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Versão 4.1.0</div>
              </div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-2">
              © 2025 • Fundador: Igor Bispo
            </div>
          </div>
          
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xl">🌐</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">PWA (Progressive Web App)</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Funciona offline e como app nativo</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção: Benefícios -->
      <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">✨ Benefícios da Instalação</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start gap-3">
            <span class="text-2xl">🚀</span>
            <div>
              <div class="font-medium text-gray-800 dark:text-white">Acesso Rápido</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Pela tela inicial do dispositivo</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-2xl">📱</span>
            <div>
              <div class="font-medium text-gray-800 dark:text-white">Experiência Nativa</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Como um app instalado</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-2xl">🔌</span>
            <div>
              <div class="font-medium text-gray-800 dark:text-white">Funciona Offline</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Sem necessidade de internet</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-2xl">🔔</span>
            <div>
              <div class="font-medium text-gray-800 dark:text-white">Notificações</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Alertas importantes e lembretes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Atualizar botão de instalação do PWA
  setTimeout(() => {
    if (typeof window.updateInstallButton === 'function') {
      window.updateInstallButton();
    }
  }, 100);

  // Configurações serão feitas apenas quando necessário
  // (quando o usuário acessar as páginas específicas)
};

// Funções para gerenciar notificações
window.setupNotifications = function () {
  const btn = document.getElementById('notification-toggle-btn');
  // const status = document.getElementById('notification-status');
  // const icon = document.getElementById('notification-icon');

  if (!btn) {
    // Botão não existe na página atual, não é um erro
    return;
  }

  console.log('🔔 Configurando sistema de notificações...');
  console.log('📱 Permissão atual:', Notification.permission);
  console.log('💾 Status salvo:', localStorage.getItem('notifications-enabled'));

  // Verificar se as notificações estão ativadas
  const isEnabled = localStorage.getItem('notifications-enabled') === 'true';
  updateNotificationUI(isEnabled);

  // Remover event listeners anteriores para evitar duplicação
  btn.removeEventListener('click', btn._notificationHandler);

  // Criar novo handler
  btn._notificationHandler = async () => {
    try {
      console.log('🔔 Botão de notificação clicado...');

      if (Notification.permission === 'default') {
        console.log('🔔 Solicitando permissão do navegador...');
        const permission = await Notification.requestPermission();
        console.log('📱 Permissão retornada:', permission);

        if (permission === 'granted') {
          localStorage.setItem('notifications-enabled', 'true');
          updateNotificationUI(true);
          console.log('✅ Notificações ativadas com sucesso!');

          if (window.Snackbar) {
            window.Snackbar({
              message: '✅ Notificações ativadas com sucesso!',
              type: 'success'
            });
          }

          // Enviar notificação de teste
          setTimeout(() => {
            showNotification(
              'Notificações ativadas!',
              'Você receberá alertas importantes.'
            );
          }, 1000);
        } else {
          console.log('❌ Permissão negada pelo usuário');
          if (window.Snackbar) {
            window.Snackbar({
              message: '❌ Permissão de notificação negada',
              type: 'error'
            });
          }
        }
      } else if (Notification.permission === 'granted') {
        // Verificar se as notificações estão ativadas no localStorage
        const currentlyEnabled = localStorage.getItem('notifications-enabled') === 'true';

        if (currentlyEnabled) {
          // Desativar notificações
          localStorage.setItem('notifications-enabled', 'false');
          updateNotificationUI(false);
          console.log('🔕 Notificações desativadas');

          if (window.Snackbar) {
            window.Snackbar({
              message: '🔕 Notificações desativadas',
              type: 'info'
            });
          }
        } else {
          // Ativar notificações
          localStorage.setItem('notifications-enabled', 'true');
          updateNotificationUI(true);
          console.log('✅ Notificações ativadas com sucesso!');

          if (window.Snackbar) {
            window.Snackbar({
              message: '✅ Notificações ativadas com sucesso!',
              type: 'success'
            });
          }

          // Enviar notificação de teste
          setTimeout(() => {
            showNotification(
              'Notificações ativadas!',
              'Você receberá alertas importantes.'
            );
          }, 1000);
        }
      } else if (Notification.permission === 'denied') {
        // Abrir configurações do navegador
        console.log('❌ Permissão negada - abrindo configurações...');
        if (
          confirm(
            'Para ativar as notificações, você precisa permitir no navegador. Deseja abrir as configurações?'
          )
        ) {
          window.open('chrome://settings/content/notifications', '_blank');
        }
      }
    } catch (error) {
      console.error('❌ Erro ao configurar notificações:', error);
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Erro ao configurar notificações: ' + error.message,
          type: 'error'
        });
      }
    }
  };

  // Adicionar event listener
  btn.addEventListener('click', btn._notificationHandler);

  console.log('✅ Sistema de notificações configurado com sucesso');
};

function updateNotificationUI(enabled) {
  const btn = document.getElementById('notification-toggle-btn');
  const status = document.getElementById('notification-status');
  const icon = document.getElementById('notification-icon');

  if (!btn || !status || !icon) {return;}

  if (enabled) {
    icon.textContent = '🔔';
    btn.querySelector('.font-medium').textContent = 'Desativar Notificações';
    btn.querySelector('.text-sm').textContent = 'Clique para desativar';
    status.classList.remove('hidden');
  } else {
    icon.textContent = '🔕';
    btn.querySelector('.font-medium').textContent = 'Ativar Notificações';
    btn.querySelector('.text-sm').textContent = 'Receber alertas importantes';
    status.classList.add('hidden');
  }
}

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

// Tornar funções globais
window.showNotification = showNotification;
window.checkRecorrentesPendentes = checkRecorrentesPendentes;
window.checkLimitesCategoria = checkLimitesCategoria;

// ... existing code ...

// Função para criar categorias da planilha
window.criarCategoriasPlanilha = async () => {
  const budgetId = '5hSL7zW4pAKqw4ZBxrJF';

  const categorias = [
    { nome: 'MERCADO', limite: 1000, emoji: '🛒', cor: '#10B981' },
    { nome: 'RECARGA', limite: 120, emoji: '📱', cor: '#3B82F6' },
    { nome: 'LUZ', limite: 320, emoji: '💡', cor: '#F59E0B' },
    { nome: 'AGUA', limite: 85, emoji: '💧', cor: '#3B82F6' },
    { nome: 'REMEDIOS', limite: 100, emoji: '💊', cor: '#EF4444' },
    { nome: 'PADARIA', limite: 160, emoji: '🥖', cor: '#F59E0B' },
    { nome: 'FDS', limite: 800, emoji: '🎉', cor: '#EC4899' },
    { nome: 'CABELO IGOR', limite: 60, emoji: '✂️', cor: '#8B5CF6' },
    { nome: 'CAMILA', limite: 200, emoji: '👩', cor: '#EC4899' },
    { nome: 'INTERNET', limite: 40, emoji: '🌐', cor: '#3B82F6' },
    { nome: 'SEGURO CARRO', limite: 115, emoji: '🚗', cor: '#EF4444' },
    { nome: 'GABRIELA FRALDA', limite: 200, emoji: '👶', cor: '#F59E0B' },
    { nome: 'DIZMO', limite: 385, emoji: '⛪', cor: '#8B5CF6' },
    { nome: 'ACADEMIA', limite: 190, emoji: '💪', cor: '#059669' },
    { nome: 'GASOLINA', limite: 600, emoji: '⛽', cor: '#F97316' },
    { nome: 'ESCOLA GABI', limite: 480, emoji: '📚', cor: '#8B5CF6' },
    { nome: 'NETFLIX', limite: 35, emoji: '📺', cor: '#EF4444' },
    { nome: 'YOUTUBE', limite: 25, emoji: '▶️', cor: '#EF4444' },
    { nome: 'TAG CARRO', limite: 4, emoji: '🏷️', cor: '#6B7280' },
    { nome: 'GOOGLE CAMILA', limite: 8, emoji: '🔍', cor: '#3B82F6' },
    { nome: 'ALMOÇO CAMILA/LANCHE', limite: 300, emoji: '🍽️', cor: '#F59E0B' },
    { nome: 'TRANSPORTE GABI', limite: 130, emoji: '🚌', cor: '#3B82F6' },
    { nome: 'DIZMO CAMILA', limite: 210, emoji: '⛪', cor: '#8B5CF6' },
    { nome: 'GABI MICELANEAS', limite: 100, emoji: '🎒', cor: '#6B7280' },
    { nome: 'MEI CAMILA', limite: 81, emoji: '💼', cor: '#059669' }
  ];

  console.log('🚀 Iniciando criação das categorias...');

  for (let i = 0; i < categorias.length; i++) {
    const cat = categorias[i];
    try {
      await addCategory({
        nome: cat.nome,
        limite: cat.limite,
        tipo: 'despesa',
        cor: cat.cor,
        budgetId: budgetId
      });
      console.log(
        `✅ Categoria ${i + 1}/25 criada: ${cat.emoji} ${cat.nome} - R$ ${cat.limite}`
      );

      // Pequena pausa para não sobrecarregar o Firestore
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Erro ao criar categoria ${cat.nome}:`, error);
    }
  }

  console.log('🎉 Todas as categorias foram criadas com sucesso!');
  alert('✅ Todas as 25 categorias da sua planilha foram criadas com sucesso!');

  // Recarregar a interface
  if (window.renderCategories) {
    window.renderCategories();
  }
};

// Função para limpar todas as categorias (caso precise recriar)
window.limparCategorias = async () => {
  const budgetId = '5hSL7zW4pAKqw4ZBxrJF';

  if (
    !confirm(
      '⚠️ Tem certeza que deseja EXCLUIR TODAS as categorias? Esta ação não pode ser desfeita!'
    )
  ) {
    return;
  }

  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, where('budgetId', '==', budgetId));
    const querySnapshot = await getDocs(q);

    let deletedCount = 0;
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
    }

    console.log(`🗑️ ${deletedCount} categorias excluídas`);
    alert(`🗑️ ${deletedCount} categorias foram excluídas!`);

    // Recarregar a interface
    if (window.renderCategories) {
      window.renderCategories();
    }
  } catch (error) {
    console.error('❌ Erro ao limpar categorias:', error);
    alert('❌ Erro ao limpar categorias: ' + error.message);
  }
};

// Sistema de sincronização automática
window.syncAllData = async () => {
  console.log('🔄 Sincronizando todos os dados...');
  
  try {
    // Recarregar todos os dados
    await window.loadRecorrentes();
    await window.loadTransactions();
    await window.loadCategories();
    
    // Atualizar todas as abas ativas
    const currentHash = window.location.hash;
    
    if (currentHash.includes('recorrentes')) {
      window._renderRecorrentes();
    } else if (currentHash.includes('dashboard')) {
      window.renderDashboard();
    } else if (currentHash.includes('transacoes')) {
      window.renderTransactions();
    } else if (currentHash.includes('categorias')) {
      window.renderCategories();
    }
    
    console.log('✅ Sincronização concluída');
  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
  }
};

// Listeners para sincronização automática
document.addEventListener('recorrente-adicionada', async () => {
  console.log('🔄 Evento: Recorrente adicionada - Sincronizando...');
  await window.syncAllData();
});
document.addEventListener('dados-atualizados', async () => {
  console.log('🔄 Evento: Dados atualizados - Sincronizando...');
  await window.syncAllData();
});
// Sincronização automática a cada 30 segundos
setInterval(async () => {
  if (window.appState.currentUser && window.appState.currentBudget) {
    await window.syncAllData();
  }
}, 30000);

// Função para sair de um orçamento compartilhado
async function leaveSharedBudget(budgetId) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const { getDoc, updateDoc } = await import('firebase/firestore');
    const budgetRef = doc(db, 'budgets', budgetId);
    const budgetDoc = await getDoc(budgetRef);
    
    if (!budgetDoc.exists()) {
      throw new Error('Orçamento não encontrado');
    }

    const budgetData = budgetDoc.data();
    
    // Verificar se o usuário é o dono do orçamento
    if (budgetData.userId === user.uid) {
      throw new Error('Você é o dono deste orçamento. Não é possível sair.');
    }

    // Verificar se o usuário tem acesso ao orçamento
    if (!budgetData.usuariosPermitidos || !budgetData.usuariosPermitidos.includes(user.uid)) {
      throw new Error('Você não tem acesso a este orçamento');
    }

    // Remover o usuário da lista de usuários permitidos
    const updatedUsuariosPermitidos = budgetData.usuariosPermitidos.filter(uid => uid !== user.uid);
    
    await updateDoc(budgetRef, {
      usuariosPermitidos: updatedUsuariosPermitidos
    });

    // Se o orçamento atual for o que está sendo abandonado, trocar para outro
    if (window.appState.currentBudget?.id === budgetId) {
      const otherBudgets = window.appState.budgets.filter(b => b.id !== budgetId);
      if (otherBudgets.length > 0) {
        await setCurrentBudget(otherBudgets[0]);
      } else {
        // Se não houver outros orçamentos, criar um novo
        const newBudget = await addBudget({
          nome: 'Meu Orçamento',
          descricao: 'Orçamento pessoal'
        });
        await loadBudgets();
        const budget = window.appState.budgets.find(b => b.id === newBudget);
        if (budget) {
          await setCurrentBudget(budget);
        }
      }
    }

    // Recarregar orçamentos
    await loadBudgets();
    
    Snackbar({
      message: '✅ Você saiu do orçamento compartilhado com sucesso!',
      type: 'success'
    });

    // Recarregar a view atual
    await refreshCurrentView();

  } catch (error) {
    console.error('Erro ao sair do orçamento compartilhado:', error);
    Snackbar({
      message: 'Erro ao sair do orçamento: ' + error.message,
      type: 'error'
    });
    throw error;
  }
}

// Função para remover um usuário de um orçamento compartilhado (apenas para o dono)
async function removeUserFromBudget(budgetId, userToRemoveId) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const { getDoc, updateDoc } = await import('firebase/firestore');
    const budgetRef = doc(db, 'budgets', budgetId);
    const budgetDoc = await getDoc(budgetRef);
    
    if (!budgetDoc.exists()) {
      throw new Error('Orçamento não encontrado');
    }

    const budgetData = budgetDoc.data();
    
    // Verificar se o usuário atual é o dono do orçamento
    if (budgetData.userId !== user.uid) {
      throw new Error('Apenas o dono do orçamento pode remover usuários');
    }

    // Verificar se o usuário a ser removido existe na lista
    if (!budgetData.usuariosPermitidos || !budgetData.usuariosPermitidos.includes(userToRemoveId)) {
      throw new Error('Usuário não encontrado na lista de compartilhamento');
    }

    // Remover o usuário da lista de usuários permitidos
    const updatedUsuariosPermitidos = budgetData.usuariosPermitidos.filter(uid => uid !== userToRemoveId);
    
    await updateDoc(budgetRef, {
      usuariosPermitidos: updatedUsuariosPermitidos
    });

    Snackbar({
      message: '✅ Usuário removido do orçamento com sucesso!',
      type: 'success'
    });

    // Recarregar orçamentos
    await loadBudgets();
    
    // Recarregar a view atual
    await refreshCurrentView();

  } catch (error) {
    console.error('Erro ao remover usuário do orçamento:', error);
    Snackbar({
      message: 'Erro ao remover usuário: ' + error.message,
      type: 'error'
    });
    throw error;
  }
}

// Função para obter informações de um usuário por UID
async function getUserInfo(uid) {
  try {
    const { getDoc } = await import('firebase/firestore');
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
    const { getDoc, addDoc, collection } = await import('firebase/firestore');
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

// Função para carregar notificações do usuário
async function loadNotifications() {
  try {
    const user = auth.currentUser;
    if (!user) return;

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

// Função para atualizar badge de notificações
function updateNotificationBadge() {
  const unreadCount = window.appState.notifications?.filter(n => !n.read).length || 0;
  
  // Atualizar badge na navegação
  const notificationBadge = document.querySelector('.notification-badge');
  if (notificationBadge) {
    if (unreadCount > 0) {
      notificationBadge.textContent = unreadCount > 99 ? '99+' : unreadCount;
      notificationBadge.style.display = 'block';
    } else {
      notificationBadge.style.display = 'none';
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
  if (!user) return;

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
  });
}

// Função para renderizar notificações
function renderNotifications() {
  const notifications = window.appState.notifications || [];
  const content = document.getElementById('app-content');
  
  if (!content) return;

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">🔔 Notificações</h2>
        <div class="flex items-center gap-2">
          <button onclick="window.markAllNotificationsAsRead && window.markAllNotificationsAsRead()" class="btn-secondary">
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
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 ${!notification.read ? 'border-l-4 border-blue-500' : ''}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-lg">💰</span>
                      <h3 class="font-semibold text-gray-800 dark:text-white">
                        Nova transação no orçamento "${notification.budgetName}"
                      </h3>
                      ${!notification.read ? '<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Nova</span>' : ''}
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>${notification.senderName}</strong> adicionou uma ${notification.transactionTipo}:
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium text-gray-800 dark:text-white">${notification.transactionDescricao}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">${notification.transactionCategoria}</div>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-lg ${notification.transactionTipo === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                            R$ ${notification.transactionValor.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      ${notification.createdAt?.toDate ? notification.createdAt.toDate().toLocaleString('pt-BR') : 'Data não disponível'}
                    </div>
                  </div>
                  ${!notification.read ? `
                    <button onclick="markNotificationAsRead('${notification.id}')" 
                            class="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                      Marcar como lida
                    </button>
                  ` : ''}
                </div>
              </div>
            `).join('') : `
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
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
}

// Expor funções globalmente
window.leaveSharedBudget = leaveSharedBudget;
window.removeUserFromBudget = removeUserFromBudget;
window.getUserInfo = getUserInfo;
window.loadNotifications = loadNotifications;
window.markNotificationAsRead = markNotificationAsRead;
window.renderNotifications = renderNotifications;

// ... existing code ...