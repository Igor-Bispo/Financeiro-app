// cacheManager.js - Gerenciador de cache para evitar loops infinitos
// Este arquivo gerencia a limpeza automática de cache quando necessário

const CACHE_VERSION_KEY = 'app_cache_version';
const CURRENT_VERSION = 'v4.39.0';

/**
 * Verifica se há uma nova versão e limpa o cache se necessário
 */
export async function checkAndClearCache() {
  try {
    const storedVersion = localStorage.getItem(CACHE_VERSION_KEY);
    
    if (storedVersion !== CURRENT_VERSION) {
      console.log(`🔄 [CacheManager] Nova versão detectada: ${CURRENT_VERSION} (anterior: ${storedVersion})`);
      
      // Limpar todos os caches
      await clearAllCaches();
      
      // Limpar localStorage de versões antigas
      clearOldLocalStorage();
      
      // Atualizar versão armazenada
      localStorage.setItem(CACHE_VERSION_KEY, CURRENT_VERSION);
      
      console.log('✅ [CacheManager] Cache limpo e versão atualizada');
      
      // Recarregar a página para garantir que a nova versão seja carregada
      if (storedVersion) { // Só recarrega se já havia uma versão anterior
        console.log('🔄 [CacheManager] Recarregando página para aplicar nova versão...');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      console.log(`✅ [CacheManager] Versão atual já está em uso: ${CURRENT_VERSION}`);
    }
  } catch (error) {
    console.error('❌ [CacheManager] Erro ao verificar/limpar cache:', error);
  }
}

/**
 * Limpa todos os caches do navegador
 */
async function clearAllCaches() {
  try {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      console.log(`🧹 [CacheManager] Limpando ${cacheNames.length} caches:`, cacheNames);
      
      await Promise.all(
        cacheNames.map(cacheName => {
          console.log(`🗑️ [CacheManager] Removendo cache: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
      
      console.log('✅ [CacheManager] Todos os caches foram limpos');
    }
  } catch (error) {
    console.error('❌ [CacheManager] Erro ao limpar caches:', error);
  }
}

/**
 * Limpa dados antigos do localStorage
 */
function clearOldLocalStorage() {
  try {
    const keysToRemove = [];
    
    // Lista de chaves que podem causar problemas se mantidas entre versões
    const problematicKeys = [
      'notification_use_modal',
      'notification_toasts_enabled',
      'sw_version',
      'app_state',
      'user_preferences'
    ];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && problematicKeys.some(problematic => key.includes(problematic))) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      console.log(`🗑️ [CacheManager] Removendo chave do localStorage: ${key}`);
      localStorage.removeItem(key);
    });
    
    console.log(`✅ [CacheManager] ${keysToRemove.length} chaves antigas removidas do localStorage`);
  } catch (error) {
    console.error('❌ [CacheManager] Erro ao limpar localStorage:', error);
  }
}

/**
 * Força a limpeza completa do cache (para uso manual)
 */
export async function forceClearCache() {
  try {
    console.log('🧹 [CacheManager] Forçando limpeza completa do cache...');
    
    await clearAllCaches();
    clearOldLocalStorage();
    
    // Remover a versão para forçar recarregamento
    localStorage.removeItem(CACHE_VERSION_KEY);
    
    console.log('✅ [CacheManager] Limpeza forçada concluída');
    
    // Recarregar página
    window.location.reload();
  } catch (error) {
    console.error('❌ [CacheManager] Erro na limpeza forçada:', error);
  }
}

/**
 * Verifica se o service worker está funcionando corretamente
 */
export async function checkServiceWorker() {
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      
      if (registration) {
        console.log('✅ [CacheManager] Service Worker ativo:', registration.scope);
        
        // Verificar se há uma nova versão disponível
        if (registration.waiting) {
          console.log('🔄 [CacheManager] Nova versão do Service Worker aguardando ativação');
          // Forçar ativação da nova versão
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        
        return true;
      } else {
        console.warn('⚠️ [CacheManager] Service Worker não encontrado');
        return false;
      }
    } else {
      console.warn('⚠️ [CacheManager] Service Worker não suportado neste navegador');
      return false;
    }
  } catch (error) {
    console.error('❌ [CacheManager] Erro ao verificar Service Worker:', error);
    return false;
  }
}

// Expor funções globalmente para debug
if (typeof window !== 'undefined') {
  window.clearCache = forceClearCache;
  window.checkCache = checkAndClearCache;
  window.checkSW = checkServiceWorker;
}
