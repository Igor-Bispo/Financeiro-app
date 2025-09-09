// Thin wrapper that defers to the stable simple renderer.
// Using a function + dynamic import avoids any import-analysis quirks in dev.
export async function renderDashboard(container) {
	const mod = await import('./DashboardSimple.js');
	return mod.renderDashboard(container);
}

