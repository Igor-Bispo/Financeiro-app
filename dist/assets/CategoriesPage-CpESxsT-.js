const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-xBaVxV05.js","assets/main-6ahFnZtK.css"])))=>i.map(i=>d[i]);
import{_ as j,h as E,e as B,i as U}from"./main-xBaVxV05.js";import{mountPeriodIndicator as _}from"./PeriodIndicator-CEXDoQwb.js";import{a as W,r as V}from"./ConfigService-C9rw1B71.js";typeof window<"u"&&window.eventBus&&typeof window.eventBus.on=="function"&&window.eventBus.on("categories:updated",()=>{if((window.location.hash||"").split("?")[0]==="#/categories")try{T()}catch(i){console.warn("Falha ao renderizar categorias após atualização",i)}});async function K(s){const i=document.createElement("div");if(i.className="categories-page",!window.showAddCategoryModal)try{const{default:o}=await j(async()=>{const{default:x}=await import("./main-xBaVxV05.js").then(p=>p.a5);return{default:x}},__vite__mapDeps([0,1]));window.showAddCategoryModal=o,console.log("✅ showAddCategoryModal carregado dinamicamente")}catch(o){console.error("❌ Falha ao carregar showAddCategoryModal:",o)}const f=document.createElement("div");f.className="tab-header mb-6",f.innerHTML=`
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
      <div class="flex items-center justify-between w-full gap-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-sm">📂</span>
            </div>
            <div>
              <h1 class="text-2xl font-semibold text-gray-900 leading-tight">📂 Categorias</h1>
              <div class="flex items-center gap-1">
                <span class="text-cyan-600 dark:text-cyan-400 text-xs">Organize seus gastos</span>
              </div>
            </div>
          </div>
        </div>
        <div id="cat-period-indicator"></div>
      </div>
    </div>
  `,i.appendChild(f);const t=document.createElement("div");t.className="categories-content",t.innerHTML=`
    <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-6 gap-4">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">📁 Gerenciar Categorias</h3>
  <button onclick="window.showAddCategoryModal()" class="btn btn-primary btn-sm">
          ➕ Nova Categoria
        </button>
      </div>
      
      <div class="text-center py-8">
        <div class="text-4xl mb-4">📂</div>
        <p class="text-gray-600 dark:text-gray-400">Página de categorias em desenvolvimento</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Carregando categorias...</p>
      </div>
    </div>
  `;try{const o=document.querySelector(".content-spacing"),x=Array.isArray(window.appState?.categories)&&window.appState.categories.length>0;if(o&&!x){const p=document.createElement("div");p.className="empty-state mt-2",p.innerHTML='<div class="empty-icon">📁</div><div class="empty-text">Nenhuma categoria cadastrada</div><div class="mt-2"><button class="btn btn-primary w-full" onclick="window.showAddCategoryModal && window.showAddCategoryModal()">Criar categoria</button></div>',o.appendChild(p)}}catch{}try{console.log("🔧 Montando indicador de período em categorias"),_("#cat-period-indicator")}catch(o){console.error("❌ Erro ao montar indicador:",o)}if(i.appendChild(t),s){console.log("🔍 ANTES da limpeza - verificando indicador...");const o=s.querySelector("#cat-period-indicator");console.log("🔍 Indicador encontrado antes da limpeza:",o),s.innerHTML="",s.appendChild(i),console.log("🔍 APÓS limpeza - verificando estrutura...");const x=s.querySelector(".tab-header");if(console.log("🔍 Header encontrado:",x),x){const p=x.querySelector(".bg-white");if(console.log("🔍 Header content encontrado:",p),p){const r=p.querySelector(".flex.items-center.justify-between");console.log("🔍 Right side encontrado:",r),r&&o?(console.log("🔍 Re-adicionando indicador..."),r.appendChild(o),console.log("✅ Indicador re-adicionado com sucesso")):o?console.error("❌ Right side não encontrado"):console.log("⚠️ Indicador não existe, será criado posteriormente")}else console.error("❌ Header content não encontrado")}else console.error("❌ Header não encontrado")}await Z();try{console.log("🔧 Re-montando indicador após loadCategories"),_("#cat-period-indicator")}catch(o){console.error("❌ Erro ao re-montar indicador:",o)}}async function Z(){try{console.log("Categories: Carregando dados...");try{await T()}catch(s){console.warn("renderCategories falhou:",s)}}catch(s){console.error("Erro ao carregar categorias:",s)}}async function J(){console.log("🔄 updateCategoriesData - Atualizando dados sem re-renderizar header");try{await N(),await z();const{year:s,month:i}=E();console.log("📅 Período selecionado para atualização:",{anoAtual:s,mesAtual:i}),await X(s,i),console.log("✅ Dados das categorias atualizados sem re-renderizar header")}catch(s){console.error("❌ Erro ao atualizar dados das categorias:",s)}}function H(s,i){const f=new Date(s,i,0).getDate(),t=new Date().getDate();return Math.max(1,f-t+1)}function Q(s,i,f){const t=window.appState.transactions.filter(a=>{let d;a.createdAt&&typeof a.createdAt=="object"&&a.createdAt.seconds?d=new Date(a.createdAt.seconds*1e3):d=new Date(a.createdAt);const u=d.getFullYear(),n=d.getMonth()+1;return a.categoriaId===s.id&&a.tipo===s.tipo&&u===i&&n===f}),o=t.filter(a=>!a.recorrenteId),x=t.filter(a=>a.recorrenteId),p=o.reduce((a,d)=>a+parseFloat(d.valor),0),r=x.reduce((a,d)=>a+parseFloat(d.valor),0);return{totalGasto:p+r,totalGastoTransacoes:p,totalGastoRecorrentes:r,transacoesCategoria:o,recorrentesAplicadas:x}}async function X(s,i){console.log("🔄 updateCategoriesContent - Recalculando dados para período:",{anoAtual:s,mesAtual:i});try{const f=window.appState?.currentBudget?.id,t=window.appState?.budgets||[],o=Array.isArray(t)&&t.length>1,x=(window.appState.categories||[]).filter(r=>!f||r.budgetId===f||!o&&!r.budgetId);console.log("🔍 DEBUG Categorias disponíveis:",x.map(r=>({nome:r.nome,limite:r.limite})));const p=x.map(r=>{const y=Q(r,s,i),{totalGasto:a,totalGastoTransacoes:d,totalGastoRecorrentes:u,transacoesCategoria:n,recorrentesAplicadas:g}=y;(r.nome==="igor300"||r.nome==="salario")&&console.log("🔍 DEBUG Categoria:",{nome:r.nome,transacoesCategoria:n.length,totalGastoTransacoes:d,totalGastoRecorrentes:u,totalGasto:a,limite:r.limite,saldo:w-a,transacoesDetalhes:n.map(M=>({valor:M.valor,descricao:M.descricao}))});const w=Number(r.limite)||0,k=w-a,C=w>0?Math.min(a/w*100,100):0;let A="bg-green-500";return C>=90?A="bg-red-500":C>=75?A="bg-yellow-500":C>=50&&(A="bg-orange-500"),{...r,totalGasto:a,totalGastoTransacoes:d,totalGastoRecorrentes:u,limite:w,saldo:k,porcentagem:C,corBarra:A}}).sort((r,y)=>y.totalGasto-r.totalGasto);ee(p,s,i),te(p,s,i),console.log("✅ Conteúdo das categorias atualizado com sucesso")}catch(f){console.error("❌ Erro ao atualizar conteúdo das categorias:",f)}}function ee(s,i,f){console.log("🔄 Atualizando cards das categorias..."),s.forEach(t=>{const o=document.querySelector(`[data-category-id="${t.id}"]`);if(o){const x=o.querySelector(".category-value"),p=o.querySelector(".category-percentage"),r=o.querySelector(".category-progress-bar");x&&(x.textContent=`R$ ${t.totalGasto.toFixed(2)}`),p&&(p.textContent=`${t.porcentagem.toFixed(1)}%`),r&&(r.style.width=`${t.porcentagem}%`,r.className=`category-progress-bar ${t.corBarra}`);const y=o.querySelector(".text-sm.text-gray-500");if(y){const d=t.tipo==="receita";y.textContent=`${d?"Receita":"Despesa"} • ${String(f).padStart(2,"0")}/${i}`}const a=o.querySelector(".text-blue-600");if(a&&t.limite>0&&t.saldo>0){const d=H(i,f);a.textContent=`💡 Meta diária: R$ ${(t.saldo/d).toFixed(2)}/dia`}}})}function te(s,i,f){console.log("📊 Atualizando estatísticas para período:",{anoAtual:i,mesAtual:f});const t=s.filter(p=>p.limite>0&&p.totalGasto>p.limite).length,o=document.querySelector(".categories-alert-count");o&&(o.textContent=t,o.className=`categories-alert-count ${t>0?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}`),document.querySelectorAll("[data-period-text]").forEach(p=>{p.textContent=`${String(f).padStart(2,"0")}/${i}`})}async function T(){console.log("🚀 renderCategories chamada - INÍCIO"),console.log("📅 Período atual:",E());try{const e=Date.now();if(window.__lastCategoriesRender&&e-window.__lastCategoriesRender<300){console.log("⏱️ renderCategories chamado muito próximo do anterior, pulando...");return}window.__lastCategoriesRender=e}catch{}await N(),await z();const s=document.getElementById("app-content"),i=window.appState?.currentBudget?.id,f=window.appState?.budgets||[],t=Array.isArray(f)&&f.length>1,o=(window.appState.categories||[]).filter(e=>!i||e.budgetId===i||!t&&!e.budgetId),x=o.length,p=o.filter(e=>e.limite>0).length,r=o.filter(e=>e.tipo==="receita").length,y=o.filter(e=>e.tipo==="despesa").length,{year:a,month:d}=E();console.log("📅 Período selecionado para categorias:",{anoAtual:a,mesAtual:d});const u=window.appState.categories.map(e=>{const c=window.appState.transactions.filter(v=>{let m;v.createdAt&&typeof v.createdAt=="object"&&v.createdAt.seconds?m=new Date(v.createdAt.seconds*1e3):m=new Date(v.createdAt);const h=m.getFullYear(),D=m.getMonth()+1;return v.categoriaId===e.id&&v.tipo===e.tipo&&h===a&&D===d}),l=c.reduce((v,m)=>v+parseFloat(m.valor),0),$=window.appState.recorrentes.filter(v=>v.categoriaId===e.id&&v.ativa===!0);let R=0;$.forEach(v=>{window.appState.transactions.filter(h=>h.recorrenteId===v.id&&new Date(h.createdAt).getFullYear()===a&&new Date(h.createdAt).getMonth()+1===d).length>0&&(R+=parseFloat(v.valor))});const b=l+R,S=e.limite?parseFloat(e.limite):0;(e.nome==="igor300"||e.nome==="salario")&&console.log("🔍 DEBUG Categoria:",{nome:e.nome,transacoesCategoria:c.length,totalGastoTransacoes:l,totalGastoRecorrentes:R,totalGasto:b,limite:e.limite,saldo:S-b,transacoesDetalhes:c.map(v=>({valor:v.valor,descricao:v.descricao}))});const L=(e.tipo==="receita",S-b),G=S>0?Math.min(b/S*100,100):0;let F="bg-green-500";return G>=90?F="bg-red-500":G>=75?F="bg-yellow-500":G>=50&&(F="bg-orange-500"),{...e,totalGasto:b,totalGastoTransacoes:l,totalGastoRecorrentes:R,limite:S,saldo:L,porcentagem:G,corBarra:F}}).sort((e,c)=>c.totalGasto-e.totalGasto),n=u.filter(e=>e.limite>0&&e.totalGasto>e.limite).length,g=o.filter(e=>e.tipo==="despesa"&&Number(e.limite)>0).reduce((e,c)=>e+(Number(c.limite)||0),0)||0,w=u.filter(e=>e.tipo==="despesa").reduce((e,c)=>e+(Number(c.totalGasto)||0),0)||0,k=g-w,C=o.filter(e=>e.tipo==="receita"&&Number(e.limite)>0).reduce((e,c)=>e+(Number(c.limite)||0),0)||0,A=u.filter(e=>e.tipo==="receita").reduce((e,c)=>e+(Number(c.totalGasto)||0),0)||0,M=C-A,P=window.appState?.selectedYear||new Date().getFullYear(),q=window.appState?.selectedMonth||new Date().getMonth()+1;s.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between w-full gap-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">📂</span>
                </div>
                <div>
                  <h2 class="text-gray-800 dark:text-white font-semibold text-base">Categorias</h2>
                  <div class="flex items-center gap-1">
                    <span class="text-cyan-600 dark:text-cyan-400 text-xs">${o.length} categorias</span>
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
          <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Visão Geral</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
              <!-- Header Compacto -->
              <div class="flex items-center justify-between mb-4 gap-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span class="text-xl">📊</span>
                    Controle de Categorias
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">${x} categorias • <span data-period-text>${String(q).padStart(2,"0")}/${P}</span></p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold categories-alert-count ${n>0?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}">
                    ${n}
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${n>0?"Alertas":"OK"}</p>
                </div>
              </div>
              
              <!-- Métricas Compactas -->
              <div class="grid grid-cols-4 gap-3 mb-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">📂</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">${x}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">🎯</div>
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${p}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Limite</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💚</div>
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">${r}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Receitas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💸</div>
                  <div class="text-lg font-bold text-red-600 dark:text-red-400">${y}</div>
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
                      <span class="font-medium text-gray-800 dark:text-gray-200">R$ ${g.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Gasto:</span>
                      <span class="font-medium text-red-600 dark:text-red-400">R$ ${w.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                      <span class="text-gray-600 dark:text-gray-400">Saldo:</span>
                      <span class="font-bold ${k<0?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}">
                        R$ ${k.toFixed(2)}
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
                      <span class="font-medium text-gray-800 dark:text-gray-200">R$ ${C.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Recebido:</span>
                      <span class="font-medium text-green-600 dark:text-green-400">R$ ${A.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                      <span class="text-gray-600 dark:text-gray-400">Saldo:</span>
                      <span class="font-bold ${M<0?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}">
                        R$ ${M.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 2: AÇÕES E FILTROS ========== -->
          <div class="mb-12">
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
                    <button onclick="window.migrarTransacoesAntigas()" class="btn btn-outline btn-sm">
                      🔄 Migrar
          </button>
                    <button onclick="window.corrigirTipoCategoria()" class="btn btn-outline btn-sm">
                      🔧 Corrigir
          </button>
                    <button id="add-category-btn" class="btn btn-primary btn-sm">
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
          <div class="mb-12" id="categories-grid">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Todas as Categorias</h2>
              </div>
            
${o.length===0?`
              <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="text-center py-12">
                  <div class="text-6xl mb-4">📂</div>
                  <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
                  <div class="text-gray-600 dark:text-gray-400 mb-4">Crie sua primeira categoria para organizar suas finanças</div>
                  <button onclick="window.showAddCategoryModal()" class="btn btn-primary w-full">
                    📂 Criar Primeira Categoria
                  </button>
                  </div>
                  </div>
            `:`
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${u.map(e=>{const c=e.tipo==="receita",l=e.limite>0,$=l&&e.totalGasto>e.limite;return`
                    <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${$?"ring-2 ring-red-200 dark:ring-red-800":""}" data-category-id="${e.id}">
                      <!-- Header da Categoria -->
                      <div class="bg-gradient-to-r ${c?"from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800":"from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800"} p-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style="background-color: ${e.cor||"#4F46E5"}20; color: ${e.cor||"#4F46E5"}">
                              ${c?"💰":"💸"}
                    </div>
                            <div>
                              <h3 class="font-bold text-gray-900 dark:text-gray-100 truncate">${e.nome}</h3>
                              <p class="text-sm text-gray-500 dark:text-gray-400">${c?"Receita":"Despesa"} • ${String(d).padStart(2,"0")}/${a}</p>
                            </div>
                          </div>
                          ${$?'<div class="text-2xl">🚨</div>':l&&e.porcentagem>=90?'<div class="text-2xl">⚠️</div>':""}
                        </div>
                  </div>
                      
                      <!-- Conteúdo da Categoria -->
                      <div class="p-4">
                        ${l?`
                          <div class="mb-4">
                            <div class="flex justify-between items-center mb-2">
                              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Limite: R$ ${e.limite.toFixed(2)}</span>
                              <span class="text-sm font-medium category-percentage ${$?"text-red-600 dark:text-red-400":e.porcentagem>=90?"text-yellow-600 dark:text-yellow-400":"text-green-600 dark:text-green-400"}">
                                ${e.porcentagem.toFixed(1)}%
                              </span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div class="h-2 rounded-full category-progress-bar ${e.corBarra} transition-all duration-300" style="width: ${e.porcentagem}%"></div>
                            </div>
                            <div class="flex justify-between items-center mt-2 text-xs text-gray-600 dark:text-gray-400">
                              <span>R$ 0</span>
                              <span>R$ ${e.limite.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div class="space-y-2 mb-4">
                            ${e.totalGasto>0?`
                              <div class="flex justify-between items-center">
                                <span class="text-gray-600 dark:text-gray-400">${e.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                                <span class="font-medium category-value ${e.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${e.totalGasto.toFixed(2)}</span>
                              </div>
                              <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                                ${e.totalGastoTransacoes>0&&e.totalGastoRecorrentes>0?`
                                  • ${e.totalGastoTransacoes>0?"Transações":"0 transações"}: R$ ${e.totalGastoTransacoes.toFixed(2)}<br>
                                  • ${e.totalGastoRecorrentes>0?"Recorrentes":"0 recorrentes"}: R$ ${e.totalGastoRecorrentes.toFixed(2)}
                                `:e.totalGastoTransacoes>0?`
                                  • Transações: R$ ${e.totalGastoTransacoes.toFixed(2)}
                                `:`
                                  • Recorrentes: R$ ${e.totalGastoRecorrentes.toFixed(2)}
                                `}
                              </div>
                            `:`
                              <div class="text-center text-gray-500 dark:text-gray-400 py-2">
                                <span class="text-sm">Nenhum ${e.tipo==="receita"?"receita":"gasto"} este mês</span>
                              </div>
                            `}
                            
                            ${l&&e.saldo>0?`
                              <div class="text-xs text-gray-500 dark:text-gray-400">
                                ${$?`🚨 Excedeu em R$ ${Math.abs(e.saldo).toFixed(2)}`:`Saldo: R$ ${e.saldo.toFixed(2)}`}
                              </div>
                              <div class="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                💡 Meta diária: R$ ${(e.saldo/H(a,d)).toFixed(2)}/dia
                              </div>
                            `:""}
                          </div>
                        `:`
                          <div class="space-y-2 mb-4">
                            <div class="flex justify-between items-center">
                              <span class="text-gray-600 dark:text-gray-400">${e.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                              <span class="font-medium category-value ${e.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${e.totalGasto.toFixed(2)}</span>
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
                          <button onclick="editCategory('${e.id}')" class="btn btn-outline btn-sm">
                            <span class="icon-standard">✏️</span>
                            <span class="hidden sm:inline">Editar</span>
                          </button>
                          <button onclick="window.deleteCategoryWithConfirmation('${e.id}', '${e.nome}')" class="btn btn-danger btn-sm">
                            <span class="icon-standard">🗑️</span>
                            <span class="hidden sm:inline">Excluir</span>
                          </button>
                          <button onclick="showCategoryHistory('${e.id}')" class="btn btn-outline btn-sm">
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
  `;try{const e=document.querySelector(".content-spacing");if(e&&x===0){const c=document.createElement("div");c.className="empty-state mt-2",c.innerHTML='<div class="empty-icon">📁</div><div class="empty-text">Nenhuma categoria cadastrada</div><div class="mt-2"><button class="btn btn-primary w-full" onclick="window.showAddCategoryModal && window.showAddCategoryModal()">Criar categoria</button></div>',e.appendChild(c)}}catch{}setTimeout(()=>{try{W()}catch(e){console.warn("setupCategoryButtons falhou:",e)}try{const e=document.getElementById("add-category-btn");e&&(e.onclick=()=>window.showAddCategoryModal?.())}catch{}},100),ae();try{window.__catPeriodListenerBound||(window.__catPeriodListenerBound=!0,B.on("period:changed",e=>queueMicrotask(()=>{const c=(window.location.hash||"").split("?")[0];if(c==="#/categories"){try{const l=e&&e.year||E().year,$=e&&e.month||E().month,R=`${l}-${String($).padStart(2,"0")}`,b=new URL(window.location.href);b.hash=`${c}?ym=${R}`,history.replaceState(null,"",b.toString())}catch{}console.log("🔄 Período mudou, verificando se deve re-renderizar...");try{const l=document.getElementById("app-content");if(console.log("🔍 Conteúdo da página atual:",l?l.innerHTML.substring(0,200)+"...":"null"),l&&(l.innerHTML.includes("📂 Categorias")||l.innerHTML.includes("cat-period-indicator")||l.innerHTML.includes("categories-page")||l.querySelector("#cat-period-indicator")!==null)){console.log("✅ Página de categorias já carregada, ATUALIZANDO dados do período"),console.log("🎯 Atualizando apenas os dados sem re-renderizar header"),J();return}else console.log("⚠️ Página de categorias não encontrada, re-renderizando...")}catch(l){console.warn("Erro ao verificar página atual:",l)}console.log("🚀 Chamando renderCategories()..."),T()}})))}catch{}V();try{typeof window.deleteCategoryWithConfirmation!="function"&&(window.deleteCategoryWithConfirmation=async function(e,c="categoria"){try{const l=c||"categoria";let $=!1;if(typeof window.confirmDelete=="function"?$=await window.confirmDelete(l,"categoria"):typeof window.showConfirmationModal=="function"?$=await new Promise(b=>{window.showConfirmationModal({title:"Excluir Categoria",message:`Tem certeza que deseja excluir "${l}"? Esta ação não pode ser desfeita.`,confirmText:"Sim, excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>b(!0),onCancel:()=>b(!1)})}):$=confirm(`Excluir "${l}"? Esta ação não pode ser desfeita.`),!$)return;await(await j(()=>import("./main-xBaVxV05.js").then(b=>b.a2),__vite__mapDeps([0,1]))).deleteCategory(e);try{window.Snackbar?.show?.("Categoria excluída","success")}catch{}try{await T()}catch{}}catch(l){console.error("Falha ao excluir categoria:",l);try{window.Snackbar?.show?.("Erro ao excluir categoria","error")}catch{}}}),typeof window.editCategory!="function"&&(window.editCategory=function(e){console.log("🔧 editCategory chamada com ID:",e);try{const c=window.appState?.categories?.find(l=>l.id===e);console.log("🔧 Categoria encontrada:",c),console.log("🔧 window.showAddCategoryModal disponível:",typeof window.showAddCategoryModal),c?window.showAddCategoryModal?(console.log("✅ Chamando showAddCategoryModal"),window.showAddCategoryModal(c)):(console.log("🔄 showAddCategoryModal não disponível, tentando carregar..."),j(()=>import("./main-xBaVxV05.js").then(l=>l.a5),__vite__mapDeps([0,1])).then(l=>{console.log("✅ Modal carregado dinamicamente"),l.default&&(window.showAddCategoryModal=l.default,l.default(c))}).catch(l=>{console.error("❌ Falha ao carregar modal:",l),window.Snackbar&&window.Snackbar.show("Erro ao abrir modal de edição","error")})):(console.error("❌ Categoria não encontrada:",e),window.Snackbar&&window.Snackbar.show("Categoria não encontrada","error"))}catch(c){console.warn("editCategory (fallback) falhou:",c),window.Snackbar&&window.Snackbar.show("Erro ao editar categoria","error")}}),typeof window.showCategoryHistory!="function"&&(window.showCategoryHistory=function(e){try{const{year:c,month:l}=E(),R=`Histórico - ${window.appState?.categories?.find(m=>m.id===e)?.nome||e}`,b=m=>{if(!m)return null;if(typeof m?.toDate=="function")return m.toDate();if(typeof m=="object"&&m?.seconds)return new Date(m.seconds*1e3);const h=new Date(m);return isNaN(h.getTime())?null:h},S=m=>(Number.parseFloat(m||0)||0).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),v=`<div class="max-h-96 overflow-auto">${(window.appState?.transactions||[]).filter(m=>m.categoriaId===e).filter(m=>{const h=b(m.createdAt);return h?h.getFullYear()===c&&h.getMonth()+1===l:!1}).sort((m,h)=>{const D=b(m.createdAt)||0;return(b(h.createdAt)||0)-D}).slice(0,100).map(m=>{const h=b(m.createdAt),D=h?h.toLocaleDateString("pt-BR"):"-",I=m.tipo==="receita"?"+":"-",O=m.descricao&&String(m.descricao).trim()||"(Sem descrição)",Y=m.tipo==="receita"?"text-green-600":"text-red-600";return`
                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div class="min-w-0">
                    <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${O}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${D}</div>
                  </div>
                  <div class="text-right font-medium ${Y}">${I} R$ ${S(m.valor)}</div>
                </div>`}).join("")||'<div class="text-sm text-gray-500">Sem transações neste período</div>'}</div>`;B.emit("modal:show",{title:R,content:v})}catch(c){console.warn("showCategoryHistory (fallback) falhou:",c)}}),typeof window.migrarTransacoesAntigas!="function"&&(window.migrarTransacoesAntigas=function(){try{window.Snackbar?.show?.("Nada para migrar","info")}catch{}}),typeof window.corrigirTipoCategoria!="function"&&(window.corrigirTipoCategoria=function(){try{window.Snackbar?.show?.("Tipos de categorias verificados","info")}catch{}})}catch{}}async function N(){try{if(typeof window.loadTransactions=="function"){await window.loadTransactions();return}}catch(s){console.warn("loadTransactions fallback falhou:",s)}}async function z(){try{await U()}catch(s){console.warn("loadRecorrentes falhou:",s)}}function de(){const s=document.getElementById("app-content");return K(s)}function ae(){try{if(typeof window.setupCategorySearch=="function"){window.setupCategorySearch();return}const s=r=>(r??"").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim(),i=(r,y)=>{if(r===y)return 0;const a=r.length,d=y.length;if(a===0)return d;if(d===0)return a;if(Math.abs(a-d)>1)return 2;const u=Array(a+1).fill(0).map(()=>Array(d+1).fill(0));for(let n=0;n<=a;n++)u[n][0]=n;for(let n=0;n<=d;n++)u[0][n]=n;for(let n=1;n<=a;n++)for(let g=1;g<=d;g++){const w=r[n-1]===y[g-1]?0:1;u[n][g]=Math.min(u[n-1][g]+1,u[n][g-1]+1,u[n-1][g-1]+w),n>1&&g>1&&r[n-1]===y[g-2]&&r[n-2]===y[g-1]&&(u[n][g]=Math.min(u[n][g],u[n-2][g-2]+1))}return u[a][d]},f=(r,y)=>{const a=s(r),d=s(y);if(!d||a.includes(d))return!0;const u=a.split(/\s+/).filter(Boolean);for(const n of u)if(Math.abs(n.length-d.length)<=1&&i(n,d)<=1)return!0;return Math.abs(a.length-d.length)<=1&&i(a,d)<=1},t=document.getElementById("category-search"),o=document.getElementById("category-search-results"),x=document.getElementById("category-search-count"),p=document.getElementById("categories-grid");if(!t||!p||t.dataset.bound==="1")return;t.dataset.bound="1",t.addEventListener("input",()=>{const r=s(t.value);if(!r){o&&o.classList.add("hidden");try{p.innerHTML=oe()}catch{p.innerHTML=""}return}const y=(window.appState.categories||[]).filter(a=>{const d=a.nome||"",u=a.tipo||"",n=String(a.limite??"");return f(d,r)||f(u,r)||n.includes(r)});x&&(x.textContent=String(y.length)),o&&o.classList.remove("hidden");try{p.innerHTML=re(y)}catch{p.innerHTML=""}}),t.addEventListener("keydown",r=>{r.key==="Escape"&&(t.value="",t.dispatchEvent(new Event("input")))})}catch(s){console.warn("setupCategorySearch fallback falhou:",s)}}function oe(){const{year:s,month:i}=E();return window.appState.categories.map(t=>{const o=window.appState.transactions.filter(g=>{let w;g.createdAt&&typeof g.createdAt=="object"&&g.createdAt.seconds?w=new Date(g.createdAt.seconds*1e3):w=new Date(g.createdAt);const k=w.getFullYear(),C=w.getMonth()+1;return g.categoriaId===t.id&&g.tipo===t.tipo&&k===s&&C===i}),x=o.reduce((g,w)=>g+parseFloat(w.valor),0),p=window.appState.recorrentes.filter(g=>g.categoriaId===t.id&&g.ativa===!0);let r=0;p.forEach(g=>{window.appState.transactions.filter(k=>k.recorrenteId===g.id&&new Date(k.createdAt).getFullYear()===s&&new Date(k.createdAt).getMonth()+1===i).length>0&&(r+=parseFloat(g.valor))});const y=x+r,a=t.limite?parseFloat(t.limite):0;(t.nome==="igor300"||t.nome==="salario")&&console.log("🔍 DEBUG Categoria:",{nome:t.nome,transacoesCategoria:o.length,totalGastoTransacoes:x,totalGastoRecorrentes:r,totalGasto:y,limite:t.limite,saldo:a-y,transacoesDetalhes:o.map(g=>({valor:g.valor,descricao:g.descricao}))});const d=(t.tipo==="receita",a-y),u=a>0?Math.min(y/a*100,100):0;let n="bg-green-500";return u>=90?n="bg-red-500":u>=75?n="bg-yellow-500":u>=50&&(n="bg-orange-500"),{...t,totalGasto:y,totalGastoTransacoes:x,totalGastoRecorrentes:r,limite:a,saldo:d,porcentagem:u,corBarra:n}}).sort((t,o)=>o.totalGasto-t.totalGasto).map(t=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${t.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${t.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${t.tipo}</p>
      
      ${t.limite>0?`
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${t.limite.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${t.tipo==="receita"?"Receita":"Gasto"}:</span>
                <span class="font-medium ${t.tipo==="receita"?"text-green-600":t.totalGasto>t.limite?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${t.totalGasto.toFixed(2)}</span>
              </div>
              ${t.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${t.totalGastoTransacoes.toFixed(2)}
                      ${t.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${t.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${t.tipo==="receita"?"Falta para meta":"Saldo"}:</span>
                <span class="font-medium ${t.tipo==="receita"?t.saldo<=0?"text-green-600":t.saldo<t.limite*.25?"text-yellow-600":"text-red-600":t.saldo<0?"text-red-600":t.saldo<t.limite*.25?"text-yellow-600":"text-green-600"}">R$ ${t.saldo.toFixed(2)}</span>
              </div>
              
              <!-- Barra de Progresso -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>${t.porcentagem.toFixed(1)}% ${t.tipo==="receita"?"atingido":"usado"}</span>
                  <span>${t.porcentagem>=100?t.tipo==="receita"?"Meta atingida!":"Limite excedido!":""}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="${t.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(t.porcentagem,100)}%"></div>
                </div>
              </div>
            </div>
          `:`
            <div class="mt-3">
              <div class="flex justify-between text-xs md:text-sm">
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
        <button onclick="editCategory('${t.id}')" class="btn btn-outline btn-sm">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
  <button onclick="window.deleteCategoryWithConfirmation('${t.id}', '${t.nome}')" class="btn btn-danger btn-sm">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
  <button onclick="showCategoryHistory('${t.id}')" class="btn btn-outline btn-sm">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join("")}function re(s){return s.length?s.map(i=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${i.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${i.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${i.tipo}</p>
      ${i.limite?`<p class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${i.limite.toFixed(2)}</p>`:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${i.id}')" class="btn btn-outline btn-sm">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
  <button onclick="window.deleteCategoryWithConfirmation('${i.id}', '${i.nome}')" class="btn btn-danger btn-sm">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
  <button onclick="showCategoryHistory('${i.id}')" class="btn btn-outline btn-sm">
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
    `}export{de as default,K as render,oe as renderAllCategories,T as renderCategories,re as renderFilteredCategories};
