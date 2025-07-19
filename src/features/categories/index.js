import CategoryForm from './CategoryForm.js';
import CategoryList from './CategoryList.js';

// Funções simuladas para manipulação de categorias (pode ser adaptado para Firestore)
export function getCategorias() {
  return window.categoriasSimuladas || [];
}
export function addCategoria(categoria) {
  if (window.categoriasSimuladas) {
    window.categoriasSimuladas.unshift(categoria);
  }
}

// Função para inicializar o módulo de categorias em um container
export function renderCategoriesModule({ containerId = 'dashboard-categorias', transacoes = [] } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Renderiza o formulário
  container.innerHTML = CategoryForm();

  // Renderiza a lista
  const categorias = getCategorias();
  container.innerHTML += CategoryList({ categorias, transacoes });

  // Eventos de submit do formulário
  const form = container.querySelector('#form-categoria');
  form.onsubmit = function (e) {
    e.preventDefault();
    const nome = form.querySelector('#nome-categoria').value;
    const tipo = form.querySelector('#tipo-categoria').value;
    const limite = parseFloat(form.querySelector('#limite-categoria').value) || 0;
    if (!nome || !tipo) {
      alert('Preencha todos os campos da categoria.');
      return;
    }
    addCategoria({ nome, tipo, limite });
    renderCategoriesModule({ containerId, transacoes });
  };

  // Eventos de editar/excluir/histórico
  container.querySelectorAll('.delete-categoria-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      if (confirm('Deseja realmente excluir esta categoria?')) {
        const categorias = getCategorias();
        categorias.splice(idx, 1);
        renderCategoriesModule({ containerId, transacoes });
      }
    });
  });
  container.querySelectorAll('.edit-categoria-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      const categorias = getCategorias();
      const cat = categorias[idx];
      if (!cat) return;
      form.querySelector('#nome-categoria').value = cat.nome;
      form.querySelector('#tipo-categoria').value = cat.tipo;
      form.querySelector('#limite-categoria').value = cat.limite;
      form.setAttribute('data-edit-idx', idx);
    });
  });
  container.querySelectorAll('.history-categoria-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      alert('Histórico da categoria: funcionalidade em desenvolvimento.');
    });
  });
} 