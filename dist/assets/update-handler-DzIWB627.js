const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-BitxXk12.js","assets/main-CXjbsgj6.css"])))=>i.map(i=>d[i]);
import{_ as n}from"./main-BitxXk12.js";function u(){console.log("🔄 [NOVA LÓGICA] Mostrando modal de atualizações..."),document.body.insertAdjacentHTML("beforeend",`
    <div id="update-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div class="text-center mb-6">
          <div class="text-4xl mb-3">🔄</div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Escolha o tipo de atualização
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Selecione como deseja verificar atualizações
          </p>
        </div>
        
        <div class="space-y-3 mb-6">
          <button id="normal-update-btn" class="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="text-2xl">✅</div>
              <div class="text-left">
                <div class="font-medium text-blue-800 dark:text-blue-200">Verificação Normal</div>
                <div class="text-xs text-blue-600 dark:text-blue-400">Recomendado - Verifica atualizações do app</div>
              </div>
            </div>
          </button>
          
          <button id="hard-refresh-btn" class="w-full p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="text-2xl">🧹</div>
              <div class="text-left">
                <div class="font-medium text-orange-800 dark:text-orange-200">Hard Refresh Completo</div>
                <div class="text-xs text-orange-600 dark:text-orange-400">Limpa cache e dados - Para problemas persistentes</div>
              </div>
            </div>
          </button>
        </div>
        
        <div class="text-center">
          <button id="cancel-update-btn" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  `);const t=document.getElementById("update-modal"),r=document.getElementById("normal-update-btn"),o=document.getElementById("hard-refresh-btn"),d=document.getElementById("cancel-update-btn");function a(){t&&t.remove()}function i(){console.log("🔄 [NOVA LÓGICA] Executando verificação normal..."),a(),typeof window.checkForUpdates=="function"?window.checkForUpdates(!1):n(()=>import("./main-BitxXk12.js").then(e=>e.a9),__vite__mapDeps([0,1])).then(e=>{e.checkForUpdates(!1)}).catch(e=>{console.error("Erro ao importar PWA module:",e),window.snk&&window.snk().error("Erro ao verificar atualizações")})}function s(){console.log("🔄 [NOVA LÓGICA] Executando hard refresh..."),a(),typeof window.performHardRefresh=="function"?window.performHardRefresh():n(()=>import("./main-BitxXk12.js").then(e=>e.a9),__vite__mapDeps([0,1])).then(e=>{e.performHardRefresh()}).catch(e=>{console.error("Erro ao importar PWA module:",e),window.snk&&window.snk().error("Erro ao executar hard refresh")})}r&&r.addEventListener("click",i),o&&o.addEventListener("click",s),d&&d.addEventListener("click",a),t&&t.addEventListener("click",e=>{e.target===t&&a()}),console.log("🔄 [NOVA LÓGICA] Modal criado e event listeners adicionados!")}export{u as showUpdateModal};
