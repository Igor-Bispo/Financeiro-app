import{m as $,e as v}from"./main-qpmFpkyH.js";class N{constructor(){this.isOpen=!1,this.currentNotification=null,this.autoCloseTimer=null,this.notificationQueue=[],this.isProcessing=!1,this.init()}init(){console.log("[NotificationModal] 🚀 Inicializando modal..."),this.createModalHTML(),console.log("[NotificationModal] ✅ Modal inicializado com sucesso")}createModalHTML(){console.log("[NotificationModal] 🏗️ Criando HTML do modal...");const o=document.getElementById("notification-modal");o&&(console.log("[NotificationModal] 🗑️ Removendo modal existente..."),o.remove()),document.body.insertAdjacentHTML("beforeend",`
      <div id="notification-modal" class="notification-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 10000; opacity: 0; visibility: hidden;">
        <div class="notification-modal-container">
          <div class="notification-modal-header">
            <div class="notification-modal-icon">
              <span id="notification-modal-icon">🔔</span>
            </div>
            <div class="notification-modal-title">
              <h3 id="notification-modal-title">Nova Notificação</h3>
              <p id="notification-modal-time" class="notification-modal-time"></p>
            </div>
            <button id="notification-modal-close" class="notification-modal-close" aria-label="Fechar">
              <span>×</span>
            </button>
          </div>
          
          <div class="notification-modal-body">
            <div id="notification-modal-content" class="notification-modal-content">
              <!-- Conteúdo da notificação será inserido aqui -->
            </div>
          </div>
          
          <div class="notification-modal-footer">
            <button id="notification-modal-mark-read" class="notification-modal-btn notification-modal-btn-secondary">
              ✅ Marcar como lida
            </button>
            <button id="notification-modal-view-all" class="notification-modal-btn notification-modal-btn-primary">
              📬 Ver todas as notificações
            </button>
          </div>
        </div>
      </div>
    `),console.log("[NotificationModal] ✅ HTML do modal inserido no DOM");const t=document.getElementById("notification-modal");console.log("[NotificationModal] 🔍 Modal inserido verificado:",!!t),t?(console.log("[NotificationModal] 🔍 Modal inserido com sucesso, vinculando eventos..."),this.bindEvents()):console.error("[NotificationModal] ❌ Modal não foi inserido no DOM!")}bindEvents(){console.log("[NotificationModal] 🔗 Vinculando eventos...");const o=document.getElementById("notification-modal"),e=document.getElementById("notification-modal-close"),t=document.getElementById("notification-modal-mark-read"),a=document.getElementById("notification-modal-view-all"),i=o;console.log("[NotificationModal] 🔍 Elementos encontrados:",{modal:!!o,closeBtn:!!e,markReadBtn:!!t,viewAllBtn:!!a}),e&&e.addEventListener("click",()=>{console.log("[NotificationModal] 🔒 Botão fechar clicado"),this.close()}),i&&i.addEventListener("click",l=>{l.target===i&&(console.log("[NotificationModal] 🔒 Overlay clicado"),this.close())}),t&&t.addEventListener("click",async()=>{console.log("[NotificationModal] ✅ Botão marcar como lida clicado"),this.currentNotification&&(await this.markAsRead(this.currentNotification.id),this.close())}),a&&a.addEventListener("click",()=>{console.log("[NotificationModal] 📬 Botão ver todas clicado"),this.close(),window.location.hash="#/notifications"}),document.addEventListener("keydown",l=>{l.key==="Escape"&&this.isOpen&&(console.log("[NotificationModal] 🔒 Tecla ESC pressionada"),this.close())}),console.log("[NotificationModal] ✅ Eventos vinculados com sucesso")}show(o){if(console.log("[NotificationModal] 🚀 show() chamado com notificação:",o),console.log("[NotificationModal] 🔍 Estado atual:",{isOpen:this.isOpen,hasAutoCloseTimer:!!this.autoCloseTimer,currentNotification:!!this.currentNotification,queueLength:this.notificationQueue.length,isProcessing:this.isProcessing}),!o){console.log("[NotificationModal] ❌ Notificação inválida, retornando");return}this.notificationQueue.push(o),console.log("[NotificationModal] 📋 Notificação adicionada à fila. Total na fila:",this.notificationQueue.length),this.isProcessing||this.processQueue()}async processQueue(){if(!(this.isProcessing||this.notificationQueue.length===0)){for(this.isProcessing=!0,console.log("[NotificationModal] 🔄 Processando fila de notificações...");this.notificationQueue.length>0;){const o=this.notificationQueue.shift();console.log("[NotificationModal] 📱 Processando notificação da fila:",o.id),await this.showNotification(o),this.notificationQueue.length>0&&(console.log("[NotificationModal] ⏳ Aguardando 3 segundos antes da próxima notificação..."),await new Promise(e=>setTimeout(e,3e3)))}this.isProcessing=!1,console.log("[NotificationModal] ✅ Fila de notificações processada")}}async showNotification(o){this.isOpen&&(console.log("[NotificationModal] 🔄 Fechando modal anterior..."),this.close(),await new Promise(t=>setTimeout(t,500))),this.currentNotification=o,this.isOpen=!0,console.log("[NotificationModal] 📝 Atualizando conteúdo do modal..."),this.updateModalContent(o);let e=document.getElementById("notification-modal");if(console.log("[NotificationModal] 🔍 Modal encontrado:",!!e),!e&&(console.log("[NotificationModal] 🔧 Modal não encontrado, recriando..."),this.createModalHTML(),e=document.getElementById("notification-modal"),console.log("[NotificationModal] 🔍 Modal após recriação:",!!e),!e)){console.error("[NotificationModal] ❌ Modal ainda não encontrado após recriação!");return}if(e){console.log("[NotificationModal] 📱 Mostrando modal..."),console.log("[NotificationModal] 🔍 Modal antes da modificação:",{display:window.getComputedStyle(e).display,opacity:window.getComputedStyle(e).opacity,visibility:window.getComputedStyle(e).visibility,zIndex:window.getComputedStyle(e).zIndex}),e.classList.remove("notification-modal-overlay"),e.removeAttribute("style"),e.style.cssText=`
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(0, 0, 0, 0.6) !important;
        backdrop-filter: blur(4px) !important;
        z-index: 10000 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 20px !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      `,e.setAttribute("style",e.style.cssText),e.classList.add("notification-modal-show"),console.log("[NotificationModal] 🎨 Estilos aplicados, verificando resultado..."),console.log("[NotificationModal] 🔍 Modal após aplicação de estilos:",{display:window.getComputedStyle(e).display,opacity:window.getComputedStyle(e).opacity,visibility:window.getComputedStyle(e).visibility,zIndex:window.getComputedStyle(e).zIndex,position:window.getComputedStyle(e).position}),console.log("[NotificationModal] 🎨 Estilos inline aplicados"),console.log("[NotificationModal] 📊 Modal computed styles:",{display:window.getComputedStyle(e).display,opacity:window.getComputedStyle(e).opacity,visibility:window.getComputedStyle(e).visibility,zIndex:window.getComputedStyle(e).zIndex,pointerEvents:window.getComputedStyle(e).pointerEvents}),console.log("[NotificationModal] 🔍 Modal element:",e),console.log("[NotificationModal] 🔍 Modal parent:",e.parentNode),console.log("[NotificationModal] 🔍 Modal in DOM:",document.contains(e));const t=e.querySelector(".notification-modal-container");if(t){const a=document.body.classList.contains("dark")||document.documentElement.classList.contains("dark")||window.matchMedia("(prefers-color-scheme: dark)").matches,i=a?"#1f2937":"white",l=a?"#f9fafb":"#111827",s=a?"#374151":"#e5e7eb";t.style.cssText=`
          background: ${i} !important;
          color: ${l} !important;
          border: 1px solid ${s} !important;
          border-radius: 16px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3) !important;
          max-width: 500px !important;
          width: 100% !important;
          max-height: 80vh !important;
          overflow: hidden !important;
          transform: scale(1) translateY(0) !important;
          opacity: 1 !important;
        `;const n=t.querySelector("#notification-modal-title"),c=t.querySelector("#notification-modal-time"),m=t.querySelector("#notification-modal-message"),r=t.querySelector("#notification-modal-details");n&&(n.style.color=l),c&&(c.style.color=a?"#9ca3af":"#6b7280"),m&&(m.style.color=l),r&&(r.style.color=a?"#d1d5db":"#374151"),console.log("[NotificationModal] 🎨 Container estilizado para tema:",a?"escuro":"claro")}setTimeout(()=>{console.log("[NotificationModal] ✨ Adicionando classe de animação..."),e.classList.add("notification-modal-show"),console.log("[NotificationModal] 🔍 Classe notification-modal-show adicionada:",e.classList.contains("notification-modal-show"))},10)}else{console.error("[NotificationModal] ❌ Modal ainda não encontrado no DOM após recriação!");return}this.autoCloseTimer=setTimeout(()=>{console.log("[NotificationModal] ⏰ Auto-fechando modal após 8 segundos..."),console.log("[NotificationModal] 🔍 Timer executado, modal ainda aberto?",this.isOpen),this.close()},8e3),console.log("[NotificationModal] ⏰ Timer de auto-fechamento configurado para 8 segundos"),console.log("[NotificationModal] ✅ Modal exibido com sucesso"),setTimeout(()=>{const t=document.getElementById("notification-modal");if(t){const a=window.getComputedStyle(t);console.log("[NotificationModal] 🔍 Verificação final do modal:",{display:a.display,opacity:a.opacity,visibility:a.visibility,zIndex:a.zIndex,position:a.position})}},100)}updateModalContent(o){const e=document.getElementById("notification-modal-icon"),t=document.getElementById("notification-modal-title"),a=document.getElementById("notification-modal-time"),i=document.getElementById("notification-modal-content");if(!e||!t||!a||!i)return;const l=document.body.classList.contains("dark")||document.documentElement.classList.contains("dark")||window.matchMedia("(prefers-color-scheme: dark)").matches,s=l?"#f9fafb":"#111827",n=l?"#9ca3af":"#6b7280",c=l?"#d1d5db":"#374151",m={new_transaction:"💰",updated_transaction:"✏️",deleted_transaction:"🗑️",category_added:"📁",category_updated:"📝",category_deleted:"❌",new_recorrente:"🔄",updated_recorrente:"✏️",deleted_recorrente:"🗑️",recorrente_reminder:"⏰",test_notification:"🧪"},r={new_transaction:"Nova Transação",updated_transaction:"Transação Atualizada",deleted_transaction:"Transação Excluída",category_added:"Nova Categoria",category_updated:"Categoria Atualizada",category_deleted:"Categoria Excluída",new_recorrente:"Nova Despesa Recorrente",updated_recorrente:"Despesa Recorrente Atualizada",deleted_recorrente:"Despesa Recorrente Excluída",recorrente_reminder:"Lembrete de Despesa Recorrente",test_notification:"Notificação de Teste"},u=(o.createdAt?.toDate?o.createdAt.toDate():new Date(o.createdAt)).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});e.textContent=m[o.type]||"🔔",t.textContent=r[o.type]||"Nova Notificação",t.style.color=s,a.textContent=u,a.style.color=n;const g=this.generateContextualContent(o,s,c);i.innerHTML=g}generateContextualContent(o,e,t){const a=document.body.classList.contains("dark")||document.documentElement.classList.contains("dark")||window.matchMedia("(prefers-color-scheme: dark)").matches,i=s=>typeof s=="number"?new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(s):s,l=s=>s?(s.toDate?s.toDate():new Date(s)).toLocaleDateString("pt-BR"):"";switch(o.type){case"new_transaction":return`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Nova transação adicionada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${i(o.transactionValor)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📝 Descrição:</strong> ${o.transactionDescricao||"Sem descrição"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria:</strong> ${o.transactionCategoria||"Sem categoria"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo:</strong> ${o.transactionTipo||"Não especificado"}
            </div>
            <div>
              <strong>📅 Data:</strong> ${l(o.transactionData)}
            </div>
          </div>
        `;case"updated_transaction":const s=Array.isArray(o.changes)?o.changes:[],n=o.prev;let c="";return s.includes("valor")&&n?.valor&&o.transactionValor&&(c+=`
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor alterado:</strong> 
              <span style="color: #ef4444;">${i(n.valor)}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${i(o.transactionValor)}</span>
            </div>
          `),s.includes("descricao")&&n?.descricao&&(c+=`
            <div style="margin-bottom: 8px;">
              <strong>📝 Descrição alterada:</strong> 
              <span style="color: #ef4444;">"${n.descricao}"</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">"${o.transactionDescricao}"</span>
            </div>
          `),s.includes("categoria")&&n?.categoria&&(c+=`
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria alterada:</strong> 
              <span style="color: #ef4444;">${n.categoria}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${o.transactionCategoria}</span>
            </div>
          `),s.includes("data")&&n?.data&&(c+=`
            <div style="margin-bottom: 8px;">
              <strong>📅 Data alterada:</strong> 
              <span style="color: #ef4444;">${l(n.data)}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${l(o.transactionData)}</span>
            </div>
          `),s.includes("tipo")&&n?.tipo&&(c+=`
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo alterado:</strong> 
              <span style="color: #ef4444;">${n.tipo}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${o.transactionTipo}</span>
            </div>
          `),`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Transação atualizada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            ${c||`
              <div style="margin-bottom: 8px;">
                <strong>📝 Descrição:</strong> ${o.transactionDescricao||"Sem descrição"}
              </div>
              <div>
                <strong>💰 Valor:</strong> ${i(o.transactionValor)}
              </div>
            `}
          </div>
        `;case"deleted_transaction":return`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Transação excluída:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
            <div style="margin-bottom: 8px;">
              <strong>📝 Descrição:</strong> ${o.transactionDescricao||"Transação excluída"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${i(o.transactionValor)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria:</strong> ${o.transactionCategoria||"Sem categoria"}
            </div>
            <div>
              <strong>💳 Tipo:</strong> ${o.transactionTipo||"Não especificado"}
            </div>
          </div>
        `;case"recorrente_reminder":return`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Lembrete de despesa recorrente:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <div style="margin-bottom: 8px;">
              <strong>📝 Nome:</strong> ${o.recorrenteNome||"Recorrente"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${i(o.recorrenteValor)}
            </div>
            <div>
              <strong>📄 Descrição:</strong> ${o.recorrenteDescricao||"Sem descrição"}
            </div>
          </div>
        `;case"category_added":return`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Nova categoria criada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
            <div style="margin-bottom: 8px;">
              <strong>📁 Nome:</strong> ${o.categoryNome||o.categoryName||"Nova categoria"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>🎨 Cor:</strong> <span style="background: ${o.categoryColor||"#6b7280"}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${o.categoryColor||"#6b7280"}</span>
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo:</strong> ${o.categoryTipo==="receita"?"Receita":"Despesa"}
            </div>
            <div>
              <strong>💰 Limite:</strong> ${o.categoryLimite!==null&&o.categoryLimite!==void 0?i(o.categoryLimite):"Sem limite"}
            </div>
          </div>
        `;case"category_updated":const m=o.changes||{},r=o.prev;let y="";if(m.nome&&r?.nome!==void 0&&(y+=`
            <div style="margin-bottom: 8px;">
              <strong>📁 Nome alterado:</strong> 
              <span style="color: #ef4444;">"${r.nome||"Sem nome"}"</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">"${o.categoryNome||"Sem nome"}"</span>
            </div>
          `),m.tipo&&r?.tipo!==void 0&&(y+=`
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo alterado:</strong> 
              <span style="color: #ef4444;">${r.tipo==="receita"?"Receita":"Despesa"}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${o.categoryTipo==="receita"?"Receita":"Despesa"}</span>
            </div>
          `),m.limite&&r?.limite!==void 0){const x=r.limite!==null&&r.limite!==void 0?i(r.limite):"Sem limite",h=o.categoryLimite!==null&&o.categoryLimite!==void 0?i(o.categoryLimite):"Sem limite";y+=`
            <div style="margin-bottom: 8px;">
              <strong>💰 Limite alterado:</strong> 
              <span style="color: #ef4444;">${x}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${h}</span>
            </div>
          `}return m.cor&&r?.cor&&(y+=`
            <div style="margin-bottom: 8px;">
              <strong>🎨 Cor alterada:</strong> 
              <span style="background: ${r.cor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; margin-right: 8px;">${r.cor}</span>
              <span style="margin: 0 8px;">→</span> 
              <span style="background: ${o.categoryColor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${o.categoryColor}</span>
            </div>
          `),`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Categoria atualizada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            ${y||`
              <div style="margin-bottom: 8px;">
                <strong>📁 Nome:</strong> ${o.categoryNome||o.categoryName||"Categoria"}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>💳 Tipo:</strong> ${o.categoryTipo==="receita"?"Receita":"Despesa"}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>💰 Limite:</strong> ${o.categoryLimite!==null&&o.categoryLimite!==void 0?i(o.categoryLimite):"Sem limite"}
              </div>
              <div>
                <strong>🎨 Cor:</strong> <span style="background: ${o.categoryColor||"#6b7280"}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${o.categoryColor||"#6b7280"}</span>
              </div>
            `}
          </div>
        `;case"category_deleted":return`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Categoria excluída:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
            <div style="margin-bottom: 8px;">
              <strong>📁 Nome:</strong> ${o.categoryNome||o.categoryName||"Categoria excluída"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo:</strong> ${o.categoryTipo==="receita"?"Receita":"Despesa"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Limite:</strong> ${o.categoryLimite!==null&&o.categoryLimite!==void 0?i(o.categoryLimite):"Sem limite"}
            </div>
            <div>
              <strong>🎨 Cor:</strong> <span style="background: ${o.categoryColor||"#6b7280"}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${o.categoryColor||"#6b7280"}</span>
            </div>
          </div>
        `;case"new_recorrente":const u=o.recorrenteParcelasTotal&&o.recorrenteParcelasTotal>1?`<div style="margin-bottom: 8px;">
               <strong>🔢 Parcelas:</strong> ${o.recorrenteParcelasRestantes||o.recorrenteParcelasTotal}/${o.recorrenteParcelasTotal}
             </div>`:"";return`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Nova despesa recorrente criada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
            <div style="margin-bottom: 8px;">
              <strong>📝 Nome:</strong> ${o.recorrenteNome||"Nova despesa recorrente"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${i(o.recorrenteValor)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📅 Frequência:</strong> ${o.recorrenteFrequencia||"Mensal"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria:</strong> ${o.recorrenteCategoria||"Sem categoria"}
            </div>
            ${u}
            <div>
              <strong>📄 Descrição:</strong> ${o.recorrenteDescricao||"Sem descrição"}
            </div>
          </div>
        `;case"updated_recorrente":const g=Array.isArray(o.changes)?o.changes:[],d=o.prev;let p="";return g.includes("nome")&&d?.nome&&(p+=`
            <div style="margin-bottom: 8px;">
              <strong>📝 Nome alterado:</strong> 
              <span style="color: #ef4444;">"${d.nome}"</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">"${o.recorrenteNome}"</span>
            </div>
          `),g.includes("valor")&&d?.valor&&(p+=`
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor alterado:</strong> 
              <span style="color: #ef4444;">${i(d.valor)}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${i(o.recorrenteValor)}</span>
            </div>
          `),g.includes("frequencia")&&d?.frequencia&&(p+=`
            <div style="margin-bottom: 8px;">
              <strong>📅 Frequência alterada:</strong> 
              <span style="color: #ef4444;">${d.frequencia}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${o.recorrenteFrequencia}</span>
            </div>
          `),g.includes("categoria")&&d?.categoria&&(p+=`
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria alterada:</strong> 
              <span style="color: #ef4444;">${d.categoria}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${o.recorrenteCategoria}</span>
            </div>
          `),g.includes("descricao")&&d?.descricao&&(p+=`
            <div style="margin-bottom: 8px;">
              <strong>📄 Descrição alterada:</strong> 
              <span style="color: #ef4444;">"${d.descricao}"</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">"${o.recorrenteDescricao}"</span>
            </div>
          `),g.includes("parcelasRestantes")&&d?.parcelasRestantes!==void 0&&(p+=`
            <div style="margin-bottom: 8px;">
              <strong>🔢 Parcelas restantes alteradas:</strong> 
              <span style="color: #ef4444;">${d.parcelasRestantes||"Ilimitadas"}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${o.recorrenteParcelasRestantes||"Ilimitadas"}</span>
            </div>
          `),g.includes("parcelasTotal")&&d?.parcelasTotal!==void 0&&(p+=`
            <div style="margin-bottom: 8px;">
              <strong>🔢 Total de parcelas alterado:</strong> 
              <span style="color: #ef4444;">${d.parcelasTotal||"Ilimitadas"}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${o.recorrenteParcelasTotal||"Ilimitadas"}</span>
            </div>
          `),`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Despesa recorrente atualizada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            ${p||`
              <div style="margin-bottom: 8px;">
                <strong>📝 Nome:</strong> ${o.recorrenteNome||"Despesa recorrente"}
              </div>
              <div>
                <strong>💰 Valor:</strong> ${i(o.recorrenteValor)}
              </div>
            `}
          </div>
        `;case"deleted_recorrente":const b=o.recorrenteParcelasTotal&&o.recorrenteParcelasTotal>1?`<div style="margin-bottom: 8px;">
               <strong>🔢 Parcelas:</strong> ${o.recorrenteParcelasRestantes||o.recorrenteParcelasTotal}/${o.recorrenteParcelasTotal}
             </div>`:"";return`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Despesa recorrente excluída:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
            <div style="margin-bottom: 8px;">
              <strong>📝 Nome:</strong> ${o.recorrenteNome||"Despesa recorrente excluída"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${i(o.recorrenteValor)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📅 Frequência:</strong> ${o.recorrenteFrequencia||"Mensal"}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria:</strong> ${o.recorrenteCategoria||"Sem categoria"}
            </div>
            ${b}
            <div>
              <strong>📄 Descrição:</strong> ${o.recorrenteDescricao||"Sem descrição"}
            </div>
          </div>
        `;case"test_notification":return`
          <div class="notification-modal-message" style="color: ${e}; margin-bottom: 12px;">
            <strong>Notificação de teste:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${t}; background: ${a?"#374151":"#f9fafb"}; padding: 12px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
            <div>
              <strong>🧪 Mensagem:</strong> ${o.message||"Teste do sistema de notificações"}
            </div>
          </div>
        `;default:return`
          <div class="notification-modal-message" style="color: ${e};">
            ${o.message||"Você tem uma nova notificação."}
          </div>
          ${o.details?`
            <div class="notification-modal-details" style="color: ${t};">
              <strong>Detalhes:</strong> ${o.details}
            </div>
          `:""}
        `}}async markAsRead(o){try{await $(o),v.emit("snackbar:show",{message:"Notificação marcada como lida",type:"success",duration:2e3})}catch(e){console.error("[NotificationModal] Erro ao marcar como lida:",e),v.emit("snackbar:show",{message:"Erro ao marcar notificação como lida",type:"error",duration:3e3})}}hide(){const o=document.getElementById("notification-modal");o&&(o.classList.remove("notification-modal-show"),setTimeout(()=>{this.isOpen&&this.currentNotification&&!this.currentNotification.read&&this.markAsRead(this.currentNotification.id),o.remove(),this.isOpen=!1,this.currentNotification=null},300))}close(){if(!this.isOpen){console.log("[NotificationModal] ⚠️ Tentativa de fechar modal já fechado");return}console.log("[NotificationModal] 🔒 Fechando modal..."),console.log("[NotificationModal] 🔍 Estado antes do fechamento:",{isOpen:this.isOpen,hasAutoCloseTimer:!!this.autoCloseTimer,currentNotification:!!this.currentNotification}),this.isOpen=!1,this.currentNotification=null;const o=document.getElementById("notification-modal");o&&(o.classList.remove("notification-modal-show"),setTimeout(()=>{o.style.display="none",o.style.opacity="0",o.style.visibility="hidden"},300)),this.autoCloseTimer&&(clearTimeout(this.autoCloseTimer),this.autoCloseTimer=null)}destroy(){this.close();const o=document.getElementById("notification-modal");o&&o.remove()}}let f=null;function T(){return f||(f=new N),f}export{N as default,T as getNotificationModal};
