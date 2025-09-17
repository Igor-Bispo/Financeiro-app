import{c as H,d as I,q as j,w as T,g as A,h as U}from"./main-Cgfq5EFn.js";import N from"./perf-tobPnqr4.js";class ${static async fetchTransactionsForPeriod(n,e,d){try{const r=H(I,"transactions");try{const t=j(r,T("budgetId","==",n),T("createdAt",">=",e),T("createdAt","<=",d)),x=(await A(t)).docs.map(a=>({id:a.id,...a.data()}));if(x.length>0)return x}catch(t){console.warn("Fallback to broad query (createdAt range unsupported or empty):",t?.message||t)}const o=j(r,T("budgetId","==",n));return(await A(o)).docs.map(t=>({id:t.id,...t.data()})).filter(t=>{const g=$.txToDate(t);return g&&g>=e&&g<=d})}catch(r){return console.error("Erro ao buscar transações do período:",r),[]}}static txToDate(n){try{let e=n?.dataEfetivacao||n?.dataLancamento||n?.data||n?.date||n?.createdAt;if(!e)return null;if(e&&typeof e.toDate=="function")return e.toDate();if(typeof e=="string"){const r=e.trim(),o=r.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(o)return new Date(parseInt(o[1],10),parseInt(o[2],10)-1,parseInt(o[3],10));const c=new Date(r);return isNaN(c.getTime())?null:c}if(typeof e=="number"){const r=e<1e12?e*1e3:e,o=new Date(r);return isNaN(o.getTime())?null:o}if(e instanceof Date)return e;const d=new Date(e);return isNaN(d.getTime())?null:d}catch{return null}}static async getGastosPorCategoria(n,e,d){try{if(console.log("📊 Gerando relatório de gastos por categoria..."),!n)throw new Error("ID do orçamento não fornecido");if(!e||!d){const t=new Date;e=new Date(t.getFullYear(),t.getMonth(),1),d=new Date(t.getFullYear(),t.getMonth()+1,0)}let r=[],o=[];if(window.appState?.transactions&&window.appState?.categories){if(console.log("📊 Usando dados já carregados na aplicação"),r=window.appState.transactions.filter(t=>{if(t.budgetId!==n)return!1;const g=$.txToDate(t);return g&&g>=e&&g<=d}),o=window.appState.categories.filter(t=>t.budgetId===n),!r||r.length===0){const t=await $.fetchTransactionsForPeriod(n,e,d);t.length>0&&(r=t)}}else{console.log("📊 Buscando dados do Firestore..."),r=await $.fetchTransactionsForPeriod(n,e,d);const t=H(I,"categories"),g=j(t,T("budgetId","==",n));o=(await A(g)).docs.map(a=>({id:a.id,...a.data()}))}const c=o.map(t=>{const g=r.filter(a=>a.categoriaId===t.id),x=g.reduce((a,b)=>a+parseFloat(b.valor),0);return{categoria:t,totalGasto:x,transacoes:g,percentual:0}}),m=c.reduce((t,g)=>t+g.totalGasto,0);return c.forEach(t=>{t.percentual=m>0?t.totalGasto/m*100:0}),c.sort((t,g)=>g.totalGasto-t.totalGasto),console.log("✅ Relatório gerado com sucesso:",c),c}catch(r){throw console.error("❌ Erro ao gerar relatório de gastos por categoria:",r),r}}static async getEvolucaoSaldo(n,e=6){try{if(console.log("📊 Gerando relatório de evolução de saldo..."),!n)throw new Error("ID do orçamento não fornecido");const d=new Date,r=[];for(let o=0;o<e;o++){const c=d.getMonth()-o,m=d.getFullYear()+Math.floor(c/12),t=(c%12+12)%12,g=new Date(m,t,1),x=new Date(m,t+1,0);r.push({ano:m,mes:t+1,nome:g.toLocaleString("pt-BR",{month:"long"}),startDate:g,endDate:x,receitas:0,despesas:0,saldo:0})}for(const o of r){let c=[];if(window.appState?.transactions)c=window.appState.transactions.filter(m=>{if(m.budgetId!==n)return!1;const t=$.txToDate(m);return t&&t>=o.startDate&&t<=o.endDate});else{const m=H(I,"transactions"),t=j(m,T("budgetId","==",n),T("createdAt",">=",o.startDate),T("createdAt","<=",o.endDate));c=(await A(t)).docs.map(x=>({id:x.id,...x.data()}))}for(const m of c){const t=parseFloat(m.valor);m.tipo==="receita"?o.receitas+=t:o.despesas+=t}o.saldo=o.receitas-o.despesas}return r.sort((o,c)=>o.ano!==c.ano?c.ano-o.ano:c.mes-o.mes),console.log("✅ Relatório de evolução de saldo gerado com sucesso:",r),r}catch(d){throw console.error("❌ Erro ao gerar relatório de evolução de saldo:",d),d}}static async getPrevisaoGastos(n,e=3,d=3){try{if(console.log("📊 Gerando previsão de gastos..."),!n)throw new Error("ID do orçamento não fornecido");const r=await this.getEvolucaoSaldo(n,e),o=r.reduce((g,x)=>g+x.receitas,0)/r.length,c=r.reduce((g,x)=>g+x.despesas,0)/r.length,m=new Date,t=[];for(let g=1;g<=d;g++){const x=m.getMonth()+g,a=m.getFullYear()+Math.floor(x/12),b=x%12,M=new Date(a,b,1),S=1+g*.01;t.push({ano:a,mes:b+1,nome:M.toLocaleString("pt-BR",{month:"long"}),receitas:o*S,despesas:c*S,saldo:(o-c)*S,isPrevisto:!0})}return console.log("✅ Previsão de gastos gerada com sucesso:",t),t}catch(r){throw console.error("❌ Erro ao gerar previsão de gastos:",r),r}}static renderizarGraficoCategorias(n,e){try{console.log("📊 Renderizando gráfico de categorias...");const d=document.getElementById(n);if(!d)throw new Error(`Elemento com ID ${n} não encontrado`);if(d.innerHTML="",!e||e.length===0){d.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const r=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Gastos por Categoria</h3>
          <div class="space-y-3">
            ${e.map(o=>`
              <div class="chart-item">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${o.categoria.nome}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    R$ ${o.totalGasto.toFixed(2)} (${o.percentual.toFixed(1)}%)
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div class="h-2.5 rounded-full" 
                       style="width: ${o.percentual}%; background-color: ${o.categoria.cor||"#4F46E5"}"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;d.innerHTML=r,console.log("✅ Gráfico renderizado com sucesso")}catch(d){throw console.error("❌ Erro ao renderizar gráfico de categorias:",d),d}}static renderizarGraficoEvolucao(n,e){try{console.log("📊 Renderizando gráfico de evolução...");const d=document.getElementById(n);if(!d)throw new Error(`Elemento com ID ${n} não encontrado`);if(d.innerHTML="",!e||e.length===0){d.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const r=Math.max(...e.map(t=>t.receitas)),o=Math.max(...e.map(t=>t.despesas)),c=Math.max(r,o)*1.1,m=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Evolução Financeira</h3>
          
          <div class="relative h-64 mt-4 pl-12 pr-4">
            <!-- Linhas de grade -->
            <div class="absolute inset-0 grid grid-rows-4 w-full h-full">
              ${[0,1,2,3].map(t=>`
                <div class="border-t border-gray-200 dark:border-gray-700 relative">
                  <span class="absolute -top-3 -left-16 text-xs text-gray-500 dark:text-gray-400">
                    R$ ${(c/4*(4-t)).toFixed(0)}
                  </span>
                </div>
              `).join("")}
            </div>
            
            <!-- Gráfico de barras -->
            <div class="absolute inset-0 flex items-end justify-between gap-1">
              ${e.map((t,g)=>{const x=Math.max(t.receitas/c*100,2),a=Math.max(t.despesas/c*100,2),b=t.isPrevisto;return`
                  <div class="flex flex-col items-center justify-end flex-1 min-w-0">
                    <!-- Barra de receita -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-3 ${b?"bg-green-300/50":"bg-green-500"} rounded-t transition-all duration-300 hover:w-4" 
                           style="height: ${x}%"></div>
                    </div>
                    
                    <!-- Barra de despesa -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-3 ${b?"bg-red-300/50":"bg-red-500"} rounded-t transition-all duration-300 hover:w-4" 
                           style="height: ${a}%"></div>
                    </div>
                    
                    <!-- Rótulo do mês -->
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${b?"italic":""} text-center truncate w-full">
                      ${t.nome.substring(0,3)}
                      ${b?"*":""}
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
            ${e.some(t=>t.isPrevisto)?`
              <div class="flex items-center">
                <span class="text-gray-600 dark:text-gray-400 italic">* Previsto</span>
              </div>
            `:""}
          </div>
        </div>
      `;d.innerHTML=m,console.log("✅ Gráfico de evolução renderizado com sucesso")}catch(d){throw console.error("❌ Erro ao renderizar gráfico de evolução:",d),d}}static async gerarRelatorioCompleto(n,e,d){try{if(console.log("📊 Gerando relatório completo..."),!n)throw new Error("ID do orçamento não fornecido");if(!window.appState?.currentUser)throw new Error("Usuário não autenticado");console.log("🔍 Gerando relatório para orçamento:",n);const[r,o,c]=await Promise.all([this.getGastosPorCategoria(n,e,d),this.getEvolucaoSaldo(n,6),this.getPrevisaoGastos(n,3,3)]);console.log("📊 Dados obtidos:",{gastosPorCategoria:r.length,evolucaoSaldo:o.length,previsaoGastos:c.length});let m=0,t=0;if(e&&d){let x=[];window.appState?.transactions&&(x=window.appState.transactions.filter(a=>{if(a.budgetId!==n)return!1;const b=$.txToDate(a);return b&&b>=e&&b<=d})),(!x||x.length===0)&&(x=await $.fetchTransactionsForPeriod(n,e,d)),m=x.filter(a=>a.tipo==="receita").reduce((a,b)=>a+parseFloat(b.valor||0),0),t=x.filter(a=>a.tipo==="despesa").reduce((a,b)=>a+parseFloat(b.valor||0),0)}const g={gastosPorCategoria:r,evolucaoSaldo:o,previsaoGastos:c,resumo:{saldoAtual:m-t,receitasMes:m,despesasMes:t,tendencia:c[0]?.saldo>=0?"positiva":"negativa",categoriasMaioresGastos:r.slice(0,3)}};return console.log("✅ Relatório completo gerado com sucesso"),g}catch(r){throw console.error("❌ Erro ao gerar relatório completo:",r),console.error("Stack trace:",r.stack),r}}}window.Analytics=$;function O(k,{year:n,month:e}={}){try{let D=function(){const l=a?.value||"__all__",i=parseFloat(b?.value||"0")||0,u=parseFloat(M?.value||"")||0;let f=d;if(l!=="__all__"&&(f=f.filter(p=>p.event===l)),f=f.filter(p=>typeof p.durationMs!="number"||p.durationMs>=i),u>0){const p=Date.now()-u*6e4;f=f.filter(y=>(typeof y.ts=="number"?y.ts:0)>=p)}return f},F=function(){const l=D(),i=l.filter(w=>typeof w.durationMs=="number").slice(0,20),u=i.map(w=>w.durationMs||0).sort((w,R)=>w-R),f=i.length?u.reduce((w,R)=>w+R,0)/i.length:0,p=u.length?Math.ceil(.95*u.length)-1:-1,y=p>=0?u[p]:0;t.textContent=String(l.length),g.textContent=`${f.toFixed(1)} ms`,g.className=`text-2xl font-bold ${f>50?"text-red-600":"text-green-600"}`,x&&(x.textContent=`${y.toFixed(1)} ms`,x.className=`text-2xl font-bold ${y>120?"text-red-600":"text-amber-600"}`);const G=l.slice(0,C);m.innerHTML=G.map(w=>{const R=new Date(w.ts).toLocaleTimeString("pt-BR");return`<tr class="border-t border-gray-100 dark:border-gray-800">
          <td class="py-2 pr-4 text-gray-900 dark:text-gray-100">${w.event}</td>
          <td class="py-2 pr-4 ${w.durationMs>50?"text-red-600":"text-gray-700 dark:text-gray-300"}">${(w.durationMs||0).toFixed(1)} ms</td>
          <td class="py-2 text-gray-500 dark:text-gray-400">${R}</td>
        </tr>`}).join(""),L&&(L.style.display=l.length>C?"":"none")},s=function(l){const i=u=>'"'+String(u??"").replaceAll('"','""')+'"';return["ts,event,durationMs,meta"].concat(l.map(u=>{const{ts:f,event:p,durationMs:y,...G}=u||{},w=Object.keys(G).length?JSON.stringify(G):"";return[f,p,y??""].map(i).concat(i(w)).join(",")})).join(`\r
`)},v=function(){const l=D(),i=s(l);try{window.__lastExportCsv=i}catch{}try{const f=new Blob(["\uFEFF"+i],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(f),y=document.createElement("a");y.href=p,y.download=`telemetria_${n||new Date().getFullYear()}-${String(e||new Date().getMonth()+1).padStart(2,"0")}.csv`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(p)}catch{}};if(!(N?.isEnabled&&N.isEnabled()))return;const d=N.getLog&&N.getLog()||[],r=Array.from(new Set(d.map(l=>l.event))).filter(Boolean).sort(),o=document.createElement("div");o.className="mb-8",o.innerHTML=`
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
              ${r.map(l=>`<option value="${l}">${l}</option>`).join("")}
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
          <button id="telem-clear" class="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">Limpar</button>
          <button id="telem-export" data-testid="telem-export" class="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">Exportar CSV</button>
          <button id="telem-copy" data-testid="telem-copy" class="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700">Copiar CSV</button>
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
            <button id="telem-more" data-testid="telem-more" class="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">Mostrar mais</button>
          </div>
        </div>
      </div>
    `,k.appendChild(o);const c=l=>o.querySelector(l),m=c("#telem-tbody"),t=c("#telem-count"),g=c("#telem-avg"),x=c("#telem-p95"),a=c("#telem-event-filter"),b=c("#telem-min-duration"),M=c("#telem-last-min"),S=c("#telem-clear"),P=c("#telem-export"),E=c("#telem-copy"),L=c("#telem-more");let C=8;async function h(){const l=D(),i=s(l);try{window.__lastExportCsv=i}catch{}try{if(navigator?.clipboard?.writeText){await navigator.clipboard.writeText(i);try{window.__csvCopied=!0}catch{}}}catch{}}a?.addEventListener("change",F),b?.addEventListener("input",F),S?.addEventListener("click",()=>{a&&(a.value="__all__"),b&&(b.value="0"),M&&(M.value=""),C=8,F()}),P?.addEventListener("click",v),E?.addEventListener("click",h),M?.addEventListener("input",()=>{C=8,F()}),L?.addEventListener("click",()=>{C+=8,F()}),F()}catch{}}class J{static async render(n){console.log("📊 Renderizando página de análises...");const e=document.createElement("div");try{const r=window?.matchMedia&&window.matchMedia("(max-width: 480px)").matches;e.className="analytics-page"+(r?" analytics-compact":"")}catch{e.className="analytics-page"}const d=document.createElement("div");d.className="flex justify-center items-center py-12",d.innerHTML=`
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    `,e.appendChild(d);try{const r=n||window?.appState?.currentBudget?.id;if(!r){e.contains(d)&&e.removeChild(d);const s=document.createElement("div");return s.className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6",s.innerHTML=`
          <div class="flex items-start gap-3">
            <div class="text-2xl">📌</div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-gray-100 mb-1">Nenhum orçamento ativo</div>
              <div class="text-sm text-gray-700 dark:text-gray-300">Entre em um orçamento nas Configurações para visualizar as análises.</div>
              <div class="mt-4 flex gap-2">
                <button class="u-btn u-btn--primary" onclick="window.location.hash = '#/settings'">Ir para Configurações</button>
                <button class="u-btn u-btn--outline" onclick="window.location.hash = '#/dashboard'">Voltar ao Dashboard</button>
              </div>
            </div>
          </div>`,e.appendChild(s),e}const o=r,c=typeof U=="function"?U():{year:window.appState?.selectedYear||new Date().getFullYear(),month:window.appState?.selectedMonth||new Date().getMonth()+1},m=c.year,t=c.month,g=new Date(m,t-1,1),x=new Date(m,t,0),a=await $.gerarRelatorioCompleto(o,g,x);e.contains(d)&&e.removeChild(d);const b=!a||Number(a?.resumo?.receitasMes||0)===0&&Number(a?.resumo?.despesasMes||0)===0&&(Array.isArray(a?.evolucaoSaldo)?a.evolucaoSaldo.length===0:!0)&&(Array.isArray(a?.gastosPorCategoria)?a.gastosPorCategoria.length===0:!0);e.innerHTML=`
        <div class="tab-container">
          <div class="tab-header">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <h2 class="tab-title-highlight">📊 Análises</h2>
                <div class="hidden md:flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-md">
                  <span class="text-purple-700 dark:text-purple-300">Inteligente</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
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
      `;try{const s=e.querySelector(".tab-header");if(s){const v=document.createElement("button");v.id="analytics-advanced-toggle",v.className="u-btn u-btn--outline",v.style.marginLeft="auto",v.textContent="Mostrar análises avançadas",s.appendChild(v)}}catch{}if(b){const s=e.querySelector("#analytics-sections")||e,v=document.createElement("div");return v.className="empty-state",v.innerHTML=`
          <div class="empty-icon">📊</div>
          <div class="empty-text">Sem dados para este período</div>
          <div class="empty-description">Registre sua primeira transação para ver gráficos e tendências.</div>
          <div class="mt-2"><button class="u-btn u-btn--primary" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar primeira transação</button></div>
        `,s.appendChild(v),e}const M=document.createElement("div");M.className="mb-4";const S=a.evolucaoSaldo&&a.evolucaoSaldo.length>1?a.resumo.saldoAtual-a.evolucaoSaldo[1].saldo:null;M.innerHTML=`
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
              <p class="text-sm text-gray-600 dark:text-gray-400">Período: ${String(t).padStart(2,"0")}/${m}</p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold ${a.resumo.saldoAtual>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                R$ ${a.resumo.saldoAtual.toFixed(2)}
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Saldo</p>
            </div>
          </div>
          
          <!-- Métricas Compactas -->
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
              <div class="text-lg mb-1">📈</div>
              <div class="text-lg font-bold text-green-600 dark:text-green-400">R$ ${a.resumo.receitasMes.toFixed(2)}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Receitas</div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
              <div class="text-lg mb-1">📉</div>
              <div class="text-lg font-bold text-red-600 dark:text-red-400">R$ ${a.resumo.despesasMes.toFixed(2)}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Despesas</div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
              <div class="text-lg mb-1">📊</div>
              <div class="text-lg font-bold ${a.resumo.tendencia==="positiva"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                ${a.resumo.tendencia==="positiva"?"↗":"↘"}
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
                <span class="font-medium text-green-600 dark:text-green-400">R$ ${a.resumo.receitasMes.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-600 dark:text-gray-400">Despesas:</span>
                <span class="font-medium text-red-600 dark:text-red-400">R$ ${a.resumo.despesasMes.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                <span class="text-gray-600 dark:text-gray-400">Saldo:</span>
                <span class="font-bold ${a.resumo.saldoAtual>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                  R$ ${a.resumo.saldoAtual.toFixed(2)}
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
      `;const P=e.querySelector("#analytics-sections")||e;P.appendChild(M);const E=document.createElement("div");E.id="analytics-advanced";try{const s=typeof localStorage<"u"?localStorage.getItem("analytics.advancedVisible"):null;(!s||s!=="1")&&E.classList.add("hidden")}catch{E.classList.add("hidden")}P.appendChild(E);try{const s=i=>{const u=parseFloat(String(i??"").toString().replace(",","."));return isNaN(u)?0:u};let v=0;const h=window?.appState?.currentBudget||null;h&&s(h.valorTotal)>0?v=s(h.valorTotal):Array.isArray(window?.appState?.categories)&&(v=(window.appState.categories||[]).filter(i=>i&&(i.tipo||"despesa")==="despesa").reduce((i,u)=>i+(s(u.limite)>0?s(u.limite):0),0));const l=s(a?.resumo?.despesasMes||0);if(v>0&&l>=0){const i=Math.max(0,Math.min(100,l/v*100)),u=new Date,f=m===u.getFullYear()&&t===u.getMonth()+1,p=new Date(m,t,0).getDate(),y=f?u.getDate():p,G=f?Math.min(100,y/p*100):100,w=v*G/100,R=w>0?l/w:0,z=R<=1.05?"ok":R<=1.2?"warn":"bad",q=96,B=42,Y=2*Math.PI*B,V=i/100*Y,_=document.createElement("div");_.className="mb-8",_.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🏁 Progresso do Mês</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <!-- Donut -->
                <div class="flex justify-center">
                  <svg width="${q}" height="${q}" viewBox="0 0 100 100" class="-rotate-90">
                    <circle cx="50" cy="50" r="${B}" stroke="var(--tw-prose-borders, #e5e7eb)" stroke-width="12" fill="none" class="text-gray-200 dark:text-gray-700"></circle>
                    <circle cx="50" cy="50" r="${B}" stroke="${i>100?"#ef4444":"#10b981"}" stroke-width="12" stroke-linecap="round" fill="none"
                      stroke-dasharray="${V} ${Y}" />
                  </svg>
                  <div class="absolute mt-10 md:mt-0 md:static -rotate-90 md:rotate-0"></div>
                </div>
                
                <!-- KPIs -->
                <div class="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Orçado</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-gray-100">R$ ${v.toFixed(2)}</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Gasto no mês</div>
                    <div class="text-lg font-bold ${l>v?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${l.toFixed(2)}</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Progresso</div>
                    <div class="text-lg font-bold ${i>100?"text-red-600":i>90?"text-yellow-600":"text-green-600"}">${i.toFixed(1)}%</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Burn rate ${f?"(até hoje)":"(final)"}</div>
                    <div class="text-lg font-bold ${z==="ok"?"text-green-600":z==="warn"?"text-yellow-600":"text-red-600"}">${(R*100).toFixed(0)}%</div>
                  </div>
                </div>
                
                <div class="md:col-span-3 text-xs text-gray-500 dark:text-gray-400">${f?`Você consumiu <span class="font-medium text-gray-900 dark:text-gray-100">${i.toFixed(1)}%</span> do orçamento. O esperado para hoje seria <span class="font-medium">${G.toFixed(1)}%</span>.`:`Resumo do mês selecionado: consumo total de <span class="font-medium">${i.toFixed(1)}%</span> do orçamento.`}</div>
              </div>
            </div>
          `,P.appendChild(_)}}catch(s){console.warn("MTD progress render skipped:",s?.message||s)}const L=document.createElement("div");L.className="mb-8",L.innerHTML=`
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Gráficos & Análises</h2>
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
      `,E.appendChild(L);const C=document.createElement("div");C.className="mb-8",C.innerHTML=`
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
              ${a.previsaoGastos.slice(0,4).map((s,v)=>`
                <div class="bg-gradient-to-br ${v===0?"from-purple-500 to-pink-500":v===1?"from-blue-500 to-indigo-500":v===2?"from-green-500 to-teal-500":"from-orange-500 to-red-500"} rounded-xl p-4 text-white">
                  <div class="text-center">
                    <div class="text-lg font-bold mb-1">${s.nome} ${s.ano}</div>
                    <div class="text-2xl font-bold mb-2">R$ ${s.saldo.toFixed(2)}</div>
                    <div class="text-xs opacity-90">Saldo Previsto</div>
                    <div class="flex justify-between text-xs mt-2">
                      <span>📈 R$ ${s.receitas.toFixed(2)}</span>
                      <span>📉 R$ ${s.despesas.toFixed(2)}</span>
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
      `,E.appendChild(C),O(E,{year:m,month:t});try{const v=(await $.fetchTransactionsForPeriod(o,g,x)||[]).filter(p=>(p?.tipo||"despesa")==="despesa"),h=Array.isArray(window?.appState?.categories)?window.appState.categories:[],l=new Map(h.map(p=>[p.id,p])),i=p=>{try{return new Date(p).toLocaleDateString("pt-BR")}catch{return""}},u=v.map(p=>({...p,_date:$.txToDate(p),_cat:l.get(p.categoriaId)||p.categoria||null,_valor:parseFloat(p.valor||0)}));u.sort((p,y)=>(y._valor||0)-(p._valor||0));const f=u.slice(0,5);if(f.length){const p=document.createElement("div");p.className="mb-8",p.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-rose-500 to-red-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📌 Maiores Transações (mês)</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="divide-y divide-gray-100 dark:divide-gray-800">
                ${f.map(y=>`
                  <div class="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${y._cat?.cor||"#EF4444"}">
                        ${(y._cat?.nome||"?").slice(0,1).toUpperCase()}
                      </div>
                      <div class="min-w-0">
                        <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${y.descricao||y.titulo||y._cat?.nome||"Despesa"}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 truncate">${i(y._date)} • ${y._cat?.nome||"Sem categoria"}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-red-600">R$ ${(y._valor||0).toFixed(2)}</div>
                      <a href="#/transactions" class="text-xs text-indigo-600 hover:underline">ver no extrato</a>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `,P.appendChild(p)}}catch{}try{const s=Array.isArray(window?.appState?.categories)?window.appState.categories:[],v=new Map(s.map(l=>[l.id,parseFloat(l.limite||0)])),h=(a.gastosPorCategoria||[]).map(l=>{const i=v.get(l?.categoria?.id)||0,u=parseFloat(l.totalGasto||0),f=i>0?u/i*100:0;return{nome:l?.categoria?.nome||"Categoria",cor:l?.categoria?.cor||"#F59E0B",gasto:u,lim:i,pct:f}}).filter(l=>l.lim>0&&l.pct>=90).sort((l,i)=>i.pct-l.pct);if(h.length){const l=document.createElement("div");l.className="mb-8",l.innerHTML=`
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🚨 Categorias em Alerta</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                ${h.slice(0,6).map(i=>`
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
          `,P.appendChild(l)}}catch{}const D=document.createElement("div");D.className="mb-8",D.innerHTML=`
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
                ${a.gastosPorCategoria.slice(0,5).map((s,v)=>`
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${s.categoria.cor||"#4F46E5"}">
                        ${v+1}
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">${s.categoria.nome}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${s.percentual.toFixed(1)}% do total</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-gray-900 dark:text-gray-100">R$ ${s.totalGasto.toFixed(2)}</div>
                      <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div class="h-2 rounded-full" style="width: ${s.percentual}%; background-color: ${s.categoria.cor||"#4F46E5"}"></div>
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
                ${K(a).map(s=>`
                  <div class="bg-gradient-to-r ${s.type==="positive"?"from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900":s.type==="warning"?"from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900":"from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900"} border ${s.type==="positive"?"border-green-200 dark:border-green-800":s.type==="warning"?"border-yellow-200 dark:border-yellow-800":"border-blue-200 dark:border-blue-800"} rounded-xl p-4">
                    <div class="flex items-start gap-3">
                      <div class="text-2xl">${s.icon}</div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">${s.title}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">${s.description}</div>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      `,E.appendChild(D);const F=(s=1,v=5)=>{const h=document.getElementById("evolucao-chart"),l=document.getElementById("categorias-chart");if(console.log(`🔍 Tentativa ${s}: Verificando elementos dos gráficos...`),console.log("- evolucao-chart:",!!h),console.log("- categorias-chart:",!!l),h&&l)try{if(console.log("📊 Renderizando gráficos..."),a.evolucaoSaldo&&a.evolucaoSaldo.length>0){const i=[...a.evolucaoSaldo];a.previsaoGastos&&a.previsaoGastos.length>0&&i.push(...a.previsaoGastos),$.renderizarGraficoEvolucao("evolucao-chart",i)}a.gastosPorCategoria&&a.gastosPorCategoria.length>0&&$.renderizarGraficoCategorias("categorias-chart",a.gastosPorCategoria),console.log("✅ Gráficos renderizados com sucesso!")}catch(i){console.error("❌ Erro ao renderizar gráficos:",i),h&&(h.innerHTML=`
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
              `)}else if(s<v)console.log(`⏳ Elementos não encontrados, tentando novamente em ${s*100}ms...`),setTimeout(()=>F(s+1,v),s*100);else{console.error("❌ Não foi possível encontrar os elementos dos gráficos após",v,"tentativas");const i=document.getElementById("evolucao-chart"),u=document.getElementById("categorias-chart");i&&(i.innerHTML=`
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `),u&&(u.innerHTML=`
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `)}};setTimeout(()=>F(),100);try{const s=e.querySelector("#analytics-advanced-toggle"),v=e.querySelector("#analytics-advanced");if(s&&v){const h=()=>{const l=v.classList.contains("hidden");s.textContent=l?"Mostrar análises avançadas":"Ocultar análises avançadas"};h(),s.addEventListener("click",()=>{v.classList.toggle("hidden"),h();try{localStorage.setItem("analytics.advancedVisible",v.classList.contains("hidden")?"0":"1")}catch{}})}}catch{}}catch(r){console.error("❌ Erro ao renderizar página de análises:",r),e.contains(d)&&e.removeChild(d);const o=document.createElement("div");o.className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6",o.innerHTML=`
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline"> Não foi possível carregar os dados de análise. Tente novamente mais tarde.</span>
        <p class="text-sm mt-2">${r.message}</p>
      `,e.appendChild(o)}return e}}function K(k){const n=[];if(k.resumo.saldoAtual>=0?n.push({type:"positive",icon:"✅",title:"Saldo Positivo",description:"Seu saldo está positivo! Continue mantendo essa disciplina financeira."}):n.push({type:"warning",icon:"⚠️",title:"Saldo Negativo",description:"Seu saldo está negativo. Considere reduzir despesas ou aumentar receitas."}),k.resumo.tendencia==="positiva"?n.push({type:"positive",icon:"📈",title:"Tendência Positiva",description:"Sua situação financeira está melhorando! Mantenha o foco."}):n.push({type:"warning",icon:"📉",title:"Tendência Negativa",description:"Sua situação financeira está piorando. Revise seus gastos."}),k.gastosPorCategoria.length>0){const e=k.gastosPorCategoria[0];e.percentual>30&&n.push({type:"warning",icon:"🔥",title:"Gasto Concentrado",description:`${e.categoria.nome} representa ${e.percentual.toFixed(1)}% dos seus gastos. Considere diversificar.`})}if(k.evolucaoSaldo.length>1){const e=k.resumo.saldoAtual-k.evolucaoSaldo[1].saldo;e>0?n.push({type:"positive",icon:"🎯",title:"Melhoria Mensal",description:`Seu saldo melhorou R$ ${e.toFixed(2)} em relação ao mês anterior.`}):n.push({type:"warning",icon:"📊",title:"Redução Mensal",description:`Seu saldo diminuiu R$ ${Math.abs(e).toFixed(2)} em relação ao mês anterior.`})}return k.previsaoGastos.length>0&&(k.previsaoGastos[0].saldo<0?n.push({type:"warning",icon:"🔮",title:"Previsão Negativa",description:"Para o próximo mês, a previsão indica saldo negativo. Planeje com antecedência."}):n.push({type:"positive",icon:"🔮",title:"Previsão Positiva",description:"Para o próximo mês, a previsão indica saldo positivo. Continue assim!"})),k.gastosPorCategoria.length>0&&k.gastosPorCategoria.slice(0,3).reduce((d,r)=>d+r.percentual,0)>70&&n.push({type:"info",icon:"💡",title:"Gastos Concentrados",description:"As 3 maiores categorias representam mais de 70% dos seus gastos. Considere diversificar."}),n.slice(0,4)}window.AnalyticsPage=J;export{J as AnalyticsPage,O as renderTelemetrySection};
