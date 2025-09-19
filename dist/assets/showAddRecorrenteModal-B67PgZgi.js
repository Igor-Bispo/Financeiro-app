const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-CwyRbrt1.js","assets/main-Bjqwg0h6.css","assets/NotificationService-mrKnlfb8.js"])))=>i.map(i=>d[i]);
import{M as V,S as E,y as M,z as L,_ as g,c as T,g as D,q,w as A,o as S}from"./main-CwyRbrt1.js";function k({onSubmit:v,initialData:c={}}){const s=document.createElement("form");s.className="space-y-4",s.innerHTML=`
    <div class="form-group">
      <label class="form-label modal-label">Nome da Despesa Recorrente</label>
      <input type="text" id="rec-desc" required
        class="u-input w-full"
             placeholder="Ex: Aluguel, Netflix, Academia"
             value="${c.descricao||""}"
             autocomplete="off"
             autocorrect="off"
             autocapitalize="words"
        style="font-weight: 500; font-size: 16px;">
    </div>
    <div class="form-group">
      <label class="form-label modal-label">Valor da Despesa (R$)</label>
      <input type="number" id="rec-valor" required step="0.01" min="0"
        class="u-input w-full"
             placeholder="0,00"
             value="${c.valorTotal||c.valor||""}"
             inputmode="decimal"
             autocomplete="off"
        style="font-weight: 500; font-size: 16px;">
    </div>
    <div>
      <label class="modal-label">Tipo do Valor Informado</label>
      <div class="flex gap-4">
        <label class="flex items-center gap-2 cursor-pointer radio-label">
          <input type="radio" name="tipo-valor" value="total" 
                 class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                 ${c.valorTotal&&!c.valor||!c.valorTotal&&!c.valor?"checked":""}>
          <span class="radio-text">Valor total (soma de todas as parcelas)</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer radio-label">
          <input type="radio" name="tipo-valor" value="parcela" 
                 class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                 ${c.valor&&!c.valorTotal?"checked":""}>
          <span class="radio-text">Valor de cada parcela</span>
        </label>
      </div>
    </div>
    <div>
      <label class="modal-label">Categoria da Despesa</label>
      <select id="rec-categoria" required
    class="u-input w-full"
    style="font-weight: 500; font-size: 16px;">
   <option value="" style="font-weight: 500; padding: 12px; font-size: 14px;">Selecione uma categoria...</option>
        ${(window.appState.categories||[]).sort((o,l)=>o.nome.localeCompare(l.nome,"pt-BR",{sensitivity:"base"})).map(o=>{const l=new Date,r=l.getFullYear(),a=l.getMonth()+1,t=(window.appState.transactions||[]).filter(f=>{if(f.categoriaId!==o.id||f.tipo!==o.tipo)return!1;let b;f.createdAt&&typeof f.createdAt=="object"&&f.createdAt.seconds?b=new Date(f.createdAt.seconds*1e3):b=new Date(f.createdAt);const I=b.getFullYear(),p=b.getMonth()+1;return I===r&&p===a}).reduce((f,b)=>f+parseFloat(b.valor),0),n=parseFloat(o.limite||0),d=o.tipo==="receita"?t:n-t;let m=o.nome;return n>0&&(m+=` - Limite: R$ ${n.toFixed(2)}`,o.tipo==="despesa"?m+=` (Disponível: R$ ${Math.max(0,d).toFixed(2)})`:m+=` (Recebido: R$ ${t.toFixed(2)})`),`<option value="${o.id}" ${c.categoriaId===o.id?"selected":""} style="font-weight: 500; padding: 8px;">${m}</option>`}).join("")}
      </select>
    </div>
    <div>
      <label class="modal-label">Data de Início da Recorrência</label>
      <input type="date" id="rec-data" required
        class="u-input w-full"
             value="${c.dataInicio||new Date().toISOString().split("T")[0]}"
        style="font-weight: 500;">
    </div>
    <div>
      <label class="modal-label">Número de Parcelas (deixe vazio para infinito)</label>
      <input type="number" id="rec-parcelas" min="0"
        class="u-input w-full"
             placeholder="Ex: 12 para 1 ano, 24 para 2 anos"
             value="${c.parcelasRestantes||""}"
        style="font-weight: 500;">
    </div>
    <div id="recorrente-valores-info" class="text-xs text-gray-600 modal-info"></div>
    <div class="flex items-center gap-2">
      <input type="checkbox" id="rec-efetivar" 
             class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" 
             ${c.efetivarMesAtual?"checked":""} />
      <label for="rec-efetivar" class="checkbox-label">Criar transação para este mês automaticamente</label>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
  <button type="button" onclick="(window.closeModal ? window.closeModal() : (document.getElementById('app-modal')?.remove()))" class="btn btn-ghost btn-sm">Cancelar</button>
  <button type="submit" class="btn btn-primary btn-sm">Salvar</button>
    </div>
  `;function i(){const o=document.getElementById("rec-valor"),l=document.getElementById("rec-parcelas"),r=s.querySelector('input[name="tipo-valor"]:checked'),a=o&&parseFloat(o.value)||0,e=l&&parseInt(l.value)||0,t=r?r.value:"total",n=document.getElementById("recorrente-valores-info");if(e>1&&a>0)if(t==="total"){const d=a/e;n.innerHTML=`<b>Valor total:</b> R$ ${a.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${d.toFixed(2)}`}else{const d=a*e;n.innerHTML=`<b>Valor total:</b> R$ ${d.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${a.toFixed(2)}`}else a>0?n.innerHTML=`<b>Valor:</b> R$ ${a.toFixed(2)}`:n.innerHTML=""}return s.querySelector("#rec-valor").addEventListener("input",i),s.querySelector("#rec-parcelas").addEventListener("input",i),s.querySelectorAll('input[name="tipo-valor"]').forEach(o=>{o.addEventListener("change",i)}),setTimeout(()=>{if(i(),!s.querySelector('input[name="tipo-valor"]:checked')){const r=s.querySelector('input[name="tipo-valor"][value="total"]');if(r){r.checked=!0;try{const a=typeof document<"u"&&typeof document.createEvent=="function"?(()=>{const e=document.createEvent("HTMLEvents");return e.initEvent("change",!0,!1),e})():null;a&&r.dispatchEvent(a)}catch{}}}const l=s.querySelector("#rec-efetivar");if(l){const r=c.efetivarMesAtual===!0||c.efetivarMesAtual==="true";l.checked=r}},100),s.addEventListener("submit",o=>{o.preventDefault();const l=parseFloat(document.getElementById("rec-valor").value);let r=document.getElementById("rec-parcelas").value?parseInt(document.getElementById("rec-parcelas").value):null;r!==null&&r<1&&(r=null);const a=s.querySelector('input[name="tipo-valor"]:checked').value;let e=l,t=l;r&&r>1?a==="total"?(e=+(l/r).toFixed(2),t=+(e.toFixed(2)*r).toFixed(2)):(e=+l.toFixed(2),t=+(e*r).toFixed(2)):(e=+l.toFixed(2),t=+l.toFixed(2));const n={descricao:document.getElementById("rec-desc").value,valor:e,valorTotal:t,categoriaId:document.getElementById("rec-categoria").value,dataInicio:document.getElementById("rec-data").value,parcelasRestantes:r,parcelasTotal:r,ativa:!0,efetivarMesAtual:document.getElementById("rec-efetivar").checked};v(n)}),s}window.showAddRecorrenteModal=function(v={}){const c=!!v&&Object.keys(v).length>0,s=V({title:c?"Editar Despesa Recorrente":"Nova Despesa Recorrente",content:"",onClose:()=>s.remove()}),i=window.appState.currentUser,o=window.appState.currentBudget;if(!i){E({message:"Você precisa estar logado para adicionar recorrentes.",type:"error"});return}if(!o){E({message:"Selecione um orçamento antes de adicionar recorrentes.",type:"error"});return}const l=k({initialData:v,onSubmit:async a=>{try{if(document.querySelector(".fab")?.classList.add("hidden"),c&&v.id)await M(i.uid,v.id,a);else{const e=await L(i.uid,o.id,a);if(a.efetivarMesAtual){console.log("🚀 Efetivando recorrente no mês atual...");const t=new Date,n=t.getMonth()+1,d=t.getFullYear(),{db:m}=await g(async()=>{const{db:p}=await import("./main-CwyRbrt1.js").then(w=>w.ac);return{db:p}},__vite__mapDeps([0,1])),f=T(m,"transactions"),I=(await D(q(f,A("userId","==",i.uid),A("recorrenteId","==",e)))).docs.some(p=>{const w=p.data(),u=w.createdAt&&w.createdAt.toDate?w.createdAt.toDate():w.createdAt?new Date(w.createdAt):null;return u&&u.getMonth()+1===n&&u.getFullYear()===d});if(console.log("🔍 Já existe transação neste mês?",I),I)console.log("⏭️ Transação já existe para este mês, pulando...");else{let p=null,w=1;try{const{createFromRecurring:u}=await g(async()=>{const{createFromRecurring:x}=await import("./main-CwyRbrt1.js").then(_=>_.$);return{createFromRecurring:x}},__vite__mapDeps([0,1])),{calcularParcelaRecorrente:y}=await g(async()=>{const{calcularParcelaRecorrente:x}=await import("./main-CwyRbrt1.js").then(_=>_.a3);return{calcularParcelaRecorrente:x}},__vite__mapDeps([0,1])),h={id:e,descricao:a.descricao,valor:a.valor,categoriaId:a.categoriaId,parcelasTotal:a.parcelasTotal,parcelasRestantes:a.parcelasRestantes,dataInicio:a.dataInicio||t.toISOString().split("T")[0]},R=y(h,d,n);w=R&&!isNaN(R)?R:1;const{id:$}=await u({userId:i.uid,budgetId:o.id,rec:h,createdDate:t,parcelaAtual:w});p=$,console.log("✅ Transação criada para mês atual:",p)}catch(u){console.error("❌ Erro ao criar transação usando createFromRecurring:",u);const y={userId:i.uid,budgetId:o.id,descricao:a.descricao,valor:a.valor,categoriaId:a.categoriaId,tipo:"despesa",createdAt:t,recorrenteId:e,recorrenteNome:a.descricao};p=(await S(T(m,"transactions"),y)).id,console.log("✅ Transação criada para mês atual (fallback):",p)}try{const{sendTransactionNotification:u}=await g(async()=>{const{sendTransactionNotification:h}=await import("./NotificationService-mrKnlfb8.js");return{sendTransactionNotification:h}},__vite__mapDeps([2,0,1])),y={id:p,descricao:a.descricao,valor:a.valor,categoriaId:a.categoriaId,tipo:"despesa",recorrenteId:e,recorrenteParcelaAtual:w??null,recorrenteParcelasTotal:a.parcelasTotal??null};await u(o.id,i.uid,y)}catch(u){console.warn("Falha ao enviar notificação de recorrente imediata:",u)}try{await S(T(m,"logAplicacoes"),{userId:i.uid,mesAno:`${d}-${String(n).padStart(2,"0")}`,recorrenteId:e,descricao:a.descricao,valor:a.valor,dataAplicacao:t,transacaoId:p,aplicacaoImediata:!0}),console.log("📝 Aplicação imediata registrada no log")}catch(u){console.error("Erro ao registrar aplicação imediata no log:",u)}}}}await new Promise(e=>setTimeout(e,200));try{const{loadRecorrentes:e}=await g(async()=>{const{loadRecorrentes:t}=await import("./main-CwyRbrt1.js").then(n=>n.a3);return{loadRecorrentes:t}},__vite__mapDeps([0,1]));await e()}catch(e){typeof window.loadRecorrentes=="function"?await window.loadRecorrentes():console.warn("loadRecorrentes indisponível:",e)}s.remove(),E({message:c?"Despesa recorrente editada!":"Despesa recorrente salva!",type:"success"}),setTimeout(async()=>{if(document.querySelector(".fab")?.classList.remove("hidden"),c&&v.id&&typeof window.recalcularTransacoesRecorrente=="function")try{console.log("🔄 Recalculando transações da recorrente editada:",v.id),await window.recalcularTransacoesRecorrente(v.id,a)}catch(e){console.warn("Falha ao recalcular transações da recorrente:",e)}try{const{loadRecorrentes:e}=await g(async()=>{const{loadRecorrentes:t}=await import("./main-CwyRbrt1.js").then(n=>n.a3);return{loadRecorrentes:t}},__vite__mapDeps([0,1]));await e()}catch(e){typeof window.loadRecorrentes=="function"?await window.loadRecorrentes():console.warn("Falha ao recarregar recorrentes:",e)}try{const{loadTransactions:e}=await g(async()=>{const{loadTransactions:d}=await import("./main-CwyRbrt1.js").then(m=>m.a0);return{loadTransactions:d}},__vite__mapDeps([0,1])),t=window.appState?.currentBudget?.id,n=window.appState?.currentUser?.uid;await e(t,n)}catch(e){typeof window.loadTransactions=="function"?await window.loadTransactions():console.warn("Falha ao recarregar transações:",e)}try{const{loadCategories:e}=await g(async()=>{const{loadCategories:n}=await import("./main-CwyRbrt1.js").then(d=>d.a2);return{loadCategories:n}},__vite__mapDeps([0,1])),t=window.appState?.currentBudget?.id;await e(t)}catch(e){typeof window.loadCategories=="function"?await window.loadCategories():console.warn("Falha ao recarregar categorias:",e)}if(window.location.hash.includes("/recorrentes"))try{typeof window._renderRecorrentes=="function"&&window._renderRecorrentes()}catch{}else if(window.location.hash.includes("/dashboard"))try{typeof window.renderDashboard=="function"&&window.renderDashboard()}catch{}else if(window.location.hash.includes("/transactions"))try{typeof window.renderTransactions=="function"&&window.renderTransactions()}catch{}document.dispatchEvent(new CustomEvent("recorrente-adicionada")),document.dispatchEvent(new CustomEvent("dados-atualizados"))},100)}catch(e){document.querySelector(".fab")?.classList.remove("hidden"),console.error("Erro ao adicionar/editar recorrente:",e),E({message:"Erro ao salvar recorrente",type:"error"})}}}),r=s.querySelector(".modal-body");r?r.appendChild(l):s.appendChild(l),document.body.appendChild(s)};
