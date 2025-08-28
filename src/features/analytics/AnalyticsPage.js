// Analytics feature shim: delegate to legacy implementation for full compatibility
// This lets the new router lazily load this module while preserving current behavior.
export async function render(container) {
  const { AnalyticsPage } = await import('@js/ui/AnalyticsPage.js');
  container.innerHTML = '';
  const budgetId = window?.appState?.currentBudget?.id;
  const page = await AnalyticsPage.render(budgetId);
  container.appendChild(page);
}
