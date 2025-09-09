const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/userSettingsRepo-DTIvdQev.js","assets/main-BVWxnpqW.js","assets/main-DLXVHLmp.css","assets/notificationsRepo-BiEwFjPf.js","assets/NotificationService-zMQk2mrd.js"])))=>i.map(i=>d[i]);
import{_ as w,e as g,g as v}from"./main-BVWxnpqW.js";import{mountPeriodIndicator as rt}from"./PeriodIndicator-Jgj9UKJk.js";function C(t){try{if(!t)return 0;if(typeof t.toDate=="function")return t.toDate().getTime();if(t.seconds)return t.seconds*1e3;const e=new Date(t);return Number.isFinite(e.getTime())?e.getTime():0}catch{return 0}}function P(){try{const t=localStorage.getItem("notif_toasts_enabled");return t===null?!0:t==="true"}catch{return!0}}async function st(t){try{const{getByUser:e}=await w(async()=>{const{getByUser:o}=await import("./userSettingsRepo-DTIvdQev.js");return{getByUser:o}},__vite__mapDeps([0,1,2]));return(await e(t))?.notificationPrefs||{}}catch{return{}}}function dt(t,e){try{if(!P())return!1;const o=e?.type,s=e?.budgetId;if(!o||!s)return!0;const r=t?.byBudget?.[s];return r?(r.allow||{})[o]!==!1:!0}catch{return!0}}function ct(t){try{const e=t?.type||"",a=t?.budgetName?` (${t.budgetName})`:"";return e==="new_transaction"?`Nova transação${a}: ${t.transactionDescricao||""}`:e==="updated_transaction"?`Transação atualizada${a}: ${t.transactionDescricao||""}`:e==="deleted_transaction"?`Transação excluída${a}: ${t.transactionDescricao||""}`:e==="category_added"?`Categoria criada${a}: ${t.categoryNome||""}`:e==="category_updated"?`Categoria atualizada${a}: ${t.categoryNome||""}`:e==="category_deleted"?`Categoria excluída${a}: ${t.categoryNome||""}`:e==="test_notification"?`Teste de notificação${a}: ${t.message||""}`:`Nova atividade${a}`}catch{return"Nova atividade"}}function lt(){const t=window;return t.__notifCtl||(t.__notifCtl={unsub:null,uid:null,lastSeenAt:0,lastIds:new Set}),t.__notifCtl}async function ut(t){const e=lt();if(!t)return()=>{};if(e.unsub&&e.uid===t)return e.unsub;if(e.unsub)try{e.unsub()}catch{}const{listenByRecipient:a}=await w(async()=>{const{listenByRecipient:s}=await import("./notificationsRepo-BiEwFjPf.js");return{listenByRecipient:s}},__vite__mapDeps([3,1,2]));e.uid=t,e.lastIds=new Set(Array.isArray(window.appState?.notifications)?window.appState.notifications.map(s=>s.id):[]),e.lastSeenAt=Math.max(0,...Array.isArray(window.appState?.notifications)?window.appState.notifications.map(s=>C(s.createdAt)):[0]);const o=await st(t);return e.unsub=a(t,s=>{window.appState=window.appState||{},window.appState.notifications=s;try{g.emit("notifications:updated",s)}catch{}if(P())try{for(const r of s){const i=C(r.createdAt);if(!e.lastIds.has(r.id)&&i>=e.lastSeenAt){if(!dt(o,r))continue;const f=ct(r);try{g.emit("snackbar:show",{message:f,type:"info",duration:3500,action:{label:"Ver",onClick:()=>{try{window.location.hash="#/notifications"}catch{}}}})}catch{try{window.Snackbar?.({message:f,type:"info",duration:3500})}catch{}}}}}catch{}e.lastIds=new Set(s.map(r=>r.id)),e.lastSeenAt=Math.max(0,...s.map(r=>C(r.createdAt)))},100),e.unsub}async function E(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>!o.read).map(o=>o.id);if(!e.length)return;const{markManyAsRead:a}=await w(async()=>{const{markManyAsRead:o}=await import("./notificationsRepo-BiEwFjPf.js");return{markManyAsRead:o}},__vite__mapDeps([3,1,2]));await a(e)}async function L(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>o.read).map(o=>o.id);if(!e.length)return;const{deleteMany:a}=await w(async()=>{const{deleteMany:o}=await import("./notificationsRepo-BiEwFjPf.js");return{deleteMany:o}},__vite__mapDeps([3,1,2]));await a(e)}async function M(t){if(!t)return;const{markAsRead:e}=await w(async()=>{const{markAsRead:a}=await import("./notificationsRepo-BiEwFjPf.js");return{markAsRead:a}},__vite__mapDeps([3,1,2]));await e(t)}async function j(t,e=!0){if(!t)return;const{pin:a}=await w(async()=>{const{pin:o}=await import("./notificationsRepo-BiEwFjPf.js");return{pin:o}},__vite__mapDeps([3,1,2]));await a(t,e);try{g.emit("snackbar:show",{message:e?"Notificação fixada":"Notificação desfixada",type:"success",duration:1800})}catch{}}async function I(t,e=!0){if(!t)return;const{archive:a}=await w(async()=>{const{archive:o}=await import("./notificationsRepo-BiEwFjPf.js");return{archive:o}},__vite__mapDeps([3,1,2]));await a(t,e);try{g.emit("snackbar:show",{message:e?"Notificação arquivada":"Notificação restaurada",type:"info",duration:1800})}catch{}}async function U(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>o.read&&!o.archivedAt).map(o=>o.id);if(!e.length)return;const{archiveMany:a}=await w(async()=>{const{archiveMany:o}=await import("./notificationsRepo-BiEwFjPf.js");return{archiveMany:o}},__vite__mapDeps([3,1,2]));await a(e);try{g.emit("snackbar:show",{message:"Notificações lidas arquivadas",type:"info",duration:2e3})}catch{}}function pt(t,e){const a=new Date,o={all:null,today:new Date(a.getFullYear(),a.getMonth(),a.getDate()),"7d":new Date(a.getTime()-10080*60*1e3),"30d":new Date(a.getTime()-720*60*60*1e3)}[e?.period||"all"];let s=null,r=null;try{const i=typeof v=="function"?v():null;!o&&i&&i.year&&i.month&&(s=new Date(i.year,i.month-1,1,0,0,0,0),r=new Date(i.year,i.month,0,23,59,59,999))}catch{}return(t||[]).filter(i=>{if(e?.unreadOnly&&i.read||!(!e?.types||e.types.includes(i.type)))return!1;const m=i.createdAt?.toDate?i.createdAt.toDate():i.createdAt?.seconds?new Date(i.createdAt.seconds*1e3):new Date(i.createdAt);return o?m>=o:s&&r?m>=s&&m<=r:!0})}function ft(t){const e={};return(t||[]).forEach(a=>{const s=(a.createdAt?.toDate?a.createdAt.toDate():new Date(a.createdAt)).toDateString();e[s]||(e[s]=[]),e[s].push(a)}),Object.keys(e).sort((a,o)=>new Date(o)-new Date(a)).map(a=>({label:a,items:e[a]}))}function V(t){const e=t.type==="deleted_transaction"?"bg-red-100 dark:bg-red-900":t.type==="updated_transaction"?"bg-yellow-100 dark:bg-yellow-900":t.type&&t.type.startsWith("category_")?"bg-purple-100 dark:bg-purple-900":t.type==="test_notification"?"bg-emerald-100 dark:bg-emerald-900":"bg-blue-100 dark:bg-blue-900",a=t.type==="deleted_transaction"?"🗑️":t.type==="updated_transaction"?"✏️":t.type&&t.type.startsWith("category_")?"📂":t.type==="test_notification"?"📣":"💰",o=t.type==="deleted_transaction"&&"Transação Excluída"||t.type==="updated_transaction"&&"Transação Atualizada"||t.type==="new_transaction"&&"Nova Transação"||t.type==="category_added"&&"Categoria Criada"||t.type==="category_updated"&&"Categoria Atualizada"||t.type==="category_deleted"&&"Categoria Excluída"||t.type==="test_notification"&&"Notificação de Teste"||"Notificação",s=t.createdAt?.toDate?t.createdAt.toDate().toLocaleString("pt-BR"):"Data não disponível",r=b=>{if(typeof b!="number")return b??"-";try{return b.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}catch{return String(b)}},i=t.changes||{},m=Object.keys(i).length>0?`
    <div class="mt-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <div class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Alterações</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        ${i.descricao?`<li>✏️ Descrição: <span class="line-through opacity-60">${i.descricao.from||"-"}</span> → <span class="font-medium">${i.descricao.to||"-"}</span></li>`:""}
        ${i.valor?`<li>💵 Valor: <span class="line-through opacity-60">${r(i.valor.from)}</span> → <span class="font-medium">${r(i.valor.to)}</span></li>`:""}
        ${i.categoria?`<li>📂 Categoria: <span class="line-through opacity-60">${i.categoria.from||"-"}</span> → <span class="font-medium">${i.categoria.to||"-"}</span></li>`:""}
        ${i.tipo?`<li>🔁 Tipo: <span class="line-through opacity-60">${i.tipo.from||"-"}</span> → <span class="font-medium">${i.tipo.to||"-"}</span></li>`:""}
      </ul>
    </div>
  `:"",A=!!(i&&(i.nome||i.tipo||i.limite))?`
    <div class="mt-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <div class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Alterações da Categoria</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        ${i.nome?`<li>🏷️ Nome: <span class="line-through opacity-60">${i.nome.from||"-"}</span> → <span class="font-medium">${i.nome.to||"-"}</span></li>`:""}
        ${i.tipo?`<li>🔁 Tipo: <span class="line-through opacity-60">${i.tipo.from||"-"}</span> → <span class="font-medium">${i.tipo.to||"-"}</span></li>`:""}
        ${i.limite?`<li>📏 Limite: <span class="line-through opacity-60">${r(i.limite.from)}</span> → <span class="font-medium">${r(i.limite.to)}</span></li>`:""}
      </ul>
    </div>
  `:"",N=t.type==="new_transaction"||t.type==="deleted_transaction"||t.type==="updated_transaction"?`
    <div class="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div class="font-semibold mb-2 text-gray-800 dark:text-gray-200">Resumo</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        <li>📝 Descrição: <span class="font-medium">${t.transactionDescricao||"-"}</span></li>
        <li>💵 Valor: <span class="font-medium">${r(t.transactionValor)}</span></li>
        <li>📂 Categoria: <span class="font-medium">${t.transactionCategoria||"-"}</span></li>
        <li>🔁 Tipo: <span class="font-medium">${(t.transactionTipo||"despesa")==="receita"?"Receita":"Despesa"}</span></li>
  <li>📏 Limite da categoria: <span class="font-medium">${t.transactionCategoriaLimite!==null&&t.transactionCategoriaLimite!==void 0?r(t.transactionCategoriaLimite):"-"}</span></li>
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
              <h3 class="font-bold text-gray-900 dark:text-gray-100">${o}</h3>
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
              <span class="font-medium text-gray-900 dark:text-gray-100">${t.categoryLimite!==null&&t.categoryLimite!==void 0?r(t.categoryLimite):"-"}</span>
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
          ${N}
          ${t.type==="updated_transaction"?m:""}
          ${t.type==="category_updated"?A:""}
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
  `}function D(t,e){return`
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">${t}</h2>
      </div>
      <div class="space-y-6">
        ${e.map(a=>`
          <div>
            <div class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">${a.label}</div>
            <div class="space-y-4">${a.items.map(V).join("")}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `}const H="notif_filters_v1",h=["new_transaction","updated_transaction","deleted_transaction","category_added","category_updated","category_deleted","test_notification"],yt=typeof window.renderFAB=="function"?window.renderFAB:()=>{};function q(){if(typeof window.getNotifFilters=="function")return window.getNotifFilters();try{const t=localStorage.getItem(H);if(t){const e=JSON.parse(t);return{types:Array.isArray(e.types)&&e.types.length?e.types:h.slice(),period:e.period||"all",unreadOnly:!!e.unreadOnly}}}catch{}return{types:h.slice(),period:"all",unreadOnly:!1}}function gt(t,e){return typeof window.applyNotificationFilters=="function"?window.applyNotificationFilters(t,e):pt(t,e)}function R(t){return typeof window.groupNotificationsByDay=="function"?window.groupNotificationsByDay(t):ft(t)}async function z(){try{const t=window.appState?.currentUser?.uid;if(!t)return{};const{getByUser:e}=await w(async()=>{const{getByUser:o}=await import("./userSettingsRepo-DTIvdQev.js");return{getByUser:o}},__vite__mapDeps([0,1,2]));return(await e(t))?.notificationPrefs||{}}catch{return{}}}async function wt(t){try{const e=window.appState?.currentUser?.uid;if(!e)return!1;const{setNotificationPrefs:a}=await w(async()=>{const{setNotificationPrefs:o}=await import("./userSettingsRepo-DTIvdQev.js");return{setNotificationPrefs:o}},__vite__mapDeps([0,1,2]));return await a(e,t||{}),!0}catch{return!1}}async function mt(t,e){try{const a=await z(),o=a.byBudget||{},s=o[t]||{allow:{}},r={...s.allow||{}};r[e]=r[e]===!1,o[t]={...s,allow:r};const i={...a,byBudget:o};await wt(i);try{g.emit("snackbar:show",{message:"Preferência salva",type:"success",duration:2e3})}catch{}}catch{}}let p=null;function B(){return p||(p=window.__notifFilters||q()),p}function _(){window.__notifFilters=p;try{localStorage.setItem(H,JSON.stringify({types:Array.isArray(p.types)?p.types:[],period:p.period||"all",unreadOnly:!!p.unreadOnly}))}catch{}}function bt(t){p=B();const e=new Set(p.types||[]);e.has(t)?e.delete(t):e.add(t),p.types=Array.from(e),_(),y()}function xt(t){p=B(),p.period=t,_(),y()}function ht(){p=B(),p.unreadOnly=!p.unreadOnly,_(),y()}function vt(){p={types:h.slice(),period:"all",unreadOnly:!1},_();try{g.emit("snackbar:show",{message:"Filtros redefinidos",type:"success",duration:2e3})}catch{}y()}function _t(){try{const t=kt();return y(),t}catch(t){console.warn("Auto clean falhou",t)}}function kt(t){let e=30;try{if(typeof t=="number"&&Number.isFinite(t))e=t;else{const f=parseInt(localStorage.getItem("notif_retention_days")||"30",10);Number.isFinite(f)&&(e=f)}}catch{}if(!e||e<=0){try{g.emit("snackbar:show",{message:"Retenção desativada",type:"info",duration:2e3})}catch{}return!1}const a=Date.now()-e*24*60*60*1e3,o=Array.isArray(window.appState?.notifications)?window.appState.notifications:[],s=o.length,r=o.filter(f=>(f.createdAt?.toDate?f.createdAt.toDate().getTime():new Date(f.createdAt).getTime())>=a);window.appState.notifications=r;const i=Math.max(0,s-r.length);try{g.emit("notifications:updated",r)}catch{}if(i>0)try{g.emit("snackbar:show",{message:`Notificações antigas removidas: ${i}`,type:"success",duration:2500})}catch{}return i>0}function At(t,e){e&&e.startsWith("category_")?window.location.hash="#/categories":e&&e.includes("transaction")?window.location.hash="#/transactions":window.location.hash="#/dashboard"}function Nt(t){const e=confirm(t?.message||"Confirmar?");if(e&&t?.onConfirm)try{typeof t.onConfirm=="function"&&t.onConfirm()}catch(a){console.error("Erro no onConfirm",a)}if(e&&t?.onConfirmFn&&typeof t.onConfirmFn=="string")try{const a=window[t.onConfirmFn];typeof a=="function"&&a()}catch{}}async function y(){const t=document.getElementById("app-content");if(!t)return;await $t();const e=window.appState.notifications||[],a=q(),o={new_transaction:"Nova Tx",updated_transaction:"Tx Atualizada",deleted_transaction:"Tx Excluída",category_added:"Cat Criada",category_updated:"Cat Atualizada",category_deleted:"Cat Excluída",test_notification:"Teste"},s=h.map(n=>{const d=a.types.includes(n);return`<button onclick="window.toggleNotificationTypeFilter && window.toggleNotificationTypeFilter('${n}')" class="px-3 py-1 rounded-full text-xs font-medium ${d?"bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}">${o[n]}</button>`}).join(""),r=["all","today","7d","30d"].map(n=>{const d=n==="all"?"Tudo":n==="today"?"Hoje":n==="7d"?"7 dias":"30 dias",c=a.period===n;return`<button onclick="window.setNotificationPeriod && window.setNotificationPeriod('${n}')" class="px-3 py-1 rounded-full text-xs font-medium ${c?"bg-indigo-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}">${d}</button>`}).join(""),i=gt(e,a),f=i.filter(n=>!!n.pinned&&!n.archivedAt),m=i.filter(n=>!n.pinned&&!n.archivedAt),k=i.filter(n=>!!n.archivedAt),A=R(m),F=R(f),N=R(k),b=typeof v=="function"?v():null,O=new Date,W=b&&b.year||window.appState?.selectedYear||O.getFullYear(),Y=b&&b.month||window.appState?.selectedMonth||O.getMonth()+1,J=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][(Y-1)%12]||"",$=i.length,x=i.filter(n=>!n.read&&!n.archivedAt).length,G=$-x,K=i.filter(n=>{const d=n.createdAt?.toDate?n.createdAt.toDate():new Date(n.createdAt),c=new Date;return d.toDateString()===c.toDateString()}).length;window.renderNotificationCard||(window.renderNotificationCard=V);const Q=x>0?`<span class="header-unread-badge inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200" aria-live="polite" aria-atomic="true">${x}</span>`:"",X=x>0?"text-yellow-200":"text-green-200",Z=m.length?D("📬 Inbox",A):`
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📬 Inbox</h2>
              </div>
        <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-4">
                <div class="empty-state">
                  <div class="empty-icon">📬</div>
                  <div class="empty-text">Inbox vazia</div>
                  <div class="empty-description">Você não tem notificações no momento</div>
          <div class="mt-2"><button onclick="window.renderNotifications()" class="u-btn u-btn--primary mobile-btn">🔄 Atualizar</button></div>
                </div>
              </div>
            </div>
          `,tt=f.length?D("📌 Fixadas",F):"",et=k.length?D("🗃️ Arquivadas",N):"";t.innerHTML=`
    <div class="tab-container">
      <div class="tab-header flex items-center justify-between">
        <h2 class="tab-title-highlight flex items-center gap-2">🔔 Notificações ${Q}</h2>
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
                  <p class="text-sm opacity-90">${$} notificações no total</p>
                  <p class="text-xs mt-1 opacity-90">Período: <span class="font-semibold">${J} / ${W}</span></p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${X}">${x}</div>
                  <p class="text-xs opacity-90">${x>0?"📬 Não lidas":"✅ Todas lidas"}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📧</div>
                  <div class="text-2xl md:text-3xl font-bold">${$}</div>
                  <div class="text-sm opacity-90">Total</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📬</div>
                  <div class="text-2xl md:text-3xl font-bold text-yellow-200">${x}</div>
                  <div class="text-sm opacity-90">Não lidas</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">✅</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">${G}</div>
                  <div class="text-sm opacity-90">Lidas</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📅</div>
                  <div class="text-2xl md:text-3xl font-bold">${K}</div>
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
                  </div>
                </div>
                <div class="mt-3 flex flex-col gap-3">
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Tipos:</span>
                    ${s}
                  </div>
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Período:</span>
                    ${r}
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300" title="Atalho: U">
                      <input type="checkbox" ${a.unreadOnly?"checked":""} onchange="window.toggleUnreadOnly && window.toggleUnreadOnly()" />
                      Apenas não lidas <span class="text-xs text-gray-500 dark:text-gray-400">(Atalho: U)</span>
                    </label>
        <button onclick="window.resetNotificationFilters && window.resetNotificationFilters()" class="ml-2 u-btn u-btn--ghost text-xs">♻️ Redefinir filtros</button>
                  </div>
                  <div class="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div class="text-xs text-gray-600 dark:text-gray-300">As preferências de notificações (toasts, retenção e por orçamento/tipo) foram movidas para <strong>Configurações</strong> para manter esta aba focada em consultar notificações.</div>
                    <div class="mt-2"><a href="#/settings" class="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Abrir Configurações</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          ${Z}

          ${tt}
          ${et}

        </div>
      </div>
    </div>
  `,yt();try{rt("#notif-period-indicator")}catch{}try{const n=window.__prevNotifHeaderCount||0,d=(Array.isArray(window.appState?.notifications)?window.appState.notifications.filter(u=>!u.read&&!u.archivedAt).length:0)||0,c=document.querySelector(".header-unread-badge"),l=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;c&&d>0&&d!==n&&!l&&(c.style.transform="scale(1.05)",setTimeout(()=>{try{c.style.transform=""}catch{}},180)),window.__prevNotifHeaderCount=d}catch{}try{window.__notifUIBound||(window.__notifUIBound=!0,window.markAllNotificationsAsRead=async()=>{try{await E()}catch{}},window.deleteAllReadNotifications=async()=>{try{await L()}catch{}},window.archiveAllReadNotifications=async()=>{try{await U()}catch{}},window.markNotificationAsRead=async d=>{try{await M(d)}catch{}},window.__pinNotification=async(d,c)=>{try{await j(d,c)}catch{}},window.__archiveNotification=async(d,c)=>{try{await I(d,c)}catch{}},(async()=>{const{sendTestNotificationToOwner:d,sendTestNotificationToShared:c}=await w(async()=>{const{sendTestNotificationToOwner:l,sendTestNotificationToShared:u}=await import("./NotificationService-zMQk2mrd.js");return{sendTestNotificationToOwner:l,sendTestNotificationToShared:u}},__vite__mapDeps([4,1,2]));window.__sendTestToOwner=async()=>{try{const l=window.appState?.currentBudget?.id||window.appState?.currentBudgetId,u=window.appState?.currentUser?.uid;if(!l||!u)return;await d(l,u)}catch(l){console.warn(l)}},window.__sendTestToShared=async()=>{try{const l=window.appState?.currentBudget?.id||window.appState?.currentBudgetId,u=window.appState?.currentUser?.uid;if(!l||!u)return;await c(l,u)}catch(l){console.warn(l)}}})())}catch{}try{const n=await z(),d=Array.isArray(window.appState?.budgets)?window.appState.budgets:Array.isArray(window.appState?.orçamentos)?window.appState.orçamentos:[],c=document.getElementById("notif-budget-prefs");if(c&&Array.isArray(d)){const l=h;c.innerHTML=d.map(u=>{const at=(n.byBudget||{})[u.id]?.allow||{},it=l.map(S=>{const ot=at[S]!==!1,nt=o[S];return`<label class="inline-flex items-center gap-1 text-xs mr-2"><input type="checkbox" ${ot?"checked":""} onchange="window.__toggleBudgetTypePref && window.__toggleBudgetTypePref('${u.id}','${S}', this.checked)"/>${nt}</label>`}).join("");return`<div class="text-xs text-gray-700 dark:text-gray-300"><div class="font-semibold mb-1">${u.nome||u.name||"Orçamento"}</div><div>${it}</div></div>`}).join("")}}catch{}try{window.__notifPeriodListenerBound||(window.__notifPeriodListenerBound=!0,g.on("period:changed",n=>window.queueMicrotask(()=>{const d=(window.location.hash||"").split("?")[0];if(d==="#/notifications"){try{const c=n?.year||window.getSelectedPeriod&&window.getSelectedPeriod().year,l=n?.month||window.getSelectedPeriod&&window.getSelectedPeriod().month;if(c&&l){const u=`${c}-${String(l).padStart(2,"0")}`,T=new URL(window.location.href);T.hash=`${d}?ym=${u}`,window.history.replaceState(null,"",T.toString())}}catch{}y()}}))),window.__notifUpdatesListenerBound||(window.__notifUpdatesListenerBound=!0,g.on("notifications:updated",()=>{try{(window.location.hash||"").split("?")[0]==="#/notifications"&&y()}catch{}}))}catch{}try{window.__notifHotkeysBound||(window.__notifHotkeysBound=!0,document.addEventListener("keydown",n=>{try{const d=n.target&&(n.target.tagName||"").toLowerCase()||"";if(d==="input"||d==="textarea"||d==="select"||n.target&&n.target.isContentEditable)return;(window.location.hash||"").split("?")[0]==="#/notifications"&&(n.key==="u"||n.key==="U")&&(n.preventDefault(),typeof window.toggleUnreadOnly=="function"&&window.toggleUnreadOnly())}catch{}}))}catch{}}async function $t(){try{const t=window.appState?.currentUser;t?.uid&&await ut(t.uid)}catch(t){console.error("Erro ao carregar notificações:",t)}}function Tt(){E().catch(()=>{})}function St(){L().then(()=>y()).catch(()=>{})}function Ct(t){M(t).then(()=>y()).catch(()=>{})}function Dt(t,e){j(t,e).then(()=>y()).catch(()=>{})}function Rt(t,e){I(t,e).then(()=>y()).catch(()=>{})}function Bt(){U().then(()=>y()).catch(()=>{})}function Et(){return y()}window.renderNotifications||(window.renderNotifications=y);window.toggleNotificationTypeFilter||(window.toggleNotificationTypeFilter=bt);window.setNotificationPeriod||(window.setNotificationPeriod=xt);window.toggleUnreadOnly||(window.toggleUnreadOnly=ht);window.resetNotificationFilters||(window.resetNotificationFilters=vt);window.runNotificationAutoClean||(window.runNotificationAutoClean=_t);window.markAllNotificationsAsRead||(window.markAllNotificationsAsRead=Tt);window.deleteAllReadNotifications||(window.deleteAllReadNotifications=St);window.markNotificationAsRead||(window.markNotificationAsRead=Ct);window.__pinNotification||(window.__pinNotification=Dt);window.__archiveNotification||(window.__archiveNotification=Rt);window.archiveAllReadNotifications||(window.archiveAllReadNotifications=Bt);window.openNotificationTarget||(window.openNotificationTarget=At);window.showConfirmationModal||(window.showConfirmationModal=Nt);window.__toggleBudgetTypePref||(window.__toggleBudgetTypePref=function(t,e){mt(t,e)});export{gt as __applyNotificationFiltersForTest,kt as __clearOldNotificationsWithToastForTest,q as __getNotifFiltersForTest,vt as __resetNotificationFiltersForTest,Et as default,y as renderNotifications};
