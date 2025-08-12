export function CardResumo({ titulo, valor, cor = '', icone = '', progresso = null, status = null, alerta = null, receitas = 0, despesas = 0 }) {
  const card = document.createElement('div');
  card.className = 'card-resumo card-standard mobile-optimized';

  // Calcular cor baseada no status financeiro inteligente
  let corFundo, corTexto, corBarra, emojiStatus, bordaEspecial = '';
  
  // Extrair valor numérico para cálculos
  const valorNumerico = parseFloat(valor.replace('R$ ', '').replace('.', '').replace(',', '.'));
  
  switch (cor) {
    case 'card-resumo receita':
      // Verde mais vibrante para receitas altas, verde suave para baixas
      if (valorNumerico >= 5000) {
        corFundo = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        bordaEspecial = '3px solid #34d399';
        emojiStatus = '🚀';
      } else if (valorNumerico >= 2000) {
        corFundo = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        emojiStatus = '📈';
      } else if (valorNumerico > 0) {
        corFundo = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
        emojiStatus = '💰';
      } else {
        corFundo = 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)';
        emojiStatus = '😐';
      }
      corTexto = '#fff';
      corBarra = '#ffffff';
      break;
      
    case 'card-resumo despesa':
      // Sistema de cores baseado no nível de gastos
      if (valorNumerico >= 4000) {
        corFundo = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
        bordaEspecial = '3px solid #f87171';
        emojiStatus = '🔥';
      } else if (valorNumerico >= 2000) {
        corFundo = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        emojiStatus = '⚠️';
      } else if (valorNumerico > 0) {
        corFundo = 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)';
        emojiStatus = '📉';
      } else {
        corFundo = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        emojiStatus = '✨';
      }
      corTexto = '#fff';
      corBarra = '#ffffff';
      break;
      
    case 'card-resumo saldo':
      // Sistema de cores mais detalhado para saldo
      if (valorNumerico >= 5000) {
        corFundo = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        bordaEspecial = '3px solid #34d399';
        emojiStatus = '🎉';
      } else if (valorNumerico >= 1000) {
        corFundo = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        emojiStatus = '✅';
      } else if (valorNumerico >= 0) {
        corFundo = 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)';
        emojiStatus = '😊';
      } else if (valorNumerico >= -1000) {
        corFundo = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        emojiStatus = '😟';
      } else {
        corFundo = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
        bordaEspecial = '3px solid #f87171';
        emojiStatus = '🚨';
      }
      corTexto = '#fff';
      corBarra = '#ffffff';
      break;
      
    case 'card-resumo orcado':
      // Sistema de cores baseado no progresso e situação geral
      const situacaoGeral = receitas - despesas; // Saldo geral
      
      if (progresso !== null) {
        if (progresso <= 0.5 && situacaoGeral >= 0) {
          corFundo = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          emojiStatus = '🎯';
        } else if (progresso <= 0.7) {
          corFundo = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
          emojiStatus = '✅';
        } else if (progresso <= 0.9) {
          corFundo = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
          emojiStatus = '⚠️';
        } else if (progresso <= 1.0) {
          corFundo = 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)';
          emojiStatus = '🔶';
        } else {
          corFundo = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
          bordaEspecial = '3px solid #f87171';
          emojiStatus = '🚨';
        }
      } else {
        corFundo = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
        emojiStatus = '📋';
      }
      corTexto = '#fff';
      corBarra = '#ffffff';
      break;
      
    default:
      corFundo = '#fff';
      corTexto = '#222';
      corBarra = '#3b82f6';
      emojiStatus = '';
  }

  card.style.background = corFundo;
  card.style.color = corTexto;
  
  // Aplicar borda especial se definida
  if (bordaEspecial) {
    card.style.border = bordaEspecial;
    card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15), 0 0 20px rgba(52, 211, 153, 0.3)';
  } else {
    card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
  }

  // Criar barra de progresso se progresso for fornecido
  let barraProgresso = '';
  if (progresso !== null) {
    const percentual = Math.min(Math.max(progresso * 100, 0), 100);
    
    // Cor da barra baseada no progresso
    let corBarraProgresso = corBarra;
    if (percentual >= 90) {
      corBarraProgresso = '#fbbf24'; // Amarelo para alerta
    } else if (percentual >= 100) {
      corBarraProgresso = '#f87171'; // Vermelho para excesso
    }
    
    barraProgresso = `
      <div class="mt-2">
        <div class="flex justify-between text-sm opacity-90 mb-2">
          <span>Progresso</span>
          <span class="font-semibold">${percentual.toFixed(0)}%</span>
        </div>
        <div class="w-full bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
          <div class="h-3 rounded-full transition-all duration-500 ease-out" 
               style="width: ${percentual}%; background-color: ${corBarraProgresso}; box-shadow: 0 0 10px rgba(255,255,255,0.3);"></div>
        </div>
      </div>
    `;
  }

  // Criar indicador de status
  let indicadorStatus = '';
  if (status) {
    indicadorStatus = `
      <div class="text-sm opacity-80">
        ${emojiStatus} ${status}
      </div>
    `;
  }

  // Criar alerta se fornecido
  let alertaHtml = '';
  if (alerta) {
    alertaHtml = `
      <div class="p-2 bg-white bg-opacity-20 rounded-lg text-sm">
        ⚠️ ${alerta}
      </div>
    `;
  }

  card.innerHTML = `
    <div class="flex flex-col h-full relative overflow-hidden">
      <!-- Efeito de brilho sutil -->
      <div class="absolute top-0 left-0 w-full h-1 bg-white bg-opacity-30"></div>
      
      <div class="flex items-center gap-3 md:gap-4 mb-4">
        <div class="icon-bg text-2xl md:text-3xl opacity-90 transform transition-transform duration-300 hover:scale-110">${icone}</div>
        <div class="flex flex-col flex-1">
          <div class="titulo text-sm md:text-base font-medium opacity-90">${titulo}</div>
          <div class="valor text-lg md:text-xl font-bold flex items-center gap-2">
            <span>${valor}</span>
            <span class="text-xl">${emojiStatus}</span>
          </div>
        </div>
      </div>
      
      <div class="flex-1 flex flex-col justify-end space-y-3 pb-2">
        ${barraProgresso}
        ${indicadorStatus}
        ${alertaHtml}
      </div>
      
      <!-- Indicador visual de status no canto -->
      <div class="absolute top-2 right-2 text-lg opacity-70">
        ${emojiStatus}
      </div>
    </div>
  `;

  // Adicionar touch feedback
  card.style.cssText += `
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  `;

  return card;
}
