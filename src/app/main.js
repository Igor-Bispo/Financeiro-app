import { navigate } from './routes.js';
import { logger } from '@core/logger/logger.js';

export function bootstrap() {
  function onRoute() {
    const path = location.hash.replace('#', '') || '/';
    navigate(path).catch(err => logger.error('route error', err));
  }
  window.addEventListener('hashchange', onRoute);
  onRoute();
}
