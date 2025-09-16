const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/userSettingsRepo-Co_L2mC-.js","assets/main-tWUdnkzv.js","assets/main-Drn95-wI.css","assets/NotificationService-sgP6-TBM.js"])))=>i.map(i=>d[i]);
import{h as T,A as H,B as V,C as q,m as G,D as Y,E as J,_ as S,e as m,F as ut}from"./main-tWUdnkzv.js";import{mountPeriodIndicator as ft}from"./PeriodIndicator-6cPn_XN0.js";import{getNotificationModal as pt}from"./NotificationModal-C2TNoalh.js";function yt(t,e){const a=new Date,n={all:null,today:new Date(a.getFullYear(),a.getMonth(),a.getDate()),"7d":new Date(a.getTime()-10080*60*1e3),"30d":new Date(a.getTime()-720*60*60*1e3)}[e?.period||"all"];let s=null,d=null;try{const i=typeof T=="function"?T():null;!n&&i&&i.year&&i.month&&(s=new Date(i.year,i.month-1,1,0,0,0,0),d=new Date(i.year,i.month,0,23,59,59,999))}catch{}return(t||[]).filter(i=>{if(e?.unreadOnly&&i.read||!(!e?.types||e.types.includes(i.type)))return!1;const p=i.createdAt?.toDate?i.createdAt.toDate():i.createdAt?.seconds?new Date(i.createdAt.seconds*1e3):new Date(i.createdAt);return n?p>=n:s&&d?p>=s&&p<=d:!0})}function wt(t){const e={};return(t||[]).forEach(a=>{const s=(a.createdAt?.toDate?a.createdAt.toDate():new Date(a.createdAt)).toDateString();e[s]||(e[s]=[]),e[s].push(a)}),Object.keys(e).sort((a,n)=>new Date(n)-new Date(a)).map(a=>({label:a,items:e[a]}))}function W(t){const e=t.type==="deleted_transaction"?"bg-red-100 dark:bg-red-900":t.type==="updated_transaction"?"bg-yellow-100 dark:bg-yellow-900":t.type&&t.type.startsWith("category_")?"bg-purple-100 dark:bg-purple-900":t.type==="test_notification"?"bg-emerald-100 dark:bg-emerald-900":"bg-blue-100 dark:bg-blue-900",a=t.type==="deleted_transaction"?"🗑️":t.type==="updated_transaction"?"✏️":t.type&&t.type.startsWith("category_")?"📂":t.type==="test_notification"?"📣":"💰",n=t.type==="deleted_transaction"&&"Transação Excluída"||t.type==="updated_transaction"&&"Transação Atualizada"||t.type==="new_transaction"&&"Nova Transação"||t.type==="category_added"&&"Categoria Criada"||t.type==="category_updated"&&"Categoria Atualizada"||t.type==="category_deleted"&&"Categoria Excluída"||t.type==="test_notification"&&"Notificação de Teste"||"Notificação",s=t.createdAt?.toDate?t.createdAt.toDate().toLocaleString("pt-BR"):"Data não disponível",d=w=>{if(typeof w!="number")return w??"-";try{return w.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}catch{return String(w)}},i=t.changes||{},p=Object.keys(i).length>0?`
    <div class="mt-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <div class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Alterações</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        ${i.descricao?`<li>✏️ Descrição: <span class="line-through opacity-60">${i.descricao.from||"-"}</span> → <span class="font-medium">${i.descricao.to||"-"}</span></li>`:""}
        ${i.valor?`<li>💵 Valor: <span class="line-through opacity-60">${d(i.valor.from)}</span> → <span class="font-medium">${d(i.valor.to)}</span></li>`:""}
        ${i.categoria?`<li>📂 Categoria: <span class="line-through opacity-60">${i.categoria.from||"-"}</span> → <span class="font-medium">${i.categoria.to||"-"}</span></li>`:""}
        ${i.tipo?`<li>🔁 Tipo: <span class="line-through opacity-60">${i.tipo.from||"-"}</span> → <span class="font-medium">${i.tipo.to||"-"}</span></li>`:""}
      </ul>
    </div>
  `:"",k=!!(i&&(i.nome||i.tipo||i.limite))?`
    <div class="mt-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <div class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Alterações da Categoria</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        ${i.nome?`<li>🏷️ Nome: <span class="line-through opacity-60">${i.nome.from||"-"}</span> → <span class="font-medium">${i.nome.to||"-"}</span></li>`:""}
        ${i.tipo?`<li>🔁 Tipo: <span class="line-through opacity-60">${i.tipo.from||"-"}</span> → <span class="font-medium">${i.tipo.to||"-"}</span></li>`:""}
        ${i.limite?`<li>📏 Limite: <span class="line-through opacity-60">${d(i.limite.from)}</span> → <span class="font-medium">${d(i.limite.to)}</span></li>`:""}
      </ul>
    </div>
  `:"",v=t.type==="new_transaction"||t.type==="deleted_transaction"||t.type==="updated_transaction"?`
    <div class="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div class="font-semibold mb-2 text-gray-800 dark:text-gray-200">Resumo</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        <li>📝 Descrição: <span class="font-medium">${t.transactionDescricao||"-"}</span></li>
        <li>💵 Valor: <span class="font-medium">${d(t.transactionValor)}</span></li>
        <li>📂 Categoria: <span class="font-medium">${t.transactionCategoria||"-"}</span></li>
        <li>🔁 Tipo: <span class="font-medium">${(t.transactionTipo||"despesa")==="receita"?"Receita":"Despesa"}</span></li>
  <li>📏 Limite da categoria: <span class="font-medium">${t.transactionCategoriaLimite!==null&&t.transactionCategoriaLimite!==void 0?d(t.transactionCategoriaLimite):"-"}</span></li>
  ${t.recorrenteParcelaAtual&&t.recorrenteParcelasTotal?`<li>📅 Parcela: <span class="font-medium">${t.recorrenteParcelaAtual}/${t.recorrenteParcelasTotal}</span></li>`:""}
      </ul>
    </div>
  `:"";return`
  <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${t.read?"":"ring-2 ring-blue-200 dark:ring-blue-800"}">
      <div class="bg-gradient-to-r ${t.read?"from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800":"from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800"} p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full ${e} flex items-center justify-center text-xl">${a}</div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-gray-100">${n}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Orçamento: ${t.budgetName||"Orçamento"}</p>
            </div>
          </div>
          <div class="text-right">${t.read?'<div class="text-2xl">✅</div>':'<div class="text-2xl">📬</div>'}</div>
        </div>
      </div>

      <div class="p-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Enviado por:</span>
            <span class="font-medium text-gray-900 dark:text-gray-100">${t.senderName||"Usuário"}</span>
          </div>
          ${t.type&&t.type.startsWith("category_")?`
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Categoria:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">${t.categoryNome||"Categoria"}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
              <span class="font-medium ${(t.categoryTipo||"despesa")==="receita"?"text-green-600":"text-red-600"}">${(t.categoryTipo||"despesa")==="receita"?"Receita":"Despesa"}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Limite:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">${t.categoryLimite!==null&&t.categoryLimite!==void 0?d(t.categoryLimite):"-"}</span>
            </div>
          `:t.type==="test_notification"?`
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Mensagem:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">${t.message||"Mensagem de teste"}</span>
            </div>
          `:`
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
              ${t.type==="deleted_transaction"?'<span class="font-medium text-red-600">excluída</span>':`<span class="font-medium ${(t.transactionTipo||"despesa")==="receita"?"text-green-600":"text-red-600"}">${t.transactionTipo||"Transação"}</span>`}
            </div>
          `}
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Data:</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">${s}</span>
          </div>
          ${v}
          ${t.type==="updated_transaction"?p:""}
          ${t.type==="category_updated"?k:""}
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-2">
          ${t.read?"":`
          <button onclick="window.showConfirmationModal({
            title: 'Marcar como Lida',
            message: 'Deseja marcar esta notificação como lida?',
            confirmText: 'Sim, Marcar',
            confirmColor: 'bg-blue-500 hover:bg-blue-600',
            onConfirm: () => window.markNotificationAsRead && window.markNotificationAsRead('${t.id}')
          })" class="flex-1 u-btn u-btn--primary text-sm flex items-center justify-center gap-2">✅ Marcar como lida</button>
          `}
          <button onclick="window.__pinNotification && window.__pinNotification('${t.id}', ${!t.pinned})" class="flex-1 u-btn ${t.pinned?"u-btn--danger":"u-btn--outline"} text-sm flex items-center justify-center gap-2">${t.pinned?"📌 Desfixar":"📍 Fixar"}</button>
          <button onclick="window.__archiveNotification && window.__archiveNotification('${t.id}', ${!t.archivedAt})" class="flex-1 u-btn u-btn--outline text-sm flex items-center justify-center gap-2">${t.archivedAt?"📂 Restaurar":"🗃️ Arquivar"}</button>
          <button onclick="window.openNotificationTarget && window.openNotificationTarget('${t.id}','${t.type||""}')" class="flex-1 u-btn u-btn--outline text-sm flex items-center justify-center gap-2">🔗 Ver no app</button>
        </div>
      </div>
    </div>
  `}function U(t,e){return`
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">${t}</h2>
      </div>
      <div class="space-y-6">
        ${e.map(a=>`
          <div>
            <div class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">${a.label}</div>
            <div class="space-y-4">${a.items.map(W).join("")}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `}const M="notif_filters_v1",x=["new_transaction","updated_transaction","deleted_transaction","category_added","category_updated","category_deleted","test_notification"],mt=typeof window.renderFAB=="function"?window.renderFAB:()=>{};function _(){if(console.log("[NotificationsPage] 🔧 Obtendo filtros de notificação..."),typeof window.getNotifFilters=="function")return console.log("[NotificationsPage] 🔧 Usando função global getNotifFilters"),window.getNotifFilters();try{const e=localStorage.getItem(M);if(console.log("[NotificationsPage] 🔧 Dados do localStorage:",e?"Encontrados":"Não encontrados"),e){const a=JSON.parse(e),n={types:Array.isArray(a.types)&&a.types.length?a.types:x.slice(),period:a.period||"all",unreadOnly:a.unreadOnly!==void 0?!!a.unreadOnly:!0};return console.log("[NotificationsPage] 🔧 Filtros carregados do localStorage:",n),n}}catch(e){console.warn("[NotificationsPage] ⚠️ Erro ao carregar filtros do localStorage:",e)}const t={types:x.slice(),period:"all",unreadOnly:!0};return console.log("[NotificationsPage] 🔧 Usando filtros padrão:",t),t}function bt(t,e){return typeof window.applyNotificationFilters=="function"?window.applyNotificationFilters(t,e):yt(t,e)}function E(t){return typeof window.groupNotificationsByDay=="function"?window.groupNotificationsByDay(t):wt(t)}async function K(){try{const t=window.appState?.currentUser?.uid;if(!t)return{};const{getByUser:e}=await S(async()=>{const{getByUser:n}=await import("./userSettingsRepo-Co_L2mC-.js");return{getByUser:n}},__vite__mapDeps([0,1,2]));return(await e(t))?.notificationPrefs||{}}catch{return{}}}async function xt(t){try{const e=window.appState?.currentUser?.uid;if(!e)return!1;const{setNotificationPrefs:a}=await S(async()=>{const{setNotificationPrefs:n}=await import("./userSettingsRepo-Co_L2mC-.js");return{setNotificationPrefs:n}},__vite__mapDeps([0,1,2]));return await a(e,t||{}),!0}catch{return!1}}async function ht(t,e){try{const a=await K(),n=a.byBudget||{},s=n[t]||{allow:{}},d={...s.allow||{}};d[e]=d[e]===!1,n[t]={...s,allow:d};const i={...a,byBudget:n};await xt(i);try{m.emit("snackbar:show",{message:"Preferência salva",type:"success",duration:2e3})}catch{}}catch{}}let c=null,N=!1,$=null;function L(){return c||(c=window.__notifFilters||_()),c}function h(){console.log("[NotificationsPage] 💾 Salvando estado dos filtros...");try{c||(c=_()),c||(console.warn("[NotificationsPage] ⚠️ notifFilters ainda é null, usando filtros padrão"),c={types:x.slice(),period:"all",unreadOnly:!0}),window.__notifFilters=c;const t={types:Array.isArray(c.types)?c.types:[],period:c.period||"all",unreadOnly:!!c.unreadOnly};localStorage.setItem(M,JSON.stringify(t)),console.log("[NotificationsPage] ✅ Filtros salvos no localStorage:",t)}catch(t){console.error("[NotificationsPage] ❌ Erro ao salvar filtros:",t)}}function vt(t){c=L();const e=new Set(c.types||[]);e.has(t)?e.delete(t):e.add(t),c.types=Array.from(e),h(),f(!0)}function Nt(t){c=L(),c.period=t,h(),f(!0)}function _t(){console.log("[NotificationsPage] 🔄 Toggle unreadOnly chamado"),c=L(),console.log("[NotificationsPage] 🔄 Valor atual de unreadOnly:",c.unreadOnly),c.unreadOnly=!c.unreadOnly,console.log("[NotificationsPage] 🔄 Novo valor de unreadOnly:",c.unreadOnly),h(),f(!0)}function kt(){c={types:x.slice(),period:"all",unreadOnly:!0},h();try{m.emit("snackbar:show",{message:"Filtros redefinidos para padrão",type:"success",duration:2e3})}catch{}f(!0)}function At(){try{const t=Pt();return f(!0),t}catch(t){console.warn("Auto clean falhou",t)}}function Pt(t){let e=30;try{if(typeof t=="number"&&Number.isFinite(t))e=t;else{const y=parseInt(localStorage.getItem("notif_retention_days")||"30",10);Number.isFinite(y)&&(e=y)}}catch{}if(!e||e<=0){try{m.emit("snackbar:show",{message:"Retenção desativada",type:"info",duration:2e3})}catch{}return!1}const a=Date.now()-e*24*60*60*1e3,n=Array.isArray(window.appState?.notifications)?window.appState.notifications:[],s=n.length,d=n.filter(y=>(y.createdAt?.toDate?y.createdAt.toDate().getTime():new Date(y.createdAt).getTime())>=a);window.appState.notifications=d;const i=Math.max(0,s-d.length);try{m.emit("notifications:updated",d)}catch{}if(i>0)try{m.emit("snackbar:show",{message:`Notificações antigas removidas: ${i}`,type:"success",duration:2500})}catch{}return i>0}function $t(t,e){window.location.hash="#/dashboard"}function Tt(t){const e=confirm(t?.message||"Confirmar?");if(e&&t?.onConfirm)try{typeof t.onConfirm=="function"&&t.onConfirm()}catch(a){console.error("Erro no onConfirm",a)}if(e&&t?.onConfirmFn&&typeof t.onConfirmFn=="string")try{const a=window[t.onConfirmFn];typeof a=="function"&&a()}catch{}}async function f(t=!1){if(N&&!t){console.log("[NotificationsPage] ⏳ Renderização já em andamento, ignorando...");return}if($&&(clearTimeout($),$=null),!t){$=setTimeout(()=>{f(!0)},100);return}N=!0,console.log("[NotificationsPage] 🚀 Iniciando renderização...");try{const e=document.getElementById("app-content");if(!e){console.error("[NotificationsPage] ❌ Elemento app-content não encontrado!");return}console.log("[NotificationsPage] ✅ Elemento app-content encontrado"),await Q(!0);const a=window.appState.notifications||[];console.log("[NotificationsPage] 📧 Notificações carregadas:",a.length),console.log("[NotificationsPage] 📧 Notificações originais:",a.map(o=>({id:o.id,type:o.type,read:o.read,archivedAt:o.archivedAt})));const n=_();console.log("[NotificationsPage] 🔧 Filtros atuais:",n),n.unreadOnly===void 0?(n.unreadOnly=!0,h(),console.log("[NotificationsPage] ✅ Padrão: Configurado para mostrar apenas notificações não lidas")):console.log("[NotificationsPage] ✅ Respeitando escolha do usuário: unreadOnly =",n.unreadOnly);const s=a.filter(o=>!o.read&&!o.archivedAt).length;console.log(`[NotificationsPage] 📊 Renderizando: ${a.length} total, ${s} não lidas`);const d={new_transaction:"Nova Tx",updated_transaction:"Tx Atualizada",deleted_transaction:"Tx Excluída",category_added:"Cat Criada",category_updated:"Cat Atualizada",category_deleted:"Cat Excluída",test_notification:"Teste"},i=x.map(o=>{const r=n.types.includes(o);return`<button onclick="window.toggleNotificationTypeFilter && window.toggleNotificationTypeFilter('${o}')" class="px-3 py-1 rounded-full text-xs font-medium ${r?"bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}">${d[o]}</button>`}).join(""),y=["all","today","7d","30d"].map(o=>{const r=o==="all"?"Tudo":o==="today"?"Hoje":o==="7d"?"7 dias":"30 dias",g=n.period===o;return`<button onclick="window.setNotificationPeriod && window.setNotificationPeriod('${o}')" class="px-3 py-1 rounded-full text-xs font-medium ${g?"bg-indigo-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}">${r}</button>`}).join(""),p=bt(a,n);console.log("[NotificationsPage] 🔍 Notificações após filtro:",p.length),console.log("[NotificationsPage] 🔍 Filtros aplicados:",n);const C=p.filter(o=>!o.read&&!o.archivedAt),k=p.filter(o=>o.read&&!o.archivedAt);console.log("[NotificationsPage] 🔍 Notificações não lidas após filtro:",C.length),console.log("[NotificationsPage] 🔍 Notificações lidas após filtro:",k.length);const A=[...C,...k],v=A.filter(o=>!!o.pinned&&!o.archivedAt),w=A.filter(o=>!o.pinned&&!o.archivedAt),F=A.filter(o=>!!o.archivedAt);console.log("[NotificationsPage] 🔍 Pinned:",v.length),console.log("[NotificationsPage] 🔍 Inbox:",w.length),console.log("[NotificationsPage] 🔍 Archived:",F.length);const D=E(w),j=E(v),I=E(F);console.log("[NotificationsPage] 🔍 Grouped Inbox:",D.length),console.log("[NotificationsPage] 🔍 Grouped Pinned:",j.length),console.log("[NotificationsPage] 🔍 Grouped Archived:",I.length);const P=typeof T=="function"?T():null,z=new Date,X=P&&P.year||window.appState?.selectedYear||z.getFullYear(),Z=P&&P.month||window.appState?.selectedMonth||z.getMonth()+1,tt=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][(Z-1)%12]||"",O=p.length,b=p.filter(o=>!o.read&&!o.archivedAt).length,et=O-b,ot=p.filter(o=>{const r=o.createdAt?.toDate?o.createdAt.toDate():new Date(o.createdAt),g=new Date;return r.toDateString()===g.toDateString()}).length;window.renderNotificationCard||(window.renderNotificationCard=W);const at=b>0?`<span class="header-unread-badge inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200" aria-live="polite" aria-atomic="true">${b}</span>`:"",it=b>0?"text-yellow-200":"text-green-200";console.log("[NotificationsPage] 🔍 Renderizando inbox com",w.length,"notificações"),console.log("[NotificationsPage] 🔍 GroupedInbox tem",D.length,"grupos");const nt=w.length?U("📬 Inbox",D):`
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📬 Inbox</h2>
              </div>
        <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-4">
                  <div class="empty-state">
                  <div class="empty-icon">✅</div>
                  <div class="empty-text">🎉 Todas as notificações foram lidas!</div>
                  <div class="empty-description">Você está em dia com suas notificações. Não há nada novo para ver.</div>
          <div class="mt-2 flex gap-2">
            <button onclick="window.renderNotifications()" class="u-btn u-btn--primary mobile-btn">🔄 Atualizar</button>
            <button onclick="window.toggleUnreadOnly && window.toggleUnreadOnly()" class="u-btn u-btn--outline mobile-btn">👁️ Ver todas</button>
          </div>
                </div>
              </div>
            </div>
          `,st=v.length?U("📌 Fixadas",j):"",rt=F.length?U("🗃️ Arquivadas",I):"";e.innerHTML=`
    <div class="tab-container">
      <div class="tab-header flex items-center justify-between">
        <h2 class="tab-title-highlight flex items-center gap-2">🔔 Notificações ${at}</h2>
        <div id="notif-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">

          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Visão Geral</h2>
            </div>
            <div class="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold">Centro de Notificações</h3>
                  <p class="text-sm opacity-90">${O} notificações no total</p>
                  <p class="text-xs mt-1 opacity-90">Período: <span class="font-semibold">${tt} / ${X}</span></p>
                  <p class="text-xs mt-1 opacity-90 text-yellow-200">📬 Modo: Mostrando apenas notificações não lidas</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${it}">${b}</div>
                  <p class="text-xs opacity-90">${b>0?"📬 Não lidas":"✅ Todas lidas"}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📧</div>
                  <div class="text-2xl md:text-3xl font-bold">${O}</div>
                  <div class="text-sm opacity-90">Total</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📬</div>
                  <div class="text-2xl md:text-3xl font-bold text-yellow-200">${b}</div>
                  <div class="text-sm opacity-90">Não lidas</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">✅</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">${et}</div>
                  <div class="text-sm opacity-90">Lidas</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📅</div>
                  <div class="text-2xl md:text-3xl font-bold">${ot}</div>
                  <div class="text-sm opacity-90">Hoje</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Controles</h2>
            </div>
      <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Notificações</h3>
                  <div class="flex gap-2 flex-wrap">
        <button onclick="window.showConfirmationModal({ title: 'Marcar como Lidas', message: 'Deseja marcar todas as notificações como lidas?', confirmText: 'Sim, Marcar', confirmColor: 'bg-blue-500 hover:bg-blue-600', onConfirmFn: 'markAllNotificationsAsRead' })" class="u-btn u-btn--primary mobile-btn">✅ Marcar todas como lidas</button>
        <button onclick="window.showConfirmationModal({ title: 'Arquivar notificações lidas', message: 'Deseja arquivar todas as notificações lidas? Você poderá restaurá-las depois.', confirmText: 'Sim, Arquivar', confirmColor: 'bg-indigo-500 hover:bg-indigo-600', onConfirmFn: 'archiveAllReadNotifications' })" class="u-btn u-btn--outline mobile-btn">🗃️ Arquivar lidas</button>
        <button onclick="window.showConfirmationModal({ title: 'Apagar notificações lidas', message: 'Deseja apagar todas as notificações lidas? Esta ação não pode ser desfeita.', confirmText: 'Sim, Apagar', confirmColor: 'bg-red-500 hover:bg-red-600', onConfirmFn: 'deleteAllReadNotifications' })" class="u-btn u-btn--danger mobile-btn">🗑️ Apagar lidas</button>
        <button onclick="window.renderNotifications()" class="u-btn u-btn--outline mobile-btn">🔄 Atualizar</button>
        <button onclick="window.__sendTestToOwner && window.__sendTestToOwner()" class="u-btn u-btn--outline mobile-btn">📣 Teste → Dono</button>
        <button onclick="window.__sendTestToShared && window.__sendTestToShared()" class="u-btn u-btn--outline mobile-btn">📣 Teste → Compartilhados</button>
        <button onclick="window.__testNotificationModal && window.__testNotificationModal()" class="u-btn u-btn--outline mobile-btn">📱 Testar Modal</button>
        <button onclick="window.debugNotificationSystem && window.debugNotificationSystem()" class="u-btn u-btn--outline mobile-btn">🔍 Debug Sistema</button>
        <button onclick="window.debugSharedNotificationTest && window.debugSharedNotificationTest()" class="u-btn u-btn--outline mobile-btn">🧪 Debug Compartilhados</button>
        <button onclick="window.debugCheckOtherUserNotifications && window.debugCheckOtherUserNotifications()" class="u-btn u-btn--outline mobile-btn">👥 Ver Outros Usuários</button>
        <button onclick="window.debugTestModal && window.debugTestModal()" class="u-btn u-btn--outline mobile-btn">📱 Testar Modal</button>
                  </div>
                </div>
                <div class="mt-3 flex flex-col gap-3">
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Tipos:</span>
                    ${i}
                  </div>
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Período:</span>
                    ${y}
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300" title="Atalho: U">
                      <input type="checkbox" ${n.unreadOnly?"checked":""} onchange="window.toggleUnreadOnly && window.toggleUnreadOnly()" />
                      Apenas não lidas <span class="text-xs text-gray-500 dark:text-gray-400">(Atalho: U)</span>
                    </label>
        <button onclick="window.resetNotificationFilters && window.resetNotificationFilters()" class="ml-2 u-btn u-btn--ghost text-xs">♻️ Redefinir filtros</button>
        <button onclick="window.loadUnreadNotifications && window.loadUnreadNotifications()" class="ml-2 u-btn u-btn--primary text-xs">📬 Focar não lidas</button>
                  </div>
                  <div class="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div class="text-xs text-gray-600 dark:text-gray-300">As preferências de notificações (toasts, retenção e por orçamento/tipo) foram movidas para <strong>Configurações</strong> para manter esta aba focada em consultar notificações.</div>
                    <div class="mt-2"><a href="#/settings" class="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Abrir Configurações</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          ${nt}

          ${st}
          ${rt}

        </div>
      </div>
    </div>
  `,mt();try{ft("#notif-period-indicator")}catch{}console.log("[NotificationsPage] ✅ Interface renderizada com sucesso");try{const o=window.__prevNotifHeaderCount||0,r=(Array.isArray(window.appState?.notifications)?window.appState.notifications.filter(u=>!u.read&&!u.archivedAt).length:0)||0,g=document.querySelector(".header-unread-badge"),l=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;g&&r>0&&r!==o&&!l&&(g.style.transform="scale(1.05)",setTimeout(()=>{try{g.style.transform=""}catch{}},180)),window.__prevNotifHeaderCount=r}catch{}try{window.__notifUIBound||(window.__notifUIBound=!0,window.markAllNotificationsAsRead=async()=>{try{await H()}catch{}},window.deleteAllReadNotifications=async()=>{try{await V()}catch{}},window.archiveAllReadNotifications=async()=>{try{await q()}catch{}},window.markNotificationAsRead=async r=>{try{await G(r)}catch{}},window.__pinNotification=async(r,g)=>{try{await Y(r,g)}catch{}},window.__archiveNotification=async(r,g)=>{try{await J(r,g)}catch{}},(async()=>{const{sendTestNotificationToOwner:r,sendTestNotificationToShared:g}=await S(async()=>{const{sendTestNotificationToOwner:l,sendTestNotificationToShared:u}=await import("./NotificationService-sgP6-TBM.js");return{sendTestNotificationToOwner:l,sendTestNotificationToShared:u}},__vite__mapDeps([3,1,2]));window.__sendTestToOwner=async()=>{try{const l=window.appState?.currentBudget?.id||window.appState?.currentBudgetId,u=window.appState?.currentUser?.uid;if(!l||!u)return;await r(l,u)}catch(l){console.warn(l)}},window.__sendTestToShared=async()=>{try{const l=window.appState?.currentBudget?.id||window.appState?.currentBudgetId,u=window.appState?.currentUser?.uid;if(!l||!u)return;await g(l,u)}catch(l){console.warn(l)}},window.__testNotificationModal=()=>{try{const l=pt(),u={id:"test-modal-"+Date.now(),type:"test_notification",message:"Esta é uma notificação de teste para demonstrar o modal!",details:"O modal aparece automaticamente quando novas notificações chegam.",read:!1,createdAt:{toDate:()=>new Date}};l.show(u),console.log("[NotificationsPage] 📱 Modal de teste exibido")}catch(l){console.error("[NotificationsPage] ❌ Erro ao testar modal:",l)}}})())}catch{}try{const o=await K(),r=Array.isArray(window.appState?.budgets)?window.appState.budgets:Array.isArray(window.appState?.orçamentos)?window.appState.orçamentos:[],g=document.getElementById("notif-budget-prefs");if(g&&Array.isArray(r)){const l=x;g.innerHTML=r.map(u=>{const dt=(o.byBudget||{})[u.id]?.allow||{},ct=l.map(B=>{const lt=dt[B]!==!1,gt=d[B];return`<label class="inline-flex items-center gap-1 text-xs mr-2"><input type="checkbox" ${lt?"checked":""} onchange="window.__toggleBudgetTypePref && window.__toggleBudgetTypePref('${u.id}','${B}', this.checked)"/>${gt}</label>`}).join("");return`<div class="text-xs text-gray-700 dark:text-gray-300"><div class="font-semibold mb-1">${u.nome||u.name||"Orçamento"}</div><div>${ct}</div></div>`}).join("")}}catch{}try{window.__notifPeriodListenerBound||(window.__notifPeriodListenerBound=!0,m.on("period:changed",o=>window.queueMicrotask(()=>{const r=(window.location.hash||"").split("?")[0];if(r==="#/notifications"){try{const g=o?.year||window.getSelectedPeriod&&window.getSelectedPeriod().year,l=o?.month||window.getSelectedPeriod&&window.getSelectedPeriod().month;if(g&&l){const u=`${g}-${String(l).padStart(2,"0")}`,R=new URL(window.location.href);R.hash=`${r}?ym=${u}`,window.history.replaceState(null,"",R.toString())}}catch{}f()}}))),window.__notifUpdatesListenerBound||(window.__notifUpdatesListenerBound=!0,m.on("notifications:updated",()=>{try{(window.location.hash||"").split("?")[0]==="#/notifications"&&!N?(console.log("[NotificationsPage] 📡 Evento notifications:updated recebido, renderizando..."),f()):N&&console.log("[NotificationsPage] ⏳ Ignorando evento notifications:updated - renderização em andamento")}catch{}}))}catch{}try{window.__notifHotkeysBound||(window.__notifHotkeysBound=!0,document.addEventListener("keydown",o=>{try{const r=o.target&&(o.target.tagName||"").toLowerCase()||"";if(r==="input"||r==="textarea"||r==="select"||o.target&&o.target.isContentEditable)return;(window.location.hash||"").split("?")[0]==="#/notifications"&&(o.key==="u"||o.key==="U")&&(o.preventDefault(),typeof window.toggleUnreadOnly=="function"&&window.toggleUnreadOnly())}catch{}}))}catch{}}finally{N=!1,console.log("[NotificationsPage] ✅ Renderização finalizada")}}async function Q(t=!1){console.log("[NotificationsPage] 🔄 Iniciando carregamento de notificações...");try{const e=window.appState?.currentUser;if(console.log("[NotificationsPage] 👤 Usuário atual:",e?.uid?"Logado":"Não logado"),e?.uid){console.log("[NotificationsPage] 🔗 Iniciando listener de notificações..."),await ut(e.uid);const a=window.appState?.notifications||[],n=a.filter(s=>!s.read&&!s.archivedAt).length;if(console.log(`[NotificationsPage] ✅ Carregadas ${a.length} notificações, ${n} não lidas`),t)console.log("[NotificationsPage] ⏭️ Pulando emissão de evento para evitar loop");else try{m.emit("notifications:updated",a),console.log("[NotificationsPage] 📡 Evento notifications:updated emitido")}catch(s){console.warn("[NotificationsPage] ⚠️ Erro ao emitir evento:",s)}}else console.warn("[NotificationsPage] ⚠️ Usuário não logado, não é possível carregar notificações")}catch(e){console.error("[NotificationsPage] ❌ Erro ao carregar notificações:",e)}}function St(){H().catch(()=>{})}function Ct(){V().then(()=>f(!0)).catch(()=>{})}function Ft(t){G(t).then(()=>f(!0)).catch(()=>{})}function Dt(t,e){Y(t,e).then(()=>f(!0)).catch(()=>{})}function Ot(t,e){J(t,e).then(()=>f(!0)).catch(()=>{})}function Rt(){q().then(()=>f(!0)).catch(()=>{})}async function Bt(){try{console.log("[NotificationsPage] Forçando carregamento de notificações não lidas..."),await Q(!0);const t=_();t.unreadOnly=!0,h(),await f(!0),console.log("[NotificationsPage] Notificações não lidas carregadas com sucesso")}catch(t){console.error("[NotificationsPage] Erro ao carregar notificações não lidas:",t)}}async function jt(){return await f()}window.renderNotifications||(window.renderNotifications=f);window.toggleNotificationTypeFilter||(window.toggleNotificationTypeFilter=vt);window.setNotificationPeriod||(window.setNotificationPeriod=Nt);window.toggleUnreadOnly||(window.toggleUnreadOnly=_t);window.resetNotificationFilters||(window.resetNotificationFilters=kt);window.runNotificationAutoClean||(window.runNotificationAutoClean=At);window.markAllNotificationsAsRead||(window.markAllNotificationsAsRead=St);window.deleteAllReadNotifications||(window.deleteAllReadNotifications=Ct);window.markNotificationAsRead||(window.markNotificationAsRead=Ft);window.__pinNotification||(window.__pinNotification=Dt);window.__archiveNotification||(window.__archiveNotification=Ot);window.archiveAllReadNotifications||(window.archiveAllReadNotifications=Rt);window.openNotificationTarget||(window.openNotificationTarget=$t);window.showConfirmationModal||(window.showConfirmationModal=Tt);window.__toggleBudgetTypePref||(window.__toggleBudgetTypePref=function(t,e){ht(t,e)});window.loadUnreadNotifications||(window.loadUnreadNotifications=Bt);window.testNotificationsPage=async function(){console.log("[NotificationsPage] 🧪 Iniciando teste...");const t=window.appState?.currentUser;console.log("[NotificationsPage] 🧪 Usuário:",t?.uid?"Logado":"Não logado");const e=window.appState?.notifications||[];console.log("[NotificationsPage] 🧪 Notificações no estado:",e.length);const a=_();console.log("[NotificationsPage] 🧪 Filtros atuais:",a);const n=localStorage.getItem(M);console.log("[NotificationsPage] 🧪 localStorage:",n);try{console.log("[NotificationsPage] 🧪 Testando acesso direto ao Firebase...");const{listByRecipient:s}=await S(async()=>{const{listByRecipient:i}=await import("./main-tWUdnkzv.js").then(y=>y.a4);return{listByRecipient:i}},__vite__mapDeps([1,2])),d=await s(t?.uid);console.log("[NotificationsPage] 🧪 Notificações diretas do Firebase:",d.length),d.length>0&&console.log("[NotificationsPage] 🧪 Primeira notificação:",d[0])}catch(s){console.log("[NotificationsPage] 🧪 Erro ao acessar Firebase:",s)}try{await f(!0),console.log("[NotificationsPage] 🧪 ✅ Renderização bem-sucedida")}catch(s){console.error("[NotificationsPage] 🧪 ❌ Erro na renderização:",s)}};export{bt as __applyNotificationFiltersForTest,Pt as __clearOldNotificationsWithToastForTest,_ as __getNotifFiltersForTest,kt as __resetNotificationFiltersForTest,jt as default,Bt as loadUnreadNotifications,f as renderNotifications};
