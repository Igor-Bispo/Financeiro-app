const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/showAddTransactionModal--mJmBjpu.js","assets/main-1DkdKBRl.js","assets/main-CsmOb3cC.css"])))=>i.map(i=>d[i]);
import{_ as B,e as k,h as F}from"./main-1DkdKBRl.js";import{mountPeriodIndicator as O}from"./PeriodIndicator-BK38mPnV.js";import{s as W,r as V}from"./UIService-7h3Jy7wK.js";import M from"./perf-tobPnqr4.js";function Q(){try{if(typeof window.setupTransactionSearch=="function"){window.setupTransactionSearch();return}const t=a=>(a??"").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim(),e=(a,l)=>{if(a===l)return 0;const y=a.length,u=l.length;if(y===0)return u;if(u===0)return y;if(Math.abs(y-u)>1)return 2;const c=Array(y+1).fill(0).map(()=>Array(u+1).fill(0));for(let s=0;s<=y;s++)c[s][0]=s;for(let s=0;s<=u;s++)c[0][s]=s;for(let s=1;s<=y;s++)for(let o=1;o<=u;o++){const f=a[s-1]===l[o-1]?0:1;c[s][o]=Math.min(c[s-1][o]+1,c[s][o-1]+1,c[s-1][o-1]+f),s>1&&o>1&&a[s-1]===l[o-2]&&a[s-2]===l[o-1]&&(c[s][o]=Math.min(c[s][o],c[s-2][o-2]+1))}return c[y][u]},d=(a,l)=>{const y=t(a),u=t(l);if(!u||y.includes(u))return!0;const c=y.split(/\s+/).filter(Boolean);for(const s of c)if(Math.abs(s.length-u.length)<=1&&e(s,u)<=1)return!0;return Math.abs(y.length-u.length)<=1&&e(y,u)<=1},r=document.getElementById("transaction-search"),i=document.getElementById("transaction-search-count"),p=document.getElementById("transaction-search-results"),n=document.getElementById("transactions-list");if(!r||!n||r.dataset.bound==="1")return;r.dataset.bound="1",r.addEventListener("input",()=>{r._debounceTimer&&clearTimeout(r._debounceTimer),r._debounceTimer=setTimeout(async()=>{const a=t(r.value);if(!a){p&&p.classList.add("hidden");try{n.innerHTML=P()}catch{n.innerHTML=""}return}const{year:l,month:y}=F(),u=(window.appState.transactions||[]).filter(c=>{let s;if(c?.createdAt&&typeof c.createdAt=="object"&&c.createdAt.seconds?s=new Date(c.createdAt.seconds*1e3):s=new Date(c.createdAt),!(s&&s.getFullYear&&s.getFullYear()===l&&s.getMonth()+1===y))return!1;const f=c.descricao||"",m=(window.appState.categories||[]).find(v=>v.id===c.categoriaId)?.nome||"",w=String(c.valor??"");return d(f,a)||d(m,a)||w.includes(a)});i&&(i.textContent=String(u.length)),p&&p.classList.remove("hidden");try{n.innerHTML=rt(u)}catch{n.innerHTML=""}},150)}),r.addEventListener("keydown",a=>{a.key==="Escape"&&(r.value="",r.dispatchEvent(new Event("input")))})}catch(t){console.warn("setupTransactionSearch fallback falhou:",t)}}async function X(t){const e=document.createElement("div");e.className="transactions-page";const d=document.createElement("div");d.className="tab-header mb-6",d.innerHTML='<h2 class="tab-title-highlight">💸 Transações</h2><div id="tx-period-indicator"></div>',e.appendChild(d);const r=document.createElement("div");r.className="transactions-content",r.innerHTML=`
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
  `;try{const{year:i,month:p}=F(),n=`${i}-${String(p).padStart(2,"0")}`;if(!document.querySelector(`#month-${n}`)){const l=document.getElementById("transactions-list");l&&l.insertAdjacentHTML("afterbegin",A(n,[]))}}catch{}e.appendChild(r),t&&(t.innerHTML="",t.appendChild(e)),await Z();try{O("#tx-period-indicator")}catch{}}async function Z(){try{console.log("Transactions: Carregando dados...");try{I()}catch(t){console.warn("renderTransactions falhou:",t)}}catch(t){console.error("Erro ao carregar transações:",t)}}function I(){const t=Date.now();console.log("🔍 renderTransactions - dados recebidos:",window.appState?.transactions);const e=()=>{try{if(typeof window<"u"&&typeof window.getSelectedPeriod=="function"){const o=window.getSelectedPeriod();if(o&&typeof o.year=="number"&&typeof o.month=="number")return o}}catch{}return F()};console.log("🔄 renderTransactions chamado!");const d=document.getElementById("app-content");try{lt()}catch{}const r=window.appState.transactions||[],{year:i,month:p}=e(),n=`${i}-${String(p).padStart(2,"0")}`,a=r.filter(o=>C(o)===n),l=a.filter(o=>o.tipo==="receita").reduce((o,f)=>o+parseFloat(f.valor),0),y=a.filter(o=>o.tipo==="despesa").reduce((o,f)=>o+parseFloat(f.valor),0),u=l-y,c=a.length,s={};a.forEach(o=>{const f=D(o)||(o.createdAt&&o.createdAt.toDate?o.createdAt.toDate():new Date(o.createdAt)),g=`${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,"0")}`;s[g]||(s[g]=[]),s[g].push(o)}),d.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📋 Transações</h2>
        <div id="tx-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          
          
          <!-- ========== SEÇÃO 1: RESUMO COMPACTO ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💰 Resumo</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
              <!-- Header Compacto -->
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span class="text-xl">💸</span>
                    Controle de Transações
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">${c} transações • ${String(p).padStart(2,"0")}/${i}</p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold ${u>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                    R$ ${u.toFixed(2)}
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${u>=0?"Positivo":"Negativo"}</p>
                </div>
              </div>
              
              <!-- Métricas Compactas -->
              <div class="grid grid-cols-3 gap-3 mb-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💚</div>
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">R$ ${l.toFixed(2)}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Receitas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💸</div>
                  <div class="text-lg font-bold text-red-600 dark:text-red-400">R$ ${y.toFixed(2)}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Despesas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">📊</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">${c}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
              </div>

              <!-- Resumo Financeiro Compacto -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <span>📈</span>
                  Resumo Financeiro
                </h5>
                <div class="space-y-1">
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-600 dark:text-gray-400">Receitas:</span>
                    <span class="font-medium text-green-600 dark:text-green-400">R$ ${l.toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-600 dark:text-gray-400">Despesas:</span>
                    <span class="font-medium text-red-600 dark:text-red-400">R$ ${y.toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                    <span class="text-gray-600 dark:text-gray-400">Saldo:</span>
                    <span class="font-bold ${u>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                      R$ ${u.toFixed(2)}
                    </span>
                  </div>
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
            ${a.length===0?`
              <div class="empty-state mt-4">
                <div class="empty-icon">🧾</div>
                <div class="empty-text">Sem transações neste período</div>
                <div class="mt-2"><button class="u-btn u-btn--primary mobile-btn w-full" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar transação</button></div>
              </div>`:""}
          </div>
        </div>
      </div>
    </div>
  `;try{M.track("transactions:render:summary",{durationMs:Date.now()-t,total:c,month:p,year:i})}catch{}try{if(M.isEnabled()){const o=document.createElement("div");o.className="mt-4";const f=`${i}-${String(p).padStart(2,"0")}`,g=M.getLog(),m=g.filter($=>$.event==="transactions:render:summary"),v=m[0]?.durationMs||null,b=m.slice(0,10),h=b.length?Math.round(b.reduce(($,K)=>$+(K.durationMs||0),0)/b.length):null,x=g.find($=>$.event==="transactions:virtualized:init"&&$.ym===f),S=g.find($=>$.event==="transactions:virtualized:loadMore"&&$.ym===f),R=`
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs text-gray-700 dark:text-gray-300">
          <div class="font-semibold mb-1">Métricas (local)</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <div class="text-gray-500">Último render</div>
              <div>${v!==null?v+" ms":"—"}</div>
            </div>
            <div>
              <div class="text-gray-500">Média (10)</div>
              <div>${h!==null?h+" ms":"—"}</div>
            </div>
            <div>
              <div class="text-gray-500">Período</div>
              <div>${f}</div>
            </div>
          </div>
          <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <div class="text-gray-500">Inicial virtualizado</div>
              <div>${x?`${x.rendered}/${x.keys} grupos • chunk ${x.chunk} • ${x.durationMs} ms`:"—"}</div>
            </div>
            <div>
              <div class="text-gray-500">Último loadMore</div>
              <div>${S?`+${S.added} • nextIndex ${S.nextIndex} • ${S.durationMs} ms`:"—"}</div>
            </div>
          </div>
        </div>`;o.innerHTML=R;const T=document.querySelector(".content-spacing");T?T.appendChild(o):d.appendChild(o)}}catch{}try{J(n)}catch{}try{O("#tx-period-indicator")}catch{}try{typeof window.toggleDayGroup!="function"&&(window.toggleDayGroup=st),typeof window.expandAllDays!="function"&&(window.expandAllDays=it),typeof window.collapseAllDays!="function"&&(window.collapseAllDays=dt),typeof window.loadMonthSection!="function"&&(window.loadMonthSection=ot),typeof window.loadAllOlderMonths!="function"&&(window.loadAllOlderMonths=ct),typeof window.loadMoreDayGroups!="function"&&(window.loadMoreDayGroups=G)}catch{}try{typeof window.editTransaction!="function"&&(window.editTransaction=async function(o){try{const f=(window.appState?.transactions||[]).find(g=>g.id===o);if(!f){window.Snackbar&&window.Snackbar({message:"Transação não encontrada",type:"error"});return}await B(()=>import("./showAddTransactionModal--mJmBjpu.js"),__vite__mapDeps([0,1,2])),typeof window.showAddTransactionModal=="function"&&window.showAddTransactionModal(f)}catch(f){console.error("Falha ao abrir edição da transação",f),window.Snackbar&&window.Snackbar({message:"Erro ao abrir edição",type:"error"})}}),typeof window.deleteTransactionWithConfirmation!="function"&&(window.deleteTransactionWithConfirmation=async function(o,f="transação"){try{const g=`Tem certeza que deseja excluir "${f}"?`;if(!(typeof window.showConfirmationModal=="function"?await new Promise(v=>window.showConfirmationModal({title:"Excluir Transação",message:g,confirmText:"Sim, excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>v(!0),onCancel:()=>v(!1)})):confirm(g)))return;const{deleteTransactionWithNotifications:w}=await B(async()=>{const{deleteTransactionWithNotifications:v}=await import("./main-1DkdKBRl.js").then(b=>b.a0);return{deleteTransactionWithNotifications:v}},__vite__mapDeps([1,2]));await w(o),window.Snackbar&&window.Snackbar({message:"Transação excluída",type:"success"});try{I()}catch{}}catch(g){console.error("Falha ao excluir transação",g),window.Snackbar&&window.Snackbar({message:"Erro ao excluir",type:"error"})}})}catch(o){console.warn("Falha ao garantir handlers de edição/exclusão",o)}typeof document<"u"&&setTimeout(()=>{try{W();const o=document.getElementById("load-older-months-btn");o&&!o.dataset.bound&&(o.dataset.bound="1",o.addEventListener("click",()=>window.loadAllOlderMonths&&window.loadAllOlderMonths()))}catch(o){console.warn("setupTransactionButtons skipped (env teardown)",o)}},100),Q();try{if(!window.__txPeriodListenerBound){window.__txPeriodListenerBound=!0,k.on("period:changed",f=>setTimeout(()=>{const g=(window.location.hash||"").split("?")[0];if(g==="#/transactions"){try{const m=f&&f.year||window.appState?.selectedYear,w=f&&f.month||window.appState?.selectedMonth;if(m&&w){const v=`${m}-${String(w).padStart(2,"0")}`,b=new URL(window.location.href);b.hash=`${g}?ym=${v}`,window.history&&window.history.replaceState&&window.history.replaceState(null,"",b.toString())}}catch{}I();try{k.emit("summary:updated",f||{})}catch{}}},0));const o=()=>setTimeout(()=>{(window.location.hash||"").split("?")[0]==="#/transactions"&&I()},0);k.on("transactions:updated",o),k.on("transaction:added",o),k.on("transaction:updated",o),k.on("transaction:deleted",o)}}catch{}V()}function ft(){const t=document.getElementById("app-content");return X(t)}function P(){const t=()=>{try{if(typeof window<"u"&&typeof window.getSelectedPeriod=="function"){const u=window.getSelectedPeriod();if(u&&typeof u.year=="number"&&typeof u.month=="number")return u}}catch{}return F()},{year:e,month:d}=t(),r=`${e}-${String(d).padStart(2,"0")}`,i={},p=window.appState?.currentBudget?.id,n=window.appState?.budgets||[],a=Array.isArray(n)&&n.length>1;(window.appState.transactions||[]).forEach(u=>{if(!p||u.budgetId===p||!a&&!u.budgetId){const c=C(u);if(!c)return;i[c]||(i[c]=[]),i[c].push(u)}});const l=Object.keys(i).sort().reverse();return[r,...l.filter(u=>u!==r)].map((u,c)=>{const s=i[u]||[];if(c===0)return A(u,s);const[o,f]=u.split("-"),m=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][parseInt(f)-1],w=s.filter(h=>h.tipo==="receita").reduce((h,x)=>h+parseFloat(x.valor),0),v=s.filter(h=>h.tipo==="despesa").reduce((h,x)=>h+parseFloat(x.valor),0),b=w-v;return`
  <div id="month-${u}" class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6" data-mes="${u}" data-loaded="0">
        <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">${m} ${o}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">${s.length} transações</p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold ${b>=0?"text-green-600":"text-red-600"}">R$ ${b.toFixed(2)}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">+R$ ${w.toFixed(2)} • -R$ ${v.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div class="p-4">
          <button class="u-btn u-btn--outline mobile-btn w-full" onclick="window.loadMonthSection && window.loadMonthSection('${u}')">
            Carregar transações deste mês
          </button>
        </div>
      </div>
    `}).join("")}function tt(){try{const t=window.appState.transactions||[];if(!t.length)return"";const e=new Set;return t.forEach(d=>{const r=D(d)||(d.createdAt&&d.createdAt.toDate?d.createdAt.toDate():new Date(d.createdAt));e.add(`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`)}),e.size<=2?"":`
    <div class="mb-3 flex justify-end">
  <button id="load-older-months-btn" class="u-btn u-btn--outline mobile-btn btn-sm">
          Carregar meses anteriores
        </button>
      </div>
    `}catch{return""}}function A(t,e){const[d,r]=t.split("-"),p=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][parseInt(r)-1],n=e.filter(f=>f.tipo==="receita").reduce((f,g)=>f+parseFloat(g.valor),0),a=e.filter(f=>f.tipo==="despesa").reduce((f,g)=>f+parseFloat(g.valor),0),l=n-a,y=new Date,u=parseInt(d)===y.getFullYear()&&parseInt(r)===y.getMonth()+1,c=window.appState?.selectedYear||y.getFullYear(),s=window.appState?.selectedMonth||y.getMonth()+1,o=parseInt(d)===parseInt(c)&&parseInt(r)===parseInt(s);return`
  <div id="month-${t}" class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6" data-mes="${t}" data-loaded="1">
      <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div class="order-2 sm:order-1">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">${p} ${d} ${u?'<span class="ml-2 align-middle inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Mês atual</span>':""} ${!u&&o?'<span class="ml-2 align-middle inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Mês selecionado</span>':""}</h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${e.length} transações</p>
            <div class="mt-1 flex items-center gap-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
              <button class="hover:underline" onclick="window.expandAllDays && window.expandAllDays('${t}')">Expandir todos</button>
              <span class="text-gray-400">•</span>
              <button class="hover:underline" onclick="window.collapseAllDays && window.collapseAllDays('${t}')">Colapsar todos</button>
            </div>
          </div>
          <div class="order-1 sm:order-2 sm:text-right">
            <div class="text-base sm:text-lg font-bold ${l>=0?"text-green-600":"text-red-600"}">R$ ${l.toFixed(2)}</div>
            <div class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">+R$ ${n.toFixed(2)} • -R$ ${a.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div class="p-3 sm:p-4">
        ${e.length===0?`
          <div class="text-center py-8">
            <div class="text-5xl mb-3">🗓️</div>
            <div class="font-medium mb-1">Nenhuma transação neste mês</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">Adicione sua primeira transação de ${p}</div>
            <button onclick="showAddTransactionModal && showAddTransactionModal()" class="u-btn u-btn--primary mobile-btn">➕ Nova Transação</button>
          </div>
        `:`
        <div class="space-y-2 sm:space-y-3" id="tx-day-items-${t}">
          ${at(t,e,parseInt(d),parseInt(r))}
        </div>
        `}
      </div>
    </div>
  `}const L=12;function H(){try{try{if(typeof localStorage<"u"){const d=parseInt(localStorage.getItem("txChunkSize"),10);if(!Number.isNaN(d)&&d>=6&&d<=40)return d}}catch{}const t=typeof window<"u"&&window.innerHeight?window.innerHeight:800,e=typeof navigator<"u"&&navigator.deviceMemory?navigator.deviceMemory:4;return t>=900||e>=6?16:t<=700||e<=2?10:L}catch{return L}}function E(){return typeof window>"u"?{}:(window.__txGroupCache||(window.__txGroupCache={}),window.__txGroupCache)}function et(t,e,d){const r=n=>{try{const a=D(n);if(a&&!isNaN(a.getTime()))return a}catch{}try{if(n.createdAt?.toDate)return n.createdAt.toDate();const a=new Date(n.createdAt);if(!isNaN(a.getTime()))return a}catch{}return new Date(e,d-1,1)},i={};return t.forEach(n=>{const a=r(n),l=a.getFullYear(),y=String(a.getMonth()+1).padStart(2,"0"),u=String(a.getDate()).padStart(2,"0"),c=`${l}-${y}-${u}`;i[c]||(i[c]=[]),i[c].push({t:n,d:a})}),{keys:Object.keys(i).sort((n,a)=>n<a?1:-1),groups:i}}function Y(t,e,d,r){try{const i=e.reduce((g,{t:m})=>g+(m?.tipo==="receita"&&parseFloat(m.valor)||0),0),p=e.reduce((g,{t:m})=>g+(m?.tipo==="despesa"&&parseFloat(m.valor)||0),0),n=i-p,a=e.sort((g,m)=>m.d.getTime()-g.d.getTime()).map(({t:g})=>_(g,d,r)).join(""),l=new Date,y=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`,u=new Date(l.getFullYear(),l.getMonth(),l.getDate()-1),c=`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}-${String(u.getDate()).padStart(2,"0")}`;let s;if(t===y)s="Hoje";else if(t===c)s="Ontem";else{const[g,m,w]=t.split("-").map(b=>parseInt(b,10));s=new Date(g,(m||1)-1,w||1).toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}const o=q(t);return`
      <div class="tx-day-group">
        <div class="tx-day-header tx-day-header--clickable" data-day-key="${t}" onclick="window.toggleDayGroup && window.toggleDayGroup('${t}')">
          <span class="tx-day-chevron" data-chev-key="${t}">${o?"▸":"▾"}</span>
          ${s}
        </div>
        <div class="tx-day-summary">
          <span class="text-green-600">+R$ ${i.toFixed(2)}</span>
          <span class="text-gray-400">•</span>
          <span class="text-red-600">-R$ ${p.toFixed(2)}</span>
          <span class="text-gray-400">•</span>
          <span class="${n>=0?"text-green-700":"text-red-700"}">Saldo ${n>=0?"":"-"}R$ ${Math.abs(n).toFixed(2)}</span>
        </div>
        <div class="tx-day-items space-y-2 sm:space-y-3" data-day-key="${t}" style="display: ${o?"none":"block"}">${a}</div>
      </div>
    `}catch{return""}}function at(t,e,d,r){try{const i=Date.now(),p=E(),{keys:n,groups:a}=et(e,d,r),l=H();p[t]={keys:n,groups:a,nextIndex:Math.min(l,n.length),ano:d,mes:r};const y=n.slice(0,l).map(o=>Y(o,a[o],d,r)).join(""),u=n.length>l;try{M.track("transactions:virtualized:init",{durationMs:Date.now()-i,ym:t,keys:n.length,chunk:l,rendered:Math.min(l,n.length)})}catch{}const c=u?`
    <div class="mt-3 flex justify-center">
  <button id="more-days-${t}" class="u-btn u-btn--outline mobile-btn" onclick="window.loadMoreDayGroups && window.loadMoreDayGroups('${t}')">Carregar mais dias</button>
      </div>
    `:"",s=`<div id="scroll-sentinel-${t}" class="h-4"></div>`;return y+c+s}catch{return nt(e,d,r)}}function G(t){try{const e=Date.now(),r=E()[t];if(!r)return;const{keys:i,groups:p,ano:n,mes:a}=r,l=document.getElementById(`tx-day-items-${t}`);if(!l)return;let y=0,u=!1;try{const g=document.getElementById(`scroll-sentinel-${t}`);if(g&&typeof window<"u"){const m=g.getBoundingClientRect(),w=window.innerHeight||0;m.top>0&&m.top<w+200&&(u=!0,y=m.top)}}catch{}const c=H(),s=r.nextIndex||0,o=Math.min(s+c,i.length);if(s>=o)return;const f=i.slice(s,o).map(g=>Y(g,p[g],n,a)).join("");l.insertAdjacentHTML("beforeend",f);try{if(u&&typeof window<"u"){const g=document.getElementById(`scroll-sentinel-${t}`);if(g){const w=g.getBoundingClientRect().top-y;w!==0&&window.scrollBy(0,w)}}}catch{}r.nextIndex=o;try{M.track("transactions:virtualized:loadMore",{durationMs:Date.now()-e,ym:t,added:o-s,nextIndex:r.nextIndex})}catch{}if(o>=i.length){const g=document.getElementById(`more-days-${t}`);g&&(g.style.display="none");const m=document.getElementById(`scroll-sentinel-${t}`);m&&(m.style.display="none")}}catch{}}function nt(t,e,d){try{const r={},i=c=>{try{const s=D(c);if(s&&!isNaN(s.getTime()))return s}catch{}try{if(c.createdAt?.toDate)return c.createdAt.toDate();if(c.createdAt){const s=new Date(c.createdAt);if(!isNaN(s.getTime()))return s}}catch{}return new Date(e,d-1,1)};t.forEach(c=>{const s=i(c),o=s.getFullYear(),f=String(s.getMonth()+1).padStart(2,"0"),g=String(s.getDate()).padStart(2,"0"),m=`${o}-${f}-${g}`;r[m]||(r[m]=[]),r[m].push({t:c,d:s})});const p=Object.keys(r).sort((c,s)=>c<s?1:-1),n=new Date,a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`,l=new Date(n.getFullYear(),n.getMonth(),n.getDate()-1),y=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}-${String(l.getDate()).padStart(2,"0")}`,u=c=>c.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});return p.map(c=>{const s=r[c],o=s.reduce((h,{t:x})=>h+(x?.tipo==="receita"&&parseFloat(x.valor)||0),0),f=s.reduce((h,{t:x})=>h+(x?.tipo==="despesa"&&parseFloat(x.valor)||0),0),g=o-f,m=s.sort((h,x)=>x.d.getTime()-h.d.getTime()).map(({t:h})=>_(h,e,d)).join("");let w;if(c===a)w="Hoje";else if(c===y)w="Ontem";else{const[h,x,S]=c.split("-").map(T=>parseInt(T,10)),R=new Date(h,(x||1)-1,S||1);w=u(R)}const v=q(c);return`
          <div class="tx-day-group">
            <div class="tx-day-header tx-day-header--clickable" data-day-key="${c}" onclick="window.toggleDayGroup && window.toggleDayGroup('${c}')">
              <span class="tx-day-chevron" data-chev-key="${c}">${v?"▸":"▾"}</span>
              ${w}
            </div>
            <div class="tx-day-summary">
              <span class="text-green-600">+R$ ${o.toFixed(2)}</span>
              <span class="text-gray-400">•</span>
              <span class="text-red-600">-R$ ${f.toFixed(2)}</span>
              <span class="text-gray-400">•</span>
              <span class="${g>=0?"text-green-700":"text-red-700"}">Saldo ${g>=0?"":"-"}R$ ${Math.abs(g).toFixed(2)}</span>
            </div>
            <div class="tx-day-items space-y-2 sm:space-y-3" data-day-key="${c}" style="display: ${v?"none":"block"}">${m}</div>
          </div>
        `}).join("")}catch(r){return console.warn("Falha ao agrupar por dia, render básico:",r),t.map(i=>_(i,e,d)).join("")}}function N(){try{const t=localStorage.getItem("txCollapsedDays"),e=t?JSON.parse(t):[];if(Array.isArray(e))return new Set(e)}catch{}return new Set}function j(t){try{localStorage.setItem("txCollapsedDays",JSON.stringify(Array.from(t)))}catch{}}function q(t){return window.appState||(window.appState={}),window.appState.ui||(window.appState.ui={}),window.appState.ui.collapsedDays||(window.appState.ui.collapsedDays=N()),window.appState.ui.collapsedDays.has(t)}function _(t,e,d){const r=window.appState.categories?.find(a=>a.id===t.categoriaId),i=z(t,e,d),p=t.tipo==="receita";let n="";if(t.recorrenteId){let a=t.parcelaAtual,l=t.parcelasTotal;if(!a||!l){const y=window.appState.recorrentes?.find(u=>u.id===t.recorrenteId);y?(l=y.parcelasTotal,window.calcularParcelaRecorrente?a=window.calcularParcelaRecorrente(y,parseInt(e),parseInt(d)):a=1):(a=1,l=1)}l&&l>1?n=` • 🔄 ${a}/${l}`:n=" • 🔄 ♾️"}return`
    <div class="list-item p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group ${p?"border-l-4 border-green-500":"border-l-4 border-red-500"}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="flex flex-col items-center">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg ${p?"bg-green-100 text-green-600":"bg-red-100 text-red-600"}">${p?"💰":"💸"}</div>
            <div class="w-3 h-3 rounded-full mt-1" style="background-color: ${r?.cor||"#6B7280"}"></div>
          </div>
          <div class="min-w-0 flex-1">
            <p class="list-item-title font-medium text-gray-900 dark:text-gray-100 truncate">${t.descricao}</p>
          </div>
        </div>
        <div class="text-right mt-0.5 sm:mt-0">
          <span class="font-bold text-base sm:text-lg ${p?"text-green-600":"text-red-600"}">${p?"+":"-"}R$ ${parseFloat(t.valor).toFixed(2)}</span>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between gap-3">
        <p class="list-item-subtitle text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">${r?.nome||"Sem categoria"} • ${i}${n}</p>
        <div class="opacity-80 sm:opacity-60 group-hover:opacity-100 flex gap-1">
          <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200" title="Editar transação">✏️</button>
          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${(t.descricao||"").replace(/'/g,"\\'")}')" class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-all duration-200" title="Excluir transação">🗑️</button>
        </div>
      </div>
    </div>
  `}function rt(t){return t.length?t.map(e=>{const d=window.appState.categories?.find(p=>p.id===e.categoriaId),r=z(e),i=e.tipo==="receita";return`
      <div class="list-item ${i?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${e.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${d?.nome||"Sem categoria"} • ${r}
            ${e.recorrenteId?" • Recorrente":""}
            ${(()=>{if(!e.recorrenteId)return"";let p=e.parcelaAtual,n=e.parcelasTotal;if(!p||!n){const a=window.appState.recorrentes?.find(l=>l.id===e.recorrenteId);if(a)if(n=a.parcelasTotal,window.calcularParcelaRecorrente){const l=new Date;p=window.calcularParcelaRecorrente(a,l.getFullYear(),l.getMonth()+1)}else p=1;else p=1,n=1}return n&&n>1?` • ${p} de ${n}`:" • Infinito"})()}
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span class="text-sm sm:text-base font-bold ${i?"text-green-600":"text-red-600"}">
            ${i?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
          </span>
          <div class="flex gap-1">
            <button onclick="window.editTransaction('${e.id}')" class="u-btn u-btn--outline mobile-btn" title="Editar transação">
              <span class="icon-standard">✏️</span>
            </button>
            <button onclick="window.deleteTransactionWithConfirmation('${e.id}', '${e.descricao.replace(/'/g,"\\'")}')" class="u-btn u-btn--danger mobile-btn" title="Excluir transação">
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
    `}function mt(t){return t.recorrenteId?1:null}function ot(t){try{const e=document.getElementById(`month-${t}`);if(!e||e.dataset.loaded==="1")return;const[d,r]=t.split("-"),i=(window.appState.transactions||[]).filter(p=>C(p)===t);e.outerHTML=A(t,i),setTimeout(()=>{try{J(t)}catch{}},0)}catch(e){console.warn("Falha ao carregar mês",t,e)}}function st(t){if(!t)return;window.appState||(window.appState={}),window.appState.ui||(window.appState.ui={}),window.appState.ui.collapsedDays||(window.appState.ui.collapsedDays=N());const e=window.appState.ui.collapsedDays,d=document.querySelector(`.tx-day-items[data-day-key="${t}"]`),r=document.querySelector(`.tx-day-chevron[data-chev-key="${t}"]`);if(d){const i=d.style.display!=="none";d.style.display=i?"none":"block",r&&(r.textContent=i?"▸":"▾"),i?e.add(t):e.delete(t),j(e)}}function it(t){try{if(!t)return;window.appState||(window.appState={}),window.appState.ui||(window.appState.ui={}),window.appState.ui.collapsedDays||(window.appState.ui.collapsedDays=N());const e=window.appState.ui.collapsedDays,d=`#month-${t} .tx-day-items`;document.querySelectorAll(d).forEach(r=>{r.style.display="block";const i=r.getAttribute("data-day-key");i&&e.delete(i)}),document.querySelectorAll(`#month-${t} .tx-day-chevron`).forEach(r=>r.textContent="▾"),j(e)}catch{}}function dt(t){try{if(!t)return;window.appState||(window.appState={}),window.appState.ui||(window.appState.ui={}),window.appState.ui.collapsedDays||(window.appState.ui.collapsedDays=N());const e=window.appState.ui.collapsedDays,d=`#month-${t} .tx-day-items`;document.querySelectorAll(d).forEach(r=>{r.style.display="none";const i=r.getAttribute("data-day-key");i&&e.add(i)}),document.querySelectorAll(`#month-${t} .tx-day-chevron`).forEach(r=>r.textContent="▸"),j(e)}catch{}}function D(t){try{let e=t?.dataEfetivacao||t?.dataLancamento||t?.data||t?.date||t?.createdAt;if(!e)return null;if(e&&typeof e.toDate=="function")return e.toDate();if(e&&typeof e=="object"&&typeof e.seconds=="number"){const r=new Date(e.seconds*1e3);return isNaN(r.getTime())?null:r}if(typeof e=="string"){const r=e.trim(),i=r.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(i){const n=parseInt(i[1],10),a=parseInt(i[2],10)-1,l=parseInt(i[3],10);return new Date(n,a,l)}const p=new Date(r);return isNaN(p.getTime())?null:p}if(typeof e=="number"){const r=e<1e12?e*1e3:e,i=new Date(r);return isNaN(i.getTime())?null:i}if(e instanceof Date)return e;const d=new Date(e);return isNaN(d.getTime())?null:d}catch{return null}}function C(t){try{if(typeof t?.competencia=="string"){const n=t.competencia.trim();let a;if(a=n.match(/^(\d{1,2})\/(\d{4})$/),a)return`${a[2]}-${String(parseInt(a[1],10)).padStart(2,"0")}`;if(a=n.match(/^(\d{4})-(\d{2})$/),a)return`${a[1]}-${a[2]}`}const e=[t?.mes,t?.mesReferencia,t?.mesLancamento,t?.mesCompetencia],d=[t?.ano,t?.anoReferencia,t?.anoLancamento,t?.anoCompetencia],r=e.findIndex(n=>n!=null&&n!==""),i=d.findIndex(n=>n!=null&&n!=="");if(r!==-1&&i!==-1){const n=parseInt(e[r],10),a=parseInt(d[i],10);if(!Number.isNaN(n)&&n>=1&&n<=12&&!Number.isNaN(a)&&a>1900)return`${a}-${String(n).padStart(2,"0")}`}const p=t?.dataEfetivacao||t?.dataLancamento||t?.data||t?.date||t?.createdAt;if(!p)return null;if(p&&typeof p.toDate=="function"){const n=p.toDate(),a=n.getFullYear(),l=n.getMonth()+1;return`${a}-${String(l).padStart(2,"0")}`}if(p&&typeof p=="object"&&typeof p.seconds=="number"){const n=new Date(p.seconds*1e3);if(!isNaN(n.getTime())){const a=n.getFullYear(),l=n.getMonth()+1;return`${a}-${String(l).padStart(2,"0")}`}return null}if(typeof p=="number"){const n=p<1e12?p*1e3:p,a=new Date(n);if(!isNaN(a.getTime())){const l=a.getFullYear(),y=a.getMonth()+1;return`${l}-${String(y).padStart(2,"0")}`}return null}if(typeof p=="string"){const n=p.trim();let a;if(a=n.match(/^(\d{4})-(\d{2})-(\d{2})/),a)return`${a[1]}-${a[2]}`;if(a=n.match(/^(\d{4})-(\d{2})$/),a)return`${a[1]}-${a[2]}`;if(a=n.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/),a){const y=parseInt(a[3],10),u=parseInt(a[2],10);return`${y}-${String(u).padStart(2,"0")}`}if(a=n.match(/^(\d{1,2})\/(\d{4})$/),a){const y=parseInt(a[2],10),u=parseInt(a[1],10);return`${y}-${String(u).padStart(2,"0")}`}const l=new Date(n);if(!isNaN(l.getTime())){const y=l.getFullYear(),u=l.getMonth()+1;return`${y}-${String(u).padStart(2,"0")}`}return null}return null}catch{return null}}function z(t,e,d){const r=D(t);if(r)return r.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});const i=C(t);if(i){const[p,n]=i.split("-");return`${n}/${p}`}return e&&d?`${String(d).padStart(2,"0")}/${e}`:"--/--"}function ct(){try{document.querySelectorAll('[id^="month-"][data-loaded="0"]').forEach(e=>{const d=e.dataset.mes;d&&window.loadMonthSection&&window.loadMonthSection(d)})}catch{}}function U(){return window.__txInfinite||(window.__txInfinite={observers:{},loading:{}}),window.__txInfinite}function lt(){try{const t=U();Object.values(t.observers).forEach(e=>{try{e.disconnect()}catch{}}),t.observers={},t.loading={}}catch{}}function J(t){try{const e=U();if(e.observers[t])return;const d=document.getElementById(`scroll-sentinel-${t}`);if(!d||typeof window>"u"||!("IntersectionObserver"in window))return;const r=document.getElementById(`more-days-${t}`);r&&(r.style.display="none");let i;const p=n=>{for(const a of n)if(a.isIntersecting){if(e.loading[t])return;const y=E()[t];if(!y)return;const{keys:u,nextIndex:c=0}=y;if(c>=u.length)return;e.loading[t]=!0;try{G(t)}finally{setTimeout(()=>{e.loading[t]=!1;try{const s=E()[t];if(s&&s.nextIndex>=s.keys.length){if(i)try{i.disconnect()}catch{}delete e.observers[t];const o=document.getElementById(`scroll-sentinel-${t}`);o&&(o.style.display="none")}}catch{}},0)}}};i=new window.IntersectionObserver(p,{root:null,rootMargin:"600px 0px",threshold:0}),i.observe(d),e.observers[t]=i}catch{}}export{mt as calcularNumeroParcela,dt as collapseAllDays,ft as default,it as expandAllDays,z as formatTransactionDisplayDate,N as getCollapsedDays,D as getTransactionDate,C as getTransactionYearMonth,q as isDayCollapsed,ct as loadAllOlderMonths,ot as loadMonthSection,G as loadMoreDayGroups,X as render,P as renderAllTransactions,at as renderDayGroupsVirtualized,rt as renderFilteredTransactions,A as renderMonthSectionHTML,tt as renderOlderMonthsControl,_ as renderTransactionItemHTML,I as renderTransactions,nt as renderTransactionsGroupedByDay,j as saveCollapsedDays,J as setupInfiniteScrollForMonth,lt as teardownInfiniteScroll,st as toggleDayGroup};
