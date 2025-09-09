const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/showAddTransactionModal-C755oCIJ.js","assets/main-BVWxnpqW.js","assets/main-DLXVHLmp.css","assets/Snackbar-C1E5NQ3k.js","assets/snackbarPrefs-BEdSEys5.js"])))=>i.map(i=>d[i]);
import{_ as L,e as j,g as I}from"./main-BVWxnpqW.js";import{mountPeriodIndicator as O}from"./PeriodIndicator-Jgj9UKJk.js";import{s as W,r as V}from"./UIService-oYvfKA8r.js";import M from"./perf-tobPnqr4.js";function Q(){try{if(typeof window.setupTransactionSearch=="function"){window.setupTransactionSearch();return}const t=e=>(e??"").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim(),a=(e,d)=>{if(e===d)return 0;const p=e.length,f=d.length;if(p===0)return f;if(f===0)return p;if(Math.abs(p-f)>1)return 2;const u=Array(p+1).fill(0).map(()=>Array(f+1).fill(0));for(let i=0;i<=p;i++)u[i][0]=i;for(let i=0;i<=f;i++)u[0][i]=i;for(let i=1;i<=p;i++)for(let o=1;o<=f;o++){const m=e[i-1]===d[o-1]?0:1;u[i][o]=Math.min(u[i-1][o]+1,u[i][o-1]+1,u[i-1][o-1]+m),i>1&&o>1&&e[i-1]===d[o-2]&&e[i-2]===d[o-1]&&(u[i][o]=Math.min(u[i][o],u[i-2][o-2]+1))}return u[p][f]},c=(e,d)=>{const p=t(e),f=t(d);if(!f||p.includes(f))return!0;const u=p.split(/\s+/).filter(Boolean);for(const i of u)if(Math.abs(i.length-f.length)<=1&&a(i,f)<=1)return!0;return Math.abs(p.length-f.length)<=1&&a(p,f)<=1},r=document.getElementById("transaction-search"),s=document.getElementById("transaction-search-count"),l=document.getElementById("transaction-search-results"),n=document.getElementById("transactions-list");if(!r||!n||r.dataset.bound==="1")return;r.dataset.bound="1",r.addEventListener("input",()=>{r._debounceTimer&&clearTimeout(r._debounceTimer),r._debounceTimer=setTimeout(async()=>{const e=t(r.value);if(!e){l&&l.classList.add("hidden");try{n.innerHTML=P()}catch{n.innerHTML=""}return}const{year:d,month:p}=I(),f=(window.appState.transactions||[]).filter(u=>{let i;if(u?.createdAt&&typeof u.createdAt=="object"&&u.createdAt.seconds?i=new Date(u.createdAt.seconds*1e3):i=new Date(u.createdAt),!(i&&i.getFullYear&&i.getFullYear()===d&&i.getMonth()+1===p))return!1;const m=u.descricao||"",y=(window.appState.categories||[]).find(h=>h.id===u.categoriaId)?.nome||"",w=String(u.valor??"");return c(m,e)||c(y,e)||w.includes(e)});s&&(s.textContent=String(f.length)),l&&l.classList.remove("hidden");try{n.innerHTML=rt(f)}catch{n.innerHTML=""}},150)}),r.addEventListener("keydown",e=>{e.key==="Escape"&&(r.value="",r.dispatchEvent(new Event("input")))})}catch(t){console.warn("setupTransactionSearch fallback falhou:",t)}}async function X(t){const a=document.createElement("div");a.className="transactions-page";const c=document.createElement("div");c.className="tab-header mb-6",c.innerHTML='<h2 class="tab-title-highlight">💸 Transações</h2><div id="tx-period-indicator"></div>',a.appendChild(c);const r=document.createElement("div");r.className="transactions-content",r.innerHTML=`
  <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">📋 Lista de Transações</h3>
  <button onclick="window.showAddTransactionModal()" class="u-btn u-btn--primary mobile-btn">
          ➕ Nova Transação
        </button>
      </div>
      
      <div class="text-center py-8">
        <div class="text-4xl mb-4">💸</div>
        <p class="text-gray-600 dark:text-gray-400">Página de transações em desenvolvimento</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Carregando transações...</p>
      </div>
    </div>
  `;try{const{year:s,month:l}=I(),n=`${s}-${String(l).padStart(2,"0")}`;if(!document.querySelector(`#month-${n}`)){const d=document.getElementById("transactions-list");d&&d.insertAdjacentHTML("afterbegin",R(n,[]))}}catch{}a.appendChild(r),t&&(t.innerHTML="",t.appendChild(a)),await Z();try{O("#tx-period-indicator")}catch{}}async function Z(){try{console.log("Transactions: Carregando dados...");try{_()}catch(t){console.warn("renderTransactions falhou:",t)}}catch(t){console.error("Erro ao carregar transações:",t)}}function _(){const t=Date.now(),a=()=>{try{if(typeof window<"u"&&typeof window.getSelectedPeriod=="function"){const o=window.getSelectedPeriod();if(o&&typeof o.year=="number"&&typeof o.month=="number")return o}}catch{}return I()};try{const o=Date.now();if(window.__lastTransactionsRender&&o-window.__lastTransactionsRender<300){console.log("⏱️ renderTransactions chamado muito próximo do anterior, pulando...");return}window.__lastTransactionsRender=o}catch{}const c=document.getElementById("app-content");try{lt()}catch{}const r=window.appState.transactions||[],{year:s,month:l}=a(),n=`${s}-${String(l).padStart(2,"0")}`,e=r.filter(o=>F(o)===n),d=e.filter(o=>o.tipo==="receita").reduce((o,m)=>o+parseFloat(m.valor),0),p=e.filter(o=>o.tipo==="despesa").reduce((o,m)=>o+parseFloat(m.valor),0),f=d-p,u=e.length,i={};e.forEach(o=>{const m=D(o)||(o.createdAt&&o.createdAt.toDate?o.createdAt.toDate():new Date(o.createdAt)),g=`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`;i[g]||(i[g]=[]),i[g].push(o)}),c.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📋 Transações</h2>
        <div id="tx-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          
          
          <!-- ========== SEÇÃO 1: RESUMO ANALÍTICO ========== -->
      <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
  <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💰 Resumo</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-500 via-green-500 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-6">
              <!-- Header do Card -->
        <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold">Visão Geral</h3>
          <p class="text-sm opacity-90">${u} transações registradas</p>
          <p class="text-xs opacity-90 mt-1">Período: ${String(l).padStart(2,"0")}/${s}</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${f>=0?"text-green-200":"text-red-200"}">
                    R$ ${f.toFixed(2)}
                  </div>
                  <p class="text-xs opacity-90">${f>=0?"✓ Saldo Positivo":"⚠️ Saldo Negativo"}</p>
                </div>
              </div>
              
              <!-- Grid de Métricas -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">💚</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">R$ ${d.toFixed(2)}</div>
                  <div class="text-sm opacity-90">Receitas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">💸</div>
                  <div class="text-2xl md:text-3xl font-bold text-red-200">R$ ${p.toFixed(2)}</div>
                  <div class="text-sm opacity-90">Despesas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📊</div>
                  <div class="text-2xl md:text-3xl font-bold">${u}</div>
                  <div class="text-sm opacity-90">Transações</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 2: AÇÕES E FILTROS ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Filtros</h2>
            </div>
            
            <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Transações</h3>
                  <div class="flex gap-2">
                    <button id="add-transaction-btn" class="u-btn u-btn--primary mobile-btn">
                      ➕ Nova Transação
            </button>
                    <button id="voice-btn" class="u-btn u-btn--outline mobile-btn">
                      🎤 Voz
            </button>
                  </div>
                </div>
          </div>
          
          <!-- Filtro de pesquisa -->
              <div class="p-4">
            <div class="relative">
      <input 
                type="text" 
                id="transaction-search" 
                    placeholder="🔍 Pesquisar por descrição, categoria ou valor..." 
        class="u-input w-full pl-12"
              />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="text-gray-400 text-lg">🔍</span>
              </div>
            </div>
            <div id="transaction-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="transaction-search-count">0</span> transação(ões) encontrada(s)
                </div>
              </div>
            </div>
          </div>
          
          <!-- ========== SEÇÃO 3: LISTA DE TRANSAÇÕES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Histórico</h2>
            </div>

            <!-- Indicador de período padronizado movido para o cabeçalho -->
            ${tt()}
            
            <div id="transactions-list">${P()}</div>
            ${e.length===0?`
              <div class="empty-state mt-4">
                <div class="empty-icon">🧾</div>
                <div class="empty-text">Sem transações neste período</div>
                <div class="mt-2"><button class="u-btn u-btn--primary mobile-btn w-full" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar transação</button></div>
              </div>`:""}
          </div>
        </div>
      </div>
    </div>
  `;try{M.track("transactions:render:summary",{durationMs:Date.now()-t,total:u,month:l,year:s})}catch{}try{if(M.isEnabled()){const o=document.createElement("div");o.className="mt-4";const m=`${s}-${String(l).padStart(2,"0")}`,g=M.getLog(),y=g.filter(b=>b.event==="transactions:render:summary"),h=y[0]?.durationMs||null,$=y.slice(0,10),x=$.length?Math.round($.reduce((b,K)=>b+(K.durationMs||0),0)/$.length):null,v=g.find(b=>b.event==="transactions:virtualized:init"&&b.ym===m),S=g.find(b=>b.event==="transactions:virtualized:loadMore"&&b.ym===m),N=`
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs text-gray-700 dark:text-gray-300">
          <div class="font-semibold mb-1">Métricas (local)</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <div class="text-gray-500">Último render</div>
              <div>${h!==null?h+" ms":"—"}</div>
            </div>
            <div>
              <div class="text-gray-500">Média (10)</div>
              <div>${x!==null?x+" ms":"—"}</div>
            </div>
            <div>
              <div class="text-gray-500">Período</div>
              <div>${m}</div>
            </div>
          </div>
          <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <div class="text-gray-500">Inicial virtualizado</div>
              <div>${v?`${v.rendered}/${v.keys} grupos • chunk ${v.chunk} • ${v.durationMs} ms`:"—"}</div>
            </div>
            <div>
              <div class="text-gray-500">Último loadMore</div>
              <div>${S?`+${S.added} • nextIndex ${S.nextIndex} • ${S.durationMs} ms`:"—"}</div>
            </div>
          </div>
        </div>`;o.innerHTML=N;const k=document.querySelector(".content-spacing");k?k.appendChild(o):c.appendChild(o)}}catch{}try{J(n)}catch{}try{O("#tx-period-indicator")}catch{}try{typeof window.toggleDayGroup!="function"&&(window.toggleDayGroup=st),typeof window.expandAllDays!="function"&&(window.expandAllDays=it),typeof window.collapseAllDays!="function"&&(window.collapseAllDays=dt),typeof window.loadMonthSection!="function"&&(window.loadMonthSection=ot),typeof window.loadAllOlderMonths!="function"&&(window.loadAllOlderMonths=ct),typeof window.loadMoreDayGroups!="function"&&(window.loadMoreDayGroups=G)}catch{}try{typeof window.editTransaction!="function"&&(window.editTransaction=async function(o){try{const m=(window.appState?.transactions||[]).find(g=>g.id===o);if(!m){window.Snackbar&&window.Snackbar({message:"Transação não encontrada",type:"error"});return}await L(()=>import("./showAddTransactionModal-C755oCIJ.js"),__vite__mapDeps([0,1,2,3,4])),typeof window.showAddTransactionModal=="function"&&window.showAddTransactionModal(m)}catch(m){console.error("Falha ao abrir edição da transação",m),window.Snackbar&&window.Snackbar({message:"Erro ao abrir edição",type:"error"})}}),typeof window.deleteTransactionWithConfirmation!="function"&&(window.deleteTransactionWithConfirmation=async function(o,m="transação"){try{const g=`Tem certeza que deseja excluir "${m}"?`;if(!(typeof window.showConfirmationModal=="function"?await new Promise(h=>window.showConfirmationModal({title:"Excluir Transação",message:g,confirmText:"Sim, excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>h(!0),onCancel:()=>h(!1)})):confirm(g)))return;const{deleteTransactionWithNotifications:w}=await L(async()=>{const{deleteTransactionWithNotifications:h}=await import("./main-BVWxnpqW.js").then($=>$.U);return{deleteTransactionWithNotifications:h}},__vite__mapDeps([1,2]));await w(o),window.Snackbar&&window.Snackbar({message:"Transação excluída",type:"success"});try{_()}catch{}}catch(g){console.error("Falha ao excluir transação",g),window.Snackbar&&window.Snackbar({message:"Erro ao excluir",type:"error"})}})}catch(o){console.warn("Falha ao garantir handlers de edição/exclusão",o)}typeof document<"u"&&setTimeout(()=>{try{W();const o=document.getElementById("load-older-months-btn");o&&!o.dataset.bound&&(o.dataset.bound="1",o.addEventListener("click",()=>window.loadAllOlderMonths&&window.loadAllOlderMonths()))}catch(o){console.warn("setupTransactionButtons skipped (env teardown)",o)}},100),Q();try{window.__txPeriodListenerBound||(window.__txPeriodListenerBound=!0,j.on("period:changed",o=>setTimeout(()=>{const m=(window.location.hash||"").split("?")[0];if(m==="#/transactions"){try{const g=o&&o.year||window.appState?.selectedYear,y=o&&o.month||window.appState?.selectedMonth;if(g&&y){const w=`${g}-${String(y).padStart(2,"0")}`,h=new URL(window.location.href);h.hash=`${m}?ym=${w}`,window.history&&window.history.replaceState&&window.history.replaceState(null,"",h.toString())}}catch{}_();try{j.emit("summary:updated",o||{})}catch{}}},0)))}catch{}V()}function mt(){const t=document.getElementById("app-content");return X(t)}function P(){const t=()=>{try{if(typeof window<"u"&&typeof window.getSelectedPeriod=="function"){const e=window.getSelectedPeriod();if(e&&typeof e.year=="number"&&typeof e.month=="number")return e}}catch{}return I()},{year:a,month:c}=t(),r=`${a}-${String(c).padStart(2,"0")}`,s={};(window.appState.transactions||[]).forEach(e=>{const d=F(e);d&&(s[d]||(s[d]=[]),s[d].push(e))});const l=Object.keys(s).sort().reverse();return[r,...l.filter(e=>e!==r)].map((e,d)=>{const p=s[e]||[];if(d===0)return R(e,p);const[f,u]=e.split("-"),o=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][parseInt(u)-1],m=p.filter(w=>w.tipo==="receita").reduce((w,h)=>w+parseFloat(h.valor),0),g=p.filter(w=>w.tipo==="despesa").reduce((w,h)=>w+parseFloat(h.valor),0),y=m-g;return`
  <div id="month-${e}" class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6" data-mes="${e}" data-loaded="0">
        <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">${o} ${f}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">${p.length} transações</p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold ${y>=0?"text-green-600":"text-red-600"}">R$ ${y.toFixed(2)}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">+R$ ${m.toFixed(2)} • -R$ ${g.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div class="p-4">
          <button class="u-btn u-btn--outline mobile-btn w-full" onclick="window.loadMonthSection && window.loadMonthSection('${e}')">
            Carregar transações deste mês
          </button>
        </div>
      </div>
    `}).join("")}function tt(){try{const t=window.appState.transactions||[];if(!t.length)return"";const a=new Set;return t.forEach(c=>{const r=D(c)||(c.createdAt&&c.createdAt.toDate?c.createdAt.toDate():new Date(c.createdAt));a.add(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)}),a.size<=2?"":`
    <div class="mb-3 flex justify-end">
  <button id="load-older-months-btn" class="u-btn u-btn--outline mobile-btn btn-sm">
          Carregar meses anteriores
        </button>
      </div>
    `}catch{return""}}function R(t,a){const[c,r]=t.split("-"),l=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][parseInt(r)-1],n=a.filter(m=>m.tipo==="receita").reduce((m,g)=>m+parseFloat(g.valor),0),e=a.filter(m=>m.tipo==="despesa").reduce((m,g)=>m+parseFloat(g.valor),0),d=n-e,p=new Date,f=parseInt(c)===p.getFullYear()&&parseInt(r)===p.getMonth()+1,u=window.appState?.selectedYear||p.getFullYear(),i=window.appState?.selectedMonth||p.getMonth()+1,o=parseInt(c)===parseInt(u)&&parseInt(r)===parseInt(i);return`
  <div id="month-${t}" class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6" data-mes="${t}" data-loaded="1">
      <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div class="order-2 sm:order-1">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">${l} ${c} ${f?'<span class="ml-2 align-middle inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Mês atual</span>':""} ${!f&&o?'<span class="ml-2 align-middle inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Mês selecionado</span>':""}</h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${a.length} transações</p>
            <div class="mt-1 flex items-center gap-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
              <button class="hover:underline" onclick="window.expandAllDays && window.expandAllDays('${t}')">Expandir todos</button>
              <span class="text-gray-400">•</span>
              <button class="hover:underline" onclick="window.collapseAllDays && window.collapseAllDays('${t}')">Colapsar todos</button>
            </div>
          </div>
          <div class="order-1 sm:order-2 sm:text-right">
            <div class="text-base sm:text-lg font-bold ${d>=0?"text-green-600":"text-red-600"}">R$ ${d.toFixed(2)}</div>
            <div class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">+R$ ${n.toFixed(2)} • -R$ ${e.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div class="p-3 sm:p-4">
        ${a.length===0?`
          <div class="text-center py-8">
            <div class="text-5xl mb-3">🗓️</div>
            <div class="font-medium mb-1">Nenhuma transação neste mês</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">Adicione sua primeira transação de ${l}</div>
            <button onclick="showAddTransactionModal && showAddTransactionModal()" class="u-btn u-btn--primary mobile-btn">➕ Nova Transação</button>
          </div>
        `:`
        <div class="space-y-2 sm:space-y-3" id="tx-day-items-${t}">
          ${at(t,a,parseInt(c),parseInt(r))}
        </div>
        `}
      </div>
    </div>
  `}const B=12;function H(){try{try{if(typeof localStorage<"u"){const c=parseInt(localStorage.getItem("txChunkSize"),10);if(!Number.isNaN(c)&&c>=6&&c<=40)return c}}catch{}const t=typeof window<"u"&&window.innerHeight?window.innerHeight:800,a=typeof navigator<"u"&&navigator.deviceMemory?navigator.deviceMemory:4;return t>=900||a>=6?16:t<=700||a<=2?10:B}catch{return B}}function T(){return typeof window>"u"?{}:(window.__txGroupCache||(window.__txGroupCache={}),window.__txGroupCache)}function et(t,a,c){const r=n=>{try{const e=D(n);if(e&&!isNaN(e.getTime()))return e}catch{}try{if(n.createdAt?.toDate)return n.createdAt.toDate();const e=new Date(n.createdAt);if(!isNaN(e.getTime()))return e}catch{}return new Date(a,c-1,1)},s={};return t.forEach(n=>{const e=r(n),d=e.getFullYear(),p=String(e.getMonth()+1).padStart(2,"0"),f=String(e.getDate()).padStart(2,"0"),u=`${d}-${p}-${f}`;s[u]||(s[u]=[]),s[u].push({t:n,d:e})}),{keys:Object.keys(s).sort((n,e)=>n<e?1:-1),groups:s}}function Y(t,a,c,r){try{const s=a.reduce((g,{t:y})=>g+(y?.tipo==="receita"&&parseFloat(y.valor)||0),0),l=a.reduce((g,{t:y})=>g+(y?.tipo==="despesa"&&parseFloat(y.valor)||0),0),n=s-l,e=a.sort((g,y)=>y.d.getTime()-g.d.getTime()).map(({t:g})=>C(g,c,r)).join(""),d=new Date,p=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,f=new Date(d.getFullYear(),d.getMonth(),d.getDate()-1),u=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}-${String(f.getDate()).padStart(2,"0")}`;let i;if(t===p)i="Hoje";else if(t===u)i="Ontem";else{const[g,y,w]=t.split("-").map($=>parseInt($,10));i=new Date(g,(y||1)-1,w||1).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}const o=q(t);return`
      <div class="tx-day-group">
        <div class="tx-day-header tx-day-header--clickable" data-day-key="${t}" onclick="window.toggleDayGroup && window.toggleDayGroup('${t}')">
          <span class="tx-day-chevron" data-chev-key="${t}">${o?"▸":"▾"}</span>
          ${i}
        </div>
        <div class="tx-day-summary">
          <span class="text-green-600">+R$ ${s.toFixed(2)}</span>
          <span class="text-gray-400">•</span>
          <span class="text-red-600">-R$ ${l.toFixed(2)}</span>
          <span class="text-gray-400">•</span>
          <span class="${n>=0?"text-green-700":"text-red-700"}">Saldo ${n>=0?"":"-"}R$ ${Math.abs(n).toFixed(2)}</span>
        </div>
        <div class="tx-day-items space-y-2 sm:space-y-3" data-day-key="${t}" style="display: ${o?"none":"block"}">${e}</div>
      </div>
    `}catch{return""}}function at(t,a,c,r){try{const s=Date.now(),l=T(),{keys:n,groups:e}=et(a,c,r),d=H();l[t]={keys:n,groups:e,nextIndex:Math.min(d,n.length),ano:c,mes:r};const p=n.slice(0,d).map(o=>Y(o,e[o],c,r)).join(""),f=n.length>d;try{M.track("transactions:virtualized:init",{durationMs:Date.now()-s,ym:t,keys:n.length,chunk:d,rendered:Math.min(d,n.length)})}catch{}const u=f?`
    <div class="mt-3 flex justify-center">
  <button id="more-days-${t}" class="u-btn u-btn--outline mobile-btn" onclick="window.loadMoreDayGroups && window.loadMoreDayGroups('${t}')">Carregar mais dias</button>
      </div>
    `:"",i=`<div id="scroll-sentinel-${t}" class="h-4"></div>`;return p+u+i}catch{return nt(a,c,r)}}function G(t){try{const a=Date.now(),r=T()[t];if(!r)return;const{keys:s,groups:l,ano:n,mes:e}=r,d=document.getElementById(`tx-day-items-${t}`);if(!d)return;let p=0,f=!1;try{const g=document.getElementById(`scroll-sentinel-${t}`);if(g&&typeof window<"u"){const y=g.getBoundingClientRect(),w=window.innerHeight||0;y.top>0&&y.top<w+200&&(f=!0,p=y.top)}}catch{}const u=H(),i=r.nextIndex||0,o=Math.min(i+u,s.length);if(i>=o)return;const m=s.slice(i,o).map(g=>Y(g,l[g],n,e)).join("");d.insertAdjacentHTML("beforeend",m);try{if(f&&typeof window<"u"){const g=document.getElementById(`scroll-sentinel-${t}`);if(g){const w=g.getBoundingClientRect().top-p;w!==0&&window.scrollBy(0,w)}}}catch{}r.nextIndex=o;try{M.track("transactions:virtualized:loadMore",{durationMs:Date.now()-a,ym:t,added:o-i,nextIndex:r.nextIndex})}catch{}if(o>=s.length){const g=document.getElementById(`more-days-${t}`);g&&(g.style.display="none");const y=document.getElementById(`scroll-sentinel-${t}`);y&&(y.style.display="none")}}catch{}}function nt(t,a,c){try{const r={},s=u=>{try{const i=D(u);if(i&&!isNaN(i.getTime()))return i}catch{}try{if(u.createdAt?.toDate)return u.createdAt.toDate();if(u.createdAt){const i=new Date(u.createdAt);if(!isNaN(i.getTime()))return i}}catch{}return new Date(a,c-1,1)};t.forEach(u=>{const i=s(u),o=i.getFullYear(),m=String(i.getMonth()+1).padStart(2,"0"),g=String(i.getDate()).padStart(2,"0"),y=`${o}-${m}-${g}`;r[y]||(r[y]=[]),r[y].push({t:u,d:i})});const l=Object.keys(r).sort((u,i)=>u<i?1:-1),n=new Date,e=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`,d=new Date(n.getFullYear(),n.getMonth(),n.getDate()-1),p=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,f=u=>u.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});return l.map(u=>{const i=r[u],o=i.reduce((x,{t:v})=>x+(v?.tipo==="receita"&&parseFloat(v.valor)||0),0),m=i.reduce((x,{t:v})=>x+(v?.tipo==="despesa"&&parseFloat(v.valor)||0),0),g=o-m,y=i.sort((x,v)=>v.d.getTime()-x.d.getTime()).map(({t:x})=>C(x,a,c)).join("");let w;if(u===e)w="Hoje";else if(u===p)w="Ontem";else{const[x,v,S]=u.split("-").map(k=>parseInt(k,10)),N=new Date(x,(v||1)-1,S||1);w=f(N)}const h=q(u);return`
          <div class="tx-day-group">
            <div class="tx-day-header tx-day-header--clickable" data-day-key="${u}" onclick="window.toggleDayGroup && window.toggleDayGroup('${u}')">
              <span class="tx-day-chevron" data-chev-key="${u}">${h?"▸":"▾"}</span>
              ${w}
            </div>
            <div class="tx-day-summary">
              <span class="text-green-600">+R$ ${o.toFixed(2)}</span>
              <span class="text-gray-400">•</span>
              <span class="text-red-600">-R$ ${m.toFixed(2)}</span>
              <span class="text-gray-400">•</span>
              <span class="${g>=0?"text-green-700":"text-red-700"}">Saldo ${g>=0?"":"-"}R$ ${Math.abs(g).toFixed(2)}</span>
            </div>
            <div class="tx-day-items space-y-2 sm:space-y-3" data-day-key="${u}" style="display: ${h?"none":"block"}">${y}</div>
          </div>
        `}).join("")}catch(r){return console.warn("Falha ao agrupar por dia, render básico:",r),t.map(s=>C(s,a,c)).join("")}}function E(){try{const t=localStorage.getItem("txCollapsedDays"),a=t?JSON.parse(t):[];if(Array.isArray(a))return new Set(a)}catch{}return new Set}function A(t){try{localStorage.setItem("txCollapsedDays",JSON.stringify(Array.from(t)))}catch{}}function q(t){return window.appState||(window.appState={}),window.appState.ui||(window.appState.ui={}),window.appState.ui.collapsedDays||(window.appState.ui.collapsedDays=E()),window.appState.ui.collapsedDays.has(t)}function C(t,a,c){const r=window.appState.categories?.find(e=>e.id===t.categoriaId),s=z(t,a,c),l=t.tipo==="receita";let n="";if(t.recorrenteId){let e=t.parcelaAtual,d=t.parcelasTotal;if(!e||!d){const p=window.appState.recorrentes?.find(f=>f.id===t.recorrenteId);p?(d=p.parcelasTotal,window.calcularParcelaRecorrente?e=window.calcularParcelaRecorrente(p,parseInt(a),parseInt(c)):e=1):(e=1,d=1)}d&&d>1?n=` • 🔄 ${e}/${d}`:n=" • 🔄 ♾️"}return`
    <div class="list-item p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group ${l?"border-l-4 border-green-500":"border-l-4 border-red-500"}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="flex flex-col items-center">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg ${l?"bg-green-100 text-green-600":"bg-red-100 text-red-600"}">${l?"💰":"💸"}</div>
            <div class="w-3 h-3 rounded-full mt-1" style="background-color: ${r?.cor||"#6B7280"}"></div>
          </div>
          <div class="min-w-0 flex-1">
            <p class="list-item-title font-medium text-gray-900 dark:text-gray-100 truncate">${t.descricao}</p>
          </div>
        </div>
        <div class="text-right mt-0.5 sm:mt-0">
          <span class="font-bold text-base sm:text-lg ${l?"text-green-600":"text-red-600"}">${l?"+":"-"}R$ ${parseFloat(t.valor).toFixed(2)}</span>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between gap-3">
        <p class="list-item-subtitle text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">${r?.nome||"Sem categoria"} • ${s}${n}</p>
        <div class="opacity-80 sm:opacity-60 group-hover:opacity-100 flex gap-1">
          <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200" title="Editar transação">✏️</button>
          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${(t.descricao||"").replace(/'/g,"\\'")}')" class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-all duration-200" title="Excluir transação">🗑️</button>
        </div>
      </div>
    </div>
  `}function rt(t){return t.length?t.map(a=>{const c=window.appState.categories?.find(l=>l.id===a.categoriaId),r=z(a),s=a.tipo==="receita";return`
      <div class="list-item ${s?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${a.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${c?.nome||"Sem categoria"} • ${r}
            ${a.recorrenteId?" • Recorrente":""}
            ${(()=>{if(!a.recorrenteId)return"";let l=a.parcelaAtual,n=a.parcelasTotal;if(!l||!n){const e=window.appState.recorrentes?.find(d=>d.id===a.recorrenteId);if(e)if(n=e.parcelasTotal,window.calcularParcelaRecorrente){const d=new Date;l=window.calcularParcelaRecorrente(e,d.getFullYear(),d.getMonth()+1)}else l=1;else l=1,n=1}return n&&n>1?` • ${l} de ${n}`:" • Infinito"})()}
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span class="text-sm sm:text-base font-bold ${s?"text-green-600":"text-red-600"}">
            ${s?"+":"-"}R$ ${parseFloat(a.valor).toFixed(2)}
          </span>
          <div class="flex gap-1">
            <button onclick="window.editTransaction('${a.id}')" class="u-btn u-btn--outline mobile-btn" title="Editar transação">
              <span class="icon-standard">✏️</span>
            </button>
            <button onclick="window.deleteTransactionWithConfirmation('${a.id}', '${a.descricao.replace(/'/g,"\\'")}')" class="u-btn u-btn--danger mobile-btn" title="Excluir transação">
              <span class="icon-standard">🗑️</span>
            </button>
          </div>
        </div>
      </div>
    `}).join(""):`
      <div class="text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `}function yt(t){return t.recorrenteId?1:null}function ot(t){try{const a=document.getElementById(`month-${t}`);if(!a||a.dataset.loaded==="1")return;const[c,r]=t.split("-"),s=(window.appState.transactions||[]).filter(l=>F(l)===t);a.outerHTML=R(t,s),setTimeout(()=>{try{J(t)}catch{}},0)}catch(a){console.warn("Falha ao carregar mês",t,a)}}function st(t){if(!t)return;window.appState||(window.appState={}),window.appState.ui||(window.appState.ui={}),window.appState.ui.collapsedDays||(window.appState.ui.collapsedDays=E());const a=window.appState.ui.collapsedDays,c=document.querySelector(`.tx-day-items[data-day-key="${t}"]`),r=document.querySelector(`.tx-day-chevron[data-chev-key="${t}"]`);if(c){const s=c.style.display!=="none";c.style.display=s?"none":"block",r&&(r.textContent=s?"▸":"▾"),s?a.add(t):a.delete(t),A(a)}}function it(t){try{if(!t)return;window.appState||(window.appState={}),window.appState.ui||(window.appState.ui={}),window.appState.ui.collapsedDays||(window.appState.ui.collapsedDays=E());const a=window.appState.ui.collapsedDays,c=`#month-${t} .tx-day-items`;document.querySelectorAll(c).forEach(r=>{r.style.display="block";const s=r.getAttribute("data-day-key");s&&a.delete(s)}),document.querySelectorAll(`#month-${t} .tx-day-chevron`).forEach(r=>r.textContent="▾"),A(a)}catch{}}function dt(t){try{if(!t)return;window.appState||(window.appState={}),window.appState.ui||(window.appState.ui={}),window.appState.ui.collapsedDays||(window.appState.ui.collapsedDays=E());const a=window.appState.ui.collapsedDays,c=`#month-${t} .tx-day-items`;document.querySelectorAll(c).forEach(r=>{r.style.display="none";const s=r.getAttribute("data-day-key");s&&a.add(s)}),document.querySelectorAll(`#month-${t} .tx-day-chevron`).forEach(r=>r.textContent="▸"),A(a)}catch{}}function D(t){try{let a=t?.dataEfetivacao||t?.dataLancamento||t?.data||t?.date||t?.createdAt;if(!a)return null;if(a&&typeof a.toDate=="function")return a.toDate();if(a&&typeof a=="object"&&typeof a.seconds=="number"){const r=new Date(a.seconds*1e3);return isNaN(r.getTime())?null:r}if(typeof a=="string"){const r=a.trim(),s=r.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(s){const n=parseInt(s[1],10),e=parseInt(s[2],10)-1,d=parseInt(s[3],10);return new Date(n,e,d)}const l=new Date(r);return isNaN(l.getTime())?null:l}if(typeof a=="number"){const r=a<1e12?a*1e3:a,s=new Date(r);return isNaN(s.getTime())?null:s}if(a instanceof Date)return a;const c=new Date(a);return isNaN(c.getTime())?null:c}catch{return null}}function F(t){try{if(typeof t?.competencia=="string"){const n=t.competencia.trim();let e;if(e=n.match(/^(\d{1,2})\/(\d{4})$/),e)return`${e[2]}-${String(parseInt(e[1],10)).padStart(2,"0")}`;if(e=n.match(/^(\d{4})-(\d{2})$/),e)return`${e[1]}-${e[2]}`}const a=[t?.mes,t?.mesReferencia,t?.mesLancamento,t?.mesCompetencia],c=[t?.ano,t?.anoReferencia,t?.anoLancamento,t?.anoCompetencia],r=a.findIndex(n=>n!=null&&n!==""),s=c.findIndex(n=>n!=null&&n!=="");if(r!==-1&&s!==-1){const n=parseInt(a[r],10),e=parseInt(c[s],10);if(!Number.isNaN(n)&&n>=1&&n<=12&&!Number.isNaN(e)&&e>1900)return`${e}-${String(n).padStart(2,"0")}`}const l=t?.dataEfetivacao||t?.dataLancamento||t?.data||t?.date||t?.createdAt;if(!l)return null;if(l&&typeof l.toDate=="function"){const n=l.toDate(),e=n.getFullYear(),d=n.getMonth()+1;return`${e}-${String(d).padStart(2,"0")}`}if(l&&typeof l=="object"&&typeof l.seconds=="number"){const n=new Date(l.seconds*1e3);if(!isNaN(n.getTime())){const e=n.getFullYear(),d=n.getMonth()+1;return`${e}-${String(d).padStart(2,"0")}`}return null}if(typeof l=="number"){const n=l<1e12?l*1e3:l,e=new Date(n);if(!isNaN(e.getTime())){const d=e.getFullYear(),p=e.getMonth()+1;return`${d}-${String(p).padStart(2,"0")}`}return null}if(typeof l=="string"){const n=l.trim();let e;if(e=n.match(/^(\d{4})-(\d{2})-(\d{2})/),e)return`${e[1]}-${e[2]}`;if(e=n.match(/^(\d{4})-(\d{2})$/),e)return`${e[1]}-${e[2]}`;if(e=n.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/),e){const p=parseInt(e[3],10),f=parseInt(e[2],10);return`${p}-${String(f).padStart(2,"0")}`}if(e=n.match(/^(\d{1,2})\/(\d{4})$/),e){const p=parseInt(e[2],10),f=parseInt(e[1],10);return`${p}-${String(f).padStart(2,"0")}`}const d=new Date(n);if(!isNaN(d.getTime())){const p=d.getFullYear(),f=d.getMonth()+1;return`${p}-${String(f).padStart(2,"0")}`}return null}return null}catch{return null}}function z(t,a,c){const r=D(t);if(r)return r.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});const s=F(t);if(s){const[l,n]=s.split("-");return`${n}/${l}`}return a&&c?`${String(c).padStart(2,"0")}/${a}`:"--/--"}function ct(){try{document.querySelectorAll('[id^="month-"][data-loaded="0"]').forEach(a=>{const c=a.dataset.mes;c&&window.loadMonthSection&&window.loadMonthSection(c)})}catch{}}function U(){return window.__txInfinite||(window.__txInfinite={observers:{},loading:{}}),window.__txInfinite}function lt(){try{const t=U();Object.values(t.observers).forEach(a=>{try{a.disconnect()}catch{}}),t.observers={},t.loading={}}catch{}}function J(t){try{const a=U();if(a.observers[t])return;const c=document.getElementById(`scroll-sentinel-${t}`);if(!c||typeof window>"u"||!("IntersectionObserver"in window))return;const r=document.getElementById(`more-days-${t}`);r&&(r.style.display="none");let s;const l=n=>{for(const e of n)if(e.isIntersecting){if(a.loading[t])return;const p=T()[t];if(!p)return;const{keys:f,nextIndex:u=0}=p;if(u>=f.length)return;a.loading[t]=!0;try{G(t)}finally{setTimeout(()=>{a.loading[t]=!1;try{const i=T()[t];if(i&&i.nextIndex>=i.keys.length){if(s)try{s.disconnect()}catch{}delete a.observers[t];const o=document.getElementById(`scroll-sentinel-${t}`);o&&(o.style.display="none")}}catch{}},0)}}};s=new window.IntersectionObserver(l,{root:null,rootMargin:"600px 0px",threshold:0}),s.observe(c),a.observers[t]=s}catch{}}export{yt as calcularNumeroParcela,dt as collapseAllDays,mt as default,it as expandAllDays,z as formatTransactionDisplayDate,E as getCollapsedDays,D as getTransactionDate,F as getTransactionYearMonth,q as isDayCollapsed,ct as loadAllOlderMonths,ot as loadMonthSection,G as loadMoreDayGroups,X as render,P as renderAllTransactions,at as renderDayGroupsVirtualized,rt as renderFilteredTransactions,R as renderMonthSectionHTML,tt as renderOlderMonthsControl,C as renderTransactionItemHTML,_ as renderTransactions,nt as renderTransactionsGroupedByDay,A as saveCollapsedDays,J as setupInfiniteScrollForMonth,lt as teardownInfiniteScroll,st as toggleDayGroup};
