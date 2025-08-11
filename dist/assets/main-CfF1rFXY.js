(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const Yp="modulepreload",Jp=function(n){return"/"+n},Qc={},Be=function(e,t,r){let o=Promise.resolve();if(t&&t.length>0){let u=function(p){return Promise.all(p.map(g=>Promise.resolve(g).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};var a=u;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=u(t.map(p=>{if(p=Jp(p),p in Qc)return;Qc[p]=!0;const g=p.endsWith(".css"),m=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${m}`))return;const T=document.createElement("link");if(T.rel=g?"stylesheet":Yp,g||(T.as="script"),T.crossOrigin="",T.href=p,c&&T.setAttribute("nonce",c),document.head.appendChild(T),g)return new Promise((I,_)=>{T.addEventListener("load",I),T.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${p}`)))})}))}function s(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return o.then(l=>{for(const c of l||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})};function Yt({title:n="",content:e="",onClose:t=null}){console.log("🔧 Modal sendo criado com:",{title:n,content:e.substring(0,100)+"..."});const r=document.createElement("div");r.id="app-modal",r.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",r.onclick=s=>{s.target===r&&t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()};const o=document.createElement("div");return o.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",o.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,r.appendChild(o),o.querySelector("#modal-close-btn").onclick=s=>{s.stopPropagation(),t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()},window.toggleFABOnModal&&window.toggleFABOnModal(),console.log("🔧 Modal criado:",r),console.log("🔧 Modal HTML:",r.outerHTML.substring(0,200)+"..."),r}function Zp({onSubmit:n,initialData:e={}}){const t=document.createElement("form");t.className="space-y-4",t.innerHTML=`
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
        ${(window.appState.categories||[]).sort((o,s)=>o.nome.localeCompare(s.nome,"pt-BR",{sensitivity:"base"})).map(o=>{const s=new Date,a=s.getFullYear(),l=s.getMonth()+1,u=(window.appState.transactions||[]).filter(T=>{if(T.categoriaId!==o.id||T.tipo!==o.tipo)return!1;let I;T.createdAt&&typeof T.createdAt=="object"&&T.createdAt.seconds?I=new Date(T.createdAt.seconds*1e3):I=new Date(T.createdAt);const _=I.getFullYear(),k=I.getMonth()+1;return _===a&&k===l}).reduce((T,I)=>T+parseFloat(I.valor),0),p=parseFloat(o.limite||0),g=o.tipo==="receita"?u:p-u;let m=o.nome;return p>0&&(m+=` - Limite: R$ ${p.toFixed(2)}`,o.tipo==="despesa"?m+=` (Disponível: R$ ${Math.max(0,g).toFixed(2)})`:m+=` (Recebido: R$ ${u.toFixed(2)})`),`<option value="${o.id}" ${e.categoriaId===o.id?"selected":""} style="background-color: var(--option-bg, #ffffff); color: var(--option-text, #1f2937); font-weight: 500; padding: 8px;">${m}</option>`}).join("")}
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
  `;function r(){const o=document.getElementById("rec-valor"),s=document.getElementById("rec-parcelas"),a=t.querySelector('input[name="tipo-valor"]:checked'),l=o&&parseFloat(o.value)||0,c=s&&parseInt(s.value)||0,u=a?a.value:"total",p=document.getElementById("recorrente-valores-info");if(c>1&&l>0)if(u==="total"){const g=l/c;p.innerHTML=`<b>Valor total:</b> R$ ${l.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${g.toFixed(2)}`}else{const g=l*c;p.innerHTML=`<b>Valor total:</b> R$ ${g.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${l.toFixed(2)}`}else l>0?p.innerHTML=`<b>Valor:</b> R$ ${l.toFixed(2)}`:p.innerHTML=""}return t.querySelector("#rec-valor").addEventListener("input",r),t.querySelector("#rec-parcelas").addEventListener("input",r),t.querySelectorAll('input[name="tipo-valor"]').forEach(o=>{o.addEventListener("change",r)}),setTimeout(()=>{if(r(),!t.querySelector('input[name="tipo-valor"]:checked')){const a=t.querySelector('input[name="tipo-valor"][value="total"]');a&&(a.checked=!0,a.dispatchEvent(new Event("change")))}const s=t.querySelector("#rec-efetivar");if(s){const a=e.efetivarMesAtual===!0||e.efetivarMesAtual==="true";s.checked=a}},100),t.addEventListener("submit",o=>{o.preventDefault();const s=parseFloat(document.getElementById("rec-valor").value);let a=document.getElementById("rec-parcelas").value?parseInt(document.getElementById("rec-parcelas").value):null;a!==null&&a<1&&(a=null);const l=t.querySelector('input[name="tipo-valor"]:checked').value;let c=s,u=s;a&&a>1?l==="total"?(c=+(s/a).toFixed(2),u=+(c.toFixed(2)*a).toFixed(2)):(c=+s.toFixed(2),u=+(c*a).toFixed(2)):(c=+s.toFixed(2),u=+s.toFixed(2));const p={descricao:document.getElementById("rec-desc").value,valor:c,valorTotal:u,categoriaId:document.getElementById("rec-categoria").value,dataInicio:document.getElementById("rec-data").value,parcelasRestantes:a,parcelasTotal:a,ativa:!0,efetivarMesAtual:document.getElementById("rec-efetivar").checked};n(p)}),t}const ef=()=>{};var Yc={};/**
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
 */const Ad=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let o=n.charCodeAt(r);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(o=65536+((o&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},tf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const o=n[t++];if(o<128)e[r++]=String.fromCharCode(o);else if(o>191&&o<224){const s=n[t++];e[r++]=String.fromCharCode((o&31)<<6|s&63)}else if(o>239&&o<365){const s=n[t++],a=n[t++],l=n[t++],c=((o&7)<<18|(s&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((o&15)<<12|(s&63)<<6|a&63)}}return e.join("")},kd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<n.length;o+=3){const s=n[o],a=o+1<n.length,l=a?n[o+1]:0,c=o+2<n.length,u=c?n[o+2]:0,p=s>>2,g=(s&3)<<4|l>>4;let m=(l&15)<<2|u>>6,T=u&63;c||(T=64,a||(m=64)),r.push(t[p],t[g],t[m],t[T])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ad(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):tf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<n.length;){const s=t[n.charAt(o++)],l=o<n.length?t[n.charAt(o)]:0;++o;const u=o<n.length?t[n.charAt(o)]:64;++o;const g=o<n.length?t[n.charAt(o)]:64;if(++o,s==null||l==null||u==null||g==null)throw new nf;const m=s<<2|l>>4;if(r.push(m),u!==64){const T=l<<4&240|u>>2;if(r.push(T),g!==64){const I=u<<6&192|g;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class nf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const rf=function(n){const e=Ad(n);return kd.encodeByteArray(e,!0)},$o=function(n){return rf(n).replace(/\./g,"")},Rd=function(n){try{return kd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function of(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const sf=()=>of().__FIREBASE_DEFAULTS__,af=()=>{if(typeof process>"u"||typeof Yc>"u")return;const n=Yc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},cf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Rd(n[1]);return e&&JSON.parse(e)},is=()=>{try{return ef()||sf()||af()||cf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Cd=n=>is()?.emulatorHosts?.[n],lf=n=>{const e=Cd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Pd=()=>is()?.config,Dd=n=>is()?.[`_${n}`];/**
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
 */class df{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Gn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Nd(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function uf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",o=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:o,exp:o+3600,auth_time:o,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[$o(JSON.stringify(t)),$o(JSON.stringify(a)),""].join(".")}const wr={};function hf(){const n={prod:[],emulator:[]};for(const e of Object.keys(wr))wr[e]?n.emulator.push(e):n.prod.push(e);return n}function pf(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Jc=!1;function Md(n,e){if(typeof window>"u"||typeof document>"u"||!Gn(window.location.host)||wr[n]===e||wr[n]||Jc)return;wr[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=hf().prod.length>0;function a(){const m=document.getElementById(r);m&&m.remove()}function l(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function c(m,T){m.setAttribute("width","24"),m.setAttribute("id",T),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function u(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{Jc=!0,a()},m}function p(m,T){m.setAttribute("id",T),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function g(){const m=pf(r),T=t("text"),I=document.getElementById(T)||document.createElement("span"),_=t("learnmore"),k=document.getElementById(_)||document.createElement("a"),N=t("preprendIcon"),L=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const $=m.element;l($),p(k,_);const te=u();c(L,N),$.append(L,I,k,te),document.body.appendChild($)}s?(I.innerText="Preview backend disconnected.",L.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,I.innerText="Preview backend running in this workspace."),I.setAttribute("id",T)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
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
 */function Ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ff(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())}function gf(){const n=is()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function mf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function wf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function yf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vf(){const n=Ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function bf(){return!gf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function _f(){try{return typeof indexedDB=="object"}catch{return!1}}function Ef(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{e(o.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const xf="FirebaseError";class St extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=xf,Object.setPrototypeOf(this,St.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ur.prototype.create)}}class Ur{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},o=`${this.service}/${e}`,s=this.errors[e],a=s?Tf(s,r):"Error",l=`${this.serviceName}: ${a} (${o}).`;return new St(o,l,r)}}function Tf(n,e){return n.replace(If,(t,r)=>{const o=e[r];return o!=null?String(o):`<${r}?>`})}const If=/\{\$([^}]+)}/g;function Sf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function _t(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const o of t){if(!r.includes(o))return!1;const s=n[o],a=e[o];if(Zc(s)&&Zc(a)){if(!_t(s,a))return!1}else if(s!==a)return!1}for(const o of r)if(!t.includes(o))return!1;return!0}function Zc(n){return n!==null&&typeof n=="object"}/**
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
 */function qr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Af(n,e){const t=new kf(n,e);return t.subscribe.bind(t)}class kf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let o;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Rf(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:r},o.next===void 0&&(o.next=ai),o.error===void 0&&(o.error=ai),o.complete===void 0&&(o.complete=ai);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Rf(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ai(){}/**
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
 */function ke(n){return n&&n._delegate?n._delegate:n}class ln{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const on="[DEFAULT]";/**
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
 */class Cf{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new df;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Df(e))try{this.getOrInitializeService({instanceIdentifier:on})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:o});r.resolve(s)}catch{}}}}clearInstance(e=on){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=on){return this.instances.has(e)}getOptions(e=on){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&a.resolve(o)}return o}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),o=this.onInitCallbacks.get(r)??new Set;o.add(e),this.onInitCallbacks.set(r,o);const s=this.instances.get(r);return s&&e(s,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const o of r)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Pf(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=on){return this.component?this.component.multipleInstances?e:on:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Pf(n){return n===on?void 0:n}function Df(n){return n.instantiationMode==="EAGER"}/**
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
 */class Nf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Cf(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var X;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(X||(X={}));const Mf={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},Vf=X.INFO,Lf={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},Of=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),o=Lf[e];if(o)console[o](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Hi{constructor(e){this.name=e,this._logLevel=Vf,this._logHandler=Of,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in X))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...e),this._logHandler(this,X.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...e),this._logHandler(this,X.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,X.INFO,...e),this._logHandler(this,X.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,X.WARN,...e),this._logHandler(this,X.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...e),this._logHandler(this,X.ERROR,...e)}}const Ff=(n,e)=>e.some(t=>n instanceof t);let el,tl;function $f(){return el||(el=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bf(){return tl||(tl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Vd=new WeakMap,bi=new WeakMap,Ld=new WeakMap,ci=new WeakMap,Gi=new WeakMap;function Uf(n){const e=new Promise((t,r)=>{const o=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Lt(n.result)),o()},a=()=>{r(n.error),o()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Vd.set(t,n)}).catch(()=>{}),Gi.set(e,n),e}function qf(n){if(bi.has(n))return;const e=new Promise((t,r)=>{const o=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),o()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),o()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});bi.set(n,e)}let _i={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return bi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Ld.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Lt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jf(n){_i=n(_i)}function zf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(li(this),e,...t);return Ld.set(r,e.sort?e.sort():[e]),Lt(r)}:Bf().includes(n)?function(...e){return n.apply(li(this),e),Lt(Vd.get(this))}:function(...e){return Lt(n.apply(li(this),e))}}function Hf(n){return typeof n=="function"?zf(n):(n instanceof IDBTransaction&&qf(n),Ff(n,$f())?new Proxy(n,_i):n)}function Lt(n){if(n instanceof IDBRequest)return Uf(n);if(ci.has(n))return ci.get(n);const e=Hf(n);return e!==n&&(ci.set(n,e),Gi.set(e,n)),e}const li=n=>Gi.get(n);function Gf(n,e,{blocked:t,upgrade:r,blocking:o,terminated:s}={}){const a=indexedDB.open(n,e),l=Lt(a);return r&&a.addEventListener("upgradeneeded",c=>{r(Lt(a.result),c.oldVersion,c.newVersion,Lt(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{s&&c.addEventListener("close",()=>s()),o&&c.addEventListener("versionchange",u=>o(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const Wf=["get","getKey","getAll","getAllKeys","count"],Kf=["put","add","delete","clear"],di=new Map;function nl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(di.get(e))return di.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,o=Kf.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(o||Wf.includes(t)))return;const s=async function(a,...l){const c=this.transaction(a,o?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[t](...l),o&&c.done]))[0]};return di.set(e,s),s}jf(n=>({...n,get:(e,t,r)=>nl(e,t)||n.get(e,t,r),has:(e,t)=>!!nl(e,t)||n.has(e,t)}));/**
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
 */class Xf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Qf(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Qf(n){return n.getComponent()?.type==="VERSION"}const Ei="@firebase/app",rl="0.14.0";/**
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
 */const Et=new Hi("@firebase/app"),Yf="@firebase/app-compat",Jf="@firebase/analytics-compat",Zf="@firebase/analytics",eg="@firebase/app-check-compat",tg="@firebase/app-check",ng="@firebase/auth",rg="@firebase/auth-compat",og="@firebase/database",sg="@firebase/data-connect",ig="@firebase/database-compat",ag="@firebase/functions",cg="@firebase/functions-compat",lg="@firebase/installations",dg="@firebase/installations-compat",ug="@firebase/messaging",hg="@firebase/messaging-compat",pg="@firebase/performance",fg="@firebase/performance-compat",gg="@firebase/remote-config",mg="@firebase/remote-config-compat",wg="@firebase/storage",yg="@firebase/storage-compat",vg="@firebase/firestore",bg="@firebase/ai",_g="@firebase/firestore-compat",Eg="firebase",xg="12.0.0";/**
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
 */const xi="[DEFAULT]",Tg={[Ei]:"fire-core",[Yf]:"fire-core-compat",[Zf]:"fire-analytics",[Jf]:"fire-analytics-compat",[tg]:"fire-app-check",[eg]:"fire-app-check-compat",[ng]:"fire-auth",[rg]:"fire-auth-compat",[og]:"fire-rtdb",[sg]:"fire-data-connect",[ig]:"fire-rtdb-compat",[ag]:"fire-fn",[cg]:"fire-fn-compat",[lg]:"fire-iid",[dg]:"fire-iid-compat",[ug]:"fire-fcm",[hg]:"fire-fcm-compat",[pg]:"fire-perf",[fg]:"fire-perf-compat",[gg]:"fire-rc",[mg]:"fire-rc-compat",[wg]:"fire-gcs",[yg]:"fire-gcs-compat",[vg]:"fire-fst",[_g]:"fire-fst-compat",[bg]:"fire-vertex","fire-js":"fire-js",[Eg]:"fire-js-all"};/**
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
 */const Bo=new Map,Ig=new Map,Ti=new Map;function ol(n,e){try{n.container.addComponent(e)}catch(t){Et.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ln(n){const e=n.name;if(Ti.has(e))return Et.debug(`There were multiple attempts to register component ${e}.`),!1;Ti.set(e,n);for(const t of Bo.values())ol(t,n);for(const t of Ig.values())ol(t,n);return!0}function Wi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Je(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Sg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ot=new Ur("app","Firebase",Sg);/**
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
 */class Ag{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ln("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ot.create("app-deleted",{appName:this._name})}}/**
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
 */const Wn=xg;function Od(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:xi,automaticDataCollectionEnabled:!0,...e},o=r.name;if(typeof o!="string"||!o)throw Ot.create("bad-app-name",{appName:String(o)});if(t||(t=Pd()),!t)throw Ot.create("no-options");const s=Bo.get(o);if(s){if(_t(t,s.options)&&_t(r,s.config))return s;throw Ot.create("duplicate-app",{appName:o})}const a=new Nf(o);for(const c of Ti.values())a.addComponent(c);const l=new Ag(t,r,a);return Bo.set(o,l),l}function Fd(n=xi){const e=Bo.get(n);if(!e&&n===xi&&Pd())return Od();if(!e)throw Ot.create("no-app",{appName:n});return e}function Ft(n,e,t){let r=Tg[n]??n;t&&(r+=`-${t}`);const o=r.match(/\s|\//),s=e.match(/\s|\//);if(o||s){const a=[`Unable to register library "${r}" with version "${e}":`];o&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Et.warn(a.join(" "));return}Ln(new ln(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const kg="firebase-heartbeat-database",Rg=1,Rr="firebase-heartbeat-store";let ui=null;function $d(){return ui||(ui=Gf(kg,Rg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Rr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ot.create("idb-open",{originalErrorMessage:n.message})})),ui}async function Cg(n){try{const t=(await $d()).transaction(Rr),r=await t.objectStore(Rr).get(Bd(n));return await t.done,r}catch(e){if(e instanceof St)Et.warn(e.message);else{const t=Ot.create("idb-get",{originalErrorMessage:e?.message});Et.warn(t.message)}}}async function sl(n,e){try{const r=(await $d()).transaction(Rr,"readwrite");await r.objectStore(Rr).put(e,Bd(n)),await r.done}catch(t){if(t instanceof St)Et.warn(t.message);else{const r=Ot.create("idb-set",{originalErrorMessage:t?.message});Et.warn(r.message)}}}function Bd(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Pg=1024,Dg=30;class Ng{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Vg(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=il();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Dg){const o=Lg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Et.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=il(),{heartbeatsToSend:t,unsentEntries:r}=Mg(this._heartbeatsCache.heartbeats),o=$o(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Et.warn(e),""}}}function il(){return new Date().toISOString().substring(0,10)}function Mg(n,e=Pg){const t=[];let r=n.slice();for(const o of n){const s=t.find(a=>a.agent===o.agent);if(s){if(s.dates.push(o.date),al(t)>e){s.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),al(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Vg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _f()?Ef().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Cg(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function al(n){return $o(JSON.stringify({version:2,heartbeats:n})).length}function Lg(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Og(n){Ln(new ln("platform-logger",e=>new Xf(e),"PRIVATE")),Ln(new ln("heartbeat",e=>new Ng(e),"PRIVATE")),Ft(Ei,rl,n),Ft(Ei,rl,"esm2020"),Ft("fire-js","")}Og("");var cl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $t,Ud;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,w){function y(){}y.prototype=w.prototype,v.D=w.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(E,x,S){for(var b=Array(arguments.length-2),D=2;D<arguments.length;D++)b[D-2]=arguments[D];return w.prototype[x].apply(E,b)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(v,w,y){y||(y=0);var E=Array(16);if(typeof w=="string")for(var x=0;16>x;++x)E[x]=w.charCodeAt(y++)|w.charCodeAt(y++)<<8|w.charCodeAt(y++)<<16|w.charCodeAt(y++)<<24;else for(x=0;16>x;++x)E[x]=w[y++]|w[y++]<<8|w[y++]<<16|w[y++]<<24;w=v.g[0],y=v.g[1],x=v.g[2];var S=v.g[3],b=w+(S^y&(x^S))+E[0]+3614090360&4294967295;w=y+(b<<7&4294967295|b>>>25),b=S+(x^w&(y^x))+E[1]+3905402710&4294967295,S=w+(b<<12&4294967295|b>>>20),b=x+(y^S&(w^y))+E[2]+606105819&4294967295,x=S+(b<<17&4294967295|b>>>15),b=y+(w^x&(S^w))+E[3]+3250441966&4294967295,y=x+(b<<22&4294967295|b>>>10),b=w+(S^y&(x^S))+E[4]+4118548399&4294967295,w=y+(b<<7&4294967295|b>>>25),b=S+(x^w&(y^x))+E[5]+1200080426&4294967295,S=w+(b<<12&4294967295|b>>>20),b=x+(y^S&(w^y))+E[6]+2821735955&4294967295,x=S+(b<<17&4294967295|b>>>15),b=y+(w^x&(S^w))+E[7]+4249261313&4294967295,y=x+(b<<22&4294967295|b>>>10),b=w+(S^y&(x^S))+E[8]+1770035416&4294967295,w=y+(b<<7&4294967295|b>>>25),b=S+(x^w&(y^x))+E[9]+2336552879&4294967295,S=w+(b<<12&4294967295|b>>>20),b=x+(y^S&(w^y))+E[10]+4294925233&4294967295,x=S+(b<<17&4294967295|b>>>15),b=y+(w^x&(S^w))+E[11]+2304563134&4294967295,y=x+(b<<22&4294967295|b>>>10),b=w+(S^y&(x^S))+E[12]+1804603682&4294967295,w=y+(b<<7&4294967295|b>>>25),b=S+(x^w&(y^x))+E[13]+4254626195&4294967295,S=w+(b<<12&4294967295|b>>>20),b=x+(y^S&(w^y))+E[14]+2792965006&4294967295,x=S+(b<<17&4294967295|b>>>15),b=y+(w^x&(S^w))+E[15]+1236535329&4294967295,y=x+(b<<22&4294967295|b>>>10),b=w+(x^S&(y^x))+E[1]+4129170786&4294967295,w=y+(b<<5&4294967295|b>>>27),b=S+(y^x&(w^y))+E[6]+3225465664&4294967295,S=w+(b<<9&4294967295|b>>>23),b=x+(w^y&(S^w))+E[11]+643717713&4294967295,x=S+(b<<14&4294967295|b>>>18),b=y+(S^w&(x^S))+E[0]+3921069994&4294967295,y=x+(b<<20&4294967295|b>>>12),b=w+(x^S&(y^x))+E[5]+3593408605&4294967295,w=y+(b<<5&4294967295|b>>>27),b=S+(y^x&(w^y))+E[10]+38016083&4294967295,S=w+(b<<9&4294967295|b>>>23),b=x+(w^y&(S^w))+E[15]+3634488961&4294967295,x=S+(b<<14&4294967295|b>>>18),b=y+(S^w&(x^S))+E[4]+3889429448&4294967295,y=x+(b<<20&4294967295|b>>>12),b=w+(x^S&(y^x))+E[9]+568446438&4294967295,w=y+(b<<5&4294967295|b>>>27),b=S+(y^x&(w^y))+E[14]+3275163606&4294967295,S=w+(b<<9&4294967295|b>>>23),b=x+(w^y&(S^w))+E[3]+4107603335&4294967295,x=S+(b<<14&4294967295|b>>>18),b=y+(S^w&(x^S))+E[8]+1163531501&4294967295,y=x+(b<<20&4294967295|b>>>12),b=w+(x^S&(y^x))+E[13]+2850285829&4294967295,w=y+(b<<5&4294967295|b>>>27),b=S+(y^x&(w^y))+E[2]+4243563512&4294967295,S=w+(b<<9&4294967295|b>>>23),b=x+(w^y&(S^w))+E[7]+1735328473&4294967295,x=S+(b<<14&4294967295|b>>>18),b=y+(S^w&(x^S))+E[12]+2368359562&4294967295,y=x+(b<<20&4294967295|b>>>12),b=w+(y^x^S)+E[5]+4294588738&4294967295,w=y+(b<<4&4294967295|b>>>28),b=S+(w^y^x)+E[8]+2272392833&4294967295,S=w+(b<<11&4294967295|b>>>21),b=x+(S^w^y)+E[11]+1839030562&4294967295,x=S+(b<<16&4294967295|b>>>16),b=y+(x^S^w)+E[14]+4259657740&4294967295,y=x+(b<<23&4294967295|b>>>9),b=w+(y^x^S)+E[1]+2763975236&4294967295,w=y+(b<<4&4294967295|b>>>28),b=S+(w^y^x)+E[4]+1272893353&4294967295,S=w+(b<<11&4294967295|b>>>21),b=x+(S^w^y)+E[7]+4139469664&4294967295,x=S+(b<<16&4294967295|b>>>16),b=y+(x^S^w)+E[10]+3200236656&4294967295,y=x+(b<<23&4294967295|b>>>9),b=w+(y^x^S)+E[13]+681279174&4294967295,w=y+(b<<4&4294967295|b>>>28),b=S+(w^y^x)+E[0]+3936430074&4294967295,S=w+(b<<11&4294967295|b>>>21),b=x+(S^w^y)+E[3]+3572445317&4294967295,x=S+(b<<16&4294967295|b>>>16),b=y+(x^S^w)+E[6]+76029189&4294967295,y=x+(b<<23&4294967295|b>>>9),b=w+(y^x^S)+E[9]+3654602809&4294967295,w=y+(b<<4&4294967295|b>>>28),b=S+(w^y^x)+E[12]+3873151461&4294967295,S=w+(b<<11&4294967295|b>>>21),b=x+(S^w^y)+E[15]+530742520&4294967295,x=S+(b<<16&4294967295|b>>>16),b=y+(x^S^w)+E[2]+3299628645&4294967295,y=x+(b<<23&4294967295|b>>>9),b=w+(x^(y|~S))+E[0]+4096336452&4294967295,w=y+(b<<6&4294967295|b>>>26),b=S+(y^(w|~x))+E[7]+1126891415&4294967295,S=w+(b<<10&4294967295|b>>>22),b=x+(w^(S|~y))+E[14]+2878612391&4294967295,x=S+(b<<15&4294967295|b>>>17),b=y+(S^(x|~w))+E[5]+4237533241&4294967295,y=x+(b<<21&4294967295|b>>>11),b=w+(x^(y|~S))+E[12]+1700485571&4294967295,w=y+(b<<6&4294967295|b>>>26),b=S+(y^(w|~x))+E[3]+2399980690&4294967295,S=w+(b<<10&4294967295|b>>>22),b=x+(w^(S|~y))+E[10]+4293915773&4294967295,x=S+(b<<15&4294967295|b>>>17),b=y+(S^(x|~w))+E[1]+2240044497&4294967295,y=x+(b<<21&4294967295|b>>>11),b=w+(x^(y|~S))+E[8]+1873313359&4294967295,w=y+(b<<6&4294967295|b>>>26),b=S+(y^(w|~x))+E[15]+4264355552&4294967295,S=w+(b<<10&4294967295|b>>>22),b=x+(w^(S|~y))+E[6]+2734768916&4294967295,x=S+(b<<15&4294967295|b>>>17),b=y+(S^(x|~w))+E[13]+1309151649&4294967295,y=x+(b<<21&4294967295|b>>>11),b=w+(x^(y|~S))+E[4]+4149444226&4294967295,w=y+(b<<6&4294967295|b>>>26),b=S+(y^(w|~x))+E[11]+3174756917&4294967295,S=w+(b<<10&4294967295|b>>>22),b=x+(w^(S|~y))+E[2]+718787259&4294967295,x=S+(b<<15&4294967295|b>>>17),b=y+(S^(x|~w))+E[9]+3951481745&4294967295,v.g[0]=v.g[0]+w&4294967295,v.g[1]=v.g[1]+(x+(b<<21&4294967295|b>>>11))&4294967295,v.g[2]=v.g[2]+x&4294967295,v.g[3]=v.g[3]+S&4294967295}r.prototype.u=function(v,w){w===void 0&&(w=v.length);for(var y=w-this.blockSize,E=this.B,x=this.h,S=0;S<w;){if(x==0)for(;S<=y;)o(this,v,S),S+=this.blockSize;if(typeof v=="string"){for(;S<w;)if(E[x++]=v.charCodeAt(S++),x==this.blockSize){o(this,E),x=0;break}}else for(;S<w;)if(E[x++]=v[S++],x==this.blockSize){o(this,E),x=0;break}}this.h=x,this.o+=w},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var w=1;w<v.length-8;++w)v[w]=0;var y=8*this.o;for(w=v.length-8;w<v.length;++w)v[w]=y&255,y/=256;for(this.u(v),v=Array(16),w=y=0;4>w;++w)for(var E=0;32>E;E+=8)v[y++]=this.g[w]>>>E&255;return v};function s(v,w){var y=l;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=w(v)}function a(v,w){this.h=w;for(var y=[],E=!0,x=v.length-1;0<=x;x--){var S=v[x]|0;E&&S==w||(y[x]=S,E=!1)}this.g=y}var l={};function c(v){return-128<=v&&128>v?s(v,function(w){return new a([w|0],0>w?-1:0)}):new a([v|0],0>v?-1:0)}function u(v){if(isNaN(v)||!isFinite(v))return g;if(0>v)return k(u(-v));for(var w=[],y=1,E=0;v>=y;E++)w[E]=v/y|0,y*=4294967296;return new a(w,0)}function p(v,w){if(v.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(v.charAt(0)=="-")return k(p(v.substring(1),w));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=u(Math.pow(w,8)),E=g,x=0;x<v.length;x+=8){var S=Math.min(8,v.length-x),b=parseInt(v.substring(x,x+S),w);8>S?(S=u(Math.pow(w,S)),E=E.j(S).add(u(b))):(E=E.j(y),E=E.add(u(b)))}return E}var g=c(0),m=c(1),T=c(16777216);n=a.prototype,n.m=function(){if(_(this))return-k(this).m();for(var v=0,w=1,y=0;y<this.g.length;y++){var E=this.i(y);v+=(0<=E?E:4294967296+E)*w,w*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(I(this))return"0";if(_(this))return"-"+k(this).toString(v);for(var w=u(Math.pow(v,6)),y=this,E="";;){var x=te(y,w).g;y=N(y,x.j(w));var S=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=x,I(y))return S+E;for(;6>S.length;)S="0"+S;E=S+E}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function I(v){if(v.h!=0)return!1;for(var w=0;w<v.g.length;w++)if(v.g[w]!=0)return!1;return!0}function _(v){return v.h==-1}n.l=function(v){return v=N(this,v),_(v)?-1:I(v)?0:1};function k(v){for(var w=v.g.length,y=[],E=0;E<w;E++)y[E]=~v.g[E];return new a(y,~v.h).add(m)}n.abs=function(){return _(this)?k(this):this},n.add=function(v){for(var w=Math.max(this.g.length,v.g.length),y=[],E=0,x=0;x<=w;x++){var S=E+(this.i(x)&65535)+(v.i(x)&65535),b=(S>>>16)+(this.i(x)>>>16)+(v.i(x)>>>16);E=b>>>16,S&=65535,b&=65535,y[x]=b<<16|S}return new a(y,y[y.length-1]&-2147483648?-1:0)};function N(v,w){return v.add(k(w))}n.j=function(v){if(I(this)||I(v))return g;if(_(this))return _(v)?k(this).j(k(v)):k(k(this).j(v));if(_(v))return k(this.j(k(v)));if(0>this.l(T)&&0>v.l(T))return u(this.m()*v.m());for(var w=this.g.length+v.g.length,y=[],E=0;E<2*w;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var x=0;x<v.g.length;x++){var S=this.i(E)>>>16,b=this.i(E)&65535,D=v.i(x)>>>16,W=v.i(x)&65535;y[2*E+2*x]+=b*W,L(y,2*E+2*x),y[2*E+2*x+1]+=S*W,L(y,2*E+2*x+1),y[2*E+2*x+1]+=b*D,L(y,2*E+2*x+1),y[2*E+2*x+2]+=S*D,L(y,2*E+2*x+2)}for(E=0;E<w;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=w;E<2*w;E++)y[E]=0;return new a(y,0)};function L(v,w){for(;(v[w]&65535)!=v[w];)v[w+1]+=v[w]>>>16,v[w]&=65535,w++}function $(v,w){this.g=v,this.h=w}function te(v,w){if(I(w))throw Error("division by zero");if(I(v))return new $(g,g);if(_(v))return w=te(k(v),w),new $(k(w.g),k(w.h));if(_(w))return w=te(v,k(w)),new $(k(w.g),w.h);if(30<v.g.length){if(_(v)||_(w))throw Error("slowDivide_ only works with positive integers.");for(var y=m,E=w;0>=E.l(v);)y=Z(y),E=Z(E);var x=oe(y,1),S=oe(E,1);for(E=oe(E,2),y=oe(y,2);!I(E);){var b=S.add(E);0>=b.l(v)&&(x=x.add(y),S=b),E=oe(E,1),y=oe(y,1)}return w=N(v,x.j(w)),new $(x,w)}for(x=g;0<=v.l(w);){for(y=Math.max(1,Math.floor(v.m()/w.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),S=u(y),b=S.j(w);_(b)||0<b.l(v);)y-=E,S=u(y),b=S.j(w);I(S)&&(S=m),x=x.add(S),v=N(v,b)}return new $(x,v)}n.A=function(v){return te(this,v).h},n.and=function(v){for(var w=Math.max(this.g.length,v.g.length),y=[],E=0;E<w;E++)y[E]=this.i(E)&v.i(E);return new a(y,this.h&v.h)},n.or=function(v){for(var w=Math.max(this.g.length,v.g.length),y=[],E=0;E<w;E++)y[E]=this.i(E)|v.i(E);return new a(y,this.h|v.h)},n.xor=function(v){for(var w=Math.max(this.g.length,v.g.length),y=[],E=0;E<w;E++)y[E]=this.i(E)^v.i(E);return new a(y,this.h^v.h)};function Z(v){for(var w=v.g.length+1,y=[],E=0;E<w;E++)y[E]=v.i(E)<<1|v.i(E-1)>>>31;return new a(y,v.h)}function oe(v,w){var y=w>>5;w%=32;for(var E=v.g.length-y,x=[],S=0;S<E;S++)x[S]=0<w?v.i(S+y)>>>w|v.i(S+y+1)<<32-w:v.i(S+y);return new a(x,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Ud=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=u,a.fromString=p,$t=a}).apply(typeof cl<"u"?cl:typeof self<"u"?self:typeof window<"u"?window:{});var xo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qd,fr,jd,Ro,Ii,zd,Hd,Gd;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,d,h){return i==Array.prototype||i==Object.prototype||(i[d]=h.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof xo=="object"&&xo];for(var d=0;d<i.length;++d){var h=i[d];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function o(i,d){if(d)e:{var h=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var A=i[f];if(!(A in h))break e;h=h[A]}i=i[i.length-1],f=h[i],d=d(f),d!=f&&d!=null&&e(h,i,{configurable:!0,writable:!0,value:d})}}function s(i,d){i instanceof String&&(i+="");var h=0,f=!1,A={next:function(){if(!f&&h<i.length){var R=h++;return{value:d(R,i[R]),done:!1}}return f=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}o("Array.prototype.values",function(i){return i||function(){return s(this,function(d,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(i){var d=typeof i;return d=d!="object"?d:i?Array.isArray(i)?"array":d:"null",d=="array"||d=="object"&&typeof i.length=="number"}function u(i){var d=typeof i;return d=="object"&&i!=null||d=="function"}function p(i,d,h){return i.call.apply(i.bind,arguments)}function g(i,d,h){if(!i)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,f),i.apply(d,A)}}return function(){return i.apply(d,arguments)}}function m(i,d,h){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:g,m.apply(null,arguments)}function T(i,d){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function I(i,d){function h(){}h.prototype=d.prototype,i.aa=d.prototype,i.prototype=new h,i.prototype.constructor=i,i.Qb=function(f,A,R){for(var M=Array(arguments.length-2),se=2;se<arguments.length;se++)M[se-2]=arguments[se];return d.prototype[A].apply(f,M)}}function _(i){const d=i.length;if(0<d){const h=Array(d);for(let f=0;f<d;f++)h[f]=i[f];return h}return[]}function k(i,d){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(c(f)){const A=i.length||0,R=f.length||0;i.length=A+R;for(let M=0;M<R;M++)i[A+M]=f[M]}else i.push(f)}}class N{constructor(d,h){this.i=d,this.j=h,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function L(i){return/^[\s\xa0]*$/.test(i)}function $(){var i=l.navigator;return i&&(i=i.userAgent)?i:""}function te(i){return te[" "](i),i}te[" "]=function(){};var Z=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function oe(i,d,h){for(const f in i)d.call(h,i[f],f,i)}function v(i,d){for(const h in i)d.call(void 0,i[h],h,i)}function w(i){const d={};for(const h in i)d[h]=i[h];return d}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(i,d){let h,f;for(let A=1;A<arguments.length;A++){f=arguments[A];for(h in f)i[h]=f[h];for(let R=0;R<y.length;R++)h=y[R],Object.prototype.hasOwnProperty.call(f,h)&&(i[h]=f[h])}}function x(i){var d=1;i=i.split(":");const h=[];for(;0<d&&i.length;)h.push(i.shift()),d--;return i.length&&h.push(i.join(":")),h}function S(i){l.setTimeout(()=>{throw i},0)}function b(){var i=je;let d=null;return i.g&&(d=i.g,i.g=i.g.next,i.g||(i.h=null),d.next=null),d}class D{constructor(){this.h=this.g=null}add(d,h){const f=W.get();f.set(d,h),this.h?this.h.next=f:this.g=f,this.h=f}}var W=new N(()=>new K,i=>i.reset());class K{constructor(){this.next=this.g=this.h=null}set(d,h){this.h=d,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let z,re=!1,je=new D,Qe=()=>{const i=l.Promise.resolve(void 0);z=()=>{i.then(En)}};var En=()=>{for(var i;i=b();){try{i.h.call(i.g)}catch(h){S(h)}var d=W;d.j(i),100>d.h&&(d.h++,i.next=d.g,d.g=i)}re=!1};function ze(){this.s=this.s,this.C=this.C}ze.prototype.s=!1,ze.prototype.ma=function(){this.s||(this.s=!0,this.N())},ze.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Te(i,d){this.type=i,this.g=this.target=d,this.defaultPrevented=!1}Te.prototype.h=function(){this.defaultPrevented=!0};var yp=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var i=!1,d=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const h=()=>{};l.addEventListener("test",h,d),l.removeEventListener("test",h,d)}catch{}return i}();function er(i,d){if(Te.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var h=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=d,d=i.relatedTarget){if(Z){e:{try{te(d.nodeName);var A=!0;break e}catch{}A=!1}A||(d=null)}}else h=="mouseover"?d=i.fromElement:h=="mouseout"&&(d=i.toElement);this.relatedTarget=d,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:vp[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&er.aa.h.call(this)}}I(er,Te);var vp={2:"touch",3:"pen",4:"mouse"};er.prototype.h=function(){er.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var ro="closure_listenable_"+(1e6*Math.random()|0),bp=0;function _p(i,d,h,f,A){this.listener=i,this.proxy=null,this.src=d,this.type=h,this.capture=!!f,this.ha=A,this.key=++bp,this.da=this.fa=!1}function oo(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function so(i){this.src=i,this.g={},this.h=0}so.prototype.add=function(i,d,h,f,A){var R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);var M=$s(i,d,f,A);return-1<M?(d=i[M],h||(d.fa=!1)):(d=new _p(d,this.src,R,!!f,A),d.fa=h,i.push(d)),d};function Fs(i,d){var h=d.type;if(h in i.g){var f=i.g[h],A=Array.prototype.indexOf.call(f,d,void 0),R;(R=0<=A)&&Array.prototype.splice.call(f,A,1),R&&(oo(d),i.g[h].length==0&&(delete i.g[h],i.h--))}}function $s(i,d,h,f){for(var A=0;A<i.length;++A){var R=i[A];if(!R.da&&R.listener==d&&R.capture==!!h&&R.ha==f)return A}return-1}var Bs="closure_lm_"+(1e6*Math.random()|0),Us={};function Ya(i,d,h,f,A){if(Array.isArray(d)){for(var R=0;R<d.length;R++)Ya(i,d[R],h,f,A);return null}return h=ec(h),i&&i[ro]?i.K(d,h,u(f)?!!f.capture:!1,A):Ep(i,d,h,!1,f,A)}function Ep(i,d,h,f,A,R){if(!d)throw Error("Invalid event type");var M=u(A)?!!A.capture:!!A,se=js(i);if(se||(i[Bs]=se=new so(i)),h=se.add(d,h,f,M,R),h.proxy)return h;if(f=xp(),h.proxy=f,f.src=i,f.listener=h,i.addEventListener)yp||(A=M),A===void 0&&(A=!1),i.addEventListener(d.toString(),f,A);else if(i.attachEvent)i.attachEvent(Za(d.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function xp(){function i(h){return d.call(i.src,i.listener,h)}const d=Tp;return i}function Ja(i,d,h,f,A){if(Array.isArray(d))for(var R=0;R<d.length;R++)Ja(i,d[R],h,f,A);else f=u(f)?!!f.capture:!!f,h=ec(h),i&&i[ro]?(i=i.i,d=String(d).toString(),d in i.g&&(R=i.g[d],h=$s(R,h,f,A),-1<h&&(oo(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete i.g[d],i.h--)))):i&&(i=js(i))&&(d=i.g[d.toString()],i=-1,d&&(i=$s(d,h,f,A)),(h=-1<i?d[i]:null)&&qs(h))}function qs(i){if(typeof i!="number"&&i&&!i.da){var d=i.src;if(d&&d[ro])Fs(d.i,i);else{var h=i.type,f=i.proxy;d.removeEventListener?d.removeEventListener(h,f,i.capture):d.detachEvent?d.detachEvent(Za(h),f):d.addListener&&d.removeListener&&d.removeListener(f),(h=js(d))?(Fs(h,i),h.h==0&&(h.src=null,d[Bs]=null)):oo(i)}}}function Za(i){return i in Us?Us[i]:Us[i]="on"+i}function Tp(i,d){if(i.da)i=!0;else{d=new er(d,this);var h=i.listener,f=i.ha||i.src;i.fa&&qs(i),i=h.call(f,d)}return i}function js(i){return i=i[Bs],i instanceof so?i:null}var zs="__closure_events_fn_"+(1e9*Math.random()>>>0);function ec(i){return typeof i=="function"?i:(i[zs]||(i[zs]=function(d){return i.handleEvent(d)}),i[zs])}function Re(){ze.call(this),this.i=new so(this),this.M=this,this.F=null}I(Re,ze),Re.prototype[ro]=!0,Re.prototype.removeEventListener=function(i,d,h,f){Ja(this,i,d,h,f)};function Oe(i,d){var h,f=i.F;if(f)for(h=[];f;f=f.F)h.push(f);if(i=i.M,f=d.type||d,typeof d=="string")d=new Te(d,i);else if(d instanceof Te)d.target=d.target||i;else{var A=d;d=new Te(f,i),E(d,A)}if(A=!0,h)for(var R=h.length-1;0<=R;R--){var M=d.g=h[R];A=io(M,f,!0,d)&&A}if(M=d.g=i,A=io(M,f,!0,d)&&A,A=io(M,f,!1,d)&&A,h)for(R=0;R<h.length;R++)M=d.g=h[R],A=io(M,f,!1,d)&&A}Re.prototype.N=function(){if(Re.aa.N.call(this),this.i){var i=this.i,d;for(d in i.g){for(var h=i.g[d],f=0;f<h.length;f++)oo(h[f]);delete i.g[d],i.h--}}this.F=null},Re.prototype.K=function(i,d,h,f){return this.i.add(String(i),d,!1,h,f)},Re.prototype.L=function(i,d,h,f){return this.i.add(String(i),d,!0,h,f)};function io(i,d,h,f){if(d=i.i.g[String(d)],!d)return!0;d=d.concat();for(var A=!0,R=0;R<d.length;++R){var M=d[R];if(M&&!M.da&&M.capture==h){var se=M.listener,Ie=M.ha||M.src;M.fa&&Fs(i.i,M),A=se.call(Ie,f)!==!1&&A}}return A&&!f.defaultPrevented}function tc(i,d,h){if(typeof i=="function")h&&(i=m(i,h));else if(i&&typeof i.handleEvent=="function")i=m(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(i,d||0)}function nc(i){i.g=tc(()=>{i.g=null,i.i&&(i.i=!1,nc(i))},i.l);const d=i.h;i.h=null,i.m.apply(null,d)}class Ip extends ze{constructor(d,h){super(),this.m=d,this.l=h,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:nc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function tr(i){ze.call(this),this.h=i,this.g={}}I(tr,ze);var rc=[];function oc(i){oe(i.g,function(d,h){this.g.hasOwnProperty(h)&&qs(d)},i),i.g={}}tr.prototype.N=function(){tr.aa.N.call(this),oc(this)},tr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Hs=l.JSON.stringify,Sp=l.JSON.parse,Ap=class{stringify(i){return l.JSON.stringify(i,void 0)}parse(i){return l.JSON.parse(i,void 0)}};function Gs(){}Gs.prototype.h=null;function sc(i){return i.h||(i.h=i.i())}function ic(){}var nr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ws(){Te.call(this,"d")}I(Ws,Te);function Ks(){Te.call(this,"c")}I(Ks,Te);var en={},ac=null;function ao(){return ac=ac||new Re}en.La="serverreachability";function cc(i){Te.call(this,en.La,i)}I(cc,Te);function rr(i){const d=ao();Oe(d,new cc(d))}en.STAT_EVENT="statevent";function lc(i,d){Te.call(this,en.STAT_EVENT,i),this.stat=d}I(lc,Te);function Fe(i){const d=ao();Oe(d,new lc(d,i))}en.Ma="timingevent";function dc(i,d){Te.call(this,en.Ma,i),this.size=d}I(dc,Te);function or(i,d){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){i()},d)}function sr(){this.g=!0}sr.prototype.xa=function(){this.g=!1};function kp(i,d,h,f,A,R){i.info(function(){if(i.g)if(R)for(var M="",se=R.split("&"),Ie=0;Ie<se.length;Ie++){var ee=se[Ie].split("=");if(1<ee.length){var Ce=ee[0];ee=ee[1];var Pe=Ce.split("_");M=2<=Pe.length&&Pe[1]=="type"?M+(Ce+"="+ee+"&"):M+(Ce+"=redacted&")}}else M=null;else M=R;return"XMLHTTP REQ ("+f+") [attempt "+A+"]: "+d+`
`+h+`
`+M})}function Rp(i,d,h,f,A,R,M){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+A+"]: "+d+`
`+h+`
`+R+" "+M})}function xn(i,d,h,f){i.info(function(){return"XMLHTTP TEXT ("+d+"): "+Pp(i,h)+(f?" "+f:"")})}function Cp(i,d){i.info(function(){return"TIMEOUT: "+d})}sr.prototype.info=function(){};function Pp(i,d){if(!i.g)return d;if(!d)return null;try{var h=JSON.parse(d);if(h){for(i=0;i<h.length;i++)if(Array.isArray(h[i])){var f=h[i];if(!(2>f.length)){var A=f[1];if(Array.isArray(A)&&!(1>A.length)){var R=A[0];if(R!="noop"&&R!="stop"&&R!="close")for(var M=1;M<A.length;M++)A[M]=""}}}}return Hs(h)}catch{return d}}var co={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},uc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Xs;function lo(){}I(lo,Gs),lo.prototype.g=function(){return new XMLHttpRequest},lo.prototype.i=function(){return{}},Xs=new lo;function At(i,d,h,f){this.j=i,this.i=d,this.l=h,this.R=f||1,this.U=new tr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new hc}function hc(){this.i=null,this.g="",this.h=!1}var pc={},Qs={};function Ys(i,d,h){i.L=1,i.v=fo(pt(d)),i.m=h,i.P=!0,fc(i,null)}function fc(i,d){i.F=Date.now(),uo(i),i.A=pt(i.v);var h=i.A,f=i.R;Array.isArray(f)||(f=[String(f)]),kc(h.i,"t",f),i.C=0,h=i.j.J,i.h=new hc,i.g=Gc(i.j,h?d:null,!i.m),0<i.O&&(i.M=new Ip(m(i.Y,i,i.g),i.O)),d=i.U,h=i.g,f=i.ca;var A="readystatechange";Array.isArray(A)||(A&&(rc[0]=A.toString()),A=rc);for(var R=0;R<A.length;R++){var M=Ya(h,A[R],f||d.handleEvent,!1,d.h||d);if(!M)break;d.g[M.key]=M}d=i.H?w(i.H):{},i.m?(i.u||(i.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,d)):(i.u="GET",i.g.ea(i.A,i.u,null,d)),rr(),kp(i.i,i.u,i.A,i.l,i.R,i.m)}At.prototype.ca=function(i){i=i.target;const d=this.M;d&&ft(i)==3?d.j():this.Y(i)},At.prototype.Y=function(i){try{if(i==this.g)e:{const Pe=ft(this.g);var d=this.g.Ba();const Sn=this.g.Z();if(!(3>Pe)&&(Pe!=3||this.g&&(this.h.h||this.g.oa()||Vc(this.g)))){this.J||Pe!=4||d==7||(d==8||0>=Sn?rr(3):rr(2)),Js(this);var h=this.g.Z();this.X=h;t:if(gc(this)){var f=Vc(this.g);i="";var A=f.length,R=ft(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){tn(this),ir(this);var M="";break t}this.h.i=new l.TextDecoder}for(d=0;d<A;d++)this.h.h=!0,i+=this.h.i.decode(f[d],{stream:!(R&&d==A-1)});f.length=0,this.h.g+=i,this.C=0,M=this.h.g}else M=this.g.oa();if(this.o=h==200,Rp(this.i,this.u,this.A,this.l,this.R,Pe,h),this.o){if(this.T&&!this.K){t:{if(this.g){var se,Ie=this.g;if((se=Ie.g?Ie.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(se)){var ee=se;break t}}ee=null}if(h=ee)xn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Zs(this,h);else{this.o=!1,this.s=3,Fe(12),tn(this),ir(this);break e}}if(this.P){h=!0;let Ye;for(;!this.J&&this.C<M.length;)if(Ye=Dp(this,M),Ye==Qs){Pe==4&&(this.s=4,Fe(14),h=!1),xn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ye==pc){this.s=4,Fe(15),xn(this.i,this.l,M,"[Invalid Chunk]"),h=!1;break}else xn(this.i,this.l,Ye,null),Zs(this,Ye);if(gc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Pe!=4||M.length!=0||this.h.h||(this.s=1,Fe(16),h=!1),this.o=this.o&&h,!h)xn(this.i,this.l,M,"[Invalid Chunked Response]"),tn(this),ir(this);else if(0<M.length&&!this.W){this.W=!0;var Ce=this.j;Ce.g==this&&Ce.ba&&!Ce.M&&(Ce.j.info("Great, no buffering proxy detected. Bytes received: "+M.length),si(Ce),Ce.M=!0,Fe(11))}}else xn(this.i,this.l,M,null),Zs(this,M);Pe==4&&tn(this),this.o&&!this.J&&(Pe==4?qc(this.j,this):(this.o=!1,uo(this)))}else Xp(this.g),h==400&&0<M.indexOf("Unknown SID")?(this.s=3,Fe(12)):(this.s=0,Fe(13)),tn(this),ir(this)}}}catch{}finally{}};function gc(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Dp(i,d){var h=i.C,f=d.indexOf(`
`,h);return f==-1?Qs:(h=Number(d.substring(h,f)),isNaN(h)?pc:(f+=1,f+h>d.length?Qs:(d=d.slice(f,f+h),i.C=f+h,d)))}At.prototype.cancel=function(){this.J=!0,tn(this)};function uo(i){i.S=Date.now()+i.I,mc(i,i.I)}function mc(i,d){if(i.B!=null)throw Error("WatchDog timer not null");i.B=or(m(i.ba,i),d)}function Js(i){i.B&&(l.clearTimeout(i.B),i.B=null)}At.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Cp(this.i,this.A),this.L!=2&&(rr(),Fe(17)),tn(this),this.s=2,ir(this)):mc(this,this.S-i)};function ir(i){i.j.G==0||i.J||qc(i.j,i)}function tn(i){Js(i);var d=i.M;d&&typeof d.ma=="function"&&d.ma(),i.M=null,oc(i.U),i.g&&(d=i.g,i.g=null,d.abort(),d.ma())}function Zs(i,d){try{var h=i.j;if(h.G!=0&&(h.g==i||ei(h.h,i))){if(!i.K&&ei(h.h,i)&&h.G==3){try{var f=h.Da.g.parse(d)}catch{f=null}if(Array.isArray(f)&&f.length==3){var A=f;if(A[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<i.F)bo(h),yo(h);else break e;oi(h),Fe(18)}}else h.za=A[1],0<h.za-h.T&&37500>A[2]&&h.F&&h.v==0&&!h.C&&(h.C=or(m(h.Za,h),6e3));if(1>=vc(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else rn(h,11)}else if((i.K||h.g==i)&&bo(h),!L(d))for(A=h.Da.g.parse(d),d=0;d<A.length;d++){let ee=A[d];if(h.T=ee[0],ee=ee[1],h.G==2)if(ee[0]=="c"){h.K=ee[1],h.ia=ee[2];const Ce=ee[3];Ce!=null&&(h.la=Ce,h.j.info("VER="+h.la));const Pe=ee[4];Pe!=null&&(h.Aa=Pe,h.j.info("SVER="+h.Aa));const Sn=ee[5];Sn!=null&&typeof Sn=="number"&&0<Sn&&(f=1.5*Sn,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Ye=i.g;if(Ye){const Eo=Ye.g?Ye.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Eo){var R=f.h;R.g||Eo.indexOf("spdy")==-1&&Eo.indexOf("quic")==-1&&Eo.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(ti(R,R.h),R.h=null))}if(f.D){const ii=Ye.g?Ye.g.getResponseHeader("X-HTTP-Session-Id"):null;ii&&(f.ya=ii,le(f.I,f.D,ii))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-i.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var M=i;if(f.qa=Hc(f,f.J?f.ia:null,f.W),M.K){bc(f.h,M);var se=M,Ie=f.L;Ie&&(se.I=Ie),se.B&&(Js(se),uo(se)),f.g=M}else Bc(f);0<h.i.length&&vo(h)}else ee[0]!="stop"&&ee[0]!="close"||rn(h,7);else h.G==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?rn(h,7):ri(h):ee[0]!="noop"&&h.l&&h.l.ta(ee),h.v=0)}}rr(4)}catch{}}var Np=class{constructor(i,d){this.g=i,this.map=d}};function wc(i){this.l=i||10,l.PerformanceNavigationTiming?(i=l.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function yc(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function vc(i){return i.h?1:i.g?i.g.size:0}function ei(i,d){return i.h?i.h==d:i.g?i.g.has(d):!1}function ti(i,d){i.g?i.g.add(d):i.h=d}function bc(i,d){i.h&&i.h==d?i.h=null:i.g&&i.g.has(d)&&i.g.delete(d)}wc.prototype.cancel=function(){if(this.i=_c(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function _c(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let d=i.i;for(const h of i.g.values())d=d.concat(h.D);return d}return _(i.i)}function Mp(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(c(i)){for(var d=[],h=i.length,f=0;f<h;f++)d.push(i[f]);return d}d=[],h=0;for(f in i)d[h++]=i[f];return d}function Vp(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(c(i)||typeof i=="string"){var d=[];i=i.length;for(var h=0;h<i;h++)d.push(h);return d}d=[],h=0;for(const f in i)d[h++]=f;return d}}}function Ec(i,d){if(i.forEach&&typeof i.forEach=="function")i.forEach(d,void 0);else if(c(i)||typeof i=="string")Array.prototype.forEach.call(i,d,void 0);else for(var h=Vp(i),f=Mp(i),A=f.length,R=0;R<A;R++)d.call(void 0,f[R],h&&h[R],i)}var xc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Lp(i,d){if(i){i=i.split("&");for(var h=0;h<i.length;h++){var f=i[h].indexOf("="),A=null;if(0<=f){var R=i[h].substring(0,f);A=i[h].substring(f+1)}else R=i[h];d(R,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function nn(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof nn){this.h=i.h,ho(this,i.j),this.o=i.o,this.g=i.g,po(this,i.s),this.l=i.l;var d=i.i,h=new lr;h.i=d.i,d.g&&(h.g=new Map(d.g),h.h=d.h),Tc(this,h),this.m=i.m}else i&&(d=String(i).match(xc))?(this.h=!1,ho(this,d[1]||"",!0),this.o=ar(d[2]||""),this.g=ar(d[3]||"",!0),po(this,d[4]),this.l=ar(d[5]||"",!0),Tc(this,d[6]||"",!0),this.m=ar(d[7]||"")):(this.h=!1,this.i=new lr(null,this.h))}nn.prototype.toString=function(){var i=[],d=this.j;d&&i.push(cr(d,Ic,!0),":");var h=this.g;return(h||d=="file")&&(i.push("//"),(d=this.o)&&i.push(cr(d,Ic,!0),"@"),i.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&i.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&i.push("/"),i.push(cr(h,h.charAt(0)=="/"?$p:Fp,!0))),(h=this.i.toString())&&i.push("?",h),(h=this.m)&&i.push("#",cr(h,Up)),i.join("")};function pt(i){return new nn(i)}function ho(i,d,h){i.j=h?ar(d,!0):d,i.j&&(i.j=i.j.replace(/:$/,""))}function po(i,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);i.s=d}else i.s=null}function Tc(i,d,h){d instanceof lr?(i.i=d,qp(i.i,i.h)):(h||(d=cr(d,Bp)),i.i=new lr(d,i.h))}function le(i,d,h){i.i.set(d,h)}function fo(i){return le(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function ar(i,d){return i?d?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function cr(i,d,h){return typeof i=="string"?(i=encodeURI(i).replace(d,Op),h&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Op(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Ic=/[#\/\?@]/g,Fp=/[#\?:]/g,$p=/[#\?]/g,Bp=/[#\?@]/g,Up=/#/g;function lr(i,d){this.h=this.g=null,this.i=i||null,this.j=!!d}function kt(i){i.g||(i.g=new Map,i.h=0,i.i&&Lp(i.i,function(d,h){i.add(decodeURIComponent(d.replace(/\+/g," ")),h)}))}n=lr.prototype,n.add=function(i,d){kt(this),this.i=null,i=Tn(this,i);var h=this.g.get(i);return h||this.g.set(i,h=[]),h.push(d),this.h+=1,this};function Sc(i,d){kt(i),d=Tn(i,d),i.g.has(d)&&(i.i=null,i.h-=i.g.get(d).length,i.g.delete(d))}function Ac(i,d){return kt(i),d=Tn(i,d),i.g.has(d)}n.forEach=function(i,d){kt(this),this.g.forEach(function(h,f){h.forEach(function(A){i.call(d,A,f,this)},this)},this)},n.na=function(){kt(this);const i=Array.from(this.g.values()),d=Array.from(this.g.keys()),h=[];for(let f=0;f<d.length;f++){const A=i[f];for(let R=0;R<A.length;R++)h.push(d[f])}return h},n.V=function(i){kt(this);let d=[];if(typeof i=="string")Ac(this,i)&&(d=d.concat(this.g.get(Tn(this,i))));else{i=Array.from(this.g.values());for(let h=0;h<i.length;h++)d=d.concat(i[h])}return d},n.set=function(i,d){return kt(this),this.i=null,i=Tn(this,i),Ac(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[d]),this.h+=1,this},n.get=function(i,d){return i?(i=this.V(i),0<i.length?String(i[0]):d):d};function kc(i,d,h){Sc(i,d),0<h.length&&(i.i=null,i.g.set(Tn(i,d),_(h)),i.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],d=Array.from(this.g.keys());for(var h=0;h<d.length;h++){var f=d[h];const R=encodeURIComponent(String(f)),M=this.V(f);for(f=0;f<M.length;f++){var A=R;M[f]!==""&&(A+="="+encodeURIComponent(String(M[f]))),i.push(A)}}return this.i=i.join("&")};function Tn(i,d){return d=String(d),i.j&&(d=d.toLowerCase()),d}function qp(i,d){d&&!i.j&&(kt(i),i.i=null,i.g.forEach(function(h,f){var A=f.toLowerCase();f!=A&&(Sc(this,f),kc(this,A,h))},i)),i.j=d}function jp(i,d){const h=new sr;if(l.Image){const f=new Image;f.onload=T(Rt,h,"TestLoadImage: loaded",!0,d,f),f.onerror=T(Rt,h,"TestLoadImage: error",!1,d,f),f.onabort=T(Rt,h,"TestLoadImage: abort",!1,d,f),f.ontimeout=T(Rt,h,"TestLoadImage: timeout",!1,d,f),l.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else d(!1)}function zp(i,d){const h=new sr,f=new AbortController,A=setTimeout(()=>{f.abort(),Rt(h,"TestPingServer: timeout",!1,d)},1e4);fetch(i,{signal:f.signal}).then(R=>{clearTimeout(A),R.ok?Rt(h,"TestPingServer: ok",!0,d):Rt(h,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(A),Rt(h,"TestPingServer: error",!1,d)})}function Rt(i,d,h,f,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),f(h)}catch{}}function Hp(){this.g=new Ap}function Gp(i,d,h){const f=h||"";try{Ec(i,function(A,R){let M=A;u(A)&&(M=Hs(A)),d.push(f+R+"="+encodeURIComponent(M))})}catch(A){throw d.push(f+"type="+encodeURIComponent("_badmap")),A}}function go(i){this.l=i.Ub||null,this.j=i.eb||!1}I(go,Gs),go.prototype.g=function(){return new mo(this.l,this.j)},go.prototype.i=function(i){return function(){return i}}({});function mo(i,d){Re.call(this),this.D=i,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}I(mo,Re),n=mo.prototype,n.open=function(i,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=d,this.readyState=1,ur(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(d.body=i),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,dr(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,ur(this)),this.g&&(this.readyState=3,ur(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Rc(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Rc(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var d=i.value?i.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!i.done}))&&(this.response=this.responseText+=d)}i.done?dr(this):ur(this),this.readyState==3&&Rc(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,dr(this))},n.Qa=function(i){this.g&&(this.response=i,dr(this))},n.ga=function(){this.g&&dr(this)};function dr(i){i.readyState=4,i.l=null,i.j=null,i.v=null,ur(i)}n.setRequestHeader=function(i,d){this.u.append(i,d)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],d=this.h.entries();for(var h=d.next();!h.done;)h=h.value,i.push(h[0]+": "+h[1]),h=d.next();return i.join(`\r
`)};function ur(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(mo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Cc(i){let d="";return oe(i,function(h,f){d+=f,d+=":",d+=h,d+=`\r
`}),d}function ni(i,d,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Cc(h),typeof i=="string"?h!=null&&encodeURIComponent(String(h)):le(i,d,h))}function pe(i){Re.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}I(pe,Re);var Wp=/^https?$/i,Kp=["POST","PUT"];n=pe.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,d,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);d=d?d.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Xs.g(),this.v=this.o?sc(this.o):sc(Xs),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(d,String(i),!0),this.B=!1}catch(R){Pc(this,R);return}if(i=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var A in f)h.set(A,f[A]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())h.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),A=l.FormData&&i instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Kp,d,void 0))||f||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,M]of h)this.g.setRequestHeader(R,M);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Mc(this),this.u=!0,this.g.send(i),this.u=!1}catch(R){Pc(this,R)}};function Pc(i,d){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=d,i.m=5,Dc(i),wo(i)}function Dc(i){i.A||(i.A=!0,Oe(i,"complete"),Oe(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Oe(this,"complete"),Oe(this,"abort"),wo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),wo(this,!0)),pe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Nc(this):this.bb())},n.bb=function(){Nc(this)};function Nc(i){if(i.h&&typeof a<"u"&&(!i.v[1]||ft(i)!=4||i.Z()!=2)){if(i.u&&ft(i)==4)tc(i.Ea,0,i);else if(Oe(i,"readystatechange"),ft(i)==4){i.h=!1;try{const M=i.Z();e:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var h;if(!(h=d)){var f;if(f=M===0){var A=String(i.D).match(xc)[1]||null;!A&&l.self&&l.self.location&&(A=l.self.location.protocol.slice(0,-1)),f=!Wp.test(A?A.toLowerCase():"")}h=f}if(h)Oe(i,"complete"),Oe(i,"success");else{i.m=6;try{var R=2<ft(i)?i.g.statusText:""}catch{R=""}i.l=R+" ["+i.Z()+"]",Dc(i)}}finally{wo(i)}}}}function wo(i,d){if(i.g){Mc(i);const h=i.g,f=i.v[0]?()=>{}:null;i.g=null,i.v=null,d||Oe(i,"ready");try{h.onreadystatechange=f}catch{}}}function Mc(i){i.I&&(l.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function ft(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<ft(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var d=this.g.responseText;return i&&d.indexOf(i)==0&&(d=d.substring(i.length)),Sp(d)}};function Vc(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Xp(i){const d={};i=(i.g&&2<=ft(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(L(i[f]))continue;var h=x(i[f]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=d[A]||[];d[A]=R,R.push(h)}v(d,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function hr(i,d,h){return h&&h.internalChannelParams&&h.internalChannelParams[i]||d}function Lc(i){this.Aa=0,this.i=[],this.j=new sr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=hr("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=hr("baseRetryDelayMs",5e3,i),this.cb=hr("retryDelaySeedMs",1e4,i),this.Wa=hr("forwardChannelMaxRetries",2,i),this.wa=hr("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new wc(i&&i.concurrentRequestLimit),this.Da=new Hp,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Lc.prototype,n.la=8,n.G=1,n.connect=function(i,d,h,f){Fe(0),this.W=i,this.H=d||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=Hc(this,null,this.W),vo(this)};function ri(i){if(Oc(i),i.G==3){var d=i.U++,h=pt(i.I);if(le(h,"SID",i.K),le(h,"RID",d),le(h,"TYPE","terminate"),pr(i,h),d=new At(i,i.j,d),d.L=2,d.v=fo(pt(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=d.v,h=!0),h||(d.g=Gc(d.j,null),d.g.ea(d.v)),d.F=Date.now(),uo(d)}zc(i)}function yo(i){i.g&&(si(i),i.g.cancel(),i.g=null)}function Oc(i){yo(i),i.u&&(l.clearTimeout(i.u),i.u=null),bo(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&l.clearTimeout(i.s),i.s=null)}function vo(i){if(!yc(i.h)&&!i.s){i.s=!0;var d=i.Ga;z||Qe(),re||(z(),re=!0),je.add(d,i),i.B=0}}function Qp(i,d){return vc(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=d.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=or(m(i.Ga,i,d),jc(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const A=new At(this,this.j,i);let R=this.o;if(this.S&&(R?(R=w(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(A.H=R,R=null),this.P)e:{for(var d=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(d+=f,4096<d){d=h;break e}if(d===4096||h===this.i.length-1){d=h+1;break e}}d=1e3}else d=1e3;d=$c(this,A,d),h=pt(this.I),le(h,"RID",i),le(h,"CVER",22),this.D&&le(h,"X-HTTP-Session-Id",this.D),pr(this,h),R&&(this.O?d="headers="+encodeURIComponent(String(Cc(R)))+"&"+d:this.m&&ni(h,this.m,R)),ti(this.h,A),this.Ua&&le(h,"TYPE","init"),this.P?(le(h,"$req",d),le(h,"SID","null"),A.T=!0,Ys(A,h,null)):Ys(A,h,d),this.G=2}}else this.G==3&&(i?Fc(this,i):this.i.length==0||yc(this.h)||Fc(this))};function Fc(i,d){var h;d?h=d.l:h=i.U++;const f=pt(i.I);le(f,"SID",i.K),le(f,"RID",h),le(f,"AID",i.T),pr(i,f),i.m&&i.o&&ni(f,i.m,i.o),h=new At(i,i.j,h,i.B+1),i.m===null&&(h.H=i.o),d&&(i.i=d.D.concat(i.i)),d=$c(i,h,1e3),h.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),ti(i.h,h),Ys(h,f,d)}function pr(i,d){i.H&&oe(i.H,function(h,f){le(d,f,h)}),i.l&&Ec({},function(h,f){le(d,f,h)})}function $c(i,d,h){h=Math.min(i.i.length,h);var f=i.l?m(i.l.Na,i.l,i):null;e:{var A=i.i;let R=-1;for(;;){const M=["count="+h];R==-1?0<h?(R=A[0].g,M.push("ofs="+R)):R=0:M.push("ofs="+R);let se=!0;for(let Ie=0;Ie<h;Ie++){let ee=A[Ie].g;const Ce=A[Ie].map;if(ee-=R,0>ee)R=Math.max(0,A[Ie].g-100),se=!1;else try{Gp(Ce,M,"req"+ee+"_")}catch{f&&f(Ce)}}if(se){f=M.join("&");break e}}}return i=i.i.splice(0,h),d.D=i,f}function Bc(i){if(!i.g&&!i.u){i.Y=1;var d=i.Fa;z||Qe(),re||(z(),re=!0),je.add(d,i),i.v=0}}function oi(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=or(m(i.Fa,i),jc(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,Uc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=or(m(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Fe(10),yo(this),Uc(this))};function si(i){i.A!=null&&(l.clearTimeout(i.A),i.A=null)}function Uc(i){i.g=new At(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var d=pt(i.qa);le(d,"RID","rpc"),le(d,"SID",i.K),le(d,"AID",i.T),le(d,"CI",i.F?"0":"1"),!i.F&&i.ja&&le(d,"TO",i.ja),le(d,"TYPE","xmlhttp"),pr(i,d),i.m&&i.o&&ni(d,i.m,i.o),i.L&&(i.g.I=i.L);var h=i.g;i=i.ia,h.L=1,h.v=fo(pt(d)),h.m=null,h.P=!0,fc(h,i)}n.Za=function(){this.C!=null&&(this.C=null,yo(this),oi(this),Fe(19))};function bo(i){i.C!=null&&(l.clearTimeout(i.C),i.C=null)}function qc(i,d){var h=null;if(i.g==d){bo(i),si(i),i.g=null;var f=2}else if(ei(i.h,d))h=d.D,bc(i.h,d),f=1;else return;if(i.G!=0){if(d.o)if(f==1){h=d.m?d.m.length:0,d=Date.now()-d.F;var A=i.B;f=ao(),Oe(f,new dc(f,h)),vo(i)}else Bc(i);else if(A=d.s,A==3||A==0&&0<d.X||!(f==1&&Qp(i,d)||f==2&&oi(i)))switch(h&&0<h.length&&(d=i.h,d.i=d.i.concat(h)),A){case 1:rn(i,5);break;case 4:rn(i,10);break;case 3:rn(i,6);break;default:rn(i,2)}}}function jc(i,d){let h=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(h*=2),h*d}function rn(i,d){if(i.j.info("Error code "+d),d==2){var h=m(i.fb,i),f=i.Xa;const A=!f;f=new nn(f||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ho(f,"https"),fo(f),A?jp(f.toString(),h):zp(f.toString(),h)}else Fe(2);i.G=0,i.l&&i.l.sa(d),zc(i),Oc(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Fe(2)):(this.j.info("Failed to ping google.com"),Fe(1))};function zc(i){if(i.G=0,i.ka=[],i.l){const d=_c(i.h);(d.length!=0||i.i.length!=0)&&(k(i.ka,d),k(i.ka,i.i),i.h.i.length=0,_(i.i),i.i.length=0),i.l.ra()}}function Hc(i,d,h){var f=h instanceof nn?pt(h):new nn(h);if(f.g!="")d&&(f.g=d+"."+f.g),po(f,f.s);else{var A=l.location;f=A.protocol,d=d?d+"."+A.hostname:A.hostname,A=+A.port;var R=new nn(null);f&&ho(R,f),d&&(R.g=d),A&&po(R,A),h&&(R.l=h),f=R}return h=i.D,d=i.ya,h&&d&&le(f,h,d),le(f,"VER",i.la),pr(i,f),f}function Gc(i,d,h){if(d&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=i.Ca&&!i.pa?new pe(new go({eb:h})):new pe(i.pa),d.Ha(i.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Wc(){}n=Wc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function _o(){}_o.prototype.g=function(i,d){return new He(i,d)};function He(i,d){Re.call(this),this.g=new Lc(d),this.l=i,this.h=d&&d.messageUrlParams||null,i=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(i?i["X-WebChannel-Content-Type"]=d.messageContentType:i={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(i?i["X-WebChannel-Client-Profile"]=d.va:i={"X-WebChannel-Client-Profile":d.va}),this.g.S=i,(i=d&&d.Sb)&&!L(i)&&(this.g.m=i),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!L(d)&&(this.g.D=d,i=this.h,i!==null&&d in i&&(i=this.h,d in i&&delete i[d])),this.j=new In(this)}I(He,Re),He.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){ri(this.g)},He.prototype.o=function(i){var d=this.g;if(typeof i=="string"){var h={};h.__data__=i,i=h}else this.u&&(h={},h.__data__=Hs(i),i=h);d.i.push(new Np(d.Ya++,i)),d.G==3&&vo(d)},He.prototype.N=function(){this.g.l=null,delete this.j,ri(this.g),delete this.g,He.aa.N.call(this)};function Kc(i){Ws.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var d=i.__sm__;if(d){e:{for(const h in d){i=h;break e}i=void 0}(this.i=i)&&(i=this.i,d=d!==null&&i in d?d[i]:void 0),this.data=d}else this.data=i}I(Kc,Ws);function Xc(){Ks.call(this),this.status=1}I(Xc,Ks);function In(i){this.g=i}I(In,Wc),In.prototype.ua=function(){Oe(this.g,"a")},In.prototype.ta=function(i){Oe(this.g,new Kc(i))},In.prototype.sa=function(i){Oe(this.g,new Xc)},In.prototype.ra=function(){Oe(this.g,"b")},_o.prototype.createWebChannel=_o.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,Gd=function(){return new _o},Hd=function(){return ao()},zd=en,Ii={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},co.NO_ERROR=0,co.TIMEOUT=8,co.HTTP_ERROR=6,Ro=co,uc.COMPLETE="complete",jd=uc,ic.EventType=nr,nr.OPEN="a",nr.CLOSE="b",nr.ERROR="c",nr.MESSAGE="d",Re.prototype.listen=Re.prototype.K,fr=ic,pe.prototype.listenOnce=pe.prototype.L,pe.prototype.getLastError=pe.prototype.Ka,pe.prototype.getLastErrorCode=pe.prototype.Ba,pe.prototype.getStatus=pe.prototype.Z,pe.prototype.getResponseJson=pe.prototype.Oa,pe.prototype.getResponseText=pe.prototype.oa,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Ha,qd=pe}).apply(typeof xo<"u"?xo:typeof self<"u"?self:typeof window<"u"?window:{});const ll="@firebase/firestore",dl="4.9.0";/**
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
 */class Ne{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ne.UNAUTHENTICATED=new Ne(null),Ne.GOOGLE_CREDENTIALS=new Ne("google-credentials-uid"),Ne.FIRST_PARTY=new Ne("first-party-uid"),Ne.MOCK_USER=new Ne("mock-user");/**
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
 */let Kn="12.0.0";/**
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
 */const dn=new Hi("@firebase/firestore");function An(){return dn.logLevel}function O(n,...e){if(dn.logLevel<=X.DEBUG){const t=e.map(Ki);dn.debug(`Firestore (${Kn}): ${n}`,...t)}}function xt(n,...e){if(dn.logLevel<=X.ERROR){const t=e.map(Ki);dn.error(`Firestore (${Kn}): ${n}`,...t)}}function un(n,...e){if(dn.logLevel<=X.WARN){const t=e.map(Ki);dn.warn(`Firestore (${Kn}): ${n}`,...t)}}function Ki(n){if(typeof n=="string")return n;try{/**
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
 */function U(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Wd(n,r,t)}function Wd(n,e,t){let r=`FIRESTORE (${Kn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw xt(r),new Error(r)}function ne(n,e,t,r){let o="Unexpected state";typeof t=="string"?o=t:r=t,n||Wd(e,o,r)}function G(n,e){return n}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends St{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class vt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Kd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Xd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ne.UNAUTHENTICATED))}shutdown(){}}class Fg{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class $g{constructor(e){this.t=e,this.currentUser=Ne.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ne(this.o===void 0,42304);let r=this.i;const o=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new vt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new vt,e.enqueueRetryable(()=>o(this.currentUser))};const a=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await o(this.currentUser)})},l=c=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new vt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ne(typeof r.accessToken=="string",31837,{l:r}),new Kd(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string",2055,{h:e}),new Ne(e)}}class Bg{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ne.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Ug{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Bg(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ne.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ul{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class qg{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Je(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ne(this.o===void 0,3512);const r=s=>{s.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const o=s=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>o(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?o(s):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ul(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ul(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function jg(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class as{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const o=jg(40);for(let s=0;s<o.length;++s)r.length<20&&o[s]<t&&(r+=e.charAt(o[s]%62))}return r}}function Q(n,e){return n<e?-1:n>e?1:0}function Si(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const o=n.charAt(r),s=e.charAt(r);if(o!==s)return hi(o)===hi(s)?Q(o,s):hi(o)?1:-1}return Q(n.length,e.length)}const zg=55296,Hg=57343;function hi(n){const e=n.charCodeAt(0);return e>=zg&&e<=Hg}function On(n,e,t){return n.length===e.length&&n.every((r,o)=>t(r,e[o]))}/**
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
 */const hl="__name__";class ot{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&U(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return ot.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ot?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let o=0;o<r;o++){const s=ot.compareSegments(e.get(o),t.get(o));if(s!==0)return s}return Q(e.length,t.length)}static compareSegments(e,t){const r=ot.isNumericId(e),o=ot.isNumericId(t);return r&&!o?-1:!r&&o?1:r&&o?ot.extractNumericId(e).compare(ot.extractNumericId(t)):Si(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return $t.fromString(e.substring(4,e.length-2))}}class ae extends ot{construct(e,t,r){return new ae(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(o=>o.length>0))}return new ae(t)}static emptyPath(){return new ae([])}}const Gg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class _e extends ot{construct(e,t,r){return new _e(e,t,r)}static isValidIdentifier(e){return Gg.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),_e.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===hl}static keyField(){return new _e([hl])}static fromServerFormat(e){const t=[];let r="",o=0;const s=()=>{if(r.length===0)throw new V(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;o<e.length;){const l=e[o];if(l==="\\"){if(o+1===e.length)throw new V(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[o+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new V(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,o+=2}else l==="`"?(a=!a,o++):l!=="."||a?(r+=l,o++):(s(),o++)}if(s(),a)throw new V(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new _e(t)}static emptyPath(){return new _e([])}}/**
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
 */function Qd(n,e,t){if(!t)throw new V(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Yd(n,e,t,r){if(e===!0&&r===!0)throw new V(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function pl(n){if(!B.isDocumentKey(n))throw new V(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function fl(n){if(B.isDocumentKey(n))throw new V(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Jd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function cs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function $e(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=cs(n);throw new V(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Wg(n,e){if(e<=0)throw new V(C.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */function we(n,e){const t={typeString:n};return e&&(t.value=e),t}function jr(n,e){if(!Jd(n))throw new V(C.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const o=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(o&&typeof a!==o){t=`JSON field '${r}' must be a ${o}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new V(C.INVALID_ARGUMENT,t);return!0}/**
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
 */const gl=-62135596800,ml=1e6;class ce{static now(){return ce.fromMillis(Date.now())}static fromDate(e){return ce.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*ml);return new ce(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<gl)throw new V(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ml}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ce._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(jr(e,ce._jsonSchema))return new ce(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-gl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ce._jsonSchemaVersion="firestore/timestamp/1.0",ce._jsonSchema={type:we("string",ce._jsonSchemaVersion),seconds:we("number"),nanoseconds:we("number")};/**
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
 */const Cr=-1;function Kg(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,o=H.fromTimestamp(r===1e9?new ce(t+1,0):new ce(t,r));return new zt(o,B.empty(),e)}function Xg(n){return new zt(n.readTime,n.key,Cr)}class zt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new zt(H.min(),B.empty(),Cr)}static max(){return new zt(H.max(),B.empty(),Cr)}}function Qg(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=B.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
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
 */const Yg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Jg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Xn(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==Yg)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((r,o)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,o)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,o)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,r)=>{t(e)})}static reject(e){return new P((t,r)=>{r(e)})}static waitFor(e){return new P((t,r)=>{let o=0,s=0,a=!1;e.forEach(l=>{++o,l.next(()=>{++s,a&&s===o&&t()},c=>r(c))}),a=!0,s===o&&t()})}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next(o=>o?P.resolve(o):r());return t}static forEach(e,t){const r=[];return e.forEach((o,s)=>{r.push(t.call(this,o,s))}),this.waitFor(r)}static mapArray(e,t){return new P((r,o)=>{const s=e.length,a=new Array(s);let l=0;for(let c=0;c<s;c++){const u=c;t(e[u]).next(p=>{a[u]=p,++l,l===s&&r(a)},p=>o(p))}})}static doWhile(e,t){return new P((r,o)=>{const s=()=>{e()===!0?t().next(()=>{s()},o):r()};s()})}}function Zg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Qn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ls{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ls.ce=-1;/**
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
 */const Xi=-1;function ds(n){return n==null}function Uo(n){return n===0&&1/n==-1/0}function em(n){return typeof n=="number"&&Number.isInteger(n)&&!Uo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Zd="";function tm(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=wl(e)),e=nm(n.get(t),e);return wl(e)}function nm(n,e){let t=e;const r=n.length;for(let o=0;o<r;o++){const s=n.charAt(o);switch(s){case"\0":t+="";break;case Zd:t+="";break;default:t+=s}}return t}function wl(n){return n+Zd+""}/**
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
 */function yl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Jt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function eu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class he{constructor(e,t){this.comparator=e,this.root=t||Se.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Se.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Se.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const o=this.comparator(e,r.key);if(o===0)return t+r.left.size;o<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new To(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new To(this.root,e,this.comparator,!1)}getReverseIterator(){return new To(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new To(this.root,e,this.comparator,!0)}}class To{constructor(e,t,r,o){this.isReverse=o,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&o&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Se{constructor(e,t,r,o,s){this.key=e,this.value=t,this.color=r??Se.RED,this.left=o??Se.EMPTY,this.right=s??Se.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,o,s){return new Se(e??this.key,t??this.value,r??this.color,o??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let o=this;const s=r(e,o.key);return o=s<0?o.copy(null,null,null,o.left.insert(e,t,r),null):s===0?o.copy(null,t,null,null,null):o.copy(null,null,null,null,o.right.insert(e,t,r)),o.fixUp()}removeMin(){if(this.left.isEmpty())return Se.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,o=this;if(t(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,t),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),t(e,o.key)===0){if(o.right.isEmpty())return Se.EMPTY;r=o.right.min(),o=o.copy(r.key,r.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,t))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}}Se.EMPTY=null,Se.RED=!0,Se.BLACK=!1;Se.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,r,o,s){return this}insert(e,t,r){return new Se(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ye{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const o=r.getNext();if(this.comparator(o.key,e[1])>=0)return;t(o.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new vl(this.data.getIterator())}getIteratorFrom(e){return new vl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const o=t.getNext().key,s=r.getNext().key;if(this.comparator(o,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class vl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class We{constructor(e){this.fields=e,e.sort(_e.comparator)}static empty(){return new We([])}unionWith(e){let t=new ye(_e.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new We(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return On(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class tu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class xe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(o){try{return atob(o)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new tu("Invalid base64 string: "+s):s}}(e);return new xe(t)}static fromUint8Array(e){const t=function(o){let s="";for(let a=0;a<o.length;++a)s+=String.fromCharCode(o[a]);return s}(e);return new xe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let o=0;o<t.length;o++)r[o]=t.charCodeAt(o);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}xe.EMPTY_BYTE_STRING=new xe("");const rm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ht(n){if(ne(!!n,39018),typeof n=="string"){let e=0;const t=rm.exec(n);if(ne(!!t,46558,{timestamp:n}),t[1]){let o=t[1];o=(o+"000000000").substr(0,9),e=Number(o)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:fe(n.seconds),nanos:fe(n.nanos)}}function fe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Gt(n){return typeof n=="string"?xe.fromBase64String(n):xe.fromUint8Array(n)}/**
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
 */const nu="server_timestamp",ru="__type__",ou="__previous_value__",su="__local_write_time__";function Qi(n){return(n?.mapValue?.fields||{})[ru]?.stringValue===nu}function us(n){const e=n.mapValue.fields[ou];return Qi(e)?us(e):e}function Pr(n){const e=Ht(n.mapValue.fields[su].timestampValue);return new ce(e.seconds,e.nanos)}/**
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
 */class om{constructor(e,t,r,o,s,a,l,c,u,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=o,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u,this.isUsingEmulator=p}}const qo="(default)";class Fn{constructor(e,t){this.projectId=e,this.database=t||qo}static empty(){return new Fn("","")}get isDefaultDatabase(){return this.database===qo}isEqual(e){return e instanceof Fn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const iu="__type__",sm="__max__",Io={mapValue:{}},au="__vector__",jo="value";function Wt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Qi(n)?4:am(n)?9007199254740991:im(n)?10:11:U(28295,{value:n})}function ct(n,e){if(n===e)return!0;const t=Wt(n);if(t!==Wt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Pr(n).isEqual(Pr(e));case 3:return function(o,s){if(typeof o.timestampValue=="string"&&typeof s.timestampValue=="string"&&o.timestampValue.length===s.timestampValue.length)return o.timestampValue===s.timestampValue;const a=Ht(o.timestampValue),l=Ht(s.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(o,s){return Gt(o.bytesValue).isEqual(Gt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(o,s){return fe(o.geoPointValue.latitude)===fe(s.geoPointValue.latitude)&&fe(o.geoPointValue.longitude)===fe(s.geoPointValue.longitude)}(n,e);case 2:return function(o,s){if("integerValue"in o&&"integerValue"in s)return fe(o.integerValue)===fe(s.integerValue);if("doubleValue"in o&&"doubleValue"in s){const a=fe(o.doubleValue),l=fe(s.doubleValue);return a===l?Uo(a)===Uo(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return On(n.arrayValue.values||[],e.arrayValue.values||[],ct);case 10:case 11:return function(o,s){const a=o.mapValue.fields||{},l=s.mapValue.fields||{};if(yl(a)!==yl(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!ct(a[c],l[c])))return!1;return!0}(n,e);default:return U(52216,{left:n})}}function Dr(n,e){return(n.values||[]).find(t=>ct(t,e))!==void 0}function $n(n,e){if(n===e)return 0;const t=Wt(n),r=Wt(e);if(t!==r)return Q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return function(s,a){const l=fe(s.integerValue||s.doubleValue),c=fe(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return bl(n.timestampValue,e.timestampValue);case 4:return bl(Pr(n),Pr(e));case 5:return Si(n.stringValue,e.stringValue);case 6:return function(s,a){const l=Gt(s),c=Gt(a);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const l=s.split("/"),c=a.split("/");for(let u=0;u<l.length&&u<c.length;u++){const p=Q(l[u],c[u]);if(p!==0)return p}return Q(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const l=Q(fe(s.latitude),fe(a.latitude));return l!==0?l:Q(fe(s.longitude),fe(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return _l(n.arrayValue,e.arrayValue);case 10:return function(s,a){const l=s.fields||{},c=a.fields||{},u=l[jo]?.arrayValue,p=c[jo]?.arrayValue,g=Q(u?.values?.length||0,p?.values?.length||0);return g!==0?g:_l(u,p)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===Io.mapValue&&a===Io.mapValue)return 0;if(s===Io.mapValue)return 1;if(a===Io.mapValue)return-1;const l=s.fields||{},c=Object.keys(l),u=a.fields||{},p=Object.keys(u);c.sort(),p.sort();for(let g=0;g<c.length&&g<p.length;++g){const m=Si(c[g],p[g]);if(m!==0)return m;const T=$n(l[c[g]],u[p[g]]);if(T!==0)return T}return Q(c.length,p.length)}(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function bl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=Ht(n),r=Ht(e),o=Q(t.seconds,r.seconds);return o!==0?o:Q(t.nanos,r.nanos)}function _l(n,e){const t=n.values||[],r=e.values||[];for(let o=0;o<t.length&&o<r.length;++o){const s=$n(t[o],r[o]);if(s)return s}return Q(t.length,r.length)}function Bn(n){return Ai(n)}function Ai(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Ht(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Gt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return B.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",o=!0;for(const s of t.values||[])o?o=!1:r+=",",r+=Ai(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let o="{",s=!0;for(const a of r)s?s=!1:o+=",",o+=`${a}:${Ai(t.fields[a])}`;return o+"}"}(n.mapValue):U(61005,{value:n})}function Co(n){switch(Wt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=us(n);return e?16+Co(e):16;case 5:return 2*n.stringValue.length;case 6:return Gt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((o,s)=>o+Co(s),0)}(n.arrayValue);case 10:case 11:return function(r){let o=0;return Jt(r.fields,(s,a)=>{o+=s.length+Co(a)}),o}(n.mapValue);default:throw U(13486,{value:n})}}function El(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ki(n){return!!n&&"integerValue"in n}function Yi(n){return!!n&&"arrayValue"in n}function xl(n){return!!n&&"nullValue"in n}function Tl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Po(n){return!!n&&"mapValue"in n}function im(n){return(n?.mapValue?.fields||{})[iu]?.stringValue===au}function yr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Jt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=yr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=yr(n.arrayValue.values[t]);return e}return{...n}}function am(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===sm}/**
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
 */class qe{constructor(e){this.value=e}static empty(){return new qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Po(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=yr(t)}setAll(e){let t=_e.emptyPath(),r={},o=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,r,o),r={},o=[],t=l.popLast()}a?r[l.lastSegment()]=yr(a):o.push(l.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,o)}delete(e){const t=this.field(e.popLast());Po(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let o=t.mapValue.fields[e.get(r)];Po(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=o),t=o}return t.mapValue.fields}applyChanges(e,t,r){Jt(t,(o,s)=>e[o]=s);for(const o of r)delete e[o]}clone(){return new qe(yr(this.value))}}function cu(n){const e=[];return Jt(n.fields,(t,r)=>{const o=new _e([t]);if(Po(r)){const s=cu(r.mapValue).fields;if(s.length===0)e.push(o);else for(const a of s)e.push(o.child(a))}else e.push(o)}),new We(e)}/**
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
 */class Me{constructor(e,t,r,o,s,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=o,this.createTime=s,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Me(e,0,H.min(),H.min(),H.min(),qe.empty(),0)}static newFoundDocument(e,t,r,o){return new Me(e,1,t,H.min(),r,o,0)}static newNoDocument(e,t){return new Me(e,2,t,H.min(),H.min(),qe.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,H.min(),H.min(),qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class zo{constructor(e,t){this.position=e,this.inclusive=t}}function Il(n,e,t){let r=0;for(let o=0;o<n.position.length;o++){const s=e[o],a=n.position[o];if(s.field.isKeyField()?r=B.comparator(B.fromName(a.referenceValue),t.key):r=$n(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ct(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Nr{constructor(e,t="asc"){this.field=e,this.dir=t}}function cm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class lu{}class me extends lu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new dm(e,t,r):t==="array-contains"?new pm(e,r):t==="in"?new fm(e,r):t==="not-in"?new gm(e,r):t==="array-contains-any"?new mm(e,r):new me(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new um(e,r):new hm(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison($n(t,this.value)):t!==null&&Wt(this.value)===Wt(t)&&this.matchesComparison($n(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class rt extends lu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new rt(e,t)}matches(e){return du(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function du(n){return n.op==="and"}function uu(n){return lm(n)&&du(n)}function lm(n){for(const e of n.filters)if(e instanceof rt)return!1;return!0}function Ri(n){if(n instanceof me)return n.field.canonicalString()+n.op.toString()+Bn(n.value);if(uu(n))return n.filters.map(e=>Ri(e)).join(",");{const e=n.filters.map(t=>Ri(t)).join(",");return`${n.op}(${e})`}}function hu(n,e){return n instanceof me?function(r,o){return o instanceof me&&r.op===o.op&&r.field.isEqual(o.field)&&ct(r.value,o.value)}(n,e):n instanceof rt?function(r,o){return o instanceof rt&&r.op===o.op&&r.filters.length===o.filters.length?r.filters.reduce((s,a,l)=>s&&hu(a,o.filters[l]),!0):!1}(n,e):void U(19439)}function pu(n){return n instanceof me?function(t){return`${t.field.canonicalString()} ${t.op} ${Bn(t.value)}`}(n):n instanceof rt?function(t){return t.op.toString()+" {"+t.getFilters().map(pu).join(" ,")+"}"}(n):"Filter"}class dm extends me{constructor(e,t,r){super(e,t,r),this.key=B.fromName(r.referenceValue)}matches(e){const t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class um extends me{constructor(e,t){super(e,"in",t),this.keys=fu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class hm extends me{constructor(e,t){super(e,"not-in",t),this.keys=fu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function fu(n,e){return(e.arrayValue?.values||[]).map(t=>B.fromName(t.referenceValue))}class pm extends me{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Yi(t)&&Dr(t.arrayValue,this.value)}}class fm extends me{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Dr(this.value.arrayValue,t)}}class gm extends me{constructor(e,t){super(e,"not-in",t)}matches(e){if(Dr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Dr(this.value.arrayValue,t)}}class mm extends me{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Yi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Dr(this.value.arrayValue,r))}}/**
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
 */class wm{constructor(e,t=null,r=[],o=[],s=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=o,this.limit=s,this.startAt=a,this.endAt=l,this.Te=null}}function Al(n,e=null,t=[],r=[],o=null,s=null,a=null){return new wm(n,e,t,r,o,s,a)}function Ji(n){const e=G(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ri(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ds(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Bn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Bn(r)).join(",")),e.Te=t}return e.Te}function Zi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!cm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!hu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Sl(n.startAt,e.startAt)&&Sl(n.endAt,e.endAt)}function Ci(n){return B.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Yn{constructor(e,t=null,r=[],o=[],s=null,a="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=o,this.limit=s,this.limitType=a,this.startAt=l,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function ym(n,e,t,r,o,s,a,l){return new Yn(n,e,t,r,o,s,a,l)}function hs(n){return new Yn(n)}function kl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function gu(n){return n.collectionGroup!==null}function vr(n){const e=G(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ye(_e.comparator);return a.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(l=l.add(u.field))})}),l})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Nr(s,r))}),t.has(_e.keyField().canonicalString())||e.Ie.push(new Nr(_e.keyField(),r))}return e.Ie}function st(n){const e=G(n);return e.Ee||(e.Ee=vm(e,vr(n))),e.Ee}function vm(n,e){if(n.limitType==="F")return Al(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(o=>{const s=o.dir==="desc"?"asc":"desc";return new Nr(o.field,s)});const t=n.endAt?new zo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new zo(n.startAt.position,n.startAt.inclusive):null;return Al(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Pi(n,e){const t=n.filters.concat([e]);return new Yn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ho(n,e,t){return new Yn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ps(n,e){return Zi(st(n),st(e))&&n.limitType===e.limitType}function mu(n){return`${Ji(st(n))}|lt:${n.limitType}`}function kn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(o=>pu(o)).join(", ")}]`),ds(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(o=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(o)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(o=>Bn(o)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(o=>Bn(o)).join(",")),`Target(${r})`}(st(n))}; limitType=${n.limitType})`}function fs(n,e){return e.isFoundDocument()&&function(r,o){const s=o.key.path;return r.collectionGroup!==null?o.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):B.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,o){for(const s of vr(r))if(!s.field.isKeyField()&&o.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,o){for(const s of r.filters)if(!s.matches(o))return!1;return!0}(n,e)&&function(r,o){return!(r.startAt&&!function(a,l,c){const u=Il(a,l,c);return a.inclusive?u<=0:u<0}(r.startAt,vr(r),o)||r.endAt&&!function(a,l,c){const u=Il(a,l,c);return a.inclusive?u>=0:u>0}(r.endAt,vr(r),o))}(n,e)}function bm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function wu(n){return(e,t)=>{let r=!1;for(const o of vr(n)){const s=_m(o,e,t);if(s!==0)return s;r=r||o.field.isKeyField()}return 0}}function _m(n,e,t){const r=n.field.isKeyField()?B.comparator(e.key,t.key):function(s,a,l){const c=a.data.field(s),u=l.data.field(s);return c!==null&&u!==null?$n(c,u):U(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U(19790,{direction:n.dir})}}/**
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
 */class mn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[o,s]of r)if(this.equalsFn(o,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),o=this.inner[r];if(o===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<o.length;s++)if(this.equalsFn(o[s][0],e))return void(o[s]=[e,t]);o.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let o=0;o<r.length;o++)if(this.equalsFn(r[o][0],e))return r.length===1?delete this.inner[t]:r.splice(o,1),this.innerSize--,!0;return!1}forEach(e){Jt(this.inner,(t,r)=>{for(const[o,s]of r)e(o,s)})}isEmpty(){return eu(this.inner)}size(){return this.innerSize}}/**
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
 */const Em=new he(B.comparator);function Tt(){return Em}const yu=new he(B.comparator);function gr(...n){let e=yu;for(const t of n)e=e.insert(t.key,t);return e}function vu(n){let e=yu;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function sn(){return br()}function bu(){return br()}function br(){return new mn(n=>n.toString(),(n,e)=>n.isEqual(e))}const xm=new he(B.comparator),Tm=new ye(B.comparator);function Y(...n){let e=Tm;for(const t of n)e=e.add(t);return e}const Im=new ye(Q);function Sm(){return Im}/**
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
 */function ea(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Uo(e)?"-0":e}}function _u(n){return{integerValue:""+n}}function Am(n,e){return em(e)?_u(e):ea(n,e)}/**
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
 */class gs{constructor(){this._=void 0}}function km(n,e,t){return n instanceof Mr?function(o,s){const a={fields:{[ru]:{stringValue:nu},[su]:{timestampValue:{seconds:o.seconds,nanos:o.nanoseconds}}}};return s&&Qi(s)&&(s=us(s)),s&&(a.fields[ou]=s),{mapValue:a}}(t,e):n instanceof Un?xu(n,e):n instanceof qn?Tu(n,e):function(o,s){const a=Eu(o,s),l=Rl(a)+Rl(o.Ae);return ki(a)&&ki(o.Ae)?_u(l):ea(o.serializer,l)}(n,e)}function Rm(n,e,t){return n instanceof Un?xu(n,e):n instanceof qn?Tu(n,e):t}function Eu(n,e){return n instanceof Go?function(r){return ki(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Mr extends gs{}class Un extends gs{constructor(e){super(),this.elements=e}}function xu(n,e){const t=Iu(e);for(const r of n.elements)t.some(o=>ct(o,r))||t.push(r);return{arrayValue:{values:t}}}class qn extends gs{constructor(e){super(),this.elements=e}}function Tu(n,e){let t=Iu(e);for(const r of n.elements)t=t.filter(o=>!ct(o,r));return{arrayValue:{values:t}}}class Go extends gs{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Rl(n){return fe(n.integerValue||n.doubleValue)}function Iu(n){return Yi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class ta{constructor(e,t){this.field=e,this.transform=t}}function Cm(n,e){return n.field.isEqual(e.field)&&function(r,o){return r instanceof Un&&o instanceof Un||r instanceof qn&&o instanceof qn?On(r.elements,o.elements,ct):r instanceof Go&&o instanceof Go?ct(r.Ae,o.Ae):r instanceof Mr&&o instanceof Mr}(n.transform,e.transform)}class Pm{constructor(e,t){this.version=e,this.transformResults=t}}class Xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Xe}static exists(e){return new Xe(void 0,e)}static updateTime(e){return new Xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Do(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ms{}function Su(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new na(n.key,Xe.none()):new zr(n.key,n.data,Xe.none());{const t=n.data,r=qe.empty();let o=new ye(_e.comparator);for(let s of e.fields)if(!o.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),o=o.add(s)}return new Zt(n.key,r,new We(o.toArray()),Xe.none())}}function Dm(n,e,t){n instanceof zr?function(o,s,a){const l=o.value.clone(),c=Pl(o.fieldTransforms,s,a.transformResults);l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Zt?function(o,s,a){if(!Do(o.precondition,s))return void s.convertToUnknownDocument(a.version);const l=Pl(o.fieldTransforms,s,a.transformResults),c=s.data;c.setAll(Au(o)),c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):function(o,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function _r(n,e,t,r){return n instanceof zr?function(s,a,l,c){if(!Do(s.precondition,a))return l;const u=s.value.clone(),p=Dl(s.fieldTransforms,c,a);return u.setAll(p),a.convertToFoundDocument(a.version,u).setHasLocalMutations(),null}(n,e,t,r):n instanceof Zt?function(s,a,l,c){if(!Do(s.precondition,a))return l;const u=Dl(s.fieldTransforms,c,a),p=a.data;return p.setAll(Au(s)),p.setAll(u),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(s,a,l){return Do(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Nm(n,e){let t=null;for(const r of n.fieldTransforms){const o=e.data.field(r.field),s=Eu(r.transform,o||null);s!=null&&(t===null&&(t=qe.empty()),t.set(r.field,s))}return t||null}function Cl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,o){return r===void 0&&o===void 0||!(!r||!o)&&On(r,o,(s,a)=>Cm(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class zr extends ms{constructor(e,t,r,o=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=o,this.type=0}getFieldMask(){return null}}class Zt extends ms{constructor(e,t,r,o,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=o,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Au(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Pl(n,e,t){const r=new Map;ne(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let o=0;o<t.length;o++){const s=n[o],a=s.transform,l=e.data.field(s.field);r.set(s.field,Rm(a,l,t[o]))}return r}function Dl(n,e,t){const r=new Map;for(const o of n){const s=o.transform,a=t.data.field(o.field);r.set(o.field,km(s,a,e))}return r}class na extends ms{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Mm extends ms{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Vm{constructor(e,t,r,o){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=o}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let o=0;o<this.mutations.length;o++){const s=this.mutations[o];s.key.isEqual(e.key)&&Dm(s,e,r[o])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=_r(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=_r(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=bu();return this.mutations.forEach(o=>{const s=e.get(o.key),a=s.overlayedDocument;let l=this.applyToLocalView(a,s.mutatedFields);l=t.has(o.key)?null:l;const c=Su(a,l);c!==null&&r.set(o.key,c),a.isValidDocument()||a.convertToNoDocument(H.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Y())}isEqual(e){return this.batchId===e.batchId&&On(this.mutations,e.mutations,(t,r)=>Cl(t,r))&&On(this.baseMutations,e.baseMutations,(t,r)=>Cl(t,r))}}class ra{constructor(e,t,r,o){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=o}static from(e,t,r){ne(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let o=function(){return xm}();const s=e.mutations;for(let a=0;a<s.length;a++)o=o.insert(s[a].key,r[a].version);return new ra(e,t,r,o)}}/**
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
 */class Lm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Om{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var ge,J;function Fm(n){switch(n){case C.OK:return U(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function ku(n){if(n===void 0)return xt("GRPC error has no .code"),C.UNKNOWN;switch(n){case ge.OK:return C.OK;case ge.CANCELLED:return C.CANCELLED;case ge.UNKNOWN:return C.UNKNOWN;case ge.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case ge.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case ge.INTERNAL:return C.INTERNAL;case ge.UNAVAILABLE:return C.UNAVAILABLE;case ge.UNAUTHENTICATED:return C.UNAUTHENTICATED;case ge.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case ge.NOT_FOUND:return C.NOT_FOUND;case ge.ALREADY_EXISTS:return C.ALREADY_EXISTS;case ge.PERMISSION_DENIED:return C.PERMISSION_DENIED;case ge.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case ge.ABORTED:return C.ABORTED;case ge.OUT_OF_RANGE:return C.OUT_OF_RANGE;case ge.UNIMPLEMENTED:return C.UNIMPLEMENTED;case ge.DATA_LOSS:return C.DATA_LOSS;default:return U(39323,{code:n})}}(J=ge||(ge={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function $m(){return new TextEncoder}/**
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
 */const Bm=new $t([4294967295,4294967295],0);function Nl(n){const e=$m().encode(n),t=new Ud;return t.update(e),new Uint8Array(t.digest())}function Ml(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),o=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new $t([t,r],0),new $t([o,s],0)]}class oa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new mr(`Invalid padding: ${t}`);if(r<0)throw new mr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new mr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new mr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=$t.fromNumber(this.ge)}ye(e,t,r){let o=e.add(t.multiply($t.fromNumber(r)));return o.compare(Bm)===1&&(o=new $t([o.getBits(0),o.getBits(1)],0)),o.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Nl(e),[r,o]=Ml(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(r,o,s);if(!this.we(a))return!1}return!0}static create(e,t,r){const o=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new oa(s,o,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.ge===0)return;const t=Nl(e),[r,o]=Ml(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(r,o,s);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class mr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ws{constructor(e,t,r,o,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=o,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const o=new Map;return o.set(e,Hr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ws(H.min(),o,new he(Q),Tt(),Y())}}class Hr{constructor(e,t,r,o,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=o,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Hr(r,t,Y(),Y(),Y())}}/**
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
 */class No{constructor(e,t,r,o){this.be=e,this.removedTargetIds=t,this.key=r,this.De=o}}class Ru{constructor(e,t){this.targetId=e,this.Ce=t}}class Cu{constructor(e,t,r=xe.EMPTY_BYTE_STRING,o=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=o}}class Vl{constructor(){this.ve=0,this.Fe=Ll(),this.Me=xe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Y(),t=Y(),r=Y();return this.Fe.forEach((o,s)=>{switch(s){case 0:e=e.add(o);break;case 2:t=t.add(o);break;case 1:r=r.add(o);break;default:U(38017,{changeType:s})}}),new Hr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Ll()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,ne(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Um{constructor(e){this.Ge=e,this.ze=new Map,this.je=Tt(),this.Je=So(),this.He=So(),this.Ye=new he(Q)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:U(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,o)=>{this.rt(o)&&t(o)})}st(e){const t=e.targetId,r=e.Ce.count,o=this.ot(t);if(o){const s=o.target;if(Ci(s))if(r===0){const a=new B(s.path);this.et(t,a,Me.newNoDocument(a,H.min()))}else ne(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const l=this.ut(e),c=l?this.ct(l,e,a):1;if(c!==0){this.it(t);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,u)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:o=0},hashCount:s=0}=t;let a,l;try{a=Gt(r).toUint8Array()}catch(c){if(c instanceof tu)return un("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new oa(a,o,s)}catch(c){return un(c instanceof mr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let o=0;return r.forEach(s=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(t,s,null),o++)}),o}Tt(e){const t=new Map;this.ze.forEach((s,a)=>{const l=this.ot(a);if(l){if(s.current&&Ci(l.target)){const c=new B(l.target.path);this.It(c).has(a)||this.Et(a,c)||this.et(a,c,Me.newNoDocument(c,e))}s.Be&&(t.set(a,s.ke()),s.qe())}});let r=Y();this.He.forEach((s,a)=>{let l=!0;a.forEachWhile(c=>{const u=this.ot(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.je.forEach((s,a)=>a.setReadTime(e));const o=new ws(e,t,this.Ye,this.je,r);return this.je=Tt(),this.Je=So(),this.He=So(),this.Ye=new he(Q),o}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const o=this.nt(e);this.Et(e,t)?o.Qe(t,1):o.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Vl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new ye(Q),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ye(Q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Vl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function So(){return new he(B.comparator)}function Ll(){return new he(B.comparator)}const qm={asc:"ASCENDING",desc:"DESCENDING"},jm={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},zm={and:"AND",or:"OR"};class Hm{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Di(n,e){return n.useProto3Json||ds(e)?e:{value:e}}function Wo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Pu(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Gm(n,e){return Wo(n,e.toTimestamp())}function it(n){return ne(!!n,49232),H.fromTimestamp(function(t){const r=Ht(t);return new ce(r.seconds,r.nanos)}(n))}function sa(n,e){return Ni(n,e).canonicalString()}function Ni(n,e){const t=function(o){return new ae(["projects",o.projectId,"databases",o.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Du(n){const e=ae.fromString(n);return ne(Ou(e),10190,{key:e.toString()}),e}function Mi(n,e){return sa(n.databaseId,e.path)}function pi(n,e){const t=Du(e);if(t.get(1)!==n.databaseId.projectId)throw new V(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new B(Mu(t))}function Nu(n,e){return sa(n.databaseId,e)}function Wm(n){const e=Du(n);return e.length===4?ae.emptyPath():Mu(e)}function Vi(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Mu(n){return ne(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ol(n,e,t){return{name:Mi(n,e),fields:t.value.mapValue.fields}}function Km(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:U(39313,{state:u})}(e.targetChange.targetChangeType||"NO_CHANGE"),o=e.targetChange.targetIds||[],s=function(u,p){return u.useProto3Json?(ne(p===void 0||typeof p=="string",58123),xe.fromBase64String(p||"")):(ne(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),xe.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(u){const p=u.code===void 0?C.UNKNOWN:ku(u.code);return new V(p,u.message||"")}(a);t=new Cu(r,o,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const o=pi(n,r.document.name),s=it(r.document.updateTime),a=r.document.createTime?it(r.document.createTime):H.min(),l=new qe({mapValue:{fields:r.document.fields}}),c=Me.newFoundDocument(o,s,a,l),u=r.targetIds||[],p=r.removedTargetIds||[];t=new No(u,p,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const o=pi(n,r.document),s=r.readTime?it(r.readTime):H.min(),a=Me.newNoDocument(o,s),l=r.removedTargetIds||[];t=new No([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const o=pi(n,r.document),s=r.removedTargetIds||[];t=new No([],s,o,null)}else{if(!("filter"in e))return U(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:o=0,unchangedNames:s}=r,a=new Om(o,s),l=r.targetId;t=new Ru(l,a)}}return t}function Xm(n,e){let t;if(e instanceof zr)t={update:Ol(n,e.key,e.value)};else if(e instanceof na)t={delete:Mi(n,e.key)};else if(e instanceof Zt)t={update:Ol(n,e.key,e.data),updateMask:ow(e.fieldMask)};else{if(!(e instanceof Mm))return U(16599,{Vt:e.type});t={verify:Mi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const l=a.transform;if(l instanceof Mr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Un)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof qn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Go)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw U(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(o,s){return s.updateTime!==void 0?{updateTime:Gm(o,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:U(27497)}(n,e.precondition)),t}function Qm(n,e){return n&&n.length>0?(ne(e!==void 0,14353),n.map(t=>function(o,s){let a=o.updateTime?it(o.updateTime):it(s);return a.isEqual(H.min())&&(a=it(s)),new Pm(a,o.transformResults||[])}(t,e))):[]}function Ym(n,e){return{documents:[Nu(n,e.path)]}}function Jm(n,e){const t={structuredQuery:{}},r=e.path;let o;e.collectionGroup!==null?(o=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(o=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Nu(n,o);const s=function(u){if(u.length!==0)return Lu(rt.create(u,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(u){if(u.length!==0)return u.map(p=>function(m){return{field:Rn(m.field),direction:tw(m.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=Di(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{ft:t,parent:o}}function Zm(n){let e=Wm(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let o=null;if(r>0){ne(r===1,65062);const p=t.from[0];p.allDescendants?o=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(g){const m=Vu(g);return m instanceof rt&&uu(m)?m.getFilters():[m]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(m=>function(I){return new Nr(Cn(I.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(I.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(g){let m;return m=typeof g=="object"?g.value:g,ds(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(g){const m=!!g.before,T=g.values||[];return new zo(T,m)}(t.startAt));let u=null;return t.endAt&&(u=function(g){const m=!g.before,T=g.values||[];return new zo(T,m)}(t.endAt)),ym(e,o,a,s,l,"F",c,u)}function ew(n,e){const t=function(o){switch(o){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:o})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Vu(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Cn(t.unaryFilter.field);return me.create(r,"==",{doubleValue:NaN});case"IS_NULL":const o=Cn(t.unaryFilter.field);return me.create(o,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Cn(t.unaryFilter.field);return me.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Cn(t.unaryFilter.field);return me.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}}(n):n.fieldFilter!==void 0?function(t){return me.create(Cn(t.fieldFilter.field),function(o){switch(o){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return rt.create(t.compositeFilter.filters.map(r=>Vu(r)),function(o){switch(o){case"AND":return"and";case"OR":return"or";default:return U(1026)}}(t.compositeFilter.op))}(n):U(30097,{filter:n})}function tw(n){return qm[n]}function nw(n){return jm[n]}function rw(n){return zm[n]}function Rn(n){return{fieldPath:n.canonicalString()}}function Cn(n){return _e.fromServerFormat(n.fieldPath)}function Lu(n){return n instanceof me?function(t){if(t.op==="=="){if(Tl(t.value))return{unaryFilter:{field:Rn(t.field),op:"IS_NAN"}};if(xl(t.value))return{unaryFilter:{field:Rn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Tl(t.value))return{unaryFilter:{field:Rn(t.field),op:"IS_NOT_NAN"}};if(xl(t.value))return{unaryFilter:{field:Rn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Rn(t.field),op:nw(t.op),value:t.value}}}(n):n instanceof rt?function(t){const r=t.getFilters().map(o=>Lu(o));return r.length===1?r[0]:{compositeFilter:{op:rw(t.op),filters:r}}}(n):U(54877,{filter:n})}function ow(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ou(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Vt{constructor(e,t,r,o,s=H.min(),a=H.min(),l=xe.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=o,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Vt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class sw{constructor(e){this.yt=e}}function iw(n){const e=Zm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ho(e,e.limit,"L"):e}/**
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
 */class aw{constructor(){this.Cn=new cw}addToCollectionParentIndex(e,t){return this.Cn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(zt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(zt.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class cw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),o=this.index[t]||new ye(ae.comparator),s=!o.has(r);return this.index[t]=o.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),o=this.index[t];return o&&o.has(r)}getEntries(e){return(this.index[e]||new ye(ae.comparator)).toArray()}}/**
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
 */const Fl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Fu=41943040;class Ue{static withCacheSize(e){return new Ue(e,Ue.DEFAULT_COLLECTION_PERCENTILE,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Ue.DEFAULT_COLLECTION_PERCENTILE=10,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ue.DEFAULT=new Ue(Fu,Ue.DEFAULT_COLLECTION_PERCENTILE,Ue.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ue.DISABLED=new Ue(-1,0,0);/**
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
 */const $l="LruGarbageCollector",lw=1048576;function Bl([n,e],[t,r]){const o=Q(n,t);return o===0?Q(e,r):o}class dw{constructor(e){this.Ir=e,this.buffer=new ye(Bl),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Bl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class uw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){O($l,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Qn(t)?O($l,"Ignoring IndexedDB error during garbage collection: ",t):await Xn(t)}await this.Vr(3e5)})}}class hw{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return P.resolve(ls.ce);const r=new dw(t);return this.mr.forEachTarget(e,o=>r.Ar(o.sequenceNumber)).next(()=>this.mr.pr(e,o=>r.Ar(o))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Fl)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Fl):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,o,s,a,l,c,u;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),o=this.params.maximumSequenceNumbersToCollect):o=g,a=Date.now(),this.nthSequenceNumber(e,o))).next(g=>(r=g,l=Date.now(),this.removeTargets(e,r,t))).next(g=>(s=g,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(u=Date.now(),An()<=X.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${o} in `+(l-a)+`ms
	Removed ${s} targets in `+(c-l)+`ms
	Removed ${g} documents in `+(u-c)+`ms
Total Duration: ${u-p}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:o,targetsRemoved:s,documentsRemoved:g})))}}function pw(n,e){return new hw(n,e)}/**
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
 */class fw{constructor(){this.changes=new mn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class gw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class mw{constructor(e,t,r,o){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=o}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(o=>(r=o,this.remoteDocumentCache.getEntry(e,t))).next(o=>(r!==null&&_r(r.mutation,o,We.empty(),ce.now()),o))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Y()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Y()){const o=sn();return this.populateOverlays(e,o,t).next(()=>this.computeViews(e,t,o,r).next(s=>{let a=gr();return s.forEach((l,c)=>{a=a.insert(l,c.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=sn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Y()))}populateOverlays(e,t,r){const o=[];return r.forEach(s=>{t.has(s)||o.push(s)}),this.documentOverlayCache.getOverlays(e,o).next(s=>{s.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,o){let s=Tt();const a=br(),l=function(){return br()}();return t.forEach((c,u)=>{const p=r.get(u.key);o.has(u.key)&&(p===void 0||p.mutation instanceof Zt)?s=s.insert(u.key,u):p!==void 0?(a.set(u.key,p.mutation.getFieldMask()),_r(p.mutation,u,p.mutation.getFieldMask(),ce.now())):a.set(u.key,We.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((u,p)=>a.set(u,p)),t.forEach((u,p)=>l.set(u,new gw(p,a.get(u)??null))),l))}recalculateAndSaveOverlays(e,t){const r=br();let o=new he((a,l)=>a-l),s=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(c=>{const u=t.get(c);if(u===null)return;let p=r.get(c)||We.empty();p=l.applyToLocalView(u,p),r.set(c,p);const g=(o.get(l.batchId)||Y()).add(c);o=o.insert(l.batchId,g)})}).next(()=>{const a=[],l=o.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,p=c.value,g=bu();p.forEach(m=>{if(!s.has(m)){const T=Su(t.get(m),r.get(m));T!==null&&g.set(m,T),s=s.add(m)}}),a.push(this.documentOverlayCache.saveOverlays(e,u,g))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,o){return function(a){return B.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):gu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,o):this.getDocumentsMatchingCollectionQuery(e,t,r,o)}getNextDocuments(e,t,r,o){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,o).next(s=>{const a=o-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,o-s.size):P.resolve(sn());let l=Cr,c=s;return a.next(u=>P.forEach(u,(p,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),s.get(p)?P.resolve():this.remoteDocumentCache.getEntry(e,p).next(m=>{c=c.insert(p,m)}))).next(()=>this.populateOverlays(e,u,s)).next(()=>this.computeViews(e,c,u,Y())).next(p=>({batchId:l,changes:vu(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next(r=>{let o=gr();return r.isFoundDocument()&&(o=o.insert(r.key,r)),o})}getDocumentsMatchingCollectionGroupQuery(e,t,r,o){const s=t.collectionGroup;let a=gr();return this.indexManager.getCollectionParents(e,s).next(l=>P.forEach(l,c=>{const u=function(g,m){return new Yn(m,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,r,o).next(p=>{p.forEach((g,m)=>{a=a.insert(g,m)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,o){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,o))).next(a=>{s.forEach((c,u)=>{const p=u.getKey();a.get(p)===null&&(a=a.insert(p,Me.newInvalidDocument(p)))});let l=gr();return a.forEach((c,u)=>{const p=s.get(c);p!==void 0&&_r(p.mutation,u,We.empty(),ce.now()),fs(t,u)&&(l=l.insert(c,u))}),l})}}/**
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
 */class ww{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return P.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(o){return{id:o.id,version:o.version,createTime:it(o.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(o){return{name:o.name,query:iw(o.bundledQuery),readTime:it(o.readTime)}}(t)),P.resolve()}}/**
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
 */class yw{constructor(){this.overlays=new he(B.comparator),this.qr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=sn();return P.forEach(t,o=>this.getOverlay(e,o).next(s=>{s!==null&&r.set(o,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((o,s)=>{this.St(e,t,s)}),P.resolve()}removeOverlaysForBatchId(e,t,r){const o=this.qr.get(r);return o!==void 0&&(o.forEach(s=>this.overlays=this.overlays.remove(s)),this.qr.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const o=sn(),s=t.length+1,a=new B(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&c.largestBatchId>r&&o.set(c.getKey(),c)}return P.resolve(o)}getOverlaysForCollectionGroup(e,t,r,o){let s=new he((u,p)=>u-p);const a=this.overlays.getIterator();for(;a.hasNext();){const u=a.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>r){let p=s.get(u.largestBatchId);p===null&&(p=sn(),s=s.insert(u.largestBatchId,p)),p.set(u.getKey(),u)}}const l=sn(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,p)=>l.set(u,p)),!(l.size()>=o)););return P.resolve(l)}St(e,t,r){const o=this.overlays.get(r.key);if(o!==null){const a=this.qr.get(o.largestBatchId).delete(r.key);this.qr.set(o.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Lm(t,r));let s=this.qr.get(t);s===void 0&&(s=Y(),this.qr.set(t,s)),this.qr.set(t,s.add(r.key))}}/**
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
 */class vw{constructor(){this.sessionToken=xe.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
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
 */class ia{constructor(){this.Qr=new ye(be.$r),this.Ur=new ye(be.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new be(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new be(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new B(new ae([])),r=new be(t,e),o=new be(t,e+1),s=[];return this.Ur.forEachInRange([r,o],a=>{this.Gr(a),s.push(a.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new B(new ae([])),r=new be(t,e),o=new be(t,e+1);let s=Y();return this.Ur.forEachInRange([r,o],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new be(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class be{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return B.comparator(e.key,t.key)||Q(e.Yr,t.Yr)}static Kr(e,t){return Q(e.Yr,t.Yr)||B.comparator(e.key,t.key)}}/**
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
 */class bw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new ye(be.$r)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,o){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Vm(s,t,r,o);this.mutationQueue.push(a);for(const l of o)this.Zr=this.Zr.add(new be(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,o=this.ei(r),s=o<0?0:o;return P.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Xi:this.tr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new be(t,0),o=new be(t,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([r,o],a=>{const l=this.Xr(a.Yr);s.push(l)}),P.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(Q);return t.forEach(o=>{const s=new be(o,0),a=new be(o,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([s,a],l=>{r=r.add(l.Yr)})}),P.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,o=r.length+1;let s=r;B.isDocumentKey(s)||(s=s.child(""));const a=new be(new B(s),0);let l=new ye(Q);return this.Zr.forEachWhile(c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===o&&(l=l.add(c.Yr)),!0)},a),P.resolve(this.ti(l))}ti(e){const t=[];return e.forEach(r=>{const o=this.Xr(r);o!==null&&t.push(o)}),t}removeMutationBatch(e,t){ne(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return P.forEach(t.mutations,o=>{const s=new be(o.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,o.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new be(t,0),o=this.Zr.firstAfterOrEqual(r);return P.resolve(t.isEqual(o&&o.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class _w{constructor(e){this.ri=e,this.docs=function(){return new he(B.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,o=this.docs.get(r),s=o?o.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=Tt();return t.forEach(o=>{const s=this.docs.get(o);r=r.insert(o,s?s.document.mutableCopy():Me.newInvalidDocument(o))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,o){let s=Tt();const a=t.path,l=new B(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:p}}=c.getNext();if(!a.isPrefixOf(u.path))break;u.path.length>a.length+1||Qg(Xg(p),r)<=0||(o.has(p.key)||fs(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return P.resolve(s)}getAllFromCollectionGroup(e,t,r,o){U(9500)}ii(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Ew(this)}getSize(e){return P.resolve(this.size)}}class Ew extends fw{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,o)=>{o.isValidDocument()?t.push(this.Nr.addEntry(e,o)):this.Nr.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class xw{constructor(e){this.persistence=e,this.si=new mn(t=>Ji(t),Zi),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.oi=0,this._i=new ia,this.targetCount=0,this.ai=jn.ur()}forEachTarget(e,t){return this.si.forEach((r,o)=>t(o)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),P.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new jn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Pr(t),P.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let o=0;const s=[];return this.si.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.si.delete(a),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),o++)}),P.waitFor(s).next(()=>o)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const o=this.persistence.referenceDelegate,s=[];return o&&t.forEach(a=>{s.push(o.markPotentiallyOrphaned(e,a))}),P.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this._i.containsKey(t))}}/**
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
 */class $u{constructor(e,t){this.ui={},this.overlays={},this.ci=new ls(0),this.li=!1,this.li=!0,this.hi=new vw,this.referenceDelegate=e(this),this.Pi=new xw(this),this.indexManager=new aw,this.remoteDocumentCache=function(o){return new _w(o)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new sw(t),this.Ii=new ww(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new yw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new bw(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const o=new Tw(this.ci.next());return this.referenceDelegate.Ei(),r(o).next(s=>this.referenceDelegate.di(o).next(()=>s)).toPromise().then(s=>(o.raiseOnCommittedEvent(),s))}Ai(e,t){return P.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class Tw extends Jg{constructor(e){super(),this.currentSequenceNumber=e}}class aa{constructor(e){this.persistence=e,this.Ri=new ia,this.Vi=null}static mi(e){return new aa(e)}get fi(){if(this.Vi)return this.Vi;throw U(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(o=>this.fi.add(o.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(o=>{o.forEach(s=>this.fi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.fi,r=>{const o=B.fromPath(r);return this.gi(e,o).next(s=>{s||t.removeEntry(o,H.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return P.or([()=>P.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Ko{constructor(e,t){this.persistence=e,this.pi=new mn(r=>tm(r.path),(r,o)=>r.isEqual(o)),this.garbageCollector=pw(this,t)}static mi(e,t){return new Ko(e,t)}Ei(){}di(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(o=>r+o))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return P.forEach(this.pi,(r,o)=>this.br(e,r,o).next(s=>s?P.resolve():t(o)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const o=this.persistence.getRemoteDocumentCache(),s=o.newChangeBuffer();return o.ii(e,a=>this.br(e,a,t).next(l=>{l||(r++,s.removeEntry(a,H.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),P.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Co(e.data.value)),t}br(e,t,r){return P.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const o=this.pi.get(t);return P.resolve(o!==void 0&&o>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class ca{constructor(e,t,r,o){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=o}static As(e,t){let r=Y(),o=Y();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:o=o.add(s.doc.key)}return new ca(e,t.fromCache,r,o)}}/**
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
 */class Iw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Sw{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return bf()?8:Zg(Ve())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,o){const s={result:null};return this.ys(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ws(e,t,o,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new Iw;return this.Ss(e,t,a).next(l=>{if(s.result=l,this.Vs)return this.bs(e,t,a,l.size)})}).next(()=>s.result)}bs(e,t,r,o){return r.documentReadCount<this.fs?(An()<=X.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",kn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),P.resolve()):(An()<=X.DEBUG&&O("QueryEngine","Query:",kn(t),"scans",r.documentReadCount,"local documents and returns",o,"documents as results."),r.documentReadCount>this.gs*o?(An()<=X.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",kn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,st(t))):P.resolve())}ys(e,t){if(kl(t))return P.resolve(null);let r=st(t);return this.indexManager.getIndexType(e,r).next(o=>o===0?null:(t.limit!==null&&o===1&&(t=Ho(t,null,"F"),r=st(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=Y(...s);return this.ps.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const u=this.Ds(t,l);return this.Cs(t,u,a,c.readTime)?this.ys(e,Ho(t,null,"F")):this.vs(e,u,t,c)}))})))}ws(e,t,r,o){return kl(t)||o.isEqual(H.min())?P.resolve(null):this.ps.getDocuments(e,r).next(s=>{const a=this.Ds(t,s);return this.Cs(t,a,r,o)?P.resolve(null):(An()<=X.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",o.toString(),kn(t)),this.vs(e,a,t,Kg(o,Cr)).next(l=>l))})}Ds(e,t){let r=new ye(wu(e));return t.forEach((o,s)=>{fs(e,s)&&(r=r.add(s))}),r}Cs(e,t,r,o){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(o)>0)}Ss(e,t,r){return An()<=X.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",kn(t)),this.ps.getDocumentsMatchingQuery(e,t,zt.min(),r)}vs(e,t,r,o){return this.ps.getDocumentsMatchingQuery(e,r,o).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
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
 */const la="LocalStore",Aw=3e8;class kw{constructor(e,t,r,o){this.persistence=e,this.Fs=t,this.serializer=o,this.Ms=new he(Q),this.xs=new mn(s=>Ji(s),Zi),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new mw(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Rw(n,e,t,r){return new kw(n,e,t,r)}async function Bu(n,e){const t=G(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let o;return t.mutationQueue.getAllMutationBatches(r).next(s=>(o=s,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],l=[];let c=Y();for(const u of o){a.push(u.batchId);for(const p of u.mutations)c=c.add(p.key)}for(const u of s){l.push(u.batchId);for(const p of u.mutations)c=c.add(p.key)}return t.localDocuments.getDocuments(r,c).next(u=>({Ls:u,removedBatchIds:a,addedBatchIds:l}))})})}function Cw(n,e){const t=G(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const o=e.batch.keys(),s=t.Ns.newChangeBuffer({trackRemovals:!0});return function(l,c,u,p){const g=u.batch,m=g.keys();let T=P.resolve();return m.forEach(I=>{T=T.next(()=>p.getEntry(c,I)).next(_=>{const k=u.docVersions.get(I);ne(k!==null,48541),_.version.compareTo(k)<0&&(g.applyToRemoteDocument(_,u),_.isValidDocument()&&(_.setReadTime(u.commitVersion),p.addEntry(_)))})}),T.next(()=>l.mutationQueue.removeMutationBatch(c,g))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,o,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=Y();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c}(e))).next(()=>t.localDocuments.getDocuments(r,o))})}function Uu(n){const e=G(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Pw(n,e){const t=G(n),r=e.snapshotVersion;let o=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});o=t.Ms;const l=[];e.targetChanges.forEach((p,g)=>{const m=o.get(g);if(!m)return;l.push(t.Pi.removeMatchingKeys(s,p.removedDocuments,g).next(()=>t.Pi.addMatchingKeys(s,p.addedDocuments,g)));let T=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?T=T.withResumeToken(xe.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):p.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(p.resumeToken,r)),o=o.insert(g,T),function(_,k,N){return _.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-_.snapshotVersion.toMicroseconds()>=Aw?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(m,T,p)&&l.push(t.Pi.updateTargetData(s,T))});let c=Tt(),u=Y();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),l.push(Dw(s,a,e.documentUpdates).next(p=>{c=p.ks,u=p.qs})),!r.isEqual(H.min())){const p=t.Pi.getLastRemoteSnapshotVersion(s).next(g=>t.Pi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(p)}return P.waitFor(l).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,u)).next(()=>c)}).then(s=>(t.Ms=o,s))}function Dw(n,e,t){let r=Y(),o=Y();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=Tt();return t.forEach((l,c)=>{const u=s.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(o=o.add(l)),c.isNoDocument()&&c.version.isEqual(H.min())?(e.removeEntry(l,c.readTime),a=a.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),a=a.insert(l,c)):O(la,"Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)}),{ks:a,qs:o}})}function Nw(n,e){const t=G(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Xi),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Mw(n,e){const t=G(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let o;return t.Pi.getTargetData(r,e).next(s=>s?(o=s,P.resolve(o)):t.Pi.allocateTargetId(r).next(a=>(o=new Vt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,o).next(()=>o))))}).then(r=>{const o=t.Ms.get(r.targetId);return(o===null||r.snapshotVersion.compareTo(o.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function Li(n,e,t){const r=G(n),o=r.Ms.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,o))}catch(a){if(!Qn(a))throw a;O(la,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(o.target)}function Ul(n,e,t){const r=G(n);let o=H.min(),s=Y();return r.persistence.runTransaction("Execute query","readwrite",a=>function(c,u,p){const g=G(c),m=g.xs.get(p);return m!==void 0?P.resolve(g.Ms.get(m)):g.Pi.getTargetData(u,p)}(r,a,st(e)).next(l=>{if(l)return o=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next(c=>{s=c})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?o:H.min(),t?s:Y())).next(l=>(Vw(r,bm(e),l),{documents:l,Qs:s})))}function Vw(n,e,t){let r=n.Os.get(e)||H.min();t.forEach((o,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Os.set(e,r)}class ql{constructor(){this.activeTargetIds=Sm()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Lw{constructor(){this.Mo=new ql,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new ql,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Ow{Oo(e){}shutdown(){}}/**
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
 */const jl="ConnectivityMonitor";class zl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){O(jl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){O(jl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ao=null;function Oi(){return Ao===null?Ao=function(){return 268435456+Math.round(2147483648*Math.random())}():Ao++,"0x"+Ao.toString(16)}/**
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
 */const fi="RestConnection",Fw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class $w{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${o}`,this.Wo=this.databaseId.database===qo?`project_id=${r}`:`project_id=${r}&database_id=${o}`}Go(e,t,r,o,s){const a=Oi(),l=this.zo(e,t.toUriEncodedString());O(fi,`Sending RPC '${e}' ${a}:`,l,r);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,o,s);const{host:u}=new URL(l),p=Gn(u);return this.Jo(e,l,c,r,p).then(g=>(O(fi,`Received RPC '${e}' ${a}: `,g),g),g=>{throw un(fi,`RPC '${e}' ${a} failed with error: `,g,"url: ",l,"request:",r),g})}Ho(e,t,r,o,s,a){return this.Go(e,t,r,o,s)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Kn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((o,s)=>e[s]=o),r&&r.headers.forEach((o,s)=>e[s]=o)}zo(e,t){const r=Fw[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
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
 */class Bw{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const De="WebChannelConnection";class Uw extends $w{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,o,s){const a=Oi();return new Promise((l,c)=>{const u=new qd;u.setWithCredentials(!0),u.listenOnce(jd.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Ro.NO_ERROR:const g=u.getResponseJson();O(De,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),l(g);break;case Ro.TIMEOUT:O(De,`RPC '${e}' ${a} timed out`),c(new V(C.DEADLINE_EXCEEDED,"Request time out"));break;case Ro.HTTP_ERROR:const m=u.getStatus();if(O(De,`RPC '${e}' ${a} failed with status:`,m,"response text:",u.getResponseText()),m>0){let T=u.getResponseJson();Array.isArray(T)&&(T=T[0]);const I=T?.error;if(I&&I.status&&I.message){const _=function(N){const L=N.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(L)>=0?L:C.UNKNOWN}(I.status);c(new V(_,I.message))}else c(new V(C.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new V(C.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:a,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{O(De,`RPC '${e}' ${a} completed.`)}});const p=JSON.stringify(o);O(De,`RPC '${e}' ${a} sending request:`,o),u.send(t,"POST",p,r,15)})}T_(e,t,r){const o=Oi(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Gd(),l=Hd(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const p=s.join("");O(De,`Creating RPC '${e}' stream ${o}: ${p}`,c);const g=a.createWebChannel(p,c);this.I_(g);let m=!1,T=!1;const I=new Bw({Yo:k=>{T?O(De,`Not sending because RPC '${e}' stream ${o} is closed:`,k):(m||(O(De,`Opening RPC '${e}' stream ${o} transport.`),g.open(),m=!0),O(De,`RPC '${e}' stream ${o} sending:`,k),g.send(k))},Zo:()=>g.close()}),_=(k,N,L)=>{k.listen(N,$=>{try{L($)}catch(te){setTimeout(()=>{throw te},0)}})};return _(g,fr.EventType.OPEN,()=>{T||(O(De,`RPC '${e}' stream ${o} transport opened.`),I.o_())}),_(g,fr.EventType.CLOSE,()=>{T||(T=!0,O(De,`RPC '${e}' stream ${o} transport closed`),I.a_(),this.E_(g))}),_(g,fr.EventType.ERROR,k=>{T||(T=!0,un(De,`RPC '${e}' stream ${o} transport errored. Name:`,k.name,"Message:",k.message),I.a_(new V(C.UNAVAILABLE,"The operation could not be completed")))}),_(g,fr.EventType.MESSAGE,k=>{if(!T){const N=k.data[0];ne(!!N,16349);const L=N,$=L?.error||L[0]?.error;if($){O(De,`RPC '${e}' stream ${o} received error:`,$);const te=$.status;let Z=function(w){const y=ge[w];if(y!==void 0)return ku(y)}(te),oe=$.message;Z===void 0&&(Z=C.INTERNAL,oe="Unknown error status: "+te+" with message "+$.message),T=!0,I.a_(new V(Z,oe)),g.close()}else O(De,`RPC '${e}' stream ${o} received:`,N),I.u_(N)}}),_(l,zd.STAT_EVENT,k=>{k.stat===Ii.PROXY?O(De,`RPC '${e}' stream ${o} detected buffering proxy`):k.stat===Ii.NOPROXY&&O(De,`RPC '${e}' stream ${o} detected no buffering proxy`)}),setTimeout(()=>{I.__()},0),I}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function gi(){return typeof document<"u"?document:null}/**
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
 */function ys(n){return new Hm(n,!0)}/**
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
 */class qu{constructor(e,t,r=1e3,o=1.5,s=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=o,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),o=Math.max(0,t-r);o>0&&O("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,o,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Hl="PersistentStream";class ju{constructor(e,t,r,o,s,a,l,c){this.Mi=e,this.S_=r,this.b_=o,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new qu(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(xt(t.toString()),xt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,o])=>{this.D_===t&&this.G_(r,o)},r=>{e(()=>{const o=new V(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(o)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(o=>{r(()=>this.z_(o))}),this.stream.onMessage(o=>{r(()=>++this.F_==1?this.J_(o):this.onNext(o))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return O(Hl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(O(Hl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class qw extends ju{constructor(e,t,r,o,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,o,a),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Km(this.serializer,e),r=function(s){if(!("targetChange"in s))return H.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?H.min():a.readTime?it(a.readTime):H.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=Vi(this.serializer),t.addTarget=function(s,a){let l;const c=a.target;if(l=Ci(c)?{documents:Ym(s,c)}:{query:Jm(s,c).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Pu(s,a.resumeToken);const u=Di(s,a.expectedCount);u!==null&&(l.expectedCount=u)}else if(a.snapshotVersion.compareTo(H.min())>0){l.readTime=Wo(s,a.snapshotVersion.toTimestamp());const u=Di(s,a.expectedCount);u!==null&&(l.expectedCount=u)}return l}(this.serializer,e);const r=ew(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=Vi(this.serializer),t.removeTarget=e,this.q_(t)}}class jw extends ju{constructor(e,t,r,o,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,o,a),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return ne(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ne(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ne(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Qm(e.writeResults,e.commitTime),r=it(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Vi(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Xm(this.serializer,r))};this.q_(t)}}/**
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
 */class zw{}class Hw extends zw{constructor(e,t,r,o){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=o,this.ia=!1}sa(){if(this.ia)throw new V(C.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Go(e,Ni(t,r),o,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(C.UNKNOWN,s.toString())})}Ho(e,t,r,o,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Ho(e,Ni(t,r),o,a,l,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(C.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Gw{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(xt(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const hn="RemoteStore";class Ww{constructor(e,t,r,o,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{wn(this)&&(O(hn,"Restarting streams for network reachability change."),await async function(c){const u=G(c);u.Ea.add(4),await Gr(u),u.Ra.set("Unknown"),u.Ea.delete(4),await vs(u)}(this))})}),this.Ra=new Gw(r,o)}}async function vs(n){if(wn(n))for(const e of n.da)await e(!0)}async function Gr(n){for(const e of n.da)await e(!1)}function zu(n,e){const t=G(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),pa(t)?ha(t):Jn(t).O_()&&ua(t,e))}function da(n,e){const t=G(n),r=Jn(t);t.Ia.delete(e),r.O_()&&Hu(t,e),t.Ia.size===0&&(r.O_()?r.L_():wn(t)&&t.Ra.set("Unknown"))}function ua(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Jn(n).Y_(e)}function Hu(n,e){n.Va.Ue(e),Jn(n).Z_(e)}function ha(n){n.Va=new Um({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Jn(n).start(),n.Ra.ua()}function pa(n){return wn(n)&&!Jn(n).x_()&&n.Ia.size>0}function wn(n){return G(n).Ea.size===0}function Gu(n){n.Va=void 0}async function Kw(n){n.Ra.set("Online")}async function Xw(n){n.Ia.forEach((e,t)=>{ua(n,e)})}async function Qw(n,e){Gu(n),pa(n)?(n.Ra.ha(e),ha(n)):n.Ra.set("Unknown")}async function Yw(n,e,t){if(n.Ra.set("Online"),e instanceof Cu&&e.state===2&&e.cause)try{await async function(o,s){const a=s.cause;for(const l of s.targetIds)o.Ia.has(l)&&(await o.remoteSyncer.rejectListen(l,a),o.Ia.delete(l),o.Va.removeTarget(l))}(n,e)}catch(r){O(hn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Xo(n,r)}else if(e instanceof No?n.Va.Ze(e):e instanceof Ru?n.Va.st(e):n.Va.tt(e),!t.isEqual(H.min()))try{const r=await Uu(n.localStore);t.compareTo(r)>=0&&await function(s,a){const l=s.Va.Tt(a);return l.targetChanges.forEach((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const p=s.Ia.get(u);p&&s.Ia.set(u,p.withResumeToken(c.resumeToken,a))}}),l.targetMismatches.forEach((c,u)=>{const p=s.Ia.get(c);if(!p)return;s.Ia.set(c,p.withResumeToken(xe.EMPTY_BYTE_STRING,p.snapshotVersion)),Hu(s,c);const g=new Vt(p.target,c,u,p.sequenceNumber);ua(s,g)}),s.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){O(hn,"Failed to raise snapshot:",r),await Xo(n,r)}}async function Xo(n,e,t){if(!Qn(e))throw e;n.Ea.add(1),await Gr(n),n.Ra.set("Offline"),t||(t=()=>Uu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(hn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await vs(n)})}function Wu(n,e){return e().catch(t=>Xo(n,t,e))}async function bs(n){const e=G(n),t=Kt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Xi;for(;Jw(e);)try{const o=await Nw(e.localStore,r);if(o===null){e.Ta.length===0&&t.L_();break}r=o.batchId,Zw(e,o)}catch(o){await Xo(e,o)}Ku(e)&&Xu(e)}function Jw(n){return wn(n)&&n.Ta.length<10}function Zw(n,e){n.Ta.push(e);const t=Kt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function Ku(n){return wn(n)&&!Kt(n).x_()&&n.Ta.length>0}function Xu(n){Kt(n).start()}async function ey(n){Kt(n).ra()}async function ty(n){const e=Kt(n);for(const t of n.Ta)e.ea(t.mutations)}async function ny(n,e,t){const r=n.Ta.shift(),o=ra.from(r,e,t);await Wu(n,()=>n.remoteSyncer.applySuccessfulWrite(o)),await bs(n)}async function ry(n,e){e&&Kt(n).X_&&await async function(r,o){if(function(a){return Fm(a)&&a!==C.ABORTED}(o.code)){const s=r.Ta.shift();Kt(r).B_(),await Wu(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,o)),await bs(r)}}(n,e),Ku(n)&&Xu(n)}async function Gl(n,e){const t=G(n);t.asyncQueue.verifyOperationInProgress(),O(hn,"RemoteStore received new credentials");const r=wn(t);t.Ea.add(3),await Gr(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await vs(t)}async function oy(n,e){const t=G(n);e?(t.Ea.delete(2),await vs(t)):e||(t.Ea.add(2),await Gr(t),t.Ra.set("Unknown"))}function Jn(n){return n.ma||(n.ma=function(t,r,o){const s=G(t);return s.sa(),new qw(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,o)}(n.datastore,n.asyncQueue,{Xo:Kw.bind(null,n),t_:Xw.bind(null,n),r_:Qw.bind(null,n),H_:Yw.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),pa(n)?ha(n):n.Ra.set("Unknown")):(await n.ma.stop(),Gu(n))})),n.ma}function Kt(n){return n.fa||(n.fa=function(t,r,o){const s=G(t);return s.sa(),new jw(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,o)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:ey.bind(null,n),r_:ry.bind(null,n),ta:ty.bind(null,n),na:ny.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await bs(n)):(await n.fa.stop(),n.Ta.length>0&&(O(hn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class fa{constructor(e,t,r,o,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=o,this.removalCallback=s,this.deferred=new vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,o,s){const a=Date.now()+r,l=new fa(e,t,a,o,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ga(n,e){if(xt("AsyncQueue",`${e}: ${n}`),Qn(n))return new V(C.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Dn{static emptySet(e){return new Dn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||B.comparator(t.key,r.key):(t,r)=>B.comparator(t.key,r.key),this.keyedMap=gr(),this.sortedSet=new he(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Dn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const o=t.getNext().key,s=r.getNext().key;if(!o.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Dn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Wl{constructor(){this.ga=new he(B.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):U(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class zn{constructor(e,t,r,o,s,a,l,c,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=o,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,o,s){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new zn(e,t,Dn.emptySet(t),a,r,o,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ps(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let o=0;o<t.length;o++)if(t[o].type!==r[o].type||!t[o].doc.isEqual(r[o].doc))return!1;return!0}}/**
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
 */class sy{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class iy{constructor(){this.queries=Kl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const o=G(t),s=o.queries;o.queries=Kl(),s.forEach((a,l)=>{for(const c of l.Sa)c.onError(r)})})(this,new V(C.ABORTED,"Firestore shutting down"))}}function Kl(){return new mn(n=>mu(n),ps)}async function ma(n,e){const t=G(n);let r=3;const o=e.query;let s=t.queries.get(o);s?!s.ba()&&e.Da()&&(r=2):(s=new sy,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(o,!0);break;case 1:s.wa=await t.onListen(o,!1);break;case 2:await t.onFirstRemoteStoreListen(o)}}catch(a){const l=ga(a,`Initialization of query '${kn(e.query)}' failed`);return void e.onError(l)}t.queries.set(o,s),s.Sa.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&ya(t)}async function wa(n,e){const t=G(n),r=e.query;let o=3;const s=t.queries.get(r);if(s){const a=s.Sa.indexOf(e);a>=0&&(s.Sa.splice(a,1),s.Sa.length===0?o=e.Da()?0:1:!s.ba()&&e.Da()&&(o=2))}switch(o){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function ay(n,e){const t=G(n);let r=!1;for(const o of e){const s=o.query,a=t.queries.get(s);if(a){for(const l of a.Sa)l.Fa(o)&&(r=!0);a.wa=o}}r&&ya(t)}function cy(n,e,t){const r=G(n),o=r.queries.get(e);if(o)for(const s of o.Sa)s.onError(t);r.queries.delete(e)}function ya(n){n.Ca.forEach(e=>{e.next()})}var Fi,Xl;(Xl=Fi||(Fi={})).Ma="default",Xl.Cache="cache";class va{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const o of e.docChanges)o.type!==3&&r.push(o);e=new zn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=zn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Fi.Cache}}/**
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
 */class Qu{constructor(e){this.key=e}}class Yu{constructor(e){this.key=e}}class ly{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Y(),this.mutatedKeys=Y(),this.eu=wu(e),this.tu=new Dn(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Wl,o=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,a=o,l=!1;const c=this.query.limitType==="F"&&o.size===this.query.limit?o.last():null,u=this.query.limitType==="L"&&o.size===this.query.limit?o.first():null;if(e.inorderTraversal((p,g)=>{const m=o.get(p),T=fs(this.query,g)?g:null,I=!!m&&this.mutatedKeys.has(m.key),_=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let k=!1;m&&T?m.data.isEqual(T.data)?I!==_&&(r.track({type:3,doc:T}),k=!0):this.su(m,T)||(r.track({type:2,doc:T}),k=!0,(c&&this.eu(T,c)>0||u&&this.eu(T,u)<0)&&(l=!0)):!m&&T?(r.track({type:0,doc:T}),k=!0):m&&!T&&(r.track({type:1,doc:m}),k=!0,(c||u)&&(l=!0)),k&&(T?(a=a.add(T),s=_?s.add(p):s.delete(p)):(a=a.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{tu:a,iu:r,Cs:l,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,o){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((p,g)=>function(T,I){const _=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{Rt:k})}};return _(T)-_(I)}(p.type,g.type)||this.eu(p.doc,g.doc)),this.ou(r),o=o??!1;const l=t&&!o?this._u():[],c=this.Xa.size===0&&this.current&&!o?1:0,u=c!==this.Za;return this.Za=c,a.length!==0||u?{snapshot:new zn(this.query,e.tu,s,a,e.mutatedKeys,c===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Wl,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Y(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new Yu(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new Qu(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=Y();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return zn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const ba="SyncEngine";class dy{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class uy{constructor(e){this.key=e,this.hu=!1}}class hy{constructor(e,t,r,o,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=o,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new mn(l=>mu(l),ps),this.Iu=new Map,this.Eu=new Set,this.du=new he(B.comparator),this.Au=new Map,this.Ru=new ia,this.Vu={},this.mu=new Map,this.fu=jn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function py(n,e,t=!0){const r=rh(n);let o;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),o=s.view.lu()):o=await Ju(r,e,t,!0),o}async function fy(n,e){const t=rh(n);await Ju(t,e,!0,!1)}async function Ju(n,e,t,r){const o=await Mw(n.localStore,st(e)),s=o.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let l;return r&&(l=await gy(n,e,s,a==="current",o.resumeToken)),n.isPrimaryClient&&t&&zu(n.remoteStore,o),l}async function gy(n,e,t,r,o){n.pu=(g,m,T)=>async function(_,k,N,L){let $=k.view.ru(N);$.Cs&&($=await Ul(_.localStore,k.query,!1).then(({documents:v})=>k.view.ru(v,$)));const te=L&&L.targetChanges.get(k.targetId),Z=L&&L.targetMismatches.get(k.targetId)!=null,oe=k.view.applyChanges($,_.isPrimaryClient,te,Z);return Yl(_,k.targetId,oe.au),oe.snapshot}(n,g,m,T);const s=await Ul(n.localStore,e,!0),a=new ly(e,s.Qs),l=a.ru(s.documents),c=Hr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",o),u=a.applyChanges(l,n.isPrimaryClient,c);Yl(n,t,u.au);const p=new dy(e,t,a);return n.Tu.set(e,p),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),u.snapshot}async function my(n,e,t){const r=G(n),o=r.Tu.get(e),s=r.Iu.get(o.targetId);if(s.length>1)return r.Iu.set(o.targetId,s.filter(a=>!ps(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(o.targetId),r.sharedClientState.isActiveQueryTarget(o.targetId)||await Li(r.localStore,o.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(o.targetId),t&&da(r.remoteStore,o.targetId),$i(r,o.targetId)}).catch(Xn)):($i(r,o.targetId),await Li(r.localStore,o.targetId,!0))}async function wy(n,e){const t=G(n),r=t.Tu.get(e),o=t.Iu.get(r.targetId);t.isPrimaryClient&&o.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),da(t.remoteStore,r.targetId))}async function yy(n,e,t){const r=Iy(n);try{const o=await function(a,l){const c=G(a),u=ce.now(),p=l.reduce((T,I)=>T.add(I.key),Y());let g,m;return c.persistence.runTransaction("Locally write mutations","readwrite",T=>{let I=Tt(),_=Y();return c.Ns.getEntries(T,p).next(k=>{I=k,I.forEach((N,L)=>{L.isValidDocument()||(_=_.add(N))})}).next(()=>c.localDocuments.getOverlayedDocuments(T,I)).next(k=>{g=k;const N=[];for(const L of l){const $=Nm(L,g.get(L.key).overlayedDocument);$!=null&&N.push(new Zt(L.key,$,cu($.value.mapValue),Xe.exists(!0)))}return c.mutationQueue.addMutationBatch(T,u,N,l)}).next(k=>{m=k;const N=k.applyToLocalDocumentSet(g,_);return c.documentOverlayCache.saveOverlays(T,k.batchId,N)})}).then(()=>({batchId:m.batchId,changes:vu(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(o.batchId),function(a,l,c){let u=a.Vu[a.currentUser.toKey()];u||(u=new he(Q)),u=u.insert(l,c),a.Vu[a.currentUser.toKey()]=u}(r,o.batchId,t),await Wr(r,o.changes),await bs(r.remoteStore)}catch(o){const s=ga(o,"Failed to persist write");t.reject(s)}}async function Zu(n,e){const t=G(n);try{const r=await Pw(t.localStore,e);e.targetChanges.forEach((o,s)=>{const a=t.Au.get(s);a&&(ne(o.addedDocuments.size+o.modifiedDocuments.size+o.removedDocuments.size<=1,22616),o.addedDocuments.size>0?a.hu=!0:o.modifiedDocuments.size>0?ne(a.hu,14607):o.removedDocuments.size>0&&(ne(a.hu,42227),a.hu=!1))}),await Wr(t,r,e)}catch(r){await Xn(r)}}function Ql(n,e,t){const r=G(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const o=[];r.Tu.forEach((s,a)=>{const l=a.view.va(e);l.snapshot&&o.push(l.snapshot)}),function(a,l){const c=G(a);c.onlineState=l;let u=!1;c.queries.forEach((p,g)=>{for(const m of g.Sa)m.va(l)&&(u=!0)}),u&&ya(c)}(r.eventManager,e),o.length&&r.Pu.H_(o),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function vy(n,e,t){const r=G(n);r.sharedClientState.updateQueryState(e,"rejected",t);const o=r.Au.get(e),s=o&&o.key;if(s){let a=new he(B.comparator);a=a.insert(s,Me.newNoDocument(s,H.min()));const l=Y().add(s),c=new ws(H.min(),new Map,new he(Q),a,l);await Zu(r,c),r.du=r.du.remove(s),r.Au.delete(e),_a(r)}else await Li(r.localStore,e,!1).then(()=>$i(r,e,t)).catch(Xn)}async function by(n,e){const t=G(n),r=e.batch.batchId;try{const o=await Cw(t.localStore,e);th(t,r,null),eh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Wr(t,o)}catch(o){await Xn(o)}}async function _y(n,e,t){const r=G(n);try{const o=await function(a,l){const c=G(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let p;return c.mutationQueue.lookupMutationBatch(u,l).next(g=>(ne(g!==null,37113),p=g.keys(),c.mutationQueue.removeMutationBatch(u,g))).next(()=>c.mutationQueue.performConsistencyCheck(u)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(u,p,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,p)).next(()=>c.localDocuments.getDocuments(u,p))})}(r.localStore,e);th(r,e,t),eh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Wr(r,o)}catch(o){await Xn(o)}}function eh(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function th(n,e,t){const r=G(n);let o=r.Vu[r.currentUser.toKey()];if(o){const s=o.get(e);s&&(t?s.reject(t):s.resolve(),o=o.remove(e)),r.Vu[r.currentUser.toKey()]=o}}function $i(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||nh(n,r)})}function nh(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(da(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),_a(n))}function Yl(n,e,t){for(const r of t)r instanceof Qu?(n.Ru.addReference(r.key,e),Ey(n,r)):r instanceof Yu?(O(ba,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||nh(n,r.key)):U(19791,{wu:r})}function Ey(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(O(ba,"New document in limbo: "+t),n.Eu.add(r),_a(n))}function _a(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new B(ae.fromString(e)),r=n.fu.next();n.Au.set(r,new uy(t)),n.du=n.du.insert(t,r),zu(n.remoteStore,new Vt(st(hs(t.path)),r,"TargetPurposeLimboResolution",ls.ce))}}async function Wr(n,e,t){const r=G(n),o=[],s=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,c)=>{a.push(r.pu(c,e,t).then(u=>{if((u||t)&&r.isPrimaryClient){const p=u?!u.fromCache:t?.targetChanges.get(c.targetId)?.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(u){o.push(u);const p=ca.As(c.targetId,u);s.push(p)}}))}),await Promise.all(a),r.Pu.H_(o),await async function(c,u){const p=G(c);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>P.forEach(u,m=>P.forEach(m.Es,T=>p.persistence.referenceDelegate.addReference(g,m.targetId,T)).next(()=>P.forEach(m.ds,T=>p.persistence.referenceDelegate.removeReference(g,m.targetId,T)))))}catch(g){if(!Qn(g))throw g;O(la,"Failed to update sequence numbers: "+g)}for(const g of u){const m=g.targetId;if(!g.fromCache){const T=p.Ms.get(m),I=T.snapshotVersion,_=T.withLastLimboFreeSnapshotVersion(I);p.Ms=p.Ms.insert(m,_)}}}(r.localStore,s))}async function xy(n,e){const t=G(n);if(!t.currentUser.isEqual(e)){O(ba,"User change. New user:",e.toKey());const r=await Bu(t.localStore,e);t.currentUser=e,function(s,a){s.mu.forEach(l=>{l.forEach(c=>{c.reject(new V(C.CANCELLED,a))})}),s.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Wr(t,r.Ls)}}function Ty(n,e){const t=G(n),r=t.Au.get(e);if(r&&r.hu)return Y().add(r.key);{let o=Y();const s=t.Iu.get(e);if(!s)return o;for(const a of s){const l=t.Tu.get(a);o=o.unionWith(l.view.nu)}return o}}function rh(n){const e=G(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Zu.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ty.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=vy.bind(null,e),e.Pu.H_=ay.bind(null,e.eventManager),e.Pu.yu=cy.bind(null,e.eventManager),e}function Iy(n){const e=G(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=by.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=_y.bind(null,e),e}class Qo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ys(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Rw(this.persistence,new Sw,e.initialUser,this.serializer)}Cu(e){return new $u(aa.mi,this.serializer)}Du(e){return new Lw}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Qo.provider={build:()=>new Qo};class Sy extends Qo{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){ne(this.persistence.referenceDelegate instanceof Ko,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new uw(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ue.withCacheSize(this.cacheSizeBytes):Ue.DEFAULT;return new $u(r=>Ko.mi(r,t),this.serializer)}}class Bi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ql(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=xy.bind(null,this.syncEngine),await oy(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new iy}()}createDatastore(e){const t=ys(e.databaseInfo.databaseId),r=function(s){return new Uw(s)}(e.databaseInfo);return function(s,a,l,c){return new Hw(s,a,l,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,o,s,a,l){return new Ww(r,o,s,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Ql(this.syncEngine,t,0),function(){return zl.v()?new zl:new Ow}())}createSyncEngine(e,t){return function(o,s,a,l,c,u,p){const g=new hy(o,s,a,l,c,u);return p&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const r=G(t);O(hn,"RemoteStore shutting down."),r.Ea.add(5),await Gr(r),r.Aa.shutdown(),r.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Bi.provider={build:()=>new Bi};/**
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
 */class Ea{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):xt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Xt="FirestoreClient";class Ay{constructor(e,t,r,o,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=o,this.user=Ne.UNAUTHENTICATED,this.clientId=as.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{O(Xt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O(Xt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new vt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=ga(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function mi(n,e){n.asyncQueue.verifyOperationInProgress(),O(Xt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async o=>{r.isEqual(o)||(await Bu(e.localStore,o),r=o)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Jl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await ky(n);O(Xt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Gl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,o)=>Gl(e.remoteStore,o)),n._onlineComponents=e}async function ky(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(Xt,"Using user provided OfflineComponentProvider");try{await mi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(o){return o.name==="FirebaseError"?o.code===C.FAILED_PRECONDITION||o.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&o instanceof DOMException)||o.code===22||o.code===20||o.code===11}(t))throw t;un("Error using user provided cache. Falling back to memory cache: "+t),await mi(n,new Qo)}}else O(Xt,"Using default OfflineComponentProvider"),await mi(n,new Sy(void 0));return n._offlineComponents}async function oh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(Xt,"Using user provided OnlineComponentProvider"),await Jl(n,n._uninitializedComponentsProvider._online)):(O(Xt,"Using default OnlineComponentProvider"),await Jl(n,new Bi))),n._onlineComponents}function Ry(n){return oh(n).then(e=>e.syncEngine)}async function Yo(n){const e=await oh(n),t=e.eventManager;return t.onListen=py.bind(null,e.syncEngine),t.onUnlisten=my.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=fy.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=wy.bind(null,e.syncEngine),t}function Cy(n,e,t={}){const r=new vt;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,l,c,u){const p=new Ea({next:m=>{p.Nu(),a.enqueueAndForget(()=>wa(s,g));const T=m.docs.has(l);!T&&m.fromCache?u.reject(new V(C.UNAVAILABLE,"Failed to get document because the client is offline.")):T&&m.fromCache&&c&&c.source==="server"?u.reject(new V(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(m)},error:m=>u.reject(m)}),g=new va(hs(l.path),p,{includeMetadataChanges:!0,qa:!0});return ma(s,g)}(await Yo(n),n.asyncQueue,e,t,r)),r.promise}function Py(n,e,t={}){const r=new vt;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,l,c,u){const p=new Ea({next:m=>{p.Nu(),a.enqueueAndForget(()=>wa(s,g)),m.fromCache&&c.source==="server"?u.reject(new V(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(m)},error:m=>u.reject(m)}),g=new va(l,p,{includeMetadataChanges:!0,qa:!0});return ma(s,g)}(await Yo(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function sh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Zl=new Map;/**
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
 */const ih="firestore.googleapis.com",ed=!0;class td{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ih,this.ssl=ed}else this.host=e.host,this.ssl=e.ssl??ed;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Fu;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<lw)throw new V(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Yd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sh(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,o){return r.timeoutSeconds===o.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class _s{constructor(e,t,r,o){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new td({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new td(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Xd;switch(r.type){case"firstParty":return new Ug(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Zl.get(t);r&&(O("ComponentProvider","Removing Datastore"),Zl.delete(t),r.terminate())}(this),Promise.resolve()}}function ah(n,e,t,r={}){n=$e(n,_s);const o=Gn(e),s=n._getSettings(),a={...s,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;o&&(Nd(`https://${l}`),Md("Firestore",!0)),s.host!==ih&&s.host!==l&&un("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:l,ssl:o,emulatorOptions:r};if(!_t(c,a)&&(n._setSettings(c),r.mockUserToken)){let u,p;if(typeof r.mockUserToken=="string")u=r.mockUserToken,p=Ne.MOCK_USER;else{u=uf(r.mockUserToken,n._app?.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new V(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Ne(g)}n._authCredentials=new Fg(new Kd(u,p))}}/**
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
 */class ht{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ht(this.firestore,e,this._query)}}class de{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new bt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new de(this.firestore,e,this._key)}toJSON(){return{type:de._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(jr(t,de._jsonSchema))return new de(e,r||null,new B(ae.fromString(t.referencePath)))}}de._jsonSchemaVersion="firestore/documentReference/1.0",de._jsonSchema={type:we("string",de._jsonSchemaVersion),referencePath:we("string")};class bt extends ht{constructor(e,t,r){super(e,t,hs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new de(this.firestore,null,new B(e))}withConverter(e){return new bt(this.firestore,e,this._path)}}function ie(n,e,...t){if(n=ke(n),Qd("collection","path",e),n instanceof _s){const r=ae.fromString(e,...t);return fl(r),new bt(n,null,r)}{if(!(n instanceof de||n instanceof bt))throw new V(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ae.fromString(e,...t));return fl(r),new bt(n.firestore,null,r)}}function Le(n,e,...t){if(n=ke(n),arguments.length===1&&(e=as.newId()),Qd("doc","path",e),n instanceof _s){const r=ae.fromString(e,...t);return pl(r),new de(n,null,new B(r))}{if(!(n instanceof de||n instanceof bt))throw new V(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ae.fromString(e,...t));return pl(r),new de(n.firestore,n instanceof bt?n.converter:null,new B(r))}}/**
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
 */const nd="AsyncQueue";class rd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new qu(this,"async_queue_retry"),this._c=()=>{const r=gi();r&&O(nd,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=gi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=gi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new vt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Qn(e))throw e;O(nd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,xt("INTERNAL UNHANDLED ERROR: ",od(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const o=fa.createAndSchedule(this,e,t,r,s=>this.hc(s));return this.tc.push(o),o}uc(){this.nc&&U(47125,{Pc:od(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function od(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function sd(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const o=t;for(const s of r)if(s in o&&typeof o[s]=="function")return!0;return!1}(n,["next","error","complete"])}class lt extends _s{constructor(e,t,r,o){super(e,t,r,o),this.type="firestore",this._queue=new rd,this._persistenceKey=o?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rd(e),this._firestoreClient=void 0,await e}}}function ch(n,e){const t=typeof n=="object"?n:Fd(),r=typeof n=="string"?n:qo,o=Wi(t,"firestore").getImmediate({identifier:r});if(!o._initialized){const s=lf("firestore");s&&ah(o,...s)}return o}function Kr(n){if(n._terminated)throw new V(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Dy(n),n._firestoreClient}function Dy(n){const e=n._freezeSettings(),t=function(o,s,a,l){return new om(o,s,a,l.host,l.ssl,l.experimentalForceLongPolling,l.experimentalAutoDetectLongPolling,sh(l.experimentalLongPollingOptions),l.useFetchStreams,l.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Ay(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(o){const s=o?._online.build();return{_offline:o?._offline.build(s),_online:s}}(n._componentsProvider))}/**
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
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(xe.fromBase64String(e))}catch(t){throw new V(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(jr(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:we("string",Ge._jsonSchemaVersion),bytes:we("string")};/**
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
 */class Xr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _e(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class yn{constructor(e){this._methodName=e}}/**
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
 */class et{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:et._jsonSchemaVersion}}static fromJSON(e){if(jr(e,et._jsonSchema))return new et(e.latitude,e.longitude)}}et._jsonSchemaVersion="firestore/geoPoint/1.0",et._jsonSchema={type:we("string",et._jsonSchemaVersion),latitude:we("number"),longitude:we("number")};/**
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
 */class tt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,o){if(r.length!==o.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==o[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:tt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(jr(e,tt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new tt(e.vectorValues);throw new V(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}tt._jsonSchemaVersion="firestore/vectorValue/1.0",tt._jsonSchema={type:we("string",tt._jsonSchemaVersion),vectorValues:we("object")};/**
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
 */const Ny=/^__.*__$/;class My{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms):new zr(e,this.data,t,this.fieldTransforms)}}class lh{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function dh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{Ac:n})}}class Es{constructor(e,t,r,o,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=o,s===void 0&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Es({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Jo(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(dh(this.Ac)&&Ny.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class Vy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ys(e)}Cc(e,t,r,o=!1){return new Es({Ac:e,methodName:t,Dc:r,path:_e.emptyPath(),fc:!1,bc:o},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function xs(n){const e=n._freezeSettings(),t=ys(n._databaseId);return new Vy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function uh(n,e,t,r,o,s={}){const a=n.Cc(s.merge||s.mergeFields?2:0,e,t,o);Sa("Data must be an object, but it was:",a,r);const l=ph(r,a);let c,u;if(s.merge)c=new We(a.fieldMask),u=a.fieldTransforms;else if(s.mergeFields){const p=[];for(const g of s.mergeFields){const m=Ui(e,g,t);if(!a.contains(m))throw new V(C.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);gh(p,m)||p.push(m)}c=new We(p),u=a.fieldTransforms.filter(g=>c.covers(g.field))}else c=null,u=a.fieldTransforms;return new My(new qe(l),c,u)}class Ts extends yn{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ts}}function hh(n,e,t){return new Es({Ac:3,Dc:e.settings.Dc,methodName:n._methodName,fc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class xa extends yn{_toFieldTransform(e){return new ta(e.path,new Mr)}isEqual(e){return e instanceof xa}}class Ta extends yn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=hh(this,e,!0),r=this.vc.map(s=>vn(s,t)),o=new Un(r);return new ta(e.path,o)}isEqual(e){return e instanceof Ta&&_t(this.vc,e.vc)}}class Ia extends yn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=hh(this,e,!0),r=this.vc.map(s=>vn(s,t)),o=new qn(r);return new ta(e.path,o)}isEqual(e){return e instanceof Ia&&_t(this.vc,e.vc)}}function Ly(n,e,t,r){const o=n.Cc(1,e,t);Sa("Data must be an object, but it was:",o,r);const s=[],a=qe.empty();Jt(r,(c,u)=>{const p=Aa(e,c,t);u=ke(u);const g=o.yc(p);if(u instanceof Ts)s.push(p);else{const m=vn(u,g);m!=null&&(s.push(p),a.set(p,m))}});const l=new We(s);return new lh(a,l,o.fieldTransforms)}function Oy(n,e,t,r,o,s){const a=n.Cc(1,e,t),l=[Ui(e,r,t)],c=[o];if(s.length%2!=0)throw new V(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)l.push(Ui(e,s[m])),c.push(s[m+1]);const u=[],p=qe.empty();for(let m=l.length-1;m>=0;--m)if(!gh(u,l[m])){const T=l[m];let I=c[m];I=ke(I);const _=a.yc(T);if(I instanceof Ts)u.push(T);else{const k=vn(I,_);k!=null&&(u.push(T),p.set(T,k))}}const g=new We(u);return new lh(p,g,a.fieldTransforms)}function Fy(n,e,t,r=!1){return vn(t,n.Cc(r?4:3,e))}function vn(n,e){if(fh(n=ke(n)))return Sa("Unsupported field value:",e,n),ph(n,e);if(n instanceof yn)return function(r,o){if(!dh(o.Ac))throw o.Sc(`${r._methodName}() can only be used with update() and set()`);if(!o.path)throw o.Sc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(o);s&&o.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,o){const s=[];let a=0;for(const l of r){let c=vn(l,o.wc(a));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,o){if((r=ke(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Am(o.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ce.fromDate(r);return{timestampValue:Wo(o.serializer,s)}}if(r instanceof ce){const s=new ce(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Wo(o.serializer,s)}}if(r instanceof et)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ge)return{bytesValue:Pu(o.serializer,r._byteString)};if(r instanceof de){const s=o.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw o.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:sa(r.firestore._databaseId||o.databaseId,r._key.path)}}if(r instanceof tt)return function(a,l){return{mapValue:{fields:{[iu]:{stringValue:au},[jo]:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw l.Sc("VectorValues must only contain numeric values.");return ea(l.serializer,u)})}}}}}}(r,o);throw o.Sc(`Unsupported field value: ${cs(r)}`)}(n,e)}function ph(n,e){const t={};return eu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Jt(n,(r,o)=>{const s=vn(o,e.mc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function fh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ce||n instanceof et||n instanceof Ge||n instanceof de||n instanceof yn||n instanceof tt)}function Sa(n,e,t){if(!fh(t)||!Jd(t)){const r=cs(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function Ui(n,e,t){if((e=ke(e))instanceof Xr)return e._internalPath;if(typeof e=="string")return Aa(n,e);throw Jo("Field path arguments must be of type string or ",n,!1,void 0,t)}const $y=new RegExp("[~\\*/\\[\\]]");function Aa(n,e,t){if(e.search($y)>=0)throw Jo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Xr(...e.split("."))._internalPath}catch{throw Jo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Jo(n,e,t,r,o){const s=r&&!r.isEmpty(),a=o!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(s||a)&&(c+=" (found",s&&(c+=` in field ${r}`),a&&(c+=` in document ${o}`),c+=")"),new V(C.INVALID_ARGUMENT,l+n+c)}function gh(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class mh{constructor(e,t,r,o,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=o,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new de(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new By(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Is("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class By extends mh{data(){return super.data()}}function Is(n,e){return typeof e=="string"?Aa(n,e):e instanceof Xr?e._internalPath:e._delegate._internalPath}/**
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
 */function wh(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ka{}class Ss extends ka{}function Ae(n,e,...t){let r=[];e instanceof ka&&r.push(e),r=r.concat(t),function(s){const a=s.filter(c=>c instanceof As).length,l=s.filter(c=>c instanceof Qr).length;if(a>1||a>0&&l>0)throw new V(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const o of r)n=o._apply(n);return n}class Qr extends Ss{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Qr(e,t,r)}_apply(e){const t=this._parse(e);return yh(e._query,t),new ht(e.firestore,e.converter,Pi(e._query,t))}_parse(e){const t=xs(e.firestore);return function(s,a,l,c,u,p,g){let m;if(u.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new V(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){ad(g,p);const I=[];for(const _ of g)I.push(id(c,s,_));m={arrayValue:{values:I}}}else m=id(c,s,g)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||ad(g,p),m=Fy(l,a,g,p==="in"||p==="not-in");return me.create(u,p,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ue(n,e,t){const r=e,o=Is("where",n);return Qr._create(o,r,t)}class As extends ka{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new As(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:rt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(o,s){let a=o;const l=s.getFlattenedFilters();for(const c of l)yh(a,c),a=Pi(a,c)}(e._query,t),new ht(e.firestore,e.converter,Pi(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ks extends Ss{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ks(e,t)}_apply(e){const t=function(o,s,a){if(o.startAt!==null)throw new V(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(o.endAt!==null)throw new V(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Nr(s,a)}(e._query,this._field,this._direction);return new ht(e.firestore,e.converter,function(o,s){const a=o.explicitOrderBy.concat([s]);return new Yn(o.path,o.collectionGroup,a,o.filters.slice(),o.limit,o.limitType,o.startAt,o.endAt)}(e._query,t))}}function Uy(n,e="asc"){const t=e,r=Is("orderBy",n);return ks._create(r,t)}class Rs extends Ss{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Rs(e,t,r)}_apply(e){return new ht(e.firestore,e.converter,Ho(e._query,this._limit,this._limitType))}}function qy(n){return Wg("limit",n),Rs._create("limit",n,"F")}function id(n,e,t){if(typeof(t=ke(t))=="string"){if(t==="")throw new V(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!gu(e)&&t.indexOf("/")!==-1)throw new V(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ae.fromString(t));if(!B.isDocumentKey(r))throw new V(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return El(n,new B(r))}if(t instanceof de)return El(n,t._key);throw new V(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${cs(t)}.`)}function ad(n,e){if(!Array.isArray(n)||n.length===0)throw new V(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function yh(n,e){const t=function(o,s){for(const a of o)for(const l of a.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(o){switch(o){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class vh{convertValue(e,t="none"){switch(Wt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return fe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Gt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Jt(e,(o,s)=>{r[o]=this.convertValue(s,t)}),r}convertVectorValue(e){const t=e.fields?.[jo].arrayValue?.values?.map(r=>fe(r.doubleValue));return new tt(t)}convertGeoPoint(e){return new et(fe(e.latitude),fe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=us(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Pr(e));default:return null}}convertTimestamp(e){const t=Ht(e);return new ce(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ae.fromString(e);ne(Ou(r),9688,{name:e});const o=new Fn(r.get(1),r.get(3)),s=new B(r.popFirst(5));return o.isEqual(t)||xt(`Document ${s} contains a document reference within a different database (${o.projectId}/${o.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function bh(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Pn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Bt extends mh{constructor(e,t,r,o,s,a){super(e,t,r,o,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Er(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Is("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Bt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Bt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Bt._jsonSchema={type:we("string",Bt._jsonSchemaVersion),bundleSource:we("string","DocumentSnapshot"),bundleName:we("string"),bundle:we("string")};class Er extends Bt{data(e={}){return super.data(e)}}class Ut{constructor(e,t,r,o){this._firestore=e,this._userDataWriter=t,this._snapshot=o,this.metadata=new Pn(o.hasPendingWrites,o.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Er(this._firestore,this._userDataWriter,r.key,r,new Pn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(o,s){if(o._snapshot.oldDocs.isEmpty()){let a=0;return o._snapshot.docChanges.map(l=>{const c=new Er(o._firestore,o._userDataWriter,l.doc.key,l.doc,new Pn(o._snapshot.mutatedKeys.has(l.doc.key),o._snapshot.fromCache),o.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}})}{let a=o._snapshot.oldDocs;return o._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const c=new Er(o._firestore,o._userDataWriter,l.doc.key,l.doc,new Pn(o._snapshot.mutatedKeys.has(l.doc.key),o._snapshot.fromCache),o.query.converter);let u=-1,p=-1;return l.type!==0&&(u=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:jy(l.type),doc:c,oldIndex:u,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ut._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=as.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],o=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),o.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function jy(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}/**
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
 */function Vr(n){n=$e(n,de);const e=$e(n.firestore,lt);return Cy(Kr(e),n._key).then(t=>Eh(e,n,t))}Ut._jsonSchemaVersion="firestore/querySnapshot/1.0",Ut._jsonSchema={type:we("string",Ut._jsonSchemaVersion),bundleSource:we("string","QuerySnapshot"),bundleName:we("string"),bundle:we("string")};class Ra extends vh{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new de(this.firestore,null,t)}}function Ee(n){n=$e(n,ht);const e=$e(n.firestore,lt),t=Kr(e),r=new Ra(e);return wh(n._query),Py(t,n._query).then(o=>new Ut(e,r,n,o))}function _h(n,e,t){n=$e(n,de);const r=$e(n.firestore,lt),o=bh(n.converter,e,t);return Yr(r,[uh(xs(r),"setDoc",n._key,o,n.converter!==null,t).toMutation(n._key,Xe.none())])}function dt(n,e,t,...r){n=$e(n,de);const o=$e(n.firestore,lt),s=xs(o);let a;return a=typeof(e=ke(e))=="string"||e instanceof Xr?Oy(s,"updateDoc",n._key,e,t,r):Ly(s,"updateDoc",n._key,e),Yr(o,[a.toMutation(n._key,Xe.exists(!0))])}function gt(n){return Yr($e(n.firestore,lt),[new na(n._key,Xe.none())])}function Qt(n,e){const t=$e(n.firestore,lt),r=Le(n),o=bh(n.converter,e);return Yr(t,[uh(xs(n.firestore),"addDoc",r._key,o,n.converter!==null,{}).toMutation(r._key,Xe.exists(!1))]).then(()=>r)}function zy(n,...e){n=ke(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||sd(e[r])||(t=e[r++]);const o={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(sd(e[r])){const c=e[r];e[r]=c.next?.bind(c),e[r+1]=c.error?.bind(c),e[r+2]=c.complete?.bind(c)}let s,a,l;if(n instanceof de)a=$e(n.firestore,lt),l=hs(n._key.path),s={next:c=>{e[r]&&e[r](Eh(a,n,c))},error:e[r+1],complete:e[r+2]};else{const c=$e(n,ht);a=$e(c.firestore,lt),l=c._query;const u=new Ra(a);s={next:p=>{e[r]&&e[r](new Ut(a,u,c,p))},error:e[r+1],complete:e[r+2]},wh(n._query)}return function(u,p,g,m){const T=new Ea(m),I=new va(p,T,g);return u.asyncQueue.enqueueAndForget(async()=>ma(await Yo(u),I)),()=>{T.Nu(),u.asyncQueue.enqueueAndForget(async()=>wa(await Yo(u),I))}}(Kr(a),l,o,s)}function Yr(n,e){return function(r,o){const s=new vt;return r.asyncQueue.enqueueAndForget(async()=>yy(await Ry(r),o,s)),s.promise}(Kr(n),e)}function Eh(n,e,t){const r=t.docs.get(e._key),o=new Ra(n);return new Bt(n,o,e._key,r,new Pn(t.hasPendingWrites,t.fromCache),e.converter)}function ve(){return new xa("serverTimestamp")}function Ca(...n){return new Ta("arrayUnion",n)}function Hy(...n){return new Ia("arrayRemove",n)}(function(e,t=!0){(function(o){Kn=o})(Wn),Ln(new ln("firestore",(r,{instanceIdentifier:o,options:s})=>{const a=r.getProvider("app").getImmediate(),l=new lt(new $g(r.getProvider("auth-internal")),new qg(a,r.getProvider("app-check-internal")),function(u,p){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new V(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Fn(u.options.projectId,p)}(a,o),a);return s={useFetchStreams:t,...s},l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Ft(ll,dl,e),Ft(ll,dl,"esm2020")})();const Ke=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:vh,Bytes:Ge,CollectionReference:bt,DocumentReference:de,DocumentSnapshot:Bt,FieldPath:Xr,FieldValue:yn,Firestore:lt,FirestoreError:V,GeoPoint:et,Query:ht,QueryCompositeFilterConstraint:As,QueryConstraint:Ss,QueryDocumentSnapshot:Er,QueryFieldFilterConstraint:Qr,QueryLimitConstraint:Rs,QueryOrderByConstraint:ks,QuerySnapshot:Ut,SnapshotMetadata:Pn,Timestamp:ce,VectorValue:tt,_AutoId:as,_ByteString:xe,_DatabaseId:Fn,_DocumentKey:B,_EmptyAuthCredentialsProvider:Xd,_FieldPath:_e,_cast:$e,_logWarn:un,_validateIsNotUsedTogether:Yd,addDoc:Qt,arrayRemove:Hy,arrayUnion:Ca,collection:ie,connectFirestoreEmulator:ah,deleteDoc:gt,doc:Le,ensureFirestoreConfigured:Kr,executeWrite:Yr,getDoc:Vr,getDocs:Ee,getFirestore:ch,limit:qy,onSnapshot:zy,orderBy:Uy,query:Ae,serverTimestamp:ve,setDoc:_h,updateDoc:dt,where:ue},Symbol.toStringTag,{value:"Module"}));var Gy="firebase",Wy="12.0.0";/**
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
 */Ft(Gy,Wy,"app");function xh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ky=xh,Th=new Ur("auth","Firebase",xh());/**
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
 */const Zo=new Hi("@firebase/auth");function Xy(n,...e){Zo.logLevel<=X.WARN&&Zo.warn(`Auth (${Wn}): ${n}`,...e)}function Mo(n,...e){Zo.logLevel<=X.ERROR&&Zo.error(`Auth (${Wn}): ${n}`,...e)}/**
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
 */function ut(n,...e){throw Da(n,...e)}function nt(n,...e){return Da(n,...e)}function Pa(n,e,t){const r={...Ky(),[e]:t};return new Ur("auth","Firebase",r).create(e,{appName:n.name})}function cn(n){return Pa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Qy(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&ut(n,"argument-error"),Pa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Da(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Th.create(n,...e)}function j(n,e,...t){if(!n)throw Da(e,...t)}function wt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Mo(e),new Error(e)}function It(n,e){n||wt(e)}/**
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
 */function qi(){return typeof self<"u"&&self.location?.href||""}function Yy(){return cd()==="http:"||cd()==="https:"}function cd(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function Jy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Yy()||wf()||"connection"in navigator)?navigator.onLine:!0}function Zy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Jr{constructor(e,t){this.shortDelay=e,this.longDelay=t,It(t>e,"Short delay should be less than long delay!"),this.isMobile=ff()||yf()}get(){return Jy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Na(n,e){It(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Ih{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const ev={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const tv=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],nv=new Jr(3e4,6e4);function Ma(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Zn(n,e,t,r,o={}){return Sh(n,o,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const l=qr({key:n.config.apiKey,...a}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:c,...s};return mf()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&Gn(n.emulatorConfig.host)&&(u.credentials="include"),Ih.fetch()(await Ah(n,n.config.apiHost,t,l),u)})}async function Sh(n,e,t){n._canInitEmulator=!1;const r={...ev,...e};try{const o=new ov(n),s=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw ko(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const l=s.ok?a.errorMessage:a.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ko(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw ko(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw ko(n,"user-disabled",a);const p=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Pa(n,p,u);ut(n,p)}}catch(o){if(o instanceof St)throw o;ut(n,"network-request-failed",{message:String(o)})}}async function rv(n,e,t,r,o={}){const s=await Zn(n,e,t,r,o);return"mfaPendingCredential"in s&&ut(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Ah(n,e,t,r){const o=`${e}${t}?${r}`,s=n,a=s.config.emulator?Na(n.config,o):`${n.config.apiScheme}://${o}`;return tv.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}class ov{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(nt(this.auth,"network-request-failed")),nv.get())})}}function ko(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const o=nt(n,e,r);return o.customData._tokenResponse=t,o}/**
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
 */async function sv(n,e){return Zn(n,"POST","/v1/accounts:delete",e)}async function es(n,e){return Zn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function xr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function iv(n,e=!1){const t=ke(n),r=await t.getIdToken(e),o=Va(r);j(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const s=typeof o.firebase=="object"?o.firebase:void 0,a=s?.sign_in_provider;return{claims:o,token:r,authTime:xr(wi(o.auth_time)),issuedAtTime:xr(wi(o.iat)),expirationTime:xr(wi(o.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function wi(n){return Number(n)*1e3}function Va(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Mo("JWT malformed, contained fewer than 3 sections"),null;try{const o=Rd(t);return o?JSON.parse(o):(Mo("Failed to decode base64 JWT payload"),null)}catch(o){return Mo("Caught error parsing JWT payload as JSON",o?.toString()),null}}function ld(n){const e=Va(n);return j(e,"internal-error"),j(typeof e.exp<"u","internal-error"),j(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Lr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof St&&av(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function av({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class cv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ji{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=xr(this.lastLoginAt),this.creationTime=xr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ts(n){const e=n.auth,t=await n.getIdToken(),r=await Lr(n,es(e,{idToken:t}));j(r?.users.length,e,"internal-error");const o=r.users[0];n._notifyReloadListener(o);const s=o.providerUserInfo?.length?kh(o.providerUserInfo):[],a=dv(n.providerData,s),l=n.isAnonymous,c=!(n.email&&o.passwordHash)&&!a?.length,u=l?c:!1,p={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:a,metadata:new ji(o.createdAt,o.lastLoginAt),isAnonymous:u};Object.assign(n,p)}async function lv(n){const e=ke(n);await ts(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function dv(n,e){return[...n.filter(r=>!e.some(o=>o.providerId===r.providerId)),...e]}function kh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function uv(n,e){const t=await Sh(n,{},async()=>{const r=qr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:s}=n.config,a=await Ah(n,o,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return n.emulatorConfig&&Gn(n.emulatorConfig.host)&&(c.credentials="include"),Ih.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function hv(n,e){return Zn(n,"POST","/v2/accounts:revokeToken",Ma(n,e))}/**
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
 */class Nn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){j(e.idToken,"internal-error"),j(typeof e.idToken<"u","internal-error"),j(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ld(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){j(e.length!==0,"internal-error");const t=ld(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:o,expiresIn:s}=await uv(e,t);this.updateTokensAndExpiration(r,o,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:o,expirationTime:s}=t,a=new Nn;return r&&(j(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),o&&(j(typeof o=="string","internal-error",{appName:e}),a.accessToken=o),s&&(j(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Nn,this.toJSON())}_performRefresh(){return wt("not implemented")}}/**
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
 */function Ct(n,e){j(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ze{constructor({uid:e,auth:t,stsTokenManager:r,...o}){this.providerId="firebase",this.proactiveRefresh=new cv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new ji(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Lr(this,this.stsTokenManager.getToken(this.auth,e));return j(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return iv(this,e)}reload(){return lv(this)}_assign(e){this!==e&&(j(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ze({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ts(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Je(this.auth.app))return Promise.reject(cn(this.auth));const e=await this.getIdToken();return await Lr(this,sv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,o=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,u=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:g,emailVerified:m,isAnonymous:T,providerData:I,stsTokenManager:_}=t;j(g&&_,e,"internal-error");const k=Nn.fromJSON(this.name,_);j(typeof g=="string",e,"internal-error"),Ct(r,e.name),Ct(o,e.name),j(typeof m=="boolean",e,"internal-error"),j(typeof T=="boolean",e,"internal-error"),Ct(s,e.name),Ct(a,e.name),Ct(l,e.name),Ct(c,e.name),Ct(u,e.name),Ct(p,e.name);const N=new Ze({uid:g,auth:e,email:o,emailVerified:m,displayName:r,isAnonymous:T,photoURL:a,phoneNumber:s,tenantId:l,stsTokenManager:k,createdAt:u,lastLoginAt:p});return I&&Array.isArray(I)&&(N.providerData=I.map(L=>({...L}))),c&&(N._redirectEventId=c),N}static async _fromIdTokenResponse(e,t,r=!1){const o=new Nn;o.updateFromServerResponse(t);const s=new Ze({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:r});return await ts(s),s}static async _fromGetAccountInfoResponse(e,t,r){const o=t.users[0];j(o.localId!==void 0,"internal-error");const s=o.providerUserInfo!==void 0?kh(o.providerUserInfo):[],a=!(o.email&&o.passwordHash)&&!s?.length,l=new Nn;l.updateFromIdToken(r);const c=new Ze({uid:o.localId,auth:e,stsTokenManager:l,isAnonymous:a}),u={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:s,metadata:new ji(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!s?.length};return Object.assign(c,u),c}}/**
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
 */const dd=new Map;function yt(n){It(n instanceof Function,"Expected a class definition");let e=dd.get(n);return e?(It(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,dd.set(n,e),e)}/**
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
 */class Rh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Rh.type="NONE";const ud=Rh;/**
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
 */function Vo(n,e,t){return`firebase:${n}:${e}:${t}`}class Mn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:o,name:s}=this.auth;this.fullUserKey=Vo(this.userKey,o.apiKey,s),this.fullPersistenceKey=Vo("persistence",o.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await es(this.auth,{idToken:e}).catch(()=>{});return t?Ze._fromGetAccountInfoResponse(this.auth,t,e):null}return Ze._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Mn(yt(ud),e,r);const o=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=o[0]||yt(ud);const a=Vo(r,e.config.apiKey,e.name);let l=null;for(const u of t)try{const p=await u._get(a);if(p){let g;if(typeof p=="string"){const m=await es(e,{idToken:p}).catch(()=>{});if(!m)break;g=await Ze._fromGetAccountInfoResponse(e,m,p)}else g=Ze._fromJSON(e,p);u!==s&&(l=g),s=u;break}}catch{}const c=o.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Mn(s,e,r):(s=c[0],l&&await s._set(a,l.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(a)}catch{}})),new Mn(s,e,r))}}/**
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
 */function hd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Nh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ch(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Vh(e))return"Blackberry";if(Lh(e))return"Webos";if(Ph(e))return"Safari";if((e.includes("chrome/")||Dh(e))&&!e.includes("edge/"))return"Chrome";if(Mh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Ch(n=Ve()){return/firefox\//i.test(n)}function Ph(n=Ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Dh(n=Ve()){return/crios\//i.test(n)}function Nh(n=Ve()){return/iemobile/i.test(n)}function Mh(n=Ve()){return/android/i.test(n)}function Vh(n=Ve()){return/blackberry/i.test(n)}function Lh(n=Ve()){return/webos/i.test(n)}function La(n=Ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function pv(n=Ve()){return La(n)&&!!window.navigator?.standalone}function fv(){return vf()&&document.documentMode===10}function Oh(n=Ve()){return La(n)||Mh(n)||Lh(n)||Vh(n)||/windows phone/i.test(n)||Nh(n)}/**
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
 */function Fh(n,e=[]){let t;switch(n){case"Browser":t=hd(Ve());break;case"Worker":t=`${hd(Ve())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Wn}/${r}`}/**
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
 */class gv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,l)=>{try{const c=e(s);a(c)}catch(c){l(c)}});r.onAbort=t,this.queue.push(r);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function mv(n,e={}){return Zn(n,"GET","/v2/passwordPolicy",Ma(n,e))}/**
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
 */const wv=6;class yv{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??wv,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let o=0;o<e.length;o++)r=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,o,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class vv{constructor(e,t,r,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pd(this),this.idTokenSubscription=new pd(this),this.beforeStateQueue=new gv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Th,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=yt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Mn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await es(this,{idToken:e}),r=await Ze._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Je(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,a=r?._redirectEventId,l=await this.tryRedirectSignIn(e);(!s||s===a)&&l?.user&&(r=l.user,o=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ts(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Zy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Je(this.app))return Promise.reject(cn(this));const t=e?ke(e):null;return t&&j(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&j(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Je(this.app)?Promise.reject(cn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Je(this.app)?Promise.reject(cn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(yt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await mv(this),t=new yv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ur("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await hv(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&yt(e)||this._popupRedirectResolver;j(t,this,"argument-error"),this.redirectPersistenceManager=await Mn.create(this,[yt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,o){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(l,this,"internal-error"),l.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,o);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Fh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(Je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Xy(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Cs(n){return ke(n)}class pd{constructor(e){this.auth=e,this.observer=null,this.addObserver=Af(t=>this.observer=t)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Oa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function bv(n){Oa=n}function _v(n){return Oa.loadJS(n)}function Ev(){return Oa.gapiScript}function xv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Tv(n,e){const t=Wi(n,"auth");if(t.isInitialized()){const o=t.getImmediate(),s=t.getOptions();if(_t(s,e??{}))return o;ut(o,"already-initialized")}return t.initialize({options:e})}function Iv(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(yt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Sv(n,e,t){const r=Cs(n);j(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const o=!1,s=$h(e),{host:a,port:l}=Av(e),c=l===null?"":`:${l}`,u={url:`${s}//${a}${c}/`},p=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!r._canInitEmulator){j(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),j(_t(u,r.config.emulator)&&_t(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,Gn(a)?(Nd(`${s}//${a}${c}`),Md("Auth",!0)):kv()}function $h(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Av(n){const e=$h(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(r);if(o){const s=o[1];return{host:s,port:fd(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:fd(a)}}}function fd(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function kv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Bh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return wt("not implemented")}_getIdTokenResponse(e){return wt("not implemented")}_linkToIdToken(e,t){return wt("not implemented")}_getReauthenticationResolver(e){return wt("not implemented")}}/**
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
 */async function Vn(n,e){return rv(n,"POST","/v1/accounts:signInWithIdp",Ma(n,e))}/**
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
 */const Rv="http://localhost";class pn extends Bh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new pn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ut("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:o,...s}=t;if(!r||!o)return null;const a=new pn(r,o);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Vn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Vn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vn(e,t)}buildRequest(){const e={requestUri:Rv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=qr(t)}return e}}/**
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
 */class Fa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Zr extends Fa{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Dt extends Zr{constructor(){super("facebook.com")}static credential(e){return pn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dt.credential(e.oauthAccessToken)}catch{return null}}}Dt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dt.PROVIDER_ID="facebook.com";/**
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
 */class mt extends Zr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return pn._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return mt.credential(t,r)}catch{return null}}}mt.GOOGLE_SIGN_IN_METHOD="google.com";mt.PROVIDER_ID="google.com";/**
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
 */class Nt extends Zr{constructor(){super("github.com")}static credential(e){return pn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.GITHUB_SIGN_IN_METHOD="github.com";Nt.PROVIDER_ID="github.com";/**
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
 */class Mt extends Zr{constructor(){super("twitter.com")}static credential(e,t){return pn._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Mt.credential(t,r)}catch{return null}}}Mt.TWITTER_SIGN_IN_METHOD="twitter.com";Mt.PROVIDER_ID="twitter.com";/**
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
 */class Hn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,o=!1){const s=await Ze._fromIdTokenResponse(e,r,o),a=gd(r);return new Hn({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const o=gd(r);return new Hn({user:e,providerId:o,_tokenResponse:r,operationType:t})}}function gd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ns extends St{constructor(e,t,r,o){super(t.code,t.message),this.operationType=r,this.user=o,Object.setPrototypeOf(this,ns.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,o){return new ns(e,t,r,o)}}function Uh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ns._fromErrorAndOperation(n,s,e,r):s})}async function Cv(n,e,t=!1){const r=await Lr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Hn._forOperation(n,"link",r)}/**
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
 */async function Pv(n,e,t=!1){const{auth:r}=n;if(Je(r.app))return Promise.reject(cn(r));const o="reauthenticate";try{const s=await Lr(n,Uh(r,o,e,n),t);j(s.idToken,r,"internal-error");const a=Va(s.idToken);j(a,r,"internal-error");const{sub:l}=a;return j(n.uid===l,r,"user-mismatch"),Hn._forOperation(n,o,s)}catch(s){throw s?.code==="auth/user-not-found"&&ut(r,"user-mismatch"),s}}/**
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
 */async function Dv(n,e,t=!1){if(Je(n.app))return Promise.reject(cn(n));const r="signIn",o=await Uh(n,r,e),s=await Hn._fromIdTokenResponse(n,r,o);return t||await n._updateCurrentUser(s.user),s}/**
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
 */function Nv(n,e){return ke(n).setPersistence(e)}function Mv(n,e,t,r){return ke(n).onIdTokenChanged(e,t,r)}function Vv(n,e,t){return ke(n).beforeAuthStateChanged(e,t)}const rs="__sak";/**
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
 */class qh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(rs,"1"),this.storage.removeItem(rs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Lv=1e3,Ov=10;class jh extends qh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Oh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),o=this.localCache[t];r!==o&&e(t,o,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);fv()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,Ov):o()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Lv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}jh.type="LOCAL";const zh=jh;/**
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
 */class Hh extends qh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Hh.type="SESSION";const Gh=Hh;/**
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
 */function Fv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ps{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const r=new Ps(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:o,data:s}=t.data,a=this.handlersMap[o];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:o});const l=Array.from(a).map(async u=>u(t.origin,s)),c=await Fv(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:o,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ps.receivers=[];/**
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
 */function $a(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class $v{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let s,a;return new Promise((l,c)=>{const u=$a("",20);o.port1.start();const p=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:o,onMessage(g){const m=g;if(m.data.eventId===u)switch(m.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(m.data.response);break;default:clearTimeout(p),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(a),o.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[o.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function at(){return window}function Bv(n){at().location.href=n}/**
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
 */function Wh(){return typeof at().WorkerGlobalScope<"u"&&typeof at().importScripts=="function"}async function Uv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function qv(){return navigator?.serviceWorker?.controller||null}function jv(){return Wh()?self:null}/**
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
 */const Kh="firebaseLocalStorageDb",zv=1,os="firebaseLocalStorage",Xh="fbase_key";class eo{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ds(n,e){return n.transaction([os],e?"readwrite":"readonly").objectStore(os)}function Hv(){const n=indexedDB.deleteDatabase(Kh);return new eo(n).toPromise()}function zi(){const n=indexedDB.open(Kh,zv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(os,{keyPath:Xh})}catch(o){t(o)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(os)?e(r):(r.close(),await Hv(),e(await zi()))})})}async function md(n,e,t){const r=Ds(n,!0).put({[Xh]:e,value:t});return new eo(r).toPromise()}async function Gv(n,e){const t=Ds(n,!1).get(e),r=await new eo(t).toPromise();return r===void 0?null:r.value}function wd(n,e){const t=Ds(n,!0).delete(e);return new eo(t).toPromise()}const Wv=800,Kv=3;class Qh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await zi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Kv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Wh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ps._getInstance(jv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Uv(),!this.activeServiceWorker)return;this.sender=new $v(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||qv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await zi();return await md(e,rs,"1"),await wd(e,rs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>md(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Gv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const s=Ds(o,!1).getAll();return new eo(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:o,value:s}of e)r.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(s)&&(this.notifyListeners(o,s),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!r.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Wv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Qh.type="LOCAL";const Xv=Qh;new Jr(3e4,6e4);/**
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
 */function Yh(n,e){return e?yt(e):(j(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Ba extends Bh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Qv(n){return Dv(n.auth,new Ba(n),n.bypassAuthState)}function Yv(n){const{auth:e,user:t}=n;return j(t,e,"internal-error"),Pv(t,new Ba(n),n.bypassAuthState)}async function Jv(n){const{auth:e,user:t}=n;return j(t,e,"internal-error"),Cv(t,new Ba(n),n.bypassAuthState)}/**
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
 */class Jh{constructor(e,t,r,o,s=!1){this.auth=e,this.resolver=r,this.user=o,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:o,tenantId:s,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Qv;case"linkViaPopup":case"linkViaRedirect":return Jv;case"reauthViaPopup":case"reauthViaRedirect":return Yv;default:ut(this.auth,"internal-error")}}resolve(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Zv=new Jr(2e3,1e4);async function e0(n,e,t){if(Je(n.app))return Promise.reject(nt(n,"operation-not-supported-in-this-environment"));const r=Cs(n);Qy(n,e,Fa);const o=Yh(r,t);return new an(r,"signInViaPopup",e,o).executeNotNull()}class an extends Jh{constructor(e,t,r,o,s){super(e,t,o,s),this.provider=r,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return j(e,this.auth,"internal-error"),e}async onExecution(){It(this.filter.length===1,"Popup operations only handle one event");const e=$a();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(nt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(nt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(nt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zv.get())};e()}}an.currentPopupAction=null;/**
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
 */const t0="pendingRedirect",Lo=new Map;class n0 extends Jh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Lo.get(this.auth._key());if(!e){try{const r=await r0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Lo.set(this.auth._key(),e)}return this.bypassAuthState||Lo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function r0(n,e){const t=i0(e),r=s0(n);if(!await r._isAvailable())return!1;const o=await r._get(t)==="true";return await r._remove(t),o}function o0(n,e){Lo.set(n._key(),e)}function s0(n){return yt(n._redirectPersistence)}function i0(n){return Vo(t0,n.config.apiKey,n.name)}async function a0(n,e,t=!1){if(Je(n.app))return Promise.reject(cn(n));const r=Cs(n),o=Yh(r,e),a=await new n0(r,o,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const c0=600*1e3;class l0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!d0(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Zh(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(nt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=c0&&this.cachedEventUids.clear(),this.cachedEventUids.has(yd(e))}saveEventToCache(e){this.cachedEventUids.add(yd(e)),this.lastProcessedEventTime=Date.now()}}function yd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Zh({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function d0(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Zh(n);default:return!1}}/**
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
 */async function u0(n,e={}){return Zn(n,"GET","/v1/projects",e)}/**
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
 */const h0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,p0=/^https?/;async function f0(n){if(n.config.emulator)return;const{authorizedDomains:e}=await u0(n);for(const t of e)try{if(g0(t))return}catch{}ut(n,"unauthorized-domain")}function g0(n){const e=qi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!p0.test(t))return!1;if(h0.test(n))return r===n;const o=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(r)}/**
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
 */const m0=new Jr(3e4,6e4);function vd(){const n=at().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function w0(n){return new Promise((e,t)=>{function r(){vd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{vd(),t(nt(n,"network-request-failed"))},timeout:m0.get()})}if(at().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(at().gapi?.load)r();else{const o=xv("iframefcb");return at()[o]=()=>{gapi.load?r():t(nt(n,"network-request-failed"))},_v(`${Ev()}?onload=${o}`).catch(s=>t(s))}}).catch(e=>{throw Oo=null,e})}let Oo=null;function y0(n){return Oo=Oo||w0(n),Oo}/**
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
 */const v0=new Jr(5e3,15e3),b0="__/auth/iframe",_0="emulator/auth/iframe",E0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},x0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function T0(n){const e=n.config;j(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Na(e,_0):`https://${n.config.authDomain}/${b0}`,r={apiKey:e.apiKey,appName:n.name,v:Wn},o=x0.get(n.config.apiHost);o&&(r.eid=o);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${qr(r).slice(1)}`}async function I0(n){const e=await y0(n),t=at().gapi;return j(t,n,"internal-error"),e.open({where:document.body,url:T0(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:E0,dontclear:!0},r=>new Promise(async(o,s)=>{await r.restyle({setHideOnLeave:!1});const a=nt(n,"network-request-failed"),l=at().setTimeout(()=>{s(a)},v0.get());function c(){at().clearTimeout(l),o(r)}r.ping(c).then(c,()=>{s(a)})}))}/**
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
 */const S0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},A0=500,k0=600,R0="_blank",C0="http://localhost";class bd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function P0(n,e,t,r=A0,o=k0){const s=Math.max((window.screen.availHeight-o)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...S0,width:r.toString(),height:o.toString(),top:s,left:a},u=Ve().toLowerCase();t&&(l=Dh(u)?R0:t),Ch(u)&&(e=e||C0,c.scrollbars="yes");const p=Object.entries(c).reduce((m,[T,I])=>`${m}${T}=${I},`,"");if(pv(u)&&l!=="_self")return D0(e||"",l),new bd(null);const g=window.open(e||"",l,p);j(g,n,"popup-blocked");try{g.focus()}catch{}return new bd(g)}function D0(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const N0="__/auth/handler",M0="emulator/auth/handler",V0=encodeURIComponent("fac");async function _d(n,e,t,r,o,s){j(n.config.authDomain,n,"auth-domain-config-required"),j(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Wn,eventId:o};if(e instanceof Fa){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Sf(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,g]of Object.entries({}))a[p]=g}if(e instanceof Zr){const p=e.getScopes().filter(g=>g!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const c=await n._getAppCheckToken(),u=c?`#${V0}=${encodeURIComponent(c)}`:"";return`${L0(n)}?${qr(l).slice(1)}${u}`}function L0({config:n}){return n.emulator?Na(n,M0):`https://${n.authDomain}/${N0}`}/**
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
 */const yi="webStorageSupport";class O0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Gh,this._completeRedirectFn=a0,this._overrideRedirectResult=o0}async _openPopup(e,t,r,o){It(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await _d(e,t,r,qi(),o);return P0(e,s,$a())}async _openRedirect(e,t,r,o){await this._originValidation(e);const s=await _d(e,t,r,qi(),o);return Bv(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:s}=this.eventManagers[t];return o?Promise.resolve(o):(It(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await I0(e),r=new l0(e);return t.register("authEvent",o=>(j(o?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(yi,{type:yi},o=>{const s=o?.[0]?.[yi];s!==void 0&&t(!!s),ut(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=f0(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Oh()||Ph()||La()}}const F0=O0;var Ed="@firebase/auth",xd="1.11.0";/**
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
 */class $0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function B0(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function U0(n){Ln(new ln("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;j(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fh(n)},u=new vv(r,o,s,c);return Iv(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ln(new ln("auth-internal",e=>{const t=Cs(e.getProvider("auth").getImmediate());return(r=>new $0(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ft(Ed,xd,B0(n)),Ft(Ed,xd,"esm2020")}/**
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
 */const q0=300,j0=Dd("authIdTokenMaxAge")||q0;let Td=null;const z0=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>j0)return;const o=t?.token;Td!==o&&(Td=o,await fetch(n,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function H0(n=Fd()){const e=Wi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Tv(n,{popupRedirectResolver:F0,persistence:[Xv,zh,Gh]}),r=Dd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=z0(s.toString());Vv(t,a,()=>a(t.currentUser)),Mv(t,l=>a(l))}}const o=Cd("auth");return o&&Sv(t,`http://${o}`),t}function G0(){return document.getElementsByTagName("head")?.[0]??document}bv({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=o=>{const s=nt("internal-error");s.customData=o,t(s)},r.type="text/javascript",r.charset="UTF-8",G0().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});U0("Browser");const W0={apiKey:"AIzaSyBsm9dH3SKlEW1IVwgI6jEAb85mPXfoSzU",authDomain:"financas-app-819a8.firebaseapp.com",projectId:"financas-app-819a8",storageBucket:"financas-app-819a8.appspot.com",messagingSenderId:"847249101986",appId:"1:847249101986:web:e0e807771b90111812f3fb",measurementId:"G-2NPH7PQ32J"},Ua=Od(W0),bn=H0(Ua),q=ch(Ua);Nv(bn,zh).then(()=>{}).catch(n=>{console.error("Erro ao configurar persistência do Firebase Auth:",n)});const ep=Object.freeze(Object.defineProperty({__proto__:null,app:Ua,auth:bn,db:q},Symbol.toStringTag,{value:"Module"}));function Fo(n,e=null,t=null){if(!n.parcelasTotal||n.parcelasTotal<=1)return null;try{const r=new Date(n.dataInicio);let o;e&&t?o=new Date(e,t-1,1):o=new Date;let a=(o.getFullYear()-r.getFullYear())*12+(o.getMonth()-r.getMonth())+1;return a>n.parcelasTotal&&(a=n.parcelasTotal),a<1&&(a=1),a}catch(r){return console.error("Erro ao calcular parcela da recorrente:",r),1}}function K0(n,e=[],t=null,r=null){if(!t||!r){const c=new Date;t=c.getFullYear(),r=c.getMonth()+1}const o=e.some(c=>{if(!c.recorrenteId||c.recorrenteId!==n.id)return!1;let u;if(c.createdAt&&typeof c.createdAt=="object"&&c.createdAt.seconds)u=new Date(c.createdAt.seconds*1e3);else if(c.createdAt)u=new Date(c.createdAt);else return!1;return u.getFullYear()===t&&u.getMonth()+1===r}),s=Fo(n,t,r),a=Fo(n,t,r+1),l=Fo(n,t,r-1);return{foiEfetivadaEsteMes:o,parcelaAtual:s,proximaParcela:a,ultimaParcela:l,totalParcelas:n.parcelasTotal,temParcelas:n.parcelasTotal&&n.parcelasTotal>1,ativa:n.ativa!==!1}}async function qa(n,e,t){try{const r={...t,userId:n,budgetId:e,ativa:!0,createdAt:ve(),parcelasRestantes:t.parcelasRestantes||null,parcelasTotal:t.parcelasTotal||null,efetivarMesAtual:t.efetivarMesAtual||!1},o=await Qt(ie(q,"recorrentes"),r);return console.log("✅ Recorrente adicionada:",o.id),o.id}catch(r){throw console.error("Erro ao adicionar recorrente:",r),r}}async function tp(n,e,t){try{const r=Le(q,"recorrentes",e);await dt(r,{...t,updatedAt:ve()}),console.log("✅ Recorrente atualizada:",e)}catch(r){throw console.error("Erro ao atualizar recorrente:",r),r}}async function ja(n,e){try{const t=Le(q,"recorrentes",e);await gt(t),console.log("✅ Recorrente deletada:",e)}catch(t){throw console.error("Erro ao deletar recorrente:",t),t}}class X0{constructor(){this.queue=[],this.isShowing=!1,this.defaultDuration=3e3}show(e,t="info",r=null){const o={message:e,type:t,duration:r||this.defaultDuration};this.queue.push(o),this.processQueue()}call(e){typeof e=="string"?this.show(e,"info"):typeof e=="object"&&this.show(e.message||"Notificação",e.type||"info",e.duration)}processQueue(){if(this.isShowing||this.queue.length===0)return;this.isShowing=!0;const e=this.queue.shift();this.createSnackbar(e)}createSnackbar(e){const{message:t,type:r,duration:o}=e;this.removeExistingSnackbars();const s=document.createElement("div");s.className=this.getSnackbarClasses(r),s.innerHTML=this.getSnackbarContent(t,r),document.body.appendChild(s),requestAnimationFrame(()=>{s.classList.add("snackbar-show")}),setTimeout(()=>{this.removeSnackbar(s)},o)}getSnackbarClasses(e){const t=["fixed","bottom-6","left-1/2","transform","-translate-x-1/2","px-6","py-3","rounded-lg","shadow-lg","text-white","z-50","max-w-sm","w-full","mx-4","opacity-0","translate-y-4","transition-all","duration-300","ease-out"],r={success:"bg-green-600",error:"bg-red-600",warning:"bg-yellow-600",info:"bg-blue-600",default:"bg-gray-800"};return[...t,r[e]||r.default].join(" ")}getSnackbarContent(e,t){const r={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️",default:"💬"};return`
      <div class="flex items-center gap-3">
        <span class="text-lg">${r[t]||r.default}</span>
        <span class="flex-1 text-sm font-medium">${e}</span>
        <button class="snackbar-close text-white opacity-70 hover:opacity-100 transition-opacity">
          <span class="text-lg">×</span>
        </button>
      </div>
    `}removeExistingSnackbars(){document.querySelectorAll('.snackbar-show, [class*="snackbar"]').forEach(t=>{this.removeSnackbar(t)})}removeSnackbar(e){!e||!e.parentNode||(e.classList.remove("snackbar-show"),e.classList.add("snackbar-hide"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e),this.isShowing=!1,this.processQueue()},300))}setupEventListeners(e){const t=e.querySelector(".snackbar-close");t&&t.addEventListener("click",()=>{this.removeSnackbar(e)}),e.addEventListener("click",r=>{r.target===e&&this.removeSnackbar(e)})}}const fn=new X0;function F(n){typeof n=="string"?fn.show(n,"info"):typeof n=="object"&&fn.show(n.message,n.type||"info",n.duration)}F.show=(n,e="info",t)=>{fn.show(n,e,t)};F.success=(n,e)=>{fn.show(n,"success",e)};F.error=(n,e)=>{fn.show(n,"error",e)};F.warning=(n,e)=>{fn.show(n,"warning",e)};F.info=(n,e)=>{fn.show(n,"info",e)};typeof window<"u"&&(window.Snackbar=F);window.showAddRecorrenteModal=function(n={}){const e=!!n&&Object.keys(n).length>0,t=Yt({title:e?"Editar Despesa Recorrente":"Nova Despesa Recorrente",content:"",onClose:()=>t.remove()}),r=window.appState.currentUser,o=window.appState.currentBudget;if(!r){F({message:"Você precisa estar logado para adicionar recorrentes.",type:"error"});return}if(!o){F({message:"Selecione um orçamento antes de adicionar recorrentes.",type:"error"});return}const s=Zp({initialData:n,onSubmit:async l=>{try{if(document.querySelector(".fab")?.classList.add("hidden"),e&&n.id)await tp(r.uid,n.id,l);else{const c=await qa(r.uid,o.id,l);if(l.efetivarMesAtual){console.log("🚀 Efetivando recorrente no mês atual...");const u=new Date,p=u.getMonth()+1,g=u.getFullYear(),{db:m}=await Be(async()=>{const{db:k}=await Promise.resolve().then(()=>ep);return{db:k}},void 0),T=ie(m,"transactions"),_=(await Ee(Ae(T,ue("userId","==",r.uid),ue("recorrenteId","==",c)))).docs.some(k=>{const N=k.data(),L=N.createdAt&&N.createdAt.toDate?N.createdAt.toDate():N.createdAt?new Date(N.createdAt):null;return L&&L.getMonth()+1===p&&L.getFullYear()===g});if(console.log("🔍 Já existe transação neste mês?",_),_)console.log("⏭️ Transação já existe para este mês, pulando...");else{const k={userId:r.uid,budgetId:o.id,descricao:l.descricao,valor:l.valor,categoriaId:l.categoriaId,tipo:"despesa",createdAt:u,recorrenteId:c,recorrenteNome:l.descricao},N=await Qt(ie(m,"transactions"),k);console.log("✅ Transação criada para mês atual:",N.id);try{await Qt(ie(m,"logAplicacoes"),{userId:r.uid,mesAno:`${g}-${String(p).padStart(2,"0")}`,recorrenteId:c,descricao:l.descricao,valor:l.valor,dataAplicacao:u,transacaoId:N.id,aplicacaoImediata:!0}),console.log("📝 Aplicação imediata registrada no log")}catch(L){console.error("Erro ao registrar aplicação imediata no log:",L)}}}}await new Promise(c=>setTimeout(c,200)),await window.loadRecorrentes(),t.remove(),F({message:e?"Despesa recorrente editada!":"Despesa recorrente salva!",type:"success"}),setTimeout(async()=>{document.querySelector(".fab")?.classList.remove("hidden"),e&&n.id&&(console.log("🔄 Recalculando transações da recorrente editada:",n.id),await window.recalcularTransacoesRecorrente(n.id,l)),await window.loadRecorrentes(),await window.loadTransactions(),await window.loadCategories(),window.location.hash.includes("recorrentes")?window._renderRecorrentes():window.location.hash.includes("dashboard")?window.renderDashboard():window.location.hash.includes("transacoes")&&window.renderTransactions(),document.dispatchEvent(new CustomEvent("recorrente-adicionada")),document.dispatchEvent(new CustomEvent("dados-atualizados"))},100)}catch(c){document.querySelector(".fab")?.classList.remove("hidden"),console.error("Erro ao adicionar/editar recorrente:",c),F({message:"Erro ao salvar recorrente",type:"error"})}}}),a=t.querySelector(".modal-body");a?a.appendChild(s):t.appendChild(s),document.body.appendChild(t)};window.showAddTransactionModal=function(n={}){console.log("🔧 showAddTransactionModal chamada com:",n),console.log("🔧 window.Modal disponível:",!!window.Modal),console.log("🔧 window.appState.categories:",window.appState?.categories);const e=!!n&&Object.keys(n).length>0;try{const t=Yt({title:e?"Editar Transação":"Nova Transação",content:`
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
            value="${n.valor||""}"
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
            ${(window.appState?.categories||[]).map(a=>{const l=a.limite?parseFloat(a.limite):0,c=window.appState?.transactions?.filter(m=>m.categoriaId===a.id&&m.tipo==="despesa")?.reduce((m,T)=>m+parseFloat(T.valor),0)||0,u=l-c,p=l>0?` (R$ ${u.toFixed(2)} disponível)`:"",g=u<0?"text-red-600":u<l*.2?"text-yellow-600":"text-green-600";return`<option value="${a.id}" ${n.categoriaId===a.id?"selected":""}>
                ${a.nome}${p}
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
            value="${n.data||new Date().toISOString().split("T")[0]}"
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
    `,onClose:()=>t.remove()});document.body.appendChild(t),console.log("✅ Modal de transação adicionado ao DOM");const r=t.querySelector("#transaction-form");r.addEventListener("submit",async a=>{a.preventDefault();const l=new FormData(r),c={descricao:l.get("descricao"),valor:parseFloat(l.get("valor")),tipo:l.get("tipo"),categoriaId:l.get("categoriaId")||null,data:l.get("data")};try{e?(await window.updateTransaction(n.id,c),t.remove(),window.refreshCurrentView()):(t.remove(),await window.addTransactionWithConfirmation(c),window.refreshCurrentView())}catch(u){console.error("Erro ao salvar transação:",u),u.message!=="Operação cancelada pelo usuário"&&F.show("Erro ao salvar transação","error")}});const o=t.querySelector("#categoriaId"),s=t.querySelector("#categoria-info");o.addEventListener("change",()=>{const a=o.value;if(a){const l=window.appState?.categories?.find(c=>c.id===a);if(l){const c=l.limite?parseFloat(l.limite):0,u=window.appState?.transactions?.filter(I=>I.categoriaId===a&&I.tipo==="despesa")?.reduce((I,_)=>I+parseFloat(_.valor),0)||0,p=c-u,g=c>0?u/c*100:0;let m="",T="";c===0?(m="Sem limite definido",T="text-gray-500"):p<0?(m=`⚠️ Limite excedido em R$ ${Math.abs(p).toFixed(2)}`,T="text-red-600"):p<c*.2?(m=`⚠️ Quase no limite (${g.toFixed(1)}% usado)`,T="text-yellow-600"):(m=`✓ Dentro do limite (${g.toFixed(1)}% usado)`,T="text-green-600"),s.innerHTML=`
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="font-medium">${l.nome}</div>
            <div class="text-xs mt-1">
              <div>Limite: R$ ${c.toFixed(2)}</div>
              <div>Gasto: R$ ${u.toFixed(2)}</div>
              <div>Disponível: R$ ${p.toFixed(2)}</div>
              <div class="${T} mt-1">${m}</div>
            </div>
          </div>
        `,s.classList.remove("hidden")}}else s.classList.add("hidden")}),n.categoriaId&&o.dispatchEvent(new Event("change"))}catch(t){console.error("❌ Erro ao criar modal de transação:",t),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de transação","error"):alert("Erro ao abrir modal de transação: "+t.message)}};window.editTransaction=function(n){const e=window.appState.transactions?.find(t=>t.id===n);e&&window.showAddTransactionModal(e)};window.showAddCategoryModal=function(n={}){console.log("🔧 showAddCategoryModal chamada com:",n),console.log("🔧 window.Modal disponível:",!!window.Modal);const e=!!n&&Object.keys(n).length>0;try{const t=Yt({title:e?"Editar Categoria":"Nova Categoria",content:`
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
    `,onClose:()=>t.remove()});document.body.appendChild(t),console.log("✅ Modal de categoria adicionado ao DOM");const r=t.querySelector("#category-form");r.addEventListener("submit",async o=>{o.preventDefault();const s=new FormData(r),a={nome:s.get("nome"),tipo:s.get("tipo"),limite:s.get("limite")?parseFloat(s.get("limite")):null};try{e?(await window.updateCategory(n.id,a),t.remove(),window.refreshCurrentView()):(await window.addCategoryWithConfirmation(a),t.remove(),window.refreshCurrentView())}catch(l){console.error("Erro ao salvar categoria:",l),l.message!=="Operação cancelada pelo usuário"&&F.show("Erro ao salvar categoria","error")}})}catch(t){console.error("❌ Erro ao criar modal de categoria:",t),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de categoria","error"):alert("Erro ao abrir modal de categoria: "+t.message)}};window.editCategory=function(n){const e=window.appState.categories?.find(t=>t.id===n);e&&window.showAddCategoryModal(e)};function Q0(n="theme-toggle-btn"){const e=window.matchMedia("(prefers-color-scheme: dark)").matches,t=document.documentElement,r=localStorage.getItem("theme"),o=r?r==="dark":e;t.classList.toggle("dark",o),a();const s=document.getElementById(n);if(s){const u=s.cloneNode(!0);s.parentNode.replaceChild(u,s),u.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();const g=t.classList.toggle("dark");localStorage.setItem("theme",g?"dark":"light"),a(),l(),console.log("🎨 Tema alterado para:",g?"dark":"light")}),console.log("✅ Botão de tema configurado:",n)}else console.warn("⚠️ Botão de tema não encontrado:",n);function a(){const u=document.getElementById("theme-icon");if(u){const p=t.classList.contains("dark")?"🌙":"☀️";u.textContent=p}}function l(){const u=window.location.hash.replace("#","")||"/dashboard";c(),setTimeout(()=>{requestAnimationFrame(()=>{switch(u){case"/dashboard":window.renderDashboard&&window.renderDashboard();break;case"/transactions":window.renderTransactions&&window.renderTransactions();break;case"/categories":window.renderCategories&&window.renderCategories();break;case"/recorrentes":window.renderRecorrentes&&window.renderRecorrentes();break;case"/notifications":window.renderNotifications&&window.renderNotifications();break;case"/settings":window.renderSettings&&window.renderSettings();break;default:window.renderDashboard&&window.renderDashboard()}c(),console.log("✅ Tema aplicado na aba atual")})},200)}function c(){document.querySelectorAll('[class*="dark:"]').forEach(I=>{I.offsetHeight}),document.body.offsetHeight,document.documentElement.offsetHeight,document.querySelectorAll(".card-resumo, .bottom-nav, .modal-content, .btn-secondary, .form-group input, .form-group select, .form-group textarea, .tab-container, .tab-header, .tab-content, .list-item, .card-standard").forEach(I=>{I.offsetHeight});const m=document.documentElement.classList.contains("dark");document.querySelectorAll("*").forEach(I=>{const _=getComputedStyle(I);_.backgroundColor&&_.backgroundColor!=="rgba(0, 0, 0, 0)"&&I.offsetHeight}),console.log("🎨 Elementos de tema atualizados (isDark:",m,")")}}class Id{constructor(){this.touchStartX=0,this.touchEndX=0,this.touchStartY=0,this.touchEndY=0,this.isSwiping=!1,this.swipeThreshold=80,this.tabs=["/dashboard","/transactions","/categories","/recorrentes","/notifications","/settings"],this.currentTabIndex=0,this.container=null,this.swipeIndicator=null,this.isEnabled=!0,this.hasShownInitialHint=!1,this.init()}init(){if(console.log("🔧 SwipeNavigation.init() chamado"),this.container=document.querySelector("#app-content"),!this.container){console.warn("SwipeNavigation: Container #app-content não encontrado");return}if(console.log("✅ Container encontrado:",this.container),!window.appState?.currentUser){console.log("SwipeNavigation: Usuário não logado, aguardando...");return}console.log("✅ Usuário logado:",window.appState.currentUser.uid),this.createSwipeIndicator(),this.bindEvents(),this.updateCurrentTabIndex(),console.log("SwipeNavigation: Inicializado com sucesso"),console.log("🔍 Estado final:",{isEnabled:this.isEnabled,container:this.container,tabs:this.tabs,currentTabIndex:this.currentTabIndex})}createSwipeIndicator(){this.swipeIndicator=document.createElement("div"),this.swipeIndicator.id="swipe-indicator",this.swipeIndicator.innerHTML=`
      <div class="swipe-dots">
        ${this.tabs.map((t,r)=>`<div class="swipe-dot ${r===0?"active":""}" data-index="${r}"></div>`).join("")}
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
    `,document.head.appendChild(e),document.body.appendChild(this.swipeIndicator)}bindEvents(){const e=document.getElementById("login-page");if(e&&e.style.display!=="none"){console.log("SwipeNavigation: Tela de login ativa, não inicializando eventos");return}console.log("SwipeNavigation: Configurando eventos de navegação..."),this.container.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!1}),this.container.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!1}),this.container.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!1}),this.container.addEventListener("mousedown",this.handleMouseStart.bind(this)),this.container.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.container.addEventListener("mouseup",this.handleMouseEnd.bind(this)),document.addEventListener("keydown",this.handleKeydown.bind(this),{capture:!0}),console.log("SwipeNavigation: Evento de teclado configurado no document"),document.addEventListener("keydown",t=>{console.log("🎹 SwipeNavigation - Evento de teclado capturado:",t.key,"Target:",t.target.tagName)},{capture:!0}),this.observeRouteChanges(),console.log("SwipeNavigation: Todos os eventos configurados com sucesso")}handleTouchStart(e){if(!this.isEnabled){console.log("👆 SwipeNavigation: Desabilitado, ignorando touch start");return}this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.isSwiping=!1,console.log("👆 SwipeNavigation: Touch start em",this.touchStartX,this.touchStartY)}handleTouchMove(e){if(!this.isEnabled||!this.touchStartX){this.isEnabled||console.log("👆 SwipeNavigation: Desabilitado, ignorando touch move");return}const t=e.touches[0].clientX,r=e.touches[0].clientY,o=Math.abs(t-this.touchStartX),s=Math.abs(r-this.touchStartY);o>s&&o>20&&(this.isSwiping=!0,e.preventDefault(),console.log("👆 SwipeNavigation: Swipe horizontal detectado, deltaX:",o),this.showSwipeFeedback(o))}handleTouchEnd(e){if(!this.isEnabled||!this.isSwiping){this.isEnabled||console.log("👆 SwipeNavigation: Desabilitado, ignorando touch end"),this.isSwiping||console.log("👆 SwipeNavigation: Não estava fazendo swipe, ignorando touch end");return}this.touchEndX=e.changedTouches[0].clientX,this.touchEndY=e.changedTouches[0].clientY;const t=this.touchEndX-this.touchStartX,r=this.touchEndY-this.touchStartY;console.log("👆 SwipeNavigation: Touch end, deltaX:",t,"deltaY:",r),Math.abs(t)>this.swipeThreshold&&Math.abs(t)>Math.abs(r)?(console.log("👆 SwipeNavigation: Swipe válido detectado, direção:",t>0?"right":"left"),this.handleSwipe(t>0?"right":"left")):console.log("👆 SwipeNavigation: Swipe inválido ou insuficiente"),this.resetSwipe()}handleMouseStart(e){!this.isEnabled||e.button!==0||(this.touchStartX=e.clientX,this.touchStartY=e.clientY,this.isSwiping=!1)}handleMouseMove(e){if(!this.isEnabled||!this.touchStartX)return;const t=Math.abs(e.clientX-this.touchStartX),r=Math.abs(e.clientY-this.touchStartY);t>r&&t>10&&(this.isSwiping=!0)}handleMouseEnd(e){if(!this.isEnabled||!this.isSwiping)return;this.touchEndX=e.clientX,this.touchEndY=e.clientY;const t=this.touchEndX-this.touchStartX,r=this.touchEndY-this.touchStartY;Math.abs(t)>this.swipeThreshold&&Math.abs(t)>Math.abs(r)&&this.handleSwipe(t>0?"right":"left"),this.resetSwipe()}handleKeydown(e){if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.contentEditable==="true")){if(!this.isEnabled){console.log("SwipeNavigation: Desabilitado, ignorando tecla:",e.key);return}switch(console.log("🎹 SwipeNavigation: Tecla pressionada:",e.key,"Target:",e.target.tagName),e.key){case"ArrowLeft":console.log("⬅️ SwipeNavigation: Seta esquerda - navegando para aba anterior"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.currentTabIndex-1);break;case"ArrowRight":console.log("➡️ SwipeNavigation: Seta direita - navegando para próxima aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.currentTabIndex+1);break;case"ArrowUp":console.log("⬆️ SwipeNavigation: Seta cima - primeira aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(0);break;case"ArrowDown":console.log("⬇️ SwipeNavigation: Seta baixo - última aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.tabs.length-1);break}}}handleSwipe(e){this.updateCurrentTabIndex();let t=this.currentTabIndex;e==="left"&&this.currentTabIndex<this.tabs.length-1?t=this.currentTabIndex+1:e==="right"&&this.currentTabIndex>0&&(t=this.currentTabIndex-1),t!==this.currentTabIndex?(this.navigateToTab(t),this.provideHapticFeedback()):this.showSwipeFeedback("edge")}navigateToTab(e){if(e<0||e>=this.tabs.length)return;const t=this.tabs[e];console.log(`SwipeNavigation: Navegando para ${t}`),this.animateTransition(e),window.router?window.router(t):window.location.hash=t,this.currentTabIndex=e,this.updateSwipeIndicator()}animateTransition(e){const t=this.container,r=e>this.currentTabIndex?1:-1;t.classList.add("swipe-transition"),t.style.transform=`translateX(${r*20}px)`,t.style.opacity="0.8",setTimeout(()=>{t.style.transform="translateX(0)",t.style.opacity="1"},50),setTimeout(()=>{t.classList.remove("swipe-transition"),t.style.transform="",t.style.opacity=""},300)}showSwipeFeedback(e){let t="";switch(e){case"edge":t=this.currentTabIndex===0?"Primeira aba":"Última aba";break;default:return}const r=document.createElement("div");r.className="swipe-feedback",r.textContent=t,document.body.appendChild(r),setTimeout(()=>r.classList.add("show"),10),setTimeout(()=>{r.classList.remove("show"),setTimeout(()=>r.remove(),200)},1e3)}provideHapticFeedback(){"vibrate"in navigator&&navigator.vibrate(50)}updateCurrentTabIndex(){const e=document.querySelector(".nav-btn.active");if(e){const t=e.getAttribute("data-route"),r=this.tabs.indexOf(t);r!==this.currentTabIndex&&(console.log("📍 Atualizando índice da aba atual:",{activeTabRoute:t,oldIndex:this.currentTabIndex,newIndex:r,availableTabs:this.tabs}),this.currentTabIndex=r,console.log("✅ Índice atualizado:",this.currentTabIndex))}}updateSwipeIndicator(){if(!this.swipeIndicator)return;this.swipeIndicator.querySelectorAll(".swipe-dot").forEach((t,r)=>{t.classList.toggle("active",r===this.currentTabIndex)}),this.hasShownInitialHint||(this.hasShownInitialHint=!0,this.swipeIndicator.classList.add("show"),setTimeout(()=>{this.swipeIndicator.classList.remove("show")},4e3))}observeRouteChanges(){let e=null,t=null;new MutationObserver(()=>{e&&clearTimeout(e),e=setTimeout(()=>{const s=document.querySelector(".nav-btn.active")?.getAttribute("data-route");s!==t&&(t=s,this.updateCurrentTabIndex(),this.updateSwipeIndicator())},200)}).observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})}resetSwipe(){this.touchStartX=0,this.touchStartY=0,this.touchEndX=0,this.touchEndY=0,this.isSwiping=!1}enable(){this.isEnabled=!0,console.log("SwipeNavigation: Habilitado")}disable(){this.isEnabled=!1,console.log("SwipeNavigation: Desabilitado")}destroy(){this.swipeIndicator&&this.swipeIndicator.remove(),console.log("SwipeNavigation: Destruído")}}window.swipeNavigation=null;class Y0{constructor(){this.isSupported=this.checkSupport(),this.isAvailable=!1,this.credentials=null}checkSupport(){return window.PublicKeyCredential&&window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&window.PublicKeyCredential.isConditionalMediationAvailable}async checkAvailability(){if(!this.isSupported)return console.log("🔒 BiometricAuth: Web Authentication API não suportada"),!1;try{const[e,t]=await Promise.all([window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),window.PublicKeyCredential.isConditionalMediationAvailable()]);return this.isAvailable=e&&t,console.log("🔒 BiometricAuth: Disponibilidade verificada:",{userVerifying:e,conditionalMediation:t,isAvailable:this.isAvailable}),this.isAvailable}catch(e){return console.error("🔒 BiometricAuth: Erro ao verificar disponibilidade:",e),!1}}async register(e,t){if(!this.isAvailable)throw new Error("Autenticação biométrica não disponível");try{console.log("🔒 BiometricAuth: Iniciando registro biométrico...");const r=new Uint8Array(32);window.crypto.getRandomValues(r);const o={challenge:r,rp:{name:"Servo Tech Finanças",id:window.location.hostname},user:{id:new Uint8Array(16),name:t,displayName:t},pubKeyCredParams:[{type:"public-key",alg:-7}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4,attestation:"direct"},s=await navigator.credentials.create({publicKey:o});return this.credentials=s,this.saveCredentials(e,s),console.log("🔒 BiometricAuth: Registro biométrico concluído"),!0}catch(r){throw console.error("🔒 BiometricAuth: Erro no registro:",r),r}}async authenticate(){if(!this.isAvailable)throw new Error("Autenticação biométrica não disponível");try{console.log("🔒 BiometricAuth: Iniciando autenticação biométrica...");const e=this.loadCredentials();if(!e)throw new Error("Nenhuma credencial biométrica registrada");const t=new Uint8Array(32);window.crypto.getRandomValues(t);const r={challenge:t,rpId:window.location.hostname,allowCredentials:[{type:"public-key",id:e.rawId,transports:["internal"]}],userVerification:"required",timeout:6e4},o=await navigator.credentials.get({publicKey:r});return console.log("🔒 BiometricAuth: Autenticação biométrica bem-sucedida"),{success:!0,userId:e.userId,credential:o}}catch(e){throw console.error("🔒 BiometricAuth: Erro na autenticação:",e),e}}saveCredentials(e,t){try{const r={userId:e,rawId:Array.from(t.rawId),type:t.type,response:{clientDataJSON:Array.from(t.response.clientDataJSON),attestationObject:Array.from(t.response.attestationObject)}};localStorage.setItem("biometric_credentials",JSON.stringify(r)),this.saveUserInfo(e),console.log("🔒 BiometricAuth: Credenciais salvas no localStorage")}catch(r){console.error("🔒 BiometricAuth: Erro ao salvar credenciais:",r)}}saveUserInfo(){try{const e=window.FirebaseAuth?.currentUser;if(e){const t={uid:e.uid,email:e.email,displayName:e.displayName,photoURL:e.photoURL,lastLogin:new Date().toISOString()};localStorage.setItem("biometric_user_info",JSON.stringify(t)),console.log("🔒 BiometricAuth: Informações do usuário salvas")}}catch(e){console.error("🔒 BiometricAuth: Erro ao salvar informações do usuário:",e)}}loadUserInfo(){try{const e=localStorage.getItem("biometric_user_info");return e?JSON.parse(e):null}catch(e){return console.error("🔒 BiometricAuth: Erro ao carregar informações do usuário:",e),null}}loadCredentials(){try{const e=localStorage.getItem("biometric_credentials");if(!e)return null;const t=JSON.parse(e);return t.rawId=new Uint8Array(t.rawId),t.response.clientDataJSON=new Uint8Array(t.response.clientDataJSON),t.response.attestationObject=new Uint8Array(t.response.attestationObject),t}catch(e){return console.error("🔒 BiometricAuth: Erro ao carregar credenciais:",e),null}}hasSavedCredentials(){return localStorage.getItem("biometric_credentials")!==null}removeCredentials(){try{return localStorage.removeItem("biometric_credentials"),console.log("🔒 BiometricAuth: Credenciais removidas"),!0}catch(e){return console.error("🔒 BiometricAuth: Erro ao remover credenciais:",e),!1}}getDeviceInfo(){return{isSupported:this.isSupported,isAvailable:this.isAvailable,hasCredentials:this.hasSavedCredentials(),userAgent:navigator.userAgent,platform:navigator.platform}}}window.biometricAuth=new Y0;window.showBiometricSetup=async function(){try{if(!await window.biometricAuth.checkAvailability()){F({message:"Autenticação biométrica não disponível neste dispositivo.",type:"warning"});return}const e=window.FirebaseAuth?.currentUser;if(!e){F({message:"Você precisa estar logado para configurar autenticação biométrica.",type:"error"});return}const t=Yt({title:"🔒 Configurar Autenticação Biométrica",content:`
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
      `,onClose:()=>t.remove()});document.body.appendChild(t),setTimeout(()=>{const r=document.getElementById("btn-setup-biometric");r&&r.addEventListener("click",async()=>{try{r.disabled=!0,r.innerHTML="<span>⏳</span> Configurando...",await window.biometricAuth.register(e.uid,e.email),window.biometricAuth.saveUserInfo(e.uid),F({message:"Autenticação biométrica configurada com sucesso!",type:"success"}),t.remove()}catch(o){console.error("Erro na configuração biométrica:",o),F({message:"Erro ao configurar autenticação biométrica: "+o.message,type:"error"}),r.disabled=!1,r.innerHTML="<span>🔐</span> Configurar Agora"}})},100)}catch(n){console.error("Erro ao mostrar configuração biométrica:",n),F({message:"Erro ao abrir configuração biométrica: "+n.message,type:"error"})}};window.authenticateWithBiometric=async function(){try{if(console.log("🔐 Iniciando autenticação biométrica..."),!await window.biometricAuth.checkAvailability())return F({message:"Autenticação biométrica não disponível neste dispositivo.",type:"warning"}),!1;if(!window.biometricAuth.hasSavedCredentials())return F({message:"Configure a autenticação biométrica primeiro nas configurações.",type:"info"}),!1;if(window.showLoading(!0),(await window.biometricAuth.authenticate()).success){console.log("🔐 Autenticação biométrica bem-sucedida, fazendo login...");const t=window.biometricAuth.loadCredentials(),r=window.biometricAuth.loadUserInfo();if(t&&t.userId&&r)try{const o=window.FirebaseAuth?.currentUser;if(o&&o.uid===t.userId)return console.log("🔐 Usuário já está logado"),F({message:"Login biométrico realizado com sucesso!",type:"success"}),window.showLoading(!1),!0;console.log("🔐 Fazendo login automático para usuário:",r.email);const s={uid:r.uid,email:r.email,displayName:r.displayName,photoURL:r.photoURL,isAnonymous:!1,providerData:[{providerId:"google.com",uid:r.uid,displayName:r.displayName,email:r.email,photoURL:r.photoURL}]},a=new CustomEvent("biometricLoginSuccess",{detail:{user:s,userId:t.userId}});return document.dispatchEvent(a),F({message:"Login biométrico realizado com sucesso!",type:"success"}),window.showLoading(!1),!0}catch(o){return console.error("Erro ao fazer login:",o),F({message:"Erro ao fazer login. Tente novamente.",type:"error"}),window.showLoading(!1),!1}else return F({message:"Credenciais biométricas inválidas ou incompletas.",type:"error"}),window.showLoading(!1),!1}return window.showLoading(!1),!1}catch(n){console.error("Erro na autenticação biométrica:",n);let e="Erro na autenticação biométrica.";return n.name==="NotAllowedError"?e="Autenticação biométrica cancelada pelo usuário.":n.name==="SecurityError"?e="Erro de segurança na autenticação biométrica.":n.name==="NotSupportedError"?e="Autenticação biométrica não suportada.":n.message&&(e=n.message),F({message:e,type:"error"}),window.showLoading(!1),!1}};document.addEventListener("DOMContentLoaded",async()=>{try{const n=await window.biometricAuth.checkAvailability();if(console.log("🔒 BiometricAuth: Inicialização concluída, disponível:",n),n&&window.biometricAuth.hasSavedCredentials()){const e=document.getElementById("biometric-login-btn");e&&(e.style.display="block",e.innerHTML="<span>🔐</span> Entrar com Biometria")}else{const e=document.getElementById("biometric-login-btn");e&&(e.style.display="none")}}catch(n){console.error("🔒 BiometricAuth: Erro na inicialização:",n)}});async function J0(){try{const n=new mt;return(await e0(bn,n)).user}catch(n){throw n.code==="auth/cancelled-popup-request"?F({message:"Login cancelado. Tente novamente.",type:"info"}):F({message:"Erro ao fazer login: "+n.message,type:"error"}),n}}function Z0(){console.log("🔧 Criando FAB corrigido...");let n=!1,e=!1;const t=c(),r=u(),o=p(),s=g({id:"fab-transaction",text:"Nova Transação",icon:"💰",color:"#3B82F6",action:tb}),a=g({id:"fab-recorrente",text:"Nova Recorrente",icon:"🔄",color:"#8B5CF6",action:nb}),l=g({id:"fab-voice",text:"Voz",icon:"🎤",color:"#10B981",action:rb});return o.appendChild(s),o.appendChild(a),o.appendChild(l),t.appendChild(o),t.appendChild(r),m(),console.log("✅ FAB corrigido criado com sucesso"),t;function c(){const k=document.createElement("div");return k.id="fab-container-main",k.className="fab-container-refactored",k.style.cssText=`
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
    `,k}function u(){const k=document.createElement("button");k.id="fab-main",k.innerHTML="+",k.type="button",k.setAttribute("aria-label","Abrir menu de ações"),k.style.cssText=`
      width: 64px !important;
      height: 64px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #4F46E5, #7C3AED) !important;
      color: white !important;
      border: none !important;
      font-size: 32px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4) !important;
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
    `;const N=()=>{!n&&!e&&(k.style.transform="scale(1.1) rotate(0deg)",k.style.boxShadow="0 6px 20px rgba(79, 70, 229, 0.6)")},L=()=>{!n&&!e&&(k.style.transform="scale(1) rotate(0deg)",k.style.boxShadow="0 4px 12px rgba(79, 70, 229, 0.4)")};return k.addEventListener("mouseenter",N),k.addEventListener("mouseleave",L),k.addEventListener("touchstart",N),k.addEventListener("touchend",L),k}function p(){const k=document.createElement("div");return k.id="fab-actions",k.style.cssText=`
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
    `,k}function g({id:k,text:N,icon:L,color:$,action:te}){const Z=document.createElement("button");Z.id=k,Z.innerHTML=`${L} ${N}`,Z.type="button",Z.setAttribute("aria-label",N),Z.style.cssText=`
      background: linear-gradient(135deg, ${$}, ${eb($,-20)}) !important;
      color: white !important;
      padding: 12px 16px !important;
      border-radius: 12px !important;
      border: none !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      min-height: 48px !important;
      min-width: 140px !important;
      max-width: 160px !important;
      box-shadow: 0 4px 12px ${$}40 !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      z-index: 10000 !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      outline: none !important;
      position: relative !important;
      transform: scale(1) !important;
    `;const oe=()=>{e||(Z.style.transform="scale(1.05)",Z.style.boxShadow=`0 6px 20px ${$}60`)},v=()=>{e||(Z.style.transform="scale(1)",Z.style.boxShadow=`0 4px 12px ${$}40`)};Z.addEventListener("mouseenter",oe),Z.addEventListener("mouseleave",v),Z.addEventListener("touchstart",oe),Z.addEventListener("touchend",v);const w=y=>{y.preventDefault(),y.stopPropagation(),console.log(`🔧 Botão ${k} clicado!`);let E=!1;try{te&&(te(),E=!0)}catch(x){console.error(`❌ Erro ao executar ação do botão ${k}:`,x),gn(`Erro ao executar ${N}`)}E&&_()};return Z.addEventListener("click",w),Z}function m(){const k=$=>{$.preventDefault(),$.stopPropagation(),T()};r.addEventListener("click",k);const N=$=>{!t.contains($.target)&&n&&_()};document.addEventListener("click",N);const L=$=>{$.key==="Escape"&&n&&_()};document.addEventListener("keydown",L),t.addEventListener("click",$=>{$.stopPropagation()})}function T(){if(e){console.log("⚠️ FAB está animando, ignorando clique");return}e=!0,console.log("🔧 Alternando FAB:",n?"Fechando":"Abrindo"),n?_():I()}function I(){console.log("🔧 Abrindo FAB..."),o.style.display="flex",o.style.visibility="visible",o.style.pointerEvents="auto",o.style.opacity="0",o.style.transform="translateY(20px)",requestAnimationFrame(()=>{o.style.transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",o.style.opacity="1",o.style.transform="translateY(0)"}),r.style.transform="rotate(45deg)",n=!0,setTimeout(()=>{e=!1},300)}function _(){console.log("🔧 Fechando FAB..."),o.style.transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",o.style.opacity="0",o.style.transform="translateY(20px)",o.style.pointerEvents="none",r.style.transform="rotate(0deg)",n=!1,setTimeout(()=>{o.style.display="none",o.style.visibility="hidden",e=!1},300)}}function eb(n,e){const t=n.replace("#",""),r=Math.max(0,Math.min(255,parseInt(t.substr(0,2),16)+e)),o=Math.max(0,Math.min(255,parseInt(t.substr(2,2),16)+e)),s=Math.max(0,Math.min(255,parseInt(t.substr(4,2),16)+e));return`#${r.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}${s.toString(16).padStart(2,"0")}`}function tb(){if(console.log("🔧 Executando ação: Nova Transação"),typeof window.showAddTransactionModal=="function"){console.log("✅ Função showAddTransactionModal encontrada");try{return window.showAddTransactionModal(),!0}catch(n){return console.error("❌ Erro ao executar showAddTransactionModal:",n),gn("Erro ao abrir modal de transação"),!1}}else return console.warn("⚠️ Função showAddTransactionModal não disponível"),gn("Modal de transação não disponível. Tente recarregar a página."),!1}function nb(){if(console.log("🔧 Executando ação: Nova Recorrente"),typeof window.showAddRecorrenteModal=="function"){console.log("✅ Função showAddRecorrenteModal encontrada");try{return window.showAddRecorrenteModal(),!0}catch(n){return console.error("❌ Erro ao executar showAddRecorrenteModal:",n),gn("Erro ao abrir modal de recorrente"),!1}}else return console.warn("⚠️ Função showAddRecorrenteModal não disponível"),gn("Modal de recorrente não disponível. Tente recarregar a página."),!1}function rb(){if(console.log("🔧 Executando ação: Voz"),typeof window.openVoiceModal=="function"){console.log("✅ Função openVoiceModal encontrada");try{return window.openVoiceModal(),!0}catch(n){return console.error("❌ Erro ao executar openVoiceModal:",n),gn("Erro ao abrir modal de voz"),!1}}else return console.warn("⚠️ Função openVoiceModal não disponível"),gn("Funcionalidade de voz não disponível. Tente recarregar a página."),!1}function gn(n){if(console.error("❌ Erro no FAB:",n),window.Snackbar&&typeof window.Snackbar.show=="function")try{window.Snackbar.show(n,"error");return}catch(e){console.warn("⚠️ Erro ao usar Snackbar:",e)}window.alert?alert(n):console.error("Nenhum sistema de notificação disponível")}window.toggleFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-main");e&&e.click()}};window.closeFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-actions"),t=n.querySelector("#fab-main");e&&t&&(e.style.display="none",e.style.opacity="0",e.style.visibility="hidden",e.style.pointerEvents="none",t.style.transform="rotate(0deg)")}};window.openFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-actions"),t=n.querySelector("#fab-main");e&&t&&(e.style.display="flex",e.style.visibility="visible",e.style.opacity="1",e.style.transform="translateY(0)",e.style.pointerEvents="auto",t.style.transform="rotate(45deg)")}};window.cleanupFAB=function(){};window.checkFABState=function(){const n=document.getElementById("fab-container-main"),e=document.getElementById("fab-actions"),t=document.getElementById("fab-main");if(console.log("🔍 Estado do FAB:"),console.log("  - Container:",!!n),console.log("  - Actions:",!!e),console.log("  - Main button:",!!t),n&&e&&t){const r=e.style.display,o=t.style.transform;console.log("  - Actions display:",r),console.log("  - Main transform:",o)}return{fabContainer:n,fabActions:e,fabMain:t}};async function ob(n){if(!confirm("Tem certeza que deseja excluir esta despesa recorrente?"))return;const e=window.appState?.currentUser;if(!e){F({message:"Usuário não autenticado.",type:"error"});return}await ja(e.uid,n),F({message:"Recorrente excluída com sucesso.",type:"success"}),await window.loadRecorrentes(),za()}function sb(n){const e=window.appState?.currentUser;if(!e){F({message:"Usuário não autenticado.",type:"error"});return}tp(e.uid,n.id,{ativa:!n.ativa}),F({message:"Status atualizado com sucesso.",type:"info"}),window.loadRecorrentes().then(za)}window.handleDeleteRecorrente=ob;window.handleToggleRecorrente=sb;async function np(n){const e=window.appState?.currentUser;if(!e){F({message:"Usuário não autenticado.",type:"error"});return}const t=(window.appState.recorrentes||[]).find(a=>a.id===n),r=t?t.descricao:"",o=window.appState.currentBudget?.id;console.log("🔍 Iniciando busca de histórico para:",{recorrenteId:n,descricao:r,budgetId:o,userId:e.uid});const s=Yt({title:`Histórico de ${r}`,content:`<div class='flex flex-col items-center py-8'>
      <div class='loader mb-4'></div>
      <div>Carregando histórico...</div>
      <button onclick='closeModal()' class='mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
    </div>`});document.body.appendChild(s);try{const{collection:a,getDocs:l,query:c,where:u}=await Be(async()=>{const{collection:v,getDocs:w,query:y,where:E}=await Promise.resolve().then(()=>Ke);return{collection:v,getDocs:w,query:y,where:E}},void 0),{db:p}=await Be(async()=>{const{db:v}=await Promise.resolve().then(()=>ep);return{db:v}},void 0);let g=[];console.log("🔍 Buscando transações na coleção principal...");const m=a(p,"transactions"),I=(await l(c(m,u("userId","==",e.uid),u("recorrenteId","==",n)))).docs.map(v=>({...v.data(),id:v.id,origem:"principal"}));console.log("📊 Transações encontradas na coleção principal:",I.length),I.forEach(v=>{console.log("  -",v.descricao,"R$",v.valor,"BudgetId:",v.budgetId,"ID:",v.id)});const k=(window.appState.transactions||[]).filter(v=>v.recorrenteId===n);if(console.log("🔍 Transações no appState com este recorrenteId:",k.length),k.forEach(v=>{console.log("  - AppState:",v.descricao,"R$",v.valor,"BudgetId:",v.budgetId,"ID:",v.id)}),g=g.concat(I),r){console.log("🔍 Buscando transações por descrição:",r);const w=(await l(c(m,u("userId","==",e.uid),u("descricao","==",r)))).docs.map(y=>({...y.data(),id:y.id,origem:"descricao"})).filter(y=>!y.recorrenteId||y.recorrenteId!==n);console.log("📊 Transações encontradas por descrição:",w.length),w.forEach(y=>{console.log("  -",y.descricao,"R$",y.valor,"RecorrenteId:",y.recorrenteId)}),g=g.concat(w)}console.log("🔍 Buscando no histórico mensal...");const N=new Date,L=N.getFullYear(),$=N.getMonth()+1;for(let v=2023;v<=L;v++){const w=v===L?$:12;for(let y=1;y<=w;y++){const E=String(y).padStart(2,"0"),x=a(p,"users",e.uid,"historico",`${v}-${E}`,"transacoes");try{const S=await l(c(x,u("recorrenteId","==",n)));if(!S.empty){console.log(`📊 Histórico ${v}-${E}:`,S.docs.length,"transações");const b=S.docs.map(D=>({...D.data(),id:D.id,origem:`historico-${v}-${E}`}));g=g.concat(b)}}catch(S){console.log(`⚠️ Erro ao buscar histórico ${v}-${E}:`,S.message)}}}if(g.length===0){console.log("🔍 Nenhuma transação encontrada no Firestore, buscando no appState...");const w=(window.appState.transactions||[]).filter(y=>y.recorrenteId===n||r&&y.descricao?.toLowerCase().includes(r.toLowerCase()));console.log("📊 Transações encontradas no appState:",w.length),w.forEach(y=>{console.log("  - AppState:",y.descricao,"R$",y.valor,"BudgetId:",y.budgetId,"ID:",y.id)}),g=w.map(y=>({...y,origem:"appState"}))}const te=[],Z=new Set;g.forEach(v=>{Z.has(v.id)||(Z.add(v.id),te.push(v))}),g=te,console.log("📊 Total de transações únicas encontradas:",g.length),g.sort((v,w)=>{const y=v.createdAt?.seconds?v.createdAt.seconds:0;return(w.createdAt?.seconds?w.createdAt.seconds:0)-y});const oe=s.querySelector(".modal-body");oe.innerHTML=`
      <div class='space-y-2'>
        <div class='text-xs text-gray-400 mb-4'>
          <div><b>Recorrente ID:</b> ${n}</div>
          <div><b>Budget ID:</b> ${o||"N/A"}</div>
          <div><b>Total encontrado:</b> ${g.length} transações</div>
        </div>
        ${g.length===0?`<div class='text-gray-500 p-4 bg-gray-50 rounded'>
                <p><b>Nenhuma aplicação encontrada.</b></p>
                <p class='text-sm mt-2'>Possíveis causas:</p>
                <ul class='text-sm mt-1 ml-4 list-disc'>
                  <li>A recorrente não foi efetivada neste mês</li>
                  <li>O orçamento selecionado é diferente</li>
                  <li>O campo recorrenteId está incorreto na transação</li>
                  <li>A transação foi salva em outro budgetId</li>
                </ul>
              </div>`:g.map(v=>`
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
      </div>`,F({message:"Erro ao carregar histórico: "+(a.message||a),type:"error"})}}window.showHistoricoRecorrente=np;function ib(n,e){try{const t=new Date,r=new Date(n),o=t.getMonth()>r.getMonth()?t.getFullYear():r.getFullYear(),s=t.getMonth()+(e<=t.getDate()?1:0);return new Date(o,s,e)}catch{return new Date}}function za(){const n=window.appState?.currentUser,e=window.appState?.currentBudget,t=document.getElementById("app-content");if(t.innerHTML=`
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
  `,!n||!e){document.getElementById("recorrentes-list").innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhum usuário ou orçamento ativo.</p>';return}const r=window.appState.recorrentes||[],o=window.appState.transactions||[],s=new Date,a=s.getFullYear(),l=s.getMonth()+1,c=o.filter(p=>{if(!p.recorrenteId)return!1;let g;if(p.createdAt&&typeof p.createdAt=="object"&&p.createdAt.seconds)g=new Date(p.createdAt.seconds*1e3);else if(p.createdAt)g=new Date(p.createdAt);else return!1;return g.getFullYear()===a&&g.getMonth()+1===l}).map(p=>p.recorrenteId),u=document.getElementById("recorrentes-list");if(!r.length){u.innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhuma despesa recorrente cadastrada.</p>';return}u.innerHTML="",r.forEach(p=>{const g=c.includes(p.id),T=ib(p.dataInicio,p.diaLancamento||1).toLocaleDateString("pt-BR"),I=window.calcularStatusRecorrente?window.calcularStatusRecorrente(p,o,a,l):{parcelaAtual:null,totalParcelas:p.parcelasTotal,foiEfetivadaEsteMes:g},_=document.createElement("div");_.className="card-standard";const k=parseFloat(p.valor),N=p.valorTotal?parseFloat(p.valorTotal):I.totalParcelas&&I.totalParcelas>1?k*I.totalParcelas:k;let L="";I.temParcelas?I.foiEfetivadaEsteMes?L=`✅ Efetivada: ${I.parcelaAtual} de ${I.totalParcelas}`:I.proximaParcela&&I.proximaParcela<=I.totalParcelas?L=`📅 Agendada: ${I.proximaParcela} de ${I.totalParcelas}`:L=`📊 Parcela ${I.parcelaAtual} de ${I.totalParcelas}`:L="♾️ Infinito",_.innerHTML=`
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${p.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${p.descricao}</span>
      </div>
      <p class="list-item-subtitle">Valor da parcela: R$ ${k.toFixed(2)}${I.totalParcelas&&I.totalParcelas>1?` | Total: R$ ${N.toFixed(2)}`:""}</p>
      <p class="list-item-subtitle">Categoria: ${p.categoriaId||"Sem categoria"}</p>
      <p class="list-item-subtitle font-semibold ${I.foiEfetivadaEsteMes?"text-green-600 dark:text-green-400":"text-blue-600 dark:text-blue-400"}">${L}</p>
      ${p.ativa!==!1&&!I.foiEfetivadaEsteMes?`<p class="text-sm text-green-500 mb-3">Próxima aplicação: ${T}</p>`:I.foiEfetivadaEsteMes?'<p class="text-sm text-blue-500 mb-3">✅ Efetivada este mês</p>':""}
      <div class="flex flex-wrap gap-2 mt-4">
        <!-- Botões principais em linha -->
        <div class="flex gap-1 flex-1">
          <button class="btn-secondary mobile-btn flex-1" onclick="window.showAddRecorrenteModal(${JSON.stringify(p).replace(/\"/g,"&quot;")})">
            <span class="icon-standard">✏️</span>
            <span class="hidden sm:inline">Editar</span>
          </button>
          <button class="btn-secondary mobile-btn flex-1" onclick='window.handleToggleRecorrente(${JSON.stringify(p).replace(/\"/g,"&quot;")})'>
            <span class="icon-standard">${p.ativa===!1?"▶️":"⏸️"}</span>
            <span class="hidden sm:inline">${p.ativa===!1?"Ativar":"Pausar"}</span>
          </button>
        </div>
        
        <!-- Botões secundários em linha -->
        <div class="flex gap-1 flex-1">
          <button class="btn-secondary mobile-btn flex-1" onclick="window.showHistoricoRecorrente('${p.id}')">
            <span class="icon-standard">📊</span>
            <span class="hidden sm:inline">Histórico</span>
          </button>
          <button class="btn-danger mobile-btn flex-1" onclick="window.handleDeleteRecorrente('${p.id}')">
            <span class="icon-standard">🗑️</span>
            <span class="hidden sm:inline">Excluir</span>
          </button>
        </div>
      </div>
    `,u.appendChild(_)})}async function ab(){const n=window.FirebaseAuth?.currentUser,e=document.getElementById("app-content");if(e.innerHTML='<h2 class="text-xl font-bold mb-4">Log de Aplicações Automáticas</h2>',!n){e.innerHTML+='<p class="text-gray-500">Usuário não autenticado.</p>';return}const t=new Date,r=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),s=`${r}-${o}`,a=ie(q,"users",n.uid,"logs",s,"itens"),l=await Ee(a);if(l.empty){e.innerHTML+='<p class="text-gray-500">Nenhum log encontrado para este mês.</p>';return}const c=document.createElement("div");c.className="space-y-3",l.forEach(u=>{const p=u.data(),g=document.createElement("div");g.className="p-3 rounded-lg shadow bg-white dark:bg-gray-800 flex justify-between items-start",g.innerHTML=`
      <div>
        <p class="font-semibold">${p.descricao}</p>
        <p class="text-sm text-gray-500">R$ ${parseFloat(p.valor).toFixed(2)} • ${p.categoriaId||"Sem categoria"}</p>
        <p class="text-xs text-gray-400">Aplicado em: ${p.createdAt?.seconds?new Date(p.createdAt.seconds*1e3).toLocaleDateString():"-"}</p>
      </div>
    `,c.appendChild(g)}),e.appendChild(c)}async function cb(){const n=document.getElementById("app-content"),e=window.appState?.currentBudget,t=window.appState?.currentUser,r=window.appState?.budgets||[],o=r.find(c=>c.id===e?.id);let s=[];o?.usuariosPermitidos&&o.usuariosPermitidos.length>0&&(s=await Promise.all(o.usuariosPermitidos.map(async c=>{try{const u=await window.getUserInfo(c);return{uid:c,email:u.email||"Email não disponível",role:"Usuário Compartilhado"}}catch(u){return console.error("Erro ao buscar informações do usuário:",c,u),{uid:c,email:"Usuário não encontrado",role:"Usuário Compartilhado"}}})));let a=[];if(window.loadBudgetInvitations)try{console.log("🔍 SettingsPage: Carregando convites pendentes..."),a=await window.loadBudgetInvitations(),console.log("📊 SettingsPage: Convites carregados:",a.length)}catch(c){console.error("❌ SettingsPage: Erro ao carregar convites pendentes:",c)}else console.log("❌ SettingsPage: Função loadBudgetInvitations não encontrada");n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">⚙️ Configurações</h2>
        <div class="flex items-center gap-2">
          <button onclick="window.showExportOptions && window.showExportOptions()" class="btn-secondary">
            <span class="icon-standard">📤</span>
            <span class="hidden sm:inline">Exportar</span>
          </button>
          <button id="theme-toggle-btn" onclick="window.setupThemeToggle && window.setupThemeToggle('theme-toggle-btn')" class="btn-secondary">
            <span class="icon-standard">🎨</span>
            <span class="hidden sm:inline">Tema</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">⚙️ Configurações</h2>
            <p class="text-gray-600 dark:text-gray-400">Gerencie suas preferências e dados</p>
          </div>

      <!-- Seção: Informações do Orçamento Atual -->
      ${e?`
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
            <span class="text-emerald-600 dark:text-emerald-400 text-lg">📋</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Orçamento Atual</h3>
        </div>
        
        <div class="space-y-4">
          <!-- Nome do Orçamento -->
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">${e.nome||"Orçamento sem nome"}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Nome do orçamento</div>
              </div>
              <span class="text-emerald-600 dark:text-emerald-400 text-lg">📝</span>
            </div>
          </div>

          <!-- ID do Orçamento -->
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="font-medium text-gray-800 dark:text-white text-sm break-all">${e.id}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">ID do orçamento</div>
              </div>
              <button onclick="copyBudgetId('${e.id}')" class="ml-3 px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                📋 Copiar
              </button>
            </div>
          </div>

          <!-- Usuário Logado -->
          ${t?`
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">${t.email}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Você (usuário logado)</div>
              </div>
              <span class="text-blue-600 dark:text-blue-400 text-lg">👤</span>
            </div>
          </div>
          `:""}

          <!-- Usuários com Acesso -->
          ${s.length>0?`
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="mb-2">
              <div class="font-medium text-gray-800 dark:text-white">Usuários com Acesso</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">${s.length} usuário(s) compartilhado(s)</div>
            </div>
            <div class="space-y-2">
              ${s.map(c=>`
                <div class="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded-lg">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-white text-sm truncate">${c.email}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${c.role}</div>
                  </div>
                  ${o?.userId===t?.uid?`
                    <button onclick="confirmRemoveUser('${e.id}', '${c.uid}', '${c.email}')" 
                            class="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors flex-shrink-0">
                      🗑️ Remover
                    </button>
                  `:`
                    <span class="text-purple-600 dark:text-purple-400 text-sm flex-shrink-0">🔗</span>
                  `}
                </div>
              `).join("")}
            </div>
          </div>
          `:`
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Orçamento Pessoal</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Apenas você tem acesso</div>
              </div>
              <span class="text-gray-600 dark:text-gray-400 text-lg">🔒</span>
            </div>
          </div>
          `}
        </div>
      </div>
      `:`
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
            <span class="text-yellow-600 dark:text-yellow-400 text-lg">⚠️</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Nenhum Orçamento Selecionado</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400">Selecione um orçamento para ver suas informações.</p>
      </div>
      `}

      <!-- Seção: Meus Orçamentos -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">📁</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Meus Orçamentos</h3>
        </div>
        
        <div class="space-y-3">
          ${r.length>0?r.map(c=>{const u=c.userId===t?.uid,p=c.usuariosPermitidos&&c.usuariosPermitidos.length>0,g=c.id===e?.id;return`
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 ${g?"ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20":""}">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3">
                    <div class="font-medium text-gray-800 dark:text-white">${c.nome||"Orçamento sem nome"}</div>
                    ${g?'<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Atual</span>':""}
                    ${u?'<span class="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Dono</span>':""}
                    ${!u&&p?'<span class="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">Compartilhado</span>':""}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ${p?`${u?"Compartilhado com":"Compartilhado por"} ${c.usuariosPermitidos.length} usuário(s)`:"Orçamento pessoal"}
                  </div>
                  <div class="text-xs text-gray-400 dark:text-gray-500 mt-1 break-all">ID: ${c.id}</div>
                </div>
                <div class="flex items-center gap-2">
                  ${g?"":`
                    <button onclick="switchToBudget('${c.id}')" class="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                      Entrar
                    </button>
                  `}
                  ${!u&&p?`
                    <button onclick="confirmLeaveBudget('${c.id}', '${c.nome||"Orçamento"}')" 
                            class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors">
                      🚪 Sair
                    </button>
                  `:""}
                  ${u?`
                    <button onclick="confirmDeleteBudget('${c.id}', '${c.nome||"Orçamento"}')" 
                            class="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
                      🗑️ Excluir
                    </button>
                  `:""}
                  <button onclick="copyBudgetId('${c.id}')" class="px-2 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors">
                    📋
                  </button>
                </div>
              </div>
            </div>
          `}).join(""):`
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div class="text-center">
                <div class="text-gray-500 dark:text-gray-400 mb-2">📁</div>
                <div class="font-medium text-gray-800 dark:text-white">Nenhum orçamento encontrado</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Crie seu primeiro orçamento</div>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Seção: Orçamentos Compartilhados -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
            <span class="text-indigo-600 dark:text-indigo-400 text-lg">🤝</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Orçamentos Compartilhados</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.showAddBudgetModal && window.showAddBudgetModal()">
            <div class="flex items-center gap-3">
              <span class="text-xl">➕</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Criar Novo Orçamento</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Criar um novo orçamento pessoal ou compartilhado</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.compartilharOrcamento && window.compartilharOrcamento()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔗</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Compartilhar Orçamento</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Compartilhar orçamento atual com outros usuários</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.selectSharedBudget && window.selectSharedBudget()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔐</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Entrar em Orçamento Compartilhado</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Acessar orçamento compartilhado por ID</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Convites Pendentes -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
            <span class="text-orange-600 dark:text-orange-400 text-lg">📨</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Convites Pendentes</h3>
        </div>
        
        <div id="pending-invitations-container" class="space-y-3">
          ${a.length>0?a.map(c=>`
            <div class="p-4 rounded-xl border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-orange-600 dark:text-orange-400 text-lg">📨</span>
                    <h4 class="font-medium text-gray-800 dark:text-white">Convite para Orçamento</h4>
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Orçamento:</strong> ${c.budgetName||"Orçamento sem nome"}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Convidado por:</strong> ${c.invitedByUserEmail||"Usuário desconhecido"}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    ${c.createdAt?new Date(c.createdAt.toDate()).toLocaleString("pt-BR"):"Data não disponível"}
                  </div>
                </div>
                <div class="flex items-center gap-2 ml-4">
                  <button onclick="window.acceptBudgetInvitation && window.acceptBudgetInvitation('${c.id}')" 
                          class="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                    ✅ Aceitar
                  </button>
                  <button onclick="window.declineBudgetInvitation && window.declineBudgetInvitation('${c.id}')" 
                          class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors">
                    ❌ Recusar
                  </button>
                </div>
              </div>
            </div>
          `).join(""):`
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div class="text-center">
                <div class="text-gray-500 dark:text-gray-400 mb-2">📨</div>
                <div class="font-medium text-gray-800 dark:text-white">Nenhum convite pendente</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Você não tem convites para orçamentos aguardando resposta</div>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Seção: Dados e Exportação -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">📊</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Dados e Exportação</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.showExportOptions && window.showExportOptions()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📤</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar Dados</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Baixar relatórios em PDF/Excel</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.restoreBackup && window.restoreBackup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📥</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Restaurar Backup</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Importar dados de um arquivo JSON</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.downloadBackup && window.downloadBackup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">💾</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Backup JSON</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Exportar todos os dados em JSON</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportToExcel && window.exportToExcel()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📊</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar Excel</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Relatório em planilha Excel</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportToPDF && window.exportToPDF()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📄</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar PDF</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Relatório em documento PDF</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-red-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportReadmePDF && window.exportReadmePDF()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📖</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Guia de Uso (PDF)</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Manual completo do aplicativo</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.renderLogAplicacoes && window.renderLogAplicacoes()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📆</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Log de Aplicações</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Histórico de recorrentes aplicadas</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Notificações -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">🔔</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Notificações</h3>
        </div>
        
        <div class="space-y-3">
          <button id="notification-toggle-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <span id="notification-icon" class="text-xl">🔕</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Ativar Notificações</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Receber alertas importantes</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button onclick="window.testNotification && window.testNotification()" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔔</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Testar Notificação</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Enviar notificação de teste</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <div id="notification-status" class="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 hidden">
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>Notificações ativadas</span>
            </div>
            <div class="mt-2 text-xs">
              Você receberá alertas sobre:
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Recorrentes pendentes</li>
                <li>Limites de categoria</li>
                <li>Lembretes mensais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção: Aparência -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
            <span class="text-purple-600 dark:text-purple-400 text-lg">🎨</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Aparência</h3>
        </div>
        
        <div class="space-y-3">
          <button id="theme-toggle-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <span id="theme-icon" class="text-xl">🌙</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Alternar Tema</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Claro / Escuro</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-purple-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Aplicativo -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <span class="text-green-600 dark:text-green-400 text-lg">📱</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Aplicativo</h3>
        </div>
        
        <div class="space-y-3">
          <button id="install-app-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.installPWA()">
            <div class="flex items-center gap-3">
              <span class="text-xl">⬇️</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Instalar App</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Baixar para a tela inicial</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
    </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.showBiometricSetup && window.showBiometricSetup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔐</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Autenticação Biométrica</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Configurar impressão digital/face</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
    </button>
        </div>
      </div>

      <!-- Seção: Conta -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <span class="text-red-600 dark:text-red-400 text-lg">👤</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Conta</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="confirmLogout()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🚪</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Sair da Conta</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Fazer logout do aplicativo</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-red-500 transition-colors">→</span>
    </button>
        </div>
      </div>

      <!-- Informações do App -->
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 text-center">
        <div class="text-4xl mb-3">📱</div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Servo Tech Finanças</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Versão 4.1.0</p>
        <div class="text-xs text-gray-500 dark:text-gray-500">
          © 2025 • Fundador: Igor Bispo
        </div>
      </div>
    </div>
  `,window.confirmLogout=()=>{if(confirm("Tem certeza que deseja sair da conta?"))try{typeof window.stopAllListeners=="function"&&window.stopAllListeners(),window.appState&&(window.appState.currentUser=null,window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[]),window.FirebaseAuth.signOut().then(()=>{console.log("✅ Logout realizado com sucesso"),window.router("/")}).catch(c=>{console.error("❌ Erro ao fazer logout:",c),window.Snackbar?window.Snackbar({message:"Erro ao fazer logout. Tente novamente.",type:"error"}):alert("Erro ao fazer logout. Tente novamente.")})}catch(c){console.error("❌ Erro ao preparar logout:",c),window.Snackbar?window.Snackbar({message:"Erro ao preparar logout. Tente novamente.",type:"error"}):alert("Erro ao preparar logout. Tente novamente.")}},window.copyBudgetId=c=>{navigator.clipboard.writeText(c).then(()=>{window.Snackbar?window.Snackbar({message:"ID do orçamento copiado para a área de transferência!",type:"success"}):alert("ID do orçamento copiado para a área de transferência!")}).catch(u=>{console.error("Erro ao copiar ID:",u);const p=document.createElement("textarea");p.value=c,document.body.appendChild(p),p.select(),document.execCommand("copy"),document.body.removeChild(p),window.Snackbar?window.Snackbar({message:"ID do orçamento copiado para a área de transferência!",type:"success"}):alert("ID do orçamento copiado para a área de transferência!")})},window.switchToBudget=async c=>{try{const u=r.find(T=>T.id===c);if(!u){window.Snackbar?window.Snackbar({message:"Orçamento não encontrado.",type:"error"}):alert("Orçamento não encontrado.");return}const p=window.appState?.currentUser;if(!p){window.Snackbar?window.Snackbar({message:"Você precisa estar logado para trocar de orçamento.",type:"error"}):alert("Você precisa estar logado para trocar de orçamento.");return}const g=u.userId===p.uid,m=u.usuariosPermitidos&&u.usuariosPermitidos.includes(p.uid);if(console.log("🔍 Debug switchToBudget:",{budgetId:c,budgetName:u.nome,currentUserUid:p.uid,budgetUserId:u.userId,isOwner:g,usuariosPermitidos:u.usuariosPermitidos,hasSharedAccess:m}),!g&&!m){window.Snackbar?window.Snackbar({message:"Você não tem acesso a este orçamento.",type:"error"}):alert("Você não tem acesso a este orçamento.");return}window.setCurrentBudget?(await window.setCurrentBudget(u),window.Snackbar?window.Snackbar({message:`Orçamento "${u.nome}" selecionado com sucesso!`,type:"success"}):alert(`Orçamento "${u.nome}" selecionado com sucesso!`),setTimeout(async()=>{console.log("🔄 Navegando para dashboard após troca de orçamento..."),window.router&&window.router("/dashboard"),window.refreshCurrentView&&window.refreshCurrentView(),window.SwipeNavigation&&window.SwipeNavigation.updateCurrentTabIndex&&window.SwipeNavigation.updateCurrentTabIndex("/dashboard"),console.log("✅ Navegação para dashboard concluída!")},1500)):window.Snackbar?window.Snackbar({message:"Erro ao trocar de orçamento.",type:"error"}):alert("Erro ao trocar de orçamento.")}catch(u){console.error("Erro ao trocar de orçamento:",u),window.Snackbar?window.Snackbar({message:"Erro ao trocar de orçamento.",type:"error"}):alert("Erro ao trocar de orçamento.")}},setTimeout(()=>{typeof window.updateInstallButton=="function"&&window.updateInstallButton()},100),setTimeout(()=>{typeof window.setupNotifications=="function"&&window.setupNotifications()},200),setTimeout(()=>{typeof window.setupThemeToggle=="function"&&window.setupThemeToggle("theme-toggle-btn")},300);const l=document.createElement("div");l.innerHTML=`
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
          <span class="text-purple-600 dark:text-purple-400 text-lg">🎨</span>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Personalização</h3>
      </div>
      
      <div class="space-y-4">
        <!-- Alertas Personalizados -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">⚠️ Alertas de Limite</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Configurar quando receber alertas</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="70" checked class="text-purple-600">
              <span class="text-sm">70% do limite (Recomendado)</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="80" class="text-purple-600">
              <span class="text-sm">80% do limite</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="90" class="text-purple-600">
              <span class="text-sm">90% do limite</span>
            </label>
          </div>
        </div>

        <!-- Cores Personalizadas -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">🎨 Tema de Cores</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Escolher cores preferidas</div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('blue')"></button>
            <button class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('green')"></button>
            <button class="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('purple')"></button>
            <button class="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('orange')"></button>
          </div>
        </div>

        <!-- Widgets Personalizáveis -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">📱 Widgets do Dashboard</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar apenas o que importa</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="summary" checked class="text-purple-600">
              <span class="text-sm">Card de resumo rápido</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="chart" checked class="text-purple-600">
              <span class="text-sm">Gráfico de categorias</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="progress" checked class="text-purple-600">
              <span class="text-sm">Barras de progresso</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="tips" class="text-purple-600">
              <span class="text-sm">Dicas personalizadas</span>
            </label>
          </div>
        </div>

        <!-- Notificações Inteligentes -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">🔔 Notificações Inteligentes</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Configurar horários preferidos</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="limitAlerts" checked class="text-purple-600">
              <span class="text-sm">Alertas de limite</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="recurringReminders" class="text-purple-600">
              <span class="text-sm">Lembretes de recorrentes</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="weeklySummary" class="text-purple-600">
              <span class="text-sm">Resumo semanal</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="financialTips" class="text-purple-600">
              <span class="text-sm">Dicas financeiras</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `,n.appendChild(l),window.setThemeColor=function(c){localStorage.setItem("themeColor",c),document.documentElement.setAttribute("data-theme-color",c);const u=document.documentElement,p={blue:{primary:"#3B82F6",secondary:"#1E40AF",accent:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",accent:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",accent:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",accent:"#FEF3C7"}};p[c]&&(u.style.setProperty("--primary-color",p[c].primary),u.style.setProperty("--secondary-color",p[c].secondary),u.style.setProperty("--accent-color",p[c].accent)),window.Snackbar&&window.Snackbar({message:`Tema ${c} aplicado com sucesso!`,type:"success"})},window.loadUserSettings=function(){const c={alertThreshold:localStorage.getItem("alertThreshold")||"70",themeColor:localStorage.getItem("themeColor")||"blue",dashboardWidgets:JSON.parse(localStorage.getItem("dashboardWidgets")||'{"summary": true, "chart": true, "progress": true, "tips": false}'),smartNotifications:JSON.parse(localStorage.getItem("smartNotifications")||'{"limitAlerts": true, "recurringReminders": false, "weeklySummary": false, "financialTips": false}')},u=document.querySelector(`input[name="alerta-limite"][value="${c.alertThreshold}"]`);return u&&(u.checked=!0),window.setThemeColor(c.themeColor),Object.keys(c.dashboardWidgets).forEach(p=>{const g=document.querySelector(`input[data-widget="${p}"]`);g&&(g.checked=c.dashboardWidgets[p])}),Object.keys(c.smartNotifications).forEach(p=>{const g=document.querySelector(`input[data-notification="${p}"]`);g&&(g.checked=c.smartNotifications[p])}),c},window.saveUserSettings=function(){const c=document.querySelector('input[name="alerta-limite"]:checked'),u=c?c.value:"70",p=localStorage.getItem("themeColor")||"blue",g=document.querySelector('input[data-widget="summary"]'),m=document.querySelector('input[data-widget="chart"]'),T=document.querySelector('input[data-widget="progress"]'),I=document.querySelector('input[data-widget="tips"]'),_={summary:g?g.checked:!1,chart:m?m.checked:!1,progress:T?T.checked:!1,tips:I?I.checked:!1},k=document.querySelector('input[data-notification="limitAlerts"]'),N=document.querySelector('input[data-notification="recurringReminders"]'),L=document.querySelector('input[data-notification="weeklySummary"]'),$=document.querySelector('input[data-notification="financialTips"]'),te={limitAlerts:k?k.checked:!1,recurringReminders:N?N.checked:!1,weeklySummary:L?L.checked:!1,financialTips:$?$.checked:!1};if(localStorage.setItem("alertThreshold",u),localStorage.setItem("themeColor",p),localStorage.setItem("dashboardWidgets",JSON.stringify(_)),localStorage.setItem("smartNotifications",JSON.stringify(te)),window.appState?.currentUser){const Z={userId:window.appState.currentUser.uid,alertThreshold:parseInt(u),themeColor:p,dashboardWidgets:_,smartNotifications:te,updatedAt:new Date},oe=Le(q,"userSettings",window.appState.currentUser.uid);_h(oe,Z,{merge:!0}).then(()=>{console.log("✅ Configurações salvas no Firestore"),window.Snackbar&&window.Snackbar({message:"Configurações salvas com sucesso!",type:"success"})}).catch(v=>{console.error("❌ Erro ao salvar configurações:",v)})}},setTimeout(()=>{document.querySelectorAll('input[name="alerta-limite"]').forEach(c=>{c.addEventListener("change",window.saveUserSettings)}),document.querySelectorAll("input[data-widget]").forEach(c=>{c.addEventListener("change",window.saveUserSettings)}),document.querySelectorAll("input[data-notification]").forEach(c=>{c.addEventListener("change",window.saveUserSettings)}),window.loadUserSettings()},500),window.confirmLeaveBudget=function(c,u){confirm(`Tem certeza que deseja sair do orçamento "${u}"?

⚠️ Esta ação não pode ser desfeita e você perderá acesso a todos os dados deste orçamento.`)&&window.leaveSharedBudget(c).then(async()=>{await window.renderSettings()}).catch(p=>{console.error("Erro ao sair do orçamento:",p)})},window.confirmRemoveUser=function(c,u,p){confirm(`Tem certeza que deseja remover o usuário "${p}" do orçamento?

⚠️ Esta ação não pode ser desfeita e o usuário perderá acesso a todos os dados deste orçamento.`)&&window.removeUserFromBudget(c,u).then(async()=>{await window.renderSettings()}).catch(g=>{console.error("Erro ao remover usuário:",g)})},window.confirmDeleteBudget=function(c,u){confirm(`Tem certeza que deseja excluir o orçamento "${u}"?

⚠️ Esta ação não pode ser desfeita e você perderá todos os dados deste orçamento.`)&&window.deleteBudget(c).then(async()=>{await window.renderSettings()}).catch(p=>{console.error("Erro ao excluir orçamento:",p)})}}class Ha{constructor(){this.isListening=!1,this.recognition=null,this.currentType=null,this.isModalOpen=!1,this.retryCount=0,this.maxRetries=3,console.log("🎤 VoiceSystem inicializado")}init(){return console.log("🎤 Inicializando VoiceSystem..."),this.checkBrowserSupport()?this.checkHTTPS()?(this.setupRecognition(),this.setupGlobalEvents(),console.log("✅ VoiceSystem inicializado com sucesso"),!0):(this.showError("O reconhecimento de voz requer HTTPS. Por favor, acesse o site via HTTPS."),!1):(this.showError("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge."),!1)}checkBrowserSupport(){const e="webkitSpeechRecognition"in window||"SpeechRecognition"in window;return console.log("🔍 Suporte ao reconhecimento de voz:",e),e}checkHTTPS(){const e=location.protocol==="https:"||location.hostname==="localhost";return console.log("🔍 Protocolo seguro:",e),e}setupRecognition(){try{const e=window.SpeechRecognition||window.webkitSpeechRecognition;this.recognition=new e,this.recognition.lang="pt-BR",this.recognition.continuous=!1,this.recognition.interimResults=!1,this.recognition.maxAlternatives=1,this.recognition.onstart=()=>this.handleRecognitionStart(),this.recognition.onresult=t=>this.handleRecognitionResult(t),this.recognition.onerror=t=>this.handleRecognitionError(t),this.recognition.onend=()=>this.handleRecognitionEnd(),console.log("✅ Reconhecimento configurado")}catch(e){console.error("❌ Erro ao configurar reconhecimento:",e),this.showError("Erro ao configurar reconhecimento de voz")}}handleRecognitionStart(){console.log("🎤 Reconhecimento iniciado"),this.isListening=!0,this.updateModalStatus("Ouvindo...","Fale sua transação ou categoria","listening")}handleRecognitionResult(e){console.log("🎤 Resultado recebido:",e);const t=e.results[0][0].transcript,r=e.results[0][0].confidence;console.log("🎤 Transcrição:",t),console.log("🎤 Confiança:",r),this.updateModalStatus("Processando...",`"${t}"`,"processing"),this.processCommand(t,r)}handleRecognitionError(e){console.error("🎤 Erro no reconhecimento:",e);const t=this.getErrorMessage(e.error);this.updateModalStatus("Erro",t,"error"),this.shouldRetry(e.error)&&this.retryCount<this.maxRetries?(this.retryCount++,console.log(`🔄 Tentativa ${this.retryCount} de ${this.maxRetries}`),setTimeout(()=>{this.startListening(this.currentType)},2e3)):setTimeout(()=>{this.closeModal()},3e3)}handleRecognitionEnd(){console.log("🎤 Reconhecimento finalizado"),this.isListening=!1,this.isModalOpen&&!this.isListening&&setTimeout(()=>{this.isModalOpen&&this.startListening(this.currentType)},1e3)}async processCommand(e,t){try{console.log("🎤 Processando comando:",e);const r=this.normalizeText(e);console.log("🎤 Texto normalizado:",r);const o=this.determineCommandType(r);console.log("🎤 Tipo de comando:",o);const s=await this.executeCommand(r,o);this.showSuccess(s),setTimeout(()=>{this.closeModal()},2e3)}catch(r){console.error("❌ Erro ao processar comando:",r),this.showError(`Erro ao processar comando: ${r.message}`),setTimeout(()=>{this.closeModal()},3e3)}}normalizeText(e){return e.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").trim()}determineCommandType(e){return/\b(saldo|qual.*saldo|saldo atual)\b/.test(e)?"query":/\b(adicionar|nova|criar|inserir).*(despesa|receita|transação|gasto|entrada)\b/.test(e)?"transaction":/\b(adicionar|nova|criar|inserir).*(categoria|categoria)\b/.test(e)?"category":/\b(ir para|vá para|mostrar|abrir).*(dashboard|transações|categorias|recorrentes)\b/.test(e)?"navigation":this.currentType||"transaction"}async executeCommand(e,t){switch(console.log("🎤 Executando comando:",t,e),t){case"query":return await this.handleQueryCommand(e);case"transaction":return await this.handleTransactionCommand(e);case"category":return await this.handleCategoryCommand(e);case"navigation":return await this.handleNavigationCommand(e);default:throw new Error("Tipo de comando não reconhecido")}}async handleQueryCommand(e){return console.log("🔍 Processando comando de consulta:",e),/\b(saldo|qual.*saldo|saldo atual)\b/.test(e)?`Saldo atual: R$ ${this.calculateBalance().toFixed(2)}`:/\b(despesas|gastos)\b/.test(e)?`Total de despesas: R$ ${this.calculateExpenses().toFixed(2)}`:/\b(receitas|entradas)\b/.test(e)?`Total de receitas: R$ ${this.calculateIncome().toFixed(2)}`:"Comando de consulta não reconhecido"}async handleTransactionCommand(e){console.log("💰 Processando comando de transação:",e);const t=this.parseTransactionCommand(e);if(!t)throw new Error("Não foi possível entender os dados da transação");if(window.addTransaction)return await window.addTransaction(t),`Transação adicionada: ${t.tipo} de R$ ${t.valor} - ${t.categoria}`;throw new Error("Função de adicionar transação não disponível")}async handleCategoryCommand(e){console.log("📂 Processando comando de categoria:",e);const t=this.parseCategoryCommand(e);if(!t)throw new Error("Nome da categoria não foi entendido");if(window.addCategory)return await window.addCategory({nome:t,tipo:"despesa",cor:this.getRandomColor()}),`Categoria "${t}" adicionada com sucesso`;throw new Error("Função de adicionar categoria não disponível")}async handleNavigationCommand(e){return console.log("🧭 Processando comando de navegação:",e),/\b(dashboard|início|principal)\b/.test(e)?(window.location.hash="#/dashboard","Navegando para o Dashboard"):/\b(transações|transação)\b/.test(e)?(window.location.hash="#/transactions","Navegando para Transações"):/\b(categorias|categoria)\b/.test(e)?(window.location.hash="#/categories","Navegando para Categorias"):/\b(recorrentes|recorrente)\b/.test(e)?(window.location.hash="#/recorrentes","Navegando para Recorrentes"):"Comando de navegação não reconhecido"}parseTransactionCommand(e){console.log("🔍 Analisando comando de transação:",e);const t={tipo:{receita:/\b(receita|entrada|ganhei|recebi|salário)\b/},valor:/(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real)/i,categoria:/\b(com|para|em)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:de|com|para|em)\s+\d|$)/i};let r="despesa";t.tipo.receita.test(e)&&(r="receita");const o=e.match(t.valor);if(!o)throw new Error("Valor não encontrado no comando");const s=parseFloat(o[1].replace(",",".")),a=e.match(t.categoria);let l="Outros";a&&(l=a[2].trim());const c=e.replace(t.valor,"").replace(t.categoria,"").trim();return{tipo:r,valor:s,categoria:l,descricao:c||`${r} de R$ ${s}`,data:new Date().toISOString()}}parseCategoryCommand(e){console.log("🔍 Analisando comando de categoria:",e);const t=[/\b(?:categoria|categoria)\s+(?:chamada|de|para)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$)/i,/\b(?:nova|criar|adicionar)\s+(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$)/i,/\b(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$)/i];for(const r of t){const o=e.match(r);if(o)return o[1].trim()}return null}calculateBalance(){if(!window.appState?.transactions)return 0;const e=window.appState.transactions.filter(r=>r.tipo==="receita").reduce((r,o)=>r+parseFloat(o.valor),0),t=window.appState.transactions.filter(r=>r.tipo==="despesa").reduce((r,o)=>r+parseFloat(o.valor),0);return e-t}calculateExpenses(){return window.appState?.transactions?window.appState.transactions.filter(e=>e.tipo==="despesa").reduce((e,t)=>e+parseFloat(t.valor),0):0}calculateIncome(){return window.appState?.transactions?window.appState.transactions.filter(e=>e.tipo==="receita").reduce((e,t)=>e+parseFloat(t.valor),0):0}getErrorMessage(e){return{"not-allowed":"Permissão do microfone negada. Clique no ícone do microfone na barra de endereços e permita o acesso.","no-speech":"Nenhuma fala detectada. Tente falar mais alto ou mais próximo do microfone.","audio-capture":"Erro ao capturar áudio. Verifique se o microfone está funcionando.",network:"Erro de rede. Verifique sua conexão com a internet.","service-not-allowed":"Serviço de reconhecimento de voz não permitido.","not-supported":"Reconhecimento de voz não suportado neste navegador.",aborted:"Reconhecimento de voz interrompido.","audio-capture-device-not-found":"Microfone não encontrado.","audio-capture-device-in-use":"Microfone em uso por outro aplicativo."}[e]||`Erro desconhecido: ${e}`}shouldRetry(e){return["network","service-not-allowed","audio-capture-device-in-use"].includes(e)}getRandomColor(){const e=["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#06B6D4"];return e[Math.floor(Math.random()*e.length)]}openModal(e="transaction"){console.log("🎤 Abrindo modal de voz:",e),this.currentType=e,this.isModalOpen=!0,this.retryCount=0;const t=document.getElementById("voice-modal"),r=t?.querySelector(".voice-content");t&&r?(t.style.display="flex",t.style.pointerEvents="auto",t.style.background="rgba(0, 0, 0, 0.95)",t.style.backdropFilter="blur(30px)",r.style.transform="scale(1)",r.style.opacity="1",document.body.classList.add("voice-modal-open"),setTimeout(()=>{this.startListening(e)},500),console.log("✅ Modal de voz aberto")):console.error("❌ Modal de voz não encontrado")}closeModal(){if(!this.isModalOpen)return;console.log("🎤 Fechando modal de voz"),this.isModalOpen=!1,this.isListening=!1;const e=document.getElementById("voice-modal"),t=e?.querySelector(".voice-content");if(e&&t){if(this.recognition&&this.isListening)try{this.recognition.stop()}catch(r){console.warn("⚠️ Erro ao parar reconhecimento:",r)}t.style.transform="scale(0.95)",t.style.opacity="0",e.style.background="rgba(0, 0, 0, 0)",e.style.backdropFilter="blur(0px)",document.body.classList.remove("voice-modal-open"),setTimeout(()=>{e.style.pointerEvents="none",e.style.display="none",console.log("✅ Modal de voz fechado")},300)}}updateModalStatus(e,t,r){const o=document.getElementById("voice-modal");if(!o)return;const s=o.querySelector("h3"),a=o.querySelector("p"),l=o.querySelector(".voice-icon div"),c=o.querySelector(".voice-status");if(s&&(s.textContent=e),a&&(a.textContent=t),l)switch(l.className="w-20 h-20 rounded-full flex items-center justify-center mx-auto",r){case"listening":l.classList.add("bg-gradient-to-r","from-green-500","to-blue-500","animate-pulse");break;case"processing":l.classList.add("bg-gradient-to-r","from-yellow-500","to-orange-500","animate-spin");break;case"error":l.classList.add("bg-gradient-to-r","from-red-500","to-pink-500");break;case"success":l.classList.add("bg-gradient-to-r","from-green-500","to-emerald-500");break;default:l.classList.add("bg-gradient-to-r","from-indigo-500","to-purple-500","animate-pulse")}c&&c.querySelectorAll("div").forEach((p,g)=>{r==="listening"?(p.classList.add("animate-bounce"),p.style.animationDelay=`${g*.1}s`):(p.classList.remove("animate-bounce"),p.style.animationDelay="")})}async startListening(e="transaction"){console.log("🎤 Iniciando reconhecimento de voz...");try{if(!this.recognition)throw new Error("Reconhecimento não configurado");return await this.requestMicrophonePermission()?(this.isListening&&(console.log("⚠️ Já está ouvindo, parando primeiro..."),this.recognition.stop(),await new Promise(r=>setTimeout(r,100))),this.currentType=e,this.recognition.start(),console.log("✅ Reconhecimento iniciado com sucesso"),!0):(console.log("❌ Permissão do microfone negada ou erro de dispositivo"),!1)}catch(t){console.error("❌ Erro ao iniciar reconhecimento:",t);let r="Erro ao iniciar reconhecimento de voz";return t.name==="InvalidStateError"?r="Reconhecimento já está ativo. Aguarde um momento e tente novamente.":t.name==="NotSupportedError"?r="Reconhecimento de voz não suportado neste navegador. Use Chrome ou Edge.":t.name==="NetworkError"&&(r="Erro de conexão. Verifique sua internet e tente novamente."),this.showError(r),!1}}async requestMicrophonePermission(){console.log("🎤 Solicitando permissão do microfone...");try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.warn("⚠️ API getUserMedia não disponível"),!1;try{return(await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}})).getTracks().forEach(t=>t.stop()),console.log("✅ Permissão do microfone concedida"),!0}catch(e){console.warn("⚠️ Erro de permissão:",e.name);try{const t=await navigator.mediaDevices.enumerateDevices(),r=t.filter(o=>o.kind==="audioinput");return console.log("🔍 Dispositivos encontrados:",t.length),console.log("🎤 Dispositivos de áudio:",r.length),r.length===0?(console.warn("⚠️ Nenhum dispositivo de áudio encontrado"),this.showError("Nenhum microfone encontrado. Verifique se há um microfone conectado."),!1):(console.log("✅ Dispositivos de áudio disponíveis:",r.map(o=>o.label||"Microfone")),this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1)}catch(t){return console.error("❌ Erro ao enumerar dispositivos:",t),this.showError("Erro ao verificar dispositivos de áudio. Tente recarregar a página."),!1}}}catch(e){console.error("❌ Erro ao solicitar permissão:",e);let t="Erro ao acessar microfone";return e.name==="NotFoundError"?t="Nenhum microfone encontrado. Verifique se há um microfone conectado.":e.name==="NotAllowedError"?t="Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.":e.name==="NotReadableError"?t="Microfone em uso por outro aplicativo. Feche outros aplicativos que possam estar usando o microfone.":e.name==="OverconstrainedError"?t="Configuração de microfone não suportada. Tente usar outro navegador.":e.name==="TypeError"&&(t="Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox."),this.showError(t),!1}}showSuccess(e){console.log("✅ Sucesso:",e),this.updateModalStatus("Sucesso!",e,"success"),window.Snackbar&&typeof window.Snackbar.success=="function"?window.Snackbar.success(e):window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar.show(e,"success"):window.Snackbar&&typeof window.Snackbar=="function"?window.Snackbar({message:e,type:"success"}):window.alert&&alert(`✅ ${e}`)}showError(e){console.error("❌ Erro:",e),this.updateModalStatus("Erro",e,"error"),window.Snackbar&&typeof window.Snackbar.error=="function"?window.Snackbar.error(e):window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar.show(e,"error"):window.Snackbar&&typeof window.Snackbar=="function"?window.Snackbar({message:e,type:"error"}):window.alert?alert(`❌ ${e}`):console.error("Nenhum sistema de notificação disponível")}setupGlobalEvents(){this.removeGlobalEvents(),this.escapeHandler=t=>{t.key==="Escape"&&this.isModalOpen&&this.closeModal()},document.addEventListener("keydown",this.escapeHandler),this.outsideClickHandler=t=>{const r=document.getElementById("voice-modal");t.target===r&&this.isModalOpen&&this.closeModal()},document.addEventListener("click",this.outsideClickHandler);const e=document.getElementById("close-voice-modal");if(e){const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),this.closeBtnHandler=r=>{r.preventDefault(),r.stopPropagation(),console.log("❌ Close voice modal button clicked"),this.closeModal()},t.addEventListener("click",this.closeBtnHandler)}}removeGlobalEvents(){if(this.escapeHandler&&(document.removeEventListener("keydown",this.escapeHandler),this.escapeHandler=null),this.outsideClickHandler&&(document.removeEventListener("click",this.outsideClickHandler),this.outsideClickHandler=null),this.closeBtnHandler){const e=document.getElementById("close-voice-modal");e&&e.removeEventListener("click",this.closeBtnHandler),this.closeBtnHandler=null}}start(e="transaction"){return console.log("🎤 VoiceSystem.start chamado:",e),this.init()?(this.openModal(e),!0):!1}stop(){console.log("🎤 VoiceSystem.stop chamado"),this.closeModal()}destroy(){console.log("🎤 Destruindo VoiceSystem..."),this.recognition&&(this.recognition.stop(),this.recognition=null),this.removeGlobalEvents(),this.isModalOpen&&this.closeModal(),this.isListening=!1,this.isModalOpen=!1,this.retryCount=0,console.log("✅ VoiceSystem destruído")}}let qt=null;window.openVoiceModal=function(n="transaction"){return console.log("🎤 openVoiceModal chamado:",n),qt||(qt=new Ha),qt.start(n)};window.closeVoiceModal=function(){console.log("🎤 closeVoiceModal chamado"),qt&&qt.stop()};window.startVoiceRecognition=function(n="transaction"){return console.log("🎤 startVoiceRecognition chamado:",n),qt||(qt=new Ha),qt.start(n)};window.Modal=Yt;window.Snackbar=F;window.setupThemeToggle=Q0;window.renderSettings=cb;window._renderRecorrentes=za;window.showHistoricoRecorrente=np;window.renderLogAplicacoes=ab;window.deleteDespesaRecorrente=ja;window.addDespesaRecorrente=qa;window.updateInstallButton=function(){const n=document.getElementById("install-app-btn");if(!n)return;const e=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0,t=!!window.deferredPrompt;console.log("📱 PWA: Atualizando botão - Instalado:",e,"Prompt:",t),e?(console.log('📱 PWA: Mostrando "App Instalado"'),n.innerHTML=`
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
    `,n.disabled=!1,n.classList.remove("opacity-50","cursor-not-allowed")):(console.log("📱 PWA: Ocultando botão"),n.style.display="none")};window.importBackup=function(){const n=document.createElement("input");n.type="file",n.accept="application/json",n.onchange=async e=>{const t=e.target.files[0];if(!t)return;const r=await t.text();try{const o=JSON.parse(r);o.transactions&&o.categories&&o.budgets?(Yt({title:"Importação de Backup (Somente Leitura)",content:`<div class='space-y-2'>
            <p class='text-gray-700'>O backup foi lido com sucesso, mas <b>não será gravado no sistema</b> por questões de segurança.</p>
            <p class='text-gray-500 text-sm'>Se precisar restaurar dados, entre em contato com o suporte.</p>
            <pre class='bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-48'>${JSON.stringify(o,null,2)}</pre>
            <button onclick='closeModal()' class='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Fechar</button>
          </div>`}),F({message:"Backup lido, mas não importado. Apenas leitura.",type:"info"})):(F({message:"Arquivo de backup inválido.",type:"error"}),alert("Arquivo de backup inválido."))}catch(o){F({message:"Erro ao importar backup: "+o.message,type:"error"}),alert("Erro ao importar backup: "+o.message)}},n.click()};window.restoreBackup=function(){if(console.log("🔍 restoreBackup chamada"),!window.appState?.currentUser){console.log("❌ Usuário não logado"),window.Snackbar?window.Snackbar({message:"❌ Você precisa estar logado para restaurar backup.",type:"error"}):alert("❌ Você precisa estar logado para restaurar backup.");return}if(!window.appState?.currentBudget){console.log("❌ Nenhum orçamento selecionado"),window.Snackbar?window.Snackbar({message:"❌ Nenhum orçamento selecionado.",type:"error"}):alert("❌ Nenhum orçamento selecionado.");return}if(console.log("✅ Usuário e orçamento OK, abrindo modal..."),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível. Tente recarregar a página.");return}try{const n=window.Modal({title:"📥 Restaurar Backup",content:`
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
      `});console.log("✅ Modal criado com sucesso"),document.body.appendChild(n)}catch(n){console.error("❌ Erro ao criar modal:",n),alert("Erro ao abrir modal: "+n.message)}};window.selectBackupFile=function(){console.log("🔍 selectBackupFile chamada"),console.log("🔍 Fechando modal de confirmação..."),closeModal(),setTimeout(()=>{console.log("🔍 Criando input de arquivo...");const n=document.createElement("input");n.type="file",n.accept="application/json,.json",n.style.display="none",document.body.appendChild(n),console.log("🔍 Input adicionado ao DOM"),n.onchange=async e=>{console.log("🔍 Arquivo selecionado:",e.target.files[0]);const t=e.target.files[0];if(!t){console.log("❌ Nenhum arquivo selecionado"),document.body.removeChild(n);return}try{console.log("🔍 Lendo arquivo..."),window.Snackbar?window.Snackbar({message:"📥 Lendo arquivo de backup...",type:"info"}):alert("📥 Lendo arquivo de backup...");const r=await t.text();console.log("🔍 Arquivo lido, tamanho:",r.length);const o=JSON.parse(r);if(console.log("🔍 JSON parseado com sucesso:",o),!o.transactions||!o.categories||!o.budgets)throw new Error("Arquivo de backup inválido. Deve conter transações, categorias e orçamentos.");if(console.log("🔍 Dados válidos, criando modal de preview..."),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível. Tente recarregar a página.");return}const s=window.Modal({title:"📥 Confirmar Restauração de Backup",content:`
            <div class='space-y-4'>
              <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
                <p class='text-blue-800 dark:text-blue-200 font-medium'>Dados encontrados no backup:</p>
                <ul class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1'>
                  <li>📊 <strong>${o.transactions.length}</strong> transações</li>
                  <li>📂 <strong>${o.categories.length}</strong> categorias</li>
                  <li>📁 <strong>${o.budgets.length}</strong> orçamentos</li>
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
                <button onclick='window.confirmRestoreBackup(${JSON.stringify(o).replace(/'/g,"\\'")})' class='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
                  ✅ Confirmar Restauração
                </button>
              </div>
            </div>
          `});console.log("🔍 Modal de preview criado, adicionando ao DOM..."),document.body.appendChild(s),console.log("✅ Modal de preview exibido com sucesso")}catch(r){console.error("❌ Erro ao ler backup:",r),window.Snackbar?window.Snackbar({message:"❌ Erro ao ler arquivo: "+r.message,type:"error"}):alert("❌ Erro ao ler arquivo: "+r.message)}finally{console.log("🔍 Removendo input do DOM"),document.body.removeChild(n)}},console.log("🔍 Triggerando clique no input..."),n.click(),console.log("🔍 Clique no input executado")},300)};window.confirmRestoreBackup=async function(n){console.log("🔍 confirmRestoreBackup chamada com dados:",n);try{console.log("🔍 Fechando modal..."),closeModal(),console.log("🔍 Mostrando loading..."),window.Snackbar?window.Snackbar({message:"🔄 Restaurando backup...",type:"info"}):alert("🔄 Restaurando backup...");const e=window.appState.currentUser.uid,t=window.appState.currentBudget.id;if(console.log("🔄 Iniciando restauração de backup..."),console.log("👤 User ID:",e),console.log("📁 Budget ID:",t),console.log("📊 Dados do backup:",n),!n||!n.categories||!n.transactions||!n.budgets)throw new Error("Dados de backup inválidos ou incompletos");console.log("🗑️ Limpando dados atuais..."),console.log("🗑️ Limpando transações...");for(const c of window.appState.transactions)try{await sp(c.id),console.log(`🗑️ Transação "${c.descricao}" removida`)}catch(u){console.error(`❌ Erro ao remover transação "${c.descricao}":`,u)}console.log("🗑️ Limpando categorias...");for(const c of window.appState.categories)try{await ip(c.id),console.log(`🗑️ Categoria "${c.nome}" removida`)}catch(u){console.error(`❌ Erro ao remover categoria "${c.nome}":`,u)}console.log("🗑️ Limpando recorrentes...");for(const c of window.appState.recorrentes)try{await ja(e,c.id),console.log(`🗑️ Recorrente "${c.descricao}" removida`)}catch(u){console.error(`❌ Erro ao remover recorrente "${c.descricao}":`,u)}await new Promise(c=>setTimeout(c,2e3));let r=0,o=0,s=0,a=0;console.log("📂 Importando categorias...");for(const c of n.categories)try{const{id:u,...p}=c;p.budgetId=t,await Ga(p),r++,console.log(`✅ Categoria "${c.nome}" importada (${r}/${n.categories.length})`)}catch(u){console.error(`❌ Erro ao importar categoria "${c.nome}":`,u)}console.log("💸 Importando transações...");for(const c of n.transactions)try{const{id:u,...p}=c;p.budgetId=t,await op(p),o++,console.log(`✅ Transação "${c.descricao}" importada (${o}/${n.transactions.length})`)}catch(u){console.error(`❌ Erro ao importar transação "${c.descricao}":`,u)}console.log("📁 Importando orçamentos...");for(const c of n.budgets)try{if(window.appState.budgets.find(p=>p.nome===c.nome))console.log(`ℹ️ Orçamento "${c.nome}" já existe, pulando...`);else{const{id:p,...g}=c;g.userId=e,await Ns(g),s++,console.log(`✅ Orçamento "${c.nome}" importado (${s}/${n.budgets.length})`)}}catch(u){console.error(`❌ Erro ao importar orçamento "${c.nome}":`,u)}if(console.log("🔄 Importando recorrentes..."),n.recorrentes&&n.recorrentes.length>0)for(const c of n.recorrentes)try{const{id:u,...p}=c;p.budgetId=t,await qa(e,t,p),a++,console.log(`✅ Recorrente "${c.descricao}" importada (${a}/${n.recorrentes.length})`)}catch(u){console.error(`❌ Erro ao importar recorrente "${c.descricao}":`,u)}else console.log("ℹ️ Nenhuma recorrente encontrada no backup");console.log("🔄 Recarregando dados..."),await rp(),console.log("✅ Restauração concluída com sucesso!"),console.log(`📊 Resumo: ${r} categorias, ${o} transações, ${s} orçamentos, ${a} recorrentes`);const l=`✅ Backup restaurado com sucesso!

📊 Dados importados:
• ${r} categorias
• ${o} transações
• ${s} orçamentos
• ${a} recorrentes

A página será recarregada em 3 segundos...`;window.Snackbar?window.Snackbar({message:l,type:"success",duration:5e3}):alert(l),console.log("🔄 Agendando recarregamento da página..."),setTimeout(()=>{console.log("🔄 Recarregando página..."),window.location.reload()},3e3)}catch(e){console.error("❌ Erro durante restauração:",e);const t=`❌ Erro durante restauração:
${e.message}`;window.Snackbar?window.Snackbar({message:t,type:"error",duration:5e3}):alert(t)}};function Or(n){const e=document.getElementById("login-page"),t=document.querySelector(".app-container"),r=document.getElementById("loading-page");n?(e.style.display="flex",t&&(t.style.display="none"),r&&(r.style.display="none")):(e.style.display="none",t&&(t.style.display="flex"),r&&(r.style.display="none"))}function lb(){bn.signOut().then(()=>{console.log("✅ Logout realizado com sucesso"),window.appState.currentUser=null,window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[],Or(!0),window.location.hash=""}).catch(n=>{console.error("❌ Erro no logout:",n)})}async function rp(){const n=window.location.hash.slice(1)||"/dashboard";await Fr(n)}async function op(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const r={...n,userId:e.uid,budgetId:t.id,createdAt:ve(),updatedAt:ve()},o=await Qt(ie(q,"transactions"),r);return console.log("✅ Transação adicionada com ID:",o.id),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),F({message:"Transação adicionada com sucesso!",type:"success"}),o.id}catch(e){throw console.error("❌ Erro ao adicionar transação:",e),F({message:"Erro ao adicionar transação",type:"error"}),e}}async function db(n,e){try{const t=Le(q,"transactions",n);await dt(t,{...e,updatedAt:ve()}),console.log("✅ Transação atualizada:",n),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),F({message:"Transação atualizada com sucesso!",type:"success"})}catch(t){throw console.error("❌ Erro ao atualizar transação:",t),F({message:"Erro ao atualizar transação",type:"error"}),t}}async function sp(n){try{const e=Le(q,"transactions",n);await gt(e),console.log("✅ Transação deletada:",n),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),F({message:"Transação deletada com sucesso!",type:"success"})}catch(e){throw console.error("❌ Erro ao deletar transação:",e),F({message:"Erro ao deletar transação",type:"error"}),e}}async function to(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=Ae(ie(q,"transactions"),ue("budgetId","==",e.id)),o=(await Ee(t)).docs.map(s=>({id:s.id,...s.data()}));return o.sort((s,a)=>{let l,c;return s.createdAt&&typeof s.createdAt=="object"&&s.createdAt.seconds?l=new Date(s.createdAt.seconds*1e3):l=new Date(s.createdAt),a.createdAt&&typeof a.createdAt=="object"&&a.createdAt.seconds?c=new Date(a.createdAt.seconds*1e3):c=new Date(a.createdAt),c-l}),window.appState.transactions=o,o}catch(n){return console.error("❌ Erro ao carregar transações:",n),[]}}async function Ga(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const r={...n,userId:e.uid,budgetId:t.id,createdAt:ve(),updatedAt:ve()},o=await Qt(ie(q,"categories"),r);return console.log("✅ Categoria adicionada com ID:",o.id),F({message:"Categoria adicionada com sucesso!",type:"success"}),o.id}catch(e){throw console.error("❌ Erro ao adicionar categoria:",e),F({message:"Erro ao adicionar categoria",type:"error"}),e}}async function ub(n,e){try{const t=Le(q,"categories",n);await dt(t,{...e,updatedAt:ve()}),console.log("✅ Categoria atualizada:",n),F({message:"Categoria atualizada com sucesso!",type:"success"})}catch(t){throw console.error("❌ Erro ao atualizar categoria:",t),F({message:"Erro ao atualizar categoria",type:"error"}),t}}async function ip(n){try{const e=Le(q,"categories",n);await gt(e),console.log("✅ Categoria deletada:",n),F({message:"Categoria deletada com sucesso!",type:"success"})}catch(e){throw console.error("❌ Erro ao deletar categoria:",e),F({message:"Erro ao deletar categoria",type:"error"}),e}}async function no(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=Ae(ie(q,"categories"),ue("budgetId","==",e.id)),o=(await Ee(t)).docs.map(s=>({id:s.id,...s.data()}));return window.appState.categories=o,o}catch(n){return console.error("❌ Erro ao carregar categorias:",n),[]}}async function Ns(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t={...n,userId:e.uid,createdAt:ve(),updatedAt:ve()},r=await Qt(ie(q,"budgets"),t);return console.log("✅ Orçamento adicionado com ID:",r.id),F({message:"Orçamento adicionado com sucesso!",type:"success"}),r.id}catch(e){throw console.error("❌ Erro ao adicionar orçamento:",e),F({message:"Erro ao adicionar orçamento",type:"error"}),e}}window.deleteBudget=async function(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");console.log("🗑️ Iniciando exclusão do orçamento:",n);const t=window.appState.budgets.find(N=>N.id===n);if(!t)throw new Error("Orçamento não encontrado");if(t.userId!==e.uid)throw new Error("Você não tem permissão para excluir este orçamento");const r=window.appState.currentBudget?.id===n;r&&(window.appState.currentBudget=null,localStorage.removeItem("currentBudgetId")),console.log("🗑️ Excluindo transações do orçamento...");const o=Ae(ie(q,"transactions"),ue("budgetId","==",n)),s=await Ee(o),a=s.docs.map(N=>gt(N.ref));await Promise.all(a),console.log(`✅ ${s.docs.length} transações excluídas`),console.log("🗑️ Excluindo categorias do orçamento...");const l=Ae(ie(q,"categories"),ue("budgetId","==",n)),c=await Ee(l),u=c.docs.map(N=>gt(N.ref));await Promise.all(u),console.log(`✅ ${c.docs.length} categorias excluídas`),console.log("🗑️ Excluindo recorrentes do orçamento...");const p=Ae(ie(q,"recorrentes"),ue("budgetId","==",n)),g=await Ee(p),m=g.docs.map(N=>gt(N.ref));await Promise.all(m),console.log(`✅ ${g.docs.length} recorrentes excluídas`),console.log("🗑️ Excluindo convites do orçamento...");const T=Ae(ie(q,"budgetInvitations"),ue("budgetId","==",n)),I=await Ee(T),_=I.docs.map(N=>gt(N.ref));await Promise.all(_),console.log(`✅ ${I.docs.length} convites excluídos`),console.log("🗑️ Excluindo o orçamento...");const k=Le(q,"budgets",n);if(await gt(k),console.log("✅ Orçamento excluído"),window.appState.budgets=window.appState.budgets.filter(N=>N.id!==n),r){const N=window.appState.budgets.filter(L=>L.userId===e.uid);N.length>0?(await Wa(N[0]),console.log("✅ Novo orçamento selecionado:",N[0].nome)):(window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.recorrentes=[],console.log("ℹ️ Nenhum orçamento restante"))}return F({message:`Orçamento "${t.nome}" excluído com sucesso!`,type:"success"}),console.log("✅ Exclusão do orçamento concluída com sucesso"),!0}catch(e){throw console.error("❌ Erro ao excluir orçamento:",e),F({message:`Erro ao excluir orçamento: ${e.message}`,type:"error"}),e}};async function _n(){try{const n=window.appState.currentUser;if(!n)return[];console.log("🔍 Carregando orçamentos para usuário:",n.uid);const e=Ae(ie(q,"budgets"),ue("userId","==",n.uid)),t=Ae(ie(q,"budgets"),ue("usuariosPermitidos","array-contains",n.uid));console.log("🔍 Executando queries de orçamentos...");const[r,o]=await Promise.all([Ee(e),Ee(t)]),s=r.docs.map(c=>({id:c.id,...c.data(),isOwner:!0})),a=o.docs.map(c=>({id:c.id,...c.data(),isOwner:!1})),l=[...s];return a.forEach(c=>{l.find(u=>u.id===c.id)||l.push(c)}),console.log("📊 Orçamentos carregados:",{total:l.length,own:s.length,shared:a.length,budgets:l.map(c=>({id:c.id,nome:c.nome,isOwner:c.isOwner}))}),window.appState.budgets=l,l}catch(n){return console.error("❌ Erro ao carregar orçamentos:",n),[]}}function Wa(n){window.appState.currentBudget=n,localStorage.setItem("currentBudgetId",n.id),console.log("✅ Orçamento atual definido:",n.nome)}window.setCurrentBudget=async function(n){if(!n){console.log("❌ Budget não fornecido para setCurrentBudget");return}console.log("🔄 Selecionando orçamento:",n.nome,n.id),Wa(n),window.stopAllListeners&&window.stopAllListeners(),window.startAllListeners&&await window.startAllListeners(n.id),await Promise.all([window.loadTransactions?window.loadTransactions():Promise.resolve(),window.loadCategories?window.loadCategories():Promise.resolve(),window.loadRecorrentes?window.loadRecorrentes():Promise.resolve(),window.loadNotifications?window.loadNotifications():Promise.resolve()]);const e=window.location.hash.replace("#","")||"/dashboard";switch(console.log("🔄 Atualizando rota atual:",e),e){case"/dashboard":window.renderDashboard&&await window.renderDashboard();break;case"/transactions":window.renderTransactions&&await window.renderTransactions();break;case"/categories":window.renderCategories&&await window.renderCategories();break;case"/notifications":window.renderNotifications&&await window.renderNotifications();break;case"/settings":window.renderSettings&&await window.renderSettings();break;default:window.renderDashboard&&await window.renderDashboard()}console.log("✅ Orçamento selecionado e todas as abas atualizadas")};async function Ka(){try{if(!window.appState.currentUser)return;const e=localStorage.getItem("currentBudgetId");if(e){const o=window.appState.budgets.find(s=>s.id===e);if(o){await window.setCurrentBudget(o);return}}if(window.appState.budgets.length>0){await window.setCurrentBudget(window.appState.budgets[0]);return}console.log("📝 Criando orçamento padrão...");const r=await Ns({nome:"Orçamento Principal",descricao:"Orçamento padrão criado automaticamente",valor:0,tipo:"mensal"});if(r){await _n();const o=window.appState.budgets.find(s=>s.id===r);o&&await window.setCurrentBudget(o)}}catch(n){console.error("❌ Erro ao selecionar orçamento padrão:",n)}}async function Ms(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=Ae(ie(q,"recorrentes"),ue("budgetId","==",e.id)),o=(await Ee(t)).docs.map(s=>({id:s.id,...s.data()}));return window.appState.recorrentes=o,o}catch(n){return console.error("❌ Erro ao carregar recorrentes:",n),[]}}async function hb(n,e,t){try{console.log(`🔍 Buscando transações para: ${e}/${t}`);const r=window.appState.currentBudget;if(!r)return console.log("⚠️ Nenhum orçamento ativo"),[];const o=Ae(ie(q,"transactions"),ue("budgetId","==",r.id)),a=(await Ee(o)).docs.map(c=>({id:c.id,...c.data()}));console.log(`📊 Total de transações encontradas: ${a.length}`);const l=a.filter(c=>{if(!c.createdAt)return!1;let u;c.createdAt&&typeof c.createdAt=="object"&&c.createdAt.seconds?u=new Date(c.createdAt.seconds*1e3):u=new Date(c.createdAt);const p=u.getFullYear(),g=u.getMonth()+1;return p===e&&g===t});return console.log(`✅ Transações filtradas para ${e}/${t}: ${l.length}`),l}catch(r){return console.error("❌ Erro ao buscar transações do mês:",r),[]}}async function ss(n,e){if(window.isRenderingDashboard){console.log("🔄 Dashboard já está sendo renderizado, pulando...");return}if(window.isRenderingDashboard=!0,!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, renderizando dashboard vazio"),window.isRenderingDashboard=!1;return}try{const t=document.getElementById("app-content");if(!t){console.warn("⚠️ Elemento #app-content não encontrado");return}const r=new Date,o=n||r.getFullYear(),s=e||r.getMonth()+1,a=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],l=window.appState.currentUser;let c=l?await hb(l.uid,o,s):[];console.log(`📊 Dashboard ${o}/${s}: ${c.length} transações carregadas`),console.log("📊 Estado atual:",{user:!!l,budget:!!window.appState.currentBudget,transactions:window.appState.transactions?.length||0,categories:window.appState.categories?.length||0,recorrentes:window.appState.recorrentes?.length||0}),o===r.getFullYear()&&s===r.getMonth()+1&&window.appState.transactions&&window.appState.transactions.length>0&&(c=window.appState.transactions,console.log(`🔄 Usando transações do appState para mês atual: ${c.length}`));const u=c.filter(D=>D.tipo==="receita").reduce((D,W)=>D+parseFloat(W.valor),0),p=c.filter(D=>D.tipo==="despesa").reduce((D,W)=>D+parseFloat(W.valor),0),g=window.appState.recorrentes||[],T=c.filter(D=>D.recorrenteId).map(D=>{const W=g.find(re=>re.id===D.recorrenteId);let K=D.parcelaAtual,z=D.parcelasTotal;return(!K||!z)&&(W?(z=W.parcelasTotal,window.calcularParcelaRecorrente?K=window.calcularParcelaRecorrente(W,o,s):K=1):(K=1,z=1)),{...W,efetivada:!0,parcelaAtual:K,parcelasTotal:z,transacaoId:D.id,valor:D.valor}}),I=g.filter(D=>{if(T.some(ze=>ze.id===D.id))return!1;const[K,z,re]=D.dataInicio.split("-").map(Number),je=new Date(K,z-1,re),Qe=je.getFullYear(),En=je.getMonth()+1;if(o<Qe||o===Qe&&s<En||!D.efetivarMesAtual&&o===Qe&&s===En)return!1;if(D.parcelasRestantes!==null&&D.parcelasRestantes!==void 0){let ze=(o-Qe)*12+(s-En);return!D.efetivarMesAtual&&(o>Qe||o===Qe&&s>En)&&(ze-=1),D.parcelasRestantes-ze>0}return!0}),_=[...T,...I],k=T.reduce((D,W)=>D+parseFloat(W.valor),0),N=I.reduce((D,W)=>D+parseFloat(W.valor),0),L=k+N,$=p+L,te=u-$,oe=(window.appState.categories?.filter(D=>D.tipo==="despesa")||[]).reduce((D,W)=>D+parseFloat(W.limite||0),0),v=oe-$,w=oe>0?$/oe:0,y=window.appState.categories?.filter(D=>{if(D.tipo!=="despesa")return!1;const K=c.filter(je=>je.categoriaId===D.id&&je.tipo===D.tipo).reduce((je,Qe)=>je+parseFloat(Qe.valor),0),z=parseFloat(D.limite||0),re=z>0?K/z:0;return z>0&&re>.7})||[],E=w>.7?"Orçado geral em alerta":null,x=y.length+(E?1:0),S=window.appState.categories.filter(D=>D.tipo==="despesa").map(D=>{const K=(window.appState.transactions||[]).filter(z=>z.categoriaId===D.id&&z.tipo===D.tipo).reduce((z,re)=>z+parseFloat(re.valor),0);return{...D,gasto:K}}).filter(D=>D.gasto>0).sort((D,W)=>W.gasto-D.gasto).slice(0,5),b=`
      <div class="tab-container">
        <div class="tab-header">
          <h2 class="tab-title-highlight">Dashboard</h2>
          <div class="flex gap-2">
            <button id="export-btn" class="btn-secondary">
              <span>📤 Exportar</span>
            </button>
            <button id="theme-toggle-btn" class="btn-secondary">
              <span>🎨 Tema</span>
            </button>
          </div>
        </div>
        <div id="mes-selector" class="flex items-center justify-center gap-4 mb-4 w-full">
          <button id="mes-anterior" class="text-blue-600 bg-blue-100 rounded-full w-10 h-10 md:w-8 md:h-8 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation" style="min-width: 44px; min-height: 44px;">&#8592;</button>
          <span class="font-bold text-lg">${a[s-1]} ${o}</span>
          <button id="mes-proximo" class="text-blue-600 bg-blue-100 rounded-full w-10 h-10 md:w-8 md:h-8 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation" style="min-width: 44px; min-height: 44px;">&#8594;</button>
        </div>
        <div class="tab-content">
          <div class="content-spacing" id="dashboard-content">
            <!-- RESUMO DO MÊS -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-4 md:p-6 mb-4 text-white">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg md:text-xl font-bold">RESUMO DO MÊS</h2>
                <span class="text-xl md:text-2xl">${a[s-1]} ${o}</span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4">
                <div class="text-center p-3">
                  <div class="text-xl md:text-2xl font-bold mb-2">R$ ${u.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90">💰 Receitas</div>
                  <div class="text-xs opacity-75">${te>=0?"✓ Saldo positivo":"✗ Saldo negativo"}</div>
                </div>
                <div class="text-center p-3">
                  <div class="text-xl md:text-2xl font-bold mb-2">R$ ${$.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90">🛒 Despesas</div>
                </div>
                <div class="text-center p-3">
                  <div class="text-xl md:text-2xl font-bold mb-2 ${te>=0?"text-green-300":"text-red-300"}">R$ ${te.toFixed(0)}</div>
                  <div class="text-sm md:text-base opacity-90">➖ Saldo</div>
                </div>
                <div class="text-center p-3">
                  <div class="text-xl md:text-2xl font-bold mb-2">${(w*100).toFixed(0)}%</div>
                  <div class="text-sm md:text-base opacity-90">Orçado usado</div>
                  <div class="text-xs opacity-75">✓ ${x} categorias em alerta</div>
                </div>
              </div>
            </div>

            <!-- CARDS DE RESUMO -->
            <div id="dashboard-cards" class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
              <!-- Card Receitas -->
              <div class="card-resumo receita">
                <div class="card-header">
                  <div class="card-icon">
                    <span class="text-2xl">💰</span>
                  </div>
                  <div class="card-title">Receitas</div>
                </div>
                <div class="card-value">R$ ${u.toFixed(2)}</div>
                <div class="card-status">✓ Dinheiro recebido</div>
              </div>

              <!-- Card Despesas -->
              <div class="card-resumo despesa">
                <div class="card-header">
                  <div class="card-icon">
                    <span class="text-2xl">🛒</span>
                  </div>
                  <div class="card-title">Despesas</div>
                </div>
                <div class="card-value">R$ ${$.toFixed(2)}</div>
                <div class="card-status">✗ Dinheiro gasto</div>
              </div>

              <!-- Card Saldo -->
              <div class="card-resumo saldo">
                <div class="card-header">
                  <div class="card-icon">
                    <span class="text-2xl">➖</span>
                  </div>
                  <div class="card-title">Saldo</div>
                </div>
                <div class="card-value">R$ ${te.toFixed(2)}</div>
                <div class="card-status">✗ Saldo negativo</div>
              </div>

              <!-- Card Orçado -->
              <div class="card-resumo orcado">
                <div class="card-header">
                  <div class="card-icon">
                    <span class="text-2xl">📊</span>
                  </div>
                  <div class="card-title">Orçado</div>
                </div>
                <div class="card-value">R$ ${v.toFixed(2)}</div>
                <div class="card-status">Progresso ${(w*100).toFixed(0)}% ✓ Dentro do orçado</div>
              </div>
            </div>

            <!-- TOP 5 CATEGORIAS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">TOP 5 CATEGORIAS</h3>
              </div>
              <div class="space-y-3">
                ${S.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma categoria com gastos encontrada neste mês</p>':S.slice(0,5).map(D=>{const W=window.appState.categories?.find(je=>je.id===D.id),K=W?.limite?parseFloat(W.limite):0,z=K>0?Math.min(D.gasto/K*100,100):0;let re="bg-green-500";return z>=90?re="bg-red-500":z>=75?re="bg-yellow-500":z>=50&&(re="bg-orange-500"),`
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
                            <span>${z.toFixed(0)}%</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${re} h-2 rounded-full transition-all duration-300" style="width: ${z}%"></div>
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
                <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="bg-green-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-green-600 text-xs md:text-base">
                  + Nova Categoria
                </button>
              </div>
              <div class="space-y-3">
                ${(window.appState.categories||[]).length===0?'<p class="text-gray-500 text-center py-4">Nenhuma categoria encontrada</p>':(window.appState.categories||[]).filter(D=>D.limite>0).map(D=>{const K=(window.appState.transactions||[]).filter(z=>z.categoriaId===D.id&&z.tipo===D.tipo).reduce((z,re)=>z+parseFloat(re.valor),0);return{...D,gasto:K}}).sort((D,W)=>W.gasto-D.gasto).map(D=>{const W=parseFloat(D.limite||0),K=W>0?Math.min(D.gasto/W*100,100):0;let z="bg-green-500";return K>=90?z="bg-red-500":K>=75?z="bg-yellow-500":K>=50&&(z="bg-orange-500"),`
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
                            <div class="${z} h-2 rounded-full transition-all duration-300" style="width: ${K}%"></div>
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
                <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
                  + Nova Despesa Recorrente
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${_.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma despesa recorrente aplicada ou agendada neste mês</p>':_.slice(0,5).map(D=>{const W=window.appState.categories?.find(K=>K.id===D.categoriaId);return`
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${D.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${W?.nome||"Sem categoria"} • Recorrente
                            ${(()=>{if(D.efetivada)return` • ✅ Efetivada: ${D.parcelaAtual} de ${D.parcelasTotal}`;if(!D.parcelasTotal||D.parcelasTotal<=1)return" • 📅 Agendada: Infinito";{const K=window.calcularStatusRecorrente?window.calcularStatusRecorrente(D,window.appState.transactions||[],o,s):{parcelaAtual:1,totalParcelas:D.parcelasTotal,foiEfetivadaEsteMes:!1};return` • 📅 Agendada: ${K.parcelaAtual} de ${K.totalParcelas}`}})()}
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
                <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
                  + Nova Transação
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${c.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma transação encontrada neste mês</p>':c.slice(0,10).map(D=>{const W=window.appState.categories?.find(z=>z.id===D.categoriaId);let K="";if(D.recorrenteId){const z=window.appState.recorrentes?.find(re=>re.id===D.recorrenteId);if(z)if(z.parcelasTotal&&z.parcelasTotal>1){const re=window.calcularStatusRecorrente?window.calcularStatusRecorrente(z,window.appState.transactions||[],o,s):{parcelaAtual:1,totalParcelas:z.parcelasTotal,foiEfetivadaEsteMes:!1};re.foiEfetivadaEsteMes?K=` • ✅ Efetivada: ${re.parcelaAtual} de ${re.totalParcelas}`:K=` • 📅 Agendada: ${re.parcelaAtual} de ${re.totalParcelas}`}else K=" • Infinito";else K=" • Recorrente"}return`
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
    `;t.innerHTML=b,setTimeout(()=>{Sb()},100),jt()}catch(t){console.error("Erro ao renderizar dashboard:",t);const r=document.getElementById("app-content");r&&(r.innerHTML='<div class="text-red-600 text-center mt-4">Erro ao carregar dashboard. Tente novamente.</div>')}finally{window.isRenderingDashboard=!1}}function pb(){const n=document.getElementById("modal-alertas");n&&n.classList.add("hidden")}function ap(){const n=document.getElementById("app-content");n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">📋 Transações</h2>
        <div class="flex items-center gap-2">
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
      </div>
      <div class="tab-content">
        <div class="content-spacing">
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
          `:window.appState.transactions?.map(e=>{const t=window.appState.categories?.find(s=>s.id===e.categoriaId),r=e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(e.createdAt).toLocaleDateString("pt-BR"),o=e.tipo==="receita";return`
            <div class="list-item ${o?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
              <div class="flex-1 min-w-0">
                <div class="list-item-title truncate">${e.descricao}</div>
                <div class="list-item-subtitle text-xs sm:text-sm">
                  ${t?.nome||"Sem categoria"} • ${r}
                  ${e.recorrenteId?" • Recorrente":""}
                  ${(()=>{if(!e.recorrenteId)return"";let s=e.parcelaAtual,a=e.parcelasTotal;if(!s||!a){const l=window.appState.recorrentes?.find(c=>c.id===e.recorrenteId);if(l)if(a=l.parcelasTotal,window.calcularParcelaRecorrente){const c=new Date;s=window.calcularParcelaRecorrente(l,c.getFullYear(),c.getMonth()+1)}else s=1;else s=1,a=1}return a&&a>1?` • ${s} de ${a}`:" • Infinito"})()}
                </div>
              </div>
              <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <span class="text-sm sm:text-base font-bold ${o?"text-green-600":"text-red-600"}">
                  ${o?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
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
  `,setTimeout(()=>{Ib()},100),fb(),jt()}function fb(){const n=document.getElementById("transaction-search"),e=document.getElementById("transaction-search-results"),t=document.getElementById("transaction-search-count"),r=document.getElementById("transactions-list");n&&(n.addEventListener("input",function(){const o=this.value.toLowerCase().trim();if(o===""){e.classList.add("hidden"),r.innerHTML=gb();return}const s=window.appState.transactions?.filter(a=>{const l=a.descricao.toLowerCase(),u=window.appState.categories?.find(g=>g.id===a.categoriaId)?.nome?.toLowerCase()||"",p=a.valor.toString();return l.includes(o)||u.includes(o)||p.includes(o)})||[];t.textContent=s.length,e.classList.remove("hidden"),r.innerHTML=mb(s)}),n.addEventListener("keydown",function(o){o.key==="Escape"&&(this.value="",this.dispatchEvent(new Event("input")))}))}function gb(){return window.appState.transactions?.length?window.appState.transactions.map(n=>{const e=window.appState.categories?.find(o=>o.id===n.categoriaId),t=n.createdAt&&n.createdAt.toDate?n.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(n.createdAt).toLocaleDateString("pt-BR"),r=n.tipo==="receita";return`
      <div class="list-item ${r?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${n.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${e?.nome||"Sem categoria"} • ${t}
            ${n.recorrenteId?" • Recorrente":""}
            ${(()=>{if(!n.recorrenteId)return"";let o=n.parcelaAtual,s=n.parcelasTotal;if(!o||!s){const a=window.appState.recorrentes?.find(l=>l.id===n.recorrenteId);if(a)if(s=a.parcelasTotal,window.calcularParcelaRecorrente){const l=new Date;o=window.calcularParcelaRecorrente(a,l.getFullYear(),l.getMonth()+1)}else o=1;else o=1,s=1}return s&&s>1?` • ${o} de ${s}`:" • Infinito"})()}
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span class="text-sm sm:text-base font-bold ${r?"text-green-600":"text-red-600"}">
            ${r?"+":"-"}R$ ${parseFloat(n.valor).toFixed(2)}
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
    `}function mb(n){return n.length?n.map(e=>{const t=window.appState.categories?.find(s=>s.id===e.categoriaId),r=e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(e.createdAt).toLocaleDateString("pt-BR"),o=e.tipo==="receita";return`
      <div class="list-item ${o?"border-l-4 border-l-green-500":"border-l-4 border-l-red-500"}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${e.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${t?.nome||"Sem categoria"} • ${r}
            ${e.recorrenteId?" • Recorrente":""}
            ${(()=>{if(!e.recorrenteId)return"";let s=e.parcelaAtual,a=e.parcelasTotal;if(!s||!a){const l=window.appState.recorrentes?.find(c=>c.id===e.recorrenteId);if(l)if(a=l.parcelasTotal,window.calcularParcelaRecorrente){const c=new Date;s=window.calcularParcelaRecorrente(l,c.getFullYear(),c.getMonth()+1)}else s=1;else s=1,a=1}return a&&a>1?` • ${s} de ${a}`:" • Infinito"})()}
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span class="text-sm sm:text-base font-bold ${o?"text-green-600":"text-red-600"}">
            ${o?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
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
    `}function wb(n){return n.recorrenteId?1:null}async function cp(){await to(),await Ms();const n=document.getElementById("app-content"),e=new Date,t=e.getFullYear(),r=e.getMonth()+1,o=window.appState.categories.map(s=>{const l=window.appState.transactions.filter(_=>{let k;_.createdAt&&typeof _.createdAt=="object"&&_.createdAt.seconds?k=new Date(_.createdAt.seconds*1e3):k=new Date(_.createdAt);const N=k.getFullYear(),L=k.getMonth()+1;return _.categoriaId===s.id&&_.tipo===s.tipo&&N===t&&L===r}).reduce((_,k)=>_+parseFloat(k.valor),0),c=window.appState.recorrentes.filter(_=>_.categoriaId===s.id&&_.ativa===!0);let u=0;c.forEach(_=>{window.appState.transactions.filter(N=>N.recorrenteId===_.id&&new Date(N.createdAt).getFullYear()===t&&new Date(N.createdAt).getMonth()+1===r).length>0&&(u+=parseFloat(_.valor))});const p=l+u,g=s.limite?parseFloat(s.limite):0,m=(s.tipo==="receita",g-p),T=g>0?Math.min(p/g*100,100):0;let I="bg-green-500";return T>=90?I="bg-red-500":T>=75?I="bg-yellow-500":T>=50&&(I="bg-orange-500"),{...s,totalGasto:p,totalGastoTransacoes:l,totalGastoRecorrentes:u,limite:g,saldo:m,porcentagem:T,corBarra:I}}).sort((s,a)=>a.totalGasto-s.totalGasto);n.innerHTML=`
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
            ${o.map(s=>`
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
  `,setTimeout(()=>{Tb()},100),yb(),jt()}function yb(){const n=document.getElementById("category-search"),e=document.getElementById("category-search-results"),t=document.getElementById("category-search-count"),r=document.getElementById("categories-grid");n&&(n.addEventListener("input",function(){const o=this.value.toLowerCase().trim();if(o===""){e.classList.add("hidden"),r.innerHTML=vb();return}const s=window.appState.categories?.filter(a=>{const l=a.nome.toLowerCase(),c=a.tipo.toLowerCase(),u=a.limite?.toString()||"";return l.includes(o)||c.includes(o)||u.includes(o)})||[];t.textContent=s.length,e.classList.remove("hidden"),r.innerHTML=bb(s)}),n.addEventListener("keydown",function(o){o.key==="Escape"&&(this.value="",this.dispatchEvent(new Event("input")))}))}function vb(){const n=new Date,e=n.getFullYear(),t=n.getMonth()+1;return window.appState.categories.map(o=>{const a=window.appState.transactions.filter(I=>{let _;I.createdAt&&typeof I.createdAt=="object"&&I.createdAt.seconds?_=new Date(I.createdAt.seconds*1e3):_=new Date(I.createdAt);const k=_.getFullYear(),N=_.getMonth()+1;return I.categoriaId===o.id&&I.tipo===o.tipo&&k===e&&N===t}).reduce((I,_)=>I+parseFloat(_.valor),0),l=window.appState.recorrentes.filter(I=>I.categoriaId===o.id&&I.ativa===!0);let c=0;l.forEach(I=>{window.appState.transactions.filter(k=>k.recorrenteId===I.id&&new Date(k.createdAt).getFullYear()===e&&new Date(k.createdAt).getMonth()+1===t).length>0&&(c+=parseFloat(I.valor))});const u=a+c,p=o.limite?parseFloat(o.limite):0,g=(o.tipo==="receita",p-u),m=p>0?Math.min(u/p*100,100):0;let T="bg-green-500";return m>=90?T="bg-red-500":m>=75?T="bg-yellow-500":m>=50&&(T="bg-orange-500"),{...o,totalGasto:u,totalGastoTransacoes:a,totalGastoRecorrentes:c,limite:p,saldo:g,porcentagem:m,corBarra:T}}).sort((o,s)=>s.totalGasto-o.totalGasto).map(o=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${o.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${o.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${o.tipo}</p>
      
      ${o.limite>0?`
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${o.limite.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${o.tipo==="receita"?"Receita":"Gasto"}:</span>
                <span class="font-medium ${o.tipo==="receita"?"text-green-600":o.totalGasto>o.limite?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${o.totalGasto.toFixed(2)}</span>
              </div>
              ${o.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${o.totalGastoTransacoes.toFixed(2)}
                      ${o.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${o.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${o.tipo==="receita"?"Falta para meta":"Saldo"}:</span>
                <span class="font-medium ${o.tipo==="receita"?o.saldo<=0?"text-green-600":o.saldo<o.limite*.25?"text-yellow-600":"text-red-600":o.saldo<0?"text-red-600":o.saldo<o.limite*.25?"text-yellow-600":"text-green-600"}">R$ ${o.saldo.toFixed(2)}</span>
              </div>
              
              <!-- Barra de Progresso -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>${o.porcentagem.toFixed(1)}% ${o.tipo==="receita"?"atingido":"usado"}</span>
                  <span>${o.porcentagem>=100?o.tipo==="receita"?"Meta atingida!":"Limite excedido!":""}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="${o.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(o.porcentagem,100)}%"></div>
                </div>
              </div>
            </div>
          `:`
            <div class="mt-3">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${o.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                <span class="font-medium ${o.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${o.totalGasto.toFixed(2)}</span>
              </div>
              ${o.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • ${o.tipo==="receita"?"Receitas":"Transações"}: R$ ${o.totalGastoTransacoes.toFixed(2)}
                      ${o.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${o.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
            </div>
          `}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${o.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${o.id}', '${o.nome}')" class="btn-danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
        <button onclick="showCategoryHistory('${o.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join("")}function bb(n){return n.length?n.map(e=>`
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
    `}async function Fr(n){switch(console.log("🔄 Router chamado com path:",n),console.log("🔄 Estado atual:",{currentUser:!!window.appState?.currentUser,currentBudget:!!window.appState?.currentBudget,hash:window.location.hash}),n){case"/dashboard":console.log("🔄 Renderizando dashboard..."),await ss(),Pt("/dashboard"),console.log("✅ Dashboard renderizado");break;case"/transactions":console.log("🔄 Renderizando transações..."),ap(),Pt("/transactions"),console.log("✅ Transações renderizadas");break;case"/categories":console.log("🔄 Renderizando categorias..."),await cp(),Pt("/categories"),console.log("✅ Categorias renderizadas");break;case"/recorrentes":if(console.log("🔄 Renderizando recorrentes..."),window._renderRecorrentes)window._renderRecorrentes();else{console.log("⚠️ Função _renderRecorrentes não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
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
          `)}jt(),Pt("/recorrentes"),console.log("✅ Recorrentes renderizadas");break;case"/notifications":if(console.log("🔄 Renderizando notificações..."),window.renderNotifications)await window.loadNotifications(),window.renderNotifications();else{console.log("⚠️ Função renderNotifications não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
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
          `)}jt(),Pt("/notifications"),console.log("✅ Notificações renderizadas");break;case"/settings":if(console.log("🔄 Renderizando configurações..."),window.renderSettings)window.renderSettings();else{console.log("⚠️ Função renderSettings não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
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
          `)}jt(),Pt("/settings"),console.log("✅ Configurações renderizadas");break;default:console.log("🔄 Rota não reconhecida, usando dashboard como fallback"),await ss(),Pt("/dashboard"),console.log("✅ Dashboard renderizado (fallback)")}setTimeout(()=>{window.swipeNavigation&&window.swipeNavigation.updateCurrentTabIndex&&(window.swipeNavigation.updateCurrentTabIndex(),window.swipeNavigation.updateSwipeIndicator())},200),setTimeout(()=>{up()},300)}function jt(){console.log("🔧 Renderizando FAB corrigido...");const n=document.getElementById("fab-container");if(!n){console.error("❌ Container FAB não encontrado");return}console.log("✅ Container FAB encontrado, criando FAB corrigido...");try{window.currentFAB&&window.currentFAB.cleanup&&(console.log("🧹 Limpando FAB anterior..."),window.currentFAB.cleanup()),n.innerHTML="",console.log("🔧 Criando FAB corrigido...");const e=Z0();console.log("🔧 FAB corrigido criado:",e),n.appendChild(e),console.log("🔧 FAB corrigido adicionado ao container"),window.currentFAB=e,console.log("✅ FAB corrigido criado e adicionado ao DOM"),setTimeout(()=>{const t=document.getElementById("fab-main"),r=document.getElementById("fab-container-main"),o=document.getElementById("fab-actions");t?console.log("✅ FAB principal encontrado e visível"):console.error("❌ FAB principal não encontrado"),r?console.log("✅ Container FAB principal encontrado"):console.error("❌ Container FAB principal não encontrado"),o?console.log("✅ Container de ações FAB encontrado"):console.error("❌ Container de ações FAB não encontrado");const s=document.getElementById("fab-transaction"),a=document.getElementById("fab-recorrente"),l=document.getElementById("fab-voice");console.log("🔧 Verificando botões de ação:"),console.log("  - Nova Transação:",!!s),console.log("  - Nova Recorrente:",!!a),console.log("  - Voz:",!!l),console.log("🔧 Verificando funções globais:"),console.log("  - showAddTransactionModal:",typeof window.showAddTransactionModal=="function"),console.log("  - showAddRecorrenteModal:",typeof window.showAddRecorrenteModal=="function"),console.log("  - openVoiceModal:",typeof window.openVoiceModal=="function"),console.log("  - Snackbar:",typeof window.Snackbar=="function")},300)}catch(e){console.error("❌ Erro ao criar FAB corrigido:",e)}}function Pt(n){const e=document.getElementById("bottom-nav");e&&(e.innerHTML=`
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
  `)}function $r(n){const e=document.getElementById("loading-page");e&&(e.style.display=n?"flex":"none")}function lp(){let n=window.location.hash.slice(1)||"/dashboard";const e=["/dashboard","/transactions","/categories","/recorrentes","/notifications","/settings"];function t(c){const u=e.indexOf(n);if(u===-1)return;let p,g="";c==="next"?(p=(u+1)%e.length,g="Próxima aba"):(p=u===0?e.length-1:u-1,g="Aba anterior");const m=e[p];l(`${g}: ${{"/dashboard":"Dashboard","/transactions":"Transações","/categories":"Categorias","/recorrentes":"Recorrentes","/notifications":"Notificações","/settings":"Configurações"}[m]}`),window.location.hash=m}document.addEventListener("keydown",c=>{if(!(c.target.tagName==="INPUT"||c.target.tagName==="TEXTAREA"))switch(c.key){case"ArrowLeft":c.preventDefault(),t("prev");break;case"ArrowRight":c.preventDefault(),t("next");break}});let r=0,o=0,s=!1;const a=document.createElement("div");a.className="swipe-indicator",a.textContent="Deslize para mudar de aba",document.body.appendChild(a);function l(c){a.textContent=c,a.classList.add("show"),setTimeout(()=>{a.classList.remove("show")},1e3)}document.addEventListener("touchstart",c=>{r=c.touches[0].clientX,o=c.touches[0].clientY,s=!1}),document.addEventListener("touchmove",c=>{if(!r||!o)return;const u=c.touches[0].clientX-r,p=c.touches[0].clientY-o;Math.abs(u)>Math.abs(p)&&Math.abs(u)>50&&(s=!0,c.preventDefault())}),document.addEventListener("touchend",c=>{if(!s||!r)return;const u=c.changedTouches[0].clientX-r;Math.abs(u)>100&&(u>0?t("prev"):t("next")),r=0,o=0,s=!1}),window.addEventListener("hashchange",()=>{const c=window.location.hash.slice(1)||"/dashboard";console.log("🔄 Hash change detectado:",{oldPath:n,newPath:c}),c!==n&&(n=c,console.log("🔄 Navegando para nova rota:",c),Fr(c))}),console.log("🔄 Navegação inicial para:",n),Fr(n)}function _b(){const n=document.getElementById("btn-entrar");n&&n.addEventListener("click",async()=>{try{$r(!0);const e=await J0();if(e){window.appState.currentUser=e,Or(!1),lp();try{console.log("📊 Carregando dados do usuário após login..."),await _n(),await Ka(),await to(),await no(),await Ms(),await Vs(),await Os(),await Qa(window.appState.currentBudget?.id),console.log("✅ Dados carregados com sucesso após login")}catch(t){console.error("❌ Erro ao carregar dados após login:",t)}await Fr("/dashboard")}}catch(e){console.error("Erro no login:",e),$r(!1)}})}function Eb(){return new Promise(n=>{const e=bn.onAuthStateChanged(t=>{e(),t?(console.log("✅ Usuário autenticado:",t.email),window.appState.currentUser=t,Or(!1),n(!0)):(console.log("❌ Usuário não autenticado"),window.appState.currentUser=null,Or(!0),n(!1))})})}document.addEventListener("DOMContentLoaded",async()=>{if(console.log("🚀 Iniciando aplicação..."),window.appState={currentUser:null,currentBudget:null,transactions:[],categories:[],budgets:[],recorrentes:[],isInitialized:!1},up(),await Eb()){lp(),$r(!0);try{console.log("📊 Carregando dados do usuário..."),await _n(),await Ka(),await to(),await no(),await Ms(),await Vs(),await Os(),await Qa(window.appState.currentBudget?.id),console.log("✅ Dados carregados com sucesso"),await new Promise(e=>setTimeout(e,500)),console.log("🔄 Renderizando dashboard inicial..."),await ss(),Pt("/dashboard"),jt(),console.log("✅ Dashboard inicial renderizado")}catch(e){console.error("❌ Erro ao carregar dados:",e),window.Snackbar&&window.Snackbar({message:"Erro ao carregar dados. Tente recarregar a página.",type:"error"})}finally{$r(!1)}setTimeout(()=>{try{if(!document.querySelector("#app-content")){console.warn("⚠️ Container #app-content não encontrado, tentando novamente em 500ms..."),setTimeout(()=>{document.querySelector("#app-content")&&(window.swipeNavigation=new Id,console.log("✅ SwipeNavigation inicializado (tentativa 2)"))},500);return}if(!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, aguardando...");return}window.swipeNavigation=new Id,console.log("✅ SwipeNavigation inicializado com sucesso")}catch(e){console.error("❌ Erro ao inicializar SwipeNavigation:",e)}},1e3),window.appState.isInitialized=!0}_b(),console.log("✅ Aplicação iniciada com sucesso!")});window.addCategoryWithConfirmation=async function(n){return new Promise((e,t)=>{window.showConfirmationModal({title:"Adicionar Categoria",message:`Deseja adicionar a categoria "${n.nome}"?`,confirmText:"Sim, Adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:async()=>{try{const r=await window.addCategory(n);window.Snackbar&&window.Snackbar({message:"✅ Categoria adicionada com sucesso!",type:"success"}),e(r)}catch(r){console.error("❌ Erro ao adicionar categoria:",r),window.Snackbar&&window.Snackbar({message:"Erro ao adicionar categoria: "+r.message,type:"error"}),t(r)}},onCancel:()=>{console.log("❌ Adição de categoria cancelada pelo usuário"),t(new Error("Operação cancelada pelo usuário"))}})})};window.renderDashboard=ss;window.renderTransactions=ap;window.renderCategories=cp;window.router=Fr;window.addTransaction=op;window.updateTransaction=db;window.deleteTransaction=sp;window.addCategory=Ga;window.updateCategory=ub;window.deleteCategory=ip;window.addBudget=Ns;window.loadTransactions=to;window.loadCategories=no;window.loadBudgets=_n;window.selectDefaultBudget=Ka;window.loadRecorrentes=Ms;window.closeModalAlertas=pb;window.calcularNumeroParcela=wb;window.showLoading=$r;window.toggleLoginPage=Or;window.refreshCurrentView=rp;window.logout=lb;let Tr=null;function dp(){return Tr||(Tr=new Ha),Tr}window.openVoiceModal=function(n="transaction"){return console.log("🎤 openVoiceModal chamado:",n),dp().start(n)};window.closeVoiceModal=function(){console.log("🎤 closeVoiceModal chamado"),Tr&&Tr.stop()};window.startVoiceRecognition=function(n="transaction"){return console.log("🎤 startVoiceRecognition chamado:",n),dp().start(n)};window.downloadBackup=function(){try{if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets,recorrentes:window.appState.recorrentes},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="financeiro-backup.json",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t),window.Snackbar&&window.Snackbar({message:"✅ Backup JSON exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar backup:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar backup: "+n.message,type:"error"}):alert("Erro ao exportar backup: "+n.message)}};window.exportToExcel=function(){try{if(typeof XLSX>"u"){console.error("❌ Biblioteca XLSX não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n=XLSX.utils.book_new(),e=window.appState.transactions.map(o=>({Descrição:o.descricao,Valor:o.valor,Tipo:o.tipo,Categoria:window.appState.categories.find(s=>s.id===o.categoriaId)?.nome||"",Data:o.createdAt&&o.createdAt.toDate?o.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(o=>({Nome:o.nome,Tipo:o.tipo,Limite:o.limite,Cor:o.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const r=window.appState.budgets.map(o=>({Nome:o.nome,Descrição:o.descricao,ID:o.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(r),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx"),window.Snackbar&&window.Snackbar({message:"✅ Arquivo Excel exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar Excel:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar Excel: "+n.message,type:"error"}):alert("Erro ao exportar Excel: "+n.message)}};window.exportToPDF=function(){try{if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(20),e.setFont("helvetica","bold"),e.text("📊 Relatório Financeiro",10,t),t+=15;const r=window.appState.currentBudget;r&&(e.setFontSize(14),e.setFont("helvetica","bold"),e.text(`Orçamento: ${r.nome}`,10,t),t+=8,e.setFontSize(10),e.setFont("helvetica","normal"),e.text(`ID: ${r.id}`,10,t),t+=10);const o=window.appState.transactions.filter(l=>l.tipo==="receita").reduce((l,c)=>l+parseFloat(c.valor),0),s=window.appState.transactions.filter(l=>l.tipo==="despesa").reduce((l,c)=>l+parseFloat(c.valor),0),a=o-s;e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Resumo Geral:",10,t),t+=8,e.setFontSize(10),e.setFont("helvetica","normal"),e.text(`Total Receitas: R$ ${o.toFixed(2)}`,12,t),t+=6,e.text(`Total Despesas: R$ ${s.toFixed(2)}`,12,t),t+=6,e.setFont("helvetica","bold"),e.text(`Saldo: R$ ${a.toFixed(2)}`,12,t),t+=10,e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Transações Recentes:",10,t),t+=8,e.setFontSize(9),e.setFont("helvetica","normal"),window.appState.transactions.sort((l,c)=>new Date(c.createdAt?.toDate?.()||c.createdAt)-new Date(l.createdAt?.toDate?.()||l.createdAt)).slice(0,15).forEach(l=>{const c=window.appState.categories.find(g=>g.id===l.categoriaId)?.nome||"Sem categoria",p=`${l.createdAt?.toDate?.()?l.createdAt.toDate().toLocaleDateString():"Data não disponível"} - ${l.descricao} | R$ ${l.valor} | ${l.tipo} | ${c}`;t>270&&(e.addPage(),t=10),e.text(p,12,t),t+=6}),t+=5,e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Gastos por Categoria:",10,t),t+=8,e.setFontSize(9),e.setFont("helvetica","normal"),window.appState.categories.forEach(l=>{const c=window.appState.transactions.filter(u=>u.categoriaId===l.id&&u.tipo==="despesa").reduce((u,p)=>u+parseFloat(p.valor),0);if(c>0){const u=l.limite?` / R$ ${l.limite}`:"",p=l.limite?` (${(c/l.limite*100).toFixed(1)}%)`:"";t>270&&(e.addPage(),t=10),e.text(`${l.nome}: R$ ${c.toFixed(2)}${u}${p}`,12,t),t+=6}}),e.save("relatorio-financeiro.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Relatório PDF exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar PDF:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar PDF: "+n.message,type:"error"}):alert("Erro ao exportar PDF: "+n.message)}};window.exportReadmePDF=function(){try{let o=function(s,a,l,c=170){return t.splitTextToSize(s,c).forEach(p=>{l>270&&(t.addPage(),l=10),t.text(p,a,l),l+=6}),l};var n=o;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let r=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Servo Tech Finanças",20,25),t.setFontSize(14),t.text("Guia Completo de Uso",20,35),r=50,t.setFontSize(12),t.setFont("helvetica","bold"),t.setTextColor(0,0,0),r=o("🎯 Como Usar o Aplicativo",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o("1. Faça login com sua conta Google",25,r),r=o("2. Crie categorias para organizar suas despesas e receitas",25,r),r=o("3. Adicione transações usando o botão + ou comandos de voz",25,r),r=o("4. Configure despesas recorrentes para pagamentos fixos",25,r),r=o("5. Monitore seu saldo e gastos no dashboard",25,r),r+=10,t.setFontSize(12),t.setFont("helvetica","bold"),r=o("🎤 Comandos de Voz Disponíveis",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o('• "gastei 50 reais no supermercado em alimentação"',25,r),r=o('• "recebi 2000 de salário em rendimentos"',25,r),r=o('• "criar categoria alimentação despesa 500"',25,r),r=o('• "qual meu saldo"',25,r),r=o('• "mostrar transações"',25,r),r+=10,t.setFontSize(12),t.setFont("helvetica","bold"),r=o("📊 Funcionalidades Principais",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o("• Dashboard com resumo financeiro",25,r),r=o("• Gestão de transações e categorias",25,r),r=o("• Sistema de despesas recorrentes",25,r),r=o("• Alertas de limite de categoria",25,r),r=o("• Backup e exportação de dados",25,r),r=o("• Interface responsiva para mobile",25,r),r+=10,t.setFontSize(12),t.setFont("helvetica","bold"),r=o("💾 Backup e Exportação",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o("• Exportação em JSON para backup completo",25,r),r=o("• Exportação em Excel para relatórios",25,r),r=o("• Exportação em PDF para documentação",25,r),r=o("• Restauração de dados de backup",25,r),r+=10,t.setFontSize(12),t.setFont("helvetica","bold"),r=o("🔧 Suporte e Contato",20,r),t.setFontSize(10),t.setFont("helvetica","normal"),r=o("Para dúvidas ou problemas:",25,r),r=o("• Verifique os logs do console (F12)",30,r),r=o("• Teste em diferentes navegadores",30,r),r=o("• Consulte a documentação técnica",30,r),t.save("guia-servo-tech-financas.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Guia PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar guia PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar guia PDF: "+e.message,type:"error"}):alert("Erro ao exportar guia PDF: "+e.message)}};window.showExportOptions=function(){console.log("🔍 showExportOptions chamada"),Yt({title:"📤 Opções de Exportação",content:`
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
    `})};function up(){console.log("🔧 Configurando botões do header...");const n=document.getElementById("voice-modal");console.log("🔧 Elementos encontrados:",{voiceModal:!!n});const e=document.getElementById("theme-toggle-btn");e&&(e.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("🎨 Theme button clicked"),window.setupThemeToggle?window.setupThemeToggle("theme-toggle-btn"):console.warn("⚠️ Função de tema não disponível")}),console.log("✅ Theme button configurado"));const t=document.getElementById("close-voice-modal");t&&(t.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("❌ Close voice modal button clicked"),Sd()}),console.log("✅ Close voice modal button configurado")),n&&n.addEventListener("click",r=>{r.target===n&&Sd()})}function xb(){const n=document.getElementById("voice-modal"),e=n?.querySelector(".voice-content");n&&e&&(n.style.display="flex",n.style.pointerEvents="auto",n.style.background="rgba(0, 0, 0, 0.95)",n.style.backdropFilter="blur(30px)",e.style.transform="scale(1)",e.style.opacity="1",document.body.classList.add("voice-modal-open"),window.startVoiceRecognition&&setTimeout(()=>{window.startVoiceRecognition("transaction")},500),console.log("🎤 Modal de voz aberto"))}window.openVoiceModal=xb;function Sd(){const n=document.getElementById("voice-modal"),e=n?.querySelector(".voice-content");n&&e&&(e.style.transform="scale(0.95)",e.style.opacity="0",n.style.background="rgba(0, 0, 0, 0)",n.style.backdropFilter="blur(0px)",document.body.classList.remove("voice-modal-open"),setTimeout(()=>{n.style.pointerEvents="none",n.style.display="none"},300),console.log("🎤 Modal de voz fechado"))}function Tb(){console.log("🔧 Configurando botões da tela de categorias...");const n=document.getElementById("add-category-btn");n&&(n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("📂 Add category button clicked"),window.showAddCategoryModal?window.showAddCategoryModal():(console.warn("⚠️ Função de adicionar categoria não disponível"),window.Snackbar&&window.Snackbar.show("Funcionalidade de adicionar categoria não disponível","warning"))}),console.log("✅ Add category button configurado"));const e=document.querySelector('button[onclick="window.migrarTransacoesAntigas()"]');e&&(e.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("🔄 Migrar button clicked"),window.migrarTransacoesAntigas?window.migrarTransacoesAntigas():console.warn("⚠️ Função de migrar não disponível")}),console.log("✅ Migrar button configurado"));const t=document.querySelector('button[onclick="window.corrigirTipoCategoria()"]');t&&(t.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),console.log("🔧 Corrigir button clicked"),window.corrigirTipoCategoria?window.corrigirTipoCategoria():console.warn("⚠️ Função de corrigir não disponível")}),console.log("✅ Corrigir button configurado"))}function Ib(){console.log("🔧 Configurando botões da tela de transações...");const n=document.getElementById("add-transaction-btn");n&&(n.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("📋 Add transaction button clicked"),window.showAddTransactionModal?window.showAddTransactionModal():(console.warn("⚠️ Função de adicionar transação não disponível"),window.Snackbar&&window.Snackbar.show("Funcionalidade de adicionar transação não disponível","warning"))}),console.log("✅ Add transaction button configurado"));const e=document.getElementById("voice-btn");e?(e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("🎤 Voice button clicked"),window.startVoiceRecognition?window.startVoiceRecognition("transaction"):console.warn("⚠️ Função de voz não disponível")}),console.log("✅ Voice button configurado")):console.warn("⚠️ Botão de voz não encontrado")}function Sb(){console.log("🔧 Configurando botões do dashboard...");const n=document.getElementById("export-btn");n&&(n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("📤 Export button clicked"),window.showExportOptions?window.showExportOptions():(console.warn("⚠️ Função de exportação não disponível"),window.Snackbar&&window.Snackbar({message:"Funcionalidade de exportação não disponível",type:"warning"}))}),console.log("✅ Export button configurado"));const e=document.getElementById("theme-toggle-btn");e&&(e.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("🎨 Theme button clicked"),window.setupThemeToggle?window.setupThemeToggle("theme-toggle-btn"):console.warn("⚠️ Função de tema não disponível")}),console.log("✅ Theme button configurado"));const t=document.getElementById("mes-anterior"),r=document.getElementById("mes-proximo");t&&(t.addEventListener("click",async o=>{o.preventDefault(),o.stopPropagation(),console.log("⬅️ Mês anterior clicked");const s=parseInt(document.querySelector("#mes-selector span").textContent.split(" ")[1]),a=document.querySelector("#mes-selector span").textContent.split(" ")[0],c=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].indexOf(a);let u=s,p=c;c===0?(u=s-1,p=11):p=c-1,window.renderDashboard&&await window.renderDashboard(u,p+1)}),console.log("✅ Mês anterior button configurado")),r&&(r.addEventListener("click",async o=>{o.preventDefault(),o.stopPropagation(),console.log("➡️ Mês próximo clicked");const s=parseInt(document.querySelector("#mes-selector span").textContent.split(" ")[1]),a=document.querySelector("#mes-selector span").textContent.split(" ")[0],c=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].indexOf(a);let u=s,p=c;c===11?(u=s+1,p=0):p=c+1,window.renderDashboard&&await window.renderDashboard(u,p+1)}),console.log("✅ Mês próximo button configurado"))}window.migrarTransacoesAntigas=async function(){try{if(console.log("🔄 Iniciando migração de transações antigas..."),!window.appState.currentUser){F({message:"Usuário não autenticado",type:"error"});return}const e=window.appState.currentBudget;if(!e){F.show("Orçamento não selecionado","error");return}const t=Ae(ie(q,"transactions"),ue("budgetId","==",e.id),ue("categoriaId","==",null)),o=(await Ee(t)).docs;if(o.length===0){F({message:"Nenhuma transação para migrar",type:"info"});return}let s=window.appState.categories.find(l=>l.nome==="Geral");if(!s){const c=await Ga({nome:"Geral",descricao:"Categoria padrão para transações antigas",tipo:"despesa",cor:"#6B7280",limite:0});await no(),s=window.appState.categories.find(u=>u.id===c)}let a=0;for(const l of o)await dt(l.ref,{categoriaId:s.id,updatedAt:ve()}),a++;await to(),F({message:`${a} transações migradas para categoria "Geral"`,type:"success"})}catch(n){console.error("❌ Erro na migração:",n),F({message:"Erro ao migrar transações",type:"error"})}};window.corrigirTipoCategoria=async function(){try{if(console.log("🔧 Iniciando correção de tipos de categoria..."),!window.appState.currentUser){F({message:"Usuário não autenticado",type:"error"});return}const e=window.appState.currentBudget;if(!e){F.show("Orçamento não selecionado","error");return}const t=Ae(ie(q,"categories"),ue("budgetId","==",e.id),ue("tipo","==",null)),o=(await Ee(t)).docs;if(o.length===0){F({message:"Nenhuma categoria para corrigir",type:"info"});return}let s=0;for(const a of o)await dt(a.ref,{tipo:"despesa",updatedAt:ve()}),s++;await no(),F({message:`${s} categorias corrigidas`,type:"success"})}catch(n){console.error("❌ Erro na correção:",n),F({message:"Erro ao corrigir categorias",type:"error"})}};async function Vs(){try{const n=bn.currentUser;if(!n)return[];const{getDocs:e,query:t,where:r,orderBy:o,limit:s}=await Be(async()=>{const{getDocs:u,query:p,where:g,orderBy:m,limit:T}=await Promise.resolve().then(()=>Ke);return{getDocs:u,query:p,where:g,orderBy:m,limit:T}},void 0),a=t(ie(q,"notifications"),r("recipientUid","==",n.uid),o("createdAt","desc"),s(50)),l=await e(a),c=[];return l.forEach(u=>{c.push({id:u.id,...u.data()})}),window.appState.notifications=c,console.log("📧 Notificações carregadas:",c.length),Ls(),c}catch(n){return console.error("Erro ao carregar notificações:",n),[]}}async function Ab(n){try{const{updateDoc:e}=await Be(async()=>{const{updateDoc:r}=await Promise.resolve().then(()=>Ke);return{updateDoc:r}},void 0);await e(Le(q,"notifications",n),{read:!0});const t=window.appState.notifications.findIndex(r=>r.id===n);t!==-1&&(window.appState.notifications[t].read=!0),Ls()}catch(e){console.error("Erro ao marcar notificação como lida:",e)}}async function kb(){try{const n=window.appState.notifications?.filter(r=>!r.read)||[];if(n.length===0){F({message:"Nenhuma notificação não lida",type:"info"});return}const{updateDoc:e}=await Be(async()=>{const{updateDoc:r}=await Promise.resolve().then(()=>Ke);return{updateDoc:r}},void 0),t=n.map(r=>e(Le(q,"notifications",r.id),{read:!0}));await Promise.all(t),window.appState.notifications.forEach(r=>r.read=!0),Ls(),F({message:`${n.length} notificações marcadas como lidas`,type:"success"}),window.location.hash==="#/notifications"&&Xa()}catch(n){console.error("Erro ao marcar notificações como lidas:",n),F({message:"Erro ao marcar notificações como lidas",type:"error"})}}function Ls(){const n=window.appState.notifications?.filter(t=>!t.read).length||0,e=document.querySelector('[data-route="/notifications"]');if(e){let t=e.querySelector(".notification-badge");t||(t=document.createElement("span"),t.className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",e.style.position="relative",e.appendChild(t)),n>0?(t.textContent=n>99?"99+":n,t.style.display="flex"):t.style.display="none"}}let vi=null;async function Os(){vi&&vi();const n=bn.currentUser;if(!n)return;const{onSnapshot:e,query:t,where:r,orderBy:o,limit:s}=await Be(async()=>{const{onSnapshot:l,query:c,where:u,orderBy:p,limit:g}=await Promise.resolve().then(()=>Ke);return{onSnapshot:l,query:c,where:u,orderBy:p,limit:g}},void 0),a=t(ie(q,"notifications"),r("recipientUid","==",n.uid),o("createdAt","desc"),s(50));vi=e(a,l=>{console.log("📧 Listener de notificações executado!");const c=[];l.forEach(u=>{c.push({id:u.id,...u.data()})}),window.appState.notifications=c,console.log("📧 Notificações atualizadas:",c.length),Ls(),window.location.hash==="#/notifications"&&Xa()},l=>{console.error("❌ Erro no listener de notificações:",l)})}async function Xa(){const n=document.getElementById("app-content");if(!n)return;await Vs();const e=window.appState.notifications||[];n.innerHTML=`
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
  `,jt()}window.loadNotifications=Vs;window.markNotificationAsRead=Ab;window.markAllNotificationsAsRead=kb;window.renderNotifications=Xa;window.listenNotifications=Os;window.addTransactionWithConfirmation=async function(n){return new Promise((e,t)=>{window.showConfirmationModal({title:"Adicionar Transação",message:`Tem certeza que deseja adicionar a transação "${n.descricao}" no valor de R$ ${n.valor.toFixed(2)}?`,confirmText:"Sim, Adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:async()=>{try{const r=await window.addTransaction(n);window.Snackbar&&window.Snackbar({message:"✅ Transação adicionada com sucesso!",type:"success"}),e(r)}catch(r){console.error("❌ Erro ao adicionar transação:",r),window.Snackbar&&window.Snackbar({message:"Erro ao adicionar transação: "+r.message,type:"error"}),t(r)}},onCancel:()=>{console.log("❌ Adição de transação cancelada pelo usuário"),t(new Error("Operação cancelada pelo usuário"))}})})};window.deleteTransactionWithConfirmation=function(n,e="transação"){window.showConfirmationModal({title:"Excluir Transação",message:`Tem certeza que deseja excluir a ${e}? Esta ação não pode ser desfeita.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteTransaction&&window.deleteTransaction(n)}})};window.deleteCategoryWithConfirmation=function(n,e="categoria"){window.showConfirmationModal({title:"Excluir Categoria",message:`Tem certeza que deseja excluir a categoria "${e}"? Todas as transações desta categoria ficarão sem categoria.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteCategory&&window.deleteCategory(n)}})};window.deleteRecorrenteWithConfirmation=function(n,e="despesa recorrente"){window.showConfirmationModal({title:"Excluir Despesa Recorrente",message:`Tem certeza que deseja excluir a ${e}? Esta ação não pode ser desfeita.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteDespesaRecorrente&&window.deleteDespesaRecorrente(n)}})};window.leaveBudgetWithConfirmation=function(n,e="orçamento"){window.showConfirmationModal({title:"Sair do Orçamento",message:`Tem certeza que deseja sair do orçamento "${e}"? Você perderá acesso a todas as transações.`,confirmText:"Sim, Sair",confirmColor:"bg-orange-500 hover:bg-orange-600",onConfirm:()=>{window.leaveSharedBudget&&window.leaveSharedBudget(n)}})};window.showExportOptions=function(){if(console.log("🔍 showExportOptions chamada"),console.log("🔍 window.Modal disponível:",!!window.Modal),console.log("🔍 window.Modal tipo:",typeof window.Modal),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível");return}console.log("🔍 Tentando abrir modal de exportação...");try{const n=window.Modal({title:"Exportar Dados",content:`
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
      `,onClose:()=>{console.log("🔍 Modal fechado"),document.querySelector(".modal")?.remove()}});console.log("🔍 Modal criado com sucesso:",n),document.body.appendChild(n),console.log("🔍 Modal adicionado ao DOM")}catch(n){console.error("❌ Erro ao criar modal:",n),alert("Erro ao abrir modal de exportação: "+n.message)}};window.exportToExcel=function(){try{if(typeof XLSX>"u"){console.error("❌ Biblioteca XLSX não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n=XLSX.utils.book_new(),e=window.appState.transactions.map(o=>({Descrição:o.descricao,Valor:o.valor,Tipo:o.tipo,Categoria:window.appState.categories.find(s=>s.id===o.categoriaId)?.nome||"",Data:o.createdAt&&o.createdAt.toDate?o.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(o=>({Nome:o.nome,Tipo:o.tipo,Limite:o.limite,Cor:o.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const r=window.appState.budgets.map(o=>({Nome:o.nome,Descrição:o.descricao,ID:o.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(r),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx"),window.Snackbar&&window.Snackbar({message:"✅ Arquivo Excel exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar Excel:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar Excel: "+n.message,type:"error"}):alert("Erro ao exportar Excel: "+n.message)}};window.exportToPDF=function(){try{let o=function(u,p,g,m=170){return t.splitTextToSize(u,m).forEach(I=>{g>270&&(t.addPage(),g=10),t.text(I,p,g),g+=6}),g};var n=o;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let r=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Servo Tech Finanças",20,25),t.setFontSize(14),t.text("Relatório Financeiro",20,35),t.setTextColor(0,0,0),t.setFontSize(12),t.setFont("helvetica","normal"),r=50,r=o("📊 RESUMO FINANCEIRO",20,r),r+=10;const s=window.appState.transactions.filter(u=>u.tipo==="receita").reduce((u,p)=>u+parseFloat(p.valor),0),a=window.appState.transactions.filter(u=>u.tipo==="despesa").reduce((u,p)=>u+parseFloat(p.valor),0),l=s-a;r=o(`💰 Total de Receitas: R$ ${s.toFixed(2)}`,20,r),r=o(`💸 Total de Despesas: R$ ${a.toFixed(2)}`,20,r),r=o(`💳 Saldo: R$ ${l.toFixed(2)}`,20,r),r+=15,r=o("📋 ÚLTIMAS TRANSAÇÕES",20,r),r+=10,window.appState.transactions.sort((u,p)=>new Date(p.createdAt)-new Date(u.createdAt)).slice(0,10).forEach(u=>{const p=window.appState.categories.find(m=>m.id===u.categoriaId),g=u.createdAt&&u.createdAt.toDate?u.createdAt.toDate().toLocaleDateString():new Date(u.createdAt).toLocaleDateString();r=o(`${g} - ${u.descricao} (${p?.nome||"Sem categoria"}) - R$ ${u.valor}`,25,r)}),t.save("financeiro-relatorio.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Relatório PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar PDF: "+e.message,type:"error"}):alert("Erro ao exportar PDF: "+e.message)}};window.downloadBackup=function(){try{if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets,recorrentes:window.appState.recorrentes},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="financeiro-backup.json",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t),window.Snackbar&&window.Snackbar({message:"✅ Backup JSON exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar backup:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar backup: "+n.message,type:"error"}):alert("Erro ao exportar backup: "+n.message)}};window.exportReadmePDF=function(){try{let o=function(s,a,l,c=170){return t.splitTextToSize(s,c).forEach(p=>{l>270&&(t.addPage(),l=10),t.text(p,a,l),l+=6}),l};var n=o;if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:e}=window.jspdf,t=new e;let r=10;t.setFontSize(24),t.setFont("helvetica","bold"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.text("Servo Tech Finanças",20,25),t.setFontSize(14),t.text("Guia Completo de Uso",20,35),t.setTextColor(0,0,0),t.setFontSize(12),t.setFont("helvetica","normal"),r=50,r=o("📱 COMO USAR O APLICATIVO",20,r),r+=10,r=o("1. DASHBOARD - Visualize seu resumo financeiro, saldo atual, gastos por categoria e alertas de limite.",20,r),r=o("2. TRANSAÇÕES - Adicione, edite ou remova suas receitas e despesas.",20,r),r=o("3. CATEGORIAS - Organize suas transações em categorias com limites personalizados.",20,r),r=o("4. RECORRENTES - Configure despesas que se repetem mensalmente.",20,r),r=o("5. NOTIFICAÇÕES - Receba alertas sobre limites de categoria e transações.",20,r),r=o("6. CONFIGURAÇÕES - Personalize o aplicativo e exporte seus dados.",20,r),r+=15,r=o("🎯 FUNCIONALIDADES PRINCIPAIS",20,r),r+=10,r=o("• Navegação por deslizamento entre abas",20,r),r=o("• Reconhecimento de voz para adicionar transações",20,r),r=o("• Exportação para Excel e PDF",20,r),r=o("• Backup e restauração de dados",20,r),r=o("• Notificações push para alertas",20,r),r=o("• Tema claro/escuro",20,r),r=o("• Instalação como PWA",20,r),r+=15,r=o("🔧 DICAS DE USO",20,r),r+=10,r=o("• Use as setas do teclado para navegar entre abas",20,r),r=o("• Deslize horizontalmente para trocar de tela no mobile",20,r),r=o("• Configure limites nas categorias para receber alertas",20,r),r=o("• Use o botão de voz para adicionar transações rapidamente",20,r),r=o("• Faça backup regular dos seus dados",20,r),t.save("servo-tech-financas-guia.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Guia PDF exportado com sucesso!",type:"success"})}catch(e){console.error("❌ Erro ao exportar guia PDF:",e),window.Snackbar?window.Snackbar({message:"Erro ao exportar guia PDF: "+e.message,type:"error"}):alert("Erro ao exportar guia PDF: "+e.message)}};function Br(n,e,t={}){if(console.log("🔔 Tentando enviar notificação:",n,e),console.log("🔔 Permissão:",Notification.permission),console.log("🔔 Habilitada:",localStorage.getItem("notifications-enabled")),Notification.permission==="granted"&&localStorage.getItem("notifications-enabled")==="true")try{const r=new Notification(n,{body:e,icon:"/icon-192.png",badge:"/icon-192.png",tag:"servo-tech-financas",requireInteraction:!1,...t});console.log("✅ Notificação criada com sucesso:",r),r.onclick=()=>{console.log("🔔 Notificação clicada"),window.focus(),r.close()},setTimeout(()=>{r.close(),console.log("🔔 Notificação fechada automaticamente")},5e3),console.log("✅ Notificação enviada com sucesso!")}catch(r){console.error("❌ Erro ao criar notificação:",r)}else console.log("❌ Notificação não enviada - permissão ou configuração inválida"),console.log("   Permissão:",Notification.permission),console.log("   Habilitada:",localStorage.getItem("notifications-enabled"))}function Rb(){if(localStorage.getItem("notifications-enabled")!=="true")return;const e=(window.appState.recorrentes||[]).filter(t=>t.parcelasRestantes>0);e.length>0&&Br("Recorrentes Pendentes",`Você tem ${e.length} despesa(s) recorrente(s) para efetivar este mês.`)}function Cb(){if(console.log("🔍 Iniciando verificação de limites de categoria..."),console.log("🔍 Notificações habilitadas:",localStorage.getItem("notifications-enabled")==="true"),localStorage.getItem("notifications-enabled")!=="true"){console.log("❌ Notificações desabilitadas, pulando verificação");return}const n=window.appState.categories||[],e=window.appState.transactions||[];console.log("🔍 Categorias encontradas:",n.length),console.log("🔍 Transações encontradas:",e.length),n.forEach(t=>{if(t.limite){const r=e.filter(a=>a.categoriaId===t.id&&a.tipo===t.tipo).reduce((a,l)=>a+parseFloat(l.valor),0),o=parseFloat(t.limite),s=r/o*100;console.log(`🔍 ${t.nome}: R$ ${r.toFixed(2)} / R$ ${o.toFixed(2)} (${s.toFixed(1)}%)`),s>=80&&(console.log(`⚠️ ${t.nome} atingiu ${s.toFixed(1)}% do limite!`),Br("⚠️ Limite de Categoria",`${t.nome} está com ${s.toFixed(1)}% do limite usado (R$ ${r.toFixed(2)} / R$ ${o.toFixed(2)}).`)),s>100&&(console.log(`🚨 ${t.nome} ULTRAPASSOU o limite em ${(s-100).toFixed(1)}%!`),Br("🚨 LIMITE ULTRAPASSADO!",`${t.nome} ultrapassou o limite em ${(s-100).toFixed(1)}%! (R$ ${r.toFixed(2)} / R$ ${o.toFixed(2)})`))}})}window.forceUIUpdate=function(){console.log("🔄 Forçando atualização da UI...");const n=document.querySelector(".nav-btn.active")?.getAttribute("data-route");console.log("📍 Aba atual:",n),requestAnimationFrame(()=>{n&&window.router&&(console.log("🔄 Recarregando aba:",n),window.router(n))})};window.syncThemeAcrossTabs=function(){const e=document.documentElement.classList.contains("dark");document.querySelectorAll('[class*="dark:"]').forEach(r=>{r.offsetHeight}),document.querySelectorAll("#theme-icon").forEach(r=>{r.textContent=e?"🌙":"☀️"}),console.log("🎨 Tema sincronizado em todas as abas")};window.testNotification=function(){console.log("🔔 Testando notificações..."),console.log("📱 Permissão do navegador:",Notification.permission),console.log("💾 localStorage:",localStorage.getItem("notifications-enabled"));const n=Notification.permission,e=localStorage.getItem("notifications-enabled")==="true";if(n==="granted"&&e)console.log("✅ Notificações ativadas - enviando teste..."),Br("🔔 Teste de Notificação","As notificações estão funcionando perfeitamente!"),window.Snackbar&&window.Snackbar({message:"✅ Notificação de teste enviada!",type:"success"});else{let t="";n==="denied"?t="❌ Permissão negada pelo navegador. Vá em Configurações > Notificações e permita.":n==="default"?t='❌ Permissão não solicitada. Clique em "Ativar Notificações" primeiro.':e?t="❌ Erro desconhecido com notificações.":t='❌ Notificações desativadas. Clique em "Ativar Notificações" primeiro.',console.log("❌ Erro:",t),window.Snackbar?window.Snackbar({message:t,type:"error"}):alert(t)}};window.showNotification=Br;window.checkRecorrentesPendentes=Rb;window.checkLimitesCategoria=Cb;let Ir=null,Sr=null,Ar=null,kr=null;async function hp(n){if(Ir&&Ir(),!n)return;const{doc:e,onSnapshot:t}=await Be(async()=>{const{doc:o,onSnapshot:s}=await Promise.resolve().then(()=>Ke);return{doc:o,onSnapshot:s}},void 0),r=e(q,"budgets",n);Ir=t(r,o=>{o.exists()&&(window.appState.currentBudget={id:o.id,...o.data()},console.log("🔄 Orçamento atualizado:",o.data().nome),setTimeout(async()=>{window.renderSettings&&(await window.renderSettings(),console.log("✅ renderSettings executado")),window.renderDashboard&&(window.renderDashboard(),console.log("✅ renderDashboard executado"))},100))})}async function pp(n){if(Sr&&Sr(),!n)return;console.log("🎧 Iniciando listener de transações para budgetId:",n);const{query:e,collection:t,where:r,onSnapshot:o}=await Be(async()=>{const{query:a,collection:l,where:c,onSnapshot:u}=await Promise.resolve().then(()=>Ke);return{query:a,collection:l,where:c,onSnapshot:u}},void 0),s=e(t(q,"transactions"),r("budgetId","==",n));Sr=o(s,a=>{console.log("🎧 Listener de transações executado!");const l=[];a.forEach(_=>{l.push({id:_.id,..._.data()})});const c=window.appState.transactions.map(_=>_.id).sort(),u=l.map(_=>_.id).sort(),p=JSON.stringify(c)!==JSON.stringify(u),g=window.appState.transactions.map(_=>({id:_.id,descricao:_.descricao,valor:_.valor,categoriaId:_.categoriaId})).sort((_,k)=>_.id.localeCompare(k.id)),m=l.map(_=>({id:_.id,descricao:_.descricao,valor:_.valor,categoriaId:_.categoriaId})).sort((_,k)=>_.id.localeCompare(k.id)),T=JSON.stringify(g)!==JSON.stringify(m),I=p||T;l.sort((_,k)=>{let N,L;return _.createdAt&&typeof _.createdAt=="object"&&_.createdAt.seconds?N=new Date(_.createdAt.seconds*1e3):N=new Date(_.createdAt),k.createdAt&&typeof k.createdAt=="object"&&k.createdAt.seconds?L=new Date(k.createdAt.seconds*1e3):L=new Date(k.createdAt),L-N}),window.appState.transactions=l,console.log("🔄 Transações atualizadas:",l.length,"itens"),console.log("🔄 Houve mudança?",I),I?(console.log("🎯 Atualizando UI após mudança nas transações..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window.renderTransactions&&(console.log("📋 Executando renderTransactions..."),window.renderTransactions()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},a=>{console.error("❌ Erro no listener de transações:",a)})}async function fp(n){if(Ar&&Ar(),!n)return;console.log("🎧 Iniciando listener de categorias para budgetId:",n);const{query:e,collection:t,where:r,onSnapshot:o}=await Be(async()=>{const{query:a,collection:l,where:c,onSnapshot:u}=await Promise.resolve().then(()=>Ke);return{query:a,collection:l,where:c,onSnapshot:u}},void 0),s=e(t(q,"categories"),r("budgetId","==",n));Ar=o(s,a=>{console.log("🎧 Listener de categorias executado!");const l=[];a.forEach(_=>{l.push({id:_.id,..._.data()})});const c=window.appState.categories.map(_=>_.id).sort(),u=l.map(_=>_.id).sort(),p=JSON.stringify(c)!==JSON.stringify(u),g=window.appState.categories.map(_=>({id:_.id,nome:_.nome,limite:_.limite,cor:_.cor})).sort((_,k)=>_.id.localeCompare(k.id)),m=l.map(_=>({id:_.id,nome:_.nome,limite:_.limite,cor:_.cor})).sort((_,k)=>_.id.localeCompare(k.id)),T=JSON.stringify(g)!==JSON.stringify(m),I=p||T;window.appState.categories=l,console.log("🔄 Categorias atualizadas:",l.length,"itens"),console.log("🔄 Houve mudança?",I),I?(console.log("🎯 Atualizando UI após mudança nas categorias..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window.renderCategories&&(console.log("📂 Executando renderCategories..."),window.renderCategories()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},a=>{console.error("❌ Erro no listener de categorias:",a)})}async function gp(n){if(kr&&kr(),!n)return;console.log("🎧 Iniciando listener de recorrentes para budgetId:",n);const{query:e,collection:t,where:r,onSnapshot:o}=await Be(async()=>{const{query:a,collection:l,where:c,onSnapshot:u}=await Promise.resolve().then(()=>Ke);return{query:a,collection:l,where:c,onSnapshot:u}},void 0),s=e(t(q,"recorrentes"),r("budgetId","==",n));kr=o(s,a=>{console.log("🎧 Listener de recorrentes executado!");const l=[];a.forEach(_=>{l.push({id:_.id,..._.data()})});const c=window.appState.recorrentes.map(_=>_.id).sort(),u=l.map(_=>_.id).sort(),p=JSON.stringify(c)!==JSON.stringify(u),g=window.appState.recorrentes.map(_=>({id:_.id,descricao:_.descricao,valor:_.valor,parcelasRestantes:_.parcelasRestantes,ativa:_.ativa})).sort((_,k)=>_.id.localeCompare(k.id)),m=l.map(_=>({id:_.id,descricao:_.descricao,valor:_.valor,parcelasRestantes:_.parcelasRestantes,ativa:_.ativa})).sort((_,k)=>_.id.localeCompare(k.id)),T=JSON.stringify(g)!==JSON.stringify(m),I=p||T;window.appState.recorrentes=l,console.log("🔄 Recorrentes atualizados:",l.length,"itens"),console.log("🔄 Houve mudança?",I),I?(console.log("🎯 Atualizando UI após mudança nos recorrentes..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window._renderRecorrentes&&(console.log("🔄 Executando _renderRecorrentes..."),window._renderRecorrentes()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},a=>{console.error("❌ Erro no listener de recorrentes:",a)})}async function Qa(n){console.log("🚀 Iniciando listeners para orçamento:",n),console.log("📍 Estado atual:",{currentUser:window.appState.currentUser?.uid,currentBudget:window.appState.currentBudget?.id,budgetId:n}),mp(),await hp(n),await pp(n),await fp(n),await gp(n),await Os(),console.log("✅ Todos os listeners iniciados"),console.log("🔍 Verificando se listeners estão ativos:",{unsubscribeBudget:!!Ir,unsubscribeTransactions:!!Sr,unsubscribeCategories:!!Ar,unsubscribeRecorrentes:!!kr}),setTimeout(()=>{console.log("🧪 Teste de listeners após 2 segundos:",{unsubscribeBudget:!!Ir,unsubscribeTransactions:!!Sr,unsubscribeCategories:!!Ar,unsubscribeRecorrentes:!!kr})},2e3)}function mp(){console.log("🛑 Parando todos os listeners..."),["unsubscribeBudget","unsubscribeTransactions","unsubscribeCategories","unsubscribeRecorrentes","unsubscribeNotifications"].forEach(e=>{if(window[e])try{window[e](),window[e]=null,console.log(`✅ Listener ${e} parado`)}catch(t){console.error(`❌ Erro ao parar listener ${e}:`,t)}}),console.log("✅ Todos os listeners parados")}window.startAllListeners=Qa;window.stopAllListeners=mp;window.listenCurrentBudget=hp;window.listenTransactions=pp;window.listenCategories=fp;window.listenRecorrentes=gp;window.migrarTransacoesAntigas=function(){console.log("🔄 Iniciando migração de transações antigas..."),window.Snackbar&&window.Snackbar({message:"🔄 Migração iniciada...",type:"info"}),setTimeout(()=>{window.Snackbar&&window.Snackbar({message:"✅ Migração concluída com sucesso!",type:"success"})},2e3)};window.corrigirTipoCategoria=function(){console.log("🔧 Iniciando correção de tipos de categoria..."),window.Snackbar&&window.Snackbar({message:"🔧 Correção iniciada...",type:"info"}),setTimeout(()=>{window.Snackbar&&window.Snackbar({message:"✅ Correção concluída com sucesso!",type:"success"})},2e3)};window.showCategoryHistory=function(n){console.log("📊 Mostrando histórico da categoria:",n);const e=window.appState.categories.find(r=>r.id===n);if(!e){window.Snackbar&&window.Snackbar({message:"❌ Categoria não encontrada",type:"error"});return}const t=window.appState.transactions.filter(r=>r.categoriaId===n);if(window.Modal){const r=window.Modal({title:`Histórico - ${e.nome}`,content:`
        <div class="space-y-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <p><strong>Total de transações:</strong> ${t.length}</p>
            <p><strong>Valor total:</strong> R$ ${t.reduce((o,s)=>o+parseFloat(s.valor),0).toFixed(2)}</p>
          </div>
          ${t.length>0?`
            <div class="max-h-60 overflow-y-auto">
              ${t.map(o=>`
                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <div class="font-medium">${o.descricao}</div>
                    <div class="text-xs text-gray-500">${new Date(o.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium ${o.tipo==="receita"?"text-green-600":"text-red-600"}">
                      ${o.tipo==="receita"?"+":"-"}R$ ${parseFloat(o.valor).toFixed(2)}
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
      `,onClose:()=>{document.querySelector(".modal")?.remove()}});document.body.appendChild(r)}};async function wp(n){try{const{getDoc:e,doc:t}=await Be(async()=>{const{getDoc:s,doc:a}=await Promise.resolve().then(()=>Ke);return{getDoc:s,doc:a}},void 0),r=t(q,"users",n),o=await e(r);return o.exists()?o.data():{email:"Usuário não encontrado",displayName:"Usuário não encontrado"}}catch(e){return console.error("Erro ao buscar informações do usuário:",e),{email:"Erro ao carregar",displayName:"Erro ao carregar"}}}async function Pb(n,e,t){try{const{getDoc:r,addDoc:o,collection:s,doc:a,serverTimestamp:l}=await Be(async()=>{const{getDoc:_,addDoc:k,collection:N,doc:L,serverTimestamp:$}=await Promise.resolve().then(()=>Ke);return{getDoc:_,addDoc:k,collection:N,doc:L,serverTimestamp:$}},void 0),c=await r(a(q,"budgets",n));if(!c.exists()){console.log("Orçamento não encontrado para notificação");return}const u=c.data();if(!u.usuariosPermitidos||u.usuariosPermitidos.length===0){console.log("Orçamento não compartilhado, não enviando notificação");return}const p=await wp(e),g=p?.displayName||p?.email||"Usuário";let m="Sem categoria";if(t.categoriaId){const _=await r(a(q,"categories",t.categoriaId));_.exists()&&(m=_.data().nome)}const T={budgetId:n,budgetName:u.nome||"Orçamento",senderUid:e,senderName:g,transactionId:t.id,transactionDescricao:t.descricao,transactionValor:t.valor,transactionCategoria:m,transactionTipo:t.tipo||"despesa",createdAt:l(),read:!1,type:"new_transaction"},I=u.usuariosPermitidos.filter(_=>_!==e).map(async _=>{try{await o(s(q,"notifications"),{...T,recipientUid:_}),console.log(`📧 Notificação enviada para usuário: ${_}`)}catch(k){console.error(`Erro ao enviar notificação para ${_}:`,k)}});await Promise.all(I),console.log("✅ Notificações enviadas com sucesso")}catch(r){console.error("Erro ao enviar notificações:",r)}}async function Db(n){try{const{updateDoc:e,doc:t,arrayRemove:r}=await Be(async()=>{const{updateDoc:a,doc:l,arrayRemove:c}=await Promise.resolve().then(()=>Ke);return{updateDoc:a,doc:l,arrayRemove:c}},void 0),o=window.appState.currentUser;if(!o){console.error("Usuário não autenticado");return}const s=t(q,"budgets",n);await e(s,{usuariosPermitidos:r(o.uid)}),console.log("✅ Usuário removido do orçamento compartilhado"),window.Snackbar&&window.Snackbar({message:"✅ Saída do orçamento realizada com sucesso",type:"success"})}catch(e){console.error("Erro ao sair do orçamento:",e),window.Snackbar&&window.Snackbar({message:"❌ Erro ao sair do orçamento",type:"error"})}}async function Nb(n,e){try{const{updateDoc:t,doc:r,arrayRemove:o}=await Be(async()=>{const{updateDoc:l,doc:c,arrayRemove:u}=await Promise.resolve().then(()=>Ke);return{updateDoc:l,doc:c,arrayRemove:u}},void 0);if(!window.appState.currentUser){console.error("Usuário não autenticado");return}const a=r(q,"budgets",n);await t(a,{usuariosPermitidos:o(e)}),console.log("✅ Usuário removido do orçamento compartilhado"),window.Snackbar&&window.Snackbar({message:"✅ Usuário removido com sucesso",type:"success"})}catch(t){console.error("Erro ao remover usuário:",t),window.Snackbar&&window.Snackbar({message:"❌ Erro ao remover usuário",type:"error"})}}window.getUserInfo=wp;window.sendTransactionNotification=Pb;window.leaveSharedBudget=Db;window.removeUserFromBudget=Nb;window.calcularParcelaRecorrente=Fo;window.calcularStatusRecorrente=K0;window.showModal=function(n,e=""){if(console.log("🔧 showModal chamada com:",{title:e,content:n.substring(0,100)+"..."}),!window.Modal){console.error("❌ window.Modal não está disponível");return}const t=window.Modal({title:e,content:n,onClose:()=>{closeModal()}});return document.body.appendChild(t),t};window.closeModal=function(){console.log("🔧 closeModal chamada");const n=document.getElementById("app-modal");n&&(n.remove(),window.toggleFABOnModal&&window.toggleFABOnModal())};window.showConfirmationModal=function(n){const{title:e="Confirmar Ação",message:t="Tem certeza que deseja realizar esta ação?",confirmText:r="Confirmar",cancelText:o="Cancelar",confirmColor:s="bg-red-500 hover:bg-red-600",onConfirm:a,onCancel:l}=n,c=`
    <div class="modal-content max-w-md mx-auto">
      <div class="text-center">
        <div class="text-6xl mb-4">⚠️</div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">${e}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">${t}</p>
        
        <div class="flex justify-center space-x-3">
          <button id="cancel-btn" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            ${o}
          </button>
          <button id="confirm-btn" 
                  class="px-4 py-2 text-white rounded-lg transition-colors ${s}">
            ${r}
          </button>
        </div>
      </div>
    </div>
  `,u=window.showModal(c);return setTimeout(()=>{const p=document.getElementById("cancel-btn"),g=document.getElementById("confirm-btn");p&&(p.onclick=()=>{window.closeModal(),l&&l()}),g&&(g.onclick=()=>{window.closeModal(),a&&a()})},100),u};window.showAddBudgetModal=function(){console.log("🔧 Abrindo modal de criar orçamento..."),window.showModal(`
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
  `),document.getElementById("add-budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-name").value,r=document.getElementById("budget-description").value,o=document.getElementById("budget-type").value;try{const s={nome:t,descricao:r,tipo:o,criadoPor:window.appState.currentUser.uid,membros:[window.appState.currentUser.uid],criadoEm:new Date},a=await Ns(s);if(await _n(),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Orçamento criado com sucesso!",type:"success"}),window.appState.budgets.length===1){const l=window.appState.budgets.find(c=>c.id===a);l&&await Wa(l)}}catch(s){console.error("❌ Erro ao criar orçamento:",s),window.Snackbar&&window.Snackbar({message:"Erro ao criar orçamento: "+s.message,type:"error"})}})};window.compartilharOrcamento=async function(){console.log("🔧 Abrindo modal de compartilhar orçamento...");const n=window.appState.currentBudget;if(!n){window.Snackbar&&window.Snackbar({message:"Nenhum orçamento selecionado",type:"warning"});return}const e=`
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
  `;window.showModal(e)};window.inviteUserToBudget=async function(){const n=document.getElementById("user-email").value,e=window.appState.currentBudget;if(console.log("🔍 Tentando convidar usuário:",{email:n,budgetId:e?.id,budgetName:e?.nome,budgetData:e,currentUser:window.appState.currentUser?.uid}),!n||!e){console.log("❌ Email ou orçamento inválido:",{email:n,budgetId:e?.id}),window.Snackbar&&window.Snackbar({message:"Email inválido ou orçamento não selecionado",type:"error"});return}try{console.log("🔍 Buscando usuário por email:",n);const t=Ae(ie(q,"users"),ue("email","==",n)),r=await Ee(t);if(console.log("🔍 Resultado da busca:",{empty:r.empty,size:r.size,docs:r.docs.map(p=>({id:p.id,data:p.data()}))}),r.empty){console.log("❌ Usuário não encontrado com email:",n),window.Snackbar&&window.Snackbar({message:"Usuário não encontrado com este email",type:"warning"});return}const s=r.docs[0].id;if(e.usuariosPermitidos&&e.usuariosPermitidos.includes(s)){window.Snackbar&&window.Snackbar({message:"Usuário já é membro deste orçamento",type:"info"});return}console.log("🔍 Verificando convites existentes para:",{budgetId:e.id,invitedUserId:s});const a=Ae(ie(q,"budgetInvitations"),ue("budgetId","==",e.id),ue("invitedUserId","==",s),ue("status","==","pending")),l=await Ee(a);if(console.log("🔍 Convites existentes:",{empty:l.empty,size:l.size,docs:l.docs.map(p=>({id:p.id,data:p.data()}))}),!l.empty){console.log("❌ Convite já existe para este usuário"),window.Snackbar&&window.Snackbar({message:"Convite já enviado para este usuário",type:"info"});return}const c={budgetId:e.id,budgetName:e.nome||"Orçamento sem nome",invitedUserId:s,invitedUserEmail:n,invitedByUserId:window.appState.currentUser.uid,invitedByUserEmail:window.appState.currentUser.email,status:"pending",createdAt:ve(),updatedAt:ve()};console.log("📨 Criando convite com dados:",c);const u=await Qt(ie(q,"budgetInvitations"),c);console.log("✅ Convite criado com ID:",u.id),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Convite enviado com sucesso! Aguardando aceitação.",type:"success"})}catch(t){console.error("❌ Erro ao enviar convite:",t),window.Snackbar&&window.Snackbar({message:"Erro ao enviar convite: "+t.message,type:"error"})}};window.acceptBudgetInvitation=async function(n){try{console.log("🔍 Aceitando convite:",n);const e=Le(q,"budgetInvitations",n),t=await Vr(e);if(!t.exists()){window.Snackbar&&window.Snackbar({message:"Convite não encontrado",type:"error"});return}const r=t.data();if(r.invitedUserId!==window.appState.currentUser.uid){window.Snackbar&&window.Snackbar({message:"Este convite não é para você",type:"error"});return}if(r.status!=="pending"){window.Snackbar&&window.Snackbar({message:"Este convite já foi respondido",type:"info"});return}const o=Le(q,"budgets",r.budgetId);if(!(await Vr(o)).exists()){window.Snackbar&&window.Snackbar({message:"Orçamento não encontrado",type:"error"});return}console.log("🔍 Adicionando usuário ao orçamento:",{budgetId:r.budgetId,userId:window.appState.currentUser.uid}),await dt(o,{usuariosPermitidos:Ca(window.appState.currentUser.uid),updatedAt:ve()}),console.log("✅ Usuário adicionado ao orçamento"),await dt(e,{status:"accepted",updatedAt:ve()}),console.log("✅ Status do convite atualizado para aceito"),window.Snackbar&&window.Snackbar({message:"✅ Convite aceito! Você agora tem acesso ao orçamento.",type:"success"}),await _n(),window.renderSettings&&await window.renderSettings()}catch(e){console.error("❌ Erro ao aceitar convite:",e),window.Snackbar&&window.Snackbar({message:"Erro ao aceitar convite: "+e.message,type:"error"})}};window.declineBudgetInvitation=async function(n){try{const e=Le(q,"budgetInvitations",n),t=await Vr(e);if(!t.exists()){window.Snackbar&&window.Snackbar({message:"Convite não encontrado",type:"error"});return}const r=t.data();if(r.invitedUserId!==window.appState.currentUser.uid){window.Snackbar&&window.Snackbar({message:"Este convite não é para você",type:"error"});return}if(r.status!=="pending"){window.Snackbar&&window.Snackbar({message:"Este convite já foi respondido",type:"info"});return}await dt(e,{status:"declined",updatedAt:ve()}),window.Snackbar&&window.Snackbar({message:"Convite recusado",type:"info"}),window.renderSettings&&await window.renderSettings()}catch(e){console.error("❌ Erro ao recusar convite:",e),window.Snackbar&&window.Snackbar({message:"Erro ao recusar convite: "+e.message,type:"error"})}};window.loadBudgetInvitations=async function(){try{const n=window.appState.currentUser;if(console.log("🔍 Carregando convites para usuário:",n?.uid,n?.email),!n)return console.log("❌ Usuário não autenticado"),[];const e=Ae(ie(q,"budgetInvitations"),ue("invitedUserId","==",n.uid),ue("status","==","pending"));console.log("🔍 Executando query de convites...");const t=await Ee(e);console.log("📊 Total de convites encontrados:",t.size);const r=[];return t.forEach(o=>{const s=o.data();console.log("📨 Convite encontrado:",{id:o.id,...s}),r.push({id:o.id,...s})}),r.sort((o,s)=>{const a=o.createdAt?o.createdAt.toDate():new Date(0);return(s.createdAt?s.createdAt.toDate():new Date(0))-a}),console.log("✅ Convites carregados com sucesso:",r.length),r}catch(n){return console.error("❌ Erro ao carregar convites:",n),[]}};window.selectSharedBudget=function(){console.log("🔧 Abrindo modal de entrar em orçamento compartilhado..."),window.showModal(`
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
  `),document.getElementById("join-budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-id").value.trim();if(!t){window.Snackbar&&window.Snackbar({message:"ID do orçamento é obrigatório",type:"warning"});return}try{const r=Le(q,"budgets",t),o=await Vr(r);if(!o.exists()){window.Snackbar&&window.Snackbar({message:"Orçamento não encontrado",type:"error"});return}const s=o.data();if(s.usuariosPermitidos&&s.usuariosPermitidos.includes(window.appState.currentUser.uid)){window.Snackbar&&window.Snackbar({message:"Você já é membro deste orçamento",type:"info"});return}await dt(r,{usuariosPermitidos:Ca(window.appState.currentUser.uid),updatedAt:ve()}),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Você entrou no orçamento com sucesso!",type:"success"}),await _n();const a=window.appState.budgets.find(l=>l.id===t);a&&window.setCurrentBudget&&await window.setCurrentBudget(a)}catch(r){console.error("❌ Erro ao entrar no orçamento:",r),window.Snackbar&&window.Snackbar({message:"Erro ao entrar no orçamento: "+r.message,type:"error"})}})};
