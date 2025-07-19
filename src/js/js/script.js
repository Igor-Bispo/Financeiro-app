console.log('==== APP INICIALIZADO ====');

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { renderDashboardModule } from '../../features/dashboard/index.js';
import { renderTransactionsModule } from '../../features/transactions/index.js';
import { renderCategoriesModule } from '../../features/categories/index.js';
import { renderSettingsModule } from '../../features/settings/index.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY',
  authDomain: 'controle-financeiro-b98ec.firebaseapp.com',
  projectId: 'controle-financeiro-b98ec',
  storageBucket: 'controle-financeiro-b98ec.firebasestorage.app',
  messagingSenderId: '418109336597',
  appId: '1:418109336597:web:871b262a76e57455ebb21c',
  measurementId: 'G-7RW2F269V6',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function carregarDashboard() {
  // Exemplo: valores simulados, troque para buscar do Firestore depois
  const receita = 1500.00;
  const despesa = 800.00;
  const saldo = receita - despesa;
  const resumoReceita = document.getElementById('resumo-receita');
  const resumoDespesa = document.getElementById('resumo-despesa');
  const resumoSaldo = document.getElementById('resumo-saldo');
  if (resumoReceita) resumoReceita.textContent = 'R$ ' + receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  if (resumoDespesa) resumoDespesa.textContent = 'R$ ' + despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  if (resumoSaldo) resumoSaldo.textContent = 'R$ ' + saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

let transacoesSimuladas = [
  { descricao: 'Salário', valor: 1200, tipo: 'receita', categoria: 'Trabalho', data: '2024-06-01' },
  { descricao: 'Supermercado', valor: 200, tipo: 'despesa', categoria: 'Alimentação', data: '2024-06-03' },
  { descricao: 'Internet', valor: 100, tipo: 'despesa', categoria: 'Contas', data: '2024-06-05' },
];

function carregarTransacoesRecentes() {
  const listaTransacoes = document.getElementById('lista-transacoes');
  if (listaTransacoes) {
    listaTransacoes.innerHTML = '';
    listaTransacoes.className = 'grid gap-4 sm:grid-cols-2';
    transacoesSimuladas.forEach((t, idx) => {
      const li = document.createElement('li');
      li.className = 'bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg p-5 flex justify-between items-center transition hover:scale-[1.02]';
      li.innerHTML = `
        <div>
          <div class="font-bold text-lg text-gray-900">${t.descricao}</div>
          <div class="text-xs text-gray-500 mt-1">${t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1)} • ${t.categoria} • ${new Date(t.data).toLocaleDateString('pt-BR')}</div>
        </div>
        <div class="flex items-center gap-3">
          <span class="${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'} font-extrabold text-lg">${t.tipo === 'receita' ? '+' : '-'} R$ ${t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          <button class="edit-transacao-btn rounded-full bg-indigo-100 p-2 hover:bg-indigo-200 transition" title="Editar" data-idx="${idx}">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 21h4.586a1 1 0 0 0 .707-.293l10.414-10.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 15.707A1 1 0 0 0 4 16.414V21z" stroke="#6366f1" stroke-width="2"/></svg>
          </button>
          <button class="delete-transacao-btn rounded-full bg-red-100 p-2 hover:bg-red-200 transition" title="Apagar" data-idx="${idx}">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" stroke="#ef4444" stroke-width="2"/></svg>
          </button>
        </div>
      `;
      listaTransacoes.appendChild(li);
    });
    // Listeners para editar e excluir
    listaTransacoes.querySelectorAll('.delete-transacao-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        if (confirm('Deseja realmente excluir esta transação?')) {
          transacoesSimuladas.splice(idx, 1);
          carregarTransacoesRecentes();
        }
      });
    });
    listaTransacoes.querySelectorAll('.edit-transacao-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        preencherFormularioEdicaoTransacao(idx);
      });
    });
  }
}

// Função para preencher o formulário com dados da transação para edição
function preencherFormularioEdicaoTransacao(idx) {
  const t = transacoesSimuladas[idx];
  if (!t) return;
  document.getElementById('descricao-transacao').value = t.descricao;
  document.getElementById('valor-transacao').value = t.valor;
  document.getElementById('tipo-transacao').value = t.tipo;
  document.getElementById('categoria-transacao').value = t.categoria;
  document.getElementById('data-transacao').value = t.data;
  document.getElementById('form-transacao').setAttribute('data-edit-idx', idx);
}

let categoriasSimuladas = [
  { nome: 'Trabalho', tipo: 'receita', limite: 0 },
  { nome: 'Alimentação', tipo: 'despesa', limite: 500 },
  { nome: 'Contas', tipo: 'despesa', limite: 300 },
];

function carregarCategoriasRecentes() {
  const listaCategorias = document.getElementById('lista-categorias');
  if (listaCategorias) {
    listaCategorias.innerHTML = '';
    listaCategorias.className = 'flex flex-col gap-4';
    categoriasSimuladas.forEach((cat, idx) => {
      // Calcular total gasto na categoria
      const gasto = transacoesSimuladas.filter(t => t.categoria === cat.nome && t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
      const saldo = cat.limite > 0 ? cat.limite - gasto : 0;
      const percent = cat.limite > 0 ? Math.round((gasto / cat.limite) * 100) : 0;
      const barColor = percent >= 90 ? 'bg-red-500' : percent >= 60 ? 'bg-yellow-400' : 'bg-green-500';
      const li = document.createElement('li');
      li.className = 'bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2';
      li.innerHTML = `
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold text-gray-900 text-base">${cat.nome}</div>
            <div class="text-xs text-gray-400">${cat.tipo.charAt(0).toUpperCase() + cat.tipo.slice(1)} • Limite: ${cat.limite > 0 ? 'R$ ' + cat.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-'} • Saldo: <span class="${saldo < 0 ? 'text-red-500' : 'text-green-600'} font-bold">R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
          </div>
          <div class="flex gap-2">
            <button class="history-categoria-btn rounded-full bg-blue-100 p-2 hover:bg-blue-200 transition" title="Ver histórico">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="#0ea5e9" stroke-width="2"/></svg>
            </button>
            <button class="edit-categoria-btn rounded-full bg-indigo-100 p-2 hover:bg-indigo-200 transition" title="Editar">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 21h4.586a1 1 0 0 0 .707-.293l10.414-10.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 15.707A1 1 0 0 0 4 16.414V21z" stroke="#6366f1" stroke-width="2"/></svg>
            </button>
            <button class="delete-categoria-btn rounded-full bg-red-100 p-2 hover:bg-red-200 transition" title="Apagar">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" stroke="#ef4444" stroke-width="2"/></svg>
          </button>
          </div>
        </div>
        ${cat.tipo === 'despesa' && cat.limite > 0 ? `
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2 relative overflow-hidden">
            <div class="${barColor} h-2 rounded-full transition-all" style="width: ${Math.min(percent, 100)}%"></div>
            <span class="absolute right-2 top-0 text-xs text-gray-500 font-bold">${percent}%</span>
          </div>
        ` : ''}
      `;
      listaCategorias.appendChild(li);
    });
    // Listeners para editar, excluir e histórico
    listaCategorias.querySelectorAll('.edit-categoria-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => preencherFormularioEdicaoCategoria(i));
    });
    listaCategorias.querySelectorAll('.delete-categoria-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (confirm('Deseja realmente excluir esta categoria?')) {
          categoriasSimuladas.splice(i, 1);
          carregarCategoriasRecentes();
        }
      });
    });
    listaCategorias.querySelectorAll('.history-categoria-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        alert('Histórico da categoria: funcionalidade em desenvolvimento.');
      });
    });
  }
  // Atualizar select de categorias no formulário de transação
  const selectCategoria = document.getElementById('categoria-transacao');
  if (selectCategoria) {
    selectCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';
    categoriasSimuladas.forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat.nome;
      opt.textContent = cat.nome + ' (' + cat.tipo + ')';
      selectCategoria.appendChild(opt);
    });
  }
}

// Função para preencher o formulário de categoria para edição
function preencherFormularioEdicaoCategoria(idx) {
  const cat = categoriasSimuladas[idx];
  if (!cat) return;
  document.getElementById('nome-categoria').value = cat.nome;
  document.getElementById('tipo-categoria').value = cat.tipo;
  document.getElementById('limite-categoria').value = cat.limite;
  document.getElementById('form-categoria').setAttribute('data-edit-idx', idx);
}

async function carregarCategoriasFirestore(uid) {
  const categorias = [];
  const q = query(collection(db, 'categorias'), where('uid', '==', uid));
  const snap = await getDocs(q);
  snap.forEach((doc) => categorias.push(doc.data()));
  return categorias;
}

async function carregarOrcamentosFirestore(uid) {
  console.log('Buscando orçamentos para UID:', uid);
  const orcamentos = [];
  const q = query(collection(db, 'budgets'), where('members', 'array-contains', uid));
  const snap = await getDocs(q);
  snap.forEach((doc) => {
    orcamentos.push({ id: doc.id, ...doc.data() });
  });
  console.log('Orçamentos encontrados:', orcamentos);
  return orcamentos;
}

function exibirOrcamentosNaConfig(orcamentos) {
  let container = document.getElementById('orcamento-config-container');
  if (!container) {
    // Cria o container se não existir
    const configSection = document.getElementById('config-section');
    if (configSection) {
      container = document.createElement('div');
      container.id = 'orcamento-config-container';
      configSection.appendChild(container);
    } else {
      console.warn('Não foi possível encontrar ou criar o container de orçamentos!');
      return;
    }
  }
  container.innerHTML = '';
  // Botões de criar/entrar orçamento
  const btnsDiv = document.createElement('div');
  btnsDiv.className = 'flex gap-2 mb-4';
  btnsDiv.innerHTML = `
    <button id="btn-criar-orcamento" class="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow">Criar novo orçamento</button>
    <button id="btn-entrar-orcamento" class="bg-white border border-indigo-400 text-indigo-600 font-bold py-2 px-4 rounded-full shadow">Entrar em orçamento existente</button>
  `;
  container.appendChild(btnsDiv);
  if (orcamentos.length === 0) {
    container.innerHTML += '<div class="text-gray-500">Nenhum orçamento encontrado.</div>';
    return;
  }
  orcamentos.forEach((orc) => {
    const nomeOrcamento = orc.name || orc.categoryName || `Orçamento ${orc.id}`;
    const div = document.createElement('div');
    div.className = 'flex flex-col sm:flex-row sm:items-center justify-between border-b py-2 gap-2';
    div.innerHTML = `
      <span class="font-medium text-indigo-700">${nomeOrcamento}</span>
      <span class="text-xs text-gray-400">ID: <span class="font-mono">${orc.id}</span></span>
      <div class="flex gap-2">
        <button class="copy-orcamento-id-btn bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded text-xs" data-id="${orc.id}">Copiar ID</button>
        <button class="select-orcamento-btn bg-indigo-600 text-white px-3 py-1 rounded text-xs" data-id="${orc.id}">Selecionar</button>
      </div>
    `;
    container.appendChild(div);
  });
  // Listeners para copiar ID
  container.querySelectorAll('.copy-orcamento-id-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      navigator.clipboard.writeText(id);
      btn.textContent = 'Copiado!';
      setTimeout(() => (btn.textContent = 'Copiar ID'), 1500);
      // Exibir modal/instrução de compartilhamento
      alert('ID copiado! Compartilhe este código com quem você deseja dar acesso ao orçamento. Você pode enviar por WhatsApp, e-mail ou outro app. Em breve será possível convidar usuários diretamente pelo app.');
    });
  });
  // Listeners para selecionar orçamento
  container.querySelectorAll('.select-orcamento-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      window.ActiveBudgetId = id;
      alert('Orçamento selecionado!');
    });
  });
  // Listeners para criar/entrar orçamento
  document.getElementById('btn-criar-orcamento').onclick = () => {
    alert('Funcionalidade de criar orçamento em desenvolvimento.');
  };
  document.getElementById('btn-entrar-orcamento').onclick = () => {
    alert('Funcionalidade de entrar em orçamento existente em desenvolvimento.');
  };
  // Botões de exportar e backup
  const exportDiv = document.createElement('div');
  exportDiv.className = 'flex flex-wrap gap-2 mt-4';
  exportDiv.innerHTML = `
    <button id="btn-exportar-pdf" class="bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-full shadow">Exportar PDF</button>
    <button id="btn-exportar-excel" class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow">Exportar Excel</button>
    <button id="btn-backup" class="bg-white border border-indigo-400 text-indigo-600 font-bold py-2 px-4 rounded-full shadow">Baixar Backup</button>
  `;
  container.appendChild(exportDiv);
  document.getElementById('btn-exportar-pdf').onclick = () => {
    if (window.PDFModule && window.PDFModule.exportToPDF) {
      window.PDFModule.exportToPDF();
    } else if (window.exportToPDF) {
      window.exportToPDF();
    } else {
      alert('Módulo de exportação PDF não disponível.');
    }
  };
  document.getElementById('btn-exportar-excel').onclick = async () => {
    // Carregar SheetJS dinamicamente se não estiver presente
    if (typeof window.XLSX === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      script.onload = () => exportarParaExcel();
      script.onerror = () => alert('Erro ao carregar biblioteca Excel.');
      document.head.appendChild(script);
    } else {
      exportarParaExcel();
    }
    function exportarParaExcel() {
      // Montar dados simulados (transações e categorias)
      const transacoes = window.transacoesSimuladas || [];
      const categorias = window.categoriasSimuladas || [];
      // Planilha de transações
      const wsTransacoes = window.XLSX.utils.json_to_sheet(transacoes.map(t => ({
        Descrição: t.descricao,
        Valor: t.valor,
        Tipo: t.tipo,
        Categoria: t.categoria,
        Data: t.data
      })));
      // Planilha de categorias
      const wsCategorias = window.XLSX.utils.json_to_sheet(categorias.map(c => ({
        Nome: c.nome,
        Tipo: c.tipo,
        Limite: c.limite
      })));
      // Criar workbook
      const wb = window.XLSX.utils.book_new();
      window.XLSX.utils.book_append_sheet(wb, wsTransacoes, 'Transações');
      window.XLSX.utils.book_append_sheet(wb, wsCategorias, 'Categorias');
      // Salvar arquivo
      window.XLSX.writeFile(wb, `financeiro_${new Date().toISOString().split('T')[0]}.xlsx`);
    }
  };
  document.getElementById('btn-backup').onclick = () => {
    const transacoes = window.transacoesSimuladas || [];
    const categorias = window.categoriasSimuladas || [];
    const backup = {
      data: new Date().toISOString(),
      transacoes,
      categorias
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financeiro-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
  // Botão de notificações push
  const notifDiv = document.createElement('div');
  notifDiv.className = 'mt-4';
  notifDiv.innerHTML = `
    <button id="btn-notificacoes" class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-bold py-2 px-4 rounded-full shadow">Ativar Notificações Push</button>
    <span id="notificacoes-status" class="ml-2 text-xs text-gray-500"></span>
  `;
  container.appendChild(notifDiv);
  let notificacoesAtivas = false;
  document.getElementById('btn-notificacoes').onclick = async () => {
    if (!('Notification' in window)) {
      alert('Notificações push não são suportadas neste navegador.');
      return;
    }
    if (Notification.permission === 'granted') {
      notificacoesAtivas = !notificacoesAtivas;
      atualizarStatusNotificacoes();
    } else if (Notification.permission !== 'denied') {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        notificacoesAtivas = true;
        atualizarStatusNotificacoes();
      } else {
        alert('Permissão de notificação negada.');
      }
    } else {
      alert('Permissão de notificação negada.');
    }
  };
  function atualizarStatusNotificacoes() {
    const status = document.getElementById('notificacoes-status');
    status.textContent = notificacoesAtivas ? 'Notificações ativas' : 'Notificações desativadas';
    document.getElementById('btn-notificacoes').textContent = notificacoesAtivas ? 'Desativar Notificações Push' : 'Ativar Notificações Push';
  }
  atualizarStatusNotificacoes();
}

function renderizarDashboardCards() {
  const cardsContainer = document.getElementById('dashboard-cards');
  if (!cardsContainer) return;
  // Calcular totais
  const receita = transacoesSimuladas.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
  const despesa = transacoesSimuladas.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
  const saldo = receita - despesa;
  cardsContainer.innerHTML = `
    <div class="grid grid-cols-3 gap-3 mb-6">
      <div class="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-4 flex flex-col items-center shadow">
        <span class="text-xs text-green-700 font-semibold mb-1">Receita</span>
        <span class="text-2xl font-bold text-green-700">R$ ${receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
      <div class="bg-gradient-to-br from-red-100 to-red-50 rounded-2xl p-4 flex flex-col items-center shadow">
        <span class="text-xs text-red-700 font-semibold mb-1">Despesa</span>
        <span class="text-2xl font-bold text-red-700">R$ ${despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
      <div class="bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl p-4 flex flex-col items-center shadow">
        <span class="text-xs text-indigo-700 font-semibold mb-1">Saldo</span>
        <span class="text-2xl font-bold text-indigo-700">R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const btnEntrar = document.getElementById('btn-entrar');
  const btnSair = document.getElementById('btn-sair');
  const formTransacao = document.getElementById('form-transacao');
  const formCategoria = document.getElementById('form-categoria');
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');

  // Navegação entre abas
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      contentSections.forEach((sec) => sec.classList.remove('active'));
      const targetSection = document.getElementById(section + '-section');
      if (targetSection) targetSection.classList.add('active');
      navItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  if (btnEntrar) {
    btnEntrar.onclick = function () {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .catch(error => {
          alert('Erro ao fazer login: ' + error.message);
          console.error(error);
        });
    };
  }
  if (btnSair) {
    btnSair.onclick = async function () {
      await signOut(auth);
    };
  }
  if (formCategoria) {
    formCategoria.onsubmit = async function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome-categoria').value;
      const tipo = document.getElementById('tipo-categoria').value;
      const limite = parseFloat(document.getElementById('limite-categoria').value) || 0;
      if (!nome || !tipo) {
        alert('Preencha todos os campos da categoria.');
        return;
      }
      const editIdx = formCategoria.getAttribute('data-edit-idx');
      if (editIdx !== null && editIdx !== undefined && editIdx !== '') {
        // Editar categoria existente
        categoriasSimuladas[parseInt(editIdx)] = { nome, tipo, limite };
        formCategoria.removeAttribute('data-edit-idx');
      } else {
        // Nova categoria
        const novaCategoria = { nome, tipo, limite };
        categoriasSimuladas.unshift(novaCategoria);
      }
      formCategoria.reset();
      carregarCategoriasRecentes();
    };
  }
  if (formTransacao) {
    formTransacao.onsubmit = function (e) {
      e.preventDefault();
      const descricao = document.getElementById('descricao-transacao').value;
      const valor = parseFloat(document.getElementById('valor-transacao').value);
      const tipo = document.getElementById('tipo-transacao').value;
      const categoria = document.getElementById('categoria-transacao').value;
      const data = document.getElementById('data-transacao') ? document.getElementById('data-transacao').value : new Date().toISOString().slice(0,10);
      if (!descricao || isNaN(valor) || !tipo || !categoria) {
        alert('Preencha todos os campos da transação.');
        return;
      }
      const editIdx = formTransacao.getAttribute('data-edit-idx');
      if (editIdx !== null && editIdx !== undefined && editIdx !== '') {
        // Editar transação existente
        transacoesSimuladas[parseInt(editIdx)] = { descricao, valor, tipo, categoria, data };
        formTransacao.removeAttribute('data-edit-idx');
      } else {
        // Nova transação
        const novaTransacao = { descricao, valor, tipo, categoria, data };
        transacoesSimuladas.unshift(novaTransacao);
      }
      formTransacao.reset();
      carregarTransacoesRecentes();
      renderizarDashboardCards();
      carregarCategoriasRecentes();
      verificarLimiteCategorias();
    };
  }

  // Listener para botão de voz da transação
  const micTransacao = document.getElementById('mic-transacao');
  if (micTransacao) {
    micTransacao.addEventListener('click', () => {
      if (window.FinanceVoice && window.FinanceVoice.startListening) {
        window.FinanceVoice.startListening('transaction');
        // O módulo de voz já cuida do modal e da confirmação
      } else {
        alert('Reconhecimento de voz não disponível.');
      }
    });
  }
  // Listener para botão de voz da categoria
  const micCategoria = document.getElementById('mic-categoria');
  if (micCategoria) {
    micCategoria.addEventListener('click', () => {
      if (window.FinanceVoice && window.FinanceVoice.startListening) {
        window.FinanceVoice.startListening('category');
      } else {
        alert('Reconhecimento de voz não disponível.');
      }
    });
  }

  onAuthStateChanged(auth, async (user) => {
    const loginPage = document.getElementById('login-page');
    const mainApp = document.querySelector('main');
    if (user) {
      console.log('Usuário autenticado:', user);
      if (btnEntrar) btnEntrar.style.display = 'none';
      if (btnSair) btnSair.style.display = 'block';
      if (loginPage) loginPage.style.display = 'none';
      if (mainApp) mainApp.style.display = '';
      carregarDashboard();
      carregarTransacoesRecentes();
      await atualizarCategoriasDoFirestore();
      // Buscar e exibir orçamentos na aba Config
      const orcamentos = await carregarOrcamentosFirestore(user.uid);
      exibirOrcamentosNaConfig(orcamentos);
      renderizarDashboardCards();
      sincronizarTransacoesFirestore(user.uid);
      sincronizarCategoriasFirestore(user.uid);
      // Renderizar módulos modernos
      renderDashboardModule({
        containerId: 'dashboard-cards',
        transacoes: window.transacoesSimuladas || [],
        categorias: window.categoriasSimuladas || []
      });
      renderTransactionsModule({
        containerId: 'dashboard-transacoes',
        categorias: window.categoriasSimuladas || []
      });
      renderCategoriesModule({
        containerId: 'dashboard-categorias',
        transacoes: window.transacoesSimuladas || []
      });
      renderSettingsModule({
        containerId: 'orcamento-config-container',
        orcamentos: window.orcamentosSimulados || []
      });
    } else {
      console.log('Usuário não autenticado');
      if (btnEntrar) btnEntrar.style.display = 'block';
      if (btnSair) btnSair.style.display = 'none';
      if (loginPage) loginPage.style.display = 'flex';
      if (mainApp) mainApp.style.display = 'none';
      // Limpe dados da interface, se necessário
    }
  });
});

async function atualizarCategoriasDoFirestore() {
  const user = auth.currentUser;
  if (!user) return;
  categoriasSimuladas = await carregarCategoriasFirestore(user.uid);
  carregarCategoriasRecentes();
}

// Simular notificação ao atingir limite de categoria
function verificarLimiteCategorias() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  categoriasSimuladas.forEach(cat => {
    if (cat.limite > 0) {
      const gasto = transacoesSimuladas.filter(t => t.categoria === cat.nome && t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
      if (gasto >= cat.limite) {
        new Notification(`Limite atingido!`, { body: `A categoria ${cat.nome} atingiu o limite de R$ ${cat.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` });
      }
    }
  });
}

// Listener em tempo real para transações do usuário autenticado
function sincronizarTransacoesFirestore(uid) {
  const transacoesRef = collection(db, 'transacoes');
  const q = query(transacoesRef, where('uid', '==', uid));
  onSnapshot(q, (snapshot) => {
    transacoesSimuladas = [];
    snapshot.forEach((doc) => {
      transacoesSimuladas.push(doc.data());
    });
    carregarTransacoesRecentes();
    renderizarDashboardCards();
    carregarCategoriasRecentes();
  });
}

// Listener em tempo real para categorias do usuário autenticado
function sincronizarCategoriasFirestore(uid) {
  const categoriasRef = collection(db, 'categorias');
  const q = query(categoriasRef, where('uid', '==', uid));
  onSnapshot(q, (snapshot) => {
    categoriasSimuladas = [];
    snapshot.forEach((doc) => {
      categoriasSimuladas.push(doc.data());
    });
    carregarCategoriasRecentes();
    renderizarDashboardCards();
  });
}