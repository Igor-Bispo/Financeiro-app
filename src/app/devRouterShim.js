import { renderPage } from '/src/app/routes.js';
import { APP_CONFIG } from '@core/config/index.js';

// Expor uma função global apenas para testes manuais sem alterar o fluxo legado
// Ex.: window.routerNavigate('/analytics')
if (typeof window !== 'undefined') {
  window.routerNavigate = async (path) => {
    try {
      await renderPage(path);
    } catch (err) {

      console.error('routerNavigate error:', err);
    }
  };

  // Helpers para ligar/desligar o router dinamicamente em dev/teste
  window.enableRouter = async () => {
    try {
      localStorage.setItem('useRouter', 'true');
      await startRouter();

      console.info('Router habilitado (persistido em localStorage).');
    } catch (err) {
      console.error('Falha ao habilitar router:', err);
    }
  };

  window.disableRouter = () => {
    try {
      localStorage.removeItem('useRouter');
      // Não há teardown do legado aqui; um reload garante estado

      console.info('Router desabilitado (removido de localStorage). Recarregue se necessário.');
    } catch (err) {
      console.error('Falha ao desabilitar router:', err);
    }
  };
}

// Se a flag estiver ativa, inicializa o router automaticamente
// Mantém desligado por padrão (APP_CONFIG.ui.useRouter === false)
function wantRouter() {
  try {
    const fromConfig = !!(APP_CONFIG && APP_CONFIG.ui && APP_CONFIG.ui.useRouter);
    const fromLS = typeof localStorage !== 'undefined' && localStorage.getItem('useRouter') === 'true';
    let fromQuery = false;
    if (typeof window !== 'undefined' && typeof location !== 'undefined' && window.URLSearchParams) {
      const sp = new window.URLSearchParams(location.search || '');
      fromQuery = sp.get('useRouter') === '1' || (location.hash && location.hash.includes('useRouter=1'));
    }
    return fromConfig || fromLS || fromQuery;
  } catch {
    return false;
  }
}

async function startRouter() {
  if (typeof window !== 'undefined' && window.__routerBootstrapped) {
    return; // evitar bootstraps múltiplos
  }
  try {
    const mod = await import('./main.js');
    if (mod && typeof mod.bootstrap === 'function') {
      mod.bootstrap();
      if (typeof window !== 'undefined') {
        window.__routerBootstrapped = true;
      }
    }
  } catch (err) {

    console.error('Falha ao iniciar router:', err);
  }
}

if (wantRouter()) {
  startRouter();
}
