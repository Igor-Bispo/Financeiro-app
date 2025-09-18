const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-CG45aA5x.js","assets/main-CNgGB7ml.css","assets/showAddCategoryModal-BwmiYAIm.js"])))=>i.map(i=>d[i]);
import{h as M,e as _,_ as B,i as q}from"./main-CG45aA5x.js";import{mountPeriodIndicator as H}from"./PeriodIndicator-ChwQCRMd.js";import{a as Y,r as z}from"./UIService-e4a5cc_y.js";typeof window<"u"&&window.eventBus&&typeof window.eventBus.on=="function"&&window.eventBus.on("categories:updated",()=>{if((window.location.hash||"").split("?")[0]==="#/categories")try{G()}catch(n){console.warn("Falha ao renderizar categorias após atualização",n)}});async function W(i){const n=document.createElement("div");n.className="categories-page";const k=document.createElement("div");k.className="tab-header mb-6",k.innerHTML='<h2 class="tab-title-highlight">📂 Categorias</h2><div id="cat-period-indicator"></div>',n.appendChild(k);const e=document.createElement("div");e.className="categories-content",e.innerHTML=`
    <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">📁 Gerenciar Categorias</h3>
  <button onclick="window.showAddCategoryModal()" class="u-btn u-btn--primary mobile-btn">
          ➕ Nova Categoria
        </button>
      </div>
      
      <div class="text-center py-8">
        <div class="text-4xl mb-4">📂</div>
        <p class="text-gray-600 dark:text-gray-400">Página de categorias em desenvolvimento</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Carregando categorias...</p>
      </div>
    </div>
  `;try{const m=document.querySelector(".content-spacing"),h=Array.isArray(window.appState?.categories)&&window.appState.categories.length>0;if(m&&!h){const v=document.createElement("div");v.className="empty-state mt-2",v.innerHTML='<div class="empty-icon">📁</div><div class="empty-text">Nenhuma categoria cadastrada</div><div class="mt-2"><button class="u-btn u-btn--primary mobile-btn w-full" onclick="window.showAddCategoryModal && window.showAddCategoryModal()">Criar categoria</button></div>',m.appendChild(v)}}catch{}try{H("#cat-period-indicator")}catch{}n.appendChild(e),i&&(i.innerHTML="",i.appendChild(n)),await V();try{H("#cat-period-indicator")}catch{}}async function V(){try{console.log("Categories: Carregando dados...");try{await G()}catch(i){console.warn("renderCategories falhou:",i)}}catch(i){console.error("Erro ao carregar categorias:",i)}}async function G(){try{const t=Date.now();if(window.__lastCategoriesRender&&t-window.__lastCategoriesRender<300){console.log("⏱️ renderCategories chamado muito próximo do anterior, pulando...");return}window.__lastCategoriesRender=t}catch{}await U(),await K();const i=document.getElementById("app-content"),n=window.appState?.currentBudget?.id,k=window.appState?.budgets||[],e=Array.isArray(k)&&k.length>1,m=(window.appState.categories||[]).filter(t=>!n||t.budgetId===n||!e&&!t.budgetId),h=m.length,v=m.filter(t=>t.limite>0).length,g=m.filter(t=>t.tipo==="receita").length,u=m.filter(t=>t.tipo==="despesa").length,{year:d,month:p}=M(),l=window.appState.categories.map(t=>{const c=window.appState.transactions.filter(b=>{let o;b.createdAt&&typeof b.createdAt=="object"&&b.createdAt.seconds?o=new Date(b.createdAt.seconds*1e3):o=new Date(b.createdAt);const x=o.getFullYear(),F=o.getMonth()+1;return b.categoriaId===t.id&&b.tipo===t.tipo&&x===d&&F===p}).reduce((b,o)=>b+parseFloat(o.valor),0),f=window.appState.recorrentes.filter(b=>b.categoriaId===t.id&&b.ativa===!0);let C=0;f.forEach(b=>{window.appState.transactions.filter(x=>x.recorrenteId===b.id&&new Date(x.createdAt).getFullYear()===d&&new Date(x.createdAt).getMonth()+1===p).length>0&&(C+=parseFloat(b.valor))});const y=c+C,R=t.limite?parseFloat(t.limite):0,j=(t.tipo==="receita",R-y),S=R>0?Math.min(y/R*100,100):0;let A="bg-green-500";return S>=90?A="bg-red-500":S>=75?A="bg-yellow-500":S>=50&&(A="bg-orange-500"),{...t,totalGasto:y,totalGastoTransacoes:c,totalGastoRecorrentes:C,limite:R,saldo:j,porcentagem:S,corBarra:A}}).sort((t,r)=>r.totalGasto-t.totalGasto),a=l.filter(t=>t.limite>0&&t.totalGasto>t.limite).length,s=m.filter(t=>t.tipo==="despesa"&&Number(t.limite)>0).reduce((t,r)=>t+(Number(r.limite)||0),0)||0,w=l.filter(t=>t.tipo==="despesa").reduce((t,r)=>t+(Number(r.totalGasto)||0),0)||0,$=s-w,E=m.filter(t=>t.tipo==="receita"&&Number(t.limite)>0).reduce((t,r)=>t+(Number(r.limite)||0),0)||0,T=l.filter(t=>t.tipo==="receita").reduce((t,r)=>t+(Number(r.totalGasto)||0),0)||0,D=E-T,I=window.appState?.selectedYear||new Date().getFullYear(),N=window.appState?.selectedMonth||new Date().getMonth()+1;i.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">📂</span>
                </div>
                <div>
                  <h2 class="text-gray-800 dark:text-white font-semibold text-base">Categorias</h2>
                  <div class="flex items-center gap-1">
                    <span class="text-cyan-600 dark:text-cyan-400 text-xs">${m.length} categorias</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="cat-period-indicator"></div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Indicador de período padronizado movido para o cabeçalho -->
          
          <!-- ========== SEÇÃO 1: RESUMO ANALÍTICO ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Visão Geral</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
              <!-- Header Compacto -->
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span class="text-xl">📊</span>
                    Controle de Categorias
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">${h} categorias • ${String(N).padStart(2,"0")}/${I}</p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold ${a>0?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}">
                    ${a}
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${a>0?"Alertas":"OK"}</p>
                </div>
              </div>
              
              <!-- Métricas Compactas -->
              <div class="grid grid-cols-4 gap-3 mb-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">📂</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">${h}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">🎯</div>
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${v}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Limite</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💚</div>
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">${g}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Receitas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💸</div>
                  <div class="text-lg font-bold text-red-600 dark:text-red-400">${u}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Despesas</div>
                </div>
              </div>

              <!-- Resumo Financeiro Compacto -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Despesas -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                  <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <span>💸</span>
                    Despesas
                  </h5>
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                      <span class="font-medium text-gray-800 dark:text-gray-200">R$ ${s.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Gasto:</span>
                      <span class="font-medium text-red-600 dark:text-red-400">R$ ${w.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                      <span class="text-gray-600 dark:text-gray-400">Saldo:</span>
                      <span class="font-bold ${$<0?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}">
                        R$ ${$.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Receitas -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                  <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <span>💚</span>
                    Receitas
                  </h5>
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Meta:</span>
                      <span class="font-medium text-gray-800 dark:text-gray-200">R$ ${E.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Recebido:</span>
                      <span class="font-medium text-green-600 dark:text-green-400">R$ ${T.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                      <span class="text-gray-600 dark:text-gray-400">Saldo:</span>
                      <span class="font-bold ${D<0?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}">
                        R$ ${D.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 2: AÇÕES E FILTROS ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Filtros</h2>
            </div>
            
            <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Categorias</h3>
                  <div class="flex gap-2 flex-wrap">
                    <button onclick="window.migrarTransacoesAntigas()" class="u-btn u-btn--outline mobile-btn btn-sm">
                      🔄 Migrar
          </button>
                    <button onclick="window.corrigirTipoCategoria()" class="u-btn u-btn--outline mobile-btn btn-sm">
                      🔧 Corrigir
          </button>
                    <button id="add-category-btn" class="u-btn u-btn--primary mobile-btn">
                      + Nova Categoria
          </button>
        </div>
      </div>
              </div>
              
          <!-- Filtro de pesquisa -->
              <div class="p-4">
            <div class="relative">
              <input 
                type="text" 
                id="category-search" 
                    placeholder="🔍 Pesquisar por nome, tipo ou limite..." 
                    class="u-input w-full pl-12"
              />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="text-gray-400 text-lg">🔍</span>
              </div>
            </div>
            <div id="category-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="category-search-count">0</span> categoria(s) encontrada(s)
                </div>
              </div>
            </div>
          </div>
          
          <!-- ========== SEÇÃO 3: GRID DE CATEGORIAS ========== -->
          <div class="mb-8" id="categories-grid">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Todas as Categorias</h2>
              </div>
            
${m.length===0?`
              <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="text-center py-12">
                  <div class="text-6xl mb-4">📂</div>
                  <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
                  <div class="text-gray-600 dark:text-gray-400 mb-4">Crie sua primeira categoria para organizar suas finanças</div>
                  <button onclick="window.showAddCategoryModal()" class="u-btn u-btn--primary mobile-btn w-full">
                    📂 Criar Primeira Categoria
                  </button>
                  </div>
                  </div>
            `:`
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${l.map(t=>{const r=t.tipo==="receita",c=t.limite>0,f=c&&t.totalGasto>t.limite;return`
                    <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${f?"ring-2 ring-red-200 dark:ring-red-800":""}">
                      <!-- Header da Categoria -->
                      <div class="bg-gradient-to-r ${r?"from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800":"from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800"} p-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style="background-color: ${t.cor||"#4F46E5"}20; color: ${t.cor||"#4F46E5"}">
                              ${r?"💰":"💸"}
                    </div>
                            <div>
                              <h3 class="font-bold text-gray-900 dark:text-gray-100 truncate">${t.nome}</h3>
                              <p class="text-sm text-gray-500 dark:text-gray-400">${r?"Receita":"Despesa"}</p>
                            </div>
                          </div>
                          ${f?'<div class="text-2xl">🚨</div>':c&&t.porcentagem>=90?'<div class="text-2xl">⚠️</div>':""}
                        </div>
                  </div>
                      
                      <!-- Conteúdo da Categoria -->
                      <div class="p-4">
                        ${c?`
                          <div class="mb-4">
                            <div class="flex justify-between items-center mb-2">
                              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Limite: R$ ${t.limite.toFixed(2)}</span>
                              <span class="text-sm font-medium ${f?"text-red-600 dark:text-red-400":t.porcentagem>=90?"text-yellow-600 dark:text-yellow-400":"text-green-600 dark:text-green-400"}">
                                ${t.porcentagem.toFixed(1)}%
                              </span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div class="h-2 rounded-full ${t.corBarra} transition-all duration-300" style="width: ${t.porcentagem}%"></div>
                            </div>
                            <div class="flex justify-between items-center mt-2 text-xs text-gray-600 dark:text-gray-400">
                              <span>R$ 0</span>
                              <span>R$ ${t.limite.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div class="space-y-2 mb-4">
                            <div class="flex justify-between items-center">
                              <span class="text-gray-600 dark:text-gray-400">${t.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                              <span class="font-medium ${t.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${t.totalGasto.toFixed(2)}</span>
                            </div>
                            ${t.totalGasto>0?`
                                  <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                                    • ${t.tipo==="receita"?"Receitas":"Transações"}: R$ ${t.totalGastoTransacoes.toFixed(2)}
                                    ${t.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${t.totalGastoRecorrentes.toFixed(2)}`:""}
                                  </div>
                                `:""}
                            <div class="text-xs text-gray-500 dark:text-gray-400">
                              ${f?`🚨 Excedeu em R$ ${Math.abs(t.saldo).toFixed(2)}`:`Saldo: R$ ${t.saldo.toFixed(2)}`}
                            </div>
                          </div>
                        `:`
                          <div class="space-y-2 mb-4">
                            <div class="flex justify-between items-center">
                              <span class="text-gray-600 dark:text-gray-400">${t.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                              <span class="font-medium ${t.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${t.totalGasto.toFixed(2)}</span>
                            </div>
                            ${t.totalGasto>0?`
                                  <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                                    • ${t.tipo==="receita"?"Receitas":"Transações"}: R$ ${t.totalGastoTransacoes.toFixed(2)}
                                    ${t.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${t.totalGastoRecorrentes.toFixed(2)}`:""}
                                  </div>
                                `:""}
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
                          </div>
                        `}
                        
                        <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
                          <button onclick="editCategory('${t.id}')" class="u-btn u-btn--outline mobile-btn">
                            <span class="icon-standard">✏️</span>
                            <span class="hidden sm:inline">Editar</span>
                          </button>
                          <button onclick="window.deleteCategoryWithConfirmation('${t.id}', '${t.nome}')" class="u-btn u-btn--danger mobile-btn">
                            <span class="icon-standard">🗑️</span>
                            <span class="hidden sm:inline">Excluir</span>
                          </button>
                          <button onclick="showCategoryHistory('${t.id}')" class="u-btn u-btn--outline mobile-btn">
                            <span class="icon-standard">📊</span>
                            <span class="hidden sm:inline">Histórico</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  `}).join("")}
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;try{const t=document.querySelector(".content-spacing");if(t&&h===0){const r=document.createElement("div");r.className="empty-state mt-2",r.innerHTML='<div class="empty-icon">📁</div><div class="empty-text">Nenhuma categoria cadastrada</div><div class="mt-2"><button class="u-btn u-btn--primary mobile-btn w-full" onclick="window.showAddCategoryModal && window.showAddCategoryModal()">Criar categoria</button></div>',t.appendChild(r)}}catch{}setTimeout(()=>{try{Y()}catch(t){console.warn("setupCategoryButtons falhou:",t)}try{const t=document.getElementById("add-category-btn");t&&(t.onclick=()=>window.showAddCategoryModal?.())}catch{}},100),J();try{window.__catPeriodListenerBound||(window.__catPeriodListenerBound=!0,_.on("period:changed",t=>queueMicrotask(()=>{const r=(window.location.hash||"").split("?")[0];if(r==="#/categories"){try{const c=t&&t.year||M().year,f=t&&t.month||M().month,C=`${c}-${String(f).padStart(2,"0")}`,y=new URL(window.location.href);y.hash=`${r}?ym=${C}`,history.replaceState(null,"",y.toString())}catch{}G()}})))}catch{}z();try{typeof window.deleteCategoryWithConfirmation!="function"&&(window.deleteCategoryWithConfirmation=async function(t,r="categoria"){try{const c=r||"categoria";let f=!1;if(typeof window.confirmDelete=="function"?f=await window.confirmDelete(c,"categoria"):typeof window.showConfirmationModal=="function"?f=await new Promise(y=>{window.showConfirmationModal({title:"Excluir Categoria",message:`Tem certeza que deseja excluir "${c}"? Esta ação não pode ser desfeita.`,confirmText:"Sim, excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>y(!0),onCancel:()=>y(!1)})}):f=confirm(`Excluir "${c}"? Esta ação não pode ser desfeita.`),!f)return;await(await B(()=>import("./main-CG45aA5x.js").then(y=>y.a2),__vite__mapDeps([0,1]))).deleteCategory(t);try{window.Snackbar?.show?.("Categoria excluída","success")}catch{}try{await G()}catch{}}catch(c){console.error("Falha ao excluir categoria:",c);try{window.Snackbar?.show?.("Erro ao excluir categoria","error")}catch{}}}),typeof window.editCategory!="function"&&(window.editCategory=function(t){console.log("🔧 editCategory chamada com ID:",t);try{const r=window.appState?.categories?.find(c=>c.id===t);console.log("🔧 Categoria encontrada:",r),console.log("🔧 window.showAddCategoryModal disponível:",typeof window.showAddCategoryModal),r?window.showAddCategoryModal?(console.log("✅ Chamando showAddCategoryModal"),window.showAddCategoryModal(r)):(console.log("🔄 showAddCategoryModal não disponível, tentando carregar..."),B(()=>import("./showAddCategoryModal-BwmiYAIm.js"),__vite__mapDeps([2,0,1])).then(c=>{console.log("✅ Modal carregado dinamicamente"),c.default&&(window.showAddCategoryModal=c.default,c.default(r))}).catch(c=>{console.error("❌ Falha ao carregar modal:",c),window.Snackbar&&window.Snackbar.show("Erro ao abrir modal de edição","error")})):(console.error("❌ Categoria não encontrada:",t),window.Snackbar&&window.Snackbar.show("Categoria não encontrada","error"))}catch(r){console.warn("editCategory (fallback) falhou:",r),window.Snackbar&&window.Snackbar.show("Erro ao editar categoria","error")}}),typeof window.showCategoryHistory!="function"&&(window.showCategoryHistory=function(t){try{const{year:r,month:c}=M(),C=`Histórico - ${window.appState?.categories?.find(o=>o.id===t)?.nome||t}`,y=o=>{if(!o)return null;if(typeof o?.toDate=="function")return o.toDate();if(typeof o=="object"&&o?.seconds)return new Date(o.seconds*1e3);const x=new Date(o);return isNaN(x.getTime())?null:x},R=o=>(Number.parseFloat(o||0)||0).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),b=`<div class="max-h-96 overflow-auto">${(window.appState?.transactions||[]).filter(o=>o.categoriaId===t).filter(o=>{const x=y(o.createdAt);return x?x.getFullYear()===r&&x.getMonth()+1===c:!1}).sort((o,x)=>{const F=y(o.createdAt)||0;return(y(x.createdAt)||0)-F}).slice(0,100).map(o=>{const x=y(o.createdAt),F=x?x.toLocaleDateString("pt-BR"):"-",L=o.tipo==="receita"?"+":"-",P=o.descricao&&String(o.descricao).trim()||"(Sem descrição)",O=o.tipo==="receita"?"text-green-600":"text-red-600";return`
                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div class="min-w-0">
                    <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${P}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${F}</div>
                  </div>
                  <div class="text-right font-medium ${O}">${L} R$ ${R(o.valor)}</div>
                </div>`}).join("")||'<div class="text-sm text-gray-500">Sem transações neste período</div>'}</div>`;_.emit("modal:show",{title:C,content:b})}catch(r){console.warn("showCategoryHistory (fallback) falhou:",r)}}),typeof window.migrarTransacoesAntigas!="function"&&(window.migrarTransacoesAntigas=function(){try{window.Snackbar?.show?.("Nada para migrar","info")}catch{}}),typeof window.corrigirTipoCategoria!="function"&&(window.corrigirTipoCategoria=function(){try{window.Snackbar?.show?.("Tipos de categorias verificados","info")}catch{}})}catch{}}async function U(){try{if(typeof window.loadTransactions=="function"){await window.loadTransactions();return}}catch(i){console.warn("loadTransactions fallback falhou:",i)}}async function K(){try{await q()}catch(i){console.warn("loadRecorrentes falhou:",i)}}function at(){const i=document.getElementById("app-content");return W(i)}function J(){try{if(typeof window.setupCategorySearch=="function"){window.setupCategorySearch();return}const i=g=>(g??"").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim(),n=(g,u)=>{if(g===u)return 0;const d=g.length,p=u.length;if(d===0)return p;if(p===0)return d;if(Math.abs(d-p)>1)return 2;const l=Array(d+1).fill(0).map(()=>Array(p+1).fill(0));for(let a=0;a<=d;a++)l[a][0]=a;for(let a=0;a<=p;a++)l[0][a]=a;for(let a=1;a<=d;a++)for(let s=1;s<=p;s++){const w=g[a-1]===u[s-1]?0:1;l[a][s]=Math.min(l[a-1][s]+1,l[a][s-1]+1,l[a-1][s-1]+w),a>1&&s>1&&g[a-1]===u[s-2]&&g[a-2]===u[s-1]&&(l[a][s]=Math.min(l[a][s],l[a-2][s-2]+1))}return l[d][p]},k=(g,u)=>{const d=i(g),p=i(u);if(!p||d.includes(p))return!0;const l=d.split(/\s+/).filter(Boolean);for(const a of l)if(Math.abs(a.length-p.length)<=1&&n(a,p)<=1)return!0;return Math.abs(d.length-p.length)<=1&&n(d,p)<=1},e=document.getElementById("category-search"),m=document.getElementById("category-search-results"),h=document.getElementById("category-search-count"),v=document.getElementById("categories-grid");if(!e||!v||e.dataset.bound==="1")return;e.dataset.bound="1",e.addEventListener("input",()=>{const g=i(e.value);if(!g){m&&m.classList.add("hidden");try{v.innerHTML=Q()}catch{v.innerHTML=""}return}const u=(window.appState.categories||[]).filter(d=>{const p=d.nome||"",l=d.tipo||"",a=String(d.limite??"");return k(p,g)||k(l,g)||a.includes(g)});h&&(h.textContent=String(u.length)),m&&m.classList.remove("hidden");try{v.innerHTML=X(u)}catch{v.innerHTML=""}}),e.addEventListener("keydown",g=>{g.key==="Escape"&&(e.value="",e.dispatchEvent(new Event("input")))})}catch(i){console.warn("setupCategorySearch fallback falhou:",i)}}function Q(){const{year:i,month:n}=M();return window.appState.categories.map(e=>{const h=window.appState.transactions.filter(s=>{let w;s.createdAt&&typeof s.createdAt=="object"&&s.createdAt.seconds?w=new Date(s.createdAt.seconds*1e3):w=new Date(s.createdAt);const $=w.getFullYear(),E=w.getMonth()+1;return s.categoriaId===e.id&&s.tipo===e.tipo&&$===i&&E===n}).reduce((s,w)=>s+parseFloat(w.valor),0),v=window.appState.recorrentes.filter(s=>s.categoriaId===e.id&&s.ativa===!0);let g=0;v.forEach(s=>{window.appState.transactions.filter($=>$.recorrenteId===s.id&&new Date($.createdAt).getFullYear()===i&&new Date($.createdAt).getMonth()+1===n).length>0&&(g+=parseFloat(s.valor))});const u=h+g,d=e.limite?parseFloat(e.limite):0,p=(e.tipo==="receita",d-u),l=d>0?Math.min(u/d*100,100):0;let a="bg-green-500";return l>=90?a="bg-red-500":l>=75?a="bg-yellow-500":l>=50&&(a="bg-orange-500"),{...e,totalGasto:u,totalGastoTransacoes:h,totalGastoRecorrentes:g,limite:d,saldo:p,porcentagem:l,corBarra:a}}).sort((e,m)=>m.totalGasto-e.totalGasto).map(e=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${e.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${e.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${e.tipo}</p>
      
      ${e.limite>0?`
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${e.limite.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${e.tipo==="receita"?"Receita":"Gasto"}:</span>
                <span class="font-medium ${e.tipo==="receita"?"text-green-600":e.totalGasto>e.limite?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${e.totalGasto.toFixed(2)}</span>
              </div>
              ${e.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${e.totalGastoTransacoes.toFixed(2)}
                      ${e.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${e.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${e.tipo==="receita"?"Falta para meta":"Saldo"}:</span>
                <span class="font-medium ${e.tipo==="receita"?e.saldo<=0?"text-green-600":e.saldo<e.limite*.25?"text-yellow-600":"text-red-600":e.saldo<0?"text-red-600":e.saldo<e.limite*.25?"text-yellow-600":"text-green-600"}">R$ ${e.saldo.toFixed(2)}</span>
              </div>
              
              <!-- Barra de Progresso -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>${e.porcentagem.toFixed(1)}% ${e.tipo==="receita"?"atingido":"usado"}</span>
                  <span>${e.porcentagem>=100?e.tipo==="receita"?"Meta atingida!":"Limite excedido!":""}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="${e.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(e.porcentagem,100)}%"></div>
                </div>
              </div>
            </div>
          `:`
            <div class="mt-3">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${e.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                <span class="font-medium ${e.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${e.totalGasto.toFixed(2)}</span>
              </div>
              ${e.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • ${e.tipo==="receita"?"Receitas":"Transações"}: R$ ${e.totalGastoTransacoes.toFixed(2)}
                      ${e.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${e.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
            </div>
          `}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${e.id}')" class="u-btn u-btn--outline mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
  <button onclick="window.deleteCategoryWithConfirmation('${e.id}', '${e.nome}')" class="u-btn u-btn--danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
  <button onclick="showCategoryHistory('${e.id}')" class="u-btn u-btn--outline mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join("")}function X(i){return i.length?i.map(n=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${n.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${n.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${n.tipo}</p>
      ${n.limite?`<p class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${n.limite.toFixed(2)}</p>`:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${n.id}')" class="u-btn u-btn--outline mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
  <button onclick="window.deleteCategoryWithConfirmation('${n.id}', '${n.nome}')" class="u-btn u-btn--danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
  <button onclick="showCategoryHistory('${n.id}')" class="u-btn u-btn--outline mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="col-span-full text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `}export{at as default,W as render,Q as renderAllCategories,G as renderCategories,X as renderFilteredCategories};
