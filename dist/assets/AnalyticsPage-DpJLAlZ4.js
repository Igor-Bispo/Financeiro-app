import{c as _,d as B,q as A,w as H,g as I,h as U}from"./main-LdV9j_Y2.js";import G from"./perf-tobPnqr4.js";class h{static _cache=new Map;static _cacheTimeout=300*1e3;static async fetchTransactionsForPeriod(n,e,d){try{const s=`${n}_${e}_${d}`,r=h._cache.get(s);if(r&&Date.now()-r.timestamp<h._cacheTimeout)return r.data;const c=_(B,"transactions"),p=A(c,H("budgetId","==",n)),u=(await I(p)).docs.map(t=>({id:t.id,...t.data()})).filter(t=>{const x=h.txToDate(t);return x&&x>=e&&x<=d});return h._cache.set(s,{data:u,timestamp:Date.now()}),u}catch(s){return console.error("Erro ao buscar transações do período:",s),[]}}static clearCache(){h._cache.clear()}static txToDate(n){try{let e=n?.dataEfetivacao||n?.dataLancamento||n?.data||n?.date||n?.createdAt;if(!e)return null;if(e&&typeof e.toDate=="function")return e.toDate();if(typeof e=="string"){const s=e.trim(),r=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(r)return new Date(parseInt(r[1],10),parseInt(r[2],10)-1,parseInt(r[3],10));const c=new Date(s);return isNaN(c.getTime())?null:c}if(typeof e=="number"){const s=e<1e12?e*1e3:e,r=new Date(s);return isNaN(r.getTime())?null:r}if(e instanceof Date)return e;const d=new Date(e);return isNaN(d.getTime())?null:d}catch{return null}}static async getGastosPorCategoria(n,e,d){try{if(console.log("📊 Gerando relatório de gastos por categoria..."),!n)throw new Error("ID do orçamento não fornecido");if(!e||!d){const a=new Date;e=new Date(a.getFullYear(),a.getMonth(),1),d=new Date(a.getFullYear(),a.getMonth()+1,0)}let s=[],r=[];if(window.appState?.transactions&&window.appState?.categories){if(console.log("📊 Usando dados já carregados na aplicação"),s=window.appState.transactions.filter(a=>{if(a.budgetId!==n)return!1;const m=h.txToDate(a);return m&&m>=e&&m<=d}),r=window.appState.categories.filter(a=>a.budgetId===n),!s||s.length===0){const a=await h.fetchTransactionsForPeriod(n,e,d);a.length>0&&(s=a)}}else{console.log("📊 Buscando dados do Firestore..."),s=await h.fetchTransactionsForPeriod(n,e,d);const a=_(B,"categories"),m=A(a,H("budgetId","==",n));r=(await I(m)).docs.map(t=>({id:t.id,...t.data()}))}const c=r.map(a=>{const m=s.filter(t=>t.categoriaId===a.id),u=m.reduce((t,x)=>t+parseFloat(x.valor),0);return{categoria:a,totalGasto:u,transacoes:m,percentual:0}}),p=c.reduce((a,m)=>a+m.totalGasto,0);return c.forEach(a=>{a.percentual=p>0?a.totalGasto/p*100:0}),c.sort((a,m)=>m.totalGasto-a.totalGasto),console.log("✅ Relatório gerado com sucesso:",c),c}catch(s){throw console.error("❌ Erro ao gerar relatório de gastos por categoria:",s),s}}static async getEvolucaoSaldo(n,e=6){try{if(console.log("📊 Gerando relatório de evolução de saldo..."),!n)throw new Error("ID do orçamento não fornecido");const d=new Date,s=[];for(let r=0;r<e;r++){const c=d.getMonth()-r,p=d.getFullYear()+Math.floor(c/12),a=(c%12+12)%12,m=new Date(p,a,1),u=new Date(p,a+1,0);s.push({ano:p,mes:a+1,nome:m.toLocaleString("pt-BR",{month:"long"}),startDate:m,endDate:u,receitas:0,despesas:0,saldo:0})}for(const r of s){let c=[];if(window.appState?.transactions)c=window.appState.transactions.filter(p=>{if(p.budgetId!==n)return!1;const a=h.txToDate(p);return a&&a>=r.startDate&&a<=r.endDate});else{const p=_(B,"transactions"),a=A(p,H("budgetId","==",n));c=(await I(a)).docs.map(t=>({id:t.id,...t.data()})).filter(t=>{const x=h.txToDate(t);return x&&x>=r.startDate&&x<=r.endDate})}for(const p of c){const a=parseFloat(p.valor);p.tipo==="receita"?r.receitas+=a:r.despesas+=a}r.saldo=r.receitas-r.despesas}return s.sort((r,c)=>r.ano!==c.ano?c.ano-r.ano:c.mes-r.mes),console.log("✅ Relatório de evolução de saldo gerado com sucesso:",s),s}catch(d){throw console.error("❌ Erro ao gerar relatório de evolução de saldo:",d),d}}static async getPrevisaoGastos(n,e=3,d=3){try{if(console.log("📊 Gerando previsão de gastos..."),!n)throw new Error("ID do orçamento não fornecido");const s=await this.getEvolucaoSaldo(n,e),r=s.reduce((m,u)=>m+u.receitas,0)/s.length,c=s.reduce((m,u)=>m+u.despesas,0)/s.length,p=new Date,a=[];for(let m=1;m<=d;m++){const u=p.getMonth()+m,t=p.getFullYear()+Math.floor(u/12),x=u%12,M=new Date(t,x,1),S=1+m*.01;a.push({ano:t,mes:x+1,nome:M.toLocaleString("pt-BR",{month:"long"}),receitas:r*S,despesas:c*S,saldo:(r-c)*S,isPrevisto:!0})}return console.log("✅ Previsão de gastos gerada com sucesso:",a),a}catch(s){throw console.error("❌ Erro ao gerar previsão de gastos:",s),s}}static renderizarGraficoCategorias(n,e){try{console.log("📊 Renderizando gráfico de categorias...");const d=document.getElementById(n);if(!d)throw new Error(`Elemento com ID ${n} não encontrado`);if(d.innerHTML="",!e||e.length===0){d.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const s=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Gastos por Categoria</h3>
          <div class="space-y-3">
            ${e.map(r=>`
              <div class="chart-item">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${r.categoria.nome}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    R$ ${r.totalGasto.toFixed(2)} (${r.percentual.toFixed(1)}%)
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div class="h-2.5 rounded-full" 
                       style="width: ${r.percentual}%; background-color: ${r.categoria.cor||"#4F46E5"}"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;d.innerHTML=s,console.log("✅ Gráfico renderizado com sucesso")}catch(d){throw console.error("❌ Erro ao renderizar gráfico de categorias:",d),d}}static renderizarGraficoEvolucao(n,e){try{console.log("📊 Renderizando gráfico de evolução...");const d=document.getElementById(n);if(!d)throw new Error(`Elemento com ID ${n} não encontrado`);if(d.innerHTML="",!e||e.length===0){d.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const s=Math.max(...e.map(a=>a.receitas)),r=Math.max(...e.map(a=>a.despesas)),c=Math.max(s,r)*1.1,p=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Evolução Financeira</h3>
          
          <div class="relative h-64 mt-4 pl-12 pr-4">
            <!-- Linhas de grade -->
            <div class="absolute inset-0 grid grid-rows-4 w-full h-full">
              ${[0,1,2,3].map(a=>`
                <div class="border-t border-gray-200 dark:border-gray-700 relative">
                  <span class="absolute -top-3 -left-16 text-xs text-gray-500 dark:text-gray-400">
                    R$ ${(c/4*(4-a)).toFixed(0)}
                  </span>
                </div>
              `).join("")}
            </div>
            
            <!-- Gráfico de barras -->
            <div class="absolute inset-0 flex items-end justify-between gap-1">
              ${e.map((a,m)=>{const u=Math.max(a.receitas/c*100,2),t=Math.max(a.despesas/c*100,2),x=a.isPrevisto;return`
                  <div class="flex flex-col items-center justify-end flex-1 min-w-0">
                    <!-- Barra de receita -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-3 ${x?"bg-green-300/50":"bg-green-500"} rounded-t transition-all duration-300 hover:w-4" 
                           style="height: ${u}%"></div>
                    </div>
                    
                    <!-- Barra de despesa -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-3 ${x?"bg-red-300/50":"bg-red-500"} rounded-t transition-all duration-300 hover:w-4" 
                           style="height: ${t}%"></div>
                    </div>
                    
                    <!-- Rótulo do mês -->
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${x?"italic":""} text-center truncate w-full">
                      ${a.nome.substring(0,3)}
                      ${x?"*":""}
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>
          
          <!-- Legenda -->
          <div class="flex justify-center mt-4 space-x-4 text-xs">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span class="text-gray-600 dark:text-gray-400">Receitas</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span class="text-gray-600 dark:text-gray-400">Despesas</span>
            </div>
            ${e.some(a=>a.isPrevisto)?`
              <div class="flex items-center">
                <span class="text-gray-600 dark:text-gray-400 italic">* Previsto</span>
              </div>
            `:""}
          </div>
        </div>
      `;d.innerHTML=p,console.log("✅ Gráfico de evolução renderizado com sucesso")}catch(d){throw console.error("❌ Erro ao renderizar gráfico de evolução:",d),d}}static async gerarRelatorioCompleto(n,e,d){try{if(console.log("📊 Gerando relatório completo..."),!n)throw new Error("ID do orçamento não fornecido");if(!window.appState?.currentUser)throw new Error("Usuário não autenticado");console.log("🔍 Gerando relatório para orçamento:",n);const[s,r,c]=await Promise.all([this.getGastosPorCategoria(n,e,d),this.getEvolucaoSaldo(n,6),this.getPrevisaoGastos(n,3,3)]);console.log("📊 Dados obtidos:",{gastosPorCategoria:s.length,evolucaoSaldo:r.length,previsaoGastos:c.length});let p=0,a=0;if(e&&d){let u=[];window.appState?.transactions&&(u=window.appState.transactions.filter(t=>{if(t.budgetId!==n)return!1;const x=h.txToDate(t);return x&&x>=e&&x<=d})),(!u||u.length===0)&&(u=await h.fetchTransactionsForPeriod(n,e,d)),p=u.filter(t=>t.tipo==="receita").reduce((t,x)=>t+parseFloat(x.valor||0),0),a=u.filter(t=>t.tipo==="despesa").reduce((t,x)=>t+parseFloat(x.valor||0),0)}const m={gastosPorCategoria:s,evolucaoSaldo:r,previsaoGastos:c,resumo:{saldoAtual:p-a,receitasMes:p,despesasMes:a,tendencia:c[0]?.saldo>=0?"positiva":"negativa",categoriasMaioresGastos:s.slice(0,3)}};return console.log("✅ Relatório completo gerado com sucesso"),m}catch(s){throw console.error("❌ Erro ao gerar relatório completo:",s),console.error("Stack trace:",s.stack),s}}}window.Analytics=h;function O($,{year:n,month:e}={}){try{let P=function(){const l=t?.value||"__all__",i=parseFloat(x?.value||"0")||0,y=parseFloat(M?.value||"")||0;let f=d;if(l!=="__all__"&&(f=f.filter(v=>v.event===l)),f=f.filter(v=>typeof v.durationMs!="number"||v.durationMs>=i),y>0){const v=Date.now()-y*6e4;f=f.filter(b=>(typeof b.ts=="number"?b.ts:0)>=v)}return f},F=function(){const l=P(),i=l.filter(k=>typeof k.durationMs=="number").slice(0,20),y=i.map(k=>k.durationMs||0).sort((k,T)=>k-T),f=i.length?y.reduce((k,T)=>k+T,0)/i.length:0,v=y.length?Math.ceil(.95*y.length)-1:-1,b=v>=0?y[v]:0;a.textContent=String(l.length),m.textContent=`${f.toFixed(1)} ms`,m.className=`text-2xl font-bold ${f>50?"text-red-600":"text-green-600"}`,u&&(u.textContent=`${b.toFixed(1)} ms`,u.className=`text-2xl font-bold ${b>120?"text-red-600":"text-amber-600"}`);const L=l.slice(0,C);p.innerHTML=L.map(k=>{const T=new Date(k.ts).toLocaleTimeString("pt-BR");return`<tr class="border-t border-gray-100 dark:border-gray-800">
          <td class="py-2 pr-4 text-gray-900 dark:text-gray-100">${k.event}</td>
          <td class="py-2 pr-4 ${k.durationMs>50?"text-red-600":"text-gray-700 dark:text-gray-300"}">${(k.durationMs||0).toFixed(1)} ms</td>
          <td class="py-2 text-gray-500 dark:text-gray-400">${T}</td>
        </tr>`}).join(""),D&&(D.style.display=l.length>C?"":"none")},o=function(l){const i=y=>'"'+String(y??"").replaceAll('"','""')+'"';return["ts,event,durationMs,meta"].concat(l.map(y=>{const{ts:f,event:v,durationMs:b,...L}=y||{},k=Object.keys(L).length?JSON.stringify(L):"";return[f,v,b??""].map(i).concat(i(k)).join(",")})).join(`\r
`)},g=function(){const l=P(),i=o(l);try{window.__lastExportCsv=i}catch{}try{const f=new Blob(["\uFEFF"+i],{type:"text/csv;charset=utf-8;"}),v=URL.createObjectURL(f),b=document.createElement("a");b.href=v,b.download=`telemetria_${n||new Date().getFullYear()}-${String(e||new Date().getMonth()+1).padStart(2,"0")}.csv`,document.body.appendChild(b),b.click(),document.body.removeChild(b),URL.revokeObjectURL(v)}catch{}};if(!(G?.isEnabled&&G.isEnabled()))return;const d=G.getLog&&G.getLog()||[],s=Array.from(new Set(d.map(l=>l.event))).filter(Boolean).sort(),r=document.createElement("div");r.className="mb-8",r.innerHTML=`
      <div class="flex items-center gap-2 mb-4">
        <div class="w-1 h-6 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full"></div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">⏱️ Telemetria Local</h2>
      </div>
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-4 flex flex-col md:flex-row md:items-end gap-3 border-b border-gray-200 dark:border-gray-700">
          <label class="text-sm text-gray-700 dark:text-gray-300">
            Evento
            <select id="telem-event-filter" data-testid="telem-event-filter" class="ml-2 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <option value="__all__">Todos</option>
              ${s.map(l=>`<option value="${l}">${l}</option>`).join("")}
            </select>
          </label>
          <label class="text-sm text-gray-700 dark:text-gray-300">
            Min ms
            <input id="telem-min-duration" data-testid="telem-min-duration" type="number" min="0" step="1" value="0" class="ml-2 w-24 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
          </label>
          <label class="text-sm text-gray-700 dark:text-gray-300">
            Últimos (min)
            <input id="telem-last-min" data-testid="telem-last-min" type="number" min="0" step="1" value="" placeholder="todos" class="ml-2 w-28 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
          </label>
          <div class="flex-1"></div>
          <button id="telem-clear" class="btn btn-outline btn-sm">Limpar</button>
          <button id="telem-export" data-testid="telem-export" class="btn btn-primary btn-sm">Exportar CSV</button>
          <button id="telem-copy" data-testid="telem-copy" class="btn btn-primary btn-sm">Copiar CSV</button>
        </div>
        <div class="p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">Eventos</div>
            <div id="telem-count" class="text-2xl font-bold text-gray-900 dark:text-gray-100">${d.length}</div>
          </div>
          <div class="text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">Média recente</div>
            <div id="telem-avg" class="text-2xl font-bold text-green-600">0.0 ms</div>
          </div>
          <div class="text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">p95 recente</div>
            <div id="telem-p95" class="text-2xl font-bold text-amber-600">0.0 ms</div>
          </div>
          <div class="text-center col-span-2 hidden md:block">
            <div class="text-sm text-gray-500 dark:text-gray-400">Período selecionado</div>
            <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">${String(e||new Date().getMonth()+1).padStart(2,"0")}/${n||new Date().getFullYear()}</div>
          </div>
        </div>
        <div class="px-4 pb-4 overflow-x-auto">
          <table class="min-w-full text-xs md:text-sm">
            <thead>
              <tr class="text-left text-gray-500 dark:text-gray-400">
                <th class="py-2 pr-4">Evento</th>
                <th class="py-2 pr-4">Duração</th>
                <th class="py-2">Quando</th>
              </tr>
            </thead>
            <tbody id="telem-tbody"></tbody>
          </table>
          <div class="mt-3">
            <button id="telem-more" data-testid="telem-more" class="btn btn-outline btn-sm">Mostrar mais</button>
          </div>
        </div>
      </div>
    `,$.appendChild(r);const c=l=>r.querySelector(l),p=c("#telem-tbody"),a=c("#telem-count"),m=c("#telem-avg"),u=c("#telem-p95"),t=c("#telem-event-filter"),x=c("#telem-min-duration"),M=c("#telem-last-min"),S=c("#telem-clear"),R=c("#telem-export"),E=c("#telem-copy"),D=c("#telem-more");let C=8;async function w(){const l=P(),i=o(l);try{window.__lastExportCsv=i}catch{}try{if(navigator?.clipboard?.writeText){await navigator.clipboard.writeText(i);try{window.__csvCopied=!0}catch{}}}catch{}}t?.addEventListener("change",F),x?.addEventListener("input",F),S?.addEventListener("click",()=>{t&&(t.value="__all__"),x&&(x.value="0"),M&&(M.value=""),C=8,F()}),R?.addEventListener("click",g),E?.addEventListener("click",w),M?.addEventListener("input",()=>{C=8,F()}),D?.addEventListener("click",()=>{C+=8,F()}),F()}catch{}}class K{static async render(n){console.log("📊 Renderizando página de análises...");const e=document.createElement("div");try{const s=window?.matchMedia&&window.matchMedia("(max-width: 480px)").matches;e.className="analytics-page"+(s?" analytics-compact":"")}catch{e.className="analytics-page"}const d=document.createElement("div");d.className="flex justify-center items-center py-12",d.innerHTML=`
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    `,e.appendChild(d);try{const s=n||window?.appState?.currentBudget?.id;if(!s){e.contains(d)&&e.removeChild(d);const o=document.createElement("div");return o.className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6",o.innerHTML=`
          <div class="flex items-start gap-3">
            <div class="text-2xl">📌</div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-gray-100 mb-1">Nenhum orçamento ativo</div>
              <div class="text-sm text-gray-700 dark:text-gray-300">Entre em um orçamento nas Configurações para visualizar as análises.</div>
              <div class="mt-4 flex gap-2">
                <button class="btn btn-primary" onclick="window.location.hash = '#/settings'">Ir para Configurações</button>
                <button class="btn btn-outline" onclick="window.location.hash = '#/dashboard'">Voltar ao Dashboard</button>
              </div>
            </div>
          </div>`,e.appendChild(o),e}const r=s,c=typeof U=="function"?U():{year:window.appState?.selectedYear||new Date().getFullYear(),month:window.appState?.selectedMonth||new Date().getMonth()+1},p=c.year,a=c.month,m=new Date(p,a-1,1),u=new Date(p,a,0),t=await h.gerarRelatorioCompleto(r,m,u);e.contains(d)&&e.removeChild(d);const x=!t||Number(t?.resumo?.receitasMes||0)===0&&Number(t?.resumo?.despesasMes||0)===0&&(Array.isArray(t?.evolucaoSaldo)?t.evolucaoSaldo.length===0:!0)&&(Array.isArray(t?.gastosPorCategoria)?t.gastosPorCategoria.length===0:!0);e.innerHTML=`
        <div class="tab-container">
          <div class="tab-header">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span class="text-white text-sm">📊</span>
                    </div>
                    <div>
                      <h1 class="text-2xl font-semibold text-gray-900 leading-tight">📊 Análises</h1>
                      <div class="flex items-center gap-1">
                        <span class="text-purple-600 dark:text-purple-400 text-xs">Inteligente</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="analytics-period-indicator"></div>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="content-spacing">
              <div id="analytics-sections"></div>
            </div>
          </div>
        </div>
      `;try{const o=e.querySelector(".tab-header");if(o){const g=document.createElement("button");g.id="analytics-advanced-toggle",g.className="btn btn-outline btn-sm",g.style.marginLeft="auto",g.textContent="Mostrar análises avançadas",o.appendChild(g)}}catch{}if(x){const o=e.querySelector("#analytics-sections")||e,g=document.createElement("div");return g.className="empty-state",g.innerHTML=`
          <div class="empty-icon">📊</div>
          <div class="empty-text">Sem dados para este período</div>
          <div class="empty-description">Registre sua primeira transação para ver gráficos e tendências.</div>
          <div class="mt-2"><button class="btn btn-primary" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar primeira transação</button></div>
        `,o.appendChild(g),e}const M=document.createElement("div");M.className="mb-4";const S=t.evolucaoSaldo&&t.evolucaoSaldo.length>1?t.resumo.saldoAtual-t.evolucaoSaldo[1].saldo:null;M.innerHTML=`
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Resumo</h2>
        </div>
        
        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
          <!-- Header Compacto -->
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span class="text-xl">📊</span>
                Análises Financeiras
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Período: ${String(a).padStart(2,"0")}/${p}</p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold ${t.resumo.saldoAtual>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                R$ ${t.resumo.saldoAtual.toFixed(2)}
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Saldo</p>
            </div>
          </div>
          
          <!-- Métricas Compactas -->
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
              <div class="text-lg mb-1">📈</div>
              <div class="text-lg font-bold text-green-600 dark:text-green-400">R$ ${t.resumo.receitasMes.toFixed(2)}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Receitas</div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
              <div class="text-lg mb-1">📉</div>
              <div class="text-lg font-bold text-red-600 dark:text-red-400">R$ ${t.resumo.despesasMes.toFixed(2)}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Despesas</div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
              <div class="text-lg mb-1">📊</div>
              <div class="text-lg font-bold ${t.resumo.tendencia==="positiva"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                ${t.resumo.tendencia==="positiva"?"↗":"↘"}
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Tendência</div>
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
                <span class="font-medium text-green-600 dark:text-green-400">R$ ${t.resumo.receitasMes.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-600 dark:text-gray-400">Despesas:</span>
                <span class="font-medium text-red-600 dark:text-red-400">R$ ${t.resumo.despesasMes.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                <span class="text-gray-600 dark:text-gray-400">Saldo:</span>
                <span class="font-bold ${t.resumo.saldoAtual>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                  R$ ${t.resumo.saldoAtual.toFixed(2)}
                </span>
              </div>
              ${S!==null?`
                <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                  <span class="text-gray-600 dark:text-gray-400">vs Mês Anterior:</span>
                  <span class="font-medium ${S>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                    ${S>=0?"+":""}R$ ${Math.abs(S).toFixed(2)}
                  </span>
                </div>
              `:""}
            </div>
          </div>
        </div>
      `;const R=e.querySelector("#analytics-sections")||e;R.appendChild(M);const E=document.createElement("div");E.id="analytics-advanced";try{const o=typeof localStorage<"u"?localStorage.getItem("analytics.advancedVisible"):null;(!o||o!=="1")&&E.classList.add("hidden")}catch{E.classList.add("hidden")}R.appendChild(E);try{const o=i=>{const y=parseFloat(String(i??"").toString().replace(",","."));return isNaN(y)?0:y};let g=0;const w=window?.appState?.currentBudget||null;w&&o(w.valorTotal)>0?g=o(w.valorTotal):Array.isArray(window?.appState?.categories)&&(g=(window.appState.categories||[]).filter(i=>i&&(i.tipo||"despesa")==="despesa").reduce((i,y)=>i+(o(y.limite)>0?o(y.limite):0),0));const l=o(t?.resumo?.despesasMes||0);if(g>0&&l>=0){const i=Math.max(0,Math.min(100,l/g*100)),y=new Date,f=p===y.getFullYear()&&a===y.getMonth()+1,v=new Date(p,a,0).getDate(),b=f?y.getDate():v,L=f?Math.min(100,b/v*100):100,k=g*L/100,T=k>0?l/k:0,z=T<=1.05?"ok":T<=1.2?"warn":"bad",q=96,j=42,Y=2*Math.PI*j,V=i/100*Y,N=document.createElement("div");N.className="mb-8",N.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🏁 Progresso do Mês</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <!-- Donut -->
                <div class="flex justify-center">
                  <svg width="${q}" height="${q}" viewBox="0 0 100 100" class="-rotate-90">
                    <circle cx="50" cy="50" r="${j}" stroke="var(--tw-prose-borders, #e5e7eb)" stroke-width="12" fill="none" class="text-gray-200 dark:text-gray-700"></circle>
                    <circle cx="50" cy="50" r="${j}" stroke="${i>100?"#ef4444":"#10b981"}" stroke-width="12" stroke-linecap="round" fill="none"
                      stroke-dasharray="${V} ${Y}" />
                  </svg>
                  <div class="absolute mt-10 md:mt-0 md:static -rotate-90 md:rotate-0"></div>
                </div>
                
                <!-- KPIs -->
                <div class="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Orçado</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-gray-100">R$ ${g.toFixed(2)}</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Gasto no mês</div>
                    <div class="text-lg font-bold ${l>g?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${l.toFixed(2)}</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Progresso</div>
                    <div class="text-lg font-bold ${i>100?"text-red-600":i>90?"text-yellow-600":"text-green-600"}">${i.toFixed(1)}%</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Burn rate ${f?"(até hoje)":"(final)"}</div>
                    <div class="text-lg font-bold ${z==="ok"?"text-green-600":z==="warn"?"text-yellow-600":"text-red-600"}">${(T*100).toFixed(0)}%</div>
                  </div>
                </div>
                
                <div class="md:col-span-3 text-xs text-gray-500 dark:text-gray-400">${f?`Você consumiu <span class="font-medium text-gray-900 dark:text-gray-100">${i.toFixed(1)}%</span> do orçamento. O esperado para hoje seria <span class="font-medium">${L.toFixed(1)}%</span>.`:`Resumo do mês selecionado: consumo total de <span class="font-medium">${i.toFixed(1)}%</span> do orçamento.`}</div>
              </div>
            </div>
          `,R.appendChild(N)}}catch(o){console.warn("MTD progress render skipped:",o?.message||o)}const D=document.createElement("div");D.className="mb-8",D.innerHTML=`
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
          <h2 class="text-2xl font-semibold text-gray-900 leading-tight">📊 Gráficos & Análises</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Gráfico de Evolução -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">📈 Evolução do Saldo</h3>
            </div>
            <div class="p-4" id="evolucao-chart">
              <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            </div>
          </div>
          
          <!-- Gráfico de Categorias -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🎯 Gastos por Categoria</h3>
            </div>
            <div class="p-4" id="categorias-chart">
              <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      `,E.appendChild(D);const C=document.createElement("div");C.className="mb-8",C.innerHTML=`
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔮 Previsões & Tendências</h2>
        </div>
        
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">📅 Previsão para os Próximos Meses</h3>
              <div class="text-xs text-gray-500 dark:text-gray-400 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-full">
                IA Predict
              </div>
            </div>
          </div>
          
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              ${t.previsaoGastos.slice(0,4).map((o,g)=>`
                <div class="bg-gradient-to-br ${g===0?"from-purple-500 to-pink-500":g===1?"from-blue-500 to-indigo-500":g===2?"from-green-500 to-teal-500":"from-orange-500 to-red-500"} rounded-xl p-4 text-white">
                  <div class="text-center">
                    <div class="text-lg font-bold mb-1">${o.nome} ${o.ano}</div>
                    <div class="text-2xl font-bold mb-2">R$ ${o.saldo.toFixed(2)}</div>
                    <div class="text-xs opacity-90">Saldo Previsto</div>
                    <div class="flex justify-between text-xs mt-2">
                      <span>📈 R$ ${o.receitas.toFixed(2)}</span>
                      <span>📉 R$ ${o.despesas.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Metodologia de Previsão</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Baseada na média dos últimos 3 meses com tendência de crescimento de 1% ao mês, 
                considerando sazonalidade e padrões históricos.
              </p>
            </div>
          </div>
        </div>
      `,E.appendChild(C),O(E,{year:p,month:a});try{const g=(await h.fetchTransactionsForPeriod(r,m,u)||[]).filter(v=>(v?.tipo||"despesa")==="despesa"),w=Array.isArray(window?.appState?.categories)?window.appState.categories:[],l=new Map(w.map(v=>[v.id,v])),i=v=>{try{return new Date(v).toLocaleDateString("pt-BR")}catch{return""}},y=g.map(v=>({...v,_date:h.txToDate(v),_cat:l.get(v.categoriaId)||v.categoria||null,_valor:parseFloat(v.valor||0)}));y.sort((v,b)=>(b._valor||0)-(v._valor||0));const f=y.slice(0,5);if(f.length){const v=document.createElement("div");v.className="mb-8",v.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-rose-500 to-red-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📌 Maiores Transações (mês)</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="divide-y divide-gray-100 dark:divide-gray-800">
                ${f.map(b=>`
                  <div class="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${b._cat?.cor||"#EF4444"}">
                        ${(b._cat?.nome||"?").slice(0,1).toUpperCase()}
                      </div>
                      <div class="min-w-0">
                        <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${b.descricao||b.titulo||b._cat?.nome||"Despesa"}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 truncate">${i(b._date)} • ${b._cat?.nome||"Sem categoria"}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-red-600">R$ ${(b._valor||0).toFixed(2)}</div>
                      <a href="#/transactions" class="text-xs text-indigo-600 hover:underline">ver no extrato</a>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `,R.appendChild(v)}}catch{}try{const o=Array.isArray(window?.appState?.categories)?window.appState.categories:[],g=new Map(o.map(l=>[l.id,parseFloat(l.limite||0)])),w=(t.gastosPorCategoria||[]).map(l=>{const i=g.get(l?.categoria?.id)||0,y=parseFloat(l.totalGasto||0),f=i>0?y/i*100:0;return{nome:l?.categoria?.nome||"Categoria",cor:l?.categoria?.cor||"#F59E0B",gasto:y,lim:i,pct:f}}).filter(l=>l.lim>0&&l.pct>=90).sort((l,i)=>i.pct-l.pct);if(w.length){const l=document.createElement("div");l.className="mb-8",l.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🚨 Categorias em Alerta</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                ${w.slice(0,6).map(i=>`
                  <div class="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="w-3 h-3 rounded-full" style="background-color:${i.cor}"></div>
                        <div>
                          <div class="font-medium text-gray-900 dark:text-gray-100">${i.nome}</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${i.lim.toFixed(2)}</div>
                        </div>
                      </div>
                      <div class="text-sm font-bold ${i.pct>=100?"text-red-600":"text-amber-600"}">${Math.min(i.pct,999).toFixed(1)}%</div>
                    </div>
                    <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="h-2 rounded-full ${i.pct>=100?"bg-red-500":"bg-amber-500"}" style="width:${Math.min(i.pct,100)}%"></div>
                    </div>
                    <div class="mt-1 text-xs text-gray-600 dark:text-gray-400">Gasto: R$ ${i.gasto.toFixed(2)}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          `,R.appendChild(l)}}catch{}const P=document.createElement("div");P.className="mb-8",P.innerHTML=`
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🎯 Análise Detalhada</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Maiores Gastos por Categoria -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🔥 Maiores Gastos</h3>
            </div>
            <div class="p-4">
              <div class="space-y-4">
                ${t.gastosPorCategoria.slice(0,5).map((o,g)=>`
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${o.categoria.cor||"#4F46E5"}">
                        ${g+1}
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">${o.categoria.nome}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${o.percentual.toFixed(1)}% do total</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-gray-900 dark:text-gray-100">R$ ${o.totalGasto.toFixed(2)}</div>
                      <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div class="h-2 rounded-full" style="width: ${o.percentual}%; background-color: ${o.categoria.cor||"#4F46E5"}"></div>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
          
          <!-- Insights e Recomendações -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">💡 Insights & Recomendações</h3>
            </div>
            <div class="p-4">
              <div class="space-y-4">
                ${J(t).map(o=>`
                  <div class="bg-gradient-to-r ${o.type==="positive"?"from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900":o.type==="warning"?"from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900":"from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900"} border ${o.type==="positive"?"border-green-200 dark:border-green-800":o.type==="warning"?"border-yellow-200 dark:border-yellow-800":"border-blue-200 dark:border-blue-800"} rounded-xl p-4">
                    <div class="flex items-start gap-3">
                      <div class="text-2xl">${o.icon}</div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">${o.title}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">${o.description}</div>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      `,E.appendChild(P);const F=(o=1,g=5)=>{const w=document.getElementById("evolucao-chart"),l=document.getElementById("categorias-chart");if(console.log(`🔍 Tentativa ${o}: Verificando elementos dos gráficos...`),console.log("- evolucao-chart:",!!w),console.log("- categorias-chart:",!!l),w&&l)try{if(console.log("📊 Renderizando gráficos..."),t.evolucaoSaldo&&t.evolucaoSaldo.length>0){const i=[...t.evolucaoSaldo];t.previsaoGastos&&t.previsaoGastos.length>0&&i.push(...t.previsaoGastos),h.renderizarGraficoEvolucao("evolucao-chart",i)}t.gastosPorCategoria&&t.gastosPorCategoria.length>0&&h.renderizarGraficoCategorias("categorias-chart",t.gastosPorCategoria),console.log("✅ Gráficos renderizados com sucesso!")}catch(i){console.error("❌ Erro ao renderizar gráficos:",i),w&&(w.innerHTML=`
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📊</div>
                  <p class="text-gray-500 dark:text-gray-400">Erro ao carregar gráfico</p>
                  <p class="text-xs text-gray-400 mt-2">${i.message}</p>
                </div>
              `),l&&(l.innerHTML=`
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📊</div>
                  <p class="text-gray-500 dark:text-gray-400">Erro ao carregar gráfico</p>
                  <p class="text-xs text-gray-400 mt-2">${i.message}</p>
                </div>
              `)}else if(o<g)console.log(`⏳ Elementos não encontrados, tentando novamente em ${o*100}ms...`),setTimeout(()=>F(o+1,g),o*100);else{console.error("❌ Não foi possível encontrar os elementos dos gráficos após",g,"tentativas");const i=document.getElementById("evolucao-chart"),y=document.getElementById("categorias-chart");i&&(i.innerHTML=`
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `),y&&(y.innerHTML=`
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `)}};setTimeout(()=>F(),100);try{const o=e.querySelector("#analytics-advanced-toggle"),g=e.querySelector("#analytics-advanced");if(o&&g){const w=()=>{const l=g.classList.contains("hidden");o.textContent=l?"Mostrar análises avançadas":"Ocultar análises avançadas"};w(),o.addEventListener("click",()=>{g.classList.toggle("hidden"),w();try{localStorage.setItem("analytics.advancedVisible",g.classList.contains("hidden")?"0":"1")}catch{}})}}catch{}}catch(s){console.error("❌ Erro ao renderizar página de análises:",s),e.contains(d)&&e.removeChild(d);const r=document.createElement("div");r.className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6",r.innerHTML=`
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline"> Não foi possível carregar os dados de análise. Tente novamente mais tarde.</span>
        <p class="text-sm mt-2">${s.message}</p>
      `,e.appendChild(r)}return e}}function J($){const n=[];if($.resumo.saldoAtual>=0?n.push({type:"positive",icon:"✅",title:"Saldo Positivo",description:"Seu saldo está positivo! Continue mantendo essa disciplina financeira."}):n.push({type:"warning",icon:"⚠️",title:"Saldo Negativo",description:"Seu saldo está negativo. Considere reduzir despesas ou aumentar receitas."}),$.resumo.tendencia==="positiva"?n.push({type:"positive",icon:"📈",title:"Tendência Positiva",description:"Sua situação financeira está melhorando! Mantenha o foco."}):n.push({type:"warning",icon:"📉",title:"Tendência Negativa",description:"Sua situação financeira está piorando. Revise seus gastos."}),$.gastosPorCategoria.length>0){const e=$.gastosPorCategoria[0];e.percentual>30&&n.push({type:"warning",icon:"🔥",title:"Gasto Concentrado",description:`${e.categoria.nome} representa ${e.percentual.toFixed(1)}% dos seus gastos. Considere diversificar.`})}if($.evolucaoSaldo.length>1){const e=$.resumo.saldoAtual-$.evolucaoSaldo[1].saldo;e>0?n.push({type:"positive",icon:"🎯",title:"Melhoria Mensal",description:`Seu saldo melhorou R$ ${e.toFixed(2)} em relação ao mês anterior.`}):n.push({type:"warning",icon:"📊",title:"Redução Mensal",description:`Seu saldo diminuiu R$ ${Math.abs(e).toFixed(2)} em relação ao mês anterior.`})}return $.previsaoGastos.length>0&&($.previsaoGastos[0].saldo<0?n.push({type:"warning",icon:"🔮",title:"Previsão Negativa",description:"Para o próximo mês, a previsão indica saldo negativo. Planeje com antecedência."}):n.push({type:"positive",icon:"🔮",title:"Previsão Positiva",description:"Para o próximo mês, a previsão indica saldo positivo. Continue assim!"})),$.gastosPorCategoria.length>0&&$.gastosPorCategoria.slice(0,3).reduce((d,s)=>d+s.percentual,0)>70&&n.push({type:"info",icon:"💡",title:"Gastos Concentrados",description:"As 3 maiores categorias representam mais de 70% dos seus gastos. Considere diversificar."}),n.slice(0,4)}window.AnalyticsPage=K;export{K as AnalyticsPage,O as renderTelemetrySection};
