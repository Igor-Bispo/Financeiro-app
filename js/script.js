// Firebase Modular v9+ (ESM)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",
  authDomain: "controle-financeiro-b98ec.firebaseapp.com",
  projectId: "controle-financeiro-b98ec",
  storageBucket: "controle-financeiro-b98ec.firebasestorage.app",
  messagingSenderId: "418109336597",
  appId: "1:418109336597:web:871b262a76e57455ebb21c",
  measurementId: "G-7RW2F269V6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// === ELEMENTOS ===
const btnEntrar = document.getElementById('btn-entrar');
const btnSair = document.getElementById('btn-sair');
const userName = document.getElementById('user-name');
const userInfo = document.getElementById('user-info');
const formTransacao = document.getElementById('form-transacao');
const formCategoria = document.getElementById('form-categoria');
const selectCategoria = document.getElementById('categoria-transacao');
const listaTransacoes = document.getElementById('lista-transacoes');
const listaCategorias = document.getElementById('lista-categorias');
const resumoReceita = document.getElementById('resumo-receita');
const resumoDespesa = document.getElementById('resumo-despesa');
const resumoSaldo = document.getElementById('resumo-saldo');
const resumoOrcamento = document.getElementById('resumo-orcamento');

// === AUTENTICAÇÃO GOOGLE ===
if (btnEntrar) {
  btnEntrar.onclick = async function() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error('Erro na autenticação:', e);
      alert('Erro ao autenticar: ' + e.message);
    }
  };
}

if (btnSair) {
  btnSair.onclick = async function() {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
      alert('Erro ao fazer logout: ' + e.message);
    }
  };
}

// === CONTROLE DE INTERFACE ===
function atualizarInterfaceLogin(user) {
  if (user) {
    if (userName) userName.textContent = user.displayName || user.email || '';
    if (btnEntrar) btnEntrar.classList.add('hidden');
    if (btnSair) btnSair.classList.remove('hidden');
    if (formTransacao) formTransacao.style.display = '';
    if (formCategoria) formCategoria.style.display = '';
    // Aguarda um pouco para garantir que a autenticação está completa
    setTimeout(() => {
      carregarCategoriasFirestore();
      carregarTransacoesFirestore();
    }, 500);
  } else {
    if (userName) userName.textContent = '';
    if (btnEntrar) btnEntrar.classList.remove('hidden');
    if (btnSair) btnSair.classList.add('hidden');
    if (formTransacao) formTransacao.style.display = 'none';
    if (formCategoria) formCategoria.style.display = 'none';
    if (listaTransacoes) listaTransacoes.innerHTML = '';
    if (listaCategorias) listaCategorias.innerHTML = '';
    atualizarResumo(0, 0, 0, 0);
  }
}

onAuthStateChanged(auth, function(user) {
  atualizarInterfaceLogin(user);
});

// === CRUD FIRESTORE ===
// Categorias
async function salvarCategoriaFirestore(nome, tipo, limite) {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado. Faça login novamente.');
  const categoriaData = {
    nome: nome,
    tipo: tipo,
    limite: Number(limite) || 0,
    uid: user.uid,
    dataCriacao: new Date().toISOString()
  };
  console.log('Tentando salvar categoria:', categoriaData);
  await addDoc(collection(db, 'categorias'), categoriaData);
}

async function carregarCategoriasFirestore() {
  const user = auth.currentUser;
  if (!user) {
    console.log('Usuário não autenticado, não carregando categorias');
    return [];
  }
  
  try {
    const q = query(collection(db, 'categorias'), where('uid', '==', user.uid));
    const snap = await getDocs(q);
    const categorias = [];
    snap.forEach(doc => categorias.push({ id: doc.id, ...doc.data() }));
    atualizarSelectCategorias(categorias);
    await atualizarListaCategorias(categorias);
    return categorias;
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    if (error.code === 'permission-denied') {
      alert('Erro de permissão ao carregar categorias. Verifique se está logado.');
    }
    return [];
  }
}

function atualizarSelectCategorias(categorias) {
  if (!selectCategoria) return;
  selectCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';
  categorias.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.nome;
    opt.textContent = cat.nome + ' (' + cat.tipo + ')';
    selectCategoria.appendChild(opt);
  });
}

async function atualizarListaCategorias(categorias) {
  if (!listaCategorias) return;
  listaCategorias.innerHTML = '';
  
  const user = auth.currentUser;
  if (!user) return;
  
  try {
    const q = query(collection(db, 'transacoes'), where('uid', '==', user.uid));
    const snap = await getDocs(q);
    const transacoes = [];
    snap.forEach(doc => transacoes.push(doc.data()));
    
    categorias.forEach(cat => {
      let totalDespesas = 0;
      if (cat.tipo === 'despesa') {
        totalDespesas = transacoes
          .filter(t => t.categoria === cat.nome && t.tipo === 'despesa')
          .reduce((acc, t) => acc + (Number(t.valor) || 0), 0);
      }
      
      const limite = Number(cat.limite) || 0;
      const saldo = cat.tipo === 'despesa' ? limite - totalDespesas : 0;
      
      const li = document.createElement('li');
      li.className = 'py-1 px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 relative';
      li.innerHTML = `
        <div class="flex justify-between items-center w-full">
          <div>
            <span class="font-medium">${cat.nome} (${cat.tipo})</span>
            <span class="text-xs text-gray-500 ml-2">Limite: R$ ${limite.toLocaleString('pt-BR', {minimumFractionDigits:2})}</span>
            <span class="text-xs text-blue-700 ml-2">Saldo: ${cat.tipo === 'despesa' ? 'R$ ' + saldo.toLocaleString('pt-BR', {minimumFractionDigits:2}) : '-'}</span>
          </div>
          <div class="flex gap-2">
            <button class="history-categoria-btn" data-nome="${cat.nome}" title="Ver histórico">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 3" stroke="#0ea5e9" stroke-width="2"/></svg>
            </button>
            <button class="edit-categoria-btn" data-nome="${cat.nome}" title="Editar">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 21h4.586a1 1 0 0 0 .707-.293l10.414-10.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 15.707A1 1 0 0 0 4 16.414V21z" stroke="#6366f1" stroke-width="2"/></svg>
            </button>
            <button class="delete-categoria-btn" data-nome="${cat.nome}" title="Apagar">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" stroke="#ef4444" stroke-width="2"/></svg>
            </button>
          </div>
        </div>
      `;
      listaCategorias.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao atualizar lista de categorias:', error);
  }
}

// Transações
async function salvarTransacaoFirestore(descricao, valor, tipo, categoria) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado. Faça login novamente.');
  }
  
  // Verifica se o token ainda é válido
  try {
    await user.getIdToken(true);
  } catch (e) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }
  
  const transacaoData = {
    descricao: descricao,
    valor: Number(valor) || 0,
    tipo: tipo,
    categoria: categoria,
    uid: user.uid,
    data: new Date().toISOString()
  };
  
  await addDoc(collection(db, 'transacoes'), transacaoData);
}

async function carregarTransacoesFirestore() {
  const user = auth.currentUser;
  if (!user) {
    console.log('Usuário não autenticado, não carregando transações');
    return [];
  }
  
  try {
    const q = query(collection(db, 'transacoes'), where('uid', '==', user.uid), orderBy('data', 'desc'));
    const snap = await getDocs(q);
    const transacoes = [];
    snap.forEach(doc => transacoes.push({ id: doc.id, ...doc.data() }));
    atualizarListaTransacoes(transacoes);
    await atualizarResumoCards(transacoes);
    return transacoes;
  } catch (error) {
    console.error('Erro ao carregar transações:', error);
    if (error.code === 'permission-denied') {
      alert('Erro de permissão ao carregar transações. Verifique se está logado.');
    }
    return [];
  }
}

function atualizarListaTransacoes(transacoes) {
  if (!listaTransacoes) return;
  listaTransacoes.innerHTML = '';
  
  transacoes.forEach(t => {
    const li = document.createElement('li');
    li.className = 'py-1 px-2 border-b border-gray-200 flex flex-col gap-1 relative';
    const valor = Number(t.valor) || 0;
    const data = t.data ? new Date(t.data).toLocaleDateString('pt-BR') : 'Data não informada';
    li.innerHTML = `
      <div class="flex justify-between items-center">
        <div>
          <span class="font-medium">${t.descricao}</span>
          <span class="text-sm text-gray-600 ml-2">${t.categoria}</span>
        </div>
        <div class="flex gap-2">
          <button class="edit-transacao-btn" data-id="${t.id}" title="Editar">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 21h4.586a1 1 0 0 0 .707-.293l10.414-10.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 15.707A1 1 0 0 0 4 16.414V21z" stroke="#6366f1" stroke-width="2"/></svg>
          </button>
          <button class="delete-transacao-btn" data-id="${t.id}" title="Apagar">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" stroke="#ef4444" stroke-width="2"/></svg>
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center text-xs">
        <span class="${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">${t.tipo.toUpperCase()}</span>
        <span class="font-bold">R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits:2})}</span>
        <span class="text-gray-500">${data}</span>
      </div>
    `;
    listaTransacoes.appendChild(li);
  });
}

async function atualizarResumoCards(transacoes) {
  const user = auth.currentUser;
  if (!user) return;
  
  try {
    // Calcula receita total
    let receita = 0;
    transacoes.forEach(t => { 
      if (t.tipo === 'receita') receita += (Number(t.valor) || 0); 
    });
    
    // Carrega categorias para calcular despesas
    const q = query(collection(db, 'categorias'), where('uid', '==', user.uid));
    const snap = await getDocs(q);
    const categorias = [];
    snap.forEach(doc => categorias.push(doc.data()));
    
    // Calcula despesa total (soma dos limites das categorias de despesa)
    let despesaTotal = categorias
      .filter(c => c.tipo === 'despesa')
      .reduce((acc, c) => acc + (Number(c.limite) || 0), 0);
    
    // Calcula saldo atual (soma dos saldos das categorias de despesa)
    let saldoAtual = categorias
      .filter(c => c.tipo === 'despesa')
      .reduce((acc, c) => {
        const totalDespesas = transacoes
          .filter(t => t.categoria === c.nome && t.tipo === 'despesa')
          .reduce((a, t) => a + (Number(t.valor) || 0), 0);
        return acc + ((Number(c.limite) || 0) - totalDespesas);
      }, 0);
    
    // Calcula orçamento restante
    let orcamentoRestante = receita - despesaTotal;
    
    atualizarResumo(receita, despesaTotal, saldoAtual, orcamentoRestante);
  } catch (error) {
    console.error('Erro ao atualizar resumo:', error);
    // Em caso de erro, mostra valores zerados
    atualizarResumo(0, 0, 0, 0);
  }
}

function atualizarResumo(receita, despesa, saldo, orcamento) {
  // Garante que todos os valores são números válidos
  const receitaValor = Number(receita) || 0;
  const despesaValor = Number(despesa) || 0;
  const saldoValor = Number(saldo) || 0;
  const orcamentoValor = Number(orcamento) || 0;
  
  if (resumoReceita) resumoReceita.textContent = 'R$ ' + receitaValor.toLocaleString('pt-BR', {minimumFractionDigits:2});
  if (resumoDespesa) resumoDespesa.textContent = 'R$ ' + despesaValor.toLocaleString('pt-BR', {minimumFractionDigits:2});
  if (resumoSaldo) resumoSaldo.textContent = 'R$ ' + saldoValor.toLocaleString('pt-BR', {minimumFractionDigits:2});
  if (resumoOrcamento) resumoOrcamento.textContent = 'R$ ' + orcamentoValor.toLocaleString('pt-BR', {minimumFractionDigits:2});
}

// Função auxiliar para atualizar categorias e transações após adicionar categoria
async function atualizarTudoAposCategoria() {
  try {
    await carregarCategoriasFirestore();
    await carregarTransacoesFirestore();
  } catch (error) {
    console.error('Erro ao atualizar após adicionar categoria:', error);
  }
}

// Função auxiliar para atualizar categorias e transações após adicionar transação
async function atualizarTudoAposTransacao() {
  try {
    await carregarTransacoesFirestore();
    await carregarCategoriasFirestore();
  } catch (error) {
    console.error('Erro ao atualizar após adicionar transação:', error);
  }
}

// === FORMULÁRIOS ===
if (formCategoria) {
  formCategoria.onsubmit = async function(e) {
    e.preventDefault();
    
    // Verifica se o usuário está autenticado
    const user = auth.currentUser;
    if (!user) {
      alert('Você precisa estar logado para adicionar categorias. Faça login primeiro.');
      return;
    }
    
    const nome = document.getElementById('nome-categoria').value.trim();
    const tipo = document.getElementById('tipo-categoria').value;
    const limite = document.getElementById('limite-categoria').value;
    
    if (!nome) {
      alert('Por favor, informe o nome da categoria.');
      return;
    }
    
    try {
      await salvarCategoriaFirestore(nome, tipo, limite);
      alert('Categoria adicionada com sucesso!');
      formCategoria.reset();
      await atualizarTudoAposCategoria();
    } catch (err) {
      console.error('Erro ao salvar categoria:', err);
      if (err.code === 'permission-denied' || err.message.includes('permission') || err.message.includes('autenticado') || err.message.includes('Sessão')) {
        alert('Erro de autenticação: ' + err.message + '\n\nPor favor, faça login novamente.');
        // Tenta fazer logout para limpar o estado
        try {
          await signOut(auth);
        } catch (logoutError) {
          console.error('Erro ao fazer logout:', logoutError);
        }
      } else {
        alert('Erro ao adicionar categoria: ' + err.message);
      }
    }
  };
}

if (formTransacao) {
  formTransacao.onsubmit = async function(e) {
    e.preventDefault();
    
    // Verifica se o usuário está autenticado
    const user = auth.currentUser;
    if (!user) {
      alert('Você precisa estar logado para adicionar transações. Faça login primeiro.');
      return;
    }
    
    const descricao = document.getElementById('descricao-transacao').value.trim();
    const valor = parseFloat(document.getElementById('valor-transacao').value);
    const tipo = document.getElementById('tipo-transacao').value;
    const categoria = document.getElementById('categoria-transacao').value;
    
    if (!descricao) {
      alert('Por favor, informe a descrição da transação.');
      return;
    }
    
    if (!valor || valor <= 0) {
      alert('Por favor, informe um valor válido maior que zero.');
      return;
    }
    
    if (!categoria) {
      alert('Por favor, selecione uma categoria.');
      return;
    }
    
    try {
      await salvarTransacaoFirestore(descricao, valor, tipo, categoria);
      alert('Transação adicionada com sucesso!');
      formTransacao.reset();
      await atualizarTudoAposTransacao();
    } catch (err) {
      console.error('Erro ao salvar transação:', err);
      if (err.code === 'permission-denied' || err.message.includes('permission') || err.message.includes('autenticado') || err.message.includes('Sessão')) {
        alert('Erro de autenticação: ' + err.message + '\n\nPor favor, faça login novamente.');
        // Tenta fazer logout para limpar o estado
        try {
          await signOut(auth);
        } catch (logoutError) {
          console.error('Erro ao fazer logout:', logoutError);
        }
      } else {
        alert('Erro ao adicionar transação: ' + err.message);
      }
    }
  };
}

// === MICROFONE/RECONHECIMENTO DE VOZ AVANÇADO ===
function normalizeVoiceText(texto) {
  return texto
    .replace(/[.,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCategoriaVoice(texto) {
  texto = normalizeVoiceText(texto.toLowerCase());
  let partes = texto.split(' ');
  let tipo = partes.find(p => p === 'despesa' || p === 'receita') || '';
  let limite = partes.find(p => /^\d+[\d,.]*$/.test(p)) || '';
  if (limite) limite = limite.replace(',', '.');
  let tipoIdx = partes.indexOf(tipo);
  let limiteIdx = partes.indexOf(limite);
  let nome = partes.slice(0, tipoIdx > -1 ? tipoIdx : limiteIdx > -1 ? limiteIdx : partes.length).join(' ');
  return { nome: nome.trim(), tipo, limite };
}

function parseTransacaoVoice(texto) {
  texto = normalizeVoiceText(texto.toLowerCase());
  let partes = texto.split(' ');
  let tipo = partes.find(p => p === 'despesa' || p === 'receita') || '';
  let valor = partes.find(p => /^\d+[\d,.]*$/.test(p)) || '';
  if (valor) valor = valor.replace(',', '.');
  let valorIdx = partes.indexOf(valor);
  let tipoIdx = partes.indexOf(tipo);
  let descricao = valorIdx > 0 ? partes.slice(0, valorIdx).join(' ') : '';
  let categoria = tipoIdx > -1 && tipoIdx < partes.length - 1 ? partes.slice(tipoIdx + 1).join(' ') : '';
  return { descricao: descricao.trim(), valor, tipo, categoria: categoria.trim() };
}

function setupVoiceInputAdvanced(btnId, formType) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  let recognition;
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
  } else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
  }
  if (!recognition) {
    btn.disabled = true;
    btn.title = 'Reconhecimento de voz não suportado neste navegador.';
    return;
  }
  recognition.lang = 'pt-BR';
  recognition.continuous = false;
  recognition.interimResults = false;
  btn.onclick = function() {
    btn.classList.add('active');
    recognition.start();
  };
  recognition.onresult = function(event) {
    const texto = event.results[0][0].transcript;
    if (formType === 'categoria') {
      const { nome, tipo, limite } = parseCategoriaVoice(texto);
      if (nome) document.getElementById('nome-categoria').value = nome;
      if (tipo) document.getElementById('tipo-categoria').value = tipo;
      if (limite) document.getElementById('limite-categoria').value = limite;
    } else if (formType === 'transacao') {
      const { descricao, valor, tipo, categoria } = parseTransacaoVoice(texto);
      if (descricao) document.getElementById('descricao-transacao').value = descricao;
      if (valor) document.getElementById('valor-transacao').value = valor;
      if (tipo) document.getElementById('tipo-transacao').value = tipo;
      if (categoria) document.getElementById('categoria-transacao').value = categoria;
    }
    btn.classList.remove('active');
  };
  recognition.onerror = function() {
    btn.classList.remove('active');
  };
  recognition.onend = function() {
    btn.classList.remove('active');
  };
}

document.addEventListener('DOMContentLoaded', function() {
  setupVoiceInputAdvanced('mic-categoria', 'categoria');
  setupVoiceInputAdvanced('mic-transacao', 'transacao');
});

// === AÇÕES DOS BOTÕES DE TRANSAÇÃO ===
document.addEventListener('click', async function(e) {
  // Apagar transação
  if (e.target.closest('.delete-transacao-btn')) {
    const btn = e.target.closest('.delete-transacao-btn');
    const id = btn.getAttribute('data-id');
    if (confirm('Tem certeza que deseja apagar esta transação?')) {
      await apagarTransacaoFirestore(id);
      await atualizarTudoAposTransacao();
    }
  }
  // Editar transação
  if (e.target.closest('.edit-transacao-btn')) {
    const btn = e.target.closest('.edit-transacao-btn');
    const id = btn.getAttribute('data-id');
    const transacao = await buscarTransacaoPorId(id);
    if (transacao) {
      const novaDescricao = prompt('Editar descrição:', transacao.descricao);
      if (novaDescricao === null) return;
      const novoValor = prompt('Editar valor:', transacao.valor);
      if (novoValor === null) return;
      const novaCategoria = prompt('Editar categoria:', transacao.categoria);
      if (novaCategoria === null) return;
      await editarTransacaoFirestore(id, {
        descricao: novaDescricao,
        valor: Number(novoValor),
        categoria: novaCategoria
      });
      await atualizarTudoAposTransacao();
    }
  }
});

// === AÇÕES DOS BOTÕES DE CATEGORIA ===
document.addEventListener('click', async function(e) {
  // Apagar categoria
  if (e.target.closest('.delete-categoria-btn')) {
    const btn = e.target.closest('.delete-categoria-btn');
    const nome = btn.getAttribute('data-nome');
    if (confirm('Tem certeza que deseja apagar esta categoria?')) {
      await apagarCategoriaFirestore(nome);
      await atualizarTudoAposCategoria();
    }
  }
  // Editar categoria
  if (e.target.closest('.edit-categoria-btn')) {
    const btn = e.target.closest('.edit-categoria-btn');
    const nome = btn.getAttribute('data-nome');
    const categoria = await buscarCategoriaPorNome(nome);
    if (categoria) {
      const novoNome = prompt('Editar nome:', categoria.nome);
      if (novoNome === null) return;
      const novoTipo = prompt('Editar tipo (receita/ despesa):', categoria.tipo);
      if (novoTipo === null) return;
      const novoLimite = prompt('Editar limite:', categoria.limite);
      if (novoLimite === null) return;
      await editarCategoriaFirestore(categoria.id, {
        nome: novoNome,
        tipo: novoTipo,
        limite: Number(novoLimite)
      });
      await atualizarTudoAposCategoria();
    }
  }
  // Histórico da categoria
  if (e.target.closest('.history-categoria-btn')) {
    const btn = e.target.closest('.history-categoria-btn');
    const nome = btn.getAttribute('data-nome');
    const transacoes = await buscarTransacoesPorCategoria(nome);
    let msg = `Histórico da categoria "${nome}":\n\n`;
    if (transacoes.length === 0) msg += 'Nenhuma transação encontrada.';
    else transacoes.forEach(t => {
      msg += `${t.descricao} | ${t.tipo} | R$ ${Number(t.valor).toLocaleString('pt-BR', {minimumFractionDigits:2})} | ${new Date(t.data).toLocaleDateString('pt-BR')}\n`;
    });
    alert(msg);
  }
});

// === FUNÇÕES FIRESTORE AUXILIARES ===
async function apagarTransacaoFirestore(id) {
  const user = auth.currentUser;
  if (!user) return;
  await deleteDoc(doc(db, 'transacoes', id));
}
async function buscarTransacaoPorId(id) {
  const user = auth.currentUser;
  if (!user) return null;
  const q = query(collection(db, 'transacoes'), where('uid', '==', user.uid));
  const snap = await getDocs(q);
  for (const docu of snap.docs) {
    if (docu.id === id) return { id: docu.id, ...docu.data() };
  }
  return null;
}
async function editarTransacaoFirestore(id, dados) {
  const user = auth.currentUser;
  if (!user) return;
  await updateDoc(doc(db, 'transacoes', id), dados);
}
async function apagarCategoriaFirestore(nome) {
  const user = auth.currentUser;
  if (!user) return;
  const q = query(collection(db, 'categorias'), where('uid', '==', user.uid), where('nome', '==', nome));
  const snap = await getDocs(q);
  for (const docu of snap.docs) {
    await deleteDoc(doc(db, 'categorias', docu.id));
  }
}
async function buscarCategoriaPorNome(nome) {
  const user = auth.currentUser;
  if (!user) return null;
  const q = query(collection(db, 'categorias'), where('uid', '==', user.uid), where('nome', '==', nome));
  const snap = await getDocs(q);
  for (const docu of snap.docs) {
    return { id: docu.id, ...docu.data() };
  }
  return null;
}
async function editarCategoriaFirestore(id, dados) {
  const user = auth.currentUser;
  if (!user) return;
  await updateDoc(doc(db, 'categorias', id), dados);
}
async function buscarTransacoesPorCategoria(nome) {
  const user = auth.currentUser;
  if (!user) return [];
  const q = query(collection(db, 'transacoes'), where('uid', '==', user.uid), where('categoria', '==', nome));
  const snap = await getDocs(q);
  const transacoes = [];
  snap.forEach(doc => transacoes.push(doc.data()));
  return transacoes;
}