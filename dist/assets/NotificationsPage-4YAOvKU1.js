const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/userSettingsRepo-BrgdAs9d.js","assets/main-DP8XlPGe.js","assets/main-D61fcKV5.css","assets/NotificationService-DWYx4luG.js"])))=>i.map(i=>d[i]);
import{h as S,A as V,B as q,C as G,m as Y,D as J,E as W,_ as C,e as b,F as ft}from"./main-DP8XlPGe.js";import{mountPeriodIndicator as ut}from"./PeriodIndicator-D2nDRObn.js";import{getNotificationModal as pt}from"./NotificationModal-VqMZxXFq.js";function yt(t,e){const o=new Date,n={all:null,today:new Date(o.getFullYear(),o.getMonth(),o.getDate()),"7d":new Date(o.getTime()-10080*60*1e3),"30d":new Date(o.getTime()-720*60*60*1e3)}[e?.period||"all"];let r=null,d=null;try{const i=typeof S=="function"?S():null;!n&&i&&i.year&&i.month&&(r=new Date(i.year,i.month-1,1,0,0,0,0),d=new Date(i.year,i.month,0,23,59,59,999))}catch{}return(t||[]).filter(i=>{if(e?.unreadOnly&&i.read||!(!e?.types||e.types.includes(i.type)))return!1;const p=i.createdAt?.toDate?i.createdAt.toDate():i.createdAt?.seconds?new Date(i.createdAt.seconds*1e3):new Date(i.createdAt);return n?p>=n:r&&d?p>=r&&p<=d:!0})}function mt(t){const e={};return(t||[]).forEach(o=>{const r=(o.createdAt?.toDate?o.createdAt.toDate():new Date(o.createdAt)).toDateString();e[r]||(e[r]=[]),e[r].push(o)}),Object.keys(e).sort((o,n)=>new Date(n)-new Date(o)).map(o=>({label:o,items:e[o]}))}function K(t){const e=t.type==="deleted_transaction"?"bg-red-100 dark:bg-red-900":t.type==="updated_transaction"?"bg-yellow-100 dark:bg-yellow-900":t.type&&t.type.startsWith("category_")?"bg-purple-100 dark:bg-purple-900":t.type==="test_notification"?"bg-emerald-100 dark:bg-emerald-900":"bg-blue-100 dark:bg-blue-900",o=t.type==="deleted_transaction"?"🗑️":t.type==="updated_transaction"?"✏️":t.type&&t.type.startsWith("category_")?"📂":t.type==="test_notification"?"📣":"💰",n=t.type==="deleted_transaction"&&"Transação Excluída"||t.type==="updated_transaction"&&"Transação Atualizada"||t.type==="new_transaction"&&"Nova Transação"||t.type==="category_added"&&"Categoria Criada"||t.type==="category_updated"&&"Categoria Atualizada"||t.type==="category_deleted"&&"Categoria Excluída"||t.type==="test_notification"&&"Notificação de Teste"||"Notificação",r=t.createdAt?.toDate?t.createdAt.toDate().toLocaleString("pt-BR"):"Data não disponível",d=m=>{if(typeof m!="number")return m??"-";try{return m.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}catch{return String(m)}},i=t.changes||{},p=Object.keys(i).length>0?`
    <div class="mt-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <div class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Alterações</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        ${i.descricao?`<li>✏️ Descrição: <span class="line-through opacity-60">${i.descricao.from||"-"}</span> → <span class="font-medium">${i.descricao.to||"-"}</span></li>`:""}
        ${i.valor?`<li>💵 Valor: <span class="line-through opacity-60">${d(i.valor.from)}</span> → <span class="font-medium">${d(i.valor.to)}</span></li>`:""}
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
        ${i.limite?`<li>📏 Limite: <span class="line-through opacity-60">${d(i.limite.from)}</span> → <span class="font-medium">${d(i.limite.to)}</span></li>`:""}
      </ul>
    </div>
  `:"",h=t.type==="new_transaction"||t.type==="deleted_transaction"||t.type==="updated_transaction"?`
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
            <div class="w-12 h-12 rounded-full ${e} flex items-center justify-center text-xl">${o}</div>
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
            <span class="text-sm text-gray-500 dark:text-gray-400">${r}</span>
          </div>
          ${h}
          ${t.type==="updated_transaction"?p:""}
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
          })" class="flex-1 btn btn-primary btn-sm flex items-center justify-center gap-2">✅ Marcar como lida</button>
          `}
          <button onclick="window.__pinNotification && window.__pinNotification('${t.id}', ${!t.pinned})" class="flex-1 btn ${t.pinned?"btn-danger":"btn-outline"} btn-sm flex items-center justify-center gap-2">${t.pinned?"📌 Desfixar":"📍 Fixar"}</button>
          <button onclick="window.__archiveNotification && window.__archiveNotification('${t.id}', ${!t.archivedAt})" class="flex-1 btn btn-outline btn-sm flex items-center justify-center gap-2">${t.archivedAt?"📂 Restaurar":"🗃️ Arquivar"}</button>
          <button onclick="window.openNotificationTarget && window.openNotificationTarget('${t.id}','${t.type||""}')" class="flex-1 btn btn-outline btn-sm flex items-center justify-center gap-2">🔗 Ver no app</button>
        </div>
      </div>
    </div>
  `}function U(t,e){return`
    <div class="mb-12">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">${t}</h2>
      </div>
      <div class="space-y-6">
        ${e.map(o=>`
          <div>
            <div class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">${o.label}</div>
            <div class="space-y-4">${o.items.map(K).join("")}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `}const j="notif_filters_v1",x=["new_transaction","updated_transaction","deleted_transaction","category_added","category_updated","category_deleted","test_notification"],wt=typeof window.renderFAB=="function"?window.renderFAB:()=>{};function _(){if(console.log("[NotificationsPage] 🔧 Obtendo filtros de notificação..."),typeof window.getNotifFilters=="function")return console.log("[NotificationsPage] 🔧 Usando função global getNotifFilters"),window.getNotifFilters();try{const e=localStorage.getItem(j);if(console.log("[NotificationsPage] 🔧 Dados do localStorage:",e?"Encontrados":"Não encontrados"),e){const o=JSON.parse(e),n={types:Array.isArray(o.types)&&o.types.length?o.types:x.slice(),period:o.period||"all",unreadOnly:o.unreadOnly!==void 0?!!o.unreadOnly:!0};return console.log("[NotificationsPage] 🔧 Filtros carregados do localStorage:",n),n}}catch(e){console.warn("[NotificationsPage] ⚠️ Erro ao carregar filtros do localStorage:",e)}const t={types:x.slice(),period:"all",unreadOnly:!0};return console.log("[NotificationsPage] 🔧 Usando filtros padrão:",t),t}function bt(t,e){return typeof window.applyNotificationFilters=="function"?window.applyNotificationFilters(t,e):yt(t,e)}function E(t){return typeof window.groupNotificationsByDay=="function"?window.groupNotificationsByDay(t):mt(t)}async function Q(){try{const t=window.appState?.currentUser?.uid;if(!t)return{};const{getByUser:e}=await C(async()=>{const{getByUser:n}=await import("./userSettingsRepo-BrgdAs9d.js");return{getByUser:n}},__vite__mapDeps([0,1,2]));return(await e(t))?.notificationPrefs||{}}catch{return{}}}async function xt(t){try{const e=window.appState?.currentUser?.uid;if(!e)return!1;const{setNotificationPrefs:o}=await C(async()=>{const{setNotificationPrefs:n}=await import("./userSettingsRepo-BrgdAs9d.js");return{setNotificationPrefs:n}},__vite__mapDeps([0,1,2]));return await o(e,t||{}),!0}catch{return!1}}async function vt(t,e){try{const o=await Q(),n=o.byBudget||{},r=n[t]||{allow:{}},d={...r.allow||{}};d[e]=d[e]===!1,n[t]={...r,allow:d};const i={...o,byBudget:n};await xt(i);try{b.emit("snackbar:show",{message:"Preferência salva",type:"success",duration:2e3})}catch{}}catch{}}let c=null,k=!1,T=null;function L(){return c||(c=window.__notifFilters||_()),c}function v(){console.log("[NotificationsPage] 💾 Salvando estado dos filtros...");try{c||(c=_()),c||(console.warn("[NotificationsPage] ⚠️ notifFilters ainda é null, usando filtros padrão"),c={types:x.slice(),period:"all",unreadOnly:!0}),window.__notifFilters=c;const t={types:Array.isArray(c.types)?c.types:[],period:c.period||"all",unreadOnly:!!c.unreadOnly};localStorage.setItem(j,JSON.stringify(t)),console.log("[NotificationsPage] ✅ Filtros salvos no localStorage:",t)}catch(t){console.error("[NotificationsPage] ❌ Erro ao salvar filtros:",t)}}function ht(t){c=L();const e=new Set(c.types||[]);e.has(t)?e.delete(t):e.add(t),c.types=Array.from(e),v(),u(!0)}function Nt(t){c=L(),c.period=t,v(),u(!0)}function kt(){console.log("[NotificationsPage] 🔄 Toggle unreadOnly chamado"),c=L(),console.log("[NotificationsPage] 🔄 Valor atual de unreadOnly:",c.unreadOnly),c.unreadOnly=!c.unreadOnly,console.log("[NotificationsPage] 🔄 Novo valor de unreadOnly:",c.unreadOnly),v(),u(!0)}function _t(){c={types:x.slice(),period:"all",unreadOnly:!0},v();try{b.emit("snackbar:show",{message:"Filtros redefinidos para padrão",type:"success",duration:2e3})}catch{}u(!0)}function At(){try{const t=$t();return u(!0),t}catch(t){console.warn("Auto clean falhou",t)}}function $t(t){let e=30;try{if(typeof t=="number"&&Number.isFinite(t))e=t;else{const y=parseInt(localStorage.getItem("notif_retention_days")||"30",10);Number.isFinite(y)&&(e=y)}}catch{}if(!e||e<=0){try{b.emit("snackbar:show",{message:"Retenção desativada",type:"info",duration:2e3})}catch{}return!1}const o=Date.now()-e*24*60*60*1e3,n=Array.isArray(window.appState?.notifications)?window.appState.notifications:[],r=n.length,d=n.filter(y=>(y.createdAt?.toDate?y.createdAt.toDate().getTime():new Date(y.createdAt).getTime())>=o);window.appState.notifications=d;const i=Math.max(0,r-d.length);try{b.emit("notifications:updated",d)}catch{}if(i>0)try{b.emit("snackbar:show",{message:`Notificações antigas removidas: ${i}`,type:"success",duration:2500})}catch{}return i>0}function Pt(t,e){window.location.hash="#/dashboard"}function Tt(t){const e=confirm(t?.message||"Confirmar?");if(e&&t?.onConfirm)try{typeof t.onConfirm=="function"&&t.onConfirm()}catch(o){console.error("Erro no onConfirm",o)}if(e&&t?.onConfirmFn&&typeof t.onConfirmFn=="string")try{const o=window[t.onConfirmFn];typeof o=="function"&&o()}catch{}}async function u(t=!1){if(k&&!t){console.log("[NotificationsPage] ⏳ Renderização já em andamento, ignorando...");return}if(T&&(clearTimeout(T),T=null),!t){T=setTimeout(()=>{u(!0)},100);return}k=!0,console.log("[NotificationsPage] 🚀 Iniciando renderização...");try{const e=document.getElementById("app-content");if(!e){console.error("[NotificationsPage] ❌ Elemento app-content não encontrado!");return}console.log("[NotificationsPage] ✅ Elemento app-content encontrado"),await X(!0);const o=window.appState.notifications||[];console.log("[NotificationsPage] 📧 Notificações carregadas:",o.length),console.log("[NotificationsPage] 📧 Notificações originais:",o.map(a=>({id:a.id,type:a.type,read:a.read,archivedAt:a.archivedAt})));const n=_();console.log("[NotificationsPage] 🔧 Filtros atuais:",n),n.unreadOnly===void 0?(n.unreadOnly=!0,v(),console.log("[NotificationsPage] ✅ Padrão: Configurado para mostrar apenas notificações não lidas")):console.log("[NotificationsPage] ✅ Respeitando escolha do usuário: unreadOnly =",n.unreadOnly);const r=o.filter(a=>!a.read&&!a.archivedAt).length;console.log(`[NotificationsPage] 📊 Renderizando: ${o.length} total, ${r} não lidas`);const d={new_transaction:"Nova Tx",updated_transaction:"Tx Atualizada",deleted_transaction:"Tx Excluída",category_added:"Cat Criada",category_updated:"Cat Atualizada",category_deleted:"Cat Excluída",test_notification:"Teste"},i=x.map(a=>{const s=n.types.includes(a);return`<button onclick="window.toggleNotificationTypeFilter && window.toggleNotificationTypeFilter('${a}')" class="px-3 py-1 rounded-full text-xs font-medium ${s?"bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}">${d[a]}</button>`}).join(""),y=["all","today","7d","30d"].map(a=>{const s=a==="all"?"Tudo":a==="today"?"Hoje":a==="7d"?"7 dias":"30 dias",g=n.period===a;return`<button onclick="window.setNotificationPeriod && window.setNotificationPeriod('${a}')" class="px-3 py-1 rounded-full text-xs font-medium ${g?"bg-indigo-600 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}">${s}</button>`}).join(""),p=bt(o,n);console.log("[NotificationsPage] 🔍 Notificações após filtro:",p.length),console.log("[NotificationsPage] 🔍 Filtros aplicados:",n);const F=p.filter(a=>!a.read&&!a.archivedAt),A=p.filter(a=>a.read&&!a.archivedAt);console.log("[NotificationsPage] 🔍 Notificações não lidas após filtro:",F.length),console.log("[NotificationsPage] 🔍 Notificações lidas após filtro:",A.length);const $=[...F,...A],h=$.filter(a=>!!a.pinned&&!a.archivedAt),m=$.filter(a=>!a.pinned&&!a.archivedAt),D=$.filter(a=>!!a.archivedAt);console.log("[NotificationsPage] 🔍 Pinned:",h.length),console.log("[NotificationsPage] 🔍 Inbox:",m.length),console.log("[NotificationsPage] 🔍 Archived:",D.length);const O=E(m),M=E(h),I=E(D);console.log("[NotificationsPage] 🔍 Grouped Inbox:",O.length),console.log("[NotificationsPage] 🔍 Grouped Pinned:",M.length),console.log("[NotificationsPage] 🔍 Grouped Archived:",I.length);const P=typeof S=="function"?S():null,z=new Date,Z=P&&P.year||window.appState?.selectedYear||z.getFullYear(),tt=P&&P.month||window.appState?.selectedMonth||z.getMonth()+1,et=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][(tt-1)%12]||"",N=p.length,w=p.filter(a=>!a.read&&!a.archivedAt).length,H=N-w,at=p.filter(a=>{const s=a.createdAt?.toDate?a.createdAt.toDate():new Date(a.createdAt),g=new Date;return s.toDateString()===g.toDateString()}).length;window.renderNotificationCard||(window.renderNotificationCard=K);const ot=w>0?`<span class="header-unread-badge inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200" aria-live="polite" aria-atomic="true">${w}</span>`:"",it=w>0?"text-yellow-200":"text-green-200";console.log("[NotificationsPage] 🔍 Renderizando inbox com",m.length,"notificações"),console.log("[NotificationsPage] 🔍 GroupedInbox tem",O.length,"grupos");const nt=m.length?U("📬 Inbox",O):`
            <div class="mb-12">
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
            <button onclick="window.renderNotifications()" class="btn btn-primary btn-sm">🔄 Atualizar</button>
            <button onclick="window.toggleUnreadOnly && window.toggleUnreadOnly()" class="btn btn-outline btn-sm">👁️ Ver todas</button>
          </div>
                </div>
              </div>
            </div>
          `,rt=h.length?U("📌 Fixadas",M):"",st=D.length?U("🗃️ Arquivadas",I):"";e.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">🔔</span>
                </div>
                <div>
                  <h2 class="text-gray-800 dark:text-white font-semibold text-base">Notificações ${ot}</h2>
                  <div class="flex items-center gap-1">
                    <span class="text-orange-600 dark:text-orange-400 text-xs">${r>0?`${r} não lidas`:"Todas lidas"}</span>
                  </div>
                </div>
              </div>
            </div>
        <div id="notif-period-indicator"></div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">

          <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔔 Resumo</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
              <!-- Header Compacto -->
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span class="text-xl">🔔</span>
                    Centro de Notificações
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">${N} notificações • ${et}/${Z}</p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold ${it}">${w}</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${w>0?"Não lidas":"Todas lidas"}</p>
                </div>
              </div>
              
              <!-- Métricas Compactas -->
              <div class="grid grid-cols-4 gap-3 mb-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">📧</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">${N}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">📬</div>
                  <div class="text-lg font-bold text-orange-600 dark:text-orange-400">${w}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Não lidas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">✅</div>
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">${H}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Lidas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">📅</div>
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${at}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Hoje</div>
                </div>
              </div>

              <!-- Resumo de Status Compacto -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <span>📊</span>
                  Status das Notificações
                </h5>
                <div class="space-y-1">
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-600 dark:text-gray-400">Total:</span>
                    <span class="font-medium text-gray-800 dark:text-gray-200">${N}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-600 dark:text-gray-400">Não lidas:</span>
                    <span class="font-medium text-orange-600 dark:text-orange-400">${w}</span>
                  </div>
                  <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                    <span class="text-gray-600 dark:text-gray-400">Lidas:</span>
                    <span class="font-bold text-green-600 dark:text-green-400">${H}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Controles</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
              <!-- Header Compacto -->
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span class="text-xl">🔧</span>
                    Gerenciar Notificações
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Ações rápidas e filtros</p>
                  </div>
                <div class="text-right">
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${N}</div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Total</p>
                </div>
              </div>
              
              <!-- Ações Principais -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <button onclick="window.showConfirmationModal({ title: 'Marcar como Lidas', message: 'Deseja marcar todas as notificações como lidas?', confirmText: 'Sim, Marcar', confirmColor: 'bg-blue-500 hover:bg-blue-600', onConfirmFn: 'markAllNotificationsAsRead' })" class="btn btn-primary btn-sm">✅ Marcar lidas</button>
                <button onclick="window.showConfirmationModal({ title: 'Arquivar notificações lidas', message: 'Deseja arquivar todas as notificações lidas? Você poderá restaurá-las depois.', confirmText: 'Sim, Arquivar', confirmColor: 'bg-indigo-500 hover:bg-indigo-600', onConfirmFn: 'archiveAllReadNotifications' })" class="btn btn-outline btn-sm">🗃️ Arquivar</button>
                <button onclick="window.showConfirmationModal({ title: 'Apagar notificações lidas', message: 'Deseja apagar todas as notificações lidas? Esta ação não pode ser desfeita.', confirmText: 'Sim, Apagar', confirmColor: 'bg-red-500 hover:bg-red-600', onConfirmFn: 'deleteAllReadNotifications' })" class="btn btn-danger btn-sm">🗑️ Apagar</button>
                <button onclick="window.renderNotifications()" class="btn btn-outline btn-sm">🔄 Atualizar</button>
              </div>

              <!-- Filtros -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1">
                  <span>🔍</span>
                  Filtros
                </h5>
                <div class="space-y-3">
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-xs text-gray-600 dark:text-gray-400 mr-1">Tipos:</span>
                    ${i}
                  </div>
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-xs text-gray-600 dark:text-gray-400 mr-1">Período:</span>
                    ${y}
                  </div>
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <label class="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400" title="Atalho: U">
                      <input type="checkbox" ${n.unreadOnly?"checked":""} onchange="window.toggleUnreadOnly && window.toggleUnreadOnly()" />
                      Apenas não lidas
                    </label>
                    <div class="flex gap-2 flex-wrap">
                      <button onclick="window.resetNotificationFilters && window.resetNotificationFilters()" class="btn btn-ghost btn-sm">♻️ Reset</button>
                      <button onclick="window.loadUnreadNotifications && window.loadUnreadNotifications()" class="btn btn-primary btn-sm">📬 Não lidas</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ferramentas de Desenvolvimento (colapsável) -->
              <details class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                <summary class="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-1">
                  <span>🛠️</span>
                  Ferramentas de Desenvolvimento
                </summary>
                <div class="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                  <button onclick="window.__sendTestToOwner && window.__sendTestToOwner()" class="btn btn-outline btn-sm">📣 Teste Dono</button>
                  <button onclick="window.__sendTestToShared && window.__sendTestToShared()" class="btn btn-outline btn-sm">📣 Teste Compartilhados</button>
                  <button onclick="window.__testNotificationModal && window.__testNotificationModal()" class="btn btn-outline btn-sm">📱 Testar Modal</button>
                  <button onclick="window.debugNotificationSystem && window.debugNotificationSystem()" class="btn btn-outline btn-sm">🔍 Debug Sistema</button>
                  <button onclick="window.debugSharedNotificationTest && window.debugSharedNotificationTest()" class="btn btn-outline btn-sm">🧪 Debug Compartilhados</button>
                  <button onclick="window.debugCheckOtherUserNotifications && window.debugCheckOtherUserNotifications()" class="btn btn-outline btn-sm">👥 Ver Outros</button>
                </div>
              </details>

              <!-- Link para Configurações -->
              <div class="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  💡 <strong>Dica:</strong> As preferências de notificações foram movidas para <strong>Configurações</strong> para manter esta aba focada em consultar notificações.
                </div>
                <a href="#/settings" class="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  ⚙️ Abrir Configurações
                </a>
              </div>
            </div>
          </div>

          ${nt}

          ${rt}
          ${st}

        </div>
      </div>
    </div>
  `,wt();try{ut("#notif-period-indicator")}catch{}console.log("[NotificationsPage] ✅ Interface renderizada com sucesso");try{const a=window.__prevNotifHeaderCount||0,s=(Array.isArray(window.appState?.notifications)?window.appState.notifications.filter(f=>!f.read&&!f.archivedAt).length:0)||0,g=document.querySelector(".header-unread-badge"),l=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;g&&s>0&&s!==a&&!l&&(g.style.transform="scale(1.05)",setTimeout(()=>{try{g.style.transform=""}catch{}},180)),window.__prevNotifHeaderCount=s}catch{}try{window.__notifUIBound||(window.__notifUIBound=!0,window.markAllNotificationsAsRead=async()=>{try{await V()}catch{}},window.deleteAllReadNotifications=async()=>{try{await q()}catch{}},window.archiveAllReadNotifications=async()=>{try{await G()}catch{}},window.markNotificationAsRead=async s=>{try{await Y(s)}catch{}},window.__pinNotification=async(s,g)=>{try{await J(s,g)}catch{}},window.__archiveNotification=async(s,g)=>{try{await W(s,g)}catch{}},(async()=>{const{sendTestNotificationToOwner:s,sendTestNotificationToShared:g}=await C(async()=>{const{sendTestNotificationToOwner:l,sendTestNotificationToShared:f}=await import("./NotificationService-DWYx4luG.js");return{sendTestNotificationToOwner:l,sendTestNotificationToShared:f}},__vite__mapDeps([3,1,2]));window.__sendTestToOwner=async()=>{try{const l=window.appState?.currentBudget?.id||window.appState?.currentBudgetId,f=window.appState?.currentUser?.uid;if(!l||!f)return;await s(l,f)}catch(l){console.warn(l)}},window.__sendTestToShared=async()=>{try{const l=window.appState?.currentBudget?.id||window.appState?.currentBudgetId,f=window.appState?.currentUser?.uid;if(!l||!f)return;await g(l,f)}catch(l){console.warn(l)}},window.__testNotificationModal=()=>{try{const l=pt(),f={id:"test-modal-"+Date.now(),type:"test_notification",message:"Esta é uma notificação de teste para demonstrar o modal!",details:"O modal aparece automaticamente quando novas notificações chegam.",read:!1,createdAt:{toDate:()=>new Date}};l.show(f),console.log("[NotificationsPage] 📱 Modal de teste exibido")}catch(l){console.error("[NotificationsPage] ❌ Erro ao testar modal:",l)}}})())}catch{}try{const a=await Q(),s=Array.isArray(window.appState?.budgets)?window.appState.budgets:Array.isArray(window.appState?.orçamentos)?window.appState.orçamentos:[],g=document.getElementById("notif-budget-prefs");if(g&&Array.isArray(s)){const l=x;g.innerHTML=s.map(f=>{const dt=(a.byBudget||{})[f.id]?.allow||{},ct=l.map(B=>{const lt=dt[B]!==!1,gt=d[B];return`<label class="inline-flex items-center gap-1 text-xs mr-2"><input type="checkbox" ${lt?"checked":""} onchange="window.__toggleBudgetTypePref && window.__toggleBudgetTypePref('${f.id}','${B}', this.checked)"/>${gt}</label>`}).join("");return`<div class="text-xs text-gray-700 dark:text-gray-300"><div class="font-semibold mb-1">${f.nome||f.name||"Orçamento"}</div><div>${ct}</div></div>`}).join("")}}catch{}try{window.__notifPeriodListenerBound||(window.__notifPeriodListenerBound=!0,b.on("period:changed",a=>window.queueMicrotask(()=>{const s=(window.location.hash||"").split("?")[0];if(s==="#/notifications"){try{const g=a?.year||window.getSelectedPeriod&&window.getSelectedPeriod().year,l=a?.month||window.getSelectedPeriod&&window.getSelectedPeriod().month;if(g&&l){const f=`${g}-${String(l).padStart(2,"0")}`,R=new URL(window.location.href);R.hash=`${s}?ym=${f}`,window.history.replaceState(null,"",R.toString())}}catch{}u()}}))),window.__notifUpdatesListenerBound||(window.__notifUpdatesListenerBound=!0,b.on("notifications:updated",()=>{try{(window.location.hash||"").split("?")[0]==="#/notifications"&&!k?(console.log("[NotificationsPage] 📡 Evento notifications:updated recebido, renderizando..."),u()):k&&console.log("[NotificationsPage] ⏳ Ignorando evento notifications:updated - renderização em andamento")}catch{}}))}catch{}try{window.__notifHotkeysBound||(window.__notifHotkeysBound=!0,document.addEventListener("keydown",a=>{try{const s=a.target&&(a.target.tagName||"").toLowerCase()||"";if(s==="input"||s==="textarea"||s==="select"||a.target&&a.target.isContentEditable)return;(window.location.hash||"").split("?")[0]==="#/notifications"&&(a.key==="u"||a.key==="U")&&(a.preventDefault(),typeof window.toggleUnreadOnly=="function"&&window.toggleUnreadOnly())}catch{}}))}catch{}}finally{k=!1,console.log("[NotificationsPage] ✅ Renderização finalizada")}}async function X(t=!1){console.log("[NotificationsPage] 🔄 Iniciando carregamento de notificações...");try{const e=window.appState?.currentUser;if(console.log("[NotificationsPage] 👤 Usuário atual:",e?.uid?"Logado":"Não logado"),e?.uid){console.log("[NotificationsPage] 🔗 Iniciando listener de notificações..."),await ft(e.uid);const o=window.appState?.notifications||[],n=o.filter(r=>!r.read&&!r.archivedAt).length;if(console.log(`[NotificationsPage] ✅ Carregadas ${o.length} notificações, ${n} não lidas`),t)console.log("[NotificationsPage] ⏭️ Pulando emissão de evento para evitar loop");else try{b.emit("notifications:updated",o),console.log("[NotificationsPage] 📡 Evento notifications:updated emitido")}catch(r){console.warn("[NotificationsPage] ⚠️ Erro ao emitir evento:",r)}}else console.warn("[NotificationsPage] ⚠️ Usuário não logado, não é possível carregar notificações")}catch(e){console.error("[NotificationsPage] ❌ Erro ao carregar notificações:",e)}}function St(){V().catch(()=>{})}function Ct(){q().then(()=>u(!0)).catch(()=>{})}function Ft(t){Y(t).then(()=>u(!0)).catch(()=>{})}function Dt(t,e){J(t,e).then(()=>u(!0)).catch(()=>{})}function Ot(t,e){W(t,e).then(()=>u(!0)).catch(()=>{})}function Rt(){G().then(()=>u(!0)).catch(()=>{})}async function Bt(){try{console.log("[NotificationsPage] Forçando carregamento de notificações não lidas..."),await X(!0);const t=_();t.unreadOnly=!0,v(),await u(!0),console.log("[NotificationsPage] Notificações não lidas carregadas com sucesso")}catch(t){console.error("[NotificationsPage] Erro ao carregar notificações não lidas:",t)}}async function Mt(){return await u()}window.renderNotifications||(window.renderNotifications=u);window.toggleNotificationTypeFilter||(window.toggleNotificationTypeFilter=ht);window.setNotificationPeriod||(window.setNotificationPeriod=Nt);window.toggleUnreadOnly||(window.toggleUnreadOnly=kt);window.resetNotificationFilters||(window.resetNotificationFilters=_t);window.runNotificationAutoClean||(window.runNotificationAutoClean=At);window.markAllNotificationsAsRead||(window.markAllNotificationsAsRead=St);window.deleteAllReadNotifications||(window.deleteAllReadNotifications=Ct);window.markNotificationAsRead||(window.markNotificationAsRead=Ft);window.__pinNotification||(window.__pinNotification=Dt);window.__archiveNotification||(window.__archiveNotification=Ot);window.archiveAllReadNotifications||(window.archiveAllReadNotifications=Rt);window.openNotificationTarget||(window.openNotificationTarget=Pt);window.showConfirmationModal||(window.showConfirmationModal=Tt);window.__toggleBudgetTypePref||(window.__toggleBudgetTypePref=function(t,e){vt(t,e)});window.loadUnreadNotifications||(window.loadUnreadNotifications=Bt);window.testNotificationsPage=async function(){console.log("[NotificationsPage] 🧪 Iniciando teste...");const t=window.appState?.currentUser;console.log("[NotificationsPage] 🧪 Usuário:",t?.uid?"Logado":"Não logado");const e=window.appState?.notifications||[];console.log("[NotificationsPage] 🧪 Notificações no estado:",e.length);const o=_();console.log("[NotificationsPage] 🧪 Filtros atuais:",o);const n=localStorage.getItem(j);console.log("[NotificationsPage] 🧪 localStorage:",n);try{console.log("[NotificationsPage] 🧪 Testando acesso direto ao Firebase...");const{listByRecipient:r}=await C(async()=>{const{listByRecipient:i}=await import("./main-DP8XlPGe.js").then(y=>y.a4);return{listByRecipient:i}},__vite__mapDeps([1,2])),d=await r(t?.uid);console.log("[NotificationsPage] 🧪 Notificações diretas do Firebase:",d.length),d.length>0&&console.log("[NotificationsPage] 🧪 Primeira notificação:",d[0])}catch(r){console.log("[NotificationsPage] 🧪 Erro ao acessar Firebase:",r)}try{await u(!0),console.log("[NotificationsPage] 🧪 ✅ Renderização bem-sucedida")}catch(r){console.error("[NotificationsPage] 🧪 ❌ Erro na renderização:",r)}};export{bt as __applyNotificationFiltersForTest,$t as __clearOldNotificationsWithToastForTest,_ as __getNotifFiltersForTest,_t as __resetNotificationFiltersForTest,Mt as default,Bt as loadUnreadNotifications,u as renderNotifications};
