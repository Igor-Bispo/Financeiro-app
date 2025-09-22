import{c as B,d as A,q as H,w as I,g as z,h as V}from"./main-Dlio5rBP.js";import G from"./perf-tobPnqr4.js";class h{static _cache=new Map;static _cacheTimeout=300*1e3;static async fetchTransactionsForPeriod(i,e,o){try{const s=`${i}_${e}_${o}`,r=h._cache.get(s);if(r&&Date.now()-r.timestamp<h._cacheTimeout)return r.data;const l=B(A,"transactions"),p=H(l,I("budgetId","==",i)),b=(await z(p)).docs.map(t=>({id:t.id,...t.data()})).filter(t=>{const u=h.txToDate(t);return u&&u>=e&&u<=o});return h._cache.set(s,{data:b,timestamp:Date.now()}),b}catch(s){return console.error("Erro ao buscar transações do período:",s),[]}}static clearCache(){h._cache.clear()}static txToDate(i){try{let e=i?.dataEfetivacao||i?.dataLancamento||i?.data||i?.date||i?.createdAt;if(!e)return null;if(e&&typeof e.toDate=="function")return e.toDate();if(typeof e=="string"){const s=e.trim(),r=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(r)return new Date(parseInt(r[1],10),parseInt(r[2],10)-1,parseInt(r[3],10));const l=new Date(s);return isNaN(l.getTime())?null:l}if(typeof e=="number"){const s=e<1e12?e*1e3:e,r=new Date(s);return isNaN(r.getTime())?null:r}if(e instanceof Date)return e;const o=new Date(e);return isNaN(o.getTime())?null:o}catch{return null}}static async getGastosPorCategoria(i,e,o){try{if(console.log("📊 Gerando relatório de gastos por categoria..."),!i)throw new Error("ID do orçamento não fornecido");if(!e||!o){const a=new Date;e=new Date(a.getFullYear(),a.getMonth(),1),o=new Date(a.getFullYear(),a.getMonth()+1,0)}let s=[],r=[];if(window.appState?.transactions&&window.appState?.categories){if(console.log("📊 Usando dados já carregados na aplicação"),s=window.appState.transactions.filter(a=>{if(a.budgetId!==i)return!1;const v=h.txToDate(a);return v&&v>=e&&v<=o}),r=window.appState.categories.filter(a=>a.budgetId===i),!s||s.length===0){const a=await h.fetchTransactionsForPeriod(i,e,o);a.length>0&&(s=a)}}else{console.log("📊 Buscando dados do Firestore..."),s=await h.fetchTransactionsForPeriod(i,e,o);const a=B(A,"categories"),v=H(a,I("budgetId","==",i));r=(await z(v)).docs.map(t=>({id:t.id,...t.data()}))}const l=r.map(a=>{const v=s.filter(t=>t.categoriaId===a.id),b=v.reduce((t,u)=>t+parseFloat(u.valor),0);return{categoria:a,totalGasto:b,transacoes:v,percentual:0}}),p=l.reduce((a,v)=>a+v.totalGasto,0);return l.forEach(a=>{a.percentual=p>0?a.totalGasto/p*100:0}),l.sort((a,v)=>v.totalGasto-a.totalGasto),console.log("✅ Relatório gerado com sucesso:",l),l}catch(s){throw console.error("❌ Erro ao gerar relatório de gastos por categoria:",s),s}}static async getEvolucaoSaldo(i,e=6){try{if(console.log("📊 Gerando relatório de evolução de saldo..."),!i)throw new Error("ID do orçamento não fornecido");const o=new Date,s=[];for(let r=0;r<e;r++){const l=o.getMonth()-r,p=o.getFullYear()+Math.floor(l/12),a=(l%12+12)%12,v=new Date(p,a,1),b=new Date(p,a+1,0);s.push({ano:p,mes:a+1,nome:v.toLocaleString("pt-BR",{month:"long"}),startDate:v,endDate:b,receitas:0,despesas:0,saldo:0})}for(const r of s){let l=[];if(window.appState?.transactions)l=window.appState.transactions.filter(p=>{if(p.budgetId!==i)return!1;const a=h.txToDate(p);return a&&a>=r.startDate&&a<=r.endDate});else{const p=B(A,"transactions"),a=H(p,I("budgetId","==",i));l=(await z(a)).docs.map(t=>({id:t.id,...t.data()})).filter(t=>{const u=h.txToDate(t);return u&&u>=r.startDate&&u<=r.endDate})}for(const p of l){const a=parseFloat(p.valor);p.tipo==="receita"?r.receitas+=a:r.despesas+=a}r.saldo=r.receitas-r.despesas}return s.sort((r,l)=>r.ano!==l.ano?l.ano-r.ano:l.mes-r.mes),console.log("✅ Relatório de evolução de saldo gerado com sucesso:",s),s}catch(o){throw console.error("❌ Erro ao gerar relatório de evolução de saldo:",o),o}}static async getPrevisaoGastos(i,e=3,o=3){try{if(console.log("📊 Gerando previsão de gastos..."),!i)throw new Error("ID do orçamento não fornecido");const s=await this.getEvolucaoSaldo(i,e),r=s.reduce((v,b)=>v+b.receitas,0)/s.length,l=s.reduce((v,b)=>v+b.despesas,0)/s.length,p=new Date,a=[];for(let v=1;v<=o;v++){const b=p.getMonth()+v,t=p.getFullYear()+Math.floor(b/12),u=b%12,S=new Date(t,u,1),E=1+v*.01;a.push({ano:t,mes:u+1,nome:S.toLocaleString("pt-BR",{month:"long"}),receitas:r*E,despesas:l*E,saldo:(r-l)*E,isPrevisto:!0})}return console.log("✅ Previsão de gastos gerada com sucesso:",a),a}catch(s){throw console.error("❌ Erro ao gerar previsão de gastos:",s),s}}static renderizarGraficoCategorias(i,e){try{console.log("📊 Renderizando gráfico de categorias...");const o=document.getElementById(i);if(!o)throw new Error(`Elemento com ID ${i} não encontrado`);if(o.innerHTML="",!e||e.length===0){o.innerHTML=`
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
      `;o.innerHTML=s,console.log("✅ Gráfico renderizado com sucesso")}catch(o){throw console.error("❌ Erro ao renderizar gráfico de categorias:",o),o}}static renderizarGraficoEvolucao(i,e){try{console.log("📊 Renderizando gráfico de evolução...");const o=document.getElementById(i);if(!o)throw new Error(`Elemento com ID ${i} não encontrado`);if(o.innerHTML="",!e||e.length===0){o.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const s=Math.max(...e.map(a=>a.receitas)),r=Math.max(...e.map(a=>a.despesas)),l=Math.max(s,r)*1.1,p=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Evolução Financeira</h3>
          
          <div class="relative h-64 mt-4 pl-12 pr-4">
            <!-- Linhas de grade -->
            <div class="absolute inset-0 grid grid-rows-4 w-full h-full">
              ${[0,1,2,3].map(a=>`
                <div class="border-t border-gray-200 dark:border-gray-700 relative">
                  <span class="absolute -top-3 -left-16 text-xs text-gray-500 dark:text-gray-400">
                    R$ ${(l/4*(4-a)).toFixed(0)}
                  </span>
                </div>
              `).join("")}
            </div>
            
            <!-- Gráfico de barras -->
            <div class="absolute inset-0 flex items-end justify-between gap-1">
              ${e.map((a,v)=>{const b=Math.max(a.receitas/l*100,2),t=Math.max(a.despesas/l*100,2),u=a.isPrevisto;return`
                  <div class="flex flex-col items-center justify-end flex-1 min-w-0">
                    <!-- Barra de receita -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-3 ${u?"bg-green-300/50":"bg-green-500"} rounded-t transition-all duration-300 hover:w-4" 
                           style="height: ${b}%"></div>
                    </div>
                    
                    <!-- Barra de despesa -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-3 ${u?"bg-red-300/50":"bg-red-500"} rounded-t transition-all duration-300 hover:w-4" 
                           style="height: ${t}%"></div>
                    </div>
                    
                    <!-- Rótulo do mês -->
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${u?"italic":""} text-center truncate w-full">
                      ${a.nome.substring(0,3)}
                      ${u?"*":""}
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
      `;o.innerHTML=p,console.log("✅ Gráfico de evolução renderizado com sucesso")}catch(o){throw console.error("❌ Erro ao renderizar gráfico de evolução:",o),o}}static async gerarRelatorioCompleto(i,e,o){try{if(console.log("📊 Gerando relatório completo..."),!i)throw new Error("ID do orçamento não fornecido");if(!window.appState?.currentUser)throw new Error("Usuário não autenticado");console.log("🔍 Gerando relatório para orçamento:",i);const[s,r,l]=await Promise.all([this.getGastosPorCategoria(i,e,o),this.getEvolucaoSaldo(i,6),this.getPrevisaoGastos(i,3,3)]);console.log("📊 Dados obtidos:",{gastosPorCategoria:s.length,evolucaoSaldo:r.length,previsaoGastos:l.length});let p=0,a=0;if(e&&o){let b=[];window.appState?.transactions&&(b=window.appState.transactions.filter(t=>{if(t.budgetId!==i)return!1;const u=h.txToDate(t);return u&&u>=e&&u<=o})),(!b||b.length===0)&&(b=await h.fetchTransactionsForPeriod(i,e,o)),p=b.filter(t=>t.tipo==="receita").reduce((t,u)=>t+parseFloat(u.valor||0),0),a=b.filter(t=>t.tipo==="despesa").reduce((t,u)=>t+parseFloat(u.valor||0),0)}const v={gastosPorCategoria:s,evolucaoSaldo:r,previsaoGastos:l,resumo:{saldoAtual:p-a,receitasMes:p,despesasMes:a,tendencia:l[0]?.saldo>=0?"positiva":"negativa",categoriasMaioresGastos:s.slice(0,3)}};return console.log("✅ Relatório completo gerado com sucesso"),v}catch(s){throw console.error("❌ Erro ao gerar relatório completo:",s),console.error("Stack trace:",s.stack),s}}}window.Analytics=h;function K($,{year:i,month:e}={}){try{let D=function(){const g=t?.value||"__all__",c=parseFloat(u?.value||"0")||0,d=parseFloat(S?.value||"")||0;let x=o;if(g!=="__all__"&&(x=x.filter(f=>f.event===g)),x=x.filter(f=>typeof f.durationMs!="number"||f.durationMs>=c),d>0){const f=Date.now()-d*6e4;x=x.filter(m=>(typeof m.ts=="number"?m.ts:0)>=f)}return x},C=function(){const g=D(),c=g.filter(k=>typeof k.durationMs=="number").slice(0,20),d=c.map(k=>k.durationMs||0).sort((k,R)=>k-R),x=c.length?d.reduce((k,R)=>k+R,0)/c.length:0,f=d.length?Math.ceil(.95*d.length)-1:-1,m=f>=0?d[f]:0;a.textContent=String(g.length),v.textContent=`${x.toFixed(1)} ms`,v.className=`text-2xl font-bold ${x>50?"text-red-600":"text-green-600"}`,b&&(b.textContent=`${m.toFixed(1)} ms`,b.className=`text-2xl font-bold ${m>120?"text-red-600":"text-amber-600"}`);const w=g.slice(0,F);p.innerHTML=w.map(k=>{const R=new Date(k.ts).toLocaleTimeString("pt-BR");return`<tr class="border-t border-gray-100 dark:border-gray-800">
          <td class="py-2 pr-4 text-gray-900 dark:text-gray-100">${k.event}</td>
          <td class="py-2 pr-4 ${k.durationMs>50?"text-red-600":"text-gray-700 dark:text-gray-300"}">${(k.durationMs||0).toFixed(1)} ms</td>
          <td class="py-2 text-gray-500 dark:text-gray-400">${R}</td>
        </tr>`}).join(""),M&&(M.style.display=g.length>F?"":"none")},L=function(g){const c=d=>'"'+String(d??"").replaceAll('"','""')+'"';return["ts,event,durationMs,meta"].concat(g.map(d=>{const{ts:x,event:f,durationMs:m,...w}=d||{},k=Object.keys(w).length?JSON.stringify(w):"";return[x,f,m??""].map(c).concat(c(k)).join(",")})).join(`\r
`)},n=function(){const g=D(),c=L(g);try{window.__lastExportCsv=c}catch{}try{const x=new Blob(["\uFEFF"+c],{type:"text/csv;charset=utf-8;"}),f=URL.createObjectURL(x),m=document.createElement("a");m.href=f,m.download=`telemetria_${i||new Date().getFullYear()}-${String(e||new Date().getMonth()+1).padStart(2,"0")}.csv`,document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(f)}catch{}};if(!(G?.isEnabled&&G.isEnabled()))return;const o=G.getLog&&G.getLog()||[],s=Array.from(new Set(o.map(g=>g.event))).filter(Boolean).sort(),r=document.createElement("div");r.className="mb-8",r.innerHTML=`
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
              ${s.map(g=>`<option value="${g}">${g}</option>`).join("")}
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
            <div id="telem-count" class="text-2xl font-bold text-gray-900 dark:text-gray-100">${o.length}</div>
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
            <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">${String(e||new Date().getMonth()+1).padStart(2,"0")}/${i||new Date().getFullYear()}</div>
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
    `,$.appendChild(r);const l=g=>r.querySelector(g),p=l("#telem-tbody"),a=l("#telem-count"),v=l("#telem-avg"),b=l("#telem-p95"),t=l("#telem-event-filter"),u=l("#telem-min-duration"),S=l("#telem-last-min"),E=l("#telem-clear"),T=l("#telem-export"),P=l("#telem-copy"),M=l("#telem-more");let F=8;async function y(){const g=D(),c=L(g);try{window.__lastExportCsv=c}catch{}try{if(navigator?.clipboard?.writeText){await navigator.clipboard.writeText(c);try{window.__csvCopied=!0}catch{}}}catch{}}t?.addEventListener("change",C),u?.addEventListener("input",C),E?.addEventListener("click",()=>{t&&(t.value="__all__"),u&&(u.value="0"),S&&(S.value=""),F=8,C()}),T?.addEventListener("click",n),P?.addEventListener("click",y),S?.addEventListener("input",()=>{F=8,C()}),M?.addEventListener("click",()=>{F+=8,C()}),C()}catch{}}class J{static async render(i){console.log("📊 Renderizando página de análises...");const e=document.createElement("div");try{const s=window?.matchMedia&&window.matchMedia("(max-width: 480px)").matches;e.className="analytics-page"+(s?" analytics-compact":"")}catch{e.className="analytics-page"}const o=document.createElement("div");o.className="flex justify-center items-center py-12",o.innerHTML=`
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    `,e.appendChild(o);try{const s=i||window?.appState?.currentBudget?.id;if(!s){e.contains(o)&&e.removeChild(o);const n=document.createElement("div");return n.className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6",n.innerHTML=`
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
          </div>`,e.appendChild(n),e}const r=s,l=typeof V=="function"?V():{year:window.appState?.selectedYear||new Date().getFullYear(),month:window.appState?.selectedMonth||new Date().getMonth()+1},p=l.year,a=l.month,v=new Date(p,a-1,1),b=new Date(p,a,0),t=await h.gerarRelatorioCompleto(r,v,b);e.contains(o)&&e.removeChild(o);const u=!t||Number(t?.resumo?.receitasMes||0)===0&&Number(t?.resumo?.despesasMes||0)===0&&(Array.isArray(t?.evolucaoSaldo)?t.evolucaoSaldo.length===0:!0)&&(Array.isArray(t?.gastosPorCategoria)?t.gastosPorCategoria.length===0:!0);if(e.innerHTML=`
        <div class="tab-container">
          <div class="tab-header">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between w-full gap-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span class="text-white text-sm">📊</span>
                    </div>
                    <div>
                      <h1 class="text-2xl font-semibold text-gray-900 leading-tight">Análises</h1>
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
      `,u){const n=e.querySelector("#analytics-sections")||e,y=document.createElement("div");return y.className="empty-state",y.innerHTML=`
          <div class="empty-icon">📊</div>
          <div class="empty-text">Sem dados para este período</div>
          <div class="empty-description">Registre sua primeira transação para ver gráficos e tendências.</div>
          <div class="mt-2"><button class="btn btn-primary" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar primeira transação</button></div>
        `,n.appendChild(y),e}const S=document.createElement("div");S.className="mb-4";const E=t.evolucaoSaldo&&t.evolucaoSaldo.length>1?t.resumo.saldoAtual-t.evolucaoSaldo[1].saldo:null;S.innerHTML=`
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Resumo</h2>
        </div>
        
        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
          <!-- Header Compacto -->
          <div class="flex items-center justify-between mb-4 gap-4">
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
              ${E!==null?`
                <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                  <span class="text-gray-600 dark:text-gray-400">vs Mês Anterior:</span>
                  <span class="font-medium ${E>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                    ${E>=0?"+":""}R$ ${Math.abs(E).toFixed(2)}
                  </span>
                </div>
              `:""}
            </div>
          </div>
        </div>
      `;const T=e.querySelector("#analytics-sections")||e;T.appendChild(S);const P=document.createElement("button");P.id="analytics-advanced-toggle",P.className="btn btn-outline btn-sm w-full mt-4",P.textContent="Mostrar análises avançadas",T.appendChild(P);const M=document.createElement("div");M.id="analytics-advanced";try{const n=typeof localStorage<"u"?localStorage.getItem("analytics.advancedVisible"):null;(!n||n!=="1")&&M.classList.add("hidden")}catch{M.classList.add("hidden")}T.appendChild(M);try{const n=d=>{const x=parseFloat(String(d??"").toString().replace(",","."));return isNaN(x)?0:x};let y=0;const g=window?.appState?.currentBudget||null;g&&n(g.valorTotal)>0?y=n(g.valorTotal):Array.isArray(window?.appState?.categories)&&(y=(window.appState.categories||[]).filter(d=>d&&(d.tipo||"despesa")==="despesa").reduce((d,x)=>d+(n(x.limite)>0?n(x.limite):0),0));const c=n(t?.resumo?.despesasMes||0);if(y>0&&c>=0){const d=Math.max(0,Math.min(100,c/y*100)),x=new Date,f=p===x.getFullYear()&&a===x.getMonth()+1,m=new Date(p,a,0).getDate(),w=f?x.getDate():m,k=f?Math.min(100,w/m*100):100,R=y*k/100,j=R>0?c/R:0,q=j<=1.05?"ok":j<=1.2?"warn":"bad",Y=96,N=42,U=2*Math.PI*N,O=d/100*U,_=document.createElement("div");_.className="mb-8",_.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🏁 Progresso do Mês</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <!-- Donut -->
                <div class="flex justify-center">
                  <svg width="${Y}" height="${Y}" viewBox="0 0 100 100" class="-rotate-90">
                    <circle cx="50" cy="50" r="${N}" stroke="var(--tw-prose-borders, #e5e7eb)" stroke-width="12" fill="none" class="text-gray-200 dark:text-gray-700"></circle>
                    <circle cx="50" cy="50" r="${N}" stroke="${d>100?"#ef4444":"#10b981"}" stroke-width="12" stroke-linecap="round" fill="none"
                      stroke-dasharray="${O} ${U}" />
                  </svg>
                  <div class="absolute mt-10 md:mt-0 md:static -rotate-90 md:rotate-0"></div>
                </div>
                
                <!-- KPIs -->
                <div class="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Orçado</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-gray-100">R$ ${y.toFixed(2)}</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Gasto no mês</div>
                    <div class="text-lg font-bold ${c>y?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${c.toFixed(2)}</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Progresso</div>
                    <div class="text-lg font-bold ${d>100?"text-red-600":d>90?"text-yellow-600":"text-green-600"}">${d.toFixed(1)}%</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Burn rate ${f?"(até hoje)":"(final)"}</div>
                    <div class="text-lg font-bold ${q==="ok"?"text-green-600":q==="warn"?"text-yellow-600":"text-red-600"}">${(j*100).toFixed(0)}%</div>
                  </div>
                </div>
                
                <div class="md:col-span-3 text-xs text-gray-500 dark:text-gray-400">${f?`Você consumiu <span class="font-medium text-gray-900 dark:text-gray-100">${d.toFixed(1)}%</span> do orçamento. O esperado para hoje seria <span class="font-medium">${k.toFixed(1)}%</span>.`:`Resumo do mês selecionado: consumo total de <span class="font-medium">${d.toFixed(1)}%</span> do orçamento.`}</div>
              </div>
            </div>
          `,T.appendChild(_)}}catch(n){console.warn("MTD progress render skipped:",n?.message||n)}const F=document.createElement("div");F.className="mb-8",F.innerHTML=`
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
      `,M.appendChild(F);const D=document.createElement("div");D.className="mb-8",D.innerHTML=`
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔮 Previsões & Tendências</h2>
        </div>
        
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center gap-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">📅 Previsão para os Próximos Meses</h3>
              <div class="text-xs text-gray-500 dark:text-gray-400 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-full">
                IA Predict
              </div>
            </div>
          </div>
          
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              ${t.previsaoGastos.slice(0,4).map((n,y)=>`
                <div class="bg-gradient-to-br ${y===0?"from-purple-500 to-pink-500":y===1?"from-blue-500 to-indigo-500":y===2?"from-green-500 to-teal-500":"from-orange-500 to-red-500"} rounded-xl p-4 text-white">
                  <div class="text-center">
                    <div class="text-lg font-bold mb-1">${n.nome} ${n.ano}</div>
                    <div class="text-2xl font-bold mb-2">R$ ${n.saldo.toFixed(2)}</div>
                    <div class="text-xs opacity-90">Saldo Previsto</div>
                    <div class="flex justify-between text-xs mt-2">
                      <span>📈 R$ ${n.receitas.toFixed(2)}</span>
                      <span>📉 R$ ${n.despesas.toFixed(2)}</span>
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
      `,M.appendChild(D),K(M,{year:p,month:a});try{const y=(await h.fetchTransactionsForPeriod(r,v,b)||[]).filter(m=>(m?.tipo||"despesa")==="despesa"),g=Array.isArray(window?.appState?.categories)?window.appState.categories:[],c=new Map(g.map(m=>[m.id,m])),d=m=>{try{return new Date(m).toLocaleDateString("pt-BR")}catch{return""}},x=y.map(m=>({...m,_date:h.txToDate(m),_cat:c.get(m.categoriaId)||m.categoria||null,_valor:parseFloat(m.valor||0)}));x.sort((m,w)=>(w._valor||0)-(m._valor||0));const f=x.slice(0,5);if(f.length){const m=document.createElement("div");m.className="mb-8",m.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-rose-500 to-red-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📌 Maiores Transações (mês)</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="divide-y divide-gray-100 dark:divide-gray-800">
                ${f.map(w=>`
                  <div class="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${w._cat?.cor||"#EF4444"}">
                        ${(w._cat?.nome||"?").slice(0,1).toUpperCase()}
                      </div>
                      <div class="min-w-0">
                        <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${w.descricao||w.titulo||w._cat?.nome||"Despesa"}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 truncate">${d(w._date)} • ${w._cat?.nome||"Sem categoria"}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-red-600">R$ ${(w._valor||0).toFixed(2)}</div>
                      <a href="#/transactions" class="text-xs text-indigo-600 hover:underline">ver no extrato</a>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `,T.appendChild(m)}}catch{}try{const n=Array.isArray(window?.appState?.categories)?window.appState.categories:[],y=new Map(n.map(c=>[c.id,parseFloat(c.limite||0)])),g=(t.gastosPorCategoria||[]).map(c=>{const d=y.get(c?.categoria?.id)||0,x=parseFloat(c.totalGasto||0),f=d>0?x/d*100:0;return{nome:c?.categoria?.nome||"Categoria",cor:c?.categoria?.cor||"#F59E0B",gasto:x,lim:d,pct:f}}).filter(c=>c.lim>0&&c.pct>=90).sort((c,d)=>d.pct-c.pct);if(g.length){const c=document.createElement("div");c.className="mb-8",c.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🚨 Categorias em Alerta</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                ${g.slice(0,6).map(d=>`
                  <div class="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <div class="flex items-center justify-between gap-4">
                      <div class="flex items-center gap-3">
                        <div class="w-3 h-3 rounded-full" style="background-color:${d.cor}"></div>
                        <div>
                          <div class="font-medium text-gray-900 dark:text-gray-100">${d.nome}</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${d.lim.toFixed(2)}</div>
                        </div>
                      </div>
                      <div class="text-sm font-bold ${d.pct>=100?"text-red-600":"text-amber-600"}">${Math.min(d.pct,999).toFixed(1)}%</div>
                    </div>
                    <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="h-2 rounded-full ${d.pct>=100?"bg-red-500":"bg-amber-500"}" style="width:${Math.min(d.pct,100)}%"></div>
                    </div>
                    <div class="mt-1 text-xs text-gray-600 dark:text-gray-400">Gasto: R$ ${d.gasto.toFixed(2)}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          `,T.appendChild(c)}}catch{}const C=document.createElement("div");C.className="mb-8",C.innerHTML=`
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
                ${t.gastosPorCategoria.slice(0,5).map((n,y)=>`
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${n.categoria.cor||"#4F46E5"}">
                        ${y+1}
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">${n.categoria.nome}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${n.percentual.toFixed(1)}% do total</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-gray-900 dark:text-gray-100">R$ ${n.totalGasto.toFixed(2)}</div>
                      <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div class="h-2 rounded-full" style="width: ${n.percentual}%; background-color: ${n.categoria.cor||"#4F46E5"}"></div>
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
                ${Q(t).map(n=>`
                  <div class="bg-gradient-to-r ${n.type==="positive"?"from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900":n.type==="warning"?"from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900":"from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900"} border ${n.type==="positive"?"border-green-200 dark:border-green-800":n.type==="warning"?"border-yellow-200 dark:border-yellow-800":"border-blue-200 dark:border-blue-800"} rounded-xl p-4">
                    <div class="flex items-start gap-3">
                      <div class="text-2xl">${n.icon}</div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">${n.title}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">${n.description}</div>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      `,M.appendChild(C);const L=(n=1,y=5)=>{const g=document.getElementById("evolucao-chart"),c=document.getElementById("categorias-chart");if(console.log(`🔍 Tentativa ${n}: Verificando elementos dos gráficos...`),console.log("- evolucao-chart:",!!g),console.log("- categorias-chart:",!!c),g&&c)try{if(console.log("📊 Renderizando gráficos..."),t.evolucaoSaldo&&t.evolucaoSaldo.length>0){const d=[...t.evolucaoSaldo];t.previsaoGastos&&t.previsaoGastos.length>0&&d.push(...t.previsaoGastos),h.renderizarGraficoEvolucao("evolucao-chart",d)}t.gastosPorCategoria&&t.gastosPorCategoria.length>0&&h.renderizarGraficoCategorias("categorias-chart",t.gastosPorCategoria),console.log("✅ Gráficos renderizados com sucesso!")}catch(d){console.error("❌ Erro ao renderizar gráficos:",d),g&&(g.innerHTML=`
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📊</div>
                  <p class="text-gray-500 dark:text-gray-400">Erro ao carregar gráfico</p>
                  <p class="text-xs text-gray-400 mt-2">${d.message}</p>
                </div>
              `),c&&(c.innerHTML=`
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📊</div>
                  <p class="text-gray-500 dark:text-gray-400">Erro ao carregar gráfico</p>
                  <p class="text-xs text-gray-400 mt-2">${d.message}</p>
                </div>
              `)}else if(n<y)console.log(`⏳ Elementos não encontrados, tentando novamente em ${n*100}ms...`),setTimeout(()=>L(n+1,y),n*100);else{console.error("❌ Não foi possível encontrar os elementos dos gráficos após",y,"tentativas");const d=document.getElementById("evolucao-chart"),x=document.getElementById("categorias-chart");d&&(d.innerHTML=`
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `),x&&(x.innerHTML=`
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `)}};setTimeout(()=>L(),100);try{const n=e.querySelector("#analytics-advanced-toggle"),y=e.querySelector("#analytics-advanced");if(n&&y){const g=()=>{const c=y.classList.contains("hidden");n.textContent=c?"Mostrar análises avançadas":"Ocultar análises avançadas"};g(),n.addEventListener("click",()=>{y.classList.toggle("hidden"),g();try{localStorage.setItem("analytics.advancedVisible",y.classList.contains("hidden")?"0":"1")}catch{}})}}catch{}}catch(s){console.error("❌ Erro ao renderizar página de análises:",s),e.contains(o)&&e.removeChild(o);const r=document.createElement("div");r.className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6",r.innerHTML=`
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline"> Não foi possível carregar os dados de análise. Tente novamente mais tarde.</span>
        <p class="text-sm mt-2">${s.message}</p>
      `,e.appendChild(r)}return e}}function Q($){const i=[];if($.resumo.saldoAtual>=0?i.push({type:"positive",icon:"✅",title:"Saldo Positivo",description:"Seu saldo está positivo! Continue mantendo essa disciplina financeira."}):i.push({type:"warning",icon:"⚠️",title:"Saldo Negativo",description:"Seu saldo está negativo. Considere reduzir despesas ou aumentar receitas."}),$.resumo.tendencia==="positiva"?i.push({type:"positive",icon:"📈",title:"Tendência Positiva",description:"Sua situação financeira está melhorando! Mantenha o foco."}):i.push({type:"warning",icon:"📉",title:"Tendência Negativa",description:"Sua situação financeira está piorando. Revise seus gastos."}),$.gastosPorCategoria.length>0){const e=$.gastosPorCategoria[0];e.percentual>30&&i.push({type:"warning",icon:"🔥",title:"Gasto Concentrado",description:`${e.categoria.nome} representa ${e.percentual.toFixed(1)}% dos seus gastos. Considere diversificar.`})}if($.evolucaoSaldo.length>1){const e=$.resumo.saldoAtual-$.evolucaoSaldo[1].saldo;e>0?i.push({type:"positive",icon:"🎯",title:"Melhoria Mensal",description:`Seu saldo melhorou R$ ${e.toFixed(2)} em relação ao mês anterior.`}):i.push({type:"warning",icon:"📊",title:"Redução Mensal",description:`Seu saldo diminuiu R$ ${Math.abs(e).toFixed(2)} em relação ao mês anterior.`})}return $.previsaoGastos.length>0&&($.previsaoGastos[0].saldo<0?i.push({type:"warning",icon:"🔮",title:"Previsão Negativa",description:"Para o próximo mês, a previsão indica saldo negativo. Planeje com antecedência."}):i.push({type:"positive",icon:"🔮",title:"Previsão Positiva",description:"Para o próximo mês, a previsão indica saldo positivo. Continue assim!"})),$.gastosPorCategoria.length>0&&$.gastosPorCategoria.slice(0,3).reduce((o,s)=>o+s.percentual,0)>70&&i.push({type:"info",icon:"💡",title:"Gastos Concentrados",description:"As 3 maiores categorias representam mais de 70% dos seus gastos. Considere diversificar."}),i.slice(0,4)}window.AnalyticsPage=J;export{J as AnalyticsPage,K as renderTelemetrySection};
