const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CC7p0iPh.js","assets/PeriodIndicator-Jgj9UKJk.js","assets/TransactionsPage-B69YEa65.js","assets/UIService-oYvfKA8r.js","assets/perf-tobPnqr4.js","assets/CategoriesPage-DMafC1VW.js","assets/service-DfBWNOQV.js","assets/NotificationsPage-CV5pa1i9.js","assets/NotificationService-zMQk2mrd.js","assets/VoiceService-rO_19FQD.js","assets/VoiceSystem-DnucK-8W.js","assets/Snackbar-C1E5NQ3k.js","assets/snackbarPrefs-BEdSEys5.js","assets/showAddTransactionModal-C755oCIJ.js","assets/showAddCategoryModal-D4BNJS1x.js","assets/showAddRecorrenteModal-BHG6L474.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const gm="modulepreload",_m=function(n){return"/"+n},yu={},j=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){let l=function(d){return Promise.all(d.map(p=>Promise.resolve(p).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");i=l(t.map(d=>{if(d=_m(d),d in yu)return;yu[d]=!0;const p=d.endsWith(".css"),g=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${g}`))return;const y=document.createElement("link");if(y.rel=p?"stylesheet":gm,p||(y.as="script"),y.crossOrigin="",y.href=d,c&&y.setAttribute("nonce",c),document.head.appendChild(y),p)return new Promise((P,k)=>{y.addEventListener("load",P),y.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return i.then(a=>{for(const c of a||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})},Jt={"/":()=>j(()=>import("./index-CC7p0iPh.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12])).then(n=>({default:n.renderDashboard})),"/dashboard":()=>j(()=>import("./index-CC7p0iPh.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12])).then(n=>({default:n.renderDashboard})),"/transactions":()=>j(()=>import("./TransactionsPage-B69YEa65.js"),__vite__mapDeps([2,1,3,4])),"/categories":()=>j(()=>import("./CategoriesPage-DMafC1VW.js"),__vite__mapDeps([5,1,3,6])),"/recorrentes":()=>j(()=>import("./index-CC7p0iPh.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12])).then(n=>({default:n.renderRecorrentes})),"/analytics":()=>j(()=>import("./AnalyticsPage-Dm64L1rv.js"),[]),"/notifications":()=>j(()=>import("./NotificationsPage-CV5pa1i9.js"),__vite__mapDeps([7,1])),"/settings":()=>j(()=>import("./SettingsPage-sneCnyzV.js"),[])};async function ih(n){try{const e=(n||"/").split("?")[0]||"/",t=e==="/"?"/dashboard":e;console.log("🔄 Renderizando página:",t);const r=document.getElementById("app-content");if(Jt[t]){const i=await Jt[t]();let s=null;if(typeof i=="function"?s=i:i&&typeof i.default=="function"?s=i.default:i&&typeof i.render=="function"?s=i.render:i&&typeof i.renderNotifications=="function"&&(s=i.renderNotifications),typeof s=="function"){await s(r);try{const{scrollToTop:a}=await j(async()=>{const{scrollToTop:c}=await Promise.resolve().then(()=>Pn);return{scrollToTop:c}},void 0);a()}catch{}try{const{renderFAB:a}=await j(async()=>{const{renderFAB:c}=await import("./index-CC7p0iPh.js");return{renderFAB:c}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));a()}catch(a){console.warn("FAB render falhou:",a)}try{const{renderBottomNav:a}=await j(async()=>{const{renderBottomNav:l}=await import("./index-CC7p0iPh.js");return{renderBottomNav:l}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));a(t==="/"?"/dashboard":t)}catch(a){console.warn("Bottom nav render falhou:",a)}try{const{SwipeNavigation:a}=await j(async()=>{const{SwipeNavigation:c}=await import("./SwipeTabs-DedpaSIh.js");return{SwipeNavigation:c}},[]);if(!window.swipeNavigation)window.swipeNavigation=new a;else{try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(a){console.warn("Swipe Navigation não pôde ser inicializado/atualizado:",a)}console.log("✅ Página renderizada:",t)}else console.error("❌ Função de renderização não encontrada para:",t)}else if(console.warn("⚠️ Rota não encontrada:",t),Jt["/dashboard"]){const i=await Jt["/dashboard"]();await(i&&(i.default||i.render)||i)(r);try{const{scrollToTop:a}=await j(async()=>{const{scrollToTop:c}=await Promise.resolve().then(()=>Pn);return{scrollToTop:c}},void 0);a()}catch{}try{const{renderBottomNav:a}=await j(async()=>{const{renderBottomNav:c}=await import("./index-CC7p0iPh.js");return{renderBottomNav:c}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));a("/dashboard")}catch(a){console.warn("Bottom nav render (fallback) falhou:",a)}try{const{SwipeNavigation:a}=await j(async()=>{const{SwipeNavigation:c}=await import("./SwipeTabs-DedpaSIh.js");return{SwipeNavigation:c}},[]);if(!window.swipeNavigation)window.swipeNavigation=new a;else{try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(a){console.warn("Swipe Navigation (fallback) não pôde ser inicializado:",a)}}}catch(e){console.error("❌ Erro ao renderizar página:",n,e);try{const t=document.getElementById("app-content");if(Jt["/dashboard"]){const r=await Jt["/dashboard"]();await(r&&(r.default||r.render)||r)(t);try{const{scrollToTop:s}=await j(async()=>{const{scrollToTop:a}=await Promise.resolve().then(()=>Pn);return{scrollToTop:a}},void 0);s()}catch{}try{const{renderBottomNav:s}=await j(async()=>{const{renderBottomNav:a}=await import("./index-CC7p0iPh.js");return{renderBottomNav:a}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));s("/dashboard")}catch(s){console.warn("Bottom nav render (fallback catch) falhou:",s)}try{const{SwipeNavigation:s}=await j(async()=>{const{SwipeNavigation:a}=await import("./SwipeTabs-DedpaSIh.js");return{SwipeNavigation:a}},[]);if(!window.swipeNavigation)window.swipeNavigation=new s;else{try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(s){console.warn("Swipe Navigation (fallback catch) não pôde ser inicializado:",s)}}}catch(t){console.error("❌ Erro no fallback para dashboard:",t)}}}const OA=Object.freeze(Object.defineProperty({__proto__:null,renderPage:ih,routes:Jt},Symbol.toStringTag,{value:"Module"})),wu={debug:10,info:20,warn:30,error:40};let ym="info";function vi(n){return wu[n]>=wu[ym]}function Ai(n,e,t){return[`[${new Date().toISOString()}] [${n.toUpperCase()}]`,e,...t]}const L={debug(n,...e){vi("debug")&&console.debug(...Ai("debug",n,e))},info(n,...e){vi("info")&&console.info(...Ai("info",n,e))},warn(n,...e){vi("warn")&&console.warn(...Ai("warn",n,e))},error(n,...e){vi("error")&&console.error(...Ai("error",n,e))}};class wm{constructor(){this.listeners=new Map}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){const r=this.listeners.get(e);r&&(r.delete(t),r.size===0&&this.listeners.delete(e))}emit(e,t){const r=this.listeners.get(e);if(r)for(const i of r)try{i(t)}catch(s){console.error(`[eventBus] handler error for ${e}`,s)}}clear(){this.listeners.clear()}getListenerCount(e){const t=this.listeners.get(e);return t?t.size:0}hasListeners(e){return this.listeners.has(e)&&this.listeners.get(e).size>0}once(e,t){const r=i=>{t(i),this.off(e,r)};this.on(e,r)}}const R=new wm,LA=Object.freeze(Object.defineProperty({__proto__:null,eventBus:R},Symbol.toStringTag,{value:"Module"}));function Im(n){try{const t={"/":"Dashboard","/dashboard":"Dashboard","/transactions":"Transações","/categories":"Categorias","/analytics":"Análises","/recorrentes":"Recorrentes","/notifications":"Notificações","/settings":"Configurações"}[n]||"Dashboard";document.title=`Financeiro • ${t}`;const r=document.querySelector(".tab-title-highlight");if(r&&!r.textContent.includes(t)){const i=r.textContent.split(" ")[0];r.textContent=`${i} ${t}`}}catch{}}function sh(){const n=localStorage.getItem("compactMode")==="true",e=localStorage.getItem("microMode")==="true",t=localStorage.getItem("nanoMode")==="true",r=document.querySelector(".app-container"),i=document.body;i.classList.remove("compact-mode","micro-mode","nano-mode"),r&&r.classList.remove("compact-mode","micro-mode","nano-mode"),t?(i.classList.add("compact-mode","micro-mode","nano-mode"),r&&r.classList.add("compact-mode","micro-mode","nano-mode")):e?(i.classList.add("compact-mode","micro-mode"),r&&r.classList.add("compact-mode","micro-mode")):n&&(i.classList.add("compact-mode"),r&&r.classList.add("compact-mode"))}function Em(n,e="info",t=3e3){R.emit("notification:show",{message:n,type:e,duration:t})}function Tm(n,e={}){R.emit("modal:show",{content:n,options:e})}function vm(){R.emit("modal:hide")}function ce(n,e="info"){R.emit("snackbar:show",{message:n,type:e})}function Am(n){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n||0)}function Sm(n){return n?new Date(n).toLocaleDateString("pt-BR"):""}function bm(n){return n?new Date(n).toLocaleString("pt-BR"):""}function Rm(n){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)}function Pm(n){return!isNaN(n)&&parseFloat(n)>0}function Cm(n,e=null){try{const t=localStorage.getItem(n);return t?JSON.parse(t):e}catch{return e}}function km(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch(t){console.error("Erro ao salvar no localStorage:",t)}}function Dm(n,e){let t;return function(...i){const s=()=>{clearTimeout(t),n(...i)};clearTimeout(t),t=setTimeout(s,e)}}function Nm(n,e){let t;return function(){const r=arguments,i=this;t||(n.apply(i,r),t=!0,setTimeout(()=>t=!1,e))}}function oh(n){window.location.hash!==`#${n}`&&(window.location.hash=n)}function Vm(n=!0){try{const e=[];try{const t=document.getElementById("app-content");t&&e.push(t);const r=document.querySelector(".tab-content");r&&e.push(r);const i=document.querySelector(".content-spacing");i&&e.push(i)}catch{}for(const t of e)try{typeof t.scrollTo=="function"&&t.scrollTo({top:0,left:0,behavior:"auto"}),t.scrollTop=0,t.scrollLeft=0}catch{}if(n&&typeof document<"u"){try{document.documentElement.scrollTop=0}catch{}try{document.body.scrollTop=0}catch{}}if(n&&typeof window<"u"&&typeof window.scrollTo=="function")try{window.scrollTo({top:0,left:0,behavior:"auto"})}catch{}}catch{}}const On={user:null,currentBudget:null,transactions:[],categories:[],recorrentes:[],selectedYear:new Date().getFullYear(),selectedMonth:new Date().getMonth()+1,setUser(n){this.user=n,R.emit("user:changed",n)},setCurrentBudget(n){this.currentBudget=n,R.emit("budget:changed",n)},setTransactions(n){this.transactions=n,R.emit("transactions:changed",n)},setCategories(n){this.categories=n,R.emit("categories:changed",n)},setRecorrentes(n){this.recorrentes=n,R.emit("recorrentes:changed",n)},setSelectedPeriod(n,e){this.selectedYear=n,this.selectedMonth=e,R.emit("period:changed",{year:n,month:e})}};function ah(){try{if(typeof window<"u"&&window.appState&&window.appState.selectedYear&&window.appState.selectedMonth)return{year:window.appState.selectedYear,month:window.appState.selectedMonth}}catch{}try{const n=typeof localStorage<"u"?localStorage.getItem("selectedYM"):null;if(n){const e=String(n).match(/^(\d{4})-(\d{2})$/);if(e){const t=parseInt(e[1],10),r=parseInt(e[2],10);if(t>1900&&r>=1&&r<=12)return{year:t,month:r}}}}catch{}return{year:On.selectedYear,month:On.selectedMonth}}function ch(n,e){try{if(typeof window<"u"){window.appState=window.appState||On,window.appState.selectedYear=n,window.appState.selectedMonth=e;try{localStorage.setItem("selectedYM",`${n}-${String(e).padStart(2,"0")}`)}catch{}try{const t=window.location.hash||"",r=t.split("?")[0]||"#/dashboard",i=`${n}-${String(e).padStart(2,"0")}`,s=/[?&]ym=\d{4}-\d{2}/.test(t),a=s?(t.match(/ym=(\d{4}-\d{2})/)||[])[1]:null;if(!s||a!==i){const c=`${r}?ym=${i}`;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.includes("jsdom"))window.location.hash=c;else{const d=new URL(window.location.href);d.hash=c,window.history&&window.history.replaceState?window.history.replaceState(null,"",d.toString()):window.location.hash=c}}}catch{}}}catch{}On.setSelectedPeriod(n,e)}function Om(){try{const e=(typeof window<"u"&&window.location.hash||"").match(/ym=(\d{4})-(\d{2})/);if(e){const t=parseInt(e[1],10),r=parseInt(e[2],10);if(t>1900&&r>=1&&r<=12)return{year:t,month:r}}}catch{}return null}function Lm(n,e){try{const t=window.location.hash||"",r=t.split("?")[0]||"#/dashboard",i=`${n}-${String(e).padStart(2,"0")}`,s=t.match(/ym=(\d{4}-\d{2})/);if(!s||s[1]!==i){const a=`${r}?ym=${i}`;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.includes("jsdom"))window.location.hash=a;else{const l=new URL(window.location.href);l.hash=a,window.history&&window.history.replaceState?window.history.replaceState(null,"",l.toString()):window.location.hash=a}}}catch{}}const vr={showAddTransactionModal:async n=>{try{if(await j(()=>import("./showAddTransactionModal-C755oCIJ.js"),__vite__mapDeps([13,11,12])),typeof window.showAddTransactionModal=="function"){window.showAddTransactionModal(n||{});return}R.emit("modal:show",{type:"transaction",data:n,title:"Nova Transação"})}catch(e){console.warn("Falha ao abrir modal de transação via shim:",e),R.emit("modal:show",{type:"transaction",data:n,title:"Nova Transação"})}},showAddCategoryModal:n=>{R.emit("modal:show",{type:"category",data:n,title:"Nova Categoria"})},showAddRecorrenteModal:n=>{R.emit("modal:show",{type:"recorrente",data:n,title:"Nova Recorrente"})},closeModal:()=>{try{const n=document.getElementById("app-modal")||document.querySelector("#app-modal, .modal");if(n&&n.parentNode&&n.parentNode.removeChild(n),window.toggleFABOnModal)try{window.toggleFABOnModal()}catch{}}catch{}try{R.emit("modal:hide")}catch{}}};typeof window<"u"&&(window.getSelectedPeriod=ah,window.setSelectedPeriod=ch,window.showAddTransactionModal=vr.showAddTransactionModal,window.showAddCategoryModal=vr.showAddCategoryModal,window.showAddRecorrenteModal=vr.showAddRecorrenteModal,window.closeModal=vr.closeModal,window.appState=On);const Pn=Object.freeze(Object.defineProperty({__proto__:null,applyCompactMode:sh,debounce:Dm,ensureHashHasYm:Lm,formatCurrency:Am,formatDate:Sm,formatDateTime:bm,getSelectedPeriod:ah,getStorageItem:Cm,globalFunctions:vr,globalState:On,hideModal:vm,isValidAmount:Pm,isValidEmail:Rm,navigateTo:oh,parseYmFromHash:Om,scrollToTop:Vm,setSelectedPeriod:ch,setStorageItem:km,showModal:Tm,showNotification:Em,showSnackbar:ce,throttle:Nm,updatePageTitle:Im},Symbol.toStringTag,{value:"Module"}));function uh({title:n="",content:e="",onClose:t=null}){console.log("🔧 Modal sendo criado com:",{title:n,content:e.substring(0,100)+"..."});const r=document.createElement("div");r.id="app-modal",r.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",r.onclick=s=>{s.target===r&&(t?t():r.remove()),window.toggleFABOnModal&&window.toggleFABOnModal()};const i=document.createElement("div");i.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",i.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,r.appendChild(i),i.querySelector("#modal-close-btn").onclick=s=>{s.stopPropagation(),t?t():r.remove(),window.toggleFABOnModal&&window.toggleFABOnModal()},window.toggleFABOnModal&&window.toggleFABOnModal(),console.log("🔧 Modal criado:",r),console.log("🔧 Modal HTML:",r.outerHTML.substring(0,200)+"...");try{typeof window<"u"&&typeof window.closeModal!="function"&&(window.closeModal=function(){try{const s=document.getElementById("app-modal")||r;s&&s.parentNode&&s.parentNode.removeChild(s)}catch{}if(window.toggleFABOnModal)try{window.toggleFABOnModal()}catch{}})}catch{}return r}const MA=Object.freeze(Object.defineProperty({__proto__:null,Modal:uh},Symbol.toStringTag,{value:"Module"}));function Mm(){L.info("Configurando listeners de eventos..."),R.on("notification:show",({message:n,type:e})=>{L.info(`Notificação [${e}]: ${n}`)}),R.on("modal:show",async(n={})=>{try{const{content:e,options:t={},title:r,type:i,data:s}=n,a=r||i||(e?"[conteúdo HTML]":"sem conteúdo");if(L.info("Modal solicitado:",a),e){const c=uh({title:t.title||r||"Informação",content:e,onClose:()=>c.remove()});document.body.appendChild(c);return}if(i==="transaction"&&(await j(()=>import("./showAddTransactionModal-C755oCIJ.js"),__vite__mapDeps([13,11,12])),typeof window.showAddTransactionModal=="function")){window.showAddTransactionModal(s||{});return}if(i==="category"&&(await j(()=>import("./showAddCategoryModal-D4BNJS1x.js"),__vite__mapDeps([14,11,12])),typeof window.showAddCategoryModal=="function")){window.showAddCategoryModal(s||{});return}if(i==="recorrente"&&(await j(()=>import("./showAddRecorrenteModal-BHG6L474.js"),__vite__mapDeps([15,6,11,12])),typeof window.showAddRecorrenteModal=="function")){window.showAddRecorrenteModal(s||{});return}ce("Não foi possível abrir o modal solicitado","error")}catch(e){L.error("Falha ao processar modal:show",e),ce("Erro ao abrir modal","error")}}),R.on("modal:hide",()=>{L.info("Modal escondido")}),R.on("snackbar:show",({message:n,type:e})=>{L.info(`Snackbar [${e}]: ${n}`)}),R.on("transaction:added",n=>{L.info("Transação adicionada:",n.id),ce("Transação adicionada com sucesso","success")}),R.on("transaction:updated",({id:n})=>{L.info("Transação atualizada:",n),ce("Transação atualizada com sucesso","success")}),R.on("transaction:deleted",({id:n})=>{L.info("Transação removida:",n),ce("Transação removida com sucesso","success")}),R.on("budget:created",n=>{L.info("Orçamento criado:",n.id),ce("Orçamento criado com sucesso","success")}),R.on("budget:updated",({id:n})=>{L.info("Orçamento atualizado:",n),ce("Orçamento atualizado com sucesso","success")}),R.on("budget:deleted",({id:n})=>{L.info("Orçamento removido:",n),ce("Orçamento removido com sucesso","success")}),R.on("category:created",n=>{try{const e=typeof n=="string"?n:n?.id;L.info("Categoria criada:",e||"[sem id]")}catch{L.warn("Evento category:created com payload inesperado:",n)}ce("Categoria criada com sucesso","success")}),R.on("category:updated",({id:n})=>{L.info("Categoria atualizada:",n),ce("Categoria atualizada com sucesso","success")}),R.on("category:deleted",({id:n})=>{L.info("Categoria removida:",n),ce("Categoria removida com sucesso","success")}),R.on("transaction:recurring:applied",n=>{L.info("Recorrente aplicada:",n.id),ce("Despesa recorrente aplicada","info")}),R.on("error:transaction",n=>{L.error("Erro em transação:",n),ce("Erro ao processar transação","error")}),R.on("error:budget",n=>{L.error("Erro em orçamento:",n),ce("Erro ao processar orçamento","error")}),R.on("error:category",n=>{L.error("Erro em categoria:",n),ce("Erro ao processar categoria","error")}),R.on("auth:login",n=>{L.info("Usuário logado:",n.uid),ce("Login realizado com sucesso","success")}),R.on("auth:logout",()=>{L.info("Usuário deslogado"),ce("Logout realizado","info")}),R.on("auth:error",n=>{L.error("Erro de autenticação:",n),ce("Erro de autenticação","error")}),R.on("app:ready",n=>{L.info("Aplicação pronta:",n),ce("Aplicação carregada","success")}),R.on("app:error",n=>{L.error("Erro na aplicação:",n),ce("Erro ao carregar aplicação","error")}),L.info("Listeners de eventos configurados")}function xm(){L.info("Limpando listeners de eventos..."),R.off("notification:show"),R.off("modal:show"),R.off("modal:hide"),R.off("snackbar:show"),R.off("transaction:added"),R.off("transaction:updated"),R.off("transaction:deleted"),R.off("budget:created"),R.off("budget:updated"),R.off("budget:deleted"),R.off("category:created"),R.off("category:updated"),R.off("category:deleted"),R.off("transaction:recurring:applied"),R.off("error:transaction"),R.off("error:budget"),R.off("error:category"),R.off("auth:login"),R.off("auth:logout"),R.off("auth:error"),R.off("app:ready"),R.off("app:error"),L.info("Listeners de eventos limpos")}const Fm=()=>{};var Iu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Um=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},hh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,c=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=s>>2,g=(s&3)<<4|c>>4;let y=(c&15)<<2|d>>6,P=d&63;l||(P=64,a||(y=64)),r.push(t[p],t[g],t[y],t[P])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(lh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Um(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const g=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||g==null)throw new Bm;const y=s<<2|c>>4;if(r.push(y),d!==64){const P=c<<4&240|d>>2;if(r.push(P),g!==64){const k=d<<6&192|g;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Bm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $m=function(n){const e=lh(n);return hh.encodeByteArray(e,!0)},Bi=function(n){return $m(n).replace(/\./g,"")},dh=function(n){try{return hh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qm=()=>jm().__FIREBASE_DEFAULTS__,zm=()=>{if(typeof process>"u"||typeof Iu>"u")return;const n=Iu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Wm=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&dh(n[1]);return e&&JSON.parse(e)},cs=()=>{try{return Fm()||qm()||zm()||Wm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},fh=n=>cs()?.emulatorHosts?.[n],Hm=n=>{const e=fh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ph=()=>cs()?.config,mh=n=>cs()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function gh(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Km(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Bi(JSON.stringify(t)),Bi(JSON.stringify(a)),""].join(".")}const Rr={};function Qm(){const n={prod:[],emulator:[]};for(const e of Object.keys(Rr))Rr[e]?n.emulator.push(e):n.prod.push(e);return n}function Ym(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Eu=!1;function _h(n,e){if(typeof window>"u"||typeof document>"u"||!Gn(window.location.host)||Rr[n]===e||Rr[n]||Eu)return;Rr[n]=e;function t(y){return`__firebase__banner__${y}`}const r="__firebase__banner",s=Qm().prod.length>0;function a(){const y=document.getElementById(r);y&&y.remove()}function c(y){y.style.display="flex",y.style.background="#7faaf0",y.style.position="fixed",y.style.bottom="5px",y.style.left="5px",y.style.padding=".5em",y.style.borderRadius="5px",y.style.alignItems="center"}function l(y,P){y.setAttribute("width","24"),y.setAttribute("id",P),y.setAttribute("height","24"),y.setAttribute("viewBox","0 0 24 24"),y.setAttribute("fill","none"),y.style.marginLeft="-6px"}function d(){const y=document.createElement("span");return y.style.cursor="pointer",y.style.marginLeft="16px",y.style.fontSize="24px",y.innerHTML=" &times;",y.onclick=()=>{Eu=!0,a()},y}function p(y,P){y.setAttribute("id",P),y.innerText="Learn more",y.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",y.setAttribute("target","__blank"),y.style.paddingLeft="5px",y.style.textDecoration="underline"}function g(){const y=Ym(r),P=t("text"),k=document.getElementById(P)||document.createElement("span"),M=t("learnmore"),V=document.getElementById(M)||document.createElement("a"),G=t("preprendIcon"),q=document.getElementById(G)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(y.created){const K=y.element;c(K),p(V,M);const _e=d();l(q,G),K.append(q,k,V,_e),document.body.appendChild(K)}s?(k.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Jm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ce())}function Xm(){const n=cs()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Zm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function yh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function eg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function tg(){const n=Ce();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ng(){return!Xm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function wh(){try{return typeof indexedDB=="object"}catch{return!1}}function Ih(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}function rg(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig="FirebaseError";class Xe extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ig,Object.setPrototypeOf(this,Xe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hn.prototype.create)}}class hn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?sg(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Xe(i,c,r)}}function sg(n,e){return n.replace(og,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const og=/\{\$([^}]+)}/g;function ag(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function st(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(Tu(s)&&Tu(a)){if(!st(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Tu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function cg(n,e){const t=new ug(n,e);return t.subscribe.bind(t)}class ug{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");lg(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=po),i.error===void 0&&(i.error=po),i.complete===void 0&&(i.complete=po);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function lg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function po(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg=1e3,dg=2,fg=14400*1e3,pg=.5;function vu(n,e=hg,t=dg){const r=e*Math.pow(t,n),i=Math.round(pg*r*(Math.random()-.5)*2);return Math.min(fg,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n){return n&&n._delegate?n._delegate:n}class Ke{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Gm;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_g(e))try{this.getOrInitializeService({instanceIdentifier:Xt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Xt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xt){return this.instances.has(e)}getOptions(e=Xt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:gg(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Xt){return this.component?this.component.multipleInstances?e:Xt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gg(n){return n===Xt?void 0:n}function _g(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new mg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const wg={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},Ig=z.INFO,Eg={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},Tg=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Eg[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class us{constructor(e){this.name=e,this._logLevel=Ig,this._logHandler=Tg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}}const vg=(n,e)=>e.some(t=>n instanceof t);let Au,Su;function Ag(){return Au||(Au=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Sg(){return Su||(Su=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Eh=new WeakMap,ko=new WeakMap,Th=new WeakMap,mo=new WeakMap,sa=new WeakMap;function bg(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Vt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Eh.set(t,n)}).catch(()=>{}),sa.set(e,n),e}function Rg(n){if(ko.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});ko.set(n,e)}let Do={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ko.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Th.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Vt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Pg(n){Do=n(Do)}function Cg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(go(this),e,...t);return Th.set(r,e.sort?e.sort():[e]),Vt(r)}:Sg().includes(n)?function(...e){return n.apply(go(this),e),Vt(Eh.get(this))}:function(...e){return Vt(n.apply(go(this),e))}}function kg(n){return typeof n=="function"?Cg(n):(n instanceof IDBTransaction&&Rg(n),vg(n,Ag())?new Proxy(n,Do):n)}function Vt(n){if(n instanceof IDBRequest)return bg(n);if(mo.has(n))return mo.get(n);const e=kg(n);return e!==n&&(mo.set(n,e),sa.set(e,n)),e}const go=n=>sa.get(n);function vh(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),c=Vt(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Vt(a.result),l.oldVersion,l.newVersion,Vt(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Dg=["get","getKey","getAll","getAllKeys","count"],Ng=["put","add","delete","clear"],_o=new Map;function bu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(_o.get(e))return _o.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Ng.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Dg.includes(t)))return;const s=async function(a,...c){const l=this.transaction(a,i?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return _o.set(e,s),s}Pg(n=>({...n,get:(e,t,r)=>bu(e,t)||n.get(e,t,r),has:(e,t)=>!!bu(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Og(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Og(n){return n.getComponent()?.type==="VERSION"}const No="@firebase/app",Ru="0.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt=new us("@firebase/app"),Lg="@firebase/app-compat",Mg="@firebase/analytics-compat",xg="@firebase/analytics",Fg="@firebase/app-check-compat",Ug="@firebase/app-check",Bg="@firebase/auth",$g="@firebase/auth-compat",jg="@firebase/database",qg="@firebase/data-connect",zg="@firebase/database-compat",Wg="@firebase/functions",Hg="@firebase/functions-compat",Gg="@firebase/installations",Kg="@firebase/installations-compat",Qg="@firebase/messaging",Yg="@firebase/messaging-compat",Jg="@firebase/performance",Xg="@firebase/performance-compat",Zg="@firebase/remote-config",e_="@firebase/remote-config-compat",t_="@firebase/storage",n_="@firebase/storage-compat",r_="@firebase/firestore",i_="@firebase/ai",s_="@firebase/firestore-compat",o_="firebase",a_="12.0.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo="[DEFAULT]",c_={[No]:"fire-core",[Lg]:"fire-core-compat",[xg]:"fire-analytics",[Mg]:"fire-analytics-compat",[Ug]:"fire-app-check",[Fg]:"fire-app-check-compat",[Bg]:"fire-auth",[$g]:"fire-auth-compat",[jg]:"fire-rtdb",[qg]:"fire-data-connect",[zg]:"fire-rtdb-compat",[Wg]:"fire-fn",[Hg]:"fire-fn-compat",[Gg]:"fire-iid",[Kg]:"fire-iid-compat",[Qg]:"fire-fcm",[Yg]:"fire-fcm-compat",[Jg]:"fire-perf",[Xg]:"fire-perf-compat",[Zg]:"fire-rc",[e_]:"fire-rc-compat",[t_]:"fire-gcs",[n_]:"fire-gcs-compat",[r_]:"fire-fst",[s_]:"fire-fst-compat",[i_]:"fire-vertex","fire-js":"fire-js",[o_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $i=new Map,u_=new Map,Oo=new Map;function Pu(n,e){try{n.container.addComponent(e)}catch(t){wt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ot(n){const e=n.name;if(Oo.has(e))return wt.debug(`There were multiple attempts to register component ${e}.`),!1;Oo.set(e,n);for(const t of $i.values())Pu(t,n);for(const t of u_.values())Pu(t,n);return!0}function dn(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function qe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ot=new hn("app","Firebase",l_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ke("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ot.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn=a_;function Ah(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Vo,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Ot.create("bad-app-name",{appName:String(i)});if(t||(t=ph()),!t)throw Ot.create("no-options");const s=$i.get(i);if(s){if(st(t,s.options)&&st(r,s.config))return s;throw Ot.create("duplicate-app",{appName:i})}const a=new yg(i);for(const l of Oo.values())a.addComponent(l);const c=new h_(t,r,a);return $i.set(i,c),c}function oa(n=Vo){const e=$i.get(n);if(!e&&n===Vo&&ph())return Ah();if(!e)throw Ot.create("no-app",{appName:n});return e}function Be(n,e,t){let r=c_[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),wt.warn(a.join(" "));return}ot(new Ke(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_="firebase-heartbeat-database",f_=1,Mr="firebase-heartbeat-store";let yo=null;function Sh(){return yo||(yo=vh(d_,f_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Mr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ot.create("idb-open",{originalErrorMessage:n.message})})),yo}async function p_(n){try{const t=(await Sh()).transaction(Mr),r=await t.objectStore(Mr).get(bh(n));return await t.done,r}catch(e){if(e instanceof Xe)wt.warn(e.message);else{const t=Ot.create("idb-get",{originalErrorMessage:e?.message});wt.warn(t.message)}}}async function Cu(n,e){try{const r=(await Sh()).transaction(Mr,"readwrite");await r.objectStore(Mr).put(e,bh(n)),await r.done}catch(t){if(t instanceof Xe)wt.warn(t.message);else{const r=Ot.create("idb-set",{originalErrorMessage:t?.message});wt.warn(r.message)}}}function bh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_=1024,g_=30;class __{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new w_(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ku();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>g_){const i=I_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){wt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ku(),{heartbeatsToSend:t,unsentEntries:r}=y_(this._heartbeatsCache.heartbeats),i=Bi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return wt.warn(e),""}}}function ku(){return new Date().toISOString().substring(0,10)}function y_(n,e=m_){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Du(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Du(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class w_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wh()?Ih().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await p_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Cu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Cu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Du(n){return Bi(JSON.stringify({version:2,heartbeats:n})).length}function I_(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E_(n){ot(new Ke("platform-logger",e=>new Vg(e),"PRIVATE")),ot(new Ke("heartbeat",e=>new __(e),"PRIVATE")),Be(No,Ru,n),Be(No,Ru,"esm2020"),Be("fire-js","")}E_("");var T_="firebase",v_="12.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Be(T_,v_,"app");function Rh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const A_=Rh,Ph=new hn("auth","Firebase",Rh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ji=new us("@firebase/auth");function S_(n,...e){ji.logLevel<=z.WARN&&ji.warn(`Auth (${Kn}): ${n}`,...e)}function Di(n,...e){ji.logLevel<=z.ERROR&&ji.error(`Auth (${Kn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(n,...e){throw ca(n,...e)}function We(n,...e){return ca(n,...e)}function aa(n,e,t){const r={...A_(),[e]:t};return new hn("auth","Firebase",r).create(e,{appName:n.name})}function nn(n){return aa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function b_(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&at(n,"argument-error"),aa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ca(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ph.create(n,...e)}function U(n,e,...t){if(!n)throw ca(e,...t)}function pt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Di(e),new Error(e)}function It(n,e){n||pt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(){return typeof self<"u"&&self.location?.href||""}function R_(){return Nu()==="http:"||Nu()==="https:"}function Nu(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(R_()||yh()||"connection"in navigator)?navigator.onLine:!0}function C_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e,t){this.shortDelay=e,this.longDelay=t,It(t>e,"Short delay should be less than long delay!"),this.isMobile=Jm()||eg()}get(){return P_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(n,e){It(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;pt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;pt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;pt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],N_=new Wr(3e4,6e4);function la(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Qn(n,e,t,r,i={}){return kh(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const c=zr({key:n.config.apiKey,...a}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:l,...s};return Zm()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Gn(n.emulatorConfig.host)&&(d.credentials="include"),Ch.fetch()(await Dh(n,n.config.apiHost,t,c),d)})}async function kh(n,e,t){n._canInitEmulator=!1;const r={...k_,...e};try{const i=new O_(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Si(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Si(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Si(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Si(n,"user-disabled",a);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw aa(n,p,d);at(n,p)}}catch(i){if(i instanceof Xe)throw i;at(n,"network-request-failed",{message:String(i)})}}async function V_(n,e,t,r,i={}){const s=await Qn(n,e,t,r,i);return"mfaPendingCredential"in s&&at(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Dh(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?ua(n.config,i):`${n.config.apiScheme}://${i}`;return D_.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}class O_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(We(this.auth,"network-request-failed")),N_.get())})}}function Si(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=We(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function L_(n,e){return Qn(n,"POST","/v1/accounts:delete",e)}async function qi(n,e){return Qn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function M_(n,e=!1){const t=ie(n),r=await t.getIdToken(e),i=ha(r);U(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:r,authTime:Pr(wo(i.auth_time)),issuedAtTime:Pr(wo(i.iat)),expirationTime:Pr(wo(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function wo(n){return Number(n)*1e3}function ha(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Di("JWT malformed, contained fewer than 3 sections"),null;try{const i=dh(t);return i?JSON.parse(i):(Di("Failed to decode base64 JWT payload"),null)}catch(i){return Di("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Vu(n){const e=ha(n);return U(e,"internal-error"),U(typeof e.exp<"u","internal-error"),U(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Xe&&x_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function x_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pr(this.lastLoginAt),this.creationTime=Pr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zi(n){const e=n.auth,t=await n.getIdToken(),r=await xr(n,qi(e,{idToken:t}));U(r?.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=i.providerUserInfo?.length?Nh(i.providerUserInfo):[],a=B_(n.providerData,s),c=n.isAnonymous,l=!(n.email&&i.passwordHash)&&!a?.length,d=c?l:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Mo(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function U_(n){const e=ie(n);await zi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function B_(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Nh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $_(n,e){const t=await kh(n,{},async()=>{const r=zr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await Dh(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&Gn(n.emulatorConfig.host)&&(l.credentials="include"),Ch.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function j_(n,e){return Qn(n,"POST","/v2/accounts:revokeToken",la(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken<"u","internal-error"),U(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){U(e.length!==0,"internal-error");const t=Vu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await $_(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new Cn;return r&&(U(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(U(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(U(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Cn,this.toJSON())}_performRefresh(){return pt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n,e){U(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ze{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new F_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Mo(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await xr(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return M_(this,e)}reload(){return U_(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ze({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await zi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(qe(this.auth.app))return Promise.reject(nn(this.auth));const e=await this.getIdToken();return await xr(this,L_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:g,emailVerified:y,isAnonymous:P,providerData:k,stsTokenManager:M}=t;U(g&&M,e,"internal-error");const V=Cn.fromJSON(this.name,M);U(typeof g=="string",e,"internal-error"),Pt(r,e.name),Pt(i,e.name),U(typeof y=="boolean",e,"internal-error"),U(typeof P=="boolean",e,"internal-error"),Pt(s,e.name),Pt(a,e.name),Pt(c,e.name),Pt(l,e.name),Pt(d,e.name),Pt(p,e.name);const G=new ze({uid:g,auth:e,email:i,emailVerified:y,displayName:r,isAnonymous:P,photoURL:a,phoneNumber:s,tenantId:c,stsTokenManager:V,createdAt:d,lastLoginAt:p});return k&&Array.isArray(k)&&(G.providerData=k.map(q=>({...q}))),l&&(G._redirectEventId=l),G}static async _fromIdTokenResponse(e,t,r=!1){const i=new Cn;i.updateFromServerResponse(t);const s=new ze({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await zi(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];U(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Nh(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,c=new Cn;c.updateFromIdToken(r);const l=new ze({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Mo(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou=new Map;function mt(n){It(n instanceof Function,"Expected a class definition");let e=Ou.get(n);return e?(It(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ou.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Vh.type="NONE";const Lu=Vh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ni(n,e,t){return`firebase:${n}:${e}:${t}`}class kn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ni(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ni("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await qi(this.auth,{idToken:e}).catch(()=>{});return t?ze._fromGetAccountInfoResponse(this.auth,t,e):null}return ze._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new kn(mt(Lu),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||mt(Lu);const a=Ni(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(a);if(p){let g;if(typeof p=="string"){const y=await qi(e,{idToken:p}).catch(()=>{});if(!y)break;g=await ze._fromGetAccountInfoResponse(e,y,p)}else g=ze._fromJSON(e,p);d!==s&&(c=g),s=d;break}}catch{}const l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new kn(s,e,r):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new kn(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Oh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Uh(e))return"Blackberry";if(Bh(e))return"Webos";if(Lh(e))return"Safari";if((e.includes("chrome/")||Mh(e))&&!e.includes("edge/"))return"Chrome";if(Fh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Oh(n=Ce()){return/firefox\//i.test(n)}function Lh(n=Ce()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Mh(n=Ce()){return/crios\//i.test(n)}function xh(n=Ce()){return/iemobile/i.test(n)}function Fh(n=Ce()){return/android/i.test(n)}function Uh(n=Ce()){return/blackberry/i.test(n)}function Bh(n=Ce()){return/webos/i.test(n)}function da(n=Ce()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function q_(n=Ce()){return da(n)&&!!window.navigator?.standalone}function z_(){return tg()&&document.documentMode===10}function $h(n=Ce()){return da(n)||Fh(n)||Bh(n)||Uh(n)||/windows phone/i.test(n)||xh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jh(n,e=[]){let t;switch(n){case"Browser":t=Mu(Ce());break;case"Worker":t=`${Mu(Ce())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Kn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,c)=>{try{const l=e(s);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H_(n,e={}){return Qn(n,"GET","/v2/passwordPolicy",la(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G_=6;class K_{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??G_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xu(this),this.idTokenSubscription=new xu(this),this.beforeStateQueue=new W_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ph,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=mt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await kn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await qi(this,{idToken:e}),r=await ze._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(qe(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!s||s===a)&&c?.user&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await zi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=C_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(qe(this.app))return Promise.reject(nn(this));const t=e?ie(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return qe(this.app)?Promise.reject(nn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return qe(this.app)?Promise.reject(nn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(mt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await H_(this),t=new K_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new hn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await j_(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&mt(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await kn.create(this,[mt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=jh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&S_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ls(n){return ie(n)}class xu{constructor(e){this.auth=e,this.observer=null,this.addObserver=cg(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Y_(n){fa=n}function J_(n){return fa.loadJS(n)}function X_(){return fa.gapiScript}function Z_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(n,e){const t=dn(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(st(s,e??{}))return i;at(i,"already-initialized")}return t.initialize({options:e})}function ty(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(mt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function ny(n,e,t){const r=ls(n);U(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=qh(e),{host:a,port:c}=ry(e),l=c===null?"":`:${c}`,d={url:`${s}//${a}${l}/`},p=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){U(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),U(st(d,r.config.emulator)&&st(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,Gn(a)?(gh(`${s}//${a}${l}`),_h("Auth",!0)):iy()}function qh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ry(n){const e=qh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Fu(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:Fu(a)}}}function Fu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function iy(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return pt("not implemented")}_getIdTokenResponse(e){return pt("not implemented")}_linkToIdToken(e,t){return pt("not implemented")}_getReauthenticationResolver(e){return pt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dn(n,e){return V_(n,"POST","/v1/accounts:signInWithIdp",la(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sy="http://localhost";class sn extends zh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new sn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):at("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const a=new sn(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Dn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Dn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Dn(e,t)}buildRequest(){const e={requestUri:sy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=zr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr extends pa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends Hr{constructor(){super("facebook.com")}static credential(e){return sn._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ct.credential(e.oauthAccessToken)}catch{return null}}}Ct.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ct.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft extends Hr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return sn._fromParams({providerId:ft.PROVIDER_ID,signInMethod:ft.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ft.credentialFromTaggedObject(e)}static credentialFromError(e){return ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ft.credential(t,r)}catch{return null}}}ft.GOOGLE_SIGN_IN_METHOD="google.com";ft.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends Hr{constructor(){super("github.com")}static credential(e){return sn._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kt.credential(e.oauthAccessToken)}catch{return null}}}kt.GITHUB_SIGN_IN_METHOD="github.com";kt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends Hr{constructor(){super("twitter.com")}static credential(e,t){return sn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Dt.credential(t,r)}catch{return null}}}Dt.TWITTER_SIGN_IN_METHOD="twitter.com";Dt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await ze._fromIdTokenResponse(e,r,i),a=Uu(r);return new Ln({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Uu(r);return new Ln({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Uu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi extends Xe{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Wi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Wi(e,t,r,i)}}function Wh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Wi._fromErrorAndOperation(n,s,e,r):s})}async function oy(n,e,t=!1){const r=await xr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ln._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ay(n,e,t=!1){const{auth:r}=n;if(qe(r.app))return Promise.reject(nn(r));const i="reauthenticate";try{const s=await xr(n,Wh(r,i,e,n),t);U(s.idToken,r,"internal-error");const a=ha(s.idToken);U(a,r,"internal-error");const{sub:c}=a;return U(n.uid===c,r,"user-mismatch"),Ln._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&at(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cy(n,e,t=!1){if(qe(n.app))return Promise.reject(nn(n));const r="signIn",i=await Wh(n,r,e),s=await Ln._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uy(n,e){return ie(n).setPersistence(e)}function ly(n,e,t,r){return ie(n).onIdTokenChanged(e,t,r)}function hy(n,e,t){return ie(n).beforeAuthStateChanged(e,t)}function dy(n,e,t,r){return ie(n).onAuthStateChanged(e,t,r)}function fy(n){return ie(n).signOut()}const Hi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Hi,"1"),this.storage.removeItem(Hi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py=1e3,my=10;class Gh extends Hh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$h(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);z_()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,my):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},py)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Gh.type="LOCAL";const Kh=Gh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh extends Hh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Qh.type="SESSION";const Yh=Qh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new hs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async d=>d(t.origin,s)),l=await gy(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}hs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ma(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _y{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{const d=ma("",20);i.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(g){const y=g;if(y.data.eventId===d)switch(y.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(y.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(){return window}function yy(n){nt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(){return typeof nt().WorkerGlobalScope<"u"&&typeof nt().importScripts=="function"}async function wy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Iy(){return navigator?.serviceWorker?.controller||null}function Ey(){return Jh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh="firebaseLocalStorageDb",Ty=1,Gi="firebaseLocalStorage",Zh="fbase_key";class Gr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ds(n,e){return n.transaction([Gi],e?"readwrite":"readonly").objectStore(Gi)}function vy(){const n=indexedDB.deleteDatabase(Xh);return new Gr(n).toPromise()}function xo(){const n=indexedDB.open(Xh,Ty);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Gi,{keyPath:Zh})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Gi)?e(r):(r.close(),await vy(),e(await xo()))})})}async function Bu(n,e,t){const r=ds(n,!0).put({[Zh]:e,value:t});return new Gr(r).toPromise()}async function Ay(n,e){const t=ds(n,!1).get(e),r=await new Gr(t).toPromise();return r===void 0?null:r.value}function $u(n,e){const t=ds(n,!0).delete(e);return new Gr(t).toPromise()}const Sy=800,by=3;class ed{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await xo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>by)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Jh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=hs._getInstance(Ey()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await wy(),!this.activeServiceWorker)return;this.sender=new _y(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Iy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await xo();return await Bu(e,Hi,"1"),await $u(e,Hi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Bu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Ay(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>$u(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=ds(i,!1).getAll();return new Gr(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Sy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ed.type="LOCAL";const Ry=ed;new Wr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function td(n,e){return e?mt(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga extends zh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Dn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Dn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Dn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Py(n){return cy(n.auth,new ga(n),n.bypassAuthState)}function Cy(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),ay(t,new ga(n),n.bypassAuthState)}async function ky(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),oy(t,new ga(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Py;case"linkViaPopup":case"linkViaRedirect":return ky;case"reauthViaPopup":case"reauthViaRedirect":return Cy;default:at(this.auth,"internal-error")}}resolve(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy=new Wr(2e3,1e4);async function Ny(n,e,t){if(qe(n.app))return Promise.reject(We(n,"operation-not-supported-in-this-environment"));const r=ls(n);b_(n,e,pa);const i=td(r,t);return new Zt(r,"signInViaPopup",e,i).executeNotNull()}class Zt extends nd{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Zt.currentPopupAction&&Zt.currentPopupAction.cancel(),Zt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){It(this.filter.length===1,"Popup operations only handle one event");const e=ma();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(We(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(We(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Zt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(We(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Dy.get())};e()}}Zt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy="pendingRedirect",Vi=new Map;class Oy extends nd{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Vi.get(this.auth._key());if(!e){try{const r=await Ly(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Vi.set(this.auth._key(),e)}return this.bypassAuthState||Vi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ly(n,e){const t=Fy(e),r=xy(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function My(n,e){Vi.set(n._key(),e)}function xy(n){return mt(n._redirectPersistence)}function Fy(n){return Ni(Vy,n.config.apiKey,n.name)}async function Uy(n,e,t=!1){if(qe(n.app))return Promise.reject(nn(n));const r=ls(n),i=td(r,e),a=await new Oy(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By=600*1e3;class $y{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!jy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!rd(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(We(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=By&&this.cachedEventUids.clear(),this.cachedEventUids.has(ju(e))}saveEventToCache(e){this.cachedEventUids.add(ju(e)),this.lastProcessedEventTime=Date.now()}}function ju(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function rd({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function jy(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qy(n,e={}){return Qn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zy=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Wy=/^https?/;async function Hy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await qy(n);for(const t of e)try{if(Gy(t))return}catch{}at(n,"unauthorized-domain")}function Gy(n){const e=Lo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Wy.test(t))return!1;if(zy.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky=new Wr(3e4,6e4);function qu(){const n=nt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Qy(n){return new Promise((e,t)=>{function r(){qu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qu(),t(We(n,"network-request-failed"))},timeout:Ky.get()})}if(nt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(nt().gapi?.load)r();else{const i=Z_("iframefcb");return nt()[i]=()=>{gapi.load?r():t(We(n,"network-request-failed"))},J_(`${X_()}?onload=${i}`).catch(s=>t(s))}}).catch(e=>{throw Oi=null,e})}let Oi=null;function Yy(n){return Oi=Oi||Qy(n),Oi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy=new Wr(5e3,15e3),Xy="__/auth/iframe",Zy="emulator/auth/iframe",ew={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},tw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function nw(n){const e=n.config;U(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ua(e,Zy):`https://${n.config.authDomain}/${Xy}`,r={apiKey:e.apiKey,appName:n.name,v:Kn},i=tw.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${zr(r).slice(1)}`}async function rw(n){const e=await Yy(n),t=nt().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:nw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ew,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=We(n,"network-request-failed"),c=nt().setTimeout(()=>{s(a)},Jy.get());function l(){nt().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},sw=500,ow=600,aw="_blank",cw="http://localhost";class zu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function uw(n,e,t,r=sw,i=ow){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...iw,width:r.toString(),height:i.toString(),top:s,left:a},d=Ce().toLowerCase();t&&(c=Mh(d)?aw:t),Oh(d)&&(e=e||cw,l.scrollbars="yes");const p=Object.entries(l).reduce((y,[P,k])=>`${y}${P}=${k},`,"");if(q_(d)&&c!=="_self")return lw(e||"",c),new zu(null);const g=window.open(e||"",c,p);U(g,n,"popup-blocked");try{g.focus()}catch{}return new zu(g)}function lw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hw="__/auth/handler",dw="emulator/auth/handler",fw=encodeURIComponent("fac");async function Wu(n,e,t,r,i,s){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Kn,eventId:i};if(e instanceof pa){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",ag(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,g]of Object.entries({}))a[p]=g}if(e instanceof Hr){const p=e.getScopes().filter(g=>g!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const l=await n._getAppCheckToken(),d=l?`#${fw}=${encodeURIComponent(l)}`:"";return`${pw(n)}?${zr(c).slice(1)}${d}`}function pw({config:n}){return n.emulator?ua(n,dw):`https://${n.authDomain}/${hw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io="webStorageSupport";class mw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Yh,this._completeRedirectFn=Uy,this._overrideRedirectResult=My}async _openPopup(e,t,r,i){It(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Wu(e,t,r,Lo(),i);return uw(e,s,ma())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Wu(e,t,r,Lo(),i);return yy(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(It(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await rw(e),r=new $y(e);return t.register("authEvent",i=>(U(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Io,{type:Io},i=>{const s=i?.[0]?.[Io];s!==void 0&&t(!!s),at(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Hy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return $h()||Lh()||da()}}const gw=mw;var Hu="@firebase/auth",Gu="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ww(n){ot(new Ke("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;U(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:jh(n)},d=new Q_(r,i,s,l);return ty(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),ot(new Ke("auth-internal",e=>{const t=ls(e.getProvider("auth").getImmediate());return(r=>new _w(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Be(Hu,Gu,yw(n)),Be(Hu,Gu,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iw=300,Ew=mh("authIdTokenMaxAge")||Iw;let Ku=null;const Tw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Ew)return;const i=t?.token;Ku!==i&&(Ku=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function vw(n=oa()){const e=dn(n,"auth");if(e.isInitialized())return e.getImmediate();const t=ey(n,{popupRedirectResolver:gw,persistence:[Ry,Kh,Yh]}),r=mh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=Tw(s.toString());hy(t,a,()=>a(t.currentUser)),ly(t,c=>a(c))}}const i=fh("auth");return i&&ny(t,`http://${i}`),t}function Aw(){return document.getElementsByTagName("head")?.[0]??document}Y_({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=We("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Aw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ww("Browser");var Qu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Lt,id;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,m){function w(){}w.prototype=m.prototype,T.D=m.prototype,T.prototype=new w,T.prototype.constructor=T,T.C=function(I,E,A){for(var _=Array(arguments.length-2),lt=2;lt<arguments.length;lt++)_[lt-2]=arguments[lt];return m.prototype[E].apply(I,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,m,w){w||(w=0);var I=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)I[E]=m.charCodeAt(w++)|m.charCodeAt(w++)<<8|m.charCodeAt(w++)<<16|m.charCodeAt(w++)<<24;else for(E=0;16>E;++E)I[E]=m[w++]|m[w++]<<8|m[w++]<<16|m[w++]<<24;m=T.g[0],w=T.g[1],E=T.g[2];var A=T.g[3],_=m+(A^w&(E^A))+I[0]+3614090360&4294967295;m=w+(_<<7&4294967295|_>>>25),_=A+(E^m&(w^E))+I[1]+3905402710&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(w^A&(m^w))+I[2]+606105819&4294967295,E=A+(_<<17&4294967295|_>>>15),_=w+(m^E&(A^m))+I[3]+3250441966&4294967295,w=E+(_<<22&4294967295|_>>>10),_=m+(A^w&(E^A))+I[4]+4118548399&4294967295,m=w+(_<<7&4294967295|_>>>25),_=A+(E^m&(w^E))+I[5]+1200080426&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(w^A&(m^w))+I[6]+2821735955&4294967295,E=A+(_<<17&4294967295|_>>>15),_=w+(m^E&(A^m))+I[7]+4249261313&4294967295,w=E+(_<<22&4294967295|_>>>10),_=m+(A^w&(E^A))+I[8]+1770035416&4294967295,m=w+(_<<7&4294967295|_>>>25),_=A+(E^m&(w^E))+I[9]+2336552879&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(w^A&(m^w))+I[10]+4294925233&4294967295,E=A+(_<<17&4294967295|_>>>15),_=w+(m^E&(A^m))+I[11]+2304563134&4294967295,w=E+(_<<22&4294967295|_>>>10),_=m+(A^w&(E^A))+I[12]+1804603682&4294967295,m=w+(_<<7&4294967295|_>>>25),_=A+(E^m&(w^E))+I[13]+4254626195&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(w^A&(m^w))+I[14]+2792965006&4294967295,E=A+(_<<17&4294967295|_>>>15),_=w+(m^E&(A^m))+I[15]+1236535329&4294967295,w=E+(_<<22&4294967295|_>>>10),_=m+(E^A&(w^E))+I[1]+4129170786&4294967295,m=w+(_<<5&4294967295|_>>>27),_=A+(w^E&(m^w))+I[6]+3225465664&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^w&(A^m))+I[11]+643717713&4294967295,E=A+(_<<14&4294967295|_>>>18),_=w+(A^m&(E^A))+I[0]+3921069994&4294967295,w=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(w^E))+I[5]+3593408605&4294967295,m=w+(_<<5&4294967295|_>>>27),_=A+(w^E&(m^w))+I[10]+38016083&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^w&(A^m))+I[15]+3634488961&4294967295,E=A+(_<<14&4294967295|_>>>18),_=w+(A^m&(E^A))+I[4]+3889429448&4294967295,w=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(w^E))+I[9]+568446438&4294967295,m=w+(_<<5&4294967295|_>>>27),_=A+(w^E&(m^w))+I[14]+3275163606&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^w&(A^m))+I[3]+4107603335&4294967295,E=A+(_<<14&4294967295|_>>>18),_=w+(A^m&(E^A))+I[8]+1163531501&4294967295,w=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(w^E))+I[13]+2850285829&4294967295,m=w+(_<<5&4294967295|_>>>27),_=A+(w^E&(m^w))+I[2]+4243563512&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^w&(A^m))+I[7]+1735328473&4294967295,E=A+(_<<14&4294967295|_>>>18),_=w+(A^m&(E^A))+I[12]+2368359562&4294967295,w=E+(_<<20&4294967295|_>>>12),_=m+(w^E^A)+I[5]+4294588738&4294967295,m=w+(_<<4&4294967295|_>>>28),_=A+(m^w^E)+I[8]+2272392833&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^w)+I[11]+1839030562&4294967295,E=A+(_<<16&4294967295|_>>>16),_=w+(E^A^m)+I[14]+4259657740&4294967295,w=E+(_<<23&4294967295|_>>>9),_=m+(w^E^A)+I[1]+2763975236&4294967295,m=w+(_<<4&4294967295|_>>>28),_=A+(m^w^E)+I[4]+1272893353&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^w)+I[7]+4139469664&4294967295,E=A+(_<<16&4294967295|_>>>16),_=w+(E^A^m)+I[10]+3200236656&4294967295,w=E+(_<<23&4294967295|_>>>9),_=m+(w^E^A)+I[13]+681279174&4294967295,m=w+(_<<4&4294967295|_>>>28),_=A+(m^w^E)+I[0]+3936430074&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^w)+I[3]+3572445317&4294967295,E=A+(_<<16&4294967295|_>>>16),_=w+(E^A^m)+I[6]+76029189&4294967295,w=E+(_<<23&4294967295|_>>>9),_=m+(w^E^A)+I[9]+3654602809&4294967295,m=w+(_<<4&4294967295|_>>>28),_=A+(m^w^E)+I[12]+3873151461&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^w)+I[15]+530742520&4294967295,E=A+(_<<16&4294967295|_>>>16),_=w+(E^A^m)+I[2]+3299628645&4294967295,w=E+(_<<23&4294967295|_>>>9),_=m+(E^(w|~A))+I[0]+4096336452&4294967295,m=w+(_<<6&4294967295|_>>>26),_=A+(w^(m|~E))+I[7]+1126891415&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~w))+I[14]+2878612391&4294967295,E=A+(_<<15&4294967295|_>>>17),_=w+(A^(E|~m))+I[5]+4237533241&4294967295,w=E+(_<<21&4294967295|_>>>11),_=m+(E^(w|~A))+I[12]+1700485571&4294967295,m=w+(_<<6&4294967295|_>>>26),_=A+(w^(m|~E))+I[3]+2399980690&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~w))+I[10]+4293915773&4294967295,E=A+(_<<15&4294967295|_>>>17),_=w+(A^(E|~m))+I[1]+2240044497&4294967295,w=E+(_<<21&4294967295|_>>>11),_=m+(E^(w|~A))+I[8]+1873313359&4294967295,m=w+(_<<6&4294967295|_>>>26),_=A+(w^(m|~E))+I[15]+4264355552&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~w))+I[6]+2734768916&4294967295,E=A+(_<<15&4294967295|_>>>17),_=w+(A^(E|~m))+I[13]+1309151649&4294967295,w=E+(_<<21&4294967295|_>>>11),_=m+(E^(w|~A))+I[4]+4149444226&4294967295,m=w+(_<<6&4294967295|_>>>26),_=A+(w^(m|~E))+I[11]+3174756917&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~w))+I[2]+718787259&4294967295,E=A+(_<<15&4294967295|_>>>17),_=w+(A^(E|~m))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+m&4294967295,T.g[1]=T.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.u=function(T,m){m===void 0&&(m=T.length);for(var w=m-this.blockSize,I=this.B,E=this.h,A=0;A<m;){if(E==0)for(;A<=w;)i(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<m;)if(I[E++]=T.charCodeAt(A++),E==this.blockSize){i(this,I),E=0;break}}else for(;A<m;)if(I[E++]=T[A++],E==this.blockSize){i(this,I),E=0;break}}this.h=E,this.o+=m},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var m=1;m<T.length-8;++m)T[m]=0;var w=8*this.o;for(m=T.length-8;m<T.length;++m)T[m]=w&255,w/=256;for(this.u(T),T=Array(16),m=w=0;4>m;++m)for(var I=0;32>I;I+=8)T[w++]=this.g[m]>>>I&255;return T};function s(T,m){var w=c;return Object.prototype.hasOwnProperty.call(w,T)?w[T]:w[T]=m(T)}function a(T,m){this.h=m;for(var w=[],I=!0,E=T.length-1;0<=E;E--){var A=T[E]|0;I&&A==m||(w[E]=A,I=!1)}this.g=w}var c={};function l(T){return-128<=T&&128>T?s(T,function(m){return new a([m|0],0>m?-1:0)}):new a([T|0],0>T?-1:0)}function d(T){if(isNaN(T)||!isFinite(T))return g;if(0>T)return V(d(-T));for(var m=[],w=1,I=0;T>=w;I++)m[I]=T/w|0,w*=4294967296;return new a(m,0)}function p(T,m){if(T.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(T.charAt(0)=="-")return V(p(T.substring(1),m));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=d(Math.pow(m,8)),I=g,E=0;E<T.length;E+=8){var A=Math.min(8,T.length-E),_=parseInt(T.substring(E,E+A),m);8>A?(A=d(Math.pow(m,A)),I=I.j(A).add(d(_))):(I=I.j(w),I=I.add(d(_)))}return I}var g=l(0),y=l(1),P=l(16777216);n=a.prototype,n.m=function(){if(M(this))return-V(this).m();for(var T=0,m=1,w=0;w<this.g.length;w++){var I=this.i(w);T+=(0<=I?I:4294967296+I)*m,m*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(k(this))return"0";if(M(this))return"-"+V(this).toString(T);for(var m=d(Math.pow(T,6)),w=this,I="";;){var E=_e(w,m).g;w=G(w,E.j(m));var A=((0<w.g.length?w.g[0]:w.h)>>>0).toString(T);if(w=E,k(w))return A+I;for(;6>A.length;)A="0"+A;I=A+I}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function k(T){if(T.h!=0)return!1;for(var m=0;m<T.g.length;m++)if(T.g[m]!=0)return!1;return!0}function M(T){return T.h==-1}n.l=function(T){return T=G(this,T),M(T)?-1:k(T)?0:1};function V(T){for(var m=T.g.length,w=[],I=0;I<m;I++)w[I]=~T.g[I];return new a(w,~T.h).add(y)}n.abs=function(){return M(this)?V(this):this},n.add=function(T){for(var m=Math.max(this.g.length,T.g.length),w=[],I=0,E=0;E<=m;E++){var A=I+(this.i(E)&65535)+(T.i(E)&65535),_=(A>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=_>>>16,A&=65535,_&=65535,w[E]=_<<16|A}return new a(w,w[w.length-1]&-2147483648?-1:0)};function G(T,m){return T.add(V(m))}n.j=function(T){if(k(this)||k(T))return g;if(M(this))return M(T)?V(this).j(V(T)):V(V(this).j(T));if(M(T))return V(this.j(V(T)));if(0>this.l(P)&&0>T.l(P))return d(this.m()*T.m());for(var m=this.g.length+T.g.length,w=[],I=0;I<2*m;I++)w[I]=0;for(I=0;I<this.g.length;I++)for(var E=0;E<T.g.length;E++){var A=this.i(I)>>>16,_=this.i(I)&65535,lt=T.i(E)>>>16,or=T.i(E)&65535;w[2*I+2*E]+=_*or,q(w,2*I+2*E),w[2*I+2*E+1]+=A*or,q(w,2*I+2*E+1),w[2*I+2*E+1]+=_*lt,q(w,2*I+2*E+1),w[2*I+2*E+2]+=A*lt,q(w,2*I+2*E+2)}for(I=0;I<m;I++)w[I]=w[2*I+1]<<16|w[2*I];for(I=m;I<2*m;I++)w[I]=0;return new a(w,0)};function q(T,m){for(;(T[m]&65535)!=T[m];)T[m+1]+=T[m]>>>16,T[m]&=65535,m++}function K(T,m){this.g=T,this.h=m}function _e(T,m){if(k(m))throw Error("division by zero");if(k(T))return new K(g,g);if(M(T))return m=_e(V(T),m),new K(V(m.g),V(m.h));if(M(m))return m=_e(T,V(m)),new K(V(m.g),m.h);if(30<T.g.length){if(M(T)||M(m))throw Error("slowDivide_ only works with positive integers.");for(var w=y,I=m;0>=I.l(T);)w=et(w),I=et(I);var E=Ie(w,1),A=Ie(I,1);for(I=Ie(I,2),w=Ie(w,2);!k(I);){var _=A.add(I);0>=_.l(T)&&(E=E.add(w),A=_),I=Ie(I,1),w=Ie(w,1)}return m=G(T,E.j(m)),new K(E,m)}for(E=g;0<=T.l(m);){for(w=Math.max(1,Math.floor(T.m()/m.m())),I=Math.ceil(Math.log(w)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),A=d(w),_=A.j(m);M(_)||0<_.l(T);)w-=I,A=d(w),_=A.j(m);k(A)&&(A=y),E=E.add(A),T=G(T,_)}return new K(E,T)}n.A=function(T){return _e(this,T).h},n.and=function(T){for(var m=Math.max(this.g.length,T.g.length),w=[],I=0;I<m;I++)w[I]=this.i(I)&T.i(I);return new a(w,this.h&T.h)},n.or=function(T){for(var m=Math.max(this.g.length,T.g.length),w=[],I=0;I<m;I++)w[I]=this.i(I)|T.i(I);return new a(w,this.h|T.h)},n.xor=function(T){for(var m=Math.max(this.g.length,T.g.length),w=[],I=0;I<m;I++)w[I]=this.i(I)^T.i(I);return new a(w,this.h^T.h)};function et(T){for(var m=T.g.length+1,w=[],I=0;I<m;I++)w[I]=T.i(I)<<1|T.i(I-1)>>>31;return new a(w,T.h)}function Ie(T,m){var w=m>>5;m%=32;for(var I=T.g.length-w,E=[],A=0;A<I;A++)E[A]=0<m?T.i(A+w)>>>m|T.i(A+w+1)<<32-m:T.i(A+w);return new a(E,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,id=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Lt=a}).apply(typeof Qu<"u"?Qu:typeof self<"u"?self:typeof window<"u"?window:{});var bi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var sd,Ar,od,Li,Fo,ad,cd,ud;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,h){return o==Array.prototype||o==Object.prototype||(o[u]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof bi=="object"&&bi];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var v=o[f];if(!(v in h))break e;h=h[v]}o=o[o.length-1],f=h[o],u=u(f),u!=f&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var h=0,f=!1,v={next:function(){if(!f&&h<o.length){var S=h++;return{value:u(S,o[S]),done:!1}}return f=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function p(o,u,h){return o.call.apply(o.bind,arguments)}function g(o,u,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,f),o.apply(u,v)}}return function(){return o.apply(u,arguments)}}function y(o,u,h){return y=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:g,y.apply(null,arguments)}function P(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function k(o,u){function h(){}h.prototype=u.prototype,o.aa=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,v,S){for(var D=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)D[Z-2]=arguments[Z];return u.prototype[v].apply(f,D)}}function M(o){const u=o.length;if(0<u){const h=Array(u);for(let f=0;f<u;f++)h[f]=o[f];return h}return[]}function V(o,u){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(l(f)){const v=o.length||0,S=f.length||0;o.length=v+S;for(let D=0;D<S;D++)o[v+D]=f[D]}else o.push(f)}}class G{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function q(o){return/^[\s\xa0]*$/.test(o)}function K(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function _e(o){return _e[" "](o),o}_e[" "]=function(){};var et=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function Ie(o,u,h){for(const f in o)u.call(h,o[f],f,o)}function T(o,u){for(const h in o)u.call(void 0,o[h],h,o)}function m(o){const u={};for(const h in o)u[h]=o[h];return u}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,u){let h,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(h in f)o[h]=f[h];for(let S=0;S<w.length;S++)h=w[S],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function E(o){var u=1;o=o.split(":");const h=[];for(;0<u&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function A(o){c.setTimeout(()=>{throw o},0)}function _(){var o=qs;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class lt{constructor(){this.h=this.g=null}add(u,h){const f=or.get();f.set(u,h),this.h?this.h.next=f:this.g=f,this.h=f}}var or=new G(()=>new Lp,o=>o.reset());class Lp{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let ar,cr=!1,qs=new lt,yc=()=>{const o=c.Promise.resolve(void 0);ar=()=>{o.then(Mp)}};var Mp=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){A(h)}var u=or;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}cr=!1};function At(){this.s=this.s,this.C=this.C}At.prototype.s=!1,At.prototype.ma=function(){this.s||(this.s=!0,this.N())},At.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ee(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}Ee.prototype.h=function(){this.defaultPrevented=!0};var xp=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch{}return o}();function ur(o,u){if(Ee.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(et){e:{try{_e(u.nodeName);var v=!0;break e}catch{}v=!1}v||(u=null)}}else h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement);this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Fp[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&ur.aa.h.call(this)}}k(ur,Ee);var Fp={2:"touch",3:"pen",4:"mouse"};ur.prototype.h=function(){ur.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ii="closure_listenable_"+(1e6*Math.random()|0),Up=0;function Bp(o,u,h,f,v){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!f,this.ha=v,this.key=++Up,this.da=this.fa=!1}function si(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function oi(o){this.src=o,this.g={},this.h=0}oi.prototype.add=function(o,u,h,f,v){var S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);var D=Ws(o,u,f,v);return-1<D?(u=o[D],h||(u.fa=!1)):(u=new Bp(u,this.src,S,!!f,v),u.fa=h,o.push(u)),u};function zs(o,u){var h=u.type;if(h in o.g){var f=o.g[h],v=Array.prototype.indexOf.call(f,u,void 0),S;(S=0<=v)&&Array.prototype.splice.call(f,v,1),S&&(si(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Ws(o,u,h,f){for(var v=0;v<o.length;++v){var S=o[v];if(!S.da&&S.listener==u&&S.capture==!!h&&S.ha==f)return v}return-1}var Hs="closure_lm_"+(1e6*Math.random()|0),Gs={};function wc(o,u,h,f,v){if(Array.isArray(u)){for(var S=0;S<u.length;S++)wc(o,u[S],h,f,v);return null}return h=Tc(h),o&&o[ii]?o.K(u,h,d(f)?!!f.capture:!1,v):$p(o,u,h,!1,f,v)}function $p(o,u,h,f,v,S){if(!u)throw Error("Invalid event type");var D=d(v)?!!v.capture:!!v,Z=Qs(o);if(Z||(o[Hs]=Z=new oi(o)),h=Z.add(u,h,f,D,S),h.proxy)return h;if(f=jp(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)xp||(v=D),v===void 0&&(v=!1),o.addEventListener(u.toString(),f,v);else if(o.attachEvent)o.attachEvent(Ec(u.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function jp(){function o(h){return u.call(o.src,o.listener,h)}const u=qp;return o}function Ic(o,u,h,f,v){if(Array.isArray(u))for(var S=0;S<u.length;S++)Ic(o,u[S],h,f,v);else f=d(f)?!!f.capture:!!f,h=Tc(h),o&&o[ii]?(o=o.i,u=String(u).toString(),u in o.g&&(S=o.g[u],h=Ws(S,h,f,v),-1<h&&(si(S[h]),Array.prototype.splice.call(S,h,1),S.length==0&&(delete o.g[u],o.h--)))):o&&(o=Qs(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Ws(u,h,f,v)),(h=-1<o?u[o]:null)&&Ks(h))}function Ks(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[ii])zs(u.i,o);else{var h=o.type,f=o.proxy;u.removeEventListener?u.removeEventListener(h,f,o.capture):u.detachEvent?u.detachEvent(Ec(h),f):u.addListener&&u.removeListener&&u.removeListener(f),(h=Qs(u))?(zs(h,o),h.h==0&&(h.src=null,u[Hs]=null)):si(o)}}}function Ec(o){return o in Gs?Gs[o]:Gs[o]="on"+o}function qp(o,u){if(o.da)o=!0;else{u=new ur(u,this);var h=o.listener,f=o.ha||o.src;o.fa&&Ks(o),o=h.call(f,u)}return o}function Qs(o){return o=o[Hs],o instanceof oi?o:null}var Ys="__closure_events_fn_"+(1e9*Math.random()>>>0);function Tc(o){return typeof o=="function"?o:(o[Ys]||(o[Ys]=function(u){return o.handleEvent(u)}),o[Ys])}function Te(){At.call(this),this.i=new oi(this),this.M=this,this.F=null}k(Te,At),Te.prototype[ii]=!0,Te.prototype.removeEventListener=function(o,u,h,f){Ic(this,o,u,h,f)};function ke(o,u){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=u.type||u,typeof u=="string")u=new Ee(u,o);else if(u instanceof Ee)u.target=u.target||o;else{var v=u;u=new Ee(f,o),I(u,v)}if(v=!0,h)for(var S=h.length-1;0<=S;S--){var D=u.g=h[S];v=ai(D,f,!0,u)&&v}if(D=u.g=o,v=ai(D,f,!0,u)&&v,v=ai(D,f,!1,u)&&v,h)for(S=0;S<h.length;S++)D=u.g=h[S],v=ai(D,f,!1,u)&&v}Te.prototype.N=function(){if(Te.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var h=o.g[u],f=0;f<h.length;f++)si(h[f]);delete o.g[u],o.h--}}this.F=null},Te.prototype.K=function(o,u,h,f){return this.i.add(String(o),u,!1,h,f)},Te.prototype.L=function(o,u,h,f){return this.i.add(String(o),u,!0,h,f)};function ai(o,u,h,f){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var v=!0,S=0;S<u.length;++S){var D=u[S];if(D&&!D.da&&D.capture==h){var Z=D.listener,ye=D.ha||D.src;D.fa&&zs(o.i,D),v=Z.call(ye,f)!==!1&&v}}return v&&!f.defaultPrevented}function vc(o,u,h){if(typeof o=="function")h&&(o=y(o,h));else if(o&&typeof o.handleEvent=="function")o=y(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function Ac(o){o.g=vc(()=>{o.g=null,o.i&&(o.i=!1,Ac(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class zp extends At{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ac(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lr(o){At.call(this),this.h=o,this.g={}}k(lr,At);var Sc=[];function bc(o){Ie(o.g,function(u,h){this.g.hasOwnProperty(h)&&Ks(u)},o),o.g={}}lr.prototype.N=function(){lr.aa.N.call(this),bc(this)},lr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Js=c.JSON.stringify,Wp=c.JSON.parse,Hp=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Xs(){}Xs.prototype.h=null;function Rc(o){return o.h||(o.h=o.i())}function Pc(){}var hr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Zs(){Ee.call(this,"d")}k(Zs,Ee);function eo(){Ee.call(this,"c")}k(eo,Ee);var Ht={},Cc=null;function ci(){return Cc=Cc||new Te}Ht.La="serverreachability";function kc(o){Ee.call(this,Ht.La,o)}k(kc,Ee);function dr(o){const u=ci();ke(u,new kc(u))}Ht.STAT_EVENT="statevent";function Dc(o,u){Ee.call(this,Ht.STAT_EVENT,o),this.stat=u}k(Dc,Ee);function De(o){const u=ci();ke(u,new Dc(u,o))}Ht.Ma="timingevent";function Nc(o,u){Ee.call(this,Ht.Ma,o),this.size=u}k(Nc,Ee);function fr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function pr(){this.g=!0}pr.prototype.xa=function(){this.g=!1};function Gp(o,u,h,f,v,S){o.info(function(){if(o.g)if(S)for(var D="",Z=S.split("&"),ye=0;ye<Z.length;ye++){var J=Z[ye].split("=");if(1<J.length){var ve=J[0];J=J[1];var Ae=ve.split("_");D=2<=Ae.length&&Ae[1]=="type"?D+(ve+"="+J+"&"):D+(ve+"=redacted&")}}else D=null;else D=S;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+u+`
`+h+`
`+D})}function Kp(o,u,h,f,v,S,D){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+u+`
`+h+`
`+S+" "+D})}function wn(o,u,h,f){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Yp(o,h)+(f?" "+f:"")})}function Qp(o,u){o.info(function(){return"TIMEOUT: "+u})}pr.prototype.info=function(){};function Yp(o,u){if(!o.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var v=f[1];if(Array.isArray(v)&&!(1>v.length)){var S=v[0];if(S!="noop"&&S!="stop"&&S!="close")for(var D=1;D<v.length;D++)v[D]=""}}}}return Js(h)}catch{return u}}var ui={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Vc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},to;function li(){}k(li,Xs),li.prototype.g=function(){return new XMLHttpRequest},li.prototype.i=function(){return{}},to=new li;function St(o,u,h,f){this.j=o,this.i=u,this.l=h,this.R=f||1,this.U=new lr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Oc}function Oc(){this.i=null,this.g="",this.h=!1}var Lc={},no={};function ro(o,u,h){o.L=1,o.v=pi(ht(u)),o.m=h,o.P=!0,Mc(o,null)}function Mc(o,u){o.F=Date.now(),hi(o),o.A=ht(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),Yc(h.i,"t",f),o.C=0,h=o.j.J,o.h=new Oc,o.g=pu(o.j,h?u:null,!o.m),0<o.O&&(o.M=new zp(y(o.Y,o,o.g),o.O)),u=o.U,h=o.g,f=o.ca;var v="readystatechange";Array.isArray(v)||(v&&(Sc[0]=v.toString()),v=Sc);for(var S=0;S<v.length;S++){var D=wc(h,v[S],f||u.handleEvent,!1,u.h||u);if(!D)break;u.g[D.key]=D}u=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),dr(),Gp(o.i,o.u,o.A,o.l,o.R,o.m)}St.prototype.ca=function(o){o=o.target;const u=this.M;u&&dt(o)==3?u.j():this.Y(o)},St.prototype.Y=function(o){try{if(o==this.g)e:{const Ae=dt(this.g);var u=this.g.Ba();const Tn=this.g.Z();if(!(3>Ae)&&(Ae!=3||this.g&&(this.h.h||this.g.oa()||ru(this.g)))){this.J||Ae!=4||u==7||(u==8||0>=Tn?dr(3):dr(2)),io(this);var h=this.g.Z();this.X=h;t:if(xc(this)){var f=ru(this.g);o="";var v=f.length,S=dt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Gt(this),mr(this);var D="";break t}this.h.i=new c.TextDecoder}for(u=0;u<v;u++)this.h.h=!0,o+=this.h.i.decode(f[u],{stream:!(S&&u==v-1)});f.length=0,this.h.g+=o,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,Kp(this.i,this.u,this.A,this.l,this.R,Ae,h),this.o){if(this.T&&!this.K){t:{if(this.g){var Z,ye=this.g;if((Z=ye.g?ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(Z)){var J=Z;break t}}J=null}if(h=J)wn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,so(this,h);else{this.o=!1,this.s=3,De(12),Gt(this),mr(this);break e}}if(this.P){h=!0;let je;for(;!this.J&&this.C<D.length;)if(je=Jp(this,D),je==no){Ae==4&&(this.s=4,De(14),h=!1),wn(this.i,this.l,null,"[Incomplete Response]");break}else if(je==Lc){this.s=4,De(15),wn(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else wn(this.i,this.l,je,null),so(this,je);if(xc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ae!=4||D.length!=0||this.h.h||(this.s=1,De(16),h=!1),this.o=this.o&&h,!h)wn(this.i,this.l,D,"[Invalid Chunked Response]"),Gt(this),mr(this);else if(0<D.length&&!this.W){this.W=!0;var ve=this.j;ve.g==this&&ve.ba&&!ve.M&&(ve.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),ho(ve),ve.M=!0,De(11))}}else wn(this.i,this.l,D,null),so(this,D);Ae==4&&Gt(this),this.o&&!this.J&&(Ae==4?lu(this.j,this):(this.o=!1,hi(this)))}else pm(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,De(12)):(this.s=0,De(13)),Gt(this),mr(this)}}}catch{}finally{}};function xc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Jp(o,u){var h=o.C,f=u.indexOf(`
`,h);return f==-1?no:(h=Number(u.substring(h,f)),isNaN(h)?Lc:(f+=1,f+h>u.length?no:(u=u.slice(f,f+h),o.C=f+h,u)))}St.prototype.cancel=function(){this.J=!0,Gt(this)};function hi(o){o.S=Date.now()+o.I,Fc(o,o.I)}function Fc(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=fr(y(o.ba,o),u)}function io(o){o.B&&(c.clearTimeout(o.B),o.B=null)}St.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Qp(this.i,this.A),this.L!=2&&(dr(),De(17)),Gt(this),this.s=2,mr(this)):Fc(this,this.S-o)};function mr(o){o.j.G==0||o.J||lu(o.j,o)}function Gt(o){io(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,bc(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function so(o,u){try{var h=o.j;if(h.G!=0&&(h.g==o||oo(h.h,o))){if(!o.K&&oo(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Ii(h),yi(h);else break e;lo(h),De(18)}}else h.za=v[1],0<h.za-h.T&&37500>v[2]&&h.F&&h.v==0&&!h.C&&(h.C=fr(y(h.Za,h),6e3));if(1>=$c(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Qt(h,11)}else if((o.K||h.g==o)&&Ii(h),!q(u))for(v=h.Da.g.parse(u),u=0;u<v.length;u++){let J=v[u];if(h.T=J[0],J=J[1],h.G==2)if(J[0]=="c"){h.K=J[1],h.ia=J[2];const ve=J[3];ve!=null&&(h.la=ve,h.j.info("VER="+h.la));const Ae=J[4];Ae!=null&&(h.Aa=Ae,h.j.info("SVER="+h.Aa));const Tn=J[5];Tn!=null&&typeof Tn=="number"&&0<Tn&&(f=1.5*Tn,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const je=o.g;if(je){const Ti=je.g?je.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ti){var S=f.h;S.g||Ti.indexOf("spdy")==-1&&Ti.indexOf("quic")==-1&&Ti.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(ao(S,S.h),S.h=null))}if(f.D){const fo=je.g?je.g.getResponseHeader("X-HTTP-Session-Id"):null;fo&&(f.ya=fo,ne(f.I,f.D,fo))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var D=o;if(f.qa=fu(f,f.J?f.ia:null,f.W),D.K){jc(f.h,D);var Z=D,ye=f.L;ye&&(Z.I=ye),Z.B&&(io(Z),hi(Z)),f.g=D}else cu(f);0<h.i.length&&wi(h)}else J[0]!="stop"&&J[0]!="close"||Qt(h,7);else h.G==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?Qt(h,7):uo(h):J[0]!="noop"&&h.l&&h.l.ta(J),h.v=0)}}dr(4)}catch{}}var Xp=class{constructor(o,u){this.g=o,this.map=u}};function Uc(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Bc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function $c(o){return o.h?1:o.g?o.g.size:0}function oo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function ao(o,u){o.g?o.g.add(u):o.h=u}function jc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Uc.prototype.cancel=function(){if(this.i=qc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function qc(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const h of o.g.values())u=u.concat(h.D);return u}return M(o.i)}function Zp(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],h=o.length,f=0;f<h;f++)u.push(o[f]);return u}u=[],h=0;for(f in o)u[h++]=o[f];return u}function em(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var h=0;h<o;h++)u.push(h);return u}u=[],h=0;for(const f in o)u[h++]=f;return u}}}function zc(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var h=em(o),f=Zp(o),v=f.length,S=0;S<v;S++)u.call(void 0,f[S],h&&h[S],o)}var Wc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tm(o,u){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),v=null;if(0<=f){var S=o[h].substring(0,f);v=o[h].substring(f+1)}else S=o[h];u(S,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function Kt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Kt){this.h=o.h,di(this,o.j),this.o=o.o,this.g=o.g,fi(this,o.s),this.l=o.l;var u=o.i,h=new yr;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),Hc(this,h),this.m=o.m}else o&&(u=String(o).match(Wc))?(this.h=!1,di(this,u[1]||"",!0),this.o=gr(u[2]||""),this.g=gr(u[3]||"",!0),fi(this,u[4]),this.l=gr(u[5]||"",!0),Hc(this,u[6]||"",!0),this.m=gr(u[7]||"")):(this.h=!1,this.i=new yr(null,this.h))}Kt.prototype.toString=function(){var o=[],u=this.j;u&&o.push(_r(u,Gc,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(_r(u,Gc,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(_r(h,h.charAt(0)=="/"?im:rm,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",_r(h,om)),o.join("")};function ht(o){return new Kt(o)}function di(o,u,h){o.j=h?gr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function fi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function Hc(o,u,h){u instanceof yr?(o.i=u,am(o.i,o.h)):(h||(u=_r(u,sm)),o.i=new yr(u,o.h))}function ne(o,u,h){o.i.set(u,h)}function pi(o){return ne(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function gr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function _r(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,nm),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function nm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Gc=/[#\/\?@]/g,rm=/[#\?:]/g,im=/[#\?]/g,sm=/[#\?@]/g,om=/#/g;function yr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function bt(o){o.g||(o.g=new Map,o.h=0,o.i&&tm(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=yr.prototype,n.add=function(o,u){bt(this),this.i=null,o=In(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function Kc(o,u){bt(o),u=In(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Qc(o,u){return bt(o),u=In(o,u),o.g.has(u)}n.forEach=function(o,u){bt(this),this.g.forEach(function(h,f){h.forEach(function(v){o.call(u,v,f,this)},this)},this)},n.na=function(){bt(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let f=0;f<u.length;f++){const v=o[f];for(let S=0;S<v.length;S++)h.push(u[f])}return h},n.V=function(o){bt(this);let u=[];if(typeof o=="string")Qc(this,o)&&(u=u.concat(this.g.get(In(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)u=u.concat(o[h])}return u},n.set=function(o,u){return bt(this),this.i=null,o=In(this,o),Qc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Yc(o,u,h){Kc(o,u),0<h.length&&(o.i=null,o.g.set(In(o,u),M(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var f=u[h];const S=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var v=S;D[f]!==""&&(v+="="+encodeURIComponent(String(D[f]))),o.push(v)}}return this.i=o.join("&")};function In(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function am(o,u){u&&!o.j&&(bt(o),o.i=null,o.g.forEach(function(h,f){var v=f.toLowerCase();f!=v&&(Kc(this,f),Yc(this,v,h))},o)),o.j=u}function cm(o,u){const h=new pr;if(c.Image){const f=new Image;f.onload=P(Rt,h,"TestLoadImage: loaded",!0,u,f),f.onerror=P(Rt,h,"TestLoadImage: error",!1,u,f),f.onabort=P(Rt,h,"TestLoadImage: abort",!1,u,f),f.ontimeout=P(Rt,h,"TestLoadImage: timeout",!1,u,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else u(!1)}function um(o,u){const h=new pr,f=new AbortController,v=setTimeout(()=>{f.abort(),Rt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:f.signal}).then(S=>{clearTimeout(v),S.ok?Rt(h,"TestPingServer: ok",!0,u):Rt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),Rt(h,"TestPingServer: error",!1,u)})}function Rt(o,u,h,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(h)}catch{}}function lm(){this.g=new Hp}function hm(o,u,h){const f=h||"";try{zc(o,function(v,S){let D=v;d(v)&&(D=Js(v)),u.push(f+S+"="+encodeURIComponent(D))})}catch(v){throw u.push(f+"type="+encodeURIComponent("_badmap")),v}}function mi(o){this.l=o.Ub||null,this.j=o.eb||!1}k(mi,Xs),mi.prototype.g=function(){return new gi(this.l,this.j)},mi.prototype.i=function(o){return function(){return o}}({});function gi(o,u){Te.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(gi,Te),n=gi.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Ir(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,wr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Ir(this)),this.g&&(this.readyState=3,Ir(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Jc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Jc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?wr(this):Ir(this),this.readyState==3&&Jc(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,wr(this))},n.Qa=function(o){this.g&&(this.response=o,wr(this))},n.ga=function(){this.g&&wr(this)};function wr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Ir(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function Ir(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(gi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Xc(o){let u="";return Ie(o,function(h,f){u+=f,u+=":",u+=h,u+=`\r
`}),u}function co(o,u,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Xc(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):ne(o,u,h))}function oe(o){Te.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(oe,Te);var dm=/^https?$/i,fm=["POST","PUT"];n=oe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():to.g(),this.v=this.o?Rc(this.o):Rc(to),this.g.onreadystatechange=y(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(S){Zc(this,S);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)h.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const S of f.keys())h.set(S,f.get(S));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),v=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(fm,u,void 0))||f||v||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,D]of h)this.g.setRequestHeader(S,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{nu(this),this.u=!0,this.g.send(o),this.u=!1}catch(S){Zc(this,S)}};function Zc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,eu(o),_i(o)}function eu(o){o.A||(o.A=!0,ke(o,"complete"),ke(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ke(this,"complete"),ke(this,"abort"),_i(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),_i(this,!0)),oe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?tu(this):this.bb())},n.bb=function(){tu(this)};function tu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||dt(o)!=4||o.Z()!=2)){if(o.u&&dt(o)==4)vc(o.Ea,0,o);else if(ke(o,"readystatechange"),dt(o)==4){o.h=!1;try{const D=o.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var f;if(f=D===0){var v=String(o.D).match(Wc)[1]||null;!v&&c.self&&c.self.location&&(v=c.self.location.protocol.slice(0,-1)),f=!dm.test(v?v.toLowerCase():"")}h=f}if(h)ke(o,"complete"),ke(o,"success");else{o.m=6;try{var S=2<dt(o)?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.Z()+"]",eu(o)}}finally{_i(o)}}}}function _i(o,u){if(o.g){nu(o);const h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||ke(o,"ready");try{h.onreadystatechange=f}catch{}}}function nu(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function dt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<dt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Wp(u)}};function ru(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function pm(o){const u={};o=(o.g&&2<=dt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(q(o[f]))continue;var h=E(o[f]);const v=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=u[v]||[];u[v]=S,S.push(h)}T(u,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Er(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function iu(o){this.Aa=0,this.i=[],this.j=new pr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Er("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Er("baseRetryDelayMs",5e3,o),this.cb=Er("retryDelaySeedMs",1e4,o),this.Wa=Er("forwardChannelMaxRetries",2,o),this.wa=Er("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Uc(o&&o.concurrentRequestLimit),this.Da=new lm,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=iu.prototype,n.la=8,n.G=1,n.connect=function(o,u,h,f){De(0),this.W=o,this.H=u||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=fu(this,null,this.W),wi(this)};function uo(o){if(su(o),o.G==3){var u=o.U++,h=ht(o.I);if(ne(h,"SID",o.K),ne(h,"RID",u),ne(h,"TYPE","terminate"),Tr(o,h),u=new St(o,o.j,u),u.L=2,u.v=pi(ht(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=pu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),hi(u)}du(o)}function yi(o){o.g&&(ho(o),o.g.cancel(),o.g=null)}function su(o){yi(o),o.u&&(c.clearTimeout(o.u),o.u=null),Ii(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function wi(o){if(!Bc(o.h)&&!o.s){o.s=!0;var u=o.Ga;ar||yc(),cr||(ar(),cr=!0),qs.add(u,o),o.B=0}}function mm(o,u){return $c(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=fr(y(o.Ga,o,u),hu(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const v=new St(this,this.j,o);let S=this.o;if(this.S&&(S?(S=m(S),I(S,this.S)):S=this.S),this.m!==null||this.O||(v.H=S,S=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(u+=f,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=au(this,v,u),h=ht(this.I),ne(h,"RID",o),ne(h,"CVER",22),this.D&&ne(h,"X-HTTP-Session-Id",this.D),Tr(this,h),S&&(this.O?u="headers="+encodeURIComponent(String(Xc(S)))+"&"+u:this.m&&co(h,this.m,S)),ao(this.h,v),this.Ua&&ne(h,"TYPE","init"),this.P?(ne(h,"$req",u),ne(h,"SID","null"),v.T=!0,ro(v,h,null)):ro(v,h,u),this.G=2}}else this.G==3&&(o?ou(this,o):this.i.length==0||Bc(this.h)||ou(this))};function ou(o,u){var h;u?h=u.l:h=o.U++;const f=ht(o.I);ne(f,"SID",o.K),ne(f,"RID",h),ne(f,"AID",o.T),Tr(o,f),o.m&&o.o&&co(f,o.m,o.o),h=new St(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),u&&(o.i=u.D.concat(o.i)),u=au(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),ao(o.h,h),ro(h,f,u)}function Tr(o,u){o.H&&Ie(o.H,function(h,f){ne(u,f,h)}),o.l&&zc({},function(h,f){ne(u,f,h)})}function au(o,u,h){h=Math.min(o.i.length,h);var f=o.l?y(o.l.Na,o.l,o):null;e:{var v=o.i;let S=-1;for(;;){const D=["count="+h];S==-1?0<h?(S=v[0].g,D.push("ofs="+S)):S=0:D.push("ofs="+S);let Z=!0;for(let ye=0;ye<h;ye++){let J=v[ye].g;const ve=v[ye].map;if(J-=S,0>J)S=Math.max(0,v[ye].g-100),Z=!1;else try{hm(ve,D,"req"+J+"_")}catch{f&&f(ve)}}if(Z){f=D.join("&");break e}}}return o=o.i.splice(0,h),u.D=o,f}function cu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;ar||yc(),cr||(ar(),cr=!0),qs.add(u,o),o.v=0}}function lo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=fr(y(o.Fa,o),hu(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,uu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=fr(y(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,De(10),yi(this),uu(this))};function ho(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function uu(o){o.g=new St(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=ht(o.qa);ne(u,"RID","rpc"),ne(u,"SID",o.K),ne(u,"AID",o.T),ne(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&ne(u,"TO",o.ja),ne(u,"TYPE","xmlhttp"),Tr(o,u),o.m&&o.o&&co(u,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=pi(ht(u)),h.m=null,h.P=!0,Mc(h,o)}n.Za=function(){this.C!=null&&(this.C=null,yi(this),lo(this),De(19))};function Ii(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function lu(o,u){var h=null;if(o.g==u){Ii(o),ho(o),o.g=null;var f=2}else if(oo(o.h,u))h=u.D,jc(o.h,u),f=1;else return;if(o.G!=0){if(u.o)if(f==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var v=o.B;f=ci(),ke(f,new Nc(f,h)),wi(o)}else cu(o);else if(v=u.s,v==3||v==0&&0<u.X||!(f==1&&mm(o,u)||f==2&&lo(o)))switch(h&&0<h.length&&(u=o.h,u.i=u.i.concat(h)),v){case 1:Qt(o,5);break;case 4:Qt(o,10);break;case 3:Qt(o,6);break;default:Qt(o,2)}}}function hu(o,u){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*u}function Qt(o,u){if(o.j.info("Error code "+u),u==2){var h=y(o.fb,o),f=o.Xa;const v=!f;f=new Kt(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||di(f,"https"),pi(f),v?cm(f.toString(),h):um(f.toString(),h)}else De(2);o.G=0,o.l&&o.l.sa(u),du(o),su(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),De(2)):(this.j.info("Failed to ping google.com"),De(1))};function du(o){if(o.G=0,o.ka=[],o.l){const u=qc(o.h);(u.length!=0||o.i.length!=0)&&(V(o.ka,u),V(o.ka,o.i),o.h.i.length=0,M(o.i),o.i.length=0),o.l.ra()}}function fu(o,u,h){var f=h instanceof Kt?ht(h):new Kt(h);if(f.g!="")u&&(f.g=u+"."+f.g),fi(f,f.s);else{var v=c.location;f=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;var S=new Kt(null);f&&di(S,f),u&&(S.g=u),v&&fi(S,v),h&&(S.l=h),f=S}return h=o.D,u=o.ya,h&&u&&ne(f,h,u),ne(f,"VER",o.la),Tr(o,f),f}function pu(o,u,h){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new oe(new mi({eb:h})):new oe(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function mu(){}n=mu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ei(){}Ei.prototype.g=function(o,u){return new Me(o,u)};function Me(o,u){Te.call(this),this.g=new iu(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!q(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!q(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new En(this)}k(Me,Te),Me.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Me.prototype.close=function(){uo(this.g)},Me.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Js(o),o=h);u.i.push(new Xp(u.Ya++,o)),u.G==3&&wi(u)},Me.prototype.N=function(){this.g.l=null,delete this.j,uo(this.g),delete this.g,Me.aa.N.call(this)};function gu(o){Zs.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}k(gu,Zs);function _u(){eo.call(this),this.status=1}k(_u,eo);function En(o){this.g=o}k(En,mu),En.prototype.ua=function(){ke(this.g,"a")},En.prototype.ta=function(o){ke(this.g,new gu(o))},En.prototype.sa=function(o){ke(this.g,new _u)},En.prototype.ra=function(){ke(this.g,"b")},Ei.prototype.createWebChannel=Ei.prototype.g,Me.prototype.send=Me.prototype.o,Me.prototype.open=Me.prototype.m,Me.prototype.close=Me.prototype.close,ud=function(){return new Ei},cd=function(){return ci()},ad=Ht,Fo={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ui.NO_ERROR=0,ui.TIMEOUT=8,ui.HTTP_ERROR=6,Li=ui,Vc.COMPLETE="complete",od=Vc,Pc.EventType=hr,hr.OPEN="a",hr.CLOSE="b",hr.ERROR="c",hr.MESSAGE="d",Te.prototype.listen=Te.prototype.K,Ar=Pc,oe.prototype.listenOnce=oe.prototype.L,oe.prototype.getLastError=oe.prototype.Ka,oe.prototype.getLastErrorCode=oe.prototype.Ba,oe.prototype.getStatus=oe.prototype.Z,oe.prototype.getResponseJson=oe.prototype.Oa,oe.prototype.getResponseText=oe.prototype.oa,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Ha,sd=oe}).apply(typeof bi<"u"?bi:typeof self<"u"?self:typeof window<"u"?window:{});const Yu="@firebase/firestore",Ju="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}be.UNAUTHENTICATED=new be(null),be.GOOGLE_CREDENTIALS=new be("google-credentials-uid"),be.FIRST_PARTY=new be("first-party-uid"),be.MOCK_USER=new be("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yn="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on=new us("@firebase/firestore");function vn(){return on.logLevel}function O(n,...e){if(on.logLevel<=z.DEBUG){const t=e.map(_a);on.debug(`Firestore (${Yn}): ${n}`,...t)}}function Et(n,...e){if(on.logLevel<=z.ERROR){const t=e.map(_a);on.error(`Firestore (${Yn}): ${n}`,...t)}}function an(n,...e){if(on.logLevel<=z.WARN){const t=e.map(_a);on.warn(`Firestore (${Yn}): ${n}`,...t)}}function _a(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,ld(n,r,t)}function ld(n,e,t){let r=`FIRESTORE (${Yn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Et(r),new Error(r)}function X(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||ld(e,i,r)}function $(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends Xe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class dd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(be.UNAUTHENTICATED))}shutdown(){}}class Sw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class bw{constructor(e){this.t=e,this.currentUser=be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){X(this.o===void 0,42304);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new gt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new gt,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new gt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string",31837,{l:r}),new hd(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string",2055,{h:e}),new be(e)}}class Rw{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=be.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Pw{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Rw(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(be.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Xu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Cw{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){X(this.o===void 0,3512);const r=s=>{s.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Xu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(X(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Xu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kw(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=kw(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function W(n,e){return n<e?-1:n>e?1:0}function Uo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const i=n.charAt(r),s=e.charAt(r);if(i!==s)return Eo(i)===Eo(s)?W(i,s):Eo(i)?1:-1}return W(n.length,e.length)}const Dw=55296,Nw=57343;function Eo(n){const e=n.charCodeAt(0);return e>=Dw&&e<=Nw}function Mn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zu="__name__";class tt{constructor(e,t,r){t===void 0?t=0:t>e.length&&F(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&F(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return tt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof tt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=tt.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return W(e.length,t.length)}static compareSegments(e,t){const r=tt.isNumericId(e),i=tt.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?tt.extractNumericId(e).compare(tt.extractNumericId(t)):Uo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Lt.fromString(e.substring(4,e.length-2))}}class te extends tt{construct(e,t,r){return new te(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new te(t)}static emptyPath(){return new te([])}}const Vw=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class me extends tt{construct(e,t,r){return new me(e,t,r)}static isValidIdentifier(e){return Vw.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),me.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Zu}static keyField(){return new me([Zu])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new N(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new N(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new N(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new N(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new me(t)}static emptyPath(){return new me([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(te.fromString(e))}static fromName(e){return new x(te.fromString(e).popFirst(5))}static empty(){return new x(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new te(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(n,e,t){if(!t)throw new N(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function pd(n,e,t,r){if(e===!0&&r===!0)throw new N(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function el(n){if(!x.isDocumentKey(n))throw new N(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function tl(n){if(x.isDocumentKey(n))throw new N(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function md(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ps(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":F(12329,{type:typeof n})}function Pe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ps(n);throw new N(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(n,e){const t={typeString:n};return e&&(t.value=e),t}function Kr(n,e){if(!md(n))throw new N(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new N(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl=-62135596800,rl=1e6;class ee{static now(){return ee.fromMillis(Date.now())}static fromDate(e){return ee.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*rl);return new ee(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<nl)throw new N(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/rl}_compareTo(e){return this.seconds===e.seconds?W(this.nanoseconds,e.nanoseconds):W(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ee._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Kr(e,ee._jsonSchema))return new ee(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-nl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ee._jsonSchemaVersion="firestore/timestamp/1.0",ee._jsonSchema={type:de("string",ee._jsonSchemaVersion),seconds:de("number"),nanoseconds:de("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{static fromTimestamp(e){return new B(e)}static min(){return new B(new ee(0,0))}static max(){return new B(new ee(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr=-1;function Ow(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=B.fromTimestamp(r===1e9?new ee(t+1,0):new ee(t,r));return new Ft(i,x.empty(),e)}function Lw(n){return new Ft(n.readTime,n.key,Fr)}class Ft{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Ft(B.min(),x.empty(),Fr)}static max(){return new Ft(B.max(),x.empty(),Fr)}}function Mw(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:W(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Fw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jn(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==xw)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},l=>r(l))}),a=!0,s===i&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(i=>i?C.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new C((r,i)=>{const s=e.length,a=new Array(s);let c=0;for(let l=0;l<s;l++){const d=l;t(e[d]).next(p=>{a[d]=p,++c,c===s&&r(a)},p=>i(p))}})}static doWhile(e,t){return new C((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function Uw(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Xn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ms.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya=-1;function gs(n){return n==null}function Ki(n){return n===0&&1/n==-1/0}function Bw(n){return typeof n=="number"&&Number.isInteger(n)&&!Ki(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd="";function $w(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=il(e)),e=jw(n.get(t),e);return il(e)}function jw(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case gd:t+="";break;default:t+=s}}return t}function il(n){return n+gd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function zt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function _d(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||we.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,we.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,we.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ri(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ri(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ri(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ri(this.root,e,this.comparator,!0)}}class Ri{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class we{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??we.RED,this.left=i??we.EMPTY,this.right=s??we.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new we(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return we.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return we.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw F(27949);return e+(this.isRed()?0:1)}}we.EMPTY=null,we.RED=!0,we.BLACK=!1;we.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new we(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ol(this.data.getIterator())}getIteratorFrom(e){return new ol(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof fe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new fe(this.comparator);return t.data=e,t}}class ol{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e){this.fields=e,e.sort(me.comparator)}static empty(){return new Fe([])}unionWith(e){let t=new fe(me.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Fe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Mn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new yd("Invalid base64 string: "+s):s}}(e);return new ge(t)}static fromUint8Array(e){const t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return W(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ge.EMPTY_BYTE_STRING=new ge("");const qw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ut(n){if(X(!!n,39018),typeof n=="string"){let e=0;const t=qw.exec(n);if(X(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ue(n.seconds),nanos:ue(n.nanos)}}function ue(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Bt(n){return typeof n=="string"?ge.fromBase64String(n):ge.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="server_timestamp",Id="__type__",Ed="__previous_value__",Td="__local_write_time__";function wa(n){return(n?.mapValue?.fields||{})[Id]?.stringValue===wd}function _s(n){const e=n.mapValue.fields[Ed];return wa(e)?_s(e):e}function Ur(n){const e=Ut(n.mapValue.fields[Td].timestampValue);return new ee(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zw{constructor(e,t,r,i,s,a,c,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=p}}const Qi="(default)";class xn{constructor(e,t){this.projectId=e,this.database=t||Qi}static empty(){return new xn("","")}get isDefaultDatabase(){return this.database===Qi}isEqual(e){return e instanceof xn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd="__type__",Ww="__max__",Pi={mapValue:{}},Ad="__vector__",Yi="value";function $t(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?wa(n)?4:Gw(n)?9007199254740991:Hw(n)?10:11:F(28295,{value:n})}function ct(n,e){if(n===e)return!0;const t=$t(n);if(t!==$t(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ur(n).isEqual(Ur(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=Ut(i.timestampValue),c=Ut(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Bt(i.bytesValue).isEqual(Bt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ue(i.geoPointValue.latitude)===ue(s.geoPointValue.latitude)&&ue(i.geoPointValue.longitude)===ue(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ue(i.integerValue)===ue(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=ue(i.doubleValue),c=ue(s.doubleValue);return a===c?Ki(a)===Ki(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Mn(n.arrayValue.values||[],e.arrayValue.values||[],ct);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(sl(a)!==sl(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!ct(a[l],c[l])))return!1;return!0}(n,e);default:return F(52216,{left:n})}}function Br(n,e){return(n.values||[]).find(t=>ct(t,e))!==void 0}function Fn(n,e){if(n===e)return 0;const t=$t(n),r=$t(e);if(t!==r)return W(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return W(n.booleanValue,e.booleanValue);case 2:return function(s,a){const c=ue(s.integerValue||s.doubleValue),l=ue(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return al(n.timestampValue,e.timestampValue);case 4:return al(Ur(n),Ur(e));case 5:return Uo(n.stringValue,e.stringValue);case 6:return function(s,a){const c=Bt(s),l=Bt(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const c=s.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){const p=W(c[d],l[d]);if(p!==0)return p}return W(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const c=W(ue(s.latitude),ue(a.latitude));return c!==0?c:W(ue(s.longitude),ue(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return cl(n.arrayValue,e.arrayValue);case 10:return function(s,a){const c=s.fields||{},l=a.fields||{},d=c[Yi]?.arrayValue,p=l[Yi]?.arrayValue,g=W(d?.values?.length||0,p?.values?.length||0);return g!==0?g:cl(d,p)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===Pi.mapValue&&a===Pi.mapValue)return 0;if(s===Pi.mapValue)return 1;if(a===Pi.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let g=0;g<l.length&&g<p.length;++g){const y=Uo(l[g],p[g]);if(y!==0)return y;const P=Fn(c[l[g]],d[p[g]]);if(P!==0)return P}return W(l.length,p.length)}(n.mapValue,e.mapValue);default:throw F(23264,{he:t})}}function al(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return W(n,e);const t=Ut(n),r=Ut(e),i=W(t.seconds,r.seconds);return i!==0?i:W(t.nanos,r.nanos)}function cl(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Fn(t[i],r[i]);if(s)return s}return W(t.length,r.length)}function Un(n){return Bo(n)}function Bo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Ut(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Bt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return x.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Bo(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${Bo(t.fields[a])}`;return i+"}"}(n.mapValue):F(61005,{value:n})}function Mi(n){switch($t(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=_s(n);return e?16+Mi(e):16;case 5:return 2*n.stringValue.length;case 6:return Bt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Mi(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return zt(r.fields,(s,a)=>{i+=s.length+Mi(a)}),i}(n.mapValue);default:throw F(13486,{value:n})}}function ul(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function $o(n){return!!n&&"integerValue"in n}function Ia(n){return!!n&&"arrayValue"in n}function ll(n){return!!n&&"nullValue"in n}function hl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function xi(n){return!!n&&"mapValue"in n}function Hw(n){return(n?.mapValue?.fields||{})[vd]?.stringValue===Ad}function Cr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return zt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Cr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Cr(n.arrayValue.values[t]);return e}return{...n}}function Gw(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Ww}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.value=e}static empty(){return new Oe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!xi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Cr(t)}setAll(e){let t=me.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=Cr(a):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());xi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];xi(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){zt(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Oe(Cr(this.value))}}function Sd(n){const e=[];return zt(n.fields,(t,r)=>{const i=new me([t]);if(xi(r)){const s=Sd(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new Fe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Re(e,0,B.min(),B.min(),B.min(),Oe.empty(),0)}static newFoundDocument(e,t,r,i){return new Re(e,1,t,B.min(),r,i,0)}static newNoDocument(e,t){return new Re(e,2,t,B.min(),B.min(),Oe.empty(),0)}static newUnknownDocument(e,t){return new Re(e,3,t,B.min(),B.min(),Oe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Oe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Oe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Re&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Re(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,t){this.position=e,this.inclusive=t}}function dl(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=x.comparator(x.fromName(a.referenceValue),t.key):r=Fn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function fl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ct(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(e,t="asc"){this.field=e,this.dir=t}}function Kw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{}class he extends bd{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Yw(e,t,r):t==="array-contains"?new Zw(e,r):t==="in"?new eI(e,r):t==="not-in"?new tI(e,r):t==="array-contains-any"?new nI(e,r):new he(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Jw(e,r):new Xw(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Fn(t,this.value)):t!==null&&$t(this.value)===$t(t)&&this.matchesComparison(Fn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Qe extends bd{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Qe(e,t)}matches(e){return Rd(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Rd(n){return n.op==="and"}function Pd(n){return Qw(n)&&Rd(n)}function Qw(n){for(const e of n.filters)if(e instanceof Qe)return!1;return!0}function jo(n){if(n instanceof he)return n.field.canonicalString()+n.op.toString()+Un(n.value);if(Pd(n))return n.filters.map(e=>jo(e)).join(",");{const e=n.filters.map(t=>jo(t)).join(",");return`${n.op}(${e})`}}function Cd(n,e){return n instanceof he?function(r,i){return i instanceof he&&r.op===i.op&&r.field.isEqual(i.field)&&ct(r.value,i.value)}(n,e):n instanceof Qe?function(r,i){return i instanceof Qe&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&Cd(a,i.filters[c]),!0):!1}(n,e):void F(19439)}function kd(n){return n instanceof he?function(t){return`${t.field.canonicalString()} ${t.op} ${Un(t.value)}`}(n):n instanceof Qe?function(t){return t.op.toString()+" {"+t.getFilters().map(kd).join(" ,")+"}"}(n):"Filter"}class Yw extends he{constructor(e,t,r){super(e,t,r),this.key=x.fromName(r.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class Jw extends he{constructor(e,t){super(e,"in",t),this.keys=Dd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Xw extends he{constructor(e,t){super(e,"not-in",t),this.keys=Dd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Dd(n,e){return(e.arrayValue?.values||[]).map(t=>x.fromName(t.referenceValue))}class Zw extends he{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ia(t)&&Br(t.arrayValue,this.value)}}class eI extends he{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Br(this.value.arrayValue,t)}}class tI extends he{constructor(e,t){super(e,"not-in",t)}matches(e){if(Br(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Br(this.value.arrayValue,t)}}class nI extends he{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ia(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Br(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.Te=null}}function pl(n,e=null,t=[],r=[],i=null,s=null,a=null){return new rI(n,e,t,r,i,s,a)}function Ea(n){const e=$(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>jo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),gs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Un(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Un(r)).join(",")),e.Te=t}return e.Te}function Ta(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Kw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Cd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!fl(n.startAt,e.startAt)&&fl(n.endAt,e.endAt)}function qo(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function iI(n,e,t,r,i,s,a,c){return new Zn(n,e,t,r,i,s,a,c)}function ys(n){return new Zn(n)}function ml(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Nd(n){return n.collectionGroup!==null}function kr(n){const e=$(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new fe(me.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new $r(s,r))}),t.has(me.keyField().canonicalString())||e.Ie.push(new $r(me.keyField(),r))}return e.Ie}function rt(n){const e=$(n);return e.Ee||(e.Ee=sI(e,kr(n))),e.Ee}function sI(n,e){if(n.limitType==="F")return pl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new $r(i.field,s)});const t=n.endAt?new Ji(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ji(n.startAt.position,n.startAt.inclusive):null;return pl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function zo(n,e){const t=n.filters.concat([e]);return new Zn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Wo(n,e,t){return new Zn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ws(n,e){return Ta(rt(n),rt(e))&&n.limitType===e.limitType}function Vd(n){return`${Ea(rt(n))}|lt:${n.limitType}`}function An(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>kd(i)).join(", ")}]`),gs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Un(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Un(i)).join(",")),`Target(${r})`}(rt(n))}; limitType=${n.limitType})`}function Is(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):x.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of kr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,l){const d=dl(a,c,l);return a.inclusive?d<=0:d<0}(r.startAt,kr(r),i)||r.endAt&&!function(a,c,l){const d=dl(a,c,l);return a.inclusive?d>=0:d>0}(r.endAt,kr(r),i))}(n,e)}function oI(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Od(n){return(e,t)=>{let r=!1;for(const i of kr(n)){const s=aI(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function aI(n,e,t){const r=n.field.isKeyField()?x.comparator(e.key,t.key):function(s,a,c){const l=a.data.field(s),d=c.data.field(s);return l!==null&&d!==null?Fn(l,d):F(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return F(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){zt(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return _d(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cI=new se(x.comparator);function Tt(){return cI}const Ld=new se(x.comparator);function Sr(...n){let e=Ld;for(const t of n)e=e.insert(t.key,t);return e}function Md(n){let e=Ld;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function en(){return Dr()}function xd(){return Dr()}function Dr(){return new fn(n=>n.toString(),(n,e)=>n.isEqual(e))}const uI=new se(x.comparator),lI=new fe(x.comparator);function H(...n){let e=lI;for(const t of n)e=e.add(t);return e}const hI=new fe(W);function dI(){return hI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ki(e)?"-0":e}}function Fd(n){return{integerValue:""+n}}function fI(n,e){return Bw(e)?Fd(e):va(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(){this._=void 0}}function pI(n,e,t){return n instanceof jr?function(i,s){const a={fields:{[Id]:{stringValue:wd},[Td]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&wa(s)&&(s=_s(s)),s&&(a.fields[Ed]=s),{mapValue:a}}(t,e):n instanceof Bn?Bd(n,e):n instanceof $n?$d(n,e):function(i,s){const a=Ud(i,s),c=gl(a)+gl(i.Ae);return $o(a)&&$o(i.Ae)?Fd(c):va(i.serializer,c)}(n,e)}function mI(n,e,t){return n instanceof Bn?Bd(n,e):n instanceof $n?$d(n,e):t}function Ud(n,e){return n instanceof Xi?function(r){return $o(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class jr extends Es{}class Bn extends Es{constructor(e){super(),this.elements=e}}function Bd(n,e){const t=jd(e);for(const r of n.elements)t.some(i=>ct(i,r))||t.push(r);return{arrayValue:{values:t}}}class $n extends Es{constructor(e){super(),this.elements=e}}function $d(n,e){let t=jd(e);for(const r of n.elements)t=t.filter(i=>!ct(i,r));return{arrayValue:{values:t}}}class Xi extends Es{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function gl(n){return ue(n.integerValue||n.doubleValue)}function jd(n){return Ia(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(e,t){this.field=e,this.transform=t}}function gI(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Bn&&i instanceof Bn||r instanceof $n&&i instanceof $n?Mn(r.elements,i.elements,ct):r instanceof Xi&&i instanceof Xi?ct(r.Ae,i.Ae):r instanceof jr&&i instanceof jr}(n.transform,e.transform)}class _I{constructor(e,t){this.version=e,this.transformResults=t}}class Ne{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ne}static exists(e){return new Ne(void 0,e)}static updateTime(e){return new Ne(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Fi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ts{}function qd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new vs(n.key,Ne.none()):new Qr(n.key,n.data,Ne.none());{const t=n.data,r=Oe.empty();let i=new fe(me.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Wt(n.key,r,new Fe(i.toArray()),Ne.none())}}function yI(n,e,t){n instanceof Qr?function(i,s,a){const c=i.value.clone(),l=yl(i.fieldTransforms,s,a.transformResults);c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Wt?function(i,s,a){if(!Fi(i.precondition,s))return void s.convertToUnknownDocument(a.version);const c=yl(i.fieldTransforms,s,a.transformResults),l=s.data;l.setAll(zd(i)),l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Nr(n,e,t,r){return n instanceof Qr?function(s,a,c,l){if(!Fi(s.precondition,a))return c;const d=s.value.clone(),p=wl(s.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Wt?function(s,a,c,l){if(!Fi(s.precondition,a))return c;const d=wl(s.fieldTransforms,l,a),p=a.data;return p.setAll(zd(s)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(s,a,c){return Fi(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function wI(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=Ud(r.transform,i||null);s!=null&&(t===null&&(t=Oe.empty()),t.set(r.field,s))}return t||null}function _l(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Mn(r,i,(s,a)=>gI(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Qr extends Ts{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Wt extends Ts{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function zd(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function yl(n,e,t){const r=new Map;X(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,mI(a,c,t[i]))}return r}function wl(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,pI(s,a,e))}return r}class vs extends Ts{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class II extends Ts{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&yI(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Nr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Nr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=xd();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;const l=qd(a,c);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),H())}isEqual(e){return this.batchId===e.batchId&&Mn(this.mutations,e.mutations,(t,r)=>_l(t,r))&&Mn(this.baseMutations,e.baseMutations,(t,r)=>_l(t,r))}}class Sa{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){X(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=function(){return uI}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new Sa(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var le,Q;function AI(n){switch(n){case b.OK:return F(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return F(15467,{code:n})}}function Wd(n){if(n===void 0)return Et("GRPC error has no .code"),b.UNKNOWN;switch(n){case le.OK:return b.OK;case le.CANCELLED:return b.CANCELLED;case le.UNKNOWN:return b.UNKNOWN;case le.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case le.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case le.INTERNAL:return b.INTERNAL;case le.UNAVAILABLE:return b.UNAVAILABLE;case le.UNAUTHENTICATED:return b.UNAUTHENTICATED;case le.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case le.NOT_FOUND:return b.NOT_FOUND;case le.ALREADY_EXISTS:return b.ALREADY_EXISTS;case le.PERMISSION_DENIED:return b.PERMISSION_DENIED;case le.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case le.ABORTED:return b.ABORTED;case le.OUT_OF_RANGE:return b.OUT_OF_RANGE;case le.UNIMPLEMENTED:return b.UNIMPLEMENTED;case le.DATA_LOSS:return b.DATA_LOSS;default:return F(39323,{code:n})}}(Q=le||(le={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SI(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bI=new Lt([4294967295,4294967295],0);function Il(n){const e=SI().encode(n),t=new id;return t.update(e),new Uint8Array(t.digest())}function El(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Lt([t,r],0),new Lt([i,s],0)]}class ba{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new br(`Invalid padding: ${t}`);if(r<0)throw new br(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new br(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new br(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Lt.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(Lt.fromNumber(r)));return i.compare(bI)===1&&(i=new Lt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Il(e),[r,i]=El(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(r,i,s);if(!this.we(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new ba(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const t=Il(e),[r,i]=El(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(r,i,s);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class br extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Yr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new As(B.min(),i,new se(W),Tt(),H())}}class Yr{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Yr(r,t,H(),H(),H())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(e,t,r,i){this.be=e,this.removedTargetIds=t,this.key=r,this.De=i}}class Hd{constructor(e,t){this.targetId=e,this.Ce=t}}class Gd{constructor(e,t,r=ge.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Tl{constructor(){this.ve=0,this.Fe=vl(),this.Me=ge.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=H(),t=H(),r=H();return this.Fe.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:F(38017,{changeType:s})}}),new Yr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=vl()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,X(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class RI{constructor(e){this.Ge=e,this.ze=new Map,this.je=Tt(),this.Je=Ci(),this.He=Ci(),this.Ye=new se(W)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:F(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,i)=>{this.rt(i)&&t(i)})}st(e){const t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(qo(s))if(r===0){const a=new x(s.path);this.et(t,a,Re.newNoDocument(a,B.min()))}else X(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const c=this.ut(e),l=c?this.ct(c,e,a):1;if(l!==0){this.it(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,c;try{a=Bt(r).toUint8Array()}catch(l){if(l instanceof yd)return an("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new ba(a,i,s)}catch(l){return an(l instanceof br?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.et(t,s,null),i++)}),i}Tt(e){const t=new Map;this.ze.forEach((s,a)=>{const c=this.ot(a);if(c){if(s.current&&qo(c.target)){const l=new x(c.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,Re.newNoDocument(l,e))}s.Be&&(t.set(a,s.ke()),s.qe())}});let r=H();this.He.forEach((s,a)=>{let c=!0;a.forEachWhile(l=>{const d=this.ot(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.je.forEach((s,a)=>a.setReadTime(e));const i=new As(e,t,this.Ye,this.je,r);return this.je=Tt(),this.Je=Ci(),this.He=Ci(),this.Ye=new se(W),i}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.Qe(t,1):i.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Tl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new fe(W),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new fe(W),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Tl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Ci(){return new se(x.comparator)}function vl(){return new se(x.comparator)}const PI={asc:"ASCENDING",desc:"DESCENDING"},CI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},kI={and:"AND",or:"OR"};class DI{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ho(n,e){return n.useProto3Json||gs(e)?e:{value:e}}function Zi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Kd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function NI(n,e){return Zi(n,e.toTimestamp())}function it(n){return X(!!n,49232),B.fromTimestamp(function(t){const r=Ut(t);return new ee(r.seconds,r.nanos)}(n))}function Ra(n,e){return Go(n,e).canonicalString()}function Go(n,e){const t=function(i){return new te(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Qd(n){const e=te.fromString(n);return X(ef(e),10190,{key:e.toString()}),e}function Ko(n,e){return Ra(n.databaseId,e.path)}function To(n,e){const t=Qd(e);if(t.get(1)!==n.databaseId.projectId)throw new N(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(Jd(t))}function Yd(n,e){return Ra(n.databaseId,e)}function VI(n){const e=Qd(n);return e.length===4?te.emptyPath():Jd(e)}function Qo(n){return new te(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Jd(n){return X(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Al(n,e,t){return{name:Ko(n,e),fields:t.value.mapValue.fields}}function OI(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:F(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(X(p===void 0||typeof p=="string",58123),ge.fromBase64String(p||"")):(X(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),ge.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const p=d.code===void 0?b.UNKNOWN:Wd(d.code);return new N(p,d.message||"")}(a);t=new Gd(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=To(n,r.document.name),s=it(r.document.updateTime),a=r.document.createTime?it(r.document.createTime):B.min(),c=new Oe({mapValue:{fields:r.document.fields}}),l=Re.newFoundDocument(i,s,a,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Ui(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=To(n,r.document),s=r.readTime?it(r.readTime):B.min(),a=Re.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Ui([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=To(n,r.document),s=r.removedTargetIds||[];t=new Ui([],s,i,null)}else{if(!("filter"in e))return F(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new vI(i,s),c=r.targetId;t=new Hd(c,a)}}return t}function LI(n,e){let t;if(e instanceof Qr)t={update:Al(n,e.key,e.value)};else if(e instanceof vs)t={delete:Ko(n,e.key)};else if(e instanceof Wt)t={update:Al(n,e.key,e.data),updateMask:zI(e.fieldMask)};else{if(!(e instanceof II))return F(16599,{Vt:e.type});t={verify:Ko(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const c=a.transform;if(c instanceof jr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Bn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof $n)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Xi)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw F(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:NI(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:F(27497)}(n,e.precondition)),t}function MI(n,e){return n&&n.length>0?(X(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?it(i.updateTime):it(s);return a.isEqual(B.min())&&(a=it(s)),new _I(a,i.transformResults||[])}(t,e))):[]}function xI(n,e){return{documents:[Yd(n,e.path)]}}function FI(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Yd(n,i);const s=function(d){if(d.length!==0)return Zd(Qe.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(d){if(d.length!==0)return d.map(p=>function(y){return{field:Sn(y.field),direction:$I(y.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Ho(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:i}}function UI(n){let e=VI(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){X(r===1,65062);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(g){const y=Xd(g);return y instanceof Qe&&Pd(y)?y.getFilters():[y]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(y=>function(k){return new $r(bn(k.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(y))}(t.orderBy));let c=null;t.limit&&(c=function(g){let y;return y=typeof g=="object"?g.value:g,gs(y)?null:y}(t.limit));let l=null;t.startAt&&(l=function(g){const y=!!g.before,P=g.values||[];return new Ji(P,y)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const y=!g.before,P=g.values||[];return new Ji(P,y)}(t.endAt)),iI(e,i,a,s,c,"F",l,d)}function BI(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Xd(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=bn(t.unaryFilter.field);return he.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=bn(t.unaryFilter.field);return he.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=bn(t.unaryFilter.field);return he.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=bn(t.unaryFilter.field);return he.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}}(n):n.fieldFilter!==void 0?function(t){return he.create(bn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Qe.create(t.compositeFilter.filters.map(r=>Xd(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return F(1026)}}(t.compositeFilter.op))}(n):F(30097,{filter:n})}function $I(n){return PI[n]}function jI(n){return CI[n]}function qI(n){return kI[n]}function Sn(n){return{fieldPath:n.canonicalString()}}function bn(n){return me.fromServerFormat(n.fieldPath)}function Zd(n){return n instanceof he?function(t){if(t.op==="=="){if(hl(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NAN"}};if(ll(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(hl(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NOT_NAN"}};if(ll(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Sn(t.field),op:jI(t.op),value:t.value}}}(n):n instanceof Qe?function(t){const r=t.getFilters().map(i=>Zd(i));return r.length===1?r[0]:{compositeFilter:{op:qI(t.op),filters:r}}}(n):F(54877,{filter:n})}function zI(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ef(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t,r,i,s=B.min(),a=B.min(),c=ge.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Nt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Nt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Nt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Nt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WI{constructor(e){this.yt=e}}function HI(n){const e=UI({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Wo(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GI{constructor(){this.Cn=new KI}addToCollectionParentIndex(e,t){return this.Cn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Ft.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Ft.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class KI{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new fe(te.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new fe(te.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},tf=41943040;class Ve{static withCacheSize(e){return new Ve(e,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ve.DEFAULT_COLLECTION_PERCENTILE=10,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ve.DEFAULT=new Ve(tf,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ve.DISABLED=new Ve(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new jn(0)}static cr(){return new jn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl="LruGarbageCollector",QI=1048576;function Rl([n,e],[t,r]){const i=W(n,t);return i===0?W(e,r):i}class YI{constructor(e){this.Ir=e,this.buffer=new fe(Rl),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Rl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class JI{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){O(bl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Xn(t)?O(bl,"Ignoring IndexedDB error during garbage collection: ",t):await Jn(t)}await this.Vr(3e5)})}}class XI{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return C.resolve(ms.ce);const r=new YI(t);return this.mr.forEachTarget(e,i=>r.Ar(i.sequenceNumber)).next(()=>this.mr.pr(e,i=>r.Ar(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Sl)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Sl):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,i,s,a,c,l,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),i=this.params.maximumSequenceNumbersToCollect):i=g,a=Date.now(),this.nthSequenceNumber(e,i))).next(g=>(r=g,c=Date.now(),this.removeTargets(e,r,t))).next(g=>(s=g,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),vn()<=z.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${g} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:g})))}}function ZI(n,e){return new XI(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(){this.changes=new fn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Re.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nE{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Nr(r.mutation,i,Fe.empty(),ee.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,H()).next(()=>r))}getLocalViewOfDocuments(e,t,r=H()){const i=en();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Sr();return s.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=en();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,H()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=Tt();const a=Dr(),c=function(){return Dr()}();return t.forEach((l,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof Wt)?s=s.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Nr(p.mutation,d,p.mutation.getFieldMask(),ee.now())):a.set(d.key,Fe.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>c.set(d,new tE(p,a.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const r=Dr();let i=new se((a,c)=>a-c),s=H();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let p=r.get(l)||Fe.empty();p=c.applyToLocalView(d,p),r.set(l,p);const g=(i.get(c.batchId)||H()).add(l);i=i.insert(c.batchId,g)})}).next(()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,p=l.value,g=xd();p.forEach(y=>{if(!s.has(y)){const P=qd(t.get(y),r.get(y));P!==null&&g.set(y,P),s=s.add(y)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,g))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return x.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Nd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):C.resolve(en());let c=Fr,l=s;return a.next(d=>C.forEach(d,(p,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),s.get(p)?C.resolve():this.remoteDocumentCache.getEntry(e,p).next(y=>{l=l.insert(p,y)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,H())).next(p=>({batchId:c,changes:Md(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next(r=>{let i=Sr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=Sr();return this.indexManager.getCollectionParents(e,s).next(c=>C.forEach(c,l=>{const d=function(g,y){return new Zn(y,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((g,y)=>{a=a.insert(g,y)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((l,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Re.newInvalidDocument(p)))});let c=Sr();return a.forEach((l,d)=>{const p=s.get(l);p!==void 0&&Nr(p.mutation,d,Fe.empty(),ee.now()),Is(t,d)&&(c=c.insert(l,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return C.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:it(i.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(i){return{name:i.name,query:HI(i.bundledQuery),readTime:it(i.readTime)}}(t)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(){this.overlays=new se(x.comparator),this.qr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=en();return C.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.St(e,t,s)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.qr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.qr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const i=en(),s=t.length+1,a=new x(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return C.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new se((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=en(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=en(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return C.resolve(c)}St(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.qr.get(i.largestBatchId).delete(r.key);this.qr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new TI(t,r));let s=this.qr.get(t);s===void 0&&(s=H(),this.qr.set(t,s)),this.qr.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(){this.sessionToken=ge.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(){this.Qr=new fe(pe.$r),this.Ur=new fe(pe.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new pe(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new pe(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new x(new te([])),r=new pe(t,e),i=new pe(t,e+1),s=[];return this.Ur.forEachInRange([r,i],a=>{this.Gr(a),s.push(a.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new x(new te([])),r=new pe(t,e),i=new pe(t,e+1);let s=H();return this.Ur.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new pe(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class pe{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return x.comparator(e.key,t.key)||W(e.Yr,t.Yr)}static Kr(e,t){return W(e.Yr,t.Yr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new fe(pe.$r)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new EI(s,t,r,i);this.mutationQueue.push(a);for(const c of i)this.Zr=this.Zr.add(new pe(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.ei(r),s=i<0?0:i;return C.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?ya:this.tr-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new pe(t,0),i=new pe(t,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([r,i],a=>{const c=this.Xr(a.Yr);s.push(c)}),C.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new fe(W);return t.forEach(i=>{const s=new pe(i,0),a=new pe(i,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([s,a],c=>{r=r.add(c.Yr)})}),C.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;x.isDocumentKey(s)||(s=s.child(""));const a=new pe(new x(s),0);let c=new fe(W);return this.Zr.forEachWhile(l=>{const d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.Yr)),!0)},a),C.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(r=>{const i=this.Xr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){X(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return C.forEach(t.mutations,i=>{const s=new pe(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new pe(t,0),i=this.Zr.firstAfterOrEqual(r);return C.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{constructor(e){this.ri=e,this.docs=function(){return new se(x.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Re.newInvalidDocument(t))}getEntries(e,t){let r=Tt();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Re.newInvalidDocument(i))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Tt();const a=t.path,c=new x(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:p}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Mw(Lw(p),r)<=0||(i.has(p.key)||Is(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return C.resolve(s)}getAllFromCollectionGroup(e,t,r,i){F(9500)}ii(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new cE(this)}getSize(e){return C.resolve(this.size)}}class cE extends eE{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Nr.addEntry(e,i)):this.Nr.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(e){this.persistence=e,this.si=new fn(t=>Ea(t),Ta),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.oi=0,this._i=new Pa,this.targetCount=0,this.ai=jn.ur()}forEachTarget(e,t){return this.si.forEach((r,i)=>t(i)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),C.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new jn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.Pr(t),C.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.si.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.si.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),C.waitFor(s).next(()=>i)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),C.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e,t){this.ui={},this.overlays={},this.ci=new ms(0),this.li=!1,this.li=!0,this.hi=new sE,this.referenceDelegate=e(this),this.Pi=new uE(this),this.indexManager=new GI,this.remoteDocumentCache=function(i){return new aE(i)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new WI(t),this.Ii=new rE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new iE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new oE(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const i=new lE(this.ci.next());return this.referenceDelegate.Ei(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ai(e,t){return C.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class lE extends Fw{constructor(e){super(),this.currentSequenceNumber=e}}class Ca{constructor(e){this.persistence=e,this.Ri=new Pa,this.Vi=null}static mi(e){return new Ca(e)}get fi(){if(this.Vi)return this.Vi;throw F(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(i=>this.fi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.fi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.fi,r=>{const i=x.fromPath(r);return this.gi(e,i).next(s=>{s||t.removeEntry(i,B.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return C.or([()=>C.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class es{constructor(e,t){this.persistence=e,this.pi=new fn(r=>$w(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=ZI(this,t)}static mi(e,t){return new es(e,t)}Ei(){}di(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return C.forEach(this.pi,(r,i)=>this.br(e,r,i).next(s=>s?C.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ii(e,a=>this.br(e,a,t).next(c=>{c||(r++,s.removeEntry(a,B.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),C.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Mi(e.data.value)),t}br(e,t,r){return C.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.pi.get(t);return C.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=i}static As(e,t){let r=H(),i=H();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new ka(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return ng()?8:Uw(Ce())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.ys(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ws(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new hE;return this.Ss(e,t,a).next(c=>{if(s.result=c,this.Vs)return this.bs(e,t,a,c.size)})}).next(()=>s.result)}bs(e,t,r,i){return r.documentReadCount<this.fs?(vn()<=z.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",An(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),C.resolve()):(vn()<=z.DEBUG&&O("QueryEngine","Query:",An(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.gs*i?(vn()<=z.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",An(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,rt(t))):C.resolve())}ys(e,t){if(ml(t))return C.resolve(null);let r=rt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Wo(t,null,"F"),r=rt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=H(...s);return this.ps.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const d=this.Ds(t,c);return this.Cs(t,d,a,l.readTime)?this.ys(e,Wo(t,null,"F")):this.vs(e,d,t,l)}))})))}ws(e,t,r,i){return ml(t)||i.isEqual(B.min())?C.resolve(null):this.ps.getDocuments(e,r).next(s=>{const a=this.Ds(t,s);return this.Cs(t,a,r,i)?C.resolve(null):(vn()<=z.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),An(t)),this.vs(e,a,t,Ow(i,Fr)).next(c=>c))})}Ds(e,t){let r=new fe(Od(e));return t.forEach((i,s)=>{Is(e,s)&&(r=r.add(s))}),r}Cs(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Ss(e,t,r){return vn()<=z.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",An(t)),this.ps.getDocumentsMatchingQuery(e,t,Ft.min(),r)}vs(e,t,r,i){return this.ps.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="LocalStore",fE=3e8;class pE{constructor(e,t,r,i){this.persistence=e,this.Fs=t,this.serializer=i,this.Ms=new se(W),this.xs=new fn(s=>Ea(s),Ta),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new nE(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function mE(n,e,t,r){return new pE(n,e,t,r)}async function rf(n,e){const t=$(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],c=[];let l=H();for(const d of i){a.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}for(const d of s){c.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:c}))})})}function gE(n,e){const t=$(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,l,d,p){const g=d.batch,y=g.keys();let P=C.resolve();return y.forEach(k=>{P=P.next(()=>p.getEntry(l,k)).next(M=>{const V=d.docVersions.get(k);X(V!==null,48541),M.version.compareTo(V)<0&&(g.applyToRemoteDocument(M,d),M.isValidDocument()&&(M.setReadTime(d.commitVersion),p.addEntry(M)))})}),P.next(()=>c.mutationQueue.removeMutationBatch(l,g))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=H();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function sf(n){const e=$(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function _E(n,e){const t=$(n),r=e.snapshotVersion;let i=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});i=t.Ms;const c=[];e.targetChanges.forEach((p,g)=>{const y=i.get(g);if(!y)return;c.push(t.Pi.removeMatchingKeys(s,p.removedDocuments,g).next(()=>t.Pi.addMatchingKeys(s,p.addedDocuments,g)));let P=y.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?P=P.withResumeToken(ge.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):p.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(p.resumeToken,r)),i=i.insert(g,P),function(M,V,G){return M.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=fE?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0}(y,P,p)&&c.push(t.Pi.updateTargetData(s,P))});let l=Tt(),d=H();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(yE(s,a,e.documentUpdates).next(p=>{l=p.ks,d=p.qs})),!r.isEqual(B.min())){const p=t.Pi.getLastRemoteSnapshotVersion(s).next(g=>t.Pi.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return C.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.Ms=i,s))}function yE(n,e,t){let r=H(),i=H();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=Tt();return t.forEach((c,l)=>{const d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(B.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):O(Da,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{ks:a,qs:i}})}function wE(n,e){const t=$(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=ya),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function IE(n,e){const t=$(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Pi.getTargetData(r,e).next(s=>s?(i=s,C.resolve(i)):t.Pi.allocateTargetId(r).next(a=>(i=new Nt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Ms.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function Yo(n,e,t){const r=$(n),i=r.Ms.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Xn(a))throw a;O(Da,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(i.target)}function Pl(n,e,t){const r=$(n);let i=B.min(),s=H();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,p){const g=$(l),y=g.xs.get(p);return y!==void 0?C.resolve(g.Ms.get(y)):g.Pi.getTargetData(d,p)}(r,a,rt(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,c.targetId).next(l=>{s=l})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?i:B.min(),t?s:H())).next(c=>(EE(r,oI(e),c),{documents:c,Qs:s})))}function EE(n,e,t){let r=n.Os.get(e)||B.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Os.set(e,r)}class Cl{constructor(){this.activeTargetIds=dI()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class TE{constructor(){this.Mo=new Cl,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Cl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kl="ConnectivityMonitor";class Dl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){O(kl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){O(kl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ki=null;function Jo(){return ki===null?ki=function(){return 268435456+Math.round(2147483648*Math.random())}():ki++,"0x"+ki.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo="RestConnection",AE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class SE{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${i}`,this.Wo=this.databaseId.database===Qi?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Go(e,t,r,i,s){const a=Jo(),c=this.zo(e,t.toUriEncodedString());O(vo,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,i,s);const{host:d}=new URL(c),p=Gn(d);return this.Jo(e,c,l,r,p).then(g=>(O(vo,`Received RPC '${e}' ${a}: `,g),g),g=>{throw an(vo,`RPC '${e}' ${a} failed with error: `,g,"url: ",c,"request:",r),g})}Ho(e,t,r,i,s,a){return this.Go(e,t,r,i,s)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Yn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}zo(e,t){const r=AE[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="WebChannelConnection";class RE extends SE{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,i,s){const a=Jo();return new Promise((c,l)=>{const d=new sd;d.setWithCredentials(!0),d.listenOnce(od.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Li.NO_ERROR:const g=d.getResponseJson();O(Se,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),c(g);break;case Li.TIMEOUT:O(Se,`RPC '${e}' ${a} timed out`),l(new N(b.DEADLINE_EXCEEDED,"Request time out"));break;case Li.HTTP_ERROR:const y=d.getStatus();if(O(Se,`RPC '${e}' ${a} failed with status:`,y,"response text:",d.getResponseText()),y>0){let P=d.getResponseJson();Array.isArray(P)&&(P=P[0]);const k=P?.error;if(k&&k.status&&k.message){const M=function(G){const q=G.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(q)>=0?q:b.UNKNOWN}(k.status);l(new N(M,k.message))}else l(new N(b.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new N(b.UNAVAILABLE,"Connection failed."));break;default:F(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{O(Se,`RPC '${e}' ${a} completed.`)}});const p=JSON.stringify(i);O(Se,`RPC '${e}' ${a} sending request:`,i),d.send(t,"POST",p,r,15)})}T_(e,t,r){const i=Jo(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=ud(),c=cd(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const p=s.join("");O(Se,`Creating RPC '${e}' stream ${i}: ${p}`,l);const g=a.createWebChannel(p,l);this.I_(g);let y=!1,P=!1;const k=new bE({Yo:V=>{P?O(Se,`Not sending because RPC '${e}' stream ${i} is closed:`,V):(y||(O(Se,`Opening RPC '${e}' stream ${i} transport.`),g.open(),y=!0),O(Se,`RPC '${e}' stream ${i} sending:`,V),g.send(V))},Zo:()=>g.close()}),M=(V,G,q)=>{V.listen(G,K=>{try{q(K)}catch(_e){setTimeout(()=>{throw _e},0)}})};return M(g,Ar.EventType.OPEN,()=>{P||(O(Se,`RPC '${e}' stream ${i} transport opened.`),k.o_())}),M(g,Ar.EventType.CLOSE,()=>{P||(P=!0,O(Se,`RPC '${e}' stream ${i} transport closed`),k.a_(),this.E_(g))}),M(g,Ar.EventType.ERROR,V=>{P||(P=!0,an(Se,`RPC '${e}' stream ${i} transport errored. Name:`,V.name,"Message:",V.message),k.a_(new N(b.UNAVAILABLE,"The operation could not be completed")))}),M(g,Ar.EventType.MESSAGE,V=>{if(!P){const G=V.data[0];X(!!G,16349);const q=G,K=q?.error||q[0]?.error;if(K){O(Se,`RPC '${e}' stream ${i} received error:`,K);const _e=K.status;let et=function(m){const w=le[m];if(w!==void 0)return Wd(w)}(_e),Ie=K.message;et===void 0&&(et=b.INTERNAL,Ie="Unknown error status: "+_e+" with message "+K.message),P=!0,k.a_(new N(et,Ie)),g.close()}else O(Se,`RPC '${e}' stream ${i} received:`,G),k.u_(G)}}),M(c,ad.STAT_EVENT,V=>{V.stat===Fo.PROXY?O(Se,`RPC '${e}' stream ${i} detected buffering proxy`):V.stat===Fo.NOPROXY&&O(Se,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.__()},0),k}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function Ao(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(n){return new DI(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=i,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl="PersistentStream";class af{constructor(e,t,r,i,s,a,c,l){this.Mi=e,this.S_=r,this.b_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new of(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(Et(t.toString()),Et("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.D_===t&&this.G_(r,i)},r=>{e(()=>{const i=new N(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(i=>{r(()=>this.z_(i))}),this.stream.onMessage(i=>{r(()=>++this.F_==1?this.J_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return O(Nl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(O(Nl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class PE extends af{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=OI(this.serializer,e),r=function(s){if(!("targetChange"in s))return B.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?it(a.readTime):B.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=Qo(this.serializer),t.addTarget=function(s,a){let c;const l=a.target;if(c=qo(l)?{documents:xI(s,l)}:{query:FI(s,l).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Kd(s,a.resumeToken);const d=Ho(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(B.min())>0){c.readTime=Zi(s,a.snapshotVersion.toTimestamp());const d=Ho(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=BI(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=Qo(this.serializer),t.removeTarget=e,this.q_(t)}}class CE extends af{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return X(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){X(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=MI(e.writeResults,e.commitTime),r=it(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Qo(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>LI(this.serializer,r))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{}class DE extends kE{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new N(b.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Go(e,Go(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new N(b.UNKNOWN,s.toString())})}Ho(e,t,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Ho(e,Go(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(b.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class NE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Et(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn="RemoteStore";class VE{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{pn(this)&&(O(cn,"Restarting streams for network reachability change."),await async function(l){const d=$(l);d.Ea.add(4),await Jr(d),d.Ra.set("Unknown"),d.Ea.delete(4),await bs(d)}(this))})}),this.Ra=new NE(r,i)}}async function bs(n){if(pn(n))for(const e of n.da)await e(!0)}async function Jr(n){for(const e of n.da)await e(!1)}function cf(n,e){const t=$(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),La(t)?Oa(t):er(t).O_()&&Va(t,e))}function Na(n,e){const t=$(n),r=er(t);t.Ia.delete(e),r.O_()&&uf(t,e),t.Ia.size===0&&(r.O_()?r.L_():pn(t)&&t.Ra.set("Unknown"))}function Va(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}er(n).Y_(e)}function uf(n,e){n.Va.Ue(e),er(n).Z_(e)}function Oa(n){n.Va=new RI({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),er(n).start(),n.Ra.ua()}function La(n){return pn(n)&&!er(n).x_()&&n.Ia.size>0}function pn(n){return $(n).Ea.size===0}function lf(n){n.Va=void 0}async function OE(n){n.Ra.set("Online")}async function LE(n){n.Ia.forEach((e,t)=>{Va(n,e)})}async function ME(n,e){lf(n),La(n)?(n.Ra.ha(e),Oa(n)):n.Ra.set("Unknown")}async function xE(n,e,t){if(n.Ra.set("Online"),e instanceof Gd&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const c of s.targetIds)i.Ia.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.Ia.delete(c),i.Va.removeTarget(c))}(n,e)}catch(r){O(cn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ts(n,r)}else if(e instanceof Ui?n.Va.Ze(e):e instanceof Hd?n.Va.st(e):n.Va.tt(e),!t.isEqual(B.min()))try{const r=await sf(n.localStore);t.compareTo(r)>=0&&await function(s,a){const c=s.Va.Tt(a);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=s.Ia.get(d);p&&s.Ia.set(d,p.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,d)=>{const p=s.Ia.get(l);if(!p)return;s.Ia.set(l,p.withResumeToken(ge.EMPTY_BYTE_STRING,p.snapshotVersion)),uf(s,l);const g=new Nt(p.target,l,d,p.sequenceNumber);Va(s,g)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){O(cn,"Failed to raise snapshot:",r),await ts(n,r)}}async function ts(n,e,t){if(!Xn(e))throw e;n.Ea.add(1),await Jr(n),n.Ra.set("Offline"),t||(t=()=>sf(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(cn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await bs(n)})}function hf(n,e){return e().catch(t=>ts(n,t,e))}async function Rs(n){const e=$(n),t=jt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ya;for(;FE(e);)try{const i=await wE(e.localStore,r);if(i===null){e.Ta.length===0&&t.L_();break}r=i.batchId,UE(e,i)}catch(i){await ts(e,i)}df(e)&&ff(e)}function FE(n){return pn(n)&&n.Ta.length<10}function UE(n,e){n.Ta.push(e);const t=jt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function df(n){return pn(n)&&!jt(n).x_()&&n.Ta.length>0}function ff(n){jt(n).start()}async function BE(n){jt(n).ra()}async function $E(n){const e=jt(n);for(const t of n.Ta)e.ea(t.mutations)}async function jE(n,e,t){const r=n.Ta.shift(),i=Sa.from(r,e,t);await hf(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Rs(n)}async function qE(n,e){e&&jt(n).X_&&await async function(r,i){if(function(a){return AI(a)&&a!==b.ABORTED}(i.code)){const s=r.Ta.shift();jt(r).B_(),await hf(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Rs(r)}}(n,e),df(n)&&ff(n)}async function Vl(n,e){const t=$(n);t.asyncQueue.verifyOperationInProgress(),O(cn,"RemoteStore received new credentials");const r=pn(t);t.Ea.add(3),await Jr(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await bs(t)}async function zE(n,e){const t=$(n);e?(t.Ea.delete(2),await bs(t)):e||(t.Ea.add(2),await Jr(t),t.Ra.set("Unknown"))}function er(n){return n.ma||(n.ma=function(t,r,i){const s=$(t);return s.sa(),new PE(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Xo:OE.bind(null,n),t_:LE.bind(null,n),r_:ME.bind(null,n),H_:xE.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),La(n)?Oa(n):n.Ra.set("Unknown")):(await n.ma.stop(),lf(n))})),n.ma}function jt(n){return n.fa||(n.fa=function(t,r,i){const s=$(t);return s.sa(),new CE(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:BE.bind(null,n),r_:qE.bind(null,n),ta:$E.bind(null,n),na:jE.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Rs(n)):(await n.fa.stop(),n.Ta.length>0&&(O(cn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new gt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,c=new Ma(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function xa(n,e){if(Et("AsyncQueue",`${e}: ${n}`),Xn(n))return new N(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{static emptySet(e){return new Nn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||x.comparator(t.key,r.key):(t,r)=>x.comparator(t.key,r.key),this.keyedMap=Sr(),this.sortedSet=new se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Nn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Nn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(){this.ga=new se(x.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):F(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class qn{constructor(e,t,r,i,s,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new qn(e,t,Nn.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ws(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class HE{constructor(){this.queries=Ll(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const i=$(t),s=i.queries;i.queries=Ll(),s.forEach((a,c)=>{for(const l of c.Sa)l.onError(r)})})(this,new N(b.ABORTED,"Firestore shutting down"))}}function Ll(){return new fn(n=>Vd(n),ws)}async function Fa(n,e){const t=$(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.ba()&&e.Da()&&(r=2):(s=new WE,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const c=xa(a,`Initialization of query '${An(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.Sa.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&Ba(t)}async function Ua(n,e){const t=$(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.Sa.indexOf(e);a>=0&&(s.Sa.splice(a,1),s.Sa.length===0?i=e.Da()?0:1:!s.ba()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function GE(n,e){const t=$(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const c of a.Sa)c.Fa(i)&&(r=!0);a.wa=i}}r&&Ba(t)}function KE(n,e,t){const r=$(n),i=r.queries.get(e);if(i)for(const s of i.Sa)s.onError(t);r.queries.delete(e)}function Ba(n){n.Ca.forEach(e=>{e.next()})}var Xo,Ml;(Ml=Xo||(Xo={})).Ma="default",Ml.Cache="cache";class $a{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new qn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=qn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Xo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e){this.key=e}}class mf{constructor(e){this.key=e}}class QE{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=H(),this.mutatedKeys=H(),this.eu=Od(e),this.tu=new Nn(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Ol,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,g)=>{const y=i.get(p),P=Is(this.query,g)?g:null,k=!!y&&this.mutatedKeys.has(y.key),M=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let V=!1;y&&P?y.data.isEqual(P.data)?k!==M&&(r.track({type:3,doc:P}),V=!0):this.su(y,P)||(r.track({type:2,doc:P}),V=!0,(l&&this.eu(P,l)>0||d&&this.eu(P,d)<0)&&(c=!0)):!y&&P?(r.track({type:0,doc:P}),V=!0):y&&!P&&(r.track({type:1,doc:y}),V=!0,(l||d)&&(c=!0)),V&&(P?(a=a.add(P),s=M?s.add(p):s.delete(p)):(a=a.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{tu:a,iu:r,Cs:c,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((p,g)=>function(P,k){const M=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{Rt:V})}};return M(P)-M(k)}(p.type,g.type)||this.eu(p.doc,g.doc)),this.ou(r),i=i??!1;const c=t&&!i?this._u():[],l=this.Xa.size===0&&this.current&&!i?1:0,d=l!==this.Za;return this.Za=l,a.length!==0||d?{snapshot:new qn(this.query,e.tu,s,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ol,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=H(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new mf(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new pf(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=H();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return qn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const ja="SyncEngine";class YE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class JE{constructor(e){this.key=e,this.hu=!1}}class XE{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new fn(c=>Vd(c),ws),this.Iu=new Map,this.Eu=new Set,this.du=new se(x.comparator),this.Au=new Map,this.Ru=new Pa,this.Vu={},this.mu=new Map,this.fu=jn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function ZE(n,e,t=!0){const r=Ef(n);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await gf(r,e,t,!0),i}async function eT(n,e){const t=Ef(n);await gf(t,e,!0,!1)}async function gf(n,e,t,r){const i=await IE(n.localStore,rt(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await tT(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&cf(n.remoteStore,i),c}async function tT(n,e,t,r,i){n.pu=(g,y,P)=>async function(M,V,G,q){let K=V.view.ru(G);K.Cs&&(K=await Pl(M.localStore,V.query,!1).then(({documents:T})=>V.view.ru(T,K)));const _e=q&&q.targetChanges.get(V.targetId),et=q&&q.targetMismatches.get(V.targetId)!=null,Ie=V.view.applyChanges(K,M.isPrimaryClient,_e,et);return Fl(M,V.targetId,Ie.au),Ie.snapshot}(n,g,y,P);const s=await Pl(n.localStore,e,!0),a=new QE(e,s.Qs),c=a.ru(s.documents),l=Yr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,l);Fl(n,t,d.au);const p=new YE(e,t,a);return n.Tu.set(e,p),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function nT(n,e,t){const r=$(n),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter(a=>!ws(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Yo(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Na(r.remoteStore,i.targetId),Zo(r,i.targetId)}).catch(Jn)):(Zo(r,i.targetId),await Yo(r.localStore,i.targetId,!0))}async function rT(n,e){const t=$(n),r=t.Tu.get(e),i=t.Iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Na(t.remoteStore,r.targetId))}async function iT(n,e,t){const r=hT(n);try{const i=await function(a,c){const l=$(a),d=ee.now(),p=c.reduce((P,k)=>P.add(k.key),H());let g,y;return l.persistence.runTransaction("Locally write mutations","readwrite",P=>{let k=Tt(),M=H();return l.Ns.getEntries(P,p).next(V=>{k=V,k.forEach((G,q)=>{q.isValidDocument()||(M=M.add(G))})}).next(()=>l.localDocuments.getOverlayedDocuments(P,k)).next(V=>{g=V;const G=[];for(const q of c){const K=wI(q,g.get(q.key).overlayedDocument);K!=null&&G.push(new Wt(q.key,K,Sd(K.value.mapValue),Ne.exists(!0)))}return l.mutationQueue.addMutationBatch(P,d,G,c)}).next(V=>{y=V;const G=V.applyToLocalDocumentSet(g,M);return l.documentOverlayCache.saveOverlays(P,V.batchId,G)})}).then(()=>({batchId:y.batchId,changes:Md(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,l){let d=a.Vu[a.currentUser.toKey()];d||(d=new se(W)),d=d.insert(c,l),a.Vu[a.currentUser.toKey()]=d}(r,i.batchId,t),await Xr(r,i.changes),await Rs(r.remoteStore)}catch(i){const s=xa(i,"Failed to persist write");t.reject(s)}}async function _f(n,e){const t=$(n);try{const r=await _E(t.localStore,e);e.targetChanges.forEach((i,s)=>{const a=t.Au.get(s);a&&(X(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.hu=!0:i.modifiedDocuments.size>0?X(a.hu,14607):i.removedDocuments.size>0&&(X(a.hu,42227),a.hu=!1))}),await Xr(t,r,e)}catch(r){await Jn(r)}}function xl(n,e,t){const r=$(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Tu.forEach((s,a)=>{const c=a.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){const l=$(a);l.onlineState=c;let d=!1;l.queries.forEach((p,g)=>{for(const y of g.Sa)y.va(c)&&(d=!0)}),d&&Ba(l)}(r.eventManager,e),i.length&&r.Pu.H_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function sT(n,e,t){const r=$(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Au.get(e),s=i&&i.key;if(s){let a=new se(x.comparator);a=a.insert(s,Re.newNoDocument(s,B.min()));const c=H().add(s),l=new As(B.min(),new Map,new se(W),a,c);await _f(r,l),r.du=r.du.remove(s),r.Au.delete(e),qa(r)}else await Yo(r.localStore,e,!1).then(()=>Zo(r,e,t)).catch(Jn)}async function oT(n,e){const t=$(n),r=e.batch.batchId;try{const i=await gE(t.localStore,e);wf(t,r,null),yf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Xr(t,i)}catch(i){await Jn(i)}}async function aT(n,e,t){const r=$(n);try{const i=await function(a,c){const l=$(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,c).next(g=>(X(g!==null,37113),p=g.keys(),l.mutationQueue.removeMutationBatch(d,g))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);wf(r,e,t),yf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Xr(r,i)}catch(i){await Jn(i)}}function yf(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function wf(n,e,t){const r=$(n);let i=r.Vu[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Vu[r.currentUser.toKey()]=i}}function Zo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||If(n,r)})}function If(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Na(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),qa(n))}function Fl(n,e,t){for(const r of t)r instanceof pf?(n.Ru.addReference(r.key,e),cT(n,r)):r instanceof mf?(O(ja,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||If(n,r.key)):F(19791,{wu:r})}function cT(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(O(ja,"New document in limbo: "+t),n.Eu.add(r),qa(n))}function qa(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new x(te.fromString(e)),r=n.fu.next();n.Au.set(r,new JE(t)),n.du=n.du.insert(t,r),cf(n.remoteStore,new Nt(rt(ys(t.path)),r,"TargetPurposeLimboResolution",ms.ce))}}async function Xr(n,e,t){const r=$(n),i=[],s=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((c,l)=>{a.push(r.pu(l,e,t).then(d=>{if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:t?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(d){i.push(d);const p=ka.As(l.targetId,d);s.push(p)}}))}),await Promise.all(a),r.Pu.H_(i),await async function(l,d){const p=$(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>C.forEach(d,y=>C.forEach(y.Es,P=>p.persistence.referenceDelegate.addReference(g,y.targetId,P)).next(()=>C.forEach(y.ds,P=>p.persistence.referenceDelegate.removeReference(g,y.targetId,P)))))}catch(g){if(!Xn(g))throw g;O(Da,"Failed to update sequence numbers: "+g)}for(const g of d){const y=g.targetId;if(!g.fromCache){const P=p.Ms.get(y),k=P.snapshotVersion,M=P.withLastLimboFreeSnapshotVersion(k);p.Ms=p.Ms.insert(y,M)}}}(r.localStore,s))}async function uT(n,e){const t=$(n);if(!t.currentUser.isEqual(e)){O(ja,"User change. New user:",e.toKey());const r=await rf(t.localStore,e);t.currentUser=e,function(s,a){s.mu.forEach(c=>{c.forEach(l=>{l.reject(new N(b.CANCELLED,a))})}),s.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Xr(t,r.Ls)}}function lT(n,e){const t=$(n),r=t.Au.get(e);if(r&&r.hu)return H().add(r.key);{let i=H();const s=t.Iu.get(e);if(!s)return i;for(const a of s){const c=t.Tu.get(a);i=i.unionWith(c.view.nu)}return i}}function Ef(n){const e=$(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=_f.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=lT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=sT.bind(null,e),e.Pu.H_=GE.bind(null,e.eventManager),e.Pu.yu=KE.bind(null,e.eventManager),e}function hT(n){const e=$(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=oT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=aT.bind(null,e),e}class ns{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ss(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return mE(this.persistence,new dE,e.initialUser,this.serializer)}Cu(e){return new nf(Ca.mi,this.serializer)}Du(e){return new TE}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ns.provider={build:()=>new ns};class dT extends ns{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){X(this.persistence.referenceDelegate instanceof es,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new JI(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ve.withCacheSize(this.cacheSizeBytes):Ve.DEFAULT;return new nf(r=>es.mi(r,t),this.serializer)}}class ea{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>xl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=uT.bind(null,this.syncEngine),await zE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new HE}()}createDatastore(e){const t=Ss(e.databaseInfo.databaseId),r=function(s){return new RE(s)}(e.databaseInfo);return function(s,a,c,l){return new DE(s,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new VE(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>xl(this.syncEngine,t,0),function(){return Dl.v()?new Dl:new vE}())}createSyncEngine(e,t){return function(i,s,a,c,l,d,p){const g=new XE(i,s,a,c,l,d);return p&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const r=$(t);O(cn,"RemoteStore shutting down."),r.Ea.add(5),await Jr(r),r.Aa.shutdown(),r.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ea.provider={build:()=>new ea};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Et("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt="FirestoreClient";class fT{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=be.UNAUTHENTICATED,this.clientId=fs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{O(qt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O(qt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new gt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=xa(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function So(n,e){n.asyncQueue.verifyOperationInProgress(),O(qt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await rf(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Ul(n,e){n.asyncQueue.verifyOperationInProgress();const t=await pT(n);O(qt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Vl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Vl(e.remoteStore,i)),n._onlineComponents=e}async function pT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(qt,"Using user provided OfflineComponentProvider");try{await So(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===b.FAILED_PRECONDITION||i.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;an("Error using user provided cache. Falling back to memory cache: "+t),await So(n,new ns)}}else O(qt,"Using default OfflineComponentProvider"),await So(n,new dT(void 0));return n._offlineComponents}async function Tf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(qt,"Using user provided OnlineComponentProvider"),await Ul(n,n._uninitializedComponentsProvider._online)):(O(qt,"Using default OnlineComponentProvider"),await Ul(n,new ea))),n._onlineComponents}function mT(n){return Tf(n).then(e=>e.syncEngine)}async function rs(n){const e=await Tf(n),t=e.eventManager;return t.onListen=ZE.bind(null,e.syncEngine),t.onUnlisten=nT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=eT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=rT.bind(null,e.syncEngine),t}function gT(n,e,t={}){const r=new gt;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){const p=new za({next:y=>{p.Nu(),a.enqueueAndForget(()=>Ua(s,g));const P=y.docs.has(c);!P&&y.fromCache?d.reject(new N(b.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&y.fromCache&&l&&l.source==="server"?d.reject(new N(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(y)},error:y=>d.reject(y)}),g=new $a(ys(c.path),p,{includeMetadataChanges:!0,qa:!0});return Fa(s,g)}(await rs(n),n.asyncQueue,e,t,r)),r.promise}function _T(n,e,t={}){const r=new gt;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){const p=new za({next:y=>{p.Nu(),a.enqueueAndForget(()=>Ua(s,g)),y.fromCache&&l.source==="server"?d.reject(new N(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(y)},error:y=>d.reject(y)}),g=new $a(c,p,{includeMetadataChanges:!0,qa:!0});return Fa(s,g)}(await rs(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Af="firestore.googleapis.com",$l=!0;class jl{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new N(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Af,this.ssl=$l}else this.host=e.host,this.ssl=e.ssl??$l;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=tf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<QI)throw new N(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}pd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=vf(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new N(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new N(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new N(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ps{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jl(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new dd;switch(r.type){case"firstParty":return new Pw(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Bl.get(t);r&&(O("ComponentProvider","Removing Datastore"),Bl.delete(t),r.terminate())}(this),Promise.resolve()}}function Sf(n,e,t,r={}){n=Pe(n,Ps);const i=Gn(e),s=n._getSettings(),a={...s,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;i&&(gh(`https://${c}`),_h("Firestore",!0)),s.host!==Af&&s.host!==c&&an("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...s,host:c,ssl:i,emulatorOptions:r};if(!st(l,a)&&(n._setSettings(l),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=be.MOCK_USER;else{d=Km(r.mockUserToken,n._app?.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new N(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new be(g)}n._authCredentials=new Sw(new hd(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new vt(this.firestore,e,this._query)}}class re{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new _t(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new re(this.firestore,e,this._key)}toJSON(){return{type:re._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Kr(t,re._jsonSchema))return new re(e,r||null,new x(te.fromString(t.referencePath)))}}re._jsonSchemaVersion="firestore/documentReference/1.0",re._jsonSchema={type:de("string",re._jsonSchemaVersion),referencePath:de("string")};class _t extends vt{constructor(e,t,r){super(e,t,ys(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new re(this.firestore,null,new x(e))}withConverter(e){return new _t(this.firestore,e,this._path)}}function $e(n,e,...t){if(n=ie(n),fd("collection","path",e),n instanceof Ps){const r=te.fromString(e,...t);return tl(r),new _t(n,null,r)}{if(!(n instanceof re||n instanceof _t))throw new N(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(te.fromString(e,...t));return tl(r),new _t(n.firestore,null,r)}}function Ze(n,e,...t){if(n=ie(n),arguments.length===1&&(e=fs.newId()),fd("doc","path",e),n instanceof Ps){const r=te.fromString(e,...t);return el(r),new re(n,null,new x(r))}{if(!(n instanceof re||n instanceof _t))throw new N(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(te.fromString(e,...t));return el(r),new re(n.firestore,n instanceof _t?n.converter:null,new x(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql="AsyncQueue";class zl{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new of(this,"async_queue_retry"),this._c=()=>{const r=Ao();r&&O(ql,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Ao();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Ao();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new gt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Xn(e))throw e;O(ql,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,Et("INTERNAL UNHANDLED ERROR: ",Wl(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=Ma.createAndSchedule(this,e,t,r,s=>this.hc(s));return this.tc.push(i),i}uc(){this.nc&&F(47125,{Pc:Wl(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Wl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class Ye extends Ps{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new zl,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new zl(e),this._firestoreClient=void 0,await e}}}function bf(n,e){const t=typeof n=="object"?n:oa(),r=typeof n=="string"?n:Qi,i=dn(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Hm("firestore");s&&Sf(i,...s)}return i}function tr(n){if(n._terminated)throw new N(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||yT(n),n._firestoreClient}function yT(n){const e=n._freezeSettings(),t=function(i,s,a,c){return new zw(i,s,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,vf(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new fT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(i){const s=i?._online.build();return{_offline:i?._offline.build(s),_online:s}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new xe(ge.fromBase64String(e))}catch(t){throw new N(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new xe(ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:xe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Kr(e,xe._jsonSchema))return xe.fromBase64String(e.bytes)}}xe._jsonSchemaVersion="firestore/bytes/1.0",xe._jsonSchema={type:de("string",xe._jsonSchemaVersion),bytes:de("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new me(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return W(this._lat,e._lat)||W(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:He._jsonSchemaVersion}}static fromJSON(e){if(Kr(e,He._jsonSchema))return new He(e.latitude,e.longitude)}}He._jsonSchemaVersion="firestore/geoPoint/1.0",He._jsonSchema={type:de("string",He._jsonSchemaVersion),latitude:de("number"),longitude:de("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Ge._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Kr(e,Ge._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Ge(e.vectorValues);throw new N(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ge._jsonSchemaVersion="firestore/vectorValue/1.0",Ge._jsonSchema={type:de("string",Ge._jsonSchemaVersion),vectorValues:de("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT=/^__.*__$/;class IT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Wt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Qr(e,this.data,t,this.fieldTransforms)}}class Rf{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Wt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Pf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{Ac:n})}}class Cs{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Cs({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return is(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Pf(this.Ac)&&wT.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class ET{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ss(e)}Cc(e,t,r,i=!1){return new Cs({Ac:e,methodName:t,Dc:r,path:me.emptyPath(),fc:!1,bc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Zr(n){const e=n._freezeSettings(),t=Ss(n._databaseId);return new ET(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Wa(n,e,t,r,i,s={}){const a=n.Cc(s.merge||s.mergeFields?2:0,e,t,i);Qa("Data must be an object, but it was:",a,r);const c=Nf(r,a);let l,d;if(s.merge)l=new Fe(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){const p=[];for(const g of s.mergeFields){const y=ta(e,g,t);if(!a.contains(y))throw new N(b.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);Of(p,y)||p.push(y)}l=new Fe(p),d=a.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,d=a.fieldTransforms;return new IT(new Oe(c),l,d)}class ks extends mn{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ks}}function Cf(n,e,t){return new Cs({Ac:3,Dc:e.settings.Dc,methodName:n._methodName,fc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Ha extends mn{_toFieldTransform(e){return new Aa(e.path,new jr)}isEqual(e){return e instanceof Ha}}class Ga extends mn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Cf(this,e,!0),r=this.vc.map(s=>gn(s,t)),i=new Bn(r);return new Aa(e.path,i)}isEqual(e){return e instanceof Ga&&st(this.vc,e.vc)}}class Ka extends mn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Cf(this,e,!0),r=this.vc.map(s=>gn(s,t)),i=new $n(r);return new Aa(e.path,i)}isEqual(e){return e instanceof Ka&&st(this.vc,e.vc)}}function kf(n,e,t,r){const i=n.Cc(1,e,t);Qa("Data must be an object, but it was:",i,r);const s=[],a=Oe.empty();zt(r,(l,d)=>{const p=Ya(e,l,t);d=ie(d);const g=i.yc(p);if(d instanceof ks)s.push(p);else{const y=gn(d,g);y!=null&&(s.push(p),a.set(p,y))}});const c=new Fe(s);return new Rf(a,c,i.fieldTransforms)}function Df(n,e,t,r,i,s){const a=n.Cc(1,e,t),c=[ta(e,r,t)],l=[i];if(s.length%2!=0)throw new N(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let y=0;y<s.length;y+=2)c.push(ta(e,s[y])),l.push(s[y+1]);const d=[],p=Oe.empty();for(let y=c.length-1;y>=0;--y)if(!Of(d,c[y])){const P=c[y];let k=l[y];k=ie(k);const M=a.yc(P);if(k instanceof ks)d.push(P);else{const V=gn(k,M);V!=null&&(d.push(P),p.set(P,V))}}const g=new Fe(d);return new Rf(p,g,a.fieldTransforms)}function TT(n,e,t,r=!1){return gn(t,n.Cc(r?4:3,e))}function gn(n,e){if(Vf(n=ie(n)))return Qa("Unsupported field value:",e,n),Nf(n,e);if(n instanceof mn)return function(r,i){if(!Pf(i.Ac))throw i.Sc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Sc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const c of r){let l=gn(c,i.wc(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ie(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return fI(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ee.fromDate(r);return{timestampValue:Zi(i.serializer,s)}}if(r instanceof ee){const s=new ee(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Zi(i.serializer,s)}}if(r instanceof He)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof xe)return{bytesValue:Kd(i.serializer,r._byteString)};if(r instanceof re){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ra(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Ge)return function(a,c){return{mapValue:{fields:{[vd]:{stringValue:Ad},[Yi]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return va(c.serializer,d)})}}}}}}(r,i);throw i.Sc(`Unsupported field value: ${ps(r)}`)}(n,e)}function Nf(n,e){const t={};return _d(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):zt(n,(r,i)=>{const s=gn(i,e.mc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Vf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ee||n instanceof He||n instanceof xe||n instanceof re||n instanceof mn||n instanceof Ge)}function Qa(n,e,t){if(!Vf(t)||!md(t)){const r=ps(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function ta(n,e,t){if((e=ie(e))instanceof nr)return e._internalPath;if(typeof e=="string")return Ya(n,e);throw is("Field path arguments must be of type string or ",n,!1,void 0,t)}const vT=new RegExp("[~\\*/\\[\\]]");function Ya(n,e,t){if(e.search(vT)>=0)throw is(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new nr(...e.split("."))._internalPath}catch{throw is(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function is(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new N(b.INVALID_ARGUMENT,c+n+l)}function Of(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new AT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ds("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class AT extends Lf{data(){return super.data()}}function Ds(n,e){return typeof e=="string"?Ya(n,e):e instanceof nr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ja{}class Xa extends Ja{}function Je(n,e,...t){let r=[];e instanceof Ja&&r.push(e),r=r.concat(t),function(s){const a=s.filter(l=>l instanceof Ns).length,c=s.filter(l=>l instanceof ei).length;if(a>1||a>0&&c>0)throw new N(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class ei extends Xa{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ei(e,t,r)}_apply(e){const t=this._parse(e);return Ff(e._query,t),new vt(e.firestore,e.converter,zo(e._query,t))}_parse(e){const t=Zr(e.firestore);return function(s,a,c,l,d,p,g){let y;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new N(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Kl(g,p);const k=[];for(const M of g)k.push(Gl(l,s,M));y={arrayValue:{values:k}}}else y=Gl(l,s,g)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Kl(g,p),y=TT(c,a,g,p==="in"||p==="not-in");return he.create(d,p,y)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ut(n,e,t){const r=e,i=Ds("where",n);return ei._create(i,r,t)}class Ns extends Ja{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ns(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Qe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i;const c=s.getFlattenedFilters();for(const l of c)Ff(a,l),a=zo(a,l)}(e._query,t),new vt(e.firestore,e.converter,zo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Vs extends Xa{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Vs(e,t)}_apply(e){const t=function(i,s,a){if(i.startAt!==null)throw new N(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new N(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new $r(s,a)}(e._query,this._field,this._direction);return new vt(e.firestore,e.converter,function(i,s){const a=i.explicitOrderBy.concat([s]);return new Zn(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function xf(n,e="asc"){const t=e,r=Ds("orderBy",n);return Vs._create(r,t)}function Gl(n,e,t){if(typeof(t=ie(t))=="string"){if(t==="")throw new N(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Nd(e)&&t.indexOf("/")!==-1)throw new N(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(te.fromString(t));if(!x.isDocumentKey(r))throw new N(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ul(n,new x(r))}if(t instanceof re)return ul(n,t._key);throw new N(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ps(t)}.`)}function Kl(n,e){if(!Array.isArray(n)||n.length===0)throw new N(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ff(n,e){const t=function(i,s){for(const a of i)for(const c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Uf{convertValue(e,t="none"){switch($t(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Bt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return zt(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){const t=e.fields?.[Yi].arrayValue?.values?.map(r=>ue(r.doubleValue));return new Ge(t)}convertGeoPoint(e){return new He(ue(e.latitude),ue(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=_s(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ur(e));default:return null}}convertTimestamp(e){const t=Ut(e);return new ee(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=te.fromString(e);X(ef(r),9688,{name:e});const i=new xn(r.get(1),r.get(3)),s=new x(r.popFirst(5));return i.isEqual(t)||Et(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Rn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Mt extends Lf{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Vr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ds("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Mt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Mt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Mt._jsonSchema={type:de("string",Mt._jsonSchemaVersion),bundleSource:de("string","DocumentSnapshot"),bundleName:de("string"),bundle:de("string")};class Vr extends Mt{data(e={}){return super.data(e)}}class xt{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Rn(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Vr(this._firestore,this._userDataWriter,r.key,r,new Rn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{const l=new Vr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Rn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new Vr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Rn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:ST(c.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=xt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=fs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function ST(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Os(n){n=Pe(n,re);const e=Pe(n.firestore,Ye);return gT(tr(e),n._key).then(t=>Bf(e,n,t))}xt._jsonSchemaVersion="firestore/querySnapshot/1.0",xt._jsonSchema={type:de("string",xt._jsonSchemaVersion),bundleSource:de("string","QuerySnapshot"),bundleName:de("string"),bundle:de("string")};class ec extends Uf{constructor(e){super(),this.firestore=e}convertBytes(e){return new xe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new re(this.firestore,null,t)}}function ti(n){n=Pe(n,vt);const e=Pe(n.firestore,Ye),t=tr(e),r=new ec(e);return Mf(n._query),_T(t,n._query).then(i=>new xt(e,r,n,i))}function bT(n,e,t){n=Pe(n,re);const r=Pe(n.firestore,Ye),i=Za(n.converter,e,t);return rr(r,[Wa(Zr(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Ne.none())])}function Ls(n,e,t,...r){n=Pe(n,re);const i=Pe(n.firestore,Ye),s=Zr(i);let a;return a=typeof(e=ie(e))=="string"||e instanceof nr?Df(s,"updateDoc",n._key,e,t,r):kf(s,"updateDoc",n._key,e),rr(i,[a.toMutation(n._key,Ne.exists(!0))])}function Ms(n){return rr(Pe(n.firestore,Ye),[new vs(n._key,Ne.none())])}function ni(n,e){const t=Pe(n.firestore,Ye),r=Ze(n),i=Za(n.converter,e);return rr(t,[Wa(Zr(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Ne.exists(!1))]).then(()=>r)}function xs(n,...e){n=ie(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Hl(e[r])||(t=e[r++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Hl(e[r])){const l=e[r];e[r]=l.next?.bind(l),e[r+1]=l.error?.bind(l),e[r+2]=l.complete?.bind(l)}let s,a,c;if(n instanceof re)a=Pe(n.firestore,Ye),c=ys(n._key.path),s={next:l=>{e[r]&&e[r](Bf(a,n,l))},error:e[r+1],complete:e[r+2]};else{const l=Pe(n,vt);a=Pe(l.firestore,Ye),c=l._query;const d=new ec(a);s={next:p=>{e[r]&&e[r](new xt(a,d,l,p))},error:e[r+1],complete:e[r+2]},Mf(n._query)}return function(d,p,g,y){const P=new za(y),k=new $a(p,P,g);return d.asyncQueue.enqueueAndForget(async()=>Fa(await rs(d),k)),()=>{P.Nu(),d.asyncQueue.enqueueAndForget(async()=>Ua(await rs(d),k))}}(tr(a),c,i,s)}function rr(n,e){return function(r,i){const s=new gt;return r.asyncQueue.enqueueAndForget(async()=>iT(await mT(r),i,s)),s.promise}(tr(n),e)}function Bf(n,e,t){const r=t.docs.get(e._key),i=new ec(n);return new Mt(n,i,e._key,r,new Rn(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Zr(e)}set(e,t,r){this._verifyNotCommitted();const i=bo(e,this._firestore),s=Za(i.converter,t,r),a=Wa(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,Ne.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=bo(e,this._firestore);let a;return a=typeof(t=ie(t))=="string"||t instanceof nr?Df(this._dataReader,"WriteBatch.update",s._key,t,r,i):kf(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,Ne.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=bo(e,this._firestore);return this._mutations=this._mutations.concat(new vs(t._key,Ne.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(b.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function bo(n,e){if((n=ie(n)).firestore!==e)throw new N(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function tc(){return new Ha("serverTimestamp")}function RT(...n){return new Ga("arrayUnion",n)}function PT(...n){return new Ka("arrayRemove",n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CT(n){return tr(n=Pe(n,Ye)),new $f(n,e=>rr(n,e))}(function(e,t=!0){(function(i){Yn=i})(Kn),ot(new Ke("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),c=new Ye(new bw(r.getProvider("auth-internal")),new Cw(a,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new N(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new xn(d.options.projectId,p)}(a,i),a);return s={useFetchStreams:t,...s},c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Be(Yu,Ju,e),Be(Yu,Ju,"esm2020")})();const kT=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Uf,Bytes:xe,CollectionReference:_t,DocumentReference:re,DocumentSnapshot:Mt,FieldPath:nr,FieldValue:mn,Firestore:Ye,FirestoreError:N,GeoPoint:He,Query:vt,QueryCompositeFilterConstraint:Ns,QueryConstraint:Xa,QueryDocumentSnapshot:Vr,QueryFieldFilterConstraint:ei,QueryOrderByConstraint:Vs,QuerySnapshot:xt,SnapshotMetadata:Rn,Timestamp:ee,VectorValue:Ge,WriteBatch:$f,_AutoId:fs,_ByteString:ge,_DatabaseId:xn,_DocumentKey:x,_EmptyAuthCredentialsProvider:dd,_FieldPath:me,_cast:Pe,_logWarn:an,_validateIsNotUsedTogether:pd,addDoc:ni,arrayRemove:PT,arrayUnion:RT,collection:$e,connectFirestoreEmulator:Sf,deleteDoc:Ms,doc:Ze,ensureFirestoreConfigured:tr,executeWrite:rr,getDoc:Os,getDocs:ti,getFirestore:bf,onSnapshot:xs,orderBy:xf,query:Je,serverTimestamp:tc,setDoc:bT,updateDoc:Ls,where:ut,writeBatch:CT},Symbol.toStringTag,{value:"Module"})),jf="@firebase/installations",nc="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf=1e4,zf=`w:${nc}`,Wf="FIS_v2",DT="https://firebaseinstallations.googleapis.com/v1",NT=3600*1e3,VT="installations",OT="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LT={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},un=new hn(VT,OT,LT);function Hf(n){return n instanceof Xe&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gf({projectId:n}){return`${DT}/projects/${n}/installations`}function Kf(n){return{token:n.token,requestStatus:2,expiresIn:xT(n.expiresIn),creationTime:Date.now()}}async function Qf(n,e){const r=(await e.json()).error;return un.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Yf({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function MT(n,{refreshToken:e}){const t=Yf(n);return t.append("Authorization",FT(e)),t}async function Jf(n){const e=await n();return e.status>=500&&e.status<600?n():e}function xT(n){return Number(n.replace("s","000"))}function FT(n){return`${Wf} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UT({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=Gf(n),i=Yf(n),s=e.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&i.append("x-firebase-client",d)}const a={fid:t,authVersion:Wf,appId:n.appId,sdkVersion:zf},c={method:"POST",headers:i,body:JSON.stringify(a)},l=await Jf(()=>fetch(r,c));if(l.ok){const d=await l.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:Kf(d.authToken)}}else throw await Qf("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BT(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $T=/^[cdef][\w-]{21}$/,na="";function jT(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=qT(n);return $T.test(t)?t:na}catch{return na}}function qT(n){return BT(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fs(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=new Map;function ep(n,e){const t=Fs(n);tp(t,e),zT(t,e)}function tp(n,e){const t=Zf.get(n);if(t)for(const r of t)r(e)}function zT(n,e){const t=WT();t&&t.postMessage({key:n,fid:e}),HT()}let tn=null;function WT(){return!tn&&"BroadcastChannel"in self&&(tn=new BroadcastChannel("[Firebase] FID Change"),tn.onmessage=n=>{tp(n.data.key,n.data.fid)}),tn}function HT(){Zf.size===0&&tn&&(tn.close(),tn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT="firebase-installations-database",KT=1,ln="firebase-installations-store";let Ro=null;function rc(){return Ro||(Ro=vh(GT,KT,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(ln)}}})),Ro}async function ss(n,e){const t=Fs(n),i=(await rc()).transaction(ln,"readwrite"),s=i.objectStore(ln),a=await s.get(t);return await s.put(e,t),await i.done,(!a||a.fid!==e.fid)&&ep(n,e.fid),e}async function np(n){const e=Fs(n),r=(await rc()).transaction(ln,"readwrite");await r.objectStore(ln).delete(e),await r.done}async function Us(n,e){const t=Fs(n),i=(await rc()).transaction(ln,"readwrite"),s=i.objectStore(ln),a=await s.get(t),c=e(a);return c===void 0?await s.delete(t):await s.put(c,t),await i.done,c&&(!a||a.fid!==c.fid)&&ep(n,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ic(n){let e;const t=await Us(n.appConfig,r=>{const i=QT(r),s=YT(n,i);return e=s.registrationPromise,s.installationEntry});return t.fid===na?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function QT(n){const e=n||{fid:jT(),registrationStatus:0};return rp(e)}function YT(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(un.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=JT(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:XT(n)}:{installationEntry:e}}async function JT(n,e){try{const t=await UT(n,e);return ss(n.appConfig,t)}catch(t){throw Hf(t)&&t.customData.serverCode===409?await np(n.appConfig):await ss(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function XT(n){let e=await Ql(n.appConfig);for(;e.registrationStatus===1;)await Xf(100),e=await Ql(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await ic(n);return r||t}return e}function Ql(n){return Us(n,e=>{if(!e)throw un.create("installation-not-found");return rp(e)})}function rp(n){return ZT(n)?{fid:n.fid,registrationStatus:0}:n}function ZT(n){return n.registrationStatus===1&&n.registrationTime+qf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ev({appConfig:n,heartbeatServiceProvider:e},t){const r=tv(n,t),i=MT(n,t),s=e.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&i.append("x-firebase-client",d)}const a={installation:{sdkVersion:zf,appId:n.appId}},c={method:"POST",headers:i,body:JSON.stringify(a)},l=await Jf(()=>fetch(r,c));if(l.ok){const d=await l.json();return Kf(d)}else throw await Qf("Generate Auth Token",l)}function tv(n,{fid:e}){return`${Gf(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sc(n,e=!1){let t;const r=await Us(n.appConfig,s=>{if(!ip(s))throw un.create("not-registered");const a=s.authToken;if(!e&&iv(a))return s;if(a.requestStatus===1)return t=nv(n,e),s;{if(!navigator.onLine)throw un.create("app-offline");const c=ov(s);return t=rv(n,c),c}});return t?await t:r.authToken}async function nv(n,e){let t=await Yl(n.appConfig);for(;t.authToken.requestStatus===1;)await Xf(100),t=await Yl(n.appConfig);const r=t.authToken;return r.requestStatus===0?sc(n,e):r}function Yl(n){return Us(n,e=>{if(!ip(e))throw un.create("not-registered");const t=e.authToken;return av(t)?{...e,authToken:{requestStatus:0}}:e})}async function rv(n,e){try{const t=await ev(n,e),r={...e,authToken:t};return await ss(n.appConfig,r),t}catch(t){if(Hf(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await np(n.appConfig);else{const r={...e,authToken:{requestStatus:0}};await ss(n.appConfig,r)}throw t}}function ip(n){return n!==void 0&&n.registrationStatus===2}function iv(n){return n.requestStatus===2&&!sv(n)}function sv(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+NT}function ov(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function av(n){return n.requestStatus===1&&n.requestTime+qf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cv(n){const e=n,{installationEntry:t,registrationPromise:r}=await ic(e);return r?r.catch(console.error):sc(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uv(n,e=!1){const t=n;return await lv(t),(await sc(t,e)).token}async function lv(n){const{registrationPromise:e}=await ic(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hv(n){if(!n||!n.options)throw Po("App Configuration");if(!n.name)throw Po("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Po(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Po(n){return un.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sp="installations",dv="installations-internal",fv=n=>{const e=n.getProvider("app").getImmediate(),t=hv(e),r=dn(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},pv=n=>{const e=n.getProvider("app").getImmediate(),t=dn(e,sp).getImmediate();return{getId:()=>cv(t),getToken:i=>uv(t,i)}};function mv(){ot(new Ke(sp,fv,"PUBLIC")),ot(new Ke(dv,pv,"PRIVATE"))}mv();Be(jf,nc);Be(jf,nc,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os="analytics",gv="firebase_id",_v="origin",yv=60*1e3,wv="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",oc="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le=new us("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iv={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ue=new hn("analytics","Analytics",Iv);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ev(n){if(!n.startsWith(oc)){const e=Ue.create("invalid-gtag-resource",{gtagURL:n});return Le.warn(e.message),""}return n}function op(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function Tv(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function vv(n,e){const t=Tv("firebase-js-sdk-policy",{createScriptURL:Ev}),r=document.createElement("script"),i=`${oc}?l=${n}&id=${e}`;r.src=t?t?.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function Av(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function Sv(n,e,t,r,i,s){const a=r[i];try{if(a)await e[a];else{const l=(await op(t)).find(d=>d.measurementId===i);l&&await e[l.appId]}}catch(c){Le.error(c)}n("config",i,s)}async function bv(n,e,t,r,i){try{let s=[];if(i&&i.send_to){let a=i.send_to;Array.isArray(a)||(a=[a]);const c=await op(t);for(const l of a){const d=c.find(g=>g.measurementId===l),p=d&&e[d.appId];if(p)s.push(p);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),n("event",r,i||{})}catch(s){Le.error(s)}}function Rv(n,e,t,r){async function i(s,...a){try{if(s==="event"){const[c,l]=a;await bv(n,e,t,c,l)}else if(s==="config"){const[c,l]=a;await Sv(n,e,t,r,c,l)}else if(s==="consent"){const[c,l]=a;n("consent",c,l)}else if(s==="get"){const[c,l,d]=a;n("get",c,l,d)}else if(s==="set"){const[c]=a;n("set",c)}else n(s,...a)}catch(c){Le.error(c)}}return i}function Pv(n,e,t,r,i){let s=function(...a){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=Rv(s,n,e,t),{gtagCore:s,wrappedGtag:window[i]}}function Cv(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(oc)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kv=30,Dv=1e3;class Nv{constructor(e={},t=Dv){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const ap=new Nv;function Vv(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function Ov(n){const{appId:e,apiKey:t}=n,r={method:"GET",headers:Vv(t)},i=wv.replace("{app-id}",e),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let a="";try{const c=await s.json();c.error?.message&&(a=c.error.message)}catch{}throw Ue.create("config-fetch-failed",{httpStatus:s.status,responseMessage:a})}return s.json()}async function Lv(n,e=ap,t){const{appId:r,apiKey:i,measurementId:s}=n.options;if(!r)throw Ue.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw Ue.create("no-api-key")}const a=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new Fv;return setTimeout(async()=>{c.abort()},yv),cp({appId:r,apiKey:i,measurementId:s},a,c,e)}async function cp(n,{throttleEndTimeMillis:e,backoffCount:t},r,i=ap){const{appId:s,measurementId:a}=n;try{await Mv(r,e)}catch(c){if(a)return Le.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:s,measurementId:a};throw c}try{const c=await Ov(n);return i.deleteThrottleMetadata(s),c}catch(c){const l=c;if(!xv(l)){if(i.deleteThrottleMetadata(s),a)return Le.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${l?.message}]`),{appId:s,measurementId:a};throw c}const d=Number(l?.customData?.httpStatus)===503?vu(t,i.intervalMillis,kv):vu(t,i.intervalMillis),p={throttleEndTimeMillis:Date.now()+d,backoffCount:t+1};return i.setThrottleMetadata(s,p),Le.debug(`Calling attemptFetch again in ${d} millis`),cp(n,p,r,i)}}function Mv(n,e){return new Promise((t,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(t,i);n.addEventListener(()=>{clearTimeout(s),r(Ue.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function xv(n){if(!(n instanceof Xe)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class Fv{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Uv(n,e,t,r,i){if(i&&i.global){n("event",t,r);return}else{const s=await e,a={...r,send_to:s};n("event",t,a)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bv(){if(wh())try{await Ih()}catch(n){return Le.warn(Ue.create("indexeddb-unavailable",{errorInfo:n?.toString()}).message),!1}else return Le.warn(Ue.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function $v(n,e,t,r,i,s,a){const c=Lv(n);c.then(y=>{t[y.measurementId]=y.appId,n.options.measurementId&&y.measurementId!==n.options.measurementId&&Le.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${y.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(y=>Le.error(y)),e.push(c);const l=Bv().then(y=>{if(y)return r.getId()}),[d,p]=await Promise.all([c,l]);Cv(s)||vv(s,d.measurementId),i("js",new Date);const g=a?.config??{};return g[_v]="firebase",g.update=!0,p!=null&&(g[gv]=p),i("config",d.measurementId,g),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jv{constructor(e){this.app=e}_delete(){return delete Or[this.app.options.appId],Promise.resolve()}}let Or={},Jl=[];const Xl={};let Co="dataLayer",qv="gtag",Zl,up,eh=!1;function zv(){const n=[];if(yh()&&n.push("This is a browser extension environment."),rg()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,i)=>`(${i+1}) ${r}`).join(" "),t=Ue.create("invalid-analytics-context",{errorInfo:e});Le.warn(t.message)}}function Wv(n,e,t){zv();const r=n.options.appId;if(!r)throw Ue.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)Le.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ue.create("no-api-key");if(Or[r]!=null)throw Ue.create("already-exists",{id:r});if(!eh){Av(Co);const{wrappedGtag:s,gtagCore:a}=Pv(Or,Jl,Xl,Co,qv);up=s,Zl=a,eh=!0}return Or[r]=$v(n,Jl,Xl,e,Zl,Co,t),new jv(n)}function Hv(n=oa()){n=ie(n);const e=dn(n,os);return e.isInitialized()?e.getImmediate():Gv(n)}function Gv(n,e={}){const t=dn(n,os);if(t.isInitialized()){const i=t.getImmediate();if(st(e,t.getOptions()))return i;throw Ue.create("already-initialized")}return t.initialize({options:e})}function Kv(n,e,t,r){n=ie(n),Uv(up,Or[n.app.options.appId],e,t,r).catch(i=>Le.error(i))}const th="@firebase/analytics",nh="0.10.18";function Qv(){ot(new Ke(os,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return Wv(r,i,t)},"PUBLIC")),ot(new Ke("analytics-internal",n,"PRIVATE")),Be(th,nh),Be(th,nh,"esm2020");function n(e){try{const t=e.getProvider(os).getImmediate();return{logEvent:(r,i,s)=>Kv(t,r,i,s)}}catch(t){throw Ue.create("interop-component-reg-failed",{reason:t})}}}Qv();const Yt={},lp={apiKey:Yt?.VITE_FIREBASE_API_KEY||"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:Yt?.VITE_FIREBASE_AUTH_DOMAIN||"controle-financeiro-b98ec.firebaseapp.com",projectId:Yt?.VITE_FIREBASE_PROJECT_ID||"controle-financeiro-b98ec",storageBucket:Yt?.VITE_FIREBASE_STORAGE_BUCKET||"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:Yt?.VITE_FIREBASE_MESSAGING_SENDER_ID||"418109336597",appId:Yt?.VITE_FIREBASE_APP_ID||"1:418109336597:web:871b262a76e57455ebb21c",measurementId:Yt?.VITE_FIREBASE_MEASUREMENT_ID||"G-7RW2F269V6"},ri=Ah(lp);try{console.info("[Firebase] Connected project:",lp.projectId)}catch{}const ir=vw(ri),ae=bf(ri);let ac=null;try{ac=Hv(ri)}catch{}const hp=uy(ir,Kh).then(()=>{try{console.info("[Firebase] Auth persistence set to local")}catch{}}).catch(n=>{console.error("Firebase Auth persistence error:",n)}),Yv=Object.freeze(Object.defineProperty({__proto__:null,get analytics(){return ac},app:ri,auth:ir,authReady:hp,db:ae},Symbol.toStringTag,{value:"Module"}));function Bs(n={}){let e={...n};const t=new Set;function r(){return e}function i(a){const c=e;e={...e,...a};for(const{selector:l,cb:d,last:p}of t){const g=l?l(e):e;if(g!==p.value){p.value=g;try{d(g,c)}catch{}}}}function s(a,c){const l={selector:a,cb:c,last:{value:a?a(e):e}};return t.add(l),()=>t.delete(l)}return{getState:r,setState:i,subscribe:s}}const yt=Bs({user:null,loading:!0,error:null});function dp(){return new Promise(n=>{const e=()=>dy(ir,r=>{yt.setState({user:r,loading:!1}),R.emit("auth:changed",r),r&&cc(r).catch(()=>{}),n(r||null),t()});let t;hp.then(()=>{t=e()}).catch(()=>{t=e()})})}async function Jv(){try{yt.setState({loading:!0,error:null});const n=new ft,e=await Ny(ir,n);try{await cc(e.user)}catch{}return yt.setState({user:e.user,loading:!1}),R.emit("auth:login",e.user),e.user}catch(n){throw yt.setState({error:n.message,loading:!1}),R.emit("auth:error",n),n}}async function Xv(){try{await fy(ir),yt.setState({user:null}),R.emit("auth:logout")}catch(n){throw yt.setState({error:n.message}),R.emit("auth:error",n),n}}function Zv(){return yt.getState().user}function eA(){return!!yt.getState().user}async function cc(n){try{if(!n||!n.uid)return;const{doc:e,getDoc:t,setDoc:r,updateDoc:i,serverTimestamp:s}=await j(async()=>{const{doc:p,getDoc:g,setDoc:y,updateDoc:P,serverTimestamp:k}=await Promise.resolve().then(()=>kT);return{doc:p,getDoc:g,setDoc:y,updateDoc:P,serverTimestamp:k}},void 0),{db:a}=await j(async()=>{const{db:p}=await Promise.resolve().then(()=>Yv);return{db:p}},void 0),c=e(a,"users",n.uid),l=await t(c),d={uid:n.uid,email:n.email||null,emailLower:n.email?String(n.email).toLowerCase():null,displayName:n.displayName||null,photoURL:n.photoURL||null,providers:Array.isArray(n.providerData)?n.providerData.map(p=>p?.providerId).filter(Boolean):[],lastLoginAt:s()};l.exists()?await i(c,d):await r(c,{...d,createdAt:s()},{merge:!0})}catch(e){console.warn("ensureUserProfile: falha ao salvar perfil do usuário:",e?.message||e)}}const FA=Object.freeze(Object.defineProperty({__proto__:null,authStore:yt,ensureUserProfile:cc,getCurrentUser:Zv,isAuthenticated:eA,loginWithGoogle:Jv,logout:Xv,waitForAuth:dp},Symbol.toStringTag,{value:"Module"})),_n="budgets";async function tA(n){if(!n)return null;const e=Ze(ae,_n,n),t=await Os(e);return t.exists()?{id:t.id,...t.data()}:null}async function fp(n={}){const e=$e(ae,_n),t=[];n.userId&&t.push(ut("userId","==",n.userId));const r=t.length?Je(e,...t):e;return(await ti(r)).docs.map(s=>({id:s.id,...s.data()}))}async function pp(n){return fp({userId:n})}async function uc(n){const e=$e(ae,_n),t=Je(e,ut("usuariosPermitidos","array-contains",n));return(await ti(t)).docs.map(i=>({id:i.id,...i.data()}))}async function mp(n){const e=$e(ae,_n);return(await ni(e,n)).id}async function gp(n,e){const t=Ze(ae,_n,n);return await Ls(t,e),!0}async function _p(n){const e=Ze(ae,_n,n);return await Ms(e),!0}function yp(n,e){const t=$e(ae,_n),r=Je(t,ut("userId","==",n));return xs(r,i=>{const s=c=>c?.toDate?c.toDate():c?.seconds?new Date(c.seconds*1e3):c?new Date(c):new Date(0),a=i.docs.map(c=>({id:c.id,...c.data()})).sort((c,l)=>s(l.createdAt)-s(c.createdAt));e(a)})}const nA=Object.freeze(Object.defineProperty({__proto__:null,create:mp,getById:tA,list:fp,listOwn:pp,listShared:uc,listenToChanges:yp,remove:_p,update:gp},Symbol.toStringTag,{value:"Module"})),Vn=Bs({budgets:[],currentBudget:null,loading:!1,error:null});let zn=new Map;async function lc(n){try{Vn.setState({loading:!0,error:null});const[e,t]=await Promise.all([pp(n),uc(n)]),r=(d,p)=>(d||[]).map(g=>({...g,isOwner:typeof g.isOwner=="boolean"?g.isOwner:g.userId===n})),i=r(e,!0),s=r(t,!1),a=new Map;[...i,...s].forEach(d=>{const p=a.get(d.id);(!p||d.isOwner&&!p.isOwner)&&a.set(d.id,d)});const c=d=>d?.toDate?d.toDate():d?.seconds?new Date(d.seconds*1e3):d?new Date(d):new Date(0),l=Array.from(a.values()).sort((d,p)=>c(p.createdAt)-c(d.createdAt));return Vn.setState({budgets:l,loading:!1}),typeof window<"u"&&(window.appState=window.appState||{},window.appState.budgets=l),l}catch(e){throw Vn.setState({error:e.message,loading:!1}),e}}async function rA(n){try{return await uc(n)}catch(e){throw R.emit("error:budget",e),e}}function wp(n){if(zn.has(n))return;const e=yp(n,t=>{Vn.setState({budgets:t}),R.emit("budgets:updated",{budgets:t})});zn.set(n,e)}function iA(n){const e=zn.get(n);e&&(e(),zn.delete(n))}function qr(n){Vn.setState({currentBudget:n}),R.emit("budget:changed",n);try{n?.id&&localStorage.setItem("currentBudgetId",n.id)}catch{}}async function Ip(n){try{const e=await mp(n);return R.emit("budget:created",e),e}catch(e){throw R.emit("error:budget",e),e}}async function sA(n,e){try{await gp(n,e),R.emit("budget:updated",{id:n,data:e})}catch(t){throw R.emit("error:budget",t),t}}async function oA(n){try{await _p(n),R.emit("budget:deleted",{id:n})}catch(e){throw R.emit("error:budget",e),e}}function Ep(){zn.forEach(n=>n()),zn.clear()}async function Tp(n){try{const e=await lc(n);if(e&&e.length>0){const t=e[0];return qr(t),window.appState&&(window.appState.currentBudget=t),console.log("✅ Orçamento padrão selecionado:",t.nome),t}else{const r=await Ip({nome:"Orçamento Principal",descricao:"Orçamento padrão criado automaticamente",userId:n,tipo:"pessoal",createdAt:new Date,usuariosPermitidos:[n]}),i=await vp(r);if(i)return qr(i),window.appState&&(window.appState.currentBudget=i),console.log("✅ Novo orçamento padrão criado:",i.nome),i}return null}catch(e){throw console.error("❌ Erro ao selecionar orçamento padrão:",e),e}}async function vp(n){const{getById:e}=await j(async()=>{const{getById:t}=await Promise.resolve().then(()=>nA);return{getById:t}},void 0);return e(n)}function aA(n){qr(n),window.appState&&(window.appState.currentBudget=n);try{n?.id&&localStorage.setItem("currentBudgetId",n.id)}catch{}return n}const UA=Object.freeze(Object.defineProperty({__proto__:null,budgetsStore:Vn,createBudget:Ip,deleteBudget:oA,getById:vp,loadSharedBudgets:rA,loadUserBudgets:lc,selectDefaultBudget:Tp,setCurrentBudget:qr,setCurrentBudgetGlobal:aA,startBudgetsListener:wp,stopAllListeners:Ep,stopBudgetsListener:iA,updateBudget:sA},Symbol.toStringTag,{value:"Module"})),yn="transactions";function hc(n){return{id:n.id,...n.data()}}function as(n){try{if(n&&typeof n.toDate=="function")return n.toDate();if(n&&typeof n=="object"&&"seconds"in n)return new Date(n.seconds*1e3);if(n instanceof Date)return n;if(typeof n=="string"||typeof n=="number")return new Date(n)}catch{}return new Date(0)}async function rh({budgetId:n,userId:e}={}){const t=$e(ae,yn),r=[];n&&r.push(ut("budgetId","==",n)),e&&r.push(ut("userId","==",e));const i=r.length?Je(t,...r):Je(t),a=(await ti(i)).docs.map(hc);return a.sort((c,l)=>as(l.createdAt)-as(c.createdAt)),a}async function Ap(n){const e=Ze(ae,yn,n),t=await Os(e);return t.exists()?hc(t):null}async function dc(n){const e=tc(),t={...n};return t.valor!==void 0&&t.valor!==null&&(t.valor=Number(t.valor)),t.createdAt||(t.createdAt=e),t.updatedAt||(t.updatedAt=e),{id:(await ni($e(ae,yn),t)).id}}async function Sp(n,e){const t=Ze(ae,yn,n),r={...e,updatedAt:tc()};r.valor!==void 0&&r.valor!==null&&(r.valor=Number(r.valor)),await Ls(t,r)}async function bp(n){const e=Ze(ae,yn,n);await Ms(e)}async function cA({userId:n,budgetId:e,rec:t,createdDate:r,parcelaAtual:i}){const s={userId:n,budgetId:e,descricao:t.descricao,valor:Number(t.valor??0),categoriaId:t.categoriaId,tipo:"despesa",createdAt:ee.fromDate(r),recorrenteId:t.id,recorrenteNome:t.descricao,parcelaAtual:i??null,parcelasTotal:t.parcelasTotal??null};return{id:(await ni($e(ae,yn),s)).id}}function uA({budgetId:n,userId:e},t){const r=$e(ae,yn),i=[];n&&i.push(ut("budgetId","==",n));const s=i.length?Je(r,...i):Je(r);return xs(s,a=>{const c=a.docs.map(hc).sort((l,d)=>as(d.createdAt)-as(l.createdAt));t(c)})}const Lr=Bs({transactions:[],loading:!1,error:null});let Wn=new Map;async function $s(n,e){try{Lr.setState({loading:!0,error:null});let r=await rh({budgetId:n});try{if((!r||r.length===0)&&typeof window<"u"){const i=e||window.appState?.currentUser?.uid,s=window.appState?.budgets||[],a=Array.isArray(s)&&s.length>1;if(i){const c=await rh({userId:i});r=a?(c||[]).filter(l=>l.budgetId===n):(c||[]).filter(l=>!l.budgetId||l.budgetId===n)}}}catch{}Lr.setState({transactions:r,loading:!1});try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.transactions=r)}catch{}return r}catch(t){throw Lr.setState({error:t.message,loading:!1}),t}}function fc(n,e){const t=`${n}-${e}`;if(Wn.has(t))return;const r=uA({budgetId:n,userId:e},i=>{Lr.setState({transactions:i}),R.emit("transactions:updated",{budgetId:n,transactions:i})});Wn.set(t,r)}function lA(n,e){const t=`${n}-${e}`,r=Wn.get(t);r&&(r(),Wn.delete(t))}function pc(){Wn.forEach(n=>n()),Wn.clear()}async function hA(n){try{const e=await dc(n);return R.emit("transaction:added",e),e}catch(e){throw R.emit("error:transaction",e),e}}async function dA(n,e){try{await Sp(n,e),R.emit("transaction:updated",{id:n,data:e})}catch(t){throw R.emit("error:transaction",t),t}}async function fA(n){try{await bp(n),R.emit("transaction:deleted",{id:n})}catch(e){throw R.emit("error:transaction",e),e}}async function pA(n){try{const e=await cA(n);return R.emit("transaction:recurring:applied",e),e}catch(e){throw R.emit("error:transaction",e),e}}async function mA(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const r={...n,userId:e.uid,budgetId:t.id},{id:i}=await dc(r);console.log("✅ Transação adicionada com ID:",i);try{if(typeof window<"u"&&typeof window.sendTransactionNotification=="function")await window.sendTransactionNotification(t.id,e.uid,{...r,id:i});else{const{sendTransactionNotification:a}=await j(async()=>{const{sendTransactionNotification:c}=await import("./NotificationService-zMQk2mrd.js");return{sendTransactionNotification:c}},[]);await a(t.id,e.uid,{...r,id:i})}}catch(a){console.warn("Não foi possível enviar notificações de nova transação:",a)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const a=typeof window<"u"?window:null;a&&a.forceUIUpdate&&setTimeout(()=>{try{a.forceUIUpdate&&a.forceUIUpdate()}catch{}},100)}const{Snackbar:s}=await j(async()=>{const{Snackbar:a}=await import("./Snackbar-C1E5NQ3k.js");return{Snackbar:a}},__vite__mapDeps([11,12]));return typeof s?.show=="function"?s.show("Transação adicionada com sucesso!","success"):typeof s=="function"?s({message:"Transação adicionada com sucesso!",type:"success"}):window?.Snackbar?.show&&window.Snackbar.show("Transação adicionada com sucesso!","success"),i}catch(e){console.error("❌ Erro ao adicionar transação:",e);try{const{Snackbar:t}=await j(async()=>{const{Snackbar:r}=await import("./Snackbar-C1E5NQ3k.js");return{Snackbar:r}},__vite__mapDeps([11,12]));typeof t?.show=="function"?t.show("Erro ao adicionar transação","error"):typeof t=="function"?t({message:"Erro ao adicionar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao adicionar transação","error")}catch{}throw e}}async function gA(n,e){try{let t=null;try{t=await Ap(n)}catch{}await Sp(n,{...e}),console.log("✅ Transação atualizada:",n);try{const i=window.appState.currentUser,s=window.appState.currentBudget?.id;if(s&&i?.uid){const a={};if(t){const l=d=>Object.prototype.hasOwnProperty.call(e,d);l("valor")&&t.valor!==e.valor&&(a.valor={from:t.valor,to:e.valor}),l("descricao")&&t.descricao!==e.descricao&&(a.descricao={from:t.descricao,to:e.descricao}),l("categoriaId")&&t.categoriaId!==e.categoriaId&&(a.categoriaId={from:t.categoriaId,to:e.categoriaId}),l("tipo")&&t.tipo!==e.tipo&&(a.tipo={from:t.tipo,to:e.tipo})}const c={id:n,...e,prev:t?{descricao:t.descricao,valor:t.valor,categoriaId:t.categoriaId,tipo:t.tipo}:null,changeSet:a};if(typeof window<"u"&&typeof window.sendTransactionUpdatedNotification=="function")await window.sendTransactionUpdatedNotification(s,i.uid,c);else{const{sendTransactionUpdatedNotification:l}=await j(async()=>{const{sendTransactionUpdatedNotification:d}=await import("./NotificationService-zMQk2mrd.js");return{sendTransactionUpdatedNotification:d}},[]);await l(s,i.uid,c)}}}catch(i){console.warn("Não foi possível enviar notificações de atualização de transação:",i)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const i=typeof window<"u"?window:null;i&&i.forceUIUpdate&&setTimeout(()=>{try{i.forceUIUpdate&&i.forceUIUpdate()}catch{}},100)}const{Snackbar:r}=await j(async()=>{const{Snackbar:i}=await import("./Snackbar-C1E5NQ3k.js");return{Snackbar:i}},__vite__mapDeps([11,12]));typeof r?.show=="function"?r.show("Transação atualizada com sucesso!","success"):typeof r=="function"?r({message:"Transação atualizada com sucesso!",type:"success"}):window?.Snackbar?.show&&window.Snackbar.show("Transação atualizada com sucesso!","success")}catch(t){console.error("❌ Erro ao atualizar transação:",t);try{const{Snackbar:r}=await j(async()=>{const{Snackbar:i}=await import("./Snackbar-C1E5NQ3k.js");return{Snackbar:i}},__vite__mapDeps([11,12]));typeof r?.show=="function"?r.show("Erro ao atualizar transação","error"):typeof r=="function"?r({message:"Erro ao atualizar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao atualizar transação","error")}catch{}throw t}}async function _A(n){try{let e=null;try{const s=await Ap(n);s&&(e=s)}catch(s){console.warn("Não foi possível ler a transação antes de excluir:",s)}await bp(n);try{if(typeof window<"u"){const s=Array.isArray(window.appState?.transactions)?window.appState.transactions.slice():[],a=s.findIndex(c=>c.id===n);a!==-1&&(s.splice(a,1),window.appState.transactions=s,R.emit("transactions:updated",{transactions:s}))}}catch{}console.log("✅ Transação deletada:",n);try{const s=window.appState.currentUser,a=e?.budgetId||window.appState.currentBudget?.id;if(a&&s?.uid){const c=e||{id:n};if(typeof window<"u"&&typeof window.sendTransactionDeletedNotification=="function")await window.sendTransactionDeletedNotification(a,s.uid,c);else{const{sendTransactionDeletedNotification:l}=await j(async()=>{const{sendTransactionDeletedNotification:d}=await import("./NotificationService-zMQk2mrd.js");return{sendTransactionDeletedNotification:d}},[]);await l(a,s.uid,c)}}}catch(s){console.warn("Não foi possível enviar notificações de exclusão de transação:",s)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const s=typeof window<"u"?window:null;s&&s.forceUIUpdate&&setTimeout(()=>{try{s.forceUIUpdate&&s.forceUIUpdate()}catch{}},100)}const{Snackbar:t}=await j(async()=>{const{Snackbar:s}=await import("./Snackbar-C1E5NQ3k.js");return{Snackbar:s}},__vite__mapDeps([11,12])),i={label:"Desfazer",onClick:async()=>{try{if(!e)return;const{id:s}=await dc(e);try{if(typeof window<"u"){const a=Array.isArray(window.appState?.transactions)?window.appState.transactions.slice():[];a.unshift({...e,id:s}),window.appState.transactions=a,R.emit("transactions:updated",{transactions:a})}}catch{}t.show("Exclusão desfeita","success")}catch(s){console.warn("Falha ao desfazer exclusão:",s),t.show("Não foi possível desfazer","error")}}};typeof t?.show=="function"?t.show("Transação excluída","success",5e3,i):typeof t=="function"?t({message:"Transação excluída",type:"success",duration:5e3,action:i}):window?.Snackbar?.show&&window.Snackbar.show("Transação excluída","success")}catch(e){console.error("❌ Erro ao deletar transação:",e);try{const{Snackbar:t}=await j(async()=>{const{Snackbar:r}=await import("./Snackbar-C1E5NQ3k.js");return{Snackbar:r}},__vite__mapDeps([11,12]));typeof t?.show=="function"?t.show("Erro ao deletar transação","error"):typeof t=="function"?t({message:"Erro ao deletar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao deletar transação","error")}catch{}throw e}}const BA=Object.freeze(Object.defineProperty({__proto__:null,addTransaction:hA,addTransactionWithNotifications:mA,createFromRecurring:pA,deleteTransaction:fA,deleteTransactionWithNotifications:_A,loadTransactions:$s,startTransactionsListener:fc,stopAllListeners:pc,stopTransactionsListener:lA,transactionsStore:Lr,updateTransaction:dA,updateTransactionWithNotifications:gA},Symbol.toStringTag,{value:"Module"})),sr="categories";async function mc(n){if(!n)return null;const e=Ze(ae,sr,n),t=await Os(e);return t.exists()?{id:t.id,...t.data()}:null}async function ra(n={}){const e=$e(ae,sr),t=[];n.budgetId&&t.push(ut("budgetId","==",n.budgetId)),n.userId&&t.push(ut("userId","==",n.userId));const r=t.length?Je(e,...t):Je(e),s=(await ti(r)).docs.map(a=>({id:a.id,...a.data()}));return s.sort((a,c)=>(a.nome||"").localeCompare(c.nome||"")),s}async function Rp(n){const e=$e(ae,sr);return(await ni(e,n)).id}async function Pp(n,e){const t=Ze(ae,sr,n);return await Ls(t,e),!0}async function Cp(n){const e=Ze(ae,sr,n);return await Ms(e),!0}function kp(n,e){const t=$e(ae,sr),r=Je(t,ut("budgetId","==",n),xf("nome"));return xs(r,i=>{const s=i.docs.map(a=>({id:a.id,...a.data()}));e(s)})}const $A=Object.freeze(Object.defineProperty({__proto__:null,create:Rp,getById:mc,list:ra,listenToChanges:kp,remove:Cp,update:Pp},Symbol.toStringTag,{value:"Module"})),rn=Bs({categories:[],loading:!1,error:null});let Hn=new Map;async function js(n){try{rn.setState({loading:!0,error:null});let e=await ra({budgetId:n});try{if((!e||e.length===0)&&typeof window<"u"){const t=window.appState?.currentUser?.uid,r=window.appState?.budgets||[],i=Array.isArray(r)&&r.length>1;if(t){const s=await ra({userId:t});e=i?(s||[]).filter(a=>a.budgetId===n):(s||[]).filter(a=>!a.budgetId||a.budgetId===n)}}}catch{}rn.setState({categories:e,loading:!1});try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.categories=e)}catch{}return e}catch(e){throw rn.setState({error:e.message,loading:!1}),e}}function gc(n){if(Hn.has(n))return;const e=kp(n,t=>{rn.setState({categories:t}),R.emit("categories:updated",{budgetId:n,categories:t})});Hn.set(n,e)}function yA(n){const e=Hn.get(n);e&&(e(),Hn.delete(n))}async function wA(n){try{const e={...n};try{const i=e.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),s=e.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);i&&(e.budgetId=i),s&&(e.userId=s)}catch{}const t=await Rp(e),r={id:t,...e};R.emit("category:created",r);try{const i=rn.getState().categories||[];if(!i.some(a=>a.id===t)){const a=[...i,r];a.sort((c,l)=>(c.nome||"").localeCompare(l.nome||"")),rn.setState({categories:a})}if(typeof window<"u"){window.appState=window.appState||{};const a=Array.isArray(window.appState.categories)?window.appState.categories:[];if(!a.some(c=>c.id===t)){const c=[...a,r];c.sort((l,d)=>(l.nome||"").localeCompare(d.nome||"")),window.appState.categories=c}}}catch{}try{const i=r.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),s=r.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(i&&s){const{sendCategoryChangeNotification:a}=await j(async()=>{const{sendCategoryChangeNotification:c}=await import("./NotificationService-zMQk2mrd.js");return{sendCategoryChangeNotification:c}},[]);await a(i,s,r,"category_added")}}catch(i){console.warn("Falha ao notificar criação de categoria:",i)}return r}catch(e){throw R.emit("error:category",e),e}}async function IA(n,e){try{let t=null;try{t=await mc?.(n)}catch{}await Pp(n,e),R.emit("category:updated",{id:n,data:e});try{const r=e?.budgetId||t?.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),i=e?.userId||t?.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(r&&i){const s={id:n,...t,...e},{sendCategoryChangeNotification:a}=await j(async()=>{const{sendCategoryChangeNotification:c}=await import("./NotificationService-zMQk2mrd.js");return{sendCategoryChangeNotification:c}},[]);await a(r,i,s,"category_updated",t||null)}}catch(r){console.warn("Falha ao notificar atualização de categoria:",r)}}catch(t){throw R.emit("error:category",t),t}}async function EA(n){try{let e=null;try{e=await mc?.(n)}catch{}await Cp(n),R.emit("category:deleted",{id:n});try{const t=e?.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),r=e?.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(t&&r){const{sendCategoryChangeNotification:i}=await j(async()=>{const{sendCategoryChangeNotification:a}=await import("./NotificationService-zMQk2mrd.js");return{sendCategoryChangeNotification:a}},[]),s=e?{id:n,...e}:{id:n};await i(t,r,s,"category_deleted",e||null)}}catch(t){console.warn("Falha ao notificar exclusão de categoria:",t)}}catch(e){throw R.emit("error:category",e),e}}function _c(){Hn.forEach(n=>n()),Hn.clear()}const jA=Object.freeze(Object.defineProperty({__proto__:null,categoriesStore:rn,createCategory:wA,deleteCategory:EA,loadCategories:js,startCategoriesListener:gc,stopAllListeners:_c,stopCategoriesListener:yA,updateCategory:IA},Symbol.toStringTag,{value:"Module"}));function TA({path:n="/service-worker.js",onNewVersion:e}={}){"serviceWorker"in navigator&&(window.__swUpdateState={awaitingActivation:!1},navigator.serviceWorker.register(n).then(t=>{const r=()=>{try{if(t.waiting)t.waiting.postMessage({type:"SKIP_WAITING"});else if(t.installing){const s=t.installing;s.addEventListener("statechange",()=>{s.state==="installed"&&t.waiting&&t.waiting.postMessage({type:"SKIP_WAITING"})})}else navigator.serviceWorker?.controller&&navigator.serviceWorker.controller.postMessage({type:"SKIP_WAITING"})}catch{}};function i(){const s=t.installing;s&&s.addEventListener("statechange",()=>{s.state==="installed"&&navigator.serviceWorker.controller&&(window.__swUpdateState.awaitingActivation=!0,typeof e=="function"?e({skipWaiting:r}):setTimeout(()=>r(),3e3))})}t.waiting&&(window.__swUpdateState.awaitingActivation=!0,e&&e({skipWaiting:r})),t.addEventListener("updatefound",i)}).catch(t=>console.warn("SW register failed:",t)))}function vA({onReload:n}={}){if(!navigator.serviceWorker)return;let e=!1;const t=()=>{e||(e=!0,typeof n=="function"?n():window.location.reload())};navigator.serviceWorker.addEventListener("controllerchange",()=>{t()}),setTimeout(()=>{window.__swUpdateState?.awaitingActivation&&t()},4e3)}const Y={user:null,currentBudget:null,transactions:[],categories:[],recorrentes:[],loading:!1,error:null};async function AA(){try{L.info("Inicializando aplicação...");try{TA({onNewVersion:({skipWaiting:e})=>{try{const t=()=>e();typeof window.Snackbar=="function"?window.Snackbar({message:"Nova versão disponível. Toque para atualizar.",type:"info",action:{label:"Atualizar",handler:t},duration:1e4}):confirm("Nova versão disponível. Atualizar agora?")&&t()}catch{}}}),vA()}catch(e){L.warn("Falha ao iniciar fluxo de SW update:",e)}const n=await dp();n||L.warn("Usuário não autenticado — seguindo com modo limitado"),Y.user=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentUser=n||null)}catch{}if(n?L.info("Usuário autenticado:",n.uid):L.info("Sem usuário autenticado"),n){try{await SA(n.uid)}catch(e){L.warn("Falha ao carregar dados iniciais (possível permission-denied):",e?.message||e);try{window?.Snackbar&&window.Snackbar({message:"Sem permissão para ler dados. Verifique acesso ao orçamento.",type:"warning"})}catch{}}try{Dp(n.uid)}catch(e){L.warn("Falha ao iniciar listeners (possível permission-denied):",e?.message||e)}}Mm(),bA(),L.info("Aplicação inicializada com sucesso"),R.emit("app:ready",Y)}catch(n){L.error("Erro ao inicializar aplicação:",n),Y.error=n.message,R.emit("app:error",n)}}async function SA(n){try{const e=await lc(n);if(e.length>0){let t=e[0];try{const s=localStorage.getItem("currentBudgetId");if(s){const a=e.find(c=>c.id===s);a&&(t=a)}}catch{}Y.currentBudget=t;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=t)}catch{}qr(t);const[r,i]=await Promise.all([$s(t.id,n),js(t.id)]);Y.transactions=r,Y.categories=i;try{R.emit("transactions:updated",{budgetId:t.id,transactions:r})}catch{}try{R.emit("categories:updated",{budgetId:t.id,categories:i})}catch{}}L.info("Dados iniciais carregados")}catch(e){throw L.error("Erro ao carregar dados iniciais:",e),e}}function Dp(n){if(Y.currentBudget){const e=Y.currentBudget.id;try{wp(n)}catch(t){L.warn("Listener budgets falhou:",t?.message||t)}try{fc(e,n)}catch(t){L.warn("Listener transactions falhou:",t?.message||t)}try{gc(e)}catch(t){L.warn("Listener categories falhou:",t?.message||t)}L.info("Listeners em tempo real iniciados")}}async function qA(n){try{if(!n)return;Y.user=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentUser=n)}catch{}if(!Y.currentBudget)try{const t=await Tp(n.uid);if(t){Y.currentBudget=t;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=t)}catch{}}}catch(t){L.warn("Falha ao selecionar orçamento padrão pós-login:",t?.message||t)}const e=Y.currentBudget?.id;if(e){try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=Y.currentBudget)}catch{}const[t,r]=await Promise.all([$s(e,n.uid),js(e)]);Y.transactions=t,Y.categories=r;try{R.emit("transactions:updated",{budgetId:e,transactions:t})}catch{}try{R.emit("categories:updated",{budgetId:e,categories:r})}catch{}Dp(n.uid)}try{R.emit("app:ready",Y)}catch{}L.info("Realtime ativado após login")}catch(e){L.error("Erro ao ativar realtime pós-login:",e)}}function bA(){R.on("budget:changed",n=>{Y.currentBudget=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=n||null)}catch{}L.info("Orçamento alterado:",n?.id);try{if(n?.id){try{pc()}catch{}try{_c()}catch{}Y.transactions=[],Y.categories=[];try{typeof window<"u"&&(window.appState.transactions=[],window.appState.categories=[])}catch{}const e=Y.user?.uid;Promise.all([$s(n.id,e),js(n.id)]).then(async([t,r])=>{Y.transactions=t,Y.categories=r;try{R.emit("transactions:updated",{budgetId:n.id,transactions:t})}catch{}try{R.emit("categories:updated",{budgetId:n.id,categories:r})}catch{}try{fc(n.id,e)}catch{}try{gc(n.id)}catch{}try{oh("/dashboard")}catch{try{window.location.hash="#/dashboard"}catch{}}try{const{scrollToTop:i}=await j(async()=>{const{scrollToTop:s}=await Promise.resolve().then(()=>Pn);return{scrollToTop:s}},void 0);i()}catch{}try{typeof window.renderDashboard=="function"&&window.renderDashboard()}catch{}}).catch(t=>L.warn("Falha ao recarregar dados no budget:changed:",t)),RA(n.id)}}catch{}}),R.on("transactions:updated",(n={})=>{try{const e=n.budgetId??Y.currentBudget?.id,t=n.transactions??Y.transactions;e&&Y.currentBudget?.id===e&&Array.isArray(t)&&(Y.transactions=t)}catch(e){L.warn("transactions:updated handler skipped:",e)}}),R.on("categories:updated",(n={})=>{try{const e=n.budgetId??Y.currentBudget?.id,t=n.categories??Y.categories;e&&Y.currentBudget?.id===e&&Array.isArray(t)&&(Y.categories=t)}catch(e){L.warn("categories:updated handler skipped:",e)}}),R.on("error:transaction",n=>{L.error("Erro em transação:",n)}),R.on("error:budget",n=>{L.error("Erro em orçamento:",n)}),R.on("error:category",n=>{L.error("Erro em categoria:",n)})}async function RA(n){try{const e=Y?.user?.uid||Y?.currentUser?.uid;if(!e||!n)return;const t=new Date,r=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`,i=`legacyfix:${e}:${n}:${r}`;if(localStorage.getItem(i)==="done")return;try{await(await j(()=>import("./fixers-kxFX_Tof.js"),[])).corrigirTudoSemBudget({silent:!0})}catch(s){console.warn("AutoFix: falha ao importar/rodar fixers:",s)}localStorage.setItem(i,"done")}catch(e){console.warn("runAutoLegacyFixForBudget erro:",e)}}function PA(){L.info("Limpando recursos da aplicação..."),Ep(),pc(),_c(),R.off("budget:changed"),R.off("transactions:updated"),R.off("categories:updated"),R.off("error:transaction"),R.off("error:budget"),R.off("error:category"),xm(),L.info("Recursos limpos")}typeof window<"u"&&(window.appState=Y);async function CA(){try{await AA();try{(()=>{const t=new Set(["#/dashboard","#/transactions","#/categories","#/analytics","#/recorrentes","#/notifications","#/settings"]),i=(window.location.hash||"").split("?")[0];(!i||i==="#"||i==="#/"||!t.has(i)||i==="#/recorrentes")&&(window.location.hash="#/dashboard"),typeof performance<"u"?window.__forceDashboardUntil=performance.now()+2500:window.__forceDashboardUntil=Date.now()+2500})()}catch{}async function n(){const t=(window.location.hash||"").split("?")[0],r=(t.replace("#","")||"/").trim();try{const{scrollToTop:s}=await j(async()=>{const{scrollToTop:a}=await Promise.resolve().then(()=>Pn);return{scrollToTop:a}},void 0);s(!0)}catch{}try{const s=await j(()=>Promise.resolve().then(()=>Pn),void 0),a=s.parseYmFromHash(),c=s.getSelectedPeriod();a&&(a.year!==c.year||a.month!==c.month)?s.setSelectedPeriod(a.year,a.month):a||s.ensureHashHasYm(c.year,c.month)}catch{}const i=typeof window<"u"&&window.performance&&typeof window.performance.now=="function"?window.performance.now():Date.now();if(window.__forceDashboardUntil&&i<window.__forceDashboardUntil&&t==="#/recorrentes"){try{window.location.hash="#/dashboard"}catch{}return}try{await ih(r)}catch(s){L.error("route error",s)}}window.addEventListener("hashchange",()=>{try{const t=(window.location.hash||"").split("?")[0],r=typeof window<"u"&&window.performance&&typeof window.performance.now=="function"?window.performance.now():Date.now();if(window.__forceDashboardUntil&&r<window.__forceDashboardUntil&&t==="#/recorrentes"){try{window.location.hash="#/dashboard"}catch{}return}n()}catch{n()}}),n();try{typeof history<"u"&&"scrollRestoration"in history&&(history.scrollRestoration="manual")}catch{}window.addEventListener("beforeunload",PA),L.info("Aplicação bootstrapada com sucesso")}catch(n){L.error("Erro no bootstrap:",n)}}function kA(){console.log("🎨 Configurando toggle de tema...");const n=document.getElementById("theme-toggle-btn");if(!n){ia();return}if(window.__themeToggleWired){console.log("⏭️ Toggle de tema já configurado");return}window.__themeToggleWired=!0,n.addEventListener("click",()=>{console.log("🎨 Toggle de tema clicado"),DA()}),ia(),console.log("✅ Toggle de tema configurado")}function DA(){try{const n=localStorage.getItem("theme")||"light",e=n==="light"?"dark":"light";console.log("🎨 Alternando tema:",{de:n,para:e}),localStorage.setItem("theme",e),Np(e),R.emit("theme:changed",e),Vp(e),console.log("✅ Tema alterado para:",e)}catch(n){console.error("❌ Erro ao alternar tema:",n)}}function Np(n){try{const e=document.documentElement;n==="dark"?(e.classList.add("dark"),e.classList.remove("light")):(e.classList.add("light"),e.classList.remove("dark")),document.body.className=document.body.className.replace(/theme-\w+/g,"").trim(),document.body.classList.add(`theme-${n}`),console.log("✅ Tema aplicado:",n)}catch(e){console.error("❌ Erro ao aplicar tema:",e)}}function ia(){try{const n=localStorage.getItem("theme")||"light";Np(n),Vp(n),console.log("✅ Tema atual aplicado:",n)}catch(n){console.error("❌ Erro ao aplicar tema atual:",n)}}function Vp(n){try{const e=document.getElementById("theme-toggle-btn");if(!e)return;const t=e.querySelector(".theme-icon");t&&(t.textContent=n==="dark"?"☀️":"🌙",t.setAttribute("title",n==="dark"?"Mudar para modo claro":"Mudar para modo escuro"))}catch(e){console.error("❌ Erro ao atualizar ícone do tema:",e)}}function Op(){try{localStorage.getItem("compactMode")==="true"?(document.body.classList.add("compact-mode"),console.log("✅ Modo compacto aplicado")):(document.body.classList.remove("compact-mode"),console.log("✅ Modo normal aplicado"))}catch(n){console.error("❌ Erro ao aplicar modo compacto:",n)}}function zA(){try{const e=!(localStorage.getItem("compactMode")==="true");localStorage.setItem("compactMode",e.toString()),Op(),R.emit("compactMode:changed",e),console.log("✅ Modo compacto alterado para:",e)}catch(n){console.error("❌ Erro ao alternar modo compacto:",n)}}function WA(){return localStorage.getItem("theme")||"light"}function HA(){return localStorage.getItem("compactMode")==="true"}function NA(){try{ia(),Op(),console.log("✅ Configurações de tema aplicadas")}catch(n){console.error("❌ Erro ao aplicar configurações de tema:",n)}}const VA={};document.addEventListener("DOMContentLoaded",async()=>{try{L.info("DOM carregado, iniciando aplicação...");try{const n=document.getElementById("voice-modal");n&&(n.style.display="none",n.style.pointerEvents="none",n.style.background="rgba(0, 0, 0, 0)",n.style.backdropFilter="blur(0px)")}catch{}try{document.body.classList.add("mobile-ui")}catch{}try{NA()}catch(n){L.warn("Falha ao aplicar configurações de tema iniciais:",n)}try{const n=new Set(["#/dashboard","#/transactions","#/categories","#/analytics","#/recorrentes","#/notifications","#/settings"]),t=(window.location.hash||"").split("?")[0];(!t||t==="#"||t==="#/"||!n.has(t)||t==="#/recorrentes")&&(window.location.hash="#/dashboard"),typeof window<"u"&&window.performance&&typeof window.performance.now=="function"?window.__forceDashboardUntil=window.performance.now()+2500:window.__forceDashboardUntil=Date.now()+2500}catch{}try{const{setupLoginButton:n,checkAuthState:e}=await j(async()=>{const{setupLoginButton:t,checkAuthState:r}=await import("./index-CC7p0iPh.js");return{setupLoginButton:t,checkAuthState:r}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));n(),await e()}catch(n){L.warn("Falha ao configurar login/estado de auth:",n)}await CA();try{kA()}catch(n){L.warn("Falha ao configurar toggle de tema pós-bootstrap:",n)}}catch(n){L.error("Erro fatal ao inicializar aplicação:",n),document.body.innerHTML=`
      <div style="padding: 2rem; text-align: center; color: #ef4444;">
        <h1>Erro ao carregar aplicação</h1>
        <p>${n.message}</p>
        <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
          Tentar novamente
        </button>
      </div>
    `}});VA&&"serviceWorker"in navigator&&window.addEventListener("load",async()=>{try{let n=function(){try{j(async()=>{const{Snackbar:i}=await import("./Snackbar-C1E5NQ3k.js");return{Snackbar:i}},__vite__mapDeps([11,12])).then(({Snackbar:i})=>{const s={label:"Atualizar",onClick:()=>{if(e&&e.waiting)try{try{i.show("Aplicando atualização…","info",3e3)}catch{}const a=()=>{try{window.location.reload()}catch{}};navigator.serviceWorker.addEventListener("controllerchange",a,{once:!0}),e.waiting.postMessage({type:"SKIP_WAITING"}),setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",a)}catch{}try{window.location.reload()}catch{}},2e3)}catch{setTimeout(()=>window.location.reload(),300)}}};i.show("Nova versão disponível","info",6e3,s)}).catch(()=>{confirm("Nova versão disponível. Atualizar agora?")&&(e&&e.waiting&&e.waiting.postMessage({type:"SKIP_WAITING"}),setTimeout(()=>window.location.reload(),300))})}catch{}};const e=await navigator.serviceWorker.register("/service-worker.js");L.info("Service Worker registrado:",e.scope);const t=()=>{try{if(document.getElementById("update-banner"))return;const i=document.createElement("div");i.id="update-banner",i.style.position="fixed",i.style.bottom="calc(env(safe-area-inset-bottom, 0px) + 12px)",i.style.left="12px",i.style.right="12px",i.style.zIndex="10050",i.style.padding="10px 12px",i.style.borderRadius="10px",i.style.boxShadow="0 6px 24px rgba(0,0,0,0.2)",i.style.display="flex",i.style.gap="10px",i.style.alignItems="center",i.style.justifyContent="space-between",i.style.background="var(--card-bg, #111827)",i.style.color="var(--card-fg, #fff)",i.style.pointerEvents="auto",i.setAttribute("role","status"),i.innerHTML=`
            <span style="font-size: 0.9rem;">Nova versão disponível</span>
            <div style="display:flex; gap:8px;">
              <button id="update-apply-btn" class="u-btn u-btn--primary" style="padding:6px 10px;">Atualizar</button>
              <button id="update-settings-btn" class="u-btn u-btn--outline" style="padding:6px 10px;">Detalhes</button>
            </div>
          `,document.body.appendChild(i);try{setTimeout(()=>{const c=document.getElementById("update-banner");c&&c.remove()},9e4)}catch{}const s=document.getElementById("update-apply-btn"),a=document.getElementById("update-settings-btn");s?.addEventListener("click",async()=>{try{try{const l=document.getElementById("update-banner");l&&l.remove()}catch{}if(e&&e.waiting){const l=()=>{try{window.location.reload()}catch{}};navigator.serviceWorker.addEventListener("controllerchange",l,{once:!0}),e.waiting.postMessage({type:"SKIP_WAITING"}),setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",l)}catch{}try{window.location.reload()}catch{}},2e3);return}try{await e?.update()}catch{}const c=await navigator.serviceWorker.getRegistration().catch(()=>null);if(c&&c.waiting){const l=()=>{try{window.location.reload()}catch{}};navigator.serviceWorker.addEventListener("controllerchange",l,{once:!0}),c.waiting.postMessage({type:"SKIP_WAITING"}),setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",l)}catch{}try{window.location.reload()}catch{}},2e3);return}window.location.reload()}catch{}}),a?.addEventListener("click",()=>{try{window.location.hash="#/settings?section=about"}catch{}try{const c=document.getElementById("update-banner");c&&c.remove()}catch{}}),window.__updateBannerDelegated||(window.__updateBannerDelegated=!0,document.addEventListener("click",async c=>{try{const l=c.target;if(!l)return;const d=l.closest&&l.closest("#update-apply-btn"),p=l.closest&&l.closest("#update-settings-btn");if(!d&&!p)return;if(c.preventDefault(),d){try{const g=document.getElementById("update-banner");g&&g.remove()}catch{}try{if(e&&e.waiting){const y=()=>{try{window.location.reload()}catch{}};navigator.serviceWorker.addEventListener("controllerchange",y,{once:!0}),e.waiting.postMessage({type:"SKIP_WAITING"}),setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",y)}catch{}try{window.location.reload()}catch{}},2e3);return}try{await e?.update()}catch{}const g=await navigator.serviceWorker.getRegistration().catch(()=>null);if(g&&g.waiting){const y=()=>{try{window.location.reload()}catch{}};navigator.serviceWorker.addEventListener("controllerchange",y,{once:!0}),g.waiting.postMessage({type:"SKIP_WAITING"}),setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",y)}catch{}try{window.location.reload()}catch{}},2e3);return}window.location.reload()}catch{}}else if(p){try{window.location.hash="#/settings?section=about"}catch{}try{const g=document.getElementById("update-banner");g&&g.remove()}catch{}}}catch{}},!0),window.addEventListener("hashchange",()=>{try{const c=document.getElementById("update-banner");c&&c.remove()}catch{}}))}catch{}},r=()=>{try{const i=document.getElementById("update-banner");i&&i.remove()}catch{}};if(e.waiting){try{window.__updateAvailable=!0}catch{}try{R.emit("update:available",!0)}catch{}t(),n()}e.addEventListener("updatefound",()=>{const i=e.installing;i&&i.addEventListener("statechange",()=>{i.state==="installed"&&navigator.serviceWorker.controller&&n()})}),navigator.serviceWorker.addEventListener("message",i=>{if(i.data&&i.data.type==="UPDATE_AVAILABLE"){try{window.__updateAvailable=!0}catch{}try{R.emit("update:available",!0)}catch{}t(),n();const s=()=>{try{if(e&&e.waiting){const a=()=>{try{window.location.reload()}catch{}};navigator.serviceWorker.addEventListener("controllerchange",a,{once:!0}),e.waiting.postMessage({type:"SKIP_WAITING"}),setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",a)}catch{}try{window.location.reload()}catch{}},2e3)}}catch{}};try{document.visibilityState==="hidden"&&s()}catch{}try{const a=setTimeout(()=>{s()},6e4),c=()=>{try{clearTimeout(a)}catch{}};window.addEventListener("pointerdown",c,{once:!0,capture:!0}),window.addEventListener("keydown",c,{once:!0,capture:!0})}catch{}}if(i.data&&i.data.type==="READY")try{if(navigator.serviceWorker.controller){const s=new MessageChannel;navigator.serviceWorker.controller.postMessage({action:"clearCache"},[s.port2])}try{window.__updateAvailable=!1}catch{}try{R.emit("update:available",!1)}catch{}r();try{typeof window.updateSwStatus=="function"&&setTimeout(()=>window.updateSwStatus(),50)}catch{}}catch{}});try{const i=async()=>{try{await e.update()}catch{}};setInterval(i,18e5),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&i()})}catch{}}catch(n){L.error("Erro ao registrar Service Worker:",n)}});window.addEventListener("online",()=>{L.info("Aplicação online"),document.body.classList.remove("offline")});window.addEventListener("offline",()=>{L.info("Aplicação offline"),document.body.classList.add("offline")});sh();try{window.deferredPrompt=null,window.addEventListener("beforeinstallprompt",n=>{try{n.preventDefault()}catch{}try{window.deferredPrompt=n}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}}),window.addEventListener("appinstalled",()=>{try{window.deferredPrompt=null}catch{}try{window.Snackbar?.({message:"App instalado com sucesso",type:"success"})}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}}),typeof window.installApp!="function"&&(window.installApp=async function(){try{const n=window.deferredPrompt;if(!n)return window.Snackbar?.({message:"Instalação não disponível neste momento",type:"warning"}),!1;n.prompt();const e=await n.userChoice.catch(()=>({outcome:"dismissed"}));e&&e.outcome==="accepted"?window.Snackbar?.({message:"Instalação iniciada",type:"success"}):window.Snackbar?.({message:"Instalação cancelada",type:"info"});try{window.deferredPrompt=null}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}return e?.outcome==="accepted"}catch(n){return console.warn("installApp error:",n),window.Snackbar?.({message:"Falha ao solicitar instalação",type:"error"}),!1}})}catch{}const GA=Object.freeze(Object.defineProperty({__proto__:null,get analytics(){return ac},app:ri,auth:ir,db:ae},Symbol.toStringTag,{value:"Module"}));export{_A as A,kA as B,DA as C,Np as D,ia as E,Op as F,ft as G,zA as H,WA as I,HA as J,NA as K,OA as L,uh as M,LA as N,MA as O,kT as P,Yv as Q,FA as R,nA as S,UA as T,BA as U,$A as V,jA as W,GA as X,j as _,ae as a,Os as b,ni as c,Ze as d,R as e,$e as f,ah as g,ut as h,ch as i,ti as j,tc as k,ra as l,RT as m,Ms as n,xs as o,rh as p,Je as q,cA as r,bT as s,Ny as t,Ls as u,ir as v,CT as w,qA as x,mA as y,gA as z};
