const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-xBaVxV05.js","assets/main-6ahFnZtK.css"])))=>i.map(i=>d[i]);
import{M as C,_ as y,S as g}from"./main-xBaVxV05.js";function D(r={}){console.log("🔧 showAddTransactionModal chamada com:",r),console.log("🔧 window.Modal disponível:",!!window.Modal),console.log("🔧 window.appState.categories:",window.appState?.categories);const u=!!(r&&(r.id||r._mode==="edit"));try{const f=t=>{if(!(t instanceof Date)||isNaN(t.getTime()))return"";const e=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${o}-${a}`};let d=null;const s=r.data||r.createdAt;if(s)try{if(s&&typeof s.toDate=="function")d=s.toDate();else if(typeof s=="string"){const t=s.trim(),e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e)d=new Date(parseInt(e[1],10),parseInt(e[2],10)-1,parseInt(e[3],10));else{const o=new Date(t);isNaN(o.getTime())||(d=o)}}else if(typeof s=="number"){const t=s<1e12?s*1e3:s,e=new Date(t);isNaN(e.getTime())||(d=e)}else s instanceof Date&&(d=s)}catch{}d||(d=new Date);const I=f(d),M=t=>{try{let e=t?.dataEfetivacao||t?.dataLancamento||t?.data||t?.date||t?.createdAt;if(!e)return null;if(e&&typeof e.toDate=="function")return e.toDate();if(typeof e=="string"){const a=e.trim(),n=a.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(n)return new Date(parseInt(n[1],10),parseInt(n[2],10)-1,parseInt(n[3],10));const i=new Date(a);return isNaN(i.getTime())?null:i}if(typeof e=="number"){const a=e<1e12?e*1e3:e,n=new Date(a);return isNaN(n.getTime())?null:n}if(e instanceof Date)return e;const o=new Date(e);return isNaN(o.getTime())?null:o}catch{return null}},h=t=>t?`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`:"",E=t=>{if(!t)return null;const e=String(t).match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e)return new Date(parseInt(e[1],10),parseInt(e[2],10)-1,parseInt(e[3],10));const o=new Date(t);return isNaN(o.getTime())?null:o},b=()=>{try{const a=document.getElementById("data")?.value,n=E(a);if(n)return n}catch{}const t=new Date,e=window.getSelectedPeriod?window.getSelectedPeriod().year:window.appState?.selectedYear||t.getFullYear(),o=window.getSelectedPeriod?window.getSelectedPeriod().month:window.appState?.selectedMonth||t.getMonth()+1;return new Date(e,o-1,1)},x=(t,e)=>{try{if(!t)return 0;const o=h(e);return(Array.isArray(window.appState?.transactions)?window.appState.transactions:[]).filter(n=>n?.categoriaId===t&&n?.tipo==="despesa").filter(n=>h(M(n))===o).reduce((n,i)=>n+(parseFloat(i?.valor)||0),0)}catch{return 0}},T=t=>{const e=window.appState?.categories||[],o=r.categoriaId||"";return['<option value="">Sem categoria</option>',...e.map(a=>{const n=a.limite?parseFloat(a.limite):0,i=x(a.id,t),m=n-i,c=n>0?` (R$ ${m.toFixed(2)} disponível)`:"";return`<option value="${a.id}" ${o===a.id?"selected":""}>${a.nome}${c}</option>`})].join("")},l=C({title:u?"Editar Transação":"Nova Transação",content:`
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição
          </label>
          <input 
            type="text" 
            id="descricao" 
            name="descricao" 
            value="${r.descricao||""}"
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
            value="${r.valor!==null&&r.valor!==void 0?r.valor:""}"
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
            <option value="receita" ${r.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${r.tipo==="despesa"?"selected":""}>Despesa</option>
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
            ${T(d)}
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
            class="flex-1 btn btn-primary"
          >
            ${u?"Atualizar":"Adicionar"}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 btn btn-ghost"
          >
            Cancelar
          </button>
        </div>
      </form>
    `,onClose:()=>l.remove()});document.body.appendChild(l),console.log("✅ Modal de transação adicionado ao DOM");const $=l.querySelector("#transaction-form");$.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData($),o={descricao:e.get("descricao"),valor:parseFloat(e.get("valor")),tipo:e.get("tipo"),categoriaId:e.get("categoriaId")||null,data:e.get("data")};try{if(u){const{updateTransactionWithNotifications:a}=await y(async()=>{const{updateTransactionWithNotifications:n}=await import("./main-xBaVxV05.js").then(i=>i.a0);return{updateTransactionWithNotifications:n}},__vite__mapDeps([0,1]));await a(r.id,o),l.remove(),typeof window.refreshCurrentView=="function"&&window.refreshCurrentView()}else{let a=!1;if(console.log("🔍 Debug modal - window.confirmTransaction:",typeof window.confirmTransaction),console.log("🔍 Debug modal - window.showConfirmationModal:",typeof window.showConfirmationModal),typeof window.confirmTransaction=="function")console.log("✅ Usando modal moderno confirmTransaction"),a=await window.confirmTransaction(o);else if(typeof window.showConfirmationModal=="function")console.log("⚠️ Usando modal legado showConfirmationModal"),a=await new Promise(i=>{window.showConfirmationModal({title:"Adicionar Transação",message:`Tem certeza que deseja adicionar "${o.descricao}" no valor de R$ ${Number(o.valor||0).toFixed(2)}?`,confirmText:"Sim, adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:()=>i(!0),onCancel:()=>i(!1)})});else{console.log("🔄 Tentando import dinâmico do modal moderno");try{const{confirmTransaction:i}=await y(async()=>{const{confirmTransaction:m}=await import("./main-xBaVxV05.js").then(c=>c.aa);return{confirmTransaction:m}},__vite__mapDeps([0,1]));console.log("✅ Import dinâmico bem-sucedido, usando confirmTransaction"),a=await i(o)}catch(i){console.warn("❌ Falha ao importar modal de confirmação:",i),console.log("🔄 Usando confirm nativo do browser"),a=confirm(`Adicionar "${o.descricao}" no valor de R$ ${Number(o.valor||0).toFixed(2)}?`)}}if(!a)return;l.remove();const{addTransactionWithNotifications:n}=await y(async()=>{const{addTransactionWithNotifications:i}=await import("./main-xBaVxV05.js").then(m=>m.a0);return{addTransactionWithNotifications:i}},__vite__mapDeps([0,1]));await n(o),window.Snackbar&&(g.show?g.show("Transação adicionada com sucesso","success"):g({message:"Transação adicionada com sucesso",type:"success"})),typeof window.refreshCurrentView=="function"&&window.refreshCurrentView()}}catch(a){console.error("Erro ao salvar transação:",a),a.message!=="Operação cancelada pelo usuário"&&g.show("Erro ao salvar transação","error")}});const p=l.querySelector("#categoriaId"),v=l.querySelector("#categoria-info"),N=l.querySelector("#data"),S=()=>{const t=p.value;if(t){const e=window.appState?.categories?.find(o=>o.id===t);if(e){const o=e.limite?parseFloat(e.limite):0,a=b(),n=x(t,a),i=o-n,m=o>0?n/o*100:0;let c="",w="";o===0?(c="Sem limite definido",w="text-gray-500"):i<0?(c=`⚠️ Limite excedido em R$ ${Math.abs(i).toFixed(2)}`,w="text-red-600"):i<o*.2?(c=`⚠️ Quase no limite (${m.toFixed(1)}% usado)`,w="text-yellow-600"):(c=`✓ Dentro do limite (${m.toFixed(1)}% usado)`,w="text-green-600"),v.innerHTML=`
            <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="font-medium">${e.nome}</div>
              <div class="text-xs mt-1">
                <div>Limite: R$ ${o.toFixed(2)}</div>
                <div>Gasto: R$ ${n.toFixed(2)}</div>
                <div>Disponível: R$ ${i.toFixed(2)}</div>
                <div class="${w} mt-1">${c}</div>
              </div>
            </div>
          `,v.classList.remove("hidden")}}else v.classList.add("hidden")};p.addEventListener("change",S),N.addEventListener("change",()=>{const t=p.value;p.innerHTML=T(b()),p.value=t,S()}),r.categoriaId&&p.dispatchEvent(new Event("change"))}catch(f){console.error("❌ Erro ao criar modal de transação:",f),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de transação","error"):alert("Erro ao abrir modal de transação: "+f.message)}}window.editTransaction=function(r){const u=window.appState.transactions?.find(f=>f.id===r);u&&D(u)};typeof window<"u"&&(window.showAddTransactionModal=D);export{D as default};
