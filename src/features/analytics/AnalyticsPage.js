// Analytics feature shim: delegate to legacy implementation for full compatibility
// This lets the new router lazily load this module while preserving current behavior.
export async function render(container) {
  const { AnalyticsPage } = await import('@js/ui/AnalyticsPage.js');
  container.innerHTML = '';
  const budgetId = window?.appState?.currentBudget?.id;
  // Render guard: if no budget, let AnalyticsPage render its empty state
  const page = await AnalyticsPage.render(budgetId);
  container.appendChild(page);
  // Tentar montar indicador se a pÃ¡gina legacy expuser um placeholder
  try {
    const { mountPeriodIndicator } = await import('../../ui/PeriodIndicator.js');
    mountPeriodIndicator('#analytics-period-indicator');
  } catch {}
}
