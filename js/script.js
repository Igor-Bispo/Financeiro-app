// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8QauQw7YCg2DDsleFF5pbIcmPPuThv6M",
  authDomain: "financeiro-8c5b7.firebaseapp.com",
  projectId: "financeiro-8c5b7",
  storageBucket: "financeiro-8c5b7.appspot.com",
  messagingSenderId: "196239620563",
  appId: "1:196239620563:web:83f64e077179153f585726",
  measurementId: "G-1VYZSEV9M3"
};

// Inicializar Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const database = firebase.database();

// Elementos do DOM com verificações de segurança
function getElementSafe(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`Elemento não encontrado: ${id}`);
  return el;
}

const elements = {
  loginSection: getElementSafe('loginSection'),
  registerSection: getElementSafe('registerSection'),
  loginForm: getElementSafe('loginForm'),
  registerForm: getElementSafe('registerForm'),
  showRegister: getElementSafe('showRegister'),
  showLogin: getElementSafe('showLogin'),
  logoutBtn: getElementSafe('logoutBtn'),
  appContent: getElementSafe('appContent'),
  themeToggle: getElementSafe('themeToggle'),
  currentBalance: getElementSafe('currentBalance'),
  totalIncome: getElementSafe('totalIncome'),
  totalExpenses: getElementSafe('totalExpenses'),
  transactionForm: getElementSafe('transactionForm'),
  transactionsList: getElementSafe('transactionsList'),
  financeChart: getElementSafe('financeChart'),
  confirmModal: getElementSafe('confirmModal'),
  modalTitle: getElementSafe('modalTitle'),
  modalMessage: getElementSafe('modalMessage'),
  modalCancel: getElementSafe('modalCancel'),
  modalConfirm: getElementSafe('modalConfirm')
};

// Variáveis globais
let currentUser = null;
let financeChart = null;
let selectedTransaction = null;

// Categorias
const categories = {
  income: {
    salary: 'Salário',
    other: 'Outras receitas'
  },
  expense: {
    food: 'Alimentação',
    transport: 'Transporte',
    housing: 'Moradia',
    entertainment: 'Lazer',
    health: 'Saúde',
    education: 'Educação',
    other: 'Outras despesas'
  }
};

// Configurar listeners de eventos
function setupEventListeners() {
  // Mostrar/ocultar seções de login/cadastro
  if (elements.showRegister && elements.loginSection && elements.registerSection) {
    elements.showRegister.addEventListener('click', () => {
      elements.loginSection.classList.add('hidden');
      elements.registerSection.classList.remove('hidden');
    });
  }

  if (elements.showLogin && elements.loginSection && elements.registerSection) {
    elements.showLogin.addEventListener('click', () => {
      elements.registerSection.classList.add('hidden');
      elements.loginSection.classList.remove('hidden');
    });
  }

  // Formulários
  if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', handleLogin);
  }

  if (elements.registerForm) {
    elements.registerForm.addEventListener('submit', handleRegister);
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener('click', handleLogout);
  }

  // Tema
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }

  // Transações
  if (elements.transactionForm) {
    elements.transactionForm.addEventListener('submit', addTransaction);
  }

  // Modal
  if (elements.modalCancel) {
    elements.modalCancel.addEventListener('click', () => {
      elements.confirmModal.classList.add('hidden');
    });
  }

  if (elements.modalConfirm) {
    elements.modalConfirm.addEventListener('click', confirmAction);
  }
}

// Manipuladores de autenticação
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      currentUser = userCredential.user;
      initApp();
    })
    .catch((error) => {
      showAlert('Erro ao fazer login: ' + error.message, 'error');
    });
}

function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;
  
  if (password !== confirm) {
    showAlert('As senhas não coincidem', 'error');
    return;
  }
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      currentUser = userCredential.user;
      initApp();
    })
    .catch((error) => {
      showAlert('Erro ao cadastrar: ' + error.message, 'error');
    });
}

function handleLogout() {
  auth.signOut().then(() => {
    currentUser = null;
    if (elements.loginSection) elements.loginSection.classList.remove('hidden');
    if (elements.appContent) elements.appContent.classList.add('hidden');
    if (elements.logoutBtn) elements.logoutBtn.classList.add('hidden');
    
    if (financeChart) {
      financeChart.destroy();
      financeChart = null;
    }
  });
}

// Verificar estado de autenticação
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    initApp();
  } else {
    if (elements.loginSection) elements.loginSection.classList.remove('hidden');
    if (elements.appContent) elements.appContent.classList.add('hidden');
    if (elements.logoutBtn) elements.logoutBtn.classList.add('hidden');
  }
});

// Inicializar aplicativo
function initApp() {
  if (elements.loginSection) elements.loginSection.classList.add('hidden');
  if (elements.registerSection) elements.registerSection.classList.add('hidden');
  if (elements.appContent) elements.appContent.classList.remove('hidden');
  if (elements.logoutBtn) elements.logoutBtn.classList.remove('hidden');
  
  loadTransactions();
  setupRealTimeUpdates();
}

// [Restante das funções de transações, gráficos, etc...]
// (Manter as mesmas funções do código anterior, mas sempre verificando se os elementos existem)

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  checkThemePreference();
});