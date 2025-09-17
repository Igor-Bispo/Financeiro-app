const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-BBMSmpws.js","assets/main-CNDNG6O2.css"])))=>i.map(i=>d[i]);
import{M as E,_ as T,S as g}from"./main-BBMSmpws.js";window.showAddTransactionModal=function(i={}){console.log("🔧 showAddTransactionModal chamada com:",i),console.log("🔧 window.Modal disponível:",!!window.Modal),console.log("🔧 window.appState.categories:",window.appState?.categories);const u=!!(i&&(i.id||i._mode==="edit"));try{const m=t=>{if(!(t instanceof Date)||isNaN(t.getTime()))return"";const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${n}`};let d=null;const s=i.data||i.createdAt;if(s)try{if(s&&typeof s.toDate=="function")d=s.toDate();else if(typeof s=="string"){const t=s.trim(),e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e)d=new Date(parseInt(e[1],10),parseInt(e[2],10)-1,parseInt(e[3],10));else{const a=new Date(t);isNaN(a.getTime())||(d=a)}}else if(typeof s=="number"){const t=s<1e12?s*1e3:s,e=new Date(t);isNaN(e.getTime())||(d=e)}else s instanceof Date&&(d=s)}catch{}d||(d=new Date);const I=m(d),D=t=>{try{let e=t?.dataEfetivacao||t?.dataLancamento||t?.data||t?.date||t?.createdAt;if(!e)return null;if(e&&typeof e.toDate=="function")return e.toDate();if(typeof e=="string"){const n=e.trim(),o=n.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(o)return new Date(parseInt(o[1],10),parseInt(o[2],10)-1,parseInt(o[3],10));const r=new Date(n);return isNaN(r.getTime())?null:r}if(typeof e=="number"){const n=e<1e12?e*1e3:e,o=new Date(n);return isNaN(o.getTime())?null:o}if(e instanceof Date)return e;const a=new Date(e);return isNaN(a.getTime())?null:a}catch{return null}},y=t=>t?`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`:"",M=t=>{if(!t)return null;const e=String(t).match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e)return new Date(parseInt(e[1],10),parseInt(e[2],10)-1,parseInt(e[3],10));const a=new Date(t);return isNaN(a.getTime())?null:a},h=()=>{try{const n=document.getElementById("data")?.value,o=M(n);if(o)return o}catch{}const t=new Date,e=window.getSelectedPeriod?window.getSelectedPeriod().year:window.appState?.selectedYear||t.getFullYear(),a=window.getSelectedPeriod?window.getSelectedPeriod().month:window.appState?.selectedMonth||t.getMonth()+1;return new Date(e,a-1,1)},b=(t,e)=>{try{if(!t)return 0;const a=y(e);return(Array.isArray(window.appState?.transactions)?window.appState.transactions:[]).filter(o=>o?.categoriaId===t&&o?.tipo==="despesa").filter(o=>y(D(o))===a).reduce((o,r)=>o+(parseFloat(r?.valor)||0),0)}catch{return 0}},x=t=>{const e=window.appState?.categories||[],a=i.categoriaId||"";return['<option value="">Sem categoria</option>',...e.map(n=>{const o=n.limite?parseFloat(n.limite):0,r=b(n.id,t),f=o-r,l=o>0?` (R$ ${f.toFixed(2)} disponível)`:"";return`<option value="${n.id}" ${a===n.id?"selected":""}>${n.nome}${l}</option>`})].join("")},c=E({title:u?"Editar Transação":"Nova Transação",content:`
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição
          </label>
          <input 
            type="text" 
            id="descricao" 
            name="descricao" 
            value="${i.descricao||""}"
            class="u-input w-full"
            placeholder="Ex: Salário, Aluguel, Compras..."
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor
          </label>
          <input 
            type="number" 
            id="valor" 
            name="valor" 
            value="${i.valor!==null&&i.valor!==void 0?i.valor:""}"
            step="0.01" 
            min="0"
            class="u-input w-full"
            placeholder="0.00"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo
          </label>
          <select 
            id="tipo" 
            name="tipo"
            class="u-input w-full"
            required
          >
            <option value="receita" ${i.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${i.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoria
          </label>
          <select 
            id="categoriaId" 
            name="categoriaId"
            class="u-input w-full"
          >
            ${x(d)}
          </select>
          <div id="categoria-info" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
            <!-- Informações da categoria selecionada serão exibidas aqui -->
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data
          </label>
          <input 
            type="date" 
            id="data" 
            name="data" 
            value="${I}"
            class="u-input w-full"
            required
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 u-btn u-btn--primary"
          >
            ${u?"Atualizar":"Adicionar"}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 u-btn u-btn--ghost"
          >
            Cancelar
          </button>
        </div>
      </form>
    `,onClose:()=>c.remove()});document.body.appendChild(c),console.log("✅ Modal de transação adicionado ao DOM");const $=c.querySelector("#transaction-form");$.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData($),a={descricao:e.get("descricao"),valor:parseFloat(e.get("valor")),tipo:e.get("tipo"),categoriaId:e.get("categoriaId")||null,data:e.get("data")};try{if(u){const{updateTransactionWithNotifications:n}=await T(async()=>{const{updateTransactionWithNotifications:o}=await import("./main-BBMSmpws.js").then(r=>r.a0);return{updateTransactionWithNotifications:o}},__vite__mapDeps([0,1]));await n(i.id,a),c.remove(),typeof window.refreshCurrentView=="function"&&window.refreshCurrentView()}else{if(!await new Promise(r=>{typeof window.showConfirmationModal=="function"?window.showConfirmationModal({title:"Adicionar Transação",message:`Tem certeza que deseja adicionar "${a.descricao}" no valor de R$ ${Number(a.valor||0).toFixed(2)}?`,confirmText:"Sim, adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:()=>r(!0),onCancel:()=>r(!1)}):r(confirm(`Adicionar "${a.descricao}" no valor de R$ ${Number(a.valor||0).toFixed(2)}?`))}))return;c.remove();const{addTransactionWithNotifications:o}=await T(async()=>{const{addTransactionWithNotifications:r}=await import("./main-BBMSmpws.js").then(f=>f.a0);return{addTransactionWithNotifications:r}},__vite__mapDeps([0,1]));await o(a),window.Snackbar&&(g.show?g.show("Transação adicionada com sucesso","success"):g({message:"Transação adicionada com sucesso",type:"success"})),typeof window.refreshCurrentView=="function"&&window.refreshCurrentView()}}catch(n){console.error("Erro ao salvar transação:",n),n.message!=="Operação cancelada pelo usuário"&&g.show("Erro ao salvar transação","error")}});const p=c.querySelector("#categoriaId"),v=c.querySelector("#categoria-info"),N=c.querySelector("#data"),S=()=>{const t=p.value;if(t){const e=window.appState?.categories?.find(a=>a.id===t);if(e){const a=e.limite?parseFloat(e.limite):0,n=h(),o=b(t,n),r=a-o,f=a>0?o/a*100:0;let l="",w="";a===0?(l="Sem limite definido",w="text-gray-500"):r<0?(l=`⚠️ Limite excedido em R$ ${Math.abs(r).toFixed(2)}`,w="text-red-600"):r<a*.2?(l=`⚠️ Quase no limite (${f.toFixed(1)}% usado)`,w="text-yellow-600"):(l=`✓ Dentro do limite (${f.toFixed(1)}% usado)`,w="text-green-600"),v.innerHTML=`
            <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="font-medium">${e.nome}</div>
              <div class="text-xs mt-1">
                <div>Limite: R$ ${a.toFixed(2)}</div>
                <div>Gasto: R$ ${o.toFixed(2)}</div>
                <div>Disponível: R$ ${r.toFixed(2)}</div>
                <div class="${w} mt-1">${l}</div>
              </div>
            </div>
          `,v.classList.remove("hidden")}}else v.classList.add("hidden")};p.addEventListener("change",S),N.addEventListener("change",()=>{const t=p.value;p.innerHTML=x(h()),p.value=t,S()}),i.categoriaId&&p.dispatchEvent(new Event("change"))}catch(m){console.error("❌ Erro ao criar modal de transação:",m),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de transação","error"):alert("Erro ao abrir modal de transação: "+m.message)}};window.editTransaction=function(i){const u=window.appState.transactions?.find(m=>m.id===i);u&&window.showAddTransactionModal(u)};
