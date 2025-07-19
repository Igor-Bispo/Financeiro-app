import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, serverTimestamp, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY',
  authDomain: 'controle-financeiro-b98ec.firebaseapp.com',
  projectId: 'controle-financeiro-b98ec',
  storageBucket: 'controle-financeiro-b98ec.firebasestorage.app',
  messagingSenderId: '418109336597',
  appId: '1:418109336597:web:871b262a76e57455ebb21c',
  measurementId: 'G-7RW2F269V6'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configurar persistência da sessão
setPersistence(auth, browserLocalPersistence);

window.FirebaseApp = app;
window.FirebaseAuth = auth;
window.FirebaseDB = db;

console.log('Firebase initialized successfully');
console.log('Auth:', auth);
console.log('DB:', db);

// Estado global da aplicação
window.appState = {
  currentUser: null,
  transactions: [],
  categories: [],
  budgets: [],
  currentBudget: null
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
    console.log('Transação adicionada com ID:', docRef.id);
    // refreshCurrentView(); // Não precisa mais, tempo real
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar transação:', error);
    throw error;
  }
}

async function updateTransaction(transactionId, transactionData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');
    await updateDoc(doc(db, 'transactions', transactionId), {
      ...transactionData,
      updatedAt: serverTimestamp()
    });
    console.log('Transação atualizada:', transactionId);
    // refreshCurrentView(); // Não precisa mais, tempo real
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    throw error;
  }
}

async function deleteTransaction(transactionId) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');
    await deleteDoc(doc(db, 'transactions', transactionId));
    console.log('Transação excluída:', transactionId);
    // refreshCurrentView(); // Não precisa mais, tempo real
  } catch (error) {
    console.error('Erro ao excluir transação:', error);
    throw error;
  }
}

async function loadTransactions() {
  try {
    console.log('Loading transactions for user:', window.appState.currentUser.uid);
    console.log('Current budget:', window.appState.currentBudget?.id);
    
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', window.appState.currentUser.uid),
      where('budgetId', '==', window.appState.currentBudget?.id)
    );
    const querySnapshot = await getDocs(q);
    window.appState.transactions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Transactions loaded successfully:', window.appState.transactions.length);
  } catch (error) {
    console.error('Erro ao carregar transações:', error);
  }
}

// Funções de CRUD para categorias
async function addCategory(categoryData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const docRef = await addDoc(collection(db, 'categories'), {
      ...categoryData,
      userId: user.uid,
      createdAt: serverTimestamp()
    });

    console.log('Categoria adicionada com ID:', docRef.id);
    refreshCurrentView(); // Atualizar interface
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    throw error;
  }
}

async function updateCategory(categoryId, categoryData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    await updateDoc(doc(db, 'categories', categoryId), {
      ...categoryData,
      updatedAt: serverTimestamp()
    });

    console.log('Categoria atualizada:', categoryId);
    refreshCurrentView(); // Atualizar interface
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw error;
  }
}

async function deleteCategory(categoryId) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    await deleteDoc(doc(db, 'categories', categoryId));
    console.log('Categoria excluída:', categoryId);
    refreshCurrentView(); // Atualizar interface
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    throw error;
  }
}

async function loadCategories() {
  try {
    console.log('Loading categories for user:', window.appState.currentUser.uid);
    console.log('Current budget:', window.appState.currentBudget?.id);
    
    const q = query(
      collection(db, 'categories'),
      where('userId', '==', window.appState.currentUser.uid),
      where('budgetId', '==', window.appState.currentBudget?.id)
    );
    const querySnapshot = await getDocs(q);
    window.appState.categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Categories loaded successfully:', window.appState.categories.length);
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

    console.log('Orçamento adicionado com ID:', docRef.id);
    refreshCurrentView(); // Atualizar interface
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar orçamento:', error);
    throw error;
  }
}

async function loadBudgets() {
  try {
    console.log('Loading budgets for user:', window.appState.currentUser.uid);
    
    const q = query(
      collection(db, 'budgets'),
      where('userId', '==', window.appState.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    window.appState.budgets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Budgets loaded successfully:', window.appState.budgets.length);
  } catch (error) {
    console.error('Erro ao carregar orçamentos:', error);
  }
}

// Funções de renderização das telas
function setSubtitle(subtitle) {
  let subtitleEl = document.getElementById('page-subtitle');
  if (!subtitleEl) {
    subtitleEl = document.createElement('div');
    subtitleEl.id = 'page-subtitle';
    subtitleEl.className = 'text-xs md:text-base font-semibold text-gray-500 mb-2 md:mb-4';
    const header = document.querySelector('.app-header');
    if (header && header.parentNode) {
      header.insertAdjacentElement('afterend', subtitleEl);
    }
  }
  subtitleEl.textContent = subtitle;
}

function renderDashboard() {
  const content = document.getElementById('app-content');
  if (!content) return;
  setSubtitle('Dashboard');
  
  // Calcular totais
  const receitas = window.appState.transactions
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  
  const despesas = window.appState.transactions
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  
  const saldo = receitas - despesas;
  
  // Calcular limites das categorias
  const totalLimite = window.appState.categories
    .reduce((sum, cat) => sum + parseFloat(cat.limite || 0), 0);
  
  // Calcular orçado
  const orcado = totalLimite - despesas;
  
  content.innerHTML = `
    <div class="grid gap-4 md:gap-6">
      <!-- Cards de Resumo -->
      <div class="grid grid-cols-4 gap-1 md:gap-4">
        <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Receitas</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${receitas.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Despesas</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${despesas.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Saldo</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${saldo.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Orçado</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${orcado.toFixed(2)}</p>
        </div>
      </div>
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
                  <button onclick="editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base">✏️</button>
                  <button onclick="deleteTransaction('${t.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base">🗑️</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderTransactions() {
  const content = document.getElementById('app-content');
  setSubtitle('Transações');
  
  content.innerHTML = `
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="text-base md:text-2xl font-bold">Todas as Transações</h2>
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
                <p class="font-medium text-xs md:text-lg">${t.descricao}</p>
                <p class="text-xs md:text-sm text-gray-500">${categoria?.nome || 'Sem categoria'} • ${t.createdAt && t.createdAt.toDate ? t.createdAt.toDate().toLocaleDateString() : ''}</p>
              </div>
              <div class="flex items-center space-x-1 md:space-x-3">
                <span class="font-bold text-xs md:text-lg ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
                  ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
                </span>
                <button onclick="editTransaction('${t.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-base">Editar</button>
                <button onclick="deleteTransaction('${t.id}')" class="bg-red-100 text-red-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-red-200 text-xs md:text-base">Excluir</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderCategories() {
  const content = document.getElementById('app-content');
  setSubtitle('Categorias');
  
  content.innerHTML = `
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="text-base md:text-2xl font-bold">Categorias</h2>
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
  setSubtitle('Configurações');
  content.innerHTML = `
    <div class="space-y-2 md:space-y-8">
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
}
// ... existing code ...

// Sistema de roteamento
const routes = {
  '/dashboard': renderDashboard,
  '/transactions': renderTransactions,
  '/categories': renderCategories,
  '/settings': renderSettings,
};

// Atualizar router para sempre renderizar e recarregar dados ao trocar de aba
function router(path) {
  const content = document.getElementById('app-content');
  document.querySelectorAll('.nav-btn').forEach(item => {
    item.classList.remove('active');
  });
  const navBtn = document.querySelector(`.nav-btn[data-route='${path}']`);
  if (navBtn) navBtn.classList.add('active');

  switch (path) {
    case '/dashboard':
      renderDashboard();
      break;
    case '/transactions':
      renderTransactions();
      break;
    case '/categories':
      loadCategories().then(renderCategories);
      break;
    case '/settings':
      loadBudgets().then(renderSettings);
      break;
    default:
      renderDashboard();
  }
}

// Reforçar listener ao trocar de orçamento
function setCurrentBudget(budget) {
  window.appState.currentBudget = budget;
  listenTransactions();
}

// Funções globais para modais e ações
window.showAddTransactionModal = function() {
  const modal = createModal('Adicionar Transação', `
    <form id="transaction-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <input type="text" id="transaction-descricao" required 
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Supermercado">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
        <input type="number" id="transaction-valor" required step="0.01" min="0"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="transaction-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select id="transaction-categoria" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          ${window.appState.categories.length > 0 ? 
            window.appState.categories.map(cat => 
              `<option value="${cat.id}">${cat.nome}</option>`
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
  `);
  
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
      await refreshCurrentView();
      closeModal();
      alert('Transação adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      alert('Erro ao adicionar transação: ' + error.message);
    }
  });
};

window.showAddCategoryModal = function() {
  const modal = createModal('Adicionar Categoria', `
    <form id="category-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input type="text" id="category-nome" required 
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Alimentação">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="category-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
        <input type="number" id="category-limite" step="0.01" min="0"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
        <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
        <input type="color" id="category-cor" value="#4F46E5"
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
  `);
  
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
      
      closeModal();
      router('/categories'); // Recarregar categorias
      alert('Categoria adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      alert('Erro ao adicionar categoria: ' + error.message);
    }
  });
};

window.showAddBudgetModal = function() {
  const modal = createModal('Adicionar Orçamento', `
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
  `);
  
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
      
      closeModal();
      router('/settings'); // Recarregar configurações
      alert('Orçamento adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar orçamento:', error);
      alert('Erro ao adicionar orçamento: ' + error.message);
    }
  });
};

window.editTransaction = function(id) {
  const transaction = window.appState.transactions.find(t => t.id === id);
  if (!transaction) {
    alert('Transação não encontrada');
    return;
  }
  
  const modal = createModal('Editar Transação', `
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
  `);
  
  // Adicionar evento de submit
  document.getElementById('edit-transaction-form').addEventListener('submit', async (e) => {
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
      
      closeModal();
      router('/dashboard'); // Recarregar dashboard
      alert('Transação atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      alert('Erro ao atualizar transação: ' + error.message);
    }
  });
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
  
  const modal = createModal('Editar Categoria', `
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
  `);
  
  // Adicionar evento de submit
  document.getElementById('edit-category-form').addEventListener('submit', async (e) => {
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
      
      closeModal();
      router('/categories'); // Recarregar categorias
      alert('Categoria atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      alert('Erro ao atualizar categoria: ' + error.message);
    }
  });
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
  
  const transactions = window.appState.transactions
    .filter(t => t.categoriaId === id)
    .sort((a, b) => new Date(b.createdAt?.toDate()) - new Date(a.createdAt?.toDate()));
  
  const totalReceitas = transactions
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  
  const totalDespesas = transactions
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  
  const saldo = totalReceitas - totalDespesas;
  
  const modal = createModal(`Histórico - ${category.nome}`, `
    <div class="space-y-6">
      <!-- Resumo -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="font-semibold text-lg mb-3">Resumo</h3>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-sm text-gray-600">Receitas</p>
            <p class="text-lg font-bold text-green-600">R$ ${totalReceitas.toFixed(2)}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Despesas</p>
            <p class="text-lg font-bold text-red-600">R$ ${totalDespesas.toFixed(2)}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Saldo</p>
            <p class="text-lg font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}">R$ ${saldo.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <!-- Lista de Transações -->
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
                  <p class="text-sm text-gray-500">${new Date(t.createdAt?.toDate()).toLocaleDateString()}</p>
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
  `);
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

window.startVoiceRecognition = function(type) {
  // Verificar se o navegador suporta reconhecimento de voz
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.');
    return;
  }
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  // Configurar reconhecimento
  recognition.lang = 'pt-BR';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  // Mostrar modal de reconhecimento
  const modal = createModal('Reconhecimento de Voz', `
    <div class="text-center space-y-4">
      <div class="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
      <p class="text-lg font-semibold">Fale agora...</p>
      <p class="text-sm text-gray-600" id="voice-instructions">
        ${type === 'transaction' ? 
          'Exemplo: "Supermercado 150 despesa alimentação"' :
          'Exemplo: "Alimentação despesa 500"'
        }
      </p>
      <div id="voice-status" class="text-sm text-blue-600">Aguardando comando...</div>
      <div class="flex justify-center space-x-3">
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Cancelar
        </button>
      </div>
    </div>
  `);
  
  // Eventos de reconhecimento
  recognition.onstart = function() {
    document.getElementById('voice-status').textContent = 'Ouvindo...';
    document.getElementById('voice-status').className = 'text-sm text-green-600';
  };
  
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    document.getElementById('voice-status').textContent = `Reconhecido: "${transcript}"`;
    document.getElementById('voice-status').className = 'text-sm text-blue-600';
    
    // Processar comando de voz
    processVoiceCommand(transcript, type);
  };
  
  recognition.onerror = function(event) {
    console.error('Erro no reconhecimento de voz:', event.error);
    document.getElementById('voice-status').textContent = `Erro: ${event.error}`;
    document.getElementById('voice-status').className = 'text-sm text-red-600';
  };
  
  recognition.onend = function() {
    // Fechar modal após processamento
    setTimeout(() => {
      closeModal();
    }, 2000);
  };
  
  // Iniciar reconhecimento
  recognition.start();
};

// Função para processar comandos de voz
async function processVoiceCommand(transcript, type) {
  try {
    if (type === 'transaction') {
      await processTransactionVoice(transcript);
    } else if (type === 'category') {
      await processCategoryVoice(transcript);
    }
  } catch (error) {
    console.error('Erro ao processar comando de voz:', error);
    alert('Erro ao processar comando de voz: ' + error.message);
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
  const words = transcript.split(' ');
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
  // Extrair tipo (receita/despesa)
  const tipoIndex = words.findIndex(word => ['receita', 'despesa'].includes(word));
  if (tipoIndex === -1) {
    alert('Tipo não encontrado (receita ou despesa)');
    return;
  }
  const tipo = words[tipoIndex];
  
  // Extrair categoria (última palavra)
  const categoriaNome = words[words.length - 1];
  
  // Extrair descrição (tudo antes do valor)
  const descricao = words.slice(0, valorIndex).join(' ');
  
  // Encontrar categoria no banco
  const categoria = window.appState.categories.find(c => 
    c.nome.toLowerCase().includes(categoriaNome) || 
    categoriaNome.includes(c.nome.toLowerCase())
  );
  
  if (!categoria) {
    alert(`Categoria "${categoriaNome}" não encontrada. Crie a categoria primeiro.`);
    return;
  }
  
  // Criar transação
  await addTransaction({
    descricao,
    valor,
    tipo,
    categoriaId: categoria.id
  });
  
  await refreshCurrentView();
  alert(`Transação criada: ${descricao} - R$ ${valor.toFixed(2)} - ${tipo} - ${categoria.nome}`);
  router('/dashboard');
}

// Processar comando de voz para categoria
async function processCategoryVoice(transcript) {
  // Padrão: "nome tipo limite"
  // Exemplo: "alimentação despesa 500" ou "alimentação despesa cem"
  const words = transcript.split(' ');
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
  // Criar categoria
  await addCategory({
    nome,
    tipo,
    limite,
    cor
  });
  alert(`Categoria criada: ${nome} - ${tipo} - R$ ${limite.toFixed(2)}`);
  router('/categories');
}

// Funções auxiliares para modais
function createModal(title, content) {
  // Remover modal existente se houver
  const existingModal = document.getElementById('app-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  const modal = document.createElement('div');
  modal.id = 'app-modal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">${title}</h2>
          <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>
        ${content}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Fechar modal ao clicar fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  return modal;
}

window.closeModal = function() {
  const modal = document.getElementById('app-modal');
  if (modal) {
    modal.remove();
  }
};

// Função de logout global
window.logout = async () => {
  try {
    await signOut(auth);
    console.log('Logout realizado com sucesso');
  } catch (error) {
    console.error('Erro no logout:', error);
  }
};

// Configurar navegação
function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const route = btn.getAttribute('data-route');
      router(route);
    });
  });
}

// Configurar botão de login
function setupLoginButton() {
  const btn = document.getElementById('btn-entrar');
  
  if (btn) {
    btn.onclick = function() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // Login bem-sucedido
        })
        .catch((error) => {
          console.error('Erro no login:', error);
          alert('Erro ao fazer login: ' + error.message);
        });
    };
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
  console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
  if (user) {
    window.appState.currentUser = user;
    try {
      await loadBudgets();
      if (window.appState.budgets.length === 0) {
        const defaultBudgetId = await addBudget({ nome: 'Orçamento Principal', descricao: 'Orçamento padrão criado automaticamente' });
        window.appState.currentBudget = { id: defaultBudgetId, nome: 'Orçamento Principal' };
      } else {
        window.appState.currentBudget = window.appState.budgets[0];
      }
      // Só agora ativar o listener
      listenTransactions();
      await loadCategories();
      showLoading(false);
      toggleLoginPage(false);
      router('/dashboard');
    } catch (e) {
      showLoading(false);
      alert('Erro ao carregar dados: ' + e.message);
    }
  } else {
    showLoading(false);
    toggleLoginPage(true);
  }
});

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  setupLoginButton();
  toggleLoginPage(true);
  setupNavigation();
  
  // Configurar FAB
  const fab = document.getElementById('fab-add');
  if (fab) {
    fab.addEventListener('click', () => {
      showAddTransactionModal();
    });
  }

  // Configurar microfone do topo
  const voiceBtn = document.getElementById('voice-control');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      createModal('Comando de Voz', `
        <div class='space-y-4 text-center'>
          <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
          <div class='flex flex-col gap-3'>
            <button onclick='window.startVoiceRecognition("transaction")' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
            <button onclick='window.startVoiceRecognition("category")' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
          </div>
          <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
        </div>
      `);
    });
  }
});

window.selectSharedBudget = function() {
  createModal('Entrar em Orçamento Compartilhado', `
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
  `);
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
      alert('Você entrou no orçamento compartilhado!');
    } catch (err) {
      alert('Erro ao entrar no orçamento: ' + err.message);
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
    alert('Erro ao gerar PDF. Verifique se a biblioteca jsPDF está carregada.');
  }
};
// ... existing code ...
