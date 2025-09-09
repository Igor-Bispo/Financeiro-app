// src/ui/PeriodIndicator.js
// Componente para indicador de perÃ­odo
import { getSelectedPeriod, setSelectedPeriod } from '@core/utils/globalUtils.js';

export function createPeriodIndicator(period, onPeriodChange) {
  const container = document.createElement('div');
  container.className = 'period-indicator';

  container.innerHTML = `
    <button class="period-indicator__btn period-indicator__btn--prev" aria-label="PerÃ­odo anterior">
      <span class="period-indicator__icon">â€¹</span>
    </button>
    
    <div class="period-indicator__current">
      <span class="period-indicator__month">${period.month}</span>
      <span class="period-indicator__year">${period.year}</span>
    </div>
    
    <button class="period-indicator__btn period-indicator__btn--next" aria-label="PrÃ³ximo perÃ­odo">
      <span class="period-indicator__icon">â€º</span>
    </button>
  `;

  // Event listeners
  const prevBtn = container.querySelector('.period-indicator__btn--prev');
  const nextBtn = container.querySelector('.period-indicator__btn--next');

  prevBtn.addEventListener('click', () => {
    if (onPeriodChange) onPeriodChange('prev');
  });

  nextBtn.addEventListener('click', () => {
    if (onPeriodChange) onPeriodChange('next');
  });

  return container;
}

// FunÃ§Ã£o para atualizar o perÃ­odo exibido
export function updatePeriodIndicator(container, period) {
  const monthEl = container.querySelector('.period-indicator__month');
  const yearEl = container.querySelector('.period-indicator__year');

  if (monthEl) monthEl.textContent = period.month;
  if (yearEl) yearEl.textContent = period.year;
}

// Helper reutilizÃ¡vel: monta (ou atualiza) o indicador em um placeholder e sincroniza com o appState/hash
export function mountPeriodIndicator(placeholderEl) {
  try {
    const placeholder = (typeof placeholderEl === 'string')
      ? document.querySelector(placeholderEl)
      : placeholderEl;
    if (!placeholder) return;

    const meses = ['Janeiro','Fevereiro','MarÃ§o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const { year, month } = getSelectedPeriod();
    const period = { month: meses[Math.max(0, Math.min(11, (month || 1) - 1))] || String(month), year };

    const onChange = (direction) => {
      let y = year;
      let m = month;
      if (direction === 'prev') { m -= 1; if (m < 1) { m = 12; y -= 1; } }
      else if (direction === 'next') { m += 1; if (m > 12) { m = 1; y += 1; } }
      setSelectedPeriod(y, m);
      const newPeriod = { month: meses[Math.max(0, Math.min(11, m - 1))] || String(m), year: y };
      try {
        const el = placeholder.querySelector('.period-indicator');
        if (el) updatePeriodIndicator(el, newPeriod);
      } catch {}
    };

    // Atualiza se jÃ¡ existir; senÃ£o cria
    if (placeholder.firstChild && placeholder.firstChild.classList && placeholder.firstChild.classList.contains('period-indicator')) {
      updatePeriodIndicator(placeholder.firstChild, period);
    } else {
      const ind = createPeriodIndicator(period, onChange);
      placeholder.innerHTML = '';
      placeholder.appendChild(ind);
    }
  } catch {}
}
