function k(y={}){const{onChange:c,readonly:h=!1}=y,m=()=>{if(typeof window.getSelectedPeriod=="function")return window.getSelectedPeriod();const e=new Date;return{year:window.appState?.selectedYear||e.getFullYear(),month:window.appState?.selectedMonth||e.getMonth()+1}},n=(e,r)=>{if(typeof window.setSelectedPeriod=="function")window.setSelectedPeriod(e,r);else{window.appState=window.appState||{},window.appState.selectedYear=e,window.appState.selectedMonth=r;try{const w=String(e)+"-"+String(r).padStart(2,"0"),a=new URL(window.location.href),f=a.hash.split("?")[0]||a.hash;a.hash=`${f}?ym=${w}`,history.replaceState(null,"",a.toString())}catch{}}typeof c=="function"&&c()},g=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],o=new Date,p=o.getFullYear(),b=[];for(let e=p-4;e<=p+1;e++)b.push(e);const{year:d,month:s}=m(),t=document.createElement("div");t.className="pi-container inline-flex";const u=`${g[Math.max(0,Math.min(11,s-1))]} ${d}`;if(h)return t.innerHTML=`
      <div class="flex items-center gap-2 bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm px-3 py-2">
        <span class="hidden sm:inline text-xs md:text-sm text-gray-600 dark:text-gray-300">Período:</span>
        <span class="inline-flex items-center gap-1 text-xs md:text-sm px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600">📅 ${u}</span>
      </div>
    `,t;t.innerHTML=`
    <div class="flex flex-wrap items-center gap-2 bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm px-3 py-2">
      <span class="hidden sm:inline text-xs md:text-sm text-gray-600 dark:text-gray-300">Período:</span>
      <select data-pi="month" class="h-8 px-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-xs md:text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500">
        ${g.map((e,r)=>`<option value="${r+1}" ${r+1===s?"selected":""}>${e}</option>`).join("")}
      </select>
      <select data-pi="year" class="h-8 px-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 text-xs md:text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500">
        ${b.map(e=>`<option value="${e}" ${e===d?"selected":""}>${e}</option>`).join("")}
      </select>
      <button data-pi="current" class="h-8 px-2 md:px-3 text-[11px] md:text-xs rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition">Mês atual</button>
      <span class="hidden md:inline text-[11px] md:text-xs ml-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600">📅 ${u}</span>
    </div>
  `;const l=t.querySelector('select[data-pi="month"]'),i=t.querySelector('select[data-pi="year"]'),x=t.querySelector('button[data-pi="current"]');return l&&l.addEventListener("change",()=>{const e=parseInt(l.value,10);n(d,e)}),i&&i.addEventListener("change",()=>{const e=parseInt(i.value,10);n(e,s)}),x&&x.addEventListener("click",()=>{const e=o.getFullYear(),r=o.getMonth()+1;n(e,r)}),t}export{k as createPeriodIndicator};
