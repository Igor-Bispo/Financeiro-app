class h{constructor(){this.touchStartX=0,this.touchEndX=0,this.touchStartY=0,this.touchEndY=0,this.isSwiping=!1,this.swipeThreshold=80,this.tabs=["/dashboard","/transactions","/categories","/analytics","/recorrentes","/notifications","/settings"],this.currentTabIndex=0,this.container=null,this.swipeIndicator=null,this.isEnabled=!0,this.hasShownInitialHint=!1,this.init()}init(){this.container=document.querySelector("#app-content"),this.container&&window.appState?.currentUser&&(this.createSwipeIndicator(),this.bindEvents(),this.updateCurrentTabIndex())}createSwipeIndicator(){this.swipeIndicator=document.createElement("div"),this.swipeIndicator.id="swipe-indicator",this.swipeIndicator.innerHTML=`
      <div class="swipe-dots">
        ${this.tabs.map((e,i)=>`<div class="swipe-dot ${i===0?"active":""}" data-index="${i}"></div>`).join("")}
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
    `,document.head.appendChild(t),document.body.appendChild(this.swipeIndicator)}bindEvents(){const t=document.getElementById("login-page");t&&t.style.display!=="none"||(this.container.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!0}),this.container.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!1}),this.container.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!1}),this.container.addEventListener("mousedown",this.handleMouseStart.bind(this)),this.container.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.container.addEventListener("mouseup",this.handleMouseEnd.bind(this)),document.addEventListener("keydown",this.handleKeydown.bind(this),{capture:!0}),this.observeRouteChanges())}handleTouchStart(t){this.isEnabled&&(this.touchStartX=t.touches[0].clientX,this.touchStartY=t.touches[0].clientY,this.isSwiping=!1)}handleTouchMove(t){if(!this.isEnabled||!this.touchStartX)return;const i=t.target.tagName;if(["BUTTON","A","INPUT","SELECT","TEXTAREA","LABEL"].includes(i)){this.isSwiping=!1;return}const a=t.touches[0].clientX,n=t.touches[0].clientY,s=Math.abs(a-this.touchStartX),o=Math.abs(n-this.touchStartY);s>o*1.5&&s>24&&(this.isSwiping=!0,t.preventDefault(),this.showSwipeFeedback(s))}handleTouchEnd(t){if(!this.isEnabled||!this.isSwiping)return;this.touchEndX=t.changedTouches[0].clientX,this.touchEndY=t.changedTouches[0].clientY;const e=this.touchEndX-this.touchStartX,i=this.touchEndY-this.touchStartY;Math.abs(e)>this.swipeThreshold&&Math.abs(e)>Math.abs(i)&&this.handleSwipe(e>0?"right":"left"),this.resetSwipe()}handleMouseStart(t){!this.isEnabled||t.button!==0||(this.touchStartX=t.clientX,this.touchStartY=t.clientY,this.isSwiping=!1)}handleMouseMove(t){if(!this.isEnabled||!this.touchStartX)return;const e=Math.abs(t.clientX-this.touchStartX),i=Math.abs(t.clientY-this.touchStartY);e>i&&e>10&&(this.isSwiping=!0)}handleMouseEnd(t){if(!this.isEnabled||!this.isSwiping)return;this.touchEndX=t.clientX,this.touchEndY=t.clientY;const e=this.touchEndX-this.touchStartX,i=this.touchEndY-this.touchStartY;Math.abs(e)>this.swipeThreshold&&Math.abs(e)>Math.abs(i)&&this.handleSwipe(e>0?"right":"left"),this.resetSwipe()}handleKeydown(t){if(!(t.target.tagName==="INPUT"||t.target.tagName==="TEXTAREA"||t.target.contentEditable==="true")&&this.isEnabled)switch(t.key){case"ArrowLeft":t.preventDefault(),t.stopPropagation(),this.navigateToTab(this.currentTabIndex-1);break;case"ArrowRight":t.preventDefault(),t.stopPropagation(),this.navigateToTab(this.currentTabIndex+1);break}}handleSwipe(t){this.updateCurrentTabIndex();let e=this.currentTabIndex;t==="left"&&this.currentTabIndex<this.tabs.length-1?e=this.currentTabIndex+1:t==="right"&&this.currentTabIndex>0&&(e=this.currentTabIndex-1),e!==this.currentTabIndex?(this.navigateToTab(e),this.provideHapticFeedback()):this.showSwipeFeedback("edge")}navigateToTab(t){if(t<0||t>=this.tabs.length)return;const e=this.tabs[t];this.animateTransition(t),window.router?window.router(e):window.location.hash=e,window.updatePageTitle&&window.updatePageTitle(e),this.currentTabIndex=t,this.updateSwipeIndicator()}animateTransition(t){const e=this.container,i=t>this.currentTabIndex?1:-1;e.classList.add("swipe-transition"),e.style.transform=`translateX(${i*20}px)`,e.style.opacity="0.8",setTimeout(()=>{e.style.transform="translateX(0)",e.style.opacity="1"},50),setTimeout(()=>{e.classList.remove("swipe-transition"),e.style.transform="",e.style.opacity=""},300)}showSwipeFeedback(t){let e="";switch(t){case"edge":e=this.currentTabIndex===0?"Primeira aba":"Última aba";break;default:return}const i=document.createElement("div");i.className="swipe-feedback",i.textContent=e,document.body.appendChild(i),setTimeout(()=>i.classList.add("show"),10),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),200)},1e3)}provideHapticFeedback(){"vibrate"in navigator&&navigator.vibrate(50)}updateCurrentTabIndex(){const t=document.querySelector(".nav-btn.active");if(t){const e=t.getAttribute("data-route"),i=this.tabs.indexOf(e);i!==this.currentTabIndex&&(this.currentTabIndex=i)}}updateSwipeIndicator(){if(!this.swipeIndicator)return;this.swipeIndicator.querySelectorAll(".swipe-dot").forEach((e,i)=>{e.classList.toggle("active",i===this.currentTabIndex)}),this.hasShownInitialHint||(this.hasShownInitialHint=!0,this.swipeIndicator.classList.add("show"),setTimeout(()=>{this.swipeIndicator.classList.remove("show")},4e3))}observeRouteChanges(){const t=()=>{this.updateCurrentTabIndex(),this.updateSwipeIndicator()};window.addEventListener("hashchange",t),t()}resetSwipe(){this.touchStartX=0,this.touchStartY=0,this.touchEndX=0,this.touchEndY=0,this.isSwiping=!1}enable(){this.isEnabled=!0,console.log("SwipeNavigation: Habilitado")}disable(){this.isEnabled=!1,console.log("SwipeNavigation: Desabilitado")}destroy(){this.swipeIndicator&&this.swipeIndicator.remove(),console.log("SwipeNavigation: Destruído")}}window.swipeNavigation=null;export{h as SwipeNavigation};
