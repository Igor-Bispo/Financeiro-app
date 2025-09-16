class d{constructor(){this.touchStartX=0,this.touchEndX=0,this.touchStartY=0,this.touchEndY=0,this.isSwiping=!1,this.swipeThreshold=80,this.tabs=["/dashboard","/transactions","/categories","/analytics","/recorrentes","/notifications","/settings"],this.currentTabIndex=0,this.container=null,this.swipeIndicator=null,this.isEnabled=!0,this.hasShownInitialHint=!1,this.init()}init(){if(console.log("🔧 SwipeNavigation: Inicializando..."),this.container=document.querySelector("#app-content"),!this.container){console.warn("⚠️ SwipeNavigation: Container #app-content não encontrado");return}if(!window.appState?.currentUser){console.warn("⚠️ SwipeNavigation: Usuário não autenticado, aguardando..."),setTimeout(()=>{window.appState?.currentUser&&(console.log("🔄 SwipeNavigation: Usuário autenticado, reinicializando..."),this.init())},2e3);return}console.log("✅ SwipeNavigation: Criando indicador e bindando eventos..."),this.createSwipeIndicator(),this.bindEvents(),this.updateCurrentTabIndex(),console.log("✅ SwipeNavigation: Inicialização completa!")}createSwipeIndicator(){console.log("🎨 SwipeNavigation: Criando indicador visual..."),this.swipeIndicator=document.createElement("div"),this.swipeIndicator.id="swipe-indicator",this.swipeIndicator.innerHTML=`
      <div class="swipe-dots">
        ${this.tabs.map((i,e)=>`<div class="swipe-dot ${e===0?"active":""}" data-index="${e}"></div>`).join("")}
      </div>
      <div class="swipe-hint">← Deslize para navegar →</div>
    `,this.swipeIndicator.className="swipe-indicator";const t=document.createElement("style");t.textContent=`
      .swipe-indicator {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      
      .swipe-indicator.show {
        opacity: 1;
      }
      
      .swipe-dots {
        display: flex;
        gap: 6px;
        justify-content: center;
        margin-bottom: 4px;
      }
      
      .swipe-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
      }
      
      .swipe-dot.active {
        background: white;
        transform: scale(1.2);
      }
      
      .swipe-hint {
        text-align: center;
        font-size: 10px;
        opacity: 0.8;
      }
      
      .swipe-feedback {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1001;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }
      
      .swipe-feedback.show {
        opacity: 1;
      }
      
      .swipe-transition {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      @media (max-width: 768px) {
        .swipe-indicator {
          top: 10px;
          padding: 6px 12px;
          font-size: 11px;
        }
      }
    `,document.head.appendChild(t),document.body.appendChild(this.swipeIndicator),console.log("✅ SwipeNavigation: Indicador visual adicionado ao DOM"),setTimeout(()=>{this.swipeIndicator&&(this.swipeIndicator.classList.add("show"),console.log("👁️ SwipeNavigation: Indicador visual mostrado"))},1e3),setTimeout(()=>{this.swipeIndicator&&(this.swipeIndicator.classList.remove("show"),console.log("👁️ SwipeNavigation: Indicador visual escondido"))},6e3)}bindEvents(){console.log("🔗 SwipeNavigation: Configurando eventos...");const t=document.getElementById("login-page");if(t&&t.style.display!=="none"){console.log("🚫 SwipeNavigation: Na tela de login, não configurando eventos");return}this.container.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!0}),this.container.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!1}),this.container.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!1}),this.container.addEventListener("mousedown",this.handleMouseStart.bind(this)),this.container.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.container.addEventListener("mouseup",this.handleMouseEnd.bind(this)),document.addEventListener("keydown",this.handleKeydown.bind(this),{capture:!0}),console.log("⌨️ SwipeNavigation: Eventos de teclado configurados"),this.observeRouteChanges(),console.log("✅ SwipeNavigation: Todos os eventos configurados com sucesso!")}handleTouchStart(t){this.isEnabled&&(this.touchStartX=t.touches[0].clientX,this.touchStartY=t.touches[0].clientY,this.isSwiping=!1,console.log("👆 SwipeNavigation: Touch start - X:",this.touchStartX,"Y:",this.touchStartY))}handleTouchMove(t){if(!this.isEnabled||!this.touchStartX)return;const e=t.target.tagName;if(["BUTTON","A","INPUT","SELECT","TEXTAREA","LABEL"].includes(e)){this.isSwiping=!1;return}const n=t.touches[0].clientX,s=t.touches[0].clientY,a=Math.abs(n-this.touchStartX),o=Math.abs(s-this.touchStartY);a>o*1.5&&a>24&&(this.isSwiping=!0,t.preventDefault(),this.showSwipeFeedback(a))}handleTouchEnd(t){if(!this.isEnabled||!this.isSwiping)return;this.touchEndX=t.changedTouches[0].clientX,this.touchEndY=t.changedTouches[0].clientY;const i=this.touchEndX-this.touchStartX,e=this.touchEndY-this.touchStartY;Math.abs(i)>this.swipeThreshold&&Math.abs(i)>Math.abs(e)&&this.handleSwipe(i>0?"right":"left"),this.resetSwipe()}handleMouseStart(t){!this.isEnabled||t.button!==0||(this.touchStartX=t.clientX,this.touchStartY=t.clientY,this.isSwiping=!1)}handleMouseMove(t){if(!this.isEnabled||!this.touchStartX)return;const i=Math.abs(t.clientX-this.touchStartX),e=Math.abs(t.clientY-this.touchStartY);i>e&&i>10&&(this.isSwiping=!0)}handleMouseEnd(t){if(!this.isEnabled||!this.isSwiping)return;this.touchEndX=t.clientX,this.touchEndY=t.clientY;const i=this.touchEndX-this.touchStartX,e=this.touchEndY-this.touchStartY;Math.abs(i)>this.swipeThreshold&&Math.abs(i)>Math.abs(e)&&this.handleSwipe(i>0?"right":"left"),this.resetSwipe()}handleKeydown(t){if(console.log("⌨️ SwipeNavigation: Tecla pressionada:",t.key),t.target.tagName==="INPUT"||t.target.tagName==="TEXTAREA"||t.target.contentEditable==="true"){console.log("⌨️ SwipeNavigation: Ignorando tecla em input/textarea");return}if(!this.isEnabled){console.log("⌨️ SwipeNavigation: Sistema desabilitado");return}switch(t.key){case"ArrowLeft":console.log("⌨️ SwipeNavigation: Navegando para esquerda"),t.preventDefault(),t.stopPropagation(),this.navigateToTab(this.currentTabIndex-1);break;case"ArrowRight":console.log("⌨️ SwipeNavigation: Navegando para direita"),t.preventDefault(),t.stopPropagation(),this.navigateToTab(this.currentTabIndex+1);break}}handleSwipe(t){console.log("👆 SwipeNavigation: Swipe detectado - Direção:",t,"Índice atual:",this.currentTabIndex),this.updateCurrentTabIndex();let i=this.currentTabIndex;t==="left"&&this.currentTabIndex<this.tabs.length-1?(i=this.currentTabIndex+1,console.log("👆 SwipeNavigation: Navegando para direita (índice:",i,")")):t==="right"&&this.currentTabIndex>0&&(i=this.currentTabIndex-1,console.log("👆 SwipeNavigation: Navegando para esquerda (índice:",i,")")),i!==this.currentTabIndex?(this.navigateToTab(i),this.provideHapticFeedback()):this.showSwipeFeedback("edge")}navigateToTab(t){if(t<0||t>=this.tabs.length){console.log("🚫 SwipeNavigation: Índice inválido:",t);return}const i=this.tabs[t];console.log("🎯 SwipeNavigation: Navegando para aba:",i,"Índice:",t),this.animateTransition(t),window.router?(console.log("🎯 SwipeNavigation: Usando window.router"),window.router(i)):(console.log("🎯 SwipeNavigation: Usando window.location.hash"),window.location.hash=i),window.updatePageTitle&&window.updatePageTitle(i),this.currentTabIndex=t,this.updateSwipeIndicator()}animateTransition(t){const i=this.container,e=t>this.currentTabIndex?1:-1;i.classList.add("swipe-transition"),i.style.transform=`translateX(${e*20}px)`,i.style.opacity="0.8",setTimeout(()=>{i.style.transform="translateX(0)",i.style.opacity="1"},50),setTimeout(()=>{i.classList.remove("swipe-transition"),i.style.transform="",i.style.opacity=""},300)}showSwipeFeedback(t){let i="";switch(t){case"edge":i=this.currentTabIndex===0?"Primeira aba":"Última aba";break;default:return}const e=document.createElement("div");e.className="swipe-feedback",e.textContent=i,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),10),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),200)},1e3)}provideHapticFeedback(){"vibrate"in navigator&&navigator.vibrate(50)}updateCurrentTabIndex(){const t=document.querySelector(".nav-btn.active");if(t){const i=t.getAttribute("data-route"),e=this.tabs.indexOf(i);console.log("🔍 SwipeNavigation - Aba ativa detectada:",i,"Índice:",e),e!==this.currentTabIndex&&(this.currentTabIndex=e)}}updateSwipeIndicator(){if(!this.swipeIndicator)return;this.swipeIndicator.querySelectorAll(".swipe-dot").forEach((i,e)=>{i.classList.toggle("active",e===this.currentTabIndex)}),this.hasShownInitialHint||(this.hasShownInitialHint=!0,this.swipeIndicator.classList.add("show"),setTimeout(()=>{this.swipeIndicator.classList.remove("show")},4e3))}observeRouteChanges(){const t=()=>{this.updateCurrentTabIndex(),this.updateSwipeIndicator()};window.addEventListener("hashchange",t),t()}resetSwipe(){this.touchStartX=0,this.touchStartY=0,this.touchEndX=0,this.touchEndY=0,this.isSwiping=!1}enable(){this.isEnabled=!0,console.log("SwipeNavigation: Habilitado")}disable(){this.isEnabled=!1,console.log("SwipeNavigation: Desabilitado")}destroy(){this.swipeIndicator&&this.swipeIndicator.remove(),console.log("SwipeNavigation: Destruído")}}window.swipeNavigation=null;export{d as SwipeNavigation};
