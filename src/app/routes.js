// Simple routes mapping with lazy pages
export const routes = {
  '/recorrentes': () => import('@features/recorrentes/RecorrentesPage.js'),
  '/analytics': () => import('@features/analytics/AnalyticsPage.js'),
  '/settings': () => import('@features/settings/SettingsPage.js'),
};

export async function navigate(path) {
  const loader = routes[path];
  if (!loader) {
    return;
  }
  const mod = await loader();
  if (typeof mod.render === 'function') {
    await mod.render(document.getElementById('app-content') || document.body);
  }
}
