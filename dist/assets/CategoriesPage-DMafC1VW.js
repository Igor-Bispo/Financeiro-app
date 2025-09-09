const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-BVWxnpqW.js","assets/main-DLXVHLmp.css"])))=>i.map(i=>d[i]);
import{g as G,e as D,_ as B}from"./main-BVWxnpqW.js";import{mountPeriodIndicator as j}from"./PeriodIndicator-Jgj9UKJk.js";import{a as I,r as P}from"./UIService-oYvfKA8r.js";import{loadRecorrentes as O}from"./service-DfBWNOQV.js";async function Y(n){const r=document.createElement("div");r.className="categories-page";const w=document.createElement("div");w.className="tab-header mb-6",w.innerHTML='<h2 class="tab-title-highlight">📂 Categorias</h2><div id="cat-period-indicator"></div>',r.appendChild(w);const e=document.createElement("div");e.className="categories-content",e.innerHTML=`
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
  `;try{const y=document.querySelector(".content-spacing"),$=Array.isArray(window.appState?.categories)&&window.appState.categories.length>0;if(y&&!$){const v=document.createElement("div");v.className="empty-state mt-2",v.innerHTML='<div class="empty-icon">📁</div><div class="empty-text">Nenhuma categoria cadastrada</div><div class="mt-2"><button class="u-btn u-btn--primary mobile-btn w-full" onclick="window.showAddCategoryModal && window.showAddCategoryModal()">Criar categoria</button></div>',y.appendChild(v)}}catch{}try{j("#cat-period-indicator")}catch{}r.appendChild(e),n&&(n.innerHTML="",n.appendChild(r)),await q();try{j("#cat-period-indicator")}catch{}}async function q(){try{console.log("Categories: Carregando dados...");try{await T()}catch(n){console.warn("renderCategories falhou:",n)}}catch(n){console.error("Erro ao carregar categorias:",n)}}async function T(){try{const t=Date.now();if(window.__lastCategoriesRender&&t-window.__lastCategoriesRender<300){console.log("⏱️ renderCategories chamado muito próximo do anterior, pulando...");return}window.__lastCategoriesRender=t}catch{}await W(),await z();const n=document.getElementById("app-content"),r=window.appState.categories||[],w=r.length,e=r.filter(t=>t.limite>0).length,y=r.filter(t=>t.tipo==="receita").length,$=r.filter(t=>t.tipo==="despesa").length,{year:v,month:l}=G(),p=window.appState.categories.map(t=>{const u=window.appState.transactions.filter(x=>{let o;x.createdAt&&typeof x.createdAt=="object"&&x.createdAt.seconds?o=new Date(x.createdAt.seconds*1e3):o=new Date(x.createdAt);const m=o.getFullYear(),F=o.getMonth()+1;return x.categoriaId===t.id&&x.tipo===t.tipo&&m===v&&F===l}).reduce((x,o)=>x+parseFloat(o.valor),0),h=window.appState.recorrentes.filter(x=>x.categoriaId===t.id&&x.ativa===!0);let C=0;h.forEach(x=>{window.appState.transactions.filter(m=>m.recorrenteId===x.id&&new Date(m.createdAt).getFullYear()===v&&new Date(m.createdAt).getMonth()+1===l).length>0&&(C+=parseFloat(x.valor))});const b=u+C,R=t.limite?parseFloat(t.limite):0,E=(t.tipo==="receita",R-b),S=R>0?Math.min(b/R*100,100):0;let A="bg-green-500";return S>=90?A="bg-red-500":S>=75?A="bg-yellow-500":S>=50&&(A="bg-orange-500"),{...t,totalGasto:b,totalGastoTransacoes:u,totalGastoRecorrentes:C,limite:R,saldo:E,porcentagem:S,corBarra:A}}).sort((t,i)=>i.totalGasto-t.totalGasto),d=p.filter(t=>t.limite>0&&t.totalGasto>t.limite).length,g=r.filter(t=>t.tipo==="despesa"&&Number(t.limite)>0).reduce((t,i)=>t+(Number(i.limite)||0),0)||0,c=p.filter(t=>t.tipo==="despesa").reduce((t,i)=>t+(Number(i.totalGasto)||0),0)||0,a=g-c,s=r.filter(t=>t.tipo==="receita"&&Number(t.limite)>0).reduce((t,i)=>t+(Number(i.limite)||0),0)||0,f=p.filter(t=>t.tipo==="receita").reduce((t,i)=>t+(Number(i.totalGasto)||0),0)||0,k=s-f,M=window.appState?.selectedYear||new Date().getFullYear(),_=window.appState?.selectedMonth||new Date().getMonth()+1;n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📂 Categorias</h2>
        <div id="cat-period-indicator"></div>
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
            
            <div class="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-6">
              <!-- Header do Card -->
                <div class="flex items-center justify-between mb-6">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-xl md:text-2xl font-bold">Controle de Categorias</h3>
                  </div>
                  <p class="text-sm opacity-90">${w} categorias cadastradas</p>
                  <p class="text-xs opacity-90 mt-1">Período: ${String(_).padStart(2,"0")}/${M}</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${d>0?"text-red-200":"text-green-200"}">
                    ${d}
                  </div>
                  <p class="text-xs opacity-90">${d>0?"⚠️ Alertas":"✅ Sem Alertas"}</p>
                </div>
              </div>
              
              <!-- Grid de Métricas -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📂</div>
                  <div class="text-2xl md:text-3xl font-bold">${w}</div>
                  <div class="text-sm opacity-90">Total</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">🎯</div>
                  <div class="text-2xl md:text-3xl font-bold text-blue-200">${e}</div>
                  <div class="text-sm opacity-90">Com Limite</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">💚</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">${y}</div>
                  <div class="text-sm opacity-90">Receitas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">💸</div>
                  <div class="text-2xl md:text-3xl font-bold text-red-200">${$}</div>
                  <div class="text-sm opacity-90">Despesas</div>
                </div>
              </div>

              <!-- Totais agregados de Despesas (Limite, Gasto do mês e Saldo) -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-xs opacity-90">Limite Total (Despesas)</div>
                  <div class="text-xl md:text-2xl font-bold">R$ ${g.toFixed(2)}</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-xs opacity-90">Gasto do Mês</div>
                  <div class="text-xl md:text-2xl font-bold text-red-200">R$ ${c.toFixed(2)}</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="text-xs opacity-90">Saldo</div>
                    ${a<0?'<span class="px-2 py-0.5 text-[10px] rounded-full bg-red-500/80 text-white">negativo</span>':""}
                  </div>
                  <div class="text-xl md:text-2xl font-bold ${a<0?"text-red-200":"text-green-200"}">R$ ${a.toFixed(2)}</div>
                </div>
              </div>

              <!-- Totais agregados de Receitas (Meta, Recebido do mês e Saldo) -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-xs opacity-90">Meta Total (Receitas)</div>
                  <div class="text-xl md:text-2xl font-bold">R$ ${s.toFixed(2)}</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-xs opacity-90">Recebido do Mês</div>
                  <div class="text-xl md:text-2xl font-bold text-green-200">R$ ${f.toFixed(2)}</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="text-xs opacity-90">Saldo</div>
                    ${k<0?'<span class="px-2 py-0.5 text-[10px] rounded-full bg-red-500/80 text-white">negativo</span>':""}
                  </div>
                  <div class="text-xl md:text-2xl font-bold ${k<0?"text-red-200":"text-green-200"}">R$ ${k.toFixed(2)}</div>
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
            
${r.length===0?`
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
                ${p.map(t=>{const i=t.tipo==="receita",u=t.limite>0,h=u&&t.totalGasto>t.limite;return`
                    <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${h?"ring-2 ring-red-200 dark:ring-red-800":""}">
                      <!-- Header da Categoria -->
                      <div class="bg-gradient-to-r ${i?"from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800":"from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800"} p-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style="background-color: ${t.cor||"#4F46E5"}20; color: ${t.cor||"#4F46E5"}">
                              ${i?"💰":"💸"}
                    </div>
                            <div>
                              <h3 class="font-bold text-gray-900 dark:text-gray-100 truncate">${t.nome}</h3>
                              <p class="text-sm text-gray-500 dark:text-gray-400">${i?"Receita":"Despesa"}</p>
                            </div>
                          </div>
                          ${h?'<div class="text-2xl">🚨</div>':u&&t.porcentagem>=90?'<div class="text-2xl">⚠️</div>':""}
                        </div>
                  </div>
                      
                      <!-- Conteúdo da Categoria -->
                      <div class="p-4">
                        ${u?`
                          <div class="mb-4">
                            <div class="flex justify-between items-center mb-2">
                              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Limite: R$ ${t.limite.toFixed(2)}</span>
                              <span class="text-sm font-medium ${h?"text-red-600 dark:text-red-400":t.porcentagem>=90?"text-yellow-600 dark:text-yellow-400":"text-green-600 dark:text-green-400"}">
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
                              ${h?`🚨 Excedeu em R$ ${Math.abs(t.saldo).toFixed(2)}`:`Saldo: R$ ${t.saldo.toFixed(2)}`}
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
  `;try{const t=document.querySelector(".content-spacing");if(t&&w===0){const i=document.createElement("div");i.className="empty-state mt-2",i.innerHTML='<div class="empty-icon">📁</div><div class="empty-text">Nenhuma categoria cadastrada</div><div class="mt-2"><button class="u-btn u-btn--primary mobile-btn w-full" onclick="window.showAddCategoryModal && window.showAddCategoryModal()">Criar categoria</button></div>',t.appendChild(i)}}catch{}setTimeout(()=>{try{I()}catch(t){console.warn("setupCategoryButtons falhou:",t)}try{const t=document.getElementById("add-category-btn");t&&(t.onclick=()=>window.showAddCategoryModal?.())}catch{}},100),U();try{window.__catPeriodListenerBound||(window.__catPeriodListenerBound=!0,D.on("period:changed",t=>queueMicrotask(()=>{const i=(window.location.hash||"").split("?")[0];if(i==="#/categories"){try{const u=t&&t.year||G().year,h=t&&t.month||G().month,C=`${u}-${String(h).padStart(2,"0")}`,b=new URL(window.location.href);b.hash=`${i}?ym=${C}`,history.replaceState(null,"",b.toString())}catch{}T()}})))}catch{}P();try{typeof window.deleteCategoryWithConfirmation!="function"&&(window.deleteCategoryWithConfirmation=async function(t,i="categoria"){try{if(!confirm(`Excluir "${i||"categoria"}"? Esta ação não pode ser desfeita.`))return;await(await B(()=>import("./main-BVWxnpqW.js").then(b=>b.W),__vite__mapDeps([0,1]))).deleteCategory(t);try{window.Snackbar?.show?.("Categoria excluída","success")}catch{}try{await T()}catch{}}catch(u){console.error("Falha ao excluir categoria:",u);try{window.Snackbar?.show?.("Erro ao excluir categoria","error")}catch{}}}),typeof window.editCategory!="function"&&(window.editCategory=function(t){try{const i=window.appState?.categories?.find(u=>u.id===t);i&&window.showAddCategoryModal?.(i)}catch(i){console.warn("editCategory (fallback) falhou:",i)}}),typeof window.showCategoryHistory!="function"&&(window.showCategoryHistory=function(t){try{const{year:i,month:u}=G(),C=`Histórico - ${window.appState?.categories?.find(o=>o.id===t)?.nome||t}`,b=o=>{if(!o)return null;if(typeof o?.toDate=="function")return o.toDate();if(typeof o=="object"&&o?.seconds)return new Date(o.seconds*1e3);const m=new Date(o);return isNaN(m.getTime())?null:m},R=o=>(Number.parseFloat(o||0)||0).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),x=`<div class="max-h-96 overflow-auto">${(window.appState?.transactions||[]).filter(o=>o.categoriaId===t).filter(o=>{const m=b(o.createdAt);return m?m.getFullYear()===i&&m.getMonth()+1===u:!1}).sort((o,m)=>{const F=b(o.createdAt)||0;return(b(m.createdAt)||0)-F}).slice(0,100).map(o=>{const m=b(o.createdAt),F=m?m.toLocaleDateString("pt-BR"):"-",L=o.tipo==="receita"?"+":"-",H=o.descricao&&String(o.descricao).trim()||"(Sem descrição)",N=o.tipo==="receita"?"text-green-600":"text-red-600";return`
                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div class="min-w-0">
                    <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${H}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${F}</div>
                  </div>
                  <div class="text-right font-medium ${N}">${L} R$ ${R(o.valor)}</div>
                </div>`}).join("")||'<div class="text-sm text-gray-500">Sem transações neste período</div>'}</div>`;D.emit("modal:show",{title:C,content:x})}catch(i){console.warn("showCategoryHistory (fallback) falhou:",i)}}),typeof window.migrarTransacoesAntigas!="function"&&(window.migrarTransacoesAntigas=function(){try{window.Snackbar?.show?.("Nada para migrar","info")}catch{}}),typeof window.corrigirTipoCategoria!="function"&&(window.corrigirTipoCategoria=function(){try{window.Snackbar?.show?.("Tipos de categorias verificados","info")}catch{}})}catch{}}async function W(){try{if(typeof window.loadTransactions=="function"){await window.loadTransactions();return}}catch(n){console.warn("loadTransactions fallback falhou:",n)}}async function z(){try{await O()}catch(n){console.warn("loadRecorrentes falhou:",n)}}function tt(){const n=document.getElementById("app-content");return Y(n)}function U(){try{if(typeof window.setupCategorySearch=="function"){window.setupCategorySearch();return}const n=l=>(l??"").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim(),r=(l,p)=>{if(l===p)return 0;const d=l.length,g=p.length;if(d===0)return g;if(g===0)return d;if(Math.abs(d-g)>1)return 2;const c=Array(d+1).fill(0).map(()=>Array(g+1).fill(0));for(let a=0;a<=d;a++)c[a][0]=a;for(let a=0;a<=g;a++)c[0][a]=a;for(let a=1;a<=d;a++)for(let s=1;s<=g;s++){const f=l[a-1]===p[s-1]?0:1;c[a][s]=Math.min(c[a-1][s]+1,c[a][s-1]+1,c[a-1][s-1]+f),a>1&&s>1&&l[a-1]===p[s-2]&&l[a-2]===p[s-1]&&(c[a][s]=Math.min(c[a][s],c[a-2][s-2]+1))}return c[d][g]},w=(l,p)=>{const d=n(l),g=n(p);if(!g||d.includes(g))return!0;const c=d.split(/\s+/).filter(Boolean);for(const a of c)if(Math.abs(a.length-g.length)<=1&&r(a,g)<=1)return!0;return Math.abs(d.length-g.length)<=1&&r(d,g)<=1},e=document.getElementById("category-search"),y=document.getElementById("category-search-results"),$=document.getElementById("category-search-count"),v=document.getElementById("categories-grid");if(!e||!v||e.dataset.bound==="1")return;e.dataset.bound="1",e.addEventListener("input",()=>{const l=n(e.value);if(!l){y&&y.classList.add("hidden");try{v.innerHTML=V()}catch{v.innerHTML=""}return}const p=(window.appState.categories||[]).filter(d=>{const g=d.nome||"",c=d.tipo||"",a=String(d.limite??"");return w(g,l)||w(c,l)||a.includes(l)});$&&($.textContent=String(p.length)),y&&y.classList.remove("hidden");try{v.innerHTML=J(p)}catch{v.innerHTML=""}}),e.addEventListener("keydown",l=>{l.key==="Escape"&&(e.value="",e.dispatchEvent(new Event("input")))})}catch(n){console.warn("setupCategorySearch fallback falhou:",n)}}function V(){const{year:n,month:r}=G();return window.appState.categories.map(e=>{const $=window.appState.transactions.filter(s=>{let f;s.createdAt&&typeof s.createdAt=="object"&&s.createdAt.seconds?f=new Date(s.createdAt.seconds*1e3):f=new Date(s.createdAt);const k=f.getFullYear(),M=f.getMonth()+1;return s.categoriaId===e.id&&s.tipo===e.tipo&&k===n&&M===r}).reduce((s,f)=>s+parseFloat(f.valor),0),v=window.appState.recorrentes.filter(s=>s.categoriaId===e.id&&s.ativa===!0);let l=0;v.forEach(s=>{window.appState.transactions.filter(k=>k.recorrenteId===s.id&&new Date(k.createdAt).getFullYear()===n&&new Date(k.createdAt).getMonth()+1===r).length>0&&(l+=parseFloat(s.valor))});const p=$+l,d=e.limite?parseFloat(e.limite):0,g=(e.tipo==="receita",d-p),c=d>0?Math.min(p/d*100,100):0;let a="bg-green-500";return c>=90?a="bg-red-500":c>=75?a="bg-yellow-500":c>=50&&(a="bg-orange-500"),{...e,totalGasto:p,totalGastoTransacoes:$,totalGastoRecorrentes:l,limite:d,saldo:g,porcentagem:c,corBarra:a}}).sort((e,y)=>y.totalGasto-e.totalGasto).map(e=>`
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
  `).join("")}function J(n){return n.length?n.map(r=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${r.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${r.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${r.tipo}</p>
      ${r.limite?`<p class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${r.limite.toFixed(2)}</p>`:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${r.id}')" class="u-btn u-btn--outline mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
  <button onclick="window.deleteCategoryWithConfirmation('${r.id}', '${r.nome}')" class="u-btn u-btn--danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
  <button onclick="showCategoryHistory('${r.id}')" class="u-btn u-btn--outline mobile-btn">
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
    `}export{tt as default,Y as render,V as renderAllCategories,T as renderCategories,J as renderFilteredCategories};
