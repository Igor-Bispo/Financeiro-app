const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-BVWxnpqW.js","assets/main-DLXVHLmp.css","assets/NotificationService-zMQk2mrd.js","assets/firestore-G2YhUf_7.js","assets/snackbarPrefs-BEdSEys5.js"])))=>i.map(i=>d[i]);
import{_ as z,q as T,f as E,a as I,h as B,j as D,k as L,c as V,d as O,b as j,u as U,m as F,n as H}from"./main-BVWxnpqW.js";import{corrigirCategoriasSemBudget as W,corrigirTransacoesSemBudget as Y,corrigirRecorrentesSemBudget as G,corrigirTudoSemBudget as J}from"./fixers-kxFX_Tof.js";try{if(typeof window<"u"&&!window.__enterBudgetDelegated){window.__enterBudgetDelegated=!0;try{console.log("[Settings] Delegated handlers for .enter-budget-button bound (top-level)")}catch{}document.addEventListener("click",t=>{try{const e=t.target,o=e&&(e.closest?e.closest(".enter-budget-button"):null);if(o){t.preventDefault();const n=o.getAttribute("data-budget-id")||o.getAttribute("data-id"),i=o.getAttribute("data-budget-name")||void 0;try{console.log("[Settings] Click .enter-budget-button (top-level)",{id:n,name:i})}catch{}n&&typeof window.enterBudget=="function"&&window.enterBudget(n,i)}}catch{}},!0),document.addEventListener("keydown",t=>{try{const e=t.target;if(!e)return;const o=e.classList&&e.classList.contains("enter-budget-button"),n=e.classList&&e.classList.contains("budget-item")&&e.getAttribute("data-enter-id");if((o||n)&&(t.key==="Enter"||t.key===" ")){t.preventDefault();try{console.log("[Settings] Key activate",{isBtn:o,isCard:n})}catch{}if(n){const i=e.getAttribute("data-enter-id"),r=e.getAttribute("data-enter-name");i&&typeof window.enterBudget=="function"&&window.enterBudget(i,r)}else e.click()}}catch{}},!0)}}catch{}function Q(t){return!t&&t!==0?"pending":String(t).trim().toLowerCase()}function R(t){const e=Q(t);return["accepted","declined","rejected","recusado","aceito","cancelled","canceled","cancelado"].includes(e)}typeof window<"u"&&(typeof window.loadBudgetInvitations!="function"&&(window.loadBudgetInvitations=async function(){try{const t=window.appState?.currentUser;if(!t)return[];const e=T(E(I,"budgetInvitations"),B("invitedUserId","==",t.uid)),o=T(E(I,"budgetInvitations"),B("invitedUserEmailLower","==",(t.email||"").toLowerCase())),n=T(E(I,"budgetInvitations"),B("invitedUserEmail","==",t.email||"")),[i,r,l]=await Promise.all([D(e),D(o),D(n)]),w=(g=>{const b=new Map;for(const c of g)for(const S of c)b.has(S.id)||b.set(S.id,S);return Array.from(b.values())})([i.docs,r.docs,l.docs]),k=[];for(const g of w){const b=g.data();R(b.status)||k.push({id:g.id,...b})}return k.sort((g,b)=>{const c=g.createdAt?g.createdAt.toDate?g.createdAt.toDate():g.createdAt.seconds?new Date(g.createdAt.seconds*1e3):new Date(g.createdAt):new Date(0);return(b.createdAt?b.createdAt.toDate?b.createdAt.toDate():b.createdAt.seconds?new Date(b.createdAt.seconds*1e3):new Date(b.createdAt):new Date(0))-c}),k}catch(t){return console.error("Erro ao carregar convites (shim):",t),[]}}),typeof window.loadSentBudgetInvitations!="function"&&(window.loadSentBudgetInvitations=async function(){try{const t=window.appState?.currentUser;if(!t)return[];const e=T(E(I,"budgetInvitations"),B("invitedByUserId","==",t.uid)),o=await D(e),n=[];for(const i of o.docs){const r=i.data();R(r.status)||n.push({id:i.id,...r})}return n.sort((i,r)=>{const l=i.createdAt?i.createdAt.toDate?i.createdAt.toDate():i.createdAt.seconds?new Date(i.createdAt.seconds*1e3):new Date(i.createdAt):new Date(0);return(r.createdAt?r.createdAt.toDate?r.createdAt.toDate():r.createdAt.seconds?new Date(r.createdAt.seconds*1e3):new Date(r.createdAt):new Date(0))-l}),n}catch(t){return console.error("Erro ao carregar convites enviados (shim):",t),[]}}));typeof window<"u"&&(typeof window.inviteUserToBudget!="function"&&(window.inviteUserToBudget=async function(t){try{const e=document.getElementById("share-email")||document.getElementById("user-email"),o=t&&t.trim()||(e?String(e.value).trim():""),n=o?o.toLowerCase():"",i=document.getElementById("share-budget-select"),r=i&&i.value?i.value:null,l=(typeof window<"u"?window.appState?.currentBudget:null)||null,u=typeof window<"u"?window.appState?.budgets||[]:[],w=r?u.find(C=>C.id===r)||(l&&l.id===r?l:null):l;if(!o||!w){window.Snackbar?.({message:o?"Selecione um orçamento":"Digite um email válido",type:"error"});return}const k=T(E(I,"users"),B("email","==",o)),g=await D(k),b=g.empty?null:g.docs[0],c=b?b.id:null,S=window.appState?.currentUser;if(c===S?.uid||n===(S?.email||"").toLowerCase()){window.Snackbar?.({message:"Você já tem acesso a este orçamento",type:"info"});return}if(c&&Array.isArray(w.usuariosPermitidos)&&w.usuariosPermitidos.includes(c)){window.Snackbar?.({message:"Usuário já é membro deste orçamento",type:"info"});return}const y=C=>{const M=String(C??"").toLowerCase();return["accepted","declined","rejected","recusado","aceito","cancelled","canceled","cancelado"].includes(M)};let A=!1;if(c){const C=T(E(I,"budgetInvitations"),B("budgetId","==",w.id),B("invitedUserId","==",c));A=(await D(C)).docs.some(a=>!y(a.data().status))}if(!A){const C=T(E(I,"budgetInvitations"),B("invitedUserEmailLower","==",n));A=(await D(C)).docs.some(a=>a.data().budgetId===w.id&&!y(a.data().status))}if(!A){const C=T(E(I,"budgetInvitations"),B("invitedUserEmail","==",o));A=(await D(C)).docs.some(a=>a.data().budgetId===w.id&&!y(a.data().status))}if(A){window.Snackbar?.({message:"Convite já enviado para este usuário",type:"info"});return}const _={budgetId:w.id,budgetName:w.nome||"Orçamento",invitedUserId:c,invitedUserEmail:o,invitedUserEmailLower:n,invitedByUserId:S?.uid||null,invitedByUserEmail:S?.email||null,status:"pending",createdAt:L(),updatedAt:L()};await V(E(I,"budgetInvitations"),_),window.Snackbar?.({message:"✅ Convite enviado com sucesso! Aguardando aceitação.",type:"success"})}catch(e){console.error("Erro ao enviar convite (shim):",e),window.Snackbar?.({message:"Erro ao enviar convite: "+(e?.message||"tente novamente"),type:"error"})}}),typeof window.corrigirCategoriasSemBudget!="function"&&(window.corrigirCategoriasSemBudget=()=>W()),typeof window.corrigirTransacoesSemBudget!="function"&&(window.corrigirTransacoesSemBudget=()=>Y()),typeof window.corrigirRecorrentesSemBudget!="function"&&(window.corrigirRecorrentesSemBudget=()=>G()),typeof window.corrigirTudoSemBudget!="function"&&(window.corrigirTudoSemBudget=()=>J()),typeof window.__appLogout!="function"&&(window.__appLogout=async function(){try{const t=await z(()=>import("./main-BVWxnpqW.js").then(e=>e.R),__vite__mapDeps([0,1]));t&&typeof t.logout=="function"?await t.logout():typeof window.logout=="function"&&await window.logout();try{const{default:e}=await z(async()=>{const{default:n}=await import("./perf-tobPnqr4.js");return{default:n}},[]),o=window.appState?.currentUser||null;e.track("auth:logout",{uid:o?.uid||null,email:o?.email||null});try{localStorage.setItem("lastLogoutAt",String(Date.now()))}catch{}}catch{}try{window.eventBus&&window.eventBus.emit&&window.eventBus.emit("auth:logout",{ts:Date.now()})}catch{}try{window.toggleLoginPage&&window.toggleLoginPage(!0)}catch{}try{window.Snackbar&&window.Snackbar({message:"Você saiu da sua conta.",type:"info"})}catch{}}catch(t){console.error("Erro no logout:",t);try{window.Snackbar&&window.Snackbar({message:"Erro ao sair. Tente novamente.",type:"error"})}catch{}}}),typeof window.handleLogoutClick!="function"&&(window.handleLogoutClick=async function(){const t=async()=>{await window.__appLogout()};try{if(typeof window.showConfirmationModal=="function")return window.showConfirmationModal({title:"Sair da conta",message:"Tem certeza que deseja sair da conta? Você poderá entrar com outra conta em seguida.",confirmText:"Sair",confirmType:"danger",onConfirm:t})}catch{}return typeof window.confirm=="function"?window.confirm("Tem certeza que deseja sair da conta?")?t():void 0:t()}),typeof window.acceptBudgetInvitation!="function"&&(window.acceptBudgetInvitation=async function(t){try{const e=window.appState?.currentUser;if(!e)throw new Error("Usuário não autenticado");const o=O(I,"budgetInvitations",t),n=await j(o);if(!n.exists()){window.Snackbar?.({message:"Convite não encontrado",type:"error"});return}const i=n.data(),r=(e.email||"").toLowerCase();if(!(i.invitedUserId===e.uid||(i.invitedUserEmail||"").toLowerCase()===r||i.invitedUserEmailLower===r)){window.Snackbar?.({message:"Este convite não é para você",type:"error"});return}const u=O(I,"budgets",i.budgetId);if(!(await j(u)).exists()){window.Snackbar?.({message:"Orçamento não encontrado",type:"error"});return}if(!i.invitedUserId)try{await U(o,{invitedUserId:e.uid,updatedAt:L()})}catch{}await U(u,{usuariosPermitidos:F(e.uid),updatedAt:L()});try{await U(o,{status:"accepted",acceptedAt:L(),updatedAt:L()})}catch{}if(window.Snackbar?.({message:"✅ Convite aceito! Você agora tem acesso ao orçamento.",type:"success"}),typeof window.loadBudgets=="function")await window.loadBudgets();else try{const{loadUserBudgets:k}=await z(async()=>{const{loadUserBudgets:g}=await import("./main-BVWxnpqW.js").then(b=>b.T);return{loadUserBudgets:g}},__vite__mapDeps([0,1]));await k(e.uid)}catch{}typeof window.renderSettings=="function"&&await window.renderSettings()}catch(e){console.error("Erro ao aceitar convite (shim):",e),window.Snackbar?.({message:"Erro ao aceitar convite: "+e.message,type:"error"})}}),typeof window.declineBudgetInvitation!="function"&&(window.declineBudgetInvitation=async function(t){try{const e=window.appState?.currentUser;if(!e)throw new Error("Usuário não autenticado");const o=O(I,"budgetInvitations",t),n=await j(o);if(!n.exists()){window.Snackbar?.({message:"Convite não encontrado",type:"error"});return}const i=n.data(),r=(e.email||"").toLowerCase();if(!(i.invitedUserId===e.uid||(i.invitedUserEmail||"").toLowerCase()===r||i.invitedUserEmailLower===r)){window.Snackbar?.({message:"Este convite não é para você",type:"error"});return}if(R(i.status)){window.Snackbar?.({message:"Este convite já foi finalizado",type:"info"});return}await U(o,{status:"declined",declinedAt:L(),updatedAt:L()}),window.Snackbar?.({message:"Convite recusado",type:"info"}),typeof window.renderSettings=="function"&&await window.renderSettings()}catch(e){console.error("Erro ao recusar convite (shim):",e),window.Snackbar?.({message:"Erro ao recusar convite: "+e.message,type:"error"})}}),typeof window.acceptAndEnterInvitation!="function"&&(window.acceptAndEnterInvitation=async function(t,e,o){try{await window.acceptBudgetInvitation(t);const n=window.appState?.currentUser;if(!n)return;const i=async()=>{const l=(window.appState?.budgets||[]).find(u=>u.id===e);return l&&typeof window.setCurrentBudget=="function"?(await window.setCurrentBudget(l),window.Snackbar?.({message:`Entrou em "${o||l.nome||"Orçamento"}"`,type:"success"}),typeof window.renderSettings=="function"&&await window.renderSettings(),!0):!1};if(!await i()){try{const{loadUserBudgets:r}=await z(async()=>{const{loadUserBudgets:l}=await import("./main-BVWxnpqW.js").then(u=>u.T);return{loadUserBudgets:l}},__vite__mapDeps([0,1]));await r(n.uid)}catch{}await i()}}catch(n){console.error("Erro ao aceitar e entrar (shim):",n),window.Snackbar?.({message:"Erro ao aceitar e entrar no orçamento",type:"error"})}}));try{if(typeof window<"u"){if(typeof window.checkForUpdates!="function"&&(window.checkForUpdates=async function(){try{const t=(r,l="info")=>{try{window.Snackbar?.({message:r,type:l})}catch{}};if(t("Procurando atualizações…","info"),!("serviceWorker"in navigator)){t("Service Worker indisponível","warning");return}const e=await navigator.serviceWorker.getRegistration();if(!e){t("Registro do Service Worker não encontrado","warning");return}let o=!1;const n=()=>{if(!o){o=!0;try{window.location.reload()}catch{}}};navigator.serviceWorker.addEventListener("controllerchange",n,{once:!0});try{await e.update()}catch{}const i=r=>new Promise(l=>{if(!r)return l(!1);const u=()=>{if(r.state==="installed"){try{e.waiting?.postMessage({type:"SKIP_WAITING"})}catch{}t("Atualização encontrada. Aplicando…","info"),setTimeout(n,4e3),l(!0)}};r.addEventListener("statechange",u),r.state==="installed"&&u(),setTimeout(()=>l(!1),5e3)});if(e.waiting){try{e.waiting.postMessage({type:"SKIP_WAITING"})}catch{}t("Atualização encontrada. Aplicando…","info"),setTimeout(n,4e3)}else if(!await i(e.installing)&&!await new Promise(w=>{let k=!1;const g=async()=>{k||(k=!0,e.removeEventListener("updatefound",g),await i(e.installing),w(!0))};e.addEventListener("updatefound",g),setTimeout(()=>{k||(e.removeEventListener("updatefound",g),w(!1))},3e3)})){try{e.active?.postMessage?.({type:"UPDATE_CONTENT"})}catch{}t("Atualizando conteúdo…","info"),setTimeout(n,500)}try{const r=Date.now();localStorage?.setItem?.("sw_last_check",String(r));const l=document.getElementById("sw-last-check");l&&(l.textContent=new Date(r).toLocaleString()),setTimeout(()=>{window.updateSwStatus&&window.updateSwStatus()},10)}catch{}}catch(t){console.warn("checkForUpdates error:",t);try{window.Snackbar?.({message:"Falha ao verificar atualizações",type:"error"})}catch{}}}),typeof window.clearAppCaches!="function"&&(window.clearAppCaches=async function(){try{if(typeof caches<"u"&&caches.keys){const t=await caches.keys();await Promise.all(t.map(e=>caches.delete(e)))}try{navigator.serviceWorker?.controller?.postMessage?.({action:"clearCache"})}catch{}window.Snackbar?.({message:"Cache offline limpo. Recarregue se necessário.",type:"success"})}catch(t){console.warn("clearAppCaches error:",t),window.Snackbar?.({message:"Falha ao limpar cache",type:"error"})}}),typeof window.sendTestNotificationOwner!="function"&&(window.sendTestNotificationOwner=async function(){try{const t=window.appState?.currentBudget?.id,e=window.appState?.currentUser?.uid;if(!t||!e){window.Snackbar?.({message:"Selecione um orçamento e faça login",type:"warning"});return}const o=await z(()=>import("./NotificationService-zMQk2mrd.js"),__vite__mapDeps([2,0,1]));await(o.sendTestNotificationToOwner||o.default?.sendTestNotificationToOwner)?.(t,e)}catch(t){console.warn("sendTestNotificationOwner error:",t),window.Snackbar?.({message:"Falha ao enviar teste (dono)",type:"error"})}}),typeof window.sendTestNotificationShared!="function"&&(window.sendTestNotificationShared=async function(){try{const t=window.appState?.currentBudget?.id,e=window.appState?.currentUser?.uid;if(!t||!e){window.Snackbar?.({message:"Selecione um orçamento e faça login",type:"warning"});return}const o=await z(()=>import("./NotificationService-zMQk2mrd.js"),__vite__mapDeps([2,0,1]));await(o.sendTestNotificationToShared||o.default?.sendTestNotificationToShared)?.(t,e)}catch(t){console.warn("sendTestNotificationShared error:",t),window.Snackbar?.({message:"Falha ao enviar teste (compartilhados)",type:"error"})}}),typeof window.openHelp!="function"&&(window.openHelp=function(){const t=`
          <div class="text-sm space-y-3">
            <p>Precisa de ajuda? Aqui estão alguns atalhos úteis:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Sincronize período via hash: <code>#/dashboard?ym=2025-08</code></li>
              <li>Abra as Notificações: <code>#/notifications</code></li>
              <li>Vá direto para Config > Notificações: <code>#/settings?section=notifications</code></li>
            </ul>
            <p>Se o app parecer desatualizado, use “Verificar Atualizações” ou “Limpar Cache Offline”.</p>
          </div>`;window.showModal?window.showModal(t,{title:"Ajuda e Suporte"}):window.eventBus?window.eventBus.emit("modal:show",{content:t,title:"Ajuda e Suporte"}):alert(`Ajuda e Suporte:
- #/dashboard?ym=2025-08
- #/notifications
- #/settings?section=notifications`)}),typeof window.rateApp!="function"&&(window.rateApp=function(){const t=`
          <div class="text-sm">
            <p class="mb-3">Como está sua experiência com o app?</p>
            <div class="flex gap-2 mb-4" id="rating-stars">
              ${[1,2,3,4,5].map(o=>`<button data-rate="${o}" class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200">${"★".repeat(o)}</button>`).join("")}
            </div>
            <button id="submit-rating" class="px-3 py-2 rounded bg-blue-600 text-white">Enviar avaliação</button>
          </div>`,e=()=>{const o=document.getElementById("rating-stars");let n=5;o?.querySelectorAll("button[data-rate]")?.forEach(i=>{i.addEventListener("click",()=>{n=parseInt(i.dataset.rate||"5",10)})}),document.getElementById("submit-rating")?.addEventListener("click",()=>{window.Snackbar?.({message:`Obrigado pela avaliação de ${n}★`,type:"success"}),window.closeModal&&window.closeModal()})};window.showModal?(window.showModal(t,{title:"Avaliar App",onShow:e}),setTimeout(e,0)):window.eventBus?(window.eventBus.emit("modal:show",{content:t,title:"Avaliar App"}),setTimeout(e,0)):alert("Obrigado por usar o app!")}),typeof window.updateSwStatus!="function"&&(window.updateSwStatus=async function(){try{if(!navigator.serviceWorker?.controller)return;const t=new MessageChannel,e=new Promise(n=>{t.port1.onmessage=i=>n(i.data)});navigator.serviceWorker.controller.postMessage({action:"getCacheStatus"},[t.port2]);const o=await e;if(o){const n=document.getElementById("sw-version-dyn"),i=document.getElementById("sw-cache-static"),r=document.getElementById("sw-cache-dynamic");n&&(n.textContent=String(o.version||"—")),i&&(i.textContent=String(o.static||"—")),r&&(r.textContent=String(o.dynamic||"—"))}}catch{}}),!window.__swMsgBound){window.__swMsgBound=!0;try{navigator.serviceWorker?.addEventListener?.("message",t=>{if(t?.data?.type==="UPDATE_AVAILABLE")try{window.Snackbar&&window.Snackbar({message:"Nova versão disponível. Atualizar agora?",type:"info",actionText:"Atualizar",onAction:()=>{try{window.checkForUpdates&&window.checkForUpdates()}catch{}}})}catch{}})}catch{}}if(typeof window.updateNetworkStatus!="function"){window.updateNetworkStatus=function(){try{const t=document.getElementById("net-status");if(!t)return;const e=navigator.onLine;t.textContent=e?"Online":"Offline",t.style.color=e?"var(--green, #16a34a)":"var(--red, #dc2626)"}catch{}};try{window.addEventListener("online",()=>window.updateNetworkStatus()),window.addEventListener("offline",()=>window.updateNetworkStatus())}catch{}}}}catch{}async function q(){const t=document.getElementById("app-content");try{const a=Date.now();if(typeof window<"u"){if(window.__lastSettingsRender&&a-window.__lastSettingsRender<500){console.log("⏱️ renderSettings: chamada muito próxima, pulando...");return}window.__lastSettingsRender=a}}catch{}if(!t){console.warn("⚠️ SettingsPage: elemento #app-content não encontrado");return}try{if(typeof window<"u"&&!window.__enterBudgetDelegated){window.__enterBudgetDelegated=!0;try{console.log("[Settings] Delegated handlers for .enter-budget-button bound")}catch{}document.addEventListener("click",a=>{try{const d=a.target,s=d&&(d.closest?d.closest(".enter-budget-button"):null);if(s){a.preventDefault();const m=s.getAttribute("data-budget-id")||s.getAttribute("data-id"),p=s.getAttribute("data-budget-name")||void 0;try{console.log("[Settings] Click .enter-budget-button",{id:m,name:p})}catch{}m&&typeof window.enterBudget=="function"&&window.enterBudget(m,p);return}const f=d&&(d.closest?d.closest(".budget-item"):null);if(f&&!f.classList.contains("active")&&!(d.closest&&d.closest(".copy-id-button, .delete-button, .leave-button, .current-budget-badge"))){const p=f.getAttribute("data-enter-id"),h=f.getAttribute("data-enter-name");if(p&&typeof window.enterBudget=="function"){a.preventDefault();try{console.log("[Settings] Click card .budget-item -> enter",{id:p,name:h})}catch{}window.enterBudget(p,h)}}}catch{}},!0),document.addEventListener("keydown",a=>{try{const d=a.target;if(!d)return;if(d.classList&&d.classList.contains("enter-budget-button")&&(a.key==="Enter"||a.key===" ")){a.preventDefault();try{console.log("[Settings] Key activate .enter-budget-button")}catch{}d.click()}}catch{}},!0)}}catch{}const e=window.appState?.currentBudget,o=window.appState?.currentUser,n=window.appState?.budgets||[],i=new Date,l=`${["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][i.getMonth()]} ${i.getFullYear()}`,u="4.2.8",w=(()=>{try{return localStorage.getItem("lastSeenChangelogVersion")!==u}catch{}return!0})(),k=(()=>{try{if(typeof localStorage<"u"){const a=localStorage.getItem("txChunkSize"),d=parseInt(a,10);if(!Number.isNaN(d))return d}}catch{}return""})();let g=!1;try{const a=await z(()=>import("./perf-tobPnqr4.js"),[]);g=a.isEnabled(),typeof window<"u"&&(typeof window.togglePerfTelemetry!="function"&&(window.togglePerfTelemetry=()=>{const d=document.getElementById("perf-telemetry");d&&(a.setEnabled(!!d.checked),window.Snackbar?.({message:d.checked?"Telemetria ativada (local, sem envio)":"Telemetria desativada",type:"info"}))}),typeof window.showPerfLog!="function"&&(window.showPerfLog=()=>{try{const d=a.getLog(),s=`
              <div class="text-sm">
                <div class="mb-2 text-gray-600 dark:text-gray-300">Últimos ${Math.min(d.length,50)} eventos</div>
                <pre class="max-h-[60vh] overflow-auto p-3 bg-gray-100 dark:bg-gray-800 rounded">${d.slice(0,50).map(f=>JSON.stringify(f)).join(`
`)}</pre>
                <div class="flex gap-2 mt-3">
                  <button class="u-btn u-btn--danger" onclick="(function(){import('@core/telemetry/perf.js').then(m=>{m.clear(); window.Snackbar?.({message:'Log limpo',type:'success'});});})()">Limpar</button>
                  <button class="u-btn u-btn--ghost" onclick="window.closeModal && window.closeModal()">Fechar</button>
                </div>
              </div>`;window.showModal?window.showModal(s,{title:"Telemetria de Performance (local)"}):window.eventBus?window.eventBus.emit("modal:show",{content:s,title:"Telemetria de Performance (local)"}):alert(`Eventos de performance:
`+d.map(f=>JSON.stringify(f)).join(`
`))}catch(d){console.warn("showPerfLog error:",d)}}))}catch{}const b=n.find(a=>a.id===e?.id);let c=[];async function S(a){try{let d=a;if(d&&typeof d=="string"&&d.includes("@"))try{const{buscarUidPorEmail:m}=await z(async()=>{const{buscarUidPorEmail:h}=await import("./firestore-G2YhUf_7.js");return{buscarUidPorEmail:h}},__vite__mapDeps([3,0,1])),p=await m(d);p&&(d=p)}catch(m){console.warn("safeGetUserInfo: falha ao resolver email para UID:",m?.message||m)}if(typeof window<"u"&&typeof window.getUserInfo=="function")return await window.getUserInfo(d);const s=await z(()=>import("./NotificationService-zMQk2mrd.js"),__vite__mapDeps([2,0,1])),f=s.getUserInfo||s.default&&s.default.getUserInfo;if(typeof f=="function")return typeof window<"u"&&(window.getUserInfo=f),await f(d);throw new Error("getUserInfo não disponível")}catch(d){return console.warn("safeGetUserInfo: fallback acionado/erro:",d?.message||d),{displayName:"Usuário",email:"email@desconhecido.com"}}}if(b?.usuariosPermitidos&&b.usuariosPermitidos.length>0){const a=Array.from(new Set((b.usuariosPermitidos||[]).filter(Boolean)));c=await Promise.all(a.map(async d=>{try{const s=await S(d);return{uid:s.uid||d,email:s.email||String(d),role:"Usuário Compartilhado"}}catch(s){return console.error("Erro ao buscar informações do usuário:",d,s),{uid:String(d),email:"Usuário não encontrado",role:"Usuário Compartilhado"}}}))}let y=[];if(window.loadBudgetInvitations)try{console.log("🔍 SettingsPage: Carregando convites pendentes..."),y=await window.loadBudgetInvitations(),console.log("📊 SettingsPage: Convites carregados:",y.length)}catch(a){console.error("❌ SettingsPage: Erro ao carregar convites pendentes:",a)}else console.log("❌ SettingsPage: Função loadBudgetInvitations não encontrada");let A=b?.userId||b?.criadoPor||null,_="Não disponível";try{if(A){const a=await S(A),d=o&&o.uid&&A===o.uid,s=a?.email||a?.displayName||String(A);_=d?`Você (${s})`:s}}catch{}let C=[];if(window.loadSentBudgetInvitations)try{console.log("🔍 SettingsPage: Carregando convites enviados..."),C=await window.loadSentBudgetInvitations(),console.log("📊 SettingsPage: Convites enviados carregados:",C.length)}catch(a){console.error("❌ SettingsPage: Erro ao carregar convites enviados:",a)}setTimeout(()=>{if(window.initializeThemeIcon&&window.initializeThemeIcon(),window.initializeColorTheme&&window.initializeColorTheme(),window.initializeCompactMode&&window.initializeCompactMode(),window.handleResize)try{window.__settingsResizeBound||(window.addEventListener("resize",window.handleResize),window.__settingsResizeBound=!0),window.handleResize()}catch(a){console.warn("⚠️ SettingsPage: erro ao vincular handleResize:",a)}},100),t.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
  <h2 class="tab-title-highlight">⚙️ Configurações</h2>
  <div id="settings-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="settings-container">
          <style>
            /* Final guardrail: normalize all text to base size inside settings (titles excluded) */
            .settings-container { font-size: var(--font-size-base); font-family: var(--font-family); }
            .settings-container p,
            .settings-container li,
            .settings-container span,
            .settings-container label,
            .settings-container small,
            .settings-container input,
            .settings-container select,
            .settings-container textarea,
            .settings-container button,
            .settings-container .text-xs,
            .settings-container .text-sm,
            .settings-container .text-base { font-size: var(--font-size-base) !important; }
            .settings-container .section-title,
            .settings-container h3 { font-size: var(--font-size-lg) !important; }
          </style>
          <div class="content-spacing">

          <!-- ========== CONTA: SAIR DA CONTA (LOGOUT) ========== -->
          ${o?`
          <div class="mb-6">
            <h2 class="section-title red-border">🔐 Conta</h2>
            <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
              <div class="min-w-0 mr-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">Conectado como</div>
                <div class="font-medium text-gray-900 dark:text-gray-100 truncate" title="${(o.email||o.displayName||"Usuário").replace(/"/g,"&quot;")}">
                  ${o.email||o.displayName||"Usuário"}
                </div>
              </div>
              <button id="btn-logout" class="u-btn u-btn--danger">
                Sair da conta
              </button>
            </div>
          </div>
          `:""}

          ${y&&y.length>0?`
          <!-- Resumo rápido de Convites Recebidos -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <h2 class="section-title purple-border">📬 Convites Recebidos <span class="ml-2 inline-flex items-center justify-center text-xs font-semibold bg-purple-100 text-purple-700 rounded-full px-2 py-0.5">${y.length}</span></h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              ${y.slice(0,3).map(a=>`
                <div class="flex items-center justify-between p-3 rounded-lg ${a._rowAlt?"bg-gray-50 dark:bg-gray-800":""}">
                  <div class="min-w-0">
                    <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${a.budgetName||"Orçamento"}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 truncate">Convidado por ${a.invitedByUserEmail||a.invitedByUserId||"usuário"}</div>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <button onclick="acceptBudgetInvitation('${a.id}')" class="u-btn u-btn--primary text-xs">Aceitar</button>
                    <button onclick="(function(id,bid,name){acceptAndEnterInvitation(id,bid,decodeURIComponent(name));})('${a.id}','${a.budgetId}','${encodeURIComponent(a.budgetName||"Orçamento")}')" class="u-btn u-btn--primary text-xs">Aceitar e entrar</button>
                  </div>
                </div>
              `).join("")}
              ${y.length>3?`<div class="text-xs text-gray-500 mt-2">+${y.length-3} convid${y.length-3===1?"o":"os"} adicionais</div>`:""}
            </div>
          </div>
          `:""}
          
          
          <!-- ========== SEÇÃO 1: RESUMO DO ORÇAMENTO ========== -->
          ${e?`
          <div class="mb-8">
            <h2 class="section-title green-border">📋 Orçamento Atual</h2>
            
            <div class="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
              <!-- Header do Card -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl">
                    📋
                  </div>
                  <div>
                    <h3 class="text-xl md:text-2xl font-bold">${e.nome||"Orçamento sem nome"}</h3>
                    <p class="text-sm opacity-90">Orçamento Ativo</p>
                  </div>
                </div>
                <button onclick="editBudgetName()" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-xl transition-all duration-200">
                  ✏️
                </button>
              </div>
              
              <!-- Grid de Métricas -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-2xl mb-2">📅</div>
                  <div class="text-lg font-bold">${e.createdAt?new Date(e.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}</div>
                  <div class="text-sm opacity-90">Data de Criação</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-2xl mb-2">👥</div>
                  <div class="text-lg font-bold">${c.length+1}</div>
                  <div class="text-sm opacity-90">Usuários com Acesso</div>
                </div>

                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4">
                  <div class="text-2xl mb-2">👑</div>
                  <div class="text-lg font-bold truncate" title="${_}">${_}</div>
                  <div class="text-sm opacity-90">Proprietário</div>
                </div>
              </div>
            </div>
          </div>
          `:""}

          <!-- ========== SEÇÃO 2: USUÁRIOS E COMPARTILHAMENTO ========== -->
          <div class="mb-8">
            <h2 class="section-title blue-border">👥 Usuários & Compartilhamento</h2>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Acesso</h3>
                  <button onclick="document.getElementById('share-email')?.focus()" class="u-btn u-btn--primary">
                    📤 Compartilhar
                  </button>
                </div>
              </div>
              
              <!-- Conteúdo -->
              <div class="p-4">
                ${A?`
                  <div class="mb-4">
                    <div class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <div class="font-medium text-gray-900 dark:text-gray-100 truncate" title="${_}">${_}</div>
                      <div class="text-sm text-blue-700 dark:text-blue-300 font-semibold">Proprietário</div>
                    </div>
                  </div>
                `:""}

                ${c.length>0?`
                  <div class="space-y-3">
                    ${c.map(a=>`
                      <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                        <div class="flex items-center gap-3">
                          <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl">
                            👤
                          </div>
                          <div>
                            <div class="font-medium text-gray-900 dark:text-gray-100">${a.email}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">${a.role} • Adicionado em ${new Date().toLocaleDateString("pt-BR")}</div>
                          </div>
                        </div>
                        <button onclick="removeUserFromBudget('${a.uid}', '${a.email}')" class="u-btn u-btn--danger">
                          🚫 Remover
                        </button>
                      </div>
                    `).join("")}
                  </div>
                `:`
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">👥</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhum usuário compartilhado</div>
                    <div class="text-gray-600 dark:text-gray-400 mb-4">Compartilhe seu orçamento para ver usuários aqui</div>
                    <button onclick="document.getElementById('share-email')?.focus()" class="u-btn u-btn--primary">
                      📤 Compartilhar Orçamento
                    </button>
                  </div>
                `}
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 3: CONVITES PENDENTES (ENVIADOS POR MIM) ========== -->
          ${C.length>0?`
          <div class="mb-8">
            <h2 class="section-title orange-border">📤 Convites Pendentes</h2>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Convites Aguardando Resposta</h3>
              </div>
              
              <!-- Lista de Convites -->
              <div class="p-4">
                <div class="space-y-3">
                  ${C.map(a=>{const d=a.invitedUserEmail||a.email||a.invitedUserId||"Destinatário",s=a.createdAt?a.createdAt.toDate?a.createdAt.toDate():a.createdAt.seconds?new Date(a.createdAt.seconds*1e3):new Date(a.createdAt):null,f=s?s.toLocaleDateString("pt-BR"):"Data não disponível";return`
                    <div class="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 border border-orange-200 dark:border-orange-800 rounded-xl">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-xl">
                          📤
                        </div>
                        <div>
                          <div class="font-medium text-gray-900 dark:text-gray-100">${d}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            Enviado em ${f} • Aguardando resposta
                          </div>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button onclick="resendInvitation('${a.id}', '${d}')" class="u-btn u-btn--primary">
                          📤 Reenviar
                        </button>
                        <button onclick="cancelInvitation('${a.id}', '${d}')" class="u-btn u-btn--danger">
                          ❌ Cancelar
                        </button>
                      </div>
                    </div>
                  `}).join("")}
                </div>
              </div>
            </div>
          </div>
          `:""}

      <!-- Seção: Convites Recebidos -->
      <section class="content-section">
        <h2 class="section-title purple-border">Convites Recebidos</h2>
        <p class="section-description">Convites de outros usuários para acessar orçamentos compartilhados com você</p>

        ${y&&y.length>0?`
          <div class="invitations-list space-y-3">
            ${y.map(a=>`
              <div class="invitation-item flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div>
                  <div class="invitation-email font-medium text-gray-900 dark:text-gray-100">
                    📋 ${a.budgetName||"Orçamento"}
                  </div>
                  <div class="invitation-date text-sm text-gray-500 dark:text-gray-400">
                    Convidado por ${a.invitedByUserEmail||a.invitedByUserId||"usuário"} • ${a.createdAt?(a.createdAt.toDate?a.createdAt.toDate():new Date(a.createdAt.seconds*1e3)).toLocaleDateString("pt-BR"):"data desconhecida"}
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="acceptBudgetInvitation('${a.id}')" class="u-btn u-btn-primary bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">✅ Aceitar</button>
                  <button onclick="declineBudgetInvitation('${a.id}')" class="u-btn u-btn-danger bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">❌ Recusar</button>
                  <button onclick="(function(id,bid,name){acceptAndEnterInvitation(id,bid,decodeURIComponent(name));})('${a.id}','${a.budgetId}','${encodeURIComponent(a.budgetName||"Orçamento")}')" class="u-btn u-btn-primary bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">🚪 Aceitar e entrar</button>
                </div>
              </div>
            `).join("")}
          </div>
        `:`
          <div class="empty-state">
            <div class="empty-icon">📬</div>
            <div class="empty-text">Nenhum convite recebido</div>
            <div class="empty-description">Você não tem convites pendentes de outros usuários</div>
          </div>
        `}
      </section>

      <!-- Seção: Orçamentos Compartilhados com Você -->
      <section class="content-section">
        <h2 class="section-title blue-border">Orçamentos Compartilhados com Você</h2>
        <p class="section-description">Orçamentos onde você tem acesso, mas não é o proprietário</p>

        ${(()=>{const a=o?.uid,d=(n||[]).filter(s=>s&&(s.isOwner===!1||a&&s.userId&&s.userId!==a));return!d||d.length===0?`
              <div class="empty-state">
                <div class="empty-icon">🤝</div>
                <div class="empty-text">Nenhum orçamento compartilhado</div>
                <div class="empty-description">Convites aceitos aparecerão aqui para você entrar</div>
              </div>
            `:`
            <div class="budgets-list">
              ${d.map(s=>`
                <div class="budget-item ${s.id===e?.id?"active":""}" ${s.id!==e?.id?`data-enter-id="${s.id}" data-enter-name="${(s.nome||"Orçamento").replace(/\"/g,"&quot;")}" role="button" tabindex="0"`:""}>
                  <div class="budget-item-info">
                    <div class="budget-item-name">${s.nome||"Orçamento"}</div>
                    <div class="budget-item-date">ID: ${s.id}</div>
                    <div class="budget-item-status">Compartilhado</div>
                  </div>
                  <div class="budget-item-actions">
                    <div class="actions-row primary">
                      ${s.id!==e?.id?`
                        <button type="button" class="enter-budget-button u-btn u-btn--primary" tabindex="0" onclick="enterBudget('${s.id}')" data-budget-id="${s.id}" data-budget-name="${(s.nome||"Orçamento").replace(/\"/g,"&quot;")}" title="Entrar neste orçamento">
                          <span class="enter-icon">🚪</span>
                          <span class="enter-text">Entrar</span>
                        </button>
                      `:`
                        <div class="current-budget-badge">
                          <span class="current-icon">✅</span>
                          <span class="current-text">Ativo</span>
                        </div>
                      `}
                    </div>
                    <div class="actions-row secondary">
                      <button class="copy-id-button u-btn u-btn--ghost" onclick="copyBudgetId('${s.id}', this)" title="Copiar ID do orçamento">Copiar ID</button>
                      <button class="leave-button u-btn u-btn--danger" onclick="leaveBudgetWithConfirmation && leaveBudgetWithConfirmation('${s.id}', '${(s.nome||"Orçamento").replace(/'/g,"'")}')" title="Sair deste orçamento">
                        <span class="leave-icon">🚪</span>
                        <span class="leave-text">Sair</span>
                      </button>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          `})()}
      </section>

      <!-- Seção: Compartilhar Orçamento -->
      ${e?`
      <section class="content-section">
        <h2 class="section-title green-border">Compartilhar Orçamento</h2>
        <p class="section-description">Compartilhe seu orçamento atual com outros usuários</p>
        
        <div class="share-form">
          <div class="input-group">
            <label class="input-label">Email do usuário:</label>
            <input type="email" id="share-email" class="form-input u-input" placeholder="usuario@exemplo.com">
          </div>
          <div class="input-group">
            <label class="input-label">Selecionar orçamento para compartilhar:</label>
            <select id="share-budget-select" class="form-input u-input">
              ${n.map(a=>`<option value="${a.id}" ${a.id===e.id?"selected":""}>${a.nome||"Sem nome"}</option>`).join("")}
            </select>
          </div>
          <button onclick="inviteUserToBudget()" class="share-button u-btn u-btn--primary">
            <span class="share-icon">📤</span>
            <span class="share-text">Enviar Convite</span>
          </button>
        </div>
        
        <div class="share-info">
          <div class="info-item">
            <span class="info-icon">ℹ️</span>
            <span class="info-text">O usuário receberá um convite por email para acessar este orçamento</span>
          </div>
        </div>
      </section>
      `:`
      <section class="content-section">
        <h2 class="section-title green-border">Compartilhar Orçamento</h2>
        <p class="section-description">Compartilhe seu orçamento com outros usuários</p>
        
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <div class="empty-text">Nenhum orçamento selecionado</div>
          <div class="empty-description">Selecione um orçamento para poder compartilhá-lo</div>
        </div>
      </section>
      `}

      <!-- Seção: Gerenciar Orçamentos (somente meus) -->
      <section class="content-section">
        <h2 class="section-title blue-border">Gerenciar Orçamentos</h2>
        
        <div class="budgets-list">
          ${(()=>{const a=o?.uid;return(n||[]).filter(s=>s&&s.isOwner!==!1&&(!a||s.userId===a)).map(s=>`
            <div class="budget-item ${s.id===e?.id?"active":""}" ${s.id!==e?.id?`data-enter-id="${s.id}" data-enter-name="${(s.nome||"Orçamento").replace(/\"/g,"&quot;")}" role="button" tabindex="0"`:""}>
              <div class="budget-item-info">
                <div class="budget-item-name">${s.nome}</div>
                <div class="budget-item-date">Criado em ${s.createdAt?new Date(s.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}</div>
                ${s.id===e?.id?'<div class="budget-item-status">Ativo</div>':""}
              </div>
              <div class="budget-item-actions">
                <div class="actions-row primary">
                  ${s.id!==e?.id?`
                    <button type="button" class="enter-budget-button u-btn u-btn--primary" tabindex="0" onclick="enterBudget('${s.id}')" data-budget-id="${s.id}" data-budget-name="${(s.nome||"Orçamento").replace(/\"/g,"&quot;")}" title="Entrar neste orçamento">
                      <span class="enter-icon">🚪</span>
                      <span class="enter-text">Entrar</span>
                    </button>
                  `:`
                    <div class="current-budget-badge">
                      <span class="current-icon">✅</span>
                      <span class="current-text">Ativo</span>
                    </div>
                  `}
                </div>
                <div class="actions-row secondary">
                  <button class="copy-id-button u-btn u-btn--ghost" onclick="copyBudgetId('${s.id}', this)" title="Copiar ID do orçamento">Copiar ID</button>
                  <button class="delete-button u-btn u-btn--danger" onclick="deleteBudgetFromSettings('${s.id}')" title="Excluir orçamento">
                    <span class="delete-icon">🗑️</span>
                    <span class="delete-text">Excluir</span>
                  </button>
                </div>
              </div>
            </div>
          `).join("")})()}
        </div>
        
  <button onclick="createNewBudget()" class="create-button u-btn u-btn--primary">
          <span class="create-icon">➕</span>
          <span class="create-text">Criar Novo Orçamento</span>
        </button>
      </section>

  <!-- Seção: Dados e Privacidade -->
  <section class="content-section" id="section-data-privacy">
        <h2 class="section-title purple-border">Dados e Privacidade</h2>
        
        <div class="privacy-actions">
          <button onclick="exportData()" class="privacy-button">
            <span class="privacy-icon">📤</span>
            <span class="privacy-text">Exportar Meus Dados</span>
          </button>
          
          <button onclick="importData()" class="privacy-button">
            <span class="privacy-icon">📥</span>
            <span class="privacy-text">Importar Dados</span>
          </button>
          
          <button onclick="clearData()" class="privacy-button danger">
            <span class="privacy-icon">🗑️</span>
            <span class="privacy-text">Limpar Todos os Dados</span>
          </button>
        </div>

        <!-- Diagnóstico e Correções (avançado) -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 mt-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">🛠️ Diagnóstico e Correções</h3>
            <span class="text-xs text-gray-500 dark:text-gray-400">Avançado</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">Se algumas listas estiverem vazias após entrar no orçamento, use estas ações para corrigir dados antigos sem <code>budgetId</code>.</p>
          <div class="flex flex-col sm:flex-row gap-2">
            <button onclick="window.corrigirCategoriasSemBudget()" class="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800">
              Corrigir categorias antigas
            </button>
            <button onclick="window.corrigirTransacoesSemBudget()" class="px-3 py-2 rounded-lg text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800">
              Corrigir transações antigas
            </button>
            <button onclick="window.corrigirRecorrentesSemBudget()" class="px-3 py-2 rounded-lg text-sm font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-200 hover:bg-teal-100 dark:hover:bg-teal-900/50 border border-teal-200 dark:border-teal-800">
              Corrigir recorrentes antigas
            </button>
            <!-- Em ambientes com múltiplos orçamentos, use a migração por categoria para atribuir budgetId com segurança -->
            <button onclick="window.migrarOrfaosPorCategoria && window.migrarOrfaosPorCategoria()" class="px-3 py-2 rounded-lg text-sm font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800">
              Migrar órfãos por categoria
            </button>
            <!-- Correção escopada ao orçamento atual (somente categorias do orçamento vigente) -->
            <button onclick="window.corrigirOrfaosDoOrcamento && window.corrigirOrfaosDoOrcamento()" class="px-3 py-2 rounded-lg text-sm font-medium bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800">
              Corrigir órfãos deste orçamento
            </button>
              <button onclick="window.corrigirTudoSemBudget()" class="px-3 py-2 rounded-lg text-sm font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-800">
                Corrigir tudo
              </button>
          </div>
        </div>
      </section>

  <!-- Seção: Configurações de Notificações -->
  <section class="content-section" id="section-notifications">
        <h2 class="section-title orange-border">Notificações</h2>
        
        <div class="notifications-settings">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Alertas de Limite</div>
              <div class="setting-description">Notificar quando categoria exceder 70% do limite</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="limit-alerts" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Lembretes de Recorrentes</div>
              <div class="setting-description">Lembrar de aplicar despesas recorrentes</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="recurring-reminders" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Resumo Semanal</div>
              <div class="setting-description">Receber resumo semanal das finanças</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="weekly-summary">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <button aria-label="Enviar notificação de teste para o dono" onclick="sendTestNotificationOwner()" class="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800">
            Enviar teste (Dono)
          </button>
          <button aria-label="Enviar notificações de teste para usuários compartilhados" onclick="sendTestNotificationShared()" class="px-3 py-2 rounded-lg text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800">
            Enviar teste (Compartilhados)
          </button>
          <button aria-label="Abrir feed de notificações" onclick="(function(){ try { window.location.hash = '#/notifications'; } catch {} localStorage?.setItem?.('settings_last_section','section-notifications'); })()" class="px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">
            Abrir feed de Notificações
          </button>
        </div>
      </section>

          <!-- ========== SEÇÃO 4: CONFIGURAÇÕES DE INTERFACE ========== -->
          <div class="mb-8">
            <h2 class="section-title purple-border">🎨 Interface & Aparência</h2>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Personalizar Aparência</h3>
              </div>
              
              <!-- Configurações -->
              <div class="p-4 space-y-4">
                <!-- Toasts / Snackbar -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl">🔔</div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Toasts (Snackbar)</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Ajuste posição, duração, fila e anti-spam</div>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label class="flex items-center gap-2">
                      <span class="w-40 text-gray-700 dark:text-gray-300">Duração padrão (ms)</span>
                      <input id="snk-duration" type="number" min="500" step="100" class="u-input flex-1" placeholder="3000" />
                    </label>
                    <label class="flex items-center gap-2">
                      <span class="w-40 text-gray-700 dark:text-gray-300">Distância da borda (px)</span>
                      <input id="snk-bottom" type="number" min="0" step="4" class="u-input flex-1" placeholder="80" />
                    </label>
                    <label class="flex items-center gap-2">
                      <span class="w-40 text-gray-700 dark:text-gray-300">Posição</span>
                      <select id="snk-position" class="u-input flex-1">
                        <option value="bottom">Inferior</option>
                        <option value="top">Superior</option>
                      </select>
                    </label>
                    <label class="flex items-center gap-2">
                      <span class="w-40 text-gray-700 dark:text-gray-300">Alinhamento</span>
                      <select id="snk-align" class="u-input flex-1">
                        <option value="center">Centro</option>
                        <option value="left">Esquerda</option>
                        <option value="right">Direita</option>
                      </select>
                    </label>
                    <label class="flex items-center gap-2">
                      <span class="w-40 text-gray-700 dark:text-gray-300">Max. fila</span>
                      <input id="snk-maxQueue" type="number" min="1" max="20" step="1" class="u-input flex-1" placeholder="5" />
                    </label>
                    <label class="flex items-center gap-2">
                      <span class="w-40 text-gray-700 dark:text-gray-300">Anti-spam (ms)</span>
                      <input id="snk-cooldown" type="number" min="0" step="100" class="u-input flex-1" placeholder="500" />
                    </label>
                    <label class="flex items-center gap-2">
                      <span class="w-40 text-gray-700 dark:text-gray-300">Pausar no hover</span>
                      <input id="snk-hoverPause" type="checkbox" class="h-5 w-5" />
                    </label>
                  </div>
                  <div class="flex gap-2 mt-3">
                    <button onclick="window.saveSnackbarPrefs && window.saveSnackbarPrefs()" class="u-btn u-btn--primary">Aplicar</button>
                    <button onclick="window.resetSnackbarPrefs && window.resetSnackbarPrefs()" class="u-btn u-btn--outline">Restaurar padrão</button>
                    <button onclick="window.Snackbar && window.Snackbar.info('Exemplo de toast', 1500)" class="u-btn u-btn--primary">Testar</button>
                  </div>
                </div>
                <!-- Modo Escuro -->
                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
                      🌙
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Modo Escuro</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Alternar entre tema claro e escuro</div>
                    </div>
                  </div>
                  <button onclick="toggleTheme()" class="u-btn u-btn--primary">
                    Alternar
                  </button>
                </div>
                
                <!-- Tema de Cores -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-xl">
                      🎨
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Tema de Cores</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Escolher cores preferidas para o app</div>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button onclick="setColorTheme('blue')" class="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-200" title="Azul"></button>
                    <button onclick="setColorTheme('green')" class="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200" title="Verde"></button>
                    <button onclick="setColorTheme('purple')" class="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 transition-all duration-200" title="Roxo"></button>
                    <button onclick="setColorTheme('orange')" class="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-200" title="Laranja"></button>
                  </div>
                </div>
                
                <!-- Compactar Interface -->
                <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-xl">
                      📏
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Compactar Interface</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar mais informações em menos espaço</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="compact-interface" onchange="toggleCompactMode(this.checked)" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <button onclick="toggleMicroMode()" class="u-btn u-btn--outline" title="Modo micro-compacto">
                      📏 Micro
                    </button>
                    <button onclick="toggleNanoMode()" class="u-btn u-btn--outline" title="Modo nano-compacto">
                      🔬 Nano
                    </button>
                  </div>
                </div>
                
                  <!-- Desempenho das Transações (virtualização) -->
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xl">⚡</div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">Tamanho do bloco de dias</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">Ajusta quantos grupos de dias são carregados por vez na aba Transações (recomendado 10–16)</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3 flex-wrap">
                      <input id="tx-chunk-size" type="number" min="6" max="40" value="${k}" placeholder="Automático" class="u-input w-28"/>
                      <button onclick="saveTxChunkSize()" class="u-btn u-btn--primary">Salvar</button>
                      <button onclick="resetTxChunkSize()" class="u-btn u-btn--outline">Restaurar padrão</button>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">Deixe em branco para usar ajuste automático baseado no seu dispositivo. Aplica-se na próxima abertura da aba Transações.</div>
                  </div>

                <!-- Animações -->
                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-xl">
                      ✨
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Animações</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar animações e transições</div>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="animations" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <!-- Telemetria de Performance (local) -->
                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xl">📈</div>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-gray-100">Telemetria de Performance</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Coleta local de tempos de render e carregamentos (sem envio)</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" id="perf-telemetry" ${g?"checked":""} onchange="togglePerfTelemetry()" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <button onclick="showPerfLog()" class="u-btn u-btn--outline">Ver eventos</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

  <!-- Seção: Configurações de Privacidade -->
  <section class="content-section" id="section-privacy-security">
        <h2 class="section-title purple-border">Privacidade e Segurança</h2>
        
        <div class="privacy-settings">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Autenticação Biométrica</div>
              <div class="setting-description">Usar impressão digital ou face ID</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="biometric-auth">
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Sincronização Automática</div>
              <div class="setting-description">Sincronizar dados automaticamente</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="auto-sync" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Analytics</div>
              <div class="setting-description">Compartilhar dados de uso para melhorias</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="analytics" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

  <!-- Seção: Sobre o App -->
  <section class="content-section" id="section-about">
        <h2 class="section-title">ℹ️ Sobre o App</h2>
        
        <div class="about-info">
          <div class="about-item">
      <span class="about-label">Versão:</span>
    <span class="about-value">${u}</span>
          </div>
          <div class="about-item">
            <span class="about-label">SW Versão:</span>
            <span class="about-value" id="sw-version-dyn">—</span>
          </div>
          <div class="about-item">
            <span class="about-label">Cache Estático:</span>
            <span class="about-value" id="sw-cache-static">—</span>
          </div>
          <div class="about-item">
            <span class="about-label">Cache Dinâmico:</span>
            <span class="about-value" id="sw-cache-dynamic">—</span>
          </div>
          <div class="about-item">
            <span class="about-label">Desenvolvedor:</span>
            <span class="about-value">Igor Bispo</span>
          </div>
          <div class="about-item">
            <span class="about-label">Tecnologias:</span>
            <span class="about-value">Firebase, JavaScript, PWA</span>
          </div>
          <div class="about-item">
            <span class="about-label">Última Atualização:</span>
            <span class="about-value">${l}</span>
          </div>
          <div class="about-item">
            <span class="about-label">Conectividade:</span>
            <span class="about-value" id="net-status">—</span>
          </div>
          <div class="about-item">
            <span class="about-label">Última verificação de update:</span>
            <span class="about-value" id="sw-last-check">—</span>
          </div>
        </div>
        
        <div class="app-actions">
          <button aria-label="Verificar atualizações do aplicativo" onclick="checkForUpdates()" class="app-button">
            <span class="app-icon">🔄</span>
            <span class="app-text">Verificar Atualizações</span>
          </button>

          <button aria-label="Limpar cache offline do aplicativo" onclick="clearAppCaches()" class="app-button">
            <span class="app-icon">🧹</span>
            <span class="app-text">Limpar Cache Offline</span>
          </button>
          
          <button aria-label="Abrir ajuda e suporte" onclick="openHelp()" class="app-button">
            <span class="app-icon">❓</span>
            <span class="app-text">Ajuda e Suporte</span>
          </button>
          
          <button aria-label="Ver o que mudou nesta versão" onclick="openChangelogModal()" class="app-button">
            <span class="app-icon">📝</span>
            <span class="app-text">O que mudou ${w?'<span class="ml-2 px-2 py-0.5 text-[10px] rounded-full bg-red-100 text-red-700 align-middle">Novo</span>':""}</span>
          </button>
          
          <button aria-label="Avaliar o aplicativo" onclick="rateApp()" class="app-button">
            <span class="app-icon">⭐</span>
            <span class="app-text">Avaliar App</span>
          </button>

          <button id="install-app-btn" aria-label="Instalar o aplicativo na tela inicial" onclick="(window.installApp && window.installApp())" class="app-button">
            <span class="app-icon">⬇️</span>
            <span class="app-text">Instalar App</span>
          </button>

          <button aria-label="Copiar informações de diagnóstico" onclick="(function(){ try { const info = {
            appVersion: __appVersion,
            swVersion: document.getElementById('sw-version-dyn')?.textContent || '',
            cacheStatic: document.getElementById('sw-cache-static')?.textContent || '',
            cacheDynamic: document.getElementById('sw-cache-dynamic')?.textContent || '',
            connectivity: document.getElementById('net-status')?.textContent || '',
            lastCheck: document.getElementById('sw-last-check')?.textContent || ''
          }; navigator.clipboard?.writeText?.(JSON.stringify(info, null, 2)); window.Snackbar?.({ message: 'Informações copiadas', type: 'success' }); } catch (e) { console.warn(e); window.Snackbar?.({ message: 'Não foi possível copiar', type: 'error' }); } })()" class="app-button">
            <span class="app-icon">📋</span>
            <span class="app-text">Copiar Informações</span>
          </button>
        </div>
      </section>
          </div>
        </div>
      </div>
    </div>

    <style>
      /* Estilos da Abordagem Híbrida para Configurações */
      
      .settings-container {
        /* Ocupa toda a largura disponível */
        max-width: none;
        width: 100%;
        margin: 0;
        padding: 0.5rem 1rem;
      }

            /* Mobile-first: Design ultra-compacto */
      @media (max-width: 768px) {
        .settings-container {
          padding: 0.125rem;
          margin: 0;
        }
        
        .page-title {
          font-size: 1.25rem !important;
          margin-bottom: 0.125rem !important;
          padding: 0.25rem 0 !important;
        }
        
        .page-subtitle {
          font-size: var(--font-size-base) !important;
          margin-bottom: 0.5rem !important;
          opacity: 0.8;
        }
        
        .section-title {
          font-size: var(--font-size-lg) !important;
          margin-bottom: 0.25rem !important;
          padding: 0.25rem 0 !important;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .content-section {
          margin-bottom: 0.5rem !important;
          padding: 0.375rem !important;
          border-radius: 6px;
        }
        
        .setting-item {
          padding: 0.25rem 0 !important;
          margin-bottom: 0.25rem !important;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .setting-info {
          flex: 1;
          min-width: 0;
        }
        
        .setting-label {
          font-size: var(--font-size-base) !important;
          font-weight: 500;
          margin-bottom: 0.125rem !important;
        }
        
        .setting-description {
          font-size: var(--font-size-base) !important;
          opacity: 0.7;
          line-height: 1.2;
        }
        
        .budget-card {
          padding: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        
        .budget-name {
          font-size: var(--font-size-base) !important;
          font-weight: 600;
        }
        
        .detail-item {
          margin-bottom: 0.125rem !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .detail-label, .detail-value {
          font-size: var(--font-size-base) !important;
        }
        
        .users-list, .invitations-list {
          gap: 0.25rem !important;
        }
        
        .user-item, .invitation-item {
          padding: 0.375rem !important;
          border-radius: 4px;
        }
        
        .user-email, .invitation-email {
          font-size: var(--font-size-base) !important;
          font-weight: 500;
        }
        
        .user-role, .invitation-date {
          font-size: var(--font-size-base) !important;
          opacity: 0.7;
        }
        
        .privacy-actions {
          gap: 0.25rem !important;
          flex-wrap: wrap;
        }
        
        .privacy-button {
          padding: 0.375rem 0.5rem !important;
          font-size: var(--font-size-base) !important;
          border-radius: 4px;
        }
        
        .share-form {
          gap: 0.25rem !important;
          flex-direction: column;
        }
        
        .form-input {
          padding: 0.375rem !important;
          font-size: var(--font-size-base) !important;
          border-radius: 4px;
        }
        
        .share-button {
          padding: 0.375rem 0.5rem !important;
          font-size: var(--font-size-base) !important;
          border-radius: 4px;
        }
        
        .budgets-list {
          gap: 0.25rem !important;
        }
        
        .budget-item {
          padding: 0.375rem !important;
          border-radius: 4px;
        }
        
        .budget-item-name {
          font-size: var(--font-size-base) !important;
          font-weight: 500;
        }
        
        .budget-item-date {
          font-size: var(--font-size-base) !important;
          opacity: 0.7;
        }
        
        .create-button {
          padding: 0.375rem 0.5rem !important;
          font-size: var(--font-size-base) !important;
          border-radius: 4px;
        }
        
        .about-info {
          gap: 0.125rem !important;
        }
        
        .about-item {
          padding: 0.125rem 0 !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .about-label, .about-value {
          font-size: var(--font-size-base) !important;
        }
        
        .app-actions {
          gap: 0.25rem !important;
          flex-wrap: wrap;
        }
        
        .app-button {
          padding: 0.375rem 0.5rem !important;
          font-size: var(--font-size-base) !important;
          border-radius: 4px;
        }
        
        .empty-state {
          padding: 0.5rem !important;
          text-align: center;
        }
        
        .empty-icon {
          font-size: var(--font-size-lg) !important;
          margin-bottom: 0.25rem !important;
        }
        
        .empty-text {
          font-size: 0.8125rem !important;
          font-weight: 500;
        }
        
        .empty-description {
          font-size: 0.6875rem !important;
          opacity: 0.7;
        }
        
                 /* Layout em grid para melhor aproveitamento */
         .settings-grid {
           display: grid;
           grid-template-columns: 1fr;
           gap: 0.5rem;
         }
         
         /* Otimizações adicionais para máximo aproveitamento */
         .settings-container {
           line-height: 1.2;
         }
         
         /* Reduzir espaçamento entre seções */
         .content-section + .content-section {
           margin-top: 0.25rem;
         }
         
         /* Otimizar espaçamento de listas */
         .users-list > * + *,
         .invitations-list > * + *,
         .budgets-list > * + * {
           margin-top: 0.125rem;
         }
         
         /* Reduzir padding de botões */
         .privacy-button,
         .share-button,
         .create-button,
         .app-button {
           line-height: 1.2;
           min-height: auto;
         }
         
         /* Otimizar formulários */
         .form-input {
           line-height: 1.2;
           min-height: auto;
         }
         
         /* Reduzir espaçamento entre elementos inline */
         .setting-label + .setting-description {
           margin-top: 0.0625rem;
         }
         
         .content-section {
           line-height: 1.1;
         }
         
         .setting-item {
           line-height: 1.1;
         }
         
         /* Reduzir espaçamento entre elementos inline */
         .setting-label + .setting-description {
           margin-top: 0.0625rem;
         }
         
         /* Otimizar espaçamento de listas */
         .users-list > * + *,
         .invitations-list > * + *,
         .budgets-list > * + * {
           margin-top: 0.125rem;
         }
         
         /* Reduzir padding de botões */
         .privacy-button,
         .share-button,
         .create-button,
         .app-button {
           line-height: 1.2;
           min-height: auto;
         }
         
         /* Otimizar formulários */
         .form-input {
           line-height: 1.2;
           min-height: auto;
         }

      /* Desktop: duas colunas automáticas para preencher melhor a largura */
      @media (min-width: 1024px) {
        .content-spacing {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }
        /* A primeira seção (Resumo do Orçamento) ocupa largura completa */
        .content-spacing > .mb-8:first-child {
          grid-column: 1 / -1;
        }
      }

      /* Ultrawide: aumenta o gap para conforto visual */
      @media (min-width: 1600px) {
        .content-spacing {
          gap: 1.5rem;
        }
      }
        
        /* Cards mais compactos */
        .compact-card {
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 6px;
          padding: 0.5rem;
          margin-bottom: 0.25rem;
        }
        
        /* Botões mais compactos */
        .compact-button {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        /* Toggle mais compacto */
        .toggle-switch {
          transform: scale(0.8);
          margin-left: 0.5rem;
        }
        
                 /* Ícones menores */
         .section-title::before {
           font-size: 0.875rem;
           margin-right: 0.375rem;
         }
         
         /* Controles de compactação */
         .compact-controls {
           display: flex;
           align-items: center;
           gap: 0.25rem;
         }
         
         .micro-compact-btn {
           background: none;
           border: none;
           font-size: 0.875rem;
           cursor: pointer;
           padding: 0.125rem;
           border-radius: 3px;
           transition: all 0.2s;
         }
         
         .micro-compact-btn:hover {
           background: rgba(0,0,0,0.1);
         }
         
         .micro-compact-btn.active {
           background: var(--primary-color);
           color: white;
         }
         
         .nano-compact-btn {
           background: none;
           border: none;
           font-size: 0.875rem;
           cursor: pointer;
           padding: 0.125rem;
           border-radius: 3px;
           transition: all 0.2s;
         }
         
         .nano-compact-btn:hover {
           background: rgba(0,0,0,0.1);
         }
         
         .nano-compact-btn.active {
           background: var(--accent-color);
           color: white;
         }
       }

       /* Modo Ultra-Compacto - Aplicado via JavaScript */
       .compact-mode {
         --spacing-xs: 1px;
         --spacing-sm: 2px;
         --spacing-md: 3px;
         --spacing-lg: 4px;
         --spacing-xl: 6px;
         --spacing-2xl: 8px;
       }

       .compact-mode .settings-container {
         padding: 0.125rem;
       }

       .compact-mode .page-title {
         font-size: 1rem;
         margin-bottom: 0.125rem;
         padding: 0.125rem 0;
       }

       .compact-mode .page-subtitle {
         font-size: 0.625rem;
         margin-bottom: 0.25rem;
         opacity: 0.6;
       }

       .compact-mode .section-title {
         font-size: var(--font-size-base);
         margin-bottom: 0.125rem;
         padding: 0.125rem 0;
         border-bottom: 1px solid rgba(0,0,0,0.05);
       }

       .compact-mode .content-section {
         margin-bottom: 0.25rem;
         padding: 0.25rem;
         border-radius: 4px;
       }

       .compact-mode .setting-item {
         padding: 0.125rem 0;
         margin-bottom: 0.125rem;
         display: flex;
         align-items: center;
         justify-content: space-between;
       }

       .compact-mode .setting-info {
         flex: 1;
         min-width: 0;
       }

       .compact-mode .setting-label {
         font-size: var(--font-size-base);
         font-weight: 500;
         margin-bottom: 0.0625rem;
       }

       .compact-mode .setting-description {
         font-size: var(--font-size-base);
         opacity: 0.6;
         line-height: 1.1;
       }

       .compact-mode .budget-card {
         padding: 0.25rem;
         margin-bottom: 0.25rem;
       }

       .compact-mode .budget-name {
         font-size: var(--font-size-base);
         font-weight: 600;
       }

       .compact-mode .detail-item {
         margin-bottom: 0.0625rem;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }

       .compact-mode .detail-label,
       .compact-mode .detail-value {
         font-size: var(--font-size-base);
       }

       .compact-mode .users-list,
       .compact-mode .invitations-list {
         gap: 0.125rem;
       }

       .compact-mode .user-item,
       .compact-mode .invitation-item {
         padding: 0.1875rem;
         border-radius: 3px;
       }

       .compact-mode .user-email,
       .compact-mode .invitation-email {
         font-size: var(--font-size-base);
         font-weight: 500;
       }

       .compact-mode .user-role,
       .compact-mode .invitation-date {
         font-size: var(--font-size-base);
         opacity: 0.6;
       }

       .compact-mode .privacy-actions {
         gap: 0.125rem;
         flex-wrap: wrap;
       }

       .compact-mode .privacy-button {
         padding: 0.1875rem 0.375rem;
         font-size: var(--font-size-base);
         border-radius: 3px;
       }

       .compact-mode .share-form {
         gap: 0.125rem;
         flex-direction: column;
       }

       .compact-mode .form-input {
         padding: 0.1875rem;
         font-size: var(--font-size-base);
         border-radius: 3px;
       }

       .compact-mode .share-button {
         padding: 0.1875rem 0.375rem;
         font-size: var(--font-size-base);
         border-radius: 3px;
       }

       .compact-mode .budgets-list {
         gap: 0.125rem;
       }

       .compact-mode .budget-item {
         padding: 0.1875rem;
         border-radius: 3px;
       }

       .compact-mode .budget-item-name {
         font-size: var(--font-size-base);
         font-weight: 500;
       }

       .compact-mode .budget-item-date {
         font-size: var(--font-size-base);
         opacity: 0.6;
       }

       .compact-mode .create-button {
         padding: 0.1875rem 0.375rem;
         font-size: var(--font-size-base);
         border-radius: 3px;
       }

       .compact-mode .about-info {
         gap: 0.0625rem;
       }

       .compact-mode .about-item {
         padding: 0.0625rem 0;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }

       .compact-mode .about-label,
       .compact-mode .about-value {
         font-size: var(--font-size-base);
       }

       .compact-mode .app-actions {
         gap: 0.125rem;
         flex-wrap: wrap;
       }

       .compact-mode .app-button {
         padding: 0.1875rem 0.375rem;
         font-size: var(--font-size-base);
         border-radius: 3px;
       }

       .compact-mode .empty-state {
         padding: 0.25rem;
         text-align: center;
       }

       .compact-mode .empty-icon {
         font-size: 1rem;
         margin-bottom: 0.125rem;
       }

       .compact-mode .empty-text {
         font-size: 0.6875rem;
         font-weight: 500;
       }

       .compact-mode .empty-description {
         font-size: 0.5625rem;
         opacity: 0.6;
       }

       /* Toggle ultra-compacto */
       .compact-mode .toggle-switch {
         transform: scale(0.6);
         margin-left: 0.25rem;
       }

       /* Ícones ultra-compactos */
       .compact-mode .section-title::before {
         font-size: 0.75rem;
         margin-right: 0.25rem;
       }

       /* Layout em grid ultra-compacto */
       .compact-mode .settings-grid {
         gap: 0.25rem;
       }

       /* Cards ultra-compactos */
       .compact-mode .compact-card {
         padding: 0.25rem;
         margin-bottom: 0.125rem;
         border-radius: 3px;
       }
       
       /* Modo Micro-Compacto - Máxima compactação */
       .micro-mode {
         --spacing-xs: 0px;
         --spacing-sm: 1px;
         --spacing-md: 2px;
         --spacing-lg: 3px;
         --spacing-xl: 4px;
         --spacing-2xl: 6px;
       }
       
       .micro-mode .settings-container {
         padding: 0.0625rem;
       }
       
       .micro-mode .page-title {
         font-size: 0.875rem;
         margin-bottom: 0.0625rem;
         padding: 0.0625rem 0;
       }
       
       .micro-mode .page-subtitle {
         font-size: 0.5625rem;
         margin-bottom: 0.125rem;
         opacity: 0.5;
       }
       
       .micro-mode .section-title {
         font-size: 0.75rem;
         margin-bottom: 0.0625rem;
         padding: 0.0625rem 0;
         border-bottom: 1px solid rgba(0,0,0,0.05);
       }
       
       .micro-mode .content-section {
         margin-bottom: 0.125rem;
         padding: 0.125rem;
         border-radius: 2px;
       }
       
       .micro-mode .setting-item {
         padding: 0.0625rem 0;
         margin-bottom: 0.0625rem;
         display: flex;
         align-items: center;
         justify-content: space-between;
       }
       
       .micro-mode .setting-info {
         flex: 1;
         min-width: 0;
       }
       
       .micro-mode .setting-label {
         font-size: 0.625rem;
         font-weight: 500;
         margin-bottom: 0.03125rem;
       }
       
       .micro-mode .setting-description {
         font-size: 0.5rem;
         opacity: 0.5;
         line-height: 1;
       }
       
       .micro-mode .budget-card {
         padding: 0.125rem;
         margin-bottom: 0.125rem;
       }
       
       .micro-mode .budget-name {
         font-size: 0.6875rem;
         font-weight: 600;
       }
       
       .micro-mode .detail-item {
         margin-bottom: 0.03125rem;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }
       
       .micro-mode .detail-label,
       .micro-mode .detail-value {
         font-size: 0.5rem;
       }
       
       .micro-mode .users-list,
       .micro-mode .invitations-list {
         gap: 0.0625rem;
       }
       
       .micro-mode .user-item,
       .micro-mode .invitation-item {
         padding: 0.09375rem;
         border-radius: 2px;
       }
       
       .micro-mode .user-email,
       .micro-mode .invitation-email {
         font-size: 0.625rem;
         font-weight: 500;
       }
       
       .micro-mode .user-role,
       .micro-mode .invitation-date {
         font-size: 0.5rem;
         opacity: 0.5;
       }
       
       .micro-mode .privacy-actions {
         gap: 0.0625rem;
         flex-wrap: wrap;
       }
       
       .micro-mode .privacy-button {
         padding: 0.09375rem 0.1875rem;
         font-size: 0.5625rem;
         border-radius: 2px;
       }
       
       .micro-mode .share-form {
         gap: 0.0625rem;
         flex-direction: column;
       }
       
       .micro-mode .form-input {
         padding: 0.09375rem;
         font-size: 0.625rem;
         border-radius: 2px;
       }
       
       .micro-mode .share-button {
         padding: 0.09375rem 0.1875rem;
         font-size: 0.5625rem;
         border-radius: 2px;
       }
       
       .micro-mode .budgets-list {
         gap: 0.0625rem;
       }
       
       .micro-mode .budget-item {
         padding: 0.09375rem;
         border-radius: 2px;
       }
       
       .micro-mode .budget-item-name {
         font-size: 0.625rem;
         font-weight: 500;
       }
       
       .micro-mode .budget-item-date {
         font-size: 0.5rem;
         opacity: 0.5;
       }
       
       .micro-mode .create-button {
         padding: 0.09375rem 0.1875rem;
         font-size: 0.5625rem;
         border-radius: 2px;
       }
       
       .micro-mode .about-info {
         gap: 0.03125rem;
       }
       
       .micro-mode .about-item {
         padding: 0.03125rem 0;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }
       
       .micro-mode .about-label,
       .micro-mode .about-value {
         font-size: 0.5rem;
       }
       
       .micro-mode .app-actions {
         gap: 0.0625rem;
         flex-wrap: wrap;
       }
       
       .micro-mode .app-button {
         padding: 0.09375rem 0.1875rem;
         font-size: 0.5625rem;
         border-radius: 2px;
       }
       
       .micro-mode .empty-state {
         padding: 0.125rem;
         text-align: center;
       }
       
       .micro-mode .empty-icon {
         font-size: 0.75rem;
         margin-bottom: 0.0625rem;
       }
       
       .micro-mode .empty-text {
         font-size: 0.625rem;
         font-weight: 500;
       }
       
       .micro-mode .empty-description {
         font-size: 0.5rem;
         opacity: 0.5;
       }
       
       /* Toggle micro-compacto */
       .micro-mode .toggle-switch {
         transform: scale(0.5);
         margin-left: 0.125rem;
       }
       
       /* Ícones micro-compactos */
       .micro-mode .section-title::before {
         font-size: 0.625rem;
         margin-right: 0.125rem;
       }
       
       /* Layout em grid micro-compacto */
       .micro-mode .settings-grid {
         gap: 0.125rem;
       }
       
       /* Cards micro-compactos */
       .micro-mode .compact-card {
         padding: 0.125rem;
         margin-bottom: 0.0625rem;
         border-radius: 2px;
       }
       
                /* Botão micro-compacto ativo */
         .micro-mode .micro-compact-btn {
           background: var(--primary-color);
           color: white;
         }
         
         /* Modo Nano-Compacto - Compactação máxima */
         .nano-mode {
           --spacing-xs: 0px;
           --spacing-sm: 0px;
           --spacing-md: 1px;
           --spacing-lg: 2px;
           --spacing-xl: 3px;
           --spacing-2xl: 4px;
         }
         
         .nano-mode .settings-container {
           padding: 0.03125rem;
         }
         
         .nano-mode .page-title {
           font-size: 0.75rem;
           margin-bottom: 0.03125rem;
           padding: 0.03125rem 0;
         }
         
         .nano-mode .page-subtitle {
           font-size: 0.5rem;
           margin-bottom: 0.0625rem;
           opacity: 0.4;
         }
         
         .nano-mode .section-title {
           font-size: 0.6875rem;
           margin-bottom: 0.03125rem;
           padding: 0.03125rem 0;
           border-bottom: 1px solid rgba(0,0,0,0.03);
         }
         
         .nano-mode .content-section {
           margin-bottom: 0.0625rem;
           padding: 0.0625rem;
           border-radius: 1px;
         }
         
         .nano-mode .setting-item {
           padding: 0.03125rem 0;
           margin-bottom: 0.03125rem;
           display: flex;
           align-items: center;
           justify-content: space-between;
         }
         
         .nano-mode .setting-info {
           flex: 1;
           min-width: 0;
         }
         
         .nano-mode .setting-label {
           font-size: 0.5625rem;
           font-weight: 500;
           margin-bottom: 0.015625rem;
         }
         
         .nano-mode .setting-description {
           font-size: 0.4375rem;
           opacity: 0.4;
           line-height: 1;
         }
         
         .nano-mode .budget-card {
           padding: 0.0625rem;
           margin-bottom: 0.0625rem;
         }
         
         .nano-mode .budget-name {
           font-size: 0.625rem;
           font-weight: 600;
         }
         
         .nano-mode .detail-item {
           margin-bottom: 0.015625rem;
           display: flex;
           justify-content: space-between;
           align-items: center;
         }
         
         .nano-mode .detail-label,
         .nano-mode .detail-value {
           font-size: 0.4375rem;
         }
         
         .nano-mode .users-list,
         .nano-mode .invitations-list {
           gap: 0.03125rem;
         }
         
         .nano-mode .user-item,
         .nano-mode .invitation-item {
           padding: 0.046875rem;
           border-radius: 1px;
         }
         
         .nano-mode .user-email,
         .nano-mode .invitation-email {
           font-size: 0.5625rem;
           font-weight: 500;
         }
         
         .nano-mode .user-role,
         .nano-mode .invitation-date {
           font-size: 0.4375rem;
           opacity: 0.4;
         }
         
         .nano-mode .privacy-actions {
           gap: 0.03125rem;
           flex-wrap: wrap;
         }
         
         .nano-mode .privacy-button {
           padding: 0.046875rem 0.09375rem;
           font-size: 0.5rem;
           border-radius: 1px;
         }
         
         .nano-mode .share-form {
           gap: 0.03125rem;
           flex-direction: column;
         }
         
         .nano-mode .form-input {
           padding: 0.046875rem;
           font-size: 0.5625rem;
           border-radius: 1px;
         }
         
         .nano-mode .share-button {
           padding: 0.046875rem 0.09375rem;
           font-size: 0.5rem;
           border-radius: 1px;
         }
         
         .nano-mode .budgets-list {
           gap: 0.03125rem;
         }
         
         .nano-mode .budget-item {
           padding: 0.046875rem;
           border-radius: 1px;
         }
         
         .nano-mode .budget-item-name {
           font-size: 0.5625rem;
           font-weight: 500;
         }
         
         .nano-mode .budget-item-date {
           font-size: 0.4375rem;
           opacity: 0.4;
         }
         
         .nano-mode .create-button {
           padding: 0.046875rem 0.09375rem;
           font-size: 0.5rem;
           border-radius: 1px;
         }
         
         .nano-mode .about-info {
           gap: 0.015625rem;
         }
         
         .nano-mode .about-item {
           padding: 0.015625rem 0;
           display: flex;
           justify-content: space-between;
           align-items: center;
         }
         
         .nano-mode .about-label,
         .nano-mode .about-value {
           font-size: 0.4375rem;
         }
         
         .nano-mode .app-actions {
           gap: 0.03125rem;
           flex-wrap: wrap;
         }
         
         .nano-mode .app-button {
           padding: 0.046875rem 0.09375rem;
           font-size: 0.5rem;
           border-radius: 1px;
         }
         
         .nano-mode .empty-state {
           padding: 0.0625rem;
           text-align: center;
         }
         
         .nano-mode .empty-icon {
           font-size: 0.625rem;
           margin-bottom: 0.03125rem;
         }
         
         .nano-mode .empty-text {
           font-size: 0.5625rem;
           font-weight: 500;
         }
         
         .nano-mode .empty-description {
           font-size: 0.4375rem;
           opacity: 0.4;
         }
         
         /* Toggle nano-compacto */
         .nano-mode .toggle-switch {
           transform: scale(0.4);
           margin-left: 0.0625rem;
         }
         
         /* Ícones nano-compactos */
         .nano-mode .section-title::before {
           font-size: 0.5625rem;
           margin-right: 0.0625rem;
         }
         
         /* Layout em grid nano-compacto */
         .nano-mode .settings-grid {
           gap: 0.0625rem;
         }
         
         /* Cards nano-compactos */
         .nano-mode .compact-card {
           padding: 0.0625rem;
           margin-bottom: 0.03125rem;
           border-radius: 1px;
         }
         
         /* Botão nano-compacto ativo */
         .nano-mode .nano-compact-btn {
           background: var(--accent-color);
           color: white;
         }
         
         /* Otimizações nano-compactas adicionais */
         .nano-mode .settings-container {
           line-height: 0.9;
         }
         
         .nano-mode .content-section {
           line-height: 0.9;
         }
         
         .nano-mode .setting-item {
           line-height: 0.9;
         }
         
         .nano-mode .setting-label + .setting-description {
           margin-top: 0.015625rem;
         }
         
         .nano-mode .users-list > * + *,
         .nano-mode .invitations-list > * + *,
         .nano-mode .budgets-list > * + * {
           margin-top: 0.03125rem;
         }
         
         .nano-mode .privacy-button,
         .nano-mode .share-button,
         .nano-mode .create-button,
         .nano-mode .app-button {
           line-height: 0.9;
           min-height: auto;
         }
         
         .nano-mode .form-input {
           line-height: 0.9;
           min-height: auto;
         }

      /* Header da página */
      .settings-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid #e5e7eb;
      }

      .page-title {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .page-subtitle {
        color: #6b7280;
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }

      .header-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .action-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        transition: all 0.2s ease;
        border: none;
        cursor: pointer;
      }

      .action-button.primary {
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
      }

      .action-button.secondary {
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #d1d5db;
      }

      .action-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      /* Seções de conteúdo */
      .content-section {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: none;
      }

      .section-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 1rem;
        padding-left: 0.5rem;
        border-left: 4px solid #4f46e5;
      }

      /* Card do orçamento */
      .budget-card {
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .budget-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .budget-icon {
        font-size: 2rem;
        opacity: 0.8;
      }

      .budget-info {
        flex: 1;
      }

      .budget-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
      }

      .budget-status {
        font-size: 0.875rem;
        color: #059669;
        font-weight: 500;
      }

      .edit-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: background-color 0.2s ease;
      }

      .edit-button:hover {
        background: #f3f4f6;
      }

      .budget-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: white;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }

      .detail-label {
        font-size: 0.875rem;
        color: #6b7280;
      }

      .detail-value {
        font-weight: 500;
        color: #1f2937;
      }

      /* Listas de usuários e convites */
      .users-list,
      .invitations-list,
      .budgets-list {
        space-y: 0.75rem;
      }

      .user-item,
      .invitation-item,
      .budget-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .user-item:hover,
      .invitation-item:hover,
      .budget-item:hover {
        background: #f3f4f6;
        transform: translateY(-1px);
      }

      .budget-item.active {
        border-color: #4f46e5;
        background: #f0f4ff;
      }

      .budget-item-status {
        font-size: 0.75rem;
        color: #059669;
        font-weight: 600;
        margin-top: 0.25rem;
      }

      .current-budget-badge {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        background: #dcfce7;
        color: #059669;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .current-icon {
        font-size: 1rem;
      }

      .current-text {
        font-size: 0.75rem;
      }

      .user-info,
      .invitation-info,
      .budget-item-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
      }

      .user-avatar {
        font-size: 1.5rem;
        opacity: 0.7;
      }

      .user-email,
      .invitation-email,
      .budget-item-name {
        font-weight: 500;
        color: #1f2937;
      }

      .user-role,
      .invitation-date,
      .budget-item-date {
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.25rem;
      }

      .user-date {
        font-size: 0.75rem;
        color: #9ca3af;
        margin-top: 0.25rem;
      }

      .invitation-status {
        font-size: 0.875rem;
        color: #f59e0b;
        font-weight: 500;
        margin-top: 0.25rem;
      }

      .section-description {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 1rem;
        font-style: italic;
      }

      .empty-state {
        text-align: center;
        padding: 2rem;
        background: #f9fafb;
        border: 2px dashed #d1d5db;
        border-radius: 12px;
        color: #6b7280;
      }

      .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
      }

      .empty-text {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #374151;
      }

      .empty-description {
        font-size: 0.875rem;
        color: #9ca3af;
      }

      .share-info {
        margin-top: 1rem;
        padding: 1rem;
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 8px;
      }

      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .info-icon {
        font-size: 1rem;
        margin-top: 0.125rem;
      }

      .info-text {
        font-size: 0.875rem;
        color: #0369a1;
        line-height: 1.4;
      }

      .color-theme-selector {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .color-option {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 2px solid #e5e7eb;
        background: white;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .color-option:hover {
        transform: scale(1.1);
        border-color: #9ca3af;
      }

      .color-option.active {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
      }

      .color-preview {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      .color-option.blue .color-preview {
        background: #3B82F6;
      }

      .color-option.green .color-preview {
        background: #10B981;
      }

      .color-option.purple .color-preview {
        background: #8B5CF6;
      }

      .color-option.orange .color-preview {
        background: #F59E0B;
      }

      /* Botões de ação */
      .remove-button,
      .cancel-button,
      .switch-button,
      .delete-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .remove-button:hover,
      .cancel-button:hover {
        background: #fee2e2;
        color: #dc2626;
      }

      .user-actions,
      .invitation-actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .remove-user-button,
      .cancel-invitation-button,
      .resend-invitation-button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .remove-user-button {
        background: #fee2e2;
        color: #dc2626;
      }

      .remove-user-button:hover {
        background: #fecaca;
        transform: translateY(-1px);
      }

      .cancel-invitation-button {
        background: #fee2e2;
        color: #dc2626;
      }

      .cancel-invitation-button:hover {
        background: #fecaca;
        transform: translateY(-1px);
      }

      .resend-invitation-button {
        background: #dbeafe;
        color: #2563eb;
      }

      .resend-invitation-button:hover {
        background: #bfdbfe;
        transform: translateY(-1px);
      }

      .remove-text,
      .cancel-text,
      .resend-text {
        font-size: 0.75rem;
      }

      .enter-budget-button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: auto;
  touch-action: manipulation;
  width: 100%;
  position: relative;
  z-index: 2;
  -webkit-user-select: none;
  user-select: none;
      }

      /* Garantir cursor de mão e evitar seleção de texto dentro do botão */
      .enter-budget-button *,
      .budget-item[role="button"],
      .budget-item[role="button"] * {
        cursor: pointer !important;
        -webkit-user-select: none;
        user-select: none;
      }

      .enter-budget-button:hover {
        background: linear-gradient(135deg, #059669, #047857);
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      }

      .enter-icon {
        font-size: 1rem;
      }

      .enter-text {
        font-size: 0.75rem;
      }

      .switch-button:hover {
        background: #dbeafe;
        color: #2563eb;
      }

      .delete-button:hover {
        background: #fee2e2;
        color: #dc2626;
      }

      .leave-button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        background: #fee2e2;
        color: #dc2626;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .leave-button:hover {
        background: #fecaca;
        transform: translateY(-1px);
      }

      .leave-icon { font-size: 1rem; }
      .leave-text { font-size: 0.75rem; }

      .delete-button .delete-text { font-size: 0.75rem; margin-left: 0.25rem; }

      /* Ações do item de orçamento - layout responsivo */
      .budget-item-actions {
  display: grid;
        grid-template-columns: 1fr;
        gap: 0.35rem;
        align-items: stretch;
        min-width: 9rem;
  position: relative;
  z-index: 5;
      }

      .budget-item-actions .actions-row {
        display: flex;
        gap: 0.35rem;
        align-items: center;
        flex-wrap: wrap;
  position: relative;
  z-index: 1;
      }

      .budget-item-actions .actions-row.primary > .enter-budget-button,
      .budget-item-actions .actions-row.primary > .current-budget-badge {
        flex: 1 1 auto;
      }

      .budget-item-actions .actions-row.primary {
        width: 100%;
      }

      .budget-item-actions .actions-row.secondary {
        justify-content: flex-end;
        width: 100%;
      }

      .budget-item-actions .copy-id-button { white-space: nowrap; }

      @media (max-width: 480px) {
        .budget-item { flex-direction: column; align-items: stretch; }
        .budget-item-info { margin-bottom: 0.5rem; }
        .budget-item-actions { grid-template-columns: 1fr; }
        .budget-item-actions .actions-row.primary,
        .budget-item-actions .actions-row.secondary {
          justify-content: stretch;
        }
        .budget-item-actions .actions-row.secondary > .copy-id-button,
        .budget-item-actions .actions-row.secondary > .delete-button {
          flex: 1 1 auto;
        }
      }

      @media (min-width: 481px) {
        .budget-item-actions { grid-template-columns: auto auto; }
        .budget-item-actions .actions-row.primary { justify-content: flex-start; }
        .budget-item-actions .actions-row.secondary { justify-content: flex-end; }
      }

      /* Formulário de compartilhamento */

  /* Tornar cartões clicáveis visíveis como interativos */
  .budget-item[role="button"] { cursor: pointer; }
  .budget-item[role="button"]:hover { background: rgba(16,185,129,0.06); }
      .share-form {
        display: flex;
        gap: 1rem;
        align-items: end;
        flex-wrap: wrap;
      }

      .input-group {
        flex: 1;
        min-width: 250px;
      }

      .input-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 0.5rem;
      }

      .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s ease;
      }

      .form-input:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      }

      .share-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .share-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
      }

      /* Botão criar orçamento */
      .create-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 1rem;
      }

      .create-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
      }

      /* Ações de privacidade */
      .privacy-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .privacy-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .privacy-button:hover {
        background: #f3f4f6;
        transform: translateY(-1px);
      }

      .privacy-button.danger {
        color: #dc2626;
        border-color: #fecaca;
      }

      .privacy-button.danger:hover {
        background: #fee2e2;
      }

      /* Informações sobre o app */
      .about-info {
        space-y: 0.75rem;
      }

      .about-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
      }

      .about-label {
        font-weight: 500;
        color: #374151;
      }

      .about-value {
        color: #6b7280;
      }

      /* Configurações de notificações e interface */
      .notifications-settings,
      .interface-settings,
      .privacy-settings {
        space-y: 1rem;
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .setting-item:hover {
        background: #f3f4f6;
      }

      .setting-info {
        flex: 1;
      }

      .setting-label {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }

      .setting-description {
        font-size: 0.875rem;
        color: #6b7280;
      }

      /* Toggle Switch */
      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 24px;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .toggle-slider {
        background-color: #4f46e5;
      }

      input:checked + .toggle-slider:before {
        transform: translateX(26px);
      }

      /* Botão de tema */
      .theme-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .theme-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
      }

      /* Ações do app */
      .app-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
      }

      .app-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .app-button:hover {
        background: #f3f4f6;
        transform: translateY(-1px);
      }

      /* Responsividade */
      @media (max-width: 768px) {
        .settings-container {
          padding: 0.5rem;
        }

        .page-title {
          font-size: 1.5rem;
        }

        .header-actions {
          flex-direction: column;
        }

        .action-button {
          width: 100%;
          justify-content: center;
        }

        .share-form {
          flex-direction: column;
        }

        .input-group {
          min-width: auto;
        }

        .privacy-actions {
          grid-template-columns: 1fr;
        }

        .budget-details {
          grid-template-columns: 1fr;
        }

        .app-actions {
          grid-template-columns: 1fr;
        }

        .setting-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .toggle-switch {
          align-self: flex-end;
        }

        .user-actions,
        .invitation-actions {
          flex-direction: column;
          gap: 0.5rem;
        }

        .remove-user-button,
        .cancel-invitation-button,
        .resend-invitation-button {
          width: 100%;
          justify-content: center;
        }

        .enter-budget-button {
          width: 100%;
          justify-content: center;
        }

        .current-budget-badge {
          width: 100%;
          justify-content: center;
        }
      }

      /* Estilos para modais de ajuda e avaliação */
      .help-content,
      .rating-content {
        max-width: 500px;
        margin: 0 auto;
      }

      .help-section {
        margin-bottom: 1.5rem;
      }

      .help-section h4 {
        color: #4f46e5;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .help-section ul {
        list-style: none;
        padding-left: 0;
      }

      .help-section li {
        padding: 0.25rem 0;
        color: #374151;
      }

      .help-section li:before {
        content: "•";
        color: #4f46e5;
        font-weight: bold;
        margin-right: 0.5rem;
      }

      .rating-stars {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin: 1rem 0;
      }

      .star {
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #ccc;
      }

      .star:hover {
        transform: scale(1.1);
      }

      .rating-text {
        text-align: center;
        color: #6b7280;
        margin-bottom: 1rem;
      }

      .submit-rating-btn {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .submit-rating-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
      }

      /* Dark theme overrides (inline to ensure precedence in Settings) */
      .dark .content-section { background: transparent !important; }

      /* Rows and cards inside sections */
      .dark .setting-item,
      .dark .about-item,
      .dark .detail-item {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid #374151 !important; /* gray-700 */
        box-shadow: none !important;
      }

      /* Labels and descriptions */
      .dark .setting-label { color: #e5e7eb !important; }
      .dark .setting-description { color: #9ca3af !important; }
      .dark .about-label { color: #9ca3af !important; }
      .dark .about-value { color: #e5e7eb !important; }

      /* App action buttons */
      .dark .app-button {
        background: #111827 !important; /* gray-900 */
        border: 1px solid #374151 !important; /* gray-700 */
        color: #e5e7eb !important; /* text-gray-200 */
      }
      .dark .app-button:hover { background: #1f2937 !important; /* gray-800 */ }
      .dark .app-button .app-text { color: #e5e7eb !important; }

      /* Toggles */
      .dark .toggle-slider { background-color: #374151 !important; }
      .dark .toggle-slider:before { background-color: #e5e7eb !important; }
      .dark input:checked + .toggle-slider { background-color: var(--primary-color, #4f46e5) !important; }
    </style>
  `;try{(()=>{try{return localStorage.getItem("lastSeenChangelogVersion")||""}catch{return""}})()!==u&&window.Snackbar&&window.Snackbar({message:`Atualizado para ${u}. Ver o que mudou?`,type:"info",duration:6e3,actionText:"Abrir",onAction:()=>{try{window.openChangelogModal&&window.openChangelogModal()}catch{}}})}catch{}try{typeof window.openChangelogModal!="function"&&(window.openChangelogModal=async()=>{try{const{getChangeLog:a,getLatestChangeLog:d}=await z(async()=>{const{getChangeLog:$,getLatestChangeLog:N}=await import("./changelog-D7_yxjKD.js");return{getChangeLog:$,getLatestChangeLog:N}},[]),s=a(u)||d(),f=s?.title||`Novidades — versão ${u}`,p=(s?.items||[]).slice(0,5).map($=>`<li class="mb-1">${$}</li>`).join(""),h=`
            <div class="text-sm text-gray-700 dark:text-gray-200">
              ${s?.date?`<div class="text-xs text-gray-500 mb-2">${new Date(s.date).toLocaleDateString("pt-BR")}</div>`:""}
              <ul class="list-disc pl-5">${p||"<li>Nesta versão, aplicamos melhorias e correções.</li>"}</ul>
            </div>
          `,{Modal:x}=await z(async()=>{const{Modal:$}=await import("./main-BVWxnpqW.js").then(N=>N.O);return{Modal:$}},__vite__mapDeps([0,1])),v=x({title:f,content:h,onClose:()=>v?.remove()});document.body.appendChild(v);try{localStorage.setItem("lastSeenChangelogVersion",u)}catch{}}catch(a){console.error("Erro ao abrir changelog:",a),window.Snackbar?.({message:"Não foi possível abrir as novidades agora.",type:"error"})}})}catch{}try{const a=String(window.location?.hash||""),d=a.indexOf("?");if(d!==-1){const m=(new URLSearchParams(a.substring(d+1)).get("section")||"").toLowerCase(),p=m&&(m.includes("notif")?"section-notifications":m.includes("sobre")||m.includes("about")||m.includes("app")?"section-about":m.includes("dados")||m.includes("privacidade")||m.includes("data")?"section-data-privacy":m.includes("seguranca")||m.includes("segurança")||m.includes("privacy")?"section-privacy-security":"");p&&setTimeout(()=>{const h=document.getElementById(p);h&&typeof h.scrollIntoView=="function"&&h.scrollIntoView({behavior:"smooth",block:"start"})},0)}}catch{}try{typeof window<"u"&&setTimeout(()=>{try{typeof window<"u"&&typeof window.updateSwStatus=="function"&&window.updateSwStatus()}catch{}},50)}catch{}try{typeof window<"u"&&setTimeout(()=>{try{typeof window<"u"&&typeof window.updateNetworkStatus=="function"&&window.updateNetworkStatus()}catch{}try{const a=typeof localStorage<"u"&&localStorage.getItem?localStorage.getItem("sw_last_check"):null,d=typeof document<"u"&&document.getElementById?document.getElementById("sw-last-check"):null;a&&d&&(d.textContent=new Date(parseInt(a,10)).toLocaleString())}catch{}},20)}catch{}try{const a=document.getElementById("btn-logout");a&&typeof window.handleLogoutClick=="function"&&!a.__boundLogout&&(a.addEventListener("click",d=>{try{d?.preventDefault?.()}catch{}window.handleLogoutClick()}),a.__boundLogout=!0)}catch(a){console.warn("SettingsPage: erro ao vincular handler de logout:",a)}try{const{loadPrefs:a,savePrefs:d,applyPrefs:s}=await z(async()=>{const{loadPrefs:h,savePrefs:x,applyPrefs:v}=await import("./snackbarPrefs-BEdSEys5.js");return{loadPrefs:h,savePrefs:x,applyPrefs:v}},__vite__mapDeps([4,0,1])),f=a(),m=h=>document.getElementById(h),p=(h,x)=>{const v=m(h);v&&(v.type==="checkbox"?v.checked=!!x:v.value=x??"")};p("snk-duration",f.defaultDuration),p("snk-bottom",f.bottom),p("snk-position",f.position),p("snk-align",f.align),p("snk-hoverPause",f.hoverPause),p("snk-maxQueue",f.maxQueue),p("snk-cooldown",f.cooldownMs),typeof window.saveSnackbarPrefs!="function"&&(window.saveSnackbarPrefs=function(){try{const x={defaultDuration:parseInt(m("snk-duration")?.value||"3000",10),bottom:parseInt(m("snk-bottom")?.value||"80",10),position:String(m("snk-position")?.value||"bottom"),align:String(m("snk-align")?.value||"center"),hoverPause:!!m("snk-hoverPause")?.checked,maxQueue:parseInt(m("snk-maxQueue")?.value||"5",10),cooldownMs:parseInt(m("snk-cooldown")?.value||"500",10)},v=d(x);s(v),window.Snackbar?.({message:"Preferências de toasts aplicadas",type:"success"})}catch(x){console.warn("saveSnackbarPrefs error:",x),window.Snackbar?.({message:"Falha ao aplicar preferências",type:"error"})}}),typeof window.resetSnackbarPrefs!="function"&&(window.resetSnackbarPrefs=function(){try{z(async()=>{const{defaults:x}=await import("./snackbarPrefs-BEdSEys5.js");return{defaults:x}},__vite__mapDeps([4,0,1])).then(({defaults:x})=>{localStorage.removeItem("snackbar_prefs_v1");const v=s(x);p("snk-duration",v.defaultDuration),p("snk-bottom",v.bottom),p("snk-position",v.position),p("snk-align",v.align),p("snk-hoverPause",v.hoverPause),p("snk-maxQueue",v.maxQueue),p("snk-cooldown",v.cooldownMs),window.Snackbar?.({message:"Preferências restauradas",type:"info"})}).catch(x=>{console.warn("resetSnackbarPrefs dynamic import error:",x),window.Snackbar?.({message:"Falha ao restaurar preferências",type:"error"})})}catch(x){console.warn("resetSnackbarPrefs error:",x),window.Snackbar?.({message:"Falha ao restaurar preferências",type:"error"})}})}catch(a){console.warn("Settings: falha ao hidratar controles de Snackbar:",a)}try{const{createPeriodIndicator:a}=await z(async()=>{const{createPeriodIndicator:s}=await import("./PeriodIndicator-D8LjbqJK.js");return{createPeriodIndicator:s}},[]),d=document.getElementById("settings-period-indicator");d&&(d.innerHTML="",d.appendChild(a({readonly:!0})))}catch(a){console.warn("Settings PeriodIndicator indisponível:",a)}const M=document.getElementById("theme-toggle-btn");M&&M.addEventListener("click",()=>{window.setupThemeToggle&&window.setupThemeToggle()})}try{if(typeof window<"u"){window.renderSettings=q;try{const{eventBus:t}=await z(async()=>{const{eventBus:e}=await import("./main-BVWxnpqW.js").then(o=>o.N);return{eventBus:e}},__vite__mapDeps([0,1]));window.__settingsPeriodListenerBound||(window.__settingsPeriodListenerBound=!0,t.on("period:changed",()=>{try{(window.location.hash||"").split("?")[0]==="#/settings"&&queueMicrotask(()=>{try{q()}catch{}})}catch{}}))}catch{}}}catch{}function P(t=0){try{if(!((window.location?.hash||"").split("?")[0]==="#/settings"))return;const i=()=>{try{window.renderSettings&&window.renderSettings()}catch{}};t>0?setTimeout(i,t):i()}catch{}}window.editBudgetName=function(){const t=window.appState?.currentBudget;if(!t){window.Snackbar?.({message:"Nenhum orçamento selecionado",type:"warning"});return}const e=prompt("Digite o novo nome do orçamento:",t.nome);e&&e.trim()&&e!==t.nome&&(async()=>{try{if(typeof window.updateBudget=="function"){await window.updateBudget(t.id,{nome:e.trim()});const o=(window.appState?.budgets||[]).findIndex(n=>n.id===t.id);o!==-1&&(window.appState.budgets[o].nome=e.trim()),window.appState?.currentBudget&&(window.appState.currentBudget.nome=e.trim()),window.Snackbar?.({message:"Orçamento atualizado!",type:"success"}),P(300)}else window.Snackbar?.({message:"Ação indisponível no momento",type:"error"})}catch(o){console.error("Erro ao renomear orçamento:",o),window.Snackbar?.({message:"Erro ao renomear orçamento",type:"error"})}})()};window.removeUserFromBudget=function(t,e){if(confirm(`Tem certeza que deseja remover o usuário "${e}" do orçamento?

Esta ação irá revogar o acesso deste usuário ao orçamento.`)&&(console.log("Remover usuário do orçamento:",t,e),window.appState?.currentBudget)){const o=window.appState.currentBudget.id,n=window.appState.currentBudget.usuariosPermitidos?.filter(r=>r!==t)||[],i=O(I,"budgets",o);U(i,{usuariosPermitidos:n}).then(()=>{window.Snackbar?.({message:`Usuário "${e}" removido com sucesso!`,type:"success"}),setTimeout(()=>{P()},1e3)}).catch(r=>{console.error("Erro ao remover usuário:",r),window.Snackbar?.({message:"Erro ao remover usuário. Tente novamente.",type:"error"})})}};window.removeUser=function(t){window.removeUserFromBudget(t,"Usuário")};window.cancelInvitation=function(t,e){if(confirm(`Tem certeza que deseja cancelar o convite enviado para "${e}"?

Este convite será removido permanentemente.`)){console.log("Cancelar convite:",t,e);const o=O(I,"budgetInvitations",t);H(o).then(()=>{window.Snackbar?.({message:`Convite para "${e}" cancelado com sucesso!`,type:"success"}),setTimeout(()=>{P()},1e3)}).catch(n=>{console.error("Erro ao cancelar convite:",n),window.Snackbar?.({message:"Erro ao cancelar convite. Tente novamente.",type:"error"})})}};window.resendInvitation=function(t,e){confirm(`Deseja reenviar o convite para "${e}"?

Um novo email será enviado para o usuário.`)&&(console.log("Reenviar convite:",t,e),window.Snackbar?.({message:`Convite reenviado para "${e}"!`,type:"success"}))};window.enterBudget=async function(t,e){try{const o=window.appState?.currentUser;if(!o){window.Snackbar?.({message:"Faça login para entrar no orçamento.",type:"warning"});try{typeof window.toggleLoginPage=="function"&&window.toggleLoginPage(!0)}catch{}return}let n=window.appState?.budgets?.find(r=>r.id===t);if(!n)try{const{getById:r,loadUserBudgets:l}=await z(async()=>{const{getById:u,loadUserBudgets:w}=await import("./main-BVWxnpqW.js").then(k=>k.T);return{getById:u,loadUserBudgets:w}},__vite__mapDeps([0,1]));n=await r(t),n||(await l(o.uid),n=window.appState?.budgets?.find(u=>u.id===t)||null)}catch(r){console.warn("Não foi possível resolver orçamento por ID:",r)}if(!n){window.Snackbar?.({message:"Orçamento não encontrado para este usuário.",type:"error"});return}const i=e||n&&(n.nome||n.name)||"Orçamento";window.Snackbar?.({message:`Entrando no orçamento "${i}"...`,type:"info"});try{const r=await z(()=>import("./main-BVWxnpqW.js").then(l=>l.T),__vite__mapDeps([0,1]));typeof r.setCurrentBudgetGlobal=="function"?await r.setCurrentBudgetGlobal(n):typeof r.setCurrentBudget=="function"?r.setCurrentBudget(n):typeof window.setCurrentBudget=="function"?await window.setCurrentBudget(n):(window.appState=window.appState||{},window.appState.currentBudget=n)}catch(r){console.warn("Falha ao definir orçamento via serviço, aplicando fallback mínimo:",r),window.appState=window.appState||{},window.appState.currentBudget=n}try{console.log("[EnterBudget] datasets:",{tx:window.appState?.transactions?.length||0,cat:window.appState?.categories?.length||0,rec:window.appState?.recorrentes?.length||0})}catch{}try{const r=Array.isArray(window.appState?.transactions)?window.appState.transactions:[],l=c=>{if(!c)return null;if(c.toDate)return c.toDate();if(typeof c=="object"&&c.seconds)return new Date(c.seconds*1e3);const S=new Date(c);return isNaN(S)?null:S},u=typeof window.getSelectedPeriod=="function"?window.getSelectedPeriod():null,w=u?`${u.year}-${String(u.month).padStart(2,"0")}`:null,k=c=>`${c.getFullYear()}-${String(c.getMonth()+1).padStart(2,"0")}`,g=r.map(c=>({t:c,d:l(c.createdAt)||l(c.data)})).filter(c=>!!c.d);if(!(w?g.some(c=>k(c.d)===w):!1)&&g.length){g.sort((S,y)=>y.d-S.d);const c=g[0].d;typeof window.setSelectedPeriod=="function"&&window.setSelectedPeriod(c.getFullYear(),c.getMonth()+1,{path:"/dashboard"})}}catch{}try{window.location.hash="#/dashboard"}catch{}try{window.renderDashboard&&setTimeout(()=>window.renderDashboard(),100)}catch{}try{window.renderBottomNav&&setTimeout(()=>window.renderBottomNav("/dashboard"),150)}catch{}window.Snackbar?.({message:`Orçamento "${i}" ativado com sucesso!`,type:"success"});try{(Array.isArray(window.appState?.transactions)?window.appState.transactions:[]).length===0&&window.Snackbar?.({message:"Nenhum lançamento encontrado. Use o seletor de mês no topo ou migre dados antigos em Configurações.",type:"info"})}catch{}P(300)}catch(o){console.error("Erro ao entrar no orçamento:",o),window.Snackbar?.({message:"Erro ao entrar no orçamento. Tente novamente.",type:"error"})}};window.switchBudget=function(t){const e=window.appState?.budgets?.find(o=>o.id===t);e&&window.enterBudget(t,e.nome)};window.deleteBudgetFromSettings=function(t){const e=window.appState?.budgets?.find(o=>o.id===t);e&&confirm(`Tem certeza que deseja excluir o orçamento "${e.nome}"?

⚠️ Esta ação não pode ser desfeita e você perderá todos os dados deste orçamento.`)&&window.deleteBudget&&window.deleteBudget(t).then(async()=>{P()}).catch(o=>{console.error("Erro ao excluir orçamento:",o)})};window.createNewBudget=function(){const t=prompt("Digite o nome do novo orçamento:");t&&t.trim()&&window.addBudget&&window.addBudget(t.trim()).then(async()=>{P()}).catch(e=>{console.error("Erro ao criar orçamento:",e)})};window.copyBudgetId=async function(t,e){try{if(!t)return;if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(t);else{const o=document.createElement("textarea");o.value=t,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o)}if(window.Snackbar?.({message:"ID copiado para a área de transferência",type:"success"}),e&&e instanceof HTMLElement){const o=e.textContent;e.textContent="Copiado!",e.disabled=!0,e.classList.add("opacity-70"),setTimeout(()=>{e.textContent=o||"Copiar ID",e.disabled=!1,e.classList.remove("opacity-70")},1200)}}catch(o){console.error("Falha ao copiar ID:",o),window.Snackbar?.({message:"Não foi possível copiar o ID",type:"error"})}};window.exportData=function(){if(console.log("📤 Iniciando exportação de dados..."),window.showExportOptions){console.log("🔧 Usando função global de exportação"),window.showExportOptions();return}console.log("📋 Mostrando modal de exportação básico"),window.showModal?window.showModal(`
    <div class="export-modal">
      <h3>📤 Exportar Dados</h3>
      <p>Escolha o formato de exportação:</p>
      
      <div class="export-options">
        <button onclick="exportToJSON()" class="export-option">
          <span class="export-icon">📄</span>
          <span class="export-text">JSON (Backup Completo)</span>
        </button>
        
        <button onclick="exportToExcel()" class="export-option">
          <span class="export-icon">📊</span>
          <span class="export-text">Excel (Planilha)</span>
        </button>
        
        <button onclick="exportToPDF()" class="export-option">
          <span class="export-icon">📋</span>
          <span class="export-text">PDF (Relatório)</span>
        </button>
      </div>
      
      <button onclick="closeModal()" class="close-button">Fechar</button>
    </div>
  `):alert("Funcionalidade de exportação em desenvolvimento. Use a função global showExportOptions.")};window.importData=function(){const t=document.createElement("input");t.type="file",t.accept=".json",t.onchange=function(e){const o=e.target.files[0];if(o){const n=new FileReader;n.onload=function(i){try{const r=JSON.parse(i.target.result);console.log("Dados importados:",r),window.Snackbar?.({message:"Funcionalidade de importação em desenvolvimento",type:"info"})}catch{window.Snackbar?.({message:"Arquivo inválido",type:"error"})}},n.readAsText(o)}},t.click()};window.clearData=function(){confirm(`⚠️ ATENÇÃO: Esta ação irá limpar TODOS os dados do orçamento atual!

Tem certeza que deseja continuar?

Esta ação não pode ser desfeita.`)&&confirm("ÚLTIMA CONFIRMAÇÃO: Você tem certeza absoluta que deseja limpar todos os dados?")&&(console.log("Limpar dados do orçamento"),window.Snackbar?.({message:"Funcionalidade em desenvolvimento",type:"info"}))};window.toggleTheme=function(){console.log("🎨 Alternando tema...");const t=document.documentElement,e=document.body,o=t.classList.contains("dark")||e.classList.contains("dark");console.log("🌙 Estado atual do tema:",o?"escuro":"claro"),o?(t.classList.remove("dark"),e.classList.remove("dark"),localStorage.setItem("theme","light"),localStorage.setItem("darkMode","false"),console.log("☀️ Tema alterado para claro")):(t.classList.add("dark"),e.classList.add("dark"),localStorage.setItem("theme","dark"),localStorage.setItem("darkMode","true"),console.log("🌙 Tema alterado para escuro"));const n=document.querySelector(".theme-button .theme-icon");n?(n.textContent=o?"☀️":"🌙",console.log("🔧 Ícone atualizado para:",o?"☀️":"🌙")):console.log("🔧 Botão de tema não encontrado"),window.Snackbar?.({message:`Tema alterado para ${o?"claro":"escuro"}`,type:"success"}),setTimeout(()=>{document.querySelectorAll('[class*="dark:"]').forEach(r=>{r.offsetHeight}),console.log("🎨 Elementos de tema atualizados")},100)};window.initializeThemeIcon=function(){const t=document.documentElement,e=document.body,o=t.classList.contains("dark")||e.classList.contains("dark"),n=document.querySelector(".theme-button .theme-icon");n&&(n.textContent=o?"🌙":"☀️",console.log("🔧 Ícone inicializado para:",o?"🌙":"☀️"))};window.setColorTheme=function(t){console.log("🎨 Definindo tema de cor:",t),document.querySelectorAll(".color-option").forEach(o=>{o.classList.remove("active")});const e=document.querySelector(`.color-option.${t}`);e&&e.classList.add("active"),document.documentElement.setAttribute("data-theme-color",t),localStorage.setItem("colorTheme",t),window.Snackbar?.({message:`Tema de cor alterado para ${t}`,type:"success"}),console.log("✅ Tema de cor aplicado:",t)};window.initializeColorTheme=function(){const t=localStorage.getItem("colorTheme")||"blue";console.log("🎨 Inicializando tema de cor:",t),window.setColorTheme(t)};window.toggleCompactMode=function(t){console.log("📱 Alternando modo ultra-compacto:",t);const e=document.querySelector(".settings-container"),o=document.querySelector(".app-container"),n=document.body;if(!e)return;t?(e.classList.add("compact-mode"),o&&o.classList.add("compact-mode"),n.classList.add("compact-mode"),localStorage.setItem("compactMode","true"),console.log("✅ Modo compacto ativado")):(e.classList.remove("compact-mode"),e.classList.remove("micro-mode"),e.classList.remove("nano-mode"),o&&(o.classList.remove("compact-mode"),o.classList.remove("micro-mode"),o.classList.remove("nano-mode")),n.classList.remove("compact-mode"),n.classList.remove("micro-mode"),n.classList.remove("nano-mode"),localStorage.setItem("compactMode","false"),localStorage.setItem("microMode","false"),localStorage.setItem("nanoMode","false"),localStorage.setItem("autoCompact","false"),console.log("✅ Modo compacto desativado"));const i=document.querySelector(".micro-compact-btn"),r=document.querySelector(".nano-compact-btn");i&&i.classList.remove("active"),r&&r.classList.remove("active"),window.Snackbar?.({message:`Interface ${t?"ultra-compactada":"normal"}`,type:"success"}),setTimeout(()=>{e.offsetHeight,o&&o.offsetHeight},50)};window.toggleMicroMode=function(){console.log("📱 Alternando modo micro-compacto");const t=document.querySelector(".settings-container"),e=document.querySelector(".app-container"),o=document.body,n=document.querySelector(".micro-compact-btn"),i=document.querySelector(".nano-compact-btn");if(!t||!n)return;t.classList.contains("micro-mode")?(t.classList.remove("micro-mode"),e&&e.classList.remove("micro-mode"),o.classList.remove("micro-mode"),n.classList.remove("active"),localStorage.setItem("microMode","false"),console.log("✅ Modo micro-compacto desativado"),window.Snackbar?.({message:"Modo micro-compacto desativado",type:"success"})):(t.classList.contains("compact-mode")||(t.classList.add("compact-mode"),e&&e.classList.add("compact-mode"),o.classList.add("compact-mode"),localStorage.setItem("compactMode","true")),t.classList.add("micro-mode"),e&&e.classList.add("micro-mode"),o.classList.add("micro-mode"),n.classList.add("active"),localStorage.setItem("microMode","true"),console.log("✅ Modo micro-compacto ativado"),window.Snackbar?.({message:"Modo micro-compacto ativado",type:"success"})),t.classList.contains("nano-mode")&&(t.classList.remove("nano-mode"),e&&e.classList.remove("nano-mode"),o.classList.remove("nano-mode"),i&&i.classList.remove("active"),localStorage.setItem("nanoMode","false")),setTimeout(()=>{t.offsetHeight,e&&e.offsetHeight},50)};window.toggleNanoMode=function(){console.log("📱 Alternando modo nano-compacto");const t=document.querySelector(".settings-container"),e=document.querySelector(".app-container"),o=document.body,n=document.querySelector(".nano-compact-btn"),i=document.querySelector(".micro-compact-btn");if(!t||!n)return;t.classList.contains("nano-mode")?(t.classList.remove("nano-mode"),e&&e.classList.remove("nano-mode"),o.classList.remove("nano-mode"),n.classList.remove("active"),localStorage.setItem("nanoMode","false"),console.log("✅ Modo nano-compacto desativado"),window.Snackbar?.({message:"Modo nano-compacto desativado",type:"success"})):(t.classList.contains("compact-mode")||(t.classList.add("compact-mode"),e&&e.classList.add("compact-mode"),o.classList.add("compact-mode"),localStorage.setItem("compactMode","true")),t.classList.contains("micro-mode")||(t.classList.add("micro-mode"),e&&e.classList.add("micro-mode"),o.classList.add("micro-mode"),i&&i.classList.add("active"),localStorage.setItem("microMode","true")),t.classList.add("nano-mode"),e&&e.classList.add("nano-mode"),o.classList.add("nano-mode"),n.classList.add("active"),localStorage.setItem("nanoMode","true"),console.log("✅ Modo nano-compacto ativado"),window.Snackbar?.({message:"Modo nano-compacto ativado",type:"success"})),setTimeout(()=>{t.offsetHeight,e&&e.offsetHeight},50)};window.initializeCompactMode=function(){const t=localStorage.getItem("compactMode")==="true",e=localStorage.getItem("autoCompact")==="true",o=localStorage.getItem("microMode")==="true",n=localStorage.getItem("nanoMode")==="true";console.log("📱 Inicializando modo compacto:",t,"Auto:",e,"Micro:",o,"Nano:",n),(window.innerWidth<=480||window.innerHeight<=600)&&!e&&(console.log("📱 Tela pequena detectada, aplicando auto-compacto"),localStorage.setItem("autoCompact","true"),localStorage.setItem("compactMode","true"));const r=document.getElementById("compact-interface");r&&(r.checked=t||e),window.toggleCompactMode(t||e),o&&setTimeout(()=>{window.toggleMicroMode()},100),n&&setTimeout(()=>{window.toggleNanoMode()},200)};window.handleResize=function(){const t=window.innerWidth<=480||window.innerHeight<=600,e=localStorage.getItem("autoCompact")==="true";if(t&&!e){console.log("📱 Tela pequena detectada, aplicando auto-compacto"),localStorage.setItem("autoCompact","true"),localStorage.setItem("compactMode","true"),window.toggleCompactMode(!0);const o=document.getElementById("compact-interface");o&&(o.checked=!0)}else!t&&e&&(console.log("📱 Tela maior detectada, removendo auto-compacto"),localStorage.setItem("autoCompact","false"))};typeof window<"u"&&(typeof window.saveTxChunkSize!="function"&&(window.saveTxChunkSize=function(){try{const e=document.getElementById("tx-chunk-size");if(!e)return;const o=String(e.value||"").trim();if(o===""){localStorage.removeItem("txChunkSize"),window.Snackbar?.({message:"Ajuste automático ativado. Abra novamente a aba Transações.",type:"info"});return}const n=parseInt(o,10);if(Number.isNaN(n)||n<6||n>40){window.Snackbar?.({message:"Valor inválido. Use um número entre 6 e 40.",type:"warning"});return}localStorage.setItem("txChunkSize",String(n)),window.Snackbar?.({message:`Tamanho do bloco definido para ${n}. Abra novamente a aba Transações.`,type:"success"})}catch(e){console.warn("saveTxChunkSize error:",e),window.Snackbar?.({message:"Não foi possível salvar a configuração.",type:"error"})}}),typeof window.resetTxChunkSize!="function"&&(window.resetTxChunkSize=function(){try{localStorage.removeItem("txChunkSize");const e=document.getElementById("tx-chunk-size");e&&(e.value=""),window.Snackbar?.({message:"Configuração restaurada para automático.",type:"info"})}catch(e){console.warn("resetTxChunkSize error:",e)}}));window.setupSettingsPage=function(){const t=localStorage.getItem("txChunkSize"),e=localStorage.getItem("compactMode")==="true",o=localStorage.getItem("microMode")==="true",n=localStorage.getItem("nanoMode")==="true";if(t){const i=document.getElementById("tx-chunk-size");i&&(i.value=t)}e&&window.toggleCompactMode(!0),o&&window.toggleMicroMode(),n&&window.toggleNanoMode()};window.addEventListener("load",()=>{setTimeout(()=>{window.setupSettingsPage()},100)});export{q as renderSettings};
