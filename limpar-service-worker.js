// Script para limpar completamente o Service Worker e seus caches
// Execute este script no console do navegador se ainda houver problemas

console.log('🧹 Iniciando limpeza completa do Service Worker...');

async function limparServiceWorker() {
  try {
    // 1. Desregistrar todos os Service Workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (let registration of registrations) {
        console.log('🗑️ Desregistrando Service Worker:', registration.scope);
        await registration.unregister();
      }
      
      console.log(`✅ ${registrations.length} Service Worker(s) desregistrado(s)`);
    }
    
    // 2. Limpar todos os caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      
      for (let cacheName of cacheNames) {
        console.log('🗑️ Removendo cache:', cacheName);
        await caches.delete(cacheName);
      }
      
      console.log(`✅ ${cacheNames.length} cache(s) removido(s)`);
    }
    
    // 3. Limpar localStorage e sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    console.log('✅ Storage local limpo');
    
    // 4. Recarregar a página
    console.log('🔄 Recarregando página...');
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
    
  } catch (error) {
    console.error('❌ Erro durante limpeza:', error);
  }
}

// Executar limpeza
limparServiceWorker();