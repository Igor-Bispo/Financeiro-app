export function CardResumo({ titulo, valor, cor = '', icone = '', progresso = null, status = null, alerta = null }) {
  const card = document.createElement('div');
  card.className = 'card-resumo card-standard mobile-optimized';

  // Calcular cor baseada no status
  let corFundo, corTexto, corBarra, emojiStatus;

  switch (cor) {
  case 'card-resumo receita':
    corFundo = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
    corTexto = '#fff';
    corBarra = '#ffffff';
    emojiStatus = '📈';
    break;
  case 'card-resumo despesa':
    corFundo = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
    corTexto = '#fff';
    corBarra = '#ffffff';
    emojiStatus = '📉';
    break;
  case 'card-resumo saldo':
    // Cor baseada no valor (positivo/negativo)
    const valorNumerico = parseFloat(valor.replace('R$ ', '').replace(',', '.'));
    if (valorNumerico >= 0) {
      corFundo = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
      emojiStatus = '✅';
    } else {
      corFundo = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
      emojiStatus = '❌';
    }
    corTexto = '#fff';
    corBarra = '#ffffff';
    break;
  case 'card-resumo orcado':
    // Cor baseada no progresso do orçado
    if (progresso !== null) {
      if (progresso <= 0.7) {
        corFundo = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        emojiStatus = '✅';
      } else if (progresso <= 1.0) {
        corFundo = 'linear-gradient(135deg, #eab308 0%, #f59e42 100%)';
        emojiStatus = '⚠️';
      } else {
        corFundo = 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
        emojiStatus = '🚨';
      }
    } else {
      corFundo = 'linear-gradient(135deg, #eab308 0%, #f59e42 100%)';
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

  // Criar barra de progresso se progresso for fornecido
  let barraProgresso = '';
  if (progresso !== null) {
    const percentual = Math.min(Math.max(progresso * 100, 0), 100);
    barraProgresso = `
      <div class="mt-2">
        <div class="flex justify-between text-sm opacity-80 mb-2">
          <span>Progresso</span>
          <span>${percentual.toFixed(0)}%</span>
        </div>
        <div class="w-full bg-white bg-opacity-20 rounded-full h-3">
          <div class="h-3 rounded-full transition-all duration-300" 
               style="width: ${percentual}%; background-color: ${corBarra};"></div>
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
    <div class="flex flex-col h-full">
      <div class="flex items-center gap-3 md:gap-4 mb-4">
        <div class="icon-bg text-2xl md:text-3xl opacity-80">${icone}</div>
        <div class="flex flex-col">
          <div class="titulo text-sm md:text-base font-medium opacity-90">${titulo}</div>
          <div class="valor text-lg md:text-xl font-bold">${valor}</div>
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-end space-y-3 pb-2">
        ${barraProgresso}
        ${indicadorStatus}
        ${alertaHtml}
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
