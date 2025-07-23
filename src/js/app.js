import { aplicarRecorrentesDoMes } from './recorrentes/aplicarRecorrentes.js';
import './showAddRecorrenteModal.js';
import { setupThemeToggle } from './ui/ThemeToggle.js';
import { enableSwipeNavigation } from './ui/SwipeTabs.js';
import { app, auth, db } from './firebase.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { loginWithGoogle, logout } from './auth.js';
import { addTransacao, getTransacoes, salvarHistoricoMensal, limparTransacoes, getDespesasRecorrentes, addDespesaRecorrente, updateDespesaRecorrente, deleteDespesaRecorrente } from './firestore.js';
import { CardResumo } from './ui/CardResumo.js';
import { Modal } from './ui/Modal.js';
import { Snackbar } from './ui/Snackbar.js';
import { FAB } from './ui/FAB.js';
import { BottomNav } from './ui/BottomNav.js';
import { renderRecorrentes as _renderRecorrentes } from './recorrentes/RecorrentesPage.js';

// Configurar persistência da sessão
// setPersistence(auth, browserLocalPersistence);

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
      document.body.classList.add('login-open');
    }
    if (mainApp) {
      mainApp.style.display = 'none';
    }
  } else {
    if (loginPage) {
      loginPage.style.display = 'none';
      document.body.classList.remove('login-open');
    }
    if (mainApp) {
      mainApp.style.display = 'block';
    }
  }
}

// Função para atualizar a interface após operações CRUD
async function refreshCurrentView() {
  const currentTab = document.querySelector('.nav-item.active')?.getAttribute('data-tab');
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
        renderSettings();
        break;
    }
  }
}

// Funções de CRUD para transações
async function addTransaction(transactionData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');
    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) throw new Error('Nenhum orçamento selecionado');
    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transactionData,
      userId: user.uid,
      budgetId,
      createdAt: serverTimestamp()
    });
    await refreshCurrentView();
    renderDashboard(); // Atualiza dashboard imediatamente
    return docRef;
  } catch (error) {
    throw error;
  }
}

async function updateTransaction(transactionId, transactionData) {
  try {
    const docRef = doc(db, 'transactions', transactionId);
    await updateDoc(docRef, transactionData);
    await refreshCurrentView();
    renderDashboard();
  } catch (error) {
    throw error;
  }
}

async function deleteTransaction(transactionId) {
  try {
    const docRef = doc(db, 'transactions', transactionId);
    await deleteDoc(docRef);
    await refreshCurrentView();
    renderDashboard();
  } catch (error) {
    throw error;
  }
}

async function loadTransactions() {
  try {
    const user = auth.currentUser;
    if (!user) return;
    
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      where('budgetId', '==', window.appState.currentBudget?.id)
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
    if (!user) throw new Error('Usuário não autenticado');
    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) throw new Error('Nenhum orçamento selecionado');
    const docRef = await addDoc(collection(db, 'categories'), {
      ...categoryData,
      nome: normalizarTexto(categoryData.nome), // salva nome limpo
      userId: user.uid,
      budgetId,
      createdAt: serverTimestamp()
    });
    await refreshCurrentView();
    await loadCategories(); // Garante atualização do estado
    renderDashboard();
    return docRef;
  } catch (error) {
    throw error;
  }
}

async function updateCategory(categoryId, categoryData) {
  try {
    const docRef = doc(db, 'categories', categoryId);
    await updateDoc(docRef, categoryData);
    await refreshCurrentView();
    renderDashboard();
  } catch (error) {
    throw error;
  }
}

async function deleteCategory(categoryId) {
  try {
    const docRef = doc(db, 'categories', categoryId);
    await deleteDoc(docRef);
    await refreshCurrentView();
    await loadCategories(); // Garante atualização do estado
    renderDashboard();
  } catch (error) {
    throw error;
  }
}

async function loadCategories() {
  try {
    const user = auth.currentUser;
    if (!user) return;
    
    const q = query(
      collection(db, 'categories'),
      where('userId', '==', user.uid),
      where('budgetId', '==', window.appState.currentBudget?.id)
    );
    const querySnapshot = await getDocs(q);
    window.appState.categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

// Funções de CRUD para orçamentos
async function addBudget(budgetData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');
    const docRef = await addDoc(collection(db, 'budgets'), {
      ...budgetData,
      userId: user.uid,
      createdAt: serverTimestamp()
    });
    await refreshCurrentView();
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar orçamento:', error);
    throw error;
  }
}

async function loadBudgets() {
  try {
    const user = auth.currentUser;
    if (!user) return;
    
    const q = query(
      collection(db, 'budgets'),
      where('userId', '==', user.uid)
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

// Funções de renderização das telas
function setSubtitle(subtitle) {
  // Função agora não faz nada para evitar duplicidade de título
}

async function renderDashboard() {
  try {
    const content = document.getElementById('app-content');
    if (!content) return;
    setSubtitle('Dashboard');
    content.innerHTML = '';

    // Calcular totais
    const receitas = window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const despesas = window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const saldo = receitas - despesas;

    // Calcular limites das categorias e orçado
    const totalLimite = window.appState.categories
      .reduce((sum, cat) => sum + parseFloat(cat.limite || 0), 0);
    const orcado = totalLimite - despesas;

    content.innerHTML = `<div id="dashboard-cards" class="grid grid-cols-4 gap-1 md:gap-4 mb-4"></div>` + content.innerHTML;
    const cardsContainer = document.getElementById('dashboard-cards');
    cardsContainer.innerHTML = '';
    const cards = [
      {
        titulo: 'Receitas',
        valor: `R$ ${receitas.toFixed(2)}`,
        cor: 'card-resumo receita',
        icone: '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/></svg>'
      },
      {
        titulo: 'Despesas',
        valor: `R$ ${despesas.toFixed(2)}`,
        cor: 'card-resumo despesa',
        icone: '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 12h18" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/></svg>'
      },
      {
        titulo: 'Saldo',
        valor: `R$ ${saldo.toFixed(2)}`,
        cor: 'card-resumo saldo',
        icone: '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" stroke-width="2"/></svg>'
      },
      {
        titulo: 'Orçado',
        valor: `R$ ${orcado.toFixed(2)}`,
        cor: 'card-resumo orcado',
        icone: '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#eab308" stroke-width="2"/></svg>'
      }
    ];
    cards.forEach(cardData => {
      cardsContainer.appendChild(CardResumo(cardData));
    });

    // Adicionar o restante do dashboard
    content.innerHTML += `
      <!-- Espaço entre cards e categorias -->
      <div style="height: 1.5rem;"></div>
      <!-- Categorias com Progresso -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Categorias</h3>
        <div class="space-y-2 md:space-y-4">
          ${window.appState.categories.map(cat => {
            const transacoesCategoria = window.appState.transactions
              .filter(t => t.categoriaId === cat.id && t.tipo === 'despesa');
            const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
            const limite = parseFloat(cat.limite || 0);
            const percentual = limite > 0 ? (gasto / limite) * 100 : 0;
            const saldo = limite - gasto;
            return `
              <div class="border rounded-lg p-2 md:p-4">
                <div class="flex justify-between items-center mb-1 md:mb-2">
                  <div class="flex items-center space-x-2 md:space-x-3">
                    <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
                    <span class="font-semibold text-xs md:text-base">${cat.nome}</span>
                  </div>
                  <div class="text-right">
                    <p class="text-xs md:text-sm text-gray-600">R$ ${gasto.toFixed(2)} / R$ ${limite.toFixed(2)}</p>
                    <p class="text-xs md:text-sm ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}">
                      Saldo: R$ ${saldo.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-1 md:mb-2">
                  <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${
                    percentual > 100 ? 'bg-red-500' : percentual > 80 ? 'bg-yellow-500' : 'bg-green-500'
                  }" style="width: ${Math.min(percentual, 100)}%"></div>
                </div>
                <div class="flex flex-wrap justify-end gap-1 md:space-x-2">
                  <button onclick="editCategory('${cat.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Editar</button>
                  <button onclick="deleteCategory('${cat.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Excluir</button>
                  <button onclick="showCategoryHistory('${cat.id}')" class="text-gray-600 hover:text-gray-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Histórico</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      <!-- Espaço entre categorias e despesas recorrentes -->
      <div style="height: 1.5rem;"></div>
      <!-- === Despesas Recorrentes === -->
      <div class="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 md:p-6 mb-4">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold text-gray-900 font-inter">Despesas Recorrentes</h3>
          <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold font-inter">
            + Nova Despesa Recorrente
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${(window.appState.recorrentes || []).length === 0 ? `<p class='text-gray-500 text-center py-4 font-inter'>Nenhuma despesa recorrente cadastrada</p>` :
            (window.appState.recorrentes || []).map(r => {
              const categoria = (window.appState.categories || []).find(c => c.id === r.categoriaId);
              return `
                <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 gap-1 md:gap-0 bg-white shadow font-inter">
                  <div class="flex-1 min-w-[120px]">
                    <p class="font-medium text-xs md:text-base">${r.descricao}</p>
                    <p class="text-xs md:text-sm text-gray-500">
                      ${categoria?.nome || 'Sem categoria'}
                      • R$ ${parseFloat(r.valor).toFixed(2)}
                      ${r.parcelasRestantes !== undefined ? `• ${r.parcelasRestantes}x restantes` : ''}
                    </p>
                  </div>
                  <div class="flex items-center space-x-1 md:space-x-2">
                    <button onclick="window.showAddRecorrenteModal(${JSON.stringify(r).replace(/\"/g, '&quot;')})" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                    <button onclick="window.handleDeleteRecorrente('${r.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                  </div>
                </div>
              `;
            }).join('')}
        </div>
      </div>
      <!-- Espaço entre categorias e transações recentes -->
      <div style="height: 1.5rem;"></div>
      <!-- Transações Recentes -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold">Transações Recentes</h3>
          <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
            + Nova Transação
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${window.appState.transactions.slice(0, 10).map(t => {
            const categoria = window.appState.categories.find(c => c.id === t.categoriaId);
            return `
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 gap-1 md:gap-0">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base">${t.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500">${categoria?.nome || 'Sem categoria'} • ${t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : ''}</p>
                </div>
                <div class="flex items-center space-x-1 md:space-x-2">
                  <span class="font-bold text-xs md:text-base ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                    ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                  </span>
                  <button onclick="window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                  <button onclick="window.deleteTransaction('${t.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    // Após renderizar o conteúdo:
    renderFAB();
    enableSwipeNavigation();
    renderBottomNav('/dashboard');
  } catch (err) {
    console.error('Erro ao renderizar dashboard:', err);
    const content = document.getElementById('app-content');
    if (content) {
      content.innerHTML += `<div class='text-red-600 text-center mt-4'>Erro ao carregar dashboard. Tente novamente.</div>`;
    }
  }
}

function renderTransactions() {
  const content = document.getElementById('app-content');
  // setSubtitle('Transações'); // Removido para evitar duplicidade
  content.innerHTML = `
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="tab-title-highlight">Transações</h2>
        <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Transação</span>
          <button onclick="startVoiceRecognition('transaction')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="bg-white rounded-xl shadow-lg">
        ${window.appState.transactions.length === 0 ? `
          <div class="p-4 md:p-8 text-center text-gray-500">
            <p class="text-base md:text-lg">Nenhuma transação encontrada</p>
            <p class="text-xs md:text-sm">Adicione sua primeira transação!</p>
          </div>
        ` : window.appState.transactions.map(t => {
          const categoria = window.appState.categories.find(c => c.id === t.categoriaId);
          return `
            <div class="flex flex-wrap justify-between items-center p-2 md:p-4 border-b last:border-b-0 hover:bg-gray-50 gap-1 md:gap-0">
              <div class="flex-1 min-w-[120px]">
                <p class="font-medium text-xs md:text-base">${t.descricao}</p>
                <p class="text-xs md:text-sm text-gray-500">${categoria?.nome || 'Sem categoria'} • ${t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : ''}</p>
              </div>
              <div class="flex items-center space-x-1 md:space-x-2">
                <span class="font-bold text-xs md:text-base ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                  ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                </span>
                <button onclick="editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                <button onclick="deleteTransaction('${t.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  renderFAB();
  enableSwipeNavigation();
  renderBottomNav('/transactions');
}

function renderCategories() {
  const content = document.getElementById('app-content');
  // setSubtitle('Categorias'); // Removido para evitar duplicidade
  content.innerHTML = `
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="tab-title-highlight">Categorias</h2>
        <button onclick="showAddCategoryModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Categoria</span>
          <button onclick="startVoiceRecognition('category')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        ${window.appState.categories.map(cat => {
          const transacoesCategoria = window.appState.transactions
            .filter(t => t.categoriaId === cat.id && t.tipo === 'despesa');
          const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
          const limite = parseFloat(cat.limite || 0);
          const percentual = limite > 0 ? (gasto / limite) * 100 : 0;
          const saldo = limite - gasto;
          
          return `
            <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
              <div class="flex items-center justify-between mb-2 md:mb-4">
                <div class="flex items-center space-x-2 md:space-x-3">
                  <div class="w-6 h-6 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
                  <span class="font-bold text-xs md:text-lg">${cat.nome}</span>
                </div>
                <div class="text-right">
                  <p class="text-xs md:text-sm text-gray-600">Limite: R$ ${limite.toFixed(2)}</p>
                  <p class="text-xs md:text-sm ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}">
                    Saldo: R$ ${saldo.toFixed(2)}
                  </p>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-2 md:mb-4">
                <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${
                  percentual > 100 ? 'bg-red-500' : percentual > 80 ? 'bg-yellow-500' : 'bg-green-500'
                }" style="width: ${Math.min(percentual, 100)}%"></div>
              </div>
              <div class="flex flex-wrap justify-between text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                <span>Gasto: R$ ${gasto.toFixed(2)}</span>
                <span>${percentual.toFixed(1)}% usado</span>
              </div>
              <div class="flex flex-wrap justify-end gap-1 md:space-x-2">
                <button onclick="editCategory('${cat.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-base">Editar</button>
                <button onclick="deleteCategory('${cat.id}')" class="bg-red-100 text-red-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-red-200 text-xs md:text-base">Excluir</button>
                <button onclick="showCategoryHistory('${cat.id}')" class="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-200 text-xs md:text-base">Histórico</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  renderFAB();
  enableSwipeNavigation();
  renderBottomNav('/categories');
}

// ... existing code ...
// Variável global para armazenar o evento de instalação
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Exibir botão de instalar se estiver na aba de configurações
  if (document.querySelector('.nav-item.active[data-tab="settings"]')) {
    showInstallButton(true);
  }
});

function showInstallButton(show) {
  const btn = document.getElementById('install-app-btn');
  if (btn) btn.style.display = show ? 'block' : 'none';
}

// Adicionar botão na renderização das configurações
function renderSettings() {
  const content = document.getElementById('app-content');
  // setSubtitle('Configurações'); // Removido para evitar duplicidade
  content.innerHTML = `
    <div class="space-y-2 md:space-y-8">
      <h2 class="tab-title-highlight">Configurações</h2>
      <!-- Botão de instalar aplicativo -->
      <button id="install-app-btn" style="display:none" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold mb-4">📱 Baixar aplicativo</button>
      
      <!-- Guia do Usuário -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">📖 Guia do Usuário</h3>
        <p class="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Baixe o manual completo com todas as funcionalidades do aplicativo</p>
        <button onclick="generateUserGuide()" class="w-full bg-purple-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-purple-600 text-xs md:text-base">
          📄 Baixar Guia Completo (PDF)
        </button>
      </div>
      
      <!-- Perfil do Usuário -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Perfil</h3>
        <div class="space-y-2 md:space-y-4">
          <div>
            <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-gray-900 font-medium text-xs md:text-base">${window.appState.currentUser?.email || 'N/A'}</p>
          </div>
          <button onclick="logout()" class="bg-red-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-red-600 text-xs md:text-base">
            Sair da Conta
          </button>
        </div>
      </div>
      
      <!-- Orçamentos -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold">Orçamentos</h3>
          <div class="flex gap-1 md:gap-2">
            <button onclick="showAddBudgetModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
              + Novo Orçamento
            </button>
            <button onclick="selectSharedBudget()" class="bg-purple-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-purple-600 text-xs md:text-base">
              Entrar em Orçamento
            </button>
          </div>
        </div>
        <div class="space-y-2 md:space-y-4">
          ${window.appState.budgets.map(budget => `
            <div class="border rounded-lg p-2 md:p-4 flex flex-wrap justify-between items-center">
              <div>
                <p class="font-medium text-xs md:text-base">${budget.nome}</p>
                <p class="text-xs md:text-sm text-gray-500">ID: <span class='select-all'>${budget.id}</span></p>
              </div>
              <div class="flex gap-1 md:space-x-2">
                <button onclick="copyBudgetId('${budget.id}')" class="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-200 text-xs md:text-sm" title="Copiar ID do orçamento">
                  📋 Copiar ID
                </button>
                <button onclick="selectBudget('${budget.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-sm">
                  Selecionar
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Exportar e Backup -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Exportar e Backup</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <button onclick="exportToExcel()" class="bg-green-500 text-white p-2 md:p-4 rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📊</span>
            <span>Exportar Excel</span>
          </button>
          <button onclick="exportToPDF()" class="bg-red-500 text-white p-2 md:p-4 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📄</span>
            <span>Exportar PDF</span>
          </button>
          <button onclick="downloadBackup()" class="bg-purple-500 text-white p-2 md:p-4 rounded-lg hover:bg-purple-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>💾</span>
            <span>Backup Completo</span>
          </button>
          <button onclick="importBackup()" class="bg-orange-500 text-white p-2 md:p-4 rounded-lg hover:bg-orange-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📥</span>
            <span>Importar Backup</span>
          </button>
        </div>
      </div>
    </div>
  `;
  // Exibir botão se possível instalar
  showInstallButton(!!deferredPrompt);
  // Evento de clique para instalar
  const installBtn = document.getElementById('install-app-btn');
  if (installBtn) {
    installBtn.onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          installBtn.textContent = 'Aplicativo instalado!';
          installBtn.disabled = true;
        }
        deferredPrompt = null;
        showInstallButton(false);
      }
    };
  }
  renderFAB();
  enableSwipeNavigation();
  renderBottomNav('/settings');
}
// ... existing code ...

// Atualizar router para sempre renderizar e recarregar dados ao trocar de aba
async function router(path) {
  const content = document.getElementById('app-content');
  document.querySelectorAll('.nav-btn').forEach(item => {
    item.classList.remove('active');
  });
  const navBtn = document.querySelector(`.nav-btn[data-route='${path}']`);
  if (navBtn) navBtn.classList.add('active');

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
      loadCategories().then(renderCategories);
      break;
    case '/recorrentes':
      await loadRecorrentes();
      await renderRecorrentes();
      break;
    case '/settings':
      loadBudgets().then(renderSettings);
      break;
    default:
      await loadCategories();
      await loadRecorrentes();
      await renderDashboard();
  }
}

// Reforçar listener ao trocar de orçamento
function setCurrentBudget(budget) {
  window.appState.currentBudget = budget;
  listenTransactions();
}

// Funções globais para modais e ações
window.showAddTransactionModal = function(initialData = {}) {
  const modal = Modal({
    title: 'Adicionar Transação',
    content: `
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <input type="text" id="transaction-descricao" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Supermercado"
                 value="${initialData.descricao || ''}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
          <input type="number" id="transaction-valor" required step="0.01" min="0"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00"
                 value="${initialData.valor !== undefined ? initialData.valor : ''}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="transaction-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            <option value="receita" ${initialData.tipo === 'receita' ? 'selected' : ''}>Receita</option>
            <option value="despesa" ${initialData.tipo === 'despesa' ? 'selected' : ''}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select id="transaction-categoria" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            ${window.appState.categories.length > 0 ? 
              window.appState.categories.map(cat => 
                `<option value="${cat.id}" ${initialData.categoriaId === cat.id ? 'selected' : ''}>${cat.nome}</option>`
              ).join('') : 
              '<option value="" disabled>Nenhuma categoria disponível</option>'
            }
          </select>
          ${window.appState.categories.length === 0 ? 
            '<p class="text-sm text-red-500 mt-1">Crie uma categoria primeiro</p>' : ''
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
  document.getElementById('transaction-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const descricao = document.getElementById('transaction-descricao').value;
    const valor = parseFloat(document.getElementById('transaction-valor').value);
    const tipo = document.getElementById('transaction-tipo').value;
    const categoriaId = document.getElementById('transaction-categoria').value;
    
    try {
      await addTransaction({
        descricao,
        valor,
        tipo,
        categoriaId
      });
      modal.remove(); // Fecha o modal primeiro
      renderDashboard(); // Atualiza o dashboard imediatamente
      Snackbar({ message: 'Transação adicionada com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      Snackbar({ message: 'Erro ao adicionar transação: ' + error.message, type: 'error' });
    }
  });
};

window.showAddCategoryModal = function(initialData = {}) {
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
  document.getElementById('category-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('category-nome').value;
    const tipo = document.getElementById('category-tipo').value;
    const limite = parseFloat(document.getElementById('category-limite').value) || 0;
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
      Snackbar({ message: 'Categoria adicionada com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      Snackbar({ message: 'Erro ao adicionar categoria: ' + error.message, type: 'error' });
    }
  });
};

window.showAddBudgetModal = function() {
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
  
  // Adicionar evento de submit
  document.getElementById('budget-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('budget-nome').value;
    const descricao = document.getElementById('budget-descricao').value;
    
    try {
      await addBudget({
        nome,
        descricao
      });
      
      modal.remove(); // Fecha o modal primeiro
      router('/settings'); // Recarregar configurações
      Snackbar({ message: 'Orçamento adicionado com sucesso!', type: 'success' });
    } catch (error) {
      console.error('Erro ao adicionar orçamento:', error);
      Snackbar({ message: 'Erro ao adicionar orçamento: ' + error.message, type: 'error' });
    }
  });
};

window.editTransaction = function(id) {
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
            ${window.appState.categories.map(cat => 
              `<option value="${cat.id}" ${transaction.categoriaId === cat.id ? 'selected' : ''}>${cat.nome}</option>`
            ).join('')}
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
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const descricao = document.getElementById('edit-transaction-descricao').value;
        const valor = parseFloat(document.getElementById('edit-transaction-valor').value);
        const tipo = document.getElementById('edit-transaction-tipo').value;
        const categoriaId = document.getElementById('edit-transaction-categoria').value;
        try {
          await updateTransaction(id, {
            descricao,
            valor,
            tipo,
            categoriaId
          });
          modal.remove();
          router('/dashboard');
          Snackbar({ message: 'Transação atualizada com sucesso!', type: 'success' });
        } catch (error) {
          console.error('Erro ao atualizar transação:', error);
          Snackbar({ message: 'Erro ao atualizar transação: ' + error.message, type: 'error' });
        }
      });
    }
  }, 0);
};

window.deleteTransaction = function(id) {
  if (confirm('Tem certeza que deseja excluir esta transação?')) {
    deleteTransaction(id);
  }
};

window.editCategory = function(id) {
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
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('edit-category-nome').value;
        const tipo = document.getElementById('edit-category-tipo').value;
        const limite = parseFloat(document.getElementById('edit-category-limite').value) || 0;
        const cor = document.getElementById('edit-category-cor').value;
        try {
          await updateCategory(id, {
            nome,
            tipo,
            limite,
            cor
          });
          modal.remove();
          router('/categories');
          Snackbar({ message: 'Categoria atualizada com sucesso!', type: 'success' });
        } catch (error) {
          console.error('Erro ao atualizar categoria:', error);
          Snackbar({ message: 'Erro ao atualizar categoria: ' + error.message, type: 'error' });
        }
      });
    }
  }, 0);
};

window.deleteCategory = function(id) {
  if (confirm('Tem certeza que deseja excluir esta categoria?')) {
    deleteCategory(id);
  }
};

window.showCategoryHistory = function(id) {
  const category = window.appState.categories.find(c => c.id === id);
  if (!category) {
    alert('Categoria não encontrada');
    return;
  }
  // Filtrar transações da categoria
  const transactions = window.appState.transactions.filter(t => t.categoriaId === id);
  const totalReceitas = transactions.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const totalDespesas = transactions.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const saldo = totalReceitas - totalDespesas;
  const modal = Modal({
    title: `Histórico - ${category.nome}`,
    content: `
      <div class="space-y-6">
        <!-- Bloco de resumo removido para evitar duplicidade -->
        <div>
          <h3 class="font-semibold text-lg mb-3">Transações (${transactions.length})</h3>
          ${transactions.length === 0 ? `
            <p class="text-gray-500 text-center py-4">Nenhuma transação encontrada nesta categoria</p>
          ` : `
            <div class="space-y-2 max-h-64 overflow-y-auto">
              ${transactions.map(t => `
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
              `).join('')}
            </div>
          `}
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

window.copyBudgetId = function(id) {
  navigator.clipboard.writeText(id);
  alert('ID copiado para a área de transferência!');
};

window.selectBudget = function(id) {
  window.appState.currentBudget = window.appState.budgets.find(b => b.id === id);
  loadTransactions();
  loadCategories();
  router('/dashboard');
};

window.exportToExcel = function() {
  // Gera planilha Excel com transações, categorias e orçamentos
  const wb = XLSX.utils.book_new();

  // Transações
  const transacoes = window.appState.transactions.map(t => ({
    Descrição: t.descricao,
    Valor: t.valor,
    Tipo: t.tipo,
    Categoria: (window.appState.categories.find(c => c.id === t.categoriaId)?.nome || ''),
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
};

window.exportToPDF = function() {
  // Gera PDF com resumo das transações, categorias e orçamentos
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text('Resumo Financeiro', 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text('Transações:', 10, y);
  y += 8;
  window.appState.transactions.slice(0, 20).forEach(t => {
    doc.text(`- ${t.descricao} | R$ ${t.valor} | ${t.tipo} | ${(window.appState.categories.find(c => c.id === t.categoriaId)?.nome || '')}`, 12, y);
    y += 7;
    if (y > 270) { doc.addPage(); y = 10; }
  });
  y += 5;

  doc.text('Categorias:', 10, y);
  y += 8;
  window.appState.categories.forEach(c => {
    doc.text(`- ${c.nome} | ${c.tipo} | Limite: R$ ${c.limite}`, 12, y);
    y += 7;
    if (y > 270) { doc.addPage(); y = 10; }
  });
  y += 5;

  doc.text('Orçamentos:', 10, y);
  y += 8;
  window.appState.budgets.forEach(b => {
    doc.text(`- ${b.nome} | ID: ${b.id}`, 12, y);
    y += 7;
    if (y > 270) { doc.addPage(); y = 10; }
  });

  doc.save('financeiro-resumo.pdf');
};

window.downloadBackup = function() {
  // Baixa um JSON com todos os dados do usuário
  const data = {
    transactions: window.appState.transactions,
    categories: window.appState.categories,
    budgets: window.appState.budgets
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'financeiro-backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

window.importBackup = function() {
  // Permite importar um backup JSON
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      if (data.transactions && data.categories && data.budgets) {
        // Aqui, para importar de verdade, seria necessário salvar no Firestore
        alert('Importação de backup só está disponível para leitura neste protótipo.');
        // window.appState.transactions = data.transactions;
        // window.appState.categories = data.categories;
        // window.appState.budgets = data.budgets;
        // router('/dashboard');
      } else {
        alert('Arquivo de backup inválido.');
      }
    } catch (err) {
      alert('Erro ao importar backup: ' + err.message);
    }
  };
  input.click();
};

// Definir startVoiceRecognition no escopo global
window.startVoiceRecognition = function(type) {
  console.log('DEBUG: startVoiceRecognition chamada', type);
  closeVoiceModalIfOpen();
  const modal = Modal({
    title: 'Reconhecimento de Voz',
    content: `
      <div class="voice-feedback text-center py-6">
        <div class="voice-animation mb-4">
          <svg class="animate-pulse mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18v4m0 0h-4m4 0h4m-4-8a4 4 0 01-4-4V5a4 4 0 118 0v5a4 4 0 01-4 4z"/></svg>
        </div>
        <p class="text-lg font-semibold">Ouvindo...</p>
        <p id="voice-status" class="text-sm text-gray-500 mt-2">Fale agora</p>
        <p class="mt-4 text-gray-700">Dica: você pode dizer, por exemplo:<br><span class="italic">"gastei 50 reais no supermercado em alimentação"</span></p>
        <div class="mt-4"><span id="voice-text" class="font-mono text-indigo-700"></span></div>
        <button onclick="closeModal()" class="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancelar</button>
      </div>
    `,
    onClose: () => modal.remove()
  });
  document.body.appendChild(modal);

  // Reconhecimento de voz
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.');
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  console.log('DEBUG: Criando SpeechRecognition');
  const recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = function() {
    console.log('DEBUG: recognition.onstart');
    const statusEl = document.getElementById('voice-status');
    if (statusEl) {
      statusEl.textContent = 'Ouvindo...';
      statusEl.className = 'text-sm text-green-600';
    }
  };

  recognition.onresult = function(event) {
    console.log('DEBUG: recognition.onresult', event);
    const transcript = event.results[0][0].transcript.toLowerCase();
    const statusEl = document.getElementById('voice-status');
    if (statusEl) {
      statusEl.textContent = `Reconhecido: "${transcript}"`;
      statusEl.className = 'text-sm text-blue-600';
    }
    // Remover modal de voz e abrir diretamente o formulário completo
    setTimeout(async () => {
      modal.remove();
      try {
        await processVoiceCommand(transcript, type);
      } catch (error) {
        Snackbar({ message: 'Erro ao processar comando de voz: ' + error.message, type: 'error' });
      }
    }, 500);
  };

  recognition.onerror = function(event) {
    console.error('DEBUG: recognition.onerror', event);
    const statusEl = document.getElementById('voice-status');
    if (statusEl) {
      statusEl.textContent = `Erro: ${event.error}`;
      statusEl.className = 'text-sm text-red-600';
    }
  };

  recognition.onend = function() {
    console.log('DEBUG: recognition.onend');
    // Não fecha mais o modal automaticamente aqui
  };

  console.log('DEBUG: recognition.start()');
  recognition.start();
};

// Função para processar comandos de voz
async function processVoiceCommand(transcript, type) {
  try {
    // Normalizar texto
    const texto = transcript.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    // Comandos de consulta
    if (/\b(saldo|qual.*saldo|saldo atual)\b/.test(texto)) {
      const receitas = window.appState.transactions.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + parseFloat(t.valor), 0);
      const despesas = window.appState.transactions.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + parseFloat(t.valor), 0);
      const saldo = receitas - despesas;
      Snackbar({ message: `Saldo atual: R$ ${saldo.toFixed(2)}`, type: 'info' });
      return;
    }
    if (/\b(ultimas transacoes|mostrar transacoes|quais.*gastos|listar transacoes)\b/.test(texto)) {
      const ultimas = window.appState.transactions.slice(-5).reverse();
      if (ultimas.length === 0) {
        Snackbar({ message: 'Nenhuma transação encontrada.', type: 'info' });
        return;
      }
      let msg = 'Últimas transações:\n';
      ultimas.forEach(t => {
        const cat = window.appState.categories.find(c => c.id === t.categoriaId)?.nome || '';
        msg += `${t.descricao} - R$ ${parseFloat(t.valor).toFixed(2)} - ${t.tipo} - ${cat}\n`;
      });
      alert(msg);
      return;
    }
    // Comando de editar transação
    const editarMatch = texto.match(/editar transacao (.+)/);
    if (editarMatch) {
      const desc = editarMatch[1].trim();
      const trans = window.appState.transactions.find(t => t.descricao.toLowerCase().includes(desc));
      if (trans) {
        window.editTransaction(trans.id);
      } else {
        Snackbar({ message: `Transação '${desc}' não encontrada.`, type: 'error' });
      }
      return;
    }
    // Comando de excluir transação
    const excluirMatch = texto.match(/excluir transacao (.+)/);
    if (excluirMatch) {
      const desc = excluirMatch[1].trim();
      const trans = window.appState.transactions.find(t => t.descricao.toLowerCase().includes(desc));
      if (trans) {
        if (confirm(`Excluir transação '${trans.descricao}'?`)) {
          await deleteTransaction(trans.id);
          Snackbar({ message: 'Transação excluída!', type: 'success' });
          renderDashboard();
        }
      } else {
        Snackbar({ message: `Transação '${desc}' não encontrada.`, type: 'error' });
      }
      return;
    }
    // Comandos naturais para adicionar transação
    // Ex: "gastei 50 reais no supermercado em alimentação", "recebi 2000 de salário em rendimentos"
    const addMatch = texto.match(/(gastei|paguei|recebi|ganhei)\s+(\d+[\.,]?\d*)\s*(reais|rs)?\s*(no|na|em|de)?\s*([\w\s]+?)(?:\s+em\s+([\w\s]+))?$/);
    if (addMatch) {
      const verbo = addMatch[1];
      const valor = parseFloat(addMatch[2].replace(',', '.'));
      let tipo = 'despesa';
      if (verbo === 'recebi' || verbo === 'ganhei') tipo = 'receita';
      let descricao = (addMatch[5] || '').trim();
      let categoriaNome = (addMatch[6] || '').trim();
      // Se não houver 'em categoria', usar última palavra da descrição como categoria
      if (!categoriaNome && descricao.includes(' ')) {
        const partes = descricao.split(' ');
        categoriaNome = partes[partes.length - 1];
        descricao = partes.slice(0, -1).join(' ');
      }
      // Procurar categoria
      let categoria = window.appState.categories.find(c => c.nome.toLowerCase().includes(categoriaNome));
      if (!categoria) {
        // Se não encontrar, pega a primeira do tipo
        categoria = window.appState.categories.find(c => c.tipo === tipo);
      }
      if (!categoria) {
        alert('Nenhuma categoria encontrada para o tipo. Crie uma categoria primeiro.');
        return;
      }
      // Se descrição ficar vazia, usar categoria como fallback
      if (!descricao) descricao = categoria.nome;
      closeVoiceModalIfOpen();
      console.log('DEBUG: Abrindo formulário de transação/categoria por voz', {descricao, valor, tipo, categoriaId: categoria.id});
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
      closeVoiceModalIfOpen();
      // Não temos os dados detalhados aqui, mas logar a chamada
      console.log('DEBUG: Chamando processTransactionVoice por voz');
      await processTransactionVoice(transcript);
    } else if (type === 'category') {
      closeVoiceModalIfOpen();
      console.log('DEBUG: Chamando processCategoryVoice por voz');
      await processCategoryVoice(transcript);
    }
  } catch (error) {
    console.error('Erro ao processar comando de voz:', error);
    Snackbar({ message: 'Erro ao processar comando de voz: ' + error.message, type: 'error' });
  }
}

// Função auxiliar para converter números por extenso em português para número
function parseNumeroPorExtenso(palavra) {
  const mapa = {
    'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3, 'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
    'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14, 'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
    'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60, 'setenta': 70, 'oitenta': 80, 'noventa': 90,
    'cem': 100, 'cento': 100, 'sem': 100, 'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500, 'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
    'mil': 1000
  };
  if (!palavra) return NaN;
  palavra = palavra.toLowerCase().replace(/\./g, '');
  if (mapa[palavra] !== undefined) return mapa[palavra];
  // Tenta converter por extenso composto (ex: cento e vinte)
  if (palavra.includes(' e ')) {
    return palavra.split(' e ').map(parseNumeroPorExtenso).reduce((a, b) => a + b, 0);
  }
  return NaN;
}

// Processar comando de voz para transação
async function processTransactionVoice(transcript) {
  // Padrão: "descrição valor tipo categoria"
  // Exemplo: "supermercado 150 despesa alimentação" ou "supermercado cem despesa alimentação"
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
    alert('Valor não encontrado no comando (diga um número, ex: "cem", "duzentos", "mil" ou "100")');
    return;
  }
  // Extrair tipo (receita/despesa, aceitando variações)
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
  // Padrão: "nome tipo limite"
  // Exemplo: "alimentação despesa 500" ou "alimentação despesa cem"
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
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const route = btn.getAttribute('data-route');
      await router(route);
    });
  });
}

// Configurar botão de login
function setupLoginButton() {
  const btn = document.getElementById('btn-entrar');
  if (btn) {
    btn.onclick = loginWithGoogle;
  }
}

// Adicionar tela de loading
function showLoading(show) {
  let loading = document.getElementById('loading-page');
  if (!loading) {
    loading = document.createElement('div');
    loading.id = 'loading-page';
    loading.className = 'fixed inset-0 flex items-center justify-center bg-white z-50';
    loading.innerHTML = '<div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div><span class="text-lg font-semibold text-gray-700">Carregando...</span></div>';
    document.body.appendChild(loading);
  }
  loading.style.display = show ? 'flex' : 'none';
}

// Listener de autenticação
auth.onAuthStateChanged(async (user) => {
  showLoading(true);
  
  if (user) {
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
      renderDashboard();
      toggleLoginPage(false);
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
  setupThemeToggle();
  enableSwipeNavigation();
  setupLoginButton();
  toggleLoginPage(true);
  setupNavigation();
  
  // Configurar FAB
  renderFAB();

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
});

window.selectSharedBudget = function() {
  Modal({
    title: 'Entrar em Orçamento Compartilhado',
    content: `
      <form id='shared-budget-form' class='space-y-4'>
        <div>
          <label class='block text-sm font-medium text-gray-700 mb-1'>Cole o ID do orçamento compartilhado</label>
          <input type='text' id='shared-budget-id' required class='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='ID do orçamento'>
        </div>
        <div class='flex justify-end space-x-3 pt-4'>
          <button type='button' onclick='closeModal()' class='px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200'>Cancelar</button>
          <button type='submit' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Entrar</button>
        </div>
      </form>
    `,
    onClose: () => modal.remove()
  });
  document.getElementById('shared-budget-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('shared-budget-id').value.trim();
    if (!id) return;
    try {
      // Buscar orçamento pelo ID
      const docRef = doc(window.FirebaseDB, 'budgets', id);
      const snap = await getDocs(query(collection(window.FirebaseDB, 'budgets')));
      const found = snap.docs.find(d => d.id === id);
      if (!found) {
        alert('Orçamento não encontrado!');
        return;
      }
      // Associar orçamento ao usuário (simplesmente seleciona para navegação)
      window.appState.currentBudget = { id: found.id, ...found.data() };
      closeModal();
      await loadTransactions();
      await loadCategories();
      router('/dashboard');
      Snackbar({ message: 'Você entrou no orçamento compartilhado!', type: 'success' });
    } catch (err) {
      Snackbar({ message: 'Erro ao entrar no orçamento: ' + err.message, type: 'error' });
    }
  });
};

// Listener em tempo real para transações
let unsubscribeTransactions = null;
function listenTransactions() {
  if (unsubscribeTransactions) unsubscribeTransactions();
  const userId = window.appState.currentUser?.uid;
  const budgetId = window.appState.currentBudget?.id;
  if (!userId || !budgetId) return;
  const q = query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    where('budgetId', '==', budgetId)
  );
  unsubscribeTransactions = onSnapshot(q, (querySnapshot) => {
    window.appState.transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Atualizar interface se estiver na aba de transações ou dashboard
    const currentTab = document.querySelector('.nav-item.active')?.getAttribute('data-tab');
    if (['transactions', 'dashboard'].includes(currentTab)) {
      if (currentTab === 'transactions') renderTransactions();
      if (currentTab === 'dashboard') renderDashboard();
    }
  });
}
// Chamar listenTransactions após login e ao trocar de orçamento
// ... existing code ...
// No onAuthStateChanged, após definir currentUser e currentBudget:
listenTransactions();
// ... existing code ...

// ... existing code ...
// Ao iniciar, esconder tela de login e mostrar loading
window.addEventListener('DOMContentLoaded', () => {
  const loginPage = document.getElementById('login-page');
  if (loginPage) loginPage.style.display = 'none';
  showLoading(true);
});
// ... existing code ...

// ... existing code ...
// Função para gerar PDF do guia do usuário
window.generateUserGuide = function() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configurações do documento
    doc.setFont('helvetica');
    
    // Função para adicionar texto com quebra de página automática
    function addText(text, x, y, maxWidth = 170) {
      const lines = doc.splitTextToSize(text, maxWidth);
      if (y + (lines.length * 8) > 270) {
        doc.addPage();
        return 20; // Nova posição Y no topo da nova página
      }
      doc.text(lines, x, y);
      return y + (lines.length * 8) + 2;
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
  yPosition = addSectionTitle('🎯 Bem-vindo ao Servo Tech Finanças!', yPosition);
  
  yPosition = addText('O Servo Tech Finanças é um aplicativo completo e intuitivo para controle financeiro pessoal. Desenvolvido com foco na praticidade e simplicidade, ele oferece todas as ferramentas necessárias para você gerenciar suas finanças de forma eficiente e organizada.', 20, yPosition);
  
  yPosition = addSubtitle('🌟 Principais Funcionalidades:', yPosition);
  yPosition = addListItem('📊 Dashboard completo com visão geral das finanças', yPosition);
  yPosition = addListItem('💰 Gestão completa de receitas e despesas', yPosition);
  yPosition = addListItem('🏷️ Categorização inteligente com limites de gastos', yPosition);
  yPosition = addListItem('🎤 Comandos de voz para adicionar transações rapidamente', yPosition);
  yPosition = addListItem('📈 Controle de orçamentos com compartilhamento', yPosition);
  yPosition = addListItem('💾 Backup e restauração de dados', yPosition);
  yPosition = addListItem('📱 Instalação como aplicativo (PWA)', yPosition);
  yPosition = addListItem('🌙 Modo escuro para conforto visual', yPosition);
  yPosition = addListItem('📊 Exportação de relatórios em Excel, PDF e JSON', yPosition);
  
  // Dashboard
  yPosition = addSectionTitle('📊 Dashboard - Centro de Controle Financeiro', yPosition);
  yPosition = addText('O Dashboard é o coração do aplicativo, oferecendo uma visão completa e em tempo real de suas finanças. Aqui você encontra todos os dados importantes organizados de forma clara e intuitiva.', 20, yPosition);
  yPosition += 8;
  yPosition = addSubtitle('📈 Cards Principais:', yPosition);
  yPosition = addListItem('🟢 Receitas: Soma total de todo dinheiro recebido no período', yPosition);
  yPosition = addListItem('   Inclui salários, bônus, rendimentos extras, etc.', yPosition, 30);
  yPosition = addListItem('🔴 Despesas: Soma total de todos os gastos realizados', yPosition);
  yPosition = addListItem('   Contas, compras, lazer, transporte, etc.', yPosition, 30);
  yPosition = addListItem('🔵 Saldo: Receitas - Despesas (dinheiro disponível)', yPosition);
  yPosition = addListItem('   Indica se você está no azul ou no vermelho', yPosition, 30);
  yPosition = addListItem('🟡 Orçado: Limite das categorias - Despesas', yPosition);
  yPosition = addListItem('   Mostra quanto ainda pode gastar dentro dos limites', yPosition, 30);
  yPosition += 8;
  yPosition = addSubtitle('📊 Seção de Categorias:', yPosition);
  yPosition = addListItem('Barras de progresso coloridas para cada categoria', yPosition);
  yPosition = addListItem('Verde: Dentro do limite estabelecido', yPosition, 30);
  yPosition = addListItem('Amarelo: Próximo do limite (80% ou mais)', yPosition, 30);
  yPosition = addListItem('Vermelho: Acima do limite (gasto excessivo)', yPosition, 30);
  yPosition = addListItem('Porcentagem de uso visível em cada barra', yPosition, 30);
  yPosition += 8;
  yPosition = addSubtitle('📝 Transações Recentes:', yPosition);
  yPosition = addListItem('Lista das últimas 10 transações realizadas', yPosition);
  yPosition = addListItem('Mostra: Data, Descrição, Valor, Categoria e Tipo', yPosition, 30);
  yPosition = addListItem('Atualização automática em tempo real', yPosition, 30);
  yPosition = addListItem('Acesso rápido para editar ou excluir', yPosition, 30);
  yPosition += 8;
  
  // Transações
  yPosition = addSectionTitle('💰 Transações - Gestão Completa de Receitas e Despesas', yPosition);
  yPosition = addText('A aba Transações é onde você gerencia todas as suas movimentações financeiras. Aqui você pode adicionar, editar, excluir e visualizar todas as transações.', 20, yPosition);
  yPosition += 8;
  yPosition = addSubtitle('📝 Como Adicionar uma Transação:', yPosition);
  yPosition = addListItem('Método 1 - Botão Flutuante (FAB):', yPosition);
  yPosition = addListItem('1. Toque no botão + (canto inferior direito)', yPosition, 30);
  yPosition = addListItem('2. Preencha os campos obrigatórios:', yPosition, 30);
  yPosition = addListItem('   • Descrição: Nome da transação (ex: "Supermercado")', yPosition, 35);
  yPosition = addListItem('   • Valor: Quantia em reais (ex: 150,50)', yPosition, 35);
  yPosition = addListItem('   • Tipo: Receita ou Despesa', yPosition, 35);
  yPosition = addListItem('   • Categoria: Selecione uma categoria existente', yPosition, 35);
  yPosition = addListItem('3. Toque em "Adicionar"', yPosition, 30);
  yPosition += 8;
  yPosition = addListItem('Método 2 - Aba Transações:', yPosition);
  yPosition = addListItem('1. Vá na aba "Transações" (navegação inferior)', yPosition, 30);
  yPosition = addListItem('2. Toque em "+ Nova Transação"', yPosition, 30);
  yPosition = addListItem('3. Preencha os campos e confirme', yPosition, 30);
  yPosition += 8;
  yPosition = addSubtitle('✏️ Como Editar uma Transação:', yPosition);
  yPosition = addListItem('1. Localize a transação na lista', yPosition);
  yPosition = addListItem('2. Toque no ícone ✏️ (lápis) ao lado', yPosition, 30);
  yPosition = addListItem('3. Modifique os campos desejados', yPosition, 30);
  yPosition = addListItem('4. Toque em "Salvar"', yPosition, 30);
  yPosition += 8;
  yPosition = addSubtitle('🗑️ Como Excluir uma Transação:', yPosition);
  yPosition = addListItem('1. Localize a transação na lista', yPosition);
  yPosition = addListItem('2. Toque no ícone 🗑️ (lixeira) ao lado', yPosition, 30);
  yPosition = addListItem('3. Confirme a exclusão', yPosition, 30);
  yPosition += 8;
  yPosition = addSubtitle('📊 Visualização de Transações:', yPosition);
  yPosition = addListItem('Lista completa de todas as transações', yPosition);
  yPosition = addListItem('Ordenadas por data (mais recentes primeiro)', yPosition, 30);
  yPosition = addListItem('Filtros por tipo (Receita/Despesa)', yPosition, 30);
  yPosition = addListItem('Busca por descrição', yPosition, 30);
  yPosition = addListItem('Atualização automática em tempo real', yPosition, 30);
  yPosition += 8;
  yPosition = addSubtitle('💡 Dicas Importantes:', yPosition);
  yPosition = addListItem('Use comandos de voz para adicionar mais rapidamente', yPosition);
  yPosition = addListItem('Mantenha descrições claras e específicas', yPosition);
  yPosition = addListItem('Categorize corretamente para melhor controle', yPosition);
  yPosition = addListItem('Revise transações regularmente', yPosition);
  yPosition += 8;
  
  // Comandos de Voz
  doc.setFontSize(16);
  doc.setTextColor(79, 70, 229);
  doc.text('🎤 Comandos de Voz - Revolução na Praticidade', 20, yPosition);
  yPosition += 12;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('O sistema de comandos de voz é uma das funcionalidades mais inovadoras do app.', 20, yPosition);
  yPosition += 8;
  doc.text('Permite adicionar transações e criar categorias sem precisar digitar,', 20, yPosition);
  yPosition += 8;
  doc.text('tornando o controle financeiro muito mais rápido e prático.', 20, yPosition);
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
  doc.text('Números: "zero", "um", "dois", "três", "quatro", "cinco"', 25, yPosition);
  yPosition += 8;
  doc.text('Dezenas: "dez", "vinte", "trinta", "quarenta", "cinquenta"', 25, yPosition);
  yPosition += 8;
  doc.text('Centenas: "cem", "duzentos", "trezentos", "quatrocentos"', 25, yPosition);
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
  doc.text('🏷️ Categorias - Organização Inteligente dos Gastos', 20, yPosition);
  yPosition += 12;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('As categorias são fundamentais para organizar e controlar seus gastos de forma eficiente.', 20, yPosition);
  yPosition += 8;
  doc.text('Elas permitem que você estabeleça limites de gastos e monitore o progresso em tempo real.', 20, yPosition);
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
  doc.text('• Transporte (combustível, Uber, transporte público)', 30, yPosition);
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
  doc.text('• Excluir: Toque no ícone 🗑️ ao lado da categoria', 25, yPosition);
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
  doc.text('A aba Configurações é o centro de controle do aplicativo, onde você pode personalizar', 20, yPosition);
  yPosition += 8;
  doc.text('sua experiência, gerenciar dados e acessar funcionalidades avançadas.', 20, yPosition);
  yPosition += 12;
  doc.text('📖 Guia do Usuário:', 20, yPosition);
  yPosition += 8;
  doc.text('• Baixe este manual completo em PDF', 25, yPosition);
  yPosition += 8;
  doc.text('• Acesso offline ao guia de uso', 25, yPosition);
  yPosition += 8;
  doc.text('• Referência completa de todas as funcionalidades', 25, yPosition);
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
  doc.text('• Use comandos de voz para adicionar transações rapidamente', 25, yPosition);
  yPosition += 8;
  doc.text('• Configure limites realistas nas categorias', 25, yPosition);
  yPosition += 8;
  doc.text('• Faça backup regular dos seus dados', 25, yPosition);
  yPosition += 8;
  doc.text('• Instale o app para acesso offline', 25, yPosition);
  yPosition += 8;
  doc.text('• Compartilhe orçamentos com família/amigos', 25, yPosition);
  yPosition += 8;
  doc.text('• Monitore o card "Orçado" para controle de gastos', 25, yPosition);
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
  doc.text('• Use valores por extenso: "cem" ao invés de "100"', 25, yPosition);
  yPosition += 8;
  doc.text('❓ Transação não aparece:', 20, yPosition);
  yPosition += 8;
  doc.text('• Aguarde alguns segundos (atualização automática)', 25, yPosition);
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
  doc.text('📅 Data do Guia: ' + new Date().toLocaleDateString('pt-BR'), 20, yPosition);
  yPosition += 8;
  doc.text('🌐 URL: https://controle-financeiro-b98ec.web.app', 20, yPosition);
  yPosition += 8;
  doc.text('💡 Para dúvidas, consulte este guia ou entre em contato.', 20, yPosition);
  yPosition += 15;
  
  // Rodapé
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 270, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Servo Tech Finanças - Transformando sua vida financeira', 20, 280);
  doc.text('© 2025 • Fundador: Igor Bispo • Versão 1.0', 20, 290);
  
  // Salvar PDF
  doc.save('Servo-Tech-Financas-Guia-Usuario.pdf');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    Snackbar({ message: 'Erro ao gerar PDF. Verifique se a biblioteca jsPDF está carregada.', type: 'error' });
  }
};
// ... existing code ...

function renderFAB() {
  // Remove qualquer FAB existente
  let fab = document.querySelector('.fab');
  if (fab) fab.remove();
  // Só renderiza se usuário estiver logado
  if (!window.appState.currentUser) return;
  fab = FAB();
  document.body.appendChild(fab);
}

// ... após a definição das funções ...
window.closeModal = closeModal;

// ... existing code ...
// Função utilitária para fechar modal de voz se estiver aberto
function closeVoiceModalIfOpen() {
  console.log('DEBUG: closeVoiceModalIfOpen chamado');
  const modal = document.getElementById('app-modal');
  if (modal) modal.remove();
}

// ---
// Reforçar event listener do botão de voz do topo
// (garantir que só adiciona uma vez e que o botão existe)
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  enableSwipeNavigation();
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
          document.getElementById('btn-voz-transacao')?.addEventListener('click', () => {
            closeModal();
            window.startVoiceRecognition('transaction');
          });
          document.getElementById('btn-voz-categoria')?.addEventListener('click', () => {
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
// Em todos os pontos de processVoiceCommand que abrem o formulário:
// Antes de window.showAddTransactionModal({ ... }) e window.showAddCategoryModal({ ... })
// Adicione:
// closeVoiceModalIfOpen();
// console.log('DEBUG: Abrindo formulário de transação/categoria por voz', {descricao, valor, tipo, categoriaId});
// ... existing code ...
// Exemplo:
// closeVoiceModalIfOpen();
// console.log('DEBUG: Abrindo formulário de transação/categoria por voz', {descricao, valor, tipo, categoriaId});
// window.showAddTransactionModal({ ... })
// ...

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

// Destacar aba ativa ao clicar
function setupTabHighlight() {
  const nav = document.querySelector('.bottom-nav');
  if (!nav) return;
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-btn');
    if (!btn) return;
    nav.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = '';
      b.style.color = '';
      b.style.fontWeight = '';
    });
    btn.classList.add('active');
    btn.style.background = '#3b82f6';
    btn.style.color = '#fff';
    btn.style.fontWeight = '700';
  });
  // Ao carregar, garantir que a aba ativa está destacada
  const activeBtn = nav.querySelector('.nav-btn.active');
  if (activeBtn) {
    activeBtn.style.background = '#3b82f6';
    activeBtn.style.color = '#fff';
    activeBtn.style.fontWeight = '700';
  }
}
setupTabHighlight();

async function rotinaFechamentoMensal() {
  const user = window.FirebaseAuth.currentUser;
  if (!user) return;
  const hoje = new Date();
  if (hoje.getDate() !== 1) return; // Só executa no dia 1
  const ultimoFechamento = localStorage.getItem('ultimoFechamentoMensal');
  const mesAno = hoje.toISOString().slice(0,7);
  if (ultimoFechamento === mesAno) return; // Já executou este mês

  // Salvar histórico
  await salvarHistoricoMensal(user.uid, window.appState.transactions, hoje);
  // Limpar transações
  await limparTransacoes(user.uid);
  // Aplicar despesas recorrentes
  const recorrentes = await getDespesasRecorrentes(user.uid);
  for (const desp of recorrentes) {
    if (desp.ativa !== false && (!desp.parcelasRestantes || desp.parcelasRestantes > 0)) {
      await addTransacao(user.uid, {
        descricao: desp.descricao,
        valor: desp.valor,
        categoriaId: desp.categoriaId,
        tipo: 'despesa',
        createdAt: new Date(),
        recorrenteId: desp.id
      });
      if (desp.parcelasRestantes) {
        await updateDespesaRecorrente(user.uid, desp.id, { parcelasRestantes: desp.parcelasRestantes - 1 });
        if (desp.parcelasRestantes - 1 <= 0) {
          await updateDespesaRecorrente(user.uid, desp.id, { ativa: false });
        }
      }
    }
  }
  localStorage.setItem('ultimoFechamentoMensal', mesAno);
}

// Chamar rotina ao iniciar o app
rotinaFechamentoMensal();

// Função para carregar despesas recorrentes no estado global
async function loadRecorrentes() {
  try {
    const user = window.FirebaseAuth.currentUser;
    if (!user) {
      window.appState.recorrentes = [];
      return;
    }
    window.appState.recorrentes = await getDespesasRecorrentes(user.uid);
  } catch (error) {
    window.appState.recorrentes = [];
    console.error('Erro ao carregar despesas recorrentes:', error);
  }
}

// Adicionar função para renderizar o BottomNav
function renderBottomNav(activeRoute) {
  // Remove qualquer BottomNav existente
  let nav = document.querySelector('nav.bottom-nav');
  if (nav) nav.remove();
  // Só renderiza se usuário estiver logado
  if (!window.appState.currentUser) return;
  nav = BottomNav(activeRoute);
  nav.classList.add('bottom-nav');
  document.body.appendChild(nav);
  if (typeof setupNavigation === 'function') setupNavigation();
}

// Atualizar renderRecorrentes para também renderizar o BottomNav
async function renderRecorrentes() {
  await _renderRecorrentes();
  renderFAB();
  renderBottomNav('/recorrentes');
}

// Atualizar o objeto de rotas
const routes = {
  '/dashboard': renderDashboard,
  '/transactions': renderTransactions,
  '/categories': renderCategories,
  '/recorrentes': renderRecorrentes,
  '/settings': renderSettings,
};
