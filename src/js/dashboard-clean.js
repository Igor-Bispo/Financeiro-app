// Dashboard Limpo e Organizado
// Versão simplificada com menos caixas e melhor organização

// Função para aplicar o tema atual
function applyCurrentTheme() {
  const themeColor = localStorage.getItem('themeColor') || 'blue';
  const root = document.documentElement;
  
  // Aplicar o atributo data-theme-color
  root.setAttribute('data-theme-color', themeColor);
  
  // Aplicar cores CSS customizadas
  const colors = {
    blue: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
    green: { primary: '#10B981', secondary: '#059669', accent: '#D1FAE5' },
    purple: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#EDE9FE' },
    orange: { primary: '#F59E0B', secondary: '#D97706', accent: '#FEF3C7' }
  };
  
  if (colors[themeColor]) {
    root.style.setProperty('--primary-color', colors[themeColor].primary);
    root.style.setProperty('--secondary-color', colors[themeColor].secondary);
    root.style.setProperty('--accent-color', colors[themeColor].accent);
  }
  
  console.log('🎨 Tema aplicado no dashboard:', themeColor);
}

// Função para renderizar dashboard simplificado
export async function renderCleanDashboard(selectedYear, selectedMonth) {
  // Evitar múltiplas chamadas simultâneas
  if (window.isRenderingDashboard) {
    console.log('🔄 Dashboard já está sendo renderizado, pulando...');
    return;
  }
  
  window.isRenderingDashboard = true;
  
  // Aplicar tema atual
  applyCurrentTheme();
  
  // Verificar se o usuário está autenticado
  if (!window.appState?.currentUser) {
    console.warn('⚠️ Usuário não autenticado, renderizando dashboard vazio');
    window.isRenderingDashboard = false;
    return;
  }
  
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
    
    // Atualizar estado global
    window.currentYear = year;
    window.currentMonth = month;
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Buscar dados necessários
    const user = window.appState.currentUser;
    const budget = window.appState.currentBudget;
    
    console.log('🔍 Dashboard Debug:', {
      user: user ? user.email : 'null',
      budget: budget ? budget.nome : 'null',
      budgetId: budget ? budget.id : 'null',
      categoriesCount: window.appState.categories?.length || 0,
      transactionsCount: window.appState.transactions?.length || 0
    });
    
    if (!budget) {
      console.warn('⚠️ Nenhum orçamento selecionado no dashboard');
      // Renderizar dashboard vazio com mensagem
      content.innerHTML = `
        <div class="dashboard-clean">
          <div class="text-center py-12">
            <div class="text-6xl mb-4">💰</div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Nenhum orçamento selecionado</h2>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Vá para Configurações para criar ou selecionar um orçamento</p>
            <button onclick="window.renderSettings && window.renderSettings()" class="btn-primary px-6 py-3 rounded-xl">
              Configurações
            </button>
          </div>
        </div>
      `;
      window.isRenderingDashboard = false;
      return;
    }
    
    let transacoes = user ? await getTransacoesDoMes(user.uid, year, month) : [];
    
    // Para o mês atual, garantir que temos as transações mais recentes
    if (year === now.getFullYear() && month === now.getMonth() + 1) {
      if (window.appState.transactions && window.appState.transactions.length > 0) {
        transacoes = window.appState.transactions;
      }
    }
    
    console.log('📊 Transações carregadas:', transacoes.length);

    // Buscar recorrentes
    const recorrentes = window.appState.recorrentes || [];
    

    
    // Importar função de cálculo de parcelas
    const { calcularStatusRecorrente } = await import('./recorrentes.js');
    
    // Função auxiliar para verificar se uma recorrente deve ser aplicada em um determinado mês
    function deveSerAplicadaNesteMes(rec, ano, mes) {
      // Se não tem data de início, aplicar sempre
      if (!rec.dataInicio) {
        return true;
      }

      try {
        const [anoInicio, mesInicio, diaInicio] = rec.dataInicio.split('-').map(Number);
        const dataInicio = new Date(anoInicio, mesInicio - 1, diaInicio);

        // Se o mês atual é anterior ao mês de início, não aplicar
        if (ano < anoInicio || (ano === anoInicio && mes < mesInicio)) {
          return false;
        }

        // Se é o mesmo mês, verificar se já passou do dia de início
        if (ano === anoInicio && mes === mesInicio) {
          const hoje = new Date();
          const diaAtual = hoje.getDate();
          if (diaAtual < diaInicio) {
            return false;
          }
        }

        // Se tem parcelas limitadas, verificar se ainda deve aplicar
        if (rec.parcelasTotal && rec.parcelasTotal > 0) {
          // Calcular meses desde o início
          let mesesDesdeInicio = (ano - anoInicio) * 12 + (mes - mesInicio);
          
          // Ajuste: se não for para efetivar no mês atual e já passou do mês de início, desconta 1
          if (!rec.efetivarMesAtual && (ano > anoInicio || (ano === anoInicio && mes > mesInicio))) {
            mesesDesdeInicio -= 1;
          }
          
          const parcelasJaAplicadas = rec.parcelasTotal - (rec.parcelasRestantes || rec.parcelasTotal);
          const parcelasRestantesExibidas = (rec.parcelasRestantes || rec.parcelasTotal) - mesesDesdeInicio;

          // Se não tem mais parcelas restantes para este período, não aplicar
          if (parcelasRestantesExibidas <= 0) {
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error('Erro ao verificar se deve aplicar neste mês:', error);
        return true; // Em caso de erro, aplicar para não perder
      }
    }
    
    // Determinar se é mês futuro
    const isMesFuturo = (year > now.getFullYear()) || 
                       (year === now.getFullYear() && month > now.getMonth() + 1);
    

    
    // Recorrentes agendadas para o mês selecionado (lista completa para cálculos)
    const recorrentesAgendadasCompletas = recorrentes.filter(rec => {
      if (!rec.ativa) return false;
      
      // Para meses futuros, verificar se ainda deve aplicar
      if (isMesFuturo) {
        // Verificar se tem data de início e se o mês futuro é após a data de início
        if (rec.dataInicio) {
          const [anoInicio, mesInicio] = rec.dataInicio.split('-').map(Number);
          if (year < anoInicio || (year === anoInicio && month < mesInicio)) {
            console.log('🔍 Debug - Recorrente rejeitada: mês futuro anterior à data de início', rec.descricao);
            return false; // Mês futuro é anterior à data de início
          }
        }
        
        // Verificar parcelas se aplicável
        if (rec.parcelasTotal && rec.parcelasTotal > 0) {
          if (rec.dataInicio) {
            const [anoInicio, mesInicio] = rec.dataInicio.split('-').map(Number);
            const mesesDesdeInicio = (year - anoInicio) * 12 + (month - mesInicio);
            const parcelasRestantes = rec.parcelasRestantes || rec.parcelasTotal;
            
            console.log('🔍 Debug - Verificando parcelas:', {
              recorrente: rec.descricao,
              dataInicio: rec.dataInicio,
              parcelasTotal: rec.parcelasTotal,
              parcelasRestantes: parcelasRestantes,
              mesesDesdeInicio: mesesDesdeInicio,
              mesAtual: month + '/' + year
            });
            
            if (mesesDesdeInicio >= parcelasRestantes) {
              console.log('🔍 Debug - Recorrente rejeitada: todas as parcelas já foram aplicadas', rec.descricao);
              return false; // Já foram aplicadas todas as parcelas
            }
          }
        }
        
        console.log('🔍 Debug - Recorrente incluída para mês futuro:', rec.descricao);
        return true; // Incluir para meses futuros
      }
      
      // Para mês atual, usar lógica original
      const deveAplicar = deveSerAplicadaNesteMes(rec, year, month);
      if (!deveAplicar) return false;
      
      // Verificar se NÃO foi efetivada ainda
      const jaEfetivadaEsteMes = transacoes.some(t => {
        if (!t.recorrenteId || t.recorrenteId !== rec.id) return false;
        
        let transacaoData;
        if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
          transacaoData = new Date(t.createdAt.seconds * 1000);
        } else if (t.createdAt) {
          transacaoData = new Date(t.createdAt);
        } else {
          return false;
        }
        
        return transacaoData.getFullYear() === year && 
               transacaoData.getMonth() + 1 === month;
      });
      
      return !jaEfetivadaEsteMes;
    });
    

    

    
    // Calcular valor das recorrentes agendadas (usando lista completa)
    const valorRecorrentesAgendadas = recorrentesAgendadasCompletas
      .filter(rec => {
        // Se tem tipo definido, usar o tipo
        if (rec.tipo) {
          return rec.tipo === 'despesa';
        }
        // Se não tem tipo, verificar pela categoria
        if (rec.categoriaId) {
          const categoria = window.appState.categories?.find(cat => cat.id === rec.categoriaId);
          return categoria && categoria.tipo === 'despesa';
        }
        // Se não tem nem tipo nem categoria, assumir como despesa (valor negativo)
        return parseFloat(rec.valor || 0) < 0;
      })
      .reduce((sum, rec) => sum + parseFloat(rec.valor || 0), 0);
    
    const valorRecorrentesAgendadasReceitas = recorrentesAgendadasCompletas
      .filter(rec => {
        // Se tem tipo definido, usar o tipo
        if (rec.tipo) {
          return rec.tipo === 'receita';
        }
        // Se não tem tipo, verificar pela categoria
        if (rec.categoriaId) {
          const categoria = window.appState.categories?.find(cat => cat.id === rec.categoriaId);
          return categoria && categoria.tipo === 'receita';
        }
        // Se não tem nem tipo nem categoria, assumir como receita (valor positivo)
        return parseFloat(rec.valor || 0) > 0;
      })
      .reduce((sum, rec) => sum + parseFloat(rec.valor || 0), 0);
    

    


    // Calcular totais incluindo recorrentes agendadas
    const receitasTransacoes = transacoes
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
    const despesasTransacoes = transacoes
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
    
    const receitas = receitasTransacoes + valorRecorrentesAgendadasReceitas;
    const despesas = despesasTransacoes + valorRecorrentesAgendadas;
    const saldo = receitas - despesas;
    


    // Calcular orçamento total incluindo recorrentes agendadas
    const categoriasDespesa = window.appState.categories?.filter(cat => cat.tipo === 'despesa') || [];
    const totalLimite = categoriasDespesa.reduce((sum, cat) => sum + parseFloat(cat.limite || 0), 0);
    const progressoOrcado = totalLimite > 0 ? despesas / totalLimite : 0;
    
    // Determinar cor do card de orçamento baseado no percentual
    let orcamentoStatus = 'normal';
    let orcamentoIcon = '📊';
    if (progressoOrcado >= 1.0) {
      orcamentoStatus = 'danger';
      orcamentoIcon = '🚨';
    } else if (progressoOrcado >= 0.9) {
      orcamentoStatus = 'warning';
      orcamentoIcon = '⚠️';
    } else if (progressoOrcado >= 0.7) {
      orcamentoStatus = 'caution';
      orcamentoIcon = '🟡';
    } else {
      orcamentoStatus = 'safe';
      orcamentoIcon = '✅';
    }

    // Recorrentes agendadas para o mês selecionado (versão limitada para exibição)
    const recorrentesAgendadas = recorrentesAgendadasCompletas.map(rec => {
      // Adicionar informações de parcela para o mês selecionado
      const status = calcularStatusRecorrente(rec, transacoes, year, month);
      return { ...rec, status };
    }).slice(0, 3);

    // Criar lista combinada de transações (reais + recorrentes agendadas para meses futuros)
    let transacoesCombinadas = [...transacoes];
    
    // Para meses futuros, adicionar recorrentes agendadas como "transações simuladas"
    if (isMesFuturo && recorrentesAgendadasCompletas.length > 0) {
      const recorrentesComoTransacoes = recorrentesAgendadasCompletas.map(rec => ({
        id: `rec_${rec.id}`,
        descricao: rec.descricao,
        valor: rec.valor,
        tipo: rec.tipo,
        categoriaId: rec.categoriaId,
        recorrenteId: rec.id,
        recorrenteNome: rec.descricao,
        createdAt: new Date(year, month - 1, 1), // Primeiro dia do mês
        isRecorrenteSimulada: true // Flag para identificar que é uma transação simulada
      }));
      
      transacoesCombinadas = [...transacoesCombinadas, ...recorrentesComoTransacoes];
    }

    // Top 3 categorias com mais gastos (incluindo recorrentes agendadas para meses futuros)
    const topCategorias = window.appState.categories
      .filter(cat => cat.tipo === 'despesa')
      .map(cat => {
        const transacoesCategoria = transacoesCombinadas.filter(t => 
          t.categoriaId === cat.id && t.tipo === cat.tipo
        );
        const gasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
        return { ...cat, gasto };
      })
      .filter(cat => cat.gasto > 0)
      .sort((a, b) => b.gasto - a.gasto)
      .slice(0, 3);
    
    // Últimas 5 transações (incluindo recorrentes simuladas para meses futuros)
    const ultimasTransacoes = transacoesCombinadas
      .sort((a, b) => {
        const dateA = a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt);
        const dateB = b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt);
        return dateB - dateA;
      })
      .slice(0, 5);
    
    // Recorrentes efetivadas no mês selecionado
    const recorrentesEfetivadas = recorrentes.filter(rec => {
      if (!rec.ativa) return false;
      
      // Verificar se foi efetivada no mês selecionado
      return transacoes.some(t => {
        if (!t.recorrenteId || t.recorrenteId !== rec.id) return false;
        
        let transacaoData;
        if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
          transacaoData = new Date(t.createdAt.seconds * 1000);
        } else if (t.createdAt) {
          transacaoData = new Date(t.createdAt);
        } else {
          return false;
        }
        
        return transacaoData.getFullYear() === year && 
               transacaoData.getMonth() + 1 === month;
      });
    }).map(rec => {
      // Adicionar informações de parcela
      const status = calcularStatusRecorrente(rec, transacoes, year, month);
      return { ...rec, status };
    }).slice(0, 3);

    // HTML do dashboard ultra-compacto sem caixas desnecessárias
    const dashboardHTML = `
      <div class="dashboard-clean">
        <!-- Header Minimalista -->
        <div class="dashboard-header">
          <div class="month-selector">
            <button id="mes-anterior" class="month-btn">‹</button>
            <h1 class="month-title">${meses[month - 1]} ${year}</h1>
            <button id="mes-proximo" class="month-btn">›</button>
          </div>
          <button id="theme-toggle-btn" class="theme-btn">
            <span id="theme-icon">🎨</span>
          </button>
        </div>
        
        <!-- Cards de Resumo -->
        <div class="summary-cards">
          <div class="summary-card income">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
                <path d="M3 10h18" stroke="white" stroke-width="2"/>
                <!-- Fundo quadriculado -->
                <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
                <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
                <!-- Gráfico de linha crescente -->
                <path d="M6 16l2-2 2-1 2-3 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-title">Receitas</div>
              <div class="card-value">R$ ${receitas.toFixed(0)}</div>
              ${valorRecorrentesAgendadasReceitas > 0 ? `<div class="card-subtitle">+ R$ ${valorRecorrentesAgendadasReceitas.toFixed(0)} agendadas</div>` : ''}
            </div>
          </div>
          
          <div class="summary-card expense">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
                <path d="M3 10h18" stroke="white" stroke-width="2"/>
                <!-- Fundo quadriculado -->
                <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
                <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
                <!-- Gráfico de linha decrescente -->
                <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-title">Despesas</div>
              <div class="card-value">R$ ${despesas.toFixed(0)}</div>
              ${valorRecorrentesAgendadas > 0 ? `<div class="card-subtitle">+ R$ ${valorRecorrentesAgendadas.toFixed(0)} agendadas</div>` : ''}
            </div>
          </div>
          
          <div class="summary-card balance ${saldo >= 0 ? 'positive' : 'negative'}">
            <div class="card-icon">${saldo >= 0 ? '✅' : '⚠️'}</div>
            <div class="card-content">
              <div class="card-title">Saldo</div>
              <div class="card-value">R$ ${saldo.toFixed(0)}</div>
              ${(valorRecorrentesAgendadas > 0 || valorRecorrentesAgendadasReceitas > 0) ? `<div class="card-subtitle">incluindo agendadas</div>` : ''}
            </div>
          </div>
          
          <div class="summary-card budget ${orcamentoStatus}">
            <div class="card-icon">${orcamentoIcon}</div>
            <div class="card-content">
              <div class="card-title">Orçado</div>
              <div class="card-value">R$ ${totalLimite.toFixed(0)}</div>
              <div class="card-subtitle">${(progressoOrcado * 100).toFixed(0)}% usado</div>
            </div>
          </div>
        </div>
        
        <!-- Seções de Conteúdo -->
        <div class="dashboard-sections">
          <!-- Top Gastos -->
          ${topCategorias.length > 0 ? `
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">📊 Top Gastos</h3>
              <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="add-btn">+</button>
            </div>
            <div class="section-content">
              ${topCategorias.map(cat => {
                const limite = parseFloat(cat.limite || 0);
                const porcentagem = limite > 0 ? Math.min((cat.gasto / limite) * 100, 100) : 0;
                let progressClass = 'progress-normal';
                if (porcentagem >= 90) progressClass = 'progress-danger';
                else if (porcentagem >= 75) progressClass = 'progress-warning';
                else if (porcentagem >= 50) progressClass = 'progress-caution';
                
                return `
                  <div class="category-item">
                    <div class="category-info">
                      <div class="category-color" style="background-color: ${cat.cor || 'var(--primary-color)'}"></div>
                      <div class="category-details">
                        <div class="category-name">${cat.nome}</div>
                        <div class="category-value">R$ ${cat.gasto.toFixed(0)}</div>
                      </div>
                    </div>
                    ${limite > 0 ? `
                      <div class="progress-bar">
                        <div class="progress-fill ${progressClass}" style="width: ${porcentagem}%"></div>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          ` : ''}
          
          <!-- Transações Recentes -->
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">📝 Recentes</h3>
              <button onclick="showAddTransactionModal()" class="add-btn">+</button>
            </div>
            <div class="section-content">
              ${ultimasTransacoes.length > 0 ? ultimasTransacoes.slice(0, 3).map(t => {
                const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
                const data = t.createdAt?.seconds ? new Date(t.createdAt.seconds * 1000) : new Date(t.createdAt);
                const isRecorrenteSimulada = t.isRecorrenteSimulada;
                
                return `
                  <div class="transaction-item ${isRecorrenteSimulada ? 'scheduled' : ''}">
                    <div class="transaction-info">
                      <div class="transaction-title">
                        ${t.descricao}
                        ${isRecorrenteSimulada ? ' <span class="recorrente-badge">🔄</span>' : ''}
                      </div>
                      <div class="transaction-meta">
                        ${isRecorrenteSimulada ? 'Agendada' : data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                        ${categoria ? ` • ${categoria.nome}` : ''}
                      </div>
                    </div>
                    <div class="transaction-actions">
                      <div class="transaction-value ${t.tipo === 'receita' ? 'positive' : 'negative'}">
                        ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(0)}
                      </div>
                      ${!isRecorrenteSimulada ? `
                        <div class="action-buttons">
                          <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="action-btn edit">✏️</button>
                          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="action-btn delete">🗑️</button>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('') : `
                <div class="empty-state">
                  <div class="empty-icon">📝</div>
                  <div class="empty-text">Nenhuma transação</div>
                  <button onclick="showAddTransactionModal()" class="empty-btn">Adicionar</button>
                </div>
              `}
            </div>
          </div>
          
          <!-- Recorrentes Efetivadas -->
          ${recorrentesEfetivadas.length > 0 ? `
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">🔄 Efetivadas</h3>
              <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="add-btn">+</button>
            </div>
            <div class="section-content">
              ${recorrentesEfetivadas.map(rec => {
                const categoria = window.appState.categories?.find(c => c.id === rec.categoriaId);
                return `
                <div class="transaction-item">
                  <div class="transaction-info">
                    <div class="transaction-title">${rec.descricao}</div>
                    <div class="transaction-meta">
                      ${categoria ? categoria.nome : 'Sem categoria'}
                      ${rec.status && rec.status.parcelaAtual ? ` • Parcela ${rec.status.parcelaAtual}/${rec.status.totalParcelas || '∞'}` : ''}
                    </div>
                  </div>
                  <div class="transaction-value ${rec.tipo === 'receita' ? 'positive' : 'negative'}">
                    ${rec.tipo === 'receita' ? '+' : '-'}R$ ${Math.abs(rec.valor).toFixed(0)}
                  </div>
                </div>
              `;
              }).join('')}
            </div>
          </div>
          ` : ''}
          
          <!-- Recorrentes Agendadas/Futuras -->
          ${recorrentesAgendadas.length > 0 ? `
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">${isMesFuturo ? '🔄 Efetivadas' : '⏰ Agendadas'}</h3>
              <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="add-btn">+</button>
            </div>
            <div class="section-content">
              ${recorrentesAgendadas.map(rec => {
                const categoria = window.appState.categories?.find(c => c.id === rec.categoriaId);
                return `
                <div class="transaction-item ${isMesFuturo ? '' : 'scheduled'}">
                  <div class="transaction-info">
                    <div class="transaction-title">${rec.descricao}</div>
                    <div class="transaction-meta">
                      ${categoria ? categoria.nome : (isMesFuturo ? 'Sem categoria' : 'Próximo mês')}
                      ${rec.status && rec.status.proximaParcela ? ` • Parcela ${rec.status.proximaParcela}/${rec.status.totalParcelas || '∞'}` : ''}
                    </div>
                  </div>
                  <div class="transaction-value ${rec.tipo === 'receita' ? 'positive' : 'negative'}">
                    ${rec.tipo === 'receita' ? '+' : '-'}R$ ${Math.abs(rec.valor).toFixed(0)}
                  </div>
                </div>
              `;
              }).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    `;

    // Renderizar HTML
    content.innerHTML = dashboardHTML;

    // Configurar botões
    setTimeout(() => {
      setupDashboardButtons();
    }, 100);

    console.log(`✅ Dashboard limpo renderizado: ${transacoes.length} transações, ${topCategorias.length} categorias principais`);

  } catch (err) {
    console.error('❌ Erro ao renderizar dashboard limpo:', err);
    const content = document.getElementById('app-content');
    if (content) {
      content.innerHTML = '<div class="text-red-600 text-center mt-8 p-4">Erro ao carregar dashboard. Tente novamente.</div>';
    }
  } finally {
    window.isRenderingDashboard = false;
  }
}

// Função para inicializar relógio digital
function initDigitalClock() {
  const clockElement = document.getElementById('digital-clock');
  if (!clockElement) return;
  
  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    clockElement.textContent = timeString;
  }
  
  updateClock();
  setInterval(updateClock, 60000); // Atualizar a cada minuto
}

// Função auxiliar para buscar transações (reutilizada do app.js)
async function getTransacoesDoMes(userId, ano, mes) {
  try {
    const budget = window.appState.currentBudget;
    if (!budget) return [];

    const { query, collection, where, getDocs } = await import('firebase/firestore');
    const { db } = await import('./firebase.js');
    
    const q = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budget.id)
    );
    
    const querySnapshot = await getDocs(q);
    const allTransactions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Filtrar por mês/ano
    const transacoesFiltradas = allTransactions.filter(t => {
      if (!t.createdAt) return false;
      
      let transacaoData;
      if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
        transacaoData = new Date(t.createdAt.seconds * 1000);
      } else {
        transacaoData = new Date(t.createdAt);
      }

      const transacaoAno = transacaoData.getFullYear();
      const transacaoMes = transacaoData.getMonth() + 1;
      
      return transacaoAno === ano && transacaoMes === mes;
    });
    
    return transacoesFiltradas;
  } catch (error) {
    console.error('❌ Erro ao buscar transações do mês:', error);
    return [];
  }
}

// Função para configurar botões do dashboard
function setupDashboardButtons() {
  // Botão mês anterior
  const btnAnterior = document.getElementById('mes-anterior');
  if (btnAnterior) {
    btnAnterior.onclick = () => {
      // Usar o estado atual ou data atual como fallback
      const currentYear = window.currentYear || new Date().getFullYear();
      const currentMonth = window.currentMonth || (new Date().getMonth() + 1);
      
      let newMonth = currentMonth - 1;
      let newYear = currentYear;
      
      if (newMonth < 1) {
        newMonth = 12;
        newYear--;
      }
      
      // Atualizar estado global
      window.currentYear = newYear;
      window.currentMonth = newMonth;
      
      renderCleanDashboard(newYear, newMonth);
    };
  }
  
  // Botão mês próximo
  const btnProximo = document.getElementById('mes-proximo');
  if (btnProximo) {
    btnProximo.onclick = () => {
      // Usar o estado atual ou data atual como fallback
      const currentYear = window.currentYear || new Date().getFullYear();
      const currentMonth = window.currentMonth || (new Date().getMonth() + 1);
      
      let newMonth = currentMonth + 1;
      let newYear = currentYear;
      
      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }
      
      // Atualizar estado global
      window.currentYear = newYear;
      window.currentMonth = newMonth;
      
      renderCleanDashboard(newYear, newMonth);
    };
  }
  
  // Botão de tema
  const btnTema = document.getElementById('theme-toggle-btn');
  if (btnTema && window.setupThemeToggle) {
    window.setupThemeToggle('theme-toggle-btn');
    // Atualizar ícone inicial
    updateThemeIcon();
  }
  
  // Função para atualizar ícone do tema
  function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      const isDark = document.documentElement.classList.contains('dark');
      themeIcon.textContent = isDark ? '🌙' : '☀️';
    }
  }
}

// Exportar funções
window.renderCleanDashboard = renderCleanDashboard;