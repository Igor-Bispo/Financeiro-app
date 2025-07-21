import{initializeApp as _}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";import{getAuth as J,setPersistence as W,browserLocalPersistence as K,signOut as Q,GoogleAuthProvider as Y,signInWithPopup as Z}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";import{getFirestore as ee,doc as C,getDocs as B,query as E,collection as x,where as b,onSnapshot as te,addDoc as R,serverTimestamp as S,updateDoc as M,deleteDoc as N}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const e of r.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&n(e)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const oe={apiKey:"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:"controle-financeiro-b98ec.firebaseapp.com",projectId:"controle-financeiro-b98ec",storageBucket:"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:"418109336597",appId:"1:418109336597:web:871b262a76e57455ebb21c",measurementId:"G-7RW2F269V6"},L=_(oe),u=J(L),p=ee(L);W(u,K);window.FirebaseApp=L;window.FirebaseAuth=u;window.FirebaseDB=p;console.log("Firebase initialized successfully");console.log("Auth:",u);console.log("DB:",p);window.appState={currentUser:null,transactions:[],categories:[],budgets:[],currentBudget:null};function k(a){const t=document.getElementById("login-page"),o=document.querySelector(".app-container");a?(t&&(t.style.display="flex",document.body.classList.add("login-open")),o&&(o.style.display="none")):(t&&(t.style.display="none",document.body.classList.remove("login-open")),o&&(o.style.display="block"))}async function w(){const a=document.querySelector(".nav-item.active")?.getAttribute("data-tab");if(a)switch(a){case"dashboard":await F(),await y(),await T(),I();break;case"transactions":await F(),q();break;case"categories":await y(),V();break;case"settings":await T(),G();break}}async function P(a){try{const t=u.currentUser;if(!t)throw new Error("Usuário não autenticado");const o=window.appState.currentBudget?.id;if(!o)throw new Error("Nenhum orçamento selecionado");return(await R(x(p,"transactions"),{...a,userId:t.uid,budgetId:o,createdAt:S()})).id}catch(t){throw console.error("Erro ao adicionar transação:",t),t}}async function ae(a,t){try{if(!u.currentUser)throw new Error("Usuário não autenticado");await M(C(p,"transactions",a),{...t,updatedAt:S()})}catch(o){throw console.error("Erro ao atualizar transação:",o),o}}async function re(a){try{if(!u.currentUser)throw new Error("Usuário não autenticado");await N(C(p,"transactions",a))}catch(t){throw console.error("Erro ao excluir transação:",t),t}}async function F(){try{console.log("Loading transactions for user:",window.appState.currentUser.uid),console.log("Current budget:",window.appState.currentBudget?.id);const a=E(x(p,"transactions"),b("userId","==",window.appState.currentUser.uid),b("budgetId","==",window.appState.currentBudget?.id)),t=await B(a);window.appState.transactions=t.docs.map(o=>({id:o.id,...o.data()})),console.log("Transactions loaded successfully:",window.appState.transactions.length)}catch(a){console.error("Erro ao carregar transações:",a)}}async function U(a){try{const t=u.currentUser;if(!t)throw new Error("Usuário não autenticado");const o=await R(x(p,"categories"),{...a,userId:t.uid,createdAt:S()});return console.log("Categoria adicionada com ID:",o.id),w(),o.id}catch(t){throw console.error("Erro ao adicionar categoria:",t),t}}async function se(a,t){try{if(!u.currentUser)throw new Error("Usuário não autenticado");await M(C(p,"categories",a),{...t,updatedAt:S()}),console.log("Categoria atualizada:",a),w()}catch(o){throw console.error("Erro ao atualizar categoria:",o),o}}async function ne(a){try{if(!u.currentUser)throw new Error("Usuário não autenticado");await N(C(p,"categories",a)),console.log("Categoria excluída:",a),w()}catch(t){throw console.error("Erro ao excluir categoria:",t),t}}async function y(){try{console.log("Loading categories for user:",window.appState.currentUser.uid),console.log("Current budget:",window.appState.currentBudget?.id);const a=E(x(p,"categories"),b("userId","==",window.appState.currentUser.uid),b("budgetId","==",window.appState.currentBudget?.id)),t=await B(a);window.appState.categories=t.docs.map(o=>({id:o.id,...o.data()})),console.log("Categories loaded successfully:",window.appState.categories.length)}catch(a){console.error("Erro ao carregar categorias:",a)}}async function O(a){try{const t=u.currentUser;if(!t)throw new Error("Usuário não autenticado");const o=await R(x(p,"budgets"),{...a,userId:t.uid,createdAt:S()});return console.log("Orçamento adicionado com ID:",o.id),w(),o.id}catch(t){throw console.error("Erro ao adicionar orçamento:",t),t}}async function T(){try{console.log("Loading budgets for user:",window.appState.currentUser.uid);const a=E(x(p,"budgets"),b("userId","==",window.appState.currentUser.uid)),t=await B(a);window.appState.budgets=t.docs.map(o=>({id:o.id,...o.data()})),console.log("Budgets loaded successfully:",window.appState.budgets.length)}catch(a){console.error("Erro ao carregar orçamentos:",a)}}function z(a){let t=document.getElementById("page-subtitle");if(!t){t=document.createElement("div"),t.id="page-subtitle",t.className="text-xs md:text-base font-semibold text-gray-500 mb-2 md:mb-4";const o=document.querySelector(".app-header");o&&o.parentNode&&o.insertAdjacentElement("afterend",t)}t.textContent=a}function I(){const a=document.getElementById("app-content");if(!a)return;z("Dashboard");const t=window.appState.transactions.filter(e=>e.tipo==="receita").reduce((e,i)=>e+parseFloat(i.valor),0),o=window.appState.transactions.filter(e=>e.tipo==="despesa").reduce((e,i)=>e+parseFloat(i.valor),0),n=t-o,r=window.appState.categories.reduce((e,i)=>e+parseFloat(i.limite||0),0)-o;a.innerHTML=`
    <div class="grid gap-4 md:gap-6">
      <!-- Cards de Resumo -->
      <div class="grid grid-cols-4 gap-1 md:gap-4">
        <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Receitas</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${t.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Despesas</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${o.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Saldo</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${n.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Orçado</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${r.toFixed(2)}</p>
        </div>
      </div>
      <!-- Categorias com Progresso -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Categorias</h3>
        <div class="space-y-2 md:space-y-4">
          ${window.appState.categories.map(e=>{const c=window.appState.transactions.filter($=>$.categoriaId===e.id&&$.tipo==="despesa").reduce(($,H)=>$+parseFloat(H.valor),0),d=parseFloat(e.limite||0),l=d>0?c/d*100:0,f=d-c;return`
              <div class="border rounded-lg p-2 md:p-4">
                <div class="flex justify-between items-center mb-1 md:mb-2">
                  <div class="flex items-center space-x-2 md:space-x-3">
                    <div class="w-4 h-4 rounded-full" style="background-color: ${e.cor||"#4F46E5"}"></div>
                    <span class="font-semibold text-xs md:text-base">${e.nome}</span>
                  </div>
                  <div class="text-right">
                    <p class="text-xs md:text-sm text-gray-600">R$ ${c.toFixed(2)} / R$ ${d.toFixed(2)}</p>
                    <p class="text-xs md:text-sm ${f>=0?"text-green-600":"text-red-600"}">
                      Saldo: R$ ${f.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-1 md:mb-2">
                  <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${l>100?"bg-red-500":l>80?"bg-yellow-500":"bg-green-500"}" style="width: ${Math.min(l,100)}%"></div>
                </div>
                <div class="flex flex-wrap justify-end gap-1 md:space-x-2">
                  <button onclick="editCategory('${e.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Editar</button>
                  <button onclick="deleteCategory('${e.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Excluir</button>
                  <button onclick="showCategoryHistory('${e.id}')" class="text-gray-600 hover:text-gray-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Histórico</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
      <!-- Transações Recentes -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold">Transações Recentes</h3>
          <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
            + Nova Transação
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${window.appState.transactions.slice(0,10).map(e=>{const i=window.appState.categories.find(c=>c.id===e.categoriaId);return`
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 gap-1 md:gap-0">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base">${e.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500">${i?.nome||"Sem categoria"} • ${e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString():""}</p>
                </div>
                <div class="flex items-center space-x-1 md:space-x-2">
                  <span class="font-bold text-xs md:text-base ${e.tipo==="receita"?"text-green-600":"text-red-600"}">
                    ${e.tipo==="receita"?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
                  </span>
                  <button onclick="editTransaction('${e.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base">✏️</button>
                  <button onclick="deleteTransaction('${e.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base">🗑️</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `}function q(){const a=document.getElementById("app-content");z("Transações"),a.innerHTML=`
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="text-base md:text-2xl font-bold">Todas as Transações</h2>
        <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Transação</span>
          <button onclick="startVoiceRecognition('transaction')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="bg-white rounded-xl shadow-lg">
        ${window.appState.transactions.length===0?`
          <div class="p-4 md:p-8 text-center text-gray-500">
            <p class="text-base md:text-lg">Nenhuma transação encontrada</p>
            <p class="text-xs md:text-sm">Adicione sua primeira transação!</p>
          </div>
        `:window.appState.transactions.map(t=>{const o=window.appState.categories.find(n=>n.id===t.categoriaId);return`
            <div class="flex flex-wrap justify-between items-center p-2 md:p-4 border-b last:border-b-0 hover:bg-gray-50 gap-1 md:gap-0">
              <div class="flex-1 min-w-[120px]">
                <p class="font-medium text-xs md:text-lg">${t.descricao}</p>
                <p class="text-xs md:text-sm text-gray-500">${o?.nome||"Sem categoria"} • ${t.createdAt&&t.createdAt.toDate?t.createdAt.toDate().toLocaleDateString():""}</p>
              </div>
              <div class="flex items-center space-x-1 md:space-x-3">
                <span class="font-bold text-xs md:text-lg ${t.tipo==="receita"?"text-green-600":"text-red-600"}">
                  ${t.tipo==="receita"?"+":"-"}R$ ${parseFloat(t.valor).toFixed(2)}
                </span>
                <button onclick="editTransaction('${t.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-base">Editar</button>
                <button onclick="deleteTransaction('${t.id}')" class="bg-red-100 text-red-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-red-200 text-xs md:text-base">Excluir</button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}function V(){const a=document.getElementById("app-content");z("Categorias"),a.innerHTML=`
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="text-base md:text-2xl font-bold">Categorias</h2>
        <button onclick="showAddCategoryModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Categoria</span>
          <button onclick="startVoiceRecognition('category')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        ${window.appState.categories.map(t=>{const n=window.appState.transactions.filter(i=>i.categoriaId===t.id&&i.tipo==="despesa").reduce((i,c)=>i+parseFloat(c.valor),0),s=parseFloat(t.limite||0),r=s>0?n/s*100:0,e=s-n;return`
            <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
              <div class="flex items-center justify-between mb-2 md:mb-4">
                <div class="flex items-center space-x-2 md:space-x-3">
                  <div class="w-6 h-6 rounded-full" style="background-color: ${t.cor||"#4F46E5"}"></div>
                  <span class="font-bold text-xs md:text-lg">${t.nome}</span>
                </div>
                <div class="text-right">
                  <p class="text-xs md:text-sm text-gray-600">Limite: R$ ${s.toFixed(2)}</p>
                  <p class="text-xs md:text-sm ${e>=0?"text-green-600":"text-red-600"}">
                    Saldo: R$ ${e.toFixed(2)}
                  </p>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-2 md:mb-4">
                <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${r>100?"bg-red-500":r>80?"bg-yellow-500":"bg-green-500"}" style="width: ${Math.min(r,100)}%"></div>
              </div>
              <div class="flex flex-wrap justify-between text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                <span>Gasto: R$ ${n.toFixed(2)}</span>
                <span>${r.toFixed(1)}% usado</span>
              </div>
              <div class="flex flex-wrap justify-end gap-1 md:space-x-2">
                <button onclick="editCategory('${t.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-base">Editar</button>
                <button onclick="deleteCategory('${t.id}')" class="bg-red-100 text-red-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-red-200 text-xs md:text-base">Excluir</button>
                <button onclick="showCategoryHistory('${t.id}')" class="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-200 text-xs md:text-base">Histórico</button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}let v=null;window.addEventListener("beforeinstallprompt",a=>{a.preventDefault(),v=a,document.querySelector('.nav-item.active[data-tab="settings"]')&&A(!0)});function A(a){const t=document.getElementById("install-app-btn");t&&(t.style.display=a?"block":"none")}function G(){const a=document.getElementById("app-content");z("Configurações"),a.innerHTML=`
    <div class="space-y-2 md:space-y-8">
      <!-- Botão de instalar aplicativo -->
      <button id="install-app-btn" style="display:none" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold mb-4">📱 Baixar aplicativo</button>
      
      <!-- Guia do Usuário -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">📖 Guia do Usuário</h3>
        <p class="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Baixe o manual completo com todas as funcionalidades do aplicativo</p>
        <button onclick="generateUserGuide()" class="w-full bg-purple-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-purple-600 text-xs md:text-base">
          📄 Baixar Guia Completo (PDF)
        </button>
      </div>
      
      <!-- Perfil do Usuário -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Perfil</h3>
        <div class="space-y-2 md:space-y-4">
          <div>
            <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-gray-900 font-medium text-xs md:text-base">${window.appState.currentUser?.email||"N/A"}</p>
          </div>
          <button onclick="logout()" class="bg-red-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-red-600 text-xs md:text-base">
            Sair da Conta
          </button>
        </div>
      </div>
      
      <!-- Orçamentos -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold">Orçamentos</h3>
          <div class="flex gap-1 md:gap-2">
            <button onclick="showAddBudgetModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
              + Novo Orçamento
            </button>
            <button onclick="selectSharedBudget()" class="bg-purple-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-purple-600 text-xs md:text-base">
              Entrar em Orçamento
            </button>
          </div>
        </div>
        <div class="space-y-2 md:space-y-4">
          ${window.appState.budgets.map(o=>`
            <div class="border rounded-lg p-2 md:p-4 flex flex-wrap justify-between items-center">
              <div>
                <p class="font-medium text-xs md:text-base">${o.nome}</p>
                <p class="text-xs md:text-sm text-gray-500">ID: <span class='select-all'>${o.id}</span></p>
              </div>
              <div class="flex gap-1 md:space-x-2">
                <button onclick="copyBudgetId('${o.id}')" class="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-200 text-xs md:text-sm" title="Copiar ID do orçamento">
                  📋 Copiar ID
                </button>
                <button onclick="selectBudget('${o.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-sm">
                  Selecionar
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
      
      <!-- Exportar e Backup -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Exportar e Backup</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <button onclick="exportToExcel()" class="bg-green-500 text-white p-2 md:p-4 rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📊</span>
            <span>Exportar Excel</span>
          </button>
          <button onclick="exportToPDF()" class="bg-red-500 text-white p-2 md:p-4 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📄</span>
            <span>Exportar PDF</span>
          </button>
          <button onclick="downloadBackup()" class="bg-purple-500 text-white p-2 md:p-4 rounded-lg hover:bg-purple-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>💾</span>
            <span>Backup Completo</span>
          </button>
          <button onclick="importBackup()" class="bg-orange-500 text-white p-2 md:p-4 rounded-lg hover:bg-orange-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📥</span>
            <span>Importar Backup</span>
          </button>
        </div>
      </div>
    </div>
  `,A(!!v);const t=document.getElementById("install-app-btn");t&&(t.onclick=async()=>{if(v){v.prompt();const{outcome:o}=await v.userChoice;o==="accepted"&&(t.textContent="Aplicativo instalado!",t.disabled=!0),v=null,A(!1)}})}function m(a){document.getElementById("app-content"),document.querySelectorAll(".nav-btn").forEach(o=>{o.classList.remove("active")});const t=document.querySelector(`.nav-btn[data-route='${a}']`);switch(t&&t.classList.add("active"),a){case"/dashboard":I();break;case"/transactions":q();break;case"/categories":y().then(V);break;case"/settings":T().then(G);break;default:I()}}window.showAddTransactionModal=function(){g("Adicionar Transação",`
    <form id="transaction-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <input type="text" id="transaction-descricao" required 
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Supermercado">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
        <input type="number" id="transaction-valor" required step="0.01" min="0"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="transaction-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select id="transaction-categoria" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          ${window.appState.categories.length>0?window.appState.categories.map(a=>`<option value="${a.id}">${a.nome}</option>`).join(""):'<option value="" disabled>Nenhuma categoria disponível</option>'}
        </select>
        ${window.appState.categories.length===0?'<p class="text-sm text-red-500 mt-1">Crie uma categoria primeiro</p>':""}
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Adicionar
        </button>
      </div>
    </form>
  `),document.getElementById("transaction-form").addEventListener("submit",async a=>{a.preventDefault();const t=document.getElementById("transaction-descricao").value,o=parseFloat(document.getElementById("transaction-valor").value),n=document.getElementById("transaction-tipo").value,s=document.getElementById("transaction-categoria").value;try{await P({descricao:t,valor:o,tipo:n,categoriaId:s}),await w(),closeModal(),alert("Transação adicionada com sucesso!")}catch(r){console.error("Erro ao adicionar transação:",r),alert("Erro ao adicionar transação: "+r.message)}})};window.showAddCategoryModal=function(){g("Adicionar Categoria",`
    <form id="category-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input type="text" id="category-nome" required 
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Alimentação">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="category-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
        <input type="number" id="category-limite" step="0.01" min="0"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
        <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
        <input type="color" id="category-cor" value="#4F46E5"
               class="w-full h-12 border border-gray-300 rounded-lg">
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Adicionar
        </button>
      </div>
    </form>
  `),document.getElementById("category-form").addEventListener("submit",async a=>{a.preventDefault();const t=document.getElementById("category-nome").value,o=document.getElementById("category-tipo").value,n=parseFloat(document.getElementById("category-limite").value)||0,s=document.getElementById("category-cor").value;try{await U({nome:t,tipo:o,limite:n,cor:s}),closeModal(),m("/categories"),alert("Categoria adicionada com sucesso!")}catch(r){console.error("Erro ao adicionar categoria:",r),alert("Erro ao adicionar categoria: "+r.message)}})};window.showAddBudgetModal=function(){g("Adicionar Orçamento",`
    <form id="budget-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input type="text" id="budget-nome" required 
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Orçamento Familiar">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea id="budget-descricao" rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descrição opcional do orçamento"></textarea>
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Adicionar
        </button>
      </div>
    </form>
  `),document.getElementById("budget-form").addEventListener("submit",async a=>{a.preventDefault();const t=document.getElementById("budget-nome").value,o=document.getElementById("budget-descricao").value;try{await O({nome:t,descricao:o}),closeModal(),m("/settings"),alert("Orçamento adicionado com sucesso!")}catch(n){console.error("Erro ao adicionar orçamento:",n),alert("Erro ao adicionar orçamento: "+n.message)}})};window.editTransaction=function(a){const t=window.appState.transactions.find(o=>o.id===a);if(!t){alert("Transação não encontrada");return}g("Editar Transação",`
    <form id="edit-transaction-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <input type="text" id="edit-transaction-descricao" required 
               value="${t.descricao}"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Supermercado">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
        <input type="number" id="edit-transaction-valor" required step="0.01" min="0"
               value="${t.valor}"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="edit-transaction-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="receita" ${t.tipo==="receita"?"selected":""}>Receita</option>
          <option value="despesa" ${t.tipo==="despesa"?"selected":""}>Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select id="edit-transaction-categoria" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          ${window.appState.categories.map(o=>`<option value="${o.id}" ${t.categoriaId===o.id?"selected":""}>${o.nome}</option>`).join("")}
        </select>
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Salvar
        </button>
      </div>
    </form>
  `),document.getElementById("edit-transaction-form").addEventListener("submit",async o=>{o.preventDefault();const n=document.getElementById("edit-transaction-descricao").value,s=parseFloat(document.getElementById("edit-transaction-valor").value),r=document.getElementById("edit-transaction-tipo").value,e=document.getElementById("edit-transaction-categoria").value;try{await ae(a,{descricao:n,valor:s,tipo:r,categoriaId:e}),closeModal(),m("/dashboard"),alert("Transação atualizada com sucesso!")}catch(i){console.error("Erro ao atualizar transação:",i),alert("Erro ao atualizar transação: "+i.message)}})};window.deleteTransaction=function(a){confirm("Tem certeza que deseja excluir esta transação?")&&re(a)};window.editCategory=function(a){const t=window.appState.categories.find(o=>o.id===a);if(!t){alert("Categoria não encontrada");return}g("Editar Categoria",`
    <form id="edit-category-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input type="text" id="edit-category-nome" required 
               value="${t.nome}"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Alimentação">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="edit-category-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="receita" ${t.tipo==="receita"?"selected":""}>Receita</option>
          <option value="despesa" ${t.tipo==="despesa"?"selected":""}>Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
        <input type="number" id="edit-category-limite" step="0.01" min="0"
               value="${t.limite||""}"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
        <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
        <input type="color" id="edit-category-cor" value="${t.cor||"#4F46E5"}"
               class="w-full h-12 border border-gray-300 rounded-lg">
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Salvar
        </button>
      </div>
    </form>
  `),document.getElementById("edit-category-form").addEventListener("submit",async o=>{o.preventDefault();const n=document.getElementById("edit-category-nome").value,s=document.getElementById("edit-category-tipo").value,r=parseFloat(document.getElementById("edit-category-limite").value)||0,e=document.getElementById("edit-category-cor").value;try{await se(a,{nome:n,tipo:s,limite:r,cor:e}),closeModal(),m("/categories"),alert("Categoria atualizada com sucesso!")}catch(i){console.error("Erro ao atualizar categoria:",i),alert("Erro ao atualizar categoria: "+i.message)}})};window.deleteCategory=function(a){confirm("Tem certeza que deseja excluir esta categoria?")&&ne(a)};window.showCategoryHistory=function(a){const t=window.appState.categories.find(e=>e.id===a);if(!t){alert("Categoria não encontrada");return}const o=window.appState.transactions.filter(e=>e.categoriaId===a).sort((e,i)=>new Date(i.createdAt?.toDate())-new Date(e.createdAt?.toDate())),n=o.filter(e=>e.tipo==="receita").reduce((e,i)=>e+parseFloat(i.valor),0),s=o.filter(e=>e.tipo==="despesa").reduce((e,i)=>e+parseFloat(i.valor),0),r=n-s;g(`Histórico - ${t.nome}`,`
    <div class="space-y-6">
      <!-- Resumo -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="font-semibold text-lg mb-3">Resumo</h3>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-sm text-gray-600">Receitas</p>
            <p class="text-lg font-bold text-green-600">R$ ${n.toFixed(2)}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Despesas</p>
            <p class="text-lg font-bold text-red-600">R$ ${s.toFixed(2)}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Saldo</p>
            <p class="text-lg font-bold ${r>=0?"text-green-600":"text-red-600"}">R$ ${r.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <!-- Lista de Transações -->
      <div>
        <h3 class="font-semibold text-lg mb-3">Transações (${o.length})</h3>
        ${o.length===0?`
          <p class="text-gray-500 text-center py-4">Nenhuma transação encontrada nesta categoria</p>
        `:`
          <div class="space-y-2 max-h-64 overflow-y-auto">
            ${o.map(e=>`
              <div class="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p class="font-medium">${e.descricao}</p>
                  <p class="text-sm text-gray-500">${new Date(e.createdAt?.toDate()).toLocaleDateString()}</p>
                </div>
                <div class="text-right">
                  <span class="font-bold ${e.tipo==="receita"?"text-green-600":"text-red-600"}">
                    ${e.tipo==="receita"?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
                  </span>
                  <p class="text-xs text-gray-500">${e.tipo}</p>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>
      
      <div class="flex justify-end">
        <button onclick="closeModal()" 
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Fechar
        </button>
      </div>
    </div>
  `)};window.copyBudgetId=function(a){navigator.clipboard.writeText(a),alert("ID copiado para a área de transferência!")};window.selectBudget=function(a){window.appState.currentBudget=window.appState.budgets.find(t=>t.id===a),F(),y(),m("/dashboard")};window.exportToExcel=function(){const a=XLSX.utils.book_new(),t=window.appState.transactions.map(s=>({Descrição:s.descricao,Valor:s.valor,Tipo:s.tipo,Categoria:window.appState.categories.find(r=>r.id===s.categoriaId)?.nome||"",Data:s.createdAt&&s.createdAt.toDate?s.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(a,XLSX.utils.json_to_sheet(t),"Transações");const o=window.appState.categories.map(s=>({Nome:s.nome,Tipo:s.tipo,Limite:s.limite,Cor:s.cor}));XLSX.utils.book_append_sheet(a,XLSX.utils.json_to_sheet(o),"Categorias");const n=window.appState.budgets.map(s=>({Nome:s.nome,Descrição:s.descricao,ID:s.id}));XLSX.utils.book_append_sheet(a,XLSX.utils.json_to_sheet(n),"Orçamentos"),XLSX.writeFile(a,"financeiro-dados.xlsx")};window.exportToPDF=function(){const{jsPDF:a}=window.jspdf,t=new a;let o=10;t.setFontSize(16),t.text("Resumo Financeiro",10,o),o+=10,t.setFontSize(12),t.text("Transações:",10,o),o+=8,window.appState.transactions.slice(0,20).forEach(n=>{t.text(`- ${n.descricao} | R$ ${n.valor} | ${n.tipo} | ${window.appState.categories.find(s=>s.id===n.categoriaId)?.nome||""}`,12,o),o+=7,o>270&&(t.addPage(),o=10)}),o+=5,t.text("Categorias:",10,o),o+=8,window.appState.categories.forEach(n=>{t.text(`- ${n.nome} | ${n.tipo} | Limite: R$ ${n.limite}`,12,o),o+=7,o>270&&(t.addPage(),o=10)}),o+=5,t.text("Orçamentos:",10,o),o+=8,window.appState.budgets.forEach(n=>{t.text(`- ${n.nome} | ID: ${n.id}`,12,o),o+=7,o>270&&(t.addPage(),o=10)}),t.save("financeiro-resumo.pdf")};window.downloadBackup=function(){const a={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets},t=new Blob([JSON.stringify(a,null,2)],{type:"application/json"}),o=URL.createObjectURL(t),n=document.createElement("a");n.href=o,n.download="financeiro-backup.json",document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(o)};window.importBackup=function(){const a=document.createElement("input");a.type="file",a.accept="application/json",a.onchange=async t=>{const o=t.target.files[0];if(!o)return;const n=await o.text();try{const s=JSON.parse(n);s.transactions&&s.categories&&s.budgets?alert("Importação de backup só está disponível para leitura neste protótipo."):alert("Arquivo de backup inválido.")}catch(s){alert("Erro ao importar backup: "+s.message)}},a.click()};window.startVoiceRecognition=function(a){if(!("webkitSpeechRecognition"in window)&&!("SpeechRecognition"in window)){alert("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.");return}const t=window.SpeechRecognition||window.webkitSpeechRecognition,o=new t;o.lang="pt-BR",o.continuous=!1,o.interimResults=!1,o.maxAlternatives=1,g("Reconhecimento de Voz",`
    <div class="text-center space-y-4">
      <div class="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
      <p class="text-lg font-semibold">Fale agora...</p>
      <p class="text-sm text-gray-600" id="voice-instructions">
        ${a==="transaction"?'Exemplo: "Supermercado 150 despesa alimentação"':'Exemplo: "Alimentação despesa 500"'}
      </p>
      <div id="voice-status" class="text-sm text-blue-600">Aguardando comando...</div>
      <div class="flex justify-center space-x-3">
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Cancelar
        </button>
      </div>
    </div>
  `),o.onstart=function(){document.getElementById("voice-status").textContent="Ouvindo...",document.getElementById("voice-status").className="text-sm text-green-600"},o.onresult=function(n){const s=n.results[0][0].transcript.toLowerCase();document.getElementById("voice-status").textContent=`Reconhecido: "${s}"`,document.getElementById("voice-status").className="text-sm text-blue-600",ie(s,a)},o.onerror=function(n){console.error("Erro no reconhecimento de voz:",n.error),document.getElementById("voice-status").textContent=`Erro: ${n.error}`,document.getElementById("voice-status").className="text-sm text-red-600"},o.onend=function(){setTimeout(()=>{closeModal()},2e3)},o.start()};async function ie(a,t){try{t==="transaction"?await de(a):t==="category"&&await ce(a)}catch(o){console.error("Erro ao processar comando de voz:",o),alert("Erro ao processar comando de voz: "+o.message)}}function j(a){const t={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,sem:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3};return a?(a=a.toLowerCase().replace(/\./g,""),t[a]!==void 0?t[a]:a.includes(" e ")?a.split(" e ").map(j).reduce((o,n)=>o+n,0):NaN):NaN}async function de(a){const t=a.split(" ");if(t.length<4){alert('Comando inválido. Use: "descrição valor tipo categoria"');return}let o=t.findIndex(d=>!isNaN(parseFloat(d))),n=NaN;if(o!==-1)n=parseFloat(t[o]);else for(let d=0;d<t.length;d++){const l=j(t[d]);if(!isNaN(l)&&l>0){n=l,o=d;break}}if(isNaN(n)){alert('Valor não encontrado no comando (diga um número, ex: "cem", "duzentos", "mil" ou "100")');return}const s=t.findIndex(d=>["receita","despesa"].includes(d));if(s===-1){alert("Tipo não encontrado (receita ou despesa)");return}const r=t[s],e=t[t.length-1],i=t.slice(0,o).join(" "),c=window.appState.categories.find(d=>d.nome.toLowerCase().includes(e)||e.includes(d.nome.toLowerCase()));if(!c){alert(`Categoria "${e}" não encontrada. Crie a categoria primeiro.`);return}await P({descricao:i,valor:n,tipo:r,categoriaId:c.id}),await w(),alert(`Transação criada: ${i} - R$ ${n.toFixed(2)} - ${r} - ${c.nome}`),m("/dashboard")}async function ce(a){const t=a.split(" ");if(t.length<3){alert('Comando inválido. Use: "nome tipo limite"');return}const o=t.findIndex(d=>["receita","despesa"].includes(d));if(o===-1){alert("Tipo não encontrado (receita ou despesa)");return}const n=t[o];let s=t.findIndex(d=>!isNaN(parseFloat(d))),r=NaN;if(s!==-1)r=parseFloat(t[s]);else for(let d=0;d<t.length;d++){const l=j(t[d]);if(!isNaN(l)&&l>0){r=l,s=d;break}}if(isNaN(r)){alert('Limite não encontrado (diga um número, ex: "cem", "duzentos", "mil" ou "100")');return}const e=t.slice(0,o).join(" ");if(!e){alert("Nome da categoria não encontrado");return}const i=["#4F46E5","#EF4444","#10B981","#F59E0B","#8B5CF6","#EC4899","#06B6D4","#84CC16"],c=i[Math.floor(Math.random()*i.length)];await U({nome:e,tipo:n,limite:r,cor:c}),alert(`Categoria criada: ${e} - ${n} - R$ ${r.toFixed(2)}`),m("/categories")}function g(a,t){const o=document.getElementById("app-modal");o&&o.remove();const n=document.createElement("div");return n.id="app-modal",n.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",n.innerHTML=`
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">${a}</h2>
          <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>
        ${t}
      </div>
    </div>
  `,document.body.appendChild(n),n.addEventListener("click",s=>{s.target===n&&closeModal()}),n}window.closeModal=function(){const a=document.getElementById("app-modal");a&&a.remove()};window.logout=async()=>{try{await Q(u),console.log("Logout realizado com sucesso")}catch(a){console.error("Erro no logout:",a)}};function le(){document.querySelectorAll(".nav-btn").forEach(a=>{a.addEventListener("click",t=>{t.preventDefault();const o=a.getAttribute("data-route");m(o)})})}function ue(){const a=document.getElementById("btn-entrar");a&&(a.onclick=function(){const t=new Y;Z(u,t).then(o=>{}).catch(o=>{console.error("Erro no login:",o),alert("Erro ao fazer login: "+o.message)})})}function h(a){let t=document.getElementById("loading-page");t||(t=document.createElement("div"),t.id="loading-page",t.className="fixed inset-0 flex items-center justify-center bg-white z-50",t.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div><span class="text-lg font-semibold text-gray-700">Carregando...</span></div>',document.body.appendChild(t)),t.style.display=a?"flex":"none"}u.onAuthStateChanged(async a=>{if(h(!0),console.log("Auth state changed:",a?"User logged in":"User logged out"),a){window.appState.currentUser=a;try{if(await T(),window.appState.budgets.length===0){const t=await O({nome:"Orçamento Principal",descricao:"Orçamento padrão criado automaticamente"});window.appState.currentBudget={id:t,nome:"Orçamento Principal"}}else window.appState.currentBudget=window.appState.budgets[0];X(),await y(),h(!1),k(!1),m("/dashboard")}catch(t){h(!1),alert("Erro ao carregar dados: "+t.message)}}else h(!1),k(!0)});document.addEventListener("DOMContentLoaded",()=>{ue(),k(!0),le();const a=document.getElementById("fab-add");a&&a.addEventListener("click",()=>{showAddTransactionModal()});const t=document.getElementById("voice-control");t&&t.addEventListener("click",()=>{g("Comando de Voz",`
        <div class='space-y-4 text-center'>
          <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
          <div class='flex flex-col gap-3'>
            <button onclick='window.startVoiceRecognition("transaction")' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
            <button onclick='window.startVoiceRecognition("category")' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
          </div>
          <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
        </div>
      `)})});window.selectSharedBudget=function(){g("Entrar em Orçamento Compartilhado",`
    <form id='shared-budget-form' class='space-y-4'>
      <div>
        <label class='block text-sm font-medium text-gray-700 mb-1'>Cole o ID do orçamento compartilhado</label>
        <input type='text' id='shared-budget-id' required class='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='ID do orçamento'>
      </div>
      <div class='flex justify-end space-x-3 pt-4'>
        <button type='button' onclick='closeModal()' class='px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200'>Cancelar</button>
        <button type='submit' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Entrar</button>
      </div>
    </form>
  `),document.getElementById("shared-budget-form").addEventListener("submit",async a=>{a.preventDefault();const t=document.getElementById("shared-budget-id").value.trim();if(t)try{const o=C(window.FirebaseDB,"budgets",t),s=(await B(E(x(window.FirebaseDB,"budgets")))).docs.find(r=>r.id===t);if(!s){alert("Orçamento não encontrado!");return}window.appState.currentBudget={id:s.id,...s.data()},closeModal(),await F(),await y(),m("/dashboard"),alert("Você entrou no orçamento compartilhado!")}catch(o){alert("Erro ao entrar no orçamento: "+o.message)}})};let D=null;function X(){D&&D();const a=window.appState.currentUser?.uid,t=window.appState.currentBudget?.id;if(!a||!t)return;const o=E(x(p,"transactions"),b("userId","==",a),b("budgetId","==",t));D=te(o,n=>{window.appState.transactions=n.docs.map(r=>({id:r.id,...r.data()}));const s=document.querySelector(".nav-item.active")?.getAttribute("data-tab");["transactions","dashboard"].includes(s)&&(s==="transactions"&&q(),s==="dashboard"&&I())})}X();window.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("login-page");a&&(a.style.display="none"),h(!0)});window.generateUserGuide=function(){try{let o=function(i,c,d,l=170){const f=t.splitTextToSize(i,l);return d+f.length*8>270?(t.addPage(),20):(t.text(f,c,d),d+f.length*8+2)},n=function(i,c){return c>250&&(t.addPage(),c=20),t.setFontSize(16),t.setTextColor(79,70,229),t.text(i,20,c),c+12},s=function(i,c){return c>260&&(t.addPage(),c=20),t.setFontSize(12),t.setTextColor(79,70,229),t.text(i,20,c),c+8},r=function(i,c,d=25){return c>270&&(t.addPage(),c=20),t.setFontSize(11),t.setTextColor(0,0,0),t.text(i,d,c),c+8};const{jsPDF:a}=window.jspdf,t=new a;t.setFont("helvetica"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.setFontSize(24),t.text("Servo Tech Finanças",20,25),t.setFontSize(14),t.text("Guia Completo do Usuário",20,35);let e=50;t.setTextColor(0,0,0),e=n("🎯 Bem-vindo ao Servo Tech Finanças!",e),e=o("O Servo Tech Finanças é um aplicativo completo e intuitivo para controle financeiro pessoal. Desenvolvido com foco na praticidade e simplicidade, ele oferece todas as ferramentas necessárias para você gerenciar suas finanças de forma eficiente e organizada.",20,e),e=s("🌟 Principais Funcionalidades:",e),e=r("📊 Dashboard completo com visão geral das finanças",e),e=r("💰 Gestão completa de receitas e despesas",e),e=r("🏷️ Categorização inteligente com limites de gastos",e),e=r("🎤 Comandos de voz para adicionar transações rapidamente",e),e=r("📈 Controle de orçamentos com compartilhamento",e),e=r("💾 Backup e restauração de dados",e),e=r("📱 Instalação como aplicativo (PWA)",e),e=r("🌙 Modo escuro para conforto visual",e),e=r("📊 Exportação de relatórios em Excel, PDF e JSON",e),e=n("📊 Dashboard - Centro de Controle Financeiro",e),e=o("O Dashboard é o coração do aplicativo, oferecendo uma visão completa e em tempo real de suas finanças. Aqui você encontra todos os dados importantes organizados de forma clara e intuitiva.",20,e),e+=8,e=s("📈 Cards Principais:",e),e=r("🟢 Receitas: Soma total de todo dinheiro recebido no período",e),e=r("   Inclui salários, bônus, rendimentos extras, etc.",e,30),e=r("🔴 Despesas: Soma total de todos os gastos realizados",e),e=r("   Contas, compras, lazer, transporte, etc.",e,30),e=r("🔵 Saldo: Receitas - Despesas (dinheiro disponível)",e),e=r("   Indica se você está no azul ou no vermelho",e,30),e=r("🟡 Orçado: Limite das categorias - Despesas",e),e=r("   Mostra quanto ainda pode gastar dentro dos limites",e,30),e+=8,e=s("📊 Seção de Categorias:",e),e=r("Barras de progresso coloridas para cada categoria",e),e=r("Verde: Dentro do limite estabelecido",e,30),e=r("Amarelo: Próximo do limite (80% ou mais)",e,30),e=r("Vermelho: Acima do limite (gasto excessivo)",e,30),e=r("Porcentagem de uso visível em cada barra",e,30),e+=8,e=s("📝 Transações Recentes:",e),e=r("Lista das últimas 10 transações realizadas",e),e=r("Mostra: Data, Descrição, Valor, Categoria e Tipo",e,30),e=r("Atualização automática em tempo real",e,30),e=r("Acesso rápido para editar ou excluir",e,30),e+=8,e=n("💰 Transações - Gestão Completa de Receitas e Despesas",e),e=o("A aba Transações é onde você gerencia todas as suas movimentações financeiras. Aqui você pode adicionar, editar, excluir e visualizar todas as transações.",20,e),e+=8,e=s("📝 Como Adicionar uma Transação:",e),e=r("Método 1 - Botão Flutuante (FAB):",e),e=r("1. Toque no botão + (canto inferior direito)",e,30),e=r("2. Preencha os campos obrigatórios:",e,30),e=r('   • Descrição: Nome da transação (ex: "Supermercado")',e,35),e=r("   • Valor: Quantia em reais (ex: 150,50)",e,35),e=r("   • Tipo: Receita ou Despesa",e,35),e=r("   • Categoria: Selecione uma categoria existente",e,35),e=r('3. Toque em "Adicionar"',e,30),e+=8,e=r("Método 2 - Aba Transações:",e),e=r('1. Vá na aba "Transações" (navegação inferior)',e,30),e=r('2. Toque em "+ Nova Transação"',e,30),e=r("3. Preencha os campos e confirme",e,30),e+=8,e=s("✏️ Como Editar uma Transação:",e),e=r("1. Localize a transação na lista",e),e=r("2. Toque no ícone ✏️ (lápis) ao lado",e,30),e=r("3. Modifique os campos desejados",e,30),e=r('4. Toque em "Salvar"',e,30),e+=8,e=s("🗑️ Como Excluir uma Transação:",e),e=r("1. Localize a transação na lista",e),e=r("2. Toque no ícone 🗑️ (lixeira) ao lado",e,30),e=r("3. Confirme a exclusão",e,30),e+=8,e=s("📊 Visualização de Transações:",e),e=r("Lista completa de todas as transações",e),e=r("Ordenadas por data (mais recentes primeiro)",e,30),e=r("Filtros por tipo (Receita/Despesa)",e,30),e=r("Busca por descrição",e,30),e=r("Atualização automática em tempo real",e,30),e+=8,e=s("💡 Dicas Importantes:",e),e=r("Use comandos de voz para adicionar mais rapidamente",e),e=r("Mantenha descrições claras e específicas",e),e=r("Categorize corretamente para melhor controle",e),e=r("Revise transações regularmente",e),e+=8,t.setFontSize(16),t.setTextColor(79,70,229),t.text("🎤 Comandos de Voz - Revolução na Praticidade",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("O sistema de comandos de voz é uma das funcionalidades mais inovadoras do app.",20,e),e+=8,t.text("Permite adicionar transações e criar categorias sem precisar digitar,",20,e),e+=8,t.text("tornando o controle financeiro muito mais rápido e prático.",20,e),e+=12,t.text("🎯 Como Ativar o Comando de Voz:",20,e),e+=8,t.text("1. Toque no ícone do microfone no cabeçalho",25,e),e+=8,t.text('2. Aguarde a animação de "Ouvindo"',30,e),e+=8,t.text("3. Fale claramente o comando",30,e),e+=8,t.text("4. Aguarde a confirmação",30,e),e+=12,t.text("📝 Comando para Adicionar Transação:",20,e),e+=8,t.text('Formato: "descrição valor tipo categoria"',25,e),e+=8,t.text("Exemplos Práticos:",25,e),e+=8,t.text('• "supermercado cem despesa alimentação"',30,e),e+=8,t.text('• "salário mil quinhentos receita trabalho"',30,e),e+=8,t.text('• "padaria cinquenta despesa alimentação"',30,e),e+=8,t.text('• "uber trinta despesa transporte"',30,e),e+=8,t.text('• "bônus quinhentos receita trabalho"',30,e),e+=8,t.text('• "cinema oitenta despesa lazer"',30,e),e+=12,t.text("🏷️ Comando para Criar Categoria:",20,e),e+=8,t.text('Formato: "nome tipo limite"',25,e),e+=8,t.text("Exemplos Práticos:",25,e),e+=8,t.text('• "alimentação despesa cem"',30,e),e+=8,t.text('• "transporte despesa duzentos"',30,e),e+=8,t.text('• "lazer despesa cento cinquenta"',30,e),e+=8,t.text('• "trabalho receita zero"',30,e),e+=12,t.text("🔢 Valores por Extenso Suportados:",20,e),e+=8,t.text('Números: "zero", "um", "dois", "três", "quatro", "cinco"',25,e),e+=8,t.text('Dezenas: "dez", "vinte", "trinta", "quarenta", "cinquenta"',25,e),e+=8,t.text('Centenas: "cem", "duzentos", "trezentos", "quatrocentos"',25,e),e+=8,t.text('Milhares: "mil", "mil quinhentos", "dois mil"',25,e),e+=8,t.text('Compostos: "cento cinquenta", "mil duzentos"',25,e),e+=8,t.text('Sinônimos: "sem" = "cem" (para evitar confusão)',25,e),e+=12,t.text("💡 Dicas para Comandos de Voz:",20,e),e+=8,t.text("• Fale claramente e pausadamente",25,e),e+=8,t.text("• Use valores por extenso ao invés de números",25,e),e+=8,t.text("• Mantenha o microfone próximo",25,e),e+=8,t.text("• Evite ambientes muito barulhentos",25,e),e+=8,t.text("• Confirme sempre se o comando foi entendido",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("🏷️ Categorias - Organização Inteligente dos Gastos",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("As categorias são fundamentais para organizar e controlar seus gastos de forma eficiente.",20,e),e+=8,t.text("Elas permitem que você estabeleça limites de gastos e monitore o progresso em tempo real.",20,e),e+=12,t.text("📝 Como Criar uma Categoria:",20,e),e+=8,t.text("Método 1 - Interface:",25,e),e+=8,t.text('1. Vá na aba "Categorias" (navegação inferior)',30,e),e+=8,t.text('2. Toque em "+ Nova Categoria"',30,e),e+=8,t.text("3. Preencha os campos:",30,e),e+=8,t.text('   • Nome: Nome da categoria (ex: "Alimentação")',35,e),e+=8,t.text("   • Tipo: Receita ou Despesa",35,e),e+=8,t.text("   • Limite: Valor máximo mensal (opcional)",35,e),e+=8,t.text("   • Cor: Escolha uma cor para identificação",35,e),e+=8,t.text('4. Toque em "Criar"',30,e),e+=12,t.text("Método 2 - Comando de Voz:",25,e),e+=8,t.text("1. Ative o microfone",30,e),e+=8,t.text('2. Diga: "nome tipo limite"',30,e),e+=8,t.text('3. Exemplo: "alimentação despesa cem"',30,e),e+=12,t.text("📊 Sistema de Controle por Cores:",20,e),e+=8,t.text("🟢 Verde: Dentro do limite estabelecido",25,e),e+=8,t.text("   • Gasto abaixo de 80% do limite",30,e),e+=8,t.text("   • Situação financeira saudável",30,e),e+=8,t.text("🟡 Amarelo: Próximo do limite",25,e),e+=8,t.text("   • Gasto entre 80% e 100% do limite",30,e),e+=8,t.text("   • Atenção: Reduza gastos nesta categoria",30,e),e+=8,t.text("🔴 Vermelho: Acima do limite",25,e),e+=8,t.text("   • Gasto superior ao limite estabelecido",30,e),e+=8,t.text("   • Alerta: Necessário ajuste imediato",30,e),e+=12,t.text("📈 Categorias Recomendadas:",20,e),e+=8,t.text("Para Despesas:",25,e),e+=8,t.text("• Alimentação (supermercado, restaurantes)",30,e),e+=8,t.text("• Transporte (combustível, Uber, transporte público)",30,e),e+=8,t.text("• Moradia (aluguel, contas, manutenção)",30,e),e+=8,t.text("• Lazer (cinema, shows, viagens)",30,e),e+=8,t.text("• Saúde (médico, farmácia, plano de saúde)",30,e),e+=8,t.text("• Educação (cursos, livros, material escolar)",30,e),e+=8,t.text("Para Receitas:",25,e),e+=8,t.text("• Trabalho (salário, bônus, comissões)",30,e),e+=8,t.text("• Investimentos (rendimentos, dividendos)",30,e),e+=8,t.text("• Freelance (trabalhos extras)",30,e),e+=12,t.text("✏️ Gerenciando Categorias:",20,e),e+=8,t.text("• Editar: Toque no ícone ✏️ ao lado da categoria",25,e),e+=8,t.text("• Excluir: Toque no ícone 🗑️ ao lado da categoria",25,e),e+=8,t.text("• Visualizar transações: Toque na categoria",25,e),e+=8,t.text("• Ajustar limites: Edite conforme necessário",25,e),e+=12,t.text("💡 Dicas para Categorias Eficientes:",20,e),e+=8,t.text("• Crie categorias específicas e claras",25,e),e+=8,t.text("• Estabeleça limites realistas baseados na renda",25,e),e+=8,t.text("• Use cores diferentes para fácil identificação",25,e),e+=8,t.text("• Revise e ajuste limites mensalmente",25,e),e+=8,t.text("• Monitore as barras de progresso regularmente",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("⚙️ Configurações - Centro de Personalização",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("A aba Configurações é o centro de controle do aplicativo, onde você pode personalizar",20,e),e+=8,t.text("sua experiência, gerenciar dados e acessar funcionalidades avançadas.",20,e),e+=12,t.text("📖 Guia do Usuário:",20,e),e+=8,t.text("• Baixe este manual completo em PDF",25,e),e+=8,t.text("• Acesso offline ao guia de uso",25,e),e+=8,t.text("• Referência completa de todas as funcionalidades",25,e),e+=12,t.text("👤 Perfil do Usuário:",20,e),e+=8,t.text("• Visualizar email da conta Google",25,e),e+=8,t.text("• Fazer logout da aplicação",25,e),e+=8,t.text("• Gerenciar sessão de login",25,e),e+=12,t.text("💰 Sistema de Orçamentos:",20,e),e+=8,t.text("Criar Novo Orçamento:",25,e),e+=8,t.text("• Defina um nome para o orçamento",30,e),e+=8,t.text("• Estabeleça período de vigência",30,e),e+=8,t.text("• Configure categorias e limites",30,e),e+=8,t.text("Compartilhar Orçamento:",25,e),e+=8,t.text("• Gere um ID único do orçamento",30,e),e+=8,t.text("• Compartilhe com família ou amigos",30,e),e+=8,t.text("• Controle colaborativo de gastos",30,e),e+=8,t.text("Entrar em Orçamento Compartilhado:",25,e),e+=8,t.text("• Cole o ID do orçamento compartilhado",30,e),e+=8,t.text("• Acesse dados compartilhados",30,e),e+=8,t.text("• Contribua com transações",30,e),e+=12,t.text("📊 Exportação de Dados:",20,e),e+=8,t.text("Excel (.xlsx):",25,e),e+=8,t.text("• Formato ideal para análise em planilhas",30,e),e+=8,t.text("• Compatível com Microsoft Excel e Google Sheets",30,e),e+=8,t.text("• Inclui todas as transações e categorias",30,e),e+=8,t.text("PDF (.pdf):",25,e),e+=8,t.text("• Relatório formatado para impressão",30,e),e+=8,t.text("• Resumo financeiro completo",30,e),e+=8,t.text("• Gráficos e estatísticas",30,e),e+=8,t.text("JSON (.json):",25,e),e+=8,t.text("• Backup completo de todos os dados",30,e),e+=8,t.text("• Formato para restauração futura",30,e),e+=8,t.text("• Compatível com outros sistemas",30,e),e+=12,t.text("📱 Instalação como Aplicativo (PWA):",20,e),e+=8,t.text("• Baixe o app no seu celular",25,e),e+=8,t.text("• Acesso offline às funcionalidades",25,e),e+=8,t.text("• Experiência nativa de aplicativo",25,e),e+=8,t.text("• Notificações push (futuro)",25,e),e+=12,t.text("🌙 Modo Escuro:",20,e),e+=8,t.text("• Alternar entre tema claro e escuro",25,e),e+=8,t.text("• Reduz fadiga visual",25,e),e+=8,t.text("• Economiza bateria em telas OLED",25,e),e+=8,t.text("• Preferência salva automaticamente",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("💡 Dicas e Truques para Aproveitar Melhor",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("🚀 Dicas de Produtividade:",20,e),e+=8,t.text("• Use comandos de voz para adicionar transações rapidamente",25,e),e+=8,t.text("• Configure limites realistas nas categorias",25,e),e+=8,t.text("• Faça backup regular dos seus dados",25,e),e+=8,t.text("• Instale o app para acesso offline",25,e),e+=8,t.text("• Compartilhe orçamentos com família/amigos",25,e),e+=8,t.text('• Monitore o card "Orçado" para controle de gastos',25,e),e+=8,t.text("• Use cores diferentes para categorias",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("🔧 Solução de Problemas Comuns",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("❓ Comando de voz não funciona:",20,e),e+=8,t.text("• Verifique se o microfone está ativo",25,e),e+=8,t.text("• Fale claramente e pausadamente",25,e),e+=8,t.text('• Use valores por extenso: "cem" ao invés de "100"',25,e),e+=8,t.text("❓ Transação não aparece:",20,e),e+=8,t.text("• Aguarde alguns segundos (atualização automática)",25,e),e+=8,t.text("• Verifique se está na categoria correta",25,e),e+=8,t.text("❓ App não carrega:",20,e),e+=8,t.text("• Verifique sua conexão com a internet",25,e),e+=8,t.text("• Faça login novamente se necessário",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("🆘 Suporte e Contato",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("👨‍💻 Fundador: Igor Bispo",20,e),e+=8,t.text("📱 Versão do App: 1.0",20,e),e+=8,t.text("📅 Data do Guia: "+new Date().toLocaleDateString("pt-BR"),20,e),e+=8,t.text("🌐 URL: https://controle-financeiro-b98ec.web.app",20,e),e+=8,t.text("💡 Para dúvidas, consulte este guia ou entre em contato.",20,e),e+=15,t.setFillColor(79,70,229),t.rect(0,270,210,30,"F"),t.setTextColor(255,255,255),t.setFontSize(10),t.text("Servo Tech Finanças - Transformando sua vida financeira",20,280),t.text("© 2025 • Fundador: Igor Bispo • Versão 1.0",20,290),t.save("Servo-Tech-Financas-Guia-Usuario.pdf")}catch(a){console.error("Erro ao gerar PDF:",a),alert("Erro ao gerar PDF. Verifique se a biblioteca jsPDF está carregada.")}};
