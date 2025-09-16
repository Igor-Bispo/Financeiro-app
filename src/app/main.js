import { renderPage } from './routes.js';
import { logger } from '@core/logger/logger.js';
import { initializeApp, cleanup } from './bootstrap.js';

export async function bootstrap() {
  try {
    // Inicializar aplicação
    await initializeApp();
    // Sempre iniciar na Dashboard ao abrir o app
    try {
      const ensureDashboard = () => {
        const raw = window.location.hash || '';
        const h = raw.split('?')[0];
        // Apenas forçar dashboard se não houver hash ou for inválido
        if (!h || h === '#' || h === '#/') {
          window.location.hash = '#/dashboard';
        }
      };
      ensureDashboard();
    } catch {}

    // Configurar roteamento
    async function onRoute() {
      // Normalizar rota removendo query string e hashes estranhos
      const raw = window.location.hash || '';
      const normalizedHash = raw.split('?')[0];
      const path = (normalizedHash.replace('#', '') || '/').trim();
      // Forçar scroll para o topo na troca de rota (antes de render)
      try { const { scrollToTop } = await import('@core/utils/globalUtils.js'); scrollToTop(true); } catch {}
      // Sincronizar período com ?ym no hash
      try {
        const utils = await import('@core/utils/globalUtils.js');
        const fromHash = utils.parseYmFromHash();
        const cur = utils.getSelectedPeriod();
        if (fromHash && (fromHash.year !== cur.year || fromHash.month !== cur.month)) {
          utils.setSelectedPeriod(fromHash.year, fromHash.month);
        } else if (!fromHash) {
          utils.ensureHashHasYm(cur.year, cur.month);
        }
      } catch {}
      try {
        await renderPage(path);
        // Scroll será tratado dentro do pipeline de render (routes.js)
      } catch (err) {
        logger.error('route error', err);
      }
    }

    // Reagir a mudanças de hash normalmente
    window.addEventListener('hashchange', () => {
      onRoute();
    });
    onRoute();

    // Evitar restauração automática de rolagem pelo navegador
    try {
      if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    } catch {}

    // Limpar recursos ao sair
    window.addEventListener('beforeunload', cleanup);

    logger.info('Aplicação bootstrapada com sucesso');

  } catch (error) {
    logger.error('Erro no bootstrap:', error);
  }
}
