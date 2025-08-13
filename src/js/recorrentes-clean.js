/**
 * Recorrentes Clean - Versão melhorada da aba de recorrentes
 * 
 * Este módulo fornece uma interface melhorada para gerenciar
 * despesas recorrentes seguindo o padrão visual do dashboard.
 */

/**
 * Renderiza a página de recorrentes melhorada
 */
export async function renderCleanRecorrentes() {
  console.log('🔄 Renderizando recorrentes melhoradas...');
  
  // Aplicar tema
  applyThemeToRecorrentes();
  
  // Obter dados do orçamento atual
  const currentBudget = window.appState?.currentBudget;
  if (!currentBudget) {
    return renderEmptyState('Nenhum orçamento selecionado');
  }
  
  // Criar container principal
  const container = document.createElement('div');
  container.className = 'recorrentes-clean';
  
  // Adicionar header
  container.innerHTML = `
    <div class="recorrentes-header">
      <div class="recorrentes-title">
        🔄 Despesas Recorrentes
      </div>
      <div class="recorrentes-actions">
        <button class="btn-recorrentes secondary" onclick="window.verificarRecorrentes()" title="Verificar Recorrentes">
          🔍
        </button>
        <button class="btn-recorrentes primary" onclick="window.aplicarRecorrentes()" title="Aplicar Recorrentes">
          ✅
        </button>
        <button class="btn-recorrentes primary" onclick="window.showAddRecorrenteModal()" title="Nova Recorrente">
          ➕
        </button>
      </div>
    </div>
  `;
  
  // Adicionar loader
  const loader = createLoader();
  container.appendChild(loader);
  
  try {
    // Obter dados
    const data = await getRecorrentesData(currentBudget.id);
    
    // Remover loader
    container.removeChild(loader);
    
    // Renderizar conteúdo
    container.appendChild(renderRecorrentesSections(data));
    
  } catch (error) {
    console.error('❌ Erro ao carregar recorrentes:', error);
    container.removeChild(loader);
    container.appendChild(renderErrorState(error.message));
  }
  
  return container;
}

/**
 * Aplica tema às recorrentes
 */
function applyThemeToRecorrentes() {
  const themeColor = localStorage.getItem('themeColor') || 'blue';
  const root = document.documentElement;
  root.setAttribute('data-theme-color', themeColor);
  console.log('🎨 Tema aplicado nas recorrentes:', themeColor);
}

/**
 * Obtém dados das recorrentes
 */
async function getRecorrentesData(budgetId) {
  const user = window.appState?.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }
  
  const recorrentes = window.appState.recorrentes || [];
  const transacoes = window.appState.transactions || [];
  const categorias = window.appState.categories || [];
  
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;
  
  // Filtrar recorrentes que já foram lançadas no mês atual
  const recorrentesLancadas = transacoes
    .filter(t => {
      if (!t.recorrenteId) return false;
      
      let transacaoData;
      if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
        transacaoData = new Date(t.createdAt.seconds * 1000);
      } else if (t.createdAt) {
        transacaoData = new Date(t.createdAt);
      } else {
        return false;
      }
      
      return transacaoData.getFullYear() === anoAtual && 
             transacaoData.getMonth() + 1 === mesAtual;
    })
    .map(t => t.recorrenteId);
  
  // Processar cada recorrente
  const recorrentesProcessadas = recorrentes.map(rec => {
    const jaLancadaEsteMes = recorrentesLancadas.includes(rec.id);
    const categoria = categorias.find(c => c.id === rec.categoriaId);
    
    // Calcular status completo da recorrente
    const status = window.calcularStatusRecorrente ? 
      window.calcularStatusRecorrente(rec, transacoes, anoAtual, mesAtual) : 
      { parcelaAtual: null, totalParcelas: rec.parcelasTotal, foiEfetivadaEsteMes: jaLancadaEsteMes };
    
    const valorParcela = parseFloat(rec.valor);
    const valorTotal = rec.valorTotal
      ? parseFloat(rec.valorTotal)
      : status.totalParcelas && status.totalParcelas > 1
        ? valorParcela * status.totalParcelas
        : valorParcela;
    
    // Calcular próxima data
    const proximaData = calcularProximaData(rec.dataInicio, rec.diaLancamento || 1);
    
    return {
      ...rec,
      categoria,
      status,
      valorParcela,
      valorTotal,
      proximaData,
      jaLancadaEsteMes
    };
  });
  
  // Separar por status
  const efetivadas = recorrentesProcessadas.filter(r => r.jaLancadaEsteMes);
  const agendadas = recorrentesProcessadas.filter(r => !r.jaLancadaEsteMes && r.ativa !== false);
  const pausadas = recorrentesProcessadas.filter(r => r.ativa === false);
  
  return {
    efetivadas,
    agendadas,
    pausadas,
    total: recorrentesProcessadas.length,
    stats: {
      totalValor: recorrentesProcessadas.reduce((sum, r) => sum + r.valorParcela, 0),
      totalEfetivadas: efetivadas.length,
      totalAgendadas: agendadas.length,
      totalPausadas: pausadas.length
    }
  };
}

/**
 * Calcula próxima data de aplicação
 */
function calcularProximaData(dataISO, diaLancamento) {
  try {
    const hoje = new Date();
    const base = new Date(dataISO);
    const ano = hoje.getMonth() > base.getMonth() ? hoje.getFullYear() : base.getFullYear();
    const mes = hoje.getMonth() + (diaLancamento <= hoje.getDate() ? 1 : 0);
    const data = new Date(ano, mes, diaLancamento);
    return data;
  } catch {
    return new Date();
  }
}

/**
 * Renderiza seções de recorrentes
 */
function renderRecorrentesSections(data) {
  const { efetivadas, agendadas, pausadas, stats } = data;
  
  const sections = document.createElement('div');
  sections.className = 'recorrentes-sections';
  
  // Seção de Recorrentes Agendadas
  if (agendadas.length > 0) {
    sections.appendChild(renderRecorrentesSection('Agendadas', agendadas, 'agendada'));
  }
  
  // Seção de Recorrentes Efetivadas
  if (efetivadas.length > 0) {
    sections.appendChild(renderRecorrentesSection('Efetivadas', efetivadas, 'efetivada'));
  }
  
  // Seção de Recorrentes Pausadas
  if (pausadas.length > 0) {
    sections.appendChild(renderRecorrentesSection('Pausadas', pausadas, 'pausada'));
  }
  
  // Estado vazio se não há recorrentes
  if (data.total === 0) {
    sections.appendChild(renderEmptyState('Nenhuma despesa recorrente cadastrada'));
  }
  
  return sections;
}

/**
 * Renderiza uma seção de recorrentes
 */
function renderRecorrentesSection(title, recorrentes, type) {
  const section = document.createElement('div');
  section.className = 'recorrentes-section';
  
  const icon = type === 'agendada' ? '📅' : type === 'efetivada' ? '✅' : '⏸️';
  const color = type === 'agendada' ? 'primary' : type === 'efetivada' ? 'success' : 'warning';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">${icon}</div>
        ${title} (${recorrentes.length})
      </div>
      <button class="add-btn" onclick="window.showAddRecorrenteModal()">+</button>
    </div>
    <div class="section-content">
      ${recorrentes.map(rec => renderRecorrenteCard(rec, type)).join('')}
    </div>
  `;
  
  return section;
}

/**
 * Renderiza um card de recorrente
 */
function renderRecorrenteCard(rec, type) {
  const { status, categoria, valorParcela, valorTotal, proximaData, jaLancadaEsteMes } = rec;
  
  // Gerar texto de status da parcela
  let statusText = '';
  let statusClass = '';
  
  if (status.temParcelas) {
    if (status.foiEfetivadaEsteMes) {
      statusText = `✅ Efetivada: ${status.parcelaAtual} de ${status.totalParcelas}`;
      statusClass = 'efetivada';
    } else if (status.proximaParcela && status.proximaParcela <= status.totalParcelas) {
      statusText = `📅 Agendada: ${status.proximaParcela} de ${status.totalParcelas}`;
      statusClass = 'agendada';
    } else {
      statusText = `📊 Parcela ${status.parcelaAtual} de ${status.totalParcelas}`;
      statusClass = 'agendada';
    }
  } else {
    statusText = '♾️ Infinito';
    statusClass = 'infinita';
  }
  
  return `
    <div class="recorrente-card">
      <div class="recorrente-header">
        <div class="recorrente-icon" style="background-color: ${categoria?.cor || '#4F46E5'}">
          ${categoria?.nome?.charAt(0)?.toUpperCase() || 'R'}
        </div>
        <div class="recorrente-info">
          <div class="recorrente-title">${rec.descricao}</div>
          <div class="recorrente-subtitle">
            ${categoria?.nome || 'Sem categoria'}
          </div>
        </div>
      </div>
      
      <div class="recorrente-details">
        <div class="detail-item">
          <span class="detail-label">Valor:</span>
          <span class="detail-value negative">R$ ${valorParcela.toFixed(2)}</span>
        </div>
        ${status.totalParcelas && status.totalParcelas > 1 ? `
          <div class="detail-item">
            <span class="detail-label">Total:</span>
            <span class="detail-value negative">R$ ${valorTotal.toFixed(2)}</span>
          </div>
        ` : ''}
        <div class="detail-item">
          <span class="detail-label">Próxima:</span>
          <span class="detail-value">${proximaData.toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
      
      <div class="recorrente-status ${statusClass}">
        ${statusText}
      </div>
      
      <div class="recorrente-actions">
        <button class="action-btn edit" onclick="window.showAddRecorrenteModal(${JSON.stringify(rec).replace(/"/g, '&quot;')})">
          ✏️ Editar
        </button>
        <button class="action-btn toggle" onclick="window.handleToggleRecorrente(${JSON.stringify(rec).replace(/"/g, '&quot;')})">
          ${rec.ativa === false ? '▶️' : '⏸️'} ${rec.ativa === false ? 'Ativar' : 'Pausar'}
        </button>
        <button class="action-btn history" onclick="window.showHistoricoRecorrente('${rec.id}')">
          📊 Histórico
        </button>
        <button class="action-btn delete" onclick="window.handleDeleteRecorrente('${rec.id}')">
          🗑️ Excluir
        </button>
      </div>
    </div>
  `;
}

/**
 * Cria loader
 */
function createLoader() {
  const loader = document.createElement('div');
  loader.className = 'loading-state';
  loader.innerHTML = `
    <div class="loading-spinner"></div>
    <span>Carregando recorrentes...</span>
  `;
  return loader;
}

/**
 * Renderiza estado vazio
 */
function renderEmptyState(message) {
  const container = document.createElement('div');
  container.className = 'recorrentes-clean';
  container.innerHTML = `
    <div class="recorrentes-header">
      <div class="recorrentes-title">
        🔄 Despesas Recorrentes
      </div>
      <div class="recorrentes-actions">
        <button class="btn-recorrentes primary" onclick="window.showAddRecorrenteModal()">
          ➕ Nova Recorrente
        </button>
      </div>
    </div>
    <div class="empty-state">
      <div class="empty-icon">🔄</div>
      <div class="empty-title">Nenhuma Recorrente</div>
      <div class="empty-description">${message}</div>
      <button class="empty-btn" onclick="window.showAddRecorrenteModal()">
        ➕ Criar Primeira Recorrente
      </button>
    </div>
  `;
  return container;
}

/**
 * Renderiza estado de erro
 */
function renderErrorState(message) {
  const container = document.createElement('div');
  container.className = 'recorrentes-clean';
  container.innerHTML = `
    <div class="recorrentes-header">
      <div class="recorrentes-title">
        🔄 Despesas Recorrentes
      </div>
    </div>
    <div class="empty-state">
      <div class="empty-icon">❌</div>
      <div class="empty-title">Erro ao Carregar</div>
      <div class="empty-description">${message}</div>
      <button class="empty-btn" onclick="window.location.reload()">
        🔄 Tentar Novamente
      </button>
    </div>
  `;
  return container;
}

// Adicionar à janela global
window.renderCleanRecorrentes = renderCleanRecorrentes;
