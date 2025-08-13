// ===== CATEGORIAS CLEAN JS =====

// Função principal para renderizar categorias com design limpo
async function renderCleanCategories() {
  try {
    console.log('🚀 Iniciando renderCleanCategories');
    
    // Aplicar tema
    applyThemeToCategories();
    
    // Carregar dados necessários
    await loadTransactions();
    await loadRecorrentes();
    
    const content = document.getElementById('app-content');
    if (!content) return;
    
    // Calcular dados das categorias
    const categoriasComDados = calculateCategoryData();
    
    // Renderizar HTML
    content.innerHTML = generateCategoriesHTML(categoriasComDados);
    
    // Configurar funcionalidades
    setupCategoriesSearch();
    setupCategoriesButtons();
    
    console.log('✅ Categorias limpas renderizadas:', categoriasComDados.length, 'categorias');
    
  } catch (error) {
    console.error('❌ Erro ao renderizar categorias limpas:', error);
  }
}

// Aplicar tema às categorias
function applyThemeToCategories() {
  const themeColor = localStorage.getItem('themeColor') || 'blue';
  const root = document.documentElement;
  
  // Aplicar o atributo data-theme-color
  root.setAttribute('data-theme-color', themeColor);
  
  console.log('🎨 Tema aplicado nas categorias:', themeColor);
}

// Calcular dados das categorias
function calculateCategoryData() {
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;
  
  return window.appState.categories.map(cat => {
    // Filtrar transações da categoria no mês atual
    const transacoesCategoria = window.appState.transactions.filter(t => {
      let transacaoData;
      if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
        transacaoData = new Date(t.createdAt.seconds * 1000);
      } else {
        transacaoData = new Date(t.createdAt);
      }
      
      const transacaoAno = transacaoData.getFullYear();
      const transacaoMes = transacaoData.getMonth() + 1;
      
      return (
        t.categoriaId === cat.id &&
        t.tipo === cat.tipo &&
        transacaoAno === anoAtual &&
        transacaoMes === mesAtual
      );
    });
    
    // Calcular totais
    const totalGastoTransacoes = transacoesCategoria.reduce(
      (sum, t) => sum + parseFloat(t.valor), 0
    );
    
    // Calcular recorrentes aplicadas
    const recorrentesAplicadas = window.appState.recorrentes.filter(
      r => r.categoriaId === cat.id && r.ativa === true
    );
    
    let totalGastoRecorrentes = 0;
    recorrentesAplicadas.forEach(rec => {
      if (deveSerAplicadaNesteMes(rec, anoAtual, mesAtual)) {
        totalGastoRecorrentes += parseFloat(rec.valor || 0);
      }
    });
    
    const totalGasto = totalGastoTransacoes + totalGastoRecorrentes;
    const limite = parseFloat(cat.limite || 0);
    
    // Calcular saldo
    let saldo;
    if (cat.tipo === 'receita') {
      saldo = limite - totalGasto; // Quanto falta para a meta
    } else {
      saldo = limite - totalGasto; // Quanto ainda pode gastar
    }
    
    // Calcular percentual de uso
    const percentualUso = limite > 0 ? (totalGasto / limite) * 100 : 0;
    
    // Determinar status da barra de progresso
    let progressStatus = 'safe';
    if (cat.tipo === 'receita') {
      if (percentualUso >= 100) progressStatus = 'danger';
      else if (percentualUso >= 75) progressStatus = 'caution';
    } else {
      if (percentualUso >= 100) progressStatus = 'danger';
      else if (percentualUso >= 75) progressStatus = 'caution';
    }
    
    return {
      ...cat,
      totalGasto,
      totalGastoTransacoes,
      totalGastoRecorrentes,
      saldo,
      percentualUso,
      progressStatus,
      limite
    };
  });
}

// Função auxiliar para verificar se recorrente deve ser aplicada
function deveSerAplicadaNesteMes(rec, ano, mes) {
  if (!rec.dataInicio) return true;
  
  try {
    const [anoInicio, mesInicio] = rec.dataInicio.split('-').map(Number);
    if (ano < anoInicio || (ano === anoInicio && mes < mesInicio)) {
      return false;
    }
    
    if (rec.parcelasTotal && rec.parcelasTotal > 0) {
      const mesesDesdeInicio = (ano - anoInicio) * 12 + (mes - mesInicio);
      const parcelasRestantes = rec.parcelasRestantes || rec.parcelasTotal;
      
      if (mesesDesdeInicio >= parcelasRestantes) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao verificar recorrente:', error);
    return true;
  }
}

// Gerar HTML das categorias
function generateCategoriesHTML(categorias) {
  if (categorias.length === 0) {
    return `
      <div class="categories-container">
        <div class="categories-header">
          <div class="categories-title">
            🏷️ Categorias
          </div>
          <div class="categories-actions">
            <button onclick="showAddCategoryModal()" class="btn-category primary">
              ➕ Nova Categoria
            </button>
          </div>
        </div>
        
        <div class="empty-state">
          <div class="empty-icon">🏷️</div>
          <div class="empty-title">Nenhuma categoria encontrada</div>
          <div class="empty-description">
            Adicione sua primeira categoria para começar a organizar suas finanças
          </div>
        </div>
      </div>
    `;
  }
  
  // Separar categorias por tipo e ordenar por gastos
  const categoriasReceita = categorias
    .filter(cat => cat.tipo === 'receita')
    .sort((a, b) => b.totalGasto - a.totalGasto); // Ordenar receitas por valor (maior primeiro)
    
  const categoriasDespesa = categorias
    .filter(cat => cat.tipo === 'despesa')
    .sort((a, b) => b.totalGasto - a.totalGasto); // Ordenar despesas por gastos (maior primeiro)
  
  const categoriasReceitaHTML = categoriasReceita.map((cat, index) => generateCategoryCard(cat, index)).join('');
  const categoriasDespesaHTML = categoriasDespesa.map((cat, index) => generateCategoryCard(cat, index)).join('');
  
  return `
    <div class="categories-container">
      <div class="categories-header">
        <div class="categories-title">
          🏷️ Categorias
          <span class="search-results" id="search-results" style="display: none;">
            (<span id="search-count">0</span> encontradas)
          </span>
        </div>
        <div class="categories-actions">
          <button onclick="window.migrarTransacoesAntigas()" class="btn-category secondary">
            🔄 Migrar
          </button>
          <button onclick="window.corrigirTipoCategoria()" class="btn-category secondary">
            🔧 Corrigir
          </button>
          <button onclick="showAddCategoryModal()" class="btn-category primary">
            ➕ Nova Categoria
          </button>
        </div>
      </div>
      
      <div class="search-container">
        <div class="search-icon">🔍</div>
        <input 
          type="text" 
          id="category-search" 
          class="search-input" 
          placeholder="Pesquisar categorias..."
        />
      </div>
      
      <div class="categories-content">
        ${categoriasReceita.length > 0 ? `
          <div class="category-section">
            <div class="section-header receita">
              <div class="section-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
                  <path d="M3 10h18" stroke="white" stroke-width="2"/>
                  <!-- Fundo quadriculado -->
                  <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
                  <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
                  <!-- Gráfico de linha crescente -->
                  <path d="M6 16l2-2 2-1 2-3 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="section-title">Receitas</div>
              <div class="section-count">${categoriasReceita.length}</div>
            </div>
            <div class="categories-grid" id="categories-receita">
              ${categoriasReceitaHTML}
            </div>
          </div>
        ` : ''}
        
        ${categoriasDespesa.length > 0 ? `
          <div class="category-section">
            <div class="section-header despesa">
              <div class="section-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
                  <path d="M3 10h18" stroke="white" stroke-width="2"/>
                  <!-- Fundo quadriculado -->
                  <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
                  <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
                  <!-- Gráfico de linha decrescente -->
                  <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="section-title">Despesas</div>
              <div class="section-count">${categoriasDespesa.length}</div>
            </div>
            <div class="categories-grid" id="categories-despesa">
              ${categoriasDespesaHTML}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// Gerar card de categoria individual
function generateCategoryCard(cat, index = 0) {
  const progressWidth = Math.min(cat.percentualUso, 100);
  const isReceita = cat.tipo === 'receita';
  
  return `
    <div class="category-card ${isReceita ? 'receita' : 'despesa'}" data-category-id="${cat.id}">
      <div class="category-header">
        <div class="category-info">
          <div class="category-color" style="background-color: ${cat.cor || (isReceita ? '#10b981' : '#ef4444')}"></div>
          <div class="category-details">
            <div class="category-name">
              ${cat.nome}
              ${cat.totalGasto > 0 ? `<span class="category-rank">#${index + 1}</span>` : ''}
            </div>
            <div class="category-type ${cat.tipo}">
              ${isReceita ? '💚 Receita' : '❤️ Despesa'}
            </div>
          </div>
        </div>
        <div class="category-status ${cat.progressStatus}">
          ${cat.progressStatus === 'danger' ? '⚠️' : cat.progressStatus === 'caution' ? '⚡' : '✅'}
        </div>
      </div>
      
      <div class="category-finance">
        ${cat.limite > 0 ? `
          <div class="finance-summary">
            <div class="summary-item">
              <div class="summary-label">Limite</div>
              <div class="summary-value">R$ ${cat.limite.toFixed(2)}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">${isReceita ? 'Receita' : 'Gasto'}</div>
              <div class="summary-value ${cat.totalGasto > cat.limite ? 'negative' : 'positive'}">
                R$ ${cat.totalGasto.toFixed(2)}
              </div>
            </div>
            <div class="summary-item">
              <div class="summary-label">${isReceita ? 'Falta' : 'Saldo'}</div>
              <div class="summary-value ${cat.saldo < 0 ? 'negative' : cat.saldo < cat.limite * 0.25 ? 'warning' : 'positive'}">
                R$ ${cat.saldo.toFixed(2)}
              </div>
            </div>
          </div>
          
          ${cat.totalGasto > 0 ? `
            <div class="transaction-breakdown">
              <div class="breakdown-item">
                <span class="breakdown-icon">📊</span>
                <span class="breakdown-label">Transações:</span>
                <span class="breakdown-value">R$ ${cat.totalGastoTransacoes.toFixed(2)}</span>
              </div>
              ${cat.totalGastoRecorrentes > 0 ? `
                <div class="breakdown-item">
                  <span class="breakdown-icon">🔄</span>
                  <span class="breakdown-label">Recorrentes:</span>
                  <span class="breakdown-value">R$ ${cat.totalGastoRecorrentes.toFixed(2)}</span>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <div class="progress-container">
            <div class="progress-header">
              <span class="progress-label">Progresso</span>
              <span class="progress-percentage">${cat.percentualUso.toFixed(0)}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill ${cat.progressStatus}" style="width: ${progressWidth}%"></div>
            </div>
            <div class="progress-status-text">
              ${cat.progressStatus === 'danger' ? 'Limite excedido' : 
                cat.progressStatus === 'caution' ? 'Atenção' : 'No controle'}
            </div>
          </div>
        ` : `
          <div class="finance-summary">
            <div class="summary-item">
              <div class="summary-label">${isReceita ? 'Receita' : 'Gasto'} do mês</div>
              <div class="summary-value ${isReceita ? 'positive' : ''}">
                R$ ${cat.totalGasto.toFixed(2)}
              </div>
            </div>
          </div>
          
          ${cat.totalGasto > 0 ? `
            <div class="transaction-breakdown">
              <div class="breakdown-item">
                <span class="breakdown-icon">📊</span>
                <span class="breakdown-label">${isReceita ? 'Receitas' : 'Transações'}:</span>
                <span class="breakdown-value">R$ ${cat.totalGastoTransacoes.toFixed(2)}</span>
              </div>
              ${cat.totalGastoRecorrentes > 0 ? `
                <div class="breakdown-item">
                  <span class="breakdown-icon">🔄</span>
                  <span class="breakdown-label">Recorrentes:</span>
                  <span class="breakdown-value">R$ ${cat.totalGastoRecorrentes.toFixed(2)}</span>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <div class="no-limit-notice">
            <span class="notice-icon">ℹ️</span>
            <span class="notice-text">Sem limite definido</span>
          </div>
        `}
      </div>
      
      <div class="category-actions">
        <button onclick="editCategory('${cat.id}')" class="action-btn edit" title="Editar categoria">
          ✏️
        </button>
        <button onclick="showCategoryHistory('${cat.id}')" class="action-btn history" title="Ver histórico">
          📊
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${cat.id}', '${cat.nome.replace(/'/g, "\\'")}')" class="action-btn delete" title="Excluir categoria">
          🗑️
        </button>
      </div>
    </div>
  `;
}

// Configurar pesquisa de categorias
function setupCategoriesSearch() {
  const searchInput = document.getElementById('category-search');
  const searchResults = document.getElementById('search-results');
  const searchCount = document.getElementById('search-count');
  const categoriesGrid = document.getElementById('categories-grid');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const categoryCards = document.querySelectorAll('.category-card');
    let visibleCount = 0;
    
    categoryCards.forEach(card => {
      const categoryName = card.querySelector('.category-name').textContent.toLowerCase();
      const categoryType = card.querySelector('.category-type').textContent.toLowerCase();
      
      if (categoryName.includes(searchTerm) || categoryType.includes(searchTerm)) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Mostrar/ocultar contador de resultados
    if (searchTerm.length > 0) {
      searchResults.style.display = 'inline';
      searchCount.textContent = visibleCount;
    } else {
      searchResults.style.display = 'none';
    }
  });
}

// Configurar botões das categorias
function setupCategoriesButtons() {
  // Botão de adicionar categoria
  const addBtn = document.querySelector('.btn-category.primary');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (window.showAddCategoryModal) {
        window.showAddCategoryModal();
      }
    });
  }
  
  // Botão de migrar
  const migrateBtn = document.querySelector('.btn-category.secondary');
  if (migrateBtn) {
    migrateBtn.addEventListener('click', () => {
      if (window.migrarTransacoesAntigas) {
        window.migrarTransacoesAntigas();
      }
    });
  }
  
  // Botão de corrigir
  const fixBtn = document.querySelectorAll('.btn-category.secondary')[1];
  if (fixBtn) {
    fixBtn.addEventListener('click', () => {
      if (window.corrigirTipoCategoria) {
        window.corrigirTipoCategoria();
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
export { renderCleanCategories };
