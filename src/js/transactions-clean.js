// ===== TRANSAÇÕES CLEAN JS =====

// Função principal para renderizar transações com design limpo
async function renderCleanTransactions() {
  try {
    console.log('🚀 Iniciando renderCleanTransactions');
    
    // Aplicar tema
    applyThemeToTransactions();
    
    // Carregar dados necessários
    await loadTransactions();
    await loadRecorrentes();
    
    const content = document.getElementById('app-content');
    if (!content) {
      console.error('❌ Elemento app-content não encontrado');
      return;
    }
    
    console.log('📊 Dados carregados:', {
      transactions: window.appState.transactions?.length || 0,
      categories: window.appState.categories?.length || 0,
      recorrentes: window.appState.recorrentes?.length || 0
    });
    
    // Renderizar HTML
    content.innerHTML = generateTransactionsHTML();
    
    // Configurar funcionalidades
    setupTransactionsSearch();
    setupTransactionsFilters();
    setupTransactionsButtons();
    
    console.log('✅ Transações limpas renderizadas:', window.appState.transactions?.length || 0, 'transações');
    
  } catch (error) {
    console.error('❌ Erro ao renderizar transações limpas:', error);
  }
}

// Aplicar tema às transações
function applyThemeToTransactions() {
  const themeColor = localStorage.getItem('themeColor') || 'blue';
  const root = document.documentElement;
  
  // Aplicar o atributo data-theme-color
  root.setAttribute('data-theme-color', themeColor);
  
  console.log('🎨 Tema aplicado nas transações:', themeColor);
}

// Gerar HTML das transações
function generateTransactionsHTML() {
  const transactions = window.appState.transactions || [];
  const categories = window.appState.categories || [];
  
  console.log('📋 Gerando HTML das transações:', {
    transactionsCount: transactions.length,
    categoriesCount: categories.length,
    categories: categories.map(c => c.nome)
  });
  
  if (transactions.length === 0) {
    return `
      <div class="transactions-container">
        <div class="transactions-header">
          <div class="transactions-title">
            📋 Transações
          </div>
          <div class="transactions-actions">
            <button onclick="showAddTransactionModal()" class="btn-transaction primary">
              ➕ Nova Transação
            </button>
            <button onclick="showVoiceModal()" class="btn-transaction secondary">
              🎤 Voz
            </button>
          </div>
        </div>
        
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <div class="empty-title">Nenhuma transação encontrada</div>
          <div class="empty-description">
            Adicione sua primeira transação para começar a controlar suas finanças
          </div>
          <button onclick="showAddTransactionModal()" class="empty-btn">
            ➕ Adicionar Transação
          </button>
        </div>
      </div>
    `;
  }
  
  const transactionsHTML = transactions.map(t => generateTransactionItem(t)).join('');
  
  return `
    <div class="transactions-container">
      <div class="transactions-header">
        <div class="transactions-title">
          📋 Transações
          <span class="search-results" id="search-results" style="display: none;">
            (<span id="search-count">0</span> encontradas)
          </span>
        </div>
        <div class="transactions-actions">
          <button onclick="showAddTransactionModal()" class="btn-transaction primary">
            ➕ Nova Transação
          </button>
          <button onclick="showVoiceModal()" class="btn-transaction secondary">
            🎤 Voz
          </button>
        </div>
      </div>
      
      <div class="filters-container">
        <div class="search-container">
          <div class="search-icon">🔍</div>
          <input 
            type="text" 
            id="transaction-search" 
            class="search-input" 
            placeholder="Pesquisar transações..."
          />
        </div>
        
        <div class="filters-row">
          <div class="filter-container" style="flex: 1; position: relative;">
            <div class="filter-icon">🏷️</div>
                                     <select id="category-filter" class="filter-select">
              <option value="">Todas as categorias</option>
              ${window.appState.categories?.map(cat => {
                console.log('🏷️ Adicionando categoria ao select:', cat.nome);
                return `<option value="${cat.nome}">${cat.nome}</option>`;
              }).join('') || ''}
            </select>
            <div class="filter-arrow">▼</div>
          </div>
          
          <div class="filter-container" style="flex: 1; position: relative;">
            <div class="filter-icon">💰</div>
            <select id="type-filter" class="filter-select">
              <option value="">Todos os tipos</option>
              <option value="receita">💚 Receitas</option>
              <option value="despesa">❤️ Despesas</option>
            </select>
            <div class="filter-arrow">▼</div>
          </div>
          
          <button id="clear-filters-btn" class="clear-filters-btn">
            🗑️ Limpar
          </button>
        </div>
      </div>
      
      <div class="transactions-list" id="transactions-list">
        ${transactionsHTML}
      </div>
    </div>
  `;
}

// Gerar item de transação individual
function generateTransactionItem(t) {
  const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
  const data = formatTransactionDate(t.createdAt);
  const isReceita = t.tipo === 'receita';
  const isRecorrente = t.recorrenteId;
  
  // Calcular informações de parcela para recorrentes
  let parcelaInfo = '';
  if (isRecorrente) {
    const recorrente = window.appState.recorrentes?.find(r => r.id === t.recorrenteId);
    if (recorrente) {
      const parcelaAtual = t.parcelaAtual || 1;
      const parcelasTotal = recorrente.parcelasTotal || 1;
      
      if (parcelasTotal > 1) {
        parcelaInfo = ` • ${parcelaAtual} de ${parcelasTotal}`;
      } else {
        parcelaInfo = ' • Infinito';
      }
    }
  }
  
  return `
    <div class="transaction-item ${isReceita ? 'receita' : 'despesa'} ${isRecorrente ? 'recorrente' : ''}" data-transaction-id="${t.id}">
      <div class="transaction-info">
        <div class="transaction-title">
          ${t.descricao}
          ${isRecorrente ? '<span class="recorrente-badge">🔄</span>' : ''}
        </div>
        <div class="transaction-meta">
          ${categoria ? `
            <span class="transaction-category">
              🏷️ ${categoria.nome}
            </span>
          ` : ''}
          <span class="transaction-date">
            📅 ${data}
          </span>
          ${isRecorrente ? `
            <span class="parcela-info">
              ${parcelaInfo}
            </span>
          ` : ''}
        </div>
      </div>
      
      <div class="transaction-actions">
        <div class="transaction-value ${isReceita ? 'positive' : 'negative'}">
          ${isReceita ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
        </div>
        <div class="action-buttons">
          <button onclick="editTransaction('${t.id}')" class="action-btn edit" title="Editar">
            ✏️
          </button>
          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="action-btn delete" title="Excluir">
            🗑️
          </button>
        </div>
      </div>
    </div>
  `;
}

// Formatar data da transação
function formatTransactionDate(createdAt) {
  try {
    let date;
    if (createdAt && typeof createdAt === 'object' && createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000);
    } else {
      date = new Date(createdAt);
    }
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
}

// Configurar pesquisa de transações
function setupTransactionsSearch() {
  const searchInput = document.getElementById('transaction-search');
  const searchResults = document.getElementById('search-results');
  const searchCount = document.getElementById('search-count');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    applyCleanFilters();
    
    // Mostrar/ocultar contador de resultados
    if (searchTerm.length > 0) {
      searchResults.style.display = 'inline';
      const visibleCount = document.querySelectorAll('.transaction-item[style*="display: block"]').length;
      searchCount.textContent = visibleCount;
    } else {
      searchResults.style.display = 'none';
    }
  });
}

// Configurar filtros de transações
function setupTransactionsFilters() {
  console.log('🔧 Configurando filtros de transações');
  
  const categoryFilter = document.getElementById('category-filter');
  const typeFilter = document.getElementById('type-filter');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  
  console.log('🔧 Elementos encontrados:', {
    categoryFilter: !!categoryFilter,
    typeFilter: !!typeFilter,
    clearFiltersBtn: !!clearFiltersBtn
  });
  
  if (categoryFilter) {
    console.log('🔧 Configurando filtro de categoria');
    categoryFilter.addEventListener('change', (e) => {
      console.log('🔧 Filtro de categoria mudou:', e.target.value);
      console.log('🔧 Hash antes:', window.location.hash);
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // Bloquear qualquer navegação durante o filtro
      const originalRouter = window.router;
      window.router = (path) => {
        console.log('🔧 Router bloqueado durante filtro:', path);
        return false;
      };
      
      // Forçar que estamos na aba transações
      if (window.location.hash !== '#/transactions') {
        window.location.hash = '#/transactions';
      }
      
      applyCleanFilters();
      console.log('🔧 Hash depois:', window.location.hash);
      
      // Restaurar router após um delay
      setTimeout(() => {
        window.router = originalRouter;
      }, 100);
      
      // Retornar false para garantir que não propague
      return false;
    });
  }
  
  if (typeFilter) {
    console.log('🔧 Configurando filtro de tipo');
    typeFilter.addEventListener('change', (e) => {
      console.log('🔧 Filtro de tipo mudou:', e.target.value);
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // Forçar que estamos na aba transações
      if (window.location.hash !== '#/transactions') {
        window.location.hash = '#/transactions';
      }
      
      applyCleanFilters();
      
      // Retornar false para garantir que não propague
      return false;
    });
  }
  
  if (clearFiltersBtn) {
    console.log('🔧 Configurando botão limpar filtros');
    clearFiltersBtn.addEventListener('click', (e) => {
      console.log('🔧 Botão limpar filtros clicado');
      e.preventDefault();
      e.stopPropagation();
      clearCleanFilters();
    });
  }
}

// Aplicar filtros
function applyCleanFilters() {
  const searchTerm = document.getElementById('transaction-search')?.value.toLowerCase().trim() || '';
  const categoryFilter = document.getElementById('category-filter')?.value || '';
  const typeFilter = document.getElementById('type-filter')?.value || '';
  
  console.log('🔧 Aplicando filtros:', { searchTerm, categoryFilter, typeFilter });
  
  const transactionItems = document.querySelectorAll('.transaction-item');
  let visibleCount = 0;
  
  transactionItems.forEach(item => {
    const title = item.querySelector('.transaction-title').textContent.toLowerCase();
    const categoryElement = item.querySelector('.transaction-category');
    const category = categoryElement ? categoryElement.textContent.replace('🏷️ ', '').trim().toLowerCase() : '';
    const transactionType = item.classList.contains('receita') ? 'receita' : 'despesa';
    
    // Verificar pesquisa
    const matchesSearch = !searchTerm || title.includes(searchTerm);
    
    // Verificar filtro de categoria
    const matchesCategory = !categoryFilter || categoryFilter === '' || category === categoryFilter.toLowerCase();
    

    
    // Verificar filtro de tipo
    const matchesType = !typeFilter || transactionType === typeFilter;
    

    
    if (matchesSearch && matchesCategory && matchesType) {
      item.style.display = 'flex';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });
  
  // Atualizar contador
  const searchResults = document.getElementById('search-results');
  const searchCount = document.getElementById('search-count');
  if (searchResults && searchCount) {
    if (searchTerm.length > 0 || categoryFilter || typeFilter) {
      searchResults.style.display = 'inline';
      searchCount.textContent = visibleCount;
    } else {
      searchResults.style.display = 'none';
    }
  }
  
}

// Limpar filtros
function clearCleanFilters() {
  console.log('🧹 Limpando filtros');
  
  const searchInput = document.getElementById('transaction-search');
  const categoryFilter = document.getElementById('category-filter');
  const typeFilter = document.getElementById('type-filter');
  
  console.log('🧹 Elementos encontrados:', {
    searchInput: !!searchInput,
    categoryFilter: !!categoryFilter,
    typeFilter: !!typeFilter
  });
  
  if (searchInput) searchInput.value = '';
  if (categoryFilter) categoryFilter.value = '';
  if (typeFilter) typeFilter.value = '';
  
  console.log('🧹 Valores limpos');
  
  // Mostrar todas as transações
  const transactionItems = document.querySelectorAll('.transaction-item');
  console.log('🧹 Transações encontradas:', transactionItems.length);
  
  transactionItems.forEach(item => {
    item.style.display = 'flex';
  });
  
  // Aplicar filtros limpos
  applyCleanFilters();
  
  // Ocultar contador
  const searchResults = document.getElementById('search-results');
  if (searchResults) {
    searchResults.style.display = 'none';
  }
  
  console.log('🧹 Filtros limpos aplicados');
}

// Configurar botões das transações
function setupTransactionsButtons() {
  // Botão de adicionar transação
  const addBtn = document.querySelector('.btn-transaction.primary');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (window.showAddTransactionModal) {
        window.showAddTransactionModal();
      }
    });
  }
  
  // Botão de voz
  const voiceBtn = document.querySelector('.btn-transaction.secondary');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      if (window.showVoiceModal) {
        window.showVoiceModal();
      }
    });
  }
}

// Funções auxiliares
async function loadTransactions() {
  if (!window.appState.transactions) {
    console.log('📊 Carregando transações...');
    // Implementar carregamento se necessário
  }
}

async function loadRecorrentes() {
  if (!window.appState.recorrentes) {
    console.log('🔄 Carregando recorrentes...');
    // Implementar carregamento se necessário
  }
}

// Exportar função principal
export { renderCleanTransactions };
