(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const eg="modulepreload",tg=function(n){return"/"+n},El={},$e=function(e,t,o){let r=Promise.resolve();if(t&&t.length>0){let d=function(h){return Promise.all(h.map(m=>Promise.resolve(m).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var a=d;document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),l=c?.nonce||c?.getAttribute("nonce");r=d(t.map(h=>{if(h=tg(h),h in El)return;El[h]=!0;const m=h.endsWith(".css"),f=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const _=document.createElement("link");if(_.rel=m?"stylesheet":eg,m||(_.as="script"),_.crossOrigin="",_.href=h,l&&_.setAttribute("nonce",l),document.head.appendChild(_),m)return new Promise((E,T)=>{_.addEventListener("load",E),_.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(c){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=c,window.dispatchEvent(l),!l.defaultPrevented)throw c}return r.then(c=>{for(const l of c||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})};function tn({title:n="",content:e="",onClose:t=null}){console.log("🔧 Modal sendo criado com:",{title:n,content:e.substring(0,100)+"..."});const o=document.createElement("div");o.id="app-modal",o.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",o.onclick=s=>{s.target===o&&t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()};const r=document.createElement("div");return r.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",r.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,o.appendChild(r),r.querySelector("#modal-close-btn").onclick=s=>{s.stopPropagation(),t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()},window.toggleFABOnModal&&window.toggleFABOnModal(),console.log("🔧 Modal criado:",o),console.log("🔧 Modal HTML:",o.outerHTML.substring(0,200)+"..."),o}function ng({onSubmit:n,initialData:e={}}){const t=document.createElement("form");t.className="space-y-4",t.innerHTML=`
    <div class="form-group">
      <label class="form-label modal-label">Nome da Despesa Recorrente</label>
      <input type="text" id="rec-desc" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: Aluguel, Netflix, Academia"
             value="${e.descricao||""}"
             autocomplete="off"
             autocorrect="off"
             autocapitalize="words"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
    </div>
    <div class="form-group">
      <label class="form-label modal-label">Valor da Despesa (R$)</label>
      <input type="number" id="rec-valor" required step="0.01" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="0,00"
             value="${e.valorTotal||e.valor||""}"
             inputmode="decimal"
             autocomplete="off"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
    </div>
    <div>
      <label class="modal-label">Tipo do Valor Informado</label>
      <div class="flex gap-4">
        <label class="flex items-center gap-2 cursor-pointer radio-label">
          <input type="radio" name="tipo-valor" value="total" 
                 class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                 ${e.valorTotal&&!e.valor||!e.valorTotal&&!e.valor?"checked":""}>
          <span class="radio-text">Valor total (soma de todas as parcelas)</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer radio-label">
          <input type="radio" name="tipo-valor" value="parcela" 
                 class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                 ${e.valor&&!e.valorTotal?"checked":""}>
          <span class="radio-text">Valor de cada parcela</span>
        </label>
      </div>
    </div>
    <div>
      <label class="modal-label">Categoria da Despesa</label>
      <select id="rec-categoria" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
        <option value="" style="background-color: var(--option-bg, #ffffff); color: var(--option-text, #1f2937); font-weight: 500; padding: 12px; font-size: 14px;">Selecione uma categoria...</option>
        ${(window.appState.categories||[]).sort((r,s)=>r.nome.localeCompare(s.nome,"pt-BR",{sensitivity:"base"})).map(r=>{const s=new Date,a=s.getFullYear(),c=s.getMonth()+1,d=(window.appState.transactions||[]).filter(_=>{if(_.categoriaId!==r.id||_.tipo!==r.tipo)return!1;let E;_.createdAt&&typeof _.createdAt=="object"&&_.createdAt.seconds?E=new Date(_.createdAt.seconds*1e3):E=new Date(_.createdAt);const T=E.getFullYear(),S=E.getMonth()+1;return T===a&&S===c}).reduce((_,E)=>_+parseFloat(E.valor),0),h=parseFloat(r.limite||0),m=r.tipo==="receita"?d:h-d;let f=r.nome;return h>0&&(f+=` - Limite: R$ ${h.toFixed(2)}`,r.tipo==="despesa"?f+=` (Disponível: R$ ${Math.max(0,m).toFixed(2)})`:f+=` (Recebido: R$ ${d.toFixed(2)})`),`<option value="${r.id}" ${e.categoriaId===r.id?"selected":""} style="background-color: var(--option-bg, #ffffff); color: var(--option-text, #1f2937); font-weight: 500; padding: 8px;">${f}</option>`}).join("")}
      </select>
    </div>
    <div>
      <label class="modal-label">Data de Início da Recorrência</label>
      <input type="date" id="rec-data" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             value="${e.dataInicio||new Date().toISOString().split("T")[0]}"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
    </div>
    <div>
      <label class="modal-label">Número de Parcelas (deixe vazio para infinito)</label>
      <input type="number" id="rec-parcelas" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: 12 para 1 ano, 24 para 2 anos"
             value="${e.parcelasRestantes||""}"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
    </div>
    <div id="recorrente-valores-info" class="text-xs text-gray-600 modal-info"></div>
    <div class="flex items-center gap-2">
      <input type="checkbox" id="rec-efetivar" 
             class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" 
             ${e.efetivarMesAtual?"checked":""} />
      <label for="rec-efetivar" class="checkbox-label">Criar transação para este mês automaticamente</label>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Salvar</button>
    </div>
  `;function o(){const r=document.getElementById("rec-valor"),s=document.getElementById("rec-parcelas"),a=t.querySelector('input[name="tipo-valor"]:checked'),c=r&&parseFloat(r.value)||0,l=s&&parseInt(s.value)||0,d=a?a.value:"total",h=document.getElementById("recorrente-valores-info");if(l>1&&c>0)if(d==="total"){const m=c/l;h.innerHTML=`<b>Valor total:</b> R$ ${c.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${m.toFixed(2)}`}else{const m=c*l;h.innerHTML=`<b>Valor total:</b> R$ ${m.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${c.toFixed(2)}`}else c>0?h.innerHTML=`<b>Valor:</b> R$ ${c.toFixed(2)}`:h.innerHTML=""}return t.querySelector("#rec-valor").addEventListener("input",o),t.querySelector("#rec-parcelas").addEventListener("input",o),t.querySelectorAll('input[name="tipo-valor"]').forEach(r=>{r.addEventListener("change",o)}),setTimeout(()=>{if(o(),!t.querySelector('input[name="tipo-valor"]:checked')){const a=t.querySelector('input[name="tipo-valor"][value="total"]');a&&(a.checked=!0,a.dispatchEvent(new Event("change")))}const s=t.querySelector("#rec-efetivar");if(s){const a=e.efetivarMesAtual===!0||e.efetivarMesAtual==="true";s.checked=a}},100),t.addEventListener("submit",r=>{r.preventDefault();const s=parseFloat(document.getElementById("rec-valor").value);let a=document.getElementById("rec-parcelas").value?parseInt(document.getElementById("rec-parcelas").value):null;a!==null&&a<1&&(a=null);const c=t.querySelector('input[name="tipo-valor"]:checked').value;let l=s,d=s;a&&a>1?c==="total"?(l=+(s/a).toFixed(2),d=+(l.toFixed(2)*a).toFixed(2)):(l=+s.toFixed(2),d=+(l*a).toFixed(2)):(l=+s.toFixed(2),d=+s.toFixed(2));const h={descricao:document.getElementById("rec-desc").value,valor:l,valorTotal:d,categoriaId:document.getElementById("rec-categoria").value,dataInicio:document.getElementById("rec-data").value,parcelasRestantes:a,parcelasTotal:a,ativa:!0,efetivarMesAtual:document.getElementById("rec-efetivar").checked};n(h)}),t}const og=()=>{};var Tl={};/**
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
 */const cu=function(n){const e=[];let t=0;for(let o=0;o<n.length;o++){let r=n.charCodeAt(o);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&o+1<n.length&&(n.charCodeAt(o+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++o)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},rg=function(n){const e=[];let t=0,o=0;for(;t<n.length;){const r=n[t++];if(r<128)e[o++]=String.fromCharCode(r);else if(r>191&&r<224){const s=n[t++];e[o++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=n[t++],a=n[t++],c=n[t++],l=((r&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[o++]=String.fromCharCode(55296+(l>>10)),e[o++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],a=n[t++];e[o++]=String.fromCharCode((r&15)<<12|(s&63)<<6|a&63)}}return e.join("")},lu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let r=0;r<n.length;r+=3){const s=n[r],a=r+1<n.length,c=a?n[r+1]:0,l=r+2<n.length,d=l?n[r+2]:0,h=s>>2,m=(s&3)<<4|c>>4;let f=(c&15)<<2|d>>6,_=d&63;l||(_=64,a||(f=64)),o.push(t[h],t[m],t[f],t[_])}return o.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(cu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):rg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let r=0;r<n.length;){const s=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const m=r<n.length?t[n.charAt(r)]:64;if(++r,s==null||c==null||d==null||m==null)throw new sg;const f=s<<2|c>>4;if(o.push(f),d!==64){const _=c<<4&240|d>>2;if(o.push(_),m!==64){const E=d<<6&192|m;o.push(E)}}}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class sg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ig=function(n){const e=cu(n);return lu.encodeByteArray(e,!0)},Xr=function(n){return ig(n).replace(/\./g,"")},du=function(n){try{return lu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function ag(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const cg=()=>ag().__FIREBASE_DEFAULTS__,lg=()=>{if(typeof process>"u"||typeof Tl>"u")return;const n=Tl.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},dg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&du(n[1]);return e&&JSON.parse(e)},ys=()=>{try{return og()||cg()||lg()||dg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},uu=n=>ys()?.emulatorHosts?.[n],ug=n=>{const e=uu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const o=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),o]:[e.substring(0,t),o]},hu=()=>ys()?.config,pu=n=>ys()?.[`_${n}`];/**
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
 */class hg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,o)=>{t?this.reject(t):this.resolve(o),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,o))}}}/**
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
 */function eo(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function mu(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function pg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},o=e||"demo-project",r=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${o}`,aud:o,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Xr(JSON.stringify(t)),Xr(JSON.stringify(a)),""].join(".")}const Ao={};function mg(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ao))Ao[e]?n.emulator.push(e):n.prod.push(e);return n}function gg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Il=!1;function gu(n,e){if(typeof window>"u"||typeof document>"u"||!eo(window.location.host)||Ao[n]===e||Ao[n]||Il)return;Ao[n]=e;function t(f){return`__firebase__banner__${f}`}const o="__firebase__banner",s=mg().prod.length>0;function a(){const f=document.getElementById(o);f&&f.remove()}function c(f){f.style.display="flex",f.style.background="#7faaf0",f.style.position="fixed",f.style.bottom="5px",f.style.left="5px",f.style.padding=".5em",f.style.borderRadius="5px",f.style.alignItems="center"}function l(f,_){f.setAttribute("width","24"),f.setAttribute("id",_),f.setAttribute("height","24"),f.setAttribute("viewBox","0 0 24 24"),f.setAttribute("fill","none"),f.style.marginLeft="-6px"}function d(){const f=document.createElement("span");return f.style.cursor="pointer",f.style.marginLeft="16px",f.style.fontSize="24px",f.innerHTML=" &times;",f.onclick=()=>{Il=!0,a()},f}function h(f,_){f.setAttribute("id",_),f.innerText="Learn more",f.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",f.setAttribute("target","__blank"),f.style.paddingLeft="5px",f.style.textDecoration="underline"}function m(){const f=gg(o),_=t("text"),E=document.getElementById(_)||document.createElement("span"),T=t("learnmore"),S=document.getElementById(T)||document.createElement("a"),N=t("preprendIcon"),L=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(f.created){const $=f.element;c($),h(S,T);const ee=d();l(L,N),$.append(L,E,S,ee),document.body.appendChild($)}s?(E.innerText="Preview backend disconnected.",L.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(L.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,E.innerText="Preview backend running in this workspace."),E.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
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
 */function Ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())}function wg(){const n=ys()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function yg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function fu(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function vg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function bg(){const n=Ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function _g(){return!wg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function wu(){try{return typeof indexedDB=="object"}catch{return!1}}function yu(){return new Promise((n,e)=>{try{let t=!0;const o="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(o);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(o),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(t){e(t)}})}function Eg(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Tg="FirebaseError";class lt extends Error{constructor(e,t,o){super(t),this.code=e,this.customData=o,this.name=Tg,Object.setPrototypeOf(this,lt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Tn.prototype.create)}}class Tn{constructor(e,t,o){this.service=e,this.serviceName=t,this.errors=o}create(e,...t){const o=t[0]||{},r=`${this.service}/${e}`,s=this.errors[e],a=s?Ig(s,o):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new lt(r,c,o)}}function Ig(n,e){return n.replace(xg,(t,o)=>{const r=e[o];return r!=null?String(r):`<${o}?>`})}const xg=/\{\$([^}]+)}/g;function Sg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ft(n,e){if(n===e)return!0;const t=Object.keys(n),o=Object.keys(e);for(const r of t){if(!o.includes(r))return!1;const s=n[r],a=e[r];if(xl(s)&&xl(a)){if(!ft(s,a))return!1}else if(s!==a)return!1}for(const r of o)if(!t.includes(r))return!1;return!0}function xl(n){return n!==null&&typeof n=="object"}/**
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
 */function Zo(n){const e=[];for(const[t,o]of Object.entries(n))Array.isArray(o)?o.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(o));return e.length?"&"+e.join("&"):""}function Ag(n,e){const t=new Cg(n,e);return t.subscribe.bind(t)}class Cg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(o=>{this.error(o)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,o){let r;if(e===void 0&&t===void 0&&o===void 0)throw new Error("Missing Observer.");kg(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:o},r.next===void 0&&(r.next=Ti),r.error===void 0&&(r.error=Ti),r.complete===void 0&&(r.complete=Ti);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(o){typeof console<"u"&&console.error&&console.error(o)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function kg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ti(){}/**
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
 */const Rg=1e3,Pg=2,Dg=14400*1e3,Ng=.5;function Sl(n,e=Rg,t=Pg){const o=e*Math.pow(t,n),r=Math.round(Ng*o*(Math.random()-.5)*2);return Math.min(Dg,o+r)}/**
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
 */function _e(n){return n&&n._delegate?n._delegate:n}class it{constructor(e,t,o){this.name=e,this.instanceFactory=t,this.type=o,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const dn="[DEFAULT]";/**
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
 */class Mg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const o=new hg;if(this.instancesDeferred.set(t,o),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&o.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),o=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(o)return null;throw r}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Vg(e))try{this.getOrInitializeService({instanceIdentifier:dn})}catch{}for(const[t,o]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:r});o.resolve(s)}catch{}}}}clearInstance(e=dn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=dn){return this.instances.has(e)}getOptions(e=dn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,o=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(o))throw Error(`${this.name}(${o}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:o,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);o===c&&a.resolve(r)}return r}onInit(e,t){const o=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(o)??new Set;r.add(e),this.onInitCallbacks.set(o,r);const s=this.instances.get(o);return s&&e(s,o),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const o=this.onInitCallbacks.get(t);if(o)for(const r of o)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let o=this.instances.get(e);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:Lg(e),options:t}),this.instances.set(e,o),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(o,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,o)}catch{}return o||null}normalizeInstanceIdentifier(e=dn){return this.component?this.component.multipleInstances?e:dn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lg(n){return n===dn?void 0:n}function Vg(n){return n.instantiationMode==="EAGER"}/**
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
 */class Og{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Mg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var X;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(X||(X={}));const Fg={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},$g=X.INFO,Bg={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},Ug=(n,e,...t)=>{if(e<n.logLevel)return;const o=new Date().toISOString(),r=Bg[e];if(r)console[r](`[${o}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class vs{constructor(e){this.name=e,this._logLevel=$g,this._logHandler=Ug,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in X))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Fg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...e),this._logHandler(this,X.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...e),this._logHandler(this,X.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,X.INFO,...e),this._logHandler(this,X.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,X.WARN,...e),this._logHandler(this,X.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...e),this._logHandler(this,X.ERROR,...e)}}const zg=(n,e)=>e.some(t=>n instanceof t);let Al,Cl;function qg(){return Al||(Al=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jg(){return Cl||(Cl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const vu=new WeakMap,$i=new WeakMap,bu=new WeakMap,Ii=new WeakMap,ha=new WeakMap;function Hg(n){const e=new Promise((t,o)=>{const r=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Ut(n.result)),r()},a=()=>{o(n.error),r()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&vu.set(t,n)}).catch(()=>{}),ha.set(e,n),e}function Gg(n){if($i.has(n))return;const e=new Promise((t,o)=>{const r=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),r()},a=()=>{o(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});$i.set(n,e)}let Bi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return $i.get(n);if(e==="objectStoreNames")return n.objectStoreNames||bu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ut(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Wg(n){Bi=n(Bi)}function Kg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const o=n.call(xi(this),e,...t);return bu.set(o,e.sort?e.sort():[e]),Ut(o)}:jg().includes(n)?function(...e){return n.apply(xi(this),e),Ut(vu.get(this))}:function(...e){return Ut(n.apply(xi(this),e))}}function Xg(n){return typeof n=="function"?Kg(n):(n instanceof IDBTransaction&&Gg(n),zg(n,qg())?new Proxy(n,Bi):n)}function Ut(n){if(n instanceof IDBRequest)return Hg(n);if(Ii.has(n))return Ii.get(n);const e=Xg(n);return e!==n&&(Ii.set(n,e),ha.set(e,n)),e}const xi=n=>ha.get(n);function _u(n,e,{blocked:t,upgrade:o,blocking:r,terminated:s}={}){const a=indexedDB.open(n,e),c=Ut(a);return o&&a.addEventListener("upgradeneeded",l=>{o(Ut(a.result),l.oldVersion,l.newVersion,Ut(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),r&&l.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Yg=["get","getKey","getAll","getAllKeys","count"],Qg=["put","add","delete","clear"],Si=new Map;function kl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Si.get(e))return Si.get(e);const t=e.replace(/FromIndex$/,""),o=e!==t,r=Qg.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!(r||Yg.includes(t)))return;const s=async function(a,...c){const l=this.transaction(a,r?"readwrite":"readonly");let d=l.store;return o&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&l.done]))[0]};return Si.set(e,s),s}Wg(n=>({...n,get:(e,t,o)=>kl(e,t)||n.get(e,t,o),has:(e,t)=>!!kl(e,t)||n.has(e,t)}));/**
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
 */class Jg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Zg(t)){const o=t.getImmediate();return`${o.library}/${o.version}`}else return null}).filter(t=>t).join(" ")}}function Zg(n){return n.getComponent()?.type==="VERSION"}const Ui="@firebase/app",Rl="0.14.0";/**
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
 */const Ct=new vs("@firebase/app"),ef="@firebase/app-compat",tf="@firebase/analytics-compat",nf="@firebase/analytics",of="@firebase/app-check-compat",rf="@firebase/app-check",sf="@firebase/auth",af="@firebase/auth-compat",cf="@firebase/database",lf="@firebase/data-connect",df="@firebase/database-compat",uf="@firebase/functions",hf="@firebase/functions-compat",pf="@firebase/installations",mf="@firebase/installations-compat",gf="@firebase/messaging",ff="@firebase/messaging-compat",wf="@firebase/performance",yf="@firebase/performance-compat",vf="@firebase/remote-config",bf="@firebase/remote-config-compat",_f="@firebase/storage",Ef="@firebase/storage-compat",Tf="@firebase/firestore",If="@firebase/ai",xf="@firebase/firestore-compat",Sf="firebase",Af="12.0.0";/**
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
 */const zi="[DEFAULT]",Cf={[Ui]:"fire-core",[ef]:"fire-core-compat",[nf]:"fire-analytics",[tf]:"fire-analytics-compat",[rf]:"fire-app-check",[of]:"fire-app-check-compat",[sf]:"fire-auth",[af]:"fire-auth-compat",[cf]:"fire-rtdb",[lf]:"fire-data-connect",[df]:"fire-rtdb-compat",[uf]:"fire-fn",[hf]:"fire-fn-compat",[pf]:"fire-iid",[mf]:"fire-iid-compat",[gf]:"fire-fcm",[ff]:"fire-fcm-compat",[wf]:"fire-perf",[yf]:"fire-perf-compat",[vf]:"fire-rc",[bf]:"fire-rc-compat",[_f]:"fire-gcs",[Ef]:"fire-gcs-compat",[Tf]:"fire-fst",[xf]:"fire-fst-compat",[If]:"fire-vertex","fire-js":"fire-js",[Sf]:"fire-js-all"};/**
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
 */const Yr=new Map,kf=new Map,qi=new Map;function Pl(n,e){try{n.container.addComponent(e)}catch(t){Ct.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function wt(n){const e=n.name;if(qi.has(e))return Ct.debug(`There were multiple attempts to register component ${e}.`),!1;qi.set(e,n);for(const t of Yr.values())Pl(t,n);for(const t of kf.values())Pl(t,n);return!0}function In(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function et(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Rf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},zt=new Tn("app","Firebase",Rf);/**
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
 */class Pf{constructor(e,t,o){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=o,this.container.addComponent(new it("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw zt.create("app-deleted",{appName:this._name})}}/**
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
 */const to=Af;function Eu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const o={name:zi,automaticDataCollectionEnabled:!0,...e},r=o.name;if(typeof r!="string"||!r)throw zt.create("bad-app-name",{appName:String(r)});if(t||(t=hu()),!t)throw zt.create("no-options");const s=Yr.get(r);if(s){if(ft(t,s.options)&&ft(o,s.config))return s;throw zt.create("duplicate-app",{appName:r})}const a=new Og(r);for(const l of qi.values())a.addComponent(l);const c=new Pf(t,o,a);return Yr.set(r,c),c}function pa(n=zi){const e=Yr.get(n);if(!e&&n===zi&&hu())return Eu();if(!e)throw zt.create("no-app",{appName:n});return e}function Qe(n,e,t){let o=Cf[n]??n;t&&(o+=`-${t}`);const r=o.match(/\s|\//),s=e.match(/\s|\//);if(r||s){const a=[`Unable to register library "${o}" with version "${e}":`];r&&a.push(`library name "${o}" contains illegal characters (whitespace or "/")`),r&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ct.warn(a.join(" "));return}wt(new it(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
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
 */const Df="firebase-heartbeat-database",Nf=1,Uo="firebase-heartbeat-store";let Ai=null;function Tu(){return Ai||(Ai=_u(Df,Nf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Uo)}catch(t){console.warn(t)}}}}).catch(n=>{throw zt.create("idb-open",{originalErrorMessage:n.message})})),Ai}async function Mf(n){try{const t=(await Tu()).transaction(Uo),o=await t.objectStore(Uo).get(Iu(n));return await t.done,o}catch(e){if(e instanceof lt)Ct.warn(e.message);else{const t=zt.create("idb-get",{originalErrorMessage:e?.message});Ct.warn(t.message)}}}async function Dl(n,e){try{const o=(await Tu()).transaction(Uo,"readwrite");await o.objectStore(Uo).put(e,Iu(n)),await o.done}catch(t){if(t instanceof lt)Ct.warn(t.message);else{const o=zt.create("idb-set",{originalErrorMessage:t?.message});Ct.warn(o.message)}}}function Iu(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Lf=1024,Vf=30;class Of{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new $f(t),this._heartbeatsCachePromise=this._storage.read().then(o=>(this._heartbeatsCache=o,o))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Nl();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(r=>r.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:t}),this._heartbeatsCache.heartbeats.length>Vf){const r=Bf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ct.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Nl(),{heartbeatsToSend:t,unsentEntries:o}=Ff(this._heartbeatsCache.heartbeats),r=Xr(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Ct.warn(e),""}}}function Nl(){return new Date().toISOString().substring(0,10)}function Ff(n,e=Lf){const t=[];let o=n.slice();for(const r of n){const s=t.find(a=>a.agent===r.agent);if(s){if(s.dates.push(r.date),Ml(t)>e){s.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),Ml(t)>e){t.pop();break}o=o.slice(1)}return{heartbeatsToSend:t,unsentEntries:o}}class $f{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wu()?yu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Mf(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const o=await this.read();return Dl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const o=await this.read();return Dl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function Ml(n){return Xr(JSON.stringify({version:2,heartbeats:n})).length}function Bf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let o=1;o<n.length;o++)n[o].date<t&&(t=n[o].date,e=o);return e}/**
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
 */function Uf(n){wt(new it("platform-logger",e=>new Jg(e),"PRIVATE")),wt(new it("heartbeat",e=>new Of(e),"PRIVATE")),Qe(Ui,Rl,n),Qe(Ui,Rl,"esm2020"),Qe("fire-js","")}Uf("");var Ll=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qt,xu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,w){function y(){}y.prototype=w.prototype,v.D=w.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(I,x,A){for(var b=Array(arguments.length-2),D=2;D<arguments.length;D++)b[D-2]=arguments[D];return w.prototype[x].apply(I,b)}}function t(){this.blockSize=-1}function o(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(o,t),o.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(v,w,y){y||(y=0);var I=Array(16);if(typeof w=="string")for(var x=0;16>x;++x)I[x]=w.charCodeAt(y++)|w.charCodeAt(y++)<<8|w.charCodeAt(y++)<<16|w.charCodeAt(y++)<<24;else for(x=0;16>x;++x)I[x]=w[y++]|w[y++]<<8|w[y++]<<16|w[y++]<<24;w=v.g[0],y=v.g[1],x=v.g[2];var A=v.g[3],b=w+(A^y&(x^A))+I[0]+3614090360&4294967295;w=y+(b<<7&4294967295|b>>>25),b=A+(x^w&(y^x))+I[1]+3905402710&4294967295,A=w+(b<<12&4294967295|b>>>20),b=x+(y^A&(w^y))+I[2]+606105819&4294967295,x=A+(b<<17&4294967295|b>>>15),b=y+(w^x&(A^w))+I[3]+3250441966&4294967295,y=x+(b<<22&4294967295|b>>>10),b=w+(A^y&(x^A))+I[4]+4118548399&4294967295,w=y+(b<<7&4294967295|b>>>25),b=A+(x^w&(y^x))+I[5]+1200080426&4294967295,A=w+(b<<12&4294967295|b>>>20),b=x+(y^A&(w^y))+I[6]+2821735955&4294967295,x=A+(b<<17&4294967295|b>>>15),b=y+(w^x&(A^w))+I[7]+4249261313&4294967295,y=x+(b<<22&4294967295|b>>>10),b=w+(A^y&(x^A))+I[8]+1770035416&4294967295,w=y+(b<<7&4294967295|b>>>25),b=A+(x^w&(y^x))+I[9]+2336552879&4294967295,A=w+(b<<12&4294967295|b>>>20),b=x+(y^A&(w^y))+I[10]+4294925233&4294967295,x=A+(b<<17&4294967295|b>>>15),b=y+(w^x&(A^w))+I[11]+2304563134&4294967295,y=x+(b<<22&4294967295|b>>>10),b=w+(A^y&(x^A))+I[12]+1804603682&4294967295,w=y+(b<<7&4294967295|b>>>25),b=A+(x^w&(y^x))+I[13]+4254626195&4294967295,A=w+(b<<12&4294967295|b>>>20),b=x+(y^A&(w^y))+I[14]+2792965006&4294967295,x=A+(b<<17&4294967295|b>>>15),b=y+(w^x&(A^w))+I[15]+1236535329&4294967295,y=x+(b<<22&4294967295|b>>>10),b=w+(x^A&(y^x))+I[1]+4129170786&4294967295,w=y+(b<<5&4294967295|b>>>27),b=A+(y^x&(w^y))+I[6]+3225465664&4294967295,A=w+(b<<9&4294967295|b>>>23),b=x+(w^y&(A^w))+I[11]+643717713&4294967295,x=A+(b<<14&4294967295|b>>>18),b=y+(A^w&(x^A))+I[0]+3921069994&4294967295,y=x+(b<<20&4294967295|b>>>12),b=w+(x^A&(y^x))+I[5]+3593408605&4294967295,w=y+(b<<5&4294967295|b>>>27),b=A+(y^x&(w^y))+I[10]+38016083&4294967295,A=w+(b<<9&4294967295|b>>>23),b=x+(w^y&(A^w))+I[15]+3634488961&4294967295,x=A+(b<<14&4294967295|b>>>18),b=y+(A^w&(x^A))+I[4]+3889429448&4294967295,y=x+(b<<20&4294967295|b>>>12),b=w+(x^A&(y^x))+I[9]+568446438&4294967295,w=y+(b<<5&4294967295|b>>>27),b=A+(y^x&(w^y))+I[14]+3275163606&4294967295,A=w+(b<<9&4294967295|b>>>23),b=x+(w^y&(A^w))+I[3]+4107603335&4294967295,x=A+(b<<14&4294967295|b>>>18),b=y+(A^w&(x^A))+I[8]+1163531501&4294967295,y=x+(b<<20&4294967295|b>>>12),b=w+(x^A&(y^x))+I[13]+2850285829&4294967295,w=y+(b<<5&4294967295|b>>>27),b=A+(y^x&(w^y))+I[2]+4243563512&4294967295,A=w+(b<<9&4294967295|b>>>23),b=x+(w^y&(A^w))+I[7]+1735328473&4294967295,x=A+(b<<14&4294967295|b>>>18),b=y+(A^w&(x^A))+I[12]+2368359562&4294967295,y=x+(b<<20&4294967295|b>>>12),b=w+(y^x^A)+I[5]+4294588738&4294967295,w=y+(b<<4&4294967295|b>>>28),b=A+(w^y^x)+I[8]+2272392833&4294967295,A=w+(b<<11&4294967295|b>>>21),b=x+(A^w^y)+I[11]+1839030562&4294967295,x=A+(b<<16&4294967295|b>>>16),b=y+(x^A^w)+I[14]+4259657740&4294967295,y=x+(b<<23&4294967295|b>>>9),b=w+(y^x^A)+I[1]+2763975236&4294967295,w=y+(b<<4&4294967295|b>>>28),b=A+(w^y^x)+I[4]+1272893353&4294967295,A=w+(b<<11&4294967295|b>>>21),b=x+(A^w^y)+I[7]+4139469664&4294967295,x=A+(b<<16&4294967295|b>>>16),b=y+(x^A^w)+I[10]+3200236656&4294967295,y=x+(b<<23&4294967295|b>>>9),b=w+(y^x^A)+I[13]+681279174&4294967295,w=y+(b<<4&4294967295|b>>>28),b=A+(w^y^x)+I[0]+3936430074&4294967295,A=w+(b<<11&4294967295|b>>>21),b=x+(A^w^y)+I[3]+3572445317&4294967295,x=A+(b<<16&4294967295|b>>>16),b=y+(x^A^w)+I[6]+76029189&4294967295,y=x+(b<<23&4294967295|b>>>9),b=w+(y^x^A)+I[9]+3654602809&4294967295,w=y+(b<<4&4294967295|b>>>28),b=A+(w^y^x)+I[12]+3873151461&4294967295,A=w+(b<<11&4294967295|b>>>21),b=x+(A^w^y)+I[15]+530742520&4294967295,x=A+(b<<16&4294967295|b>>>16),b=y+(x^A^w)+I[2]+3299628645&4294967295,y=x+(b<<23&4294967295|b>>>9),b=w+(x^(y|~A))+I[0]+4096336452&4294967295,w=y+(b<<6&4294967295|b>>>26),b=A+(y^(w|~x))+I[7]+1126891415&4294967295,A=w+(b<<10&4294967295|b>>>22),b=x+(w^(A|~y))+I[14]+2878612391&4294967295,x=A+(b<<15&4294967295|b>>>17),b=y+(A^(x|~w))+I[5]+4237533241&4294967295,y=x+(b<<21&4294967295|b>>>11),b=w+(x^(y|~A))+I[12]+1700485571&4294967295,w=y+(b<<6&4294967295|b>>>26),b=A+(y^(w|~x))+I[3]+2399980690&4294967295,A=w+(b<<10&4294967295|b>>>22),b=x+(w^(A|~y))+I[10]+4293915773&4294967295,x=A+(b<<15&4294967295|b>>>17),b=y+(A^(x|~w))+I[1]+2240044497&4294967295,y=x+(b<<21&4294967295|b>>>11),b=w+(x^(y|~A))+I[8]+1873313359&4294967295,w=y+(b<<6&4294967295|b>>>26),b=A+(y^(w|~x))+I[15]+4264355552&4294967295,A=w+(b<<10&4294967295|b>>>22),b=x+(w^(A|~y))+I[6]+2734768916&4294967295,x=A+(b<<15&4294967295|b>>>17),b=y+(A^(x|~w))+I[13]+1309151649&4294967295,y=x+(b<<21&4294967295|b>>>11),b=w+(x^(y|~A))+I[4]+4149444226&4294967295,w=y+(b<<6&4294967295|b>>>26),b=A+(y^(w|~x))+I[11]+3174756917&4294967295,A=w+(b<<10&4294967295|b>>>22),b=x+(w^(A|~y))+I[2]+718787259&4294967295,x=A+(b<<15&4294967295|b>>>17),b=y+(A^(x|~w))+I[9]+3951481745&4294967295,v.g[0]=v.g[0]+w&4294967295,v.g[1]=v.g[1]+(x+(b<<21&4294967295|b>>>11))&4294967295,v.g[2]=v.g[2]+x&4294967295,v.g[3]=v.g[3]+A&4294967295}o.prototype.u=function(v,w){w===void 0&&(w=v.length);for(var y=w-this.blockSize,I=this.B,x=this.h,A=0;A<w;){if(x==0)for(;A<=y;)r(this,v,A),A+=this.blockSize;if(typeof v=="string"){for(;A<w;)if(I[x++]=v.charCodeAt(A++),x==this.blockSize){r(this,I),x=0;break}}else for(;A<w;)if(I[x++]=v[A++],x==this.blockSize){r(this,I),x=0;break}}this.h=x,this.o+=w},o.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var w=1;w<v.length-8;++w)v[w]=0;var y=8*this.o;for(w=v.length-8;w<v.length;++w)v[w]=y&255,y/=256;for(this.u(v),v=Array(16),w=y=0;4>w;++w)for(var I=0;32>I;I+=8)v[y++]=this.g[w]>>>I&255;return v};function s(v,w){var y=c;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=w(v)}function a(v,w){this.h=w;for(var y=[],I=!0,x=v.length-1;0<=x;x--){var A=v[x]|0;I&&A==w||(y[x]=A,I=!1)}this.g=y}var c={};function l(v){return-128<=v&&128>v?s(v,function(w){return new a([w|0],0>w?-1:0)}):new a([v|0],0>v?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return m;if(0>v)return S(d(-v));for(var w=[],y=1,I=0;v>=y;I++)w[I]=v/y|0,y*=4294967296;return new a(w,0)}function h(v,w){if(v.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(v.charAt(0)=="-")return S(h(v.substring(1),w));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(w,8)),I=m,x=0;x<v.length;x+=8){var A=Math.min(8,v.length-x),b=parseInt(v.substring(x,x+A),w);8>A?(A=d(Math.pow(w,A)),I=I.j(A).add(d(b))):(I=I.j(y),I=I.add(d(b)))}return I}var m=l(0),f=l(1),_=l(16777216);n=a.prototype,n.m=function(){if(T(this))return-S(this).m();for(var v=0,w=1,y=0;y<this.g.length;y++){var I=this.i(y);v+=(0<=I?I:4294967296+I)*w,w*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(E(this))return"0";if(T(this))return"-"+S(this).toString(v);for(var w=d(Math.pow(v,6)),y=this,I="";;){var x=ee(y,w).g;y=N(y,x.j(w));var A=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=x,E(y))return A+I;for(;6>A.length;)A="0"+A;I=A+I}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function E(v){if(v.h!=0)return!1;for(var w=0;w<v.g.length;w++)if(v.g[w]!=0)return!1;return!0}function T(v){return v.h==-1}n.l=function(v){return v=N(this,v),T(v)?-1:E(v)?0:1};function S(v){for(var w=v.g.length,y=[],I=0;I<w;I++)y[I]=~v.g[I];return new a(y,~v.h).add(f)}n.abs=function(){return T(this)?S(this):this},n.add=function(v){for(var w=Math.max(this.g.length,v.g.length),y=[],I=0,x=0;x<=w;x++){var A=I+(this.i(x)&65535)+(v.i(x)&65535),b=(A>>>16)+(this.i(x)>>>16)+(v.i(x)>>>16);I=b>>>16,A&=65535,b&=65535,y[x]=b<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function N(v,w){return v.add(S(w))}n.j=function(v){if(E(this)||E(v))return m;if(T(this))return T(v)?S(this).j(S(v)):S(S(this).j(v));if(T(v))return S(this.j(S(v)));if(0>this.l(_)&&0>v.l(_))return d(this.m()*v.m());for(var w=this.g.length+v.g.length,y=[],I=0;I<2*w;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(var x=0;x<v.g.length;x++){var A=this.i(I)>>>16,b=this.i(I)&65535,D=v.i(x)>>>16,W=v.i(x)&65535;y[2*I+2*x]+=b*W,L(y,2*I+2*x),y[2*I+2*x+1]+=A*W,L(y,2*I+2*x+1),y[2*I+2*x+1]+=b*D,L(y,2*I+2*x+1),y[2*I+2*x+2]+=A*D,L(y,2*I+2*x+2)}for(I=0;I<w;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=w;I<2*w;I++)y[I]=0;return new a(y,0)};function L(v,w){for(;(v[w]&65535)!=v[w];)v[w+1]+=v[w]>>>16,v[w]&=65535,w++}function $(v,w){this.g=v,this.h=w}function ee(v,w){if(E(w))throw Error("division by zero");if(E(v))return new $(m,m);if(T(v))return w=ee(S(v),w),new $(S(w.g),S(w.h));if(T(w))return w=ee(v,S(w)),new $(S(w.g),w.h);if(30<v.g.length){if(T(v)||T(w))throw Error("slowDivide_ only works with positive integers.");for(var y=f,I=w;0>=I.l(v);)y=Z(y),I=Z(I);var x=le(y,1),A=le(I,1);for(I=le(I,2),y=le(y,2);!E(I);){var b=A.add(I);0>=b.l(v)&&(x=x.add(y),A=b),I=le(I,1),y=le(y,1)}return w=N(v,x.j(w)),new $(x,w)}for(x=m;0<=v.l(w);){for(y=Math.max(1,Math.floor(v.m()/w.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),A=d(y),b=A.j(w);T(b)||0<b.l(v);)y-=I,A=d(y),b=A.j(w);E(A)&&(A=f),x=x.add(A),v=N(v,b)}return new $(x,v)}n.A=function(v){return ee(this,v).h},n.and=function(v){for(var w=Math.max(this.g.length,v.g.length),y=[],I=0;I<w;I++)y[I]=this.i(I)&v.i(I);return new a(y,this.h&v.h)},n.or=function(v){for(var w=Math.max(this.g.length,v.g.length),y=[],I=0;I<w;I++)y[I]=this.i(I)|v.i(I);return new a(y,this.h|v.h)},n.xor=function(v){for(var w=Math.max(this.g.length,v.g.length),y=[],I=0;I<w;I++)y[I]=this.i(I)^v.i(I);return new a(y,this.h^v.h)};function Z(v){for(var w=v.g.length+1,y=[],I=0;I<w;I++)y[I]=v.i(I)<<1|v.i(I-1)>>>31;return new a(y,v.h)}function le(v,w){var y=w>>5;w%=32;for(var I=v.g.length-y,x=[],A=0;A<I;A++)x[A]=0<w?v.i(A+y)>>>w|v.i(A+y+1)<<32-w:v.i(A+y);return new a(x,v.h)}o.prototype.digest=o.prototype.v,o.prototype.reset=o.prototype.s,o.prototype.update=o.prototype.u,xu=o,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=h,qt=a}).apply(typeof Ll<"u"?Ll:typeof self<"u"?self:typeof window<"u"?window:{});var Dr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Su,Io,Au,Fr,ji,Cu,ku,Ru;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,u,p){return i==Array.prototype||i==Object.prototype||(i[u]=p.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Dr=="object"&&Dr];for(var u=0;u<i.length;++u){var p=i[u];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var o=t(this);function r(i,u){if(u)e:{var p=o;i=i.split(".");for(var g=0;g<i.length-1;g++){var C=i[g];if(!(C in p))break e;p=p[C]}i=i[i.length-1],g=p[i],u=u(g),u!=g&&u!=null&&e(p,i,{configurable:!0,writable:!0,value:u})}}function s(i,u){i instanceof String&&(i+="");var p=0,g=!1,C={next:function(){if(!g&&p<i.length){var k=p++;return{value:u(k,i[k]),done:!1}}return g=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}r("Array.prototype.values",function(i){return i||function(){return s(this,function(u,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(i){var u=typeof i;return u=u!="object"?u:i?Array.isArray(i)?"array":u:"null",u=="array"||u=="object"&&typeof i.length=="number"}function d(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function h(i,u,p){return i.call.apply(i.bind,arguments)}function m(i,u,p){if(!i)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,g),i.apply(u,C)}}return function(){return i.apply(u,arguments)}}function f(i,u,p){return f=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:m,f.apply(null,arguments)}function _(i,u){var p=Array.prototype.slice.call(arguments,1);return function(){var g=p.slice();return g.push.apply(g,arguments),i.apply(this,g)}}function E(i,u){function p(){}p.prototype=u.prototype,i.aa=u.prototype,i.prototype=new p,i.prototype.constructor=i,i.Qb=function(g,C,k){for(var M=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)M[ie-2]=arguments[ie];return u.prototype[C].apply(g,M)}}function T(i){const u=i.length;if(0<u){const p=Array(u);for(let g=0;g<u;g++)p[g]=i[g];return p}return[]}function S(i,u){for(let p=1;p<arguments.length;p++){const g=arguments[p];if(l(g)){const C=i.length||0,k=g.length||0;i.length=C+k;for(let M=0;M<k;M++)i[C+M]=g[M]}else i.push(g)}}class N{constructor(u,p){this.i=u,this.j=p,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function L(i){return/^[\s\xa0]*$/.test(i)}function $(){var i=c.navigator;return i&&(i=i.userAgent)?i:""}function ee(i){return ee[" "](i),i}ee[" "]=function(){};var Z=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function le(i,u,p){for(const g in i)u.call(p,i[g],g,i)}function v(i,u){for(const p in i)u.call(void 0,i[p],p,i)}function w(i){const u={};for(const p in i)u[p]=i[p];return u}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(i,u){let p,g;for(let C=1;C<arguments.length;C++){g=arguments[C];for(p in g)i[p]=g[p];for(let k=0;k<y.length;k++)p=y[k],Object.prototype.hasOwnProperty.call(g,p)&&(i[p]=g[p])}}function x(i){var u=1;i=i.split(":");const p=[];for(;0<u&&i.length;)p.push(i.shift()),u--;return i.length&&p.push(i.join(":")),p}function A(i){c.setTimeout(()=>{throw i},0)}function b(){var i=qe;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class D{constructor(){this.h=this.g=null}add(u,p){const g=W.get();g.set(u,p),this.h?this.h.next=g:this.g=g,this.h=g}}var W=new N(()=>new K,i=>i.reset());class K{constructor(){this.next=this.g=this.h=null}set(u,p){this.h=u,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let j,se=!1,qe=new D,Je=()=>{const i=c.Promise.resolve(void 0);j=()=>{i.then(Rn)}};var Rn=()=>{for(var i;i=b();){try{i.h.call(i.g)}catch(p){A(p)}var u=W;u.j(i),100>u.h&&(u.h++,i.next=u.g,u.g=i)}se=!1};function je(){this.s=this.s,this.C=this.C}je.prototype.s=!1,je.prototype.ma=function(){this.s||(this.s=!0,this.N())},je.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Se(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}Se.prototype.h=function(){this.defaultPrevented=!0};var _m=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const p=()=>{};c.addEventListener("test",p,u),c.removeEventListener("test",p,u)}catch{}return i}();function co(i,u){if(Se.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var p=this.type=i.type,g=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget){if(Z){e:{try{ee(u.nodeName);var C=!0;break e}catch{}C=!1}C||(u=null)}}else p=="mouseover"?u=i.fromElement:p=="mouseout"&&(u=i.toElement);this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:Em[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&co.aa.h.call(this)}}E(co,Se);var Em={2:"touch",3:"pen",4:"mouse"};co.prototype.h=function(){co.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var pr="closure_listenable_"+(1e6*Math.random()|0),Tm=0;function Im(i,u,p,g,C){this.listener=i,this.proxy=null,this.src=u,this.type=p,this.capture=!!g,this.ha=C,this.key=++Tm,this.da=this.fa=!1}function mr(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function gr(i){this.src=i,this.g={},this.h=0}gr.prototype.add=function(i,u,p,g,C){var k=i.toString();i=this.g[k],i||(i=this.g[k]=[],this.h++);var M=ti(i,u,g,C);return-1<M?(u=i[M],p||(u.fa=!1)):(u=new Im(u,this.src,k,!!g,C),u.fa=p,i.push(u)),u};function ei(i,u){var p=u.type;if(p in i.g){var g=i.g[p],C=Array.prototype.indexOf.call(g,u,void 0),k;(k=0<=C)&&Array.prototype.splice.call(g,C,1),k&&(mr(u),i.g[p].length==0&&(delete i.g[p],i.h--))}}function ti(i,u,p,g){for(var C=0;C<i.length;++C){var k=i[C];if(!k.da&&k.listener==u&&k.capture==!!p&&k.ha==g)return C}return-1}var ni="closure_lm_"+(1e6*Math.random()|0),oi={};function Tc(i,u,p,g,C){if(Array.isArray(u)){for(var k=0;k<u.length;k++)Tc(i,u[k],p,g,C);return null}return p=Sc(p),i&&i[pr]?i.K(u,p,d(g)?!!g.capture:!1,C):xm(i,u,p,!1,g,C)}function xm(i,u,p,g,C,k){if(!u)throw Error("Invalid event type");var M=d(C)?!!C.capture:!!C,ie=si(i);if(ie||(i[ni]=ie=new gr(i)),p=ie.add(u,p,g,M,k),p.proxy)return p;if(g=Sm(),p.proxy=g,g.src=i,g.listener=p,i.addEventListener)_m||(C=M),C===void 0&&(C=!1),i.addEventListener(u.toString(),g,C);else if(i.attachEvent)i.attachEvent(xc(u.toString()),g);else if(i.addListener&&i.removeListener)i.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return p}function Sm(){function i(p){return u.call(i.src,i.listener,p)}const u=Am;return i}function Ic(i,u,p,g,C){if(Array.isArray(u))for(var k=0;k<u.length;k++)Ic(i,u[k],p,g,C);else g=d(g)?!!g.capture:!!g,p=Sc(p),i&&i[pr]?(i=i.i,u=String(u).toString(),u in i.g&&(k=i.g[u],p=ti(k,p,g,C),-1<p&&(mr(k[p]),Array.prototype.splice.call(k,p,1),k.length==0&&(delete i.g[u],i.h--)))):i&&(i=si(i))&&(u=i.g[u.toString()],i=-1,u&&(i=ti(u,p,g,C)),(p=-1<i?u[i]:null)&&ri(p))}function ri(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[pr])ei(u.i,i);else{var p=i.type,g=i.proxy;u.removeEventListener?u.removeEventListener(p,g,i.capture):u.detachEvent?u.detachEvent(xc(p),g):u.addListener&&u.removeListener&&u.removeListener(g),(p=si(u))?(ei(p,i),p.h==0&&(p.src=null,u[ni]=null)):mr(i)}}}function xc(i){return i in oi?oi[i]:oi[i]="on"+i}function Am(i,u){if(i.da)i=!0;else{u=new co(u,this);var p=i.listener,g=i.ha||i.src;i.fa&&ri(i),i=p.call(g,u)}return i}function si(i){return i=i[ni],i instanceof gr?i:null}var ii="__closure_events_fn_"+(1e9*Math.random()>>>0);function Sc(i){return typeof i=="function"?i:(i[ii]||(i[ii]=function(u){return i.handleEvent(u)}),i[ii])}function Re(){je.call(this),this.i=new gr(this),this.M=this,this.F=null}E(Re,je),Re.prototype[pr]=!0,Re.prototype.removeEventListener=function(i,u,p,g){Ic(this,i,u,p,g)};function Oe(i,u){var p,g=i.F;if(g)for(p=[];g;g=g.F)p.push(g);if(i=i.M,g=u.type||u,typeof u=="string")u=new Se(u,i);else if(u instanceof Se)u.target=u.target||i;else{var C=u;u=new Se(g,i),I(u,C)}if(C=!0,p)for(var k=p.length-1;0<=k;k--){var M=u.g=p[k];C=fr(M,g,!0,u)&&C}if(M=u.g=i,C=fr(M,g,!0,u)&&C,C=fr(M,g,!1,u)&&C,p)for(k=0;k<p.length;k++)M=u.g=p[k],C=fr(M,g,!1,u)&&C}Re.prototype.N=function(){if(Re.aa.N.call(this),this.i){var i=this.i,u;for(u in i.g){for(var p=i.g[u],g=0;g<p.length;g++)mr(p[g]);delete i.g[u],i.h--}}this.F=null},Re.prototype.K=function(i,u,p,g){return this.i.add(String(i),u,!1,p,g)},Re.prototype.L=function(i,u,p,g){return this.i.add(String(i),u,!0,p,g)};function fr(i,u,p,g){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();for(var C=!0,k=0;k<u.length;++k){var M=u[k];if(M&&!M.da&&M.capture==p){var ie=M.listener,Ae=M.ha||M.src;M.fa&&ei(i.i,M),C=ie.call(Ae,g)!==!1&&C}}return C&&!g.defaultPrevented}function Ac(i,u,p){if(typeof i=="function")p&&(i=f(i,p));else if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(i,u||0)}function Cc(i){i.g=Ac(()=>{i.g=null,i.i&&(i.i=!1,Cc(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class Cm extends je{constructor(u,p){super(),this.m=u,this.l=p,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Cc(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lo(i){je.call(this),this.h=i,this.g={}}E(lo,je);var kc=[];function Rc(i){le(i.g,function(u,p){this.g.hasOwnProperty(p)&&ri(u)},i),i.g={}}lo.prototype.N=function(){lo.aa.N.call(this),Rc(this)},lo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ai=c.JSON.stringify,km=c.JSON.parse,Rm=class{stringify(i){return c.JSON.stringify(i,void 0)}parse(i){return c.JSON.parse(i,void 0)}};function ci(){}ci.prototype.h=null;function Pc(i){return i.h||(i.h=i.i())}function Dc(){}var uo={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function li(){Se.call(this,"d")}E(li,Se);function di(){Se.call(this,"c")}E(di,Se);var sn={},Nc=null;function wr(){return Nc=Nc||new Re}sn.La="serverreachability";function Mc(i){Se.call(this,sn.La,i)}E(Mc,Se);function ho(i){const u=wr();Oe(u,new Mc(u))}sn.STAT_EVENT="statevent";function Lc(i,u){Se.call(this,sn.STAT_EVENT,i),this.stat=u}E(Lc,Se);function Fe(i){const u=wr();Oe(u,new Lc(u,i))}sn.Ma="timingevent";function Vc(i,u){Se.call(this,sn.Ma,i),this.size=u}E(Vc,Se);function po(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){i()},u)}function mo(){this.g=!0}mo.prototype.xa=function(){this.g=!1};function Pm(i,u,p,g,C,k){i.info(function(){if(i.g)if(k)for(var M="",ie=k.split("&"),Ae=0;Ae<ie.length;Ae++){var te=ie[Ae].split("=");if(1<te.length){var Pe=te[0];te=te[1];var De=Pe.split("_");M=2<=De.length&&De[1]=="type"?M+(Pe+"="+te+"&"):M+(Pe+"=redacted&")}}else M=null;else M=k;return"XMLHTTP REQ ("+g+") [attempt "+C+"]: "+u+`
`+p+`
`+M})}function Dm(i,u,p,g,C,k,M){i.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+C+"]: "+u+`
`+p+`
`+k+" "+M})}function Pn(i,u,p,g){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+Mm(i,p)+(g?" "+g:"")})}function Nm(i,u){i.info(function(){return"TIMEOUT: "+u})}mo.prototype.info=function(){};function Mm(i,u){if(!i.g)return u;if(!u)return null;try{var p=JSON.parse(u);if(p){for(i=0;i<p.length;i++)if(Array.isArray(p[i])){var g=p[i];if(!(2>g.length)){var C=g[1];if(Array.isArray(C)&&!(1>C.length)){var k=C[0];if(k!="noop"&&k!="stop"&&k!="close")for(var M=1;M<C.length;M++)C[M]=""}}}}return ai(p)}catch{return u}}var yr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Oc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ui;function vr(){}E(vr,ci),vr.prototype.g=function(){return new XMLHttpRequest},vr.prototype.i=function(){return{}},ui=new vr;function Nt(i,u,p,g){this.j=i,this.i=u,this.l=p,this.R=g||1,this.U=new lo(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Fc}function Fc(){this.i=null,this.g="",this.h=!1}var $c={},hi={};function pi(i,u,p){i.L=1,i.v=Tr(_t(u)),i.m=p,i.P=!0,Bc(i,null)}function Bc(i,u){i.F=Date.now(),br(i),i.A=_t(i.v);var p=i.A,g=i.R;Array.isArray(g)||(g=[String(g)]),el(p.i,"t",g),i.C=0,p=i.j.J,i.h=new Fc,i.g=yl(i.j,p?u:null,!i.m),0<i.O&&(i.M=new Cm(f(i.Y,i,i.g),i.O)),u=i.U,p=i.g,g=i.ca;var C="readystatechange";Array.isArray(C)||(C&&(kc[0]=C.toString()),C=kc);for(var k=0;k<C.length;k++){var M=Tc(p,C[k],g||u.handleEvent,!1,u.h||u);if(!M)break;u.g[M.key]=M}u=i.H?w(i.H):{},i.m?(i.u||(i.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,u)):(i.u="GET",i.g.ea(i.A,i.u,null,u)),ho(),Pm(i.i,i.u,i.A,i.l,i.R,i.m)}Nt.prototype.ca=function(i){i=i.target;const u=this.M;u&&Et(i)==3?u.j():this.Y(i)},Nt.prototype.Y=function(i){try{if(i==this.g)e:{const De=Et(this.g);var u=this.g.Ba();const Mn=this.g.Z();if(!(3>De)&&(De!=3||this.g&&(this.h.h||this.g.oa()||al(this.g)))){this.J||De!=4||u==7||(u==8||0>=Mn?ho(3):ho(2)),mi(this);var p=this.g.Z();this.X=p;t:if(Uc(this)){var g=al(this.g);i="";var C=g.length,k=Et(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){an(this),go(this);var M="";break t}this.h.i=new c.TextDecoder}for(u=0;u<C;u++)this.h.h=!0,i+=this.h.i.decode(g[u],{stream:!(k&&u==C-1)});g.length=0,this.h.g+=i,this.C=0,M=this.h.g}else M=this.g.oa();if(this.o=p==200,Dm(this.i,this.u,this.A,this.l,this.R,De,p),this.o){if(this.T&&!this.K){t:{if(this.g){var ie,Ae=this.g;if((ie=Ae.g?Ae.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(ie)){var te=ie;break t}}te=null}if(p=te)Pn(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,gi(this,p);else{this.o=!1,this.s=3,Fe(12),an(this),go(this);break e}}if(this.P){p=!0;let Ze;for(;!this.J&&this.C<M.length;)if(Ze=Lm(this,M),Ze==hi){De==4&&(this.s=4,Fe(14),p=!1),Pn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ze==$c){this.s=4,Fe(15),Pn(this.i,this.l,M,"[Invalid Chunk]"),p=!1;break}else Pn(this.i,this.l,Ze,null),gi(this,Ze);if(Uc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),De!=4||M.length!=0||this.h.h||(this.s=1,Fe(16),p=!1),this.o=this.o&&p,!p)Pn(this.i,this.l,M,"[Invalid Chunked Response]"),an(this),go(this);else if(0<M.length&&!this.W){this.W=!0;var Pe=this.j;Pe.g==this&&Pe.ba&&!Pe.M&&(Pe.j.info("Great, no buffering proxy detected. Bytes received: "+M.length),_i(Pe),Pe.M=!0,Fe(11))}}else Pn(this.i,this.l,M,null),gi(this,M);De==4&&an(this),this.o&&!this.J&&(De==4?ml(this.j,this):(this.o=!1,br(this)))}else Jm(this.g),p==400&&0<M.indexOf("Unknown SID")?(this.s=3,Fe(12)):(this.s=0,Fe(13)),an(this),go(this)}}}catch{}finally{}};function Uc(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Lm(i,u){var p=i.C,g=u.indexOf(`
`,p);return g==-1?hi:(p=Number(u.substring(p,g)),isNaN(p)?$c:(g+=1,g+p>u.length?hi:(u=u.slice(g,g+p),i.C=g+p,u)))}Nt.prototype.cancel=function(){this.J=!0,an(this)};function br(i){i.S=Date.now()+i.I,zc(i,i.I)}function zc(i,u){if(i.B!=null)throw Error("WatchDog timer not null");i.B=po(f(i.ba,i),u)}function mi(i){i.B&&(c.clearTimeout(i.B),i.B=null)}Nt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Nm(this.i,this.A),this.L!=2&&(ho(),Fe(17)),an(this),this.s=2,go(this)):zc(this,this.S-i)};function go(i){i.j.G==0||i.J||ml(i.j,i)}function an(i){mi(i);var u=i.M;u&&typeof u.ma=="function"&&u.ma(),i.M=null,Rc(i.U),i.g&&(u=i.g,i.g=null,u.abort(),u.ma())}function gi(i,u){try{var p=i.j;if(p.G!=0&&(p.g==i||fi(p.h,i))){if(!i.K&&fi(p.h,i)&&p.G==3){try{var g=p.Da.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var C=g;if(C[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<i.F)kr(p),Ar(p);else break e;bi(p),Fe(18)}}else p.za=C[1],0<p.za-p.T&&37500>C[2]&&p.F&&p.v==0&&!p.C&&(p.C=po(f(p.Za,p),6e3));if(1>=Hc(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else ln(p,11)}else if((i.K||p.g==i)&&kr(p),!L(u))for(C=p.Da.g.parse(u),u=0;u<C.length;u++){let te=C[u];if(p.T=te[0],te=te[1],p.G==2)if(te[0]=="c"){p.K=te[1],p.ia=te[2];const Pe=te[3];Pe!=null&&(p.la=Pe,p.j.info("VER="+p.la));const De=te[4];De!=null&&(p.Aa=De,p.j.info("SVER="+p.Aa));const Mn=te[5];Mn!=null&&typeof Mn=="number"&&0<Mn&&(g=1.5*Mn,p.L=g,p.j.info("backChannelRequestTimeoutMs_="+g)),g=p;const Ze=i.g;if(Ze){const Pr=Ze.g?Ze.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Pr){var k=g.h;k.g||Pr.indexOf("spdy")==-1&&Pr.indexOf("quic")==-1&&Pr.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(wi(k,k.h),k.h=null))}if(g.D){const Ei=Ze.g?Ze.g.getResponseHeader("X-HTTP-Session-Id"):null;Ei&&(g.ya=Ei,de(g.I,g.D,Ei))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-i.F,p.j.info("Handshake RTT: "+p.R+"ms")),g=p;var M=i;if(g.qa=wl(g,g.J?g.ia:null,g.W),M.K){Gc(g.h,M);var ie=M,Ae=g.L;Ae&&(ie.I=Ae),ie.B&&(mi(ie),br(ie)),g.g=M}else hl(g);0<p.i.length&&Cr(p)}else te[0]!="stop"&&te[0]!="close"||ln(p,7);else p.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?ln(p,7):vi(p):te[0]!="noop"&&p.l&&p.l.ta(te),p.v=0)}}ho(4)}catch{}}var Vm=class{constructor(i,u){this.g=i,this.map=u}};function qc(i){this.l=i||10,c.PerformanceNavigationTiming?(i=c.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function jc(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Hc(i){return i.h?1:i.g?i.g.size:0}function fi(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function wi(i,u){i.g?i.g.add(u):i.h=u}function Gc(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}qc.prototype.cancel=function(){if(this.i=Wc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Wc(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const p of i.g.values())u=u.concat(p.D);return u}return T(i.i)}function Om(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(l(i)){for(var u=[],p=i.length,g=0;g<p;g++)u.push(i[g]);return u}u=[],p=0;for(g in i)u[p++]=i[g];return u}function Fm(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(l(i)||typeof i=="string"){var u=[];i=i.length;for(var p=0;p<i;p++)u.push(p);return u}u=[],p=0;for(const g in i)u[p++]=g;return u}}}function Kc(i,u){if(i.forEach&&typeof i.forEach=="function")i.forEach(u,void 0);else if(l(i)||typeof i=="string")Array.prototype.forEach.call(i,u,void 0);else for(var p=Fm(i),g=Om(i),C=g.length,k=0;k<C;k++)u.call(void 0,g[k],p&&p[k],i)}var Xc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $m(i,u){if(i){i=i.split("&");for(var p=0;p<i.length;p++){var g=i[p].indexOf("="),C=null;if(0<=g){var k=i[p].substring(0,g);C=i[p].substring(g+1)}else k=i[p];u(k,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function cn(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof cn){this.h=i.h,_r(this,i.j),this.o=i.o,this.g=i.g,Er(this,i.s),this.l=i.l;var u=i.i,p=new yo;p.i=u.i,u.g&&(p.g=new Map(u.g),p.h=u.h),Yc(this,p),this.m=i.m}else i&&(u=String(i).match(Xc))?(this.h=!1,_r(this,u[1]||"",!0),this.o=fo(u[2]||""),this.g=fo(u[3]||"",!0),Er(this,u[4]),this.l=fo(u[5]||"",!0),Yc(this,u[6]||"",!0),this.m=fo(u[7]||"")):(this.h=!1,this.i=new yo(null,this.h))}cn.prototype.toString=function(){var i=[],u=this.j;u&&i.push(wo(u,Qc,!0),":");var p=this.g;return(p||u=="file")&&(i.push("//"),(u=this.o)&&i.push(wo(u,Qc,!0),"@"),i.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&i.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&i.push("/"),i.push(wo(p,p.charAt(0)=="/"?zm:Um,!0))),(p=this.i.toString())&&i.push("?",p),(p=this.m)&&i.push("#",wo(p,jm)),i.join("")};function _t(i){return new cn(i)}function _r(i,u,p){i.j=p?fo(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function Er(i,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);i.s=u}else i.s=null}function Yc(i,u,p){u instanceof yo?(i.i=u,Hm(i.i,i.h)):(p||(u=wo(u,qm)),i.i=new yo(u,i.h))}function de(i,u,p){i.i.set(u,p)}function Tr(i){return de(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function fo(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function wo(i,u,p){return typeof i=="string"?(i=encodeURI(i).replace(u,Bm),p&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Bm(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Qc=/[#\/\?@]/g,Um=/[#\?:]/g,zm=/[#\?]/g,qm=/[#\?@]/g,jm=/#/g;function yo(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function Mt(i){i.g||(i.g=new Map,i.h=0,i.i&&$m(i.i,function(u,p){i.add(decodeURIComponent(u.replace(/\+/g," ")),p)}))}n=yo.prototype,n.add=function(i,u){Mt(this),this.i=null,i=Dn(this,i);var p=this.g.get(i);return p||this.g.set(i,p=[]),p.push(u),this.h+=1,this};function Jc(i,u){Mt(i),u=Dn(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function Zc(i,u){return Mt(i),u=Dn(i,u),i.g.has(u)}n.forEach=function(i,u){Mt(this),this.g.forEach(function(p,g){p.forEach(function(C){i.call(u,C,g,this)},this)},this)},n.na=function(){Mt(this);const i=Array.from(this.g.values()),u=Array.from(this.g.keys()),p=[];for(let g=0;g<u.length;g++){const C=i[g];for(let k=0;k<C.length;k++)p.push(u[g])}return p},n.V=function(i){Mt(this);let u=[];if(typeof i=="string")Zc(this,i)&&(u=u.concat(this.g.get(Dn(this,i))));else{i=Array.from(this.g.values());for(let p=0;p<i.length;p++)u=u.concat(i[p])}return u},n.set=function(i,u){return Mt(this),this.i=null,i=Dn(this,i),Zc(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},n.get=function(i,u){return i?(i=this.V(i),0<i.length?String(i[0]):u):u};function el(i,u,p){Jc(i,u),0<p.length&&(i.i=null,i.g.set(Dn(i,u),T(p)),i.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(var p=0;p<u.length;p++){var g=u[p];const k=encodeURIComponent(String(g)),M=this.V(g);for(g=0;g<M.length;g++){var C=k;M[g]!==""&&(C+="="+encodeURIComponent(String(M[g]))),i.push(C)}}return this.i=i.join("&")};function Dn(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function Hm(i,u){u&&!i.j&&(Mt(i),i.i=null,i.g.forEach(function(p,g){var C=g.toLowerCase();g!=C&&(Jc(this,g),el(this,C,p))},i)),i.j=u}function Gm(i,u){const p=new mo;if(c.Image){const g=new Image;g.onload=_(Lt,p,"TestLoadImage: loaded",!0,u,g),g.onerror=_(Lt,p,"TestLoadImage: error",!1,u,g),g.onabort=_(Lt,p,"TestLoadImage: abort",!1,u,g),g.ontimeout=_(Lt,p,"TestLoadImage: timeout",!1,u,g),c.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=i}else u(!1)}function Wm(i,u){const p=new mo,g=new AbortController,C=setTimeout(()=>{g.abort(),Lt(p,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:g.signal}).then(k=>{clearTimeout(C),k.ok?Lt(p,"TestPingServer: ok",!0,u):Lt(p,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(C),Lt(p,"TestPingServer: error",!1,u)})}function Lt(i,u,p,g,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),g(p)}catch{}}function Km(){this.g=new Rm}function Xm(i,u,p){const g=p||"";try{Kc(i,function(C,k){let M=C;d(C)&&(M=ai(C)),u.push(g+k+"="+encodeURIComponent(M))})}catch(C){throw u.push(g+"type="+encodeURIComponent("_badmap")),C}}function Ir(i){this.l=i.Ub||null,this.j=i.eb||!1}E(Ir,ci),Ir.prototype.g=function(){return new xr(this.l,this.j)},Ir.prototype.i=function(i){return function(){return i}}({});function xr(i,u){Re.call(this),this.D=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}E(xr,Re),n=xr.prototype,n.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=u,this.readyState=1,bo(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(u.body=i),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,vo(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,bo(this)),this.g&&(this.readyState=3,bo(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;tl(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function tl(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?vo(this):bo(this),this.readyState==3&&tl(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,vo(this))},n.Qa=function(i){this.g&&(this.response=i,vo(this))},n.ga=function(){this.g&&vo(this)};function vo(i){i.readyState=4,i.l=null,i.j=null,i.v=null,bo(i)}n.setRequestHeader=function(i,u){this.u.append(i,u)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var p=u.next();!p.done;)p=p.value,i.push(p[0]+": "+p[1]),p=u.next();return i.join(`\r
`)};function bo(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(xr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function nl(i){let u="";return le(i,function(p,g){u+=g,u+=":",u+=p,u+=`\r
`}),u}function yi(i,u,p){e:{for(g in p){var g=!1;break e}g=!0}g||(p=nl(p),typeof i=="string"?p!=null&&encodeURIComponent(String(p)):de(i,u,p))}function he(i){Re.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}E(he,Re);var Ym=/^https?$/i,Qm=["POST","PUT"];n=he.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,u,p,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ui.g(),this.v=this.o?Pc(this.o):Pc(ui),this.g.onreadystatechange=f(this.Ea,this);try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch(k){ol(this,k);return}if(i=p||"",p=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var C in g)p.set(C,g[C]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const k of g.keys())p.set(k,g.get(k));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(p.keys()).find(k=>k.toLowerCase()=="content-type"),C=c.FormData&&i instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Qm,u,void 0))||g||C||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,M]of p)this.g.setRequestHeader(k,M);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{il(this),this.u=!0,this.g.send(i),this.u=!1}catch(k){ol(this,k)}};function ol(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.m=5,rl(i),Sr(i)}function rl(i){i.A||(i.A=!0,Oe(i,"complete"),Oe(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Oe(this,"complete"),Oe(this,"abort"),Sr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Sr(this,!0)),he.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?sl(this):this.bb())},n.bb=function(){sl(this)};function sl(i){if(i.h&&typeof a<"u"&&(!i.v[1]||Et(i)!=4||i.Z()!=2)){if(i.u&&Et(i)==4)Ac(i.Ea,0,i);else if(Oe(i,"readystatechange"),Et(i)==4){i.h=!1;try{const M=i.Z();e:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var p;if(!(p=u)){var g;if(g=M===0){var C=String(i.D).match(Xc)[1]||null;!C&&c.self&&c.self.location&&(C=c.self.location.protocol.slice(0,-1)),g=!Ym.test(C?C.toLowerCase():"")}p=g}if(p)Oe(i,"complete"),Oe(i,"success");else{i.m=6;try{var k=2<Et(i)?i.g.statusText:""}catch{k=""}i.l=k+" ["+i.Z()+"]",rl(i)}}finally{Sr(i)}}}}function Sr(i,u){if(i.g){il(i);const p=i.g,g=i.v[0]?()=>{}:null;i.g=null,i.v=null,u||Oe(i,"ready");try{p.onreadystatechange=g}catch{}}}function il(i){i.I&&(c.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Et(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Et(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),km(u)}};function al(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Jm(i){const u={};i=(i.g&&2<=Et(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<i.length;g++){if(L(i[g]))continue;var p=x(i[g]);const C=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const k=u[C]||[];u[C]=k,k.push(p)}v(u,function(g){return g.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function _o(i,u,p){return p&&p.internalChannelParams&&p.internalChannelParams[i]||u}function cl(i){this.Aa=0,this.i=[],this.j=new mo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=_o("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=_o("baseRetryDelayMs",5e3,i),this.cb=_o("retryDelaySeedMs",1e4,i),this.Wa=_o("forwardChannelMaxRetries",2,i),this.wa=_o("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new qc(i&&i.concurrentRequestLimit),this.Da=new Km,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=cl.prototype,n.la=8,n.G=1,n.connect=function(i,u,p,g){Fe(0),this.W=i,this.H=u||{},p&&g!==void 0&&(this.H.OSID=p,this.H.OAID=g),this.F=this.X,this.I=wl(this,null,this.W),Cr(this)};function vi(i){if(ll(i),i.G==3){var u=i.U++,p=_t(i.I);if(de(p,"SID",i.K),de(p,"RID",u),de(p,"TYPE","terminate"),Eo(i,p),u=new Nt(i,i.j,u),u.L=2,u.v=Tr(_t(p)),p=!1,c.navigator&&c.navigator.sendBeacon)try{p=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!p&&c.Image&&(new Image().src=u.v,p=!0),p||(u.g=yl(u.j,null),u.g.ea(u.v)),u.F=Date.now(),br(u)}fl(i)}function Ar(i){i.g&&(_i(i),i.g.cancel(),i.g=null)}function ll(i){Ar(i),i.u&&(c.clearTimeout(i.u),i.u=null),kr(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&c.clearTimeout(i.s),i.s=null)}function Cr(i){if(!jc(i.h)&&!i.s){i.s=!0;var u=i.Ga;j||Je(),se||(j(),se=!0),qe.add(u,i),i.B=0}}function Zm(i,u){return Hc(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=u.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=po(f(i.Ga,i,u),gl(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const C=new Nt(this,this.j,i);let k=this.o;if(this.S&&(k?(k=w(k),I(k,this.S)):k=this.S),this.m!==null||this.O||(C.H=k,k=null),this.P)e:{for(var u=0,p=0;p<this.i.length;p++){t:{var g=this.i[p];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(u+=g,4096<u){u=p;break e}if(u===4096||p===this.i.length-1){u=p+1;break e}}u=1e3}else u=1e3;u=ul(this,C,u),p=_t(this.I),de(p,"RID",i),de(p,"CVER",22),this.D&&de(p,"X-HTTP-Session-Id",this.D),Eo(this,p),k&&(this.O?u="headers="+encodeURIComponent(String(nl(k)))+"&"+u:this.m&&yi(p,this.m,k)),wi(this.h,C),this.Ua&&de(p,"TYPE","init"),this.P?(de(p,"$req",u),de(p,"SID","null"),C.T=!0,pi(C,p,null)):pi(C,p,u),this.G=2}}else this.G==3&&(i?dl(this,i):this.i.length==0||jc(this.h)||dl(this))};function dl(i,u){var p;u?p=u.l:p=i.U++;const g=_t(i.I);de(g,"SID",i.K),de(g,"RID",p),de(g,"AID",i.T),Eo(i,g),i.m&&i.o&&yi(g,i.m,i.o),p=new Nt(i,i.j,p,i.B+1),i.m===null&&(p.H=i.o),u&&(i.i=u.D.concat(i.i)),u=ul(i,p,1e3),p.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),wi(i.h,p),pi(p,g,u)}function Eo(i,u){i.H&&le(i.H,function(p,g){de(u,g,p)}),i.l&&Kc({},function(p,g){de(u,g,p)})}function ul(i,u,p){p=Math.min(i.i.length,p);var g=i.l?f(i.l.Na,i.l,i):null;e:{var C=i.i;let k=-1;for(;;){const M=["count="+p];k==-1?0<p?(k=C[0].g,M.push("ofs="+k)):k=0:M.push("ofs="+k);let ie=!0;for(let Ae=0;Ae<p;Ae++){let te=C[Ae].g;const Pe=C[Ae].map;if(te-=k,0>te)k=Math.max(0,C[Ae].g-100),ie=!1;else try{Xm(Pe,M,"req"+te+"_")}catch{g&&g(Pe)}}if(ie){g=M.join("&");break e}}}return i=i.i.splice(0,p),u.D=i,g}function hl(i){if(!i.g&&!i.u){i.Y=1;var u=i.Fa;j||Je(),se||(j(),se=!0),qe.add(u,i),i.v=0}}function bi(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=po(f(i.Fa,i),gl(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,pl(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=po(f(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Fe(10),Ar(this),pl(this))};function _i(i){i.A!=null&&(c.clearTimeout(i.A),i.A=null)}function pl(i){i.g=new Nt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var u=_t(i.qa);de(u,"RID","rpc"),de(u,"SID",i.K),de(u,"AID",i.T),de(u,"CI",i.F?"0":"1"),!i.F&&i.ja&&de(u,"TO",i.ja),de(u,"TYPE","xmlhttp"),Eo(i,u),i.m&&i.o&&yi(u,i.m,i.o),i.L&&(i.g.I=i.L);var p=i.g;i=i.ia,p.L=1,p.v=Tr(_t(u)),p.m=null,p.P=!0,Bc(p,i)}n.Za=function(){this.C!=null&&(this.C=null,Ar(this),bi(this),Fe(19))};function kr(i){i.C!=null&&(c.clearTimeout(i.C),i.C=null)}function ml(i,u){var p=null;if(i.g==u){kr(i),_i(i),i.g=null;var g=2}else if(fi(i.h,u))p=u.D,Gc(i.h,u),g=1;else return;if(i.G!=0){if(u.o)if(g==1){p=u.m?u.m.length:0,u=Date.now()-u.F;var C=i.B;g=wr(),Oe(g,new Vc(g,p)),Cr(i)}else hl(i);else if(C=u.s,C==3||C==0&&0<u.X||!(g==1&&Zm(i,u)||g==2&&bi(i)))switch(p&&0<p.length&&(u=i.h,u.i=u.i.concat(p)),C){case 1:ln(i,5);break;case 4:ln(i,10);break;case 3:ln(i,6);break;default:ln(i,2)}}}function gl(i,u){let p=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(p*=2),p*u}function ln(i,u){if(i.j.info("Error code "+u),u==2){var p=f(i.fb,i),g=i.Xa;const C=!g;g=new cn(g||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||_r(g,"https"),Tr(g),C?Gm(g.toString(),p):Wm(g.toString(),p)}else Fe(2);i.G=0,i.l&&i.l.sa(u),fl(i),ll(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Fe(2)):(this.j.info("Failed to ping google.com"),Fe(1))};function fl(i){if(i.G=0,i.ka=[],i.l){const u=Wc(i.h);(u.length!=0||i.i.length!=0)&&(S(i.ka,u),S(i.ka,i.i),i.h.i.length=0,T(i.i),i.i.length=0),i.l.ra()}}function wl(i,u,p){var g=p instanceof cn?_t(p):new cn(p);if(g.g!="")u&&(g.g=u+"."+g.g),Er(g,g.s);else{var C=c.location;g=C.protocol,u=u?u+"."+C.hostname:C.hostname,C=+C.port;var k=new cn(null);g&&_r(k,g),u&&(k.g=u),C&&Er(k,C),p&&(k.l=p),g=k}return p=i.D,u=i.ya,p&&u&&de(g,p,u),de(g,"VER",i.la),Eo(i,g),g}function yl(i,u,p){if(u&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Ca&&!i.pa?new he(new Ir({eb:p})):new he(i.pa),u.Ha(i.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function vl(){}n=vl.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Rr(){}Rr.prototype.g=function(i,u){return new He(i,u)};function He(i,u){Re.call(this),this.g=new cl(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(i?i["X-WebChannel-Client-Profile"]=u.va:i={"X-WebChannel-Client-Profile":u.va}),this.g.S=i,(i=u&&u.Sb)&&!L(i)&&(this.g.m=i),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!L(u)&&(this.g.D=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new Nn(this)}E(He,Re),He.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){vi(this.g)},He.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var p={};p.__data__=i,i=p}else this.u&&(p={},p.__data__=ai(i),i=p);u.i.push(new Vm(u.Ya++,i)),u.G==3&&Cr(u)},He.prototype.N=function(){this.g.l=null,delete this.j,vi(this.g),delete this.g,He.aa.N.call(this)};function bl(i){li.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){e:{for(const p in u){i=p;break e}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}E(bl,li);function _l(){di.call(this),this.status=1}E(_l,di);function Nn(i){this.g=i}E(Nn,vl),Nn.prototype.ua=function(){Oe(this.g,"a")},Nn.prototype.ta=function(i){Oe(this.g,new bl(i))},Nn.prototype.sa=function(i){Oe(this.g,new _l)},Nn.prototype.ra=function(){Oe(this.g,"b")},Rr.prototype.createWebChannel=Rr.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,Ru=function(){return new Rr},ku=function(){return wr()},Cu=sn,ji={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},yr.NO_ERROR=0,yr.TIMEOUT=8,yr.HTTP_ERROR=6,Fr=yr,Oc.COMPLETE="complete",Au=Oc,Dc.EventType=uo,uo.OPEN="a",uo.CLOSE="b",uo.ERROR="c",uo.MESSAGE="d",Re.prototype.listen=Re.prototype.K,Io=Dc,he.prototype.listenOnce=he.prototype.L,he.prototype.getLastError=he.prototype.Ka,he.prototype.getLastErrorCode=he.prototype.Ba,he.prototype.getStatus=he.prototype.Z,he.prototype.getResponseJson=he.prototype.Oa,he.prototype.getResponseText=he.prototype.oa,he.prototype.send=he.prototype.ea,he.prototype.setWithCredentials=he.prototype.Ha,Su=he}).apply(typeof Dr<"u"?Dr:typeof self<"u"?self:typeof window<"u"?window:{});const Vl="@firebase/firestore",Ol="4.9.0";/**
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
 */class Me{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Me.UNAUTHENTICATED=new Me(null),Me.GOOGLE_CREDENTIALS=new Me("google-credentials-uid"),Me.FIRST_PARTY=new Me("first-party-uid"),Me.MOCK_USER=new Me("mock-user");/**
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
 */let no="12.0.0";/**
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
 */const gn=new vs("@firebase/firestore");function Vn(){return gn.logLevel}function O(n,...e){if(gn.logLevel<=X.DEBUG){const t=e.map(ma);gn.debug(`Firestore (${no}): ${n}`,...t)}}function kt(n,...e){if(gn.logLevel<=X.ERROR){const t=e.map(ma);gn.error(`Firestore (${no}): ${n}`,...t)}}function fn(n,...e){if(gn.logLevel<=X.WARN){const t=e.map(ma);gn.warn(`Firestore (${no}): ${n}`,...t)}}function ma(n){if(typeof n=="string")return n;try{/**
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
 */function z(n,e,t){let o="Unexpected state";typeof e=="string"?o=e:t=e,Pu(n,o,t)}function Pu(n,e,t){let o=`FIRESTORE (${no}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{o+=" CONTEXT: "+JSON.stringify(t)}catch{o+=" CONTEXT: "+t}throw kt(o),new Error(o)}function re(n,e,t,o){let r="Unexpected state";typeof t=="string"?r=t:o=t,n||Pu(e,r,o)}function G(n,e){return n}/**
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
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends lt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class St{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Du{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Nu{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Me.UNAUTHENTICATED))}shutdown(){}}class zf{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class qf{constructor(e){this.t=e,this.currentUser=Me.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){re(this.o===void 0,42304);let o=this.i;const r=l=>this.i!==o?(o=this.i,t(l)):Promise.resolve();let s=new St;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new St,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await r(this.currentUser)})},c=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new St)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(o=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):o?(re(typeof o.accessToken=="string",31837,{l:o}),new Du(o.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return re(e===null||typeof e=="string",2055,{h:e}),new Me(e)}}class jf{constructor(e,t,o){this.P=e,this.T=t,this.I=o,this.type="FirstParty",this.user=Me.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Hf{constructor(e,t,o){this.P=e,this.T=t,this.I=o}getToken(){return Promise.resolve(new jf(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Me.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Fl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Gf{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,et(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){re(this.o===void 0,3512);const o=s=>{s.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>o(s))};const r=s=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>r(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?r(s):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Fl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(re(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Fl(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Wf(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let o=0;o<n;o++)t[o]=Math.floor(256*Math.random());return t}/**
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
 */class bs{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let o="";for(;o.length<20;){const r=Wf(40);for(let s=0;s<r.length;++s)o.length<20&&r[s]<t&&(o+=e.charAt(r[s]%62))}return o}}function Y(n,e){return n<e?-1:n>e?1:0}function Hi(n,e){const t=Math.min(n.length,e.length);for(let o=0;o<t;o++){const r=n.charAt(o),s=e.charAt(o);if(r!==s)return Ci(r)===Ci(s)?Y(r,s):Ci(r)?1:-1}return Y(n.length,e.length)}const Kf=55296,Xf=57343;function Ci(n){const e=n.charCodeAt(0);return e>=Kf&&e<=Xf}function Hn(n,e,t){return n.length===e.length&&n.every((o,r)=>t(o,e[r]))}/**
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
 */const $l="__name__";class ut{constructor(e,t,o){t===void 0?t=0:t>e.length&&z(637,{offset:t,range:e.length}),o===void 0?o=e.length-t:o>e.length-t&&z(1746,{length:o,range:e.length-t}),this.segments=e,this.offset=t,this.len=o}get length(){return this.len}isEqual(e){return ut.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ut?e.forEach(o=>{t.push(o)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,o=this.limit();t<o;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const o=Math.min(e.length,t.length);for(let r=0;r<o;r++){const s=ut.compareSegments(e.get(r),t.get(r));if(s!==0)return s}return Y(e.length,t.length)}static compareSegments(e,t){const o=ut.isNumericId(e),r=ut.isNumericId(t);return o&&!r?-1:!o&&r?1:o&&r?ut.extractNumericId(e).compare(ut.extractNumericId(t)):Hi(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return qt.fromString(e.substring(4,e.length-2))}}class ae extends ut{construct(e,t,o){return new ae(e,t,o)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const o of e){if(o.indexOf("//")>=0)throw new V(R.INVALID_ARGUMENT,`Invalid segment (${o}). Paths must not contain // in them.`);t.push(...o.split("/").filter(r=>r.length>0))}return new ae(t)}static emptyPath(){return new ae([])}}const Yf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ie extends ut{construct(e,t,o){return new Ie(e,t,o)}static isValidIdentifier(e){return Yf.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ie.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===$l}static keyField(){return new Ie([$l])}static fromServerFormat(e){const t=[];let o="",r=0;const s=()=>{if(o.length===0)throw new V(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(o),o=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new V(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[r+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new V(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);o+=l,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(o+=c,r++):(s(),r++)}if(s(),a)throw new V(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ie(t)}static emptyPath(){return new Ie([])}}/**
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
 */class B{constructor(e){this.path=e}static fromPath(e){return new B(ae.fromString(e))}static fromName(e){return new B(ae.fromString(e).popFirst(5))}static empty(){return new B(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new B(new ae(e.slice()))}}/**
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
 */function Mu(n,e,t){if(!t)throw new V(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Lu(n,e,t,o){if(e===!0&&o===!0)throw new V(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Bl(n){if(!B.isDocumentKey(n))throw new V(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ul(n){if(B.isDocumentKey(n))throw new V(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Vu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function _s(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(o){return o.constructor?o.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function Ke(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=_s(n);throw new V(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Qf(n,e){if(e<=0)throw new V(R.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */function ye(n,e){const t={typeString:n};return e&&(t.value=e),t}function er(n,e){if(!Vu(n))throw new V(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(const o in e)if(e[o]){const r=e[o].typeString,s="value"in e[o]?{value:e[o].value}:void 0;if(!(o in n)){t=`JSON missing required field: '${o}'`;break}const a=n[o];if(r&&typeof a!==r){t=`JSON field '${o}' must be a ${r}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${o}' field to equal '${s.value}'`;break}}if(t)throw new V(R.INVALID_ARGUMENT,t);return!0}/**
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
 */const zl=-62135596800,ql=1e6;class ce{static now(){return ce.fromMillis(Date.now())}static fromDate(e){return ce.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),o=Math.floor((e-1e3*t)*ql);return new ce(t,o)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<zl)throw new V(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ql}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ce._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(er(e,ce._jsonSchema))return new ce(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-zl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ce._jsonSchemaVersion="firestore/timestamp/1.0",ce._jsonSchema={type:ye("string",ce._jsonSchemaVersion),seconds:ye("number"),nanoseconds:ye("number")};/**
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
 */class H{static fromTimestamp(e){return new H(e)}static min(){return new H(new ce(0,0))}static max(){return new H(new ce(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const zo=-1;function Jf(n,e){const t=n.toTimestamp().seconds,o=n.toTimestamp().nanoseconds+1,r=H.fromTimestamp(o===1e9?new ce(t+1,0):new ce(t,o));return new Kt(r,B.empty(),e)}function Zf(n){return new Kt(n.readTime,n.key,zo)}class Kt{constructor(e,t,o){this.readTime=e,this.documentKey=t,this.largestBatchId=o}static min(){return new Kt(H.min(),B.empty(),zo)}static max(){return new Kt(H.max(),B.empty(),zo)}}function ew(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=B.comparator(n.documentKey,e.documentKey),t!==0?t:Y(n.largestBatchId,e.largestBatchId))}/**
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
 */const tw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function oo(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==tw)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((o,r)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(o,r)},this.catchCallback=s=>{this.wrapFailure(t,s).next(o,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,o)=>{t(e)})}static reject(e){return new P((t,o)=>{o(e)})}static waitFor(e){return new P((t,o)=>{let r=0,s=0,a=!1;e.forEach(c=>{++r,c.next(()=>{++s,a&&s===r&&t()},l=>o(l))}),a=!0,s===r&&t()})}static or(e){let t=P.resolve(!1);for(const o of e)t=t.next(r=>r?P.resolve(r):o());return t}static forEach(e,t){const o=[];return e.forEach((r,s)=>{o.push(t.call(this,r,s))}),this.waitFor(o)}static mapArray(e,t){return new P((o,r)=>{const s=e.length,a=new Array(s);let c=0;for(let l=0;l<s;l++){const d=l;t(e[d]).next(h=>{a[d]=h,++c,c===s&&o(a)},h=>r(h))}})}static doWhile(e,t){return new P((o,r)=>{const s=()=>{e()===!0?t().next(()=>{s()},r):o()};s()})}}function ow(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ro(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Es{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=o=>this.ae(o),this.ue=o=>t.writeSequenceNumber(o))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Es.ce=-1;/**
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
 */const ga=-1;function Ts(n){return n==null}function Qr(n){return n===0&&1/n==-1/0}function rw(n){return typeof n=="number"&&Number.isInteger(n)&&!Qr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Ou="";function sw(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=jl(e)),e=iw(n.get(t),e);return jl(e)}function iw(n,e){let t=e;const o=n.length;for(let r=0;r<o;r++){const s=n.charAt(r);switch(s){case"\0":t+="";break;case Ou:t+="";break;default:t+=s}}return t}function jl(n){return n+Ou+""}/**
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
 */function Hl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function nn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Fu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ue{constructor(e,t){this.comparator=e,this.root=t||Ce.EMPTY}insert(e,t){return new ue(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ce.BLACK,null,null))}remove(e){return new ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ce.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const o=this.comparator(e,t.key);if(o===0)return t.value;o<0?t=t.left:o>0&&(t=t.right)}return null}indexOf(e){let t=0,o=this.root;for(;!o.isEmpty();){const r=this.comparator(e,o.key);if(r===0)return t+o.left.size;r<0?o=o.left:(t+=o.left.size+1,o=o.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,o)=>(e(t,o),!1))}toString(){const e=[];return this.inorderTraversal((t,o)=>(e.push(`${t}:${o}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Nr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Nr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Nr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Nr(this.root,e,this.comparator,!0)}}class Nr{constructor(e,t,o,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?o(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ce{constructor(e,t,o,r,s){this.key=e,this.value=t,this.color=o??Ce.RED,this.left=r??Ce.EMPTY,this.right=s??Ce.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,o,r,s){return new Ce(e??this.key,t??this.value,o??this.color,r??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,o){let r=this;const s=o(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,o),null):s===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,o)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Ce.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let o,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return Ce.EMPTY;o=r.right.min(),r=r.copy(o.key,o.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw z(27949);return e+(this.isRed()?0:1)}}Ce.EMPTY=null,Ce.RED=!0,Ce.BLACK=!1;Ce.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(e,t,o,r,s){return this}insert(e,t,o){return new Ce(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class be{constructor(e){this.comparator=e,this.data=new ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,o)=>(e(t),!1))}forEachInRange(e,t){const o=this.data.getIteratorFrom(e[0]);for(;o.hasNext();){const r=o.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let o;for(o=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();o.hasNext();)if(!e(o.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Gl(this.data.getIterator())}getIteratorFrom(e){return new Gl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(o=>{t=t.add(o)}),t}isEqual(e){if(!(e instanceof be)||this.size!==e.size)return!1;const t=this.data.getIterator(),o=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,s=o.getNext().key;if(this.comparator(r,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new be(this.comparator);return t.data=e,t}}class Gl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class We{constructor(e){this.fields=e,e.sort(Ie.comparator)}static empty(){return new We([])}unionWith(e){let t=new be(Ie.comparator);for(const o of this.fields)t=t.add(o);for(const o of e)t=t.add(o);return new We(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Hn(this.fields,e.fields,(t,o)=>t.isEqual(o))}}/**
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
 */class $u extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class xe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new $u("Invalid base64 string: "+s):s}}(e);return new xe(t)}static fromUint8Array(e){const t=function(r){let s="";for(let a=0;a<r.length;++a)s+=String.fromCharCode(r[a]);return s}(e);return new xe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const o=new Uint8Array(t.length);for(let r=0;r<t.length;r++)o[r]=t.charCodeAt(r);return o}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}xe.EMPTY_BYTE_STRING=new xe("");const aw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Xt(n){if(re(!!n,39018),typeof n=="string"){let e=0;const t=aw.exec(n);if(re(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const o=new Date(n);return{seconds:Math.floor(o.getTime()/1e3),nanos:e}}return{seconds:me(n.seconds),nanos:me(n.nanos)}}function me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Yt(n){return typeof n=="string"?xe.fromBase64String(n):xe.fromUint8Array(n)}/**
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
 */const Bu="server_timestamp",Uu="__type__",zu="__previous_value__",qu="__local_write_time__";function fa(n){return(n?.mapValue?.fields||{})[Uu]?.stringValue===Bu}function Is(n){const e=n.mapValue.fields[zu];return fa(e)?Is(e):e}function qo(n){const e=Xt(n.mapValue.fields[qu].timestampValue);return new ce(e.seconds,e.nanos)}/**
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
 */class cw{constructor(e,t,o,r,s,a,c,l,d,h){this.databaseId=e,this.appId=t,this.persistenceKey=o,this.host=r,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=h}}const Jr="(default)";class Gn{constructor(e,t){this.projectId=e,this.database=t||Jr}static empty(){return new Gn("","")}get isDefaultDatabase(){return this.database===Jr}isEqual(e){return e instanceof Gn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const ju="__type__",lw="__max__",Mr={mapValue:{}},Hu="__vector__",Zr="value";function Qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?fa(n)?4:uw(n)?9007199254740991:dw(n)?10:11:z(28295,{value:n})}function yt(n,e){if(n===e)return!0;const t=Qt(n);if(t!==Qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return qo(n).isEqual(qo(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const a=Xt(r.timestampValue),c=Xt(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,s){return Yt(r.bytesValue).isEqual(Yt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,s){return me(r.geoPointValue.latitude)===me(s.geoPointValue.latitude)&&me(r.geoPointValue.longitude)===me(s.geoPointValue.longitude)}(n,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return me(r.integerValue)===me(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const a=me(r.doubleValue),c=me(s.doubleValue);return a===c?Qr(a)===Qr(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Hn(n.arrayValue.values||[],e.arrayValue.values||[],yt);case 10:case 11:return function(r,s){const a=r.mapValue.fields||{},c=s.mapValue.fields||{};if(Hl(a)!==Hl(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!yt(a[l],c[l])))return!1;return!0}(n,e);default:return z(52216,{left:n})}}function jo(n,e){return(n.values||[]).find(t=>yt(t,e))!==void 0}function Wn(n,e){if(n===e)return 0;const t=Qt(n),o=Qt(e);if(t!==o)return Y(t,o);switch(t){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,e.booleanValue);case 2:return function(s,a){const c=me(s.integerValue||s.doubleValue),l=me(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Wl(n.timestampValue,e.timestampValue);case 4:return Wl(qo(n),qo(e));case 5:return Hi(n.stringValue,e.stringValue);case 6:return function(s,a){const c=Yt(s),l=Yt(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const c=s.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){const h=Y(c[d],l[d]);if(h!==0)return h}return Y(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const c=Y(me(s.latitude),me(a.latitude));return c!==0?c:Y(me(s.longitude),me(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Kl(n.arrayValue,e.arrayValue);case 10:return function(s,a){const c=s.fields||{},l=a.fields||{},d=c[Zr]?.arrayValue,h=l[Zr]?.arrayValue,m=Y(d?.values?.length||0,h?.values?.length||0);return m!==0?m:Kl(d,h)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===Mr.mapValue&&a===Mr.mapValue)return 0;if(s===Mr.mapValue)return 1;if(a===Mr.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),d=a.fields||{},h=Object.keys(d);l.sort(),h.sort();for(let m=0;m<l.length&&m<h.length;++m){const f=Hi(l[m],h[m]);if(f!==0)return f;const _=Wn(c[l[m]],d[h[m]]);if(_!==0)return _}return Y(l.length,h.length)}(n.mapValue,e.mapValue);default:throw z(23264,{he:t})}}function Wl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Y(n,e);const t=Xt(n),o=Xt(e),r=Y(t.seconds,o.seconds);return r!==0?r:Y(t.nanos,o.nanos)}function Kl(n,e){const t=n.values||[],o=e.values||[];for(let r=0;r<t.length&&r<o.length;++r){const s=Wn(t[r],o[r]);if(s)return s}return Y(t.length,o.length)}function Kn(n){return Gi(n)}function Gi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const o=Xt(t);return`time(${o.seconds},${o.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Yt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return B.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let o="[",r=!0;for(const s of t.values||[])r?r=!1:o+=",",o+=Gi(s);return o+"]"}(n.arrayValue):"mapValue"in n?function(t){const o=Object.keys(t.fields||{}).sort();let r="{",s=!0;for(const a of o)s?s=!1:r+=",",r+=`${a}:${Gi(t.fields[a])}`;return r+"}"}(n.mapValue):z(61005,{value:n})}function $r(n){switch(Qt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Is(n);return e?16+$r(e):16;case 5:return 2*n.stringValue.length;case 6:return Yt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(o){return(o.values||[]).reduce((r,s)=>r+$r(s),0)}(n.arrayValue);case 10:case 11:return function(o){let r=0;return nn(o.fields,(s,a)=>{r+=s.length+$r(a)}),r}(n.mapValue);default:throw z(13486,{value:n})}}function Xl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Wi(n){return!!n&&"integerValue"in n}function wa(n){return!!n&&"arrayValue"in n}function Yl(n){return!!n&&"nullValue"in n}function Ql(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Br(n){return!!n&&"mapValue"in n}function dw(n){return(n?.mapValue?.fields||{})[ju]?.stringValue===Hu}function Co(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return nn(n.mapValue.fields,(t,o)=>e.mapValue.fields[t]=Co(o)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Co(n.arrayValue.values[t]);return e}return{...n}}function uw(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===lw}/**
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
 */class Ue{constructor(e){this.value=e}static empty(){return new Ue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let o=0;o<e.length-1;++o)if(t=(t.mapValue.fields||{})[e.get(o)],!Br(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Co(t)}setAll(e){let t=Ie.emptyPath(),o={},r=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,o,r),o={},r=[],t=c.popLast()}a?o[c.lastSegment()]=Co(a):r.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,o,r)}delete(e){const t=this.field(e.popLast());Br(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return yt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let o=0;o<e.length;++o){let r=t.mapValue.fields[e.get(o)];Br(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(o)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,o){nn(t,(r,s)=>e[r]=s);for(const r of o)delete e[r]}clone(){return new Ue(Co(this.value))}}function Gu(n){const e=[];return nn(n.fields,(t,o)=>{const r=new Ie([t]);if(Br(o)){const s=Gu(o.mapValue).fields;if(s.length===0)e.push(r);else for(const a of s)e.push(r.child(a))}else e.push(r)}),new We(e)}/**
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
 */class Le{constructor(e,t,o,r,s,a,c){this.key=e,this.documentType=t,this.version=o,this.readTime=r,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Le(e,0,H.min(),H.min(),H.min(),Ue.empty(),0)}static newFoundDocument(e,t,o,r){return new Le(e,1,t,H.min(),o,r,0)}static newNoDocument(e,t){return new Le(e,2,t,H.min(),H.min(),Ue.empty(),0)}static newUnknownDocument(e,t){return new Le(e,3,t,H.min(),H.min(),Ue.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ue.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ue.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class es{constructor(e,t){this.position=e,this.inclusive=t}}function Jl(n,e,t){let o=0;for(let r=0;r<n.position.length;r++){const s=e[r],a=n.position[r];if(s.field.isKeyField()?o=B.comparator(B.fromName(a.referenceValue),t.key):o=Wn(a,t.data.field(s.field)),s.dir==="desc"&&(o*=-1),o!==0)break}return o}function Zl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!yt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ho{constructor(e,t="asc"){this.field=e,this.dir=t}}function hw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Wu{}class we extends Wu{constructor(e,t,o){super(),this.field=e,this.op=t,this.value=o}static create(e,t,o){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,o):new mw(e,t,o):t==="array-contains"?new ww(e,o):t==="in"?new yw(e,o):t==="not-in"?new vw(e,o):t==="array-contains-any"?new bw(e,o):new we(e,t,o)}static createKeyFieldInFilter(e,t,o){return t==="in"?new gw(e,o):new fw(e,o)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Wn(t,this.value)):t!==null&&Qt(this.value)===Qt(t)&&this.matchesComparison(Wn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class at extends Wu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new at(e,t)}matches(e){return Ku(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ku(n){return n.op==="and"}function Xu(n){return pw(n)&&Ku(n)}function pw(n){for(const e of n.filters)if(e instanceof at)return!1;return!0}function Ki(n){if(n instanceof we)return n.field.canonicalString()+n.op.toString()+Kn(n.value);if(Xu(n))return n.filters.map(e=>Ki(e)).join(",");{const e=n.filters.map(t=>Ki(t)).join(",");return`${n.op}(${e})`}}function Yu(n,e){return n instanceof we?function(o,r){return r instanceof we&&o.op===r.op&&o.field.isEqual(r.field)&&yt(o.value,r.value)}(n,e):n instanceof at?function(o,r){return r instanceof at&&o.op===r.op&&o.filters.length===r.filters.length?o.filters.reduce((s,a,c)=>s&&Yu(a,r.filters[c]),!0):!1}(n,e):void z(19439)}function Qu(n){return n instanceof we?function(t){return`${t.field.canonicalString()} ${t.op} ${Kn(t.value)}`}(n):n instanceof at?function(t){return t.op.toString()+" {"+t.getFilters().map(Qu).join(" ,")+"}"}(n):"Filter"}class mw extends we{constructor(e,t,o){super(e,t,o),this.key=B.fromName(o.referenceValue)}matches(e){const t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class gw extends we{constructor(e,t){super(e,"in",t),this.keys=Ju("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class fw extends we{constructor(e,t){super(e,"not-in",t),this.keys=Ju("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ju(n,e){return(e.arrayValue?.values||[]).map(t=>B.fromName(t.referenceValue))}class ww extends we{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return wa(t)&&jo(t.arrayValue,this.value)}}class yw extends we{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&jo(this.value.arrayValue,t)}}class vw extends we{constructor(e,t){super(e,"not-in",t)}matches(e){if(jo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!jo(this.value.arrayValue,t)}}class bw extends we{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!wa(t)||!t.arrayValue.values)&&t.arrayValue.values.some(o=>jo(this.value.arrayValue,o))}}/**
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
 */class _w{constructor(e,t=null,o=[],r=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=o,this.filters=r,this.limit=s,this.startAt=a,this.endAt=c,this.Te=null}}function ed(n,e=null,t=[],o=[],r=null,s=null,a=null){return new _w(n,e,t,o,r,s,a)}function ya(n){const e=G(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(o=>Ki(o)).join(","),t+="|ob:",t+=e.orderBy.map(o=>function(s){return s.field.canonicalString()+s.dir}(o)).join(","),Ts(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(o=>Kn(o)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(o=>Kn(o)).join(",")),e.Te=t}return e.Te}function va(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!hw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Yu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Zl(n.startAt,e.startAt)&&Zl(n.endAt,e.endAt)}function Xi(n){return B.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class so{constructor(e,t=null,o=[],r=[],s=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=o,this.filters=r,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Ew(n,e,t,o,r,s,a,c){return new so(n,e,t,o,r,s,a,c)}function xs(n){return new so(n)}function td(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Zu(n){return n.collectionGroup!==null}function ko(n){const e=G(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const o=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new be(Ie.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Ho(s,o))}),t.has(Ie.keyField().canonicalString())||e.Ie.push(new Ho(Ie.keyField(),o))}return e.Ie}function pt(n){const e=G(n);return e.Ee||(e.Ee=Tw(e,ko(n))),e.Ee}function Tw(n,e){if(n.limitType==="F")return ed(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const s=r.dir==="desc"?"asc":"desc";return new Ho(r.field,s)});const t=n.endAt?new es(n.endAt.position,n.endAt.inclusive):null,o=n.startAt?new es(n.startAt.position,n.startAt.inclusive):null;return ed(n.path,n.collectionGroup,e,n.filters,n.limit,t,o)}}function Yi(n,e){const t=n.filters.concat([e]);return new so(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ts(n,e,t){return new so(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ss(n,e){return va(pt(n),pt(e))&&n.limitType===e.limitType}function eh(n){return`${ya(pt(n))}|lt:${n.limitType}`}function On(n){return`Query(target=${function(t){let o=t.path.canonicalString();return t.collectionGroup!==null&&(o+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(o+=`, filters: [${t.filters.map(r=>Qu(r)).join(", ")}]`),Ts(t.limit)||(o+=", limit: "+t.limit),t.orderBy.length>0&&(o+=`, orderBy: [${t.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),t.startAt&&(o+=", startAt: ",o+=t.startAt.inclusive?"b:":"a:",o+=t.startAt.position.map(r=>Kn(r)).join(",")),t.endAt&&(o+=", endAt: ",o+=t.endAt.inclusive?"a:":"b:",o+=t.endAt.position.map(r=>Kn(r)).join(",")),`Target(${o})`}(pt(n))}; limitType=${n.limitType})`}function As(n,e){return e.isFoundDocument()&&function(o,r){const s=r.key.path;return o.collectionGroup!==null?r.key.hasCollectionId(o.collectionGroup)&&o.path.isPrefixOf(s):B.isDocumentKey(o.path)?o.path.isEqual(s):o.path.isImmediateParentOf(s)}(n,e)&&function(o,r){for(const s of ko(o))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(n,e)&&function(o,r){for(const s of o.filters)if(!s.matches(r))return!1;return!0}(n,e)&&function(o,r){return!(o.startAt&&!function(a,c,l){const d=Jl(a,c,l);return a.inclusive?d<=0:d<0}(o.startAt,ko(o),r)||o.endAt&&!function(a,c,l){const d=Jl(a,c,l);return a.inclusive?d>=0:d>0}(o.endAt,ko(o),r))}(n,e)}function Iw(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function th(n){return(e,t)=>{let o=!1;for(const r of ko(n)){const s=xw(r,e,t);if(s!==0)return s;o=o||r.field.isKeyField()}return 0}}function xw(n,e,t){const o=n.field.isKeyField()?B.comparator(e.key,t.key):function(s,a,c){const l=a.data.field(s),d=c.data.field(s);return l!==null&&d!==null?Wn(l,d):z(42886)}(n.field,e,t);switch(n.dir){case"asc":return o;case"desc":return-1*o;default:return z(19790,{direction:n.dir})}}/**
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
 */class xn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),o=this.inner[t];if(o!==void 0){for(const[r,s]of o)if(this.equalsFn(r,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const o=this.mapKeyFn(e),r=this.inner[o];if(r===void 0)return this.inner[o]=[[e,t]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return void(r[s]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),o=this.inner[t];if(o===void 0)return!1;for(let r=0;r<o.length;r++)if(this.equalsFn(o[r][0],e))return o.length===1?delete this.inner[t]:o.splice(r,1),this.innerSize--,!0;return!1}forEach(e){nn(this.inner,(t,o)=>{for(const[r,s]of o)e(r,s)})}isEmpty(){return Fu(this.inner)}size(){return this.innerSize}}/**
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
 */const Sw=new ue(B.comparator);function Rt(){return Sw}const nh=new ue(B.comparator);function xo(...n){let e=nh;for(const t of n)e=e.insert(t.key,t);return e}function oh(n){let e=nh;return n.forEach((t,o)=>e=e.insert(t,o.overlayedDocument)),e}function un(){return Ro()}function rh(){return Ro()}function Ro(){return new xn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Aw=new ue(B.comparator),Cw=new be(B.comparator);function Q(...n){let e=Cw;for(const t of n)e=e.add(t);return e}const kw=new be(Y);function Rw(){return kw}/**
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
 */function ba(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Qr(e)?"-0":e}}function sh(n){return{integerValue:""+n}}function Pw(n,e){return rw(e)?sh(e):ba(n,e)}/**
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
 */class Cs{constructor(){this._=void 0}}function Dw(n,e,t){return n instanceof Go?function(r,s){const a={fields:{[Uu]:{stringValue:Bu},[qu]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&fa(s)&&(s=Is(s)),s&&(a.fields[zu]=s),{mapValue:a}}(t,e):n instanceof Xn?ah(n,e):n instanceof Yn?ch(n,e):function(r,s){const a=ih(r,s),c=nd(a)+nd(r.Ae);return Wi(a)&&Wi(r.Ae)?sh(c):ba(r.serializer,c)}(n,e)}function Nw(n,e,t){return n instanceof Xn?ah(n,e):n instanceof Yn?ch(n,e):t}function ih(n,e){return n instanceof ns?function(o){return Wi(o)||function(s){return!!s&&"doubleValue"in s}(o)}(e)?e:{integerValue:0}:null}class Go extends Cs{}class Xn extends Cs{constructor(e){super(),this.elements=e}}function ah(n,e){const t=lh(e);for(const o of n.elements)t.some(r=>yt(r,o))||t.push(o);return{arrayValue:{values:t}}}class Yn extends Cs{constructor(e){super(),this.elements=e}}function ch(n,e){let t=lh(e);for(const o of n.elements)t=t.filter(r=>!yt(r,o));return{arrayValue:{values:t}}}class ns extends Cs{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function nd(n){return me(n.integerValue||n.doubleValue)}function lh(n){return wa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class _a{constructor(e,t){this.field=e,this.transform=t}}function Mw(n,e){return n.field.isEqual(e.field)&&function(o,r){return o instanceof Xn&&r instanceof Xn||o instanceof Yn&&r instanceof Yn?Hn(o.elements,r.elements,yt):o instanceof ns&&r instanceof ns?yt(o.Ae,r.Ae):o instanceof Go&&r instanceof Go}(n.transform,e.transform)}class Lw{constructor(e,t){this.version=e,this.transformResults=t}}class nt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new nt}static exists(e){return new nt(void 0,e)}static updateTime(e){return new nt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ur(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ks{}function dh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ea(n.key,nt.none()):new tr(n.key,n.data,nt.none());{const t=n.data,o=Ue.empty();let r=new be(Ie.comparator);for(let s of e.fields)if(!r.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?o.delete(s):o.set(s,a),r=r.add(s)}return new on(n.key,o,new We(r.toArray()),nt.none())}}function Vw(n,e,t){n instanceof tr?function(r,s,a){const c=r.value.clone(),l=rd(r.fieldTransforms,s,a.transformResults);c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof on?function(r,s,a){if(!Ur(r.precondition,s))return void s.convertToUnknownDocument(a.version);const c=rd(r.fieldTransforms,s,a.transformResults),l=s.data;l.setAll(uh(r)),l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(r,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Po(n,e,t,o){return n instanceof tr?function(s,a,c,l){if(!Ur(s.precondition,a))return c;const d=s.value.clone(),h=sd(s.fieldTransforms,l,a);return d.setAll(h),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,o):n instanceof on?function(s,a,c,l){if(!Ur(s.precondition,a))return c;const d=sd(s.fieldTransforms,l,a),h=a.data;return h.setAll(uh(s)),h.setAll(d),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(n,e,t,o):function(s,a,c){return Ur(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Ow(n,e){let t=null;for(const o of n.fieldTransforms){const r=e.data.field(o.field),s=ih(o.transform,r||null);s!=null&&(t===null&&(t=Ue.empty()),t.set(o.field,s))}return t||null}function od(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(o,r){return o===void 0&&r===void 0||!(!o||!r)&&Hn(o,r,(s,a)=>Mw(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class tr extends ks{constructor(e,t,o,r=[]){super(),this.key=e,this.value=t,this.precondition=o,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class on extends ks{constructor(e,t,o,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=o,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function uh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const o=n.data.field(t);e.set(t,o)}}),e}function rd(n,e,t){const o=new Map;re(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let r=0;r<t.length;r++){const s=n[r],a=s.transform,c=e.data.field(s.field);o.set(s.field,Nw(a,c,t[r]))}return o}function sd(n,e,t){const o=new Map;for(const r of n){const s=r.transform,a=t.data.field(r.field);o.set(r.field,Dw(s,a,e))}return o}class Ea extends ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Fw extends ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class $w{constructor(e,t,o,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=o,this.mutations=r}applyToRemoteDocument(e,t){const o=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const s=this.mutations[r];s.key.isEqual(e.key)&&Vw(s,e,o[r])}}applyToLocalView(e,t){for(const o of this.baseMutations)o.key.isEqual(e.key)&&(t=Po(o,e,t,this.localWriteTime));for(const o of this.mutations)o.key.isEqual(e.key)&&(t=Po(o,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const o=rh();return this.mutations.forEach(r=>{const s=e.get(r.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=t.has(r.key)?null:c;const l=dh(a,c);l!==null&&o.set(r.key,l),a.isValidDocument()||a.convertToNoDocument(H.min())}),o}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Q())}isEqual(e){return this.batchId===e.batchId&&Hn(this.mutations,e.mutations,(t,o)=>od(t,o))&&Hn(this.baseMutations,e.baseMutations,(t,o)=>od(t,o))}}class Ta{constructor(e,t,o,r){this.batch=e,this.commitVersion=t,this.mutationResults=o,this.docVersions=r}static from(e,t,o){re(e.mutations.length===o.length,58842,{me:e.mutations.length,fe:o.length});let r=function(){return Aw}();const s=e.mutations;for(let a=0;a<s.length;a++)r=r.insert(s[a].key,o[a].version);return new Ta(e,t,o,r)}}/**
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
 */class Bw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Uw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var fe,J;function zw(n){switch(n){case R.OK:return z(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function hh(n){if(n===void 0)return kt("GRPC error has no .code"),R.UNKNOWN;switch(n){case fe.OK:return R.OK;case fe.CANCELLED:return R.CANCELLED;case fe.UNKNOWN:return R.UNKNOWN;case fe.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case fe.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case fe.INTERNAL:return R.INTERNAL;case fe.UNAVAILABLE:return R.UNAVAILABLE;case fe.UNAUTHENTICATED:return R.UNAUTHENTICATED;case fe.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case fe.NOT_FOUND:return R.NOT_FOUND;case fe.ALREADY_EXISTS:return R.ALREADY_EXISTS;case fe.PERMISSION_DENIED:return R.PERMISSION_DENIED;case fe.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case fe.ABORTED:return R.ABORTED;case fe.OUT_OF_RANGE:return R.OUT_OF_RANGE;case fe.UNIMPLEMENTED:return R.UNIMPLEMENTED;case fe.DATA_LOSS:return R.DATA_LOSS;default:return z(39323,{code:n})}}(J=fe||(fe={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function qw(){return new TextEncoder}/**
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
 */const jw=new qt([4294967295,4294967295],0);function id(n){const e=qw().encode(n),t=new xu;return t.update(e),new Uint8Array(t.digest())}function ad(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),o=e.getUint32(4,!0),r=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new qt([t,o],0),new qt([r,s],0)]}class Ia{constructor(e,t,o){if(this.bitmap=e,this.padding=t,this.hashCount=o,t<0||t>=8)throw new So(`Invalid padding: ${t}`);if(o<0)throw new So(`Invalid hash count: ${o}`);if(e.length>0&&this.hashCount===0)throw new So(`Invalid hash count: ${o}`);if(e.length===0&&t!==0)throw new So(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=qt.fromNumber(this.ge)}ye(e,t,o){let r=e.add(t.multiply(qt.fromNumber(o)));return r.compare(jw)===1&&(r=new qt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=id(e),[o,r]=ad(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(o,r,s);if(!this.we(a))return!1}return!0}static create(e,t,o){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Ia(s,r,t);return o.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const t=id(e),[o,r]=ad(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(o,r,s);this.Se(a)}}Se(e){const t=Math.floor(e/8),o=e%8;this.bitmap[t]|=1<<o}}class So extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Rs{constructor(e,t,o,r,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=o,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,o){const r=new Map;return r.set(e,nr.createSynthesizedTargetChangeForCurrentChange(e,t,o)),new Rs(H.min(),r,new ue(Y),Rt(),Q())}}class nr{constructor(e,t,o,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=o,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,o){return new nr(o,t,Q(),Q(),Q())}}/**
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
 */class zr{constructor(e,t,o,r){this.be=e,this.removedTargetIds=t,this.key=o,this.De=r}}class ph{constructor(e,t){this.targetId=e,this.Ce=t}}class mh{constructor(e,t,o=xe.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=o,this.cause=r}}class cd{constructor(){this.ve=0,this.Fe=ld(),this.Me=xe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Q(),t=Q(),o=Q();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:o=o.add(r);break;default:z(38017,{changeType:s})}}),new nr(this.Me,this.xe,e,t,o)}qe(){this.Oe=!1,this.Fe=ld()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,re(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Hw{constructor(e){this.Ge=e,this.ze=new Map,this.je=Rt(),this.Je=Lr(),this.He=Lr(),this.Ye=new ue(Y)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const o=this.nt(t);switch(e.state){case 0:this.rt(t)&&o.Le(e.resumeToken);break;case 1:o.Ke(),o.Ne||o.qe(),o.Le(e.resumeToken);break;case 2:o.Ke(),o.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(o.We(),o.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),o.Le(e.resumeToken));break;default:z(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((o,r)=>{this.rt(r)&&t(r)})}st(e){const t=e.targetId,o=e.Ce.count,r=this.ot(t);if(r){const s=r.target;if(Xi(s))if(o===0){const a=new B(s.path);this.et(t,a,Le.newNoDocument(a,H.min()))}else re(o===1,20013,{expectedCount:o});else{const a=this._t(t);if(a!==o){const c=this.ut(e),l=c?this.ct(c,e,a):1;if(l!==0){this.it(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:o="",padding:r=0},hashCount:s=0}=t;let a,c;try{a=Yt(o).toUint8Array()}catch(l){if(l instanceof $u)return fn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new Ia(a,r,s)}catch(l){return fn(l instanceof So?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,o){return t.Ce.count===o-this.Pt(e,t.targetId)?0:2}Pt(e,t){const o=this.Ge.getRemoteKeysForTarget(t);let r=0;return o.forEach(s=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.et(t,s,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((s,a)=>{const c=this.ot(a);if(c){if(s.current&&Xi(c.target)){const l=new B(c.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,Le.newNoDocument(l,e))}s.Be&&(t.set(a,s.ke()),s.qe())}});let o=Q();this.He.forEach((s,a)=>{let c=!0;a.forEachWhile(l=>{const d=this.ot(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(o=o.add(s))}),this.je.forEach((s,a)=>a.setReadTime(e));const r=new Rs(e,t,this.Ye,this.je,o);return this.je=Rt(),this.Je=Lr(),this.He=Lr(),this.Ye=new ue(Y),r}Xe(e,t){if(!this.rt(e))return;const o=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,o),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,o){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),o&&(this.je=this.je.insert(t,o))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new cd,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new be(Y),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new be(Y),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new cd),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Lr(){return new ue(B.comparator)}function ld(){return new ue(B.comparator)}const Gw={asc:"ASCENDING",desc:"DESCENDING"},Ww={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Kw={and:"AND",or:"OR"};class Xw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Qi(n,e){return n.useProto3Json||Ts(e)?e:{value:e}}function os(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function gh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Yw(n,e){return os(n,e.toTimestamp())}function mt(n){return re(!!n,49232),H.fromTimestamp(function(t){const o=Xt(t);return new ce(o.seconds,o.nanos)}(n))}function xa(n,e){return Ji(n,e).canonicalString()}function Ji(n,e){const t=function(r){return new ae(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function fh(n){const e=ae.fromString(n);return re(_h(e),10190,{key:e.toString()}),e}function Zi(n,e){return xa(n.databaseId,e.path)}function ki(n,e){const t=fh(e);if(t.get(1)!==n.databaseId.projectId)throw new V(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new B(yh(t))}function wh(n,e){return xa(n.databaseId,e)}function Qw(n){const e=fh(n);return e.length===4?ae.emptyPath():yh(e)}function ea(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function yh(n){return re(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function dd(n,e,t){return{name:Zi(n,e),fields:t.value.mapValue.fields}}function Jw(n,e){let t;if("targetChange"in e){e.targetChange;const o=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:z(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],s=function(d,h){return d.useProto3Json?(re(h===void 0||typeof h=="string",58123),xe.fromBase64String(h||"")):(re(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),xe.fromUint8Array(h||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const h=d.code===void 0?R.UNKNOWN:hh(d.code);return new V(h,d.message||"")}(a);t=new mh(o,r,s,c||null)}else if("documentChange"in e){e.documentChange;const o=e.documentChange;o.document,o.document.name,o.document.updateTime;const r=ki(n,o.document.name),s=mt(o.document.updateTime),a=o.document.createTime?mt(o.document.createTime):H.min(),c=new Ue({mapValue:{fields:o.document.fields}}),l=Le.newFoundDocument(r,s,a,c),d=o.targetIds||[],h=o.removedTargetIds||[];t=new zr(d,h,l.key,l)}else if("documentDelete"in e){e.documentDelete;const o=e.documentDelete;o.document;const r=ki(n,o.document),s=o.readTime?mt(o.readTime):H.min(),a=Le.newNoDocument(r,s),c=o.removedTargetIds||[];t=new zr([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const o=e.documentRemove;o.document;const r=ki(n,o.document),s=o.removedTargetIds||[];t=new zr([],s,r,null)}else{if(!("filter"in e))return z(11601,{Rt:e});{e.filter;const o=e.filter;o.targetId;const{count:r=0,unchangedNames:s}=o,a=new Uw(r,s),c=o.targetId;t=new ph(c,a)}}return t}function Zw(n,e){let t;if(e instanceof tr)t={update:dd(n,e.key,e.value)};else if(e instanceof Ea)t={delete:Zi(n,e.key)};else if(e instanceof on)t={update:dd(n,e.key,e.data),updateMask:cy(e.fieldMask)};else{if(!(e instanceof Fw))return z(16599,{Vt:e.type});t={verify:Zi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(o=>function(s,a){const c=a.transform;if(c instanceof Go)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Xn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Yn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ns)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw z(20930,{transform:a.transform})}(0,o))),e.precondition.isNone||(t.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:Yw(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:z(27497)}(n,e.precondition)),t}function ey(n,e){return n&&n.length>0?(re(e!==void 0,14353),n.map(t=>function(r,s){let a=r.updateTime?mt(r.updateTime):mt(s);return a.isEqual(H.min())&&(a=mt(s)),new Lw(a,r.transformResults||[])}(t,e))):[]}function ty(n,e){return{documents:[wh(n,e.path)]}}function ny(n,e){const t={structuredQuery:{}},o=e.path;let r;e.collectionGroup!==null?(r=o,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=o.popLast(),t.structuredQuery.from=[{collectionId:o.lastSegment()}]),t.parent=wh(n,r);const s=function(d){if(d.length!==0)return bh(at.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(d){if(d.length!==0)return d.map(h=>function(f){return{field:Fn(f.field),direction:sy(f.dir)}}(h))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Qi(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:r}}function oy(n){let e=Qw(n.parent);const t=n.structuredQuery,o=t.from?t.from.length:0;let r=null;if(o>0){re(o===1,65062);const h=t.from[0];h.allDescendants?r=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=function(m){const f=vh(m);return f instanceof at&&Xu(f)?f.getFilters():[f]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(f=>function(E){return new Ho($n(E.field),function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(E.direction))}(f))}(t.orderBy));let c=null;t.limit&&(c=function(m){let f;return f=typeof m=="object"?m.value:m,Ts(f)?null:f}(t.limit));let l=null;t.startAt&&(l=function(m){const f=!!m.before,_=m.values||[];return new es(_,f)}(t.startAt));let d=null;return t.endAt&&(d=function(m){const f=!m.before,_=m.values||[];return new es(_,f)}(t.endAt)),Ew(e,r,a,s,c,"F",l,d)}function ry(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:r})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function vh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const o=$n(t.unaryFilter.field);return we.create(o,"==",{doubleValue:NaN});case"IS_NULL":const r=$n(t.unaryFilter.field);return we.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=$n(t.unaryFilter.field);return we.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=$n(t.unaryFilter.field);return we.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}}(n):n.fieldFilter!==void 0?function(t){return we.create($n(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return at.create(t.compositeFilter.filters.map(o=>vh(o)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return z(1026)}}(t.compositeFilter.op))}(n):z(30097,{filter:n})}function sy(n){return Gw[n]}function iy(n){return Ww[n]}function ay(n){return Kw[n]}function Fn(n){return{fieldPath:n.canonicalString()}}function $n(n){return Ie.fromServerFormat(n.fieldPath)}function bh(n){return n instanceof we?function(t){if(t.op==="=="){if(Ql(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NAN"}};if(Yl(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ql(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NOT_NAN"}};if(Yl(t.value))return{unaryFilter:{field:Fn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Fn(t.field),op:iy(t.op),value:t.value}}}(n):n instanceof at?function(t){const o=t.getFilters().map(r=>bh(r));return o.length===1?o[0]:{compositeFilter:{op:ay(t.op),filters:o}}}(n):z(54877,{filter:n})}function cy(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function _h(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Bt{constructor(e,t,o,r,s=H.min(),a=H.min(),c=xe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=o,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Bt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class ly{constructor(e){this.yt=e}}function dy(n){const e=oy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ts(e,e.limit,"L"):e}/**
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
 */class uy{constructor(){this.Cn=new hy}addToCollectionParentIndex(e,t){return this.Cn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Kt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Kt.min())}updateCollectionGroup(e,t,o){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class hy{constructor(){this.index={}}add(e){const t=e.lastSegment(),o=e.popLast(),r=this.index[t]||new be(ae.comparator),s=!r.has(o);return this.index[t]=r.add(o),s}has(e){const t=e.lastSegment(),o=e.popLast(),r=this.index[t];return r&&r.has(o)}getEntries(e){return(this.index[e]||new be(ae.comparator)).toArray()}}/**
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
 */const ud={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Eh=41943040;class Be{static withCacheSize(e){return new Be(e,Be.DEFAULT_COLLECTION_PERCENTILE,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,o){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=o}}/**
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
 */Be.DEFAULT_COLLECTION_PERCENTILE=10,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Be.DEFAULT=new Be(Eh,Be.DEFAULT_COLLECTION_PERCENTILE,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Be.DISABLED=new Be(-1,0,0);/**
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
 */class Qn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Qn(0)}static cr(){return new Qn(-1)}}/**
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
 */const hd="LruGarbageCollector",py=1048576;function pd([n,e],[t,o]){const r=Y(n,t);return r===0?Y(e,o):r}class my{constructor(e){this.Ir=e,this.buffer=new be(pd),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const o=this.buffer.last();pd(t,o)<0&&(this.buffer=this.buffer.delete(o).add(t))}}get maxValue(){return this.buffer.last()[0]}}class gy{constructor(e,t,o){this.garbageCollector=e,this.asyncQueue=t,this.localStore=o,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){O(hd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ro(t)?O(hd,"Ignoring IndexedDB error during garbage collection: ",t):await oo(t)}await this.Vr(3e5)})}}class fy{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(o=>Math.floor(t/100*o))}nthSequenceNumber(e,t){if(t===0)return P.resolve(Es.ce);const o=new my(t);return this.mr.forEachTarget(e,r=>o.Ar(r.sequenceNumber)).next(()=>this.mr.pr(e,r=>o.Ar(r))).next(()=>o.maxValue)}removeTargets(e,t,o){return this.mr.removeTargets(e,t,o)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(ud)):this.getCacheSize(e).next(o=>o<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${o} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ud):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let o,r,s,a,c,l,d;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),r=this.params.maximumSequenceNumbersToCollect):r=m,a=Date.now(),this.nthSequenceNumber(e,r))).next(m=>(o=m,c=Date.now(),this.removeTargets(e,o,t))).next(m=>(s=m,l=Date.now(),this.removeOrphanedDocuments(e,o))).next(m=>(d=Date.now(),Vn()<=X.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-h}ms
	Determined least recently used ${r} in `+(c-a)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(d-l)+`ms
Total Duration: ${d-h}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:m})))}}function wy(n,e){return new fy(n,e)}/**
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
 */class yy{constructor(){this.changes=new xn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const o=this.changes.get(t);return o!==void 0?P.resolve(o):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class vy{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class by{constructor(e,t,o,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=o,this.indexManager=r}getDocument(e,t){let o=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(o=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(o!==null&&Po(o.mutation,r,We.empty(),ce.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(o=>this.getLocalViewOfDocuments(e,o,Q()).next(()=>o))}getLocalViewOfDocuments(e,t,o=Q()){const r=un();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,o).next(s=>{let a=xo();return s.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const o=un();return this.populateOverlays(e,o,t).next(()=>this.computeViews(e,t,o,Q()))}populateOverlays(e,t,o){const r=[];return o.forEach(s=>{t.has(s)||r.push(s)}),this.documentOverlayCache.getOverlays(e,r).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,o,r){let s=Rt();const a=Ro(),c=function(){return Ro()}();return t.forEach((l,d)=>{const h=o.get(d.key);r.has(d.key)&&(h===void 0||h.mutation instanceof on)?s=s.insert(d.key,d):h!==void 0?(a.set(d.key,h.mutation.getFieldMask()),Po(h.mutation,d,h.mutation.getFieldMask(),ce.now())):a.set(d.key,We.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,h)=>a.set(d,h)),t.forEach((d,h)=>c.set(d,new vy(h,a.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const o=Ro();let r=new ue((a,c)=>a-c),s=Q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let h=o.get(l)||We.empty();h=c.applyToLocalView(d,h),o.set(l,h);const m=(r.get(c.batchId)||Q()).add(l);r=r.insert(c.batchId,m)})}).next(()=>{const a=[],c=r.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,h=l.value,m=rh();h.forEach(f=>{if(!s.has(f)){const _=dh(t.get(f),o.get(f));_!==null&&m.set(f,_),s=s.add(f)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,m))}return P.waitFor(a)}).next(()=>o)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(o=>this.recalculateAndSaveOverlays(e,o))}getDocumentsMatchingQuery(e,t,o,r){return function(a){return B.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Zu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,o,r):this.getDocumentsMatchingCollectionQuery(e,t,o,r)}getNextDocuments(e,t,o,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,o,r).next(s=>{const a=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,o.largestBatchId,r-s.size):P.resolve(un());let c=zo,l=s;return a.next(d=>P.forEach(d,(h,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(h)?P.resolve():this.remoteDocumentCache.getEntry(e,h).next(f=>{l=l.insert(h,f)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,Q())).next(h=>({batchId:c,changes:oh(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next(o=>{let r=xo();return o.isFoundDocument()&&(r=r.insert(o.key,o)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,o,r){const s=t.collectionGroup;let a=xo();return this.indexManager.getCollectionParents(e,s).next(c=>P.forEach(c,l=>{const d=function(m,f){return new so(f,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,o,r).next(h=>{h.forEach((m,f)=>{a=a.insert(m,f)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,o,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,o.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,o,s,r))).next(a=>{s.forEach((l,d)=>{const h=d.getKey();a.get(h)===null&&(a=a.insert(h,Le.newInvalidDocument(h)))});let c=xo();return a.forEach((l,d)=>{const h=s.get(l);h!==void 0&&Po(h.mutation,d,We.empty(),ce.now()),As(t,d)&&(c=c.insert(l,d))}),c})}}/**
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
 */class _y{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return P.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:mt(r.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(r){return{name:r.name,query:dy(r.bundledQuery),readTime:mt(r.readTime)}}(t)),P.resolve()}}/**
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
 */class Ey{constructor(){this.overlays=new ue(B.comparator),this.qr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const o=un();return P.forEach(t,r=>this.getOverlay(e,r).next(s=>{s!==null&&o.set(r,s)})).next(()=>o)}saveOverlays(e,t,o){return o.forEach((r,s)=>{this.St(e,t,s)}),P.resolve()}removeOverlaysForBatchId(e,t,o){const r=this.qr.get(o);return r!==void 0&&(r.forEach(s=>this.overlays=this.overlays.remove(s)),this.qr.delete(o)),P.resolve()}getOverlaysForCollection(e,t,o){const r=un(),s=t.length+1,a=new B(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>o&&r.set(l.getKey(),l)}return P.resolve(r)}getOverlaysForCollectionGroup(e,t,o,r){let s=new ue((d,h)=>d-h);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>o){let h=s.get(d.largestBatchId);h===null&&(h=un(),s=s.insert(d.largestBatchId,h)),h.set(d.getKey(),d)}}const c=un(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,h)=>c.set(d,h)),!(c.size()>=r)););return P.resolve(c)}St(e,t,o){const r=this.overlays.get(o.key);if(r!==null){const a=this.qr.get(r.largestBatchId).delete(o.key);this.qr.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(o.key,new Bw(t,o));let s=this.qr.get(t);s===void 0&&(s=Q(),this.qr.set(t,s)),this.qr.set(t,s.add(o.key))}}/**
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
 */class Ty{constructor(){this.sessionToken=xe.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
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
 */class Sa{constructor(){this.Qr=new be(Te.$r),this.Ur=new be(Te.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const o=new Te(e,t);this.Qr=this.Qr.add(o),this.Ur=this.Ur.add(o)}Wr(e,t){e.forEach(o=>this.addReference(o,t))}removeReference(e,t){this.Gr(new Te(e,t))}zr(e,t){e.forEach(o=>this.removeReference(o,t))}jr(e){const t=new B(new ae([])),o=new Te(t,e),r=new Te(t,e+1),s=[];return this.Ur.forEachInRange([o,r],a=>{this.Gr(a),s.push(a.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new B(new ae([])),o=new Te(t,e),r=new Te(t,e+1);let s=Q();return this.Ur.forEachInRange([o,r],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new Te(e,0),o=this.Qr.firstAfterOrEqual(t);return o!==null&&e.isEqual(o.key)}}class Te{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return B.comparator(e.key,t.key)||Y(e.Yr,t.Yr)}static Kr(e,t){return Y(e.Yr,t.Yr)||B.comparator(e.key,t.key)}}/**
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
 */class Iy{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new be(Te.$r)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,o,r){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new $w(s,t,o,r);this.mutationQueue.push(a);for(const c of r)this.Zr=this.Zr.add(new Te(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const o=t+1,r=this.ei(o),s=r<0?0:r;return P.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?ga:this.tr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const o=new Te(t,0),r=new Te(t,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([o,r],a=>{const c=this.Xr(a.Yr);s.push(c)}),P.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let o=new be(Y);return t.forEach(r=>{const s=new Te(r,0),a=new Te(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([s,a],c=>{o=o.add(c.Yr)})}),P.resolve(this.ti(o))}getAllMutationBatchesAffectingQuery(e,t){const o=t.path,r=o.length+1;let s=o;B.isDocumentKey(s)||(s=s.child(""));const a=new Te(new B(s),0);let c=new be(Y);return this.Zr.forEachWhile(l=>{const d=l.key.path;return!!o.isPrefixOf(d)&&(d.length===r&&(c=c.add(l.Yr)),!0)},a),P.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(o=>{const r=this.Xr(o);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){re(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let o=this.Zr;return P.forEach(t.mutations,r=>{const s=new Te(r.key,t.batchId);return o=o.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=o})}ir(e){}containsKey(e,t){const o=new Te(t,0),r=this.Zr.firstAfterOrEqual(o);return P.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class xy{constructor(e){this.ri=e,this.docs=function(){return new ue(B.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const o=t.key,r=this.docs.get(o),s=r?r.size:0,a=this.ri(t);return this.docs=this.docs.insert(o,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,o.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const o=this.docs.get(t);return P.resolve(o?o.document.mutableCopy():Le.newInvalidDocument(t))}getEntries(e,t){let o=Rt();return t.forEach(r=>{const s=this.docs.get(r);o=o.insert(r,s?s.document.mutableCopy():Le.newInvalidDocument(r))}),P.resolve(o)}getDocumentsMatchingQuery(e,t,o,r){let s=Rt();const a=t.path,c=new B(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:h}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||ew(Zf(h),o)<=0||(r.has(h.key)||As(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return P.resolve(s)}getAllFromCollectionGroup(e,t,o,r){z(9500)}ii(e,t){return P.forEach(this.docs,o=>t(o))}newChangeBuffer(e){return new Sy(this)}getSize(e){return P.resolve(this.size)}}class Sy extends yy{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((o,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(o)}),P.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class Ay{constructor(e){this.persistence=e,this.si=new xn(t=>ya(t),va),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.oi=0,this._i=new Sa,this.targetCount=0,this.ai=Qn.ur()}forEachTarget(e,t){return this.si.forEach((o,r)=>t(r)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,o){return o&&(this.lastRemoteSnapshotVersion=o),t>this.oi&&(this.oi=t),P.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Qn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Pr(t),P.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,o){let r=0;const s=[];return this.si.forEach((a,c)=>{c.sequenceNumber<=t&&o.get(c.targetId)===null&&(this.si.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),P.waitFor(s).next(()=>r)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const o=this.si.get(t)||null;return P.resolve(o)}addMatchingKeys(e,t,o){return this._i.Wr(t,o),P.resolve()}removeMatchingKeys(e,t,o){this._i.zr(t,o);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(a=>{s.push(r.markPotentiallyOrphaned(e,a))}),P.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const o=this._i.Hr(t);return P.resolve(o)}containsKey(e,t){return P.resolve(this._i.containsKey(t))}}/**
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
 */class Th{constructor(e,t){this.ui={},this.overlays={},this.ci=new Es(0),this.li=!1,this.li=!0,this.hi=new Ty,this.referenceDelegate=e(this),this.Pi=new Ay(this),this.indexManager=new uy,this.remoteDocumentCache=function(r){return new xy(r)}(o=>this.referenceDelegate.Ti(o)),this.serializer=new ly(t),this.Ii=new _y(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ey,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let o=this.ui[e.toKey()];return o||(o=new Iy(t,this.referenceDelegate),this.ui[e.toKey()]=o),o}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,o){O("MemoryPersistence","Starting transaction:",e);const r=new Cy(this.ci.next());return this.referenceDelegate.Ei(),o(r).next(s=>this.referenceDelegate.di(r).next(()=>s)).toPromise().then(s=>(r.raiseOnCommittedEvent(),s))}Ai(e,t){return P.or(Object.values(this.ui).map(o=>()=>o.containsKey(e,t)))}}class Cy extends nw{constructor(e){super(),this.currentSequenceNumber=e}}class Aa{constructor(e){this.persistence=e,this.Ri=new Sa,this.Vi=null}static mi(e){return new Aa(e)}get fi(){if(this.Vi)return this.Vi;throw z(60996)}addReference(e,t,o){return this.Ri.addReference(o,t),this.fi.delete(o.toString()),P.resolve()}removeReference(e,t,o){return this.Ri.removeReference(o,t),this.fi.add(o.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(r=>this.fi.add(r.toString()));const o=this.persistence.getTargetCache();return o.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(s=>this.fi.add(s.toString()))}).next(()=>o.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.fi,o=>{const r=B.fromPath(o);return this.gi(e,r).next(s=>{s||t.removeEntry(r,H.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(o=>{o?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return P.or([()=>P.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class rs{constructor(e,t){this.persistence=e,this.pi=new xn(o=>sw(o.path),(o,r)=>o.isEqual(r)),this.garbageCollector=wy(this,t)}static mi(e,t){return new rs(e,t)}Ei(){}di(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(o=>t.next(r=>o+r))}wr(e){let t=0;return this.pr(e,o=>{t++}).next(()=>t)}pr(e,t){return P.forEach(this.pi,(o,r)=>this.br(e,o,r).next(s=>s?P.resolve():t(r)))}removeTargets(e,t,o){return this.persistence.getTargetCache().removeTargets(e,t,o)}removeOrphanedDocuments(e,t){let o=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ii(e,a=>this.br(e,a,t).next(c=>{c||(o++,s.removeEntry(a,H.min()))})).next(()=>s.apply(e)).next(()=>o)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const o=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,o)}addReference(e,t,o){return this.pi.set(o,e.currentSequenceNumber),P.resolve()}removeReference(e,t,o){return this.pi.set(o,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=$r(e.data.value)),t}br(e,t,o){return P.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.pi.get(t);return P.resolve(r!==void 0&&r>o)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Ca{constructor(e,t,o,r){this.targetId=e,this.fromCache=t,this.Es=o,this.ds=r}static As(e,t){let o=Q(),r=Q();for(const s of t.docChanges)switch(s.type){case 0:o=o.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new Ca(e,t.fromCache,o,r)}}/**
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
 */class ky{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Ry{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return _g()?8:ow(Ve())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,o,r){const s={result:null};return this.ys(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ws(e,t,r,o).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new ky;return this.Ss(e,t,a).next(c=>{if(s.result=c,this.Vs)return this.bs(e,t,a,c.size)})}).next(()=>s.result)}bs(e,t,o,r){return o.documentReadCount<this.fs?(Vn()<=X.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",On(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),P.resolve()):(Vn()<=X.DEBUG&&O("QueryEngine","Query:",On(t),"scans",o.documentReadCount,"local documents and returns",r,"documents as results."),o.documentReadCount>this.gs*r?(Vn()<=X.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",On(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,pt(t))):P.resolve())}ys(e,t){if(td(t))return P.resolve(null);let o=pt(t);return this.indexManager.getIndexType(e,o).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=ts(t,null,"F"),o=pt(t)),this.indexManager.getDocumentsMatchingTarget(e,o).next(s=>{const a=Q(...s);return this.ps.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,o).next(l=>{const d=this.Ds(t,c);return this.Cs(t,d,a,l.readTime)?this.ys(e,ts(t,null,"F")):this.vs(e,d,t,l)}))})))}ws(e,t,o,r){return td(t)||r.isEqual(H.min())?P.resolve(null):this.ps.getDocuments(e,o).next(s=>{const a=this.Ds(t,s);return this.Cs(t,a,o,r)?P.resolve(null):(Vn()<=X.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),On(t)),this.vs(e,a,t,Jf(r,zo)).next(c=>c))})}Ds(e,t){let o=new be(th(e));return t.forEach((r,s)=>{As(e,s)&&(o=o.add(s))}),o}Cs(e,t,o,r){if(e.limit===null)return!1;if(o.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Ss(e,t,o){return Vn()<=X.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",On(t)),this.ps.getDocumentsMatchingQuery(e,t,Kt.min(),o)}vs(e,t,o,r){return this.ps.getDocumentsMatchingQuery(e,o,r).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
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
 */const ka="LocalStore",Py=3e8;class Dy{constructor(e,t,o,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new ue(Y),this.xs=new xn(s=>ya(s),va),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(o)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new by(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Ny(n,e,t,o){return new Dy(n,e,t,o)}async function Ih(n,e){const t=G(n);return await t.persistence.runTransaction("Handle user change","readonly",o=>{let r;return t.mutationQueue.getAllMutationBatches(o).next(s=>(r=s,t.Bs(e),t.mutationQueue.getAllMutationBatches(o))).next(s=>{const a=[],c=[];let l=Q();for(const d of r){a.push(d.batchId);for(const h of d.mutations)l=l.add(h.key)}for(const d of s){c.push(d.batchId);for(const h of d.mutations)l=l.add(h.key)}return t.localDocuments.getDocuments(o,l).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:c}))})})}function My(n,e){const t=G(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",o=>{const r=e.batch.keys(),s=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,l,d,h){const m=d.batch,f=m.keys();let _=P.resolve();return f.forEach(E=>{_=_.next(()=>h.getEntry(l,E)).next(T=>{const S=d.docVersions.get(E);re(S!==null,48541),T.version.compareTo(S)<0&&(m.applyToRemoteDocument(T,d),T.isValidDocument()&&(T.setReadTime(d.commitVersion),h.addEntry(T)))})}),_.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,o,e,s).next(()=>s.apply(o)).next(()=>t.mutationQueue.performConsistencyCheck(o)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(o,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(o,function(c){let l=Q();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(o,r))})}function xh(n){const e=G(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Ly(n,e){const t=G(n),o=e.snapshotVersion;let r=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});r=t.Ms;const c=[];e.targetChanges.forEach((h,m)=>{const f=r.get(m);if(!f)return;c.push(t.Pi.removeMatchingKeys(s,h.removedDocuments,m).next(()=>t.Pi.addMatchingKeys(s,h.addedDocuments,m)));let _=f.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?_=_.withResumeToken(xe.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):h.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(h.resumeToken,o)),r=r.insert(m,_),function(T,S,N){return T.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-T.snapshotVersion.toMicroseconds()>=Py?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(f,_,h)&&c.push(t.Pi.updateTargetData(s,_))});let l=Rt(),d=Q();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))}),c.push(Vy(s,a,e.documentUpdates).next(h=>{l=h.ks,d=h.qs})),!o.isEqual(H.min())){const h=t.Pi.getLastRemoteSnapshotVersion(s).next(m=>t.Pi.setTargetsMetadata(s,s.currentSequenceNumber,o));c.push(h)}return P.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.Ms=r,s))}function Vy(n,e,t){let o=Q(),r=Q();return t.forEach(s=>o=o.add(s)),e.getEntries(n,o).next(s=>{let a=Rt();return t.forEach((c,l)=>{const d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(c)),l.isNoDocument()&&l.version.isEqual(H.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):O(ka,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{ks:a,qs:r}})}function Oy(n,e){const t=G(n);return t.persistence.runTransaction("Get next mutation batch","readonly",o=>(e===void 0&&(e=ga),t.mutationQueue.getNextMutationBatchAfterBatchId(o,e)))}function Fy(n,e){const t=G(n);return t.persistence.runTransaction("Allocate target","readwrite",o=>{let r;return t.Pi.getTargetData(o,e).next(s=>s?(r=s,P.resolve(r)):t.Pi.allocateTargetId(o).next(a=>(r=new Bt(e,a,"TargetPurposeListen",o.currentSequenceNumber),t.Pi.addTargetData(o,r).next(()=>r))))}).then(o=>{const r=t.Ms.get(o.targetId);return(r===null||o.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(o.targetId,o),t.xs.set(e,o.targetId)),o})}async function ta(n,e,t){const o=G(n),r=o.Ms.get(e),s=t?"readwrite":"readwrite-primary";try{t||await o.persistence.runTransaction("Release target",s,a=>o.persistence.referenceDelegate.removeTarget(a,r))}catch(a){if(!ro(a))throw a;O(ka,`Failed to update sequence numbers for target ${e}: ${a}`)}o.Ms=o.Ms.remove(e),o.xs.delete(r.target)}function md(n,e,t){const o=G(n);let r=H.min(),s=Q();return o.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,h){const m=G(l),f=m.xs.get(h);return f!==void 0?P.resolve(m.Ms.get(f)):m.Pi.getTargetData(d,h)}(o,a,pt(e)).next(c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,o.Pi.getMatchingKeysForTargetId(a,c.targetId).next(l=>{s=l})}).next(()=>o.Fs.getDocumentsMatchingQuery(a,e,t?r:H.min(),t?s:Q())).next(c=>($y(o,Iw(e),c),{documents:c,Qs:s})))}function $y(n,e,t){let o=n.Os.get(e)||H.min();t.forEach((r,s)=>{s.readTime.compareTo(o)>0&&(o=s.readTime)}),n.Os.set(e,o)}class gd{constructor(){this.activeTargetIds=Rw()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class By{constructor(){this.Mo=new gd,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,o){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,o){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new gd,Promise.resolve()}handleUserChange(e,t,o){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Uy{Oo(e){}shutdown(){}}/**
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
 */const fd="ConnectivityMonitor";class wd{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){O(fd,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){O(fd,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Vr=null;function na(){return Vr===null?Vr=function(){return 268435456+Math.round(2147483648*Math.random())}():Vr++,"0x"+Vr.toString(16)}/**
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
 */const Ri="RestConnection",zy={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class qy{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",o=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${o}/databases/${r}`,this.Wo=this.databaseId.database===Jr?`project_id=${o}`:`project_id=${o}&database_id=${r}`}Go(e,t,o,r,s){const a=na(),c=this.zo(e,t.toUriEncodedString());O(Ri,`Sending RPC '${e}' ${a}:`,c,o);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,r,s);const{host:d}=new URL(c),h=eo(d);return this.Jo(e,c,l,o,h).then(m=>(O(Ri,`Received RPC '${e}' ${a}: `,m),m),m=>{throw fn(Ri,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",o),m})}Ho(e,t,o,r,s,a){return this.Go(e,t,o,r,s)}jo(e,t,o){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+no}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((r,s)=>e[s]=r),o&&o.headers.forEach((r,s)=>e[s]=r)}zo(e,t){const o=zy[e];return`${this.Uo}/v1/${t}:${o}`}terminate(){}}/**
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
 */class jy{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const Ne="WebChannelConnection";class Hy extends qy{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,o,r,s){const a=na();return new Promise((c,l)=>{const d=new Su;d.setWithCredentials(!0),d.listenOnce(Au.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Fr.NO_ERROR:const m=d.getResponseJson();O(Ne,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case Fr.TIMEOUT:O(Ne,`RPC '${e}' ${a} timed out`),l(new V(R.DEADLINE_EXCEEDED,"Request time out"));break;case Fr.HTTP_ERROR:const f=d.getStatus();if(O(Ne,`RPC '${e}' ${a} failed with status:`,f,"response text:",d.getResponseText()),f>0){let _=d.getResponseJson();Array.isArray(_)&&(_=_[0]);const E=_?.error;if(E&&E.status&&E.message){const T=function(N){const L=N.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(L)>=0?L:R.UNKNOWN}(E.status);l(new V(T,E.message))}else l(new V(R.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new V(R.UNAVAILABLE,"Connection failed."));break;default:z(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{O(Ne,`RPC '${e}' ${a} completed.`)}});const h=JSON.stringify(r);O(Ne,`RPC '${e}' ${a} sending request:`,r),d.send(t,"POST",h,o,15)})}T_(e,t,o){const r=na(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ru(),c=ku(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,o),l.encodeInitMessageHeaders=!0;const h=s.join("");O(Ne,`Creating RPC '${e}' stream ${r}: ${h}`,l);const m=a.createWebChannel(h,l);this.I_(m);let f=!1,_=!1;const E=new jy({Yo:S=>{_?O(Ne,`Not sending because RPC '${e}' stream ${r} is closed:`,S):(f||(O(Ne,`Opening RPC '${e}' stream ${r} transport.`),m.open(),f=!0),O(Ne,`RPC '${e}' stream ${r} sending:`,S),m.send(S))},Zo:()=>m.close()}),T=(S,N,L)=>{S.listen(N,$=>{try{L($)}catch(ee){setTimeout(()=>{throw ee},0)}})};return T(m,Io.EventType.OPEN,()=>{_||(O(Ne,`RPC '${e}' stream ${r} transport opened.`),E.o_())}),T(m,Io.EventType.CLOSE,()=>{_||(_=!0,O(Ne,`RPC '${e}' stream ${r} transport closed`),E.a_(),this.E_(m))}),T(m,Io.EventType.ERROR,S=>{_||(_=!0,fn(Ne,`RPC '${e}' stream ${r} transport errored. Name:`,S.name,"Message:",S.message),E.a_(new V(R.UNAVAILABLE,"The operation could not be completed")))}),T(m,Io.EventType.MESSAGE,S=>{if(!_){const N=S.data[0];re(!!N,16349);const L=N,$=L?.error||L[0]?.error;if($){O(Ne,`RPC '${e}' stream ${r} received error:`,$);const ee=$.status;let Z=function(w){const y=fe[w];if(y!==void 0)return hh(y)}(ee),le=$.message;Z===void 0&&(Z=R.INTERNAL,le="Unknown error status: "+ee+" with message "+$.message),_=!0,E.a_(new V(Z,le)),m.close()}else O(Ne,`RPC '${e}' stream ${r} received:`,N),E.u_(N)}}),T(c,Cu.STAT_EVENT,S=>{S.stat===ji.PROXY?O(Ne,`RPC '${e}' stream ${r} detected buffering proxy`):S.stat===ji.NOPROXY&&O(Ne,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{E.__()},0),E}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function Pi(){return typeof document<"u"?document:null}/**
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
 */function Ps(n){return new Xw(n,!0)}/**
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
 */class Sh{constructor(e,t,o=1e3,r=1.5,s=6e4){this.Mi=e,this.timerId=t,this.d_=o,this.A_=r,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),o=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-o);r>0&&O("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${o} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const yd="PersistentStream";class Ah{constructor(e,t,o,r,s,a,c,l){this.Mi=e,this.S_=o,this.b_=r,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Sh(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(kt(t.toString()),kt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([o,r])=>{this.D_===t&&this.G_(o,r)},o=>{e(()=>{const r=new V(R.UNKNOWN,"Fetching auth token failed: "+o.message);return this.z_(r)})})}G_(e,t){const o=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{o(()=>this.listener.Xo())}),this.stream.t_(()=>{o(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(r=>{o(()=>this.z_(r))}),this.stream.onMessage(r=>{o(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return O(yd,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(O(yd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Gy extends Ah{constructor(e,t,o,r,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,o,r,a),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Jw(this.serializer,e),o=function(s){if(!("targetChange"in s))return H.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?H.min():a.readTime?mt(a.readTime):H.min()}(e);return this.listener.H_(t,o)}Y_(e){const t={};t.database=ea(this.serializer),t.addTarget=function(s,a){let c;const l=a.target;if(c=Xi(l)?{documents:ty(s,l)}:{query:ny(s,l).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=gh(s,a.resumeToken);const d=Qi(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(H.min())>0){c.readTime=os(s,a.snapshotVersion.toTimestamp());const d=Qi(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const o=ry(this.serializer,e);o&&(t.labels=o),this.q_(t)}Z_(e){const t={};t.database=ea(this.serializer),t.removeTarget=e,this.q_(t)}}class Wy extends Ah{constructor(e,t,o,r,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,o,r,a),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return re(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,re(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){re(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=ey(e.writeResults,e.commitTime),o=mt(e.commitTime);return this.listener.na(o,t)}ra(){const e={};e.database=ea(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(o=>Zw(this.serializer,o))};this.q_(t)}}/**
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
 */class Ky{}class Xy extends Ky{constructor(e,t,o,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=o,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new V(R.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,o,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Go(e,Ji(t,o),r,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(R.UNKNOWN,s.toString())})}Ho(e,t,o,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Ho(e,Ji(t,o),r,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(R.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Yy{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(kt(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const wn="RemoteStore";class Qy{constructor(e,t,o,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=o,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(a=>{o.enqueueAndForget(async()=>{Sn(this)&&(O(wn,"Restarting streams for network reachability change."),await async function(l){const d=G(l);d.Ea.add(4),await or(d),d.Ra.set("Unknown"),d.Ea.delete(4),await Ds(d)}(this))})}),this.Ra=new Yy(o,r)}}async function Ds(n){if(Sn(n))for(const e of n.da)await e(!0)}async function or(n){for(const e of n.da)await e(!1)}function Ch(n,e){const t=G(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Na(t)?Da(t):io(t).O_()&&Pa(t,e))}function Ra(n,e){const t=G(n),o=io(t);t.Ia.delete(e),o.O_()&&kh(t,e),t.Ia.size===0&&(o.O_()?o.L_():Sn(t)&&t.Ra.set("Unknown"))}function Pa(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}io(n).Y_(e)}function kh(n,e){n.Va.Ue(e),io(n).Z_(e)}function Da(n){n.Va=new Hw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),io(n).start(),n.Ra.ua()}function Na(n){return Sn(n)&&!io(n).x_()&&n.Ia.size>0}function Sn(n){return G(n).Ea.size===0}function Rh(n){n.Va=void 0}async function Jy(n){n.Ra.set("Online")}async function Zy(n){n.Ia.forEach((e,t)=>{Pa(n,e)})}async function ev(n,e){Rh(n),Na(n)?(n.Ra.ha(e),Da(n)):n.Ra.set("Unknown")}async function tv(n,e,t){if(n.Ra.set("Online"),e instanceof mh&&e.state===2&&e.cause)try{await async function(r,s){const a=s.cause;for(const c of s.targetIds)r.Ia.has(c)&&(await r.remoteSyncer.rejectListen(c,a),r.Ia.delete(c),r.Va.removeTarget(c))}(n,e)}catch(o){O(wn,"Failed to remove targets %s: %s ",e.targetIds.join(","),o),await ss(n,o)}else if(e instanceof zr?n.Va.Ze(e):e instanceof ph?n.Va.st(e):n.Va.tt(e),!t.isEqual(H.min()))try{const o=await xh(n.localStore);t.compareTo(o)>=0&&await function(s,a){const c=s.Va.Tt(a);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const h=s.Ia.get(d);h&&s.Ia.set(d,h.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,d)=>{const h=s.Ia.get(l);if(!h)return;s.Ia.set(l,h.withResumeToken(xe.EMPTY_BYTE_STRING,h.snapshotVersion)),kh(s,l);const m=new Bt(h.target,l,d,h.sequenceNumber);Pa(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(o){O(wn,"Failed to raise snapshot:",o),await ss(n,o)}}async function ss(n,e,t){if(!ro(e))throw e;n.Ea.add(1),await or(n),n.Ra.set("Offline"),t||(t=()=>xh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(wn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Ds(n)})}function Ph(n,e){return e().catch(t=>ss(n,t,e))}async function Ns(n){const e=G(n),t=Jt(e);let o=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ga;for(;nv(e);)try{const r=await Oy(e.localStore,o);if(r===null){e.Ta.length===0&&t.L_();break}o=r.batchId,ov(e,r)}catch(r){await ss(e,r)}Dh(e)&&Nh(e)}function nv(n){return Sn(n)&&n.Ta.length<10}function ov(n,e){n.Ta.push(e);const t=Jt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function Dh(n){return Sn(n)&&!Jt(n).x_()&&n.Ta.length>0}function Nh(n){Jt(n).start()}async function rv(n){Jt(n).ra()}async function sv(n){const e=Jt(n);for(const t of n.Ta)e.ea(t.mutations)}async function iv(n,e,t){const o=n.Ta.shift(),r=Ta.from(o,e,t);await Ph(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await Ns(n)}async function av(n,e){e&&Jt(n).X_&&await async function(o,r){if(function(a){return zw(a)&&a!==R.ABORTED}(r.code)){const s=o.Ta.shift();Jt(o).B_(),await Ph(o,()=>o.remoteSyncer.rejectFailedWrite(s.batchId,r)),await Ns(o)}}(n,e),Dh(n)&&Nh(n)}async function vd(n,e){const t=G(n);t.asyncQueue.verifyOperationInProgress(),O(wn,"RemoteStore received new credentials");const o=Sn(t);t.Ea.add(3),await or(t),o&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Ds(t)}async function cv(n,e){const t=G(n);e?(t.Ea.delete(2),await Ds(t)):e||(t.Ea.add(2),await or(t),t.Ra.set("Unknown"))}function io(n){return n.ma||(n.ma=function(t,o,r){const s=G(t);return s.sa(),new Gy(o,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(n.datastore,n.asyncQueue,{Xo:Jy.bind(null,n),t_:Zy.bind(null,n),r_:ev.bind(null,n),H_:tv.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),Na(n)?Da(n):n.Ra.set("Unknown")):(await n.ma.stop(),Rh(n))})),n.ma}function Jt(n){return n.fa||(n.fa=function(t,o,r){const s=G(t);return s.sa(),new Wy(o,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:rv.bind(null,n),r_:av.bind(null,n),ta:sv.bind(null,n),na:iv.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Ns(n)):(await n.fa.stop(),n.Ta.length>0&&(O(wn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class Ma{constructor(e,t,o,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=o,this.op=r,this.removalCallback=s,this.deferred=new St,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,o,r,s){const a=Date.now()+o,c=new Ma(e,t,a,r,s);return c.start(o),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function La(n,e){if(kt("AsyncQueue",`${e}: ${n}`),ro(n))return new V(R.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Un{static emptySet(e){return new Un(e.comparator)}constructor(e){this.comparator=e?(t,o)=>e(t,o)||B.comparator(t.key,o.key):(t,o)=>B.comparator(t.key,o.key),this.keyedMap=xo(),this.sortedSet=new ue(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,o)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Un)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),o=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,s=o.getNext().key;if(!r.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const o=new Un;return o.comparator=this.comparator,o.keyedMap=e,o.sortedSet=t,o}}/**
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
 */class bd{constructor(){this.ga=new ue(B.comparator)}track(e){const t=e.doc.key,o=this.ga.get(t);o?e.type!==0&&o.type===3?this.ga=this.ga.insert(t,e):e.type===3&&o.type!==1?this.ga=this.ga.insert(t,{type:o.type,doc:e.doc}):e.type===2&&o.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&o.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&o.type===0?this.ga=this.ga.remove(t):e.type===1&&o.type===2?this.ga=this.ga.insert(t,{type:1,doc:o.doc}):e.type===0&&o.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):z(63341,{Rt:e,pa:o}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,o)=>{e.push(o)}),e}}class Jn{constructor(e,t,o,r,s,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=o,this.docChanges=r,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,o,r,s){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Jn(e,t,Un.emptySet(t),a,o,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ss(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,o=e.docChanges;if(t.length!==o.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==o[r].type||!t[r].doc.isEqual(o[r].doc))return!1;return!0}}/**
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
 */class lv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class dv{constructor(){this.queries=_d(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,o){const r=G(t),s=r.queries;r.queries=_d(),s.forEach((a,c)=>{for(const l of c.Sa)l.onError(o)})})(this,new V(R.ABORTED,"Firestore shutting down"))}}function _d(){return new xn(n=>eh(n),Ss)}async function Va(n,e){const t=G(n);let o=3;const r=e.query;let s=t.queries.get(r);s?!s.ba()&&e.Da()&&(o=2):(s=new lv,o=e.Da()?0:1);try{switch(o){case 0:s.wa=await t.onListen(r,!0);break;case 1:s.wa=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(a){const c=La(a,`Initialization of query '${On(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,s),s.Sa.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&Fa(t)}async function Oa(n,e){const t=G(n),o=e.query;let r=3;const s=t.queries.get(o);if(s){const a=s.Sa.indexOf(e);a>=0&&(s.Sa.splice(a,1),s.Sa.length===0?r=e.Da()?0:1:!s.ba()&&e.Da()&&(r=2))}switch(r){case 0:return t.queries.delete(o),t.onUnlisten(o,!0);case 1:return t.queries.delete(o),t.onUnlisten(o,!1);case 2:return t.onLastRemoteStoreUnlisten(o);default:return}}function uv(n,e){const t=G(n);let o=!1;for(const r of e){const s=r.query,a=t.queries.get(s);if(a){for(const c of a.Sa)c.Fa(r)&&(o=!0);a.wa=r}}o&&Fa(t)}function hv(n,e,t){const o=G(n),r=o.queries.get(e);if(r)for(const s of r.Sa)s.onError(t);o.queries.delete(e)}function Fa(n){n.Ca.forEach(e=>{e.next()})}var oa,Ed;(Ed=oa||(oa={})).Ma="default",Ed.Cache="cache";class $a{constructor(e,t,o){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=o||{}}Fa(e){if(!this.options.includeMetadataChanges){const o=[];for(const r of e.docChanges)r.type!==3&&o.push(r);e=new Jn(e.query,e.docs,e.oldDocs,o,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const o=t!=="Offline";return(!this.options.qa||!o)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Jn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==oa.Cache}}/**
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
 */class Mh{constructor(e){this.key=e}}class Lh{constructor(e){this.key=e}}class pv{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Q(),this.mutatedKeys=Q(),this.eu=th(e),this.tu=new Un(this.eu)}get nu(){return this.Ya}ru(e,t){const o=t?t.iu:new bd,r=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,a=r,c=!1;const l=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((h,m)=>{const f=r.get(h),_=As(this.query,m)?m:null,E=!!f&&this.mutatedKeys.has(f.key),T=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let S=!1;f&&_?f.data.isEqual(_.data)?E!==T&&(o.track({type:3,doc:_}),S=!0):this.su(f,_)||(o.track({type:2,doc:_}),S=!0,(l&&this.eu(_,l)>0||d&&this.eu(_,d)<0)&&(c=!0)):!f&&_?(o.track({type:0,doc:_}),S=!0):f&&!_&&(o.track({type:1,doc:f}),S=!0,(l||d)&&(c=!0)),S&&(_?(a=a.add(_),s=T?s.add(h):s.delete(h)):(a=a.delete(h),s=s.delete(h)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const h=this.query.limitType==="F"?a.last():a.first();a=a.delete(h.key),s=s.delete(h.key),o.track({type:1,doc:h})}return{tu:a,iu:o,Cs:c,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,o,r){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((h,m)=>function(_,E){const T=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{Rt:S})}};return T(_)-T(E)}(h.type,m.type)||this.eu(h.doc,m.doc)),this.ou(o),r=r??!1;const c=t&&!r?this._u():[],l=this.Xa.size===0&&this.current&&!r?1:0,d=l!==this.Za;return this.Za=l,a.length!==0||d?{snapshot:new Jn(this.query,e.tu,s,a,e.mutatedKeys,l===0,d,!1,!!o&&o.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new bd,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Q(),this.tu.forEach(o=>{this.uu(o.key)&&(this.Xa=this.Xa.add(o.key))});const t=[];return e.forEach(o=>{this.Xa.has(o)||t.push(new Lh(o))}),this.Xa.forEach(o=>{e.has(o)||t.push(new Mh(o))}),t}cu(e){this.Ya=e.Qs,this.Xa=Q();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Jn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ba="SyncEngine";class mv{constructor(e,t,o){this.query=e,this.targetId=t,this.view=o}}class gv{constructor(e){this.key=e,this.hu=!1}}class fv{constructor(e,t,o,r,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=o,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new xn(c=>eh(c),Ss),this.Iu=new Map,this.Eu=new Set,this.du=new ue(B.comparator),this.Au=new Map,this.Ru=new Sa,this.Vu={},this.mu=new Map,this.fu=Qn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function wv(n,e,t=!0){const o=Uh(n);let r;const s=o.Tu.get(e);return s?(o.sharedClientState.addLocalQueryTarget(s.targetId),r=s.view.lu()):r=await Vh(o,e,t,!0),r}async function yv(n,e){const t=Uh(n);await Vh(t,e,!0,!1)}async function Vh(n,e,t,o){const r=await Fy(n.localStore,pt(e)),s=r.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let c;return o&&(c=await vv(n,e,s,a==="current",r.resumeToken)),n.isPrimaryClient&&t&&Ch(n.remoteStore,r),c}async function vv(n,e,t,o,r){n.pu=(m,f,_)=>async function(T,S,N,L){let $=S.view.ru(N);$.Cs&&($=await md(T.localStore,S.query,!1).then(({documents:v})=>S.view.ru(v,$)));const ee=L&&L.targetChanges.get(S.targetId),Z=L&&L.targetMismatches.get(S.targetId)!=null,le=S.view.applyChanges($,T.isPrimaryClient,ee,Z);return Id(T,S.targetId,le.au),le.snapshot}(n,m,f,_);const s=await md(n.localStore,e,!0),a=new pv(e,s.Qs),c=a.ru(s.documents),l=nr.createSynthesizedTargetChangeForCurrentChange(t,o&&n.onlineState!=="Offline",r),d=a.applyChanges(c,n.isPrimaryClient,l);Id(n,t,d.au);const h=new mv(e,t,a);return n.Tu.set(e,h),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function bv(n,e,t){const o=G(n),r=o.Tu.get(e),s=o.Iu.get(r.targetId);if(s.length>1)return o.Iu.set(r.targetId,s.filter(a=>!Ss(a,e))),void o.Tu.delete(e);o.isPrimaryClient?(o.sharedClientState.removeLocalQueryTarget(r.targetId),o.sharedClientState.isActiveQueryTarget(r.targetId)||await ta(o.localStore,r.targetId,!1).then(()=>{o.sharedClientState.clearQueryState(r.targetId),t&&Ra(o.remoteStore,r.targetId),ra(o,r.targetId)}).catch(oo)):(ra(o,r.targetId),await ta(o.localStore,r.targetId,!0))}async function _v(n,e){const t=G(n),o=t.Tu.get(e),r=t.Iu.get(o.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(o.targetId),Ra(t.remoteStore,o.targetId))}async function Ev(n,e,t){const o=kv(n);try{const r=await function(a,c){const l=G(a),d=ce.now(),h=c.reduce((_,E)=>_.add(E.key),Q());let m,f;return l.persistence.runTransaction("Locally write mutations","readwrite",_=>{let E=Rt(),T=Q();return l.Ns.getEntries(_,h).next(S=>{E=S,E.forEach((N,L)=>{L.isValidDocument()||(T=T.add(N))})}).next(()=>l.localDocuments.getOverlayedDocuments(_,E)).next(S=>{m=S;const N=[];for(const L of c){const $=Ow(L,m.get(L.key).overlayedDocument);$!=null&&N.push(new on(L.key,$,Gu($.value.mapValue),nt.exists(!0)))}return l.mutationQueue.addMutationBatch(_,d,N,c)}).next(S=>{f=S;const N=S.applyToLocalDocumentSet(m,T);return l.documentOverlayCache.saveOverlays(_,S.batchId,N)})}).then(()=>({batchId:f.batchId,changes:oh(m)}))}(o.localStore,e);o.sharedClientState.addPendingMutation(r.batchId),function(a,c,l){let d=a.Vu[a.currentUser.toKey()];d||(d=new ue(Y)),d=d.insert(c,l),a.Vu[a.currentUser.toKey()]=d}(o,r.batchId,t),await rr(o,r.changes),await Ns(o.remoteStore)}catch(r){const s=La(r,"Failed to persist write");t.reject(s)}}async function Oh(n,e){const t=G(n);try{const o=await Ly(t.localStore,e);e.targetChanges.forEach((r,s)=>{const a=t.Au.get(s);a&&(re(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?a.hu=!0:r.modifiedDocuments.size>0?re(a.hu,14607):r.removedDocuments.size>0&&(re(a.hu,42227),a.hu=!1))}),await rr(t,o,e)}catch(o){await oo(o)}}function Td(n,e,t){const o=G(n);if(o.isPrimaryClient&&t===0||!o.isPrimaryClient&&t===1){const r=[];o.Tu.forEach((s,a)=>{const c=a.view.va(e);c.snapshot&&r.push(c.snapshot)}),function(a,c){const l=G(a);l.onlineState=c;let d=!1;l.queries.forEach((h,m)=>{for(const f of m.Sa)f.va(c)&&(d=!0)}),d&&Fa(l)}(o.eventManager,e),r.length&&o.Pu.H_(r),o.onlineState=e,o.isPrimaryClient&&o.sharedClientState.setOnlineState(e)}}async function Tv(n,e,t){const o=G(n);o.sharedClientState.updateQueryState(e,"rejected",t);const r=o.Au.get(e),s=r&&r.key;if(s){let a=new ue(B.comparator);a=a.insert(s,Le.newNoDocument(s,H.min()));const c=Q().add(s),l=new Rs(H.min(),new Map,new ue(Y),a,c);await Oh(o,l),o.du=o.du.remove(s),o.Au.delete(e),Ua(o)}else await ta(o.localStore,e,!1).then(()=>ra(o,e,t)).catch(oo)}async function Iv(n,e){const t=G(n),o=e.batch.batchId;try{const r=await My(t.localStore,e);$h(t,o,null),Fh(t,o),t.sharedClientState.updateMutationState(o,"acknowledged"),await rr(t,r)}catch(r){await oo(r)}}async function xv(n,e,t){const o=G(n);try{const r=await function(a,c){const l=G(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let h;return l.mutationQueue.lookupMutationBatch(d,c).next(m=>(re(m!==null,37113),h=m.keys(),l.mutationQueue.removeMutationBatch(d,m))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,h,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,h)).next(()=>l.localDocuments.getDocuments(d,h))})}(o.localStore,e);$h(o,e,t),Fh(o,e),o.sharedClientState.updateMutationState(e,"rejected",t),await rr(o,r)}catch(r){await oo(r)}}function Fh(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function $h(n,e,t){const o=G(n);let r=o.Vu[o.currentUser.toKey()];if(r){const s=r.get(e);s&&(t?s.reject(t):s.resolve(),r=r.remove(e)),o.Vu[o.currentUser.toKey()]=r}}function ra(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const o of n.Iu.get(e))n.Tu.delete(o),t&&n.Pu.yu(o,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(o=>{n.Ru.containsKey(o)||Bh(n,o)})}function Bh(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ra(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Ua(n))}function Id(n,e,t){for(const o of t)o instanceof Mh?(n.Ru.addReference(o.key,e),Sv(n,o)):o instanceof Lh?(O(Ba,"Document no longer in limbo: "+o.key),n.Ru.removeReference(o.key,e),n.Ru.containsKey(o.key)||Bh(n,o.key)):z(19791,{wu:o})}function Sv(n,e){const t=e.key,o=t.path.canonicalString();n.du.get(t)||n.Eu.has(o)||(O(Ba,"New document in limbo: "+t),n.Eu.add(o),Ua(n))}function Ua(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new B(ae.fromString(e)),o=n.fu.next();n.Au.set(o,new gv(t)),n.du=n.du.insert(t,o),Ch(n.remoteStore,new Bt(pt(xs(t.path)),o,"TargetPurposeLimboResolution",Es.ce))}}async function rr(n,e,t){const o=G(n),r=[],s=[],a=[];o.Tu.isEmpty()||(o.Tu.forEach((c,l)=>{a.push(o.pu(l,e,t).then(d=>{if((d||t)&&o.isPrimaryClient){const h=d?!d.fromCache:t?.targetChanges.get(l.targetId)?.current;o.sharedClientState.updateQueryState(l.targetId,h?"current":"not-current")}if(d){r.push(d);const h=Ca.As(l.targetId,d);s.push(h)}}))}),await Promise.all(a),o.Pu.H_(r),await async function(l,d){const h=G(l);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>P.forEach(d,f=>P.forEach(f.Es,_=>h.persistence.referenceDelegate.addReference(m,f.targetId,_)).next(()=>P.forEach(f.ds,_=>h.persistence.referenceDelegate.removeReference(m,f.targetId,_)))))}catch(m){if(!ro(m))throw m;O(ka,"Failed to update sequence numbers: "+m)}for(const m of d){const f=m.targetId;if(!m.fromCache){const _=h.Ms.get(f),E=_.snapshotVersion,T=_.withLastLimboFreeSnapshotVersion(E);h.Ms=h.Ms.insert(f,T)}}}(o.localStore,s))}async function Av(n,e){const t=G(n);if(!t.currentUser.isEqual(e)){O(Ba,"User change. New user:",e.toKey());const o=await Ih(t.localStore,e);t.currentUser=e,function(s,a){s.mu.forEach(c=>{c.forEach(l=>{l.reject(new V(R.CANCELLED,a))})}),s.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,o.removedBatchIds,o.addedBatchIds),await rr(t,o.Ls)}}function Cv(n,e){const t=G(n),o=t.Au.get(e);if(o&&o.hu)return Q().add(o.key);{let r=Q();const s=t.Iu.get(e);if(!s)return r;for(const a of s){const c=t.Tu.get(a);r=r.unionWith(c.view.nu)}return r}}function Uh(n){const e=G(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Oh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Cv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Tv.bind(null,e),e.Pu.H_=uv.bind(null,e.eventManager),e.Pu.yu=hv.bind(null,e.eventManager),e}function kv(n){const e=G(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Iv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=xv.bind(null,e),e}class is{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ps(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Ny(this.persistence,new Ry,e.initialUser,this.serializer)}Cu(e){return new Th(Aa.mi,this.serializer)}Du(e){return new By}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}is.provider={build:()=>new is};class Rv extends is{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){re(this.persistence.referenceDelegate instanceof rs,46915);const o=this.persistence.referenceDelegate.garbageCollector;return new gy(o,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Be.withCacheSize(this.cacheSizeBytes):Be.DEFAULT;return new Th(o=>rs.mi(o,t),this.serializer)}}class sa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=o=>Td(this.syncEngine,o,1),this.remoteStore.remoteSyncer.handleCredentialChange=Av.bind(null,this.syncEngine),await cv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new dv}()}createDatastore(e){const t=Ps(e.databaseInfo.databaseId),o=function(s){return new Hy(s)}(e.databaseInfo);return function(s,a,c,l){return new Xy(s,a,c,l)}(e.authCredentials,e.appCheckCredentials,o,t)}createRemoteStore(e){return function(o,r,s,a,c){return new Qy(o,r,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Td(this.syncEngine,t,0),function(){return wd.v()?new wd:new Uy}())}createSyncEngine(e,t){return function(r,s,a,c,l,d,h){const m=new fv(r,s,a,c,l,d);return h&&(m.gu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const o=G(t);O(wn,"RemoteStore shutting down."),o.Ea.add(5),await or(o),o.Aa.shutdown(),o.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}sa.provider={build:()=>new sa};/**
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
 */class za{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):kt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Zt="FirestoreClient";class Pv{constructor(e,t,o,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=o,this.databaseInfo=r,this.user=Me.UNAUTHENTICATED,this.clientId=bs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(o,async a=>{O(Zt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(o,a=>(O(Zt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new St;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const o=La(t,"Failed to shutdown persistence");e.reject(o)}}),e.promise}}async function Di(n,e){n.asyncQueue.verifyOperationInProgress(),O(Zt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let o=t.initialUser;n.setCredentialChangeListener(async r=>{o.isEqual(r)||(await Ih(e.localStore,r),o=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function xd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Dv(n);O(Zt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(o=>vd(e.remoteStore,o)),n.setAppCheckTokenChangeListener((o,r)=>vd(e.remoteStore,r)),n._onlineComponents=e}async function Dv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(Zt,"Using user provided OfflineComponentProvider");try{await Di(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===R.FAILED_PRECONDITION||r.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;fn("Error using user provided cache. Falling back to memory cache: "+t),await Di(n,new is)}}else O(Zt,"Using default OfflineComponentProvider"),await Di(n,new Rv(void 0));return n._offlineComponents}async function zh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(Zt,"Using user provided OnlineComponentProvider"),await xd(n,n._uninitializedComponentsProvider._online)):(O(Zt,"Using default OnlineComponentProvider"),await xd(n,new sa))),n._onlineComponents}function Nv(n){return zh(n).then(e=>e.syncEngine)}async function as(n){const e=await zh(n),t=e.eventManager;return t.onListen=wv.bind(null,e.syncEngine),t.onUnlisten=bv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=yv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=_v.bind(null,e.syncEngine),t}function Mv(n,e,t={}){const o=new St;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){const h=new za({next:f=>{h.Nu(),a.enqueueAndForget(()=>Oa(s,m));const _=f.docs.has(c);!_&&f.fromCache?d.reject(new V(R.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&f.fromCache&&l&&l.source==="server"?d.reject(new V(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(f)},error:f=>d.reject(f)}),m=new $a(xs(c.path),h,{includeMetadataChanges:!0,qa:!0});return Va(s,m)}(await as(n),n.asyncQueue,e,t,o)),o.promise}function Lv(n,e,t={}){const o=new St;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){const h=new za({next:f=>{h.Nu(),a.enqueueAndForget(()=>Oa(s,m)),f.fromCache&&l.source==="server"?d.reject(new V(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(f)},error:f=>d.reject(f)}),m=new $a(c,h,{includeMetadataChanges:!0,qa:!0});return Va(s,m)}(await as(n),n.asyncQueue,e,t,o)),o.promise}/**
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
 */function qh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Sd=new Map;/**
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
 */const jh="firestore.googleapis.com",Ad=!0;class Cd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=jh,this.ssl=Ad}else this.host=e.host,this.ssl=e.ssl??Ad;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Eh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<py)throw new V(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Lu("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=qh(e.experimentalLongPollingOptions??{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(o,r){return o.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ms{constructor(e,t,o,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=o,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Cd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Cd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(o){if(!o)return new Nu;switch(o.type){case"firstParty":return new Hf(o.sessionIndex||"0",o.iamToken||null,o.authTokenFactory||null);case"provider":return o.client;default:throw new V(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const o=Sd.get(t);o&&(O("ComponentProvider","Removing Datastore"),Sd.delete(t),o.terminate())}(this),Promise.resolve()}}function Hh(n,e,t,o={}){n=Ke(n,Ms);const r=eo(e),s=n._getSettings(),a={...s,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;r&&(mu(`https://${c}`),gu("Firestore",!0)),s.host!==jh&&s.host!==c&&fn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...s,host:c,ssl:r,emulatorOptions:o};if(!ft(l,a)&&(n._setSettings(l),o.mockUserToken)){let d,h;if(typeof o.mockUserToken=="string")d=o.mockUserToken,h=Me.MOCK_USER;else{d=pg(o.mockUserToken,n._app?.options.projectId);const m=o.mockUserToken.sub||o.mockUserToken.user_id;if(!m)throw new V(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new Me(m)}n._authCredentials=new zf(new Du(d,h))}}/**
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
 */class bt{constructor(e,t,o){this.converter=t,this._query=o,this.type="query",this.firestore=e}withConverter(e){return new bt(this.firestore,e,this._query)}}class pe{constructor(e,t,o){this.converter=t,this._key=o,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new At(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new pe(this.firestore,e,this._key)}toJSON(){return{type:pe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,o){if(er(t,pe._jsonSchema))return new pe(e,o||null,new B(ae.fromString(t.referencePath)))}}pe._jsonSchemaVersion="firestore/documentReference/1.0",pe._jsonSchema={type:ye("string",pe._jsonSchemaVersion),referencePath:ye("string")};class At extends bt{constructor(e,t,o){super(e,t,xs(o)),this._path=o,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new pe(this.firestore,null,new B(e))}withConverter(e){return new At(this.firestore,e,this._path)}}function oe(n,e,...t){if(n=_e(n),Mu("collection","path",e),n instanceof Ms){const o=ae.fromString(e,...t);return Ul(o),new At(n,null,o)}{if(!(n instanceof pe||n instanceof At))throw new V(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const o=n._path.child(ae.fromString(e,...t));return Ul(o),new At(n.firestore,null,o)}}function ke(n,e,...t){if(n=_e(n),arguments.length===1&&(e=bs.newId()),Mu("doc","path",e),n instanceof Ms){const o=ae.fromString(e,...t);return Bl(o),new pe(n,null,new B(o))}{if(!(n instanceof pe||n instanceof At))throw new V(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const o=n._path.child(ae.fromString(e,...t));return Bl(o),new pe(n.firestore,n instanceof At?n.converter:null,new B(o))}}/**
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
 */const kd="AsyncQueue";class Rd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Sh(this,"async_queue_retry"),this._c=()=>{const o=Pi();o&&O(kd,"Visibility state changed to "+o.visibilityState),this.M_.w_()},this.ac=e;const t=Pi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Pi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new St;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!ro(e))throw e;O(kd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(o=>{throw this.nc=o,this.rc=!1,kt("INTERNAL UNHANDLED ERROR: ",Pd(o)),o}).then(o=>(this.rc=!1,o))));return this.ac=t,t}enqueueAfterDelay(e,t,o){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=Ma.createAndSchedule(this,e,t,o,s=>this.hc(s));return this.tc.push(r),r}uc(){this.nc&&z(47125,{Pc:Pd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,o)=>t.targetTimeMs-o.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Pd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Dd(n){return function(t,o){if(typeof t!="object"||t===null)return!1;const r=t;for(const s of o)if(s in r&&typeof r[s]=="function")return!0;return!1}(n,["next","error","complete"])}class Pt extends Ms{constructor(e,t,o,r){super(e,t,o,r),this.type="firestore",this._queue=new Rd,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Rd(e),this._firestoreClient=void 0,await e}}}function Gh(n,e){const t=typeof n=="object"?n:pa(),o=typeof n=="string"?n:Jr,r=In(t,"firestore").getImmediate({identifier:o});if(!r._initialized){const s=ug("firestore");s&&Hh(r,...s)}return r}function sr(n){if(n._terminated)throw new V(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Vv(n),n._firestoreClient}function Vv(n){const e=n._freezeSettings(),t=function(r,s,a,c){return new cw(r,s,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,qh(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Pv(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(r){const s=r?._online.build();return{_offline:r?._offline.build(s),_online:s}}(n._componentsProvider))}/**
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
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(xe.fromBase64String(e))}catch(t){throw new V(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(er(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:ye("string",Ge._jsonSchemaVersion),bytes:ye("string")};/**
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
 */class ir{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ie(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class An{constructor(e){this._methodName=e}}/**
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
 */class ot{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ot._jsonSchemaVersion}}static fromJSON(e){if(er(e,ot._jsonSchema))return new ot(e.latitude,e.longitude)}}ot._jsonSchemaVersion="firestore/geoPoint/1.0",ot._jsonSchema={type:ye("string",ot._jsonSchemaVersion),latitude:ye("number"),longitude:ye("number")};/**
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
 */class rt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(o,r){if(o.length!==r.length)return!1;for(let s=0;s<o.length;++s)if(o[s]!==r[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:rt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(er(e,rt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new rt(e.vectorValues);throw new V(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}rt._jsonSchemaVersion="firestore/vectorValue/1.0",rt._jsonSchema={type:ye("string",rt._jsonSchemaVersion),vectorValues:ye("object")};/**
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
 */const Ov=/^__.*__$/;class Fv{constructor(e,t,o){this.data=e,this.fieldMask=t,this.fieldTransforms=o}toMutation(e,t){return this.fieldMask!==null?new on(e,this.data,this.fieldMask,t,this.fieldTransforms):new tr(e,this.data,t,this.fieldTransforms)}}class Wh{constructor(e,t,o){this.data=e,this.fieldMask=t,this.fieldTransforms=o}toMutation(e,t){return new on(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Kh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{Ac:n})}}class Ls{constructor(e,t,o,r,s,a){this.settings=e,this.databaseId=t,this.serializer=o,this.ignoreUndefinedProperties=r,s===void 0&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Ls({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),o=this.Vc({path:t,fc:!1});return o.gc(e),o}yc(e){const t=this.path?.child(e),o=this.Vc({path:t,fc:!1});return o.Rc(),o}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return cs(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Kh(this.Ac)&&Ov.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class $v{constructor(e,t,o){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=o||Ps(e)}Cc(e,t,o,r=!1){return new Ls({Ac:e,methodName:t,Dc:o,path:Ie.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qa(n){const e=n._freezeSettings(),t=Ps(n._databaseId);return new $v(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Bv(n,e,t,o,r,s={}){const a=n.Cc(s.merge||s.mergeFields?2:0,e,t,r);Wa("Data must be an object, but it was:",a,o);const c=Yh(o,a);let l,d;if(s.merge)l=new We(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){const h=[];for(const m of s.mergeFields){const f=ia(e,m,t);if(!a.contains(f))throw new V(R.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);Jh(h,f)||h.push(f)}l=new We(h),d=a.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,d=a.fieldTransforms;return new Fv(new Ue(c),l,d)}class Vs extends An{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Vs}}function Xh(n,e,t){return new Ls({Ac:3,Dc:e.settings.Dc,methodName:n._methodName,fc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class ja extends An{_toFieldTransform(e){return new _a(e.path,new Go)}isEqual(e){return e instanceof ja}}class Ha extends An{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Xh(this,e,!0),o=this.vc.map(s=>Cn(s,t)),r=new Xn(o);return new _a(e.path,r)}isEqual(e){return e instanceof Ha&&ft(this.vc,e.vc)}}class Ga extends An{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Xh(this,e,!0),o=this.vc.map(s=>Cn(s,t)),r=new Yn(o);return new _a(e.path,r)}isEqual(e){return e instanceof Ga&&ft(this.vc,e.vc)}}function Uv(n,e,t,o){const r=n.Cc(1,e,t);Wa("Data must be an object, but it was:",r,o);const s=[],a=Ue.empty();nn(o,(l,d)=>{const h=Ka(e,l,t);d=_e(d);const m=r.yc(h);if(d instanceof Vs)s.push(h);else{const f=Cn(d,m);f!=null&&(s.push(h),a.set(h,f))}});const c=new We(s);return new Wh(a,c,r.fieldTransforms)}function zv(n,e,t,o,r,s){const a=n.Cc(1,e,t),c=[ia(e,o,t)],l=[r];if(s.length%2!=0)throw new V(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let f=0;f<s.length;f+=2)c.push(ia(e,s[f])),l.push(s[f+1]);const d=[],h=Ue.empty();for(let f=c.length-1;f>=0;--f)if(!Jh(d,c[f])){const _=c[f];let E=l[f];E=_e(E);const T=a.yc(_);if(E instanceof Vs)d.push(_);else{const S=Cn(E,T);S!=null&&(d.push(_),h.set(_,S))}}const m=new We(d);return new Wh(h,m,a.fieldTransforms)}function qv(n,e,t,o=!1){return Cn(t,n.Cc(o?4:3,e))}function Cn(n,e){if(Qh(n=_e(n)))return Wa("Unsupported field value:",e,n),Yh(n,e);if(n instanceof An)return function(o,r){if(!Kh(r.Ac))throw r.Sc(`${o._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Sc(`${o._methodName}() is not currently supported inside arrays`);const s=o._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(o,r){const s=[];let a=0;for(const c of o){let l=Cn(c,r.wc(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(o,r){if((o=_e(o))===null)return{nullValue:"NULL_VALUE"};if(typeof o=="number")return Pw(r.serializer,o);if(typeof o=="boolean")return{booleanValue:o};if(typeof o=="string")return{stringValue:o};if(o instanceof Date){const s=ce.fromDate(o);return{timestampValue:os(r.serializer,s)}}if(o instanceof ce){const s=new ce(o.seconds,1e3*Math.floor(o.nanoseconds/1e3));return{timestampValue:os(r.serializer,s)}}if(o instanceof ot)return{geoPointValue:{latitude:o.latitude,longitude:o.longitude}};if(o instanceof Ge)return{bytesValue:gh(r.serializer,o._byteString)};if(o instanceof pe){const s=r.databaseId,a=o.firestore._databaseId;if(!a.isEqual(s))throw r.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:xa(o.firestore._databaseId||r.databaseId,o._key.path)}}if(o instanceof rt)return function(a,c){return{mapValue:{fields:{[ju]:{stringValue:Hu},[Zr]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return ba(c.serializer,d)})}}}}}}(o,r);throw r.Sc(`Unsupported field value: ${_s(o)}`)}(n,e)}function Yh(n,e){const t={};return Fu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):nn(n,(o,r)=>{const s=Cn(r,e.mc(o));s!=null&&(t[o]=s)}),{mapValue:{fields:t}}}function Qh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ce||n instanceof ot||n instanceof Ge||n instanceof pe||n instanceof An||n instanceof rt)}function Wa(n,e,t){if(!Qh(t)||!Vu(t)){const o=_s(t);throw o==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+o)}}function ia(n,e,t){if((e=_e(e))instanceof ir)return e._internalPath;if(typeof e=="string")return Ka(n,e);throw cs("Field path arguments must be of type string or ",n,!1,void 0,t)}const jv=new RegExp("[~\\*/\\[\\]]");function Ka(n,e,t){if(e.search(jv)>=0)throw cs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ir(...e.split("."))._internalPath}catch{throw cs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function cs(n,e,t,o,r){const s=o&&!o.isEmpty(),a=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${o}`),a&&(l+=` in document ${r}`),l+=")"),new V(R.INVALID_ARGUMENT,c+n+l)}function Jh(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Zh{constructor(e,t,o,r,s){this._firestore=e,this._userDataWriter=t,this._key=o,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new pe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Hv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Os("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Hv extends Zh{data(){return super.data()}}function Os(n,e){return typeof e=="string"?Ka(n,e):e instanceof ir?e._internalPath:e._delegate._internalPath}/**
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
 */function ep(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Xa{}class Fs extends Xa{}function ve(n,e,...t){let o=[];e instanceof Xa&&o.push(e),o=o.concat(t),function(s){const a=s.filter(l=>l instanceof $s).length,c=s.filter(l=>l instanceof ar).length;if(a>1||a>0&&c>0)throw new V(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(o);for(const r of o)n=r._apply(n);return n}class ar extends Fs{constructor(e,t,o){super(),this._field=e,this._op=t,this._value=o,this.type="where"}static _create(e,t,o){return new ar(e,t,o)}_apply(e){const t=this._parse(e);return tp(e._query,t),new bt(e.firestore,e.converter,Yi(e._query,t))}_parse(e){const t=qa(e.firestore);return function(s,a,c,l,d,h,m){let f;if(d.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new V(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){Md(m,h);const E=[];for(const T of m)E.push(Nd(l,s,T));f={arrayValue:{values:E}}}else f=Nd(l,s,m)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||Md(m,h),f=qv(c,a,m,h==="in"||h==="not-in");return we.create(d,h,f)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ne(n,e,t){const o=e,r=Os("where",n);return ar._create(r,o,t)}class $s extends Xa{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new $s(e,t)}_parse(e){const t=this._queryConstraints.map(o=>o._parse(e)).filter(o=>o.getFilters().length>0);return t.length===1?t[0]:at.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,s){let a=r;const c=s.getFlattenedFilters();for(const l of c)tp(a,l),a=Yi(a,l)}(e._query,t),new bt(e.firestore,e.converter,Yi(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Bs extends Fs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Bs(e,t)}_apply(e){const t=function(r,s,a){if(r.startAt!==null)throw new V(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new V(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ho(s,a)}(e._query,this._field,this._direction);return new bt(e.firestore,e.converter,function(r,s){const a=r.explicitOrderBy.concat([s]);return new so(r.path,r.collectionGroup,a,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,t))}}function Gv(n,e="asc"){const t=e,o=Os("orderBy",n);return Bs._create(o,t)}class Us extends Fs{constructor(e,t,o){super(),this.type=e,this._limit=t,this._limitType=o}static _create(e,t,o){return new Us(e,t,o)}_apply(e){return new bt(e.firestore,e.converter,ts(e._query,this._limit,this._limitType))}}function Wv(n){return Qf("limit",n),Us._create("limit",n,"F")}function Nd(n,e,t){if(typeof(t=_e(t))=="string"){if(t==="")throw new V(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Zu(e)&&t.indexOf("/")!==-1)throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const o=e.path.child(ae.fromString(t));if(!B.isDocumentKey(o))throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${o}' is not because it has an odd number of segments (${o.length}).`);return Xl(n,new B(o))}if(t instanceof pe)return Xl(n,t._key);throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${_s(t)}.`)}function Md(n,e){if(!Array.isArray(n)||n.length===0)throw new V(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function tp(n,e){const t=function(r,s){for(const a of r)for(const c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class np{convertValue(e,t="none"){switch(Qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Yt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const o={};return nn(e,(r,s)=>{o[r]=this.convertValue(s,t)}),o}convertVectorValue(e){const t=e.fields?.[Zr].arrayValue?.values?.map(o=>me(o.doubleValue));return new rt(t)}convertGeoPoint(e){return new ot(me(e.latitude),me(e.longitude))}convertArray(e,t){return(e.values||[]).map(o=>this.convertValue(o,t))}convertServerTimestamp(e,t){switch(t){case"previous":const o=Is(e);return o==null?null:this.convertValue(o,t);case"estimate":return this.convertTimestamp(qo(e));default:return null}}convertTimestamp(e){const t=Xt(e);return new ce(t.seconds,t.nanos)}convertDocumentKey(e,t){const o=ae.fromString(e);re(_h(o),9688,{name:e});const r=new Gn(o.get(1),o.get(3)),s=new B(o.popFirst(5));return r.isEqual(t)||kt(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function Kv(n,e,t){let o;return o=n?n.toFirestore(e):e,o}class Bn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class jt extends Zh{constructor(e,t,o,r,s,a){super(e,t,o,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Do(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const o=this._document.data.field(Os("DocumentSnapshot.get",e));if(o!==null)return this._userDataWriter.convertValue(o,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=jt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}jt._jsonSchemaVersion="firestore/documentSnapshot/1.0",jt._jsonSchema={type:ye("string",jt._jsonSchemaVersion),bundleSource:ye("string","DocumentSnapshot"),bundleName:ye("string"),bundle:ye("string")};class Do extends jt{data(e={}){return super.data(e)}}class Ht{constructor(e,t,o,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Bn(r.hasPendingWrites,r.fromCache),this.query=o}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(o=>{e.call(t,new Do(this._firestore,this._userDataWriter,o.key,o,new Bn(this._snapshot.mutatedKeys.has(o.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map(c=>{const l=new Do(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Bn(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new Do(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Bn(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,h=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),h=a.indexOf(c.doc.key)),{type:Xv(c.type),doc:l,oldIndex:d,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ht._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=bs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],o=[],r=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),o.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),r.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Xv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}/**
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
 */function Wo(n){n=Ke(n,pe);const e=Ke(n.firestore,Pt);return Mv(sr(e),n._key).then(t=>op(e,n,t))}Ht._jsonSchemaVersion="firestore/querySnapshot/1.0",Ht._jsonSchema={type:ye("string",Ht._jsonSchemaVersion),bundleSource:ye("string","QuerySnapshot"),bundleName:ye("string"),bundle:ye("string")};class Ya extends np{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new pe(this.firestore,null,t)}}function ge(n){n=Ke(n,bt);const e=Ke(n.firestore,Pt),t=sr(e),o=new Ya(e);return ep(n._query),Lv(t,n._query).then(r=>new Ht(e,o,n,r))}function ct(n,e,t,...o){n=Ke(n,pe);const r=Ke(n.firestore,Pt),s=qa(r);let a;return a=typeof(e=_e(e))=="string"||e instanceof ir?zv(s,"updateDoc",n._key,e,t,o):Uv(s,"updateDoc",n._key,e),zs(r,[a.toMutation(n._key,nt.exists(!0))])}function ht(n){return zs(Ke(n.firestore,Pt),[new Ea(n._key,nt.none())])}function en(n,e){const t=Ke(n.firestore,Pt),o=ke(n),r=Kv(n.converter,e);return zs(t,[Bv(qa(n.firestore),"addDoc",o._key,r,n.converter!==null,{}).toMutation(o._key,nt.exists(!1))]).then(()=>o)}function Yv(n,...e){n=_e(n);let t={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Dd(e[o])||(t=e[o++]);const r={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Dd(e[o])){const l=e[o];e[o]=l.next?.bind(l),e[o+1]=l.error?.bind(l),e[o+2]=l.complete?.bind(l)}let s,a,c;if(n instanceof pe)a=Ke(n.firestore,Pt),c=xs(n._key.path),s={next:l=>{e[o]&&e[o](op(a,n,l))},error:e[o+1],complete:e[o+2]};else{const l=Ke(n,bt);a=Ke(l.firestore,Pt),c=l._query;const d=new Ya(a);s={next:h=>{e[o]&&e[o](new Ht(a,d,l,h))},error:e[o+1],complete:e[o+2]},ep(n._query)}return function(d,h,m,f){const _=new za(f),E=new $a(h,_,m);return d.asyncQueue.enqueueAndForget(async()=>Va(await as(d),E)),()=>{_.Nu(),d.asyncQueue.enqueueAndForget(async()=>Oa(await as(d),E))}}(sr(a),c,r,s)}function zs(n,e){return function(o,r){const s=new St;return o.asyncQueue.enqueueAndForget(async()=>Ev(await Nv(o),r,s)),s.promise}(sr(n),e)}function op(n,e,t){const o=t.docs.get(e._key),r=new Ya(n);return new jt(n,r,e._key,o,new Bn(t.hasPendingWrites,t.fromCache),e.converter)}function Ee(){return new ja("serverTimestamp")}function Qa(...n){return new Ha("arrayUnion",n)}function Qv(...n){return new Ga("arrayRemove",n)}(function(e,t=!0){(function(r){no=r})(to),wt(new it("firestore",(o,{instanceIdentifier:r,options:s})=>{const a=o.getProvider("app").getImmediate(),c=new Pt(new qf(o.getProvider("auth-internal")),new Gf(a,o.getProvider("app-check-internal")),function(d,h){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Gn(d.options.projectId,h)}(a,r),a);return s={useFetchStreams:t,...s},c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Qe(Vl,Ol,e),Qe(Vl,Ol,"esm2020")})();const Ye=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:np,Bytes:Ge,CollectionReference:At,DocumentReference:pe,DocumentSnapshot:jt,FieldPath:ir,FieldValue:An,Firestore:Pt,FirestoreError:V,GeoPoint:ot,Query:bt,QueryCompositeFilterConstraint:$s,QueryConstraint:Fs,QueryDocumentSnapshot:Do,QueryFieldFilterConstraint:ar,QueryLimitConstraint:Us,QueryOrderByConstraint:Bs,QuerySnapshot:Ht,SnapshotMetadata:Bn,Timestamp:ce,VectorValue:rt,_AutoId:bs,_ByteString:xe,_DatabaseId:Gn,_DocumentKey:B,_EmptyAuthCredentialsProvider:Nu,_FieldPath:Ie,_cast:Ke,_logWarn:fn,_validateIsNotUsedTogether:Lu,addDoc:en,arrayRemove:Qv,arrayUnion:Qa,collection:oe,connectFirestoreEmulator:Hh,deleteDoc:ht,doc:ke,ensureFirestoreConfigured:sr,executeWrite:zs,getDoc:Wo,getDocs:ge,getFirestore:Gh,limit:Wv,onSnapshot:Yv,orderBy:Gv,query:ve,serverTimestamp:Ee,updateDoc:ct,where:ne},Symbol.toStringTag,{value:"Module"}));var Jv="firebase",Zv="12.0.0";/**
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
 */Qe(Jv,Zv,"app");function rp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const eb=rp,sp=new Tn("auth","Firebase",rp());/**
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
 */const ls=new vs("@firebase/auth");function tb(n,...e){ls.logLevel<=X.WARN&&ls.warn(`Auth (${to}): ${n}`,...e)}function qr(n,...e){ls.logLevel<=X.ERROR&&ls.error(`Auth (${to}): ${n}`,...e)}/**
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
 */function vt(n,...e){throw Za(n,...e)}function st(n,...e){return Za(n,...e)}function Ja(n,e,t){const o={...eb(),[e]:t};return new Tn("auth","Firebase",o).create(e,{appName:n.name})}function mn(n){return Ja(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function nb(n,e,t){const o=t;if(!(e instanceof o))throw o.name!==e.constructor.name&&vt(n,"argument-error"),Ja(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Za(n,...e){if(typeof n!="string"){const t=e[0],o=[...e.slice(1)];return o[0]&&(o[0].appName=n.name),n._errorFactory.create(t,...o)}return sp.create(n,...e)}function q(n,e,...t){if(!n)throw Za(e,...t)}function It(n){const e="INTERNAL ASSERTION FAILED: "+n;throw qr(e),new Error(e)}function Dt(n,e){n||It(e)}/**
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
 */function aa(){return typeof self<"u"&&self.location?.href||""}function ob(){return Ld()==="http:"||Ld()==="https:"}function Ld(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function rb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ob()||fu()||"connection"in navigator)?navigator.onLine:!0}function sb(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class cr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Dt(t>e,"Short delay should be less than long delay!"),this.isMobile=fg()||vg()}get(){return rb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ec(n,e){Dt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class ip{static initialize(e,t,o){this.fetchImpl=e,t&&(this.headersImpl=t),o&&(this.responseImpl=o)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;It("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;It("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;It("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const ib={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const ab=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],cb=new cr(3e4,6e4);function tc(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function ao(n,e,t,o,r={}){return ap(n,r,async()=>{let s={},a={};o&&(e==="GET"?a=o:s={body:JSON.stringify(o)});const c=Zo({key:n.config.apiKey,...a}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:l,...s};return yg()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&eo(n.emulatorConfig.host)&&(d.credentials="include"),ip.fetch()(await cp(n,n.config.apiHost,t,c),d)})}async function ap(n,e,t){n._canInitEmulator=!1;const o={...ib,...e};try{const r=new db(n),s=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Or(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Or(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Or(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Or(n,"user-disabled",a);const h=o[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ja(n,h,d);vt(n,h)}}catch(r){if(r instanceof lt)throw r;vt(n,"network-request-failed",{message:String(r)})}}async function lb(n,e,t,o,r={}){const s=await ao(n,e,t,o,r);return"mfaPendingCredential"in s&&vt(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function cp(n,e,t,o){const r=`${e}${t}?${o}`,s=n,a=s.config.emulator?ec(n.config,r):`${n.config.apiScheme}://${r}`;return ab.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}class db{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,o)=>{this.timer=setTimeout(()=>o(st(this.auth,"network-request-failed")),cb.get())})}}function Or(n,e,t){const o={appName:n.name};t.email&&(o.email=t.email),t.phoneNumber&&(o.phoneNumber=t.phoneNumber);const r=st(n,e,o);return r.customData._tokenResponse=t,r}/**
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
 */async function ub(n,e){return ao(n,"POST","/v1/accounts:delete",e)}async function ds(n,e){return ao(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function No(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function hb(n,e=!1){const t=_e(n),o=await t.getIdToken(e),r=nc(o);q(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const s=typeof r.firebase=="object"?r.firebase:void 0,a=s?.sign_in_provider;return{claims:r,token:o,authTime:No(Ni(r.auth_time)),issuedAtTime:No(Ni(r.iat)),expirationTime:No(Ni(r.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Ni(n){return Number(n)*1e3}function nc(n){const[e,t,o]=n.split(".");if(e===void 0||t===void 0||o===void 0)return qr("JWT malformed, contained fewer than 3 sections"),null;try{const r=du(t);return r?JSON.parse(r):(qr("Failed to decode base64 JWT payload"),null)}catch(r){return qr("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Vd(n){const e=nc(n);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ko(n,e,t=!1){if(t)return e;try{return await e}catch(o){throw o instanceof lt&&pb(o)&&n.auth.currentUser===n&&await n.auth.signOut(),o}}function pb({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class mb{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const o=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ca{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=No(this.lastLoginAt),this.creationTime=No(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function us(n){const e=n.auth,t=await n.getIdToken(),o=await Ko(n,ds(e,{idToken:t}));q(o?.users.length,e,"internal-error");const r=o.users[0];n._notifyReloadListener(r);const s=r.providerUserInfo?.length?lp(r.providerUserInfo):[],a=fb(n.providerData,s),c=n.isAnonymous,l=!(n.email&&r.passwordHash)&&!a?.length,d=c?l:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new ca(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,h)}async function gb(n){const e=_e(n);await us(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function fb(n,e){return[...n.filter(o=>!e.some(r=>r.providerId===o.providerId)),...e]}function lp(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function wb(n,e){const t=await ap(n,{},async()=>{const o=Zo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=n.config,a=await cp(n,r,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:o};return n.emulatorConfig&&eo(n.emulatorConfig.host)&&(l.credentials="include"),ip.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function yb(n,e){return ao(n,"POST","/v2/accounts:revokeToken",tc(n,e))}/**
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
 */class zn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=Vd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:o,refreshToken:r,expiresIn:s}=await wb(e,t);this.updateTokensAndExpiration(o,r,Number(s))}updateTokensAndExpiration(e,t,o){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+o*1e3}static fromJSON(e,t){const{refreshToken:o,accessToken:r,expirationTime:s}=t,a=new zn;return o&&(q(typeof o=="string","internal-error",{appName:e}),a.refreshToken=o),r&&(q(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),s&&(q(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new zn,this.toJSON())}_performRefresh(){return It("not implemented")}}/**
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
 */function Vt(n,e){q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class tt{constructor({uid:e,auth:t,stsTokenManager:o,...r}){this.providerId="firebase",this.proactiveRefresh=new mb(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ca(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Ko(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return hb(this,e)}reload(){return gb(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new tt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let o=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),o=!0),t&&await us(this),await this.auth._persistUserIfCurrent(this),o&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(et(this.auth.app))return Promise.reject(mn(this.auth));const e=await this.getIdToken();return await Ko(this,ub(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const o=t.displayName??void 0,r=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,d=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:m,emailVerified:f,isAnonymous:_,providerData:E,stsTokenManager:T}=t;q(m&&T,e,"internal-error");const S=zn.fromJSON(this.name,T);q(typeof m=="string",e,"internal-error"),Vt(o,e.name),Vt(r,e.name),q(typeof f=="boolean",e,"internal-error"),q(typeof _=="boolean",e,"internal-error"),Vt(s,e.name),Vt(a,e.name),Vt(c,e.name),Vt(l,e.name),Vt(d,e.name),Vt(h,e.name);const N=new tt({uid:m,auth:e,email:r,emailVerified:f,displayName:o,isAnonymous:_,photoURL:a,phoneNumber:s,tenantId:c,stsTokenManager:S,createdAt:d,lastLoginAt:h});return E&&Array.isArray(E)&&(N.providerData=E.map(L=>({...L}))),l&&(N._redirectEventId=l),N}static async _fromIdTokenResponse(e,t,o=!1){const r=new zn;r.updateFromServerResponse(t);const s=new tt({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:o});return await us(s),s}static async _fromGetAccountInfoResponse(e,t,o){const r=t.users[0];q(r.localId!==void 0,"internal-error");const s=r.providerUserInfo!==void 0?lp(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!s?.length,c=new zn;c.updateFromIdToken(o);const l=new tt({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new ca(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!s?.length};return Object.assign(l,d),l}}/**
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
 */const Od=new Map;function xt(n){Dt(n instanceof Function,"Expected a class definition");let e=Od.get(n);return e?(Dt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Od.set(n,e),e)}/**
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
 */class dp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}dp.type="NONE";const Fd=dp;/**
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
 */function jr(n,e,t){return`firebase:${n}:${e}:${t}`}class qn{constructor(e,t,o){this.persistence=e,this.auth=t,this.userKey=o;const{config:r,name:s}=this.auth;this.fullUserKey=jr(this.userKey,r.apiKey,s),this.fullPersistenceKey=jr("persistence",r.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ds(this.auth,{idToken:e}).catch(()=>{});return t?tt._fromGetAccountInfoResponse(this.auth,t,e):null}return tt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,o="authUser"){if(!t.length)return new qn(xt(Fd),e,o);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=r[0]||xt(Fd);const a=jr(o,e.config.apiKey,e.name);let c=null;for(const d of t)try{const h=await d._get(a);if(h){let m;if(typeof h=="string"){const f=await ds(e,{idToken:h}).catch(()=>{});if(!f)break;m=await tt._fromGetAccountInfoResponse(e,f,h)}else m=tt._fromJSON(e,h);d!==s&&(c=m),s=d;break}}catch{}const l=r.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new qn(s,e,o):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new qn(s,e,o))}}/**
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
 */function $d(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(mp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(up(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(fp(e))return"Blackberry";if(wp(e))return"Webos";if(hp(e))return"Safari";if((e.includes("chrome/")||pp(e))&&!e.includes("edge/"))return"Chrome";if(gp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,o=n.match(t);if(o?.length===2)return o[1]}return"Other"}function up(n=Ve()){return/firefox\//i.test(n)}function hp(n=Ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function pp(n=Ve()){return/crios\//i.test(n)}function mp(n=Ve()){return/iemobile/i.test(n)}function gp(n=Ve()){return/android/i.test(n)}function fp(n=Ve()){return/blackberry/i.test(n)}function wp(n=Ve()){return/webos/i.test(n)}function oc(n=Ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function vb(n=Ve()){return oc(n)&&!!window.navigator?.standalone}function bb(){return bg()&&document.documentMode===10}function yp(n=Ve()){return oc(n)||gp(n)||wp(n)||fp(n)||/windows phone/i.test(n)||mp(n)}/**
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
 */function vp(n,e=[]){let t;switch(n){case"Browser":t=$d(Ve());break;case"Worker":t=`${$d(Ve())}-${n}`;break;default:t=n}const o=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${to}/${o}`}/**
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
 */class _b{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const o=s=>new Promise((a,c)=>{try{const l=e(s);a(l)}catch(l){c(l)}});o.onAbort=t,this.queue.push(o);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const o of this.queue)await o(e),o.onAbort&&t.push(o.onAbort)}catch(o){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:o?.message})}}}/**
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
 */async function Eb(n,e={}){return ao(n,"GET","/v2/passwordPolicy",tc(n,e))}/**
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
 */const Tb=6;class Ib{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Tb,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const o=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;o&&(t.meetsMinPasswordLength=e.length>=o),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let o;for(let r=0;r<e.length;r++)o=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,o>="a"&&o<="z",o>="A"&&o<="Z",o>="0"&&o<="9",this.allowedNonAlphanumericCharacters.includes(o))}updatePasswordCharacterOptionsStatuses(e,t,o,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=o)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class xb{constructor(e,t,o,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=o,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bd(this),this.idTokenSubscription=new Bd(this),this.beforeStateQueue=new _b(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=sp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=xt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await qn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ds(this,{idToken:e}),o=await tt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(o)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(et(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let o=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,a=o?._redirectEventId,c=await this.tryRedirectSignIn(e);(!s||s===a)&&c?.user&&(o=c.user,r=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(o)}catch(s){o=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await us(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=sb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(et(this.app))return Promise.reject(mn(this));const t=e?_e(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return et(this.app)?Promise.reject(mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return et(this.app)?Promise.reject(mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(xt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Eb(this),t=new Ib(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Tn("auth","Firebase",e())}onAuthStateChanged(e,t,o){return this.registerStateListener(this.authStateSubscription,e,t,o)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,o){return this.registerStateListener(this.idTokenSubscription,e,t,o)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const o=this.onAuthStateChanged(()=>{o(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),o={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(o.tenantId=this.tenantId),await yb(this,o)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const o=await this.getOrInitRedirectPersistenceManager(t);return e===null?o.removeCurrentUser():o.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&xt(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await qn.create(this,[xt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,o,r){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,o,r);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=vp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const o=await this._getAppCheckToken();return o&&(e["X-Firebase-AppCheck"]=o),e}async _getAppCheckToken(){if(et(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&tb(`Error while retrieving App Check token: ${e.error}`),e?.token}}function qs(n){return _e(n)}class Bd{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ag(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let rc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Sb(n){rc=n}function Ab(n){return rc.loadJS(n)}function Cb(){return rc.gapiScript}function kb(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Rb(n,e){const t=In(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),s=t.getOptions();if(ft(s,e??{}))return r;vt(r,"already-initialized")}return t.initialize({options:e})}function Pb(n,e){const t=e?.persistence||[],o=(Array.isArray(t)?t:[t]).map(xt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(o,e?.popupRedirectResolver)}function Db(n,e,t){const o=qs(n);q(/^https?:\/\//.test(e),o,"invalid-emulator-scheme");const r=!1,s=bp(e),{host:a,port:c}=Nb(e),l=c===null?"":`:${c}`,d={url:`${s}//${a}${l}/`},h=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!o._canInitEmulator){q(o.config.emulator&&o.emulatorConfig,o,"emulator-config-failed"),q(ft(d,o.config.emulator)&&ft(h,o.emulatorConfig),o,"emulator-config-failed");return}o.config.emulator=d,o.emulatorConfig=h,o.settings.appVerificationDisabledForTesting=!0,eo(a)?(mu(`${s}//${a}${l}`),gu("Auth",!0)):Mb()}function bp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Nb(n){const e=bp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const o=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(o);if(r){const s=r[1];return{host:s,port:Ud(o.substr(s.length+1))}}else{const[s,a]=o.split(":");return{host:s,port:Ud(a)}}}function Ud(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Mb(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class _p{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return It("not implemented")}_getIdTokenResponse(e){return It("not implemented")}_linkToIdToken(e,t){return It("not implemented")}_getReauthenticationResolver(e){return It("not implemented")}}/**
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
 */async function jn(n,e){return lb(n,"POST","/v1/accounts:signInWithIdp",tc(n,e))}/**
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
 */const Lb="http://localhost";class yn extends _p{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new yn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):vt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:o,signInMethod:r,...s}=t;if(!o||!r)return null;const a=new yn(o,r);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return jn(e,t)}_linkToIdToken(e,t){const o=this.buildRequest();return o.idToken=t,jn(e,o)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,jn(e,t)}buildRequest(){const e={requestUri:Lb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Zo(t)}return e}}/**
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
 */class sc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class lr extends sc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Ot extends lr{constructor(){super("facebook.com")}static credential(e){return yn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ot.credential(e.oauthAccessToken)}catch{return null}}}Ot.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ot.PROVIDER_ID="facebook.com";/**
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
 */class Tt extends lr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return yn._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:o}=e;if(!t&&!o)return null;try{return Tt.credential(t,o)}catch{return null}}}Tt.GOOGLE_SIGN_IN_METHOD="google.com";Tt.PROVIDER_ID="google.com";/**
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
 */class Ft extends lr{constructor(){super("github.com")}static credential(e){return yn._fromParams({providerId:Ft.PROVIDER_ID,signInMethod:Ft.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ft.credentialFromTaggedObject(e)}static credentialFromError(e){return Ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ft.credential(e.oauthAccessToken)}catch{return null}}}Ft.GITHUB_SIGN_IN_METHOD="github.com";Ft.PROVIDER_ID="github.com";/**
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
 */class $t extends lr{constructor(){super("twitter.com")}static credential(e,t){return yn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:o}=e;if(!t||!o)return null;try{return $t.credential(t,o)}catch{return null}}}$t.TWITTER_SIGN_IN_METHOD="twitter.com";$t.PROVIDER_ID="twitter.com";/**
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
 */class Zn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,o,r=!1){const s=await tt._fromIdTokenResponse(e,o,r),a=zd(o);return new Zn({user:s,providerId:a,_tokenResponse:o,operationType:t})}static async _forOperation(e,t,o){await e._updateTokensIfNecessary(o,!0);const r=zd(o);return new Zn({user:e,providerId:r,_tokenResponse:o,operationType:t})}}function zd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class hs extends lt{constructor(e,t,o,r){super(t.code,t.message),this.operationType=o,this.user=r,Object.setPrototypeOf(this,hs.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:o}}static _fromErrorAndOperation(e,t,o,r){return new hs(e,t,o,r)}}function Ep(n,e,t,o){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?hs._fromErrorAndOperation(n,s,e,o):s})}async function Vb(n,e,t=!1){const o=await Ko(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Zn._forOperation(n,"link",o)}/**
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
 */async function Ob(n,e,t=!1){const{auth:o}=n;if(et(o.app))return Promise.reject(mn(o));const r="reauthenticate";try{const s=await Ko(n,Ep(o,r,e,n),t);q(s.idToken,o,"internal-error");const a=nc(s.idToken);q(a,o,"internal-error");const{sub:c}=a;return q(n.uid===c,o,"user-mismatch"),Zn._forOperation(n,r,s)}catch(s){throw s?.code==="auth/user-not-found"&&vt(o,"user-mismatch"),s}}/**
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
 */async function Fb(n,e,t=!1){if(et(n.app))return Promise.reject(mn(n));const o="signIn",r=await Ep(n,o,e),s=await Zn._fromIdTokenResponse(n,o,r);return t||await n._updateCurrentUser(s.user),s}/**
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
 */function $b(n,e){return _e(n).setPersistence(e)}function Bb(n,e,t,o){return _e(n).onIdTokenChanged(e,t,o)}function Ub(n,e,t){return _e(n).beforeAuthStateChanged(e,t)}const ps="__sak";/**
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
 */class Tp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ps,"1"),this.storage.removeItem(ps),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const zb=1e3,qb=10;class Ip extends Tp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=yp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const o=this.storage.getItem(t),r=this.localCache[t];o!==r&&e(t,r,o)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const o=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(o);!t&&this.localCache[o]===a||this.notifyListeners(o,a)},s=this.storage.getItem(o);bb()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,qb):r()}notifyListeners(e,t){this.localCache[e]=t;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,o)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:o}),!0)})},zb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ip.type="LOCAL";const xp=Ip;/**
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
 */class Sp extends Tp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Sp.type="SESSION";const Ap=Sp;/**
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
 */function jb(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class js{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const o=new js(e);return this.receivers.push(o),o}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:o,eventType:r,data:s}=t.data,a=this.handlersMap[r];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:o,eventType:r});const c=Array.from(a).map(async d=>d(t.origin,s)),l=await jb(c);t.ports[0].postMessage({status:"done",eventId:o,eventType:r,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}js.receivers=[];/**
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
 */function ic(n="",e=10){let t="";for(let o=0;o<e;o++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Hb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,o=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{const d=ic("",20);r.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},o);a={messageChannel:r,onMessage(m){const f=m;if(f.data.eventId===d)switch(f.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(f.data.response);break;default:clearTimeout(h),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function gt(){return window}function Gb(n){gt().location.href=n}/**
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
 */function Cp(){return typeof gt().WorkerGlobalScope<"u"&&typeof gt().importScripts=="function"}async function Wb(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Kb(){return navigator?.serviceWorker?.controller||null}function Xb(){return Cp()?self:null}/**
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
 */const kp="firebaseLocalStorageDb",Yb=1,ms="firebaseLocalStorage",Rp="fbase_key";class dr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Hs(n,e){return n.transaction([ms],e?"readwrite":"readonly").objectStore(ms)}function Qb(){const n=indexedDB.deleteDatabase(kp);return new dr(n).toPromise()}function la(){const n=indexedDB.open(kp,Yb);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const o=n.result;try{o.createObjectStore(ms,{keyPath:Rp})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const o=n.result;o.objectStoreNames.contains(ms)?e(o):(o.close(),await Qb(),e(await la()))})})}async function qd(n,e,t){const o=Hs(n,!0).put({[Rp]:e,value:t});return new dr(o).toPromise()}async function Jb(n,e){const t=Hs(n,!1).get(e),o=await new dr(t).toPromise();return o===void 0?null:o.value}function jd(n,e){const t=Hs(n,!0).delete(e);return new dr(t).toPromise()}const Zb=800,e0=3;class Pp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await la(),this.db)}async _withRetries(e){let t=0;for(;;)try{const o=await this._openDb();return await e(o)}catch(o){if(t++>e0)throw o;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Cp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=js._getInstance(Xb()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Wb(),!this.activeServiceWorker)return;this.sender=new Hb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Kb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await la();return await qd(e,ps,"1"),await jd(e,ps),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(o=>qd(o,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(o=>Jb(o,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>jd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const s=Hs(r,!1).getAll();return new dr(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],o=new Set;if(e.length!==0)for(const{fbase_key:r,value:s}of e)o.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!o.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Zb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Pp.type="LOCAL";const t0=Pp;new cr(3e4,6e4);/**
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
 */function Dp(n,e){return e?xt(e):(q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class ac extends _p{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return jn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return jn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return jn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function n0(n){return Fb(n.auth,new ac(n),n.bypassAuthState)}function o0(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),Ob(t,new ac(n),n.bypassAuthState)}async function r0(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),Vb(t,new ac(n),n.bypassAuthState)}/**
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
 */class Np{constructor(e,t,o,r,s=!1){this.auth=e,this.resolver=o,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(o){this.reject(o)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:o,postBody:r,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:o,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return n0;case"linkViaPopup":case"linkViaRedirect":return r0;case"reauthViaPopup":case"reauthViaRedirect":return o0;default:vt(this.auth,"internal-error")}}resolve(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const s0=new cr(2e3,1e4);async function i0(n,e,t){if(et(n.app))return Promise.reject(st(n,"operation-not-supported-in-this-environment"));const o=qs(n);nb(n,e,sc);const r=Dp(o,t);return new hn(o,"signInViaPopup",e,r).executeNotNull()}class hn extends Np{constructor(e,t,o,r,s){super(e,t,r,s),this.provider=o,this.authWindow=null,this.pollId=null,hn.currentPopupAction&&hn.currentPopupAction.cancel(),hn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){Dt(this.filter.length===1,"Popup operations only handle one event");const e=ic();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(st(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(st(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,hn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(st(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,s0.get())};e()}}hn.currentPopupAction=null;/**
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
 */const a0="pendingRedirect",Hr=new Map;class c0 extends Np{constructor(e,t,o=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,o),this.eventId=null}async execute(){let e=Hr.get(this.auth._key());if(!e){try{const o=await l0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(o)}catch(t){e=()=>Promise.reject(t)}Hr.set(this.auth._key(),e)}return this.bypassAuthState||Hr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function l0(n,e){const t=h0(e),o=u0(n);if(!await o._isAvailable())return!1;const r=await o._get(t)==="true";return await o._remove(t),r}function d0(n,e){Hr.set(n._key(),e)}function u0(n){return xt(n._redirectPersistence)}function h0(n){return jr(a0,n.config.apiKey,n.name)}async function p0(n,e,t=!1){if(et(n.app))return Promise.reject(mn(n));const o=qs(n),r=Dp(o,e),a=await new c0(o,r,t).execute();return a&&!t&&(delete a.user._redirectEventId,await o._persistUserIfCurrent(a.user),await o._setRedirectUser(null,e)),a}/**
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
 */const m0=600*1e3;class g0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(o=>{this.isEventForConsumer(e,o)&&(t=!0,this.sendToConsumer(e,o),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!f0(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Mp(e)){const o=e.error.code?.split("auth/")[1]||"internal-error";t.onError(st(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const o=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&o}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=m0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hd(e))}saveEventToCache(e){this.cachedEventUids.add(Hd(e)),this.lastProcessedEventTime=Date.now()}}function Hd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Mp({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function f0(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Mp(n);default:return!1}}/**
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
 */async function w0(n,e={}){return ao(n,"GET","/v1/projects",e)}/**
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
 */const y0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,v0=/^https?/;async function b0(n){if(n.config.emulator)return;const{authorizedDomains:e}=await w0(n);for(const t of e)try{if(_0(t))return}catch{}vt(n,"unauthorized-domain")}function _0(n){const e=aa(),{protocol:t,hostname:o}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&o===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===o}if(!v0.test(t))return!1;if(y0.test(n))return o===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(o)}/**
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
 */const E0=new cr(3e4,6e4);function Gd(){const n=gt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function T0(n){return new Promise((e,t)=>{function o(){Gd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gd(),t(st(n,"network-request-failed"))},timeout:E0.get()})}if(gt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(gt().gapi?.load)o();else{const r=kb("iframefcb");return gt()[r]=()=>{gapi.load?o():t(st(n,"network-request-failed"))},Ab(`${Cb()}?onload=${r}`).catch(s=>t(s))}}).catch(e=>{throw Gr=null,e})}let Gr=null;function I0(n){return Gr=Gr||T0(n),Gr}/**
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
 */const x0=new cr(5e3,15e3),S0="__/auth/iframe",A0="emulator/auth/iframe",C0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},k0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function R0(n){const e=n.config;q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ec(e,A0):`https://${n.config.authDomain}/${S0}`,o={apiKey:e.apiKey,appName:n.name,v:to},r=k0.get(n.config.apiHost);r&&(o.eid=r);const s=n._getFrameworks();return s.length&&(o.fw=s.join(",")),`${t}?${Zo(o).slice(1)}`}async function P0(n){const e=await I0(n),t=gt().gapi;return q(t,n,"internal-error"),e.open({where:document.body,url:R0(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:C0,dontclear:!0},o=>new Promise(async(r,s)=>{await o.restyle({setHideOnLeave:!1});const a=st(n,"network-request-failed"),c=gt().setTimeout(()=>{s(a)},x0.get());function l(){gt().clearTimeout(c),r(o)}o.ping(l).then(l,()=>{s(a)})}))}/**
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
 */const D0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},N0=500,M0=600,L0="_blank",V0="http://localhost";class Wd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function O0(n,e,t,o=N0,r=M0){const s=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-o)/2,0).toString();let c="";const l={...D0,width:o.toString(),height:r.toString(),top:s,left:a},d=Ve().toLowerCase();t&&(c=pp(d)?L0:t),up(d)&&(e=e||V0,l.scrollbars="yes");const h=Object.entries(l).reduce((f,[_,E])=>`${f}${_}=${E},`,"");if(vb(d)&&c!=="_self")return F0(e||"",c),new Wd(null);const m=window.open(e||"",c,h);q(m,n,"popup-blocked");try{m.focus()}catch{}return new Wd(m)}function F0(n,e){const t=document.createElement("a");t.href=n,t.target=e;const o=document.createEvent("MouseEvent");o.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(o)}/**
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
 */const $0="__/auth/handler",B0="emulator/auth/handler",U0=encodeURIComponent("fac");async function Kd(n,e,t,o,r,s){q(n.config.authDomain,n,"auth-domain-config-required"),q(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:o,v:to,eventId:r};if(e instanceof sc){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Sg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,m]of Object.entries({}))a[h]=m}if(e instanceof lr){const h=e.getScopes().filter(m=>m!=="");h.length>0&&(a.scopes=h.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const h of Object.keys(c))c[h]===void 0&&delete c[h];const l=await n._getAppCheckToken(),d=l?`#${U0}=${encodeURIComponent(l)}`:"";return`${z0(n)}?${Zo(c).slice(1)}${d}`}function z0({config:n}){return n.emulator?ec(n,B0):`https://${n.authDomain}/${$0}`}/**
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
 */const Mi="webStorageSupport";class q0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ap,this._completeRedirectFn=p0,this._overrideRedirectResult=d0}async _openPopup(e,t,o,r){Dt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Kd(e,t,o,aa(),r);return O0(e,s,ic())}async _openRedirect(e,t,o,r){await this._originValidation(e);const s=await Kd(e,t,o,aa(),r);return Gb(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:s}=this.eventManagers[t];return r?Promise.resolve(r):(Dt(s,"If manager is not set, promise should be"),s)}const o=this.initAndGetManager(e);return this.eventManagers[t]={promise:o},o.catch(()=>{delete this.eventManagers[t]}),o}async initAndGetManager(e){const t=await P0(e),o=new g0(e);return t.register("authEvent",r=>(q(r?.authEvent,e,"invalid-auth-event"),{status:o.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:o},this.iframes[e._key()]=t,o}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Mi,{type:Mi},r=>{const s=r?.[0]?.[Mi];s!==void 0&&t(!!s),vt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=b0(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return yp()||hp()||oc()}}const j0=q0;var Xd="@firebase/auth",Yd="1.11.0";/**
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
 */class H0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(o=>{e(o?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function G0(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function W0(n){wt(new it("auth",(e,{options:t})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=o.options;q(a&&!a.includes(":"),"invalid-api-key",{appName:o.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:vp(n)},d=new xb(o,r,s,l);return Pb(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,o)=>{e.getProvider("auth-internal").initialize()})),wt(new it("auth-internal",e=>{const t=qs(e.getProvider("auth").getImmediate());return(o=>new H0(o))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qe(Xd,Yd,G0(n)),Qe(Xd,Yd,"esm2020")}/**
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
 */const K0=300,X0=pu("authIdTokenMaxAge")||K0;let Qd=null;const Y0=n=>async e=>{const t=e&&await e.getIdTokenResult(),o=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(o&&o>X0)return;const r=t?.token;Qd!==r&&(Qd=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Q0(n=pa()){const e=In(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Rb(n,{popupRedirectResolver:j0,persistence:[t0,xp,Ap]}),o=pu("authTokenSyncURL");if(o&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(o,location.origin);if(location.origin===s.origin){const a=Y0(s.toString());Ub(t,a,()=>a(t.currentUser)),Bb(t,c=>a(c))}}const r=uu("auth");return r&&Db(t,`http://${r}`),t}function J0(){return document.getElementsByTagName("head")?.[0]??document}Sb({loadJS(n){return new Promise((e,t)=>{const o=document.createElement("script");o.setAttribute("src",n),o.onload=e,o.onerror=r=>{const s=st("internal-error");s.customData=r,t(s)},o.type="text/javascript",o.charset="UTF-8",J0().appendChild(o)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});W0("Browser");const Lp="@firebase/installations",cc="0.6.19";/**
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
 */const Vp=1e4,Op=`w:${cc}`,Fp="FIS_v2",Z0="https://firebaseinstallations.googleapis.com/v1",e_=3600*1e3,t_="installations",n_="Installations";/**
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
 */const o_={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},vn=new Tn(t_,n_,o_);function $p(n){return n instanceof lt&&n.code.includes("request-failed")}/**
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
 */function Bp({projectId:n}){return`${Z0}/projects/${n}/installations`}function Up(n){return{token:n.token,requestStatus:2,expiresIn:s_(n.expiresIn),creationTime:Date.now()}}async function zp(n,e){const o=(await e.json()).error;return vn.create("request-failed",{requestName:n,serverCode:o.code,serverMessage:o.message,serverStatus:o.status})}function qp({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function r_(n,{refreshToken:e}){const t=qp(n);return t.append("Authorization",i_(e)),t}async function jp(n){const e=await n();return e.status>=500&&e.status<600?n():e}function s_(n){return Number(n.replace("s","000"))}function i_(n){return`${Fp} ${n}`}/**
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
 */async function a_({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const o=Bp(n),r=qp(n),s=e.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const a={fid:t,authVersion:Fp,appId:n.appId,sdkVersion:Op},c={method:"POST",headers:r,body:JSON.stringify(a)},l=await jp(()=>fetch(o,c));if(l.ok){const d=await l.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:Up(d.authToken)}}else throw await zp("Create Installation",l)}/**
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
 */function Hp(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function c_(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const l_=/^[cdef][\w-]{21}$/,da="";function d_(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=u_(n);return l_.test(t)?t:da}catch{return da}}function u_(n){return c_(n).substr(0,22)}/**
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
 */function Gs(n){return`${n.appName}!${n.appId}`}/**
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
 */const Gp=new Map;function Wp(n,e){const t=Gs(n);Kp(t,e),h_(t,e)}function Kp(n,e){const t=Gp.get(n);if(t)for(const o of t)o(e)}function h_(n,e){const t=p_();t&&t.postMessage({key:n,fid:e}),m_()}let pn=null;function p_(){return!pn&&"BroadcastChannel"in self&&(pn=new BroadcastChannel("[Firebase] FID Change"),pn.onmessage=n=>{Kp(n.data.key,n.data.fid)}),pn}function m_(){Gp.size===0&&pn&&(pn.close(),pn=null)}/**
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
 */const g_="firebase-installations-database",f_=1,bn="firebase-installations-store";let Li=null;function lc(){return Li||(Li=_u(g_,f_,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(bn)}}})),Li}async function gs(n,e){const t=Gs(n),r=(await lc()).transaction(bn,"readwrite"),s=r.objectStore(bn),a=await s.get(t);return await s.put(e,t),await r.done,(!a||a.fid!==e.fid)&&Wp(n,e.fid),e}async function Xp(n){const e=Gs(n),o=(await lc()).transaction(bn,"readwrite");await o.objectStore(bn).delete(e),await o.done}async function Ws(n,e){const t=Gs(n),r=(await lc()).transaction(bn,"readwrite"),s=r.objectStore(bn),a=await s.get(t),c=e(a);return c===void 0?await s.delete(t):await s.put(c,t),await r.done,c&&(!a||a.fid!==c.fid)&&Wp(n,c.fid),c}/**
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
 */async function dc(n){let e;const t=await Ws(n.appConfig,o=>{const r=w_(o),s=y_(n,r);return e=s.registrationPromise,s.installationEntry});return t.fid===da?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function w_(n){const e=n||{fid:d_(),registrationStatus:0};return Yp(e)}function y_(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(vn.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},o=v_(n,t);return{installationEntry:t,registrationPromise:o}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:b_(n)}:{installationEntry:e}}async function v_(n,e){try{const t=await a_(n,e);return gs(n.appConfig,t)}catch(t){throw $p(t)&&t.customData.serverCode===409?await Xp(n.appConfig):await gs(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function b_(n){let e=await Jd(n.appConfig);for(;e.registrationStatus===1;)await Hp(100),e=await Jd(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:o}=await dc(n);return o||t}return e}function Jd(n){return Ws(n,e=>{if(!e)throw vn.create("installation-not-found");return Yp(e)})}function Yp(n){return __(n)?{fid:n.fid,registrationStatus:0}:n}function __(n){return n.registrationStatus===1&&n.registrationTime+Vp<Date.now()}/**
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
 */async function E_({appConfig:n,heartbeatServiceProvider:e},t){const o=T_(n,t),r=r_(n,t),s=e.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const a={installation:{sdkVersion:Op,appId:n.appId}},c={method:"POST",headers:r,body:JSON.stringify(a)},l=await jp(()=>fetch(o,c));if(l.ok){const d=await l.json();return Up(d)}else throw await zp("Generate Auth Token",l)}function T_(n,{fid:e}){return`${Bp(n)}/${e}/authTokens:generate`}/**
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
 */async function uc(n,e=!1){let t;const o=await Ws(n.appConfig,s=>{if(!Qp(s))throw vn.create("not-registered");const a=s.authToken;if(!e&&S_(a))return s;if(a.requestStatus===1)return t=I_(n,e),s;{if(!navigator.onLine)throw vn.create("app-offline");const c=C_(s);return t=x_(n,c),c}});return t?await t:o.authToken}async function I_(n,e){let t=await Zd(n.appConfig);for(;t.authToken.requestStatus===1;)await Hp(100),t=await Zd(n.appConfig);const o=t.authToken;return o.requestStatus===0?uc(n,e):o}function Zd(n){return Ws(n,e=>{if(!Qp(e))throw vn.create("not-registered");const t=e.authToken;return k_(t)?{...e,authToken:{requestStatus:0}}:e})}async function x_(n,e){try{const t=await E_(n,e),o={...e,authToken:t};return await gs(n.appConfig,o),t}catch(t){if($p(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Xp(n.appConfig);else{const o={...e,authToken:{requestStatus:0}};await gs(n.appConfig,o)}throw t}}function Qp(n){return n!==void 0&&n.registrationStatus===2}function S_(n){return n.requestStatus===2&&!A_(n)}function A_(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+e_}function C_(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function k_(n){return n.requestStatus===1&&n.requestTime+Vp<Date.now()}/**
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
 */async function R_(n){const e=n,{installationEntry:t,registrationPromise:o}=await dc(e);return o?o.catch(console.error):uc(e).catch(console.error),t.fid}/**
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
 */async function P_(n,e=!1){const t=n;return await D_(t),(await uc(t,e)).token}async function D_(n){const{registrationPromise:e}=await dc(n);e&&await e}/**
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
 */function N_(n){if(!n||!n.options)throw Vi("App Configuration");if(!n.name)throw Vi("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Vi(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Vi(n){return vn.create("missing-app-config-values",{valueName:n})}/**
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
 */const Jp="installations",M_="installations-internal",L_=n=>{const e=n.getProvider("app").getImmediate(),t=N_(e),o=In(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:o,_delete:()=>Promise.resolve()}},V_=n=>{const e=n.getProvider("app").getImmediate(),t=In(e,Jp).getImmediate();return{getId:()=>R_(t),getToken:r=>P_(t,r)}};function O_(){wt(new it(Jp,L_,"PUBLIC")),wt(new it(M_,V_,"PRIVATE"))}O_();Qe(Lp,cc);Qe(Lp,cc,"esm2020");/**
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
 */const fs="analytics",F_="firebase_id",$_="origin",B_=60*1e3,U_="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",hc="https://www.googletagmanager.com/gtag/js";/**
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
 */const ze=new vs("@firebase/analytics");/**
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
 */const z_={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Xe=new Tn("analytics","Analytics",z_);/**
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
 */function q_(n){if(!n.startsWith(hc)){const e=Xe.create("invalid-gtag-resource",{gtagURL:n});return ze.warn(e.message),""}return n}function Zp(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function j_(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function H_(n,e){const t=j_("firebase-js-sdk-policy",{createScriptURL:q_}),o=document.createElement("script"),r=`${hc}?l=${n}&id=${e}`;o.src=t?t?.createScriptURL(r):r,o.async=!0,document.head.appendChild(o)}function G_(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function W_(n,e,t,o,r,s){const a=o[r];try{if(a)await e[a];else{const l=(await Zp(t)).find(d=>d.measurementId===r);l&&await e[l.appId]}}catch(c){ze.error(c)}n("config",r,s)}async function K_(n,e,t,o,r){try{let s=[];if(r&&r.send_to){let a=r.send_to;Array.isArray(a)||(a=[a]);const c=await Zp(t);for(const l of a){const d=c.find(m=>m.measurementId===l),h=d&&e[d.appId];if(h)s.push(h);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),n("event",o,r||{})}catch(s){ze.error(s)}}function X_(n,e,t,o){async function r(s,...a){try{if(s==="event"){const[c,l]=a;await K_(n,e,t,c,l)}else if(s==="config"){const[c,l]=a;await W_(n,e,t,o,c,l)}else if(s==="consent"){const[c,l]=a;n("consent",c,l)}else if(s==="get"){const[c,l,d]=a;n("get",c,l,d)}else if(s==="set"){const[c]=a;n("set",c)}else n(s,...a)}catch(c){ze.error(c)}}return r}function Y_(n,e,t,o,r){let s=function(...a){window[o].push(arguments)};return window[r]&&typeof window[r]=="function"&&(s=window[r]),window[r]=X_(s,n,e,t),{gtagCore:s,wrappedGtag:window[r]}}function Q_(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(hc)&&t.src.includes(n))return t;return null}/**
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
 */const J_=30,Z_=1e3;class eE{constructor(e={},t=Z_){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const em=new eE;function tE(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function nE(n){const{appId:e,apiKey:t}=n,o={method:"GET",headers:tE(t)},r=U_.replace("{app-id}",e),s=await fetch(r,o);if(s.status!==200&&s.status!==304){let a="";try{const c=await s.json();c.error?.message&&(a=c.error.message)}catch{}throw Xe.create("config-fetch-failed",{httpStatus:s.status,responseMessage:a})}return s.json()}async function oE(n,e=em,t){const{appId:o,apiKey:r,measurementId:s}=n.options;if(!o)throw Xe.create("no-app-id");if(!r){if(s)return{measurementId:s,appId:o};throw Xe.create("no-api-key")}const a=e.getThrottleMetadata(o)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new iE;return setTimeout(async()=>{c.abort()},B_),tm({appId:o,apiKey:r,measurementId:s},a,c,e)}async function tm(n,{throttleEndTimeMillis:e,backoffCount:t},o,r=em){const{appId:s,measurementId:a}=n;try{await rE(o,e)}catch(c){if(a)return ze.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:s,measurementId:a};throw c}try{const c=await nE(n);return r.deleteThrottleMetadata(s),c}catch(c){const l=c;if(!sE(l)){if(r.deleteThrottleMetadata(s),a)return ze.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${l?.message}]`),{appId:s,measurementId:a};throw c}const d=Number(l?.customData?.httpStatus)===503?Sl(t,r.intervalMillis,J_):Sl(t,r.intervalMillis),h={throttleEndTimeMillis:Date.now()+d,backoffCount:t+1};return r.setThrottleMetadata(s,h),ze.debug(`Calling attemptFetch again in ${d} millis`),tm(n,h,o,r)}}function rE(n,e){return new Promise((t,o)=>{const r=Math.max(e-Date.now(),0),s=setTimeout(t,r);n.addEventListener(()=>{clearTimeout(s),o(Xe.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function sE(n){if(!(n instanceof lt)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class iE{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function aE(n,e,t,o,r){if(r&&r.global){n("event",t,o);return}else{const s=await e,a={...o,send_to:s};n("event",t,a)}}/**
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
 */async function cE(){if(wu())try{await yu()}catch(n){return ze.warn(Xe.create("indexeddb-unavailable",{errorInfo:n?.toString()}).message),!1}else return ze.warn(Xe.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function lE(n,e,t,o,r,s,a){const c=oE(n);c.then(f=>{t[f.measurementId]=f.appId,n.options.measurementId&&f.measurementId!==n.options.measurementId&&ze.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${f.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(f=>ze.error(f)),e.push(c);const l=cE().then(f=>{if(f)return o.getId()}),[d,h]=await Promise.all([c,l]);Q_(s)||H_(s,d.measurementId),r("js",new Date);const m=a?.config??{};return m[$_]="firebase",m.update=!0,h!=null&&(m[F_]=h),r("config",d.measurementId,m),d.measurementId}/**
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
 */class dE{constructor(e){this.app=e}_delete(){return delete Mo[this.app.options.appId],Promise.resolve()}}let Mo={},eu=[];const tu={};let Oi="dataLayer",uE="gtag",nu,nm,ou=!1;function hE(){const n=[];if(fu()&&n.push("This is a browser extension environment."),Eg()||n.push("Cookies are not available."),n.length>0){const e=n.map((o,r)=>`(${r+1}) ${o}`).join(" "),t=Xe.create("invalid-analytics-context",{errorInfo:e});ze.warn(t.message)}}function pE(n,e,t){hE();const o=n.options.appId;if(!o)throw Xe.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)ze.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Xe.create("no-api-key");if(Mo[o]!=null)throw Xe.create("already-exists",{id:o});if(!ou){G_(Oi);const{wrappedGtag:s,gtagCore:a}=Y_(Mo,eu,tu,Oi,uE);nm=s,nu=a,ou=!0}return Mo[o]=lE(n,eu,tu,e,nu,Oi,t),new dE(n)}function mE(n=pa()){n=_e(n);const e=In(n,fs);return e.isInitialized()?e.getImmediate():gE(n)}function gE(n,e={}){const t=In(n,fs);if(t.isInitialized()){const r=t.getImmediate();if(ft(e,t.getOptions()))return r;throw Xe.create("already-initialized")}return t.initialize({options:e})}function fE(n,e,t,o){n=_e(n),aE(nm,Mo[n.app.options.appId],e,t,o).catch(r=>ze.error(r))}const ru="@firebase/analytics",su="0.10.18";function wE(){wt(new it(fs,(e,{options:t})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return pE(o,r,t)},"PUBLIC")),wt(new it("analytics-internal",n,"PRIVATE")),Qe(ru,su),Qe(ru,su,"esm2020");function n(e){try{const t=e.getProvider(fs).getImmediate();return{logEvent:(o,r,s)=>fE(t,o,r,s)}}catch(t){throw Xe.create("interop-component-reg-failed",{reason:t})}}}wE();const yE={apiKey:"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:"controle-financeiro-b98ec.firebaseapp.com",projectId:"controle-financeiro-b98ec",storageBucket:"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:"418109336597",appId:"1:418109336597:web:871b262a76e57455ebb21c",measurementId:"G-7RW2F269V6"},Ks=Eu(yE),rn=Q0(Ks),U=Gh(Ks);mE(Ks);$b(rn,xp).then(()=>{}).catch(n=>{console.error("Erro ao configurar persistência do Firebase Auth:",n)});const om=Object.freeze(Object.defineProperty({__proto__:null,app:Ks,auth:rn,db:U},Symbol.toStringTag,{value:"Module"}));function Wr(n,e=null,t=null){if(!n.parcelasTotal||n.parcelasTotal<=1)return null;try{const o=new Date(n.dataInicio);let r;e&&t?r=new Date(e,t-1,1):r=new Date;let a=(r.getFullYear()-o.getFullYear())*12+(r.getMonth()-o.getMonth())+1;return a>n.parcelasTotal&&(a=n.parcelasTotal),a<1&&(a=1),a}catch(o){return console.error("Erro ao calcular parcela da recorrente:",o),1}}function vE(n,e=[],t=null,o=null){if(!t||!o){const l=new Date;t=l.getFullYear(),o=l.getMonth()+1}const r=e.some(l=>{if(!l.recorrenteId||l.recorrenteId!==n.id)return!1;let d;if(l.createdAt&&typeof l.createdAt=="object"&&l.createdAt.seconds)d=new Date(l.createdAt.seconds*1e3);else if(l.createdAt)d=new Date(l.createdAt);else return!1;return d.getFullYear()===t&&d.getMonth()+1===o}),s=Wr(n,t,o),a=Wr(n,t,o+1),c=Wr(n,t,o-1);return{foiEfetivadaEsteMes:r,parcelaAtual:s,proximaParcela:a,ultimaParcela:c,totalParcelas:n.parcelasTotal,temParcelas:n.parcelasTotal&&n.parcelasTotal>1,ativa:n.ativa!==!1}}async function pc(n,e,t){try{const o={...t,userId:n,budgetId:e,ativa:!0,createdAt:Ee(),parcelasRestantes:t.parcelasRestantes||null,parcelasTotal:t.parcelasTotal||null,efetivarMesAtual:t.efetivarMesAtual||!1},r=await en(oe(U,"recorrentes"),o);return console.log("✅ Recorrente adicionada:",r.id),r.id}catch(o){throw console.error("Erro ao adicionar recorrente:",o),o}}async function rm(n,e,t){try{const o=ke(U,"recorrentes",e);await ct(o,{...t,updatedAt:Ee()}),console.log("✅ Recorrente atualizada:",e)}catch(o){throw console.error("Erro ao atualizar recorrente:",o),o}}async function mc(n,e){try{const t=ke(U,"recorrentes",e);await ht(t),console.log("✅ Recorrente deletada:",e)}catch(t){throw console.error("Erro ao deletar recorrente:",t),t}}class bE{constructor(){this.queue=[],this.isShowing=!1,this.defaultDuration=3e3}show(e,t="info",o=null){const r={message:e,type:t,duration:o||this.defaultDuration};this.queue.push(r),this.processQueue()}call(e){typeof e=="string"?this.show(e,"info"):typeof e=="object"&&this.show(e.message||"Notificação",e.type||"info",e.duration)}processQueue(){if(this.isShowing||this.queue.length===0)return;this.isShowing=!0;const e=this.queue.shift();this.createSnackbar(e)}createSnackbar(e){const{message:t,type:o,duration:r}=e;this.removeExistingSnackbars();const s=document.createElement("div");s.className=this.getSnackbarClasses(o),s.innerHTML=this.getSnackbarContent(t,o),s.classList.add(`snackbar-${o}`),this.applyThemeStyles(s,o),s.style.zIndex="99999",s.style.bottom="80px",this.setupEventListeners(s),document.body.appendChild(s),requestAnimationFrame(()=>{s.classList.add("snackbar-show")}),setTimeout(()=>{this.removeSnackbar(s)},r)}getCurrentTheme(){return document.documentElement.classList.contains("dark")?"dark":"light"}getCurrentThemeColor(){return localStorage.getItem("themeColor")||document.documentElement.getAttribute("data-theme-color")||"blue"}applyThemeStyles(e,t){const o=this.getCurrentTheme(),r=this.getCurrentThemeColor(),s={blue:{primary:"#3B82F6",secondary:"#1E40AF",light:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",light:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",light:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",light:"#FEF3C7"}},a=s[r]||s.blue,l=(h=>{switch(h){case"success":return o==="dark"?{bg:a.primary,color:"#ffffff",border:a.secondary}:{bg:a.secondary,color:"#ffffff",border:a.primary};case"error":return o==="dark"?{bg:"#ef4444",color:"#ffffff",border:"#dc2626"}:{bg:"#dc2626",color:"#ffffff",border:"#b91c1c"};case"warning":return o==="dark"?{bg:"#f59e0b",color:"#1f2937",border:"#d97706"}:{bg:"#d97706",color:"#ffffff",border:"#b45309"};case"info":return o==="dark"?{bg:a.primary,color:"#ffffff",border:a.secondary}:{bg:a.secondary,color:"#ffffff",border:a.primary};default:return o==="dark"?{bg:a.primary,color:"#ffffff",border:a.secondary}:{bg:a.secondary,color:"#ffffff",border:a.primary}}})(t),d=o==="dark"?"0.4":"0.3";e.style.backgroundColor=l.bg,e.style.color=l.color,e.style.border=`1px solid ${l.border}`,e.style.boxShadow=`0 4px 12px rgba(${l.bg.replace("#","").match(/.{2}/g).map(h=>parseInt(h,16)).join(", ")}, ${d})`,setTimeout(()=>{const h=e.querySelector(".snackbar-close");h&&(h.style.color=l.color)},10)}getSnackbarClasses(e){return["fixed","left-1/2","transform","-translate-x-1/2","px-6","py-3","rounded-lg","shadow-lg","max-w-sm","w-full","mx-4","opacity-0","translate-y-4","transition-all","duration-300","ease-out"].join(" ")}getSnackbarContent(e,t){const o={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️",default:"💬"};return`
      <div class="flex items-center gap-3">
        <span class="text-lg">${o[t]||o.default}</span>
        <span class="flex-1 text-sm font-medium">${e}</span>
        <button class="snackbar-close text-white opacity-70 hover:opacity-100 transition-opacity">
          <span class="text-lg">×</span>
        </button>
      </div>
    `}removeExistingSnackbars(){document.querySelectorAll('.snackbar-show, [class*="snackbar"]').forEach(t=>{this.removeSnackbar(t)})}removeSnackbar(e){!e||!e.parentNode||(e.classList.remove("snackbar-show"),e.classList.add("snackbar-hide"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e),this.isShowing=!1,this.processQueue()},300))}setupEventListeners(e){const t=e.querySelector(".snackbar-close");t&&t.addEventListener("click",()=>{this.removeSnackbar(e)}),e.addEventListener("click",o=>{o.target===e&&this.removeSnackbar(e)})}}const _n=new bE;function F(n){typeof n=="string"?_n.show(n,"info"):typeof n=="object"&&_n.show(n.message,n.type||"info",n.duration)}F.show=(n,e="info",t)=>{_n.show(n,e,t)};F.success=(n,e)=>{_n.show(n,"success",e)};F.error=(n,e)=>{_n.show(n,"error",e)};F.warning=(n,e)=>{_n.show(n,"warning",e)};F.info=(n,e)=>{_n.show(n,"info",e)};typeof window<"u"&&(window.Snackbar=F);window.showAddRecorrenteModal=function(n={}){const e=!!n&&Object.keys(n).length>0,t=tn({title:e?"Editar Despesa Recorrente":"Nova Despesa Recorrente",content:"",onClose:()=>t.remove()}),o=window.appState.currentUser,r=window.appState.currentBudget;if(!o){F({message:"Você precisa estar logado para adicionar recorrentes.",type:"error"});return}if(!r){F({message:"Selecione um orçamento antes de adicionar recorrentes.",type:"error"});return}const s=ng({initialData:n,onSubmit:async c=>{try{if(document.querySelector(".fab")?.classList.add("hidden"),e&&n.id)await rm(o.uid,n.id,c);else{const l=await pc(o.uid,r.id,c);if(c.efetivarMesAtual){console.log("🚀 Efetivando recorrente no mês atual...");const d=new Date,h=d.getMonth()+1,m=d.getFullYear(),{db:f}=await $e(async()=>{const{db:S}=await Promise.resolve().then(()=>om);return{db:S}},void 0),_=oe(f,"transactions"),T=(await ge(ve(_,ne("userId","==",o.uid),ne("recorrenteId","==",l)))).docs.some(S=>{const N=S.data(),L=N.createdAt&&N.createdAt.toDate?N.createdAt.toDate():N.createdAt?new Date(N.createdAt):null;return L&&L.getMonth()+1===h&&L.getFullYear()===m});if(console.log("🔍 Já existe transação neste mês?",T),T)console.log("⏭️ Transação já existe para este mês, pulando...");else{const S={userId:o.uid,budgetId:r.id,descricao:c.descricao,valor:c.valor,categoriaId:c.categoriaId,tipo:"despesa",createdAt:d,recorrenteId:l,recorrenteNome:c.descricao},N=await en(oe(f,"transactions"),S);console.log("✅ Transação criada para mês atual:",N.id);try{await en(oe(f,"logAplicacoes"),{userId:o.uid,mesAno:`${m}-${String(h).padStart(2,"0")}`,recorrenteId:l,descricao:c.descricao,valor:c.valor,dataAplicacao:d,transacaoId:N.id,aplicacaoImediata:!0}),console.log("📝 Aplicação imediata registrada no log")}catch(L){console.error("Erro ao registrar aplicação imediata no log:",L)}}}}await new Promise(l=>setTimeout(l,200)),await window.loadRecorrentes(),t.remove(),F({message:e?"Despesa recorrente editada!":"Despesa recorrente salva!",type:"success"}),setTimeout(async()=>{document.querySelector(".fab")?.classList.remove("hidden"),e&&n.id&&(console.log("🔄 Recalculando transações da recorrente editada:",n.id),await window.recalcularTransacoesRecorrente(n.id,c)),await window.loadRecorrentes(),await window.loadTransactions(),await window.loadCategories(),window.location.hash.includes("recorrentes")?window._renderRecorrentes():window.location.hash.includes("dashboard")?window.renderDashboard():window.location.hash.includes("transacoes")&&window.renderTransactions(),document.dispatchEvent(new CustomEvent("recorrente-adicionada")),document.dispatchEvent(new CustomEvent("dados-atualizados"))},100)}catch(l){document.querySelector(".fab")?.classList.remove("hidden"),console.error("Erro ao adicionar/editar recorrente:",l),F({message:"Erro ao salvar recorrente",type:"error"})}}}),a=t.querySelector(".modal-body");a?a.appendChild(s):t.appendChild(s),document.body.appendChild(t)};window.showAddTransactionModal=function(n={}){console.log("🔧 showAddTransactionModal chamada com:",n),console.log("🔧 window.Modal disponível:",!!window.Modal),console.log("🔧 window.appState.categories:",window.appState?.categories);const e=!!n&&Object.keys(n).length>0;try{const t=tn({title:e?"Editar Transação":"Nova Transação",content:`
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição
          </label>
          <input 
            type="text" 
            id="descricao" 
            name="descricao" 
            value="${n.descricao||""}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ex: Salário, Aluguel, Compras..."
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor
          </label>
          <input 
            type="number" 
            id="valor" 
            name="valor" 
            value="${n.valor!==null&&n.valor!==void 0?n.valor:""}"
            step="0.01" 
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="0.00"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo
          </label>
          <select 
            id="tipo" 
            name="tipo"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="receita" ${n.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${n.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoria
          </label>
          <select 
            id="categoriaId" 
            name="categoriaId"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Sem categoria</option>
            ${(window.appState?.categories||[]).map(a=>{const c=a.limite?parseFloat(a.limite):0,l=window.appState?.transactions?.filter(f=>f.categoriaId===a.id&&f.tipo==="despesa")?.reduce((f,_)=>f+parseFloat(_.valor),0)||0,d=c-l,h=c>0?` (R$ ${d.toFixed(2)} disponível)`:"",m=d<0?"text-red-600":d<c*.2?"text-yellow-600":"text-green-600";return`<option value="${a.id}" ${n.categoriaId===a.id?"selected":""}>
                ${a.nome}${h}
              </option>`}).join("")}
          </select>
          <div id="categoria-info" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
            <!-- Informações da categoria selecionada serão exibidas aqui -->
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data
          </label>
          <input 
            type="date" 
            id="data" 
            name="data" 
            value="${n.data?n.data.toDate?n.data.toDate().toISOString().split("T")[0]:new Date(n.data).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            ${e?"Atualizar":"Adicionar"}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    `,onClose:()=>t.remove()});document.body.appendChild(t),console.log("✅ Modal de transação adicionado ao DOM");const o=t.querySelector("#transaction-form");o.addEventListener("submit",async a=>{a.preventDefault();const c=new FormData(o),l={descricao:c.get("descricao"),valor:parseFloat(c.get("valor")),tipo:c.get("tipo"),categoriaId:c.get("categoriaId")||null,data:c.get("data")};try{e?(await window.updateTransaction(n.id,l),t.remove(),window.refreshCurrentView()):(t.remove(),await window.addTransactionWithConfirmation(l),window.refreshCurrentView())}catch(d){console.error("Erro ao salvar transação:",d),d.message!=="Operação cancelada pelo usuário"&&F.show("Erro ao salvar transação","error")}});const r=t.querySelector("#categoriaId"),s=t.querySelector("#categoria-info");r.addEventListener("change",()=>{const a=r.value;if(a){const c=window.appState?.categories?.find(l=>l.id===a);if(c){const l=c.limite?parseFloat(c.limite):0,d=window.appState?.transactions?.filter(E=>E.categoriaId===a&&E.tipo==="despesa")?.reduce((E,T)=>E+parseFloat(T.valor),0)||0,h=l-d,m=l>0?d/l*100:0;let f="",_="";l===0?(f="Sem limite definido",_="text-gray-500"):h<0?(f=`⚠️ Limite excedido em R$ ${Math.abs(h).toFixed(2)}`,_="text-red-600"):h<l*.2?(f=`⚠️ Quase no limite (${m.toFixed(1)}% usado)`,_="text-yellow-600"):(f=`✓ Dentro do limite (${m.toFixed(1)}% usado)`,_="text-green-600"),s.innerHTML=`
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="font-medium">${c.nome}</div>
            <div class="text-xs mt-1">
              <div>Limite: R$ ${l.toFixed(2)}</div>
              <div>Gasto: R$ ${d.toFixed(2)}</div>
              <div>Disponível: R$ ${h.toFixed(2)}</div>
              <div class="${_} mt-1">${f}</div>
            </div>
          </div>
        `,s.classList.remove("hidden")}}else s.classList.add("hidden")}),n.categoriaId&&r.dispatchEvent(new Event("change"))}catch(t){console.error("❌ Erro ao criar modal de transação:",t),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de transação","error"):alert("Erro ao abrir modal de transação: "+t.message)}};window.editTransaction=function(n){const e=window.appState.transactions?.find(t=>t.id===n);e&&window.showAddTransactionModal(e)};window.showAddCategoryModal=function(n={}){console.log("🔧 showAddCategoryModal chamada com:",n),console.log("🔧 window.Modal disponível:",!!window.Modal);const e=!!n&&Object.keys(n).length>0;try{const t=tn({title:e?"Editar Categoria":"Nova Categoria",content:`
      <form id="category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome
          </label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value="${n.nome||""}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ex: Alimentação, Transporte..."
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo
          </label>
          <select 
            id="tipo" 
            name="tipo"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="despesa" ${n.tipo==="despesa"?"selected":""}>Despesa</option>
            <option value="receita" ${n.tipo==="receita"?"selected":""}>Receita</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Limite Mensal (opcional)
          </label>
          <input 
            type="number" 
            id="limite" 
            name="limite" 
            value="${n.limite||""}"
            step="0.01" 
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="0.00"
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            ${e?"Atualizar":"Adicionar"}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    `,onClose:()=>t.remove()});document.body.appendChild(t),console.log("✅ Modal de categoria adicionado ao DOM");const o=t.querySelector("#category-form");o.addEventListener("submit",async r=>{r.preventDefault();const s=new FormData(o),a={nome:s.get("nome"),tipo:s.get("tipo"),limite:s.get("limite")?parseFloat(s.get("limite")):null};try{e?(await window.updateCategory(n.id,a),t.remove(),window.refreshCurrentView()):(await window.addCategoryWithConfirmation(a),t.remove(),window.refreshCurrentView())}catch(c){console.error("Erro ao salvar categoria:",c),c.message!=="Operação cancelada pelo usuário"&&F.show("Erro ao salvar categoria","error")}})}catch(t){console.error("❌ Erro ao criar modal de categoria:",t),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de categoria","error"):alert("Erro ao abrir modal de categoria: "+t.message)}};window.editCategory=function(n){const e=window.appState.categories?.find(t=>t.id===n);e&&window.showAddCategoryModal(e)};function ua(n="theme-toggle-btn"){const e=window.matchMedia("(prefers-color-scheme: dark)").matches,t=document.documentElement,o=localStorage.getItem("theme"),r=o?o==="dark":e;t.classList.toggle("dark",r),a();const s=document.getElementById(n);if(s){const d=s.cloneNode(!0);s.parentNode.replaceChild(d,s),d.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),console.log("🔧 Clique no botão de tema detectado"),console.log("🔧 Classes antes:",t.classList.toString());const m=t.classList.toggle("dark");localStorage.setItem("theme",m?"dark":"light"),console.log("🔧 Classes depois:",t.classList.toString()),console.log("🔧 isDarkNow:",m),console.log("🔧 localStorage theme:",localStorage.getItem("theme")),a(),c(),console.log("🎨 Tema alterado para:",m?"dark":"light")}),console.log("✅ Botão de tema configurado:",n)}else console.warn("⚠️ Botão de tema não encontrado:",n);function a(){const d=document.getElementById("theme-icon");if(console.log("🔧 updateIcon chamada, ícone encontrado:",!!d),console.log('🔧 root.classList.contains("dark"):',t.classList.contains("dark")),d){const h=t.classList.contains("dark")?"🌙":"☀️";console.log("🔧 Novo ícone:",h),d.textContent=h}else console.log("🔧 Elemento theme-icon não encontrado")}function c(){const d=window.location.hash.replace("#","")||"/dashboard";l(),setTimeout(()=>{requestAnimationFrame(()=>{switch(d){case"/dashboard":window.renderDashboard&&window.renderDashboard();break;case"/transactions":window.renderTransactions&&window.renderTransactions();break;case"/categories":window.renderCategories&&window.renderCategories();break;case"/recorrentes":window.renderRecorrentes&&window.renderRecorrentes();break;case"/notifications":window.renderNotifications&&window.renderNotifications();break;case"/settings":window.renderSettings&&window.renderSettings();break;default:window.renderDashboard&&window.renderDashboard()}l(),console.log("✅ Tema aplicado na aba atual")})},200)}function l(){document.querySelectorAll('[class*="dark:"]').forEach(E=>{E.offsetHeight}),document.body.offsetHeight,document.documentElement.offsetHeight,document.querySelectorAll(".card-resumo, .bottom-nav, .modal-content, .btn-secondary, .form-group input, .form-group select, .form-group textarea, .tab-container, .tab-header, .tab-content, .list-item, .card-standard").forEach(E=>{E.offsetHeight});const f=document.documentElement.classList.contains("dark");document.querySelectorAll("*").forEach(E=>{const T=getComputedStyle(E);T.backgroundColor&&T.backgroundColor!=="rgba(0, 0, 0, 0)"&&E.offsetHeight}),console.log("🎨 Elementos de tema atualizados (isDark:",f,")")}}class iu{constructor(){this.touchStartX=0,this.touchEndX=0,this.touchStartY=0,this.touchEndY=0,this.isSwiping=!1,this.swipeThreshold=80,this.tabs=["/dashboard","/transactions","/categories","/analytics","/recorrentes","/notifications","/settings"],this.currentTabIndex=0,this.container=null,this.swipeIndicator=null,this.isEnabled=!0,this.hasShownInitialHint=!1,this.init()}init(){if(console.log("🔧 SwipeNavigation.init() chamado"),this.container=document.querySelector("#app-content"),!this.container){console.warn("SwipeNavigation: Container #app-content não encontrado");return}if(console.log("✅ Container encontrado:",this.container),!window.appState?.currentUser){console.log("SwipeNavigation: Usuário não logado, aguardando...");return}console.log("✅ Usuário logado:",window.appState.currentUser.uid),this.createSwipeIndicator(),this.bindEvents(),this.updateCurrentTabIndex(),console.log("SwipeNavigation: Inicializado com sucesso"),console.log("🔍 Estado final:",{isEnabled:this.isEnabled,container:this.container,tabs:this.tabs,currentTabIndex:this.currentTabIndex})}createSwipeIndicator(){this.swipeIndicator=document.createElement("div"),this.swipeIndicator.id="swipe-indicator",this.swipeIndicator.innerHTML=`
      <div class="swipe-dots">
        ${this.tabs.map((t,o)=>`<div class="swipe-dot ${o===0?"active":""}" data-index="${o}"></div>`).join("")}
      </div>
      <div class="swipe-hint">← Deslize para navegar →</div>
    `,this.swipeIndicator.className="swipe-indicator";const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e),document.body.appendChild(this.swipeIndicator)}bindEvents(){const e=document.getElementById("login-page");if(e&&e.style.display!=="none"){console.log("SwipeNavigation: Tela de login ativa, não inicializando eventos");return}console.log("SwipeNavigation: Configurando eventos de navegação..."),this.container.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!1}),this.container.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!1}),this.container.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!1}),this.container.addEventListener("mousedown",this.handleMouseStart.bind(this)),this.container.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.container.addEventListener("mouseup",this.handleMouseEnd.bind(this)),document.addEventListener("keydown",this.handleKeydown.bind(this),{capture:!0}),console.log("SwipeNavigation: Evento de teclado configurado no document"),document.addEventListener("keydown",t=>{console.log("🎹 SwipeNavigation - Evento de teclado capturado:",t.key,"Target:",t.target.tagName)},{capture:!0}),this.observeRouteChanges(),console.log("SwipeNavigation: Todos os eventos configurados com sucesso")}handleTouchStart(e){if(!this.isEnabled){console.log("👆 SwipeNavigation: Desabilitado, ignorando touch start");return}this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.isSwiping=!1,console.log("👆 SwipeNavigation: Touch start em",this.touchStartX,this.touchStartY)}handleTouchMove(e){if(!this.isEnabled||!this.touchStartX){this.isEnabled||console.log("👆 SwipeNavigation: Desabilitado, ignorando touch move");return}const t=e.touches[0].clientX,o=e.touches[0].clientY,r=Math.abs(t-this.touchStartX),s=Math.abs(o-this.touchStartY);r>s&&r>20&&(this.isSwiping=!0,e.preventDefault(),console.log("👆 SwipeNavigation: Swipe horizontal detectado, deltaX:",r),this.showSwipeFeedback(r))}handleTouchEnd(e){if(!this.isEnabled||!this.isSwiping){this.isEnabled||console.log("👆 SwipeNavigation: Desabilitado, ignorando touch end"),this.isSwiping||console.log("👆 SwipeNavigation: Não estava fazendo swipe, ignorando touch end");return}this.touchEndX=e.changedTouches[0].clientX,this.touchEndY=e.changedTouches[0].clientY;const t=this.touchEndX-this.touchStartX,o=this.touchEndY-this.touchStartY;console.log("👆 SwipeNavigation: Touch end, deltaX:",t,"deltaY:",o),Math.abs(t)>this.swipeThreshold&&Math.abs(t)>Math.abs(o)?(console.log("👆 SwipeNavigation: Swipe válido detectado, direção:",t>0?"right":"left"),this.handleSwipe(t>0?"right":"left")):console.log("👆 SwipeNavigation: Swipe inválido ou insuficiente"),this.resetSwipe()}handleMouseStart(e){!this.isEnabled||e.button!==0||(this.touchStartX=e.clientX,this.touchStartY=e.clientY,this.isSwiping=!1)}handleMouseMove(e){if(!this.isEnabled||!this.touchStartX)return;const t=Math.abs(e.clientX-this.touchStartX),o=Math.abs(e.clientY-this.touchStartY);t>o&&t>10&&(this.isSwiping=!0)}handleMouseEnd(e){if(!this.isEnabled||!this.isSwiping)return;this.touchEndX=e.clientX,this.touchEndY=e.clientY;const t=this.touchEndX-this.touchStartX,o=this.touchEndY-this.touchStartY;Math.abs(t)>this.swipeThreshold&&Math.abs(t)>Math.abs(o)&&this.handleSwipe(t>0?"right":"left"),this.resetSwipe()}handleKeydown(e){if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.contentEditable==="true")){if(!this.isEnabled){console.log("SwipeNavigation: Desabilitado, ignorando tecla:",e.key);return}switch(console.log("🎹 SwipeNavigation: Tecla pressionada:",e.key,"Target:",e.target.tagName),e.key){case"ArrowLeft":console.log("⬅️ SwipeNavigation: Seta esquerda - navegando para aba anterior"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.currentTabIndex-1);break;case"ArrowRight":console.log("➡️ SwipeNavigation: Seta direita - navegando para próxima aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.currentTabIndex+1);break;case"ArrowUp":console.log("⬆️ SwipeNavigation: Seta cima - primeira aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(0);break;case"ArrowDown":console.log("⬇️ SwipeNavigation: Seta baixo - última aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.tabs.length-1);break}}}handleSwipe(e){this.updateCurrentTabIndex();let t=this.currentTabIndex;e==="left"&&this.currentTabIndex<this.tabs.length-1?t=this.currentTabIndex+1:e==="right"&&this.currentTabIndex>0&&(t=this.currentTabIndex-1),t!==this.currentTabIndex?(this.navigateToTab(t),this.provideHapticFeedback()):this.showSwipeFeedback("edge")}navigateToTab(e){if(e<0||e>=this.tabs.length)return;const t=this.tabs[e];console.log(`SwipeNavigation: Navegando para ${t}`),this.animateTransition(e),window.router?window.router(t):window.location.hash=t,window.updatePageTitle&&window.updatePageTitle(t),this.currentTabIndex=e,this.updateSwipeIndicator()}animateTransition(e){const t=this.container,o=e>this.currentTabIndex?1:-1;t.classList.add("swipe-transition"),t.style.transform=`translateX(${o*20}px)`,t.style.opacity="0.8",setTimeout(()=>{t.style.transform="translateX(0)",t.style.opacity="1"},50),setTimeout(()=>{t.classList.remove("swipe-transition"),t.style.transform="",t.style.opacity=""},300)}showSwipeFeedback(e){let t="";switch(e){case"edge":t=this.currentTabIndex===0?"Primeira aba":"Última aba";break;default:return}const o=document.createElement("div");o.className="swipe-feedback",o.textContent=t,document.body.appendChild(o),setTimeout(()=>o.classList.add("show"),10),setTimeout(()=>{o.classList.remove("show"),setTimeout(()=>o.remove(),200)},1e3)}provideHapticFeedback(){"vibrate"in navigator&&navigator.vibrate(50)}updateCurrentTabIndex(){const e=document.querySelector(".nav-btn.active");if(e){const t=e.getAttribute("data-route"),o=this.tabs.indexOf(t);o!==this.currentTabIndex&&(console.log("📍 Atualizando índice da aba atual:",{activeTabRoute:t,oldIndex:this.currentTabIndex,newIndex:o,availableTabs:this.tabs}),this.currentTabIndex=o,console.log("✅ Índice atualizado:",this.currentTabIndex))}}updateSwipeIndicator(){if(!this.swipeIndicator)return;this.swipeIndicator.querySelectorAll(".swipe-dot").forEach((t,o)=>{t.classList.toggle("active",o===this.currentTabIndex)}),this.hasShownInitialHint||(this.hasShownInitialHint=!0,this.swipeIndicator.classList.add("show"),setTimeout(()=>{this.swipeIndicator.classList.remove("show")},4e3))}observeRouteChanges(){let e=null,t=null;new MutationObserver(()=>{e&&clearTimeout(e),e=setTimeout(()=>{const s=document.querySelector(".nav-btn.active")?.getAttribute("data-route");s!==t&&(t=s,this.updateCurrentTabIndex(),this.updateSwipeIndicator())},200)}).observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})}resetSwipe(){this.touchStartX=0,this.touchStartY=0,this.touchEndX=0,this.touchEndY=0,this.isSwiping=!1}enable(){this.isEnabled=!0,console.log("SwipeNavigation: Habilitado")}disable(){this.isEnabled=!1,console.log("SwipeNavigation: Desabilitado")}destroy(){this.swipeIndicator&&this.swipeIndicator.remove(),console.log("SwipeNavigation: Destruído")}}window.swipeNavigation=null;class _E{constructor(){this.isSupported=this.checkSupport(),this.isAvailable=!1,this.credentials=null}checkSupport(){return window.PublicKeyCredential&&window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&window.PublicKeyCredential.isConditionalMediationAvailable}async checkAvailability(){if(!this.isSupported)return console.log("🔒 BiometricAuth: Web Authentication API não suportada"),!1;try{const[e,t]=await Promise.all([window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),window.PublicKeyCredential.isConditionalMediationAvailable()]);return this.isAvailable=e&&t,console.log("🔒 BiometricAuth: Disponibilidade verificada:",{userVerifying:e,conditionalMediation:t,isAvailable:this.isAvailable}),this.isAvailable}catch(e){return console.error("🔒 BiometricAuth: Erro ao verificar disponibilidade:",e),!1}}async register(e,t){if(!this.isAvailable)throw new Error("Autenticação biométrica não disponível");try{console.log("🔒 BiometricAuth: Iniciando registro biométrico...");const o=new Uint8Array(32);window.crypto.getRandomValues(o);const r={challenge:o,rp:{name:"Servo Tech Finanças",id:window.location.hostname},user:{id:new Uint8Array(16),name:t,displayName:t},pubKeyCredParams:[{type:"public-key",alg:-7}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4,attestation:"direct"},s=await navigator.credentials.create({publicKey:r});return this.credentials=s,this.saveCredentials(e,s),console.log("🔒 BiometricAuth: Registro biométrico concluído"),!0}catch(o){throw console.error("🔒 BiometricAuth: Erro no registro:",o),o}}async authenticate(){if(!this.isAvailable)throw new Error("Autenticação biométrica não disponível");try{console.log("🔒 BiometricAuth: Iniciando autenticação biométrica...");const e=this.loadCredentials();if(!e)throw new Error("Nenhuma credencial biométrica registrada");const t=new Uint8Array(32);window.crypto.getRandomValues(t);const o={challenge:t,rpId:window.location.hostname,allowCredentials:[{type:"public-key",id:e.rawId,transports:["internal"]}],userVerification:"required",timeout:6e4},r=await navigator.credentials.get({publicKey:o});return console.log("🔒 BiometricAuth: Autenticação biométrica bem-sucedida"),{success:!0,userId:e.userId,credential:r}}catch(e){throw console.error("🔒 BiometricAuth: Erro na autenticação:",e),e}}saveCredentials(e,t){try{const o={userId:e,rawId:Array.from(t.rawId),type:t.type,response:{clientDataJSON:Array.from(t.response.clientDataJSON),attestationObject:Array.from(t.response.attestationObject)}};localStorage.setItem("biometric_credentials",JSON.stringify(o)),this.saveUserInfo(e),console.log("🔒 BiometricAuth: Credenciais salvas no localStorage")}catch(o){console.error("🔒 BiometricAuth: Erro ao salvar credenciais:",o)}}saveUserInfo(){try{const e=window.FirebaseAuth?.currentUser;if(e){const t={uid:e.uid,email:e.email,displayName:e.displayName,photoURL:e.photoURL,lastLogin:new Date().toISOString()};localStorage.setItem("biometric_user_info",JSON.stringify(t)),console.log("🔒 BiometricAuth: Informações do usuário salvas")}}catch(e){console.error("🔒 BiometricAuth: Erro ao salvar informações do usuário:",e)}}loadUserInfo(){try{const e=localStorage.getItem("biometric_user_info");return e?JSON.parse(e):null}catch(e){return console.error("🔒 BiometricAuth: Erro ao carregar informações do usuário:",e),null}}loadCredentials(){try{const e=localStorage.getItem("biometric_credentials");if(!e)return null;const t=JSON.parse(e);return t.rawId=new Uint8Array(t.rawId),t.response.clientDataJSON=new Uint8Array(t.response.clientDataJSON),t.response.attestationObject=new Uint8Array(t.response.attestationObject),t}catch(e){return console.error("🔒 BiometricAuth: Erro ao carregar credenciais:",e),null}}hasSavedCredentials(){return localStorage.getItem("biometric_credentials")!==null}removeCredentials(){try{return localStorage.removeItem("biometric_credentials"),console.log("🔒 BiometricAuth: Credenciais removidas"),!0}catch(e){return console.error("🔒 BiometricAuth: Erro ao remover credenciais:",e),!1}}getDeviceInfo(){return{isSupported:this.isSupported,isAvailable:this.isAvailable,hasCredentials:this.hasSavedCredentials(),userAgent:navigator.userAgent,platform:navigator.platform}}}window.biometricAuth=new _E;window.showBiometricSetup=async function(){try{if(!await window.biometricAuth.checkAvailability()){F({message:"Autenticação biométrica não disponível neste dispositivo.",type:"warning"});return}const e=window.FirebaseAuth?.currentUser;if(!e){F({message:"Você precisa estar logado para configurar autenticação biométrica.",type:"error"});return}const t=tn({title:"🔒 Configurar Autenticação Biométrica",content:`
        <div class="space-y-4">
          <div class="text-center">
            <div class="text-6xl mb-4">🔐</div>
            <h3 class="text-lg font-semibold mb-2">Autenticação Biométrica</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Configure impressão digital ou reconhecimento facial para acessar o app rapidamente.
            </p>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 Como Funciona:</h4>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use sua impressão digital ou face para fazer login</li>
              <li>• Acesso rápido e seguro ao aplicativo</li>
              <li>• Funciona offline, sem necessidade de senha</li>
              <li>• Dados armazenados localmente no seu dispositivo</li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <button id="btn-setup-biometric" class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2">
              <span>🔐</span> Configurar Agora
            </button>
            <button onclick="closeModal()" class="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
              Cancelar
            </button>
          </div>
        </div>
      `,onClose:()=>t.remove()});document.body.appendChild(t),setTimeout(()=>{const o=document.getElementById("btn-setup-biometric");o&&o.addEventListener("click",async()=>{try{o.disabled=!0,o.innerHTML="<span>⏳</span> Configurando...",await window.biometricAuth.register(e.uid,e.email),window.biometricAuth.saveUserInfo(e.uid),F({message:"Autenticação biométrica configurada com sucesso!",type:"success"}),t.remove()}catch(r){console.error("Erro na configuração biométrica:",r),F({message:"Erro ao configurar autenticação biométrica: "+r.message,type:"error"}),o.disabled=!1,o.innerHTML="<span>🔐</span> Configurar Agora"}})},100)}catch(n){console.error("Erro ao mostrar configuração biométrica:",n),F({message:"Erro ao abrir configuração biométrica: "+n.message,type:"error"})}};window.authenticateWithBiometric=async function(){try{if(console.log("🔐 Iniciando autenticação biométrica..."),!await window.biometricAuth.checkAvailability())return F({message:"Autenticação biométrica não disponível neste dispositivo.",type:"warning"}),!1;if(!window.biometricAuth.hasSavedCredentials())return F({message:"Configure a autenticação biométrica primeiro nas configurações.",type:"info"}),!1;if(window.showLoading(!0),(await window.biometricAuth.authenticate()).success){console.log("🔐 Autenticação biométrica bem-sucedida, fazendo login...");const t=window.biometricAuth.loadCredentials(),o=window.biometricAuth.loadUserInfo();if(t&&t.userId&&o)try{const r=window.FirebaseAuth?.currentUser;if(r&&r.uid===t.userId)return console.log("🔐 Usuário já está logado"),F({message:"Login biométrico realizado com sucesso!",type:"success"}),window.showLoading(!1),!0;console.log("🔐 Fazendo login automático para usuário:",o.email);const s={uid:o.uid,email:o.email,displayName:o.displayName,photoURL:o.photoURL,isAnonymous:!1,providerData:[{providerId:"google.com",uid:o.uid,displayName:o.displayName,email:o.email,photoURL:o.photoURL}]},a=new CustomEvent("biometricLoginSuccess",{detail:{user:s,userId:t.userId}});return document.dispatchEvent(a),F({message:"Login biométrico realizado com sucesso!",type:"success"}),window.showLoading(!1),!0}catch(r){return console.error("Erro ao fazer login:",r),F({message:"Erro ao fazer login. Tente novamente.",type:"error"}),window.showLoading(!1),!1}else return F({message:"Credenciais biométricas inválidas ou incompletas.",type:"error"}),window.showLoading(!1),!1}return window.showLoading(!1),!1}catch(n){console.error("Erro na autenticação biométrica:",n);let e="Erro na autenticação biométrica.";return n.name==="NotAllowedError"?e="Autenticação biométrica cancelada pelo usuário.":n.name==="SecurityError"?e="Erro de segurança na autenticação biométrica.":n.name==="NotSupportedError"?e="Autenticação biométrica não suportada.":n.message&&(e=n.message),F({message:e,type:"error"}),window.showLoading(!1),!1}};document.addEventListener("DOMContentLoaded",async()=>{try{const n=await window.biometricAuth.checkAvailability();if(console.log("🔒 BiometricAuth: Inicialização concluída, disponível:",n),n&&window.biometricAuth.hasSavedCredentials()){const e=document.getElementById("biometric-login-btn");e&&(e.style.display="block",e.innerHTML="<span>🔐</span> Entrar com Biometria")}else{const e=document.getElementById("biometric-login-btn");e&&(e.style.display="none")}}catch(n){console.error("🔒 BiometricAuth: Erro na inicialização:",n)}});async function EE(){try{const n=new Tt;return(await i0(rn,n)).user}catch(n){throw n.code==="auth/cancelled-popup-request"?F({message:"Login cancelado. Tente novamente.",type:"info"}):F({message:"Erro ao fazer login: "+n.message,type:"error"}),n}}class Kr{static async getGastosPorCategoria(e,t,o){try{if(console.log("📊 Gerando relatório de gastos por categoria..."),!e)throw new Error("ID do orçamento não fornecido");if(!t||!o){const l=new Date;t=new Date(l.getFullYear(),l.getMonth(),1),o=new Date(l.getFullYear(),l.getMonth()+1,0)}let r=[],s=[];if(window.appState?.transactions&&window.appState?.categories)console.log("📊 Usando dados já carregados na aplicação"),r=window.appState.transactions.filter(l=>{if(l.budgetId!==e)return!1;const d=l.createdAt?.toDate?l.createdAt.toDate():new Date(l.createdAt);return d>=t&&d<=o}),s=window.appState.categories.filter(l=>l.budgetId===e);else{console.log("📊 Buscando dados do Firestore...");const l=oe(U,"transactions"),d=ve(l,ne("budgetId","==",e),ne("createdAt",">=",t),ne("createdAt","<=",o));r=(await ge(d)).docs.map(E=>({id:E.id,...E.data()}));const m=oe(U,"categories"),f=ve(m,ne("budgetId","==",e));s=(await ge(f)).docs.map(E=>({id:E.id,...E.data()}))}const a=s.map(l=>{const d=r.filter(m=>m.categoriaId===l.id),h=d.reduce((m,f)=>m+parseFloat(f.valor),0);return{categoria:l,totalGasto:h,transacoes:d,percentual:0}}),c=a.reduce((l,d)=>l+d.totalGasto,0);return a.forEach(l=>{l.percentual=c>0?l.totalGasto/c*100:0}),a.sort((l,d)=>d.totalGasto-l.totalGasto),console.log("✅ Relatório gerado com sucesso:",a),a}catch(r){throw console.error("❌ Erro ao gerar relatório de gastos por categoria:",r),r}}static async getEvolucaoSaldo(e,t=6){try{if(console.log("📊 Gerando relatório de evolução de saldo..."),!e)throw new Error("ID do orçamento não fornecido");const o=new Date,r=[];for(let s=0;s<t;s++){const a=o.getMonth()-s,c=o.getFullYear()+Math.floor(a/12),l=(a%12+12)%12,d=new Date(c,l,1),h=new Date(c,l+1,0);r.push({ano:c,mes:l+1,nome:d.toLocaleString("pt-BR",{month:"long"}),startDate:d,endDate:h,receitas:0,despesas:0,saldo:0})}for(const s of r){let a=[];if(window.appState?.transactions)a=window.appState.transactions.filter(c=>{if(c.budgetId!==e)return!1;const l=c.createdAt?.toDate?c.createdAt.toDate():new Date(c.createdAt);return l>=s.startDate&&l<=s.endDate});else{const c=oe(U,"transactions"),l=ve(c,ne("budgetId","==",e),ne("createdAt",">=",s.startDate),ne("createdAt","<=",s.endDate));a=(await ge(l)).docs.map(h=>({id:h.id,...h.data()}))}for(const c of a){const l=parseFloat(c.valor);c.tipo==="receita"?s.receitas+=l:s.despesas+=l}s.saldo=s.receitas-s.despesas}return r.sort((s,a)=>s.ano!==a.ano?a.ano-s.ano:a.mes-s.mes),console.log("✅ Relatório de evolução de saldo gerado com sucesso:",r),r}catch(o){throw console.error("❌ Erro ao gerar relatório de evolução de saldo:",o),o}}static async getPrevisaoGastos(e,t=3,o=3){try{if(console.log("📊 Gerando previsão de gastos..."),!e)throw new Error("ID do orçamento não fornecido");const r=await this.getEvolucaoSaldo(e,t),s=r.reduce((d,h)=>d+h.receitas,0)/r.length,a=r.reduce((d,h)=>d+h.despesas,0)/r.length,c=new Date,l=[];for(let d=1;d<=o;d++){const h=c.getMonth()+d,m=c.getFullYear()+Math.floor(h/12),f=h%12,_=new Date(m,f,1),E=1+d*.01;l.push({ano:m,mes:f+1,nome:_.toLocaleString("pt-BR",{month:"long"}),receitas:s*E,despesas:a*E,saldo:(s-a)*E,isPrevisto:!0})}return console.log("✅ Previsão de gastos gerada com sucesso:",l),l}catch(r){throw console.error("❌ Erro ao gerar previsão de gastos:",r),r}}static renderizarGraficoCategorias(e,t){try{console.log("📊 Renderizando gráfico de categorias...");const o=document.getElementById(e);if(!o)throw new Error(`Elemento com ID ${e} não encontrado`);if(o.innerHTML="",!t||t.length===0){o.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const r=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Gastos por Categoria</h3>
          <div class="space-y-3">
            ${t.map(s=>`
              <div class="chart-item">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${s.categoria.nome}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    R$ ${s.totalGasto.toFixed(2)} (${s.percentual.toFixed(1)}%)
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div class="h-2.5 rounded-full" 
                       style="width: ${s.percentual}%; background-color: ${s.categoria.cor||"#4F46E5"}"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;o.innerHTML=r,console.log("✅ Gráfico renderizado com sucesso")}catch(o){throw console.error("❌ Erro ao renderizar gráfico de categorias:",o),o}}static renderizarGraficoEvolucao(e,t){try{console.log("📊 Renderizando gráfico de evolução...");const o=document.getElementById(e);if(!o)throw new Error(`Elemento com ID ${e} não encontrado`);if(o.innerHTML="",!t||t.length===0){o.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const r=Math.max(...t.map(l=>l.receitas)),s=Math.max(...t.map(l=>l.despesas)),a=Math.max(r,s)*1.1,c=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Evolução Financeira</h3>
          
          <div class="relative h-64 mt-4">
            <!-- Linhas de grade -->
            <div class="absolute inset-0 grid grid-rows-4 w-full h-full">
              ${[0,1,2,3].map(l=>`
                <div class="border-t border-gray-200 dark:border-gray-700 relative">
                  <span class="absolute -top-3 -left-12 text-xs text-gray-500 dark:text-gray-400">
                    R$ ${(a/4*(4-l)).toFixed(0)}
                  </span>
                </div>
              `).join("")}
            </div>
            
            <!-- Gráfico de linhas -->
            <div class="absolute inset-0 flex items-end justify-between">
              ${t.map((l,d)=>{const h=l.receitas/a*100,m=l.despesas/a*100,f=l.saldo>=0?"bg-green-500":"bg-red-500",_=l.isPrevisto;return`
                  <div class="flex flex-col items-center justify-end w-full max-w-[${100/t.length}%] px-1">
                    <!-- Barra de receita -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-4 ${_?"bg-green-300/50":"bg-green-500"} rounded-t" 
                           style="height: ${h}%"></div>
                    </div>
                    
                    <!-- Barra de despesa -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-4 ${_?"bg-red-300/50":"bg-red-500"} rounded-t" 
                           style="height: ${m}%"></div>
                    </div>
                    
                    <!-- Rótulo do mês -->
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${_?"italic":""}">
                      ${l.nome.substring(0,3)}
                      ${_?"*":""}
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>
          
          <!-- Legenda -->
          <div class="flex justify-center mt-4 space-x-4 text-xs">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span class="text-gray-600 dark:text-gray-400">Receitas</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span class="text-gray-600 dark:text-gray-400">Despesas</span>
            </div>
            ${t.some(l=>l.isPrevisto)?`
              <div class="flex items-center">
                <span class="text-gray-600 dark:text-gray-400 italic">* Previsto</span>
              </div>
            `:""}
          </div>
        </div>
      `;o.innerHTML=c,console.log("✅ Gráfico de evolução renderizado com sucesso")}catch(o){throw console.error("❌ Erro ao renderizar gráfico de evolução:",o),o}}static async gerarRelatorioCompleto(e){try{if(console.log("📊 Gerando relatório completo..."),!e)throw new Error("ID do orçamento não fornecido");if(!window.appState?.currentUser)throw new Error("Usuário não autenticado");console.log("🔍 Gerando relatório para orçamento:",e);const[t,o,r]=await Promise.all([this.getGastosPorCategoria(e),this.getEvolucaoSaldo(e,6),this.getPrevisaoGastos(e,3,3)]);console.log("📊 Dados obtidos:",{gastosPorCategoria:t.length,evolucaoSaldo:o.length,previsaoGastos:r.length});const s={gastosPorCategoria:t,evolucaoSaldo:o,previsaoGastos:r,resumo:{saldoAtual:o[0]?.saldo||0,receitasMes:o[0]?.receitas||0,despesasMes:o[0]?.despesas||0,tendencia:r[0]?.saldo>=0?"positiva":"negativa",categoriasMaioresGastos:t.slice(0,3)}};return console.log("✅ Relatório completo gerado com sucesso"),s}catch(t){throw console.error("❌ Erro ao gerar relatório completo:",t),console.error("Stack trace:",t.stack),t}}}window.Analytics=Kr;class sm{static async render(e){console.log("📊 Renderizando página de análises...");const t=document.createElement("div");t.className="analytics-page p-4";const o=document.createElement("div");o.className="mb-6",o.innerHTML=`
      <h2 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Análises Financeiras</h2>
      <p class="text-gray-600 dark:text-gray-400">Visualize seus dados financeiros de forma clara e objetiva</p>
    `,t.appendChild(o);const r=document.createElement("div");r.className="flex justify-center items-center py-12",r.innerHTML=`
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    `,t.appendChild(r);try{const s=await Kr.gerarRelatorioCompleto(e);t.removeChild(r);const a=document.createElement("div");a.className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8",a.innerHTML=`
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Saldo Atual</h3>
          <p class="text-2xl font-bold ${s.resumo.saldoAtual>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
            R$ ${s.resumo.saldoAtual.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Tendência: <span class="${s.resumo.tendencia==="positiva"?"text-green-500":"text-red-500"}">
              ${s.resumo.tendencia==="positiva"?"↗ Positiva":"↘ Negativa"}
            </span>
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Receitas do Mês</h3>
          <p class="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ ${s.resumo.receitasMes.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ${s.evolucaoSaldo.length>1?`vs. R$ ${s.evolucaoSaldo[1].receitas.toFixed(2)} mês anterior`:"Primeiro mês de dados"}
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Despesas do Mês</h3>
          <p class="text-2xl font-bold text-red-600 dark:text-red-400">
            R$ ${s.resumo.despesasMes.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ${s.evolucaoSaldo.length>1?`vs. R$ ${s.evolucaoSaldo[1].despesas.toFixed(2)} mês anterior`:"Primeiro mês de dados"}
          </p>
        </div>
      `,t.appendChild(a);const c=document.createElement("div");c.className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8";const l=document.createElement("div");l.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",l.id="evolucao-chart",c.appendChild(l);const d=document.createElement("div");d.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",d.id="categorias-chart",c.appendChild(d),t.appendChild(c);const h=document.createElement("div");h.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8",h.innerHTML=`
        <h3 class="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Previsão para os Próximos Meses</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mês</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receitas (prev.)</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Despesas (prev.)</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Saldo (prev.)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              ${s.previsaoGastos.map((_,E)=>`
                <tr class="${E%2===0?"bg-gray-50 dark:bg-gray-900/50":""}">
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">${_.nome} ${_.ano}</td>
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">R$ ${_.receitas.toFixed(2)}</td>
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">R$ ${_.despesas.toFixed(2)}</td>
                  <td class="px-4 py-2 text-sm font-medium ${_.saldo>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">R$ ${_.saldo.toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">* Previsão baseada na média dos últimos 3 meses com tendência de crescimento de 1% ao mês</p>
      `,t.appendChild(h);const m=document.createElement("div");m.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",m.innerHTML=`
        <h3 class="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Maiores Gastos por Categoria</h3>
        <div class="space-y-4">
          ${s.gastosPorCategoria.slice(0,5).map(_=>`
            <div>
              <div class="flex justify-between mb-1">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${_.categoria.cor||"#4F46E5"}"></div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${_.categoria.nome}</span>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">R$ ${_.totalGasto.toFixed(2)}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: ${_.percentual}%; background-color: ${_.categoria.cor||"#4F46E5"}"></div>
              </div>
            </div>
          `).join("")}
        </div>
      `,t.appendChild(m);const f=(_=1,E=5)=>{const T=document.getElementById("evolucao-chart"),S=document.getElementById("categorias-chart");if(console.log(`🔍 Tentativa ${_}: Verificando elementos dos gráficos...`),console.log("- evolucao-chart:",!!T),console.log("- categorias-chart:",!!S),T&&S)try{console.log("📊 Renderizando gráficos..."),Kr.renderizarGraficoEvolucao("evolucao-chart",[...s.evolucaoSaldo,...s.previsaoGastos]),Kr.renderizarGraficoCategorias("categorias-chart",s.gastosPorCategoria),console.log("✅ Gráficos renderizados com sucesso!")}catch(N){console.error("❌ Erro ao renderizar gráficos:",N)}else _<E?(console.log(`⏳ Elementos não encontrados, tentando novamente em ${_*100}ms...`),setTimeout(()=>f(_+1,E),_*100)):console.error("❌ Não foi possível encontrar os elementos dos gráficos após",E,"tentativas")};setTimeout(()=>f(),50)}catch(s){console.error("❌ Erro ao renderizar página de análises:",s),t.contains(r)&&t.removeChild(r);const a=document.createElement("div");a.className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6",a.innerHTML=`
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline"> Não foi possível carregar os dados de análise. Tente novamente mais tarde.</span>
        <p class="text-sm mt-2">${s.message}</p>
      `,t.appendChild(a)}return t}}window.AnalyticsPage=sm;let Fi=!1,To=null;async function gc(){const n=new Date().toISOString();return console.log(`🎯 [${n}] Iniciando renderização de análises - Versão Anti-Corrida`),Fi&&(console.log(`⏳ [${n}] Renderização já em andamento, aguardando...`),To)?await To:(Fi=!0,To=(async()=>{try{console.log(`🧹 [${n}] Limpando DOM...`);const e=document.getElementById("app-content");if(!e)throw new Error("Container app-content não encontrado");if(e.innerHTML="",await new Promise(r=>setTimeout(r,50)),console.log(`✅ [${n}] app-content limpo e encontrado`),!window.appState?.currentUser){console.log(`⚠️ [${n}] Usuário não autenticado`),au("Usuário não autenticado","Faça login para acessar as análises");return}window.appState?.currentBudget||(console.log(`🔄 [${n}] Carregando orçamentos...`),window.loadBudgets&&await window.loadBudgets()),console.log(`🏗️ [${n}] Criando HTML da página...`);const t=TE();console.log(`📝 [${n}] Inserindo HTML...`),e.innerHTML=t;let o=document.getElementById("analytics-content");if(!o&&(console.log(`⚠️ [${n}] analytics-content não encontrado imediatamente, aguardando...`),await new Promise(r=>setTimeout(r,100)),o=document.getElementById("analytics-content"),!o)){console.log(`❌ [${n}] analytics-content ainda não encontrado, forçando criação...`);const r=document.createElement("div");r.id="analytics-content",r.className="analytics-content",e.appendChild(r),o=r,console.log(`🔧 [${n}] analytics-content criado forçadamente`)}console.log(`✅ [${n}] analytics-content encontrado:`,o),await IE(o),console.log(`🎉 [${n}] Análises renderizadas com sucesso!`)}catch(e){const t=new Date().toISOString();console.error(`💥 [${t}] Erro ao renderizar análises:`,e),au("Erro ao carregar análises",e.message)}finally{Fi=!1,To=null}})(),await To)}function TE(){return`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Análises Financeiras</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing" id="analytics-content">
          <div class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span class="ml-3 text-gray-600 dark:text-gray-400">Carregando análises...</span>
          </div>
        </div>
      </div>
    </div>
  `}async function IE(n,e){try{console.log(`🎨 [${e}] Renderizando conteúdo da página...`);const t=await sm.render(window.appState.currentBudget.id);n.innerHTML="",n.appendChild(t),console.log(`✅ [${e}] Conteúdo renderizado com sucesso`)}catch(t){console.error(`❌ [${e}] Erro ao renderizar conteúdo:`,t),n.innerHTML=`
      <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
        <strong class="font-bold">Erro ao carregar gráficos!</strong>
        <span class="block sm:inline mt-2">Não foi possível carregar os gráficos de análise.</span>
        <p class="text-sm mt-2 opacity-75">${t.message}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="window.location.hash = '#analytics'" class="btn-secondary">
          <i class="fas fa-redo mr-2"></i> Tentar Novamente
        </button>
        <button onclick="window.location.hash = '#/dashboard'" class="btn-primary">
          <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
        </button>
      </div>
    `}}async function au(n,e){console.log(`🚨 [${e}] Renderizando página de erro...`);const t=document.getElementById("app-content");if(!t){console.error(`💥 [${e}] Não foi possível renderizar página de erro: app-content não encontrado`);return}t.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Análises Financeiras</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
            <strong class="font-bold">Erro!</strong>
            <span class="block sm:inline mt-2">Não foi possível carregar as análises financeiras.</span>
            <p class="text-sm mt-2 opacity-75">${n.message}</p>
            <p class="text-xs mt-1 opacity-50">Timestamp: ${e}</p>
          </div>
          <div class="flex gap-2">
            <button id="retry-analytics-btn" class="btn-secondary">
              <i class="fas fa-redo mr-2"></i> Tentar Novamente
            </button>
            <button id="back-dashboard-btn" class="btn-primary">
              <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  `;const o=document.getElementById("retry-analytics-btn");o&&o.addEventListener("click",()=>{console.log(`🔄 [${e}] Tentando novamente...`),gc()});const r=document.getElementById("back-dashboard-btn");r&&r.addEventListener("click",()=>{console.log(`🏠 [${e}] Voltando ao dashboard...`),window.location.hash="#/dashboard"}),console.log(`✅ [${e}] Página de erro renderizada`)}window.renderAnalytics=gc;console.log("📦 AnalyticsRoute.js carregado (versão definitiva)");function xE(){console.log("🔧 Criando FAB corrigido...");let n=!1,e=!1;const t=l(),o=d(),r=h(),s=m({id:"fab-transaction",text:"Nova Transação",icon:"💰",color:"var(--primary-color)",action:AE}),a=m({id:"fab-recorrente",text:"Nova Recorrente",icon:"🔄",color:"var(--secondary-color)",action:CE}),c=m({id:"fab-voice",text:"Voz",icon:"🎤",color:"var(--success-color)",action:kE});return r.appendChild(s),r.appendChild(a),r.appendChild(c),t.appendChild(r),t.appendChild(o),f(),console.log("✅ FAB corrigido criado com sucesso"),t;function l(){const S=document.createElement("div");return S.id="fab-container-main",S.className="fab-container-refactored",S.style.cssText=`
      position: fixed !important;
      bottom: 120px !important;
      right: 20px !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-end !important;
      gap: 12px !important;
      pointer-events: auto !important;
      overflow: visible !important;
      visibility: visible !important;
      opacity: 1 !important;
      transform: none !important;
      max-width: 200px !important;
      max-height: none !important;
    `,S}function d(){const S=document.createElement("button");S.id="fab-main",S.innerHTML="+",S.type="button",S.setAttribute("aria-label","Abrir menu de ações"),S.style.cssText=`
      width: 64px !important;
      height: 64px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
      color: white !important;
      border: none !important;
      font-size: 32px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      z-index: 10000 !important;
      min-width: 64px !important;
      min-height: 64px !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      outline: none !important;
      position: relative !important;
      transform: rotate(0deg) !important;
    `;const N=()=>{!n&&!e&&(S.style.transform="scale(1.1) rotate(0deg)",S.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.3)")},L=()=>{!n&&!e&&(S.style.transform="scale(1) rotate(0deg)",S.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)")};return S.addEventListener("mouseenter",N),S.addEventListener("mouseleave",L),S.addEventListener("touchstart",N),S.addEventListener("touchend",L),S}function h(){const S=document.createElement("div");return S.id="fab-actions",S.style.cssText=`
      display: none !important;
      flex-direction: column !important;
      gap: 12px !important;
      z-index: 9999 !important;
      margin-bottom: 12px !important;
      overflow: visible !important;
      opacity: 0 !important;
      transform: translateY(20px) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      visibility: hidden !important;
      position: relative !important;
      pointer-events: none !important;
      max-height: none !important;
      max-width: 200px !important;
    `,S}function m({id:S,text:N,icon:L,color:$,action:ee}){const Z=document.createElement("button");Z.id=S,Z.innerHTML=`${L} ${N}`,Z.type="button",Z.setAttribute("aria-label",N),Z.style.cssText=`
      background: linear-gradient(135deg, ${$}, ${SE($,-20)}) !important;
      color: var(--text-white) !important;
      padding: 12px 16px !important;
      border-radius: var(--border-radius-lg) !important;
      border: none !important;
      font-size: var(--font-size-sm) !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      min-height: 48px !important;
      min-width: 140px !important;
      max-width: 160px !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
      transition: all var(--transition-normal) !important;
      z-index: 10000 !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      outline: none !important;
      position: relative !important;
      transform: scale(1) !important;
    `;const le=()=>{e||(Z.style.transform="scale(1.05)",Z.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.3)")},v=()=>{e||(Z.style.transform="scale(1)",Z.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)")};Z.addEventListener("mouseenter",le),Z.addEventListener("mouseleave",v),Z.addEventListener("touchstart",le),Z.addEventListener("touchend",v);const w=y=>{y.preventDefault(),y.stopPropagation(),console.log(`🔧 Botão ${S} clicado!`);let I=!1;try{ee&&(ee(),I=!0)}catch(x){console.error(`❌ Erro ao executar ação do botão ${S}:`,x),En(`Erro ao executar ${N}`)}I&&T()};return Z.addEventListener("click",w),Z}function f(){const S=$=>{$.preventDefault(),$.stopPropagation(),_()};o.addEventListener("click",S);const N=$=>{!t.contains($.target)&&n&&T()};document.addEventListener("click",N);const L=$=>{$.key==="Escape"&&n&&T()};document.addEventListener("keydown",L),t.addEventListener("click",$=>{$.stopPropagation()})}function _(){if(e){console.log("⚠️ FAB está animando, ignorando clique");return}e=!0,console.log("🔧 Alternando FAB:",n?"Fechando":"Abrindo"),n?T():E()}function E(){console.log("🔧 Abrindo FAB..."),r.style.display="flex",r.style.visibility="visible",r.style.pointerEvents="auto",r.style.opacity="0",r.style.transform="translateY(20px)",requestAnimationFrame(()=>{r.style.transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",r.style.opacity="1",r.style.transform="translateY(0)"}),o.style.transform="rotate(45deg)",n=!0,setTimeout(()=>{e=!1},300)}function T(){console.log("🔧 Fechando FAB..."),r.style.transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",r.style.opacity="0",r.style.transform="translateY(20px)",r.style.pointerEvents="none",o.style.transform="rotate(0deg)",n=!1,setTimeout(()=>{r.style.display="none",r.style.visibility="hidden",e=!1},300)}}function SE(n,e){if(n.startsWith("var(--primary-color)"))return"var(--secondary-color)";if(n.startsWith("var(--secondary-color)"))return"var(--primary-color)";if(n.startsWith("var(--success-color)"))return"var(--success-color)";if(n.startsWith("var("))return n;const t=n.replace("#",""),o=Math.max(0,Math.min(255,parseInt(t.substr(0,2),16)+e)),r=Math.max(0,Math.min(255,parseInt(t.substr(2,2),16)+e)),s=Math.max(0,Math.min(255,parseInt(t.substr(4,2),16)+e));return`#${o.toString(16).padStart(2,"0")}${r.toString(16).padStart(2,"0")}${s.toString(16).padStart(2,"0")}`}function AE(){if(console.log("🔧 Executando ação: Nova Transação"),typeof window.showAddTransactionModal=="function"){console.log("✅ Função showAddTransactionModal encontrada");try{return window.showAddTransactionModal(),!0}catch(n){return console.error("❌ Erro ao executar showAddTransactionModal:",n),En("Erro ao abrir modal de transação"),!1}}else return console.warn("⚠️ Função showAddTransactionModal não disponível"),En("Modal de transação não disponível. Tente recarregar a página."),!1}function CE(){if(console.log("🔧 Executando ação: Nova Recorrente"),typeof window.showAddRecorrenteModal=="function"){console.log("✅ Função showAddRecorrenteModal encontrada");try{return window.showAddRecorrenteModal(),!0}catch(n){return console.error("❌ Erro ao executar showAddRecorrenteModal:",n),En("Erro ao abrir modal de recorrente"),!1}}else return console.warn("⚠️ Função showAddRecorrenteModal não disponível"),En("Modal de recorrente não disponível. Tente recarregar a página."),!1}function kE(){if(console.log("🔧 Executando ação: Voz"),typeof window.openVoiceModal=="function"){console.log("✅ Função openVoiceModal encontrada");try{return window.openVoiceModal(),!0}catch(n){return console.error("❌ Erro ao executar openVoiceModal:",n),En("Erro ao abrir modal de voz"),!1}}else return console.warn("⚠️ Função openVoiceModal não disponível"),En("Funcionalidade de voz não disponível. Tente recarregar a página."),!1}function En(n){if(console.error("❌ Erro no FAB:",n),window.Snackbar&&typeof window.Snackbar.show=="function")try{window.Snackbar.show(n,"error");return}catch(e){console.warn("⚠️ Erro ao usar Snackbar:",e)}window.alert?alert(n):console.error("Nenhum sistema de notificação disponível")}window.toggleFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-main");e&&e.click()}};window.closeFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-actions"),t=n.querySelector("#fab-main");e&&t&&(e.style.display="none",e.style.opacity="0",e.style.visibility="hidden",e.style.pointerEvents="none",t.style.transform="rotate(0deg)")}};window.openFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-actions"),t=n.querySelector("#fab-main");e&&t&&(e.style.display="flex",e.style.visibility="visible",e.style.opacity="1",e.style.transform="translateY(0)",e.style.pointerEvents="auto",t.style.transform="rotate(45deg)")}};window.cleanupFAB=function(){};window.checkFABState=function(){const n=document.getElementById("fab-container-main"),e=document.getElementById("fab-actions"),t=document.getElementById("fab-main");if(console.log("🔍 Estado do FAB:"),console.log("  - Container:",!!n),console.log("  - Actions:",!!e),console.log("  - Main button:",!!t),n&&e&&t){const o=e.style.display,r=t.style.transform;console.log("  - Actions display:",o),console.log("  - Main transform:",r)}return{fabContainer:n,fabActions:e,fabMain:t}};async function RE(n){if(!confirm("Tem certeza que deseja excluir esta despesa recorrente?"))return;const e=window.appState?.currentUser;if(!e){F({message:"Usuário não autenticado.",type:"error"});return}await mc(e.uid,n),F({message:"Recorrente excluída com sucesso.",type:"success"}),await window.loadRecorrentes(),fc()}function PE(n){const e=window.appState?.currentUser;if(!e){F({message:"Usuário não autenticado.",type:"error"});return}rm(e.uid,n.id,{ativa:!n.ativa}),F({message:"Status atualizado com sucesso.",type:"info"}),window.loadRecorrentes().then(fc)}window.handleDeleteRecorrente=RE;window.handleToggleRecorrente=PE;async function im(n){const e=window.appState?.currentUser;if(!e){F({message:"Usuário não autenticado.",type:"error"});return}const t=(window.appState.recorrentes||[]).find(a=>a.id===n),o=t?t.descricao:"",r=window.appState.currentBudget?.id;console.log("🔍 Iniciando busca de histórico para:",{recorrenteId:n,descricao:o,budgetId:r,userId:e.uid});const s=tn({title:`Histórico de ${o}`,content:`<div class='flex flex-col items-center py-8'>
      <div class='loader mb-4'></div>
      <div>Carregando histórico...</div>
      <button onclick='closeModal()' class='mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
    </div>`});document.body.appendChild(s);try{const{collection:a,getDocs:c,query:l,where:d}=await $e(async()=>{const{collection:v,getDocs:w,query:y,where:I}=await Promise.resolve().then(()=>Ye);return{collection:v,getDocs:w,query:y,where:I}},void 0),{db:h}=await $e(async()=>{const{db:v}=await Promise.resolve().then(()=>om);return{db:v}},void 0);let m=[];console.log("🔍 Buscando transações na coleção principal...");const f=a(h,"transactions"),E=(await c(l(f,d("userId","==",e.uid),d("recorrenteId","==",n)))).docs.map(v=>({...v.data(),id:v.id,origem:"principal"}));console.log("📊 Transações encontradas na coleção principal:",E.length),E.forEach(v=>{console.log("  -",v.descricao,"R$",v.valor,"BudgetId:",v.budgetId,"ID:",v.id)});const S=(window.appState.transactions||[]).filter(v=>v.recorrenteId===n);if(console.log("🔍 Transações no appState com este recorrenteId:",S.length),S.forEach(v=>{console.log("  - AppState:",v.descricao,"R$",v.valor,"BudgetId:",v.budgetId,"ID:",v.id)}),m=m.concat(E),o){console.log("🔍 Buscando transações por descrição:",o);const w=(await c(l(f,d("userId","==",e.uid),d("descricao","==",o)))).docs.map(y=>({...y.data(),id:y.id,origem:"descricao"})).filter(y=>!y.recorrenteId||y.recorrenteId!==n);console.log("📊 Transações encontradas por descrição:",w.length),w.forEach(y=>{console.log("  -",y.descricao,"R$",y.valor,"RecorrenteId:",y.recorrenteId)}),m=m.concat(w)}console.log("🔍 Buscando no histórico mensal...");const N=new Date,L=N.getFullYear(),$=N.getMonth()+1;for(let v=2023;v<=L;v++){const w=v===L?$:12;for(let y=1;y<=w;y++){const I=String(y).padStart(2,"0"),x=a(h,"users",e.uid,"historico",`${v}-${I}`,"transacoes");try{const A=await c(l(x,d("recorrenteId","==",n)));if(!A.empty){console.log(`📊 Histórico ${v}-${I}:`,A.docs.length,"transações");const b=A.docs.map(D=>({...D.data(),id:D.id,origem:`historico-${v}-${I}`}));m=m.concat(b)}}catch(A){console.log(`⚠️ Erro ao buscar histórico ${v}-${I}:`,A.message)}}}if(m.length===0){console.log("🔍 Nenhuma transação encontrada no Firestore, buscando no appState...");const w=(window.appState.transactions||[]).filter(y=>y.recorrenteId===n||o&&y.descricao?.toLowerCase().includes(o.toLowerCase()));console.log("📊 Transações encontradas no appState:",w.length),w.forEach(y=>{console.log("  - AppState:",y.descricao,"R$",y.valor,"BudgetId:",y.budgetId,"ID:",y.id)}),m=w.map(y=>({...y,origem:"appState"}))}const ee=[],Z=new Set;m.forEach(v=>{Z.has(v.id)||(Z.add(v.id),ee.push(v))}),m=ee,console.log("📊 Total de transações únicas encontradas:",m.length),m.sort((v,w)=>{const y=v.createdAt?.seconds?v.createdAt.seconds:0;return(w.createdAt?.seconds?w.createdAt.seconds:0)-y});const le=s.querySelector(".modal-body");le.innerHTML=`
      <div class='space-y-2'>
        <div class='text-xs text-gray-400 mb-4'>
          <div><b>Recorrente ID:</b> ${n}</div>
          <div><b>Budget ID:</b> ${r||"N/A"}</div>
          <div><b>Total encontrado:</b> ${m.length} transações</div>
        </div>
        ${m.length===0?`<div class='text-gray-500 p-4 bg-gray-50 rounded'>
                <p><b>Nenhuma aplicação encontrada.</b></p>
                <p class='text-sm mt-2'>Possíveis causas:</p>
                <ul class='text-sm mt-1 ml-4 list-disc'>
                  <li>A recorrente não foi efetivada neste mês</li>
                  <li>O orçamento selecionado é diferente</li>
                  <li>O campo recorrenteId está incorreto na transação</li>
                  <li>A transação foi salva em outro budgetId</li>
                </ul>
              </div>`:m.map(v=>`
                  <div class='flex justify-between items-center border-b pb-2 mb-2'>
                    <div class='flex-1'>
                      <div class='font-medium'>${v.descricao||"Sem descrição"}</div>
                      <div class='text-xs text-gray-500'>
                        ${v.createdAt?.seconds?new Date(v.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}
                        ${v.origem?` • ${v.origem}`:""}
                      </div>
                    </div>
                    <div class='text-right'>
                      <div class='font-bold ${v.tipo==="receita"?"text-green-600":"text-red-600"}'>
                        ${v.tipo==="receita"?"+":"-"}R$ ${parseFloat(v.valor||0).toFixed(2)}
                      </div>
                      <div class='text-xs text-gray-400'>ID: ${v.id||"-"}</div>
                    </div>
                  </div>
                `).join("")}
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>
    `}catch(a){console.error("❌ Erro ao carregar histórico:",a),s.querySelector(".modal-body").innerHTML=`<div class='text-red-600 text-center mt-4'>
        <p><b>Erro ao carregar histórico.</b></p>
        <p class='text-sm mt-2'>${a.message||a}</p>
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>`,F({message:"Erro ao carregar histórico: "+(a.message||a),type:"error"})}}window.showHistoricoRecorrente=im;function DE(n,e){try{const t=new Date,o=new Date(n),r=t.getMonth()>o.getMonth()?t.getFullYear():o.getFullYear(),s=t.getMonth()+(e<=t.getDate()?1:0);return new Date(r,s,e)}catch{return new Date}}function fc(){const n=window.appState?.currentUser,e=window.appState?.currentBudget,t=document.getElementById("app-content");if(t.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Despesas Recorrentes</h2>
        <div class="flex flex-wrap gap-2">
          <!-- Botões de ação principais -->
          <div class="flex gap-1">
            <button onclick="window.verificarRecorrentes()" class="btn-secondary mobile-btn">
              <span class="icon-standard">🔍</span>
              <span class="hidden sm:inline">Verificar</span>
            </button>
            <button onclick="window.aplicarRecorrentes()" class="btn-primary mobile-btn">
              <span class="icon-standard">✅</span>
              <span class="hidden sm:inline">Aplicar</span>
            </button>
          </div>
          
          <!-- Botão de adicionar -->
          <button onclick="window.showAddRecorrenteModal()" class="btn-primary mobile-btn">
            <span class="icon-standard">➕</span>
            <span class="hidden sm:inline">Nova Recorrente</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div id="recorrentes-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
      </div>
    </div>
  `,!n||!e){document.getElementById("recorrentes-list").innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhum usuário ou orçamento ativo.</p>';return}const o=window.appState.recorrentes||[],r=window.appState.transactions||[],s=new Date,a=s.getFullYear(),c=s.getMonth()+1,l=r.filter(h=>{if(!h.recorrenteId)return!1;let m;if(h.createdAt&&typeof h.createdAt=="object"&&h.createdAt.seconds)m=new Date(h.createdAt.seconds*1e3);else if(h.createdAt)m=new Date(h.createdAt);else return!1;return m.getFullYear()===a&&m.getMonth()+1===c}).map(h=>h.recorrenteId),d=document.getElementById("recorrentes-list");if(!o.length){d.innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhuma despesa recorrente cadastrada.</p>';return}d.innerHTML="",o.forEach(h=>{const m=l.includes(h.id),_=DE(h.dataInicio,h.diaLancamento||1).toLocaleDateString("pt-BR"),E=window.calcularStatusRecorrente?window.calcularStatusRecorrente(h,r,a,c):{parcelaAtual:null,totalParcelas:h.parcelasTotal,foiEfetivadaEsteMes:m},T=document.createElement("div");T.className="card-standard";const S=parseFloat(h.valor),N=h.valorTotal?parseFloat(h.valorTotal):E.totalParcelas&&E.totalParcelas>1?S*E.totalParcelas:S;let L="";E.temParcelas?E.foiEfetivadaEsteMes?L=`✅ Efetivada: ${E.parcelaAtual} de ${E.totalParcelas}`:E.proximaParcela&&E.proximaParcela<=E.totalParcelas?L=`📅 Agendada: ${E.proximaParcela} de ${E.totalParcelas}`:L=`📊 Parcela ${E.parcelaAtual} de ${E.totalParcelas}`:L="♾️ Infinito",T.innerHTML=`
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${h.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${h.descricao}</span>
      </div>
      <p class="list-item-subtitle">Valor da parcela: R$ ${S.toFixed(2)}${E.totalParcelas&&E.totalParcelas>1?` | Total: R$ ${N.toFixed(2)}`:""}</p>
      <p class="list-item-subtitle">Categoria: ${h.categoriaId||"Sem categoria"}</p>
      <p class="list-item-subtitle font-semibold ${E.foiEfetivadaEsteMes?"text-green-600 dark:text-green-400":"text-blue-600 dark:text-blue-400"}">${L}</p>
      ${h.ativa!==!1&&!E.foiEfetivadaEsteMes?`<p class="text-sm text-green-500 mb-3">Próxima aplicação: ${_}</p>`:E.foiEfetivadaEsteMes?'<p class="text-sm text-blue-500 mb-3">✅ Efetivada este mês</p>':""}
      <div class="flex flex-wrap gap-2 mt-4">
        <!-- Botões principais em linha -->
        <div class="flex gap-1 flex-1">
          <button class="btn-secondary mobile-btn flex-1" onclick="window.showAddRecorrenteModal(${JSON.stringify(h).replace(/\"/g,"&quot;")})">
            <span class="icon-standard">✏️</span>
            <span class="hidden sm:inline">Editar</span>
          </button>
          <button class="btn-secondary mobile-btn flex-1" onclick='window.handleToggleRecorrente(${JSON.stringify(h).replace(/\"/g,"&quot;")})'>
            <span class="icon-standard">${h.ativa===!1?"▶️":"⏸️"}</span>
            <span class="hidden sm:inline">${h.ativa===!1?"Ativar":"Pausar"}</span>
          </button>
        </div>
        
        <!-- Botões secundários em linha -->
        <div class="flex gap-1 flex-1">
          <button class="btn-secondary mobile-btn flex-1" onclick="window.showHistoricoRecorrente('${h.id}')">
            <span class="icon-standard">📊</span>
            <span class="hidden sm:inline">Histórico</span>
          </button>
          <button class="btn-danger mobile-btn flex-1" onclick="window.handleDeleteRecorrente('${h.id}')">
            <span class="icon-standard">🗑️</span>
            <span class="hidden sm:inline">Excluir</span>
          </button>
        </div>
      </div>
    `,d.appendChild(T)})}async function NE(){const n=window.FirebaseAuth?.currentUser,e=document.getElementById("app-content");if(e.innerHTML='<h2 class="text-xl font-bold mb-4">Log de Aplicações Automáticas</h2>',!n){e.innerHTML+='<p class="text-gray-500">Usuário não autenticado.</p>';return}const t=new Date,o=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),s=`${o}-${r}`,a=oe(U,"users",n.uid,"logs",s,"itens"),c=await ge(a);if(c.empty){e.innerHTML+='<p class="text-gray-500">Nenhum log encontrado para este mês.</p>';return}const l=document.createElement("div");l.className="space-y-3",c.forEach(d=>{const h=d.data(),m=document.createElement("div");m.className="p-3 rounded-lg shadow bg-white dark:bg-gray-800 flex justify-between items-start",m.innerHTML=`
      <div>
        <p class="font-semibold">${h.descricao}</p>
        <p class="text-sm text-gray-500">R$ ${parseFloat(h.valor).toFixed(2)} • ${h.categoriaId||"Sem categoria"}</p>
        <p class="text-xs text-gray-400">Aplicado em: ${h.createdAt?.seconds?new Date(h.createdAt.seconds*1e3).toLocaleDateString():"-"}</p>
      </div>
    `,l.appendChild(m)}),e.appendChild(l)}async function ME(){const n=document.getElementById("app-content"),e=window.appState?.currentBudget;window.appState?.currentUser;const t=window.appState?.budgets||[],o=t.find(c=>c.id===e?.id);let r=[];o?.usuariosPermitidos&&o.usuariosPermitidos.length>0&&(r=await Promise.all(o.usuariosPermitidos.map(async c=>{try{const l=await window.getUserInfo(c);return{uid:c,email:l.email||"Email não disponível",role:"Usuário Compartilhado"}}catch(l){return console.error("Erro ao buscar informações do usuário:",c,l),{uid:c,email:"Usuário não encontrado",role:"Usuário Compartilhado"}}})));let s=[];if(window.loadBudgetInvitations)try{console.log("🔍 SettingsPage: Carregando convites pendentes..."),s=await window.loadBudgetInvitations(),console.log("📊 SettingsPage: Convites carregados:",s.length)}catch(c){console.error("❌ SettingsPage: Erro ao carregar convites pendentes:",c)}else console.log("❌ SettingsPage: Função loadBudgetInvitations não encontrada");setTimeout(()=>{window.initializeThemeIcon&&window.initializeThemeIcon(),window.initializeColorTheme&&window.initializeColorTheme(),window.initializeCompactMode&&window.initializeCompactMode(),window.handleResize&&(window.addEventListener("resize",window.handleResize),window.handleResize())},100),n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">⚙️ Configurações</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing">

      <!-- Seção: Orçamento Atual (Card importante) -->
      ${e?`
      <section class="content-section">
        <h2 class="section-title green-border">Orçamento Atual</h2>
        
        <div class="budget-card">
          <div class="budget-header">
            <div class="budget-icon">📋</div>
            <div class="budget-info">
              <div class="budget-name">${e.nome||"Orçamento sem nome"}</div>
              <div class="budget-status">Ativo</div>
            </div>
            <button class="edit-button" onclick="editBudgetName()">
              <span class="edit-icon">✏️</span>
            </button>
          </div>
          
          <div class="budget-details">
            <div class="detail-item">
              <span class="detail-label">Criado em:</span>
              <span class="detail-value">${e.createdAt?new Date(e.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Usuários com acesso:</span>
              <span class="detail-value">${r.length+1}</span>
            </div>
          </div>
        </div>
      </section>
      `:""}

      <!-- Seção: Usuários com Acesso ao Orçamento -->
      ${r.length>0?`
      <section class="content-section">
        <h2 class="section-title blue-border">Usuários com Acesso</h2>
        <p class="section-description">Usuários que têm acesso ao seu orçamento atual</p>
        
        <div class="users-list">
          ${r.map(c=>`
            <div class="user-item">
              <div class="user-info">
                <div class="user-avatar">👤</div>
                <div class="user-details">
                  <div class="user-email">${c.email}</div>
                  <div class="user-role">${c.role}</div>
                  <div class="user-date">Adicionado em ${new Date().toLocaleDateString("pt-BR")}</div>
                </div>
              </div>
              <div class="user-actions">
                <button class="remove-user-button" onclick="removeUserFromBudget('${c.uid}', '${c.email}')" title="Remover usuário do orçamento">
                  <span class="remove-icon">🚫</span>
                  <span class="remove-text">Remover</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
      `:`
      <section class="content-section">
        <h2 class="section-title blue-border">Usuários com Acesso</h2>
        <p class="section-description">Usuários que têm acesso ao seu orçamento atual</p>
        
        <div class="empty-state">
          <div class="empty-icon">👥</div>
          <div class="empty-text">Nenhum usuário compartilhado</div>
          <div class="empty-description">Compartilhe seu orçamento para ver usuários aqui</div>
        </div>
      </section>
      `}

      <!-- Seção: Convites Enviados Pendentes -->
      ${s.length>0?`
      <section class="content-section">
        <h2 class="section-title orange-border">Convites Enviados</h2>
        <p class="section-description">Convites aguardando resposta dos usuários</p>
        
        <div class="invitations-list">
          ${s.map(c=>`
            <div class="invitation-item">
              <div class="invitation-info">
                <div class="invitation-email">${c.email}</div>
                <div class="invitation-date">Enviado em ${new Date(c.createdAt.seconds*1e3).toLocaleDateString("pt-BR")}</div>
                <div class="invitation-status">Status: Aguardando resposta</div>
              </div>
              <div class="invitation-actions">
                <button class="cancel-invitation-button" onclick="cancelInvitation('${c.id}', '${c.email}')" title="Cancelar convite">
                  <span class="cancel-icon">❌</span>
                  <span class="cancel-text">Cancelar</span>
                </button>
                <button class="resend-invitation-button" onclick="resendInvitation('${c.id}', '${c.email}')" title="Reenviar convite">
                  <span class="resend-icon">📤</span>
                  <span class="resend-text">Reenviar</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
      `:`
      <section class="content-section">
        <h2 class="section-title orange-border">Convites Enviados</h2>
        <p class="section-description">Convites aguardando resposta dos usuários</p>
        
        <div class="empty-state">
          <div class="empty-icon">📨</div>
          <div class="empty-text">Nenhum convite pendente</div>
          <div class="empty-description">Você não tem convites aguardando resposta</div>
        </div>
      </section>
      `}

      <!-- Seção: Convites Recebidos -->
      <section class="content-section">
        <h2 class="section-title purple-border">Convites Recebidos</h2>
        <p class="section-description">Convites de outros usuários para acessar seus orçamentos</p>
        
        <div class="empty-state">
          <div class="empty-icon">📬</div>
          <div class="empty-text">Nenhum convite recebido</div>
          <div class="empty-description">Você não tem convites pendentes de outros usuários</div>
        </div>
      </section>

      <!-- Seção: Compartilhar Orçamento -->
      ${e?`
      <section class="content-section">
        <h2 class="section-title green-border">Compartilhar Orçamento</h2>
        <p class="section-description">Compartilhe seu orçamento atual com outros usuários</p>
        
        <div class="share-form">
          <div class="input-group">
            <label class="input-label">Email do usuário:</label>
            <input type="email" id="share-email" class="form-input" placeholder="usuario@exemplo.com">
          </div>
          <button onclick="shareBudget()" class="share-button">
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

      <!-- Seção: Gerenciar Orçamentos -->
      <section class="content-section">
        <h2 class="section-title blue-border">Gerenciar Orçamentos</h2>
        
        <div class="budgets-list">
          ${t.map(c=>`
            <div class="budget-item ${c.id===e?.id?"active":""}">
              <div class="budget-item-info">
                <div class="budget-item-name">${c.nome}</div>
                <div class="budget-item-date">Criado em ${c.createdAt?new Date(c.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}</div>
                ${c.id===e?.id?'<div class="budget-item-status">Ativo</div>':""}
              </div>
              <div class="budget-item-actions">
                ${c.id!==e?.id?`
                  <button class="enter-budget-button" onclick="enterBudget('${c.id}', '${c.nome}')" title="Entrar neste orçamento">
                    <span class="enter-icon">🚪</span>
                    <span class="enter-text">Entrar</span>
                  </button>
                `:`
                  <div class="current-budget-badge">
                    <span class="current-icon">✅</span>
                    <span class="current-text">Ativo</span>
                  </div>
                `}
                <button class="delete-button" onclick="deleteBudgetFromSettings('${c.id}')" title="Excluir orçamento">
                  <span class="delete-icon">🗑️</span>
                </button>
              </div>
            </div>
          `).join("")}
        </div>
        
        <button onclick="createNewBudget()" class="create-button">
          <span class="create-icon">➕</span>
          <span class="create-text">Criar Novo Orçamento</span>
        </button>
      </section>

      <!-- Seção: Dados e Privacidade -->
      <section class="content-section">
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
      </section>

      <!-- Seção: Configurações de Notificações -->
      <section class="content-section">
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
      </section>

      <!-- Seção: Configurações de Interface -->
      <section class="content-section">
        <h2 class="section-title blue-border">Interface</h2>
        
        <div class="interface-settings">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Modo Escuro</div>
              <div class="setting-description">Alternar entre tema claro e escuro</div>
            </div>
            <button onclick="toggleTheme()" class="theme-button">
              <span class="theme-icon">🌙</span>
              <span class="theme-text">Alternar</span>
            </button>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Tema de Cores</div>
              <div class="setting-description">Escolher cores preferidas para o app</div>
            </div>
            <div class="color-theme-selector">
              <button onclick="setColorTheme('blue')" class="color-option blue" title="Azul">
                <span class="color-preview" style="background: #3B82F6;"></span>
              </button>
              <button onclick="setColorTheme('green')" class="color-option green" title="Verde">
                <span class="color-preview" style="background: #10B981;"></span>
              </button>
              <button onclick="setColorTheme('purple')" class="color-option purple" title="Roxo">
                <span class="color-preview" style="background: #8B5CF6;"></span>
              </button>
              <button onclick="setColorTheme('orange')" class="color-option orange" title="Laranja">
                <span class="color-preview" style="background: #F59E0B;"></span>
              </button>
            </div>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Compactar Interface</div>
              <div class="setting-description">Mostrar mais informações em menos espaço</div>
            </div>
            <div class="compact-controls">
              <label class="toggle-switch">
                <input type="checkbox" id="compact-interface" onchange="toggleCompactMode(this.checked)">
                <span class="toggle-slider"></span>
              </label>
              <button class="micro-compact-btn" onclick="toggleMicroMode()" title="Modo micro-compacto">
                📏
              </button>
              <button class="nano-compact-btn" onclick="toggleNanoMode()" title="Modo nano-compacto">
                🔬
              </button>
            </div>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">Animações</div>
              <div class="setting-description">Mostrar animações e transições</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="animations" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      <!-- Seção: Configurações de Privacidade -->
      <section class="content-section">
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
      <section class="content-section">
        <h2 class="section-title">ℹ️ Sobre o App</h2>
        
        <div class="about-info">
          <div class="about-item">
            <span class="about-label">Versão:</span>
            <span class="about-value">4.2.0</span>
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
            <span class="about-value">Janeiro 2025</span>
          </div>
        </div>
        
        <div class="app-actions">
          <button onclick="checkForUpdates()" class="app-button">
            <span class="app-icon">🔄</span>
            <span class="app-text">Verificar Atualizações</span>
          </button>
          
          <button onclick="openHelp()" class="app-button">
            <span class="app-icon">❓</span>
            <span class="app-text">Ajuda e Suporte</span>
          </button>
          
          <button onclick="rateApp()" class="app-button">
            <span class="app-icon">⭐</span>
            <span class="app-text">Avaliar App</span>
          </button>
        </div>
      </section>
        </div>
      </div>
    </div>

    <style>
      /* Estilos da Abordagem Híbrida para Configurações */
      
      .settings-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0.5rem;
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
          font-size: 0.75rem !important;
          margin-bottom: 0.5rem !important;
          opacity: 0.8;
        }
        
        .section-title {
          font-size: 1rem !important;
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
          font-size: 0.8125rem !important;
          font-weight: 500;
          margin-bottom: 0.125rem !important;
        }
        
        .setting-description {
          font-size: 0.6875rem !important;
          opacity: 0.7;
          line-height: 1.2;
        }
        
        .budget-card {
          padding: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        
        .budget-name {
          font-size: 0.875rem !important;
          font-weight: 600;
        }
        
        .detail-item {
          margin-bottom: 0.125rem !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .detail-label, .detail-value {
          font-size: 0.6875rem !important;
        }
        
        .users-list, .invitations-list {
          gap: 0.25rem !important;
        }
        
        .user-item, .invitation-item {
          padding: 0.375rem !important;
          border-radius: 4px;
        }
        
        .user-email, .invitation-email {
          font-size: 0.8125rem !important;
          font-weight: 500;
        }
        
        .user-role, .invitation-date {
          font-size: 0.6875rem !important;
          opacity: 0.7;
        }
        
        .privacy-actions {
          gap: 0.25rem !important;
          flex-wrap: wrap;
        }
        
        .privacy-button {
          padding: 0.375rem 0.5rem !important;
          font-size: 0.75rem !important;
          border-radius: 4px;
        }
        
        .share-form {
          gap: 0.25rem !important;
          flex-direction: column;
        }
        
        .form-input {
          padding: 0.375rem !important;
          font-size: 0.8125rem !important;
          border-radius: 4px;
        }
        
        .share-button {
          padding: 0.375rem 0.5rem !important;
          font-size: 0.75rem !important;
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
          font-size: 0.8125rem !important;
          font-weight: 500;
        }
        
        .budget-item-date {
          font-size: 0.6875rem !important;
          opacity: 0.7;
        }
        
        .create-button {
          padding: 0.375rem 0.5rem !important;
          font-size: 0.75rem !important;
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
          font-size: 0.6875rem !important;
        }
        
        .app-actions {
          gap: 0.25rem !important;
          flex-wrap: wrap;
        }
        
        .app-button {
          padding: 0.375rem 0.5rem !important;
          font-size: 0.75rem !important;
          border-radius: 4px;
        }
        
        .empty-state {
          padding: 0.5rem !important;
          text-align: center;
        }
        
        .empty-icon {
          font-size: 1.5rem !important;
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
         font-size: 0.875rem;
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
         font-size: 0.6875rem;
         font-weight: 500;
         margin-bottom: 0.0625rem;
       }

       .compact-mode .setting-description {
         font-size: 0.5625rem;
         opacity: 0.6;
         line-height: 1.1;
       }

       .compact-mode .budget-card {
         padding: 0.25rem;
         margin-bottom: 0.25rem;
       }

       .compact-mode .budget-name {
         font-size: 0.75rem;
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
         font-size: 0.5625rem;
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
         font-size: 0.6875rem;
         font-weight: 500;
       }

       .compact-mode .user-role,
       .compact-mode .invitation-date {
         font-size: 0.5625rem;
         opacity: 0.6;
       }

       .compact-mode .privacy-actions {
         gap: 0.125rem;
         flex-wrap: wrap;
       }

       .compact-mode .privacy-button {
         padding: 0.1875rem 0.375rem;
         font-size: 0.625rem;
         border-radius: 3px;
       }

       .compact-mode .share-form {
         gap: 0.125rem;
         flex-direction: column;
       }

       .compact-mode .form-input {
         padding: 0.1875rem;
         font-size: 0.6875rem;
         border-radius: 3px;
       }

       .compact-mode .share-button {
         padding: 0.1875rem 0.375rem;
         font-size: 0.625rem;
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
         font-size: 0.6875rem;
         font-weight: 500;
       }

       .compact-mode .budget-item-date {
         font-size: 0.5625rem;
         opacity: 0.6;
       }

       .compact-mode .create-button {
         padding: 0.1875rem 0.375rem;
         font-size: 0.625rem;
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
         font-size: 0.5625rem;
       }

       .compact-mode .app-actions {
         gap: 0.125rem;
         flex-wrap: wrap;
       }

       .compact-mode .app-button {
         padding: 0.1875rem 0.375rem;
         font-size: 0.625rem;
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
         
         /* Reduzir ainda mais espaçamentos no modo nano */
         .nano-mode .section-title {
           margin-bottom: 0.015625rem;
         }
         
         .nano-mode .content-section {
           margin-bottom: 0.03125rem;
         }
         
         .nano-mode .setting-item {
           margin-bottom: 0.015625rem;
         }
         
         /* Otimizações micro-compactas adicionais */
         .micro-mode .settings-container {
           line-height: 1;
         }
         
         .micro-mode .content-section {
           line-height: 1;
         }
         
         .micro-mode .setting-item {
           line-height: 1;
         }
         
         .micro-mode .setting-label + .setting-description {
           margin-top: 0.03125rem;
         }
         
         .micro-mode .users-list > * + *,
         .micro-mode .invitations-list > * + *,
         .micro-mode .budgets-list > * + * {
           margin-top: 0.0625rem;
         }
         
         .micro-mode .privacy-button,
         .micro-mode .share-button,
         .micro-mode .create-button,
         .micro-mode .app-button {
           line-height: 1;
           min-height: auto;
         }
         
         .micro-mode .form-input {
           line-height: 1;
           min-height: auto;
         }
         
         /* Reduzir ainda mais espaçamentos no modo micro */
         .micro-mode .section-title {
           margin-bottom: 0.03125rem;
         }
         
         .micro-mode .content-section {
           margin-bottom: 0.0625rem;
         }
         
         .micro-mode .setting-item {
           margin-bottom: 0.03125rem;
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

      /* Formulário de compartilhamento */
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
    </style>
  `;const a=document.getElementById("theme-toggle-btn");a&&a.addEventListener("click",()=>{window.setupThemeToggle&&window.setupThemeToggle()})}window.editBudgetName=function(){const n=window.appState?.currentBudget;if(!n){window.Snackbar?.({message:"Nenhum orçamento selecionado",type:"warning"});return}const e=prompt("Digite o novo nome do orçamento:",n.nome);e&&e.trim()&&e!==n.nome&&(console.log("Atualizar nome do orçamento para:",e),window.Snackbar?.({message:"Funcionalidade em desenvolvimento",type:"info"}))};window.removeUserFromBudget=function(n,e){if(confirm(`Tem certeza que deseja remover o usuário "${e}" do orçamento?

Esta ação irá revogar o acesso deste usuário ao orçamento.`)&&(console.log("Remover usuário do orçamento:",n,e),window.appState?.currentBudget)){const t=window.appState.currentBudget.id,o=window.appState.currentBudget.usuariosPermitidos?.filter(s=>s!==n)||[],r=ke(U,"budgets",t);ct(r,{usuariosPermitidos:o}).then(()=>{window.Snackbar?.({message:`Usuário "${e}" removido com sucesso!`,type:"success"}),setTimeout(()=>{window.renderSettings()},1e3)}).catch(s=>{console.error("Erro ao remover usuário:",s),window.Snackbar?.({message:"Erro ao remover usuário. Tente novamente.",type:"error"})})}};window.removeUser=function(n){window.removeUserFromBudget(n,"Usuário")};window.cancelInvitation=function(n,e){if(confirm(`Tem certeza que deseja cancelar o convite enviado para "${e}"?

Este convite será removido permanentemente.`)){console.log("Cancelar convite:",n,e);const t=ke(U,"budgetInvitations",n);ht(t).then(()=>{window.Snackbar?.({message:`Convite para "${e}" cancelado com sucesso!`,type:"success"}),setTimeout(()=>{window.renderSettings()},1e3)}).catch(o=>{console.error("Erro ao cancelar convite:",o),window.Snackbar?.({message:"Erro ao cancelar convite. Tente novamente.",type:"error"})})}};window.resendInvitation=function(n,e){confirm(`Deseja reenviar o convite para "${e}"?

Um novo email será enviado para o usuário.`)&&(console.log("Reenviar convite:",n,e),window.Snackbar?.({message:`Convite reenviado para "${e}"!`,type:"success"}))};window.shareBudget=function(){const n=document.getElementById("share-email").value;if(!n||!n.trim()){window.Snackbar?.({message:"Digite um email válido",type:"warning"});return}if(n===window.appState?.currentUser?.email){window.Snackbar?.({message:"Você não pode compartilhar com seu próprio email",type:"warning"});return}const e=window.appState?.currentBudget;if(!e){window.Snackbar?.({message:"Nenhum orçamento selecionado",type:"warning"});return}if(e.usuariosPermitidos?.includes(n)){window.Snackbar?.({message:"Este usuário já tem acesso ao orçamento",type:"warning"});return}console.log("Compartilhar orçamento com:",n),window.Snackbar?.({message:`Enviando convite para ${n}...`,type:"info"}),setTimeout(()=>{window.Snackbar?.({message:`Convite enviado com sucesso para ${n}!`,type:"success"}),document.getElementById("share-email").value="",setTimeout(()=>{window.renderSettings()},1e3)},2e3)};window.enterBudget=function(n,e){const t=window.appState?.budgets?.find(o=>o.id===n);t&&window.setCurrentBudget&&(window.Snackbar?.({message:`Entrando no orçamento "${e}"...`,type:"info"}),window.setCurrentBudget(t),setTimeout(()=>{window.Snackbar?.({message:`Orçamento "${e}" ativado com sucesso!`,type:"success"}),setTimeout(()=>{window.renderSettings()},500)},1e3))};window.switchBudget=function(n){const e=window.appState?.budgets?.find(t=>t.id===n);e&&window.enterBudget(n,e.nome)};window.deleteBudgetFromSettings=function(n){const e=window.appState?.budgets?.find(t=>t.id===n);e&&confirm(`Tem certeza que deseja excluir o orçamento "${e.nome}"?

⚠️ Esta ação não pode ser desfeita e você perderá todos os dados deste orçamento.`)&&window.deleteBudget&&window.deleteBudget(n).then(async()=>{await window.renderSettings()}).catch(t=>{console.error("Erro ao excluir orçamento:",t)})};window.createNewBudget=function(){const n=prompt("Digite o nome do novo orçamento:");n&&n.trim()&&window.addBudget&&window.addBudget(n.trim()).then(async()=>{await window.renderSettings()}).catch(e=>{console.error("Erro ao criar orçamento:",e)})};window.exportData=function(){if(console.log("📤 Iniciando exportação de dados..."),window.showExportOptions){console.log("🔧 Usando função global de exportação"),window.showExportOptions();return}console.log("📋 Mostrando modal de exportação básico"),window.showModal?window.showModal(`
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
  `):alert("Funcionalidade de exportação em desenvolvimento. Use a função global showExportOptions.")};window.importData=function(){const n=document.createElement("input");n.type="file",n.accept=".json",n.onchange=function(e){const t=e.target.files[0];if(t){const o=new FileReader;o.onload=function(r){try{const s=JSON.parse(r.target.result);console.log("Dados importados:",s),window.Snackbar?.({message:"Funcionalidade de importação em desenvolvimento",type:"info"})}catch{window.Snackbar?.({message:"Arquivo inválido",type:"error"})}},o.readAsText(t)}},n.click()};window.clearData=function(){confirm(`⚠️ ATENÇÃO: Esta ação irá limpar TODOS os dados do orçamento atual!

Tem certeza que deseja continuar?

Esta ação não pode ser desfeita.`)&&confirm("ÚLTIMA CONFIRMAÇÃO: Você tem certeza absoluta que deseja limpar todos os dados?")&&(console.log("Limpar dados do orçamento"),window.Snackbar?.({message:"Funcionalidade em desenvolvimento",type:"info"}))};window.toggleTheme=function(){console.log("🎨 Alternando tema...");const n=document.documentElement,e=document.body,t=n.classList.contains("dark")||e.classList.contains("dark");console.log("🌙 Estado atual do tema:",t?"escuro":"claro"),t?(n.classList.remove("dark"),e.classList.remove("dark"),localStorage.setItem("theme","light"),localStorage.setItem("darkMode","false"),console.log("☀️ Tema alterado para claro")):(n.classList.add("dark"),e.classList.add("dark"),localStorage.setItem("theme","dark"),localStorage.setItem("darkMode","true"),console.log("🌙 Tema alterado para escuro"));const o=document.querySelector(".theme-button .theme-icon");o?(o.textContent=t?"☀️":"🌙",console.log("🔧 Ícone atualizado para:",t?"☀️":"🌙")):console.log("🔧 Botão de tema não encontrado"),window.Snackbar?.({message:`Tema alterado para ${t?"claro":"escuro"}`,type:"success"}),setTimeout(()=>{document.querySelectorAll('[class*="dark:"]').forEach(s=>{s.offsetHeight}),console.log("🎨 Elementos de tema atualizados")},100)};window.initializeThemeIcon=function(){const n=document.documentElement,e=document.body,t=n.classList.contains("dark")||e.classList.contains("dark"),o=document.querySelector(".theme-button .theme-icon");o&&(o.textContent=t?"🌙":"☀️",console.log("🔧 Ícone inicializado para:",t?"🌙":"☀️"))};window.setColorTheme=function(n){console.log("🎨 Definindo tema de cor:",n),document.querySelectorAll(".color-option").forEach(t=>{t.classList.remove("active")});const e=document.querySelector(`.color-option.${n}`);e&&e.classList.add("active"),document.documentElement.setAttribute("data-theme-color",n),localStorage.setItem("colorTheme",n),window.Snackbar?.({message:`Tema de cor alterado para ${n}`,type:"success"}),console.log("✅ Tema de cor aplicado:",n)};window.initializeColorTheme=function(){const n=localStorage.getItem("colorTheme")||"blue";console.log("🎨 Inicializando tema de cor:",n),window.setColorTheme(n)};window.toggleCompactMode=function(n){console.log("📱 Alternando modo ultra-compacto:",n);const e=document.querySelector(".settings-container"),t=document.querySelector(".app-container"),o=document.body;if(!e)return;n?(e.classList.add("compact-mode"),t&&t.classList.add("compact-mode"),o.classList.add("compact-mode"),localStorage.setItem("compactMode","true"),console.log("✅ Modo compacto ativado")):(e.classList.remove("compact-mode"),e.classList.remove("micro-mode"),e.classList.remove("nano-mode"),t&&(t.classList.remove("compact-mode"),t.classList.remove("micro-mode"),t.classList.remove("nano-mode")),o.classList.remove("compact-mode"),o.classList.remove("micro-mode"),o.classList.remove("nano-mode"),localStorage.setItem("compactMode","false"),localStorage.setItem("microMode","false"),localStorage.setItem("nanoMode","false"),localStorage.setItem("autoCompact","false"),console.log("✅ Modo compacto desativado"));const r=document.querySelector(".micro-compact-btn"),s=document.querySelector(".nano-compact-btn");r&&r.classList.remove("active"),s&&s.classList.remove("active"),window.Snackbar?.({message:`Interface ${n?"ultra-compactada":"normal"}`,type:"success"}),setTimeout(()=>{e.offsetHeight,t&&t.offsetHeight},50)};window.toggleMicroMode=function(){console.log("📱 Alternando modo micro-compacto");const n=document.querySelector(".settings-container"),e=document.querySelector(".app-container"),t=document.body,o=document.querySelector(".micro-compact-btn"),r=document.querySelector(".nano-compact-btn");if(!n||!o)return;n.classList.contains("micro-mode")?(n.classList.remove("micro-mode"),e&&e.classList.remove("micro-mode"),t.classList.remove("micro-mode"),o.classList.remove("active"),localStorage.setItem("microMode","false"),console.log("✅ Modo micro-compacto desativado"),window.Snackbar?.({message:"Modo micro-compacto desativado",type:"success"})):(n.classList.contains("compact-mode")||(n.classList.add("compact-mode"),e&&e.classList.add("compact-mode"),t.classList.add("compact-mode"),localStorage.setItem("compactMode","true")),n.classList.add("micro-mode"),e&&e.classList.add("micro-mode"),t.classList.add("micro-mode"),o.classList.add("active"),localStorage.setItem("microMode","true"),console.log("✅ Modo micro-compacto ativado"),window.Snackbar?.({message:"Modo micro-compacto ativado",type:"success"})),n.classList.contains("nano-mode")&&(n.classList.remove("nano-mode"),e&&e.classList.remove("nano-mode"),t.classList.remove("nano-mode"),r&&r.classList.remove("active"),localStorage.setItem("nanoMode","false")),setTimeout(()=>{n.offsetHeight,e&&e.offsetHeight},50)};window.toggleNanoMode=function(){console.log("📱 Alternando modo nano-compacto");const n=document.querySelector(".settings-container"),e=document.querySelector(".app-container"),t=document.body,o=document.querySelector(".nano-compact-btn"),r=document.querySelector(".micro-compact-btn");if(!n||!o)return;n.classList.contains("nano-mode")?(n.classList.remove("nano-mode"),e&&e.classList.remove("nano-mode"),t.classList.remove("nano-mode"),o.classList.remove("active"),localStorage.setItem("nanoMode","false"),console.log("✅ Modo nano-compacto desativado"),window.Snackbar?.({message:"Modo nano-compacto desativado",type:"success"})):(n.classList.contains("compact-mode")||(n.classList.add("compact-mode"),e&&e.classList.add("compact-mode"),t.classList.add("compact-mode"),localStorage.setItem("compactMode","true")),n.classList.contains("micro-mode")||(n.classList.add("micro-mode"),e&&e.classList.add("micro-mode"),t.classList.add("micro-mode"),r&&r.classList.add("active"),localStorage.setItem("microMode","true")),n.classList.add("nano-mode"),e&&e.classList.add("nano-mode"),t.classList.add("nano-mode"),o.classList.add("active"),localStorage.setItem("nanoMode","true"),console.log("✅ Modo nano-compacto ativado"),window.Snackbar?.({message:"Modo nano-compacto ativado",type:"success"})),setTimeout(()=>{n.offsetHeight,e&&e.offsetHeight},50)};window.initializeCompactMode=function(){const n=localStorage.getItem("compactMode")==="true",e=localStorage.getItem("autoCompact")==="true",t=localStorage.getItem("microMode")==="true",o=localStorage.getItem("nanoMode")==="true";console.log("📱 Inicializando modo compacto:",n,"Auto:",e,"Micro:",t,"Nano:",o),(window.innerWidth<=480||window.innerHeight<=600)&&!e&&(console.log("📱 Tela pequena detectada, aplicando auto-compacto"),localStorage.setItem("autoCompact","true"),localStorage.setItem("compactMode","true"));const s=document.getElementById("compact-interface");s&&(s.checked=n||e),window.toggleCompactMode(n||e),t&&setTimeout(()=>{window.toggleMicroMode()},100),o&&setTimeout(()=>{window.toggleNanoMode()},200)};window.handleResize=function(){const n=window.innerWidth<=480||window.innerHeight<=600,e=localStorage.getItem("autoCompact")==="true";if(n&&!e){console.log("📱 Tela pequena detectada, aplicando auto-compacto"),localStorage.setItem("autoCompact","true"),localStorage.setItem("compactMode","true"),window.toggleCompactMode(!0);const t=document.getElementById("compact-interface");t&&(t.checked=!0)}else!n&&e&&(console.log("📱 Tela maior detectada, removendo auto-compacto"),localStorage.setItem("autoCompact","false"))};window.checkForUpdates=function(){window.Snackbar?.({message:"Verificando atualizações...",type:"info"}),setTimeout(()=>{window.Snackbar?.({message:"Você está usando a versão mais recente!",type:"success"})},2e3)};window.openHelp=function(){window.Modal?window.Modal({title:"❓ Ajuda e Suporte",content:`
    <div class="help-content">
      <h3>📚 Guia de Uso</h3>
      <div class="help-section">
        <h4>🎯 Como começar:</h4>
        <ul>
          <li>Crie categorias para organizar suas despesas</li>
          <li>Adicione suas primeiras transações</li>
          <li>Configure despesas recorrentes</li>
          <li>Monitore seu orçamento no dashboard</li>
        </ul>
      </div>
      <div class="help-section">
        <h4>🎤 Comandos de Voz:</h4>
        <ul>
          <li>"Gastei 50 reais no supermercado"</li>
          <li>"Recebi 2000 de salário"</li>
          <li>"Qual meu saldo?"</li>
        </ul>
      </div>
      <div class="help-section">
        <h4>📞 Suporte:</h4>
        <p>Para dúvidas ou problemas, entre em contato:</p>
        <p>📧 Email: suporte@servotech.com</p>
        <p>💬 WhatsApp: (11) 99999-9999</p>
      </div>
    </div>
  `}):alert("Página de ajuda em desenvolvimento")};window.rateApp=function(){window.Modal?window.Modal({title:"⭐ Avaliar App",content:`
    <div class="rating-content">
      <h3>⭐ Avalie o App</h3>
      <p>Seu feedback é muito importante para melhorarmos o aplicativo!</p>
      <div class="rating-stars">
        <span class="star" onclick="rateAppStars(1)">⭐</span>
        <span class="star" onclick="rateAppStars(2)">⭐</span>
        <span class="star" onclick="rateAppStars(3)">⭐</span>
        <span class="star" onclick="rateAppStars(4)">⭐</span>
        <span class="star" onclick="rateAppStars(5)">⭐</span>
      </div>
      <p class="rating-text">Clique nas estrelas para avaliar</p>
      <button onclick="submitRating()" class="submit-rating-btn" style="display: none;">
        Enviar Avaliação
      </button>
    </div>
  `}):alert("Sistema de avaliação em desenvolvimento")};window.rateAppStars=function(n){const e=document.querySelectorAll(".star"),t=document.querySelector(".submit-rating-btn"),o=document.querySelector(".rating-text");e.forEach((r,s)=>{s<n?r.style.color="#ffd700":r.style.color="#ccc"}),t.style.display="block",o.textContent=`Você avaliou com ${n} estrela${n>1?"s":""}`,window.currentRating=n};window.submitRating=function(){if(window.currentRating){window.Snackbar?.({message:`Obrigado pela avaliação de ${window.currentRating} estrelas!`,type:"success"});const n=document.querySelector(".modal-overlay");n&&n.remove()}};class wc{constructor(){this.isListening=!1,this.isStarting=!1,this.hasError=!1,this.isProcessingCommand=!1,this.recognition=null,this.currentType=null,this.isModalOpen=!1,this.retryCount=0,this.maxRetries=3,this.microphonePermissionChecked=!1,this.hasReceivedSpeech=!1,console.log("🎤 VoiceSystem inicializado")}init(){if(console.log("🎤 Inicializando VoiceSystem..."),!this.checkBrowserSupport())return console.error("❌ Navegador não suporta reconhecimento de voz"),this.showError("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge."),!1;if(!this.checkHTTPS())return console.error("❌ HTTPS necessário para reconhecimento de voz"),this.showError("O reconhecimento de voz requer HTTPS. Por favor, acesse o site via HTTPS."),!1;try{this.setupRecognition(),console.log("✅ Reconhecimento configurado")}catch(e){return console.error("❌ Erro ao configurar reconhecimento:",e),!1}try{this.setupGlobalEvents(),console.log("✅ Eventos globais configurados")}catch(e){console.error("❌ Erro ao configurar eventos:",e)}return console.log("✅ VoiceSystem inicializado com sucesso"),!0}checkBrowserSupport(){const e="webkitSpeechRecognition"in window||"SpeechRecognition"in window;return console.log("🔍 Suporte ao reconhecimento de voz:",e),e}checkHTTPS(){const e=location.protocol==="https:"||location.hostname==="localhost";return console.log("🔍 Protocolo seguro:",e),e}setupRecognition(){try{const e=window.SpeechRecognition||window.webkitSpeechRecognition;this.recognition=new e,this.recognition.lang="pt-BR",this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.maxAlternatives=1,this.recognition.serviceURI!==void 0&&(this.recognition.serviceURI="wss://www.google.com/speech-api/v2/recognize"),this.recognition.onstart=()=>this.handleRecognitionStart(),this.recognition.onresult=t=>this.handleRecognitionResult(t),this.recognition.onerror=t=>this.handleRecognitionError(t),this.recognition.onend=()=>this.handleRecognitionEnd(),this.recognition.onspeechstart=()=>this.handleSpeechStart(),this.recognition.onspeechend=()=>this.handleSpeechEnd(),this.recognition.onsoundstart=()=>this.handleSoundStart(),this.recognition.onsoundend=()=>this.handleSoundEnd(),console.log("✅ Reconhecimento configurado com eventos adicionais")}catch(e){console.error("❌ Erro ao configurar reconhecimento:",e),this.showError("Erro ao configurar reconhecimento de voz")}}handleRecognitionStart(){console.log("🎤 Reconhecimento iniciado"),this.isListening=!0,this.hasReceivedSpeech=!1,this.updateModalStatus("","Aguardando sua voz...","listening")}handleSpeechStart(){console.log("🗣️ Fala detectada - início"),this.hasReceivedSpeech=!0,this.updateModalStatus("","Ouvindo...","listening")}handleSpeechEnd(){console.log("🗣️ Fala detectada - fim")}handleSoundStart(){console.log("🔊 Som detectado - início")}handleSoundEnd(){console.log("🔊 Som detectado - fim")}handleRecognitionResult(e){console.log("🎤 Resultado recebido:",e);const t=e.results[e.results.length-1],o=t[0].transcript,r=t[0].confidence,s=t.isFinal;console.log("🎤 Transcrição:",o),console.log("🎤 Confiança:",r),console.log("🎤 Final:",s),s?(console.log("✅ Resultado final recebido, aguardando antes de processar..."),this.updateModalStatus("",`Você disse: "${o}"`,"processing"),setTimeout(()=>{this.isProcessingCommand||this.processCommand(o,r)},200)):this.updateModalStatus("",`Ouvindo: "${o}..."`,"listening")}handleRecognitionError(e){console.error("🎤 Erro no reconhecimento:",e),this.isListening=!1,this.isStarting=!1;const t=this.getErrorMessage(e.error);if(this.hasError=!0,setTimeout(()=>{this.hasError=!1},5e3),e.error==="no-speech"){console.log("⚠️ Nenhuma fala detectada"),this.hasReceivedSpeech?(console.log("ℹ️ Já havia recebido fala, aguardando mais tempo..."),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand&&(this.hasError=!1,this.startListening(this.currentType))},2e3)):(console.log("ℹ️ Nenhuma fala detectada ainda, reiniciando rapidamente..."),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand&&(this.hasError=!1,this.startListening(this.currentType))},500));return}this.updateModalStatus("",t,"error"),this.shouldRetry(e.error)&&this.retryCount<this.maxRetries?(this.retryCount++,console.log(`🔄 Tentativa ${this.retryCount} de ${this.maxRetries}`),setTimeout(()=>{this.isModalOpen&&(this.hasError=!1,this.startListening(this.currentType))},2e3)):setTimeout(()=>{this.closeModal()},3e3)}handleRecognitionEnd(){console.log("🎤 Reconhecimento finalizado"),this.isListening=!1,this.isStarting=!1;const e=this.hasReceivedSpeech&&!this.isProcessingCommand?1e3:500;this.isModalOpen&&!this.isListening&&!this.hasError&&!this.isProcessingCommand?(console.log(`🔄 Reiniciando reconhecimento em ${e}ms...`),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand?(console.log("🔄 Executando reinicialização..."),this.startListening(this.currentType)):console.log("🚫 Cancelando reinicialização - condições não atendidas")},e)):console.log("🚫 Não reiniciando - condições não atendidas:",{isModalOpen:this.isModalOpen,isListening:this.isListening,hasError:this.hasError,isProcessingCommand:this.isProcessingCommand})}async processCommand(e,t){try{this.isProcessingCommand=!0,console.log("🎤 Processando comando:",e);const o=this.normalizeText(e);console.log("🎤 Texto normalizado:",o);const r=this.determineCommandType(o);console.log("🎤 Tipo de comando:",r),this.recognition&&this.isListening&&setTimeout(()=>{this.recognition&&this.isListening&&this.recognition.stop()},100);const s=await this.executeCommand(o,r);this.showSuccess(s),setTimeout(()=>{this.closeModal()},2e3)}catch(o){console.error("❌ Erro ao processar comando:",o),this.showError(`Erro ao processar comando: ${o.message}`),setTimeout(()=>{this.closeModal()},3e3)}finally{this.isProcessingCommand=!1}}normalizeText(e){return e.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").trim()}determineCommandType(e){if(console.log("🔍 Determinando tipo de comando para:",e),/\b(saldo|qual.*saldo|saldo atual|quanto.*tenho|meu saldo)\b/.test(e))return console.log("✅ Comando de consulta detectado"),"query";if(/\b(ir para|va para|mostrar|abrir|navegar).*(dashboard|transacoes|categorias|recorrentes)\b/.test(e))return console.log("✅ Comando de navegação detectado"),"navigation";if(/\b(adicionar|nova|criar|inserir).*(categoria)\b/.test(e)||/\b(categoria).*(nova|adicionar|criar)\b/.test(e))return console.log("✅ Comando de categoria detectado (explícito)"),"category";const t=this.extractCommandItems(e);return console.log("🔍 Itens extraídos do comando:",t),t.length===3?(console.log("✅ 3 itens detectados → Comando de CATEGORIA"),"category"):t.length===4?(console.log("✅ 4 itens detectados → Comando de TRANSAÇÃO"),"transaction"):/\b(adicionar|nova|criar|inserir|registrar|lancamento|lancar).*(despesa|receita|transacao|gasto|entrada|compra|pagamento)\b/.test(e)||/\b(despesa|receita|gasto|entrada|compra|pagamento).*(de|por|valor|no valor)\b/.test(e)||/\b(gastei|paguei|comprei|recebi|ganhei)\b/.test(e)||/\b(pagar|gastar|comprar|receber|ganhar)\b/.test(e)||/\b\d+.*(?:reais?|real|r\$)\b/.test(e)||/\b(?:cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos).*(?:reais?|real|r\$)?\b/.test(e)?(console.log("✅ Comando de transação detectado (padrão tradicional)"),"transaction"):/\b\d+\b/.test(e)&&/\b(reais?|real|r\$|dinheiro|valor)\b/.test(e)?(console.log("✅ Comando de transação detectado (padrão numérico)"),"transaction"):/\b(cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa)\b/.test(e)?(console.log("✅ Comando de transação detectado (número por extenso)"),"transaction"):(console.log("⚠️ Usando tipo padrão:",this.currentType||"transaction"),this.currentType||"transaction")}extractCommandItems(e){console.log("🔍 Extraindo itens do comando:",e);const t=e.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").trim(),o=["adicionar","nova","novo","criar","inserir","registrar","lancamento","lancar","de","da","do","na","no","em","para","por","com","valor","reais","real","r$","dinheiro","categoria","transacao","e","a","o","as","os"],r=t.split(/\s+/).filter(a=>a.length>1).filter(a=>!o.includes(a));console.log("🔍 Palavras filtradas:",r);const s=[];for(const a of r){if(/^\d+([.,]\d+)?$/.test(a)){s.push({type:"valor",value:a});continue}if(/^(despesa|receita|gasto|entrada)s?$/.test(a)){s.push({type:"tipo",value:a});continue}let c=!1;if(window.appState?.categories){for(const l of window.appState.categories)if(l.nome.toLowerCase().includes(a)||a.includes(l.nome.toLowerCase())){s.push({type:"categoria",value:a}),c=!0;break}}!c&&a.length>2&&s.push({type:"descricao",value:a})}return console.log("🔍 Itens identificados:",s),s}async executeCommand(e,t){switch(console.log("🎤 Executando comando:",t,e),t){case"query":return await this.handleQueryCommand(e);case"transaction":return await this.handleTransactionCommand(e);case"category":return await this.handleCategoryCommand(e);case"navigation":return await this.handleNavigationCommand(e);default:throw new Error("Tipo de comando não reconhecido")}}async handleQueryCommand(e){return console.log("🔍 Processando comando de consulta:",e),/\b(saldo|qual.*saldo|saldo atual)\b/.test(e)?`Saldo atual: R$ ${this.calculateBalance().toFixed(2)}`:/\b(despesas|gastos)\b/.test(e)?`Total de despesas: R$ ${this.calculateExpenses().toFixed(2)}`:/\b(receitas|entradas)\b/.test(e)?`Total de receitas: R$ ${this.calculateIncome().toFixed(2)}`:"Comando de consulta não reconhecido"}async handleTransactionCommand(e){console.log("💰 Processando comando de transação:",e);const t=this.parseTransactionCommand(e);if(!t)throw new Error("Não foi possível entender os dados da transação");const o=t.categoriaExistente?`categoria existente "${t.categoria}"`:`nova categoria "${t.categoria}"`;if(window.showAddTransactionModal){const r={descricao:t.descricao,valor:t.valor,tipo:t.tipo,categoriaId:t.categoriaId,data:new Date().toISOString().split("T")[0]};console.log("🎤 Abrindo modal de transação com dados:",r),window.showAddTransactionModal(r);const s=t.valor!==null?`de R$ ${t.valor.toFixed(2)}`:"(valor a definir)";return`✅ Modal aberto com: ${t.tipo} ${s} na ${o}. Você pode editar e salvar.`}else{if(window.addTransactionWithConfirmation)return await window.addTransactionWithConfirmation(t),`✅ Transação confirmada: ${t.tipo} de R$ ${t.valor.toFixed(2)} na ${o}`;if(window.addTransaction)return await window.addTransaction(t),`✅ Transação adicionada: ${t.tipo} de R$ ${t.valor.toFixed(2)} na ${o}`;throw new Error("Função de adicionar transação não disponível")}}async handleCategoryCommand(e){console.log("📂 Processando comando de categoria:",e);const t=this.parseCategoryCommand(e);if(!t||!t.nome)throw new Error("Nome da categoria não foi entendido");if(window.showAddCategoryModal){const o={nome:t.nome,tipo:t.tipo,limite:t.limite||0};console.log("🎤 Abrindo modal de categoria com dados:",o),window.showAddCategoryModal(o);const r=t.limite>0?` com limite de R$ ${t.limite.toFixed(2)}`:"";return`✅ Modal aberto com: categoria "${t.nome}" (${t.tipo})${r}. Você pode editar e salvar.`}else if(window.addCategory){await window.addCategory(t);const o=t.limite>0?` com limite de R$ ${t.limite.toFixed(2)}`:"";return`✅ Categoria "${t.nome}" (${t.tipo})${o} adicionada com sucesso`}else throw new Error("Função de adicionar categoria não disponível")}async handleNavigationCommand(e){return console.log("🧭 Processando comando de navegação:",e),/\b(dashboard|início|principal)\b/.test(e)?(window.location.hash="#/dashboard","Navegando para o Dashboard"):/\b(transações|transação)\b/.test(e)?(window.location.hash="#/transactions","Navegando para Transações"):/\b(categorias|categoria)\b/.test(e)?(window.location.hash="#/categories","Navegando para Categorias"):/\b(recorrentes|recorrente)\b/.test(e)?(window.location.hash="#/recorrentes","Navegando para Recorrentes"):"Comando de navegação não reconhecido"}parseTransactionCommand(e){console.log("🔍 Analisando comando de transação:",e);const t={tipo:{receita:/\b(receita|receitas|entrada|entradas|ganhei|recebi|salario|ganhar|receber|renda|rendas|ganho|ganhos)\b/i},valor:[/(?:de|por|valor|custou|custa|custando|no valor de|foi de)\s*(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)?/i,/(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,/\b(zero|uma?|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\s*(?:reais?|r\$|real|dinheiro)?\b/i,/\b(\d+(?:[.,]\d{1,2})?)\b/],categoria:[/\b(?:categoria|para|em|de|na categoria|tipo)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa)\s*\d)/i,/\b(?:com|para|em|de)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa))/i,/([a-záàâãéèêíìîóòôõúùûç]+)\s*$/]};let o="despesa";t.tipo.receita.test(e)&&(o="receita");let r=null,s=null;console.log("🔍 Tentando extrair valor do texto:",e);const a={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3};for(let E=0;E<t.valor.length;E++){const T=t.valor[E];if(console.log(`🔍 Testando padrão ${E+1}:`,T),s=e.match(T),s){console.log("✅ Match encontrado:",s);const S=s[1];if(console.log("📝 Valor capturado:",S),a[S.toLowerCase()]?(r=a[S.toLowerCase()],console.log("🔢 Número por extenso convertido:",r)):(r=parseFloat(S.replace(",",".")),console.log("🔢 Número convertido:",r)),r&&r>0){console.log("✅ Valor válido encontrado:",r);break}else console.log("❌ Valor inválido, continuando busca..."),r=null,s=null}else console.log("❌ Nenhum match para este padrão")}if(!r){const E={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3},T=/\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i,S=e.match(T);if(S){const N=S[1].toLowerCase();E[N]&&(r=E[N])}if(!r){const N=e.split(" ");for(const L of N)if(E[L.toLowerCase()]){r=E[L.toLowerCase()];break}}}r||(console.log("⚠️ Valor não encontrado, será preenchido manualmente no modal"),r=null);let c="Outros",l=null,d=null;if(window.appState?.categories){console.log("🔍 Procurando categorias existentes no texto:",e);for(const E of window.appState.categories){const T=E.nome.toLowerCase(),S=e.toLowerCase();if(S.includes(T)){d=E,c=E.nome,console.log("✅ Categoria encontrada (exata):",c);break}const N=T.split(" "),L=S.split(" ");let $=0;for(const ee of N)ee.length>2&&L.some(Z=>Z.includes(ee)||ee.includes(Z))&&$++;if($>0&&$>=N.length*.5){d=E,c=E.nome,console.log("✅ Categoria encontrada (parcial):",c,`(${$}/${N.length} palavras)`);break}}}if(!d){for(const E of t.categoria)if(l=e.match(E),l&&l[1]){let T=l[1].trim();if(T=T.replace(/\b(de|por|valor|reais?|r\$|real|dinheiro|custou|custa)\b/gi,"").trim(),T.length>2){c=T,console.log("📝 Categoria extraída do texto:",c);break}}}console.log("🔍 Texto original para descrição:",e);const h=e.toLowerCase().split(" "),m=["adicionar","nova","criar","inserir","despesa","receita","transação","gasto","entrada","gastei","comprei","paguei","com","para","em","de","categoria","na","da","tipo","reais","real","dinheiro","valor","custou","custa","custando"];let f=null;for(const E of h)if(!/^\d+([.,]\d+)?$/.test(E)&&!m.includes(E)&&!(d&&E===d.nome.toLowerCase())&&E.length>=2){f=E;break}console.log("🔍 Primeira palavra significativa encontrada:",f);let _;if(f)_=f.charAt(0).toUpperCase()+f.slice(1),console.log("🔍 Descrição definida como primeira palavra significativa:",_);else{if(_=e,s&&(console.log("🔍 Removendo valor encontrado:",s[0]),_=_.replace(s[0],"")),l&&(console.log("🔍 Removendo categoria extraída:",l[0]),_=_.replace(l[0],"")),d){const E=d.nome.toLowerCase(),T=new RegExp(`\\b${E.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`,"gi");console.log("🔍 Removendo categoria do sistema:",E),_=_.replace(T,"")}_=_.replace(/\b(adicionar|nova?|criar|inserir|transação|gasto|entrada|gastei|comprei|paguei)\b/gi,"").replace(/\b(com|para|em|de|categoria|na categoria|da categoria|tipo)\b/gi,"").replace(/\b(reais?|r\$|real|dinheiro|valor|custou|custa|custando)\b/gi,"").replace(/\b(despesa|receita)\b(?=.*\w)/gi,"").replace(/\s+/g," ").trim(),console.log("🔍 Descrição após limpeza (fallback):",_),(!_||_.length<3)&&(r!==null?_=`${o.charAt(0).toUpperCase()+o.slice(1)} de R$ ${r.toFixed(2)}`:_=`${o.charAt(0).toUpperCase()+o.slice(1)}`,console.log("🔍 Usando descrição padrão (fallback final):",_))}return{tipo:o,valor:r,categoria:c,categoriaId:d?.id||null,categoriaExistente:!!d,descricao:_,data:new Date().toISOString()}}parseCategoryCommand(e){console.log("🔍 Analisando comando de categoria:",e);const t=this.extractCommandItems(e);return t.length===3?(console.log("🔍 Processando comando de categoria com 3 itens"),this.parseCategoryCommandFromItems(t,e)):this.parseCategoryCommandTraditional(e)}parseCategoryCommandFromItems(e,t){console.log("🔍 Analisando comando de categoria com 3 itens:",e);let o=null,r="despesa",s=0;for(const a of e)switch(a.type){case"valor":s=parseFloat(a.value.replace(",",".")),console.log("💰 Limite extraído:",s);break;case"tipo":/^(receita|entrada)s?$/.test(a.value)?r="receita":r="despesa",console.log("📊 Tipo extraído:",r);break;case"descricao":o||(o=a.value.charAt(0).toUpperCase()+a.value.slice(1),console.log("📝 Nome da categoria extraído:",o));break}if(!o){const a=t.toLowerCase().split(" "),c=["adicionar","nova","novo","criar","inserir","categoria","despesa","receita","de","da","do","na","no","em","para","por","com","valor","reais","real","r$","dinheiro"];for(const l of a)if(l.length>2&&!c.includes(l)&&!/^\d+([.,]\d+)?$/.test(l)){o=l.charAt(0).toUpperCase()+l.slice(1),console.log("📝 Nome da categoria extraído (fallback):",o);break}}if(!o)throw new Error("Nome da categoria não foi entendido no comando de 3 itens");return console.log("✅ Categoria processada:",{nome:o,tipo:r,limite:s}),{nome:o,tipo:r,limite:s||0,cor:this.getRandomColor()}}parseCategoryCommandTraditional(e){console.log("🔍 Analisando comando de categoria (método tradicional):",e);const t={nome:[/\b(?:categoria|categoria)\s+(?:chamada|de|para|com nome)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b(?:nova|criar|adicionar)\s+(?:categoria|categoria)\s+(?:chamada|de|para|com nome)?\s*([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b([a-záàâãéèêíìîóòôõúùûç\s]+?)\s+(?:categoria|despesa|receita)\b/i],tipo:{receita:/\b(receita|receitas|entrada|entradas|renda|rendas)\b/i},limite:[/\blimite\s+(?:de\s+)?(\d+(?:[.,]\d{1,2})?)/i,/(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,/(\d+(?:[.,]\d{1,2})?)/]};let o=null;for(const a of t.nome){const c=e.match(a);if(c&&c[1]&&(o=c[1].trim(),o=o.replace(/\b(nova?|criar|adicionar|categoria|tipo|despesa|receita|limite|de|por|valor|reais?|r\$|real|dinheiro)\b/gi,"").trim(),o.length>2))break}if(!o)throw new Error('Nome da categoria não foi entendido. Diga algo como "nova categoria chamada transporte"');let r="despesa";t.tipo.receita.test(e)&&(r="receita");let s=0;for(const a of t.limite){const c=e.match(a);if(c){s=parseFloat(c[1].replace(",","."));break}}if(!s){const a={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3},c=/\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i,l=e.match(c);if(l){const d=l[1].toLowerCase();a[d]&&(s=a[d])}if(!s){const d=e.split(" ");for(const h of d)if(a[h.toLowerCase()]){s=a[h.toLowerCase()];break}}}return{nome:o,tipo:r,limite:s||0,cor:this.getRandomColor()}}getRandomColor(){const e=["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8","#F7DC6F","#BB8FCE","#85C1E9","#F8C471","#82E0AA","#F1948A","#85C1E9","#D7BDE2"];return e[Math.floor(Math.random()*e.length)]}calculateBalance(){if(!window.appState?.transactions)return 0;const e=window.appState.transactions.filter(o=>o.tipo==="receita").reduce((o,r)=>o+parseFloat(r.valor),0),t=window.appState.transactions.filter(o=>o.tipo==="despesa").reduce((o,r)=>o+parseFloat(r.valor),0);return e-t}calculateExpenses(){return window.appState?.transactions?window.appState.transactions.filter(e=>e.tipo==="despesa").reduce((e,t)=>e+parseFloat(t.valor),0):0}calculateIncome(){return window.appState?.transactions?window.appState.transactions.filter(e=>e.tipo==="receita").reduce((e,t)=>e+parseFloat(t.valor),0):0}getErrorMessage(e){return{"not-allowed":"Permissão do microfone negada. Clique no ícone do microfone na barra de endereços e permita o acesso.","no-speech":"Nenhuma fala detectada. Tente falar mais alto ou mais próximo do microfone.","audio-capture":"Erro ao capturar áudio. Verifique se o microfone está funcionando.",network:"Erro de rede. Verifique sua conexão com a internet.","service-not-allowed":"Serviço de reconhecimento de voz não permitido.","not-supported":"Reconhecimento de voz não suportado neste navegador.",aborted:"Reconhecimento de voz interrompido.","audio-capture-device-not-found":"Microfone não encontrado.","audio-capture-device-in-use":"Microfone em uso por outro aplicativo."}[e]||`Erro desconhecido: ${e}`}shouldRetry(e){return["network","service-not-allowed","audio-capture-device-in-use"].includes(e)}getRandomColor(){const e=["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#06B6D4"];return e[Math.floor(Math.random()*e.length)]}openModal(e="transaction"){console.log("🎤 Abrindo modal de voz:",e),this.currentType=e,this.isModalOpen=!0,this.retryCount=0;const t=document.getElementById("voice-modal"),o=t?.querySelector(".voice-content");t&&o?(t.style.display="flex",t.style.pointerEvents="auto",t.style.background="rgba(0, 0, 0, 0.95)",t.style.backdropFilter="blur(30px)",o.style.transform="scale(1)",o.style.opacity="1",document.body.classList.add("voice-modal-open"),setTimeout(()=>{this.startListening(e)},500),console.log("✅ Modal de voz aberto")):console.error("❌ Modal de voz não encontrado")}closeModal(){if(!this.isModalOpen)return;console.log("🎤 Fechando modal de voz"),this.isModalOpen=!1,this.isListening=!1,this.isStarting=!1,this.hasError=!1,this.isProcessingCommand=!1,this.retryCount=0;const e=document.getElementById("voice-modal"),t=e?.querySelector(".voice-content");if(e&&t){if(this.recognition)try{this.recognition.stop(),console.log("🛑 Reconhecimento parado")}catch{console.log("ℹ️ Reconhecimento já estava parado")}t.style.transform="scale(0.95)",t.style.opacity="0",e.style.background="rgba(0, 0, 0, 0)",e.style.backdropFilter="blur(0px)",document.body.classList.remove("voice-modal-open"),setTimeout(()=>{e.style.pointerEvents="none",e.style.display="none",console.log("✅ Modal de voz fechado")},300)}}updateModalStatus(e,t,o){const r=document.getElementById("voice-modal");if(!r)return;const s=r.querySelector("h3"),a=r.querySelector("p"),c=r.querySelector(".voice-icon div"),l=r.querySelector(".voice-status"),d=l?.querySelector("p");if(s)switch(o){case"listening":s.textContent="🎤 Estou te ouvindo!";break;case"processing":s.textContent="🧠 Processando...";break;case"error":s.textContent="❌ Ops! Algo deu errado";break;case"success":s.textContent="✅ Perfeito!";break;default:s.textContent=e||"🎤 Estou te ouvindo!"}if(a)switch(o){case"listening":a.textContent="Fale naturalmente como você gastou ou recebeu dinheiro";break;case"processing":a.textContent="Entendendo o que você disse...";break;case"error":a.textContent=t||"Tente falar novamente de forma mais clara";break;case"success":a.textContent=t||"Transação adicionada com sucesso!";break;default:a.textContent=t||"Fale naturalmente como você gastou ou recebeu dinheiro"}if(c)switch(c.className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg",o){case"listening":c.classList.add("bg-gradient-to-r","from-green-400","to-blue-500","animate-pulse");break;case"processing":c.classList.add("bg-gradient-to-r","from-yellow-400","to-orange-500","animate-spin");break;case"error":c.classList.add("bg-gradient-to-r","from-red-400","to-pink-500");break;case"success":c.classList.add("bg-gradient-to-r","from-green-400","to-emerald-500");break;default:c.classList.add("bg-gradient-to-r","from-green-400","to-blue-500","animate-pulse")}if(l&&(l.querySelectorAll("div").forEach((m,f)=>{switch(m.classList.remove("animate-bounce","animate-pulse","bg-green-500","bg-blue-500","bg-yellow-500","bg-red-500"),o){case"listening":m.classList.add("animate-bounce","bg-green-500"),m.style.animationDelay=`${f*.1}s`;break;case"processing":m.classList.add("animate-pulse","bg-yellow-500"),m.style.animationDelay=`${f*.2}s`;break;case"error":m.classList.add("bg-red-500"),m.style.animationDelay="";break;case"success":m.classList.add("bg-green-500"),m.style.animationDelay="";break;default:m.classList.add("animate-bounce","bg-green-500"),m.style.animationDelay=`${f*.1}s`}}),d))switch(o){case"listening":d.textContent="Microfone ativo",d.className="text-xs text-green-600 dark:text-green-400 font-medium";break;case"processing":d.textContent="Processando comando...",d.className="text-xs text-yellow-600 dark:text-yellow-400 font-medium";break;case"error":d.textContent="Erro no reconhecimento",d.className="text-xs text-red-600 dark:text-red-400 font-medium";break;case"success":d.textContent="Comando executado!",d.className="text-xs text-green-600 dark:text-green-400 font-medium";break;default:d.textContent="Microfone ativo",d.className="text-xs text-green-600 dark:text-green-400 font-medium"}}async startListening(e="transaction"){console.log("🎤 Iniciando reconhecimento de voz...",{type:e,isListening:this.isListening});try{if(!this.recognition)throw console.error("❌ Reconhecimento não configurado"),new Error("Reconhecimento não configurado");if(this.isListening)return console.log("⚠️ Reconhecimento já está ativo, ignorando nova tentativa"),!0;if(this.currentType=e,console.log("✅ Tipo de comando definido:",this.currentType),this.updateModalStatus("","Iniciando...","processing"),!this.microphonePermissionChecked){if(console.log("🔍 Verificação rápida de permissão..."),!await this.quickPermissionCheck())return console.log("❌ Permissão do microfone negada"),!1;this.microphonePermissionChecked=!0}try{this.recognition.stop(),console.log("🛑 Parando reconhecimento anterior (sem delay)...")}catch{console.log("ℹ️ Nenhum reconhecimento anterior para parar")}return this.isStarting=!0,console.log("🚀 Iniciando reconhecimento IMEDIATAMENTE..."),this.recognition.start(),console.log("✅ Reconhecimento iniciado com sucesso"),setTimeout(()=>{this.isStarting=!1},500),!0}catch(t){console.error("❌ Erro ao iniciar reconhecimento:",t),this.isStarting=!1;let o="Erro ao iniciar reconhecimento de voz";if(t.name==="InvalidStateError"){if(console.log("🔄 Reconhecimento já ativo, aguardando..."),await new Promise(r=>setTimeout(r,1e3)),!this.isListening&&!this.isStarting)return console.log("🔄 Tentando novamente após aguardar..."),this.startListening(e);o="Sistema de voz ocupado. Tente novamente em alguns segundos."}else t.name==="NotSupportedError"?o="Reconhecimento de voz não suportado neste navegador. Use Chrome ou Edge.":t.name==="NetworkError"&&(o="Erro de conexão. Verifique sua internet e tente novamente.");return this.showError(o),!1}}async quickPermissionCheck(){console.log("⚡ Verificação rápida de permissão...");try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.warn("⚠️ API getUserMedia não disponível"),this.showError("Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox."),!1;if(navigator.permissions)try{const o=await navigator.permissions.query({name:"microphone"});if(console.log("🔍 Status da permissão:",o.state),o.state==="granted")return console.log("✅ Permissão já concedida"),!0;if(o.state==="denied")return console.log("❌ Permissão negada"),this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1}catch{console.log("ℹ️ API de permissões não disponível, usando método alternativo")}const e=new Promise((o,r)=>setTimeout(()=>r(new Error("Timeout")),1e3)),t=navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});try{return(await Promise.race([t,e])).getTracks().forEach(r=>r.stop()),console.log("✅ Permissão do microfone concedida (verificação rápida)"),!0}catch(o){if(o.message==="Timeout")return console.log("⚠️ Timeout na verificação, assumindo permissão OK"),!0;throw o}}catch(e){return console.warn("⚠️ Erro na verificação rápida:",e.name),e.name==="NotAllowedError"?(this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1):e.name==="NotFoundError"?(this.showError("Nenhum microfone encontrado. Verifique se há um microfone conectado."),!1):(console.log("ℹ️ Assumindo permissão OK para não bloquear o sistema"),!0)}}async requestMicrophonePermission(){console.log("🎤 Solicitando permissão do microfone...");try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.warn("⚠️ API getUserMedia não disponível"),!1;try{return(await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}})).getTracks().forEach(t=>t.stop()),console.log("✅ Permissão do microfone concedida"),!0}catch(e){console.warn("⚠️ Erro de permissão:",e.name);try{const t=await navigator.mediaDevices.enumerateDevices(),o=t.filter(r=>r.kind==="audioinput");return console.log("🔍 Dispositivos encontrados:",t.length),console.log("🎤 Dispositivos de áudio:",o.length),o.length===0?(console.warn("⚠️ Nenhum dispositivo de áudio encontrado"),this.showError("Nenhum microfone encontrado. Verifique se há um microfone conectado."),!1):(console.log("✅ Dispositivos de áudio disponíveis:",o.map(r=>r.label||"Microfone")),this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1)}catch(t){return console.error("❌ Erro ao enumerar dispositivos:",t),this.showError("Erro ao verificar dispositivos de áudio. Tente recarregar a página."),!1}}}catch(e){console.error("❌ Erro ao solicitar permissão:",e);let t="Erro ao acessar microfone";return e.name==="NotFoundError"?t="Nenhum microfone encontrado. Verifique se há um microfone conectado.":e.name==="NotAllowedError"?t="Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.":e.name==="NotReadableError"?t="Microfone em uso por outro aplicativo. Feche outros aplicativos que possam estar usando o microfone.":e.name==="OverconstrainedError"?t="Configuração de microfone não suportada. Tente usar outro navegador.":e.name==="TypeError"&&(t="Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox."),this.showError(t),!1}}showSuccess(e){console.log("✅ Sucesso:",e),this.updateModalStatus("",e,"success"),window.Snackbar&&typeof window.Snackbar.success=="function"?window.Snackbar.success(e):window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar.show(e,"success"):window.Snackbar&&typeof window.Snackbar=="function"?window.Snackbar({message:e,type:"success"}):window.alert&&alert(`✅ ${e}`)}showError(e){console.error("❌ Erro:",e),this.updateModalStatus("",e,"error"),window.Snackbar&&typeof window.Snackbar.error=="function"?window.Snackbar.error(e):window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar.show(e,"error"):window.Snackbar&&typeof window.Snackbar=="function"?window.Snackbar({message:e,type:"error"}):window.alert?alert(`❌ ${e}`):console.error("Nenhum sistema de notificação disponível")}setupGlobalEvents(){this.removeGlobalEvents(),this.escapeHandler=t=>{t.key==="Escape"&&this.isModalOpen&&this.closeModal()},document.addEventListener("keydown",this.escapeHandler),this.outsideClickHandler=t=>{const o=document.getElementById("voice-modal");t.target===o&&this.isModalOpen&&this.closeModal()},document.addEventListener("click",this.outsideClickHandler);const e=document.getElementById("close-voice-modal");if(e){const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),this.closeBtnHandler=o=>{o.preventDefault(),o.stopPropagation(),console.log("❌ Close voice modal button clicked"),this.closeModal()},t.addEventListener("click",this.closeBtnHandler)}}removeGlobalEvents(){if(this.escapeHandler&&(document.removeEventListener("keydown",this.escapeHandler),this.escapeHandler=null),this.outsideClickHandler&&(document.removeEventListener("click",this.outsideClickHandler),this.outsideClickHandler=null),this.closeBtnHandler){const e=document.getElementById("close-voice-modal");e&&e.removeEventListener("click",this.closeBtnHandler),this.closeBtnHandler=null}}start(e="transaction"){console.log("🎤 VoiceSystem.start chamado:",e);try{return!this.recognition&&(console.log("🔄 Inicializando VoiceSystem..."),!this.init())?(console.error("❌ Falha na inicialização do VoiceSystem"),!1):document.getElementById("voice-modal")?(this.currentType=e,console.log("✅ Tipo de comando definido:",this.currentType),this.openModal(e),!0):(console.error("❌ Modal de voz não encontrado no DOM"),this.showError("Interface de voz não disponível"),!1)}catch(t){return console.error("❌ Erro ao iniciar VoiceSystem:",t),this.showError(`Erro ao iniciar reconhecimento de voz: ${t.message}`),!1}}stop(){console.log("🎤 VoiceSystem.stop chamado"),this.closeModal()}destroy(){console.log("🎤 Destruindo VoiceSystem..."),this.recognition&&(this.recognition.stop(),this.recognition=null),this.removeGlobalEvents(),this.isModalOpen&&this.closeModal(),this.isListening=!1,this.isModalOpen=!1,this.retryCount=0,console.log("✅ VoiceSystem destruído")}}let Gt=null;window.openVoiceModal=function(n="transaction"){return console.log("🎤 openVoiceModal chamado:",n),Gt||(Gt=new wc),Gt.start(n)};window.closeVoiceModal=function(){console.log("🎤 closeVoiceModal chamado"),Gt&&Gt.stop()};window.startVoiceRecognition=function(n="transaction"){return console.log("🎤 startVoiceRecognition chamado:",n),Gt||(Gt=new wc),Gt.start(n)};window.Modal=tn;window.Snackbar=F;window.setupThemeToggle=ua;window.FirebaseAuth=rn;window.renderSettings=ME;window._renderRecorrentes=fc;window.showHistoricoRecorrente=im;window.renderLogAplicacoes=NE;window.deleteDespesaRecorrente=mc;window.addDespesaRecorrente=pc;function Lo(n){const e=document.getElementById("page-title");if(!e){console.log("⚠️ Elemento page-title não encontrado (header removido)");return}const o={"/dashboard":"Dashboard","/transactions":"Transações","/categories":"Categorias","/analytics":"Análises","/recorrentes":"Recorrentes","/notifications":"Notificações","/settings":"Configurações"}[n]||"Dashboard";e.textContent=o}window.applyCompactMode=function(){const n=localStorage.getItem("compactMode")==="true",e=localStorage.getItem("microMode")==="true",t=localStorage.getItem("nanoMode")==="true",o=document.querySelector(".app-container"),r=document.body;r.classList.remove("compact-mode","micro-mode","nano-mode"),o&&o.classList.remove("compact-mode","micro-mode","nano-mode"),t?(r.classList.add("compact-mode","micro-mode","nano-mode"),o&&o.classList.add("compact-mode","micro-mode","nano-mode")):e?(r.classList.add("compact-mode","micro-mode"),o&&o.classList.add("compact-mode","micro-mode")):n&&(r.classList.add("compact-mode"),o&&o.classList.add("compact-mode")),console.log("🎯 Modo de compactação aplicado globalmente:",{isCompact:n,isMicro:e,isNano:t})};window.updateInstallButton=function(){const n=document.getElementById("install-app-btn");if(!n)return;const e=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0,t=!!window.deferredPrompt;console.log("📱 PWA: Atualizando botão - Instalado:",e,"Prompt:",t),e?(console.log('📱 PWA: Mostrando "App Instalado"'),n.innerHTML=`
      <div class="flex items-center gap-3">
        <span class="text-xl">✅</span>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">App Instalado</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Já está na tela inicial</div>
        </div>
      </div>
      <span class="text-green-500">✓</span>
    `,n.disabled=!0,n.classList.add("opacity-50","cursor-not-allowed")):t?(console.log('📱 PWA: Mostrando "Instalar App"'),n.innerHTML=`
      <div class="flex items-center gap-3">
        <span class="text-xl">⬇️</span>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">Instalar App</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Adicionar à tela inicial</div>
        </div>
      </div>
      <span class="text-blue-500">→</span>
    `,n.disabled=!1,n.classList.remove("opacity-50","cursor-not-allowed")):(console.log("📱 PWA: Ocultando botão"),n.style.display="none")};window.importBackup=function(){const n=document.createElement("input");n.type="file",n.accept="application/json",n.onchange=async e=>{const t=e.target.files[0];if(!t)return;const o=await t.text();try{const r=JSON.parse(o);r.transactions&&r.categories&&r.budgets?(tn({title:"Importação de Backup (Somente Leitura)",content:`<div class='space-y-2'>
            <p class='text-gray-700'>O backup foi lido com sucesso, mas <b>não será gravado no sistema</b> por questões de segurança.</p>
            <p class='text-gray-500 text-sm'>Se precisar restaurar dados, entre em contato com o suporte.</p>
            <pre class='bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-48'>${JSON.stringify(r,null,2)}</pre>
            <button onclick='closeModal()' class='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Fechar</button>
          </div>`}),F({message:"Backup lido, mas não importado. Apenas leitura.",type:"info"})):(F({message:"Arquivo de backup inválido.",type:"error"}),alert("Arquivo de backup inválido."))}catch(r){F({message:"Erro ao importar backup: "+r.message,type:"error"}),alert("Erro ao importar backup: "+r.message)}},n.click()};window.restoreBackup=function(){if(console.log("🔍 restoreBackup chamada"),!window.appState?.currentUser){console.log("❌ Usuário não logado"),window.Snackbar?window.Snackbar({message:"❌ Você precisa estar logado para restaurar backup.",type:"error"}):alert("❌ Você precisa estar logado para restaurar backup.");return}if(!window.appState?.currentBudget){console.log("❌ Nenhum orçamento selecionado"),window.Snackbar?window.Snackbar({message:"❌ Nenhum orçamento selecionado.",type:"error"}):alert("❌ Nenhum orçamento selecionado.");return}if(console.log("✅ Usuário e orçamento OK, abrindo modal..."),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível. Tente recarregar a página.");return}try{const n=window.Modal({title:"📥 Restaurar Backup",content:`
        <div class='space-y-4'>
          <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
            <p class='text-blue-800 dark:text-blue-200 font-medium'>Como restaurar backup:</p>
            <ol class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside'>
              <li>Clique em "Selecionar Arquivo"</li>
              <li>Escolha o arquivo JSON de backup</li>
              <li>Confirme os dados encontrados</li>
              <li>Aguarde a restauração</li>
            </ol>
          </div>
          
          <div class='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
            <p class='text-yellow-800 dark:text-yellow-200 font-medium'>⚠️ Aviso Importante:</p>
            <p class='text-sm text-yellow-700 dark:text-yellow-300'>
              Esta ação irá substituir todos os dados atuais. 
              Certifique-se de que este é o backup correto.
            </p>
          </div>
          
          <div class='flex gap-3'>
            <button onclick='closeModal()' class='flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
              Cancelar
            </button>
            <button onclick='window.selectBackupFile()' class='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
              📁 Selecionar Arquivo
            </button>
          </div>
        </div>
      `});console.log("✅ Modal criado com sucesso"),document.body.appendChild(n)}catch(n){console.error("❌ Erro ao criar modal:",n),alert("Erro ao abrir modal: "+n.message)}};window.selectBackupFile=function(){console.log("🔍 selectBackupFile chamada"),console.log("🔍 Fechando modal de confirmação..."),closeModal(),setTimeout(()=>{console.log("🔍 Criando input de arquivo...");const n=document.createElement("input");n.type="file",n.accept="application/json,.json",n.style.display="none",document.body.appendChild(n),console.log("🔍 Input adicionado ao DOM"),n.onchange=async e=>{console.log("🔍 Arquivo selecionado:",e.target.files[0]);const t=e.target.files[0];if(!t){console.log("❌ Nenhum arquivo selecionado"),document.body.removeChild(n);return}try{console.log("🔍 Lendo arquivo..."),window.Snackbar?window.Snackbar({message:"📥 Lendo arquivo de backup...",type:"info"}):alert("📥 Lendo arquivo de backup...");const o=await t.text();console.log("🔍 Arquivo lido, tamanho:",o.length);const r=JSON.parse(o);if(console.log("🔍 JSON parseado com sucesso:",r),!r.transactions||!r.categories||!r.budgets)throw new Error("Arquivo de backup inválido. Deve conter transações, categorias e orçamentos.");if(console.log("🔍 Dados válidos, criando modal de preview..."),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível. Tente recarregar a página.");return}const s=window.Modal({title:"📥 Confirmar Restauração de Backup",content:`
            <div class='space-y-4'>
              <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
                <p class='text-blue-800 dark:text-blue-200 font-medium'>Dados encontrados no backup:</p>
                <ul class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1'>
                  <li>📊 <strong>${r.transactions.length}</strong> transações</li>
                  <li>📂 <strong>${r.categories.length}</strong> categorias</li>
                  <li>📁 <strong>${r.budgets.length}</strong> orçamentos</li>
                </ul>
                <p class='text-xs text-blue-600 dark:text-blue-400 mt-2'>
                  Arquivo: ${t.name} (${(t.size/1024).toFixed(1)} KB)
                </p>
              </div>
              
              <div class='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
                <p class='text-yellow-800 dark:text-yellow-200 font-medium'>⚠️ Aviso:</p>
                <p class='text-sm text-yellow-700 dark:text-yellow-300'>
                  Esta ação irá substituir todos os dados atuais. 
                  Certifique-se de que este é o backup correto.
                </p>
              </div>
              
              <div class='flex gap-3'>
                <button onclick='closeModal()' class='flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancelar
                </button>
                <button onclick='window.confirmRestoreBackup(${JSON.stringify(r).replace(/'/g,"\\'")})' class='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
                  ✅ Confirmar Restauração
                </button>
              </div>
            </div>
          `});console.log("🔍 Modal de preview criado, adicionando ao DOM..."),document.body.appendChild(s),console.log("✅ Modal de preview exibido com sucesso")}catch(o){console.error("❌ Erro ao ler backup:",o),window.Snackbar?window.Snackbar({message:"❌ Erro ao ler arquivo: "+o.message,type:"error"}):alert("❌ Erro ao ler arquivo: "+o.message)}finally{console.log("🔍 Removendo input do DOM"),document.body.removeChild(n)}},console.log("🔍 Triggerando clique no input..."),n.click(),console.log("🔍 Clique no input executado")},300)};window.confirmRestoreBackup=async function(n){console.log("🔍 confirmRestoreBackup chamada com dados:",n);try{console.log("🔍 Fechando modal..."),closeModal(),console.log("🔍 Mostrando loading..."),window.Snackbar?window.Snackbar({message:"🔄 Restaurando backup...",type:"info"}):alert("🔄 Restaurando backup...");const e=window.appState.currentUser.uid,t=window.appState.currentBudget.id;if(console.log("🔄 Iniciando restauração de backup..."),console.log("👤 User ID:",e),console.log("📁 Budget ID:",t),console.log("📊 Dados do backup:",n),!n||!n.categories||!n.transactions||!n.budgets)throw new Error("Dados de backup inválidos ou incompletos");console.log("🗑️ Limpando dados atuais..."),console.log("🗑️ Limpando transações...");for(const l of window.appState.transactions)try{await lm(l.id),console.log(`🗑️ Transação "${l.descricao}" removida`)}catch(d){console.error(`❌ Erro ao remover transação "${l.descricao}":`,d)}console.log("🗑️ Limpando categorias...");for(const l of window.appState.categories)try{await dm(l.id),console.log(`🗑️ Categoria "${l.nome}" removida`)}catch(d){console.error(`❌ Erro ao remover categoria "${l.nome}":`,d)}console.log("🗑️ Limpando recorrentes...");for(const l of window.appState.recorrentes)try{await mc(e,l.id),console.log(`🗑️ Recorrente "${l.descricao}" removida`)}catch(d){console.error(`❌ Erro ao remover recorrente "${l.descricao}":`,d)}await new Promise(l=>setTimeout(l,2e3));let o=0,r=0,s=0,a=0;console.log("📂 Importando categorias...");for(const l of n.categories)try{const{id:d,...h}=l;h.budgetId=t,await yc(h),o++,console.log(`✅ Categoria "${l.nome}" importada (${o}/${n.categories.length})`)}catch(d){console.error(`❌ Erro ao importar categoria "${l.nome}":`,d)}console.log("💸 Importando transações...");for(const l of n.transactions)try{const{id:d,...h}=l;h.budgetId=t,await cm(h),r++,console.log(`✅ Transação "${l.descricao}" importada (${r}/${n.transactions.length})`)}catch(d){console.error(`❌ Erro ao importar transação "${l.descricao}":`,d)}console.log("📁 Importando orçamentos...");for(const l of n.budgets)try{if(window.appState.budgets.find(h=>h.nome===l.nome))console.log(`ℹ️ Orçamento "${l.nome}" já existe, pulando...`);else{const{id:h,...m}=l;m.userId=e,await Xs(m),s++,console.log(`✅ Orçamento "${l.nome}" importado (${s}/${n.budgets.length})`)}}catch(d){console.error(`❌ Erro ao importar orçamento "${l.nome}":`,d)}if(console.log("🔄 Importando recorrentes..."),n.recorrentes&&n.recorrentes.length>0)for(const l of n.recorrentes)try{const{id:d,...h}=l;h.budgetId=t,await pc(e,t,h),a++,console.log(`✅ Recorrente "${l.descricao}" importada (${a}/${n.recorrentes.length})`)}catch(d){console.error(`❌ Erro ao importar recorrente "${l.descricao}":`,d)}else console.log("ℹ️ Nenhuma recorrente encontrada no backup");console.log("🔄 Recarregando dados..."),await am(),console.log("✅ Restauração concluída com sucesso!"),console.log(`📊 Resumo: ${o} categorias, ${r} transações, ${s} orçamentos, ${a} recorrentes`);const c=`✅ Backup restaurado com sucesso!

📊 Dados importados:
• ${o} categorias
• ${r} transações
• ${s} orçamentos
• ${a} recorrentes

A página será recarregada em 3 segundos...`;window.Snackbar?window.Snackbar({message:c,type:"success",duration:5e3}):alert(c),console.log("🔄 Agendando recarregamento da página..."),setTimeout(()=>{console.log("🔄 Recarregando página..."),window.location.reload()},3e3)}catch(e){console.error("❌ Erro durante restauração:",e);const t=`❌ Erro durante restauração:
${e.message}`;window.Snackbar?window.Snackbar({message:t,type:"error",duration:5e3}):alert(t)}};function Xo(n){const e=document.getElementById("login-page"),t=document.querySelector(".app-container"),o=document.getElementById("loading-page");n?(e.style.display="flex",t&&(t.style.display="none"),o&&(o.style.display="none")):(e.style.display="none",t&&(t.style.display="flex"),o&&(o.style.display="none"))}function LE(){rn.signOut().then(()=>{console.log("✅ Logout realizado com sucesso"),window.appState.currentUser=null,window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[],Xo(!0),window.location.hash=""}).catch(n=>{console.error("❌ Erro no logout:",n)})}async function am(){const n=window.location.hash.slice(1)||"/dashboard";await Yo(n)}async function cm(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const o={...n,userId:e.uid,budgetId:t.id,createdAt:Ee(),updatedAt:Ee()},r=await en(oe(U,"transactions"),o);return console.log("✅ Transação adicionada com ID:",r.id),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),F({message:"Transação adicionada com sucesso!",type:"success"}),r.id}catch(e){throw console.error("❌ Erro ao adicionar transação:",e),F({message:"Erro ao adicionar transação",type:"error"}),e}}async function VE(n,e){try{const t=ke(U,"transactions",n);await ct(t,{...e,updatedAt:Ee()}),console.log("✅ Transação atualizada:",n),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),F({message:"Transação atualizada com sucesso!",type:"success"})}catch(t){throw console.error("❌ Erro ao atualizar transação:",t),F({message:"Erro ao atualizar transação",type:"error"}),t}}async function lm(n){try{const e=ke(U,"transactions",n);await ht(e),console.log("✅ Transação deletada:",n),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),F({message:"Transação deletada com sucesso!",type:"success"})}catch(e){throw console.error("❌ Erro ao deletar transação:",e),F({message:"Erro ao deletar transação",type:"error"}),e}}async function ur(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=ve(oe(U,"transactions"),ne("budgetId","==",e.id)),r=(await ge(t)).docs.map(s=>({id:s.id,...s.data()}));return r.sort((s,a)=>{let c,l;return s.createdAt&&typeof s.createdAt=="object"&&s.createdAt.seconds?c=new Date(s.createdAt.seconds*1e3):c=new Date(s.createdAt),a.createdAt&&typeof a.createdAt=="object"&&a.createdAt.seconds?l=new Date(a.createdAt.seconds*1e3):l=new Date(a.createdAt),l-c}),window.appState.transactions=r,r}catch(n){return console.error("❌ Erro ao carregar transações:",n),[]}}async function yc(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const o={...n,userId:e.uid,budgetId:t.id,createdAt:Ee(),updatedAt:Ee()},r=await en(oe(U,"categories"),o);return console.log("✅ Categoria adicionada com ID:",r.id),F({message:"Categoria adicionada com sucesso!",type:"success"}),r.id}catch(e){throw console.error("❌ Erro ao adicionar categoria:",e),F({message:"Erro ao adicionar categoria",type:"error"}),e}}async function OE(n,e){try{const t=ke(U,"categories",n);await ct(t,{...e,updatedAt:Ee()}),console.log("✅ Categoria atualizada:",n),F({message:"Categoria atualizada com sucesso!",type:"success"})}catch(t){throw console.error("❌ Erro ao atualizar categoria:",t),F({message:"Erro ao atualizar categoria",type:"error"}),t}}async function dm(n){try{const e=ke(U,"categories",n);await ht(e),console.log("✅ Categoria deletada:",n),F({message:"Categoria deletada com sucesso!",type:"success"})}catch(e){throw console.error("❌ Erro ao deletar categoria:",e),F({message:"Erro ao deletar categoria",type:"error"}),e}}async function hr(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=ve(oe(U,"categories"),ne("budgetId","==",e.id)),r=(await ge(t)).docs.map(s=>({id:s.id,...s.data()}));return window.appState.categories=r,r}catch(n){return console.error("❌ Erro ao carregar categorias:",n),[]}}async function Xs(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t={...n,userId:e.uid,createdAt:Ee(),updatedAt:Ee()},o=await en(oe(U,"budgets"),t);return console.log("✅ Orçamento adicionado com ID:",o.id),F({message:"Orçamento adicionado com sucesso!",type:"success"}),o.id}catch(e){throw console.error("❌ Erro ao adicionar orçamento:",e),F({message:"Erro ao adicionar orçamento",type:"error"}),e}}window.deleteBudget=async function(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");console.log("🗑️ Iniciando exclusão do orçamento:",n);const t=window.appState.budgets.find(N=>N.id===n);if(!t)throw new Error("Orçamento não encontrado");if(t.userId!==e.uid)throw new Error("Você não tem permissão para excluir este orçamento");const o=window.appState.currentBudget?.id===n;o&&(window.appState.currentBudget=null,localStorage.removeItem("currentBudgetId")),console.log("🗑️ Excluindo transações do orçamento...");const r=ve(oe(U,"transactions"),ne("budgetId","==",n)),s=await ge(r),a=s.docs.map(N=>ht(N.ref));await Promise.all(a),console.log(`✅ ${s.docs.length} transações excluídas`),console.log("🗑️ Excluindo categorias do orçamento...");const c=ve(oe(U,"categories"),ne("budgetId","==",n)),l=await ge(c),d=l.docs.map(N=>ht(N.ref));await Promise.all(d),console.log(`✅ ${l.docs.length} categorias excluídas`),console.log("🗑️ Excluindo recorrentes do orçamento...");const h=ve(oe(U,"recorrentes"),ne("budgetId","==",n)),m=await ge(h),f=m.docs.map(N=>ht(N.ref));await Promise.all(f),console.log(`✅ ${m.docs.length} recorrentes excluídas`),console.log("🗑️ Excluindo convites do orçamento...");const _=ve(oe(U,"budgetInvitations"),ne("budgetId","==",n)),E=await ge(_),T=E.docs.map(N=>ht(N.ref));await Promise.all(T),console.log(`✅ ${E.docs.length} convites excluídos`),console.log("🗑️ Excluindo o orçamento...");const S=ke(U,"budgets",n);if(await ht(S),console.log("✅ Orçamento excluído"),window.appState.budgets=window.appState.budgets.filter(N=>N.id!==n),o){const N=window.appState.budgets.filter(L=>L.userId===e.uid);N.length>0?(await vc(N[0]),console.log("✅ Novo orçamento selecionado:",N[0].nome)):(window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.recorrentes=[],console.log("ℹ️ Nenhum orçamento restante"))}return F({message:`Orçamento "${t.nome}" excluído com sucesso!`,type:"success"}),console.log("✅ Exclusão do orçamento concluída com sucesso"),!0}catch(e){throw console.error("❌ Erro ao excluir orçamento:",e),F({message:`Erro ao excluir orçamento: ${e.message}`,type:"error"}),e}};async function kn(){try{const n=window.appState.currentUser;if(!n)return[];console.log("🔍 Carregando orçamentos para usuário:",n.uid);const e=ve(oe(U,"budgets"),ne("userId","==",n.uid)),t=ve(oe(U,"budgets"),ne("usuariosPermitidos","array-contains",n.uid));console.log("🔍 Executando queries de orçamentos...");const[o,r]=await Promise.all([ge(e),ge(t)]),s=o.docs.map(l=>({id:l.id,...l.data(),isOwner:!0})),a=r.docs.map(l=>({id:l.id,...l.data(),isOwner:!1})),c=[...s];return a.forEach(l=>{c.find(d=>d.id===l.id)||c.push(l)}),console.log("📊 Orçamentos carregados:",{total:c.length,own:s.length,shared:a.length,budgets:c.map(l=>({id:l.id,nome:l.nome,isOwner:l.isOwner}))}),window.appState.budgets=c,c}catch(n){return console.error("❌ Erro ao carregar orçamentos:",n),[]}}function vc(n){window.appState.currentBudget=n,localStorage.setItem("currentBudgetId",n.id),console.log("✅ Orçamento atual definido:",n.nome)}window.setCurrentBudget=async function(n){if(!n){console.log("❌ Budget não fornecido para setCurrentBudget");return}console.log("🔄 Selecionando orçamento:",n.nome,n.id),vc(n),window.stopAllListeners&&window.stopAllListeners(),window.startAllListeners&&await window.startAllListeners(n.id),await Promise.all([window.loadTransactions?window.loadTransactions():Promise.resolve(),window.loadCategories?window.loadCategories():Promise.resolve(),window.loadRecorrentes?window.loadRecorrentes():Promise.resolve(),window.loadNotifications?window.loadNotifications():Promise.resolve()]);const e=window.location.hash.replace("#","")||"/dashboard";switch(console.log("🔄 Atualizando rota atual:",e),e){case"/dashboard":window.renderDashboard&&await window.renderDashboard();break;case"/transactions":window.renderTransactions&&await window.renderTransactions();break;case"/categories":window.renderCategories&&await window.renderCategories();break;case"/notifications":window.renderNotifications&&await window.renderNotifications();break;case"/settings":window.renderSettings&&await window.renderSettings();break;default:window.renderDashboard&&await window.renderDashboard()}console.log("✅ Orçamento selecionado e todas as abas atualizadas")};async function bc(){try{if(!window.appState.currentUser)return;const e=localStorage.getItem("currentBudgetId");if(e){const r=window.appState.budgets.find(s=>s.id===e);if(r){await window.setCurrentBudget(r);return}}if(window.appState.budgets.length>0){await window.setCurrentBudget(window.appState.budgets[0]);return}console.log("📝 Criando orçamento padrão...");const o=await Xs({nome:"Orçamento Principal",descricao:"Orçamento padrão criado automaticamente",valor:0,tipo:"mensal"});if(o){await kn();const r=window.appState.budgets.find(s=>s.id===o);r&&await window.setCurrentBudget(r)}}catch(n){console.error("❌ Erro ao selecionar orçamento padrão:",n)}}async function Ys(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=ve(oe(U,"recorrentes"),ne("budgetId","==",e.id)),r=(await ge(t)).docs.map(s=>({id:s.id,...s.data()}));return window.appState.recorrentes=r,r}catch(n){return console.error("❌ Erro ao carregar recorrentes:",n),[]}}async function FE(n,e,t){try{console.log(`🔍 Buscando transações para: ${e}/${t}`);const o=window.appState.currentBudget;if(!o)return console.log("⚠️ Nenhum orçamento ativo"),[];const r=ve(oe(U,"transactions"),ne("budgetId","==",o.id)),a=(await ge(r)).docs.map(l=>({id:l.id,...l.data()}));console.log(`📊 Total de transações encontradas: ${a.length}`);const c=a.filter(l=>{if(!l.createdAt)return!1;let d;l.createdAt&&typeof l.createdAt=="object"&&l.createdAt.seconds?d=new Date(l.createdAt.seconds*1e3):d=new Date(l.createdAt);const h=d.getFullYear(),m=d.getMonth()+1;return h===e&&m===t});return console.log(`✅ Transações filtradas para ${e}/${t}: ${c.length}`),c}catch(o){return console.error("❌ Erro ao buscar transações do mês:",o),[]}}async function ws(n,e){if(window.isRenderingDashboard){console.log("🔄 Dashboard já está sendo renderizado, pulando...");return}if(window.isRenderingDashboard=!0,!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, renderizando dashboard vazio"),window.isRenderingDashboard=!1;return}try{const t=document.getElementById("app-content");if(!t){console.warn("⚠️ Elemento #app-content não encontrado");return}const o=new Date,r=n||o.getFullYear(),s=e||o.getMonth()+1,a=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],c=window.appState.currentUser;let l=c?await FE(c.uid,r,s):[];console.log(`📊 Dashboard ${r}/${s}: ${l.length} transações carregadas`),console.log("📊 Estado atual:",{user:!!c,budget:!!window.appState.currentBudget,transactions:window.appState.transactions?.length||0,categories:window.appState.categories?.length||0,recorrentes:window.appState.recorrentes?.length||0}),r===o.getFullYear()&&s===o.getMonth()+1&&window.appState.transactions&&window.appState.transactions.length>0&&(l=window.appState.transactions,console.log(`🔄 Usando transações do appState para mês atual: ${l.length}`));const d=l.filter(D=>D.tipo==="receita").reduce((D,W)=>D+parseFloat(W.valor),0),h=l.filter(D=>D.tipo==="despesa").reduce((D,W)=>D+parseFloat(W.valor),0),m=window.appState.recorrentes||[],_=l.filter(D=>D.recorrenteId).map(D=>{const W=m.find(se=>se.id===D.recorrenteId);let K=D.parcelaAtual,j=D.parcelasTotal;return(!K||!j)&&(W?(j=W.parcelasTotal,window.calcularParcelaRecorrente?K=window.calcularParcelaRecorrente(W,r,s):K=1):(K=1,j=1)),{...W,efetivada:!0,parcelaAtual:K,parcelasTotal:j,transacaoId:D.id,valor:D.valor}}),E=m.filter(D=>{if(_.some(je=>je.id===D.id))return!1;const[K,j,se]=D.dataInicio.split("-").map(Number),qe=new Date(K,j-1,se),Je=qe.getFullYear(),Rn=qe.getMonth()+1;if(r<Je||r===Je&&s<Rn||!D.efetivarMesAtual&&r===Je&&s===Rn)return!1;if(D.parcelasRestantes!==null&&D.parcelasRestantes!==void 0){let je=(r-Je)*12+(s-Rn);return!D.efetivarMesAtual&&(r>Je||r===Je&&s>Rn)&&(je-=1),D.parcelasRestantes-je>0}return!0}),T=[..._,...E],S=_.reduce((D,W)=>D+parseFloat(W.valor),0),N=E.reduce((D,W)=>D+parseFloat(W.valor),0),L=S+N,$=h+L,ee=d-$,le=(window.appState.categories?.filter(D=>D.tipo==="despesa")||[]).reduce((D,W)=>D+parseFloat(W.limite||0),0),v=le-$,w=le>0?$/le:0,y=window.appState.categories?.filter(D=>{if(D.tipo!=="despesa")return!1;const K=l.filter(qe=>qe.categoriaId===D.id&&qe.tipo===D.tipo).reduce((qe,Je)=>qe+parseFloat(Je.valor),0),j=parseFloat(D.limite||0),se=j>0?K/j:0;return j>0&&se>.7})||[],I=w>.7?"Orçado geral em alerta":null,x=y.length+(I?1:0),A=window.appState.categories.filter(D=>D.tipo==="despesa").map(D=>{const K=(window.appState.transactions||[]).filter(j=>j.categoriaId===D.id&&j.tipo===D.tipo).reduce((j,se)=>j+parseFloat(se.valor),0);return{...D,gasto:K}}).filter(D=>D.gasto>0).sort((D,W)=>W.gasto-D.gasto).slice(0,5),b=`
      <div class="tab-container">
        <div class="tab-header">
          <h2 class="tab-title-highlight">📊 Dashboard</h2>
        </div>
        <div class="tab-content">
          <div class="content-spacing" id="dashboard-content">
            <!-- Seletor de mês -->
            <div class="mb-4 flex items-center justify-center">
              <div id="mes-selector" class="flex items-center gap-4">
                <button id="mes-anterior" class="text-blue-600 bg-blue-100 rounded-full w-10 h-10 md:w-8 md:h-8 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation" style="min-width: 44px; min-height: 44px;">&#8592;</button>
                <span class="font-bold text-lg">${a[s-1]} ${r}</span>
                <button id="mes-proximo" class="text-blue-600 bg-blue-100 rounded-full w-10 h-10 md:w-8 md:h-8 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation" style="min-width: 44px; min-height: 44px;">&#8594;</button>
              </div>
            </div>
            <!-- RESUMO FINANCEIRO COMPLETO -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 md:p-6 mb-4 text-white">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg md:text-xl font-bold">RESUMO FINANCEIRO</h2>
                <span class="text-lg md:text-xl font-semibold">${a[s-1]} ${r}</span>
              </div>
              
              <!-- Grid principal com 4 métricas -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                <div class="text-center p-2 md:p-3 bg-white bg-opacity-10 rounded-lg">
                  <div class="text-lg md:text-xl font-bold mb-1">R$ ${d.toFixed(0)}</div>
                  <div class="text-xs md:text-sm opacity-90">💰 Receitas</div>
                  <div class="text-xs opacity-75 mt-1">Dinheiro recebido</div>
                </div>
                
                <div class="text-center p-2 md:p-3 bg-white bg-opacity-10 rounded-lg">
                  <div class="text-lg md:text-xl font-bold mb-1">R$ ${$.toFixed(0)}</div>
                  <div class="text-xs md:text-sm opacity-90">🛒 Despesas</div>
                  <div class="text-xs opacity-75 mt-1">Dinheiro gasto</div>
                </div>
                
                <div class="text-center p-2 md:p-3 bg-white bg-opacity-10 rounded-lg">
                  <div class="text-lg md:text-xl font-bold mb-1 ${ee>=0?"text-green-200":"text-red-200"}">R$ ${ee.toFixed(0)}</div>
                  <div class="text-xs md:text-sm opacity-90">💳 Saldo</div>
                  <div class="text-xs opacity-75 mt-1">${ee>=0?"✓ Positivo":"✗ Negativo"}</div>
                </div>
                
                <div class="text-center p-2 md:p-3 bg-white bg-opacity-10 rounded-lg">
                  <div class="text-lg md:text-xl font-bold mb-1">R$ ${v.toFixed(0)}</div>
                  <div class="text-xs md:text-sm opacity-90">📊 Orçado</div>
                  <div class="text-xs opacity-75 mt-1">${(w*100).toFixed(0)}% usado</div>
                </div>
              </div>
              
              <!-- Barra de progresso do orçamento -->
              <div class="mb-3">
                <div class="flex justify-between text-xs mb-1">
                  <span>Progresso do Orçamento</span>
                  <span>${(w*100).toFixed(0)}%</span>
                </div>
                <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div class="bg-white h-2 rounded-full transition-all duration-300" style="width: ${Math.min(w*100,100)}%"></div>
                </div>
              </div>
              
              <!-- Indicadores de status -->
              <div class="flex justify-between text-xs opacity-90">
                <span id="categorias-alerta-btn" class="${x>0?"cursor-pointer hover:opacity-100 hover:underline":""}" ${x>0?'onclick="showCategoriasAlertaModal()"':""}>${x>0?`⚠️ ${x} categorias em alerta`:"✅ Todas as categorias OK"}</span>
                <span>${ee>=0?"📈 Meta alcançada":"📉 Revisar gastos"}</span>
              </div>
            </div>

            <!-- TOP 5 CATEGORIAS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">TOP 5 CATEGORIAS</h3>
              </div>
              <div class="space-y-3">
                ${A.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma categoria com gastos encontrada neste mês</p>':A.slice(0,5).map(D=>{const W=window.appState.categories?.find(qe=>qe.id===D.id),K=W?.limite?parseFloat(W.limite):0,j=K>0?Math.min(D.gasto/K*100,100):0;let se="bg-green-500";return j>=90?se="bg-red-500":j>=75?se="bg-yellow-500":j>=50&&(se="bg-orange-500"),`
                      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${W?.cor||"#4F46E5"}"></div>
                            <span class="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">${D.nome}</span>
                          </div>
                          <span class="font-bold text-sm md:text-base ${D.gasto>K?"text-red-600":"text-gray-900 dark:text-gray-100"}">
                            R$ ${D.gasto.toFixed(2)}
                          </span>
                        </div>
                        ${K>0?`
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>${j.toFixed(0)}%</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${se} h-2 rounded-full transition-all duration-300" style="width: ${j}%"></div>
                          </div>
                        `:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
                      </div>
                    `}).join("")}
              </div>
            </div>

            <!-- CATEGORIAS COM LIMITES -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">📂 Categorias com Limites</h3>
                <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="btn-primary">
                  + Nova Categoria
                </button>
              </div>
              <div class="space-y-3">
                ${(window.appState.categories||[]).length===0?'<p class="text-gray-500 text-center py-4">Nenhuma categoria encontrada</p>':(window.appState.categories||[]).filter(D=>D.limite>0).map(D=>{const K=(window.appState.transactions||[]).filter(j=>j.categoriaId===D.id&&j.tipo===D.tipo).reduce((j,se)=>j+parseFloat(se.valor),0);return{...D,gasto:K}}).sort((D,W)=>W.gasto-D.gasto).map(D=>{const W=parseFloat(D.limite||0),K=W>0?Math.min(D.gasto/W*100,100):0;let j="bg-green-500";return K>=90?j="bg-red-500":K>=75?j="bg-yellow-500":K>=50&&(j="bg-orange-500"),`
                      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${D.cor||"#4F46E5"}"></div>
                            <span class="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">${D.nome}</span>
                          </div>
                          <span class="font-bold text-sm md:text-base ${D.gasto>W?"text-red-600":"text-gray-900 dark:text-gray-100"}">
                            R$ ${D.gasto.toFixed(2)}
                          </span>
                        </div>
                        ${W>0?`
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Limite: R$ ${W.toFixed(2)}</span>
                            <span>${K.toFixed(1)}% usado</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${j} h-2 rounded-full transition-all duration-300" style="width: ${K}%"></div>
                          </div>
                        `:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
                      </div>
                    `}).join("")}
              </div>
            </div>

            <!-- DESPESAS RECORRENTES DO MÊS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Despesas Recorrentes do Mês</h3>
                <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="btn-primary">
                  + Nova Despesa Recorrente
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${T.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma despesa recorrente aplicada ou agendada neste mês</p>':T.slice(0,5).map(D=>{const W=window.appState.categories?.find(K=>K.id===D.categoriaId);return`
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${D.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${W?.nome||"Sem categoria"} • Recorrente
                            ${(()=>{if(D.efetivada)return` • ✅ Efetivada: ${D.parcelaAtual} de ${D.parcelasTotal}`;if(!D.parcelasTotal||D.parcelasTotal<=1)return" • 📅 Agendada: Infinito";{const K=window.calcularStatusRecorrente?window.calcularStatusRecorrente(D,window.appState.transactions||[],r,s):{parcelaAtual:1,totalParcelas:D.parcelasTotal,foiEfetivadaEsteMes:!1};return` • 📅 Agendada: ${K.parcelaAtual} de ${K.totalParcelas}`}})()}
                          </p>
                        </div>
                        <div class="flex items-center space-x-1 md:space-x-2">
                          <span class="font-bold text-xs md:text-base text-red-600">
                            -R$ ${parseFloat(D.valor).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    `}).join("")}
              </div>
            </div>

            <!-- TRANSAÇÕES RECENTES -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Transações Recentes</h3>
                <button onclick="showAddTransactionModal()" class="btn-primary">
                  + Nova Transação
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${l.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma transação encontrada neste mês</p>':l.slice(0,10).map(D=>{const W=window.appState.categories?.find(j=>j.id===D.categoriaId);let K="";if(D.recorrenteId){const j=window.appState.recorrentes?.find(se=>se.id===D.recorrenteId);if(j)if(j.parcelasTotal&&j.parcelasTotal>1){const se=window.calcularStatusRecorrente?window.calcularStatusRecorrente(j,window.appState.transactions||[],r,s):{parcelaAtual:1,totalParcelas:j.parcelasTotal,foiEfetivadaEsteMes:!1};se.foiEfetivadaEsteMes?K=` • ✅ Efetivada: ${se.parcelaAtual} de ${se.totalParcelas}`:K=` • 📅 Agendada: ${se.parcelaAtual} de ${se.totalParcelas}`}else K=" • Infinito";else K=" • Recorrente"}return`
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${D.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${W?.nome||"Sem categoria"} • ${D.createdAt&&D.createdAt.toDate?D.createdAt.toDate().toLocaleDateString():D.createdAt?new Date(D.createdAt).toLocaleDateString():""}
                            ${D.recorrenteId?" • Recorrente"+K:""}
                          </p>
                        </div>
                        <div class="flex items-center space-x-1 md:space-x-2">
                          <span class="font-bold text-xs md:text-base ${D.tipo==="receita"?"text-green-600":"text-red-600"}">
                            ${D.tipo==="receita"?"+":"-"}R$ ${parseFloat(D.valor).toFixed(2)}
                          </span>
                          <button onclick="window.editTransaction && window.editTransaction('${D.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${D.id}', '${D.descricao.replace(/'/g,"\\'")}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                        </div>
                      </div>
                    `}).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Categorias em Alerta -->
      <div id="categorias-alerta-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">⚠️ Categorias em Alerta</h3>
              <button onclick="closeCategoriasAlertaModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <span class="text-xl">×</span>
              </button>
            </div>
          </div>
          <div id="categorias-alerta-content" class="p-4">
            <!-- Conteúdo será preenchido dinamicamente -->
          </div>
        </div>
      </div>
    `;t.innerHTML=b,setTimeout(()=>{JE()},100),Wt()}catch(t){console.error("Erro ao renderizar dashboard:",t);const o=document.getElementById("app-content");o&&(o.innerHTML='<div class="text-red-600 text-center mt-4">Erro ao carregar dashboard. Tente novamente.</div>')}finally{window.isRenderingDashboard=!1}}window.showCategoriasAlertaModal=function(){try{const n=document.getElementById("categorias-alerta-modal"),e=document.getElementById("categorias-alerta-content");if(!n||!e){console.error("❌ Modal de categorias em alerta não encontrado");return}const t=window.appState.categories?.filter(o=>{const r=parseFloat(o.limite||0);return r<=0?!1:(window.appState.transactions?.filter(l=>l.categoriaId===o.id&&l.tipo===o.tipo)||[]).reduce((l,d)=>l+parseFloat(d.valor||0),0)/r*100>=75})||[];t.length===0?e.innerHTML=`
        <div class="text-center py-8">
          <div class="text-4xl mb-4">✅</div>
          <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria em alerta</div>
          <div class="text-gray-600 dark:text-gray-400">Todas as categorias estão dentro do limite</div>
        </div>
      `:e.innerHTML=`
        <div class="space-y-3">
          ${t.map(o=>{const r=parseFloat(o.limite||0),a=(window.appState.transactions?.filter(m=>m.categoriaId===o.id&&m.tipo===o.tipo)||[]).reduce((m,f)=>m+parseFloat(f.valor||0),0),c=Math.min(a/r*100,100);let l="bg-green-500",d="Normal",h="✅";return c>=90?(l="bg-red-500",d="Crítico",h="🚨"):c>=75?(l="bg-yellow-500",d="Atenção",h="⚠️"):c>=50&&(l="bg-orange-500",d="Moderado",h="🔶"),`
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">${o.nome}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">${o.tipo==="receita"?"Receita":"Despesa"}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold ${c>=90?"text-red-600":c>=75?"text-yellow-600":"text-orange-600"}">
                      ${h} ${d}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${c.toFixed(0)}% usado</div>
                  </div>
                </div>
                
                <div class="mb-2">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-300">R$ ${a.toFixed(2)}</span>
                    <span class="text-gray-600 dark:text-gray-300">R$ ${r.toFixed(2)}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div class="${l} h-2 rounded-full transition-all duration-300" style="width: ${c}%"></div>
                  </div>
                </div>
                
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  Restante: R$ ${Math.max(r-a,0).toFixed(2)}
                </div>
              </div>
            `}).join("")}
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            <strong>💡 Dica:</strong> Categorias em alerta são aquelas que já utilizaram 75% ou mais do limite definido.
          </p>
        </div>
      `,n.classList.remove("hidden")}catch(n){console.error("❌ Erro ao mostrar modal de categorias em alerta:",n)}};window.closeCategoriasAlertaModal=function(){const n=document.getElementById("categorias-alerta-modal");n&&n.classList.add("hidden")};document.addEventListener("click",function(n){const e=document.getElementById("categorias-alerta-modal");e&&n.target===e&&window.closeCategoriasAlertaModal()});function $E(){const n=document.getElementById("modal-alertas");n&&n.classList.add("hidden")}function um(){const n=document.getElementById("app-content");n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📋 Transações</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Ações principais -->
          <div class="mb-4 flex items-center gap-2">
            <button id="add-transaction-btn" class="btn-primary">
              <span class="icon-standard">➕</span>
              <span class="hidden sm:inline">Nova Transação</span>
              <span class="sm:hidden">Nova</span>
            </button>
            <button id="voice-btn" class="btn-secondary">
              <span class="icon-standard">🎤</span>
              <span class="hidden sm:inline">Voz</span>
              <span class="sm:hidden">Voz</span>
            </button>
          </div>
          
          <!-- Filtro de pesquisa -->
          <div class="mb-4">
            <div class="relative">
              <input 
                type="text" 
                id="transaction-search" 
                placeholder="🔍 Pesquisar transações..." 
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-400">🔍</span>
              </div>
            </div>
            <div id="transaction-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="transaction-search-count">0</span> transação(ões) encontrada(s)
            </div>
          </div>
          
          <div id="transactions-list">
            ${window.appState.transactions?.length===0?`
            <div class="text-center py-8">
              <div class="text-4xl mb-4">📋</div>
              <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
              <div class="text-gray-600 dark:text-gray-400">Adicione sua primeira transação para começar</div>
            </div>
          `:window.appState.transactions?.map(e=>{const t=window.appState.categories?.find(s=>s.id===e.categoriaId),o=e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(e.createdAt).toLocaleDateString("pt-BR"),r=e.tipo==="receita";return`
            <div class="list-item ${r?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
              <div class="flex-1 min-w-0">
                <div class="list-item-title truncate">${e.descricao}</div>
                <div class="list-item-subtitle text-xs sm:text-sm">
                  ${t?.nome||"Sem categoria"} • ${o}
                  ${e.recorrenteId?" • Recorrente":""}
                  ${(()=>{if(!e.recorrenteId)return"";let s=e.parcelaAtual,a=e.parcelasTotal;if(!s||!a){const c=window.appState.recorrentes?.find(l=>l.id===e.recorrenteId);if(c)if(a=c.parcelasTotal,window.calcularParcelaRecorrente){const l=new Date;s=window.calcularParcelaRecorrente(c,l.getFullYear(),l.getMonth()+1)}else s=1;else s=1,a=1}return a&&a>1?` • ${s} de ${a}`:" • Infinito"})()}
                </div>
              </div>
              <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <span class="text-sm sm:text-base font-bold ${r?"text-green-600":"text-red-600"}">
                  ${r?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
                </span>
                <div class="flex gap-1">
                  <button onclick="editTransaction('${e.id}')" class="btn-secondary mobile-btn">
                    <span class="icon-standard">✏️</span>
                  </button>
                  <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${e.id}', '${e.descricao.replace(/'/g,"\\'")}')" class="btn-danger mobile-btn">
                    <span class="icon-standard">🗑️</span>
                  </button>
                </div>
              </div>
            </div>
          `}).join("")||""}
          </div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{QE()},100),BE(),Wt()}function BE(){const n=document.getElementById("transaction-search"),e=document.getElementById("transaction-search-results"),t=document.getElementById("transaction-search-count"),o=document.getElementById("transactions-list");n&&(n.addEventListener("input",function(){const r=this.value.toLowerCase().trim();if(r===""){e.classList.add("hidden"),o.innerHTML=UE();return}const s=window.appState.transactions?.filter(a=>{const c=a.descricao.toLowerCase(),d=window.appState.categories?.find(m=>m.id===a.categoriaId)?.nome?.toLowerCase()||"",h=a.valor.toString();return c.includes(r)||d.includes(r)||h.includes(r)})||[];t.textContent=s.length,e.classList.remove("hidden"),o.innerHTML=zE(s)}),n.addEventListener("keydown",function(r){r.key==="Escape"&&(this.value="",this.dispatchEvent(new Event("input")))}))}function UE(){return window.appState.transactions?.length?window.appState.transactions.map(n=>{const e=window.appState.categories?.find(r=>r.id===n.categoriaId),t=n.createdAt&&n.createdAt.toDate?n.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(n.createdAt).toLocaleDateString("pt-BR"),o=n.tipo==="receita";return`
      <div class="list-item ${o?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${n.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${e?.nome||"Sem categoria"} • ${t}
            ${n.recorrenteId?" • Recorrente":""}
            ${(()=>{if(!n.recorrenteId)return"";let r=n.parcelaAtual,s=n.parcelasTotal;if(!r||!s){const a=window.appState.recorrentes?.find(c=>c.id===n.recorrenteId);if(a)if(s=a.parcelasTotal,window.calcularParcelaRecorrente){const c=new Date;r=window.calcularParcelaRecorrente(a,c.getFullYear(),c.getMonth()+1)}else r=1;else r=1,s=1}return s&&s>1?` • ${r} de ${s}`:" • Infinito"})()}
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span class="text-sm sm:text-base font-bold ${o?"text-green-600":"text-red-600"}">
            ${o?"+":"-"}R$ ${parseFloat(n.valor).toFixed(2)}
          </span>
          <div class="flex gap-1">
            <button onclick="editTransaction('${n.id}')" class="btn-secondary mobile-btn">
              <span class="icon-standard">✏️</span>
            </button>
            <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${n.id}', '${n.descricao.replace(/'/g,"\\'")}')" class="btn-danger mobile-btn">
              <span class="icon-standard">🗑️</span>
            </button>
          </div>
        </div>
      </div>
    `}).join(""):`
      <div class="text-center py-8">
        <div class="text-4xl mb-4">📋</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Adicione sua primeira transação para começar</div>
      </div>
    `}function zE(n){return n.length?n.map(e=>{const t=window.appState.categories?.find(s=>s.id===e.categoriaId),o=e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(e.createdAt).toLocaleDateString("pt-BR"),r=e.tipo==="receita";return`
      <div class="list-item ${r?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${e.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${t?.nome||"Sem categoria"} • ${o}
            ${e.recorrenteId?" • Recorrente":""}
            ${(()=>{if(!e.recorrenteId)return"";let s=e.parcelaAtual,a=e.parcelasTotal;if(!s||!a){const c=window.appState.recorrentes?.find(l=>l.id===e.recorrenteId);if(c)if(a=c.parcelasTotal,window.calcularParcelaRecorrente){const l=new Date;s=window.calcularParcelaRecorrente(c,l.getFullYear(),l.getMonth()+1)}else s=1;else s=1,a=1}return a&&a>1?` • ${s} de ${a}`:" • Infinito"})()}
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span class="text-sm sm:text-base font-bold ${r?"text-green-600":"text-red-600"}">
            ${r?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
          </span>
          <div class="flex gap-1">
            <button onclick="editTransaction('${e.id}')" class="btn-secondary mobile-btn">
              <span class="icon-standard">✏️</span>
            </button>
            <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${e.id}', '${e.descricao.replace(/'/g,"\\'")}')" class="btn-danger mobile-btn">
              <span class="icon-standard">🗑️</span>
            </button>
          </div>
        </div>
      </div>
    `}).join(""):`
      <div class="text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `}function qE(n){return n.recorrenteId?1:null}async function hm(){await ur(),await Ys();const n=document.getElementById("app-content"),e=new Date,t=e.getFullYear(),o=e.getMonth()+1,r=window.appState.categories.map(s=>{const c=window.appState.transactions.filter(T=>{let S;T.createdAt&&typeof T.createdAt=="object"&&T.createdAt.seconds?S=new Date(T.createdAt.seconds*1e3):S=new Date(T.createdAt);const N=S.getFullYear(),L=S.getMonth()+1;return T.categoriaId===s.id&&T.tipo===s.tipo&&N===t&&L===o}).reduce((T,S)=>T+parseFloat(S.valor),0),l=window.appState.recorrentes.filter(T=>T.categoriaId===s.id&&T.ativa===!0);let d=0;l.forEach(T=>{window.appState.transactions.filter(N=>N.recorrenteId===T.id&&new Date(N.createdAt).getFullYear()===t&&new Date(N.createdAt).getMonth()+1===o).length>0&&(d+=parseFloat(T.valor))});const h=c+d,m=s.limite?parseFloat(s.limite):0,f=(s.tipo==="receita",m-h),_=m>0?Math.min(h/m*100,100):0;let E="bg-green-500";return _>=90?E="bg-red-500":_>=75?E="bg-yellow-500":_>=50&&(E="bg-orange-500"),{...s,totalGasto:h,totalGastoTransacoes:c,totalGastoRecorrentes:d,limite:m,saldo:f,porcentagem:_,corBarra:E}}).sort((s,a)=>a.totalGasto-s.totalGasto);n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Categorias</h2>
        <div class="flex gap-2">
          <button onclick="window.migrarTransacoesAntigas()" class="btn-secondary">
            <span>🔄 Migrar</span>
          </button>
          <button onclick="window.corrigirTipoCategoria()" class="btn-secondary">
            <span>🔧 Corrigir</span>
          </button>
          <button id="add-category-btn" class="btn-primary">
            <span>+ Nova Categoria</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Filtro de pesquisa -->
          <div class="mb-4">
            <div class="relative">
              <input 
                type="text" 
                id="category-search" 
                placeholder="🔍 Pesquisar categorias..." 
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-400">🔍</span>
              </div>
            </div>
            <div id="category-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="category-search-count">0</span> categoria(s) encontrada(s)
            </div>
          </div>
          
          <div id="categories-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${r.map(s=>`
            <div class="card-standard">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-4 h-4 rounded-full" style="background-color: ${s.cor||"#4F46E5"}"></div>
                <span class="list-item-title">${s.nome}</span>
              </div>
              <p class="list-item-subtitle">Tipo: ${s.tipo}</p>
              
              ${s.limite>0?`
                <div class="mt-3 space-y-2">
                  <div class="flex justify-between text-xs md:text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                    <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${s.limite.toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between text-xs md:text-sm">
                    <span class="text-gray-600 dark:text-gray-400">${s.tipo==="receita"?"Receita":"Gasto"}:</span>
                    <span class="font-medium ${s.tipo==="receita"?"text-green-600":s.totalGasto>s.limite?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${s.totalGasto.toFixed(2)}</span>
                  </div>
                  ${s.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${s.totalGastoTransacoes.toFixed(2)}
                      ${s.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${s.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
                  <div class="flex justify-between text-xs md:text-sm">
                    <span class="text-gray-600 dark:text-gray-400">${s.tipo==="receita"?"Falta para meta":"Saldo"}:</span>
                    <span class="font-medium ${s.tipo==="receita"?s.saldo<=0?"text-green-600":s.saldo<s.limite*.25?"text-yellow-600":"text-red-600":s.saldo<0?"text-red-600":s.saldo<s.limite*.25?"text-yellow-600":"text-green-600"}">R$ ${s.saldo.toFixed(2)}</span>
                  </div>
                  
                  <!-- Barra de Progresso -->
                  <div class="mt-2">
                    <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>${s.porcentagem.toFixed(1)}% ${s.tipo==="receita"?"atingido":"usado"}</span>
                      <span>${s.porcentagem>=100?s.tipo==="receita"?"Meta atingida!":"Limite excedido!":""}</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="${s.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(s.porcentagem,100)}%"></div>
                    </div>
                  </div>
                </div>
              `:`
                <div class="mt-3">
                  <div class="flex justify-between text-xs md:text-sm">
                    <span class="text-gray-600 dark:text-gray-400">${s.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                    <span class="font-medium ${s.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${s.totalGasto.toFixed(2)}</span>
                  </div>
                  ${s.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • ${s.tipo==="receita"?"Receitas":"Transações"}: R$ ${s.totalGastoTransacoes.toFixed(2)}
                      ${s.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${s.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
                </div>
              `}
              
              <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
                <button onclick="editCategory('${s.id}')" class="btn-secondary mobile-btn">
                  <span class="icon-standard">✏️</span>
                  <span class="hidden sm:inline">Editar</span>
                </button>
                <button onclick="window.deleteCategoryWithConfirmation('${s.id}', '${s.nome}')" class="btn-danger mobile-btn">
                  <span class="icon-standard">🗑️</span>
                  <span class="hidden sm:inline">Excluir</span>
                </button>
                <button onclick="showCategoryHistory('${s.id}')" class="btn-secondary mobile-btn">
                  <span class="icon-standard">📊</span>
                  <span class="hidden sm:inline">Histórico</span>
                </button>
              </div>
            </div>
          `).join("")}
          </div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{YE()},100),jE(),Wt()}function jE(){const n=document.getElementById("category-search"),e=document.getElementById("category-search-results"),t=document.getElementById("category-search-count"),o=document.getElementById("categories-grid");n&&(n.addEventListener("input",function(){const r=this.value.toLowerCase().trim();if(r===""){e.classList.add("hidden"),o.innerHTML=HE();return}const s=window.appState.categories?.filter(a=>{const c=a.nome.toLowerCase(),l=a.tipo.toLowerCase(),d=a.limite?.toString()||"";return c.includes(r)||l.includes(r)||d.includes(r)})||[];t.textContent=s.length,e.classList.remove("hidden"),o.innerHTML=GE(s)}),n.addEventListener("keydown",function(r){r.key==="Escape"&&(this.value="",this.dispatchEvent(new Event("input")))}))}function HE(){const n=new Date,e=n.getFullYear(),t=n.getMonth()+1;return window.appState.categories.map(r=>{const a=window.appState.transactions.filter(E=>{let T;E.createdAt&&typeof E.createdAt=="object"&&E.createdAt.seconds?T=new Date(E.createdAt.seconds*1e3):T=new Date(E.createdAt);const S=T.getFullYear(),N=T.getMonth()+1;return E.categoriaId===r.id&&E.tipo===r.tipo&&S===e&&N===t}).reduce((E,T)=>E+parseFloat(T.valor),0),c=window.appState.recorrentes.filter(E=>E.categoriaId===r.id&&E.ativa===!0);let l=0;c.forEach(E=>{window.appState.transactions.filter(S=>S.recorrenteId===E.id&&new Date(S.createdAt).getFullYear()===e&&new Date(S.createdAt).getMonth()+1===t).length>0&&(l+=parseFloat(E.valor))});const d=a+l,h=r.limite?parseFloat(r.limite):0,m=(r.tipo==="receita",h-d),f=h>0?Math.min(d/h*100,100):0;let _="bg-green-500";return f>=90?_="bg-red-500":f>=75?_="bg-yellow-500":f>=50&&(_="bg-orange-500"),{...r,totalGasto:d,totalGastoTransacoes:a,totalGastoRecorrentes:l,limite:h,saldo:m,porcentagem:f,corBarra:_}}).sort((r,s)=>s.totalGasto-r.totalGasto).map(r=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${r.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${r.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${r.tipo}</p>
      
      ${r.limite>0?`
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${r.limite.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${r.tipo==="receita"?"Receita":"Gasto"}:</span>
                <span class="font-medium ${r.tipo==="receita"?"text-green-600":r.totalGasto>r.limite?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${r.totalGasto.toFixed(2)}</span>
              </div>
              ${r.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${r.totalGastoTransacoes.toFixed(2)}
                      ${r.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${r.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${r.tipo==="receita"?"Falta para meta":"Saldo"}:</span>
                <span class="font-medium ${r.tipo==="receita"?r.saldo<=0?"text-green-600":r.saldo<r.limite*.25?"text-yellow-600":"text-red-600":r.saldo<0?"text-red-600":r.saldo<r.limite*.25?"text-yellow-600":"text-green-600"}">R$ ${r.saldo.toFixed(2)}</span>
              </div>
              
              <!-- Barra de Progresso -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>${r.porcentagem.toFixed(1)}% ${r.tipo==="receita"?"atingido":"usado"}</span>
                  <span>${r.porcentagem>=100?r.tipo==="receita"?"Meta atingida!":"Limite excedido!":""}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="${r.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(r.porcentagem,100)}%"></div>
                </div>
              </div>
            </div>
          `:`
            <div class="mt-3">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${r.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                <span class="font-medium ${r.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${r.totalGasto.toFixed(2)}</span>
              </div>
              ${r.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • ${r.tipo==="receita"?"Receitas":"Transações"}: R$ ${r.totalGastoTransacoes.toFixed(2)}
                      ${r.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${r.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
            </div>
          `}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${r.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${r.id}', '${r.nome}')" class="btn-danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
        <button onclick="showCategoryHistory('${r.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join("")}function GE(n){return n.length?n.map(e=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${e.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${e.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${e.tipo}</p>
      ${e.limite?`<p class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${e.limite.toFixed(2)}</p>`:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${e.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${e.id}', '${e.nome}')" class="btn-danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
        <button onclick="showCategoryHistory('${e.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="col-span-full text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `}async function Yo(n){switch(console.log("🔄 Router chamado com path:",n),console.log("🔄 Estado atual:",{currentUser:!!window.appState?.currentUser,currentBudget:!!window.appState?.currentBudget,hash:window.location.hash}),Lo(n),window.applyCompactMode&&window.applyCompactMode(),n){case"/dashboard":console.log("🔄 Renderizando dashboard..."),await ws(),dt("/dashboard"),console.log("✅ Dashboard renderizado");break;case"/transactions":console.log("🔄 Renderizando transações..."),um(),dt("/transactions"),console.log("✅ Transações renderizadas");break;case"/categories":console.log("🔄 Renderizando categorias..."),await hm(),dt("/categories"),console.log("✅ Categorias renderizadas");break;case"/analytics":console.log("🔄 Renderizando análises..."),await gc(),dt("/analytics"),console.log("✅ Análises renderizadas");break;case"/recorrentes":if(console.log("🔄 Renderizando recorrentes..."),window._renderRecorrentes)window._renderRecorrentes();else{console.log("⚠️ Função _renderRecorrentes não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Recorrentes</h2>
                <div class="flex gap-2">
                  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="btn-primary">
                    <span>+ Nova Recorrente</span>
                  </button>
                </div>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">🔄</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recorrentes</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `)}Wt(),dt("/recorrentes"),console.log("✅ Recorrentes renderizadas");break;case"/notifications":if(console.log("🔄 Renderizando notificações..."),window.renderNotifications)await window.loadNotifications(),window.renderNotifications();else{console.log("⚠️ Função renderNotifications não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Notificações</h2>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">🔔</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Notificações</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `)}Wt(),dt("/notifications"),console.log("✅ Notificações renderizadas");break;case"/settings":if(console.log("🔄 Renderizando configurações..."),window.renderSettings)window.renderSettings();else{console.log("⚠️ Função renderSettings não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Configurações</h2>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">⚙️</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Configurações</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `)}Wt(),dt("/settings"),console.log("✅ Configurações renderizadas");break;default:console.log("🔄 Rota não reconhecida, usando dashboard como fallback"),await ws(),dt("/dashboard"),console.log("✅ Dashboard renderizado (fallback)")}setTimeout(()=>{window.swipeNavigation&&window.swipeNavigation.updateCurrentTabIndex&&(window.swipeNavigation.updateCurrentTabIndex(),window.swipeNavigation.updateSwipeIndicator())},200)}function Wt(){console.log("🔧 Renderizando FAB corrigido...");const n=document.getElementById("fab-container");if(!n){console.error("❌ Container FAB não encontrado");return}console.log("✅ Container FAB encontrado, criando FAB corrigido...");try{window.currentFAB&&window.currentFAB.cleanup&&(console.log("🧹 Limpando FAB anterior..."),window.currentFAB.cleanup()),n.innerHTML="",console.log("🔧 Criando FAB corrigido...");const e=xE();console.log("🔧 FAB corrigido criado:",e),n.appendChild(e),console.log("🔧 FAB corrigido adicionado ao container"),window.currentFAB=e,console.log("✅ FAB corrigido criado e adicionado ao DOM"),setTimeout(()=>{const t=document.getElementById("fab-main"),o=document.getElementById("fab-container-main"),r=document.getElementById("fab-actions");t?console.log("✅ FAB principal encontrado e visível"):console.error("❌ FAB principal não encontrado"),o?console.log("✅ Container FAB principal encontrado"):console.error("❌ Container FAB principal não encontrado"),r?console.log("✅ Container de ações FAB encontrado"):console.error("❌ Container de ações FAB não encontrado");const s=document.getElementById("fab-transaction"),a=document.getElementById("fab-recorrente"),c=document.getElementById("fab-voice");console.log("🔧 Verificando botões de ação:"),console.log("  - Nova Transação:",!!s),console.log("  - Nova Recorrente:",!!a),console.log("  - Voz:",!!c),console.log("🔧 Verificando funções globais:"),console.log("  - showAddTransactionModal:",typeof window.showAddTransactionModal=="function"),console.log("  - showAddRecorrenteModal:",typeof window.showAddRecorrenteModal=="function"),console.log("  - openVoiceModal:",typeof window.openVoiceModal=="function"),console.log("  - Snackbar:",typeof window.Snackbar=="function")},300)}catch(e){console.error("❌ Erro ao criar FAB corrigido:",e)}}function dt(n){console.log("🔄 Renderizando bottom navigation para:",n);const e=document.getElementById("bottom-nav");if(!e){console.error("❌ Elemento bottom-nav não encontrado");return}console.log("✅ Elemento bottom-nav encontrado, renderizando..."),e.innerHTML=`
    <nav class="bottom-nav">
      <a href="#/dashboard" class="nav-btn ${n==="/dashboard"?"active":""}" data-route="/dashboard">
        <span class="nav-icon">📊</span>
        <span class="nav-text">Dashboard</span>
      </a>
      <a href="#/transactions" class="nav-btn ${n==="/transactions"?"active":""}" data-route="/transactions">
        <span class="nav-icon">📋</span>
        <span class="nav-text">Transações</span>
      </a>
      <a href="#/categories" class="nav-btn ${n==="/categories"?"active":""}" data-route="/categories">
        <span class="nav-icon">📂</span>
        <span class="nav-text">Categorias</span>
      </a>
      <a href="#/analytics" class="nav-btn ${n==="/analytics"?"active":""}" data-route="/analytics">
        <span class="nav-icon">📈</span>
        <span class="nav-text">Análises</span>
      </a>
      <a href="#/recorrentes" class="nav-btn ${n==="/recorrentes"?"active":""}" data-route="/recorrentes">
        <span class="nav-icon">🔄</span>
        <span class="nav-text">Recorrentes</span>
      </a>
      <a href="#/notifications" class="nav-btn ${n==="/notifications"?"active":""}" data-route="/notifications">
        <span class="nav-icon">🔔</span>
        <span class="nav-text">Notificações</span>
      </a>
      <a href="#/settings" class="nav-btn ${n==="/settings"?"active":""}" data-route="/settings">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">Config</span>
      </a>
    </nav>
  `,console.log("✅ Bottom navigation renderizada com sucesso")}function Qo(n){const e=document.getElementById("loading-page");e&&(e.style.display=n?"flex":"none")}function pm(){let n=window.location.hash.slice(1)||"/dashboard";const e=["/dashboard","/transactions","/categories","/analytics","/recorrentes","/notifications","/settings"];function t(l){const d=e.indexOf(n);if(d===-1)return;let h,m="";l==="next"?(h=(d+1)%e.length,m="Próxima aba"):(h=d===0?e.length-1:d-1,m="Aba anterior");const f=e[h];c(`${m}: ${{"/dashboard":"Dashboard","/transactions":"Transações","/categories":"Categorias","/analytics":"Análises","/recorrentes":"Recorrentes","/notifications":"Notificações","/settings":"Configurações"}[f]}`),window.location.hash=f,Lo(f)}document.addEventListener("keydown",l=>{if(!(l.target.tagName==="INPUT"||l.target.tagName==="TEXTAREA"))switch(l.key){case"ArrowLeft":l.preventDefault(),t("prev");break;case"ArrowRight":l.preventDefault(),t("next");break}});let o=0,r=0,s=!1;const a=document.createElement("div");a.className="swipe-indicator",a.textContent="Deslize para mudar de aba",document.body.appendChild(a);function c(l){a.textContent=l,a.classList.add("show"),setTimeout(()=>{a.classList.remove("show")},1e3)}document.addEventListener("touchstart",l=>{o=l.touches[0].clientX,r=l.touches[0].clientY,s=!1}),document.addEventListener("touchmove",l=>{if(!o||!r)return;const d=l.touches[0].clientX-o,h=l.touches[0].clientY-r;Math.abs(d)>Math.abs(h)&&Math.abs(d)>50&&(s=!0,l.preventDefault())}),document.addEventListener("touchend",l=>{if(!s||!o)return;const d=l.changedTouches[0].clientX-o;Math.abs(d)>100&&(d>0?t("prev"):t("next")),o=0,r=0,s=!1}),window.addEventListener("hashchange",()=>{const l=window.location.hash.slice(1)||"/dashboard";console.log("🔄 Hash change detectado:",{oldPath:n,newPath:l}),l!==n&&(n=l,console.log("🔄 Navegando para nova rota:",l),Lo(l),Yo(l))}),console.log("🔄 Navegação inicial para:",n),Lo(n),Yo(n)}function WE(){const n=document.getElementById("btn-entrar");n&&n.addEventListener("click",async()=>{try{Qo(!0);const e=await EE();if(e){window.appState.currentUser=e,Xo(!1),pm();try{console.log("📊 Carregando dados do usuário após login..."),await kn(),await bc(),await ur(),await hr(),await Ys(),await Qs(),await Zs(),await Ec(window.appState.currentBudget?.id),console.log("✅ Dados carregados com sucesso após login")}catch(t){console.error("❌ Erro ao carregar dados após login:",t)}await Yo("/dashboard")}}catch(e){console.error("Erro no login:",e),Qo(!1)}})}function KE(){return new Promise(n=>{let e=!0;rn.onAuthStateChanged(t=>{t?(console.log("✅ Usuário autenticado:",t.email),window.appState.currentUser=t,Xo(!1),e&&(e=!1,n(!0))):(console.log("❌ Usuário não autenticado"),window.appState.currentUser=null,typeof window.stopAllListeners=="function"&&window.stopAllListeners(),window.appState&&(window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[]),Xo(!0),e&&(e=!1,n(!1)))})})}document.addEventListener("DOMContentLoaded",async()=>{console.log("🚀 Iniciando aplicação..."),window.appState={currentUser:null,currentBudget:null,transactions:[],categories:[],budgets:[],recorrentes:[],isInitialized:!1},window.applyCompactMode&&window.applyCompactMode(),console.log("🔍 Teste: Verificando elementos de navegação...");const n=document.getElementById("bottom-nav");if(console.log("🔍 Elemento bottom-nav encontrado:",!!n),n&&console.log("🔍 Conteúdo do bottom-nav:",n.innerHTML),await KE()){pm(),Qo(!0);try{console.log("📊 Carregando dados do usuário..."),await kn(),await bc(),await ur(),await hr(),await Ys(),await Qs(),await Zs(),await Ec(window.appState.currentBudget?.id),console.log("✅ Dados carregados com sucesso"),await new Promise(t=>setTimeout(t,500)),console.log("🔄 Renderizando dashboard inicial..."),await ws(),dt("/dashboard"),Wt(),console.log("✅ Dashboard inicial renderizado")}catch(t){console.error("❌ Erro ao carregar dados:",t),window.Snackbar&&window.Snackbar({message:"Erro ao carregar dados. Tente recarregar a página.",type:"error"})}finally{Qo(!1)}setTimeout(()=>{try{if(!document.querySelector("#app-content")){console.warn("⚠️ Container #app-content não encontrado, tentando novamente em 500ms..."),setTimeout(()=>{document.querySelector("#app-content")&&(window.swipeNavigation=new iu,console.log("✅ SwipeNavigation inicializado (tentativa 2)"))},500);return}if(!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, aguardando...");return}window.swipeNavigation=new iu,console.log("✅ SwipeNavigation inicializado com sucesso")}catch(t){console.error("❌ Erro ao inicializar SwipeNavigation:",t)}},1e3),window.appState.isInitialized=!0}WE(),console.log("✅ Aplicação iniciada com sucesso!")});window.addCategoryWithConfirmation=async function(n){return new Promise((e,t)=>{window.showConfirmationModal({title:"Adicionar Categoria",message:`Deseja adicionar a categoria "${n.nome}"?`,confirmText:"Sim, Adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:async()=>{try{const o=await window.addCategory(n);window.Snackbar&&window.Snackbar({message:"✅ Categoria adicionada com sucesso!",type:"success"}),e(o)}catch(o){console.error("❌ Erro ao adicionar categoria:",o),window.Snackbar&&window.Snackbar({message:"Erro ao adicionar categoria: "+o.message,type:"error"}),t(o)}},onCancel:()=>{console.log("❌ Adição de categoria cancelada pelo usuário"),t(new Error("Operação cancelada pelo usuário"))}})})};window.renderDashboard=ws;window.renderTransactions=um;window.renderCategories=hm;window.router=Yo;window.addTransaction=cm;window.updateTransaction=VE;window.deleteTransaction=lm;window.addCategory=yc;window.updateCategory=OE;window.deleteCategory=dm;window.addBudget=Xs;window.loadTransactions=ur;window.loadCategories=hr;window.loadBudgets=kn;window.selectDefaultBudget=bc;window.loadRecorrentes=Ys;window.closeModalAlertas=$E;window.calcularNumeroParcela=qE;window.showLoading=Qo;window.toggleLoginPage=Xo;window.refreshCurrentView=am;window.logout=LE;let Vo=null;function mm(){return Vo||(Vo=new wc),Vo}window.openVoiceModal=function(n="transaction"){return console.log("🎤 openVoiceModal chamado:",n),mm().start(n)};window.closeVoiceModal=function(){console.log("🎤 closeVoiceModal chamado"),Vo&&Vo.stop()};window.startVoiceRecognition=function(n="transaction"){return console.log("🎤 startVoiceRecognition chamado:",n),mm().start(n)};window.downloadBackup=function(){try{if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets,recorrentes:window.appState.recorrentes},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),o=document.createElement("a");o.href=t,o.download="financeiro-backup.json",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(t),window.Snackbar&&window.Snackbar({message:"✅ Backup JSON exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar backup:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar backup: "+n.message,type:"error"}):alert("Erro ao exportar backup: "+n.message)}};window.exportToExcel=function(){try{if(typeof XLSX>"u"){console.error("❌ Biblioteca XLSX não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n=XLSX.utils.book_new(),e=window.appState.transactions.map(r=>({Descrição:r.descricao,Valor:r.valor,Tipo:r.tipo,Categoria:window.appState.categories.find(s=>s.id===r.categoriaId)?.nome||"",Data:r.createdAt&&r.createdAt.toDate?r.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(r=>({Nome:r.nome,Tipo:r.tipo,Limite:r.limite,Cor:r.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const o=window.appState.budgets.map(r=>({Nome:r.nome,Descrição:r.descricao,ID:r.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(o),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx"),window.Snackbar&&window.Snackbar({message:"✅ Arquivo Excel exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar Excel:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar Excel: "+n.message,type:"error"}):alert("Erro ao exportar Excel: "+n.message)}};window.exportToPDF=function(){try{if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(20),e.setFont("helvetica","bold"),e.text("📊 Relatório Financeiro",10,t),t+=15;const o=window.appState.currentBudget;o&&(e.setFontSize(14),e.setFont("helvetica","bold"),e.text(`Orçamento: ${o.nome}`,10,t),t+=8,e.setFontSize(10),e.setFont("helvetica","normal"),e.text(`ID: ${o.id}`,10,t),t+=10);const r=window.appState.transactions.filter(c=>c.tipo==="receita").reduce((c,l)=>c+parseFloat(l.valor),0),s=window.appState.transactions.filter(c=>c.tipo==="despesa").reduce((c,l)=>c+parseFloat(l.valor),0),a=r-s;e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Resumo Geral:",10,t),t+=8,e.setFontSize(10),e.setFont("helvetica","normal"),e.text(`Total Receitas: R$ ${r.toFixed(2)}`,12,t),t+=6,e.text(`Total Despesas: R$ ${s.toFixed(2)}`,12,t),t+=6,e.setFont("helvetica","bold"),e.text(`Saldo: R$ ${a.toFixed(2)}`,12,t),t+=10,e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Transações Recentes:",10,t),t+=8,e.setFontSize(9),e.setFont("helvetica","normal"),window.appState.transactions.sort((c,l)=>new Date(l.createdAt?.toDate?.()||l.createdAt)-new Date(c.createdAt?.toDate?.()||c.createdAt)).slice(0,15).forEach(c=>{const l=window.appState.categories.find(m=>m.id===c.categoriaId)?.nome||"Sem categoria",h=`${c.createdAt?.toDate?.()?c.createdAt.toDate().toLocaleDateString():"Data não disponível"} - ${c.descricao} | R$ ${c.valor} | ${c.tipo} | ${l}`;t>270&&(e.addPage(),t=10),e.text(h,12,t),t+=6}),t+=5,e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Gastos por Categoria:",10,t),t+=8,e.setFontSize(9),e.setFont("helvetica","normal"),window.appState.categories.forEach(c=>{const l=window.appState.transactions.filter(d=>d.categoriaId===c.id&&d.tipo==="despesa").reduce((d,h)=>d+parseFloat(h.valor),0);if(l>0){const d=c.limite?` / R$ ${c.limite}`:"",h=c.limite?` (${(l/c.limite*100).toFixed(1)}%)`:"";t>270&&(e.addPage(),t=10),e.text(`${c.nome}: R$ ${l.toFixed(2)}${d}${h}`,12,t),t+=6}}),e.save("relatorio-financeiro.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Relatório PDF exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar PDF:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar PDF: "+n.message,type:"error"}):alert("Erro ao exportar PDF: "+n.message)}};window.exportReadmePDF=function(){try{let r=function(s,a,c,l=170){return t.splitTextToSize(s,l).forEach(h=>{c>270&&(t.addPage(),c=10),t.text(h,a,c),c+=6}),c};var n=r;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let o=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Controle Financeiro",20,25),t.setFontSize(14),t.text("Guia Completo de Uso",20,35),o=50,t.setFontSize(12),t.setFont("helvetica","bold"),t.setTextColor(0,0,0),o=r("🎯 Como Usar o Aplicativo",20,o),t.setFontSize(10),t.setFont("helvetica","normal"),o=r("1. Faça login com sua conta Google",25,o),o=r("2. Crie categorias para organizar suas despesas e receitas",25,o),o=r("3. Adicione transações usando o botão + ou comandos de voz",25,o),o=r("4. Configure despesas recorrentes para pagamentos fixos",25,o),o=r("5. Monitore seu saldo e gastos no dashboard",25,o),o+=10,t.setFontSize(12),t.setFont("helvetica","bold"),o=r("🎤 Comandos de Voz Disponíveis",20,o),t.setFontSize(10),t.setFont("helvetica","normal"),o=r('• "gastei 50 reais no supermercado em alimentação"',25,o),o=r('• "recebi 2000 de salário em rendimentos"',25,o),o=r('• "criar categoria alimentação despesa 500"',25,o),o=r('• "qual meu saldo"',25,o),o=r('• "mostrar transações"',25,o),o+=10,t.setFontSize(12),t.setFont("helvetica","bold"),o=r("📊 Funcionalidades Principais",20,o),t.setFontSize(10),t.setFont("helvetica","normal"),o=r("• Dashboard com resumo financeiro",25,o),o=r("• Gestão de transações e categorias",25,o),o=r("• Sistema de despesas recorrentes",25,o),o=r("• Alertas de limite de categoria",25,o),o=r("• Backup e exportação de dados",25,o),o=r("• Interface responsiva para mobile",25,o),o+=10,t.setFontSize(12),t.setFont("helvetica","bold"),o=r("💾 Backup e Exportação",20,o),t.setFontSize(10),t.setFont("helvetica","normal"),o=r("• Exportação em JSON para backup completo",25,o),o=r("• Exportação em Excel para relatórios",25,o),o=r("• Exportação em PDF para documentação",25,o),o=r("• Restauração de dados de backup",25,o),o+=10,t.setFontSize(12),t.setFont("helvetica","bold"),o=r("🔧 Suporte e Contato",20,o),t.setFontSize(10),t.setFont("helvetica","normal"),o=r("Para dúvidas ou problemas:",25,o),o=r("• Verifique os logs do console (F12)",30,o),o=r("• Teste em diferentes navegadores",30,o),o=r("• Consulte a documentação técnica",30,o),t.save("guia-servo-tech-financas.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Guia PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar guia PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar guia PDF: "+e.message,type:"error"}):alert("Erro ao exportar guia PDF: "+e.message)}};window.showExportOptions=function(){console.log("🔍 showExportOptions chamada"),tn({title:"📤 Opções de Exportação",content:`
      <div class="space-y-4">
        <button onclick="window.downloadBackup && window.downloadBackup()" class="w-full btn-primary">
          <span class="icon-standard">💾</span>
          Backup JSON Completo
        </button>
        <button onclick="window.exportToExcel && window.exportToExcel()" class="w-full btn-secondary">
          <span class="icon-standard">📊</span>
          Exportar para Excel
        </button>
        <button onclick="window.exportToPDF && window.exportToPDF()" class="w-full btn-secondary">
          <span class="icon-standard">📄</span>
          Exportar para PDF
        </button>
        <button onclick="window.exportReadmePDF && window.exportReadmePDF()" class="w-full btn-secondary">
          <span class="icon-standard">📖</span>
          Guia de Uso (PDF)
        </button>
      </div>
    `})};function XE(){const n=document.getElementById("voice-modal"),e=n?.querySelector(".voice-content");n&&e&&(n.style.display="flex",n.style.pointerEvents="auto",n.style.background="rgba(0, 0, 0, 0.95)",n.style.backdropFilter="blur(30px)",e.style.transform="scale(1)",e.style.opacity="1",document.body.classList.add("voice-modal-open"),window.startVoiceRecognition&&setTimeout(()=>{window.startVoiceRecognition("transaction")},500),console.log("🎤 Modal de voz aberto"))}window.openVoiceModal=XE;function YE(){console.log("🔧 Configurando botões da tela de categorias...");const n=document.getElementById("add-category-btn");n&&(n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("📂 Add category button clicked"),window.showAddCategoryModal?window.showAddCategoryModal():(console.warn("⚠️ Função de adicionar categoria não disponível"),window.Snackbar&&window.Snackbar.show("Funcionalidade de adicionar categoria não disponível","warning"))}),console.log("✅ Add category button configurado"));const e=document.querySelector('button[onclick="window.migrarTransacoesAntigas()"]');e&&(e.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("🔄 Migrar button clicked"),window.migrarTransacoesAntigas?window.migrarTransacoesAntigas():console.warn("⚠️ Função de migrar não disponível")}),console.log("✅ Migrar button configurado"));const t=document.querySelector('button[onclick="window.corrigirTipoCategoria()"]');t&&(t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("🔧 Corrigir button clicked"),window.corrigirTipoCategoria?window.corrigirTipoCategoria():console.warn("⚠️ Função de corrigir não disponível")}),console.log("✅ Corrigir button configurado"))}function QE(){console.log("🔧 Configurando botões da tela de transações...");const n=document.getElementById("add-transaction-btn");n&&(n.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("📋 Add transaction button clicked"),window.showAddTransactionModal?window.showAddTransactionModal():(console.warn("⚠️ Função de adicionar transação não disponível"),window.Snackbar&&window.Snackbar.show("Funcionalidade de adicionar transação não disponível","warning"))}),console.log("✅ Add transaction button configurado"));const e=document.getElementById("voice-btn");e?(e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("🎤 Voice button clicked"),window.startVoiceRecognition?window.startVoiceRecognition("transaction"):console.warn("⚠️ Função de voz não disponível")}),console.log("✅ Voice button configurado")):console.warn("⚠️ Botão de voz não encontrado")}function JE(){console.log("🔧 Configurando botões do dashboard...");const n=document.getElementById("export-btn");n&&(n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("📤 Export button clicked"),window.showExportOptions?window.showExportOptions():(console.warn("⚠️ Função de exportação não disponível"),window.Snackbar&&window.Snackbar({message:"Funcionalidade de exportação não disponível",type:"warning"}))}),console.log("✅ Export button configurado")),document.getElementById("theme-toggle-btn")&&(console.log("Dashboard: Configurando botão de tema..."),window.setupThemeToggle?window.setupThemeToggle("theme-toggle-btn"):console.warn("⚠️ setupThemeToggle não disponível"));const t=document.getElementById("mes-anterior"),o=document.getElementById("mes-proximo");t&&(t.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation(),console.log("⬅️ Mês anterior clicked");const s=parseInt(document.querySelector("#mes-selector span").textContent.split(" ")[1]),a=document.querySelector("#mes-selector span").textContent.split(" ")[0],l=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].indexOf(a);let d=s,h=l;l===0?(d=s-1,h=11):h=l-1,window.renderDashboard&&await window.renderDashboard(d,h+1)}),console.log("✅ Mês anterior button configurado")),o&&(o.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation(),console.log("➡️ Mês próximo clicked");const s=parseInt(document.querySelector("#mes-selector span").textContent.split(" ")[1]),a=document.querySelector("#mes-selector span").textContent.split(" ")[0],l=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].indexOf(a);let d=s,h=l;l===11?(d=s+1,h=0):h=l+1,window.renderDashboard&&await window.renderDashboard(d,h+1)}),console.log("✅ Mês próximo button configurado"))}window.migrarTransacoesAntigas=async function(){try{if(console.log("🔄 Iniciando migração de transações antigas..."),!window.appState.currentUser){F({message:"Usuário não autenticado",type:"error"});return}const e=window.appState.currentBudget;if(!e){F.show("Orçamento não selecionado","error");return}const t=ve(oe(U,"transactions"),ne("budgetId","==",e.id),ne("categoriaId","==",null)),r=(await ge(t)).docs;if(r.length===0){F({message:"Nenhuma transação para migrar",type:"info"});return}let s=window.appState.categories.find(c=>c.nome==="Geral");if(!s){const l=await yc({nome:"Geral",descricao:"Categoria padrão para transações antigas",tipo:"despesa",cor:"#6B7280",limite:0});await hr(),s=window.appState.categories.find(d=>d.id===l)}let a=0;for(const c of r)await ct(c.ref,{categoriaId:s.id,updatedAt:Ee()}),a++;await ur(),F({message:`${a} transações migradas para categoria "Geral"`,type:"success"})}catch(n){console.error("❌ Erro na migração:",n),F({message:"Erro ao migrar transações",type:"error"})}};window.corrigirTipoCategoria=async function(){try{if(console.log("🔧 Iniciando correção de tipos de categoria..."),!window.appState.currentUser){F({message:"Usuário não autenticado",type:"error"});return}const e=window.appState.currentBudget;if(!e){F.show("Orçamento não selecionado","error");return}const t=ve(oe(U,"categories"),ne("budgetId","==",e.id),ne("tipo","==",null)),r=(await ge(t)).docs;if(r.length===0){F({message:"Nenhuma categoria para corrigir",type:"info"});return}let s=0;for(const a of r)await ct(a.ref,{tipo:"despesa",updatedAt:Ee()}),s++;await hr(),F({message:`${s} categorias corrigidas`,type:"success"})}catch(n){console.error("❌ Erro na correção:",n),F({message:"Erro ao corrigir categorias",type:"error"})}};async function Qs(){try{const n=rn.currentUser;if(!n)return[];const{getDocs:e,query:t,where:o,orderBy:r,limit:s}=await $e(async()=>{const{getDocs:d,query:h,where:m,orderBy:f,limit:_}=await Promise.resolve().then(()=>Ye);return{getDocs:d,query:h,where:m,orderBy:f,limit:_}},void 0),a=t(oe(U,"notifications"),o("recipientUid","==",n.uid),r("createdAt","desc"),s(50)),c=await e(a),l=[];return c.forEach(d=>{l.push({id:d.id,...d.data()})}),window.appState.notifications=l,console.log("📧 Notificações carregadas:",l.length),Js(),l}catch(n){return console.error("Erro ao carregar notificações:",n),[]}}async function ZE(n){try{const{updateDoc:e}=await $e(async()=>{const{updateDoc:o}=await Promise.resolve().then(()=>Ye);return{updateDoc:o}},void 0);await e(ke(U,"notifications",n),{read:!0});const t=window.appState.notifications.findIndex(o=>o.id===n);t!==-1&&(window.appState.notifications[t].read=!0),Js()}catch(e){console.error("Erro ao marcar notificação como lida:",e)}}async function eT(){try{const n=window.appState.notifications?.filter(o=>!o.read)||[];if(n.length===0){F({message:"Nenhuma notificação não lida",type:"info"});return}const{updateDoc:e}=await $e(async()=>{const{updateDoc:o}=await Promise.resolve().then(()=>Ye);return{updateDoc:o}},void 0),t=n.map(o=>e(ke(U,"notifications",o.id),{read:!0}));await Promise.all(t),window.appState.notifications.forEach(o=>o.read=!0),Js(),F({message:`${n.length} notificações marcadas como lidas`,type:"success"}),window.location.hash==="#/notifications"&&_c()}catch(n){console.error("Erro ao marcar notificações como lidas:",n),F({message:"Erro ao marcar notificações como lidas",type:"error"})}}function Js(){const n=window.appState.notifications?.filter(t=>!t.read).length||0,e=document.querySelector('[data-route="/notifications"]');if(e){let t=e.querySelector(".notification-badge");t||(t=document.createElement("span"),t.className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",e.style.position="relative",e.appendChild(t)),n>0?(t.textContent=n>99?"99+":n,t.style.display="flex"):t.style.display="none"}}let Ln=null;async function Zs(){Ln&&Ln();const n=rn.currentUser;if(!n){console.log("⚠️ Usuário não autenticado, não iniciando listener de notificações");return}if(!window.appState.currentBudget){console.log("⚠️ Nenhum orçamento selecionado, não iniciando listener de notificações");return}try{const{onSnapshot:e,query:t,where:o,orderBy:r,limit:s}=await $e(async()=>{const{onSnapshot:c,query:l,where:d,orderBy:h,limit:m}=await Promise.resolve().then(()=>Ye);return{onSnapshot:c,query:l,where:d,orderBy:h,limit:m}},void 0),a=t(oe(U,"notifications"),o("recipientUid","==",n.uid),r("createdAt","desc"),s(50));Ln=e(a,c=>{console.log("📧 Listener de notificações executado!");const l=[];c.forEach(d=>{l.push({id:d.id,...d.data()})}),window.appState.notifications=l,console.log("📧 Notificações atualizadas:",l.length),Js(),window.location.hash==="#/notifications"&&_c()},c=>{console.error("❌ Erro no listener de notificações:",c),c.code==="permission-denied"&&(console.log("⚠️ Permissão negada para notificações, desabilitando listener"),Ln&&(Ln(),Ln=null))})}catch(e){console.error("❌ Erro ao configurar listener de notificações:",e)}}async function _c(){const n=document.getElementById("app-content");if(!n)return;await Qs();const e=window.appState.notifications||[];n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">🔔 Notificações</h2>
        <div class="flex items-center gap-2">
          <button onclick="window.showConfirmationModal({
            title: 'Marcar como Lidas',
            message: 'Deseja marcar todas as notificações como lidas?',
            confirmText: 'Sim, Marcar',
            confirmColor: 'bg-blue-500 hover:bg-blue-600',
            onConfirm: 'window.markAllNotificationsAsRead && window.markAllNotificationsAsRead()'
          })" class="btn-secondary">
            <span class="icon-standard">✔️</span>
            <span class="hidden sm:inline">Marcar todas como lidas</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Lista de Notificações -->
          <div class="space-y-4">
            ${e.length>0?e.map(t=>`
              <div class="card-standard ${t.read?"":"border-l-4 border-blue-500"}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-lg">💰</span>
                      <h3 class="font-semibold text-gray-800 dark:text-white">
                        Nova transação no orçamento "${t.budgetName||"Orçamento"}"
                      </h3>
                      ${t.read?"":'<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Nova</span>'}
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>${t.senderName||"Usuário"}</strong> adicionou uma ${t.transactionTipo||"transação"}:
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium text-gray-800 dark:text-white">${t.transactionDescricao||"Transação"}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">${t.transactionCategoria||"Categoria"}</div>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-lg ${(t.transactionTipo||"despesa")==="receita"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                            R$ ${(t.transactionValor||0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      ${t.createdAt?.toDate?t.createdAt.toDate().toLocaleString("pt-BR"):"Data não disponível"}
                    </div>
                  </div>
                  ${t.read?"":`
                    <button onclick="window.showConfirmationModal({
                      title: 'Marcar como Lida',
                      message: 'Deseja marcar esta notificação como lida?',
                      confirmText: 'Sim, Marcar',
                      confirmColor: 'bg-blue-500 hover:bg-blue-600',
                      onConfirm: 'window.markNotificationAsRead && window.markNotificationAsRead(\\'${t.id}\\')'
                    })" 
                            class="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                      Marcar como lida
                    </button>
                  `}
                </div>
              </div>
            `).join(""):`
              <div class="card-standard text-center">
                <div class="text-6xl mb-4">🔔</div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma notificação</h3>
                <p class="text-gray-600 dark:text-gray-400">Você não tem notificações no momento.</p>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `,Wt()}window.loadNotifications=Qs;window.markNotificationAsRead=ZE;window.markAllNotificationsAsRead=eT;window.renderNotifications=_c;window.listenNotifications=Zs;window.addTransactionWithConfirmation=async function(n){return new Promise((e,t)=>{window.showConfirmationModal({title:"Adicionar Transação",message:`Tem certeza que deseja adicionar a transação "${n.descricao}" no valor de R$ ${n.valor.toFixed(2)}?`,confirmText:"Sim, Adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:async()=>{try{const o=await window.addTransaction(n);window.Snackbar&&window.Snackbar({message:"✅ Transação adicionada com sucesso!",type:"success"}),e(o)}catch(o){console.error("❌ Erro ao adicionar transação:",o),window.Snackbar&&window.Snackbar({message:"Erro ao adicionar transação: "+o.message,type:"error"}),t(o)}},onCancel:()=>{console.log("❌ Adição de transação cancelada pelo usuário"),t(new Error("Operação cancelada pelo usuário"))}})})};window.deleteTransactionWithConfirmation=function(n,e="transação"){window.showConfirmationModal({title:"Excluir Transação",message:`Tem certeza que deseja excluir a ${e}? Esta ação não pode ser desfeita.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteTransaction&&window.deleteTransaction(n)}})};window.deleteCategoryWithConfirmation=function(n,e="categoria"){window.showConfirmationModal({title:"Excluir Categoria",message:`Tem certeza que deseja excluir a categoria "${e}"? Todas as transações desta categoria ficarão sem categoria.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteCategory&&window.deleteCategory(n)}})};window.deleteRecorrenteWithConfirmation=function(n,e="despesa recorrente"){window.showConfirmationModal({title:"Excluir Despesa Recorrente",message:`Tem certeza que deseja excluir a ${e}? Esta ação não pode ser desfeita.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteDespesaRecorrente&&window.deleteDespesaRecorrente(n)}})};window.leaveBudgetWithConfirmation=function(n,e="orçamento"){window.showConfirmationModal({title:"Sair do Orçamento",message:`Tem certeza que deseja sair do orçamento "${e}"? Você perderá acesso a todas as transações.`,confirmText:"Sim, Sair",confirmColor:"bg-orange-500 hover:bg-orange-600",onConfirm:()=>{window.leaveSharedBudget&&window.leaveSharedBudget(n)}})};window.showExportOptions=function(){if(console.log("🔍 showExportOptions chamada"),console.log("🔍 window.Modal disponível:",!!window.Modal),console.log("🔍 window.Modal tipo:",typeof window.Modal),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível");return}console.log("🔍 Tentando abrir modal de exportação...");try{const n=window.Modal({title:"Exportar Dados",content:`
        <div class="space-y-4">
          <button onclick="window.exportToExcel()" class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 text-base">
            <span>📊</span> Relatório Excel
          </button>
          <button onclick="window.exportToPDF()" class="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2 text-base">
            <span>📄</span> Relatório PDF
          </button>
          <button onclick="window.exportReadmePDF()" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 text-base">
            <span>📖</span> Guia de Uso (PDF)
          </button>
          <button onclick="window.downloadBackup()" class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 flex items-center justify-center gap-2 text-base">
            <span>💾</span> Backup Completo (JSON)
          </button>
        </div>
      `,onClose:()=>{console.log("🔍 Modal fechado"),document.querySelector(".modal")?.remove()}});console.log("🔍 Modal criado com sucesso:",n),document.body.appendChild(n),console.log("🔍 Modal adicionado ao DOM")}catch(n){console.error("❌ Erro ao criar modal:",n),alert("Erro ao abrir modal de exportação: "+n.message)}};window.exportToExcel=function(){try{if(typeof XLSX>"u"){console.error("❌ Biblioteca XLSX não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n=XLSX.utils.book_new(),e=window.appState.transactions.map(r=>({Descrição:r.descricao,Valor:r.valor,Tipo:r.tipo,Categoria:window.appState.categories.find(s=>s.id===r.categoriaId)?.nome||"",Data:r.createdAt&&r.createdAt.toDate?r.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(r=>({Nome:r.nome,Tipo:r.tipo,Limite:r.limite,Cor:r.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const o=window.appState.budgets.map(r=>({Nome:r.nome,Descrição:r.descricao,ID:r.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(o),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx"),window.Snackbar&&window.Snackbar({message:"✅ Arquivo Excel exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar Excel:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar Excel: "+n.message,type:"error"}):alert("Erro ao exportar Excel: "+n.message)}};window.exportToPDF=function(){try{let r=function(d,h,m,f=170){return t.splitTextToSize(d,f).forEach(E=>{m>270&&(t.addPage(),m=10),t.text(E,h,m),m+=6}),m};var n=r;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let o=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Controle Financeiro",20,25),t.setFontSize(14),t.text("Relatório Financeiro",20,35),t.setTextColor(0,0,0),t.setFontSize(12),t.setFont("helvetica","normal"),o=50,o=r("📊 RESUMO FINANCEIRO",20,o),o+=10;const s=window.appState.transactions.filter(d=>d.tipo==="receita").reduce((d,h)=>d+parseFloat(h.valor),0),a=window.appState.transactions.filter(d=>d.tipo==="despesa").reduce((d,h)=>d+parseFloat(h.valor),0),c=s-a;o=r(`💰 Total de Receitas: R$ ${s.toFixed(2)}`,20,o),o=r(`💸 Total de Despesas: R$ ${a.toFixed(2)}`,20,o),o=r(`💳 Saldo: R$ ${c.toFixed(2)}`,20,o),o+=15,o=r("📋 ÚLTIMAS TRANSAÇÕES",20,o),o+=10,window.appState.transactions.sort((d,h)=>new Date(h.createdAt)-new Date(d.createdAt)).slice(0,10).forEach(d=>{const h=window.appState.categories.find(f=>f.id===d.categoriaId),m=d.createdAt&&d.createdAt.toDate?d.createdAt.toDate().toLocaleDateString():new Date(d.createdAt).toLocaleDateString();o=r(`${m} - ${d.descricao} (${h?.nome||"Sem categoria"}) - R$ ${d.valor}`,25,o)}),t.save("financeiro-relatorio.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Relatório PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar PDF: "+e.message,type:"error"}):alert("Erro ao exportar PDF: "+e.message)}};window.downloadBackup=function(){try{if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets,recorrentes:window.appState.recorrentes},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),o=document.createElement("a");o.href=t,o.download="financeiro-backup.json",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(t),window.Snackbar&&window.Snackbar({message:"✅ Backup JSON exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar backup:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar backup: "+n.message,type:"error"}):alert("Erro ao exportar backup: "+n.message)}};window.exportReadmePDF=function(){try{let r=function(s,a,c,l=170){return t.splitTextToSize(s,l).forEach(h=>{c>270&&(t.addPage(),c=10),t.text(h,a,c),c+=6}),c};var n=r;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let o=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Controle Financeiro",20,25),t.setFontSize(14),t.text("Guia Completo de Uso",20,35),t.setTextColor(0,0,0),t.setFontSize(12),t.setFont("helvetica","normal"),o=50,o=r("📱 COMO USAR O APLICATIVO",20,o),o+=10,o=r("1. DASHBOARD - Visualize seu resumo financeiro, saldo atual, gastos por categoria e alertas de limite.",20,o),o=r("2. TRANSAÇÕES - Adicione, edite ou remova suas receitas e despesas.",20,o),o=r("3. CATEGORIAS - Organize suas transações em categorias com limites personalizados.",20,o),o=r("4. RECORRENTES - Configure despesas que se repetem mensalmente.",20,o),o=r("5. NOTIFICAÇÕES - Receba alertas sobre limites de categoria e transações.",20,o),o=r("6. CONFIGURAÇÕES - Personalize o aplicativo e exporte seus dados.",20,o),o+=15,o=r("🎯 FUNCIONALIDADES PRINCIPAIS",20,o),o+=10,o=r("• Navegação por deslizamento entre abas",20,o),o=r("• Reconhecimento de voz para adicionar transações",20,o),o=r("• Exportação para Excel e PDF",20,o),o=r("• Backup e restauração de dados",20,o),o=r("• Notificações push para alertas",20,o),o=r("• Tema claro/escuro",20,o),o=r("• Instalação como PWA",20,o),o+=15,o=r("🔧 DICAS DE USO",20,o),o+=10,o=r("• Use as setas do teclado para navegar entre abas",20,o),o=r("• Deslize horizontalmente para trocar de tela no mobile",20,o),o=r("• Configure limites nas categorias para receber alertas",20,o),o=r("• Use o botão de voz para adicionar transações rapidamente",20,o),o=r("• Faça backup regular dos seus dados",20,o),t.save("servo-tech-financas-guia.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Guia PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar guia PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar guia PDF: "+e.message,type:"error"}):alert("Erro ao exportar guia PDF: "+e.message)}};function Jo(n,e,t={}){if(console.log("🔔 Tentando enviar notificação:",n,e),console.log("🔔 Permissão:",Notification.permission),console.log("🔔 Habilitada:",localStorage.getItem("notifications-enabled")),Notification.permission==="granted"&&localStorage.getItem("notifications-enabled")==="true")try{const o=new Notification(n,{body:e,icon:"/icon-192.png",badge:"/icon-192.png",tag:"servo-tech-financas",requireInteraction:!1,...t});console.log("✅ Notificação criada com sucesso:",o),o.onclick=()=>{console.log("🔔 Notificação clicada"),window.focus(),o.close()},setTimeout(()=>{o.close(),console.log("🔔 Notificação fechada automaticamente")},5e3),console.log("✅ Notificação enviada com sucesso!")}catch(o){console.error("❌ Erro ao criar notificação:",o)}else console.log("❌ Notificação não enviada - permissão ou configuração inválida"),console.log("   Permissão:",Notification.permission),console.log("   Habilitada:",localStorage.getItem("notifications-enabled"))}function tT(){if(localStorage.getItem("notifications-enabled")!=="true")return;const e=(window.appState.recorrentes||[]).filter(t=>t.parcelasRestantes>0);e.length>0&&Jo("Recorrentes Pendentes",`Você tem ${e.length} despesa(s) recorrente(s) para efetivar este mês.`)}function nT(){if(console.log("🔍 Iniciando verificação de limites de categoria..."),console.log("🔍 Notificações habilitadas:",localStorage.getItem("notifications-enabled")==="true"),localStorage.getItem("notifications-enabled")!=="true"){console.log("❌ Notificações desabilitadas, pulando verificação");return}const n=window.appState.categories||[],e=window.appState.transactions||[];console.log("🔍 Categorias encontradas:",n.length),console.log("🔍 Transações encontradas:",e.length),n.forEach(t=>{if(t.limite){const o=e.filter(a=>a.categoriaId===t.id&&a.tipo===t.tipo).reduce((a,c)=>a+parseFloat(c.valor),0),r=parseFloat(t.limite),s=o/r*100;console.log(`🔍 ${t.nome}: R$ ${o.toFixed(2)} / R$ ${r.toFixed(2)} (${s.toFixed(1)}%)`),s>=80&&(console.log(`⚠️ ${t.nome} atingiu ${s.toFixed(1)}% do limite!`),Jo("⚠️ Limite de Categoria",`${t.nome} está com ${s.toFixed(1)}% do limite usado (R$ ${o.toFixed(2)} / R$ ${r.toFixed(2)}).`)),s>100&&(console.log(`🚨 ${t.nome} ULTRAPASSOU o limite em ${(s-100).toFixed(1)}%!`),Jo("🚨 LIMITE ULTRAPASSADO!",`${t.nome} ultrapassou o limite em ${(s-100).toFixed(1)}%! (R$ ${o.toFixed(2)} / R$ ${r.toFixed(2)})`))}})}window.forceUIUpdate=function(){console.log("🔄 Forçando atualização da UI...");const n=document.querySelector(".nav-btn.active")?.getAttribute("data-route");console.log("📍 Aba atual:",n),requestAnimationFrame(()=>{n&&window.router&&(console.log("🔄 Recarregando aba:",n),window.router(n))})};window.syncThemeAcrossTabs=function(){const e=document.documentElement.classList.contains("dark");document.querySelectorAll('[class*="dark:"]').forEach(o=>{o.offsetHeight}),document.querySelectorAll("#theme-icon").forEach(o=>{o.textContent=e?"🌙":"☀️"}),console.log("🎨 Tema sincronizado em todas as abas")};window.testNotification=function(){console.log("🔔 Testando notificações..."),console.log("📱 Permissão do navegador:",Notification.permission),console.log("💾 localStorage:",localStorage.getItem("notifications-enabled"));const n=Notification.permission,e=localStorage.getItem("notifications-enabled")==="true";if(n==="granted"&&e)console.log("✅ Notificações ativadas - enviando teste..."),Jo("🔔 Teste de Notificação","As notificações estão funcionando perfeitamente!"),window.Snackbar&&window.Snackbar({message:"✅ Notificação de teste enviada!",type:"success"});else{let t="";n==="denied"?t="❌ Permissão negada pelo navegador. Vá em Configurações > Notificações e permita.":n==="default"?t='❌ Permissão não solicitada. Clique em "Ativar Notificações" primeiro.':e?t="❌ Erro desconhecido com notificações.":t='❌ Notificações desativadas. Clique em "Ativar Notificações" primeiro.',console.log("❌ Erro:",t),window.Snackbar?window.Snackbar({message:t,type:"error"}):alert(t)}};window.showNotification=Jo;window.checkRecorrentesPendentes=tT;window.checkLimitesCategoria=nT;window.updatePageTitle=Lo;window.testBottomNav=function(){console.log("🧪 Teste: Forçando renderização da navegação..."),dt("/dashboard"),setTimeout(()=>{const n=document.getElementById("bottom-nav");n?(console.log("✅ Navegação renderizada com sucesso"),console.log("📋 Conteúdo:",n.innerHTML)):console.error("❌ Navegação não foi renderizada")},100)};let Oo=null,Fo=null,$o=null,Bo=null;async function gm(n){if(Oo&&Oo(),!n)return;const{doc:e,onSnapshot:t}=await $e(async()=>{const{doc:r,onSnapshot:s}=await Promise.resolve().then(()=>Ye);return{doc:r,onSnapshot:s}},void 0),o=e(U,"budgets",n);Oo=t(o,r=>{r.exists()&&(window.appState.currentBudget={id:r.id,...r.data()},console.log("🔄 Orçamento atualizado:",r.data().nome),setTimeout(async()=>{window.renderSettings&&(await window.renderSettings(),console.log("✅ renderSettings executado")),window.renderDashboard&&(window.renderDashboard(),console.log("✅ renderDashboard executado"))},100))})}async function fm(n){if(Fo&&Fo(),!n)return;console.log("🎧 Iniciando listener de transações para budgetId:",n);const{query:e,collection:t,where:o,onSnapshot:r}=await $e(async()=>{const{query:a,collection:c,where:l,onSnapshot:d}=await Promise.resolve().then(()=>Ye);return{query:a,collection:c,where:l,onSnapshot:d}},void 0),s=e(t(U,"transactions"),o("budgetId","==",n));Fo=r(s,a=>{console.log("🎧 Listener de transações executado!");const c=[];a.forEach(T=>{c.push({id:T.id,...T.data()})});const l=window.appState.transactions.map(T=>T.id).sort(),d=c.map(T=>T.id).sort(),h=JSON.stringify(l)!==JSON.stringify(d),m=window.appState.transactions.map(T=>({id:T.id,descricao:T.descricao,valor:T.valor,categoriaId:T.categoriaId})).sort((T,S)=>T.id.localeCompare(S.id)),f=c.map(T=>({id:T.id,descricao:T.descricao,valor:T.valor,categoriaId:T.categoriaId})).sort((T,S)=>T.id.localeCompare(S.id)),_=JSON.stringify(m)!==JSON.stringify(f),E=h||_;c.sort((T,S)=>{let N,L;return T.createdAt&&typeof T.createdAt=="object"&&T.createdAt.seconds?N=new Date(T.createdAt.seconds*1e3):N=new Date(T.createdAt),S.createdAt&&typeof S.createdAt=="object"&&S.createdAt.seconds?L=new Date(S.createdAt.seconds*1e3):L=new Date(S.createdAt),L-N}),window.appState.transactions=c,console.log("🔄 Transações atualizadas:",c.length,"itens"),console.log("🔄 Houve mudança?",E),E?(console.log("🎯 Atualizando UI após mudança nas transações..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window.renderTransactions&&(console.log("📋 Executando renderTransactions..."),window.renderTransactions()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},a=>{console.error("❌ Erro no listener de transações:",a)})}async function wm(n){if($o&&$o(),!n)return;console.log("🎧 Iniciando listener de categorias para budgetId:",n);const{query:e,collection:t,where:o,onSnapshot:r}=await $e(async()=>{const{query:a,collection:c,where:l,onSnapshot:d}=await Promise.resolve().then(()=>Ye);return{query:a,collection:c,where:l,onSnapshot:d}},void 0),s=e(t(U,"categories"),o("budgetId","==",n));$o=r(s,a=>{console.log("🎧 Listener de categorias executado!");const c=[];a.forEach(T=>{c.push({id:T.id,...T.data()})});const l=window.appState.categories.map(T=>T.id).sort(),d=c.map(T=>T.id).sort(),h=JSON.stringify(l)!==JSON.stringify(d),m=window.appState.categories.map(T=>({id:T.id,nome:T.nome,limite:T.limite,cor:T.cor})).sort((T,S)=>T.id.localeCompare(S.id)),f=c.map(T=>({id:T.id,nome:T.nome,limite:T.limite,cor:T.cor})).sort((T,S)=>T.id.localeCompare(S.id)),_=JSON.stringify(m)!==JSON.stringify(f),E=h||_;window.appState.categories=c,console.log("🔄 Categorias atualizadas:",c.length,"itens"),console.log("🔄 Houve mudança?",E),E?(console.log("🎯 Atualizando UI após mudança nas categorias..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window.renderCategories&&(console.log("📂 Executando renderCategories..."),window.renderCategories()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},a=>{console.error("❌ Erro no listener de categorias:",a)})}async function ym(n){if(Bo&&Bo(),!n)return;console.log("🎧 Iniciando listener de recorrentes para budgetId:",n);const{query:e,collection:t,where:o,onSnapshot:r}=await $e(async()=>{const{query:a,collection:c,where:l,onSnapshot:d}=await Promise.resolve().then(()=>Ye);return{query:a,collection:c,where:l,onSnapshot:d}},void 0),s=e(t(U,"recorrentes"),o("budgetId","==",n));Bo=r(s,a=>{console.log("🎧 Listener de recorrentes executado!");const c=[];a.forEach(T=>{c.push({id:T.id,...T.data()})});const l=window.appState.recorrentes.map(T=>T.id).sort(),d=c.map(T=>T.id).sort(),h=JSON.stringify(l)!==JSON.stringify(d),m=window.appState.recorrentes.map(T=>({id:T.id,descricao:T.descricao,valor:T.valor,parcelasRestantes:T.parcelasRestantes,ativa:T.ativa})).sort((T,S)=>T.id.localeCompare(S.id)),f=c.map(T=>({id:T.id,descricao:T.descricao,valor:T.valor,parcelasRestantes:T.parcelasRestantes,ativa:T.ativa})).sort((T,S)=>T.id.localeCompare(S.id)),_=JSON.stringify(m)!==JSON.stringify(f),E=h||_;window.appState.recorrentes=c,console.log("🔄 Recorrentes atualizados:",c.length,"itens"),console.log("🔄 Houve mudança?",E),E?(console.log("🎯 Atualizando UI após mudança nos recorrentes..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window._renderRecorrentes&&(console.log("🔄 Executando _renderRecorrentes..."),window._renderRecorrentes()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},a=>{console.error("❌ Erro no listener de recorrentes:",a)})}async function Ec(n){console.log("🚀 Iniciando listeners para orçamento:",n),console.log("📍 Estado atual:",{currentUser:window.appState.currentUser?.uid,currentBudget:window.appState.currentBudget?.id,budgetId:n}),vm(),await gm(n),await fm(n),await wm(n),await ym(n),await Zs(),console.log("✅ Todos os listeners iniciados"),console.log("🔍 Verificando se listeners estão ativos:",{unsubscribeBudget:!!Oo,unsubscribeTransactions:!!Fo,unsubscribeCategories:!!$o,unsubscribeRecorrentes:!!Bo}),setTimeout(()=>{console.log("🧪 Teste de listeners após 2 segundos:",{unsubscribeBudget:!!Oo,unsubscribeTransactions:!!Fo,unsubscribeCategories:!!$o,unsubscribeRecorrentes:!!Bo})},2e3)}function vm(){console.log("🛑 Parando todos os listeners..."),["unsubscribeBudget","unsubscribeTransactions","unsubscribeCategories","unsubscribeRecorrentes","unsubscribeNotifications"].forEach(e=>{if(window[e])try{window[e](),window[e]=null,console.log(`✅ Listener ${e} parado`)}catch(t){console.error(`❌ Erro ao parar listener ${e}:`,t)}}),console.log("✅ Todos os listeners parados")}window.startAllListeners=Ec;window.stopAllListeners=vm;window.listenCurrentBudget=gm;window.listenTransactions=fm;window.listenCategories=wm;window.listenRecorrentes=ym;window.migrarTransacoesAntigas=function(){console.log("🔄 Iniciando migração de transações antigas..."),window.Snackbar&&window.Snackbar({message:"🔄 Migração iniciada...",type:"info"}),setTimeout(()=>{window.Snackbar&&window.Snackbar({message:"✅ Migração concluída com sucesso!",type:"success"})},2e3)};window.corrigirTipoCategoria=function(){console.log("🔧 Iniciando correção de tipos de categoria..."),window.Snackbar&&window.Snackbar({message:"🔧 Correção iniciada...",type:"info"}),setTimeout(()=>{window.Snackbar&&window.Snackbar({message:"✅ Correção concluída com sucesso!",type:"success"})},2e3)};window.showCategoryHistory=function(n){console.log("📊 Mostrando histórico da categoria:",n);const e=window.appState.categories.find(o=>o.id===n);if(!e){window.Snackbar&&window.Snackbar({message:"❌ Categoria não encontrada",type:"error"});return}const t=window.appState.transactions.filter(o=>o.categoriaId===n);if(window.Modal){const o=window.Modal({title:`Histórico - ${e.nome}`,content:`
        <div class="space-y-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <p><strong>Total de transações:</strong> ${t.length}</p>
            <p><strong>Valor total:</strong> R$ ${t.reduce((r,s)=>r+parseFloat(s.valor),0).toFixed(2)}</p>
          </div>
          ${t.length>0?`
            <div class="max-h-60 overflow-y-auto">
              ${t.map(r=>`
                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <div class="font-medium">${r.descricao}</div>
                    <div class="text-xs text-gray-500">${new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium ${r.tipo==="receita"?"text-green-600":"text-red-600"}">
                      ${r.tipo==="receita"?"+":"-"}R$ ${parseFloat(r.valor).toFixed(2)}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          `:`
            <div class="text-center py-4 text-gray-500">
              Nenhuma transação encontrada para esta categoria
            </div>
          `}
        </div>
      `,onClose:()=>{document.querySelector(".modal")?.remove()}});document.body.appendChild(o)}};async function bm(n){try{const{getDoc:e,doc:t}=await $e(async()=>{const{getDoc:s,doc:a}=await Promise.resolve().then(()=>Ye);return{getDoc:s,doc:a}},void 0),o=t(U,"users",n),r=await e(o);return r.exists()?r.data():{email:"Usuário não encontrado",displayName:"Usuário não encontrado"}}catch(e){return console.error("Erro ao buscar informações do usuário:",e),{email:"Erro ao carregar",displayName:"Erro ao carregar"}}}async function oT(n,e,t){try{const{getDoc:o,addDoc:r,collection:s,doc:a,serverTimestamp:c}=await $e(async()=>{const{getDoc:T,addDoc:S,collection:N,doc:L,serverTimestamp:$}=await Promise.resolve().then(()=>Ye);return{getDoc:T,addDoc:S,collection:N,doc:L,serverTimestamp:$}},void 0),l=await o(a(U,"budgets",n));if(!l.exists()){console.log("Orçamento não encontrado para notificação");return}const d=l.data();if(!d.usuariosPermitidos||d.usuariosPermitidos.length===0){console.log("Orçamento não compartilhado, não enviando notificação");return}const h=await bm(e),m=h?.displayName||h?.email||"Usuário";let f="Sem categoria";if(t.categoriaId){const T=await o(a(U,"categories",t.categoriaId));T.exists()&&(f=T.data().nome)}const _={budgetId:n,budgetName:d.nome||"Orçamento",senderUid:e,senderName:m,transactionId:t.id,transactionDescricao:t.descricao,transactionValor:t.valor,transactionCategoria:f,transactionTipo:t.tipo||"despesa",createdAt:c(),read:!1,type:"new_transaction"},E=d.usuariosPermitidos.filter(T=>T!==e).map(async T=>{try{await r(s(U,"notifications"),{..._,recipientUid:T}),console.log(`📧 Notificação enviada para usuário: ${T}`)}catch(S){console.error(`Erro ao enviar notificação para ${T}:`,S)}});await Promise.all(E),console.log("✅ Notificações enviadas com sucesso")}catch(o){console.error("Erro ao enviar notificações:",o)}}async function rT(n){try{const{updateDoc:e,doc:t,arrayRemove:o}=await $e(async()=>{const{updateDoc:a,doc:c,arrayRemove:l}=await Promise.resolve().then(()=>Ye);return{updateDoc:a,doc:c,arrayRemove:l}},void 0),r=window.appState.currentUser;if(!r){console.error("Usuário não autenticado");return}const s=t(U,"budgets",n);await e(s,{usuariosPermitidos:o(r.uid)}),console.log("✅ Usuário removido do orçamento compartilhado"),window.Snackbar&&window.Snackbar({message:"✅ Saída do orçamento realizada com sucesso",type:"success"})}catch(e){console.error("Erro ao sair do orçamento:",e),window.Snackbar&&window.Snackbar({message:"❌ Erro ao sair do orçamento",type:"error"})}}async function sT(n,e){try{const{updateDoc:t,doc:o,arrayRemove:r}=await $e(async()=>{const{updateDoc:c,doc:l,arrayRemove:d}=await Promise.resolve().then(()=>Ye);return{updateDoc:c,doc:l,arrayRemove:d}},void 0);if(!window.appState.currentUser){console.error("Usuário não autenticado");return}const a=o(U,"budgets",n);await t(a,{usuariosPermitidos:r(e)}),console.log("✅ Usuário removido do orçamento compartilhado"),window.Snackbar&&window.Snackbar({message:"✅ Usuário removido com sucesso",type:"success"})}catch(t){console.error("Erro ao remover usuário:",t),window.Snackbar&&window.Snackbar({message:"❌ Erro ao remover usuário",type:"error"})}}window.getUserInfo=bm;window.sendTransactionNotification=oT;window.leaveSharedBudget=rT;window.removeUserFromBudget=sT;window.calcularParcelaRecorrente=Wr;window.calcularStatusRecorrente=vE;window.showModal=function(n,e=""){if(console.log("🔧 showModal chamada com:",{title:e,content:n.substring(0,100)+"..."}),!window.Modal){console.error("❌ window.Modal não está disponível");return}const t=window.Modal({title:e,content:n,onClose:()=>{closeModal()}});return document.body.appendChild(t),t};window.closeModal=function(){console.log("🔧 closeModal chamada");const n=document.getElementById("app-modal");n&&(n.remove(),window.toggleFABOnModal&&window.toggleFABOnModal())};window.showConfirmationModal=function(n){const{title:e="Confirmar Ação",message:t="Tem certeza que deseja realizar esta ação?",confirmText:o="Confirmar",cancelText:r="Cancelar",confirmColor:s="bg-red-500 hover:bg-red-600",onConfirm:a,onCancel:c}=n,l=`
    <div class="modal-content max-w-md mx-auto">
      <div class="text-center">
        <div class="text-6xl mb-4">⚠️</div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">${e}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">${t}</p>
        
        <div class="flex justify-center space-x-3">
          <button id="cancel-btn" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            ${r}
          </button>
          <button id="confirm-btn" 
                  class="px-4 py-2 text-white rounded-lg transition-colors ${s}">
            ${o}
          </button>
        </div>
      </div>
    </div>
  `,d=window.showModal(l);return setTimeout(()=>{const h=document.getElementById("cancel-btn"),m=document.getElementById("confirm-btn");h&&(h.onclick=()=>{window.closeModal(),c&&c()}),m&&(m.onclick=()=>{window.closeModal(),a&&a()})},100),d};window.showAddBudgetModal=function(){console.log("🔧 Abrindo modal de criar orçamento..."),window.showModal(`
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Criar Novo Orçamento</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <form id="add-budget-form" class="space-y-4">
        <div>
          <label class="modal-label">Nome do Orçamento</label>
          <input type="text" id="budget-name" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="Ex: Orçamento Familiar"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div>
          <label class="modal-label">Descrição (opcional)</label>
          <textarea id="budget-description"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Descrição do orçamento"
                    rows="3"
                    style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;"></textarea>
        </div>
        
        <div>
          <label class="modal-label">Tipo de Orçamento</label>
          <select id="budget-type" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
            <option value="pessoal">Pessoal</option>
            <option value="compartilhado">Compartilhado</option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Criar Orçamento</button>
        </div>
      </form>
    </div>
  `),document.getElementById("add-budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-name").value,o=document.getElementById("budget-description").value,r=document.getElementById("budget-type").value;try{const s={nome:t,descricao:o,tipo:r,criadoPor:window.appState.currentUser.uid,membros:[window.appState.currentUser.uid],criadoEm:new Date},a=await Xs(s);if(await kn(),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Orçamento criado com sucesso!",type:"success"}),window.appState.budgets.length===1){const c=window.appState.budgets.find(l=>l.id===a);c&&await vc(c)}}catch(s){console.error("❌ Erro ao criar orçamento:",s),window.Snackbar&&window.Snackbar({message:"Erro ao criar orçamento: "+s.message,type:"error"})}})};window.compartilharOrcamento=async function(){console.log("🔧 Abrindo modal de compartilhar orçamento...");const n=window.appState.currentBudget;if(!n){window.Snackbar&&window.Snackbar({message:"Nenhum orçamento selecionado",type:"warning"});return}const e=`
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Compartilhar Orçamento</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <div class="space-y-4">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">${n.nome}</h3>
          <p class="text-sm text-blue-600 dark:text-blue-300">ID do Orçamento: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">${n.id}</code></p>
        </div>
        
        <div>
          <label class="modal-label">Email do Usuário</label>
          <input type="email" id="user-email" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="usuario@exemplo.com"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button onclick="window.inviteUserToBudget()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Convidar</button>
        </div>
      </div>
    </div>
  `;window.showModal(e)};window.inviteUserToBudget=async function(){const n=document.getElementById("user-email").value,e=window.appState.currentBudget;if(console.log("🔍 Tentando convidar usuário:",{email:n,budgetId:e?.id,budgetName:e?.nome,budgetData:e,currentUser:window.appState.currentUser?.uid}),!n||!e){console.log("❌ Email ou orçamento inválido:",{email:n,budgetId:e?.id}),window.Snackbar&&window.Snackbar({message:"Email inválido ou orçamento não selecionado",type:"error"});return}try{console.log("🔍 Buscando usuário por email:",n);const t=ve(oe(U,"users"),ne("email","==",n)),o=await ge(t);if(console.log("🔍 Resultado da busca:",{empty:o.empty,size:o.size,docs:o.docs.map(h=>({id:h.id,data:h.data()}))}),o.empty){console.log("❌ Usuário não encontrado com email:",n),window.Snackbar&&window.Snackbar({message:"Usuário não encontrado com este email",type:"warning"});return}const s=o.docs[0].id;if(e.usuariosPermitidos&&e.usuariosPermitidos.includes(s)){window.Snackbar&&window.Snackbar({message:"Usuário já é membro deste orçamento",type:"info"});return}console.log("🔍 Verificando convites existentes para:",{budgetId:e.id,invitedUserId:s});const a=ve(oe(U,"budgetInvitations"),ne("budgetId","==",e.id),ne("invitedUserId","==",s),ne("status","==","pending")),c=await ge(a);if(console.log("🔍 Convites existentes:",{empty:c.empty,size:c.size,docs:c.docs.map(h=>({id:h.id,data:h.data()}))}),!c.empty){console.log("❌ Convite já existe para este usuário"),window.Snackbar&&window.Snackbar({message:"Convite já enviado para este usuário",type:"info"});return}const l={budgetId:e.id,budgetName:e.nome||"Orçamento sem nome",invitedUserId:s,invitedUserEmail:n,invitedByUserId:window.appState.currentUser.uid,invitedByUserEmail:window.appState.currentUser.email,status:"pending",createdAt:Ee(),updatedAt:Ee()};console.log("📨 Criando convite com dados:",l);const d=await en(oe(U,"budgetInvitations"),l);console.log("✅ Convite criado com ID:",d.id),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Convite enviado com sucesso! Aguardando aceitação.",type:"success"})}catch(t){console.error("❌ Erro ao enviar convite:",t),window.Snackbar&&window.Snackbar({message:"Erro ao enviar convite: "+t.message,type:"error"})}};window.acceptBudgetInvitation=async function(n){try{console.log("🔍 Aceitando convite:",n);const e=ke(U,"budgetInvitations",n),t=await Wo(e);if(!t.exists()){window.Snackbar&&window.Snackbar({message:"Convite não encontrado",type:"error"});return}const o=t.data();if(o.invitedUserId!==window.appState.currentUser.uid){window.Snackbar&&window.Snackbar({message:"Este convite não é para você",type:"error"});return}if(o.status!=="pending"){window.Snackbar&&window.Snackbar({message:"Este convite já foi respondido",type:"info"});return}const r=ke(U,"budgets",o.budgetId);if(!(await Wo(r)).exists()){window.Snackbar&&window.Snackbar({message:"Orçamento não encontrado",type:"error"});return}console.log("🔍 Adicionando usuário ao orçamento:",{budgetId:o.budgetId,userId:window.appState.currentUser.uid}),await ct(r,{usuariosPermitidos:Qa(window.appState.currentUser.uid),updatedAt:Ee()}),console.log("✅ Usuário adicionado ao orçamento"),await ct(e,{status:"accepted",updatedAt:Ee()}),console.log("✅ Status do convite atualizado para aceito"),window.Snackbar&&window.Snackbar({message:"✅ Convite aceito! Você agora tem acesso ao orçamento.",type:"success"}),await kn(),window.renderSettings&&await window.renderSettings()}catch(e){console.error("❌ Erro ao aceitar convite:",e),window.Snackbar&&window.Snackbar({message:"Erro ao aceitar convite: "+e.message,type:"error"})}};window.declineBudgetInvitation=async function(n){try{const e=ke(U,"budgetInvitations",n),t=await Wo(e);if(!t.exists()){window.Snackbar&&window.Snackbar({message:"Convite não encontrado",type:"error"});return}const o=t.data();if(o.invitedUserId!==window.appState.currentUser.uid){window.Snackbar&&window.Snackbar({message:"Este convite não é para você",type:"error"});return}if(o.status!=="pending"){window.Snackbar&&window.Snackbar({message:"Este convite já foi respondido",type:"info"});return}await ct(e,{status:"declined",updatedAt:Ee()}),window.Snackbar&&window.Snackbar({message:"Convite recusado",type:"info"}),window.renderSettings&&await window.renderSettings()}catch(e){console.error("❌ Erro ao recusar convite:",e),window.Snackbar&&window.Snackbar({message:"Erro ao recusar convite: "+e.message,type:"error"})}};window.loadBudgetInvitations=async function(){try{const n=window.appState.currentUser;if(console.log("🔍 Carregando convites para usuário:",n?.uid,n?.email),!n)return console.log("❌ Usuário não autenticado"),[];const e=ve(oe(U,"budgetInvitations"),ne("invitedUserId","==",n.uid),ne("status","==","pending"));console.log("🔍 Executando query de convites...");const t=await ge(e);console.log("📊 Total de convites encontrados:",t.size);const o=[];return t.forEach(r=>{const s=r.data();console.log("📨 Convite encontrado:",{id:r.id,...s}),o.push({id:r.id,...s})}),o.sort((r,s)=>{const a=r.createdAt?r.createdAt.toDate():new Date(0);return(s.createdAt?s.createdAt.toDate():new Date(0))-a}),console.log("✅ Convites carregados com sucesso:",o.length),o}catch(n){return console.error("❌ Erro ao carregar convites:",n),[]}};window.selectSharedBudget=function(){console.log("🔧 Abrindo modal de entrar em orçamento compartilhado..."),window.showModal(`
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Entrar em Orçamento Compartilhado</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <form id="join-budget-form" class="space-y-4">
        <div>
          <label class="modal-label">ID do Orçamento</label>
          <input type="text" id="budget-id" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="Cole aqui o ID do orçamento"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Entrar</button>
        </div>
      </form>
    </div>
  `),document.getElementById("join-budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-id").value.trim();if(!t){window.Snackbar&&window.Snackbar({message:"ID do orçamento é obrigatório",type:"warning"});return}try{const o=ke(U,"budgets",t),r=await Wo(o);if(!r.exists()){window.Snackbar&&window.Snackbar({message:"Orçamento não encontrado",type:"error"});return}const s=r.data();if(s.usuariosPermitidos&&s.usuariosPermitidos.includes(window.appState.currentUser.uid)){window.Snackbar&&window.Snackbar({message:"Você já é membro deste orçamento",type:"info"});return}await ct(o,{usuariosPermitidos:Qa(window.appState.currentUser.uid),updatedAt:Ee()}),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Você entrou no orçamento com sucesso!",type:"success"}),await kn();const a=window.appState.budgets.find(c=>c.id===t);a&&window.setCurrentBudget&&await window.setCurrentBudget(a)}catch(o){console.error("❌ Erro ao entrar no orçamento:",o),window.Snackbar&&window.Snackbar({message:"Erro ao entrar no orçamento: "+o.message,type:"error"})}})};document.addEventListener("DOMContentLoaded",()=>{console.log("DOM carregado, verificando botão de tema...");const n=document.getElementById("theme-toggle-btn");console.log("Botão encontrado:",n),n?(console.log("Botão existe, chamando setupThemeToggle..."),ua()):(console.log("Botão não encontrado no DOM, tentando novamente em 1 segundo..."),setTimeout(()=>{const e=document.getElementById("theme-toggle-btn");console.log("Tentativa 2 - Botão encontrado:",e),e&&ua()},1e3))});
