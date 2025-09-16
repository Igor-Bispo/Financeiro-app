// src/ui/CardResumo.js
// Componente de card para resumo de dados

export function CardResumo({ title, value, icon, type = 'default', onClick }) {
  const card = document.createElement('div');
  card.className = `card-resumo card-resumo--${type}`;

  if (onClick) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', onClick);
  }

  card.innerHTML = `
    <div class="card-resumo__header">
      <h3 class="card-resumo__title">${title}</h3>
      ${icon ? `<span class="card-resumo__icon">${icon}</span>` : ''}
    </div>
    <div class="card-resumo__value">${value}</div>
  `;

  return card;
}

// Função helper para criar cards de resumo
export function createCardResumo(title, value, icon, type = 'default', onClick) {
  return CardResumo({ title, value, icon, type, onClick });
}
