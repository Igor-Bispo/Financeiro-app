export function CardResumo({ titulo, valor, cor = '', icone = '' }) {
  const card = document.createElement('div');
  card.className = 'card-resumo';
  // Estilo inline para garantir fundo e cor
  switch (cor) {
    case 'card-resumo receita':
      card.style.background = 'linear-gradient(90deg, #22c55e 80%, #16a34a 100%)';
      card.style.color = '#fff';
      break;
    case 'card-resumo despesa':
      card.style.background = 'linear-gradient(90deg, #ef4444 80%, #b91c1c 100%)';
      card.style.color = '#fff';
      break;
    case 'card-resumo saldo':
      card.style.background = 'linear-gradient(90deg, #3b82f6 80%, #1d4ed8 100%)';
      card.style.color = '#fff';
      break;
    case 'card-resumo orcado':
      card.style.background = 'linear-gradient(90deg, #eab308 80%, #f59e42 100%)';
      card.style.color = '#fff';
      break;
    default:
      card.style.background = '#fff';
      card.style.color = '#222';
  }
  card.innerHTML = `
    <div class="icon-bg">${icone}</div>
    <div>
      <div class="titulo">${titulo}</div>
      <div class="valor">${valor}</div>
    </div>
  `;
  return card;
} 